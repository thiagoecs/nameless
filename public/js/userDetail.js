const url = "https://localhost:8000";
const main = document.querySelector("main");
const loginHeader = document.querySelector(".top_header");
const redButton = document.querySelector(".redbox");
const profile = document.querySelector(".profile");

// <%if (user.id === loggedUser.id) {%>
//             <div class="user-profile__btns">
//                 <a href="/users<%= routes.editProfile%>">
//                     <button>Edit Profile</button>
//                 </a>
//                 <a href="/users<%= routes.changePassword%>">
//                     <button>Change Password</button>
//                 </a>
//             </div>
//             <%}%>

const getCat = async () => {
  console.log("token ", sessionStorage.getItem("userToken"));
  try {
    const options = {
      headers: {
        'Authorization': "Bearer " + sessionStorage.getItem("userToken"),
      },
    };
    const response = await fetch(url + "/me", options);
    const cats = await response.json();
    console.log(cats)
  } catch (e) {
    console.log(e.message);
  }
};
getCat()
