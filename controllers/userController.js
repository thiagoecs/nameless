"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const routes = require("../routes");
const passport = require("../utils/passport");
const userModel = require("../models/userModel");
const htmlFilePath = "../public/html";
const { validationResult } = require("express-validator");
const maxAge = 60 * 60 * 1000; // maximum storage period in millisecond

// error handler
// This is for sending error information to frontend side.
const errorHandler = (err) => {
  // object init (about email and password)
  let errors = { email: "", password: "" };
  // join error
  // when two passwords are not same
  if (err === "pwerr") {
    errors.password = "This is not same as the first password";
  }

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

const changePassword = async (req, res) => {
  const {
    body: { newPassword1 },
    params: { id },
  } = req;
  let newPassword = req.body.newPassword;

  if (newPassword !== newPassword1) {
    const pwErrorMsg = "pwerr";
    const errors = errorHandler(pwErrorMsg);
    return res.status(400).json({ errors });
  } else {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(newPassword, salt);
      newPassword = hash;

      await userModel.changePassword(id, newPassword);
      return res.status(201).json({ message: "good" });
    } catch (e) {
      console.log(e);
      res.status(400).json({ error: "some error" });
    }
  }
};
// sending join request
const postJoin = async (req, res, next) => {
   const errors = validationResult(req);
   console.log(errors)
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
  passport.authenticate("local", { session: false }, (err, user, info) => {
    try {
      // showing error message when there's no registered user or incorrect password
      if (err || !user) {
        const errors = errorHandler(err);
        return res.status(400).json({ errors });
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ err });
        }
        // if user succeeds login, jwt token is made
        const accessToken = jwt.sign({ user: user.id }, "test");
        res.cookie("userToken", accessToken, { maxAge: maxAge * 2 });
        // sending json data with user id to frontend
        return res.status(201).json({ user: user.id });
      });
    } catch (err) {
      console.log(err);
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
  req.logout();
  res.status(200).json({ message: "logged out" });
};

// getting current user's info and sending JSON
const getMe = (req, res) => {
  const clientToken = req.cookies.userToken;
  // find token and verify it
  if (clientToken) {
    jwt.verify(clientToken, "test", async (err, decodedToken) => {
      // if the token is expired, return undefined
      if (err) {
        console.log(err);
        res.json({ user: undefined });
      } else {
        // if there is a valid token, find data from database and save it as local variable
        let user = await userModel.getUser(decodedToken.user);
        res.status(201).json({
          id: user.id,
          nickname: user.nickname,
          avatarUrl: user.avatarUrl,
          email: user.email,
        });
      }
    });
  } else {
    res.json({ user: undefined });
  }
};

const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await userModel.getUser(id);
  if (user) {
    res.status(200).json({ id: user.id, nickname: user.nickname, avatarUrl: user.avatarUrl });
  } else {
    res.redirect(routes.home);
  }
};

// // show users' info
// const userDetail = async (req, res) => {
//   res.sendFile(path.join(__dirname, htmlFilePath + "/userDetail.html"));
// };

// edit profile
const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit profile", user: res.locals.loggedUser });
};

const postEditProfile = async (req, res) => {
  const {
    params: { id },
    body: { nickname, email },
    file: { path },
  } = req;
  try {
    // checking if email that users typed is already registered
    const user = await userModel.getUserLogin(email);
    if (user) {
      if (user.id != id) {
        const emailErrMsg = "email registered";
        const errors = errorHandler(emailErrMsg);
        res.status(400).json({ errors });
      }
    }
    await userModel.updateUser(id, nickname, email, path);
    res.status(201).json({ message:'ok' });
  } catch (err) {
    console.log(err);
    res.status(400).json({ errors: "some error" });
  }
};

module.exports = {
  postJoin,
  getJoin,
  postLogin,
  getLogin,
  logout,
  errorHandler,
  userDetail,
  getEditProfile,
  postEditProfile,
  changePassword,
  getMe,
};
//save functions
