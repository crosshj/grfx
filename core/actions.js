import fs from '@grfx/fs';
import {
	camelToDashed,
	clone,
	dataUriImageFromUrl,
	dataUriToBlob
} from '@grfx/utils';

import ToolSettings from '../left/toolSettings.js';

const ShowModal = (context) => async (modal, data) => {
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
	if(context?.pending?.reject){
		context.pending.reject();
	}
	return new Promise((resolve, reject) => {
		context.pending = { resolve, reject };
	});
};
const LayerDefFromFilename = (name) => `
const image = await loadImage("${name}");
ctx.drawImage(
	image,
	0,0, image.width, image.height,
	0,0, image.width, image.height
);
`;
const SelectedLayer = (context) => {
	const { host, currentFile } = context;
	const { layers } = currentFile;
	const selectedLayer = layers.find(x => x.selected);
	return selectedLayer;
}

const layerAlpha = async (context, args) => {
	const { update, currentFile } = context;
	const { number, alpha } = args;
	const { layers } = currentFile;
	const l = layers.find(x => x.number === Number(number));
	l.alpha = alpha;
	context.state.layer.update(l.id, l);
	l.dirty = true;
	await update();
	l.dirty = undefined;
};
const layerBlendMode = async (context, args) => {
	const { update, currentFile } = context;
	const { number, mode } = args;
	const { layers } = currentFile;
	const l = layers.find(x => x.number === Number(number));
	l.blendMode = mode;
	context.state.layer.update(l.id, l);
	l.dirty = true;
	await update();
	l.dirty = undefined;
};
const layerSelect = async (context, args) => {
	const { update, currentFile } = context;
	const { number } = args;
	const { layers } = currentFile;
	let selectId;
	for(const layer of layers){
		layer.selected = undefined;
		if(layer.number !== number) continue;
		layer.selected = true;
		selectId = layer.id;
	}
	context.state.layer.select(selectId);
	await update();
};
const layerVisibility = async (context, args) => {
	const { update, currentFile } = context;
	const { number, visible } = args;
	const { layers } = currentFile;
	const l = layers.find(x => x.number === Number(number));
	l.visible = visible;
	context.state.layer.update(l.id, { visible });
	l.dirty = true;
	await update();
	l.dirty = undefined;
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
	const l = {
		def, name, type,
		number: 0,
		selected: true
	};
	layers.push(l);
	context.state.layer.add(l);
	l.dirty = true;
	await update();
	l.dirty = undefined;
	currentFile.dirty = undefined;
};
const layerDelete = async (context, args) => {
	const { update, currentFile } = context;
	const { number } = args;
	const { id } = currentFile.layers
		.find(x => x.number === number);
	currentFile.layers = currentFile.layers
		.filter(x => x.number !== number)
		.sort((a,b) => a.number-b.number)
		.map((o,i) => {
			o.selected = false;
			o.number = i;
			return o;
		});
	currentFile.layers[0].selected = true;
	context.state.layer.remove(id);
	currentFile.dirty = true;
	await update();
	currentFile.dirty = undefined;
};
const layerDuplicate = async (context, args) => {
	const { update, currentFile } = context;
	const clonedLayer = clone(args);
	clonedLayer.selected = false;
	clonedLayer.name += ' (copy)';
	clonedLayer.number += -0.1;
	currentFile.layers.push(clonedLayer);
	currentFile.layers = currentFile.layers
		.sort((a,b) => a.number-b.number)
		.map((o,i) => {
			o.number = i;
			return o;
		});
	context.state.layer.duplicate(args.id);
	currentFile.dirty = true;
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
	context.state.layer.update(l.id, l);
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
	context.state.layer.order(currentFile.layers.map(x => x.id));
	currentFile.dirty = true;
	await update();
	currentFile.dirty = undefined;
};
const fileSave = async (context, args) => {
	const { currentFile, currentFileName } = context;
	let filename = args.filename || currentFileName;
	if(!filename.endsWith('.js')){
		filename += '.js';
	}
	const path = '/indexDB/' + filename;
	const fileBody = args.file
		? args.file
		: 'export default ' + JSON.stringify(currentFile, null, 2);
	const data = new Blob(
		[fileBody],
		{ type: "application/javascript" }
	);
	await fs.writeFile({ path, data });
};
const paste = async (context, args) => {
	const pasted = (() => {
		try {
			return (new DOMParser).parseFromString(args[0], "text/html").querySelector('img').src;
		} catch(e){
			return args[0];
		}
	})();

	if(!pasted.startsWith('data:image')) return;

	const filename = Date.now() + '.png';
	const path = `/indexDB/downloads/${filename}`;
	const data = await dataUriToBlob(pasted);
	await fs.writeFile({ path, data });
	await layerAdd(context, {
		def: LayerDefFromFilename(filename),
		name: 'Pasted Image',
		type: '2d'
	});
};
const toolSelect = async (context, args) => {
	const { state } = context;
	const { tool } = args;
	state.editor.tool(tool, ToolSettings.get(tool));
};
const toolChange = async (context, args) => {
	const { state } = context;
	const { tool } = args;
	const { id, ...props } = tool;
	state.editor.toolProps(props);
	ToolSettings.set(id, props);
};
const colorUpdate = async (context, args) => {
	const { primary, secondary } = args;
	console.log(`TODO: save colors - ${primary}, ${secondary}`);
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
	const { host } = context;
	const selectedLayer = SelectedLayer(context);
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
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('imageSize', { width, height });
		console.log(form);
	} catch(e){}
};
const menuCanvasSize = async (context) => {
	const { currentFile } = context;
	const { width, height } = currentFile;
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('canvasSize', { width, height });
		console.log(form);
	} catch(e){}
};
const menuLayerDuplicate = async (context) => {
	const selectedLayer = SelectedLayer(context);
	await layerDuplicate(context, selectedLayer);
};
const menuLayerDelete = async (context) => {
	const selectedLayer = SelectedLayer(context);
	await layerDelete(context, selectedLayer);
};
const menuLayerNewUrl = async (context) => {
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('layerNew', { fromUrl: true });
		const [url] = form['image-url'] || [];
		const value = await dataUriImageFromUrl(url);
		const name = url.split('?')[0].split('#')[0].split('/').pop();
		await fs.writeFile({
			path: `/indexDB/downloads/${name}`,
			data: await dataUriToBlob(value)
		});
		await layerAdd(context, {
			def: LayerDefFromFilename(name),
			name,
			type: '2d'
		});
	} catch(e){}
};
const menuLayerNewImage = async (context) => {
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('layerNew', { fromImage: true });
		const [{ name, value }] = form.image || [];
		await fs.writeFile({
			path: `/indexDB/downloads/${name}`,
			data: await dataUriToBlob(value)
		});
		await layerAdd(context, {
			def: LayerDefFromFilename(name),
			name,
			type: '2d'
		});
	} catch(e){}
};
const menuFileSaveAs = async (context, args) => {
	const { currentFileName } = context;
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('fileSaveAs', { filename: currentFileName.replace(/\.js$/, '') });
		const { filename: [filename] } = form;
		await fileSave(context, { filename });
	} catch(e){}
};
const menuFileNew = async (context) => {
	const { load, host, update } = context;
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('fileNew');
		const { height: [height], width: [width], name: [filename], bgColor: [bgColor]} = form;
		const newFile = {
			zoom: 1,
			width,
			height,
			layers: [{
				number: 0,
				name: "Background",
				selected: true,
				type: '2d',
				def: `
					ctx.beginPath();
					ctx.rect(0, 0, ${width}, ${height});
					ctx.fillStyle = "${bgColor}";
					ctx.fill();\n\n
				`.replace(/\t\t\t\t/gm, '')
			}]
		};
		const file = `export default ${JSON.stringify(newFile, null, 2)}`
		await fileSave(context, { file, filename });
		await load({ host, filename: filename + '.js' });
		context.currentFile.dirty = true;
		await update();
		context.currentFile.dirty = undefined;
	} catch(e){}
};
const menuFileOpen = async (context) => {
	const { currentFileName, load, host, update } = context;
	const dir = await fs.readdir({ path: '/indexDB/'});
	const dirFiles = [];
	for(var entry of dir){
		const stat = await fs.stat({ path: '/indexDB/' + entry });
		if(stat.isDirectory()) continue;
		if(entry === currentFileName) continue;
		dirFiles.push(entry);
	}
	const files = dirFiles.sort().map((x,i) => ({
		name: x.replace(/\.js$/, ''),
		selected: i===0,
	}));
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('fileOpen', { files });
		const { filename: [filename] } = form;
		await load({ host, filename: filename + '.js' });
		context.currentFile.dirty = true;
		await update();
		context.currentFile.dirty = undefined;
	} catch(e){}
};

/*

FOR EACH ONE OF THES FUNCTIONS:
- they look the same, but are they?
- what parts are different?

const menuFilterBlur = async (context) => {
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('filter', { blur: true });
		const { blurAmount } = form;
		const { update, currentFile } = context;

		const { layers } = currentFile;
		const l = layers.find(x => x.selected);
		if(l.type !== '2d') return;

		l.def = l.def.replace(/\nops.filter\("StackBlur",.*\);/g, '');
		if(Number(blurAmount)){
			l.def += '\n' + `ops.filter("StackBlur", ${blurAmount});`;
		}
		context.state.layer.update(l.id, l);
		l.dirty = true;
		await update();
		l.dirty = undefined;
	}catch(e){}
};
const menuFilterSharpen = async (context) => {
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('filter', { sharpen: true });
		const { sharpenAmount } = form;
		const { update, currentFile } = context;

		const { layers } = currentFile;
		const l = layers.find(x => x.selected);
		if(l.type !== '2d') return;

		l.def = l.def.replace(/\nops.filter\("Sharpen",.*\);/g, '');
		if(Number(sharpenAmount)){
			l.def += '\n' + `ops.filter("Sharpen", ${sharpenAmount});`;
		}
		context.state.layer.update(l.id, l);
		l.dirty = true;
		await update();
		l.dirty = undefined;
	}catch(e){}
};
const menuFilterNoise = async (context) => {
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('filter', { noise: true });
		console.log(form);
	}catch(e){}
};
// USE THIS AS AN EXAMPLE, AILEEN!!!
const menuFilterPixelate = async (context) => {
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('filter', { pixelate: true });
		const { pixelateAmount } = form;
		const { update, currentFile } = context;

		const { layers } = currentFile;
		const l = layers.find(x => x.selected);
		if(l.type !== '2d') return;

		l.def = l.def.replace(/\nops.filter\("Mosaic",.*\);/g, '');
		if(Number(pixelateAmount)){
			l.def += '\n' + `ops.filter("Mosaic", ${pixelateAmount});`;
		}
		context.state.layer.update(l.id, l);
		l.dirty = true;
		await update();
		l.dirty = undefined;
	}catch(e){}
};
const menuFilterRescale = async (context) => {
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('filter', { rescale: true });
		const { rescaleAmount } = form;
		const { update, currentFile } = context;

		const { layers } = currentFile;
		const l = layers.find(x => x.selected);
		if(l.type !== '2d') return;

		l.def = l.def.replace(/\nops.filter\("Rescale",.*\);/g, '');
		if(Number(rescaleAmount)){
			l.def += '\n' + `ops.filter("Rescale", ${rescaleAmount});`;
		}
		context.state.layer.update(l.id, l);
		l.dirty = true;
		await update();
		l.dirty = undefined;
	}catch(e){}
};
const menuFilterDither = async (context) => {
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('filter', { dither: true });
		const { ditherAmount } = form;
		const { update, currentFile } = context;

		const { layers } = currentFile;
		const l = layers.find(x => x.selected);
		if(l.type !== '2d') return;

		l.def = l.def.replace(/\nops.filter\("Dither",.*\);/g, '');
		if(Number(ditherAmount)){
			l.def += '\n' + `ops.filter("Dither", ${ditherAmount});`;
		}
		context.state.layer.update(l.id, l);
		l.dirty = true;
		await update();
		l.dirty = undefined;
	}catch(e){}
};
const menuFilterBinarize = async (context) => {
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('filter', { binarize: true });
		const { binarizeAmount } = form;
		const { update, currentFile } = context;

		const { layers } = currentFile;
		const l = layers.find(x => x.selected);
		if(l.type !== '2d') return;

		l.def = l.def.replace(/\nops.filter\("Binarize",.*\);/g, '');
		if(Number(binarizeAmount)){
			l.def += '\n' + `ops.filter("Binarize", ${binarizeAmount});`;
		}
		context.state.layer.update(l.id, l);
		l.dirty = true;
		await update();
		l.dirty = undefined;
	}catch(e){}
};
const menuFilterEdge = async (context) => {
	try {
		const { form } = await (context.ShowModal || ShowModal)(context)('filter', { edge: true });
		const { edgeAmount } = form;
		const { update, currentFile } = context;

		const { layers } = currentFile;
		const l = layers.find(x => x.selected);
		if(l.type !== '2d') return;
		l.def = l.def.replace(/\nops.filter\("Edge"\);/g, '');
		if(Number(edgeAmount)){
			l.def += '\n' + `ops.filter("Edge");`;
		}
		context.state.layer.update(l.id, l);
		l.dirty = true;
		await update();
		l.dirty = undefined;
	}catch(e){}
}*/

const filterMain = (which) => async (context) => {
	try {
		const { form } = await ShowModal(context)('filter', { [which]: true });
		const { 
			blurAmount, 
			binarizeAmount, 
			edgeAmount, 
			ditherAmount,
			
			/* etc */ } = form;
		
		const { update, currentFile } = context;

		const { layers } = currentFile;
		const l = layers.find(x => x.selected);
		if(l.type !== '2d') return;

		// -------
		if(which === "edge"){
			l.def = l.def.replace(/\nops.filter\("Edge"\);/g, '');
			if(edgeAmount){
				l.def += '\n' + `ops.filter("Edge");`;
			}
		}
		if(which === "binarize"){
			l.def = l.def.replace(/\nops.filter\("Binarize",.*\);/g, '');
			l.def += '\n' + `ops.filter("Binarize", ${binarizeAmount});`;
		}
		if(which === "dither") {
			l.def = l.def.replace(/\nops.filter\("Dither",.*\);/g, '');
			l.def += '\n' + `ops.filter("Dither", ${ditherAmount});`;
		}
		if(which === "blur") {
			l.def = l.def.replace(/\nops.filter\("StackBlur",.*\);/g, '');
			l.def += '\n' + `ops.filter("StackBlur", ${blurAmount});`;
		}

		// -------

		context.state.layer.update(l.id, l);
		l.dirty = true;
		await update();
		l.dirty = undefined;
	}catch(e){}
};

const selectCanvas = async (context, args) => {
	const { selection } = args;
	//console.log(selection);
};
const menuCut = async (context) => {
	//console.log('menuCut');
};
const menuCopy = async (context) => {
	//console.log('menuCopy');
};
const menuPaste = async (context) => {
	//console.log('menuPaste');
};
const menuClear = async (context) => {
	//console.log('menuClear');
};

const actions = {
	paste,
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
	fileSave,
	toolSelect,
	toolChange,
	colorUpdate,
	selectCanvas,

	menuCut,
	menuCopy,
	menuPaste,
	menuClear,
	menuLayerNew,
	menuShowLayerSource,
	menuImageSize,
	menuCanvasSize,
	menuLayerDuplicate,
	menuLayerDelete,
	menuLayerNewUrl,
	menuLayerNewImage,
	menuFileSaveAs,
	menuFileNew,
	menuFileOpen,

	menuFilterBlur: filterMain('blur'),
	menuFilterSharpen: filterMain('sharpen'),
	menuFilterNoise: filterMain('noise'),
	menuFilterPixelate: filterMain('pixelate'),
	menuFilterRescale: filterMain('rescale'),
	menuFilterDither: filterMain('dither'),
	menuFilterBinarize: filterMain('binarize'),
	menuFilterEdge: filterMain('edge'),
};

const camelPropsAsDashed = obj => Object.entries(obj)
	.reduce((all, [k,v]) => ({
		...all,
		[camelToDashed(k)]: v
	}), {})

export default camelPropsAsDashed(actions);
