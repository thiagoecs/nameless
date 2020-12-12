"use strict";

const form = document.querySelector("#upload");
const myId = await getMyProfile().id;

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  try {
    const token = document.cookie.split("userToken=")[1];
    const formData = new FormData(form);

    // receiving json data from backend when submit login request
    const res = await fetch("/app/posts/upload", {
      method: "POST",
      headers: { Authorization: "Bearer" + token },
      body: formData+myId,
    });
    const data = await res.json();
    if (data) {
      console.log(data)
     // location.assign(URL_BASE + "/");
    }
  } catch (err) {
    console.log(err);
  }
});
