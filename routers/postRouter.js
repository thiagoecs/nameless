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

postRouter.get(routes.home, postHome);
postRouter.get(routes.upload, upload);
postRouter.get(routes.postDetail(), postDetail);
postRouter.get(routes.editPost, editPost);
postRouter.get(routes.deletePost, deletePost);

module.exports = postRouter;
