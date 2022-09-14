import { send } from '../shared/messages.js';
//import SidebarReady from './sidebarReady.js'
import sidebarStart from './sidebarStart.js';
import sidebarDef from './sidebarDef.js'

const getLayerThumb = ({ number }, state) => state[number];
const toggleLayerVisible = (data) => send('layer-visibility', data);
const changeLayerAlpha = (data) => send('layer-alpha', data);
const changeLayerBlendMode = (data) => send('layer-blend-mode', data);

const dummy = (name) => (...args) => {
	if(name == "getLayerThumb") debugger;
	console.log(name, args);
	if(['getLayerSource'].includes(name)) return;
	alert('WIP: ' + name)
};

export default function renderSideBar({ layers, thumbs }, cb){
	// SidebarReady(null, { start: sidebarStart });
	const definition = sidebarDef({
		toggleLayerVisible,
		getLayerThumb: getLayerThumb,
		getLayerSource: dummy('getLayerSource'),
		changeLayerAlpha,
		changeLayerBlendMode,
		changeLayerOrder: dummy('changeLayerOrder'),
		addLayer: dummy('addLayer'),
		updateLayer: dummy('updateLayer'),
		removeLayers: dummy('removeLayers'),
		layers
	});
	return sidebarStart({ sidebarDef: definition, thumbs }, cb)
};