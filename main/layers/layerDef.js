import fs from '../../shared/fs.js';
const init = fs.init();

const loadImage = (path) => new Promise(async (resolve) => {
	const image = new Image();
	image.onload = () => resolve(image);
	image.src = path.includes('http')
		? path
		: await fs.readFile({ path });
});

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
	const renderFn = new AsyncFunction('loadImage', 'ctx', 'getDims', layer.def);

	return async function drawImage({ ctx, width, height }){
		await init;
		await renderFn(loadImage, ctx, getDims(width, height));
	};
}

export default processDef;
