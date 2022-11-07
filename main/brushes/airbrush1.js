import ink from './inky1.js';

const brush = (ctx, radius, path, opts={}) => {
	ink(ctx, 1, path, opts);
};
brush.before = (ctx) => {
	ctx.save();
	ctx.filter = "blur(10px)";
	//ctx.globalAlpha = .3;
};
brush.after = (ctx) => {
	ctx.restore();
};

export default brush;
