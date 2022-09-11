import Canvas from './canvas.js';
import loadImage from './layers/image.js';
import { send } from '../shared/messages.js';

const layers = [{
	number: 1,
	render: loadImage("/indexDB/robot.jpg")
}, {
	number: 2,
	render: loadImage("/indexDB/squid.jpg")
}, {
	number: 3,
	render: loadImage("/indexDB/gold.jpg")
}, {
	number: 4,
	visible: false,
	render: loadImage("/indexDB/owl.jpg")
}, {
	number: 5,
	render: loadImage("/indexDB/sky.jpg")
}];

const container = document.querySelector('.canvasContainer');

const canvas = await Canvas({
	width: 1440,
	height: 1080,
	layers,
	container
});
send('update-thumbs', { thumbs: canvas.thumbs });


// https://stackoverflow.com/a/66874077
const mouseStrength = 1.4;
const pinchStrength = 0.003;
let scale = container.getBoundingClientRect().width / container.offsetWidth;

document.body.addEventListener('wheel', (ev) => {
	ev.preventDefault();
	ev.stopPropagation();

	const isPinch = Math.abs(ev.deltaY) < 50;

	if (isPinch) {
		const factor = 1 - pinchStrength * ev.deltaY;
		scale *= factor;
		//console.log(`Pinch: scale is ${scale}`);
	} else {
		const factor = ev.deltaY < 0
			? mouseStrength
			: 1.0 / mouseStrength;
		scale *= factor;
		//console.log(`Mouse: scale is ${scale}`);
	}
	container.style.transform = `scale(${scale})`;
}, { passive: false });

