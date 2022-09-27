import { timer } from "footils";
import { listen, send } from '@grfx/messages';
import { sleep } from '@grfx/utils';
import Menus from '@grfx/menus';
import { client as Hotkeys } from '@grfx/hotkeys';

import Canvas from './canvas.js';
import layerDef from './layers/layerDef.js';
import './cursor.js';
import { attachDraw, detachDraw } from './draw.js';

Hotkeys();

const container = document.querySelector('.canvasContainer');
let canvas;

// https://stackoverflow.com/a/66874077
const mouseStrength = 1.4;
const pinchStrength = 0.002;
let scale;

const setScale = (s) => {
	scale = s;
	container.style.transform = `scale(${s})`;
};

document.body.addEventListener('wheel', (ev) => {
	let _scale = scale || 1;
	ev.preventDefault();
	ev.stopPropagation();

	const isPinch = Math.abs(ev.deltaY) < 50;

	if (isPinch) {
		const factor = 1 - pinchStrength * ev.deltaY;
		_scale *= factor;
		//console.log(`Pinch: scale is ${_scale}`);
	} else {
		const factor = ev.deltaY < 0
			? mouseStrength
			: 1.0 / mouseStrength;
		_scale *= factor;
		//console.log(`Mouse: scale is ${_scale}`);
	}

	setScale(_scale);

}, { passive: false });


listen('file-update', async (args) => {
	const timerLabel = 'main: file-update [' + Date.now() + "]";
	timer.start(timerLabel);

	const { layers, width, height, zoom, tool, dirty } = args;

	if(dirty){
		detachDraw(canvas);
		canvas.viewport.destroy();
		canvas = undefined;
	}

	canvas = canvas || await Canvas({
		width,
		height,
		layers: layers
			.sort((a,b) => b.number-a.number)
			.map(layer => ({
			...layer,
			render: layerDef(layer)
			})
		),
		container
	});
	attachDraw(canvas, tool);
	!scale && setScale(zoom);

	//right/sidebarReady.js:51
	for(const layer of layers){
		if(layer.dirty){
			console.log('layer is dirty')
			await canvas.renderFns[layer.number].update({
				...layer,
				render: layerDef(layer)
			});
		}
		const canvasLayer = canvas.layers[layer.number];
		const render = canvas.renderFns[layer.number];
		if(!canvasLayer) continue;

		if(layer.visible !== undefined)
			canvasLayer.visible = layer.visible;
		if(layer.blendMode !== undefined){
			canvasLayer.blendMode = layer.blendMode;
		}

		await render(layer);
	}
	canvas.viewport.render();
	send('update-thumbs', { thumbs: canvas.thumbs });

	timer.log(timerLabel);
	return;
});

send('ping', 'main');

