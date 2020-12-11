"use strict";

const getChangePassword = (id) => {
  document.title = "Change password | Food Advisor";
  head.innerHTML += `<link rel="stylesheet" type="text/css" href="/app/css/form.css" />`;
  main.innerHTML = `
<div class="form-wrapper">
    <h2>Change password</h2>
    <div class="form-container">
        <!-- TODO: add validators-->
        <form class="edit-form">
            <label for="newPassword">New password</label>
            <input class="input-field" type="password" name="newPassword" id="newPassword" placeholder="New password" required>
            <label for="newPassword1">Verify password</label>
            <input class="input-field" type="password" name="newPassword1" id="newPassword1" placeholder="Verify password" required>
            <span class="password-error"></span>
            <input class="submit" type="submit" value="🥗 Change password">
        </form>
    </div>
</div>
`;
  putChangePassword(id);
};
const putChangePassword = (id) => {
  const form = document.querySelector(".edit-form");
  const passwordError = document.querySelector(".password-error");

  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const newPassword = form.newPassword.value;
      const newPassword1 = form.newPassword1.value;
      const fetchOptions = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Authorization: "Bearer " + sessionStorage.getItem("token"),
        },
        body: JSON.stringify({ newPassword, newPassword1 }),
      };
      try {
        const response = await fetch(URL_BASE + "/users/" + id + "/change-passwd", fetchOptions);
        const data = await response.json();
        if (data.errors) {
          passwordError.innerText = data.errors.password;
          
        } else {
          alert("Password has been changed successfully!");
          location.assign(URL_BASE+"/");
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
};
