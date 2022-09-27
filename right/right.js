import { listen, send } from '@grfx/messages';
import { client as Hotkeys } from '@grfx/hotkeys';
import Sidebar from './sidebar.js';

Hotkeys();

let dispatch;

let initResolve;
let initPromise = new Promise(r => initResolve = r);

const updateThumbs = async ({ thumbs }) => {
	await initPromise;
	const action = {
		type: "UPDATE_THUMBS",
		payload: thumbs
	};
	dispatch(action);
};

listen('update-thumbs', updateThumbs);

listen('file-update', (args) => {
	const { layers, thumbs=[], dirty, ...rest } = args;
	if(dirty){
		dispatch = undefined;
		initPromise = new Promise(r => initResolve = r);
		document.getElementById('sidebar').remove();
	}
	if(dispatch) return; // updateThumbs(args); (should be UPDATE_LAYERS or something like that)

	Sidebar({ layers, thumbs, ...rest }, (store) => {
		dispatch = store.dispatcher;
		initResolve && initResolve();
	});
});

send('ping', 'right');

