"use strict";

// having post view, user view, and search function
const URL_BASE = "https://localhost:8000";
const main = document.querySelector("main");
const loginHeader = document.querySelector(".login_header");
const topHeader = document.querySelector(".top_header");
const redButton = document.querySelector(".redbox");
const profile = document.querySelector(".profile");
const token = document.cookie.split("userToken=")[1]; //JWT token

// showing a detailed page with comments
const getPost = async (id) => {
  try {
    const data = await getPostDataById(id);
    const myProfileData = await getMyProfile();
    const uploadTime = data.createdAt.split("T");
    const date = uploadTime[0];
    const time = uploadTime[1].split(".")[0];
    makeBackButton();
    document.title = `${data.restaurant} | Food Advisor`;
    main.innerHTML = `
      <section class="movie" id="detail">
        <div id='wrapper' class="wrapper">
            <div class="movie_header">
            <h4>${data.restaurant}</h4>
            <h5 class="user-link"><span class="user-type"></span>${data.nickname}</h5>
          </div>
          <div class="sub_header">
            <h6 style="font-size: 0.8rem;">Uploaded at: ${date} ${time}</h6>
          </div>
          <figure>          
          </figure>
          <div class="view-votes">
          <h5 class="views">views: ${data.views}</h5>
          <h5 class="votes">Vote: ${data.votes}</h5>
          </div>
           <p class="post__description">${data.description}</p>
            <div class='post__comments'>
              <form id='comments-form'>
              <input class='input-bar comment-bar' name="comment" type='text' placeholder="Add a comment">
              <button class="redbox" type="submit">Save</button>
              </form>
              <h5 class='comments'>comment(s): <span class='comment-num'>${data.comments.length}</span></h5>
              <ul class='comments-list'></ul>
              </div>
        </div>
      </section>`;
    const ext = data.sourceFile.split(".")[1].toLowerCase();
    console.log(ext);
    const figure = document.querySelector("figure");
    if (ext === "png" || ext === "jpg" || ext === "gif" || ext === "jpeg") {
      figure.innerHTML = `<img src='../${data.sourceFile}'>`;
    } else if (ext === "avi" || ext === "mp4" || ext === "wmv" || ext == "mpg") {
      figure.innerHTML = `<video controls=true width="460" height="350">
       <source src='../${data.sourceFile}'></source>
       </video>`;
    }
    const commentsList = document.querySelector(".comments-list");
    data.comments.forEach((comment) => {
      const line = document.createElement("hr");
      const text = document.createElement("li");
      const textSpan = document.createElement("span");
      textSpan.innerText = comment.text;
      text.appendChild(textSpan);
      text.appendChild(line);
      commentsList.appendChild(text);
    });
    const profileLink = document.querySelector(".user-link");
    profileLink.addEventListener("click", () => {
      getProfile(data.creator);
    });
    const subHeader = document.querySelector(".sub_header");
    const commentBox = document.querySelector("#comments-form");

    if (!token) {
      commentBox.style.display = "none";
    }
    commentBox.addEventListener("submit", async (e) => {
      e.preventDefault();
      postComment(data, commentBox);
    });

    //checking if its a restaurant posting
    const user = await getUserDataById(data.creator);
    if (user.userType === 2) {
      const title = document.querySelector(".user-type");
      title.innerText = `👨‍🍳`;
    }
    //if owner or admin, buttons to edit will apear
    if (data.creator === myProfileData.id || myProfileData.userType === 3) {
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
  data.votes = newVotes;

  if (votes) {
    votes.addEventListener("submit", async (e) => {
      e.preventDefault();
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ data }),
      };
      const response = await fetch(url + "/posts/" + data.id, fetchOptions);
      location.assign("/");
    });
  }

  console.log(newVotes);
};
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

// profile page
const getProfile = async (id) => {
  try {
    const myProfileData = await getMyProfile();
    const userData = await getUserDataById(id);

    //const type = await getUserDataByType(type);
    console.log(myProfileData);
    console.log("getProfile" + myProfileData, userData);
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
            <img class="u-avatar" src="../${userData.avatarUrl}">
        </figure>
        <h4 class="profile__username"><span class="user-type"></span>${userData.nickname}</h4>
    </div>
    <div class="user-profile__btns"></div>
    <div>
    <h4>Post list</h4>
    </div>
</div>`;

    if (userData.userType === 2) {
      const emoji = document.querySelector(".user-type");
      emoji.innerText = `👨‍🍳`;
    }

    // if logged in user is same as an author of the post, it shows edit profile and change password button
    if (myProfileData.id === userData.id) {
      addEditProfileBtn();
      const editBtn = document.querySelector(".edit-profile");
      const editPw = document.querySelector(".change-password");
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
  editBtn.className = "edit-profile";
  editBtn.innerText = "Edit Profile";
  const passwdBtn = document.createElement("button");
  passwdBtn.className = "change-password";
  passwdBtn.innerText = "Change Password";
  const btnContainer = document.querySelector(".user-profile__btns");
  btnContainer.appendChild(editBtn);
  btnContainer.appendChild(passwdBtn);
};

// getting logged in user information
const getMyProfile = async () => {
  try {
    const fetchOptions = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(URL_BASE + "/me", fetchOptions);
    const myProfile = await response.json();
    console.log("me:", myProfile);
    return myProfile;
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

// making back button when clicking user nickname and post title
const makeBackButton = () => {
  loginHeader.style.justifyContent = "space-between";
  const back = document.createElement("a");
  back.id = "back";
  back.innerText = "← Back";
  back.href = `../html/index.html`;
  loginHeader.insertBefore(back, loginHeader.firstChild);
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
    const response = await fetch(URL_BASE + "/posts/" + id);
    const post = await response.json();
    console.log("post:", post);
    return post;
  } catch (e) {
    console.log(e);
  }
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
logOut();
