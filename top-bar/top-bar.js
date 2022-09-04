import { listen } from '../shared/messages.js';

listen("tool-select", ({ tool }) => {
	const currentToolIcon = document.querySelector('.icon.current');
	currentToolIcon.setAttribute('class', `icon current ${tool}`);
});
