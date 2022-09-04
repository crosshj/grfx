// import { InlineSVG } from './utils.js';
// await InlineSVG('./icons.svg', "svg-icons");

import { send } from '../shared/messages.js';

const selectTool = (tool) => {
	const newTool = document.body.querySelector(`.icon.${tool}`);
	if(!newTool) return console.error(`Could not find tool: ${tool}`);

	const currentSelected = document.body.querySelector('.selected');
	if(currentSelected === newTool) return;

	currentSelected?.classList.remove('selected');
	newTool.classList.add('selected');
	send('tool-select', { tool });
	localStorage.setItem('gfx-currentTool', tool);
};

document.addEventListener('pointerdown', (e) => {
	if(!e.target.classList.contains('icon')) return;
	const tool = e.target.classList.toString().split(" ")
		.filter(x => !["selected", "icon"].includes(x))
		.join(" ");
	selectTool(tool);
});

setTimeout(() => {
	selectTool(localStorage.getItem('gfx-currentTool') || "pencil");
}, 100);
