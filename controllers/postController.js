"use strict";
const routes = require("../routes");
const postModel = require("../models/postModel");
const path = require("path");
const htmlFilePath = "../public/html";
const { validationResult } = require("express-validator");

// main page
const home = async (req, res) => {
  res.sendFile(path.join(__dirname, htmlFilePath + "/index.html"));
};

const postAddComment = async (req, res) => {
  const {
    params: { id },
    body: { comment },
  } = req;
  try {
    const user = await postModel.getPostById(id);
    const userId = user.creator;
    const newComment = await postModel.insertComment(comment, id, userId);
    res.status(201).json({ newComment });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};
// show search results and query word
const search = async (req, res) => {
  const searchingBy = req.query.term;
  try {
    const posts = await postModel.searchPosts(searchingBy);
    console.log(posts);
    res.json({ searchingBy, posts });
  } catch (e) {
    console.log(e);
  }
};

// get posts' information
const postHome = async (req, res) => {
  let posts = await postModel.getAllPosts();
  for (let post of posts) {
    const comments = await postModel.getComments(post.id);
    post["comments"] = comments;
  }
  res.json(posts);
};

const addViews = async (req, res, next) => {
  const id = req.params.id;
  console.log(id);
  try {
    const post = await postModel.getPostById(id);
    const views = post.views;
    const newViews = views + 1;
    console.log("views", views);
    await postModel.addViews(id, newViews);
    next();
  } catch (err) {
    console.log(err);
  }
};
// post detail
const postDetail = async (req, res) => {
  const id = req.params.id;
  try {
    let post = await postModel.getPostById(id);
    const comments = await postModel.getComments(id);
    post["comments"] = comments;
    res.json(post);
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

// upload page
const getUpload = (req, res) =>
  res.sendFile(path.join(__dirname, htmlFilePath + "/upload.html"));

// send upload request
const postUpload = async (req, res) => {
  const {
    body: { title, description },
    file: { path },
  } = req;
  console.log(req.id);
  const creator = res.locals.loggedUser.id;
  const newPost = await postModel.insertPost(title, description, creator);
  const newFile = await postModel.insertFiles(newPost, path);
  res.status(201).json({ message: "file uploaded" });
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
    body: { restaurant, description },
  } = req;
  try {
    await postModel.updatePost(id, restaurant, description);
    res.status(201).json({message:'done'});
  } catch (err) {
    console.log(err);
    res.status(400).json(err);
  }
};

const deletePost = async (req, res) => {
  const {
    params: { id },
  } = req;
  try {
    const comments = await postModel.getComments(id);
    if (comments) {
      await postModel.deleteComments(id);
    }
    await postModel.deleteFiles(id);
    await postModel.deletePost(id);
  } catch (error) {
    console.log(error);
  }
  res.status(201).json({ message: "deleted successfully" });
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
  addViews,
  postAddComment,
};
