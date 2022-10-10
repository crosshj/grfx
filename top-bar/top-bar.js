import "@grfx/components";
import { listen, send } from '@grfx/messages';
import Menus from '@grfx/menus';
import { client as Hotkeys } from '@grfx/hotkeys';
import ToolSettings from '../left/toolSettings.js';

Hotkeys();

Menus.setOffsets(0, 30);
Menus.attach();
listen("contextmenu-select", Menus.menuSelect);

const inputChanged = (el) => (e) => {
	const prop = el.id.split('-').pop();
	const tool = el.id.split('-').slice(0, -1).join('-');
	ToolSettings.set(tool, { [prop]: el.value });
	send('tool-change', {
		tool: {
			id: tool,
			...ToolSettings.get(tool)
		}
	});
};

const selectTool = ({ tool }) => {
	const currentToolIcon = document.querySelector('.icon.current');
	const options = document.querySelector('.options.current');

	currentToolIcon.setAttribute('class', `icon current ${tool}`);

	const settings = ToolSettings.get(tool);

	const template = document.querySelector('template.' + tool.replace('-', ''));
	const clone = template.content.cloneNode(true);
	options.remove();
	clone.querySelector('.options').classList.add('current');

	for(const [k,v] of Object.entries(settings)){
		const el = clone.getElementById(tool + '-' + k);
		!el && console.log(k + ': not found');
		el && el.setAttribute("value", v);
		el && (el.value = v);
	}

	const allInputs = Array.from(clone.querySelectorAll('input,select,x-select'));
	for(const input of allInputs){
		input.addEventListener("change", inputChanged(input));
	}

	document.body.append(clone);
};
listen("tool-select", selectTool);

send('ping', 'top-bar');


