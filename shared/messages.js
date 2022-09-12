
const resolve = {};
const online = {};
if(window.top === window){
	const clients = ['main', 'right'];
	for(const client of clients){
		online[client] = new Promise(r => resolve[client] = r);
	}
}

const broadcast = async (message, source) => {
	await online.main;
	const iframes = document.body.querySelectorAll('iframe');
	for(var iframe of Array.from(iframes)){
		const { href: dest } = iframe.contentWindow.location;
		if(source === dest) continue;
		iframe.contentWindow.postMessage({ source, ...message });
	}
};

export const host = () => {
	const listeners = {};
	const listen = (name, handler) => {
		listeners[name] = listeners[name] || [];
		listeners[name].push(handler);
	};
	window.addEventListener("message", (event) => {
		const { eventName } = event.data;
		const { href: source } = event.source.location;
		if(eventName === "ping" && source.includes('grfx/main')){
			return resolve.main();
		}
		if(eventName === "ping" && source.includes('grfx/right')){
			return resolve.right();
		}
		if(listeners[eventName]){
			for(const listener of listeners[eventName]){
				listener({ source, ...event.data.data });
			}
		}
		broadcast(event.data, source);
	}, false);
	return { broadcast, listen };
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
