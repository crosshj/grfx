import { send } from '../shared/messages.js';
import constructLayer from './constructLayer.js';

const goFn = () => {
	send('hide-layer-source');
};
const cancelFn = () => {
	send('hide-layer-source');
};

const name = undefined;
const def = undefined;
const type = undefined;

const editor = await constructLayer({ goFn, cancelFn, name, def, type });
document.body.append(editor);
