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
}) => {
	const defin = {
		title: "Sidebar Demo",
		pinHandler,
		hidden: false,
		pinned: true,
		sections: [
			{
				name: "Properties",
				items: [
					// {
					// 	type: "button",
					// 	name: "reload",
					// 	onClick: () => {
					// 		window.parent.caches.delete("call");
					// 		//TODO: would be nice if this only reloaded DOM/scripts/CSS, not reload page
					// 		document.location = document.location;
					// 	},
					// },
					// {
					// 	type: "button",
					// 	name: "filter",
					// 	onClick: toggleFilter,
					// },
					// {
					// 	type: "button",
					// 	name: "fullscreen",
					// 	onClick: (e) => fullscreen(),
					// },
					{
						type: "layers",
						name: "layers",
						addLayer,
						updateLayer,
						removeLayers,
						layersHidden: [1],
						layers: [
							{
								name: "3D Canvas",
								type: "3D Canvas",
								render:
									parseFunction(`function({ ctx, gl, alpha, width, height}){
													${window.threejsFunction}
											}`),
							},
							{
								name: "Uber Layer",
								type: "2D Canvas",
								render: "shape",
							},
							{
								name: "Middle Layer",
								type: "2D Canvas",
								render: "circle",
							},
							{
								name: "Top Layer",
								type: "2D Canvas",
								render: "triangle",
							},
							{
								name: "Bottom Layer",
								type: "2D Canvas",
								render: "square",
							},
						],
					},
				],
			},
			{
				name: "History",
				collapsed: true,
				items: [
					{
						type: "text",
						name: "Current Layer Alpha",
						default: "100",
						onChange: (currentLayer, value) => {
							debugger;
							// TODO: so much to do here, where do I begin?
							currentLayer.changeLayerArgs(currentLayer.number, Number(value));
						},
					},
					{
						type: "slider",
						name: "slider",
						default: 30,
						min: 0,
						max: 100,
						step: 5,
						onChange: (value) => {
							console.log(value);
						},
					},
					{
						type: "boolean",
						name: "boolean",
						default: "FALSE",
						onChange: (e) => {
							console.log(e.target.value);
						},
					},
					{
						type: "select",
						name: "select",
						default: "blue",
						options: ["red", "green", "blue", "yellow", "orange"],
						onChange: (value) => {
							console.log(value);
						},
					},
					{
						type: "button",
						name: "button",
						onClick: () => {
							console.log("button clicked");
						},
					},
				],
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
