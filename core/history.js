import { sizeOf, sizeOf2 } from '@grfx/utils';
import undoable from './undoable.js';

const loaded = () => {
	const ready = {
		zoom: false,
		tool: false,
		canvas: false,
		layers: false,
	};
	let done = false;
	return (section, which, x) => {
		if(done) return { done };
		ready[which] = x;
		if(ready.zoom === false) return;
		if(ready.tool === false) return;
		if(ready.canvas === false) return;
		if(ready.layers === false) return;
		return {
			state: ready,
			finish: () => { done = true; }
		};
	};
};

class History {
	constructor(state, onChange){
		this.loaded = loaded();
		this.onChange = (section, which, x) => {
			const isLoaded = this.loaded(section, which, x);
			if(isLoaded && !isLoaded.done){
				onChange(isLoaded.state);
				return isLoaded.finish();
			}
			if(!isLoaded) return;
			onChange({ [which]: x })
		};
		this.history = {};
		this.unsubscribe = {};
		this.set = {};
		for(const [section, children] of Object.entries(state)){
			this.history[section] = undoable(children);
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
				this.set[childName] = this.history[section].setter(childName);
				this.unsubscribe[childName] = this.history[section].subscribe(
					childName,
					(x) => this.onChange(section, childName, x)
				);
			}
		}
	}
	set canvas(args){ this.set.canvas(args); }
	set layers(args){ this.set.layers(args); }
	set tool(args){ this.set.tool(args); }
	set zoom(args){ this.set.zoom(args); }

	undo(){ this.history.file.undo(); }
	redo(){ this.history.file.undo(); }
}


//const h = new History(state, console.log);

//h.layers = (layers) => (layers.find(x=>x.name==="old").name = "new");

// TODO: make this possible
// set.layers((x) => x.name==="foo", (layer) => layer.name = "new");

// TODO: make this possible (for that matter)
// set.file({ dims, layers })

//h.history.file.undo();
//h.history.file.redo();
//h.set.zoom(10);

// EXPLORE - coordinates storage
/*
//https://www.mattzeunert.com/2016/07/24/javascript-array-object-sizes.html
//https://18choi18.medium.com/memory-size-of-javascript-primitive-types-6c35ae5a0e00
//https://developer.mozilla.org/en-US/docs/Web/JavaScript/Typed_arrays
const res8K = [7680, 4320];

// 16-20 bytes
console.log('array bytes: ' + sizeOf2(res8K) + '-' + sizeOf(res8K));
// 4 bytes
console.log('u16array bytes: ' + sizeOf(new Uint16Array(res8K)));
*/

export default History;
