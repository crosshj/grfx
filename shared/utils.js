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

// ripped parts from: https://github.com/jonnyhaynes/inline-svg
export const InlineSVG = async (src, id) => {
	const svgSrc = await fetch(src).then(x => x.text());
	const parser = new DOMParser();
	const result = parser.parseFromString(svgSrc, 'text/xml');
	const inlinedSVG = result.getElementsByTagName('svg')[0];
	inlinedSVG.removeAttribute('xmlns:a');
	inlinedSVG.removeAttribute('width');
	inlinedSVG.removeAttribute('height');
	inlinedSVG.removeAttribute('x');
	inlinedSVG.removeAttribute('y');
	inlinedSVG.removeAttribute('enable-background');
	inlinedSVG.removeAttribute('xmlns:xlink');
	inlinedSVG.removeAttribute('xml:space');
	inlinedSVG.removeAttribute('version');
	inlinedSVG.setAttribute('id', id);
	document.body.append(inlinedSVG);
};


const typeSizes = {
	"undefined": () => 0,
	"boolean": () => 4,
	"number": () => 8,
	"string": item => 2 * item.length,
	"object": item => !item ? 0 : Object
		.keys(item)
		.reduce((total, key) => sizeOf(key) + sizeOf(item[key]) + total, 0)
};
export const sizeOf = (obj) => {
	if(obj?.byteLength !== undefined) return obj.byteLength;
	if(obj?.size !== undefined) return obj.size;
	return typeSizes[typeof obj](obj);
}

export function formatByteSize(bytes) {
	if(bytes < 1024) return bytes + " bytes";
	else if(bytes < 1048576) return(bytes / 1024).toFixed(3) + " KiB";
	else if(bytes < 1073741824) return(bytes / 1048576).toFixed(3) + " MiB";
	else return(bytes / 1073741824).toFixed(3) + " GiB";
};

export function sizeOf2(obj, bytes=0) {
	if(obj === null || obj === undefined) return bytes;
	if(obj?.byteLength !== undefined) return obj.byteLength;
	if(obj?.size !== undefined) return obj.size;
	switch(typeof obj) {
		case 'number':
			bytes += 8;
			break;
		case 'string':
			bytes += obj.length * 2;
			break;
		case 'boolean':
			bytes += 4;
			break;
		case 'object':
			var objClass = Object.prototype.toString.call(obj).slice(8, -1);
			if(objClass === 'Object' || objClass === 'Array') {
				for(var key in obj) {
					if(!obj.hasOwnProperty(key)) continue;
					bytes += sizeOf(obj[key]);
				}
			} else {
				bytes += obj.toString().length * 2;
			}
			break;
	}
	return bytes;
};

// TODO: convert to/from many data types
// https://gist.github.com/xl1/0b24fb2e61c39448a38d3c90b6c6fe3b

//https://stackoverflow.com/a/2117523
export function uuidv4() {
	return ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c =>
		(c ^ crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16)
	);
}