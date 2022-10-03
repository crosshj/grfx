const mount = {
	fs: 'MountableFileSystem',
	options: {
		'/memory': { fs: 'InMemory' },
		'/indexDB': { fs: 'IndexedDB', options: { storeName: 'graphics-editor' } }
	}
};


const dirs = 	[
	'/indexDB/downloads/',
	'/indexDB/models/',
	'/indexDB/images/',
];

// destination : source
const files = {
	'/indexDB/example.js': './filesystem/example.js',
	'/indexDB/example3d.js': './filesystem/example3d.js',
	'/indexDB/example3d2.js': './filesystem/example3d2.js',

	'/indexDB/models/bunny.obj': './filesystem/models/bunny.obj',
	'/indexDB/models/tree.obj': './filesystem/models/tree.obj',
	'/indexDB/models/cube.obj': './filesystem/models/cube.obj',

	'/indexDB/images/hatch.png': './filesystem/images/hatch.png',
	'/indexDB/images/leaves.png': './filesystem/images/leaves.png',
	'/indexDB/images/needles.png': './filesystem/images/needles.png',
	'/indexDB/images/stones.png': './filesystem/images/stones.png',
	'/indexDB/images/feedforward.png': './filesystem/images/feedforward.png',
};


const boot = async (fs) => {
	const { exists, writeFile, walk, mkdir } = fs;

	for(const path of dirs){
		await mkdir({ path });
	}
	for(const [path, url] of Object.entries(files)){
		const fileExists = await exists({ path });
		if(fileExists) continue;
		const data = await fetch(url).then(x => x.blob());
		await writeFile({ path, data });
	}

	await walk({
		dir: '/',
		callback: (err, results) => {
			if (err) throw err;
			console.log(results);
		}
	});
};

export default boot;
