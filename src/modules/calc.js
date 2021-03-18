// в скобках по умолчанию можно дописать, папример, 100 денежных единиц
const calc = (price = 100) => {
	const calcBlock = document.querySelector('.calc-block'),
		calcType = document.querySelector('.calc-type'),
		calcSquare = document.querySelector('.calc-square'),
		calcDay = document.querySelector('.calc-day'),
		calcCount = document.querySelector('.calc-count'),
		totalValue = document.getElementById('total');
	// ---------- Валидация калькулятора ------
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
export default calc;
