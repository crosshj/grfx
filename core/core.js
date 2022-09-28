import History from './history.js';
import actions from './actions.js';

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
		data: context.currentFile,
	});
};

const load = ({ host, config }) => {
	context.history = new History({
		editor: {
			zoom: config.zoom,
			tool: { id: config.tool }
		},
		file: {
			canvas: {
				width: config.width,
				height: config.height,
			},
			layers: config.layers
		}
	}, (args) => {
		// this should be the update function (above)
		console.warn('TODO:', args);
	});

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

	window.addEventListener('contextmenu-select', async ({ detail={} }={}) => {
		const { which, key } = detail;
		const name = key || which;
		const action = actions["menu-" + name] || actions[name];
		if(!action) return;
		await doAction(action)();
	});

	// window.addEventListener('contextmenu-select', (e) => {
	// 	host.broadcast({
	// 		eventName: 'contextmenu-select',
	// 		type: 'contextmenu-select',
	// 		data: e.detail,
	// 	});
	// });

	return {
		load: (config) => load({ host, config })
	};
};

export default Core;
