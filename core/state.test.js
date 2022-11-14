import { describe, it, expect } from 'footils/test';
import { HostState, ClientState } from './state.js';

const logJSON = x => console.log(JSON.stringify(x, null, 2));

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

const patches = [
	{
		"op": "replace",
		"path": "/file/layers/0/opacity",
		"value": 1
	},
	{
		"op": "add",
		"path": "/file/layers/0/selected",
		"value": false
	},
	{
		"op": "add",
		"path": "/file/history/0",
		"value": "layerProperties"
	}
];

describe('Host State', () => {
	it('should track change with history', () => {
		const changes = [];
		const s = new HostState(state, (state, { patch }) => changes.push(patch));
		s.layer.order();
		const mainChange = changes[0];
		expect(changes.length).toEqual(2);
		expect(mainChange.op).toEqual("replace");
		expect(mainChange.path).toEqual("/file/layerOrder");
	});

	it('should keep history', () => {
		const changes = [];
		const s = new HostState(state, (state, { patch }) => changes.push(patch));
		s.layer.order();
		const historyChange = changes[1];
		expect(changes.length).toEqual(2);
		expect(historyChange.op).toEqual("add");
		expect(historyChange.path).toEqual("/file/history/0");
	});

	it('should track all changes', () => {
		const changes = [];
		const s = new HostState(state, (state, change) => {
			changes.push({ state, change });
		});

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

		const exampleChange = changes[0].change.patch;
		expect(exampleChange.op).toEqual("replace");
		expect(exampleChange.path).toEqual("/file/layerOrder");
		expect(changes.length).toEqual(32);
	});
});


describe('Client State', () => {
	it('should reconstitute state from patches', () => {
		const s = ClientState(state, patches);
		const { history, layers } = s.file;
		expect(layers[0].opacity).toEqual(1);
		expect(layers[0].selected).toEqual(false);
		expect(history[0]).toEqual("layerProperties");
	});
});