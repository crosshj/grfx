import Sidebar from './sidebar.js';
import SidebarReady from './sidebarReady.js'
import { listen } from '../shared/messages.js';

Sidebar.init(SidebarReady);


const thumbsListener = ({ thumbs, def }) => {
	const thumbContainers = Array.from(
		document.querySelectorAll('.layers li img')
	).reverse();
	for(const [i,thumb] of Object.entries(thumbs)){
		thumbContainers[Number(i)-1].src = thumbs[i];
	}
};
listen('update-thumbs', thumbsListener);
