const def = `
	//TODO: pattern-leaves, pattern-stones

	const bunnySrc = await loadFile('models/bunny.obj');
	const treeSrc = await loadFile('models/tree.obj');

	const gl = ctx;
	const canvas = gl.canvas;
	const { width, height } = canvas;
	const THREE = await import('https://cdn.skypack.dev/three');
	const { OBJLoader } = await import('../../shared/OBJLoader.js');

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

	var light = new THREE.PointLight( 0xaa11dd, 2, 120);
	light.position.set( -20, 70, 20 );
	light.castShadow = true;
	light.shadow.mapSize.width = 1024;
	light.shadow.mapSize.height = 1024;
	light.shadow.camera.left = 500;
	scene.add( light );

	var light2 = new THREE.PointLight( 0xffaa22, 2, 120);
	light2.position.set( 20, 70, 20 );
	light2.castShadow = true;
	light2.shadow.mapSize.width = 1024;
	light2.shadow.mapSize.height = 1024;
	light2.shadow.camera.left = 500;
	scene.add( light2 );

	// front light
	var light3 = new THREE.PointLight( 0xffff00, 1, 120);
	light3.position.set( 10, 30, 60 );
	light3.castShadow = false;
	light3.shadow.mapSize.width = 1024;
	light3.shadow.mapSize.height = 1024;
	light3.shadow.camera.left = 500;
	scene.add( light3 );

	var ambientLight = new THREE.AmbientLight(0x303030);
	scene.add(ambientLight);

	var groundMaterial = new THREE.MeshStandardMaterial( { color: 0xffffff } );
	var groundGeom = new THREE.PlaneGeometry(1000, 1000, 4, 4);
	var groundMesh = new THREE.Mesh(groundGeom, groundMaterial);
	groundMesh.rotation.x = -Math.PI / 2;
	groundMesh.position.y = -20;
	groundMesh.position.z = 400;
	groundMesh.receiveShadow = true;
	groundMesh.castShadow = true;
	scene.add(groundMesh);

	//var helper = new THREE.CameraHelper( light.shadow.camera );
	//scene.add( helper );

	var camhelper = new THREE.CameraHelper( camera );
	//scene.add( camhelper );

	var axesHelper = new THREE.AxesHelper( 5 );
	//scene.add( axesHelper );

	// const loader = new THREE.OBJLoader();
	const loader = new OBJLoader(THREE);

	if(bunnySrc){
		const bunny = loader.parse(bunnySrc);
		bunny.traverse( function ( child ) {
			if ( child instanceof THREE.Mesh ) {
				child.material = new THREE.MeshPhongMaterial( {
					color: 0xffffff, specular: 0xffffff, shininess: 1,
					emissive: 0x181818
				});
				child.material.side = THREE.BackSide;
				child.material.overdraw = 1
				child.castShadow = true;
				child.receiveShadow = true;
			}
		});
		var bunnyScaleDim = 3;
		bunny.scale.set(bunnyScaleDim, bunnyScaleDim, bunnyScaleDim);
		bunny.position.x = 0;
		bunny.position.y = -20;
		bunny.position.z = 40;
		bunny.rotateY((-50 * Math.PI)/180);
		scene.add(bunny);
	}

	if(treeSrc){
		// tree
		var t = new THREE.Texture(document.getElementById('pattern-leaves'));
		t.repeat.set(1, 1);
		//t.needsUpdate = true;
		t.anisotropy = 32;
		var cubeMaterial = new THREE.MeshPhongMaterial( {
			color: 0x8899dd, specular: 0x8bc34a, shininess: 1,
			map: t
		});

		// trunk
		var u = new THREE.Texture(document.getElementById('pattern-stones'));
		//u.needsUpdate = true;
		var sphereMaterial = new THREE.MeshPhongMaterial( {
			color: 0x654321, specular: 0xdcc19c, shininess: 5,
			map: u
		});

		const tree = loader.parse(treeSrc);
		tree.traverse( function ( child ) {
			if ( !(child instanceof THREE.Mesh) ) return;
			child.material = child.material.map(material => {
				if(material.name === 'Bark'){
						return sphereMaterial;
				}
				if(material.name === 'Tree'){
						return cubeMaterial;
				}
				return material;
			});
			child.material.overdraw = 1
			child.castShadow = true;
			child.receiveShadow = true;
		});

		const tree2 = tree.clone();
		const bush = tree.clone();
		const bush2 = bush.clone();
		const tree3 = tree.clone();

		var treeScaleDim = 3;
		tree.scale.set(treeScaleDim, treeScaleDim, treeScaleDim);
		tree.position.x = 65;
		tree.position.y = -20;
		tree.position.z = -55;
		tree.rotation.y = (-45 * Math.PI)/180;
		scene.add(tree);

		const tree2ScaleDim = 3.7;
		tree2.scale.set(tree2ScaleDim, tree2ScaleDim, tree2ScaleDim);
		tree2.position.x = -50;
		tree2.position.y = -20;
		tree2.position.z = -20;
		tree2.rotation.y = (150 * Math.PI)/180;
		scene.add(tree2);

		const bushScaleDim = 2.7;
		bush.scale.set(bushScaleDim, bushScaleDim, bushScaleDim);
		bush.position.x = -88;
		bush.position.y = -65;
		bush.position.z = 30;
		bush.rotation.y = (-80 * Math.PI)/180;
		scene.add(bush);

		const bush2ScaleDim = 3;
		bush2.scale.set(bush2ScaleDim, bush2ScaleDim, bush2ScaleDim);
		bush2.position.x = 83;
		bush2.position.y = -55;
		bush2.position.z = 50;
		bush2.rotation.y = (-90 * Math.PI)/180;
		scene.add(bush2);

		// FRONT TREE
		const tree3ScaleDim = 4;
		tree3.scale.set(tree3ScaleDim, tree3ScaleDim, tree3ScaleDim);
		tree3.position.x = -106;
		tree3.position.y = -20;
		tree3.position.z = 75;
		tree3.rotation.y = (220 * Math.PI)/180;
		scene.add(tree3);
	}

	renderer.render(scene, camera);
`.replace(/^\t/gm, '');

const background = `
	const { width, height } = getDims();
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	ctx.fillStyle = "#140e00";
	ctx.fill();
`.replace(/^\t/gm, '');

export default {
	zoom: 0.3,
	width: 1440,
	height: 1080,
	tool: "airbrush",
	layers: [{
		number: 0,
		name: "threejs",
		selected: true,
		//alpha: 0.6,
		//blendMode: 'multiply',
		type: 'webgl2',
		def
	}, {
		number: 1,
		name: "Background",
		type: '2d',
		def: background
	}]
};
