"use strict";
// functions about posts
// getting a list of posts or a single post

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

    // extracting file extension from filename
    const filename = post.sourceFile.split(".")[1];
    const ext = filename ? filename.toLowerCase() : undefined;

    const figure = document.createElement("figure");

    // checking if an uploaded file is image or video
    // after checking it, append a child element to figure element
    if (ext === "png" || ext === "jpg" || ext === "gif" || ext === "jpeg") {
      figure.innerHTML = `<img src='/app/${post.sourceFile}'>`;
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

    wrapper.appendChild(figure);
    wrapper.appendChild(infoContainer);
    section.appendChild(wrapper);
    main.appendChild(section);

    // redirecting to a detailed page
    title.addEventListener("click", () => {
      getPost(post.id);
    });

    // redirecting to an user's profile
    creator.addEventListener("click", () => {
      getProfile(post.creator);
    });
  });
};

// showing a detailed page with comments
const getPost = async (id) => {
  try {
    const data = await getPostDataById(id); // getting a post's data
    const myProfileData = await getMyProfile(); // currently logged in user's data
    const uploadTime = data.createdAt.split("T");
    const date = uploadTime[0];
    const time = uploadTime[1].split(".")[0]; // taking uploade time

    // if there is not back button, makes it
    const backButton = document.querySelector("#back");
    if (!backButton) {
      makeBackButton();
    }

    document.title = `${data.restaurant} | Food Advisor`;
    main.innerHTML = `
      <section class="movie" id="detail">
        <div id='wrapper' class="wrapper">
            <div class="movie_header">
            <h4>${data.restaurant}</h4>
            <h5 class="user-link"><span class="user-type"></span>${data.nickname}</h5>
          </div>
          <div class="sub_header">
            <h6 style="font-size: 0.8rem;">Uploaded at: ${date} ${time}</h6>
          </div>
          <figure>          
          </figure>
          <div class="view-votes">
          <h5 class="views">views: ${data.views}</h5>
          </div>
           <p class="post__description">${data.description}</p>
            <div class='post__comments'>
              <form id='comments-form'>
              <input class='input-bar comment-bar' name="comment" type='text' placeholder="Add a comment">
              <button class="redbox" type="submit">Save</button>
              </form>
              <h5 class='comments'>comment(s): <span class='comment-num'>${data.comments.length}</span></h5>
              <ul class='comments-list'></ul>
              </div>
        </div>
      </section>`;
    const ext = data.sourceFile.split(".")[1].toLowerCase();

    const figure = document.querySelector("figure");
    if (ext === "png" || ext === "jpg" || ext === "gif" || ext === "jpeg") {
      figure.innerHTML = `<img src='/app/${data.sourceFile}'>`;
    } else if (ext === "avi" || ext === "mp4" || ext === "wmv" || ext == "mpg") {
      figure.innerHTML = `<video controls=true width="460" height="350">
       <source src='/app/${data.sourceFile}'></source>
       </video>`;
    }
    const commentsList = document.querySelector(".comments-list");
    data.comments.forEach(async(comment) => {
      const author = await getUserDataById(comment.creator)
      console.log(author)
      const name = document.createElement("h5");
      const text = document.createElement("li");
      const textSpan = document.createElement("span");
      textSpan.innerText = comment.text;
      name.innerHTML = author.nickname;
      name.style.cursor = "pointer";
      text.appendChild(name);
      text.appendChild(textSpan);
      commentsList.appendChild(text);
      name.addEventListener("click", () => {
        getProfile(author.id);
      });
    });
    const profileLink = document.querySelector(".user-link");
    profileLink.addEventListener("click", () => {
      getProfile(data.creator);
    });
    const subHeader = document.querySelector(".sub_header");
    const commentBox = document.querySelector("#comments-form");

    if (!token) {
      commentBox.style.display = "none";
    }
    commentBox.addEventListener("submit", async (e) => {
      e.preventDefault();
      postComment(data, commentBox);
    });

    //checking if its a restaurant posting
    const user = await getUserDataById(data.creator);
    if (user.userType === 2) {
      const title = document.querySelector(".user-type");
      title.innerText = `👨‍🍳`;
    }
    //if owner or admin, buttons to edit will apear
    if (data.creator === myProfileData.id || myProfileData.userType === 3) {
      const editBtn = document.createElement("button");
      editBtn.innerText = "Edit Post";
      subHeader.appendChild(editBtn);
      editBtn.addEventListener("click", () => {
        getEditPost(data.id);
      });
    }
  } catch (e) {
    console.log(e);
  }
};
