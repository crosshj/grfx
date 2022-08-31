import sidebarDef from './sidebarDef.js'

const setupCanvas = () => {};
const thumbs = {};

function sidebarReady(err, { start } = {}) {
	if (err || !start) {
		console.error(`Error in sidebarReady: ${err}`);
		return;
	}

	const minimalDef = sidebarDef({});
	const canvas = setupCanvas({ sideBarDef: minimalDef });
	const toggleLayerVisible = ({ number, visible }) => {
		canvas.layers[number].visible = visible;
		canvas.viewport.render();
	};

	const getLayerThumb = ({ number }) => {
		return thumbs[number];
	};

	const getLayerSource = ({ number }) => {
		const renderFunction = canvas.renderFunctions[number];
		var renderFunctionSource = renderFunction.def || "";
		// remove function header and trailing curly brace
		//var match = renderFunctionSource.match(/function[^{]+\{([\s\S]*)\}$/);
		//return match ? match[1] : renderFunctionSource;
		var renderFuncLines = renderFunctionSource.split("\n");
		var unIndent = renderFuncLines.map((x) => x.replace("        ", ""));
		var minusFirstLast = unIndent.slice(1, -1);
		var rejoin = minusFirstLast.join("\n");

		return rejoin;
	};

	const changeLayerAlpha = ({ number, alpha }) => {
		//console.log(number);
		const renderFunction = canvas.renderFunctions[number];

		renderFunction({
			layer: canvas.layers[number],
			alpha,
			width,
			height,
		});

		canvas.viewport.render();
	};

	const changeLayerBlendMode = ({ number, mode }) => {
		canvas.layers[number].blendMode = mode;
		canvas.viewport.render();
	};

	const addLayer = ({ name, def, type, update, number, callback }) => {
		const isUpdating = isNumeric(number) && update;

		//console.log({ name, def, type, callback });
		const layerType = type.toLowerCase().includes("3d") ? "webgl" : "2d";
		const newLayer = isUpdating
			? canvas.layers[number]
			: new Concrete.Layer({ type: layerType });

		if (!isUpdating) {
			canvas.viewport.add(newLayer);
		}

		const newLayerRender = type.toLowerCase().includes("3d")
			? render3dContext(canvas.layers.length, def)
			: renderContext(canvas.layers.length, def);
		newLayerRender.def = def.toString();
		if (!isUpdating) {
			canvas.layers.push(newLayer);
			canvas.renderFunctions.push(newLayerRender);
		} else {
			//canvas.layers[number] = newLayer;
			thumbs[number] =
				canvas.layers[number].scene.canvas.toDataURL("image/png");
			canvas.renderFunctions[number] = newLayerRender;
		}

		newLayerRender({ layer: newLayer, width, height });
		if (isUpdating) {
			thumbs[number] =
				canvas.layers[number].scene.canvas.toDataURL("image/png");
		}
		canvas.viewport.render();

		const newSidebarLayer = {
			name,
			number: isUpdating ? number : canvas.layers.length - 1,
			onToggle: toggleLayerVisible,
			getThumb: getLayerThumb,
			getLayerSource,
			changeLayerAlpha,
			changeLayerBlendMode,
			changeLayerOrder,
		};
		setTimeout(matchCanvasFilter, 150);
		callback(newSidebarLayer);
	};

	const updateLayer = ({ name, def, type, number, callback }) => {
		addLayer({ name, def, type, update: true, number, callback });
	};

	const removeLayers = ({ numbers, callback }) => {
		//console.log({ numbers, callback });
		canvas.layers.forEach((layer, i) => {
			if (numbers.includes(i)) {
				layer.destroy();
			}
		});
		//canvas.layers = canvas.layers.filter((layer, i) => !numbers.includes(i));
		//thumbs = thumbs.filter((thumb, i)=>!numbers.includes(i))
		//thumbs.map((thumb, i) => numbers.includes(i) ? ()=>{} : thumb);
		canvas.viewport.render();
		callback();
	};

	const changeLayerOrder = ({ number, operation, repeat = 1 }) => {
		//console.log({number, operation, repeat});
		new Array(repeat).fill().forEach((x) => {
			canvas.layers[number][operation]();
		});
		canvas.viewport.render();
	};

	const definition = sidebarDef({
		toggleLayerVisible,
		getLayerThumb,
		getLayerSource,
		changeLayerAlpha,
		changeLayerBlendMode,
		changeLayerOrder,
		addLayer,
		updateLayer,
		removeLayers,
	});

	// number each layer
	definition.sections.forEach((section) => {
		section.items
			.filter((item) => item.type === "layers")
			.forEach((item) => {
				item.layers.forEach((layer, i) => {
					layer.number = i;
				});
			});
	});

	start({ sidebarDef: definition }, () => {
		// const loaderStyle = document.getElementById("loading-spinner").style;
		// loaderStyle.visibility = "hidden";
		// loaderStyle.opacity = 0;
	});
}

export default sidebarReady;
