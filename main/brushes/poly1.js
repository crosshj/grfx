let startX;
let startY;
let drawOver;

const brush = (ctx, radius, path, opts={}) => {
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
};

brush.before = (ctx) => {
	ctx.save();
};

brush.after = (ctx) => {
	ctx.restore();
	startX = undefined;
	startY = undefined;
	drawOver = undefined;
};

export default brush;

