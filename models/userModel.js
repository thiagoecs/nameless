"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute("SELECT * FROM users");
    return rows;
  } catch (e) {
    console.error("UserModel getAllUsers error: ", e.message);
  }
};

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.execute("SELECT * FROM users where id = ?", [
      id,
    ]);
    return rows[0];
  } catch (e) {
    console.log("UserModel getUser error: ", e.message);
  }
};

const insertUser = async (nickname, email, password) => {
  try {
    const [
      rows,
    ] = await promisePool.execute(
      "INSERT INTO users (nickname, email, password) VALUES(?, ?, ?)",
      [nickname, email, password]
    );
    return rows.insertId;
  } catch (e) {
    console.error("userModel insertUser:", e);
  }
};

const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute(
      "SELECT * FROM users WHERE email = ?;",
      [params]
    );
    return rows[0];
  } catch (e) {
    console.log("error", e.message);
  }
};

const updateUser = async (id,req) =>{
  try{
    const [rows] = await promisePool.query('UPDATE user SET nickname = ?, email = ?, password = ? WHERE user_id = ?;',
    [req.body.nickname, req.body.email, req.body.password, id]);
    console.log('userModel updateUser:', rows);
    return rows.affectedRows === 1;
  }
  catch(e){
    return false;
  }
};

const deleteUser = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      "DELETE FROM users WHERE user_id=?",
      [id]
    );
    return rows.affectedRows === 1;
  } catch (e) {
    console.error("userModel deleteUser:", e);
    return false;
  }
};
module.exports = {
  getAllUsers,
  getUser,
  insertUser,
  getUserLogin,
  updateUser,
  deleteUser,
};
