'use strict';
/*
Часть первая:
1) Привести наш проект в соответствии с новым стандартом.
2) Переделать наш проект под класс с помощью ключевого слова Class и Constuctor()
3) Переменные, существующие только с неизменяемым параметром, объявить через const.
*/
const start = document.getElementById('start'),  // кнопка "рассчитать"
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
    expensesTitle = document.querySelector('.expenses-title'),
    
    additionalExpensesItem = document.querySelector('.additional_expenses-item'),
   //  depositAmount = document.querySelector('.deposit-amount'),
   //  depositPercent = document.querySelector('.deposit-percent'),
    targetAmount = document.querySelector('.target-amount'),
    periodSelect = document.querySelector('.period-select'),
    periodAmount = document.querySelector('.period-amount'),   // период расчета
    buttonCancel = document.querySelector('#cancel');  

let incomeItems = document.querySelectorAll('.income-items'),  // дополнительные доходы
   expensesItems = document.querySelectorAll('.expenses-items');   // обязательные расходы
// проверка на тип "число"
const isNumber = (n) => !isNaN(parseFloat(n)) && isFinite(n);

class AppData {
   constructor() {
      this.income = {};             // дополнительный доход - объект
      this.incomeMonth = 0; 
      this.addIncome = [];          // перечисление дополнительных доходов - массив
      this.expenses = {};           // дополнительные расходы 
      this.addExpenses = [];        // возможные расходы
      this.deposit = false;         // накопления в банке
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
      this.budget = 0;         // доход за месяц
      this.budgetDay = 0;           // дневной бюджет (доход за месяц / 30)
      this.budgetMonth = 0;
      this.expensesMonth = 0;
   }
   start() {
      if (salaryAmount.value !== '') {
         this.budget = salaryAmount.value;  // месячный доход
      }
         this.getExpInc();
         this.getAddExpenIncom();

         this.getIncomeMonth();
         this.getExpensesMonth();
         this.getBudget();

         this.showResult();
      // кнопки расчитаь, сбросить
         start.style.display = "none";
         buttonCancel.style.display = "block";
         // блокировка инпутов
         const inputs = document.querySelectorAll('.data input[type=text]');
         inputs.forEach(function(item) {
            item.setAttribute('disabled', true);
      });
      // кнопки +
      incomePlus.setAttribute('disabled', true);
      expensesPlus.setAttribute('disabled', true);
      start.style.display = "none";
      buttonCancel.style.display = "block";
   }
// сброс
   reset () { 
      this.income = {};             
      this.incomeMonth = 0; 
      this.addIncome = [];         
      this.expenses = {};           
      this.addExpenses = [];        
      this.deposit = false;        
      this.percentDeposit = 0;
      this.moneyDeposit = 0;
      this.budget = 0;        
      this.budgetDay = 0;           
      this.budgetMonth = 0;
      this.expensesMonth = 0;

      let items = document.querySelectorAll('input');
      items.forEach((item) => {
         item.value = '';
         item.disabled = false;
      });
      periodSelect.value = 1;
      periodAmount.innerText = '1';

      if (incomeItems.length === 3) {
         incomePlus.style.display = 'block';
      }
      for (let i = 1; i < incomeItems.length; i++) {
         incomeItems[i].remove();
      }
      incomeItems = document.querySelectorAll('.income-items');
      if (expensesItems.length === 3) {
         expensesPlus.style.display = 'block';
      }
      for (let i = 1; i < expensesItems.length; i++) {
         expensesItems[i].remove();
      }
      expensesItems = document.querySelectorAll('.expenses-items');
      // кнопки расчитаь, сбросить
      start.style.display = "block";
      buttonCancel.style.display = "none";
   }

// метод showResult выводит в правую колонку результаты вычесления
   showResult() {
      const _this = this;
         budgetMonthValue.value = this.budgetMonth;
         budgetDayValue.value = this.budgetDay;
         expensesMonthValue.value = this.expensesMonth;
         additionalExpensesValue.value = this.addExpenses.join(', '); 
         additionalIncomeValue.value = this.addIncome.join(', ');
         targetMonthValue.value = Math.ceil(this.getTargetMonth());  // округляем значение в большую сторону
         incomePeriodValue.value = this.calcPeriod();

         periodSelect.addEventListener('input', function () {
         incomePeriodValue.value = _this.calcPeriod();
      });
   }
// расчёт накопления за период
// общая функция для замены getIncome() и getExpenses()
   getExpInc() {
      const count = (item) => {
         const startStr = item.className.split('-')[0];
         // создаём переменные itemTitle и itemAmount, получаем их значение
         const itemTitle = item.querySelector(`.${startStr}-title`).value;
         const itemAmount = item.querySelector(`.${startStr}-amount`).value;
         // проверка на пустоту
         if (itemTitle !== '' && itemAmount !== '') {
            this[startStr][itemTitle] = itemAmount;
         }
      };

      incomeItems = document.querySelectorAll('.income-items');
      expensesItems = document.querySelectorAll('.expenses-items');

      // метод перебора forEach, который запускает функцию count
      incomeItems.forEach(count);
      expensesItems.forEach(count);
   }
   getIncomeMonth() {
      for (const key in this.income) {
      this.incomeMonth += +this.income[key];
      }
   }
//общая функция для замены getAddExpenses и getAddIncome
   getAddExpenIncom() {
      this.addIncome = []; 
      additionalIncomeItem.forEach( (item) => {
         let itemValue = item.value.trim();
         if (itemValue !== '') {
            this.addIncome.push(itemValue);
         }
      });
      this.addExpenses = [];
      let addExpenses = additionalExpensesItem.value.split(',');
      const _this = this;
   // перебераем массив и каждый элемент проверяем на пустоту 
      addExpenses.forEach((item) => {
      // если item не равен пустой строке 
         if (item !== ''){
            item = item.trim(); //убираем пробелы в начале и в конце
         // то мы его будем добавлять в appData.addExpenses с помощъю метода push 
         // и надо показать что добавлять будем item 
            this.addExpenses.push(item);
         }
      });
   }
   // блок с обязательным расходом добавление дополнительных полей
   addExpensesBlock() { 
      const cloneExpensesItem = expensesItems[0].cloneNode(true);
      const cloneExpensesItemInput = cloneExpensesItem.querySelectorAll('input');
      cloneExpensesItemInput.forEach(function (item) {
         item.value = '';
         if (item.classList[1] === 'input--amount') {
         item.addEventListener('input', function (e) {
            item.value = item.value.replace(/[^\d.]/g, '');
         });
            } else if (item.classList[1] === 'input--text') {
               item.addEventListener('input', function (e) {
                  item.value = item.value.replace(/[^А-Яа-яЁё\s ,]/, '');
            });
         }
      });
      expensesItems[0].parentNode.insertBefore(cloneExpensesItem, expensesPlus);
      expensesItems = document.querySelectorAll('.expenses-items');
      if (expensesItems.length === 3) {   // ограничение полей
         expensesPlus.style.display = 'none';  // удаление кнопки
      }
   }
   //блок с дополнительным доходом
   addIncomeBlock() {
      const cloneIncomeItem = incomeItems[0].cloneNode(true);
      const cloneIncomeItemInput = cloneIncomeItem.querySelectorAll('input');
         cloneIncomeItemInput.forEach(function (item) {
         item.value = '';

      if (item.classList[1] === 'input--amount') {
      item.addEventListener('input', function (e) {
         item.value = item.value.replace(/[^\d.]/g, '');
      });
      } else if (item.classList[1] === 'input--text') {
         item.addEventListener('input', function (e) {
            item.value = item.value.replace(/[^А-Яа-яЁё\s ,]/, '');
         });
         }
      });
      incomeItems[0].parentNode.insertBefore(cloneIncomeItem, incomePlus);
      incomeItems = document.querySelectorAll('.income-items');
      if (incomeItems.length === 3) {
         incomePlus.style.display = 'none';
      }
   }

   // Получить расходы за месяц
   getExpensesMonth() {   // Функция возвращает сумму всех обязательных расходов за месяц
      for(const key in this.expenses){
         this.expensesMonth += +this.expenses[key];  
      }
   }
   getBudget() { // Функция возвращает Накопления за месяц (Доходы минус расходы)
      this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.ceil(this.budgetMonth / 30);
   }
   // период достижения цели
   getTargetMonth() { // Подсчитывает за какой период будет достигнута цель
      return targetAmount.value / this.budgetMonth;
   }
   getStatusIncome() {
      if (this.budgetDay >= 800) {
         return (' Высокий уровень дохода');
      } else if (this.budgetDay >= 300 && this.budgetDay < 800) {
         return (' Средний уровень дохода');
      } else if (this.budgetDay >= 0 && this.budgetDay < 300) {
         return (' Низкий уровень дохода');
      } else if(this.budgetDay < 0) {
         return (' Что то пошло не так!');
      }
   }
   // reset возвращает форму к своему первоначальному состоянию

   getInfoDeposit(){
      if (this.deposit) {
         do {
           this.percentDeposit = prompt('Какой годовой процент?', 10);
         } while (!isNumber(this.percentDeposit));
         do {
           this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
         } while (!isNumber(this.moneyDeposit));
       }
   }
// метод, который считает сколько заработаем за период
   calcPeriod(){
      return this.budgetMonth * periodSelect.value;
   }
   // Число под полоской (input type range) меняем в зависимости от позиции range
   changePeriodAmount() {
      periodAmount.textContent = periodSelect.value;
   }
   // заканчивается объект appData

   eventsListener() {
      start.disabled = true;
   // 
      salaryAmount.addEventListener('input', function () {
         if (salaryAmount.value === null && salaryAmount.value === '') {
            start.disabled = true;
         } else {
            start.disabled = false;
         }
      });

// вызов функции start по нажатии на кнопку 'расчитать'
   start.addEventListener('click', this.start.bind(this));
   expensesPlus.addEventListener('click', this.addExpensesBlock);
   buttonCancel.addEventListener('click', this.reset.bind(this));
   incomePlus.addEventListener('click', this.addIncomeBlock);
   periodSelect.addEventListener('input', this.changePeriodAmount);

   }
}
const appData = new AppData();
appData.eventsListener();
