'use strict'
const express = require("express");
const globalRouter = express.Router();
const routes = require("../routes");
const { home, search } = require("../controllers/postController");
const { getJoin, postJoin, getLogin, postLogin, logout } = require("../controllers/userController");

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, getJoin);
globalRouter.post(routes.join, postJoin, postLogin);

globalRouter.get(routes.login, getLogin);
globalRouter.post(routes.login, postLogin);

globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

module.exports = globalRouter;
