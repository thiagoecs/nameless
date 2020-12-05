"use strict";
const form = document.querySelector(".login-form");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");
form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const email = form.email.value;
  const password = form.password.value;
  try {
    // receiving json data from backend when submit login request
    const res = await fetch("/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    console.log(data);
    if (data.errors) {
      emailError.innerText = data.errors.email;
      passwordError.innerText = data.errors.password;
    } else if (data.user) {
      location.assign("/");
    }
  } catch (err) {
    console.log(err);
  }
});
