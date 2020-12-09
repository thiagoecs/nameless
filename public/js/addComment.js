"use strict";
// const form = document.getElementById("comments-form");
// if(form){
//     console.log(form)
// form.addEventListener("submit", async (e) => {
//   e.preventDefault();
//   const text = form.comment.value;
//   console.log(text)
// });
// }
const postComment = async (form,e) => {
    e.preventDefault();
    const text = form.comment.value;
    console.log(text);
};
