/*!
	fiug menus component
	Version 0.4.6 ( 2022-09-16T00:00:22.833Z )
	https://github.com/fiugd/fiug/menus
	(c) 2020-2021 Harrison Cross, MIT License
*/
var t, e, r, n = (t = function(t, e) {
    /**!

 @license
 handlebars v4.7.7

Copyright (C) 2011-2019 by Yehuda Katz

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.

*/
    var r;
    r = function() {
        return function(t) {
            var e = {};
            function r(n) {
                if (e[n]) return e[n].exports;
                var i = e[n] = {
                    exports: {},
                    id: n,
                    loaded: !1
                };
                return t[n].call(i.exports, i, i.exports, r), i.loaded = !0, i.exports;
            }
            return r.m = t, r.c = e, r.p = "", r(0);
        }([ function(t, e, r) {
            var n = r(1).default;
            e.__esModule = !0;
            var i = n(r(2)), s = n(r(45)), o = r(46), a = r(51), c = n(r(52)), l = n(r(49)), p = n(r(44)), u = i.default.create;
            function h() {
                var t = u();
                return t.compile = function(e, r) {
                    return a.compile(e, r, t);
                }, t.precompile = function(e, r) {
                    return a.precompile(e, r, t);
                }, t.AST = s.default, t.Compiler = a.Compiler, t.JavaScriptCompiler = c.default, 
                t.Parser = o.parser, t.parse = o.parse, t.parseWithoutProcessing = o.parseWithoutProcessing, 
                t;
            }
            var f = h();
            f.create = h, p.default(f), f.Visitor = l.default, f.default = f, e.default = f, 
            t.exports = e.default;
        }, function(t, e) {
            e.default = function(t) {
                return t && t.__esModule ? t : {
                    default: t
                };
            }, e.__esModule = !0;
        }, function(t, e, r) {
            var n = r(3).default, i = r(1).default;
            e.__esModule = !0;
            var s = n(r(4)), o = i(r(37)), a = i(r(6)), c = n(r(5)), l = n(r(38)), p = i(r(44));
            function u() {
                var t = new s.HandlebarsEnvironment;
                return c.extend(t, s), t.SafeString = o.default, t.Exception = a.default, t.Utils = c, 
                t.escapeExpression = c.escapeExpression, t.VM = l, t.template = function(e) {
                    return l.template(e, t);
                }, t;
            }
            var h = u();
            h.create = u, p.default(h), h.default = h, e.default = h, t.exports = e.default;
        }, function(t, e) {
            e.default = function(t) {
                if (t && t.__esModule) return t;
                var e = {};
                if (null != t) for (var r in t) Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
                return e.default = t, e;
            }, e.__esModule = !0;
        }, function(t, e, r) {
            var n = r(1).default;
            e.__esModule = !0, e.HandlebarsEnvironment = u;
            var i = r(5), s = n(r(6)), o = r(10), a = r(30), c = n(r(32)), l = r(33);
            e.VERSION = "4.7.7", e.COMPILER_REVISION = 8, e.LAST_COMPATIBLE_COMPILER_REVISION = 7, 
            e.REVISION_CHANGES = {
                1: "<= 1.0.rc.2",
                2: "== 1.0.0-rc.3",
                3: "== 1.0.0-rc.4",
                4: "== 1.x.x",
                5: "== 2.0.0-alpha.x",
                6: ">= 2.0.0-beta.1",
                7: ">= 4.0.0 <4.3.0",
                8: ">= 4.3.0"
            };
            var p = "[object Object]";
            function u(t, e, r) {
                this.helpers = t || {}, this.partials = e || {}, this.decorators = r || {}, o.registerDefaultHelpers(this), 
                a.registerDefaultDecorators(this);
            }
            u.prototype = {
                constructor: u,
                logger: c.default,
                log: c.default.log,
                registerHelper: function(t, e) {
                    if (i.toString.call(t) === p) {
                        if (e) throw new s.default("Arg not supported with multiple helpers");
                        i.extend(this.helpers, t);
                    } else this.helpers[t] = e;
                },
                unregisterHelper: function(t) {
                    delete this.helpers[t];
                },
                registerPartial: function(t, e) {
                    if (i.toString.call(t) === p) i.extend(this.partials, t); else {
                        if (void 0 === e) throw new s.default('Attempting to register a partial called "' + t + '" as undefined');
                        this.partials[t] = e;
                    }
                },
                unregisterPartial: function(t) {
                    delete this.partials[t];
                },
                registerDecorator: function(t, e) {
                    if (i.toString.call(t) === p) {
                        if (e) throw new s.default("Arg not supported with multiple decorators");
                        i.extend(this.decorators, t);
                    } else this.decorators[t] = e;
                },
                unregisterDecorator: function(t) {
                    delete this.decorators[t];
                },
                resetLoggedPropertyAccesses: function() {
                    l.resetLoggedProperties();
                }
            };
            var h = c.default.log;
            e.log = h, e.createFrame = i.createFrame, e.logger = c.default;
        }, function(t, e) {
            e.__esModule = !0, e.extend = o, e.indexOf = function(t, e) {
                for (var r = 0, n = t.length; r < n; r++) if (t[r] === e) return r;
                return -1;
            }, e.escapeExpression = function(t) {
                if ("string" != typeof t) {
                    if (t && t.toHTML) return t.toHTML();
                    if (null == t) return "";
                    if (!t) return t + "";
                    t = "" + t;
                }
                return i.test(t) ? t.replace(n, s) : t;
            }, e.isEmpty = function(t) {
                return !t && 0 !== t || !(!l(t) || 0 !== t.length);
            }, e.createFrame = function(t) {
                var e = o({}, t);
                return e._parent = t, e;
            }, e.blockParams = function(t, e) {
                return t.path = e, t;
            }, e.appendContextPath = function(t, e) {
                return (t ? t + "." : "") + e;
            };
            var r = {
                "&": "&amp;",
                "<": "&lt;",
                ">": "&gt;",
                '"': "&quot;",
                "'": "&#x27;",
                "`": "&#x60;",
                "=": "&#x3D;"
            }, n = /[&<>"'`=]/g, i = /[&<>"'`=]/;
            function s(t) {
                return r[t];
            }
            function o(t) {
                for (var e = 1; e < arguments.length; e++) for (var r in arguments[e]) Object.prototype.hasOwnProperty.call(arguments[e], r) && (t[r] = arguments[e][r]);
                return t;
            }
            var a = Object.prototype.toString;
            e.toString = a;
            var c = function(t) {
                return "function" == typeof t;
            };
            c(/x/) && (e.isFunction = c = function(t) {
                return "function" == typeof t && "[object Function]" === a.call(t);
            }), e.isFunction = c;
            var l = Array.isArray || function(t) {
                return !(!t || "object" != typeof t) && "[object Array]" === a.call(t);
            };
            e.isArray = l;
        }, function(t, e, r) {
            var n = r(7).default;
            e.__esModule = !0;
            var i = [ "description", "fileName", "lineNumber", "endLineNumber", "message", "name", "number", "stack" ];
            function s(t, e) {
                var r = e && e.loc, o = void 0, a = void 0, c = void 0, l = void 0;
                r && (o = r.start.line, a = r.end.line, c = r.start.column, l = r.end.column, t += " - " + o + ":" + c);
                for (var p = Error.prototype.constructor.call(this, t), u = 0; u < i.length; u++) this[i[u]] = p[i[u]];
                Error.captureStackTrace && Error.captureStackTrace(this, s);
                try {
                    r && (this.lineNumber = o, this.endLineNumber = a, n ? (Object.defineProperty(this, "column", {
                        value: c,
                        enumerable: !0
                    }), Object.defineProperty(this, "endColumn", {
                        value: l,
                        enumerable: !0
                    })) : (this.column = c, this.endColumn = l));
                } catch (t) {}
            }
            s.prototype = new Error, e.default = s, t.exports = e.default;
        }, function(t, e, r) {
            t.exports = {
                default: r(8),
                __esModule: !0
            };
        }, function(t, e, r) {
            var n = r(9);
            t.exports = function(t, e, r) {
                return n.setDesc(t, e, r);
            };
        }, function(t, e) {
            var r = Object;
            t.exports = {
                create: r.create,
                getProto: r.getPrototypeOf,
                isEnum: {}.propertyIsEnumerable,
                getDesc: r.getOwnPropertyDescriptor,
                setDesc: r.defineProperty,
                setDescs: r.defineProperties,
                getKeys: r.keys,
                getNames: r.getOwnPropertyNames,
                getSymbols: r.getOwnPropertySymbols,
                each: [].forEach
            };
        }, function(t, e, r) {
            var n = r(1).default;
            e.__esModule = !0, e.registerDefaultHelpers = function(t) {
                i.default(t), s.default(t), o.default(t), a.default(t), c.default(t), l.default(t), 
                p.default(t);
            }, e.moveHelperToHooks = function(t, e, r) {
                t.helpers[e] && (t.hooks[e] = t.helpers[e], r || delete t.helpers[e]);
            };
            var i = n(r(11)), s = n(r(12)), o = n(r(25)), a = n(r(26)), c = n(r(27)), l = n(r(28)), p = n(r(29));
        }, function(t, e, r) {
            e.__esModule = !0;
            var n = r(5);
            e.default = function(t) {
                t.registerHelper("blockHelperMissing", (function(e, r) {
                    var i = r.inverse, s = r.fn;
                    if (!0 === e) return s(this);
                    if (!1 === e || null == e) return i(this);
                    if (n.isArray(e)) return e.length > 0 ? (r.ids && (r.ids = [ r.name ]), t.helpers.each(e, r)) : i(this);
                    if (r.data && r.ids) {
                        var o = n.createFrame(r.data);
                        o.contextPath = n.appendContextPath(r.data.contextPath, r.name), r = {
                            data: o
                        };
                    }
                    return s(e, r);
                }));
            }, t.exports = e.default;
        }, function(t, e, r) {
            (function(n) {
                var i = r(13).default, s = r(1).default;
                e.__esModule = !0;
                var o = r(5), a = s(r(6));
                e.default = function(t) {
                    t.registerHelper("each", (function(t, e) {
                        if (!e) throw new a.default("Must pass iterator to #each");
                        var r, s = e.fn, c = e.inverse, l = 0, p = "", u = void 0, h = void 0;
                        function f(e, r, n) {
                            u && (u.key = e, u.index = r, u.first = 0 === r, u.last = !!n, h && (u.contextPath = h + e)), 
                            p += s(t[e], {
                                data: u,
                                blockParams: o.blockParams([ t[e], e ], [ h + e, null ])
                            });
                        }
                        if (e.data && e.ids && (h = o.appendContextPath(e.data.contextPath, e.ids[0]) + "."), 
                        o.isFunction(t) && (t = t.call(this)), e.data && (u = o.createFrame(e.data)), t && "object" == typeof t) if (o.isArray(t)) for (var d = t.length; l < d; l++) l in t && f(l, l, l === t.length - 1); else if (n.Symbol && t[n.Symbol.iterator]) {
                            for (var m = [], g = t[n.Symbol.iterator](), v = g.next(); !v.done; v = g.next()) m.push(v.value);
                            for (d = (t = m).length; l < d; l++) f(l, l, l === t.length - 1);
                        } else r = void 0, i(t).forEach((function(t) {
                            void 0 !== r && f(r, l - 1), r = t, l++;
                        })), void 0 !== r && f(r, l - 1, !0);
                        return 0 === l && (p = c(this)), p;
                    }));
                }, t.exports = e.default;
            }).call(e, function() {
                return this;
            }());
        }, function(t, e, r) {
            t.exports = {
                default: r(14),
                __esModule: !0
            };
        }, function(t, e, r) {
            r(15), t.exports = r(21).Object.keys;
        }, function(t, e, r) {
            var n = r(16);
            r(18)("keys", (function(t) {
                return function(e) {
                    return t(n(e));
                };
            }));
        }, function(t, e, r) {
            var n = r(17);
            t.exports = function(t) {
                return Object(n(t));
            };
        }, function(t, e) {
            t.exports = function(t) {
                if (null == t) throw TypeError("Can't call method on  " + t);
                return t;
            };
        }, function(t, e, r) {
            var n = r(19), i = r(21), s = r(24);
            t.exports = function(t, e) {
                var r = (i.Object || {})[t] || Object[t], o = {};
                o[t] = e(r), n(n.S + n.F * s((function() {
                    r(1);
                })), "Object", o);
            };
        }, function(t, e, r) {
            var n = r(20), i = r(21), s = r(22), o = function(t, e, r) {
                var a, c, l, p = t & o.F, u = t & o.G, h = t & o.S, f = t & o.P, d = t & o.B, m = t & o.W, g = u ? i : i[e] || (i[e] = {}), v = u ? n : h ? n[e] : (n[e] || {}).prototype;
                for (a in u && (r = e), r) (c = !p && v && a in v) && a in g || (l = c ? v[a] : r[a], 
                g[a] = u && "function" != typeof v[a] ? r[a] : d && c ? s(l, n) : m && v[a] == l ? function(t) {
                    var e = function(e) {
                        return this instanceof t ? new t(e) : t(e);
                    };
                    return e.prototype = t.prototype, e;
                }(l) : f && "function" == typeof l ? s(Function.call, l) : l, f && ((g.prototype || (g.prototype = {}))[a] = l));
            };
            o.F = 1, o.G = 2, o.S = 4, o.P = 8, o.B = 16, o.W = 32, t.exports = o;
        }, function(t, e) {
            var r = t.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self && self.Math == Math ? self : Function("return this")();
            "number" == typeof __g && (__g = r);
        }, function(t, e) {
            var r = t.exports = {
                version: "1.2.6"
            };
            "number" == typeof __e && (__e = r);
        }, function(t, e, r) {
            var n = r(23);
            t.exports = function(t, e, r) {
                if (n(t), void 0 === e) return t;
                switch (r) {
                  case 1:
                    return function(r) {
                        return t.call(e, r);
                    };

                  case 2:
                    return function(r, n) {
                        return t.call(e, r, n);
                    };

                  case 3:
                    return function(r, n, i) {
                        return t.call(e, r, n, i);
                    };
                }
                return function() {
                    return t.apply(e, arguments);
                };
            };
        }, function(t, e) {
            t.exports = function(t) {
                if ("function" != typeof t) throw TypeError(t + " is not a function!");
                return t;
            };
        }, function(t, e) {
            t.exports = function(t) {
                try {
                    return !!t();
                } catch (t) {
                    return !0;
                }
            };
        }, function(t, e, r) {
            var n = r(1).default;
            e.__esModule = !0;
            var i = n(r(6));
            e.default = function(t) {
                t.registerHelper("helperMissing", (function() {
                    if (1 !== arguments.length) throw new i.default('Missing helper: "' + arguments[arguments.length - 1].name + '"');
                }));
            }, t.exports = e.default;
        }, function(t, e, r) {
            var n = r(1).default;
            e.__esModule = !0;
            var i = r(5), s = n(r(6));
            e.default = function(t) {
                t.registerHelper("if", (function(t, e) {
                    if (2 != arguments.length) throw new s.default("#if requires exactly one argument");
                    return i.isFunction(t) && (t = t.call(this)), !e.hash.includeZero && !t || i.isEmpty(t) ? e.inverse(this) : e.fn(this);
                })), t.registerHelper("unless", (function(e, r) {
                    if (2 != arguments.length) throw new s.default("#unless requires exactly one argument");
                    return t.helpers.if.call(this, e, {
                        fn: r.inverse,
                        inverse: r.fn,
                        hash: r.hash
                    });
                }));
            }, t.exports = e.default;
        }, function(t, e) {
            e.__esModule = !0, e.default = function(t) {
                t.registerHelper("log", (function() {
                    for (var e = [ void 0 ], r = arguments[arguments.length - 1], n = 0; n < arguments.length - 1; n++) e.push(arguments[n]);
                    var i = 1;
                    null != r.hash.level ? i = r.hash.level : r.data && null != r.data.level && (i = r.data.level), 
                    e[0] = i, t.log.apply(t, e);
                }));
            }, t.exports = e.default;
        }, function(t, e) {
            e.__esModule = !0, e.default = function(t) {
                t.registerHelper("lookup", (function(t, e, r) {
                    return t ? r.lookupProperty(t, e) : t;
                }));
            }, t.exports = e.default;
        }, function(t, e, r) {
            var n = r(1).default;
            e.__esModule = !0;
            var i = r(5), s = n(r(6));
            e.default = function(t) {
                t.registerHelper("with", (function(t, e) {
                    if (2 != arguments.length) throw new s.default("#with requires exactly one argument");
                    i.isFunction(t) && (t = t.call(this));
                    var r = e.fn;
                    if (i.isEmpty(t)) return e.inverse(this);
                    var n = e.data;
                    return e.data && e.ids && ((n = i.createFrame(e.data)).contextPath = i.appendContextPath(e.data.contextPath, e.ids[0])), 
                    r(t, {
                        data: n,
                        blockParams: i.blockParams([ t ], [ n && n.contextPath ])
                    });
                }));
            }, t.exports = e.default;
        }, function(t, e, r) {
            var n = r(1).default;
            e.__esModule = !0, e.registerDefaultDecorators = function(t) {
                i.default(t);
            };
            var i = n(r(31));
        }, function(t, e, r) {
            e.__esModule = !0;
            var n = r(5);
            e.default = function(t) {
                t.registerDecorator("inline", (function(t, e, r, i) {
                    var s = t;
                    return e.partials || (e.partials = {}, s = function(i, s) {
                        var o = r.partials;
                        r.partials = n.extend({}, o, e.partials);
                        var a = t(i, s);
                        return r.partials = o, a;
                    }), e.partials[i.args[0]] = i.fn, s;
                }));
            }, t.exports = e.default;
        }, function(t, e, r) {
            e.__esModule = !0;
            var n = r(5), i = {
                methodMap: [ "debug", "info", "warn", "error" ],
                level: "info",
                lookupLevel: function(t) {
                    if ("string" == typeof t) {
                        var e = n.indexOf(i.methodMap, t.toLowerCase());
                        t = e >= 0 ? e : parseInt(t, 10);
                    }
                    return t;
                },
                log: function(t) {
                    if (t = i.lookupLevel(t), "undefined" != typeof console && i.lookupLevel(i.level) <= t) {
                        var e = i.methodMap[t];
                        console[e] || (e = "log");
                        for (var r = arguments.length, n = Array(r > 1 ? r - 1 : 0), s = 1; s < r; s++) n[s - 1] = arguments[s];
                        console[e].apply(console, n);
                    }
                }
            };
            e.default = i, t.exports = e.default;
        }, function(t, e, r) {
            var n = r(34).default, i = r(13).default, s = r(3).default;
            e.__esModule = !0, e.createProtoAccessControl = function(t) {
                var e = n(null);
                e.constructor = !1, e.__defineGetter__ = !1, e.__defineSetter__ = !1, e.__lookupGetter__ = !1;
                var r = n(null);
                return r.__proto__ = !1, {
                    properties: {
                        whitelist: o.createNewLookupObject(r, t.allowedProtoProperties),
                        defaultValue: t.allowProtoPropertiesByDefault
                    },
                    methods: {
                        whitelist: o.createNewLookupObject(e, t.allowedProtoMethods),
                        defaultValue: t.allowProtoMethodsByDefault
                    }
                };
            }, e.resultIsAllowed = function(t, e, r) {
                return l("function" == typeof t ? e.methods : e.properties, r);
            }, e.resetLoggedProperties = function() {
                i(c).forEach((function(t) {
                    delete c[t];
                }));
            };
            var o = r(36), a = s(r(32)), c = n(null);
            function l(t, e) {
                return void 0 !== t.whitelist[e] ? !0 === t.whitelist[e] : void 0 !== t.defaultValue ? t.defaultValue : (function(t) {
                    !0 !== c[t] && (c[t] = !0, a.log("error", 'Handlebars: Access has been denied to resolve the property "' + t + '" because it is not an "own property" of its parent.\nYou can add a runtime option to disable the check or this warning:\nSee https://handlebarsjs.com/api-reference/runtime-options.html#options-to-control-prototype-access for details'));
                }(e), !1);
            }
        }, function(t, e, r) {
            t.exports = {
                default: r(35),
                __esModule: !0
            };
        }, function(t, e, r) {
            var n = r(9);
            t.exports = function(t, e) {
                return n.create(t, e);
            };
        }, function(t, e, r) {
            var n = r(34).default;
            e.__esModule = !0, e.createNewLookupObject = function() {
                for (var t = arguments.length, e = Array(t), r = 0; r < t; r++) e[r] = arguments[r];
                return i.extend.apply(void 0, [ n(null) ].concat(e));
            };
            var i = r(5);
        }, function(t, e) {
            function r(t) {
                this.string = t;
            }
            e.__esModule = !0, r.prototype.toString = r.prototype.toHTML = function() {
                return "" + this.string;
            }, e.default = r, t.exports = e.default;
        }, function(t, e, r) {
            var n = r(39).default, i = r(13).default, s = r(3).default, o = r(1).default;
            e.__esModule = !0, e.checkRevision = function(t) {
                var e = t && t[0] || 1, r = l.COMPILER_REVISION;
                if (!(e >= l.LAST_COMPATIBLE_COMPILER_REVISION && e <= l.COMPILER_REVISION)) {
                    if (e < l.LAST_COMPATIBLE_COMPILER_REVISION) {
                        var n = l.REVISION_CHANGES[r], i = l.REVISION_CHANGES[e];
                        throw new c.default("Template was precompiled with an older version of Handlebars than the current runtime. Please update your precompiler to a newer version (" + n + ") or downgrade your runtime to an older version (" + i + ").");
                    }
                    throw new c.default("Template was precompiled with a newer version of Handlebars than the current runtime. Please update your runtime to a newer version (" + t[1] + ").");
                }
            }, e.template = function(t, e) {
                if (!e) throw new c.default("No environment passed to template");
                if (!t || !t.main) throw new c.default("Unknown template object: " + typeof t);
                t.main.decorator = t.main_d, e.VM.checkRevision(t.compiler);
                var r = t.compiler && 7 === t.compiler[0], s = {
                    strict: function(t, e, r) {
                        if (!t || !(e in t)) throw new c.default('"' + e + '" not defined in ' + t, {
                            loc: r
                        });
                        return s.lookupProperty(t, e);
                    },
                    lookupProperty: function(t, e) {
                        var r = t[e];
                        return null == r || Object.prototype.hasOwnProperty.call(t, e) || h.resultIsAllowed(r, s.protoAccessControl, e) ? r : void 0;
                    },
                    lookup: function(t, e) {
                        for (var r = t.length, n = 0; n < r; n++) if (null != (t[n] && s.lookupProperty(t[n], e))) return t[n][e];
                    },
                    lambda: function(t, e) {
                        return "function" == typeof t ? t.call(e) : t;
                    },
                    escapeExpression: a.escapeExpression,
                    invokePartial: function(r, n, i) {
                        i.hash && (n = a.extend({}, n, i.hash), i.ids && (i.ids[0] = !0)), r = e.VM.resolvePartial.call(this, r, n, i);
                        var s = a.extend({}, i, {
                            hooks: this.hooks,
                            protoAccessControl: this.protoAccessControl
                        }), o = e.VM.invokePartial.call(this, r, n, s);
                        if (null == o && e.compile && (i.partials[i.name] = e.compile(r, t.compilerOptions, e), 
                        o = i.partials[i.name](n, s)), null != o) {
                            if (i.indent) {
                                for (var l = o.split("\n"), p = 0, u = l.length; p < u && (l[p] || p + 1 !== u); p++) l[p] = i.indent + l[p];
                                o = l.join("\n");
                            }
                            return o;
                        }
                        throw new c.default("The partial " + i.name + " could not be compiled when running in runtime-only mode");
                    },
                    fn: function(e) {
                        var r = t[e];
                        return r.decorator = t[e + "_d"], r;
                    },
                    programs: [],
                    program: function(t, e, r, n, i) {
                        var s = this.programs[t], o = this.fn(t);
                        return e || i || n || r ? s = f(this, t, o, e, r, n, i) : s || (s = this.programs[t] = f(this, t, o)), 
                        s;
                    },
                    data: function(t, e) {
                        for (;t && e--; ) t = t._parent;
                        return t;
                    },
                    mergeIfNeeded: function(t, e) {
                        var r = t || e;
                        return t && e && t !== e && (r = a.extend({}, e, t)), r;
                    },
                    nullContext: n({}),
                    noop: e.VM.noop,
                    compilerInfo: t.compiler
                };
                function o(e) {
                    var r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], n = r.data;
                    o._setup(r), !r.partial && t.useData && (n = m(e, n));
                    var i = void 0, a = t.useBlockParams ? [] : void 0;
                    function c(e) {
                        return "" + t.main(s, e, s.helpers, s.partials, n, a, i);
                    }
                    return t.useDepths && (i = r.depths ? e != r.depths[0] ? [ e ].concat(r.depths) : r.depths : [ e ]), 
                    (c = g(t.main, c, s, r.depths || [], n, a))(e, r);
                }
                return o.isTop = !0, o._setup = function(n) {
                    if (n.partial) s.protoAccessControl = n.protoAccessControl, s.helpers = n.helpers, 
                    s.partials = n.partials, s.decorators = n.decorators, s.hooks = n.hooks; else {
                        var o = a.extend({}, e.helpers, n.helpers);
                        !function(t, e) {
                            i(t).forEach((function(r) {
                                var n = t[r];
                                t[r] = function(t, e) {
                                    var r = e.lookupProperty;
                                    return u.wrapHelper(t, (function(t) {
                                        return a.extend({
                                            lookupProperty: r
                                        }, t);
                                    }));
                                }(n, e);
                            }));
                        }(o, s), s.helpers = o, t.usePartial && (s.partials = s.mergeIfNeeded(n.partials, e.partials)), 
                        (t.usePartial || t.useDecorators) && (s.decorators = a.extend({}, e.decorators, n.decorators)), 
                        s.hooks = {}, s.protoAccessControl = h.createProtoAccessControl(n);
                        var c = n.allowCallsToHelperMissing || r;
                        p.moveHelperToHooks(s, "helperMissing", c), p.moveHelperToHooks(s, "blockHelperMissing", c);
                    }
                }, o._child = function(e, r, n, i) {
                    if (t.useBlockParams && !n) throw new c.default("must pass block params");
                    if (t.useDepths && !i) throw new c.default("must pass parent depths");
                    return f(s, e, t[e], r, 0, n, i);
                }, o;
            }, e.wrapProgram = f, e.resolvePartial = function(t, e, r) {
                return t ? t.call || r.name || (r.name = t, t = r.partials[t]) : t = "@partial-block" === r.name ? r.data["partial-block"] : r.partials[r.name], 
                t;
            }, e.invokePartial = function(t, e, r) {
                var n = r.data && r.data["partial-block"];
                r.partial = !0, r.ids && (r.data.contextPath = r.ids[0] || r.data.contextPath);
                var i = void 0;
                if (r.fn && r.fn !== d && function() {
                    r.data = l.createFrame(r.data);
                    var t = r.fn;
                    i = r.data["partial-block"] = function(e) {
                        var r = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1];
                        return r.data = l.createFrame(r.data), r.data["partial-block"] = n, t(e, r);
                    }, t.partials && (r.partials = a.extend({}, r.partials, t.partials));
                }(), void 0 === t && i && (t = i), void 0 === t) throw new c.default("The partial " + r.name + " could not be found");
                if (t instanceof Function) return t(e, r);
            }, e.noop = d;
            var a = s(r(5)), c = o(r(6)), l = r(4), p = r(10), u = r(43), h = r(33);
            function f(t, e, r, n, i, s, o) {
                function a(e) {
                    var i = arguments.length <= 1 || void 0 === arguments[1] ? {} : arguments[1], a = o;
                    return !o || e == o[0] || e === t.nullContext && null === o[0] || (a = [ e ].concat(o)), 
                    r(t, e, t.helpers, t.partials, i.data || n, s && [ i.blockParams ].concat(s), a);
                }
                return (a = g(r, a, t, o, n, s)).program = e, a.depth = o ? o.length : 0, a.blockParams = i || 0, 
                a;
            }
            function d() {
                return "";
            }
            function m(t, e) {
                return e && "root" in e || ((e = e ? l.createFrame(e) : {}).root = t), e;
            }
            function g(t, e, r, n, i, s) {
                if (t.decorator) {
                    var o = {};
                    e = t.decorator(e, o, r, n && n[0], i, s, n), a.extend(e, o);
                }
                return e;
            }
        }, function(t, e, r) {
            t.exports = {
                default: r(40),
                __esModule: !0
            };
        }, function(t, e, r) {
            r(41), t.exports = r(21).Object.seal;
        }, function(t, e, r) {
            var n = r(42);
            r(18)("seal", (function(t) {
                return function(e) {
                    return t && n(e) ? t(e) : e;
                };
            }));
        }, function(t, e) {
            t.exports = function(t) {
                return "object" == typeof t ? null !== t : "function" == typeof t;
            };
        }, function(t, e) {
            e.__esModule = !0, e.wrapHelper = function(t, e) {
                return "function" != typeof t ? t : function() {
                    return arguments[arguments.length - 1] = e(arguments[arguments.length - 1]), t.apply(this, arguments);
                };
            };
        }, function(t, e) {
            (function(r) {
                e.__esModule = !0, e.default = function(t) {
                    var e = void 0 !== r ? r : window, n = e.Handlebars;
                    t.noConflict = function() {
                        return e.Handlebars === t && (e.Handlebars = n), t;
                    };
                }, t.exports = e.default;
            }).call(e, function() {
                return this;
            }());
        }, function(t, e) {
            e.__esModule = !0;
            var r = {
                helpers: {
                    helperExpression: function(t) {
                        return "SubExpression" === t.type || ("MustacheStatement" === t.type || "BlockStatement" === t.type) && !!(t.params && t.params.length || t.hash);
                    },
                    scopedId: function(t) {
                        return /^\.|this\b/.test(t.original);
                    },
                    simpleId: function(t) {
                        return 1 === t.parts.length && !r.helpers.scopedId(t) && !t.depth;
                    }
                }
            };
            e.default = r, t.exports = e.default;
        }, function(t, e, r) {
            var n = r(1).default, i = r(3).default;
            e.__esModule = !0, e.parseWithoutProcessing = p, e.parse = function(t, e) {
                var r = p(t, e);
                return new o.default(e).accept(r);
            };
            var s = n(r(47)), o = n(r(48)), a = i(r(50)), c = r(5);
            e.parser = s.default;
            var l = {};
            function p(t, e) {
                return "Program" === t.type ? t : (s.default.yy = l, l.locInfo = function(t) {
                    return new l.SourceLocation(e && e.srcName, t);
                }, s.default.parse(t));
            }
            c.extend(l, a);
        }, function(t, e) {
            e.__esModule = !0;
            var r = function() {
                var t = {
                    trace: function() {},
                    yy: {},
                    symbols_: {
                        error: 2,
                        root: 3,
                        program: 4,
                        EOF: 5,
                        program_repetition0: 6,
                        statement: 7,
                        mustache: 8,
                        block: 9,
                        rawBlock: 10,
                        partial: 11,
                        partialBlock: 12,
                        content: 13,
                        COMMENT: 14,
                        CONTENT: 15,
                        openRawBlock: 16,
                        rawBlock_repetition0: 17,
                        END_RAW_BLOCK: 18,
                        OPEN_RAW_BLOCK: 19,
                        helperName: 20,
                        openRawBlock_repetition0: 21,
                        openRawBlock_option0: 22,
                        CLOSE_RAW_BLOCK: 23,
                        openBlock: 24,
                        block_option0: 25,
                        closeBlock: 26,
                        openInverse: 27,
                        block_option1: 28,
                        OPEN_BLOCK: 29,
                        openBlock_repetition0: 30,
                        openBlock_option0: 31,
                        openBlock_option1: 32,
                        CLOSE: 33,
                        OPEN_INVERSE: 34,
                        openInverse_repetition0: 35,
                        openInverse_option0: 36,
                        openInverse_option1: 37,
                        openInverseChain: 38,
                        OPEN_INVERSE_CHAIN: 39,
                        openInverseChain_repetition0: 40,
                        openInverseChain_option0: 41,
                        openInverseChain_option1: 42,
                        inverseAndProgram: 43,
                        INVERSE: 44,
                        inverseChain: 45,
                        inverseChain_option0: 46,
                        OPEN_ENDBLOCK: 47,
                        OPEN: 48,
                        mustache_repetition0: 49,
                        mustache_option0: 50,
                        OPEN_UNESCAPED: 51,
                        mustache_repetition1: 52,
                        mustache_option1: 53,
                        CLOSE_UNESCAPED: 54,
                        OPEN_PARTIAL: 55,
                        partialName: 56,
                        partial_repetition0: 57,
                        partial_option0: 58,
                        openPartialBlock: 59,
                        OPEN_PARTIAL_BLOCK: 60,
                        openPartialBlock_repetition0: 61,
                        openPartialBlock_option0: 62,
                        param: 63,
                        sexpr: 64,
                        OPEN_SEXPR: 65,
                        sexpr_repetition0: 66,
                        sexpr_option0: 67,
                        CLOSE_SEXPR: 68,
                        hash: 69,
                        hash_repetition_plus0: 70,
                        hashSegment: 71,
                        ID: 72,
                        EQUALS: 73,
                        blockParams: 74,
                        OPEN_BLOCK_PARAMS: 75,
                        blockParams_repetition_plus0: 76,
                        CLOSE_BLOCK_PARAMS: 77,
                        path: 78,
                        dataName: 79,
                        STRING: 80,
                        NUMBER: 81,
                        BOOLEAN: 82,
                        UNDEFINED: 83,
                        NULL: 84,
                        DATA: 85,
                        pathSegments: 86,
                        SEP: 87,
                        $accept: 0,
                        $end: 1
                    },
                    terminals_: {
                        2: "error",
                        5: "EOF",
                        14: "COMMENT",
                        15: "CONTENT",
                        18: "END_RAW_BLOCK",
                        19: "OPEN_RAW_BLOCK",
                        23: "CLOSE_RAW_BLOCK",
                        29: "OPEN_BLOCK",
                        33: "CLOSE",
                        34: "OPEN_INVERSE",
                        39: "OPEN_INVERSE_CHAIN",
                        44: "INVERSE",
                        47: "OPEN_ENDBLOCK",
                        48: "OPEN",
                        51: "OPEN_UNESCAPED",
                        54: "CLOSE_UNESCAPED",
                        55: "OPEN_PARTIAL",
                        60: "OPEN_PARTIAL_BLOCK",
                        65: "OPEN_SEXPR",
                        68: "CLOSE_SEXPR",
                        72: "ID",
                        73: "EQUALS",
                        75: "OPEN_BLOCK_PARAMS",
                        77: "CLOSE_BLOCK_PARAMS",
                        80: "STRING",
                        81: "NUMBER",
                        82: "BOOLEAN",
                        83: "UNDEFINED",
                        84: "NULL",
                        85: "DATA",
                        87: "SEP"
                    },
                    productions_: [ 0, [ 3, 2 ], [ 4, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 7, 1 ], [ 13, 1 ], [ 10, 3 ], [ 16, 5 ], [ 9, 4 ], [ 9, 4 ], [ 24, 6 ], [ 27, 6 ], [ 38, 6 ], [ 43, 2 ], [ 45, 3 ], [ 45, 1 ], [ 26, 3 ], [ 8, 5 ], [ 8, 5 ], [ 11, 5 ], [ 12, 3 ], [ 59, 5 ], [ 63, 1 ], [ 63, 1 ], [ 64, 5 ], [ 69, 1 ], [ 71, 3 ], [ 74, 3 ], [ 20, 1 ], [ 20, 1 ], [ 20, 1 ], [ 20, 1 ], [ 20, 1 ], [ 20, 1 ], [ 20, 1 ], [ 56, 1 ], [ 56, 1 ], [ 79, 2 ], [ 78, 1 ], [ 86, 3 ], [ 86, 1 ], [ 6, 0 ], [ 6, 2 ], [ 17, 0 ], [ 17, 2 ], [ 21, 0 ], [ 21, 2 ], [ 22, 0 ], [ 22, 1 ], [ 25, 0 ], [ 25, 1 ], [ 28, 0 ], [ 28, 1 ], [ 30, 0 ], [ 30, 2 ], [ 31, 0 ], [ 31, 1 ], [ 32, 0 ], [ 32, 1 ], [ 35, 0 ], [ 35, 2 ], [ 36, 0 ], [ 36, 1 ], [ 37, 0 ], [ 37, 1 ], [ 40, 0 ], [ 40, 2 ], [ 41, 0 ], [ 41, 1 ], [ 42, 0 ], [ 42, 1 ], [ 46, 0 ], [ 46, 1 ], [ 49, 0 ], [ 49, 2 ], [ 50, 0 ], [ 50, 1 ], [ 52, 0 ], [ 52, 2 ], [ 53, 0 ], [ 53, 1 ], [ 57, 0 ], [ 57, 2 ], [ 58, 0 ], [ 58, 1 ], [ 61, 0 ], [ 61, 2 ], [ 62, 0 ], [ 62, 1 ], [ 66, 0 ], [ 66, 2 ], [ 67, 0 ], [ 67, 1 ], [ 70, 1 ], [ 70, 2 ], [ 76, 1 ], [ 76, 2 ] ],
                    performAction: function(t, e, r, n, i, s, o) {
                        var a = s.length - 1;
                        switch (i) {
                          case 1:
                            return s[a - 1];

                          case 2:
                            this.$ = n.prepareProgram(s[a]);
                            break;

                          case 3:
                          case 4:
                          case 5:
                          case 6:
                          case 7:
                          case 8:
                          case 20:
                          case 27:
                          case 28:
                          case 33:
                          case 34:
                          case 40:
                          case 41:
                            this.$ = s[a];
                            break;

                          case 9:
                            this.$ = {
                                type: "CommentStatement",
                                value: n.stripComment(s[a]),
                                strip: n.stripFlags(s[a], s[a]),
                                loc: n.locInfo(this._$)
                            };
                            break;

                          case 10:
                            this.$ = {
                                type: "ContentStatement",
                                original: s[a],
                                value: s[a],
                                loc: n.locInfo(this._$)
                            };
                            break;

                          case 11:
                            this.$ = n.prepareRawBlock(s[a - 2], s[a - 1], s[a], this._$);
                            break;

                          case 12:
                            this.$ = {
                                path: s[a - 3],
                                params: s[a - 2],
                                hash: s[a - 1]
                            };
                            break;

                          case 13:
                            this.$ = n.prepareBlock(s[a - 3], s[a - 2], s[a - 1], s[a], !1, this._$);
                            break;

                          case 14:
                            this.$ = n.prepareBlock(s[a - 3], s[a - 2], s[a - 1], s[a], !0, this._$);
                            break;

                          case 15:
                            this.$ = {
                                open: s[a - 5],
                                path: s[a - 4],
                                params: s[a - 3],
                                hash: s[a - 2],
                                blockParams: s[a - 1],
                                strip: n.stripFlags(s[a - 5], s[a])
                            };
                            break;

                          case 16:
                          case 17:
                            this.$ = {
                                path: s[a - 4],
                                params: s[a - 3],
                                hash: s[a - 2],
                                blockParams: s[a - 1],
                                strip: n.stripFlags(s[a - 5], s[a])
                            };
                            break;

                          case 18:
                            this.$ = {
                                strip: n.stripFlags(s[a - 1], s[a - 1]),
                                program: s[a]
                            };
                            break;

                          case 19:
                            var c = n.prepareBlock(s[a - 2], s[a - 1], s[a], s[a], !1, this._$), l = n.prepareProgram([ c ], s[a - 1].loc);
                            l.chained = !0, this.$ = {
                                strip: s[a - 2].strip,
                                program: l,
                                chain: !0
                            };
                            break;

                          case 21:
                            this.$ = {
                                path: s[a - 1],
                                strip: n.stripFlags(s[a - 2], s[a])
                            };
                            break;

                          case 22:
                          case 23:
                            this.$ = n.prepareMustache(s[a - 3], s[a - 2], s[a - 1], s[a - 4], n.stripFlags(s[a - 4], s[a]), this._$);
                            break;

                          case 24:
                            this.$ = {
                                type: "PartialStatement",
                                name: s[a - 3],
                                params: s[a - 2],
                                hash: s[a - 1],
                                indent: "",
                                strip: n.stripFlags(s[a - 4], s[a]),
                                loc: n.locInfo(this._$)
                            };
                            break;

                          case 25:
                            this.$ = n.preparePartialBlock(s[a - 2], s[a - 1], s[a], this._$);
                            break;

                          case 26:
                            this.$ = {
                                path: s[a - 3],
                                params: s[a - 2],
                                hash: s[a - 1],
                                strip: n.stripFlags(s[a - 4], s[a])
                            };
                            break;

                          case 29:
                            this.$ = {
                                type: "SubExpression",
                                path: s[a - 3],
                                params: s[a - 2],
                                hash: s[a - 1],
                                loc: n.locInfo(this._$)
                            };
                            break;

                          case 30:
                            this.$ = {
                                type: "Hash",
                                pairs: s[a],
                                loc: n.locInfo(this._$)
                            };
                            break;

                          case 31:
                            this.$ = {
                                type: "HashPair",
                                key: n.id(s[a - 2]),
                                value: s[a],
                                loc: n.locInfo(this._$)
                            };
                            break;

                          case 32:
                            this.$ = n.id(s[a - 1]);
                            break;

                          case 35:
                            this.$ = {
                                type: "StringLiteral",
                                value: s[a],
                                original: s[a],
                                loc: n.locInfo(this._$)
                            };
                            break;

                          case 36:
                            this.$ = {
                                type: "NumberLiteral",
                                value: Number(s[a]),
                                original: Number(s[a]),
                                loc: n.locInfo(this._$)
                            };
                            break;

                          case 37:
                            this.$ = {
                                type: "BooleanLiteral",
                                value: "true" === s[a],
                                original: "true" === s[a],
                                loc: n.locInfo(this._$)
                            };
                            break;

                          case 38:
                            this.$ = {
                                type: "UndefinedLiteral",
                                original: void 0,
                                value: void 0,
                                loc: n.locInfo(this._$)
                            };
                            break;

                          case 39:
                            this.$ = {
                                type: "NullLiteral",
                                original: null,
                                value: null,
                                loc: n.locInfo(this._$)
                            };
                            break;

                          case 42:
                            this.$ = n.preparePath(!0, s[a], this._$);
                            break;

                          case 43:
                            this.$ = n.preparePath(!1, s[a], this._$);
                            break;

                          case 44:
                            s[a - 2].push({
                                part: n.id(s[a]),
                                original: s[a],
                                separator: s[a - 1]
                            }), this.$ = s[a - 2];
                            break;

                          case 45:
                            this.$ = [ {
                                part: n.id(s[a]),
                                original: s[a]
                            } ];
                            break;

                          case 46:
                          case 48:
                          case 50:
                          case 58:
                          case 64:
                          case 70:
                          case 78:
                          case 82:
                          case 86:
                          case 90:
                          case 94:
                            this.$ = [];
                            break;

                          case 47:
                          case 49:
                          case 51:
                          case 59:
                          case 65:
                          case 71:
                          case 79:
                          case 83:
                          case 87:
                          case 91:
                          case 95:
                          case 99:
                          case 101:
                            s[a - 1].push(s[a]);
                            break;

                          case 98:
                          case 100:
                            this.$ = [ s[a] ];
                        }
                    },
                    table: [ {
                        3: 1,
                        4: 2,
                        5: [ 2, 46 ],
                        6: 3,
                        14: [ 2, 46 ],
                        15: [ 2, 46 ],
                        19: [ 2, 46 ],
                        29: [ 2, 46 ],
                        34: [ 2, 46 ],
                        48: [ 2, 46 ],
                        51: [ 2, 46 ],
                        55: [ 2, 46 ],
                        60: [ 2, 46 ]
                    }, {
                        1: [ 3 ]
                    }, {
                        5: [ 1, 4 ]
                    }, {
                        5: [ 2, 2 ],
                        7: 5,
                        8: 6,
                        9: 7,
                        10: 8,
                        11: 9,
                        12: 10,
                        13: 11,
                        14: [ 1, 12 ],
                        15: [ 1, 20 ],
                        16: 17,
                        19: [ 1, 23 ],
                        24: 15,
                        27: 16,
                        29: [ 1, 21 ],
                        34: [ 1, 22 ],
                        39: [ 2, 2 ],
                        44: [ 2, 2 ],
                        47: [ 2, 2 ],
                        48: [ 1, 13 ],
                        51: [ 1, 14 ],
                        55: [ 1, 18 ],
                        59: 19,
                        60: [ 1, 24 ]
                    }, {
                        1: [ 2, 1 ]
                    }, {
                        5: [ 2, 47 ],
                        14: [ 2, 47 ],
                        15: [ 2, 47 ],
                        19: [ 2, 47 ],
                        29: [ 2, 47 ],
                        34: [ 2, 47 ],
                        39: [ 2, 47 ],
                        44: [ 2, 47 ],
                        47: [ 2, 47 ],
                        48: [ 2, 47 ],
                        51: [ 2, 47 ],
                        55: [ 2, 47 ],
                        60: [ 2, 47 ]
                    }, {
                        5: [ 2, 3 ],
                        14: [ 2, 3 ],
                        15: [ 2, 3 ],
                        19: [ 2, 3 ],
                        29: [ 2, 3 ],
                        34: [ 2, 3 ],
                        39: [ 2, 3 ],
                        44: [ 2, 3 ],
                        47: [ 2, 3 ],
                        48: [ 2, 3 ],
                        51: [ 2, 3 ],
                        55: [ 2, 3 ],
                        60: [ 2, 3 ]
                    }, {
                        5: [ 2, 4 ],
                        14: [ 2, 4 ],
                        15: [ 2, 4 ],
                        19: [ 2, 4 ],
                        29: [ 2, 4 ],
                        34: [ 2, 4 ],
                        39: [ 2, 4 ],
                        44: [ 2, 4 ],
                        47: [ 2, 4 ],
                        48: [ 2, 4 ],
                        51: [ 2, 4 ],
                        55: [ 2, 4 ],
                        60: [ 2, 4 ]
                    }, {
                        5: [ 2, 5 ],
                        14: [ 2, 5 ],
                        15: [ 2, 5 ],
                        19: [ 2, 5 ],
                        29: [ 2, 5 ],
                        34: [ 2, 5 ],
                        39: [ 2, 5 ],
                        44: [ 2, 5 ],
                        47: [ 2, 5 ],
                        48: [ 2, 5 ],
                        51: [ 2, 5 ],
                        55: [ 2, 5 ],
                        60: [ 2, 5 ]
                    }, {
                        5: [ 2, 6 ],
                        14: [ 2, 6 ],
                        15: [ 2, 6 ],
                        19: [ 2, 6 ],
                        29: [ 2, 6 ],
                        34: [ 2, 6 ],
                        39: [ 2, 6 ],
                        44: [ 2, 6 ],
                        47: [ 2, 6 ],
                        48: [ 2, 6 ],
                        51: [ 2, 6 ],
                        55: [ 2, 6 ],
                        60: [ 2, 6 ]
                    }, {
                        5: [ 2, 7 ],
                        14: [ 2, 7 ],
                        15: [ 2, 7 ],
                        19: [ 2, 7 ],
                        29: [ 2, 7 ],
                        34: [ 2, 7 ],
                        39: [ 2, 7 ],
                        44: [ 2, 7 ],
                        47: [ 2, 7 ],
                        48: [ 2, 7 ],
                        51: [ 2, 7 ],
                        55: [ 2, 7 ],
                        60: [ 2, 7 ]
                    }, {
                        5: [ 2, 8 ],
                        14: [ 2, 8 ],
                        15: [ 2, 8 ],
                        19: [ 2, 8 ],
                        29: [ 2, 8 ],
                        34: [ 2, 8 ],
                        39: [ 2, 8 ],
                        44: [ 2, 8 ],
                        47: [ 2, 8 ],
                        48: [ 2, 8 ],
                        51: [ 2, 8 ],
                        55: [ 2, 8 ],
                        60: [ 2, 8 ]
                    }, {
                        5: [ 2, 9 ],
                        14: [ 2, 9 ],
                        15: [ 2, 9 ],
                        19: [ 2, 9 ],
                        29: [ 2, 9 ],
                        34: [ 2, 9 ],
                        39: [ 2, 9 ],
                        44: [ 2, 9 ],
                        47: [ 2, 9 ],
                        48: [ 2, 9 ],
                        51: [ 2, 9 ],
                        55: [ 2, 9 ],
                        60: [ 2, 9 ]
                    }, {
                        20: 25,
                        72: [ 1, 35 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        20: 36,
                        72: [ 1, 35 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        4: 37,
                        6: 3,
                        14: [ 2, 46 ],
                        15: [ 2, 46 ],
                        19: [ 2, 46 ],
                        29: [ 2, 46 ],
                        34: [ 2, 46 ],
                        39: [ 2, 46 ],
                        44: [ 2, 46 ],
                        47: [ 2, 46 ],
                        48: [ 2, 46 ],
                        51: [ 2, 46 ],
                        55: [ 2, 46 ],
                        60: [ 2, 46 ]
                    }, {
                        4: 38,
                        6: 3,
                        14: [ 2, 46 ],
                        15: [ 2, 46 ],
                        19: [ 2, 46 ],
                        29: [ 2, 46 ],
                        34: [ 2, 46 ],
                        44: [ 2, 46 ],
                        47: [ 2, 46 ],
                        48: [ 2, 46 ],
                        51: [ 2, 46 ],
                        55: [ 2, 46 ],
                        60: [ 2, 46 ]
                    }, {
                        15: [ 2, 48 ],
                        17: 39,
                        18: [ 2, 48 ]
                    }, {
                        20: 41,
                        56: 40,
                        64: 42,
                        65: [ 1, 43 ],
                        72: [ 1, 35 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        4: 44,
                        6: 3,
                        14: [ 2, 46 ],
                        15: [ 2, 46 ],
                        19: [ 2, 46 ],
                        29: [ 2, 46 ],
                        34: [ 2, 46 ],
                        47: [ 2, 46 ],
                        48: [ 2, 46 ],
                        51: [ 2, 46 ],
                        55: [ 2, 46 ],
                        60: [ 2, 46 ]
                    }, {
                        5: [ 2, 10 ],
                        14: [ 2, 10 ],
                        15: [ 2, 10 ],
                        18: [ 2, 10 ],
                        19: [ 2, 10 ],
                        29: [ 2, 10 ],
                        34: [ 2, 10 ],
                        39: [ 2, 10 ],
                        44: [ 2, 10 ],
                        47: [ 2, 10 ],
                        48: [ 2, 10 ],
                        51: [ 2, 10 ],
                        55: [ 2, 10 ],
                        60: [ 2, 10 ]
                    }, {
                        20: 45,
                        72: [ 1, 35 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        20: 46,
                        72: [ 1, 35 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        20: 47,
                        72: [ 1, 35 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        20: 41,
                        56: 48,
                        64: 42,
                        65: [ 1, 43 ],
                        72: [ 1, 35 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        33: [ 2, 78 ],
                        49: 49,
                        65: [ 2, 78 ],
                        72: [ 2, 78 ],
                        80: [ 2, 78 ],
                        81: [ 2, 78 ],
                        82: [ 2, 78 ],
                        83: [ 2, 78 ],
                        84: [ 2, 78 ],
                        85: [ 2, 78 ]
                    }, {
                        23: [ 2, 33 ],
                        33: [ 2, 33 ],
                        54: [ 2, 33 ],
                        65: [ 2, 33 ],
                        68: [ 2, 33 ],
                        72: [ 2, 33 ],
                        75: [ 2, 33 ],
                        80: [ 2, 33 ],
                        81: [ 2, 33 ],
                        82: [ 2, 33 ],
                        83: [ 2, 33 ],
                        84: [ 2, 33 ],
                        85: [ 2, 33 ]
                    }, {
                        23: [ 2, 34 ],
                        33: [ 2, 34 ],
                        54: [ 2, 34 ],
                        65: [ 2, 34 ],
                        68: [ 2, 34 ],
                        72: [ 2, 34 ],
                        75: [ 2, 34 ],
                        80: [ 2, 34 ],
                        81: [ 2, 34 ],
                        82: [ 2, 34 ],
                        83: [ 2, 34 ],
                        84: [ 2, 34 ],
                        85: [ 2, 34 ]
                    }, {
                        23: [ 2, 35 ],
                        33: [ 2, 35 ],
                        54: [ 2, 35 ],
                        65: [ 2, 35 ],
                        68: [ 2, 35 ],
                        72: [ 2, 35 ],
                        75: [ 2, 35 ],
                        80: [ 2, 35 ],
                        81: [ 2, 35 ],
                        82: [ 2, 35 ],
                        83: [ 2, 35 ],
                        84: [ 2, 35 ],
                        85: [ 2, 35 ]
                    }, {
                        23: [ 2, 36 ],
                        33: [ 2, 36 ],
                        54: [ 2, 36 ],
                        65: [ 2, 36 ],
                        68: [ 2, 36 ],
                        72: [ 2, 36 ],
                        75: [ 2, 36 ],
                        80: [ 2, 36 ],
                        81: [ 2, 36 ],
                        82: [ 2, 36 ],
                        83: [ 2, 36 ],
                        84: [ 2, 36 ],
                        85: [ 2, 36 ]
                    }, {
                        23: [ 2, 37 ],
                        33: [ 2, 37 ],
                        54: [ 2, 37 ],
                        65: [ 2, 37 ],
                        68: [ 2, 37 ],
                        72: [ 2, 37 ],
                        75: [ 2, 37 ],
                        80: [ 2, 37 ],
                        81: [ 2, 37 ],
                        82: [ 2, 37 ],
                        83: [ 2, 37 ],
                        84: [ 2, 37 ],
                        85: [ 2, 37 ]
                    }, {
                        23: [ 2, 38 ],
                        33: [ 2, 38 ],
                        54: [ 2, 38 ],
                        65: [ 2, 38 ],
                        68: [ 2, 38 ],
                        72: [ 2, 38 ],
                        75: [ 2, 38 ],
                        80: [ 2, 38 ],
                        81: [ 2, 38 ],
                        82: [ 2, 38 ],
                        83: [ 2, 38 ],
                        84: [ 2, 38 ],
                        85: [ 2, 38 ]
                    }, {
                        23: [ 2, 39 ],
                        33: [ 2, 39 ],
                        54: [ 2, 39 ],
                        65: [ 2, 39 ],
                        68: [ 2, 39 ],
                        72: [ 2, 39 ],
                        75: [ 2, 39 ],
                        80: [ 2, 39 ],
                        81: [ 2, 39 ],
                        82: [ 2, 39 ],
                        83: [ 2, 39 ],
                        84: [ 2, 39 ],
                        85: [ 2, 39 ]
                    }, {
                        23: [ 2, 43 ],
                        33: [ 2, 43 ],
                        54: [ 2, 43 ],
                        65: [ 2, 43 ],
                        68: [ 2, 43 ],
                        72: [ 2, 43 ],
                        75: [ 2, 43 ],
                        80: [ 2, 43 ],
                        81: [ 2, 43 ],
                        82: [ 2, 43 ],
                        83: [ 2, 43 ],
                        84: [ 2, 43 ],
                        85: [ 2, 43 ],
                        87: [ 1, 50 ]
                    }, {
                        72: [ 1, 35 ],
                        86: 51
                    }, {
                        23: [ 2, 45 ],
                        33: [ 2, 45 ],
                        54: [ 2, 45 ],
                        65: [ 2, 45 ],
                        68: [ 2, 45 ],
                        72: [ 2, 45 ],
                        75: [ 2, 45 ],
                        80: [ 2, 45 ],
                        81: [ 2, 45 ],
                        82: [ 2, 45 ],
                        83: [ 2, 45 ],
                        84: [ 2, 45 ],
                        85: [ 2, 45 ],
                        87: [ 2, 45 ]
                    }, {
                        52: 52,
                        54: [ 2, 82 ],
                        65: [ 2, 82 ],
                        72: [ 2, 82 ],
                        80: [ 2, 82 ],
                        81: [ 2, 82 ],
                        82: [ 2, 82 ],
                        83: [ 2, 82 ],
                        84: [ 2, 82 ],
                        85: [ 2, 82 ]
                    }, {
                        25: 53,
                        38: 55,
                        39: [ 1, 57 ],
                        43: 56,
                        44: [ 1, 58 ],
                        45: 54,
                        47: [ 2, 54 ]
                    }, {
                        28: 59,
                        43: 60,
                        44: [ 1, 58 ],
                        47: [ 2, 56 ]
                    }, {
                        13: 62,
                        15: [ 1, 20 ],
                        18: [ 1, 61 ]
                    }, {
                        33: [ 2, 86 ],
                        57: 63,
                        65: [ 2, 86 ],
                        72: [ 2, 86 ],
                        80: [ 2, 86 ],
                        81: [ 2, 86 ],
                        82: [ 2, 86 ],
                        83: [ 2, 86 ],
                        84: [ 2, 86 ],
                        85: [ 2, 86 ]
                    }, {
                        33: [ 2, 40 ],
                        65: [ 2, 40 ],
                        72: [ 2, 40 ],
                        80: [ 2, 40 ],
                        81: [ 2, 40 ],
                        82: [ 2, 40 ],
                        83: [ 2, 40 ],
                        84: [ 2, 40 ],
                        85: [ 2, 40 ]
                    }, {
                        33: [ 2, 41 ],
                        65: [ 2, 41 ],
                        72: [ 2, 41 ],
                        80: [ 2, 41 ],
                        81: [ 2, 41 ],
                        82: [ 2, 41 ],
                        83: [ 2, 41 ],
                        84: [ 2, 41 ],
                        85: [ 2, 41 ]
                    }, {
                        20: 64,
                        72: [ 1, 35 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        26: 65,
                        47: [ 1, 66 ]
                    }, {
                        30: 67,
                        33: [ 2, 58 ],
                        65: [ 2, 58 ],
                        72: [ 2, 58 ],
                        75: [ 2, 58 ],
                        80: [ 2, 58 ],
                        81: [ 2, 58 ],
                        82: [ 2, 58 ],
                        83: [ 2, 58 ],
                        84: [ 2, 58 ],
                        85: [ 2, 58 ]
                    }, {
                        33: [ 2, 64 ],
                        35: 68,
                        65: [ 2, 64 ],
                        72: [ 2, 64 ],
                        75: [ 2, 64 ],
                        80: [ 2, 64 ],
                        81: [ 2, 64 ],
                        82: [ 2, 64 ],
                        83: [ 2, 64 ],
                        84: [ 2, 64 ],
                        85: [ 2, 64 ]
                    }, {
                        21: 69,
                        23: [ 2, 50 ],
                        65: [ 2, 50 ],
                        72: [ 2, 50 ],
                        80: [ 2, 50 ],
                        81: [ 2, 50 ],
                        82: [ 2, 50 ],
                        83: [ 2, 50 ],
                        84: [ 2, 50 ],
                        85: [ 2, 50 ]
                    }, {
                        33: [ 2, 90 ],
                        61: 70,
                        65: [ 2, 90 ],
                        72: [ 2, 90 ],
                        80: [ 2, 90 ],
                        81: [ 2, 90 ],
                        82: [ 2, 90 ],
                        83: [ 2, 90 ],
                        84: [ 2, 90 ],
                        85: [ 2, 90 ]
                    }, {
                        20: 74,
                        33: [ 2, 80 ],
                        50: 71,
                        63: 72,
                        64: 75,
                        65: [ 1, 43 ],
                        69: 73,
                        70: 76,
                        71: 77,
                        72: [ 1, 78 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        72: [ 1, 79 ]
                    }, {
                        23: [ 2, 42 ],
                        33: [ 2, 42 ],
                        54: [ 2, 42 ],
                        65: [ 2, 42 ],
                        68: [ 2, 42 ],
                        72: [ 2, 42 ],
                        75: [ 2, 42 ],
                        80: [ 2, 42 ],
                        81: [ 2, 42 ],
                        82: [ 2, 42 ],
                        83: [ 2, 42 ],
                        84: [ 2, 42 ],
                        85: [ 2, 42 ],
                        87: [ 1, 50 ]
                    }, {
                        20: 74,
                        53: 80,
                        54: [ 2, 84 ],
                        63: 81,
                        64: 75,
                        65: [ 1, 43 ],
                        69: 82,
                        70: 76,
                        71: 77,
                        72: [ 1, 78 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        26: 83,
                        47: [ 1, 66 ]
                    }, {
                        47: [ 2, 55 ]
                    }, {
                        4: 84,
                        6: 3,
                        14: [ 2, 46 ],
                        15: [ 2, 46 ],
                        19: [ 2, 46 ],
                        29: [ 2, 46 ],
                        34: [ 2, 46 ],
                        39: [ 2, 46 ],
                        44: [ 2, 46 ],
                        47: [ 2, 46 ],
                        48: [ 2, 46 ],
                        51: [ 2, 46 ],
                        55: [ 2, 46 ],
                        60: [ 2, 46 ]
                    }, {
                        47: [ 2, 20 ]
                    }, {
                        20: 85,
                        72: [ 1, 35 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        4: 86,
                        6: 3,
                        14: [ 2, 46 ],
                        15: [ 2, 46 ],
                        19: [ 2, 46 ],
                        29: [ 2, 46 ],
                        34: [ 2, 46 ],
                        47: [ 2, 46 ],
                        48: [ 2, 46 ],
                        51: [ 2, 46 ],
                        55: [ 2, 46 ],
                        60: [ 2, 46 ]
                    }, {
                        26: 87,
                        47: [ 1, 66 ]
                    }, {
                        47: [ 2, 57 ]
                    }, {
                        5: [ 2, 11 ],
                        14: [ 2, 11 ],
                        15: [ 2, 11 ],
                        19: [ 2, 11 ],
                        29: [ 2, 11 ],
                        34: [ 2, 11 ],
                        39: [ 2, 11 ],
                        44: [ 2, 11 ],
                        47: [ 2, 11 ],
                        48: [ 2, 11 ],
                        51: [ 2, 11 ],
                        55: [ 2, 11 ],
                        60: [ 2, 11 ]
                    }, {
                        15: [ 2, 49 ],
                        18: [ 2, 49 ]
                    }, {
                        20: 74,
                        33: [ 2, 88 ],
                        58: 88,
                        63: 89,
                        64: 75,
                        65: [ 1, 43 ],
                        69: 90,
                        70: 76,
                        71: 77,
                        72: [ 1, 78 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        65: [ 2, 94 ],
                        66: 91,
                        68: [ 2, 94 ],
                        72: [ 2, 94 ],
                        80: [ 2, 94 ],
                        81: [ 2, 94 ],
                        82: [ 2, 94 ],
                        83: [ 2, 94 ],
                        84: [ 2, 94 ],
                        85: [ 2, 94 ]
                    }, {
                        5: [ 2, 25 ],
                        14: [ 2, 25 ],
                        15: [ 2, 25 ],
                        19: [ 2, 25 ],
                        29: [ 2, 25 ],
                        34: [ 2, 25 ],
                        39: [ 2, 25 ],
                        44: [ 2, 25 ],
                        47: [ 2, 25 ],
                        48: [ 2, 25 ],
                        51: [ 2, 25 ],
                        55: [ 2, 25 ],
                        60: [ 2, 25 ]
                    }, {
                        20: 92,
                        72: [ 1, 35 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        20: 74,
                        31: 93,
                        33: [ 2, 60 ],
                        63: 94,
                        64: 75,
                        65: [ 1, 43 ],
                        69: 95,
                        70: 76,
                        71: 77,
                        72: [ 1, 78 ],
                        75: [ 2, 60 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        20: 74,
                        33: [ 2, 66 ],
                        36: 96,
                        63: 97,
                        64: 75,
                        65: [ 1, 43 ],
                        69: 98,
                        70: 76,
                        71: 77,
                        72: [ 1, 78 ],
                        75: [ 2, 66 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        20: 74,
                        22: 99,
                        23: [ 2, 52 ],
                        63: 100,
                        64: 75,
                        65: [ 1, 43 ],
                        69: 101,
                        70: 76,
                        71: 77,
                        72: [ 1, 78 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        20: 74,
                        33: [ 2, 92 ],
                        62: 102,
                        63: 103,
                        64: 75,
                        65: [ 1, 43 ],
                        69: 104,
                        70: 76,
                        71: 77,
                        72: [ 1, 78 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        33: [ 1, 105 ]
                    }, {
                        33: [ 2, 79 ],
                        65: [ 2, 79 ],
                        72: [ 2, 79 ],
                        80: [ 2, 79 ],
                        81: [ 2, 79 ],
                        82: [ 2, 79 ],
                        83: [ 2, 79 ],
                        84: [ 2, 79 ],
                        85: [ 2, 79 ]
                    }, {
                        33: [ 2, 81 ]
                    }, {
                        23: [ 2, 27 ],
                        33: [ 2, 27 ],
                        54: [ 2, 27 ],
                        65: [ 2, 27 ],
                        68: [ 2, 27 ],
                        72: [ 2, 27 ],
                        75: [ 2, 27 ],
                        80: [ 2, 27 ],
                        81: [ 2, 27 ],
                        82: [ 2, 27 ],
                        83: [ 2, 27 ],
                        84: [ 2, 27 ],
                        85: [ 2, 27 ]
                    }, {
                        23: [ 2, 28 ],
                        33: [ 2, 28 ],
                        54: [ 2, 28 ],
                        65: [ 2, 28 ],
                        68: [ 2, 28 ],
                        72: [ 2, 28 ],
                        75: [ 2, 28 ],
                        80: [ 2, 28 ],
                        81: [ 2, 28 ],
                        82: [ 2, 28 ],
                        83: [ 2, 28 ],
                        84: [ 2, 28 ],
                        85: [ 2, 28 ]
                    }, {
                        23: [ 2, 30 ],
                        33: [ 2, 30 ],
                        54: [ 2, 30 ],
                        68: [ 2, 30 ],
                        71: 106,
                        72: [ 1, 107 ],
                        75: [ 2, 30 ]
                    }, {
                        23: [ 2, 98 ],
                        33: [ 2, 98 ],
                        54: [ 2, 98 ],
                        68: [ 2, 98 ],
                        72: [ 2, 98 ],
                        75: [ 2, 98 ]
                    }, {
                        23: [ 2, 45 ],
                        33: [ 2, 45 ],
                        54: [ 2, 45 ],
                        65: [ 2, 45 ],
                        68: [ 2, 45 ],
                        72: [ 2, 45 ],
                        73: [ 1, 108 ],
                        75: [ 2, 45 ],
                        80: [ 2, 45 ],
                        81: [ 2, 45 ],
                        82: [ 2, 45 ],
                        83: [ 2, 45 ],
                        84: [ 2, 45 ],
                        85: [ 2, 45 ],
                        87: [ 2, 45 ]
                    }, {
                        23: [ 2, 44 ],
                        33: [ 2, 44 ],
                        54: [ 2, 44 ],
                        65: [ 2, 44 ],
                        68: [ 2, 44 ],
                        72: [ 2, 44 ],
                        75: [ 2, 44 ],
                        80: [ 2, 44 ],
                        81: [ 2, 44 ],
                        82: [ 2, 44 ],
                        83: [ 2, 44 ],
                        84: [ 2, 44 ],
                        85: [ 2, 44 ],
                        87: [ 2, 44 ]
                    }, {
                        54: [ 1, 109 ]
                    }, {
                        54: [ 2, 83 ],
                        65: [ 2, 83 ],
                        72: [ 2, 83 ],
                        80: [ 2, 83 ],
                        81: [ 2, 83 ],
                        82: [ 2, 83 ],
                        83: [ 2, 83 ],
                        84: [ 2, 83 ],
                        85: [ 2, 83 ]
                    }, {
                        54: [ 2, 85 ]
                    }, {
                        5: [ 2, 13 ],
                        14: [ 2, 13 ],
                        15: [ 2, 13 ],
                        19: [ 2, 13 ],
                        29: [ 2, 13 ],
                        34: [ 2, 13 ],
                        39: [ 2, 13 ],
                        44: [ 2, 13 ],
                        47: [ 2, 13 ],
                        48: [ 2, 13 ],
                        51: [ 2, 13 ],
                        55: [ 2, 13 ],
                        60: [ 2, 13 ]
                    }, {
                        38: 55,
                        39: [ 1, 57 ],
                        43: 56,
                        44: [ 1, 58 ],
                        45: 111,
                        46: 110,
                        47: [ 2, 76 ]
                    }, {
                        33: [ 2, 70 ],
                        40: 112,
                        65: [ 2, 70 ],
                        72: [ 2, 70 ],
                        75: [ 2, 70 ],
                        80: [ 2, 70 ],
                        81: [ 2, 70 ],
                        82: [ 2, 70 ],
                        83: [ 2, 70 ],
                        84: [ 2, 70 ],
                        85: [ 2, 70 ]
                    }, {
                        47: [ 2, 18 ]
                    }, {
                        5: [ 2, 14 ],
                        14: [ 2, 14 ],
                        15: [ 2, 14 ],
                        19: [ 2, 14 ],
                        29: [ 2, 14 ],
                        34: [ 2, 14 ],
                        39: [ 2, 14 ],
                        44: [ 2, 14 ],
                        47: [ 2, 14 ],
                        48: [ 2, 14 ],
                        51: [ 2, 14 ],
                        55: [ 2, 14 ],
                        60: [ 2, 14 ]
                    }, {
                        33: [ 1, 113 ]
                    }, {
                        33: [ 2, 87 ],
                        65: [ 2, 87 ],
                        72: [ 2, 87 ],
                        80: [ 2, 87 ],
                        81: [ 2, 87 ],
                        82: [ 2, 87 ],
                        83: [ 2, 87 ],
                        84: [ 2, 87 ],
                        85: [ 2, 87 ]
                    }, {
                        33: [ 2, 89 ]
                    }, {
                        20: 74,
                        63: 115,
                        64: 75,
                        65: [ 1, 43 ],
                        67: 114,
                        68: [ 2, 96 ],
                        69: 116,
                        70: 76,
                        71: 77,
                        72: [ 1, 78 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        33: [ 1, 117 ]
                    }, {
                        32: 118,
                        33: [ 2, 62 ],
                        74: 119,
                        75: [ 1, 120 ]
                    }, {
                        33: [ 2, 59 ],
                        65: [ 2, 59 ],
                        72: [ 2, 59 ],
                        75: [ 2, 59 ],
                        80: [ 2, 59 ],
                        81: [ 2, 59 ],
                        82: [ 2, 59 ],
                        83: [ 2, 59 ],
                        84: [ 2, 59 ],
                        85: [ 2, 59 ]
                    }, {
                        33: [ 2, 61 ],
                        75: [ 2, 61 ]
                    }, {
                        33: [ 2, 68 ],
                        37: 121,
                        74: 122,
                        75: [ 1, 120 ]
                    }, {
                        33: [ 2, 65 ],
                        65: [ 2, 65 ],
                        72: [ 2, 65 ],
                        75: [ 2, 65 ],
                        80: [ 2, 65 ],
                        81: [ 2, 65 ],
                        82: [ 2, 65 ],
                        83: [ 2, 65 ],
                        84: [ 2, 65 ],
                        85: [ 2, 65 ]
                    }, {
                        33: [ 2, 67 ],
                        75: [ 2, 67 ]
                    }, {
                        23: [ 1, 123 ]
                    }, {
                        23: [ 2, 51 ],
                        65: [ 2, 51 ],
                        72: [ 2, 51 ],
                        80: [ 2, 51 ],
                        81: [ 2, 51 ],
                        82: [ 2, 51 ],
                        83: [ 2, 51 ],
                        84: [ 2, 51 ],
                        85: [ 2, 51 ]
                    }, {
                        23: [ 2, 53 ]
                    }, {
                        33: [ 1, 124 ]
                    }, {
                        33: [ 2, 91 ],
                        65: [ 2, 91 ],
                        72: [ 2, 91 ],
                        80: [ 2, 91 ],
                        81: [ 2, 91 ],
                        82: [ 2, 91 ],
                        83: [ 2, 91 ],
                        84: [ 2, 91 ],
                        85: [ 2, 91 ]
                    }, {
                        33: [ 2, 93 ]
                    }, {
                        5: [ 2, 22 ],
                        14: [ 2, 22 ],
                        15: [ 2, 22 ],
                        19: [ 2, 22 ],
                        29: [ 2, 22 ],
                        34: [ 2, 22 ],
                        39: [ 2, 22 ],
                        44: [ 2, 22 ],
                        47: [ 2, 22 ],
                        48: [ 2, 22 ],
                        51: [ 2, 22 ],
                        55: [ 2, 22 ],
                        60: [ 2, 22 ]
                    }, {
                        23: [ 2, 99 ],
                        33: [ 2, 99 ],
                        54: [ 2, 99 ],
                        68: [ 2, 99 ],
                        72: [ 2, 99 ],
                        75: [ 2, 99 ]
                    }, {
                        73: [ 1, 108 ]
                    }, {
                        20: 74,
                        63: 125,
                        64: 75,
                        65: [ 1, 43 ],
                        72: [ 1, 35 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        5: [ 2, 23 ],
                        14: [ 2, 23 ],
                        15: [ 2, 23 ],
                        19: [ 2, 23 ],
                        29: [ 2, 23 ],
                        34: [ 2, 23 ],
                        39: [ 2, 23 ],
                        44: [ 2, 23 ],
                        47: [ 2, 23 ],
                        48: [ 2, 23 ],
                        51: [ 2, 23 ],
                        55: [ 2, 23 ],
                        60: [ 2, 23 ]
                    }, {
                        47: [ 2, 19 ]
                    }, {
                        47: [ 2, 77 ]
                    }, {
                        20: 74,
                        33: [ 2, 72 ],
                        41: 126,
                        63: 127,
                        64: 75,
                        65: [ 1, 43 ],
                        69: 128,
                        70: 76,
                        71: 77,
                        72: [ 1, 78 ],
                        75: [ 2, 72 ],
                        78: 26,
                        79: 27,
                        80: [ 1, 28 ],
                        81: [ 1, 29 ],
                        82: [ 1, 30 ],
                        83: [ 1, 31 ],
                        84: [ 1, 32 ],
                        85: [ 1, 34 ],
                        86: 33
                    }, {
                        5: [ 2, 24 ],
                        14: [ 2, 24 ],
                        15: [ 2, 24 ],
                        19: [ 2, 24 ],
                        29: [ 2, 24 ],
                        34: [ 2, 24 ],
                        39: [ 2, 24 ],
                        44: [ 2, 24 ],
                        47: [ 2, 24 ],
                        48: [ 2, 24 ],
                        51: [ 2, 24 ],
                        55: [ 2, 24 ],
                        60: [ 2, 24 ]
                    }, {
                        68: [ 1, 129 ]
                    }, {
                        65: [ 2, 95 ],
                        68: [ 2, 95 ],
                        72: [ 2, 95 ],
                        80: [ 2, 95 ],
                        81: [ 2, 95 ],
                        82: [ 2, 95 ],
                        83: [ 2, 95 ],
                        84: [ 2, 95 ],
                        85: [ 2, 95 ]
                    }, {
                        68: [ 2, 97 ]
                    }, {
                        5: [ 2, 21 ],
                        14: [ 2, 21 ],
                        15: [ 2, 21 ],
                        19: [ 2, 21 ],
                        29: [ 2, 21 ],
                        34: [ 2, 21 ],
                        39: [ 2, 21 ],
                        44: [ 2, 21 ],
                        47: [ 2, 21 ],
                        48: [ 2, 21 ],
                        51: [ 2, 21 ],
                        55: [ 2, 21 ],
                        60: [ 2, 21 ]
                    }, {
                        33: [ 1, 130 ]
                    }, {
                        33: [ 2, 63 ]
                    }, {
                        72: [ 1, 132 ],
                        76: 131
                    }, {
                        33: [ 1, 133 ]
                    }, {
                        33: [ 2, 69 ]
                    }, {
                        15: [ 2, 12 ],
                        18: [ 2, 12 ]
                    }, {
                        14: [ 2, 26 ],
                        15: [ 2, 26 ],
                        19: [ 2, 26 ],
                        29: [ 2, 26 ],
                        34: [ 2, 26 ],
                        47: [ 2, 26 ],
                        48: [ 2, 26 ],
                        51: [ 2, 26 ],
                        55: [ 2, 26 ],
                        60: [ 2, 26 ]
                    }, {
                        23: [ 2, 31 ],
                        33: [ 2, 31 ],
                        54: [ 2, 31 ],
                        68: [ 2, 31 ],
                        72: [ 2, 31 ],
                        75: [ 2, 31 ]
                    }, {
                        33: [ 2, 74 ],
                        42: 134,
                        74: 135,
                        75: [ 1, 120 ]
                    }, {
                        33: [ 2, 71 ],
                        65: [ 2, 71 ],
                        72: [ 2, 71 ],
                        75: [ 2, 71 ],
                        80: [ 2, 71 ],
                        81: [ 2, 71 ],
                        82: [ 2, 71 ],
                        83: [ 2, 71 ],
                        84: [ 2, 71 ],
                        85: [ 2, 71 ]
                    }, {
                        33: [ 2, 73 ],
                        75: [ 2, 73 ]
                    }, {
                        23: [ 2, 29 ],
                        33: [ 2, 29 ],
                        54: [ 2, 29 ],
                        65: [ 2, 29 ],
                        68: [ 2, 29 ],
                        72: [ 2, 29 ],
                        75: [ 2, 29 ],
                        80: [ 2, 29 ],
                        81: [ 2, 29 ],
                        82: [ 2, 29 ],
                        83: [ 2, 29 ],
                        84: [ 2, 29 ],
                        85: [ 2, 29 ]
                    }, {
                        14: [ 2, 15 ],
                        15: [ 2, 15 ],
                        19: [ 2, 15 ],
                        29: [ 2, 15 ],
                        34: [ 2, 15 ],
                        39: [ 2, 15 ],
                        44: [ 2, 15 ],
                        47: [ 2, 15 ],
                        48: [ 2, 15 ],
                        51: [ 2, 15 ],
                        55: [ 2, 15 ],
                        60: [ 2, 15 ]
                    }, {
                        72: [ 1, 137 ],
                        77: [ 1, 136 ]
                    }, {
                        72: [ 2, 100 ],
                        77: [ 2, 100 ]
                    }, {
                        14: [ 2, 16 ],
                        15: [ 2, 16 ],
                        19: [ 2, 16 ],
                        29: [ 2, 16 ],
                        34: [ 2, 16 ],
                        44: [ 2, 16 ],
                        47: [ 2, 16 ],
                        48: [ 2, 16 ],
                        51: [ 2, 16 ],
                        55: [ 2, 16 ],
                        60: [ 2, 16 ]
                    }, {
                        33: [ 1, 138 ]
                    }, {
                        33: [ 2, 75 ]
                    }, {
                        33: [ 2, 32 ]
                    }, {
                        72: [ 2, 101 ],
                        77: [ 2, 101 ]
                    }, {
                        14: [ 2, 17 ],
                        15: [ 2, 17 ],
                        19: [ 2, 17 ],
                        29: [ 2, 17 ],
                        34: [ 2, 17 ],
                        39: [ 2, 17 ],
                        44: [ 2, 17 ],
                        47: [ 2, 17 ],
                        48: [ 2, 17 ],
                        51: [ 2, 17 ],
                        55: [ 2, 17 ],
                        60: [ 2, 17 ]
                    } ],
                    defaultActions: {
                        4: [ 2, 1 ],
                        54: [ 2, 55 ],
                        56: [ 2, 20 ],
                        60: [ 2, 57 ],
                        73: [ 2, 81 ],
                        82: [ 2, 85 ],
                        86: [ 2, 18 ],
                        90: [ 2, 89 ],
                        101: [ 2, 53 ],
                        104: [ 2, 93 ],
                        110: [ 2, 19 ],
                        111: [ 2, 77 ],
                        116: [ 2, 97 ],
                        119: [ 2, 63 ],
                        122: [ 2, 69 ],
                        135: [ 2, 75 ],
                        136: [ 2, 32 ]
                    },
                    parseError: function(t, e) {
                        throw new Error(t);
                    },
                    parse: function(t) {
                        var e = this, r = [ 0 ], n = [ null ], i = [], s = this.table, o = "", a = 0, c = 0;
                        this.lexer.setInput(t), this.lexer.yy = this.yy, this.yy.lexer = this.lexer, this.yy.parser = this, 
                        void 0 === this.lexer.yylloc && (this.lexer.yylloc = {});
                        var l = this.lexer.yylloc;
                        i.push(l);
                        var p = this.lexer.options && this.lexer.options.ranges;
                        "function" == typeof this.yy.parseError && (this.parseError = this.yy.parseError);
                        for (var u, h, f, d, m, g, v, y, k, S = {}; ;) {
                            if (h = r[r.length - 1], this.defaultActions[h] ? f = this.defaultActions[h] : (null == u && (k = void 0, 
                            "number" != typeof (k = e.lexer.lex() || 1) && (k = e.symbols_[k] || k), u = k), 
                            f = s[h] && s[h][u]), void 0 === f || !f.length || !f[0]) {
                                var _ = "";
                                for (m in y = [], s[h]) this.terminals_[m] && m > 2 && y.push("'" + this.terminals_[m] + "'");
                                _ = this.lexer.showPosition ? "Parse error on line " + (a + 1) + ":\n" + this.lexer.showPosition() + "\nExpecting " + y.join(", ") + ", got '" + (this.terminals_[u] || u) + "'" : "Parse error on line " + (a + 1) + ": Unexpected " + (1 == u ? "end of input" : "'" + (this.terminals_[u] || u) + "'"), 
                                this.parseError(_, {
                                    text: this.lexer.match,
                                    token: this.terminals_[u] || u,
                                    line: this.lexer.yylineno,
                                    loc: l,
                                    expected: y
                                });
                            }
                            if (f[0] instanceof Array && f.length > 1) throw new Error("Parse Error: multiple actions possible at state: " + h + ", token: " + u);
                            switch (f[0]) {
                              case 1:
                                r.push(u), n.push(this.lexer.yytext), i.push(this.lexer.yylloc), r.push(f[1]), u = null, 
                                c = this.lexer.yyleng, o = this.lexer.yytext, a = this.lexer.yylineno, l = this.lexer.yylloc;
                                break;

                              case 2:
                                if (g = this.productions_[f[1]][1], S.$ = n[n.length - g], S._$ = {
                                    first_line: i[i.length - (g || 1)].first_line,
                                    last_line: i[i.length - 1].last_line,
                                    first_column: i[i.length - (g || 1)].first_column,
                                    last_column: i[i.length - 1].last_column
                                }, p && (S._$.range = [ i[i.length - (g || 1)].range[0], i[i.length - 1].range[1] ]), 
                                void 0 !== (d = this.performAction.call(S, o, c, a, this.yy, f[1], n, i))) return d;
                                g && (r = r.slice(0, -1 * g * 2), n = n.slice(0, -1 * g), i = i.slice(0, -1 * g)), 
                                r.push(this.productions_[f[1]][0]), n.push(S.$), i.push(S._$), v = s[r[r.length - 2]][r[r.length - 1]], 
                                r.push(v);
                                break;

                              case 3:
                                return !0;
                            }
                        }
                        return !0;
                    }
                }, e = function() {
                    var t = {
                        EOF: 1,
                        parseError: function(t, e) {
                            if (!this.yy.parser) throw new Error(t);
                            this.yy.parser.parseError(t, e);
                        },
                        setInput: function(t) {
                            return this._input = t, this._more = this._less = this.done = !1, this.yylineno = this.yyleng = 0, 
                            this.yytext = this.matched = this.match = "", this.conditionStack = [ "INITIAL" ], 
                            this.yylloc = {
                                first_line: 1,
                                first_column: 0,
                                last_line: 1,
                                last_column: 0
                            }, this.options.ranges && (this.yylloc.range = [ 0, 0 ]), this.offset = 0, this;
                        },
                        input: function() {
                            var t = this._input[0];
                            return this.yytext += t, this.yyleng++, this.offset++, this.match += t, this.matched += t, 
                            t.match(/(?:\r\n?|\n).*/g) ? (this.yylineno++, this.yylloc.last_line++) : this.yylloc.last_column++, 
                            this.options.ranges && this.yylloc.range[1]++, this._input = this._input.slice(1), 
                            t;
                        },
                        unput: function(t) {
                            var e = t.length, r = t.split(/(?:\r\n?|\n)/g);
                            this._input = t + this._input, this.yytext = this.yytext.substr(0, this.yytext.length - e - 1), 
                            this.offset -= e;
                            var n = this.match.split(/(?:\r\n?|\n)/g);
                            this.match = this.match.substr(0, this.match.length - 1), this.matched = this.matched.substr(0, this.matched.length - 1), 
                            r.length - 1 && (this.yylineno -= r.length - 1);
                            var i = this.yylloc.range;
                            return this.yylloc = {
                                first_line: this.yylloc.first_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.first_column,
                                last_column: r ? (r.length === n.length ? this.yylloc.first_column : 0) + n[n.length - r.length].length - r[0].length : this.yylloc.first_column - e
                            }, this.options.ranges && (this.yylloc.range = [ i[0], i[0] + this.yyleng - e ]), 
                            this;
                        },
                        more: function() {
                            return this._more = !0, this;
                        },
                        less: function(t) {
                            this.unput(this.match.slice(t));
                        },
                        pastInput: function() {
                            var t = this.matched.substr(0, this.matched.length - this.match.length);
                            return (t.length > 20 ? "..." : "") + t.substr(-20).replace(/\n/g, "");
                        },
                        upcomingInput: function() {
                            var t = this.match;
                            return t.length < 20 && (t += this._input.substr(0, 20 - t.length)), (t.substr(0, 20) + (t.length > 20 ? "..." : "")).replace(/\n/g, "");
                        },
                        showPosition: function() {
                            var t = this.pastInput(), e = new Array(t.length + 1).join("-");
                            return t + this.upcomingInput() + "\n" + e + "^";
                        },
                        next: function() {
                            if (this.done) return this.EOF;
                            var t, e, r, n, i;
                            this._input || (this.done = !0), this._more || (this.yytext = "", this.match = "");
                            for (var s = this._currentRules(), o = 0; o < s.length && (!(r = this._input.match(this.rules[s[o]])) || e && !(r[0].length > e[0].length) || (e = r, 
                            n = o, this.options.flex)); o++) ;
                            return e ? ((i = e[0].match(/(?:\r\n?|\n).*/g)) && (this.yylineno += i.length), 
                            this.yylloc = {
                                first_line: this.yylloc.last_line,
                                last_line: this.yylineno + 1,
                                first_column: this.yylloc.last_column,
                                last_column: i ? i[i.length - 1].length - i[i.length - 1].match(/\r?\n?/)[0].length : this.yylloc.last_column + e[0].length
                            }, this.yytext += e[0], this.match += e[0], this.matches = e, this.yyleng = this.yytext.length, 
                            this.options.ranges && (this.yylloc.range = [ this.offset, this.offset += this.yyleng ]), 
                            this._more = !1, this._input = this._input.slice(e[0].length), this.matched += e[0], 
                            t = this.performAction.call(this, this.yy, this, s[n], this.conditionStack[this.conditionStack.length - 1]), 
                            this.done && this._input && (this.done = !1), t || void 0) : "" === this._input ? this.EOF : this.parseError("Lexical error on line " + (this.yylineno + 1) + ". Unrecognized text.\n" + this.showPosition(), {
                                text: "",
                                token: null,
                                line: this.yylineno
                            });
                        },
                        lex: function() {
                            var t = this.next();
                            return void 0 !== t ? t : this.lex();
                        },
                        begin: function(t) {
                            this.conditionStack.push(t);
                        },
                        popState: function() {
                            return this.conditionStack.pop();
                        },
                        _currentRules: function() {
                            return this.conditions[this.conditionStack[this.conditionStack.length - 1]].rules;
                        },
                        topState: function() {
                            return this.conditionStack[this.conditionStack.length - 2];
                        },
                        pushState: function(t) {
                            this.begin(t);
                        },
                        options: {},
                        performAction: function(t, e, r, n) {
                            function i(t, r) {
                                return e.yytext = e.yytext.substring(t, e.yyleng - r + t);
                            }
                            switch (r) {
                              case 0:
                                if ("\\\\" === e.yytext.slice(-2) ? (i(0, 1), this.begin("mu")) : "\\" === e.yytext.slice(-1) ? (i(0, 1), 
                                this.begin("emu")) : this.begin("mu"), e.yytext) return 15;
                                break;

                              case 1:
                              case 5:
                                return 15;

                              case 2:
                                return this.popState(), 15;

                              case 3:
                                return this.begin("raw"), 15;

                              case 4:
                                return this.popState(), "raw" === this.conditionStack[this.conditionStack.length - 1] ? 15 : (i(5, 9), 
                                "END_RAW_BLOCK");

                              case 6:
                              case 22:
                                return this.popState(), 14;

                              case 7:
                                return 65;

                              case 8:
                                return 68;

                              case 9:
                                return 19;

                              case 10:
                                return this.popState(), this.begin("raw"), 23;

                              case 11:
                                return 55;

                              case 12:
                                return 60;

                              case 13:
                                return 29;

                              case 14:
                                return 47;

                              case 15:
                              case 16:
                                return this.popState(), 44;

                              case 17:
                                return 34;

                              case 18:
                                return 39;

                              case 19:
                                return 51;

                              case 20:
                              case 23:
                                return 48;

                              case 21:
                                this.unput(e.yytext), this.popState(), this.begin("com");
                                break;

                              case 24:
                                return 73;

                              case 25:
                              case 26:
                              case 41:
                                return 72;

                              case 27:
                                return 87;

                              case 28:
                                break;

                              case 29:
                                return this.popState(), 54;

                              case 30:
                                return this.popState(), 33;

                              case 31:
                                return e.yytext = i(1, 2).replace(/\\"/g, '"'), 80;

                              case 32:
                                return e.yytext = i(1, 2).replace(/\\'/g, "'"), 80;

                              case 33:
                                return 85;

                              case 34:
                              case 35:
                                return 82;

                              case 36:
                                return 83;

                              case 37:
                                return 84;

                              case 38:
                                return 81;

                              case 39:
                                return 75;

                              case 40:
                                return 77;

                              case 42:
                                return e.yytext = e.yytext.replace(/\\([\\\]])/g, "$1"), 72;

                              case 43:
                                return "INVALID";

                              case 44:
                                return 5;
                            }
                        },
                        rules: [ /^(?:[^\x00]*?(?=(\{\{)))/, /^(?:[^\x00]+)/, /^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/, /^(?:\{\{\{\{(?=[^\/]))/, /^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/, /^(?:[^\x00]+?(?=(\{\{\{\{)))/, /^(?:[\s\S]*?--(~)?\}\})/, /^(?:\()/, /^(?:\))/, /^(?:\{\{\{\{)/, /^(?:\}\}\}\})/, /^(?:\{\{(~)?>)/, /^(?:\{\{(~)?#>)/, /^(?:\{\{(~)?#\*?)/, /^(?:\{\{(~)?\/)/, /^(?:\{\{(~)?\^\s*(~)?\}\})/, /^(?:\{\{(~)?\s*else\s*(~)?\}\})/, /^(?:\{\{(~)?\^)/, /^(?:\{\{(~)?\s*else\b)/, /^(?:\{\{(~)?\{)/, /^(?:\{\{(~)?&)/, /^(?:\{\{(~)?!--)/, /^(?:\{\{(~)?![\s\S]*?\}\})/, /^(?:\{\{(~)?\*?)/, /^(?:=)/, /^(?:\.\.)/, /^(?:\.(?=([=~}\s\/.)|])))/, /^(?:[\/.])/, /^(?:\s+)/, /^(?:\}(~)?\}\})/, /^(?:(~)?\}\})/, /^(?:"(\\["]|[^"])*")/, /^(?:'(\\[']|[^'])*')/, /^(?:@)/, /^(?:true(?=([~}\s)])))/, /^(?:false(?=([~}\s)])))/, /^(?:undefined(?=([~}\s)])))/, /^(?:null(?=([~}\s)])))/, /^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/, /^(?:as\s+\|)/, /^(?:\|)/, /^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/, /^(?:\[(\\\]|[^\]])*\])/, /^(?:.)/, /^(?:$)/ ],
                        conditions: {
                            mu: {
                                rules: [ 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35, 36, 37, 38, 39, 40, 41, 42, 43, 44 ],
                                inclusive: !1
                            },
                            emu: {
                                rules: [ 2 ],
                                inclusive: !1
                            },
                            com: {
                                rules: [ 6 ],
                                inclusive: !1
                            },
                            raw: {
                                rules: [ 3, 4, 5 ],
                                inclusive: !1
                            },
                            INITIAL: {
                                rules: [ 0, 1, 44 ],
                                inclusive: !0
                            }
                        }
                    };
                    return t;
                }();
                function r() {
                    this.yy = {};
                }
                return t.lexer = e, r.prototype = t, t.Parser = r, new r;
            }();
            e.default = r, t.exports = e.default;
        }, function(t, e, r) {
            var n = r(1).default;
            e.__esModule = !0;
            var i = n(r(49));
            function s() {
                var t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
                this.options = t;
            }
            function o(t, e, r) {
                void 0 === e && (e = t.length);
                var n = t[e - 1], i = t[e - 2];
                return n ? "ContentStatement" === n.type ? (i || !r ? /\r?\n\s*?$/ : /(^|\r?\n)\s*?$/).test(n.original) : void 0 : r;
            }
            function a(t, e, r) {
                void 0 === e && (e = -1);
                var n = t[e + 1], i = t[e + 2];
                return n ? "ContentStatement" === n.type ? (i || !r ? /^\s*?\r?\n/ : /^\s*?(\r?\n|$)/).test(n.original) : void 0 : r;
            }
            function c(t, e, r) {
                var n = t[null == e ? 0 : e + 1];
                if (n && "ContentStatement" === n.type && (r || !n.rightStripped)) {
                    var i = n.value;
                    n.value = n.value.replace(r ? /^\s+/ : /^[ \t]*\r?\n?/, ""), n.rightStripped = n.value !== i;
                }
            }
            function l(t, e, r) {
                var n = t[null == e ? t.length - 1 : e - 1];
                if (n && "ContentStatement" === n.type && (r || !n.leftStripped)) {
                    var i = n.value;
                    return n.value = n.value.replace(r ? /\s+$/ : /[ \t]+$/, ""), n.leftStripped = n.value !== i, 
                    n.leftStripped;
                }
            }
            s.prototype = new i.default, s.prototype.Program = function(t) {
                var e = !this.options.ignoreStandalone, r = !this.isRootSeen;
                this.isRootSeen = !0;
                for (var n = t.body, i = 0, s = n.length; i < s; i++) {
                    var p = n[i], u = this.accept(p);
                    if (u) {
                        var h = o(n, i, r), f = a(n, i, r), d = u.openStandalone && h, m = u.closeStandalone && f, g = u.inlineStandalone && h && f;
                        u.close && c(n, i, !0), u.open && l(n, i, !0), e && g && (c(n, i), l(n, i) && "PartialStatement" === p.type && (p.indent = /([ \t]+$)/.exec(n[i - 1].original)[1])), 
                        e && d && (c((p.program || p.inverse).body), l(n, i)), e && m && (c(n, i), l((p.inverse || p.program).body));
                    }
                }
                return t;
            }, s.prototype.BlockStatement = s.prototype.DecoratorBlock = s.prototype.PartialBlockStatement = function(t) {
                this.accept(t.program), this.accept(t.inverse);
                var e = t.program || t.inverse, r = t.program && t.inverse, n = r, i = r;
                if (r && r.chained) for (n = r.body[0].program; i.chained; ) i = i.body[i.body.length - 1].program;
                var s = {
                    open: t.openStrip.open,
                    close: t.closeStrip.close,
                    openStandalone: a(e.body),
                    closeStandalone: o((n || e).body)
                };
                if (t.openStrip.close && c(e.body, null, !0), r) {
                    var p = t.inverseStrip;
                    p.open && l(e.body, null, !0), p.close && c(n.body, null, !0), t.closeStrip.open && l(i.body, null, !0), 
                    !this.options.ignoreStandalone && o(e.body) && a(n.body) && (l(e.body), c(n.body));
                } else t.closeStrip.open && l(e.body, null, !0);
                return s;
            }, s.prototype.Decorator = s.prototype.MustacheStatement = function(t) {
                return t.strip;
            }, s.prototype.PartialStatement = s.prototype.CommentStatement = function(t) {
                var e = t.strip || {};
                return {
                    inlineStandalone: !0,
                    open: e.open,
                    close: e.close
                };
            }, e.default = s, t.exports = e.default;
        }, function(t, e, r) {
            var n = r(1).default;
            e.__esModule = !0;
            var i = n(r(6));
            function s() {
                this.parents = [];
            }
            function o(t) {
                this.acceptRequired(t, "path"), this.acceptArray(t.params), this.acceptKey(t, "hash");
            }
            function a(t) {
                o.call(this, t), this.acceptKey(t, "program"), this.acceptKey(t, "inverse");
            }
            function c(t) {
                this.acceptRequired(t, "name"), this.acceptArray(t.params), this.acceptKey(t, "hash");
            }
            s.prototype = {
                constructor: s,
                mutating: !1,
                acceptKey: function(t, e) {
                    var r = this.accept(t[e]);
                    if (this.mutating) {
                        if (r && !s.prototype[r.type]) throw new i.default('Unexpected node type "' + r.type + '" found when accepting ' + e + " on " + t.type);
                        t[e] = r;
                    }
                },
                acceptRequired: function(t, e) {
                    if (this.acceptKey(t, e), !t[e]) throw new i.default(t.type + " requires " + e);
                },
                acceptArray: function(t) {
                    for (var e = 0, r = t.length; e < r; e++) this.acceptKey(t, e), t[e] || (t.splice(e, 1), 
                    e--, r--);
                },
                accept: function(t) {
                    if (t) {
                        if (!this[t.type]) throw new i.default("Unknown type: " + t.type, t);
                        this.current && this.parents.unshift(this.current), this.current = t;
                        var e = this[t.type](t);
                        return this.current = this.parents.shift(), !this.mutating || e ? e : !1 !== e ? t : void 0;
                    }
                },
                Program: function(t) {
                    this.acceptArray(t.body);
                },
                MustacheStatement: o,
                Decorator: o,
                BlockStatement: a,
                DecoratorBlock: a,
                PartialStatement: c,
                PartialBlockStatement: function(t) {
                    c.call(this, t), this.acceptKey(t, "program");
                },
                ContentStatement: function() {},
                CommentStatement: function() {},
                SubExpression: o,
                PathExpression: function() {},
                StringLiteral: function() {},
                NumberLiteral: function() {},
                BooleanLiteral: function() {},
                UndefinedLiteral: function() {},
                NullLiteral: function() {},
                Hash: function(t) {
                    this.acceptArray(t.pairs);
                },
                HashPair: function(t) {
                    this.acceptRequired(t, "value");
                }
            }, e.default = s, t.exports = e.default;
        }, function(t, e, r) {
            var n = r(1).default;
            e.__esModule = !0, e.SourceLocation = function(t, e) {
                this.source = t, this.start = {
                    line: e.first_line,
                    column: e.first_column
                }, this.end = {
                    line: e.last_line,
                    column: e.last_column
                };
            }, e.id = function(t) {
                return /^\[.*\]$/.test(t) ? t.substring(1, t.length - 1) : t;
            }, e.stripFlags = function(t, e) {
                return {
                    open: "~" === t.charAt(2),
                    close: "~" === e.charAt(e.length - 3)
                };
            }, e.stripComment = function(t) {
                return t.replace(/^\{\{~?!-?-?/, "").replace(/-?-?~?\}\}$/, "");
            }, e.preparePath = function(t, e, r) {
                r = this.locInfo(r);
                for (var n = t ? "@" : "", s = [], o = 0, a = 0, c = e.length; a < c; a++) {
                    var l = e[a].part, p = e[a].original !== l;
                    if (n += (e[a].separator || "") + l, p || ".." !== l && "." !== l && "this" !== l) s.push(l); else {
                        if (s.length > 0) throw new i.default("Invalid path: " + n, {
                            loc: r
                        });
                        ".." === l && o++;
                    }
                }
                return {
                    type: "PathExpression",
                    data: t,
                    depth: o,
                    parts: s,
                    original: n,
                    loc: r
                };
            }, e.prepareMustache = function(t, e, r, n, i, s) {
                var o = n.charAt(3) || n.charAt(2), a = "{" !== o && "&" !== o;
                return {
                    type: /\*/.test(n) ? "Decorator" : "MustacheStatement",
                    path: t,
                    params: e,
                    hash: r,
                    escaped: a,
                    strip: i,
                    loc: this.locInfo(s)
                };
            }, e.prepareRawBlock = function(t, e, r, n) {
                s(t, r), n = this.locInfo(n);
                var i = {
                    type: "Program",
                    body: e,
                    strip: {},
                    loc: n
                };
                return {
                    type: "BlockStatement",
                    path: t.path,
                    params: t.params,
                    hash: t.hash,
                    program: i,
                    openStrip: {},
                    inverseStrip: {},
                    closeStrip: {},
                    loc: n
                };
            }, e.prepareBlock = function(t, e, r, n, o, a) {
                n && n.path && s(t, n);
                var c = /\*/.test(t.open);
                e.blockParams = t.blockParams;
                var l = void 0, p = void 0;
                if (r) {
                    if (c) throw new i.default("Unexpected inverse block on decorator", r);
                    r.chain && (r.program.body[0].closeStrip = n.strip), p = r.strip, l = r.program;
                }
                return o && (o = l, l = e, e = o), {
                    type: c ? "DecoratorBlock" : "BlockStatement",
                    path: t.path,
                    params: t.params,
                    hash: t.hash,
                    program: e,
                    inverse: l,
                    openStrip: t.strip,
                    inverseStrip: p,
                    closeStrip: n && n.strip,
                    loc: this.locInfo(a)
                };
            }, e.prepareProgram = function(t, e) {
                if (!e && t.length) {
                    var r = t[0].loc, n = t[t.length - 1].loc;
                    r && n && (e = {
                        source: r.source,
                        start: {
                            line: r.start.line,
                            column: r.start.column
                        },
                        end: {
                            line: n.end.line,
                            column: n.end.column
                        }
                    });
                }
                return {
                    type: "Program",
                    body: t,
                    strip: {},
                    loc: e
                };
            }, e.preparePartialBlock = function(t, e, r, n) {
                return s(t, r), {
                    type: "PartialBlockStatement",
                    name: t.path,
                    params: t.params,
                    hash: t.hash,
                    program: e,
                    openStrip: t.strip,
                    closeStrip: r && r.strip,
                    loc: this.locInfo(n)
                };
            };
            var i = n(r(6));
            function s(t, e) {
                if (e = e.path ? e.path.original : e, t.path.original !== e) {
                    var r = {
                        loc: t.path.loc
                    };
                    throw new i.default(t.path.original + " doesn't match " + e, r);
                }
            }
        }, function(t, e, r) {
            var n = r(34).default, i = r(1).default;
            e.__esModule = !0, e.Compiler = l, e.precompile = function(t, e, r) {
                if (null == t || "string" != typeof t && "Program" !== t.type) throw new s.default("You must pass a string or Handlebars AST to Handlebars.precompile. You passed " + t);
                "data" in (e = e || {}) || (e.data = !0), e.compat && (e.useDepths = !0);
                var n = r.parse(t, e), i = (new r.Compiler).compile(n, e);
                return (new r.JavaScriptCompiler).compile(i, e);
            }, e.compile = function(t, e, r) {
                if (void 0 === e && (e = {}), null == t || "string" != typeof t && "Program" !== t.type) throw new s.default("You must pass a string or Handlebars AST to Handlebars.compile. You passed " + t);
                "data" in (e = o.extend({}, e)) || (e.data = !0), e.compat && (e.useDepths = !0);
                var n = void 0;
                function i() {
                    var n = r.parse(t, e), i = (new r.Compiler).compile(n, e), s = (new r.JavaScriptCompiler).compile(i, e, void 0, !0);
                    return r.template(s);
                }
                function a(t, e) {
                    return n || (n = i()), n.call(this, t, e);
                }
                return a._setup = function(t) {
                    return n || (n = i()), n._setup(t);
                }, a._child = function(t, e, r, s) {
                    return n || (n = i()), n._child(t, e, r, s);
                }, a;
            };
            var s = i(r(6)), o = r(5), a = i(r(45)), c = [].slice;
            function l() {}
            function p(t, e) {
                if (t === e) return !0;
                if (o.isArray(t) && o.isArray(e) && t.length === e.length) {
                    for (var r = 0; r < t.length; r++) if (!p(t[r], e[r])) return !1;
                    return !0;
                }
            }
            function u(t) {
                if (!t.path.parts) {
                    var e = t.path;
                    t.path = {
                        type: "PathExpression",
                        data: !1,
                        depth: 0,
                        parts: [ e.original + "" ],
                        original: e.original + "",
                        loc: e.loc
                    };
                }
            }
            l.prototype = {
                compiler: l,
                equals: function(t) {
                    var e = this.opcodes.length;
                    if (t.opcodes.length !== e) return !1;
                    for (var r = 0; r < e; r++) {
                        var n = this.opcodes[r], i = t.opcodes[r];
                        if (n.opcode !== i.opcode || !p(n.args, i.args)) return !1;
                    }
                    for (e = this.children.length, r = 0; r < e; r++) if (!this.children[r].equals(t.children[r])) return !1;
                    return !0;
                },
                guid: 0,
                compile: function(t, e) {
                    return this.sourceNode = [], this.opcodes = [], this.children = [], this.options = e, 
                    this.stringParams = e.stringParams, this.trackIds = e.trackIds, e.blockParams = e.blockParams || [], 
                    e.knownHelpers = o.extend(n(null), {
                        helperMissing: !0,
                        blockHelperMissing: !0,
                        each: !0,
                        if: !0,
                        unless: !0,
                        with: !0,
                        log: !0,
                        lookup: !0
                    }, e.knownHelpers), this.accept(t);
                },
                compileProgram: function(t) {
                    var e = (new this.compiler).compile(t, this.options), r = this.guid++;
                    return this.usePartial = this.usePartial || e.usePartial, this.children[r] = e, 
                    this.useDepths = this.useDepths || e.useDepths, r;
                },
                accept: function(t) {
                    if (!this[t.type]) throw new s.default("Unknown type: " + t.type, t);
                    this.sourceNode.unshift(t);
                    var e = this[t.type](t);
                    return this.sourceNode.shift(), e;
                },
                Program: function(t) {
                    this.options.blockParams.unshift(t.blockParams);
                    for (var e = t.body, r = e.length, n = 0; n < r; n++) this.accept(e[n]);
                    return this.options.blockParams.shift(), this.isSimple = 1 === r, this.blockParams = t.blockParams ? t.blockParams.length : 0, 
                    this;
                },
                BlockStatement: function(t) {
                    u(t);
                    var e = t.program, r = t.inverse;
                    e = e && this.compileProgram(e), r = r && this.compileProgram(r);
                    var n = this.classifySexpr(t);
                    "helper" === n ? this.helperSexpr(t, e, r) : "simple" === n ? (this.simpleSexpr(t), 
                    this.opcode("pushProgram", e), this.opcode("pushProgram", r), this.opcode("emptyHash"), 
                    this.opcode("blockValue", t.path.original)) : (this.ambiguousSexpr(t, e, r), this.opcode("pushProgram", e), 
                    this.opcode("pushProgram", r), this.opcode("emptyHash"), this.opcode("ambiguousBlockValue")), 
                    this.opcode("append");
                },
                DecoratorBlock: function(t) {
                    var e = t.program && this.compileProgram(t.program), r = this.setupFullMustacheParams(t, e, void 0), n = t.path;
                    this.useDecorators = !0, this.opcode("registerDecorator", r.length, n.original);
                },
                PartialStatement: function(t) {
                    this.usePartial = !0;
                    var e = t.program;
                    e && (e = this.compileProgram(t.program));
                    var r = t.params;
                    if (r.length > 1) throw new s.default("Unsupported number of partial arguments: " + r.length, t);
                    r.length || (this.options.explicitPartialContext ? this.opcode("pushLiteral", "undefined") : r.push({
                        type: "PathExpression",
                        parts: [],
                        depth: 0
                    }));
                    var n = t.name.original, i = "SubExpression" === t.name.type;
                    i && this.accept(t.name), this.setupFullMustacheParams(t, e, void 0, !0);
                    var o = t.indent || "";
                    this.options.preventIndent && o && (this.opcode("appendContent", o), o = ""), this.opcode("invokePartial", i, n, o), 
                    this.opcode("append");
                },
                PartialBlockStatement: function(t) {
                    this.PartialStatement(t);
                },
                MustacheStatement: function(t) {
                    this.SubExpression(t), t.escaped && !this.options.noEscape ? this.opcode("appendEscaped") : this.opcode("append");
                },
                Decorator: function(t) {
                    this.DecoratorBlock(t);
                },
                ContentStatement: function(t) {
                    t.value && this.opcode("appendContent", t.value);
                },
                CommentStatement: function() {},
                SubExpression: function(t) {
                    u(t);
                    var e = this.classifySexpr(t);
                    "simple" === e ? this.simpleSexpr(t) : "helper" === e ? this.helperSexpr(t) : this.ambiguousSexpr(t);
                },
                ambiguousSexpr: function(t, e, r) {
                    var n = t.path, i = n.parts[0], s = null != e || null != r;
                    this.opcode("getContext", n.depth), this.opcode("pushProgram", e), this.opcode("pushProgram", r), 
                    n.strict = !0, this.accept(n), this.opcode("invokeAmbiguous", i, s);
                },
                simpleSexpr: function(t) {
                    var e = t.path;
                    e.strict = !0, this.accept(e), this.opcode("resolvePossibleLambda");
                },
                helperSexpr: function(t, e, r) {
                    var n = this.setupFullMustacheParams(t, e, r), i = t.path, o = i.parts[0];
                    if (this.options.knownHelpers[o]) this.opcode("invokeKnownHelper", n.length, o); else {
                        if (this.options.knownHelpersOnly) throw new s.default("You specified knownHelpersOnly, but used the unknown helper " + o, t);
                        i.strict = !0, i.falsy = !0, this.accept(i), this.opcode("invokeHelper", n.length, i.original, a.default.helpers.simpleId(i));
                    }
                },
                PathExpression: function(t) {
                    this.addDepth(t.depth), this.opcode("getContext", t.depth);
                    var e = t.parts[0], r = a.default.helpers.scopedId(t), n = !t.depth && !r && this.blockParamIndex(e);
                    n ? this.opcode("lookupBlockParam", n, t.parts) : e ? t.data ? (this.options.data = !0, 
                    this.opcode("lookupData", t.depth, t.parts, t.strict)) : this.opcode("lookupOnContext", t.parts, t.falsy, t.strict, r) : this.opcode("pushContext");
                },
                StringLiteral: function(t) {
                    this.opcode("pushString", t.value);
                },
                NumberLiteral: function(t) {
                    this.opcode("pushLiteral", t.value);
                },
                BooleanLiteral: function(t) {
                    this.opcode("pushLiteral", t.value);
                },
                UndefinedLiteral: function() {
                    this.opcode("pushLiteral", "undefined");
                },
                NullLiteral: function() {
                    this.opcode("pushLiteral", "null");
                },
                Hash: function(t) {
                    var e = t.pairs, r = 0, n = e.length;
                    for (this.opcode("pushHash"); r < n; r++) this.pushParam(e[r].value);
                    for (;r--; ) this.opcode("assignToHash", e[r].key);
                    this.opcode("popHash");
                },
                opcode: function(t) {
                    this.opcodes.push({
                        opcode: t,
                        args: c.call(arguments, 1),
                        loc: this.sourceNode[0].loc
                    });
                },
                addDepth: function(t) {
                    t && (this.useDepths = !0);
                },
                classifySexpr: function(t) {
                    var e = a.default.helpers.simpleId(t.path), r = e && !!this.blockParamIndex(t.path.parts[0]), n = !r && a.default.helpers.helperExpression(t), i = !r && (n || e);
                    if (i && !n) {
                        var s = t.path.parts[0], o = this.options;
                        o.knownHelpers[s] ? n = !0 : o.knownHelpersOnly && (i = !1);
                    }
                    return n ? "helper" : i ? "ambiguous" : "simple";
                },
                pushParams: function(t) {
                    for (var e = 0, r = t.length; e < r; e++) this.pushParam(t[e]);
                },
                pushParam: function(t) {
                    var e = null != t.value ? t.value : t.original || "";
                    if (this.stringParams) e.replace && (e = e.replace(/^(\.?\.\/)*/g, "").replace(/\//g, ".")), 
                    t.depth && this.addDepth(t.depth), this.opcode("getContext", t.depth || 0), this.opcode("pushStringParam", e, t.type), 
                    "SubExpression" === t.type && this.accept(t); else {
                        if (this.trackIds) {
                            var r = void 0;
                            if (!t.parts || a.default.helpers.scopedId(t) || t.depth || (r = this.blockParamIndex(t.parts[0])), 
                            r) {
                                var n = t.parts.slice(1).join(".");
                                this.opcode("pushId", "BlockParam", r, n);
                            } else (e = t.original || e).replace && (e = e.replace(/^this(?:\.|$)/, "").replace(/^\.\//, "").replace(/^\.$/, "")), 
                            this.opcode("pushId", t.type, e);
                        }
                        this.accept(t);
                    }
                },
                setupFullMustacheParams: function(t, e, r, n) {
                    var i = t.params;
                    return this.pushParams(i), this.opcode("pushProgram", e), this.opcode("pushProgram", r), 
                    t.hash ? this.accept(t.hash) : this.opcode("emptyHash", n), i;
                },
                blockParamIndex: function(t) {
                    for (var e = 0, r = this.options.blockParams.length; e < r; e++) {
                        var n = this.options.blockParams[e], i = n && o.indexOf(n, t);
                        if (n && i >= 0) return [ e, i ];
                    }
                }
            };
        }, function(t, e, r) {
            var n = r(13).default, i = r(1).default;
            e.__esModule = !0;
            var s = r(4), o = i(r(6)), a = r(5), c = i(r(53));
            function l(t) {
                this.value = t;
            }
            function p() {}
            p.prototype = {
                nameLookup: function(t, e) {
                    return this.internalNameLookup(t, e);
                },
                depthedLookup: function(t) {
                    return [ this.aliasable("container.lookup"), "(depths, ", JSON.stringify(t), ")" ];
                },
                compilerInfo: function() {
                    var t = s.COMPILER_REVISION;
                    return [ t, s.REVISION_CHANGES[t] ];
                },
                appendToBuffer: function(t, e, r) {
                    return a.isArray(t) || (t = [ t ]), t = this.source.wrap(t, e), this.environment.isSimple ? [ "return ", t, ";" ] : r ? [ "buffer += ", t, ";" ] : (t.appendToBuffer = !0, 
                    t);
                },
                initializeBuffer: function() {
                    return this.quotedString("");
                },
                internalNameLookup: function(t, e) {
                    return this.lookupPropertyFunctionIsUsed = !0, [ "lookupProperty(", t, ",", JSON.stringify(e), ")" ];
                },
                lookupPropertyFunctionIsUsed: !1,
                compile: function(t, e, r, n) {
                    this.environment = t, this.options = e, this.stringParams = this.options.stringParams, 
                    this.trackIds = this.options.trackIds, this.precompile = !n, this.name = this.environment.name, 
                    this.isChild = !!r, this.context = r || {
                        decorators: [],
                        programs: [],
                        environments: []
                    }, this.preamble(), this.stackSlot = 0, this.stackVars = [], this.aliases = {}, 
                    this.registers = {
                        list: []
                    }, this.hashes = [], this.compileStack = [], this.inlineStack = [], this.blockParams = [], 
                    this.compileChildren(t, e), this.useDepths = this.useDepths || t.useDepths || t.useDecorators || this.options.compat, 
                    this.useBlockParams = this.useBlockParams || t.useBlockParams;
                    var i = t.opcodes, s = void 0, a = void 0, c = void 0, l = void 0;
                    for (c = 0, l = i.length; c < l; c++) s = i[c], this.source.currentLocation = s.loc, 
                    a = a || s.loc, this[s.opcode].apply(this, s.args);
                    if (this.source.currentLocation = a, this.pushSource(""), this.stackSlot || this.inlineStack.length || this.compileStack.length) throw new o.default("Compile completed with content left on stack");
                    this.decorators.isEmpty() ? this.decorators = void 0 : (this.useDecorators = !0, 
                    this.decorators.prepend([ "var decorators = container.decorators, ", this.lookupPropertyFunctionVarDeclaration(), ";\n" ]), 
                    this.decorators.push("return fn;"), n ? this.decorators = Function.apply(this, [ "fn", "props", "container", "depth0", "data", "blockParams", "depths", this.decorators.merge() ]) : (this.decorators.prepend("function(fn, props, container, depth0, data, blockParams, depths) {\n"), 
                    this.decorators.push("}\n"), this.decorators = this.decorators.merge()));
                    var p = this.createFunctionContext(n);
                    if (this.isChild) return p;
                    var u = {
                        compiler: this.compilerInfo(),
                        main: p
                    };
                    this.decorators && (u.main_d = this.decorators, u.useDecorators = !0);
                    var h = this.context, f = h.programs, d = h.decorators;
                    for (c = 0, l = f.length; c < l; c++) f[c] && (u[c] = f[c], d[c] && (u[c + "_d"] = d[c], 
                    u.useDecorators = !0));
                    return this.environment.usePartial && (u.usePartial = !0), this.options.data && (u.useData = !0), 
                    this.useDepths && (u.useDepths = !0), this.useBlockParams && (u.useBlockParams = !0), 
                    this.options.compat && (u.compat = !0), n ? u.compilerOptions = this.options : (u.compiler = JSON.stringify(u.compiler), 
                    this.source.currentLocation = {
                        start: {
                            line: 1,
                            column: 0
                        }
                    }, u = this.objectLiteral(u), e.srcName ? (u = u.toStringWithSourceMap({
                        file: e.destName
                    })).map = u.map && u.map.toString() : u = u.toString()), u;
                },
                preamble: function() {
                    this.lastContext = 0, this.source = new c.default(this.options.srcName), this.decorators = new c.default(this.options.srcName);
                },
                createFunctionContext: function(t) {
                    var e = this, r = "", i = this.stackVars.concat(this.registers.list);
                    i.length > 0 && (r += ", " + i.join(", "));
                    var s = 0;
                    n(this.aliases).forEach((function(t) {
                        var n = e.aliases[t];
                        n.children && n.referenceCount > 1 && (r += ", alias" + ++s + "=" + t, n.children[0] = "alias" + s);
                    })), this.lookupPropertyFunctionIsUsed && (r += ", " + this.lookupPropertyFunctionVarDeclaration());
                    var o = [ "container", "depth0", "helpers", "partials", "data" ];
                    (this.useBlockParams || this.useDepths) && o.push("blockParams"), this.useDepths && o.push("depths");
                    var a = this.mergeSource(r);
                    return t ? (o.push(a), Function.apply(this, o)) : this.source.wrap([ "function(", o.join(","), ") {\n  ", a, "}" ]);
                },
                mergeSource: function(t) {
                    var e = this.environment.isSimple, r = !this.forceBuffer, n = void 0, i = void 0, s = void 0, o = void 0;
                    return this.source.each((function(t) {
                        t.appendToBuffer ? (s ? t.prepend("  + ") : s = t, o = t) : (s && (i ? s.prepend("buffer += ") : n = !0, 
                        o.add(";"), s = o = void 0), i = !0, e || (r = !1));
                    })), r ? s ? (s.prepend("return "), o.add(";")) : i || this.source.push('return "";') : (t += ", buffer = " + (n ? "" : this.initializeBuffer()), 
                    s ? (s.prepend("return buffer + "), o.add(";")) : this.source.push("return buffer;")), 
                    t && this.source.prepend("var " + t.substring(2) + (n ? "" : ";\n")), this.source.merge();
                },
                lookupPropertyFunctionVarDeclaration: function() {
                    return "\n      lookupProperty = container.lookupProperty || function(parent, propertyName) {\n        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {\n          return parent[propertyName];\n        }\n        return undefined\n    }\n    ".trim();
                },
                blockValue: function(t) {
                    var e = this.aliasable("container.hooks.blockHelperMissing"), r = [ this.contextName(0) ];
                    this.setupHelperArgs(t, 0, r);
                    var n = this.popStack();
                    r.splice(1, 0, n), this.push(this.source.functionCall(e, "call", r));
                },
                ambiguousBlockValue: function() {
                    var t = this.aliasable("container.hooks.blockHelperMissing"), e = [ this.contextName(0) ];
                    this.setupHelperArgs("", 0, e, !0), this.flushInline();
                    var r = this.topStack();
                    e.splice(1, 0, r), this.pushSource([ "if (!", this.lastHelper, ") { ", r, " = ", this.source.functionCall(t, "call", e), "}" ]);
                },
                appendContent: function(t) {
                    this.pendingContent ? t = this.pendingContent + t : this.pendingLocation = this.source.currentLocation, 
                    this.pendingContent = t;
                },
                append: function() {
                    if (this.isInline()) this.replaceStack((function(t) {
                        return [ " != null ? ", t, ' : ""' ];
                    })), this.pushSource(this.appendToBuffer(this.popStack())); else {
                        var t = this.popStack();
                        this.pushSource([ "if (", t, " != null) { ", this.appendToBuffer(t, void 0, !0), " }" ]), 
                        this.environment.isSimple && this.pushSource([ "else { ", this.appendToBuffer("''", void 0, !0), " }" ]);
                    }
                },
                appendEscaped: function() {
                    this.pushSource(this.appendToBuffer([ this.aliasable("container.escapeExpression"), "(", this.popStack(), ")" ]));
                },
                getContext: function(t) {
                    this.lastContext = t;
                },
                pushContext: function() {
                    this.pushStackLiteral(this.contextName(this.lastContext));
                },
                lookupOnContext: function(t, e, r, n) {
                    var i = 0;
                    n || !this.options.compat || this.lastContext ? this.pushContext() : this.push(this.depthedLookup(t[i++])), 
                    this.resolvePath("context", t, i, e, r);
                },
                lookupBlockParam: function(t, e) {
                    this.useBlockParams = !0, this.push([ "blockParams[", t[0], "][", t[1], "]" ]), 
                    this.resolvePath("context", e, 1);
                },
                lookupData: function(t, e, r) {
                    t ? this.pushStackLiteral("container.data(data, " + t + ")") : this.pushStackLiteral("data"), 
                    this.resolvePath("data", e, 0, !0, r);
                },
                resolvePath: function(t, e, r, n, i) {
                    var s = this;
                    if (this.options.strict || this.options.assumeObjects) this.push(function(t, e, r, n) {
                        var i = e.popStack(), s = 0, o = r.length;
                        for (t && o--; s < o; s++) i = e.nameLookup(i, r[s], n);
                        return t ? [ e.aliasable("container.strict"), "(", i, ", ", e.quotedString(r[s]), ", ", JSON.stringify(e.source.currentLocation), " )" ] : i;
                    }(this.options.strict && i, this, e, t)); else for (var o = e.length; r < o; r++) this.replaceStack((function(i) {
                        var o = s.nameLookup(i, e[r], t);
                        return n ? [ " && ", o ] : [ " != null ? ", o, " : ", i ];
                    }));
                },
                resolvePossibleLambda: function() {
                    this.push([ this.aliasable("container.lambda"), "(", this.popStack(), ", ", this.contextName(0), ")" ]);
                },
                pushStringParam: function(t, e) {
                    this.pushContext(), this.pushString(e), "SubExpression" !== e && ("string" == typeof t ? this.pushString(t) : this.pushStackLiteral(t));
                },
                emptyHash: function(t) {
                    this.trackIds && this.push("{}"), this.stringParams && (this.push("{}"), this.push("{}")), 
                    this.pushStackLiteral(t ? "undefined" : "{}");
                },
                pushHash: function() {
                    this.hash && this.hashes.push(this.hash), this.hash = {
                        values: {},
                        types: [],
                        contexts: [],
                        ids: []
                    };
                },
                popHash: function() {
                    var t = this.hash;
                    this.hash = this.hashes.pop(), this.trackIds && this.push(this.objectLiteral(t.ids)), 
                    this.stringParams && (this.push(this.objectLiteral(t.contexts)), this.push(this.objectLiteral(t.types))), 
                    this.push(this.objectLiteral(t.values));
                },
                pushString: function(t) {
                    this.pushStackLiteral(this.quotedString(t));
                },
                pushLiteral: function(t) {
                    this.pushStackLiteral(t);
                },
                pushProgram: function(t) {
                    null != t ? this.pushStackLiteral(this.programExpression(t)) : this.pushStackLiteral(null);
                },
                registerDecorator: function(t, e) {
                    var r = this.nameLookup("decorators", e, "decorator"), n = this.setupHelperArgs(e, t);
                    this.decorators.push([ "fn = ", this.decorators.functionCall(r, "", [ "fn", "props", "container", n ]), " || fn;" ]);
                },
                invokeHelper: function(t, e, r) {
                    var n = this.popStack(), i = this.setupHelper(t, e), s = [];
                    r && s.push(i.name), s.push(n), this.options.strict || s.push(this.aliasable("container.hooks.helperMissing"));
                    var o = [ "(", this.itemsSeparatedBy(s, "||"), ")" ], a = this.source.functionCall(o, "call", i.callParams);
                    this.push(a);
                },
                itemsSeparatedBy: function(t, e) {
                    var r = [];
                    r.push(t[0]);
                    for (var n = 1; n < t.length; n++) r.push(e, t[n]);
                    return r;
                },
                invokeKnownHelper: function(t, e) {
                    var r = this.setupHelper(t, e);
                    this.push(this.source.functionCall(r.name, "call", r.callParams));
                },
                invokeAmbiguous: function(t, e) {
                    this.useRegister("helper");
                    var r = this.popStack();
                    this.emptyHash();
                    var n = this.setupHelper(0, t, e), i = [ "(", "(helper = ", this.lastHelper = this.nameLookup("helpers", t, "helper"), " || ", r, ")" ];
                    this.options.strict || (i[0] = "(helper = ", i.push(" != null ? helper : ", this.aliasable("container.hooks.helperMissing"))), 
                    this.push([ "(", i, n.paramsInit ? [ "),(", n.paramsInit ] : [], "),", "(typeof helper === ", this.aliasable('"function"'), " ? ", this.source.functionCall("helper", "call", n.callParams), " : helper))" ]);
                },
                invokePartial: function(t, e, r) {
                    var n = [], i = this.setupParams(e, 1, n);
                    t && (e = this.popStack(), delete i.name), r && (i.indent = JSON.stringify(r)), 
                    i.helpers = "helpers", i.partials = "partials", i.decorators = "container.decorators", 
                    t ? n.unshift(e) : n.unshift(this.nameLookup("partials", e, "partial")), this.options.compat && (i.depths = "depths"), 
                    i = this.objectLiteral(i), n.push(i), this.push(this.source.functionCall("container.invokePartial", "", n));
                },
                assignToHash: function(t) {
                    var e = this.popStack(), r = void 0, n = void 0, i = void 0;
                    this.trackIds && (i = this.popStack()), this.stringParams && (n = this.popStack(), 
                    r = this.popStack());
                    var s = this.hash;
                    r && (s.contexts[t] = r), n && (s.types[t] = n), i && (s.ids[t] = i), s.values[t] = e;
                },
                pushId: function(t, e, r) {
                    "BlockParam" === t ? this.pushStackLiteral("blockParams[" + e[0] + "].path[" + e[1] + "]" + (r ? " + " + JSON.stringify("." + r) : "")) : "PathExpression" === t ? this.pushString(e) : "SubExpression" === t ? this.pushStackLiteral("true") : this.pushStackLiteral("null");
                },
                compiler: p,
                compileChildren: function(t, e) {
                    for (var r = t.children, n = void 0, i = void 0, s = 0, o = r.length; s < o; s++) {
                        n = r[s], i = new this.compiler;
                        var a = this.matchExistingProgram(n);
                        if (null == a) {
                            this.context.programs.push("");
                            var c = this.context.programs.length;
                            n.index = c, n.name = "program" + c, this.context.programs[c] = i.compile(n, e, this.context, !this.precompile), 
                            this.context.decorators[c] = i.decorators, this.context.environments[c] = n, this.useDepths = this.useDepths || i.useDepths, 
                            this.useBlockParams = this.useBlockParams || i.useBlockParams, n.useDepths = this.useDepths, 
                            n.useBlockParams = this.useBlockParams;
                        } else n.index = a.index, n.name = "program" + a.index, this.useDepths = this.useDepths || a.useDepths, 
                        this.useBlockParams = this.useBlockParams || a.useBlockParams;
                    }
                },
                matchExistingProgram: function(t) {
                    for (var e = 0, r = this.context.environments.length; e < r; e++) {
                        var n = this.context.environments[e];
                        if (n && n.equals(t)) return n;
                    }
                },
                programExpression: function(t) {
                    var e = this.environment.children[t], r = [ e.index, "data", e.blockParams ];
                    return (this.useBlockParams || this.useDepths) && r.push("blockParams"), this.useDepths && r.push("depths"), 
                    "container.program(" + r.join(", ") + ")";
                },
                useRegister: function(t) {
                    this.registers[t] || (this.registers[t] = !0, this.registers.list.push(t));
                },
                push: function(t) {
                    return t instanceof l || (t = this.source.wrap(t)), this.inlineStack.push(t), t;
                },
                pushStackLiteral: function(t) {
                    this.push(new l(t));
                },
                pushSource: function(t) {
                    this.pendingContent && (this.source.push(this.appendToBuffer(this.source.quotedString(this.pendingContent), this.pendingLocation)), 
                    this.pendingContent = void 0), t && this.source.push(t);
                },
                replaceStack: function(t) {
                    var e = [ "(" ], r = void 0, n = void 0, i = void 0;
                    if (!this.isInline()) throw new o.default("replaceStack on non-inline");
                    var s = this.popStack(!0);
                    if (s instanceof l) e = [ "(", r = [ s.value ] ], i = !0; else {
                        n = !0;
                        var a = this.incrStack();
                        e = [ "((", this.push(a), " = ", s, ")" ], r = this.topStack();
                    }
                    var c = t.call(this, r);
                    i || this.popStack(), n && this.stackSlot--, this.push(e.concat(c, ")"));
                },
                incrStack: function() {
                    return this.stackSlot++, this.stackSlot > this.stackVars.length && this.stackVars.push("stack" + this.stackSlot), 
                    this.topStackName();
                },
                topStackName: function() {
                    return "stack" + this.stackSlot;
                },
                flushInline: function() {
                    var t = this.inlineStack;
                    this.inlineStack = [];
                    for (var e = 0, r = t.length; e < r; e++) {
                        var n = t[e];
                        if (n instanceof l) this.compileStack.push(n); else {
                            var i = this.incrStack();
                            this.pushSource([ i, " = ", n, ";" ]), this.compileStack.push(i);
                        }
                    }
                },
                isInline: function() {
                    return this.inlineStack.length;
                },
                popStack: function(t) {
                    var e = this.isInline(), r = (e ? this.inlineStack : this.compileStack).pop();
                    if (!t && r instanceof l) return r.value;
                    if (!e) {
                        if (!this.stackSlot) throw new o.default("Invalid stack pop");
                        this.stackSlot--;
                    }
                    return r;
                },
                topStack: function() {
                    var t = this.isInline() ? this.inlineStack : this.compileStack, e = t[t.length - 1];
                    return e instanceof l ? e.value : e;
                },
                contextName: function(t) {
                    return this.useDepths && t ? "depths[" + t + "]" : "depth" + t;
                },
                quotedString: function(t) {
                    return this.source.quotedString(t);
                },
                objectLiteral: function(t) {
                    return this.source.objectLiteral(t);
                },
                aliasable: function(t) {
                    var e = this.aliases[t];
                    return e ? (e.referenceCount++, e) : ((e = this.aliases[t] = this.source.wrap(t)).aliasable = !0, 
                    e.referenceCount = 1, e);
                },
                setupHelper: function(t, e, r) {
                    var n = [];
                    return {
                        params: n,
                        paramsInit: this.setupHelperArgs(e, t, n, r),
                        name: this.nameLookup("helpers", e, "helper"),
                        callParams: [ this.aliasable(this.contextName(0) + " != null ? " + this.contextName(0) + " : (container.nullContext || {})") ].concat(n)
                    };
                },
                setupParams: function(t, e, r) {
                    var n = {}, i = [], s = [], o = [], a = !r, c = void 0;
                    a && (r = []), n.name = this.quotedString(t), n.hash = this.popStack(), this.trackIds && (n.hashIds = this.popStack()), 
                    this.stringParams && (n.hashTypes = this.popStack(), n.hashContexts = this.popStack());
                    var l = this.popStack(), p = this.popStack();
                    (p || l) && (n.fn = p || "container.noop", n.inverse = l || "container.noop");
                    for (var u = e; u--; ) c = this.popStack(), r[u] = c, this.trackIds && (o[u] = this.popStack()), 
                    this.stringParams && (s[u] = this.popStack(), i[u] = this.popStack());
                    return a && (n.args = this.source.generateArray(r)), this.trackIds && (n.ids = this.source.generateArray(o)), 
                    this.stringParams && (n.types = this.source.generateArray(s), n.contexts = this.source.generateArray(i)), 
                    this.options.data && (n.data = "data"), this.useBlockParams && (n.blockParams = "blockParams"), 
                    n;
                },
                setupHelperArgs: function(t, e, r, n) {
                    var i = this.setupParams(t, e, r);
                    return i.loc = JSON.stringify(this.source.currentLocation), i = this.objectLiteral(i), 
                    n ? (this.useRegister("options"), r.push("options"), [ "options=", i ]) : r ? (r.push(i), 
                    "") : i;
                }
            }, function() {
                for (var t = "break else new var case finally return void catch for switch while continue function this with default if throw delete in try do instanceof typeof abstract enum int short boolean export interface static byte extends long super char final native synchronized class float package throws const goto private transient debugger implements protected volatile double import public let yield await null true false".split(" "), e = p.RESERVED_WORDS = {}, r = 0, n = t.length; r < n; r++) e[t[r]] = !0;
            }(), p.isValidJavaScriptVariableName = function(t) {
                return !p.RESERVED_WORDS[t] && /^[a-zA-Z_$][0-9a-zA-Z_$]*$/.test(t);
            }, e.default = p, t.exports = e.default;
        }, function(t, e, r) {
            var n = r(13).default;
            e.__esModule = !0;
            var i = r(5), s = void 0;
            function o(t, e, r) {
                if (i.isArray(t)) {
                    for (var n = [], s = 0, o = t.length; s < o; s++) n.push(e.wrap(t[s], r));
                    return n;
                }
                return "boolean" == typeof t || "number" == typeof t ? t + "" : t;
            }
            function a(t) {
                this.srcFile = t, this.source = [];
            }
            s || ((s = function(t, e, r, n) {
                this.src = "", n && this.add(n);
            }).prototype = {
                add: function(t) {
                    i.isArray(t) && (t = t.join("")), this.src += t;
                },
                prepend: function(t) {
                    i.isArray(t) && (t = t.join("")), this.src = t + this.src;
                },
                toStringWithSourceMap: function() {
                    return {
                        code: this.toString()
                    };
                },
                toString: function() {
                    return this.src;
                }
            }), a.prototype = {
                isEmpty: function() {
                    return !this.source.length;
                },
                prepend: function(t, e) {
                    this.source.unshift(this.wrap(t, e));
                },
                push: function(t, e) {
                    this.source.push(this.wrap(t, e));
                },
                merge: function() {
                    var t = this.empty();
                    return this.each((function(e) {
                        t.add([ "  ", e, "\n" ]);
                    })), t;
                },
                each: function(t) {
                    for (var e = 0, r = this.source.length; e < r; e++) t(this.source[e]);
                },
                empty: function() {
                    var t = this.currentLocation || {
                        start: {}
                    };
                    return new s(t.start.line, t.start.column, this.srcFile);
                },
                wrap: function(t) {
                    var e = arguments.length <= 1 || void 0 === arguments[1] ? this.currentLocation || {
                        start: {}
                    } : arguments[1];
                    return t instanceof s ? t : (t = o(t, this, e), new s(e.start.line, e.start.column, this.srcFile, t));
                },
                functionCall: function(t, e, r) {
                    return r = this.generateList(r), this.wrap([ t, e ? "." + e + "(" : "(", r, ")" ]);
                },
                quotedString: function(t) {
                    return '"' + (t + "").replace(/\\/g, "\\\\").replace(/"/g, '\\"').replace(/\n/g, "\\n").replace(/\r/g, "\\r").replace(/\u2028/g, "\\u2028").replace(/\u2029/g, "\\u2029") + '"';
                },
                objectLiteral: function(t) {
                    var e = this, r = [];
                    n(t).forEach((function(n) {
                        var i = o(t[n], e);
                        "undefined" !== i && r.push([ e.quotedString(n), ":", i ]);
                    }));
                    var i = this.generateList(r);
                    return i.prepend("{"), i.add("}"), i;
                },
                generateList: function(t) {
                    for (var e = this.empty(), r = 0, n = t.length; r < n; r++) r && e.add(","), e.add(o(t[r], this));
                    return e;
                },
                generateArray: function(t) {
                    var e = this.generateList(t);
                    return e.prepend("["), e.add("]"), e;
                }
            }, e.default = a, t.exports = e.default;
        } ]);
    }, t.exports = r();
}, t(e = {
    exports: {}
}, e.exports), e.exports), i = (r = n) && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;

const s = i.compile;

i.compile = t => {
    if ("string" == typeof t) return s(t);
    const {path: e, text: r} = t || {};
    return e ? "undefined" == typeof fetch ? "" : (async () => {
        const t = await fetch(e).then((t => t.text()));
        return s((t || "").replace(/^\t{1,}/gm, ""));
    })() : s(r || "");
};

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

const templates = {};

function ContextPane({forms: forms = {}} = {}) {
    if (contextPane) {
        return contextPane;
    }
    (async () => {
        for (const [name, path] of Object.entries(forms)) {
            const template = await i.compile({
                path: path
            });
            templates[name] = template;
        }
    })();
    contextPane = document.createElement("div");
    contextPane.classList.add("ContextOverlay");
    contextPane.innerHTML = `\n<style>\nul { list-style: none; padding: 0; margin: 0; }\n\n:root {\n\t/* --main-theme-color: #47414a; */\n\t--main-theme-color: #1e1e1e;\n\n\t/* --main-theme-highlight-color: #40f7ac; */\n\t/* --main-theme-highlight-color: #026292; */\n\t/* --main-theme-highlight-color: #2b5046; */\n\t/* --main-theme-highlight-color: 20, 160, 210; */\n\t--main-theme-highlight-color: 60, 180, 190;\n\n\t/* --main-theme-highlight-color: 20, 201, 210; */\n\t/* --main-theme-highlight-color: 64, 210, 20; */\n\t--main-theme-highlight-color-FOR-PICKER: rgb(60, 180, 190);\n\t/* --main-theme-background-color: #363238; */\n\t/* --main-theme-background-color: #3b3b3b; */\n\t--main-theme-background-color: #363636; /* #2d2d2d */\n\t--main-theme-background-dark-color: #29252b;\n\t--main-theme-text-color-dark: green;\n\t/* --main-theme-text-color: #d8d8d8; */\n\t--main-theme-text-color: #c2c2c2;\n\t/* --main-theme-text-invert-color: #d0c0d8; */\n\t--main-theme-text-invert-color: #818181;\n\t/* --theme-subdued-color: #483f48; */\n\t--theme-subdued-color: #262626;\n\t--theme-text-color: black;\n\t--theme-text-selected: #82e3ae;\n\t--tree-selected: #094771;\n\t--tree-hover: #333;\n\t--code-line-selected: orange;\n}\n\n.ContextOverlay {\n\t--horiz-pad: 20px;\n\t--vert-pad: 10px;\n\t--sep-height: 10px;\n}\n.ContextOverlay {\n\tposition: absolute;\n\tleft: 0; top: 0;\n\tz-index: 999;\n\tvisibility: hidden;\n\tpointer-events: none;\n\tbackground-color: transparent;\n\ttransition: background-color 0.5s ease;\n}\n.ContextContainer {\n\tposition: relative;\n\twidth: 100vw;\n\theight: 100vh;\n}\n.ContextMenu {\n\tposition: absolute;\n\tbackground: transparent;\n\tvisibility: hidden;\n}\n.ContextMenu .menu-container {\n\tposition: relative;\n}\n.ContextMenu .menu-container:after {\n\tcontent: '';\n\tposition: absolute;\n\tbackground: var(--main-theme-background-color);\n\tborder: 1px solid #777;\n\tbox-shadow: 3px 2px 5px black;\n\tborder-radius: 3px;\n\topacity: 0.9;\n\twidth: 100%;\n\theight: 100%;\n\tbackdrop-filter: blur(5px);\n\tz-index: -1;\n\ttop: 0;\n}\n.ContextMenu.open {\n\tvisibility: visible;\n\tpointer-events: all;\n}\n.ContextMenu ul.list {\n\tmargin: 0; padding: var(--vert-pad) 0;\n\tmin-width: 185px;\n\tuser-select: none;\n}\n.ContextMenu .list .item button {\n\tbackground: transparent;\n\tborder: 0;\n\tcolor: white;\n\tpadding: 2px var(--horiz-pad);\n\twidth: 100%;\n\ttext-align: left;\n\tpointer-events: none; /* so clicks are never registered on this element */\n}\n.ContextMenu .list .item:hover {\n\tbackground: rgb(var(--main-theme-highlight-color));\n}\n.ContextMenu .list .item {\n\tline-height: 0;\n}\n.ContextMenu .list .item.disabled {\n\t\tuser-select: none;\n\t\tpointer-events: none;\n\t\topacity: 0.4;\n}\n.ContextMenu .list .context-seperator {\n\tmargin: calc(var(--sep-height) / 2) 0px;\n\tcolor: #4a4a4a;\n\tborder-bottom: 1px solid;\n}\n\n</style>\n\t`;
    contextPane.innerHTML += `\n<div class="ContextContainer">\n\t<div class="ContextMenu">\n\t\t<div class="menu-container">\n\t\t\t<ul class="list">\n\t\t\t</ul>\n\t\t</div>\n\t</div>\n</div>\n\t`;
    const menuItem = item => item === "seperator" ? `<li class="context-seperator"></li>` : `\n\t\t<li class="item${item.disabled ? " disabled" : ""}" data-text="${item.name}" data-modal="${item.modal || ""}">\n\t\t\t<button name="${item.name}" class="">\n\t\t\t\t<div class="linkContent">\n\t\t\t\t\t<span class="itemText">${item.name}</span>\n\t\t\t\t</div>\n\t\t\t</button>\n\t\t</li>\n\t`;
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
    function getFormData(form) {
        const data = new FormData(form);
        let obj = {};
        for (let [key, value] of data) {
            if (obj[key] !== undefined) {
                if (!Array.isArray(obj[key])) {
                    obj[key] = [ obj[key] ];
                }
                obj[key].push(value);
            } else {
                obj[key] = value;
            }
        }
        return obj;
    }
    function showModal({modal: modal, data: data, template: template}) {
        const templateHtml = template(data);
        contextPane.show();
        contextPane.classList.add("modal");
        const listDiv = contextPane.querySelector(".list");
        listDiv.innerHTML = "";
        const Menu = contextPane.querySelector(".ContextMenu");
        Menu.classList.add("open");
        Menu.style.top = undefined;
        Menu.style.bottom = undefined;
        Menu.style.left = undefined;
        const container = contextPane.querySelector(".menu-container");
        const div = document.createElement("div");
        div.innerHTML = templateHtml;
        const form = div.querySelector("form");
        form.onsubmit = (event, submitter) => {
            contextPane.classList.remove("modal");
            div.remove();
            hideMenu();
            event.preventDefault();
            const isCancel = event.submitter.value.toLowerCase() === "cancel";
            if (isCancel) return;
            const data = getFormData(event.target);
            console.log(data);
            return false;
        };
        container.appendChild(div);
    }
    function showMenu({x: x = 0, y: y = 0, parent: parent = "unknown", data: data, list: list, modal: modal} = {}) {
        // warn if menu will appear offscreen?
        // handle case where menu is opened near edge of screen
        // menu should know what items to show
        // menu items should know what event to trigger
        if (modal && templates[modal]) {
            return showModal({
                modal: modal,
                data: data,
                template: templates[modal]
            });
        }
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
                    modal: event.target.dataset.modal,
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
