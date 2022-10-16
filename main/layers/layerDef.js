

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

const speech = (ctx, width, height) => async (args) => {
	return await new Promise((resolve) => {
		const { text, x, y, scale=1, radius=20, distort=0 } = args;

		const lines = text.split('\n');

		const longest = Math.max(...(lines.map(el => el.length)));
		//https://stackoverflow.com/questions/2057682/determine-pixel-length-of-string-in-javascript-jquery

		const _width = 130+longest*11.05;
		const _height = 100 + 30*lines.length;
		const svg = `
		<svg
			viewBox="0 0 ${_width} ${_height}"
			xmlns="http://www.w3.org/2000/svg"
			width="${_width*scale}px"
		>
			<defs>
				<filter id="distort">
					<feTurbulence baseFrequency="${distort}" type="fractalNoise"/>
						<feDisplacementMap in="SourceGraphic" xChannelSelector="R" yChannelSelector="B" scale="10">
					</feDisplacementMap>
					<feComponentTransfer result="main" />
					<feComposite operator="over" in="main"/>
				</filter>
			</defs>
			<g
				style="filter: url(#distort) drop-shadow(2px 2px 0px rgb(0 0 0 / 1))"
			>
				<rect
					style="stroke: rgb(0, 0, 0); stroke-linejoin: round; fill: rgb(255, 255, 255); filter: url(#distort);"
					x="20"
					y="23"
					width="${_width-40}"
					height="${_height-58}"
					rx="${radius}"
					ry="${radius}"
				></rect>

				<g
					transform="matrix(1, 0, 0, 1, ${_width/4}, 0)"
				>
					<path
						style="stroke: rgb(0, 0, 0); fill: rgb(255, 255, 255); stroke-miterlimit: 1; stroke-linejoin: round;"
						d="
							M 30 ${_height-35}
							L 30 ${_height-35}
							L 22 ${_height-5}
							L 50 ${_height-35}
						"
					></path>
					<path
						style="fill: rgb(255, 255, 255);"
						d="
							M 30 ${_height-33}
							L 30 ${_height-37}
							L 57 ${_height-37}
							L 40 ${_height-33}
						"
					></path>
				</g>

				<!-- Arial,Comic Sans MS, Helvetica, Impact -->
				<text
					style="font-family: 'Comic Sans MS'; font-size: 25px;"
					y="37"
				>
					${lines.map(line => {
						return `<tspan
							dy="1.2em"
							x="${_width/2}"
							text-anchor="middle"
							style="background:red;"
						>${line}</tspan>`;
					}).join('\n')}
				</text>
			</g>
		</svg>
		`;
		const img = new Image();
		img.onload = function() {
			ctx.drawImage(img, x, y);
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
	const renderFn = new AsyncFunction('loadImage', 'loadFile', 'ctx', 'getDims', 'ops', def);

	return async function drawImage({ ctx, width, height, layer }){
		await init;
		await renderFn(
			loadImage,
			loadFile,
			ctx,
			getDims(width, height),
			{
				filter: filter(ctx, 2*width, 2*height),
				speech: speech(ctx, width, height),
			}
		);
	};
}

export default processDef;
