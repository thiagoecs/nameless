"use strict";
const express = require("express");
const globalRouter = express.Router();
const routes = require("../routes");
const { onlyPublic, verifyToken,loggedUser } = require("../middlewares");
const { home, search } = require("../controllers/postController");
const {
  getJoin,
  postJoin,
  getLogin,
  postLogin,
  logout,
  getMe
} = require("../controllers/userController");
const passport = require('passport')

// main page
globalRouter.get(routes.home, home);

// Register and make newly registered account logged in
globalRouter.get(routes.join, onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

// login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

// logout
globalRouter.get(routes.logout, logout);

// search
globalRouter.get(routes.search, search);

// my profile
globalRouter.get(routes.me,  getMe);

module.exports = globalRouter;
