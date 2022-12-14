import { timer } from "footils";
import { listen, send } from '@grfx/messages';
import { sleep } from '@grfx/utils';
import Menus from '@grfx/menus';
import { client as Hotkeys } from '@grfx/hotkeys';

import Canvas from './canvas.js';
import layerDef from './layers/layerDef.js';

import { attachDraw, updateDraw } from './draw.js';

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
		canvas?.viewport && canvas.viewport.destroy();
		canvas = undefined;
	}
	const canvasIsNew = !canvas;
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
	attachDraw(canvas, undefined, (number, layer) => {
		//TODO: should update layer def here (perhaps)
		canvas.updateLayerThumb(number, layer);
		send('update-thumbs', { thumbs: canvas.thumbs })
	});
	!scale && setScale(zoom);

	//right/sidebarReady.js:51
	let incomingSelected;
	for(const layer of layers){
		if(layer.selected) incomingSelected = layer.number;
		if(!layer.dirty) continue;

		const canvasLayer = canvas.layers[layer.number];
		if(!canvasLayer) continue;

		const visChange = Boolean(layer.visible !== undefined && canvasLayer.visible !== layer.visible);
		const blendChange = Boolean(layer.blendMode !== undefined && canvasLayer.blendMode !== layer.blendMode);
		const alphaChange = Boolean(layer.alpha !== undefined && canvasLayer.alphaMode !== layer.alpha);
		const defChange =  !(visChange || blendChange || alphaChange);

		if(visChange)
			canvasLayer.visible = layer.visible;
		if(blendChange)
			canvasLayer.blendMode = layer.blendMode;
		if(alphaChange)
			canvasLayer.alpha = layer.alpha;
		if(defChange){
			await canvas.renderFns[layer.number].update({
				...layer,
				render: layerDef(layer)
			});
			await canvas.renderFns[layer.number](layer);
		}
	}
	if(!canvasIsNew){
		canvas.viewport.render();
		for(const [number, layer] of Object.entries(canvas.layers)){
			layer.selected = false;
		}
		canvas.layers[incomingSelected] && (canvas.layers[incomingSelected].selected = true);
	}
	send('update-thumbs', { thumbs: canvas.thumbs });

	//timer.log(timerLabel);
	return;
});

listen('tool-update', (tool) => {
	//console.log('tool update: ', tool);
	const { op='' } = tool;
	if(op){
		console.log('TODO: upate tool properties');
		return;
	}
	attachDraw(canvas, tool, (number, layer) => {
		//TODO: should update layer def here (perhaps)
		canvas.updateLayerThumb(number, layer);
		send('update-thumbs', { thumbs: canvas.thumbs })
	});
});

listen('color-update', ({ primary, secondary }) => {
	updateDraw({ color: { primary, secondary } });
});

listen('select-canvas', ({ selection }) => {
	if(!selection) return;

	const [p1,p2] = selection;
	const ctx = canvas?.toolLayer?.scene?.context;
	ctx.imageSmoothingEnabled = false;
	ctx.translate(0.5, 0.5);
	ctx.strokeStyle = "white";
	ctx.lineWidth = 1;
	ctx.lineCap = 'square';
	ctx.setLineDash([3]);
	ctx.beginPath();

	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p1.x, p2.y);
	ctx.lineTo(p2.x, p2.y);

	ctx.moveTo(p1.x, p1.y);
	ctx.lineTo(p2.x, p1.y);
	ctx.lineTo(p2.x, p2.y);

	ctx.stroke();
	ctx.translate(-0.5, -0.5);
	canvas.viewport.render();
});

listen('contextmenu-select', (args) => {
	const { key } = args;
	console.log(`TODO: main canvas - ${key}`)
});

send('ping', 'main');

