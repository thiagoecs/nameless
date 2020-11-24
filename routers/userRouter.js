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
userRouter.get(routes.editProfile, editProfile);
userRouter.get(routes.changePassword, changePassword);
userRouter.get(routes.userDetail, userDetail);

module.exports = userRouter;
