function k(b, a, c, d) {
  b.i.ma(b.P, a, c, d, void 0);
}
function p(b, a, c, d) {
  b.i.o
    ? k(b, a, c, d)
    : b.i
        .rb()
        ._OnMessageFromDOM({
          type: "event",
          component: b.P,
          handler: a,
          dispatchOpts: d || null,
          data: c,
          responseId: null,
        });
}
function q(b, a, c) {
  b.i.h(b.P, a, c);
}
function r(b, a) {
  for (const [c, d] of a) q(b, c, d);
}
window.Z = class {
  constructor(b, a) {
    this.i = b;
    this.P = a;
  }
  Ja() {}
};
window.Vb = class {
  constructor() {}
};
("use strict");
class aa {
  constructor(b) {
    this.wa = b;
    this.ya = !1;
    this.Ba = !0;
  }
}
function ba(b, a) {
  const c = a.elementId,
    d = b.ja(c, a),
    e = new aa(d);
  b.R.set(c, e);
  d.style.boxSizing = "border-box";
  d.style.display = "none";
  e.Ba = !!a.isVisible;
  a = b.oa(d);
  a.addEventListener("focus", () => {
    t(b, "elem-focused", c);
  });
  a.addEventListener("blur", () => {
    t(b, "elem-blurred", c);
  });
  b.ca && document.body.appendChild(d);
}
function u(b, a, c) {
  q(b, a, (d) => {
    const e = v(b, d.elementId);
    return c(e, d);
  });
}
function v(b, a) {
  b = b.R.get(a);
  if (!b) throw Error(`no element with id ${a}`);
  return b.wa;
}
function t(b, a, c, d) {
  d || (d = {});
  d.elementId = c;
  k(b, a, d);
}
function w(b, a, c, d) {
  d || (d = {});
  d.elementId = c;
  p(b, a, d);
}
window.La = class extends self.Z {
  constructor(b, a) {
    super(b, a);
    this.R = new Map();
    this.ca = !0;
    r(this, [
      ["create", (c) => ba(this, c)],
      [
        "destroy",
        (c) => {
          c = c.elementId;
          const d = v(this, c);
          this.ca && d.parentElement.removeChild(d);
          this.R.delete(c);
        },
      ],
      [
        "set-visible",
        (c) => {
          if (this.ca) {
            var d = this.R.get(c.elementId),
              e = d.wa;
            d.ya
              ? (e.style.display = c.isVisible ? "" : "none")
              : (d.Ba = !!c.isVisible);
          }
        },
      ],
      [
        "update-position",
        (c) => {
          if (this.ca) {
            var d = this.R.get(c.elementId),
              e = d.wa;
            e.style.left = c.left + "px";
            e.style.top = c.top + "px";
            e.style.width = c.width + "px";
            e.style.height = c.height + "px";
            c = c.fontSize;
            null !== c && (e.style.fontSize = c + "em");
            d.ya || ((d.ya = !0), d.Ba && (e.style.display = ""));
          }
        },
      ],
      [
        "update-state",
        (c) => {
          const d = v(this, c.elementId);
          this.N(d, c);
        },
      ],
      ["focus", (c) => this.ra(c)],
      [
        "set-css-style",
        (c) => {
          const d = v(this, c.elementId),
            e = c.prop;
          c = c.val;
          e.startsWith("--") ? d.style.setProperty(e, c) : (d.style[e] = c);
        },
      ],
      [
        "set-attribute",
        (c) => {
          v(this, c.elementId).setAttribute(c.name, c.val);
        },
      ],
      [
        "remove-attribute",
        (c) => {
          v(this, c.elementId).removeAttribute(c.name);
        },
      ],
    ]);
    u(this, "get-element", (c) => c);
  }
  ja() {
    throw Error("required override");
  }
  N() {
    throw Error("required override");
  }
  oa(b) {
    return b;
  }
  ra(b) {
    const a = this.oa(v(this, b.elementId));
    b.focus ? a.focus() : a.blur();
  }
};
("use strict");
const ca = /(iphone|ipod|ipad|macos|macintosh|mac os x)/i.test(
    navigator.userAgent
  ),
  x = /android/i.test(navigator.userAgent),
  da =
    /safari/i.test(navigator.userAgent) &&
    !/(chrome|chromium|edg\/|OPR\/|nwjs)/i.test(navigator.userAgent);
let ea = 0;
function y(b) {
  const a = document.createElement("script");
  a.async = !1;
  a.type = "module";
  return b.Lb
    ? new Promise((c) => {
        const d = "c3_resolve_" + ea;
        ++ea;
        self[d] = c;
        a.textContent = b.Pb + `\n\nself["${d}"]();`;
        document.head.appendChild(a);
      })
    : new Promise((c, d) => {
        a.onload = c;
        a.onerror = d;
        a.src = b;
        document.head.appendChild(a);
      });
}
let fa = !1,
  ha = !1;
function ia() {
  if (!fa) {
    try {
      new Worker("blob://", {
        get type() {
          ha = !0;
        },
      });
    } catch (b) {}
    fa = !0;
  }
  return ha;
}
let z = new Audio();
const ja = {
  "audio/webm; codecs=opus": !!z.canPlayType("audio/webm; codecs=opus"),
  "audio/ogg; codecs=opus": !!z.canPlayType("audio/ogg; codecs=opus"),
  "audio/webm; codecs=vorbis": !!z.canPlayType("audio/webm; codecs=vorbis"),
  "audio/ogg; codecs=vorbis": !!z.canPlayType("audio/ogg; codecs=vorbis"),
  "audio/mp4": !!z.canPlayType("audio/mp4"),
  "audio/mpeg": !!z.canPlayType("audio/mpeg"),
};
z = null;
async function ka(b) {
  b = await la(b);
  return new TextDecoder("utf-8").decode(b);
}
function la(b) {
  return new Promise((a, c) => {
    const d = new FileReader();
    d.onload = (e) => a(e.target.result);
    d.onerror = (e) => c(e);
    d.readAsArrayBuffer(b);
  });
}
const A = [];
let C = 0;
window.RealFile = window.File;
const D = [],
  E = new Map(),
  F = new Map();
let ma = 0;
const na = [];
self.runOnStartup = function (b) {
  if ("function" !== typeof b)
    throw Error("runOnStartup called without a function");
  na.push(b);
};
const oa = new Set(["cordova", "playable-ad", "instant-games"]);
let pa = !1;
window.B = class b {
  constructor(a) {
    this.o = a.Rb;
    this.U = null;
    this.m = "";
    this.H = a.Ob;
    this.Y = {};
    this.Da = this.J = null;
    this.da = [];
    this.j = this.W = null;
    this.Xa = !1;
    this.S = null;
    this.G = -1;
    this.Gb = () => this.yb();
    this.Ga = [];
    this.g = a.$a;
    this.Aa = "file" === location.protocol.substr(0, 4);
    !this.o ||
      ("undefined" !== typeof OffscreenCanvas &&
        navigator.userActivation &&
        ia()) ||
      (this.o = !1);
    this.o && da && (this.o = !1);
    if ("playable-ad" === this.g || "instant-games" === this.g) this.o = !1;
    if ("cordova" === this.g && this.o)
      if (x) {
        const c = /Chrome\/(\d+)/i.exec(navigator.userAgent);
        (c && 90 <= parseInt(c[1], 10)) || (this.o = !1);
      } else this.o = !1;
    this.ea = this.A = null;
    "html5" !== this.g ||
      window.isSecureContext ||
      console.warn(
        "[Construct] Warning: the browser indicates this is not a secure context. Some features may be unavailable. Use secure (HTTPS) hosting to ensure all features are available."
      );
    this.h("runtime", "cordova-fetch-local-file", (c) => this.ub(c));
    this.h("runtime", "create-job-worker", () => this.vb());
    "cordova" === this.g
      ? document.addEventListener("deviceready", () => this.Pa(a))
      : this.Pa(a);
  }
  fb() {
    return ca && "cordova" === this.g;
  }
  la() {
    const a = navigator.userAgent;
    return (
      (ca && oa.has(this.g)) ||
      navigator.standalone ||
      /crios\/|fxios\/|edgios\//i.test(a)
    );
  }
  cb() {
    return x;
  }
  Ma() {
    return x && oa.has(this.g);
  }
  async Pa(a) {
    "macos-wkwebview" === this.g && this.ua({ type: "ready" });
    if ("playable-ad" === this.g) {
      this.A = self.c3_base64files;
      this.ea = {};
      await this.nb();
      for (let d = 0, e = a.K.length; d < e; ++d) {
        var c = a.K[d];
        this.ea.hasOwnProperty(c)
          ? (a.K[d] = { Lb: !0, Pb: this.ea[c] })
          : this.A.hasOwnProperty(c) &&
            (a.K[d] = URL.createObjectURL(this.A[c]));
      }
      a.ha = [];
    }
    if ("nwjs" === this.g && self.nw && self.nw.App.manifest["c3-steam-mode"]) {
      let d = 0;
      this.jb(() => {
        d++;
        document.body.style.opacity = 0 === d % 2 ? "1" : "0.999";
      });
    }
    a.Nb
      ? (this.m = a.Nb)
      : ((c = location.origin),
        (this.m = ("null" === c ? "file:///" : c) + location.pathname),
        (c = this.m.lastIndexOf("/")),
        -1 !== c && (this.m = this.m.substr(0, c + 1)));
    a.Tb && (this.Y = a.Tb);
    c = new MessageChannel();
    this.U = c.port1;
    this.U.onmessage = (d) => this._OnMessageFromRuntime(d.data);
    window.c3_addPortMessageHandler &&
      window.c3_addPortMessageHandler((d) => this.xb(d));
    this.S = new self.gb(this);
    await qa(this.S);
    "object" === typeof window.StatusBar && window.StatusBar.hide();
    if ("object" === typeof window.AndroidFullScreen)
      try {
        await new Promise((d, e) => {
          window.AndroidFullScreen.immersiveMode(d, e);
        });
      } catch (d) {
        console.error("Failed to enter Android immersive mode: ", d);
      }
    this.o ? await this.tb(a, c.port2) : await this.sb(a, c.port2);
  }
  pa(a) {
    a = this.Y.hasOwnProperty(a)
      ? this.Y[a]
      : a.endsWith("/workermain.js") && this.Y.hasOwnProperty("workermain.js")
      ? this.Y["workermain.js"]
      : "playable-ad" === this.g && this.A.hasOwnProperty(a)
      ? this.A[a]
      : a;
    a instanceof Blob && (a = URL.createObjectURL(a));
    return a;
  }
  async ka(a, c, d) {
    if (a.startsWith("blob:")) return new Worker(a, d);
    if ("cordova" === this.g && this.Aa)
      return (
        (a = await this.ia(d.Kb ? a : this.H + a)),
        new Worker(
          URL.createObjectURL(
            new Blob([a], { type: "application/javascript" })
          ),
          d
        )
      );
    a = new URL(a, c);
    if (location.origin !== a.origin) {
      a = await fetch(a);
      if (!a.ok) throw Error("failed to fetch worker script");
      a = await a.blob();
      return new Worker(URL.createObjectURL(a), d);
    }
    return new Worker(a, d);
  }
  v() {
    return Math.max(window.innerWidth, 1);
  }
  u() {
    return Math.max(window.innerHeight, 1);
  }
  Oa(a) {
    var c = this.m,
      d = location.href,
      e = this.v(),
      f = this.u(),
      g = window.devicePixelRatio,
      h = b.M(),
      l = a.$b,
      m = window.cr_previewImageBlobs || this.A,
      n = window.cr_previewProjectFileBlobs,
      Ca = window.cr_previewProjectFiles,
      Da = window.Yb || "";
    a = a.$a;
    var Ea = new URLSearchParams(self.location.search).has("debug"),
      N = this.S;
    return {
      runtimeBaseUrl: c,
      previewUrl: d,
      windowInnerWidth: e,
      windowInnerHeight: f,
      devicePixelRatio: g,
      isFullscreen: h,
      projectData: l,
      previewImageBlobs: m,
      previewProjectFileBlobs: n,
      previewProjectFileSWUrls: Ca,
      swClientId: Da,
      exportType: a,
      isDebug: Ea,
      ife: !!self.Zb,
      jobScheduler: { inputPort: N.za, outputPort: N.Fa, maxNumWorkers: N.Eb },
      supportedAudioFormats: ja,
      opusWasmScriptUrl: window.cr_opusWasmScriptUrl || this.H + "opus.wasm.js",
      opusWasmBinaryUrl:
        window.cr_opusWasmBinaryUrl || this.H + "opus.wasm.wasm",
      isFileProtocol: this.Aa,
      isiOSCordova: this.fb(),
      isiOSWebView: this.la(),
      isFBInstantAvailable: "undefined" !== typeof self.FBInstant,
    };
  }
  async tb(a, c) {
    const d = this.pa(a.Sb);
    "preview" === this.g
      ? ((this.J = new Worker("previewworker.js", {
          type: "module",
          name: "Runtime",
        })),
        await new Promise((h, l) => {
          const m = (n) => {
            this.J.removeEventListener("message", m);
            n.data && "ok" === n.data.type ? h() : l();
          };
          this.J.addEventListener("message", m);
          this.J.postMessage({
            type: "construct-worker-init",
            import: new URL(d, this.m).toString(),
          });
        }))
      : (this.J = await this.ka(d, this.m, {
          type: "module",
          name: "Runtime",
          Kb: !0,
        }));
    this.j = document.createElement("canvas");
    this.j.style.display = "none";
    const e = this.j.transferControlToOffscreen();
    document.body.appendChild(this.j);
    window.c3canvas = this.j;
    self.C3_InsertHTMLPlaceholders && self.C3_InsertHTMLPlaceholders();
    let f = a.ha || [],
      g = a.K;
    f = await Promise.all(f.map((h) => this.F(h)));
    g = await Promise.all(g.map((h) => this.F(h)));
    if ("cordova" === this.g)
      for (let h = 0, l = a.ga.length; h < l; ++h) {
        const m = a.ga[h],
          n = m[0];
        if (
          n === a.Ia ||
          "scriptsInEvents.js" === n ||
          n.endsWith("/scriptsInEvents.js")
        )
          m[1] = await this.F(n);
      }
    this.J.postMessage(
      Object.assign(this.Oa(a), {
        type: "init-runtime",
        isInWorker: !0,
        messagePort: c,
        canvas: e,
        workerDependencyScripts: f,
        engineScripts: g,
        projectScripts: a.ga,
        mainProjectScript: a.Ia,
        projectScriptsStatus: self.C3_ProjectScriptsStatus,
      }),
      [c, e, ...ra(this.S)]
    );
    this.da = D.map((h) => new h(this));
    this.Na();
    sa(this.W);
    self.c3_callFunction = (h, l) => {
      var m = this.W;
      return m.i.hb(m.P, { name: h, params: l });
    };
    "preview" === this.g &&
      (self.goToLastErrorScript = () =>
        this.ma("runtime", "go-to-last-error-script"));
  }
  async sb(a, c) {
    this.j = document.createElement("canvas");
    this.j.style.display = "none";
    document.body.appendChild(this.j);
    window.c3canvas = this.j;
    self.C3_InsertHTMLPlaceholders && self.C3_InsertHTMLPlaceholders();
    this.da = D.map((g) => new g(this));
    this.Na();
    var d = a.K.map((g) =>
      "string" === typeof g ? new URL(g, this.m).toString() : g
    );
    Array.isArray(a.ha) && d.unshift(...a.ha);
    d = await Promise.all(d.map((g) => this.F(g)));
    await Promise.all(d.map((g) => y(g)));
    d = self.C3_ProjectScriptsStatus;
    const e = a.Ia,
      f = a.ga;
    for (let [g, h] of f)
      if ((h || (h = g), g === e))
        try {
          (h = await this.F(h)),
            await y(h),
            "preview" !== this.g ||
              d[g] ||
              this.Ra(g, "main script did not run to completion");
        } catch (l) {
          this.Ra(g, l);
        }
      else if ("scriptsInEvents.js" === g || g.endsWith("/scriptsInEvents.js"))
        (h = await this.F(h)), await y(h);
    "preview" === this.g && "object" !== typeof self.Ub.Wb
      ? (this.aa(),
        console.error(
          "[C3 runtime] Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax."
        ),
        alert(
          "Failed to load JavaScript code used in events. Check all your JavaScript code has valid syntax."
        ))
      : ((a = Object.assign(this.Oa(a), {
          isInWorker: !1,
          messagePort: c,
          canvas: this.j,
          runOnStartupFunctions: na,
        })),
        sa(this.W),
        this.Qa(),
        (this.Da = self.C3_CreateRuntime(a)),
        await self.C3_InitRuntime(this.Da, a));
  }
  Ra(a, c) {
    this.aa();
    console.error(`[Preview] Failed to load project main script (${a}): `, c);
    alert(
      `Failed to load project main script (${a}). Check all your JavaScript code has valid syntax. Press F12 and check the console for error details.`
    );
  }
  Qa() {
    this.aa();
  }
  aa() {
    const a = window.Ib;
    a && (a.parentElement.removeChild(a), (window.Ib = null));
  }
  async vb() {
    const a = await ta(this.S);
    return { outputPort: a, transferables: [a] };
  }
  rb() {
    if (this.o) throw Error("not available in worker mode");
    return this.Da;
  }
  ma(a, c, d, e, f) {
    this.U.postMessage(
      {
        type: "event",
        component: a,
        handler: c,
        dispatchOpts: e || null,
        data: d,
        responseId: null,
      },
      f
    );
  }
  hb(a, c) {
    const d = ma++,
      e = new Promise((f, g) => {
        F.set(d, { resolve: f, reject: g });
      });
    this.U.postMessage(
      {
        type: "event",
        component: a,
        handler: "js-invoke-function",
        dispatchOpts: null,
        data: c,
        responseId: d,
      },
      void 0
    );
    return e;
  }
  _OnMessageFromRuntime(a) {
    const c = a.type;
    if ("event" === c) return this.wb(a);
    if ("result" === c) this.zb(a);
    else if ("runtime-ready" === c) this.Ab();
    else if ("alert-error" === c) this.aa(), alert(a.message);
    else if ("creating-runtime" === c) this.Qa();
    else throw Error(`unknown message '${c}'`);
  }
  wb(a) {
    const c = a.component,
      d = a.handler,
      e = a.data,
      f = a.responseId;
    if ((a = E.get(c)))
      if ((a = a.get(d))) {
        var g = null;
        try {
          g = a(e);
        } catch (h) {
          console.error(`Exception in '${c}' handler '${d}':`, h);
          null !== f && this.$(f, !1, "" + h);
          return;
        }
        if (null === f) return g;
        g && g.then
          ? g
              .then((h) => this.$(f, !0, h))
              .catch((h) => {
                console.error(`Rejection from '${c}' handler '${d}':`, h);
                this.$(f, !1, "" + h);
              })
          : this.$(f, !0, g);
      } else console.warn(`[DOM] No handler '${d}' for component '${c}'`);
    else console.warn(`[DOM] No event handlers for component '${c}'`);
  }
  $(a, c, d) {
    let e;
    d && d.transferables && (e = d.transferables);
    this.U.postMessage(
      { type: "result", responseId: a, isOk: c, result: d },
      e
    );
  }
  zb(a) {
    const c = a.responseId,
      d = a.isOk;
    a = a.result;
    const e = F.get(c);
    d ? e.resolve(a) : e.reject(a);
    F.delete(c);
  }
  h(a, c, d) {
    let e = E.get(a);
    e || ((e = new Map()), E.set(a, e));
    if (e.has(c))
      throw Error(`[DOM] Component '${a}' already has handler '${c}'`);
    e.set(c, d);
  }
  static L(a) {
    if (D.includes(a)) throw Error("DOM handler already added");
    D.push(a);
  }
  Na() {
    for (const a of this.da)
      if ("runtime" === a.P) {
        this.W = a;
        return;
      }
    throw Error("cannot find runtime DOM handler");
  }
  xb(a) {
    this.ma("debugger", "message", a);
  }
  Ab() {
    for (const a of this.da) a.Ja();
  }
  static M() {
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      pa
    );
  }
  static ba(a) {
    pa = !!a;
  }
  jb(a) {
    this.Ga.push(a);
    this.ta();
  }
  ta() {
    -1 === this.G &&
      this.Ga.length &&
      (this.G = requestAnimationFrame(this.Gb));
  }
  lb() {
    -1 !== this.G && (cancelAnimationFrame(this.G), (this.G = -1));
  }
  yb() {
    this.G = -1;
    for (const a of this.Ga) a();
    this.ta();
  }
  sa() {
    this.W.sa();
  }
  ib() {
    this.Xa = !0;
  }
  bb(a) {
    return (
      /^(?:[a-z\-]+:)?\/\//.test(a) ||
      "data:" === a.substr(0, 5) ||
      "blob:" === a.substr(0, 5)
    );
  }
  eb(a) {
    return !this.bb(a);
  }
  async F(a) {
    return "cordova" === this.g &&
      (a.startsWith("file:") || (this.Aa && this.eb(a)))
      ? (a.startsWith(this.m) && (a = a.substr(this.m.length)),
        (a = await this.ia(a)),
        URL.createObjectURL(new Blob([a], { type: "application/javascript" })))
      : a;
  }
  async ub(a) {
    const c = a.filename;
    switch (a.as) {
      case "text":
        return await this.ab(c);
      case "buffer":
        return await this.ia(c);
      default:
        throw Error("unsupported type");
    }
  }
  Ka(a) {
    const c = window.cordova.file.applicationDirectory + "www/" + a;
    return new Promise((d, e) => {
      window.resolveLocalFileSystemURL(
        c,
        (f) => {
          f.file(d, e);
        },
        e
      );
    });
  }
  async ab(a) {
    a = await this.Ka(a);
    return await ka(a);
  }
  na() {
    if (A.length && !(8 <= C)) {
      C++;
      var a = A.shift();
      this.ob(a.filename, a.Qb, a.Jb);
    }
  }
  ia(a) {
    return new Promise((c, d) => {
      A.push({
        filename: a,
        Qb: (e) => {
          C--;
          this.na();
          c(e);
        },
        Jb: (e) => {
          C--;
          this.na();
          d(e);
        },
      });
      this.na();
    });
  }
  async ob(a, c, d) {
    try {
      const e = await this.Ka(a),
        f = await la(e);
      c(f);
    } catch (e) {
      d(e);
    }
  }
  ua(a) {
    if ("windows-webview2" === this.g)
      window.chrome.webview.postMessage(JSON.stringify(a));
    else if ("macos-wkwebview" === this.g)
      window.webkit.messageHandlers.C3Wrapper.postMessage(JSON.stringify(a));
    else throw Error("cannot send wrapper message");
  }
  async nb() {
    const a = [];
    for (const [c, d] of Object.entries(this.A)) a.push(this.mb(c, d));
    await Promise.all(a);
  }
  async mb(a, c) {
    if ("object" === typeof c)
      (this.A[a] = new Blob([c.str], { type: c.type })), (this.ea[a] = c.str);
    else {
      let d = await this.qb(c);
      d || (d = this.pb(c));
      this.A[a] = d;
    }
  }
  async qb(a) {
    try {
      return await (await fetch(a)).blob();
    } catch (c) {
      return (
        console.warn(
          "Failed to fetch a data: URI. Falling back to a slower workaround. This is probably because the Content Security Policy unnecessarily blocked it. Allow data: URIs in your CSP to avoid this.",
          c
        ),
        null
      );
    }
  }
  pb(a) {
    a = this.Bb(a);
    return this.kb(a.data, a.Mb);
  }
  Bb(a) {
    var c = a.indexOf(",");
    if (0 > c) throw new URIError("expected comma in data: uri");
    var d = a.substring(c + 1);
    c = a.substring(5, c).split(";");
    a = c[0] || "";
    const e = c[2];
    d = "base64" === c[1] || "base64" === e ? atob(d) : decodeURIComponent(d);
    return { Mb: a, data: d };
  }
  kb(a, c) {
    var d = a.length;
    let e = d >> 2,
      f = new Uint8Array(d),
      g = new Uint32Array(f.buffer, 0, e),
      h,
      l;
    for (l = h = 0; h < e; ++h)
      g[h] =
        a.charCodeAt(l++) |
        (a.charCodeAt(l++) << 8) |
        (a.charCodeAt(l++) << 16) |
        (a.charCodeAt(l++) << 24);
    for (d &= 3; d--; ) (f[l] = a.charCodeAt(l)), ++l;
    return new Blob([f], { type: c });
  }
};
("use strict");
const G = self.B;
function ua(b) {
  return (
    (b.sourceCapabilities && b.sourceCapabilities.firesTouchEvents) ||
    (b.originalEvent &&
      b.originalEvent.sourceCapabilities &&
      b.originalEvent.sourceCapabilities.firesTouchEvents)
  );
}
const va = new Map([
    ["OSLeft", "MetaLeft"],
    ["OSRight", "MetaRight"],
  ]),
  H = { dispatchRuntimeEvent: !0, dispatchUserScriptEvent: !0 },
  wa = { dispatchUserScriptEvent: !0 },
  I = { dispatchRuntimeEvent: !0 };
function xa(b) {
  return new Promise((a, c) => {
    const d = document.createElement("link");
    d.onload = () => a(d);
    d.onerror = (e) => c(e);
    d.rel = "stylesheet";
    d.href = b;
    document.head.appendChild(d);
  });
}
function ya(b) {
  return new Promise((a, c) => {
    const d = new Image();
    d.onload = () => a(d);
    d.onerror = (e) => c(e);
    d.src = b;
  });
}
async function J(b) {
  b = URL.createObjectURL(b);
  try {
    return await ya(b);
  } finally {
    URL.revokeObjectURL(b);
  }
}
function za(b) {
  return new Promise((a, c) => {
    let d = new FileReader();
    d.onload = (e) => a(e.target.result);
    d.onerror = (e) => c(e);
    d.readAsText(b);
  });
}
async function Aa(b, a, c) {
  if (!/firefox/i.test(navigator.userAgent)) return await J(b);
  var d = await za(b);
  d = new DOMParser().parseFromString(d, "image/svg+xml");
  const e = d.documentElement;
  if (e.hasAttribute("width") && e.hasAttribute("height")) {
    const f = e.getAttribute("width"),
      g = e.getAttribute("height");
    if (!f.includes("%") && !g.includes("%")) return await J(b);
  }
  e.setAttribute("width", a + "px");
  e.setAttribute("height", c + "px");
  d = new XMLSerializer().serializeToString(d);
  b = new Blob([d], { type: "image/svg+xml" });
  return await J(b);
}
function K(b) {
  do {
    if (b.parentNode && b.hasAttribute("contenteditable")) return !0;
    b = b.parentNode;
  } while (b);
  return !1;
}
const Ba = new Set(["input", "textarea", "datalist", "select"]),
  Fa = new Set(["canvas", "body", "html"]);
function L(b) {
  b.target.tagName &&
    Fa.has(b.target.tagName.toLowerCase()) &&
    b.preventDefault();
}
function Ga(b) {
  (b.metaKey || b.ctrlKey) && b.preventDefault();
}
self.C3_GetSvgImageSize = async function (b) {
  b = await J(b);
  if (0 < b.width && 0 < b.height) return [b.width, b.height];
  b.style.position = "absolute";
  b.style.left = "0px";
  b.style.top = "0px";
  b.style.visibility = "hidden";
  document.body.appendChild(b);
  const a = b.getBoundingClientRect();
  document.body.removeChild(b);
  return [a.width, a.height];
};
self.C3_RasterSvgImageBlob = async function (b, a, c, d, e) {
  b = await Aa(b, a, c);
  const f = document.createElement("canvas");
  f.width = d;
  f.height = e;
  f.getContext("2d").drawImage(b, 0, 0, a, c);
  return f;
};
let M = !1;
document.addEventListener("pause", () => (M = !0));
document.addEventListener("resume", () => (M = !1));
function sa(b) {
  b.Va = !0;
  b.Ca = b.i.v();
  b.T = b.i.u();
}
async function Ha(b) {
  await Promise.all(
    b.webfonts.map(async (a) => {
      a = new FontFace(a.name, `url('${a.url}')`);
      document.fonts.add(a);
      await a.load();
    })
  );
}
async function Ia(b) {
  var a = b.imageBitmapOpts;
  b = await self.C3_RasterSvgImageBlob(
    b.blob,
    b.imageWidth,
    b.imageHeight,
    b.surfaceWidth,
    b.surfaceHeight
  );
  a = a ? await createImageBitmap(b, a) : await createImageBitmap(b);
  return { imageBitmap: a, transferables: [a] };
}
async function Ja(b) {
  return await self.C3_GetSvgImageSize(b.blob);
}
function Ka(b) {
  window.c3_postToMessagePort &&
    ((b.from = "runtime"), window.c3_postToMessagePort(b));
}
function Ma(b) {
  self.setTimeout(() => {
    b.Ua = !0;
  }, 1e3);
  "cordova" === b.i.g
    ? (document.addEventListener("pause", () => O(b, !0)),
      document.addEventListener("resume", () => O(b, !1)))
    : document.addEventListener("visibilitychange", () =>
        O(b, document.hidden)
      );
  return { isSuspended: !(!document.hidden && !M) };
}
function Na(b) {
  b.Ta ||
    ((b.Ta = !0),
    window.addEventListener("deviceorientation", (a) => {
      b.l ||
        k(
          b,
          "deviceorientation",
          {
            absolute: !!a.absolute,
            alpha: a.alpha || 0,
            beta: a.beta || 0,
            gamma: a.gamma || 0,
            timeStamp: a.timeStamp,
            webkitCompassHeading: a.webkitCompassHeading,
            webkitCompassAccuracy: a.webkitCompassAccuracy,
          },
          H
        );
    }),
    window.addEventListener("deviceorientationabsolute", (a) => {
      b.l ||
        k(
          b,
          "deviceorientationabsolute",
          {
            absolute: !!a.absolute,
            alpha: a.alpha || 0,
            beta: a.beta || 0,
            gamma: a.gamma || 0,
            timeStamp: a.timeStamp,
          },
          H
        );
    }));
}
function Oa(b) {
  b.Sa ||
    ((b.Sa = !0),
    window.addEventListener("devicemotion", (a) => {
      if (!b.l) {
        var c = null,
          d = a.acceleration;
        d && (c = { x: d.x || 0, y: d.y || 0, z: d.z || 0 });
        d = null;
        var e = a.accelerationIncludingGravity;
        e && (d = { x: e.x || 0, y: e.y || 0, z: e.z || 0 });
        e = null;
        var f = a.rotationRate;
        f &&
          (e = { alpha: f.alpha || 0, beta: f.beta || 0, gamma: f.gamma || 0 });
        k(
          b,
          "devicemotion",
          {
            acceleration: c,
            accelerationIncludingGravity: d,
            rotationRate: e,
            interval: a.interval,
            timeStamp: a.timeStamp,
          },
          H
        );
      }
    }));
}
async function Pa(b) {
  await xa(b.url);
}
function Qa(b, a) {
  b.Wa = a.message;
  -1 === b.xa &&
    (b.xa = setTimeout(() => {
      b.xa = -1;
      const c = document.getElementById("exportToVideoMessage");
      c && (c.textContent = b.Wa);
    }, 250));
}
function P(b) {
  if (!b.l) {
    var a = G.M();
    a && "any" !== b.Ha && Ra(b);
    k(b, "fullscreenchange", {
      isFullscreen: a,
      innerWidth: b.v(),
      innerHeight: b.u(),
    });
  }
}
function Q(b, a) {
  console.warn("[Construct] Fullscreen request failed: ", a);
  k(b, "fullscreenerror", {
    isFullscreen: G.M(),
    innerWidth: b.v(),
    innerHeight: b.u(),
  });
}
function O(b, a) {
  a ? b.i.lb() : b.i.ta();
  k(b, "visibilitychange", { hidden: a });
}
function Sa(b, a, c) {
  "Backspace" === c.key && L(c);
  if (!b.l) {
    var d = va.get(c.code) || c.code;
    p(
      b,
      a,
      {
        code: d,
        key: c.key,
        which: c.which,
        repeat: c.repeat,
        altKey: c.altKey,
        ctrlKey: c.ctrlKey,
        metaKey: c.metaKey,
        shiftKey: c.shiftKey,
        timeStamp: c.timeStamp,
      },
      H
    );
  }
}
function R(b, a, c, d) {
  b.l ||
    ua(c) ||
    p(
      b,
      a,
      {
        button: c.button,
        buttons: c.buttons,
        clientX: c.clientX,
        clientY: c.clientY + b.s,
        pageX: c.pageX,
        pageY: c.pageY + b.s,
        movementX: c.movementX || 0,
        movementY: c.movementY || 0,
        timeStamp: c.timeStamp,
      },
      d
    );
}
function S(b) {
  window !== window.top && window.focus();
  Ta(b.target) &&
    document.activeElement &&
    !Ta(document.activeElement) &&
    document.activeElement.blur();
}
function T(b, a, c) {
  if (!b.l) {
    var d = 0;
    "mouse" === c.pointerType && (d = b.V);
    p(
      b,
      a,
      {
        pointerId: c.pointerId,
        pointerType: c.pointerType,
        button: c.button,
        buttons: c.buttons,
        lastButtons: d,
        clientX: c.clientX,
        clientY: c.clientY + b.s,
        pageX: c.pageX,
        pageY: c.pageY + b.s,
        movementX: c.movementX || 0,
        movementY: c.movementY || 0,
        width: c.width || 0,
        height: c.height || 0,
        pressure: c.pressure || 0,
        tangentialPressure: c.tangentialPressure || 0,
        tiltX: c.tiltX || 0,
        tiltY: c.tiltY || 0,
        twist: c.twist || 0,
        timeStamp: c.timeStamp,
      },
      H
    );
    "mouse" === c.pointerType &&
      ((d = "mousemove"),
      "pointerdown" === a
        ? (d = "mousedown")
        : "pointerup" === a && (d = "mouseup"),
      R(b, d, c, wa),
      (b.V = c.buttons));
  }
}
function U(b, a, c) {
  if (!b.l && !ua(c)) {
    var d = b.V;
    "pointerdown" === a && 0 !== d
      ? (a = "pointermove")
      : "pointerup" === a && 0 !== c.buttons && (a = "pointermove");
    p(
      b,
      a,
      {
        pointerId: 1,
        pointerType: "mouse",
        button: c.button,
        buttons: c.buttons,
        lastButtons: d,
        clientX: c.clientX,
        clientY: c.clientY + b.s,
        pageX: c.pageX,
        pageY: c.pageY + b.s,
        movementX: c.movementX || 0,
        movementY: c.movementY || 0,
        width: 0,
        height: 0,
        pressure: 0,
        tangentialPressure: 0,
        tiltX: 0,
        tiltY: 0,
        twist: 0,
        timeStamp: c.timeStamp,
      },
      H
    );
    b.V = c.buttons;
    R(b, c.type, c, wa);
  }
}
function V(b, a, c) {
  if (!b.l)
    for (let d = 0, e = c.changedTouches.length; d < e; ++d) {
      const f = c.changedTouches[d];
      p(
        b,
        a,
        {
          pointerId: f.identifier,
          pointerType: "touch",
          button: 0,
          buttons: 0,
          lastButtons: 0,
          clientX: f.clientX,
          clientY: f.clientY + b.s,
          pageX: f.pageX,
          pageY: f.pageY + b.s,
          movementX: c.movementX || 0,
          movementY: c.movementY || 0,
          width: 2 * (f.radiusX || f.webkitRadiusX || 0),
          height: 2 * (f.radiusY || f.webkitRadiusY || 0),
          pressure: f.force || f.webkitForce || 0,
          tangentialPressure: 0,
          tiltX: 0,
          tiltY: 0,
          twist: f.rotationAngle || 0,
          timeStamp: c.timeStamp,
        },
        H
      );
    }
}
function W(b, a, c) {
  document.body.style.transform = "";
  b.s = 0;
  if (0 < c) {
    var d = document.activeElement;
    d &&
      ((d = d.getBoundingClientRect()),
      (a = (d.top + d.bottom) / 2 - (a - c) / 2),
      a > c && (a = c),
      0 > a && (a = 0),
      0 < a &&
        ((document.body.style.transform = `translateY(${-a}px)`), (b.s = a)));
  }
}
function Ua(b, a, c, d) {
  const e = b.v(),
    f = b.u();
  b.I = -1;
  e != a || f != c
    ? k(b, "window-resize", {
        innerWidth: e,
        innerHeight: f,
        devicePixelRatio: window.devicePixelRatio,
        isFullscreen: G.M(),
      })
    : 10 > d && Va(b, e, f, d + 1);
}
function Va(b, a, c, d) {
  -1 !== b.I && clearTimeout(b.I);
  b.I = setTimeout(() => Ua(b, a, c, d), 48);
}
function Ra(b) {
  b = b.Ha;
  if (screen.orientation && screen.orientation.lock)
    screen.orientation
      .lock(b)
      .catch((a) =>
        console.warn("[Construct] Failed to lock orientation: ", a)
      );
  else
    try {
      let a = !1;
      screen.lockOrientation
        ? (a = screen.lockOrientation(b))
        : screen.webkitLockOrientation
        ? (a = screen.webkitLockOrientation(b))
        : screen.mozLockOrientation
        ? (a = screen.mozLockOrientation(b))
        : screen.msLockOrientation && (a = screen.msLockOrientation(b));
      a || console.warn("[Construct] Failed to lock orientation");
    } catch (a) {
      console.warn("[Construct] Failed to lock orientation: ", a);
    }
}
function Ta(b) {
  return (
    !b ||
    b === document ||
    b === window ||
    b === document.body ||
    "canvas" === b.tagName.toLowerCase()
  );
}
G.L(
  class extends self.Z {
    constructor(b) {
      super(b, "runtime");
      this.Ya = !0;
      this.Va = !1;
      this.I = -1;
      this.Ha = "any";
      this.Sa = this.Ta = !1;
      this.fa = document.createElement("div");
      this.fa.className = "c3-screen-reader-text";
      this.fa.setAttribute("aria-live", "polite");
      document.body.appendChild(this.fa);
      this.D = null;
      this.l = !1;
      this.Wa = "";
      this.xa = -1;
      this.Ua = !1;
      this.Ca = b.v();
      this.T = b.u();
      this.s = this.X = 0;
      b.h("canvas", "update-size", (d) => {
        var e = this.i;
        e.Xa ||
          ((e = e.j),
          (e.style.width = d.styleWidth + "px"),
          (e.style.height = d.styleHeight + "px"),
          (e.style.marginLeft = d.marginLeft + "px"),
          (e.style.marginTop = d.marginTop + "px"),
          document.documentElement.style.setProperty(
            "--construct-scale",
            d.displayScale
          ),
          this.Ya && ((e.style.display = ""), (this.Ya = !1)));
      });
      b.h("runtime", "invoke-download", (d) => {
        const e = d.url;
        d = d.filename;
        const f = document.createElement("a"),
          g = document.body;
        f.textContent = d;
        f.href = e;
        f.download = d;
        g.appendChild(f);
        f.click();
        g.removeChild(f);
      });
      b.h("runtime", "load-webfonts", (d) => Ha(d));
      b.h("runtime", "raster-svg-image", (d) => Ia(d));
      b.h("runtime", "get-svg-image-size", (d) => Ja(d));
      b.h("runtime", "set-target-orientation", (d) => {
        this.Ha = d.targetOrientation;
      });
      b.h("runtime", "register-sw", () => {
        window.C3_RegisterSW && window.C3_RegisterSW();
      });
      b.h("runtime", "post-to-debugger", (d) => Ka(d));
      b.h("runtime", "go-to-script", (d) => Ka(d));
      b.h("runtime", "before-start-ticking", () => Ma(this));
      b.h("runtime", "debug-highlight", (d) => {
        if (d.show) {
          this.D ||
            ((this.D = document.createElement("div")),
            (this.D.id = "inspectOutline"),
            document.body.appendChild(this.D));
          var e = this.D;
          e.style.display = "";
          e.style.left = d.left - 1 + "px";
          e.style.top = d.top - 1 + "px";
          e.style.width = d.width + 2 + "px";
          e.style.height = d.height + 2 + "px";
          e.textContent = d.name;
        } else this.D && (this.D.style.display = "none");
      });
      b.h("runtime", "enable-device-orientation", () => Na(this));
      b.h("runtime", "enable-device-motion", () => Oa(this));
      b.h("runtime", "add-stylesheet", (d) => Pa(d));
      b.h("runtime", "script-create-worker", (d) => {
        const e = d.port2;
        new Worker(d.url, d.opts).postMessage(
          { type: "construct-worker-init", port2: e },
          [e]
        );
      });
      b.h("runtime", "alert", (d) => this.qa(d));
      b.h("runtime", "screen-reader-text", (d) => {
        var e = d.type;
        "create" === e
          ? ((e = document.createElement("p")),
            (e.id = "c3-sr-" + d.id),
            (e.textContent = d.text),
            this.fa.appendChild(e))
          : "update" === e
          ? (e = document.getElementById("c3-sr-" + d.id))
            ? (e.textContent = d.text)
            : console.warn(
                `[Construct] Missing screen reader text with id ${d.id}`
              )
          : "release" === e
          ? (e = document.getElementById("c3-sr-" + d.id))
            ? e.remove()
            : console.warn(
                `[Construct] Missing screen reader text with id ${d.id}`
              )
          : console.warn(
              `[Construct] Unknown screen reader text update '${e}'`
            );
      });
      b.h("runtime", "hide-cordova-splash", () => {
        navigator.splashscreen &&
          navigator.splashscreen.hide &&
          navigator.splashscreen.hide();
      });
      b.h("runtime", "set-exporting-to-video", (d) => {
        this.l = !0;
        const e = document.createElement("h1");
        e.id = "exportToVideoMessage";
        e.textContent = d.message;
        document.body.prepend(e);
        document.body.classList.add("exportingToVideo");
        this.i.j.style.display = "";
        this.i.ib();
      });
      b.h("runtime", "export-to-video-progress", (d) => Qa(this, d));
      b.h("runtime", "exported-to-video", (d) => {
        window.Hb({ type: "exported-video", blob: d.blob, time: d.time });
      });
      b.h("runtime", "exported-to-image-sequence", (d) => {
        window.Hb({
          type: "exported-image-sequence",
          blobArr: d.blobArr,
          time: d.time,
          gif: d.gif,
        });
      });
      const a = new Set(["input", "textarea", "datalist"]);
      window.addEventListener("contextmenu", (d) => {
        const e = d.target;
        a.has(e.tagName.toLowerCase()) || K(e) || d.preventDefault();
      });
      const c = b.j;
      window.addEventListener("selectstart", L);
      window.addEventListener("gesturehold", L);
      c.addEventListener("selectstart", L);
      c.addEventListener("gesturehold", L);
      window.addEventListener("touchstart", L, { passive: !1 });
      "undefined" !== typeof PointerEvent
        ? (window.addEventListener("pointerdown", L, { passive: !1 }),
          c.addEventListener("pointerdown", L))
        : c.addEventListener("touchstart", L);
      this.V = 0;
      window.addEventListener("mousedown", (d) => {
        1 === d.button && d.preventDefault();
      });
      window.addEventListener("mousewheel", Ga, { passive: !1 });
      window.addEventListener("wheel", Ga, { passive: !1 });
      window.addEventListener("resize", () => {
        a: {
          if (!this.l && this.Va) {
            var d = this.v();
            var e = this.u();
            if (this.i.Ma()) {
              if (this.Ua) {
                if (this.Ca === d && e < this.T) {
                  this.X = this.T - e;
                  W(this, this.T, this.X);
                  d = void 0;
                  break a;
                }
                0 < this.X && ((this.X = 0), W(this, e, this.X));
              }
              this.Ca = d;
              this.T = e;
            }
            k(this, "window-resize", {
              innerWidth: d,
              innerHeight: e,
              devicePixelRatio: window.devicePixelRatio,
              isFullscreen: G.M(),
            });
            this.i.la() &&
              (-1 !== this.I && clearTimeout(this.I), Ua(this, d, e, 0));
          }
          d = void 0;
        }
        return d;
      });
      window.addEventListener("fullscreenchange", () => P(this));
      window.addEventListener("webkitfullscreenchange", () => P(this));
      window.addEventListener("mozfullscreenchange", () => P(this));
      window.addEventListener("fullscreenerror", (d) => Q(this, d));
      window.addEventListener("webkitfullscreenerror", (d) => Q(this, d));
      window.addEventListener("mozfullscreenerror", (d) => Q(this, d));
      if (b.la())
        if (window.visualViewport) {
          let d = Infinity;
          window.visualViewport.addEventListener("resize", () => {
            const e = window.visualViewport.height;
            e > d && (document.scrollingElement.scrollTop = 0);
            d = e;
          });
        } else
          window.addEventListener("focusout", () => {
            {
              const f = document.activeElement;
              if (f) {
                var d = f.tagName.toLowerCase();
                var e = new Set(
                  "email number password search tel text url".split(" ")
                );
                d =
                  "textarea" === d
                    ? !0
                    : "input" === d
                    ? e.has(f.type.toLowerCase() || "text")
                    : K(f);
              } else d = !1;
            }
            d || (document.scrollingElement.scrollTop = 0);
          });
      self.C3WrapperOnMessage = (d) => {
        "entered-fullscreen" === d
          ? (G.ba(!0), P(this))
          : "exited-fullscreen" === d
          ? (G.ba(!1), P(this))
          : console.warn("Unknown wrapper message: ", d);
      };
      this.Ea = new Set();
      this.Fb = new WeakSet();
      this.Db = !1;
    }
    Ja() {
      window.addEventListener("focus", () => {
        k(this, "window-focus", null, I);
      });
      window.addEventListener("blur", () => {
        try {
          var a = window.parent && window.parent.document.hasFocus();
        } catch (c) {
          a = !1;
        }
        k(this, "window-blur", { parentHasFocus: a }, I);
        this.V = 0;
      });
      window.addEventListener("focusin", (a) => {
        a = a.target;
        (Ba.has(a.tagName.toLowerCase()) || K(a)) &&
          k(this, "keyboard-blur", null, I);
      });
      window.addEventListener("keydown", (a) => Sa(this, "keydown", a));
      window.addEventListener("keyup", (a) => Sa(this, "keyup", a));
      window.addEventListener("dblclick", (a) => R(this, "dblclick", a, H));
      window.addEventListener("wheel", (a) => {
        this.l ||
          k(
            this,
            "wheel",
            {
              clientX: a.clientX,
              clientY: a.clientY + this.s,
              pageX: a.pageX,
              pageY: a.pageY + this.s,
              deltaX: a.deltaX,
              deltaY: a.deltaY,
              deltaZ: a.deltaZ,
              deltaMode: a.deltaMode,
              timeStamp: a.timeStamp,
            },
            H
          );
      });
      "undefined" !== typeof PointerEvent
        ? (window.addEventListener("pointerdown", (a) => {
            S(a);
            T(this, "pointerdown", a);
          }),
          this.i.o &&
          "undefined" !== typeof window.onpointerrawupdate &&
          self === self.top
            ? window.addEventListener("pointerrawupdate", (a) => {
                T(this, "pointermove", a);
              })
            : window.addEventListener("pointermove", (a) =>
                T(this, "pointermove", a)
              ),
          window.addEventListener("pointerup", (a) => T(this, "pointerup", a)),
          window.addEventListener("pointercancel", (a) =>
            T(this, "pointercancel", a)
          ))
        : (window.addEventListener("mousedown", (a) => {
            S(a);
            U(this, "pointerdown", a);
          }),
          window.addEventListener("mousemove", (a) =>
            U(this, "pointermove", a)
          ),
          window.addEventListener("mouseup", (a) => U(this, "pointerup", a)),
          window.addEventListener("touchstart", (a) => {
            S(a);
            V(this, "pointerdown", a);
          }),
          window.addEventListener("touchmove", (a) =>
            V(this, "pointermove", a)
          ),
          window.addEventListener("touchend", (a) => V(this, "pointerup", a)),
          window.addEventListener("touchcancel", (a) =>
            V(this, "pointercancel", a)
          ));
      const b = () => this.sa();
      window.addEventListener("pointerup", b, !0);
      window.addEventListener("touchend", b, !0);
      window.addEventListener("click", b, !0);
      window.addEventListener("keydown", b, !0);
      window.addEventListener("gamepadconnected", b, !0);
      this.i.cb() &&
        !this.i.Ma() &&
        navigator.virtualKeyboard &&
        ((navigator.virtualKeyboard.overlaysContent = !0),
        navigator.virtualKeyboard.addEventListener("geometrychange", () => {
          W(this, this.u(), navigator.virtualKeyboard.boundingRect.height);
        }));
    }
    v() {
      return this.i.v();
    }
    u() {
      return this.i.u();
    }
    sa() {
      var b = [...this.Ea];
      this.Ea.clear();
      if (!this.Db)
        for (const a of b)
          (b = a.play()) &&
            b.catch(() => {
              this.Fb.has(a) || this.Ea.add(a);
            });
    }
    qa(b) {
      alert(b.message);
    }
  }
);
("use strict");
async function qa(b) {
  if (b.Cb) throw Error("already initialised");
  b.Cb = !0;
  var a = b.C.pa(("playable-ad" === b.C.g ? b.C.H : "") + "dispatchworker.js");
  b.va = await b.C.ka(a, b.O, { name: "DispatchWorker" });
  a = new MessageChannel();
  b.za = a.port1;
  b.va.postMessage({ type: "_init", "in-port": a.port2 }, [a.port2]);
  b.Fa = await ta(b);
}
function ra(b) {
  return [b.za, b.Fa];
}
async function ta(b) {
  const a = b.Za.length;
  var c = b.C.pa(("playable-ad" === b.C.g ? b.C.H : "") + "jobworker.js");
  c = await b.C.ka(c, b.O, { name: "JobWorker" + a });
  const d = new MessageChannel(),
    e = new MessageChannel();
  b.va.postMessage({ type: "_addJobWorker", port: d.port1 }, [d.port1]);
  c.postMessage(
    {
      type: "init",
      number: a,
      "dispatch-port": d.port2,
      "output-port": e.port2,
    },
    [d.port2, e.port2]
  );
  b.Za.push(c);
  return e.port1;
}
self.gb = class {
  constructor(b) {
    this.C = b;
    this.O = b.m;
    this.O = "preview" === b.g ? this.O + "workers/" : this.O + b.H;
    this.Eb = Math.min(navigator.hardwareConcurrency || 2, 16);
    this.va = null;
    this.Za = [];
    this.Fa = this.za = null;
  }
};
("use strict");
window.C3_IsSupported &&
  (window.c3_runtimeInterface = new self.B({
    Rb: !0,
    Sb: "workermain.js",
    K: ["scripts/c3runtime.js"],
    ga: [],
    Ia: "",
    Ob: "scripts/",
    ha: ["box2d.wasm.js"],
    $a: "html5",
  }));
("use strict");
function X(b) {
  b.stopPropagation();
}
self.B.L(
  class extends self.La {
    constructor(b) {
      super(b, "button");
    }
    ja(b, a) {
      const c = document.createElement("input");
      var d = c;
      a.isCheckbox
        ? ((c.type = "checkbox"),
          (d = document.createElement("label")),
          d.appendChild(c),
          d.appendChild(document.createTextNode("")),
          (d.style.fontFamily = "sans-serif"),
          (d.style.userSelect = "none"),
          (d.style.webkitUserSelect = "none"),
          (d.style.display = "inline-block"),
          (d.style.color = "black"))
        : (c.type = "button");
      d.style.position = "absolute";
      d.addEventListener("pointerdown", X);
      d.addEventListener("pointermove", X);
      d.addEventListener("pointerrawupdate", X);
      d.addEventListener("pointerup", X);
      d.addEventListener("mousedown", X);
      d.addEventListener("mouseup", X);
      d.addEventListener("keydown", X);
      d.addEventListener("keyup", X);
      c.addEventListener("click", () =>
        w(this, "click", b, { isChecked: c.checked })
      );
      a.id && (c.id = a.id);
      a.className && (c.className = a.className);
      this.N(d, a);
      return d;
    }
    oa(b) {
      return "input" === b.tagName.toLowerCase() ? b : b.firstChild;
    }
    N(b, a) {
      const c = "input" === b.tagName.toLowerCase() ? b : b.firstChild;
      c.checked = a.isChecked;
      c.disabled = !a.isEnabled;
      b.title = a.title;
      b === c ? (c.value = a.text) : (b.lastChild.textContent = a.text);
    }
  }
);
("use strict");
function Y(b) {
  b.stopPropagation();
}
function Wa(b) {
  13 !== b.which && 27 !== b.which && b.stopPropagation();
}
self.B.L(
  class extends self.La {
    constructor(b) {
      super(b, "text-input");
      u(this, "scroll-to-bottom", (a) => {
        a.scrollTop = a.scrollHeight;
      });
    }
    ja(b, a) {
      let c;
      const d = a.type;
      "textarea" === d
        ? ((c = document.createElement("textarea")), (c.style.resize = "none"))
        : ((c = document.createElement("input")), (c.type = d));
      c.style.position = "absolute";
      c.autocomplete = "off";
      c.addEventListener("pointerdown", Y);
      c.addEventListener("pointermove", Y);
      c.addEventListener("pointerrawupdate", Y);
      c.addEventListener("pointerup", Y);
      c.addEventListener("mousedown", Y);
      c.addEventListener("mouseup", Y);
      c.addEventListener("keydown", Wa);
      c.addEventListener("keyup", Wa);
      c.addEventListener("click", (e) => {
        e.stopPropagation();
        w(this, "click", b);
      });
      c.addEventListener("dblclick", (e) => {
        e.stopPropagation();
        w(this, "dblclick", b);
      });
      c.addEventListener("input", () =>
        t(this, "change", b, { text: c.value })
      );
      a.id && (c.id = a.id);
      a.className && (c.className = a.className);
      this.N(c, a);
      return c;
    }
    N(b, a) {
      b.value = a.text;
      b.placeholder = a.placeholder;
      b.title = a.title;
      b.disabled = !a.isEnabled;
      b.readOnly = a.isReadOnly;
      b.spellcheck = a.spellCheck;
      a = a.maxLength;
      0 > a ? b.removeAttribute("maxlength") : b.setAttribute("maxlength", a);
    }
  }
);
("use strict");
async function Xa(b, a) {
  a = a.type;
  let c = !0;
  0 === a ? (c = await Ya()) : 1 === a && (c = await Za());
  k(b, "permission-result", { type: a, result: c });
}
async function Ya() {
  if (
    !self.DeviceOrientationEvent ||
    !self.DeviceOrientationEvent.requestPermission
  )
    return !0;
  try {
    return (
      "granted" === (await self.DeviceOrientationEvent.requestPermission())
    );
  } catch (b) {
    return (
      console.warn("[Touch] Failed to request orientation permission: ", b), !1
    );
  }
}
async function Za() {
  if (!self.DeviceMotionEvent || !self.DeviceMotionEvent.requestPermission)
    return !0;
  try {
    return "granted" === (await self.DeviceMotionEvent.requestPermission());
  } catch (b) {
    return console.warn("[Touch] Failed to request motion permission: ", b), !1;
  }
}
self.B.L(
  class extends self.Z {
    constructor(b) {
      super(b, "touch");
      q(this, "request-permission", (a) => Xa(this, a));
    }
  }
);
("use strict");
function $a() {}
function ab(b) {
  window.C3_RegisterSW &&
    window.OfflineClientInfo &&
    window.OfflineClientInfo.SetMessageCallback((a) =>
      k(b, "sw-message", a.data)
    );
}
function bb(b) {
  b = b.orientation;
  if (screen.orientation && screen.orientation.lock)
    screen.orientation
      .lock(b)
      .catch((a) =>
        console.warn("[Construct] Failed to lock orientation: ", a)
      );
  else
    try {
      let a = !1;
      screen.lockOrientation
        ? (a = screen.lockOrientation(b))
        : screen.webkitLockOrientation
        ? (a = screen.webkitLockOrientation(b))
        : screen.mozLockOrientation
        ? (a = screen.mozLockOrientation(b))
        : screen.msLockOrientation && (a = screen.msLockOrientation(b));
      a || console.warn("[Construct] Failed to lock orientation");
    } catch (a) {
      console.warn("[Construct] Failed to lock orientation: ", a);
    }
}
self.B.L(
  class extends self.Z {
    constructor(b) {
      super(b, "browser");
      this.g = "";
      r(this, [
        [
          "get-initial-state",
          (a) => {
            this.g = a.exportType;
            return {
              location: location.toString(),
              isOnline: !!navigator.onLine,
              referrer: document.referrer,
              title: document.title,
              isCookieEnabled: !!navigator.cookieEnabled,
              screenWidth: screen.width,
              screenHeight: screen.height,
              windowOuterWidth: window.outerWidth,
              windowOuterHeight: window.outerHeight,
              isConstructArcade: "undefined" !== typeof window.is_scirra_arcade,
            };
          },
        ],
        ["ready-for-sw-messages", () => ab(this)],
        ["alert", (a) => this.qa(a)],
        [
          "close",
          () => {
            navigator.app && navigator.app.exitApp
              ? navigator.app.exitApp()
              : navigator.device && navigator.device.exitApp
              ? navigator.device.exitApp()
              : window.close();
          },
        ],
        ["set-focus", (a) => this.ra(a)],
        [
          "vibrate",
          (a) => {
            navigator.vibrate && navigator.vibrate(a.pattern);
          },
        ],
        ["lock-orientation", (a) => bb(a)],
        [
          "unlock-orientation",
          () => {
            try {
              screen.orientation && screen.orientation.unlock
                ? screen.orientation.unlock()
                : screen.unlockOrientation
                ? screen.unlockOrientation()
                : screen.webkitUnlockOrientation
                ? screen.webkitUnlockOrientation()
                : screen.mozUnlockOrientation
                ? screen.mozUnlockOrientation()
                : screen.msUnlockOrientation && screen.msUnlockOrientation();
            } catch (a) {}
          },
        ],
        [
          "navigate",
          (a) => {
            var c = a.type;
            if ("back" === c)
              navigator.app && navigator.app.backHistory
                ? navigator.app.backHistory()
                : window.history.back();
            else if ("forward" === c) window.history.forward();
            else if ("reload" === c) location.reload();
            else if ("url" === c) {
              c = a.url;
              const d = a.target;
              a = a.exportType;
              self.cordova && self.cordova.InAppBrowser
                ? self.cordova.InAppBrowser.open(c, "_system")
                : "preview" === a || "windows-webview2" === a
                ? window.open(c, "_blank")
                : this.Xb ||
                  (2 === d
                    ? (window.top.location = c)
                    : 1 === d
                    ? (window.parent.location = c)
                    : (window.location = c));
            } else
              "new-window" === c &&
                ((c = a.url),
                (a = a.tag),
                self.cordova && self.cordova.InAppBrowser
                  ? self.cordova.InAppBrowser.open(c, "_system")
                  : window.open(c, a));
          },
        ],
        [
          "request-fullscreen",
          (a) => {
            if ("windows-webview2" === this.g || "macos-wkwebview" === this.g)
              self.B.ba(!0),
                this.i.ua({ type: "set-fullscreen", fullscreen: !0 });
            else {
              const c = { navigationUI: "auto" };
              a = a.navUI;
              1 === a
                ? (c.navigationUI = "hide")
                : 2 === a && (c.navigationUI = "show");
              a = document.documentElement;
              let d;
              a.requestFullscreen
                ? (d = a.requestFullscreen(c))
                : a.mozRequestFullScreen
                ? (d = a.mozRequestFullScreen(c))
                : a.msRequestFullscreen
                ? (d = a.msRequestFullscreen(c))
                : a.webkitRequestFullScreen &&
                  (d =
                    "undefined" !== typeof Element.ALLOW_KEYBOARD_INPUT
                      ? a.webkitRequestFullScreen(Element.ALLOW_KEYBOARD_INPUT)
                      : a.webkitRequestFullScreen());
              d instanceof Promise && d.catch($a);
            }
          },
        ],
        [
          "exit-fullscreen",
          () => {
            if ("windows-webview2" === this.g || "macos-wkwebview" === this.g)
              self.B.ba(!1),
                this.i.ua({ type: "set-fullscreen", fullscreen: !1 });
            else {
              let a;
              document.exitFullscreen
                ? (a = document.exitFullscreen())
                : document.mozCancelFullScreen
                ? (a = document.mozCancelFullScreen())
                : document.msExitFullscreen
                ? (a = document.msExitFullscreen())
                : document.webkitCancelFullScreen &&
                  (a = document.webkitCancelFullScreen());
              a instanceof Promise && a.catch($a);
            }
          },
        ],
        [
          "set-hash",
          (a) => {
            location.hash = a.hash;
          },
        ],
        [
          "set-document-css-style",
          (a) => {
            const c = a.prop,
              d = a.value;
            var e = a.selector;
            a = a["is-all"];
            try {
              if (e)
                if (a) var f = Array.from(document.querySelectorAll(e));
                else {
                  var g = document.querySelector(e);
                  f = g ? [g] : [];
                }
              else f = [document.documentElement];
              e = f;
              for (const h of e)
                c.startsWith("--")
                  ? h.style.setProperty(c, d)
                  : (h.style[c] = d);
            } catch (h) {
              console.warn("[Browser] Failed to set style: ", h);
            }
          },
        ],
        [
          "get-document-css-style",
          (a) => {
            {
              const d = a.prop;
              a = a.selector;
              try {
                const e = document.querySelector(a);
                var c = e
                  ? {
                      isOk: !0,
                      result: window.getComputedStyle(e).getPropertyValue(d),
                    }
                  : { isOk: !1 };
              } catch (e) {
                console.warn("[Browser] Failed to get style: ", e),
                  (c = { isOk: !1 });
              }
            }
            return c;
          },
        ],
      ]);
      window.addEventListener("online", () => {
        k(this, "online-state", { isOnline: !0 });
      });
      window.addEventListener("offline", () => {
        k(this, "online-state", { isOnline: !1 });
      });
      window.addEventListener("hashchange", () => {
        k(this, "hashchange", { location: location.toString() });
      });
      document.addEventListener("backbutton", () => {
        k(this, "backbutton");
      });
    }
    qa(b) {
      alert(b.message);
    }
    ra(b) {
      b = b.isFocus;
      if ("nwjs" === this.g) {
        const a = "nwjs" === this.g ? nw.Window.get() : null;
        b ? a.focus() : a.blur();
      } else b ? window.focus() : window.blur();
    }
  }
);
