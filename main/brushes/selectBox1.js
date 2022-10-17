
let startX;
let startY;
let drawOver;

export default (ctx, radius, path, opts={}) => {
	const {x1, y1, x2, y2} = path;

	drawOver && ctx.putImageData(drawOver,0,0);
	drawOver = drawOver || ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
	startX = startX || x1;
	startY = startY || y1;

	ctx.strokeStyle = "white";
	ctx.setLineDash([5, 5]);
	ctx.beginPath();

	ctx.moveTo(startX, startY);
	ctx.lineTo(startX, y2);
	ctx.lineTo(x2, y2);

	ctx.moveTo(startX, startY);
	ctx.lineTo(x2, startY);
	ctx.lineTo(x2, y2);

	ctx.stroke();

	if(x1 === x2 && y1 === y2){
		startX = undefined;
		startY = undefined;
		drawOver = undefined;
	}
};
