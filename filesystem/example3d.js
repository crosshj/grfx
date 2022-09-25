const images = {
	hatch: `images/hatch.png`,
	leaves: `images/leaves.png`,
	needles: `images/needles.png`,
	stones: `images/stones.png`,
};

const threejs = `
	const THREE = await import('three');
	const { OBJLoader } = await import('three-objloader');
	const { LoopSubdivision } = await import('three-subdivide');

	const bunnySrc = await loadFile('models/bunny.obj');
	const treeSrc = await loadFile('models/tree.obj');

	const gl = ctx;
	const canvas = gl.canvas;
	const { width, height } = canvas;

	const loader = new OBJLoader(THREE);

	const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
	renderer.setSize(width, height);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
	camera.position.x = 0;
	camera.position.y = 50;
	camera.position.z = 160;
	camera.lookAt(new THREE.Vector3(0, 35, 5));

	// top left purple light
	var light = new THREE.PointLight( 0x7744aa, 1, 200);
	light.position.set( -20, 140, 30 );
	light.castShadow = true;
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;
	//light.shadow.camera.left = 500;
	scene.add( light );

	// top right yellow light
	var light2 = new THREE.PointLight( 0xdd8822, 1, 200);
	light2.position.set( 20, 140, 30 );
	light2.castShadow = true;
	light2.shadow.mapSize.width = 1024;
	light2.shadow.mapSize.height = 1024;
	//light2.shadow.camera.left = 500;
	scene.add( light2 );

	// front light (green)
	var light3 = new THREE.PointLight( 0xffffaa, 0.1, 400);
	light3.position.set( -5, 30, 45 );
	light3.castShadow = true;
	light3.shadow.mapSize.width = 1024;
	light3.shadow.mapSize.height = 1024;
	//light3.shadow.camera.left = 500;
	scene.add( light3 );

	var ambientLight = new THREE.AmbientLight(0x100800);
	scene.add(ambientLight);


	const ImageTexture = (args) => {
		const tex = new THREE.Texture(args.pattern);
		tex.needsUpdate = true;
		tex.anisotropy = 64;
		tex.center = new THREE.Vector2(0.5, 0.5);
		tex.repeat.set(args.scale,args.scale);
		// tex.rotation = 1.68;
		tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
		return tex;
	};


	const leavesPat = await loadImage("${images.leaves}");
	const stonesPat = await loadImage("${images.stones}");
	const needlesPat = await loadImage("${images.needles}");
	const hatchPat = await loadImage("${images.hatch}");

	const groundMat = new THREE.MeshStandardMaterial({
		color: 0x66aa77
	});
	const hatchTex = ImageTexture({
		pattern: hatchPat,
		scale: 0.5
	});
	const needlesTex = ImageTexture({
		pattern: needlesPat,
		scale: 1
	});
	const bunnyMat = new THREE.MeshPhongMaterial( {
		color: 0xffffff,
		specular: 0xffffff,
		shininess: 0,
		emissive: 0x202020,
		//map: hatchTex
	});
	// bunnyMat.side = THREE.DoubleSide;
	bunnyMat.side = THREE.BackSide;
	const blackBunnyMat = new THREE.MeshPhongMaterial( {
		color: 0x000000,
		specular: 0xffffff,
		shininess: 1,
		emissive: 0x0d0d0d,
	});
	blackBunnyMat.side = THREE.BackSide;

	const leavesTex = ImageTexture({
		pattern: leavesPat,
		scale: 6
	});
	const leavesMat = new THREE.MeshPhongMaterial({
		color: 0x88ccaa,
		//specular: 0x8bc34a,
		shininess: 0,
		map: leavesTex,
	});

	const stoneTex = ImageTexture({
		pattern: stonesPat,
		scale: 15
	});
	const barkMat = new THREE.MeshPhongMaterial({
		color: 0xffcc21,
		specular: 0xdcc19c,
		shininess: 0,
		map: stoneTex,
	});

	const woopsMat = new THREE.MeshStandardMaterial({
		color: 0xff00ff
	});

	//var helper = new THREE.CameraHelper( light.shadow.camera );
	//scene.add( helper );
	var camhelper = new THREE.CameraHelper( camera );
	//scene.add( camhelper );
	var axesHelper = new THREE.AxesHelper( 5 );
	//scene.add( axesHelper );

	const groundGeom = new THREE.PlaneGeometry(1000, 1000, 4, 4);
	const groundMesh = new THREE.Mesh(groundGeom, groundMat);
	groundMesh.rotation.x = -Math.PI / 2;
	groundMesh.position.y = -20;
	groundMesh.position.z = 400;
	groundMesh.receiveShadow = true;
	groundMesh.castShadow = true;
	scene.add(groundMesh);

	const SubdivideFlat = (inGeometry) => {
		const iterations = 1;
		const params = {
			split:          true,       // optional, default: true
			uvSmooth:       true,      // optional, default: false
			preserveEdges:  false,      // optional, default: false
			flatOnly:       true,      // optional, default: false
			maxTriangles:   Infinity,   // optional, default: Infinity
		};
		const geometry = LoopSubdivision.modify(
			inGeometry,
			iterations,
			params.split,
			params.uvSmooth,
			params.flatOnly,
			params.maxTriangles
		);
		console.log(geometry, inGeometry)
		return geometry;
	};


	if(bunnySrc){
		const bunny = loader.parse(bunnySrc);
		bunny.traverse( function ( child ) {
			if ( !(child instanceof THREE.Mesh) ) return;
			//child.geometry = SubdivideFlat(child.geometry);
			child.material = bunnyMat;
			child.castShadow = true;
			child.receiveShadow = true;
		});
		const bunnyScaleDim = 4;
		bunny.scale.set(bunnyScaleDim, bunnyScaleDim, bunnyScaleDim);
		bunny.position.x = 33;
		bunny.position.y = -20;
		bunny.position.z = 35;
		bunny.rotateY((-50 * Math.PI)/180);
		scene.add(bunny);

		const blackBunny = bunny.clone();
		const bigger = 1.2;
		blackBunny.scale.set(bunnyScaleDim*bigger, bunnyScaleDim*bigger, bunnyScaleDim*bigger);
		blackBunny.position.x = 0;
		blackBunny.position.y = -20;
		blackBunny.position.z = 43;
		blackBunny.rotateY((110 * Math.PI)/180);
		blackBunny.traverse( function ( child ) {
			child.material = blackBunnyMat;
		});
		scene.add(blackBunny);
	}

	if(treeSrc){
		const tree = loader.parse(treeSrc);
		tree.traverse( function ( child ) {
			if ( !(child instanceof THREE.Mesh) ) return;
			//child.geometry = SubdivideFlat(child.geometry);
			child.material = child.material.map(material => {
				if(material.name === 'Bark') return barkMat;
				if(material.name === 'Tree') return leavesMat;
				return woopsMat;
			});
			child.castShadow = true;
			child.receiveShadow = true;
		});

		const tree2 = tree.clone();
		const bush = tree.clone();
		const bush2 = bush.clone();
		const tree3 = tree.clone();

		// far tree
		var treeScaleDim = 1.6;
		tree.scale.set(treeScaleDim, treeScaleDim, treeScaleDim);
		tree.position.x = 30;
		tree.position.y = -20;
		tree.position.z = -65;
		tree.rotation.y = (-45 * Math.PI)/180;
		scene.add(tree);

		// mid tree
		const tree2ScaleDim = 3.7;
		tree2.scale.set(tree2ScaleDim, tree2ScaleDim, tree2ScaleDim);
		tree2.position.x = -40;
		tree2.position.y = -20;
		tree2.position.z = -15;
		tree2.rotation.y = (205 * Math.PI)/180;
		scene.add(tree2);

		// front tree
		const tree3ScaleDim = 5.5;
		tree3.scale.set(tree3ScaleDim, tree3ScaleDim, tree3ScaleDim);
		tree3.position.x = -120;
		tree3.position.y = -20;
		tree3.position.z = 75;
		tree3.rotation.y = (220 * Math.PI)/180;
		scene.add(tree3);

		const bushScaleDim = 2.7;
		bush.scale.set(bushScaleDim, bushScaleDim, bushScaleDim);
		bush.position.x = -83;
		bush.position.y = -65;
		bush.position.z = 40;
		bush.rotation.y = (-125 * Math.PI)/180;
		scene.add(bush);

		// right bush
		const bush2ScaleDim = 5;
		bush2.scale.set(bush2ScaleDim, bush2ScaleDim, bush2ScaleDim);
		bush2.position.x = 100;
		bush2.position.y = -93;
		bush2.position.z = 80;
		bush2.rotation.y = (-90 * Math.PI)/180;
		scene.add(bush2);
	}

	renderer.render(scene, camera);
`.replace(/^\t/gm, '');

const background = `
	const { width, height } = getDims();
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	var grd = ctx.createLinearGradient(0, 0, 0, 0.66*height);
	grd.addColorStop(0, "#04070c");
	grd.addColorStop(1, "#0a1420");
	ctx.fillStyle = grd;
	//ctx.fillStyle = "#0a1420";
	ctx.fill();
`.replace(/^\t/gm, '');

const moon = `
	const { width, height } = getDims();
	const grd = ctx.createRadialGradient(
		0.7930555555555555*width, height*0.19074074074074074, 0,
		0.7930555555555555*width, height*0.19074074074074074, width*0.041666666666666664
	);
	grd.addColorStop(0, "#ffffff1f");
	grd.addColorStop(1, "#3333331f");
	ctx.fillStyle = grd;

	ctx.arc(width*0.8, height*0.2, width*0.041666666666666664, 0, 2*Math.PI, false);
	ctx.fill();
`;

export default {
	zoom: 0.3,
	width: 800,
	height: 600,
	tool: "airbrush",
	layers: [{
		number: 0,
		name: "moon",
		selected: true,
		type: '2d',
		def: moon
	}, {
		number: 1,
		name: "threejs",
		type: 'webgl2',
		def: threejs
	}, {
		number: 2,
		name: "background",
		type: '2d',
		def: background
	}]
};
