"use strict";
const URL_BASE = "https://10.114.32.39/app"; // base url
const head_ = document.querySelector("head");
const searchForm = document.querySelector("form");
const searchBar = searchForm.querySelector("#search-bar");
const searchTitle = document.querySelector(".search_filter__header").querySelector("h3");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  // getting keyword from input
  const query = searchBar.value;
  if (query !== "") {
    // if keword is not empty string, getting posts that correspond to the keyword
    document.title = `Searching for: ${query} | Food Advisor`;
    searchTitle.style.display = "block";
    const response = await fetch(URL_BASE + "/search?term=" + query);
    const data = await response.json();

    if (data.posts.length == 0) {
      searchTitle.style.marginTop = "10vh";
    } else {
      searchTitle.style.marginTop = "2vh";
    }
    const posts = document.querySelectorAll(".movie");
    const form = document.querySelector(".form-wrapper");
    searchTitle.innerHTML = `Searching for: '${query}'    |    ${data.posts.length}  post(s)`;
    // if there's form in the page, remove a stylesheet for the form
    if (form) {
      const style = head_.children[4];
      head_.removeChild(style);
      form.parentNode.removeChild(form);
    }
    // removing all posts
    posts.forEach((post) => {
      post.parentNode.removeChild(post);
    });
    // and getting new posts
    addPosts(data.posts);
  } else {
    location.assign(URL_BASE + "/");
  }
});
