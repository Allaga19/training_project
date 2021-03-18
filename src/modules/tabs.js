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
export default tabs;
