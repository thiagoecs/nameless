"use strict";

const form = document.querySelector(".register-form");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");
const infoButton = document.querySelector(".info");
const modal = document.querySelector(".modal");
const closeButton = document.querySelector(".close");

// setting for a modal
infoButton.addEventListener("click", () => {
  modal.style.display = "flex";
});
closeButton.addEventListener("click", () => {
  modal.style.display = "none";
});
// if an user clicks outside of the modal, it's automatically closed
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  // data from the form
  const nickname = form.nickname.value;
  const email = form.email.value;
  const password = form.password.value;
  const password2 = form.password2.value;
  const business = form.business.checked;
  try {
    // receiving json data from backend when submit login request
    const res = await fetch(`${URL_BASE}/join`, {
      method: "POST",
      body: JSON.stringify({ nickname, email, password, password2, business }), //sending data from the form
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();

    // If there's error with email or password, sends error message
    if (data.errors) {
      emailError.innerText = data.errors.email;
      passwordError.innerText = data.errors.password;
    } else if (data.user) {
      location.assign(URL_BASE + "/");
    }
  } catch (err) {
    console.log(err);
  }
});
