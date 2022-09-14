import Concrete from "./concrete.js";

const thumbs = {};

function thumbnail(image) {
	const canvas = document.createElement("canvas");
	canvas.width = 180 * (image.width / image.height);
	canvas.height = 180;
	canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
	return canvas.toDataURL('image/png');
}

const getRender = ({ layer, width, height, layerDef }) => async (args={}) => {
	const { number, render } = layerDef;
	const ctx = layer.scene.context;
	ctx.clearRect(0, 0, width, height);
	ctx.globalAlpha = args.alpha || layerDef.alpha || 1;
	await render({ ctx, width, height });
	thumbs[number] = thumbnail(layer.scene.canvas);
};

const initLayer = async (args) => {
	const { viewport, layerDef } = args;

	const layer = new Concrete.Layer(layerDef);
	layer.number = layerDef.number;
	viewport.add(layer);

	if(typeof layerDef.visible !== "undefined"){
		layer.visible = layerDef.visible;
	}
	if(typeof layerDef.blendMode !== "undefined"){
		layer.blendMode = layerDef.blendMode.toLowerCase();
	}

	const render = getRender({ layerDef, layer, ...args });
	//render.def = render.toString();
	await render();

	return { layer, render };
};

async function Canvas(args) {
	const { width, height, layers:layerDefs } = args;
	const viewport = new Concrete.Viewport(args);

	const layers = {};
	const renderFns = {};

	for(const layerDef of layerDefs){
		const res = await initLayer({
			viewport, width, height, layerDef
		});
		layers[layerDef.number] = res.layer;
		renderFns[layerDef.number] = res.render;
	}
	viewport.render();

	return {
		thumbs,
		viewport,
		layers,
		renderFns
	};
}

export default Canvas;
