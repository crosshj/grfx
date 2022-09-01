// import { InlineSVG } from './utils.js';
// await InlineSVG('./icons.svg', "svg-icons");

document.addEventListener('pointerdown', (e) => {
	if(!e.target.classList.contains('icon')) return;
	const currentSelected = document.body.querySelector('.selected');
	if(currentSelected === e.target) return;
	currentSelected?.classList.remove('selected');
	e.target.classList.add('selected');
});