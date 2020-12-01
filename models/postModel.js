'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllPosts = async () => {
  try {
    const [rows] = await promisePool
    //TODO: change the database info
    .execute('SELECT cat_id, wop_cat.name, age, weight, owner, filename, user_id, coords, wop_user.name AS ownername FROM wop_cat LEFT JOIN wop_user ON owner = user_id');
    return rows;
  } catch (e) {
    console.error('postModel: ', e.message);
  }   
};

const getPost = async (id) => {
  try {
    //TODO: change the database info
    console.log('postModel getPost', id);
    const [rows] = await promisePool.execute('SELECT * FROM wop_cat WHERE cat_id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('postModel: ', e.message);
  }   
};

const insertPost = async(req) =>{
  try{
      //TODO: change the database info
  const [rows] = await promisePool.execute('INSERT INTO wop_cat (name, age, weight, owner, filename, coords) VALUES (?, ?, ?, ?, ?, ?);',
  [req.body.name, req.body.age, req.body.weight, req.body.owner, req.file.filename, req.body.coords]);
  console.log('postModel insertPost:', rows);
  return rows.insertId;
  } catch (e) {
    console.error('postModel insertPost:', e);
  }
};

const updatePost = async (req) =>{
  try{
      //TODO: change the database info
    const [rows] = await promisePool.execute('UPDATE wop_cat SET name = ?, age = ?, weight = ?, owner = ? WHERE cat_id = ?;',
    [req.body.name, req.body.age, req.body.weight, req.body.owner, req.body.id]);
    console.log('postModel updatePost:', rows);
    return rows.affectedRows === 1;
  }
  catch(e){
    return false;
  }
};

const deletePost = async (id) => {
  try {
      //TODO: change the database info
    const [rows] = await promisePool.execute('DELETE FROM wop_cat WHERE cat_id = ?', [id]);
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
