// This module exports  reusable functions to others


//This function for creating HTML elements (div, p , a , button...) with possibility of adding classes and innerText to them
export const createHtmlElement = function (htmlEl = 'div', className = '', elText = '') {
    const element = document.createElement(htmlEl);
    element.className = className;
    element.innerText = elText;
    return element;
}

//This function has 5 arguments :
//    - url (url) for fetching and getting data (dataArr: userInfo, posts, comments...) from database
//    - func (async function) for manipulation the dataArr and show them.
//    - styleClassName - name of CSS className (it is array , for styling) of the Div which will be dynamically created in async function (func)
//      (which was described above) .This is need to style div for showing of information on the different ways
//    - toDiv - <div> where the future data will be located
export const wrapperFunc = async function (url, func, styleClassName_1 = '', styleClassName_2 = '', toDiv, field_1, field_2, linkNextPage) {
    try {
        const fetchData = await fetch(url);
        const dataArr = await fetchData.json();
        func(dataArr, styleClassName_1 , styleClassName_2 , toDiv , field_1, field_2 , linkNextPage );
    } catch (err) {
        alert('Something went  wrong. Please check internet connection or the url is incorrect !');
    }
}


//This function uses recursion to access to the data and show them
export const showPosts = function (obj, styleClassName_1, styleClassName_2, toDiv) {

    const mainDiv = document.getElementById(toDiv);
    const outerDiv = createHtmlElement('div', styleClassName_2, '');

    for (const [key, value] of Object.entries(obj)) {
        if (key && (typeof value === "object" && value !== null)) {
            showPosts(value, styleClassName_1, styleClassName_2, toDiv);
        } else {
            if (key) {
            const p = createHtmlElement('p', '', `${key}: ${value}`);
            firstWordStyle(p, 'first-word'); // transforms the first word of paragraph to bold style
            const innerDiv = createHtmlElement('div', styleClassName_1, '');
            innerDiv.appendChild(p);
            outerDiv.appendChild(innerDiv);
            mainDiv.appendChild(outerDiv);
            }
        }
    }
}

//Show users' details
export const showInfo = function (arr, styleClassName_1, styleClassName_2, toDiv) {
    const mainDiv = document.getElementById(toDiv);
    // const infoArr = objToArr(obj); // convert object to array
    for (const [k, v] of arr.entries()) {
        if (v[1] && Array.isArray(v[1])) {
            const p1 = createHtmlElement('p', styleClassName_1, `${v[0]}:`);
            firstWordStyle(p1, 'first-word'); // transforms the first word of paragraph to bold style
            mainDiv.appendChild(p1);
            const outerDiv = createHtmlElement('div', styleClassName_2, '');
            for (const [k1, v1] of v[1].entries()) {
                const p3 = createHtmlElement('p', '', `${v1[0]}: ${v1[1]}`);
                firstWordStyle(p3, 'first-word-italic'); // transforms the first word of paragraph to bold style
                outerDiv.append(p3);
            }
            mainDiv.appendChild(outerDiv);
        } else {
            const p2 = createHtmlElement('p', 'user-block', `${v[0]}: ${v[1]}`);
            firstWordStyle(p2, 'first-word'); // transforms the first word of paragraph to bold style
            mainDiv.appendChild(p2);
        }
    }
}


//This function convert object to array
export const objToArr = function (obj) {
    const arrObj = [];
    for (const [key, value] of Object.entries(obj)) {
        if (key && (typeof value === "object" && value !== null)) {
            arrObj.push([key, objToArr(value)])
        } else {
            arrObj.push([key, value]);
        }
    }
    return arrObj;
}

// This function transforms the first word of paragraph to bold style
export const firstWordStyle = function(element, className) {
    const index = element.innerText.indexOf(':');
    element.innerHTML = `<span class="${className}">` +element.innerText.slice(0, index) + '</span>' +
        element.innerText.slice(index);
}
