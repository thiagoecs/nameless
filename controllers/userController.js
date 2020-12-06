"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const path = require("path");
const routes = require("../routes");
const passport = require("../utils/passport");
const userModel = require("../models/userModel");
const htmlFilePath = "../public/html";

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

// sending join request
const postJoin = async (req, res, next) => {
  // same as const nickname = req.body.nickname ...
  const { nickname, email, password2 } = req.body;
  let password = req.body.password;

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
        if (await userModel.insertUser(nickname, email, password)) {
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
          return res.status(400).json({ err });
        }
        // if user succeeds login, jwt token is made
        const accessToken = jwt.sign({ user: user.id }, "test");
        res.cookie("userToken", accessToken);
        // sending json data with user id to frontend
        return res.status(201).json({ user: user.id, accessToken });
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
  //req.logout();
  res.clearCookie("userToken");
  res.status(200).json({ message: "logged out" });
};

// ******** TODO: make profile pages ********
const userHome = (req, res) => {
  res.send({ hi: req.onnewsession });
};
// get my profile
const getMe = async (req, res) => {
  res.json({ req });
};

// show users' info
const userDetail = async (req, res) => {
  const {
    params: { id },
  } = req;
  const user = await userModel.getUser(id);
  if (user) {
    // res.render("userDetail", { pageTitle: "User detail", user });
    // console.log("user query", user);
    res.status(200).json({ user });
  } else {
    res.redirect(routes.home);
  }
};

// edit profile
const getEditProfile = (req, res) => {
  res.render("editProfile", { pageTitle: "Edit profile", user: res.locals.loggedUser });
};

const postEditProfile = async (req, res) => {
  const {
    body: { nickname, email },
    file: { path },
  } = req;
  const user = res.locals.loggedUser;
  console.log(req.file);
  try {
    await userModel.updateUser(user.id, nickname, email, path);
    res.redirect(routes.me);
  } catch (err) {
    console.log(err);
    res.redirect(routes.editProfile);
  }
};

// change password
const changePassword = (req, res) => res.send("change password");

//functions using the model
const user_update = async (req, res) => {
  const updateOk = await userModel.updateUser(req.params.id, req);
  res.send(`updated... ${updateOk}`);
};

const user_delete = async (req, res) => {
  const deleteOk = await userModel.deleteUser(req.params.id, req);
  res.send(`deleted... ${deleteOk}`);
};

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

const user_get_by_id = async (req, res) => {
  const user = await userModel.getUser(req.params.id);
  res.json(user);
};

const user_create = async (req, res) => {
  console.log("userController user_create", req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const id = await userModel.insertUser(req);
  const user = await userModel.getUser(id);
  res.send(user);
};

module.exports = {
  postJoin,
  getJoin,
  postLogin,
  getLogin,
  logout,
  userHome,
  userDetail,
  getEditProfile,
  postEditProfile,
  changePassword,
  getMe,
};
//save functions
