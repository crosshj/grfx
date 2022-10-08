const fileObserve = (fn) => {
	let stack;
	const stackHistory=[];
	let stackRedo;
	return (state, { patch }) => {
		if(!patch.path.startsWith('/file')) return;
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

export default fileObserve;
