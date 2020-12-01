//fake db for test
const posts = [{
  id: 12345,
  title: "some title",
  description: "This is description",
  views: 22,
  imgUrl:
    "https://images.unsplash.com/photo-1606225457115-9b0de873c5db?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",

  comments: 3,
  votes: 2,
  creator: {
    id: 2,
    name: "min",
    email: 'ejifj@wef.com'
  }},{
  id: 222,
  title: "some title",
  description: "This is description",
  views: 22,
  imgUrl:
    "https://images.unsplash.com/photo-1606225457115-9b0de873c5db?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw1fHx8ZW58MHx8fA%3D%3D&auto=format&fit=crop&w=500&q=60",

  comments: 3,
  votes: 2,
  creator: {
    id: 2,
    name: "min",
    email: 'ejifj@wef.com'
  }
}];

module.exports=posts