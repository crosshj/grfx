import actions from './actions.js';
let currentFile;

const context = {
	host: undefined,
	layout: undefined,
	currentFile: undefined,
	update: undefined,
	load: undefined,
};

const update = async ({ host }) => {
	await host.broadcast({
		eventName: 'file-update',
		type: 'file-update',
		data: currentFile,
	});
	//DEPRECATE
	// await host.broadcast({
	// 	eventName: 'layers-update',
	// 	type: 'layers-update',
	// 	data: currentFile,
	// });
};
const load = ({ host, config }) => {
	currentFile = config;
	context.currentFile = config;
	update({ host });
};

const Core = ({ host, layout }) => {
	context.host = host;
	context.layout = layout;
	context.load = load;
	context.update = () => update({ host });

	const doAction = (fn) => (args) => fn(context, args);
	for(const [actionName, handler] of Object.entries(actions)){
		host.listen(actionName, doAction(handler));
	}

	host.listen('layers-order',async ({ order }) => {
		const { layers } = currentFile;
		for(const [i, o] of Object.entries(order)){
			layers[o].number = Number(i);
		}
		currentFile.layers = currentFile.layers.sort((a,b) => a.number-b.number);
		currentFile.dirty = true;
		await update({ host });
		currentFile.dirty = undefined;
	});
	host.listen('layer-update', async (layer) => {
		const { layers } = currentFile;
		const l = layers.find(x => x.number === Number(layer.number));
		if(!l) return console.error('could not find layer to update');
		layer.def && (l.def = layer.def);
		layer.name && (l.name = layer.name);
		l.dirty = true;
		await update({ host });
		l.dirty = undefined;
	});

	const modals = {
		imageSize: () => ({
			message: "TODO: get data for given form"
		}),
	};

	window.addEventListener('contextmenu-select', async ({ detail={} }={}) => {
		const { which, key } = detail;
		const modal = modals[key||which];
		const action = actions[key||which];

		if(!modal && !action) return;

		/*
			given a context menu was selected, one the following occurs:
				- a modal pops up
				- a message is sent and handled
			in both cases, relevant data must be sent, for example
				- what is current selected layer
				- what are dims of current file
		*/

		if(modal){
			const event = new CustomEvent('contextMenuShow', {
				bubbles: true,
				detail: {
					modal: key||which,
					list: [],
					data: modal(),
					parent: "core"
				}
			});
			window.top.dispatchEvent(event);
			return;
		}
		if(action){
			await host.broadcast({
				eventName: key||which,
				type: key||which,
				data: {},
			});
			await doAction(action)();
			return;
		}
	});
	window.addEventListener('contextmenu-select', (e) => {
		host.broadcast({
			eventName: 'contextmenu-select',
			type: 'contextmenu-select',
			data: e.detail,
		});
	});
	
	return {
		load: (config) => load({ host, config })
	};
};

export default Core;
