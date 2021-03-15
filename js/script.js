/*
Задание к уроку 26
1) Написать скрипт дляотправки данных по видео
2) Обязательно посмотреть дополнительное видео после практики
3) Подключить скрипт отправки данных к:
·        Модальному окну
·        Контактной форме в самом низу страницы
4) После отправки инпуты должны очищаться
5) Сделать валидацию данных при вводе: в поля с номером телефона можно ввести только цифры и знак “+”
6) В поле "Ваше имя" разрешить ввод только кириллицы и пробелов. В "Ваше сообщение" разрешить
только кириллицу, пробелы, цифры и знаки препинания.
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
		// setInterval(updateClock, 1000);
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
	// ---------- Валидация калькулятора ------
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
	// ---------- Форма заявки в футере ------
	// const form = document.querySelector('.footer-form');
	// // Валидация данных при вводе телефона
	// form.addEventListener('input', event => {
	// 	if (event.target.matches('input[name="user_phone"]')) {
	// 		// event.target.value = event.target.value.replace(/\+?[78]([-()]*\d){10}/g, '');
	// 		event.target.value = event.target.value.replace(/[^+\d]/g, '');
	// 	}
	// });
	// // Валидация данных при вводе email
	// form.addEventListener('input', event => {
	// 	if (event.target.matches('input[name="user_email"]')) {
	// 		// event.target.value = event.target.value.replace(/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/gi, '');
	// 		event.target.value = event.target.value.replace(/[^A-Za-z.\d\-@_]/g, '');
	// 	}
	// });
	// // Валидация данных при вводе имени
	// form.addEventListener('input', event => {
	// 	if (event.target.matches('input[name="user_name"]')) {
	// 		event.target.value = event.target.value.replace(/[^а-яё\s-]/i, '');
	// 		// event.target.value = event.target.value.replace(/[^А-Яа-яЁё]|/g, '');
	// 	}
	// });
	// //Валидация данных при вводе сообщения
	// form.addEventListener('input', event => {
	// 	if (event.target.matches('input[name="user_message"]')) {
	// 		event.target.value = event.target.value.replace(/[^А-Яа-яЁё,.]/gi, '');
	// 	}
	// });
	// --------------- Калькулятор ------------
	// в скобках по умолчанию можно дописать, папример, 100 денежных единиц
	const calc = (price = 100) => {
		const calcBlock = document.querySelector('.calc-block'),
			calcType = document.querySelector('.calc-type'),
			calcSquare = document.querySelector('.calc-square'),
			calcDay = document.querySelector('.calc-day'),
			calcCount = document.querySelector('.calc-count'),
			totalValue = document.getElementById('total');
		// функция которая считает итоговую цену
		const countSum = () => {
			// создаём внутреннею переменную и равна она 0 и её буде выводить
			let total = 0,
				countValue = 1,
				dayValue = 1;
			// задаём переменные для функции countSum
			// получаем typeValue (value) через select.
			// в квадратных скобках получаем индекс выбранног элемента
			// за скопками добавляем .value и получем только цифру индекса
			const typeValue = calcType.options[calcType.selectedIndex].value;
			// console.log(typeValue);
			// считаем площадь, обращаемся к calcSquare и к его значению value
			const squareValue = +calcSquare.value;
			// console.log(squareValue);
			// ======= количество помещения и срок исполнения в днях
			// если ввели данные больше 1, то
			if (calcCount.value > 1) {
				countValue += (calcCount.value - 1) / 10;
			}
			// ======= срок исполнения
			// если срок меньше 5, то умножаем на 2 (за срочность)
			if (calcDay.value && calcDay.value < 5) {
				dayValue *= 2;
			} else if (calcDay.value && calcDay.value < 10) {
				// если срок от 5 до 10 дней, то умножаем на 1,5 (за срочность)
				dayValue *= 1.5;
			}
			// ======= уловие для итоговой строки, если нет действия должен стоять ноль
			// если переменные typeValue и squareValue существуют, то тода
			// в total берём price и умножаем на typeValue, на squareValue, countValue, dayValue
			if (typeValue && squareValue) {
				total = price * typeValue * squareValue * countValue * dayValue;
			}
			// вывод на страницу. берём переменную totalValue и textContent и выводим total
			totalValue.textContent = total;
		};
		// отлавливаем событие change
		calcBlock.addEventListener('change', event => {
			// привязываем target
			const target = event.target;
			// поиска события, сравниваем по тегу select и input
			if (target.matches('select') || target.matches('input')) {
				// вызов функции, которая считает итоговую цену
				countSum();
			}
		});
	};
	// при взове калькулятора передаём ему сразу цену от которой отталкиваемся
	calc(100);
	// calc(price);
	// --------------- send-ajax-form ------------
	const sendForm = formId => {
		// переменные с сообщениями, которые передаём пользователю
		const errorMessage = 'Что-то пошло не так...',
			loadMessage = 'Загрузка...',
			successMessage = 'Спасибо! Мы скоро с вами свяжемся.';
		// получаем форму по id
		const form = document.getElementById(formId);
		// элемент statusMessage в который будем помещать сообщения
		const statusMessage = document.createElement('div'),
			inputs = document.querySelectorAll(`#${formId} input`); // все input из формы
		// добавим стили
		statusMessage.style.cssText = 'font-size: 2rem; color: white';
		// функция запроса на сервер
		const postData = (body, outputData, errorData) => {
			// создаём request запрос к серверу
			const request = new XMLHttpRequest();
			// навешиваем прослушку события readystatechange
			request.addEventListener('readystatechange', () => {
				// при отправки данных, под кнопкой появляется слово Загрузка
				if (request.readyState !== 4) {
					return;
				}
				if (request.status === 200) {
				// сообщение пользователю, что данные ушли на сервер
					outputData();
				} else {
					errorData(request.status);
					console.error();
				}
			});
			// настраиваем соединение, для этого обращаемся к методу open('')
			// и настраиваем его, первое что настроим это метод отправки POST на сервер ( файл server.php)
			request.open('POST', './server.php');
			// настройка заголовка
			request.setRequestHeader('Content-Type', 'application/json'); //multipart/form-data
			// открываем соединение и отправляем данные с помощью метода send('')
			request.send(JSON.stringify(body));
			// request.send(formData);
		};
		// Валидация данных при вводе телефона
		form.addEventListener('input', event => {
			if (event.target.matches('input[name="user_phone"]')) {
				// event.target.value = event.target.value.replace(/\+?[78]([-()]*\d){10}/g, '');
				event.target.value = event.target.value.replace(/[^+\d]/g, '');
			}
		});
		// Валидация данных при вводе email
		form.addEventListener('input', event => {
			if (event.target.matches('input[name="user_email"]')) {
				// event.target.value = event.target.value.replace(/^[\w]{1}[\w-\.]*@[\w-]+\.[a-z]{2,4}$/gi, '');
				event.target.value = event.target.value.replace(/[^A-Za-z.\d\-@_]/g, '');
			}
		});
		// Валидация данных при вводе имени
		form.addEventListener('input', event => {
			if (event.target.matches('input[name="user_name"]')) {
				event.target.value = event.target.value.replace(/[^а-яё\s-]/i, '');
				// event.target.value = event.target.value.replace(/[^А-Яа-яЁё]|/g, '');
			}
		});
		//Валидация данных при вводе сообщения
		form.addEventListener('input', event => {
			if (event.target.matches('input[name="user_message"]')) {
				event.target.value = event.target.value.replace(/[^А-Яа-яЁё,.]/gi, '');
			}
		});
		// когда пользователь будет кликать по кнопке, будет сробатывать событие submit
		// на нашей форме, а не только на кнопке, тоесть на всей форме
		// поэтому навешиваем на форму обработчик события submit
		form.addEventListener('submit', event => {
			// запрещаем стандартное событие. чтобы небыло перезагрузки
			event.preventDefault();
			// помещаем на страницу элемент statusMessage
			form.appendChild(statusMessage);
			statusMessage.textContent = loadMessage;
			// объект FormData, который считывает из формы( всё что в ней содержится
			// и обязательно имеет отрибут name) и сохраняет в объекте FormData
			const formData = new FormData(form);
			//  в объекте {} помещаем наши данные
			const body = {};
			formData.forEach((val, key) => {
				body[key] = val;
			});
			// console.log(body);
			postData(body, () => {
				statusMessage.textContent = successMessage;
			}, error => {
				statusMessage.textContent = errorMessage;
				console.log(error);
			});
			inputs.forEach(item => item.value = ''); // чистка input
		});
	};
	sendForm('form1'); // форма в header
	sendForm('form2'); // форма в footer
	sendForm('form3'); // форма модального окна
	// sendForm();
});
