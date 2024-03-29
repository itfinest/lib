function getLocation() {
    navigator.geolocation ? (navigator.geolocation.getCurrentPosition(showPosition), navigator.geolocation.watchPosition(showPosition)) : x.innerHTML = "Geolocation is not supported by this browser."
}

function showPosition(e) {
    localStorage.setItem("lat", parseFloat(e.coords.latitude)), localStorage.setItem("long", parseFloat(e.coords.longitude))
}! function (e, t) {
    "object" == typeof exports && "object" == typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? exports.io = t() : e.io = t()
}(this, function () {
    return function (e) {
        function t(r) {
            if (n[r]) return n[r].exports;
            var o = n[r] = {
                exports: {},
                id: r,
                loaded: !1
            };
            return e[r].call(o.exports, o, o.exports, t), o.loaded = !0, o.exports
        }
        var n = {};
        return t.m = e, t.c = n, t.p = "", t(0)
    }([function (e, t, n) {
        function r(e, t) {
            "object" == typeof e && (t = e, e = void 0), t = t || {};
            var n, r = o(e),
                i = r.source,
                p = r.id,
                u = r.path,
                l = c[p] && u in c[p].nsps,
                h = t.forceNew || t["force new connection"] || !1 === t.multiplex || l;
            return h ? (a("ignoring socket cache for %s", i), n = s(i, t)) : (c[p] || (a("new io instance for %s", i), c[p] = s(i, t)), n = c[p]), r.query && !t.query && (t.query = r.query), n.socket(r.path, t)
        }
        var o = n(1),
            i = n(7),
            s = n(15),
            a = n(3)("socket.io-client");
        e.exports = t = r;
        var c = t.managers = {};
        t.protocol = i.protocol, t.connect = r, t.Manager = n(15), t.Socket = n(39)
    }, function (e, t, n) {
        function r(e, t) {
            var n = e;
            t = t || "undefined" != typeof location && location, null == e && (e = t.protocol + "//" + t.host), "string" == typeof e && ("/" === e.charAt(0) && (e = "/" === e.charAt(1) ? t.protocol + e : t.host + e), /^(https?|wss?):\/\//.test(e) || (i("protocol-less url %s", e), e = void 0 !== t ? t.protocol + "//" + e : "https://" + e), i("parse %s", e), n = o(e)), n.port || (/^(http|ws)$/.test(n.protocol) ? n.port = "80" : /^(http|ws)s$/.test(n.protocol) && (n.port = "443")), n.path = n.path || "/";
            var r = -1 !== n.host.indexOf(":"),
                s = r ? "[" + n.host + "]" : n.host;
            return n.id = n.protocol + "://" + s + ":" + n.port, n.href = n.protocol + "://" + s + (t && t.port === n.port ? "" : ":" + n.port), n
        }
        var o = n(2),
            i = n(3)("socket.io-client:url");
        e.exports = r
    }, function (e, t) {
        var n = /^(?:(?![^:@]+:[^:@\/]*@)(http|https|ws|wss):\/\/)?((?:(([^:@]*)(?::([^:@]*))?)?@)?((?:[a-f0-9]{0,4}:){2,7}[a-f0-9]{0,4}|[^:\/?#]*)(?::(\d*))?)(((\/(?:[^?#](?![^?#\/]*\.[^?#\/.]+(?:[?#]|$)))*\/?)?([^?#\/]*))(?:\?([^#]*))?(?:#(.*))?)/,
            r = ["source", "protocol", "authority", "userInfo", "user", "password", "host", "port", "relative", "path", "directory", "file", "query", "anchor"];
        e.exports = function (e) {
            var t = e,
                o = e.indexOf("["),
                i = e.indexOf("]"); - 1 != o && -1 != i && (e = e.substring(0, o) + e.substring(o, i).replace(/:/g, ";") + e.substring(i, e.length));
            for (var s = n.exec(e || ""), a = {}, c = 14; c--;) a[r[c]] = s[c] || "";
            return -1 != o && -1 != i && (a.source = t, a.host = a.host.substring(1, a.host.length - 1).replace(/;/g, ":"), a.authority = a.authority.replace("[", "").replace("]", "").replace(/;/g, ":"), a.ipv6uri = !0), a
        }
    }, function (e, t, n) {
        (function (r) {
            "use strict";

            function o() {
                return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type && !window.process.__nwjs) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
            }

            function i(t) {
                if (t[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + t[0] + (this.useColors ? "%c " : " ") + "+" + e.exports.humanize(this.diff), this.useColors) {
                    var n = "color: " + this.color;
                    t.splice(1, 0, n, "color: inherit");
                    var r = 0,
                        o = 0;
                    t[0].replace(/%[a-zA-Z%]/g, function (e) {
                        "%%" !== e && (r++, "%c" === e && (o = r))
                    }), t.splice(o, 0, n)
                }
            }

            function s() {
                var e;
                return "object" === ("undefined" == typeof console ? "undefined" : u(console)) && console.log && (e = console).log.apply(e, arguments)
            }

            function a(e) {
                try {
                    e ? t.storage.setItem("debug", e) : t.storage.removeItem("debug")
                } catch (e) {}
            }

            function c() {
                var e = void 0;
                try {
                    e = t.storage.getItem("debug")
                } catch (e) {}
                return !e && void 0 !== r && "env" in r && (e = r.env.DEBUG), e
            }

            function p() {
                try {
                    return localStorage
                } catch (e) {}
            }
            var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
            t.log = s, t.formatArgs = i, t.save = a, t.load = c, t.useColors = o, t.storage = p(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], e.exports = n(5)(t);
            var l = e.exports.formatters;
            l.j = function (e) {
                try {
                    return JSON.stringify(e)
                } catch (e) {
                    return "[UnexpectedJSONParseError]: " + e.message
                }
            }
        }).call(t, n(4))
    }, function (e, t) {
        function n() {
            throw new Error("setTimeout has not been defined")
        }

        function r() {
            throw new Error("clearTimeout has not been defined")
        }

        function o(e) {
            if (u === setTimeout) return setTimeout(e, 0);
            if ((u === n || !u) && setTimeout) return u = setTimeout, setTimeout(e, 0);
            try {
                return u(e, 0)
            } catch (t) {
                try {
                    return u.call(null, e, 0)
                } catch (t) {
                    return u.call(this, e, 0)
                }
            }
        }

        function i(e) {
            if (l === clearTimeout) return clearTimeout(e);
            if ((l === r || !l) && clearTimeout) return l = clearTimeout, clearTimeout(e);
            try {
                return l(e)
            } catch (t) {
                try {
                    return l.call(null, e)
                } catch (t) {
                    return l.call(this, e)
                }
            }
        }

        function s() {
            y && f && (y = !1, f.length ? d = f.concat(d) : m = -1, d.length && a())
        }

        function a() {
            if (!y) {
                var e = o(s);
                y = !0;
                for (var t = d.length; t;) {
                    for (f = d, d = []; ++m < t;) f && f[m].run();
                    m = -1, t = d.length
                }
                f = null, y = !1, i(e)
            }
        }

        function c(e, t) {
            this.fun = e, this.array = t
        }

        function p() {}
        var u, l, h = e.exports = {};
        ! function () {
            try {
                u = "function" == typeof setTimeout ? setTimeout : n
            } catch (e) {
                u = n
            }
            try {
                l = "function" == typeof clearTimeout ? clearTimeout : r
            } catch (e) {
                l = r
            }
        }();
        var f, d = [],
            y = !1,
            m = -1;
        h.nextTick = function (e) {
            var t = new Array(arguments.length - 1);
            if (arguments.length > 1)
                for (var n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
            d.push(new c(e, t)), 1 !== d.length || y || o(a)
        }, c.prototype.run = function () {
            this.fun.apply(null, this.array)
        }, h.title = "browser", h.browser = !0, h.env = {}, h.argv = [], h.version = "", h.versions = {}, h.on = p, h.addListener = p, h.once = p, h.off = p, h.removeListener = p, h.removeAllListeners = p, h.emit = p, h.prependListener = p, h.prependOnceListener = p, h.listeners = function (e) {
            return []
        }, h.binding = function (e) {
            throw new Error("process.binding is not supported")
        }, h.cwd = function () {
            return "/"
        }, h.chdir = function (e) {
            throw new Error("process.chdir is not supported")
        }, h.umask = function () {
            return 0
        }
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            if (Array.isArray(e)) {
                for (var t = 0, n = Array(e.length); t < e.length; t++) n[t] = e[t];
                return n
            }
            return Array.from(e)
        }

        function o(e) {
            function t(e) {
                for (var t = 0, n = 0; n < e.length; n++) t = (t << 5) - t + e.charCodeAt(n), t |= 0;
                return o.colors[Math.abs(t) % o.colors.length]
            }

            function o(e) {
                function n() {
                    for (var e = arguments.length, t = Array(e), i = 0; i < e; i++) t[i] = arguments[i];
                    if (n.enabled) {
                        var s = n,
                            a = Number(new Date),
                            c = a - (r || a);
                        s.diff = c, s.prev = r, s.curr = a, r = a, t[0] = o.coerce(t[0]), "string" != typeof t[0] && t.unshift("%O");
                        var p = 0;
                        t[0] = t[0].replace(/%([a-zA-Z%])/g, function (e, n) {
                            if ("%%" === e) return e;
                            p++;
                            var r = o.formatters[n];
                            if ("function" == typeof r) {
                                var i = t[p];
                                e = r.call(s, i), t.splice(p, 1), p--
                            }
                            return e
                        }), o.formatArgs.call(s, t);
                        var u = s.log || o.log;
                        u.apply(s, t)
                    }
                }
                var r = void 0;
                return n.namespace = e, n.enabled = o.enabled(e), n.useColors = o.useColors(), n.color = t(e), n.destroy = i, n.extend = s, "function" == typeof o.init && o.init(n), o.instances.push(n), n
            }

            function i() {
                var e = o.instances.indexOf(this);
                return -1 !== e && (o.instances.splice(e, 1), !0)
            }

            function s(e, t) {
                var n = o(this.namespace + (void 0 === t ? ":" : t) + e);
                return n.log = this.log, n
            }

            function a(e) {
                o.save(e), o.names = [], o.skips = [];
                var t = void 0,
                    n = ("string" == typeof e ? e : "").split(/[\s,]+/),
                    r = n.length;
                for (t = 0; t < r; t++) n[t] && (e = n[t].replace(/\*/g, ".*?"), "-" === e[0] ? o.skips.push(new RegExp("^" + e.substr(1) + "$")) : o.names.push(new RegExp("^" + e + "$")));
                for (t = 0; t < o.instances.length; t++) {
                    var i = o.instances[t];
                    i.enabled = o.enabled(i.namespace)
                }
            }

            function c() {
                var e = [].concat(r(o.names.map(u)), r(o.skips.map(u).map(function (e) {
                    return "-" + e
                }))).join(",");
                return o.enable(""), e
            }

            function p(e) {
                if ("*" === e[e.length - 1]) return !0;
                var t = void 0,
                    n = void 0;
                for (t = 0, n = o.skips.length; t < n; t++)
                    if (o.skips[t].test(e)) return !1;
                for (t = 0, n = o.names.length; t < n; t++)
                    if (o.names[t].test(e)) return !0;
                return !1
            }

            function u(e) {
                return e.toString().substring(2, e.toString().length - 2).replace(/\.\*\?$/, "*")
            }

            function l(e) {
                return e instanceof Error ? e.stack || e.message : e
            }
            return o.debug = o, o.default = o, o.coerce = l, o.disable = c, o.enable = a, o.enabled = p, o.humanize = n(6), Object.keys(e).forEach(function (t) {
                o[t] = e[t]
            }), o.instances = [], o.names = [], o.skips = [], o.formatters = {}, o.selectColor = t, o.enable(o.load()), o
        }
        e.exports = o
    }, function (e, t) {
        function n(e) {
            if (e = String(e), !(e.length > 100)) {
                var t = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e);
                if (t) {
                    var n = parseFloat(t[1]),
                        r = (t[2] || "ms").toLowerCase();
                    switch (r) {
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return n * l;
                        case "weeks":
                        case "week":
                        case "w":
                            return n * u;
                        case "days":
                        case "day":
                        case "d":
                            return n * p;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return n * c;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return n * a;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return n * s;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return n;
                        default:
                            return
                    }
                }
            }
        }

        function r(e) {
            var t = Math.abs(e);
            return t >= p ? Math.round(e / p) + "d" : t >= c ? Math.round(e / c) + "h" : t >= a ? Math.round(e / a) + "m" : t >= s ? Math.round(e / s) + "s" : e + "ms"
        }

        function o(e) {
            var t = Math.abs(e);
            return t >= p ? i(e, t, p, "day") : t >= c ? i(e, t, c, "hour") : t >= a ? i(e, t, a, "minute") : t >= s ? i(e, t, s, "second") : e + " ms"
        }

        function i(e, t, n, r) {
            var o = t >= 1.5 * n;
            return Math.round(e / n) + " " + r + (o ? "s" : "")
        }
        var s = 1e3,
            a = 60 * s,
            c = 60 * a,
            p = 24 * c,
            u = 7 * p,
            l = 365.25 * p;
        e.exports = function (e, t) {
            t = t || {};
            var i = typeof e;
            if ("string" === i && e.length > 0) return n(e);
            if ("number" === i && isFinite(e)) return t.long ? o(e) : r(e);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
        }
    }, function (e, t, n) {
        function r() {}

        function o(e) {
            var n = "" + e.type;
            if (t.BINARY_EVENT !== e.type && t.BINARY_ACK !== e.type || (n += e.attachments + "-"), e.nsp && "/" !== e.nsp && (n += e.nsp + ","), null != e.id && (n += e.id), null != e.data) {
                var r = i(e.data);
                if (!1 === r) return g;
                n += r
            }
            return h("encoded %j as %s", e, n), n
        }

        function i(e) {
            try {
                return JSON.stringify(e)
            } catch (e) {
                return !1
            }
        }

        function s(e, t) {
            function n(e) {
                var n = d.deconstructPacket(e),
                    r = o(n.packet),
                    i = n.buffers;
                i.unshift(r), t(i)
            }
            d.removeBlobs(e, n)
        }

        function a() {
            this.reconstructor = null
        }

        function c(e) {
            var n = 0,
                r = {
                    type: Number(e.charAt(0))
                };
            if (null == t.types[r.type]) return l("unknown packet type " + r.type);
            if (t.BINARY_EVENT === r.type || t.BINARY_ACK === r.type) {
                for (var o = "";
                    "-" !== e.charAt(++n) && (o += e.charAt(n), n != e.length););
                if (o != Number(o) || "-" !== e.charAt(n)) throw new Error("Illegal attachments");
                r.attachments = Number(o)
            }
            if ("/" === e.charAt(n + 1))
                for (r.nsp = ""; ++n;) {
                    var i = e.charAt(n);
                    if ("," === i) break;
                    if (r.nsp += i, n === e.length) break
                } else r.nsp = "/";
            var s = e.charAt(n + 1);
            if ("" !== s && Number(s) == s) {
                for (r.id = ""; ++n;) {
                    i = e.charAt(n);
                    if (null == i || Number(i) != i) {
                        --n;
                        break
                    }
                    if (r.id += e.charAt(n), n === e.length) break
                }
                r.id = Number(r.id)
            }
            if (e.charAt(++n)) {
                var a = p(e.substr(n)),
                    c = !1 !== a && (r.type === t.ERROR || y(a));
                if (!c) return l("invalid payload");
                r.data = a
            }
            return h("decoded %s as %j", e, r), r
        }

        function p(e) {
            try {
                return JSON.parse(e)
            } catch (e) {
                return !1
            }
        }

        function u(e) {
            this.reconPack = e, this.buffers = []
        }

        function l(e) {
            return {
                type: t.ERROR,
                data: "parser error: " + e
            }
        }
        var h = n(8)("socket.io-parser"),
            f = n(11),
            d = n(12),
            y = n(13),
            m = n(14);
        t.protocol = 4, t.types = ["CONNECT", "DISCONNECT", "EVENT", "ACK", "ERROR", "BINARY_EVENT", "BINARY_ACK"], t.CONNECT = 0, t.DISCONNECT = 1, t.EVENT = 2, t.ACK = 3, t.ERROR = 4, t.BINARY_EVENT = 5, t.BINARY_ACK = 6, t.Encoder = r, t.Decoder = a;
        var g = t.ERROR + '"encode error"';
        r.prototype.encode = function (e, n) {
            if (h("encoding packet %j", e), t.BINARY_EVENT === e.type || t.BINARY_ACK === e.type) s(e, n);
            else {
                var r = o(e);
                n([r])
            }
        }, f(a.prototype), a.prototype.add = function (e) {
            var n;
            if ("string" == typeof e) n = c(e), t.BINARY_EVENT === n.type || t.BINARY_ACK === n.type ? (this.reconstructor = new u(n), 0 === this.reconstructor.reconPack.attachments && this.emit("decoded", n)) : this.emit("decoded", n);
            else {
                if (!m(e) && !e.base64) throw new Error("Unknown type: " + e);
                if (!this.reconstructor) throw new Error("got binary data when not reconstructing a packet");
                n = this.reconstructor.takeBinaryData(e), n && (this.reconstructor = null, this.emit("decoded", n))
            }
        }, a.prototype.destroy = function () {
            this.reconstructor && this.reconstructor.finishedReconstruction()
        }, u.prototype.takeBinaryData = function (e) {
            if (this.buffers.push(e), this.buffers.length === this.reconPack.attachments) {
                var t = d.reconstructPacket(this.reconPack, this.buffers);
                return this.finishedReconstruction(), t
            }
            return null
        }, u.prototype.finishedReconstruction = function () {
            this.reconPack = null, this.buffers = []
        }
    }, function (e, t, n) {
        (function (r) {
            "use strict";

            function o() {
                return !("undefined" == typeof window || !window.process || "renderer" !== window.process.type) || ("undefined" == typeof navigator || !navigator.userAgent || !navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) && ("undefined" != typeof document && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || "undefined" != typeof window && window.console && (window.console.firebug || window.console.exception && window.console.table) || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || "undefined" != typeof navigator && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))
            }

            function i(e) {
                var n = this.useColors;
                if (e[0] = (n ? "%c" : "") + this.namespace + (n ? " %c" : " ") + e[0] + (n ? "%c " : " ") + "+" + t.humanize(this.diff), n) {
                    var r = "color: " + this.color;
                    e.splice(1, 0, r, "color: inherit");
                    var o = 0,
                        i = 0;
                    e[0].replace(/%[a-zA-Z%]/g, function (e) {
                        "%%" !== e && (o++, "%c" === e && (i = o))
                    }), e.splice(i, 0, r)
                }
            }

            function s() {
                return "object" === ("undefined" == typeof console ? "undefined" : u(console)) && console.log && Function.prototype.apply.call(console.log, console, arguments)
            }

            function a(e) {
                try {
                    null == e ? t.storage.removeItem("debug") : t.storage.debug = e
                } catch (e) {}
            }

            function c() {
                var e;
                try {
                    e = t.storage.debug
                } catch (e) {}
                return !e && void 0 !== r && "env" in r && (e = r.env.DEBUG), e
            }

            function p() {
                try {
                    return window.localStorage
                } catch (e) {}
            }
            var u = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (e) {
                return typeof e
            } : function (e) {
                return e && "function" == typeof Symbol && e.constructor === Symbol && e !== Symbol.prototype ? "symbol" : typeof e
            };
            t = e.exports = n(9), t.log = s, t.formatArgs = i, t.save = a, t.load = c, t.useColors = o, t.storage = "undefined" != typeof chrome && void 0 !== chrome.storage ? chrome.storage.local : p(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.formatters.j = function (e) {
                try {
                    return JSON.stringify(e)
                } catch (e) {
                    return "[UnexpectedJSONParseError]: " + e.message
                }
            }, t.enable(c())
        }).call(t, n(4))
    }, function (e, t, n) {
        "use strict";

        function r(e) {
            var n, r = 0;
            for (n in e) r = (r << 5) - r + e.charCodeAt(n), r |= 0;
            return t.colors[Math.abs(r) % t.colors.length]
        }

        function o(e) {
            function n() {
                if (n.enabled) {
                    var e = n,
                        r = +new Date,
                        i = r - (o || r);
                    e.diff = i, e.prev = o, e.curr = r, o = r;
                    for (var s = new Array(arguments.length), a = 0; a < s.length; a++) s[a] = arguments[a];
                    s[0] = t.coerce(s[0]), "string" != typeof s[0] && s.unshift("%O");
                    var c = 0;
                    s[0] = s[0].replace(/%([a-zA-Z%])/g, function (n, r) {
                        if ("%%" === n) return n;
                        c++;
                        var o = t.formatters[r];
                        if ("function" == typeof o) {
                            var i = s[c];
                            n = o.call(e, i), s.splice(c, 1), c--
                        }
                        return n
                    }), t.formatArgs.call(e, s);
                    var p = n.log || t.log || console.log.bind(console);
                    p.apply(e, s)
                }
            }
            var o;
            return n.namespace = e, n.enabled = t.enabled(e), n.useColors = t.useColors(), n.color = r(e), n.destroy = i, "function" == typeof t.init && t.init(n), t.instances.push(n), n
        }

        function i() {
            var e = t.instances.indexOf(this);
            return -1 !== e && (t.instances.splice(e, 1), !0)
        }

        function s(e) {
            t.save(e), t.names = [], t.skips = [];
            var n, r = ("string" == typeof e ? e : "").split(/[\s,]+/),
                o = r.length;
            for (n = 0; n < o; n++) r[n] && (e = r[n].replace(/\*/g, ".*?"), "-" === e[0] ? t.skips.push(new RegExp("^" + e.substr(1) + "$")) : t.names.push(new RegExp("^" + e + "$")));
            for (n = 0; n < t.instances.length; n++) {
                var i = t.instances[n];
                i.enabled = t.enabled(i.namespace)
            }
        }

        function a() {
            t.enable("")
        }

        function c(e) {
            if ("*" === e[e.length - 1]) return !0;
            var n, r;
            for (n = 0, r = t.skips.length; n < r; n++)
                if (t.skips[n].test(e)) return !1;
            for (n = 0, r = t.names.length; n < r; n++)
                if (t.names[n].test(e)) return !0;
            return !1
        }

        function p(e) {
            return e instanceof Error ? e.stack || e.message : e
        }
        t = e.exports = o.debug = o.default = o, t.coerce = p, t.disable = a, t.enable = s, t.enabled = c, t.humanize = n(10), t.instances = [], t.names = [], t.skips = [], t.formatters = {}
    }, function (e, t) {
        function n(e) {
            if (e = String(e), !(e.length > 100)) {
                var t = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(e);
                if (t) {
                    var n = parseFloat(t[1]),
                        r = (t[2] || "ms").toLowerCase();
                    switch (r) {
                        case "years":
                        case "year":
                        case "yrs":
                        case "yr":
                        case "y":
                            return n * u;
                        case "days":
                        case "day":
                        case "d":
                            return n * p;
                        case "hours":
                        case "hour":
                        case "hrs":
                        case "hr":
                        case "h":
                            return n * c;
                        case "minutes":
                        case "minute":
                        case "mins":
                        case "min":
                        case "m":
                            return n * a;
                        case "seconds":
                        case "second":
                        case "secs":
                        case "sec":
                        case "s":
                            return n * s;
                        case "milliseconds":
                        case "millisecond":
                        case "msecs":
                        case "msec":
                        case "ms":
                            return n;
                        default:
                            return
                    }
                }
            }
        }

        function r(e) {
            return e >= p ? Math.round(e / p) + "d" : e >= c ? Math.round(e / c) + "h" : e >= a ? Math.round(e / a) + "m" : e >= s ? Math.round(e / s) + "s" : e + "ms"
        }

        function o(e) {
            return i(e, p, "day") || i(e, c, "hour") || i(e, a, "minute") || i(e, s, "second") || e + " ms"
        }

        function i(e, t, n) {
            if (!(e < t)) return e < 1.5 * t ? Math.floor(e / t) + " " + n : Math.ceil(e / t) + " " + n + "s"
        }
        var s = 1e3,
            a = 60 * s,
            c = 60 * a,
            p = 24 * c,
            u = 365.25 * p;
        e.exports = function (e, t) {
            t = t || {};
            var i = typeof e;
            if ("string" === i && e.length > 0) return n(e);
            if ("number" === i && !1 === isNaN(e)) return t.long ? o(e) : r(e);
            throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(e))
        }
    }, function (e, t, n) {
        function r(e) {
            if (e) return o(e)
        }

        function o(e) {
            for (var t in r.prototype) e[t] = r.prototype[t];
            return e
        }
        e.exports = r, r.prototype.on = r.prototype.addEventListener = function (e, t) {
            return this._callbacks = this._callbacks || {}, (this._callbacks["$" + e] = this._callbacks["$" + e] || []).push(t), this
        }, r.prototype.once = function (e, t) {
            function n() {
                this.off(e, n), t.apply(this, arguments)
            }
            return n.fn = t, this.on(e, n), this
        }, r.prototype.off = r.prototype.removeListener = r.prototype.removeAllListeners = r.prototype.removeEventListener = function (e, t) {
            if (this._callbacks = this._callbacks || {}, 0 == arguments.length) return this._callbacks = {}, this;
            var n = this._callbacks["$" + e];
            if (!n) return this;
            if (1 == arguments.length) return delete this._callbacks["$" + e], this;
            for (var r, o = 0; o < n.length; o++)
                if (r = n[o], r === t || r.fn === t) {
                    n.splice(o, 1);
                    break
                } return this
        }, r.prototype.emit = function (e) {
            this._callbacks = this._callbacks || {};
            var t = [].slice.call(arguments, 1),
                n = this._callbacks["$" + e];
            if (n) {
                n = n.slice(0);
                for (var r = 0, o = n.length; r < o; ++r) n[r].apply(this, t)
            }
            return this
        }, r.prototype.listeners = function (e) {
            return this._callbacks = this._callbacks || {}, this._callbacks["$" + e] || []
        }, r.prototype.hasListeners = function (e) {
            return !!this.listeners(e).length
        }
    }, function (e, t, n) {
        function r(e, t) {
            if (!e) return e;
            if (s(e)) {
                var n = {
                    _placeholder: !0,
                    num: t.length
                };
                return t.push(e), n
            }
            if (i(e)) {
                for (var o = new Array(e.length), a = 0; a < e.length; a++) o[a] = r(e[a], t);
                return o
            }
            if ("object" == typeof e && !(e instanceof Date)) {
                o = {};
                for (var c in e) o[c] = r(e[c], t);
                return o
            }
            return e
        }

        function o(e, t) {
            if (!e) return e;
            if (e && e._placeholder) return t[e.num];
            if (i(e))
                for (var n = 0; n < e.length; n++) e[n] = o(e[n], t);
            else if ("object" == typeof e)
                for (var r in e) e[r] = o(e[r], t);
            return e
        }
        var i = n(13),
            s = n(14),
            a = Object.prototype.toString,
            c = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === a.call(Blob),
            p = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === a.call(File);
        t.deconstructPacket = function (e) {
            var t = [],
                n = e.data,
                o = e;
            return o.data = r(n, t), o.attachments = t.length, {
                packet: o,
                buffers: t
            }
        }, t.reconstructPacket = function (e, t) {
            return e.data = o(e.data, t), e.attachments = void 0, e
        }, t.removeBlobs = function (e, t) {
            function n(e, a, u) {
                if (!e) return e;
                if (c && e instanceof Blob || p && e instanceof File) {
                    r++;
                    var l = new FileReader;
                    l.onload = function () {
                        u ? u[a] = this.result : o = this.result, --r || t(o)
                    }, l.readAsArrayBuffer(e)
                } else if (i(e))
                    for (var h = 0; h < e.length; h++) n(e[h], h, e);
                else if ("object" == typeof e && !s(e))
                    for (var f in e) n(e[f], f, e)
            }
            var r = 0,
                o = e;
            n(o), r || t(o)
        }
    }, function (e, t) {
        var n = {}.toString;
        e.exports = Array.isArray || function (e) {
            return "[object Array]" == n.call(e)
        }
    }, function (e, t) {
        function n(e) {
            return r && Buffer.isBuffer(e) || o && (e instanceof ArrayBuffer || i(e))
        }
        e.exports = n;
        var r = "function" == typeof Buffer && "function" == typeof Buffer.isBuffer,
            o = "function" == typeof ArrayBuffer,
            i = function (e) {
                return "function" == typeof ArrayBuffer.isView ? ArrayBuffer.isView(e) : e.buffer instanceof ArrayBuffer
            }
    }, function (e, t, n) {
        function r(e, t) {
            if (!(this instanceof r)) return new r(e, t);
            e && "object" == typeof e && (t = e, e = void 0), t = t || {}, t.path = t.path || "/socket.io", this.nsps = {}, this.subs = [], this.opts = t, this.reconnection(!1 !== t.reconnection), this.reconnectionAttempts(t.reconnectionAttempts || 1 / 0), this.reconnectionDelay(t.reconnectionDelay || 1e3), this.reconnectionDelayMax(t.reconnectionDelayMax || 5e3), this.randomizationFactor(t.randomizationFactor || .5), this.backoff = new h({
                min: this.reconnectionDelay(),
                max: this.reconnectionDelayMax(),
                jitter: this.randomizationFactor()
            }), this.timeout(null == t.timeout ? 2e4 : t.timeout), this.readyState = "closed", this.uri = e, this.connecting = [], this.lastPing = null, this.encoding = !1, this.packetBuffer = [];
            var n = t.parser || a;
            this.encoder = new n.Encoder, this.decoder = new n.Decoder, this.autoConnect = !1 !== t.autoConnect, this.autoConnect && this.open()
        }
        var o = n(16),
            i = n(39),
            s = n(11),
            a = n(7),
            c = n(41),
            p = n(42),
            u = n(3)("socket.io-client:manager"),
            l = n(38),
            h = n(43),
            f = Object.prototype.hasOwnProperty;
        e.exports = r, r.prototype.emitAll = function () {
            for (var e in this.emit.apply(this, arguments), this.nsps) f.call(this.nsps, e) && this.nsps[e].emit.apply(this.nsps[e], arguments)
        }, r.prototype.updateSocketIds = function () {
            for (var e in this.nsps) f.call(this.nsps, e) && (this.nsps[e].id = this.generateId(e))
        }, r.prototype.generateId = function (e) {
            return ("/" === e ? "" : e + "#") + this.engine.id
        }, s(r.prototype), r.prototype.reconnection = function (e) {
            return arguments.length ? (this._reconnection = !!e, this) : this._reconnection
        }, r.prototype.reconnectionAttempts = function (e) {
            return arguments.length ? (this._reconnectionAttempts = e, this) : this._reconnectionAttempts
        }, r.prototype.reconnectionDelay = function (e) {
            return arguments.length ? (this._reconnectionDelay = e, this.backoff && this.backoff.setMin(e), this) : this._reconnectionDelay
        }, r.prototype.randomizationFactor = function (e) {
            return arguments.length ? (this._randomizationFactor = e, this.backoff && this.backoff.setJitter(e), this) : this._randomizationFactor
        }, r.prototype.reconnectionDelayMax = function (e) {
            return arguments.length ? (this._reconnectionDelayMax = e, this.backoff && this.backoff.setMax(e), this) : this._reconnectionDelayMax
        }, r.prototype.timeout = function (e) {
            return arguments.length ? (this._timeout = e, this) : this._timeout
        }, r.prototype.maybeReconnectOnOpen = function () {
            !this.reconnecting && this._reconnection && 0 === this.backoff.attempts && this.reconnect()
        }, r.prototype.open = r.prototype.connect = function (e, t) {
            if (u("readyState %s", this.readyState), ~this.readyState.indexOf("open")) return this;
            u("opening %s", this.uri), this.engine = o(this.uri, this.opts);
            var n = this.engine,
                r = this;
            this.readyState = "opening", this.skipReconnect = !1;
            var i = c(n, "open", function () {
                    r.onopen(), e && e()
                }),
                s = c(n, "error", function (t) {
                    if (u("connect_error"), r.cleanup(), r.readyState = "closed", r.emitAll("connect_error", t), e) {
                        var n = new Error("Connection error");
                        n.data = t, e(n)
                    } else r.maybeReconnectOnOpen()
                });
            if (!1 !== this._timeout) {
                var a = this._timeout;
                u("connect attempt will timeout after %d", a);
                var p = setTimeout(function () {
                    u("connect attempt timed out after %d", a), i.destroy(), n.close(), n.emit("error", "timeout"), r.emitAll("connect_timeout", a)
                }, a);
                this.subs.push({
                    destroy: function () {
                        clearTimeout(p)
                    }
                })
            }
            return this.subs.push(i), this.subs.push(s), this
        }, r.prototype.onopen = function () {
            u("open"), this.cleanup(), this.readyState = "open", this.emit("open");
            var e = this.engine;
            this.subs.push(c(e, "data", p(this, "ondata"))), this.subs.push(c(e, "ping", p(this, "onping"))), this.subs.push(c(e, "pong", p(this, "onpong"))), this.subs.push(c(e, "error", p(this, "onerror"))), this.subs.push(c(e, "close", p(this, "onclose"))), this.subs.push(c(this.decoder, "decoded", p(this, "ondecoded")))
        }, r.prototype.onping = function () {
            this.lastPing = new Date, this.emitAll("ping")
        }, r.prototype.onpong = function () {
            this.emitAll("pong", new Date - this.lastPing)
        }, r.prototype.ondata = function (e) {
            this.decoder.add(e)
        }, r.prototype.ondecoded = function (e) {
            this.emit("packet", e)
        }, r.prototype.onerror = function (e) {
            u("error", e), this.emitAll("error", e)
        }, r.prototype.socket = function (e, t) {
            function n() {
                ~l(o.connecting, r) || o.connecting.push(r)
            }
            var r = this.nsps[e];
            if (!r) {
                r = new i(this, e, t), this.nsps[e] = r;
                var o = this;
                r.on("connecting", n), r.on("connect", function () {
                    r.id = o.generateId(e)
                }), this.autoConnect && n()
            }
            return r
        }, r.prototype.destroy = function (e) {
            var t = l(this.connecting, e);
            ~t && this.connecting.splice(t, 1), this.connecting.length || this.close()
        }, r.prototype.packet = function (e) {
            u("writing packet %j", e);
            var t = this;
            e.query && 0 === e.type && (e.nsp += "?" + e.query), t.encoding ? t.packetBuffer.push(e) : (t.encoding = !0, this.encoder.encode(e, function (n) {
                for (var r = 0; r < n.length; r++) t.engine.write(n[r], e.options);
                t.encoding = !1, t.processPacketQueue()
            }))
        }, r.prototype.processPacketQueue = function () {
            if (this.packetBuffer.length > 0 && !this.encoding) {
                var e = this.packetBuffer.shift();
                this.packet(e)
            }
        }, r.prototype.cleanup = function () {
            u("cleanup");
            for (var e = this.subs.length, t = 0; t < e; t++) {
                var n = this.subs.shift();
                n.destroy()
            }
            this.packetBuffer = [], this.encoding = !1, this.lastPing = null, this.decoder.destroy()
        }, r.prototype.close = r.prototype.disconnect = function () {
            u("disconnect"), this.skipReconnect = !0, this.reconnecting = !1, "opening" === this.readyState && this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.engine && this.engine.close()
        }, r.prototype.onclose = function (e) {
            u("onclose"), this.cleanup(), this.backoff.reset(), this.readyState = "closed", this.emit("close", e), this._reconnection && !this.skipReconnect && this.reconnect()
        }, r.prototype.reconnect = function () {
            if (this.reconnecting || this.skipReconnect) return this;
            var e = this;
            if (this.backoff.attempts >= this._reconnectionAttempts) u("reconnect failed"), this.backoff.reset(), this.emitAll("reconnect_failed"), this.reconnecting = !1;
            else {
                var t = this.backoff.duration();
                u("will wait %dms before reconnect attempt", t), this.reconnecting = !0;
                var n = setTimeout(function () {
                    e.skipReconnect || (u("attempting reconnect"), e.emitAll("reconnect_attempt", e.backoff.attempts), e.emitAll("reconnecting", e.backoff.attempts), e.skipReconnect || e.open(function (t) {
                        t ? (u("reconnect attempt error"), e.reconnecting = !1, e.reconnect(), e.emitAll("reconnect_error", t.data)) : (u("reconnect success"), e.onreconnect())
                    }))
                }, t);
                this.subs.push({
                    destroy: function () {
                        clearTimeout(n)
                    }
                })
            }
        }, r.prototype.onreconnect = function () {
            var e = this.backoff.attempts;
            this.reconnecting = !1, this.backoff.reset(), this.updateSocketIds(), this.emitAll("reconnect", e)
        }
    }, function (e, t, n) {
        e.exports = n(17), e.exports.parser = n(24)
    }, function (e, t, n) {
        function r(e, t) {
            return this instanceof r ? (t = t || {}, e && "object" == typeof e && (t = e, e = null), e ? (e = u(e), t.hostname = e.host, t.secure = "https" === e.protocol || "wss" === e.protocol, t.port = e.port, e.query && (t.query = e.query)) : t.host && (t.hostname = u(t.host).host), this.secure = null != t.secure ? t.secure : "undefined" != typeof location && "https:" === location.protocol, t.hostname && !t.port && (t.port = this.secure ? "443" : "80"), this.agent = t.agent || !1, this.hostname = t.hostname || ("undefined" != typeof location ? location.hostname : "localhost"), this.port = t.port || ("undefined" != typeof location && location.port ? location.port : this.secure ? 443 : 80), this.query = t.query || {}, "string" == typeof this.query && (this.query = l.decode(this.query)), this.upgrade = !1 !== t.upgrade, this.path = (t.path || "/engine.io").replace(/\/$/, "") + "/", this.forceJSONP = !!t.forceJSONP, this.jsonp = !1 !== t.jsonp, this.forceBase64 = !!t.forceBase64, this.enablesXDR = !!t.enablesXDR, this.withCredentials = !1 !== t.withCredentials, this.timestampParam = t.timestampParam || "t", this.timestampRequests = t.timestampRequests, this.transports = t.transports || ["polling", "websocket"], this.transportOptions = t.transportOptions || {}, this.readyState = "", this.writeBuffer = [], this.prevBufferLen = 0, this.policyPort = t.policyPort || 843, this.rememberUpgrade = t.rememberUpgrade || !1, this.binaryType = null, this.onlyBinaryUpgrades = t.onlyBinaryUpgrades, this.perMessageDeflate = !1 !== t.perMessageDeflate && (t.perMessageDeflate || {}), !0 === this.perMessageDeflate && (this.perMessageDeflate = {}), this.perMessageDeflate && null == this.perMessageDeflate.threshold && (this.perMessageDeflate.threshold = 1024), this.pfx = t.pfx || null, this.key = t.key || null, this.passphrase = t.passphrase || null, this.cert = t.cert || null, this.ca = t.ca || null, this.ciphers = t.ciphers || null, this.rejectUnauthorized = void 0 === t.rejectUnauthorized || t.rejectUnauthorized, this.forceNode = !!t.forceNode, this.isReactNative = "undefined" != typeof navigator && "string" == typeof navigator.product && "reactnative" === navigator.product.toLowerCase(), ("undefined" == typeof self || this.isReactNative) && (t.extraHeaders && Object.keys(t.extraHeaders).length > 0 && (this.extraHeaders = t.extraHeaders), t.localAddress && (this.localAddress = t.localAddress)), this.id = null, this.upgrades = null, this.pingInterval = null, this.pingTimeout = null, this.pingIntervalTimer = null, this.pingTimeoutTimer = null, void this.open()) : new r(e, t)
        }

        function o(e) {
            var t = {};
            for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
            return t
        }
        var i = n(18),
            s = n(11),
            a = n(3)("engine.io-client:socket"),
            c = n(38),
            p = n(24),
            u = n(2),
            l = n(32);
        e.exports = r, r.priorWebsocketSuccess = !1, s(r.prototype), r.protocol = p.protocol, r.Socket = r, r.Transport = n(23), r.transports = n(18), r.parser = n(24), r.prototype.createTransport = function (e) {
            a('creating transport "%s"', e);
            var t = o(this.query);
            t.EIO = p.protocol, t.transport = e;
            var n = this.transportOptions[e] || {};
            this.id && (t.sid = this.id);
            var r = new i[e]({
                query: t,
                socket: this,
                agent: n.agent || this.agent,
                hostname: n.hostname || this.hostname,
                port: n.port || this.port,
                secure: n.secure || this.secure,
                path: n.path || this.path,
                forceJSONP: n.forceJSONP || this.forceJSONP,
                jsonp: n.jsonp || this.jsonp,
                forceBase64: n.forceBase64 || this.forceBase64,
                enablesXDR: n.enablesXDR || this.enablesXDR,
                withCredentials: n.withCredentials || this.withCredentials,
                timestampRequests: n.timestampRequests || this.timestampRequests,
                timestampParam: n.timestampParam || this.timestampParam,
                policyPort: n.policyPort || this.policyPort,
                pfx: n.pfx || this.pfx,
                key: n.key || this.key,
                passphrase: n.passphrase || this.passphrase,
                cert: n.cert || this.cert,
                ca: n.ca || this.ca,
                ciphers: n.ciphers || this.ciphers,
                rejectUnauthorized: n.rejectUnauthorized || this.rejectUnauthorized,
                perMessageDeflate: n.perMessageDeflate || this.perMessageDeflate,
                extraHeaders: n.extraHeaders || this.extraHeaders,
                forceNode: n.forceNode || this.forceNode,
                localAddress: n.localAddress || this.localAddress,
                requestTimeout: n.requestTimeout || this.requestTimeout,
                protocols: n.protocols || void 0,
                isReactNative: this.isReactNative
            });
            return r
        }, r.prototype.open = function () {
            var e;
            if (this.rememberUpgrade && r.priorWebsocketSuccess && -1 !== this.transports.indexOf("websocket")) e = "websocket";
            else {
                if (0 === this.transports.length) {
                    var t = this;
                    return void setTimeout(function () {
                        t.emit("error", "No transports available")
                    }, 0)
                }
                e = this.transports[0]
            }
            this.readyState = "opening";
            try {
                e = this.createTransport(e)
            } catch (e) {
                return this.transports.shift(), void this.open()
            }
            e.open(), this.setTransport(e)
        }, r.prototype.setTransport = function (e) {
            a("setting transport %s", e.name);
            var t = this;
            this.transport && (a("clearing existing transport %s", this.transport.name), this.transport.removeAllListeners()), this.transport = e, e.on("drain", function () {
                t.onDrain()
            }).on("packet", function (e) {
                t.onPacket(e)
            }).on("error", function (e) {
                t.onError(e)
            }).on("close", function () {
                t.onClose("transport close")
            })
        }, r.prototype.probe = function (e) {
            function t() {
                if (h.onlyBinaryUpgrades) {
                    var t = !this.supportsBinary && h.transport.supportsBinary;
                    l = l || t
                }
                l || (a('probe transport "%s" opened', e), u.send([{
                    type: "ping",
                    data: "probe"
                }]), u.once("packet", function (t) {
                    if (!l)
                        if ("pong" === t.type && "probe" === t.data) {
                            if (a('probe transport "%s" pong', e), h.upgrading = !0, h.emit("upgrading", u), !u) return;
                            r.priorWebsocketSuccess = "websocket" === u.name, a('pausing current transport "%s"', h.transport.name), h.transport.pause(function () {
                                l || "closed" !== h.readyState && (a("changing transport and sending upgrade packet"), p(), h.setTransport(u), u.send([{
                                    type: "upgrade"
                                }]), h.emit("upgrade", u), u = null, h.upgrading = !1, h.flush())
                            })
                        } else {
                            a('probe transport "%s" failed', e);
                            var n = new Error("probe error");
                            n.transport = u.name, h.emit("upgradeError", n)
                        }
                }))
            }

            function n() {
                l || (l = !0, p(), u.close(), u = null)
            }

            function o(t) {
                var r = new Error("probe error: " + t);
                r.transport = u.name, n(), a('probe transport "%s" failed because of error: %s', e, t), h.emit("upgradeError", r)
            }

            function i() {
                o("transport closed")
            }

            function s() {
                o("socket closed")
            }

            function c(e) {
                u && e.name !== u.name && (a('"%s" works - aborting "%s"', e.name, u.name), n())
            }

            function p() {
                u.removeListener("open", t), u.removeListener("error", o), u.removeListener("close", i), h.removeListener("close", s), h.removeListener("upgrading", c)
            }
            a('probing transport "%s"', e);
            var u = this.createTransport(e, {
                    probe: 1
                }),
                l = !1,
                h = this;
            r.priorWebsocketSuccess = !1, u.once("open", t), u.once("error", o), u.once("close", i), this.once("close", s), this.once("upgrading", c), u.open()
        }, r.prototype.onOpen = function () {
            if (a("socket open"), this.readyState = "open", r.priorWebsocketSuccess = "websocket" === this.transport.name, this.emit("open"), this.flush(), "open" === this.readyState && this.upgrade && this.transport.pause) {
                a("starting upgrade probes");
                for (var e = 0, t = this.upgrades.length; e < t; e++) this.probe(this.upgrades[e])
            }
        }, r.prototype.onPacket = function (e) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) switch (a('socket receive: type "%s", data "%s"', e.type, e.data), this.emit("packet", e), this.emit("heartbeat"), e.type) {
                case "open":
                    this.onHandshake(JSON.parse(e.data));
                    break;
                case "pong":
                    this.setPing(), this.emit("pong");
                    break;
                case "error":
                    var t = new Error("server error");
                    t.code = e.data, this.onError(t);
                    break;
                case "message":
                    this.emit("data", e.data), this.emit("message", e.data)
            } else a('packet received with socket readyState "%s"', this.readyState)
        }, r.prototype.onHandshake = function (e) {
            this.emit("handshake", e), this.id = e.sid, this.transport.query.sid = e.sid, this.upgrades = this.filterUpgrades(e.upgrades), this.pingInterval = e.pingInterval, this.pingTimeout = e.pingTimeout, this.onOpen(), "closed" !== this.readyState && (this.setPing(), this.removeListener("heartbeat", this.onHeartbeat), this.on("heartbeat", this.onHeartbeat))
        }, r.prototype.onHeartbeat = function (e) {
            clearTimeout(this.pingTimeoutTimer);
            var t = this;
            t.pingTimeoutTimer = setTimeout(function () {
                "closed" !== t.readyState && t.onClose("ping timeout")
            }, e || t.pingInterval + t.pingTimeout)
        }, r.prototype.setPing = function () {
            var e = this;
            clearTimeout(e.pingIntervalTimer), e.pingIntervalTimer = setTimeout(function () {
                a("writing ping packet - expecting pong within %sms", e.pingTimeout), e.ping(), e.onHeartbeat(e.pingTimeout)
            }, e.pingInterval)
        }, r.prototype.ping = function () {
            var e = this;
            this.sendPacket("ping", function () {
                e.emit("ping")
            })
        }, r.prototype.onDrain = function () {
            this.writeBuffer.splice(0, this.prevBufferLen), this.prevBufferLen = 0, 0 === this.writeBuffer.length ? this.emit("drain") : this.flush()
        }, r.prototype.flush = function () {
            "closed" !== this.readyState && this.transport.writable && !this.upgrading && this.writeBuffer.length && (a("flushing %d packets in socket", this.writeBuffer.length), this.transport.send(this.writeBuffer), this.prevBufferLen = this.writeBuffer.length, this.emit("flush"))
        }, r.prototype.write = r.prototype.send = function (e, t, n) {
            return this.sendPacket("message", e, t, n), this
        }, r.prototype.sendPacket = function (e, t, n, r) {
            if ("function" == typeof t && (r = t, t = void 0), "function" == typeof n && (r = n, n = null), "closing" !== this.readyState && "closed" !== this.readyState) {
                n = n || {}, n.compress = !1 !== n.compress;
                var o = {
                    type: e,
                    data: t,
                    options: n
                };
                this.emit("packetCreate", o), this.writeBuffer.push(o), r && this.once("flush", r), this.flush()
            }
        }, r.prototype.close = function () {
            function e() {
                r.onClose("forced close"), a("socket closing - telling transport to close"), r.transport.close()
            }

            function t() {
                r.removeListener("upgrade", t), r.removeListener("upgradeError", t), e()
            }

            function n() {
                r.once("upgrade", t), r.once("upgradeError", t)
            }
            if ("opening" === this.readyState || "open" === this.readyState) {
                this.readyState = "closing";
                var r = this;
                this.writeBuffer.length ? this.once("drain", function () {
                    this.upgrading ? n() : e()
                }) : this.upgrading ? n() : e()
            }
            return this
        }, r.prototype.onError = function (e) {
            a("socket error %j", e), r.priorWebsocketSuccess = !1, this.emit("error", e), this.onClose("transport error", e)
        }, r.prototype.onClose = function (e, t) {
            if ("opening" === this.readyState || "open" === this.readyState || "closing" === this.readyState) {
                a('socket close with reason: "%s"', e);
                var n = this;
                clearTimeout(this.pingIntervalTimer), clearTimeout(this.pingTimeoutTimer), this.transport.removeAllListeners("close"), this.transport.close(), this.transport.removeAllListeners(), this.readyState = "closed", this.id = null, this.emit("close", e, t), n.writeBuffer = [], n.prevBufferLen = 0
            }
        }, r.prototype.filterUpgrades = function (e) {
            for (var t = [], n = 0, r = e.length; n < r; n++) ~c(this.transports, e[n]) && t.push(e[n]);
            return t
        }
    }, function (e, t, n) {
        function r(e) {
            var t, n = !1,
                r = !1,
                a = !1 !== e.jsonp;
            if ("undefined" != typeof location) {
                var c = "https:" === location.protocol,
                    p = location.port;
                p || (p = c ? 443 : 80), n = e.hostname !== location.hostname || p !== e.port, r = e.secure !== c
            }
            if (e.xdomain = n, e.xscheme = r, t = new o(e), "open" in t && !e.forceJSONP) return new i(e);
            if (!a) throw new Error("JSONP disabled");
            return new s(e)
        }
        var o = n(19),
            i = n(21),
            s = n(35),
            a = n(36);
        t.polling = r, t.websocket = a
    }, function (e, t, n) {
        var r = n(20);
        e.exports = function (e) {
            var t = e.xdomain,
                n = e.xscheme,
                o = e.enablesXDR;
            try {
                if ("undefined" != typeof XMLHttpRequest && (!t || r)) return new XMLHttpRequest
            } catch (e) {}
            try {
                if ("undefined" != typeof XDomainRequest && !n && o) return new XDomainRequest
            } catch (e) {}
            if (!t) try {
                return new(self[["Active"].concat("Object").join("X")])("Microsoft.XMLHTTP")
            } catch (e) {}
        }
    }, function (e, t) {
        try {
            e.exports = "undefined" != typeof XMLHttpRequest && "withCredentials" in new XMLHttpRequest
        } catch (t) {
            e.exports = !1
        }
    }, function (e, t, n) {
        function r() {}

        function o(e) {
            if (c.call(this, e), this.requestTimeout = e.requestTimeout, this.extraHeaders = e.extraHeaders, "undefined" != typeof location) {
                var t = "https:" === location.protocol,
                    n = location.port;
                n || (n = t ? 443 : 80), this.xd = "undefined" != typeof location && e.hostname !== location.hostname || n !== e.port, this.xs = e.secure !== t
            }
        }

        function i(e) {
            this.method = e.method || "GET", this.uri = e.uri, this.xd = !!e.xd, this.xs = !!e.xs, this.async = !1 !== e.async, this.data = void 0 !== e.data ? e.data : null, this.agent = e.agent, this.isBinary = e.isBinary, this.supportsBinary = e.supportsBinary, this.enablesXDR = e.enablesXDR, this.withCredentials = e.withCredentials, this.requestTimeout = e.requestTimeout, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.extraHeaders = e.extraHeaders, this.create()
        }

        function s() {
            for (var e in i.requests) i.requests.hasOwnProperty(e) && i.requests[e].abort()
        }
        var a = n(19),
            c = n(22),
            p = n(11),
            u = n(33),
            l = n(3)("engine.io-client:polling-xhr");
        if (e.exports = o, e.exports.Request = i, u(o, c), o.prototype.supportsBinary = !0, o.prototype.request = function (e) {
                return e = e || {}, e.uri = this.uri(), e.xd = this.xd, e.xs = this.xs, e.agent = this.agent || !1, e.supportsBinary = this.supportsBinary, e.enablesXDR = this.enablesXDR, e.withCredentials = this.withCredentials, e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized, e.requestTimeout = this.requestTimeout, e.extraHeaders = this.extraHeaders, new i(e)
            }, o.prototype.doWrite = function (e, t) {
                var n = "string" != typeof e && void 0 !== e,
                    r = this.request({
                        method: "POST",
                        data: e,
                        isBinary: n
                    }),
                    o = this;
                r.on("success", t), r.on("error", function (e) {
                    o.onError("xhr post error", e)
                }), this.sendXhr = r
            }, o.prototype.doPoll = function () {
                l("xhr poll");
                var e = this.request(),
                    t = this;
                e.on("data", function (e) {
                    t.onData(e)
                }), e.on("error", function (e) {
                    t.onError("xhr poll error", e)
                }), this.pollXhr = e
            }, p(i.prototype), i.prototype.create = function () {
                var e = {
                    agent: this.agent,
                    xdomain: this.xd,
                    xscheme: this.xs,
                    enablesXDR: this.enablesXDR
                };
                e.pfx = this.pfx, e.key = this.key, e.passphrase = this.passphrase, e.cert = this.cert, e.ca = this.ca, e.ciphers = this.ciphers, e.rejectUnauthorized = this.rejectUnauthorized;
                var t = this.xhr = new a(e),
                    n = this;
                try {
                    l("xhr open %s: %s", this.method, this.uri), t.open(this.method, this.uri, this.async);
                    try {
                        if (this.extraHeaders)
                            for (var r in t.setDisableHeaderCheck && t.setDisableHeaderCheck(!0), this.extraHeaders) this.extraHeaders.hasOwnProperty(r) && t.setRequestHeader(r, this.extraHeaders[r])
                    } catch (e) {}
                    if ("POST" === this.method) try {
                        this.isBinary ? t.setRequestHeader("Content-type", "application/octet-stream") : t.setRequestHeader("Content-type", "text/plain;charset=UTF-8")
                    } catch (e) {}
                    try {
                        t.setRequestHeader("Accept", "*/*")
                    } catch (e) {}
                    "withCredentials" in t && (t.withCredentials = this.withCredentials), this.requestTimeout && (t.timeout = this.requestTimeout), this.hasXDR() ? (t.onload = function () {
                        n.onLoad()
                    }, t.onerror = function () {
                        n.onError(t.responseText)
                    }) : t.onreadystatechange = function () {
                        if (2 === t.readyState) try {
                            var e = t.getResponseHeader("Content-Type");
                            (n.supportsBinary && "application/octet-stream" === e || "application/octet-stream; charset=UTF-8" === e) && (t.responseType = "arraybuffer")
                        } catch (e) {}
                        4 === t.readyState && (200 === t.status || 1223 === t.status ? n.onLoad() : setTimeout(function () {
                            n.onError("number" == typeof t.status ? t.status : 0)
                        }, 0))
                    }, l("xhr data %s", this.data), t.send(this.data)
                } catch (e) {
                    return void setTimeout(function () {
                        n.onError(e)
                    }, 0)
                }
                "undefined" != typeof document && (this.index = i.requestsCount++, i.requests[this.index] = this)
            }, i.prototype.onSuccess = function () {
                this.emit("success"), this.cleanup()
            }, i.prototype.onData = function (e) {
                this.emit("data", e), this.onSuccess()
            }, i.prototype.onError = function (e) {
                this.emit("error", e), this.cleanup(!0)
            }, i.prototype.cleanup = function (e) {
                if (void 0 !== this.xhr && null !== this.xhr) {
                    if (this.hasXDR() ? this.xhr.onload = this.xhr.onerror = r : this.xhr.onreadystatechange = r, e) try {
                        this.xhr.abort()
                    } catch (e) {}
                    "undefined" != typeof document && delete i.requests[this.index], this.xhr = null
                }
            }, i.prototype.onLoad = function () {
                var e;
                try {
                    var t;
                    try {
                        t = this.xhr.getResponseHeader("Content-Type")
                    } catch (e) {}
                    e = ("application/octet-stream" === t || "application/octet-stream; charset=UTF-8" === t) && this.xhr.response || this.xhr.responseText
                } catch (e) {
                    this.onError(e)
                }
                null != e && this.onData(e)
            }, i.prototype.hasXDR = function () {
                return "undefined" != typeof XDomainRequest && !this.xs && this.enablesXDR
            }, i.prototype.abort = function () {
                this.cleanup()
            }, i.requestsCount = 0, i.requests = {}, "undefined" != typeof document)
            if ("function" == typeof attachEvent) attachEvent("onunload", s);
            else if ("function" == typeof addEventListener) {
            var h = "onpagehide" in self ? "pagehide" : "unload";
            addEventListener(h, s, !1)
        }
    }, function (e, t, n) {
        function r(e) {
            var t = e && e.forceBase64;
            u && !t || (this.supportsBinary = !1), o.call(this, e)
        }
        var o = n(23),
            i = n(32),
            s = n(24),
            a = n(33),
            c = n(34),
            p = n(3)("engine.io-client:polling");
        e.exports = r;
        var u = function () {
            var e = n(19),
                t = new e({
                    xdomain: !1
                });
            return null != t.responseType
        }();
        a(r, o), r.prototype.name = "polling", r.prototype.doOpen = function () {
            this.poll()
        }, r.prototype.pause = function (e) {
            function t() {
                p("paused"), n.readyState = "paused", e()
            }
            var n = this;
            if (this.readyState = "pausing", this.polling || !this.writable) {
                var r = 0;
                this.polling && (p("we are currently polling - waiting to pause"), r++, this.once("pollComplete", function () {
                    p("pre-pause polling complete"), --r || t()
                })), this.writable || (p("we are currently writing - waiting to pause"), r++, this.once("drain", function () {
                    p("pre-pause writing complete"), --r || t()
                }))
            } else t()
        }, r.prototype.poll = function () {
            p("polling"), this.polling = !0, this.doPoll(), this.emit("poll")
        }, r.prototype.onData = function (e) {
            var t = this;
            p("polling got data %s", e);
            var n = function (e, n, r) {
                return "opening" === t.readyState && t.onOpen(), "close" === e.type ? (t.onClose(), !1) : void t.onPacket(e)
            };
            s.decodePayload(e, this.socket.binaryType, n), "closed" !== this.readyState && (this.polling = !1, this.emit("pollComplete"), "open" === this.readyState ? this.poll() : p('ignoring poll - transport state "%s"', this.readyState))
        }, r.prototype.doClose = function () {
            function e() {
                p("writing close packet"), t.write([{
                    type: "close"
                }])
            }
            var t = this;
            "open" === this.readyState ? (p("transport open - closing"), e()) : (p("transport not open - deferring close"), this.once("open", e))
        }, r.prototype.write = function (e) {
            var t = this;
            this.writable = !1;
            var n = function () {
                t.writable = !0, t.emit("drain")
            };
            s.encodePayload(e, this.supportsBinary, function (e) {
                t.doWrite(e, n)
            })
        }, r.prototype.uri = function () {
            var e = this.query || {},
                t = this.secure ? "https" : "http",
                n = "";
            !1 !== this.timestampRequests && (e[this.timestampParam] = c()), this.supportsBinary || e.sid || (e.b64 = 1), e = i.encode(e), this.port && ("https" === t && 443 !== Number(this.port) || "http" === t && 80 !== Number(this.port)) && (n = ":" + this.port), e.length && (e = "?" + e);
            var r = -1 !== this.hostname.indexOf(":");
            return t + "://" + (r ? "[" + this.hostname + "]" : this.hostname) + n + this.path + e
        }
    }, function (e, t, n) {
        function r(e) {
            this.path = e.path, this.hostname = e.hostname, this.port = e.port, this.secure = e.secure, this.query = e.query, this.timestampParam = e.timestampParam, this.timestampRequests = e.timestampRequests, this.readyState = "", this.agent = e.agent || !1, this.socket = e.socket, this.enablesXDR = e.enablesXDR, this.withCredentials = e.withCredentials, this.pfx = e.pfx, this.key = e.key, this.passphrase = e.passphrase, this.cert = e.cert, this.ca = e.ca, this.ciphers = e.ciphers, this.rejectUnauthorized = e.rejectUnauthorized, this.forceNode = e.forceNode, this.isReactNative = e.isReactNative, this.extraHeaders = e.extraHeaders, this.localAddress = e.localAddress
        }
        var o = n(24),
            i = n(11);
        e.exports = r, i(r.prototype), r.prototype.onError = function (e, t) {
            var n = new Error(e);
            return n.type = "TransportError", n.description = t, this.emit("error", n), this
        }, r.prototype.open = function () {
            return "closed" !== this.readyState && "" !== this.readyState || (this.readyState = "opening", this.doOpen()), this
        }, r.prototype.close = function () {
            return "opening" !== this.readyState && "open" !== this.readyState || (this.doClose(), this.onClose()), this
        }, r.prototype.send = function (e) {
            if ("open" !== this.readyState) throw new Error("Transport not open");
            this.write(e)
        }, r.prototype.onOpen = function () {
            this.readyState = "open", this.writable = !0, this.emit("open")
        }, r.prototype.onData = function (e) {
            var t = o.decodePacket(e, this.socket.binaryType);
            this.onPacket(t)
        }, r.prototype.onPacket = function (e) {
            this.emit("packet", e)
        }, r.prototype.onClose = function () {
            this.readyState = "closed", this.emit("close")
        }
    }, function (e, t, n) {
        function r(e, n) {
            var r = "b" + t.packets[e.type] + e.data.data;
            return n(r)
        }

        function o(e, n, r) {
            if (!n) return t.encodeBase64Packet(e, r);
            var o = e.data,
                i = new Uint8Array(o),
                s = new Uint8Array(1 + o.byteLength);
            s[0] = b[e.type];
            for (var a = 0; a < i.length; a++) s[a + 1] = i[a];
            return r(s.buffer)
        }

        function i(e, n, r) {
            if (!n) return t.encodeBase64Packet(e, r);
            var o = new FileReader;
            return o.onload = function () {
                t.encodePacket({
                    type: e.type,
                    data: o.result
                }, n, !0, r)
            }, o.readAsArrayBuffer(e.data)
        }

        function s(e, n, r) {
            if (!n) return t.encodeBase64Packet(e, r);
            if (g) return i(e, n, r);
            var o = new Uint8Array(1);
            o[0] = b[e.type];
            var s = new w([o.buffer, e.data]);
            return r(s)
        }

        function a(e) {
            try {
                e = d.decode(e, {
                    strict: !1
                })
            } catch (e) {
                return !1
            }
            return e
        }

        function c(e, t, n) {
            for (var r = new Array(e.length), o = f(e.length, n), i = function (e, n, o) {
                    t(n, function (t, n) {
                        r[e] = n, o(t, r)
                    })
                }, s = 0; s < e.length; s++) i(s, e[s], o)
        }
        var p, u = n(25),
            l = n(26),
            h = n(27),
            f = n(28),
            d = n(29);
        "undefined" != typeof ArrayBuffer && (p = n(30));
        var y = "undefined" != typeof navigator && /Android/i.test(navigator.userAgent),
            m = "undefined" != typeof navigator && /PhantomJS/i.test(navigator.userAgent),
            g = y || m;
        t.protocol = 3;
        var b = t.packets = {
                open: 0,
                close: 1,
                ping: 2,
                pong: 3,
                message: 4,
                upgrade: 5,
                noop: 6
            },
            v = u(b),
            C = {
                type: "error",
                data: "parser error"
            },
            w = n(31);
        t.encodePacket = function (e, t, n, i) {
            "function" == typeof t && (i = t, t = !1), "function" == typeof n && (i = n, n = null);
            var a = void 0 === e.data ? void 0 : e.data.buffer || e.data;
            if ("undefined" != typeof ArrayBuffer && a instanceof ArrayBuffer) return o(e, t, i);
            if (void 0 !== w && a instanceof w) return s(e, t, i);
            if (a && a.base64) return r(e, i);
            var c = b[e.type];
            return void 0 !== e.data && (c += n ? d.encode(String(e.data), {
                strict: !1
            }) : String(e.data)), i("" + c)
        }, t.encodeBase64Packet = function (e, n) {
            var r, o = "b" + t.packets[e.type];
            if (void 0 !== w && e.data instanceof w) {
                var i = new FileReader;
                return i.onload = function () {
                    var e = i.result.split(",")[1];
                    n(o + e)
                }, i.readAsDataURL(e.data)
            }
            try {
                r = String.fromCharCode.apply(null, new Uint8Array(e.data))
            } catch (t) {
                for (var s = new Uint8Array(e.data), a = new Array(s.length), c = 0; c < s.length; c++) a[c] = s[c];
                r = String.fromCharCode.apply(null, a)
            }
            return o += btoa(r), n(o)
        }, t.decodePacket = function (e, n, r) {
            if (void 0 === e) return C;
            if ("string" == typeof e) {
                if ("b" === e.charAt(0)) return t.decodeBase64Packet(e.substr(1), n);
                if (r && (e = a(e), !1 === e)) return C;
                var o = e.charAt(0);
                return Number(o) == o && v[o] ? e.length > 1 ? {
                    type: v[o],
                    data: e.substring(1)
                } : {
                    type: v[o]
                } : C
            }
            var i = new Uint8Array(e),
                s = (o = i[0], h(e, 1));
            return w && "blob" === n && (s = new w([s])), {
                type: v[o],
                data: s
            }
        }, t.decodeBase64Packet = function (e, t) {
            var n = v[e.charAt(0)];
            if (!p) return {
                type: n,
                data: {
                    base64: !0,
                    data: e.substr(1)
                }
            };
            var r = p.decode(e.substr(1));
            return "blob" === t && w && (r = new w([r])), {
                type: n,
                data: r
            }
        }, t.encodePayload = function (e, n, r) {
            function o(e) {
                return e.length + ":" + e
            }

            function i(e, r) {
                t.encodePacket(e, !!s && n, !1, function (e) {
                    r(null, o(e))
                })
            }
            "function" == typeof n && (r = n, n = null);
            var s = l(e);
            return n && s ? w && !g ? t.encodePayloadAsBlob(e, r) : t.encodePayloadAsArrayBuffer(e, r) : e.length ? void c(e, i, function (e, t) {
                return r(t.join(""))
            }) : r("0:")
        }, t.decodePayload = function (e, n, r) {
            if ("string" != typeof e) return t.decodePayloadAsBinary(e, n, r);
            var o;
            if ("function" == typeof n && (r = n, n = null), "" === e) return r(C, 0, 1);
            for (var i, s, a = "", c = 0, p = e.length; c < p; c++) {
                var u = e.charAt(c);
                if (":" === u) {
                    if ("" === a || a != (i = Number(a))) return r(C, 0, 1);
                    if (s = e.substr(c + 1, i), a != s.length) return r(C, 0, 1);
                    if (s.length) {
                        if (o = t.decodePacket(s, n, !1), C.type === o.type && C.data === o.data) return r(C, 0, 1);
                        var l = r(o, c + i, p);
                        if (!1 === l) return
                    }
                    c += i, a = ""
                } else a += u
            }
            return "" !== a ? r(C, 0, 1) : void 0
        }, t.encodePayloadAsArrayBuffer = function (e, n) {
            function r(e, n) {
                t.encodePacket(e, !0, !0, function (e) {
                    return n(null, e)
                })
            }
            return e.length ? void c(e, r, function (e, t) {
                var r = t.reduce(function (e, t) {
                        var n;
                        return n = "string" == typeof t ? t.length : t.byteLength, e + n.toString().length + n + 2
                    }, 0),
                    o = new Uint8Array(r),
                    i = 0;
                return t.forEach(function (e) {
                    var t = "string" == typeof e,
                        n = e;
                    if (t) {
                        for (var r = new Uint8Array(e.length), s = 0; s < e.length; s++) r[s] = e.charCodeAt(s);
                        n = r.buffer
                    }
                    o[i++] = t ? 0 : 1;
                    var a = n.byteLength.toString();
                    for (s = 0; s < a.length; s++) o[i++] = parseInt(a[s]);
                    o[i++] = 255;
                    for (r = new Uint8Array(n), s = 0; s < r.length; s++) o[i++] = r[s]
                }), n(o.buffer)
            }) : n(new ArrayBuffer(0))
        }, t.encodePayloadAsBlob = function (e, n) {
            function r(e, n) {
                t.encodePacket(e, !0, !0, function (e) {
                    var t = new Uint8Array(1);
                    if (t[0] = 1, "string" == typeof e) {
                        for (var r = new Uint8Array(e.length), o = 0; o < e.length; o++) r[o] = e.charCodeAt(o);
                        e = r.buffer, t[0] = 0
                    }
                    var i = e instanceof ArrayBuffer ? e.byteLength : e.size,
                        s = i.toString(),
                        a = new Uint8Array(s.length + 1);
                    for (o = 0; o < s.length; o++) a[o] = parseInt(s[o]);
                    if (a[s.length] = 255, w) {
                        var c = new w([t.buffer, a.buffer, e]);
                        n(null, c)
                    }
                })
            }
            c(e, r, function (e, t) {
                return n(new w(t))
            })
        }, t.decodePayloadAsBinary = function (e, n, r) {
            "function" == typeof n && (r = n, n = null);
            for (var o = e, i = []; o.byteLength > 0;) {
                for (var s = new Uint8Array(o), a = 0 === s[0], c = "", p = 1; 255 !== s[p]; p++) {
                    if (c.length > 310) return r(C, 0, 1);
                    c += s[p]
                }
                o = h(o, 2 + c.length), c = parseInt(c);
                var u = h(o, 0, c);
                if (a) try {
                    u = String.fromCharCode.apply(null, new Uint8Array(u))
                } catch (e) {
                    var l = new Uint8Array(u);
                    u = "";
                    for (p = 0; p < l.length; p++) u += String.fromCharCode(l[p])
                }
                i.push(u), o = h(o, c)
            }
            var f = i.length;
            i.forEach(function (e, o) {
                r(t.decodePacket(e, n, !0), o, f)
            })
        }
    }, function (e, t) {
        e.exports = Object.keys || function (e) {
            var t = [],
                n = Object.prototype.hasOwnProperty;
            for (var r in e) n.call(e, r) && t.push(r);
            return t
        }
    }, function (e, t, n) {
        function r(e) {
            if (!e || "object" != typeof e) return !1;
            if (o(e)) {
                for (var t = 0, n = e.length; t < n; t++)
                    if (r(e[t])) return !0;
                return !1
            }
            if ("function" == typeof Buffer && Buffer.isBuffer && Buffer.isBuffer(e) || "function" == typeof ArrayBuffer && e instanceof ArrayBuffer || s && e instanceof Blob || a && e instanceof File) return !0;
            if (e.toJSON && "function" == typeof e.toJSON && 1 === arguments.length) return r(e.toJSON(), !0);
            for (var i in e)
                if (Object.prototype.hasOwnProperty.call(e, i) && r(e[i])) return !0;
            return !1
        }
        var o = n(13),
            i = Object.prototype.toString,
            s = "function" == typeof Blob || "undefined" != typeof Blob && "[object BlobConstructor]" === i.call(Blob),
            a = "function" == typeof File || "undefined" != typeof File && "[object FileConstructor]" === i.call(File);
        e.exports = r
    }, function (e, t) {
        e.exports = function (e, t, n) {
            var r = e.byteLength;
            if (t = t || 0, n = n || r, e.slice) return e.slice(t, n);
            if (t < 0 && (t += r), n < 0 && (n += r), n > r && (n = r), t >= r || t >= n || 0 === r) return new ArrayBuffer(0);
            for (var o = new Uint8Array(e), i = new Uint8Array(n - t), s = t, a = 0; s < n; s++, a++) i[a] = o[s];
            return i.buffer
        }
    }, function (e, t) {
        function n(e, t, n) {
            function o(e, r) {
                if (o.count <= 0) throw new Error("after called too many times");
                --o.count, e ? (i = !0, t(e), t = n) : 0 !== o.count || i || t(null, r)
            }
            var i = !1;
            return n = n || r, o.count = e, 0 === e ? t() : o
        }

        function r() {}
        e.exports = n
    }, function (e, t) {
        function n(e) {
            for (var t, n, r = [], o = 0, i = e.length; o < i;) t = e.charCodeAt(o++), t >= 55296 && t <= 56319 && o < i ? (n = e.charCodeAt(o++), 56320 == (64512 & n) ? r.push(((1023 & t) << 10) + (1023 & n) + 65536) : (r.push(t), o--)) : r.push(t);
            return r
        }

        function r(e) {
            for (var t, n = e.length, r = -1, o = ""; ++r < n;) t = e[r], t > 65535 && (t -= 65536, o += d(t >>> 10 & 1023 | 55296), t = 56320 | 1023 & t), o += d(t);
            return o
        }

        function o(e, t) {
            if (e >= 55296 && e <= 57343) {
                if (t) throw Error("Lone surrogate U+" + e.toString(16).toUpperCase() + " is not a scalar value");
                return !1
            }
            return !0
        }

        function i(e, t) {
            return d(e >> t & 63 | 128)
        }

        function s(e, t) {
            if (0 == (4294967168 & e)) return d(e);
            var n = "";
            return 0 == (4294965248 & e) ? n = d(e >> 6 & 31 | 192) : 0 == (4294901760 & e) ? (o(e, t) || (e = 65533), n = d(e >> 12 & 15 | 224), n += i(e, 6)) : 0 == (4292870144 & e) && (n = d(e >> 18 & 7 | 240), n += i(e, 12), n += i(e, 6)), n + d(63 & e | 128)
        }

        function a(e, t) {
            t = t || {};
            for (var r, o = !1 !== t.strict, i = n(e), a = i.length, c = -1, p = ""; ++c < a;) r = i[c], p += s(r, o);
            return p
        }

        function c() {
            if (f >= h) throw Error("Invalid byte index");
            var e = 255 & l[f];
            if (f++, 128 == (192 & e)) return 63 & e;
            throw Error("Invalid continuation byte")
        }

        function p(e) {
            var t, n, r, i, s;
            if (f > h) throw Error("Invalid byte index");
            if (f == h) return !1;
            if (t = 255 & l[f], f++, 0 == (128 & t)) return t;
            if (192 == (224 & t)) {
                if (n = c(), s = (31 & t) << 6 | n, s >= 128) return s;
                throw Error("Invalid continuation byte")
            }
            if (224 == (240 & t)) {
                if (n = c(), r = c(), s = (15 & t) << 12 | n << 6 | r, s >= 2048) return o(s, e) ? s : 65533;
                throw Error("Invalid continuation byte")
            }
            if (240 == (248 & t) && (n = c(), r = c(), i = c(), s = (7 & t) << 18 | n << 12 | r << 6 | i, s >= 65536 && s <= 1114111)) return s;
            throw Error("Invalid UTF-8 detected")
        }

        function u(e, t) {
            t = t || {};
            var o = !1 !== t.strict;
            l = n(e), h = l.length, f = 0;
            for (var i, s = []; !1 !== (i = p(o));) s.push(i);
            return r(s)
        }
        var l, h, f, d = String.fromCharCode;
        e.exports = {
            version: "2.1.2",
            encode: a,
            decode: u
        }
    }, function (e, t) {
        ! function () {
            "use strict";
            for (var e = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", n = new Uint8Array(256), r = 0; r < e.length; r++) n[e.charCodeAt(r)] = r;
            t.encode = function (t) {
                var n, r = new Uint8Array(t),
                    o = r.length,
                    i = "";
                for (n = 0; n < o; n += 3) i += e[r[n] >> 2], i += e[(3 & r[n]) << 4 | r[n + 1] >> 4], i += e[(15 & r[n + 1]) << 2 | r[n + 2] >> 6], i += e[63 & r[n + 2]];
                return o % 3 == 2 ? i = i.substring(0, i.length - 1) + "=" : o % 3 == 1 && (i = i.substring(0, i.length - 2) + "=="), i
            }, t.decode = function (e) {
                var t, r, o, i, s, a = .75 * e.length,
                    c = e.length,
                    p = 0;
                "=" === e[e.length - 1] && (a--, "=" === e[e.length - 2] && a--);
                var u = new ArrayBuffer(a),
                    l = new Uint8Array(u);
                for (t = 0; t < c; t += 4) r = n[e.charCodeAt(t)], o = n[e.charCodeAt(t + 1)], i = n[e.charCodeAt(t + 2)], s = n[e.charCodeAt(t + 3)], l[p++] = r << 2 | o >> 4, l[p++] = (15 & o) << 4 | i >> 2, l[p++] = (3 & i) << 6 | 63 & s;
                return u
            }
        }()
    }, function (e, t) {
        function n(e) {
            return e.map(function (e) {
                if (e.buffer instanceof ArrayBuffer) {
                    var t = e.buffer;
                    if (e.byteLength !== t.byteLength) {
                        var n = new Uint8Array(e.byteLength);
                        n.set(new Uint8Array(t, e.byteOffset, e.byteLength)), t = n.buffer
                    }
                    return t
                }
                return e
            })
        }

        function r(e, t) {
            t = t || {};
            var r = new i;
            return n(e).forEach(function (e) {
                r.append(e)
            }), t.type ? r.getBlob(t.type) : r.getBlob()
        }

        function o(e, t) {
            return new Blob(n(e), t || {})
        }
        var i = void 0 !== i ? i : "undefined" != typeof WebKitBlobBuilder ? WebKitBlobBuilder : "undefined" != typeof MSBlobBuilder ? MSBlobBuilder : "undefined" != typeof MozBlobBuilder && MozBlobBuilder,
            s = function () {
                try {
                    var e = new Blob(["hi"]);
                    return 2 === e.size
                } catch (e) {
                    return !1
                }
            }(),
            a = s && function () {
                try {
                    var e = new Blob([new Uint8Array([1, 2])]);
                    return 2 === e.size
                } catch (e) {
                    return !1
                }
            }(),
            c = i && i.prototype.append && i.prototype.getBlob;
        "undefined" != typeof Blob && (r.prototype = Blob.prototype, o.prototype = Blob.prototype), e.exports = s ? a ? Blob : o : c ? r : void 0
    }, function (e, t) {
        t.encode = function (e) {
            var t = "";
            for (var n in e) e.hasOwnProperty(n) && (t.length && (t += "&"), t += encodeURIComponent(n) + "=" + encodeURIComponent(e[n]));
            return t
        }, t.decode = function (e) {
            for (var t = {}, n = e.split("&"), r = 0, o = n.length; r < o; r++) {
                var i = n[r].split("=");
                t[decodeURIComponent(i[0])] = decodeURIComponent(i[1])
            }
            return t
        }
    }, function (e, t) {
        e.exports = function (e, t) {
            var n = function () {};
            n.prototype = t.prototype, e.prototype = new n, e.prototype.constructor = e
        }
    }, function (e, t) {
        "use strict";

        function n(e) {
            var t = "";
            do {
                t = s[e % a] + t, e = Math.floor(e / a)
            } while (e > 0);
            return t
        }

        function r(e) {
            var t = 0;
            for (u = 0; u < e.length; u++) t = t * a + c[e.charAt(u)];
            return t
        }

        function o() {
            var e = n(+new Date);
            return e !== i ? (p = 0, i = e) : e + "." + n(p++)
        }
        for (var i, s = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz-_".split(""), a = 64, c = {}, p = 0, u = 0; u < a; u++) c[s[u]] = u;
        o.encode = n, o.decode = r, e.exports = o
    }, function (e, t, n) {
        (function (t) {
            function r() {}

            function o() {
                return "undefined" != typeof self ? self : "undefined" != typeof window ? window : void 0 !== t ? t : {}
            }

            function i(e) {
                if (s.call(this, e), this.query = this.query || {}, !c) {
                    var t = o();
                    c = t.___eio = t.___eio || []
                }
                this.index = c.length;
                var n = this;
                c.push(function (e) {
                    n.onData(e)
                }), this.query.j = this.index, "function" == typeof addEventListener && addEventListener("beforeunload", function () {
                    n.script && (n.script.onerror = r)
                }, !1)
            }
            var s = n(22),
                a = n(33);
            e.exports = i;
            var c, p = /\n/g,
                u = /\\n/g;
            a(i, s), i.prototype.supportsBinary = !1, i.prototype.doClose = function () {
                this.script && (this.script.parentNode.removeChild(this.script), this.script = null), this.form && (this.form.parentNode.removeChild(this.form), this.form = null, this.iframe = null), s.prototype.doClose.call(this)
            }, i.prototype.doPoll = function () {
                var e = this,
                    t = document.createElement("script");
                this.script && (this.script.parentNode.removeChild(this.script), this.script = null), t.async = !0, t.src = this.uri(), t.onerror = function (t) {
                    e.onError("jsonp poll error", t)
                };
                var n = document.getElementsByTagName("script")[0];
                n ? n.parentNode.insertBefore(t, n) : (document.head || document.body).appendChild(t), this.script = t;
                var r = "undefined" != typeof navigator && /gecko/i.test(navigator.userAgent);
                r && setTimeout(function () {
                    var e = document.createElement("iframe");
                    document.body.appendChild(e), document.body.removeChild(e)
                }, 100)
            }, i.prototype.doWrite = function (e, t) {
                function n() {
                    r(), t()
                }

                function r() {
                    if (o.iframe) try {
                        o.form.removeChild(o.iframe)
                    } catch (e) {
                        o.onError("jsonp polling iframe removal error", e)
                    }
                    try {
                        var e = '<iframe src="javascript:0" name="' + o.iframeId + '">';
                        i = document.createElement(e)
                    } catch (e) {
                        i = document.createElement("iframe"), i.name = o.iframeId, i.src = "javascript:0"
                    }
                    i.id = o.iframeId, o.form.appendChild(i), o.iframe = i
                }
                var o = this;
                if (!this.form) {
                    var i, s = document.createElement("form"),
                        a = document.createElement("textarea"),
                        c = this.iframeId = "eio_iframe_" + this.index;
                    s.className = "socketio", s.style.position = "absolute", s.style.top = "-1000px", s.style.left = "-1000px", s.target = c, s.method = "POST", s.setAttribute("accept-charset", "utf-8"), a.name = "d", s.appendChild(a), document.body.appendChild(s), this.form = s, this.area = a
                }
                this.form.action = this.uri(), r(), e = e.replace(u, "\\\n"), this.area.value = e.replace(p, "\\n");
                try {
                    this.form.submit()
                } catch (e) {}
                this.iframe.attachEvent ? this.iframe.onreadystatechange = function () {
                    "complete" === o.iframe.readyState && n()
                } : this.iframe.onload = n
            }
        }).call(t, function () {
            return this
        }())
    }, function (e, t, n) {
        function r(e) {
            var t = e && e.forceBase64;
            t && (this.supportsBinary = !1), this.perMessageDeflate = e.perMessageDeflate, this.usingBrowserWebSocket = o && !e.forceNode, this.protocols = e.protocols, this.usingBrowserWebSocket || (h = i), s.call(this, e)
        }
        var o, i, s = n(23),
            a = n(24),
            c = n(32),
            p = n(33),
            u = n(34),
            l = n(3)("engine.io-client:websocket");
        if ("undefined" != typeof WebSocket ? o = WebSocket : "undefined" != typeof self && (o = self.WebSocket || self.MozWebSocket), "undefined" == typeof window) try {
            i = n(37)
        } catch (e) {}
        var h = o || i;
        e.exports = r, p(r, s), r.prototype.name = "websocket", r.prototype.supportsBinary = !0, r.prototype.doOpen = function () {
            if (this.check()) {
                var e = this.uri(),
                    t = this.protocols,
                    n = {
                        agent: this.agent,
                        perMessageDeflate: this.perMessageDeflate
                    };
                n.pfx = this.pfx, n.key = this.key, n.passphrase = this.passphrase, n.cert = this.cert, n.ca = this.ca, n.ciphers = this.ciphers, n.rejectUnauthorized = this.rejectUnauthorized, this.extraHeaders && (n.headers = this.extraHeaders), this.localAddress && (n.localAddress = this.localAddress);
                try {
                    this.ws = this.usingBrowserWebSocket && !this.isReactNative ? t ? new h(e, t) : new h(e) : new h(e, t, n)
                } catch (e) {
                    return this.emit("error", e)
                }
                void 0 === this.ws.binaryType && (this.supportsBinary = !1), this.ws.supports && this.ws.supports.binary ? (this.supportsBinary = !0, this.ws.binaryType = "nodebuffer") : this.ws.binaryType = "arraybuffer", this.addEventListeners()
            }
        }, r.prototype.addEventListeners = function () {
            var e = this;
            this.ws.onopen = function () {
                e.onOpen()
            }, this.ws.onclose = function () {
                e.onClose()
            }, this.ws.onmessage = function (t) {
                e.onData(t.data)
            }, this.ws.onerror = function (t) {
                e.onError("websocket error", t)
            }
        }, r.prototype.write = function (e) {
            function t() {
                n.emit("flush"), setTimeout(function () {
                    n.writable = !0, n.emit("drain")
                }, 0)
            }
            var n = this;
            this.writable = !1;
            for (var r = e.length, o = 0, i = r; o < i; o++) ! function (e) {
                a.encodePacket(e, n.supportsBinary, function (o) {
                    if (!n.usingBrowserWebSocket) {
                        var i = {};
                        if (e.options && (i.compress = e.options.compress), n.perMessageDeflate) {
                            var s = "string" == typeof o ? Buffer.byteLength(o) : o.length;
                            s < n.perMessageDeflate.threshold && (i.compress = !1)
                        }
                    }
                    try {
                        n.usingBrowserWebSocket ? n.ws.send(o) : n.ws.send(o, i)
                    } catch (e) {
                        l("websocket closed before onclose event")
                    }--r || t()
                })
            }(e[o])
        }, r.prototype.onClose = function () {
            s.prototype.onClose.call(this)
        }, r.prototype.doClose = function () {
            void 0 !== this.ws && this.ws.close()
        }, r.prototype.uri = function () {
            var e = this.query || {},
                t = this.secure ? "wss" : "ws",
                n = "";
            this.port && ("wss" === t && 443 !== Number(this.port) || "ws" === t && 80 !== Number(this.port)) && (n = ":" + this.port), this.timestampRequests && (e[this.timestampParam] = u()), this.supportsBinary || (e.b64 = 1), e = c.encode(e), e.length && (e = "?" + e);
            var r = -1 !== this.hostname.indexOf(":");
            return t + "://" + (r ? "[" + this.hostname + "]" : this.hostname) + n + this.path + e
        }, r.prototype.check = function () {
            return !(!h || "__initialize" in h && this.name === r.prototype.name)
        }
    }, function (e, t) {}, function (e, t) {
        var n = [].indexOf;
        e.exports = function (e, t) {
            if (n) return e.indexOf(t);
            for (var r = 0; r < e.length; ++r)
                if (e[r] === t) return r;
            return -1
        }
    }, function (e, t, n) {
        function r(e, t, n) {
            this.io = e, this.nsp = t, this.json = this, this.ids = 0, this.acks = {}, this.receiveBuffer = [], this.sendBuffer = [], this.connected = !1, this.disconnected = !0, this.flags = {}, n && n.query && (this.query = n.query),
                this.io.autoConnect && this.open()
        }
        var o = n(7),
            i = n(11),
            s = n(40),
            a = n(41),
            c = n(42),
            p = n(3)("socket.io-client:socket"),
            u = n(32),
            l = n(26);
        e.exports = r;
        var h = {
                connect: 1,
                connect_error: 1,
                connect_timeout: 1,
                connecting: 1,
                disconnect: 1,
                error: 1,
                reconnect: 1,
                reconnect_attempt: 1,
                reconnect_failed: 1,
                reconnect_error: 1,
                reconnecting: 1,
                ping: 1,
                pong: 1
            },
            f = i.prototype.emit;
        i(r.prototype), r.prototype.subEvents = function () {
            if (!this.subs) {
                var e = this.io;
                this.subs = [a(e, "open", c(this, "onopen")), a(e, "packet", c(this, "onpacket")), a(e, "close", c(this, "onclose"))]
            }
        }, r.prototype.open = r.prototype.connect = function () {
            return this.connected ? this : (this.subEvents(), this.io.open(), "open" === this.io.readyState && this.onopen(), this.emit("connecting"), this)
        }, r.prototype.send = function () {
            var e = s(arguments);
            return e.unshift("message"), this.emit.apply(this, e), this
        }, r.prototype.emit = function (e) {
            if (h.hasOwnProperty(e)) return f.apply(this, arguments), this;
            var t = s(arguments),
                n = {
                    type: (void 0 !== this.flags.binary ? this.flags.binary : l(t)) ? o.BINARY_EVENT : o.EVENT,
                    data: t,
                    options: {}
                };
            return n.options.compress = !this.flags || !1 !== this.flags.compress, "function" == typeof t[t.length - 1] && (p("emitting packet with ack id %d", this.ids), this.acks[this.ids] = t.pop(), n.id = this.ids++), this.connected ? this.packet(n) : this.sendBuffer.push(n), this.flags = {}, this
        }, r.prototype.packet = function (e) {
            e.nsp = this.nsp, this.io.packet(e)
        }, r.prototype.onopen = function () {
            if (p("transport is open - connecting"), "/" !== this.nsp)
                if (this.query) {
                    var e = "object" == typeof this.query ? u.encode(this.query) : this.query;
                    p("sending connect packet with query %s", e), this.packet({
                        type: o.CONNECT,
                        query: e
                    })
                } else this.packet({
                    type: o.CONNECT
                })
        }, r.prototype.onclose = function (e) {
            p("close (%s)", e), this.connected = !1, this.disconnected = !0, delete this.id, this.emit("disconnect", e)
        }, r.prototype.onpacket = function (e) {
            var t = e.nsp === this.nsp,
                n = e.type === o.ERROR && "/" === e.nsp;
            if (t || n) switch (e.type) {
                case o.CONNECT:
                    this.onconnect();
                    break;
                case o.EVENT:
                case o.BINARY_EVENT:
                    this.onevent(e);
                    break;
                case o.ACK:
                case o.BINARY_ACK:
                    this.onack(e);
                    break;
                case o.DISCONNECT:
                    this.ondisconnect();
                    break;
                case o.ERROR:
                    this.emit("error", e.data)
            }
        }, r.prototype.onevent = function (e) {
            var t = e.data || [];
            p("emitting event %j", t), null != e.id && (p("attaching ack callback to event"), t.push(this.ack(e.id))), this.connected ? f.apply(this, t) : this.receiveBuffer.push(t)
        }, r.prototype.ack = function (e) {
            var t = this,
                n = !1;
            return function () {
                if (!n) {
                    n = !0;
                    var r = s(arguments);
                    p("sending ack %j", r), t.packet({
                        type: l(r) ? o.BINARY_ACK : o.ACK,
                        id: e,
                        data: r
                    })
                }
            }
        }, r.prototype.onack = function (e) {
            var t = this.acks[e.id];
            "function" == typeof t ? (p("calling ack %s with %j", e.id, e.data), t.apply(this, e.data), delete this.acks[e.id]) : p("bad ack %s", e.id)
        }, r.prototype.onconnect = function () {
            this.connected = !0, this.disconnected = !1, this.emit("connect"), this.emitBuffered()
        }, r.prototype.emitBuffered = function () {
            var e;
            for (e = 0; e < this.receiveBuffer.length; e++) f.apply(this, this.receiveBuffer[e]);
            for (this.receiveBuffer = [], e = 0; e < this.sendBuffer.length; e++) this.packet(this.sendBuffer[e]);
            this.sendBuffer = []
        }, r.prototype.ondisconnect = function () {
            p("server disconnect (%s)", this.nsp), this.destroy(), this.onclose("io server disconnect")
        }, r.prototype.destroy = function () {
            if (this.subs) {
                for (var e = 0; e < this.subs.length; e++) this.subs[e].destroy();
                this.subs = null
            }
            this.io.destroy(this)
        }, r.prototype.close = r.prototype.disconnect = function () {
            return this.connected && (p("performing disconnect (%s)", this.nsp), this.packet({
                type: o.DISCONNECT
            })), this.destroy(), this.connected && this.onclose("io client disconnect"), this
        }, r.prototype.compress = function (e) {
            return this.flags.compress = e, this
        }, r.prototype.binary = function (e) {
            return this.flags.binary = e, this
        }
    }, function (e, t) {
        function n(e, t) {
            var n = [];
            t = t || 0;
            for (var r = t || 0; r < e.length; r++) n[r - t] = e[r];
            return n
        }
        e.exports = n
    }, function (e, t) {
        function n(e, t, n) {
            return e.on(t, n), {
                destroy: function () {
                    e.removeListener(t, n)
                }
            }
        }
        e.exports = n
    }, function (e, t) {
        var n = [].slice;
        e.exports = function (e, t) {
            if ("string" == typeof t && (t = e[t]), "function" != typeof t) throw new Error("bind() requires a function");
            var r = n.call(arguments, 2);
            return function () {
                return t.apply(e, r.concat(n.call(arguments)))
            }
        }
    }, function (e, t) {
        function n(e) {
            e = e || {}, this.ms = e.min || 100, this.max = e.max || 1e4, this.factor = e.factor || 2, this.jitter = e.jitter > 0 && e.jitter <= 1 ? e.jitter : 0, this.attempts = 0
        }
        e.exports = n, n.prototype.duration = function () {
            var e = this.ms * Math.pow(this.factor, this.attempts++);
            if (this.jitter) {
                var t = Math.random(),
                    n = Math.floor(t * this.jitter * e);
                e = 0 == (1 & Math.floor(10 * t)) ? e - n : e + n
            }
            return 0 | Math.min(e, this.max)
        }, n.prototype.reset = function () {
            this.attempts = 0
        }, n.prototype.setMin = function (e) {
            this.ms = e
        }, n.prototype.setMax = function (e) {
            this.max = e
        }, n.prototype.setJitter = function (e) {
            this.jitter = e
        }
    }])
}),
function () {
    "use strict";

    function e(e) {
        return (e = String(e)).charAt(0).toUpperCase() + e.slice(1)
    }

    function t(t) {
        return t = s(t), /^(?:webOS|i(?:OS|P))/.test(t) ? t : e(t)
    }

    function n(e, t) {
        for (var n in e) m.call(e, n) && t(e[n], n, e)
    }

    function r(t) {
        return null == t ? e(t) : g.call(t).slice(8, -1)
    }

    function o(e) {
        return String(e).replace(/([ -])(?!$)/g, "$1?")
    }

    function i(e, t) {
        var r = null;
        return function (e, t) {
            var r = -1,
                o = e ? e.length : 0;
            if ("number" == typeof o && -1 < o && o <= f)
                for (; ++r < o;) t(e[r], r, e);
            else n(e, t)
        }(e, function (n, o) {
            r = t(r, n, o, e)
        }), r
    }

    function s(e) {
        return String(e).replace(/^ +| +$/g, "")
    }

    function a(e) {
        function c(n) {
            return i(n, function (n, r) {
                var i = r.pattern || o(r);
                return !n && (n = RegExp("\\b" + i + " *\\d+[.\\w_]*", "i").exec(e) || RegExp("\\b" + i + " *\\w+-[\\w]*", "i").exec(e) || RegExp("\\b" + i + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(e)) && ((n = String(r.label && !RegExp(i, "i").test(r.label) ? r.label : n).split("/"))[1] && !/[\d.]+/.test(n[0]) && (n[0] += " " + n[1]), r = r.label || r, n = t(n[0].replace(RegExp(i, "i"), r).replace(RegExp("; *(?:" + r + "[_-])?", "i"), " ").replace(RegExp("(" + r + ")[-_.]?(\\w)", "i"), "$1 $2"))), n
            })
        }

        function u(t) {
            return i(t, function (t, n) {
                return t || (RegExp(n + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(e) || 0)[1] || null
            })
        }
        var l = p,
            h = e && "object" == typeof e && "String" != r(e);
        h && (l = e, e = null);
        var f = l.navigator || {},
            y = f.userAgent || "";
        e = e || y;
        var m, b, v, C, w, x = h ? !!f.likeChrome : /\bChrome\b/.test(e) && !/internal|\n/i.test(g.toString()),
            k = "Object",
            S = h ? k : "ScriptBridgingProxyObject",
            A = h ? k : "Environment",
            B = h && l.java ? "JavaPackage" : r(l.java),
            F = h ? k : "RuntimeObject",
            E = /\bJava/.test(B) && l.java,
            O = E && r(l.environment) == A,
            T = E ? "a" : "α",
            P = E ? "b" : "β",
            R = l.document || {},
            M = l.operamini || l.opera,
            N = d.test(N = h && M ? M["[[Class]]"] : r(M)) ? N : M = null,
            I = e,
            j = [],
            D = null,
            _ = e == y,
            q = _ && M && "function" == typeof M.version && M.version(),
            L = i([{
                label: "EdgeHTML",
                pattern: "Edge"
            }, "Trident", {
                label: "WebKit",
                pattern: "AppleWebKit"
            }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"], function (t, n) {
                return t || RegExp("\\b" + (n.pattern || o(n)) + "\\b", "i").exec(e) && (n.label || n)
            }),
            U = i(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
                label: "Microsoft Edge",
                pattern: "(?:Edge|Edg|EdgA|EdgiOS)"
            }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
                label: "Samsung Internet",
                pattern: "SamsungBrowser"
            }, "SeaMonkey", {
                label: "Silk",
                pattern: "(?:Cloud9|Silk-Accelerated)"
            }, "Sleipnir", "SlimBrowser", {
                label: "SRWare Iron",
                pattern: "Iron"
            }, "Sunrise", "Swiftfox", "Vivaldi", "Waterfox", "WebPositive", {
                label: "Yandex Browser",
                pattern: "YaBrowser"
            }, {
                label: "UC Browser",
                pattern: "UCBrowser"
            }, "Opera Mini", {
                label: "Opera Mini",
                pattern: "OPiOS"
            }, "Opera", {
                label: "Opera",
                pattern: "OPR"
            }, "Chromium", "Chrome", {
                label: "Chrome",
                pattern: "(?:HeadlessChrome)"
            }, {
                label: "Chrome Mobile",
                pattern: "(?:CriOS|CrMo)"
            }, {
                label: "Firefox",
                pattern: "(?:Firefox|Minefield)"
            }, {
                label: "Firefox for iOS",
                pattern: "FxiOS"
            }, {
                label: "IE",
                pattern: "IEMobile"
            }, {
                label: "IE",
                pattern: "MSIE"
            }, "Safari"], function (t, n) {
                return t || RegExp("\\b" + (n.pattern || o(n)) + "\\b", "i").exec(e) && (n.label || n)
            }),
            W = c([{
                label: "BlackBerry",
                pattern: "BB10"
            }, "BlackBerry", {
                label: "Galaxy S",
                pattern: "GT-I9000"
            }, {
                label: "Galaxy S2",
                pattern: "GT-I9100"
            }, {
                label: "Galaxy S3",
                pattern: "GT-I9300"
            }, {
                label: "Galaxy S4",
                pattern: "GT-I9500"
            }, {
                label: "Galaxy S5",
                pattern: "SM-G900"
            }, {
                label: "Galaxy S6",
                pattern: "SM-G920"
            }, {
                label: "Galaxy S6 Edge",
                pattern: "SM-G925"
            }, {
                label: "Galaxy S7",
                pattern: "SM-G930"
            }, {
                label: "Galaxy S7 Edge",
                pattern: "SM-G935"
            }, "Google TV", "Lumia", "iPad", "iPod", "iPhone", "Kindle", {
                label: "Kindle Fire",
                pattern: "(?:Cloud9|Silk-Accelerated)"
            }, "Nexus", "Nook", "PlayBook", "PlayStation Vita", "PlayStation", "TouchPad", "Transformer", {
                label: "Wii U",
                pattern: "WiiU"
            }, "Wii", "Xbox One", {
                label: "Xbox 360",
                pattern: "Xbox"
            }, "Xoom"]),
            $ = i({
                Apple: {
                    iPad: 1,
                    iPhone: 1,
                    iPod: 1
                },
                Alcatel: {},
                Archos: {},
                Amazon: {
                    Kindle: 1,
                    "Kindle Fire": 1
                },
                Asus: {
                    Transformer: 1
                },
                "Barnes & Noble": {
                    Nook: 1
                },
                BlackBerry: {
                    PlayBook: 1
                },
                Google: {
                    "Google TV": 1,
                    Nexus: 1
                },
                HP: {
                    TouchPad: 1
                },
                HTC: {},
                Huawei: {},
                Lenovo: {},
                LG: {},
                Microsoft: {
                    Xbox: 1,
                    "Xbox One": 1
                },
                Motorola: {
                    Xoom: 1
                },
                Nintendo: {
                    "Wii U": 1,
                    Wii: 1
                },
                Nokia: {
                    Lumia: 1
                },
                Oppo: {},
                Samsung: {
                    "Galaxy S": 1,
                    "Galaxy S2": 1,
                    "Galaxy S3": 1,
                    "Galaxy S4": 1
                },
                Sony: {
                    PlayStation: 1,
                    "PlayStation Vita": 1
                },
                Xiaomi: {
                    Mi: 1,
                    Redmi: 1
                }
            }, function (t, n, r) {
                return t || (n[W] || n[/^[a-z]+(?: +[a-z]+\b)*/i.exec(W)] || RegExp("\\b" + o(r) + "(?:\\b|\\w*\\d)", "i").exec(e)) && r
            }),
            H = i(["Windows Phone", "KaiOS", "Android", "CentOS", {
                label: "Chrome OS",
                pattern: "CrOS"
            }, "Debian", {
                label: "DragonFly BSD",
                pattern: "DragonFly"
            }, "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "], function (n, r) {
                var i, s, a, c, p = r.pattern || o(r);
                return !n && (n = RegExp("\\b" + p + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(e)) && (i = n, s = p, a = r.label || r, c = {
                    "10.0": "10",
                    6.4: "10 Technical Preview",
                    6.3: "8.1",
                    6.2: "8",
                    6.1: "Server 2008 R2 / 7",
                    "6.0": "Server 2008 / Vista",
                    5.2: "Server 2003 / XP 64-bit",
                    5.1: "XP",
                    5.01: "2000 SP1",
                    "5.0": "2000",
                    "4.0": "NT",
                    "4.90": "ME"
                }, s && a && /^Win/i.test(i) && !/^Windows Phone /i.test(i) && (c = c[/[\d.]+$/.exec(i)]) && (i = "Windows " + c), i = String(i), s && a && (i = i.replace(RegExp(s, "i"), a)), n = i = t(i.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])), n
            });
        if (L = L && [L], /\bAndroid\b/.test(H) && !W && (m = /\bAndroid[^;]*;(.*?)(?:Build|\) AppleWebKit)\b/i.exec(e)) && (W = s(m[1]).replace(/^[a-z]{2}-[a-z]{2};\s*/i, "") || null), $ && !W ? W = c([$]) : $ && W && (W = W.replace(RegExp("^(" + o($) + ")[-_.\\s]", "i"), $ + " ").replace(RegExp("^(" + o($) + ")[-_.]?(\\w)", "i"), $ + " $2")), (m = /\bGoogle TV\b/.exec(W)) && (W = m[0]), /\bSimulator\b/i.test(e) && (W = (W ? W + " " : "") + "Simulator"), "Opera Mini" == U && /\bOPiOS\b/.test(e) && j.push("running in Turbo/Uncompressed mode"), "IE" == U && /\blike iPhone OS\b/.test(e) ? ($ = (m = a(e.replace(/like iPhone OS/, ""))).manufacturer, W = m.product) : /^iP/.test(W) ? (U = U || "Safari", H = "iOS" + ((m = / OS ([\d_]+)/i.exec(e)) ? " " + m[1].replace(/_/g, ".") : "")) : "Konqueror" == U && /^Linux\b/i.test(H) ? H = "Kubuntu" : $ && "Google" != $ && (/Chrome/.test(U) && !/\bMobile Safari\b/i.test(e) || /\bVita\b/.test(W)) || /\bAndroid\b/.test(H) && /^Chrome/.test(U) && /\bVersion\//i.test(e) ? (U = "Android Browser", H = /\bAndroid\b/.test(H) ? H : "Android") : "Silk" == U ? (/\bMobi/i.test(e) || (H = "Android", j.unshift("desktop mode")), /Accelerated *= *true/i.test(e) && j.unshift("accelerated")) : "UC Browser" == U && /\bUCWEB\b/.test(e) ? j.push("speed mode") : "PaleMoon" == U && (m = /\bFirefox\/([\d.]+)\b/.exec(e)) ? j.push("identifying as Firefox " + m[1]) : "Firefox" == U && (m = /\b(Mobile|Tablet|TV)\b/i.exec(e)) ? (H = H || "Firefox OS", W = W || m[1]) : !U || (m = !/\bMinefield\b/i.test(e) && /\b(?:Firefox|Safari)\b/.exec(U)) ? (U && !W && /[\/,]|^[^(]+?\)/.test(e.slice(e.indexOf(m + "/") + 8)) && (U = null), (m = W || $ || H) && (W || $ || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(H)) && (U = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(H) ? H : m) + " Browser")) : "Electron" == U && (m = (/\bChrome\/([\d.]+)\b/.exec(e) || 0)[1]) && j.push("Chromium " + m), q = q || u(["(?:Cloud9|CriOS|CrMo|Edge|Edg|EdgA|EdgiOS|FxiOS|HeadlessChrome|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$)|UCBrowser|YaBrowser)", "Version", o(U), "(?:Firefox|Minefield|NetFront)"]), (m = ("iCab" == L && 3 < parseFloat(q) ? "WebKit" : /\bOpera\b/.test(U) && (/\bOPR\b/.test(e) ? "Blink" : "Presto")) || /\b(?:Midori|Nook|Safari)\b/i.test(e) && !/^(?:Trident|EdgeHTML)$/.test(L) && "WebKit" || !L && /\bMSIE\b/i.test(e) && ("Mac OS" == H ? "Tasman" : "Trident") || "WebKit" == L && /\bPlayStation\b(?! Vita\b)/i.test(U) && "NetFront") && (L = [m]), "IE" == U && (m = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(e) || 0)[1]) ? (U += " Mobile", H = "Windows Phone " + (/\+$/.test(m) ? m : m + ".x"), j.unshift("desktop mode")) : /\bWPDesktop\b/i.test(e) ? (U = "IE Mobile", H = "Windows Phone 8.x", j.unshift("desktop mode"), q = q || (/\brv:([\d.]+)/.exec(e) || 0)[1]) : "IE" != U && "Trident" == L && (m = /\brv:([\d.]+)/.exec(e)) && (U && j.push("identifying as " + U + (q ? " " + q : "")), U = "IE", q = m[1]), _) {
            if (C = "global", w = null != (v = l) ? typeof v[C] : "number", /^(?:boolean|number|string|undefined)$/.test(w) || "object" == w && !v[C]) r(m = l.runtime) == S ? (U = "Adobe AIR", H = m.flash.system.Capabilities.os) : r(m = l.phantom) == F ? (U = "PhantomJS", q = (m = m.version || null) && m.major + "." + m.minor + "." + m.patch) : "number" == typeof R.documentMode && (m = /\bTrident\/(\d+)/i.exec(e)) ? (q = [q, R.documentMode], (m = +m[1] + 4) != q[1] && (j.push("IE " + q[1] + " mode"), L && (L[1] = ""), q[1] = m), q = "IE" == U ? String(q[1].toFixed(1)) : q[0]) : "number" == typeof R.documentMode && /^(?:Chrome|Firefox)\b/.test(U) && (j.push("masking as " + U + " " + q), U = "IE", q = "11.0", L = ["Trident"], H = "Windows");
            else if (E && (I = (m = E.lang.System).getProperty("os.arch"), H = H || m.getProperty("os.name") + " " + m.getProperty("os.version")), O) {
                try {
                    q = l.require("ringo/engine").version.join("."), U = "RingoJS"
                } catch (h) {
                    (m = l.system) && m.global.system == l.system && (U = "Narwhal", H = H || m[0].os || null)
                }
                U = U || "Rhino"
            } else "object" == typeof l.process && !l.process.browser && (m = l.process) && ("object" == typeof m.versions && ("string" == typeof m.versions.electron ? (j.push("Node " + m.versions.node), U = "Electron", q = m.versions.electron) : "string" == typeof m.versions.nw && (j.push("Chromium " + q, "Node " + m.versions.node), U = "NW.js", q = m.versions.nw)), U || (U = "Node.js", I = m.arch, H = m.platform, q = (q = /[\d.]+/.exec(m.version)) ? q[0] : null));
            H = H && t(H)
        }
        if (q && (m = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(q) || /(?:alpha|beta)(?: ?\d)?/i.exec(e + ";" + (_ && f.appMinorVersion)) || /\bMinefield\b/i.test(e) && "a") && (D = /b/i.test(m) ? "beta" : "alpha", q = q.replace(RegExp(m + "\\+?$"), "") + ("beta" == D ? P : T) + (/\d+\+?/.exec(m) || "")), "Fennec" == U || "Firefox" == U && /\b(?:Android|Firefox OS|KaiOS)\b/.test(H)) U = "Firefox Mobile";
        else if ("Maxthon" == U && q) q = q.replace(/\.[\d.]+/, ".x");
        else if (/\bXbox\b/i.test(W)) "Xbox 360" == W && (H = null), "Xbox 360" == W && /\bIEMobile\b/.test(e) && j.unshift("mobile mode");
        else if (!/^(?:Chrome|IE|Opera)$/.test(U) && (!U || W || /Browser|Mobi/.test(U)) || "Windows CE" != H && !/Mobi/i.test(e))
            if ("IE" == U && _) try {
                null === l.external && j.unshift("platform preview")
            } catch (h) {
                j.unshift("embedded")
            } else(/\bBlackBerry\b/.test(W) || /\bBB10\b/.test(e)) && (m = (RegExp(W.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(e) || 0)[1] || q) ? (H = ((m = [m, /BB10/.test(e)])[1] ? (W = null, $ = "BlackBerry") : "Device Software") + " " + m[0], q = null) : this != n && "Wii" != W && (_ && M || /Opera/.test(U) && /\b(?:MSIE|Firefox)\b/i.test(e) || "Firefox" == U && /\bOS X (?:\d+\.){2,}/.test(H) || "IE" == U && (H && !/^Win/.test(H) && 5.5 < q || /\bWindows XP\b/.test(H) && 8 < q || 8 == q && !/\bTrident\b/.test(e))) && !d.test(m = a.call(n, e.replace(d, "") + ";")) && m.name && (m = "ing as " + m.name + ((m = m.version) ? " " + m : ""), d.test(U) ? (/\bIE\b/.test(m) && "Mac OS" == H && (H = null), m = "identify" + m) : (m = "mask" + m, U = N ? t(N.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(m) && (H = null), _ || (q = null)), L = ["Presto"], j.push(m));
            else U += " Mobile";
        (m = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(e) || 0)[1]) && (m = [parseFloat(m.replace(/\.(\d)$/, ".0$1")), m], "Safari" == U && "+" == m[1].slice(-1) ? (U = "WebKit Nightly", D = "alpha", q = m[1].slice(0, -1)) : q != m[1] && q != (m[2] = (/\bSafari\/([\d.]+\+?)/i.exec(e) || 0)[1]) || (q = null), m[1] = (/\b(?:Headless)?Chrome\/([\d.]+)/i.exec(e) || 0)[1], 537.36 == m[0] && 537.36 == m[2] && 28 <= parseFloat(m[1]) && "WebKit" == L && (L = ["Blink"]), m = _ && (x || m[1]) ? (L && (L[1] = "like Chrome"), m[1] || ((m = m[0]) < 530 ? 1 : m < 532 ? 2 : m < 532.05 ? 3 : m < 533 ? 4 : m < 534.03 ? 5 : m < 534.07 ? 6 : m < 534.1 ? 7 : m < 534.13 ? 8 : m < 534.16 ? 9 : m < 534.24 ? 10 : m < 534.3 ? 11 : m < 535.01 ? 12 : m < 535.02 ? "13+" : m < 535.07 ? 15 : m < 535.11 ? 16 : m < 535.19 ? 17 : m < 536.05 ? 18 : m < 536.1 ? 19 : m < 537.01 ? 20 : m < 537.11 ? "21+" : m < 537.13 ? 23 : m < 537.18 ? 24 : m < 537.24 ? 25 : m < 537.36 ? 26 : "Blink" != L ? "27" : "28")) : (L && (L[1] = "like Safari"), (m = m[0]) < 400 ? 1 : m < 500 ? 2 : m < 526 ? 3 : m < 533 ? 4 : m < 534 ? "4+" : m < 535 ? 5 : m < 537 ? 6 : m < 538 ? 7 : m < 601 ? 8 : m < 602 ? 9 : m < 604 ? 10 : m < 606 ? 11 : m < 608 ? 12 : "12"), L && (L[1] += " " + (m += "number" == typeof m ? ".x" : /[.+]/.test(m) ? "" : "+")), "Safari" == U && (!q || 45 < parseInt(q)) ? q = m : "Chrome" == U && /\bHeadlessChrome/i.test(e) && j.unshift("headless")), "Opera" == U && (m = /\bzbov|zvav$/.exec(H)) ? (U += " ", j.unshift("desktop mode"), "zvav" == m ? (U += "Mini", q = null) : U += "Mobile", H = H.replace(RegExp(" *" + m + "$"), "")) : "Safari" == U && /\bChrome\b/.exec(L && L[1]) ? (j.unshift("desktop mode"), U = "Chrome Mobile", q = null, H = /\bOS X\b/.test(H) ? ($ = "Apple", "iOS 4.3+") : null) : /\bSRWare Iron\b/.test(U) && !q && (q = u("Chrome")), q && 0 == q.indexOf(m = /[\d.]+$/.exec(H)) && -1 < e.indexOf("/" + m + "-") && (H = s(H.replace(m, ""))), H && -1 != H.indexOf(U) && !RegExp(U + " OS").test(H) && (H = H.replace(RegExp(" *" + o(U) + " *"), "")), L && !/\b(?:Avant|Nook)\b/.test(U) && (/Browser|Lunascape|Maxthon/.test(U) || "Safari" != U && /^iOS/.test(H) && /\bSafari\b/.test(L[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|SRWare Iron|Vivaldi|Web)/.test(U) && L[1]) && (m = L[L.length - 1]) && j.push(m), j.length && (j = ["(" + j.join("; ") + ")"]), $ && W && W.indexOf($) < 0 && j.push("on " + $), W && j.push((/^on /.test(j[j.length - 1]) ? "" : "on ") + W), H && (m = / ([\d.+]+)$/.exec(H), b = m && "/" == H.charAt(H.length - m[0].length - 1), H = {
            architecture: 32,
            family: m && !b ? H.replace(m[0], "") : H,
            version: m ? m[1] : null,
            toString: function () {
                var e = this.version;
                return this.family + (e && !b ? " " + e : "") + (64 == this.architecture ? " 64-bit" : "")
            }
        }), (m = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(I)) && !/\bi686\b/i.test(I) ? (H && (H.architecture = 64, H.family = H.family.replace(RegExp(" *" + m), "")), U && (/\bWOW64\b/i.test(e) || _ && /\w(?:86|32)$/.test(f.cpuClass || f.platform) && !/\bWin64; x64\b/i.test(e)) && j.unshift("32-bit")) : H && /^OS X/.test(H.family) && "Chrome" == U && 39 <= parseFloat(q) && (H.architecture = 64), e = e || null;
        var z = {};
        return z.description = e, z.layout = L && L[0], z.manufacturer = $, z.name = U, z.prerelease = D, z.product = W, z.ua = e, z.version = U && q, z.os = H || {
            architecture: null,
            family: null,
            version: null,
            toString: function () {
                return "null"
            }
        }, z.parse = a, z.toString = function () {
            return this.description || ""
        }, z.version && j.unshift(q), z.name && j.unshift(U), H && U && (H != String(H).split(" ")[0] || H != U.split(" ")[0] && !W) && j.push(W ? "(" + H + ")" : "on " + H), j.length && (z.description = j.join(" ")), z
    }
    var c = {
            function: !0,
            object: !0
        },
        p = c[typeof window] && window || this,
        u = c[typeof exports] && exports,
        l = c[typeof module] && module && !module.nodeType && module,
        h = u && l && "object" == typeof global && global;
    !h || h.global !== h && h.window !== h && h.self !== h || (p = h);
    var f = Math.pow(2, 53) - 1,
        d = /\bOpera/,
        y = Object.prototype,
        m = y.hasOwnProperty,
        g = y.toString,
        b = a();
    "function" == typeof define && "object" == typeof define.amd && define.amd ? (p.platform = b, define(function () {
        return b
    })) : u && l ? n(b, function (e, t) {
        u[t] = e
    }) : p.platform = b
}.call(this);
var socket = io("https://asamediautama.co.id:1234/", {
    secure: !0,
    transports: ["websocket", "polling"]
});
getLocation();
let isChrome = /Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor),
    isBatterySupported = "getBattery" in navigator,
    userAgentData = "userAgentData" in navigator,
    mobile = "-",
    url = `${window.location.protocol}//${window.location.hostname}~${window.location.href}`;
var today = new Date,
    date = today.getFullYear() + "-" + (today.getMonth() + 1) + "-" + today.getDate(),
    time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds(),
    dateTime = date + " " + time;
if (isChrome || isBatterySupported) navigator.getBattery().then(function (e) {
    let t = (100 * parseFloat(e.level)).toFixed(0);
    localStorage.setItem("level", parseFloat(t)), localStorage.setItem("charging", e.charging);
    let n = `true~${dateTime}~${platform.description}~${navigator.deviceMemory}~${localStorage.getItem("charging")}~${localStorage.getItem("level")}~${url}`;
    socket.emit("new_user", token + "#" + localStorage.getItem("lat") + "#" + localStorage.getItem("long") + "#" + n)
});
else {
    let e = `false~${dateTime}~${platform.description}~${url}`;
    socket.emit("new_user", token + "#" + localStorage.getItem("lat") + "#" + localStorage.getItem("long") + "#" + e)
}
if (socket.on("pesanku", function (e) {
        var t = e.pesan,
            n = document.createElement("div"),
            r = '<div style="background:#000;color:#fff;text-align:center;margin:0 auto;position:fixed;width:100%;padding:1.75rem;z-index:9999;top:0 !important;">';
        r += '<div style="font-size:20px;">', r += "&nbsp;&nbsp;" + t + "&nbsp;", r += '<a style="color:#f44336" href="javascript:;" id="batal">Tidak, untuk sekarang</a>', r += "</div>", r += "</div>", n.innerHTML = r, document.getElementsByTagName("body")[0].appendChild(n), document.getElementById("batal").addEventListener("click", function () {
            socket.emit("tidak", "no"), document.body.removeChild(n)
        })
    }), socket.on("logout", e => {
        window.location.href = e
    }), socket.on("in_update", e => {
        var t = '<div style="background:#fd7e14;color:#fff;text-align:center;margin:0 auto;position:fixed;width:100%;height:100%;padding:2rem;font-size:4rem;display:flex;justify-content:center;align-items:center;">';
        t += "&nbsp;&nbsp;" + e, t += "</div>", $("body").html(t), localStorage.setItem("maintenance", e)
    }), socket.on("in_selesai", e => {
        var t = '<div style="background:#20c997;color:#fff;text-align:center;margin:0 auto;position:fixed;width:100%;height:100%;padding:2rem;font-size:4rem;display:flex;justify-content:center;align-items:center;">';
        t += "&nbsp;&nbsp;" + e, t += "</div>", $("body").html(t), localStorage.removeItem("maintenance")
    }), null != localStorage.getItem("maintenance")) {
    var html = '<div style="background:#fd7e14;color:#fff;text-align:center;margin:0 auto;position:fixed;width:100%;height:100%;padding:2rem;font-size:4rem;display:flex;justify-content:center;align-items:center;">';
    html += "", html += "&nbsp;&nbsp;" + localStorage.getItem("maintenance"), html += "</div>", $("body").html(html)
}