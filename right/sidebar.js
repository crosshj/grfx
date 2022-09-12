import { send } from '../shared/messages.js';
//import SidebarReady from './sidebarReady.js'
import sidebarStart from './sidebarStart.js';
import sidebarDef from './sidebarDef.js'

const getLayerThumb = (thumbs) => ({ number }) => thumbs[number];

const toggleLayerVisible = (data) => send('layer-visibility', data);

const dummy = (name) => (...args) => {
	if(name == "getLayerThumb") debugger;
	console.log(name, args);
};

export default function renderSideBar({ layers, thumbs }){
	// SidebarReady(null, { start: sidebarStart });
	const definition = sidebarDef({
		toggleLayerVisible,
		getLayerThumb: getLayerThumb(thumbs),
		getLayerSource: dummy('getLayerSource'),
		changeLayerAlpha: dummy('changeLayerAlpha'),
		changeLayerBlendMode: dummy('changeLayerBlendMode'),
		changeLayerOrder: dummy('changeLayerOrder'),
		addLayer: dummy('addLayer'),
		updateLayer: dummy('updateLayer'),
		removeLayers: dummy('removeLayers'),
		layers
	});
	sidebarStart({ sidebarDef: definition }, dummy)
};