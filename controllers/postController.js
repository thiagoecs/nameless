"use strict";
const routes = require("../routes");
const postModel = require("../models/postModel");
const path = require('path')
const htmlFilePath = '../public/html'

//const {validationResult } = require('express-validator');
//const {makeThumbnail} = require('../utils/resize');
//const imageMeta = require('../utils/imageMeta');
//const { getCoordinates } = require('../utils/imageMeta');

// main page
const home = async (req, res) => {
 res.sendFile(path.join(__dirname,htmlFilePath+'/index.html'))
};

// show search results and query word
const search = async (req, res) => {
  const searchingBy = req.query.term;
  try {
    const posts = await postModel.searchPosts(searchingBy);
    console.log(posts);
    res.json({searchingBy, posts})
    //res.sendFile(path.join(__dirname, htmlFilePath + "/search.html"));
    //res.render("search", { pageTitle: `Search: ${searchingBy}`, searchingBy, posts });
  } catch (e) {
    console.log(e);
    res.sendFile(path.join(__dirname, htmlFilePath + "/search.html"));
    //res.render("search", { pageTitle: `Search: ${searchingBy}`, searchingBy, posts: [] });
  }
};

const getSearch = (req, res)=>{
  res.sendFile(path.join(__dirname, htmlFilePath + "/search.html"));
}

// get posts' information
const postHome =async (req, res) => {
  const posts = await postModel.getAllPosts()
  res.json(posts)
}

// post detail
const postDetail = async (req, res) => {
  const id = req.params.id;
  try {
    const post = await postModel.getPostById(id);
    //res.send(post)
    res.render("postDetail", { pageTitle: post.restaurant, post });
  } catch (err) {
    console.log(err);
    res.redirect(routes.home);
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
  res.redirect(routes.postDetail(newPost));
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
    res.redirect(routes.home);
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
    res.redirect(routes.postDetail(id));
  } catch (err) {
    res.redirect(routes.home);
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
  getSearch
};
