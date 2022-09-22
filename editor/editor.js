import { send, listen } from '../shared/messages.js';
import constructLayer from './constructLayer.js';

let config;

const goFn = (action, layer) => {
	send(action, layer);
	//send('hide-layer-source');
};
const cancelFn = () => {
	send('hide-layer-source');
};

// const name = undefined;
// const def = undefined;
// const type = undefined;

// const editor = await constructLayer({ goFn, cancelFn, name, def, type });
// document.body.append(editor);

const updateEditor = async ({ number, name, type }) => {
	const layer = config && typeof number !== "undefined"
		? config.layers.sort((a,b) => a.number-b.number)[number]
		: { name, type };
	const editor = await constructLayer({
		goFn, cancelFn,
		...layer
	});
	document.body.innerHTML = '';
	document.body.append(editor);
};

listen('layer-new', async (args) => {
	updateEditor({
		type: '2d'
	})
});
listen('file-update', async (args) => {
	config = args;
	const layer = config.layers.find(x => x.selected);
	updateEditor(layer);
});

listen('show-layer-source', updateEditor);

send('ping', 'editor');