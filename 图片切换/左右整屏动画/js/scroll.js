! function(e) {
    function t(t) {
        var n = t || window.event,
            i = [].slice.call(arguments, 1),
            l = 0,
            s = 0,
            o = 0;
        return t = e.event.fix(n), t.type = "mousewheel", n.wheelDelta && (l = n.wheelDelta / 120), n.detail && (l = -n.detail / 3), o = l, void 0 !== n.axis && n.axis === n.HORIZONTAL_AXIS && (o = 0, s = -1 * l), void 0 !== n.wheelDeltaY && (o = n.wheelDeltaY / 120), void 0 !== n.wheelDeltaX && (s = -1 * n.wheelDeltaX / 120), i.unshift(t, l, s, o), (e.event.dispatch || e.event.handle).apply(this, i)
    }
    var n = ["DOMMouseScroll", "mousewheel"];
    if (e.event.fixHooks)
        for (var i = n.length; i;) e.event.fixHooks[n[--i]] = e.event.mouseHooks;
    e.event.special.mousewheel = {
        setup: function() {
            if (this.addEventListener)
                for (var e = n.length; e;) this.addEventListener(n[--e], t, !1);
            else this.onmousewheel = t
        },
        teardown: function() {
            if (this.removeEventListener)
                for (var e = n.length; e;) this.removeEventListener(n[--e], t, !1);
            else this.onmousewheel = null
        }
    }, e.fn.extend({
        mousewheel: function(e) {
            return e ? this.bind("mousewheel", e) : this.trigger("mousewheel")
        },
        unmousewheel: function(e) {
            return this.unbind("mousewheel", e)
        }
    })
}(jQuery);;
window.Modernizr = function(e, t, n) {
    function r(e) {
        b.cssText = e
    }

    function o(e, t) {
        return r(E.join(e + ";") + (t || ""))
    }

    function i(e, t) {
        return typeof e === t
    }

    function a(e, t) {
        return !!~("" + e).indexOf(t)
    }

    function c(e, t) {
        for (var r in e) {
            var o = e[r];
            if (!a(o, "-") && b[o] !== n) return "pfx" == t ? o : !0
        }
        return !1
    }

    function s(e, t, r) {
        for (var o in e) {
            var a = t[e[o]];
            if (a !== n) return r === !1 ? e[o] : i(a, "function") ? a.bind(r || t) : a
        }
        return !1
    }

    function u(e, t, n) {
        var r = e.charAt(0).toUpperCase() + e.slice(1),
            o = (e + " " + C.join(r + " ") + r).split(" ");
        return i(t, "string") || i(t, "undefined") ? c(o, t) : (o = (e + " " + S.join(r + " ") + r).split(" "), s(o, t, n))
    }

    function l() {
        m.input = function(n) {
            for (var r = 0, o = n.length; o > r; r++) A[n[r]] = n[r] in y;
            return A.list && (A.list = !!t.createElement("datalist") && !!e.HTMLDataListElement), A
        }("autocomplete autofocus list placeholder max min multiple pattern required step".split(" ")), m.inputtypes = function(e) {
            for (var r, o, i, a = 0, c = e.length; c > a; a++) y.setAttribute("type", o = e[a]), r = "text" !== y.type, r && (y.value = w, y.style.cssText = "position:absolute;visibility:hidden;", /^range$/.test(o) && y.style.WebkitAppearance !== n ? (g.appendChild(y), i = t.defaultView, r = i.getComputedStyle && "textfield" !== i.getComputedStyle(y, null).WebkitAppearance && 0 !== y.offsetHeight, g.removeChild(y)) : /^(search|tel)$/.test(o) || (r = /^(url|email)$/.test(o) ? y.checkValidity && y.checkValidity() === !1 : y.value != w)), j[e[a]] = !!r;
            return j
        }("search tel url email datetime date month week time datetime-local number range color".split(" "))
    }
    var f, d, p = "2.6.2",
        m = {},
        g = t.documentElement,
        v = "modernizr",
        h = t.createElement(v),
        b = h.style,
        y = t.createElement("input"),
        w = ":)",
        x = {}.toString,
        E = " -webkit- -moz- -o- -ms- ".split(" "),
        k = "Webkit Moz O ms",
        C = k.split(" "),
        S = k.toLowerCase().split(" "),
        T = {
            svg: "http://www.w3.org/2000/svg"
        },
        P = {},
        j = {},
        A = {},
        $ = [],
        z = $.slice,
        N = function(e, n, r, o) {
            var i, a, c, s, u = t.createElement("div"),
                l = t.body,
                f = l || t.createElement("body");
            if (parseInt(r, 10))
                for (; r--;) c = t.createElement("div"), c.id = o ? o[r] : v + (r + 1), u.appendChild(c);
            return i = ["?", '<style id="s', v, '">', e, "</style>"].join(""), u.id = v, (l ? u : f).innerHTML += i, f.appendChild(u), l || (f.style.background = "", f.style.overflow = "hidden", s = g.style.overflow, g.style.overflow = "hidden", g.appendChild(f)), a = n(u, e), l ? u.parentNode.removeChild(u) : (f.parentNode.removeChild(f), g.style.overflow = s), !!a
        },
        I = function() {
            function e(e, o) {
                o = o || t.createElement(r[e] || "div"), e = "on" + e;
                var a = e in o;
                return a || (o.setAttribute || (o = t.createElement("div")), o.setAttribute && o.removeAttribute && (o.setAttribute(e, ""), a = i(o[e], "function"), i(o[e], "undefined") || (o[e] = n), o.removeAttribute(e))), o = null, a
            }
            var r = {
                select: "input",
                change: "input",
                submit: "form",
                reset: "form",
                error: "img",
                load: "img",
                abort: "img"
            };
            return e
        }(),
        L = {}.hasOwnProperty;
    d = i(L, "undefined") || i(L.call, "undefined") ? function(e, t) {
        return t in e && i(e.constructor.prototype[t], "undefined")
    } : function(e, t) {
        return L.call(e, t)
    }, Function.prototype.bind || (Function.prototype.bind = function(e) {
        var t = this;
        if ("function" != typeof t) throw new TypeError;
        var n = z.call(arguments, 1),
            r = function() {
                if (this instanceof r) {
                    var o = function() {};
                    o.prototype = t.prototype;
                    var i = new o,
                        a = t.apply(i, n.concat(z.call(arguments)));
                    return Object(a) === a ? a : i
                }
                return t.apply(e, n.concat(z.call(arguments)))
            };
        return r
    }), P.flexbox = function() {
        return u("flexWrap")
    }, P.flexboxlegacy = function() {
        return u("boxDirection")
    }, P.canvas = function() {
        var e = t.createElement("canvas");
        return !!e.getContext && !!e.getContext("2d")
    }, P.canvastext = function() {
        return !!m.canvas && !!i(t.createElement("canvas").getContext("2d").fillText, "function")
    }, P.webgl = function() {
        return !!e.WebGLRenderingContext
    }, P.touch = function() {
        var n;
        return "ontouchstart" in e || e.DocumentTouch && t instanceof DocumentTouch ? n = !0 : N(["@media (", E.join("touch-enabled),("), v, ")", "{#modernizr{top:9px;position:absolute}}"].join(""), function(e) {
            n = 9 === e.offsetTop
        }), n
    }, P.geolocation = function() {
        return "geolocation" in navigator
    }, P.postmessage = function() {
        return !!e.postMessage
    }, P.websqldatabase = function() {
        return !!e.openDatabase
    }, P.indexedDB = function() {
        return !!u("indexedDB", e)
    }, P.hashchange = function() {
        return I("hashchange", e) && (t.documentMode === n || t.documentMode > 7)
    }, P.history = function() {
        return !!e.history && !!history.pushState
    }, P.draganddrop = function() {
        var e = t.createElement("div");
        return "draggable" in e || "ondragstart" in e && "ondrop" in e
    }, P.websockets = function() {
        return "WebSocket" in e || "MozWebSocket" in e
    }, P.rgba = function() {
        return r("background-color:rgba(150,255,150,.5)"), a(b.backgroundColor, "rgba")
    }, P.hsla = function() {
        return r("background-color:hsla(120,40%,100%,.5)"), a(b.backgroundColor, "rgba") || a(b.backgroundColor, "hsla")
    }, P.multiplebgs = function() {
        return r("background:url(https://),url(https://),red url(https://)"), /(url\s*\(.*?){3}/.test(b.background)
    }, P.backgroundsize = function() {
        return u("backgroundSize")
    }, P.borderimage = function() {
        return u("borderImage")
    }, P.borderradius = function() {
        return u("borderRadius")
    }, P.boxshadow = function() {
        return u("boxShadow")
    }, P.textshadow = function() {
        return "" === t.createElement("div").style.textShadow
    }, P.opacity = function() {
        return o("opacity:.55"), /^0.55$/.test(b.opacity)
    }, P.cssanimations = function() {
        return u("animationName")
    }, P.csscolumns = function() {
        return u("columnCount")
    }, P.cssgradients = function() {
        var e = "background-image:",
            t = "gradient(linear,left top,right bottom,from(#9f9),to(white));",
            n = "linear-gradient(left top,#9f9, white);";
        return r((e + "-webkit- ".split(" ").join(t + e) + E.join(n + e)).slice(0, -e.length)), a(b.backgroundImage, "gradient")
    }, P.cssreflections = function() {
        return u("boxReflect")
    }, P.csstransforms = function() {
        return !!u("transform")
    }, P.csstransforms3d = function() {
        var e = !!u("perspective");
        return e && "webkitPerspective" in g.style && N("@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}", function(t) {
            e = 9 === t.offsetLeft && 3 === t.offsetHeight
        }), e
    }, P.csstransitions = function() {
        return u("transition")
    }, P.fontface = function() {
        var e;
        return N('@font-face {font-family:"font";src:url("https://")}', function(n, r) {
            var o = t.getElementById("smodernizr"),
                i = o.sheet || o.styleSheet,
                a = i ? i.cssRules && i.cssRules[0] ? i.cssRules[0].cssText : i.cssText || "" : "";
            e = /src/i.test(a) && 0 === a.indexOf(r.split(" ")[0])
        }), e
    }, P.generatedcontent = function() {
        var e;
        return N(["#", v, "{font:0/0 a}#", v, ':after{content:"', w, '";visibility:hidden;font:3px/1 a}'].join(""), function(t) {
            e = t.offsetHeight >= 3
        }), e
    }, P.video = function() {
        var e = t.createElement("video"),
            n = !1;
        try {
            (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('video/ogg; codecs="theora"').replace(/^no$/, ""), n.h264 = e.canPlayType('video/mp4; codecs="avc1.42E01E"').replace(/^no$/, ""), n.webm = e.canPlayType('video/webm; codecs="vp8, vorbis"').replace(/^no$/, ""))
        } catch (r) {}
        return n
    }, P.audio = function() {
        var e = t.createElement("audio"),
            n = !1;
        try {
            (n = !!e.canPlayType) && (n = new Boolean(n), n.ogg = e.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/, ""), n.mp3 = e.canPlayType("audio/mpeg;").replace(/^no$/, ""), n.wav = e.canPlayType('audio/wav; codecs="1"').replace(/^no$/, ""), n.m4a = (e.canPlayType("audio/x-m4a;") || e.canPlayType("audio/aac;")).replace(/^no$/, ""))
        } catch (r) {}
        return n
    }, P.localstorage = function() {
        try {
            return localStorage.setItem(v, v), localStorage.removeItem(v), !0
        } catch (e) {
            return !1
        }
    }, P.sessionstorage = function() {
        try {
            return sessionStorage.setItem(v, v), sessionStorage.removeItem(v), !0
        } catch (e) {
            return !1
        }
    }, P.webworkers = function() {
        return !!e.Worker
    }, P.applicationcache = function() {
        return !!e.applicationCache
    }, P.svg = function() {
        return !!t.createElementNS && !!t.createElementNS(T.svg, "svg").createSVGRect
    }, P.inlinesvg = function() {
        var e = t.createElement("div");
        return e.innerHTML = "<svg/>", (e.firstChild && e.firstChild.namespaceURI) == T.svg
    }, P.smil = function() {
        return !!t.createElementNS && /SVGAnimate/.test(x.call(t.createElementNS(T.svg, "animate")))
    }, P.svgclippaths = function() {
        return !!t.createElementNS && /SVGClipPath/.test(x.call(t.createElementNS(T.svg, "clipPath")))
    };
    for (var M in P) d(P, M) && (f = M.toLowerCase(), m[f] = P[M](), $.push((m[f] ? "" : "no-") + f));
    return m.input || l(), m.addTest = function(e, t) {
        if ("object" == typeof e)
            for (var r in e) d(e, r) && m.addTest(r, e[r]);
        else {
            if (e = e.toLowerCase(), m[e] !== n) return m;
            t = "function" == typeof t ? t() : t, "undefined" != typeof enableClasses && enableClasses && (g.className += " " + (t ? "" : "no-") + e), m[e] = t
        }
        return m
    }, r(""), h = y = null, m._version = p, m._prefixes = E, m._domPrefixes = S, m._cssomPrefixes = C, m.hasEvent = I, m.testProp = function(e) {
        return c([e])
    }, m.testAllProps = u, m.testStyles = N, m
}(this, this.document);;

function tabVideo_d(o, e) {
    nie.util.video($(e), {
        movieUrl: avideo_f4v[o],
        mp4_movieUrl: avideo_mp4[o],
        width: 780,
        height: 330,
        bufferTime: 5,
        loopTimes: 0,
        wmode: "opaque",
        volume: .8,
        autoPlay: !0
    })
}

function tabVideo_d2(o, e, i, t) {
    $(e).css({
        height: t + 22 + "px",
        width: i + 22 + "px"
    }), $("#dialogBox_31 .dVideo").css({
        height: t + "px",
        width: i + "px"
    }), nie.util.video($(e), {
        movieUrl: bvideo_f4v[o],
        mp4_movieUrl: bvideo_f4v[o].replace(/\.(flv|f4v)/, ".mp4"),
        width: i,
        height: t,
        bufferTime: 5,
        loopTimes: 0,
        wmode: "opaque",
        volume: .8,
        autoPlay: !0
    })
}

function adjustTabVideo(o, e, i, t) {
    $(e).css({
        height: t + 22 + "px",
        width: i + 22 + "px"
    }), $("#dialogBox_31 .dVideo").css({
        height: t + "px",
        width: i + "px"
    })
}
var bvideo_img = ["http://res.tx3.netease.com/qt/13/0607_fab/images/pic/mbpic.jpg"],
    bvideo_f4v = ["http://v.em.netease.com/2014/1216/em.mp4", "http://v.em.netease.com/2014/0728/part1.f4v", "http://v.em.netease.com/2014/0728/part2.f4v", "http://v.em.netease.com/2014/0728/part3.f4v", "http://v.em.netease.com/2014/0728/part4.f4v", "http://v.em.netease.com/2014/0728/part5.f4v"],
    bvideo_mp4 = ["http://v.em.netease.com/2014/0728/home.mp4", "http://v.em.netease.com/2014/0728/part1.mp4", "http://v.em.netease.com/2014/0728/part2.mp4", "http://v.em.netease.com/2014/0728/part3.mp4", "http://v.em.netease.com/2014/0728/part4.mp4", "http://v.em.netease.com/2014/0728/part5.mp4"],
    bvideo_thumb = ["http://v.tx3.netease.com/2014/0520/changjing.mp4"];
document.scroll = "none";
var autoplay, autoplay2, autoplaycount1 = 2,
    autoplaycount2 = 2;
$(function() {
    var o = 0;
    $(".fbnews").css({
        width: 316,
        height: 265
    }), $(".news .alterover").click(function() {
        0 == o && ($(".fbnews .fbnewsC").css({
            display: "none"
        }), $(".fbnews").css({
            background: "none"
        }), o = 2, $(".fbnews").animate({
            width: 81,
            height: 50
        }, 200, function() {
            $(".news .beforeover").css({
                display: "block"
            }), $(".news .alterover").css({
                display: "none"
            }), o = 1
        }))
    }), $(".fixboxClose").click(function() {
        $(".news .alterover").trigger("click")
    }), $(".news .alterover").trigger("click"), $(".news .beforeover").click(function() {
        1 == o && (o = 2, $(".fbnews .fbnewsC").css({
            display: "block"
        }), $(".fbnews").css({
            background: "#212427"
        }), $(".news .beforeover").css({
            display: "none"
        }), $(".news .alterover").css({
            display: "block"
        }), $(".fbnews").animate({
            width: 316,
            height: 265
        }, 200, function() {
            o = 0
        }))
    });
    var e = 0;
    $(".fbhd").css({
        width: 241,
        height: 189
    }), $(".hd .alterover").click(function() {
        0 == e && ($(".fbhd .hd_change").css({
            display: "none"
        }), $(".fbhd").css({
            background: "none"
        }), e = 2, $(".fbhd").animate({
            width: 81,
            height: 50
        }, 200, function() {
            $(".hd .beforeover").css({
                display: "block"
            }), $(".hd .alterover").css({
                display: "none"
            }), e = 1
        }))
    }), $(".hd .beforeover").hide(), $(".hd .beforeover").click(function() {
        1 == e && (e = 2, $(".fbhd .hd_change").css({
            display: "block"
        }), $(".fbhd").css({
            background: "#212427"
        }), $(".hd .beforeover").css({
            display: "none"
        }), $(".hd .alterover").css({
            display: "block"
        }), $(".fbhd").animate({
            width: 241,
            height: 189
        }, 200, function() {
            e = 0
        }))
    }), $(".fbmideo").mouseover(function() {
        $(".fbmideo .beforeover").css("display", "none").siblings().css("display", "block"), $(".fbmideo").stop(), $(".fbmideo").animate({
            width: 440
        }, 200)
    }), $(".fbmideo").mouseout(function() {
        $(".fbmideo").stop(), $(".fbmideo").animate({
            width: 81
        }, 200, function() {
            $(".fbmideo .beforeover").css("display", "block").siblings().css("display", "none")
        })
    }), $(".yixin").mouseover(function() {
        $(".yixinhoverbox").css("display", "block")
    }), $(".yixin").mouseout(function() {
        $(".yixinhoverbox").css("display", "none")
    }), $(".weixin").mouseover(function() {
        $(".yixinhoverbox2").css("display", "block")
    }), $(".weixin").mouseout(function() {
        $(".yixinhoverbox2").css("display", "none")
    })
});
var comFunc = {
        openDialog: function(o) {
            $(".dialogBox").hide(), $(".dVideo").html(""), $("#NIE-topBar").css("z-index", 98);
            var e = $(".dialogBg");
            e.length < 1 && ($("body").append('<div class="dialogBg"></div>'), e = $(".dialogBg"));
            var i = $(o);
            e.show().css("height", $(document).height()), i.show().css({
                top: ($(window).height() - i.height()) / 2 + $(window).scrollTop(),
                left: ($(window).width() - i.outerWidth()) / 2
            }), i.find(".aClose").click(function() {
                e.hide(), $(".dVideo").html(""), i.hide()
            })
        },
        closeDialog: function(o) {
            $(".dialogBg").hide(), $(o).fadeOut(), $(".dVideo").html("")
        }
    },
    PopupTabVideoInfo = [],
    $wrapVideo = $("#dialogBox_31");
$(window).bind("resize", function() {
    if ("none" !== $wrapVideo.css("display")) {
        var o = $(window).width(),
            e = $(window).height(),
            i = $wrapVideo.width(),
            t = $wrapVideo.height();
        $wrapVideo.css({
            left: (o - i) / 2 + "px",
            top: (e - t) / 2 + "px"
        })
    }
}), i = 0, bvideo_f4v && ($("#role1").click(function() {
    $(".dVideotitle").text("超霸道直线攻防手游"), nie.use(["nie.util.video"], function() {
        comFunc.openDialog("#dialogBox_31"), tabVideo_d2(0, "#dialogBox_31 .dVideo", 657, 365), PopupTabVideoInfo = [0, "#dialogBox_31 .dVideo", 657, 365]
    })
}), $("#role21").click(function() {
    $(".dVideotitle").text("多元攻防体系"), nie.use(["nie.util.video"], function() {
        comFunc.openDialog("#dialogBox_31"), tabVideo_d2(2, "#dialogBox_31 .dVideo", 657, 365), PopupTabVideoInfo = [2, "#dialogBox_31 .dVideo", 657, 365]
    })
}), $("#role22").click(function() {
    $(".dVideotitle").text("强敌怪诞入侵"), nie.use(["nie.util.video"], function() {
        comFunc.openDialog("#dialogBox_31"), tabVideo_d2(1, "#dialogBox_31 .dVideo", 657, 365), PopupTabVideoInfo = [1, "#dialogBox_31 .dVideo", 657, 365]
    })
}), $("#role23").click(function() {
    $(".dVideotitle").text("多元攻防体系"), nie.use(["nie.util.video"], function() {
        comFunc.openDialog("#dialogBox_31"), tabVideo_d2(2, "#dialogBox_31 .dVideo", 657, 365), PopupTabVideoInfo = [2, "#dialogBox_31 .dVideo", 657, 365]
    })
}), $("#role3").click(function() {
    $(".dVideotitle").text("排兵布阵"), nie.use(["nie.util.video"], function() {
        comFunc.openDialog("#dialogBox_31"), tabVideo_d2(4, "#dialogBox_31 .dVideo", 657, 365), PopupTabVideoInfo = [4, "#dialogBox_31 .dVideo", 657, 365]
    })
}), $("#role41").click(function() {
    $(".dVideotitle").text("萌宠养成系统"), nie.use(["nie.util.video"], function() {
        comFunc.openDialog("#dialogBox_31"), tabVideo_d2(3, "#dialogBox_31 .dVideo", 657, 365), PopupTabVideoInfo = [3, "#dialogBox_31 .dVideo", 657, 365]
    })
}), $("#role42").click(function() {
    $(".dVideotitle").text("全屏大招"), nie.use(["nie.util.video"], function() {
        comFunc.openDialog("#dialogBox_31"), tabVideo_d2(4, "#dialogBox_31 .dVideo", 657, 365), PopupTabVideoInfo = [4, "#dialogBox_31 .dVideo", 657, 365]
    })
}), $("#role5").click(function() {
    $(".dVideotitle").text("攻防社交"), nie.use(["nie.util.video"], function() {
        comFunc.openDialog("#dialogBox_31"), tabVideo_d2(5, "#dialogBox_31 .dVideo", 657, 365), PopupTabVideoInfo = [5, "#dialogBox_31 .dVideo", 657, 365]
    })
})), window.onscroll = function() {
    var o = $(".fixbox"); - 1 != window.navigator.userAgent.indexOf("MSIE 6") && o.css({
        top: document.documentElement.scrollTop + 100
    })
}, window.onresize = function() {
    var o = $(".dialogBox");
    o.css({
        top: ($(window).height() - o.height()) / 2 + $(window).scrollTop(),
        left: ($(window).width() - o.outerWidth()) / 2
    });
    var o = $(".bdialogBoxF");
    o.css({
        top: ($(window).height() - o.height()) / 2 + $(window).scrollTop(),
        left: ($(window).width() - o.outerWidth()) / 2
    });
    var o = $(".dialog");
    o.css({
        left: ($(window).width() - o.outerWidth()) / 2
    })
}, $(function() {
    function o() {
        d = Math.max(0, i.height() - 720), "fixed" == n && t.css({
            bottom: d
        })
    }

    function e() {//控制页面显示在一屏以内
//        var o = $(window).height();
//        if (o > s + h + r) a.height(s), l.height(s), a.removeClass("lowView");
//        else if (c + h + r > o) a.height(c), l.height(c), a.addClass("lowView");
//        else {
//            var e = o - h - r;
//            a.height(e), l.height(e), 710 > e ? a.addClass("lowView") : a.removeClass("lowView")
//        }
    }
    var i = $(window),
        t = ($(document).height(), $(".fixbox")),
        n = (t.height(), "fixed"),
        d = 0;
    $(document).scroll(function() {
        var o = i.scrollTop(),
            e = i.height();
        o + e > 1080 + d ? "fixed" == n && (n = "bot", t.css({
            position: "absolute",
            top: 700,
            bottom: "auto"
        })) : "bot" == n && (n = "fixed", t.css({
            position: "fixed",
            top: "auto",
            bottom: d
        }))
    });
    var s = 902,
        c = 685,
        a = $(".wrapper"),
        l = $(".box"),
        h = 55,
        r = 110;
    $(window).resize(function() {
        o(), e()
    }), o(), e()
})

function parallax() {
    function t(t, e) {
        var i = t.hasClass(f);
        this.$src = t, this.prnt = e, this.spd = +t.attr("alt"), i && t.css("min-height", "100%");
        var n, s, r, a, o, l, d = 1 - this.spd,
            c = this.spd - 1,
            h = 0;
        return this.applyWindowSize = function() {
            if (i) {
                tps.horizonMoving("", t), t.css({
                    width: ""
                });
                var d = navigator.userAgent.indexOf("Opera") > -1;
                d || t.css({
                    position: ""
                })
            } else t.attr("style", ""); if (n = p / 2, s = this.prnt.width / 2, i) {
                this.width = t.width();
                var c = this.spd * (this.prnt.prnt.width - p) + p;
                this.width < c && (this.width = c)
            } else t.css("position", "absolute"), this.width = t.attr("data-w"), t.css("position", "");
            a = this.width / 2, l = e.width - this.width, o = this.spd <= 1 && this.width < this.prnt.width, this.overflowsParent = i || !o, this.$src.css("left", "");
            t.css("left");
            t.css({
                display: "inline-block",
                position: "absolute"
            }), this.left = s - a, this.$src.css("left", "0px"), r = 0 == this.spd ? n - a : this.spd > 0 && this.spd < 1 ? (n - a) * (1 - this.spd) + this.left * this.spd : this.left
        }, this.parallaxLeft = function(t) {
            return this.currentLeft = 0 == this.spd ? r + t : this.spd > 0 && this.spd < 1 ? r + t * d : r - t * c, this.currentLeft
        }, this.adjust = function(t) {
            var e = this.parallaxLeft(t);
            if (!this.overflowsParent) {
                var i = h,
                    n = l;
                i > e ? e = i : e > n && (e = n)
            }
            tps.horizonMoving(e, this.$src)
        }, this
    }

    function e(e, i, n) {
        this.masterSlide = i, this.layers = [], this.$src = e, this.initialLeft = 0, this.left = 0, this.width = 0, this.$axis = {}, this.prnt = n;
        var s, r = this.$src.children();
        this.childrenVisible = !0, this.adjust = function() {
            this.left = this.initialLeft - this.prnt.$src.scroll;
            var t = this.left + this.width,
                e = this.left < 0 && 0 > t,
                i = this.left > s && t > s;
            if (e || i) this.childrenVisible && (this.childrenVisible = !1);
            else {
                this.childrenVisible || (this.childrenVisible = !0);
                for (var n = -this.left, r = 0, a = this.layers[0], o = this.layers.length; o > r; r++, a = this.layers[r]) a.adjust(n)
            }
        };
        var a = this;
        return this.applyWindowSize = function() {
            s = p, this.$src.css("display", ""), i ? (this.width = this.prnt.width, this.initialLeft = 0) : (this.width = p, this.initialLeft = this.prnt.width, this.$src.css("width", this.width))
        }, this.applyWindowSize(), this.applyWindowSizeToChildren = function() {
            r.show();
            for (var t = 0, e = a.layers.length; e > t; t++) a.layers[t].applyWindowSize()
        }, this.initChildren = function() {
            var e;
            e = i ? this.$src.children("[alt]") : $("*[alt]", this.$src), r.show(), e.each(function() {
                var e = $(this);
                if ("1" == e.attr("alt")) e.css({
                    position: "absolute"
                }), a.$axis = e;
                else {
                    var i = new t(e, a);
                    a.layers.push(i)
                }
            })
        }, this.initChildren(), this
    }

    function i() {
        g.$src = $("#" + u), g.$src.scroll = 0, n(), s(), r(), c(), this.onInit()
    }

    function n() {
        window.innerWidth ? p = window.innerWidth : document.body && document.body.clientWidth && (p = document.body.clientWidth), g.array = [], g.$src.find("> div").each(function() {
            var t = $(this);
            if (!t.attr("alt")) {
                var i = new e(t, !1, g);
                g.array.push(i)
            }
        }), v.slidesCount = g.array.length;
        var t = new e(g.$src, !0, g);
        g.array.push(t)
    }

    function s() {
        window.innerWidth ? p = window.innerWidth : document.body && document.body.clientWidth && (p = document.body.clientWidth), g.singleSlideWidth = p, m.minimalStep = p / 1e3 / 15, g.width = 0;
        for (var t = 0, e = g.array.length; e > t; t++) {
            var i = g.array[t];
            i.applyWindowSize(), i.masterSlide || (g.width += i.width)
        }
        g.$src.width(g.width), m.maxLimit = g.width - p, a()
    }

    function r() {
        for (var t = 0, e = g.array[t]; t < g.array.length; t++, e = g.array[t]) e.applyWindowSizeToChildren()
    }

    function a() {
        m.get = function() {
            return m.cur
        }, m.add = function(t) {
            var e = Number(m.cur) + t;
            0 > e ? e = 0 : e > m.maxLimit && (e = m.maxLimit), m.cur = e, l()
        }, v.add = m.add
    }

    function o() {
        for (y = m.cur / g.singleSlideWidth; w - 1 >= y;) v.currentSlideI--, w = v.currentSlideI;
        for (; y >= w + 1;) v.currentSlideI++, w = v.currentSlideI;
        switch (parseInt(v.currentSlideI)) {
            case 0:
                0 == b[0] && (k.$node1.removeClass("on"), k.$node2.addClass("on"), "block" === $beforeoverHd.css("display") && $beforeoverHd.trigger("click"), "block" === $alteroverHd2.css("display") && $alteroverHd2.trigger("click")), b[5] = 0, b[4] = 0, b[3] = 0, b[2] = 0, b[1] = 0, b[0] = 1;
                break;
            case 1:
                0 == b[1] && (k.$node1.removeClass("on"), k.$node3.addClass("on"), "block" === $alteroverHd.css("display") && $alteroverHd.trigger("click"), "block" === $alteroverHd2.css("display") && $alteroverHd2.trigger("click")), b[5] = 0, b[4] = 0, b[3] = 0, b[2] = 0, b[1] = 1, b[0] = 0;
                break;
            case 2:
                0 == b[2] && (k.$node1.removeClass("on"), k.$node4.addClass("on"), "block" === $alteroverHd.css("display") && $alteroverHd.trigger("click"), "block" === $alteroverHd2.css("display") && $alteroverHd2.trigger("click")), b[5] = 0, b[4] = 0, b[3] = 0, b[2] = 1, b[1] = 0, b[0] = 0;
                break;
            case 3:
                0 == b[3] && (k.$node1.removeClass("on"), k.$node5.addClass("on"), "block" === $alteroverHd.css("display") && $alteroverHd.trigger("click"), "block" === $alteroverHd2.css("display") && $alteroverHd2.trigger("click")), b[5] = 0, b[4] = 0, b[3] = 1, b[2] = 0, b[1] = 0, b[0] = 0;
                break;
            case 4:
                0 == b[4] && (k.$node1.removeClass("on"), k.$node6.addClass("on"), "block" === $alteroverHd.css("display") && $alteroverHd.trigger("click"), "block" === $alteroverHd2.css("display") && $alteroverHd2.trigger("click")), b[5] = 0, b[4] = 1, b[3] = 0, b[2] = 0, b[1] = 0, b[0] = 0;
				break;
			case 5:
                0 == b[5] && (k.$node1.removeClass("on"), k.$node7.addClass("on"), "block" === $alteroverHd.css("display") && $alteroverHd.trigger("click"), "block" === $alteroverHd2.css("display") && $alteroverHd2.trigger("click")), b[5] = 1, b[4] = 0, b[3] = 0, b[2] = 0, b[1] = 0, b[0] = 0
        }
    }

    function l() {
        m.cur = m.get(), m.delta = Math.abs(g.$src.scroll - m.cur), m.doingNextMove = !0, _ || (_ = setInterval(d, 17)), o()
    }

    function d() {
        S = (m.cur - g.$src.scroll) / 15, Math.abs(S) > m.minimalStep ? (g.$src.scroll += S, c()) : m.doingNextMove && (m.doingNextMove = !1)
    }

    function c() {
        tps.horizonMoving(-g.$src.scroll, g.$src);
        for (var t = 0, e = g.array[0], i = g.array.length; i > t; t++, e = g.array[t]) e.adjust()
    }

    function h(t) {
        var e = m.get(),
            i = t ? Math.floor : Math.ceil,
            n = i(e / g.singleSlideWidth);
        e % g.singleSlideWidth == 0 && (n += t ? -1 : 1), $("#d" + (n + 1)).trigger("click")
    }
    var u = "parallax",
        f = "parallaxBackground";
    this.onInit = function() {};
    var p, v = this,
        g = {
            $src: void 0,
            screen: [],
            array: [],
            img: [],
            singleSlideWidth: 0
        },
        m = {
            cur: 0,
            minimalStep: 0
        };
    this.currentSlideI = 0, this.mouseWheelTarget = $("#" + u), this.init = i;
    var w = 0,
        y = 0,
        b = [0, 0, 0, 0, 0, 0],
        k = {
            $node1: $(".bot_nav ul a"),
            $node2: $("#d1 a"),
            $node3: $("#d2 a"),
            $node4: $("#d3 a"),
            $node5: $("#d4 a"),
            $node6: $("#d5 a"),
			$node7: $("#d6 a")
        };
    $("#d1").click(function() {
        dest = 0 * g.singleSlideWidth, v.to(dest), setTimeout(function() {
            k.$node1.removeClass("on"), k.$node2.addClass("on")
        }, 1)
    }), $("#d2").click(function() {
        dest = 1 * g.singleSlideWidth, v.to(dest), setTimeout(function() {
            k.$node1.removeClass("on"), k.$node3.addClass("on")
        }, 1)
    }), $("#d3").click(function() {
        dest = 2 * g.singleSlideWidth, v.to(dest), setTimeout(function() {
            k.$node1.removeClass("on"), k.$node4.addClass("on")
        }, 1)
    }), $("#d4").click(function() {
        dest = 3 * g.singleSlideWidth, v.to(dest), setTimeout(function() {
            k.$node1.removeClass("on"), k.$node5.addClass("on")
        }, 1)
    }), $("#d5").click(function() {
        dest = 4 * g.singleSlideWidth, v.to(dest), setTimeout(function() {
            k.$node1.removeClass("on"), k.$node6.addClass("on")
        }, 1)
    }), $("#d6").click(function() {
        dest = 5 * g.singleSlideWidth, v.to(dest), setTimeout(function() {
            k.$node1.removeClass("on"), k.$node7.addClass("on")
        }, 1)
    });
    var _, S;
    this.to = function(t) {
        m.add(t - m.get())
    }, this.closerLeft = function() {
        h(!0)
    }, this.closerRight = function() {
        h(!1)
    };
    var q, x;
    this.onResizeSlides = function() {
        q = m.get(), x = q / p, s()
    }, this.onResizeLayers = function() {
        r(), c();
        var t = x * p;
        m.add(t - m.get())
    }
}

function wheelStep() {
    var t = 15;
    return window.innerWidth ? winWidth = window.innerWidth : document.body && document.body.clientWidth && (winWidth = document.body.clientWidth), winWidth / t
}

function onMouseWheel(t, e) {
    wheelstep = wheelStep(), tpsParallax.add(-e * Setting.scrollSpeed * wheelstep), t.preventDefault(), t.stopPropagation()
}

function _fade(t, e, i, n, s) {
    var t = $(t),
        e = $(e),
        i = $(i),
        r = t.length,
        a = 0,
        n = n;
    t.css({
        opacity: 0,
        "z-index": 1
    });
    var o = function(e) {
        0 == n ? t.eq(e).css({
            opacity: 1,
            "z-index": 2
        }).siblings("a").css({
            "z-index": 1,
            opacity: 0
        }) : t.eq(e).animate({
            "z-index": 2
        }, 0, function() {
            $(this).animate({
                opacity: 1
            }, n).siblings("a").animate({
                "z-index": 1,
                opacity: 0
            })
        })
    };
    o(0), e.click(function() {
        0 == a ? a = r - 1 : a--, o(a)
    }), i.click(function() {
        r - 1 > a ? a++ : a = 0, o(a)
    }), 1 == s && setInterval(function() {
        i.click()
    }, 4e3)
}
var $wrapHd = $(".fbhd"),
    $beforeoverHd = $wrapHd.find(".beforeover"),
    $alteroverHd = $wrapHd.find(".alterover"),
    $wrapNews = $(".news"),
    $beforeoverHd2 = $wrapNews.find(".beforeover"),
    $alteroverHd2 = $wrapNews.find(".alterover"),
    tps = {};
! function(t) {
    if (window.Modernizr) {
        tps.bestTranslateType = window.Modernizr.csstransforms3d ? "translate3d" : window.Modernizr.csstransforms ? "translate" : "left";
        var e;
        t.horizonMoving = function(t, i, n) {
            if (n = n || tps.bestTranslateType, "" == t || "left" != n) {
                if ("" == t) e = "";
                else if ("translate3d" === n) e = "translate3d(" + t + "px, 0px, 0px)";
                else if ("translate" === n) e = "translate(" + t + "px, 0px)";
                else {
                    if ("translateX" !== n) return;
                    e = "translateX(" + t + "px)"
                }
                i.css({
                    WebkitTransform: e,
                    MozTransform: e,
                    Transform: e,
                    msTransform: e,
                    OTransform: e,
                    transform: e
                })
            }("" == t || "left" == n) && i.css("left", t), "undefined" != typeof FingerLayer && FingerLayer.trackAll()
        }
    }
}(tps);
var paramSetting = {},
    tpsParallax = new parallax(paramSetting);
tpsParallax.mouseWheelTarget.bind("mousewheel", onMouseWheel), $(window).resize(function() {
    tpsParallax.onResizeSlides(), tpsParallax.onResizeLayers()
}), tpsParallax.init()