/*
Урок 23 Задание
1) В нашем проекте есть Блок с картинками Наша Команда
   У каждой фото есть data атрибут с другой картинкой data-image.
   Необходимо реализовать, чтобы по наведению мышкой менялись фотографии,
   а если увести мышку с элемента то возвращается прежняя фото.
2)  В калькуляторе разрешить ввод только цифр:
3) В полях ввода "Ваше имя" и "Ваше сообщение" разрешить только ввод кириллицы в любом регистре,      дефиса и пробела.
4) В поле "email" разрешить только ввод латиницы в любом регистре и спецсимволы
   Собака @
   Дефис -
   Подчеркивание _
   Точка .
   Восклицательный знак !
   Тильда ~
   Звездочка *
   Одинарная кавычка '
5) В поле "Номер телефона" разрешить только ввод цифр, круглых скобок и дефис
6) При потере фокуса (событие blur) реализовать проверку на корректность
   введённого значения в полях ввода и замена его на корректное при необходимости по правилам:
   Должны удаляться все символы, кроме допустимых
   Несколько идущих подряд пробелов или дефисов должны заменяться на один.
   Пробелы и дефисы в начале и конце значения должны удаляться.
   Для поля "Ваше имя" Первая буква каждого слова должна приводиться к верхнему регистру, а все остальные — к нижнему.
*/
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
	};
	// countTimer('01 july 2019');
	countTimer('04 03 2022');
	// ---------------------- MENU -----------
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
	// ---------------------- POPUP ----------
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
	// ---------------------- ТАБЫ -----------
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
	// --------------------- СЛАЙДЫ -----------
	// Создаём функцию
	const slider = () => {
		const slide = document.querySelectorAll('.portfolio-item'),
			dots = document.querySelector('.portfolio-dots'),
			// dot = document.querySelectorAll('.dot'),
			slider = document.querySelector('.portfolio-content');
		let currentSlide = 0; // определяет немер слайда, первый слайд нулевой
		let interval;
		// добавляем клас для точек
		slide.forEach(index => {
			const li = document.createElement('li');
			if (index === 0) {
				li.classList.add('dot');
				li.classList.add('dot-active');
			} else {
				li.classList.add('dot');
			}
			dots.append(li);
		});
		const dot = document.querySelectorAll('.dot');
		// функция принимает элемен у которого надо удалить класс
		// дальше она принимает индекс (currentSlide) и клас, который хотим добавить или удалить
		const prevSlide = (elem, index, strClass) => {
			// у текущего слайда (elem) с индексом currentSlide (index) убираем класс active
			// а слудующему слайду добавлять класс activ это strClass(portfolio-item-active)
			elem[index].classList.remove(strClass);
		};
		const nextSlide = (elem, index, strClass) => {
			// и у следующего слайда будем добавлять strClass (portfolio-item-active)
			elem[index].classList.add(strClass);
		};
		//  функция перелистования
		const autoPlaySlide = () => {
			// вызов (стрелки)
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			// замена точек
			prevSlide(dot, currentSlide, 'dot-active');
			// переходим к следующему слайду и добавляем единицу
			currentSlide++;
			// ограничиваем количество currentSlide, количеством слайдов
			if (currentSlide >= slide.length) {
				// тогда возвращаемся к первому слайду
				currentSlide = 0;
			}
			// вызов (стрелки)
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			// замена точек после смены слайда
			nextSlide(dot, currentSlide, 'dot-active');
		};
		// запускает слады. time = 3000 - параметр по умолчанию
		const startSlide = (time = 3000) => {
			//функция  будет вызывать  через каждые time секунды
			interval = setInterval(autoPlaySlide, time);
		};
		// останавливаем слайды при наведении на стрелки или точки
		const stopSlide = () => {
			clearInterval(interval);
		};
		// логика переключения по точкам и по стрелкам
		// вешаем обработчик события на slider ('.portfolio-content')
		slider.addEventListener('click', event => {
			// отключаем  стандартное действие для события click.
			event.preventDefault();
			// привязываем таргет
			const target = event.target;
			// ограничение входа, если кликаем внутри слайдера и не поподаем на точки
			// то делаем return, событие дальше неотрабатывает
			if (!target.matches('.portfolio-btn, .dot')) {
				return;
			}
			// если кликаем на '.portfolio-btn, .dot', то срабатывает код ниже
			prevSlide(slide, currentSlide, 'portfolio-item-active');
			prevSlide(dot, currentSlide, 'dot-active');
			// если цель кнопка arrow-right, то
			if (target.matches('#arrow-right')) {
				// то тогда прибавляем к currentSlide единицу
				currentSlide++;
			} else if (target.matches('#arrow-left')) { //если цель кнопка arrow-left, то
				// то тогда отнимаем от currentSlide единицу
				currentSlide--;
			} else if (target.matches('.dot')) { // если кликаем по точкам
				// то тогда необходимо к currentSlide применить ту точку на которую кликнули
				// перебераем все точки и сравним их с таргетом
				dot.forEach((elem, index) => {
					// если точка совподает с той на которую кликнули
					if (elem === target) {
						currentSlide = index; // то тогда индекс этого элемента присваеваем currentSlide
					}
				});
			}
			// ограничиваем количество currentSlide, количеством слайдов
			if (currentSlide >= slide.length) {
				// тогда возвращаемся к первому слайду
				currentSlide = 0;
			}
			// если currentSlide будет меньше 0, то для currentSlide надо присвоить длину slide.length
			if (currentSlide < 0) {
				currentSlide = slide.length - 1;
			}
			nextSlide(slide, currentSlide, 'portfolio-item-active');
			nextSlide(dot, currentSlide, 'dot-active');
		});
		// отключаем автослайд при наведении мышки
		slider.addEventListener('mouseover', event => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				stopSlide();
			}
		});
		// если убрали мышку включается старт
		slider.addEventListener('mouseout', event => {
			if (event.target.matches('.portfolio-btn') || event.target.matches('.dot')) {
				startSlide();
			}
		});
		// вызов старт и передаём скорость листания
		startSlide(1500);
	};
	// вызов функции
	slider();
	// ------------------- COMMAND ------------
	// блок с картинками, смена картинок
	const commandPhotoMouseEnter = () => {
		const images = document.querySelector('#command .row');
		const commandImg = () => {
			const target = event.target;

			if (target.classList.contains('command__photo')) {
				const lastSrc = target.src;

				target.src = target.dataset.img;
				target.dataset.img = lastSrc;
			}
		};

		images.addEventListener('mouseover', commandImg);
		images.addEventListener('mouseout', commandImg);
	};
	commandPhotoMouseEnter();
	// Валидация калькулятора
	const calcBlock = document.querySelector('.calc-block');
	const calcBlockInputs = () => {
		// на calcBlock навешиваем события
		calcBlock.addEventListener('input', event => {
			const target = event.target;
			if (target.matches('input.calc-item')) {
				// запрет на ввод букв
				target.value = target.value.replace(/\D/g, '');
			}
		});
	};
	calcBlockInputs();
	// форма заявки в футере
	const form = document.querySelector('.footer-form');
	// Валидация данных при вводе телефона
	form.addEventListener('input', event => {
		if (event.target.matches('input[name="user_phone"]')) {
			event.target.value = event.target.value.replace(/[^+\d]/g, '');
		}
	});
	// Валидация данных при вводе email
	form.addEventListener('input', event => {
		if (event.target.matches('input[name="user_email"]')) {
			event.target.value = event.target.value.replace(/[^A-Za-z.\d\-@_]/g, '');
		}
	});
	// Валидация данных при вводе имени
	form.addEventListener('input', event => {
		if (event.target.matches('input[name="user_name"]')) {
			event.target.value = event.target.value.replace(/[^а-яё\s-]/i, '');
		}
	});
	//Валидация данных при вводе сообщения
	form.addEventListener('input', event => {
		if (event.target.matches('input[name="user_message"]')) {
			event.target.value = event.target.value.replace(/[^А-Яа-яЁё,.]/gi, '');
		}
	});
});
