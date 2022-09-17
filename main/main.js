import { listen, send } from '../shared/messages.js';
import { sleep } from '../shared/utils.js';
import Canvas from './canvas.js';
import loadImage from './layers/image.js';
import './cursor.js';
import attachDraw from './draw.js';

const container = document.querySelector('.canvasContainer');
let canvas;


listen('layers-update', async ({ type, layers }) => {
	if(type === "layers-update" && !canvas){
		canvas = await Canvas({
			width: 1440,
			height: 1080,
			layers: layers.reverse().map(layer => ({
				...layer,
				render: loadImage(layer.image)
			})),
			container
		});
		send('update-thumbs', { thumbs: canvas.thumbs });
		attachDraw(canvas, "airbrush");
		return
	}
	if(type === "layers-update" && canvas){
		//right/sidebarReady.js:51
		for(const layer of layers){
			const canvasLayer = canvas.layers[layer.number];
			const render = canvas.renderFns[layer.number];
			if(!canvasLayer) continue;

			if(layer.visible !== undefined)
				canvasLayer.visible = layer.visible;
			if(layer.blendMode !== undefined){
				canvasLayer.blendMode = layer.blendMode;
			}
			if(layer.alpha !== undefined)
				render(layer);
		}
		canvas.viewport.render();
		await sleep(1);
		send('update-thumbs', { thumbs: canvas.thumbs });
		return;
	}
});

send('ping', 'main');

// https://stackoverflow.com/a/66874077
const mouseStrength = 1.4;
const pinchStrength = 0.002;
let scale;

document.body.addEventListener('wheel', (ev) => {
	scale = scale ||  container.getBoundingClientRect().width / container.offsetWidth;
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

