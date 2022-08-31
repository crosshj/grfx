import YAML from "https://cdn.skypack.dev/yaml";
import Layout from "https://unpkg.com/@fiug/layout";
import createTabContent from './paneContent.js';

export default async () => {
	let layoutConfig = "./layout/layout.yaml";

	if (typeof layoutConfig !== "object") {
		const url = layoutConfig;
		const source = await fetch(layoutConfig).then((r) => r.text());

		if (url.includes(".json")) {
			layoutConfig = JSON.parse(source);
		}
		if (url.includes(".yml") || url.includes(".yaml")) {
			layoutConfig = YAML.parse(source);
		}
	}

	const layout = new Layout({
		...layoutConfig,
		parent: document.querySelector('#layout'),
		//events: { createTab, createPane, createTabContent }
		events: { createTabContent }
	});
	return layout;
};

