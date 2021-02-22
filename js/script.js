// 'use strict';
/*
1) Сделать класс DomElement, который
   содержит свойства
  - selector, 
  - height, 
  - width, 
  - bg, 
  - fontSize
содержит метод, который создает элемент на странице в зависимости от условия: 
- если строка selector начинается с точки, создаем div с классом
- если строка selector  начинается с решетки # то создаем параграф с id
пример:
если передана строка '.block', то функция конструктор создает элемент с class="block"
если передана строка '#best', то функция конструктор создает элемент с id =best"

с помощью cssText задавать стили: 
  - высотой - height,
  - шириной - width, 
  - background - bg
  - размер текста fontSize 
внутрь созданного блока записывать любой текст. Метод записи может быть любым.
2) Создать новый объект на основе класса DomElement
3) Вызвать его метод чтобы получить элемент на странице

*/

 
// создаём класс и прописываем для него свойства
function DomElement (selector, height, width, bg, fontSize) {
   this.selector =  selector;
   this.height =  height;
   this.width =  width;
   this.bg =  bg;
   this.fontSize = fontSize;
}
DomElement.prototype.items = function() {
   let body = document.querySelector('body');
   let item;
   //создает элемент на странице в зависимости от условия
   if (this.selector[0] === '.') {
      item = document.createElement('div');
      item.className = this.selector.slice(1);
   } else if (this.selector[0] === '#') {
      item = document.createElement('p');
      item.id = this.selector.slice(1);
   }
   //с помощью cssText задаём стили
   item.style.cssText = `height: ${this.height}px;
      width: ${this.width}px;
      background: ${this.bg};
      font-size: ${this.fontSize}px;`;

      body.append(item);
      // console.log('item: ', item);
};

//новый объект на основе класса DomElement
let newDivItem = new DomElement('.block', 150, 300, 'red', 14);
   newDivItem.circle = 'green';
   console.log(newDivItem);
//  Вызов элемент на странице
   newDivItem.items();