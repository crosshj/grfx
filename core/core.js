let layers;

const load = ({ host, config }) => {
	layers = config.layers;

	host.broadcast({
		eventName: 'layers-update',
		type: 'layers-update',
		data: { layers },
	});
};

const Core = ({ host, layout }) => {
	host.listen('layer-visibility', ({ number, visible }) => {
		const l = layers.find(x => x.number === Number(number));
		l.visible = visible;
		host.broadcast({
			eventName: 'layers-update',
			type: 'layers-update',
			data: { layers },
		});
	});
	host.listen('layer-alpha', ({ number, alpha }) => {
		const l = layers.find(x => x.number === Number(number));
		l.alpha = alpha;
		host.broadcast({
			eventName: 'layers-update',
			type: 'layers-update',
			data: { layers },
		});
	});
	host.listen('layer-blend-mode', ({ number, mode }) => {
		const l = layers.find(x => x.number === Number(number));
		l.blendMode = mode;
		host.broadcast({
			eventName: 'layers-update',
			type: 'layers-update',
			data: { layers },
		});
	});
	host.listen('show-layer-source', ({ number, alpha }) => {
		layout.showPane({ name: "editor" })
	});
	host.listen('hide-layer-source', ({ number, alpha }) => {
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
