"use strict";

/*ОБЯЗАТЕЛЬНОЕ ЗАДАНИЕ: 
1) Сделать проверку при получении данных:
   - наименование дополнительного источника заработка
   - сумма дополнительного заработка
   - ввод статьи обязательных расходов
   - годовой процент депозита
   - сумма депозита
Что значит проверка данных: где должен быть текст там только текст(голые цифры не должно пропускать,
 а текст с цифрами - должно.
 Пример: "Купил ВАЗ 2108" - ок, "4567989" - нет), где цифры только цифры! 
Если проверку не прошло, то переспрашивать!
2) Возможные расходы (addExpenses) вывести строкой в консоль каждое слово с 
большой буквы слова разделены запятой и пробелом
Пример (Интернет, Такси, Коммунальные расходы)
*/

let isNumber = (n) => {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

// правило для строки
let isString = (str, comma = false) => {
   let pattern = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
   return pattern.test(str);
};


let money,
   start = function() {// Проверка входящих данных
      do {
         money = prompt('Ваш месячный доход?');
      }
      while (isNaN(money) || money === '' || money === null);
   };
start();

let appData = {
   income: {},             // дополнительный доход - объект 
   addIncome: [],          // перечисление дополнительных доходов - массив
   expenses: {},           // дополнительные расходы 
   addExpenses: [],        // возможные расходы
   deposit: false,         // накопления в банке
   percentDeposit: 0,
   moneyDeposit: 0,
   mission: 50000,         // вводит пользователь (Какую сумму хочет накопить)
   period: 3,              // вводит пользователь
   budget: +money,         // доход за месяц
   budgetDay: 0,           // дневной бюджет (доход за месяц / 30)
   budgetMonth: 0,
   expensesMonth: 0,
   asking: function() {    // вопросы к пользователю

      if(confirm('Есть ли у вас дополнительный источник зараборка?')){

         let itemIncome = '';
         do {
             itemIncome = prompt('Какой у вас дополнительный заработок?', 'Таксую');
         } while (!isString(itemIncome));
         
         let cashIncome = 0;
            do {
               cashIncome = prompt('Сколько в месяц Вы на этом зарабатываете?', 15000);
            } while (!isNumber(cashIncome));
            
         appData.income[itemIncome] = cashIncome;
      }

      let addExpenses = '';
      do {
          addExpenses = prompt('Перечислите возможные расходы за рассчитываемый период через запятую',
              'интернет, такси, коммуналка');
      } while (!isString(addExpenses, true));

         appData.addExpenses = addExpenses.toLowerCase().split(', ');
         appData.deposit = confirm('Есть ли у вас депозит в банке?'); 
         
      for(let i = 0; i < 2; i++){
         let str = '';
         do {
             str = prompt('Введите обязательную статью расходов?');
         } while (!isString(str));
         appData.expenses[str] = (function(){
             let n = 0;
             do {
                 n = prompt('Во сколько это обойдется?');
             } while (!isNumber(n));
             return +n;
         })();
          console.log(appData.expenses);
      }
   },
   getExpensesMonth: function() {   // Функция возвращает сумму всех обязательных расходов за месяц
      for(let key in appData.expenses){
         appData.expensesMonth += appData.expenses[key];  
      }
   },
   getAccumulatedMonth: function(){
      return appData.money - appData.expensesMonth;
   },
   getBudget: function() { // Функция возвращает Накопления за месяц (Доходы минус расходы)
      appData.budgetMonth = appData.budget - appData.expensesMonth;
      appData.budgetDay = Math.floor(appData.budgetMonth / 30);
  },
   getTargetMonth: function() { // Подсчитывает за какой период будет достигнута цель
      return appData.mission / appData.budgetMonth;
   },
   getStatusIncome: function() {
      if (appData.budgetDay > 800) {
         return (' Высокий уровень дохода');
      } else if (appData.budgetDay > 300) {
         return (' Средний уровень дохода');
      } else if (appData.budgetDay > 0) {
         return (' Низкий уровень дохода');
      } else {
         return (' Что то пошло не так!');
      }
   },
   getInfoDeposit: function(){
      if(appData.deposit){
         let n = 0;
         do {
             n = prompt('Какой годовой процент?', '10');
         } while (!isNumber(n) && n > 0);
         appData.precentDeposit = +n;
         do {
             appData.moneyDeposit = prompt('Какая сумма заложена?', 10000);
         } while (!isNumber(n) && n > 0);
         appData.moneyDeposit = +n;
      }
   },
   // метод, который считает сколько заработаем за период
   calcSavedMoney: function(){
      return appData.budgetMonth * appData.period;
   }
};

appData.asking();
appData.getExpensesMonth();
appData.getBudget();

console.log('Расходы за месяц: ' + appData.expensesMonth);
console.log('Уровень дохода: ' + appData.getStatusIncome());

if (appData.getTargetMonth() > 0) {
   console.log('Цель будет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
   } else {
      console.log('Цель не будет достигнута');
   }

console.log(appData.getStatusIncome());

for (let key in appData) {
   console.log(' Наша программа включает в себя данные: ' + key + '-' + appData[key]);
}

// Перебираем массив и делаем первую букву в слове заглавной 
    
let arr = appData.addExpenses.map(function(item){
   return item[0].toUpperCase() + item.slice(1).toLowerCase();
});
console.log(arr.join(', '));
  
appData.getInfoDeposit();
console.log( appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());