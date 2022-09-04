import { listen } from '../shared/messages.js';

listen("tool-select", ({ tool }) => {
	console.log('top-bar header tool select: ' + tool);
});
