'use strict';
let start = document.getElementById('start'),  // кнопка "рассчитать"
    incomePlus = document.getElementsByTagName('button')[0],
    expensesPlus = document.getElementsByTagName('button')[1],   
    depositCheck = document.querySelector('#deposit-check'),     //чекбокс "депозит"
    additionalIncomeItem = document.querySelectorAll('.additional_income-item'),  // возможный доход

    budgetMonthValue = document.getElementsByClassName('budget_month-value')[0],   //бюджет на месяц
    budgetDayValue = document.getElementsByClassName('budget_day-value')[0],  //бюджет на день
    expensesMonthValue = document.getElementsByClassName('expenses_month-value')[0],  //сумма расходов за месяц
    additionalIncomeValue = document.getElementsByClassName('additional_income-value')[0],  //возможные доходы
    additionalExpensesValue = document.getElementsByClassName('additional_expenses-value')[0],  //возможный расходы
    incomePeriodValue = document.getElementsByClassName('income_period-value')[0], //накопления за период
    targetMonthValue = document.getElementsByClassName('target_month-value')[0],  //срок достижения цели

    salaryAmount = document.querySelector('.salary-amount'),
    incomeTitle = document.querySelector('.income-title'),
   //  incomeAmount = document.querySelector('.income-amount'),
    expensesTitle = document.querySelector('.expenses-title'),
    expensesItems = document.querySelectorAll('.expenses-items'),   // обязательные расходы
    incomeItems = document.querySelectorAll('.income-items'),  // дополнительные доходы
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
   //  depositAmount = document.querySelector('.deposit-amount'),
   //  depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount');   // период расчета


let isNumber = (n) => {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

// правило для строки
let isString = (str, comma = false) => {
   let pattern = comma ? /^[, а-яА-ЯёЁa-zA-Z]+$/ : /^[ а-яА-ЯёЁa-zA-Z]+$/;
   return pattern.test(str);
};

let appData = {
   income: {},             // дополнительный доход - объект
   incomeMonth: 0, 
   addIncome: [],          // перечисление дополнительных доходов - массив
   expenses: {},           // дополнительные расходы 
   addExpenses: [],        // возможные расходы
   deposit: false,         // накопления в банке
   percentDeposit: 0,
   moneyDeposit: 0,
   budget: 0,         // доход за месяц
   budgetDay: 0,           // дневной бюджет (доход за месяц / 30)
   budgetMonth: 0,
   expensesMonth: 0,
   start: function() {
      //условия для месячного дохода
      if(salaryAmount.value === ''){  // если строка пустая
         alert('Ошибка, поле "месячный доход" должно быть заполнено!');
         return;
      }
      appData.budget = +salaryAmount.value;
      
      // вызов функции start
      appData.getExpenses();
      appData.getIncome();
      // appData.getIncomeMonth();
      appData.getExpensesMonth();
      appData.getAddExpenses();
      appData.getAddIncome();
      appData.getBudget();

      appData.showResult();
   },
   // метод showResult выводит в правую колонку результаты вычесления
   showResult: function () {
      budgetMonthValue.value = appData.budgetMonth;
      budgetDayValue.value = appData.budgetDay;
      expensesMonthValue.value = appData.expensesMonth;
      additionalExpensesValue.value = appData.addExpenses.join(', '); 
      additionalIncomeValue.value = appData.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(appData.getTargetMonth());  // округляем значение в большую сторону
      incomePeriodValue.value = appData.calcPeriod();
      periodSelect.addEventListener('input', function () {
        incomePeriodValue.value = appData.calcPeriod();
      });
    },
    //блок с дополнительным доходом
   addincomeBlock: function() {
   // let incomeItems = document.querySelector('.income-items');
      let cloneIncomeItem = incomeItems[0].cloneNode(true);
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');
      if(incomeItems.length === 3) {
         incomePlus.style.display = 'none';
      }
   },
   // блок с обязательным расходом
  addExpensesBlock: function() { 
      // каждый раз при вызове функции будем находить все элементы
      // let expensesItems = document.querySelector('.expenses-items');
      //чтобы вставить элемент, надо найти его родителя
      // обратимся к родителю с помощъю свойства parentNode
      // console.log(expensesItems.parentNode);
      // чтобы сделать клон expensesItem, создаём новую переменную 
      //и спомощью cloneNode(),  делаем копию - глубокую т. есть пишем true 
      let cloneExpensesItem = expensesItems[0].cloneNode(true);
      // берём expensesItem. его родителя через parentNode и с помощью метода appendChild() всталяем expensesItem
      // expensesItems.parentNode.appendChild(expensesItems);
      // вместо метода appendChild используем insetBefore
      // вставлять элемент надо перед кнопкой expensesPluse
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      // добавим услови если длина expensesItem равна 3, тогда скроим кнопку
      if(expensesItems.length === 3) {
         expensesPlus.style.display = 'none';
      }
   },
   // получаем все расходы и записываем их в объект
   // создаём новый метод getExpenses
   getExpenses: function() {
      // перебераем все объекты с помощью forEach все элементы с классом expensesItems
      expensesItems.forEach(function (item) {
        let itemExpenses = item.querySelector('.expenses-title').value;
        let cashExpenses = item.querySelector('.expenses-amount').value;
        if (itemExpenses !== '' && cashExpenses !== '') {
          appData.expenses[itemExpenses] = cashExpenses;
        }
      });
   },
   //сумма дополнительных доходов
   getIncome: function () {
      incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
          appData.income[itemIncome] = +cashIncome;
        }
      });
    },
    // Возможные расходы
   getAddExpenses: function() {
      // задаём переменную addExpenses и она будет получать из additionalExpensesItem(input -возмжные расходы) 
      let addExpenses = additionalExpensesItem.value.split(',');
      // перебераем массив и каждый элемент проверяем на пустоту 
      addExpenses.forEach(function(item){
         item = item.trim(); //убираем пробелы в начале и в конце
         // если item не равен пустой строке 
         if (item !== ''){
            // то мы его будем добавлять в appData.addExpenses с помощъю метода push 
            // и надо показать что добавлять будем item 
            appData.addExpenses.push(item);
         }
      });
   },
   getAddIncome: function () {
      additionalIncomeItem.forEach(function (item) {
         let itemValue = item.value.trim();
         if (itemValue !== '') {
            appData.addIncome.push(itemValue);
         }
      });
   },
   // Получить расходы за месяц
   getExpensesMonth: function() {   // Функция возвращает сумму всех обязательных расходов за месяц
      for(let key in appData.expenses){
         appData.expensesMonth += appData.expenses[key];  
      }
   },
   getAccumulatedMonth: function(){
      return appData.money - appData.expensesMonth;
   },
   getBudget: function() { // Функция возвращает Накопления за месяц (Доходы минус расходы)
      appData.budgetMonth = appData.budget +appData.incomeMonth - appData.expensesMonth;
      appData.budgetDay = appData.budgetMonth / 30;
  },
  //срок достижения цели
   getTargetMonth: function() { // Подсчитывает за какой период будет достигнута цель
      return targetAmount.value / appData.budgetMonth;
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
   calcPeriod: function(){
      return appData.budgetMonth * periodSelect.value;
   },
   // Число под полоской (input type range) меняем в зависимости от позиции range
   changePeriodAmount: function () {
      periodAmount.textContent = periodSelect.value;
    }

};    // заканчивается объект appData

// вызов функции start по нажатии на кнопку 'расчитать'
start.addEventListener('click', appData.start);
// обработчик события для кнопки +
// по клику будет вызываться функция из appData.addExpensesBlock
expensesPlus.addEventListener('click', appData.addExpensesBlock);
incomePlus.addEventListener('click', appData.addincomeBlock);
periodSelect.addEventListener('input', appData.changePeriodAmount);
salaryAmount.addEventListener('input', () => start.disabled = salaryAmount.value.trim() === '');

// if (appData.getTargetMonth() > 0) {
//    console.log('Цель будет достигнута за: ' + Math.ceil(appData.getTargetMonth()) + ' месяца');
//    } else {
//       console.log('Цель не будет достигнута');
//    }

// console.log(appData.getStatusIncome());

// for (let key in appData) {
//    console.log(' Наша программа включает в себя данные: ' + key + '-' + appData[key]);
// }

// Перебираем массив и делаем первую букву в слове заглавной 
    
// let arr = appData.addExpenses.map(function(item){
//    return item[0].toUpperCase() + item.slice(1).toLowerCase();
// });
// console.log(arr.join(', '));
  
// appData.getInfoDeposit();
// console.log( appData.percentDeposit, appData.moneyDeposit, appData.calcSavedMoney());
 