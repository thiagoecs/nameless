"use strict";

const form = document.querySelector("#upload");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const token = document.cookie.split("userToken=")[1];
    const formData = new FormData(form);
    const myProfile = await getMyProfile()
    const myId = myProfile.id
    formData.append('creator',JSON.stringify(myId))
    // receiving json data from backend when submit login request
    const res = await fetch(URL_BASE+"/posts/upload", {
      method: "POST",
      headers: { 'Authorization': "Bearer " + token },
      body: formData
    });
    const data = await res.json();
    
    if (data) {
      console.log(data)
      location.assign(URL_BASE + "/");
    }
  } catch (err) {
    console.log(err);
  }
});
