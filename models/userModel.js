"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();
// managing data about users

// getting all users' information from database
const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute("SELECT * FROM users");
    return rows;
  } catch (e) {
    console.error("UserModel getAllUsers error: ", e.message);
  }
};

// changing password
const changePassword = async (id, password) => {
  try {
    const [rows] = await promisePool.query("UPDATE users SET password=? WHERE id = ?;", [password, id]);
    console.log("userModel changepw:", rows);
    return rows.affectedRows === 1;
  } catch (e) {
    console.log(e);
    return false;
  }
};

// getting a single user by id
const getUser = async (id) => {
  try {
    const [rows] = await promisePool.execute("SELECT * FROM users where id = ?", [id]);
    return rows[0];
  } catch (e) {
    console.log("UserModel getUser error: ", e.message);
  }
};

// inserting a new user into the user table
const insertUser = async (nickname, email, password, userType) => {
  try {
    const [rows] = await promisePool.execute("INSERT INTO users (nickname, email, password, userType) VALUES(?, ?, ?,?)", [nickname, email, password, userType]);
    return rows.insertId;
  } catch (e) {
    console.error("userModel insertUser:", e);
  }
};

// getting a user's information by email address
const getUserLogin = async (params) => {
  try {
    console.log(params);
    const [rows] = await promisePool.execute("SELECT * FROM users WHERE email = ?;", [params]);
    return rows[0];
  } catch (e) {
    console.log("error", e.message);
  }
};

// updating user info
const updateUser = async (id, nickname, email, avatarUrl) => {
  try {
    const [rows] = await promisePool.query("UPDATE users SET nickname = ?, email = ?, avatarUrl =? WHERE id = ?;", [nickname, email, avatarUrl, id]);
    console.log("userModel updateUser:", rows);
    return rows.affectedRows === 1;
  } catch (e) {
    return false;
  }
};

// deleting a user account
const deleteUser = async (id) => {
  try {
    const [rows] = await promisePool.execute("DELETE FROM users WHERE id=?", [id]);
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
  changePassword,
};
