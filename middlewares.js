"use strict";
// This file contains some middlewares.

const routes = require("./routes");
const jwt = require("jsonwebtoken");
const multer = require("multer");
const path = require("path");

// storage setting from multer
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    const ext = path.extname(file.originalname).toLowerCase(); // extension of a file
    // if a file has image extension
    if (ext === ".png" || ext === ".jpg" || ext === ".gif" || ext === ".jpeg") {
      cb(null, "uploads/files/images"); // saving images in this folder
      // if a file has video extension
    } else if (ext === ".avi" || ext === ".mp4" || ext === ".wmv" || ext == ".mpg") {
      // saving videos in this folder
      cb(null, "uploads/files/videos");
      // saving files with other extensions
    } else cb(null, "uploads/files");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

// filtering image file extensions
const imageFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (ext !== ".png" && ext === ".jpg" && ext === ".gif" && ext === ".jpeg") {
    return cb(res.end("only images are allowed"), null);
  }
  cb(null, true);
};

// for uploading posts
const multerFiles = multer({ storage: storage });

// for avatar image of users' profile
const multerAvatar = multer({ dest: "uploads/avatars/", fileFilter: imageFilter });

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
    console.log(err)
  }
};

// managing routes that is only for not logged in users
const onlyPublic = (req, res, next) => {
  const clientToken = req.cookies.userToken;
  // If there is a token, redirected to main page
  if (clientToken) {
    res.redirect(routes.home+'/app/');
  } else {
    next();
  }
};

const uploadFiles = multerFiles.single("file");
const uploadAvatar = multerAvatar.single("avatar");

module.exports = {
  verifyToken,
  onlyPublic,
  uploadFiles,
  uploadAvatar,
};
