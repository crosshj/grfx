export function isNumeric(n) {
	return !isNaN(parseFloat(n)) && isFinite(n);
}

// cache script, https://github.com/webpgr/cached-webpgr.js
// also see: https://addyosmani.com/basket.js/
// maybe use service worker instead
function cacheOrLoadify(script, scriptUrl, res) {
	var content = localStorage.getItem(scriptUrl);

	if (!content) {
		script.src = scriptUrl;
		script.onload = function () {
			/*
				TODO: this is where to save cache
				and will probably not work unless loading script source manually
				which introduces other issues (CORS)
				which will have to deal with by copying from CDN
				bleh.... (disabled for now)
				would also be cool if download parallel but append via waterfall
			*/
			res.apply(null, arguments);
		};
		return script;
	}

	var c = JSON.parse(content);
	var scriptContent = document.createTextNode(c.content);
	script.appendChild(scriptContent);
	script.onload = res;
}


function loadScript(scriptUrl) {
	const loadPromise = new Promise(function (res, rej) {
		let script = document.createElement("script");
		script.type = "text/javascript";
		script = cacheOrLoadify(script, scriptUrl, res);
		const handleLoadError = (e) => {
			debugger;
			rej(e);
		};
		script.onError = handleLoadError;
		script.async = true;
		script.addEventListener("error", handleLoadError);
		script.addEventListener("load", res);
		document.head.appendChild(script);
	});
	return loadPromise;
}

// https://remysharp.com/2015/12/18/promise-waterfall
function waterfall(fn, arr) {
	if (
		!fn ||
		typeof fn !== "function" ||
		!arr ||
		typeof arr !== "object" ||
		!arr.length
	) {
		debugger;
		throw "Error with promise waterfall";
		return;
	}
	var promises = arr.reduce((all, one) => {
		return all.then((res) => {
			return fn(one).then((result) => {
				res.push(result);
				return res;
			});
		});
	}, Promise.resolve([]));
	return promises;
}

function consoleOrCallback(callback) {
	if (callback && typeof callback === "function") {
		return callback;
	}
	return (error, data) => {
		if (error) {
			console.error(error);
			return;
		}
		if (data) {
			console.log(data);
		}
	};
}

export const isInitedFactory = function (parent, callback) {
	const cb = consoleOrCallback(callback);
	if (parent.isInited) {
			cb(`${parent.name}: script already inited!`);
	}
	var scripts = parent.scripts || [];
	var tasks = scripts.map(s => {
		return typeof s === "string"
			? loadScript(s)
			: waterfall(loadScript, s)
	});
	Promise.all(tasks)
		.then(() => {
			parent.isInited = true;
			if (parent.scriptsAfter) {
				parent.scriptsAfter(cb);
				return;
			}
			cb(null, `${parent.name}: script is inited!`);
		})
		.catch(e => {
			debugger;
			cb(e);
		});
};

