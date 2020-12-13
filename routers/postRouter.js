"use strict";
// for routes using posts route (/posts)
const express = require("express");
const passport = require("passport");
const postRouter = express.Router();
const {postRoot, postDetail, getUpload, postUpload, deletePost, editPost, addViews, postAddComment } = require("../controllers/postController");
const { verifyToken, uploadFiles,  } = require("../middlewares");
const routes = require("../routes");

// getting all posts' data (.../app/posts/)
postRouter.get(routes.home, postRoot);

// upload a post
postRouter
  .route(routes.upload)
  .get(verifyToken, getUpload)
  .post(passport.authenticate("jwt", { session: false }), uploadFiles, postUpload);

// a detailed post page
postRouter
  .route(routes.postDetail())
  .get(addViews, postDetail)
  .put(passport.authenticate("jwt", { session: false }), editPost)
  .delete(passport.authenticate("jwt", { session: false }), deletePost);

// adding a comment
postRouter.post("/:id/comment", passport.authenticate("jwt", { session: false }), verifyToken, postAddComment);

module.exports = postRouter;
