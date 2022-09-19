import fs from '../../shared/fs.js';
const init = fs.init();

const images = {};

const loadImage = (url) => {
	return async function drawImage({ ctx, width, height }){
		await init;
		const image = new Promise(async (resolve) => {
			const image = new Image();
			image.onload = () => resolve(image);
			image.src = await fs.readFile({ path: url });
		});
		images[url] = images[url] || await image;
		const i = images[url];
		const sx = 0;
		const sy = 0;
		const sWidth = i.width;
		const sHeight = i.height;
		const sAspect = i.height/i.width;

		const dx = 0;
		const dy = 0.25 * (height - height * sAspect);
		const dWidth = width;
		const dHeight = height*sAspect;

		ctx.drawImage(i, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
	};
}

export default loadImage;
