import { listen, send } from '../shared/messages.js';
import Sidebar from './sidebar.js';

let dispatch;

let initResolve;
const initPromise = new Promise(r => initResolve = r);

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
	const { layers, thumbs=[], ...rest } = args;
	if(dispatch) return; // updateThumbs(args); (should be UPDATE_LAYERS or something like that)

	Sidebar({ layers, thumbs, ...rest }, (store) => {
		dispatch = store.dispatcher;
		initResolve && initResolve();
	});
});

send('ping', 'right');

