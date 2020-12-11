"use strict";
// checking if users are logged in or not and changing header
const isLoggedIn = () => {
  const btn = document.querySelector(".login");
  //const redButton = document.querySelector('.redbox')
  if (token) {
    redButton.href = `${URL_BASE}/posts/upload`;
    redButton.innerText = "Upload";
    btn.innerText = "Profile";
    btn.removeAttribute("href");
    btn.classList.add("profile");
    topHeader.innerHTML += `<li>
                                <a class="logout" href="#">Log Out</a>
                              </li>`;

    const profile = document.querySelector(".profile");
    profile.style.cursor = "pointer";
    profile.addEventListener("click", async (e) => {
      e.preventDefault();
      const myProfile = await getMyProfile();
      console.log("clicked");
      const backButton = document.querySelector("#back");
      if (!backButton) {
        makeBackButton();
      }
      document.title = `${myProfile.nickname} | Food Advisor`;
      main.innerHTML = `
        <div class="user-profile">
    <div class="user-profile__header">
        <figure class="profile">
            <img class="u-avatar" src="/app/${myProfile.avatarUrl}">
            <h4 class="profile__username user-link"><span class="user-type"></span>${myProfile.nickname}</h4>
        </figure>
    </div>
    <div class="user-profile__btns"></div>
    <div>
    <h4 class="postList">Post list</h4>
    <ul class="post-list"></ul>
    </div>
</div>`;
      const postList = document.querySelector(".post-list");
      myProfile.posts.forEach((post) => {
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
      if (myProfile.userType === 2) {
        const emoji = document.querySelector(".user-type");
        emoji.innerText = `👨‍🍳`;
      }
      addEditProfileBtn();
      const editBtn = document.querySelector(".editProf");
      const editPw = document.querySelector(".changePass");
      editPw.addEventListener("click", () => {
        getChangePassword(myProfile.id);
      });
      editBtn.addEventListener("click", () => {
        getEditProfile(myProfile);
      });
    });
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
  // if (logOut) {
  //   console.log(logOut);
  logOut.addEventListener("click", async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${URL_BASE}/logout`, {
        method: "GET",
      });

      const data = await res.json();
      console.log(data);
      // remove token
      const expireDate = new Date();
      expireDate.setDate(expireDate.getDate() - 1);
      document.cookie = document.cookie + `;expires=${expireDate.toGMTString()}`;
      console.log(document.cookie);
      //deleteCookie("userToken");
      //alert("See you :p 🍽");
      // location.assign(URL_BASE + "/");
    } catch (e) {
      console.log(e);
    }
  });
  //}
};
isLoggedIn();
logOut();
