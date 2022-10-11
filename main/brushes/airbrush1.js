import ink from './inky1.js';

export default (ctx, radius, path, opts={}) => {
	ctx.filter = "blur(10px)";
	//ctx.globalAlpha = .3;
	ink(ctx, 1, path, opts);
};
