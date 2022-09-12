var hideWhenFocusLost = true;
const pinHandler = ({ pinned }) => {
	hideWhenFocusLost = !pinned;
	//document.getElementById('canvasContainer').style.width = pinned ? 'calc(100vw - 220px)' : '';
};
const toggleFilter = ({ test, set }) => {
	const allFilteredNodes = document.querySelectorAll('.layers .image, #canvasContainer canvas');
	const someFilterNull = Array.from(allFilteredNodes).some(node => !node.style.filter);

	Array.from(allFilteredNodes)
			.forEach(node => node.style.filter = someFilterNull ? 'unset' : null);
};
const parseFunction = func => new Function("return " + func)();


const sidebarDef = ({
	toggleLayerVisible,
	getLayerThumb,
	getLayerSource,
	changeLayerAlpha,
	changeLayerBlendMode,
	changeLayerOrder,
	addLayer,
	updateLayer,
	removeLayers,
	layers
}) => {
	const layersSorted = layers.sort((a,b) => a.number - b.number);
	const layersHidden = layers
		.map((x,i) => x.visible === false ? i : undefined)
		.filter(x => x !== undefined);
	const defin = {
		title: "Sidebar Demo",
		pinHandler,
		hidden: false,
		pinned: true,
		sections: [
			{
				name: "Layers",
				items: [
					{
						type: "layers",
						addLayer,
						updateLayer,
						removeLayers,
						layersHidden,
						layers: layersSorted
					},
				],
			},
			{
				name: "History",
				collapsed: true,
				items: [],
			},
		],
	};

	// connect layer functions to definition
	defin.sections.forEach((sec) => {
		sec.items.forEach((ite) => {
			if (ite.type !== "layers") {
				return;
			}
			ite.layers.forEach((lay) => {
				lay.onToggle = toggleLayerVisible;
				lay.getLayerSource = getLayerSource;
				lay.getThumb = getLayerThumb;
				lay.changeLayerAlpha = changeLayerAlpha;
				lay.changeLayerBlendMode = changeLayerBlendMode;
				lay.changeLayerOrder = changeLayerOrder;
			});
		});
	});

	return defin;
};

export default sidebarDef;
