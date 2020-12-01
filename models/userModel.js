"use strict";
const pool = require("../database/db");
const promisePool = pool.promise();

const getAllUsers = async () => {
  try {
    const [rows] = await promisePool.execute("SELECT * FROM Users");
    return rows;
  } catch (e) {
    console.error("UserModel getAllUsers error: ", e.message);
  }
};

const getUser = async (id) => {
  try {
    const [rows] = await promisePool.execute("SELECT * FROM Users where id = ?", [
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
      "INSERT INTO Users (nickname, email, password) VALUES(?, ?, ?)",
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
      "SELECT * FROM Users WHERE email = ?;",
      [params]
    );
    return rows[0];
  } catch (e) {
    console.log("error", e.message);
  }
};

const deleteUser = async (id) => {
  try {
    const [rows] = await promisePool.execute(
      "DELETE FROM wop_user WHERE user_id=?",
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
  deleteUser,
};
