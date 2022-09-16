const layers = [{
	number: 0,
	visible: true,
	selected: true,
	// alpha: 0.5,
	// blendMode: 'overlay',
	blendMode: 'screen',
	name: "Dangerous Clouds",
	image: "/indexDB/sky.jpg"
}, {
	number: 1,
	name: "Owl At Sea",
	alpha: 0.1,
	blendMode: 'saturation',
	image: "/indexDB/owl.jpg"
}, {
	visible: false,
	number: 2,
	name: "Golden Boy",
	image: "/indexDB/gold.jpg"
}, {
	number: 3,
	name: "Mon*star's Sky-Runner",
	image: "/indexDB/squid.jpg"
}, {
	number: 4,
	name: "Cyberpunk Robot",
	image: "/indexDB/robot.jpg"
}];

const Core = ({ host }) => {
	host.broadcast({
		eventName: 'layers-update',
		type: 'layers-update',
		data: { layers },
	});
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
	const modals = {
		'Image Size...': 'imageSize',
		'Canvas Size...': 'canvasSize'
	};
	const modalData = {
		imageSize: () => ({
			message: "TODO: get data for given form"
		}),
		canvasSize: () => ({
			message: "NOTE: this is just an example"
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
};

export default Core;
