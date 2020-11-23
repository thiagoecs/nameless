const path = require("path");

const home = (req, res) =>
    // render html file with required source files
  res.sendFile(path.join(__dirname, "../src", "./html/index.html"));
const search = (req, res) => res.send("Search");
const postHome = (req, res) => res.send("post home");
const postDetail = (req, res) => res.send("post detail");
const upload = (req, res) => res.send("upload");
const editPost = (req, res) => res.send("edit post");
const deletePost = (req, res) => res.send("delete post");

module.exports = {
  home,
  search,
  postHome,
  postDetail,
  upload,
  editPost,
  deletePost,
};
