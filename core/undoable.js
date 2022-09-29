import { history, createDocStore } from '@syncstate/core';

export default (target) => {
	const store = createDocStore(target);
	const subscribe = (path, fn) => {
// 		let prev = store.getStateAtPath("doc", "/" + path);
// 		fn(prev);

// 		// with this subscribe, I am effectively subbed to entire store
// 		// there are multiple subscriptions for each path
// 		// if type of prev, current are array, I should compare prev and current for each item
// 		// if only one of those changed, call fn with what changed and indicate this
// 		// the alternative is a different(dynamic) subscriptions for each array item
// 		const unsubscribe = store.subscribe(() => {
// 			const current = store.getStateAtPath("doc", "/" + path);
// 			if(prev === current) return;
// 			fn(current, prev);
// 			prev = current;
// 		});
// 		return () => {
// 			prev = undefined;
// 			unsubscribe();
// 		}

		const dispose = store.observe("doc", "/"+path, (...args) => {
			//console.log(args)
			fn(...args)
		}, Infinity);
		return dispose;
	}
	const setter = (path) => {
		const [state,setter, dispatch] = store.useDoc("/" + path);
		return setter;
	};
	const undo = () => store.dispatch(history.undo());
	const redo = () => store.dispatch(history.redo());
	const get = (path) => path
		? store.getStateAtPath("doc", "/" + path)
		: store.getState("doc");
	return {
		subscribe, setter,
		undo, redo,
		get
	}
};

// export default (target) => {
// 	const store = createDocStore(
// 		target,
// 		[ history.createInitializer() ]
// 	);
// 	const handler = {
// 		get(target, prop, receiver) {
// 			if (prop === "subscribe")
// 				return (fn) => store.subscribe(() => {
// 					const current = store.getState("doc");
// 					fn(current);
// 				});
// 			if (prop === "undo")
// 				return () => store.dispatch(history.undo());
// 			if (prop === "redo")
// 				return () => store.dispatch(history.redo());
// 			return store.getState("doc")[target];
// 		}
// 	};
// 	return new Proxy(target, handler);
// }