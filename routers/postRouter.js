"use strict";
const express = require("express");
const routes = require("../routes");
const postRouter = express.Router();
const {
  postHome,
  postDetail,
  getUpload,
  postUpload,
  getEditPost,
  deletePost,
  postEditPost,
} = require("../controllers/postController");
const { verifyToken, uploadFiles, loggedUser } = require("../middlewares");

postRouter.get(routes.home, postHome);

// upload a post
postRouter.use("/uploads", express.static("uploads"));
postRouter.get(routes.upload, verifyToken, getUpload);
postRouter.post(routes.upload, verifyToken, loggedUser, uploadFiles, postUpload);

// post detail page
postRouter.get(routes.postDetail(), postDetail);

// edit a post
postRouter.get(routes.editPost(), verifyToken, getEditPost);
postRouter.post(routes.editPost(), verifyToken, loggedUser,uploadFiles, postEditPost);

postRouter.get(routes.deletePost(), verifyToken, deletePost);

module.exports = postRouter;
