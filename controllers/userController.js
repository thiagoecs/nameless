'use strict'
const path = require("path");
const routes = require("../routes");
const bcrypt = require("bcryptjs");
const passport = require("../utils/passport");
const userModel = require("../models/userModel");

// send join request
const postJoin = async (req, res, next) => {
  const {
    body: { nickname, email, password2 },
  } = req;
  let password = req.body.password // same as const nickname = req.body.nickname ...
  if (password !== password2) {
    //console.log("Passwords are not same");
    res.render("join", { pageTitle: "Join" });
  } else {
    try {
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      password = hash;
      if (await userModel.insertUser(nickname,email,password)) {
        next();
      }
    } catch (e) {
      res.status(400).json({ error: "register error" });
      console.log(e)
    }
  }
};

// access join page
const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
  //res.sendFile(path.resolve(__dirname, "../public/html", "join.html"));
};

// send login request
const postLogin = passport.authenticate("local", {
  failureRedirect: routes.login,
  successRedirect: routes.home,
});

// access to login page
const getLogin = (req, res) => {
  res.render("login", { pageTitle: "Log In" });
};

const logout = (req, res) => {
  // TODO: Make users logged out
  res.redirect(routes.home);
};

const userHome = (req, res) => res.send("user home");
const userDetail = (req, res) => res.send("user detail");
const editProfile = (req, res) => res.send("edit profile");
const changePassword = (req, res) => res.send("change password");

//functions using the model
const user_update = async (req, res) => {
  const updateOk = await userModel.updateUser(req.params.id, req);
  res.send(`updated... ${updateOk}`);
}

const user_delete = async (req, res) => {
  const deleteOk = await userModel.deleteUser(req.params.id, req);
  res.send(`deleted... ${deleteOk}`);
}

const user_list_get = async (req, res) => {
  const users = await userModel.getAllUsers();
  res.json(users);
};

const user_get_by_id = async (req, res) => {
    const user = await userModel.getUser(req.params.id);
    res.json(user);
};

const user_create = async (req,res) => {
  console.log('userController user_create', req.body);
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
    }
  const id = await userModel.insertUser(req);
  const user = await userModel.getUser(id);
  res.send(user);
};

module.exports = {
  postJoin,
  getJoin,
  postLogin,
  getLogin,
  logout,
  userHome,
  userDetail,
  editProfile,
  changePassword,
  user_update,
  user_delete,
  user_list_get,
  user_get_by_id,
  user_create
};
//save functions
