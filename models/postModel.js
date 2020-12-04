'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPosts = async () => {
  try {
    const [rows] = await promisePool
      //TODO: check the database info
      .execute(
        "SELECT posts.*, files.sourceFile, users.nickname FROM posts LEFT JOIN files ON posts.id = files.postId INNER JOIN users ON posts.creator = users.id ORDER BY posts.createdAt DESC"
      );
    return rows;
  } catch (e) {
    console.error('postModel: ', e.message);
  }   
};

const getPostById = async (id) => {
  try {
    //TODO: check the database info
    console.log('postModel getPost', id);
    const [
      rows,
    ] = await promisePool.execute(
      "SELECT posts.*, files.sourceFile, users.nickname FROM posts LEFT JOIN files ON posts.id = files.postId INNER JOIN users ON posts.creator = users.id WHERE posts.id= ?",
      [id]
    );
    return rows[0];
  } catch (e) {
    console.error('postModel: ', e.message);
  }   
};

const searchPosts = async (query) => {
  try {
    const [
      rows,
    ] = await promisePool.execute(
      "SELECT posts.*, files.sourceFile, users.nickname FROM posts LEFT JOIN files ON posts.id = files.postId INNER JOIN users ON posts.creator = users.id WHERE posts.restaurant= ?",
      [query]
    );
    return rows;
  } catch (e) {
    console.error("postModel: ", e.message);
  }
};

const insertPost = async(title,description,creator) =>{
  try{
      //TODO: check the database info ***** need to edit later *****
  const [
    rows,
  ] = await promisePool.execute(
    "INSERT INTO posts (restaurant, description,creator) VALUES (?, ?, ?);",
    [title, description, creator]
  );
  console.log('postModel insertPost:', rows);
  return rows.insertId;
  } catch (e) {
    console.error('postModel insertPost:', e);
  }
};
const insertFiles = async(id,file)=>{
  try {
    //TODO: check the database info ***** need to edit later *****
    const [
      rows,
    ] = await promisePool.execute(
      "INSERT INTO files (postId, sourceFile) VALUES (?, ?);",
      [id,file]
    );
    console.log("postModel insertFiles:", rows);
    return rows.insertId;
  } catch (e) {
    console.error("postModel insertFiles:", e);
  }
}
const updatePost = async (id,title,description) =>{
  try{
      //TODO: check the database info
    const [rows] = await promisePool.execute('UPDATE posts SET restaurant = ?, description = ? WHERE id = ?;',
    [title,description,id]);
    console.log('postModel updatePost:', rows);
    return rows.affectedRows === 1;
  }
  catch(e){
    console.log(e)
    return false;
  }
};

const updateFiles = async (id, file) => {
  try {
    //TODO: check the database info
    const [
      rows,
    ] = await promisePool.execute(
      "UPDATE files SET sourceFile=? WHERE postId= ?;",
      [file,id]
    );
    console.log("postModel updateFile:", rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.log(e);
    return false;
  }
};

const deletePost = async (id) => {
  try {
      //TODO: check the database info
    const [rows] = await promisePool.execute('DELETE FROM posts WHERE id = ?', [id]);
    return rows; 
  }
  catch(e){
    console.error('postModel deletePost:', e);
  }
};
const deleteFiles = async (id) => {
  try {
    //TODO: check the database info
    const [rows] = await promisePool.execute("DELETE FROM files WHERE postId = ?", [id]);
    return rows;
  } catch (e) {
    console.error( e);
  }
};



module.exports = {
  getAllPosts,
  getPostById,
  insertPost,
  updatePost,
  deletePost,
  insertFiles,
  updateFiles,
  deleteFiles,
  searchPosts
};
