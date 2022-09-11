import fs from '../../shared/fs.js';

const loadImage = (url) => async function loadImage({ ctx, width, height}){
	const src = await fs.readImage(url);

	await new Promise((resolve) => {
		const image = new Image();
		image.onload = () => {
			const sx = 0;
			const sy = 0;
			const sWidth = image.width;
			const sHeight = image.height;
			const sAspect = image.height/image.width;

			const dx = 0;
			const dy = 0.25 * (height - height * sAspect);
			const dWidth = width;
			const dHeight = height*sAspect;

			ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
			resolve();
		};
		image.src = src;
	});
};

export default loadImage;
