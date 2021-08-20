async function fetchComment(url) {
  let response = await fetch(url);
  return await response.json();
}
async function getComments(id) {
  try {
    let url = `http://localhost:3030/jsonstore/collections/myboard/comments`;
    let comments = await fetchComment(url);

    // console.log(comments);
    Object.values(comments).map((el) => {
      if (el.postId == id) {
        let comment = createComment(el.username, el.post, el.id);
        // console.log(comment);
        let commentDiv = document.querySelector(".comment");
        commentDiv.appendChild(comment);
      }
    });
  } catch (err) {
    console.error(err);
  }
}


function createNewViewPost(title, username, post, id) {
    let div = document.createElement("div");
    div.setAttribute("id", id);
    div.classList.add("post-id");
    let divName = document.createElement("div");
    divName.classList.add("normal");
    let h2 = document.createElement("h2");
    h2.setAttribute("id", title);
    h2.textContent = title;
    divName.appendChild(h2);
    div.appendChild(divName);
  
    let divComment = document.createElement("div");
    divComment.classList.add("comment");
    let divHeader = document.createElement("div");
    divHeader.classList.add("header");
    divComment.appendChild(divHeader);
    let img = document.createElement("img");
    img.setAttribute("src", "./static/profile.png");
    img.setAttribute("alt", "avatar");
    divHeader.appendChild(img);
  
    let p = document.createElement("p");
    let span = document.createElement("span");
    span.textContent = `${username}`;
    p.appendChild(span);
    let time = document.createElement("time");
    time.textContent = "2020-10-10 12:08:28";
    
    p.textContent = `${span.textContent} posted on `;
    p.appendChild(time);
    divHeader.appendChild(p);
  
    let pPost = document.createElement("p");
    pPost.textContent = post;
    divHeader.appendChild(pPost);
  
    div.appendChild(divComment);
  
    let divWrap = document.createElement("div");
    divWrap.classList.add("new-topic-border");
    let header = document.createElement("h3");
    header.style.fontStyle = "italic";
    header.textContent = `currentUser comment:`;
    let divComm = document.createElement("div");
    divComm.setAttribute("id", "post-input");
    let text = document.createElement("textarea");
    text.setAttribute("id", "comment-area");
    divComm.appendChild(text);
    let label = document.createElement("label");
    label.textContent = "Username *";
    let input = document.createElement("input");
    input.setAttribute("id", "username-input");
    let usernameDiv = document.createElement("div");;
    usernameDiv.classList.add("new-topic-title");
    usernameDiv.appendChild(label);
    usernameDiv.appendChild(input);
    divComm.appendChild(usernameDiv);
  
    let divButton = document.createElement("div");
    divButton.classList.add("btn");
    let buttonPost = document.createElement("button");
    buttonPost.classList.add("public");
    buttonPost.setAttribute("id", "post-button");
    buttonPost.textContent = "Post";
    buttonPost.addEventListener("click", currentUserComment);
    divButton.appendChild(buttonPost);
  
    divWrap.appendChild(divComm);
    divWrap.appendChild(divButton);
  
    div.appendChild(header);
    div.appendChild(divWrap);
  
    return div;
  }
  
  async function currentUserComment() {
    try {
      let url = "http://localhost:3030/jsonstore/collections/myboard/comments";
      let usernameField = document.getElementById("username-input").value;
      let postField = document.getElementById("comment-area").value;
      let headerPost = document.querySelector(".header");
      let formBody = document.createElement("div");
      let title = document.querySelector(".post-id");
  
      let newComment = {
        username: usernameField,
        post: postField,
        postId: title.id
      };
  
      let response = await fetch(url, {
        headers: {
          "Content-Type": "application/json",
        },
        method: "Post",
        body: JSON.stringify(newComment),
      });
  
      let result = await response.json();
      
      let createdHtmlComment = createComment(result.username, result.post, result.postId);
      formBody.appendChild(createdHtmlComment);
      headerPost.appendChild(formBody);
      document.getElementById("comment-area").value = "";
      document.getElementById("username-input").value = "";
    } catch (err) {
      console.error(err);
    }
  }
  
  function createComment(username, post, postId){
    let div = document.createElement("div");
    div.setAttribute("id", "user-comment");
  
    let divTopic = document.createElement("div");
    divTopic.classList.add("topic-name-wrapper");
    divTopic.setAttribute("id", postId);
    div.appendChild(divTopic);
    let divName = document.createElement("div");
    divName.classList.add("topic-name");
    divTopic.appendChild(divName);
  
    let p = document.createElement("p");
    let span = document.createElement("span");
    span.textContent = `${username}`;
    p.appendChild(span);
    let time = document.createElement("time");
    time.textContent = "3/15/2021, 12:39:02 AM";
    
    
    p.textContent = `${span.textContent} commented on `;
    p.appendChild(time);
    let content = document.createElement("div");
    content.classList.add("post-content");
    let pComment = document.createElement("p");
    pComment.textContent = post;
    content.appendChild(pComment);
    divName.appendChild(p);
    divName.appendChild(content);
  
    return div; 
  }

  export {
    createNewViewPost,
    getComments
  }