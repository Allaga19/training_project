'use strict';
/*
Это задание относится к нашему приложению "Budget". 
1)  Переписать наше приложение в ООП стиле, создать Класс (в старом формате использовать es6 не нужно)
2) Создать новый метод в классе, например eventsListeners.
3) Перенести все действия, которые остались за классом внутрь него.
*/
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
    periodAmount = document.querySelector('.period-amount'),   // период расчета
    buttonCancel = document.querySelector('#cancel');  

// проверка на тип "число"
let isNumber = (n) => {
   return !isNaN(parseFloat(n)) && isFinite(n);
};

const AppData = function() {
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
};
AppData.prototype.start = function() {
   if (salaryAmount.value !== '') {
      this.budget = salaryAmount.value;  // месячный доход
      this.getExpenses();
      this.getIncome();
      this.getIncomeMonth();
      this.getExpensesMonth();
      this.getAddExpenses();
      this.getAddIncome();
      this.getBudget();

      this.showResult();
      // блокировка инпутов
      let inputs = document.querySelectorAll('.data input[type=text]');
         inputs.forEach(function (item) {
      if (item.className !== 'period-select') {
         item.disabled = true;
      }
   });
   // кнопки расчитаь, сбросить
      start.style.display = "none";
      buttonCancel.style.display = "block";
   }
};
// reset возвращает форму к своему первоначальному состоянию
AppData.prototype.reset = function () { 
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
   items.forEach(function (item) {
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
};
// метод showResult выводит в правую колонку результаты вычесления
AppData.prototype.showResult = function () {
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
};
// дополнительных доходов
AppData.prototype.getIncome = function () {
   const _this = this;
   incomeItems.forEach(function (item) {
      let itemIncome = item.querySelector('.income-title').value;
      let cashIncome = item.querySelector('.income-amount').value;
      if (itemIncome !== '' && cashIncome !== '') {
         _this.income[itemIncome] = cashIncome;
      }
   });
};
AppData.prototype.getAddIncome = function () {
   const _this = this;
   additionalIncomeItem.forEach(function (item) {
      let itemValue = item.value.trim();
      if (itemValue !== '') {
         _this.addIncome.push(itemValue);
      }
   });
};
//блок с дополнительным доходом
AppData.prototype.addIncomeBlock = function() {
   let cloneIncomeItem = incomeItems[0].cloneNode(true);
   let cloneIncomeItemInput = cloneIncomeItem.querySelectorAll('input');
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
};
AppData.prototype.getIncomeMonth = function () {
   for (let key in this.income) {
     this.incomeMonth += +this.income[key];
   }
};
// получаем все расходы и записываем их в объект
// создаём новый метод getExpenses
AppData.prototype.getExpenses = function() {
   const _this = this;
// перебераем все объекты с помощью forEach все элементы с классом expensesItems
   expensesItems.forEach(function (item) {
   let itemExpenses = item.querySelector('.expenses-title').value;
   let cashExpenses = item.querySelector('.expenses-amount').value;
      if (itemExpenses !== '' && cashExpenses !== '') {
      _this.expenses[itemExpenses] = cashExpenses;
      }
   });
};
// Возможные расходы
AppData.prototype.getAddExpenses = function() {
// задаём переменную addExpenses и она будет получать из additionalExpensesItem(инпут -возмжные расходы) 
//делаем из него массив
let addExpenses = additionalExpensesItem.value.split(',');
const _this = this;
// перебераем массив и каждый элемент проверяем на пустоту 
   addExpenses.forEach(function(item){
   // если item не равен пустой строке 
      if (item !== ''){
         item = item.trim(); //убираем пробелы в начале и в конце
      // то мы его будем добавлять в appData.addExpenses с помощъю метода push 
      // и надо показать что добавлять будем item 
         _this.addExpenses.push(item);
      }
   });
};
// блок с обязательным расходом добавление дополнительных полей
AppData.prototype.addExpensesBlock = function() { 
   let cloneExpensesItem = expensesItems[0].cloneNode(true);
   let cloneExpensesItemInput = cloneExpensesItem.querySelectorAll('input');
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
};
// Получить расходы за месяц
AppData.prototype.getExpensesMonth = function() {   // Функция возвращает сумму всех обязательных расходов за месяц
for(let key in this.expenses){
   this.expensesMonth += +this.expenses[key];  
}
};
AppData.prototype.getBudget = function() { // Функция возвращает Накопления за месяц (Доходы минус расходы)
   this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
   this.budgetDay = Math.ceil(this.budgetMonth / 30);
};
// период достижения цели
AppData.prototype.getTargetMonth = function() { // Подсчитывает за какой период будет достигнута цель
   return targetAmount.value / this.budgetMonth;
};
AppData.prototype.getStatusIncome = function() {
   if (this.budgetDay >= 800) {
      return (' Высокий уровень дохода');
   } else if (this.budgetDay >= 300 && this.budgetDay < 800) {
      return (' Средний уровень дохода');
   } else if (this.budgetDay >= 0 && this.budgetDay < 300) {
      return (' Низкий уровень дохода');
   } else if(this.budgetDay < 0) {
      return (' Что то пошло не так!');
   }
};
AppData.prototype.getInfoDeposit = function(){
   if(this.deposit){
      let n = 0;
      do {
          n = prompt('Какой годовой процент?', '10');
      } while (!isNumber(n) && n > 0);
      this.precentDeposit = +n;
      do {
         this.moneyDeposit = prompt('Какая сумма заложена?', 10000);
      } while (!isNumber(n) && n > 0);
      this.moneyDeposit = +n;
   }
};
// метод, который считает сколько заработаем за период
AppData.prototype.calcPeriod = function(){
   return this.budgetMonth * periodSelect.value;
};
// Число под полоской (input type range) меняем в зависимости от позиции range
AppData.prototype.changePeriodAmount = function () {
   periodAmount.textContent = periodSelect.value;
};
// заканчивается объект appData

AppData.prototype.eventsListener = function() {
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

};
const appData = new AppData();
appData.eventsListener();
