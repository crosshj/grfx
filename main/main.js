import fs from '../shared/fs.js';

const canvas = document.querySelector('canvas');

// https://stackoverflow.com/a/66874077
const mouseStrength = 1.4;
const pinchStrength = 0.003;
let scale = 1.0;

document.body.addEventListener('wheel', (ev) => {
	ev.preventDefault();
	ev.stopPropagation();

	const isPinch = Math.abs(ev.deltaY) < 50;

	if (isPinch) {
		let factor = 1 - pinchStrength * ev.deltaY;
		scale *= factor;
		//console.log(`Pinch: scale is ${scale}`);
	} else {
		let factor = ev.deltaY < 0
			? mouseStrength
			: 1.0 / mouseStrength;
		scale *= factor;
		//console.log(`Mouse: scale is ${scale}`);
	}
	canvas.style.transform = `scale(${scale})`;
}, { passive: false });

const image = new Image();
image.onload = () => {
	const ctx = canvas.getContext('2d');
	const sx = 0;
	const sy = 0;
	const sWidth = image.width;
	const sHeight = image.height;
	const sAspect = image.width/image.height;

	const dx = 0;
	const dy = 0; //0.5 * (canvas.height - canvas.width * sAspect);
	const dWidth = canvas.width;
	//const dHeight = canvas.height;
	const dHeight = canvas.width * sAspect;

	ctx.drawImage(image, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight);
};
image.src = await fs.readImage("/indexDB/owl.jpg");
