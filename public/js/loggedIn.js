'use strict'
// checking if users are logged in or not and changing header
const isLoggedIn = () => {
  const btn = document.querySelector(".login");
  if (token) {
    redButton.href = "../html/upload.html";
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
            <img class="u-avatar" src="../${myProfile.avatarUrl}">
            <h4 class="profile__username user-link"><span class="user-type"></span>${myProfile.nickname}</h4>
        </figure>
    </div>
    <div class="user-profile__btns"></div>
    <div>
    <h4>Post list</h4>
    </div>
</div>`;

    if (myProfile.userType === 2) {
      const emoji = document.querySelector(".user-type");
      emoji.innerText = `👨‍🍳`;
    }
      addEditProfileBtn();
      const editBtn = document.querySelector(".edit-profile");
      const editPw = document.querySelector(".change-password");
      editPw.addEventListener("click", () => {
        getChangePassword(myProfile.id);
      });
      editBtn.addEventListener("click", () => {
        getEditProfile(myProfile);
      });
    });
  }
};
isLoggedIn()