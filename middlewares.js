"use strict";
// This file contains some middlewares.

const routes = require("./routes");
const jwt = require("jsonwebtoken");

const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Food Advisor";
  res.locals.routes = routes;
  res.locals.user = extractUserInfo(req)
  next();
};

const extractUserInfo = (req) => {
  try {
    const clientToken = req.cookies.userToken;
    const decodedToken = jwt.verify(clientToken, "test");
    return { id: decodedToken.id, nickanme: decodedToken.nickname, email: decodedToken.email };
  } catch (e) {
    return undefined;
  }
};

const verifyToken = (req, res, next) => {
  try {
    // finds user cookie and verifies token
    const clientToken = req.cookies.userToken;
    const decodedToken = jwt.verify(clientToken, "test");
    // handles when a token is not in cookie
    if (!decodedToken) {
      res.clearCookie('userToken')
      res.status(401).json({ error: "token expired" });
    } else {
      // handles when a token is valid
      next();
    }
  } catch (err) {
    // handles when unauthorized
    res.clearCookie("userToken");
    res.status(401).json({ error: "Unauthorized" });
  }
};

// manage routes
const onlyPublic = (req, res, next) => {
  const clientToken = req.cookies.userToken;
  if (clientToken) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

module.exports = { localsMiddleware, verifyToken, onlyPublic };
