//import * as filer from 'https://unpkg.com/filer';
import BrowserFS from 'https://cdn.skypack.dev/browserfs';

const EXAMPLE_IMAGE = "https://raw.githubusercontent.com/crosshj/graphics-editor/main/assets/feedforward.png";
const EXAMPLE_IMAGE_ROBOT = "https://images.nightcafe.studio/jobs/wJMbnnlCfS9WEVur80Qx/wJMbnnlCfS9WEVur80Qx_8.9286x.jpg";
const EXAMPLE_IMAGE_SQUID = "https://images.nightcafe.studio/jobs/gZVKddsDrWb2odrM3vsY/gZVKddsDrWb2odrM3vsY--2--Y98HJ.jpg";
const EXAMPLE_GOLD = "https://images.nightcafe.studio/jobs/7OXU5TcnbVF71K1zN79N/7OXU5TcnbVF71K1zN79N--3--5TQRK.jpg";
const EXAMPLE_OWL = "https://images.nightcafe.studio/jobs/5freDC2naZa9EQrIUOQY/5freDC2naZa9EQrIUOQY.jpg";
const EXAMPLE_SKY = "https://images.nightcafe.studio/jobs/lheEUAmhcoUn9fsxXGZP/lheEUAmhcoUn9fsxXGZP_6.9444x.jpg";

const mountConfig = {
	fs: "MountableFileSystem",
	options: {
		'/memory': { fs: "InMemory" },
		'/indexDB': { fs: "IndexedDB", options: { storeName: 'graphics-editor' } }
	}
};
//console.log(browserfs);
const configure = (config) => new Promise((resolve, reject) => {
	BrowserFS.configure(mountConfig, function(e) {
		if(e) reject(e);
		const fs = BrowserFS.BFSRequire('fs');
		const path = BrowserFS.BFSRequire('path');
		const { Buffer } = BrowserFS.BFSRequire('buffer');
		resolve({ fs, path, Buffer });
	});
});

const writeFile = ({ fs, path, data }) => {
	return new Promise((resolve, reject) => {
		fs.writeFile(
			path,
			data,
			(e) => {
				if(e) reject(e);
				resolve();
			}
		);
	});
};

const readdir = ({ fs, path }) => new Promise((resolve, reject) => {
	fs.readdir(path, (e, data) => {
		if(e) reject(e);
		resolve(data);
	});
});

const readFile = ({ fs, path }) => new Promise((resolve, reject) => {
	fs.readFile(path, (e, data) => {
		if(e) reject(e);
		resolve(data);
	});
});

const blobToBinary = async (blob) => {
	const buffer = await blob.arrayBuffer();
	const view = new UInt8Array(buffer);
	return [...view].map((n) => n.toString(2)).join(' ');
};
const binaryToDataUri = async (binary, type) => {
	var decoder = new TextDecoder('utf8');
	// const numbers = binary.trim().split(/\s*,\s*/g).map(x => x/1);
	//const binstr = String.fromCharCode(...binary);
	const b64str = btoa(decoder.decode(binary));
	const src = `data:image/${type};base64,` + b64str;
	return src;
};
const blobToBase64 = (blob) => {
	return new Promise((resolve) => {
		const reader = new FileReader();
		reader.readAsDataURL(blob);
		reader.onloadend = function () {
			resolve(reader.result);
		};
	});
};

const { fs, path, Buffer } = await configure(mountConfig);

var walk = function(dir, done) {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) return done(err);
		var i = 0;
		(function next() {
			var file = list[i++];
			if (!file) return done(null, results);
			file = path.resolve(dir, file);
			console.log(file)
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					walk(file, function(err, res) {
						results = results.concat(res);
						next();
					});
				} else {
					results.push(file);
					next();
				}
			});
		})();
	});
};

let indexDBContents = await readdir({ fs, path: '/indexDB' });
if(!indexDBContents.length){
	const example = await fetch(EXAMPLE_SKY).then(x => x.blob());
	await writeFile({
		fs,
		path: '/indexDB/sky.jpg',
		data: await blobToBase64(example)
	});
	indexDBContents = await readdir({ fs, path: '/indexDB' });
}
console.log(indexDBContents)

// walk('/', function(err, results) {
// 	if (err) throw err;
// 	console.log(results);
// });


const FileSystem = () => {};
FileSystem.readImage = async (path) => {
	const file = await readFile({ fs, path });
	return file;
	//return binaryToDataUri(file, 'png');
};
export default FileSystem;
