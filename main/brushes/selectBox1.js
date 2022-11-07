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

const brush = (e, eventName, canvas, concrete) => {
	const x = e?.clientX;
	const y = e?.clientY;
	if(eventName === 'end'){
		return brush.after(canvas, concrete);
	}
	if(!startX || !startY){
		return brush.before(x, y, concrete);
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

brush.before = (x, y, concrete) => {
	startX = x;
	startY = y;
	selectTool.style.display = '';
	selectTool.style.left = x + 'px';
	selectTool.style.top = y + 'px';
	selectTool.style.width = 0;
	selectTool.style.height = 0;
	const ctx = concrete?.toolLayer?.scene?.context;
	ctx.clearRect(0,0,concrete.viewport.width, concrete.viewport.height);
	concrete.viewport.render();
};

brush.after = (canvas, concrete) => {
	selectTool.style.display = 'none';

	if(!startX || !startY){
		const ctx = concrete?.toolLayer?.scene?.context;
		ctx.clearRect(0,0,concrete.viewport.width, concrete.viewport.height);
		concrete.viewport.render();
		send('select-canvas', { selection: undefined });
		return;
	}
	const pos1 = getMousePos(canvas, {
		clientX: startX,
		clientY: startY,
	});
	const pos2 = getMousePos(canvas, {
		clientX: startX + width,
		clientY: startY + height,
	});
	startX = undefined;
	startY = undefined;

	if(pos1.x < pos2.x){
		pos1.x = Math.floor(pos1.x);
		pos2.x = Math.ceil(pos2.x);
	} else {
		pos1.x = Math.ceil(pos1.x);
		pos2.x = Math.floor(pos2.x);
	}
	if(pos1.y < pos2.y){
		pos1.y = Math.floor(pos1.y);
		pos2.y = Math.ceil(pos2.y);
	} else {
		pos1.y = Math.ceil(pos1.y);
		pos2.y = Math.floor(pos2.y);
	}
	for(const pos of [pos1, pos2]){
		if(pos.x < 0) pos.x = 0;
		if(pos.y < 0) pos.y = 0;
		if(pos.x > canvas.width-1) pos.x = canvas.width-1;
		if(pos.y > canvas.height-1) pos.y = canvas.height-1;
	}
	send('select-canvas', { selection: [pos1, pos2] });

};

export default brush;

