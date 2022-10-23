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

const brush = (e, eventName) => {
	const x = e?.clientX;
	const y = e?.clientY;
	if(!startX || !startY){
		return brush.before(x, y);
	}
	if(eventName === 'end'){
		return brush.after();
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

brush.after = (ctx) => {
	console.log({ startX, startY, width, height });
	startX = undefined;
	startY = undefined;
	selectTool.style.display = 'none';
};

export default brush;

