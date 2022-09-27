const examples = {
	'example.js': "./filesystem/example.js",
	'example3d.js': "./filesystem/example3d.js",
	'example3d2.js': "./filesystem/example3d2.js",

	'models/bunny.obj': "./filesystem/models/bunny.obj",
	'models/tree.obj': './filesystem/models/tree.obj',
	'models/cube.obj': './filesystem/models/cube.obj',

	'images/hatch.png': './filesystem/images/hatch.png',
	'images/leaves.png': './filesystem/images/leaves.png',
	'images/needles.png': './filesystem/images/needles.png',
	'images/stones.png': './filesystem/images/stones.png',
	'images/feedforward.png': './filesystem/images/feedforward.png',
};

export default async (fs) => {
	const { readFile, writeFile, walk, mkdir } = fs;
	await mkdir({ path: `/indexDB/downloads/` });
	await mkdir({ path: `/indexDB/models/` });
	await mkdir({ path: `/indexDB/images/` });

	for(const [name, url] of Object.entries(examples)){
		const data = await fetch(url).then(x => x.blob());
		const path = `/indexDB/${name}`;
		await writeFile({ path, data });
	}
	const module = await import(
		await readFile({ path: '/indexDB/example3d2.js' })
	);

	// await walk({
	// 	dir: '/',
	// 	callback: (err, results) => {
	// 		if (err) throw err;
	// 		console.log(results);
	// 	}
	// });

	return module.default;
};
