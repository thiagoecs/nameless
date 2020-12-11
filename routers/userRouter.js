'use strict';
const express = require("express");
const { loggedUser,uploadAvatar } = require("../middlewares");
const userRouter = express.Router();
const {body} = require('express-validator');
const routes = require("../routes");
const {
  userDetail,
  getEditProfile,
  postEditProfile,
  changePassword,
  postJoin,
} = require("../controllers/userController");
const passport = require('../utils/passport')

//userRouter.get("/app/users", userHome);
//userRouter.get(routes.home, userHome);
// userRouter.get(
//   "/profile/:id",
//   passport.authenticate("jwt", { session: false }),
//   userDetailJSON
// );

userRouter.post('/',[
  body('name', 'minimum length 3 characters').isLength({min: 3}),
  body('email', 'is not valid email').isEmail(),
  body('password', 'minimum length 8 characters, at least one capital letter').matches('(?=.*[A-Z]).{8,}'), 
],
  postJoin);

// edit profile
userRouter.get("/edit-profile",getEditProfile);
userRouter.post("/edit-profile",loggedUser,uploadAvatar, postEditProfile)
// change password
userRouter.post("/:id/change-passwd", changePassword);

// user profile
userRouter.route("/:id").get(userDetail).put(uploadAvatar,postEditProfile);

// users' comments
//userRouter.post('/:id/comment',postAddComment)

module.exports = userRouter;
