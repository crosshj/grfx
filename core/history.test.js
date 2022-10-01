import { HostState } from './state.js';

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
		history: [],
		layerOrder: [
			"867f51d2-5b72-479d-83a8-602b42059075",
			"70b129f8-1e7d-4080-854c-1279ea63dd86"
		],
		layers: [{
			name: "old",
			id: "867f51d2-5b72-479d-83a8-602b42059075"
		}, {
			name: "new",
			id: "70b129f8-1e7d-4080-854c-1279ea63dd86"
		}]
	}
};

// -------------------------------

const s = new HostState(state, (state, changes) => {
	document.body.textContent += JSON.stringify(changes,null,2) + '\n\n'
});

document.body.textContent = JSON.stringify(state,null,2) + '\n\n-----------\n\n';

s.layer.order([
	"70b129f8-1e7d-4080-854c-1279ea63dd86",
	"867f51d2-5b72-479d-83a8-602b42059075",
]);
s.layer.add({ name: "newer" })
s.undo(); 
s.redo();
s.layer.remove("867f51d2-5b72-479d-83a8-602b42059075");
s.undo();

s.layer.update("867f51d2-5b72-479d-83a8-602b42059075", { opacity: 0.5 });
s.layer.update("867f51d2-5b72-479d-83a8-602b42059075", { opacity: 1, selected: false });

document.body.textContent += '\n\n-----------\n\n' + JSON.stringify(s.get(),null,2);

// TODO: make this possible
// set.layers((x) => x.name==="foo", (layer) => layer.name = "new");

// TODO: make this possible (for that matter)
// set.file({ dims, layers })


