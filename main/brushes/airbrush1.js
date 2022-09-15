import ink from './inky1.js';

export default (ctx, radius, x1, y1, x2, y2) => {
	ctx.filter = "blur(40px)";
	//ctx.globalAlpha = .3;
	ink(ctx, 10, x1, y1, x2, y2);
};
