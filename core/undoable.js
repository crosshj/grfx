import { history, createDocStore } from '@syncstate/core';

export default (target) => {
	const store = createDocStore(target);
	const observe = (fn) => {
		const dispose = store.observe("doc", "/", (state, change) => {
			//console.log(change)
			fn(store.getState("doc"), change)
		}, Infinity);
		return dispose;
	};
	const setter = (path, { breakpoint=true }={}) => {
		const [state,setter,dispatch] = store.useDoc("/" + path);
		return (...args) => {
			if(breakpoint)
				store.dispatch(history.insertUndoBreakpoint());
			setter(...args);
		};
	};
	const undo = () => {
		store.dispatch(history.undoTillBreakpoint());
	};
	const redo = () => {
		store.dispatch(history.redoTillBreakpoint());
	};
	const get = (path) => path
		? store.getStateAtPath("doc", "/" + path)
		: store.getState("doc");
	return {
		observe,
		setter,
		undo, redo,
		get
	}
};
