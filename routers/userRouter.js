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

userRouter.get("/app/users", userHome);
userRouter.get(routes.home, passport.authenticate("jwt", { session: false }), userHome);
userRouter.get(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  userDetailJSON
);
// edit profile
userRouter.get("/edit-profile",getEditProfile);
userRouter.post("/edit-profile",loggedUser,uploadAvatar, postEditProfile)
// change password
userRouter.get("/change-passwd", changePassword);

// user profile
userRouter.get("/:id",userDetail);

module.exports = userRouter;
