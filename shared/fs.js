import BrowserFS from 'https://cdn.skypack.dev/browserfs';
import { blobToBase64 } from './utils.js'; 

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

const writeFile = ({ fs, path, data }) => new Promise(async (resolve, reject) => {
	const blob = data instanceof Blob
		? data
		: new Blob([data], {
			type: 'text/plain'
		});
	const base64 = await blobToBase64(blob);
	fs.writeFile(path, base64, (e) => !!e ? reject(e) : resolve());
});

const readdir = ({ fs, path }) => new Promise((resolve, reject) => {
	fs.readdir(path, (e, data) => !!e ? reject(e) : resolve(data));
});

const uint8ArrToString = (uint8arr) => new Promise((resolve) => {
	var bb = new Blob([uint8arr]);
	var f = new FileReader();
	f.onload = function(e) {
			resolve(e.target.result);
	};
	f.readAsText(bb);
});

const readFile = ({ fs, path, encoding='base64' }) => new Promise((resolve, reject) => {
	fs.readFile(path, async (e, data) => {
		if(e) return reject(e);
		if(encoding === 'base64')
			return resolve(data);
		if(encoding === "utf8"){
			const decoded = atob(
				decodeURIComponent(
					escape(
						await uint8ArrToString(data)
					)
				).split('base64,')[1]
			);
			return resolve(decoded);
		}
		resolve(data);
	});
});

const exists = ({ fs, path }) => new Promise((resolve) => {
	fs.stat(path, (e, stat) => resolve(!e));
});

const mkdir = ({ fs, path }) => new Promise((resolve) => {
	fs.mkdir(path, (e, stat) => resolve(!e));
});

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
	const { fs, path, Buffer } = await configure(mountConfig);
	FileSystem.fs = fs;
	fs.path = path;
	FileSystem.path = path;
	FileSystem.Buffer = Buffer;
	return fn && await fn(FileSystem);
};
FileSystem.walk = (args) => walk({ ...args, fs: FileSystem.fs });;
FileSystem.readdir = (args) => readdir({ ...args, fs: FileSystem.fs });
FileSystem.readFile = (args) => readFile({ ...args, fs: FileSystem.fs });
FileSystem.writeFile = (args) => writeFile({ ...args, fs: FileSystem.fs });
FileSystem.exists = (args) => exists({ ...args, fs: FileSystem.fs });
FileSystem.mkdir = (args) => mkdir({ ...args, fs: FileSystem.fs });

export default FileSystem;
