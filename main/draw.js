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

// const brushImage = await new Promise(async (resolve) => {
// 	const image = new Image();
// 	image.onload = () => resolve(image);
// 	image.src = 'https://www.html5canvastutorials.com/demos/assets/wood-pattern.png';
// });

// function getOffset(obj) {
// 	var offsetLeft = 0;
// 	var offsetTop = 0;
// 	do {
// 		if (!isNaN(obj.offsetLeft)) {
// 			offsetLeft += obj.offsetLeft;
// 		}
// 		if (!isNaN(obj.offsetTop)) {
// 			offsetTop += obj.offsetTop;
// 		}
// 	} while(obj = obj.offsetParent );
// 	return {left: offsetLeft, top: offsetTop};
// }

function getMousePos(canvas, evt) {
	let ctx = canvas.getContext("2d");
	var rect = canvas.getBoundingClientRect(), // abs. size of element
			scaleX = canvas.width / rect.width,    // relationship bitmap vs. element for X
			scaleY = canvas.height / rect.height;  // relationship bitmap vs. element for Y

	const screenX = (evt.clientX - rect.left) * scaleX;
	const screenY = (evt.clientY - rect.top) * scaleY;
	let matrix = ctx.getTransform();
	var imatrix = matrix.invertSelf();
	let x = screenX * imatrix.a + screenY * imatrix.c + imatrix.e;
	let y = screenX * imatrix.b + screenY * imatrix.d + imatrix.f;
	return { x, y };
}

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

let drawStarted;
const drawFn = (path, event) => {
	const { brush, concrete, updateThumbs } = eventState;
	if(!concrete || !updateThumbs) return;
	const brushFn = brushes[brush?.id] || brushes[brush];
	if(!brushFn){
		return console.log('TODO: add tool - ' + brush);
	}
	if(['select-box'].includes(brush.id)){
		return brushFn(path, event);
	}
	const { canvas } = concrete.viewport?.scene || {};

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

	requestAnimationFrame(() => {
		concrete.viewport.render();
		updateThumbs(selectedNumber, selected, path);
	});
};

const draw = (e, eventName="") => {
	const { concrete, brush } = eventState;
	const { canvas } = concrete.viewport?.scene || {};
	if(['select-box'].includes(eventState.brush.id)){
		return drawFn(e);
	}
	if(!concrete) return;

	//const offset  = getOffset(canvas);
	const pos = getMousePos(canvas, e);
	if(state.prev !== null){
		drawFn({
			x1: state.prev.x,
			y1: state.prev.y,
			x2: pos.x,
			y2: pos.y
		}, drawStarted ? "" : "start");
	}
	if(state.prev === null && eventName === "end"){
		drawFn({
			x1: pos.x,
			y1: pos.y,
			x2: pos.x,
			y2: pos.y
		}, eventName);
	}
	state.prev = pos;
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
		drawFn(undefined, "end");
		eventState.down = false;
		return;
	}
	if(["pointerleave", "pointercancel"].includes(type)){
		state.prev = null;
		cursor.style.display = "none";
		return;
	}
	if(type === "pointerenter"){
		cursor.style.display = "";
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
	addListeners();
};

export const detachDraw = removeListeners;

export const updateDraw = (props) => {
	opts = { ...opts, ...props };
};


