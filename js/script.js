'use strict';
// Урок 10
/*
Задание

2.	Используя только файл скрипта  выполнить такие действия:
•	Восстановить порядок книг.
•	Заменить картинку заднего фона на другую из папки image
•	Исправить заголовок в книге 3( Получится - "Книга 3. this и Прототипы Объектов")
•	Удалить рекламу со страницы
•	Восстановить порядок глав во второй и пятой книге (внимательно инспектируйте индексы элементов, поможет dev tools)
•	в шестой книге добавить главу “Глава 8: За пределами ES6” и поставить её в правильное место
 */

let restoreOrderBooks = document.querySelectorAll('.book'),    // Восстановить порядок книг
    replacePicture = document.querySelector('body'),           // Заменить картинку 
    correctTitle = document.querySelectorAll('h2'),            // Исправить заголовок 
    removeAds = document.querySelector('.adv'),                // Удалить рекламу 
    restoreOrderChapters = document.querySelectorAll('li');    // Восстановить порядок глав
     

console.log(restoreOrderBooks);
console.log(replacePicture);
console.log(correctTitle);
console.log(removeAds);
console.log(restoreOrderChapters);

// Востановление порядка книг
let book = restoreOrderBooks;
   book[0].before(book[1]);
   book[2].before(book[4]);
   book[5].after(book[2]);
// restoreOrderBooks[0].before(restoreOrderBooks[1]);
// restoreOrderBooks[2].before(restoreOrderBooks[4]);
// restoreOrderBooks[5].after(restoreOrderBooks[2]);

// Замена картинки заднего фона 
replacePicture.style.backgroundImage = 'url(./image/you-dont-know-js.jpg)';

// Исправление заголовка в книге 3 
correctTitle[4].textContent = 'Книга 3. this и Прототипы Объектов';
correctTitle[4].style.color = '#bdb76b';
// Удаление рекламы со страницы
removeAds.remove();
console.log(removeAds);

// Восстановление порядока глав
restoreOrderChapters[3].after(restoreOrderChapters[6]);
restoreOrderChapters[4].before(restoreOrderChapters[8]);
restoreOrderChapters[9].after(restoreOrderChapters[2]);

restoreOrderChapters[48].before(restoreOrderChapters[55]);
restoreOrderChapters[50].after(restoreOrderChapters[48]);
restoreOrderChapters[53].after(restoreOrderChapters[51]);

// Добавление главы в 6-ой книге 
let bookTitle = restoreOrderChapters[25].cloneNode(true);
   bookTitle.textContent = 'Глава 8: За пределами ES6';
   restoreOrderChapters[25].after(bookTitle);


