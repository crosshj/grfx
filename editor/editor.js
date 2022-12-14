import { send, listen } from '@grfx/messages';
import { client as Hotkeys } from '@grfx/hotkeys';
import constructLayer from './constructLayer.js';

const skip = (e) => {
	const withModifier = () => [e.altKey, e.shiftKey, e.metaKey, e.ctrlKey].some(x => x);
	if(e.target.id === "layerDef" && !withModifier()) return true;
	//console.log(e.target);
};
Hotkeys({ skip });

let config;

const goFn = (action, layer) => {
	send(action, layer);
	//send('hide-layer-source');
};
const cancelFn = () => {
	send('hide-layer-source');
};


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