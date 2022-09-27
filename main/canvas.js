import Concrete from "concretejs";

/*
IDEA: build another multi-layered canvas solution
partly like concretejs and https://github.com/federicojacobi/layeredCanvas/blob/master/layeredCanvas.js
except use canvases stacked in the DOM instead of one canvas combined
only combine when saving image to file
*/

const thumbs = {};

function thumbnail(image) {
	const canvas = document.createElement("canvas");
	canvas.width = 180 * (image.width / image.height);
	canvas.height = 180;
	canvas.getContext('2d').drawImage(image, 0, 0, canvas.width, canvas.height);
	return canvas.toDataURL('image/png');
}

const updateLayerThumb = (number, layer) => {
	thumbs[number] = thumbnail(layer.scene.canvas);
};

const getRender = ({ layer, width, height, layerDef }) => async (args={}) => {
	const { number, render } = layerDef;
	const ctx = layer.scene.context;
	await render({ ctx, width, height, layer: { ...layerDef, ...args } });
	thumbs[number] = thumbnail(layer.scene.canvas);
};

const initLayer = async (args) => {
	const { viewport, layerDef } = args;

	const layer = new Concrete.Layer(layerDef);
	layer.number = layerDef.number;
	layer.alpha = layerDef.alpha !== undefined ? layerDef.alpha : 1;
	layer.selected = layerDef.selected !== undefined ? layerDef.selected : false;
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

const updateLayer = async (args) => {
	const { viewport, layerDef, layer } = args;

	if(typeof layerDef.visible !== "undefined"){
		layer.visible = layerDef.visible;
	}
	if(typeof layerDef.blendMode !== "undefined"){
		layer.blendMode = layerDef.blendMode.toLowerCase();
	}

	const render = getRender({ layerDef, layer, ...args });
	await render();

	return { render };
};

async function Canvas(args) {
	const { width, height, layers:layerDefs, container } = args;
	const viewport = new Concrete.Viewport(args);
	container.style.width = width + "px";
	container.style.height = height + "px";

	const layers = {};
	const renderFns = {};

	for(const layerDef of layerDefs){
		const res = await initLayer({
			viewport, width, height, layerDef
		});
		layers[layerDef.number] = res.layer;

		const updateRenderFn = async (layerDef) => {
			const res = await updateLayer({
				viewport, width, height, layerDef,
				layer: layers[layerDef.number]
			});
			renderFns[layerDef.number] = res.render;
			renderFns[layerDef.number].update = updateRenderFn;
		};

		renderFns[layerDef.number] = res.render;
		renderFns[layerDef.number].update = updateRenderFn;
	}
	viewport.render();

	return {
		thumbs,
		updateLayerThumb,
		viewport,
		layers,
		renderFns
	};
}

export default Canvas;
