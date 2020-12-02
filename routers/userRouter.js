'use strict';
const express = require("express");
const userRouter = express.Router();
const routes = require("../routes");
const {
  userHome,
  userDetail,
  editProfile,
  changePassword,
} = require("../controllers/userController");

userRouter.get(routes.home, userHome);

// edit profile
userRouter.get(routes.editProfile, editProfile);

// change password
userRouter.get(routes.changePassword, changePassword);

// user profile
userRouter.get(routes.userDetail, userDetail);

module.exports = userRouter;
