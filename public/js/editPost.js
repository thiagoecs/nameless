"use strict";

// This file is for editing past page

const head = document.querySelector("head");

// making editing post page
const getEditPost = async (id) => {
  const postData = await getPostDataById(id);
  head.innerHTML += `<link rel="stylesheet" type="text/css" href="/app/css/form.css" />`;
  main.innerHTML = `
  <div class="form-wrapper">
    <h2>Edit Post</h2>
    <div class="form-container">
        <!-- TODO: add validators-->
        <form method="PUT" id="upload">
            <label for="title"><span>*</span>Restaurant</label>
            <input class="input-field" type="text" name="title" id="title" placeholder="Restaurant's name" value="${postData.restaurant}" required />
            <label for="description">Description</label>
            <textarea class="textarea" form="upload" name="description" id="description">${postData.description}</textarea>
            <input class="submit" type="submit" value="🌭 Update post" />
        </form>
        <button class="delete submit">❌ Delete post</button>
    </div>
</div>
`;
  putEditPost(postData);
  deletePost(postData);
};

const putEditPost = (data) => {
  const uploadForm = document.querySelector("#upload");
  if (uploadForm) {
    uploadForm.addEventListener("submit", async (e) => {
      e.preventDefault();
      const restaurant = uploadForm.title.value;
      const description = uploadForm.description.value;
      const fetchOptions = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        body: JSON.stringify({ restaurant, description }),
      };
      const res = await fetch(URL_BASE + "/posts/" + data.id, fetchOptions);
      if (res.status === 201) {
        alert("The post has been editted successfully!");
        location.assign(URL_BASE + "/");
      }
    });
  }
};

const deletePost = (data) => {
  const deleteBtn = document.querySelector(".delete");
  if (deleteBtn) {
    deleteBtn.addEventListener("click", async (e) => {
      e.preventDefault();
      const fetchOptions = {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
      };
      try {
        const res = await fetch(URL_BASE + "/posts/" + data.id, fetchOptions);
        if (res.status === 201) {
          alert("The post has been deleted successfully!");
          location.assign(URL_BASE + "/");
        }
      } catch (e) {
        console.log(e);
      }
    });
  }
};
