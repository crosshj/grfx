import History from './history.js';

const state = {
	editor: {
		zoom: 0,
		tool: {
			id: "airbrush"
		},
	},
	file: {
		canvas: {
			width: 0,
			height: 0,
		},
		layers: [{ name: "old", def: "same def" }]
	}
};
const h = new History(state, (args) => {
	// order changed
	// layer added
	// layer removed
	// layer name changed
	// layer def changed
	// layer visibility changed
	document.body.textContent += '\n\n' + JSON.stringify(args,null,2)
});

h.layers = (layers) => (layers.find(x=>x.name==="old").name = "new");

// TODO: make this possible
// set.layers((x) => x.name==="foo", (layer) => layer.name = "new");

// TODO: make this possible (for that matter)
// set.file({ dims, layers })

h.undo();
h.redo();
h.zoom = 100;

h.layers = [{ name: "one"}, { name: "two" }]
h.layers = (layers) => (layers.find(x=>x.name==="one").name = "ONE!!!");
