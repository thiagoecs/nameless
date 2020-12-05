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

userRouter.get("/app/users", userHome);

// edit profile
userRouter.get("/edit-profile",getEditProfile);
userRouter.post("/edit-profile",loggedUser,uploadAvatar, postEditProfile)
// change password
userRouter.get("/change-passwd", changePassword);

// user profile
userRouter.get("/:id",userDetail);

module.exports = userRouter;
