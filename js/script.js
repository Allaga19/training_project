'use strict';
// Спрашиваем у пользователя месяный доход.
//  Создаём переменную money используя функцию prompt, которая отображаем вопрос в модальном окне. Так как окно запроса возвращает пользовательский ввод как строку, то надо привести строки к числам, для этого перед prompt ставим оператор + 
let money = +prompt('Ваш месячный доход?', 50000);
// Статья дохода
let income = 'фриланс';

// Возможные расходы. Создаём переменную addExpenses и с помощью функции prompt отображаем код в модальном окне с текстом, полем для ввода текста и кнопками OK и Отмена.
let addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
'коммуналка, продукты, интернет');

// Узнаём, есть ли депозит в банке. Создаем переменную deposit и используем функцию confirm, которая отображаем модальное окно с текстом вопроса и двумя копками: ОК и Отмена.
let deposit = confirm('Есть ли у вас депозит в банке?');
// Желаемая сумма накопления 
let mission = 1000000;
// Период накопления суммы
let period = 12;
// Обязательные статьи рассходов за месяц
let expenses1 = prompt('Введите обязательную статью расходов', 'коммуналка');
let amount1 = +prompt('Во сколько это обойдется?', 6000);
let expenses2 = prompt('Введите обязательную статью расходов', 'продукты, интернет');
let amount2 = +prompt('Во сколько это обойдется?', 15000);

// Задание к уроку 4

//1) Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц
// Для функци getExpensesMonth, пишем условие: если amount1 undefined(!), то amount1 присваиваем 0, с amount2 анологично. Выодим результат (return)
const getExpensesMonth = () => {
    if (!amount1) { amount1 = 0; }
    if (!amount2) { amount2 = 0; }
    return amount1 + amount2;
};

//2) Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
const getAccumulatedMonth = (moneyMonth, expensesMonth) => {
   if (!moneyMonth) { moneyMonth = 0; }
   return moneyMonth - expensesMonth;
};
getAccumulatedMonth();

//3) Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth 
const accumulatedMonth = getAccumulatedMonth(money, getExpensesMonth());

console.log('Накопления за месяц: ', accumulatedMonth);
// getAccumulatedMonth();

//4) Объявить функцию getTargetMonth. Подсчитывает за какой период будет достигнута цель, зная результат месячного накопления (accumulatedMonth) и возвращает результат
const getTargetMonth = (mission, accumulatedMonth) => {
   return Math.ceil(mission / accumulatedMonth);
};

//6) budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
const budgetDay = accumulatedMonth / 30;


//7) Почистить консоль логи и добавить недостающие, должны остаться:
// - вызовы функции showTypeOf
const showTypeOf = (data) => {
    console.log(data, typeof (data));
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);

//  - Расходы за месяц вызов getExpensesMonth
console.log('Обязательные расходы за месяц: ', getExpensesMonth());
//  - Вывод возможных расходов в виде массива (addExpenses),Для вывода используем метод toLocaleLowerCase(), который озвращает значение строки, преобразованное в нижний регистр согласно правилам преобразования регистра локали. И используем метод split(', '), разбивает строку на массив .
console.log(addExpenses.toLocaleLowerCase().split(', '));
//  - Cрок достижения цели в месяцах (результат вызова функции getTargetMonth) 
console.log(`Цель будет достигнута за: ${getTargetMonth(mission, accumulatedMonth)} месяцев`);
//  - Бюджет на день (budgetDay)
console.log('Бюджет на день: ', Math.floor(budgetDay));

//  - вызов функции getStatusIncome

const getStatusIncome = (budget) => {
   return isNaN(budget) ? 'Где-то закралась ошибка...' :
       (budget < 0) ? 'Что то пошло не так' :
       (budget < 600) ? 'Что то пошло не так' :
       (budget === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
       (budget < 1200) ? 'У вас средний уровень дохода' :
       (budget === 1200) ? 'У вас почти высокий уровень дохода! Постарайтесь лучше!' :
       'У вас высокий уровень дохода';
};
console.log(getStatusIncome(budgetDay));


