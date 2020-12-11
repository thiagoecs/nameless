const url = "https://localhost:8000";
const main = document.querySelector("main");
const loginHeader = document.querySelector(".top_header");
const redButton = document.querySelector(".redbox");
const profile = document.querySelector(".profile");
const nickname = document.querySelector(".profile__username");
const avatar = document.querySelector(".u-avatar");
const postList = document.querySelector('.post-model')


const getCookie = (name) => {
  if (document.cookie) {
    const value = document.cookie.split(name + "=")[1];
    return value;
  }
};

const getMyProfile = async () => {
  const token = getCookie("userToken");
  try {
    const options = {
      headers: {
        Authorization: "Bearer " + token,
      },
    };
    const response = await fetch(url + "/users", options);
    const profile = await response.json();
    nickname.innerText = profile.nickname
    avatar.src = profile.avatarUrl

  } catch (e) {
    console.log(e.message);
  }
};

// const getPostList = (lists) => {
//   lists.forEach((post)=>{
//      const line = document.createElement("hr");
//      const title = document.createElement("li");
//      const titleSpan = document.createElement("span");
//      titleSpan.innerText = post.restaurant;
//      title.appendChild(titleSpan);
//      title.appendChild(line);
//      postList.appendChild(title);

//      titleSpan.addEventListener('click',()=>{
//        getPost(post.id);
//      })
//   })
// };

getMyProfile();
