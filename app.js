//http://localhost:3030/jsonstore/collections/myboard/posts
//http://localhost:3030/jsonstore/collections/myboard/comments
import {createNewViewPost, getComments} from "./comments.js";

let btnPost = document.getElementById("post-button");
btnPost.addEventListener("click", createPost);
let topicFieldPost = document.getElementById("t-title");
topicFieldPost.style.display = "none";

let cancelBtn = document.getElementById("cancel-button");
cancelBtn.addEventListener("click", clearFields);

async function getPosts(e) {
  // e.preventDefault();
  try {
    let posts = await doGetRequest("http://localhost:3030/jsonstore/collections/myboard/posts");

    // console.log(posts);

    Object.values(posts).map((el) => {
      let post = createPostStructure(el.title, el.username, el.post, el._id);
      // console.log(post);
      topicFieldPost.appendChild(post);
    });
  } catch (err) {
    console.error(err);
  }
}

async function createPost() {
  try {
    let url = "http://localhost:3030/jsonstore/collections/myboard/posts";
    let titleField = document.getElementById("topicName").value;
    let usernameField = document.getElementById("username").value;
    let postField = document.getElementById("postText").value;

    let newPost = {
      title: titleField,
      username: usernameField,
      post: postField,
    };

    let response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "Post",
      body: JSON.stringify(newPost),
    });

    let result = await response.json();
    // console.log(result);
    getPosts();
  } catch (err) {
    console.error(err);
  }
}

function createPostStructure(title, username, post, id) {
  let divTopic = document.createElement("div");
  divTopic.classList.add("topic-container");
  divTopic.setAttribute("id", id);
  let divTopicName = document.createElement("div");
  divTopicName.classList.add("topic-name-wrapper");
  divTopic.appendChild(divTopicName);

  let divName = document.createElement("div");
  divName.classList.add("topic-name");
  divTopicName.appendChild(divName);

  let a = document.createElement("a");
  a.classList.add("normal");
  a.setAttribute("href", "#");
  divName.appendChild(a);
  let h2 = document.createElement("h2");
  h2.textContent = `${title}`;
  a.appendChild(h2);
  a.addEventListener("click", commentPage);

  let divCols = document.createElement("div");
  divCols.classList.add("columns");
  divName.appendChild(divCols);
  let justDiv = document.createElement("div");
  divCols.appendChild(justDiv);

  let p = document.createElement("p");
  p.textContent = "Date: ";
  justDiv.appendChild(p);
  let time = document.createElement("time");
  time.textContent = "2020-10-10T12:08:28.451Z";
  p.appendChild(time);

  let divNick = document.createElement("div");
  divNick.classList.add("nick-name");
  justDiv.appendChild(divNick);
  let pUser = document.createElement("p");
  pUser.textContent = `Username: `;
  divNick.appendChild(pUser);
  let span = document.createElement("span");
  span.textContent = `${username}`;
  pUser.appendChild(span);

  topicFieldPost.style.display = "block";
  topicFieldPost.appendChild(divTopic);

  return divTopic;
}

function clearFields(e) {
  e.preventDefault();
  let titleField = document.getElementById("topicName");
  let usernameField = document.getElementById("username");
  let postField = document.getElementById("postText");

  titleField.value = "";
  usernameField.value = "";
  postField.value = "";
}

function commentPage(e) {
  let titleTopic = e.target.closest(".topic-container");

  let header = document.querySelector("header");
  header.style.display = "none";
  let footer = document.querySelector("footer");
  footer.style.display = "none";
  let newTopic = document.querySelector(".new-topic-border");
  newTopic.style.display = "none";
  let topicTitle = document.querySelector(".topic-title");
  topicTitle.style.display = "none";
  let newPostDiv = document.createElement("div");
  newPostDiv.setAttribute("id", "post-page");
  document.querySelector("main").appendChild(newPostDiv);

  getPost(titleTopic.id);
  getComments(titleTopic.id);
}

async function doGetRequest(url) {
  let response = await fetch(url);
  return await response.json();
}
async function getPost(id) {
  try {
    let url = `http://localhost:3030/jsonstore/collections/myboard/posts/${id}`;
    let postEl = await doGetRequest(url);

    // console.log(postEl);
    let newPostHtml = createNewViewPost(postEl.title, postEl.username, postEl.post, postEl._id);
    let postPageDiv = document.getElementById("post-page");
    postPageDiv.appendChild(newPostHtml);
  } catch (err) {
    console.error(err);
  }
}

getPosts();