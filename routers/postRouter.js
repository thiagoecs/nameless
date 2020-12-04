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

postRouter.get('/posts', verifyToken, postHome);

// upload a post
postRouter.use("/uploads", express.static("uploads"));
postRouter.route("/upload").get(verifyToken, getUpload)
.post(verifyToken, loggedUser, uploadFiles, postUpload);

// post detail page
postRouter.get('/:id', postDetail);

// edit a post
postRouter.route('/:id/edit').get(verifyToken, getEditPost)
.post(verifyToken, loggedUser,uploadFiles, postEditPost);

postRouter.get('/:id/delete', verifyToken, deletePost);

module.exports = postRouter;
