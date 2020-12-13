"use strict";
// making a list of posts for main page
const addPosts = (posts) => {
  // iterating the list of posts
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

    // adding emoji next to the nickname if user type is 2 (business)
    if (post.userType === 2) {
      emoji.innerText = `👨‍🍳`;
    }

    const filename = post.sourceFile.split(".")[1];
    const ext = filename ? filename.toLowerCase() : undefined;

    const figure = document.createElement("figure");

    // checking if an uploaded file is image or video
    // after checking it, append a child element to figure element
    if (ext === "png" || ext === "jpg" || ext === "gif" || ext === "jpeg") {
      figure.innerHTML = `<img src='/app/${post.sourceFile}'>`;
       const img = document.querySelector("img");
       if (img) {
         img.addEventListener("click", () => {
           console.log(post.id);
           getPost(post.id);
         });
       }
    } else if (ext === "avi" || ext === "mp4" || ext === "wmv" || ext == "mpg") {
      figure.innerHTML = `<video controls=true width="460" height="350">
       <source src='/app/${post.sourceFile}'></source>
       </video>`;
    } else {
      figure.innerHTML = "";
    }
    const infoContainer = document.createElement("div");
    infoContainer.classList.add("info-container");
    // views and comments info
    const views = document.createElement("h5");
    views.classList.add("views");
    views.innerText = `views: ${post.views}`;
    const comments = document.createElement("h5");
    comments.classList.add("comments");
    const commentNum = post.comments;
    comments.innerText = `comments: ${commentNum ? `${commentNum.length}` : 0}`;
    infoContainer.appendChild(views);
    infoContainer.appendChild(comments);
    // const votes = document.createElement("h5");
    // votes.classList.add("votes");
    // votes.innerText = `votes: ${post.votes}`;

    wrapper.appendChild(figure);
    wrapper.appendChild(infoContainer);
    //wrapper.appendChild(votes);
    section.appendChild(wrapper);
    main.appendChild(section);

    title.addEventListener("click", () => {
      getPost(post.id);
    });
   
    creator.addEventListener("click", () => {
      getProfile(post.creator);
    });
  });
};
