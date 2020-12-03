"use strict";
const routes = require("../routes");
const posts = require("../db");

// render index.ejs file with required source files
// Each functions send variable pageTitle to the layout file

// main page
const home = (req, res) => {
  console.log(req.user)
  res.render("index", { pageTitle: "main", posts });
};

// show search results and query word
const search = (req, res) => {
  const searchingBy = req.query.term;
  console.log(searchingBy);
  res.render("search", { pageTitle: `Search: ${searchingBy}`, searchingBy });
};

const postHome = (req, res) => res.send("post home");

// post detail
const postDetail = (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    //TODO: connect to database
    res.render("postDetail", { pageTitle: "main", posts });
  } catch (err) {
    console.log(err);
    res.redirect(routes.home);
  }
};

// upload page
const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload post" });

// send upload request
const postUpload = async (req, res) => {};

// edit post
const editPost = (req, res) => res.send("edit post");
const deletePost = (req, res) => res.send("delete post");

module.exports = {
  home,
  search,
  postHome,
  postDetail,
  getUpload,
  postUpload,
  editPost,
  deletePost,
};
