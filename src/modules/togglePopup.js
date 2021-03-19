//задаём функцию
const togglePopup = () => {
	// получаем элементы со страницы
	const popup = document.querySelector('.popup'), // popUp
		popupBtn = document.querySelectorAll('.popup-btn'), //кнопки popUpBtn
		popupContent = popup.querySelector('.popup-content'),
		popupActiv = {
			count: -445,
			speed: 10,
			startActiv: -445,
			endActiv: 0
		};
	const animatedPopup = () => {
		popupActiv.startActiv > popupActiv.endActiv ?
			popupActiv.count -= popupActiv.speed :
			popupActiv.count += popupActiv.speed;
		popupContent.style.transform = `translateY(${popupActiv.count}px)`;

		if (popupActiv.startActiv > popupActiv.endActiv ?
			popupActiv.count > popupActiv.endActiv :
			popupActiv.count < popupActiv.endActiv) {
			requestAnimationFrame(animatedPopup);
		}
	};
	popupBtn.forEach(elem => {
		elem.addEventListener('click', () => {
			popup.style.display = 'block';
			if (screen.width > 768) {
				popupActiv.count = popupActiv.startActiv;
				requestAnimationFrame(animatedPopup);
			}
		});
	});
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
