"use strict";
// This file is for managing indexes of each routers.

const HOME = "/";

// global
const JOIN = "/join";
const LOGIN = "/login";
const LOGOUT = "/logout";
const SEARCH = "/search";
const ME = "/me";

// users
const USERS = "/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";

// posts
const POSTS = "/posts";
const UPLOAD = "/upload";
const POST_DETAIL = "/:id";

// collects all the paths from our app.
const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  me: ME,
  users: USERS,
  // if there is id parameter, redirects to that id
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  posts: POSTS,
  upload: UPLOAD,
  // if there is id parameter, redirects to that id
  postDetail: (id) => {
    if (id) return `/posts/${id}`;
    else return POST_DETAIL;
  },
};

module.exports = routes;
