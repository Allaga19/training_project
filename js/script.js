window.addEventListener('DOMContentLoaded', () => {

	// Timer
	const countTimer = dedline => {
		const timerHours = document.querySelector('#timer-hours'),
			timerMinutes = document.querySelector('#timer-minutes'),
			timerSeconds = document.querySelector('#timer-seconds');
		let idInterval = 0;

		const getTimeRemaning = () => {
			const dateStop = new Date(dedline).getTime(),  // получаем конечную дату
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

		const updateClock = () => {
			const timer = getTimeRemaning();
			// вывод значений на страницу
			timerHours.textContent = structureTime(timer.hours);
			timerMinutes.textContent = structureTime(timer.minutes);
			timerSeconds.textContent = structureTime(timer.seconds);
			// вызов каждую секунду
			if (timer.timeRemaining < 0) {
				clearInterval(idInterval);
				const dateStop = new Date(dedline);
				dateStop.setDate(dateStop.getDate() + 1);
				countTimer(dateStop);
			}
		};
		idInterval = setInterval(updateClock, 1000);

	};
	// countTimer('01 july 2019');
	countTimer('04 march 2021');

});
