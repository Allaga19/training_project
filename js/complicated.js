"use strict";

//1) Создать переменную num со значением 266219 (тип данных число)

let num = '266219';

// 2) Вывести в консоль произведение (умножение) цифр этого числа
let arrmNum = num.toString().split('');

console.log(arrmNum);

let result = (arrmNum[0]*arrmNum[1]*arrmNum[2]*arrmNum[3]*arrmNum[4]*arrmNum[5]);

console.log(result);

//3) Полученный результат возвести в степень 3, используя только 1 оператор (Math.pow не подходит)
let resultDegree = result ** 3;

console.log(resultDegree);

//4) Вывести на экран первые 2 цифры полученного числа 
console.log(String(resultDegree).slice(0,2));