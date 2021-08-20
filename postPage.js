import postService from '../services/moviesService.js';

let topicFieldPost = document.getElementById("topic-title");

function showPost() {
    topicFieldPost.classList.remove('hidden');
    postService.getPost()
        .then(renderPosts);
}

function hidePost() {
    topicFieldPost.classList.add('hidden');
}


function renderPosts(posts) {
    let postTemplate = moviesSection.querySelector('.topic-container');
    let postDivElement = document.querySelector('.topic-name-wrapper');
    postDivElement.innerHTML = '';
    
    for (const post of posts) {
        let currentPostElement = postTemplate.cloneNode(true);
        currentPostElement.classList.remove('hidden');
        currentPostElement.removeAttribute('id');

        let titleElement = currentPostElement.querySelector('#title');
        titleElement.textContent = post.title;

        let usernameElement = currentPostElement.querySelector('.nick-name');
        usernameElement.textContent = post.username;

        postDivElement.appendChild(currentPostElement);
    }

    topicFieldPost.appendChild(movieListElement)
}

export default {
    showPost,
    hidePost,
}