const examples = {
	dunno: "https://raw.githubusercontent.com/crosshj/graphics-editor/main/assets/feedforward.png",
	robot: "https://images.nightcafe.studio/jobs/wJMbnnlCfS9WEVur80Qx/wJMbnnlCfS9WEVur80Qx_8.9286x.jpg",
	squid: "https://images.nightcafe.studio/jobs/gZVKddsDrWb2odrM3vsY/gZVKddsDrWb2odrM3vsY--2--Y98HJ.jpg",
	gold: "https://images.nightcafe.studio/jobs/7OXU5TcnbVF71K1zN79N/7OXU5TcnbVF71K1zN79N--3--5TQRK.jpg",
	owl: "https://images.nightcafe.studio/jobs/5freDC2naZa9EQrIUOQY/5freDC2naZa9EQrIUOQY.jpg",
	sky: "https://images.nightcafe.studio/jobs/lheEUAmhcoUn9fsxXGZP/lheEUAmhcoUn9fsxXGZP_6.9444x.jpg",
};

export default {
	zoom: 0.6,
	width: 2880,
	height: 2160,
	layers: [{
		number: 0,
		visible: true,
		selected: true,
		// alpha: 0.5,
		// blendMode: 'overlay',
		blendMode: 'screen',
		name: "Dangerous Clouds",
		def: `loadImage("${examples.sky}");`
	}, {
		number: 1,
		name: "Owl At Sea",
		alpha: 0.1,
		blendMode: 'saturation',
		def: `loadImage("${examples.owl}");`
	}, {
		visible: false,
		number: 2,
		name: "Golden Boy",
		def: `loadImage("${examples.gold}");`
	}, {
		number: 3,
		name: "Mon*star's Sky-Runner",
		def: `loadImage("${examples.squid}");`
	}, {
		number: 4,
		name: "Cyberpunk Robot",
		def: `loadImage("${examples.robot}");`
	}]
};
