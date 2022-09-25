const imports = {
	"@syncstate/core": "./vendor/syncstate.js",
	"@syncstate/history": "https://cdn.skypack.dev/-/@syncstate/history@v0.7.1-psbtWeyoL0b7NkoElJDM/dist=es2019,mode=imports/optimized/@syncstate/history.js",
	"immer": "https://cdn.skypack.dev/-/immer@v7.0.15-7TvRXFAjwhTKJWP7XBf6/dist=es2019,mode=imports/optimized/immer.js",
	"lodash/get": "https://cdn.skypack.dev/-/lodash.get@v4.4.2-BmwyhyYUfa0zoZ0JKXri/dist=es2019,mode=imports/optimized/lodash.get.js",
	"redux": "https://cdn.skypack.dev/-/redux@v4.1.1-XG1G4MAJLJXXzlRpXjOG/dist=es2019,mode=imports/optimized/redux.js",
	"three": "https://cdn.jsdelivr.net/npm/three@0.144.0/build/three.module.js",
	"three-objloader": "https://cdn.jsdelivr.net/npm/three@0.144.0/examples/jsm/loaders/OBJLoader.js",
	"three-subdivide": "https://unpkg.com/three-subdivide@1.0.2/build/index.module.js"
};

// KLUDGE FOLLOWS: external import maps at time of writing sucks afaik
// https://github.com/WICG/import-maps/issues/235
const im = document.createElement('script');
im.type = 'importmap';
im.textContent = JSON.stringify({ imports });
document.currentScript.after(im);
