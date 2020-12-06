"use strict";
const url = "https://localhost:8000";
const main = document.querySelector("main");
const loginHeader = document.querySelector(".top_header");
const redButton = document.querySelector(".redbox");
const profile = document.querySelector(".profile");

const getPost = async () => {
  try {
    const response = await fetch(url + "/posts");
    const posts = await response.json();
    for (const post of posts) {
      main.innerHTML += `
        <section class="movie">
          <div class="wrapper">
            <div class="movie_header">
            <h4><a class='post-link' href='${url}/posts/${post.id}'>${post.restaurant}</a></h4>
            <h5><a class='user-link' href='${url}/users/${post.creator}'>${post.nickname}</a></h5>
          </div>
          <figure>
          <a href=${url}/posts/${post.id}>
          <img src="${post.sourceFile}"></a>
          </figure>
          <h5 class="views">views: ${post.views}</h5>
          <h5 class='comments'>comments: ${post.comments}</h5>
          <h5 class="votes">Vote: ${post.votes}</h5>
        </div>
        </section>`;
    }
  } catch (e) {
    console.log(e);
  }
};

// checking if users are logged in or not and changing header
const isLoggedIn = () => {
  console.log(document.cookie);
  const token = sessionStorage.getItem("userToken");
  if (token) {
    redButton.href = `${url}/posts/upload`;
    redButton.innerText = "Upload";
    profile.href = `${url}/me`;
    profile.innerText = "Profile";
    loginHeader.innerHTML += `<li>
                                <a class="logout" href="${url}/logout">Log Out</a>
                              </li>`;
  }
};

const deleteCookie = (name) => {
  const expireDate = new Date();
  // making expire date to yesterday
  expireDate.setDate(expireDate.getDate() - 1);
  document.cookie = name + `=;expires=${expireDate.toGMTString()}`;
};
// log out
const logOut = () => {
  const logOut = document.querySelector(".logout");
  if (logOut) {
    logOut.addEventListener("click", async (e) => {
      e.preventDefault();
      try {
        // remove token
        deleteCookie("userToken");
        sessionStorage.removeItem("userToken");
        alert("See you :p 🍽");
        location.assign("/");
      } catch (e) {
        console.log(e.message);
      }
    });
  }
};



isLoggedIn();
getPost();
logOut();
