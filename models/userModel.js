'use strict';
const pool = require('../database/db');
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    // TODO: do the LEFT (or INNER) JOIN to get owner name too.
    const [rows] = await promisePool.query('SELECT * FROM wop_user');
    return rows;
  } catch (e) {
    console.error('userModel: ', e.message);
  }   
};

const getUser = async (id) => {
  try {
    console.log('userModel getUser', id);
    const [rows] = await promisePool.query('SELECT * FROM wop_user WHERE user_id = ?', [id]);
    return rows[0];
  } catch (e) {
    console.error('userModel: ', e.message);
  }   
};

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
        'SELECT * FROM wop_user WHERE email = ?;',
        params);
    return rows;
  } catch (e) {
    console.log('error', e.message);
  }
};

const insertUser = async(req) =>{
  try{
  const [rows] = await promisePool.query('INSERT INTO wop_user (name, email, password) VALUES (?, ?, ?);',
  [req.body.name, req.body.email, req.body.password]);
  console.log('userModel insertUser:', rows);
  return rows.insertId;
  } catch (e) {
    console.error('userModel insertUser:', e);
  }
};

const updateUser = async (id,req) =>{
  try{
    const [rows] = await promisePool.query('UPDATE wop_user SET name = ?, email = ?, password = ? WHERE user_id = ?;',
    [req.body.name, req.body.email, req.body.password, id]);
    console.log('userModel updateUser:', rows);
    return rows.affectedRows === 1;
  }
  catch(e){
    return false;
  }
};

const deleteUser = async (id,req) => {
  try {
    const [rows] = await promisePool.query('DELETE * FROM wop_user WHERE user_id = ?', [id]); 
  }
  catch(e){
    console.error('userModel deleteUser:', e);
  }
};

module.exports = {
  getAllUsers,
  getUser,
  insertUser,
  updateUser,
  deleteUser,
  getUserLogin
};