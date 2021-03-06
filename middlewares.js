"use strict";
// This file contains some middlewares.

const userModel = require("./models/userModel");
const routes = require("./routes");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase(); // extension of a file
    if (ext === ".png" || ext === ".jpg" || ext === ".gif" || ext === ".jpeg") {
      cb(null, "uploads/files/images");
    } else if (ext === ".avi" || ext === ".mp4" || ext === ".wmv" || ext == ".mpg") {
      cb(null, "uploads/files/video");
    }else cb(null,'uploads/files')
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});
const imageFilter = (req,file,cb)=>{
  const ext = path.extname(file.originalname)
  if (ext !== '.png'&& ext === ".jpg" && ext === ".gif" && ext === ".jpeg"){
    return cb(res.end('only images are allowed'),null)
  }cb(null,true)
}
const multerFiles = multer({ storage: storage });

const multerAvatar = multer({ dest: "uploads/avatars/" , fileFilter:imageFilter});

// saving local variables for frontend files
const localsMiddleware = (req, res, next) => {
  res.locals.siteName = "Food Advisor";
  res.locals.routes = routes;
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
const loggedUser = (req, res, next) => {
  const clientToken = req.cookies.userToken;
  // find token and verify it
  if (clientToken) {
    jwt.verify(clientToken, "test", async (err, decodedToken) => {
      // if the token is expired, return undefined
      if (err) {
        res.locals.loggedUser = undefined;
        next();
      } else {
        // if there is a valid token, find data from database and save it as local variable
        let user = await userModel.getUser(decodedToken.user);
        res.locals.loggedUser = user;
        next();
      }
    });
  } else {
    // if there's no token, return undefined
    res.locals.loggedUser = undefined;
    next();
  }
};

// managing routes that is only for not logged in users
const onlyPublic = (req, res, next) => {
  const clientToken = req.cookies.userToken;
  // If there is a token, redirected to main page
  if (clientToken) {
    res.redirect(routes.home);
  } else {
    next();
  }
};

const uploadFiles = multerFiles.single("file");
const uploadAvatar = multerAvatar.single("avatar");
module.exports = {
  localsMiddleware,
  verifyToken,
  onlyPublic,
  loggedUser,
  uploadFiles,
  uploadAvatar,
};
