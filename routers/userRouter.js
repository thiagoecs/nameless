'use strict';
const express = require("express");
const { verifyToken, loggedUser,uploadAvatar } = require("../middlewares");
const userRouter = express.Router();
const {body} = require('express-validator');
const routes = require("../routes");
const {
  userHome,
  userDetailJSON,
  userDetail,
  getEditProfile,
  postEditProfile,
  changePassword,
  postJoin,
} = require("../controllers/userController");
const passport = require('../utils/passport')


userRouter.get(routes.home, passport.authenticate("jwt", { session: false }), userHome);
userRouter.get(
  "/profile/:id",
  passport.authenticate("jwt", { session: false }),
  userDetailJSON
);

userRouter.post('/',[
  body('name', 'minimum length 3 characters').isLength({min: 3}),
  body('email', 'is not valid email').isEmail(),
  body('password', 'minimum length 8 characters, at least one capital letter').matches('(?=.*[A-Z]).{8,}'), 
],
  postJoin);

// edit profile
userRouter.get(routes.editProfile,getEditProfile);
userRouter.post(routes.editProfile,loggedUser,uploadAvatar, postEditProfile)
// change password
userRouter.get(routes.changePassword, changePassword);

// user profile
userRouter.get(routes.userDetail(),userDetail);

module.exports = userRouter;
