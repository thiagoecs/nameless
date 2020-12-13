"use strict";

// adding comments and displaying them right after when they are submitted
const postComment = async (data, form) => {
  const commentsContainer = document.querySelector(".post__comments");
  const commentNum = commentsContainer.querySelector("span");
  const list = commentsContainer.querySelector(".comments-list");
  const text = form.comment.value;

  // increasing a number of comments and displaying in the page
  // when the comment is successfully inserted into database
  const increaseNumber = () => {
    commentNum.innerHTML = parseInt(commentNum.innerHTML, 10) + 1;
  };

  try {
    // sending comment text with jwt token
    const res = await fetch(URL_BASE + "/posts/" + data.id + "/comment", {
      method: "POST",
      body: JSON.stringify({ comment: text }),
      headers: { "Content-Type": "application/json", Authorization: "Bearer " + token },
    });

    // if the comment is successfully saved in the database
    if (res.status === 201) {
      // adding comment text into the list of comments
      //const userId = data.creator
      const userInfo = await getMyProfile()
      const userNickname = userInfo.nickname
      const li = document.createElement("li");
      const name = document.createElement('h5')
      const span = document.createElement("span");
      
      span.innerHTML = text;
      name.innerHTML = userNickname;
      li.appendChild(name);
      li.appendChild(span);
      list.appendChild(li);
      // and increasing number
      increaseNumber();
    }
  } catch (e) {
    console.log(e);
  }
  // emptying text in the comment input
  form.comment.value = "";
};
