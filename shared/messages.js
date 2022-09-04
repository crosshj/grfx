/*
	TODO:
		if window.top, this is a child, send and listen to top
		if !window.top, relay/broadcast messages between windows
*/

export const listen = (eventName, handler) => {
	console.log({ eventName });
};

export const send = (eventName, data) => {
	console.log({eventName, data})
};
