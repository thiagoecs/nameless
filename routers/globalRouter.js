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
//globalRouter.use("/public", express.static("public"));
//const passport = require('passport')
globalRouter.all(`/${routes.join}`,(req,res,next)=>{
  console.log('globalRouter');
  next();
});
// main page
globalRouter.get(routes.home, home);

// Register and make newly registered account logged in
globalRouter.get('join', onlyPublic, getJoin);
globalRouter.post(routes.join, onlyPublic, postJoin, postLogin);

// login
globalRouter.get(routes.login, onlyPublic, getLogin);
globalRouter.post(routes.login, onlyPublic, postLogin);

// logout
globalRouter.get(routes.logout,verifyToken, logout);

// search
globalRouter.get(routes.search, search);

// my profile
globalRouter.get(routes.me, verifyToken,loggedUser, getMe);

module.exports = globalRouter;
