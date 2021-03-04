'use strict';
// Текущий день и время
const date = new Date();
	const dayWeek = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];
	const days = date.getDay();
	document.write("День недели: " + dayWeek[days] + "<br>");
	document.write("Текущее время: " + date.toLocaleTimeString('ru') + "<br>");
	