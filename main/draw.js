import ink from './brushes/inky1.js';
import pixel from './brushes/pixel1.js';
import airbrush from './brushes/airbrush1.js';

const brushes = {
	ink, pixel, airbrush
};

const brushImage = await new Promise(async (resolve) => {
	const image = new Image();
	image.onload = () => resolve(image);
	image.src = 'https://www.html5canvastutorials.com/demos/assets/wood-pattern.png';
});

function getOffset(obj) {
	var offsetLeft = 0;
	var offsetTop = 0;
	do {
		if (!isNaN(obj.offsetLeft)) {
			offsetLeft += obj.offsetLeft;
		}
		if (!isNaN(obj.offsetTop)) {
			offsetTop += obj.offsetTop;
		}
	} while(obj = obj.offsetParent );
	return {left: offsetLeft, top: offsetTop};
}

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

const getDraw = (canvas, listen, state) => (e, eventName="") => {
	const offset  = getOffset(canvas);
	const pos = getMousePos(canvas, e);
	if(state.prev !== null){
		listen({
			x1: state.prev.x,
			y1: state.prev.y,
			x2: pos.x,
			y2: pos.y
		});
	}
	if(state.prev === null && eventName === "end"){
		listen({
			x1: pos.x,
			y1: pos.y,
			x2: pos.x,
			y2: pos.y
		});
	}
	state.prev = pos;
};

const drawFn = (concrete, brushFn, updateThumbs) => {
	//const ctx = canvas.viewport.scene.context;
	//console.log(selectedNumber, selected)

	//const ctx = concrete.layers[0].scene.context;
	// const pattern = ctx.createPattern(brushImage, 'repeat');
	// ctx.strokeStyle = pattern;
	// ctx.fillStyle = pattern;

	return (path) => {
		const [selectedNumber, selected] = (Object.entries(concrete.layers)).find(([,x]) => x.selected);
		const ctx = selected.scene.context;
		if(!ctx.save) return;
		ctx.save();

		const radius = 2.5;
		brushFn(ctx, radius, path);
		ctx.restore();
		requestAnimationFrame(() => {
			concrete.viewport.render();
			updateThumbs(selectedNumber, selected, path);
		});
	};
};

let attached;
export const attachDraw = (concrete, brush, updateThumbs) => {
	if(attached) return;

	const brushFn = brushes[brush] || brushes.pixel;
	const { canvas } = concrete.viewport.scene;

	const state = {
		prev: null
	};

	let draw;
	const end = (e) => {
		draw(e, "end");
		canvas.removeEventListener("pointermove", draw, false);
		canvas.removeEventListener("pointerup", end, false);
		canvas.removeEventListener("pointerleave", end, false);
		state.prev = null;
		draw = null;
	};
	const down = () => {
		draw = getDraw(canvas, drawFn(concrete, brushFn, updateThumbs), state);
		canvas.addEventListener("pointermove", draw, false);
		canvas.addEventListener("pointerup", end, false);
		canvas.addEventListener("pointerleave", end, false);
	};
	canvas.addEventListener("pointerdown", down, false);
	attached = down;
};

export const detachDraw = (concrete) => {
	const { canvas } = concrete.viewport.scene;
	canvas.removeEventListener("pointerdown", attached, false);
	attached = undefined;
};


