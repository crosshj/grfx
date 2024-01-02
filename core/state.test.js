import { describe, it, expect } from 'footils/test';
import { HostState, ClientState } from './state.js';

const logJSON = x => console.log(JSON.stringify(x, null, 2));

const LAYER_ONE_ID = "867f51d2-5b72-479d-83a8-602b42059075";
const LAYER_TWO_ID = "70b129f8-1e7d-4080-854c-1279ea63dd86";

const state = {
	editor: {
		zoom: 0,
		tool: { id: "airbrush" },
	},
	file: {
		canvas: { width: 0, height: 0},
		history: [],
		layerOrder: [
			LAYER_ONE_ID,
			LAYER_TWO_ID
		],
		layers: [
			{ name: "old", id: LAYER_ONE_ID },
			{ name: "new", id: LAYER_TWO_ID },
		]
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

		const { op, path } = changes[1];
		expect(changes.length).toEqual(2);
		expect(op).toEqual("add");
		expect(path).toEqual("/file/history/0");
	});

	it('should track all changes', () => {
		const changes = [];
		const s = new HostState(state, (state, { patch }) => changes.push(patch));

		s.layer.order([
			LAYER_TWO_ID,
			LAYER_ONE_ID,
		]);
		s.layer.add({ name: "newer" })
		s.undo();
		s.redo();
		s.layer.remove(LAYER_ONE_ID);
		s.undo();
		s.layer.update(LAYER_ONE_ID, { opacity: 0.5 });
		s.layer.update(LAYER_ONE_ID, { opacity: 1, selected: false });

		const { op, path } = changes[0];
		expect(op).toEqual("replace");
		expect(path).toEqual("/file/layerOrder");
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