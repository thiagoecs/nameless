const path = require("path");
const routes = require("../routes");

// send join request
const postJoin = (req, res) => {
  const {
    body: { nickname, email, password, password2 },
  } = req; // same as const nickname = req.body.nickname ...
  // TODO : When two passwords are not same, it'll redirect to join page
  // If there's no error, redirects to main page.
  if (password !== password2) {
    res.status(400);
    console.log("Passwords are not same");
    res.render("join", { pageTitle: "Join" });
  } else {
    res.redirect(routes.home);
  }
};

// access join page
const getJoin = (req, res) => {
  res.render("join", { pageTitle: "Join" });
  //res.sendFile(path.resolve(__dirname, "../public/html", "join.html"));
};

// send login request
const postLogin = (req, res) => {
  //ToDo: compare email and password with ones from DB
  res.redirect(routes.home);
};

// access to login page
const getLogin = (req, res) => {
  res.render("login",{pageTitle:"Log In"})
};

const logout = (req, res) => {
  // TODO: Make users logged out
  res.redirect(routes.home);
};

const userHome = (req, res) => res.send("user home");
const userDetail = (req, res) => res.send("user detail");
const editProfile = (req, res) => res.send("edit profile");
const changePassword = (req, res) => res.send("change password");

module.exports = {
  postJoin,
  getJoin,
  postLogin,
  getLogin,
  logout,
  userHome,
  userDetail,
  editProfile,
  changePassword,
};
//save functions
