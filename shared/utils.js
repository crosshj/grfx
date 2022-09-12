export const sleep = ms => new Promise(r => setTimeout(r, ms));

export function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

export function clone(o){
	try {
		return JSON.parse(JSON.stringify(o));
	} catch(e){}
}