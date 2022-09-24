const examples = {
	'example.js': "./filesystem/example.js",
	'example3d.js': "./filesystem/example3d.js",
	'models/bunny.obj': "./filesystem/models/bunny.obj",
	'models/tree.obj': './filesystem/models/tree.obj',
};

export default async (fs) => {
	const { readFile, writeFile, walk, mkdir } = fs;
	await mkdir({ path: `/indexDB/downloads/` });
	await mkdir({ path: `/indexDB/models/` });

	for(const [name, url] of Object.entries(examples)){
		const data = await fetch(url).then(x => x.blob());
		const path = `/indexDB/${name}`;
		await writeFile({ path, data });
	}
	const module = await import(
		await readFile({ path: '/indexDB/example3d.js' })
	);

	await walk({
		dir: '/',
		callback: (err, results) => {
			if (err) throw err;
			console.log(results);
		}
	});

	return module.default;
};
