import { listen } from '../shared/messages.js';
import Sidebar from './sidebar.js';

const state = {
	thumbs: undefined,
	layers: undefined
};

listen('update-thumbs', ({ thumbs }) => {
	if(state.thumbs) return;
	state.thumbs = thumbs;
	Sidebar(state);
});

listen('layers-update', ({ layers }) => {
	state.layers = layers;
});

