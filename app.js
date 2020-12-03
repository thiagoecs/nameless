"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const path = require("path");
const passport = require('./utils/passport')
const localsMiddleware = require("./middlewares");
const globalRouter = require("./routers/globalRouter");
const postRouter = require("./routers/postRouter");
const session = require('express-session')
const userRouter = require("./routers/userRouter");
const routes = require("./routes");
const app = express();


//app.use(cookieParser());
app.use(cookieParser('secret'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(localsMiddleware);

//set view engine as ejs
app
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .use(require("express-ejs-layouts"))
  .set("layout", "layouts/layout");

app.use(
  session({
    secret: process.env.COOKIE_SECRET,
    resave: true,
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

// load directory that has source files (css files...)
app.use(express.static("./public"));

app.use(routes.home, globalRouter);
app.use(routes.posts, postRouter);
app.use(routes.users, userRouter);
app.listen(4000, () => console.log("ok"));
