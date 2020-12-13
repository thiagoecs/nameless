"use strict";

// This file is for changing password page

// making changing password page
const getChangePassword = (id) => {
  // changing title
  document.title = "Change password | Food Advisor";
  // adding css file
  head.innerHTML += `<link rel="stylesheet" type="text/css" href="/app/css/form.css" />`;
 // making a form
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
            <span class="password-error"></span><!-- for error message -->
            <input class="submit" type="submit" value="🥗 Change password">
        </form>
    </div>
</div>
`;
  putChangePassword(id);
};

// making event listener for fetching data
const putChangePassword = (id) => {
  const form = document.querySelector(".edit-form");
  const passwordError = document.querySelector(".password-error");

  if (form) { // making submit event listner for the form
    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      const newPassword = form.newPassword.value;
      const newPassword1 = form.newPassword1.value;

      const fetchOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
        body: JSON.stringify({ newPassword, newPassword1 }), //sending two passwords' value
      };
      try {
        const response = await fetch(URL_BASE + "/users/" + id + "/change-passwd", fetchOptions);
        const data = await response.json();
        if (data.errors) {
          // if there's error, displaying error message on the form
          passwordError.innerText = data.errors.password;
        } else {
          // if the password is changed successfully, sends alert and redirects to main page
          alert("Password has been changed successfully!");
          location.assign(URL_BASE + "/");
        }
      } catch (err) {
        console.log(err);
      }
    });
  }
};
