import inky from './inky1.js';

export default (ctx, radius, path, opts={}) => {
	ctx.globalCompositeOperation = 'destination-out';
	inky(ctx, 10, path);
};
