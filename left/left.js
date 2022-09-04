// import { InlineSVG } from './utils.js';
// await InlineSVG('./icons.svg', "svg-icons");

import { send } from '../shared/messages.js';

document.addEventListener('pointerdown', (e) => {
	if(!e.target.classList.contains('icon')) return;
	const currentSelected = document.body.querySelector('.selected');
	if(currentSelected === e.target) return;
	currentSelected?.classList.remove('selected');
	e.target.classList.add('selected');
	const tool = e.target.classList.toString().split(" ")
		.filter(x => !["selected", "icon"].includes(x));
	send('tool-select', { tool });
});