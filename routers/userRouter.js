'use strict';
const express = require("express");
const { verifyToken, loggedUser,uploadAvatar } = require("../middlewares");
const userRouter = express.Router();
const routes = require("../routes");
const {
  userHome,
  userDetail,
  getEditProfile,
  postEditProfile,
  changePassword,
} = require("../controllers/userController");
userRouter.use("/uploads", express.static("uploads"));

userRouter.get(routes.home, userHome);

// edit profile
userRouter.get(routes.editProfile,getEditProfile);
userRouter.post(routes.editProfile,loggedUser,uploadAvatar, postEditProfile)
// change password
userRouter.get(routes.changePassword, changePassword);

// user profile
userRouter.get(routes.userDetail(),userDetail);

module.exports = userRouter;
