import { history, createDocStore } from '@syncstate/core';

export default (target) => {
	const store = createDocStore(target);
	const subscribe = (path, fn) => {
		let prev = store.getStateAtPath("doc", "/" + path);
		fn(prev);
		store.subscribe(() => {
			const current = store.getStateAtPath("doc", "/" + path);
			if(prev === current) return;
			prev = current;
			fn(current);
		});
	}
	const setter = (path) => {
		const [,setter] = store.useDoc("/" + path);
		return setter;
	};
	const undo = () => store.dispatch(history.undo());
	const redo = () => store.dispatch(history.redo());
	const get = (path) => store.getStateAtPath("doc", "/" + path);
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