"use strict";
const express = require("express");
const routes = require("../routes");
const postRouter = express.Router();
const {
  postHome,
  postDetail,
  upload,
  editPost,
  deletePost,
} = require("../controllers/postController");
const { verifyToken } = require("../middlewares");

postRouter.get(routes.home, postHome);

// upload a post
postRouter.get(routes.upload, verifyToken, upload);

// post detail page
postRouter.get(routes.postDetail(), postDetail);

// edit a post
postRouter.get(routes.editPost, verifyToken, editPost);
postRouter.get(routes.deletePost, verifyToken, deletePost);

module.exports = postRouter;
