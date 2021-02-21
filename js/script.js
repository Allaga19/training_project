'use strict';
/*
1) Привязать контекст вызова функции start к appData 
2) В нашем объекте везде использовать this как ссылку на объект appData (где это возможно)
3) Проверить работу кнопок плюс и input-range (исправить если что-то не работает)
4) Блокировать все input[type=text] с левой стороны после нажатия кнопки рассчитать, 
после этого кнопка Рассчитать пропадает и появляется кнопка Сбросить, на которую 
навешиваем событие и выполнение метода reset
Метод reset должен всю программу возвращать в исходное состояние
Метод reset() пишем самостоятельно, никаких перезагрузок страницы. Метод должен быть расписан наподобие start().
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
      //Запретить нажатие кнопки Рассчитать пока поле Месячный доход пустой
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
   },
   // reset возвращает форму к своему первоначальному состоянию
   reset: function () { 
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

  },
   // метод showResult выводит в правую колонку результаты вычесления
   showResult: function () {
      budgetMonthValue.value = this.budgetMonth;
      budgetDayValue.value = this.budgetDay;
      expensesMonthValue.value = this.expensesMonth;
      additionalExpensesValue.value = this.addExpenses.join(', '); 
      additionalIncomeValue.value = this.addIncome.join(', ');
      targetMonthValue.value = Math.ceil(this.getTargetMonth());  // округляем значение в большую сторону
      incomePeriodValue.value = this.calcPeriod();

      periodSelect.addEventListener('input', function () {
        incomePeriodValue.value = appData.calcPeriod();
      });
    },
   // дополнительных доходов
   getIncome: function () {
      incomeItems.forEach(function (item) {
        let itemIncome = item.querySelector('.income-title').value;
        let cashIncome = item.querySelector('.income-amount').value;
        if (itemIncome !== '' && cashIncome !== '') {
          appData.income[itemIncome] = cashIncome;
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
     //блок с дополнительным доходом
   addIncomeBlock: function() {
      // let incomeItems = document.querySelector('.income-items');
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
   },
   getIncomeMonth: function () {
      for (let key in this.income) {
        this.incomeMonth += +this.income[key];
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
   // Возможные расходы
   getAddExpenses: function() {
      // задаём переменную addExpenses и она будет получать из additionalExpensesItem(инпут -возмжные расходы) 
      //делаем из него массив
      let addExpenses = additionalExpensesItem.value.split(',');
      // перебераем массив и каждый элемент проверяем на пустоту 
      addExpenses.forEach(function(item){
         // если item не равен пустой строке 
         if (item !== ''){
            item = item.trim(); //убираем пробелы в начале и в конце
            // то мы его будем добавлять в appData.addExpenses с помощъю метода push 
            // и надо показать что добавлять будем item 
            appData.addExpenses.push(item);
         }
      });
   },
   // блок с обязательным расходом добавление дополнительных полей
   addExpensesBlock: function() { 
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
   },
   // Получить расходы за месяц
   getExpensesMonth: function() {   // Функция возвращает сумму всех обязательных расходов за месяц
      for(let key in this.expenses){
         this.expensesMonth += +this.expenses[key];  
      }
   },
   getBudget: function() { // Функция возвращает Накопления за месяц (Доходы минус расходы)
      this.budgetMonth = +this.budget + this.incomeMonth - this.expensesMonth;
      this.budgetDay = Math.ceil(this.budgetMonth / 30);
  },
  // период достижения цели
   getTargetMonth: function() { // Подсчитывает за какой период будет достигнута цель
      return targetAmount.value / this.budgetMonth;
   },
   getStatusIncome: function() {
      if (this.budgetDay >= 800) {
         return (' Высокий уровень дохода');
      } else if (this.budgetDay >= 300 && this.budgetDay < 800) {
         return (' Средний уровень дохода');
      } else if (this.budgetDay >= 0 && this.budgetDay < 300) {
         return (' Низкий уровень дохода');
      } else if(this.budgetDay < 0) {
         return (' Что то пошло не так!');
      }
   },
   getInfoDeposit: function(){
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
   },
   // метод, который считает сколько заработаем за период
   calcPeriod: function(){
      return this.budgetMonth * periodSelect.value;
   },
   // Число под полоской (input type range) меняем в зависимости от позиции range
   changePeriodAmount: function () {
      periodAmount.textContent = periodSelect.value;
   }
};    // заканчивается объект appData

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
start.addEventListener('click', appData.start.bind(appData));
expensesPlus.addEventListener('click', appData.addExpensesBlock);
buttonCancel.addEventListener('click', appData.reset.bind(appData));
incomePlus.addEventListener('click', appData.addIncomeBlock);
periodSelect.addEventListener('input', appData.changePeriodAmount);


