"use strict";
// for routes using posts route (/posts)
const express = require("express");
const passport = require("passport");
const postRouter = express.Router();
const {postRoot, postDetail, getUpload, postUpload, getEditPost, deletePost, editPost, addViews, postAddComment } = require("../controllers/postController");
const { verifyToken, uploadFiles, loggedUser } = require("../middlewares");
const routes = require("../routes");

// getting all posts' data (.../app/posts/)
postRouter.get(routes.home, postRoot);

// upload a post
postRouter
  .route(routes.upload)
  .get(verifyToken, getUpload)
  .post(passport.authenticate("jwt", { session: false }), loggedUser, uploadFiles, postUpload);

// a detailed post page
postRouter
  .route(routes.postDetail())
  .get(addViews, postDetail)
  .put(passport.authenticate("jwt", { session: false }), editPost)
  .delete(passport.authenticate("jwt", { session: false }), deletePost);

// edit a post
//postRouter.post("/:id/edit", verifyToken, loggedUser, uploadFiles, postEditPost);

//postRouter.get("/:id/delete", passport.authenticate("jwt", { session: false }), verifyToken, deletePost);

// adding a comment
postRouter.post("/:id/comment", passport.authenticate("jwt", { session: false }), verifyToken, postAddComment);

module.exports = postRouter;
