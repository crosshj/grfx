import { ClientState } from '../state.js';

const stackMap = (stack) =>
	ClientState({ editor: { tool: {}}}, stack).editor.tool;

const toolObserve = (fn) => {
	let stack;
	return (state, { patch }) => {
		const { path, op, value } = patch;
		if(!path.startsWith('/editor/tool')) return;
		if(`${path} ${value}` === '/editor/tool/id loading'){
			stack = [patch];
			return;
		}
		if(stack){
			stack.push(patch);
		} else {
			return fn(patch);
		}
		if(`${op} ${path}` !== 'replace /editor/tool/id'){
			return;
		}
		fn(stackMap(stack));
		stack = undefined;
	}
};

export default toolObserve;
