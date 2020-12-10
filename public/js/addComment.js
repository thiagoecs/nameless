"use strict";

const postComment = async (data, form) => {
  const commentsContainer = document.querySelector(".post__comments");
  const commentNum = commentsContainer.querySelector("span");
  const list = commentsContainer.querySelector(".comments-list");
  const text = form.comment.value;
  const increaseNumber = () => {
    commentNum.innerHTML = parseInt(commentNum.innerHTML, 10) + 1;
  };
  const addComment = (comment) => {
    const li = document.createElement("li");
    const span = document.createElement("span");
    const line = document.createElement("hr");
    span.innerHTML = comment;
    li.appendChild(span);
    li.appendChild(line);
    list.appendChild(li);
    increaseNumber();
  };
  try {
    const res = await fetch(url + "/posts/" + data.id + "/comment", {
      method: "POST",
      body: JSON.stringify({ comment: text }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
    if (res.status === 201) {
      addComment(text);
    }
  } catch (e) {
    console.log(e);
  }
  form.comment.value = "";
};
