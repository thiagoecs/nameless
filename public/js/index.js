'use strict';
const url = "https://localhost:8000";
const main = document.querySelector("main");

const getPost = async () => {
  try {
    const response = await fetch(url + "/posts");
    const posts = await response.json();
    for (const post of posts) {
      main.innerHTML += `
        <section class="movie">
          <div class="wrapper">
            <div class="movie_header">
            <h4><a class='post-link' href='${url}/posts/${post.id}'>${post.restaurant}</a></h4>
            <h5><a class='user-link' href='${url}/users/${post.creator}'>${post.nickname}</a></h5>
          </div>
          <figure>
          <a href=${url}/posts/${post.id}>
          <img src="${post.sourceFile}"></a>
          </figure>
          <h5 class="views">views: ${post.views}</h5>
          <h5 class='comments'>comments: ${post.comments}</h5>
          <h5 class="votes">Vote: ${post.votes}</h5>
        </div>
        </section>`;
    }
  } catch (e) {
    console.log(e);
  }
};
getPost();
