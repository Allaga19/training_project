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
		if (data < 10) {
			data = '0' + data;
		}
		return data;
	};
	const updateClock = () => {
		const timer = getTimeRemaning();
		timerHours.textContent = structureTime(timer.hours);
		timerMinutes.textContent = structureTime(timer.minutes);
		timerSeconds.textContent = structureTime(timer.seconds);
		if (timer.timeRemaining > 0) {
			setTimeout(updateClock, 1000);
		}
	};
	updateClock();
};
export default countTimer;