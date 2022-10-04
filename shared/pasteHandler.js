const pasteHandler = (cb) => async (event) => {
	const items = (event.clipboardData || event.originalEvent.clipboardData).items;
	const results = [];
	for(const item of items) {
		let result = "";
		if (item.kind === 'file') {
			result = new Promise((resolve) => {
				const blob = item.getAsFile();
				const reader = new FileReader();
				reader.onload = (e) => resolve(e.target.result);
				reader.readAsDataURL(blob);
			});
		}
		if(item.kind === "string"){
			result = new Promise((resolve) => item.getAsString(resolve));
		}
		results.push(await result);
	}
	cb(results)
};

pasteHandler.attach = (cb) => {
	// window.addEventListener('paste', ... or
	document.onpaste = pasteHandler(cb);
};

export default pasteHandler;
