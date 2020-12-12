"use strict";
// for routes using root route

const express = require("express");
const globalRouter = express.Router();
const { body } = require("express-validator");
const passport = require("passport");
const { home, search } = require("../controllers/postController");
const { getJoin, postJoin, getLogin, postLogin, logout, getMe } = require("../controllers/userController");
const { onlyPublic } = require("../middlewares");
const routes = require("../routes");

// main page
globalRouter.get(routes.home, home);

// Registering and then making a newly registered account logged in
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join,onlyPublic,
  [
    body("nickname", "minimum length 3 characters").isLength({ min: 3 }),
    body("email", "is not valid email").isEmail(),
    body("password", "minimum length 8 characters, at least one capital letter").matches("(?=.*[A-Z]).{8,}"),
  ],
  postJoin,postLogin);

// login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

// logout
globalRouter.get(routes.logout, logout);

// search
globalRouter.get(routes.search, search);

// my profile
globalRouter.get(routes.me, passport.authenticate("jwt", { session: false }), getMe);

module.exports = globalRouter;
