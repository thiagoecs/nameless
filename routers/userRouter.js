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

userRouter.get('/users', userHome);

// edit profile
userRouter.route('/edit-profile').get(getEditProfile)
.post(loggedUser,uploadAvatar, postEditProfile)
// change password
userRouter.get(routes.changePassword, changePassword);

// user profile
userRouter.get('/:id',userDetail);

module.exports = userRouter;
