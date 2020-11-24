const join = (req, res) => res.send("join");
const login = (req, res) => res.send("login");
const logout = (req, res) => res.send("login");
const userHome = (req, res) => res.send("user home");
const userDetail = (req, res) => res.send("user detail");
const editProfile = (req, res) => res.send("edit profile");
const changePassword = (req, res) => res.send("change password");

module.exports = {
  join,
  login,
  logout,
  userHome,
  userDetail,
  editProfile,
  changePassword,
};
//save functions
