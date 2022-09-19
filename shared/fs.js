import BrowserFS from 'https://cdn.skypack.dev/browserfs';

const mountConfig = {
	fs: "MountableFileSystem",
	options: {
		'/memory': { fs: "InMemory" },
		'/indexDB': { fs: "IndexedDB", options: { storeName: 'graphics-editor' } }
	}
};

const configure = (config) => new Promise((resolve, reject) => {
	BrowserFS.configure(mountConfig, function(e) {
		if(e) reject(e);
		const fs = BrowserFS.BFSRequire('fs');
		const path = BrowserFS.BFSRequire('path');
		const { Buffer } = BrowserFS.BFSRequire('buffer');
		resolve({ fs, path, Buffer });
	});
});

const writeFile = ({ fs, path, data }) => new Promise((resolve, reject) => {
	fs.writeFile(path, data, (e) => !!e ? reject(e) : resolve());
});

const readdir = ({ fs, path }) => new Promise((resolve, reject) => {
	fs.readdir(path, (e, data) => !!e ? reject(e) : resolve(data));
});

const readFile = ({ fs, path }) => new Promise((resolve, reject) => {
	fs.readFile(path, (e, data) => !!e ? reject(e) : resolve(data));
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
const walk = ({ fs, dir, callback }) => {
	var results = [];
	fs.readdir(dir, function(err, list) {
		if (err) return callback(err);
		var i = 0;
		(function next() {
			var file = list[i++];
			if (!file) return callback(null, results);
			file = fs.path.resolve(dir, file);
			//console.log(file)
			fs.stat(file, function(err, stat) {
				if (stat && stat.isDirectory()) {
					walk({
						fs,
						dir: file,
						callback: (err, res) => {
							results = results.concat(res);
							next();
						}
					});
				} else {
					results.push(file);
					next();
				}
			});
		})();
	});
};

const FileSystem = () => {};
FileSystem.init = async ({ config: fn } = {}) => {
	const { fs, path } = await configure(mountConfig);
	FileSystem.fs = fs;
	fs.path = path;
	FileSystem.path = path;
	fn && await fn(FileSystem);
};
FileSystem.walk = (args) => walk({ ...args, fs: FileSystem.fs });;
FileSystem.readdir = (args) => readdir({ ...args, fs: FileSystem.fs });
FileSystem.readFile = (args) => readFile({ ...args, fs: FileSystem.fs });
FileSystem.writeFile = (args) => writeFile({ ...args, fs: FileSystem.fs });
FileSystem.blobToBase64 = blobToBase64;

export default FileSystem;
