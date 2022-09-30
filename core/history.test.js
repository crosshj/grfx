import produce, {applyPatches} from "immer";
import History from './history.js';
import undoable from './undoable.js';
import { uuidv4 } from '@grfx/utils';

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
		history: [],
		layerOrder: [
			"867f51d2-5b72-479d-83a8-602b42059075",
			"70b129f8-1e7d-4080-854c-1279ea63dd86"
		],
		layers: [{
			name: "old",
			id: "867f51d2-5b72-479d-83a8-602b42059075"
		}, {
			name: "new",
			id: "70b129f8-1e7d-4080-854c-1279ea63dd86"
		}]
	}
};


// - the following could be done on the other end!
// see: https://medium.com/@mweststrate/distributing-state-changes-using-snapshots-patches-and-actions-part-2-2f50d8363988
function jsonPatchPathToImmerPath(path) {
	if (!path) {
		return [];
	}
	path = path.replaceAll("\\/", ":::");
	var immerPath = path.split("/");
	immerPath.shift();
	return immerPath.map(function(p) {
		return p.replaceAll(":::", "/");
	});
}
const stateClone = applyPatches(state, [
	{
		"op": "replace",
		"path": jsonPatchPathToImmerPath("/file/canvas"),
		"value": {
			"width": 800,
			"height": 600
		}
	}
])
console.log(stateClone.file.canvas)

// -------------------------------

const s = undoable(state);

//document.body.textContent = JSON.stringify(state,null,2) + '\n\n-----------\n\n';

let stack;
let stackHistory=[]
let stackRedo;
s.subscribe("file", (state, { patch }) => {
	stack = stack || [];
	stack.push(patch);

	let logStack = false;
	if(stackRedo?.length === 1){
		stackRedo = undefined;
		logStack = true;
	}
	if(stackRedo?.length){
		stackRedo.pop();
		return;
	}
	if(patch.path.startsWith('/file/history/length')){
		const originalAction = stackHistory[patch.value]
			.find(x => x.path.startsWith('/file/history'))
		console.log(originalAction, patch.value, stackHistory);
		const undoAction = {
			layerAdd: "layerRemove",
			layerRemove: "layerAdd",
			layerOrder: "layerOrder"
		}[originalAction.value];
		//stackRedo = stackHistory[patch.value];
		stackRedo = stackHistory.find(x =>
			x.find(y =>
				y.path === '/file/history/'+patch.value
			)
		);
		patch.value = undoAction;
		stackRedo.pop();
		return;
	}
	if(!logStack && !patch.path.startsWith('/file/history')){
		return;
	}
	!logStack && stackHistory.push(stack);
	document.body.textContent += JSON.stringify(stack.find(x => x.path.startsWith('/file/history')),null,2) + '\n\n'
	stack = undefined;
});

const setFileHistory = s.setter("file/history", { breakpoint: false });

const layersSetter = s.setter("file/layers");
const addLayer = (layer) => {
	const id = layer.id || uuidv4();
	layersSetter((layers) => {
		layers.push({ ...layer, id });
	});
	s.setter("file/layerOrder", { breakpoint: false })(order => {
		order.unshift(id);
	});
	setFileHistory(h => h.push('layerAdd'));
};
const removeLayer = (id) => {
	layersSetter(layers => {
		const i = layers.findIndex(x => x.id === id);
		layers.splice(i, 1);
	});
	s.setter("file/layerOrder", { breakpoint: false })(order => {
		const i = order.findIndex(x => x === id);
		order.splice(i, 1);
	});
	setFileHistory(h => h.push('layerRemove'));
};
const setLayerOrder = (...args) => {
	s.setter("file/layerOrder")(...args);
	setFileHistory(h => h.push('layerOrder'));
};



setLayerOrder([
	"70b129f8-1e7d-4080-854c-1279ea63dd86",
	"867f51d2-5b72-479d-83a8-602b42059075",
])
addLayer({ name: "newer" })
s.undo();
s.redo();
removeLayer("867f51d2-5b72-479d-83a8-602b42059075");
s.undo();

//document.body.textContent += '\n\n-----------\n\n' + JSON.stringify(s.get(),null,2);

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

