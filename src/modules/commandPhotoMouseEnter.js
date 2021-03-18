// блок с картинками, смена картинок
const commandPhotoMouseEnter = () => {
	const images = document.querySelector('#command .row');
	const commandImg = () => {
		const target = event.target;

		if (target.classList.contains('command__photo')) {
			const lastSrc = target.src;

			target.src = target.dataset.img;
			target.dataset.img = lastSrc;
		}
	};

	images.addEventListener('mouseover', commandImg);
	images.addEventListener('mouseout', commandImg);
};
export default commandPhotoMouseEnter;
