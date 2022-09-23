import { send } from './messages.js';
import { clone } from './utils.js';

const KeyEvent = ({
	code, ctrlKey, shiftKey, altKey, metaKey
}) => ({
	code, ctrlKey, shiftKey, altKey, metaKey
});

export const client = ({ skip }={}) => {
	const logKey = (e) => {
		if(skip && skip(e)) return;
		send('keydown', KeyEvent(e))
	};
	document.body.addEventListener('keydown', logKey);
};

export const host = ({ host: pageHost, onKey }) => {
	const logKey = (e) => onKey(KeyEvent(e));

	document.body.addEventListener('keydown', logKey);
	pageHost.listen('keydown', logKey);
};