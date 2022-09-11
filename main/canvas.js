import concretejs from "https://cdn.skypack.dev/concretejs";
const { Concrete } = concretejs;

const thumbs = [];

function thumbnail(image) {
	const canvas = document.createElement("canvas");
	canvas.width = 180 * (image.width / image.height);
	canvas.height = 180;
	canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
	return canvas.toDataURL('image/png');
}

const getRender = (layerDef) => async ({
	layer, alpha=1, width, height
}) => {
	const { number, render } = layerDef;
	const ctx = layer.scene.context;
	ctx.clearRect(0, 0, width, height);
	ctx.globalAlpha = alpha;
	await render({ ctx, width, height});
	thumbs[number] = thumbnail(layer.scene.canvas);
};

const initLayer = async (args) => {
	const { viewport, layerDef } = args;

	const layer = new Concrete.Layer(layerDef);
	if(typeof layerDef.visible !== "undefined"){
		layer.visible = layerDef.visible;
	}
	viewport.add(layer);

	const render = getRender(layerDef);
	render.def = render.toString();

	await render({ layer, ...args });

	return { layer, render };
};

async function Canvas(args) {
	const { width, height, layers:layerDefs } = args;
	const viewport = new Concrete.Viewport(args);

	const layers = [];
	const renderFns = [];

	for(const layerDef of layerDefs){
		const res = await initLayer({
			viewport, width, height, layerDef
		});
		layers.push(res.layer);
		renderFns.push(res.render);
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
