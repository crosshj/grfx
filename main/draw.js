import { getMousePos } from './utils.js';

import ink from './brushes/inky1.js';
import pixel from './brushes/pixel1.js';
import airbrush from './brushes/airbrush1.js';
import erase from './brushes/erase1.js';
import rect from './brushes/rect1.js';
import rounded from './brushes/rounded1.js';
import ellipse from './brushes/ellipse1.js';
import line from './brushes/line1.js';
import curve from './brushes/curve1.js';
import selectBox from './brushes/selectBox1.js';
import selectFree from './brushes/selectFree1.js';
import poly from './brushes/poly1.js';

const brushes = {
	brush: ink,
	pencil: pixel,
	airbrush,
	erase,
	rect,
	rounded,
	ellipse,
	line,
	curve,
	poly,
	'select-box': selectBox,
	'select-free': selectFree
};

let opts = {
	color: {
		primary: '#000000',
		secondary: '#ffffff'
	}
};
const cursor = document.querySelector('.cursor');


const state = {
	prev: null
};
let eventState = {
	down: false,
	brush: undefined,
	updateThumbs: undefined,
	concrete: undefined,
};
const setCursor = () => {
	if(['select-box'].includes(eventState?.brush?.id)){
		document.body.style.cursor = "crosshair";
		cursor.style.display = "none";
	} else {
		document.body.style.cursor = "none";
		cursor.style.display = "";
	}
};

let drawStarted;
const draw = (e, eventName="") => {
	const { concrete, brush, updateThumbs } = eventState;
	const { canvas } = concrete.viewport?.scene || {};
	if(!concrete || !updateThumbs) return;

	let event = eventName;
	if(state.prev !== null){
		event = drawStarted ? "" : "start";
	}
	const brushFn = brushes[brush?.id] || brushes[brush];
	if(!brushFn){
		return console.log('TODO: add tool - ' + brush);
	}
	if(['select-box'].includes(eventState.brush.id)){
		return brushFn(e, event, canvas, concrete);
	}

	const pos = getMousePos(canvas, e);
	let path;
	if(state.prev !== null){
		path = {
			x1: state.prev.x,
			y1: state.prev.y,
			x2: pos.x,
			y2: pos.y
		}
	}
	if(state.prev === null && eventName === "end"){
		path = {
			x1: pos.x,
			y1: pos.y,
			x2: pos.x,
			y2: pos.y
		};
	}
	const [selectedNumber, selected] = (Object.entries(concrete.layers)).find(([,x]) => x.selected);
	const ctx = selected.scene.context;
	if(event === "start"){
		console.log("brushStart");
		//if(!(brushFn.before || ctx.save)) return;
		(brushFn.before ? brushFn.before(ctx) : ctx.save());
		drawStarted = true;
	}
	const radius = 2.5;
	path && brushFn(ctx, radius, path, opts);
	
	if(event === "end"){
		console.log("brushEnd");
		drawStarted = false;
		//if(!(brushFn.after || ctx.save)) return;
		(brushFn.after ? brushFn.after(ctx) : ctx.restore());
	}
	state.prev = pos;
	requestAnimationFrame(() => {
		concrete.viewport.render();
		updateThumbs(selectedNumber, selected, path);
	});
};

const eventHandler = (e) => {
	const { type, target: { tagName } } = e;

	if(type === "pointerdown"){
		state.prev = null;
		eventState.down = true;
		return;
	}
	if(type === "pointerup"){
		state.prev = null;
		draw(undefined, "end");
		eventState.down = false;
		return;
	}
	if(["pointerleave", "pointercancel"].includes(type)){
		state.prev = null;
		cursor.style.display = "none";
		return;
	}
	if(type === "pointerenter"){
		setCursor();
		return;
	}
	if(type === "pointermove"){
		cursor.style.left = e.clientX + 'px';
		cursor.style.top = e.clientY + 'px';
		if(!eventState.down) return
		if(['select-box'].includes(eventState.brush.id)){
			draw && draw(e);
			return;
		}
		if(tagName !== "CANVAS"){
			state.prev = null;
			draw && draw(e, "end");
			return;
		}
		draw && draw(e);
		return;
	}
};

const addListeners = () => {
	removeListeners();
	document.body.addEventListener("pointerdown", eventHandler, false);
	document.body.addEventListener("pointermove", eventHandler, false);
	document.body.addEventListener("pointerup", eventHandler, false);
	document.body.addEventListener("pointerleave", eventHandler, false);
	document.body.addEventListener("pointerenter", eventHandler, false);
	document.body.addEventListener("pointercancel", eventHandler, false);
};
const removeListeners = () => {
	document.body.removeEventListener("pointerdown", eventHandler, false);
	document.body.removeEventListener("pointermove", eventHandler, false);
	document.body.removeEventListener("pointerup", eventHandler, false);
	document.body.removeEventListener("pointerleave", eventHandler, false);
	document.body.removeEventListener("pointerenter", eventHandler, false);
	document.body.removeEventListener("pointercancel", eventHandler, false);
};

export const attachDraw = (concrete, brush, updateThumbs) => {
	eventState = {
		...eventState,
		concrete,
		canvas: concrete?.viewport?.scene?.canvas,
		brush: brush || eventState.brush,
		updateThumbs,
	};
	setCursor();
	addListeners();
};

export const detachDraw = removeListeners;

export const updateDraw = (props) => {
	opts = { ...opts, ...props };
};


