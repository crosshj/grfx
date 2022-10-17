let startX;
let startY;
let drawOver;

export default (ctx, radius, path, opts={}) => {
	if(opts?.color?.primary){
		ctx.fillStyle = opts.color.secondary;
		ctx.strokeStyle = opts.color.primary;
	}
	const {x1, y1, x2, y2} = path;

	drawOver && ctx.putImageData(drawOver,0,0);
	drawOver = drawOver || ctx.getImageData(0,0,ctx.canvas.width,ctx.canvas.height);
	startX = startX || x1;
	startY = startY || y1;

	ctx.beginPath();
	ctx.moveTo(startX, startY);
	ctx.lineTo(x2, y2);
	ctx.stroke();

	if(x1 === x2 && y1 === y2){
		startX = undefined;
		startY = undefined;
		drawOver = undefined;
	}
};