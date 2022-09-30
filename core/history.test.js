import produce, {applyPatches} from "immer";
import History from './history.js';
import undoable from './undoable.js';
import { uuidv4, clone } from '@grfx/utils';

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

function immerPath(path) {
	if (!path) return [];
	const immerPath = path
		.replaceAll("\\/", ":::")
		.split("/");
	immerPath.shift();
	return immerPath.map((p) => p.replaceAll(":::", "/"));
}
const stateClone = applyPatches(state, [
	{
		"op": "replace",
		"path": immerPath("/file/layers/0/opacity"),
		"value": 1
	},
	{
		"op": "add",
		"path": immerPath("/file/layers/0/selected"),
		"value": false
	},
	{
		"op": "add",
		"path": immerPath("/file/history/3"),
		"value": "layerProperties",
		"type": "layerProperties"
	}
]);
console.log(stateClone)


// -------------------------------

const s = undoable(state);

//document.body.textContent = JSON.stringify(state,null,2) + '\n\n-----------\n\n';

const fileObserveMiddleware = (fn) => {
	let stack;
	let stackHistory=[];
	let stackRedo;

	return (state, { patch }) => {
		stack = stack || [];
		stack.push(patch);

		let isUndo;
		if(stackRedo?.length === 1){
			isUndo = true;
			stackRedo = undefined;
		}
		if(patch.path.startsWith('/file/history/length')){
			stackRedo = clone(stackHistory[patch.value]);
		}
		if(stackRedo?.length){
			stackRedo.pop();
			return;
		}

		const stackAction = stack.find(x =>
			x.path.startsWith('/file/history/')
		);
		if(!stackAction) return
		const isNew = !stackHistory.find(s => s.find(p => p.path === stackAction.path))
		if(!isUndo && isNew){
			stackAction.type = stackAction.value;
			stackHistory.push(stack);
		} else {
			stackAction.type = isUndo ? "undo": "redo"
		}
		fn(state, stack);
		stack = undefined;
	}
};

s.subscribe("file", fileObserveMiddleware((state, changes) => {
	document.body.textContent += JSON.stringify(changes,null,2) + '\n\n'
}));

const setHistory = s.setter("file/history", { breakpoint: false });

const Setter = (actions) => {
	for(const [i, a] of Object.entries(actions)){
		const [ path, handler] = a;
		const opts = i > 0 ? { breakpoint: false } : {};
		(path
			? s.setter(path, opts)(handler)
			: handler && handler()
		);
	}
};

const add = (item) => (arr) => {
	arr.push(item);
};
const prepend = (item) => (arr) => {
	arr.unshift(item);
};
const remove = (pred) => (arr) => {
	pred && arr.splice(arr.findIndex(pred), 1);
};
const update = (pred, updates={}) => (arr) => {
	const x = pred && arr.find(pred) || {};
	for(const [k,v] of Object.entries(updates)){
		x[k] = v;
	}
};

const layerAdd = (layer) => Setter([
	[null, () => layer.id = layer.id || uuidv4()],
	["file/layers", add(layer)],
	["file/layerOrder", prepend(layer.id)],
	["file/history", add('layerAdd')],
]);
const layerRemove = (id) => Setter([
	["file/layers", remove(x => x.id === id)],
	["file/layerOrder", remove(x => x === id)],
	["file/history", add('layerRemove')],
]);
const layerUpdate = (id, updates) => Setter([
	["file/layers", update(x => x.id === id, updates)],
	["file/history", add('layerUpdate')],
]);
const layerOrder = (...args) => Setter([
	["file/layerOrder", args],
	["file/history", add('layerOrder')],
]);



layerOrder([
	"70b129f8-1e7d-4080-854c-1279ea63dd86",
	"867f51d2-5b72-479d-83a8-602b42059075",
]);
layerAdd({ name: "newer" })
s.undo(); 
s.redo();
layerRemove("867f51d2-5b72-479d-83a8-602b42059075");
s.undo();

layerUpdate("867f51d2-5b72-479d-83a8-602b42059075", { opacity: 0.5 });
layerUpdate("867f51d2-5b72-479d-83a8-602b42059075", { opacity: 1, selected: false });


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

