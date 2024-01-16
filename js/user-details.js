// На странице user-details.html:
// 4 Вивести всю, без виключення, інформацію про об'єкт user на який клікнули
// 5 Додати кнопку "post of current user", при кліку на яку, з'являються title всіх постів поточного юзера
// (для получения постов используйте эндпоинт https://jsonplaceholder.typicode.com/users/USER_ID/posts)
// 6 Каждому посту додати кнопку/посилання, при кліку на яку відбувається перехід на сторінку post-details.html, котра має детальну інфу про поточний пост

// user-details.html - блок з інфою про user зверху сторінки. Кнопка нижчє, на 90% ширини сторінки, по центру.
// блоки з короткою іфною про post - в ряд по 5 .


//Import modules from module "./--common-export-modules.js"
import {createHtmlElement, wrapperFunc, firstWordStyle, showInfo, objToArr} from "./common-export-modules.js"


let urlUserInfo = new URL(location.href);
// console.log(urlUserInfo)
let userInfo = JSON.parse(urlUserInfo.searchParams.get('user_info'));
const userPostsUrl = `https://jsonplaceholder.typicode.com/users/${userInfo.id}/posts`;
const h1 = document.getElementsByTagName('h1')[0];
h1.innerText = `${userInfo.name}'s information`;


//First, convert obj "userInfo" to array (objToArr(userInfo)) then how users' details
showInfo(objToArr(userInfo), 'user-block', 'user-details-block ', 'userDetails');


function showPostTitle(arr, styleClassName_1, styleClassName_2, toDiv) {
    const userPostTitleDiv = document.getElementById(toDiv);
    const outerDiv = createHtmlElement('div', styleClassName_2, '');

    for (const element of arr) {
        const pId = createHtmlElement('p', [], `postId: ${element.id}`);
        firstWordStyle(pId, 'first-word'); // transforms the first word of paragraph to bold style
        const pTitle = createHtmlElement('p', [], `post_title: ${element.title}`);
        firstWordStyle(pTitle, 'first-word'); // transforms the first word of paragraph to bold style
        const btn = createHtmlElement('button', 'btn-normal', 'Info\' details');
        const div = createHtmlElement('div', styleClassName_1, '');
        div.append(pId, pTitle, btn);
        outerDiv.appendChild(div);
        userPostTitleDiv.appendChild(outerDiv);

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.location.href = `post-details.html?user_id=${userInfo.id}&user_name=${userInfo.name}&post_id=${element.id}`;
        })
    }
}


//add the innerText "Show the user's posts" and "Click event" to the button . On Click the function "showPostTitle" will be called
// and user's posts will be appeared
const curUserPostsBtn = document.querySelector('.btn-large');
curUserPostsBtn.innerText = `Show the posts of ${userInfo.name}`;

curUserPostsBtn.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.target.innerText === `Show the posts of ${userInfo.name}`) {
            wrapperFunc(userPostsUrl, showPostTitle, 'post-title', 'user-posts-title', 'userPosts');
            e.target.innerText = `Hide the posts of ${userInfo.name}`;
        } else {
            e.target.innerText = `Show the posts of ${userInfo.name}`;
            const div = document.querySelector('.user-posts-title');
            div.remove();
        }
    }
)


