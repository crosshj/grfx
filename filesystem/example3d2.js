const images = {
	hatch: `images/hatch.png`,
	leaves: `images/leaves.png`,
	needles: `images/needles.png`,
	stones: `images/stones.png`,
};

const lights = `
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
`;

const perlinNoiseImage = `
await ( async (width=1024, height=768) => {
	const cached = sessionStorage.getItem("perlinCanvas");
	if(cached){
		const img = new Image();
		await new Promise(r => img.onload=r, img.src=cached);
		return img;
	}
	function createCanvas(w, h){
		const c = document.createElement('canvas');
		return c;
	}
	/* Following canvas-based Perlin generation code originates from
		iron_wallaby's code at: http://www.ozoneasylum.com/30982
		sourced from: https://gist.github.com/donpark/1796361
	*/
	function randomNoise(canvas, x, y, width, height, alpha) {
			x = x || 0;
			y = y || 0;
			width = width || canvas.width;
			height = height || canvas.height;
			alpha = alpha || 255;
			var g = canvas.getContext("2d"),
				imageData = g.getImageData(x, y, width, height),
				random = Math.random,
				pixels = imageData.data,
				n = pixels.length,
				i = 0;
			while (i < n) {
				pixels[i++] = pixels[i++] = pixels[i++] = (random() * 256) | 0;
				pixels[i++] = alpha;
			}
			g.putImageData(imageData, x, y);
			return canvas;
	}
	function perlinNoise(canvas, noise) {
			noise = randomNoise(createCanvas(canvas.width, canvas.height));
			var g = canvas.getContext("2d");
			g.save();
			for (var size = 4; size <= noise.width; size *= 2) {
				var x = (Math.random() * (noise.width - size)) | 0,
						y = (Math.random() * (noise.height - size)) | 0;
				g.globalAlpha = 4 / size;
				g.drawImage(noise, x, y, size, size, 0, 0, canvas.width, canvas.height);
			}
			g.restore();
			return canvas;
	}
	const perlinCanvas = perlinNoise(createCanvas(width, height));
	const dataUrl = perlinCanvas.toDataURL("image/png");
	sessionStorage.setItem("perlinCanvas", dataUrl)
	return perlinCanvas;
})();
`.trim();

const threejs = `
	const gl = ctx;
	const canvas = gl.canvas;
	const { width, height } = canvas;

	const THREE = await import('three');
	const { OBJLoader } = await import('three-objloader');
	const { LoopSubdivision } = await import('three-subdivide');
	const loader = new OBJLoader(THREE);
	
	//const subbySrc = await loadFile('models/cube.obj');

	const renderer = new THREE.WebGLRenderer({ canvas, alpha: true });
	renderer.setSize(width, height);
	renderer.shadowMap.enabled = true;
	renderer.shadowMap.type = THREE.PCFSoftShadowMap;

	const scene = new THREE.Scene();

	const camera = new THREE.PerspectiveCamera(75, width/height, 0.1, 1000);
	camera.position.x = 0;
	camera.position.y = 100;
	camera.position.z = 160;
	camera.lookAt(new THREE.Vector3(0, 35, -10));

	${lights}

	const ImageTexture = (args) => {
		const tex = new THREE.Texture(args.pattern);
		tex.needsUpdate = true;
		tex.anisotropy = 64;
		tex.center = new THREE.Vector2(0.5, 0.5);
		tex.repeat.set(args.scale,args.scale);
		tex.rotation = -0.45;
		tex.wrapS = tex.wrapT = THREE.RepeatWrapping;
		//tex.generateMipmaps = true;
		//tex.wrapS = THREE.ClampToEdgeWrapping;
		//tex.wrapT = THREE.ClampToEdgeWrapping;
		//tex.minFilter = THREE.NearestMipMapLinearFilter;
		return tex;
	};

	const leavesPat = await loadImage("${images.leaves}");
	const stonesPat = await loadImage("${images.stones}");
	const needlesPat = await loadImage("${images.needles}");
	const hatchPat = await loadImage("${images.hatch}");
	const noise = ${perlinNoiseImage}

	const subbyTex = ImageTexture({
		pattern: noise,
		scale: 2.3
	});

	const subbyMat = new THREE.MeshPhongMaterial( {
		color: 0x00aaff,
		//specular: 0xffffff,
		//shininess: 1,
		//emissive: 0x202020,
		//map: subbyTex,
		displacementMap: subbyTex,
		displacementScale: 180,
		displacementBias: -55
	});
	//subbyMat.side = THREE.DoubleSide;
	subbyMat.needsUpdate = true;

	const groundGeom = new THREE.PlaneGeometry(1000, 1000, 800, 600);
	const groundMesh = new THREE.Mesh(groundGeom, subbyMat);
	groundMesh.rotation.x = -Math.PI / 2;
	groundMesh.position.y = -20;
	groundMesh.position.z = 400;
	scene.add(groundMesh);

	const groundMat2 =  new THREE.MeshPhongMaterial( {
		color: 0x553388,
		specular: 0x5501ff,
		shininess: 1,
		emissive: 0x02021a,
		// color: 0x00aaff,
	});

	const groundGeom2 = new THREE.PlaneGeometry(1000, 1000, 800, 600);
	const groundMesh2 = new THREE.Mesh(groundGeom2, groundMat2);
	groundMesh2.rotation.x = -Math.PI / 2;
	groundMesh2.position.y = -1;
	groundMesh2.position.z = 400;
	//groundMesh2.receiveShadow = true;
	//groundMesh2.castShadow = true;
	scene.add(groundMesh2);

	renderer.render(scene, camera);
`.replace(/^\t/gm, '');

const background = `
	const { width, height } = getDims();
	ctx.beginPath();
	ctx.rect(0, 0, width, height);
	var grd = ctx.createLinearGradient(0, 0, 0, 0.66*height);
	grd.addColorStop(0, "#04070c");
	grd.addColorStop(1, "#0c1724");
	ctx.fillStyle = grd;
	//ctx.fillStyle = "#0a1420";
	ctx.fill();
	
	function RNG(seed) {
		var m = 2**35 - 31
		var a = 185852
		var s = seed % m
		return function () {
			return (s = s * a % m) / m
		}
	}
	const random = RNG(42);
	for (var i = 0; i < 200; i++) {
		x = random() * width;
		y = random() * height;
		ctx.fillStyle = "white";
		const w = random();
		ctx.fillRect(x,y,w,w);
	}
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
	zoom: 0.6,
	width: 1024,
	height: 768,
	tool: "airbrush",
	layers: [{
		number: 0,
		name: "moon",
		type: '2d',
		def: moon
	}, {
		number: 1,
		selected: true,
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
