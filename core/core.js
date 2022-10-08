import { clone, each } from '@grfx/utils';
import fs from '@grfx/fs';
import { HostState } from './state.js';
import actions from './actions.js';
import fileObserve from './middleware/fileObserve.js';
import toolObserve from './middleware/toolObserve.js';

const context = {
	host: undefined,
	layout: undefined,
	currentFile: undefined,
	currentFileName: undefined,
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

const load = async ({ host, filename }) => {
	const { default: config } = await import(
		await fs.readFile({ path: '/indexDB/' + filename })
	);
	context.state = new HostState(clone({
		filename,
		editor: {
			zoom: config.zoom,
			tool: { id: config.tool || "pencil" }
		},
		file: {
			canvas: {
				width: config.width,
				height: config.height,
			},
			history: [],
			layerOrder: config.layers.map(x => x.id || x.name),
			layers: config.layers
		}
	}), each([
		fileObserve(console.log /* update*/),
		toolObserve(async (data) => {
			await host.broadcast({
				eventName: 'tool-update',
				type: 'tool-update',
				data,
			});
		})
	]));

	context.currentFile = config;
	context.currentFileName = filename;
	sessionStorage.setItem('grfxCurrentFilename', filename);
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
		const { which, key, form } = detail;
		if(key === "cancel-modal"){
			context.pending.reject(new Error('user canceled'));
			context.pending = undefined;
			return;
		}
		if(form && context.pending){
			context.pending.resolve(detail);
			context.pending = undefined;
			return;
		}
		const name = key || which;
		const action = actions["menu-" + name] || actions[name];
		if(action){
			return await doAction(action)({ form });
		};
		// TODO: result of an actual contextmenu-select
		//console.log(name)
	});

	window.addEventListener('contextmenu-select', (e) => {
		host.broadcast({
			eventName: 'contextmenu-select',
			type: 'contextmenu-select',
			data: e.detail,
		});
	});

	return {
		load: (filename) => load({ host, filename })
	};
};

export default Core;
