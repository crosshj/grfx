/*
	Forked by crosshj to:
		- remove console.log (near line 382)
		- inline history plugin
	source: https://cdn.skypack.dev/-/@syncstate/core@v0.7.0-5FFdh4b0zWVb5uqGnrap/dist=es2019,mode=imports/optimized/@syncstate/core.js
	repo: https://github.com/syncstate/core
*/

import {produceWithPatches, enablePatches, produce, applyPatches} from "immer";
import {compose, createStore, applyMiddleware} from "redux";
import get from "lodash/get";
import history from "@syncstate/history";

function _extends() {
	_extends = Object.assign || function(target) {
		for (var i = 1; i < arguments.length; i++) {
			var source = arguments[i];
			for (var key in source) {
				if (Object.prototype.hasOwnProperty.call(source, key)) {
					target[key] = source[key];
				}
			}
		}
		return target;
	};
	return _extends.apply(this, arguments);
}
function escapeSlashes(str) {
	return String(str).replaceAll("/", "\\/");
}
function immerPathToJsonPatchPath(path) {
	if (path.length === 0) {
		return "";
	}
	return "/" + path.map(function(p) {
		return escapeSlashes(p);
	}).join("/");
}
function jsonPatchPathToImmerPath(path) {
	if (!path) {
		return [];
	}
	path = path.replaceAll("\\/", ":::");
	var immerPath = path.split("/");
	immerPath.shift();
	return immerPath.map(function(p) {
		return p.replaceAll(":::", "/");
	});
}
var createInterceptMiddleware = function createInterceptMiddleware2(interceptors) {
	return function(store) {
		return function(next) {
			return function(action) {
				var discardAction = false;
				if (action.type === "PATCH") {
					interceptors.forEach(function(interceptor) {
						if (discardAction) {
							return;
						}
						var payloadPath = action.payload.patch.path;
						if (interceptor.subtree !== action.payload.subtree || interceptor.depth < 0) {
							return;
						}
						if (interceptor.path.startsWith(payloadPath)) {
							discardAction = callInterceptor(interceptor, store, action);
						} else if (interceptor.depth > 0 && interceptor.depth !== Infinity) {
							var matchingLengthPayloadPathArray = jsonPatchPathToImmerPath(payloadPath).slice(0, jsonPatchPathToImmerPath(interceptor.path).length);
							var remainingPayloadPathLength = jsonPatchPathToImmerPath(payloadPath).length - matchingLengthPayloadPathArray.length;
							if (immerPathToJsonPatchPath(matchingLengthPayloadPathArray) === interceptor.path && remainingPayloadPathLength <= interceptor.depth) {
								discardAction = callInterceptor(interceptor, store, action);
							}
						} else if (interceptor.depth === Infinity) {
							if (payloadPath.startsWith(interceptor.path)) {
								discardAction = callInterceptor(interceptor, store, action);
							}
						}
					});
				}
				if (!discardAction) {
					return next(action);
				}
			};
		};
	};
};
function callInterceptor(interceptor, store, action) {
	var newPayload = interceptor.callback(get(store.getState()[interceptor.subtree], "state" + interceptor.path.replaceAll("/", ".")), action.payload);
	action.payload = newPayload;
	if (newPayload === null) {
		return true;
	}
	return false;
}
var createObserveMiddleware = function createObserveMiddleware2(observers) {
	return function(store) {
		return function(next) {
			return function(action) {
				var result = next(action);
				if (action.type === "PATCH") {
					observers.forEach(function(observer, key) {
						var payloadPath = action.payload.patch.path;
						if (observer.subtree !== action.payload.subtree || observer.depth < 0) {
							return;
						}
						if (observer.path.startsWith(payloadPath)) {
							callObserver(observer, store, action);
						} else if (observer.depth > 0 && observer.depth !== Infinity) {
							var matchingLengthPayloadPathArray = jsonPatchPathToImmerPath(payloadPath).slice(0, jsonPatchPathToImmerPath(observer.path).length);
							var remainingPayloadPathLength = jsonPatchPathToImmerPath(payloadPath).length - matchingLengthPayloadPathArray.length;
							if (immerPathToJsonPatchPath(matchingLengthPayloadPathArray) === observer.path && remainingPayloadPathLength <= observer.depth) {
								callObserver(observer, store, action);
							}
						} else if (observer.depth === Infinity) {
							if (payloadPath.startsWith(observer.path)) {
								callObserver(observer, store, action);
							}
						}
					});
				}
				return result;
			};
		};
	};
};
function callObserver(observer, store, action) {
	observer.callback(get(store.getState()[observer.subtree], "state" + observer.path.replaceAll("/", ".")), action.payload);
}
function useSyncState(store, subtree, path) {
	var stateAtPath = store.getStateAtPath(subtree, path);
	return [stateAtPath, function(callbackOrData) {
		var newPath = path;
		var stateAtPath2 = store.getStateAtPath(subtree, newPath);
		var replaceValue = false;
		if (typeof callbackOrData !== "function") {
			replaceValue = true;
		}
		var produceCallback = function produceCallback2(draft) {
			callbackOrData(draft);
		};
		if (replaceValue) {
			var immerPath = jsonPatchPathToImmerPath(newPath);
			var childKey = immerPath.pop();
			newPath = immerPathToJsonPatchPath(immerPath);
			stateAtPath2 = store.getStateAtPath(subtree, newPath);
			produceCallback = function produceCallback2(draft) {
				if (childKey) {
					draft[childKey] = callbackOrData;
				} else {
					throw new Error("Cannot replace root doc");
				}
			};
		}
		var _produceWithPatches = produceWithPatches(stateAtPath2, produceCallback), patches = _produceWithPatches[1], inversePatches = _produceWithPatches[2];
		patches = patches.map(function(p) {
			return _extends({}, p, {
				path: newPath + immerPathToJsonPatchPath(p.path)
			});
		});
		inversePatches = inversePatches.map(function(p) {
			return _extends({}, p, {
				path: newPath + immerPathToJsonPatchPath(p.path)
			});
		});
		patches.forEach(function(patch, index) {
			store.dispatch({
				type: "PATCH",
				payload: {
					patch,
					inversePatch: inversePatches[index],
					subtree
				}
			});
		});
	}, store.dispatch];
}
var globalState = {
	syncStateGuid: 1
};
function getNextId() {
	return ++globalState.syncStateGuid;
}
var createPostObserveMiddleware = function createPostObserveMiddleware2(callbacks) {
	return function(store) {
		return function(next) {
			return function(action) {
				var result = next(action);
				callbacks.forEach(function(cb, index) {
					cb();
				});
				callbacks.length = 0;
				return result;
			};
		};
	};
};
var createPostInterceptMiddleware = function createPostInterceptMiddleware2(callbacks) {
	return function(store) {
		return function(next) {
			return function(action) {
				var result = next(action);
				callbacks.forEach(function(cb, index) {
					cb();
				});
				callbacks.length = 0;
				return result;
			};
		};
	};
};
var DocStore = function DocStore2(initialDoc, topReducer2, pluginCreators) {
	var _this = this;
	if (pluginCreators === void 0) {
		pluginCreators = [];
	}
	this.observers = new Map();
	this.interceptors = new Map();
	this.postObserveCallbacks = [];
	this.postInterceptCallbacks = [];
	this.getState = function(subtree) {
		var subtreeState = _this.reduxStore.getState()[subtree];
		if (!subtreeState) {
			console.warn("Tried to access non-existent subtree " + subtree);
			return void 0;
		}
		return subtreeState.state;
	};
	this.getStateAtPath = function(subtree, path) {
		var subtreeState = _this.reduxStore.getState()[subtree];
		if (!subtreeState) {
			console.warn("Tried to access non-existent subtree " + subtree);
			return void 0;
		}
		var state = subtreeState.state;
		if (!path) {
			return state;
		}
		return get(state, jsonPatchPathToImmerPath(path).join("."));
	};
	this.getPatches = function(subtree) {
		var subtreeState = _this.reduxStore.getState()[subtree];
		if (!subtreeState) {
			console.warn("Tried to access non-existent subtree " + subtree);
			return void 0;
		}
		return subtreeState.patches;
	};
	this.observe = function(subtree, path, callback, depth) {
		if (path === void 0) {
			path = "";
		}
		if (depth === void 0) {
			depth = 1;
		}
		var observerId = getNextId();
		_this.postObserve(function() {
			var newLength = _this.observers.set(observerId, {
				subtree,
				path,
				callback,
				depth
			});
		});
		_this.dispatch({
			type: "dummy action to trigger postObserve Middleware when observe is not called inside an observe callback"
		});
		return function() {
			_this.observers["delete"](observerId);
		};
	};
	this.intercept = function(subtree, path, callback, depth) {
		if (path === void 0) {
			path = "";
		}
		if (depth === void 0) {
			depth = 1;
		}
		var interceptorId = getNextId();
		_this.postIntercept(function() {
			var newLength = _this.interceptors.set(interceptorId, {
				subtree,
				path,
				callback,
				depth
			});
		});
		_this.dispatch({
			type: "dummy action to trigger postIntercept Middleware when intercept is not called inside an intercept callback"
		});
		return function() {
			_this.interceptors["delete"](interceptorId);
		};
	};
	this.postObserve = function(callback) {
		_this.postObserveCallbacks.push(callback);
	};
	this.postIntercept = function(callback) {
		_this.postInterceptCallbacks.push(callback);
	};
	this.useSyncState = function(subtree, path) {
		if (path === void 0) {
			path = "";
		}
		return useSyncState(_this, subtree, path);
	};
	this.useDoc = function(path) {
		if (path === void 0) {
			path = "";
		}
		return useSyncState(_this, "doc", path);
	};
	this.computeDoc = function(computeCallback) {
		return _this.compute("doc", computeCallback);
	};
	this.compute = function(subtree, computeCallback) {
		var oldDispose;
		var watch = function watch2(watchPath, depth, firstWatch) {
			if (depth === void 0) {
				depth = 1;
			}
			if (firstWatch === void 0) {
				firstWatch = false;
			}
			if (oldDispose) {
				oldDispose();
			}
			if (!firstWatch) {
				_this.postObserve(function() {
					var dispose2 = _this.observe(subtree, watchPath, function(updatedValue, change) {
						oldDispose = dispose2;
						computeCallback(getValue, change);
					}, depth);
				});
			} else {
				var dispose = _this.observe(subtree, watchPath, function(updatedValue, change) {
					oldDispose = dispose;
					computeCallback(getValue, change);
				}, depth);
			}
		};
		var getValue = function getValue2(path, depth, firstRun) {
			if (depth === void 0) {
				depth = 1;
			}
			if (firstRun === void 0) {
				firstRun = false;
			}
			watch(path, depth, firstRun);
			var _this$useSyncState = _this.useSyncState(subtree, path), doc = _this$useSyncState[0];
			return doc;
		};
		computeCallback(function(path, depth) {
			if (depth === void 0) {
				depth = 1;
			}
			return getValue(path, depth, true);
		}, {});
		return function() {
			if (oldDispose) {
				oldDispose();
			}
		};
	};
	var initialState = {
		doc: {
			state: initialDoc,
			patches: []
		}
	};
	var pluginNames = [];
	this.plugins = pluginCreators.map(function(pluginCreator) {
		var plugin = pluginCreator(_this);
		if (pluginNames.find(function(pName) {
			return pName === plugin.name;
		})) {
			throw new Error("SyncState plugin named " + plugin.name + ' already exists! You can override plugin name\nby passing name in plugin configuration to createPlugin.\n        createStore({}, [\n          myPlugin.createPlugin({\n            name: "myOtherPlugin"\n          })\n        ])');
		}
		pluginNames.push(plugin.name);
		return plugin;
	});
	var composeEnhancers = typeof window === "object" && false && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({}) : compose;
	var reduxStore;
	reduxStore = createStore(topReducer2, initialState, composeEnhancers(applyMiddleware.apply(void 0, [createInterceptMiddleware(this.interceptors), createObserveMiddleware(this.observers), createPostInterceptMiddleware(this.postInterceptCallbacks), createPostObserveMiddleware(this.postObserveCallbacks)].concat(this.plugins.map(function(p) {
		return p.middleware;
	})))));
	//console.log(reduxStore.getState());
	this.reduxStore = reduxStore;
	this.dispatch = reduxStore.dispatch;
	this.subscribe = reduxStore.subscribe;
	this.plugins.forEach(function(plugin) {
		_this.reduxStore.dispatch({
			type: "CREATE_SUBTREE",
			payload: {
				subtree: plugin.name,
				initialState: plugin.initialState
			}
		});
	});
};
enablePatches();
function topReducer(state, action) {
	switch (action.type) {
		case "PATCH": {
			return produce(state, function(draftState) {
				var patch = _extends({}, action.payload.patch, {
					path: jsonPatchPathToImmerPath(action.payload.patch.path)
				});
				draftState[action.payload.subtree].state = applyPatches(draftState[action.payload.subtree].state, [patch]);
				draftState[action.payload.subtree].patches.push({
					patch: action.payload.patch,
					inversePatch: action.payload.inversePatch
				});
			});
		}
		case "CREATE_SUBTREE": {
			return produce(state, function(draftState) {
				draftState[action.payload.subtree] = {
					state: action.payload.initialState,
					patches: []
				};
			});
		}
		default:
			return state;
	}
}
function createDocStore(initialDoc, plugins=[]) {
	var docStore = new DocStore(initialDoc, topReducer, [
		history.createInitializer(),
		...plugins
	]);
	return docStore;
}
export {DocStore, createDocStore, immerPathToJsonPatchPath, jsonPatchPathToImmerPath, history};
export default null;
