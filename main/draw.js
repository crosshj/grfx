import ink from './brushes/inky1.js';
import pixel from './brushes/pixel1.js';

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

const drawFn = (concrete, brushFn) => {
	//const ctx = canvas.viewport.scene.context;
	const ctx = concrete.layers[0].scene.context;
	// const pattern = ctx.createPattern(brushImage, 'repeat');
	// ctx.strokeStyle = pattern;
	// ctx.fillStyle = pattern;

	return ({ x1, y1, x2, y2 }) => {
		ctx.save();

		const radius = 2.5;
		brushFn(ctx, radius, x1, y1, x2, y2);
		ctx.restore();
		requestAnimationFrame(() => {
			concrete.viewport.render();
		});
	};
};

//https://github.com/Wicklets/WickBrush/tree/main/brushes
const brushes = {
	ink, pixel
};

const attachDrawListener = (concrete, brush) => {
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
		draw = getDraw(canvas, drawFn(concrete, brushFn), state);
		canvas.addEventListener("pointermove", draw, false);
		canvas.addEventListener("pointerup", end, false);
		canvas.addEventListener("pointerleave", end, false);
	};
	canvas.addEventListener("pointerdown", down, false);
};

export default attachDrawListener;

