let currentFile;

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
	update({ host });
};

const Core = ({ host, layout }) => {
	host.listen('layer-select', ({ number }) => {
		const { layers } = currentFile;
		for(const layer of layers){
			layer.selected = undefined;
			if(layer.number !== number) continue;
			layer.selected = true;
		}
		update({ host });
	});
	host.listen('layer-visibility', ({ number, visible }) => {
		const { layers } = currentFile;
		const l = layers.find(x => x.number === Number(number));
		l.visible = visible;
		update({ host });
	});
	host.listen('layer-alpha', ({ number, alpha }) => {
		const { layers } = currentFile;
		const l = layers.find(x => x.number === Number(number));
		l.alpha = alpha;
		update({ host });
	});
	host.listen('layer-blend-mode', ({ number, mode }) => {
		const { layers } = currentFile;
		const l = layers.find(x => x.number === Number(number));
		l.blendMode = mode;
		update({ host });
	});
	host.listen('layer-new', () => {
		layout.showPane({ name: "editor" })
	});
	host.listen('show-layer-source', () => {
		layout.showPane({ name: "editor" })
	});
	host.listen('hide-layer-source', () => {
		layout.hidePane({ name: "editor" })
	});

	const modals = {
		'Image Size...': 'imageSize'
	};
	const modalData = {
		imageSize: () => ({
			message: "TODO: get data for given form"
		}),
	};
	window.addEventListener('contextmenu-select', ({ detail={} }={}) => {
		const { which } = detail;
		const modal = modals[which];
		const data = modal && modalData[modal]();
		if(!modal) return;
		const event = new CustomEvent('contextMenuShow', {
			bubbles: true,
			detail: {
				modal,
				list: [],
				data,
				parent: "core"
			}
		});
		window.top.dispatchEvent(event);
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
