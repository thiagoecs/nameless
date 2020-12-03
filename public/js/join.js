const form = document.querySelector(".register-form");
const emailError = document.querySelector(".email-error");
const passwordError = document.querySelector(".password-error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const nickname = form.nickname.value;
  const email = form.email.value;
  const password = form.password.value;
  const password2 = form.password2.value;
  try {
    // receiving json data from backend when submit login request
    const res = await fetch("/join", {
      method: "POST",
      body: JSON.stringify({ nickname, email, password, password2 }),
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
