"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

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
const getComments = async(id)=>{
  try {
    const [rows] = await promisePool.execute(
      "SELECT * FROM comments WHERE post = ?;",[id]
    );
    return rows;
  } catch (e) {
    console.error("postModel: ", e.message);
  }
}

const getPostsByUserId = async (id) => {
  try {
    //TODO: check the database info
    console.log("userid", id);
    const [
      rows,
    ] = await promisePool.execute(
      "SELECT * FROM posts WHERE posts.creator= ?",
      [id]
    );
    return rows;
  } catch (e) {
    console.error("getPostsByUserId: ", e.message);
  }
};

const getPostById = async (id) => {
  try {
    //TODO: check the database info
    console.log("postModel getPost", id);
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
const addViews = async (id, views) => {
  try {
    const [rows] = await promisePool.execute("UPDATE posts SET views=? WHERE id = ?;", [
      views,
      id,
    ]);
    console.log(rows.affectedRows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.log(e);
    return false;
  }
};
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

const insertPost = async (title, description, creator) => {
  try {
    //TODO: check the database info ***** need to edit later *****
    const [
      rows,
    ] = await promisePool.execute(
      "INSERT INTO posts (restaurant, description,creator) VALUES (?, ?, ?);",
      [title, description, creator]
    );
    console.log("postModel insertPost:", rows);
    return rows.insertId;
  } catch (e) {
    console.error("postModel insertPost:", e);
  }
};
const insertFiles = async (id, file) => {
  try {
    //TODO: check the database info ***** need to edit later *****
    const [
      rows,
    ] = await promisePool.execute("INSERT INTO files (postId, sourceFile) VALUES (?, ?);", [
      id,
      file,
    ]);
    console.log("postModel insertFiles:", rows);
    return rows.insertId;
  } catch (e) {
    console.error("postModel insertFiles:", e);
  }
};

const insertComment = async (text, post, creator) => {
  try {
    //TODO: check the database info ***** need to edit later *****
    const [
      rows,
    ] = await promisePool.execute(
      "INSERT INTO comments (text, post,creator) VALUES (?, ?, ?);",
      [text, post, creator]
    );
    console.log("postModel insertcomment:", rows);
    return rows.insertId;
  } catch (e) {
    console.error("postModel insertcomment:", e);
  }
};

const updatePost = async (id, title, description) => {
  try {
    const [
      rows,
    ] = await promisePool.execute(
      "UPDATE posts SET restaurant = ?, description = ? WHERE id = ?;",
      [title, description, id]
    );
    console.log("postModel updatePost:", rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const deletePost = async (id) => {
  try {
    //TODO: check the database info
    const [rows] = await promisePool.execute("DELETE FROM posts WHERE id = ?", [id]);
    return rows;
  } catch (e) {
    console.error("postModel deletePost:", e);
  }
};
const deleteFiles = async (id) => {
  try {
    //TODO: check the database info
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
    const [rows] = await promisePool.execute("UPDATE posts SET votes = ? WHERE id = ?;", [
      votes,
      id,
    ]);
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
};
