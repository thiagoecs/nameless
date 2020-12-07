"use strict";
// having post view, user view, and search function
const url = "https://localhost:8000";
const main = document.querySelector("main");
const loginHeader = document.querySelector('.login_header')
const topHeader = document.querySelector(".top_header");
const redButton = document.querySelector(".redbox");
const profile = document.querySelector(".profile");

const addPosts = (posts) => {
  posts.forEach((post) => {
    const section = document.createElement("section");
    section.className = "movie";
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    const postHeader = document.createElement("div");
    postHeader.className = "movie_header";
    const title = document.createElement("h4");

    title.className = "post-link";
    title.innerText = post.restaurant;

    const creator = document.createElement("h5");

    creator.className = "user-link";
    creator.innerText = post.nickname;

    postHeader.appendChild(title);
    postHeader.appendChild(creator);
    wrapper.appendChild(postHeader);

    const img = document.createElement("img");
    img.src = `../${post.sourceFile}`;
    const figure = document.createElement("figure").appendChild(img);

    const views = document.createElement("h5");
    views.classList.add("views");
    views.innerText = `views: ${post.views}`;
    const comments = document.createElement("h5");
    comments.classList.add("comments");
    comments.innerText = `comments: ${post.comments}`;
    const votes = document.createElement("h5");
    votes.classList.add("votes");
    votes.innerText = `votes: ${post.votes}`;

    wrapper.appendChild(figure);
    wrapper.appendChild(views);
    wrapper.appendChild(comments);
    wrapper.appendChild(votes);
    section.appendChild(wrapper);
    main.appendChild(section);

    title.addEventListener("click", ()=>{getPost(post.id)});

  });
};
const getPost = async (id) => {
  try {
    const response = await fetch(url + "/posts/" + id);
    const data = await response.json();
    const back = document.createElement('span')
    back.innerText = '← Back'
    loginHeader.insertBefore(back, loginHeader.firstChild)
    main.innerHTML = `
        <section class="movie">
          <div class="wrapper">
            <div class="movie_header">
            <h4>${data.restaurant}</h4>
            <h5><a class='user-link' href='#'>${data.nickname}</a></h5>
          </div>
          <figure>
          <img src="../${data.sourceFile}">
          </figure>
          <div class="view-votes">
          <h5 class="views">views: ${data.views}</h5>
          <h5 class="votes">Vote: ${data.votes}</h5>
          </div>
           <p class="post__description">${data.description}</p>
          <h5 class='comments'>comments: ${data.comments}</h5>
          </div>
        </section>`;
  } catch (e) {
    console.log(e);
  }
};

const getPosts = async () => {
  try {
    const response = await fetch(url + "/posts");
    const posts = await response.json();
    addPosts(posts);
  } catch (e) {
    console.log(e);
  }
};

// checking if users are logged in or not and changing header
const isLoggedIn = () => {
  console.log(document.cookie);
  //const token = sessionStorage.getItem("userToken");
  const token = document.cookie;
  if (token) {
    redButton.href = `${url}/posts/upload`;
    redButton.innerText = "Upload";
    profile.href = `${url}/me`;
    profile.innerText = "Profile";
    topHeader.innerHTML += `<li>
                                <a class="logout" href="${url}/logout">Log Out</a>
                              </li>`;
  }
};

// deleting cookie
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
        alert("See you :p 🍽");
        location.assign("/");
      } catch (e) {
        console.log(e.message);
      }
    });
  }
};

const searchForm = document.querySelector("form");
const searchBar = searchForm.querySelector("#search-bar");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchBar.value;
  console.log(query);
  const response = await fetch(url + "/search?term=" + query);
  const posts = await response.json();
  console.log(posts);
});

isLoggedIn();
getPosts();
logOut();
