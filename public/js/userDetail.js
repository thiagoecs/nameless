"use strict";
const main = document.querySelector("main");
const loginHeader = document.querySelector(".top_header");
const redButton = document.querySelector(".redbox");
const profile = document.querySelector(".profile");
const nickname = document.querySelector(".profile__username");

const getCookie = (name) => {
  if (document.cookie) {
    const value = document.cookie.split(name + "=")[1];
    return value;
  }
};
const getProfile = async () => {
  const token = getCookie("userToken");
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(URL_BASE + "/users", options);
    const cats = await response.json();
    console.log(cats);
  } catch (e) {
    console.log(e.message);
  }
};
getProfile();
