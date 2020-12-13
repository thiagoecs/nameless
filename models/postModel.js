"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();
// managing data about posts, comments, and image/video files

// getting every posts that exist, taking file path from files table, and users' nickname and their type from users table
// Posts are listed from the latest.
const getAllPosts = async () => {
  try {
    const [rows] = await promisePool.execute(
      "SELECT posts.*, files.sourceFile, users.nickname, users.userType FROM posts LEFT JOIN files ON posts.id = files.postId INNER JOIN users ON posts.creator = users.id ORDER BY posts.createdAt DESC"
    );
    return rows;
  } catch (e) {
    console.error("postModel: ", e.message);
  }
};

// taking all comments on a post
const getComments = async (id) => {
  try {
    const [rows] = await promisePool.execute("SELECT * FROM comments WHERE post = ? order by createdAt DESC;", [id]);
    return rows;
  } catch (e) {
    console.error("postModel: ", e.message);
  }
};

// taking all posts that a user has made
const getPostsByUserId = async (id) => {
  try {
    const [rows] = await promisePool.execute("SELECT * FROM posts WHERE posts.creator= ?", [id]);
    return rows;
  } catch (e) {
    console.error("getPostsByUserId: ", e.message);
  }
};

// getting a single post by its id
const getPostById = async (id) => {
  try {
    const [
      rows,
    ] = await promisePool.execute(
      "SELECT posts.*, files.sourceFile, users.nickname FROM posts LEFT JOIN files ON posts.id = files.postId INNER JOIN users ON posts.creator = users.id WHERE posts.id= ?",
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error("postModel: ", e.message);
  }
};

// adding a number of views from a post
const addViews = async (id, views) => {
  try {
    const [rows] = await promisePool.execute("UPDATE posts SET views=? WHERE id = ?;", [views, id]);
    return rows.affectedRows === 1;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// getting posts which match a keyword
const searchPosts = async (query) => {
  try {
    const [
      rows,
    ] = await promisePool.execute(
      "SELECT posts.*, files.sourceFile, users.nickname FROM posts LEFT JOIN files ON posts.id = files.postId INNER JOIN users ON posts.creator = users.id WHERE posts.restaurant LIKE ? ORDER BY posts.createdAt DESC",
      ["%" + query + "%"]
    );
    return rows;
  } catch (e) {
    console.error("postModel: ", e.message);
  }
};

// inserting new posts' data into posts table
const insertPost = async (title, description, creator) => {
  try {
    const [rows] = await promisePool.execute("INSERT INTO posts (restaurant, description,creator) VALUES (?, ?, ?);", [title, description, creator]);
    return rows.insertId;
  } catch (e) {
    console.error("postModel insertPost:", e);
  }
};

// inserting file paths into files table
const insertFiles = async (id, file) => {
  try {
    const [rows] = await promisePool.execute("INSERT INTO files (postId, sourceFile) VALUES (?, ?);", [id, file]);
    return rows.insertId;
  } catch (e) {
    console.error("postModel insertFiles:", e);
  }
};

// inserting new comments' data into comments table
// saving text, post id, and creator id
const insertComment = async (text, post, creator) => {
  try {
    const [rows] = await promisePool.execute("INSERT INTO comments (text, post,creator) VALUES (?, ?, ?);", [text, post, creator]);
    return rows.insertId;
  } catch (e) {
    console.error("postModel insertcomment:", e);
  }
};

// updating title (restaurant's name) and description of a post
const updatePost = async (id, title, description) => {
  try {
    const [rows] = await promisePool.execute("UPDATE posts SET restaurant = ?, description = ? WHERE id = ?;", [title, description, id]);
    return rows.affectedRows === 1;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// deleting post data from posts table 
const deletePost = async (id) => {
  try {
    const [rows] = await promisePool.execute("DELETE FROM posts WHERE id = ?", [id]);
    return rows;
  } catch (e) {
    console.error("postModel deletePost:", e);
  }
};

// deleting comments on the post which the user wants to delete from comments table 
const deleteComments = async (id) => {
  try {
    const [rows] = await promisePool.execute("DELETE FROM comments WHERE post = ?", [id]);
    return rows;
  } catch (e) {
    console.error("postModel deletePost:", e);
  }
};

// deleting a file path on the post which the user wants to delete from files table
const deleteFiles = async (id) => {
  try {
    const [rows] = await promisePool.execute("DELETE FROM files WHERE postId = ?", [id]);
    return rows;
  } catch (e) {
    console.error(e);
  }
};

const getVotes = async (id) => {
  try {
    const [rows] = await promisePool.execute("SELECT votes FROM posts WHERE id = ?", [id]);
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

const updateVote = async (id, votes) => {
  try {
    const [rows] = await promisePool.execute("UPDATE posts SET votes = ? WHERE id = ?;", [votes, id]);
    return rows;
  } catch (e) {
    return errorJson(e.message);
  }
};

module.exports = {
  getAllPosts,
  getPostById,
  insertPost,
  insertComment,
  updatePost,
  deletePost,
  insertFiles,
  deleteFiles,
  searchPosts,
  getVotes,
  updateVote,
  addViews,
  getComments,
  getPostsByUserId,
  deleteComments,
};
