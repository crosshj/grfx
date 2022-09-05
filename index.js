import Menus from './menus/menus.js';
import Layout from './layout/layout.js';
import { host as MessageHost } from './shared/messages.js';

const layout = await Layout();

const host = MessageHost();

document.body.append(Menus());

window.addEventListener('contextmenu-select', (e) => {
	host.broadcast({
		eventName: 'contextmenu-select',
		type: 'contextmenu-select',
		data: e.detail,
	});
});