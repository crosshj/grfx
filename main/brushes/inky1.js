function getDistance(x1, y1, x2, y2){
	let y = x2 - x1;
	let x = y2 - y1;
	return Math.sqrt(x * x + y * y);
}

export default (ctx, radius, x1, y1, x2, y2) => {
	const dist = getDistance(x1,y1,x2,y2);
	if(dist <= radius){
		ctx.beginPath();
		ctx.arc(x2, y2, radius, 0, 2 * Math.PI);
		ctx.arc(x1, y1, radius, 0, 2 * Math.PI);
		ctx.fill();
	}
	if(dist > radius){
		const r = dist > 75
			? radius * 2
			: radius * 2 - (dist/75);
		ctx.beginPath();
		ctx.arc(x2, y2, r/2, 0, 2 * Math.PI);
		ctx.arc(x1, y1, r/2, 0, 2 * Math.PI);
		ctx.fill();

		ctx.beginPath();
		ctx.moveTo(x1, y1);
		ctx.lineTo(x2, y2);
		ctx.lineWidth = r;
		ctx.stroke();
	}
};