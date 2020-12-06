"use strict";
const form = document.querySelector(".login-form");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");
const loginHeader = document.querySelector("ul");
const redButton = document.querySelector(".redbox");
const maxAge = 60 * 60 * 1000; // maximum storage period in millisecond

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;
  const fetchOptions = {
    method: "POST",
    body: JSON.stringify({ email, password }),
    headers: { "Content-Type": "application/json" },
  };
  try {
    // receiving json data from backend when submit login request
    const res = await fetch("/login", fetchOptions);
    const data = await res.json();
    if (data.errors) {
      emailError.innerText = data.errors.email;
      passwordError.innerText = data.errors.password;
    } else if (data.user) {
      sessionStorage.setItem("userToken", data.accessToken, { maxAge: maxAge * 2 });
      location.assign("/");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);
  }
});
