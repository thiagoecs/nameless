"use strict";
// This file is for managing indexes of each routers.
// prob we can only use them in backend side..?

const HOME = "/app/";

// global
const JOIN = "/app/join";
const LOGIN = "/app/login";
const LOGOUT = "/app/logout";
const SEARCH = "/app/search";
const ME = "/app/me";

// users
const USERS = "/app/users";
const USER_DETAIL = "/:id";
const EDIT_PROFILE = "/edit-profile";
const CHANGE_PASSWORD = "/change-passwd";

// posts
const POSTS = "/app/posts";
const UPLOAD = "/upload";
const POST_DETAIL = "/:id";
const EDIT_POST = "/:id/edit";
const DELETE_POST = "/:id/delete";

// collects all the paths from our app.
const routes = {
  home: HOME,
  join: JOIN,
  login: LOGIN,
  logout: LOGOUT,
  search: SEARCH,
  me:ME,
  users: USERS,
  // if there is id parameter, redirects to that id
  userDetail: (id) => {
    if (id) {
      return `/users/${id}`;
    } else return USER_DETAIL;
  },
  editProfile: EDIT_PROFILE,
  changePassword: CHANGE_PASSWORD,
  posts: POSTS,
  upload: UPLOAD,
  // if there is id parameter, redirects to that id
  postDetail: (id) => {
    if (id) return `/posts/${id}`;
    else return POST_DETAIL;
  },
  editPost: (id) => {
    if (id) {
      return `/posts/${id}/edit`;
    } else return EDIT_POST;
  },
  deletePost: (id) => {
    if (id) {
      return `/posts/${id}/delete`;
    } else return DELETE_POST;
  },
};

module.exports = routes;
