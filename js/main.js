// В index.html
// 1 отримати масив об'єктів з endpoint`а https://jsonplaceholder.typicode.com/users
// 2 Вивести id,name всіх user в index.html. Окремий блок для кожного user.
// 3 Додати кожному блоку кнопку/посилання , при кліку на яку відбувається перехід  на сторінку user-details.html, котра має детальну інфорацію про об'єкт на який клікнули

// index.html - всі блоки з user - по 2 в рядок. кнопки/аосилвння розташувати під інформацією про user.
// Всі елементи котрі характеризують users, posts, comments візуалізувати, так, щоб було видно що це блоки (дати фон. марджини і тд)


//Import modules from module "./--common-export-modules.js"
import { createHtmlElement, wrapperFunc, firstWordStyle} from "./common-export-modules.js"


const userUrl = 'https://jsonplaceholder.typicode.com/users';


//show list of all users on the index.html
function usersDetails(arr, styleClassName_1, styleClassName_2, toDiv) {
    const mainDiv = document.getElementById(toDiv);
    const outerDiv = createHtmlElement('div', styleClassName_2, '');

    for (const element of arr) {
        const pName = createHtmlElement('p', [], `name: ${element.name}`);
        firstWordStyle(pName, 'first-word'); // transforms the first word of paragraph to bold style
        const pId = createHtmlElement('p', [], `id: ${element.id}`);
        firstWordStyle(pId, 'first-word'); // transforms the first word of paragraph to bold style
        const btn = createHtmlElement('button', 'btn-normal', 'Info\' details');
        const div = createHtmlElement('div', styleClassName_1, '');
        div.append(pName, pId,  btn);
        outerDiv.appendChild(div);
        mainDiv.appendChild(outerDiv);

        btn.addEventListener('click', (e) => {
            e.preventDefault();
            document.location.href = `user-details.html?user_info=` + JSON.stringify(element);
        })
    }
}


//show list of all users on the index.html
wrapperFunc(userUrl, usersDetails, 'user-list', 'main-list-outer', 'main-index');





