"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const routes = require("../routes");
const passport = require("../utils/passport");
//const passport = require('passport')
const userModel = require("../models/userModel");

// send join request
const postJoin = async (req, res, next) => {
  // same as const nickname = req.body.nickname ...
  const {
    body: { nickname, email, password2 },
  } = req;
  let password = req.body.password;
  if (password !== password2) {
    res.render("join", { pageTitle: "Join" });
  } else {
    const user = userModel.getUserLogin(email);
    if (user) {
      res.status(400).json({ error: "This email is already registered." });
    } else {
      try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        password = hash;
        if (await userModel.insertUser(nickname, email, password)) {
          next();
        }
      } catch (e) {
        res.status(400).json({ error: "register error" });
        console.log(e);
      }
    }
  }
};

// access join page
const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

// send login request using local authentication and make token.
const postLogin = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      console.log("not right user");
      res.redirect(routes.login);
    }
    req.login(user, { session: false }, (err) => {
      if (err) {
        //res.send(err);
        return next(err);
      }
      const token = jwt.sign({ user_id: user.email }, "test");
      console.log("token: ", token);
      res.cookie("user", token);
      return res.redirect(routes.home);
    });
  })(req, res,next);
};

// access to login page
const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Log In" });
};

const logout = (req, res) => {
  // TODO: Make users logged out
  req.logout();
  res.clearCookie('user')
  res.redirect(routes.home);
};

const userHome = (req, res) => res.send("user home");
const userDetail = (req, res) => res.send("user detail");
const editProfile = (req, res) => res.send("edit profile");
const changePassword = (req, res) => res.send("change password");

module.exports = {
  postJoin,
  getJoin,
  postLogin,
  getLogin,
  logout,
  userHome,
  userDetail,
  editProfile,
  changePassword,
};
//save functions
