const broadcast = (message, source) => {
	const iframes = document.body.querySelectorAll('iframe');
	for(var iframe of Array.from(iframes)){
		const { href: dest } = iframe.contentWindow.location;
		if(source === dest) continue;
		iframe.contentWindow.postMessage({ source, ...message });
	}
};

export const host = () => {
	window.addEventListener("message", (event) => {
		const { href: source } = event.source.location;
		broadcast(event.data, source);
	}, false);
	return { broadcast };
};

export const listen = (eventName, handler) => {
	window.addEventListener("message", (event) => {
		const { eventName: messageEventName, data, ...rest } = event.data;
		if(messageEventName !== eventName) return;
		handler({ ...data, ...rest });
	});
};

export const send = (eventName, data) => {
	window.top.postMessage({ eventName, data });
};
