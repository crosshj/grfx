function getDistance(x1, y1, x2, y2){
	let y = x2 - x1;
	let x = y2 - y1;
	return Math.sqrt(x * x + y * y);
}

export default (ctx, radius, x1, y1, x2, y2) => {
	ctx.beginPath();
	// ctx.rect(
	// 	Math.floor(x2*10)/10, Math.floor(y2*10)/10,
	// 	0.5, 0.5,
	// );
	var roundNearQtr = function(number) {
		return (Math.round(number * 2) / 2).toFixed(2);
	};
	ctx.fillRect(
		roundNearQtr(x2-0.25),
		roundNearQtr(y2-0.25),
		0.5,
		0.5
	);
	ctx.fill();
};