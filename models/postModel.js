'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPosts = async () => {
  try {
    const [rows] = await promisePool
    //TODO: check the database info
    .execute('SELECT id, restaurant, description, views, fileUrl, comments, votes, creator, createdAt, foodType AS username FROM posts LEFT JOIN users ON creator = id');
    return rows;
  } catch (e) {
    console.error('postModel: ', e.message);
  }   
};

const getPost = async (id) => {
  try {
    //TODO: check the database info
    console.log('postModel getPost', id);
    const [rows] = await promisePool.execute('SELECT * FROM posts WHERE id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('postModel: ', e.message);
  }   
};

const insertPost = async(req) =>{
  try{
      //TODO: check the database info
  const [rows] = await promisePool.execute('INSERT INTO posts (restaurant, description, views, fileUrl, comments, votes, createdAt, foodType) VALUES (?, ?, ?, ?, ?, ?, ?, ?);',
  [req.body.restaurant, req.body.descritpion, req.body.views, req.file.fileUrl, req.body.comments, req.body.votes, req.body.createdAt, req.body.foodType]);
  console.log('postModel insertPost:', rows);
  return rows.insertId;
  } catch (e) {
    console.error('postModel insertPost:', e);
  }
};

const updatePost = async (req) =>{
  try{
      //TODO: check the database info
    const [rows] = await promisePool.execute('UPDATE posts SET restaurant = ?, description = ?, views = ?, fileUrl = ?, comments = ?, votes = ?, createdAt = ?, foodType = ? WHERE id = ?;',
    [req.body.restaurant, req.body.descritpion, req.body.views, req.file.fileUrl, req.body.comments, req.body.votes, req.body.createdAt, req.body.foodType]);
    console.log('postModel updatePost:', rows);
    return rows.affectedRows === 1;
  }
  catch(e){
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



module.exports = {
  getAllPosts,
  getPost,
  insertPost,
  updatePost,
  deletePost
};
