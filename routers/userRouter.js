'use strict';
const express = require("express");
const { verifyToken, loggedUser,uploadAvatar } = require("../middlewares");
const userRouter = express.Router();
const routes = require("../routes");
const {
  userHome,
  userDetailJSON,
  userDetail,
  getEditProfile,
  postEditProfile,
  changePassword,
} = require("../controllers/userController");
const passport = require('../utils/passport')


userRouter.get(routes.home, passport.authenticate("jwt", { session: false }), userHome);
userRouter.get(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  userDetailJSON
);

// edit profile
userRouter.get(routes.editProfile,getEditProfile);
userRouter.post(routes.editProfile,loggedUser,uploadAvatar, postEditProfile)
// change password
userRouter.get(routes.changePassword, changePassword);

// user profile
userRouter.get(routes.userDetail(),userDetail);

module.exports = userRouter;
