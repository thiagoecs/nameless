const path = require("path");
const routes = require("../routes");
const posts = require("../db");
const postModel = require('../models/postModel');
//const {validationResult } = require('express-validator');
//const {makeThumbnail} = require('../utils/resize');
//const imageMeta = require('../utils/imageMeta');
//const { getCoordinates } = require('../utils/imageMeta');



// render html file with required source files
// send variable pageTitle to layout file
const home = (req, res) => {
  res.render("index", { pageTitle: "main", posts });
};

const search = (req, res) => {
  const searchingBy = req.query.term;
  console.log(searchingBy);
  res.render("search", { pageTitle: `Search: ${searchingBy}`, searchingBy });
  //res.sendFile(path.resolve(__dirname, "../public/html", "search.html"));
};

const postHome = (req, res) => res.send("post home");

const post_list_get = async (req, res) => {
  const posts = await postModel.getAllPosts();
  res.json(posts);
};

const postDetail = async (req, res) => {
  const id = req.params.id;
  console.log(id);
  try {
    //TODO: check to database
    const post = await postModel.getPost(req.params.id);
    res.json(post);
    //
    res.render("postDetail", { pageTitle: "main", posts });
  } catch (err) {
    console.log(err);
    res.redirect(routes.home);
  }
};

/*const post_get_by_id = async (req, res) => {
  const post = await postModel.getPost(req.params.id);
  res.json(post);
};
*/
const upload = (req, res) => res.send("upload");

const editPost = (req, res) => res.send("edit post");



const deletePost = (req, res) => res.send("delete post");





//functions with postModel

const make_thumbnail = async (req, res, next) => {
  try{
  const ready = await makeThumbnail({width: 160, height: 160}, req.file.path, './thumbnails/' + req.file.filename);
  if (ready){
    console.log('make_thumbnail', ready);
    next();
  }
  }
  catch(e){
    return res.status(400).json({errors: e.message});
  }
}

const post_list_get = async (req, res) => {
  const posts = await postModel.getAllPosts();
  res.json(posts);
};

const post_get_by_id = async (req, res) => {
    const post = await postModel.getPost(req.params.id);
    res.json(post);
};


const post_create = async (req,res) => {
    console.log('postController post_create', req.body, req.file);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
      }
    const coords = await imageMeta;getCoordinates(req.file.path);
    console.log('coords', coords);
    req.body.coords = coords;
    
    const id = await postModel.insertPost(req, coords);
    const post = await postModel.getPost(id);
    res.send(post);
};

const post_update = async (req, res) => {
  const updateOk = await postModel.updatePost(req);
  res.json(`{message: "updated... ${updateOk}"}`);
}

const post_delete = async (req, res) => {
  const post = await postModel.deletePost(req.params.id);
  res.json(post);
}

module.exports = {
  home,
  search,
  postHome,
  postDetail,
  upload,
  editPost,
  deletePost,
  make_thumbnail,
  post_list_get,
  post_get_by_id,
  post_create,
  post_update,
  post_delete
};
