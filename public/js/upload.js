"use strict";

const form = document.querySelector("#upload");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const token = document.cookie.split("userToken=")[1];
    const formData = new FormData(form);
    // getting a current user's id to define an author of the post
    const myProfile = await getMyProfile()
    const myId = myProfile.id
    // appending user's id into form data and sending altogether
    formData.append('creator',JSON.stringify(myId))
    // receiving json data from backend when submit login request
    const res = await fetch(URL_BASE+"/posts/upload", {
      method: "POST",
      headers: { 'Authorization': "Bearer " + token },
      body: formData
    });
    const data = await res.json();
    // if succeessfully uploaded, redirected to main page
    if (data) {
      location.assign(URL_BASE + "/");
    }
  } catch (err) {
    console.log(err);
  }
});
