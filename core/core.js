const layers = [{
	number: 0,
	visible: true,
	name: "Dangerous Clouds",
	image: "/indexDB/sky.jpg"
}, {
	number: 1,
	visible: false,
	name: "Owl At Sea",
	image: "/indexDB/owl.jpg"
}, {
	visible: false,
	number: 2,
	name: "Golden Boy",
	image: "/indexDB/gold.jpg"
}, {
	number: 3,
	visible: false,
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
	})
};

export default Core;
