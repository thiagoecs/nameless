const express = require("express");
const globalRouter = express.Router();
const routes = require("../routes");
const { home, search } = require("../controllers/postController");
const { join, login, logout } = require("../controllers/userController");

globalRouter.get(routes.home, home);
globalRouter.get(routes.join, join);
globalRouter.get(routes.login, login);
globalRouter.get(routes.logout, logout);
globalRouter.get(routes.search, search);

module.exports = globalRouter;
