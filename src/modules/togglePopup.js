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
export default togglePopup;
