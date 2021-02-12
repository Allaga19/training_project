'use strict';
 // Урок 9
 /*
 Задание по проекту, получить каждый элемент в отдельную переменную:
Кнопку "Рассчитать" через id
Кнопки “+” (плюс) через Tag, каждую в своей переменной. 
Чекбокс по id через querySelector
Поля для ввода возможных доходов (additional_income-item) при помощи querySelectorAll
Каждый элемент в правой части программы через класс(не через querySelector), 
которые имеют в имени класса "-value", начиная с class="budget_day-value" и заканчивая class="target_month-value">
Оставшиеся поля через querySelector каждый в отдельную переменную:
поля ввода (input) с левой стороны и не забудьте про range.
*/
const btnStart = document.getElementById('start');
console.log(btnStart);

const addButton = document.getElementsByTagName('button')[0];
console.log(addButton);
const adButton = document.getElementsByTagName('button')[1];
console.log(adButton);

const depositCheck = document.querySelector('#deposit-check');
console.log(depositCheck);

const additionalIncomeItem = document.querySelectorAll('.additional_income-item');
console.log(additionalIncomeItem);
// Каждый элемент в правой части программы через класс, которые имеют в имени класса "-value", 
// начиная с class="budget_day-value" и заканчивая class="target_month-value">
const budgetMonthValue = document.getElementsByClassName('budget_month-value');
console.log('budgetMonthValue');
const budgetDayValue = document.getElementsByClassName('budget_day-value');
console.log('budgetDayValue');
const expensesMonthValue = document.getElementsByClassName('expenses_month-value');
console.log('expensesMonthValue');
const additionalIncomeValue = document.getElementsByClassName('additional_income-value');
console.log('additionalIncomeValue');
const additionalExpensesValue = document.getElementsByClassName('additional_expenses-value');
console.log('additionalExpensesValue');
const incomePeriodValue = document.getElementsByClassName('income_period-value');
console.log('incomePeriodValue');
const targetMonthValue = document.getElementsByClassName('target_month-value');
console.log('targetMonthValue');
// range
const periodSelect = document.querySelector('.period-select'); 
console.log('periodSelect');
// inputs
const salaryAmount = document.querySelector('.salary-amount');
console.log('salaryAmount');
const incomeItems = document.querySelector('.income-items');
console.log('incomeItems');
const incomeAmount = document.querySelector('.income-amount');
console.log('incomeAmount');
const expensesTitle = document.querySelector('.expenses-title');
console.log('expensesTitle');
const expensesAmount = document.querySelector('.expenses-amount');
console.log('expensesAmount');
const additionalExpensesItem = document.querySelector('.additional_expenses-item');
console.log('additionalExpensesItem');
const depositAmount = document.querySelector('.deposit-amount');
console.log('depositAmount');
const depositPercent = document.querySelector('.deposit-percent');
console.log('depositPercent');
const targetAmount = document.querySelector('.target-amount');
console.log('targetAmount');

