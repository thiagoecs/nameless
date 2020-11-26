const path = require("path");
const routes = require("../routes");
const posts = require("../db");

const home = (req, res) =>{
  //console.log(posts)
  // render html file with required source files
  // send variable pageTitle to layout file
  res.render("index", { pageTitle: "main", posts });}

const search = (req, res) => {
  const searchingBy = req.query.term;
  console.log(searchingBy);
  res.render("search", { pageTitle: `Search: ${searchingBy}`, searchingBy });
  //res.sendFile(path.resolve(__dirname, "../public/html", "search.html"));
};
const postHome = (req, res) => res.send("post home");
const postDetail = (req, res) => {
  const id = req.params.id
  console.log(id)
  try{
    //TODO: connect to database
    res.render("postDetail",{pageTitle: detailedPost.title, post})
  }catch(err){
    console.log(err)
    res.redirect(routes.home)
  }
}
const upload = (req, res) => res.send("upload");
const editPost = (req, res) => res.send("edit post");
const deletePost = (req, res) => res.send("delete post");

module.exports = {
  home,
  search,
  postHome,
  postDetail,
  upload,
  editPost,
  deletePost,
};
