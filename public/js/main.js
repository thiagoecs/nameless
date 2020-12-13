"use strict";
// having post view, user view, and search function
const main = document.querySelector("main");
const loginHeader = document.querySelector(".login_header");
const topHeader = document.querySelector(".top_header");
const redButton = document.querySelector(".redbox");
const profile = document.querySelector(".profile");
const token = document.cookie.split("userToken=")[1]; //JWT token



// *todo: fetch url to update
// const addUpvote = (data) => {
//   const votes = document.querySelector(".votes");
//   const votesValue = data.votes;
//   const newVotes = votesValue + 1;
//   votes.innerText = `Votes: ${newVotes}`;
//   data.votes = newVotes;

//   if (votes) {
//     votes.addEventListener("submit", async (e) => {
//       e.preventDefault();
//       const fetchOptions = {
//         method: "PUT",
//         headers: {
//           "Content-Type": "application/json",
//           // Authorization: "Bearer " + sessionStorage.getItem("token"),
//         },
//         body: JSON.stringify({ data }),
//       };
//       const response = await fetch(url + "/posts/" + data.id, fetchOptions);
//       location.assign("/");
//     });
//   }

//   console.log(newVotes);
// };
/*
const votes = document.querySelector(".votes");
//testing
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

*/

// profile page
const getProfile = async (id) => {
  try {
    const myProfileData = await getMyProfile();
    const userData = await getUserDataById(id);

    // making back button
    const backButton = document.querySelector("#back");
    if (!backButton) {
      makeBackButton();
    }
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

// making back button when clicking user nickname and post title
const makeBackButton = () => {
  loginHeader.style.justifyContent = "space-between";
  const back = document.createElement("a");
  back.id = "back";
  back.innerText = "← Back";
  back.href = URL_BASE + "/";
  loginHeader.insertBefore(back, loginHeader.firstChild);
};

//votes
const addVote = async (id, votes) => {
  try {
    const response = await fetch(URL_BASE + "/posts/" + id);
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
    const response = await fetch(URL_BASE + "/posts/" + id);
    const data = await response.json();
    data.votes = data.votes - 1;
    return data.votes;
  } catch (e) {
    console.log(e);
  }
};

//isLoggedIn();
getPosts();
