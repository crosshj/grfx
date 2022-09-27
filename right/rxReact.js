import { isInitedFactory } from './utils.js';

function rxReact() {
	return returnProps(rxReact);
}
rxReact.scripts = [
	"../vendor/rxjs.umd.min.js",
	//'https://cdnjs.cloudflare.com/ajax/libs/rxjs/6.2.0/rxjs.umd.min.js',
	//'https://unpkg.com/rxjs@beta/bundles/rxjs.umd.js',
	[
		// react and react-dom should waterfall
		// 'https://unpkg.com/react@16/umd/react.development.js',
		// 'https://unpkg.com/react-dom@16/umd/react-dom.development.js'
		"../vendor/react.development.js",
		"../vendor/react-dom.development.js",
	],
];

rxReact.scriptsAfter = (callback) => {
	const { of, fromEvent, from, range } = rxjs;
	const { Observable, Subject } = rxjs;
	const { map, filter, startWith, scan } = rxjs.operators;
	const { render } = ReactDOM;
	const { createElement, Component } = React;

	//TODO: would be nice t integrate with redux dev tools!

	const components = {
		fragment: (children) => createElement(React.Fragment, null, children),
	};
	[
		"div",
		"textarea",
		"input",
		"h1",
		"h2",
		"h3",
		"h4",
		"h5",
		"p",
		"span",
		"ul",
		"li",
		"img",
		"canvas",
		"label",
		"form",
		"button",
		"select",
		"option",
		"svg",
		"g",
		"path",
		"circle",
		"rect",
		"polygon",
	].forEach((el) => {
		components[el] = (props, children) => createElement(el, props, children);
	});

	const action$ = new Subject();
	const dispatcher = function (action) {
		return action$.next(action);
	};

	function RXConnector(props) {
		this.state = props.initialState;
		this.render = () => {
			return components.fragment(props.render(this.state));
		};
		this.observable$ = props.observable$;
		this.componentWillMount = function () {
			this.observable$.subscribe((o) => {
				this.setState(o);
			});
		};
	}
	RXConnector.prototype = Object.create(Component.prototype);
	const Connector = (props, children) =>
		createElement(RXConnector, props, children);

	const start = (
		{ reducer, root, attach, initialState = {} },
		reactStartCallback
	) => {
		const store$ = action$.pipe(scan(reducer, initialState));

		render(Connector({ observable$: store$, render: root, initialState }), attach);
		reactStartCallback();
	};

	if (!components || !dispatcher || !start || !React || !rxjs) {
		callback(
			`rxReact missing one of: { components, dispatcher, start, React, rxjs }!`
		);
		return;
	}
	callback(null, { components, dispatcher, start, React, rxjs });
};
rxReact.init = (callback) => isInitedFactory(rxReact, callback);

export default rxReact;
