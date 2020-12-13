"use strict";
const express = require("express");
const userRouter = express.Router();
const { body } = require("express-validator");
const { userDetail,  postEditProfile, changePassword } = require("../controllers/userController");
const { uploadAvatar } = require("../middlewares");
const passport = require("../utils/passport");
const routes = require("../routes");

// userRouter.post(routes.home,[
//     body("name", "minimum length 3 characters").isLength({ min: 3 }),
//     body("email", "is not valid email").isEmail(),
//     body("password", "minimum length 8 characters, at least one capital letter").matches("(?=.*[A-Z]).{8,}"),
//   ],postJoin);

// changing password
userRouter.post(
  "/:id/change-passwd",
  passport.authenticate("jwt", { session: false }),
  [body("password", "minimum length 8 characters, at least one capital letter").matches("(?=.*[A-Z]).{8,}")],
  changePassword
);

// getting and editting user data
userRouter
  .route(routes.userDetail())
  .get(userDetail)
  .put(passport.authenticate("jwt", { session: false }), uploadAvatar, postEditProfile);

module.exports = userRouter;
