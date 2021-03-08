window.addEventListener('DOMContentLoaded', () => {
	// -------------------- Timer
	const countTimer = deadline => {
		// получаем элименты со страницы
		const timerHours = document.getElementById('timer-hours'),
			timerMinutes = document.getElementById('timer-minutes'),
			timerSeconds = document.getElementById('timer-seconds');
		const getTimeRemaning = () => {
			const dateStop = new Date(deadline).getTime(),  // получаем конечную дату
				dateNow = new Date().getTime(),  // текущая дата
				timeRemaining = (dateStop - dateNow) / 1000,     // разница между датами  в секундах
				seconds = Math.floor(timeRemaining % 60), // сколько секунд осталось до deadline
				minutes = Math.floor((timeRemaining / 60) % 60), // сколько минут осталось до deadline
				hours = Math.floor((timeRemaining / 60 / 60)) % 24; // сколько часов осталось до deadline
			//  day = Math.floor(timeRemaining / 60 / 60 / 24);  // сколько дней осталось до deadlin
			return { timeRemaining, hours, minutes, seconds };
		};
		// подставляем 0 перед значениями
		const structureTime = data => {
			if (String(data).length === 1) {
				return '0' + data;
			} else {
				return String(data);
			}
		};
		const updateClock = setInterval(() => {
			const timer = getTimeRemaning();
			// вывод значений на страницу
			timerHours.textContent = structureTime(timer.hours);
			timerMinutes.textContent = structureTime(timer.minutes);
			timerSeconds.textContent = structureTime(timer.seconds);
			// вызов каждую секунду
			if (timer.timeRemaining < 0) {
				clearInterval(updateClock);
				const dateStop = new Date(deadline);
				dateStop.setDate(dateStop.getDate() + 1);
				countTimer(dateStop);
			}
		}, 1000);
		// setInterval(updateClock, 1000);
	};
	// countTimer('01 july 2019');
	countTimer('04 03 2022');
	// ----------------------- MENU
	//задаём функцию
	const toggleMenu = () => {
		// получаем menu со страницы
		const menu = document.querySelector('menu');
		const handlerMenu = () => {
			// получаем active-menu со страницы
			menu.classList.toggle('active-menu');
		};
		// навешиваем собитие при клике
		document.addEventListener('click', event => {
			// получили target
			const target = event.target;
			//присваиваем target и метод closest и пишем условия
			if (target.closest('.menu') ||
				target.classList.contains('close-btn') ||
				target.matches('ul>li>a')) {
				handlerMenu();
			} else if (!target.closest('.active-menu')) {
				menu.classList.remove('active-menu');
			}
		});
	};
	//вызов функции
	toggleMenu();
	// ---------------------- POPUP
	//задаём функцию
	const togglePopup = () => {
		// получаем элементы со страницы
		const popup = document.querySelector('.popup'), // popUp
			popupBtn = document.querySelectorAll('.popup-btn'), //кнопки popUpBtn
			popupClose = document.querySelector('.popup-close '); // крестик popUpClose
		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				popup.style.display = 'block';
			});
		});
		popupClose.addEventListener('click', () => {
			popup.style.display = 'none';
		});
		//
		popup.addEventListener('click', event => {
			//привязываем target
			let target = event.target;
			// проверка куда кликнули
			if (target.classList.contains('popup-close')) {
				popup.style.display = 'none';
			} else {
				target = target.closest('.popup-content');
				// если неполучили target, то закрываем popup
				if (!target) {
					popup.style.display = 'none';
				}
			}
		});
	};
	togglePopup();
	// ---------------- ТАБЫ --------------
	//задаём функцию
	const tabs = () => {
		// получаем элементы со страницы
		const tabHeader = document.querySelector('.service-header'), // родитель
			tabs = tabHeader.querySelectorAll('.service-header-tab'),
			tabContents = document.querySelectorAll('.service-tab');
		// функция, которая меняет контент и передавать она будет индекс таба
		const toggleTabContent = index => {
			// функция переберает все табы и находит соответствующий и показывать
			// а те которые ненужны мы будем их скрывать добавляя класс d-none
			for (let i = 0; i < tabContents.length; i++) { // пишем цикл ,который зависит от количества табов
				if (index === i) { // индекс, который будем передовать равен i
					tabs[i].classList.add('active'); // условия для первого таба
					// то tabContents с таким i будет показываться на странице, для этого удаляем класс d-none
					tabContents[i].classList.remove('d-none');
				} else {
					tabs[i].classList.remove('active'); // условия для первого таба
					// у тех элементов у которых индекс несоответствует, будем добавлять класс d-none
					tabContents[i].classList.add('d-none');
				}
			}
		};
		// второй вариант с методом closest
		tabHeader.addEventListener('click', event => {
		// элемент на который кликнули
			let target = event.target;
			// 	console.log(target);
			// после того как получили target, присваиваем ему target и метод closest
			// этот метод проверяет у элемента селектор
			// closest возвращает null. если ненашол соответствующий селектор
			// но если он селектор нашо, он вернул тот элемент у которого
			// он нашол этот селектор, поднемается closest только вверх
			target = target.closest('.service-header-tab');
			// проверка, что кликнули куда надо
			if (target) {
				tabs.forEach((item, i) => {  // проверка на какой именно таб кликнули
					if (item === target) {
						toggleTabContent(i);
					}
				});
			}
		});
	};
	tabs();
});

