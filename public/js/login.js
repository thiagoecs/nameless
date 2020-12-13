"use strict";
// for login page
const form = document.querySelector(".login-form");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");
const loginHeader = document.querySelector("ul");
const redButton = document.querySelector(".redbox");

// making submit event listener
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = form.email.value;
  const password = form.password.value;
  const fetchOptions = {
    method: "POST",
    body: JSON.stringify({ email, password }), // sending email and password value
    headers: { "Content-Type": "application/json" },
  };
  try {
    // receiving json data from backend when submit login request
    const res = await fetch(`${URL_BASE}/login`, fetchOptions);
    const data = await res.json();
    // if there's error, displays error message to the form
    if (data.errors) {
      emailError.innerText = data.errors.email;
      passwordError.innerText = data.errors.password;
    } else if (data.user) {
      // if successfully logged in, redirects to the main page
      location.assign(URL_BASE + "/");
    } else {
      alert(data.message);
    }
  } catch (err) {
    console.log(err);
  }
});
