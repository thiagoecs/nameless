'use strict'
const head = document.querySelector("head");
const searchForm = document.querySelector("form");
const searchBar = searchForm.querySelector("#search-bar");
const searchTitle = document.querySelector(".search_filter__header").querySelector("h3");

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const query = searchBar.value;
  if (query !== "") {
    document.title = `Searching for: ${query} | Food Advisor`;
    console.log(query);
    searchTitle.style.display = "block";
    const response = await fetch(URL_BASE + "/search?term=" + query);
    const data = await response.json();
    console.log("data:", data);
    if (data.posts.length == 0) {
      searchTitle.style.marginTop = "10vh";
    } else {
      searchTitle.style.marginTop = "2vh";
    }
    const posts = document.querySelectorAll(".movie");
    const form = document.querySelector('.form-wrapper')
    
    searchTitle.innerHTML = `Searching for: '${query}'    |    ${data.posts.length} post(s)`;
    if(form) {
        const style = head.children[4]
        head.removeChild(style);
        form.parentNode.removeChild(form);
        console.log(head);
     }
    posts.forEach((post) => {
      post.parentNode.removeChild(post); 
    });
    addPosts(data.posts);
  } else {
    location.assign("/");
  }
});