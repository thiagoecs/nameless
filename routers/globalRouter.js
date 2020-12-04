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
globalRouter.get('', home);

// Register and make newly registered account logged in
globalRouter.get('join', onlyPublic, getJoin);
globalRouter.post('join', onlyPublic, postJoin, postLogin);

// login
globalRouter.get('login', onlyPublic, getLogin);
globalRouter.post('login', onlyPublic, postLogin);

// logout
globalRouter.get('logout',verifyToken, logout);

// search
globalRouter.get('search', search);

// my profile
globalRouter.get('me', verifyToken,loggedUser, getMe);

module.exports = globalRouter;
