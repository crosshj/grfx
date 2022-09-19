const examples = {
	dunno: "https://raw.githubusercontent.com/crosshj/graphics-editor/main/assets/feedforward.png",
	robot: "https://images.nightcafe.studio/jobs/wJMbnnlCfS9WEVur80Qx/wJMbnnlCfS9WEVur80Qx_8.9286x.jpg",
	squid: "https://images.nightcafe.studio/jobs/gZVKddsDrWb2odrM3vsY/gZVKddsDrWb2odrM3vsY--2--Y98HJ.jpg",
	gold: "https://images.nightcafe.studio/jobs/7OXU5TcnbVF71K1zN79N/7OXU5TcnbVF71K1zN79N--3--5TQRK.jpg",
	owl: "https://images.nightcafe.studio/jobs/5freDC2naZa9EQrIUOQY/5freDC2naZa9EQrIUOQY.jpg",
	sky: "https://images.nightcafe.studio/jobs/lheEUAmhcoUn9fsxXGZP/lheEUAmhcoUn9fsxXGZP_6.9444x.jpg",
};

const local = Object.keys(examples)
	.reduce((all, key) => ({
		...all,
		[key]: `/indexDB/${key}.jpg`
	}), {});

export default {
	zoom: 0.6,
	width: 2880,
	height: 2160,
	layers: [{
		number: 0,
		alpha: 0.6,
		blendMode: 'multiply',
		name: "Basic Canvas Ops",
		def: `
			const { width, height } = getDims();
			const radius = 300;
			const Xcenter = width/2;
			const Ycenter = height/2;
			ctx.fillStyle = '#008';
			ctx.arc(Xcenter, Ycenter, radius, 0, 2*Math.PI, false);
			ctx.fill();
		`
	}, {
		number: 1,
		visible: true,
		selected: true,
		// alpha: 0.5,
		// blendMode: 'overlay',
		blendMode: 'screen',
		name: "Dangerous Clouds",
		def: `
			const image = await loadImage("${local.sky}");
			ctx.drawImage(image, ...getDims(image));
		`
	}, {
		number: 2,
		name: "Owl At Sea",
		alpha: 0.1,
		blendMode: 'saturation',
		def: `
			const image = await loadImage("${local.owl}");
			ctx.drawImage(image, ...getDims(image));
		`
	}, {
		visible: false,
		number: 3,
		name: "Golden Boy",
		def: `
			const image = await loadImage("${local.gold}");
			ctx.drawImage(image, ...getDims(image));
		`
	}, {
		number: 4,
		name: "Mon*star's Sky-Runner",
		def: `
			const image = await loadImage("${local.squid}");
			ctx.drawImage(image, ...getDims(image));
		`
	}, {
		number: 5,
		name: "Cyberpunk Robot",
		def: `
			const image = await loadImage("${local.robot}");
			ctx.drawImage(image, ...getDims(image));
		`
	}]
};
