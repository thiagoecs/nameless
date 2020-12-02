"use strict";
const express = require("express");
const routes = require("../routes");
const postRouter = express.Router();
const {
  postHome,
  postDetail,
  getUpload,
  postUpload,
  editPost,
  deletePost,
} = require("../controllers/postController");
const { verifyToken } = require("../middlewares");
const passport = require('../utils/passport')

postRouter.get(routes.home, passport.authenticate('jwt', {session: false}), postHome);

// upload a post
postRouter.get(routes.upload, verifyToken, getUpload);
postRouter.post(routes.upload, verifyToken, postUpload)

// post detail page
postRouter.get(routes.postDetail(), postDetail);

// edit a post
postRouter.get(routes.editPost, verifyToken, editPost);
postRouter.get(routes.deletePost, verifyToken, deletePost);

module.exports = postRouter;
