import { listen, send } from '../shared/messages.js';
import Sidebar from './sidebar.js';

let dispatch;

listen('update-thumbs', ({ thumbs }) => {
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
	});
});

send('ping', 'right');

