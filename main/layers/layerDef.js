import * as CanvasFilters from 'canvas-filters';
import fs from '@grfx/fs';
const init = fs.init();

const loadImage = (url) => new Promise(async (resolve) => {
	if(url.startsWith('data:')){
		const image = new Image();
		image.onload = () => resolve(image);
		image.src = url;
		return;
	}
	if(url.startsWith('images/')){
		const image = new Image();
		image.onload = () => resolve(image);
		image.src = await fs.readFile({
			path: "/indexDB/" + url
		});
		return;
	}
	const path = `/indexDB/downloads/${url.split('/').pop()}`;
	const fileExists = await fs.exists({ path });
	if(!fileExists){
		console.log('file did not exist, will fetch: ' + path)
		const data = await fetch(url).then(x => x.blob());
		await fs.writeFile({ path, data });
	}
	const image = new Image();
	image.onload = () => resolve(image);
	image.src = await fs.readFile({ path });
});

const loadFile = (path) => fs.readFile({ path: `/indexDB/${path}`, encoding: 'utf8' });

const getDims = (width, height) => (i) => {
	if(!i) return { width, height };
	const sx = 0;
	const sy = 0;
	const sWidth = i.width;
	const sHeight = i.height;
	const sAspect = i.height/i.width;

	const dx = 0;
	const dy = 0.25 * (height - height * sAspect);
	const dWidth = width;
	const dHeight = height*sAspect;
	return [sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight];
};

const speech = async (args) => {
	const { text, x, y, width, height, radius, tailx, taily } = args;
	return await new Promise((resolve) => {
		const svg = `
			<svg viewBox="0 0 200 150"  xmlns="http://www.w3.org/2000/svg" width="200px">
				<rect style="stroke: rgb(0, 0, 0); stroke-linejoin: round; fill: rgb(255, 255, 255);" x="21.074" y="22.171" width="161.051" height="103.651" rx="100" ry="100"></rect>

				<g transform="matrix(1, 0, 0, 1, 60, 0)">
					<path style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); stroke-miterlimit: 1; stroke-linejoin: round;" d="M 32.092 125.785 L 31.502 125.725 L 22.539 141.944 L 43.14 125.665"></path>
					<path style="fill: rgb(255, 255, 255);" d="M 31.199 127.301 L 33.312 123.564 L 44.586 123.88 L 39.992 127.512"></path>
				</g>

				<text style="font-family: 'Comic Sans MS'; font-size: 25px; white-space: pre;" x="53" y="65">Mandrill,</text>
				<text style="font-family: 'Comic Sans MS'; font-size: 25px; white-space: pre;" x="53" y="100">for real!</text>
			</svg>
		`;
		const img = new Image();
		img.onload = function() {
			ctx.drawImage(img, 300, 140);
			resolve();
		};
		img.src = "data:image/svg+xml;base64,"+btoa(svg);
	});
};

const filter = (ctx, width, height) => (which, ...args) => {
	const imageData = ctx.getImageData(0, 0, width, height);
	const filtered = CanvasFilters[which](imageData, ...args);
	ctx.putImageData(filtered, 0, 0);
};

const processDef = (layer) => {
	const AsyncFunction = (async function () {}).constructor;
	const def = layer.type === '2d'
	? `
		ctx.save();
		ctx.clearRect(0, 0, getDims().width, getDims().height);
		ctx.beginPath();
		${layer.def}
		ctx.restore();
	`
	: layer.def;
	const renderFn = new AsyncFunction('loadImage', 'loadFile', 'ctx', 'getDims', 'filter', def);

	return async function drawImage({ ctx, width, height, layer }){
		await init;
		await renderFn(
			loadImage,
			loadFile,
			ctx,
			getDims(width, height),
			filter(ctx, 2*width, 2*height)
		);
	};
}

export default processDef;
