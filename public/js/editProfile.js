"use strict";

const getEditProfile = (data) => {
  document.title = "Update profile | Food Advisor";
  head.innerHTML += `<link rel="stylesheet" type="text/css" href="${URL_BASE}/css/form.css" />`;
  main.innerHTML = `
<div class="form-wrapper">
    <h2>Edit profile</h2>
    <div class="form-container">
        <!-- TODO: add validators-->
        <form class="edit-form" method="PUT" enctype="multipart/form-data">
            <label>Avatar</label>
            <label class="file-button" for="file">Add file</label>
            <input class="filetype" type="file" name="avatar" id="file" accept="image/*"/ required>
            <label for="nickname">Nickname</label>
            <input class="input-field" type="text" name="nickname" id="nickname" placeholder="Nickname" value="${data.nickname}" pattern=".{3,}"
                required>
            <label for="email">Email</label>
            <input class="input-field" type="email" name="email" id="email" placeholder="Email" value="${data.email}" required>
            <span class="email-error"></span>
            <input class="submit" type="submit" value="🍗 Update profile">
        </form>
    </div>
</div>
`;
  putProfile(data);
};

const putProfile = (data) => {
  const form = document.querySelector(".edit-form");
  const emailError = document.querySelector(".email-error");
  if (form) {
    form.addEventListener("submit", async (e) => {
      e.preventDefault();
      const formData = new FormData(form);
      const fetchOptions = {
        method: "PUT",
        headers: { Authorization: "Bearer " + token },
        body: formData,
      };
      try {
        const response = await fetch(URL_BASE + "/users/" + data.id, fetchOptions);
        const userData = await response.json();
        if (userData.errors) {
          emailError.innerText = userData.errors.email;
        } else {
          alert("Profile has been changed successfully!");
          location.assign(URL_BASE + "/");
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
};
