const url = "https://localhost:8000";
const main = document.querySelector("main");
const loginHeader = document.querySelector(".top_header");
const redButton = document.querySelector(".redbox");
const profile = document.querySelector(".profile");
const nickname = document.querySelector(".profile__username");
const avatar = document.querySelector(".u-avatar");


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
    const response = await fetch(url + "/users", options);
    const profile = await response.json();
    nickname.innerText = profile.nickname
    avatar.src = profile.avatarUrl
  } catch (e) {
    console.log(e.message);
  }
};

getProfile();
