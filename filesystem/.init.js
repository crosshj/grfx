const examples = {
	'example.js': "./filesystem/example.js"
};

export default async (fs) => {
	const { readFile, writeFile, walk, mkdir } = fs;
	await mkdir({ path: `/indexDB/downloads/` });

	for(const [name, url] of Object.entries(examples)){
		const data = await fetch(url).then(x => x.blob());
		const path = `/indexDB/${name}`;
		await writeFile({ path, data });
	}
	const module = await import(
		await readFile({ path: '/indexDB/example.js' })
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
