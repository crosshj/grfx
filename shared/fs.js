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

const readFile = ({ fs, path, encoding='base64' }) => new Promise((resolve, reject) => {
	fs.readFile(path, (e, data) => {
		if(e) return reject(e);
		if(encoding === 'base64')
			return resolve(data);
		const decoded = atob(
			decodeURIComponent(
				escape(
					String.fromCharCode(...data)
				)
			).split('base64,')[1]
		);
		resolve(decoded);
	});
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
	fn && await fn(FileSystem);
};
FileSystem.walk = (args) => walk({ ...args, fs: FileSystem.fs });;
FileSystem.readdir = (args) => readdir({ ...args, fs: FileSystem.fs });
FileSystem.readFile = (args) => readFile({ ...args, fs: FileSystem.fs });
FileSystem.writeFile = (args) => writeFile({ ...args, fs: FileSystem.fs });


export default FileSystem;
