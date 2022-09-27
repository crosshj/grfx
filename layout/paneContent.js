const createTabContent = ({ pane, file, layout }) => {
	const params = new URLSearchParams(
		file.includes('?')
			? file.split('?').pop()
			: ''
	);
	const paramsFile = params.get("file");
	const service = params.get("service");
	const paneid = params.get("paneid")
	!paneid && params.set("paneid", pane);
	
	const paneConfig = layout.flatConfig().find(x => x.id === (pane||paneid));
	const paneModule = paneConfig?.module;

	const paramsString = params.toString().replace(/%2F/g, '/');

	const src = paneModule
		? `${paneModule||''}`
		: `${file}`;

	const sandbox = [
		"allow-same-origin",
		"allow-scripts",
		"allow-popups",
		"allow-modals",
		"allow-downloads",
		"allow-forms",
		"allow-top-navigation",
		"allow-popups-to-escape-sandbox",
	].join(" ");
	const iframe = `<iframe
		src="${src}"
		allowtransparency=”true”
		sandbox="${sandbox}"
		width="100%" height="100%"
	></iframe>`;
	return iframe;
};

export default createTabContent;
