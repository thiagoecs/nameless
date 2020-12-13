"use strict";
const postModel = require("../models/postModel");
const path = require("path");
const htmlFilePath = "../public/html";
const { validationResult } = require("express-validator");

// main page
const main = async (req, res) => {
  res.sendFile(path.join(__dirname, htmlFilePath + "/index.html"));
};

// get posts' information
const postRoot = async (req, res) => {
  // getting post data from database
  let posts = await postModel.getAllPosts();
  // finding comments on each posts
  for (let post of posts) {
    const comments = await postModel.getComments(post.id);
    // inserting comments value into the post object
    post["comments"] = comments;
  }
  res.json(posts);
};

// getting single post's data
const postDetail = async (req, res) => {
  const id = req.params.id;
  try {
    let post = await postModel.getPostById(id);
    // finding comments on the post
    const comments = await postModel.getComments(id);
    // inserting comments value into the post object
    post["comments"] = comments;
    res.json(post);
  } catch (err) {
    res.status(400).json(err);
  }
};

// show search results and keyword
const search = async (req, res) => {
  // getting a keyword from input field
  const keyword = req.query.term;
  try {
    // finding data from database by keyword
    const posts = await postModel.searchPosts(keyword);
    res.json({ searchingBy: keyword, posts });
  } catch (e) {
    console.log(e);
  }
};

// adding a number of views when an user clicks the post
const addViews = async (req, res, next) => {
  const id = req.params.id;
  try {
    // getting post's data and then a number of views
    const post = await postModel.getPostById(id);
    const views = post.views;
    // adding 1 and views
    const newViews = views + 1;
    // update post's data with a new number of views
    await postModel.addViews(id, newViews);
    next();
  } catch (err) {
    console.log(err);
  }
};

// adding comments
const postAddComment = async (req, res) => {
  //getting post id and comment text from request
  const {
    params: { id },
    body: { comment,userId },
  } = req;
  try {
    const user = await postModel.getPostById(id);
    // inserting data into comments table
    const newComment = await postModel.insertComment(comment, id, userId);
    res.status(201).json({ newComment });
  } catch (error) {
    console.log(error);
    res.status(400).json({ error });
  }
};

// upload page
const getUpload = (req, res) => res.sendFile(path.join(__dirname, htmlFilePath + "/upload.html"));

// sending upload request
const postUpload = async (req, res) => {
  try {
    console.log(req.body)
    // getting title, description, and file path from the form
    const {
      body: { title, description,creator },
      file: { path },
    } = req;
    // getting currently logged in user's id
     // inserting new post's data
    const newPost = await postModel.insertPost(title, description, creator);
    // inserting path of the post's image or video into files table
     await postModel.insertFiles(newPost, path);
    res.status(201).json({ message: "file uploaded" });
  } catch (err) {
    console.log(err);
    res.status(400).json({ err });
  }
};

// send request of editing the post
const editPost = async (req, res) => {
  // getting title (restaurant's name) and description from the form
  const {
    params: { id },
    body: { restaurant, description },
  } = req;
  try {
    // updating restaurant's name and description
    await postModel.updatePost(id, restaurant, description);
    res.status(201).json({ message: "post updated" });
  } catch (err) {
    res.status(400).json(err);
  }
};

// deleting posts
const deletePost = async (req, res) => {
  //getting post's id
  const {
    params: { id },
  } = req;
  try {
    // If there're comments on the post, delete them first
    const comments = await postModel.getComments(id);
    if (comments) {
      await postModel.deleteComments(id);
    }
    // deleting a file path which the deleted post has
    await postModel.deleteFiles(id);
    // and finally deleting post's data
    await postModel.deletePost(id);
  } catch (error) {
    console.log(error);
  }
  res.status(201).json({ message: "deleted successfully" });
};

module.exports = {
  main,
  search,
  postRoot,
  postDetail,
  getUpload,
  postUpload,
  editPost,
  deletePost,
  addViews,
  postAddComment,
};
