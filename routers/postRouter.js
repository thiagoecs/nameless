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

<<<<<<< HEAD
postRouter.get("/app/posts", verifyToken, postHome);
=======
postRouter.get(routes.home, postHome);
>>>>>>> html-test

// upload a post
postRouter.use("/upload", express.static("uploads"));
postRouter.get("/upload", verifyToken, getUpload);
postRouter.post("/upload", verifyToken, loggedUser, uploadFiles, postUpload);

// post detail page
postRouter.get("/:id", postDetail);

// edit a post
postRouter.get("/:id/edit", verifyToken, getEditPost);
postRouter.post("/:id/edit", verifyToken, loggedUser,uploadFiles, postEditPost);

postRouter.get("/:id/delete", verifyToken, deletePost);

module.exports = postRouter;
