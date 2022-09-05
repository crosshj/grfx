import { listen } from '../shared/messages.js';
import showMenu from './showMenu.js';

const selectTool = ({ tool }) => {
	const currentToolIcon = document.querySelector('.icon.current');
	const options = document.querySelector('.options.current');

	currentToolIcon.setAttribute('class', `icon current ${tool}`);

	const template = document.querySelector('template.' + tool.replace('-', ''));
	const clone = template.content.cloneNode(true);
	options.remove();
	clone.querySelector('.options').classList.add('current');
	document.body.append(clone);
};

const menuSelect = (e) => {
	if(!window.selectListener) return;
	window.selectListener(e);
};

listen("tool-select", selectTool);
listen("contextmenu-select", menuSelect);

document.addEventListener('pointerdown', (e) => {
	const menu = e.target.dataset.menu;
	if(menu) return showMenu(e);
});