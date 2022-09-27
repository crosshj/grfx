import "@grfx/components";
import { listen, send } from '@grfx/messages';
import Menus from '@grfx/menus';
import { client as Hotkeys } from '@grfx/hotkeys';

Hotkeys();

Menus.setOffsets(0, 30);
Menus.attach();
listen("contextmenu-select", Menus.menuSelect);

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
listen("tool-select", selectTool);

send('ping', 'top-bar');
