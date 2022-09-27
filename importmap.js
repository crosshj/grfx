const imports = (base) => ({
	"@fiug/layout": "https://unpkg.com/@fiug/layout@0.1.0",
	"@grfx/components": `${base}/shared/components.js`,
	"@grfx/fs": `${base}/shared/fs.js`,
	"@grfx/hotkeys": `${base}/shared/hotkeys.js`,
	"@grfx/menus": `${base}/menus/showMenus.js`,
	"@grfx/messages": `${base}/shared/messages.js`,
	"@grfx/utils": `${base}/shared/utils.js`,
	"@syncstate/core": `${base}/vendor/syncstate.js`,
	"@syncstate/history": "https://cdn.skypack.dev/-/@syncstate/history@v0.7.1-psbtWeyoL0b7NkoElJDM/dist=es2019,mode=imports/optimized/@syncstate/history.js",
	"browserfs": "https://cdn.skypack.dev/browserfs",
	"concretejs": `${base}/vendor/concrete.js`,
	//"concretejs": "https://cdn.skypack.dev/concretejs",
	"footils": "https://cdn.skypack.dev/footils",
	"immer": "https://cdn.skypack.dev/-/immer@v7.0.15-7TvRXFAjwhTKJWP7XBf6/dist=es2019,mode=imports/optimized/immer.js",
	"lodash/get": "https://cdn.skypack.dev/-/lodash.get@v4.4.2-BmwyhyYUfa0zoZ0JKXri/dist=es2019,mode=imports/optimized/lodash.get.js",
	"react": `${base}/vendor/react.development.js`,
	"react-dom": `${base}/vendor/react-dom.development.js`,
	//"react": "https://unpkg.com/react/umd/react.development.js",
	//"react-dom": "https://unpkg.com/react-dom/umd/react-dom.development.js",
	"redux": "https://cdn.skypack.dev/-/redux@v4.1.1-XG1G4MAJLJXXzlRpXjOG/dist=es2019,mode=imports/optimized/redux.js",
	"rxjs": `${base}/vendor/rxjs.umd.min.js`,
	//"rxjs": "https://unpkg.com/rxjs/dist/bundles/rxjs.umd.js",
	"three": "https://cdn.jsdelivr.net/npm/three@0.144.0/build/three.module.js",
	"three-objloader": "https://cdn.jsdelivr.net/npm/three@0.144.0/examples/jsm/loaders/OBJLoader.js",
	"three-subdivide": "https://unpkg.com/three-subdivide@1.0.2/build/index.module.js",
	"yaml": "https://cdn.skypack.dev/yaml",
});

const scripturl = document.currentScript.src.split('?')[0].split('/').slice(0, -1).join('/')+'/';
const docurl = document.location.href.split('?')[0].split('/').slice(0, -1).join('/')+'/';
const BASE = docurl.replace(scripturl, '').split('/').map(x => '.').join('');

// KLUDGE FOLLOWS: external import maps at time of writing sucks afaik
// https://github.com/WICG/import-maps/issues/235
const im = document.createElement('script');
im.type = 'importmap';
im.textContent = JSON.stringify({ imports: imports(BASE) });
document.currentScript.after(im);
