"use strict";
const routes = require("../routes");
const postModel = require("../models/postModel");

//const {validationResult } = require('express-validator');
//const {makeThumbnail} = require('../utils/resize');
//const imageMeta = require('../utils/imageMeta');
//const { getCoordinates } = require('../utils/imageMeta');

// render index.ejs file with required source files
// Each functions send variable pageTitle to the layout file

// main page
const home = async (req, res) => {
  try {
    const posts = await postModel.getAllPosts();
    res.render("index", { pageTitle: "main", posts });
  } catch (e) {
    console.log(e);
    res.render("index", { pageTitle: "main", posts: [] });
  }
};

// show search results and query word
const search = async (req, res) => {
  const searchingBy = req.query.term;
  try {
    const posts = await postModel.searchPosts(searchingBy);
    console.log(posts);
    res.render("search", { pageTitle: `Search: ${searchingBy}`, searchingBy, posts });
  } catch (e) {
    console.log(e);
    res.render("search", { pageTitle: `Search: ${searchingBy}`, searchingBy, posts: [] });
  }
};

// for /video route
const postHome = (req, res) => res.send("post home");

// post detail
const postDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.getPostById(id);
    //res.send(post)
    res.render("postDetail", { pageTitle: post.restaurant, post });
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

// upload page
const getUpload = (req, res) => res.render("upload", { pageTitle: "Upload post" });

// send upload request
const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  const creator = res.locals.loggedUser.id;
  const newPost = await postModel.insertPost(title, description, creator);
  const newFile = await postModel.insertFiles(newPost, path);
  res.redirect(`${newpost}`);
};

// edit post
const getEditPost = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const post = await postModel.getPostById(id);
    if (post.creator !== res.locals.loggedUser.id) {
      throw Error();
    } else {
      res.render("editPost", { pageTitle: "Edit post", post });
    }
  } catch (err) {
    console.log(err);
    res.redirect('/');
  }
};

const postEditPost = async (req, res) => {
  const {
    params: { id },
    body: { title, description },
    file: { path },
  } = req;
  try {
    await postModel.updatePost(id, title, description);
    await postModel.updateFiles(id, path);
    res.redirect(`/${id}`);
  } catch (err) {
    res.redirect('/');
  }
};

const deletePost = async (req, res) => {
  const {
    params: { id },
  } = req;
  const post = await postModel.getPostById(id);
  try {
    if (post.creator !== res.locals.loggedUser.id) {
      throw Error();
    } else {
      await postModel.deletePost(id);
      await postModel.deleteFiles(id);
    }
  } catch (error) {
    console.log(error);
  }
  res.redirect(routes.home);
};

//functions with postModel

const make_thumbnail = async (req, res, next) => {
  try {
    const ready = await makeThumbnail(
      { width: 160, height: 160 },
      req.file.path,
      "./thumbnails/" + req.file.filename
    );
    if (ready) {
      console.log("make_thumbnail", ready);
      next();
    }
  } catch (e) {
    return res.status(400).json({ errors: e.message });
  }
};

const post_list_get = async (req, res) => {
  const posts = await postModel.getAllPosts();
  res.json(posts);
};

const post_get_by_id = async (req, res) => {
  const post = await postModel.getPost(req.params.id);
  res.json(post);
};

const post_create = async (req, res) => {
  console.log("postController post_create", req.body, req.file);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  const coords = await imageMeta;
  getCoordinates(req.file.path);
  console.log("coords", coords);
  req.body.coords = coords;

  const id = await postModel.insertPost(req, coords);
  const post = await postModel.getPost(id);
  res.send(post);
};

const post_update = async (req, res) => {
  const updateOk = await postModel.updatePost(req);
  res.json(`{message: "updated... ${updateOk}"}`);
};

const post_delete = async (req, res) => {
  const post = await postModel.deletePost(req.params.id);
  res.json(post);
};

module.exports = {
  home,
  search,
  postHome,
  postDetail,
  getUpload,
  postUpload,
  getEditPost,
  postEditPost,
  deletePost,
  make_thumbnail,
  post_list_get,
  post_get_by_id,
  post_create,
  post_update,
  post_delete,
};
