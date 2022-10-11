import { send } from '@grfx/messages';
import { client as Hotkeys } from '@grfx/hotkeys';
import './colorTool.js';
// import { InlineSVG } from '@grfx/utils.js';

// await InlineSVG('./icons.svg', "svg-icons");

Hotkeys();

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
}, 300);

window.updateColor = (selector) => {
	const { primary, secondary } = selector;
	send('color-update', { primary, secondary });
};