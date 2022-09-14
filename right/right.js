import { listen, send } from '../shared/messages.js';
import Sidebar from './sidebar.js';

let dispatch;

let initResolve;
const initPromise = new Promise(r => initResolve);

listen('update-thumbs', async ({ thumbs }) => {
	await initPromise;
	const action = {
		type: "UPDATE_THUMBS",
		payload: thumbs
	};
	dispatch(action);
});

listen('layers-update', ({ layers }) => {
	if(dispatch) return;
	Sidebar({ layers, thumbs: [] }, (store) => {
		dispatch = store.dispatcher;
		initResolve && initResolve();
	});
});

send('ping', 'right');

