'use strict'
const main_ = document.querySelector("main");
const addPosts = (posts) => {
  posts.forEach((post) => {
    const section = document.createElement("section");
    section.className = "movie";
    const wrapper = document.createElement("div");
    wrapper.className = "wrapper";
    const postHeader = document.createElement("div");
    postHeader.className = "movie_header";
    const title = document.createElement("h4");
    const emoji = document.createElement("span");

    emoji.className = "user-type";

    title.className = "post-link";
    title.innerText = post.restaurant;

    const creator = document.createElement("h5");

    creator.className = "user-link";
    creator.innerText = post.nickname;

    postHeader.appendChild(title);
    creator.appendChild(emoji);
    postHeader.appendChild(creator);
    wrapper.appendChild(postHeader);

    if (post.userType === 2) {
      emoji.innerText = `👨‍🍳`;
    }

    const img = document.createElement("img");
    img.src = `../${post.sourceFile}`;
    const figure = document.createElement("figure").appendChild(img);

    const views = document.createElement("h5");
    views.classList.add("views");
    views.innerText = `views: ${post.views}`;
    const comments = document.createElement("h5");
    comments.classList.add("comments");
    const commentNum = post.comments;
    comments.innerText = `comments: ${commentNum?`${commentNum.length}`:0}`;
    const votes = document.createElement("h5");
    votes.classList.add("votes");
    votes.innerText = `votes: ${post.votes}`;

    wrapper.appendChild(figure);
    wrapper.appendChild(views);
    wrapper.appendChild(comments);
    wrapper.appendChild(votes);
    section.appendChild(wrapper);
    main_.appendChild(section);

    title.addEventListener("click", () => {
      getPost(post.id);
    });
    img.addEventListener("click", () => {
      getPost(post.id);
    });
    creator.addEventListener("click", () => {
      getProfile(post.creator);
    });
  });
};
