var roundNearQtr = function(number) {
	return (Math.round(number * 2) / 2).toFixed(2);
};

export default (ctx, radius, path) => {
	const {x1, y1, x2, y2} = path;
	ctx.beginPath();
	// ctx.rect(
	// 	Math.floor(x2*10)/10, Math.floor(y2*10)/10,
	// 	0.5, 0.5,
	// );
	ctx.fillRect(
		roundNearQtr(x2-0.25),
		roundNearQtr(y2-0.25),
		0.5,
		0.5
	);
	ctx.fill();
};