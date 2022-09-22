export const sleep = ms => new Promise(r => setTimeout(r, ms));

export function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

export function clone(o){
	try {
		return JSON.parse(JSON.stringify(o));
	} catch(e){}
}

export const blobToBinary = async (blob) => {
	const buffer = await blob.arrayBuffer();
	const view = new UInt8Array(buffer);
	return [...view].map((n) => n.toString(2)).join(' ');
};
export const binaryToDataUri = async (binary, type) => {
	var decoder = new TextDecoder('utf8');
	// const numbers = binary.trim().split(/\s*,\s*/g).map(x => x/1);
	//const binstr = String.fromCharCode(...binary);
	const b64str = btoa(decoder.decode(binary));
	const src = `data:image/${type};base64,` + b64str;
	return src;
};
export const blobToBase64 = (blob) => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = function () {
			resolve(reader.result);
		};
	});
};
export const blobToBuffer = (fs, blob) => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.readAsArrayBuffer(blob);
		reader.onloadend = function () {
			//console.log(typeof reader.result)
			resolve(
				// fs.Buffer.from(new Uint8Array(reader.result))
				fs.Buffer.from(reader.result)
			);
		};
	});
};

export const dashedToCamel = x => x.replace(/-./g, (m) => m[1].toUpperCase());
export const camelToDashed = x => x.replace(/[A-Z]/g, (match, offset) => (offset > 0 ? '-' : '') + match.toLowerCase());