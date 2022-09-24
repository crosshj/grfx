import fs from '../../shared/fs.js';
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

const processDef = (layer) => {
	const AsyncFunction = (async function () {}).constructor;
	const def = layer.type === '2d'
	? `
		ctx.save();
		${layer.def}
		ctx.restore();
	`
	: layer.def;
	const renderFn = new AsyncFunction('loadImage', 'loadFile', 'ctx', 'getDims', 'alpha', def);

	return async function drawImage({ ctx, width, height, layer }){
		await init;
		const alpha = typeof layer.alpha !== "undefined"
			? layer.alpha
			: 1;
		await renderFn(loadImage, loadFile, ctx, getDims(width, height), alpha);
	};
}

export default processDef;
