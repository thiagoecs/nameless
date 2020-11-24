"use strict";
const express = require("express");
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const globalRouter = require("./routers/globalRouter");
const postRouter = require("./routers/postRouter");
const userRouter = require("./routers/userRouter");
const routes = require("./routes");
const app = express();

app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
// load directory that has source files
app.use(express.static("./public"));

app.use(routes.home, globalRouter);
app.use(routes.posts, postRouter);
app.use(routes.users, userRouter);
app.listen(4000, () => console.log("ok"));
