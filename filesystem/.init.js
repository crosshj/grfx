// import ex from './example.js';
// console.log(ex);

/*
	TODO:
	should be reading files in this directory into filesystem, NOT individual images
	those should be loaded by layer def
*/

const examples = {
	dunno: "https://raw.githubusercontent.com/crosshj/graphics-editor/main/assets/feedforward.png",
	robot: "https://images.nightcafe.studio/jobs/wJMbnnlCfS9WEVur80Qx/wJMbnnlCfS9WEVur80Qx_8.9286x.jpg",
	squid: "https://images.nightcafe.studio/jobs/gZVKddsDrWb2odrM3vsY/gZVKddsDrWb2odrM3vsY--2--Y98HJ.jpg",
	gold: "https://images.nightcafe.studio/jobs/7OXU5TcnbVF71K1zN79N/7OXU5TcnbVF71K1zN79N--3--5TQRK.jpg",
	owl: "https://images.nightcafe.studio/jobs/5freDC2naZa9EQrIUOQY/5freDC2naZa9EQrIUOQY.jpg",
	sky: "https://images.nightcafe.studio/jobs/lheEUAmhcoUn9fsxXGZP/lheEUAmhcoUn9fsxXGZP_6.9444x.jpg",
	'example.js': "./filesystem/example.js"
};

export default async (fs) => {
	const { readdir, readFile, writeFile, walk } = fs;
	// let indexDBContents = await readdir({ path: '/indexDB' });
	// if(!indexDBContents.length){
		for(const [name, url] of Object.entries(examples)){
			const example = await fetch(url).then(x => x.blob());
			await writeFile({
				path: name.includes('.')
					? `/indexDB/${name}`
					: `/indexDB/${name}.jpg`,
				data: example
			});
		}
	//	indexDBContents = await readdir({ path: '/indexDB' });
	// }
	const module = await import(
		await readFile({ path: '/indexDB/example.js' })
	);

	// const example = await readFile({ path: '/indexDB/example.js' });
	// console.log(example);

	// await walk({
	// 	dir: '/',
	// 	callback: (err, results) => {
	// 		if (err) throw err;
	// 		console.log(results);
	// 	}
	// });

	return module.default;
};
