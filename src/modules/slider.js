// Создаём функцию
const slider = () => {
	const slide = document.querySelectorAll('.portfolio-item'),
		dots = document.querySelector('.portfolio-dots'),
		slider = document.querySelector('.portfolio-content');
	let currentSlide = 0; // определяет немер слайда, первый слайд нулевой
	let interval;

	// добавляем клас для точек
	slide.forEach(index => {
		const li = document.createElement('li');
		if (index === 0) {
			li.classList.add('dot-active');
			li.classList.add('dot');
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
export default slider;
