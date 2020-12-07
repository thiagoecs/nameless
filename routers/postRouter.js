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

postRouter.get("/", postHome);

// upload a post

postRouter.get("/upload", verifyToken, getUpload);
postRouter.post("/upload", verifyToken, loggedUser, uploadFiles, postUpload);

// post detail page
postRouter.get("/:id", postDetail);

// edit a post
postRouter.get("/:id/edit", verifyToken, getEditPost);
postRouter.post("/:id/edit", verifyToken, loggedUser,uploadFiles, postEditPost);

postRouter.get("/:id/delete", verifyToken, deletePost);

module.exports = postRouter;
