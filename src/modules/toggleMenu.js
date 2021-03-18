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
export default toggleMenu;
