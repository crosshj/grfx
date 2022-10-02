import { send } from './messages.js';
import { clone } from './utils.js';
import pasteHandler from './pasteHandler.js';

const KeyEvent = ({
	code, ctrlKey, shiftKey, altKey, metaKey
}) => ({
	code, ctrlKey, shiftKey, altKey, metaKey
});

pasteHandler.attach();

export const client = ({ skip }={}) => {
	const logKey = (e) => {
		// if(e.code === "KeyV" && (e.ctrlKey || e.metaKey)){
		// 	return;
		// }
		if(skip && skip(e)) return;
		send('keydown', KeyEvent(e))
	};
	document.body.addEventListener('keydown', logKey);
};

const keyEventHandler = (cb, config) => (e) => {
	const key = KeyEvent(e);
	let result;
	for(const [name, test] of Object.entries(config)){
		const thisResult = test(key);
		if(thisResult.some(x => !x)) continue;
		if(thisResult.length <= result?.length) continue;
		result = { name, length: thisResult.length };
	}
	result && cb(result);
};

export const host = ({ host: pageHost, onKey, config }) => {
	const logKey = keyEventHandler(onKey, config);

	document.body.addEventListener('keydown', logKey);
	pageHost.listen('keydown', logKey);
};