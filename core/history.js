import { sizeOf, sizeOf2 } from '@grfx/utils';
import undoable from './undoable.js';

const state = {
	editor: {
		zoom: 0,
		tool: {
			id: "airbrush"
		},
	},
	file: {
		canvas: {
			width: 0,
			height: 0,
		},
		layers: [{ name: "old", def: "same def" }]
	}
};


const history = {};
const unsubscribe = {};
const set = {};
const log = (section, which) => (x) => console.log(
	section + "-" + which + ": " + JSON.stringify(x,null,2),
	//history
);

for(const [section, children] of Object.entries(state)){
	history[section] = undoable(children);
	// set[section] = (newSection) => {
	// 	// unsubscribe old section's children
	// 	// destroy the undoable
	// 	// subscribe new section
	// 	// log that the section changed
	// };
	for(const [childName, childState] of Object.entries(children)){
		// TODO: if child is of type array
		// should be able to listen to and set children individually
		// as well as to the array as a whole
		set[childName] = history[section].setter(childName);
		unsubscribe[childName] = history[section].subscribe(
			childName,
			log(section, childName)
		);
	}
}

set.layers((layers) => layers.find(x=>x.name==="old").name = "new");

// TODO: make this possible
// set.layers((x) => x.name==="foo", (layer) => layer.name = "new");

// TODO: make this possible (for that matter)
// set.file({ dims, layers })

history.file.undo();
history.file.redo();
set.zoom(10);

// EXPLORE- coordinates storage

//https://www.mattzeunert.com/2016/07/24/javascript-array-object-sizes.html
//https://18choi18.medium.com/memory-size-of-javascript-primitive-types-6c35ae5a0e00
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
const res8K = [7680, 4320];

// 16-20 bytes
console.log('array bytes: ' + sizeOf2(res8K) + '-' + sizeOf(res8K));
// 4 bytes
console.log('u16array bytes: ' + sizeOf(new Uint16Array(res8K)) );

export default {};
