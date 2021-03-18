const sendForm = formId => {
	// переменные с сообщениями, которые передаём пользователю
	const errorMessage = 'Что-то пошло не так...',
		loadMessage = 'Загрузка...',
		successMessage = 'Спасибо! Мы скоро с вами свяжемся.';
	// получаем форму по id
	const form = document.getElementById(formId);
	// элемент statusMessage в который будем помещать сообщения
	const statusMessage = document.createElement('div'),
		popup = document.querySelector('.popup'), // pop-up окно
		inputs = document.querySelectorAll(`#${formId} input`); // все input из формы
	// добавим стили
	statusMessage.style.cssText = 'font-size: 2rem; color: white';
	//
	// функция запроса на сервер
	const postData = requestBody => fetch('server.php', {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json'
		},
		body: JSON.stringify(requestBody)
	});
	//
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
		form.append(statusMessage);
		statusMessage.textContent = loadMessage; // сообщение о загрузке
		// объект FormData, который считывает из формы( всё что в ней содержится
		// и обязательно имеет отрибут name) и сохраняет в объекте FormData
		const formData = new FormData(form);
		//  в объекте {} помещаем наши данные
		const body = {};
		// Перебор данных формы и заполнение тела запроса body
		formData.forEach((item, index) => body[index] = item);
		// formData.forEach((val, key) => {
		// 	body[key] = val;
		// });
		// console.log(body);
		// Отправка данных и уведомление пользователя
		postData(body)
			.then(response =>  {
				if (response.status !== 200) { throw new Error('Response status code is not 200'); }
				statusMessage.textContent = successMessage;
			})
			.catch(error => {
				statusMessage.textContent = errorMessage;
				console.error(error);
			});
		inputs.forEach(item => item.value = ''); // чистка input после отправки данных
		setTimeout(() => statusMessage.remove(), 5000); // удаление сообщения о статусе
		setTimeout(() => popup.style.display = 'none', 7000); // закрытие модального окна
	});
};
export default sendForm;
