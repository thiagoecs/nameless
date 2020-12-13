"use strict";
const express = require("express");
const { loggedUser, uploadAvatar } = require("../middlewares");
const userRouter = express.Router();
const { body } = require("express-validator");
const routes = require("../routes");
const { userDetail,  postEditProfile, changePassword, postJoin } = require("../controllers/userController");
const passport = require("../utils/passport");

userRouter.post(routes.home,[
    body("name", "minimum length 3 characters").isLength({ min: 3 }),
    body("email", "is not valid email").isEmail(),
    body("password", "minimum length 8 characters, at least one capital letter").matches("(?=.*[A-Z]).{8,}"),
  ],postJoin);

// changing password
userRouter.post(routes.changePassword, passport.authenticate("jwt", { session: false }), changePassword);

// getting and editting user profile
userRouter
  .route(routes.userDetail())
  .get(userDetail)
  .put(passport.authenticate("jwt", { session: false }), uploadAvatar, postEditProfile);

module.exports = userRouter;
