"use strict";

const postComment = async (data, form) => {
  const commentsContainer = document.querySelector(".post__comments");
  const commentNum = commentsContainer.querySelector("span");
  const list = commentsContainer.querySelector(".comments-list");
  const text = form.comment.value;
  const increaseNumber = () => {
    commentNum.innerHTML = parseInt(commentNum.innerHTML, 10) + 1;
  };

  try {
    const res = await fetch(URL_BASE + "/posts/" + data.id + "/comment", {
      method: "POST",
      body: JSON.stringify({ comment: text }),
      headers: { "Content-Type": "application/json" },
    });
    console.log(res);
    if (res.status === 201) {
      const li = document.createElement("li");
      const span = document.createElement("span");
      const line = document.createElement("hr");
      span.innerHTML = text;
      li.appendChild(span);
      li.appendChild(line);
      list.appendChild(li);
      increaseNumber();
    }
  } catch (e) {
    console.log(e);
  }
  form.comment.value = "";
};
