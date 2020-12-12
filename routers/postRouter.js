"use strict";
// for routes using posts route
const express = require("express");
const passport = require('passport')
const postRouter = express.Router();
const {
  postHome,
  postDetail,
  getUpload,
  postUpload,
  getEditPost,
  deletePost,
  postEditPost,
  addViews,
  postAddComment,
} = require("../controllers/postController");
const { verifyToken, uploadFiles, loggedUser } = require("../middlewares");
const routes = require("../routes");

postRouter.get(routes.home, postHome);

// upload a post
postRouter.route(routes.upload).get(verifyToken, getUpload)
.post(passport.authenticate("jwt", { session: false }), loggedUser, uploadFiles, postUpload);

// post detail page
postRouter.route("/:id").get(addViews,postDetail).put(postEditPost).delete(deletePost);

// edit a post
postRouter.get("/:id/edit", verifyToken, getEditPost);
postRouter.post("/:id/edit", verifyToken, loggedUser, uploadFiles, postEditPost);

postRouter.get("/:id/delete", verifyToken, deletePost);
postRouter.post("/:id/comment", verifyToken, postAddComment);

module.exports = postRouter;
