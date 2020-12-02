"use strict";
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const routes = require("../routes");
const passport = require("../utils/passport");
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
    // check if email that users put is already registered
    const user = await userModel.getUserLogin(email);
    if (!user) {
      try {
        const salt = bcrypt.genSaltSync(10);
        const hash = bcrypt.hashSync(password, salt);
        password = hash;
        if (await userModel.insertUser(nickname, email, password)) {
          next();
        }
      } catch (e) {
        console.log(e);
        res.status(400).json({ error: "register error" });
      }
    } else {
      res.status(400).json({ error: "This email is already registered." });
    }
  }
};

// access join page
const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
};

// send login request using local authentication and make token.
const postLogin = (req, res) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    try {
      if (err) {
        return res.status(400).json({
          err,
        });
      }
      if (!user) {
        console.log("not right user");
        res.redirect(routes.login);
      }
      req.login(user, { session: false }, (err) => {
        if (err) {
          console.log(err);
          return res.status(400).json({ err });
        }
        const token = jwt.sign({ id: user.id, nickname: user.nickname, email:user.email }, "test", {
          expiresIn: "24h",
        });
        res.cookie("userToken", token);
        res.redirect(routes.home);
      });
    } catch (err) {
      return res.status(400).json({ err });
    }
  })(req, res);
//return req.user;
};

// access to login page
const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Log In" });
};

// make users logged out and remove users' token cookie and redirect to main page
const logout = (req, res) => {
  res.clearCookie("userToken");
  res.redirect(routes.home);
};

// ******** TODO: make profile pages ********
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
