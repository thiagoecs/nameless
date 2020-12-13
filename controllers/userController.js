"use strict";
const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const jwt = require("jsonwebtoken");
const path = require("path");
const userModel = require("../models/userModel");
const postModel = require("../models/postModel");
const passport = require("../utils/passport");

const htmlFilePath = "../public/html"; // path of html files
const maxAge = 60 * 60 * 1000; // maximum storage period in millisecond

// error handler
// This is for sending error message to join / login / profile editting page.
const errorHandler = (err) => {
  // object init (about email and password)
  let errors = { email: "", password: "" };
  // join error
  // when two passwords are not same
  if (err === "pwerr") {
    errors.password = "This is not same as the first password";
  }
  // join & profile editting error
  // when an email is already registered
  if (err === "email registered") {
    errors.email = "This email is already registered";
  }
  // login error
  // when an email is not registered
  if (err.message === "email error") {
    errors.email = "This email is not registered";
  }
  // when a password is not correct
  if (err.message === "password error") {
    errors.password = "This password is incorrect";
  }
  return errors;
};

// access join page
const getJoin = (req, res) => {
  res.sendFile(path.join(__dirname, htmlFilePath + "/join.html"));
};

// sending join request
const postJoin = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  // same as const nickname = req.body.nickname ...
  const { nickname, email, password2, business } = req.body;
  console.log("business:", req.body);
  let password = req.body.password;
  // setting default user type
  let userType = 1;
  if (business === true) {
    userType = 2;
  }
  // checking if two passowrds users typed are same
  // If they are not same, redirects to join page.
  if (password !== password2) {
    const pwErrorMsg = "pwerr";
    const errors = errorHandler(pwErrorMsg);
    return res.status(400).json({ errors });
  } else {
    // checking if email that users typed is already registered
    const user = await userModel.getUserLogin(email);
    // If the email is not yet registered, encrypt password and save all data to database
    if (!user) {
      try {
        // encrypting password
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        password = hash;
        // saving data that user filled to the form and move to the next middleware
        if (await userModel.insertUser(nickname, email, password, userType)) {
          next();
        }
      } catch (e) {
        console.log(e);
        res.status(400).json({ error: "register error" });
      }
    } else {
      // sending error if the email is already registered
      const emailErrMsg = "email registered";
      const errors = errorHandler(emailErrMsg);
      res.status(400).json({ errors });
    }
  }
};

// sending login request using local authentication and make token.
const postLogin = (req, res) => {
  // using passport local strategy
  passport.authenticate("local", { session: false }, (err, user, info) => {
    try {
      // showing error message when there's no registered user or incorrect password
      if (err || !user) {
        const errors = errorHandler(err);
        return res.status(400).json({ errors });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          return res.status(400).json({ err });
        }
        // if user succeeds login, jwt token is made
        const accessToken = jwt.sign({ user: user.id }, "test");
        // save jwt token at cookie
        res.cookie("userToken", accessToken, { maxAge: maxAge * 2 });
        // sending json data with user id to frontend side
        return res.status(201).json({ user: user.id });
      });
    } catch (err) {
      return res.status(400).json({ err });
    }
  })(req, res);
};

// access to login page
const getLogin = (req, res) => {
  res.sendFile(path.join(__dirname, htmlFilePath + "/login.html"));
};

// make users logged out and remove users' token cookie and redirect to main page
const logout = (req, res) => {
  // deleting cookie
  res.clearCookie("userToken");
  res.status(200).json({ message: "logged out" });
};

// getting current user's info and sending JSON
const getMe = (req, res) => {
  // user's jwt token
  const clientToken = req.cookies.userToken;
  // find token and verify it
  if (clientToken) {
    jwt.verify(clientToken, "test", async (err, decodedToken) => {
      // if the token is expired, return undefined
      if (err) {
        res.json({ user: undefined });
      } else {
        // if there is a valid token, find data from database and save it as local variable.
        let user = await userModel.getUser(decodedToken.user);
        // finding posts that the user has made
        const posts = await postModel.getPostsByUserId(decodedToken.user);
        // deleting password value
        delete user.password;
        // inserting posts value to user object
        user["posts"] = posts;
        res.json(user);
      }
    });
  } else {
    res.json({ user: undefined });
  }
};

// finding user by id
const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  let user = await userModel.getUser(id);
  // getting posts that the user has made
  const posts = await postModel.getPostsByUserId(id);
  // deleting password value in the user object
  delete user.password;
  // inserting a list of posts into the user object
  user["posts"] = posts;
  if (user) {
    res.status(200).json(user);
  } else {
    res.json({ user: undefined });
  }
};

// editing users' profile
const postEditProfile = async (req, res) => {
  // getting values from the form
  const {
    params: { id },
    body: { nickname, email },
    file: { path },
  } = req;
  try {
    // checking if email that users typed is already registered
    const user = await userModel.getUserLogin(email);
    if (user) {
      // If there's an user that has same email that the user typed,
      // send error message to the form
      if (user.id != id) {
        const emailErrMsg = "email registered";
        const errors = errorHandler(emailErrMsg);
        res.status(400).json({ errors });
      }
    }
    // updating data from users table
    await userModel.updateUser(id, nickname, email, path);
    res.status(201).json({ message: "ok" });
  } catch (err) {
    res.status(400).json(err);
  }
};

// changing password
const changePassword = async (req, res) => {
  // taking user's id and passwords form the form
  const {
    body: { newPassword1 },
    params: { id },
  } = req;
  let newPassword = req.body.newPassword;

  // if two passwords are not same
  if (newPassword !== newPassword1) {
    // sending error message to the form
    const pwErrorMsg = "pwerr";
    const errors = errorHandler(pwErrorMsg);
    return res.status(400).json({ errors });
  } else {
    // if they are same
    try {
      // encrypting new password
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPassword, salt);
      newPassword = hash;
      // updating new password
      await userModel.changePassword(id, newPassword);
      return res.status(201).json({ message: "good" });
    } catch (e) {
      res.status(400).json(e);
    }
  }
};

// deleting an user account
const deleteUser = async (req, res) => {
  //getting user's id
  const {params: { id }} = req;
  try {
    // getting all posts that the user has made
    const posts = await postModel.getPostsByUserId(id);
    if (posts) {
      for (post of posts) {
        // If there're comments on the posts, delete them first
        const comments = await postModel.getComments(post.id);
        if (comments) {
          await postModel.deleteComments(post.id);
        }
        // deleting a file path which the deleted post has
        await postModel.deleteFiles(post.id);
        // and finally deleting post's data
        await postModel.deletePost(post.id);
      }
    }
  } catch (error) {
    console.log(error);
  }
  res.status(201).json({ message: "deleted successfully" });
};

module.exports = {
  postJoin,
  getJoin,
  postLogin,
  getLogin,
  logout,
  errorHandler,
  userDetail,
  postEditProfile,
  changePassword,
  getMe,
};
