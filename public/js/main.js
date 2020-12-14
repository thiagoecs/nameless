"use strict";
// having post view, user view, and search function
const main = document.querySelector("main");
const loginHeader = document.querySelector(".login_header");
const topHeader = document.querySelector(".top_header");
const redButton = document.querySelector(".redbox");
const profile = document.querySelector(".profile");
const token = document.cookie.split("userToken=")[1]; //JWT token

// making profile page
const makingProfile = (main, userData, myProfileData) => {
  // making profile page
  document.title = `${userData.nickname} | Food Advisor`;
  main.innerHTML = `
        <div class="user-profile">
    <div class="user-profile__header">
        <figure class="profile">
            <img class="u-avatar" src="/app/${userData.avatarUrl}">
        </figure>
        <h4 class="profile__username"><span class="user-type"></span>${userData.nickname}</h4>
    </div>
    <div class="user-profile__btns"></div>
    <div>
    <h4 class="postList">Post list</h4>
    <ul class='post-list'></ul>
    </div>
</div>`;

  // if the user type is 2 (business), puts emoji 
  if (userData.userType === 2) {
    const emoji = document.querySelector(".user-type");
    emoji.innerText = `👨‍🍳`;
  }

  const postList = document.querySelector(".post-list");
  userData.posts.forEach((post) => {
    const line = document.createElement("hr");
    const title = document.createElement("li");
    const titleSpan = document.createElement("span");
    titleSpan.innerText = post.restaurant;
    title.appendChild(titleSpan);
    title.appendChild(line);
    postList.appendChild(title);
    titleSpan.addEventListener("click", () => {
      getPost(post.id);
    });
  });

  // if logged in user is same as an author of the post, it shows edit profile and change password button
  if (myProfileData.id === userData.id) {
    addEditProfileBtn();
    const editBtn = document.querySelector(".editProf");
    const editPw = document.querySelector(".changePass");
    editPw.addEventListener("click", () => {
      getChangePassword(myProfileData.id);
    });
    editBtn.addEventListener("click", () => {
      getEditProfile(myProfileData);
    });
  }
};

// users' profile page
const getProfile = async (id) => {
  try {
    // getting clicked user's data and current user's data
    const myProfileData = await getMyProfile();
    const userData = await getUserDataById(id);

    // making back button
    const backButton = document.querySelector("#back");
    if (!backButton) {
      makeBackButton();
    }

    // making profile page
    makingProfile(main, userData, myProfileData);
  } catch (e) {
    console.log(e);
  }
};

// making edit profile and change password button
const addEditProfileBtn = () => {
  const editBtn = document.createElement("button");
  editBtn.className = "editProf";
  editBtn.innerText = "Edit Profile";
  const passwdBtn = document.createElement("button");
  passwdBtn.className = "changePass";
  passwdBtn.innerText = "Change Password";
  const btnContainer = document.querySelector(".user-profile__btns");
  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(passwdBtn);
};


// getting posts data and calling addPosts function
const getPosts = async () => {
  try {
    const response = await fetch(URL_BASE + "/posts");
    const posts = await response.json();
    console.log(posts);
    addPosts(posts);
  } catch (e) {
    console.log(e);
  }
};
getPosts();
