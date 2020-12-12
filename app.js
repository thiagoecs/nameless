"use strict";
const express = require("express");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const path = require("path");
const passport = require("./utils/passport");
const { localsMiddleware, verifyToken, loggedUser } = require("./middlewares");
const globalRouter = require("./routers/globalRouter");
const postRouter = require("./routers/postRouter");
const userRouter = require("./routers/userRouter");
const routes = require("./routes");
const app = express();

//app.use(cookieParser());
app.use(cors());
app.use(cookieParser("secret"));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(localsMiddleware);

// load directory that has source files (css files...)
app.use(express.static("./public"));
app.use("/uploads", express.static("uploads"));

process.env.NODE_ENV = process.env.NODE_ENV || "development";
if (process.env.NODE_ENV === "production") {
  require("./production")(app, process.env.PORT);
} else {
  require("./localhost")(app, process.env.HTTPS_PORT, process.env.HTTP_PORT);
}

app.use(passport.initialize());

app.get("*", loggedUser);
app.use(routes.home, globalRouter);
app.use(routes.posts, postRouter);
app.use(routes.users, userRouter);
