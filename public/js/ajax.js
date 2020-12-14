"use strict";

// getting logged in user information
const getMyProfile = async () => {
  const token = document.cookie.split("userToken=")[1]; //JWT token
  try {
    const fetchOptions = { headers: { Authorization: "Bearer " + token } };
    const response = await fetch(URL_BASE + "/me", fetchOptions);
    const myProfile = await response.json();
    console.log("me:", myProfile);
    return myProfile;
  } catch (e) {
    console.log(e);
  }
};

// getting post data by id
const getPostDataById = async (id) => {
  try {
    const response = await fetch(URL_BASE + "/posts/" + id);
    const post = await response.json();
    console.log("post:", post);
    return post;
  } catch (e) {
    console.log(e);
  }
};

// getting user data by user type
const getUserDataByType = async (userType) => {
  try {
    const response = await fetch(URL_BASE + "/users/" + userType);
    const user = await response.json();
    console.log("user:", user);
    return user;
  } catch (e) {
    console.log(e);
  }
};

// getting specified user info by id number
const getUserDataById = async (id) => {
  try {
    const response = await fetch(URL_BASE + "/users/" + id);
    const user = await response.json();
    console.log("user:", user);
    return user;
  } catch (e) {
    console.log(e);
  }
};

