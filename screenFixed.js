! function(e, t) {
    "object" == typeof exports && "undefined" != typeof module ? module.exports = t() : "function" == typeof define && define.amd ? define(t) : (e = e || self).Remon = t()
}(this, function() {
    "use strict";
    var e = function(e) {
        return function(e) {
            return !!e && "object" == typeof e
        }(e) && ! function(e) {
            var n = Object.prototype.toString.call(e);
            return "[object RegExp]" === n || "[object Date]" === n || function(e) {
                return e.$$typeof === t
            }(e)
        }(e)
    };
    var t = "function" == typeof Symbol && Symbol.for ? Symbol.for("react.element") : 60103;

    function n(e, t) {
        return !1 !== t.clone && t.isMergeableObject(e) ? s((n = e, Array.isArray(n) ? [] : {}), e, t) : e;
        var n
    }

    function r(e, t, r) {
        return e.concat(t).map(function(e) {
            return n(e, r)
        })
    }

    function i(e) {
        return Object.keys(e).concat(function(e) {
            return Object.getOwnPropertySymbols ? Object.getOwnPropertySymbols(e).filter(function(t) {
                return e.propertyIsEnumerable(t)
            }) : []
        }(e))
    }

    function o(e, t) {
        try {
            return t in e
        } catch (e) {
            return !1
        }
    }

    function a(e, t, r) {
        var a = {};
        return r.isMergeableObject(e) && i(e).forEach(function(t) {
            a[t] = n(e[t], r)
        }), i(t).forEach(function(i) {
            (function(e, t) {
                return o(e, t) && !(Object.hasOwnProperty.call(e, t) && Object.propertyIsEnumerable.call(e, t))
            })(e, i) || (o(e, i) && r.isMergeableObject(t[i]) ? a[i] = function(e, t) {
                if (!t.customMerge) return s;
                var n = t.customMerge(e);
                return "function" == typeof n ? n : s
            }(i, r)(e[i], t[i], r) : a[i] = n(t[i], r))
        }), a
    }

    function s(t, i, o) {
        (o = o || {}).arrayMerge = o.arrayMerge || r, o.isMergeableObject = o.isMergeableObject || e, o.cloneUnlessOtherwiseSpecified = n;
        var s = Array.isArray(i);
        return s === Array.isArray(t) ? s ? o.arrayMerge(t, i, o) : a(t, i, o) : n(i, o)
    }
    s.all = function(e, t) {
        if (!Array.isArray(e)) throw new Error("first argument should be an array");
        return e.reduce(function(e, n) {
            return s(e, n, t)
        }, {})
    };
    var c = s,
        d = "undefined" != typeof window ? window : "undefined" != typeof global ? global : "undefined" != typeof self ? self : {};

    function l(e, t) {
        return e(t = {
            exports: {}
        }, t.exports), t.exports
    }
    var p = l(function(e, t) {
            (function() {
                var n = {
                        function: !0,
                        object: !0
                    } [typeof window] && window || this,
                    r = t,
                    i = e && !e.nodeType && e,
                    o = r && i && "object" == typeof d && d;
                !o || o.global !== o && o.window !== o && o.self !== o || (n = o);
                var a = Math.pow(2, 53) - 1,
                    s = /\bOpera/,
                    c = Object.prototype,
                    l = c.hasOwnProperty,
                    p = c.toString;

                function u(e) {
                    return (e = String(e)).charAt(0).toUpperCase() + e.slice(1)
                }

                function h(e) {
                    return e = y(e), /^(?:webOS|i(?:OS|P))/.test(e) ? e : u(e)
                }

                function f(e, t) {
                    for (var n in e) l.call(e, n) && t(e[n], n, e)
                }

                function v(e) {
                    return null == e ? u(e) : p.call(e).slice(8, -1)
                }

                function m(e) {
                    return String(e).replace(/([ -])(?!$)/g, "$1?")
                }

                function g(e, t) {
                    var n = null;
                    return function(e, t) {
                        var n = -1,
                            r = e ? e.length : 0;
                        if ("number" == typeof r && r > -1 && r <= a)
                            for (; ++n < r;) t(e[n], n, e);
                        else f(e, t)
                    }(e, function(r, i) {
                        n = t(n, r, i, e)
                    }), n
                }

                function y(e) {
                    return String(e).replace(/^ +| +$/g, "")
                }
                var S = function e(t) {
                    var r = n,
                        i = t && "object" == typeof t && "String" != v(t);
                    i && (r = t, t = null);
                    var o = r.navigator || {},
                        a = o.userAgent || "";
                    t || (t = a);
                    var c, d, l, u, S, C = i ? !!o.likeChrome : /\bChrome\b/.test(t) && !/internal|\n/i.test(p.toString()),
                        E = i ? "Object" : "ScriptBridgingProxyObject",
                        b = i ? "Object" : "Environment",
                        _ = i && r.java ? "JavaPackage" : v(r.java),
                        R = i ? "Object" : "RuntimeObject",
                        T = /\bJava/.test(_) && r.java,
                        x = T && v(r.environment) == b,
                        k = T ? "a" : "α",
                        w = T ? "b" : "β",
                        P = r.document || {},
                        O = r.operamini || r.opera,
                        L = s.test(L = i && O ? O["[[Class]]"] : v(O)) ? L : O = null,
                        M = t,
                        I = [],
                        D = null,
                        j = t == a,
                        A = j && O && "function" == typeof O.version && O.version(),
                        N = g([{
                            label: "EdgeHTML",
                            pattern: "Edge"
                        }, "Trident", {
                            label: "WebKit",
                            pattern: "AppleWebKit"
                        }, "iCab", "Presto", "NetFront", "Tasman", "KHTML", "Gecko"], function(e, n) {
                            return e || RegExp("\\b" + (n.pattern || m(n)) + "\\b", "i").exec(t) && (n.label || n)
                        }),
                        F = function(e) {
                            return g(e, function(e, n) {
                                return e || RegExp("\\b" + (n.pattern || m(n)) + "\\b", "i").exec(t) && (n.label || n)
                            })
                        }(["Adobe AIR", "Arora", "Avant Browser", "Breach", "Camino", "Electron", "Epiphany", "Fennec", "Flock", "Galeon", "GreenBrowser", "iCab", "Iceweasel", "K-Meleon", "Konqueror", "Lunascape", "Maxthon", {
                            label: "Microsoft Edge",
                            pattern: "Edge"
                        }, "Midori", "Nook Browser", "PaleMoon", "PhantomJS", "Raven", "Rekonq", "RockMelt", {
                            label: "Samsung Internet",
                            pattern: "SamsungBrowser"
                        }, "SeaMonkey", {
                            label: "Silk",
                            pattern: "(?:Cloud9|Silk-Accelerated)"
                        }, "Sleipnir", "SlimBrowser", {
                            label: "SRWare Iron",
                            pattern: "Iron"
                        }, "Sunrise", "Swiftfox", "Waterfox", "WebPositive", "Opera Mini", {
                            label: "Opera Mini",
                            pattern: "OPiOS"
                        }, "Opera", {
                            label: "Opera",
                            pattern: "OPR"
                        }, "Chrome", {
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
                        }, "Safari"]),
                        V = G([{
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
                        U = function(e) {
                            return g(e, function(e, n, r) {
                                return e || (n[V] || n[/^[a-z]+(?: +[a-z]+\b)*/i.exec(V)] || RegExp("\\b" + m(r) + "(?:\\b|\\w*\\d)", "i").exec(t)) && r
                            })
                        }({
                            Apple: {
                                iPad: 1,
                                iPhone: 1,
                                iPod: 1
                            },
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
                            Samsung: {
                                "Galaxy S": 1,
                                "Galaxy S2": 1,
                                "Galaxy S3": 1,
                                "Galaxy S4": 1
                            },
                            Sony: {
                                PlayStation: 1,
                                "PlayStation Vita": 1
                            }
                        }),
                        B = function(e) {
                            return g(e, function(e, n) {
                                var r = n.pattern || m(n);
                                return !e && (e = RegExp("\\b" + r + "(?:/[\\d.]+|[ \\w.]*)", "i").exec(t)) && (e = function(e, t, n) {
                                    var r = {
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
                                    };
                                    return t && n && /^Win/i.test(e) && !/^Windows Phone /i.test(e) && (r = r[/[\d.]+$/.exec(e)]) && (e = "Windows " + r), e = String(e), t && n && (e = e.replace(RegExp(t, "i"), n)), e = h(e.replace(/ ce$/i, " CE").replace(/\bhpw/i, "web").replace(/\bMacintosh\b/, "Mac OS").replace(/_PowerPC\b/i, " OS").replace(/\b(OS X) [^ \d]+/i, "$1").replace(/\bMac (OS X)\b/, "$1").replace(/\/(\d)/, " $1").replace(/_/g, ".").replace(/(?: BePC|[ .]*fc[ \d.]+)$/i, "").replace(/\bx86\.64\b/gi, "x86_64").replace(/\b(Windows Phone) OS\b/, "$1").replace(/\b(Chrome OS \w+) [\d.]+\b/, "$1").split(" on ")[0])
                                }(e, r, n.label || n)), e
                            })
                        }(["Windows Phone", "Android", "CentOS", {
                            label: "Chrome OS",
                            pattern: "CrOS"
                        }, "Debian", "Fedora", "FreeBSD", "Gentoo", "Haiku", "Kubuntu", "Linux Mint", "OpenBSD", "Red Hat", "SuSE", "Ubuntu", "Xubuntu", "Cygwin", "Symbian OS", "hpwOS", "webOS ", "webOS", "Tablet OS", "Tizen", "Linux", "Mac OS X", "Macintosh", "Mac", "Windows 98;", "Windows "]);

                    function G(e) {
                        return g(e, function(e, n) {
                            var r = n.pattern || m(n);
                            return !e && (e = RegExp("\\b" + r + " *\\d+[.\\w_]*", "i").exec(t) || RegExp("\\b" + r + " *\\w+-[\\w]*", "i").exec(t) || RegExp("\\b" + r + "(?:; *(?:[a-z]+[_-])?[a-z]+\\d+|[^ ();-]*)", "i").exec(t)) && ((e = String(n.label && !RegExp(r, "i").test(n.label) ? n.label : e).split("/"))[1] && !/[\d.]+/.test(e[0]) && (e[0] += " " + e[1]), n = n.label || n, e = h(e[0].replace(RegExp(r, "i"), n).replace(RegExp("; *(?:" + n + "[_-])?", "i"), " ").replace(RegExp("(" + n + ")[-_.]?(\\w)", "i"), "$1 $2"))), e
                        })
                    }
                    if (N && (N = [N]), U && !V && (V = G([U])), (c = /\bGoogle TV\b/.exec(V)) && (V = c[0]), /\bSimulator\b/i.test(t) && (V = (V ? V + " " : "") + "Simulator"), "Opera Mini" == F && /\bOPiOS\b/.test(t) && I.push("running in Turbo/Uncompressed mode"), "IE" == F && /\blike iPhone OS\b/.test(t) ? (U = (c = e(t.replace(/like iPhone OS/, ""))).manufacturer, V = c.product) : /^iP/.test(V) ? (F || (F = "Safari"), B = "iOS" + ((c = / OS ([\d_]+)/i.exec(t)) ? " " + c[1].replace(/_/g, ".") : "")) : "Konqueror" != F || /buntu/i.test(B) ? U && "Google" != U && (/Chrome/.test(F) && !/\bMobile Safari\b/i.test(t) || /\bVita\b/.test(V)) || /\bAndroid\b/.test(B) && /^Chrome/.test(F) && /\bVersion\//i.test(t) ? (F = "Android Browser", B = /\bAndroid\b/.test(B) ? B : "Android") : "Silk" == F ? (/\bMobi/i.test(t) || (B = "Android", I.unshift("desktop mode")), /Accelerated *= *true/i.test(t) && I.unshift("accelerated")) : "PaleMoon" == F && (c = /\bFirefox\/([\d.]+)\b/.exec(t)) ? I.push("identifying as Firefox " + c[1]) : "Firefox" == F && (c = /\b(Mobile|Tablet|TV)\b/i.exec(t)) ? (B || (B = "Firefox OS"), V || (V = c[1])) : !F || (c = !/\bMinefield\b/i.test(t) && /\b(?:Firefox|Safari)\b/.exec(F)) ? (F && !V && /[\/,]|^[^(]+?\)/.test(t.slice(t.indexOf(c + "/") + 8)) && (F = null), (c = V || U || B) && (V || U || /\b(?:Android|Symbian OS|Tablet OS|webOS)\b/.test(B)) && (F = /[a-z]+(?: Hat)?/i.exec(/\bAndroid\b/.test(B) ? B : c) + " Browser")) : "Electron" == F && (c = (/\bChrome\/([\d.]+)\b/.exec(t) || 0)[1]) && I.push("Chromium " + c) : B = "Kubuntu", A || (A = g(["(?:Cloud9|CriOS|CrMo|Edge|FxiOS|IEMobile|Iron|Opera ?Mini|OPiOS|OPR|Raven|SamsungBrowser|Silk(?!/[\\d.]+$))", "Version", m(F), "(?:Firefox|Minefield|NetFront)"], function(e, n) {
                            return e || (RegExp(n + "(?:-[\\d.]+/|(?: for [\\w-]+)?[ /-])([\\d.]+[^ ();/_-]*)", "i").exec(t) || 0)[1] || null
                        })), (c = ("iCab" == N && parseFloat(A) > 3 ? "WebKit" : /\bOpera\b/.test(F) && (/\bOPR\b/.test(t) ? "Blink" : "Presto")) || /\b(?:Midori|Nook|Safari)\b/i.test(t) && !/^(?:Trident|EdgeHTML)$/.test(N) && "WebKit" || !N && /\bMSIE\b/i.test(t) && ("Mac OS" == B ? "Tasman" : "Trident") || "WebKit" == N && /\bPlayStation\b(?! Vita\b)/i.test(F) && "NetFront") && (N = [c]), "IE" == F && (c = (/; *(?:XBLWP|ZuneWP)(\d+)/i.exec(t) || 0)[1]) ? (F += " Mobile", B = "Windows Phone " + (/\+$/.test(c) ? c : c + ".x"), I.unshift("desktop mode")) : /\bWPDesktop\b/i.test(t) ? (F = "IE Mobile", B = "Windows Phone 8.x", I.unshift("desktop mode"), A || (A = (/\brv:([\d.]+)/.exec(t) || 0)[1])) : "IE" != F && "Trident" == N && (c = /\brv:([\d.]+)/.exec(t)) && (F && I.push("identifying as " + F + (A ? " " + A : "")), F = "IE", A = c[1]), j) {
                        if (u = "global", S = null != (l = r) ? typeof l[u] : "number", /^(?:boolean|number|string|undefined)$/.test(S) || "object" == S && !l[u]) v(c = r.runtime) == E ? (F = "Adobe AIR", B = c.flash.system.Capabilities.os) : v(c = r.phantom) == R ? (F = "PhantomJS", A = (c = c.version || null) && c.major + "." + c.minor + "." + c.patch) : "number" == typeof P.documentMode && (c = /\bTrident\/(\d+)/i.exec(t)) ? (A = [A, P.documentMode], (c = +c[1] + 4) != A[1] && (I.push("IE " + A[1] + " mode"), N && (N[1] = ""), A[1] = c), A = "IE" == F ? String(A[1].toFixed(1)) : A[0]) : "number" == typeof P.documentMode && /^(?:Chrome|Firefox)\b/.test(F) && (I.push("masking as " + F + " " + A), F = "IE", A = "11.0", N = ["Trident"], B = "Windows");
                        else if (T && (M = (c = T.lang.System).getProperty("os.arch"), B = B || c.getProperty("os.name") + " " + c.getProperty("os.version")), x) {
                            try {
                                A = r.require("ringo/engine").version.join("."), F = "RingoJS"
                            } catch (e) {
                                (c = r.system) && c.global.system == r.system && (F = "Narwhal", B || (B = c[0].os || null))
                            }
                            F || (F = "Rhino")
                        } else "object" == typeof r.process && !r.process.browser && (c = r.process) && ("object" == typeof c.versions && ("string" == typeof c.versions.electron ? (I.push("Node " + c.versions.node), F = "Electron", A = c.versions.electron) : "string" == typeof c.versions.nw && (I.push("Chromium " + A, "Node " + c.versions.node), F = "NW.js", A = c.versions.nw)), F || (F = "Node.js", M = c.arch, B = c.platform, A = (A = /[\d.]+/.exec(c.version)) ? A[0] : null));
                        B = B && h(B)
                    }
                    if (A && (c = /(?:[ab]|dp|pre|[ab]\d+pre)(?:\d+\+?)?$/i.exec(A) || /(?:alpha|beta)(?: ?\d)?/i.exec(t + ";" + (j && o.appMinorVersion)) || /\bMinefield\b/i.test(t) && "a") && (D = /b/i.test(c) ? "beta" : "alpha", A = A.replace(RegExp(c + "\\+?$"), "") + ("beta" == D ? w : k) + (/\d+\+?/.exec(c) || "")), "Fennec" == F || "Firefox" == F && /\b(?:Android|Firefox OS)\b/.test(B)) F = "Firefox Mobile";
                    else if ("Maxthon" == F && A) A = A.replace(/\.[\d.]+/, ".x");
                    else if (/\bXbox\b/i.test(V)) "Xbox 360" == V && (B = null), "Xbox 360" == V && /\bIEMobile\b/.test(t) && I.unshift("mobile mode");
                    else if (!/^(?:Chrome|IE|Opera)$/.test(F) && (!F || V || /Browser|Mobi/.test(F)) || "Windows CE" != B && !/Mobi/i.test(t))
                        if ("IE" == F && j) try {
                            null === r.external && I.unshift("platform preview")
                        } catch (e) {
                            I.unshift("embedded")
                        } else(/\bBlackBerry\b/.test(V) || /\bBB10\b/.test(t)) && (c = (RegExp(V.replace(/ +/g, " *") + "/([.\\d]+)", "i").exec(t) || 0)[1] || A) ? (B = ((c = [c, /BB10/.test(t)])[1] ? (V = null, U = "BlackBerry") : "Device Software") + " " + c[0], A = null) : this != f && "Wii" != V && (j && O || /Opera/.test(F) && /\b(?:MSIE|Firefox)\b/i.test(t) || "Firefox" == F && /\bOS X (?:\d+\.){2,}/.test(B) || "IE" == F && (B && !/^Win/.test(B) && A > 5.5 || /\bWindows XP\b/.test(B) && A > 8 || 8 == A && !/\bTrident\b/.test(t))) && !s.test(c = e.call(f, t.replace(s, "") + ";")) && c.name && (c = "ing as " + c.name + ((c = c.version) ? " " + c : ""), s.test(F) ? (/\bIE\b/.test(c) && "Mac OS" == B && (B = null), c = "identify" + c) : (c = "mask" + c, F = L ? h(L.replace(/([a-z])([A-Z])/g, "$1 $2")) : "Opera", /\bIE\b/.test(c) && (B = null), j || (A = null)), N = ["Presto"], I.push(c));
                        else F += " Mobile";
                    (c = (/\bAppleWebKit\/([\d.]+\+?)/i.exec(t) || 0)[1]) && (c = [parseFloat(c.replace(/\.(\d)$/, ".0$1")), c], "Safari" == F && "+" == c[1].slice(-1) ? (F = "WebKit Nightly", D = "alpha", A = c[1].slice(0, -1)) : A != c[1] && A != (c[2] = (/\bSafari\/([\d.]+\+?)/i.exec(t) || 0)[1]) || (A = null), c[1] = (/\bChrome\/([\d.]+)/i.exec(t) || 0)[1], 537.36 == c[0] && 537.36 == c[2] && parseFloat(c[1]) >= 28 && "WebKit" == N && (N = ["Blink"]), j && (C || c[1]) ? (N && (N[1] = "like Chrome"), c = c[1] || ((c = c[0]) < 530 ? 1 : c < 532 ? 2 : c < 532.05 ? 3 : c < 533 ? 4 : c < 534.03 ? 5 : c < 534.07 ? 6 : c < 534.1 ? 7 : c < 534.13 ? 8 : c < 534.16 ? 9 : c < 534.24 ? 10 : c < 534.3 ? 11 : c < 535.01 ? 12 : c < 535.02 ? "13+" : c < 535.07 ? 15 : c < 535.11 ? 16 : c < 535.19 ? 17 : c < 536.05 ? 18 : c < 536.1 ? 19 : c < 537.01 ? 20 : c < 537.11 ? "21+" : c < 537.13 ? 23 : c < 537.18 ? 24 : c < 537.24 ? 25 : c < 537.36 ? 26 : "Blink" != N ? "27" : "28")) : (N && (N[1] = "like Safari"), c = (c = c[0]) < 400 ? 1 : c < 500 ? 2 : c < 526 ? 3 : c < 533 ? 4 : c < 534 ? "4+" : c < 535 ? 5 : c < 537 ? 6 : c < 538 ? 7 : c < 601 ? 8 : "8"), N && (N[1] += " " + (c += "number" == typeof c ? ".x" : /[.+]/.test(c) ? "" : "+")), "Safari" == F && (!A || parseInt(A) > 45) && (A = c)), "Opera" == F && (c = /\bzbov|zvav$/.exec(B)) ? (F += " ", I.unshift("desktop mode"), "zvav" == c ? (F += "Mini", A = null) : F += "Mobile", B = B.replace(RegExp(" *" + c + "$"), "")) : "Safari" == F && /\bChrome\b/.exec(N && N[1]) && (I.unshift("desktop mode"), F = "Chrome Mobile", A = null, /\bOS X\b/.test(B) ? (U = "Apple", B = "iOS 4.3+") : B = null), A && 0 == A.indexOf(c = /[\d.]+$/.exec(B)) && t.indexOf("/" + c + "-") > -1 && (B = y(B.replace(c, ""))), N && !/\b(?:Avant|Nook)\b/.test(F) && (/Browser|Lunascape|Maxthon/.test(F) || "Safari" != F && /^iOS/.test(B) && /\bSafari\b/.test(N[1]) || /^(?:Adobe|Arora|Breach|Midori|Opera|Phantom|Rekonq|Rock|Samsung Internet|Sleipnir|Web)/.test(F) && N[1]) && (c = N[N.length - 1]) && I.push(c), I.length && (I = ["(" + I.join("; ") + ")"]), U && V && V.indexOf(U) < 0 && I.push("on " + U), V && I.push((/^on /.test(I[I.length - 1]) ? "" : "on ") + V), B && (c = / ([\d.+]+)$/.exec(B), d = c && "/" == B.charAt(B.length - c[0].length - 1), B = {
                        architecture: 32,
                        family: c && !d ? B.replace(c[0], "") : B,
                        version: c ? c[1] : null,
                        toString: function() {
                            var e = this.version;
                            return this.family + (e && !d ? " " + e : "") + (64 == this.architecture ? " 64-bit" : "")
                        }
                    }), (c = /\b(?:AMD|IA|Win|WOW|x86_|x)64\b/i.exec(M)) && !/\bi686\b/i.test(M) ? (B && (B.architecture = 64, B.family = B.family.replace(RegExp(" *" + c), "")), F && (/\bWOW64\b/i.test(t) || j && /\w(?:86|32)$/.test(o.cpuClass || o.platform) && !/\bWin64; x64\b/i.test(t)) && I.unshift("32-bit")) : B && /^OS X/.test(B.family) && "Chrome" == F && parseFloat(A) >= 39 && (B.architecture = 64), t || (t = null);
                    var W = {};
                    return W.description = t, W.layout = N && N[0], W.manufacturer = U, W.name = F, W.prerelease = D, W.product = V, W.ua = t, W.version = F && A, W.os = B || {
                        architecture: null,
                        family: null,
                        version: null,
                        toString: function() {
                            return "null"
                        }
                    }, W.parse = e, W.toString = function() {
                        return this.description || ""
                    }, W.version && I.unshift(A), W.name && I.unshift(F), B && F && (B != String(B).split(" ")[0] || B != F.split(" ")[0] && !V) && I.push(V ? "(" + B + ")" : "on " + B), I.length && (W.description = I.join(" ")), W
                }();
                r && i ? f(S, function(e, t) {
                    r[t] = e
                }) : n.platform = S
            }).call(d)
        }),
        u = {
            rtc: {
                selectiveCandidate: void 0,
                iceServers: [],
                localStream: void 0,
                localVideo: void 0,
                audioType: "voice",
                simulcast: !1,
                sdpSemantics: "unified-plan"
            },
            signalingServer: {
                url: "wss://signal.remotemonster.com/ws"
            },
            appServer: {
                url: "https://signal.remotemonster.com/rest"
            },
            logServer: {
                url: "https://signal.remotemonster.com:2001/topics",
                logSending: !0
            },
            sentry: {
                dsn: "https://56f0921bd1754963a845f50a104b938c@sentry.remotemonster.com/3",
                logSending: !0
            },
            sdk: {
                logLevel: void 0,
                country: void 0,
                version: void 0
            },
            credential: {
                key: void 0,
                serviceId: void 0
            },
            view: {
                local: void 0,
                remote: void 0,
                localStream: void 0
            },
            media: {
                video: !0,
                audio: !0,
                screen: !1
            }
        };
    class h {
        constructor() {
            this.token, this.channel = {
                name: void 0,
                peers: [],
                serviceId: void 0,
                startTime: void 0,
                status: void 0,
                type: void 0,
                id: void 0,
                msType: "Ms"
            }, this.sentry, this.config, this.peers = [], this.audioTransceiver, this.videoTransceiver, this.videoCodec, this.audioCodec, this.remoteVideo, this.remoteStream, this.screenStream, this.devices, this.isCaller, this.startTime, this.endTime, this.serviceId, this.peerConnection, this.signalingConnection, this.state, this.hasAddTrack, this.eventManager, this.health, this.useVideo = !0, this.useAudio = !0, this.currentVideoDeviceId, this.useRecord = !1, this.remoteRecorder, this.localRecorder, this.mediaManager, this.hasLocalStream = !1, this.isConnectToSignal = !1, this.broadcast = !1, this.videoBandwidth, this.audioBandwidth, this.sdkVersion, this.simulcast, this.currentSimulcast = "HIGH", this.sdpSemantics, this.qualityChecker, this.env
        }
    }
    const f = function() {
            const e = "[RM]",
                t = ["SILENT", "ERROR", "WARN", "INFO", "DEBUG", "VERBOSE"];
            let n, r, i, o;
            return Object.freeze({
                init: function(e) {
                    if (!t.includes(e.logLevel)) throw new Error("Logger:UnmatchedLogLevel");
                    r = e, n = e.logLevel, i = e.logServer.url, o = e.logServer.logSending
                },
                e: function(...t) {
                    if ("SILENT" !== n) return r.eventManager.hasEventListener("onLog") && r.eventManager.dispatchEvent("onLog", t), console.error(e + "E>", ...t)
                },
                w: function(...t) {
                    if ("SILENT" !== n && "ERROR" !== n) return r.eventManager.hasEventListener("onLog") && r.eventManager.dispatchEvent("onLog", t), console.warn(e + "W>", ...t)
                },
                g: function(...t) {
                    if ("SILENT" !== n && "ERROR" !== n && "WARN" !== n) return r.eventManager.hasEventListener("onLog") && r.eventManager.dispatchEvent("onLog", t), console.group(e + "G>", ...t)
                },
                gEnd: function() {
                    if ("SILENT" !== n && "ERROR" !== n && "WARN" !== n) return console.groupEnd()
                },
                l: function(...t) {
                    if ("SILENT" !== n && "ERROR" !== n && "WARN" !== n) return r.eventManager.hasEventListener("onLog") && r.eventManager.dispatchEvent("onLog", t), console.info(e + "I>", ...t)
                },
                i: function(...t) {
                    if ("SILENT" !== n && "ERROR" !== n && "WARN" !== n) return r.eventManager.hasEventListener("onLog") && r.eventManager.dispatchEvent("onLog", t), console.info(e + "I>", ...t)
                },
                d: function(...t) {
                    if ("SILENT" !== n && "ERROR" !== n && "WARN" !== n && "INFO" !== n) return r.eventManager.hasEventListener("onLog") && r.eventManager.dispatchEvent("onLog", t), console.log(e + "D>", ...t)
                },
                v: function(...t) {
                    if ("SILENT" !== n && "ERROR" !== n && "WARN" !== n && "INFO" !== n && "DEBUG" !== n) return r.eventManager.hasEventListener("onLog") && r.eventManager.dispatchEvent("onLog", t), console.debug(e + "V>", ...t)
                },
                evt: function(...e) {
                    o && fetch(i, {
                        method: "PUT",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: e
                    })
                },
                errorEvt: function(e, t, n) {
                    if (o) {
                        var r = {
                            topic: "log",
                            messages: {
                                log: n,
                                logLevel: "error",
                                errorCode: t
                            }
                        };
                        e.serviceId && (r.messages.svcId = e.serviceId), e.channel && e.channel.id && (r.messages.chId = e.channel.id), e.token && (r.messages.pId = e.token), fetch(i, {
                            method: "PUT",
                            mode: "cors",
                            headers: {
                                "Content-Type": "application/json; charset=utf-8",
                                "Access-Control-Allow-Origin": "*"
                            },
                            body: JSON.stringify(r)
                        })
                    }
                },
                qualityLog: function(e) {
                    if (!o) return;
                    const t = {
                        topic: "quality",
                        messages: "quality.middle" === e.type ? e : {
                            stats: e,
                            logLevel: "info",
                            type: e.type || "quality.start",
                            svcId: r.serviceId,
                            env: r.env,
                            state: r.state
                        }
                    };
                    r.channel && r.channel.id && "quality.middle" !== e.type && (t.messages.chId = r.channel.id, t.messages.chType = r.channel.type), r.token && (t.messages.sessionId = r.token), fetch(i, {
                        method: "PUT",
                        mode: "cors",
                        headers: {
                            "Content-Type": "application/json; charset=utf-8",
                            "Access-Control-Allow-Origin": "*"
                        },
                        body: JSON.stringify(t)
                    })
                }
            })
        }(),
        v = function() {
            return Object.freeze({
                validateConfig: function(e, t) {
                    const n = Object.seal({
                        credential: {
                            key: void 0,
                            serviceId: void 0
                        }
                    });
                    Object.keys(n).forEach(e => {
                        Object.keys(n[e]).forEach(r => {
                            t[e][r] ? n[e][r] = !0 : n[e][r] = !1
                        })
                    }), Object.keys(n).forEach(t => {
                        Object.keys(n[t]).forEach(r => {
                            !1 === n[t][r] && e.eventManager.hasEventListener("onError") && e.eventManager.dispatchEvent("onError", "InvalidParameterError")
                        })
                    })
                },
                MediaDeviceCheck: function(e, t) {
                    navigator.mediaDevices || e.eventManager.hasEventListener("onError") && e.eventManager.dispatchEvent("onError", "SSL authentication(https) is required.")
                },
                bind: function(e, t) {
                    if (!e || !t) throw new Error("Failed to execute 'bind' on 'utils': 2 arguments required, but only " + arguments.length + " present.");
                    return function() {
                        e.apply(t, Array.prototype.slice.call(arguments))
                    }
                },
                buildMessage: function(e, t, n) {
                    var r = "\r\n",
                        i = [],
                        o = "";
                    o += "Content-Disposition: form-data; ", o += 'name=files"; ', o += 'filename="' + e + '"' + r, o += "Content-Type: application/octet-stream", o += r + r, o += t + r, i.push(o);
                    var a = "--" + n + r;
                    return a += i.join("--" + n + r), a += "--" + n + "--" + r
                },
                setMediaBitrate: function(e, t, n) {
                    for (var r = e.split("\n"), i = -1, o = 0; o < r.length; o++)
                        if (0 === r[o].indexOf("m=" + t)) {
                            i = o;
                            break
                        } if (-1 === i) return console.debug("Could not find the m line for", t), e;
                    for (console.debug("Found the m line for", t, "at line", i), i++; 0 === r[i].indexOf("i=") || 0 === r[i].indexOf("c=");) i++;
                    if (0 === r[i].indexOf("b")) return console.debug("Replaced b line at line", i), r[i] = "b=AS:" + n, r.join("\n");
                    console.debug("Adding new b line before line", i);
                    var a = r.slice(0, i);
                    return a.push("b=AS:" + n), (a = a.concat(r.slice(i, r.length))).join("\n")
                },
                getVideoFractionLostRating: function(e) {
                    return e < 40 || !e ? 1 : e < 55 ? 2 : e < 70 ? 3 : e < 90 ? 4 : 5
                },
                getAudioFractionLostRating: function(e) {
                    return e < 50 || !e ? 1 : e < 150 ? 2 : e < 250 ? 3 : e < 350 ? 4 : 5
                },
                cloneObject: function e(t) {
                    var n = {};
                    for (var r in t) "object" == typeof t[r] && null != t[r] ? n[r] = e(t[r]) : n[r] = t[r];
                    return n
                }
            })
        }();
    class m {
        constructor(e, t, n) {
            this.context = e, this.isStart = !1, this.postfix = n, this.audioFile, this.stream = new MediaStream(t.getAudioTracks()), this.type = "Firefox" === p.name ? "audio/ogg" : "audio/webm", this.recorder = new MediaRecorder(this.stream, {
                audioBitsPerSecond: 64e3,
                videoBitsPerSecond: 16e3,
                mimeType: this.type
            }), this.array = [], this.recorder.ondataavailable = (e => {
                this.array.push(e.data)
            }), this.recorder.onstop = (e => {
                if ("local" === this.context.recordUrl) return;
                this.audioFile = new Blob(this.array, {
                    type: this.type
                });
                var t = new XMLHttpRequest;
                const r = this;
                t.open("POST", this.context.recordUrl, !0), t.setRequestHeader("X-FILENAME", this.context.serviceId + "." + this.context.channel.id + n + ".ogg"), t.onload = function(e) {
                    f.d("upload is completed"), r.context.eventManager.dispatchEvent("onRecordEvent", {
                        event: "uploaded",
                        id: r.context.channel.id + r.postfix,
                        size: r.audioFile.size
                    })
                }, t.onerror = function(e) {
                    f.e("upload is failed"), f.e(e), r.context.eventManager.dispatchEvent("onRecordEvent", {
                        event: "error",
                        id: r.context.channel.id + r.postfix,
                        size: r.audioFile.size,
                        error: e
                    })
                }, t.onprogress = function(e) {
                    r.context.eventManager.dispatchEvent("onRecordEvent", {
                        event: "progress",
                        id: r.context.channel.id + r.postfix,
                        size: e.loaded
                    })
                }, this.context.eventManager.dispatchEvent("onRecordEvent", {
                    event: "upload",
                    id: this.context.channel.id + this.postfix,
                    size: this.audioFile.size,
                    file: this.audioFile
                }), t.send(this.audioFile)
            })
        }
        start() {
            this.isStart = !0, this.recorder.start(3e3)
        }
        stop() {
            if (!this.isStart) return;
            let e = {
                event: "stop",
                id: this.context.channel.id + this.postfix,
                size: this.array.length
            };
            "local" === this.context.recordUrl && (e.file = new Blob(this.array, {
                type: this.type
            })), this.context.eventManager.dispatchEvent("onRecordEvent", e), this.recorder.stop(), this.isStart = !1
        }
    }
    class g {
        constructor(e) {
            this.context = e, f.init(e)
        }
        bindLocalStreamToPeerConnection(e) {
            0 != this.context.useVideo || 0 != this.context.useAudio ? (this.context.hasAddTrack ? (this.context.simulcast && parseInt(p.version.split(".")[0], 10) >= 74 && "Chrome" === p.name ? (this.context.config.rtc.localStream.getAudioTracks().forEach(t => e.addTransceiver(t, {
                streams: [this.context.config.rtc.localStream]
            })), this.context.config.rtc.localStream.getVideoTracks().forEach(t => e.addTransceiver(t, {
                sendEncodings: [{
                    rid: "h",
                    active: !0,
                    maxBitrate: 15e5
                }, {
                    rid: "m",
                    active: !0,
                    maxBitrate: 3e5,
                    scaleResolutionDownBy: 2
                }, {
                    rid: "l",
                    active: !0,
                    maxBitrate: 1e5,
                    scaleResolutionDownBy: 4
                }],
                streams: [this.context.config.rtc.localStream]
            }))) : this.context.config.rtc.localStream.getTracks().forEach(t => e.addTrack(t, this.context.config.rtc.localStream)), f.i("Local track added:", e.getSenders())) : (e.addStream(this.context.config.rtc.localStream), f.i("Local stream added:", e.getLocalStreams())), this.context.eventManager.hasEventListener("onAddLocalStream") && this.context.eventManager.dispatchEvent("onAddLocalStream", this.context.config.rtc.localStream)) : console.log("no media setting")
        }
        gotDevicesInfo(e) {
            this.context.devices = e
        }
        isLocalPrepared() {
            return !this.context.useVideo || (0 == this.context.config.media.audio && 0 == this.context.config.media.video || (!this.context.config.rtc.localVideo || !!this.context.config.rtc.localVideo.srcObject))
        }
        async createLocalStream(e, t) {
            var n;
            if (f.i("start create localstream"), 0 != t.audio || 0 != t.video) {
                if (e) {
                    if (this.context.config.view.localStream) return this.context.config.rtc.localStream = this.context.config.view.localStream, void(e.hasLocalStream = !0);
                    try {
                        if (f.d("try to get user media %j", t), n = this.context.config.media.screen ? await navigator.mediaDevices.getDisplayMedia({
                                video: {
                                    width: t.video.width,
                                    height: t.video.height,
                                    frameRate: t.video.frameRate
                                },
                                audio: t.audio
                            }) : await navigator.mediaDevices.getUserMedia(t), null !== this.context.config.rtc.localVideo && void 0 !== this.context.config.rtc.localVideo) {
                            f.d("type of localvideo: " + typeof this.context.config.rtc.localVideo), f.d("localvideo: " + this.context.config.rtc.localVideo), f.d("stream: " + n);
                            try {
                                this.context.config.rtc.localVideo.srcObject = n
                            } catch (e) {
                                console.log(e)
                            }
                        } else f.w("no local video");
                        this.context.config.rtc.localStream = n, e.eventManager.dispatchEvent("onDisplayUserMedia", this.context.config.rtc.localStream), e.eventManager.hasEventListener("onStateChange") && e.eventManager.dispatchEvent("onStateChange", "LOCALMEDIA"), e.hasLocalStream = !0, e.isConnectToSignal && e.eventManager.hasEventListener("onInit") && e.eventManager.dispatchEvent("onInit", e.token), f.i("config stream"), f.i(this.context.config.rtc.localStream), e.useRecord && (e.localRecorder = new m(e, n, "LL"))
                    } catch (t) {
                        f.errorEvt(e, "4182", "create media stream is failed: %j", t), console.log(t), e.eventManager.hasEventListener("onError") && (e.eventManager.dispatchEvent("onError", "UserMediaDeviceFailedError", t), e.eventManager.dispatchEvent("onError", "4182", "UserMediaDeviceFailedError:" + t)), f.e(t)
                    }
                }
            } else console.log("no audio and video")
        }
        bindRemoteStreamToView(e) {
            let t;
            f.g("Media: Bind remote stream: Bind remote media to video element and regist to context"), f.d("event:", e), t = this.context.hasAddTrack ? e.streams[0] : e.stream, f.d("Stream:", t), this.context.remoteVideo.srcObject = t, this.context.remoteStream = t, f.gEnd()
        }
        mediaStreamTrackSwitch(e) {
            let t;
            return Object.freeze({
                type: function(e) {
                    if ("Video" !== e && "Audio" !== e) throw new Error("MediaStreamSwitcher:InvailedMediaType");
                    return t = `get${e}Tracks`, this
                },
                enabled: function(n) {
                    switch (n) {
                        case !0:
                            e[t]().forEach(e => {
                                e.enabled = !0
                            });
                            break;
                        case !1:
                            e[t]().forEach(e => {
                                e.enabled = !1
                            });
                            break;
                        default:
                            throw new Error("MediaStreamSwitcher:InvalidCommand")
                    }
                }
            })
        }
        setAudioOutput(e) {
            this.context.config.rtc.localVideo || this.context.config.rtc.localVideo.setSinkId(e).then(() => {
                f.d("Devices: Audio output device attached success:", e)
            }).catch(() => {
                f.e("Devices: Audio output device attached failed:", e), f.errorEvt(this.context, "1007", "Devices: Audio output device attached failed:")
            })
        }
        setUserDevices(e, t) {
            window.stream && window.stream.getTracks().forEach(function(e) {
                e.stop()
            }), this.context.config.rtc.localVideo.srcObject.getVideoTracks()[0].stop();
            const n = this.context.config.media;
            e ? (!0 === n.audio && (n.audio = {}), n.audio.deviceId = {
                exact: e
            }) : t && (!0 === n.video && (n.video = {}), n.video.deviceId = {
                exact: t
            }), this.changeLocalStream(n)
        }
        async captureScreen(e, t, n, r) {
            this.context.screenStream = await navigator.mediaDevices.getDisplayMedia({
                video: {
                    width: e,
                    height: t,
                    frameRate: {
                        max: n
                    }
                },
                audio: r
            });
            const i = r ? this.context.screenStream.getTracks()[1] : this.context.screenStream.getTracks()[0];
            this.context.videoTransceiver.sender.replaceTrack(i), this.context.screenStream.getAudioTracks().length > 0 && this.context.audioTransceiver.sender.replaceTrack(this.mergeAudioStreams(this.context.screenStream, this.context.config.rtc.localStream)), this.context.config.rtc.localStream.getTracks()[0].stop(), this.context.config.rtc.localVideo.srcObject = this.context.screenStream
        }
        stopCaptureScreen() {
            try {
                this.showLocalVideo()
            } catch (e) {
                f.e(e)
            }
        }
        showLocalVideo() {
            if (!this.context.config.rtc.localStream) throw "There is no localstream to show.";
            this.context.videoTransceiver.sender.replaceTrack(this.context.config.rtc.localStream.getVideoTracks()[0]), this.context.audioTransceiver.sender.replaceTrack(this.context.config.rtc.localStream.getAudioTracks()[0]), this.context.config.rtc.localVideo.srcObject = this.context.config.rtc.localStream
        }
        async changeLocalStream(e) {
            let t;
            try {
                f.d("try to get user media %j", e), t = await navigator.mediaDevices.getUserMedia(e), this.context.config.rtc.localVideo.srcObject = t, this.context.peerConnection.getTransceivers()[1].sender.replaceTrack(t.getVideoTracks()[0]), this.context.eventManager.hasEventListener("onStateChange") && this.context.eventManager.dispatchEvent("onStateChange", "LOCALMEDIA"), this.context.hasLocalStream = !0, f.i("config stream"), f.i(this.context.config.rtc.localStream)
            } catch (e) {
                f.errorEvt(this.context, "4182", "create media stream is failed: %j", e), console.log(e), this.context.eventManager.hasEventListener("onError") && (this.context.eventManager.dispatchEvent("onError", "UserMediaDeviceFailedError", e), this.context.eventManager.dispatchEvent("onError", "4182", "UserMediaDeviceFailedError:" + e)), f.e(e)
            }
        }
        mergeAudioStreams(e, t) {
            const n = new AudioContext,
                r = n.createMediaStreamSource(e),
                i = n.createMediaStreamSource(t),
                o = n.createMediaStreamDestination(),
                a = n.createGain(),
                s = n.createGain();
            return a.gain.value = .7, s.gain.value = .7, r.connect(a).connect(o), i.connect(s).connect(o), o.stream.getAudioTracks()[0]
        }
    }
    class y {
        constructor(e) {
            this.context = e, this.result = {
                channelId: this.context.channel.id,
                startTime: this.context.startTime,
                endTime: (new Date).getTime(),
                videoPacketsReceived: 0,
                videoPacketsLoss: 0,
                audioPacketsReceived: 0,
                audioPacketsLoss: 0,
                audioPacketsSent: 0,
                videoPacketsSent: 0,
                type: "quality.end"
            }
        }
        async check() {
            f.d("QualityCheck is start w/interval");
            let e, t, n = await this.context.peerConnection.getStats(null),
                r = {};
            n.forEach(e => {
                r[e.id] = e
            }), "Safari" === p.name || "safari" === p.name ? Object.keys(r).forEach(n => {
                "inbound-rtp" === r[n].type ? "audio" === r[n].mediaType ? (this.result.audioPacketsReceived = r[n].packetsReceived, this.result.audioPacketsLoss = r[n].packetsLost) : (this.result.videoPacketsReceived = r[n].packetsReceived, this.result.videoPacketsLoss = r[n].packetsLost) : "outbound-rtp" === r[n].type ? "audio" === r[n].mediaType ? this.result.audioPacketsSent = r[n].packetsSent : this.result.videoPacketsSent = r[n].packetsSent : "candidate-pair" === r[n].type && "succeeded" === r[n].state && (t = r[n].localCandidateId, e = r[n].remoteCandidateId, t && e && (this.result.localCandidate = r[t].candidateType, this.result.protocol = r[t].protocol, this.result.remoteCandidate = r[e].candidateType))
            }) : "Firefox" === p.name ? Object.keys(r).forEach(n => {
                "inbound-rtp" === r[n].type ? "audio" === r[n].kind ? (this.result.audioPacketsReceived = r[n].packetsReceived, this.result.audioPacketsLoss = r[n].packetsLost) : (this.result.videoPacketsReceived = r[n].packetsReceived, this.result.videoPacketsLoss = r[n].packetsLost) : "outbound-rtp" === r[n].type ? "audio" === r[n].kind ? this.result.audioPacketsSent = r[n].packetsSent : this.result.videoPacketsSent = r[n].packetsSent : "candidate-pair" === r[n].type && "succeeded" === r[n].state && (t = r[n].localCandidateId, e = r[n].remoteCandidateId, t && e && (this.result.localCandidate = r[t].candidateType, this.result.protocol = r[t].protocol, this.result.remoteCandidate = r[e].candidateType))
            }) : "Chrome" === p.name && Object.keys(r).forEach(n => {
                "inbound-rtp" === r[n].type ? "audio" === r[n].kind ? (this.result.audioPacketsReceived = r[n].packetsReceived, this.result.audioPacketsLoss = r[n].packetsLost) : (this.result.videoPacketsReceived = r[n].packetsReceived, this.result.videoPacketsLoss = r[n].packetsLost) : "outbound-rtp" === r[n].type ? "audio" === r[n].kind ? this.result.audioPacketsSent = r[n].packetsSent : this.result.videoPacketsSent = r[n].packetsSent : "candidate-pair" === r[n].type && "succeeded" === r[n].state && (t = r[n].localCandidateId, e = r[n].remoteCandidateId, t && e && (this.result.localCandidate = r[t].candidateType, this.result.protocol = r[t].protocol, this.result.remoteCandidate = r[e].candidateType))
            }), f.qualityLog(this.result)
        }
    }
    const S = Object.freeze(["INIT", "WAIT", "CONNECT", "COMPLETE", "CLOSE", "EXIT", "FAIL"]);
    class C {
        constructor(e) {
            this.interval = 5e3, this.statsReportTimer = null, this.context = e, this.oldStats = null, this.result = {
                nowLocalABSent: 0,
                nowLocalVBSent: 0,
                nowRemoteABReceived: 0,
                nowRemoteVBReceived: 0,
                diffRemoteVPReceived: 0,
                nowLocalAPSent: 0,
                nowLocalVPSent: 0,
                nowRemoteAPReceived: 0,
                diffRemoteAPReceived: 0,
                nowRemoteVPReceived: 0,
                oldRemoteAudioPacketsLost: 0,
                oldRemoteVideoPacketsLost: 0,
                diffVideoPacketsLost: 0,
                oldRemoteAudioFractionLost: 0,
                oldRemoteVideoFractionLost: 0,
                diffAudioPacketsLost: 0,
                localFrameWidth: 0,
                localFrameHeight: 0,
                remoteFrameWidth: 0,
                remoteFrameHeight: 0,
                oldFramesReceived: 0,
                nowLocalFrameRate: 0,
                oldLocalFrameRate: 0,
                nowRemoteFrameRate: 0,
                oldRemoteFrameRate: 0,
                oldFramesSent: 0
            }, this.oldResult = {}, this.qualityResult = {
                timestamp: (new Date).getTime(),
                svcId: this.context.channel.serviceId,
                chId: this.context.channel.id,
                type: "quality.middle",
                videoPacketsReceived: 0,
                videoPacketsLoss: 0,
                audioPacketsReceived: 0,
                audioPacketsLoss: 0,
                audioPacketsSent: 0,
                videoPacketsSent: 0,
                framesDecoded: 0,
                insertedSamplesForDeceleration: 0,
                removedSamplesForAcceleration: 0
            }, this.fractionLost = {
                audio: [{
                    rating: 1,
                    fromFractionLost: 0,
                    toFractionLost: 50
                }, {
                    rating: 2,
                    fromFractionLost: 51,
                    toFractionLost: 150
                }, {
                    rating: 3,
                    fromFractionLost: 151,
                    toFractionLost: 250
                }, {
                    rating: 4,
                    fromFractionLost: 251,
                    toFractionLost: 350
                }, {
                    rating: 5,
                    fromFractionLost: 351,
                    toFractionLost: 9999999
                }],
                video: [{
                    rating: 1,
                    fromFractionLost: 0,
                    toFractionLost: 40
                }, {
                    rating: 2,
                    fromFractionLost: 41,
                    toFractionLost: 55
                }, {
                    rating: 3,
                    fromFractionLost: 56,
                    toFractionLost: 70
                }, {
                    rating: 4,
                    fromFractionLost: 71,
                    toFractionLost: 90
                }, {
                    rating: 5,
                    fromFractionLost: 91,
                    toFractionLost: 9999999
                }]
            }
        }
        stop() {
            this.statsReportTimer && (window.clearInterval(this.statsReportTimer), this.statsReportTimer = null)
        }
        start() {
            f.i("Health is start w/interval:" + this.interval), this.statsReportTimer && (window.clearInterval(this.statsReportTimer), this.statsReportTimer = null), this.statsReportTimer = window.setInterval(v.bind(this.getStats, this), this.interval)
        }
        getMaxRating() {
            var e = 0,
                t = 0;
            for (e = 0; e < arguments.length; e++) arguments[e] > t && (t = arguments[e]);
            return t
        }
        getRttRating(e) {
            var t = 0;
            return e >= 1e3 ? t = 5 : e >= 800 ? t = 4 : e >= 600 ? t = 3 : e >= 400 ? t = 2 : e < 400 && (t = 1), t
        }
        getVideoFractionLostRating(e) {
            return e < 40 ? 1 : e < 55 ? 2 : e < 70 ? 3 : e < 90 ? 4 : 5
        }
        getAudioFractionLostRating(e) {
            return e < 50 ? 1 : e < 150 ? 2 : e < 250 ? 3 : e < 350 ? 4 : 5
        }
        getFractionLostRating(e, t) {
            var n = t;
            for (let t = 0; t < n.length; t++)
                if (n[t].fromFractionLost <= e && n[t].toFractionLost >= e) return n[t].rating;
            return 1
        }
        async getStats() {
            if ("Safari" === p.name || "safari" === p.name);
            else if ("Firefox" === p.name) {
                let t, n, r, i = await this.context.peerConnection.getStats(null),
                    o = {};
                i.forEach(e => {
                    o[e.id] = e
                }), Object.keys(o).forEach(e => {
                    "inbound-rtp" === o[e].type ? "audio" === o[e].kind ? (this.qualityResult.audioPacketsReceived = o[e].packetsReceived, this.qualityResult.audioPacketsLoss = o[e].packetsLost, this.result.nowRemoteAPReceived = o[e].packetsReceived, this.result.nowRemoteABReceived = o[e].bytesReceived, this.result.remoteAudioPacketsLost = void 0 !== this.result.remoteAudioPacketsLost ? o[e].packetsLost - this.result.oldRemoteAudioPacketsLost : 0, this.result.oldRemoteAudioPacketsLost = void 0 !== this.result.oldRemoteAudioPacketsLost ? o[e].packetsLost : 0, this.result.diffAudioPacketsLost = this.result.remoteAudioPacketsLost > 0 ? this.result.remoteAudioPacketsLost / (this.interval / 1e3) : 0, this.result.diffRemoteAPReceived = (this.result.nowRemoteAPReceived - this.result.oldRemoteAPReceived) / (this.interval / 1e3), this.result.remoteAudioFractionLost = void 0 !== this.result.remoteAudioFractionLost ? parseInt(this.result.diffAudioPacketsLost / (this.result.diffRemoteAPReceived + this.result.diffAudioPacketsLost) * 255 || 0) : 0, this.result.oldRemoteAPReceived = this.result.nowRemoteAPReceived) : (this.qualityResult.videoPacketsReceived = o[e].packetsReceived, this.qualityResult.videoPacketsLoss = o[e].packetsLost, this.qualityResult.framesDecoded = o[e].framesDecoded, this.result.nowRemoteVPReceived = o[e].packetsReceived, this.result.nowRemoteVBReceived = o[e].bytesReceived, this.result.remoteVideoPacketsLost = void 0 !== this.result.remoteVideoPacketsLost ? o[e].packetsLost - this.result.oldRemoteVideoPacketsLost : 0, this.result.oldRemoteVideoPacketsLost = void 0 !== this.result.oldRemoteVideoPacketsLost ? o[e].packetsLost : 0, this.result.diffVideoPacketsLost = this.result.remoteVideoPacketsLost > 0 ? this.result.remoteVideoPacketsLost / (this.interval / 1e3) : 0, this.result.diffRemoteVPReceived = (this.result.nowRemoteVPReceived - this.result.oldRemoteVPReceived) / (this.interval / 1e3), this.result.remoteVideoFractionLost = void 0 !== this.result.remoteVideoFractionLost ? parseInt(this.result.diffVideoPacketsLost / (this.result.diffRemoteVPReceived + this.result.diffVideoPacketsLost) * 255 || 0) : 0, this.result.oldRemoteVPReceived = this.result.nowRemoteVPReceived) : "outbound-rtp" === o[e].type ? "audio" === o[e].kind ? (this.qualityResult.audioPacketsSent = o[e].packetsSent, this.result.nowLocalAPSent = o[e].packetsSent, this.result.nowLocalABSent = o[e].bytesSent, this.result.audioRtt = o[e].remoteId ? o[o[e].remoteId].roundTripTime : 0) : (this.qualityResult.videoPacketsSent = o[e].packetsSent, this.result.nowLocalVPSent = o[e].packetsSent, this.result.nowLocalVBSent = o[e].bytesSent, this.result.videoRtt = o[e].remoteId ? o[o[e].remoteId].roundTripTime : 0) : "candidate-pair" === o[e].type && "succeeded" === o[e].state && (t = o[e].selectedCandidatePairId, r = o[e].localCandidateId, n = o[e].remoteCandidateId, r && n && (this.result.localCandidate = o[r].candidateType, this.result.protocol = o[r].protocol, this.result.remoteCandidate = o[n].candidateType))
                }), this.result.remoteAudioFractionRating = v.getAudioFractionLostRating(this.result.remoteAudioFractionLost), this.result.remoteVideoFractionRating = v.getVideoFractionLostRating(this.result.remoteVideoFractionLost), this.result.fractionRating = this.result.remoteVideoFractionRating, this.result.audioRttRating = this.getRttRating(1e3 * this.result.audioRtt), this.result.videoRttRating = this.getRttRating(1e3 * this.result.videoRtt), this.result.rating = this.getMaxRating(this.result.audioRttRating, this.result.videoRttRating, this.result.remoteAudioFractionRating, this.result.remoteVideoFractionRating), this.context.eventManager.hasEventListener("onStat") && this.context.eventManager.dispatchEvent("onStat", this.result), 0 == this.result.nowRemoteFrameRate && 0 == this.result.oldRemoteFrameRate && this.remoteVideo && this.remoteStream && this.context.signalingConnection.reduceVideoQuality();
                let a = this.context.signalingConnection.createMessage({
                    command: "health",
                    body: JSON.stringify(this.result)
                });
                (e = {
                    topic: "health"
                }).messages = this.result, e.messages.serviceId = this.context.serviceId, e.messages.pId = this.context.token, e.messages.chType = this.context.channel.type, e.messages.chId = this.context.channel.id, f.evt(JSON.stringify(e)), a && (this.context.database || this.context.signalingConnection.send(JSON.stringify(a)))
            } else if ("Chrome" === p.name || "Chrome Mobile" === p.name) {
                let t, n, r, i = await this.context.peerConnection.getStats(null),
                    o = {},
                    a = "RTCTransport_0_1";
                this.oldResult = {
                    ...this.result
                }, i.forEach(e => {
                    "transport" === e.type && (a = e.id), o[e.id] = e
                }), o[a] && o[a].selectedCandidatePairId && (t = o[a].selectedCandidatePairId, n = o[t].localCandidateId, r = o[t].remoteCandidateId), n && r && (this.result.localCandidate = o[n].candidateType, this.result.localNetworkType = o[n].networkType, this.result.protocol = o[n].protocol, this.result.remoteCandidate = o[r].candidateType), Object.keys(o).forEach(e => {
                    "inbound-rtp" === o[e].type ? "audio" === o[e].kind ? (this.qualityResult.audioPacketsReceived = o[e].packetsReceived, this.qualityResult.audioPacketsLoss = o[e].packetsLost, this.result.nowRemoteAPReceived = o[e].packetsReceived, this.result.nowRemoteABReceived = o[e].bytesReceived, this.result.remoteAudioPacketsLost = void 0 !== this.result.remoteAudioPacketsLost ? o[e].packetsLost - this.result.oldRemoteAudioPacketsLost : 0, this.result.oldRemoteAudioPacketsLost = void 0 !== this.result.oldRemoteAudioPacketsLost ? o[e].packetsLost : 0, this.result.diffAudioPacketsLost = this.result.remoteAudioPacketsLost > 0 ? this.result.remoteAudioPacketsLost / (this.interval / 1e3) : 0, this.result.diffRemoteAPReceived = (this.result.nowRemoteAPReceived - this.result.oldRemoteAPReceived) / (this.interval / 1e3), this.result.remoteAudioFractionLost = void 0 !== this.result.remoteAudioFractionLost ? parseInt(this.result.diffAudioPacketsLost / (this.diffRemoteAPReceived + this.result.diffAudioPacketsLost) * 255 || 0) : 0, this.result.oldRemoteAPReceived = this.result.nowRemoteAPReceived, this.result.remoteAudioCodec = o[o[e].codecId] ? o[o[e].codecId].mimeType : "") : (this.qualityResult.videoPacketsReceived = o[e].packetsReceived, this.qualityResult.videoPacketsLoss = o[e].packetsLost, this.qualityResult.framesDecoded = o[e].framesDecoded, this.result.nowRemoteVPReceived = o[e].packetsReceived, this.result.nowRemoteVBReceived = o[e].bytesReceived, this.result.remoteVideoPacketsLost = void 0 !== this.result.remoteVideoPacketsLost ? o[e].packetsLost - this.result.oldRemoteVideoPacketsLost : 0, this.result.oldRemoteVideoPacketsLost = void 0 !== this.result.oldRemoteVideoPacketsLost ? o[e].packetsLost : 0, this.result.diffVideoPacketsLost = this.result.remoteVideoPacketsLost > 0 ? this.result.remoteVideoPacketsLost / (this.interval / 1e3) : 0, this.result.diffRemoteVPReceived = (this.result.nowRemoteVPReceived - this.result.oldRemoteVPReceived) / (this.interval / 1e3), this.result.remoteVideoFractionLost = void 0 !== this.result.remoteVideoFractionLost ? parseInt(this.result.diffVideoPacketsLost / (this.result.diffRemoteVPReceived + this.result.diffVideoPacketsLost) * 255 || 0) : 0, this.result.oldRemoteVPReceived = this.result.nowRemoteVPReceived, this.result.remoteVideoCodec = o[o[e].codecId] ? o[o[e].codecId].mimeType : "") : "outbound-rtp" === o[e].type ? "audio" === o[e].kind ? (this.qualityResult.audioPacketsSent = o[e].packetsSent, this.result.nowLocalAPSent = o[e].packetsSent, this.result.nowLocalABSent = o[e].bytesSent, this.result.localAudioCodec = o[o[e].codecId].mimeType, this.result.audioRtt = o["RTCRemoteInboundRtpAudioStream_" + `${o[e].ssrc}`] ? o["RTCRemoteInboundRtpAudioStream_" + `${o[e].ssrc}`].roundTripTime : 0) : (this.qualityResult.videoPacketsSent = o[e].packetsSent, this.result.nowLocalVPSent = o[e].packetsSent, this.result.nowLocalVBSent = o[e].bytesSent, this.result.localVideoCodec = o[o[e].codecId].mimeType, this.result.videoRtt = o["RTCRemoteInboundRtpVideoStream_" + `${o[e].ssrc}`] ? o["RTCRemoteInboundRtpVideoStream_" + `${o[e].ssrc}`].roundTripTime : 0) : "track" === o[e].type && (!0 === o[e].remoteSource ? "audio" === o[e].kind ? (this.qualityResult.insertedSamplesForDeceleration = o[e].insertedSamplesForDeceleration, this.qualityResult.removedSamplesForAcceleration = o[e].removedSamplesForAcceleration, this.result.remoteAudioLevel = o[e].audioLevel, this.result.remoteTotalAudioEnergy = o[e].totalAudioEnergy) : (this.result.remoteFrameWidth = o[e].frameWidth, this.result.remoteFrameHeight = o[e].frameHeight, o[e].framesReceived && (this.result.nowRemoteFrameRate = (o[e].framesReceived - this.result.oldFramesReceived) / (this.interval / 1e3)), this.result.oldFramesReceived = o[e].framesReceived, this.result.oldRemoteFrameRate = this.result.nowRemoteFrameRate) : "audio" === o[e].kind ? (this.result.localAudioLevel = o[o[e].mediaSourceId].audioLevel, this.result.localTotalAudioEnergy = o[o[e].mediaSourceId].totalAudioEnergy) : (this.result.localFrameWidth = o[e].frameWidth, this.result.l
                }), this.result.remoteAudioFractionRating = v.getAudioFractionLostRating(this.result.remoteAudioFractionLost), this.result.remoteVideoFractionRating = v.getVideoFractionLostRating(this.result.remoteVideoFractionLost), this.result.fractionRating = this.result.remoteVideoFractionRating, this.result.audioRttRating = this.getRttRating(1e3 * this.result.audioRtt), this.result.videoRttRating = this.getRttRating(1e3 * this.result.videoRtt), this.result.rating = this.getMaxRating(this.result.audioRttRating, this.result.videoRttRating, this.result.remoteAudioFractionRating, this.result.remoteVideoFractionRating), this.context.eventManager.hasEventListener("onStat") && this.context.eventManager.dispatchEvent("onStat", this.result), 0 == this.result.nowRemoteFrameRate && 0 == this.result.oldRemoteFrameRate && this.remoteVideo && this.remoteStream && this.context.signalingConnection.reduceVideoQuality();
                let s = this.context.signalingConnection.createMessage({
                    command: "health",
                    body: JSON.stringify(this.result)
                });
                var e;
                (e = {
                    topic: "health"
                }).messages = this.result, e.messages.serviceId = this.context.serviceId, e.messages.pId = this.context.token, e.messages.chType = this.context.channel.type, e.messages.chId = this.context.channel.id, f.evt(JSON.stringify(e)), s && (this.context.database || this.context.signalingConnection.send(JSON.stringify(s)))
            }
            f.qualityLog(this.qualityResult)
        }
    }
    d === d.window && d.URL && d.Blob && d.Worker;

    function E({
        context: e,
        media: t,
        config: n
    }) {
        function r(t) {
            let n;
            f.g("PeerCon: Bind remote stream"), f.v("bindRemoteStream:", t), e.hasAddTrack ? (f.v("PeerCon: context has track"), e.remoteStream ? (e.remoteStream.addTrack(t.track), n = e.remoteStream) : (e.remoteStream = new MediaStream, e.remoteStream.addTrack(t.track), e.useVideo || (n = e.remoteStream))) : (f.v("PeerCon: context has stream"), n = t.stream, e.remoteStream = n), e.useRecord && !e.remoteRecorder && n && (console.log("record is start"), e.remoteRecorder = new m(e, n, "RR"), e.remoteRecorder.start(), e.localRecorder.start()), f.gEnd()
        }
        e.peerConnection.onicecandidate = function(t) {
            f.i("PeerCon: HandleICECandidateEvent"), f.d("Event:", t), f.d("-> Candidate:", t.candidate);
            const r = e.signalingConnection.createMessage({
                command: "ice",
                body: JSON.stringify(t.candidate)
            });
            if (t.candidate) {
                f.d("Message ->: ", r), "BROADCAST" === e.channel.type && (r.channel.type = "BROADCAST"), void 0 !== r && (n.rtc.selectiveCandidate ? "default" === n.rtc.selectiveCandidate.mode ? e.signalingConnection.send(JSON.stringify(r)) : "auto" !== n.rtc.selectiveCandidate.mode || "relay" !== t.candidate.type && "srflx" !== t.candidate.type ? "relay" === n.rtc.selectiveCandidate.mode && "relay" === t.candidate.type ? e.signalingConnection.send(JSON.stringify(r)) : "route" === n.rtc.selectiveCandidate.mode && "srflx" === t.candidate.type && e.signalingConnection.send(JSON.stringify(r)) : e.signalingConnection.send(JSON.stringify(r)) : e.signalingConnection.send(JSON.stringify(r)));
                const i = {
                    topic: "log",
                    messages: {
                        log: "iceType:local " + t.candidate,
                        logLevel: "info",
                        sdkVersion: e.sdkVersion,
                        svcId: e.serviceId,
                        pId: e.token,
                        chId: e.channel.id
                    }
                };
                f.evt(JSON.stringify(i))
            }
        }, e.peerConnection.onicegatheringstatechange = function() {
            f.i("PeerCon: Handle ice gathering state event"), f.d(`Event: ${e.peerConnection.iceGatheringState}:`, event)
        }, e.peerConnection.onsignalingstatechange = function(t) {
            switch (f.i("PeerCon: Handle signaling state change event"), f.d(`Event: ${e.peerConnection.signalingState}:`, t), e.peerConnection.signalingState) {
                case "stable":
                    e.endTime = (new Date).getTime(), e.eventManager.hasEventListener("onAddRemoteStream") && e.eventManager.dispatchEvent("onAddRemoteStream", e.remoteStream);
                    break;
                case "have-local-offer":
                case "have-remote-offer":
                case "have-local-pranswer":
                case "have-remote-pranswer":
                case "closed":
                    break;
                default:
                    f.e("Unknown signaling state event:", e.peerConnection.signalingState)
            }
        }, e.peerConnection.onnegotiationneeded = function(e) {
            f.w("PeerCon: Handle negotiation needed event"), f.w("Event:", e)
        }, e.peerConnection.oniceconnectionstatechange = function(t) {
            let n;
            switch (f.i("PeerCon: Handle ICE state change event"), f.i(`Event: ${e.peerConnection.iceConnectionState}:`, t), e.peerConnection.iceConnectionState) {
                case "connected":
                    if (f.i("ice State:connected"), e.eventManager.hasEventListener("onStateChange") && e.eventManager.dispatchEvent("onStateChange", "COMPLETE"), e.eventManager.hasEventListener("onComplete") && e.eventManager.dispatchEvent("onComplete"), e.state = "COMPLETE", n = e.signalingConnection.createMessage({
                            command: "stateChange",
                            body: "COMPLETE"
                        }), e.peerConnection.__proto__.hasOwnProperty("getTransceivers") && (e.audioTransceiver = e.peerConnection.getTransceivers()[0], e.useVideo && e.peerConnection.getTransceivers().length > 1 && (e.videoTransceiver = e.peerConnection.getTransceivers()[1])), e.remoteVideo && e.remoteStream && (e.remoteVideo.srcObject = e.remoteStream), !e.health || null === e.health.statsReportTimer) {
                        var r = new C(e);
                        r.start(), e.health = r
                    }
                    break;
                case "failed":
                    f.i("ice State:failed"), f.errorEvt(e, "1001", "ice state is failed"), e.eventManager.hasEventListener("onError") && e.eventManager.dispatchEvent("onError", "4245", "ICEFailed"), "COMPLETE" === e.state || e.qualityChecker || (e.qualityChecker = new y(e), e.qualityChecker.check());
                    break;
                case "closed":
                    return f.i("ice State:closed"), this.context.eventManager.hasEventListener("onError") && this.context.eventManager.dispatchEvent("onError", "4343", "ICEClosed"), e.eventManager.hasEventListener("onClose") && e.eventManager.dispatchEvent("onClose", {
                        message: "ICEClosed",
                        closeType: "UNKNOWN"
                    }), void("CLOSE" !== e.state && (e.health && e.health.stop(), e.peerConnection && (e.peerConnection.close(), e.signalingConnection && (e.signalingConnection.close(), e.state = "CLOSE", e.useRecord && e.remoteRecorder && (e.remoteRecorder.stop(), e.remoteRecorder = null), e.useRecord && e.localRecorder && (e.localRecorder.stop(), e.localRecorder = null, e.useRecord = !1), e.remoteVideo.srcObject && e.remoteVideo.srcObject.getTracks().forEach(e => e.stop()), e.remoteVideo && (e.remoteVideo.srcObject = null), e.hasAddTrack ? e.peerConnection.ontrack = null : e.peerConnection.onaddstream = null, e.peerConnection.onremovestream = null, e.peerConnection.onicecandidate = null, e.peerConnection.oniceconnectionstatechange = null, e.peerConnection.onsignalingstatechange = null, e.peerConnection.onicegatheringstatechange = null, e.peerConnection.onnegotiationneeded = null, e.peerConnection = null))));
                case "disconnected": {
                    f.i("ice State:disconnected");
                    let t = e.eventManager.hasEventListener("onError");
                    t && e.eventManager.dispatchEvent("onError", "4344", "ICEDisconnected"), "P2P" === e.channel.type && setTimeout(() => {
                        "connected" !== e.peerConnection.iceConnectionState ? (t && e.eventManager.dispatchEvent("onError", "4343", "ICEDisconnected After 3 seconds"), e.eventManager.hasEventListener("onClose") && e.eventManager.dispatchEvent("onClose", {
                            message: "ICEDisconnected",
                            closeType: "UNKNOWN"
                        })) : t && e.eventManager.dispatchEvent("onError", "4345", "ICEDisconnected but Connected in 3 seconds")
                    }, 3e3);
                    break
                }
                case "completed":
                    f.v("iceconState:completed");
                    break;
                case "checking":
                    f.v("iceconState:checking");
                    break;
                default:
                    f.e("Unknown ice connection change event:", e.peerConnection.iceConnectionState)
            }
            f.v("Message ->:", n), f.i("Sending ice state to other"), void 0 !== n && e.signalingConnection.send(JSON.stringify(n))
        }, e.peerConnection.onicecandidateerror = function(t) {
            f.i("PeerCon: Handle ICE candidate error event", t), f.errorEvt(e, "1001", `ICE candidate error event occured hostCandidate : ${t.hostCandidate} url : ${t.url} errorCode: ${t.errorCode} errorText ${t.errorText}`)
        }, e.hasAddTrack ? (f.i("PeerCon: context has addTrack"), e.peerConnection.ontrack = r) : (f.i("PeerCon: context has onAddstream"), e.peerConnection.onaddstream = r), e.peerConnection.onremovestream = function(e) {
            f.v("PeerCon: Handle remove stream event")
        }
    }
    var b, _ = "object" == typeof Reflect ? Reflect : null,
        R = _ && "function" == typeof _.apply ? _.apply : function(e, t, n) {
            return Function.prototype.apply.call(e, t, n)
        };
    b = _ && "function" == typeof _.ownKeys ? _.ownKeys : Object.getOwnPropertySymbols ? function(e) {
        return Object.getOwnPropertyNames(e).concat(Object.getOwnPropertySymbols(e))
    } : function(e) {
        return Object.getOwnPropertyNames(e)
    };
    var T = Number.isNaN || function(e) {
        return e != e
    };

    function x() {
        x.init.call(this)
    }
    var k = x;
    x.EventEmitter = x, x.prototype._events = void 0, x.prototype._eventsCount = 0, x.prototype._maxListeners = void 0;
    var w = 10;

    function P(e) {
        return void 0 === e._maxListeners ? x.defaultMaxListeners : e._maxListeners
    }

    function O(e, t, n, r) {
        var i, o, a, s;
        if ("function" != typeof n) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof n);
        if (void 0 === (o = e._events) ? (o = e._events = Object.create(null), e._eventsCount = 0) : (void 0 !== o.newListener && (e.emit("newListener", t, n.listener ? n.listener : n), o = e._events), a = o[t]), void 0 === a) a = o[t] = n, ++e._eventsCount;
        else if ("function" == typeof a ? a = o[t] = r ? [n, a] : [a, n] : r ? a.unshift(n) : a.push(n), (i = P(e)) > 0 && a.length > i && !a.warned) {
            a.warned = !0;
            var c = new Error("Possible EventEmitter memory leak detected. " + a.length + " " + String(t) + " listeners added. Use emitter.setMaxListeners() to increase limit");
            c.name = "MaxListenersExceededWarning", c.emitter = e, c.type = t, c.count = a.length, s = c, console && console.warn && console.warn(s)
        }
        return e
    }

    function L(e, t, n) {
        var r = {
                fired: !1,
                wrapFn: void 0,
                target: e,
                type: t,
                listener: n
            },
            i = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e.push(arguments[t]);
                this.fired || (this.target.removeListener(this.type, this.wrapFn), this.fired = !0, R(this.listener, this.target, e))
            }.bind(r);
        return i.listener = n, r.wrapFn = i, i
    }

    function M(e, t, n) {
        var r = e._events;
        if (void 0 === r) return [];
        var i = r[t];
        return void 0 === i ? [] : "function" == typeof i ? n ? [i.listener || i] : [i] : n ? function(e) {
            for (var t = new Array(e.length), n = 0; n < t.length; ++n) t[n] = e[n].listener || e[n];
            return t
        }(i) : D(i, i.length)
    }

    function I(e) {
        var t = this._events;
        if (void 0 !== t) {
            var n = t[e];
            if ("function" == typeof n) return 1;
            if (void 0 !== n) return n.length
        }
        return 0
    }

    function D(e, t) {
        for (var n = new Array(t), r = 0; r < t; ++r) n[r] = e[r];
        return n
    }

    function j(e, t, n, r) {
        let i, o, a = n,
            s = !0;

        function c() {
            if (a <= 0) return r("timeout", null), void(s = !1);
            f.i("try connect signaling. remainRetries:" + a), (o = new WebSocket(e)).onopen = (() => {
                clearTimeout(i), r(null, o), s = !1
            }), o.onerror = (() => {}), o.onclose = (() => {}), i = setTimeout(() => {
                o.onerror = null, o.onclose = null, o.close(), clearTimeout(i), setTimeout(() => {
                    a--, c()
                }, 0)
            }, t)
        }
        return c(), {
            cancel: function() {
                !1 !== s && (o.onerror = null, o.onclose = null, o.close(), clearTimeout(i), r("cancel", null))
            }
        }
    }
    Object.defineProperty(x, "defaultMaxListeners", {
        enumerable: !0,
        get: function() {
            return w
        },
        set: function(e) {
            if ("number" != typeof e || e < 0 || T(e)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + e + ".");
            w = e
        }
    }), x.init = function() {
        void 0 !== this._events && this._events !== Object.getPrototypeOf(this)._events || (this._events = Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0
    }, x.prototype.setMaxListeners = function(e) {
        if ("number" != typeof e || e < 0 || T(e)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + e + ".");
        return this._maxListeners = e, this
    }, x.prototype.getMaxListeners = function() {
        return P(this)
    }, x.prototype.emit = function(e) {
        for (var t = [], n = 1; n < arguments.length; n++) t.push(arguments[n]);
        var r = "error" === e,
            i = this._events;
        if (void 0 !== i) r = r && void 0 === i.error;
        else if (!r) return !1;
        if (r) {
            var o;
            if (t.length > 0 && (o = t[0]), o instanceof Error) throw o;
            var a = new Error("Unhandled error." + (o ? " (" + o.message + ")" : ""));
            throw a.context = o, a
        }
        var s = i[e];
        if (void 0 === s) return !1;
        if ("function" == typeof s) R(s, this, t);
        else {
            var c = s.length,
                d = D(s, c);
            for (n = 0; n < c; ++n) R(d[n], this, t)
        }
        return !0
    }, x.prototype.addListener = function(e, t) {
        return O(this, e, t, !1)
    }, x.prototype.on = x.prototype.addListener, x.prototype.prependListener = function(e, t) {
        return O(this, e, t, !0)
    }, x.prototype.once = function(e, t) {
        if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
        return this.on(e, L(this, e, t)), this
    }, x.prototype.prependOnceListener = function(e, t) {
        if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
        return this.prependListener(e, L(this, e, t)), this
    }, x.prototype.removeListener = function(e, t) {
        var n, r, i, o, a;
        if ("function" != typeof t) throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof t);
        if (void 0 === (r = this._events)) return this;
        if (void 0 === (n = r[e])) return this;
        if (n === t || n.listener === t) 0 == --this._eventsCount ? this._events = Object.create(null) : (delete r[e], r.removeListener && this.emit("removeListener", e, n.listener || t));
        else if ("function" != typeof n) {
            for (i = -1, o = n.length - 1; o >= 0; o--)
                if (n[o] === t || n[o].listener === t) {
                    a = n[o].listener, i = o;
                    break
                } if (i < 0) return this;
            0 === i ? n.shift() : function(e, t) {
                for (; t + 1 < e.length; t++) e[t] = e[t + 1];
                e.pop()
            }(n, i), 1 === n.length && (r[e] = n[0]), void 0 !== r.removeListener && this.emit("removeListener", e, a || t)
        }
        return this
    }, x.prototype.off = x.prototype.removeListener, x.prototype.removeAllListeners = function(e) {
        var t, n, r;
        if (void 0 === (n = this._events)) return this;
        if (void 0 === n.removeListener) return 0 === arguments.length ? (this._events = Object.create(null), this._eventsCount = 0) : void 0 !== n[e] && (0 == --this._eventsCount ? this._events = Object.create(null) : delete n[e]), this;
        if (0 === arguments.length) {
            var i, o = Object.keys(n);
            for (r = 0; r < o.length; ++r) "removeListener" !== (i = o[r]) && this.removeAllListeners(i);
            return this.removeAllListeners("removeListener"), this._events = Object.create(null), this._eventsCount = 0, this
        }
        if ("function" == typeof(t = n[e])) this.removeListener(e, t);
        else if (void 0 !== t)
            for (r = t.length - 1; r >= 0; r--) this.removeListener(e, t[r]);
        return this
    }, x.prototype.listeners = function(e) {
        return M(this, e, !0)
    }, x.prototype.rawListeners = function(e) {
        return M(this, e, !1)
    }, x.listenerCount = function(e, t) {
        return "function" == typeof e.listenerCount ? e.listenerCount(t) : I.call(e, t)
    }, x.prototype.listenerCount = I, x.prototype.eventNames = function() {
        return this._eventsCount > 0 ? b(this._events) : []
    };
    class A extends k {
        constructor({
            url: e,
            context: t
        }) {
            super(), f.init(t), this.wsUrl = e, this.connectTimeoutMs = 1e3, this.connectRetries = 5, this.context = t, this.ws = null, this.connector, this.onMessageHandler = null, this.context.isConnectToSignal = !1, this.needReconnect = !1
        }
        connect() {
            f.i("Signaling: Connect"), this.context.isConnectToSignal = !1, this.connector = j(this.wsUrl, this.connectTimeoutMs, this.connectRetries, (e, t) => {
                if (e) return console.log("websocket connection fail. error:" + e), void("timeout" === e && this.emit("disconnect"));
                this.ws = t, this.ws.onmessage = this.onMessageHandler, this.ws.onopen = null, this.ws.onclose = this.handleCloseEvent.bind(this), this.ws.onerror = this.handleErrorEvent.bind(this), !1 === this.needReconnect ? (f.i("Signaling: Success connect to the signaling server"), f.v("OpenEvent:", event), this.context.isConnectToSignal = !0, this.context.eventManager.hasEventListener("onInit") && this.context.eventManager.dispatchEvent("onInit", this.context.token), this.context.eventManager.hasEventListener("onStateChange") && this.context.eventManager.dispatchEvent("onStateChange", "INIT"), this.emit("connect")) : (f.i("Signaling: Success re-connect to the signaling server"), f.v("Re-OpenEvent:", event), this.context.isConnectToSignal = !0, this.emit("reconnect")), this.needReconnect = !0
            })
        }
        send(...e) {
            if (null !== this.ws && void 0 !== this.ws) try {
                this.ws.send(...e)
            } catch (e) {}
        }
        setDisconnectHandler() {
            this.context.channel.type
        }
        close() {
            if (this.connector && this.connector.cancel(), this.needReconnect = !1, null !== this.ws && void 0 !== this.ws) {
                if (this.ws.readyState === WebSocket.OPEN) {
                    const e = this.createMessage({
                        command: "disconnect"
                    });
                    f.v("DisconnectCh Message ->:", e), this.send(JSON.stringify(e)), console.log("DisconnectCh:" + JSON.stringify(e) + " " + this.ws.readyState)
                }
                this.ws.close(), delete this.ws
            }
        }
        onOffline() {
            !1 !== this.needReconnect && (this.ws && (this.ws.onclose = null, this.ws.onerror = null, this.ws.close(), delete this.ws), this.connect())
        }
        onMessage(e) {
            this.onMessageHandler = e
        }
        handleCloseEvent(e) {
            f.i("Signaling: Closed the signaling connection"), f.v("Event:", e), this.context.isConnectToSignal = !1, this.needReconnect && this.connect()
        }
        handleErrorEvent(e) {
            f.e("Signaling: Error from the signaling connection."), f.e("Event", e)
        }
        createMessage({
            command: e,
            body: t
        }) {
            f.d("Signaling: Create Message %j", t);
            const n = {
                command: e,
                token: this.context.token,
                serviceId: this.context.serviceId,
                channel: {
                    id: this.context.channel.id,
                    name: this.context.channel.name,
                    type: this.context.channel.type
                }
            };
            return t && (n.body = t), f.v("createMessage: " + JSON.stringify(n)), n
        }
        connectChannel(e) {
            f.i("Signaling: Connect channel: As a caller"), this.context.startTime = (new Date).getTime(), this.context.isCaller = !0, this.context.channel.id = e;
            const t = this.createMessage({
                command: "connect"
            });
            f.v("ConnectCh Message ->:", t), this.send(JSON.stringify(t))
        }
        reconnectChannel() {
            f.i("Signaling: re-connect channel:");
            const e = this.createMessage({
                command: "reconnect"
            });
            f.i("Re-Connect Ch Message ->:", e), this.send(JSON.stringify(e))
        }
        createViewerChannel(e) {
            f.i("Signaling: Create channel: As a viewer"), this.context.startTime = (new Date).getTime(), this.context.isCaller = !1, this.context.channel.id = e;
            const t = this.createMessage({
                command: "create"
            });
            t.channel.type = "VIEWER", t.channel.id = e, f.v("ConnectCh Message ->:", t), this.send(JSON.stringify(t))
        }
        createConferenceRoom(e) {
            f.i("SignalingConnection.js:createConferenceRoom"), this.context.startTime = (new Date).getTime(), this.context.isCaller = !1;
            const t = this.createMessage({
                command: "create"
            });
            t.roomId = e, t.channel.type = "ROOM", t.channel.videoCodec = this.context.videoCodec, t.channel.audioCodec = this.context.audioCodec, t.channel.simulcast = this.context.simulcast, f.v("SignalingConnection.js:createConferenceRoom:ConnectCh Message ->:", t), f.i("SignalingConnection.js:createConferenceRoom:room id: " + this.context.channel.id), this.send(JSON.stringify(t))
        }
        createBroadcastChannel(e) {
            f.i("Signaling: Create channel: As a presenter"), this.context.startTime = (new Date).getTime(), this.context.isCaller = !1, this.context.channel.id = this.context.channel.name = e;
            const t = this.createMessage({
                command: "create"
            });
            t.channel.type = "BROADCAST", t.channel.videoCodec = this.context.videoCodec, t.channel.audioCodec = this.context.audioCodec, t.channel.simulcast = this.context.simulcast, t.channel.id = e, f.v("ConnectCh Message ->:", t), f.i("channel id: " + this.context.channel.id), this.send(JSON.stringify(t))
        }
        disconnectChannel() {
            f.i("Signaling: Close channel:");
            const e = this.createMessage({
                command: "disconnect"
            });
            f.v("DisconnectCh Message ->:", e), this.send(JSON.stringify(e))
        }
        setSimulcastPriority(e) {
            f.i("Signaling: Set Simulcast Priority", e);
            const t = this.createMessage({
                command: "switchStream",
                body: e
            });
            this.context.currentSimulcast = e, t.channel.type = "VIEVER", t.channel.id = this.context.channel.id, f.v("SetSimulcastPriority Message ->:", t), this.send(JSON.stringify(t))
        }
        reduceVideoQuality() {
            let e = this.context.currentSimulcast;
            if ("HIGH" === e) e = "MEDIUM";
            else {
                if ("MEDIUM" !== e) return;
                e = "LOW"
            }
            this.setSimulcastPriority(e)
        }
        isOpened() {
            return this.context.isConnectToSignal
        }
    }

    function N({
        context: e,
        media: t,
        config: n
    }) {
        const r = {
            async onCreate(t) {
                switch (f.i("Signaling: On create channel"), e.isCaller = !1, t.code) {
                    case "500":
                        e.eventManager.dispatchEvent("onError", "Signaling: 500 Error");
                        break;
                    case "502":
                        e.eventManager.dispatchEvent("onError", "Signaling: 502 Error: Unknown token");
                        break;
                    case "530":
                        e.eventManager.dispatchEvent("onError", "Signaling: 530 Error: No media server");
                        break;
                    default:
                        f.i("Signaling:", t.code)
                }
                e.eventManager.hasEventListener("onStateChange") && e.eventManager.dispatchEvent("onStateChange", "WAIT"), t.channel || e.eventManager.hasEventListener("onError") && e.eventManager.dispatchEvent("onError", "ConnectChannelFailedError"), e.channel = t.channel, f.i("Channel id:", e.channel.id), f.i("Channel type: ", e.channel.type), !0 !== n.media.recvonly && (f.d("try to create local stream"), await e.mediaManager.createLocalStream(e, n.media), e.mediaManager.bindLocalStreamToPeerConnection(e.peerConnection), f.i("success to create and bind local stream to pc")), e.eventManager.hasEventListener("onCreateChannel") && e.eventManager.dispatchEvent("onCreateChannel", e.channel.id), e.eventManager.hasEventListener("onConnect") && "P2P" === e.channel.type && e.eventManager.dispatchEvent("onConnect", e.channel.id), !e.eventManager.hasEventListener("onCreate") || "BROADCAST" !== e.channel.type && "ROOM" !== e.channel.type ? e.eventManager.hasEventListener("onJoin") && "VIEWER" === e.channel.type && e.eventManager.dispatchEvent("onJoin", e.channel.id) : e.eventManager.dispatchEvent("onCreate", e.channel.id), "BROADCAST" === e.channel.type || "ROOM" === e.channel.type ? function() {
                    let t = {
                        offerToReceiveAudio: !1,
                        offerToReceiveVideo: !1
                    };
                    "music" === n.rtc.audioType && (t.voiceActivityDetection = !1);
                    if ("BROADCAST" === e.channel.type && "Firefox" === p.name && e.simulcast) {
                        const t = 1;
                        let n = e.peerConnection.getSenders()[t];
                        n.getParameters();
                        n.setParameters({
                            encodings: [{
                                rid: "high",
                                active: !0,
                                priority: "high",
                                maxBitrate: 25e5
                            }, {
                                rid: "medium",
                                active: !0,
                                priority: "medium",
                                maxBitrate: 5e5
                            }, {
                                rid: "low",
                                active: !0,
                                priority: "low",
                                maxBitrate: 1e5
                            }]
                        }).then(() => {
                            console.log(e.peerConnection.getSenders()[t].getParameters())
                        })
                    }
                    e.peerConnection.createOffer(t).then(o).catch(t => {
                        f.e("PeerConnection: Create offer failed:", t), f.errorEvt(e, "1009", "create offer is failed:" + t), e.eventManager.hasEventListener("onError") && e.eventManager.dispatchEvent("onError", "ICEFailedError")
                    })
                }() : "VIEWER" === e.channel.type && function() {
                    f.i("createViewerOffer is called " + p.name);
                    e.peerConnection.createOffer({
                        offerToReceiveAudio: 1,
                        offerToReceiveVideo: 1
                    }).then(i).catch(t => {
                        f.e("PeerConnection: Create offer failed:", t), f.errorEvt(e, "1009", "create offer is failed:" + t), e.eventManager.hasEventListener("onError") && e.eventManager.dispatchEvent("onError", "ICEFailedError")
                    })
                }()
            },
            async onConnect(t) {
                if (f.i("Signaling: On connect channel"), e.isCaller = !0, e.channel = t.channel, e.state = "CONNECT", f.i("Channel id:", e.channel.id), f.d("Channel type: ", e.channel.type), f.d("isCaller: true"), e.eventManager.hasEventListener("onStateChange") && e.eventManager.dispatchEvent("onStateChange", "CONNECT"), !t.channel) return void(e.eventManager.hasEventListener("onError") && e.eventManager.dispatchEvent("onError", "ConnectChannelFailedError"));
                !0 !== n.media.recvonly && (f.d("try to create local stream"), await e.mediaManager.createLocalStream(e, n.media), e.mediaManager.bindLocalStreamToPeerConnection(e.peerConnection), f.i("success to create and bind local stream to pc")), e.eventManager.hasEventListener("onConnectChannel") && e.eventManager.dispatchEvent("onConnectChannel", e.channel.id);
                e.peerConnection.createOffer({
                    offerToReceiveAudio: 1,
                    offerToReceiveVideo: 1
                }).then(o).catch(t => {
                    if (f.e("PeerConnection: Create offer failed:", t), f.errorEvt(e, "4231", "Create offer failed:" + t), e.eventManager.hasEventListener("onError")) return e.eventManager.dispatchEvent("onError", "ICEFailedError"), void e.eventManager.dispatchEvent("onError", "4231", "Create offer failed :" + t)
                })
            },
            onReconnect(t) {
                f.i("Signaling: On re-connect channel"), e.eventManager.hasEventListener("onReconnect") && e.eventManager.dispatchEvent("onReconnect", t.body)
            },
            onSdp(t) {
                f.i("Signaling: On sdp");
                const r = new RTCSessionDescription(JSON.parse(t.body));
                var i = {
                    topic: "log",
                    messages: {
                        log: "sdpType:" + r.type + " " + t.body,
                        logLevel: "info",
                        sdkVersion: e.sdkVersion,
                        svcId: e.serviceId,
                        pId: e.token,
                        chId: e.channel.id
                    }
                };
                f.evt(JSON.stringify(i)), f.d("-> Remote Description:", r), e.videoBandwidth && "Safari" !== p.name && "safari" !== p.name && (r.sdp = v.setMediaBitrate(r.sdp, "video", e.videoBandwidth)), "music" === n.rtc.audioType && "Safari" !== p.name && "safari" !== p.name && (r.sdp = r.sdp.replace("a=rtpmap:111 opus/48000/2", "a=rtpmap:111 opus/48000/2\na=fmtp:111 maxaveragebitrate=128000;stereo=1;cbr=1")), e.peerConnection.setRemoteDescription(r).then(() => {
                    f.i("Remote Description Setted")
                }).catch(t => {
                    if (f.e("PeerConnection: Remote description set failed:", t), f.errorEvt(e, "1009", "set remote sdp is failed:" + t), e.eventManager.hasEventListener("onError")) return e.eventManager.dispatchEvent("onError", "ICEFailedError"), void e.eventManager.dispatchEvent("onError", "4233", "set remote sdp is failed")
                }), f.d("Am I a caller?:", e.isCaller), f.d("channel info?:", e.channel), e.isCaller || "offer" !== r.type || (f.i("Create answer"), e.peerConnection.createAnswer().then(o).catch(t => {
                    f.e("PeerConnection: Create Answer failed:", t), e.eventManager.hasEventListener("onError") && e.eventManager.dispatchEvent("onError", "ICEFailedError")
                }))
            },
            async onDisconnectChannel(t) {
                f.i("Signaling: onDisconnectChannel"), await a(), e.eventManager.hasEventListener("onDisconnectChannel") && e.eventManager.dispatchEvent("onDisconnectChannel", t.body), e.eventManager.hasEventListener("onClose") && e.eventManager.dispatchEvent("onClose", {
                    message: t.body,
                    closeType: "OTHER"
                })
            },
            onRoomEvent(t) {
                f.i("Signaling: onRoomEvent:" + t.body), e.eventManager.hasEventListener("onRoomEvent") && e.eventManager.dispatchEvent("onRoomEvent", {
                    event: t.body,
                    channel: t.channel
                })
            },
            ping(t) {
                t.command = "pong", e.signalingConnection.send(JSON.stringify(t))
            },
            onStateChange(t) {
                if (S.includes(t.body)) {
                    if (t.body === e.state) return;
                    switch (e.state = t.body, e.eventManager.hasEventListener("onStateChange") && e.eventManager.dispatchEvent("onStateChange", t.body), t.body) {
                        case "INIT":
                            f.i(">STATE:INIT");
                            break;
                        case "WAIT":
                            f.i(">STATE:WAIT");
                            break;
                        case "CONNECT":
                            f.i(">STATE:CONNECT");
                            break;
                        case "COMPLETE":
                            f.i(">STATE:COMPLETE"), e.eventManager.hasEventListener("onStateChange") && e.eventManager.dispatchEvent("onStateChange", "COMPLETE"), e.eventManager.hasEventListener("onComplete") && e.eventManager.dispatchEvent("onComplete");
                            var n = {
                                topic: "log",
                                messages: {
                                    log: "IceConnectionState: CONNECTED",
                                    logLevel: "info",
                                    os: p.os.family,
                                    osVersion: p.os.version || "0",
                                    device: p.name,
                                    deviceVersion: p.version || "0",
                                    networkType: Navigator.connection,
                                    svcId: e.serviceId,
                                    pId: e.token,
                                    sdkVersion: e.sdkVersion,
                                    status: "COMPLETE",
                                    chId: e.channel.id
                                }
                            };
                            f.evt(JSON.stringify(n));
                            break;
                        case "CLOSE":
                            f.i(">STATE:CLOSE"), a(), e.eventManager.hasEventListener("onStateChange") && e.eventManager.dispatchEvent("onStateChange", "CLOSE"), e.eventManager.hasEventListener("onError") && e.eventManager.dispatchEvent("onError", "4241", "Disconnected from Signal Server"), e.eventManager.hasEventListener("onClose") && e.eventManager.dispatchEvent("onClose", {
                                closeType: "OTHER_UNEXPECTED"
                            });
                            break;
                        case "FAIL":
                            f.i(">STATE:FAIL"), a(), e.eventManager.hasEventListener("onError") && e.eventManager.dispatchEvent("onError", "ICEFailedError")
                    }
                } else f(f.e("Unknown signaling state:" + t.body));
                f.gEnd()
            },
            onIce(t) {
                const n = new RTCIceCandidate(JSON.parse(t.body));
                f.d("Candidate:", JSON.stringify(n));
                var r = {
                    topic: "log",
                    messages: {
                        log: "iceType:remote " + t.body,
                        logLevel: "info",
                        sdkVersion: e.sdkVersion,
                        svcId: e.serviceId,
                        pId: e.token,
                        chId: e.channel.id
                    }
                };
                f.evt(JSON.stringify(r)), e.peerConnection.addIceCandidate(n).then(() => {
                    f.d("Add ICE candidate success")
                }).catch(t => {
                    f.e("Peer Connection: Add ICE candidate failed", t), f.errorEvt(e, "1001", "add ice candidate failed:" + t), e.eventManager.hasEventListener("onError") && (e.eventManager.dispatchEvent("onError", "ICEFailedError"), e.eventManager.dispatchEvent("onError", "4246", "add ice candidate failed"))
                })
            },
            onMessage(t) {
                f.d("Signaling: On message: " + t.body), e.eventManager.hasEventListener("onMessage") && e.eventManager.dispatchEvent("onMessage", t.body)
            },
            onSearch(t) {
                f.d("Signaling: On search: " + t.body), e.eventManager.hasEventListener("onSearch") && e.eventManager.dispatchEvent("onSearch", t.body)
            },
            ack(e) {},
            onError(t) {
                f.e("Signaling error -> Message:", t), e.eventManager.hasEventListener("onError") && e.eventManager.dispatchEvent("onError", JSON.stringify(t.code), JSON.stringify(t.body));
                var n = {
                    topic: "log",
                    messages: {
                        log: t,
                        logLevel: "error",
                        errorCode: "1000",
                        sdkVersion: e.sdkVersion,
                        svcId: e.serviceId,
                        pId: e.token,
                        chId: e.channel.id
                    }
                };
                f.evt(JSON.stringify(n))
            }
        };

        function i(t) {
            f.i("Local Description:", t), "music" === n.rtc.audioType && (t.sdp = s(t.sdp)), e.videoCodec ? (f.v("Signaling: video codec: " + e.videoCodec), t.sdp = c(t.sdp, /m=video(:?.*)?/, e.videoCodec)) : (f.v("Signaling: video codec: H264"), t.sdp = c(t.sdp, /m=video(:?.*)?/, "H264"));
            const r = e.signalingConnection.createMessage({
                command: "sdp",
                body: JSON.stringify(t)
            });
            r.channel.type = e.channel.type, e.signalingConnection.send(JSON.stringify(r))
        }

        function o(t) {
            f.i("new Local Description:", t), e.videoCodec ? (f.v("Signaling: video codec: " + e.videoCodec), t.sdp = c(t.sdp, /m=video(:?.*)?/, e.videoCodec)) : (f.v("Signaling: video codec: H264"), t.sdp = c(t.sdp, /m=video(:?.*)?/, "H264")), e.videoBandwidth && (t.sdp = v.setMediaBitrate(t.sdp, "video", e.videoBandwidth)), "BROADCAST" === e.channel.type && "Chrome" === p.name && parseInt(p.version.split(".")[0], 10) < 74 && e.simulcast && (t.sdp = function(e) {
                for (var t = e.split("\r\n"), n = !1, r = [-1], i = [-1], o = null, a = null, s = null, c = null, d = -1, l = 0; l < t.length; l++) {
                    var p = t[l].match(/m=(\w+) */);
                    if (p) {
                        var u = p[1];
                        if ("video" === u) {
                            if (!(r[0] < 0)) {
                                d = l;
                                break
                            }
                            n = !0
                        } else if (r[0] > -1) {
                            d = l;
                            break
                        }
                    } else if (n) {
                        var h = t[l].match(/a=ssrc-group:FID (\d+) (\d+)/);
                        if (h) r[0] = h[1], i[0] = h[2], t.splice(l, 1), l--;
                        else {
                            if (r[0]) {
                                var v = t[l].match("a=ssrc:" + r[0] + " cname:(.+)");
                                if (v && (o = v[1]), (v = t[l].match("a=ssrc:" + r[0] + " msid:(.+)")) && (a = v[1]), (v = t[l].match("a=ssrc:" + r[0] + " mslabel:(.+)")) && (s = v[1]), (v = t[l].match("a=ssrc:" + r + " label:(.+)")) && (c = v[1]), 0 === t[l].indexOf("a=ssrc:" + i)) {
                                    t.splice(l, 1), l--;
                                    continue
                                }
                                if (0 === t[l].indexOf("a=ssrc:" + r[0])) {
                                    t.splice(l, 1), l--;
                                    continue
                                }
                            }
                            0 != t[l].length || (t.splice(l, 1), l--)
                        }
                    }
                }
                if (r[0] < 0) {
                    d = -1, n = !1;
                    for (var l = 0; l < t.length; l++) {
                        var p = t[l].match(/m=(\w+) */);
                        if (p) {
                            var u = p[1];
                            if ("video" === u) {
                                if (!(r[0] < 0)) {
                                    d = l;
                                    break
                                }
                                n = !0
                            } else if (r[0] > -1) {
                                d = l;
                                break
                            }
                        } else if (n) {
                            if (r[0] < 0) {
                                var m = t[l].match(/a=ssrc:(\d+)/);
                                if (m) {
                                    r[0] = m[1], t.splice(l, 1), l--;
                                    continue
                                }
                            } else {
                                var v = t[l].match("a=ssrc:" + r[0] + " cname:(.+)");
                                if (v && (o = v[1]), (v = t[l].match("a=ssrc:" + r[0] + " msid:(.+)")) && (a = v[1]), (v = t[l].match("a=ssrc:" + r[0] + " mslabel:(.+)")) && (s = v[1]), (v = t[l].match("a=ssrc:" + r[0] + " label:(.+)")) && (c = v[1]), 0 === t[l].indexOf("a=ssrc:" + i[0])) {
                                    t.splice(l, 1), l--;
                                    continue
                                }
                                if (0 === t[l].indexOf("a=ssrc:" + r[0])) {
                                    t.splice(l, 1), l--;
                                    continue
                                }
                            }
                            0 != t[l].length || (t.splice(l, 1), l--)
                        }
                    }
                }
                if (r[0] < 0) return f.e("Couldn't find the video SSRC, simulcasting NOT enabled"), e;
                d < 0 && (d = t.length);
                r[1] = Math.floor(4294967295 * Math.random()), r[2] = Math.floor(4294967295 * Math.random()), i[1] = Math.floor(4294967295 * Math.random()), i[2] = Math.floor(4294967295 * Math.random());
                for (var l = 0; l < r.length; l++) o && (t.splice(d, 0, "a=ssrc:" + r[l] + " cname:" + o), d++), a && (t.splice(d, 0, "a=ssrc:" + r[l] + " msid:" + a), d++), s && (t.splice(d, 0, "a=ssrc:" + r[l] + " mslabel:" + s), d++), c && (t.splice(d, 0, "a=ssrc:" + r[l] + " label:" + c), d++), o && (t.splice(d, 0, "a=ssrc:" + i[l] + " cname:" + o), d++), a && (t.splice(d, 0, "a=ssrc:" + i[l] + " msid:" + a), d++), s && (t.splice(d, 0, "a=ssrc:" + i[l] + " mslabel:" + s), d++), c && (t.splice(d, 0, "a=ssrc:" + i[l] + " label:" + c), d++);
                t.splice(d, 0, "a=ssrc-group:FID " + r[2] + " " + i[2]), t.splice(d, 0, "a=ssrc-group:FID " + r[1] + " " + i[1]), t.splice(d, 0, "a=ssrc-group:FID " + r[0] + " " + i[0]), t.splice(d, 0, "a=ssrc-group:SIM " + r[0] + " " + r[1]), (e = t.join("\r\n")).endsWith("\r\n") || (e += "\r\n");
                return e
            }(t.sdp)), "music" === n.rtc.audioType && (t.sdp = s(t.sdp));
            const r = e.signalingConnection.createMessage({
                command: "sdp",
                body: JSON.stringify(t)
            });
            r.channel.type = e.channel.type, e.peerConnection.setLocalDescription(t).then(() => {
                f.v("Local Description Setted:", e.peerConnection.localDescription), f.i("Message ->:", r), e.signalingConnection.send(JSON.stringify(r))
            }).catch(t => {
                f.e("PeerConnection: set Local description failed", t), f.errorEvt(e, "4232", "set local offer is failed:" + t), e.eventManager.hasEventListener("onError") && (e.eventManager.dispatchEvent("onError", "ConnectChannelFailedError"), e.eventManager.dispatchEvent("onError", "4232", "set local offer is failed"))
            })
        }
        async function a() {
            f.i("close resources"), e.health && e.health.stop(), e.state = "CLOSE", e.useRecord && e.remoteRecorder && (e.remoteRecorder.stop(), e.remoteRecorder = null), e.useRecord && e.localRecorder && (e.localRecorder.stop(), e.localRecorder = null, e.useRecord = !1), e.remoteVideo.srcObject && e.remoteVideo.srcObject.getTracks().forEach(e => e.stop()), e.remoteVideo && (e.remoteVideo.srcObject = null), e.signalingConnection && e.peerConnection && (e.qualityChecker || (e.qualityChecker = new y(e), await e.qualityChecker.check()), e.peerConnection.close(), e.signalingConnection.close(), e.peerConnection && (e.hasAddTrack ? e.peerConnection.ontrack = null : e.peerConnection.onaddstream = null, e.peerConnection.onremovestream = null, e.peerConnection.onicecandidate = null, e.peerConnection.oniceconnectionstatechange = null, e.peerConnection.onsignalingstatechange = null, e.peerConnection.onicegatheringstatechange = null, e.peerConnection.onnegotiationneeded = null, e.peerConnection = null))
        }

        function s(e) {
            return e.replace("a=fmtp:111 minptime=10;useinbandfec=1", "a=fmtp:111 useinbandfec=1;minptime=10;stereo=1;cbr=1;maxaveragebitrate=128000")
        }

        function c(e, t, n) {
            var r, i, o, a = [],
                s = new RegExp("a=rtpmap:(\\d+) " + n + "/\\d+");
            if (!(r = e.match(t))) return e;
            if (!(i = e.match(s))) return e;
            r = r[0], i = i[1], o = r.split(" "), a.push(o[0]), a.push(o[1]), a.push(o[2]), a.push(i);
            for (var c = 3; c < o.length; c++) o[c] !== i && a.push(o[c]);
            return e.replace(r, a.join(" "))
        }
        e.signalingConnection.onMessage(function(e) {
            f.d("Signaling: Got command from server");
            const t = JSON.parse(e.data),
                n = t.command;
            f.v(`-> Message: ${t.command}:`, t), r[n](t)
        })
    }
    let F = !0,
        V = !0;

    function U(e, t, n) {
        const r = e.match(t);
        return r && r.length >= n && parseInt(r[n], 10)
    }

    function B(e, t, n) {
        if (!e.RTCPeerConnection) return;
        const r = e.RTCPeerConnection.prototype,
            i = r.addEventListener;
        r.addEventListener = function(e, r) {
            if (e !== t) return i.apply(this, arguments);
            const o = e => {
                const t = n(e);
                t && r(t)
            };
            return this._eventMap = this._eventMap || {}, this._eventMap[r] = o, i.apply(this, [e, o])
        };
        const o = r.removeEventListener;
        r.removeEventListener = function(e, n) {
            if (e !== t || !this._eventMap || !this._eventMap[n]) return o.apply(this, arguments);
            const r = this._eventMap[n];
            return delete this._eventMap[n], o.apply(this, [e, r])
        }, Object.defineProperty(r, "on" + t, {
            get() {
                return this["_on" + t]
            },
            set(e) {
                this["_on" + t] && (this.removeEventListener(t, this["_on" + t]), delete this["_on" + t]), e && this.addEventListener(t, this["_on" + t] = e)
            },
            enumerable: !0,
            configurable: !0
        })
    }

    function G(e) {
        return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (F = e, e ? "adapter.js logging disabled" : "adapter.js logging enabled")
    }

    function W(e) {
        return "boolean" != typeof e ? new Error("Argument type: " + typeof e + ". Please use a boolean.") : (V = !e, "adapter.js deprecation warnings " + (e ? "disabled" : "enabled"))
    }

    function J() {
        if ("object" == typeof window) {
            if (F) return;
            "undefined" != typeof console && "function" == typeof console.log && console.log.apply(console, arguments)
        }
    }

    function q(e, t) {
        V && console.warn(e + " is deprecated, please use " + t + " instead.")
    }

    function H(e) {
        const {
            navigator: t
        } = e, n = {
            browser: null,
            version: null
        };
        if (void 0 === e || !e.navigator) return n.browser = "Not a browser.", n;
        if (t.mozGetUserMedia) n.browser = "firefox", n.version = U(t.userAgent, /Firefox\/(\d+)\./, 1);
        else if (t.webkitGetUserMedia) n.browser = "chrome", n.version = U(t.userAgent, /Chrom(e|ium)\/(\d+)\./, 2);
        else if (t.mediaDevices && t.userAgent.match(/Edge\/(\d+).(\d+)$/)) n.browser = "edge", n.version = U(t.userAgent, /Edge\/(\d+).(\d+)$/, 2);
        else {
            if (!e.RTCPeerConnection || !t.userAgent.match(/AppleWebKit\/(\d+)\./)) return n.browser = "Not a supported browser.", n;
            n.browser = "safari", n.version = U(t.userAgent, /AppleWebKit\/(\d+)\./, 1)
        }
        return n
    }

    function z(e) {
        return "object" != typeof e ? e : Object.keys(e).reduce(function(t, n) {
            const r = "object" == typeof e[n],
                i = r ? z(e[n]) : e[n],
                o = r && !Object.keys(i).length;
            return void 0 === i || o ? t : Object.assign(t, {
                [n]: i
            })
        }, {})
    }
    const $ = J;

    function X(e) {
        const t = e && e.navigator;
        if (!t.mediaDevices) return;
        const n = H(e),
            r = function(e) {
                if ("object" != typeof e || e.mandatory || e.optional) return e;
                const t = {};
                return Object.keys(e).forEach(n => {
                    if ("require" === n || "advanced" === n || "mediaSource" === n) return;
                    const r = "object" == typeof e[n] ? e[n] : {
                        ideal: e[n]
                    };
                    void 0 !== r.exact && "number" == typeof r.exact && (r.min = r.max = r.exact);
                    const i = function(e, t) {
                        return e ? e + t.charAt(0).toUpperCase() + t.slice(1) : "deviceId" === t ? "sourceId" : t
                    };
                    if (void 0 !== r.ideal) {
                        t.optional = t.optional || [];
                        let e = {};
                        "number" == typeof r.ideal ? (e[i("min", n)] = r.ideal, t.optional.push(e), (e = {})[i("max", n)] = r.ideal, t.optional.push(e)) : (e[i("", n)] = r.ideal, t.optional.push(e))
                    }
                    void 0 !== r.exact && "number" != typeof r.exact ? (t.mandatory = t.mandatory || {}, t.mandatory[i("", n)] = r.exact) : ["min", "max"].forEach(e => {
                        void 0 !== r[e] && (t.mandatory = t.mandatory || {}, t.mandatory[i(e, n)] = r[e])
                    })
                }), e.advanced && (t.optional = (t.optional || []).concat(e.advanced)), t
            },
            i = function(e, i) {
                if (n.version >= 61) return i(e);
                if ((e = JSON.parse(JSON.stringify(e))) && "object" == typeof e.audio) {
                    const t = function(e, t, n) {
                        t in e && !(n in e) && (e[n] = e[t], delete e[t])
                    };
                    t((e = JSON.parse(JSON.stringify(e))).audio, "autoGainControl", "googAutoGainControl"), t(e.audio, "noiseSuppression", "googNoiseSuppression"), e.audio = r(e.audio)
                }
                if (e && "object" == typeof e.video) {
                    let o = e.video.facingMode;
                    o = o && ("object" == typeof o ? o : {
                        ideal: o
                    });
                    const a = n.version < 66;
                    if (o && ("user" === o.exact || "environment" === o.exact || "user" === o.ideal || "environment" === o.ideal) && (!t.mediaDevices.getSupportedConstraints || !t.mediaDevices.getSupportedConstraints().facingMode || a)) {
                        let n;
                        if (delete e.video.facingMode, "environment" === o.exact || "environment" === o.ideal ? n = ["back", "rear"] : "user" !== o.exact && "user" !== o.ideal || (n = ["front"]), n) return t.mediaDevices.enumerateDevices().then(t => {
                            let a = (t = t.filter(e => "videoinput" === e.kind)).find(e => n.some(t => e.label.toLowerCase().includes(t)));
                            return !a && t.length && n.includes("back") && (a = t[t.length - 1]), a && (e.video.deviceId = o.exact ? {
                                exact: a.deviceId
                            } : {
                                ideal: a.deviceId
                            }), e.video = r(e.video), $("chrome: " + JSON.stringify(e)), i(e)
                        })
                    }
                    e.video = r(e.video)
                }
                return $("chrome: " + JSON.stringify(e)), i(e)
            },
            o = function(e) {
                return n.version >= 64 ? e : {
                    name: {
                        PermissionDeniedError: "NotAllowedError",
                        PermissionDismissedError: "NotAllowedError",
                        InvalidStateError: "NotAllowedError",
                        DevicesNotFoundError: "NotFoundError",
                        ConstraintNotSatisfiedError: "OverconstrainedError",
                        TrackStartError: "NotReadableError",
                        MediaDeviceFailedDueToShutdown: "NotAllowedError",
                        MediaDeviceKillSwitchOn: "NotAllowedError",
                        TabCaptureError: "AbortError",
                        ScreenCaptureError: "AbortError",
                        DeviceCaptureError: "AbortError"
                    } [e.name] || e.name,
                    message: e.message,
                    constraint: e.constraint || e.constraintName,
                    toString() {
                        return this.name + (this.message && ": ") + this.message
                    }
                }
            };
        t.getUserMedia = function(e, n, r) {
            i(e, e => {
                t.webkitGetUserMedia(e, n, e => {
                    r && r(o(e))
                })
            })
        }.bind(t);
        const a = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
        t.mediaDevices.getUserMedia = function(e) {
            return i(e, e => a(e).then(t => {
                if (e.audio && !t.getAudioTracks().length || e.video && !t.getVideoTracks().length) throw t.getTracks().forEach(e => {
                    e.stop()
                }), new DOMException("", "NotFoundError");
                return t
            }, e => Promise.reject(o(e))))
        }
    }

    function K(e, t, n) {
        const r = n ? "outbound-rtp" : "inbound-rtp",
            i = new Map;
        if (null === t) return i;
        const o = [];
        return e.forEach(e => {
            "track" === e.type && e.trackIdentifier === t.id && o.push(e)
        }), o.forEach(t => {
            e.forEach(n => {
                n.type === r && n.trackId === t.id && function e(t, n, r) {
                    n && !r.has(n.id) && (r.set(n.id, n), Object.keys(n).forEach(i => {
                        i.endsWith("Id") ? e(t, t.get(n[i]), r) : i.endsWith("Ids") && n[i].forEach(n => {
                            e(t, t.get(n), r)
                        })
                    }))
                }(e, n, i)
            })
        }), i
    }

    function Y(e) {
        e.MediaStream = e.MediaStream || e.webkitMediaStream
    }

    function Q(e) {
        if ("object" != typeof e || !e.RTCPeerConnection || "ontrack" in e.RTCPeerConnection.prototype) B(e, "track", e => (e.transceiver || Object.defineProperty(e, "transceiver", {
            value: {
                receiver: e.receiver
            }
        }), e));
        else {
            Object.defineProperty(e.RTCPeerConnection.prototype, "ontrack", {
                get() {
                    return this._ontrack
                },
                set(e) {
                    this._ontrack && this.removeEventListener("track", this._ontrack), this.addEventListener("track", this._ontrack = e)
                },
                enumerable: !0,
                configurable: !0
            });
            const t = e.RTCPeerConnection.prototype.setRemoteDescription;
            e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                return this._ontrackpoly || (this._ontrackpoly = (t => {
                    t.stream.addEventListener("addtrack", n => {
                        let r;
                        r = e.RTCPeerConnection.prototype.getReceivers ? this.getReceivers().find(e => e.track && e.track.id === n.track.id) : {
                            track: n.track
                        };
                        const i = new Event("track");
                        i.track = n.track, i.receiver = r, i.transceiver = {
                            receiver: r
                        }, i.streams = [t.stream], this.dispatchEvent(i)
                    }), t.stream.getTracks().forEach(n => {
                        let r;
                        r = e.RTCPeerConnection.prototype.getReceivers ? this.getReceivers().find(e => e.track && e.track.id === n.id) : {
                            track: n
                        };
                        const i = new Event("track");
                        i.track = n, i.receiver = r, i.transceiver = {
                            receiver: r
                        }, i.streams = [t.stream], this.dispatchEvent(i)
                    })
                }), this.addEventListener("addstream", this._ontrackpoly)), t.apply(this, arguments)
            }
        }
    }

    function Z(e) {
        if ("object" == typeof e && e.RTCPeerConnection && !("getSenders" in e.RTCPeerConnection.prototype) && "createDTMFSender" in e.RTCPeerConnection.prototype) {
            const t = function(e, t) {
                return {
                    track: t,
                    get dtmf() {
                        return void 0 === this._dtmf && ("audio" === t.kind ? this._dtmf = e.createDTMFSender(t) : this._dtmf = null), this._dtmf
                    },
                    _pc: e
                }
            };
            if (!e.RTCPeerConnection.prototype.getSenders) {
                e.RTCPeerConnection.prototype.getSenders = function() {
                    return this._senders = this._senders || [], this._senders.slice()
                };
                const n = e.RTCPeerConnection.prototype.addTrack;
                e.RTCPeerConnection.prototype.addTrack = function(e, r) {
                    let i = n.apply(this, arguments);
                    return i || (i = t(this, e), this._senders.push(i)), i
                };
                const r = e.RTCPeerConnection.prototype.removeTrack;
                e.RTCPeerConnection.prototype.removeTrack = function(e) {
                    r.apply(this, arguments);
                    const t = this._senders.indexOf(e); - 1 !== t && this._senders.splice(t, 1)
                }
            }
            const n = e.RTCPeerConnection.prototype.addStream;
            e.RTCPeerConnection.prototype.addStream = function(e) {
                this._senders = this._senders || [], n.apply(this, [e]), e.getTracks().forEach(e => {
                    this._senders.push(t(this, e))
                })
            };
            const r = e.RTCPeerConnection.prototype.removeStream;
            e.RTCPeerConnection.prototype.removeStream = function(e) {
                this._senders = this._senders || [], r.apply(this, [e]), e.getTracks().forEach(e => {
                    const t = this._senders.find(t => t.track === e);
                    t && this._senders.splice(this._senders.indexOf(t), 1)
                })
            }
        } else if ("object" == typeof e && e.RTCPeerConnection && "getSenders" in e.RTCPeerConnection.prototype && "createDTMFSender" in e.RTCPeerConnection.prototype && e.RTCRtpSender && !("dtmf" in e.RTCRtpSender.prototype)) {
            const t = e.RTCPeerConnection.prototype.getSenders;
            e.RTCPeerConnection.prototype.getSenders = function() {
                const e = t.apply(this, []);
                return e.forEach(e => e._pc = this), e
            }, Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
                get() {
                    return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = this._pc.createDTMFSender(this.track) : this._dtmf = null), this._dtmf
                }
            })
        }
    }

    function ee(e) {
        if (!("object" == typeof e && e.RTCPeerConnection && e.RTCRtpSender && e.RTCRtpReceiver)) return;
        if (!("getStats" in e.RTCRtpSender.prototype)) {
            const t = e.RTCPeerConnection.prototype.getSenders;
            t && (e.RTCPeerConnection.prototype.getSenders = function() {
                const e = t.apply(this, []);
                return e.forEach(e => e._pc = this), e
            });
            const n = e.RTCPeerConnection.prototype.addTrack;
            n && (e.RTCPeerConnection.prototype.addTrack = function() {
                const e = n.apply(this, arguments);
                return e._pc = this, e
            }), e.RTCRtpSender.prototype.getStats = function() {
                const e = this;
                return this._pc.getStats().then(t => K(t, e.track, !0))
            }
        }
        if (!("getStats" in e.RTCRtpReceiver.prototype)) {
            const t = e.RTCPeerConnection.prototype.getReceivers;
            t && (e.RTCPeerConnection.prototype.getReceivers = function() {
                const e = t.apply(this, []);
                return e.forEach(e => e._pc = this), e
            }), B(e, "track", e => (e.receiver._pc = e.srcElement, e)), e.RTCRtpReceiver.prototype.getStats = function() {
                const e = this;
                return this._pc.getStats().then(t => K(t, e.track, !1))
            }
        }
        if (!("getStats" in e.RTCRtpSender.prototype && "getStats" in e.RTCRtpReceiver.prototype)) return;
        const t = e.RTCPeerConnection.prototype.getStats;
        e.RTCPeerConnection.prototype.getStats = function() {
            if (arguments.length > 0 && arguments[0] instanceof e.MediaStreamTrack) {
                const e = arguments[0];
                let t, n, r;
                return this.getSenders().forEach(n => {
                    n.track === e && (t ? r = !0 : t = n)
                }), this.getReceivers().forEach(t => (t.track === e && (n ? r = !0 : n = t), t.track === e)), r || t && n ? Promise.reject(new DOMException("There are more than one sender or receiver for the track.", "InvalidAccessError")) : t ? t.getStats() : n ? n.getStats() : Promise.reject(new DOMException("There is no sender or receiver for the track.", "InvalidAccessError"))
            }
            return t.apply(this, arguments)
        }
    }

    function te(e) {
        e.RTCPeerConnection.prototype.getLocalStreams = function() {
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, Object.keys(this._shimmedLocalStreams).map(e => this._shimmedLocalStreams[e][0])
        };
        const t = e.RTCPeerConnection.prototype.addTrack;
        e.RTCPeerConnection.prototype.addTrack = function(e, n) {
            if (!n) return t.apply(this, arguments);
            this._shimmedLocalStreams = this._shimmedLocalStreams || {};
            const r = t.apply(this, arguments);
            return this._shimmedLocalStreams[n.id] ? -1 === this._shimmedLocalStreams[n.id].indexOf(r) && this._shimmedLocalStreams[n.id].push(r) : this._shimmedLocalStreams[n.id] = [n, r], r
        };
        const n = e.RTCPeerConnection.prototype.addStream;
        e.RTCPeerConnection.prototype.addStream = function(e) {
            this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e.getTracks().forEach(e => {
                if (this.getSenders().find(t => t.track === e)) throw new DOMException("Track already exists.", "InvalidAccessError")
            });
            const t = this.getSenders();
            n.apply(this, arguments);
            const r = this.getSenders().filter(e => -1 === t.indexOf(e));
            this._shimmedLocalStreams[e.id] = [e].concat(r)
        };
        const r = e.RTCPeerConnection.prototype.removeStream;
        e.RTCPeerConnection.prototype.removeStream = function(e) {
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, delete this._shimmedLocalStreams[e.id], r.apply(this, arguments)
        };
        const i = e.RTCPeerConnection.prototype.removeTrack;
        e.RTCPeerConnection.prototype.removeTrack = function(e) {
            return this._shimmedLocalStreams = this._shimmedLocalStreams || {}, e && Object.keys(this._shimmedLocalStreams).forEach(t => {
                const n = this._shimmedLocalStreams[t].indexOf(e); - 1 !== n && this._shimmedLocalStreams[t].splice(n, 1), 1 === this._shimmedLocalStreams[t].length && delete this._shimmedLocalStreams[t]
            }), i.apply(this, arguments)
        }
    }

    function ne(e) {
        if (!e.RTCPeerConnection) return;
        const t = H(e);
        if (e.RTCPeerConnection.prototype.addTrack && t.version >= 65) return te(e);
        const n = e.RTCPeerConnection.prototype.getLocalStreams;
        e.RTCPeerConnection.prototype.getLocalStreams = function() {
            const e = n.apply(this);
            return this._reverseStreams = this._reverseStreams || {}, e.map(e => this._reverseStreams[e.id])
        };
        const r = e.RTCPeerConnection.prototype.addStream;
        e.RTCPeerConnection.prototype.addStream = function(t) {
            if (this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, t.getTracks().forEach(e => {
                    if (this.getSenders().find(t => t.track === e)) throw new DOMException("Track already exists.", "InvalidAccessError")
                }), !this._reverseStreams[t.id]) {
                const n = new e.MediaStream(t.getTracks());
                this._streams[t.id] = n, this._reverseStreams[n.id] = t, t = n
            }
            r.apply(this, [t])
        };
        const i = e.RTCPeerConnection.prototype.removeStream;

        function o(e, t) {
            let n = t.sdp;
            return Object.keys(e._reverseStreams || []).forEach(t => {
                const r = e._reverseStreams[t],
                    i = e._streams[r.id];
                n = n.replace(new RegExp(i.id, "g"), r.id)
            }), new RTCSessionDescription({
                type: t.type,
                sdp: n
            })
        }
        e.RTCPeerConnection.prototype.removeStream = function(e) {
            this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {}, i.apply(this, [this._streams[e.id] || e]), delete this._reverseStreams[this._streams[e.id] ? this._streams[e.id].id : e.id], delete this._streams[e.id]
        }, e.RTCPeerConnection.prototype.addTrack = function(t, n) {
            if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
            const r = [].slice.call(arguments, 1);
            if (1 !== r.length || !r[0].getTracks().find(e => e === t)) throw new DOMException("The adapter.js addTrack polyfill only supports a single  stream which is associated with the specified track.", "NotSupportedError");
            if (this.getSenders().find(e => e.track === t)) throw new DOMException("Track already exists.", "InvalidAccessError");
            this._streams = this._streams || {}, this._reverseStreams = this._reverseStreams || {};
            const i = this._streams[n.id];
            if (i) i.addTrack(t), Promise.resolve().then(() => {
                this.dispatchEvent(new Event("negotiationneeded"))
            });
            else {
                const r = new e.MediaStream([t]);
                this._streams[n.id] = r, this._reverseStreams[r.id] = n, this.addStream(r)
            }
            return this.getSenders().find(e => e.track === t)
        }, ["createOffer", "createAnswer"].forEach(function(t) {
            const n = e.RTCPeerConnection.prototype[t];
            e.RTCPeerConnection.prototype[t] = function() {
                const e = arguments;
                return arguments.length && "function" == typeof arguments[0] ? n.apply(this, [t => {
                    const n = o(this, t);
                    e[0].apply(null, [n])
                }, t => {
                    e[1] && e[1].apply(null, t)
                }, arguments[2]]) : n.apply(this, arguments).then(e => o(this, e))
            }
        });
        const a = e.RTCPeerConnection.prototype.setLocalDescription;
        e.RTCPeerConnection.prototype.setLocalDescription = function() {
            return arguments.length && arguments[0].type ? (arguments[0] = function(e, t) {
                let n = t.sdp;
                return Object.keys(e._reverseStreams || []).forEach(t => {
                    const r = e._reverseStreams[t],
                        i = e._streams[r.id];
                    n = n.replace(new RegExp(r.id, "g"), i.id)
                }), new RTCSessionDescription({
                    type: t.type,
                    sdp: n
                })
            }(this, arguments[0]), a.apply(this, arguments)) : a.apply(this, arguments)
        };
        const s = Object.getOwnPropertyDescriptor(e.RTCPeerConnection.prototype, "localDescription");
        Object.defineProperty(e.RTCPeerConnection.prototype, "localDescription", {
            get() {
                const e = s.get.apply(this);
                return "" === e.type ? e : o(this, e)
            }
        }), e.RTCPeerConnection.prototype.removeTrack = function(e) {
            if ("closed" === this.signalingState) throw new DOMException("The RTCPeerConnection's signalingState is 'closed'.", "InvalidStateError");
            if (!e._pc) throw new DOMException("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.", "TypeError");
            if (!(e._pc === this)) throw new DOMException("Sender was not created by this connection.", "InvalidAccessError");
            let t;
            this._streams = this._streams || {}, Object.keys(this._streams).forEach(n => {
                this._streams[n].getTracks().find(t => e.track === t) && (t = this._streams[n])
            }), t && (1 === t.getTracks().length ? this.removeStream(this._reverseStreams[t.id]) : t.removeTrack(e.track), this.dispatchEvent(new Event("negotiationneeded")))
        }
    }

    function re(e) {
        if (!e.RTCPeerConnection && e.webkitRTCPeerConnection && (e.RTCPeerConnection = e.webkitRTCPeerConnection), !e.RTCPeerConnection) return;
        const t = e.RTCPeerConnection.prototype.getStats;
        e.RTCPeerConnection.prototype.getStats = function(e, n, r) {
            const i = arguments;
            if (arguments.length > 0 && "function" == typeof e) return t.apply(this, arguments);
            if (0 === t.length && (0 === arguments.length || "function" != typeof arguments[0])) return t.apply(this, []);
            const o = function(e) {
                    const t = {};
                    return e.result().forEach(e => {
                        const n = {
                            id: e.id,
                            timestamp: e.timestamp,
                            type: {
                                localcandidate: "local-candidate",
                                remotecandidate: "remote-candidate"
                            } [e.type] || e.type
                        };
                        e.names().forEach(t => {
                            n[t] = e.stat(t)
                        }), t[n.id] = n
                    }), t
                },
                a = function(e) {
                    return new Map(Object.keys(e).map(t => [t, e[t]]))
                };
            if (arguments.length >= 2) {
                const e = function(e) {
                    i[1](a(o(e)))
                };
                return t.apply(this, [e, arguments[0]])
            }
            return new Promise((e, n) => {
                t.apply(this, [function(t) {
                    e(a(o(t)))
                }, n])
            }).then(n, r)
        }, ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
            const n = e.RTCPeerConnection.prototype[t];
            e.RTCPeerConnection.prototype[t] = function() {
                return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), n.apply(this, arguments)
            }
        });
        const n = e.RTCPeerConnection.prototype.addIceCandidate;
        e.RTCPeerConnection.prototype.addIceCandidate = function() {
            return arguments[0] ? n.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
        }
    }

    function ie(e) {
        B(e, "negotiationneeded", e => {
            if ("stable" === e.target.signalingState) return e
        })
    }
    var oe = Object.freeze({
        shimMediaStream: Y,
        shimOnTrack: Q,
        shimGetSendersWithDtmf: Z,
        shimSenderReceiverGetStats: ee,
        shimAddTrackRemoveTrackWithNative: te,
        shimAddTrackRemoveTrack: ne,
        shimPeerConnection: re,
        fixNegotiationNeeded: ie,
        shimGetUserMedia: X,
        shimGetDisplayMedia: function(e, t) {
            e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || e.navigator.mediaDevices && ("function" == typeof t ? e.navigator.mediaDevices.getDisplayMedia = function(n) {
                return t(n).then(t => {
                    const r = n.video && n.video.width,
                        i = n.video && n.video.height,
                        o = n.video && n.video.frameRate;
                    return n.video = {
                        mandatory: {
                            chromeMediaSource: "desktop",
                            chromeMediaSourceId: t,
                            maxFrameRate: o || 3
                        }
                    }, r && (n.video.mandatory.maxWidth = r), i && (n.video.mandatory.maxHeight = i), e.navigator.mediaDevices.getUserMedia(n)
                })
            } : console.error("shimGetDisplayMedia: getSourceId argument is not a function"))
        }
    });
    var ae = l(function(e) {
        var t = {
            generateIdentifier: function() {
                return Math.random().toString(36).substr(2, 10)
            }
        };
        t.localCName = t.generateIdentifier(), t.splitLines = function(e) {
            return e.trim().split("\n").map(function(e) {
                return e.trim()
            })
        }, t.splitSections = function(e) {
            return e.split("\nm=").map(function(e, t) {
                return (t > 0 ? "m=" + e : e).trim() + "\r\n"
            })
        }, t.getDescription = function(e) {
            var n = t.splitSections(e);
            return n && n[0]
        }, t.getMediaSections = function(e) {
            var n = t.splitSections(e);
            return n.shift(), n
        }, t.matchPrefix = function(e, n) {
            return t.splitLines(e).filter(function(e) {
                return 0 === e.indexOf(n)
            })
        }, t.parseCandidate = function(e) {
            for (var t, n = {
                    foundation: (t = 0 === e.indexOf("a=candidate:") ? e.substring(12).split(" ") : e.substring(10).split(" "))[0],
                    component: parseInt(t[1], 10),
                    protocol: t[2].toLowerCase(),
                    priority: parseInt(t[3], 10),
                    ip: t[4],
                    address: t[4],
                    port: parseInt(t[5], 10),
                    type: t[7]
                }, r = 8; r < t.length; r += 2) switch (t[r]) {
                case "raddr":
                    n.relatedAddress = t[r + 1];
                    break;
                case "rport":
                    n.relatedPort = parseInt(t[r + 1], 10);
                    break;
                case "tcptype":
                    n.tcpType = t[r + 1];
                    break;
                case "ufrag":
                    n.ufrag = t[r + 1], n.usernameFragment = t[r + 1];
                    break;
                default:
                    n[t[r]] = t[r + 1]
            }
            return n
        }, t.writeCandidate = function(e) {
            var t = [];
            t.push(e.foundation), t.push(e.component), t.push(e.protocol.toUpperCase()), t.push(e.priority), t.push(e.address || e.ip), t.push(e.port);
            var n = e.type;
            return t.push("typ"), t.push(n), "host" !== n && e.relatedAddress && e.relatedPort && (t.push("raddr"), t.push(e.relatedAddress), t.push("rport"), t.push(e.relatedPort)), e.tcpType && "tcp" === e.protocol.toLowerCase() && (t.push("tcptype"), t.push(e.tcpType)), (e.usernameFragment || e.ufrag) && (t.push("ufrag"), t.push(e.usernameFragment || e.ufrag)), "candidate:" + t.join(" ")
        }, t.parseIceOptions = function(e) {
            return e.substr(14).split(" ")
        }, t.parseRtpMap = function(e) {
            var t = e.substr(9).split(" "),
                n = {
                    payloadType: parseInt(t.shift(), 10)
                };
            return t = t[0].split("/"), n.name = t[0], n.clockRate = parseInt(t[1], 10), n.channels = 3 === t.length ? parseInt(t[2], 10) : 1, n.numChannels = n.channels, n
        }, t.writeRtpMap = function(e) {
            var t = e.payloadType;
            void 0 !== e.preferredPayloadType && (t = e.preferredPayloadType);
            var n = e.channels || e.numChannels || 1;
            return "a=rtpmap:" + t + " " + e.name + "/" + e.clockRate + (1 !== n ? "/" + n : "") + "\r\n"
        }, t.parseExtmap = function(e) {
            var t = e.substr(9).split(" ");
            return {
                id: parseInt(t[0], 10),
                direction: t[0].indexOf("/") > 0 ? t[0].split("/")[1] : "sendrecv",
                uri: t[1]
            }
        }, t.writeExtmap = function(e) {
            return "a=extmap:" + (e.id || e.preferredId) + (e.direction && "sendrecv" !== e.direction ? "/" + e.direction : "") + " " + e.uri + "\r\n"
        }, t.parseFmtp = function(e) {
            for (var t, n = {}, r = e.substr(e.indexOf(" ") + 1).split(";"), i = 0; i < r.length; i++) n[(t = r[i].trim().split("="))[0].trim()] = t[1];
            return n
        }, t.writeFmtp = function(e) {
            var t = "",
                n = e.payloadType;
            if (void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.parameters && Object.keys(e.parameters).length) {
                var r = [];
                Object.keys(e.parameters).forEach(function(t) {
                    e.parameters[t] ? r.push(t + "=" + e.parameters[t]) : r.push(t)
                }), t += "a=fmtp:" + n + " " + r.join(";") + "\r\n"
            }
            return t
        }, t.parseRtcpFb = function(e) {
            var t = e.substr(e.indexOf(" ") + 1).split(" ");
            return {
                type: t.shift(),
                parameter: t.join(" ")
            }
        }, t.writeRtcpFb = function(e) {
            var t = "",
                n = e.payloadType;
            return void 0 !== e.preferredPayloadType && (n = e.preferredPayloadType), e.rtcpFeedback && e.rtcpFeedback.length && e.rtcpFeedback.forEach(function(e) {
                t += "a=rtcp-fb:" + n + " " + e.type + (e.parameter && e.parameter.length ? " " + e.parameter : "") + "\r\n"
            }), t
        }, t.parseSsrcMedia = function(e) {
            var t = e.indexOf(" "),
                n = {
                    ssrc: parseInt(e.substr(7, t - 7), 10)
                },
                r = e.indexOf(":", t);
            return r > -1 ? (n.attribute = e.substr(t + 1, r - t - 1), n.value = e.substr(r + 1)) : n.attribute = e.substr(t + 1), n
        }, t.parseSsrcGroup = function(e) {
            var t = e.substr(13).split(" ");
            return {
                semantics: t.shift(),
                ssrcs: t.map(function(e) {
                    return parseInt(e, 10)
                })
            }
        }, t.getMid = function(e) {
            var n = t.matchPrefix(e, "a=mid:")[0];
            if (n) return n.substr(6)
        }, t.parseFingerprint = function(e) {
            var t = e.substr(14).split(" ");
            return {
                algorithm: t[0].toLowerCase(),
                value: t[1]
            }
        }, t.getDtlsParameters = function(e, n) {
            return {
                role: "auto",
                fingerprints: t.matchPrefix(e + n, "a=fingerprint:").map(t.parseFingerprint)
            }
        }, t.writeDtlsParameters = function(e, t) {
            var n = "a=setup:" + t + "\r\n";
            return e.fingerprints.forEach(function(e) {
                n += "a=fingerprint:" + e.algorithm + " " + e.value + "\r\n"
            }), n
        }, t.getIceParameters = function(e, n) {
            var r = t.splitLines(e);
            return {
                usernameFragment: (r = r.concat(t.splitLines(n))).filter(function(e) {
                    return 0 === e.indexOf("a=ice-ufrag:")
                })[0].substr(12),
                password: r.filter(function(e) {
                    return 0 === e.indexOf("a=ice-pwd:")
                })[0].substr(10)
            }
        }, t.writeIceParameters = function(e) {
            return "a=ice-ufrag:" + e.usernameFragment + "\r\na=ice-pwd:" + e.password + "\r\n"
        }, t.parseRtpParameters = function(e) {
            for (var n = {
                    codecs: [],
                    headerExtensions: [],
                    fecMechanisms: [],
                    rtcp: []
                }, r = t.splitLines(e)[0].split(" "), i = 3; i < r.length; i++) {
                var o = r[i],
                    a = t.matchPrefix(e, "a=rtpmap:" + o + " ")[0];
                if (a) {
                    var s = t.parseRtpMap(a),
                        c = t.matchPrefix(e, "a=fmtp:" + o + " ");
                    switch (s.parameters = c.length ? t.parseFmtp(c[0]) : {}, s.rtcpFeedback = t.matchPrefix(e, "a=rtcp-fb:" + o + " ").map(t.parseRtcpFb), n.codecs.push(s), s.name.toUpperCase()) {
                        case "RED":
                        case "ULPFEC":
                            n.fecMechanisms.push(s.name.toUpperCase())
                    }
                }
            }
            return t.matchPrefix(e, "a=extmap:").forEach(function(e) {
                n.headerExtensions.push(t.parseExtmap(e))
            }), n
        }, t.writeRtpDescription = function(e, n) {
            var r = "";
            r += "m=" + e + " ", r += n.codecs.length > 0 ? "9" : "0", r += " UDP/TLS/RTP/SAVPF ", r += n.codecs.map(function(e) {
                return void 0 !== e.preferredPayloadType ? e.preferredPayloadType : e.payloadType
            }).join(" ") + "\r\n", r += "c=IN IP4 0.0.0.0\r\n", r += "a=rtcp:9 IN IP4 0.0.0.0\r\n", n.codecs.forEach(function(e) {
                r += t.writeRtpMap(e), r += t.writeFmtp(e), r += t.writeRtcpFb(e)
            });
            var i = 0;
            return n.codecs.forEach(function(e) {
                e.maxptime > i && (i = e.maxptime)
            }), i > 0 && (r += "a=maxptime:" + i + "\r\n"), r += "a=rtcp-mux\r\n", n.headerExtensions && n.headerExtensions.forEach(function(e) {
                r += t.writeExtmap(e)
            }), r
        }, t.parseRtpEncodingParameters = function(e) {
            var n, r = [],
                i = t.parseRtpParameters(e),
                o = -1 !== i.fecMechanisms.indexOf("RED"),
                a = -1 !== i.fecMechanisms.indexOf("ULPFEC"),
                s = t.matchPrefix(e, "a=ssrc:").map(function(e) {
                    return t.parseSsrcMedia(e)
                }).filter(function(e) {
                    return "cname" === e.attribute
                }),
                c = s.length > 0 && s[0].ssrc,
                d = t.matchPrefix(e, "a=ssrc-group:FID").map(function(e) {
                    return e.substr(17).split(" ").map(function(e) {
                        return parseInt(e, 10)
                    })
                });
            d.length > 0 && d[0].length > 1 && d[0][0] === c && (n = d[0][1]), i.codecs.forEach(function(e) {
                if ("RTX" === e.name.toUpperCase() && e.parameters.apt) {
                    var t = {
                        ssrc: c,
                        codecPayloadType: parseInt(e.parameters.apt, 10)
                    };
                    c && n && (t.rtx = {
                        ssrc: n
                    }), r.push(t), o && ((t = JSON.parse(JSON.stringify(t))).fec = {
                        ssrc: c,
                        mechanism: a ? "red+ulpfec" : "red"
                    }, r.push(t))
                }
            }), 0 === r.length && c && r.push({
                ssrc: c
            });
            var l = t.matchPrefix(e, "b=");
            return l.length && (l = 0 === l[0].indexOf("b=TIAS:") ? parseInt(l[0].substr(7), 10) : 0 === l[0].indexOf("b=AS:") ? 1e3 * parseInt(l[0].substr(5), 10) * .95 - 16e3 : void 0, r.forEach(function(e) {
                e.maxBitrate = l
            })), r
        }, t.parseRtcpParameters = function(e) {
            var n = {},
                r = t.matchPrefix(e, "a=ssrc:").map(function(e) {
                    return t.parseSsrcMedia(e)
                }).filter(function(e) {
                    return "cname" === e.attribute
                })[0];
            r && (n.cname = r.value, n.ssrc = r.ssrc);
            var i = t.matchPrefix(e, "a=rtcp-rsize");
            n.reducedSize = i.length > 0, n.compound = 0 === i.length;
            var o = t.matchPrefix(e, "a=rtcp-mux");
            return n.mux = o.length > 0, n
        }, t.parseMsid = function(e) {
            var n, r = t.matchPrefix(e, "a=msid:");
            if (1 === r.length) return {
                stream: (n = r[0].substr(7).split(" "))[0],
                track: n[1]
            };
            var i = t.matchPrefix(e, "a=ssrc:").map(function(e) {
                return t.parseSsrcMedia(e)
            }).filter(function(e) {
                return "msid" === e.attribute
            });
            return i.length > 0 ? {
                stream: (n = i[0].value.split(" "))[0],
                track: n[1]
            } : void 0
        }, t.generateSessionId = function() {
            return Math.random().toString().substr(2, 21)
        }, t.writeSessionBoilerplate = function(e, n, r) {
            var i = void 0 !== n ? n : 2;
            return "v=0\r\no=" + (r || "thisisadapterortc") + " " + (e || t.generateSessionId()) + " " + i + " IN IP4 127.0.0.1\r\ns=-\r\nt=0 0\r\n"
        }, t.writeMediaSection = function(e, n, r, i) {
            var o = t.writeRtpDescription(e.kind, n);
            if (o += t.writeIceParameters(e.iceGatherer.getLocalParameters()), o += t.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === r ? "actpass" : "active"), o += "a=mid:" + e.mid + "\r\n", e.direction ? o += "a=" + e.direction + "\r\n" : e.rtpSender && e.rtpReceiver ? o += "a=sendrecv\r\n" : e.rtpSender ? o += "a=sendonly\r\n" : e.rtpReceiver ? o += "a=recvonly\r\n" : o += "a=inactive\r\n", e.rtpSender) {
                var a = "msid:" + i.id + " " + e.rtpSender.track.id + "\r\n";
                o += "a=" + a, o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + a, e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + a, o += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
            }
            return o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + t.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + t.localCName + "\r\n"), o
        }, t.getDirection = function(e, n) {
            for (var r = t.splitLines(e), i = 0; i < r.length; i++) switch (r[i]) {
                case "a=sendrecv":
                case "a=sendonly":
                case "a=recvonly":
                case "a=inactive":
                    return r[i].substr(2)
            }
            return n ? t.getDirection(n) : "sendrecv"
        }, t.getKind = function(e) {
            return t.splitLines(e)[0].split(" ")[0].substr(2)
        }, t.isRejected = function(e) {
            return "0" === e.split(" ", 2)[1]
        }, t.parseMLine = function(e) {
            var n = t.splitLines(e)[0].substr(2).split(" ");
            return {
                kind: n[0],
                port: parseInt(n[1], 10),
                protocol: n[2],
                fmt: n.slice(3).join(" ")
            }
        }, t.parseOLine = function(e) {
            var n = t.matchPrefix(e, "o=")[0].substr(2).split(" ");
            return {
                username: n[0],
                sessionId: n[1],
                sessionVersion: parseInt(n[2], 10),
                netType: n[3],
                addressType: n[4],
                address: n[5]
            }
        }, t.isValidSDP = function(e) {
            if ("string" != typeof e || 0 === e.length) return !1;
            for (var n = t.splitLines(e), r = 0; r < n.length; r++)
                if (n[r].length < 2 || "=" !== n[r].charAt(1)) return !1;
            return !0
        }, e.exports = t
    });

    function se(e, t, n, r, i) {
        var o = ae.writeRtpDescription(e.kind, t);
        if (o += ae.writeIceParameters(e.iceGatherer.getLocalParameters()), o += ae.writeDtlsParameters(e.dtlsTransport.getLocalParameters(), "offer" === n ? "actpass" : i || "active"), o += "a=mid:" + e.mid + "\r\n", e.rtpSender && e.rtpReceiver ? o += "a=sendrecv\r\n" : e.rtpSender ? o += "a=sendonly\r\n" : e.rtpReceiver ? o += "a=recvonly\r\n" : o += "a=inactive\r\n", e.rtpSender) {
            var a = e.rtpSender._initialTrackId || e.rtpSender.track.id;
            e.rtpSender._initialTrackId = a;
            var s = "msid:" + (r ? r.id : "-") + " " + a + "\r\n";
            o += "a=" + s, o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " " + s, e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " " + s, o += "a=ssrc-group:FID " + e.sendEncodingParameters[0].ssrc + " " + e.sendEncodingParameters[0].rtx.ssrc + "\r\n")
        }
        return o += "a=ssrc:" + e.sendEncodingParameters[0].ssrc + " cname:" + ae.localCName + "\r\n", e.rtpSender && e.sendEncodingParameters[0].rtx && (o += "a=ssrc:" + e.sendEncodingParameters[0].rtx.ssrc + " cname:" + ae.localCName + "\r\n"), o
    }

    function ce(e, t) {
        var n = {
                codecs: [],
                headerExtensions: [],
                fecMechanisms: []
            },
            r = function(e, t) {
                e = parseInt(e, 10);
                for (var n = 0; n < t.length; n++)
                    if (t[n].payloadType === e || t[n].preferredPayloadType === e) return t[n]
            },
            i = function(e, t, n, i) {
                var o = r(e.parameters.apt, n),
                    a = r(t.parameters.apt, i);
                return o && a && o.name.toLowerCase() === a.name.toLowerCase()
            };
        return e.codecs.forEach(function(r) {
            for (var o = 0; o < t.codecs.length; o++) {
                var a = t.codecs[o];
                if (r.name.toLowerCase() === a.name.toLowerCase() && r.clockRate === a.clockRate) {
                    if ("rtx" === r.name.toLowerCase() && r.parameters && a.parameters.apt && !i(r, a, e.codecs, t.codecs)) continue;
                    (a = JSON.parse(JSON.stringify(a))).numChannels = Math.min(r.numChannels, a.numChannels), n.codecs.push(a), a.rtcpFeedback = a.rtcpFeedback.filter(function(e) {
                        for (var t = 0; t < r.rtcpFeedback.length; t++)
                            if (r.rtcpFeedback[t].type === e.type && r.rtcpFeedback[t].parameter === e.parameter) return !0;
                        return !1
                    });
                    break
                }
            }
        }), e.headerExtensions.forEach(function(e) {
            for (var r = 0; r < t.headerExtensions.length; r++) {
                var i = t.headerExtensions[r];
                if (e.uri === i.uri) {
                    n.headerExtensions.push(i);
                    break
                }
            }
        }), n
    }

    function de(e, t, n) {
        return -1 !== {
            offer: {
                setLocalDescription: ["stable", "have-local-offer"],
                setRemoteDescription: ["stable", "have-remote-offer"]
            },
            answer: {
                setLocalDescription: ["have-remote-offer", "have-local-pranswer"],
                setRemoteDescription: ["have-local-offer", "have-remote-pranswer"]
            }
        } [t][e].indexOf(n)
    }

    function le(e, t) {
        var n = e.getRemoteCandidates().find(function(e) {
            return t.foundation === e.foundation && t.ip === e.ip && t.port === e.port && t.priority === e.priority && t.protocol === e.protocol && t.type === e.type
        });
        return n || e.addRemoteCandidate(t), !n
    }

    function pe(e, t) {
        var n = new Error(t);
        return n.name = e, n.code = {
            NotSupportedError: 9,
            InvalidStateError: 11,
            InvalidAccessError: 15,
            TypeError: void 0,
            OperationError: void 0
        } [e], n
    }
    var ue = function(e, t) {
        function n(t, n) {
            n.addTrack(t), n.dispatchEvent(new e.MediaStreamTrackEvent("addtrack", {
                track: t
            }))
        }

        function r(t, n, r, i) {
            var o = new Event("track");
            o.track = n, o.receiver = r, o.transceiver = {
                receiver: r
            }, o.streams = i, e.setTimeout(function() {
                t._dispatchEvent("track", o)
            })
        }
        var i = function(n) {
            var r = this,
                i = document.createDocumentFragment();
            if (["addEventListener", "removeEventListener", "dispatchEvent"].forEach(function(e) {
                    r[e] = i[e].bind(i)
                }), this.canTrickleIceCandidates = null, this.needNegotiation = !1, this.localStreams = [], this.remoteStreams = [], this._localDescription = null, this._remoteDescription = null, this.signalingState = "stable", this.iceConnectionState = "new", this.connectionState = "new", this.iceGatheringState = "new", n = JSON.parse(JSON.stringify(n || {})), this.usingBundle = "max-bundle" === n.bundlePolicy, "negotiate" === n.rtcpMuxPolicy) throw pe("NotSupportedError", "rtcpMuxPolicy 'negotiate' is not supported");
            switch (n.rtcpMuxPolicy || (n.rtcpMuxPolicy = "require"), n.iceTransportPolicy) {
                case "all":
                case "relay":
                    break;
                default:
                    n.iceTransportPolicy = "all"
            }
            switch (n.bundlePolicy) {
                case "balanced":
                case "max-compat":
                case "max-bundle":
                    break;
                default:
                    n.bundlePolicy = "balanced"
            }
            if (n.iceServers = function(e, t) {
                    var n = !1;
                    return (e = JSON.parse(JSON.stringify(e))).filter(function(e) {
                        if (e && (e.urls || e.url)) {
                            var r = e.urls || e.url;
                            e.url && !e.urls && console.warn("RTCIceServer.url is deprecated! Use urls instead.");
                            var i = "string" == typeof r;
                            return i && (r = [r]), r = r.filter(function(e) {
                                return 0 !== e.indexOf("turn:") || -1 === e.indexOf("transport=udp") || -1 !== e.indexOf("turn:[") || n ? 0 === e.indexOf("stun:") && t >= 14393 && -1 === e.indexOf("?transport=udp") : (n = !0, !0)
                            }), delete e.url, e.urls = i ? r[0] : r, !!r.length
                        }
                    })
                }(n.iceServers || [], t), this._iceGatherers = [], n.iceCandidatePoolSize)
                for (var o = n.iceCandidatePoolSize; o > 0; o--) this._iceGatherers.push(new e.RTCIceGatherer({
                    iceServers: n.iceServers,
                    gatherPolicy: n.iceTransportPolicy
                }));
            else n.iceCandidatePoolSize = 0;
            this._config = n, this.transceivers = [], this._sdpSessionId = ae.generateSessionId(), this._sdpSessionVersion = 0, this._dtlsRole = void 0, this._isClosed = !1
        };
        Object.defineProperty(i.prototype, "localDescription", {
            configurable: !0,
            get: function() {
                return this._localDescription
            }
        }), Object.defineProperty(i.prototype, "remoteDescription", {
            configurable: !0,
            get: function() {
                return this._remoteDescription
            }
        }), i.prototype.onicecandidate = null, i.prototype.onaddstream = null, i.prototype.ontrack = null, i.prototype.onremovestream = null, i.prototype.onsignalingstatechange = null, i.prototype.oniceconnectionstatechange = null, i.prototype.onconnectionstatechange = null, i.prototype.onicegatheringstatechange = null, i.prototype.onnegotiationneeded = null, i.prototype.ondatachannel = null, i.prototype._dispatchEvent = function(e, t) {
            this._isClosed || (this.dispatchEvent(t), "function" == typeof this["on" + e] && this["on" + e](t))
        }, i.prototype._emitGatheringStateChange = function() {
            var e = new Event("icegatheringstatechange");
            this._dispatchEvent("icegatheringstatechange", e)
        }, i.prototype.getConfiguration = function() {
            return this._config
        }, i.prototype.getLocalStreams = function() {
            return this.localStreams
        }, i.prototype.getRemoteStreams = function() {
            return this.remoteStreams
        }, i.prototype._createTransceiver = function(e, t) {
            var n = this.transceivers.length > 0,
                r = {
                    track: null,
                    iceGatherer: null,
                    iceTransport: null,
                    dtlsTransport: null,
                    localCapabilities: null,
                    remoteCapabilities: null,
                    rtpSender: null,
                    rtpReceiver: null,
                    kind: e,
                    mid: null,
                    sendEncodingParameters: null,
                    recvEncodingParameters: null,
                    stream: null,
                    associatedRemoteMediaStreams: [],
                    wantReceive: !0
                };
            if (this.usingBundle && n) r.iceTransport = this.transceivers[0].iceTransport, r.dtlsTransport = this.transceivers[0].dtlsTransport;
            else {
                var i = this._createIceAndDtlsTransports();
                r.iceTransport = i.iceTransport, r.dtlsTransport = i.dtlsTransport
            }
            return t || this.transceivers.push(r), r
        }, i.prototype.addTrack = function(t, n) {
            if (this._isClosed) throw pe("InvalidStateError", "Attempted to call addTrack on a closed peerconnection.");
            var r;
            if (this.transceivers.find(function(e) {
                    return e.track === t
                })) throw pe("InvalidAccessError", "Track already exists.");
            for (var i = 0; i < this.transceivers.length; i++) this.transceivers[i].track || this.transceivers[i].kind !== t.kind || (r = this.transceivers[i]);
            return r || (r = this._createTransceiver(t.kind)), this._maybeFireNegotiationNeeded(), -1 === this.localStreams.indexOf(n) && this.localStreams.push(n), r.track = t, r.stream = n, r.rtpSender = new e.RTCRtpSender(t, r.dtlsTransport), r.rtpSender
        }, i.prototype.addStream = function(e) {
            var n = this;
            if (t >= 15025) e.getTracks().forEach(function(t) {
                n.addTrack(t, e)
            });
            else {
                var r = e.clone();
                e.getTracks().forEach(function(e, t) {
                    var n = r.getTracks()[t];
                    e.addEventListener("enabled", function(e) {
                        n.enabled = e.enabled
                    })
                }), r.getTracks().forEach(function(e) {
                    n.addTrack(e, r)
                })
            }
        }, i.prototype.removeTrack = function(t) {
            if (this._isClosed) throw pe("InvalidStateError", "Attempted to call removeTrack on a closed peerconnection.");
            if (!(t instanceof e.RTCRtpSender)) throw new TypeError("Argument 1 of RTCPeerConnection.removeTrack does not implement interface RTCRtpSender.");
            var n = this.transceivers.find(function(e) {
                return e.rtpSender === t
            });
            if (!n) throw pe("InvalidAccessError", "Sender was not created by this connection.");
            var r = n.stream;
            n.rtpSender.stop(), n.rtpSender = null, n.track = null, n.stream = null, -1 === this.transceivers.map(function(e) {
                return e.stream
            }).indexOf(r) && this.localStreams.indexOf(r) > -1 && this.localStreams.splice(this.localStreams.indexOf(r), 1), this._maybeFireNegotiationNeeded()
        }, i.prototype.removeStream = function(e) {
            var t = this;
            e.getTracks().forEach(function(e) {
                var n = t.getSenders().find(function(t) {
                    return t.track === e
                });
                n && t.removeTrack(n)
            })
        }, i.prototype.getSenders = function() {
            return this.transceivers.filter(function(e) {
                return !!e.rtpSender
            }).map(function(e) {
                return e.rtpSender
            })
        }, i.prototype.getReceivers = function() {
            return this.transceivers.filter(function(e) {
                return !!e.rtpReceiver
            }).map(function(e) {
                return e.rtpReceiver
            })
        }, i.prototype._createIceGatherer = function(t, n) {
            var r = this;
            if (n && t > 0) return this.transceivers[0].iceGatherer;
            if (this._iceGatherers.length) return this._iceGatherers.shift();
            var i = new e.RTCIceGatherer({
                iceServers: this._config.iceServers,
                gatherPolicy: this._config.iceTransportPolicy
            });
            return Object.defineProperty(i, "state", {
                value: "new",
                writable: !0
            }), this.transceivers[t].bufferedCandidateEvents = [], this.transceivers[t].bufferCandidates = function(e) {
                var n = !e.candidate || 0 === Object.keys(e.candidate).length;
                i.state = n ? "completed" : "gathering", null !== r.transceivers[t].bufferedCandidateEvents && r.transceivers[t].bufferedCandidateEvents.push(e)
            }, i.addEventListener("localcandidate", this.transceivers[t].bufferCandidates), i
        }, i.prototype._gather = function(t, n) {
            var r = this,
                i = this.transceivers[n].iceGatherer;
            if (!i.onlocalcandidate) {
                var o = this.transceivers[n].bufferedCandidateEvents;
                this.transceivers[n].bufferedCandidateEvents = null, i.removeEventListener("localcandidate", this.transceivers[n].bufferCandidates), i.onlocalcandidate = function(e) {
                    if (!(r.usingBundle && n > 0)) {
                        var o = new Event("icecandidate");
                        o.candidate = {
                            sdpMid: t,
                            sdpMLineIndex: n
                        };
                        var a = e.candidate,
                            s = !a || 0 === Object.keys(a).length;
                        if (s) "new" !== i.state && "gathering" !== i.state || (i.state = "completed");
                        else {
                            "new" === i.state && (i.state = "gathering"), a.component = 1, a.ufrag = i.getLocalParameters().usernameFragment;
                            var c = ae.writeCandidate(a);
                            o.candidate = Object.assign(o.candidate, ae.parseCandidate(c)), o.candidate.candidate = c, o.candidate.toJSON = function() {
                                return {
                                    candidate: o.candidate.candidate,
                                    sdpMid: o.candidate.sdpMid,
                                    sdpMLineIndex: o.candidate.sdpMLineIndex,
                                    usernameFragment: o.candidate.usernameFragment
                                }
                            }
                        }
                        var d = ae.getMediaSections(r._localDescription.sdp);
                        d[o.candidate.sdpMLineIndex] += s ? "a=end-of-candidates\r\n" : "a=" + o.candidate.candidate + "\r\n", r._localDescription.sdp = ae.getDescription(r._localDescription.sdp) + d.join("");
                        var l = r.transceivers.every(function(e) {
                            return e.iceGatherer && "completed" === e.iceGatherer.state
                        });
                        "gathering" !== r.iceGatheringState && (r.iceGatheringState = "gathering", r._emitGatheringStateChange()), s || r._dispatchEvent("icecandidate", o), l && (r._dispatchEvent("icecandidate", new Event("icecandidate")), r.iceGatheringState = "complete", r._emitGatheringStateChange())
                    }
                }, e.setTimeout(function() {
                    o.forEach(function(e) {
                        i.onlocalcandidate(e)
                    })
                }, 0)
            }
        }, i.prototype._createIceAndDtlsTransports = function() {
            var t = this,
                n = new e.RTCIceTransport(null);
            n.onicestatechange = function() {
                t._updateIceConnectionState(), t._updateConnectionState()
            };
            var r = new e.RTCDtlsTransport(n);
            return r.ondtlsstatechange = function() {
                t._updateConnectionState()
            }, r.onerror = function() {
                Object.defineProperty(r, "state", {
                    value: "failed",
                    writable: !0
                }), t._updateConnectionState()
            }, {
                iceTransport: n,
                dtlsTransport: r
            }
        }, i.prototype._disposeIceAndDtlsTransports = function(e) {
            var t = this.transceivers[e].iceGatherer;
            t && (delete t.onlocalcandidate, delete this.transceivers[e].iceGatherer);
            var n = this.transceivers[e].iceTransport;
            n && (delete n.onicestatechange, delete this.transceivers[e].iceTransport);
            var r = this.transceivers[e].dtlsTransport;
            r && (delete r.ondtlsstatechange, delete r.onerror, delete this.transceivers[e].dtlsTransport)
        }, i.prototype._transceive = function(e, n, r) {
            var i = ce(e.localCapabilities, e.remoteCapabilities);
            n && e.rtpSender && (i.encodings = e.sendEncodingParameters, i.rtcp = {
                cname: ae.localCName,
                compound: e.rtcpParameters.compound
            }, e.recvEncodingParameters.length && (i.rtcp.ssrc = e.recvEncodingParameters[0].ssrc), e.rtpSender.send(i)), r && e.rtpReceiver && i.codecs.length > 0 && ("video" === e.kind && e.recvEncodingParameters && t < 15019 && e.recvEncodingParameters.forEach(function(e) {
                delete e.rtx
            }), e.recvEncodingParameters.length ? i.encodings = e.recvEncodingParameters : i.encodings = [{}], i.rtcp = {
                compound: e.rtcpParameters.compound
            }, e.rtcpParameters.cname && (i.rtcp.cname = e.rtcpParameters.cname), e.sendEncodingParameters.length && (i.rtcp.ssrc = e.sendEncodingParameters[0].ssrc), e.rtpReceiver.receive(i))
        }, i.prototype.setLocalDescription = function(e) {
            var t, n, r = this;
            if (-1 === ["offer", "answer"].indexOf(e.type)) return Promise.reject(pe("TypeError", 'Unsupported type "' + e.type + '"'));
            if (!de("setLocalDescription", e.type, r.signalingState) || r._isClosed) return Promise.reject(pe("InvalidStateError", "Can not set local " + e.type + " in state " + r.signalingState));
            if ("offer" === e.type) t = ae.splitSections(e.sdp), n = t.shift(), t.forEach(function(e, t) {
                var n = ae.parseRtpParameters(e);
                r.transceivers[t].localCapabilities = n
            }), r.transceivers.forEach(function(e, t) {
                r._gather(e.mid, t)
            });
            else if ("answer" === e.type) {
                t = ae.splitSections(r._remoteDescription.sdp), n = t.shift();
                var i = ae.matchPrefix(n, "a=ice-lite").length > 0;
                t.forEach(function(e, t) {
                    var o = r.transceivers[t],
                        a = o.iceGatherer,
                        s = o.iceTransport,
                        c = o.dtlsTransport,
                        d = o.localCapabilities,
                        l = o.remoteCapabilities;
                    if (!(ae.isRejected(e) && 0 === ae.matchPrefix(e, "a=bundle-only").length) && !o.rejected) {
                        var p = ae.getIceParameters(e, n),
                            u = ae.getDtlsParameters(e, n);
                        i && (u.role = "server"), r.usingBundle && 0 !== t || (r._gather(o.mid, t), "new" === s.state && s.start(a, p, i ? "controlling" : "controlled"), "new" === c.state && c.start(u));
                        var h = ce(d, l);
                        r._transceive(o, h.codecs.length > 0, !1)
                    }
                })
            }
            return r._localDescription = {
                type: e.type,
                sdp: e.sdp
            }, "offer" === e.type ? r._updateSignalingState("have-local-offer") : r._updateSignalingState("stable"), Promise.resolve()
        }, i.prototype.setRemoteDescription = function(i) {
            var o = this;
            if (-1 === ["offer", "answer"].indexOf(i.type)) return Promise.reject(pe("TypeError", 'Unsupported type "' + i.type + '"'));
            if (!de("setRemoteDescription", i.type, o.signalingState) || o._isClosed) return Promise.reject(pe("InvalidStateError", "Can not set remote " + i.type + " in state " + o.signalingState));
            var a = {};
            o.remoteStreams.forEach(function(e) {
                a[e.id] = e
            });
            var s = [],
                c = ae.splitSections(i.sdp),
                d = c.shift(),
                l = ae.matchPrefix(d, "a=ice-lite").length > 0,
                p = ae.matchPrefix(d, "a=group:BUNDLE ").length > 0;
            o.usingBundle = p;
            var u = ae.matchPrefix(d, "a=ice-options:")[0];
            return o.canTrickleIceCandidates = !!u && u.substr(14).split(" ").indexOf("trickle") >= 0, c.forEach(function(r, c) {
                var u = ae.splitLines(r),
                    h = ae.getKind(r),
                    f = ae.isRejected(r) && 0 === ae.matchPrefix(r, "a=bundle-only").length,
                    v = u[0].substr(2).split(" ")[2],
                    m = ae.getDirection(r, d),
                    g = ae.parseMsid(r),
                    y = ae.getMid(r) || ae.generateIdentifier();
                if (f || "application" === h && ("DTLS/SCTP" === v || "UDP/DTLS/SCTP" === v)) o.transceivers[c] = {
                    mid: y,
                    kind: h,
                    protocol: v,
                    rejected: !0
                };
                else {
                    var S, C, E, b, _, R, T, x, k;
                    !f && o.transceivers[c] && o.transceivers[c].rejected && (o.transceivers[c] = o._createTransceiver(h, !0));
                    var w, P, O = ae.parseRtpParameters(r);
                    f || (w = ae.getIceParameters(r, d), (P = ae.getDtlsParameters(r, d)).role = "client"), T = ae.parseRtpEncodingParameters(r);
                    var L = ae.parseRtcpParameters(r),
                        M = ae.matchPrefix(r, "a=end-of-candidates", d).length > 0,
                        I = ae.matchPrefix(r, "a=candidate:").map(function(e) {
                            return ae.parseCandidate(e)
                        }).filter(function(e) {
                            return 1 === e.component
                        });
                    if (("offer" === i.type || "answer" === i.type) && !f && p && c > 0 && o.transceivers[c] && (o._disposeIceAndDtlsTransports(c), o.transceivers[c].iceGatherer = o.transceivers[0].iceGatherer, o.transceivers[c].iceTransport = o.transceivers[0].iceTransport, o.transceivers[c].dtlsTransport = o.transceivers[0].dtlsTransport, o.transceivers[c].rtpSender && o.transceivers[c].rtpSender.setTransport(o.transceivers[0].dtlsTransport), o.transceivers[c].rtpReceiver && o.transceivers[c].rtpReceiver.setTransport(o.transceivers[0].dtlsTransport)), "offer" !== i.type || f) {
                        if ("answer" === i.type && !f) {
                            C = (S = o.transceivers[c]).iceGatherer, E = S.iceTransport, b = S.dtlsTransport, _ = S.rtpReceiver, R = S.sendEncodingParameters, x = S.localCapabilities, o.transceivers[c].recvEncodingParameters = T, o.transceivers[c].remoteCapabilities = O, o.transceivers[c].rtcpParameters = L, I.length && "new" === E.state && (!l && !M || p && 0 !== c ? I.forEach(function(e) {
                                le(S.iceTransport, e)
                            }) : E.setRemoteCandidates(I)), p && 0 !== c || ("new" === E.state && E.start(C, w, "controlling"), "new" === b.state && b.start(P)), !ce(S.localCapabilities, S.remoteCapabilities).codecs.filter(function(e) {
                                return "rtx" === e.name.toLowerCase()
                            }).length && S.sendEncodingParameters[0].rtx && delete S.sendEncodingParameters[0].rtx, o._transceive(S, "sendrecv" === m || "recvonly" === m, "sendrecv" === m || "sendonly" === m), !_ || "sendrecv" !== m && "sendonly" !== m ? delete S.rtpReceiver : (k = _.track, g ? (a[g.stream] || (a[g.stream] = new e.MediaStream), n(k, a[g.stream]), s.push([k, _, a[g.stream]])) : (a.default || (a.default = new e.MediaStream), n(k, a.default), s.push([k, _, a.default])))
                        }
                    } else {
                        (S = o.transceivers[c] || o._createTransceiver(h)).mid = y, S.iceGatherer || (S.iceGatherer = o._createIceGatherer(c, p)), I.length && "new" === S.iceTransport.state && (!M || p && 0 !== c ? I.forEach(function(e) {
                            le(S.iceTransport, e)
                        }) : S.iceTransport.setRemoteCandidates(I)), x = e.RTCRtpReceiver.getCapabilities(h), t < 15019 && (x.codecs = x.codecs.filter(function(e) {
                            return "rtx" !== e.name
                        })), R = S.sendEncodingParameters || [{
                            ssrc: 1001 * (2 * c + 2)
                        }];
                        var D, j = !1;
                        if ("sendrecv" === m || "sendonly" === m) {
                            if (j = !S.rtpReceiver, _ = S.rtpReceiver || new e.RTCRtpReceiver(S.dtlsTransport, h), j) k = _.track, g && "-" === g.stream || (g ? (a[g.stream] || (a[g.stream] = new e.MediaStream, Object.defineProperty(a[g.stream], "id", {
                                get: function() {
                                    return g.stream
                                }
                            })), Object.defineProperty(k, "id", {
                                get: function() {
                                    return g.track
                                }
                            }), D = a[g.stream]) : (a.default || (a.default = new e.MediaStream), D = a.default)), D && (n(k, D), S.associatedRemoteMediaStreams.push(D)), s.push([k, _, D])
                        } else S.rtpReceiver && S.rtpReceiver.track && (S.associatedRemoteMediaStreams.forEach(function(t) {
                            var n, r, i = t.getTracks().find(function(e) {
                                return e.id === S.rtpReceiver.track.id
                            });
                            i && (n = i, (r = t).removeTrack(n), r.dispatchEvent(new e.MediaStreamTrackEvent("removetrack", {
                                track: n
                            })))
                        }), S.associatedRemoteMediaStreams = []);
                        S.localCapabilities = x, S.remoteCapabilities = O, S.rtpReceiver = _, S.rtcpParameters = L, S.sendEncodingParameters = R, S.recvEncodingParameters = T, o._transceive(o.transceivers[c], !1, j)
                    }
                }
            }), void 0 === o._dtlsRole && (o._dtlsRole = "offer" === i.type ? "active" : "passive"), o._remoteDescription = {
                type: i.type,
                sdp: i.sdp
            }, "offer" === i.type ? o._updateSignalingState("have-remote-offer") : o._updateSignalingState("stable"), Object.keys(a).forEach(function(t) {
                var n = a[t];
                if (n.getTracks().length) {
                    if (-1 === o.remoteStreams.indexOf(n)) {
                        o.remoteStreams.push(n);
                        var i = new Event("addstream");
                        i.stream = n, e.setTimeout(function() {
                            o._dispatchEvent("addstream", i)
                        })
                    }
                    s.forEach(function(e) {
                        var t = e[0],
                            i = e[1];
                        n.id === e[2].id && r(o, t, i, [n])
                    })
                }
            }), s.forEach(function(e) {
                e[2] || r(o, e[0], e[1], [])
            }), e.setTimeout(function() {
                o && o.transceivers && o.transceivers.forEach(function(e) {
                    e.iceTransport && "new" === e.iceTransport.state && e.iceTransport.getRemoteCandidates().length > 0 && (console.warn("Timeout for addRemoteCandidate. Consider sending an end-of-candidates notification"), e.iceTransport.addRemoteCandidate({}))
                })
            }, 4e3), Promise.resolve()
        }, i.prototype.close = function() {
            this.transceivers.forEach(function(e) {
                e.iceTransport && e.iceTransport.stop(), e.dtlsTransport && e.dtlsTransport.stop(), e.rtpSender && e.rtpSender.stop(), e.rtpReceiver && e.rtpReceiver.stop()
            }), this._isClosed = !0, this._updateSignalingState("closed")
        }, i.prototype._updateSignalingState = function(e) {
            this.signalingState = e;
            var t = new Event("signalingstatechange");
            this._dispatchEvent("signalingstatechange", t)
        }, i.prototype._maybeFireNegotiationNeeded = function() {
            var t = this;
            "stable" === this.signalingState && !0 !== this.needNegotiation && (this.needNegotiation = !0, e.setTimeout(function() {
                if (t.needNegotiation) {
                    t.needNegotiation = !1;
                    var e = new Event("negotiationneeded");
                    t._dispatchEvent("negotiationneeded", e)
                }
            }, 0))
        }, i.prototype._updateIceConnectionState = function() {
            var e, t = {
                new: 0,
                closed: 0,
                checking: 0,
                connected: 0,
                completed: 0,
                disconnected: 0,
                failed: 0
            };
            if (this.transceivers.forEach(function(e) {
                    e.iceTransport && !e.rejected && t[e.iceTransport.state]++
                }), e = "new", t.failed > 0 ? e = "failed" : t.checking > 0 ? e = "checking" : t.disconnected > 0 ? e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 ? e = "connected" : t.completed > 0 && (e = "completed"), e !== this.iceConnectionState) {
                this.iceConnectionState = e;
                var n = new Event("iceconnectionstatechange");
                this._dispatchEvent("iceconnectionstatechange", n)
            }
        }, i.prototype._updateConnectionState = function() {
            var e, t = {
                new: 0,
                closed: 0,
                connecting: 0,
                connected: 0,
                completed: 0,
                disconnected: 0,
                failed: 0
            };
            if (this.transceivers.forEach(function(e) {
                    e.iceTransport && e.dtlsTransport && !e.rejected && (t[e.iceTransport.state]++, t[e.dtlsTransport.state]++)
                }), t.connected += t.completed, e = "new", t.failed > 0 ? e = "failed" : t.connecting > 0 ? e = "connecting" : t.disconnected > 0 ? e = "disconnected" : t.new > 0 ? e = "new" : t.connected > 0 && (e = "connected"), e !== this.connectionState) {
                this.connectionState = e;
                var n = new Event("connectionstatechange");
                this._dispatchEvent("connectionstatechange", n)
            }
        }, i.prototype.createOffer = function() {
            var n = this;
            if (n._isClosed) return Promise.reject(pe("InvalidStateError", "Can not call createOffer after close"));
            var r = n.transceivers.filter(function(e) {
                    return "audio" === e.kind
                }).length,
                i = n.transceivers.filter(function(e) {
                    return "video" === e.kind
                }).length,
                o = arguments[0];
            if (o) {
                if (o.mandatory || o.optional) throw new TypeError("Legacy mandatory/optional constraints not supported.");
                void 0 !== o.offerToReceiveAudio && (r = !0 === o.offerToReceiveAudio ? 1 : !1 === o.offerToReceiveAudio ? 0 : o.offerToReceiveAudio), void 0 !== o.offerToReceiveVideo && (i = !0 === o.offerToReceiveVideo ? 1 : !1 === o.offerToReceiveVideo ? 0 : o.offerToReceiveVideo)
            }
            for (n.transceivers.forEach(function(e) {
                    "audio" === e.kind ? --r < 0 && (e.wantReceive = !1) : "video" === e.kind && --i < 0 && (e.wantReceive = !1)
                }); r > 0 || i > 0;) r > 0 && (n._createTransceiver("audio"), r--), i > 0 && (n._createTransceiver("video"), i--);
            var a = ae.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
            n.transceivers.forEach(function(r, i) {
                var o = r.track,
                    a = r.kind,
                    s = r.mid || ae.generateIdentifier();
                r.mid = s, r.iceGatherer || (r.iceGatherer = n._createIceGatherer(i, n.usingBundle));
                var c = e.RTCRtpSender.getCapabilities(a);
                t < 15019 && (c.codecs = c.codecs.filter(function(e) {
                    return "rtx" !== e.name
                })), c.codecs.forEach(function(e) {
                    "H264" === e.name && void 0 === e.parameters["level-asymmetry-allowed"] && (e.parameters["level-asymmetry-allowed"] = "1"), r.remoteCapabilities && r.remoteCapabilities.codecs && r.remoteCapabilities.codecs.forEach(function(t) {
                        e.name.toLowerCase() === t.name.toLowerCase() && e.clockRate === t.clockRate && (e.preferredPayloadType = t.payloadType)
                    })
                }), c.headerExtensions.forEach(function(e) {
                    (r.remoteCapabilities && r.remoteCapabilities.headerExtensions || []).forEach(function(t) {
                        e.uri === t.uri && (e.id = t.id)
                    })
                });
                var d = r.sendEncodingParameters || [{
                    ssrc: 1001 * (2 * i + 1)
                }];
                o && t >= 15019 && "video" === a && !d[0].rtx && (d[0].rtx = {
                    ssrc: d[0].ssrc + 1
                }), r.wantReceive && (r.rtpReceiver = new e.RTCRtpReceiver(r.dtlsTransport, a)), r.localCapabilities = c, r.sendEncodingParameters = d
            }), "max-compat" !== n._config.bundlePolicy && (a += "a=group:BUNDLE " + n.transceivers.map(function(e) {
                return e.mid
            }).join(" ") + "\r\n"), a += "a=ice-options:trickle\r\n", n.transceivers.forEach(function(e, t) {
                a += se(e, e.localCapabilities, "offer", e.stream, n._dtlsRole), a += "a=rtcp-rsize\r\n", !e.iceGatherer || "new" === n.iceGatheringState || 0 !== t && n.usingBundle || (e.iceGatherer.getLocalCandidates().forEach(function(e) {
                    e.component = 1, a += "a=" + ae.writeCandidate(e) + "\r\n"
                }), "completed" === e.iceGatherer.state && (a += "a=end-of-candidates\r\n"))
            });
            var s = new e.RTCSessionDescription({
                type: "offer",
                sdp: a
            });
            return Promise.resolve(s)
        }, i.prototype.createAnswer = function() {
            var n = this;
            if (n._isClosed) return Promise.reject(pe("InvalidStateError", "Can not call createAnswer after close"));
            if ("have-remote-offer" !== n.signalingState && "have-local-pranswer" !== n.signalingState) return Promise.reject(pe("InvalidStateError", "Can not call createAnswer in signalingState " + n.signalingState));
            var r = ae.writeSessionBoilerplate(n._sdpSessionId, n._sdpSessionVersion++);
            n.usingBundle && (r += "a=group:BUNDLE " + n.transceivers.map(function(e) {
                return e.mid
            }).join(" ") + "\r\n"), r += "a=ice-options:trickle\r\n";
            var i = ae.getMediaSections(n._remoteDescription.sdp).length;
            n.transceivers.forEach(function(e, o) {
                if (!(o + 1 > i)) {
                    if (e.rejected) return "application" === e.kind ? "DTLS/SCTP" === e.protocol ? r += "m=application 0 DTLS/SCTP 5000\r\n" : r += "m=application 0 " + e.protocol + " webrtc-datachannel\r\n" : "audio" === e.kind ? r += "m=audio 0 UDP/TLS/RTP/SAVPF 0\r\na=rtpmap:0 PCMU/8000\r\n" : "video" === e.kind && (r += "m=video 0 UDP/TLS/RTP/SAVPF 120\r\na=rtpmap:120 VP8/90000\r\n"), void(r += "c=IN IP4 0.0.0.0\r\na=inactive\r\na=mid:" + e.mid + "\r\n");
                    var a;
                    if (e.stream) "audio" === e.kind ? a = e.stream.getAudioTracks()[0] : "video" === e.kind && (a = e.stream.getVideoTracks()[0]), a && t >= 15019 && "video" === e.kind && !e.sendEncodingParameters[0].rtx && (e.sendEncodingParameters[0].rtx = {
                        ssrc: e.sendEncodingParameters[0].ssrc + 1
                    });
                    var s = ce(e.localCapabilities, e.remoteCapabilities);
                    !s.codecs.filter(function(e) {
                        return "rtx" === e.name.toLowerCase()
                    }).length && e.sendEncodingParameters[0].rtx && delete e.sendEncodingParameters[0].rtx, r += se(e, s, "answer", e.stream, n._dtlsRole), e.rtcpParameters && e.rtcpParameters.reducedSize && (r += "a=rtcp-rsize\r\n")
                }
            });
            var o = new e.RTCSessionDescription({
                type: "answer",
                sdp: r
            });
            return Promise.resolve(o)
        }, i.prototype.addIceCandidate = function(e) {
            var t, n = this;
            return e && void 0 === e.sdpMLineIndex && !e.sdpMid ? Promise.reject(new TypeError("sdpMLineIndex or sdpMid required")) : new Promise(function(r, i) {
                if (!n._remoteDescription) return i(pe("InvalidStateError", "Can not add ICE candidate without a remote description"));
                if (e && "" !== e.candidate) {
                    var o = e.sdpMLineIndex;
                    if (e.sdpMid)
                        for (var a = 0; a < n.transceivers.length; a++)
                            if (n.transceivers[a].mid === e.sdpMid) {
                                o = a;
                                break
                            } var s = n.transceivers[o];
                    if (!s) return i(pe("OperationError", "Can not add ICE candidate"));
                    if (s.rejected) return r();
                    var c = Object.keys(e.candidate).length > 0 ? ae.parseCandidate(e.candidate) : {};
                    if ("tcp" === c.protocol && (0 === c.port || 9 === c.port)) return r();
                    if (c.component && 1 !== c.component) return r();
                    if ((0 === o || o > 0 && s.iceTransport !== n.transceivers[0].iceTransport) && !le(s.iceTransport, c)) return i(pe("OperationError", "Can not add ICE candidate"));
                    var d = e.candidate.trim();
                    0 === d.indexOf("a=") && (d = d.substr(2)), (t = ae.getMediaSections(n._remoteDescription.sdp))[o] += "a=" + (c.type ? d : "end-of-candidates") + "\r\n", n._remoteDescription.sdp = ae.getDescription(n._remoteDescription.sdp) + t.join("")
                } else
                    for (var l = 0; l < n.transceivers.length && (n.transceivers[l].rejected || (n.transceivers[l].iceTransport.addRemoteCandidate({}), (t = ae.getMediaSections(n._remoteDescription.sdp))[l] += "a=end-of-candidates\r\n", n._remoteDescription.sdp = ae.getDescription(n._remoteDescription.sdp) + t.join(""), !n.usingBundle)); l++);
                r()
            })
        }, i.prototype.getStats = function(t) {
            if (t && t instanceof e.MediaStreamTrack) {
                var n = null;
                if (this.transceivers.forEach(function(e) {
                        e.rtpSender && e.rtpSender.track === t ? n = e.rtpSender : e.rtpReceiver && e.rtpReceiver.track === t && (n = e.rtpReceiver)
                    }), !n) throw pe("InvalidAccessError", "Invalid selector.");
                return n.getStats()
            }
            var r = [];
            return this.transceivers.forEach(function(e) {
                ["rtpSender", "rtpReceiver", "iceGatherer", "iceTransport", "dtlsTransport"].forEach(function(t) {
                    e[t] && r.push(e[t].getStats())
                })
            }), Promise.all(r).then(function(e) {
                var t = new Map;
                return e.forEach(function(e) {
                    e.forEach(function(e) {
                        t.set(e.id, e)
                    })
                }), t
            })
        };
        ["RTCRtpSender", "RTCRtpReceiver", "RTCIceGatherer", "RTCIceTransport", "RTCDtlsTransport"].forEach(function(t) {
            var n = e[t];
            if (n && n.prototype && n.prototype.getStats) {
                var r = n.prototype.getStats;
                n.prototype.getStats = function() {
                    return r.apply(this).then(function(e) {
                        var t = new Map;
                        return Object.keys(e).forEach(function(n) {
                            var r;
                            e[n].type = {
                                inboundrtp: "inbound-rtp",
                                outboundrtp: "outbound-rtp",
                                candidatepair: "candidate-pair",
                                localcandidate: "local-candidate",
                                remotecandidate: "remote-candidate"
                            } [(r = e[n]).type] || r.type, t.set(n, e[n])
                        }), t
                    })
                }
            }
        });
        var o = ["createOffer", "createAnswer"];
        return o.forEach(function(e) {
            var t = i.prototype[e];
            i.prototype[e] = function() {
                var e = arguments;
                return "function" == typeof e[0] || "function" == typeof e[1] ? t.apply(this, [arguments[2]]).then(function(t) {
                    "function" == typeof e[0] && e[0].apply(null, [t])
                }, function(t) {
                    "function" == typeof e[1] && e[1].apply(null, [t])
                }) : t.apply(this, arguments)
            }
        }), (o = ["setLocalDescription", "setRemoteDescription", "addIceCandidate"]).forEach(function(e) {
            var t = i.prototype[e];
            i.prototype[e] = function() {
                var e = arguments;
                return "function" == typeof e[1] || "function" == typeof e[2] ? t.apply(this, arguments).then(function() {
                    "function" == typeof e[1] && e[1].apply(null)
                }, function(t) {
                    "function" == typeof e[2] && e[2].apply(null, [t])
                }) : t.apply(this, arguments)
            }
        }), ["getStats"].forEach(function(e) {
            var t = i.prototype[e];
            i.prototype[e] = function() {
                var e = arguments;
                return "function" == typeof e[1] ? t.apply(this, arguments).then(function() {
                    "function" == typeof e[1] && e[1].apply(null)
                }) : t.apply(this, arguments)
            }
        }), i
    };

    function he(e) {
        const t = e && e.navigator,
            n = t.mediaDevices.getUserMedia.bind(t.mediaDevices);
        t.mediaDevices.getUserMedia = function(e) {
            return n(e).catch(e => Promise.reject(function(e) {
                return {
                    name: {
                        PermissionDeniedError: "NotAllowedError"
                    } [e.name] || e.name,
                    message: e.message,
                    constraint: e.constraint,
                    toString() {
                        return this.name
                    }
                }
            }(e)))
        }
    }

    function fe(e) {
        "getDisplayMedia" in e.navigator && e.navigator.mediaDevices && (e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || (e.navigator.mediaDevices.getDisplayMedia = e.navigator.getDisplayMedia.bind(e.navigator.mediaDevices)))
    }

    function ve(e) {
        const t = H(e);
        if (e.RTCIceGatherer && (e.RTCIceCandidate || (e.RTCIceCandidate = function(e) {
                return e
            }), e.RTCSessionDescription || (e.RTCSessionDescription = function(e) {
                return e
            }), t.version < 15025)) {
            const t = Object.getOwnPropertyDescriptor(e.MediaStreamTrack.prototype, "enabled");
            Object.defineProperty(e.MediaStreamTrack.prototype, "enabled", {
                set(e) {
                    t.set.call(this, e);
                    const n = new Event("enabled");
                    n.enabled = e, this.dispatchEvent(n)
                }
            })
        }!e.RTCRtpSender || "dtmf" in e.RTCRtpSender.prototype || Object.defineProperty(e.RTCRtpSender.prototype, "dtmf", {
            get() {
                return void 0 === this._dtmf && ("audio" === this.track.kind ? this._dtmf = new e.RTCDtmfSender(this) : "video" === this.track.kind && (this._dtmf = null)), this._dtmf
            }
        }), e.RTCDtmfSender && !e.RTCDTMFSender && (e.RTCDTMFSender = e.RTCDtmfSender);
        const n = ue(e, t.version);
        e.RTCPeerConnection = function(e) {
            return e && e.iceServers && (e.iceServers = function(e, t) {
                let n = !1;
                return (e = JSON.parse(JSON.stringify(e))).filter(e => {
                    if (e && (e.urls || e.url)) {
                        var t = e.urls || e.url;
                        e.url && !e.urls && q("RTCIceServer.url", "RTCIceServer.urls");
                        const r = "string" == typeof t;
                        return r && (t = [t]), t = t.filter(e => {
                            if (0 === e.indexOf("stun:")) return !1;
                            const t = e.startsWith("turn") && !e.startsWith("turn:[") && e.includes("transport=udp");
                            return t && !n ? (n = !0, !0) : t && !n
                        }), delete e.url, e.urls = r ? t[0] : t, !!t.length
                    }
                })
            }(e.iceServers, t.version), J("ICE servers after filtering:", e.iceServers)), new n(e)
        }, e.RTCPeerConnection.prototype = n.prototype
    }

    function me(e) {
        !e.RTCRtpSender || "replaceTrack" in e.RTCRtpSender.prototype || (e.RTCRtpSender.prototype.replaceTrack = e.RTCRtpSender.prototype.setTrack)
    }
    var ge = Object.freeze({
        shimPeerConnection: ve,
        shimReplaceTrack: me,
        shimGetUserMedia: he,
        shimGetDisplayMedia: fe
    });

    function ye(e) {
        const t = H(e),
            n = e && e.navigator,
            r = e && e.MediaStreamTrack;
        if (n.getUserMedia = function(e, t, r) {
                q("navigator.getUserMedia", "navigator.mediaDevices.getUserMedia"), n.mediaDevices.getUserMedia(e).then(t, r)
            }, !(t.version > 55 && "autoGainControl" in n.mediaDevices.getSupportedConstraints())) {
            const e = function(e, t, n) {
                    t in e && !(n in e) && (e[n] = e[t], delete e[t])
                },
                t = n.mediaDevices.getUserMedia.bind(n.mediaDevices);
            if (n.mediaDevices.getUserMedia = function(n) {
                    return "object" == typeof n && "object" == typeof n.audio && (n = JSON.parse(JSON.stringify(n)), e(n.audio, "autoGainControl", "mozAutoGainControl"), e(n.audio, "noiseSuppression", "mozNoiseSuppression")), t(n)
                }, r && r.prototype.getSettings) {
                const t = r.prototype.getSettings;
                r.prototype.getSettings = function() {
                    const n = t.apply(this, arguments);
                    return e(n, "mozAutoGainControl", "autoGainControl"), e(n, "mozNoiseSuppression", "noiseSuppression"), n
                }
            }
            if (r && r.prototype.applyConstraints) {
                const t = r.prototype.applyConstraints;
                r.prototype.applyConstraints = function(n) {
                    return "audio" === this.kind && "object" == typeof n && (n = JSON.parse(JSON.stringify(n)), e(n, "autoGainControl", "mozAutoGainControl"), e(n, "noiseSuppression", "mozNoiseSuppression")), t.apply(this, [n])
                }
            }
        }
    }

    function Se(e) {
        "object" == typeof e && e.RTCTrackEvent && "receiver" in e.RTCTrackEvent.prototype && !("transceiver" in e.RTCTrackEvent.prototype) && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
            get() {
                return {
                    receiver: this.receiver
                }
            }
        })
    }

    function Ce(e) {
        const t = H(e);
        if ("object" != typeof e || !e.RTCPeerConnection && !e.mozRTCPeerConnection) return;
        !e.RTCPeerConnection && e.mozRTCPeerConnection && (e.RTCPeerConnection = e.mozRTCPeerConnection), ["setLocalDescription", "setRemoteDescription", "addIceCandidate"].forEach(function(t) {
            const n = e.RTCPeerConnection.prototype[t];
            e.RTCPeerConnection.prototype[t] = function() {
                return arguments[0] = new("addIceCandidate" === t ? e.RTCIceCandidate : e.RTCSessionDescription)(arguments[0]), n.apply(this, arguments)
            }
        });
        const n = e.RTCPeerConnection.prototype.addIceCandidate;
        e.RTCPeerConnection.prototype.addIceCandidate = function() {
            return arguments[0] ? n.apply(this, arguments) : (arguments[1] && arguments[1].apply(null), Promise.resolve())
        };
        const r = {
                inboundrtp: "inbound-rtp",
                outboundrtp: "outbound-rtp",
                candidatepair: "candidate-pair",
                localcandidate: "local-candidate",
                remotecandidate: "remote-candidate"
            },
            i = e.RTCPeerConnection.prototype.getStats;
        e.RTCPeerConnection.prototype.getStats = function(e, n, o) {
            return i.apply(this, [e || null]).then(e => {
                if (t.version < 53 && !n) try {
                    e.forEach(e => {
                        e.type = r[e.type] || e.type
                    })
                } catch (t) {
                    if ("TypeError" !== t.name) throw t;
                    e.forEach((t, n) => {
                        e.set(n, Object.assign({}, t, {
                            type: r[t.type] || t.type
                        }))
                    })
                }
                return e
            }).then(n, o)
        }
    }

    function Ee(e) {
        if ("object" != typeof e || !e.RTCPeerConnection || !e.RTCRtpSender) return;
        if (e.RTCRtpSender && "getStats" in e.RTCRtpSender.prototype) return;
        const t = e.RTCPeerConnection.prototype.getSenders;
        t && (e.RTCPeerConnection.prototype.getSenders = function() {
            const e = t.apply(this, []);
            return e.forEach(e => e._pc = this), e
        });
        const n = e.RTCPeerConnection.prototype.addTrack;
        n && (e.RTCPeerConnection.prototype.addTrack = function() {
            const e = n.apply(this, arguments);
            return e._pc = this, e
        }), e.RTCRtpSender.prototype.getStats = function() {
            return this.track ? this._pc.getStats(this.track) : Promise.resolve(new Map)
        }
    }

    function be(e) {
        if ("object" != typeof e || !e.RTCPeerConnection || !e.RTCRtpSender) return;
        if (e.RTCRtpSender && "getStats" in e.RTCRtpReceiver.prototype) return;
        const t = e.RTCPeerConnection.prototype.getReceivers;
        t && (e.RTCPeerConnection.prototype.getReceivers = function() {
            const e = t.apply(this, []);
            return e.forEach(e => e._pc = this), e
        }), B(e, "track", e => (e.receiver._pc = e.srcElement, e)), e.RTCRtpReceiver.prototype.getStats = function() {
            return this._pc.getStats(this.track)
        }
    }

    function _e(e) {
        !e.RTCPeerConnection || "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
            q("removeStream", "removeTrack"), this.getSenders().forEach(t => {
                t.track && e.getTracks().includes(t.track) && this.removeTrack(t)
            })
        })
    }

    function Re(e) {
        e.DataChannel && !e.RTCDataChannel && (e.RTCDataChannel = e.DataChannel)
    }
    var Te = Object.freeze({
        shimOnTrack: Se,
        shimPeerConnection: Ce,
        shimSenderGetStats: Ee,
        shimReceiverGetStats: be,
        shimRemoveStream: _e,
        shimRTCDataChannel: Re,
        shimGetUserMedia: ye,
        shimGetDisplayMedia: function(e, t) {
            e.navigator.mediaDevices && "getDisplayMedia" in e.navigator.mediaDevices || e.navigator.mediaDevices && (e.navigator.mediaDevices.getDisplayMedia = function(n) {
                if (!n || !n.video) {
                    const e = new DOMException("getDisplayMedia without video constraints is undefined");
                    return e.name = "NotFoundError", e.code = 8, Promise.reject(e)
                }
                return !0 === n.video ? n.video = {
                    mediaSource: t
                } : n.video.mediaSource = t, e.navigator.mediaDevices.getUserMedia(n)
            })
        }
    });

    function xe(e) {
        if ("object" == typeof e && e.RTCPeerConnection) {
            if ("getLocalStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getLocalStreams = function() {
                    return this._localStreams || (this._localStreams = []), this._localStreams
                }), !("addStream" in e.RTCPeerConnection.prototype)) {
                const t = e.RTCPeerConnection.prototype.addTrack;
                e.RTCPeerConnection.prototype.addStream = function(e) {
                    this._localStreams || (this._localStreams = []), this._localStreams.includes(e) || this._localStreams.push(e), e.getTracks().forEach(n => t.call(this, n, e))
                }, e.RTCPeerConnection.prototype.addTrack = function(e, n) {
                    return n && (this._localStreams ? this._localStreams.includes(n) || this._localStreams.push(n) : this._localStreams = [n]), t.call(this, e, n)
                }
            }
            "removeStream" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.removeStream = function(e) {
                this._localStreams || (this._localStreams = []);
                const t = this._localStreams.indexOf(e);
                if (-1 === t) return;
                this._localStreams.splice(t, 1);
                const n = e.getTracks();
                this.getSenders().forEach(e => {
                    n.includes(e.track) && this.removeTrack(e)
                })
            })
        }
    }

    function ke(e) {
        if ("object" == typeof e && e.RTCPeerConnection && ("getRemoteStreams" in e.RTCPeerConnection.prototype || (e.RTCPeerConnection.prototype.getRemoteStreams = function() {
                return this._remoteStreams ? this._remoteStreams : []
            }), !("onaddstream" in e.RTCPeerConnection.prototype))) {
            Object.defineProperty(e.RTCPeerConnection.prototype, "onaddstream", {
                get() {
                    return this._onaddstream
                },
                set(e) {
                    this._onaddstream && (this.removeEventListener("addstream", this._onaddstream), this.removeEventListener("track", this._onaddstreampoly)), this.addEventListener("addstream", this._onaddstream = e), this.addEventListener("track", this._onaddstreampoly = (e => {
                        e.streams.forEach(e => {
                            if (this._remoteStreams || (this._remoteStreams = []), this._remoteStreams.includes(e)) return;
                            this._remoteStreams.push(e);
                            const t = new Event("addstream");
                            t.stream = e, this.dispatchEvent(t)
                        })
                    }))
                }
            });
            const t = e.RTCPeerConnection.prototype.setRemoteDescription;
            e.RTCPeerConnection.prototype.setRemoteDescription = function() {
                const e = this;
                return this._onaddstreampoly || this.addEventListener("track", this._onaddstreampoly = function(t) {
                    t.streams.forEach(t => {
                        if (e._remoteStreams || (e._remoteStreams = []), e._remoteStreams.indexOf(t) >= 0) return;
                        e._remoteStreams.push(t);
                        const n = new Event("addstream");
                        n.stream = t, e.dispatchEvent(n)
                    })
                }), t.apply(e, arguments)
            }
        }
    }

    function we(e) {
        if ("object" != typeof e || !e.RTCPeerConnection) return;
        const t = e.RTCPeerConnection.prototype,
            n = t.createOffer,
            r = t.createAnswer,
            i = t.setLocalDescription,
            o = t.setRemoteDescription,
            a = t.addIceCandidate;
        t.createOffer = function(e, t) {
            const r = arguments.length >= 2 ? arguments[2] : arguments[0],
                i = n.apply(this, [r]);
            return t ? (i.then(e, t), Promise.resolve()) : i
        }, t.createAnswer = function(e, t) {
            const n = arguments.length >= 2 ? arguments[2] : arguments[0],
                i = r.apply(this, [n]);
            return t ? (i.then(e, t), Promise.resolve()) : i
        };
        let s = function(e, t, n) {
            const r = i.apply(this, [e]);
            return n ? (r.then(t, n), Promise.resolve()) : r
        };
        t.setLocalDescription = s, s = function(e, t, n) {
            const r = o.apply(this, [e]);
            return n ? (r.then(t, n), Promise.resolve()) : r
        }, t.setRemoteDescription = s, s = function(e, t, n) {
            const r = a.apply(this, [e]);
            return n ? (r.then(t, n), Promise.resolve()) : r
        }, t.addIceCandidate = s
    }

    function Pe(e) {
        const t = e && e.navigator;
        if (t.mediaDevices && t.mediaDevices.getUserMedia) {
            const e = t.mediaDevices,
                n = e.getUserMedia.bind(e);
            t.mediaDevices.getUserMedia = (e => n(Oe(e)))
        }!t.getUserMedia && t.mediaDevices && t.mediaDevices.getUserMedia && (t.getUserMedia = function(e, n, r) {
            t.mediaDevices.getUserMedia(e).then(n, r)
        }.bind(t))
    }

    function Oe(e) {
        return e && void 0 !== e.video ? Object.assign({}, e, {
            video: z(e.video)
        }) : e
    }

    function Le(e) {
        const t = e.RTCPeerConnection;
        e.RTCPeerConnection = function(e, n) {
            if (e && e.iceServers) {
                const t = [];
                for (let n = 0; n < e.iceServers.length; n++) {
                    let r = e.iceServers[n];
                    !r.hasOwnProperty("urls") && r.hasOwnProperty("url") ? (q("RTCIceServer.url", "RTCIceServer.urls"), (r = JSON.parse(JSON.stringify(r))).urls = r.url, delete r.url, t.push(r)) : t.push(e.iceServers[n])
                }
                e.iceServers = t
            }
            return new t(e, n)
        }, e.RTCPeerConnection.prototype = t.prototype, "generateCertificate" in e.RTCPeerConnection && Object.defineProperty(e.RTCPeerConnection, "generateCertificate", {
            get: () => t.generateCertificate
        })
    }

    function Me(e) {
        "object" == typeof e && e.RTCPeerConnection && "receiver" in e.RTCTrackEvent.prototype && !e.RTCTransceiver && Object.defineProperty(e.RTCTrackEvent.prototype, "transceiver", {
            get() {
                return {
                    receiver: this.receiver
                }
            }
        })
    }

    function Ie(e) {
        const t = e.RTCPeerConnection.prototype.createOffer;
        e.RTCPeerConnection.prototype.createOffer = function(e) {
            if (e) {
                void 0 !== e.offerToReceiveAudio && (e.offerToReceiveAudio = !!e.offerToReceiveAudio);
                const t = this.getTransceivers().find(e => e.sender.track && "audio" === e.sender.track.kind);
                !1 === e.offerToReceiveAudio && t ? "sendrecv" === t.direction ? t.setDirection ? t.setDirection("sendonly") : t.direction = "sendonly" : "recvonly" === t.direction && (t.setDirection ? t.setDirection("inactive") : t.direction = "inactive") : !0 !== e.offerToReceiveAudio || t || this.addTransceiver("audio"), void 0 !== e.offerToReceiveVideo && (e.offerToReceiveVideo = !!e.offerToReceiveVideo);
                const n = this.getTransceivers().find(e => e.sender.track && "video" === e.sender.track.kind);
                !1 === e.offerToReceiveVideo && n ? "sendrecv" === n.direction ? n.setDirection ? n.setDirection("sendonly") : n.direction = "sendonly" : "recvonly" === n.direction && (n.setDirection ? n.setDirection("inactive") : n.direction = "inactive") : !0 !== e.offerToReceiveVideo || n || this.addTransceiver("video")
            }
            return t.apply(this, arguments)
        }
    }
    var De = Object.freeze({
        shimLocalStreamsAPI: xe,
        shimRemoteStreamsAPI: ke,
        shimCallbacksAPI: we,
        shimGetUserMedia: Pe,
        shimConstraints: Oe,
        shimRTCIceServerUrls: Le,
        shimTrackEventTransceiver: Me,
        shimCreateOfferLegacy: Ie
    });

    function je(e) {
        if (!e.RTCIceCandidate || e.RTCIceCandidate && "foundation" in e.RTCIceCandidate.prototype) return;
        const t = e.RTCIceCandidate;
        e.RTCIceCandidate = function(e) {
            if ("object" == typeof e && e.candidate && 0 === e.candidate.indexOf("a=") && ((e = JSON.parse(JSON.stringify(e))).candidate = e.candidate.substr(2)), e.candidate && e.candidate.length) {
                const n = new t(e),
                    r = ae.parseCandidate(e.candidate),
                    i = Object.assign(n, r);
                return i.toJSON = function() {
                    return {
                        candidate: i.candidate,
                        sdpMid: i.sdpMid,
                        sdpMLineIndex: i.sdpMLineIndex,
                        usernameFragment: i.usernameFragment
                    }
                }, i
            }
            return new t(e)
        }, e.RTCIceCandidate.prototype = t.prototype, B(e, "icecandidate", t => (t.candidate && Object.defineProperty(t, "candidate", {
            value: new e.RTCIceCandidate(t.candidate),
            writable: "false"
        }), t))
    }

    function Ae(e) {
        if (e.RTCSctpTransport || !e.RTCPeerConnection) return;
        const t = H(e);
        "sctp" in e.RTCPeerConnection.prototype || Object.defineProperty(e.RTCPeerConnection.prototype, "sctp", {
            get() {
                return void 0 === this._sctp ? null : this._sctp
            }
        });
        const n = e.RTCPeerConnection.prototype.setRemoteDescription;
        e.RTCPeerConnection.prototype.setRemoteDescription = function() {
            if (this._sctp = null, function(e) {
                    const t = ae.splitSections(e.sdp);
                    return t.shift(), t.some(e => {
                        const t = ae.parseMLine(e);
                        return t && "application" === t.kind && -1 !== t.protocol.indexOf("SCTP")
                    })
                }(arguments[0])) {
                const e = function(e) {
                        const t = e.sdp.match(/mozilla...THIS_IS_SDPARTA-(\d+)/);
                        if (null === t || t.length < 2) return -1;
                        const n = parseInt(t[1], 10);
                        return n != n ? -1 : n
                    }(arguments[0]),
                    n = function(e) {
                        let n = 65536;
                        return "firefox" === t.browser && (n = t.version < 57 ? -1 === e ? 16384 : 2147483637 : t.version < 60 ? 57 === t.version ? 65535 : 65536 : 2147483637), n
                    }(e),
                    r = function(e, n) {
                        let r = 65536;
                        "firefox" === t.browser && 57 === t.version && (r = 65535);
                        const i = ae.matchPrefix(e.sdp, "a=max-message-size:");
                        return i.length > 0 ? r = parseInt(i[0].substr(19), 10) : "firefox" === t.browser && -1 !== n && (r = 2147483637), r
                    }(arguments[0], e);
                let i;
                i = 0 === n && 0 === r ? Number.POSITIVE_INFINITY : 0 === n || 0 === r ? Math.max(n, r) : Math.min(n, r);
                const o = {};
                Object.defineProperty(o, "maxMessageSize", {
                    get: () => i
                }), this._sctp = o
            }
            return n.apply(this, arguments)
        }
    }

    function Ne(e) {
        if (!(e.RTCPeerConnection && "createDataChannel" in e.RTCPeerConnection.prototype)) return;

        function t(e, t) {
            const n = e.send;
            e.send = function() {
                const r = arguments[0],
                    i = r.length || r.size || r.byteLength;
                if ("open" === e.readyState && t.sctp && i > t.sctp.maxMessageSize) throw new TypeError("Message too large (can send a maximum of " + t.sctp.maxMessageSize + " bytes)");
                return n.apply(e, arguments)
            }
        }
        const n = e.RTCPeerConnection.prototype.createDataChannel;
        e.RTCPeerConnection.prototype.createDataChannel = function() {
            const e = n.apply(this, arguments);
            return t(e, this), e
        }, B(e, "datachannel", e => (t(e.channel, e.target), e))
    }

    function Fe(e) {
        if (!e.RTCPeerConnection || "connectionState" in e.RTCPeerConnection.prototype) return;
        const t = e.RTCPeerConnection.prototype;
        Object.defineProperty(t, "connectionState", {
            get() {
                return {
                    completed: "connected",
                    checking: "connecting"
                } [this.iceConnectionState] || this.iceConnectionState
            },
            enumerable: !0,
            configurable: !0
        }), Object.defineProperty(t, "onconnectionstatechange", {
            get() {
                return this._onconnectionstatechange || null
            },
            set(e) {
                this._onconnectionstatechange && (this.removeEventListener("connectionstatechange", this._onconnectionstatechange), delete this._onconnectionstatechange), e && this.addEventListener("connectionstatechange", this._onconnectionstatechange = e)
            },
            enumerable: !0,
            configurable: !0
        }), ["setLocalDescription", "setRemoteDescription"].forEach(e => {
            const n = t[e];
            t[e] = function() {
                return this._connectionstatechangepoly || (this._connectionstatechangepoly = (e => {
                    const t = e.target;
                    if (t._lastConnectionState !== t.connectionState) {
                        t._lastConnectionState = t.connectionState;
                        const n = new Event("connectionstatechange", e);
                        t.dispatchEvent(n)
                    }
                    return e
                }), this.addEventListener("iceconnectionstatechange", this._connectionstatechangepoly)), n.apply(this, arguments)
            }
        })
    }

    function Ve(e) {
        if (!e.RTCPeerConnection) return;
        const t = H(e);
        if ("chrome" === t.browser && t.version >= 71) return;
        const n = e.RTCPeerConnection.prototype.setRemoteDescription;
        e.RTCPeerConnection.prototype.setRemoteDescription = function(e) {
            return e && e.sdp && -1 !== e.sdp.indexOf("\na=extmap-allow-mixed") && (e.sdp = e.sdp.split("\n").filter(e => "a=extmap-allow-mixed" !== e.trim()).join("\n")), n.apply(this, arguments)
        }
    }
    var Ue = Object.freeze({
        shimRTCIceCandidate: je,
        shimMaxMessageSize: Ae,
        shimSendThrowTypeError: Ne,
        shimConnectionState: Fe,
        removeAllowExtmapMixed: Ve
    });
    ! function({
        window: e
    } = {}, t = {
        shimChrome: !0,
        shimFirefox: !0,
        shimEdge: !0,
        shimSafari: !0
    }) {
        const n = J,
            r = H(e),
            i = {
                browserDetails: r,
                commonShim: Ue,
                extractVersion: U,
                disableLog: G,
                disableWarnings: W
            };
        switch (r.browser) {
            case "chrome":
                if (!oe || !re || !t.shimChrome) return n("Chrome shim is not included in this adapter release."), i;
                n("adapter.js shimming chrome."), i.browserShim = oe, X(e), Y(e), re(e), Q(e), ne(e), Z(e), ee(e), ie(e), je(e), Fe(e), Ae(e), Ne(e), Ve(e);
                break;
            case "firefox":
                if (!Te || !Ce || !t.shimFirefox) return n("Firefox shim is not included in this adapter release."), i;
                n("adapter.js shimming firefox."), i.browserShim = Te, ye(e), Ce(e), Se(e), _e(e), Ee(e), be(e), Re(e), je(e), Fe(e), Ae(e), Ne(e);
                break;
            case "edge":
                if (!ge || !ve || !t.shimEdge) return n("MS edge shim is not included in this adapter release."), i;
                n("adapter.js shimming edge."), i.browserShim = ge, he(e), fe(e), ve(e), me(e), Ae(e), Ne(e);
                break;
            case "safari":
                if (!De || !t.shimSafari) return n("Safari shim is not included in this adapter release."), i;
                n("adapter.js shimming safari."), i.browserShim = De, Le(e), Ie(e), we(e), xe(e), ke(e), Me(e), Pe(e), je(e), Ae(e), Ne(e), Ve(e);
                break;
            default:
                n("Unsupported browser!")
        }
    }({
        window: window
    });
    var Be = function(e, t) {
        return (Be = Object.setPrototypeOf || {
                __proto__: []
            }
            instanceof Array && function(e, t) {
                e.__proto__ = t
            } || function(e, t) {
                for (var n in t) t.hasOwnProperty(n) && (e[n] = t[n])
            })(e, t)
    };

    function Ge(e, t) {
        function n() {
            this.constructor = e
        }
        Be(e, t), e.prototype = null === t ? Object.create(t) : (n.prototype = t.prototype, new n)
    }
    var We, Je, qe, He = function() {
        return (He = Object.assign || function(e) {
            for (var t, n = 1, r = arguments.length; n < r; n++)
                for (var i in t = arguments[n]) Object.prototype.hasOwnProperty.call(t, i) && (e[i] = t[i]);
            return e
        }).apply(this, arguments)
    };

    function ze(e, t) {
        var n = "function" == typeof Symbol && e[Symbol.iterator];
        if (!n) return e;
        var r, i, o = n.call(e),
            a = [];
        try {
            for (;
                (void 0 === t || t-- > 0) && !(r = o.next()).done;) a.push(r.value)
        } catch (e) {
            i = {
                error: e
            }
        } finally {
            try {
                r && !r.done && (n = o.return) && n.call(o)
            } finally {
                if (i) throw i.error
            }
        }
        return a
    }

    function $e() {
        for (var e = [], t = 0; t < arguments.length; t++) e = e.concat(ze(arguments[t]));
        return e
    }! function(e) {
        e[e.None = 0] = "None", e[e.Error = 1] = "Error", e[e.Debug = 2] = "Debug", e[e.Verbose = 3] = "Verbose"
    }(We || (We = {})),
    function(e) {
        e.Fatal = "fatal", e.Error = "error", e.Warning = "warning", e.Log = "log", e.Info = "info", e.Debug = "debug", e.Critical = "critical"
    }(Je || (Je = {})),
    function(e) {
        e.fromString = function(t) {
            switch (t) {
                case "debug":
                    return e.Debug;
                case "info":
                    return e.Info;
                case "warn":
                case "warning":
                    return e.Warning;
                case "error":
                    return e.Error;
                case "fatal":
                    return e.Fatal;
                case "critical":
                    return e.Critical;
                case "log":
                default:
                    return e.Log
            }
        }
    }(Je || (Je = {})),
    function(e) {
        e.Unknown = "unknown", e.Skipped = "skipped", e.Success = "success", e.RateLimit = "rate_limit", e.Invalid = "invalid", e.Failed = "failed"
    }(qe || (qe = {})),
    function(e) {
        e.fromHttpCode = function(t) {
            return t >= 200 && t < 300 ? e.Success : 429 === t ? e.RateLimit : t >= 400 && t < 500 ? e.Invalid : t >= 500 ? e.Failed : e.Unknown
        }
    }(qe || (qe = {}));
    var Xe = Object.setPrototypeOf || ({
            __proto__: []
        }
        instanceof Array ? function(e, t) {
            return e.__proto__ = t, e
        } : function(e, t) {
            for (var n in t) e.hasOwnProperty(n) || (e[n] = t[n]);
            return e
        });
    var Ke = function(e) {
        function t(t) {
            var n = this.constructor,
                r = e.call(this, t) || this;
            return r.message = t, r.name = n.prototype.constructor.name, Xe(r, n.prototype), r
        }
        return Ge(t, e), t
    }(Error);

    function Ye(e) {
        switch (Object.prototype.toString.call(e)) {
            case "[object Error]":
            case "[object Exception]":
            case "[object DOMException]":
                return !0;
            default:
                return e instanceof Error
        }
    }

    function Qe(e) {
        return "[object ErrorEvent]" === Object.prototype.toString.call(e)
    }

    function Ze(e) {
        return "[object DOMError]" === Object.prototype.toString.call(e)
    }

    function et(e) {
        return "[object String]" === Object.prototype.toString.call(e)
    }

    function tt(e) {
        return null === e || "object" != typeof e && "function" != typeof e
    }

    function nt(e) {
        return "[object Object]" === Object.prototype.toString.call(e)
    }

    function rt(e) {
        return Boolean(e && e.then && "function" == typeof e.then)
    }
    var it = {};

    function ot() {
        return "[object process]" === Object.prototype.toString.call("undefined" != typeof process ? process : 0) ? global : "undefined" != typeof window ? window : "undefined" != typeof self ? self : it
    }

    function at() {
        var e = ot(),
            t = e.crypto || e.msCrypto;
        if (void 0 !== t && t.getRandomValues) {
            var n = new Uint16Array(8);
            t.getRandomValues(n), n[3] = 4095 & n[3] | 16384, n[4] = 16383 & n[4] | 32768;
            var r = function(e) {
                for (var t = e.toString(16); t.length < 4;) t = "0" + t;
                return t
            };
            return r(n[0]) + r(n[1]) + r(n[2]) + r(n[3]) + r(n[4]) + r(n[5]) + r(n[6]) + r(n[7])
        }
        return "xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx".replace(/[xy]/g, function(e) {
            var t = 16 * Math.random() | 0;
            return ("x" === e ? t : 3 & t | 8).toString(16)
        })
    }

    function st(e) {
        if (!e) return {};
        var t = e.match(/^(([^:\/?#]+):)?(\/\/([^\/?#]*))?([^?#]*)(\?([^#]*))?(#(.*))?$/);
        if (!t) return {};
        var n = t[6] || "",
            r = t[8] || "";
        return {
            host: t[4],
            path: t[5],
            protocol: t[2],
            relative: t[5] + n + r
        }
    }

    function ct(e) {
        if (e.message) return e.message;
        if (e.exception && e.exception.values && e.exception.values[0]) {
            var t = e.exception.values[0];
            return t.type && t.value ? t.type + ": " + t.value : t.type || t.value || e.event_id || "<unknown>"
        }
        return e.event_id || "<unknown>"
    }

    function dt(e) {
        var t = ot();
        if (!("console" in t)) return e();
        var n = t.console,
            r = {};
        ["debug", "info", "warn", "error", "log", "assert"].forEach(function(e) {
            e in t.console && n[e].__sentry__ && (r[e] = n[e].__sentry_wrapped__, n[e] = n[e].__sentry_original__)
        });
        var i = e();
        return Object.keys(r).forEach(function(e) {
            n[e] = r[e]
        }), i
    }

    function lt(e, t, n, r) {
        void 0 === r && (r = {
            handled: !0,
            type: "generic"
        }), e.exception = e.exception || {}, e.exception.values = e.exception.values || [], e.exception.values[0] = e.exception.values[0] || {}, e.exception.values[0].value = e.exception.values[0].value || t || "", e.exception.values[0].type = e.exception.values[0].type || n || "Error", e.exception.values[0].mechanism = e.exception.values[0].mechanism || r
    }
    var pt = ot(),
        ut = "Sentry Logger ",
        ht = function() {
            function e() {
                this._enabled = !1
            }
            return e.prototype.disable = function() {
                this._enabled = !1
            }, e.prototype.enable = function() {
                this._enabled = !0
            }, e.prototype.log = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._enabled && dt(function() {
                    pt.console.log(ut + "[Log]: " + e.join(" "))
                })
            }, e.prototype.warn = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._enabled && dt(function() {
                    pt.console.warn(ut + "[Warn]: " + e.join(" "))
                })
            }, e.prototype.error = function() {
                for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                this._enabled && dt(function() {
                    pt.console.error(ut + "[Error]: " + e.join(" "))
                })
            }, e
        }();
    pt.__SENTRY__ = pt.__SENTRY__ || {};
    var ft = pt.__SENTRY__.logger || (pt.__SENTRY__.logger = new ht),
        vt = function() {
            function e() {
                this._hasWeakSet = "function" == typeof WeakSet, this._inner = this._hasWeakSet ? new WeakSet : []
            }
            return e.prototype.memoize = function(e) {
                if (this._hasWeakSet) return !!this._inner.has(e) || (this._inner.add(e), !1);
                for (var t = 0; t < this._inner.length; t++) {
                    if (this._inner[t] === e) return !0
                }
                return this._inner.push(e), !1
            }, e.prototype.unmemoize = function(e) {
                if (this._hasWeakSet) this._inner.delete(e);
                else
                    for (var t = 0; t < this._inner.length; t++)
                        if (this._inner[t] === e) {
                            this._inner.splice(t, 1);
                            break
                        }
            }, e
        }();

    function mt(e, t, n) {
        if (t in e) {
            var r = e[t],
                i = n(r);
            if ("function" == typeof i) try {
                i.prototype = i.prototype || {}, Object.defineProperties(i, {
                    __sentry__: {
                        enumerable: !1,
                        value: !0
                    },
                    __sentry_original__: {
                        enumerable: !1,
                        value: r
                    },
                    __sentry_wrapped__: {
                        enumerable: !1,
                        value: i
                    }
                })
            } catch (e) {}
            e[t] = i
        }
    }

    function gt(e) {
        return function(e) {
            return ~-encodeURI(e).split(/%..|./).length
        }(JSON.stringify(e))
    }

    function yt(e, t, n) {
        void 0 === t && (t = 3), void 0 === n && (n = 102400);
        var r = Et(e, t);
        return gt(r) > n ? yt(e, t - 1, n) : r
    }

    function St(e, t) {
        return "domain" === t && "object" == typeof e && e._events ? "[Domain]" : "domainEmitter" === t ? "[DomainEmitter]" : "undefined" != typeof global && e === global ? "[Global]" : "undefined" != typeof window && e === window ? "[Window]" : "undefined" != typeof document && e === document ? "[Document]" : "undefined" != typeof Event && e instanceof Event ? Object.getPrototypeOf(e) ? e.constructor.name : "Event" : nt(n = e) && "nativeEvent" in n && "preventDefault" in n && "stopPropagation" in n ? "[SyntheticEvent]" : Number.isNaN(e) ? "[NaN]" : void 0 === e ? "[undefined]" : "function" == typeof e ? "[Function: " + (e.name || "<unknown-function-name>") + "]" : e;
        var n
    }

    function Ct(e, t, n, r) {
        if (void 0 === n && (n = 1 / 0), void 0 === r && (r = new vt), 0 === n) return function(e) {
            var t = Object.prototype.toString.call(e);
            if ("string" == typeof e) return e;
            if ("[object Object]" === t) return "[Object]";
            if ("[object Array]" === t) return "[Array]";
            var n = St(e);
            return tt(n) ? n : t
        }(t);
        if (null != t && "function" == typeof t.toJSON) return t.toJSON();
        var i = St(t, e);
        if (tt(i)) return i;
        var o = Ye(t) ? function(e) {
                var t = {
                    message: e.message,
                    name: e.name,
                    stack: e.stack
                };
                for (var n in e) Object.prototype.hasOwnProperty.call(e, n) && (t[n] = e[n]);
                return t
            }(t) : t,
            a = Array.isArray(t) ? [] : {};
        if (r.memoize(t)) return "[Circular ~]";
        for (var s in o) Object.prototype.hasOwnProperty.call(o, s) && (a[s] = Ct(s, o[s], n - 1, r));
        return r.unmemoize(t), a
    }

    function Et(e, t) {
        try {
            return JSON.parse(JSON.stringify(e, function(e, n) {
                return Ct(e, n, t)
            }))
        } catch (e) {
            return "**non-serializable**"
        }
    }
    var bt, _t = function() {
        function e(e) {
            this._limit = e, this._buffer = []
        }
        return e.prototype.isReady = function() {
            return void 0 === this._limit || this.length() < this._limit
        }, e.prototype.add = function(e) {
            var t = this;
            return this.isReady() ? (-1 === this._buffer.indexOf(e) && this._buffer.push(e), e.then(function() {
                return t.remove(e)
            }).catch(function() {
                return t.remove(e).catch(function() {})
            }), e) : Promise.reject(new Ke("Not adding Promise due to buffer limit reached."))
        }, e.prototype.remove = function(e) {
            return this._buffer.splice(this._buffer.indexOf(e), 1)[0]
        }, e.prototype.length = function() {
            return this._buffer.length
        }, e.prototype.drain = function(e) {
            var t = this;
            return new Promise(function(n) {
                var r = setTimeout(function() {
                    e && e > 0 && n(!1)
                }, e);
                Promise.all(t._buffer).then(function() {
                    clearTimeout(r), n(!0)
                }).catch(function() {
                    n(!0)
                })
            })
        }, e
    }();

    function Rt(e, t) {
        return void 0 === t && (t = 0), "string" != typeof e || 0 === t ? e : e.length <= t ? e : e.substr(0, t) + "..."
    }

    function Tt(e, t) {
        if (!Array.isArray(e)) return "";
        for (var n = [], r = 0; r < e.length; r++) {
            var i = e[r];
            try {
                n.push(String(i))
            } catch (e) {
                n.push("[value cannot be serialized]")
            }
        }
        return n.join(t)
    }

    function xt(e, t) {
        if (void 0 === t && (t = 40), !e.length) return "[object has no keys]";
        if (e[0].length >= t) return Rt(e[0], t);
        for (var n = e.length; n > 0; n--) {
            var r = e.slice(0, n).join(", ");
            if (!(r.length > t)) return n === e.length ? r : Rt(r, t)
        }
        return ""
    }

    function kt(e, t) {
        return n = t, "[object RegExp]" === Object.prototype.toString.call(n) ? t.test(e) : "string" == typeof t && e.includes(t);
        var n
    }

    function wt() {
        if (!("fetch" in ot())) return !1;
        try {
            return new Headers, new Request(""), new Response, !0
        } catch (e) {
            return !1
        }
    }

    function Pt() {
        if (!wt()) return !1;
        try {
            return new Request("_", {
                referrerPolicy: "origin"
            }), !0
        } catch (e) {
            return !1
        }
    }! function(e) {
        e.PENDING = "PENDING", e.RESOLVED = "RESOLVED", e.REJECTED = "REJECTED"
    }(bt || (bt = {}));
    var Ot = function() {
            function e(e) {
                var t = this;
                this._state = bt.PENDING, this._handlers = [], this._resolve = function(e) {
                    t._setResult(e, bt.RESOLVED)
                }, this._reject = function(e) {
                    t._setResult(e, bt.REJECTED)
                }, this._setResult = function(e, n) {
                    t._state === bt.PENDING && (rt(e) ? e.then(t._resolve, t._reject) : (t._value = e, t._state = n, t._executeHandlers()))
                }, this._executeHandlers = function() {
                    t._state !== bt.PENDING && (t._state === bt.REJECTED ? t._handlers.forEach(function(e) {
                        return e.onFail && e.onFail(t._value)
                    }) : t._handlers.forEach(function(e) {
                        return e.onSuccess && e.onSuccess(t._value)
                    }), t._handlers = [])
                }, this._attachHandler = function(e) {
                    t._handlers = t._handlers.concat(e), t._executeHandlers()
                };
                try {
                    e(this._resolve, this._reject)
                } catch (e) {
                    this._reject(e)
                }
            }
            return e.prototype.then = function(t, n) {
                var r = this;
                return new e(function(e, i) {
                    r._attachHandler({
                        onFail: function(t) {
                            if (n) try {
                                return void e(n(t))
                            } catch (e) {
                                return void i(e)
                            } else i(t)
                        },
                        onSuccess: function(n) {
                            if (t) try {
                                return void e(t(n))
                            } catch (e) {
                                return void i(e)
                            } else e(n)
                        }
                    })
                })
            }, e.prototype.catch = function(e) {
                return this.then(function(e) {
                    return e
                }, e)
            }, e.prototype.toString = function() {
                return "[object SyncPromise]"
            }, e.resolve = function(t) {
                return new e(function(e) {
                    e(t)
                })
            }, e.reject = function(t) {
                return new e(function(e, n) {
                    n(t)
                })
            }, e
        }(),
        Lt = /^[ \t]*([0-9a-f]{32})?-?([0-9a-f]{16})?-?([01])?[ \t]*$/,
        Mt = function() {
            function e(e, t, n, r) {
                void 0 === e && (e = at()), void 0 === t && (t = at().substring(16)), this._traceId = e, this._spanId = t, this._sampled = n, this._parent = r
            }
            return e.prototype.setParent = function(e) {
                return this._parent = e, this
            }, e.prototype.setSampled = function(e) {
                return this._sampled = e, this
            }, e.fromTraceparent = function(t) {
                var n = t.match(Lt);
                if (n) {
                    var r = void 0;
                    "1" === n[3] ? r = !0 : "0" === n[3] && (r = !1);
                    var i = new e(n[1], n[2], r);
                    return new e(n[1], void 0, r, i)
                }
            }, e.prototype.toTraceparent = function() {
                var e = "";
                return !0 === this._sampled ? e = "-1" : !1 === this._sampled && (e = "-0"), this._traceId + "-" + this._spanId + e
            }, e.prototype.toJSON = function() {
                return {
                    parent: this._parent && this._parent.toJSON() || void 0,
                    sampled: this._sampled,
                    span_id: this._spanId,
                    trace_id: this._traceId
                }
            }, e
        }(),
        It = function() {
            function e() {
                this._notifyingListeners = !1, this._scopeListeners = [], this._eventProcessors = [], this._breadcrumbs = [], this._user = {}, this._tags = {}, this._extra = {}, this._context = {}
            }
            return e.prototype.addScopeListener = function(e) {
                this._scopeListeners.push(e)
            }, e.prototype.addEventProcessor = function(e) {
                return this._eventProcessors.push(e), this
            }, e.prototype._notifyScopeListeners = function() {
                var e = this;
                this._notifyingListeners || (this._notifyingListeners = !0, setTimeout(function() {
                    e._scopeListeners.forEach(function(t) {
                        t(e)
                    }), e._notifyingListeners = !1
                }))
            }, e.prototype._notifyEventProcessors = function(e, t, n, r) {
                var i = this;
                return void 0 === r && (r = 0), new Ot(function(o, a) {
                    var s = e[r];
                    if (null === t || "function" != typeof s) o(t);
                    else {
                        var c = s(He({}, t), n);
                        rt(c) ? c.then(function(t) {
                            return i._notifyEventProcessors(e, t, n, r + 1).then(o)
                        }).catch(a) : i._notifyEventProcessors(e, c, n, r + 1).then(o).catch(a)
                    }
                })
            }, e.prototype.setUser = function(e) {
                return this._user = Et(e), this._notifyScopeListeners(), this
            }, e.prototype.setTags = function(e) {
                return this._tags = He({}, this._tags, Et(e)), this._notifyScopeListeners(), this
            }, e.prototype.setTag = function(e, t) {
                var n;
                return this._tags = He({}, this._tags, ((n = {})[e] = Et(t), n)), this._notifyScopeListeners(), this
            }, e.prototype.setExtras = function(e) {
                return this._extra = He({}, this._extra, Et(e)), this._notifyScopeListeners(), this
            }, e.prototype.setExtra = function(e, t) {
                var n;
                return this._extra = He({}, this._extra, ((n = {})[e] = Et(t), n)), this._notifyScopeListeners(), this
            }, e.prototype.setFingerprint = function(e) {
                return this._fingerprint = Et(e), this._notifyScopeListeners(), this
            }, e.prototype.setLevel = function(e) {
                return this._level = Et(e), this._notifyScopeListeners(), this
            }, e.prototype.setTransaction = function(e) {
                return this._transaction = e, this._notifyScopeListeners(), this
            }, e.prototype.setContext = function(e, t) {
                return this._context[e] = t ? Et(t) : void 0, this._notifyScopeListeners(), this
            }, e.prototype.setSpan = function(e) {
                return this._span = e, this._notifyScopeListeners(), this
            }, e.prototype.startSpan = function(e) {
                var t = new Mt;
                return t.setParent(e), this.setSpan(t), t
            }, e.prototype.getSpan = function() {
                return this._span
            }, e.clone = function(t) {
                var n = new e;
                return Object.assign(n, t, {
                    _scopeListeners: []
                }), t && (n._breadcrumbs = $e(t._breadcrumbs), n._tags = He({}, t._tags), n._extra = He({}, t._extra), n._context = He({}, t._context), n._user = t._user, n._level = t._level, n._span = t._span, n._transaction = t._transaction, n._fingerprint = t._fingerprint, n._eventProcessors = $e(t._eventProcessors)), n
            }, e.prototype.clear = function() {
                return this._breadcrumbs = [], this._tags = {}, this._extra = {}, this._user = {}, this._context = {}, this._level = void 0, this._transaction = void 0, this._fingerprint = void 0, this._span = void 0, this._notifyScopeListeners(), this
            }, e.prototype.addBreadcrumb = function(e, t) {
                var n = (new Date).getTime() / 1e3,
                    r = He({
                        timestamp: n
                    }, e);
                return this._breadcrumbs = void 0 !== t && t >= 0 ? $e(this._breadcrumbs, [Et(r)]).slice(-t) : $e(this._breadcrumbs, [Et(r)]), this._notifyScopeListeners(), this
            }, e.prototype.clearBreadcrumbs = function() {
                return this._breadcrumbs = [], this._notifyScopeListeners(), this
            }, e.prototype._applyFingerprint = function(e) {
                e.fingerprint = e.fingerprint ? Array.isArray(e.fingerprint) ? e.fingerprint : [e.fingerprint] : [], this._fingerprint && (e.fingerprint = e.fingerprint.concat(this._fingerprint)), e.fingerprint && !e.fingerprint.length && delete e.fingerprint
            }, e.prototype.applyToEvent = function(e, t) {
                return this._extra && Object.keys(this._extra).length && (e.extra = He({}, this._extra, e.extra)), this._tags && Object.keys(this._tags).length && (e.tags = He({}, this._tags, e.tags)), this._user && Object.keys(this._user).length && (e.user = He({}, this._user, e.user)), this._context && Object.keys(this._context).length && (e.contexts = He({}, this._context, e.contexts)), this._level && (e.level = this._level), this._transaction && (e.transaction = this._transaction), this._span && (e.contexts = e.contexts || {}, e.contexts.trace = this._span), this._applyFingerprint(e), e.breadcrumbs = $e(e.breadcrumbs || [], this._breadcrumbs), e.breadcrumbs = e.breadcrumbs.length > 0 ? e.breadcrumbs : void 0, this._notifyEventProcessors($e(Dt(), this._eventProcessors), e, t)
            }, e
        }();

    function Dt() {
        var e = ot();
        return e.__SENTRY__ = e.__SENTRY__ || {}, e.__SENTRY__.globalEventProcessors = e.__SENTRY__.globalEventProcessors || [], e.__SENTRY__.globalEventProcessors
    }

    function jt(e) {
        Dt().push(e)
    }
    var At = 3,
        Nt = function() {
            function e(e, t, n) {
                void 0 === t && (t = new It), void 0 === n && (n = At), this._version = n, this._stack = [], this._stack.push({
                    client: e,
                    scope: t
                })
            }
            return e.prototype._invokeClient = function(e) {
                for (var t, n = [], r = 1; r < arguments.length; r++) n[r - 1] = arguments[r];
                var i = this.getStackTop();
                i && i.client && i.client[e] && (t = i.client)[e].apply(t, $e(n, [i.scope]))
            }, e.prototype.isOlderThan = function(e) {
                return this._version < e
            }, e.prototype.bindClient = function(e) {
                this.getStackTop().client = e
            }, e.prototype.pushScope = function() {
                var e = this.getStack(),
                    t = e.length > 0 ? e[e.length - 1].scope : void 0,
                    n = It.clone(t);
                return this.getStack().push({
                    client: this.getClient(),
                    scope: n
                }), n
            }, e.prototype.popScope = function() {
                return void 0 !== this.getStack().pop()
            }, e.prototype.withScope = function(e) {
                var t = this.pushScope();
                try {
                    e(t)
                } finally {
                    this.popScope()
                }
            }, e.prototype.getClient = function() {
                return this.getStackTop().client
            }, e.prototype.getScope = function() {
                return this.getStackTop().scope
            }, e.prototype.getStack = function() {
                return this._stack
            }, e.prototype.getStackTop = function() {
                return this._stack[this._stack.length - 1]
            }, e.prototype.captureException = function(e, t) {
                var n = this._lastEventId = at(),
                    r = t;
                if (!t) {
                    var i = void 0;
                    try {
                        throw new Error("Sentry syntheticException")
                    } catch (e) {
                        i = e
                    }
                    r = {
                        originalException: e,
                        syntheticException: i
                    }
                }
                return this._invokeClient("captureException", e, He({}, r, {
                    event_id: n
                })), n
            }, e.prototype.captureMessage = function(e, t, n) {
                var r = this._lastEventId = at(),
                    i = n;
                if (!n) {
                    var o = void 0;
                    try {
                        throw new Error(e)
                    } catch (e) {
                        o = e
                    }
                    i = {
                        originalException: e,
                        syntheticException: o
                    }
                }
                return this._invokeClient("captureMessage", e, t, He({}, i, {
                    event_id: r
                })), r
            }, e.prototype.captureEvent = function(e, t) {
                var n = this._lastEventId = at();
                return this._invokeClient("captureEvent", e, He({}, t, {
                    event_id: n
                })), n
            }, e.prototype.lastEventId = function() {
                return this._lastEventId
            }, e.prototype.addBreadcrumb = function(e, t) {
                var n = this.getStackTop();
                if (n.scope && n.client) {
                    var r = n.client.getOptions && n.client.getOptions() || {},
                        i = r.beforeBreadcrumb,
                        o = void 0 === i ? null : i,
                        a = r.maxBreadcrumbs,
                        s = void 0 === a ? 30 : a;
                    if (!(s <= 0)) {
                        var c = (new Date).getTime() / 1e3,
                            d = He({
                                timestamp: c
                            }, e),
                            l = o ? dt(function() {
                                return o(d, t)
                            }) : d;
                        null !== l && n.scope.addBreadcrumb(l, Math.min(s, 100))
                    }
                }
            }, e.prototype.setUser = function(e) {
                var t = this.getStackTop();
                t.scope && t.scope.setUser(e)
            }, e.prototype.setTags = function(e) {
                var t = this.getStackTop();
                t.scope && t.scope.setTags(e)
            }, e.prototype.setExtras = function(e) {
                var t = this.getStackTop();
                t.scope && t.scope.setExtras(e)
            }, e.prototype.setTag = function(e, t) {
                var n = this.getStackTop();
                n.scope && n.scope.setTag(e, t)
            }, e.prototype.setExtra = function(e, t) {
                var n = this.getStackTop();
                n.scope && n.scope.setExtra(e, t)
            }, e.prototype.setContext = function(e, t) {
                var n = this.getStackTop();
                n.scope && n.scope.setContext(e, t)
            }, e.prototype.configureScope = function(e) {
                var t = this.getStackTop();
                t.scope && t.client && e(t.scope)
            }, e.prototype.run = function(e) {
                var t = Vt(this);
                try {
                    e(this)
                } finally {
                    Vt(t)
                }
            }, e.prototype.getIntegration = function(e) {
                var t = this.getClient();
                if (!t) return null;
                try {
                    return t.getIntegration(e)
                } catch (t) {
                    return ft.warn("Cannot retrieve integration " + e.id + " from the current Hub"), null
                }
            }, e.prototype.traceHeaders = function() {
                var e = this.getStackTop();
                if (e.scope && e.client) {
                    var t = e.scope.getSpan();
                    if (t) return {
                        "sentry-trace": t.toTraceparent()
                    }
                }
                return {}
            }, e
        }();

    function Ft() {
        var e = ot();
        return e.__SENTRY__ = e.__SENTRY__ || {
            hub: void 0
        }, e
    }

    function Vt(e) {
        var t = Ft(),
            n = Gt(t);
        return Wt(t, e), n
    }

    function Ut() {
        var e, t, n = Ft();
        Bt(n) && !Gt(n).isOlderThan(At) || Wt(n, new Nt);
        try {
            var r = (e = module, t = "domain", e.require(t)).active;
            if (!r) return Gt(n);
            if (!Bt(r) || Gt(r).isOlderThan(At)) {
                var i = Gt(n).getStackTop();
                Wt(r, new Nt(i.client, It.clone(i.scope)))
            }
            return Gt(r)
        } catch (e) {
            return Gt(n)
        }
    }

    function Bt(e) {
        return !!(e && e.__SENTRY__ && e.__SENTRY__.hub)
    }

    function Gt(e) {
        return e && e.__SENTRY__ && e.__SENTRY__.hub ? e.__SENTRY__.hub : (e.__SENTRY__ = e.__SENTRY__ || {}, e.__SENTRY__.hub = new Nt, e.__SENTRY__.hub)
    }

    function Wt(e, t) {
        return !!e && (e.__SENTRY__ = e.__SENTRY__ || {}, e.__SENTRY__.hub = t, !0)
    }

    function Jt(e) {
        for (var t = [], n = 1; n < arguments.length; n++) t[n - 1] = arguments[n];
        var r = Ut();
        if (r && r[e]) return r[e].apply(r, $e(t));
        throw new Error("No hub defined or " + e + " was not found on the hub, please open a bug report.")
    }
    var qt = /^(?:(\w+):)\/\/(?:(\w+)(?::(\w+))?@)([\w\.-]+)(?::(\d+))?\/(.+)/,
        Ht = function() {
            function e(e) {
                "string" == typeof e ? this._fromString(e) : this._fromComponents(e), this._validate()
            }
            return e.prototype.toString = function(e) {
                void 0 === e && (e = !1);
                var t = this,
                    n = t.host,
                    r = t.path,
                    i = t.pass,
                    o = t.port,
                    a = t.projectId;
                return t.protocol + "://" + t.user + (e && i ? ":" + i : "") + "@" + n + (o ? ":" + o : "") + "/" + (r ? r + "/" : r) + a
            }, e.prototype._fromString = function(e) {
                var t = qt.exec(e);
                if (!t) throw new Ke("Invalid Dsn");
                var n = ze(t.slice(1), 6),
                    r = n[0],
                    i = n[1],
                    o = n[2],
                    a = void 0 === o ? "" : o,
                    s = n[3],
                    c = n[4],
                    d = void 0 === c ? "" : c,
                    l = "",
                    p = n[5],
                    u = p.split("/");
                u.length > 1 && (l = u.slice(0, -1).join("/"), p = u.pop()), Object.assign(this, {
                    host: s,
                    pass: a,
                    path: l,
                    projectId: p,
                    port: d,
                    protocol: r,
                    user: i
                })
            }, e.prototype._fromComponents = function(e) {
                this.protocol = e.protocol, this.user = e.user, this.pass = e.pass || "", this.host = e.host, this.port = e.port || "", this.path = e.path || "", this.projectId = e.projectId
            }, e.prototype._validate = function() {
                var e = this;
                if (["protocol", "user", "host", "projectId"].forEach(function(t) {
                        if (!e[t]) throw new Ke("Invalid Dsn")
                    }), "http" !== this.protocol && "https" !== this.protocol) throw new Ke("Invalid Dsn");
                if (this.port && Number.isNaN(parseInt(this.port, 10))) throw new Ke("Invalid Dsn")
            }, e
        }(),
        zt = function() {
            function e(e) {
                this.dsn = e, this._dsnObject = new Ht(e)
            }
            return e.prototype.getDsn = function() {
                return this._dsnObject
            }, e.prototype.getStoreEndpoint = function() {
                return "" + this._getBaseUrl() + this.getStoreEndpointPath()
            }, e.prototype.getStoreEndpointWithUrlEncodedAuth = function() {
                var e, t = {
                    sentry_key: this._dsnObject.user,
                    sentry_version: "7"
                };
                return this.getStoreEndpoint() + "?" + (e = t, Object.keys(e).map(function(t) {
                    return encodeURIComponent(t) + "=" + encodeURIComponent(e[t])
                }).join("&"))
            }, e.prototype._getBaseUrl = function() {
                var e = this._dsnObject,
                    t = e.protocol ? e.protocol + ":" : "",
                    n = e.port ? ":" + e.port : "";
                return t + "//" + e.host + n
            }, e.prototype.getStoreEndpointPath = function() {
                var e = this._dsnObject;
                return (e.path ? "/" + e.path : "") + "/api/" + e.projectId + "/store/"
            }, e.prototype.getRequestHeaders = function(e, t) {
                var n = this._dsnObject,
                    r = ["Sentry sentry_version=7"];
                return r.push("sentry_timestamp=" + (new Date).getTime()), r.push("sentry_client=" + e + "/" + t), r.push("sentry_key=" + n.user), n.pass && r.push("sentry_secret=" + n.pass), {
                    "Content-Type": "application/json",
                    "X-Sentry-Auth": r.join(", ")
                }
            }, e.prototype.getReportDialogEndpoint = function(e) {
                void 0 === e && (e = {});
                var t = this._dsnObject,
                    n = this._getBaseUrl() + (t.path ? "/" + t.path : "") + "/api/embed/error-page/",
                    r = [];
                for (var i in r.push("dsn=" + t.toString()), e)
                    if ("user" === i) {
                        if (!e.user) continue;
                        e.user.name && r.push("name=" + encodeURIComponent(e.user.name)), e.user.email && r.push("email=" + encodeURIComponent(e.user.email))
                    } else r.push(encodeURIComponent(i) + "=" + encodeURIComponent(e[i]));
                return r.length ? n + "?" + r.join("&") : n
            }, e
        }(),
        $t = [];

    function Xt(e) {
        var t = {};
        return function(e) {
            var t = e.defaultIntegrations && $e(e.defaultIntegrations) || [],
                n = e.integrations,
                r = [];
            if (Array.isArray(n)) {
                var i = n.map(function(e) {
                        return e.name
                    }),
                    o = [];
                t.forEach(function(e) {
                    -1 === i.indexOf(e.name) && -1 === o.indexOf(e.name) && (r.push(e), o.push(e.name))
                }), n.forEach(function(e) {
                    -1 === o.indexOf(e.name) && (r.push(e), o.push(e.name))
                })
            } else {
                if ("function" != typeof n) return $e(t);
                r = n(t), r = Array.isArray(r) ? r : [r]
            }
            return r
        }(e).forEach(function(e) {
            t[e.name] = e,
                function(e) {
                    -1 === $t.indexOf(e.name) && (e.setupOnce(jt, Ut), $t.push(e.name), ft.log("Integration installed: " + e.name))
                }(e)
        }), t
    }
    var Kt, Yt = function() {
            function e(e, t) {
                this._integrations = {}, this._processing = !1, this._backend = new e(t), this._options = t, t.dsn && (this._dsn = new Ht(t.dsn)), this._isEnabled() && (this._integrations = Xt(this._options))
            }
            return e.prototype.captureException = function(e, t, n) {
                var r = this,
                    i = t && t.event_id;
                return this._processing = !0, this._getBackend().eventFromException(e, t).then(function(e) {
                    return r._processEvent(e, t, n)
                }).then(function(e) {
                    i = e && e.event_id, r._processing = !1
                }).catch(function(e) {
                    ft.error(e), r._processing = !1
                }), i
            }, e.prototype.captureMessage = function(e, t, n, r) {
                var i = this,
                    o = n && n.event_id;
                return this._processing = !0, (tt(e) ? this._getBackend().eventFromMessage("" + e, t, n) : this._getBackend().eventFromException(e, n)).then(function(e) {
                    return i._processEvent(e, n, r)
                }).then(function(e) {
                    o = e && e.event_id, i._processing = !1
                }).catch(function(e) {
                    ft.error(e), i._processing = !1
                }), o
            }, e.prototype.captureEvent = function(e, t, n) {
                var r = this,
                    i = t && t.event_id;
                return this._processing = !0, this._processEvent(e, t, n).then(function(e) {
                    i = e && e.event_id, r._processing = !1
                }).catch(function(e) {
                    ft.error(e), r._processing = !1
                }), i
            }, e.prototype.getDsn = function() {
                return this._dsn
            }, e.prototype.getOptions = function() {
                return this._options
            }, e.prototype.flush = function(e) {
                var t = this;
                return this._isClientProcessing(e).then(function(n) {
                    return clearInterval(n.interval), t._getBackend().getTransport().close(e).then(function(e) {
                        return n.ready && e
                    })
                })
            }, e.prototype.close = function(e) {
                var t = this;
                return this.flush(e).then(function(e) {
                    return t.getOptions().enabled = !1, e
                })
            }, e.prototype.getIntegrations = function() {
                return this._integrations || {}
            }, e.prototype.getIntegration = function(e) {
                try {
                    return this._integrations[e.id] || null
                } catch (t) {
                    return ft.warn("Cannot retrieve integration " + e.id + " from the current Client"), null
                }
            }, e.prototype._isClientProcessing = function(e) {
                var t = this;
                return new Promise(function(n) {
                    var r = 0,
                        i = 0;
                    clearInterval(i), i = setInterval(function() {
                        t._processing ? (r += 1, e && r >= e && n({
                            interval: i,
                            ready: !1
                        })) : n({
                            interval: i,
                            ready: !0
                        })
                    }, 1)
                })
            }, e.prototype._getBackend = function() {
                return this._backend
            }, e.prototype._isEnabled = function() {
                return !1 !== this.getOptions().enabled && void 0 !== this._dsn
            }, e.prototype._prepareEvent = function(e, t, n) {
                var r = this.getOptions(),
                    i = r.environment,
                    o = r.release,
                    a = r.dist,
                    s = r.maxValueLength,
                    c = void 0 === s ? 250 : s,
                    d = He({}, e);
                void 0 === d.environment && void 0 !== i && (d.environment = i), void 0 === d.release && void 0 !== o && (d.release = o), void 0 === d.dist && void 0 !== a && (d.dist = a), d.message && (d.message = Rt(d.message, c));
                var l = d.exception && d.exception.values && d.exception.values[0];
                l && l.value && (l.value = Rt(l.value, c));
                var p = d.request;
                p && p.url && (p.url = Rt(p.url, c)), void 0 === d.event_id && (d.event_id = at()), this._addIntegrations(d.sdk);
                var u = Ot.resolve(d);
                return t && (u = t.applyToEvent(d, n)), u
            }, e.prototype._addIntegrations = function(e) {
                var t = Object.keys(this._integrations);
                e && t.length > 0 && (e.integrations = t)
            }, e.prototype._processEvent = function(e, t, n) {
                var r = this,
                    i = this.getOptions(),
                    o = i.beforeSend,
                    a = i.sampleRate;
                return this._isEnabled() ? "number" == typeof a && Math.random() > a ? Ot.reject("This event has been sampled, will not send event.") : new Ot(function(i, a) {
                    r._prepareEvent(e, n, t).then(function(e) {
                        if (null !== e) {
                            var n = e;
                            try {
                                if (t && t.data && !0 === t.data.__sentry__ || !o) return r._getBackend().sendEvent(n), void i(n);
                                var s = o(e, t);
                                if (void 0 === s) ft.error("`beforeSend` method has to return `null` or a valid event.");
                                else if (rt(s)) r._handleAsyncBeforeSend(s, i, a);
                                else {
                                    if (null === (n = s)) return ft.log("`beforeSend` returned `null`, will not send event."), void i(null);
                                    r._getBackend().sendEvent(n), i(n)
                                }
                            } catch (e) {
                                r.captureException(e, {
                                    data: {
                                        __sentry__: !0
                                    },
                                    originalException: e
                                }), a("`beforeSend` throw an error, will not send event.")
                            }
                        } else a("An event processor returned null, will not send event.")
                    })
                }) : Ot.reject("SDK not enabled, will not send event.")
            }, e.prototype._handleAsyncBeforeSend = function(e, t, n) {
                var r = this;
                e.then(function(e) {
                    null !== e ? (r._getBackend().sendEvent(e), t(e)) : n("`beforeSend` returned `null`, will not send event.")
                }).catch(function(e) {
                    n("beforeSend rejected with " + e)
                })
            }, e
        }(),
        Qt = function() {
            function e() {}
            return e.prototype.sendEvent = function(e) {
                return Promise.resolve({
                    reason: "NoopTransport: Event has been skipped because no Dsn is configured.",
                    status: qe.Skipped
                })
            }, e.prototype.close = function(e) {
                return Promise.resolve(!0)
            }, e
        }(),
        Zt = function() {
            function e(e) {
                this._options = e, this._options.dsn || ft.warn("No DSN provided, backend will not do anything."), this._transport = this._setupTransport()
            }
            return e.prototype._setupTransport = function() {
                return new Qt
            }, e.prototype.eventFromException = function(e, t) {
                throw new Ke("Backend has to implement `eventFromException` method")
            }, e.prototype.eventFromMessage = function(e, t, n) {
                throw new Ke("Backend has to implement `eventFromMessage` method")
            }, e.prototype.sendEvent = function(e) {
                this._transport.sendEvent(e).catch(function(e) {
                    ft.error("Error while sending event: " + e)
                })
            }, e.prototype.getTransport = function() {
                return this._transport
            }, e
        }();
    var en = function() {
            function e() {
                this.name = e.id
            }
            return e.prototype.setupOnce = function() {
                Kt = Function.prototype.toString, Function.prototype.toString = function() {
                    for (var e = [], t = 0; t < arguments.length; t++) e[t] = arguments[t];
                    var n = this.__sentry__ ? this.__sentry_original__ : this;
                    return Kt.apply(n, e)
                }
            }, e.id = "FunctionToString", e
        }(),
        tn = [/^Script error\.?$/, /^Javascript error: Script error\.? on line 0$/],
        nn = function() {
            function e(t) {
                void 0 === t && (t = {}), this._options = t, this.name = e.id
            }
            return e.prototype.setupOnce = function() {
                jt(function(t) {
                    var n = Ut();
                    if (!n) return t;
                    var r = n.getIntegration(e);
                    if (r) {
                        var i = n.getClient(),
                            o = i ? i.getOptions() : {},
                            a = r._mergeOptions(o);
                        if (r._shouldDropEvent(t, a)) return null
                    }
                    return t
                })
            }, e.prototype._shouldDropEvent = function(e, t) {
                return this._isSentryError(e, t) ? (ft.warn("Event dropped due to being internal Sentry Error.\nEvent: " + ct(e)), !0) : this._isIgnoredError(e, t) ? (ft.warn("Event dropped due to being matched by `ignoreErrors` option.\nEvent: " + ct(e)), !0) : this._isBlacklistedUrl(e, t) ? (ft.warn("Event dropped due to being matched by `blacklistUrls` option.\nEvent: " + ct(e) + ".\nUrl: " + this._getEventFilterUrl(e)), !0) : !this._isWhitelistedUrl(e, t) && (ft.warn("Event dropped due to not being matched by `whitelistUrls` option.\nEvent: " + ct(e) + ".\nUrl: " + this._getEventFilterUrl(e)), !0)
            }, e.prototype._isSentryError = function(e, t) {
                if (void 0 === t && (t = {}), !t.ignoreInternal) return !1;
                try {
                    return "SentryError" === e.exception.values[0].type
                } catch (e) {
                    return !1
                }
            }, e.prototype._isIgnoredError = function(e, t) {
                return void 0 === t && (t = {}), !(!t.ignoreErrors || !t.ignoreErrors.length) && this._getPossibleEventMessages(e).some(function(e) {
                    return t.ignoreErrors.some(function(t) {
                        return kt(e, t)
                    })
                })
            }, e.prototype._isBlacklistedUrl = function(e, t) {
                if (void 0 === t && (t = {}), !t.blacklistUrls || !t.blacklistUrls.length) return !1;
                var n = this._getEventFilterUrl(e);
                return !!n && t.blacklistUrls.some(function(e) {
                    return kt(n, e)
                })
            }, e.prototype._isWhitelistedUrl = function(e, t) {
                if (void 0 === t && (t = {}), !t.whitelistUrls || !t.whitelistUrls.length) return !0;
                var n = this._getEventFilterUrl(e);
                return !n || t.whitelistUrls.some(function(e) {
                    return kt(n, e)
                })
            }, e.prototype._mergeOptions = function(e) {
                return void 0 === e && (e = {}), {
                    blacklistUrls: $e(this._options.blacklistUrls || [], e.blacklistUrls || []),
                    ignoreErrors: $e(this._options.ignoreErrors || [], e.ignoreErrors || [], tn),
                    ignoreInternal: void 0 === this._options.ignoreInternal || this._options.ignoreInternal,
                    whitelistUrls: $e(this._options.whitelistUrls || [], e.whitelistUrls || [])
                }
            }, e.prototype._getPossibleEventMessages = function(e) {
                if (e.message) return [e.message];
                if (e.exception) try {
                    var t = e.exception.values[0],
                        n = t.type,
                        r = t.value;
                    return ["" + r, n + ": " + r]
                } catch (t) {
                    return ft.error("Cannot extract message for event " + ct(e)), []
                }
                return []
            }, e.prototype._getEventFilterUrl = function(e) {
                try {
                    if (e.stacktrace) {
                        var t = e.stacktrace.frames;
                        return t[t.length - 1].filename
                    }
                    if (e.exception) {
                        var n = e.exception.values[0].stacktrace.frames;
                        return n[n.length - 1].filename
                    }
                    return null
                } catch (t) {
                    return ft.error("Cannot extract url for event " + ct(e)), null
                }
            }, e.id = "InboundFilters", e
        }(),
        rn = Object.freeze({
            FunctionToString: en,
            InboundFilters: nn
        }),
        on = ot(),
        an = {
            _report: !1,
            _collectWindowErrors: !1,
            _computeStackTrace: !1,
            _linesOfContext: !1
        },
        sn = "?",
        cn = /^(?:[Uu]ncaught (?:exception: )?)?(?:((?:Eval|Internal|Range|Reference|Syntax|Type|URI|)Error): )?(.*)$/;

    function dn(e, t) {
        return Object.prototype.hasOwnProperty.call(e, t)
    }

    function ln() {
        return "undefined" == typeof document || null == document.location ? "" : document.location.href
    }
    an._report = function() {
        var e, t, n = [],
            r = null,
            i = null;

        function o(e, t, r) {
            var i = null;
            if (!t || an._collectWindowErrors) {
                for (var o in n)
                    if (dn(n, o)) try {
                        n[o](e, t, r)
                    } catch (e) {
                        i = e
                    }
                if (i) throw i
            }
        }

        function a(t, n, r, a, s) {
            var d = null;
            if (s = Qe(s) ? s.error : s, t = Qe(t) ? t.message : t, i) an._computeStackTrace._augmentStackTraceWithInitialElement(i, n, r, t), c();
            else if (s && Ye(s))(d = an._computeStackTrace(s)).mechanism = "onerror", o(d, !0, s);
            else {
                var l, p = {
                        url: n,
                        line: r,
                        column: a
                    },
                    u = t;
                if ("[object String]" === {}.toString.call(t)) {
                    var h = t.match(cn);
                    h && (l = h[1], u = h[2])
                }
                p.func = sn, p.context = null, o(d = {
                    name: l,
                    message: u,
                    mode: "onerror",
                    mechanism: "onerror",
                    stack: [He({}, p, {
                        url: p.url || ln()
                    })]
                }, !0, null)
            }
            return !!e && e.apply(this, arguments)
        }

        function s(e) {
            var t = e;
            try {
                t = e && "reason" in e ? e.reason : e
            } catch (e) {}
            var n = an._computeStackTrace(t);
            n.mechanism = "onunhandledrejection", o(n, !0, t)
        }

        function c() {
            var e = i,
                t = r;
            i = null, r = null, o(e, !1, t)
        }

        function d(e) {
            if (i) {
                if (r === e) return;
                c()
            }
            var t = an._computeStackTrace(e);
            throw i = t, r = e, setTimeout(function() {
                r === e && c()
            }, t.incomplete ? 2e3 : 0), e
        }
        return d._subscribe = function(e) {
            n.push(e)
        }, d._installGlobalHandler = function() {
            !0 !== t && (e = on.onerror, on.onerror = a, t = !0)
        }, d._installGlobalUnhandledRejectionHandler = function() {
            on.onunhandledrejection = s
        }, d
    }(), an._computeStackTrace = function() {
        function e(e) {
            if (!e || !e.stack) return null;
            for (var t, n, r, i = /^\s*at (?:(.*?) ?\()?((?:file|https?|blob|chrome-extension|native|eval|webpack|<anonymous>|[-a-z]+:|\/).*?)(?::(\d+))?(?::(\d+))?\)?\s*$/i, o = /^\s*(.*?)(?:\((.*?)\))?(?:^|@)?((?:file|https?|blob|chrome|webpack|resource|moz-extension).*?:\/.*?|\[native code\]|[^@]*(?:bundle|\d+\.js))(?::(\d+))?(?::(\d+))?\s*$/i, a = /^\s*at (?:((?:\[object object\])?.+) )?\(?((?:file|ms-appx|https?|webpack|blob):.*?):(\d+)(?::(\d+))?\)?\s*$/i, s = /(\S+) line (\d+)(?: > eval line \d+)* > eval/i, c = /\((\S*)(?::(\d+))(?::(\d+))\)/, d = e.stack.split("\n"), l = [], p = /^(.*) is undefined$/.exec(e.message), u = 0, h = d.length; u < h; ++u) {
                if (n = i.exec(d[u])) {
                    var f = n[2] && 0 === n[2].indexOf("native");
                    n[2] && 0 === n[2].indexOf("eval") && (t = c.exec(n[2])) && (n[2] = t[1], n[3] = t[2], n[4] = t[3]), r = {
                        url: n[2],
                        func: n[1] || sn,
                        args: f ? [n[2]] : [],
                        line: n[3] ? +n[3] : null,
                        column: n[4] ? +n[4] : null
                    }
                } else if (n = a.exec(d[u])) r = {
                    url: n[2],
                    func: n[1] || sn,
                    args: [],
                    line: +n[3],
                    column: n[4] ? +n[4] : null
                };
                else {
                    if (!(n = o.exec(d[u]))) continue;
                    n[3] && n[3].indexOf(" > eval") > -1 && (t = s.exec(n[3])) ? (n[1] = n[1] || "eval", n[3] = t[1], n[4] = t[2], n[5] = "") : 0 !== u || n[5] || void 0 === e.columnNumber || (l[0].column = e.columnNumber + 1), r = {
                        url: n[3],
                        func: n[1] || sn,
                        args: n[2] ? n[2].split(",") : [],
                        line: n[4] ? +n[4] : null,
                        column: n[5] ? +n[5] : null
                    }
                }!r.func && r.line && (r.func = sn), r.context = null, l.push(r)
            }
            return l.length ? (l[0] && l[0].line && !l[0].column && p && (l[0].column = null), {
                mode: "stack",
                name: e.name,
                message: e.message,
                stack: l
            }) : null
        }

        function t(e, t, n, r) {
            var i = {
                url: t,
                line: n
            };
            if (i.url && i.line) {
                if (e.incomplete = !1, i.func || (i.func = sn), i.context || (i.context = null), / '([^']+)' /.exec(r) && (i.column = null), e.stack.length > 0 && e.stack[0].url === i.url) {
                    if (e.stack[0].line === i.line) return !1;
                    if (!e.stack[0].line && e.stack[0].func === i.func) return e.stack[0].line = i.line, e.stack[0].context = i.context, !1
                }
                return e.stack.unshift(i), e.partial = !0, !0
            }
            return e.incomplete = !0, !1
        }

        function n(e, r) {
            for (var i, o, a = /function\s+([_$a-zA-Z\xA0-\uFFFF][_$a-zA-Z0-9\xA0-\uFFFF]*)?\s*\(/i, s = [], c = {}, d = !1, l = n.caller; l && !d; l = l.caller)
                if (l !== fn && l !== an._report) {
                    if (o = {
                            url: null,
                            func: sn,
                            args: [],
                            line: null,
                            column: null
                        }, l.name ? o.func = l.name : (i = a.exec(l.toString())) && (o.func = i[1]), void 0 === o.func) try {
                        o.func = i.input.substring(0, i.input.indexOf("{"))
                    } catch (e) {}
                    c["" + l] ? d = !0 : c["" + l] = !0, s.push(o)
                } r && s.splice(0, r);
            var p = {
                mode: "callers",
                name: e.name,
                message: e.message,
                stack: s
            };
            return t(p, e.sourceURL || e.fileName, e.line || e.lineNumber, e.message || e.description), p
        }

        function r(t, r) {
            var o = null,
                a = t && t.framesToPop;
            r = null == r ? 0 : +r;
            try {
                if (o = function(e) {
                        var t = e.stacktrace;
                        if (t) {
                            for (var n, r = / line (\d+).*script (?:in )?(\S+)(?:: in function (\S+))?$/i, i = / line (\d+), column (\d+)\s*(?:in (?:<anonymous function: ([^>]+)>|([^\)]+))\((.*)\))? in (.*):\s*$/i, o = t.split("\n"), a = [], s = 0; s < o.length; s += 2) {
                                var c = null;
                                (n = r.exec(o[s])) ? c = {
                                    url: n[2],
                                    line: +n[1],
                                    column: null,
                                    func: n[3],
                                    args: []
                                }: (n = i.exec(o[s])) && (c = {
                                    url: n[6],
                                    line: +n[1],
                                    column: +n[2],
                                    func: n[3] || n[4],
                                    args: n[5] ? n[5].split(",") : []
                                }), c && (!c.func && c.line && (c.func = sn), c.line && (c.context = null), c.context || (c.context = [o[s + 1]]), a.push(c))
                            }
                            return a.length ? {
                                mode: "stacktrace",
                                name: e.name,
                                message: e.message,
                                stack: a
                            } : null
                        }
                    }(t)) return i(o, a)
            } catch (e) {}
            try {
                if (o = e(t)) return i(o, a)
            } catch (e) {}
            try {
                if (o = function(e) {
                        var t = e.message.split("\n");
                        if (t.length < 4) return null;
                        var n, r = /^\s*Line (\d+) of linked script ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,
                            i = /^\s*Line (\d+) of inline#(\d+) script in ((?:file|https?|blob)\S+)(?:: in function (\S+))?\s*$/i,
                            o = /^\s*Line (\d+) of function script\s*$/i,
                            a = [],
                            s = on && on.document && on.document.getElementsByTagName("script"),
                            c = [];
                        for (var d in s) dn(s, d) && !s[d].src && c.push(s[d]);
                        for (var l = 2; l < t.length; l += 2) {
                            var p = null;
                            (n = r.exec(t[l])) ? p = {
                                url: n[2],
                                func: n[3],
                                args: [],
                                line: +n[1],
                                column: null
                            }: (n = i.exec(t[l])) ? p = {
                                url: n[3],
                                func: n[4],
                                args: [],
                                line: +n[1],
                                column: null
                            } : (n = o.exec(t[l])) && (p = {
                                url: ln().replace(/#.*$/, ""),
                                func: "",
                                args: [],
                                line: n[1],
                                column: null
                            }), p && (p.func || (p.func = sn), p.context = [t[l + 1]], a.push(p))
                        }
                        return a.length ? {
                            mode: "multiline",
                            name: e.name,
                            message: t[0],
                            stack: a
                        } : null
                    }(t)) return i(o, a)
            } catch (e) {}
            try {
                if (o = n(t, r + 1)) return i(o, a)
            } catch (e) {}
            return {
                original: t,
                name: t && t.name,
                message: t && t.message,
                mode: "failed"
            }
        }

        function i(e, t) {
            if (Number.isNaN(t)) return e;
            try {
                return He({}, e, {
                    stack: e.stack.slice(t)
                })
            } catch (t) {
                return e
            }
        }
        return r._augmentStackTraceWithInitialElement = t, r._computeStackTraceFromStackProp = e, r
    }(), an._collectWindowErrors = !0, an._linesOfContext = 11;
    var pn = an._report._subscribe,
        un = an._report._installGlobalHandler,
        hn = an._report._installGlobalUnhandledRejectionHandler,
        fn = an._computeStackTrace,
        vn = 50;

    function mn(e) {
        var t = yn(e.stack),
            n = {
                type: e.name,
                value: e.message
            };
        return t && t.length && (n.stacktrace = {
            frames: t
        }), void 0 === n.type && "" === n.value && (n.value = "Unrecoverable error caught"), n
    }

    function gn(e) {
        return {
            exception: {
                values: [mn(e)]
            }
        }
    }

    function yn(e) {
        if (!e || !e.length) return [];
        var t = e,
            n = t[0].func || "",
            r = t[t.length - 1].func || "";
        return (n.includes("captureMessage") || n.includes("captureException")) && (t = t.slice(1)), r.includes("sentryWrapped") && (t = t.slice(0, -1)), t.map(function(e) {
            return {
                colno: e.column,
                filename: e.url || t[0].url,
                function: e.func || "?",
                in_app: !0,
                lineno: e.line
            }
        }).slice(0, vn).reverse()
    }
    var Sn, Cn, En = function() {
            function e(e) {
                this.options = e, this._buffer = new _t(30), this.url = new zt(this.options.dsn).getStoreEndpointWithUrlEncodedAuth()
            }
            return e.prototype.sendEvent = function(e) {
                throw new Ke("Transport Class has to implement `sendEvent` method")
            }, e.prototype.close = function(e) {
                return this._buffer.drain(e)
            }, e
        }(),
        bn = ot(),
        _n = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return Ge(t, e), t.prototype.sendEvent = function(e) {
                var t = {
                    body: JSON.stringify(e),
                    method: "POST",
                    referrerPolicy: Pt() ? "origin" : ""
                };
                return this._buffer.add(bn.fetch(this.url, t).then(function(e) {
                    return {
                        status: qe.fromHttpCode(e.status)
                    }
                }))
            }, t
        }(En),
        Rn = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return Ge(t, e), t.prototype.sendEvent = function(e) {
                var t = this;
                return this._buffer.add(new Promise(function(n, r) {
                    var i = new XMLHttpRequest;
                    i.onreadystatechange = function() {
                        4 === i.readyState && (200 === i.status && n({
                            status: qe.fromHttpCode(i.status)
                        }), r(i))
                    }, i.open("POST", t.url), i.send(JSON.stringify(e))
                }))
            }, t
        }(En),
        Tn = function(e) {
            function t() {
                return null !== e && e.apply(this, arguments) || this
            }
            return Ge(t, e), t.prototype._setupTransport = function() {
                if (!this._options.dsn) return e.prototype._setupTransport.call(this);
                var t = He({}, this._options.transportOptions, {
                    dsn: this._options.dsn
                });
                return this._options.transport ? new this._options.transport(t) : wt() ? new _n(t) : new Rn(t)
            }, t.prototype.eventFromException = function(e, t) {
                var n, r, i = this;
                if (Qe(e) && e.error) return e = e.error, n = gn(fn(e)), Ot.resolve(this._buildEvent(n, t));
                if (Ze(e) || (r = e, "[object DOMException]" === Object.prototype.toString.call(r))) {
                    var o = e,
                        a = o.name || (Ze(o) ? "DOMError" : "DOMException"),
                        s = o.message ? a + ": " + o.message : a;
                    return this.eventFromMessage(s, Je.Error, t).then(function(e) {
                        return lt(e, s), Ot.resolve(i._buildEvent(e, t))
                    })
                }
                if (Ye(e)) return n = gn(fn(e)), Ot.resolve(this._buildEvent(n, t));
                if (nt(e) && t && t.syntheticException) return lt(n = function(e, t) {
                    var n = Object.keys(e).sort(),
                        r = {
                            extra: {
                                __serialized__: yt(e)
                            },
                            message: "Non-Error exception captured with keys: " + xt(n)
                        };
                    if (t) {
                        var i = yn(fn(t).stack);
                        r.stacktrace = {
                            frames: i
                        }
                    }
                    return r
                }(e, t.syntheticException), "Custom Object", void 0, {
                    handled: !0,
                    synthetic: !0,
                    type: "generic"
                }), n.level = Je.Error, Ot.resolve(this._buildEvent(n, t));
                var c = e;
                return this.eventFromMessage(c, void 0, t).then(function(e) {
                    return lt(e, "" + c, void 0, {
                        handled: !0,
                        synthetic: !0,
                        type: "generic"
                    }), e.level = Je.Error, Ot.resolve(i._buildEvent(e, t))
                })
            }, t.prototype._buildEvent = function(e, t) {
                return He({}, e, {
                    event_id: t && t.event_id
                })
            }, t.prototype.eventFromMessage = function(e, t, n) {
                void 0 === t && (t = Je.Info);
                var r = {
                    event_id: n && n.event_id,
                    level: t,
                    message: e
                };
                if (this._options.attachStacktrace && n && n.syntheticException) {
                    var i = yn(fn(n.syntheticException).stack);
                    r.stacktrace = {
                        frames: i
                    }
                }
                return Ot.resolve(r)
            }, t
        }(Zt),
        xn = function(e) {
            function t(t) {
                return void 0 === t && (t = {}), e.call(this, Tn, t) || this
            }
            return Ge(t, e), t.prototype._prepareEvent = function(t, n, r) {
                return t.platform = t.platform || "javascript", t.sdk = He({}, t.sdk, {
                    name: "sentry.javascript.browser",
                    packages: $e(t.sdk && t.sdk.packages || [], [{
                        name: "npm:@sentry/browser",
                        version: "5.6.3"
                    }]),
                    version: "5.6.3"
                }), e.prototype._prepareEvent.call(this, t, n, r)
            }, t.prototype.showReportDialog = function(e) {
                void 0 === e && (e = {});
                var t = ot().document;
                if (t)
                    if (this._isEnabled()) {
                        var n = e.dsn || this.getDsn();
                        if (e.eventId)
                            if (n) {
                                var r = t.createElement("script");
                                r.async = !0, r.src = new zt(n).getReportDialogEndpoint(e), e.onLoad && (r.onload = e.onLoad), (t.head || t.body).appendChild(r)
                            } else ft.error("Missing `Dsn` option in showReportDialog call");
                        else ft.error("Missing `eventId` option in showReportDialog call")
                    } else ft.error("Trying to call showReportDialog with Sentry Client is disabled")
            }, t
        }(Yt),
        kn = 1e3,
        wn = 0;

    function Pn(e, t, n) {
        if (void 0 === t && (t = {}), "function" != typeof e) return e;
        try {
            if (e.__sentry__) return e;
            if (e.__sentry_wrapped__) return e.__sentry_wrapped__
        } catch (t) {
            return e
        }
        var r = function() {
            n && "function" == typeof n && n.apply(this, arguments);
            var r, i = Array.prototype.slice.call(arguments);
            try {
                var o = i.map(function(e) {
                    return Pn(e, t)
                });
                return e.handleEvent ? e.handleEvent.apply(this, o) : e.apply(this, o)
            } catch (e) {
                throw wn += 1, setTimeout(function() {
                    wn -= 1
                }), r = function(n) {
                    n.addEventProcessor(function(e) {
                            var n = He({}, e);
                            return t.mechanism && lt(n, void 0, void 0, t.mechanism), n.extra = He({}, n.extra, {
                                arguments: Et(i, 3)
                            }), n
                        }),
                        function(e) {
                            var t;
                            try {
                                throw new Error("Sentry syntheticException")
                            } catch (e) {
                                t = e
                            }
                            Jt("captureException", e, {
                                originalException: e,
                                syntheticException: t
                            })
                        }(e)
                }, Jt("withScope", r), e
            }
        };
        try {
            for (var i in e) Object.prototype.hasOwnProperty.call(e, i) && (r[i] = e[i])
        } catch (e) {}
        e.prototype = e.prototype || {}, r.prototype = e.prototype, Object.defineProperty(e, "__sentry_wrapped__", {
            enumerable: !1,
            value: r
        }), Object.defineProperties(r, {
            __sentry__: {
                enumerable: !1,
                value: !0
            },
            __sentry_original__: {
                enumerable: !1,
                value: e
            }
        });
        try {
            Object.getOwnPropertyDescriptor(r, "name").configurable && Object.defineProperty(r, "name", {
                get: function() {
                    return e.name
                }
            })
        } catch (e) {}
        return r
    }
    var On = 0;

    function Ln(e, t) {
        return void 0 === t && (t = !1),
            function(n) {
                if (Sn = void 0, n && Cn !== n) {
                    Cn = n;
                    var r = function() {
                        var t;
                        try {
                            t = n.target ? In(n.target) : In(n)
                        } catch (e) {
                            t = "<unknown>"
                        }
                        0 !== t.length && Ut().addBreadcrumb({
                            category: "ui." + e,
                            message: t
                        }, {
                            event: n,
                            name: e
                        })
                    };
                    On && clearTimeout(On), t ? On = setTimeout(r) : r()
                }
            }
    }

    function Mn() {
        return function(e) {
            var t;
            try {
                t = e.target
            } catch (e) {
                return
            }
            var n = t && t.tagName;
            n && ("INPUT" === n || "TEXTAREA" === n || t.isContentEditable) && (Sn || Ln("input")(e), clearTimeout(Sn), Sn = setTimeout(function() {
                Sn = void 0
            }, kn))
        }
    }

    function In(e) {
        for (var t, n = e, r = [], i = 0, o = 0, a = " > ".length; n && i++ < 5 && !("html" === (t = Dn(n)) || i > 1 && o + r.length * a + t.length >= 80);) r.push(t), o += t.length, n = n.parentNode;
        return r.reverse().join(" > ")
    }

    function Dn(e) {
        var t, n, r, i, o, a = [];
        if (!e || !e.tagName) return "";
        if (a.push(e.tagName.toLowerCase()), e.id && a.push("#" + e.id), (t = e.className) && et(t))
            for (n = t.split(/\s+/), o = 0; o < n.length; o++) a.push("." + n[o]);
        var s = ["type", "name", "title", "alt"];
        for (o = 0; o < s.length; o++) r = s[o], (i = e.getAttribute(r)) && a.push("[" + r + '="' + i + '"]');
        return a.join("")
    }
    var jn = function() {
            function e(t) {
                this.name = e.id, this._options = He({
                    onerror: !0,
                    onunhandledrejection: !0
                }, t)
            }
            return e.prototype.setupOnce = function() {
                Error.stackTraceLimit = 50, pn(function(t, n, r) {
                    var i = r && !0 === r.__sentry_own_request__;
                    if (!(wn > 0 || i)) {
                        var o = Ut().getIntegration(e);
                        o && Ut().captureEvent(o._eventFromGlobalHandler(t, r), {
                            data: {
                                stack: t
                            },
                            originalException: r
                        })
                    }
                }), this._options.onerror && (ft.log("Global Handler attached: onerror"), un()), this._options.onunhandledrejection && (ft.log("Global Handler attached: onunhandledrejection"), hn())
            }, e.prototype._eventFromGlobalHandler = function(e, t) {
                if (!et(e.message) && "onunhandledrejection" !== e.mechanism) {
                    var n = e.message;
                    e.message = n.error && et(n.error.message) ? n.error.message : "No error message"
                }
                if ("onunhandledrejection" === e.mechanism && (e.incomplete || "failed" === e.mode)) return this._eventFromIncompleteRejection(e, t);
                var r = gn(e),
                    i = {
                        mode: e.mode
                    };
                e.message && (i.message = e.message), e.name && (i.name = e.name);
                var o = Ut().getClient(),
                    a = o && o.getOptions().maxValueLength || 250;
                return lt(r, e.original ? Rt(JSON.stringify(Et(e.original)), a) : "", "onunhandledrejection" === e.mechanism ? "UnhandledRejection" : "Error", {
                    data: i,
                    handled: !1,
                    type: e.mechanism
                }), r
            }, e.prototype._eventFromIncompleteRejection = function(e, t) {
                var n = {
                    level: Je.Error
                };
                return tt(t) ? n.exception = {
                    values: [{
                        type: "UnhandledRejection",
                        value: "Non-Error promise rejection captured with value: " + t
                    }]
                } : (n.exception = {
                    values: [{
                        type: "UnhandledRejection",
                        value: "Non-Error promise rejection captured with keys: " + xt(Object.keys(t).sort())
                    }]
                }, n.extra = {
                    __serialized__: yt(t)
                }), n.exception.values && n.exception.values[0] && (n.exception.values[0].mechanism = {
                    data: He({
                        mode: e.mode
                    }, e.incomplete && {
                        incomplete: e.incomplete
                    }, e.message && {
                        message: e.message
                    }, e.name && {
                        name: e.name
                    }),
                    handled: !1,
                    type: e.mechanism
                }), n
            }, e.id = "GlobalHandlers", e
        }(),
        An = function() {
            function e() {
                this._ignoreOnError = 0, this.name = e.id
            }
            return e.prototype._wrapTimeFunction = function(e) {
                return function() {
                    for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                    var r = t[0];
                    return t[0] = Pn(r, {
                        mechanism: {
                            data: {
                                function: Nn(e)
                            },
                            handled: !0,
                            type: "instrument"
                        }
                    }), e.apply(this, t)
                }
            }, e.prototype._wrapRAF = function(e) {
                return function(t) {
                    return e(Pn(t, {
                        mechanism: {
                            data: {
                                function: "requestAnimationFrame",
                                handler: Nn(e)
                            },
                            handled: !0,
                            type: "instrument"
                        }
                    }))
                }
            }, e.prototype._wrapEventTarget = function(e) {
                var t = ot(),
                    n = t[e] && t[e].prototype;
                n && n.hasOwnProperty && n.hasOwnProperty("addEventListener") && (mt(n, "addEventListener", function(t) {
                    return function(n, r, i) {
                        try {
                            "function" == typeof r.handleEvent && (r.handleEvent = Pn(r.handleEvent.bind(r), {
                                mechanism: {
                                    data: {
                                        function: "handleEvent",
                                        handler: Nn(r),
                                        target: e
                                    },
                                    handled: !0,
                                    type: "instrument"
                                }
                            }))
                        } catch (e) {}
                        return t.call(this, n, Pn(r, {
                            mechanism: {
                                data: {
                                    function: "addEventListener",
                                    handler: Nn(r),
                                    target: e
                                },
                                handled: !0,
                                type: "instrument"
                            }
                        }), i)
                    }
                }), mt(n, "removeEventListener", function(e) {
                    return function(t, n, r) {
                        var i = n;
                        try {
                            i = i && (i.__sentry_wrapped__ || i)
                        } catch (e) {}
                        return e.call(this, t, i, r)
                    }
                }))
            }, e.prototype.setupOnce = function() {
                this._ignoreOnError = this._ignoreOnError;
                var e = ot();
                mt(e, "setTimeout", this._wrapTimeFunction.bind(this)), mt(e, "setInterval", this._wrapTimeFunction.bind(this)), mt(e, "requestAnimationFrame", this._wrapRAF.bind(this)), ["EventTarget", "Window", "Node", "ApplicationCache", "AudioTrackList", "ChannelMergerNode", "CryptoOperation", "EventSource", "FileReader", "HTMLUnknownElement", "IDBDatabase", "IDBRequest", "IDBTransaction", "KeyOperation", "MediaController", "MessagePort", "ModalWindow", "Notification", "SVGElementInstance", "Screen", "TextTrack", "TextTrackCue", "TextTrackList", "WebSocket", "WebSocketWorker", "Worker", "XMLHttpRequest", "XMLHttpRequestEventTarget", "XMLHttpRequestUpload"].forEach(this._wrapEventTarget.bind(this))
            }, e.id = "TryCatch", e
        }();

    function Nn(e) {
        try {
            return e && e.name || "<anonymous>"
        } catch (e) {
            return "<anonymous>"
        }
    }
    var Fn, Vn = ot(),
        Un = function() {
            function e(t) {
                this.name = e.id, this._options = He({
                    console: !0,
                    dom: !0,
                    fetch: !0,
                    history: !0,
                    sentry: !0,
                    xhr: !0
                }, t)
            }
            return e.prototype._instrumentConsole = function() {
                "console" in Vn && ["debug", "info", "warn", "error", "log", "assert"].forEach(function(t) {
                    t in Vn.console && mt(Vn.console, t, function(n) {
                        return function() {
                            for (var r = [], i = 0; i < arguments.length; i++) r[i] = arguments[i];
                            var o = {
                                category: "console",
                                data: {
                                    extra: {
                                        arguments: Et(r, 3)
                                    },
                                    logger: "console"
                                },
                                level: Je.fromString(t),
                                message: Tt(r, " ")
                            };
                            "assert" === t && !1 === r[0] && (o.message = "Assertion failed: " + (Tt(r.slice(1), " ") || "console.assert"), o.data.extra.arguments = Et(r.slice(1), 3)), e.addBreadcrumb(o, {
                                input: r,
                                level: t
                            }), n && Function.prototype.apply.call(n, Vn.console, r)
                        }
                    })
                })
            }, e.prototype._instrumentDOM = function() {
                "document" in Vn && (Vn.document.addEventListener("click", Ln("click"), !1), Vn.document.addEventListener("keypress", Mn(), !1), ["EventTarget", "Node"].forEach(function(e) {
                    var t = Vn[e] && Vn[e].prototype;
                    t && t.hasOwnProperty && t.hasOwnProperty("addEventListener") && (mt(t, "addEventListener", function(e) {
                        return function(t, n, r) {
                            return n && n.handleEvent ? ("click" === t && mt(n, "handleEvent", function(e) {
                                return function(t) {
                                    return Ln("click")(t), e.call(this, t)
                                }
                            }), "keypress" === t && mt(n, "handleEvent", function(e) {
                                return function(t) {
                                    return Mn()(t), e.call(this, t)
                                }
                            })) : ("click" === t && Ln("click", !0)(this), "keypress" === t && Mn()(this)), e.call(this, t, n, r)
                        }
                    }), mt(t, "removeEventListener", function(e) {
                        return function(t, n, r) {
                            var i = n;
                            try {
                                i = i && (i.__sentry_wrapped__ || i)
                            } catch (e) {}
                            return e.call(this, t, i, r)
                        }
                    }))
                }))
            }, e.prototype._instrumentFetch = function() {
                (function() {
                    if (!wt()) return !1;
                    var e = function(e) {
                            return -1 !== e.toString().indexOf("native")
                        },
                        t = ot(),
                        n = null,
                        r = t.document;
                    if (r) {
                        var i = r.createElement("iframe");
                        i.hidden = !0;
                        try {
                            r.head.appendChild(i), i.contentWindow && i.contentWindow.fetch && (n = e(i.contentWindow.fetch)), r.head.removeChild(i)
                        } catch (e) {
                            ft.warn("Could not create sandbox iframe for pure fetch check, bailing to window.fetch: ", e)
                        }
                    }
                    return null === n && (n = e(t.fetch)), n
                })() && mt(Vn, "fetch", function(t) {
                    return function() {
                        for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                        var i, o = n[0],
                            a = "GET";
                        "string" == typeof o ? i = o : "Request" in Vn && o instanceof Request ? (i = o.url, o.method && (a = o.method)) : i = String(o), n[1] && n[1].method && (a = n[1].method);
                        var s = Ut().getClient(),
                            c = s && s.getDsn();
                        if (c) {
                            var d = new zt(c).getStoreEndpoint();
                            if (d && i.includes(d)) return "POST" === a && n[1] && n[1].body && Bn(n[1].body), t.apply(Vn, n)
                        }
                        var l = {
                            method: et(a) ? a.toUpperCase() : a,
                            url: i
                        };
                        return t.apply(Vn, n).then(function(t) {
                            return l.status_code = t.status, e.addBreadcrumb({
                                category: "fetch",
                                data: l,
                                type: "http"
                            }, {
                                input: n,
                                response: t
                            }), t
                        }).catch(function(t) {
                            throw e.addBreadcrumb({
                                category: "fetch",
                                data: l,
                                level: Je.Error,
                                type: "http"
                            }, {
                                error: t,
                                input: n
                            }), t
                        })
                    }
                })
            }, e.prototype._instrumentHistory = function() {
                var t = this;
                if (n = ot(), r = n.chrome, i = r && r.app && r.app.runtime, o = "history" in n && !!n.history.pushState && !!n.history.replaceState, !i && o) {
                    var n, r, i, o, a = function(t, n) {
                            var r = st(Vn.location.href),
                                i = st(n),
                                o = st(t);
                            o.path || (o = r), Fn = n, r.protocol === i.protocol && r.host === i.host && (n = i.relative), r.protocol === o.protocol && r.host === o.host && (t = o.relative), e.addBreadcrumb({
                                category: "navigation",
                                data: {
                                    from: t,
                                    to: n
                                }
                            })
                        },
                        s = Vn.onpopstate;
                    Vn.onpopstate = function() {
                        for (var e = [], n = 0; n < arguments.length; n++) e[n] = arguments[n];
                        var r = Vn.location.href;
                        if (a(Fn, r), s) return s.apply(t, e)
                    }, mt(Vn.history, "pushState", c), mt(Vn.history, "replaceState", c)
                }

                function c(e) {
                    return function() {
                        for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                        var r = t.length > 2 ? t[2] : void 0;
                        return r && a(Fn, String(r)), e.apply(this, t)
                    }
                }
            }, e.prototype._instrumentXHR = function() {
                if ("XMLHttpRequest" in Vn) {
                    var t = XMLHttpRequest.prototype;
                    mt(t, "open", function(e) {
                        return function() {
                            for (var t = [], n = 0; n < arguments.length; n++) t[n] = arguments[n];
                            var r = t[1];
                            this.__sentry_xhr__ = {
                                method: et(t[0]) ? t[0].toUpperCase() : t[0],
                                url: t[1]
                            };
                            var i = Ut().getClient(),
                                o = i && i.getDsn();
                            if (o) {
                                var a = new zt(o).getStoreEndpoint();
                                et(r) && a && r.includes(a) && (this.__sentry_own_request__ = !0)
                            }
                            return e.apply(this, t)
                        }
                    }), mt(t, "send", function(t) {
                        return function() {
                            for (var n = [], r = 0; r < arguments.length; r++) n[r] = arguments[r];
                            var i = this;

                            function o() {
                                if (4 === i.readyState) {
                                    if (i.__sentry_own_request__) return;
                                    try {
                                        i.__sentry_xhr__ && (i.__sentry_xhr__.status_code = i.status)
                                    } catch (e) {}
                                    e.addBreadcrumb({
                                        category: "xhr",
                                        data: i.__sentry_xhr__,
                                        type: "http"
                                    }, {
                                        xhr: i
                                    })
                                }
                            }
                            return i.__sentry_own_request__ && Bn(n[0]), ["onload", "onerror", "onprogress"].forEach(function(e) {
                                ! function(e, t) {
                                    e in t && "function" == typeof t[e] && mt(t, e, function(t) {
                                        return Pn(t, {
                                            mechanism: {
                                                data: {
                                                    function: e,
                                                    handler: t && t.name || "<anonymous>"
                                                },
                                                handled: !0,
                                                type: "instrument"
                                            }
                                        })
                                    })
                                }(e, i)
                            }), "onreadystatechange" in i && "function" == typeof i.onreadystatechange ? mt(i, "onreadystatechange", function(e) {
                                return Pn(e, {
                                    mechanism: {
                                        data: {
                                            function: "onreadystatechange",
                                            handler: e && e.name || "<anonymous>"
                                        },
                                        handled: !0,
                                        type: "instrument"
                                    }
                                }, o)
                            }) : i.onreadystatechange = o, t.apply(this, n)
                        }
                    })
                }
            }, e.addBreadcrumb = function(t, n) {
                Ut().getIntegration(e) && Ut().addBreadcrumb(t, n)
            }, e.prototype.setupOnce = function() {
                this._options.console && this._instrumentConsole(), this._options.dom && this._instrumentDOM(), this._options.xhr && this._instrumentXHR(), this._options.fetch && this._instrumentFetch(), this._options.history && this._instrumentHistory()
            }, e.id = "Breadcrumbs", e
        }();

    function Bn(e) {
        try {
            var t = JSON.parse(e);
            Un.addBreadcrumb({
                category: "sentry",
                event_id: t.event_id,
                level: t.level || Je.fromString("error"),
                message: ct(t)
            }, {
                event: t
            })
        } catch (e) {
            ft.error("Error while adding sentry type breadcrumb")
        }
    }
    var Gn = "cause",
        Wn = 5,
        Jn = function() {
            function e(t) {
                void 0 === t && (t = {}), this.name = e.id, this._key = t.key || Gn, this._limit = t.limit || Wn
            }
            return e.prototype.setupOnce = function() {
                jt(function(t, n) {
                    var r = Ut().getIntegration(e);
                    return r ? r._handler(t, n) : t
                })
            }, e.prototype._handler = function(e, t) {
                if (!(e.exception && e.exception.values && t && t.originalException instanceof Error)) return e;
                var n = this._walkErrorTree(t.originalException, this._key);
                return e.exception.values = $e(n, e.exception.values), e
            }, e.prototype._walkErrorTree = function(e, t, n) {
                if (void 0 === n && (n = []), !(e[t] instanceof Error) || n.length + 1 >= this._limit) return n;
                var r = mn(fn(e[t]));
                return this._walkErrorTree(e[t], t, $e([r], n))
            }, e.id = "LinkedErrors", e
        }(),
        qn = ot(),
        Hn = function() {
            function e() {
                this.name = e.id
            }
            return e.prototype.setupOnce = function() {
                jt(function(t) {
                    if (Ut().getIntegration(e)) {
                        if (!qn.navigator || !qn.location) return t;
                        var n = t.request || {};
                        return n.url = n.url || qn.location.href, n.headers = n.headers || {}, n.headers["User-Agent"] = qn.navigator.userAgent, He({}, t, {
                            request: n
                        })
                    }
                    return t
                })
            }, e.id = "UserAgent", e
        }(),
        zn = Object.freeze({
            GlobalHandlers: jn,
            TryCatch: An,
            Breadcrumbs: Un,
            LinkedErrors: Jn,
            UserAgent: Hn
        }),
        $n = [new nn, new en, new An, new Un, new jn, new Jn, new Hn];

    function Xn(e) {
        if (void 0 === e && (e = {}), void 0 === e.defaultIntegrations && (e.defaultIntegrations = $n), void 0 === e.release) {
            var t = ot();
            t.SENTRY_RELEASE && t.SENTRY_RELEASE.id && (e.release = t.SENTRY_RELEASE.id)
        }! function(e, t) {
            !0 === t.debug && ft.enable(), Ut().bindClient(new e(t))
        }(xn, e)
    }
    var Kn = {},
        Yn = ot();
    Yn.Sentry && Yn.Sentry.Integrations && (Kn = Yn.Sentry.Integrations);
    He({}, Kn, rn, zn);
    return class {
        constructor({
            config: e,
            listener: t
        }) {
            if (this.version = "2.5.11", this.context = new h, this.context.startTime = new Date, this.context.sentry = e.sentry && (e.sentry.dsn || e.sentry.hasOwnProperty("logSending")) ? {
                    ...u.sentry,
                    ...e.sentry
                } : u.sentry, this.context.sdkVersion = this.version, this.context.logServer = e.logServer && (e.logServer.url || e.logServer.hasOwnProperty("logSending")) ? {
                    ...u.logServer,
                    ...e.logServer
                } : u.logServer, this.context.eventManager = function() {
                    const e = ["onInit", "onConnectChannel", "onCreateChannel", "onComplete", "onConnect", "onDisplayUserMedia", "onAddLocalStream", "onAddRemoteStream", "onStateChange", "onDisconnectChannel", "onMessage", "onError", "onStat", "onSearch", "onClose", "onRoomEvent", "onLog", "onJoin", "onCreate", "onRecordEvent", "onReconnect", "ack"],
                        t = new Map(e.map(e => [e]));
                    return Object.freeze({
                        addEventListener: function({
                            type: n,
                            listenerItem: r
                        }) {
                            if ("function" != typeof r) throw new Error("EventManager:listenerMustBeAFunction");
                            if (!e.includes(n)) throw new Error("EventManager:UnmatchedEvent");
                            t.set(n, r)
                        },
                        hasEventListener: function(n) {
                            if (e.includes(n)) return void 0 !== t.get(n);
                            throw new Error("EventManager:UnmatchedEvent")
                        },
                        removeEventListener: function(n) {
                            if (!e.includes(n) || !t.has(n)) throw new Error("EventManager:UnmatchedEventOrDidNotContainAnylistener");
                            t.set(n, void 0)
                        },
                        getEventListeners: function() {
                            return t
                        },
                        dispatchEvent: function(n, ...r) {
                            if (e.includes(n)) return void 0 === t.get(n) ? void 0 : t.get(n)(...r);
                            throw new Error("EventManager:UnmatchedEvent")
                        }
                    })
                }(), t && Object.keys(t).forEach(e => {
                    const n = t[e];
                    this.context.eventManager.addEventListener({
                        type: e,
                        listenerItem: n
                    })
                }), this.config = c(u, e), this.config.view.localStream = e.view.localStream || void 0, this.context.config = this.config, this.context.sdpSemantics = this.config.rtc && this.config.rtc.sdpSemantics ? this.config.rtc.sdpSemantics : u.rtc.sdpSemantics, this.context.simulcast = this.config.rtc && this.config.rtc.simulcast ? this.config.rtc.simulcast : u.rtc.simulcast, this.context.logLevel = this.config.dev && this.config.dev.logLevel ? this.config.dev.logLevel : "INFO", v.MediaDeviceCheck(this.context, this.config), this.media = new g(this.context), this.context.mediaManager = this.media, this.uri = u.appServer.url, this.key = this.config.credential.key, this.serviceId = this.config.credential.serviceId, this.context.key = this.key, this.context.serviceId = this.serviceId, this.context.state = "INIT", f.init(this.context), this.config.rtc.selectiveCandidate && this.config.rtc.selectiveCandidate.serverUrls && (this.config.rtc.iceServers = c([], this.config.rtc.selectiveCandidate.serverUrls)), this.config.media || (this.config.media = {
                    audio: !0,
                    video: !0,
                    record: !1
                }), this.config.media.record && (this.context.useRecord = this.config.media.record, this.config.media.recordUrl ? this.context.recordUrl = this.config.media.recordUrl : this.context.recordUrl = "https://demo.remotemonster.com/rest/record"), this.config.media.video.codec && (this.context.videoCodec = this.config.media.video.codec), this.config.media.audio.codec && (this.context.audioCodec = this.config.media.audio.codec), !1 === this.config.media.video && (this.context.useVideo = !1), !1 === this.config.media.audio && (this.context.useAudio = !1), this.config.media.video.maxBandwidth && (this.context.videoBandwidth = this.config.media.video.maxBandwidth), this.config.media.audio.maxBandwidth && (this.context.audioBandwidth = this.config.media.audio.maxBandwidth), this.config.credential.resturl && (this.config.credential.resturl = this.config.credential.resturl.replace("/init", ""), u.appServer.url = this.config.credential.resturl, this.uri = u.appServer.url), this.config.credential.wsurl && (this.config.signalingServer.url = this.config.credential.wsurl), this.context.sentry && this.context.sentry.logSending) try {
                Xn({
                    dsn: this.context.sentry.dsn
                })
            } catch (e) {
                f.e("Sentry setting failed:", e.message), f.errorEvt(this.context, "1004", "Sentry setting failed:" + e.message), console.log("error occured! during setting sentry! error message : ", e.message)
            }
        }
        async init() {
            f.d("init is called");
            const e = this,
                t = this.context,
                n = this.config;
            this.context.env = {
                os: p.os.family,
                osVersion: p.os.version || "0",
                device: p.name,
                deviceVersion: p.version || "0",
                networkType: Navigator.connection,
                sdkVersion: e.version
            };
            let r = {
                credential: {
                    key: e.key,
                    serviceId: e.serviceId
                },
                env: this.context.env
            };
            e.config.sdk && e.config.sdk.country && (r.env.country = e.config.sdk.country), e.config.credential.token && (r.credential.token = e.config.credential.token), e.config.media.roomid && (r.id = e.config.media.roomid);
            var i = {
                method: "POST",
                headers: {
                    Accept: "application/json, text/plain, */*",
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(r)
            };
            try {
                var o = await fetch(this.uri + "/init", i),
                    a = await o.json();
                switch (o.status) {
                    case 401:
                        return this.context.eventManager.hasEventListener("onError") && this.context.eventManager.dispatchEvent("onError", "4204", a.Error), !1
                }
            } catch (e) {
                return t.eventManager.hasEventListener("onError") && (t.eventManager.dispatchEvent("onError", "WebSocketFailedError", e), t.eventManager.dispatchEvent("onError", "4201", "initFailedError", e)), f.e("Init: failed:", e), f.errorEvt(t, "1004", "auth init failed:" + e), !1
            }
            f.d("-> Message:", a), Object.keys(a).forEach(n => {
                switch (n) {
                    case "iceServers":
                        e.config.rtc.selectiveCandidate && (!e.config.rtc.selectiveCandidate || "default" !== e.config.rtc.selectiveCandidate.mode && e.config.rtc.selectiveCandidate.serverUrls) || a[n].forEach(t => e.config.rtc.iceServers.push(t));
                        break;
                    case "token":
                        t.token = a[n];
                        break;
                    case "key":
                        t.channel.id = a[n];
                        break;
                    case "name":
                        t.channel.name = a[n];
                        break;
                    case "sigurl":
                        e.config.credential.wsurl || (e.config.signalingServer.url = a[n])
                }
            });
            var s = {
                topic: "log",
                messages: {
                    log: "Peer Id is created : " + t.token,
                    logLevel: "info",
                    os: p.os.family,
                    osVersion: p.os.version || "0",
                    device: p.name,
                    deviceVersion: p.version || "0",
                    networkType: Navigator.connection,
                    sdkVersion: this.version,
                    svcId: t.serviceId,
                    pId: t.token,
                    config: JSON.stringify(t.config),
                    status: "INIT"
                }
            };
            f.evt(JSON.stringify(s)), t.signalingConnection = new A({
                url: this.config.signalingServer.url,
                context: t
            }), t.signalingConnection.connect(), t.signalingConnection.on("reconnect", () => {
                this.onReconnectSignalConnection()
            }), t.signalingConnection.on("disconnect", () => {
                this.onDisconnectSignalConnection(), f.errorEvt(t, "1004", "socket timeout")
            }), window.addEventListener("offline", () => {
                f.i("Browser: offline"), this.context.signalingConnection.onOffline()
            }, !1), "music" === n.rtc.audioType ? n.opt = {
                mandatory: {
                    googHighpassFilter: !1,
                    googEchoCancellation: !1,
                    googEchoCancellation2: !1,
                    googAutoGainControl: !1,
                    googAutoGainControl2: !1,
                    googNoiseSuppression: !1,
                    googNoiseSuppression2: !1,
                    googTypingNoiseDetection: !1,
                    echoCancellation: !1
                },
                optional: [{
                    googCpuOveruseDetection: !1
                }]
            } : n.opt = {
                optional: [{
                    googCpuOveruseDetection: !1
                }]
            };
            const c = {
                ...u.rtc,
                ...n.rtc
            };
            t.peerConnection = new RTCPeerConnection(c, n.opt), t.hasAddTrack = void 0 !== t.peerConnection.addTrack, N({
                context: t,
                media: e.media,
                config: n
            }), E({
                context: t,
                media: e.media,
                config: n
            }), f.i("config", c), n.view && void 0 !== n.view.local && (t.config.rtc.localVideo = document.querySelector(`${n.view.local}`)), n.view && void 0 !== n.view.remote && (t.remoteVideo = document.querySelector(`${n.view.remote}`)), n.media.recvonly && (t.remoteVideo = document.querySelector(`${n.view.remote}`));
            for (let e = 5; e <= 11 && !t.signalingConnection.isOpened(); e++) {
                const t = Math.pow(2, e);
                f.v("wating for init %i", e), await this.wait(t)
            }
            try {
                t.devices = await navigator.mediaDevices.enumerateDevices(), t.currentVideoDeviceId = 0
            } catch (e) {
                console.log(e), f.errorEvt(t, "1007", "failed to get media devices: " + e)
            }
            return !0
        }
        async connectCall(e) {
            f.d("connect is called"), await this.connectChannel(e)
        }
        async connectChannel(e) {
            return f.d("createChannel is called"), this.config.rtc.audioType = "voice", this.context.channel.type = "P2P", this.context.channel.id = e, this.config.credential.key && this.config.credential.serviceId ? await this.init() ? (f.qualityLog({
                type: "quality.start",
                config: this.context.config
            }), void this.context.signalingConnection.connectChannel(e)) : void 0 : (this.context.eventManager.hasEventListener("onError") && this.context.eventManager.dispatchEvent("onError", "4101", "undefinedServiceId Or undefinedServiceKey"), void(this.context.eventManager.hasEventListener("onClose") && this.context.eventManager.dispatchEvent("onClose", {
                message: "undefinedServiceId Or undefinedServiceKey",
                closeType: "UNKNOWN"
            })))
        }
        async createCast(e) {
            f.d("createCast is called"), this.context.channel.type = "BROADCAST", this.config.rtc.audioType || (this.config.rtc.audioType = "music"), this.context.channel.id = e, await this.init(), f.qualityLog({
                type: "quality.start",
                config: this.context.config
            }), this.context.signalingConnection.createBroadcastChannel(e)
        }
        async createRoom(e) {
            f.d(`Remon.js:createRoom(${e})`), this.context.channel.type = "ROOM", await this.init(), f.qualityLog({
                type: "quality.start",
                config: this.context.config
            }), this.context.signalingConnection.createConferenceRoom(e)
        }
        async joinCast(e) {
            f.d("joinCast is called"), this.config.rtc.audioType = "music", this.context.channel.type = "VIEWER", this.context.channel.id = e, this.config.media.recvonly = !0, await this.init(), f.qualityLog({
                type: "quality.start",
                config: this.context.config
            }), "Safari" !== p.name && "safari" !== p.name || await navigator.mediaDevices.getUserMedia({
                audio: !0
            }), this.context.signalingConnection.createViewerChannel(e)
        }
        getHealth() {
            return this.context.health.result
        }
        getState() {
            return this.context.state
        }
        getVersion() {
            return this.version
        }
        getChannelId() {
            return this.context.channel.id
        }
        pauseLocalVideo(e) {
            f.d("pauseLocalVideo is called"), this.media.mediaStreamTrackSwitch(this.context.config.rtc.localStream).type("Video").enabled(!!e)
        }
        pauseRemoteVideo(e) {
            f.d("pauseRemoteVideo is called"), this.media.mediaStreamTrackSwitch(this.context.remoteStream).type("Video").enabled(!!e)
        }
        switchCamera(e) {
            f.d("cameraSwitch is called");
            let t = [];
            this.context.devices.map(e => {
                "videoinput" === e.kind && t.push(e)
            }), this.context.currentVideoDeviceId + 1 === t.length ? this.context.currentVideoDeviceId = 0 : this.context.currentVideoDeviceId++, this.media.setUserDevices(null, t[this.context.currentVideoDeviceId].deviceId)
        }
        setVideoDevice(e) {
            this.media.setUserDevices(null, e)
        }
        setAudioDevice(e) {
            this.media.setUserDevices(e, null)
        }
        muteLocalAudio(e) {
            this.context.audioTransceiver.sender.track.enabled = !e
        }
        async captureScreen(e = 640, t = 480, n = 30, r = !0) {
            this.media.captureScreen(e, t, n)
        }
        stopCaptureScreen() {
            this.media.stopCaptureScreen()
        }
        muteRemoteAudio(e) {
            this.media.mediaStreamTrackSwitch(this.context.remoteStream).type("Audio").enabled(!!e)
        }
        async fetchCalls(e) {
            return await this.search(e)
        }
        async fetchCasts() {
            return await this.liveRooms()
        }
        async fetchRooms(e) {
            return (await this.searchRoom(e)).filter(e => e.id.indexOf(this.context.token) < 0)
        }
        setVideoQuality(e) {
            this.context.signalingConnection.setSimulcastPriority(e)
        }
        reduceVideoQuality() {
            let e = this.context.currentSimulcast;
            if ("HIGH" === e) e = "MIDIUM";
            else {
                if ("MIDIUM" !== e) return;
                e = "LOW"
            }
            this.setVideoQuality(e)
        }
        search(e) {
            f.d("search call by" + e);
            const t = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            return new Promise((e, n) => {
                fetch(this.uri + "/call/" + this.config.credential.serviceId, t).then(t => {
                    t.json().then(t => {
                        this.context.eventManager.hasEventListener("onSearch") && this.context.eventManager.dispatchEvent("onSearch", t), e(t)
                    }).catch(e => {
                        n(e), f.errorEvt(this.context, "1008", "search is  failed:" + e)
                    })
                })
            })
        }
        searchRoom(e) {
            f.d(`Room.js:searchRoom(${e})`);
            const t = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            return new Promise((n, r) => {
                fetch(this.uri + "/rooms/" + this.config.credential.serviceId + "/" + e, t).then(e => {
                    e.json().then(e => {
                        n(e)
                    }).catch(e => {
                        r(e)
                    })
                })
            })
        }
        liveRooms() {
            const e = {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            };
            return new Promise((t, n) => {
                fetch(this.uri + "/room/" + this.config.credential.serviceId, e).then(e => {
                    e.json().then(e => {
                        t(e)
                    }).catch(e => {
                        n(e), f.errorEvt(this.context, "1008", "search is  failed:" + e)
                    })
                })
            })
        }
        sendMessage(e) {
            f.g("Signaling: Send user message");
            const t = this.context.signalingConnection.createMessage({
                command: "message",
                body: e,
                code: ""
            });
            f.d("Message ->:", t), this.context.signalingConnection.send(JSON.stringify(t))
        }
        onReconnectSignalConnection() {
            f.i("event: onReconnectSignalConnection"), this.context.signalingConnection.reconnectChannel()
        }
        onDisconnectSignalConnection() {
            f.i("event: onDisconnectSignalConnection"), this.context.eventManager.hasEventListener("onStateChange") && this.context.eventManager.dispatchEvent("onStateChange", "CLOSE"), this.close("UNKNOWN")
        }
        async close(e) {
            if (f.i("Remon.close: " + this.context.channel.id), this.context.useRecord && this.context.remoteRecorder && (this.context.remoteRecorder.stop(), this.context.remoteRecorder = null), this.context.useRecord && this.context.localRecorder && (this.context.localRecorder.stop(), this.context.localRecorder = null, this.context.useRecord = !1), this.context.remoteVideo && this.context.remoteVideo.srcObject && (this.context.remoteVideo.srcObject.getTracks().forEach(e => e.stop()), this.context.remoteVideo.srcObject = null), this.context.config.rtc.localVideo && this.context.config.rtc.localVideo.srcObject && (this.context.config.rtc.localVideo.srcObject.getTracks().forEach(e => e.stop()), this.context.config.rtc.localVideo.srcObject = void 0), this.context.health && this.context.health.stop(), this.context.signalingConnection && this.context.peerConnection) {
                this.context.hasAddTrack ? this.context.peerConnection.ontrack = null : this.context.peerConnection.onaddstream = null, this.context.peerConnection.onremovestream = null, this.context.peerConnection.onicecandidate = null, this.context.peerConnection.oniceconnectionstatechange = null, this.context.peerConnection.onsignalingstatechange = null, this.context.peerConnection.onicegatheringstatechange = null, this.context.peerConnection.onnegotiationneeded = null, this.context.qualityChecker || (this.context.qualityChecker = new y(this.context), await this.context.qualityChecker.check()), "closed" !== this.context.peerConnection.signalingState && this.context.peerConnection.close(), this.context.peerConnection = null, this.context.signalingConnection.close(), e ? this.context.eventManager.dispatchEvent("onClose", {
                    closeType: e
                }) : this.context.eventManager.dispatchEvent("onClose", {
                    closeType: "MINE"
                });
                var t = {
                    topic: "log",
                    messages: {
                        log: "remon is closed",
                        logLevel: "info",
                        sdkVersion: this.version,
                        svcId: this.context.serviceId,
                        pId: this.context.token,
                        chId: this.context.channel.id,
                        status: "CLOSE"
                    }
                };
                f.evt(JSON.stringify(t))
            }
        }
        wait(e) {
            return new Promise(t => {
                setTimeout(() => {
                    t()
                }, e)
            })
        }
    }
});
