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
	// ----------------------- Menu
	//задаём функцию
	const toggleMenu = () => {
		// получаем элименты со страницы
		const btnMenu = document.querySelector('.menu'),
			menu = document.querySelector('menu'),  // гамбургер
			closeBtn = document.querySelector('.close-btn'),  // крестик закрыть
			menuItems = menu.querySelectorAll('ul>li');  // получаем лишки(li) вложенные в меню
			// объединяем одинаковый код в одну функцию
		const handlerMenu = () => {
			// пишем стили для меню
			// переписываем полностью функцию используя стили (class )
			menu.classList.toggle('active-menu');
		};
		// при клике на гамбургер навешиваем событие click
		// вызываем общую функцию вместо анонимной функции
		btnMenu.addEventListener('click', handlerMenu);
		// при клике на крестик навешиваем событие click
		// которое закроит меню
		// вызываем общую функцию вместо анонимной функции
		closeBtn.addEventListener('click', handlerMenu);
		// или можно отказаться от тела функции и записвть по другому
		menuItems.forEach(elem => elem.addEventListener('click', handlerMenu));
	};
	//вызов функции
	toggleMenu();
	// ---------------------- POPUP
	//задаём функцию
	const togglePopup = () => {
		// получаем все элементы
		const popup = document.querySelector('.popup'),
			popupBtn = document.querySelectorAll('.popup-btn'), //кнопки
			popupClose = document.querySelector('.popup-close '), // крестик
			popupContent = document.querySelector('.popup-content'); // тело popup
		popupContent.style.top = '0';
		//animate popup
		let count = 0;  // изначальная точка отсчёта анимации
		const animatePopup = function() {
			count++;
			popupContent.style.top = count + 'px';
			if (count < 250) {
				setTimeout(animatePopup, 10);
			} else if (window.innerWidth < 768) {
				count = 0;
				popupContent.style.top = '10%';
			}
		};
		animatePopup();
		// перебираем все кнопки
		popupBtn.forEach(elem => {
			elem.addEventListener('click', () => {
				// модальное окно открывается – переходит из скрытного состояния в видимое.
				popup.style.display = 'block';
			});
		});
		// вешаем события на крестик
		popupClose.addEventListener('click', () => {
			popup.style.display = 'none'; //окно закрывается, переходит из видимого состояния в скрытное.
		});
	};
	togglePopup();
});

