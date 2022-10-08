const defaultSettings = {
	'select-free': {
		type: 'Free',
		mode: 'add',
		size: 50,
		feather: 0,
	},
	'select-box': {
		type: 'Rectangle',
		mode: 'new',
		feather: 50,
	},
	erase: {
		brush: 50,
		opacity: 100,
		flow: 100,
	},
	fill: {
		tolerance: 20,
		opacity: 100,
	},
	dropper: {
		target: 'Main',
	},
	mag: {
		mode: 'Plus',
	},
	pencil: {
		variant: 'Plain',
		size: 1,
		amount: 100,
		opacity: 100,
	},
	brush: {
		size: 1,
		opacity: 100,
		flow: 100,
		mirror: 'None',
	},
	airbrush: {
		size: 1,
		opacity: 100,
		flow: 100,
		mirror: 'None',
	},
	text: {
		font: 'Serif',
		fill: '#0000ff',
		size: 12,
	},
	line: {
		size: 1,
		opacity: 100,
		color: '#00ff00',
	},
	curve: {
		size: 1,
		opacity: 100,
		color: '#ff0000',
	},
	rect: {
		fill: '#634587',
	},
	poly: {
		fill: '#3CBE6E',
	},
	ellipse: {
		fill: '#DE673F',
	},
	rounded: {
		fill: '#634587',
		radius: 0
	},
};

const state = {};

const set = (tool, props) => {
	state[tool] = state[tool] || defaultSettings[tool];
	state[tool] = { ...state[tool], ...props };
};
const get = (tool) => {
	return state[tool] || defaultSettings[tool];;
};

export default { set, get };
