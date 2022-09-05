/*!
	fiug menus component
	Version 0.4.6 ( 2022-08-25T20:13:07.088Z )
	https://github.com/fiugd/fiug/menus
	(c) 2020-2021 Harrison Cross, MIT License
*/
const listeners = {};

const triggers = {};

const clients = {};

const clone = x => {
    try {
        return JSON.parse(JSON.stringify(x));
    } catch (e) {}
};

function attach({name: name, listener: listener, eventName: eventName, options: options, key: key}) {
    if (!name || !listener || !eventName) {
        console.error("Attempt to improperly attach an event listener");
        console.error({
            name: name,
            listener: listener,
            eventName: eventName
        });
        return;
    }
    const listenerName = `${eventName}__${name}`;
    if (listeners[listenerName]) return;
    // TODO: alter this approach, instead use ONE event listener attached to window (?)
    // this approach kinda sucks because a lot of listeners get added to window
    // also there is less control over events as they are handled
        window.addEventListener(eventName, listener, options);
    listeners[listenerName] = listener;
    if (key) {
        listeners[listenerName]._meta = {
            key: key,
            name: name,
            eventName: eventName,
            options: options
        };
    }
}

function remove({name: name, eventName: eventName, options: options, key: key}) {
    let listenerName = `${eventName}__${name}`;
    if (!key) {
        window.removeEventListener(eventName, listeners[listenerName], options);
        delete listeners[listenerName];
    }
    listenerName = Object.keys(listeners).find((x => listeners[x]._meta && listeners[x]._meta.key === key));
    if (!listenerName) return;
    const {_meta: _meta} = listeners[listenerName];
    window.removeEventListener(_meta.eventName, listeners[listenerName], _meta.options);
    delete listeners[listenerName];
}

function list() {
    return Object.keys(listeners);
}

/*
future todo:

- when an event is triggered, don't create a custom event if event listeners exist already for that event
- instead, just trigger those

- there should be an uber listener instead of a bunch of click listeners added

*/
// this thing is used too many ways... SIGH
function trigger({e: e, type: type, params: params, source: source, data: data, detail: detail}) {
    const _data = typeof data === "function" ? data(e) : data || (detail || {}).data || {};
    //console.log(`triggering event: ${type}`);
        const defaultDetail = {
        ..._data,
        ...params,
        ...{
            source: source
        },
        data: _data
    };
    const _detail = detail ? {
        ...defaultDetail,
        ...detail,
        data: _data
    } : defaultDetail;
    const event = new CustomEvent(type, {
        bubbles: true,
        detail: _detail
    });
    window.dispatchEvent(event);
    for (const [clientid, {source: source, origin: origin}] of Object.entries(clients)) {
        //console.log(`client: ${clientid}, event: ${type}`);
        let {callback: callback, ...safeDetail} = _detail;
        source.postMessage({
            type: type,
            detail: clone(safeDetail)
        }, origin);
    }
}

let triggerClickListener;

const attachTrigger = function attachTrigger({name: name, type: // the module that is attaching the listener
type = "click", data: // the input event name, eg. "click"
data, eventName: // an object or function to get data to include with fired event
eventName, filter: // the name of the event(s) that triggers are attached for (can also be a function or an array)
filter}) {
    if (type === "raw") {
        const triggerName = `${eventName}__${name}`;
        const _trigger = args => trigger({
            ...args,
            e: args,
            data: data,
            type: eventName,
            source: name
        });
        triggers[triggerName] = {
            eventName: eventName,
            type: type,
            trigger: _trigger
        };
        return _trigger;
    }
    if (type !== "click") {
        console.error(`triggering based on ${type} not currently supported`);
        return;
    }
    const listener = triggerClickListener || (event => {
        const foundTrigger = Object.keys(triggers).map((key => ({
            key: key,
            ...triggers[key]
        }))).find((t => {
            if (t.type === "raw") {
                return false;
            }
            //this won't work if only one global listener
            //if(t.key !== triggerName) return false;
                        const filterOkay = t.filter && typeof t.filter === "function" && t.filter(event);
            return filterOkay;
        }));
        if (!foundTrigger) return true;
 //true so event will propagate, etc
                event.preventDefault();
        event.stopPropagation();
        const {eventName: type, data: data} = foundTrigger;
        const params = {};
        const source = {};
        const _data = typeof data === "function" ? data(event) : data || {};
        trigger({
            type: type,
            params: params,
            source: source,
            data: _data,
            detail: (_data || {}).detail
        });
        return false;
    });
    const options = {};
    if (!triggerClickListener) {
        window.addEventListener(type, listener, options);
    }
    const triggerName = `${eventName}__${name}`;
    triggers[triggerName] = {
        eventName: eventName,
        filter: filter,
        data: data,
        type: type
    };
    triggerClickListener = triggerClickListener || listener;
};

function listTriggers() {
    return Object.keys(triggers);
}

window.listTriggers = listTriggers;

window.listListeners = list;

const addFrameOffsets = (event, triggerEvent) => {
    if (triggerEvent.type !== "contextMenuShow") return;
    const terminal = document.querySelector("#terminal");
    const editor = document.querySelector("#editor");
    const isEventParent = el => {
        try {
            return el.contains(event.source);
        } catch (_) {}
        try {
            return el.contains(event.source.frameElement);
        } catch (_) {}
        try {
            return el.querySelector("iframe").contentDocument.contains(event.source.frameElement);
        } catch (_) {}
    };
    const paneId = event.source.location.href.split("paneid=").pop();
    const pane = document.querySelector("#" + paneId);
    const parent = [ pane, terminal, editor ].find(isEventParent);
    if (!parent) return;
    const {offsetLeft: offsetLeft, offsetTop: offsetTop} = parent;
    triggerEvent.detail.x += offsetLeft;
    triggerEvent.detail.y += offsetTop;
};

window.addEventListener("message", (function(messageEvent) {
    const {data: data} = messageEvent;
    const source = messageEvent.source;
    const origin = messageEvent.source;
    if (source === window || source?.[0] === window) return;
    if (data?.subscribe) {
        clients[data.subscribe] = {
            source: source,
            origin: origin
        };
        return;
    }
    const {register: register = "", unregister: unregister, triggerEvent: triggerEvent, name: name, eventName: eventName, key: key} = data;
    if (triggerEvent) {
        triggerEvent.detail = triggerEvent.detail || {};
        addFrameOffsets(messageEvent, triggerEvent);
        const callback = (error, response, service) => {
            source.postMessage({
                error: error,
                response: response,
                error: error,
                service: service,
                key: key
            }, messageEvent.origin);
        };
        triggerEvent.detail.callback = callback;
        trigger(triggerEvent);
        const autoRespond = [ "fileSelect" ];
        if (autoRespond.includes(triggerEvent.type)) {
            return callback();
        }
        return;
    }
    source.postMessage({
        msg: "ACK",
        ...data
    }, messageEvent.origin);
    if (unregister === "listener") return remove({
        key: key
    });
    if (register !== "listener" || !name || !eventName) return;
    const listener = listenerEvent => {
        const {detail: detail} = listenerEvent;
        const safeObject = obj => JSON.parse(JSON.stringify(obj));
        source.postMessage(safeObject({
            key: key,
            detail: detail
        }), origin);
    };
    attach({
        name: name,
        listener: listener,
        eventName: eventName,
        key: key
    });
}), false);

var ext = {
    mp3: "audio",
    wav: "audio",
    ogg: "audio",
    adb: "ada",
    ads: "ada",
    adoc: "asciidoc",
    apl: "apl",
    bowerrc: "bower",
    bf: "brainfuck",
    cs: "csharp",
    c: "c",
    h: "c",
    m: "c",
    ctp: "cake_php",
    clj: "clojure",
    cljc: "clojure",
    cljs: "clojure",
    cjsx: "react",
    jsx: "react",
    tmp: "clock",
    coffee: "coffee",
    cfc: "coldfusion",
    cfm: "coldfusion",
    config: "config",
    cpp: "cpp",
    cr: "crystal",
    cs: "csharp",
    css: "css",
    dart: "dart",
    sss: "css",
    csv: "csv",
    edn: "clojure",
    editorconfig: "config",
    ejs: "ejs",
    elm: "elm",
    ttf: "font",
    woff: "font",
    woff2: "font",
    eot: "font",
    gitkeep: "git",
    gitconfig: "git",
    gitattributes: "git",
    gitmodules: "git",
    gitignore: "git",
    go: "go",
    gradle: "gradle",
    grails: "grails",
    groovy: "grails",
    hh: "hacklang",
    haml: "haml",
    hs: "haskell",
    lhs: "haskell",
    lisp: "lisp",
    htm: "html",
    html: "html",
    shtml: "html",
    dhtml: "html",
    ai: "ai",
    png: "image",
    ico: "image",
    jpg: "image",
    bmp: "image",
    jpeg: "image",
    gif: "image",
    jade: "jade",
    java: "java",
    mjs: "javascript",
    js: "javascript",
    es6: "javascript",
    es7: "javascript",
    erl: "erlang",
    ex: "elixir",
    gltf: "json",
    ipynb: "json",
    json: "json",
    jl: "julia",
    less: "less",
    license: "license",
    liquid: "liquid",
    ls: "livescript",
    lua: "lua",
    md: "markdown",
    mustache: "mustache",
    handlebars: "mustache",
    hbs: "mustache",
    hjs: "mustache",
    stache: "mustache",
    npmignore: "npm",
    ml: "ocaml",
    mli: "ocaml",
    cmx: "ocaml",
    cmxa: "ocaml",
    pdf: "pdf",
    pl: "perl",
    pro: "prolog",
    psd: "photoshop",
    php: "php",
    "php.inc": "php",
    pug: "pug",
    pp: "puppet",
    py: "python",
    rb: "ruby",
    "erb.html": "ruby",
    "html.erb": "ruby",
    rs: "rust",
    sass: "sass",
    scss: "sass",
    scm: "scheme",
    sbt: "sbt",
    scala: "scala",
    sql: "sql",
    sh: "shell",
    cmd: "shell",
    zsh: "shell",
    fish: "shell",
    profile: "shell",
    slim: "slim",
    smarty: "smarty",
    "smarty.tpl": "smarty",
    styl: "stylus",
    svg: "svg",
    swift: "swift",
    tf: "terraform",
    "tf.json": "terraform",
    tex: "tex",
    sty: "tex",
    cls: "tex",
    dtx: "tex",
    ins: "tex",
    txt: "default",
    twig: "twig",
    as: "assemblyscript",
    ts: "typescript",
    tsx: "react",
    direnv: "config",
    env: "config",
    static: "config",
    slugignore: "config",
    vala: "vala",
    wmv: "video",
    mov: "video",
    ogv: "video",
    webm: "video",
    avi: "video",
    mpg: "video",
    mp4: "video",
    xml: "xml",
    yml: "yml",
    yaml: "yml",
    vue: "vue",
    babelrc: "babel",
    eslintrc: "eslint",
    jshintrc: "jshint",
    xcodeproj: "xcode",
    zip: "zip",
    rar: "zip",
    gz: "zip",
    iso: "zip",
    key: "key",
    pem: "key",
    fs: "fsharp",
    vimrc: "vim",
    vim: "vim",
    viminfo: "vim",
    sql: "sql",
    bat: "shell",
    htaccess: "apache",
    wxml: "wxml",
    wxss: "wxss",
    ini: "config",
    clj: "clojure",
    r: "r",
    lock: "lock",
    asp: "asp",
    flowconfig: "flow",
    nim: "nim",
    kt: "kotlin",
    ink: "ink",
    zig: "zig",
    pas: "pascal",
    raku: "raku",
    fth: "forth",
    d: "d",
    pony: "pony",
    ppm: "ppm",
    wat: "wat",
    piskel: "image",
    scratch: "smarty",
    bugs: "platformio",
    uml: "uml"
};

/*!
    localForage -- Offline Storage, Improved
    Version 1.7.4
    https://localforage.github.io/localForage
    (c) 2013-2017 Mozilla, Apache License 2.0
*/ !function(a) {
    if ("object" == typeof exports && "undefined" != typeof module) module.exports = a(); else if ("function" == typeof define && define.amd) define([], a); else {
        var b;
        b = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : this, 
        b.localforage = a();
    }
}((function() {
    return function a(b, c, d) {
        function e(g, h) {
            if (!c[g]) {
                if (!b[g]) {
                    var i = "function" == typeof require && require;
                    if (!h && i) return i(g, !0);
                    if (f) return f(g, !0);
                    var j = new Error("Cannot find module '" + g + "'");
                    throw j.code = "MODULE_NOT_FOUND", j;
                }
                var k = c[g] = {
                    exports: {}
                };
                b[g][0].call(k.exports, (function(a) {
                    var c = b[g][1][a];
                    return e(c || a);
                }), k, k.exports, a, b, c, d);
            }
            return c[g].exports;
        }
        for (var f = "function" == typeof require && require, g = 0; g < d.length; g++) e(d[g]);
        return e;
    }({
        1: [ function(a, b, c) {
            (function(a) {
                function c() {
                    k = !0;
                    for (var a, b, c = l.length; c; ) {
                        for (b = l, l = [], a = -1; ++a < c; ) b[a]();
                        c = l.length;
                    }
                    k = !1;
                }
                function d(a) {
                    1 !== l.push(a) || k || e();
                }
                var e, f = a.MutationObserver || a.WebKitMutationObserver;
                if (f) {
                    var g = 0, h = new f(c), i = a.document.createTextNode("");
                    h.observe(i, {
                        characterData: !0
                    }), e = function() {
                        i.data = g = ++g % 2;
                    };
                } else if (a.setImmediate || void 0 === a.MessageChannel) e = "document" in a && "onreadystatechange" in a.document.createElement("script") ? function() {
                    var b = a.document.createElement("script");
                    b.onreadystatechange = function() {
                        c(), b.onreadystatechange = null, b.parentNode.removeChild(b), b = null;
                    }, a.document.documentElement.appendChild(b);
                } : function() {
                    setTimeout(c, 0);
                }; else {
                    var j = new a.MessageChannel;
                    j.port1.onmessage = c, e = function() {
                        j.port2.postMessage(0);
                    };
                }
                var k, l = [];
                b.exports = d;
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {} ],
        2: [ function(a, b, c) {
            function d() {}
            function e(a) {
                if ("function" != typeof a) throw new TypeError("resolver must be a function");
                this.state = s, this.queue = [], this.outcome = void 0, a !== d && i(this, a);
            }
            function f(a, b, c) {
                this.promise = a, "function" == typeof b && (this.onFulfilled = b, this.callFulfilled = this.otherCallFulfilled), 
                "function" == typeof c && (this.onRejected = c, this.callRejected = this.otherCallRejected);
            }
            function g(a, b, c) {
                o((function() {
                    var d;
                    try {
                        d = b(c);
                    } catch (b) {
                        return p.reject(a, b);
                    }
                    d === a ? p.reject(a, new TypeError("Cannot resolve promise with itself")) : p.resolve(a, d);
                }));
            }
            function h(a) {
                var b = a && a.then;
                if (a && ("object" == typeof a || "function" == typeof a) && "function" == typeof b) return function() {
                    b.apply(a, arguments);
                };
            }
            function i(a, b) {
                function c(b) {
                    f || (f = !0, p.reject(a, b));
                }
                function d(b) {
                    f || (f = !0, p.resolve(a, b));
                }
                function e() {
                    b(d, c);
                }
                var f = !1, g = j(e);
                "error" === g.status && c(g.value);
            }
            function j(a, b) {
                var c = {};
                try {
                    c.value = a(b), c.status = "success";
                } catch (a) {
                    c.status = "error", c.value = a;
                }
                return c;
            }
            function k(a) {
                return a instanceof this ? a : p.resolve(new this(d), a);
            }
            function l(a) {
                var b = new this(d);
                return p.reject(b, a);
            }
            function m(a) {
                function b(a, b) {
                    function d(a) {
                        g[b] = a, ++h !== e || f || (f = !0, p.resolve(j, g));
                    }
                    c.resolve(a).then(d, (function(a) {
                        f || (f = !0, p.reject(j, a));
                    }));
                }
                var c = this;
                if ("[object Array]" !== Object.prototype.toString.call(a)) return this.reject(new TypeError("must be an array"));
                var e = a.length, f = !1;
                if (!e) return this.resolve([]);
                for (var g = new Array(e), h = 0, i = -1, j = new this(d); ++i < e; ) b(a[i], i);
                return j;
            }
            function n(a) {
                function b(a) {
                    c.resolve(a).then((function(a) {
                        f || (f = !0, p.resolve(h, a));
                    }), (function(a) {
                        f || (f = !0, p.reject(h, a));
                    }));
                }
                var c = this;
                if ("[object Array]" !== Object.prototype.toString.call(a)) return this.reject(new TypeError("must be an array"));
                var e = a.length, f = !1;
                if (!e) return this.resolve([]);
                for (var g = -1, h = new this(d); ++g < e; ) b(a[g]);
                return h;
            }
            var o = a(1), p = {}, q = [ "REJECTED" ], r = [ "FULFILLED" ], s = [ "PENDING" ];
            b.exports = e, e.prototype.catch = function(a) {
                return this.then(null, a);
            }, e.prototype.then = function(a, b) {
                if ("function" != typeof a && this.state === r || "function" != typeof b && this.state === q) return this;
                var c = new this.constructor(d);
                if (this.state !== s) {
                    g(c, this.state === r ? a : b, this.outcome);
                } else this.queue.push(new f(c, a, b));
                return c;
            }, f.prototype.callFulfilled = function(a) {
                p.resolve(this.promise, a);
            }, f.prototype.otherCallFulfilled = function(a) {
                g(this.promise, this.onFulfilled, a);
            }, f.prototype.callRejected = function(a) {
                p.reject(this.promise, a);
            }, f.prototype.otherCallRejected = function(a) {
                g(this.promise, this.onRejected, a);
            }, p.resolve = function(a, b) {
                var c = j(h, b);
                if ("error" === c.status) return p.reject(a, c.value);
                var d = c.value;
                if (d) i(a, d); else {
                    a.state = r, a.outcome = b;
                    for (var e = -1, f = a.queue.length; ++e < f; ) a.queue[e].callFulfilled(b);
                }
                return a;
            }, p.reject = function(a, b) {
                a.state = q, a.outcome = b;
                for (var c = -1, d = a.queue.length; ++c < d; ) a.queue[c].callRejected(b);
                return a;
            }, e.resolve = k, e.reject = l, e.all = m, e.race = n;
        }, {
            1: 1
        } ],
        3: [ function(a, b, c) {
            (function(b) {
                "function" != typeof b.Promise && (b.Promise = a(2));
            }).call(this, "undefined" != typeof global ? global : "undefined" != typeof self ? self : "undefined" != typeof window ? window : {});
        }, {
            2: 2
        } ],
        4: [ function(a, b, c) {
            function d(a, b) {
                if (!(a instanceof b)) throw new TypeError("Cannot call a class as a function");
            }
            function e() {
                try {
                    if ("undefined" != typeof indexedDB) return indexedDB;
                    if ("undefined" != typeof webkitIndexedDB) return webkitIndexedDB;
                    if ("undefined" != typeof mozIndexedDB) return mozIndexedDB;
                    if ("undefined" != typeof OIndexedDB) return OIndexedDB;
                    if ("undefined" != typeof msIndexedDB) return msIndexedDB;
                } catch (a) {
                    return;
                }
            }
            function f() {
                try {
                    if (!ua || !ua.open) return !1;
                    var a = "undefined" != typeof openDatabase && /(Safari|iPhone|iPad|iPod)/.test(navigator.userAgent) && !/Chrome/.test(navigator.userAgent) && !/BlackBerry/.test(navigator.platform), b = "function" == typeof fetch && -1 !== fetch.toString().indexOf("[native code");
                    return (!a || b) && "undefined" != typeof indexedDB && "undefined" != typeof IDBKeyRange;
                } catch (a) {
                    return !1;
                }
            }
            function g(a, b) {
                a = a || [], b = b || {};
                try {
                    return new Blob(a, b);
                } catch (f) {
                    if ("TypeError" !== f.name) throw f;
                    for (var c = "undefined" != typeof BlobBuilder ? BlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder ? MozBlobBuilder : WebKitBlobBuilder, d = new c, e = 0; e < a.length; e += 1) d.append(a[e]);
                    return d.getBlob(b.type);
                }
            }
            function h(a, b) {
                b && a.then((function(a) {
                    b(null, a);
                }), (function(a) {
                    b(a);
                }));
            }
            function i(a, b, c) {
                "function" == typeof b && a.then(b), "function" == typeof c && a.catch(c);
            }
            function j(a) {
                return "string" != typeof a && (console.warn(a + " used as a key, but it is not a string."), 
                a = String(a)), a;
            }
            function k() {
                if (arguments.length && "function" == typeof arguments[arguments.length - 1]) return arguments[arguments.length - 1];
            }
            function l(a) {
                for (var b = a.length, c = new ArrayBuffer(b), d = new Uint8Array(c), e = 0; e < b; e++) d[e] = a.charCodeAt(e);
                return c;
            }
            function m(a) {
                return new va((function(b) {
                    var c = a.transaction(wa, Ba), d = g([ "" ]);
                    c.objectStore(wa).put(d, "key"), c.onabort = function(a) {
                        a.preventDefault(), a.stopPropagation(), b(!1);
                    }, c.oncomplete = function() {
                        var a = navigator.userAgent.match(/Chrome\/(\d+)/), c = navigator.userAgent.match(/Edge\//);
                        b(c || !a || parseInt(a[1], 10) >= 43);
                    };
                })).catch((function() {
                    return !1;
                }));
            }
            function n(a) {
                return "boolean" == typeof xa ? va.resolve(xa) : m(a).then((function(a) {
                    return xa = a;
                }));
            }
            function o(a) {
                var b = ya[a.name], c = {};
                c.promise = new va((function(a, b) {
                    c.resolve = a, c.reject = b;
                })), b.deferredOperations.push(c), b.dbReady ? b.dbReady = b.dbReady.then((function() {
                    return c.promise;
                })) : b.dbReady = c.promise;
            }
            function p(a) {
                var b = ya[a.name], c = b.deferredOperations.pop();
                if (c) return c.resolve(), c.promise;
            }
            function q(a, b) {
                var c = ya[a.name], d = c.deferredOperations.pop();
                if (d) return d.reject(b), d.promise;
            }
            function r(a, b) {
                return new va((function(c, d) {
                    if (ya[a.name] = ya[a.name] || B(), a.db) {
                        if (!b) return c(a.db);
                        o(a), a.db.close();
                    }
                    var e = [ a.name ];
                    b && e.push(a.version);
                    var f = ua.open.apply(ua, e);
                    b && (f.onupgradeneeded = function(b) {
                        var c = f.result;
                        try {
                            c.createObjectStore(a.storeName), b.oldVersion <= 1 && c.createObjectStore(wa);
                        } catch (c) {
                            if ("ConstraintError" !== c.name) throw c;
                            console.warn('The database "' + a.name + '" has been upgraded from version ' + b.oldVersion + " to version " + b.newVersion + ', but the storage "' + a.storeName + '" already exists.');
                        }
                    }), f.onerror = function(a) {
                        a.preventDefault(), d(f.error);
                    }, f.onsuccess = function() {
                        c(f.result), p(a);
                    };
                }));
            }
            function s(a) {
                return r(a, !1);
            }
            function t(a) {
                return r(a, !0);
            }
            function u(a, b) {
                if (!a.db) return !0;
                var c = !a.db.objectStoreNames.contains(a.storeName), d = a.version < a.db.version, e = a.version > a.db.version;
                if (d && (a.version !== b && console.warn('The database "' + a.name + "\" can't be downgraded from version " + a.db.version + " to version " + a.version + "."), 
                a.version = a.db.version), e || c) {
                    if (c) {
                        var f = a.db.version + 1;
                        f > a.version && (a.version = f);
                    }
                    return !0;
                }
                return !1;
            }
            function v(a) {
                return new va((function(b, c) {
                    var d = new FileReader;
                    d.onerror = c, d.onloadend = function(c) {
                        var d = btoa(c.target.result || "");
                        b({
                            __local_forage_encoded_blob: !0,
                            data: d,
                            type: a.type
                        });
                    }, d.readAsBinaryString(a);
                }));
            }
            function w(a) {
                return g([ l(atob(a.data)) ], {
                    type: a.type
                });
            }
            function x(a) {
                return a && a.__local_forage_encoded_blob;
            }
            function y(a) {
                var b = this, c = b._initReady().then((function() {
                    var a = ya[b._dbInfo.name];
                    if (a && a.dbReady) return a.dbReady;
                }));
                return i(c, a, a), c;
            }
            function z(a) {
                o(a);
                for (var b = ya[a.name], c = b.forages, d = 0; d < c.length; d++) {
                    var e = c[d];
                    e._dbInfo.db && (e._dbInfo.db.close(), e._dbInfo.db = null);
                }
                return a.db = null, s(a).then((function(b) {
                    return a.db = b, u(a) ? t(a) : b;
                })).then((function(d) {
                    a.db = b.db = d;
                    for (var e = 0; e < c.length; e++) c[e]._dbInfo.db = d;
                })).catch((function(b) {
                    throw q(a, b), b;
                }));
            }
            function A(a, b, c, d) {
                void 0 === d && (d = 1);
                try {
                    var e = a.db.transaction(a.storeName, b);
                    c(null, e);
                } catch (e) {
                    if (d > 0 && (!a.db || "InvalidStateError" === e.name || "NotFoundError" === e.name)) return va.resolve().then((function() {
                        if (!a.db || "NotFoundError" === e.name && !a.db.objectStoreNames.contains(a.storeName) && a.version <= a.db.version) return a.db && (a.version = a.db.version + 1), 
                        t(a);
                    })).then((function() {
                        return z(a).then((function() {
                            A(a, b, c, d - 1);
                        }));
                    })).catch(c);
                    c(e);
                }
            }
            function B() {
                return {
                    forages: [],
                    db: null,
                    dbReady: null,
                    deferredOperations: []
                };
            }
            function C(a) {
                function b() {
                    return va.resolve();
                }
                var c = this, d = {
                    db: null
                };
                if (a) for (var e in a) d[e] = a[e];
                var f = ya[d.name];
                f || (f = B(), ya[d.name] = f), f.forages.push(c), c._initReady || (c._initReady = c.ready, 
                c.ready = y);
                for (var g = [], h = 0; h < f.forages.length; h++) {
                    var i = f.forages[h];
                    i !== c && g.push(i._initReady().catch(b));
                }
                var j = f.forages.slice(0);
                return va.all(g).then((function() {
                    return d.db = f.db, s(d);
                })).then((function(a) {
                    return d.db = a, u(d, c._defaultConfig.version) ? t(d) : a;
                })).then((function(a) {
                    d.db = f.db = a, c._dbInfo = d;
                    for (var b = 0; b < j.length; b++) {
                        var e = j[b];
                        e !== c && (e._dbInfo.db = d.db, e._dbInfo.version = d.version);
                    }
                }));
            }
            function D(a, b) {
                var c = this;
                a = j(a);
                var d = new va((function(b, d) {
                    c.ready().then((function() {
                        A(c._dbInfo, Aa, (function(e, f) {
                            if (e) return d(e);
                            try {
                                var g = f.objectStore(c._dbInfo.storeName), h = g.get(a);
                                h.onsuccess = function() {
                                    var a = h.result;
                                    void 0 === a && (a = null), x(a) && (a = w(a)), b(a);
                                }, h.onerror = function() {
                                    d(h.error);
                                };
                            } catch (a) {
                                d(a);
                            }
                        }));
                    })).catch(d);
                }));
                return h(d, b), d;
            }
            function E(a, b) {
                var c = this, d = new va((function(b, d) {
                    c.ready().then((function() {
                        A(c._dbInfo, Aa, (function(e, f) {
                            if (e) return d(e);
                            try {
                                var g = f.objectStore(c._dbInfo.storeName), h = g.openCursor(), i = 1;
                                h.onsuccess = function() {
                                    var c = h.result;
                                    if (c) {
                                        var d = c.value;
                                        x(d) && (d = w(d));
                                        var e = a(d, c.key, i++);
                                        void 0 !== e ? b(e) : c.continue();
                                    } else b();
                                }, h.onerror = function() {
                                    d(h.error);
                                };
                            } catch (a) {
                                d(a);
                            }
                        }));
                    })).catch(d);
                }));
                return h(d, b), d;
            }
            function F(a, b, c) {
                var d = this;
                a = j(a);
                var e = new va((function(c, e) {
                    var f;
                    d.ready().then((function() {
                        return f = d._dbInfo, "[object Blob]" === za.call(b) ? n(f.db).then((function(a) {
                            return a ? b : v(b);
                        })) : b;
                    })).then((function(b) {
                        A(d._dbInfo, Ba, (function(f, g) {
                            if (f) return e(f);
                            try {
                                var h = g.objectStore(d._dbInfo.storeName);
                                null === b && (b = void 0);
                                var i = h.put(b, a);
                                g.oncomplete = function() {
                                    void 0 === b && (b = null), c(b);
                                }, g.onabort = g.onerror = function() {
                                    var a = i.error ? i.error : i.transaction.error;
                                    e(a);
                                };
                            } catch (a) {
                                e(a);
                            }
                        }));
                    })).catch(e);
                }));
                return h(e, c), e;
            }
            function G(a, b) {
                var c = this;
                a = j(a);
                var d = new va((function(b, d) {
                    c.ready().then((function() {
                        A(c._dbInfo, Ba, (function(e, f) {
                            if (e) return d(e);
                            try {
                                var g = f.objectStore(c._dbInfo.storeName), h = g.delete(a);
                                f.oncomplete = function() {
                                    b();
                                }, f.onerror = function() {
                                    d(h.error);
                                }, f.onabort = function() {
                                    var a = h.error ? h.error : h.transaction.error;
                                    d(a);
                                };
                            } catch (a) {
                                d(a);
                            }
                        }));
                    })).catch(d);
                }));
                return h(d, b), d;
            }
            function H(a) {
                var b = this, c = new va((function(a, c) {
                    b.ready().then((function() {
                        A(b._dbInfo, Ba, (function(d, e) {
                            if (d) return c(d);
                            try {
                                var f = e.objectStore(b._dbInfo.storeName), g = f.clear();
                                e.oncomplete = function() {
                                    a();
                                }, e.onabort = e.onerror = function() {
                                    var a = g.error ? g.error : g.transaction.error;
                                    c(a);
                                };
                            } catch (a) {
                                c(a);
                            }
                        }));
                    })).catch(c);
                }));
                return h(c, a), c;
            }
            function I(a) {
                var b = this, c = new va((function(a, c) {
                    b.ready().then((function() {
                        A(b._dbInfo, Aa, (function(d, e) {
                            if (d) return c(d);
                            try {
                                var f = e.objectStore(b._dbInfo.storeName), g = f.count();
                                g.onsuccess = function() {
                                    a(g.result);
                                }, g.onerror = function() {
                                    c(g.error);
                                };
                            } catch (a) {
                                c(a);
                            }
                        }));
                    })).catch(c);
                }));
                return h(c, a), c;
            }
            function J(a, b) {
                var c = this, d = new va((function(b, d) {
                    if (a < 0) return void b(null);
                    c.ready().then((function() {
                        A(c._dbInfo, Aa, (function(e, f) {
                            if (e) return d(e);
                            try {
                                var g = f.objectStore(c._dbInfo.storeName), h = !1, i = g.openKeyCursor();
                                i.onsuccess = function() {
                                    var c = i.result;
                                    if (!c) return void b(null);
                                    0 === a ? b(c.key) : h ? b(c.key) : (h = !0, c.advance(a));
                                }, i.onerror = function() {
                                    d(i.error);
                                };
                            } catch (a) {
                                d(a);
                            }
                        }));
                    })).catch(d);
                }));
                return h(d, b), d;
            }
            function K(a) {
                var b = this, c = new va((function(a, c) {
                    b.ready().then((function() {
                        A(b._dbInfo, Aa, (function(d, e) {
                            if (d) return c(d);
                            try {
                                var f = e.objectStore(b._dbInfo.storeName), g = f.openKeyCursor(), h = [];
                                g.onsuccess = function() {
                                    var b = g.result;
                                    if (!b) return void a(h);
                                    h.push(b.key), b.continue();
                                }, g.onerror = function() {
                                    c(g.error);
                                };
                            } catch (a) {
                                c(a);
                            }
                        }));
                    })).catch(c);
                }));
                return h(c, a), c;
            }
            function L(a, b) {
                b = k.apply(this, arguments);
                var c = this.config();
                a = "function" != typeof a && a || {}, a.name || (a.name = a.name || c.name, a.storeName = a.storeName || c.storeName);
                var d, e = this;
                if (a.name) {
                    var f = a.name === c.name && e._dbInfo.db, g = f ? va.resolve(e._dbInfo.db) : s(a).then((function(b) {
                        var c = ya[a.name], d = c.forages;
                        c.db = b;
                        for (var e = 0; e < d.length; e++) d[e]._dbInfo.db = b;
                        return b;
                    }));
                    d = a.storeName ? g.then((function(b) {
                        if (b.objectStoreNames.contains(a.storeName)) {
                            var c = b.version + 1;
                            o(a);
                            var d = ya[a.name], e = d.forages;
                            b.close();
                            for (var f = 0; f < e.length; f++) {
                                var g = e[f];
                                g._dbInfo.db = null, g._dbInfo.version = c;
                            }
                            return new va((function(b, d) {
                                var e = ua.open(a.name, c);
                                e.onerror = function(a) {
                                    e.result.close(), d(a);
                                }, e.onupgradeneeded = function() {
                                    e.result.deleteObjectStore(a.storeName);
                                }, e.onsuccess = function() {
                                    var a = e.result;
                                    a.close(), b(a);
                                };
                            })).then((function(a) {
                                d.db = a;
                                for (var b = 0; b < e.length; b++) {
                                    var c = e[b];
                                    c._dbInfo.db = a, p(c._dbInfo);
                                }
                            })).catch((function(b) {
                                throw (q(a, b) || va.resolve()).catch((function() {})), b;
                            }));
                        }
                    })) : g.then((function(b) {
                        o(a);
                        var c = ya[a.name], d = c.forages;
                        b.close();
                        for (var e = 0; e < d.length; e++) {
                            d[e]._dbInfo.db = null;
                        }
                        return new va((function(b, c) {
                            var d = ua.deleteDatabase(a.name);
                            d.onerror = d.onblocked = function(a) {
                                var b = d.result;
                                b && b.close(), c(a);
                            }, d.onsuccess = function() {
                                var a = d.result;
                                a && a.close(), b(a);
                            };
                        })).then((function(a) {
                            c.db = a;
                            for (var b = 0; b < d.length; b++) p(d[b]._dbInfo);
                        })).catch((function(b) {
                            throw (q(a, b) || va.resolve()).catch((function() {})), b;
                        }));
                    }));
                } else d = va.reject("Invalid arguments");
                return h(d, b), d;
            }
            function M() {
                return "function" == typeof openDatabase;
            }
            function N(a) {
                var b, c, d, e, f, g = .75 * a.length, h = a.length, i = 0;
                "=" === a[a.length - 1] && (g--, "=" === a[a.length - 2] && g--);
                var j = new ArrayBuffer(g), k = new Uint8Array(j);
                for (b = 0; b < h; b += 4) c = Da.indexOf(a[b]), d = Da.indexOf(a[b + 1]), e = Da.indexOf(a[b + 2]), 
                f = Da.indexOf(a[b + 3]), k[i++] = c << 2 | d >> 4, k[i++] = (15 & d) << 4 | e >> 2, 
                k[i++] = (3 & e) << 6 | 63 & f;
                return j;
            }
            function O(a) {
                var b, c = new Uint8Array(a), d = "";
                for (b = 0; b < c.length; b += 3) d += Da[c[b] >> 2], d += Da[(3 & c[b]) << 4 | c[b + 1] >> 4], 
                d += Da[(15 & c[b + 1]) << 2 | c[b + 2] >> 6], d += Da[63 & c[b + 2]];
                return c.length % 3 == 2 ? d = d.substring(0, d.length - 1) + "=" : c.length % 3 == 1 && (d = d.substring(0, d.length - 2) + "=="), 
                d;
            }
            function P(a, b) {
                var c = "";
                if (a && (c = Ua.call(a)), a && ("[object ArrayBuffer]" === c || a.buffer && "[object ArrayBuffer]" === Ua.call(a.buffer))) {
                    var d, e = Ga;
                    a instanceof ArrayBuffer ? (d = a, e += Ia) : (d = a.buffer, "[object Int8Array]" === c ? e += Ka : "[object Uint8Array]" === c ? e += La : "[object Uint8ClampedArray]" === c ? e += Ma : "[object Int16Array]" === c ? e += Na : "[object Uint16Array]" === c ? e += Pa : "[object Int32Array]" === c ? e += Oa : "[object Uint32Array]" === c ? e += Qa : "[object Float32Array]" === c ? e += Ra : "[object Float64Array]" === c ? e += Sa : b(new Error("Failed to get type for BinaryArray"))), 
                    b(e + O(d));
                } else if ("[object Blob]" === c) {
                    var f = new FileReader;
                    f.onload = function() {
                        var c = Ea + a.type + "~" + O(this.result);
                        b(Ga + Ja + c);
                    }, f.readAsArrayBuffer(a);
                } else try {
                    b(JSON.stringify(a));
                } catch (c) {
                    console.error("Couldn't convert value into a JSON string: ", a), b(null, c);
                }
            }
            function Q(a) {
                if (a.substring(0, Ha) !== Ga) return JSON.parse(a);
                var b, c = a.substring(Ta), d = a.substring(Ha, Ta);
                if (d === Ja && Fa.test(c)) {
                    var e = c.match(Fa);
                    b = e[1], c = c.substring(e[0].length);
                }
                var f = N(c);
                switch (d) {
                  case Ia:
                    return f;

                  case Ja:
                    return g([ f ], {
                        type: b
                    });

                  case Ka:
                    return new Int8Array(f);

                  case La:
                    return new Uint8Array(f);

                  case Ma:
                    return new Uint8ClampedArray(f);

                  case Na:
                    return new Int16Array(f);

                  case Pa:
                    return new Uint16Array(f);

                  case Oa:
                    return new Int32Array(f);

                  case Qa:
                    return new Uint32Array(f);

                  case Ra:
                    return new Float32Array(f);

                  case Sa:
                    return new Float64Array(f);

                  default:
                    throw new Error("Unkown type: " + d);
                }
            }
            function R(a, b, c, d) {
                a.executeSql("CREATE TABLE IF NOT EXISTS " + b.storeName + " (id INTEGER PRIMARY KEY, key unique, value)", [], c, d);
            }
            function S(a) {
                var b = this, c = {
                    db: null
                };
                if (a) for (var d in a) c[d] = "string" != typeof a[d] ? a[d].toString() : a[d];
                var e = new va((function(a, d) {
                    try {
                        c.db = openDatabase(c.name, String(c.version), c.description, c.size);
                    } catch (a) {
                        return d(a);
                    }
                    c.db.transaction((function(e) {
                        R(e, c, (function() {
                            b._dbInfo = c, a();
                        }), (function(a, b) {
                            d(b);
                        }));
                    }), d);
                }));
                return c.serializer = Va, e;
            }
            function T(a, b, c, d, e, f) {
                a.executeSql(c, d, e, (function(a, g) {
                    g.code === g.SYNTAX_ERR ? a.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name = ?", [ b.storeName ], (function(a, h) {
                        h.rows.length ? f(a, g) : R(a, b, (function() {
                            a.executeSql(c, d, e, f);
                        }), f);
                    }), f) : f(a, g);
                }), f);
            }
            function U(a, b) {
                var c = this;
                a = j(a);
                var d = new va((function(b, d) {
                    c.ready().then((function() {
                        var e = c._dbInfo;
                        e.db.transaction((function(c) {
                            T(c, e, "SELECT * FROM " + e.storeName + " WHERE key = ? LIMIT 1", [ a ], (function(a, c) {
                                var d = c.rows.length ? c.rows.item(0).value : null;
                                d && (d = e.serializer.deserialize(d)), b(d);
                            }), (function(a, b) {
                                d(b);
                            }));
                        }));
                    })).catch(d);
                }));
                return h(d, b), d;
            }
            function V(a, b) {
                var c = this, d = new va((function(b, d) {
                    c.ready().then((function() {
                        var e = c._dbInfo;
                        e.db.transaction((function(c) {
                            T(c, e, "SELECT * FROM " + e.storeName, [], (function(c, d) {
                                for (var f = d.rows, g = f.length, h = 0; h < g; h++) {
                                    var i = f.item(h), j = i.value;
                                    if (j && (j = e.serializer.deserialize(j)), void 0 !== (j = a(j, i.key, h + 1))) return void b(j);
                                }
                                b();
                            }), (function(a, b) {
                                d(b);
                            }));
                        }));
                    })).catch(d);
                }));
                return h(d, b), d;
            }
            function W(a, b, c, d) {
                var e = this;
                a = j(a);
                var f = new va((function(f, g) {
                    e.ready().then((function() {
                        void 0 === b && (b = null);
                        var h = b, i = e._dbInfo;
                        i.serializer.serialize(b, (function(b, j) {
                            j ? g(j) : i.db.transaction((function(c) {
                                T(c, i, "INSERT OR REPLACE INTO " + i.storeName + " (key, value) VALUES (?, ?)", [ a, b ], (function() {
                                    f(h);
                                }), (function(a, b) {
                                    g(b);
                                }));
                            }), (function(b) {
                                if (b.code === b.QUOTA_ERR) {
                                    if (d > 0) return void f(W.apply(e, [ a, h, c, d - 1 ]));
                                    g(b);
                                }
                            }));
                        }));
                    })).catch(g);
                }));
                return h(f, c), f;
            }
            function X(a, b, c) {
                return W.apply(this, [ a, b, c, 1 ]);
            }
            function Y(a, b) {
                var c = this;
                a = j(a);
                var d = new va((function(b, d) {
                    c.ready().then((function() {
                        var e = c._dbInfo;
                        e.db.transaction((function(c) {
                            T(c, e, "DELETE FROM " + e.storeName + " WHERE key = ?", [ a ], (function() {
                                b();
                            }), (function(a, b) {
                                d(b);
                            }));
                        }));
                    })).catch(d);
                }));
                return h(d, b), d;
            }
            function Z(a) {
                var b = this, c = new va((function(a, c) {
                    b.ready().then((function() {
                        var d = b._dbInfo;
                        d.db.transaction((function(b) {
                            T(b, d, "DELETE FROM " + d.storeName, [], (function() {
                                a();
                            }), (function(a, b) {
                                c(b);
                            }));
                        }));
                    })).catch(c);
                }));
                return h(c, a), c;
            }
            function $(a) {
                var b = this, c = new va((function(a, c) {
                    b.ready().then((function() {
                        var d = b._dbInfo;
                        d.db.transaction((function(b) {
                            T(b, d, "SELECT COUNT(key) as c FROM " + d.storeName, [], (function(b, c) {
                                var d = c.rows.item(0).c;
                                a(d);
                            }), (function(a, b) {
                                c(b);
                            }));
                        }));
                    })).catch(c);
                }));
                return h(c, a), c;
            }
            function _(a, b) {
                var c = this, d = new va((function(b, d) {
                    c.ready().then((function() {
                        var e = c._dbInfo;
                        e.db.transaction((function(c) {
                            T(c, e, "SELECT key FROM " + e.storeName + " WHERE id = ? LIMIT 1", [ a + 1 ], (function(a, c) {
                                var d = c.rows.length ? c.rows.item(0).key : null;
                                b(d);
                            }), (function(a, b) {
                                d(b);
                            }));
                        }));
                    })).catch(d);
                }));
                return h(d, b), d;
            }
            function aa(a) {
                var b = this, c = new va((function(a, c) {
                    b.ready().then((function() {
                        var d = b._dbInfo;
                        d.db.transaction((function(b) {
                            T(b, d, "SELECT key FROM " + d.storeName, [], (function(b, c) {
                                for (var d = [], e = 0; e < c.rows.length; e++) d.push(c.rows.item(e).key);
                                a(d);
                            }), (function(a, b) {
                                c(b);
                            }));
                        }));
                    })).catch(c);
                }));
                return h(c, a), c;
            }
            function ba(a) {
                return new va((function(b, c) {
                    a.transaction((function(d) {
                        d.executeSql("SELECT name FROM sqlite_master WHERE type='table' AND name <> '__WebKitDatabaseInfoTable__'", [], (function(c, d) {
                            for (var e = [], f = 0; f < d.rows.length; f++) e.push(d.rows.item(f).name);
                            b({
                                db: a,
                                storeNames: e
                            });
                        }), (function(a, b) {
                            c(b);
                        }));
                    }), (function(a) {
                        c(a);
                    }));
                }));
            }
            function ca(a, b) {
                b = k.apply(this, arguments);
                var c = this.config();
                a = "function" != typeof a && a || {}, a.name || (a.name = a.name || c.name, a.storeName = a.storeName || c.storeName);
                var d, e = this;
                return d = a.name ? new va((function(b) {
                    var d;
                    d = a.name === c.name ? e._dbInfo.db : openDatabase(a.name, "", "", 0), b(a.storeName ? {
                        db: d,
                        storeNames: [ a.storeName ]
                    } : ba(d));
                })).then((function(a) {
                    return new va((function(b, c) {
                        a.db.transaction((function(d) {
                            function e(a) {
                                return new va((function(b, c) {
                                    d.executeSql("DROP TABLE IF EXISTS " + a, [], (function() {
                                        b();
                                    }), (function(a, b) {
                                        c(b);
                                    }));
                                }));
                            }
                            for (var f = [], g = 0, h = a.storeNames.length; g < h; g++) f.push(e(a.storeNames[g]));
                            va.all(f).then((function() {
                                b();
                            })).catch((function(a) {
                                c(a);
                            }));
                        }), (function(a) {
                            c(a);
                        }));
                    }));
                })) : va.reject("Invalid arguments"), h(d, b), d;
            }
            function da() {
                try {
                    return "undefined" != typeof localStorage && "setItem" in localStorage && !!localStorage.setItem;
                } catch (a) {
                    return !1;
                }
            }
            function ea(a, b) {
                var c = a.name + "/";
                return a.storeName !== b.storeName && (c += a.storeName + "/"), c;
            }
            function fa() {
                var a = "_localforage_support_test";
                try {
                    return localStorage.setItem(a, !0), localStorage.removeItem(a), !1;
                } catch (a) {
                    return !0;
                }
            }
            function ga() {
                return !fa() || localStorage.length > 0;
            }
            function ha(a) {
                var b = this, c = {};
                if (a) for (var d in a) c[d] = a[d];
                return c.keyPrefix = ea(a, b._defaultConfig), ga() ? (b._dbInfo = c, c.serializer = Va, 
                va.resolve()) : va.reject();
            }
            function ia(a) {
                var b = this, c = b.ready().then((function() {
                    for (var a = b._dbInfo.keyPrefix, c = localStorage.length - 1; c >= 0; c--) {
                        var d = localStorage.key(c);
                        0 === d.indexOf(a) && localStorage.removeItem(d);
                    }
                }));
                return h(c, a), c;
            }
            function ja(a, b) {
                var c = this;
                a = j(a);
                var d = c.ready().then((function() {
                    var b = c._dbInfo, d = localStorage.getItem(b.keyPrefix + a);
                    return d && (d = b.serializer.deserialize(d)), d;
                }));
                return h(d, b), d;
            }
            function ka(a, b) {
                var c = this, d = c.ready().then((function() {
                    for (var b = c._dbInfo, d = b.keyPrefix, e = d.length, f = localStorage.length, g = 1, h = 0; h < f; h++) {
                        var i = localStorage.key(h);
                        if (0 === i.indexOf(d)) {
                            var j = localStorage.getItem(i);
                            if (j && (j = b.serializer.deserialize(j)), void 0 !== (j = a(j, i.substring(e), g++))) return j;
                        }
                    }
                }));
                return h(d, b), d;
            }
            function la(a, b) {
                var c = this, d = c.ready().then((function() {
                    var b, d = c._dbInfo;
                    try {
                        b = localStorage.key(a);
                    } catch (a) {
                        b = null;
                    }
                    return b && (b = b.substring(d.keyPrefix.length)), b;
                }));
                return h(d, b), d;
            }
            function ma(a) {
                var b = this, c = b.ready().then((function() {
                    for (var a = b._dbInfo, c = localStorage.length, d = [], e = 0; e < c; e++) {
                        var f = localStorage.key(e);
                        0 === f.indexOf(a.keyPrefix) && d.push(f.substring(a.keyPrefix.length));
                    }
                    return d;
                }));
                return h(c, a), c;
            }
            function na(a) {
                var b = this, c = b.keys().then((function(a) {
                    return a.length;
                }));
                return h(c, a), c;
            }
            function oa(a, b) {
                var c = this;
                a = j(a);
                var d = c.ready().then((function() {
                    var b = c._dbInfo;
                    localStorage.removeItem(b.keyPrefix + a);
                }));
                return h(d, b), d;
            }
            function pa(a, b, c) {
                var d = this;
                a = j(a);
                var e = d.ready().then((function() {
                    void 0 === b && (b = null);
                    var c = b;
                    return new va((function(e, f) {
                        var g = d._dbInfo;
                        g.serializer.serialize(b, (function(b, d) {
                            if (d) f(d); else try {
                                localStorage.setItem(g.keyPrefix + a, b), e(c);
                            } catch (a) {
                                "QuotaExceededError" !== a.name && "NS_ERROR_DOM_QUOTA_REACHED" !== a.name || f(a), 
                                f(a);
                            }
                        }));
                    }));
                }));
                return h(e, c), e;
            }
            function qa(a, b) {
                if (b = k.apply(this, arguments), a = "function" != typeof a && a || {}, !a.name) {
                    var c = this.config();
                    a.name = a.name || c.name, a.storeName = a.storeName || c.storeName;
                }
                var d, e = this;
                return d = a.name ? new va((function(b) {
                    b(a.storeName ? ea(a, e._defaultConfig) : a.name + "/");
                })).then((function(a) {
                    for (var b = localStorage.length - 1; b >= 0; b--) {
                        var c = localStorage.key(b);
                        0 === c.indexOf(a) && localStorage.removeItem(c);
                    }
                })) : va.reject("Invalid arguments"), h(d, b), d;
            }
            function ra(a, b) {
                a[b] = function() {
                    var c = arguments;
                    return a.ready().then((function() {
                        return a[b].apply(a, c);
                    }));
                };
            }
            function sa() {
                for (var a = 1; a < arguments.length; a++) {
                    var b = arguments[a];
                    if (b) for (var c in b) b.hasOwnProperty(c) && ($a(b[c]) ? arguments[0][c] = b[c].slice() : arguments[0][c] = b[c]);
                }
                return arguments[0];
            }
            var ta = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function(a) {
                return typeof a;
            } : function(a) {
                return a && "function" == typeof Symbol && a.constructor === Symbol && a !== Symbol.prototype ? "symbol" : typeof a;
            }, ua = e();
            "undefined" == typeof Promise && a(3);
            var va = Promise, wa = "local-forage-detect-blob-support", xa = void 0, ya = {}, za = Object.prototype.toString, Aa = "readonly", Ba = "readwrite", Ca = {
                _driver: "asyncStorage",
                _initStorage: C,
                _support: f(),
                iterate: E,
                getItem: D,
                setItem: F,
                removeItem: G,
                clear: H,
                length: I,
                key: J,
                keys: K,
                dropInstance: L
            }, Da = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", Ea = "~~local_forage_type~", Fa = /^~~local_forage_type~([^~]+)~/, Ga = "__lfsc__:", Ha = Ga.length, Ia = "arbf", Ja = "blob", Ka = "si08", La = "ui08", Ma = "uic8", Na = "si16", Oa = "si32", Pa = "ur16", Qa = "ui32", Ra = "fl32", Sa = "fl64", Ta = Ha + Ia.length, Ua = Object.prototype.toString, Va = {
                serialize: P,
                deserialize: Q,
                stringToBuffer: N,
                bufferToString: O
            }, Wa = {
                _driver: "webSQLStorage",
                _initStorage: S,
                _support: M(),
                iterate: V,
                getItem: U,
                setItem: X,
                removeItem: Y,
                clear: Z,
                length: $,
                key: _,
                keys: aa,
                dropInstance: ca
            }, Xa = {
                _driver: "localStorageWrapper",
                _initStorage: ha,
                _support: da(),
                iterate: ka,
                getItem: ja,
                setItem: pa,
                removeItem: oa,
                clear: ia,
                length: na,
                key: la,
                keys: ma,
                dropInstance: qa
            }, Ya = function(a, b) {
                return a === b || "number" == typeof a && "number" == typeof b && isNaN(a) && isNaN(b);
            }, Za = function(a, b) {
                for (var c = a.length, d = 0; d < c; ) {
                    if (Ya(a[d], b)) return !0;
                    d++;
                }
                return !1;
            }, $a = Array.isArray || function(a) {
                return "[object Array]" === Object.prototype.toString.call(a);
            }, _a = {}, ab = {}, bb = {
                INDEXEDDB: Ca,
                WEBSQL: Wa,
                LOCALSTORAGE: Xa
            }, cb = [ bb.INDEXEDDB._driver, bb.WEBSQL._driver, bb.LOCALSTORAGE._driver ], db = [ "dropInstance" ], eb = [ "clear", "getItem", "iterate", "key", "keys", "length", "removeItem", "setItem" ].concat(db), fb = {
                description: "",
                driver: cb.slice(),
                name: "localforage",
                size: 4980736,
                storeName: "keyvaluepairs",
                version: 1
            }, gb = function() {
                function a(b) {
                    d(this, a);
                    for (var c in bb) if (bb.hasOwnProperty(c)) {
                        var e = bb[c], f = e._driver;
                        this[c] = f, _a[f] || this.defineDriver(e);
                    }
                    this._defaultConfig = sa({}, fb), this._config = sa({}, this._defaultConfig, b), 
                    this._driverSet = null, this._initDriver = null, this._ready = !1, this._dbInfo = null, 
                    this._wrapLibraryMethodsWithReady(), this.setDriver(this._config.driver).catch((function() {}));
                }
                return a.prototype.config = function(a) {
                    if ("object" === (void 0 === a ? "undefined" : ta(a))) {
                        if (this._ready) return new Error("Can't call config() after localforage has been used.");
                        for (var b in a) {
                            if ("storeName" === b && (a[b] = a[b].replace(/\W/g, "_")), "version" === b && "number" != typeof a[b]) return new Error("Database version must be a number.");
                            this._config[b] = a[b];
                        }
                        return !("driver" in a && a.driver) || this.setDriver(this._config.driver);
                    }
                    return "string" == typeof a ? this._config[a] : this._config;
                }, a.prototype.defineDriver = function(a, b, c) {
                    var d = new va((function(b, c) {
                        try {
                            var d = a._driver, e = new Error("Custom driver not compliant; see https://mozilla.github.io/localForage/#definedriver");
                            if (!a._driver) return void c(e);
                            for (var f = eb.concat("_initStorage"), g = 0, i = f.length; g < i; g++) {
                                var j = f[g];
                                if ((!Za(db, j) || a[j]) && "function" != typeof a[j]) return void c(e);
                            }
                            (function() {
                                for (var b = function(a) {
                                    return function() {
                                        var b = new Error("Method " + a + " is not implemented by the current driver"), c = va.reject(b);
                                        return h(c, arguments[arguments.length - 1]), c;
                                    };
                                }, c = 0, d = db.length; c < d; c++) {
                                    var e = db[c];
                                    a[e] || (a[e] = b(e));
                                }
                            })();
                            var k = function(c) {
                                _a[d] && console.info("Redefining LocalForage driver: " + d), _a[d] = a, ab[d] = c, 
                                b();
                            };
                            "_support" in a ? a._support && "function" == typeof a._support ? a._support().then(k, c) : k(!!a._support) : k(!0);
                        } catch (a) {
                            c(a);
                        }
                    }));
                    return i(d, b, c), d;
                }, a.prototype.driver = function() {
                    return this._driver || null;
                }, a.prototype.getDriver = function(a, b, c) {
                    var d = _a[a] ? va.resolve(_a[a]) : va.reject(new Error("Driver not found."));
                    return i(d, b, c), d;
                }, a.prototype.getSerializer = function(a) {
                    var b = va.resolve(Va);
                    return i(b, a), b;
                }, a.prototype.ready = function(a) {
                    var b = this, c = b._driverSet.then((function() {
                        return null === b._ready && (b._ready = b._initDriver()), b._ready;
                    }));
                    return i(c, a, a), c;
                }, a.prototype.setDriver = function(a, b, c) {
                    function d() {
                        g._config.driver = g.driver();
                    }
                    function e(a) {
                        return g._extend(a), d(), g._ready = g._initStorage(g._config), g._ready;
                    }
                    function f(a) {
                        return function() {
                            function b() {
                                for (;c < a.length; ) {
                                    var f = a[c];
                                    return c++, g._dbInfo = null, g._ready = null, g.getDriver(f).then(e).catch(b);
                                }
                                d();
                                var h = new Error("No available storage method found.");
                                return g._driverSet = va.reject(h), g._driverSet;
                            }
                            var c = 0;
                            return b();
                        };
                    }
                    var g = this;
                    $a(a) || (a = [ a ]);
                    var h = this._getSupportedDrivers(a), j = null !== this._driverSet ? this._driverSet.catch((function() {
                        return va.resolve();
                    })) : va.resolve();
                    return this._driverSet = j.then((function() {
                        var a = h[0];
                        return g._dbInfo = null, g._ready = null, g.getDriver(a).then((function(a) {
                            g._driver = a._driver, d(), g._wrapLibraryMethodsWithReady(), g._initDriver = f(h);
                        }));
                    })).catch((function() {
                        d();
                        var a = new Error("No available storage method found.");
                        return g._driverSet = va.reject(a), g._driverSet;
                    })), i(this._driverSet, b, c), this._driverSet;
                }, a.prototype.supports = function(a) {
                    return !!ab[a];
                }, a.prototype._extend = function(a) {
                    sa(this, a);
                }, a.prototype._getSupportedDrivers = function(a) {
                    for (var b = [], c = 0, d = a.length; c < d; c++) {
                        var e = a[c];
                        this.supports(e) && b.push(e);
                    }
                    return b;
                }, a.prototype._wrapLibraryMethodsWithReady = function() {
                    for (var a = 0, b = eb.length; a < b; a++) ra(this, eb[a]);
                }, a.prototype.createInstance = function(b) {
                    return new a(b);
                }, a;
            }(), hb = new gb;
            b.exports = hb;
        }, {
            3: 3
        } ]
    }, {}, [ 4 ])(4);
}));

//2021-06-19 01:54
attachTrigger({
    name: "State",
    eventName: "operations",
    type: "raw"
});

let listenerQueue = [];

let currentService;

const state = {
    changedFiles: {},
    openedFiles: {}
};

// TODO: fix the following fails for extensionless files
const isFolder = filename => filename.split("/").pop().split(".").length === 1;

/*
steps to opened/closed/selected files state sanity:
- [x] when a file is loaded from service worker (selected)
	- [x] it is considered selected
	- [x] it is pushed to opened array
	- [x] if a file was selected previously
		- and was changed: keep it in opened array
		- and was not changed: pop it from opened array
- [x] when a previously selected file is selected again
	- it is considered selected
	- it gets order:0 and other files get order:+1
- [x] when a file is deleted
	- if selected: next file in order is selected & file is removed from opened array
	- if opened: it is removed from opened, following files get bumped up in order
- [ ] when a file is moved or renamed
	- it stays in order and selected state, it's details are updated
- [x] what if file is loaded from service worker, but not used by editor?
	- handle this by doing tracking in app state module versus in SW

Currently, storage writes for this state are here:
modules/TreeView#L23
- https://github.com/fiugd/beta/blob/main/modules/TreeView.mjs#L23
*/ const debugIfMalformed = opened => {
    const malformed = opened.find((x => {
        const split = x.name.split("/");
        const length = split.length;
        return split[length - 1] === split[length - 2];
    }));
    if (malformed) debugger;
};

class StateTracker {
    constructor() {
        const driver = [ localforage.INDEXEDDB, localforage.WEBSQL, localforage.LOCALSTORAGE ];
        this.store = localforage.createInstance({
            driver: driver,
            name: "service-worker",
            version: 1,
            storeName: "changes",
            description: "keep track of changes not pushed to provider"
        });
        this.getState = this.getState.bind(this);
        this.setState = this.setState.bind(this);
        this.withState = this.withState.bind(this);
        this.closeFile = this.withState([ "opened" ], this.closeFile);
        this.openFile = this.withState([ "changed", "opened" ], this.openFile);
    }
    async setState({opened: opened = [], selected: selected = {}} = {}) {
        const {store: store} = this;
        debugIfMalformed(opened);
        opened && await store.setItem(`state-${currentService.name}-opened`, opened);
        selected && await store.setItem(`tree-${currentService.name}-selected`, selected.name);
    }
    async getState(which = []) {
        const {store: store} = this;
        const state = {
            opened: () => store.getItem(`state-${currentService.name}-opened`),
            changed: async () => (await store.keys()).filter((key => key.startsWith(currentService.name))).map((key => key.replace(currentService.name + "/", "")))
        };
        const results = {};
        for (let i = 0, len = which.length; i < len; i++) {
            const whichProp = which[i];
            results[whichProp] = await state[whichProp]() || undefined;
        }
        return results;
    }
    withState(depends, fn) {
        return async arg => {
            if (!currentService) return;
            const {setState: setState, getState: getState} = this;
            const current = await getState(depends);
            const result = await fn(current, arg);
            setState(result);
        };
    }
    // close a file (or folder)
    closeFile({opened: opened = []}, filename) {
        if (!filename) return {};
        if (filename.startsWith("/")) filename = filename.slice(1);
        filename = filename.replace(currentService.name + "/", "");
        const filterOpened = isFolder(filename) ? x => !x.name.startsWith(filename) : x => x.name !== filename;
        opened = opened.filter(filterOpened);
        [ ...opened ].sort(((a, b) => a.order - b.order)).forEach(((x, i) => x.order = i));
        const selected = opened.find((x => x.order === 0));
        return {
            opened: opened,
            selected: selected
        };
    }
    openFile({changed: changed = [], opened: opened = []}, filename) {
        if (!filename) return {};
        if (filename.startsWith("/")) filename = filename.slice(1);
        filename = filename.replace(currentService.name + "/", "");
        const lastFile = opened[opened.length - 1];
        const lastFileIsChanged = lastFile ? changed.includes(lastFile.name) : true;
        let selected = opened.find((x => x.name === filename));
        opened.forEach((x => x.order += 1));
        if (!selected && !lastFileIsChanged) {
            opened = opened.filter((x => x.name !== lastFile.name));
        }
        if (!selected) {
            selected = {
                name: filename
            };
            opened.push(selected);
        }
        selected.order = -Number.MAX_VALUE;
        [ ...opened ].sort(((a, b) => a.order - b.order)).forEach(((x, i) => x.order = i));
        return {
            opened: opened,
            selected: selected
        };
    }
}

const stateTracker = new StateTracker;

class ServiceSwitcher {
    shouldSwitch(event) {
        try {
            const {source: source, op: op, result: result} = event.detail;
            if (op === "update" && source === "Terminal" && result.length === 1) {
                this.newService = result[0];
                return true;
            }
        } catch (e) {}
        return false;
    }
    switch() {
        const {newService: newService} = this;
        currentService = newService;
        // TODO: other things that could be set here (maybe should not)
        // currentFile;
        // currentFilePath;
        // currentFolder;
        }
}

const serviceSwitcher = new ServiceSwitcher;

const sortAlg = (propFn = (x => x), alg = "alpha") => {
    if (alg === "alpha") {
        const lowSafe = (x = "") => x.toLowerCase();
        return (a, b) => {
            const afilename = lowSafe(propFn(a)).split(".").slice(0, -1).join(".") || lowSafe(propFn(a));
            const bfilename = lowSafe(propFn(b)).split(".").slice(0, -1).join(".") || lowSafe(propFn(b));
            if (afilename < bfilename) {
                return -1;
            }
            if (afilename > bfilename) {
                return 1;
            }
            const aExt = lowSafe(propFn(a)).replace(afilename, "");
            const bExt = lowSafe(propFn(b)).replace(bfilename, "");
            if (aExt < bExt) {
                return -1;
            }
            if (aExt > bExt) {
                return 1;
            }
            return (a, b) => propFn(a) - propFn(b);
        };
    }
    console.log(`sort algorithm not found: ${alg}`);
};

function getFileType(fileName = "") {
    let type = "default";
    const extension = ((fileName.match(/\.[0-9a-z]+$/i) || [])[0] || "").replace(/^\./, "");
    //console.log(extension)
        if (ext[extension]) {
        type = ext[extension];
    }
    if (extension === "md") {
        type = "info";
    }
    return type;
}

const flattenTree = (tree, folderPaths) => {
    const results = [];
    const recurse = (branch, parent = "/") => {
        const leaves = Object.keys(branch);
        leaves.map((key => {
            const children = Object.keys(branch[key]);
            if (!children || !children.length) {
                results.push({
                    name: key,
                    code: parent + key,
                    path: parent + key
                });
            } else {
                if (folderPaths) {
                    results.push({
                        name: key,
                        path: parent + key
                    });
                }
                recurse(branch[key], `${parent}${key}/`);
            }
        }));
    };
    recurse(tree);
    return results;
};

const getCurrentServiceTree = ({flat: flat, folders: folders} = {}) => flat ? flattenTree(currentService.tree, folders).map((({name: name, path: path} = {}) => ({
    name: name,
    path: path,
    relativePath: path.split(currentService.name).slice(1).join(""),
    type: getFileType(name)
}))).sort(sortAlg((x => x.name))) : currentService.tree;

// has side effects of setting current code
const getCurrentService = ({pure: pure} = {}) => {
    if (pure) {
        //if (!currentService?.code) debugger;
        return currentService;
    }
    const changedArray = Object.keys(state.changedFiles).map((k => state.changedFiles[k]));
    const mostRecent = changedArray.map((x => x[x.length - 1]));
    //error here because currentService is wrong sometimes
    // SIDE EFFECTS!!!
        mostRecent.forEach((m => {
        const found = currentService.code.find((x => {
            x.path === `/${currentService.name}/${m.filename}` || x.name === m.filename;
        }));
        if (!found) {
            console.error({
                changedArray: changedArray,
                mostRecent: mostRecent,
                filename: m.filename,
                found: found || "notfound"
            });
            return;
        }
        found.code = m.code;
    }));
    return currentService;
};

function openFile({name: name, parent: parent, path: path, ...other}) {
    const fullName = ((p, n) => {
        if (!p) return n;
        if (n && p.endsWith(n)) return p;
        return `${p}/${n}`;
    })((path || parent || "").trim(), (name || "").trim());
    if (!state.openedFiles[fullName] || !state.openedFiles[fullName].selected) {
        //purposefully not awaiting this, should listen not block
        stateTracker.openFile(fullName);
    }
    const SOME_BIG_NUMBER = Math.floor(Number.MAX_SAFE_INTEGER / 1.1);
    Object.entries(state.openedFiles).forEach((([k, v]) => {
        v.selected = false;
    }));
    state.openedFiles[fullName] = {
        name: fullName,
        ...other,
        selected: true,
        order: SOME_BIG_NUMBER
    };
    //NOTE: well-intentioned, but not currently working right
    //currentFile = fullName;
        Object.entries(state.openedFiles).sort((([ka, a], [kb, b]) => a.order - b.order)).forEach((([k, v], i) => {
        v.order = i;
    }));
}

function closeFile({name: name, filename: filename, parent: parent, path: path, next: next, nextPath: nextPath}) {
    path = path || parent;
    name = name || filename;
    const fullName = path ? `${path}/${name}` : name;
    const nextFullName = nextPath ? `${nextPath}/${next}` : next;
    //purposefully not awaiting this, should listen not block
        stateTracker.closeFile(fullName);
    const objEntries = Object.entries(state.openedFiles).map((([key, value]) => value)).filter((x => x.name !== fullName)).sort(((a, b) => a.order - b.order)).map(((x, i) => {
        const selected = x.name === nextFullName;
        return {
            ...x,
            order: i,
            selected: selected
        };
    })).map((x => {
        const fullName = x.parent ? `${x.parent}/${x.name}` : x.name;
        return [ fullName, x ];
    }));
    state.openedFiles = Object.fromEntries(objEntries);
}

const operationDoneHandler = event => {
    if (serviceSwitcher.shouldSwitch(event)) serviceSwitcher.switch();
    if (listenerQueue.length === 0) {
        //console.warn('nothing listening!');
        return;
    }
    const {detail: detail} = event;
    const {op: op, id: id, result: result, operation: operation, listener: listener} = detail;
    const foundQueueItem = listener && listenerQueue.find((x => x.id === listener));
    if (!foundQueueItem) {
        //console.warn(`nothing listening for ${listener}`);
        return false;
    }
    listenerQueue = listenerQueue.filter((x => x.id !== listener));
    foundQueueItem.after && foundQueueItem.after({
        result: {
            result: result
        }
    });
    return true;
};

const operationsHandler = event => {
    const {operation: operation} = event.detail || {};
    if (!operation || ![ "deleteFile" ].includes(operation)) return;
    if (operation === "deleteFile") {
        closeFile(event.detail);
        return;
    }
};

const events = [ {
    eventName: "operationDone",
    listener: operationDoneHandler
}, {
    eventName: "operations",
    listener: operationsHandler
}, {
    eventName: "fileClose",
    listener: event => closeFile(event.detail)
}, {
    eventName: "fileSelect",
    listener: event => openFile(event.detail)
}, {
    eventName: "open-settings-view",
    listener: event => openFile({
        name: "system::open-settings-view"
    })
} ];

events.map((args => attach({
    name: "State",
    ...args
})));

const safe = fn => {
    try {
        return fn();
    } catch (e) {}
};

function htmlToElement(html) {
    var template = document.createElement("template");
    template.innerHTML = html.trim();
    return template.content.firstChild;
}

let paletteModal;

function PaletteModal(parentEl) {
    if (paletteModal) return paletteModal;
    const style = `\n\t<style>\n\t\t#paletteModal ::-webkit-scrollbar * { background:transparent; }\n\t\t#paletteModal ::-webkit-scrollbar { width: 5px; }\n\t\t#paletteModal ::-webkit-scrollbar-track { background: transparent; -webkit-box-shadow: none; opacity: 0; }\n\t\t#paletteModal ::-webkit-scrollbar-thumb { background: rgb(57, 57, 58); }\n\t\t#paletteModal ::-webkit-scrollbar-thumb:hover { background: rgb(77, 77, 78); }\n\n\t\t/* TODO: enable the following some fancy day */\n\t\t/* #paletteModal ::-webkit-scrollbar { display: none; } */\n\t\t/* #paletteModal:hover ::-webkit-scrollbar { display: block; } */\n\n\t\t#paletteModal {\n\t\t\tposition: absolute;\n\t\t\ttop: 1px;\n\t\t\twidth: 100%;\n\t\t\tdisplay: flex;\n\t\t\tflex-direction: column;\n\t\t\tjustify-content: center;\n\t\t\talign-items: center;\n\t\t\tvisibility: hidden;\n\t\t}\n\t\t#paletteModal.open {\n\t\t\tvisibility: visible;\n\t\t}\n\t\t#paletteModal .palette-menu {\n\t\t\tbackground-color: rgb(37, 37, 38);\n\t\t\tcolor: rgb(204, 204, 204);\n\t\t\tbox-shadow: rgb(0, 0, 0) 0px 5px 8px;\n\t\t\twidth: 600px;\n\t\t}\n\t\t#paletteModal .palette-menu:focus {\n\t\t\toutline: none;\n\t\t}\n\t\t.palette-title { display: none; }\n\t\t.palette-title.visible {\n\t\t\tdisplay: inherit;\n\t\t\tpadding: 5px 5px 3px 5px;\n\t\t\ttext-align: center;\n\t\t\tbackground: #3b3b3c;\n\t\t}\n\t\t.palette-input { display: flex; padding: 5px; }\n\t\t.palette-input input {\n\t\t\tbackground: var(--main-theme-background-color) !important;\n\t\t\tmargin: 0 !important;\n\t\t\tborder: 0 !important;\n\t\t\tcolor: var(--main-theme-text-color);\n\t\t\tpadding-left: .5em !important;\n\t\t\tpadding-right: .5em !important;\n\t\t\tfont-size: 1.1em !important;\n\t\t\tbox-sizing: border-box !important;\n\t\t\tpadding-top: .25em !important;\n\t\t\tpadding-bottom: .25em !important;\n\t\t\theight: unset !important;\n\t\t\ttransition: unset !important;\n\t\t\tborder: 1px solid !important;\n\t\t\tborder-color: transparent !important;\n\t\t}\n\t\t.palette-input > button { display: none; }\n\t\t.palette-input > button.visible {\n\t\t\tdisplay: inherit;\n\t\t\tmargin: 0 0 0 5px;\n\t\t\tbackground: rgba(var(--main-theme-highlight-color),0.5);\n\t\t\tborder: 0;\n\t\t\tcolor: var(--main-theme-text-color);\n\t\t\tfilter: contrast(1.5);\n\t\t\tpadding: 0 5px;\n\t\t}\n\t\t.palette-input input:focus {\n\t\t\tbox-shadow: none !important;\n\t\t\tborder-color: rgb(var(--main-theme-highlight-color)) !important;\n\t\t}\n\t\t.palette-progress { display: none; }\n\t\t.palette-progress.visible {\n\t\t\tdisplay: inherit;\n\t\t\theight: 1px;\n\t\t\twidth: 100%;\n\t\t\tbackground: rgba(var(--main-theme-highlight-color), 1);\n\t\t}\n\t\t.palette-suggest ul {\n\t\t\tmargin: 5px 0px 5px 5px; /* lame - scrollbar makes me do this */\n\t\t\tmax-height: 500px;\n\t\t\toverflow-x: hidden;\n\t\t\toverflow-y: scroll;\n\t\t}\n\t\t.palette-suggest ul li {\n\t\t\tpadding: 3px 10px 3px 10px;\n\t\t\tdisplay: flex;\n\t\t}\n\t\t.palette-suggest ul li.selected {\n\t\t\tbackground: rgba(var(--main-theme-highlight-color), 0.3);\n\t\t\tbackground: #0d3048;\n\t\t}\n\t\t.palette-suggest ul li:hover {\n\t\t\tbackground: rgba(var(--main-theme-highlight-color), 0.3);\n\t\t}\n\t\t.palette-suggest ul li div {\n\t\t\tuser-select: none;\n\t\t\tpointer-events: none;\n\t\t}\n\t\t.palette-file [class^="icon-"]:before {\n\t\t\twidth: 10px;\n\t\t}\n\t\t.palette-suggest span { white-space:pre; }\n\t\t.palette-suggest .highlight {\n\t\t\tcolor: rgba(var(--main-theme-highlight-color), 1);\n\t\t}\n\t\t.palette-file-name {}\n\t\t.palette-file-path {\n\t\t\topacity: .6;\n\t\t\tpadding-left: 12px;\n\t\t}\n\t</style>`;
    paletteModal = htmlToElement(`\n\t\t<div id="paletteModal">\n\t\t\t${style}\n\t\t\t<div class="palette-menu" tabindex="-1">\n\t\t\t\t<div class="palette-title">Title</div>\n\t\t\t\t<div class="palette-input">\n\t\t\t\t\t<input type="text" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" placeholder="">\n\t\t\t\t\t<button>OK</button>\n\t\t\t\t</div>\n\t\t\t\t<div class="palette-progress"></div>\n\t\t\t\t<div class="palette-suggest">\n\t\t\t\t\t<ul></ul>\n\t\t\t\t</div>\n\t\t\t</div>\n\t\t</div>\n\t`.replace(/		/g, ""));
    const modalMenu = paletteModal.querySelector(".palette-menu");
    const suggestList = paletteModal.querySelector(".palette-suggest");
    const searchInput = modalMenu.querySelector(".palette-input input");
    const triggerSelectFile = el => {
        if (!el) {
            console.error("palette modal: could not find selected element");
            return;
        }
        const name = el.querySelector(".palette-file-name").textContent;
        const path = el.querySelector(".palette-file-path").getAttribute("relative");
        const service = (() => {
            const svc = getCurrentService({
                pure: true
            }) || {};
            return svc.name || "";
        })();
        if (!service) return console.error("palette modal: issue getting selected service name for selected file");
        if (typeof path === "undefined") return console.error("palette modal: issue getting path for selected file");
        if (!name) return console.error("palette modal: issue getting name for selected file");
        // TODO: should be doing this with triggers
                const event = new CustomEvent("fileSelect", {
            bubbles: true,
            detail: {
                name: name,
                path: path,
                service: service
            }
        });
        document.body.dispatchEvent(event);
        paletteModal.hide();
    };
    let selected;
    const modalClickListener = event => {
        const modalWasClicked = modalMenu.contains(event.target);
        if (!modalWasClicked) return paletteModal.hide();
        const el = event.target.tagName === "LI" ? event.target.closest("li") : event.target;
        triggerSelectFile(el);
        selected = undefined;
    };
    const keyListener = function(event) {
        const handler = {
            Enter: () => {
                triggerSelectFile(selected || suggestList.querySelector(".selected"));
                selected = undefined;
            },
            Escape: paletteModal.hide,
            ArrowUp: () => {
                const selectedEl = suggestList.querySelector("li.selected");
                let previous = selectedEl.previousElementSibling;
                if (!previous) {
                    previous = suggestList.querySelector("li:last-child");
                }
                selectedEl.classList.remove("selected");
                previous.classList.add("selected");
                previous.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
                selected = previous;
            },
            ArrowDown: () => {
                const selectedEl = suggestList.querySelector("li.selected");
                let next = selectedEl.nextElementSibling;
                if (!next) {
                    next = suggestList.querySelector("li:first-child");
                }
                selectedEl.classList.remove("selected");
                next.classList.add("selected");
                next.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest"
                });
                selected = next;
            }
        }[event.key];
        if (handler) {
            handler();
            event.preventDefault();
            return false;
        }
    };
    let inputChangeListener;
    paletteModal.show = async event => {
        searchInput.value = "";
        const listHTML = (arr, template, search) => `<ul>${arr.map(((x, i) => `<li${i === 0 ? ' class="selected"' : ""}>${template(x, search)}</li>`)).join("\n")}</ul>`;
        const highlight = (term = "", str = "") => {
            const caseMap = str.split("").map((x => x.toLowerCase() === x ? "lower" : "upper"));
            let html = "<span>" + str.toLowerCase().split(term.toLowerCase()).join(`</span><span class="highlight">${term.toLowerCase()}</span><span>`) + "</span>";
            html = html.split("");
            let intag = false;
            for (let char = 0, i = 0; i < html.length; i++) {
                const thisChar = html[i];
                if (thisChar === "<") {
                    intag = true;
                    continue;
                }
                if (thisChar === ">") {
                    intag = false;
                    continue;
                }
                if (intag) continue;
                if (caseMap[char] === "upper") {
                    html[i] = html[i].toUpperCase();
                }
                char++;
            }
            return html.join("");
        };
        const searchPallete = async () => {
            const getFileItems = () => new Promise((resolve => {
                const files = getCurrentServiceTree({
                    flat: true,
                    folders: false
                });
                const fileList = files.map((({name: name, path: path, type: type, relativePath: relativePath}) => ({
                    name: name,
                    type: type,
                    path: path.replace("/" + name, ""),
                    relativePath: relativePath.replace("/" + name, "")
                })));
                resolve(fileList);
            }));
            const fileTemplate = ({name: name, type: type, path: path, relativePath: relativePath}, search) => `\n\t\t\t\t<div class="palette-file icon-${type}"></div>\n\t\t\t\t<div class="palette-file-name">${search ? highlight(search, name) : name}</div>\n\t\t\t\t<div class="palette-file-path" relative="${relativePath}">${path}</div>\n\t\t\t`;
            const files = await getFileItems();
            let listEl;
            const render = term => {
                const _files = term ? files.filter((x => x.name.toLowerCase().includes(term.toLowerCase()))) : files;
                const noMatch = [ {
                    name: "No matches",
                    path: ""
                } ];
                listEl.innerHTML = listHTML(_files.length ? _files : noMatch, fileTemplate, term);
            };
            const handler = list => {
                listEl = list || listEl;
                render();
            };
            handler.search = render;
            return handler;
        };
        const commandPallete = async () => {
            const getCommandItems = async () => new Array(100).fill().map(((x, i) => `Command ${i}`));
            const commandTemplate = (command, search) => search ? highlight(search, command) : command;
            const commands = await getCommandItems();
            let listEl;
            const render = term => {
                const _commands = term ? commands.filter((x => x.toLowerCase().includes(term.toLowerCase()))) : commands;
                const noMatch = [ "No matches" ];
                listEl.innerHTML = listHTML(_commands.length ? _commands : noMatch, commandTemplate, term);
            };
            const handler = list => {
                listEl = list || listEl;
                render();
            };
            handler.search = render;
            return handler;
        };
        const listHandler = {
            savePalette: async () => {},
            commandPalette: await commandPallete(),
            searchPalette: await searchPallete()
        }[safe((() => event.detail.operation))];
        if (!listHandler) return console.error(`unable to display palette for: ${event.detail}!`);
        suggestList.innerHTML = "<ul><li>loading...</li></ul>";
        listHandler(suggestList);
        paletteModal.classList.add("open");
        parentEl.show();
        setTimeout((() => searchInput.focus()), 0);
        inputChangeListener = event => {
            listHandler.search(event.target.value);
        };
        searchInput.addEventListener("input", inputChangeListener);
        document.body.addEventListener("click", modalClickListener, true);
        modalMenu.addEventListener("blur", modalClickListener, true);
        document.body.addEventListener("keydown", keyListener, true);
    };
    paletteModal.hide = event => {
        parentEl.hide();
        paletteModal.classList.remove("open");
        searchInput.removeEventListener("input", inputChangeListener);
        inputChangeListener = undefined;
        document.body.removeEventListener("keydown", keyListener, true);
        document.body.removeEventListener("click", modalClickListener, true);
        modalMenu.removeEventListener("blur", modalClickListener, true);
    };
    return paletteModal;
}

let contextPane;

function ContextPane() {
    if (contextPane) {
        return contextPane;
    }
    contextPane = document.createElement("div");
    contextPane.classList.add("ContextOverlay");
    contextPane.innerHTML = `\n<style>\nul { list-style: none; padding: 0; margin: 0; }\n\n:root {\n\t/* --main-theme-color: #47414a; */\n\t--main-theme-color: #1e1e1e;\n\n\t/* --main-theme-highlight-color: #40f7ac; */\n\t/* --main-theme-highlight-color: #026292; */\n\t/* --main-theme-highlight-color: #2b5046; */\n\t/* --main-theme-highlight-color: 20, 160, 210; */\n\t--main-theme-highlight-color: 60, 180, 190;\n\n\t/* --main-theme-highlight-color: 20, 201, 210; */\n\t/* --main-theme-highlight-color: 64, 210, 20; */\n\t--main-theme-highlight-color-FOR-PICKER: rgb(60, 180, 190);\n\t/* --main-theme-background-color: #363238; */\n\t/* --main-theme-background-color: #3b3b3b; */\n\t--main-theme-background-color: #363636; /* #2d2d2d */\n\t--main-theme-background-dark-color: #29252b;\n\t--main-theme-text-color-dark: green;\n\t/* --main-theme-text-color: #d8d8d8; */\n\t--main-theme-text-color: #c2c2c2;\n\t/* --main-theme-text-invert-color: #d0c0d8; */\n\t--main-theme-text-invert-color: #818181;\n\t/* --theme-subdued-color: #483f48; */\n\t--theme-subdued-color: #262626;\n\t--theme-text-color: black;\n\t--theme-text-selected: #82e3ae;\n\t--tree-selected: #094771;\n\t--tree-hover: #333;\n\t--code-line-selected: orange;\n}\n\n.ContextOverlay {\n\t--horiz-pad: 20px;\n\t--vert-pad: 10px;\n\t--sep-height: 10px;\n}\n.ContextOverlay {\n\tposition: absolute;\n\tleft: 0; top: 0;\n\tz-index: 999;\n\tvisibility: hidden;\n\tpointer-events: none;\n\tbackground-color: transparent;\n\ttransition: background-color 0.5s ease;\n}\n.ContextContainer {\n\tposition: relative;\n\twidth: 100vw;\n\theight: 100vh;\n}\n.ContextMenu {\n\tposition: absolute;\n\tbackground: transparent;\n\tvisibility: hidden;\n}\n.ContextMenu .menu-container {\n\tposition: relative;\n}\n.ContextMenu .menu-container:after {\n\tcontent: '';\n\tposition: absolute;\n\tbackground: var(--main-theme-background-color);\n\tborder: 1px solid #777;\n\tbox-shadow: 3px 2px 5px black;\n\tborder-radius: 3px;\n\topacity: 0.9;\n\twidth: 100%;\n\theight: 100%;\n\tbackdrop-filter: blur(5px);\n\tz-index: -1;\n\ttop: 0;\n}\n.ContextMenu.open {\n\tvisibility: visible;\n\tpointer-events: all;\n}\n.ContextMenu ul.list {\n\tmargin: 0; padding: var(--vert-pad) 0;\n\tmin-width: 185px;\n\tuser-select: none;\n}\n.ContextMenu .list .item button {\n\tbackground: transparent;\n\tborder: 0;\n\tcolor: white;\n\tpadding: 2px var(--horiz-pad);\n\twidth: 100%;\n\ttext-align: left;\n\tpointer-events: none; /* so clicks are never registered on this element */\n}\n.ContextMenu .list .item:hover {\n\tbackground: rgb(var(--main-theme-highlight-color));\n}\n.ContextMenu .list .item {\n\tline-height: 0;\n}\n.ContextMenu .list .item.disabled {\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\t\topacity: 0.4;\n}\n.ContextMenu .list .context-seperator {\n\tmargin: calc(var(--sep-height) / 2) 0px;\n\tcolor: #4a4a4a;\n\tborder-bottom: 1px solid;\n}\n\n</style>\n\t`;
    contextPane.innerHTML += `\n<div class="ContextContainer">\n\t<div class="ContextMenu">\n\t\t<div class="menu-container">\n\t\t\t<ul class="list">\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n</div>\n\t`;
    const menuItem = item => item === "seperator" ? `<li class="context-seperator"></li>` : `\n\t\t<li class="item${item.disabled ? " disabled" : ""}" data-text="${item.name}">\n\t\t\t<button name="${item.name}" class="">\n\t\t\t\t<div class="linkContent">\n\t\t\t\t\t<span class="itemText">${item.name}</span>\n\t\t\t\t</div>\n\t\t\t</button>\n\t\t</li>\n\t`;
    contextPane.show = () => {
        contextPane.style.visibility = "visible";
        contextPane.style.pointerEvents = "all";
        contextPane.style.backgroundColor = "#00000029";
    };
    contextPane.hide = () => {
        contextPane.style.removeProperty("visibility");
        contextPane.style.removeProperty("pointerEvents");
        contextPane.style.removeProperty("backgroundColor");
    };
    contextPane.appendChild(PaletteModal(contextPane));
    document.body.appendChild(contextPane);
    function hideMenu() {
        contextPane.hide();
        const Menu = contextPane.querySelector(".ContextMenu");
        Menu.classList.remove("open");
    }
    function showMenu({x: x = 0, y: y = 0, parent: parent = "unknown", data: data, list: list} = {}) {
        // warn if menu will appear offscreen?
        // handle case where menu is opened near edge of screen
        // menu should know what items to show
        // menu items should know what event to trigger
        contextPane.show();
        const listDiv = contextPane.querySelector(".list");
        listDiv.innerHTML = list.map(menuItem).join("\n");
        const Menu = contextPane.querySelector(".ContextMenu");
        Menu.classList.add("open");
        const menuGoesOffScreen = y + Menu.clientHeight > window.innerHeight;
        if (menuGoesOffScreen) {
            Menu.style.top = undefined;
            Menu.style.bottom = `calc(100vh - ${y}px)`;
        } else {
            Menu.style.top = y + "px";
            Menu.style.bottom = undefined;
        }
        Menu.style.left = x + "px";
        //attach a listener to body that hides menu and detaches itself
                const menuClickListener = event => {
            const menuWasClicked = Menu.contains(event.target);
            if (menuWasClicked && event.target.tagName !== "LI") {
                return;
            }
            hideMenu();
            document.body.removeEventListener("click", menuClickListener, false);
            if (!menuWasClicked) {
                return;
            }
            contextMenuSelect({
                detail: {
                    which: event.target.dataset.text,
                    parent: parent,
                    data: data
                }
            });
        };
        document.body.addEventListener("click", menuClickListener);
    }
    window.showMenu = showMenu;
    window.hideMenu = hideMenu;
    const contextMenuSelect = attachTrigger({
        name: "Context Menu",
        eventName: "contextmenu-select",
        type: "raw"
    });
    attach({
        name: "Context Menu",
        eventName: "context-menu-show",
        listener: event => {
            console.error("TODO: context-menu-show versus window.showMenu!");
        }
    });
    attach({
        name: "Context Menu",
        eventName: "contextMenuShow",
        listener: event => {
            showMenu(event.detail);
        }
    });
    attach({
        name: "Context Menu",
        eventName: "modal-menu-show",
        listener: event => {
            console.error("TODO: context-menu-show versus window.showMenu!");
        }
    });
    attach({
        name: "Context Menu",
        eventName: "ui",
        listener: event => {
            const {detail: detail} = event;
            const toHandle = [ "savePalette", "commandPalette", "searchPalette" ];
            if (!toHandle.includes(detail.operation)) return;
            paletteModal.show(event);
        }
    });
}

export { ContextPane as default };
