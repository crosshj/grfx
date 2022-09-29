import History from './history.js';
import undoable from './undoable.js';

// import { Observable } from 'https://cdn.jsdelivr.net/npm/rxjs@7.5.7/dist/esm5/index.js';
// const layersObserve = new Observable();
// console.log()

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
		order: [1,0],
		layers: [{ name: "old" }, { name: "new" }]
	}
};

const s = undoable(state);

s.subscribe("file", (...args) => {
	document.body.textContent += '\n\n' + JSON.stringify(args,null,2)
})
const setLayers = s.setter("file/layers");

setLayers((layers) => {
	layers.sort((a,b) => a.order-b.order)
		.forEach((x,i) => { x.order = i; })
});



/*
const h = new History(state, (args) => {
	const { patch, ...state } = args;
	
	// order changed
	// layer added
	// layer removed
	// layer name changed
	// layer def changed
	// layer visibility changed
	document.body.textContent += '\n\n' + JSON.stringify([state, patch],null,2)
});
*/

//h.layers = (layers) => (layers.find(x=>x.name==="old").name = "new");

// TODO: make this possible
// set.layers((x) => x.name==="foo", (layer) => layer.name = "new");

// TODO: make this possible (for that matter)
// set.file({ dims, layers })

// h.undo();
// h.redo();
// h.zoom = 100;

//h.layers = [{ name: "one"}, { name: "two" }]

// h.layers = (layers) => {
// 	layers.sort((a,b) => a.order-b.order)
// 		.forEach((x,i) => { x.order = i; })
// };

