import { camelToDashed } from '../shared/utils.js';

const ShowModal = (modal, data) => {
	const event = new CustomEvent('contextMenuShow', {
		bubbles: true,
		detail: {
			modal,
			list: [],
			data,
			parent: "core"
		}
	});
	window.top.dispatchEvent(event);
};

const layerAlpha = async (context, args) => {
	const { update, currentFile } = context;
	const { number, alpha } = args;
	const { layers } = currentFile;
	const l = layers.find(x => x.number === Number(number));
	l.alpha = alpha;
	update();
};
const layerBlendMode = async (context, args) => {
	const { update, currentFile } = context;
	const { number, mode } = args;
	const { layers } = currentFile;
	const l = layers.find(x => x.number === Number(number));
	l.blendMode = mode;
	update();
};
const layerSelect = async (context, args) => {
	const { update, currentFile } = context;
	const { number } = args;
	const { layers } = currentFile;
	for(const layer of layers){
		layer.selected = undefined;
		if(layer.number !== number) continue;
		layer.selected = true;
	}
	await update();
};
const layerVisibility = async (context, args) => {
	const { update, currentFile } = context;
	const { number, visible } = args;
	const { layers } = currentFile;
	const l = layers.find(x => x.number === Number(number));
	l.visible = visible;
	await update();
};
const layerNew = async (context, args) => {
	const { layout } = context;
	layout.showPane({ name: "editor" });
};
const layerAdd = async (context, args) => {
	const { def, name, type } = args;
	const { update, currentFile } = context;
	const { layers } = currentFile;
	layers.forEach(x => {
		x.number+=1;
		x.selected = false;
	});
	currentFile.dirty = true;
	layers.push({
		def, name, type,
		number: 0,
		selected: true
	});
	await update();
	currentFile.dirty = undefined;
};
const layerUpdate = async (context, args) => {
	const layer = args;
	const { update, currentFile } = context;
	const { layers } = currentFile;
	const l = layers.find(x => x.number === Number(layer.number));
	if(!l) return console.error('could not find layer to update');
	layer.def && (l.def = layer.def);
	layer.name && (l.name = layer.name);
	l.dirty = true;
	await update();
	l.dirty = undefined;
};
const showLayerSource = async (context, args) => {
	const { layout } = context;
	layout.showPane({ name: "editor" })
};
const hideLayerSource = async (context, args) => {
	const { layout } = context;
	layout.hidePane({ name: "editor" })
};
const layersOrder = async (context, args) => {
	const { order } = args;
	const { update, currentFile } = context;
	const { layers } = currentFile;
	for(const [i, o] of Object.entries(order)){
		layers[o].number = Number(i);
	}
	currentFile.layers = currentFile.layers.sort((a,b) => a.number-b.number);
	currentFile.dirty = true;
	await update();
	currentFile.dirty = undefined;
};

const menuLayerNew = async (context) => {
	const { host } = context;
	const newLayer = {};
	await host.broadcast({
		eventName: 'layer-new',
		type: 'layer-new',
		data: newLayer,
	});
	await layerNew(context, newLayer);
};
const menuShowLayerSource = async (context) => {
	const { host, currentFile } = context;
	const { layers } = currentFile;
	const selectedLayer = layers.find(x => x.selected);
	await host.broadcast({
		eventName: 'show-layer-source',
		type: 'show-layer-source',
		data: selectedLayer,
	});
	await showLayerSource(context, selectedLayer);
};
const menuImageSize = async (context) => {
	const { currentFile } = context;
	const { width, height } = currentFile;
	ShowModal('imageSize', { width, height });
};
const menuCanvasSize = async (context) => {
	const { currentFile } = context;
	const { width, height } = currentFile;
	ShowModal('canvasSize', { width, height });
};

const actions = {
	layerAlpha,
	layerBlendMode,
	layerNew,
	layerAdd,
	layerSelect,
	layerVisibility,
	layerUpdate,
	showLayerSource,
	hideLayerSource,
	layersOrder,

	menuLayerNew, //menu-layer-new
	menuShowLayerSource, // menu-show-layer-source
	menuImageSize, // menu-image-size
	menuCanvasSize, // menu-canvas-size
};

const camelPropsAsDashed = obj => Object.entries(obj)
	.reduce((all, [k,v]) => ({
		...all,
		[camelToDashed(k)]: v
	}), {})

export default camelPropsAsDashed(actions);
