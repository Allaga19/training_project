'use strict';

// функция для условия проверки входящих данных
//функция принмает число n и возвращать true или false
// восклецательный знак для того чтобы, если это будет число, то функция вернёт true 
// если это будет строка или чтото другое кроме числа, то вернётся false
//чтобы проверить число на isNaN 
// предворительно перед тем как проверить на isNaN 
// конвертируем строку с помощью метода parseFload
// ещё добавим функцию isFinite возвращает true или false, если 
//число конечное (неявляется бесконечным) то возвращается true 
// если оно бесконечное то возвращается false 
let isNumber = function(n) {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

// Спрашиваем у пользователя месяный доход.
let money; // money только объявляем,а в низу пишем функцию start
// Статья дохода
let income = 'фриланс';
// Возможные расходы.
let addExpenses = prompt('Перечислите возможные расходы через запятую');
// Узнаём, есть ли депозит в банке.
let deposit = confirm('Есть ли у вас депозит в банке?');
// Желаемая сумма накопления 
let mission = 1000000;
// Период накопления суммы
let period = 12;

// Проверка входящих данных
// функция start спрашивает ваш месячный доход
// проверять какие данные пришли будем с помощью цикла  do while 
// пишем ключевое слово do после этого ставим фигурные скобки и записываем команду
// котторая должна выполняться а после этого пишем слово while() и в скобках записываем условия
let start = function() {
   // 1) Переписать функцию start циклом do while
   do {
      money = prompt('Ваш месячный доход?');
   } while (!isNumber(money));
   console.log(money);
};
start();

// - вызовы функции showTypeOf
let showTypeOf = function(item){
   console.log(typeof item);
};

showTypeOf(money);
showTypeOf(income);
showTypeOf(deposit);


// Обязательные статьи рассходов за месяц
let expenses = [];

   console.log(addExpenses.toLocaleLowerCase().split(', '));

//1) Объявить функцию getExpensesMonth. Функция возвращает сумму всех обязательных расходов за месяц
// Задаём переменную sum, которая равна 0 и эту сумму мы и будем возвращать(return)
let getExpensesMonth = function(){
   let sum = 0;
   // с помощью цикла задаём вопросы во сколько обойдутся расходы
   // и суммировать результат
   //зададим цикл for
   for (let i = 0; i < 2; i++) {
      //создаём массив
      expenses[i] = prompt('Введите обязательную статью расходов');
      // с помощью переменной спрашиваем у пользователя во сколько это обойдётся
      // sum += +prompt('Во сколько это обойдется?');
// 2) Добавить проверку что введённые данные являются числом, 
//которые мы получаем на вопрос 'Во сколько это обойдется?’ в функции  getExpensesMonth
      do {
         sum += +prompt('Во сколько это обойдется?');
      } while (!isNumber(sum)); //с помощью фкнкции !isNumber проверяем, что введённые данные являются числом
   }
   console.log(expenses);
   return sum;
};

let expensesAmount = getExpensesMonth();

console.log(' Расходы за месяц: ' + expensesAmount);

//Объявить функцию getAccumulatedMonth. Функция возвращает Накопления за месяц (Доходы минус расходы)
let getAccumulatedMonth = function(){
   return money - expensesAmount;
};

// Объявить переменную accumulatedMonth и присвоить ей результат вызова функции getAccumulatedMonth 
let accumulatedMonth = getAccumulatedMonth();

console.log('Накопления за месяц: ', accumulatedMonth);
getAccumulatedMonth();

//3) Если getTargetMonth возвращает нам отрицательное значение, 
// то вместо “Цель будет достигнута” необходимо выводить “Цель не будет достигнута”

function getTargetMonth(mission, accumulatedMonth) {
   let targetMonth = Math.ceil(mission / accumulatedMonth);
   
   if (targetMonth > 0) {
      console.log('Цель будет достигнута');
   } else if (targetMonth < 0){
      console.log('Цель не будет достигнута');
   }
   return targetMonth;
} 
getTargetMonth(mission, accumulatedMonth);

//6) budgetDay высчитываем исходя из значения месячного накопления (accumulatedMonth)
let budgetDay = accumulatedMonth / 30;
//  - Расходы за месяц вызов getExpensesMonth
console.log('Обязательные расходы за месяц: ', getExpensesMonth());

//  - Бюджет на день (budgetDay)
console.log('Бюджет на день: ' + Math.floor(budgetDay));

// 6) Вычислить бюджет на месяц
let budgetMonth = (money -(expensesAmount));
console.log(' Бюджет за месяц: ' + budgetMonth);
 
//  - Cрок достижения цели в месяцах (результат вызова функции getTargetMonth)
let periodMission = getTargetMonth(mission, accumulatedMonth);
console.log('Цель будет достигнута за' + periodMission + 'месяцев');

//  - вызов функции getStatusIncome

let getStatusIncome = (budget) => {
   return isNaN(budget) ? 'Где-то закралась ошибка...' :
       (budget < 0) ? 'Что то пошло не так' :
       (budget < 600) ? 'Что то пошло не так' :
       (budget === 600) ? 'У вас почти средний уровень дохода, но немного не хватает...' :
       (budget < 1200) ? 'У вас средний уровень дохода' :
       (budget === 1200) ? 'У вас почти высокий уровень дохода! Постарайтесь лучше!' :
       'У вас высокий уровень дохода';
};
console.log(getStatusIncome(budgetDay));
