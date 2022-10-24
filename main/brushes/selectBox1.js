import { send } from '@grfx/messages';

let startX;
let startY;
let width;
let height;

const selectTool = document.querySelector('.selectTool');
selectTool.style.position = 'absolute';
selectTool.style.boxShadow = "0 0 0 1px black";
selectTool.style.outline = "dashed 1px white";

selectTool.style.display = 'none';
selectTool.style.pointerEvents = 'none';

import { getMousePos } from '../utils.js';

const brush = (e, eventName, canvas) => {
	const x = e?.clientX;
	const y = e?.clientY;
	if(!startX || !startY){
		return brush.before(x, y);
	}
	if(eventName === 'end'){
		return brush.after(canvas);
	}
	width = x-startX;
	height = y-startY;

	if(width < 0){
		selectTool.style.left = x + 'px'
	}
	if(height < 0){
		selectTool.style.top = y + 'px'
	}

	selectTool.style.width = Math.abs(width) + 'px';
	selectTool.style.height = Math.abs(height) + 'px';
};

brush.before = (x, y) => {
	startX = x;
	startY = y;
	selectTool.style.display = '';
	selectTool.style.left = x + 'px';
	selectTool.style.top = y + 'px';
	selectTool.style.width = 0;
	selectTool.style.height = 0;
};

brush.after = (canvas) => {
	const pos1 = getMousePos(canvas, {
		clientX: startX,
		clientY: startY,
	});
	const pos2 = getMousePos(canvas, {
		clientX: startX + width,
		clientY: startY + height,
	});
	send('select-canvas', { selection: [pos1, pos2] });

	startX = undefined;
	startY = undefined;
	selectTool.style.display = 'none';
};

export default brush;

