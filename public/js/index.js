"use strict";

// having post view, user view, and search function
const url = "https://localhost:8000";
const main = document.querySelector("main");
const loginHeader = document.querySelector(".login_header");
const topHeader = document.querySelector(".top_header");
const redButton = document.querySelector(".redbox");
const profile = document.querySelector(".profile");
const searchForm = document.querySelector("form");
const searchBar = searchForm.querySelector("#search-bar");
const searchTitle = document.querySelector(".search_filter__header").querySelector("h3");

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

    title.addEventListener("click", () => {
      getPost(post.id);
    });
    img.addEventListener("click", () => {
      getPost(post.id);
    });
    creator.addEventListener("click", () => {
      getProfile(post.creator);
    });
  });
};

const getPost = async (id) => {
  try {
    const response = await fetch(url + "/posts/" + id);
    const data = await response.json();
    const myProfile = await fetch(url + "/me");
    const myProfileData = await myProfile.json();
    const uploadTime = data.createdAt.split("T");
    const date = uploadTime[0];
    const time = uploadTime[1].split(".")[0];
    makeBackButton();
    main.innerHTML = `
        <section class="movie">
          <div id='wrapper' class="wrapper">
            <div class="movie_header">
            <h4>${data.restaurant}</h4>
            <h5><a class='user-link' href='#/users/${data.creator}'>${data.nickname}</a></h5>
          </div>
          <div class="sub_header">
            <h6 style="font-size: 0.8rem;">Uploaded at: ${date} ${time}</h6>
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

    const subHeader = document.querySelector(".sub_header");

    if (data.creator === myProfileData.id) {
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit Post";
      subHeader.appendChild(editBtn);
      editBtn.addEventListener("click", () => {
        getEditPost(data.id);
      });

      //test vote

      const voteBtn = document.createElement("button");
      voteBtn.innerText = "Vote Up";
      subHeader.appendChild(voteBtn);
      voteBtn.addEventListener("click", function handler(e) {
        addUpvote(data);
        e.currentTarget.removeEventListener(e.type, handler); // remove listner
        voteBtn.style.opacity = "0.5";
      });
    }
    const profileLink = document.querySelector(".user-link");
    profileLink.addEventListener("click", () => {
      getProfile(data.creator);
    });
  } catch (e) {
    console.log(e);
  }
};

// *todo: fetch url to update
const addUpvote = (data) => {
  const votes = document.querySelector(".votes");
  const votesValue = data.votes;
  const newVotes = votesValue + 1;
  votes.innerText = `Votes: ${newVotes}`;
  //const uploadForm = document.querySelector("#upload");
  try {
    votes.addEventListener("submit", async (e) => {
      e.preventDefault();
      //const value = votes.data.votes;
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({newVotes})
      };
      const response = await fetch(url + "/posts/" + data.id, fetchOptions);
      location.assign("/");
      console.log("talk to me");
    });
  }
catch(e) {
  console.log(e);
}
  console.log(newVotes);
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

const getProfile = async (id) => {
  try {
    const myProfileData = await getMyProfile();
    const userData = await getUserDataById(id);
    console.log(myProfileData, userData);
    const backButton = document.querySelector("#back");
    if (!backButton) {
      makeBackButton();
    }
    main.innerHTML = `
        <div class="user-profile">
    <div class="user-profile__header">
        <figure class="profile">
            <img class="u-avatar" src="../${userData.avatarUrl}">
            <h4 class="profile__username">${userData.nickname}</h4>
        </figure>
    </div>
    <div class="user-profile__btns"></div>
    <div>
    <h4>Post list</h4>
    </div>
</div>`;
    if (myProfileData.id === userData.id) {
      addEditProfileBtn();
    }
  } catch (e) {
    console.log(e);
  }
};

const addEditProfileBtn = () => {
  const editBtn = document.createElement("button");
  editBtn.innerText = "Edit Profile";
  const passwdBtn = document.createElement("button");
  passwdBtn.innerText = "Change Password";
  const btnContainer = document.querySelector(".user-profile__btns");
  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(passwdBtn);
};

const getMyProfile = async () => {
  try {
    const response = await fetch(url + "/me");
    const myProfile = await response.json();
    console.log("me:", myProfile);
    return myProfile;
  } catch (e) {
    console.log(e);
  }
};

const getUserDataById = async (id) => {
  try {
    const response = await fetch(url + "/users/" + id);
    const user = await response.json();
    console.log("user:", user);
    return user;
  } catch (e) {
    console.log(e);
  }
};

// making back button when clicking user nickname and post title
const makeBackButton = () => {
  loginHeader.style.justifyContent = "space-between";
  const back = document.createElement("a");
  back.id = "back";
  back.innerText = "← Back";
  back.href = `../html/index.html`;
  loginHeader.insertBefore(back, loginHeader.firstChild);
};

// checking if users are logged in or not and changing header
const isLoggedIn = () => {
  //console.log(document.cookie);
  //const token = sessionStorage.getItem("userToken");
  const token = document.cookie;
  if (token) {
    redButton.href = "../html/upload.html";
    redButton.innerText = "Upload";
    profile.innerText = "Profile";
    profile.href = "#";
    profile.addEventListener("click", () => {
      console.log("clicked");
      makeBackButton();
      main.innerHTML = `
        <div class="user-profile">
    <div class="user-profile__header">
        <figure class="profile">
            <img class="u-avatar" src="../${userData.avatarUrl}">
            <h4 class="profile__username">${userData.nickname}</h4>
        </figure>
    </div>
    <div class="user-profile__btns"></div>
    <div>
    <h4>Post list</h4>
    </div>
</div>`;
    });
    topHeader.innerHTML += `<li>
                                <a class="logout" href="/">Log Out</a>
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
        console.log(e);
      }
    });
  }
};

const getPostDataById = async (id) => {
  try {
    const response = await fetch(url + "/posts/" + id);
    const post = await response.json();
    console.log("post:", post);
    return post;
  } catch (e) {
    console.log(e);
  }
};

// search
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchBar.value;
  if (query !== "") {
    console.log(query);
    searchTitle.style.display = "block";
    const response = await fetch(url + "/search?term=" + query);
    const data = await response.json();
    console.log("data:", data);
    if (data.posts.length == 0) {
      searchTitle.style.marginTop = "10vh";
    } else {
      searchTitle.style.marginTop = "2vh";
    }
    const posts = document.querySelectorAll(".movie");
    searchTitle.innerHTML = `Searching for: '${query}'    ||    ${data.posts.length} post(s)`;
    posts.forEach((post) => {
      post.parentNode.removeChild(post);
    });
    addPosts(data.posts);
  } else {
    location.assign("/");
  }
});

//votes
const addVote = async (id, votes) => {
  try {
    const response = await fetch(url + "/posts/" + id);
    const data = await response.json();
    data.votes = data.votes + 1;
    var results = data.votes;
    console.log("added 1");
    return results;
  } catch (e) {
    console.log(e);
  }
};

const removeVote = async (id, votes) => {
  try {
    const response = await fetch(url + "/posts/" + id);
    const data = await response.json();
    data.votes = data.votes - 1;
    return data.votes;
  } catch (e) {
    console.log(e);
  }
};

isLoggedIn();
getPosts();
logOut();