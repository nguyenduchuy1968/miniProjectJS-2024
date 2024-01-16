// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост.
//
// На странице post-details.html:
// 7 Вивести всю, без виключення, інформацію про об'єкт post на який клікнули .
// 8 Нижчє інформаці про пост, вивести всі коментарі поточного поста (ендпоінт  - https://jsonplaceholder.typicode.com/posts/POST_ID/comments)


//Import modules from module "./--common-export-modules.js"
import {wrapperFunc, showInfo, showPosts} from "./common-export-modules.js"


const urlPostDetails = new URL(location.href);
const userId = urlPostDetails.searchParams.get('user_id');
const postId = urlPostDetails.searchParams.get('post_id');
const userName = urlPostDetails.searchParams.get('user_name');
const postDetailUrl = `https://jsonplaceholder.typicode.com/users/${userId}/posts?id=${postId}`;
const commentsUrl = `https://jsonplaceholder.typicode.com/posts/${postId}/comments`;

const mainDiv = document.getElementById("comments");
const h1 = document.getElementsByTagName('h1')[0];
h1.innerText = `${userName}'s post information`;


wrapperFunc(postDetailUrl, showPosts,  'user-block', 'user-details', 'postInfo' );


// TimeOut allows us to wait when the show of user's information finishes then heading h2 will appear
setTimeout(() =>{
    const h2 = document.getElementById('comments-heading');
    h2.classList.add('headingH2');
    h2.innerText = `Comments for posts with postId = ${postId} of ${userName}`;
    wrapperFunc(commentsUrl, showPosts, 'user-title-block', 'user-title', 'comments');
}, 400);

const backButton = document.getElementById('previousBtn');
backButton.onclick = () => {
    history.back();
};





