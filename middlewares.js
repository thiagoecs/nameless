"use strict";
// This file contains some middlewares.

const routes = require("./routes");
const jwt = require("jsonwebtoken");
const userModel = require("./models/userModel");

const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Food Advisor";
  res.locals.routes = routes;
  //res.locals.loggedUser = req.cookies.userToken || undefined
  next();
};

// finds user cookie and verifies token
const verifyToken = (req, res, next) => {
  const clientToken = req.cookies.userToken;
  try {
    const decodedToken = jwt.verify(clientToken, "test");
    // when the token is expired
    if (!decodedToken) {
      res.clearCookie("userToken");
      res.redirect(routes.login);
    } else {
      // handles when a token is valid
      next();
    }
  } catch (err) {
    // when the token is not verified
    res.redirect(routes.login);
  }
};

// check current user
const loggedUser = (req, res,next) => {
  const clientToken = req.cookies.userToken;
  if (clientToken) {
    jwt.verify(clientToken, "test", async(err,decodedToken)=>{
      if(err){
        res.locals.loggedUser = undefined
       next()
      } else{
        let user = await userModel.getUser(decodedToken.user)
        console.log('tokenuser',user)
        res.locals.loggedUser = user
        next();
      }
    });
  } else {
    res.locals.loggedUser = undefined
    next()
  }
};

// managing routes that is only for not logged in users
const onlyPublic = (req, res, next) => {
  const clientToken = req.cookies.userToken;
  if (clientToken) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

module.exports = { localsMiddleware, verifyToken, onlyPublic,loggedUser };
