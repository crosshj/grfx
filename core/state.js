import undoable from './undoable.js';
import { uuidv4, clone } from '@grfx/utils';
import produce, {applyPatches} from "immer";

const List = {
	append: (item) => (arr) => {
		arr.push(item);
	},
	prepend: (item) => (arr) => {
		arr.unshift(item);
	},
	remove: (pred) => (arr) => {
		pred && arr.splice(arr.findIndex(pred), 1);
	},
	update: (pred, updates={}) => (arr) => {
		const x = pred && arr.find(pred) || {};
		for(const [k,v] of Object.entries(updates)){
			x[k] = v;
		}
	}
};

const Setter = (state) => (actions) => {
	for(const [i, a] of Object.entries(actions)){
		const [ path, handler] = a;
		const opts = i > 0 ? { breakpoint: false } : {};
		(path
			? state.setter(path, opts)(handler)
			: handler && handler()
		);
	}
};

const Layer = (state) => ({
	add: (layer) => {
		layer.id = uuidv4();
		Setter(state)([
			["file/layers", List.append(layer)],
			["file/layerOrder", List.prepend(layer.id)],
			["file/history", List.append('layerAdd')],
		]);
	},
	remove: (id) => Setter(state)([
		["file/layers", List.remove(x => x.id === id)],
		["file/layerOrder", List.remove(x => x === id)],
		["file/history", List.append('layerRemove')],
	]),
	update: (id, updates) => Setter(state)([
		["file/layers", List.update(x => x.id === id, updates)],
		["file/history", List.append('layerUpdate')],
	]),
	order: (order) => Setter(state)([
		["file/layerOrder", order],
		["file/history", List.append('layerOrder')],
	])
});

const fileObserveMiddleware = (fn) => {
	let stack;
	const stackHistory=[];
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

export class HostState {
	detach;
	undoable;

	constructor(initialState, changeHandler){
		this.undoable = undoable(initialState);
		this.observe(changeHandler);
		this.layer = Layer(this.undoable);
		this.undo = this.undoable.undo;
		this.redo = this.undoable.redo;
		this.get = this.undoable.get;
	}
	observe(handler){
		if(this.detach) this.detach();
		this.detach = this.undoable.observe(
			fileObserveMiddleware(handler)
		);
	}
};

export const ClientState = () => {
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
	console.log(stateClone);
};
