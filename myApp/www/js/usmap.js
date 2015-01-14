//Copyright 2010-2014 Simplemaps.com
//html5usmapv3.0
//Use pursuant to license agreement at http://www.simplemaps.com/license

//Tweenlite.js (used for zooming)


(function (m) {
    var F = function (a) {
            var a = a.split("."),
                c = m,
                b;
            for (b = 0; b < a.length; b++) c[a[b]] = c = c[a[b]] || {};
            return c
        },
        n = F("com.greensock"),
        o, k, d, z, G, v = {},
        C = function (a, c, b, j) {
            this.sc = v[a] ? v[a].sc : [];
            v[a] = this;
            this.gsClass = null;
            this.def = b;
            var e = c || [],
                d = [];
            this.check = function (c) {
                for (var f = e.length, g = 0, l; - 1 < --f;)(l = v[e[f]] || new C(e[f])).gsClass ? d[f] = l.gsClass : (g++, c && l.sc.push(this));
                if (0 === g && b) {
                    var c = ("com.greensock." + a).split("."),
                        f = c.pop(),
                        k = F(c.join("."))[f] = this.gsClass = b.apply(b, d);
                    j && ((m.GreenSockGlobals || m)[f] = k, "function" === typeof define && define.amd ? define((m.GreenSockAMDPath ? m.GreenSockAMDPath + "/" : "") + a.split(".").join("/"), [], function () {
                        return k
                    }) : "undefined" !== typeof module && module.exports && (module.exports = k));
                    for (f = 0; f < this.sc.length; f++) this.sc[f].check(!1)
                }
            };
            this.check(!0)
        },
        q = n._class = function (a, c, b) {
            new C(a, [], function () {
                return c
            }, b);
            return c
        };
    m._gsDefine = function (a, c, b, j) {
        return new C(a, c, b, j)
    };
    var H = [0, 0, 1, 1],
        D = [],
        s = q("easing.Ease", function (a, c, b, j) {
            this._func = a;
            this._type = b || 0;
            this._power = j || 0;
            this._params = c ? H.concat(c) : H
        }, !0);
    d = s.prototype;
    d._calcEnd = !1;
    d.getRatio = function (a) {
        if (this._func) return this._params[0] = a, this._func.apply(null, this._params);
        var c = this._type,
            b = this._power,
            j = 1 === c ? 1 - a : 2 === c ? a : 0.5 > a ? 2 * a : 2 * (1 - a);
        1 === b ? j *= j : 2 === b ? j *= j * j : 3 === b ? j *= j * j * j : 4 === b && (j *= j * j * j * j);
        return 1 === c ? 1 - j : 2 === c ? j : 0.5 > a ? j / 2 : 1 - j / 2
    };
    o = ["Linear", "Quad", "Cubic", "Quart", "Quint"];
    for (k = o.length; - 1 < --k;) d = q("easing." + o[k], function () {}, !0), z = q("easing.Power" + k, function () {}, !0), d.easeOut = z.easeOut = new s(null, null, 1, k), d.easeIn = z.easeIn = new s(null, null, 2, k), d.easeInOut = z.easeInOut = new s(null, null, 3, k);
    q("easing.Strong", n.easing.Power4, !0);
    n.easing.Linear.easeNone = n.easing.Linear.easeIn;
    d = q("events.EventDispatcher", function (a) {
        this._listeners = {};
        this._eventTarget = a || this
    }).prototype;
    d.addEventListener = function (a, c, b, j, e) {
        var e = e || 0,
            d = this._listeners[a],
            h = 0,
            f;
        null == d && (this._listeners[a] = d = []);
        for (f = d.length; - 1 < --f;) a = d[f], a.c === c ? d.splice(f, 1) : 0 === h && a.pr < e && (h = f + 1);
        d.splice(h, 0, {
            c: c,
            s: b,
            up: j,
            pr: e
        })
    };
    d.removeEventListener = function (a, c) {
        var b = this._listeners[a];
        if (b)
            for (var j = b.length; - 1 < --j;)
                if (b[j].c === c) {
                    b.splice(j, 1);
                    break
                }
    };
    d.dispatchEvent = function (a) {
        var c = this._listeners[a];
        if (c)
            for (var b = c.length, j, d = this._eventTarget; - 1 < --b;) j = c[b], j.up ? j.c.call(j.s || d, {
                type: a,
                target: d
            }) : j.c.call(j.s || d)
    };
    var A = m.requestAnimationFrame,
        B = m.cancelAnimationFrame,
        I = Date.now || function () {
            return (new Date).getTime()
        };
    o = ["ms", "moz", "webkit", "o"];
    for (k = o.length; - 1 < --k && !A;) A = m[o[k] + "RequestAnimationFrame"], B = m[o[k] + "CancelAnimationFrame"] || m[o[k] + "CancelRequestAnimationFrame"];
    B || (B = function (a) {
        m.clearTimeout(a)
    });
    q("Ticker", function (a, c) {
        this.frame = this.time = 0;
        var b = this,
            j = I(),
            d = !1 !== c,
            i, h, f, g, l;
        this.tick = function () {
            b.time = (I() - j) / 1E3;
            if (!i || b.time >= l) b.frame++, l = b.time + g - (b.time - l) - 5E-4, l <= b.time && (l = b.time + 0.001), b.dispatchEvent("tick");
            f = h(b.tick)
        };
        this.fps = function (a) {
            if (!arguments.length) return i;
            i = a;
            g = 1 / (i || 60);
            l = this.time + g;
            h = 0 === i ? function () {} : !d || !A ? function (a) {
                return m.setTimeout(a, 1E3 * (l - b.time) + 1 >> 0 || 1)
            } : A;
            B(f);
            f = h(b.tick)
        };
        this.useRAF = function (a) {
            if (!arguments.length) return d;
            d = a;
            this.fps(i)
        };
        this.fps(a)
    });
    d = n.Ticker.prototype = new n.events.EventDispatcher;
    d.constructor = n.Ticker;
    var p = q("core.Animation", function (a, c) {
            this.vars = c || {};
            this._duration = this._totalDuration = a || 0;
            this._delay = Number(this.vars.delay) || 0;
            this._timeScale = 1;
            this._active = !0 == this.vars.immediateRender;
            this.data = this.vars.data;
            this._reversed = !0 == this.vars.reversed;
            if (t) {
                G || (r.tick(), G = !0);
                var b = this.vars.useFrames ? w : t;
                b.insert(this, b._time);
                this.vars.paused && this.paused(!0)
            }
        }),
        r = p.ticker = new n.Ticker;
    d = p.prototype;
    d._dirty = d._gc = d._initted = d._paused = !1;
    d._totalTime = d._time = 0;
    d._rawPrevTime = -1;
    d._next = d._last = d._onUpdate = d._timeline = d.timeline = null;
    d._paused = !1;
    d.play = function (a, c) {
        arguments.length && this.seek(a, c);
        this.reversed(!1);
        return this.paused(!1)
    };
    d.pause = function (a, c) {
        arguments.length && this.seek(a, c);
        return this.paused(!0)
    };
    d.resume = function (a, c) {
        arguments.length && this.seek(a, c);
        return this.paused(!1)
    };
    d.seek = function (a, c) {
        return this.totalTime(Number(a), !1 != c)
    };
    d.restart = function (a, c) {
        this.reversed(!1);
        this.paused(!1);
        return this.totalTime(a ? -this._delay : 0, !1 != c)
    };
    d.reverse = function (a, c) {
        arguments.length && this.seek(a || this.totalDuration(), c);
        this.reversed(!0);
        return this.paused(!1)
    };
    d.render = function () {};
    d.invalidate = function () {
        return this
    };
    d._enabled = function (a, c) {
        this._gc = !a;
        this._active = a && !this._paused && 0 < this._totalTime && this._totalTime < this._totalDuration;
        !0 != c && (a && null == this.timeline ? this._timeline.insert(this, this._startTime - this._delay) : !a && null != this.timeline && this._timeline._remove(this, !0));
        return !1
    };
    d._kill = function () {
        return this._enabled(!1, !1)
    };
    d.kill = function (a, c) {
        this._kill(a, c);
        return this
    };
    d._uncache = function (a) {
        for (a = a ? this : this.timeline; a;) a._dirty = !0, a = a.timeline;
        return this
    };
    d.eventCallback = function (a, c, b, j) {
        if (null == a) return null;
        if ("on" === a.substr(0, 2)) {
            if (1 === arguments.length) return this.vars[a];
            if (null == c) delete this.vars[a];
            else if (this.vars[a] = c, this.vars[a + "Params"] = b, this.vars[a + "Scope"] = j, b)
                for (var d = b.length; - 1 < --d;) "{self}" === b[d] && (b = this.vars[a + "Params"] = b.concat(), b[d] = this);
            "onUpdate" === a && (this._onUpdate = c)
        }
        return this
    };
    d.delay = function (a) {
        if (!arguments.length) return this._delay;
        this._timeline.smoothChildTiming && this.startTime(this._startTime + a - this._delay);
        this._delay = a;
        return this
    };
    d.duration = function (a) {
        if (!arguments.length) return this._dirty = !1, this._duration;
        this._duration = this._totalDuration = a;
        this._uncache(!0);
        this._timeline.smoothChildTiming && this._active && 0 != a && this.totalTime(this._totalTime * (a / this._duration), !0);
        return this
    };
    d.totalDuration = function (a) {
        this._dirty = !1;
        return !arguments.length ? this._totalDuration : this.duration(a)
    };
    d.time = function (a, c) {
        if (!arguments.length) return this._time;
        this._dirty && this.totalDuration();
        a > this._duration && (a = this._duration);
        return this.totalTime(a, c)
    };
    d.totalTime = function (a, c) {
        if (!arguments.length) return this._totalTime;
        if (this._timeline) {
            0 > a && (a += this.totalDuration());
            if (this._timeline.smoothChildTiming && (this._dirty && this.totalDuration(), a > this._totalDuration && (a = this._totalDuration), this._startTime = (this._paused ? this._pauseTime : this._timeline._time) - (!this._reversed ? a : this._totalDuration - a) / this._timeScale, this._timeline._dirty || this._uncache(!1), !this._timeline._active))
                for (var b = this._timeline; b._timeline;) b.totalTime(b._totalTime, !0), b = b._timeline;
            this._gc && this._enabled(!0, !1);
            this._totalTime != a && this.render(a, c, !1)
        }
        return this
    };
    d.startTime = function (a) {
        if (!arguments.length) return this._startTime;
        a != this._startTime && (this._startTime = a, this.timeline && this.timeline._sortChildren && this.timeline.insert(this, a - this._delay));
        return this
    };
    d.timeScale = function (a) {
        if (!arguments.length) return this._timeScale;
        a = a || 1E-6;
        if (this._timeline && this._timeline.smoothChildTiming) {
            var c = this._pauseTime || 0 == this._pauseTime ? this._pauseTime : this._timeline._totalTime;
            this._startTime = c - (c - this._startTime) * this._timeScale / a
        }
        this._timeScale = a;
        return this._uncache(!1)
    };
    d.reversed = function (a) {
        if (!arguments.length) return this._reversed;
        a != this._reversed && (this._reversed = a, this.totalTime(this._totalTime, !0));
        return this
    };
    d.paused = function (a) {
        if (!arguments.length) return this._paused;
        a != this._paused && this._timeline && (!a && this._timeline.smoothChildTiming && (this._startTime += this._timeline.rawTime() - this._pauseTime, this._uncache(!1)), this._pauseTime = a ? this._timeline.rawTime() : null, this._paused = a, this._active = !this._paused && 0 < this._totalTime && this._totalTime < this._totalDuration);
        this._gc && (a || this._enabled(!0, !1));
        return this
    };
    n = q("core.SimpleTimeline", function (a) {
        p.call(this, 0, a);
        this.autoRemoveChildren = this.smoothChildTiming = !0
    });
    d = n.prototype = new p;
    d.constructor = n;
    d.kill()._gc = !1;
    d._first = d._last = null;
    d._sortChildren = !1;
    d.insert = function (a, c) {
        a._startTime = Number(c || 0) + a._delay;
        a._paused && this !== a._timeline && (a._pauseTime = a._startTime + (this.rawTime() - a._startTime) / a._timeScale);
        a.timeline && a.timeline._remove(a, !0);
        a.timeline = a._timeline = this;
        a._gc && a._enabled(!0, !0);
        var b = this._last;
        if (this._sortChildren)
            for (var d = a._startTime; b && b._startTime > d;) b = b._prev;
        b ? (a._next = b._next, b._next = a) : (a._next = this._first, this._first = a);
        a._next ? a._next._prev = a : this._last = a;
        a._prev = b;
        this._timeline && this._uncache(!0);
        return this
    };
    d._remove = function (a, c) {
        a.timeline === this && (c || a._enabled(!1, !0), a.timeline = null, a._prev ? a._prev._next = a._next : this._first === a && (this._first = a._next), a._next ? a._next._prev = a._prev : this._last === a && (this._last = a._prev), this._timeline && this._uncache(!0));
        return this
    };
    d.render = function (a, c) {
        var b = this._first,
            d;
        for (this._totalTime = this._time = this._rawPrevTime = a; b;) {
            d = b._next;
            if (b._active || a >= b._startTime && !b._paused) b._reversed ? b.render((!b._dirty ? b._totalDuration : b.totalDuration()) - (a - b._startTime) * b._timeScale, c, !1) : b.render((a - b._startTime) * b._timeScale, c, !1);
            b = d
        }
    };
    d.rawTime = function () {
        return this._totalTime
    };
    var g = q("TweenLite", function (a, c, b) {
        p.call(this, c, b);
        if (null == a) throw "Cannot tween an undefined reference.";
        this.target = a;
        this._overwrite = null == this.vars.overwrite ? J[g.defaultOverwrite] : "number" === typeof this.vars.overwrite ? this.vars.overwrite >> 0 : J[this.vars.overwrite];
        if ((a instanceof Array || a.jquery) && "object" === typeof a[0]) {
            this._targets = a.slice(0);
            this._propLookup = [];
            this._siblings = [];
            for (a = 0; a < this._targets.length; a++) b = this._targets[a], b.jquery ? (this._targets.splice(a--, 1), this._targets = this._targets.concat(b.constructor.makeArray(b))) : (this._siblings[a] = x(b, this, !1), 1 === this._overwrite && 1 < this._siblings[a].length && E(b, this, null, 1, this._siblings[a]))
        } else this._propLookup = {}, this._siblings = x(a, this, !1), 1 === this._overwrite && 1 < this._siblings.length && E(a, this, null, 1, this._siblings);
        (this.vars.immediateRender || 0 === c && 0 === this._delay && !1 != this.vars.immediateRender) && this.render(-this._delay, !1, !0)
    }, !0);
    d = g.prototype = new p;
    d.constructor = g;
    d.kill()._gc = !1;
    d.ratio = 0;
    d._firstPT = d._targets = d._overwrittenProps = null;
    d._notifyPluginsOfEnabled = !1;
    g.version = 12;
    g.defaultEase = d._ease = new s(null, null, 1, 1);
    g.defaultOverwrite = "auto";
    g.ticker = r;
    var K = g._plugins = {},
        u = g._tweenLookup = {},
        M = 0,
        N = {
            ease: 1,
            delay: 1,
            overwrite: 1,
            onComplete: 1,
            onCompleteParams: 1,
            onCompleteScope: 1,
            useFrames: 1,
            runBackwards: 1,
            startAt: 1,
            onUpdate: 1,
            onUpdateParams: 1,
            onUpdateScope: 1,
            onStart: 1,
            onStartParams: 1,
            onStartScope: 1,
            onReverseComplete: 1,
            onReverseCompleteParams: 1,
            onReverseCompleteScope: 1,
            onRepeat: 1,
            onRepeatParams: 1,
            onRepeatScope: 1,
            easeParams: 1,
            yoyo: 1,
            orientToBezier: 1,
            immediateRender: 1,
            repeat: 1,
            repeatDelay: 1,
            data: 1,
            paused: 1,
            reversed: 1
        },
        J = {
            none: 0,
            all: 1,
            auto: 2,
            concurrent: 3,
            allOnStart: 4,
            preexisting: 5,
            "true": 1,
            "false": 0
        },
        w = p._rootFramesTimeline = new n,
        t = p._rootTimeline = new n;
    t._startTime = r.time;
    w._startTime = r.frame;
    t._active = w._active = !0;
    p._updateRoot = function () {
        t.render((r.time - t._startTime) * t._timeScale, !1, !1);
        w.render((r.frame - w._startTime) * w._timeScale, !1, !1);
        if (!(r.frame % 120)) {
            var a, c, b;
            for (b in u) {
                c = u[b].tweens;
                for (a = c.length; - 1 < --a;) c[a]._gc && c.splice(a, 1);
                0 === c.length && delete u[b]
            }
        }
    };
    r.addEventListener("tick", p._updateRoot);
    var x = function (a, c, b) {
            var d = a._gsTweenID,
                e;
            if (!u[d || (a._gsTweenID = d = "t" + M++)]) u[d] = {
                target: a,
                tweens: []
            };
            if (c && (a = u[d].tweens, a[e = a.length] = c, b))
                for (; - 1 < --e;) a[e] === c && a.splice(e, 1);
            return u[d].tweens
        },
        E = function (a, c, b, d, e) {
            var i, h, f;
            if (1 === d || 4 <= d) {
                a = e.length;
                for (i = 0; i < a; i++)
                    if ((f = e[i]) !== c) f._gc || f._enabled(!1, !1) && (h = !0);
                    else if (5 === d) break;
                return h
            }
            var g = c._startTime + 1E-10,
                l = [],
                k = 0,
                m;
            for (i = e.length; - 1 < --i;)
                if (!((f = e[i]) === c || f._gc || f._paused)) f._timeline !== c._timeline ? (m = m || L(c, 0), 0 === L(f, m) && (l[k++] = f)) : f._startTime <= g && f._startTime + f.totalDuration() / f._timeScale + 1E-10 > g && ((0 === c._duration || !f._initted) && 2E-10 >= g - f._startTime || (l[k++] = f));
            for (i = k; - 1 < --i;)
                if (f = l[i], 2 === d && f._kill(b, a) && (h = !0), 2 !== d || !f._firstPT && f._initted) f._enabled(!1, !1) && (h = !0);
            return h
        },
        L = function (a, c) {
            for (var b = a._timeline, d = b._timeScale, e = a._startTime; b._timeline;) {
                e += b._startTime;
                d *= b._timeScale;
                if (b._paused) return -100;
                b = b._timeline
            }
            e /= d;
            return e > c ? e - c : !a._initted && 2E-10 > e - c ? 1E-10 : (e += a.totalDuration() / a._timeScale / d) > c ? 0 : e - c - 1E-10
        };
    d._init = function () {
        this.vars.startAt && (this.vars.startAt.overwrite = 0, this.vars.startAt.immediateRender = !0, g.to(this.target, 0, this.vars.startAt));
        var a, c;
        this._ease = this.vars.ease instanceof s ? this.vars.easeParams instanceof Array ? this.vars.ease.config.apply(this.vars.ease, this.vars.easeParams) : this.vars.ease : "function" === typeof this.vars.ease ? new s(this.vars.ease, this.vars.easeParams) : g.defaultEase;
        this._easeType = this._ease._type;
        this._easePower = this._ease._power;
        this._firstPT = null;
        if (this._targets)
            for (a = this._targets.length; - 1 < --a;) {
                if (this._initProps(this._targets[a], this._propLookup[a] = {}, this._siblings[a], this._overwrittenProps ? this._overwrittenProps[a] : null)) c = !0
            } else c = this._initProps(this.target, this._propLookup, this._siblings, this._overwrittenProps);
        c && g._onPluginEvent("_onInitAllProps", this);
        this._overwrittenProps && null == this._firstPT && "function" !== typeof this.target && this._enabled(!1, !1);
        if (this.vars.runBackwards)
            for (a = this._firstPT; a;) a.s += a.c, a.c = -a.c, a = a._next;
        this._onUpdate = this.vars.onUpdate;
        this._initted = !0
    };
    d._initProps = function (a, c, b, d) {
        var e, i, h, f, g, l;
        if (null == a) return !1;
        for (e in this.vars) {
            if (N[e]) {
                if ("onStartParams" === e || "onUpdateParams" === e || "onCompleteParams" === e || "onReverseCompleteParams" === e || "onRepeatParams" === e)
                    if (g = this.vars[e])
                        for (i = g.length; - 1 < --i;) "{self}" === g[i] && (g = this.vars[e] = g.concat(), g[i] = this)
            } else if (K[e] && (f = new K[e])._onInitTween(a, this.vars[e], this)) {
                this._firstPT = l = {
                    _next: this._firstPT,
                    t: f,
                    p: "setRatio",
                    s: 0,
                    c: 1,
                    f: !0,
                    n: e,
                    pg: !0,
                    pr: f._priority
                };
                for (i = f._overwriteProps.length; - 1 < --i;) c[f._overwriteProps[i]] = this._firstPT;
                if (f._priority || f._onInitAllProps) h = !0;
                if (f._onDisable || f._onEnable) this._notifyPluginsOfEnabled = !0
            } else this._firstPT = c[e] = l = {
                _next: this._firstPT,
                t: a,
                p: e,
                f: "function" === typeof a[e],
                n: e,
                pg: !1,
                pr: 0
            }, l.s = !l.f ? parseFloat(a[e]) : a[e.indexOf("set") || "function" !== typeof a["get" + e.substr(3)] ? e : "get" + e.substr(3)](), i = this.vars[e], l.c = "number" === typeof i ? i - l.s : "string" === typeof i && "=" === i.charAt(1) ? parseInt(i.charAt(0) + "1") * Number(i.substr(2)) : Number(i) || 0;
            l && l._next && (l._next._prev = l)
        }
        return d && this._kill(d, a) ? this._initProps(a, c, b, d) : 1 < this._overwrite && this._firstPT && 1 < b.length && E(a, this, c, this._overwrite, b) ? (this._kill(c, a), this._initProps(a, c, b, d)) : h
    };
    d.render = function (a, c, b) {
        var d = this._time,
            e, i;
        if (a >= this._duration) {
            if (this._totalTime = this._time = this._duration, this.ratio = this._ease._calcEnd ? this._ease.getRatio(1) : 1, this._reversed || (e = !0, i = "onComplete"), 0 === this._duration) {
                if (0 === a || 0 > this._rawPrevTime) this._rawPrevTime !== a && (b = !0);
                this._rawPrevTime = a
            }
        } else if (0 >= a) {
            this._totalTime = this._time = 0;
            this.ratio = this._ease._calcEnd ? this._ease.getRatio(0) : 0;
            if (0 !== d || 0 === this._duration && 0 < this._rawPrevTime) i = "onReverseComplete", e = this._reversed;
            0 > a ? (this._active = !1, 0 === this._duration && (0 <= this._rawPrevTime && (b = !0), this._rawPrevTime = a)) : this._initted || (b = !0)
        } else if (this._totalTime = this._time = a, this._easeType) {
            var h = a / this._duration,
                f = this._easeType,
                g = this._easePower;
            if (1 === f || 3 === f && 0.5 <= h) h = 1 - h;
            3 === f && (h *= 2);
            1 === g ? h *= h : 2 === g ? h *= h * h : 3 === g ? h *= h * h * h : 4 === g && (h *= h * h * h * h);
            this.ratio = 1 === f ? 1 - h : 2 === f ? h : 0.5 > a / this._duration ? h / 2 : 1 - h / 2
        } else this.ratio = this._ease.getRatio(a / this._duration); if (this._time !== d || b) {
            this._initted || (this._init(), !e && this._time && (this.ratio = this._ease.getRatio(this._time / this._duration)));
            !this._active && !this._paused && (this._active = !0);
            if (0 === d && this.vars.onStart && (0 !== this._time || 0 === this._duration)) c || this.vars.onStart.apply(this.vars.onStartScope || this, this.vars.onStartParams || D);
            for (a = this._firstPT; a;) {
                if (a.f) a.t[a.p](a.c * this.ratio + a.s);
                else a.t[a.p] = a.c * this.ratio + a.s;
                a = a._next
            }
            this._onUpdate && (c || this._onUpdate.apply(this.vars.onUpdateScope || this, this.vars.onUpdateParams || D));
            i && !this._gc && (e && (this._timeline.autoRemoveChildren && this._enabled(!1, !1), this._active = !1), c || this.vars[i] && this.vars[i].apply(this.vars[i + "Scope"] || this, this.vars[i + "Params"] || D))
        }
    };
    d._kill = function (a, c) {
        "all" === a && (a = null);
        if (null == a && (null == c || c == this.target)) return this._enabled(!1, !1);
        var c = c || this._targets || this.target,
            b, d, e, i, g, f, k;
        if ((c instanceof Array || c.jquery) && "object" === typeof c[0])
            for (b = c.length; - 1 < --b;) this._kill(a, c[b]) && (g = !0);
        else {
            if (this._targets)
                for (b = this._targets.length; - 1 < --b;) {
                    if (c === this._targets[b]) {
                        i = this._propLookup[b] || {};
                        this._overwrittenProps = this._overwrittenProps || [];
                        d = this._overwrittenProps[b] = a ? this._overwrittenProps[b] || {} : "all";
                        break
                    }
                } else {
                    if (c !== this.target) return !1;
                    i = this._propLookup;
                    d = this._overwrittenProps = a ? this._overwrittenProps || {} : "all"
                } if (i)
                    for (e in f = a || i, k = a != d && "all" != d && a != i && (null == a || !0 != a._tempKill), f) {
                        if (b = i[e]) {
                            b.pg && b.t._kill(f) && (g = !0);
                            if (!b.pg || 0 === b.t._overwriteProps.length) b._prev ? b._prev._next = b._next : b === this._firstPT && (this._firstPT = b._next), b._next && (b._next._prev = b._prev), b._next = b._prev = null;
                            delete i[e]
                        }
                        k && (d[e] = 1)
                    }
        }
        return g
    };
    d.invalidate = function () {
        this._notifyPluginsOfEnabled && g._onPluginEvent("_onDisable", this);
        this._onUpdate = this._overwrittenProps = this._firstPT = null;
        this._initted = this._active = this._notifyPluginsOfEnabled = !1;
        this._propLookup = this._targets ? {} : [];
        return this
    };
    d._enabled = function (a, c) {
        if (a && this._gc)
            if (this._targets)
                for (var b = this._targets.length; - 1 < --b;) this._siblings[b] = x(this._targets[b], this, !0);
            else this._siblings = x(this.target, this, !0);
        p.prototype._enabled.call(this, a, c);
        return this._notifyPluginsOfEnabled && this._firstPT ? g._onPluginEvent(a ? "_onEnable" : "_onDisable", this) : !1
    };
    g.to = function (a, c, b) {
        return new g(a, c, b)
    };
    g.from = function (a, c, b) {
        b.runBackwards = !0;
        !1 != b.immediateRender && (b.immediateRender = !0);
        return new g(a, c, b)
    };
    g.fromTo = function (a, c, b, d) {
        d.startAt = b;
        b.immediateRender && (d.immediateRender = !0);
        return new g(a, c, d)
    };
    g.delayedCall = function (a, c, b, d, e) {
        return new g(c, 0, {
            delay: a,
            onComplete: c,
            onCompleteParams: b,
            onCompleteScope: d,
            onReverseComplete: c,
            onReverseCompleteParams: b,
            onReverseCompleteScope: d,
            immediateRender: !1,
            useFrames: e,
            overwrite: 0
        })
    };
    g.set = function (a, c) {
        return new g(a, 0, c)
    };
    g.killTweensOf = g.killDelayedCallsTo = function (a, c) {
        for (var b = g.getTweensOf(a), d = b.length; - 1 < --d;) b[d]._kill(c, a)
    };
    g.getTweensOf = function (a) {
        if (null != a) {
            var c, b, d;
            if ((a instanceof Array || a.jquery) && "object" === typeof a[0]) {
                c = a.length;
                for (b = []; - 1 < --c;) b = b.concat(g.getTweensOf(a[c]));
                for (c = b.length; - 1 < --c;) {
                    d = b[c];
                    for (a = c; - 1 < --a;) d === b[a] && b.splice(c, 1)
                }
            } else {
                b = x(a).concat();
                for (c = b.length; - 1 < --c;) b[c]._gc && b.splice(c, 1)
            }
            return b
        }
    };
    var y = q("plugins.TweenPlugin", function (a, c) {
        this._overwriteProps = (a || "").split(",");
        this._propName = this._overwriteProps[0];
        this._priority = c || 0
    }, !0);
    d = y.prototype;
    y.version = 12;
    y.API = 2;
    d._firstPT = null;
    d._addTween = function (a, c, b, d, e, g) {
        var h;
        if (null != d && (h = "number" === typeof d || "=" !== d.charAt(1) ? Number(d) - b : parseInt(d.charAt(0) + "1") * Number(d.substr(2)))) this._firstPT = a = {
            _next: this._firstPT,
            t: a,
            p: c,
            s: b,
            c: h,
            f: "function" === typeof a[c],
            n: e || c,
            r: g
        }, a._next && (a._next._prev = a)
    };
    d.setRatio = function (a) {
        for (var c = this._firstPT, b; c;) {
            b = c.c * a + c.s;
            c.r && (b = b + (0 < b ? 0.5 : -0.5) >> 0);
            if (c.f) c.t[c.p](b);
            else c.t[c.p] = b;
            c = c._next
        }
    };
    d._kill = function (a) {
        if (null != a[this._propName]) this._overwriteProps = [];
        else
            for (var c = this._overwriteProps.length; - 1 < --c;) null != a[this._overwriteProps[c]] && this._overwriteProps.splice(c, 1);
        for (c = this._firstPT; c;) null != a[c.n] && ((c._next && (c._next._prev = c._prev), c._prev) ? (c._prev._next = c._next, c._prev = null) : this._firstPT === c && (this._firstPT = c._next)), c = c._next;
        return !1
    };
    d._roundProps = function (a, c) {
        for (var b = this._firstPT; b;) {
            if (a[this._propName] || null != b.n && a[b.n.split(this._propName + "_").join("")]) b.r = c;
            b = b._next
        }
    };
    g._onPluginEvent = function (a, c) {
        var b = c._firstPT,
            d;
        if ("_onInitAllProps" === a) {
            for (var e, g, h, f; b;) {
                f = b._next;
                for (e = g; e && e.pr > b.pr;) e = e._next;
                (b._prev = e ? e._prev : h) ? b._prev._next = b : g = b;
                (b._next = e) ? e._prev = b : h = b;
                b = f
            }
            b = c._firstPT = g
        }
        for (; b;) b.pg && "function" === typeof b.t[a] && b.t[a]() && (d = !0), b = b._next;
        return d
    };
    y.activate = function (a) {
        for (var c = a.length; - 1 < --c;) a[c].API === y.API && (g._plugins[(new a[c])._propName] = a[c]);
        return !0
    };
    if (o = m._gsQueue) {
        for (k = 0; k < o.length; k++) o[k]();
        for (d in v) v[d].def || console.log("Warning: TweenLite encountered missing dependency: com.greensock." + d)
    }
})(window); /* @license Copyright (c) 2008-2014, GreenSock. All rights reserved. * This work is subject to the terms at http://www.greensock.com/terms_of_use.html or for* Club GreenSock members, the software agreement that was issued with your membership.*/

//Raphael.js (svg/vml library)
! function (a) {
    var b, c, d = "0.4.2",
        e = "hasOwnProperty",
        f = /[\.\/]/,
        g = "*",
        h = function () {},
        i = function (a, b) {
            return a - b
        },
        j = {
            n: {}
        },
        k = function (a, d) {
            a = String(a);
            var e, f = c,
                g = Array.prototype.slice.call(arguments, 2),
                h = k.listeners(a),
                j = 0,
                l = [],
                m = {},
                n = [],
                o = b;
            b = a, c = 0;
            for (var p = 0, q = h.length; q > p; p++) "zIndex" in h[p] && (l.push(h[p].zIndex), h[p].zIndex < 0 && (m[h[p].zIndex] = h[p]));
            for (l.sort(i); l[j] < 0;)
                if (e = m[l[j++]], n.push(e.apply(d, g)), c) return c = f, n;
            for (p = 0; q > p; p++)
                if (e = h[p], "zIndex" in e)
                    if (e.zIndex == l[j]) {
                        if (n.push(e.apply(d, g)), c) break;
                        do
                            if (j++, e = m[l[j]], e && n.push(e.apply(d, g)), c) break;
                        while (e)
                    } else m[e.zIndex] = e;
            else if (n.push(e.apply(d, g)), c) break;
            return c = f, b = o, n.length ? n : null
        };
    k._events = j, k.listeners = function (a) {
        var b, c, d, e, h, i, k, l, m = a.split(f),
            n = j,
            o = [n],
            p = [];
        for (e = 0, h = m.length; h > e; e++) {
            for (l = [], i = 0, k = o.length; k > i; i++)
                for (n = o[i].n, c = [n[m[e]], n[g]], d = 2; d--;) b = c[d], b && (l.push(b), p = p.concat(b.f || []));
            o = l
        }
        return p
    }, k.on = function (a, b) {
        if (a = String(a), "function" != typeof b) return function () {};
        for (var c = a.split(f), d = j, e = 0, g = c.length; g > e; e++) d = d.n, d = d.hasOwnProperty(c[e]) && d[c[e]] || (d[c[e]] = {
            n: {}
        });
        for (d.f = d.f || [], e = 0, g = d.f.length; g > e; e++)
            if (d.f[e] == b) return h;
        return d.f.push(b),
            function (a) {
                +a == +a && (b.zIndex = +a)
            }
    }, k.f = function (a) {
        var b = [].slice.call(arguments, 1);
        return function () {
            k.apply(null, [a, null].concat(b).concat([].slice.call(arguments, 0)))
        }
    }, k.stop = function () {
        c = 1
    }, k.nt = function (a) {
        return a ? new RegExp("(?:\\.|\\/|^)" + a + "(?:\\.|\\/|$)").test(b) : b
    }, k.nts = function () {
        return b.split(f)
    }, k.off = k.unbind = function (a, b) {
        if (!a) return k._events = j = {
            n: {}
        }, void 0;
        var c, d, h, i, l, m, n, o = a.split(f),
            p = [j];
        for (i = 0, l = o.length; l > i; i++)
            for (m = 0; m < p.length; m += h.length - 2) {
                if (h = [m, 1], c = p[m].n, o[i] != g) c[o[i]] && h.push(c[o[i]]);
                else
                    for (d in c) c[e](d) && h.push(c[d]);
                p.splice.apply(p, h)
            }
        for (i = 0, l = p.length; l > i; i++)
            for (c = p[i]; c.n;) {
                if (b) {
                    if (c.f) {
                        for (m = 0, n = c.f.length; n > m; m++)
                            if (c.f[m] == b) {
                                c.f.splice(m, 1);
                                break
                            }!c.f.length && delete c.f
                    }
                    for (d in c.n)
                        if (c.n[e](d) && c.n[d].f) {
                            var q = c.n[d].f;
                            for (m = 0, n = q.length; n > m; m++)
                                if (q[m] == b) {
                                    q.splice(m, 1);
                                    break
                                }!q.length && delete c.n[d].f
                        }
                } else {
                    delete c.f;
                    for (d in c.n) c.n[e](d) && c.n[d].f && delete c.n[d].f
                }
                c = c.n
            }
    }, k.once = function (a, b) {
        var c = function () {
            return k.unbind(a, c), b.apply(this, arguments)
        };
        return k.on(a, c)
    }, k.version = d, k.toString = function () {
        return "You are running Eve " + d
    }, "undefined" != typeof module && module.exports ? module.exports = k : "undefined" != typeof define ? define("eve", [], function () {
        return k
    }) : a.eve = k
}(this),
function (a, b) {
    "function" == typeof define && define.amd ? define(["eve"], function (c) {
        return b(a, c)
    }) : b(a, a.eve)
}(this, function (a, b) {
    function c(a) {
        if (c.is(a, "function")) return u ? a() : b.on("raphael.DOMload", a);
        if (c.is(a, V)) return c._engine.create[D](c, a.splice(0, 3 + c.is(a[0], T))).add(a);
        var d = Array.prototype.slice.call(arguments, 0);
        if (c.is(d[d.length - 1], "function")) {
            var e = d.pop();
            return u ? e.call(c._engine.create[D](c, d)) : b.on("raphael.DOMload", function () {
                e.call(c._engine.create[D](c, d))
            })
        }
        return c._engine.create[D](c, arguments)
    }

    function d(a) {
        if ("function" == typeof a || Object(a) !== a) return a;
        var b = new a.constructor;
        for (var c in a) a[z](c) && (b[c] = d(a[c]));
        return b
    }

    function e(a, b) {
        for (var c = 0, d = a.length; d > c; c++)
            if (a[c] === b) return a.push(a.splice(c, 1)[0])
    }

    function f(a, b, c) {
        function d() {
            var f = Array.prototype.slice.call(arguments, 0),
                g = f.join("?"),
                h = d.cache = d.cache || {},
                i = d.count = d.count || [];
            return h[z](g) ? (e(i, g), c ? c(h[g]) : h[g]) : (i.length >= 1e3 && delete h[i.shift()], i.push(g), h[g] = a[D](b, f), c ? c(h[g]) : h[g])
        }
        return d
    }

    function g() {
        return this.hex
    }

    function h(a, b) {
        for (var c = [], d = 0, e = a.length; e - 2 * !b > d; d += 2) {
            var f = [{
                x: +a[d - 2],
                y: +a[d - 1]
            }, {
                x: +a[d],
                y: +a[d + 1]
            }, {
                x: +a[d + 2],
                y: +a[d + 3]
            }, {
                x: +a[d + 4],
                y: +a[d + 5]
            }];
            b ? d ? e - 4 == d ? f[3] = {
                x: +a[0],
                y: +a[1]
            } : e - 2 == d && (f[2] = {
                x: +a[0],
                y: +a[1]
            }, f[3] = {
                x: +a[2],
                y: +a[3]
            }) : f[0] = {
                x: +a[e - 2],
                y: +a[e - 1]
            } : e - 4 == d ? f[3] = f[2] : d || (f[0] = {
                x: +a[d],
                y: +a[d + 1]
            }), c.push(["C", (-f[0].x + 6 * f[1].x + f[2].x) / 6, (-f[0].y + 6 * f[1].y + f[2].y) / 6, (f[1].x + 6 * f[2].x - f[3].x) / 6, (f[1].y + 6 * f[2].y - f[3].y) / 6, f[2].x, f[2].y])
        }
        return c
    }

    function i(a, b, c, d, e) {
        var f = -3 * b + 9 * c - 9 * d + 3 * e,
            g = a * f + 6 * b - 12 * c + 6 * d;
        return a * g - 3 * b + 3 * c
    }

    function j(a, b, c, d, e, f, g, h, j) {
        null == j && (j = 1), j = j > 1 ? 1 : 0 > j ? 0 : j;
        for (var k = j / 2, l = 12, m = [-.1252, .1252, -.3678, .3678, -.5873, .5873, -.7699, .7699, -.9041, .9041, -.9816, .9816], n = [.2491, .2491, .2335, .2335, .2032, .2032, .1601, .1601, .1069, .1069, .0472, .0472], o = 0, p = 0; l > p; p++) {
            var q = k * m[p] + k,
                r = i(q, a, c, e, g),
                s = i(q, b, d, f, h),
                t = r * r + s * s;
            o += n[p] * N.sqrt(t)
        }
        return k * o
    }

    function k(a, b, c, d, e, f, g, h, i) {
        if (!(0 > i || j(a, b, c, d, e, f, g, h) < i)) {
            var k, l = 1,
                m = l / 2,
                n = l - m,
                o = .01;
            for (k = j(a, b, c, d, e, f, g, h, n); Q(k - i) > o;) m /= 2, n += (i > k ? 1 : -1) * m, k = j(a, b, c, d, e, f, g, h, n);
            return n
        }
    }

    function l(a, b, c, d, e, f, g, h) {
        if (!(O(a, c) < P(e, g) || P(a, c) > O(e, g) || O(b, d) < P(f, h) || P(b, d) > O(f, h))) {
            var i = (a * d - b * c) * (e - g) - (a - c) * (e * h - f * g),
                j = (a * d - b * c) * (f - h) - (b - d) * (e * h - f * g),
                k = (a - c) * (f - h) - (b - d) * (e - g);
            if (k) {
                var l = i / k,
                    m = j / k,
                    n = +l.toFixed(2),
                    o = +m.toFixed(2);
                if (!(n < +P(a, c).toFixed(2) || n > +O(a, c).toFixed(2) || n < +P(e, g).toFixed(2) || n > +O(e, g).toFixed(2) || o < +P(b, d).toFixed(2) || o > +O(b, d).toFixed(2) || o < +P(f, h).toFixed(2) || o > +O(f, h).toFixed(2))) return {
                    x: l,
                    y: m
                }
            }
        }
    }

    function m(a, b, d) {
        var e = c.bezierBBox(a),
            f = c.bezierBBox(b);
        if (!c.isBBoxIntersect(e, f)) return d ? 0 : [];
        for (var g = j.apply(0, a), h = j.apply(0, b), i = O(~~(g / 5), 1), k = O(~~(h / 5), 1), m = [], n = [], o = {}, p = d ? 0 : [], q = 0; i + 1 > q; q++) {
            var r = c.findDotsAtSegment.apply(c, a.concat(q / i));
            m.push({
                x: r.x,
                y: r.y,
                t: q / i
            })
        }
        for (q = 0; k + 1 > q; q++) r = c.findDotsAtSegment.apply(c, b.concat(q / k)), n.push({
            x: r.x,
            y: r.y,
            t: q / k
        });
        for (q = 0; i > q; q++)
            for (var s = 0; k > s; s++) {
                var t = m[q],
                    u = m[q + 1],
                    v = n[s],
                    w = n[s + 1],
                    x = Q(u.x - t.x) < .001 ? "y" : "x",
                    y = Q(w.x - v.x) < .001 ? "y" : "x",
                    z = l(t.x, t.y, u.x, u.y, v.x, v.y, w.x, w.y);
                if (z) {
                    if (o[z.x.toFixed(4)] == z.y.toFixed(4)) continue;
                    o[z.x.toFixed(4)] = z.y.toFixed(4);
                    var A = t.t + Q((z[x] - t[x]) / (u[x] - t[x])) * (u.t - t.t),
                        B = v.t + Q((z[y] - v[y]) / (w[y] - v[y])) * (w.t - v.t);
                    A >= 0 && 1.001 >= A && B >= 0 && 1.001 >= B && (d ? p++ : p.push({
                        x: z.x,
                        y: z.y,
                        t1: P(A, 1),
                        t2: P(B, 1)
                    }))
                }
            }
        return p
    }

    function n(a, b, d) {
        a = c._path2curve(a), b = c._path2curve(b);
        for (var e, f, g, h, i, j, k, l, n, o, p = d ? 0 : [], q = 0, r = a.length; r > q; q++) {
            var s = a[q];
            if ("M" == s[0]) e = i = s[1], f = j = s[2];
            else {
                "C" == s[0] ? (n = [e, f].concat(s.slice(1)), e = n[6], f = n[7]) : (n = [e, f, e, f, i, j, i, j], e = i, f = j);
                for (var t = 0, u = b.length; u > t; t++) {
                    var v = b[t];
                    if ("M" == v[0]) g = k = v[1], h = l = v[2];
                    else {
                        "C" == v[0] ? (o = [g, h].concat(v.slice(1)), g = o[6], h = o[7]) : (o = [g, h, g, h, k, l, k, l], g = k, h = l);
                        var w = m(n, o, d);
                        if (d) p += w;
                        else {
                            for (var x = 0, y = w.length; y > x; x++) w[x].segment1 = q, w[x].segment2 = t, w[x].bez1 = n, w[x].bez2 = o;
                            p = p.concat(w)
                        }
                    }
                }
            }
        }
        return p
    }

    function o(a, b, c, d, e, f) {
        null != a ? (this.a = +a, this.b = +b, this.c = +c, this.d = +d, this.e = +e, this.f = +f) : (this.a = 1, this.b = 0, this.c = 0, this.d = 1, this.e = 0, this.f = 0)
    }

    function p() {
        return this.x + H + this.y + H + this.width + " × " + this.height
    }

    function q(a, b, c, d, e, f) {
        function g(a) {
            return ((l * a + k) * a + j) * a
        }

        function h(a, b) {
            var c = i(a, b);
            return ((o * c + n) * c + m) * c
        }

        function i(a, b) {
            var c, d, e, f, h, i;
            for (e = a, i = 0; 8 > i; i++) {
                if (f = g(e) - a, Q(f) < b) return e;
                if (h = (3 * l * e + 2 * k) * e + j, Q(h) < 1e-6) break;
                e -= f / h
            }
            if (c = 0, d = 1, e = a, c > e) return c;
            if (e > d) return d;
            for (; d > c;) {
                if (f = g(e), Q(f - a) < b) return e;
                a > f ? c = e : d = e, e = (d - c) / 2 + c
            }
            return e
        }
        var j = 3 * b,
            k = 3 * (d - b) - j,
            l = 1 - j - k,
            m = 3 * c,
            n = 3 * (e - c) - m,
            o = 1 - m - n;
        return h(a, 1 / (200 * f))
    }

    function r(a, b) {
        var c = [],
            d = {};
        if (this.ms = b, this.times = 1, a) {
            for (var e in a) a[z](e) && (d[_(e)] = a[e], c.push(_(e)));
            c.sort(lb)
        }
        this.anim = d, this.top = c[c.length - 1], this.percents = c
    }

    function s(a, d, e, f, g, h) {
        e = _(e);
        var i, j, k, l, m, n, p = a.ms,
            r = {},
            s = {},
            t = {};
        if (f)
            for (v = 0, x = ic.length; x > v; v++) {
                var u = ic[v];
                if (u.el.id == d.id && u.anim == a) {
                    u.percent != e ? (ic.splice(v, 1), k = 1) : j = u, d.attr(u.totalOrigin);
                    break
                }
            } else f = +s;
        for (var v = 0, x = a.percents.length; x > v; v++) {
            if (a.percents[v] == e || a.percents[v] > f * a.top) {
                e = a.percents[v], m = a.percents[v - 1] || 0, p = p / a.top * (e - m), l = a.percents[v + 1], i = a.anim[e];
                break
            }
            f && d.attr(a.anim[a.percents[v]])
        }
        if (i) {
            if (j) j.initstatus = f, j.start = new Date - j.ms * f;
            else {
                for (var y in i)
                    if (i[z](y) && (db[z](y) || d.paper.customAttributes[z](y))) switch (r[y] = d.attr(y), null == r[y] && (r[y] = cb[y]), s[y] = i[y], db[y]) {
                    case T:
                        t[y] = (s[y] - r[y]) / p;
                        break;
                    case "colour":
                        r[y] = c.getRGB(r[y]);
                        var A = c.getRGB(s[y]);
                        t[y] = {
                            r: (A.r - r[y].r) / p,
                            g: (A.g - r[y].g) / p,
                            b: (A.b - r[y].b) / p
                        };
                        break;
                    case "path":
                        var B = Kb(r[y], s[y]),
                            C = B[1];
                        for (r[y] = B[0], t[y] = [], v = 0, x = r[y].length; x > v; v++) {
                            t[y][v] = [0];
                            for (var D = 1, F = r[y][v].length; F > D; D++) t[y][v][D] = (C[v][D] - r[y][v][D]) / p
                        }
                        break;
                    case "transform":
                        var G = d._,
                            H = Pb(G[y], s[y]);
                        if (H)
                            for (r[y] = H.from, s[y] = H.to, t[y] = [], t[y].real = !0, v = 0, x = r[y].length; x > v; v++)
                                for (t[y][v] = [r[y][v][0]], D = 1, F = r[y][v].length; F > D; D++) t[y][v][D] = (s[y][v][D] - r[y][v][D]) / p;
                        else {
                            var K = d.matrix || new o,
                                L = {
                                    _: {
                                        transform: G.transform
                                    },
                                    getBBox: function () {
                                        return d.getBBox(1)
                                    }
                                };
                            r[y] = [K.a, K.b, K.c, K.d, K.e, K.f], Nb(L, s[y]), s[y] = L._.transform, t[y] = [(L.matrix.a - K.a) / p, (L.matrix.b - K.b) / p, (L.matrix.c - K.c) / p, (L.matrix.d - K.d) / p, (L.matrix.e - K.e) / p, (L.matrix.f - K.f) / p]
                        }
                        break;
                    case "csv":
                        var M = I(i[y])[J](w),
                            N = I(r[y])[J](w);
                        if ("clip-rect" == y)
                            for (r[y] = N, t[y] = [], v = N.length; v--;) t[y][v] = (M[v] - r[y][v]) / p;
                        s[y] = M;
                        break;
                    default:
                        for (M = [][E](i[y]), N = [][E](r[y]), t[y] = [], v = d.paper.customAttributes[y].length; v--;) t[y][v] = ((M[v] || 0) - (N[v] || 0)) / p
                    }
                var O = i.easing,
                    P = c.easing_formulas[O];
                if (!P)
                    if (P = I(O).match(Z), P && 5 == P.length) {
                        var Q = P;
                        P = function (a) {
                            return q(a, +Q[1], +Q[2], +Q[3], +Q[4], p)
                        }
                    } else P = nb;
                if (n = i.start || a.start || +new Date, u = {
                    anim: a,
                    percent: e,
                    timestamp: n,
                    start: n + (a.del || 0),
                    status: 0,
                    initstatus: f || 0,
                    stop: !1,
                    ms: p,
                    easing: P,
                    from: r,
                    diff: t,
                    to: s,
                    el: d,
                    callback: i.callback,
                    prev: m,
                    next: l,
                    repeat: h || a.times,
                    origin: d.attr(),
                    totalOrigin: g
                }, ic.push(u), f && !j && !k && (u.stop = !0, u.start = new Date - p * f, 1 == ic.length)) return kc();
                k && (u.start = new Date - u.ms * f), 1 == ic.length && jc(kc)
            }
            b("raphael.anim.start." + d.id, d, a)
        }
    }

    function t(a) {
        for (var b = 0; b < ic.length; b++) ic[b].el.paper == a && ic.splice(b--, 1)
    }
    c.version = "2.1.2", c.eve = b;
    var u, v, w = /[, ]+/,
        x = {
            circle: 1,
            rect: 1,
            path: 1,
            ellipse: 1,
            text: 1,
            image: 1
        },
        y = /\{(\d+)\}/g,
        z = "hasOwnProperty",
        A = {
            doc: document,
            win: a
        },
        B = {
            was: Object.prototype[z].call(A.win, "Raphael"),
            is: A.win.Raphael
        },
        C = function () {
            this.ca = this.customAttributes = {}
        },
        D = "apply",
        E = "concat",
        F = "ontouchstart" in A.win || A.win.DocumentTouch && A.doc instanceof DocumentTouch,
        G = "",
        H = " ",
        I = String,
        J = "split",
        K = "click dblclick mousedown mousemove mouseout mouseover mouseup touchstart touchmove touchend touchcancel" [J](H),
        L = {
            mousedown: "touchstart",
            mousemove: "touchmove",
            mouseup: "touchend"
        },
        M = I.prototype.toLowerCase,
        N = Math,
        O = N.max,
        P = N.min,
        Q = N.abs,
        R = N.pow,
        S = N.PI,
        T = "number",
        U = "string",
        V = "array",
        W = Object.prototype.toString,
        X = (c._ISURL = /^url\(['"]?([^\)]+?)['"]?\)$/i, /^\s*((#[a-f\d]{6})|(#[a-f\d]{3})|rgba?\(\s*([\d\.]+%?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+%?(?:\s*,\s*[\d\.]+%?)?)\s*\)|hsba?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\)|hsla?\(\s*([\d\.]+(?:deg|\xb0|%)?\s*,\s*[\d\.]+%?\s*,\s*[\d\.]+(?:%?\s*,\s*[\d\.]+)?)%?\s*\))\s*$/i),
        Y = {
            NaN: 1,
            Infinity: 1,
            "-Infinity": 1
        },
        Z = /^(?:cubic-)?bezier\(([^,]+),([^,]+),([^,]+),([^\)]+)\)/,
        $ = N.round,
        _ = parseFloat,
        ab = parseInt,
        bb = I.prototype.toUpperCase,
        cb = c._availableAttrs = {
            "arrow-end": "none",
            "arrow-start": "none",
            blur: 0,
            "clip-rect": "0 0 1e9 1e9",
            cursor: "default",
            cx: 0,
            cy: 0,
            fill: "#fff",
            "fill-opacity": 1,
            font: '10px "Arial"',
            "font-family": '"Arial"',
            "font-size": "10",
            "font-style": "normal",
            "font-weight": 400,
            gradient: 0,
            height: 0,
            href: "http://raphaeljs.com/",
            "letter-spacing": 0,
            opacity: 1,
            path: "M0,0",
            r: 0,
            rx: 0,
            ry: 0,
            src: "",
            stroke: "#000",
            "stroke-dasharray": "",
            "stroke-linecap": "butt",
            "stroke-linejoin": "butt",
            "stroke-miterlimit": 0,
            "stroke-opacity": 1,
            "stroke-width": 1,
            target: "_blank",
            "text-anchor": "middle",
            title: "Raphael",
            transform: "",
            width: 0,
            x: 0,
            y: 0
        },
        db = c._availableAnimAttrs = {
            blur: T,
            "clip-rect": "csv",
            cx: T,
            cy: T,
            fill: "colour",
            "fill-opacity": T,
            "font-size": T,
            height: T,
            opacity: T,
            path: "path",
            r: T,
            rx: T,
            ry: T,
            stroke: "colour",
            "stroke-opacity": T,
            "stroke-width": T,
            transform: "transform",
            width: T,
            x: T,
            y: T
        },
        eb = /[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/,
        fb = {
            hs: 1,
            rg: 1
        },
        gb = /,?([achlmqrstvxz]),?/gi,
        hb = /([achlmrqstvz])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
        ib = /([rstm])[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029,]*((-?\d*\.?\d*(?:e[\-+]?\d+)?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*)+)/gi,
        jb = /(-?\d*\.?\d*(?:e[\-+]?\d+)?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,?[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*/gi,
        kb = (c._radial_gradient = /^r(?:\(([^,]+?)[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*,[\x09\x0a\x0b\x0c\x0d\x20\xa0\u1680\u180e\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u202f\u205f\u3000\u2028\u2029]*([^\)]+?)\))?/, {}),
        lb = function (a, b) {
            return _(a) - _(b)
        },
        mb = function () {},
        nb = function (a) {
            return a
        },
        ob = c._rectPath = function (a, b, c, d, e) {
            return e ? [["M", a + e, b], ["l", c - 2 * e, 0], ["a", e, e, 0, 0, 1, e, e], ["l", 0, d - 2 * e], ["a", e, e, 0, 0, 1, -e, e], ["l", 2 * e - c, 0], ["a", e, e, 0, 0, 1, -e, -e], ["l", 0, 2 * e - d], ["a", e, e, 0, 0, 1, e, -e], ["z"]] : [["M", a, b], ["l", c, 0], ["l", 0, d], ["l", -c, 0], ["z"]]
        },
        pb = function (a, b, c, d) {
            return null == d && (d = c), [["M", a, b], ["m", 0, -d], ["a", c, d, 0, 1, 1, 0, 2 * d], ["a", c, d, 0, 1, 1, 0, -2 * d], ["z"]]
        },
        qb = c._getPath = {
            path: function (a) {
                return a.attr("path")
            },
            circle: function (a) {
                var b = a.attrs;
                return pb(b.cx, b.cy, b.r)
            },
            ellipse: function (a) {
                var b = a.attrs;
                return pb(b.cx, b.cy, b.rx, b.ry)
            },
            rect: function (a) {
                var b = a.attrs;
                return ob(b.x, b.y, b.width, b.height, b.r)
            },
            image: function (a) {
                var b = a.attrs;
                return ob(b.x, b.y, b.width, b.height)
            },
            text: function (a) {
                var b = a._getBBox();
                return ob(b.x, b.y, b.width, b.height)
            },
            set: function (a) {
                var b = a._getBBox();
                return ob(b.x, b.y, b.width, b.height)
            }
        },
        rb = c.mapPath = function (a, b) {
            if (!b) return a;
            var c, d, e, f, g, h, i;
            for (a = Kb(a), e = 0, g = a.length; g > e; e++)
                for (i = a[e], f = 1, h = i.length; h > f; f += 2) c = b.x(i[f], i[f + 1]), d = b.y(i[f], i[f + 1]), i[f] = c, i[f + 1] = d;
            return a
        };
    if (c._g = A, c.type = A.win.SVGAngle || A.doc.implementation.hasFeature("http://www.w3.org/TR/SVG11/feature#BasicStructure", "1.1") ? "SVG" : "VML", "VML" == c.type) {
        var sb, tb = A.doc.createElement("div");
        if (tb.innerHTML = '<v:shape adj="1"/>', sb = tb.firstChild, sb.style.behavior = "url(#default#VML)", !sb || "object" != typeof sb.adj) return c.type = G;
        tb = null
    }
    c.svg = !(c.vml = "VML" == c.type), c._Paper = C, c.fn = v = C.prototype = c.prototype, c._id = 0, c._oid = 0, c.is = function (a, b) {
        return b = M.call(b), "finite" == b ? !Y[z](+a) : "array" == b ? a instanceof Array : "null" == b && null === a || b == typeof a && null !== a || "object" == b && a === Object(a) || "array" == b && Array.isArray && Array.isArray(a) || W.call(a).slice(8, -1).toLowerCase() == b
    }, c.angle = function (a, b, d, e, f, g) {
        if (null == f) {
            var h = a - d,
                i = b - e;
            return h || i ? (180 + 180 * N.atan2(-i, -h) / S + 360) % 360 : 0
        }
        return c.angle(a, b, f, g) - c.angle(d, e, f, g)
    }, c.rad = function (a) {
        return a % 360 * S / 180
    }, c.deg = function (a) {
        return 180 * a / S % 360
    }, c.snapTo = function (a, b, d) {
        if (d = c.is(d, "finite") ? d : 10, c.is(a, V)) {
            for (var e = a.length; e--;)
                if (Q(a[e] - b) <= d) return a[e]
        } else {
            a = +a;
            var f = b % a;
            if (d > f) return b - f;
            if (f > a - d) return b - f + a
        }
        return b
    }, c.createUUID = function (a, b) {
        return function () {
            return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(a, b).toUpperCase()
        }
    }(/[xy]/g, function (a) {
        var b = 0 | 16 * N.random(),
            c = "x" == a ? b : 8 | 3 & b;
        return c.toString(16)
    }), c.setWindow = function (a) {
        b("raphael.setWindow", c, A.win, a), A.win = a, A.doc = A.win.document, c._engine.initWin && c._engine.initWin(A.win)
    };
    var ub = function (a) {
            if (c.vml) {
                var b, d = /^\s+|\s+$/g;
                try {
                    var e = new ActiveXObject("htmlfile");
                    e.write("<body>"), e.close(), b = e.body
                } catch (g) {
                    b = createPopup().document.body
                }
                var h = b.createTextRange();
                ub = f(function (a) {
                    try {
                        b.style.color = I(a).replace(d, G);
                        var c = h.queryCommandValue("ForeColor");
                        return c = (255 & c) << 16 | 65280 & c | (16711680 & c) >>> 16, "#" + ("000000" + c.toString(16)).slice(-6)
                    } catch (e) {
                        return "none"
                    }
                })
            } else {
                var i = A.doc.createElement("i");
                i.title = "Raphaël Colour Picker", i.style.display = "none", A.doc.body.appendChild(i), ub = f(function (a) {
                    return i.style.color = a, A.doc.defaultView.getComputedStyle(i, G).getPropertyValue("color")
                })
            }
            return ub(a)
        },
        vb = function () {
            return "hsb(" + [this.h, this.s, this.b] + ")"
        },
        wb = function () {
            return "hsl(" + [this.h, this.s, this.l] + ")"
        },
        xb = function () {
            return this.hex
        },
        yb = function (a, b, d) {
            if (null == b && c.is(a, "object") && "r" in a && "g" in a && "b" in a && (d = a.b, b = a.g, a = a.r), null == b && c.is(a, U)) {
                var e = c.getRGB(a);
                a = e.r, b = e.g, d = e.b
            }
            return (a > 1 || b > 1 || d > 1) && (a /= 255, b /= 255, d /= 255), [a, b, d]
        },
        zb = function (a, b, d, e) {
            a *= 255, b *= 255, d *= 255;
            var f = {
                r: a,
                g: b,
                b: d,
                hex: c.rgb(a, b, d),
                toString: xb
            };
            return c.is(e, "finite") && (f.opacity = e), f
        };
    c.color = function (a) {
        var b;
        return c.is(a, "object") && "h" in a && "s" in a && "b" in a ? (b = c.hsb2rgb(a), a.r = b.r, a.g = b.g, a.b = b.b, a.hex = b.hex) : c.is(a, "object") && "h" in a && "s" in a && "l" in a ? (b = c.hsl2rgb(a), a.r = b.r, a.g = b.g, a.b = b.b, a.hex = b.hex) : (c.is(a, "string") && (a = c.getRGB(a)), c.is(a, "object") && "r" in a && "g" in a && "b" in a ? (b = c.rgb2hsl(a), a.h = b.h, a.s = b.s, a.l = b.l, b = c.rgb2hsb(a), a.v = b.b) : (a = {
            hex: "none"
        }, a.r = a.g = a.b = a.h = a.s = a.v = a.l = -1)), a.toString = xb, a
    }, c.hsb2rgb = function (a, b, c, d) {
        this.is(a, "object") && "h" in a && "s" in a && "b" in a && (c = a.b, b = a.s, a = a.h, d = a.o), a *= 360;
        var e, f, g, h, i;
        return a = a % 360 / 60, i = c * b, h = i * (1 - Q(a % 2 - 1)), e = f = g = c - i, a = ~~a, e += [i, h, 0, 0, h, i][a], f += [h, i, i, h, 0, 0][a], g += [0, 0, h, i, i, h][a], zb(e, f, g, d)
    }, c.hsl2rgb = function (a, b, c, d) {
        this.is(a, "object") && "h" in a && "s" in a && "l" in a && (c = a.l, b = a.s, a = a.h), (a > 1 || b > 1 || c > 1) && (a /= 360, b /= 100, c /= 100), a *= 360;
        var e, f, g, h, i;
        return a = a % 360 / 60, i = 2 * b * (.5 > c ? c : 1 - c), h = i * (1 - Q(a % 2 - 1)), e = f = g = c - i / 2, a = ~~a, e += [i, h, 0, 0, h, i][a], f += [h, i, i, h, 0, 0][a], g += [0, 0, h, i, i, h][a], zb(e, f, g, d)
    }, c.rgb2hsb = function (a, b, c) {
        c = yb(a, b, c), a = c[0], b = c[1], c = c[2];
        var d, e, f, g;
        return f = O(a, b, c), g = f - P(a, b, c), d = 0 == g ? null : f == a ? (b - c) / g : f == b ? (c - a) / g + 2 : (a - b) / g + 4, d = 60 * ((d + 360) % 6) / 360, e = 0 == g ? 0 : g / f, {
            h: d,
            s: e,
            b: f,
            toString: vb
        }
    }, c.rgb2hsl = function (a, b, c) {
        c = yb(a, b, c), a = c[0], b = c[1], c = c[2];
        var d, e, f, g, h, i;
        return g = O(a, b, c), h = P(a, b, c), i = g - h, d = 0 == i ? null : g == a ? (b - c) / i : g == b ? (c - a) / i + 2 : (a - b) / i + 4, d = 60 * ((d + 360) % 6) / 360, f = (g + h) / 2, e = 0 == i ? 0 : .5 > f ? i / (2 * f) : i / (2 - 2 * f), {
            h: d,
            s: e,
            l: f,
            toString: wb
        }
    }, c._path2string = function () {
        return this.join(",").replace(gb, "$1")
    }, c._preload = function (a, b) {
        var c = A.doc.createElement("img");
        c.style.cssText = "position:absolute;left:-9999em;top:-9999em", c.onload = function () {
            b.call(this), this.onload = null, A.doc.body.removeChild(this)
        }, c.onerror = function () {
            A.doc.body.removeChild(this)
        }, A.doc.body.appendChild(c), c.src = a
    }, c.getRGB = f(function (a) {
        if (!a || (a = I(a)).indexOf("-") + 1) return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: g
        };
        if ("none" == a) return {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            toString: g
        };
        !(fb[z](a.toLowerCase().substring(0, 2)) || "#" == a.charAt()) && (a = ub(a));
        var b, d, e, f, h, i, j = a.match(X);
        return j ? (j[2] && (e = ab(j[2].substring(5), 16), d = ab(j[2].substring(3, 5), 16), b = ab(j[2].substring(1, 3), 16)), j[3] && (e = ab((h = j[3].charAt(3)) + h, 16), d = ab((h = j[3].charAt(2)) + h, 16), b = ab((h = j[3].charAt(1)) + h, 16)), j[4] && (i = j[4][J](eb), b = _(i[0]), "%" == i[0].slice(-1) && (b *= 2.55), d = _(i[1]), "%" == i[1].slice(-1) && (d *= 2.55), e = _(i[2]), "%" == i[2].slice(-1) && (e *= 2.55), "rgba" == j[1].toLowerCase().slice(0, 4) && (f = _(i[3])), i[3] && "%" == i[3].slice(-1) && (f /= 100)), j[5] ? (i = j[5][J](eb), b = _(i[0]), "%" == i[0].slice(-1) && (b *= 2.55), d = _(i[1]), "%" == i[1].slice(-1) && (d *= 2.55), e = _(i[2]), "%" == i[2].slice(-1) && (e *= 2.55), ("deg" == i[0].slice(-3) || "°" == i[0].slice(-1)) && (b /= 360), "hsba" == j[1].toLowerCase().slice(0, 4) && (f = _(i[3])), i[3] && "%" == i[3].slice(-1) && (f /= 100), c.hsb2rgb(b, d, e, f)) : j[6] ? (i = j[6][J](eb), b = _(i[0]), "%" == i[0].slice(-1) && (b *= 2.55), d = _(i[1]), "%" == i[1].slice(-1) && (d *= 2.55), e = _(i[2]), "%" == i[2].slice(-1) && (e *= 2.55), ("deg" == i[0].slice(-3) || "°" == i[0].slice(-1)) && (b /= 360), "hsla" == j[1].toLowerCase().slice(0, 4) && (f = _(i[3])), i[3] && "%" == i[3].slice(-1) && (f /= 100), c.hsl2rgb(b, d, e, f)) : (j = {
            r: b,
            g: d,
            b: e,
            toString: g
        }, j.hex = "#" + (16777216 | e | d << 8 | b << 16).toString(16).slice(1), c.is(f, "finite") && (j.opacity = f), j)) : {
            r: -1,
            g: -1,
            b: -1,
            hex: "none",
            error: 1,
            toString: g
        }
    }, c), c.hsb = f(function (a, b, d) {
        return c.hsb2rgb(a, b, d).hex
    }), c.hsl = f(function (a, b, d) {
        return c.hsl2rgb(a, b, d).hex
    }), c.rgb = f(function (a, b, c) {
        return "#" + (16777216 | c | b << 8 | a << 16).toString(16).slice(1)
    }), c.getColor = function (a) {
        var b = this.getColor.start = this.getColor.start || {
                h: 0,
                s: 1,
                b: a || .75
            },
            c = this.hsb2rgb(b.h, b.s, b.b);
        return b.h += .075, b.h > 1 && (b.h = 0, b.s -= .2, b.s <= 0 && (this.getColor.start = {
            h: 0,
            s: 1,
            b: b.b
        })), c.hex
    }, c.getColor.reset = function () {
        delete this.start
    }, c.parsePathString = function (a) {
        if (!a) return null;
        var b = Ab(a);
        if (b.arr) return Cb(b.arr);
        var d = {
                a: 7,
                c: 6,
                h: 1,
                l: 2,
                m: 2,
                r: 4,
                q: 4,
                s: 4,
                t: 2,
                v: 1,
                z: 0
            },
            e = [];
        return c.is(a, V) && c.is(a[0], V) && (e = Cb(a)), e.length || I(a).replace(hb, function (a, b, c) {
            var f = [],
                g = b.toLowerCase();
            if (c.replace(jb, function (a, b) {
                b && f.push(+b)
            }), "m" == g && f.length > 2 && (e.push([b][E](f.splice(0, 2))), g = "l", b = "m" == b ? "l" : "L"), "r" == g) e.push([b][E](f));
            else
                for (; f.length >= d[g] && (e.push([b][E](f.splice(0, d[g]))), d[g]););
        }), e.toString = c._path2string, b.arr = Cb(e), e
    }, c.parseTransformString = f(function (a) {
        if (!a) return null;
        var b = [];
        return c.is(a, V) && c.is(a[0], V) && (b = Cb(a)), b.length || I(a).replace(ib, function (a, c, d) {
            var e = [];
            M.call(c), d.replace(jb, function (a, b) {
                b && e.push(+b)
            }), b.push([c][E](e))
        }), b.toString = c._path2string, b
    });
    var Ab = function (a) {
        var b = Ab.ps = Ab.ps || {};
        return b[a] ? b[a].sleep = 100 : b[a] = {
            sleep: 100
        }, setTimeout(function () {
            for (var c in b) b[z](c) && c != a && (b[c].sleep--, !b[c].sleep && delete b[c])
        }), b[a]
    };
    c.findDotsAtSegment = function (a, b, c, d, e, f, g, h, i) {
        var j = 1 - i,
            k = R(j, 3),
            l = R(j, 2),
            m = i * i,
            n = m * i,
            o = k * a + 3 * l * i * c + 3 * j * i * i * e + n * g,
            p = k * b + 3 * l * i * d + 3 * j * i * i * f + n * h,
            q = a + 2 * i * (c - a) + m * (e - 2 * c + a),
            r = b + 2 * i * (d - b) + m * (f - 2 * d + b),
            s = c + 2 * i * (e - c) + m * (g - 2 * e + c),
            t = d + 2 * i * (f - d) + m * (h - 2 * f + d),
            u = j * a + i * c,
            v = j * b + i * d,
            w = j * e + i * g,
            x = j * f + i * h,
            y = 90 - 180 * N.atan2(q - s, r - t) / S;
        return (q > s || t > r) && (y += 180), {
            x: o,
            y: p,
            m: {
                x: q,
                y: r
            },
            n: {
                x: s,
                y: t
            },
            start: {
                x: u,
                y: v
            },
            end: {
                x: w,
                y: x
            },
            alpha: y
        }
    }, c.bezierBBox = function (a, b, d, e, f, g, h, i) {
        c.is(a, "array") || (a = [a, b, d, e, f, g, h, i]);
        var j = Jb.apply(null, a);
        return {
            x: j.min.x,
            y: j.min.y,
            x2: j.max.x,
            y2: j.max.y,
            width: j.max.x - j.min.x,
            height: j.max.y - j.min.y
        }
    }, c.isPointInsideBBox = function (a, b, c) {
        return b >= a.x && b <= a.x2 && c >= a.y && c <= a.y2
    }, c.isBBoxIntersect = function (a, b) {
        var d = c.isPointInsideBBox;
        return d(b, a.x, a.y) || d(b, a.x2, a.y) || d(b, a.x, a.y2) || d(b, a.x2, a.y2) || d(a, b.x, b.y) || d(a, b.x2, b.y) || d(a, b.x, b.y2) || d(a, b.x2, b.y2) || (a.x < b.x2 && a.x > b.x || b.x < a.x2 && b.x > a.x) && (a.y < b.y2 && a.y > b.y || b.y < a.y2 && b.y > a.y)
    }, c.pathIntersection = function (a, b) {
        return n(a, b)
    }, c.pathIntersectionNumber = function (a, b) {
        return n(a, b, 1)
    }, c.isPointInsidePath = function (a, b, d) {
        var e = c.pathBBox(a);
        return c.isPointInsideBBox(e, b, d) && 1 == n(a, [["M", b, d], ["H", e.x2 + 10]], 1) % 2
    }, c._removedFactory = function (a) {
        return function () {
            b("raphael.log", null, "Raphaël: you are calling to method “" + a + "” of removed object", a)
        }
    };
    var Bb = c.pathBBox = function (a) {
            var b = Ab(a);
            if (b.bbox) return d(b.bbox);
            if (!a) return {
                x: 0,
                y: 0,
                width: 0,
                height: 0,
                x2: 0,
                y2: 0
            };
            a = Kb(a);
            for (var c, e = 0, f = 0, g = [], h = [], i = 0, j = a.length; j > i; i++)
                if (c = a[i], "M" == c[0]) e = c[1], f = c[2], g.push(e), h.push(f);
                else {
                    var k = Jb(e, f, c[1], c[2], c[3], c[4], c[5], c[6]);
                    g = g[E](k.min.x, k.max.x), h = h[E](k.min.y, k.max.y), e = c[5], f = c[6]
                }
            var l = P[D](0, g),
                m = P[D](0, h),
                n = O[D](0, g),
                o = O[D](0, h),
                p = n - l,
                q = o - m,
                r = {
                    x: l,
                    y: m,
                    x2: n,
                    y2: o,
                    width: p,
                    height: q,
                    cx: l + p / 2,
                    cy: m + q / 2
                };
            return b.bbox = d(r), r
        },
        Cb = function (a) {
            var b = d(a);
            return b.toString = c._path2string, b
        },
        Db = c._pathToRelative = function (a) {
            var b = Ab(a);
            if (b.rel) return Cb(b.rel);
            c.is(a, V) && c.is(a && a[0], V) || (a = c.parsePathString(a));
            var d = [],
                e = 0,
                f = 0,
                g = 0,
                h = 0,
                i = 0;
            "M" == a[0][0] && (e = a[0][1], f = a[0][2], g = e, h = f, i++, d.push(["M", e, f]));
            for (var j = i, k = a.length; k > j; j++) {
                var l = d[j] = [],
                    m = a[j];
                if (m[0] != M.call(m[0])) switch (l[0] = M.call(m[0]), l[0]) {
                case "a":
                    l[1] = m[1], l[2] = m[2], l[3] = m[3], l[4] = m[4], l[5] = m[5], l[6] = +(m[6] - e).toFixed(3), l[7] = +(m[7] - f).toFixed(3);
                    break;
                case "v":
                    l[1] = +(m[1] - f).toFixed(3);
                    break;
                case "m":
                    g = m[1], h = m[2];
                default:
                    for (var n = 1, o = m.length; o > n; n++) l[n] = +(m[n] - (n % 2 ? e : f)).toFixed(3)
                } else {
                    l = d[j] = [], "m" == m[0] && (g = m[1] + e, h = m[2] + f);
                    for (var p = 0, q = m.length; q > p; p++) d[j][p] = m[p]
                }
                var r = d[j].length;
                switch (d[j][0]) {
                case "z":
                    e = g, f = h;
                    break;
                case "h":
                    e += +d[j][r - 1];
                    break;
                case "v":
                    f += +d[j][r - 1];
                    break;
                default:
                    e += +d[j][r - 2], f += +d[j][r - 1]
                }
            }
            return d.toString = c._path2string, b.rel = Cb(d), d
        },
        Eb = c._pathToAbsolute = function (a) {
            var b = Ab(a);
            if (b.abs) return Cb(b.abs);
            if (c.is(a, V) && c.is(a && a[0], V) || (a = c.parsePathString(a)), !a || !a.length) return [["M", 0, 0]];
            var d = [],
                e = 0,
                f = 0,
                g = 0,
                i = 0,
                j = 0;
            "M" == a[0][0] && (e = +a[0][1], f = +a[0][2], g = e, i = f, j++, d[0] = ["M", e, f]);
            for (var k, l, m = 3 == a.length && "M" == a[0][0] && "R" == a[1][0].toUpperCase() && "Z" == a[2][0].toUpperCase(), n = j, o = a.length; o > n; n++) {
                if (d.push(k = []), l = a[n], l[0] != bb.call(l[0])) switch (k[0] = bb.call(l[0]), k[0]) {
                    case "A":
                        k[1] = l[1], k[2] = l[2], k[3] = l[3], k[4] = l[4], k[5] = l[5], k[6] = +(l[6] + e), k[7] = +(l[7] + f);
                        break;
                    case "V":
                        k[1] = +l[1] + f;
                        break;
                    case "H":
                        k[1] = +l[1] + e;
                        break;
                    case "R":
                        for (var p = [e, f][E](l.slice(1)), q = 2, r = p.length; r > q; q++) p[q] = +p[q] + e, p[++q] = +p[q] + f;
                        d.pop(), d = d[E](h(p, m));
                        break;
                    case "M":
                        g = +l[1] + e, i = +l[2] + f;
                    default:
                        for (q = 1, r = l.length; r > q; q++) k[q] = +l[q] + (q % 2 ? e : f)
                    } else if ("R" == l[0]) p = [e, f][E](l.slice(1)), d.pop(), d = d[E](h(p, m)), k = ["R"][E](l.slice(-2));
                    else
                        for (var s = 0, t = l.length; t > s; s++) k[s] = l[s];
                switch (k[0]) {
                case "Z":
                    e = g, f = i;
                    break;
                case "H":
                    e = k[1];
                    break;
                case "V":
                    f = k[1];
                    break;
                case "M":
                    g = k[k.length - 2], i = k[k.length - 1];
                default:
                    e = k[k.length - 2], f = k[k.length - 1]
                }
            }
            return d.toString = c._path2string, b.abs = Cb(d), d
        },
        Fb = function (a, b, c, d) {
            return [a, b, c, d, c, d]
        },
        Gb = function (a, b, c, d, e, f) {
            var g = 1 / 3,
                h = 2 / 3;
            return [g * a + h * c, g * b + h * d, g * e + h * c, g * f + h * d, e, f]
        },
        Hb = function (a, b, c, d, e, g, h, i, j, k) {
            var l, m = 120 * S / 180,
                n = S / 180 * (+e || 0),
                o = [],
                p = f(function (a, b, c) {
                    var d = a * N.cos(c) - b * N.sin(c),
                        e = a * N.sin(c) + b * N.cos(c);
                    return {
                        x: d,
                        y: e
                    }
                });
            if (k) y = k[0], z = k[1], w = k[2], x = k[3];
            else {
                l = p(a, b, -n), a = l.x, b = l.y, l = p(i, j, -n), i = l.x, j = l.y;
                var q = (N.cos(S / 180 * e), N.sin(S / 180 * e), (a - i) / 2),
                    r = (b - j) / 2,
                    s = q * q / (c * c) + r * r / (d * d);
                s > 1 && (s = N.sqrt(s), c = s * c, d = s * d);
                var t = c * c,
                    u = d * d,
                    v = (g == h ? -1 : 1) * N.sqrt(Q((t * u - t * r * r - u * q * q) / (t * r * r + u * q * q))),
                    w = v * c * r / d + (a + i) / 2,
                    x = v * -d * q / c + (b + j) / 2,
                    y = N.asin(((b - x) / d).toFixed(9)),
                    z = N.asin(((j - x) / d).toFixed(9));
                y = w > a ? S - y : y, z = w > i ? S - z : z, 0 > y && (y = 2 * S + y), 0 > z && (z = 2 * S + z), h && y > z && (y -= 2 * S), !h && z > y && (z -= 2 * S)
            }
            var A = z - y;
            if (Q(A) > m) {
                var B = z,
                    C = i,
                    D = j;
                z = y + m * (h && z > y ? 1 : -1), i = w + c * N.cos(z), j = x + d * N.sin(z), o = Hb(i, j, c, d, e, 0, h, C, D, [z, B, w, x])
            }
            A = z - y;
            var F = N.cos(y),
                G = N.sin(y),
                H = N.cos(z),
                I = N.sin(z),
                K = N.tan(A / 4),
                L = 4 / 3 * c * K,
                M = 4 / 3 * d * K,
                O = [a, b],
                P = [a + L * G, b - M * F],
                R = [i + L * I, j - M * H],
                T = [i, j];
            if (P[0] = 2 * O[0] - P[0], P[1] = 2 * O[1] - P[1], k) return [P, R, T][E](o);
            o = [P, R, T][E](o).join()[J](",");
            for (var U = [], V = 0, W = o.length; W > V; V++) U[V] = V % 2 ? p(o[V - 1], o[V], n).y : p(o[V], o[V + 1], n).x;
            return U
        },
        Ib = function (a, b, c, d, e, f, g, h, i) {
            var j = 1 - i;
            return {
                x: R(j, 3) * a + 3 * R(j, 2) * i * c + 3 * j * i * i * e + R(i, 3) * g,
                y: R(j, 3) * b + 3 * R(j, 2) * i * d + 3 * j * i * i * f + R(i, 3) * h
            }
        },
        Jb = f(function (a, b, c, d, e, f, g, h) {
            var i, j = e - 2 * c + a - (g - 2 * e + c),
                k = 2 * (c - a) - 2 * (e - c),
                l = a - c,
                m = (-k + N.sqrt(k * k - 4 * j * l)) / 2 / j,
                n = (-k - N.sqrt(k * k - 4 * j * l)) / 2 / j,
                o = [b, h],
                p = [a, g];
            return Q(m) > "1e12" && (m = .5), Q(n) > "1e12" && (n = .5), m > 0 && 1 > m && (i = Ib(a, b, c, d, e, f, g, h, m), p.push(i.x), o.push(i.y)), n > 0 && 1 > n && (i = Ib(a, b, c, d, e, f, g, h, n), p.push(i.x), o.push(i.y)), j = f - 2 * d + b - (h - 2 * f + d), k = 2 * (d - b) - 2 * (f - d), l = b - d, m = (-k + N.sqrt(k * k - 4 * j * l)) / 2 / j, n = (-k - N.sqrt(k * k - 4 * j * l)) / 2 / j, Q(m) > "1e12" && (m = .5), Q(n) > "1e12" && (n = .5), m > 0 && 1 > m && (i = Ib(a, b, c, d, e, f, g, h, m), p.push(i.x), o.push(i.y)), n > 0 && 1 > n && (i = Ib(a, b, c, d, e, f, g, h, n), p.push(i.x), o.push(i.y)), {
                min: {
                    x: P[D](0, p),
                    y: P[D](0, o)
                },
                max: {
                    x: O[D](0, p),
                    y: O[D](0, o)
                }
            }
        }),
        Kb = c._path2curve = f(function (a, b) {
            var c = !b && Ab(a);
            if (!b && c.curve) return Cb(c.curve);
            for (var d = Eb(a), e = b && Eb(b), f = {
                x: 0,
                y: 0,
                bx: 0,
                by: 0,
                X: 0,
                Y: 0,
                qx: null,
                qy: null
            }, g = {
                x: 0,
                y: 0,
                bx: 0,
                by: 0,
                X: 0,
                Y: 0,
                qx: null,
                qy: null
            }, h = (function (a, b, c) {
                var d, e;
                if (!a) return ["C", b.x, b.y, b.x, b.y, b.x, b.y];
                switch (!(a[0] in {
                    T: 1,
                    Q: 1
                }) && (b.qx = b.qy = null), a[0]) {
                case "M":
                    b.X = a[1], b.Y = a[2];
                    break;
                case "A":
                    a = ["C"][E](Hb[D](0, [b.x, b.y][E](a.slice(1))));
                    break;
                case "S":
                    "C" == c || "S" == c ? (d = 2 * b.x - b.bx, e = 2 * b.y - b.by) : (d = b.x, e = b.y), a = ["C", d, e][E](a.slice(1));
                    break;
                case "T":
                    "Q" == c || "T" == c ? (b.qx = 2 * b.x - b.qx, b.qy = 2 * b.y - b.qy) : (b.qx = b.x, b.qy = b.y), a = ["C"][E](Gb(b.x, b.y, b.qx, b.qy, a[1], a[2]));
                    break;
                case "Q":
                    b.qx = a[1], b.qy = a[2], a = ["C"][E](Gb(b.x, b.y, a[1], a[2], a[3], a[4]));
                    break;
                case "L":
                    a = ["C"][E](Fb(b.x, b.y, a[1], a[2]));
                    break;
                case "H":
                    a = ["C"][E](Fb(b.x, b.y, a[1], b.y));
                    break;
                case "V":
                    a = ["C"][E](Fb(b.x, b.y, b.x, a[1]));
                    break;
                case "Z":
                    a = ["C"][E](Fb(b.x, b.y, b.X, b.Y))
                }
                return a
            }), i = function (a, b) {
                if (a[b].length > 7) {
                    a[b].shift();
                    for (var c = a[b]; c.length;) a.splice(b++, 0, ["C"][E](c.splice(0, 6)));
                    a.splice(b, 1), l = O(d.length, e && e.length || 0)
                }
            }, j = function (a, b, c, f, g) {
                a && b && "M" == a[g][0] && "M" != b[g][0] && (b.splice(g, 0, ["M", f.x, f.y]), c.bx = 0, c.by = 0, c.x = a[g][1], c.y = a[g][2], l = O(d.length, e && e.length || 0))
            }, k = 0, l = O(d.length, e && e.length || 0); l > k; k++) {
                d[k] = h(d[k], f), i(d, k), e && (e[k] = h(e[k], g)), e && i(e, k), j(d, e, f, g, k), j(e, d, g, f, k);
                var m = d[k],
                    n = e && e[k],
                    o = m.length,
                    p = e && n.length;
                f.x = m[o - 2], f.y = m[o - 1], f.bx = _(m[o - 4]) || f.x, f.by = _(m[o - 3]) || f.y, g.bx = e && (_(n[p - 4]) || g.x), g.by = e && (_(n[p - 3]) || g.y), g.x = e && n[p - 2], g.y = e && n[p - 1]
            }
            return e || (c.curve = Cb(d)), e ? [d, e] : d
        }, null, Cb),
        Lb = (c._parseDots = f(function (a) {
            for (var b = [], d = 0, e = a.length; e > d; d++) {
                var f = {},
                    g = a[d].match(/^([^:]*):?([\d\.]*)/);
                if (f.color = c.getRGB(g[1]), f.color.error) return null;
                f.color = f.color.hex, g[2] && (f.offset = g[2] + "%"), b.push(f)
            }
            for (d = 1, e = b.length - 1; e > d; d++)
                if (!b[d].offset) {
                    for (var h = _(b[d - 1].offset || 0), i = 0, j = d + 1; e > j; j++)
                        if (b[j].offset) {
                            i = b[j].offset;
                            break
                        }
                    i || (i = 100, j = e), i = _(i);
                    for (var k = (i - h) / (j - d + 1); j > d; d++) h += k, b[d].offset = h + "%"
                }
            return b
        }), c._tear = function (a, b) {
            a == b.top && (b.top = a.prev), a == b.bottom && (b.bottom = a.next), a.next && (a.next.prev = a.prev), a.prev && (a.prev.next = a.next)
        }),
        Mb = (c._tofront = function (a, b) {
            b.top !== a && (Lb(a, b), a.next = null, a.prev = b.top, b.top.next = a, b.top = a)
        }, c._toback = function (a, b) {
            b.bottom !== a && (Lb(a, b), a.next = b.bottom, a.prev = null, b.bottom.prev = a, b.bottom = a)
        }, c._insertafter = function (a, b, c) {
            Lb(a, c), b == c.top && (c.top = a), b.next && (b.next.prev = a), a.next = b.next, a.prev = b, b.next = a
        }, c._insertbefore = function (a, b, c) {
            Lb(a, c), b == c.bottom && (c.bottom = a), b.prev && (b.prev.next = a), a.prev = b.prev, b.prev = a, a.next = b
        }, c.toMatrix = function (a, b) {
            var c = Bb(a),
                d = {
                    _: {
                        transform: G
                    },
                    getBBox: function () {
                        return c
                    }
                };
            return Nb(d, b), d.matrix
        }),
        Nb = (c.transformPath = function (a, b) {
            return rb(a, Mb(a, b))
        }, c._extractTransform = function (a, b) {
            if (null == b) return a._.transform;
            b = I(b).replace(/\.{3}|\u2026/g, a._.transform || G);
            var d = c.parseTransformString(b),
                e = 0,
                f = 0,
                g = 0,
                h = 1,
                i = 1,
                j = a._,
                k = new o;
            if (j.transform = d || [], d)
                for (var l = 0, m = d.length; m > l; l++) {
                    var n, p, q, r, s, t = d[l],
                        u = t.length,
                        v = I(t[0]).toLowerCase(),
                        w = t[0] != v,
                        x = w ? k.invert() : 0;
                    "t" == v && 3 == u ? w ? (n = x.x(0, 0), p = x.y(0, 0), q = x.x(t[1], t[2]), r = x.y(t[1], t[2]), k.translate(q - n, r - p)) : k.translate(t[1], t[2]) : "r" == v ? 2 == u ? (s = s || a.getBBox(1), k.rotate(t[1], s.x + s.width / 2, s.y + s.height / 2), e += t[1]) : 4 == u && (w ? (q = x.x(t[2], t[3]), r = x.y(t[2], t[3]), k.rotate(t[1], q, r)) : k.rotate(t[1], t[2], t[3]), e += t[1]) : "s" == v ? 2 == u || 3 == u ? (s = s || a.getBBox(1), k.scale(t[1], t[u - 1], s.x + s.width / 2, s.y + s.height / 2), h *= t[1], i *= t[u - 1]) : 5 == u && (w ? (q = x.x(t[3], t[4]), r = x.y(t[3], t[4]), k.scale(t[1], t[2], q, r)) : k.scale(t[1], t[2], t[3], t[4]), h *= t[1], i *= t[2]) : "m" == v && 7 == u && k.add(t[1], t[2], t[3], t[4], t[5], t[6]), j.dirtyT = 1, a.matrix = k
                }
            a.matrix = k, j.sx = h, j.sy = i, j.deg = e, j.dx = f = k.e, j.dy = g = k.f, 1 == h && 1 == i && !e && j.bbox ? (j.bbox.x += +f, j.bbox.y += +g) : j.dirtyT = 1
        }),
        Ob = function (a) {
            var b = a[0];
            switch (b.toLowerCase()) {
            case "t":
                return [b, 0, 0];
            case "m":
                return [b, 1, 0, 0, 1, 0, 0];
            case "r":
                return 4 == a.length ? [b, 0, a[2], a[3]] : [b, 0];
            case "s":
                return 5 == a.length ? [b, 1, 1, a[3], a[4]] : 3 == a.length ? [b, 1, 1] : [b, 1]
            }
        },
        Pb = c._equaliseTransform = function (a, b) {
            b = I(b).replace(/\.{3}|\u2026/g, a), a = c.parseTransformString(a) || [], b = c.parseTransformString(b) || [];
            for (var d, e, f, g, h = O(a.length, b.length), i = [], j = [], k = 0; h > k; k++) {
                if (f = a[k] || Ob(b[k]), g = b[k] || Ob(f), f[0] != g[0] || "r" == f[0].toLowerCase() && (f[2] != g[2] || f[3] != g[3]) || "s" == f[0].toLowerCase() && (f[3] != g[3] || f[4] != g[4])) return;
                for (i[k] = [], j[k] = [], d = 0, e = O(f.length, g.length); e > d; d++) d in f && (i[k][d] = f[d]), d in g && (j[k][d] = g[d])
            }
            return {
                from: i,
                to: j
            }
        };
    c._getContainer = function (a, b, d, e) {
        var f;
        return f = null != e || c.is(a, "object") ? a : A.doc.getElementById(a), null != f ? f.tagName ? null == b ? {
            container: f,
            width: f.style.pixelWidth || f.offsetWidth,
            height: f.style.pixelHeight || f.offsetHeight
        } : {
            container: f,
            width: b,
            height: d
        } : {
            container: 1,
            x: a,
            y: b,
            width: d,
            height: e
        } : void 0
    }, c.pathToRelative = Db, c._engine = {}, c.path2curve = Kb, c.matrix = function (a, b, c, d, e, f) {
        return new o(a, b, c, d, e, f)
    },
    function (a) {
        function b(a) {
            return a[0] * a[0] + a[1] * a[1]
        }

        function d(a) {
            var c = N.sqrt(b(a));
            a[0] && (a[0] /= c), a[1] && (a[1] /= c)
        }
        a.add = function (a, b, c, d, e, f) {
            var g, h, i, j, k = [[], [], []],
                l = [[this.a, this.c, this.e], [this.b, this.d, this.f], [0, 0, 1]],
                m = [[a, c, e], [b, d, f], [0, 0, 1]];
            for (a && a instanceof o && (m = [[a.a, a.c, a.e], [a.b, a.d, a.f], [0, 0, 1]]), g = 0; 3 > g; g++)
                for (h = 0; 3 > h; h++) {
                    for (j = 0, i = 0; 3 > i; i++) j += l[g][i] * m[i][h];
                    k[g][h] = j
                }
            this.a = k[0][0], this.b = k[1][0], this.c = k[0][1], this.d = k[1][1], this.e = k[0][2], this.f = k[1][2]
        }, a.invert = function () {
            var a = this,
                b = a.a * a.d - a.b * a.c;
            return new o(a.d / b, -a.b / b, -a.c / b, a.a / b, (a.c * a.f - a.d * a.e) / b, (a.b * a.e - a.a * a.f) / b)
        }, a.clone = function () {
            return new o(this.a, this.b, this.c, this.d, this.e, this.f)
        }, a.translate = function (a, b) {
            this.add(1, 0, 0, 1, a, b)
        }, a.scale = function (a, b, c, d) {
            null == b && (b = a), (c || d) && this.add(1, 0, 0, 1, c, d), this.add(a, 0, 0, b, 0, 0), (c || d) && this.add(1, 0, 0, 1, -c, -d)
        }, a.rotate = function (a, b, d) {
            a = c.rad(a), b = b || 0, d = d || 0;
            var e = +N.cos(a).toFixed(9),
                f = +N.sin(a).toFixed(9);
            this.add(e, f, -f, e, b, d), this.add(1, 0, 0, 1, -b, -d)
        }, a.x = function (a, b) {
            return a * this.a + b * this.c + this.e
        }, a.y = function (a, b) {
            return a * this.b + b * this.d + this.f
        }, a.get = function (a) {
            return +this[I.fromCharCode(97 + a)].toFixed(4)
        }, a.toString = function () {
            return c.svg ? "matrix(" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)].join() + ")" : [this.get(0), this.get(2), this.get(1), this.get(3), 0, 0].join()
        }, a.toFilter = function () {
            return "progid:DXImageTransform.Microsoft.Matrix(M11=" + this.get(0) + ", M12=" + this.get(2) + ", M21=" + this.get(1) + ", M22=" + this.get(3) + ", Dx=" + this.get(4) + ", Dy=" + this.get(5) + ", sizingmethod='auto expand')"
        }, a.offset = function () {
            return [this.e.toFixed(4), this.f.toFixed(4)]
        }, a.split = function () {
            var a = {};
            a.dx = this.e, a.dy = this.f;
            var e = [[this.a, this.c], [this.b, this.d]];
            a.scalex = N.sqrt(b(e[0])), d(e[0]), a.shear = e[0][0] * e[1][0] + e[0][1] * e[1][1], e[1] = [e[1][0] - e[0][0] * a.shear, e[1][1] - e[0][1] * a.shear], a.scaley = N.sqrt(b(e[1])), d(e[1]), a.shear /= a.scaley;
            var f = -e[0][1],
                g = e[1][1];
            return 0 > g ? (a.rotate = c.deg(N.acos(g)), 0 > f && (a.rotate = 360 - a.rotate)) : a.rotate = c.deg(N.asin(f)), a.isSimple = !(+a.shear.toFixed(9) || a.scalex.toFixed(9) != a.scaley.toFixed(9) && a.rotate), a.isSuperSimple = !+a.shear.toFixed(9) && a.scalex.toFixed(9) == a.scaley.toFixed(9) && !a.rotate, a.noRotation = !+a.shear.toFixed(9) && !a.rotate, a
        }, a.toTransformString = function (a) {
            var b = a || this[J]();
            return b.isSimple ? (b.scalex = +b.scalex.toFixed(4), b.scaley = +b.scaley.toFixed(4), b.rotate = +b.rotate.toFixed(4), (b.dx || b.dy ? "t" + [b.dx, b.dy] : G) + (1 != b.scalex || 1 != b.scaley ? "s" + [b.scalex, b.scaley, 0, 0] : G) + (b.rotate ? "r" + [b.rotate, 0, 0] : G)) : "m" + [this.get(0), this.get(1), this.get(2), this.get(3), this.get(4), this.get(5)]
        }
    }(o.prototype);
    var Qb = navigator.userAgent.match(/Version\/(.*?)\s/) || navigator.userAgent.match(/Chrome\/(\d+)/);
    v.safari = "Apple Computer, Inc." == navigator.vendor && (Qb && Qb[1] < 4 || "iP" == navigator.platform.slice(0, 2)) || "Google Inc." == navigator.vendor && Qb && Qb[1] < 8 ? function () {
        var a = this.rect(-99, -99, this.width + 99, this.height + 99).attr({
            stroke: "none"
        });
        setTimeout(function () {
            a.remove()
        })
    } : mb;
    for (var Rb = function () {
        this.returnValue = !1
    }, Sb = function () {
        return this.originalEvent.preventDefault()
    }, Tb = function () {
        this.cancelBubble = !0
    }, Ub = function () {
        return this.originalEvent.stopPropagation()
    }, Vb = function (a) {
        var b = A.doc.documentElement.scrollTop || A.doc.body.scrollTop,
            c = A.doc.documentElement.scrollLeft || A.doc.body.scrollLeft;
        return {
            x: a.clientX + c,
            y: a.clientY + b
        }
    }, Wb = function () {
        return A.doc.addEventListener ? function (a, b, c, d) {
            var e = function (a) {
                var b = Vb(a);
                return c.call(d, a, b.x, b.y)
            };
            if (a.addEventListener(b, e, !1), F && L[b]) {
                var f = function (b) {
                    for (var e = Vb(b), f = b, g = 0, h = b.targetTouches && b.targetTouches.length; h > g; g++)
                        if (b.targetTouches[g].target == a) {
                            b = b.targetTouches[g], b.originalEvent = f, b.preventDefault = Sb, b.stopPropagation = Ub;
                            break
                        }
                    return c.call(d, b, e.x, e.y)
                };
                a.addEventListener(L[b], f, !1)
            }
            return function () {
                return a.removeEventListener(b, e, !1), F && L[b] && a.removeEventListener(L[b], e, !1), !0
            }
        } : A.doc.attachEvent ? function (a, b, c, d) {
            var e = function (a) {
                a = a || A.win.event;
                var b = A.doc.documentElement.scrollTop || A.doc.body.scrollTop,
                    e = A.doc.documentElement.scrollLeft || A.doc.body.scrollLeft,
                    f = a.clientX + e,
                    g = a.clientY + b;
                return a.preventDefault = a.preventDefault || Rb, a.stopPropagation = a.stopPropagation || Tb, c.call(d, a, f, g)
            };
            a.attachEvent("on" + b, e);
            var f = function () {
                return a.detachEvent("on" + b, e), !0
            };
            return f
        } : void 0
    }(), Xb = [], Yb = function (a) {
        for (var c, d = a.clientX, e = a.clientY, f = A.doc.documentElement.scrollTop || A.doc.body.scrollTop, g = A.doc.documentElement.scrollLeft || A.doc.body.scrollLeft, h = Xb.length; h--;) {
            if (c = Xb[h], F && a.touches) {
                for (var i, j = a.touches.length; j--;)
                    if (i = a.touches[j], i.identifier == c.el._drag.id) {
                        d = i.clientX, e = i.clientY, (a.originalEvent ? a.originalEvent : a).preventDefault();
                        break
                    }
            } else a.preventDefault();
            var k, l = c.el.node,
                m = l.nextSibling,
                n = l.parentNode,
                o = l.style.display;
            A.win.opera && n.removeChild(l), l.style.display = "none", k = c.el.paper.getElementByPoint(d, e), l.style.display = o, A.win.opera && (m ? n.insertBefore(l, m) : n.appendChild(l)), k && b("raphael.drag.over." + c.el.id, c.el, k), d += g, e += f, b("raphael.drag.move." + c.el.id, c.move_scope || c.el, d - c.el._drag.x, e - c.el._drag.y, d, e, a)
        }
    }, Zb = function (a) {
        c.unmousemove(Yb).unmouseup(Zb);
        for (var d, e = Xb.length; e--;) d = Xb[e], d.el._drag = {}, b("raphael.drag.end." + d.el.id, d.end_scope || d.start_scope || d.move_scope || d.el, a);
        Xb = []
    }, $b = c.el = {}, _b = K.length; _b--;)! function (a) {
        c[a] = $b[a] = function (b, d) {
            return c.is(b, "function") && (this.events = this.events || [], this.events.push({
                name: a,
                f: b,
                unbind: Wb(this.shape || this.node || A.doc, a, b, d || this)
            })), this
        }, c["un" + a] = $b["un" + a] = function (b) {
            for (var d = this.events || [], e = d.length; e--;) d[e].name != a || !c.is(b, "undefined") && d[e].f != b || (d[e].unbind(), d.splice(e, 1), !d.length && delete this.events);
            return this
        }
    }(K[_b]);
    $b.data = function (a, d) {
        var e = kb[this.id] = kb[this.id] || {};
        if (0 == arguments.length) return e;
        if (1 == arguments.length) {
            if (c.is(a, "object")) {
                for (var f in a) a[z](f) && this.data(f, a[f]);
                return this
            }
            return b("raphael.data.get." + this.id, this, e[a], a), e[a]
        }
        return e[a] = d, b("raphael.data.set." + this.id, this, d, a), this
    }, $b.removeData = function (a) {
        return null == a ? kb[this.id] = {} : kb[this.id] && delete kb[this.id][a], this
    }, $b.getData = function () {
        return d(kb[this.id] || {})
    }, $b.hover = function (a, b, c, d) {
        return this.mouseover(a, c).mouseout(b, d || c)
    }, $b.unhover = function (a, b) {
        return this.unmouseover(a).unmouseout(b)
    };
    var ac = [];
    $b.drag = function (a, d, e, f, g, h) {
        function i(i) {
            (i.originalEvent || i).preventDefault();
            var j = i.clientX,
                k = i.clientY,
                l = A.doc.documentElement.scrollTop || A.doc.body.scrollTop,
                m = A.doc.documentElement.scrollLeft || A.doc.body.scrollLeft;
            if (this._drag.id = i.identifier, F && i.touches)
                for (var n, o = i.touches.length; o--;)
                    if (n = i.touches[o], this._drag.id = n.identifier, n.identifier == this._drag.id) {
                        j = n.clientX, k = n.clientY;
                        break
                    }
            this._drag.x = j + m, this._drag.y = k + l, !Xb.length && c.mousemove(Yb).mouseup(Zb), Xb.push({
                el: this,
                move_scope: f,
                start_scope: g,
                end_scope: h
            }), d && b.on("raphael.drag.start." + this.id, d), a && b.on("raphael.drag.move." + this.id, a), e && b.on("raphael.drag.end." + this.id, e), b("raphael.drag.start." + this.id, g || f || this, i.clientX + m, i.clientY + l, i)
        }
        return this._drag = {}, ac.push({
            el: this,
            start: i
        }), this.mousedown(i), this
    }, $b.onDragOver = function (a) {
        a ? b.on("raphael.drag.over." + this.id, a) : b.unbind("raphael.drag.over." + this.id)
    }, $b.undrag = function () {
        for (var a = ac.length; a--;) ac[a].el == this && (this.unmousedown(ac[a].start), ac.splice(a, 1), b.unbind("raphael.drag.*." + this.id));
        !ac.length && c.unmousemove(Yb).unmouseup(Zb), Xb = []
    }, v.circle = function (a, b, d) {
        var e = c._engine.circle(this, a || 0, b || 0, d || 0);
        return this.__set__ && this.__set__.push(e), e
    }, v.rect = function (a, b, d, e, f) {
        var g = c._engine.rect(this, a || 0, b || 0, d || 0, e || 0, f || 0);
        return this.__set__ && this.__set__.push(g), g
    }, v.ellipse = function (a, b, d, e) {
        var f = c._engine.ellipse(this, a || 0, b || 0, d || 0, e || 0);
        return this.__set__ && this.__set__.push(f), f
    }, v.path = function (a) {
        a && !c.is(a, U) && !c.is(a[0], V) && (a += G);
        var b = c._engine.path(c.format[D](c, arguments), this);
        return this.__set__ && this.__set__.push(b), b
    }, v.image = function (a, b, d, e, f) {
        var g = c._engine.image(this, a || "about:blank", b || 0, d || 0, e || 0, f || 0);
        return this.__set__ && this.__set__.push(g), g
    }, v.text = function (a, b, d) {
        var e = c._engine.text(this, a || 0, b || 0, I(d));
        return this.__set__ && this.__set__.push(e), e
    }, v.set = function (a) {
        !c.is(a, "array") && (a = Array.prototype.splice.call(arguments, 0, arguments.length));
        var b = new mc(a);
        return this.__set__ && this.__set__.push(b), b.paper = this, b.type = "set", b
    }, v.setStart = function (a) {
        this.__set__ = a || this.set()
    }, v.setFinish = function () {
        var a = this.__set__;
        return delete this.__set__, a
    }, v.setSize = function (a, b) {
        return c._engine.setSize.call(this, a, b)
    }, v.setViewBox = function (a, b, d, e, f) {
        return c._engine.setViewBox.call(this, a, b, d, e, f)
    }, v.top = v.bottom = null, v.raphael = c;
    var bc = function (a) {
        var b = a.getBoundingClientRect(),
            c = a.ownerDocument,
            d = c.body,
            e = c.documentElement,
            f = e.clientTop || d.clientTop || 0,
            g = e.clientLeft || d.clientLeft || 0,
            h = b.top + (A.win.pageYOffset || e.scrollTop || d.scrollTop) - f,
            i = b.left + (A.win.pageXOffset || e.scrollLeft || d.scrollLeft) - g;
        return {
            y: h,
            x: i
        }
    };
    v.getElementByPoint = function (a, b) {
        var c = this,
            d = c.canvas,
            e = A.doc.elementFromPoint(a, b);
        if (A.win.opera && "svg" == e.tagName) {
            var f = bc(d),
                g = d.createSVGRect();
            g.x = a - f.x, g.y = b - f.y, g.width = g.height = 1;
            var h = d.getIntersectionList(g, null);
            h.length && (e = h[h.length - 1])
        }
        if (!e) return null;
        for (; e.parentNode && e != d.parentNode && !e.raphael;) e = e.parentNode;
        return e == c.canvas.parentNode && (e = d), e = e && e.raphael ? c.getById(e.raphaelid) : null
    }, v.getElementsByBBox = function (a) {
        var b = this.set();
        return this.forEach(function (d) {
            c.isBBoxIntersect(d.getBBox(), a) && b.push(d)
        }), b
    }, v.getById = function (a) {
        for (var b = this.bottom; b;) {
            if (b.id == a) return b;
            b = b.next
        }
        return null
    }, v.forEach = function (a, b) {
        for (var c = this.bottom; c;) {
            if (a.call(b, c) === !1) return this;
            c = c.next
        }
        return this
    }, v.getElementsByPoint = function (a, b) {
        var c = this.set();
        return this.forEach(function (d) {
            d.isPointInside(a, b) && c.push(d)
        }), c
    }, $b.isPointInside = function (a, b) {
        var d = this.realPath = qb[this.type](this);
        return this.attr("transform") && this.attr("transform").length && (d = c.transformPath(d, this.attr("transform"))), c.isPointInsidePath(d, a, b)
    }, $b.getBBox = function (a) {
        if (this.removed) return {};
        var b = this._;
        return a ? ((b.dirty || !b.bboxwt) && (this.realPath = qb[this.type](this), b.bboxwt = Bb(this.realPath), b.bboxwt.toString = p, b.dirty = 0), b.bboxwt) : ((b.dirty || b.dirtyT || !b.bbox) && ((b.dirty || !this.realPath) && (b.bboxwt = 0, this.realPath = qb[this.type](this)), b.bbox = Bb(rb(this.realPath, this.matrix)), b.bbox.toString = p, b.dirty = b.dirtyT = 0), b.bbox)
    }, $b.clone = function () {
        if (this.removed) return null;
        var a = this.paper[this.type]().attr(this.attr());
        return this.__set__ && this.__set__.push(a), a
    }, $b.glow = function (a) {
        if ("text" == this.type) return null;
        a = a || {};
        var b = {
                width: (a.width || 10) + (+this.attr("stroke-width") || 1),
                fill: a.fill || !1,
                opacity: a.opacity || .5,
                offsetx: a.offsetx || 0,
                offsety: a.offsety || 0,
                color: a.color || "#000"
            },
            c = b.width / 2,
            d = this.paper,
            e = d.set(),
            f = this.realPath || qb[this.type](this);
        f = this.matrix ? rb(f, this.matrix) : f;
        for (var g = 1; c + 1 > g; g++) e.push(d.path(f).attr({
            stroke: b.color,
            fill: b.fill ? b.color : "none",
            "stroke-linejoin": "round",
            "stroke-linecap": "round",
            "stroke-width": +(b.width / c * g).toFixed(3),
            opacity: +(b.opacity / c).toFixed(3)
        }));
        return e.insertBefore(this).translate(b.offsetx, b.offsety)
    };
    var cc = function (a, b, d, e, f, g, h, i, l) {
            return null == l ? j(a, b, d, e, f, g, h, i) : c.findDotsAtSegment(a, b, d, e, f, g, h, i, k(a, b, d, e, f, g, h, i, l))
        },
        dc = function (a, b) {
            return function (d, e, f) {
                d = Kb(d);
                for (var g, h, i, j, k, l = "", m = {}, n = 0, o = 0, p = d.length; p > o; o++) {
                    if (i = d[o], "M" == i[0]) g = +i[1], h = +i[2];
                    else {
                        if (j = cc(g, h, i[1], i[2], i[3], i[4], i[5], i[6]), n + j > e) {
                            if (b && !m.start) {
                                if (k = cc(g, h, i[1], i[2], i[3], i[4], i[5], i[6], e - n), l += ["C" + k.start.x, k.start.y, k.m.x, k.m.y, k.x, k.y], f) return l;
                                m.start = l, l = ["M" + k.x, k.y + "C" + k.n.x, k.n.y, k.end.x, k.end.y, i[5], i[6]].join(), n += j, g = +i[5], h = +i[6];
                                continue
                            }
                            if (!a && !b) return k = cc(g, h, i[1], i[2], i[3], i[4], i[5], i[6], e - n), {
                                x: k.x,
                                y: k.y,
                                alpha: k.alpha
                            }
                        }
                        n += j, g = +i[5], h = +i[6]
                    }
                    l += i.shift() + i
                }
                return m.end = l, k = a ? n : b ? m : c.findDotsAtSegment(g, h, i[0], i[1], i[2], i[3], i[4], i[5], 1), k.alpha && (k = {
                    x: k.x,
                    y: k.y,
                    alpha: k.alpha
                }), k
            }
        },
        ec = dc(1),
        fc = dc(),
        gc = dc(0, 1);
    c.getTotalLength = ec, c.getPointAtLength = fc, c.getSubpath = function (a, b, c) {
        if (this.getTotalLength(a) - c < 1e-6) return gc(a, b).end;
        var d = gc(a, c, 1);
        return b ? gc(d, b).end : d
    }, $b.getTotalLength = function () {
        var a = this.getPath();
        if (a) return this.node.getTotalLength ? this.node.getTotalLength() : ec(a)
    }, $b.getPointAtLength = function (a) {
        var b = this.getPath();
        if (b) return fc(b, a)
    }, $b.getPath = function () {
        var a, b = c._getPath[this.type];
        if ("text" != this.type && "set" != this.type) return b && (a = b(this)), a
    }, $b.getSubpath = function (a, b) {
        var d = this.getPath();
        if (d) return c.getSubpath(d, a, b)
    };
    var hc = c.easing_formulas = {
        linear: function (a) {
            return a
        },
        "<": function (a) {
            return R(a, 1.7)
        },
        ">": function (a) {
            return R(a, .48)
        },
        "<>": function (a) {
            var b = .48 - a / 1.04,
                c = N.sqrt(.1734 + b * b),
                d = c - b,
                e = R(Q(d), 1 / 3) * (0 > d ? -1 : 1),
                f = -c - b,
                g = R(Q(f), 1 / 3) * (0 > f ? -1 : 1),
                h = e + g + .5;
            return 3 * (1 - h) * h * h + h * h * h
        },
        backIn: function (a) {
            var b = 1.70158;
            return a * a * ((b + 1) * a - b)
        },
        backOut: function (a) {
            a -= 1;
            var b = 1.70158;
            return a * a * ((b + 1) * a + b) + 1
        },
        elastic: function (a) {
            return a == !!a ? a : R(2, -10 * a) * N.sin((a - .075) * 2 * S / .3) + 1
        },
        bounce: function (a) {
            var b, c = 7.5625,
                d = 2.75;
            return 1 / d > a ? b = c * a * a : 2 / d > a ? (a -= 1.5 / d, b = c * a * a + .75) : 2.5 / d > a ? (a -= 2.25 / d, b = c * a * a + .9375) : (a -= 2.625 / d, b = c * a * a + .984375), b
        }
    };
    hc.easeIn = hc["ease-in"] = hc["<"], hc.easeOut = hc["ease-out"] = hc[">"], hc.easeInOut = hc["ease-in-out"] = hc["<>"], hc["back-in"] = hc.backIn, hc["back-out"] = hc.backOut;
    var ic = [],
        jc = a.requestAnimationFrame || a.webkitRequestAnimationFrame || a.mozRequestAnimationFrame || a.oRequestAnimationFrame || a.msRequestAnimationFrame || function (a) {
            setTimeout(a, 16)
        },
        kc = function () {
            for (var a = +new Date, d = 0; d < ic.length; d++) {
                var e = ic[d];
                if (!e.el.removed && !e.paused) {
                    var f, g, h = a - e.start,
                        i = e.ms,
                        j = e.easing,
                        k = e.from,
                        l = e.diff,
                        m = e.to,
                        n = (e.t, e.el),
                        o = {},
                        p = {};
                    if (e.initstatus ? (h = (e.initstatus * e.anim.top - e.prev) / (e.percent - e.prev) * i, e.status = e.initstatus, delete e.initstatus, e.stop && ic.splice(d--, 1)) : e.status = (e.prev + (e.percent - e.prev) * (h / i)) / e.anim.top, !(0 > h))
                        if (i > h) {
                            var q = j(h / i);
                            for (var r in k)
                                if (k[z](r)) {
                                    switch (db[r]) {
                                    case T:
                                        f = +k[r] + q * i * l[r];
                                        break;
                                    case "colour":
                                        f = "rgb(" + [lc($(k[r].r + q * i * l[r].r)), lc($(k[r].g + q * i * l[r].g)), lc($(k[r].b + q * i * l[r].b))].join(",") + ")";
                                        break;
                                    case "path":
                                        f = [];
                                        for (var t = 0, u = k[r].length; u > t; t++) {
                                            f[t] = [k[r][t][0]];
                                            for (var v = 1, w = k[r][t].length; w > v; v++) f[t][v] = +k[r][t][v] + q * i * l[r][t][v];
                                            f[t] = f[t].join(H)
                                        }
                                        f = f.join(H);
                                        break;
                                    case "transform":
                                        if (l[r].real)
                                            for (f = [], t = 0, u = k[r].length; u > t; t++)
                                                for (f[t] = [k[r][t][0]], v = 1, w = k[r][t].length; w > v; v++) f[t][v] = k[r][t][v] + q * i * l[r][t][v];
                                        else {
                                            var x = function (a) {
                                                return +k[r][a] + q * i * l[r][a]
                                            };
                                            f = [["m", x(0), x(1), x(2), x(3), x(4), x(5)]]
                                        }
                                        break;
                                    case "csv":
                                        if ("clip-rect" == r)
                                            for (f = [], t = 4; t--;) f[t] = +k[r][t] + q * i * l[r][t];
                                        break;
                                    default:
                                        var y = [][E](k[r]);
                                        for (f = [], t = n.paper.customAttributes[r].length; t--;) f[t] = +y[t] + q * i * l[r][t]
                                    }
                                    o[r] = f
                                }
                            n.attr(o),
                            function (a, c, d) {
                                setTimeout(function () {
                                    b("raphael.anim.frame." + a, c, d)
                                })
                            }(n.id, n, e.anim)
                        } else {
                            if (function (a, d, e) {
                                setTimeout(function () {
                                    b("raphael.anim.frame." + d.id, d, e), b("raphael.anim.finish." + d.id, d, e), c.is(a, "function") && a.call(d)
                                })
                            }(e.callback, n, e.anim), n.attr(m), ic.splice(d--, 1), e.repeat > 1 && !e.next) {
                                for (g in m) m[z](g) && (p[g] = e.totalOrigin[g]);
                                e.el.attr(p), s(e.anim, e.el, e.anim.percents[0], null, e.totalOrigin, e.repeat - 1)
                            }
                            e.next && !e.stop && s(e.anim, e.el, e.next, null, e.totalOrigin, e.repeat)
                        }
                }
            }
            c.svg && n && n.paper && n.paper.safari(), ic.length && jc(kc)
        },
        lc = function (a) {
            return a > 255 ? 255 : 0 > a ? 0 : a
        };
    $b.animateWith = function (a, b, d, e, f, g) {
        var h = this;
        if (h.removed) return g && g.call(h), h;
        var i = d instanceof r ? d : c.animation(d, e, f, g);
        s(i, h, i.percents[0], null, h.attr());
        for (var j = 0, k = ic.length; k > j; j++)
            if (ic[j].anim == b && ic[j].el == a) {
                ic[k - 1].start = ic[j].start;
                break
            }
        return h
    }, $b.onAnimation = function (a) {
        return a ? b.on("raphael.anim.frame." + this.id, a) : b.unbind("raphael.anim.frame." + this.id), this
    }, r.prototype.delay = function (a) {
        var b = new r(this.anim, this.ms);
        return b.times = this.times, b.del = +a || 0, b
    }, r.prototype.repeat = function (a) {
        var b = new r(this.anim, this.ms);
        return b.del = this.del, b.times = N.floor(O(a, 0)) || 1, b
    }, c.animation = function (a, b, d, e) {
        if (a instanceof r) return a;
        (c.is(d, "function") || !d) && (e = e || d || null, d = null), a = Object(a), b = +b || 0;
        var f, g, h = {};
        for (g in a) a[z](g) && _(g) != g && _(g) + "%" != g && (f = !0, h[g] = a[g]);
        return f ? (d && (h.easing = d), e && (h.callback = e), new r({
            100: h
        }, b)) : new r(a, b)
    }, $b.animate = function (a, b, d, e) {
        var f = this;
        if (f.removed) return e && e.call(f), f;
        var g = a instanceof r ? a : c.animation(a, b, d, e);
        return s(g, f, g.percents[0], null, f.attr()), f
    }, $b.setTime = function (a, b) {
        return a && null != b && this.status(a, P(b, a.ms) / a.ms), this
    }, $b.status = function (a, b) {
        var c, d, e = [],
            f = 0;
        if (null != b) return s(a, this, -1, P(b, 1)), this;
        for (c = ic.length; c > f; f++)
            if (d = ic[f], d.el.id == this.id && (!a || d.anim == a)) {
                if (a) return d.status;
                e.push({
                    anim: d.anim,
                    status: d.status
                })
            }
        return a ? 0 : e
    }, $b.pause = function (a) {
        for (var c = 0; c < ic.length; c++) ic[c].el.id != this.id || a && ic[c].anim != a || b("raphael.anim.pause." + this.id, this, ic[c].anim) !== !1 && (ic[c].paused = !0);
        return this
    }, $b.resume = function (a) {
        for (var c = 0; c < ic.length; c++)
            if (ic[c].el.id == this.id && (!a || ic[c].anim == a)) {
                var d = ic[c];
                b("raphael.anim.resume." + this.id, this, d.anim) !== !1 && (delete d.paused, this.status(d.anim, d.status))
            }
        return this
    }, $b.stop = function (a) {
        for (var c = 0; c < ic.length; c++) ic[c].el.id != this.id || a && ic[c].anim != a || b("raphael.anim.stop." + this.id, this, ic[c].anim) !== !1 && ic.splice(c--, 1);
        return this
    }, b.on("raphael.remove", t), b.on("raphael.clear", t), $b.toString = function () {
        return "Raphaël’s object"
    };
    var mc = function (a) {
            if (this.items = [], this.length = 0, this.type = "set", a)
                for (var b = 0, c = a.length; c > b; b++)!a[b] || a[b].constructor != $b.constructor && a[b].constructor != mc || (this[this.items.length] = this.items[this.items.length] = a[b], this.length++)
        },
        nc = mc.prototype;
    nc.push = function () {
        for (var a, b, c = 0, d = arguments.length; d > c; c++) a = arguments[c], !a || a.constructor != $b.constructor && a.constructor != mc || (b = this.items.length, this[b] = this.items[b] = a, this.length++);
        return this
    }, nc.pop = function () {
        return this.length && delete this[this.length--], this.items.pop()
    }, nc.forEach = function (a, b) {
        for (var c = 0, d = this.items.length; d > c; c++)
            if (a.call(b, this.items[c], c) === !1) return this;
        return this
    };
    for (var oc in $b) $b[z](oc) && (nc[oc] = function (a) {
        return function () {
            var b = arguments;
            return this.forEach(function (c) {
                c[a][D](c, b)
            })
        }
    }(oc));
    return nc.attr = function (a, b) {
            if (a && c.is(a, V) && c.is(a[0], "object"))
                for (var d = 0, e = a.length; e > d; d++) this.items[d].attr(a[d]);
            else
                for (var f = 0, g = this.items.length; g > f; f++) this.items[f].attr(a, b);
            return this
        }, nc.clear = function () {
            for (; this.length;) this.pop()
        }, nc.splice = function (a, b) {
            a = 0 > a ? O(this.length + a, 0) : a, b = O(0, P(this.length - a, b));
            var c, d = [],
                e = [],
                f = [];
            for (c = 2; c < arguments.length; c++) f.push(arguments[c]);
            for (c = 0; b > c; c++) e.push(this[a + c]);
            for (; c < this.length - a; c++) d.push(this[a + c]);
            var g = f.length;
            for (c = 0; c < g + d.length; c++) this.items[a + c] = this[a + c] = g > c ? f[c] : d[c - g];
            for (c = this.items.length = this.length -= b - g; this[c];) delete this[c++];
            return new mc(e)
        }, nc.exclude = function (a) {
            for (var b = 0, c = this.length; c > b; b++)
                if (this[b] == a) return this.splice(b, 1), !0
        }, nc.animate = function (a, b, d, e) {
            (c.is(d, "function") || !d) && (e = d || null);
            var f, g, h = this.items.length,
                i = h,
                j = this;
            if (!h) return this;
            e && (g = function () {
                !--h && e.call(j)
            }), d = c.is(d, U) ? d : g;
            var k = c.animation(a, b, d, g);
            for (f = this.items[--i].animate(k); i--;) this.items[i] && !this.items[i].removed && this.items[i].animateWith(f, k, k), this.items[i] && !this.items[i].removed || h--;
            return this
        }, nc.insertAfter = function (a) {
            for (var b = this.items.length; b--;) this.items[b].insertAfter(a);
            return this
        }, nc.getBBox = function () {
            for (var a = [], b = [], c = [], d = [], e = this.items.length; e--;)
                if (!this.items[e].removed) {
                    var f = this.items[e].getBBox();
                    a.push(f.x), b.push(f.y), c.push(f.x + f.width), d.push(f.y + f.height)
                }
            return a = P[D](0, a), b = P[D](0, b), c = O[D](0, c), d = O[D](0, d), {
                x: a,
                y: b,
                x2: c,
                y2: d,
                width: c - a,
                height: d - b
            }
        }, nc.clone = function (a) {
            a = this.paper.set();
            for (var b = 0, c = this.items.length; c > b; b++) a.push(this.items[b].clone());
            return a
        }, nc.toString = function () {
            return "Raphaël‘s set"
        }, nc.glow = function (a) {
            var b = this.paper.set();
            return this.forEach(function (c) {
                var d = c.glow(a);
                null != d && d.forEach(function (a) {
                    b.push(a)
                })
            }), b
        }, nc.isPointInside = function (a, b) {
            var c = !1;
            return this.forEach(function (d) {
                return d.isPointInside(a, b) ? (console.log("runned"), c = !0, !1) : void 0
            }), c
        }, c.registerFont = function (a) {
            if (!a.face) return a;
            this.fonts = this.fonts || {};
            var b = {
                    w: a.w,
                    face: {},
                    glyphs: {}
                },
                c = a.face["font-family"];
            for (var d in a.face) a.face[z](d) && (b.face[d] = a.face[d]);
            if (this.fonts[c] ? this.fonts[c].push(b) : this.fonts[c] = [b], !a.svg) {
                b.face["units-per-em"] = ab(a.face["units-per-em"], 10);
                for (var e in a.glyphs)
                    if (a.glyphs[z](e)) {
                        var f = a.glyphs[e];
                        if (b.glyphs[e] = {
                            w: f.w,
                            k: {},
                            d: f.d && "M" + f.d.replace(/[mlcxtrv]/g, function (a) {
                                return {
                                    l: "L",
                                    c: "C",
                                    x: "z",
                                    t: "m",
                                    r: "l",
                                    v: "c"
                                }[a] || "M"
                            }) + "z"
                        }, f.k)
                            for (var g in f.k) f[z](g) && (b.glyphs[e].k[g] = f.k[g])
                    }
            }
            return a
        }, v.getFont = function (a, b, d, e) {
            if (e = e || "normal", d = d || "normal", b = +b || {
                normal: 400,
                bold: 700,
                lighter: 300,
                bolder: 800
            }[b] || 400, c.fonts) {
                var f = c.fonts[a];
                if (!f) {
                    var g = new RegExp("(^|\\s)" + a.replace(/[^\w\d\s+!~.:_-]/g, G) + "(\\s|$)", "i");
                    for (var h in c.fonts)
                        if (c.fonts[z](h) && g.test(h)) {
                            f = c.fonts[h];
                            break
                        }
                }
                var i;
                if (f)
                    for (var j = 0, k = f.length; k > j && (i = f[j], i.face["font-weight"] != b || i.face["font-style"] != d && i.face["font-style"] || i.face["font-stretch"] != e); j++);
                return i
            }
        }, v.print = function (a, b, d, e, f, g, h, i) {
            g = g || "middle", h = O(P(h || 0, 1), -1), i = O(P(i || 1, 3), 1);
            var j, k = I(d)[J](G),
                l = 0,
                m = 0,
                n = G;
            if (c.is(e, "string") && (e = this.getFont(e)), e) {
                j = (f || 16) / e.face["units-per-em"];
                for (var o = e.face.bbox[J](w), p = +o[0], q = o[3] - o[1], r = 0, s = +o[1] + ("baseline" == g ? q + +e.face.descent : q / 2), t = 0, u = k.length; u > t; t++) {
                    if ("\n" == k[t]) l = 0, x = 0, m = 0, r += q * i;
                    else {
                        var v = m && e.glyphs[k[t - 1]] || {},
                            x = e.glyphs[k[t]];
                        l += m ? (v.w || e.w) + (v.k && v.k[k[t]] || 0) + e.w * h : 0, m = 1
                    }
                    x && x.d && (n += c.transformPath(x.d, ["t", l * j, r * j, "s", j, j, p, s, "t", (a - p) / j, (b - s) / j]))
                }
            }
            return this.path(n).attr({
                fill: "#000",
                stroke: "none"
            })
        }, v.add = function (a) {
            if (c.is(a, "array"))
                for (var b, d = this.set(), e = 0, f = a.length; f > e; e++) b = a[e] || {}, x[z](b.type) && d.push(this[b.type]().attr(b));
            return d
        }, c.format = function (a, b) {
            var d = c.is(b, V) ? [0][E](b) : arguments;
            return a && c.is(a, U) && d.length - 1 && (a = a.replace(y, function (a, b) {
                return null == d[++b] ? G : d[b]
            })), a || G
        }, c.fullfill = function () {
            var a = /\{([^\}]+)\}/g,
                b = /(?:(?:^|\.)(.+?)(?=\[|\.|$|\()|\[('|")(.+?)\2\])(\(\))?/g,
                c = function (a, c, d) {
                    var e = d;
                    return c.replace(b, function (a, b, c, d, f) {
                        b = b || d, e && (b in e && (e = e[b]), "function" == typeof e && f && (e = e()))
                    }), e = (null == e || e == d ? a : e) + ""
                };
            return function (b, d) {
                return String(b).replace(a, function (a, b) {
                    return c(a, b, d)
                })
            }
        }(), c.ninja = function () {
            return B.was ? A.win.Raphael = B.is : delete Raphael, c
        }, c.st = nc,
        function (a, b, d) {
            function e() {
                /in/.test(a.readyState) ? setTimeout(e, 9) : c.eve("raphael.DOMload")
            }
            null == a.readyState && a.addEventListener && (a.addEventListener(b, d = function () {
                a.removeEventListener(b, d, !1), a.readyState = "complete"
            }, !1), a.readyState = "loading"), e()
        }(document, "DOMContentLoaded"), b.on("raphael.DOMload", function () {
            u = !0
        }),
        function () {
            if (c.svg) {
                var a = "hasOwnProperty",
                    b = String,
                    d = parseFloat,
                    e = parseInt,
                    f = Math,
                    g = f.max,
                    h = f.abs,
                    i = f.pow,
                    j = /[, ]+/,
                    k = c.eve,
                    l = "",
                    m = " ",
                    n = "http://www.w3.org/1999/xlink",
                    o = {
                        block: "M5,0 0,2.5 5,5z",
                        classic: "M5,0 0,2.5 5,5 3.5,3 3.5,2z",
                        diamond: "M2.5,0 5,2.5 2.5,5 0,2.5z",
                        open: "M6,1 1,3.5 6,6",
                        oval: "M2.5,0A2.5,2.5,0,0,1,2.5,5 2.5,2.5,0,0,1,2.5,0z"
                    },
                    p = {};
                c.toString = function () {
                    return "Your browser supports SVG.\nYou are running Raphaël " + this.version
                };
                var q = function (d, e) {
                        if (e) {
                            "string" == typeof d && (d = q(d));
                            for (var f in e) e[a](f) && ("xlink:" == f.substring(0, 6) ? d.setAttributeNS(n, f.substring(6), b(e[f])) : d.setAttribute(f, b(e[f])))
                        } else d = c._g.doc.createElementNS("http://www.w3.org/2000/svg", d), d.style && (d.style.webkitTapHighlightColor = "rgba(0,0,0,0)");
                        return d
                    },
                    r = function (a, e) {
                        var j = "linear",
                            k = a.id + e,
                            m = .5,
                            n = .5,
                            o = a.node,
                            p = a.paper,
                            r = o.style,
                            s = c._g.doc.getElementById(k);
                        if (!s) {
                            if (e = b(e).replace(c._radial_gradient, function (a, b, c) {
                                if (j = "radial", b && c) {
                                    m = d(b), n = d(c);
                                    var e = 2 * (n > .5) - 1;
                                    i(m - .5, 2) + i(n - .5, 2) > .25 && (n = f.sqrt(.25 - i(m - .5, 2)) * e + .5) && .5 != n && (n = n.toFixed(5) - 1e-5 * e)
                                }
                                return l
                            }), e = e.split(/\s*\-\s*/), "linear" == j) {
                                var t = e.shift();
                                if (t = -d(t), isNaN(t)) return null;
                                var u = [0, 0, f.cos(c.rad(t)), f.sin(c.rad(t))],
                                    v = 1 / (g(h(u[2]), h(u[3])) || 1);
                                u[2] *= v, u[3] *= v, u[2] < 0 && (u[0] = -u[2], u[2] = 0), u[3] < 0 && (u[1] = -u[3], u[3] = 0)
                            }
                            var w = c._parseDots(e);
                            if (!w) return null;
                            if (k = k.replace(/[\(\)\s,\xb0#]/g, "_"), a.gradient && k != a.gradient.id && (p.defs.removeChild(a.gradient), delete a.gradient), !a.gradient) {
                                s = q(j + "Gradient", {
                                    id: k
                                }), a.gradient = s, q(s, "radial" == j ? {
                                    fx: m,
                                    fy: n
                                } : {
                                    x1: u[0],
                                    y1: u[1],
                                    x2: u[2],
                                    y2: u[3],
                                    gradientTransform: a.matrix.invert()
                                }), p.defs.appendChild(s);
                                for (var x = 0, y = w.length; y > x; x++) s.appendChild(q("stop", {
                                    offset: w[x].offset ? w[x].offset : x ? "100%" : "0%",
                                    "stop-color": w[x].color || "#fff"
                                }))
                            }
                        }
                        return q(o, {
                            fill: "url(#" + k + ")",
                            opacity: 1,
                            "fill-opacity": 1
                        }), r.fill = l, r.opacity = 1, r.fillOpacity = 1, 1
                    },
                    s = function (a) {
                        var b = a.getBBox(1);
                        q(a.pattern, {
                            patternTransform: a.matrix.invert() + " translate(" + b.x + "," + b.y + ")"
                        })
                    },
                    t = function (d, e, f) {
                        if ("path" == d.type) {
                            for (var g, h, i, j, k, m = b(e).toLowerCase().split("-"), n = d.paper, r = f ? "end" : "start", s = d.node, t = d.attrs, u = t["stroke-width"], v = m.length, w = "classic", x = 3, y = 3, z = 5; v--;) switch (m[v]) {
                            case "block":
                            case "classic":
                            case "oval":
                            case "diamond":
                            case "open":
                            case "none":
                                w = m[v];
                                break;
                            case "wide":
                                y = 5;
                                break;
                            case "narrow":
                                y = 2;
                                break;
                            case "long":
                                x = 5;
                                break;
                            case "short":
                                x = 2
                            }
                            if ("open" == w ? (x += 2, y += 2, z += 2, i = 1, j = f ? 4 : 1, k = {
                                fill: "none",
                                stroke: t.stroke
                            }) : (j = i = x / 2, k = {
                                fill: t.stroke,
                                stroke: "none"
                            }), d._.arrows ? f ? (d._.arrows.endPath && p[d._.arrows.endPath]--, d._.arrows.endMarker && p[d._.arrows.endMarker]--) : (d._.arrows.startPath && p[d._.arrows.startPath]--, d._.arrows.startMarker && p[d._.arrows.startMarker]--) : d._.arrows = {}, "none" != w) {
                                var A = "raphael-marker-" + w,
                                    B = "raphael-marker-" + r + w + x + y;
                                c._g.doc.getElementById(A) ? p[A]++ : (n.defs.appendChild(q(q("path"), {
                                    "stroke-linecap": "round",
                                    d: o[w],
                                    id: A
                                })), p[A] = 1);
                                var C, D = c._g.doc.getElementById(B);
                                D ? (p[B]++, C = D.getElementsByTagName("use")[0]) : (D = q(q("marker"), {
                                    id: B,
                                    markerHeight: y,
                                    markerWidth: x,
                                    orient: "auto",
                                    refX: j,
                                    refY: y / 2
                                }), C = q(q("use"), {
                                    "xlink:href": "#" + A,
                                    transform: (f ? "rotate(180 " + x / 2 + " " + y / 2 + ") " : l) + "scale(" + x / z + "," + y / z + ")",
                                    "stroke-width": (1 / ((x / z + y / z) / 2)).toFixed(4)
                                }), D.appendChild(C), n.defs.appendChild(D), p[B] = 1), q(C, k);
                                var E = i * ("diamond" != w && "oval" != w);
                                f ? (g = d._.arrows.startdx * u || 0, h = c.getTotalLength(t.path) - E * u) : (g = E * u, h = c.getTotalLength(t.path) - (d._.arrows.enddx * u || 0)), k = {}, k["marker-" + r] = "url(#" + B + ")", (h || g) && (k.d = c.getSubpath(t.path, g, h)), q(s, k), d._.arrows[r + "Path"] = A, d._.arrows[r + "Marker"] = B, d._.arrows[r + "dx"] = E, d._.arrows[r + "Type"] = w, d._.arrows[r + "String"] = e
                            } else f ? (g = d._.arrows.startdx * u || 0, h = c.getTotalLength(t.path) - g) : (g = 0, h = c.getTotalLength(t.path) - (d._.arrows.enddx * u || 0)), d._.arrows[r + "Path"] && q(s, {
                                d: c.getSubpath(t.path, g, h)
                            }), delete d._.arrows[r + "Path"], delete d._.arrows[r + "Marker"], delete d._.arrows[r + "dx"], delete d._.arrows[r + "Type"], delete d._.arrows[r + "String"];
                            for (k in p)
                                if (p[a](k) && !p[k]) {
                                    var F = c._g.doc.getElementById(k);
                                    F && F.parentNode.removeChild(F)
                                }
                        }
                    },
                    u = {
                        "": [0],
                        none: [0],
                        "-": [3, 1],
                        ".": [1, 1],
                        "-.": [3, 1, 1, 1],
                        "-..": [3, 1, 1, 1, 1, 1],
                        ". ": [1, 3],
                        "- ": [4, 3],
                        "--": [8, 3],
                        "- .": [4, 3, 1, 3],
                        "--.": [8, 3, 1, 3],
                        "--..": [8, 3, 1, 3, 1, 3]
                    },
                    v = function (a, c, d) {
                        if (c = u[b(c).toLowerCase()]) {
                            for (var e = a.attrs["stroke-width"] || "1", f = {
                                round: e,
                                square: e,
                                butt: 0
                            }[a.attrs["stroke-linecap"] || d["stroke-linecap"]] || 0, g = [], h = c.length; h--;) g[h] = c[h] * e + (h % 2 ? 1 : -1) * f;
                            q(a.node, {
                                "stroke-dasharray": g.join(",")
                            })
                        }
                    },
                    w = function (d, f) {
                        var i = d.node,
                            k = d.attrs,
                            m = i.style.visibility;
                        i.style.visibility = "hidden";
                        for (var o in f)
                            if (f[a](o)) {
                                if (!c._availableAttrs[a](o)) continue;
                                var p = f[o];
                                switch (k[o] = p, o) {
                                case "blur":
                                    d.blur(p);
                                    break;
                                case "href":
                                case "title":
                                    var u = q("title"),
                                        w = c._g.doc.createTextNode(p);
                                    u.appendChild(w), i.appendChild(u);
                                    break;
                                case "target":
                                    var x = i.parentNode;
                                    if ("a" != x.tagName.toLowerCase()) {
                                        var u = q("a");
                                        x.insertBefore(u, i), u.appendChild(i), x = u
                                    }
                                    "target" == o ? x.setAttributeNS(n, "show", "blank" == p ? "new" : p) : x.setAttributeNS(n, o, p);
                                    break;
                                case "cursor":
                                    i.style.cursor = p;
                                    break;
                                case "transform":
                                    d.transform(p);
                                    break;
                                case "arrow-start":
                                    t(d, p);
                                    break;
                                case "arrow-end":
                                    t(d, p, 1);
                                    break;
                                case "clip-rect":
                                    var z = b(p).split(j);
                                    if (4 == z.length) {
                                        d.clip && d.clip.parentNode.parentNode.removeChild(d.clip.parentNode);
                                        var A = q("clipPath"),
                                            B = q("rect");
                                        A.id = c.createUUID(), q(B, {
                                            x: z[0],
                                            y: z[1],
                                            width: z[2],
                                            height: z[3]
                                        }), A.appendChild(B), d.paper.defs.appendChild(A), q(i, {
                                            "clip-path": "url(#" + A.id + ")"
                                        }), d.clip = B
                                    }
                                    if (!p) {
                                        var C = i.getAttribute("clip-path");
                                        if (C) {
                                            var D = c._g.doc.getElementById(C.replace(/(^url\(#|\)$)/g, l));
                                            D && D.parentNode.removeChild(D), q(i, {
                                                "clip-path": l
                                            }), delete d.clip
                                        }
                                    }
                                    break;
                                case "path":
                                    "path" == d.type && (q(i, {
                                        d: p ? k.path = c._pathToAbsolute(p) : "M0,0"
                                    }), d._.dirty = 1, d._.arrows && ("startString" in d._.arrows && t(d, d._.arrows.startString), "endString" in d._.arrows && t(d, d._.arrows.endString, 1)));
                                    break;
                                case "width":
                                    if (i.setAttribute(o, p), d._.dirty = 1, !k.fx) break;
                                    o = "x", p = k.x;
                                case "x":
                                    k.fx && (p = -k.x - (k.width || 0));
                                case "rx":
                                    if ("rx" == o && "rect" == d.type) break;
                                case "cx":
                                    i.setAttribute(o, p), d.pattern && s(d), d._.dirty = 1;
                                    break;
                                case "height":
                                    if (i.setAttribute(o, p), d._.dirty = 1, !k.fy) break;
                                    o = "y", p = k.y;
                                case "y":
                                    k.fy && (p = -k.y - (k.height || 0));
                                case "ry":
                                    if ("ry" == o && "rect" == d.type) break;
                                case "cy":
                                    i.setAttribute(o, p), d.pattern && s(d), d._.dirty = 1;
                                    break;
                                case "r":
                                    "rect" == d.type ? q(i, {
                                        rx: p,
                                        ry: p
                                    }) : i.setAttribute(o, p), d._.dirty = 1;
                                    break;
                                case "src":
                                    "image" == d.type && i.setAttributeNS(n, "href", p);
                                    break;
                                case "stroke-width":
                                    (1 != d._.sx || 1 != d._.sy) && (p /= g(h(d._.sx), h(d._.sy)) || 1), d.paper._vbSize && (p *= d.paper._vbSize), i.setAttribute(o, p), k["stroke-dasharray"] && v(d, k["stroke-dasharray"], f), d._.arrows && ("startString" in d._.arrows && t(d, d._.arrows.startString), "endString" in d._.arrows && t(d, d._.arrows.endString, 1));
                                    break;
                                case "stroke-dasharray":
                                    v(d, p, f);
                                    break;
                                case "fill":
                                    var E = b(p).match(c._ISURL);
                                    if (E) {
                                        A = q("pattern");
                                        var F = q("image");
                                        A.id = c.createUUID(), q(A, {
                                            x: 0,
                                            y: 0,
                                            patternUnits: "userSpaceOnUse",
                                            height: 1,
                                            width: 1
                                        }), q(F, {
                                            x: 0,
                                            y: 0,
                                            "xlink:href": E[1]
                                        }), A.appendChild(F),
                                        function (a) {
                                            c._preload(E[1], function () {
                                                var b = this.offsetWidth,
                                                    c = this.offsetHeight;
                                                q(a, {
                                                    width: b,
                                                    height: c
                                                }), q(F, {
                                                    width: b,
                                                    height: c
                                                }), d.paper.safari()
                                            })
                                        }(A), d.paper.defs.appendChild(A), q(i, {
                                            fill: "url(#" + A.id + ")"
                                        }), d.pattern = A, d.pattern && s(d);
                                        break
                                    }
                                    var G = c.getRGB(p);
                                    if (G.error) {
                                        if (("circle" == d.type || "ellipse" == d.type || "r" != b(p).charAt()) && r(d, p)) {
                                            if ("opacity" in k || "fill-opacity" in k) {
                                                var H = c._g.doc.getElementById(i.getAttribute("fill").replace(/^url\(#|\)$/g, l));
                                                if (H) {
                                                    var I = H.getElementsByTagName("stop");
                                                    q(I[I.length - 1], {
                                                        "stop-opacity": ("opacity" in k ? k.opacity : 1) * ("fill-opacity" in k ? k["fill-opacity"] : 1)
                                                    })
                                                }
                                            }
                                            k.gradient = p, k.fill = "none";
                                            break
                                        }
                                    } else delete f.gradient, delete k.gradient, !c.is(k.opacity, "undefined") && c.is(f.opacity, "undefined") && q(i, {
                                        opacity: k.opacity
                                    }), !c.is(k["fill-opacity"], "undefined") && c.is(f["fill-opacity"], "undefined") && q(i, {
                                        "fill-opacity": k["fill-opacity"]
                                    });
                                    G[a]("opacity") && q(i, {
                                        "fill-opacity": G.opacity > 1 ? G.opacity / 100 : G.opacity
                                    });
                                case "stroke":
                                    G = c.getRGB(p), i.setAttribute(o, G.hex), "stroke" == o && G[a]("opacity") && q(i, {
                                        "stroke-opacity": G.opacity > 1 ? G.opacity / 100 : G.opacity
                                    }), "stroke" == o && d._.arrows && ("startString" in d._.arrows && t(d, d._.arrows.startString), "endString" in d._.arrows && t(d, d._.arrows.endString, 1));
                                    break;
                                case "gradient":
                                    ("circle" == d.type || "ellipse" == d.type || "r" != b(p).charAt()) && r(d, p);
                                    break;
                                case "opacity":
                                    k.gradient && !k[a]("stroke-opacity") && q(i, {
                                        "stroke-opacity": p > 1 ? p / 100 : p
                                    });
                                case "fill-opacity":
                                    if (k.gradient) {
                                        H = c._g.doc.getElementById(i.getAttribute("fill").replace(/^url\(#|\)$/g, l)), H && (I = H.getElementsByTagName("stop"), q(I[I.length - 1], {
                                            "stop-opacity": p
                                        }));
                                        break
                                    }
                                default:
                                    "font-size" == o && (p = e(p, 10) + "px");
                                    var J = o.replace(/(\-.)/g, function (a) {
                                        return a.substring(1).toUpperCase()
                                    });
                                    i.style[J] = p, d._.dirty = 1, i.setAttribute(o, p)
                                }
                            }
                        y(d, f), i.style.visibility = m
                    },
                    x = 1.2,
                    y = function (d, f) {
                        if ("text" == d.type && (f[a]("text") || f[a]("font") || f[a]("font-size") || f[a]("x") || f[a]("y"))) {
                            var g = d.attrs,
                                h = d.node,
                                i = h.firstChild ? e(c._g.doc.defaultView.getComputedStyle(h.firstChild, l).getPropertyValue("font-size"), 10) : 10;
                            if (f[a]("text")) {
                                for (g.text = f.text; h.firstChild;) h.removeChild(h.firstChild);
                                for (var j, k = b(f.text).split("\n"), m = [], n = 0, o = k.length; o > n; n++) j = q("tspan"), n && q(j, {
                                    dy: i * x,
                                    x: g.x
                                }), j.appendChild(c._g.doc.createTextNode(k[n])), h.appendChild(j), m[n] = j
                            } else
                                for (m = h.getElementsByTagName("tspan"), n = 0, o = m.length; o > n; n++) n ? q(m[n], {
                                    dy: i * x,
                                    x: g.x
                                }) : q(m[0], {
                                    dy: 0
                                });
                            q(h, {
                                x: g.x,
                                y: g.y
                            }), d._.dirty = 1;
                            var p = d._getBBox(),
                                r = g.y - (p.y + p.height / 2);
                            r && c.is(r, "finite") && q(m[0], {
                                dy: r
                            })
                        }
                    },
                    z = function (a, b) {
                        this[0] = this.node = a, a.raphael = !0, this.id = c._oid++, a.raphaelid = this.id, this.matrix = c.matrix(), this.realPath = null, this.paper = b, this.attrs = this.attrs || {}, this._ = {
                            transform: [],
                            sx: 1,
                            sy: 1,
                            deg: 0,
                            dx: 0,
                            dy: 0,
                            dirty: 1
                        }, !b.bottom && (b.bottom = this), this.prev = b.top, b.top && (b.top.next = this), b.top = this, this.next = null
                    },
                    A = c.el;
                z.prototype = A, A.constructor = z, c._engine.path = function (a, b) {
                    var c = q("path");
                    b.canvas && b.canvas.appendChild(c);
                    var d = new z(c, b);
                    return d.type = "path", w(d, {
                        fill: "none",
                        stroke: "#000",
                        path: a
                    }), d
                }, A.rotate = function (a, c, e) {
                    if (this.removed) return this;
                    if (a = b(a).split(j), a.length - 1 && (c = d(a[1]), e = d(a[2])), a = d(a[0]), null == e && (c = e), null == c || null == e) {
                        var f = this.getBBox(1);
                        c = f.x + f.width / 2, e = f.y + f.height / 2
                    }
                    return this.transform(this._.transform.concat([["r", a, c, e]])), this
                }, A.scale = function (a, c, e, f) {
                    if (this.removed) return this;
                    if (a = b(a).split(j), a.length - 1 && (c = d(a[1]), e = d(a[2]), f = d(a[3])), a = d(a[0]), null == c && (c = a), null == f && (e = f), null == e || null == f) var g = this.getBBox(1);
                    return e = null == e ? g.x + g.width / 2 : e, f = null == f ? g.y + g.height / 2 : f, this.transform(this._.transform.concat([["s", a, c, e, f]])), this
                }, A.translate = function (a, c) {
                    return this.removed ? this : (a = b(a).split(j), a.length - 1 && (c = d(a[1])), a = d(a[0]) || 0, c = +c || 0, this.transform(this._.transform.concat([["t", a, c]])), this)
                }, A.transform = function (b) {
                    var d = this._;
                    if (null == b) return d.transform;
                    if (c._extractTransform(this, b), this.clip && q(this.clip, {
                        transform: this.matrix.invert()
                    }), this.pattern && s(this), this.node && q(this.node, {
                        transform: this.matrix
                    }), 1 != d.sx || 1 != d.sy) {
                        var e = this.attrs[a]("stroke-width") ? this.attrs["stroke-width"] : 1;
                        this.attr({
                            "stroke-width": e
                        })
                    }
                    return this
                }, A.hide = function () {
                    return !this.removed && this.paper.safari(this.node.style.display = "none"), this
                }, A.show = function () {
                    return !this.removed && this.paper.safari(this.node.style.display = ""), this
                }, A.remove = function () {
                    if (!this.removed && this.node.parentNode) {
                        var a = this.paper;
                        a.__set__ && a.__set__.exclude(this), k.unbind("raphael.*.*." + this.id), this.gradient && a.defs.removeChild(this.gradient), c._tear(this, a), "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.removeChild(this.node.parentNode) : this.node.parentNode.removeChild(this.node);
                        for (var b in this) this[b] = "function" == typeof this[b] ? c._removedFactory(b) : null;
                        this.removed = !0
                    }
                }, A._getBBox = function () {
                    if ("none" == this.node.style.display) {
                        this.show();
                        var a = !0
                    }
                    var b = {};
                    try {
                        b = this.node.getBBox()
                    } catch (c) {} finally {
                        b = b || {}
                    }
                    return a && this.hide(), b
                }, A.attr = function (b, d) {
                    if (this.removed) return this;
                    if (null == b) {
                        var e = {};
                        for (var f in this.attrs) this.attrs[a](f) && (e[f] = this.attrs[f]);
                        return e.gradient && "none" == e.fill && (e.fill = e.gradient) && delete e.gradient, e.transform = this._.transform, e
                    }
                    if (null == d && c.is(b, "string")) {
                        if ("fill" == b && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                        if ("transform" == b) return this._.transform;
                        for (var g = b.split(j), h = {}, i = 0, l = g.length; l > i; i++) b = g[i], h[b] = b in this.attrs ? this.attrs[b] : c.is(this.paper.customAttributes[b], "function") ? this.paper.customAttributes[b].def : c._availableAttrs[b];
                        return l - 1 ? h : h[g[0]]
                    }
                    if (null == d && c.is(b, "array")) {
                        for (h = {}, i = 0, l = b.length; l > i; i++) h[b[i]] = this.attr(b[i]);
                        return h
                    }
                    if (null != d) {
                        var m = {};
                        m[b] = d
                    } else null != b && c.is(b, "object") && (m = b);
                    for (var n in m) k("raphael.attr." + n + "." + this.id, this, m[n]);
                    for (n in this.paper.customAttributes)
                        if (this.paper.customAttributes[a](n) && m[a](n) && c.is(this.paper.customAttributes[n], "function")) {
                            var o = this.paper.customAttributes[n].apply(this, [].concat(m[n]));
                            this.attrs[n] = m[n];
                            for (var p in o) o[a](p) && (m[p] = o[p])
                        }
                    return w(this, m), this
                }, A.toFront = function () {
                    if (this.removed) return this;
                    "a" == this.node.parentNode.tagName.toLowerCase() ? this.node.parentNode.parentNode.appendChild(this.node.parentNode) : this.node.parentNode.appendChild(this.node);
                    var a = this.paper;
                    return a.top != this && c._tofront(this, a), this
                }, A.toBack = function () {
                    if (this.removed) return this;
                    var a = this.node.parentNode;
                    return "a" == a.tagName.toLowerCase() ? a.parentNode.insertBefore(this.node.parentNode, this.node.parentNode.parentNode.firstChild) : a.firstChild != this.node && a.insertBefore(this.node, this.node.parentNode.firstChild), c._toback(this, this.paper), this.paper, this
                }, A.insertAfter = function (a) {
                    if (this.removed) return this;
                    var b = a.node || a[a.length - 1].node;
                    return b.nextSibling ? b.parentNode.insertBefore(this.node, b.nextSibling) : b.parentNode.appendChild(this.node), c._insertafter(this, a, this.paper), this
                }, A.insertBefore = function (a) {
                    if (this.removed) return this;
                    var b = a.node || a[0].node;
                    return b.parentNode.insertBefore(this.node, b), c._insertbefore(this, a, this.paper), this
                }, A.blur = function (a) {
                    var b = this;
                    if (0 !== +a) {
                        var d = q("filter"),
                            e = q("feGaussianBlur");
                        b.attrs.blur = a, d.id = c.createUUID(), q(e, {
                            stdDeviation: +a || 1.5
                        }), d.appendChild(e), b.paper.defs.appendChild(d), b._blur = d, q(b.node, {
                            filter: "url(#" + d.id + ")"
                        })
                    } else b._blur && (b._blur.parentNode.removeChild(b._blur), delete b._blur, delete b.attrs.blur), b.node.removeAttribute("filter");
                    return b
                }, c._engine.circle = function (a, b, c, d) {
                    var e = q("circle");
                    a.canvas && a.canvas.appendChild(e);
                    var f = new z(e, a);
                    return f.attrs = {
                        cx: b,
                        cy: c,
                        r: d,
                        fill: "none",
                        stroke: "#000"
                    }, f.type = "circle", q(e, f.attrs), f
                }, c._engine.rect = function (a, b, c, d, e, f) {
                    var g = q("rect");
                    a.canvas && a.canvas.appendChild(g);
                    var h = new z(g, a);
                    return h.attrs = {
                        x: b,
                        y: c,
                        width: d,
                        height: e,
                        r: f || 0,
                        rx: f || 0,
                        ry: f || 0,
                        fill: "none",
                        stroke: "#000"
                    }, h.type = "rect", q(g, h.attrs), h
                }, c._engine.ellipse = function (a, b, c, d, e) {
                    var f = q("ellipse");
                    a.canvas && a.canvas.appendChild(f);
                    var g = new z(f, a);
                    return g.attrs = {
                        cx: b,
                        cy: c,
                        rx: d,
                        ry: e,
                        fill: "none",
                        stroke: "#000"
                    }, g.type = "ellipse", q(f, g.attrs), g
                }, c._engine.image = function (a, b, c, d, e, f) {
                    var g = q("image");
                    q(g, {
                        x: c,
                        y: d,
                        width: e,
                        height: f,
                        preserveAspectRatio: "none"
                    }), g.setAttributeNS(n, "href", b), a.canvas && a.canvas.appendChild(g);
                    var h = new z(g, a);
                    return h.attrs = {
                        x: c,
                        y: d,
                        width: e,
                        height: f,
                        src: b
                    }, h.type = "image", h
                }, c._engine.text = function (a, b, d, e) {
                    var f = q("text");
                    a.canvas && a.canvas.appendChild(f);
                    var g = new z(f, a);
                    return g.attrs = {
                        x: b,
                        y: d,
                        "text-anchor": "middle",
                        text: e,
                        font: c._availableAttrs.font,
                        stroke: "none",
                        fill: "#000"
                    }, g.type = "text", w(g, g.attrs), g
                }, c._engine.setSize = function (a, b) {
                    return this.width = a || this.width, this.height = b || this.height, this.canvas.setAttribute("width", this.width), this.canvas.setAttribute("height", this.height), this._viewBox && this.setViewBox.apply(this, this._viewBox), this
                }, c._engine.create = function () {
                    var a = c._getContainer.apply(0, arguments),
                        b = a && a.container,
                        d = a.x,
                        e = a.y,
                        f = a.width,
                        g = a.height;
                    if (!b) throw new Error("SVG container not found.");
                    var h, i = q("svg"),
                        j = "overflow:hidden;";
                    return d = d || 0, e = e || 0, f = f || 512, g = g || 342, q(i, {
                        height: g,
                        version: 1.1,
                        width: f,
                        xmlns: "http://www.w3.org/2000/svg"
                    }), 1 == b ? (i.style.cssText = j + "position:absolute;left:" + d + "px;top:" + e + "px", c._g.doc.body.appendChild(i), h = 1) : (i.style.cssText = j + "position:relative", b.firstChild ? b.insertBefore(i, b.firstChild) : b.appendChild(i)), b = new c._Paper, b.width = f, b.height = g, b.canvas = i, b.clear(), b._left = b._top = 0, h && (b.renderfix = function () {}), b.renderfix(), b
                }, c._engine.setViewBox = function (a, b, c, d, e) {
                    k("raphael.setViewBox", this, this._viewBox, [a, b, c, d, e]);
                    var f, h, i = g(c / this.width, d / this.height),
                        j = this.top,
                        l = e ? "meet" : "xMinYMin";
                    for (null == a ? (this._vbSize && (i = 1), delete this._vbSize, f = "0 0 " + this.width + m + this.height) : (this._vbSize = i, f = a + m + b + m + c + m + d), q(this.canvas, {
                        viewBox: f,
                        preserveAspectRatio: l
                    }); i && j;) h = "stroke-width" in j.attrs ? j.attrs["stroke-width"] : 1, j.attr({
                        "stroke-width": h
                    }), j._.dirty = 1, j._.dirtyT = 1, j = j.prev;
                    return this._viewBox = [a, b, c, d, !!e], this
                }, c.prototype.renderfix = function () {
                    var a, b = this.canvas,
                        c = b.style;
                    try {
                        a = b.getScreenCTM() || b.createSVGMatrix()
                    } catch (d) {
                        a = b.createSVGMatrix()
                    }
                    var e = -a.e % 1,
                        f = -a.f % 1;
                    (e || f) && (e && (this._left = (this._left + e) % 1, c.left = this._left + "px"), f && (this._top = (this._top + f) % 1, c.top = this._top + "px"))
                }, c.prototype.clear = function () {
                    c.eve("raphael.clear", this);
                    for (var a = this.canvas; a.firstChild;) a.removeChild(a.firstChild);
                    this.bottom = this.top = null, (this.desc = q("desc")).appendChild(c._g.doc.createTextNode("Created with Raphaël " + c.version)), a.appendChild(this.desc), a.appendChild(this.defs = q("defs"))
                }, c.prototype.remove = function () {
                    k("raphael.remove", this), this.canvas.parentNode && this.canvas.parentNode.removeChild(this.canvas);
                    for (var a in this) this[a] = "function" == typeof this[a] ? c._removedFactory(a) : null
                };
                var B = c.st;
                for (var C in A) A[a](C) && !B[a](C) && (B[C] = function (a) {
                    return function () {
                        var b = arguments;
                        return this.forEach(function (c) {
                            c[a].apply(c, b)
                        })
                    }
                }(C))
            }
        }(),
        function () {
            if (c.vml) {
                var a = "hasOwnProperty",
                    b = String,
                    d = parseFloat,
                    e = Math,
                    f = e.round,
                    g = e.max,
                    h = e.min,
                    i = e.abs,
                    j = "fill",
                    k = /[, ]+/,
                    l = c.eve,
                    m = " progid:DXImageTransform.Microsoft",
                    n = " ",
                    o = "",
                    p = {
                        M: "m",
                        L: "l",
                        C: "c",
                        Z: "x",
                        m: "t",
                        l: "r",
                        c: "v",
                        z: "x"
                    },
                    q = /([clmz]),?([^clmz]*)/gi,
                    r = / progid:\S+Blur\([^\)]+\)/g,
                    s = /-?[^,\s-]+/g,
                    t = "position:absolute;left:0;top:0;width:1px;height:1px",
                    u = 21600,
                    v = {
                        path: 1,
                        rect: 1,
                        image: 1
                    },
                    w = {
                        circle: 1,
                        ellipse: 1
                    },
                    x = function (a) {
                        var d = /[ahqstv]/gi,
                            e = c._pathToAbsolute;
                        if (b(a).match(d) && (e = c._path2curve), d = /[clmz]/g, e == c._pathToAbsolute && !b(a).match(d)) {
                            var g = b(a).replace(q, function (a, b, c) {
                                var d = [],
                                    e = "m" == b.toLowerCase(),
                                    g = p[b];
                                return c.replace(s, function (a) {
                                    e && 2 == d.length && (g += d + p["m" == b ? "l" : "L"], d = []), d.push(f(a * u))
                                }), g + d
                            });
                            return g
                        }
                        var h, i, j = e(a);
                        g = [];
                        for (var k = 0, l = j.length; l > k; k++) {
                            h = j[k], i = j[k][0].toLowerCase(), "z" == i && (i = "x");
                            for (var m = 1, r = h.length; r > m; m++) i += f(h[m] * u) + (m != r - 1 ? "," : o);
                            g.push(i)
                        }
                        return g.join(n)
                    },
                    y = function (a, b, d) {
                        var e = c.matrix();
                        return e.rotate(-a, .5, .5), {
                            dx: e.x(b, d),
                            dy: e.y(b, d)
                        }
                    },
                    z = function (a, b, c, d, e, f) {
                        var g = a._,
                            h = a.matrix,
                            k = g.fillpos,
                            l = a.node,
                            m = l.style,
                            o = 1,
                            p = "",
                            q = u / b,
                            r = u / c;
                        if (m.visibility = "hidden", b && c) {
                            if (l.coordsize = i(q) + n + i(r), m.rotation = f * (0 > b * c ? -1 : 1), f) {
                                var s = y(f, d, e);
                                d = s.dx, e = s.dy
                            }
                            if (0 > b && (p += "x"), 0 > c && (p += " y") && (o = -1), m.flip = p, l.coordorigin = d * -q + n + e * -r, k || g.fillsize) {
                                var t = l.getElementsByTagName(j);
                                t = t && t[0], l.removeChild(t), k && (s = y(f, h.x(k[0], k[1]), h.y(k[0], k[1])), t.position = s.dx * o + n + s.dy * o), g.fillsize && (t.size = g.fillsize[0] * i(b) + n + g.fillsize[1] * i(c)), l.appendChild(t)
                            }
                            m.visibility = "visible"
                        }
                    };
                c.toString = function () {
                    return "Your browser doesn’t support SVG. Falling down to VML.\nYou are running Raphaël " + this.version
                };
                var A = function (a, c, d) {
                        for (var e = b(c).toLowerCase().split("-"), f = d ? "end" : "start", g = e.length, h = "classic", i = "medium", j = "medium"; g--;) switch (e[g]) {
                        case "block":
                        case "classic":
                        case "oval":
                        case "diamond":
                        case "open":
                        case "none":
                            h = e[g];
                            break;
                        case "wide":
                        case "narrow":
                            j = e[g];
                            break;
                        case "long":
                        case "short":
                            i = e[g]
                        }
                        var k = a.node.getElementsByTagName("stroke")[0];
                        k[f + "arrow"] = h, k[f + "arrowlength"] = i, k[f + "arrowwidth"] = j
                    },
                    B = function (e, i) {
                        e.attrs = e.attrs || {};
                        var l = e.node,
                            m = e.attrs,
                            p = l.style,
                            q = v[e.type] && (i.x != m.x || i.y != m.y || i.width != m.width || i.height != m.height || i.cx != m.cx || i.cy != m.cy || i.rx != m.rx || i.ry != m.ry || i.r != m.r),
                            r = w[e.type] && (m.cx != i.cx || m.cy != i.cy || m.r != i.r || m.rx != i.rx || m.ry != i.ry),
                            s = e;
                        for (var t in i) i[a](t) && (m[t] = i[t]);
                        if (q && (m.path = c._getPath[e.type](e), e._.dirty = 1), i.href && (l.href = i.href), i.title && (l.title = i.title), i.target && (l.target = i.target), i.cursor && (p.cursor = i.cursor), "blur" in i && e.blur(i.blur), (i.path && "path" == e.type || q) && (l.path = x(~b(m.path).toLowerCase().indexOf("r") ? c._pathToAbsolute(m.path) : m.path), "image" == e.type && (e._.fillpos = [m.x, m.y], e._.fillsize = [m.width, m.height], z(e, 1, 1, 0, 0, 0))), "transform" in i && e.transform(i.transform), r) {
                            var y = +m.cx,
                                B = +m.cy,
                                D = +m.rx || +m.r || 0,
                                E = +m.ry || +m.r || 0;
                            l.path = c.format("ar{0},{1},{2},{3},{4},{1},{4},{1}x", f((y - D) * u), f((B - E) * u), f((y + D) * u), f((B + E) * u), f(y * u)), e._.dirty = 1
                        }
                        if ("clip-rect" in i) {
                            var G = b(i["clip-rect"]).split(k);
                            if (4 == G.length) {
                                G[2] = +G[2] + +G[0], G[3] = +G[3] + +G[1];
                                var H = l.clipRect || c._g.doc.createElement("div"),
                                    I = H.style;
                                I.clip = c.format("rect({1}px {2}px {3}px {0}px)", G), l.clipRect || (I.position = "absolute", I.top = 0, I.left = 0, I.width = e.paper.width + "px", I.height = e.paper.height + "px", l.parentNode.insertBefore(H, l), H.appendChild(l), l.clipRect = H)
                            }
                            i["clip-rect"] || l.clipRect && (l.clipRect.style.clip = "auto")
                        }
                        if (e.textpath) {
                            var J = e.textpath.style;
                            i.font && (J.font = i.font), i["font-family"] && (J.fontFamily = '"' + i["font-family"].split(",")[0].replace(/^['"]+|['"]+$/g, o) + '"'), i["font-size"] && (J.fontSize = i["font-size"]), i["font-weight"] && (J.fontWeight = i["font-weight"]), i["font-style"] && (J.fontStyle = i["font-style"])
                        }
                        if ("arrow-start" in i && A(s, i["arrow-start"]), "arrow-end" in i && A(s, i["arrow-end"], 1), null != i.opacity || null != i["stroke-width"] || null != i.fill || null != i.src || null != i.stroke || null != i["stroke-width"] || null != i["stroke-opacity"] || null != i["fill-opacity"] || null != i["stroke-dasharray"] || null != i["stroke-miterlimit"] || null != i["stroke-linejoin"] || null != i["stroke-linecap"]) {
                            var K = l.getElementsByTagName(j),
                                L = !1;
                            if (K = K && K[0], !K && (L = K = F(j)), "image" == e.type && i.src && (K.src = i.src), i.fill && (K.on = !0), (null == K.on || "none" == i.fill || null === i.fill) && (K.on = !1), K.on && i.fill) {
                                var M = b(i.fill).match(c._ISURL);
                                if (M) {
                                    K.parentNode == l && l.removeChild(K), K.rotate = !0, K.src = M[1], K.type = "tile";
                                    var N = e.getBBox(1);
                                    K.position = N.x + n + N.y, e._.fillpos = [N.x, N.y], c._preload(M[1], function () {
                                        e._.fillsize = [this.offsetWidth, this.offsetHeight]
                                    })
                                } else K.color = c.getRGB(i.fill).hex, K.src = o, K.type = "solid", c.getRGB(i.fill).error && (s.type in {
                                    circle: 1,
                                    ellipse: 1
                                } || "r" != b(i.fill).charAt()) && C(s, i.fill, K) && (m.fill = "none", m.gradient = i.fill, K.rotate = !1)
                            }
                            if ("fill-opacity" in i || "opacity" in i) {
                                var O = ((+m["fill-opacity"] + 1 || 2) - 1) * ((+m.opacity + 1 || 2) - 1) * ((+c.getRGB(i.fill).o + 1 || 2) - 1);
                                O = h(g(O, 0), 1), K.opacity = O, K.src && (K.color = "none")
                            }
                            l.appendChild(K);
                            var P = l.getElementsByTagName("stroke") && l.getElementsByTagName("stroke")[0],
                                Q = !1;
                            !P && (Q = P = F("stroke")), (i.stroke && "none" != i.stroke || i["stroke-width"] || null != i["stroke-opacity"] || i["stroke-dasharray"] || i["stroke-miterlimit"] || i["stroke-linejoin"] || i["stroke-linecap"]) && (P.on = !0), ("none" == i.stroke || null === i.stroke || null == P.on || 0 == i.stroke || 0 == i["stroke-width"]) && (P.on = !1);
                            var R = c.getRGB(i.stroke);
                            P.on && i.stroke && (P.color = R.hex), O = ((+m["stroke-opacity"] + 1 || 2) - 1) * ((+m.opacity + 1 || 2) - 1) * ((+R.o + 1 || 2) - 1);
                            var S = .75 * (d(i["stroke-width"]) || 1);
                            if (O = h(g(O, 0), 1), null == i["stroke-width"] && (S = m["stroke-width"]), i["stroke-width"] && (P.weight = S), S && 1 > S && (O *= S) && (P.weight = 1), P.opacity = O, i["stroke-linejoin"] && (P.joinstyle = i["stroke-linejoin"] || "miter"), P.miterlimit = i["stroke-miterlimit"] || 8, i["stroke-linecap"] && (P.endcap = "butt" == i["stroke-linecap"] ? "flat" : "square" == i["stroke-linecap"] ? "square" : "round"), i["stroke-dasharray"]) {
                                var T = {
                                    "-": "shortdash",
                                    ".": "shortdot",
                                    "-.": "shortdashdot",
                                    "-..": "shortdashdotdot",
                                    ". ": "dot",
                                    "- ": "dash",
                                    "--": "longdash",
                                    "- .": "dashdot",
                                    "--.": "longdashdot",
                                    "--..": "longdashdotdot"
                                };
                                P.dashstyle = T[a](i["stroke-dasharray"]) ? T[i["stroke-dasharray"]] : o
                            }
                            Q && l.appendChild(P)
                        }
                        if ("text" == s.type) {
                            s.paper.canvas.style.display = o;
                            var U = s.paper.span,
                                V = 100,
                                W = m.font && m.font.match(/\d+(?:\.\d*)?(?=px)/);
                            p = U.style, m.font && (p.font = m.font), m["font-family"] && (p.fontFamily = m["font-family"]), m["font-weight"] && (p.fontWeight = m["font-weight"]), m["font-style"] && (p.fontStyle = m["font-style"]), W = d(m["font-size"] || W && W[0]) || 10, p.fontSize = W * V + "px", s.textpath.string && (U.innerHTML = b(s.textpath.string).replace(/</g, "&#60;").replace(/&/g, "&#38;").replace(/\n/g, "<br>"));
                            var X = U.getBoundingClientRect();
                            s.W = m.w = (X.right - X.left) / V, s.H = m.h = (X.bottom - X.top) / V, s.X = m.x, s.Y = m.y + s.H / 2, ("x" in i || "y" in i) && (s.path.v = c.format("m{0},{1}l{2},{1}", f(m.x * u), f(m.y * u), f(m.x * u) + 1));
                            for (var Y = ["x", "y", "text", "font", "font-family", "font-weight", "font-style", "font-size"], Z = 0, $ = Y.length; $ > Z; Z++)
                                if (Y[Z] in i) {
                                    s._.dirty = 1;
                                    break
                                }
                            switch (m["text-anchor"]) {
                            case "start":
                                s.textpath.style["v-text-align"] = "left", s.bbx = s.W / 2;
                                break;
                            case "end":
                                s.textpath.style["v-text-align"] = "right", s.bbx = -s.W / 2;
                                break;
                            default:
                                s.textpath.style["v-text-align"] = "center", s.bbx = 0
                            }
                            s.textpath.style["v-text-kern"] = !0
                        }
                    },
                    C = function (a, f, g) {
                        a.attrs = a.attrs || {};
                        var h = (a.attrs, Math.pow),
                            i = "linear",
                            j = ".5 .5";
                        if (a.attrs.gradient = f, f = b(f).replace(c._radial_gradient, function (a, b, c) {
                            return i = "radial", b && c && (b = d(b), c = d(c), h(b - .5, 2) + h(c - .5, 2) > .25 && (c = e.sqrt(.25 - h(b - .5, 2)) * (2 * (c > .5) - 1) + .5), j = b + n + c), o
                        }), f = f.split(/\s*\-\s*/), "linear" == i) {
                            var k = f.shift();
                            if (k = -d(k), isNaN(k)) return null
                        }
                        var l = c._parseDots(f);
                        if (!l) return null;
                        if (a = a.shape || a.node, l.length) {
                            a.removeChild(g), g.on = !0, g.method = "none", g.color = l[0].color, g.color2 = l[l.length - 1].color;
                            for (var m = [], p = 0, q = l.length; q > p; p++) l[p].offset && m.push(l[p].offset + n + l[p].color);
                            g.colors = m.length ? m.join() : "0% " + g.color, "radial" == i ? (g.type = "gradientTitle", g.focus = "100%", g.focussize = "0 0", g.focusposition = j, g.angle = 0) : (g.type = "gradient", g.angle = (270 - k) % 360), a.appendChild(g)
                        }
                        return 1
                    },
                    D = function (a, b) {
                        this[0] = this.node = a, a.raphael = !0, this.id = c._oid++, a.raphaelid = this.id, this.X = 0, this.Y = 0, this.attrs = {}, this.paper = b, this.matrix = c.matrix(), this._ = {
                            transform: [],
                            sx: 1,
                            sy: 1,
                            dx: 0,
                            dy: 0,
                            deg: 0,
                            dirty: 1,
                            dirtyT: 1
                        }, !b.bottom && (b.bottom = this), this.prev = b.top, b.top && (b.top.next = this), b.top = this, this.next = null
                    },
                    E = c.el;
                D.prototype = E, E.constructor = D, E.transform = function (a) {
                    if (null == a) return this._.transform;
                    var d, e = this.paper._viewBoxShift,
                        f = e ? "s" + [e.scale, e.scale] + "-1-1t" + [e.dx, e.dy] : o;
                    e && (d = a = b(a).replace(/\.{3}|\u2026/g, this._.transform || o)), c._extractTransform(this, f + a);
                    var g, h = this.matrix.clone(),
                        i = this.skew,
                        j = this.node,
                        k = ~b(this.attrs.fill).indexOf("-"),
                        l = !b(this.attrs.fill).indexOf("url(");
                    if (h.translate(1, 1), l || k || "image" == this.type)
                        if (i.matrix = "1 0 0 1", i.offset = "0 0", g = h.split(), k && g.noRotation || !g.isSimple) {
                            j.style.filter = h.toFilter();
                            var m = this.getBBox(),
                                p = this.getBBox(1),
                                q = m.x - p.x,
                                r = m.y - p.y;
                            j.coordorigin = q * -u + n + r * -u, z(this, 1, 1, q, r, 0)
                        } else j.style.filter = o, z(this, g.scalex, g.scaley, g.dx, g.dy, g.rotate);
                    else j.style.filter = o, i.matrix = b(h), i.offset = h.offset();
                    return d && (this._.transform = d), this
                }, E.rotate = function (a, c, e) {
                    if (this.removed) return this;
                    if (null != a) {
                        if (a = b(a).split(k), a.length - 1 && (c = d(a[1]), e = d(a[2])), a = d(a[0]), null == e && (c = e), null == c || null == e) {
                            var f = this.getBBox(1);
                            c = f.x + f.width / 2, e = f.y + f.height / 2
                        }
                        return this._.dirtyT = 1, this.transform(this._.transform.concat([["r", a, c, e]])), this
                    }
                }, E.translate = function (a, c) {
                    return this.removed ? this : (a = b(a).split(k), a.length - 1 && (c = d(a[1])), a = d(a[0]) || 0, c = +c || 0, this._.bbox && (this._.bbox.x += a, this._.bbox.y += c), this.transform(this._.transform.concat([["t", a, c]])), this)
                }, E.scale = function (a, c, e, f) {
                    if (this.removed) return this;
                    if (a = b(a).split(k), a.length - 1 && (c = d(a[1]), e = d(a[2]), f = d(a[3]), isNaN(e) && (e = null), isNaN(f) && (f = null)), a = d(a[0]), null == c && (c = a), null == f && (e = f), null == e || null == f) var g = this.getBBox(1);
                    return e = null == e ? g.x + g.width / 2 : e, f = null == f ? g.y + g.height / 2 : f, this.transform(this._.transform.concat([["s", a, c, e, f]])), this._.dirtyT = 1, this
                }, E.hide = function () {
                    return !this.removed && (this.node.style.display = "none"), this
                }, E.show = function () {
                    return !this.removed && (this.node.style.display = o), this
                }, E._getBBox = function () {
                    return this.removed ? {} : {
                        x: this.X + (this.bbx || 0) - this.W / 2,
                        y: this.Y - this.H,
                        width: this.W,
                        height: this.H
                    }
                }, E.remove = function () {
                    if (!this.removed && this.node.parentNode) {
                        this.paper.__set__ && this.paper.__set__.exclude(this), c.eve.unbind("raphael.*.*." + this.id), c._tear(this, this.paper), this.node.parentNode.removeChild(this.node), this.shape && this.shape.parentNode.removeChild(this.shape);
                        for (var a in this) this[a] = "function" == typeof this[a] ? c._removedFactory(a) : null;
                        this.removed = !0
                    }
                }, E.attr = function (b, d) {
                    if (this.removed) return this;
                    if (null == b) {
                        var e = {};
                        for (var f in this.attrs) this.attrs[a](f) && (e[f] = this.attrs[f]);
                        return e.gradient && "none" == e.fill && (e.fill = e.gradient) && delete e.gradient, e.transform = this._.transform, e
                    }
                    if (null == d && c.is(b, "string")) {
                        if (b == j && "none" == this.attrs.fill && this.attrs.gradient) return this.attrs.gradient;
                        for (var g = b.split(k), h = {}, i = 0, m = g.length; m > i; i++) b = g[i], h[b] = b in this.attrs ? this.attrs[b] : c.is(this.paper.customAttributes[b], "function") ? this.paper.customAttributes[b].def : c._availableAttrs[b];
                        return m - 1 ? h : h[g[0]]
                    }
                    if (this.attrs && null == d && c.is(b, "array")) {
                        for (h = {}, i = 0, m = b.length; m > i; i++) h[b[i]] = this.attr(b[i]);
                        return h
                    }
                    var n;
                    null != d && (n = {}, n[b] = d), null == d && c.is(b, "object") && (n = b);
                    for (var o in n) l("raphael.attr." + o + "." + this.id, this, n[o]);
                    if (n) {
                        for (o in this.paper.customAttributes)
                            if (this.paper.customAttributes[a](o) && n[a](o) && c.is(this.paper.customAttributes[o], "function")) {
                                var p = this.paper.customAttributes[o].apply(this, [].concat(n[o]));
                                this.attrs[o] = n[o];
                                for (var q in p) p[a](q) && (n[q] = p[q])
                            }
                        n.text && "text" == this.type && (this.textpath.string = n.text), B(this, n)
                    }
                    return this
                }, E.toFront = function () {
                    return !this.removed && this.node.parentNode.appendChild(this.node), this.paper && this.paper.top != this && c._tofront(this, this.paper), this
                }, E.toBack = function () {
                    return this.removed ? this : (this.node.parentNode.firstChild != this.node && (this.node.parentNode.insertBefore(this.node, this.node.parentNode.firstChild), c._toback(this, this.paper)), this)
                }, E.insertAfter = function (a) {
                    return this.removed ? this : (a.constructor == c.st.constructor && (a = a[a.length - 1]), a.node.nextSibling ? a.node.parentNode.insertBefore(this.node, a.node.nextSibling) : a.node.parentNode.appendChild(this.node), c._insertafter(this, a, this.paper), this)
                }, E.insertBefore = function (a) {
                    return this.removed ? this : (a.constructor == c.st.constructor && (a = a[0]), a.node.parentNode.insertBefore(this.node, a.node), c._insertbefore(this, a, this.paper), this)
                }, E.blur = function (a) {
                    var b = this.node.runtimeStyle,
                        d = b.filter;
                    return d = d.replace(r, o), 0 !== +a ? (this.attrs.blur = a, b.filter = d + n + m + ".Blur(pixelradius=" + (+a || 1.5) + ")", b.margin = c.format("-{0}px 0 0 -{0}px", f(+a || 1.5))) : (b.filter = d, b.margin = 0, delete this.attrs.blur), this
                }, c._engine.path = function (a, b) {
                    var c = F("shape");
                    c.style.cssText = t, c.coordsize = u + n + u, c.coordorigin = b.coordorigin;
                    var d = new D(c, b),
                        e = {
                            fill: "none",
                            stroke: "#000"
                        };
                    a && (e.path = a), d.type = "path", d.path = [], d.Path = o, B(d, e), b.canvas.appendChild(c);
                    var f = F("skew");
                    return f.on = !0, c.appendChild(f), d.skew = f, d.transform(o), d
                }, c._engine.rect = function (a, b, d, e, f, g) {
                    var h = c._rectPath(b, d, e, f, g),
                        i = a.path(h),
                        j = i.attrs;
                    return i.X = j.x = b, i.Y = j.y = d, i.W = j.width = e, i.H = j.height = f, j.r = g, j.path = h, i.type = "rect", i
                }, c._engine.ellipse = function (a, b, c, d, e) {
                    var f = a.path();
                    return f.attrs, f.X = b - d, f.Y = c - e, f.W = 2 * d, f.H = 2 * e, f.type = "ellipse", B(f, {
                        cx: b,
                        cy: c,
                        rx: d,
                        ry: e
                    }), f
                }, c._engine.circle = function (a, b, c, d) {
                    var e = a.path();
                    return e.attrs, e.X = b - d, e.Y = c - d, e.W = e.H = 2 * d, e.type = "circle", B(e, {
                        cx: b,
                        cy: c,
                        r: d
                    }), e
                }, c._engine.image = function (a, b, d, e, f, g) {
                    var h = c._rectPath(d, e, f, g),
                        i = a.path(h).attr({
                            stroke: "none"
                        }),
                        k = i.attrs,
                        l = i.node,
                        m = l.getElementsByTagName(j)[0];
                    return k.src = b, i.X = k.x = d, i.Y = k.y = e, i.W = k.width = f, i.H = k.height = g, k.path = h, i.type = "image", m.parentNode == l && l.removeChild(m), m.rotate = !0, m.src = b, m.type = "tile", i._.fillpos = [d, e], i._.fillsize = [f, g], l.appendChild(m), z(i, 1, 1, 0, 0, 0), i
                }, c._engine.text = function (a, d, e, g) {
                    var h = F("shape"),
                        i = F("path"),
                        j = F("textpath");
                    d = d || 0, e = e || 0, g = g || "", i.v = c.format("m{0},{1}l{2},{1}", f(d * u), f(e * u), f(d * u) + 1), i.textpathok = !0, j.string = b(g), j.on = !0, h.style.cssText = t, h.coordsize = u + n + u, h.coordorigin = "0 0";
                    var k = new D(h, a),
                        l = {
                            fill: "#000",
                            stroke: "none",
                            font: c._availableAttrs.font,
                            text: g
                        };
                    k.shape = h, k.path = i, k.textpath = j, k.type = "text", k.attrs.text = b(g), k.attrs.x = d, k.attrs.y = e, k.attrs.w = 1, k.attrs.h = 1, B(k, l), h.appendChild(j), h.appendChild(i), a.canvas.appendChild(h);
                    var m = F("skew");
                    return m.on = !0, h.appendChild(m), k.skew = m, k.transform(o), k
                }, c._engine.setSize = function (a, b) {
                    var d = this.canvas.style;
                    return this.width = a, this.height = b, a == +a && (a += "px"), b == +b && (b += "px"), d.width = a, d.height = b, d.clip = "rect(0 " + a + " " + b + " 0)", this._viewBox && c._engine.setViewBox.apply(this, this._viewBox), this
                }, c._engine.setViewBox = function (a, b, d, e, f) {
                    c.eve("raphael.setViewBox", this, this._viewBox, [a, b, d, e, f]);
                    var h, i, j = this.width,
                        k = this.height,
                        l = 1 / g(d / j, e / k);
                    return f && (h = k / e, i = j / d, j > d * h && (a -= (j - d * h) / 2 / h), k > e * i && (b -= (k - e * i) / 2 / i)), this._viewBox = [a, b, d, e, !!f], this._viewBoxShift = {
                        dx: -a,
                        dy: -b,
                        scale: l
                    }, this.forEach(function (a) {
                        a.transform("...")
                    }), this
                };
                var F;
                c._engine.initWin = function (a) {
                    var b = a.document;
                    b.createStyleSheet().addRule(".rvml", "behavior:url(#default#VML)");
                    try {
                        !b.namespaces.rvml && b.namespaces.add("rvml", "urn:schemas-microsoft-com:vml"), F = function (a) {
                            return b.createElement("<rvml:" + a + ' class="rvml">')
                        }
                    } catch (c) {
                        F = function (a) {
                            return b.createElement("<" + a + ' xmlns="urn:schemas-microsoft.com:vml" class="rvml">')
                        }
                    }
                }, c._engine.initWin(c._g.win), c._engine.create = function () {
                    var a = c._getContainer.apply(0, arguments),
                        b = a.container,
                        d = a.height,
                        e = a.width,
                        f = a.x,
                        g = a.y;
                    if (!b) throw new Error("VML container not found.");
                    var h = new c._Paper,
                        i = h.canvas = c._g.doc.createElement("div"),
                        j = i.style;
                    return f = f || 0, g = g || 0, e = e || 512, d = d || 342, h.width = e, h.height = d, e == +e && (e += "px"), d == +d && (d += "px"), h.coordsize = 1e3 * u + n + 1e3 * u, h.coordorigin = "0 0", h.span = c._g.doc.createElement("span"), h.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;", i.appendChild(h.span), j.cssText = c.format("top:0;left:0;width:{0};height:{1};display:inline-block;position:relative;clip:rect(0 {0} {1} 0);overflow:hidden", e, d), 1 == b ? (c._g.doc.body.appendChild(i), j.left = f + "px", j.top = g + "px", j.position = "absolute") : b.firstChild ? b.insertBefore(i, b.firstChild) : b.appendChild(i), h.renderfix = function () {}, h
                }, c.prototype.clear = function () {
                    c.eve("raphael.clear", this), this.canvas.innerHTML = o, this.span = c._g.doc.createElement("span"), this.span.style.cssText = "position:absolute;left:-9999em;top:-9999em;padding:0;margin:0;line-height:1;display:inline;", this.canvas.appendChild(this.span), this.bottom = this.top = null
                }, c.prototype.remove = function () {
                    c.eve("raphael.remove", this), this.canvas.parentNode.removeChild(this.canvas);
                    for (var a in this) this[a] = "function" == typeof this[a] ? c._removedFactory(a) : null;
                    return !0
                };
                var G = c.st;
                for (var H in E) E[a](H) && !G[a](H) && (G[H] = function (a) {
                    return function () {
                        var b = arguments;
                        return this.forEach(function (c) {
                            c[a].apply(c, b)
                        })
                    }
                }(H))
            }
        }(), B.was ? A.win.Raphael = c : Raphael = c, c
});

//Open Sans Font (used for scalable location labels) /*! * Copyright: * Copyleft 2002, 2003, 2005, 2008, 2009, 2010 Free Software Foundation.* * Manufacturer: * GNU * * Vendor URL:* https://savannah.gnu.org/projects/freefont/ * * License information: * http://www.gnu.org/copyleft/gpl.html*/
Raphael.registerFont({
    "w": 200,
    "face": {
        "font-family": "FreeSans",
        "font-weight": 400,
        "font-stretch": "normal",
        "units-per-em": "360",
        "panose-1": "2 11 5 4 2 2 2 2 2 4",
        "ascent": "288",
        "descent": "-72",
        "x-height": "8",
        "bbox": "-8 -277 342.017 78.0413",
        "underline-thickness": "18",
        "underline-position": "-54.36",
        "stemh": "30",
        "stemv": "33",
        "unicode-range": "U+0020-U+007E"
    },
    "glyphs": {
        " ": {
            "w": 100
        },
        "!": {
            "d": "75,-262r0,121r-8,81r-14,0v-8,-62,-9,-131,-8,-202r30,0xm75,-37r0,37r-30,0r0,-37r30,0",
            "w": 100
        },
        "\"": {
            "d": "19,-255r33,0v2,35,-4,62,-10,88r-14,0v-6,-27,-11,-54,-9,-88xm76,-255r34,0v2,35,-4,62,-10,88r-14,0v-6,-27,-12,-53,-10,-88",
            "w": 127
        },
        "#": {
            "d": "175,-251r-13,71r33,0r0,24r-38,0r-11,63r38,0r0,24r-43,0r-14,76r-27,0r14,-76r-45,0r-14,76r-27,0r13,-76r-36,0r0,-24r41,0r11,-63r-39,0r0,-24r44,0r13,-71r27,0r-13,71r45,0r13,-71r28,0xm130,-156r-45,0r-12,63r45,0"
        },
        "$": {
            "d": "87,-114v-48,-13,-70,-26,-70,-72v0,-41,24,-66,70,-72r0,-19r22,0r0,19v44,3,70,30,70,71r-29,0v0,-26,-17,-45,-41,-46r0,90v22,6,77,15,77,73v0,46,-26,74,-77,78r0,37r-22,0r0,-37v-51,-4,-77,-32,-75,-83r28,0v2,24,3,52,47,58r0,-97xm87,-146r0,-86v-27,4,-41,19,-41,43v0,22,13,35,41,43xm109,-17v33,-4,48,-24,48,-49v0,-24,-11,-34,-48,-45r0,94"
        },
        "%": {
            "d": "72,-247v35,0,61,28,61,63v0,33,-28,61,-61,61v-34,0,-62,-28,-62,-62v0,-34,29,-62,62,-62xm72,-221v-20,0,-37,16,-37,36v0,20,17,36,37,36v20,0,36,-16,36,-36v0,-21,-15,-36,-36,-36xm219,-255r24,0r-142,262r-24,0xm248,-116v35,0,61,27,61,62v0,33,-28,61,-61,61v-34,0,-62,-28,-62,-62v0,-33,29,-61,62,-61xm248,-91v-20,0,-37,16,-37,36v0,20,17,37,37,37v20,0,36,-17,36,-36v0,-21,-15,-37,-36,-37",
            "w": 320
        },
        "&": {
            "d": "168,-28v-12,11,-34,36,-75,36v-44,0,-74,-28,-74,-71v0,-33,13,-51,58,-77v-22,-28,-29,-42,-29,-59v0,-32,27,-56,61,-56v34,0,59,23,59,56v0,26,-13,42,-50,63r48,59v7,-13,11,-29,11,-43r29,0v0,22,-8,45,-21,66r44,54r-39,0xm103,-155v28,-18,37,-28,37,-44v0,-18,-14,-31,-32,-31v-19,0,-31,12,-31,31v0,13,4,19,26,44xm150,-49r-57,-72v-33,21,-44,35,-44,55v0,52,70,62,101,17",
            "w": 240
        },
        "'": {
            "d": "17,-255r34,0v2,35,-4,62,-10,88r-14,0v-6,-27,-12,-53,-10,-88",
            "w": 68
        },
        "(": {
            "d": "85,-262r20,0v-66,104,-66,235,0,338r-20,0v-77,-98,-77,-240,0,-338",
            "w": 119
        },
        ")": {
            "d": "33,76r-19,0v65,-104,65,-235,0,-338r19,0v77,98,77,240,0,338",
            "w": 119
        },
        "*": {
            "d": "58,-262r22,0r-2,40r39,-14r6,21r-38,11r25,32r-19,13r-22,-33r-23,33r-18,-13r25,-32r-39,-11r7,-21r38,14",
            "w": 140
        },
        "+": {
            "d": "192,-96r0,25r-74,0r0,75r-25,0r0,-75r-75,0r0,-25r75,0r0,-75r25,0r0,75r74,0",
            "w": 210
        },
        ",": {
            "d": "31,-37r38,0v1,42,3,94,-38,90r0,-14v19,1,23,-13,22,-39r-22,0r0,-37",
            "w": 100
        },
        "-": {
            "d": "102,-112r0,26r-85,0r0,-26r85,0",
            "w": 119,
            "k": {
                "A": 18,
                "V": 18,
                "W": 18,
                "Y": 18,
                "C": 7,
                "G": 7,
                "O": 7,
                "Q": 7,
                "a": 14,
                "g": 14,
                "v": 22,
                "w": 22,
                "y": 22,
                "T": 18,
                "J": 7,
                "j": 11,
                "x": 18,
                "m": 14,
                "n": 14,
                "p": 14,
                "r": 14,
                "u": 14,
                "z": 14,
                "s": 18,
                "f": 14,
                "t": 14,
                "X": 18,
                "Z": 18,
                "S": 4
            }
        },
        ".": {
            "d": "69,-37r0,37r-38,0r0,-37r38,0",
            "w": 100
        },
        "\/": {
            "d": "82,-262r20,0r-85,269r-20,0",
            "w": 100
        },
        "0": {
            "d": "15,-123v0,-112,48,-132,84,-132v63,0,84,60,84,134v0,84,-30,129,-84,129v-55,0,-84,-45,-84,-131xm99,-227v-34,0,-51,34,-51,104v0,70,17,105,50,105v35,0,52,-34,52,-106v0,-68,-17,-103,-51,-103"
        },
        "1": {
            "d": "93,-182r-56,0r0,-22v49,-6,56,-12,67,-51r21,0r0,255r-32,0r0,-182"
        },
        "2": {
            "d": "18,-167v2,-77,49,-88,84,-88v48,0,82,31,82,75v0,45,-51,77,-90,96v-33,16,-43,32,-46,53r134,0r0,31r-170,0v-4,-69,48,-103,105,-129v51,-24,43,-98,-16,-99v-44,0,-50,37,-51,61r-32,0"
        },
        "3": {
            "d": "97,-228v-40,0,-47,27,-48,55r-32,0v1,-54,29,-82,80,-82v79,0,107,98,42,123v31,10,43,29,43,61v0,48,-33,79,-86,79v-53,0,-80,-27,-84,-82r31,0v2,37,19,54,54,54v33,0,53,-19,53,-51v0,-37,-28,-49,-70,-46r0,-27v42,-1,62,-7,62,-40v0,-27,-17,-44,-45,-44"
        },
        "4": {
            "d": "118,-61r-108,0r0,-34r116,-160r23,0r0,165r38,0r0,29r-38,0r0,61r-31,0r0,-61xm118,-90r0,-111r-80,111r80,0"
        },
        "5": {
            "d": "171,-255r0,31r-106,0r-10,71v55,-39,130,2,130,70v0,54,-37,91,-88,91v-72,0,-81,-54,-84,-71r31,0v8,29,24,43,52,43v35,0,56,-22,56,-59v0,-61,-71,-82,-102,-37r-29,0r19,-139r131,0"
        },
        "6": {
            "d": "15,-116v0,-118,55,-139,92,-139v39,0,66,24,72,66r-31,0v-5,-24,-21,-38,-43,-38v-36,0,-57,35,-57,97v39,-56,137,-25,137,52v0,50,-35,86,-84,86v-64,0,-86,-52,-86,-124xm103,-131v-31,0,-53,22,-53,54v0,33,22,57,52,57v29,0,50,-23,50,-55v0,-34,-18,-56,-49,-56"
        },
        "7": {
            "d": "187,-255r0,26v-58,77,-89,147,-103,229r-34,0v19,-84,43,-137,104,-224r-137,0r0,-31r170,0"
        },
        "8": {
            "d": "141,-134v78,31,43,142,-42,142v-85,0,-120,-111,-42,-142v-67,-32,-31,-121,42,-121v73,0,109,89,42,121xm99,-227v-27,0,-44,16,-44,40v0,24,17,40,44,40v27,0,44,-15,44,-39v0,-25,-17,-41,-44,-41xm99,-120v-32,0,-53,20,-53,50v0,30,21,50,52,50v32,0,54,-20,54,-50v0,-30,-21,-50,-53,-50"
        },
        "9": {
            "d": "183,-131v0,118,-55,139,-92,139v-39,0,-66,-24,-72,-66r32,0v5,24,21,38,43,38v36,0,56,-35,56,-97v-42,57,-136,24,-136,-52v0,-50,34,-86,83,-86v63,0,86,51,86,124xm97,-228v-29,0,-51,24,-51,56v0,34,19,56,50,56v31,0,53,-23,53,-54v0,-33,-22,-58,-52,-58"
        },
        ":": {
            "d": "77,-37r0,37r-37,0r0,-37r37,0xm77,-189r0,38r-37,0r0,-38r37,0",
            "w": 100
        },
        ";": {
            "d": "77,-189r0,38r-37,0r0,-38r37,0xm40,-37r37,0v1,42,4,94,-37,90r0,-14v19,1,22,-14,21,-39r-21,0r0,-37",
            "w": 100
        },
        "<": {
            "d": "16,-71r0,-25r176,-75r0,29r-142,58r142,59r0,28",
            "w": 210
        },
        "=": {
            "d": "192,-127r0,25r-174,0r0,-25r174,0xm192,-65r0,25r-174,0r0,-25r174,0",
            "w": 210
        },
        ">": {
            "d": "194,-96r0,25r-176,74r0,-28r142,-58r-142,-59r0,-29",
            "w": 210
        },
        "?": {
            "d": "183,-198v-1,67,-74,62,-64,126r-33,0v-11,-67,63,-75,65,-126v0,-24,-18,-41,-46,-41v-37,0,-47,24,-47,56r-30,0v0,-55,27,-84,79,-84v47,0,76,27,76,69xm119,-37r0,37r-33,0r0,-37r33,0"
        },
        "@": {
            "d": "342,-133v1,52,-42,112,-98,112v-23,0,-36,-9,-39,-27v-37,49,-110,23,-110,-40v0,-69,99,-143,136,-69r8,-23r30,0r-36,118v0,9,8,16,18,16v31,0,60,-41,60,-83v0,-60,-58,-110,-127,-110v-76,0,-141,65,-141,141v1,93,102,146,204,110r10,24v-112,47,-245,-21,-245,-129v0,-92,83,-174,177,-174v84,0,153,61,153,134xm163,-45v34,0,56,-56,56,-87v0,-18,-15,-33,-34,-33v-50,0,-88,120,-22,120",
            "w": 365
        },
        "A": {
            "d": "171,-79r-102,0r-27,79r-36,0r94,-262r43,0r92,262r-37,0xm161,-107r-40,-119r-43,119r83,0",
            "w": 240,
            "k": {
                "V": 22,
                "W": 22,
                "Y": 22,
                "C": 14,
                "G": 14,
                "O": 14,
                "Q": 14,
                "e": 7,
                "a": 7,
                "g": 7,
                "v": 11,
                "w": 11,
                "y": 11,
                "T": 14,
                "m": 11,
                "n": 11,
                "z": 11,
                "s": 7,
                "f": 11,
                "t": 11,
                "X": 4,
                "Z": 4,
                "S": 11,
                "r": 11,
                "p": 7,
                "u": 9,
                "c": 4,
                "o": 5,
                "d": 2,
                "q": 2,
                "I": 14,
                ",": 7,
                ".": 7,
                "-": 18
            }
        },
        "B": {
            "d": "224,-75v0,45,-31,75,-77,75r-119,0r0,-262r107,0v96,2,98,94,41,123v33,13,48,32,48,64xm179,-191v-2,-58,-65,-39,-117,-42r0,84v51,-2,118,13,117,-42xm144,-30v70,-2,59,-90,0,-90r-82,0r0,90r82,0",
            "w": 240,
            "k": {
                "A": 11,
                "V": 18,
                "W": 18,
                "Y": 18,
                "C": 11,
                "G": 11,
                "O": 11,
                "Q": 11,
                "a": 4,
                "g": 4,
                "v": 11,
                "w": 11,
                "y": 11,
                "T": 18,
                "j": 7,
                "x": 11,
                "m": 11,
                "n": 11,
                "z": 11,
                "s": 4,
                "f": 4,
                "t": 4,
                "X": 18,
                "Z": 18,
                "S": 7,
                "r": 7,
                "p": 4,
                "u": 7,
                "o": 2,
                "I": 11,
                ",": 18,
                ".": 18,
                "-": 7
            }
        },
        "C": {
            "d": "17,-128v0,-55,24,-139,120,-139v58,0,91,28,101,86r-34,0v-8,-37,-29,-56,-71,-56v-51,0,-82,41,-82,108v0,66,33,108,85,108v44,0,65,-25,73,-75r35,0v-8,69,-44,104,-108,104v-95,0,-119,-82,-119,-136",
            "w": 259,
            "k": {
                "A": 14,
                "V": 18,
                "W": 18,
                "Y": 18,
                "C": 7,
                "G": 7,
                "O": 7,
                "Q": 7,
                "a": 7,
                "g": 7,
                "v": 4,
                "w": 4,
                "y": 4,
                "T": 14,
                "j": 11,
                "x": 11,
                "m": 11,
                "n": 11,
                "z": 11,
                "s": 7,
                "f": 7,
                "t": 7,
                "X": 14,
                "Z": 14,
                "S": 4,
                "r": 7,
                "p": 7,
                "u": 9,
                "o": 2,
                "I": 14,
                ",": 11,
                ".": 11
            }
        },
        "D": {
            "d": "32,0r0,-262r101,0v67,0,107,50,107,131v0,82,-41,131,-107,131r-101,0xm66,-30v88,7,141,-7,141,-101v0,-94,-52,-109,-141,-102r0,203",
            "w": 259,
            "k": {
                "A": 18,
                "V": 18,
                "W": 18,
                "Y": 18,
                "C": 7,
                "G": 7,
                "O": 7,
                "Q": 7,
                "e": 4,
                "a": 9,
                "g": 9,
                "v": 4,
                "w": 4,
                "y": 4,
                "T": 18,
                "J": 4,
                "j": 4,
                "x": 7,
                "m": 14,
                "n": 14,
                "z": 14,
                "s": 7,
                "f": 4,
                "t": 4,
                "X": 20,
                "Z": 20,
                "S": 11,
                "r": 14,
                "p": 9,
                "u": 13,
                "c": 4,
                "o": 4,
                "d": 2,
                "q": 2,
                "I": 20,
                ",": 11,
                ".": 11
            }
        },
        "E": {
            "d": "66,-120r0,90r155,0r0,30r-189,0r0,-262r182,0r0,29r-148,0r0,84r143,0r0,29r-143,0",
            "w": 240,
            "k": {
                "A": 11,
                "V": 18,
                "W": 18,
                "Y": 18,
                "C": 14,
                "G": 14,
                "O": 14,
                "Q": 14,
                "e": 11,
                "a": 11,
                "g": 11,
                "v": 14,
                "w": 14,
                "y": 14,
                "T": 7,
                "J": 7,
                "j": 11,
                "x": 11,
                "m": 14,
                "n": 14,
                "z": 14,
                "s": 7,
                "f": 11,
                "t": 11,
                "X": 11,
                "Z": 11,
                "S": 18,
                "r": 11,
                "p": 7,
                "u": 16,
                "c": 11,
                "o": 13,
                "d": 9,
                "q": 9,
                "I": 14
            }
        },
        "F": {
            "d": "66,-120r0,120r-34,0r0,-262r176,0r0,29r-142,0r0,84r125,0r0,29r-125,0",
            "w": 219,
            "k": {
                "A": 14,
                "V": 7,
                "W": 7,
                "Y": 7,
                "C": 11,
                "G": 11,
                "O": 11,
                "Q": 11,
                "e": 14,
                "a": 11,
                "g": 11,
                "v": 4,
                "w": 4,
                "y": 4,
                "J": 11,
                "j": 7,
                "x": 14,
                "m": 18,
                "n": 18,
                "z": 18,
                "s": 14,
                "f": 7,
                "t": 7,
                "X": 11,
                "Z": 11,
                "S": 14,
                "r": 14,
                "p": 11,
                "u": 18,
                "c": 11,
                "o": 13,
                "d": 9,
                "q": 9,
                "I": 14,
                ",": 22,
                ".": 22,
                "-": 11
            }
        },
        "G": {
            "d": "49,-130v0,42,19,109,94,109v50,-1,86,-35,83,-88r-80,0r0,-30r109,0r0,140r-21,0r-8,-34v-74,85,-210,29,-210,-96v0,-53,25,-138,126,-138v60,0,101,31,110,84r-35,0v-7,-34,-36,-54,-76,-54v-55,0,-92,43,-92,107",
            "w": 280,
            "k": {
                "A": 14,
                "V": 18,
                "W": 18,
                "Y": 18,
                "C": 7,
                "G": 7,
                "O": 7,
                "Q": 7,
                "a": 7,
                "g": 7,
                "v": 4,
                "w": 4,
                "y": 4,
                "T": 14,
                "j": 11,
                "x": 11,
                "m": 11,
                "n": 11,
                "z": 11,
                "s": 7,
                "f": 7,
                "t": 7,
                "X": 14,
                "Z": 14,
                "S": 4,
                "r": 7,
                "p": 7,
                "u": 9,
                "o": 2,
                "I": 14,
                ",": 11,
                ".": 11
            }
        },
        "H": {
            "d": "198,-120r-135,0r0,120r-33,0r0,-262r33,0r0,113r135,0r0,-113r34,0r0,262r-34,0r0,-120",
            "w": 259
        },
        "I": {
            "d": "70,-262r0,262r-34,0r0,-262r34,0",
            "w": 100,
            "k": {
                "A": 14,
                "V": 14,
                "W": 14,
                "Y": 14,
                "C": 9,
                "G": 9,
                "O": 9,
                "Q": 9,
                "e": 11,
                "a": 11,
                "g": 11,
                "v": 7,
                "w": 7,
                "y": 7,
                "T": 4,
                "x": 11,
                "m": 11,
                "n": 11,
                "z": 11,
                "s": 11,
                "f": 4,
                "t": 4,
                "X": 14,
                "Z": 14,
                "S": 13,
                "r": 11,
                "p": 11,
                "u": 14,
                "c": 7,
                "o": 7,
                "d": 7,
                "q": 7,
                "I": 14
            }
        },
        "J": {
            "d": "80,-20v33,0,40,-25,40,-58r0,-184r33,0r0,196v0,45,-28,74,-74,74v-54,-1,-79,-35,-73,-92r34,0v-3,37,9,64,40,64",
            "w": 180,
            "k": {
                "A": 11,
                "V": 18,
                "W": 18,
                "Y": 18,
                "C": 11,
                "G": 11,
                "O": 11,
                "Q": 11,
                "e": 7,
                "a": 9,
                "g": 9,
                "v": 11,
                "w": 11,
                "y": 11,
                "j": 7,
                "x": 18,
                "m": 14,
                "n": 14,
                "z": 14,
                "s": 7,
                "X": 18,
                "Z": 18,
                "S": 11,
                "r": 11,
                "p": 7,
                "u": 14,
                "c": 7,
                "o": 9,
                "d": 5,
                "q": 5,
                "I": 14
            }
        },
        "K": {
            "d": "62,-92r0,92r-34,0r0,-262r34,0r0,132r131,-132r43,0r-107,106r108,156r-40,0r-92,-135",
            "w": 240,
            "k": {
                "C": 18,
                "G": 18,
                "O": 18,
                "Q": 18,
                "e": 14,
                "a": 11,
                "g": 11,
                "v": 11,
                "w": 11,
                "y": 11,
                "j": 4,
                "x": 7,
                "m": 14,
                "n": 14,
                "z": 14,
                "s": 7,
                "f": 11,
                "t": 11,
                "S": 18,
                "r": 14,
                "p": 11,
                "u": 14,
                "c": 14,
                "o": 16,
                "d": 13,
                "q": 13,
                "I": 14,
                ",": 14,
                ".": 14,
                "-": 18
            }
        },
        "L": {
            "d": "62,-262r0,232r130,0r0,30r-163,0r0,-262r33,0",
            "k": {
                "V": 22,
                "W": 22,
                "Y": 22,
                "C": 14,
                "G": 14,
                "O": 14,
                "Q": 14,
                "e": 11,
                "a": 7,
                "g": 7,
                "v": 14,
                "w": 14,
                "y": 14,
                "T": 14,
                "j": 4,
                "m": 14,
                "n": 14,
                "z": 14,
                "s": 7,
                "f": 11,
                "t": 11,
                "S": 14,
                "r": 11,
                "u": 14,
                "c": 11,
                "o": 13,
                "d": 9,
                "q": 9,
                "I": 11,
                ",": 7,
                ".": 7,
                "-": 22
            }
        },
        "M": {
            "d": "168,0r-35,0r-74,-220r0,220r-32,0r0,-262r46,0r78,228r77,-228r46,0r0,262r-32,0r0,-220",
            "w": 299
        },
        "N": {
            "d": "233,-262r0,262r-38,0r-136,-213r0,213r-32,0r0,-262r37,0r137,214r0,-214r32,0",
            "w": 259
        },
        "O": {
            "d": "267,-127v0,76,-49,135,-127,135v-76,0,-126,-55,-126,-137v0,-82,51,-138,126,-138v77,0,127,55,127,140xm140,-237v-55,0,-93,43,-93,108v0,65,37,108,93,108v55,0,94,-44,94,-107v0,-66,-37,-109,-94,-109",
            "w": 280,
            "k": {
                "A": 11,
                "V": 14,
                "W": 14,
                "Y": 14,
                "a": 7,
                "g": 7,
                "T": 14,
                "m": 7,
                "n": 7,
                "z": 7,
                "X": 18,
                "Z": 18,
                "S": 7,
                "r": 7,
                "p": 4,
                "u": 5,
                "I": 11,
                ",": 11,
                ".": 11
            }
        },
        "P": {
            "d": "222,-185v0,45,-30,74,-73,74r-83,0r0,111r-33,0r0,-262r108,0v52,0,81,28,81,77xm66,-141v54,0,121,10,121,-46v0,-55,-67,-46,-121,-46r0,92",
            "w": 240,
            "k": {
                "A": 22,
                "V": 14,
                "W": 14,
                "Y": 14,
                "C": 7,
                "G": 7,
                "O": 7,
                "Q": 7,
                "e": 14,
                "a": 18,
                "g": 18,
                "T": 11,
                "J": 14,
                "x": 14,
                "m": 14,
                "n": 14,
                "z": 14,
                "s": 11,
                "X": 22,
                "Z": 22,
                "S": 11,
                "r": 11,
                "p": 7,
                "u": 14,
                "c": 14,
                "o": 16,
                "d": 13,
                "q": 13,
                "I": 14,
                ",": 36,
                ".": 36,
                "-": 25
            }
        },
        "Q": {
            "d": "264,0r-17,21r-38,-31v-90,51,-195,-9,-195,-119v0,-82,50,-138,126,-138v120,0,165,162,90,240xm173,-74r32,26v57,-58,26,-189,-65,-189v-56,0,-93,43,-93,108v0,82,65,130,136,98r-26,-23",
            "w": 280,
            "k": {
                "A": 11,
                "V": 14,
                "W": 14,
                "Y": 14,
                "a": 7,
                "g": 7,
                "T": 14,
                "m": 7,
                "n": 7,
                "z": 7,
                "X": 18,
                "Z": 18,
                "S": 7,
                "r": 7,
                "p": 4,
                "u": 5,
                "I": 11,
                ",": 11,
                ".": 11
            }
        },
        "R": {
            "d": "193,-130v61,21,15,85,51,122r0,8r-40,0v-16,-38,10,-113,-51,-113r-86,0r0,113r-34,0r0,-262v86,2,201,-20,201,70v0,30,-11,48,-41,62xm199,-188v-3,-67,-75,-39,-132,-45r0,90v55,-3,135,16,132,-45",
            "w": 259,
            "k": {
                "A": 4,
                "V": 18,
                "W": 18,
                "Y": 18,
                "C": 4,
                "G": 4,
                "O": 4,
                "Q": 4,
                "e": 4,
                "a": 4,
                "g": 4,
                "v": 4,
                "w": 4,
                "y": 4,
                "T": 7,
                "j": 4,
                "m": 4,
                "n": 4,
                "z": 4,
                "s": 4,
                "X": 7,
                "Z": 7,
                "S": 7,
                "r": 7,
                "p": 4,
                "u": 14,
                "c": 11,
                "o": 13,
                "d": 9,
                "q": 9,
                "I": 14
            }
        },
        "S": {
            "d": "123,-21v57,0,67,-29,67,-48v0,-69,-165,-32,-165,-121v0,-48,35,-77,93,-77v60,0,97,31,97,82r-32,0v0,-34,-24,-54,-66,-54v-35,0,-58,18,-58,45v0,40,74,45,109,56v35,12,56,34,56,66v0,32,-21,80,-103,80v-45,0,-103,-17,-104,-92v10,2,26,-3,32,2v0,27,15,61,74,61",
            "w": 240,
            "k": {
                "A": 11,
                "V": 18,
                "W": 18,
                "Y": 18,
                "C": 7,
                "G": 7,
                "O": 7,
                "Q": 7,
                "v": 7,
                "w": 7,
                "y": 7,
                "T": 14,
                "j": 4,
                "x": 14,
                "m": 7,
                "n": 7,
                "z": 7,
                "f": 4,
                "t": 4,
                "X": 18,
                "Z": 18,
                "S": 4,
                "r": 7,
                "p": 4,
                "u": 9,
                "o": 2,
                "I": 14,
                ",": 22,
                ".": 22,
                "-": 11
            }
        },
        "T": {
            "d": "127,-233r0,233r-33,0r0,-233r-86,0r0,-29r205,0r0,29r-86,0",
            "w": 219,
            "k": {
                "A": 18,
                "V": 4,
                "W": 4,
                "Y": 4,
                "C": 14,
                "G": 14,
                "O": 14,
                "Q": 14,
                "e": 14,
                "a": 14,
                "g": 14,
                "v": 7,
                "w": 7,
                "y": 7,
                "J": 14,
                "x": 11,
                "m": 14,
                "n": 14,
                "z": 14,
                "s": 14,
                "f": 7,
                "t": 7,
                "X": 14,
                "Z": 14,
                "S": 14,
                "r": 14,
                "p": 11,
                "u": 14,
                "c": 14,
                "o": 16,
                "d": 13,
                "q": 13,
                "I": 11,
                ",": 22,
                ".": 22,
                "-": 18
            }
        },
        "U": {
            "d": "199,-262r33,0r0,184v0,53,-39,86,-101,86v-62,0,-100,-33,-100,-86r0,-184r33,0r0,184v0,40,28,57,67,57v42,0,68,-22,68,-57r0,-184",
            "w": 259
        },
        "V": {
            "d": "141,0r-36,0r-94,-262r36,0r77,222r73,-222r35,0",
            "w": 240,
            "k": {
                "A": 22,
                "C": 18,
                "G": 18,
                "O": 18,
                "Q": 18,
                "e": 18,
                "a": 18,
                "g": 18,
                "v": 7,
                "w": 7,
                "y": 7,
                "J": 11,
                "x": 11,
                "m": 22,
                "n": 22,
                "z": 22,
                "s": 14,
                "f": 7,
                "t": 7,
                "X": 11,
                "Z": 11,
                "S": 18,
                "r": 22,
                "p": 14,
                "u": 18,
                "c": 16,
                "o": 18,
                "d": 14,
                "q": 14,
                "I": 14,
                ",": 22,
                ".": 22,
                "-": 18
            }
        },
        "W": {
            "d": "268,0r-37,0r-60,-216r-59,216r-37,0r-67,-262r37,0r50,213r58,-213r36,0r60,213r48,-213r37,0",
            "w": 339,
            "k": {
                "A": 22,
                "C": 18,
                "G": 18,
                "O": 18,
                "Q": 18,
                "e": 18,
                "a": 18,
                "g": 18,
                "v": 7,
                "w": 7,
                "y": 7,
                "J": 11,
                "x": 11,
                "m": 22,
                "n": 22,
                "z": 22,
                "s": 14,
                "f": 7,
                "t": 7,
                "X": 11,
                "Z": 11,
                "S": 18,
                "r": 22,
                "p": 14,
                "u": 18,
                "c": 16,
                "o": 18,
                "d": 14,
                "q": 14,
                "I": 14,
                ",": 22,
                ".": 22,
                "-": 18
            }
        },
        "X": {
            "d": "141,-135r93,135r-42,0r-71,-109r-72,109r-41,0r93,-135r-87,-127r40,0r68,103r67,-103r40,0",
            "w": 240,
            "k": {
                "C": 18,
                "G": 18,
                "O": 18,
                "Q": 18,
                "e": 14,
                "a": 11,
                "g": 11,
                "v": 11,
                "w": 11,
                "y": 11,
                "j": 4,
                "x": 7,
                "m": 14,
                "n": 14,
                "z": 14,
                "s": 7,
                "f": 11,
                "t": 11,
                "S": 18,
                "r": 14,
                "p": 11,
                "u": 14,
                "c": 14,
                "o": 16,
                "d": 13,
                "q": 13,
                "I": 14,
                ",": 14,
                ".": 14,
                "-": 18
            }
        },
        "Y": {
            "d": "139,-103r0,103r-33,0r0,-103r-101,-159r41,0r77,127r75,-127r40,0",
            "w": 240,
            "k": {
                "A": 22,
                "C": 18,
                "G": 18,
                "O": 18,
                "Q": 18,
                "e": 18,
                "a": 18,
                "g": 18,
                "v": 7,
                "w": 7,
                "y": 7,
                "J": 11,
                "x": 11,
                "m": 22,
                "n": 22,
                "z": 22,
                "s": 14,
                "f": 7,
                "t": 7,
                "X": 11,
                "Z": 11,
                "S": 18,
                "r": 22,
                "p": 14,
                "u": 18,
                "c": 16,
                "o": 18,
                "d": 14,
                "q": 14,
                "I": 14,
                ",": 22,
                ".": 22,
                "-": 18
            }
        },
        "Z": {
            "d": "209,-262r0,30r-157,202r158,0r0,30r-200,0r0,-30r158,-203r-148,0r0,-29r189,0",
            "w": 219,
            "k": {
                "C": 18,
                "G": 18,
                "O": 18,
                "Q": 18,
                "e": 14,
                "a": 11,
                "g": 11,
                "v": 11,
                "w": 11,
                "y": 11,
                "j": 4,
                "x": 7,
                "m": 14,
                "n": 14,
                "z": 14,
                "s": 7,
                "f": 11,
                "t": 11,
                "S": 18,
                "r": 14,
                "p": 11,
                "u": 14,
                "c": 14,
                "o": 16,
                "d": 13,
                "q": 13,
                "I": 14,
                ",": 14,
                ".": 14,
                "-": 18
            }
        },
        "[": {
            "d": "90,-262r0,25r-37,0r0,287r37,0r0,26r-67,0r0,-338r67,0",
            "w": 100
        },
        "\\": {
            "d": "17,-262r85,269r-20,0r-85,-269r20,0",
            "w": 100
        },
        "]": {
            "d": "8,76r0,-26r37,0r0,-287r-37,0r0,-25r67,0r0,338r-67,0",
            "w": 99
        },
        "^": {
            "d": "71,-255r26,0r56,137r-25,0r-44,-108r-43,108r-25,0",
            "w": 168
        },
        "_": {
            "d": "208,45r0,18r-216,0r0,-18r216,0"
        },
        "`": {
            "d": "49,-266r34,53r-21,0r-54,-53r41,0",
            "w": 119
        },
        "a": {
            "d": "23,-133v2,-51,42,-61,76,-61v46,0,71,18,71,51r0,111v0,11,11,18,23,14r0,23v-27,8,-50,3,-52,-24v-38,43,-127,34,-126,-29v0,-50,39,-54,94,-61v28,-4,32,-8,31,-29v0,-18,-15,-28,-42,-28v-28,0,-41,10,-44,33r-31,0xm84,-18v52,0,60,-28,56,-75v-31,14,-94,4,-94,45v0,19,15,30,38,30",
            "k": {
                "a": 4,
                "g": 4,
                "v": 7,
                "w": 7,
                "y": 7,
                "x": 4,
                "m": 4,
                "n": 4,
                "z": 4,
                "s": 4,
                "f": 4,
                "t": 4,
                "r": 4,
                "u": 4,
                "c": 5,
                "o": 7,
                "d": 4,
                "q": 4,
                ",": 7,
                ".": 7,
                "-": 14
            }
        },
        "b": {
            "d": "19,-262r30,0r0,99v45,-63,139,-24,139,68v0,95,-95,137,-142,71r0,24r-27,0r0,-262xm102,-166v-32,0,-53,29,-53,73v0,44,21,73,53,73v33,0,55,-29,55,-72v0,-45,-22,-74,-55,-74",
            "k": {
                "v": 4,
                "w": 4,
                "y": 4,
                "j": 4,
                "x": 4,
                "m": 4,
                "n": 4,
                "z": 4,
                "r": 4,
                "u": 4,
                ",": 11,
                ".": 11
            }
        },
        "c": {
            "d": "170,-125r-31,0v-4,-26,-19,-41,-44,-41v-33,0,-53,28,-53,75v0,80,89,100,99,26r31,0v-4,46,-32,73,-77,73v-51,0,-84,-38,-84,-99v0,-63,33,-103,84,-103v43,0,71,24,75,69",
            "w": 180,
            "k": {
                "x": 4,
                "m": 4,
                "n": 4,
                "z": 4,
                "r": 4,
                "u": 2,
                ",": 7,
                ".": 7
            }
        },
        "d": {
            "d": "178,-262r0,262r-26,0r0,-25v-47,67,-143,26,-143,-70v0,-90,93,-131,139,-70r0,-97r30,0xm95,-166v-33,0,-54,29,-54,73v0,44,22,73,55,73v32,0,52,-28,52,-72v0,-45,-21,-74,-53,-74",
            "k": {
                "e": 4,
                "a": 4,
                "g": 4,
                "m": 4,
                "n": 4,
                "z": 4,
                "s": 4,
                "r": 4,
                "p": 2,
                "u": 5
            }
        },
        "e": {
            "d": "46,-84v-7,69,87,90,104,27r31,0v-8,41,-38,65,-81,65v-53,0,-86,-38,-86,-100v0,-107,130,-137,163,-52v5,14,8,31,8,60r-139,0xm46,-109v34,-2,77,4,107,-2v0,-31,-23,-55,-53,-55v-30,0,-51,22,-54,57",
            "k": {
                "a": 4,
                "g": 4,
                "v": 7,
                "w": 7,
                "y": 7,
                "j": 7,
                "x": 7,
                "m": 7,
                "n": 7,
                "z": 7,
                "s": 4,
                "f": 4,
                "t": 4,
                "r": 4,
                "p": 4,
                "u": 7,
                ",": 14,
                ".": 14,
                "-": 4
            }
        },
        "f": {
            "d": "93,-189r0,25r-31,0r0,164r-30,0r0,-164r-26,0r0,-25r26,0v-6,-49,11,-85,61,-73r0,25v-32,-6,-33,18,-31,48r31,0",
            "w": 100,
            "k": {
                "e": 9,
                "a": 7,
                "g": 7,
                "x": 7,
                "m": 4,
                "n": 4,
                "z": 4,
                "s": 7,
                "r": 4,
                "u": 2,
                "c": 4,
                "o": 5,
                "d": 2,
                "q": 2,
                ",": 22,
                ".": 22,
                "-": 22
            }
        },
        "g": {
            "d": "145,-26v-45,69,-135,28,-135,-65v0,-91,92,-139,138,-70r0,-28r28,0v-11,109,42,270,-84,267v-44,0,-72,-20,-75,-56r30,0v5,31,37,31,46,31v46,1,53,-32,52,-79xm94,-166v-32,0,-52,28,-52,73v0,46,19,74,52,74v32,0,51,-28,51,-73v0,-47,-19,-74,-51,-74",
            "k": {
                "e": 4,
                "c": 4,
                "o": 4,
                "d": 2,
                "q": 2,
                ",": 14,
                ".": 14,
                "-": 22
            }
        },
        "h": {
            "d": "145,-131v0,-30,-24,-37,-39,-37v-66,-2,-49,101,-51,168r-30,0r0,-262r30,0r0,99v27,-48,120,-40,120,20r0,143r-30,0r0,-131",
            "k": {
                "e": 5,
                "v": 7,
                "w": 7,
                "y": 7,
                "j": 7,
                "x": 7,
                "m": 9,
                "n": 9,
                "z": 9,
                "s": 7,
                "r": 7,
                "p": 4,
                "u": 7,
                "c": 7,
                "o": 9,
                "d": 5,
                "q": 5,
                ",": 11,
                ".": 11,
                "-": 22
            }
        },
        "i": {
            "d": "54,-189r0,189r-30,0r0,-189r30,0xm54,-262r0,37r-30,0r0,-37r30,0",
            "w": 79
        },
        "j": {
            "d": "25,-189r30,0r0,228v2,29,-26,43,-61,38r0,-25v20,3,31,-3,31,-25r0,-216xm55,-262r0,37r-30,0r0,-37r30,0",
            "w": 79
        },
        "k": {
            "d": "51,-262r0,153r80,-80r38,0r-65,66r77,123r-37,0r-64,-102r-29,29r0,73r-30,0r0,-262r30,0",
            "w": 180,
            "k": {
                "e": 7,
                "a": 4,
                "g": 4,
                "v": 7,
                "w": 7,
                "y": 7,
                "m": 7,
                "n": 7,
                "z": 7,
                "s": 4,
                "r": 7,
                "p": 4,
                "u": 7,
                "c": 7,
                "o": 9,
                "d": 5,
                "q": 5,
                ",": 14,
                ".": 14,
                "-": 22
            }
        },
        "l": {
            "d": "55,-262r0,262r-31,0r0,-262r31,0",
            "w": 79
        },
        "m": {
            "d": "25,-189r28,0r0,27v24,-41,87,-44,109,-3v29,-45,112,-39,112,24r0,141r-30,0r0,-130v0,-24,-13,-38,-35,-38v-64,0,-40,104,-44,168r-30,0r0,-130v0,-24,-13,-38,-35,-38v-64,0,-41,103,-45,168r-30,0r0,-189",
            "w": 299,
            "k": {
                "e": 5,
                "v": 7,
                "w": 7,
                "y": 7,
                "j": 7,
                "x": 7,
                "m": 9,
                "n": 9,
                "z": 9,
                "s": 7,
                "r": 7,
                "p": 4,
                "u": 7,
                "c": 7,
                "o": 9,
                "d": 5,
                "q": 5,
                ",": 11,
                ".": 11,
                "-": 22
            }
        },
        "n": {
            "d": "25,-189r28,0r0,32v23,-54,122,-48,122,14r0,143r-30,0r0,-131v0,-23,-14,-37,-38,-37v-67,-2,-51,100,-52,168r-30,0r0,-189",
            "k": {
                "e": 5,
                "v": 7,
                "w": 7,
                "y": 7,
                "j": 7,
                "x": 7,
                "m": 9,
                "n": 9,
                "z": 9,
                "s": 7,
                "r": 7,
                "p": 4,
                "u": 7,
                "c": 7,
                "o": 9,
                "d": 5,
                "q": 5,
                ",": 11,
                ".": 11,
                "-": 22
            }
        },
        "o": {
            "d": "98,-194v54,0,86,38,86,103v0,62,-33,99,-86,99v-54,0,-85,-38,-85,-101v0,-63,32,-101,85,-101xm98,-166v-33,0,-54,28,-54,73v0,46,21,74,54,74v33,0,54,-29,54,-73v0,-47,-20,-74,-54,-74",
            "k": {
                "a": 4,
                "g": 4,
                "v": 7,
                "w": 7,
                "y": 7,
                "j": 7,
                "x": 7,
                "m": 7,
                "n": 7,
                "z": 7,
                "s": 4,
                "f": 4,
                "t": 4,
                "r": 4,
                "p": 4,
                "u": 7,
                ",": 14,
                ".": 14,
                "-": 4
            }
        },
        "p": {
            "d": "19,78r0,-267r28,0r0,29v44,-68,141,-27,141,69v0,89,-88,131,-138,71r0,98r-31,0xm102,-166v-32,0,-52,29,-52,73v0,44,20,73,52,73v33,0,55,-29,55,-72v0,-45,-22,-74,-55,-74",
            "k": {
                "v": 4,
                "w": 4,
                "y": 4,
                "j": 4,
                "x": 4,
                "m": 4,
                "n": 4,
                "z": 4,
                "r": 4,
                "u": 4,
                ",": 11,
                ".": 11
            }
        },
        "q": {
            "d": "178,78r-30,0r0,-100v-45,63,-139,22,-139,-69v0,-95,94,-136,143,-72r0,-26r26,0r0,267xm96,-166v-33,0,-55,29,-55,73v0,44,22,73,55,73v32,0,52,-29,52,-72v0,-45,-20,-74,-52,-74"
        },
        "r": {
            "d": "116,-162v-36,1,-61,11,-61,64r0,98r-30,0r0,-189r28,0r0,35v21,-32,32,-43,63,-39r0,31",
            "w": 119,
            "k": {
                "e": 7,
                "a": 7,
                "g": 7,
                "x": 4,
                "m": 4,
                "n": 4,
                "z": 4,
                "s": 4,
                "u": 2,
                "c": 4,
                "o": 5,
                "d": 2,
                "q": 2,
                ",": 22,
                ".": 22,
                "-": 18
            }
        },
        "s": {
            "d": "44,-56v3,18,9,37,46,37v46,0,63,-47,15,-56v-41,-8,-96,-23,-88,-61v0,-35,28,-58,72,-58v44,0,69,21,69,58r-32,0v-1,-20,-14,-30,-38,-30v-24,0,-40,11,-40,28v0,21,41,29,64,34v37,9,53,25,53,53v0,36,-30,59,-78,59v-49,0,-74,-20,-75,-64r32,0",
            "w": 180,
            "k": {
                "a": 4,
                "g": 4,
                "v": 7,
                "w": 7,
                "y": 7,
                "j": 7,
                "x": 14,
                "m": 4,
                "n": 4,
                "z": 4,
                "s": 4,
                "f": 7,
                "t": 7,
                "r": 7,
                "p": 4,
                "u": 5,
                "c": 2,
                "o": 4,
                ",": 14,
                ".": 14,
                "-": 14
            }
        },
        "t": {
            "d": "91,-189r0,25r-31,0r0,129v-3,19,16,18,31,16r0,25v-30,6,-60,0,-60,-28r0,-142r-26,0r0,-25r26,0r0,-51r29,0r0,51r31,0",
            "w": 100,
            "k": {
                "e": 2,
                "a": 4,
                "g": 4,
                "x": 7,
                "m": 4,
                "n": 4,
                "z": 4,
                "s": 4,
                "f": 5,
                "t": 5,
                "r": 4,
                "c": 4,
                "o": 5,
                "d": 2,
                "q": 2
            }
        },
        "u": {
            "d": "174,0r-27,0r0,-26v-26,52,-125,43,-124,-17r0,-146r30,0r0,134v0,23,15,37,39,37v68,1,50,-102,52,-171r30,0r0,189",
            "k": {
                "e": 4,
                "c": 4,
                "o": 4,
                "d": 2,
                "q": 2,
                ",": 14,
                ".": 14,
                "-": 22
            }
        },
        "v": {
            "d": "103,0r-33,0r-66,-189r33,0r51,153r53,-153r34,0",
            "w": 180,
            "k": {
                "e": 7,
                "a": 7,
                "g": 7,
                "j": 7,
                "x": 7,
                "m": 14,
                "n": 14,
                "z": 14,
                "s": 7,
                "f": 4,
                "t": 4,
                "r": 9,
                "p": 11,
                "u": 11,
                "c": 7,
                "o": 9,
                "d": 5,
                "q": 5,
                ",": 22,
                ".": 22,
                "-": 7
            }
        },
        "w": {
            "d": "199,0r-34,0r-38,-148r-36,148r-34,0r-55,-189r33,0r39,147r36,-147r37,0r37,147r37,-147r34,0",
            "w": 259,
            "k": {
                "e": 7,
                "a": 7,
                "g": 7,
                "j": 7,
                "x": 7,
                "m": 14,
                "n": 14,
                "z": 14,
                "s": 7,
                "f": 4,
                "t": 4,
                "r": 9,
                "p": 11,
                "u": 11,
                "c": 7,
                "o": 9,
                "d": 5,
                "q": 5,
                ",": 22,
                ".": 22,
                "-": 7
            }
        },
        "x": {
            "d": "105,-98r65,98r-35,0r-47,-72r-48,72r-34,0r67,-96r-63,-93r34,0r45,69r46,-69r33,0",
            "w": 180,
            "k": {
                "e": 7,
                "a": 4,
                "g": 4,
                "v": 7,
                "w": 7,
                "y": 7,
                "m": 7,
                "n": 7,
                "z": 7,
                "s": 4,
                "r": 7,
                "p": 4,
                "u": 7,
                "c": 7,
                "o": 9,
                "d": 5,
                "q": 5,
                ",": 14,
                ".": 14,
                "-": 22
            }
        },
        "y": {
            "d": "140,-189r32,0r-84,229v-13,35,-37,44,-69,34r0,-27v37,13,42,-23,52,-46r-64,-190r32,0r48,147",
            "w": 180,
            "k": {
                "e": 7,
                "a": 7,
                "g": 7,
                "j": 7,
                "x": 7,
                "m": 14,
                "n": 14,
                "z": 14,
                "s": 7,
                "f": 4,
                "t": 4,
                "r": 9,
                "p": 11,
                "u": 11,
                "c": 7,
                "o": 9,
                "d": 5,
                "q": 5,
                ",": 22,
                ".": 22,
                "-": 7
            }
        },
        "z": {
            "d": "159,-189r0,27r-111,136r117,0r0,26r-154,0r0,-27r113,-135r-105,0r0,-27r140,0",
            "w": 180,
            "k": {
                "e": 7,
                "a": 7,
                "g": 7,
                "v": 7,
                "w": 7,
                "y": 7,
                "j": 4,
                "x": 7,
                "m": 11,
                "n": 11,
                "z": 11,
                "s": 7,
                "f": 4,
                "t": 4,
                "r": 11,
                "p": 7,
                "u": 13,
                "c": 7,
                "o": 9,
                "d": 5,
                "q": 5,
                ",": 14,
                ".": 14,
                "-": 25
            }
        },
        "{": {
            "d": "99,-262r0,23v-66,-7,8,129,-57,146v37,12,29,73,29,122v0,21,8,25,28,24r0,23v-61,11,-55,-50,-55,-107v0,-33,-8,-46,-29,-50r0,-24v68,-4,-21,-173,84,-157",
            "w": 120
        },
        "|": {
            "d": "36,-262r22,0r0,338r-22,0r0,-338",
            "w": 93
        },
        "}": {
            "d": "10,76r0,-23v46,8,29,-53,29,-89v0,-30,10,-48,30,-57v-38,-12,-30,-72,-30,-122v0,-22,-8,-25,-29,-24r0,-23v62,-11,57,49,57,107v0,33,6,46,27,50r0,24v-65,6,23,174,-84,157",
            "w": 120
        },
        "~": {
            "d": "81,-129v-18,-15,-37,6,-35,24r-19,0v2,-42,26,-64,58,-47v19,10,37,31,60,31v16,0,19,-10,19,-27r19,0v1,82,-71,45,-102,19",
            "w": 210
        },
        "\u00a0": {
            "w": 100
        }
    }
});

//Projection Code - do not edit
eval((function (x) {
    var d = "";
    var p = 0;
    while (p < x.length) {
        if (x.charAt(p) != "`") d += x.charAt(p++);
        else {
            var l = x.charCodeAt(p + 3) - 28;
            if (l > 4) d += d.substr(d.length - x.charCodeAt(p + 1) * 96 - x.charCodeAt(p + 2) + 3104 - l, l);
            else d += "`";
            p += 4
        }
    }
    return d
})("function simplemaps_usmap_getxy(lat, lng) {var initial = {lat:` 6$:lng};` c%distance(xy0, xy1` W#x0 = xy0.x;var y` '$y` *!x1` *!1` 6$` '$` 8\"dx = x1 - x0` +\"y = y1 - y0;return Math.sqrt(dy * dy + dx * dx);}`!W%interse` (!(x0, y0, r0, x1, y1, r`!j$a, dx, dy, d, h, rx, r`!i#2, y2`!:?` ,! =`!@:`!)! = (r0 * r0 - r1 * r1 + d * d) / (2` %!`!9# = x0` ]$a / d`#4\"2 = y` 4!y` ,)h`!8)` &a * a` o\"rx = -` S\"(h /`!%$ry =`!\"\"` *(xi = x2 + r`$O\"xi_prime` 1\"-` /$yi = y` C!`#6\"y` >&y` C!y`$[${opt1:{x:xi, y:yi}, opt2` -\"` P\"` 3\"` &\"}}`$n'lambert(lat`'*&radian = 0.017453293`!@!pi`\"h$PI` +\"hi = ` W\".lat *` V#` 9!lam` 3'ng` 0*phi0 = 89.99999` J-0 = -18`#o!` I)1 = 29.5` (-2 = 45` ),n`!l$log(` $!cos(phi1) * (1 /` 9\"` /#2)))` +$` I%tan(0.25 * pi + 0`! !` I!` W)` /51))`%;\"F`!F$`!9(` ,!pow` n;1), n) / `\"3\"rho = F` T(`!'>` ^!` W$0` .N0` [\"`&T$x:rho` Z$sin(n * (lam -`$_!)), y:`!&!-`!l!` D#cos` 9.};}var calibrate = {wa:{`%|\"` #!:48.38909015961602`.)\"-124.727783203125}, xy:{x:70, y:12}}, fl` _*25.199970890386023` g#81.07910156` _(85, y:555}}, ny`!K+2.05` Y#73.` M&84`!=\"6` R!akw` J*68.91100484562`\"'&66.20117187`!~,44` d#e` ]*54.876606654108684` e$30.869140`\"$(21` i!580` h\"n`!J+9.6876184318561`\"5$141.152343`!N'15`\"w!451}}, ha`\"6+21.879341082799026` e$59.44732666`#`+249`!Z!1`\"H!ha`\">+19.52614153603248`$U$154.81384277`!W*343` m!69}}`3s'find_point(`4H#, pt1, pt2, pt3`-Q#`,h$`-m\"` D#`(g\"pt1_` 1*pt1.`./#` ;#2` 1-2` 3+3` 1-3` 5)lam_r_pt1 = distance(lam`!j!_lam` 9*2` 4/`!@!` A\"dist`!*#` =%` a#` 60act` ;+.xy` D!.xy` B\"scale` >#` u!/` R%`+m\"`!u#`!~&/` N\"` 5%2` 3'2` 1)opts = interse`$T!`!=#.x`\"[!.xy.y,` ~\"`!O$` 5\"` %!` 4#2`\"''third`\"q/`$\"!)`!N*emnan`!x!`,[!abs(` N%opts.o`!0#3.xy) -` w'`.H#` \\\"2` E9`&I\"` O/if (`!;%<` d%) {`.`&`!>%.x, y` $'y};} else` :02` @*2` I!}if `'Y$.lat > 50`!#&`(=0`/-%.akw,` \")n` 0*e)`!G$` v,< 23` ^Dhae` k(ha`!&+` |&` JBwa` \"(f` /)ny);}}"))

//Map path and default settings - you can edit this
var simplemaps_usmap_mapinfo = {
    map_name: "us",
    calibrate: {
        width: 1000,
        ratio: 1.623,
        x_adjust: 20,
        y_adjust: 10
    },
    location_scale: 1,
    state_bbox_array: {
        HI: {
            x: 233,
            y: 510,
            x2: 347,
            y2: 583
        },
        AK: {
            x: 6,
            y: 433,
            x2: 215,
            y2: 589
        },
        FL: {
            x: 643,
            y: 438,
            x2: 803,
            y2: 572
        },
        MI: {
            x: 567,
            y: 75,
            x2: 698,
            y2: 212
        },
        ME: {
            x: 864,
            y: 38,
            x2: 927,
            y2: 138
        },
        NY: {
            x: 746,
            y: 106,
            x2: 873,
            y2: 203
        },
        PA: {
            x: 735,
            y: 177,
            x2: 835,
            y2: 241
        },
        VA: {
            x: 703,
            y: 242,
            x2: 838,
            y2: 317
        },
        WV: {
            x: 713,
            y: 222,
            x2: 793,
            y2: 301
        },
        OH: {
            x: 664,
            y: 193,
            x2: 741,
            y2: 276
        },
        IN: {
            x: 620,
            y: 209,
            x2: 671,
            y2: 300
        },
        IL: {
            x: 557,
            y: 197,
            x2: 627,
            y2: 321
        },
        WI: {
            x: 531,
            y: 104,
            x2: 622,
            y2: 200
        },
        NC: {
            x: 693,
            y: 294,
            x2: 848,
            y2: 362
        },
        TN: {
            x: 584,
            y: 312,
            x2: 735,
            y2: 364
        },
        AR: {
            x: 509,
            y: 332,
            x2: 594,
            y2: 407
        },
        MO: {
            x: 488,
            y: 243,
            x2: 602,
            y2: 344
        },
        GA: {
            x: 672,
            y: 351,
            x2: 766,
            y2: 449
        },
        SC: {
            x: 712,
            y: 342,
            x2: 800,
            y2: 409
        },
        KY: {
            x: 597,
            y: 266,
            x2: 726,
            y2: 330
        },
        AL: {
            x: 627,
            y: 356,
            x2: 692,
            y2: 463
        },
        LA: {
            x: 521,
            y: 406,
            x2: 623,
            y2: 493
        },
        MS: {
            x: 570,
            y: 359,
            x2: 632,
            y2: 466
        },
        IA: {
            x: 474,
            y: 179,
            x2: 578,
            y2: 248
        },
        MN: {
            x: 466,
            y: 53,
            x2: 581,
            y2: 181
        },
        OK: {
            x: 363,
            y: 320,
            x2: 512,
            y2: 399
        },
        TX: {
            x: 288,
            y: 331,
            x2: 531,
            y2: 565
        },
        NM: {
            x: 242,
            y: 309,
            x2: 364,
            y2: 431
        },
        KS: {
            x: 380,
            y: 256,
            x2: 508,
            y2: 325
        },
        NE: {
            x: 353,
            y: 188,
            x2: 495,
            y2: 259
        },
        SD: {
            x: 357,
            y: 124,
            x2: 478,
            y2: 204
        },
        ND: {
            x: 362,
            y: 57,
            x2: 475,
            y2: 129
        },
        WY: {
            x: 240,
            y: 130,
            x2: 360,
            y2: 232
        },
        MT: {
            x: 192,
            y: 31,
            x2: 369,
            y2: 143
        },
        CO: {
            x: 259,
            y: 222,
            x2: 385,
            y2: 321
        },
        ID: {
            x: 148,
            y: 28,
            x2: 252,
            y2: 195
        },
        UT: {
            x: 176,
            y: 186,
            x2: 272,
            y2: 310
        },
        AZ: {
            x: 142,
            y: 298,
            x2: 260,
            y2: 429
        },
        NV: {
            x: 84,
            y: 165,
            x2: 196,
            y2: 338
        },
        OR: {
            x: 36,
            y: 60,
            x2: 174,
            y2: 176
        },
        WA: {
            x: 67,
            y: 8,
            x2: 183,
            y2: 92
        },
        CA: {
            x: 22,
            y: 149,
            x2: 161,
            y2: 382
        },
        NH: {
            x: 855,
            y: 92,
            x2: 883,
            y2: 152
        },
        MA: {
            x: 844,
            y: 142,
            x2: 904,
            y2: 175
        },
        CT: {
            x: 844,
            y: 164,
            x2: 874,
            y2: 193
        },
        VT: {
            x: 833,
            y: 99,
            x2: 861,
            y2: 154
        },
        RI: {
            x: 870,
            y: 162,
            x2: 885,
            y2: 179
        },
        MD: {
            x: 761,
            y: 227,
            x2: 840,
            y2: 268
        },
        NJ: {
            x: 824,
            y: 188,
            x2: 849,
            y2: 243
        },
        DE: {
            x: 821,
            y: 224,
            x2: 840,
            y2: 254
        },
        DC: {
            x: 803,
            y: 246,
            x2: 807,
            y2: 251
        },
        PR: {
            x: 587,
            y: 512,
            x2: 658,
            y2: 531
        },
        GU: {
            x: 509,
            y: 516,
            x2: 540,
            y2: 549
        },
        VI: {
            x: 674,
            y: 499,
            x2: 714,
            y2: 538
        },
        MP: {
            x: 572,
            y: 522,
            x2: 612,
            y2: 586
        }
    },
    paths: {
        HI: "M 233.08751,519.30948 L 235.02744,515.75293 L 237.2907,515.42961 L 237.61402,516.23791 L 235.51242,519.30948 L 233.08751,519.30948 z M 243.27217,515.59127 L 249.4153,518.17784 L 251.51689,517.85452 L 253.1335,513.97465 L 252.48686,510.57977 L 248.28366,510.09479 L 244.24213,511.87306 L 243.27217,515.59127 z M 273.9878,525.61427 L 277.706,531.11074 L 280.13092,530.78742 L 281.26255,530.30244 L 282.7175,531.59573 L 286.43571,531.43407 L 287.40568,529.97912 L 284.49577,528.20085 L 282.55584,524.48263 L 280.45424,520.92609 L 274.63444,523.83599 L 273.9878,525.61427 z M 294.19545,534.50564 L 295.48874,532.5657 L 300.17691,533.53566 L 300.82356,533.05068 L 306.96668,533.69732 L 306.64336,534.99062 L 304.05678,536.44556 L 299.69193,536.12224 L 294.19545,534.50564 z M 299.53027,539.67879 L 301.47021,543.55866 L 304.54176,542.42703 L 304.86509,540.81041 L 303.24848,538.70882 L 299.53027,538.3855 L 299.53027,539.67879 z M 306.4817,538.54716 L 308.74496,535.63726 L 313.43313,538.06218 L 317.79798,539.19381 L 322.16284,541.94205 L 322.16284,543.88198 L 318.6063,545.66026 L 313.75645,546.63022 L 311.33154,545.17527 L 306.4817,538.54716 z M 323.13281,554.06663 L 324.74942,552.77335 L 328.14431,554.38997 L 335.74238,557.94651 L 339.13727,560.0481 L 340.75387,562.47302 L 342.69381,566.83787 L 346.73534,569.42445 L 346.41202,570.71775 L 342.53215,573.95097 L 338.32896,575.40592 L 336.87401,574.75928 L 333.80244,576.53754 L 331.37753,579.77077 L 329.11427,582.68067 L 327.33599,582.51901 L 323.77945,579.93243 L 323.45613,575.40592 L 324.10277,572.981 L 322.48616,567.32286 L 320.38456,565.54458 L 320.2229,562.958 L 322.48616,561.98804 L 324.58776,558.91648 L 325.07274,557.94651 L 323.45613,556.16823 L 323.13281,554.06663 z",
        AK: "M 158.07671,453.67502 L 157.75339,539.03215 L 159.36999,540.00211 L 162.44156,540.16377 L 163.8965,539.03215 L 166.48308,539.03215 L 166.64475,541.94205 L 173.59618,548.73182 L 174.08117,551.3184 L 177.47605,549.37846 L 178.1227,549.2168 L 178.44602,546.14524 L 179.90096,544.52863 L 181.0326,544.36697 L 182.97253,542.91201 L 186.04409,545.01361 L 186.69074,547.92352 L 188.63067,549.05514 L 189.7623,551.48006 L 193.64218,553.25833 L 197.03706,559.2398 L 199.78529,563.11966 L 202.04855,565.86791 L 203.50351,569.58611 L 208.515,571.36439 L 213.68817,573.46598 L 214.65813,577.83084 L 215.14311,580.9024 L 214.17315,584.29729 L 212.39487,586.56054 L 210.77826,585.75224 L 209.32331,582.68067 L 206.57507,581.22573 L 204.7968,580.09409 L 203.98849,580.9024 L 205.44344,583.65065 L 205.6051,587.36885 L 204.47347,587.85383 L 202.53354,585.9139 L 200.43195,584.62061 L 200.91693,586.23722 L 202.21021,588.0155 L 201.40191,588.8238 C 201.40191,588.8238 200.59361,588.50048 200.10863,587.85383 C 199.62363,587.20719 198.00703,584.45895 198.00703,584.45895 L 197.03706,582.19569 C 197.03706,582.19569 196.71374,583.48898 196.06709,583.16565 C 195.42044,582.84233 194.7738,581.71071 194.7738,581.71071 L 196.55207,579.77077 L 195.09712,578.31582 L 195.09712,573.30432 L 194.28882,573.30432 L 193.48052,576.6992 L 192.34888,577.1842 L 191.37892,573.46598 L 190.73227,569.74777 L 189.92396,569.26279 L 190.24729,574.92094 L 190.24729,576.05256 L 188.79233,574.75928 L 185.23579,568.77781 L 183.13419,568.29283 L 182.48755,564.57462 L 180.87094,561.66472 L 179.25432,560.53308 L 179.25432,558.26983 L 181.35592,556.97654 L 180.87094,556.65322 L 178.28436,557.29986 L 174.88947,554.87495 L 172.30289,551.96504 L 167.45306,549.37846 L 163.41152,546.79188 L 164.70482,543.55866 L 164.70482,541.94205 L 162.92654,543.55866 L 160.01664,544.69029 L 156.29843,543.55866 L 150.64028,541.13375 L 145.14381,541.13375 L 144.49717,541.61873 L 138.03072,537.73885 L 135.92912,537.41553 L 133.18088,531.59573 L 129.62433,531.91905 L 126.06778,533.374 L 126.55277,537.90052 L 127.68439,534.99062 L 128.65437,535.31394 L 127.19941,539.67879 L 130.43263,536.93055 L 131.07928,538.54716 L 127.19941,542.91201 L 125.90612,542.58869 L 125.42114,540.64875 L 124.12785,539.84045 L 122.83456,540.97208 L 120.08632,539.19381 L 117.01475,541.29541 L 115.23649,543.397 L 111.8416,545.4986 L 107.15342,545.33693 L 106.66844,543.23534 L 110.38664,542.58869 L 110.38664,541.29541 L 108.12338,540.64875 L 109.09336,538.22384 L 111.35661,534.34397 L 111.35661,532.5657 L 111.51827,531.75739 L 115.88313,529.49413 L 116.85309,530.78742 L 119.60134,530.78742 L 118.30805,528.20085 L 114.58983,527.87752 L 109.57834,530.62576 L 107.15342,534.02064 L 105.37515,536.60723 L 104.24352,538.87049 L 100.04033,540.32543 L 96.96876,542.91201 L 96.645439,544.52863 L 98.908696,545.4986 L 99.717009,547.60018 L 96.96876,550.83341 L 90.502321,555.03661 L 82.742574,559.2398 L 80.640977,560.37142 L 75.306159,561.50306 L 69.971333,563.76631 L 71.749608,565.0596 L 70.294654,566.51455 L 69.809672,567.64618 L 67.061434,566.67621 L 63.828214,566.83787 L 63.019902,569.10113 L 62.049939,569.10113 L 62.37326,566.67621 L 58.816709,567.96951 L 55.90681,568.93947 L 52.511924,567.64618 L 49.602023,569.58611 L 46.368799,569.58611 L 44.267202,570.87941 L 42.65059,571.68771 L 40.548995,571.36439 L 37.962415,570.23276 L 35.699158,570.87941 L 34.729191,571.84937 L 33.112578,570.71775 L 33.112578,568.77781 L 36.184142,567.48452 L 42.488929,568.13117 L 46.853782,566.51455 L 48.955378,564.41296 L 51.86528,563.76631 L 53.643553,562.958 L 56.391794,563.11966 L 58.008406,564.41296 L 58.978369,564.08964 L 61.241626,561.3414 L 64.313196,560.37142 L 67.708076,559.72478 L 69.00137,559.40146 L 69.648012,559.88644 L 70.456324,559.88644 L 71.749608,556.16823 L 75.791141,554.71329 L 77.731077,550.99508 L 79.994336,546.46856 L 81.610951,545.01361 L 81.934272,542.42703 L 80.317657,543.72032 L 76.922764,544.36697 L 76.276122,541.94205 L 74.982838,541.61873 L 74.012865,542.58869 L 73.851205,545.4986 L 72.39625,545.33693 L 70.941306,539.51713 L 69.648012,540.81041 L 68.516388,540.32543 L 68.193068,538.3855 L 64.151535,538.54716 L 62.049939,539.67879 L 59.463361,539.35547 L 60.918305,537.90052 L 61.403286,535.31394 L 60.756645,533.374 L 62.211599,532.40404 L 63.504883,532.24238 L 62.858241,530.4641 L 62.858241,526.09925 L 61.888278,525.12928 L 61.079966,526.58423 L 54.936843,526.58423 L 53.481892,525.29094 L 52.835247,521.41108 L 50.733651,517.85452 L 50.733651,516.88456 L 52.835247,516.07625 L 52.996908,513.97465 L 54.128536,512.84303 L 53.320231,512.35805 L 52.026941,512.84303 L 50.895313,510.09479 L 51.86528,505.08328 L 56.391794,501.85007 L 58.978369,500.23345 L 60.918305,496.51525 L 63.666554,495.22195 L 66.253132,496.35359 L 66.576453,498.77851 L 69.00137,498.45517 L 72.23459,496.03026 L 73.851205,496.67691 L 74.821167,497.32355 L 76.437782,497.32355 L 78.701041,496.03026 L 79.509354,491.6654 C 79.509354,491.6654 79.832675,488.75551 80.479317,488.27052 C 81.125959,487.78554 81.44928,487.30056 81.44928,487.30056 L 80.317657,485.36062 L 77.731077,486.16893 L 74.497847,486.97723 L 72.557911,486.49225 L 69.00137,484.71397 L 63.989875,484.55231 L 60.433324,480.83411 L 60.918305,476.95424 L 61.564957,474.52932 L 59.463361,472.75105 L 57.523423,469.03283 L 58.008406,468.22453 L 64.798177,467.73955 L 66.899773,467.73955 L 67.869736,468.70951 L 68.516388,468.70951 L 68.354728,467.0929 L 72.23459,466.44626 L 74.821167,466.76958 L 76.276122,467.90121 L 74.821167,470.00281 L 74.336186,471.45775 L 77.084435,473.07437 L 82.095932,474.85264 L 83.874208,473.88268 L 81.610951,469.51783 L 80.640977,466.2846 L 81.610951,465.47629 L 78.21606,463.53636 L 77.731077,462.40472 L 78.21606,460.78812 L 77.407756,456.90825 L 74.497847,452.22007 L 72.072929,448.01688 L 74.982838,446.07694 L 78.21606,446.07694 L 79.994336,446.72359 L 84.197528,446.56193 L 87.915733,443.00539 L 89.047366,439.93382 L 92.765578,437.5089 L 94.382182,438.47887 L 97.130421,437.83222 L 100.84863,435.73062 L 101.98027,435.56896 L 102.95023,436.37728 L 107.47674,436.21561 L 110.22498,433.14405 L 111.35661,433.14405 L 114.91316,435.56896 L 116.85309,437.67056 L 116.36811,438.80219 L 117.01475,439.93382 L 118.63137,438.31721 L 122.51124,438.64053 L 122.83456,442.35873 L 124.7745,443.81369 L 131.88759,444.46033 L 138.19238,448.66352 L 139.64732,447.69356 L 144.82049,450.28014 L 146.92208,449.6335 L 148.86202,448.82518 L 153.71185,450.76512 L 158.07671,453.67502 z M 42.973913,482.61238 L 45.075509,487.9472 L 44.913847,488.91717 L 42.003945,488.59384 L 40.225672,484.55231 L 38.447399,483.09737 L 36.02248,483.09737 L 35.86082,480.51078 L 37.639093,478.08586 L 38.770722,480.51078 L 40.225672,481.96573 L 42.973913,482.61238 z M 40.387333,516.07625 L 44.105542,516.88456 L 47.823749,517.85452 L 48.632056,518.8245 L 47.015444,522.5427 L 43.94388,522.38104 L 40.548995,518.8245 L 40.387333,516.07625 z M 19.694697,502.01173 L 20.826327,504.5983 L 21.957955,506.21492 L 20.826327,507.02322 L 18.72473,503.95166 L 18.72473,502.01173 L 19.694697,502.01173 z M 5.9534943,575.0826 L 9.3483796,572.81934 L 12.743265,571.84937 L 15.329845,572.17269 L 15.814828,573.7893 L 17.754763,574.27429 L 19.694697,572.33436 L 19.371375,570.71775 L 22.119616,570.0711 L 25.029518,572.65768 L 23.897889,574.43595 L 19.533037,575.56758 L 16.784795,575.0826 L 13.066588,573.95097 L 8.7017347,575.40592 L 7.0851227,575.72924 L 5.9534943,575.0826 z M 54.936843,570.55609 L 56.553455,572.49602 L 58.655048,570.87941 L 57.2001,569.58611 L 54.936843,570.55609 z M 57.846745,573.62764 L 58.978369,571.36439 L 61.079966,571.68771 L 60.271663,573.62764 L 57.846745,573.62764 z M 81.44928,571.68771 L 82.904234,573.46598 L 83.874208,572.33436 L 83.065895,570.39442 L 81.44928,571.68771 z M 90.17899,559.2398 L 91.310623,565.0596 L 94.220522,565.86791 L 99.232017,562.958 L 103.59687,560.37142 L 101.98027,557.94651 L 102.46525,555.52159 L 100.36365,556.81488 L 97.453752,556.00657 L 99.070357,554.87495 L 101.01029,555.68325 L 104.89016,553.90497 L 105.37515,552.45003 L 102.95023,551.64172 L 103.75853,549.70178 L 101.01029,551.64172 L 96.322118,555.19827 L 91.472284,558.10817 L 90.17899,559.2398 z M 132.53423,539.35547 L 134.95915,537.90052 L 133.98918,536.12224 L 132.21091,537.09221 L 132.53423,539.35547 z",
        FL: "M 759.8167,439.1428 L 762.08236,446.4614 L 765.81206,456.20366 L 771.14685,465.57996 L 774.86504,471.88472 L 779.71486,477.38118 L 783.75637,481.09937 L 785.37297,484.00926 L 784.24135,485.30254 L 783.43305,486.59582 L 786.34293,494.03221 L 789.25282,496.94209 L 791.83939,502.27689 L 795.39592,508.09667 L 799.92241,516.34135 L 801.2157,523.93939 L 801.70068,535.90227 L 802.34732,537.68053 L 802.024,541.0754 L 799.59909,542.36869 L 799.92241,544.30861 L 799.27577,546.24854 L 799.59909,548.67344 L 800.08407,550.61337 L 797.33585,553.84658 L 794.2643,555.30152 L 790.38445,555.46318 L 788.9295,557.07979 L 786.5046,558.04975 L 785.21131,557.56477 L 784.07969,556.59481 L 783.75637,553.68492 L 782.94806,550.29005 L 779.55319,545.11691 L 775.99666,542.85367 L 772.11681,542.53035 L 771.30851,543.82363 L 768.23696,539.4588 L 767.59032,535.90227 L 765.00375,531.86076 L 763.22549,530.72913 L 761.60888,532.83072 L 759.83062,532.5074 L 757.72903,527.49592 L 754.81914,523.61607 L 751.90925,518.28128 L 749.32269,515.20973 L 745.76616,511.49154 L 747.86774,509.06663 L 751.10095,503.57017 L 750.93929,501.95357 L 746.4128,500.98361 L 744.79619,501.63025 L 745.11952,502.27689 L 747.70608,503.24685 L 746.25114,507.77335 L 745.44284,508.25833 L 743.66457,504.21682 L 742.37129,499.367 L 742.04797,496.61877 L 743.50291,491.93062 L 743.50291,482.39265 L 740.43136,478.67446 L 739.13808,475.60291 L 733.96494,474.30963 L 732.02502,473.66299 L 730.40841,471.07642 L 727.01354,469.45981 L 725.88192,466.06494 L 723.13369,465.09498 L 720.70878,461.37679 L 716.50561,459.92185 L 713.59572,458.4669 L 711.00916,458.4669 L 706.96764,459.27521 L 706.80598,461.21513 L 707.61429,462.18509 L 707.1293,463.31672 L 704.05776,463.15506 L 700.33957,466.71159 L 696.78303,468.65151 L 692.90318,468.65151 L 689.66997,469.9448 L 689.34665,467.19657 L 687.73005,465.25664 L 684.82016,464.12502 L 683.20356,462.67007 L 675.12053,458.79022 L 667.52249,457.01196 L 663.15766,457.6586 L 657.17622,458.14358 L 651.19478,460.24517 L 647.71554,460.85813 L 647.47762,452.80838 L 644.89105,450.86846 L 643.11278,449.09019 L 643.4361,446.01863 L 653.62072,444.72535 L 679.16312,441.81546 L 685.95287,441.16882 L 691.38887,441.44909 L 693.97544,445.32895 L 695.43038,446.78389 L 703.52854,447.29911 L 714.34829,446.65247 L 735.86068,445.35918 L 741.3064,444.68481 L 746.41398,444.88932 L 746.84081,447.79921 L 749.07381,448.60751 L 749.30875,443.97751 L 747.78053,439.80456 L 749.08893,438.36473 L 754.64356,438.81948 L 759.8167,439.1428 z M 772.36211,571.54788 L 774.78703,570.90124 L 776.08031,570.65875 L 777.53527,568.31466 L 779.87935,566.69805 L 781.17264,567.18304 L 782.87008,567.50636 L 783.27423,568.55715 L 779.79853,569.76961 L 775.59533,571.22456 L 773.25125,572.43702 L 772.36211,571.54788 z M 785.86081,566.53639 L 787.07327,567.58719 L 789.82151,565.4856 L 795.15632,561.28241 L 798.87452,557.40254 L 801.38027,550.77444 L 802.35024,549.077 L 802.5119,545.68212 L 801.78442,546.1671 L 800.81446,548.99617 L 799.3595,553.6035 L 796.12628,558.8575 L 791.76144,563.06068 L 788.36656,565.00061 L 785.86081,566.53639 z",
        MI: "m 581.61931,82.059006 1.82899,-2.057604 2.17192,-0.800181 5.37264,-3.886597 2.28622,-0.571559 0.45726,0.457254 -5.14402,5.14402 -3.31504,1.943289 -2.05761,0.914496 -1.60036,-1.143118 z m 86.17438,32.128184 0.64664,2.50574 3.23322,0.16166 1.29329,-1.21246 c 0,0 -0.0808,-1.45494 -0.40415,-1.61661 -0.32333,-0.16166 -1.61661,-1.8591 -1.61661,-1.8591 l -2.18242,0.24249 -1.61662,0.16166 -0.32332,1.13163 0.96997,0.48499 z m -100.3016,-2.97401 0.71628,-0.5804 2.74823,-0.80831 3.55653,-2.26324 0,-0.96997 0.64665,-0.64664 5.98143,-0.96996 2.42491,-1.93993 4.36483,-2.10158 0.16166,-1.293286 1.93993,-2.909889 1.77826,-0.808302 1.29329,-1.778265 2.26324,-2.263247 4.36484,-2.424907 4.68815,-0.484981 1.13162,1.131623 -0.32332,0.969963 -3.71819,0.969963 -1.45494,3.071549 -2.26325,0.808302 -0.48498,2.424907 -2.42491,3.23321 -0.32332,2.58657 0.8083,0.48498 0.96997,-1.13162 3.55653,-2.90989 1.29328,1.29328 2.26325,0 3.23321,0.96996 1.45494,1.13163 1.45494,3.07155 2.74823,2.74822 3.87985,-0.16166 1.45495,-0.96996 1.6166,1.29328 1.61661,0.48499 1.29328,-0.80831 1.13162,0 1.61661,-0.96996 4.04151,-3.55653 3.39487,-1.13162 6.62808,-0.32332 4.52649,-1.93993 2.58657,-1.29328 1.45495,0.16166 0,5.65811 0.48498,0.32332 2.90988,0.80831 1.93993,-0.48499 6.1431,-1.6166 1.13162,-1.13162 1.45495,0.48498 0,6.9514 3.23321,3.07155 1.29328,0.64664 1.29328,0.96996 -1.29328,0.32332 -0.8083,-0.32332 -3.71819,-0.48498 -2.10159,0.64664 -2.26325,-0.16166 -3.23321,1.45495 -1.77826,0 -5.81978,-1.29329 -5.17313,0.16166 -1.93993,2.58657 -6.9514,0.64664 -2.42491,0.8083 -1.13162,3.07155 -1.29328,1.13163 -0.48498,-0.16166 -1.45495,-1.61661 -4.52649,2.42491 -0.64664,0 -1.13163,-1.61661 -0.8083,0.16166 -1.93992,4.36484 -0.96997,4.04151 -3.18112,7.0008 -1.17676,-1.03427 -1.37174,-1.03132 -1.94078,-10.28802 -3.54448,-1.37005 -2.05258,-2.28623 -12.12036,-2.74348 -2.85527,-1.02964 -8.23042,-2.17274 -7.88999,-1.14312 -3.7193,-5.14569 z m 130.36798,66.02371 -3.23321,-8.24469 -2.26325,-9.05298 -2.4249,-3.23321 -2.58657,-1.77827 -1.6166,1.13163 -3.87986,1.77826 -1.93992,5.01148 -2.74823,3.71819 -1.13162,0.64664 -1.45495,-0.64664 c 0,0 -2.58656,-1.45495 -2.4249,-2.10159 0.16166,-0.64664 0.48498,-5.01147 0.48498,-5.01147 l 3.39487,-1.29329 0.8083,-3.39487 0.64664,-2.58656 2.42491,-1.61661 -0.32332,-10.02295 -1.61661,-2.26324 -1.29328,-0.80831 -0.8083,-2.10158 0.8083,-0.8083 1.6166,0.32332 0.16166,-1.61661 -2.4249,-2.26325 -1.29329,-2.58656 -2.58656,0 -4.5265,-1.45495 -5.49645,-3.39487 -2.74823,0 -0.64664,0.64665 -0.96997,-0.48499 -3.07154,-2.26324 -2.90989,1.77826 -2.90989,2.26325 0.32332,3.55653 0.96996,0.32332 2.10159,0.48498 0.48498,0.8083 -2.58657,0.80831 -2.58656,0.32332 -1.45495,1.77826 -0.32332,2.10159 0.32332,1.6166 0.32332,5.49646 -3.55653,2.10159 -0.64664,-0.16167 0,-4.20317 1.29328,-2.4249 0.64665,-2.42491 -0.80831,-0.8083 -1.93992,0.8083 -0.96997,4.20317 -2.74822,1.13162 -1.77827,1.93993 -0.16166,0.96996 0.64664,0.8083 -0.64664,2.58657 -2.26325,0.48498 0,1.13163 0.80831,2.4249 -1.13163,6.1431 -1.6166,4.04151 0.64664,4.68816 0.48498,1.13162 -0.8083,2.42491 -0.32332,0.8083 -0.32332,2.74823 3.55653,5.98143 2.90989,6.46642 1.45494,4.84982 -0.8083,4.68815 -0.96996,5.98144 -2.42491,5.17313 -0.32332,2.74823 -3.25887,3.08515 4.40861,-0.16205 21.41849,-2.26325 7.27784,-0.98706 0.0964,1.66635 6.85194,-1.21246 10.29808,-1.50313 3.8542,-0.46091 0.13805,-0.58755 0.16166,-1.45494 2.10158,-3.71819 2.00056,-1.73785 -0.22229,-5.05189 1.59699,-1.59699 1.09062,-0.34294 0.22228,-3.55653 1.53577,-3.03112 1.05079,0.60622 0.16166,0.64664 0.80831,0.16166 1.93992,-0.96996 -0.32332,-9.53797 z",
        ME: "M 922.83976,78.830719 L 924.77969,80.932305 L 927.04294,84.650496 L 927.04294,86.590422 L 924.94135,91.278575 L 923.00142,91.925217 L 919.60655,94.996766 L 914.75674,100.49322 C 914.75674,100.49322 914.1101,100.49322 913.46346,100.49322 C 912.81682,100.49322 912.49349,98.391636 912.49349,98.391636 L 910.71523,98.553296 L 909.74527,100.00824 L 907.32036,101.46319 L 906.3504,102.91813 L 907.967,104.37307 L 907.48202,105.01972 L 906.99704,107.76794 L 905.05711,107.60628 L 905.05711,105.98968 L 904.73379,104.69639 L 903.27885,105.01972 L 901.50058,101.78651 L 899.399,103.07979 L 900.69228,104.53473 L 901.0156,105.66636 L 900.2073,106.95964 L 900.53062,110.03119 L 900.69228,111.64779 L 899.07568,114.23436 L 896.16579,114.71934 L 895.84247,117.62923 L 890.50767,120.70078 L 889.21439,121.18576 L 887.59778,119.73082 L 884.52623,123.28735 L 885.4962,126.52056 L 884.04125,127.81384 L 883.87959,132.17867 L 882.75631,138.43803 L 880.29406,137.28208 L 879.80907,134.21052 L 875.92922,133.07889 L 875.6059,130.33065 L 868.33115,106.88983 L 863.63257,92.250088 L 865.05311,92.131923 L 866.5669,92.541822 L 866.5669,89.955254 L 867.8752,85.458798 L 870.46177,80.770645 L 871.91672,76.729133 L 869.97679,74.304226 L 869.97679,68.322789 L 870.78509,67.352826 L 871.5934,64.604598 L 871.43174,63.149654 L 871.27007,58.29984 L 873.04834,53.450026 L 875.95823,44.5587 L 878.05981,40.355528 L 879.3531,40.355528 L 880.64638,40.517188 L 880.64638,41.648811 L 881.93967,43.912058 L 884.68789,44.5587 L 885.4962,43.750397 L 885.4962,42.780435 L 889.53771,39.870546 L 891.31597,38.092281 L 892.77092,38.253942 L 898.75235,40.678849 L 900.69228,41.648811 L 909.74527,71.555998 L 915.7267,71.555998 L 916.53501,73.495924 L 916.69667,78.345738 L 919.60655,80.608984 L 920.41486,80.608984 L 920.57652,80.124003 L 920.09154,78.99238 L 922.83976,78.830719 z M 901.90801,108.97825 L 903.44379,107.44247 L 904.81791,108.49327 L 905.38372,110.91819 L 903.68628,111.80732 L 901.90801,108.97825 z M 908.61694,103.07763 L 910.39521,104.93673 C 910.39521,104.93673 911.6885,105.01755 911.6885,104.69423 C 911.6885,104.37091 911.93099,102.67347 911.93099,102.67347 L 912.82013,101.86517 L 912.01182,100.08689 L 909.99106,100.81437 L 908.61694,103.07763 z",
        NY: "M 830.37944,188.7456 L 829.24781,187.77564 L 826.66123,187.61398 L 824.39799,185.67406 L 822.76738,179.54493 L 819.30892,179.63547 L 816.86521,176.92727 L 797.47989,181.30921 L 754.47811,190.0389 L 746.94846,191.26689 L 746.2103,184.79855 L 747.6384,183.67317 L 748.93168,182.54155 L 749.90165,180.92494 L 751.67991,179.79332 L 753.61984,178.01505 L 754.10482,176.39845 L 756.2064,173.65022 L 757.33803,172.68026 L 757.17637,171.71029 L 755.88308,168.63875 L 754.10482,168.47709 L 752.16489,162.33399 L 755.07478,160.55572 L 759.43961,159.10078 L 763.48113,157.80749 L 766.71434,157.32251 L 773.01909,157.16085 L 774.95902,158.45414 L 776.57562,158.6158 L 778.67721,157.32251 L 781.26378,156.19089 L 786.43691,155.70591 L 788.5385,153.92764 L 790.31676,150.69443 L 791.93337,148.75451 L 794.03495,148.75451 L 795.97488,147.62288 L 796.13654,145.35964 L 794.6816,143.25805 L 794.35828,141.80311 L 795.4899,139.70152 L 795.4899,138.24658 L 793.71163,138.24658 L 791.93337,137.43828 L 791.12507,136.30665 L 790.96341,133.72008 L 796.78318,128.22363 L 797.42982,127.41533 L 798.88477,124.50544 L 801.79466,119.97894 L 804.54289,116.26075 L 806.64447,113.83585 L 809.05957,112.01024 L 812.14093,110.7643 L 817.63738,109.47101 L 820.87059,109.63267 L 825.39709,108.17773 L 832.96228,106.10656 L 833.48207,111.08623 L 835.90699,117.55267 L 836.71529,122.72582 L 835.74533,126.60568 L 838.3319,131.13218 L 839.1402,133.23377 L 838.3319,136.14367 L 841.2418,137.43695 L 841.88844,137.76027 L 844.96,148.75321 L 844.42371,153.81288 L 843.93873,164.64415 L 844.74703,170.14062 L 845.55533,173.69716 L 847.01028,180.9719 L 847.01028,189.05494 L 845.87865,191.31819 L 847.71798,193.31098 L 848.51453,194.9894 L 846.57461,196.76767 L 846.89793,198.06095 L 848.19121,197.73763 L 849.64616,196.44435 L 851.9094,193.85778 L 853.04103,193.21114 L 854.65763,193.85778 L 856.92088,194.01944 L 864.84224,190.13959 L 867.75213,187.39136 L 869.04541,185.93642 L 873.24858,187.55302 L 869.85371,191.10955 L 865.97386,194.01944 L 858.8608,199.35423 L 856.27424,200.3242 L 850.45446,202.26412 L 846.41295,203.39575 L 845.23821,202.86282 L 844.99419,199.17429 L 845.47917,196.42605 L 845.31751,194.32447 L 842.504,192.62547 L 837.9775,191.6555 L 834.09764,190.52388 L 830.37944,188.7456 z",
        PA: "M 825.1237,224.69205 L 826.43212,224.42105 L 828.76165,223.1678 L 829.97353,220.68473 L 831.59014,218.42148 L 834.82335,215.34992 L 834.82335,214.54162 L 832.39844,212.92502 L 828.8419,210.5001 L 827.87194,207.91353 L 825.1237,207.59021 L 824.96204,206.45858 L 824.15374,203.71035 L 826.417,202.57873 L 826.57866,200.15381 L 825.28536,198.86052 L 825.44702,197.24391 L 827.38696,194.17236 L 827.38696,191.1008 L 830.08459,188.45492 L 829.16431,187.77994 L 826.64023,187.58703 L 824.34574,185.64711 L 822.79582,179.53105 L 819.29124,179.63157 L 816.83601,176.92824 L 798.74502,181.12601 L 755.74324,189.8557 L 746.85189,191.31064 L 746.23122,184.78925 L 740.86869,189.8569 L 739.5754,190.34188 L 735.37311,193.35077 L 738.28387,212.48822 L 740.76553,222.21758 L 744.33733,241.47907 L 747.60664,240.84139 L 759.55022,239.33892 L 797.47685,231.67372 L 812.35306,228.8504 L 820.65341,227.22804 L 820.92052,226.98951 L 823.02212,225.37289 L 825.1237,224.69205 z",
        VA: "M 831.63885,266.06892 L 831.49494,264.12189 L 837.94837,261.57201 L 837.17796,264.78985 L 834.25801,268.56896 L 833.83992,273.15478 L 834.30167,276.54522 L 832.4737,281.52338 L 830.30943,283.43952 L 828.83909,278.79871 L 829.28498,273.3496 L 830.87198,269.16653 L 831.63885,266.06892 z M 834.97904,294.37028 L 776.80486,306.94571 L 739.37789,312.22478 L 732.69956,311.8496 L 730.11431,313.77598 L 722.77518,313.99667 L 714.39307,314.97434 L 703.47811,316.58896 L 713.94754,310.97776 L 713.93442,308.90283 L 715.45447,306.7567 L 726.00825,295.25527 L 729.95497,299.73273 L 733.73798,300.69671 L 736.28144,299.55639 L 738.51866,298.24523 L 741.05527,299.58875 L 744.96944,298.16099 L 746.84617,293.60465 L 749.44709,294.14467 L 752.30233,292.01342 L 754.1016,292.50702 L 756.92881,288.83045 L 757.27706,286.74734 L 756.3134,285.47177 L 757.31617,283.60514 L 762.59044,271.32799 L 763.20721,265.59291 L 764.4361,265.06937 L 766.61463,267.51224 L 770.55049,267.21107 L 772.4797,259.63744 L 775.27369,259.07658 L 776.32344,256.33551 L 778.90326,253.98863 L 781.67509,248.29344 L 781.76002,243.22589 L 791.58153,247.04871 C 792.26238,247.38913 792.41441,241.99956 792.41441,241.99956 L 796.06697,243.59789 L 796.1353,246.53605 L 801.91955,247.83554 L 804.0525,249.01174 L 805.71242,251.06743 L 805.05787,254.7161 L 803.11043,257.30708 L 803.22028,259.36615 L 803.80924,261.21906 L 808.78799,262.48749 L 813.23926,262.52737 L 816.30809,263.48601 L 818.2516,263.79531 L 818.96641,266.88377 L 822.15685,267.2863 L 823.02492,268.48632 L 822.58543,273.1764 L 823.96016,274.27895 L 823.48121,276.20934 L 824.71062,276.99911 L 824.48882,278.38371 L 821.79483,278.28877 L 821.88379,279.90429 L 824.16478,281.44716 L 824.28632,282.85906 L 826.05943,284.64444 L 826.55122,287.16857 L 823.99818,288.54988 L 825.5704,290.04418 L 831.37142,288.35835 L 834.97904,294.37028 z",
        WV: "M 761.18551,238.96731 L 762.29752,243.91184 L 763.38096,249.94317 L 765.51125,247.36283 L 767.77449,244.29127 L 770.31287,243.67572 L 771.76782,242.22078 L 773.54609,239.63421 L 774.99107,240.28085 L 777.90096,239.95753 L 780.48754,237.85594 L 782.49443,236.40268 L 784.33966,235.91769 L 785.64358,236.93416 L 789.28683,238.75579 L 791.22676,240.53406 L 792.60088,241.82734 L 791.83916,247.38228 L 786.00425,244.84106 L 781.759,243.21904 L 781.65786,248.39747 L 778.91022,253.9342 L 776.38019,256.36086 L 775.1881,259.11025 L 772.54452,259.61035 L 771.64668,263.21223 L 770.60345,267.1619 L 766.63521,267.50264 L 764.31148,265.06376 L 763.24033,265.62317 L 762.60765,271.09287 L 761.25736,274.62737 L 756.29896,285.58234 L 757.19565,286.74304 L 756.98979,288.65158 L 754.1811,292.53605 L 752.3726,291.99176 L 749.40455,294.1515 L 746.86217,293.57929 L 744.86294,298.13486 C 744.86294,298.13486 741.60363,299.56508 740.94003,299.50258 C 740.77952,299.48746 738.47093,298.25348 738.47093,298.25348 L 736.13441,299.63285 L 733.72461,300.67725 L 729.97992,299.78813 L 728.85852,298.61985 L 726.6663,295.59649 L 723.52371,293.60837 L 721.81214,289.98513 L 717.52726,286.51694 L 716.88061,284.25369 L 714.29404,282.79874 L 713.48573,281.18214 L 713.24324,275.92816 L 715.42566,275.84733 L 717.3656,275.03903 L 717.52726,272.2908 L 719.14386,270.83585 L 719.30552,265.82437 L 720.27548,261.94451 L 721.56877,261.29787 L 722.86205,262.42949 L 723.34704,264.20776 L 725.12531,263.23779 L 725.61029,261.62119 L 724.47867,259.84292 L 724.47867,257.41801 L 725.44863,256.12472 L 727.71188,252.72985 L 729.00516,251.27491 L 731.10676,251.75989 L 733.37,250.14327 L 736.44155,246.7484 L 738.70481,242.86854 L 739.02813,237.21043 L 739.51311,232.19894 L 739.51311,227.51078 L 738.38149,224.43923 L 739.35145,222.98427 L 740.63493,221.69099 L 744.12618,241.51811 L 748.75719,240.76696 L 761.18551,238.96731 z",
        OH: "M 735.32497,193.32832 L 729.23143,197.38167 L 725.35158,199.64492 L 721.95671,203.36311 L 717.9152,207.24296 L 714.68199,208.05126 L 711.7721,208.53624 L 706.27564,211.12281 L 704.17406,211.28447 L 700.77919,208.21292 L 695.60605,208.85957 L 693.01949,207.40462 L 690.63842,206.05379 L 685.74585,206.7572 L 675.56123,208.37381 L 664.35436,210.55854 L 665.64765,225.18882 L 667.42592,238.92999 L 670.01248,262.37079 L 670.5783,267.20196 L 674.70065,267.07294 L 677.12556,266.26463 L 680.48936,267.76777 L 682.55985,272.1326 L 687.69879,272.1155 L 689.59053,274.2342 L 691.3517,274.1689 L 693.89009,272.82744 L 696.39426,273.19894 L 701.81554,273.68162 L 703.54251,271.54894 L 705.88816,270.25566 L 707.95865,269.57481 L 708.60529,272.32305 L 710.38357,273.29301 L 713.85926,275.63708 L 716.04168,275.55626 L 717.3748,275.06378 L 717.55951,272.30225 L 719.14487,270.84729 L 719.24403,266.05457 C 719.24403,266.05457 720.26799,261.94551 720.26799,261.94551 L 721.56726,261.34423 L 722.88861,262.49197 L 723.42676,264.18899 L 725.14589,263.15157 L 725.58487,261.69082 L 724.46818,259.78776 L 724.53447,257.47333 L 725.28347,256.40102 L 727.43623,253.09454 L 728.48645,251.5512 L 730.58804,252.03618 L 732.85129,250.41957 L 735.92284,247.0247 L 738.69433,242.94597 L 739.01466,237.89046 L 739.49964,232.87897 L 739.32286,227.57209 L 738.36802,224.67731 L 738.71926,223.48753 L 740.52365,221.73742 L 738.23486,212.69009 L 735.32497,193.32832 z",
        IN: "M 619.56954,299.97132 L 619.63482,297.11274 L 620.11981,292.58623 L 622.38305,289.67635 L 624.16133,285.79648 L 626.74789,281.59331 L 626.26291,275.77352 L 624.48465,273.02529 L 624.16133,269.79208 L 624.96963,264.29561 L 624.48465,257.3442 L 623.19135,241.33979 L 621.89807,225.98203 L 620.9276,214.26201 L 623.99866,215.15152 L 625.45361,216.12148 L 626.58523,215.79816 L 628.68682,213.85824 L 631.51639,212.24125 L 636.60919,212.07921 L 658.59506,209.81595 L 664.17079,209.28279 L 665.67393,225.239 L 669.92528,262.08055 L 670.52374,267.85215 L 670.15224,270.1154 L 671.38022,271.91077 L 671.47661,273.28332 L 668.95532,274.88283 L 665.41589,276.43414 L 662.21376,276.98442 L 661.6153,281.85135 L 657.04061,285.16382 L 654.24419,289.17426 L 654.56751,291.55099 L 653.98617,293.08519 L 650.6597,293.08519 L 649.07417,291.46859 L 646.58086,292.73079 L 643.8979,294.23393 L 644.05957,297.28838 L 642.86578,297.54641 L 642.3979,296.52827 L 640.23102,295.02513 L 636.9807,296.36661 L 635.42939,299.37286 L 633.99155,298.56456 L 632.5366,296.96505 L 628.07226,297.45004 L 622.47943,298.42 L 619.56954,299.97132 z",
        IL: "M 619.54145,300.34244 L 619.5727,297.11273 L 620.14009,292.46677 L 622.47262,289.55091 L 624.33927,285.47515 L 626.57229,281.47982 L 626.20079,276.22742 L 624.19558,272.68485 L 624.0992,269.33817 L 624.79403,264.06866 L 623.96862,256.89029 L 622.90228,241.11284 L 621.609,226.0955 L 620.68672,214.4563 L 620.41421,213.53491 L 619.60591,210.94834 L 618.31263,207.23015 L 616.69602,205.45188 L 615.24108,202.86532 L 615.00751,197.37636 L 569.21108,199.97461 L 569.4397,202.34656 L 571.72593,203.03243 L 572.64041,204.17554 L 573.09766,206.00452 L 576.98424,209.43386 L 577.67012,211.72009 L 576.98424,215.14943 L 575.15526,218.80739 L 574.4694,221.32223 L 572.18317,223.15122 L 570.35419,223.83709 L 565.09587,225.20882 L 564.41,227.0378 L 563.72413,229.09541 L 564.41,230.46715 L 566.23898,232.06751 L 566.01036,236.18271 L 564.18137,237.78307 L 563.49551,239.38343 L 563.49551,242.1269 L 561.66653,242.58414 L 560.06617,243.72726 L 559.83755,245.099 L 560.06617,247.1566 L 558.3515,248.47117 L 557.3227,251.27181 L 557.77994,254.92976 L 560.06617,262.24569 L 567.3821,269.79024 L 572.86903,273.4482 L 572.64041,277.79203 L 573.55491,279.16377 L 579.95634,279.62101 L 582.69981,280.99275 L 582.01395,284.65071 L 579.72772,290.5949 L 579.04185,293.79562 L 581.32807,297.6822 L 587.72951,302.94052 L 592.30197,303.62639 L 594.35956,308.65609 L 596.41717,311.8568 L 595.50268,314.82889 L 597.10304,318.9441 L 598.93202,321.00171 L 600.34605,320.12102 L 601.25371,318.04623 L 603.46679,316.29903 L 605.59826,315.68463 L 608.20079,316.86443 L 611.82778,318.24013 L 613.01673,317.9419 L 613.2166,315.68345 L 611.9293,313.27166 L 612.23352,310.89494 L 614.07192,309.54749 L 617.09446,308.7372 L 618.35536,308.27868 L 617.74275,306.8918 L 616.95138,304.53743 L 618.38398,303.55647 L 619.54145,300.34244 z",
        WI: "M 615.06589,197.36866 L 614.99915,194.21124 L 613.82004,189.68474 L 613.1734,183.54165 L 612.04178,181.11674 L 613.01174,178.04519 L 613.82004,175.1353 L 615.27499,172.54874 L 614.62834,169.15387 L 613.9817,165.59734 L 614.46668,163.81907 L 616.40661,161.39416 L 616.56827,158.64593 L 615.75997,157.35265 L 616.40661,154.76608 L 615.95409,150.59537 L 618.70232,144.93726 L 621.61221,138.14752 L 621.77387,135.88427 L 621.45055,134.91431 L 620.64224,135.39929 L 616.43907,141.70405 L 613.69084,145.74556 L 611.75092,147.52383 L 610.94262,149.78707 L 608.98767,150.59537 L 607.85605,152.5353 L 606.4011,152.21198 L 606.23944,150.43371 L 607.53273,148.00881 L 609.63431,143.32065 L 611.41258,141.70405 L 612.40341,139.3462 L 609.84296,137.44486 L 607.86814,127.07787 L 604.32067,125.73589 L 602.37441,123.42756 L 590.2447,120.70592 L 587.36881,119.69387 L 579.15569,117.52658 L 571.23777,116.36783 L 567.47261,111.23716 L 566.72221,111.79117 L 565.5243,111.62951 L 564.87765,110.49789 L 563.54364,110.79444 L 562.41201,110.9561 L 560.63375,111.92606 L 559.66378,111.27942 L 560.31043,109.33949 L 562.25035,106.26794 L 563.38197,105.13632 L 561.44205,103.68138 L 559.34046,104.48968 L 556.43057,106.4296 L 548.99419,109.66281 L 546.0843,110.30945 L 543.17442,109.82447 L 542.19269,108.94622 L 540.07599,111.7814 L 539.84737,114.52487 L 539.84737,122.9839 L 538.70425,124.58427 L 533.44593,128.47084 L 531.15971,134.41503 L 531.61695,134.64365 L 534.1318,136.70126 L 534.81766,139.90198 L 532.98868,143.10269 L 532.98868,146.98928 L 533.44593,153.61933 L 536.41802,156.59143 L 539.84737,156.59143 L 541.67635,159.79215 L 545.10568,160.24939 L 548.99227,165.96496 L 556.07957,170.08017 L 558.13717,172.82364 L 559.05167,180.25388 L 559.73753,183.5689 L 562.02376,185.16926 L 562.25238,186.541 L 560.19478,189.97033 L 560.4234,193.17106 L 562.93825,197.05764 L 565.4531,198.20075 L 568.42519,198.65799 L 569.76753,200.03811 L 615.06589,197.36866 z",
        NC: "M 834.98153,294.31554 L 837.06653,299.23289 L 840.62306,305.69931 L 843.04796,308.12422 L 843.6946,310.38747 L 841.2697,310.54913 L 842.078,311.19577 L 841.75468,315.39894 L 839.16811,316.69222 L 838.52147,318.79381 L 837.22819,321.7037 L 833.50999,323.3203 L 831.08509,322.99698 L 829.63014,322.83532 L 828.01354,321.54204 L 828.33686,322.83532 L 828.33686,323.80529 L 830.27679,323.80529 L 831.08509,325.09857 L 829.14516,331.40333 L 833.34833,331.40333 L 833.99498,333.01993 L 836.25822,330.75669 L 837.55151,330.2717 L 835.61158,333.82823 L 832.54003,338.67805 L 831.24675,338.67805 L 830.11512,338.19307 L 827.3669,338.83971 L 822.19376,341.26462 L 815.72734,346.59941 L 812.33247,351.28756 L 810.39255,357.75398 L 809.90757,360.17889 L 805.21941,360.66387 L 799.76628,362.00053 L 789.81987,353.798 L 777.21033,346.19995 L 774.30044,345.39164 L 761.69091,346.84659 L 757.41445,347.59674 L 755.79785,344.36352 L 752.82749,342.24682 L 736.3381,342.7318 L 729.06336,343.5401 L 720.01037,348.06661 L 713.86726,350.65317 L 692.68971,353.23975 L 693.1898,349.18542 L 694.96807,347.73048 L 697.71631,347.08383 L 698.36295,343.36563 L 702.56613,340.61741 L 706.44598,339.16245 L 710.64917,335.60592 L 715.014,333.50433 L 715.66064,330.43277 L 719.5405,326.55292 L 720.18714,326.39126 C 720.18714,326.39126 720.18714,327.52289 720.99545,327.52289 C 721.80375,327.52289 722.93538,327.84621 722.93538,327.84621 L 725.19863,324.28967 L 727.30022,323.64302 L 729.56346,323.96635 L 731.18008,320.40982 L 734.08997,317.82324 L 734.57495,315.72165 L 734.76245,312.07346 L 739.03895,312.05094 L 746.23754,311.19515 L 761.99477,308.94272 L 777.13081,306.85615 L 798.77129,302.1368 L 818.75461,297.87823 L 829.93155,295.47242 L 834.98153,294.31554 z M 839.25199,327.52211 L 841.83857,325.01636 L 844.99095,322.42978 L 846.52673,321.78314 L 846.68839,319.76238 L 846.04175,313.61926 L 844.5868,311.27518 L 843.94015,309.41608 L 844.66763,309.17358 L 847.41587,314.67006 L 847.82002,319.11573 L 847.65836,322.51062 L 844.26348,324.04639 L 841.43441,326.47131 L 840.30279,327.68377 L 839.25199,327.52211 z",
        TN: "M 696.67788,318.25411 L 644.78479,323.2656 L 629.02523,325.04386 L 624.40403,325.55657 L 620.53568,325.52885 L 620.31471,329.62968 L 612.12933,329.89369 L 605.17792,330.54033 L 597.08709,330.41647 L 595.67331,337.48933 L 593.97708,342.96938 L 590.68391,345.72022 L 589.33517,350.10128 L 589.01185,352.68785 L 584.97033,354.95109 L 586.42527,358.50763 L 585.45531,362.87247 L 584.48693,363.66212 L 692.64548,353.25457 L 693.04875,349.29963 L 694.85948,347.80924 L 697.69363,347.05979 L 698.36556,343.34281 L 702.46416,340.63785 L 706.51109,339.14382 L 710.59467,335.57349 L 715.03076,333.54803 L 715.55202,330.48068 L 719.61662,326.49569 L 720.16742,326.38152 C 720.16742,326.38152 720.19867,327.51314 721.00697,327.51314 C 721.81527,327.51314 722.9469,327.86771 722.9469,327.86771 L 725.21015,324.27992 L 727.28049,323.63328 L 729.5556,323.92849 L 731.15391,320.39563 L 734.10916,317.75172 L 734.53084,315.81261 L 734.8398,312.10146 L 732.69325,311.90169 L 730.09157,313.93002 L 723.09826,313.95909 L 704.73897,316.34591 L 696.67788,318.25411 z",
        AR: "M 593.82477,343.05296 L 589.84489,343.76966 L 584.73274,343.13563 L 585.15344,341.53356 L 588.13319,338.96687 L 589.07657,335.31062 L 587.24759,332.33852 L 508.83002,334.85337 L 510.43038,341.71206 L 510.43037,349.94248 L 511.80212,360.91647 L 512.03074,398.7534 L 514.31697,400.69669 L 517.28906,399.32496 L 520.03254,400.46807 L 520.71288,407.04137 L 576.33414,405.90077 L 577.47977,403.8104 L 577.19315,400.26089 L 575.36752,397.28879 L 576.96621,395.80358 L 575.36752,393.29208 L 576.05172,390.78225 L 577.42011,385.17682 L 579.9383,383.11419 L 579.25243,380.82963 L 582.9104,375.45784 L 585.65387,374.08945 L 585.54039,372.59587 L 585.19495,370.77023 L 588.0519,365.1715 L 590.45494,363.91491 L 590.83907,360.48728 L 592.60974,359.24558 L 589.46622,358.76131 L 588.12476,354.75087 L 590.92884,352.37416 L 591.4791,350.35496 L 592.75858,346.30835 L 593.82477,343.05296 z",
        MO: "M 558.44022,248.11316 L 555.92035,245.02591 L 554.77723,242.73968 L 490.42,245.14022 L 488.13374,245.25453 L 489.39117,247.76938 L 489.16255,250.0556 L 491.67739,253.94219 L 494.76379,258.0574 L 497.8502,260.80087 L 500.01143,261.02949 L 501.50816,261.94399 L 501.50816,264.91608 L 499.67919,266.51644 L 499.22193,268.80266 L 501.27954,272.23201 L 503.7944,275.2041 L 506.30924,277.03308 L 507.68097,288.69283 L 507.99511,324.76504 L 508.22373,329.45179 L 508.68097,334.8353 L 531.11396,333.96848 L 554.31999,333.28261 L 575.12465,332.4816 L 586.77939,332.2513 L 588.94879,335.6773 L 588.2646,338.9848 L 585.17735,341.38784 L 584.60496,343.22518 L 589.98345,343.68244 L 593.87841,342.99656 L 595.59559,337.50293 L 596.24701,331.64614 L 598.34504,329.09098 L 600.94107,327.60409 L 600.9925,324.55385 L 602.00852,322.61737 L 600.31429,320.0736 L 598.98336,321.05786 L 596.99074,318.83062 L 595.70571,314.07162 L 596.50672,311.55342 L 594.56259,308.12576 L 592.73195,303.54996 L 587.93254,302.75062 L 580.96374,297.15187 L 579.24488,293.03834 L 580.04423,289.83762 L 582.1035,283.77995 L 582.56242,280.91632 L 580.61328,279.88501 L 573.75794,279.08734 L 572.72997,277.37518 L 572.61817,273.14482 L 567.13123,269.71381 L 560.15572,261.94231 L 557.8695,254.62638 L 557.63921,250.40106 L 558.44022,248.11316 z",
        GA: "M 672.29229,355.5518 L 672.29229,357.73422 L 672.45395,359.83582 L 673.10059,363.23069 L 676.49547,371.15206 L 678.92038,381.01337 L 680.37532,387.15648 L 681.99193,392.00629 L 683.44688,398.9577 L 685.54847,405.26247 L 688.13504,408.65735 L 688.62002,412.05222 L 690.55995,412.86052 L 690.72161,414.96212 L 688.94334,419.81193 L 688.45836,423.04515 L 688.2967,424.98508 L 689.91331,429.34992 L 690.23663,434.68472 L 689.42832,437.10963 L 690.07497,437.91794 L 691.52992,438.72624 L 691.73462,441.94433 L 693.96763,445.29386 L 696.21807,447.45591 L 704.13945,447.61757 L 714.9592,446.97093 L 736.47159,445.67765 L 741.91731,445.00328 L 746.49456,445.03101 L 746.65622,447.9409 L 749.24279,448.7492 L 749.56611,444.38436 L 747.9495,439.85786 L 749.08113,438.24126 L 754.90091,439.04956 L 759.87832,439.36734 L 759.1029,433.06855 L 761.36614,423.0456 L 762.82109,418.84242 L 762.3361,416.25586 L 765.67051,410.01156 L 765.16021,408.65988 L 763.2468,409.36446 L 760.66024,408.07116 L 760.01359,405.96957 L 758.72031,402.41304 L 756.45705,400.31145 L 753.87049,399.66481 L 752.25388,394.81499 L 749.32887,388.47999 L 745.1257,386.54006 L 743.0241,384.60013 L 741.73081,382.01356 L 739.62923,380.07363 L 737.36598,378.78034 L 735.10273,375.87045 L 732.03118,373.60721 L 727.50467,371.82893 L 727.01969,370.37399 L 724.59478,367.4641 L 724.1098,366.00915 L 720.71492,361.03867 L 717.19505,361.13784 L 713.44014,358.7817 L 712.02186,357.48842 L 711.69854,355.71015 L 712.56934,353.77023 L 714.79598,352.66009 L 714.16204,350.56287 L 672.29229,355.5518 z",
        SC: "M 764.94328,408.16488 L 763.16622,409.13438 L 760.57965,407.84109 L 759.93301,405.7395 L 758.63973,402.18297 L 756.37647,400.08137 L 753.7899,399.43473 L 752.1733,394.58492 L 749.42506,388.60347 L 745.22189,386.66353 L 743.12029,384.72361 L 741.82701,382.13704 L 739.72542,380.1971 L 737.46217,378.90382 L 735.19892,375.99393 L 732.12737,373.73069 L 727.60086,371.95241 L 727.11588,370.49747 L 724.69098,367.58758 L 724.20599,366.13262 L 720.81111,360.95949 L 717.41624,361.12115 L 713.37472,358.69623 L 712.08144,357.40295 L 711.75812,355.62468 L 712.56642,353.68476 L 714.82967,352.71478 L 714.31885,350.4257 L 720.08695,348.08913 L 729.20245,343.50013 L 736.97718,342.69182 L 753.09158,342.26934 L 755.72983,344.14677 L 757.40893,347.50499 L 761.71128,346.89501 L 774.32081,345.44005 L 777.2307,346.24836 L 789.84024,353.84642 L 799.94832,361.9681 L 794.52715,367.42644 L 791.94058,373.56954 L 791.4556,379.8743 L 789.839,380.6826 L 788.70737,383.43083 L 786.28247,384.07747 L 784.18088,387.634 L 781.43265,390.38223 L 779.16941,393.7771 L 777.5528,394.5854 L 773.99627,397.98027 L 771.08638,398.14193 L 772.05635,401.37514 L 767.04487,406.8716 L 764.94328,408.16488 z",
        KY: "M 725.9944,295.2707 L 723.70108,297.67238 L 720.12289,301.66642 L 715.19834,307.13109 L 713.98257,308.84686 L 713.92007,310.94844 L 709.54021,313.11253 L 703.88209,316.50741 L 696.65022,318.30626 L 644.78233,323.20512 L 629.02277,324.98338 L 624.40157,325.49609 L 620.53322,325.46837 L 620.30627,329.68865 L 612.12686,329.83321 L 605.17545,330.47985 L 597.18797,330.41963 L 598.39575,329.09955 L 600.89529,327.5587 L 601.12392,324.35797 L 602.03841,322.52899 L 600.43159,319.99009 L 601.23342,318.08328 L 603.49668,316.30502 L 605.59826,315.65837 L 608.34649,316.95166 L 611.90303,318.24494 L 613.03466,317.92162 L 613.19632,315.65837 L 611.90303,313.23346 L 612.22635,310.97021 L 614.16628,309.51527 L 616.75286,308.86862 L 618.36946,308.22198 L 617.56116,306.44371 L 616.91452,304.50378 L 618.42114,303.50798 C 618.42442,303.47086 619.6751,299.98569 619.65943,299.85017 L 622.71265,298.37149 L 628.03244,297.40153 L 632.52648,296.91655 L 633.91892,298.54398 L 635.44719,299.41478 L 637.03796,296.30657 L 640.22504,295.02395 L 642.43013,296.50798 L 642.84069,297.50702 L 644.01421,297.24301 L 643.85254,294.29008 L 646.98341,292.54089 L 649.1315,291.46741 L 650.66086,293.12822 L 653.97901,293.08402 L 654.56634,291.51277 L 654.19883,289.24953 L 656.79936,285.25103 L 661.57591,281.81313 L 662.28186,276.97727 L 665.20688,276.52136 L 668.99834,274.87568 L 671.44166,273.16744 L 671.24333,271.60251 L 670.10088,270.14757 L 670.6667,267.15266 L 674.85155,267.03516 L 677.15146,266.28936 L 680.49885,267.71846 L 682.55296,272.0833 L 687.68525,272.09412 L 689.73626,274.30231 L 691.35171,274.15461 L 693.9534,272.87644 L 699.19046,273.44981 L 701.76538,273.66732 L 703.45296,271.61108 L 706.07091,270.1852 L 707.95269,269.4781 L 708.59933,272.31473 L 710.64276,273.37307 L 713.28552,275.45556 L 713.40299,281.1288 L 714.21129,282.70121 L 716.80101,284.25749 L 717.57265,286.552 L 721.73254,289.98894 L 723.53785,293.61218 L 725.9944,295.2707 z",
        AL: "M 631.30647,460.41572 L 629.81587,446.09422 L 627.06763,427.34158 L 627.22929,413.27709 L 628.03759,382.23824 L 627.87593,365.58718 L 628.04102,359.16812 L 672.5255,355.54867 L 672.3777,357.73109 L 672.53936,359.83269 L 673.18601,363.22756 L 676.58089,371.14893 L 679.00579,381.01024 L 680.46074,387.15335 L 682.07734,392.00317 L 683.5323,398.95458 L 685.63388,405.25934 L 688.22045,408.65423 L 688.70543,412.04909 L 690.64537,412.8574 L 690.80703,414.95899 L 689.02875,419.80881 L 688.54377,423.04203 L 688.38211,424.98195 L 689.99873,429.3468 L 690.32205,434.68159 L 689.51373,437.10651 L 690.16039,437.91481 L 691.61533,438.72311 L 691.94347,441.61193 L 686.34581,441.25838 L 679.55606,441.90503 L 654.01366,444.81491 L 643.6021,446.22168 L 643.38072,449.09908 L 645.15899,450.87735 L 647.74556,452.81727 L 648.32642,460.75271 L 642.78436,463.32561 L 640.03614,463.00229 L 642.78436,461.06236 L 642.78436,460.0924 L 639.71282,454.11096 L 637.44957,453.46432 L 635.99462,457.82915 L 634.70134,460.57738 L 634.0547,460.41572 L 631.30647,460.41572 z",
        LA: "M 607.96706,459.16125 L 604.68245,455.99511 L 605.69236,450.49488 L 605.03101,449.6018 L 595.76934,450.60836 L 570.74102,451.06728 L 570.05683,448.6726 L 570.96964,440.2169 L 574.28552,434.27105 L 579.31688,425.58003 L 578.74281,423.18201 L 579.9994,422.50116 L 580.45833,420.54867 L 578.17209,418.49274 L 578.0603,416.55029 L 576.22964,412.20478 L 576.08259,405.86618 L 520.6088,406.79015 L 520.63737,416.36372 L 521.32324,425.73725 L 522.00911,429.62383 L 524.52396,433.73904 L 525.43845,438.76875 L 529.78228,444.25568 L 530.0109,447.4564 L 530.69677,448.14227 L 530.0109,456.60131 L 527.03881,461.631 L 528.63917,463.68861 L 527.95329,466.20345 L 527.26743,473.51938 L 525.89569,476.72009 L 526.01815,480.33654 L 530.70463,478.81639 L 542.81798,479.0234 L 553.16425,482.57993 L 559.63067,483.71156 L 563.34886,482.25661 L 566.58207,483.38824 L 569.81528,484.3582 L 570.62358,482.25661 L 567.39037,481.12499 L 564.8038,481.60997 L 562.05557,479.99337 C 562.05557,479.99337 562.21724,478.70008 562.86388,478.53842 C 563.51052,478.37676 565.93543,477.56846 565.93543,477.56846 L 567.71369,479.0234 L 569.49196,478.05344 L 572.72517,478.70008 L 574.18011,481.12499 L 574.50343,483.38824 L 579.02992,483.71156 L 580.80819,485.48982 L 579.99989,487.10643 L 578.7066,487.91473 L 580.32321,489.53133 L 588.72955,493.08786 L 592.28608,491.79458 L 593.25605,489.36967 L 595.84261,488.72303 L 597.62088,487.26809 L 598.91416,488.23805 L 599.72246,491.14794 L 597.45922,491.95624 L 598.10586,492.60288 L 601.50073,491.3096 L 603.76398,487.91473 L 604.57228,487.42975 L 602.47069,487.10643 L 603.27899,485.48982 L 603.11733,484.03488 L 605.21892,483.5499 L 606.35054,482.25661 L 606.99718,483.06491 C 606.99718,483.06491 606.83552,486.13646 607.64383,486.13646 C 608.45213,486.13646 611.847,486.78311 611.847,486.78311 L 615.88851,488.72303 L 616.85847,490.17798 L 619.76836,490.17798 L 620.89999,491.14794 L 623.16323,488.07639 L 623.16323,486.62144 L 621.86995,486.62144 L 618.47508,483.87322 L 612.6553,483.06491 L 609.42209,480.80167 L 610.55372,478.05344 L 612.81696,478.37676 L 612.97862,477.73012 L 611.20036,476.76016 L 611.20036,476.27517 L 614.43357,476.27517 L 616.21183,473.20363 L 614.91855,471.2637 L 614.59523,468.51547 L 613.14028,468.67713 L 611.20036,470.77872 L 610.55372,473.36529 L 607.48217,472.71864 L 606.5122,470.94038 L 608.29047,469.00045 L 610.1938,465.55485 L 609.1327,463.14258 L 607.96706,459.16125 z",
        MS: "M 631.55882,459.34458 L 631.30456,460.60073 L 626.13142,460.60073 L 624.67648,459.79243 L 622.57489,459.46911 L 615.78515,461.40903 L 614.00689,460.60073 L 611.42032,464.8039 L 610.31778,465.58192 L 609.19395,463.09394 L 608.05083,459.20735 L 604.6215,456.00664 L 605.7646,450.46209 L 605.07874,449.5476 L 603.24976,449.77622 L 595.33184,450.64959 L 570.78534,451.02296 L 570.0156,448.7976 L 570.88897,440.4208 L 574.00581,434.74799 L 579.23288,425.60309 L 578.78714,423.17049 L 580.024,422.51424 L 580.45987,420.59477 L 578.14239,418.51579 L 578.02727,416.37431 L 576.19155,412.25322 L 576.08255,406.29045 L 577.41008,403.80948 L 577.18678,400.39373 L 575.41729,397.31114 L 576.94371,395.82893 L 575.3731,393.32939 L 575.83035,391.67718 L 577.40775,385.15081 L 579.8937,383.11446 L 579.25203,380.74749 L 582.91,375.44496 L 585.74186,374.08854 L 585.52089,372.41338 L 585.23276,370.73228 L 588.10882,365.16461 L 590.45454,363.9331 L 590.60617,363.04009 L 627.94965,359.15892 L 628.13451,365.44225 L 628.29617,382.09331 L 627.48787,413.13216 L 627.32621,427.19665 L 630.07445,445.94929 L 631.55882,459.34458 z",
        IA: "M 569.19154,199.5843 L 569.45592,202.3705 L 571.67964,202.94776 L 572.63358,204.17309 L 573.13359,206.02845 L 576.92643,209.3871 L 577.6123,211.7786 L 576.93796,215.20307 L 575.35565,218.43505 L 574.55631,221.17684 L 572.38356,222.77888 L 570.66805,223.35128 L 565.08903,225.21148 L 563.69757,229.06017 L 564.42621,230.43191 L 566.26672,232.1145 L 565.98379,236.15079 L 564.22064,237.68865 L 563.44923,239.33179 L 563.57645,242.10811 L 561.69014,242.56535 L 560.06469,243.67026 L 559.7859,245.02289 L 560.06469,247.13781 L 558.51367,248.25388 L 556.04314,245.1206 L 554.78057,242.67073 L 489.04475,245.18558 L 488.12672,245.35102 L 486.07432,240.83506 L 485.8457,234.20499 L 484.24534,230.08978 L 483.55948,224.83147 L 481.27325,221.1735 L 480.35877,216.37243 L 477.61529,208.82788 L 476.47218,203.45524 L 475.10044,201.28333 L 473.50008,198.53987 L 475.45406,193.69604 L 476.8258,187.98047 L 474.08233,185.92286 L 473.62508,183.17939 L 474.53958,180.66454 L 476.25425,180.66454 L 558.90825,179.39506 L 559.74251,183.57818 L 561.99469,185.13915 L 562.2514,186.56224 L 560.22186,189.95155 L 560.41227,193.15707 L 562.92713,196.95527 L 565.45392,198.24889 L 568.5332,198.75194 L 569.19154,199.5843 z",
        MN: "M 475.23781,128.82439 L 474.78056,120.36535 L 472.95158,113.04943 L 471.1226,99.560705 L 470.66535,89.729927 L 468.83637,86.300584 L 467.23601,81.270889 L 467.23601,70.982869 L 467.92187,67.096282 L 466.10094,61.644615 L 496.23336,61.679886 L 496.55668,53.435202 L 497.20332,53.273541 L 499.46657,53.758523 L 501.40649,54.566825 L 502.21479,60.063281 L 503.66974,66.206379 L 505.28634,67.822984 L 510.13616,67.822984 L 510.45948,69.277928 L 516.76424,69.601249 L 516.76424,71.702835 L 521.61405,71.702835 L 521.93737,70.409551 L 523.06899,69.277928 L 525.33224,68.631286 L 526.62552,69.601249 L 529.53541,69.601249 L 533.41526,72.187816 L 538.75006,74.612723 L 541.17497,75.097705 L 541.65995,74.127742 L 543.11489,73.64276 L 543.59987,76.552649 L 546.18644,77.845933 L 546.67142,77.360951 L 547.96471,77.522612 L 547.96471,79.624198 L 550.55127,80.594161 L 553.62282,80.594161 L 555.23943,79.785858 L 558.47264,76.552649 L 561.0592,76.067668 L 561.86751,77.845933 L 562.35249,79.139216 L 563.32245,79.139216 L 564.29241,78.330914 L 573.18374,78.007593 L 574.962,81.079142 L 575.60865,81.079142 L 576.32226,79.994863 L 580.76217,79.624198 L 580.15007,81.903657 L 576.21135,83.740782 L 566.96557,87.80191 L 562.19083,89.808807 L 559.11928,92.395375 L 556.69437,95.951905 L 554.43113,99.831756 L 552.65286,100.64006 L 548.12637,105.65153 L 546.83308,105.81319 L 542.5053,108.57031 L 540.04242,111.77542 L 539.8138,114.96681 L 539.90816,123.01016 L 538.53212,124.69891 L 533.45058,128.45888 L 531.2205,134.44129 L 534.09225,136.675 L 534.77214,139.90198 L 532.9169,143.14091 L 533.08769,146.88893 L 533.45655,153.61933 L 536.4848,156.62132 L 539.8138,156.62132 L 541.70491,159.75392 L 545.08408,160.25719 L 548.94324,165.92866 L 556.03053,170.04541 L 558.17368,172.92053 L 558.84483,179.36004 L 477.63333,180.50483 L 477.29541,144.82798 L 476.83817,141.85589 L 472.72296,138.42655 L 471.57984,136.59757 L 471.57984,134.9972 L 473.63744,133.39685 L 475.00918,132.02511 L 475.23781,128.82439 z",
        OK: "M 380.34313,320.82146 L 363.65895,319.54815 L 362.77873,330.50058 L 383.24411,331.65746 L 415.29966,332.96106 L 412.96506,357.37971 L 412.50781,375.21228 L 412.73644,376.81264 L 417.08027,380.4706 L 419.13787,381.61371 L 419.82374,381.38509 L 420.50961,379.32748 L 421.88135,381.15647 L 423.93895,381.15647 L 423.93895,379.78473 L 426.68242,381.15647 L 426.22518,385.04305 L 430.34039,385.27167 L 432.85523,386.41479 L 436.97044,387.10066 L 439.48529,388.92964 L 441.77152,386.87204 L 445.20086,387.5579 L 447.71571,390.98724 L 448.63019,390.98724 L 448.63019,393.27347 L 450.91642,393.95933 L 453.20264,391.67311 L 455.03163,392.35897 L 457.54647,392.35897 L 458.46097,394.87383 L 464.76204,396.9528 L 466.13378,396.26694 L 467.96276,392.15173 L 469.10587,392.15173 L 470.24899,394.20933 L 474.3642,394.8952 L 478.02215,396.26694 L 480.99425,397.18143 L 482.82324,396.26694 L 483.5091,393.75209 L 487.85293,393.75209 L 489.91053,394.66658 L 492.654,392.60897 L 493.79712,392.60897 L 494.48299,394.20933 L 498.59819,394.20933 L 500.19855,392.15173 L 502.02754,392.60897 L 504.08514,395.12383 L 507.28585,396.9528 L 510.48658,397.8673 L 512.42766,398.98623 L 512.03856,361.76922 L 510.66681,350.79524 L 510.50635,341.9229 L 509.06646,335.38517 L 508.28826,328.20553 L 508.22012,324.38931 L 496.08328,324.70805 L 449.67324,324.25081 L 404.63433,322.19319 L 380.34313,320.82146 z",
        TX: "M 361.46423,330.57358 L 384.15502,331.65952 L 415.24771,332.80264 L 412.9131,356.25844 L 412.61634,374.41196 L 412.68448,376.49375 L 417.02831,380.31218 L 419.01496,381.75934 L 420.19917,381.19965 L 420.57254,379.38193 L 421.71286,381.18555 L 423.8245,381.22948 L 423.82183,379.78239 L 425.49177,380.74966 L 426.63047,381.15853 L 426.2712,385.12618 L 430.35939,385.21969 L 433.28471,386.41686 L 437.23945,386.94224 L 439.62083,389.02122 L 441.74493,386.94505 L 445.46987,387.55996 L 447.69078,390.7849 L 448.76574,391.10586 L 448.60527,393.07113 L 450.81888,393.86342 L 453.14903,391.80862 L 455.28205,392.42354 L 457.51143,392.45902 L 458.4445,394.89446 L 464.77259,397.00891 L 466.36564,396.24198 L 467.85511,392.06427 L 468.19583,392.06427 L 469.10232,392.14591 L 470.33137,394.21454 L 474.26125,394.87982 L 477.59825,396.0027 L 481.02388,397.19867 L 482.86446,396.22367 L 483.57822,393.70883 L 488.03144,393.75303 L 489.84018,394.68381 L 492.63943,392.5773 L 493.74307,392.6215 L 494.59411,394.22657 L 498.64883,394.22657 L 500.1677,392.19795 L 502.03507,392.60519 L 503.9811,395.00847 L 507.50167,397.05262 L 510.36043,397.86243 L 511.87405,398.66227 L 514.32075,400.65959 L 517.36379,399.3318 L 520.05488,400.47068 L 520.61869,406.57662 L 520.57893,416.27879 L 521.26479,425.8128 L 521.96697,429.41791 L 524.6423,433.83777 L 525.54048,438.7885 L 529.75643,444.32652 L 529.95245,447.47146 L 530.69882,448.2573 L 529.96875,456.63737 L 527.09665,461.64387 L 528.62962,463.79674 L 527.99954,466.13482 L 527.32997,473.53914 L 525.82565,476.87714 L 526.12053,480.37949 L 520.45565,481.96467 L 510.59436,486.49117 L 509.6244,488.43109 L 507.03783,490.37102 L 504.93625,491.82596 L 503.64296,492.63426 L 497.98485,497.96906 L 495.23662,500.07065 L 489.90182,503.30385 L 484.24371,505.72876 L 477.93895,509.12363 L 476.16069,510.57858 L 470.34091,514.13511 L 466.94604,514.78175 L 463.06619,520.2782 L 459.02468,520.60153 L 458.05471,522.54145 L 460.31796,524.48138 L 458.86301,529.97783 L 457.56973,534.50433 L 456.43811,538.38418 L 455.62981,542.91067 L 456.43811,545.33558 L 458.21637,552.28698 L 459.18634,558.43007 L 460.9646,561.1783 L 459.99464,562.63325 L 456.92309,564.57317 L 451.26497,560.69332 L 445.76852,559.5617 L 444.47523,560.04668 L 441.24202,559.40004 L 437.03885,556.32849 L 431.86572,555.19687 L 424.26767,551.802 L 422.16609,547.92214 L 420.8728,541.45573 L 417.6396,539.5158 L 416.99295,537.25255 L 417.6396,536.60591 L 417.96292,533.21104 L 416.66963,532.5644 L 416.02299,531.59444 L 417.31627,527.2296 L 415.69967,524.96636 L 412.46646,523.67307 L 409.07159,519.30824 L 405.51506,512.68016 L 401.31189,510.09359 L 401.47355,508.15367 L 396.13875,495.86747 L 395.33045,491.6643 L 393.55219,489.72438 L 393.39053,488.26943 L 387.40909,482.93464 L 384.82252,479.86309 L 384.82252,478.73146 L 382.23595,476.62988 L 375.44621,475.49825 L 368.00983,474.85161 L 364.93828,472.58837 L 360.41179,474.36663 L 356.85526,475.82158 L 354.59201,479.05478 L 353.62205,482.77298 L 349.25722,488.91607 L 346.83231,491.34098 L 344.24574,490.37102 L 342.46748,489.23939 L 340.52755,488.59275 L 336.6477,486.32951 L 336.6477,485.68286 L 334.86944,483.74294 L 329.6963,481.64135 L 322.25992,473.88165 L 319.99667,469.1935 L 319.99667,461.11047 L 316.76346,454.64405 L 316.27848,451.89583 L 314.66188,450.92586 L 313.53025,448.82428 L 308.51878,446.72269 L 307.2255,445.10609 L 300.11243,437.18472 L 298.81915,433.95151 L 294.13099,431.68826 L 292.67604,427.32339 L 290.08945,424.41352 L 288.14954,423.92856 L 287.50031,419.25092 L 295.50218,419.93681 L 324.53717,422.68026 L 353.57225,424.28062 L 355.80578,404.8188 L 359.69233,349.26378 L 361.29272,330.51646 L 362.66446,330.54504 M 461.69381,560.20778 L 461.128,553.0947 L 458.37976,545.90078 L 457.81394,538.86853 L 459.34972,530.62382 L 462.66378,523.75323 L 466.13948,518.33758 L 469.29188,514.78103 L 469.93852,515.02353 L 465.16952,521.65163 L 460.80468,528.19891 L 458.78391,534.827 L 458.46059,540.00016 L 459.34972,546.14328 L 461.9363,553.3372 L 462.42128,558.51034 L 462.58294,559.9653 L 461.69381,560.20778 z",
        NM: "M 288.15255,424.01315 L 287.37714,419.26505 L 296.02092,419.79045 L 326.19268,422.73635 L 353.46084,424.42624 L 355.67611,405.71877 L 359.53347,349.8428 L 361.27115,330.45357 L 362.84285,330.58213 L 363.66825,319.41874 L 259.6638,308.78279 L 242.16645,429.2176 L 257.62712,431.20675 L 258.9204,421.1838 L 288.15255,424.01315 z",
        KS: "M 507.88059,324.38028 L 495.26233,324.58471 L 449.17324,324.12748 L 404.61576,322.06985 L 379.98602,320.81244 L 383.87981,256.21747 L 405.96327,256.89264 L 446.2524,257.73404 L 490.55364,258.72162 L 495.64927,258.72162 L 497.83367,260.88402 L 499.85133,260.86264 L 501.49163,261.87511 L 501.42913,264.88434 L 499.60015,266.60971 L 499.2679,268.84188 L 501.11098,272.24421 L 504.06334,275.43927 L 506.39069,277.05373 L 507.69146,288.29455 L 507.88059,324.38028 z",
        NE: "M 486.09787,240.70058 L 489.32848,247.72049 L 489.19985,250.02301 L 492.65907,255.51689 L 495.37836,258.66923 L 490.32888,258.66923 L 446.84632,257.73055 L 406.05946,256.84025 L 383.80724,256.05638 L 384.88001,234.72853 L 352.56177,231.80828 L 356.9056,187.79842 L 372.45193,188.82723 L 392.57072,189.97033 L 410.40329,191.11345 L 434.18005,192.25656 L 444.92531,191.79932 L 446.98291,194.08554 L 451.78399,197.05764 L 452.9271,197.97213 L 457.27093,196.60039 L 461.15752,196.14315 L 463.90099,195.91452 L 465.72997,197.28626 L 469.7874,198.88662 L 472.75949,200.48698 L 473.21674,202.08734 L 474.13123,204.14494 L 475.96021,204.14494 L 476.75819,204.19111 L 477.65242,208.87293 L 480.57268,217.34085 L 481.14521,221.09756 L 483.6687,224.87181 L 484.23829,229.98595 L 485.84553,234.22632 L 486.09787,240.70058 z",
        SD: "M 476.44687,204.02465 L 476.39942,203.44378 L 473.50371,198.59834 L 475.36394,193.88623 L 476.85667,187.99969 L 474.0748,185.91998 L 473.68964,183.17652 L 474.48204,180.62217 L 477.67055,180.63738 L 477.54747,175.63124 L 477.21417,145.45699 L 476.59644,141.68941 L 472.52412,138.35848 L 471.54149,136.68152 L 471.47899,135.0727 L 473.50111,133.5433 L 475.03333,131.87763 L 475.27829,129.22084 L 417.0212,127.62049 L 362.22199,124.1714 L 356.89672,187.86259 L 371.48699,188.76639 L 391.43684,189.972 L 409.17989,190.90059 L 432.95665,192.20417 L 444.93935,191.77953 L 446.90565,194.02471 L 452.10029,197.27806 L 452.86418,198.00081 L 457.40562,196.548 L 463.94616,195.93309 L 465.62146,197.26936 L 469.82597,198.86549 L 472.77103,200.50132 L 473.17001,201.98513 L 474.2095,204.22601 L 476.44687,204.02465 z",
        ND: "M 475.30528,128.91846 L 474.69037,120.48479 L 473.01342,113.66887 L 471.12193,100.64465 L 470.66469,89.657624 L 468.92523,86.580482 L 467.16862,81.386086 L 467.19987,70.941816 L 467.82323,67.117729 L 465.98913,61.649968 L 437.34688,61.085941 L 418.75593,60.439299 L 392.24361,59.146015 L 369.29727,57.012146 L 362.30403,124.18898 L 417.23627,127.53263 L 475.30528,128.91846 z",
        WY: "M 360.37668,143.27587 L 253.63408,129.81881 L 239.5506,218.27684 L 352.81521,231.86233 L 360.37668,143.27587 z",
        MT: "M 369.20952,56.969133 L 338.5352,54.1613 L 309.27465,50.60477 L 280.01411,46.563258 L 247.68201,41.228463 L 229.25272,37.833593 L 196.52907,30.900857 L 192.05005,52.248389 L 195.47939,59.79293 L 194.10765,64.365382 L 195.93663,68.937833 L 199.13736,70.309572 L 203.75818,81.079025 L 206.45328,84.255548 L 206.91052,85.398666 L 210.33986,86.541784 L 210.79711,88.599377 L 203.70981,106.20333 L 203.70981,108.71818 L 206.22466,111.91889 L 207.13914,111.91889 L 211.94021,108.9468 L 212.62609,107.80368 L 214.22645,108.48955 L 213.99782,113.74787 L 216.7413,126.32212 L 219.71339,128.83696 L 220.62787,129.52283 L 222.45686,131.80905 L 221.99961,135.2384 L 222.68548,138.66773 L 223.8286,139.58223 L 226.11482,137.296 L 228.85829,137.296 L 232.05901,138.89636 L 234.57386,137.98187 L 238.68907,137.98187 L 242.34702,139.58223 L 245.0905,139.12498 L 245.54774,136.15288 L 248.51983,135.46702 L 249.89157,136.83876 L 250.34882,140.03947 L 251.77469,140.87411 L 253.66164,129.83937 L 360.40731,143.26829 L 369.20952,56.969133 z",
        CO: "M 380.03242,320.96457 L 384.93566,234.63961 L 271.5471,221.99565 L 259.33328,309.93481 L 380.03242,320.96457 z",
        ID: "M 148.47881,176.48395 L 157.24968,141.26323 L 158.62142,137.03371 L 161.13626,131.08953 L 159.87884,128.8033 L 157.36398,128.91761 L 156.56381,127.88881 L 157.02106,126.7457 L 157.36398,123.65929 L 161.82213,118.17234 L 163.65111,117.7151 L 164.79422,116.57199 L 165.36578,113.37127 L 166.28026,112.68541 L 170.16685,106.85553 L 174.05344,102.5117 L 174.28206,98.739432 L 170.85272,96.110269 L 169.31717,91.709286 L 182.94208,28.367595 L 196.45967,30.895706 L 192.05159,52.278719 L 195.61194,59.764071 L 194.03083,64.424911 L 196.00068,69.066144 L 199.1389,70.321335 L 202.97424,79.877923 L 206.48693,84.315077 L 206.99418,85.458195 L 210.33513,86.601313 L 210.70398,88.698388 L 203.73297,106.07448 L 203.56779,108.64041 L 206.19891,111.96211 L 207.10399,111.91321 L 212.01528,108.88761 L 212.6927,107.79264 L 214.25501,108.4515 L 213.97657,113.80522 L 216.71582,126.38793 L 220.63365,129.56584 L 222.31483,131.73129 L 221.59822,135.81515 L 222.66444,138.62256 L 223.72607,139.71384 L 226.20536,137.36242 L 229.05352,137.41131 L 231.97277,138.74651 L 234.75279,138.06458 L 238.54705,137.9041 L 242.52595,139.50446 L 245.26943,139.2077 L 245.76617,136.17039 L 248.69876,135.40556 L 249.95893,136.92147 L 250.39986,139.86643 L 251.8242,141.07964 L 243.4382,194.6883 C 243.4382,194.6883 155.47221,177.98769 148.47881,176.48395 z",
        UT: "M 259.49836,310.10509 L 175.74933,298.23284 L 196.33694,185.69149 L 243.11725,194.43663 L 241.63245,205.06705 L 239.32083,218.23971 L 247.12852,219.16808 L 263.53504,220.97287 L 271.74601,221.82851 L 259.49836,310.10509 z",
        AZ: "M 144.9112,382.62909 L 142.28419,384.78742 L 141.96087,386.24237 L 142.44585,387.21233 L 161.36012,397.88192 L 173.48466,405.47996 L 188.19576,414.04797 L 205.00845,424.07092 L 217.29465,426.49583 L 242.24581,429.20074 L 259.50142,310.07367 L 175.76579,298.15642 L 172.6734,314.56888 L 171.06711,314.58419 L 169.35244,317.21335 L 166.83759,317.09903 L 165.58017,314.35556 L 162.8367,314.01263 L 161.9222,312.86952 L 161.00772,312.86952 L 160.09322,313.44108 L 158.14993,314.46988 L 158.03563,321.44286 L 157.80699,323.15753 L 157.23545,335.73177 L 155.7494,337.90368 L 155.17784,341.21871 L 157.92131,346.1341 L 159.17873,351.96398 L 159.97892,352.99278 L 161.00772,353.56434 L 160.8934,355.85056 L 159.29305,357.22229 L 155.86371,358.93696 L 153.92042,360.88026 L 152.43437,364.53821 L 151.86281,369.4536 L 149.00503,372.19707 L 146.94743,372.88294 L 147.08312,373.71282 L 146.62587,375.42749 L 147.08312,376.22767 L 150.74108,376.79921 L 150.16952,379.54269 L 148.68347,381.7146 L 144.9112,382.62909 z",
        NV: "M 196.39273,185.57552 L 172.75382,314.39827 L 170.92158,314.74742 L 169.34882,317.1536 L 166.97588,317.16429 L 165.50393,314.42082 L 162.88546,314.0424 L 162.11454,312.93477 L 161.07671,312.88073 L 158.29834,314.52502 L 157.98808,321.3105 L 157.62599,327.08767 L 157.27742,335.68048 L 155.83032,337.76964 L 153.3914,336.69561 L 84.311514,232.49442 L 103.30063,164.90951 L 196.39273,185.57552 z",
        OR: "M 148.72184,175.53153 L 157.57154,140.73002 L 158.62233,136.5005 L 160.9767,130.87727 L 160.36119,129.71439 L 157.84633,129.66821 L 156.56473,127.99751 L 157.02197,126.53344 L 157.52538,123.28656 L 161.98353,117.79961 L 163.81251,116.70046 L 164.95562,115.55735 L 166.44166,111.99172 L 170.48872,106.32232 L 174.05435,102.45992 L 174.28297,99.008606 L 171.01411,96.539924 L 169.2307,91.897299 L 156.56693,88.285329 L 141.47784,84.741679 L 126.04582,84.855985 L 125.58858,83.484256 L 120.10163,85.54186 L 115.64349,84.970301 L 113.24295,83.36994 L 111.98553,84.055815 L 107.29877,83.827183 L 105.5841,82.455454 L 100.32578,80.39785 L 99.525598,80.512166 L 95.181768,79.02611 L 93.238477,80.855093 L 87.065665,80.512166 L 81.121482,76.396957 L 81.807347,75.596777 L 82.035968,67.823604 L 79.749743,63.937027 L 75.634535,63.365468 L 74.94867,60.850621 L 72.594738,60.384056 L 66.796213,62.44284 L 64.532966,68.909258 L 61.299757,78.932207 L 58.066547,85.398626 L 53.055073,99.463087 L 46.588654,113.04256 L 38.505631,125.65208 L 36.565705,128.56197 L 35.757403,137.12997 L 36.143498,149.2102 L 148.72184,175.53153 z",
        WA: "M 102.07324,7.6117734 L 106.43807,9.0667177 L 116.1377,11.814946 L 124.7057,13.754871 L 144.7516,19.412988 L 167.70739,25.071104 L 182.93051,28.278277 L 169.29815,91.864088 L 156.85315,88.33877 L 141.34514,84.768091 L 126.11585,84.801329 L 125.66028,83.45663 L 120.06106,85.635923 L 115.46563,84.899179 L 113.31866,83.315125 L 112.00545,83.973101 L 107.26979,83.832858 L 105.57143,82.483225 L 100.30839,80.370922 L 99.573419,80.51784 L 95.184297,78.993392 L 93.290999,80.810771 L 87.025093,80.512038 L 81.099395,76.386336 L 81.878352,75.453573 L 81.999575,67.776121 L 79.717576,63.93642 L 75.602368,63.32938 L 74.924958,60.818764 L 72.649446,60.361832 L 69.094498,61.592408 L 66.831251,58.373161 L 67.154572,55.463272 L 69.9028,55.139951 L 71.519405,51.09844 L 68.932837,49.966816 L 69.094498,46.248625 L 73.459331,45.601984 L 70.711103,42.853756 L 69.256158,35.740695 L 69.9028,32.830807 L 69.9028,24.909444 L 68.124535,21.676234 L 70.387782,12.299927 L 72.489368,12.784908 L 74.914275,15.694797 L 77.662503,18.281364 L 80.895712,20.22129 L 85.422205,22.322876 L 88.493756,22.969518 L 91.403645,24.424462 L 94.798518,25.394425 L 97.061764,25.232765 L 97.061764,22.807857 L 98.355048,21.676234 L 100.45663,20.38295 L 100.77996,21.514574 L 101.10328,23.292839 L 98.840029,23.77782 L 98.516708,25.879406 L 100.29497,27.334351 L 101.4266,29.759258 L 102.07324,31.699183 L 103.52818,31.537523 L 103.68984,30.244239 L 102.71988,28.950955 L 102.2349,25.717746 L 103.0432,23.939481 L 102.39656,22.484537 L 102.39656,20.22129 L 104.17483,16.66476 L 103.0432,14.078192 L 100.61829,9.2283781 L 100.94162,8.4200758 L 102.07324,7.6117734 z M 92.616548,13.590738 L 94.637312,13.429078 L 95.122294,14.803197 L 96.658073,13.186582 L 99.002155,13.186582 L 99.810458,14.722361 L 98.274678,16.419801 L 98.92133,17.228114 L 98.193853,19.248875 L 96.819734,19.653021 C 96.819734,19.653021 95.930596,19.733857 95.930596,19.410536 C 95.930596,19.087215 97.385551,16.823958 97.385551,16.823958 L 95.688111,16.258141 L 95.36479,17.713095 L 94.637312,18.359737 L 93.10153,16.09648 L 92.616548,13.590738 z",
        CA: "M 144.69443,382.19813 L 148.63451,381.70951 L 150.12055,379.69807 L 150.66509,376.75698 L 147.11357,376.16686 L 146.5994,375.49864 L 147.0769,373.46633 L 146.91762,372.87666 L 148.84019,372.25707 L 151.88297,369.42439 L 152.46453,364.42929 L 153.84443,361.02718 L 155.78772,358.86092 L 159.30659,357.27125 L 160.96098,355.66642 L 161.02971,353.55758 L 160.03638,352.97757 L 159.01323,351.90484 L 157.85801,346.05639 L 155.17281,341.2263 L 155.73862,337.7213 L 153.31904,336.69199 L 84.257718,232.51359 L 103.15983,164.9121 L 36.079967,149.21414 L 34.573071,153.94738 L 34.41141,161.38376 L 29.238275,173.18497 L 26.166727,175.77154 L 25.843406,176.90316 L 24.06514,177.71147 L 22.610196,181.91464 L 21.801894,185.14785 L 24.550122,189.35102 L 26.166727,193.55419 L 27.29835,197.11072 L 26.975029,203.57714 L 25.196764,206.64869 L 24.550122,212.46847 L 23.580159,216.18666 L 25.358424,220.06651 L 28.106652,224.593 L 30.369899,229.44282 L 31.663182,233.48433 L 31.339862,236.71754 L 31.016541,237.20252 L 31.016541,239.3041 L 36.674657,245.60886 L 36.189676,248.03377 L 35.543034,250.29702 L 34.896392,252.23694 L 35.058052,260.48163 L 37.159638,264.19982 L 39.099564,266.78638 L 41.847792,267.27137 L 42.817755,270.01959 L 41.686132,273.57612 L 39.584545,275.19273 L 38.452922,275.19273 L 37.64462,279.07258 L 38.129601,281.98247 L 41.362811,286.3473 L 42.979415,291.6821 L 44.434359,296.37025 L 45.727643,299.4418 L 49.122513,305.26158 L 50.577457,307.84814 L 51.062439,310.75803 L 52.679043,311.72799 L 52.679043,314.1529 L 51.870741,316.09283 L 50.092476,323.20589 L 49.607494,325.14581 L 52.032402,327.89404 L 56.235574,328.37902 L 60.762067,330.15729 L 64.641918,332.25887 L 67.551807,332.25887 L 70.461695,335.33042 L 73.048262,340.18024 L 74.179886,342.44348 L 78.059737,344.54507 L 82.909551,345.35337 L 84.364495,347.45496 L 85.011137,350.68817 L 83.556193,351.33481 L 83.879514,352.30477 L 87.112725,353.11307 L 89.860953,353.27474 L 93.020842,351.58789 L 96.900696,355.79106 L 97.708998,358.05431 L 100.29557,362.25748 L 100.61889,365.49069 L 100.61889,374.867 L 101.10387,376.64526 L 111.12682,378.10021 L 130.84939,380.84843 L 144.69443,382.19813 z M 56.559218,338.48145 L 57.852506,340.01723 L 57.690846,341.31052 L 54.457625,341.22969 L 53.891811,340.01723 L 53.245167,338.56228 L 56.559218,338.48145 z M 58.49915,338.48145 L 59.711608,337.83481 L 63.268151,339.9364 L 66.339711,341.14885 L 65.450575,341.79551 L 60.924066,341.55301 L 59.307456,339.9364 L 58.49915,338.48145 z M 79.191764,358.28493 L 80.970029,360.62901 L 81.778342,361.59898 L 83.314121,362.16479 L 83.879928,360.70984 L 82.909965,358.93157 L 80.242562,356.91081 L 79.191764,357.07247 L 79.191764,358.28493 z M 77.736809,366.93379 L 79.515085,370.08618 L 80.727543,372.02612 L 79.272589,372.2686 L 77.979305,371.05615 C 77.979305,371.05615 77.251828,369.6012 77.251828,369.19704 C 77.251828,368.7929 77.251828,367.01462 77.251828,367.01462 L 77.736809,366.93379 z",
        NH: "m 880.79902,142.42476 0.869,-1.0765 1.09022,-3.29102 -2.54308,-0.91347 -0.48499,-3.07156 -3.87985,-1.13162 -0.32332,-2.74824 -7.27475,-23.44082 -4.60142,-14.542988 -0.89708,-0.0051 -0.64664,1.616605 -0.64664,-0.484981 -0.96997,-0.969963 -1.45494,1.939925 -0.0485,5.032054 0.31165,5.667218 1.93992,2.74824 0,4.04152 -3.7182,5.06278 -2.58657,1.13164 0,1.13162 1.13163,1.77827 0,8.56802 -0.80831,9.21467 -0.16166,4.84982 0.96997,1.2933 -0.16166,4.52649 -0.48499,1.77828 0.96881,0.70922 16.78767,-4.42455 2.17487,-0.60245 1.84357,-2.77333 3.60523,-1.61312 z",
        MA: "m 899.62349,173.25394 2.17192,-0.68588 0.45726,-1.71467 1.0288,0.11431 1.0288,2.28624 -1.25742,0.45724 -3.8866,0.11432 z m -9.37354,0.80018 2.28622,-2.62917 1.60037,0 1.82899,1.48605 -2.40054,1.0288 -2.17192,1.0288 z m -34.79913,-21.98819 17.64687,-4.64068 2.26326,-0.64664 1.91408,-2.79571 3.73677,-1.66331 2.88924,4.41284 -2.42491,5.17314 -0.32332,1.45494 1.93993,2.58657 1.13162,-0.8083 1.77827,0 2.26324,2.58656 3.87986,5.98144 3.55653,0.48498 2.26324,-0.96996 1.77827,-1.77827 -0.80831,-2.74822 -2.10158,-1.61661 -1.45495,0.8083 -0.96996,-1.29328 0.48498,-0.48498 2.10159,-0.16166 1.77826,0.8083 1.93993,2.42491 0.96996,2.90989 0.32332,2.4249 -4.20317,1.45495 -3.87985,1.93992 -3.87985,4.5265 -1.93993,1.45494 0,-0.96996 2.42491,-1.45495 0.48498,-1.77826 -0.8083,-3.07155 -2.90989,1.45494 -0.8083,1.45495 0.48498,2.26324 -2.06633,1.00043 -2.7472,-4.52713 -3.39488,-4.36484 -2.0705,-1.81247 -6.53327,1.8762 -5.09233,1.05079 -20.67516,4.59221 -0.66776,-4.76785 0.64664,-10.58877 4.28927,-0.88914 z",
        CT: "m 874.06831,178.86288 -3.67743,-14.87881 -4.71882,0.92031 -21.22878,4.74309 1.00019,3.22567 1.45495,7.27474 0.17678,8.96692 -1.22002,2.17487 1.92079,1.93234 4.27153,-3.90564 3.55653,-3.23321 1.93992,-2.10159 0.80831,0.64664 2.74822,-1.45494 5.17314,-1.13162 z",
        VT: "m 844.48416,154.05791 0.3167,-5.34563 -2.89071,-10.78417 -0.64664,-0.32332 -2.9099,-1.29329 0.8083,-2.90989 -0.8083,-2.10159 -2.70005,-4.63998 0.96997,-3.87986 -0.80831,-5.17315 -2.42491,-6.46644 -0.80557,-4.92251 26.41936,-6.73182 0.3087,5.52221 1.91626,2.74223 0,4.04152 -3.70715,5.05799 -2.58657,1.14267 -0.011,1.12057 1.30997,1.51912 -0.31093,8.09797 -0.60943,9.25886 -0.22795,5.55694 0.96996,1.29329 -0.16166,4.57069 -0.48498,1.68989 1.01418,0.72716 -7.43755,1.50671 -4.50174,0.72383 z",
        RI: "m 874.07001,178.89536 -3.69579,-14.95599 6.26928,-1.84514 2.19113,1.92712 3.30649,4.32065 2.6879,4.40209 -2.99934,1.62479 -1.29328,-0.16166 -1.13162,1.77827 -2.42491,1.93992 z",
        MD: "m 823.82217,261.44348 1.13162,2.50575 0.16166,1.77827 1.13163,1.8591 c 0,0 0.88914,-0.88914 0.88914,-1.21246 0,-0.32332 -0.72747,-3.07156 -0.72747,-3.07156 l -0.72748,-2.34409 z m 15.96958,-9.02872 -6.00855,1.20384 -5.1429,0.11746 -1.84356,-6.92233 -1.92481,-9.16932 -2.57262,-6.18845 -1.28838,-4.39833 -7.50602,1.62236 -14.87621,2.82332 -37.45143,7.5509 1.1313,5.01166 0.96996,5.65811 0.32332,-0.32332 2.1016,-2.4249 2.26324,-2.61766 2.42491,-0.61556 1.45496,-1.45495 1.77826,-2.58657 1.29328,0.64665 2.90989,-0.32333 2.58658,-2.10158 2.00689,-1.45327 1.84523,-0.48498 1.64435,1.12995 2.90989,1.45494 1.93992,1.77827 1.21246,1.53578 4.12235,1.69743 0,2.90989 5.49646,1.29329 1.14444,0.54198 1.4119,-2.02832 2.88197,1.97016 -1.27817,2.48193 -0.76527,3.98566 -1.77826,2.58657 0,2.10159 0.64664,1.77827 5.06395,1.35569 4.3111,-0.0617 3.07154,0.96997 2.10159,0.32332 0.96996,-2.10159 -1.45494,-2.10158 0,-1.77827 -2.42491,-2.10159 -2.10158,-5.49645 1.29328,-5.3348 -0.16166,-2.10158 -1.29328,-1.29329 c 0,0 1.45494,-1.6166 1.45494,-2.26324 0,-0.64665 0.48498,-2.10159 0.48498,-2.10159 l 1.93993,-1.29328 1.93992,-1.61661 0.48498,0.96997 -1.45494,1.6166 -1.29328,3.71819 0.32332,1.13162 1.77826,0.32332 0.48498,5.49646 -2.10158,0.96996 0.32332,3.55653 0.48498,-0.16166 1.13162,-1.93992 1.61661,1.77826 -1.61661,1.29329 -0.32332,3.39487 2.58657,3.39487 3.87985,0.48498 1.61661,-0.8083 3.23655,4.18293 1.35835,0.5363 6.65367,-2.79695 2.00758,-4.02387 -0.43596,-4.90798 z",
        NJ: "m 829.67942,188.46016 -2.32255,2.73427 0,3.07156 -1.93994,3.07155 -0.16166,1.61662 1.2933,1.29328 -0.16166,2.42492 -2.26326,1.13162 0.8083,2.74823 0.16166,1.13163 2.74824,0.32332 0.96996,2.58657 3.55654,2.42492 2.42491,1.6166 0,0.80831 -2.98321,2.69656 -1.61661,2.26324 -1.45495,2.74824 -2.26325,1.29328 -0.46245,1.60248 -0.2425,1.21246 -0.60923,2.60674 1.09227,2.24419 3.23321,2.90989 4.84981,2.26325 4.04151,0.64664 0.16166,1.45494 -0.8083,0.96996 0.32332,2.74823 0.8083,0 2.10159,-2.4249 0.8083,-4.84982 2.74823,-4.04151 3.07155,-6.46642 1.13162,-5.49645 -0.64664,-1.13163 -0.16166,-9.37631 -1.61661,-3.39486 -1.13162,0.8083 -2.74823,0.32332 -0.48498,-0.48498 1.13163,-0.96997 2.10158,-1.93992 0.0631,-1.09383 -0.38439,-3.43384 0.57337,-2.74824 -0.11747,-1.96901 -2.80754,-1.75035 -5.09214,-1.17576 -4.13744,-1.38163 -3.58563,-1.64569 z",
        DE: "m 825.6261,228.2791 0.36831,-2.14689 0.37507,-1.69105 -1.623,0.39776 -1.61546,0.46756 -2.20626,1.7643 1.72012,5.04288 2.26326,5.65812 2.10158,9.69965 1.61662,6.30478 5.01148,-0.16166 6.14212,-1.18068 -2.26423,-7.38627 -0.96997,0.48498 -3.55653,-2.4249 -1.77826,-4.68816 -1.93993,-3.55653 -3.14712,-2.87031 -0.86416,-2.09812 z",
        DC: "m 805.81945,250.84384 -1.85828,-1.82417 -1.23263,-0.68629 1.44301,-2.02247 2.88909,1.9485 z",
        PR: "m 591.3104,514.45329 c 0,0 1.01244,-2.52766 1.01244,-2.52766 0,0 2.02227,0.50569 2.02227,0.50569 0,0 2.02211,1.51648 2.02211,1.51648 0,0 8.59663,1.01102 8.59663,1.01102 0,0 8.59686,-0.50553 8.59686,-0.50553 0,0 3.54014,0 3.54014,0 0,0 3.03295,1.01125 3.03295,1.01125 0,0 2.02368,-1.51674 2.02368,-1.51674 0,0 2.5275,0 2.5275,0 0,0 6.06774,0.50549 6.06774,0.50549 0,0 6.06775,1.51666 6.06775,1.51666 0,0 2.02358,2.02349 2.02358,2.02349 0,0 3.53858,0 3.53858,0 0,0 0.50565,3.03458 0.50565,3.03458 0,0 -0.50565,2.0222 -0.50565,2.0222 0,0 -4.04397,0.50538 -4.04397,0.50538 0,0 -2.52912,1.01104 -2.52912,1.01104 0,0 -1.01243,2.52769 -1.01243,2.52769 0,0 -1.51666,2.52919 -1.51666,2.52919 0,0 -3.03319,1.51648 -3.03319,1.51648 0,0 -6.06921,0 -6.06921,0 0,0 -5.05508,0 -5.05508,0 0,0 -2.52773,-1.01109 -2.52773,-1.01109 0,0 0,0 0,0 0,0 -5.05665,0 -5.05665,0 0,0 -2.52905,-1.01102 -2.52905,-1.01102 0,0 -4.04569,1.01102 -4.04569,1.01102 0,0 -5.05659,0 -5.05659,0 0,0 -2.52766,-2.02214 -2.52766,-2.02214 0,0 -3.03449,1.01112 -3.03449,1.01112 0,0 -4.04565,0.50563 -4.04565,0.50563 0,0 -0.50554,-2.52919 -0.50554,-2.52919 0,0 1.01105,-1.51646 1.01105,-1.51646 0,0 1.01094,-2.52765 1.01094,-2.52765 0,0 -1.01094,-3.03449 -1.01094,-3.03449 0,0 -4.04425,-3.03476 -4.04425,-3.03476 0,0 1.51646,-1.01102 1.51646,-1.01102 0,0 3.03322,-1.51666 3.03322,-1.51666 z m 55.13077,13.66063 c 0,0 -2.19334,0.73109 -2.19334,0.73109 0,0 4.38682,1.46239 4.38682,1.46239 0,0 5.84939,-1.46239 5.84939,-1.46239 0,0 1.46223,-2.19335 1.46223,-2.19335 0,0 -3.65568,0.73123 -3.65568,0.73123 0,0 -5.84942,0.73103 -5.84942,0.73103 z m 10.23612,-5.11806 c 0,0 -1.82782,-1.09671 -1.82782,-1.09671 0,0 2.55916,-1.82785 2.55916,-1.82785 0,0 0.73109,1.82785 0.73109,1.82785 0,0 -1.46243,1.09671 -1.46243,1.09671 z",
        GU: "m 530.94989,516.36481 c 0.0459,0 0.0925,0 0.13837,0 0.47034,0 0.92239,0.1537 1.38356,0.23063 0.60557,0.10047 0.87459,0.82569 1.38353,1.03783 0.54364,0.2265 0.70107,0.69951 1.10687,1.03782 0.11827,0.098 0.23775,0.29721 0.27674,0.34592 0.79531,0.66285 -0.82965,1.29718 0.9685,0.92252 0.0405,-0.008 1.42414,0.52732 1.66026,0.57654 0.67978,0.14166 1.41406,0.12165 1.93697,0.23061 0.66059,0.13767 -0.66398,0.99145 -0.96851,1.49907 -0.287,0.47844 -0.13836,1.19505 -0.13836,1.72969 0,0.67389 -0.14602,1.06343 -0.27666,1.49905 -0.15781,0.52596 -0.50314,0.88062 -0.83019,1.15317 -0.34503,0.28756 -0.99024,0.58109 -1.5219,0.69188 -0.7089,0.14766 -0.65231,0.57654 -1.66026,0.57654 -0.482,0 -0.54753,1.14332 -0.69178,1.38377 -0.42088,0.70159 -1.24639,0.004 -1.52191,0.92249 -0.17885,0.59621 -0.5469,0.57116 -0.9685,0.92252 -0.39642,0.33039 -0.99265,0.52894 -1.38357,0.69183 -0.66909,0.27887 -1.0843,0.57656 -1.93697,0.57656 -0.33834,0 -0.98513,1.0179 -1.10684,1.15318 -0.40525,0.45031 -0.59479,0.72631 -0.96849,1.03777 -0.16514,0.13764 -1.3063,-0.10237 -1.79863,0 -0.072,0.0149 0,1.57352 0,1.72968 0,0.27144 -0.90312,0.69823 -0.96847,0.80722 -0.12613,0.21026 0.27667,1.36572 0.27667,1.72974 0,0.56668 -0.0189,1.21581 -0.13831,1.61434 -0.1587,0.529 -0.13616,1.15313 -0.83017,1.15313 -0.72581,0 0.40105,0.91082 0.55344,1.0378 0.24195,0.20163 0.1926,1.21865 0.27673,1.49906 0.2264,0.75484 -0.41507,1.01642 -0.41507,1.61438 0,0.0379 -1.11539,0.63782 -1.24524,0.69188 -0.39693,0.16541 -0.76335,0.63625 -1.10686,0.92252 -0.52923,0.44109 -0.64112,0.64971 -1.10683,1.03779 -0.45449,0.37882 -1.09755,0.34444 -1.79863,0.46126 -0.64177,0.10665 -1.18239,0.23065 -1.93693,0.23065 -0.42341,0 -0.98061,-0.70191 -1.24526,-0.92253 -0.59789,-0.49832 -0.78256,0.27396 -1.10683,-0.80717 -0.0309,-0.10221 -0.4489,-0.91994 -0.55343,-1.26847 -0.18693,-0.62323 -0.13551,-1.02834 -0.27669,-1.49907 -0.12321,-0.41064 -0.5388,-0.64305 -0.69179,-1.15313 -0.17685,-0.5895 -0.0907,-1.18839 -0.41505,-1.72965 -0.33314,-0.55528 -0.96851,-0.33992 -0.96851,-1.26845 0,-0.79052 0.37513,-0.8559 0.69175,-1.38371 0.21702,-0.36172 0.43878,-1.00155 0.55345,-1.38378 0.11536,-0.38464 0.60854,-1.01442 0.83015,-1.38381 0.0551,-0.0917 -0.13836,-0.46964 -0.13836,-0.69184 l -3.4589,-2.65221 c 0.6102,-1.01714 0.75782,-0.65058 1.79863,0 0.56661,0.35419 1.02561,0.36289 1.66027,0.23064 0.52211,-0.10874 0.49145,-1.38445 0.49145,-0.29498 0,0.80394 -0.18339,-0.12148 0.55779,-0.34593 1.27867,-0.3872 1.15717,-0.31668 0.0577,0.29494 -0.24659,0.13717 1.15805,0.51661 0.83009,-0.57656 -0.17184,-0.57311 -1.11131,0.0152 -0.83009,-0.92247 0.103,-0.34444 2.10861,0.0934 2.21372,0.11532 0.60022,0.12505 1.04156,-0.69188 1.6602,-0.69188 0.60143,0 1.35489,-0.23064 2.07537,-0.23064 0.5335,0 1.51312,-0.2576 1.93696,-0.34593 0.85234,-0.1776 1.22964,-0.22082 1.79861,-0.57659 0.39068,-0.24418 -0.24189,-1.49846 -0.27669,-1.61435 -0.17935,-0.598 1.91565,-0.003 1.93694,0 0.89338,0.14892 0.99403,-0.77671 1.10685,-1.15311 0.22419,-0.7472 0.34249,-0.9499 1.1069,-1.26848 0.84656,-0.35278 1.10687,-0.89237 1.10687,-1.61437 0,-1.08139 0.47837,-1.41705 0.69174,-2.30626 0.16182,-0.67451 -0.15843,-0.86177 0.41507,-1.49907 0.60521,-0.67251 1.03818,-0.92339 1.38349,-1.49902 0.31148,-0.51906 0.27683,-0.95524 0.27683,-1.6144 0,-0.60779 0.17109,-0.6646 -0.41512,-1.15316",
        VI: "m 678.26394,500.14111 c 0,0 -1.99322,1.49588 -1.99322,1.49588 0,0 -2.49072,1.49216 -2.49072,1.49216 0,0 0.49758,1.99345 0.49758,1.99345 0,0 2.49048,0.9949 2.49048,0.9949 0,0 3.48903,-0.49763 3.48903,-0.49763 0,0 1.49234,2.4923 1.49234,2.4923 0,0 2.49077,0 2.49077,0 0,0 1.49399,-1.49399 1.49399,-1.49399 0,0 5.48047,-0.99831 5.48047,-0.99831 0,0 2.489,-0.49727 2.489,-0.49727 0,0 1.99506,-1.49589 1.99506,-1.49589 0,0 -0.9968,-1.98972 -0.9968,-1.98972 0,0 -2.9881,0 -2.9881,0 0,0 -6.97605,-1.49588 -6.97605,-1.49588 0,0 -6.47383,0 -6.47383,0 z m 19.74007,1.91403 c 0,0 -0.38814,1.35522 -0.38814,1.35522 0,0 1.16515,0.67926 1.16515,0.67926 0,0 2.72369,-0.33899 2.72369,-0.33899 0,0 1.94529,1.01819 1.94529,1.01819 0,0 1.55512,-0.34052 1.55512,-0.34052 0,0 0.39011,-1.69727 0.39011,-1.69727 0,0 0,0 0,0 0,0 1.94355,-1.35538 1.94355,-1.35538 0,0 0.39009,-1.35682 0.39009,-1.35682 0,0 -1.557,-0.67767 -1.557,-0.67767 0,0 -2.33341,0.67767 -2.33341,0.67767 0,0 -2.72377,-1.01468 -2.72377,-1.01468 0,0 -1.16528,1.01468 -1.16528,1.01468 0,0 -0.38991,1.35682 -0.38991,1.35682 0,0 -1.55549,0.67949 -1.55549,0.67949 z m -7.24546,27.89155 c 0,0 3.55995,-0.89086 3.55995,-0.89086 0,0 2.22637,0.44622 2.22637,0.44622 0,0 3.11361,-1.77995 3.11361,-1.77995 0,0 1.33699,0.44443 1.33699,0.44443 0,0 0.88759,1.33552 0.88759,1.33552 0,0 1.33548,2.22621 1.33548,2.22621 0,0 2.66916,-1.33543 2.66916,-1.33543 0,0 1.33535,0.88908 1.33535,0.88908 0,0 5.83414,-0.80331 5.83414,-0.80331 0,0 0.66281,3.31725 0.66281,3.31725 0,0 -2.49072,1.04436 -2.49072,1.04436 0,0 -4.44919,0 -4.44919,0 0,0 -7.5662,2.22643 -7.5662,2.22643 0,0 -3.11377,-0.44298 -3.11377,-0.44298 0,0 -5.34157,0.88763 -5.34157,0.88763 0,0 -1.77826,-0.88763 -1.77826,-0.88763 0,0 -1.33553,0.88763 -1.33553,0.88763 0,0 -3.56156,0.44771 -3.56156,0.44771 0,0 -2.10068,-0.67917 -0.44467,-1.78315 2.66928,-1.77856 1.33546,-4.89394 1.33546,-4.89394 0,0 5.78456,-1.33522 5.78456,-1.33522 z",
        MP: "m 571.88095,524.61117 c 0,0 2.00224,-1.34163 2.00224,-1.34163 0,0 1.67772,-1.11366 1.67772,-1.11366 0,0 -3.67996,2.45529 -3.67996,2.45529 z m 0.149,10.35297 c 0,0 3.68288,3.68289 3.68288,3.68289 0,0 -0.32733,-3.48705 -0.32733,-3.48705 0,0 -3.35555,-0.19584 -3.35555,-0.19584 z m 8.58758,11.04579 c 0,0 2.45526,6.13522 2.45526,6.13522 0,0 0,0 0,0 0,0 2.45525,-6.13522 2.45525,-6.13522 0,0 -4.91051,0 -4.91051,0 z m 9.81812,12.27043 c 0,0 0,6.13526 0,6.13526 0,0 3.67997,1.22759 3.67997,1.22759 0,0 1.22763,-6.13519 1.22763,-6.13519 0,0 -4.9076,-1.22766 -4.9076,-1.22766 z m 16.10537,15.72245 c 0,0 -3.22108,5.74938 -3.22108,5.74938 0,0 1.07269,3.452 1.07269,3.452 0,0 5.36945,2.30037 5.36945,2.30037 0,0 2.1483,-3.45201 2.1483,-3.45201 0,0 0,-5.75233 0,-5.75233 0,0 -5.36936,-2.29741 -5.36936,-2.29741 z"
    },
    names: {
        AL: "Alabama",
        AK: "Alaska",
        AS: "American Samoa",
        AZ: "Arizona",
        AR: "Arkansas",
        CA: "California",
        CO: "Colorado",
        CT: "Connecticut",
        DE: "Delaware",
        DC: "District Of Columbia",
        FM: "Federated States Of Micronesia",
        FL: "Florida",
        GA: "Georgia",
        GU: "Guam",
        HI: "Hawaii",
        ID: "Idaho",
        IL: "Illinois",
        IN: "Indiana",
        IA: "Iowa",
        KS: "Kansas",
        KY: "Kentucky",
        LA: "Louisiana",
        ME: "Maine",
        MH: "Marshall Islands",
        MD: "Maryland",
        MA: "Massachusetts",
        MI: "Michigan",
        MN: "Minnesota",
        MS: "Mississippi",
        MO: "Missouri",
        MT: "Montana",
        NE: "Nebraska",
        NV: "Nevada",
        NH: "New Hampshire",
        NJ: "New Jersey",
        NM: "New Mexico",
        NY: "New York",
        NC: "North Carolina",
        ND: "North Dakota",
        MP: "Northern Mariana Islands",
        OH: "Ohio",
        OK: "Oklahoma",
        OR: "Oregon",
        PW: "Palau",
        PA: "Pennsylvania",
        PR: "Puerto Rico",
        RI: "Rhode Island",
        SC: "South Carolina",
        SD: "South Dakota",
        TN: "Tennessee",
        TX: "Texas",
        UT: "Utah",
        VT: "Vermont",
        VI: "Virgin Islands",
        VA: "Virginia",
        WA: "Washington",
        WV: "West Virginia",
        WI: "Wisconsin",
        WY: "Wyoming",
        'VI,': "Virgin Islands",
        'GU,': "Guam",
        'PR,': "Puerto Rico",
        'MP,': "Northern Mariana Islands"
    },
    default_labels: {
        NH: {
            parent_id: "NH",
            x: "932",
            y: "183",
            pill: "yes",
            width: 45,
            display: "all"
        },
        VT: {
            parent_id: "VT",
            x: "883",
            y: "243",
            pill: "yes",
            width: 45,
            display: "all"
        },
        RI: {
            parent_id: "RI",
            x: "932",
            y: "273",
            pill: "yes",
            width: 45,
            display: "all"
        },
        NJ: {
            parent_id: "NJ",
            x: "883",
            y: "273",
            pill: "yes",
            width: 45,
            display: "all"
        },
        DE: {
            parent_id: "DE",
            x: "883",
            y: "303",
            pill: "yes",
            width: 45,
            display: "all"
        },
        MD: {
            parent_id: "MD",
            x: "932",
            y: "303",
            pill: "yes",
            width: 45,
            display: "all"
        },
        DC: {
            parent_id: "DC",
            x: "884",
            y: "332",
            pill: "yes",
            width: 45,
            display: "all"
        },
        MA: {
            parent_id: "MA",
            x: "932",
            y: "213",
            pill: "yes",
            width: 45,
            display: "all"
        },
        CT: {
            parent_id: "CT",
            x: "932",
            y: "243",
            pill: "yes",
            width: 45,
            display: "all"
        },
        HI: {
            parent_id: "HI",
            x: 305,
            y: 565
        },
        AK: {
            parent_id: "AK",
            x: "113",
            y: "495"
        },
        FL: {
            parent_id: "FL",
            x: "773",
            y: "510"
        },
        ME: {
            parent_id: "ME",
            x: "893",
            y: "85"
        },
        NY: {
            parent_id: "NY",
            x: "815",
            y: "158"
        },
        PA: {
            parent_id: "PA",
            x: "786",
            y: "210"
        },
        VA: {
            parent_id: "VA",
            x: "790",
            y: "282"
        },
        WV: {
            parent_id: "WV",
            x: "744",
            y: "270"
        },
        OH: {
            parent_id: "OH",
            x: "700",
            y: "240"
        },
        IN: {
            parent_id: "IN",
            x: "645",
            y: "250"
        },
        IL: {
            parent_id: "IL",
            x: "595",
            y: "250"
        },
        WI: {
            parent_id: "WI",
            x: "575",
            y: "155"
        },
        NC: {
            parent_id: "NC",
            x: "784",
            y: "326"
        },
        TN: {
            parent_id: "TN",
            x: "655",
            y: "340"
        },
        AR: {
            parent_id: "AR",
            x: "545",
            y: "368"
        },
        MO: {
            parent_id: "MO",
            x: "545",
            y: "293"
        },
        GA: {
            parent_id: "GA",
            x: "718",
            y: "405"
        },
        SC: {
            parent_id: "SC",
            x: "760",
            y: "371"
        },
        KY: {
            parent_id: "KY",
            x: "680",
            y: "300"
        },
        AL: {
            parent_id: "AL",
            x: "655",
            y: "405"
        },
        LA: {
            parent_id: "LA",
            x: "550",
            y: "435"
        },
        MS: {
            parent_id: "MS",
            x: "605",
            y: "405"
        },
        IA: {
            parent_id: "IA",
            x: "525",
            y: "210"
        },
        MN: {
            parent_id: "MN",
            x: "506",
            y: "124"
        },
        OK: {
            parent_id: "OK",
            x: "460",
            y: "360"
        },
        TX: {
            parent_id: "TX",
            x: "425",
            y: "435"
        },
        NM: {
            parent_id: "NM",
            x: "305",
            y: "365"
        },
        KS: {
            parent_id: "KS",
            x: "445",
            y: "290"
        },
        NE: {
            parent_id: "NE",
            x: "420",
            y: "225"
        },
        SD: {
            parent_id: "SD",
            x: "413",
            y: "160"
        },
        ND: {
            parent_id: "ND",
            x: "416",
            y: "96"
        },
        WY: {
            parent_id: "WY",
            x: "300",
            y: "180"
        },
        MT: {
            parent_id: "MT",
            x: "280",
            y: "95"
        },
        CO: {
            parent_id: "CO",
            x: "320",
            y: "275"
        },
        UT: {
            parent_id: "UT",
            x: "223",
            y: "260"
        },
        AZ: {
            parent_id: "AZ",
            x: "205",
            y: "360"
        },
        NV: {
            parent_id: "NV",
            x: "140",
            y: "235"
        },
        OR: {
            parent_id: "OR",
            x: "100",
            y: "120"
        },
        WA: {
            parent_id: "WA",
            x: "130",
            y: "55"
        },
        ID: {
            parent_id: "ID",
            x: "195",
            y: "150"
        },
        CA: {
            parent_id: "CA",
            x: "79",
            y: "285"
        },
        MI: {
            parent_id: "MI",
            x: "663",
            y: "185"
        },
        PR: {
            parent_id: "PR",
            x: "620",
            y: "545"
        },
        GU: {
            parent_id: "GU",
            x: "550",
            y: "540"
        },
        VI: {
            parent_id: "VI",
            x: "680",
            y: "519"
        },
        MP: {
            parent_id: "MP",
            x: "570",
            y: "575"
        }
    }
};

//Map logic - do not edit
eval((function (x) {
    var d = "";
    var p = 0;
    while (p < x.length) {
        if (x.charAt(p) != "`") d += x.charAt(p++);
        else {
            var l = x.charCodeAt(p + 3) - 28;
            if (l > 4) d += d.substr(d.length - x.charCodeAt(p + 1) * 96 - x.charCodeAt(p + 2) + 3104 - l, l);
            else d += "`";
            p += 4
        }
    }
    return d
})("var create_simplemaps_usmap = function () {var map_name = ` ?,_mapinfo.` <$;var demo = true;Raphael.fn.print_path` y)x, y, string, font, size`!7#` P\"text = this` b\"` >5, \"middle\")`!H!actual`!/$` d&.attrs.path.toS` c!(` M\"bb = `!q$pathBBox(` ^');` ]'remove` T#dx = x - bb.x ` \"!width / 2` ;\"y = y` 4\"y` ;\"height` 9%transforma`\"{!= \"t\" + dx + \",` &!y` D!result`!`'` Q%Path`!d(,` f+);return` \\#`\"T(};`$1%isDescendant(parent, child`$4#node =` -\".` ;\"Node;while (` :!!= null) {if` ,#== ` G\") {`!A#`%f!}` i#node` c(}` >#false;}`!W%set_responsive_handler() {` :%resize(`!$!size_paper();}`#:#izeTimer`\"L&detec` t!` S#clearTimeout(` H');` \"' = set` 8*, 300);}if (window.addEventListener) {` #3(\"` _\"\",`)C*`!P+;},`\"r\");` P5orient`%4!chang` IG} else`![&ttach` z!`!&V` X(` Xif (vml) {document.body.on` H\"`,[,` Z&;}`%{&findPos(obj`'O#curleft = curtop = 0;if (obj.offsetP`'7$do {` H$+= ` 8&Left;` Y#` ,)Top;} `(;#obj ` 1(` q#`)V$[` t#,`!C#]`!m(distance(xy0, xy1`!x#x0 = xy0.x`+ !y` '$`+.\"x1` *!1` 6$` '$` 8\"`,X\"1 - x0`,C'1 - y0`!N$Math.sqrt(dy * dy`,7\"* dx)`)S'`0z#bbox_state(auto`/H)`/7\" = \"`0m'\" +`1(&+ \"map.`0~$` c!` m\"array={\"`!b!` (, = {};for (` 6! in ` \\$paths`!?$ath_to_add =` 4*[` T!];` 5*`.B$`.1!ToAbsolute(` ;'`0\\#`.l(`0Z%` 6-x =`#J\"round(bt.x` 3\"y` (-y` 2#2` (.2` f#` ).x2`1c$`#e#+= \"'\" +`#-\" +` '#\":{x: \" + `1 \"y:\" + y` '!x2` (!x2` 4\"` (\"y` )!},\";`#l,`#2# = bt;}`$z+` #(.sub` $\"(0,` ,*length - 1`!l/};\"`)J!!`&)#console.log(` A()`0P%`!S,`+6\"typeof Object.`')\" !== \"`'<$\") {` 1*`+G(o`0}(F() {}F.prototype = o`(J$new F;}`!1\"!Array` ?&.forEach) {` #3`!))fn, scope) {`'\\!var i = 0, len = this`#;#; i < len; ++i) {fn.call(` ]!,` F![i], i` &\");}}`)x'linePath(startX, ` #!Y, endX, endY`(b#` 4! = {x:` D$y` $\"Y}`&w!end` 9\"` U\"y:endY}`\"y$\"M`&l#rt.`&\\!`&f!` *\"`&`! L\" + end` 4'end.y`4c\"isMobile = {Android:`/m+`$#\"avigator.userAgent.match(/` P#/i`0!BlackBerry` 8L` P&` d#iOS` 4LiPhone|iPad|iPo`!M$Opera` <L` P! Mini` _#W`4\"!s` 8LIE`#]\"` _#an`\"d2`$\"$.`#I#() ||` ,&`\"t&` *+iOS` #+`!t!` %+`!u#(`'#!`!6%is_touch`!30any()`%^#gnore_pos`3K!rent_viewbox, responsive, directory, div, initial_zoom, ` \"(_solo, regions, tooltip_manual, last_clicked` 4&up`!r&get_map_info() {div`1E!in_settings.` /!= undefined ?`2q!\" :` 7.;`!S(` Y-` /*` e*-1` _-` C(` l)`\"S!` a9` ;#= \"yes\" ? true : false;`#d&` T-width` T!` ;&` O-if (` 5&) {set_` '&_handler();}zooming_on` z-`\"^$\"no\" ?` u\" :`!%!;`$l#` O!pinfo.default_` 2$&& ` q'?` /5`!h(simplemaps_usmap_mapdata.` F#`'<!`!1$` -<`0i\"` -5labels) {` #\"` U8` <\";}`'1* =`!s#`':(` ,%`'C&` *%`(w&` *%`)4!back_image, ` \"!s_`(v)` \"%`#<#` $!data, locat`(v\"`4_\"specific,`$^*, getxy, normalizing_factor`)\"&preload() {` o%`\"Z9` =$;`!.*` 88` <*;`\"+#` ;3info;` S#` Z7;`\"7!` -0` 4!;`\"])`!A8` <)`42!scripts = document.getElementsByTagName(\"` C\"\")` Q!mysr`\"a!` X\"[` _#.length - 1].src;`%/&`)+-` 0'!`)9%` *5`([%`%o+`+q.` 1,!= \"`)K#` p.` =-`! $` u(` 4-?`'4- :`\"m\".substring(0,` ,#lastIndexOf(\"/`$+!.js\") + 1) +`/E!`\"@\"s/\";`'-.`+w'calibrate`-^#/ 750`(}\"`.N!time, order_number,` 3\"percent`);\"`.~#back, link_text` D\"`,g\", fade` h#hide_eastern_`+#\", `++\",`3K$`-+$`+A#var adjacent_opacity` 0!op` \"&incr`&A!al` +!` W!_size` $'color` %'` U(new_tab` '!`!8%`)k#` <)hook`!O\"b`\"v\"` |%popup` z'` *\"` P(` ,\"shadow` F)rner` o\"` ,\"nocs` $(font`+p&g`1Z!freshable_info() {`!$#`()1ground_transparent`3C(0 : 1;`#+&` R-` 0'`'g,` 0': 22` _#`\"b!` P3` 6\"` R2` 6\": \"white\";`$1#` Y-url_` 3%`!&tru`*6&`$P4`!E.` 1,`!K-` 1,: 1;`%E!` [-js_` 2#`!?3`%l'`$8.` 1'`,P-` 1': 1.5;`&F'` Y-` 0(` Z,` 0(`#`&`'\")` Y3`\"h4` 0*: 0.9` i#`'g\"` X3` 6#> -1` \\3` ;#: 1`\"E%`(G!`\"75` 8\"`\":4` 8\": `#4$`)#!` U3` 5#`$O3`)N&` H3` 6!`!22` 6!: \"12px/1.5 Verdana, Arial, Helvetica, sans-serif\";`,z'`!$-`.u!out_` :'ly`!z!`2h\"`!r! :`\"!!;`. ,` ^-` 0-`!z,` 0-: 0.3;`0Q%`!K2` 5!` [,` 0&: 0.5;`0F%` S-` 0&` T,` 0&* 1000 : 200`,&\"`${\"pdata`+_\"s;`1k(` u-` 0)&&` \"8!`#V%` *7`%k$`2I/`!+-` /1`&L3`3e%`,^.` 1%`,X-` 1%: \"Link\";back_imag`+|/` 1&`\"24` 8'`!P$`,B\"numbe`,&.` 0)` ],` 0)` g$`%Z!percent`!Q0` 0,`&*1` 5'`,9!9;}var vml`3a!tough` %!i`4f\"io`3y\"on_click`4!'off =`!U#var reload` &)touch`4B*client`4B%vml = Raphael.type`%\"!VML`$v-ie = document.all` 0-os = isMobile.iOS()` 4,`!M!` A!_` &!` 0.if (`,<-_up`&Z\"`\"`$\" ||`#R*` :!detect` 8!` x&) {` O$ =`+r\"} else` +)`!8\"}` ~=hover\"` f*` 6Bff\") {`$Q(`!G!` V.`%N!map_outer`$e!map_inn` $&div`$o&create_dom_structure() {` B\"`$K(getEl`.r!ById(div);`!!%` +: + \"` B\"\") ?` W8` =)`$p$`!y%` c?` C!` aA` B$`%p*`\")#`\"Y%.removeChild` 4';` '3` p!)`(\\\"t_to_del`![7\"tt_sm\")`!8!` H%) {` #%.parentNode`! )` C&;}}`#r1`$t\"`!'#(\"div\"`$K\"`#:-` 15` o!.id = `$.*` ^&` 0*`#N\"` 3'style.posi`&I!= \"relative` @\"` |\"` 4.absolut` 3/zIndex = \"1` 8!div.append`$,4` .,`$=#`(F!widt`-p\"height` &!scal`-R#atio` %!x_` ,&y_` \"&original_location` (*` v&` *%`!\"#`)1-imensions() {` S!`07-` /#= undefined ? 800 :` 50`&0!responsive` i)`\"t!offsetW` G!` 3$` \"\"* 1`#6$`#p\"` 1*+ \"px\";}` C.`\"K*`!%\"info.calibrat` d#` ?&`\"i\"` 51` 4#?` R/` 4#:` h4 /` '/`$h\"` ;!_to`!0&`!f+/`$;-` A%` 9$` U+;`%W#`!q1x_adjust;`%p#` 01y` =$`%- = {x:0, y:0, w:`!6!, h:`!5\", r:`\"3!}`%*!!resizing) {` 2! = 1;`!0$`\"/-`$&\"transform = \"s\" +`'|\" + \",\" ` \"(0,0,t\" +`('$` :%`(+$`1;\"pap`1(#all_visible_states` 2!`\"5$_label` .\"` ?(` ,'`!T%` )!background` K%pil` W'` z'all_region` &&`!1$` ''`! 'op` '$`)N,canva`)U!`\"7! = Raphael`+H&,`#Y\",`+C#);` E!.setViewBox(0, 0` 5-`\"(& =`#3\".rect(-1000 *`#w\", -1` \")5` 0)3` #'` f(.hide();`\"o&` {%set` 2#`$1*` ./`#=#` '/`#E%` (0`#D!` *+`%)+`!37` ,1`$7&` G/`%C!` )+}`$_%is_licensed() {if (demo == false || !order_number) {return`0C\"fla`+%!` 7&.substr(0, 3)`02\"ear` .33, 2` ?\"mon`-T!` 205` =%day` -37` 9's` Q49, 1` ?\"leng` ~.` 0\"`+-!`\"4!= \"FLA\" && 10 <`\"$\"< 19 &&`!k#< 13 &&`!U!< 32` &\"s`1J!\"-` V!`!$$= 20) {`#Z\"`#Y\";} else {console.log(\"Order `!N\" is not recognized.  Please contact support@simplemaps.com for help.\")`+z#trial_`+}&map_` /!`*(-` D\"text`%O$!demo`%3'if (`'0$.hostname.match(\"`!<*\")`\"G,` ]$`!8% = document.getElementById(div + \"` B\"\") ? ` \"D:`!'#if `,+!`!$\"&& isDescendant`,>(` <%)) {` /%.removeChild` ^&)`!g3`#;\"`!P#(\"div\");` A%.id = `![*` 3'style.posi`2=#\"absolute\"`.t\" = 0.1` '!h = 30` &!w = 200` X-lef`45&- w + \"px` .top =`.T# - h` 04zIndex = \"1` 7\"`\"z\"append`\"o-`&C'`0*+` 5!, w - 5, h`)M\"text =`&x(.`&[!` >$ * 0.5, \"S`'Y*T`%(\";text.attr({'text-anchor':\"end\", 'font-size':18` ($w`\"P!':\"bold\", cursor:\"pointer` O%family':\"a`!w!sans-serif\", href:\"http://`'l+}`!R#click(`(~%() {window.`([&ref = ` R3;})`.M\"`\"v!_back`#2!back_arrow`)t-` 6!button() {` @&`0 +`%{$35`&/&5`(Q!` N!image) {var ` '!`28%`'F!rectory +`!E\"` =!` c!img = new I` /!img.onload = `\"\\* = img.`'$!;h` '#`&j\";make`!q\"();}` a!src` ?!`!@(`.\"%` B*` %` +( {`#;&`&l+outer, w`&r!`\"N1`#=&`#?*` i!.` E!(`!M*, 0, 0` m$` P,`'-#`&I,}` 7/reg_num = -1` 3'.push`!c\"` C')`\"i%`+5!` 4!pa`2P!\"m503.7,743.8c190.3-96.6 132.9-417.05-155.6-409.71v-128.7l-228.1,195.0 ` &\"205.8v-131.6c240.9-5.5 229.9,202.8 ` e!,269.3z`,b#`!J!color = main_settings.` 0(? ` \"6: \"#3B729F` c-_bo`3?!` `7` ;$` g7` ;$: \"#88A4BC` }(size`.j!0`(Q\"`#u'box`%H*rect(`%:'`%-#fill:\"black\", opacity:0`+t.}`)_\"`&=:path(`$~&` }$stroke:`\"&., '` 6\"-`)3!':2` (&`!E#':1, `!a!` T', 'fill` 7)`!_..scale`!I#size,`#-', -2, -6`':F_box`'PL` '7box);}if (!initial`#?!`-Y).hide();}` ('`/A\"` ,!` &!);}`.p!cattr, la` \"!r` (\"region_map, label_attributes`/#&set` -'() {` h! = [];` l!` %\"` p!` $#` p%` >$` o*` 0\"var default_` L\" = {};` &*.`)=$false` -,hover`)_%` .1`%@#`({-`!^#` 7$`(x,` 0+: 1`!&2` `;` 7*` n3` 7*: 0.6` },url`\")4descrip`2J#` .1inactive` (4zoomable = tru` .-cascade`\",4` 8#_all == \"yes\" ?` e! :` w6_percentage = ` #+;for (var`&# in` ##s) {` 4%i = 0; i <` 6$[` \"\"].states.length; i++`2z#` 4! =` :3[i`'4([` 0!]` E%;}}`!2&d`!G*`'|![id] = Object.create(`\"O*`4R\"`!6$id].url` T(`$#(`#8\"`!+&prop`!,'[id]) {` b+[prop] != \"`!4#\"` t(` 8#`\"X&` +%`+m\"` X.`$n$` Q1`%m!` >7no` B2`\"4#`#A-mapinfo`0K!s`$M#`#:$`$T$`*|'` .!`*}%`&s*` 7!`*y\"` A+`++*` B0` 7'` M+image_sourc`(`.` =\"`)F*` k0` 7'` M+`*E\"` @0url`!;,`*/&` C*all` =\"s_` :&`)=;`\"s#i`*7/` d'hidden` BG_`/z!`\"r3`#`\"bord`#v5` 0/`-x,` 0/`!93` =(siz`\"8.` 0.` p9` =!` v2`,b>` >.`*O#`#d5` :&`#h3`-h&_id`*:%`,f!id] ?` 5$` )$` P$`)u&_id && `)j\"` *%]`/}$`+f$` .-olor) {`)A2` 92`+/#` ,,`)/'` `-`)j*` ?8` f3`)-'` l-`)h*` ?8` f3`/C\"`){0` 70` N3`)h$` Y-`*B'` <5`#;4i`$U!`*51` 81;}}c`1o=` b!`2)\"map_nam`&s\"us\" && (id` *!GU\" || ` '#PR` \"(VI` \"(MP\")) {`!1%`![$`'f!`\"5\"` u1`+b!eastern`+i\"s)`!6(VT` z(NJ` \"(DE` 0(DC` =)H`!Q)A` \"(C` g)R`!z*D`!u/`-?%`\"'#`2N%prop in `/_\"specific[id]`)&#` '.`3>#!= \"`$&#\"`!$(`3[%` B4`#F\"` _5`+V$` _1tru`&@#` C9no` I2`+j\"}}}var `&\"$`\"s${}`-L%` .!.font_family`-G-` =!_font`.s-` 0': \"arial,sans-serif\"` v+`1\"2` ^\"`0{2` 0(: \"white` f,`,=*` L0` 6(` l2` 6(:`# *`-|#` &*`2,#` W\"siz`0z&`!M#`(j\"`2\"+`&t%s`0_5` Y*line`$b%` ).`\"89` 6'`\">2` 6': \"black`#K,parent_typ`*y!`&c!` -3`2a!`!U0display = \"all\",`#O+anch`!k5` 6#`!j2` 6#: \"middl`!G.ill`!=3pill_width`!(-` 0'`!',` 0'`$92x` x3y`!03`.9\" \"Not Named`!s,`\"};`#[5preset` 4%`*Q-s`\"R!pinfo.` +*;`-e%id in` H+) {`#u#ttributes`1\\9` H!);` @0`!Z&`-#!`.t-`!+*`.z'` '.`.o2`!!0`-T%` M4`.J\"` j5`/%'` b9`/1&` N9`/5\"` M9`/=%`$)+`$'%if (!` O0`#uS`2}.`#q-`#=Y`#\\2`#'_`#!]`(9)ocation`2|+` /#`1q4` 8#`.>4` 1*: \"#FF0067`*K'` y$`1w9` `$`1z9` 10`,E-`!'$borde` o7` 9#` l5` 9#: 1.5` f4`!n<` 9)` k;`#6)FFFF`#*5`!z<` 9)`#&;`\"=%2` |.size` l6siz`#c/descrip`&A#` D3` :'` P.url` @6url` @.inactiv`!Z.all` =%s_` =&`)A# ?`)&!`%i6typ`\"F7typ` A/image_sourc` A7` 9)`$*5` 9): \"`%>0id`\"8<` >!` t,` 0/:`+V!`4%'` |$opacity`0w(`!Z$` 4#`&r4` P&`&H9` ?$`&m;` ?$`$75overwrite`#3#`-''` ;3x`-d%` *-y` ;7_adjust = 10` G/_` \"9font`(Y! = 14`(P/isplay = \"all`$[Uden`'Q5`4Y)`'`*= undefined) {`'{4\"square\"`3P'`4]#`!;$`1^!ttr`4\":` G#);`40.` a$`4:'` 7!== \"region`2a\"` }#`#+(` 8#`3=#` ](`2{#!= \"`!=#` X)`38%` B/` T6`#^$` U1`4b'` D3`4h$` J,`4]$if (!`\">&`')`\"U)`)$,` 0&`)_$` V2`14!` W/`25$` .&` -!;}}}var currently_zooming`!k%var tooltip` '!curtop;func`)J!`%@\"_` <#() {` 2%findPos(obj) {` V#left =` `# = 0`'<!obj.offsetParent) {do {` H$+= ` 8&Left;` Y#` ,)Top;} while` m! ` 1(` q#;return [` t#,`!C#];`\"c\"find_pos =`!v%map_inner)`\"\\!x0_page` :#_pos[0]` 5!y` (.1` 4\"x0`\"E!` ?\"` \"%h` ,%x_mid` 9\"_` \"$id = \"tt\"`#|#p = 5` '!`#<#` '\"maxw = 40` d\"speed`,H!` *#timer = 2` )\"endalpha`!2%al` \"(tt, t, c, b, h`#%${`$\":`$q%() {tt = documen`*e$Element(\"div\");tt.setAttribute(\"id\", id + \"_sm` ;#tyle.posi`/X#\"absolute\"` 5&`*f'none\";`$,%.appendChild(tt)`&)\"n_click) {` ?&on` /! = `!~&e`,'#ignore_pos) {`\"P\";} else {`'T#.pos(e` o-` P&`*x%}}` S%`!2(mousemove = this.pos;tt` \"4}}, show`#k'v, w`-w$opup_off`!e'`!>)`03&tt == null)`\"#&`/6#);}`#P0block`#z!`!x!HTML = v;h = parseInt(tt`(t#Height, 10);clearInterval(tt.`&[!`%$!`&b$set` 8%`&$*`!U#fade(1);},`'8\"` %!reset_pos`\"e'x, y`\"i#`\"?\"`2C(`\"7/` +#` b#(y0 + y, x0 + x`!!!` r*`%V$`#d% ||`-E$_manual || `%h1var u = ie ? ev`(?!lientY +`(M&`(X$`(R#.scrollTop : e.pageY;u = u -`+W$`*]\"` f0X` X>Left` r%X;l = l -`,l$;`\"r,u, l`\"s!`#j.` 6!`/P\"qua`+n!;`,b! =`#K\"0.5 * width;`,q! = `#m!` 3\"h`%p!`&-!`%z+`'0!l >`-P\" && u >`-S\") {`!&#4`({$` G\"<` 093` ?*` m)<` =,2` _7` <-1`4!\"` (\"= 1`-S!`(i#`/-\"u + 7 + \"px`,e'`/<#l +`/H\"` 9'`!3'` o$2` a25` ]6-`#K&Width -` D&` n/3` m0- h - 3`!Y?` ;%`-j%` V24`!DI` E%}}, fad`14(d`-,7`21! =`24\"`&(!a !=`2P&&& `$G\" || ` 6!0` +%-1`'M#i =`3F\"` \\!` S%- a <`3^#` _%) {i ` v'- a`#Y(` /\"` F,`!%!i = a;}`3|$a + i * d`\"w&opacity`\"&%` 0%filt`.*!\"` 4!(` B#=\" +` E\" + \")`$)&`.a4if (`!G&`3W6}}}, hi`#y)`.R&!`.N*`/=e-`/y*find`28$indPos(`3Y%`\"%\"` :$) {`,n#` E#_pos[0];`-#` *(1]`4N\"`!>%set_tt_css() {` .%newStyle(str`%`#pa =`.J&ge`.G$sByTagName(\"head\")[0]`/5!el` F(`1W\"` N#(\"`#w!\");el.type = \"text/css\";el.media = \"screen\"`&w\"l`$N\"Sheet) {` #).cssText = str`%E%el.appendChild(`!A+TextNod`\"C\");}pa` A)el);`)'\" el`#,'getsupportedprop(proparray`#'#root`\"R(`1U+;for (`)6$0; i < ` [%.length; i++`*V$` 4$[i] in` {!`\"V\"`!*#answ`&I!` >(;` -%` #\".replace(\"borderRadius\", ` )#-r` +\")` ?6MozB` M+-moz-` 8EWebkit` S-w` 2!` =FboxShadow`!x\"x-s` (\"`![<` K'`!q#` 7@`!m$` R(`!i%` V'`%e#` Y\";}}`.}!round`\"3\"pr`0A!`%n-[`$ -`#U/`#'/])`)%!rcss =` x-?`!*-+ \": \" + `0h\"corners`18\";\" : \"\"` l!`\"+\"`!R8`\"_'`#H,`\"},`!^#s`!_\"` p'?` |(`!R%3 *`!X#` 8\"`!X\"`!q!3 ` \"54` %2rgba(0,0,0,.5)`\";$`3F&` F#< 0.01) {`!^#\"\"`3W\"m` (##tt_sm{\" +`#f\"+`\"(\"+ \"z-index: 1000000; backg`#t!-color`#c*lor + \"; padding: 7px; `2-#:` A&`2g$` H!font` \\(font` 4\"` |#black} #tt_name_sm{float: left` [\"-weight: bold` F\"custom` =-`20!: both; margin: 0px`!k'0px;}`%g\"css1`# !xmark` b'right` R+cursor: pointer` Y'2` O1`!K\"` V)` '\"-left: 5` ^3if (!vml`-X#str =`!d\"+`$q!`07%` 4&`%(!+`!F!;}`2U)`/l*_zooming_dimensions(e`/R\"`!'#gotoX = ` /$.sm.bbox.x + x_scale) * ` $!`\"[!gotoY` >0y + y` :4W = ` A,width` 9-H` 7/h`%J!` >)actualWH` (!paperW` j!= original_` n.` C!H` g\"` >'` l/zp`!9*zp` 2!w =`\")\"` )!h` '#`!?\"x` '#X` )!y` '#Y;`\"W$w / zp` *!H = h` %&X = x - (` E\"- w) * 0.5` 9!Y = y` 6$H - h` 6$if` K$/`#4#>`\"_(/`\"D() {isWid`0P!true;ratio`\"($` E$` U!;`#U$ =`#&)* ` O!`!O#-= (` @%-`!;\") / 2`'(%`!'&fals`!$*H`!Q*`!\"-`!}\"`!&(X` ~0W`!+#`2(#{x:` F!, y` $!Y, w` $!W, h` $!H, r:` p!}`(A'reset_state_attributes(destination) {for (var i = 0; i < ` 7'.sm.` ]!s.length; ++i`*-%ate =` \"\"_array[` G1[i]];` &!.attr(` %\"sm` )!`!Q\");highlight_labels` @\", \"`\"#!\",`#j\",`%#!);}`\"8,las`\"F#() {if (` -!`!E' && ` $,.sm.type == \"` Y!\"` /4`!a'` z\"!` 20ignore_hover) {` 2-`\"[!` `;;}`\"[-` B,, \"out\"`\"U/region`%%(` ,\"`!n#` $%` #\".stop();` '#`!Y!` 2$`!F*`%U0` @&`%7I` G,`%Z!`% ;);}`\":-all`\"</) {` /&s.forEach(` S%`\"\\0`$U!d != -1`\"w!`#-9;}}`1H(loc`$/!_corre` /!`(y(, initia`2d$`&I\"`(u,typ`.\"t`,f!ansform + \"s\" +`++#all_`!&$s.hide()`/T\"oom_r`#d\"` '!time * 1000` G+`\"^.lc`.$!f` %!.sm` t!) {lct` |$`-6#` 9'display`(S!all\" || ` (/`(i&`(w+` y#show` _=` V+!` U,`!@Aout`!:*`([!` |F` S!&&`$H,bbox`$r#in`+a)= Raphael.isPointInsideBBox`%S(` ]$,`#7$x,` \"$y)`2i!!` k*`\"G*` D#`!+-`1W\"`1m$` .4`3/!`\"V(}var new_side =`!B$size`1o%` ;$x` 6&x -` L&/ 2` ;%y` :&y` 4,` 1#bbox = {x:` p!, y` $!y, x2` -\" +` P%, y` /\"y` *'}`#\"!`!c$hape_`$}%circl`%e!`#F!vml && !touch` %!`)S&lct.animate({r`!!!`!g!* 0.5},`({&`$1\"`!($calable`,Q\"`&)$` (,` o&`*3%:t` f*}`$A(`.d!`!3.` ;'`!aJheight` f%, width` %'`#n,`!M+`!J-` ?N);}}`\"eO`!)!`#)(`.O,hide_reveal`0S$`(@*`.6;`2.'in ` ]!`1b\"` T#lbl =` ,([i]`'[!lbl_set` 4%`1N!` <!lbl`0l\"` C\"paren` C!` 2\"` *\"`%\"` ,\"`.J$` l\"`,]0` B\"`,($!`,&&` (.`.g%`!\"\"`\"A$`(*!`0 $`-F!!` 7&`+Q.`!61`0@\"`!,\"line`\"{$ine_path = get_` '%(lbl);` F'`$i#path:` =%});}`!($`, %`$r+and_show_before`3&Wlast`*y#` &\"` 50back_arrow`.@%`#3#_corre`!U!`!/2;`&R;`%3!`$(%region\") {reset_`24!_attribute` L+`([\"`!w&` N/` 9!` a!(` |+`3=&!`\"D+` ^\"` Z%` )\"`!9(`\"x,`&o)`!25` 0T`43#` :G`(>(`\"q)`\"N\"`\"Z?`!u# &&`%i,id !`%T2`\"v=` *$`*o\"` I5]`\"Q2`#uW` [Z`#y#highlight`'>$` Y,,` D#`/R#` [!!` V&all`#f\"s.stop();all_pill` $)` <#`*s\"'fill-opacity':adjacent_` +#}` X(` *D`\"N)`!2\"` '(` R11` H,m.`\"_\".forEach(`,6%(`1y$`&X\"be`/^\"il`20!` $(`!6$` '*`!'5}`!5+`4d%'stroke-`3n!':`!Y+hover_border_size * (` F! / original_` ,!) * normalizing_factor}, zoom_time * 1000`/w&`$2<1`$!>1});`'3\"all`'*/);}` z(`\"?3`!Pm`0y3after`.Y)`%$\"`0C/`)j(||`1-0`+^)||`0L$_back) {`1+'`2`$`#p#}}var end`)4(;`!j%`\")\"o`2^4`-O%`#F#d`&u!` %'`&p&` *' = false;}` 2!click` +'`!>+`3d*;tooltip`36$` (#_up` W%currently_zooming = true`.s!`#(0`+P'` 0+` Z#_dimensions = get` r$` .'`3A+var to` C!` P*` a=`!x$_viewbox =` V/;` z\" = {x:` -..x, y` $0y, w` $0w, h` $0h}`!%!from`!y/`/m0`!~/` Z$`!h\"` X0`!j\"` %1`!m!` %1`!o!` %1h};ratio`#&1.r;`);*before`'M2`( &updateZoom() {paper.setViewBox(from.x,`\"C!.y,` \"\"w` )#h,`&u\"`*a(whenDone(`2l!`*\\9`!D'`#b,`(.+`'g0`(/\"if (simplemaps_usmap.hooks`$I%complete) {` #C(`4:$!vml && !touch` %!`*{&TweenLite.to`##!`-[',`':\"`'($`&x$`&h$.h, onU`#v!:`#x&, onC`!=#:`#A$}`,k&`$--` |\"` z\"` x\"` v\"`$/#`$\"&;}`$8&create_content(element) {var ` /# = ` 1#.sm.descrip`$&!`.2!mbedded_img = \"data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAACXBIWXMAAAsTAAALEwEAmpwYAAAKT2lDQ1BQaG90b3Nob3AgSUNDIHByb2ZpbGUAAHjanVNnVFPpFj333vRCS4iAlEtvUhUIIFJCi4AUkSYqIQkQSoghodkVUcERRUUEG8igiAOOjoCMFVEsDIoK2AfkIaKOg6OIisr74Xuja9a89+bN/rXXPues852zzwfACAyWSDNRNYAMqUIeEeCDx8TG4eQuQIEKJHAAEAizZCFz/SMBAPh+PDwrIsAHvgABeNMLCADATZvAMByH/w/qQplcAYCEAcB0kThLCIAUAEB6jkKmAEBGAYCdmCZTAKAEAGDLY2LjAFAtAGAnf+bTAICd+Jl7AQBblCEVAaCRACATZYhEAGg7AKzPVopFAFgwABRmS8Q5ANgtADBJV2ZIALC3AMDOEAuyAAgMADBRiIUpAAR7AGDIIyN4AISZABRG8lc88SuuEOcqAAB4mbI8uSQ5RYFbCC1xB1dXLh4ozkkXKxQ2YQJhmkAuwnmZGTKBNA/g88wAAKCRFRHgg/P9eM4Ors7ONo62Dl8t6r8G/yJiYuP+5c+rcEAAAOF0ftH+LC+zGoA7BoBt/qIl7gRoXgugdfeLZrIPQLUAoOnaV/Nw+H48PEWhkLnZ2eXk5NhKxEJbYcpXff5nwl/AV/1s+X48/Pf14L7iJIEyXYFHBPjgwsz0TKUcz5IJhGLc5o9H/LcL//wd0yLESWK5WCoU41EScY5EmozzMqUiiUKSKcUl0v9k4t8s+wM+3zUAsGo+AXuRLahdYwP2SycQWHTA4vcAAPK7b8HUKAgDgGiD4c93/+8//UegJQCAZkmScQAAXkQkLlTKsz/HCAAARKCBKrBBG/TBGCzABhzBBdzBC/xgNoRCJMTCQhBCCmSAHHJgKayCQiiGzbAdKmAv1EAdNMBRaIaTcA4uwlW4Dj1wD/phCJ7BKLyBCQRByAgTYSHaiAFiilgjjggXmYX4IcFIBBKLJCDJiBRRIkuRNUgxUopUIFVIHfI9cgI5h1xGupE7yAAygvyGvEcxlIGyUT3UDLVDuag3GoRGogvQZHQxmo8WoJvQcrQaPYw2oefQq2gP2o8+Q8cwwOgYBzPEbDAuxsNCsTgsCZNjy7EirAyrxhqwVqwDu4n1Y8+xdwQSgUXACTYEd0IgYR5BSFhMWE7YSKggHCQ0EdoJNwkDhFHCJyKTqEu0JroR+cQYYjIxh1hILCPWEo8TLxB7iEPENyQSiUMyJ7mQAkmxpFTSEtJG0m5SI+ksqZs0SBojk8naZGuyBzmULCAryIXkneTD5DPkG+Qh8lsKnWJAcaT4U+IoUspqShnlEOU05QZlmDJBVaOaUt2ooVQRNY9aQq2htlKvUYeoEzR1mjnNgxZJS6WtopXTGmgXaPdpr+h0uhHdlR5Ol9BX0svpR+iX6AP0dwwNhhWDx4hnKBmbGAcYZxl3GK+YTKYZ04sZx1QwNzHrmOeZD5lvVVgqtip8FZHKCpVKlSaVGyovVKmqpqreqgtV81XLVI+pXlN9rkZVM1PjqQnUlqtVqp1Q61MbU2epO6iHqmeob1Q/pH5Z/YkGWcNMw09DpFGgsV/jvMYgC2MZs3gsIWsNq4Z1gTXEJrHN2Xx2KruY/R27iz2qqaE5QzNKM1ezUvOUZj8H45hx+Jx0TgnnKKeX836K3hTvKeIpG6Y0TLkxZVxrqpaXllirSKtRq0frvTau7aedpr1Fu1n7gQ5Bx0onXCdHZ4/OBZ3nU9lT3acKpxZNPTr1ri6qa6UbobtEd79up+6Ynr5egJ5Mb6feeb3n+hx9L/1U/W36p/VHDFgGswwkBtsMzhg8xTVxbzwdL8fb8VFDXcNAQ6VhlWGX4YSRudE8o9VGjUYPjGnGXOMk423GbcajJgYmISZLTepN7ppSTbmmKaY7TDtMx83MzaLN1pk1mz0x1zLnm+eb15vft2BaeFostqi2uGVJsuRaplnutrxuhVo5WaVYVVpds0atna0l1rutu6cRp7lOk06rntZnw7Dxtsm2qbcZsOXYBtuutm22fWFnYhdnt8Wuw+6TvZN9un2N/T0HDYfZDqsdWh1+c7RyFDpWOt6azpzuP33F9JbpL2dYzxDP2DPjthPLKcRpnVOb00dnF2e5c4PziIuJS4LLLpc+Lpsbxt3IveRKdPVxXeF60vWdm7Obwu2o26/uNu5p7ofcn8w0nymeWTNz0MPIQ+BR5dE/C5+VMGvfrH5PQ0+BZ7XnIy9jL5FXrdewt6V3qvdh7xc+9j5yn+M+4zw33jLeWV/MN8C3yLfLT8Nvnl+F30N/I/9k/3r/0QCngCUBZwOJgUGBWwL7+Hp8Ib+OPzrbZfay2e1BjKC5QRVBj4KtguXBrSFoyOyQrSH355jOkc5pDoVQfujW0Adh5mGLw34MJ4WHhVeGP45wiFga0TGXNXfR3ENz30T6RJZE3ptnMU85ry1KNSo+qi5qPNo3ujS6P8YuZlnM1VidWElsSxw5LiquNm5svt/87fOH4p3iC+N7F5gvyF1weaHOwvSFpxapLhIsOpZATIhOOJTwQRAqqBaMJfITdyWOCnnCHcJnIi/RNtGI2ENcKh5O8kgqTXqS7JG8NXkkxTOlLOW5hCepkLxMDUzdmzqeFpp2IG0yPTq9MYOSkZBxQqohTZO2Z+pn5mZ2y6xlhbL+xW6Lty8elQfJa7OQrAVZLQq2QqboVFoo1yoHsmdlV2a/zYnKOZarnivN7cyzytuQN5zvn//tEsIS4ZK2pYZLVy0dWOa9rGo5sjxxedsK4xUFK4ZWBqw8uIq2Km3VT6vtV5eufr0mek1rgV7ByoLBtQFr6wtVCuWFfevc1+1dT1gvWd+1YfqGnRs+FYmKrhTbF5cVf9go3HjlG4dvyr+Z3JS0qavEuWTPZtJm6ebeLZ5bDpaql+aXDm4N2dq0Dd9WtO319kXbL5fNKNu7g7ZDuaO/PLi8ZafJzs07P1SkVPRU+lQ27tLdtWHX+G7R7ht7vPY07NXbW7z3/T7JvttVAVVN1WbVZftJ+7P3P66Jqun4lvttXa1ObXHtxwPSA/0HIw6217nU1R3SPVRSj9Yr60cOxx++/p3vdy0NNg1VjZzG4iNwRHnk6fcJ3/ceDTradox7rOEH0x92HWcdL2pCmvKaRptTmvtbYlu6T8w+0dbq3nr8R9sfD5w0PFl5SvNUyWna6YLTk2fyz4ydlZ19fi753GDborZ752PO32oPb++6EHTh0kX/i+c7vDvOXPK4dPKy2+UTV7hXmq86X23qdOo8/pPTT8e7nLuarrlca7nuer21e2b36RueN87d9L158Rb/1tWeOT3dvfN6b/fF9/XfFt1+cif9zsu72Xcn7q28T7xf9EDtQdlD3YfVP1v+3Njv3H9qwHeg89HcR/cGhYPP/pH1jw9DBY+Zj8uGDYbrnjg+OTniP3L96fynQ89kzyaeF/6i/suuFxYvfvjV69fO0ZjRoZfyl5O/bXyl/erA6xmv28bCxh6+yXgzMV70VvvtwXfcdx3vo98PT+R8IH8o/2j5sfVT0Kf7kxmTk/8EA5jz/GMzLdsAAAAgY0hSTQAAeiUAAICDAAD5/wAAgOkAAHUwAADqYAAAOpgAABdvkl/FRgAACodJREFUeNrsWVlonNcV/u79/39WjbbReEbSjBQHKjlpYmMTWyM7iWVb8UNfDH1KIBs4JS0UAikybelDaSlNDSnFD4W+lBTjeGkpJH3oU20rdixZdiRrHCNZ+zajdfb1X+69fZjFyngkW06aEtCFwz/Mcs/5zv3Oud+9Q4QQ+C4Piu/42AawDWAbwDaA/++Qy994/fXXK3yNgHMd6XQWQ4NDrQf8+18wDN1iUsy3CSGTQsDY0AMBuMSx2eeEcY9qGPslhhpZwpfCbBohjKiEk02Dv3Tp0sMANkWrSD889HLnh856ZyuhhMTj8Wgqmf6tLClnALAnySBn7CWFyH/yenbsVWSZpFKpdCyVOEOE9BsAuS2vAEAqr4AQP6ipqz7rP+C31dXVgxBA07S6/pv9f1yYDzbKknJqq8ELLl6xmSyXOjr8tc1NTeCcQ9N0+9CdoV9MT8/IBNKpLdeAYagVLKcYhv7Ovr37bA5HFaZnJjE1PQmD6eg63AWvt6nHMNTTW1ElnLHjNpP548MvHa5tbm7G7NwsJiYnkEwlsG/fPtTUVv+UMebbMgAB4yFjXGusctifra93YnFpEYZhgHOOUCiEWDyKrq4j8LX4ehjXTj9OY2CMHbebrBdefvlwQ32DE9PTU9A0DQICkUgYiiyjxlFj5mDPgwhsaJUB0IcMRMqqqhY1dB1WqxWEEEiSBEmSEA6HEU/ECyC8PYzpH2xOG/5Kldl28XBXV52zwYm5uVlwzkEpBSUUJpMZIASqpjJQsSwox0ZWuY1y+pARIa1qqt47OT0Fj6cRNpsNnHMQQkApRTi8hmQyia6uY/C2eHsMpp6uxCZmsOM2k/XjriNHal07XJifnwPnHJIk5YOhFC0trVhZWUEkEgkQRbrLJWAj29I+QCXpzL179/onxsfR4muF1WqDEKIEYi28hlQqgWNHj6HF19LDmP4VOjHGjtsttgtHjhxpcLkaMD8/ByEEKKWlZ2trK1LJFG7eHIgbeu5nZiE0E+PYyLYEgICEBMRbN28N3BofH0eLrwVWq7XkXJIoIpEwEskEjnZ3o6XF18OY/oGAgOC8u8piv3j06NG6YuYZY6A0754QihZfK1LJDK72Xk0mM6m3JEnq/cZ3YkromBDitYFbA4MPVsL6FTpFImFk0il0d3fD1+p7P5fLfm41Wc92Hz1W63G7sbAwDyFEgTbrMp9Oo7f3ajqRSr1BKf3kiXfiR3RuUEonOeev9g/cvAhK9ra1tSEYXICqqpBluUQnQgiOHeuWFKX34K72XXB73Jibny3RjnMOgMDn8yGZSODq1SuxRDr1tiRLn2wpqU8koCgdFxCv9vf33xobG4PP64PN9qAmJElCJBpBKpXA8VeOw7XDhfngXKnb5GlD4PX6kEwmcfnK1WQyk37s4AkhIIRUXgFZlgsbmvEoEGOc89f6b/Zfkijd19bejmAwCE3LQZLyK5GIJ5DNZME4L9Gs+PQ2+xCPx3H58uV0PJV8Q5blTx4VdLFbqaq6MYVCoRAkSUJjYyMopdA0DZzxigqjSKfPb9y4CEL2tre3IxQKQtO0fJYoAeOsFECeNoCv2Yd4PIHLVy7HEqnk2xsGLwRkRYGiKMhmcwiFliCEwPXrA9B1PT9v+a1EsRjb29sBAG1tbVAUBQICRMrXwUNbB+dtlNC/+Tv8/rb2NoRCQei6DiEASvOZI4RACIGGBhcyqQz+c+VyPJlJvUkp/bRicRIGs6JgcXEFweAicjkVU1OzZfhE5SLmnGNkZAQAsLKygpMnTyIWi2E1ugoqPVw2RJLGNFU9OzIy4m/0eJBJZ5DJZgHka0KmFFSSIMsyCAECXwYQjUZGzWbbp2QDpc04EFpdw7VrfVBV7cmLOJFIwG63w2wyY6M7JMbYiZrqmt/t2bMHqUwamWwGECLPOiFgcA5N15HJZrG4uIjdu3ejtaXlAGf6Hwp6BeuNgIBzIJNRNw3+sbsQ53zD4DnnJxx2+9mOA/7aKkcVwmureRpKEgilIJQWdE6emslkEplMBp2dh0hTc+Mpg1fWToR8C0dKxtiJKovto86OTofDUYWlpWWA5DUNIXn6mE1mSBIFCAEtdJJoNIpUOomD/kNoamrsMZh2+ls/EzPGTjis9nOdnf5ah6MKi0uLIESAUgkkv2vD1eCC2+1Bk6cZFrMl3wgIKcmOZDqJQwcPobGpscco007/UwCC8xMOq/2sv9Nvd1Q7EAqFACFAaX7dCaVwu90wDIZr169hbmEObo8HFovtgXaiMmKxCNKZJF489CKamjw9xiOk+DcCgDF2wmqxftTh9ztqqqsRWgzlM0sJgDzPPW4PVFXH7S9uJ9bCK+8HAnf7Zmdm4XF7YLFYwAUHoQKESIiEI8hkUujsPIjGRneeTls42m1JC3HGTzgc9nMdBw7Yqx1VWAgulHS8gAABgXuHG6qq4YvB26mZ2ekf64ZxnhviX4ahXwLB3p07d2JleRm5XBaEEghCsLq2htraWnT4O9Hfd6NneXlFQEg/Lx27vi4Ak8kEEBy0Wsx/3f/CfntVVRWCoQVwnqdDcYd1uVzIZrMYHBrMTExOvHv9s77zWr4NTux8+qnXJEk+ywy2/+mdO7G8ugxVVUuaJhKJgHGOjg4/Bm4NnFpaWg5SSs58bQrpuo4LF84jGl/70XPPfb++trYWS0uL4PyBquScw+lsQDaXwxeDg+ro/fvvXu/t+1hTNQWAGYB5emrmft+N/jcD9wLDUzPTcDpdUBQFjLGSCIxFo8ipWezZswc1NY5fgaDh6wIgABAMBr0E2O10NiAWjZYcFmnT4GxALpfD0NBgemRk5Ceff3bjnKZpdgAWAKaCOeZm50f7rt98IxAIBGZnZ1Bf74QsK6UVJIQgGo3CbDajqsrhZFzvXMcUWunOR94g6KLRgvqxGIxzxlihWEunNNTV1yGXy2E4EMjeu3fv1O1bg39njNeUJYcU9tn6+bn5KQDvcsb+whnb7fX5EImEoWna+kYBzjl0jZkB2Au/VwHwdWJMABDyI7JvAmDKpDPhleXV4ZXVlReeamkFYxyMGaiurkY2k0Xg7l3tzvDwL4eHAv9kBqsp3NIZFQBQANb5ufkJgxnvcSH+TAh5ptnrRTwRg6EbqKmuRjweQyQSXZ4Ym7hfAFCcSy2/AZQrHru+uhKSqqp8dHT0rLOh/iAEnnG5XDApCsKRCMbHxtPDd+78emhw+B9CwFxwxguOWNmyywAkANbF4OJo343+9wB8qGra8263G2bFjFgsjompSXV05P7vY/HYWuH7rCy+UneqKKfX1YepWIQAeLO36bldu3addO1wPivLsikcjixMjk+dn5qavlI4ABkAdABa4XV5G5QAKAUzAeAej+eptvbvvdPU3LjXbDY7wmvhhemZmXNjo+P/1nWdrZtPLTzFejm9GYD1DuWCQ8NisSgWq6URgKzr2lo6lUkUPivSxih3tAkIGQA3KSZis9uaQWAxdGM1lUqFC0krAigaLz8PPAoA1hWzVHAo1k1EC8bWGX+sW5r8fEXDOpoU5+TrksIrH9geD0B52yVlvBZl3WEr46GOVzbnpsmoCGD7L6ZtANsAtgFsA9jK+O8AbNeOIaU8PDcAAAAASUVORK5CYII=\";var external_image = directory + \"x.png` C\"` ;!_source = vml ?` N,: embedded_img` R!xmark = \"<img id=\\\"xpic_sm\" + \"_\" + div + \"\\\"src=\\\"\" +`! *` 7! width=\\\"15\\\" height` &$alt=\\\"Close\\\" border=\\\"0\\\" />`!y\"linkhere_end = new_tab ?` v!target=\\\"_blank\\\">\" +` N!_text + \"</a>\" : \"` $5` z) = \" <a href=\\\" \" + element.sm.url` ]#`!K%+ \"&nbsp;\";if (!on_click) {`#;%\";` t(\";}if (` h+== \"\") {` ;+var content_part =` '$` L\" ? (` 1+\"\") : \"<div`$S\"tt_custom_sm\\\"; /`\"e!` _$`\"c!div>\";return` L+title` U!>` +)nam` 0#`\"v+name`\"{'` w&` U&`\"u!` S&`##\"` >&`!I\"`!Z&`\"4\"`!^'`\"r!bbox_storage`$`!state_array` %'` B!` 0! = false;function create_` D!s(refresh) {`$e!` %&` ~( = {};`! '` +\"}` z/mapinfo.` +,`!W\"caled_`'o\"_size =`'|#` (\"* (`(V! / original_` ,!) * normalizing_factor;for (`*M!d in`!4%paths) {mak`\"B#(id);}`\"[%` +* {`#V!rand_new =`#J([id] ?`#?\" : tru`#n' =` L'? paper`!9!(`!>)[id]) :` g,`(W\"vml) {` 6!.node.setAttribute(\"class\", \"sm`!l\"`,\"!`\"*!var attrs = cattr` p!` .$` [!s = {fill:` D!.color, 'fill-opacity':1, stroke:main_settings.`$4#` N#cursor:\"pointer\", '` P\"` \\)` ,$`$R!':`%!.` 9&linejoin':\"round\"}`\"m!`!d\"inactive) {`\"$&.`!>\" = \"default`(1#hover` ~$`!k! =`\"v\".` (/?`#1\"` '0: `\"I6`#V!` G)`'<#` [/` 5!` s1` 5!:`'k(`(0(` k0` \".`'xLvar ` `!`%@5` ~\"`%##`%F#`\"m.`$g4`!Q-`$d\"`(3%`'X%sm`+4#`$~'`34'` ='.ignore` u\" =`)3\"`%?'fill = \"url(`43\"rectory +`#o#`4(,)`1>#`%#5||`$84`!L(emphasizable`!P$} else` +6`.]\"`-j\".sm`%>/`$s/`.K\".attr`!o!`\"S\")` 0#transform(t` \"$` 3$sm` P!`$%` #&` 7&`%<.` #+` A&descrip`-t!`'d$` )'`!*'djacent`&7+`+^+` =%` +#`0r#`\"r!id`(d'id`\"[$` 4#_label` 4)` -\"`&45.reg`!q\"`#r,`4L!` b$` (!`)e$` (!:`0c%name`/<!`!B&ur`!;&url` /&`4T# =`3]$` *#(` =!`$4'`,u$` ^%` )$` 9&`\"4!s = [`!/'zp` I%zoom_percentag` N'zoom`&P#` @&abl` 8'type = \"` ,!\"`!L'd = id`#b0`& $`#f-!`1O\"bbox`24\"`#w$` ('`\"g&` /!`3s\"true`1~#bbox`3m%` M&`2{%` :\"= undefined) {` M#Raphael`3c!BBox`3g.` %!)`%0'` S#bbox`\"@&bbox.`..\"` 5\".x2 -` ##` 8+height` @$y` ?%y`!h!`#0)`&c%hide()`+ %`'!,all_visible`\"y\"s.push`%q$}`,T!`'Q-`\"}&`#6$;all` K2` .'`!D$func`*1!style_backg`4$!() {` $&`+|\"`0G\"`2n+` ;%`06%`*>*` \"#`0i%\"none\"}`%0#`)W\"`!\"`1^!last_destina`+V!var ` $(`!i%`&(#` \\\"s(refresh)`#S\"!` %&` w(`13#`3b'`.S*`3!\\default`!N#`-6+`\"Z#`#1+`3N)cursor:\"pointer\"`3c&`#G%1`3i4`!q'` 9&linejoin':\"`$@!\"};for (var id in`#{#s) {var`*:\" = rattr`)8!`$;'object =` L$` 1+` 4!`#q! ?`$l)`&y!: paper.set()`+1\"`$4,.sm`$;\"` &%.`')\"`-=\"if (` g,) {console.log(\"Duplicate R`!^\"\");continue`%2\"x1`0\"%` *!2` \")y` 0*y` 4&`#-& = 0; i <`\"j*`!e#.length; i++`#N#`)c\"`.5!` >0[i`#@\"` )!`-;%`\"=\"` S$`\"X\"`.C\"`\"E+` u%+ \" does not exist`\"P)`,,)`!B\"` V0`2q%+ \" already assigned to a`!~#` p)`3\\.id`!m\"(vml &&`\"0\"`0}!gnore_hover && (`0n\"`'}! ||`0{$ov`(/$))`%X&`,d)`0H,`.v$`$s\"1_curr`4&\"`/=#`%+\"` '-2`%4#` ),`,,\"y` @-y2`\"5\"x1) {`&+!`!#&;`&,!` {&;`&-!` r&;`&.!` j&`0&%` Y+ <= x1 ?` '(: x1` p, >= x2 ?` '(: x2`!(, <= y1 ?` '(: y1`!@, >= y2 ?` '(: y2;}`)E,`$!'_id);}`$+!`-%*`/}+`$u\"`0)%`,~,}`#k!`%4!` D?`%\\\"` .#}`$-!`%') {` Z&.fill =`&4#` ;!`(*\"`&:. {`!1+` N*` @'` V(inactive`!(*`\":\" = \"`01#\"` N\"`-%0`'4!`-.,`&y\"`%S!` &,y`$y!` &,`1k\"`%M!-` B/height`%+! -` L/`&5#` {-`%]\"`%7(`$3)` #&` O'`+?!`-!,name` 9'descrip`4j!`#Z$` )'` ?'ur`#z&url` /'labels =`0r)` 5&cont`)u\"create_` *#`0c#` ?(`&G.` #+` A'adjacent`&j;` >$`&}%` X&zoomable`\".%` )$` 8(p` 1)_percentag` 9(`&T$` B%` )$` 9'type = \"`/3#` R(d`/!'`&n&all_` ?\"`*A#`#!*`3w&`$z%;}`'F2` D#-1]`'X\"`*>!ut`%Q&` 7%;out.sm` A\"` &\"`!p%out\"` ,$zooming_dimension`#v!x:0, y:0, w:`(\"!, h:`'k\", r:ratio};`,l#_view`)*#` 3Blast_destina`')#out`-.#`&_!`\"#\"`\";!` *\"set` -#func` P!`&]#`'.\"(`#a#` (\".forEach(` D%(lbl) {lbl.remove();});` H'splice(0, ` *'length);`!J'`#M\"`!G+` /\"` T!oc`\"/!s.toFront(` U%`'R(` #,.reverse();for (var id in` 9-) {`/Q%`!%$ = false`&T\"` k-hasOwnProperty(id)) {continue;`#q!brand_new`!R&`&m%?` w\" : true`$'*`*}+`1n$`\"/0[id]` <!pa`2e!`!h(`)'\"` 3\"_`'\"\"= \"`2k!\") {` I%`2|\"`!U\"` G)id];} else ` V6`)k#` e(`(K)` @N`#y$` g)` -$` ]5`$A!` 1\"x && ` %#y &&`\"v#) {if (` '\"`)r&`!#+` [$=` O#.sm.x;` e$` *(y;`%`,`$f!`+`#`!+%console.log(\"The following `1/\" does not exist: \" + id);`&$&`##&`1p\"= \"Not Named\"`\"5)` :(`!a'id` _\"`&j%`\"f#`!u)`'#`&>\"pa`4D!`&c\"print` .!`!@#x,`/E#y,` \"#name,` H#getFont(\"FreeSans\")` ?$size`'M\"`!\"!` x&ath(`!0&)`%_$`!H&` B%text`!*9);}` J0`)4+;}` ,!`/H%` &$.hid`1b&hid`(h\"`&c#&&`%v(hid`-f# ||`#d'hide)) {` d,`%[\"` -%`'U%` #\";` W&`-d#`25!` '!)`!:'.sm.`2H#`1v+` 0,]` U3`,:!`-o){'stroke-`0}!':0, fill:`\"`\"color, 'font-size'` 2#size` 0$w`1N!':\"bold\", cursor:\"pointer\"` @$family` Z$font_` -\", 'text-anchor` 9$` (\"`41#ver`/f*{`!['h` :!`!g!`4^%` 46` A#`#I*inactive`(c#`/e#`\"$\" = \"default\"`$]$attr`&g!`0a#`%|&`!+)` #&` 7&`!z.` #+` @'`!x,` #*` ?&`,l\" \"` ,!\"` .&id = id`\"H!`*C,`\"S&scalabl`'J$`(K#`'$(re`1Y\"`.X#` *!` |&line`0?`0H&` Q%display = \"out\"`*T%` ./` n\"` )#`!U#`3M'`!m$`!5&`!Q!`-Z% &&`!v$`0|7if `(E\"`!/)= \"all\"`/D,L`({! with lines cannot be shown at \\\"all\\\" zoom levels\"`,{&`!#%bbox`!|$.getBBox(tru`-l$ine`.r$get_` '%`*1$` =$`.)+` ?$).transform(t` \"$` p'`(?*`*l\":\"#000000`)}2`+)*2};line`(2\"` d+)` 5\"`.G%` '\"`-4-` 0$`!?)` \\+` <%`'Y4pill`&b%` E$`'~$` ($`%}4`'A,line` /\"_set`.\"#in`1#!`+1*`&$%state`45!`&F#ill`3R)`$|)`%1$?`%2#` ($:`%41if (vml`(X$` f!.x`!}%x - 0.5 *` '.`$:!`!}#` ,!`\"L&y` J\"` B+h`/H!` F(x2`3;%`!+#+` d:` A+y` B*` z#`1E!p = 0.15`&d!calculated_` o!` X*` -\"* (1 + p * 3`'9\"` C$`\".\"` (\"?`\";#` (\":` i-` T!`#}%`\".$`#6$(` Q\"-`!--`!+\"y`\".,`#c/`\">\" * p` N!` (#` K)` :%`\"+\"` v\"r =` E$/ `\"p\"`'J#`*/\"rect(x, y,`\"R\",` G#, r);pill`*12` 5!`)U!`'(&`)S(` ;!`)W$` &#`)N-`./&`-L(`'i#||`(]*`-h(`!*&`'(%` \"->`#}+`(*#` '$:` A-;` S,2` d/2 <` j*2` j+2` g/2` k,y` h.y`!b+y` j*y` e.y` e-`!^/y`!a,y`!b+y`!^/y`!`-`(+$`\"].-`#'=`'\"%`!I.` L-y;`-A!`%C/region`%:9`40%.sm.` J\"`-a#` '\"`-a$` '#array[` B,]`!D$;` J'`&=!` \"*`%~=` B)` _*2` ^,`%qA` D*` e)y` b+`%j?` B)` _*`!O,`%^B` D*` e)`%v$`\"E+-`\"i7`%l%`!:+` F*y;}`47,pill;all_pills`3[\"`3-!`3f,`3B!`3z-abel);} else`2m$` --if ` &\".sm`&_%!= \"out`4D!` (1all`':!` 4%hide`3q%set` ,!(`!4&all_visible_` @!`\"(#` H%`!D#!`\"Z&reset) {top` 69` H&`'v%type`(h!locat`)'!&& ` r&lin`!i!` 7#` f5all` $4` \"%`)5#id]`1y%set`$\"'`01`\"G!vml`#,$.node.setA`11$(\"class\", \"sm`!@\"_\" + id);}`!N(`#b$function get_line_pat`%!$`+6\"`'^&`!d$`*y%` :!`\"h$` 2,`,l*` >*points = [];` &+`#/\"{x:0.5 * (` s).x +`!$*.x2), y:` '*y})` \"r2` ^7` Q+, y` v2y` {-y2)` NF2` HM`$\\&`#k)` ''`!\"&`.G)+ `! )`-u(+`-2*`!{!` Q< -` .^` J.`$V!`!k(`$R\"` q(- `$S!` (d`\"t!`#Q#winner = {};for (var k in`#e)) {` 4%j` 8!`$~*`)$#current`)_\"`*q%` =\"[k]`!,!` ;%` [# =` ],[j` D\"distance_between =` *%(` }),` d-`+f\"k == 0 && j` $\"||` c.<`\"\\#.` 2$) {` +#`!$`! );` 5$`!v&`!.,` ;$` j$`!n'`!/$;}}}return linePath(`!*(.x,`!P$` *\"y` &&` #` 7(` +$y);}`,<)`/#!;`-]%create`!`%s(refresh)`1g\"` /%.forEach(` Q%(lct) {lct.remov`.Y!)`4D!` L&splice(0, ` **length`*w'`!R!`&F+id`&-(s) {mak`!b&(`/!`!G%` +-`&\\\"attrs`&U!ttr[id]`%D!` 1!`2{\"!= \"image\"` G'`17!s = {'stroke-width':` S\"border * scale * normalizing_factor, ` S\"` E)_color, fill` 2#` +#opacity` .#` '#`'B!sor:\"`(#!er\"}`(#!over_`!D?h` D!`!\"g` k\"`!^1` 5\"`!^7} else`#O0`!|E` b/`$c&inactive) {` L&.` M\" = \"default\"`(*\"shape_`%<!`%Q'`%M!`0x\"`&q$`#/\"= simplemaps_usmap_mapinfo`)\"%` C#? ` \"D: 1`!&!size =`'#\".` (!*`!0+`'('x &&` D#y`')#`\"i!`(U\"` &!.x` e%x,` 8\".y` *%y`#|)` T$getxy` |#lat,` F#lng)`#^\"`#$(= \"square\" ||`#=)`([,new_sid`#:\"`\"4!ratio`\"R!new_x =`!Z#x -` D&/ 2` :%y` :%y` 3,`!E0circl`!7%`.h'paper.` 9\"(`!-#`\"u%,`!R) * 0.5`2h\"bbox = {x:`!^&` E#`3c\"` M!, y` 9#y` )3x2` X%+` K2` 9$y` *3here:\"hi`(a&`\"L/`#q)` (!`3K(`+V#verwrite_` 2+?`%/#` (5: directory +` F#` =\"sourc`(L*`#k%` =!(` ]*,`%9\",`$}\"` (\"side` +\"side`#o,` I#y` $!y`#L!`%|\"+` R'y` /\"y` *'`+k*`!L-rect(` J~`!C%`40%sm`)m\"` &'.`-!)` #&` :&attr`)a!` 3\"`36&.transform(t` \"$` 3'sm.original_` 7% = ` #%` =*`.I-` #+` A)id = id` ')nam`,i&name` 1)url` 4%url` /)`.k#\"` ,$\"` 1)`/))` #&` 7)descrip`'f)` )'`!n*`0M#` @%` )$` 7+_destin`%s$tru` 4*`,]'` +)`,R'` +)`&$#bbo` B*labels = []`\"J*`0=\"siz`!**h`.6\"`3{#id`\"[+ispla`/q&` )#`0i!` 31= \"region`/T!` +4stat`/u\"`!.&) {` F%hide()`'^).conte`1%!create_` *#`!?%);all`*v%s.push` 2'`2g%array[id] =`!X%`\",!!vml`!:(node.setA`'.$(\"class\", \"sm`!!%_\" + id);}}}func`$}!`\"=!_or_`\"h\"(` +!) {current`%?+` /#ly_zooming ? end` 9): las` L)`!p!` t!`'m&`'l() {retur`!G#`2F#` H$`!S\" &&`!6$` o(` d)out` a'` R\"`#?#` _+]`0l(` W<`%`$&&` V: !`\"x%`\"d)&&`\"2\"` A&` ro`'##` z.`!,/`!R3` ^~`!H4!` bh`%}+`'a&is_adjacent(element) {`*}!`'\"+`%'4` O#` +0`![&`-m!`\"o'` AX`#,&(!` 5'`#3#||` I(`$r&` ~0id)`!,S`!:&`!mn` ^:` --`\")0`!$2` ,$fals`%8)highlight_`1;\"`%B$, type, `%Z$, skip_check`%_#`#v(` W\"`!3%`!.%var `21%` ?-;}` \"\".forEach(`!N%(` 4!)` [\"par`0[\"`!9& ?` q\".sm.` 8#:`/+-` 3+)`.S!`-T&ver\"`'h%` B$il`0f!` $(.stop(` X\"!` e\"`%}!gnore_hover` B-attr(` B&over_a`1G$s);}`\"T\"` s$` '\"` P!` _%` B.`%{&`&D'se`/`!` M1ut` T)`\"(>`!h+` M,`%E$` 7=` A#`\"D+`%M$`!e#nimate`!W4, fade_time`!d2`#bI`!%#`\"'0` |)`3f!`\"-6` U.`\"8.` b*}}});`)%&`'j\"_inactive`.I+`'p~`!\"#` M'`!C$`%v*{cursor:\"default\"}`&W%` 21pointer` B!`\"D)emphasiz`\";,`,p,!`,w%`\"H'`\"d,` e$able` <'` :$insertBefore(all_visible_` t!s);}`#7\"st_over =`-H#` -%`$y#d` -)`3^#click` D#bel` %'` 0&over` #\"ut` #!background` O-` C%` (#` G'` E#`#;%create_event_handlers(`$I$`\"#%`%!%`#\\#this`-3' {over.call` +,;}}`+}\"_out` EBut` K;`!!` GA` E!` U5`\"&4currently_zooming || tooltip_up && `$N$`&#+`%8%`!|(` +&;}`%V(this`/t\"`!W!id` b'var`4!%=`1--thi`-p#`';$` P'`*P4` K!`)H2`'e%`(a-`\"!_hook` Z*!`\"V'`\"s#.show` u(cont` L!` +%`2C&vml &&`+Y(`1/%location\"` 2+shape_` >%imag`)u9`/'+` 2$`.A$` ?'`2`+, 1);}highlight_`#K\"` I$, \"over\"`,K&`$]\"`%V%`!!'`!O~`!O~`\"E(}}`,P#set_appearance`(W)`&g&`%P$hide`\"_#is_`2/$` @%`1N/`!`F`2d4` 78`39;`\"L8ut\", true`%0*`#~{ || `\"t'`$^a`#!4`\"?;`-r\"`/;+force`-d4`,-)`2o,`,Ln`,c>out`,JC`&sB`\"86`\">#`#So`&]~`&]~`&7~`'),`.z2 || `'=! ==`\"W\" {`,r,`%b&`'?!`!P#d =`\"L$`-W!`%{!`(-)`'r?`'DD`'7:` 3+zoomable &&` +)`$(%` y\"\" || `\"-!destin`$f! !`\"-% ||`%!1`#L!) {` $`(T\"`(g+`(W+`#f'`*R(`!9!` Z!ed) {out.call` **;setTimeout(`#P)zoom_to`!+&}`%G*`%+#` 5.` 3#`*J,`!t0var link`%#&.sm.url`!z\"ink != \"\"`2 $new_tab) {window.`(<$.href =` h!;`$Q$`![#` D#open` n!, \"_newtab\"`#9-` S$`'D)`#$(`$V(&&`${\"`#Y&`'K-`#]*}`$P8show`&$(cont` 5(`$x\"true`+K9ver\"`'P\"`*pg`*2)`+8?ttr`!(over`-i');}`1j\"`#L$`*A&var close_`!7! = docu` c!getE` @\"ById(\"xpic_sm\" + \"_\" + div);` R'.on`+!1`(;>`(33if (simplemaps_usmap.hooks.`!1\"popup) {` #>();}};}};back` |\"`,i0` R3ba`(m!` #7()`,R\"`+q,`+Z- && initial_` p#`(d3\"javascript:\" +` I)`)$$`4j!ncr`$B!a`&Z!`!%9`.n!`!?!` 30`.#\"`\"d#`({+`,6<` V\"_array[` c6]`,W<` =G`*{4`.C4,`2l\"`.@=`!6)-1`!EJ` J\"`&B#ground`&56`/#'`(6+`\"!/`,l<`(e/}};}`!,%order() {all_`%D!s.toB`'7\"`!d&` *&all`-)#.toFront`)y!p` #.` E!`'8#` ,(` ,$` @.`!M&set_up_`!w#`+%' = create` 2&` H+events`\"$+`-W!(over, out`!W\"` 5#`#(!(`#m\"`\"G(` 2\"`$B,` 6)` q\"`#~\"`!I#, ` \")` I\"_arrow` g'` d$`\"v*`!Q1` 5&`!\\)`#}'` Q\"` (!_` W\"` %#` Z%` B\"` Z\"` 6\"` _#}var resizing`%Y%`#G%` 5!e_pap`%_\"if (responsive) {mapdiv.style.width = \"100%\";}` m'`3,!`$R#dimensions();` v!.setSize(` ]!, height)`1C!scaled_b`'$!_size = ` \"(* ` Q\" / original_` ,!) * normal`!A!_factor`(`!`%4& && `#Y)`%j*forEach`*h'` 4!) {` #!`3^\"{'stroke-`!2!':`!a.});` J\"sm` N!`3|\"[` J*] =`\";/` O&`4Q+` J0` C$`%M!`#')`\"VL}`&M,`\"X.` 4$`02%ttr[`1g%sm.id]`0\"!= \"image\") {` 6(`!q9` [2`\"/\"`!_M` [(`#'>`!%2`#J(` gV`%^1`\"OB});}}`)n#adjusted_ratio = `!82`)-$trial_text();`*@-`-x&reveal_map(refresh`$x#initial_zoom != -1 && !` ;&`+D\"gion =` \"#`2W#` O(];`2s*`3w$` s,_solo`)E#`,$`2_\"`/J(` ,\"`.7'` +#` v\".show` #'m.` c#`'9/abel) {` #!` P$});return;}}`/j'` 7#all_visible`!H$` '/`!+#` j$`#]'`#3!`#d!) {`4`!`%/%()`$O$` s\"(`\"~\"` -#`\")\"` &+`)`%` (+`!:!();`.}!_`!|&();hide_and_show_before(last_destin` k!,`%\\\"` >,aft`1.!` 63`(>!();`4$(`&P\"`0d%;`&?'`%9&simplemaps_usmap.hooks.`#&$comple`.Z\"` $B();}`(J\"fter_page_loads = `%5&manual) {` *%first() {preload();get_client_info` +#map` #(`!9#able` /$is_licensed`$o&dom_structure` ,'`2p(` -#canva` %'`)~)if (!popup_nocss`&%#tt_css();}set_up_tooltip` \\&`(P!button`$B#`&S)`%]/`&e*`&^-`!F\"vml || !`#I%setTimeout(second, 1);} else {` -\"`$@!`#r%` ,$ {`'K-`'F.re`!v!ll`!A#`!x*`&`$` O#`&f!_handler`\"A!`&r*`&h%`&P9`&C>`&P)`&##;};var get_xy`&P)`-u#everyth`.q\"`(@!.set();` /&.push(`-7&, `47), `$F&` 4#`#\"!` V)mousedown`-3'e, a, b`!B#l = ie ? `\"u!.`'m\"X + document.d` \"#Ele` +!scrollLeft : e.pageX`\"I!u` W0Y` I>Top` a%Y` e!find_po`)r!indPos(`)4\"ner)` =!x0` 5#_pos[0]` 0!y` ()1` /\"go = current_viewbox` 4!this`31\" = go.r *`3N%scale` <&height` =&` )#` <(x `3!!* x_` 0! + go.x` <$ +`!$(* (l - x0) /`!.\"`!z\"` \\$y` X(y` T,`!7#* (u - y` `!` .\";x = x.toPrecision(8);y = y` %,var print_str`&a\"\"x: \" + x + \",\" + \"\\ny` .\"y` .\";prompt(\"Below are your x/y coordinates\",` o)`3P&`(1$over_hook`(/)e`%Q\"`&s#type = ` .#.sm.type`)g!` 5\"= \"`(5!\" && `)F3`!$!` A!`)g6` :&`!:$.sm.id);}`! )`)3$` o=` A$` t;` ?$` x:`-$\"` s=` A\"` s;` ?\"` -`$-#ut`#1~ks.out`#q=` ;$`#N_ut`#l@` ;'`#N]ut`#l>` ;%`#v3click`#-~ks.`!$\"`#r;` :'`\"?\\` e\"`\"a<` :(`$c^` h\"`%%>` :*`$$3zoomable_`#B~`!P$`!$+`$.;` :0`#v\\` e+`$?<` :1`#=/`#-%load_map() {if (!map_inner) {after_page_loads(true);} else {delete paper;` 44}`!\"%`!G\"_zoom(id`$@#` /\" =` 6$array[id];zoom_to(`\"L#;` _&`#T!` Y+` /! =` 5#` T.`$U\"` Z'reset_toolti`\"U%last_ov`\"X!out.call` *'`$X\"!` N#_manual) {`3^$`\"q#` 2* = false` W\"on`$5\"` K'` H#.hide();setTimeout(`'R&) {}, 100`!w(popup`&(!, `\"d!`'J/`\"x#`%;#`\"n/`!n#`&c0` K-`$3-`\"J$` 9*`* $` =(`#4!`)X&console.log`!1\"+ \" \" + id` &!does not exist\");`#'\"`#B$var box = `$8!destin`!/!.sm`( !ing_dimensions`*M&!`,N(`\":#bb`*{*bbox`+m!x = (bb.x + bb.x2) * 0.5` 8!y` 6#y` 7\"y` 4%` Q!x + x_scale) * ` $!;` N!y + y` *,`#=(x`!@*`!E\"y` '*y` PR`2=!urrent_` Z#- box.x) / ratio`2`\"` =#` d#` >\"y` :&if (` ^&> width * 1.1 ||` T'> height` 6\"`%*+\"Not in this`&5#`$y-`(E+` #!`)Q\"`&%$`#3%over` +,`):-true;`)*$`*^\"pos`\"#&,`!s&);ignore_pos` K+`*+,`!m#` >!`)Q+_`*1\"`*m%`*?$` b$up` ]%`\"=+`+s*` 1!ed`\"D'`,,0`!3&go_back() {back` Z\"(`+3(get`. !_level(`,)%`(_1`38!}` :#{calibrate:create_bbox`2K\",` s!xy:g` \"!, refresh:r` \"\"_map,`12!:`14$,`0/(:`0<',`/`':`/l&, back:`\";#,`#b\":`#i!` &#`#p!` ,\"` &!, `\"?&`!T!` %&, `35!:`%z!`!}\":`$*!, ` -!`!I\"` &)`+8$` ,%ut` J+ut` H,ut` F-`4=\"` L)`4J(` &*` K.ose_`\"T\"` ,#zoomable`%%\"` k*` -+` s+omple` C&`$B$` (,`.0$` (,`$)!` '!}};}`+<!simplemaps_usmap = `%c#` *,()`'s!window.addEventListen`4#!` #3(\"load\", `2x)`3%4if (`!*,_mapdata.main_settings.auto_load`0G!no\") {` K,.load();}}, 1);}`)M%`!(ttach`!o!`!{'` +&(\"on`!!~`!WH"))