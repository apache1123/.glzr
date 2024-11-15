(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const s of document.querySelectorAll('link[rel="modulepreload"]')) r(s);
  new MutationObserver((s) => {
    for (const i of s)
      if (i.type === "childList")
        for (const a of i.addedNodes)
          a.tagName === "LINK" && a.rel === "modulepreload" && r(a);
  }).observe(document, { childList: !0, subtree: !0 });
  function n(s) {
    const i = {};
    return (
      s.integrity && (i.integrity = s.integrity),
      s.referrerPolicy && (i.referrerPolicy = s.referrerPolicy),
      s.crossOrigin === "use-credentials"
        ? (i.credentials = "include")
        : s.crossOrigin === "anonymous"
          ? (i.credentials = "omit")
          : (i.credentials = "same-origin"),
      i
    );
  }
  function r(s) {
    if (s.ep) return;
    s.ep = !0;
    const i = n(s);
    fetch(s.href, i);
  }
})();
const wa = (t, e) => t === e,
  at = Symbol("solid-proxy"),
  br = Symbol("solid-track"),
  En = { equals: wa };
let js = Ys;
const Qe = 1,
  Cn = 2,
  Hs = { owned: null, cleanups: null, context: null, owner: null };
var te = null;
let or = null,
  va = null,
  Y = null,
  oe = null,
  Le = null,
  Qn = 0;
function kn(t, e) {
  const n = Y,
    r = te,
    s = t.length === 0,
    i = e === void 0 ? r : e,
    a = s
      ? Hs
      : {
          owned: null,
          cleanups: null,
          context: i ? i.context : null,
          owner: i,
        },
    o = s ? t : () => t(() => bt(() => Xn(a)));
  (te = a), (Y = null);
  try {
    return Ot(o, !0);
  } finally {
    (Y = n), (te = r);
  }
}
function Zr(t, e) {
  e = e ? Object.assign({}, En, e) : En;
  const n = {
      value: t,
      observers: null,
      observerSlots: null,
      comparator: e.equals || void 0,
    },
    r = (s) => (typeof s == "function" && (s = s(n.value)), Gs(n, s));
  return [qs.bind(n), r];
}
function Ve(t, e, n) {
  const r = Vr(t, e, !1, Qe);
  an(r);
}
function _a(t, e, n) {
  js = xa;
  const r = Vr(t, e, !1, Qe);
  (r.user = !0), Le ? Le.push(r) : an(r);
}
function be(t, e, n) {
  n = n ? Object.assign({}, En, n) : En;
  const r = Vr(t, e, !0, 0);
  return (
    (r.observers = null),
    (r.observerSlots = null),
    (r.comparator = n.equals || void 0),
    an(r),
    qs.bind(r)
  );
}
function ba(t) {
  return Ot(t, !1);
}
function bt(t) {
  if (Y === null) return t();
  const e = Y;
  Y = null;
  try {
    return t();
  } finally {
    Y = e;
  }
}
function ka(t) {
  return (
    te === null ||
      (te.cleanups === null ? (te.cleanups = [t]) : te.cleanups.push(t)),
    t
  );
}
function kr() {
  return Y;
}
function qs() {
  if (this.sources && this.state)
    if (this.state === Qe) an(this);
    else {
      const t = oe;
      (oe = null), Ot(() => Mn(this), !1), (oe = t);
    }
  if (Y) {
    const t = this.observers ? this.observers.length : 0;
    Y.sources
      ? (Y.sources.push(this), Y.sourceSlots.push(t))
      : ((Y.sources = [this]), (Y.sourceSlots = [t])),
      this.observers
        ? (this.observers.push(Y),
          this.observerSlots.push(Y.sources.length - 1))
        : ((this.observers = [Y]),
          (this.observerSlots = [Y.sources.length - 1]));
  }
  return this.value;
}
function Gs(t, e, n) {
  let r = t.value;
  return (
    (!t.comparator || !t.comparator(r, e)) &&
      ((t.value = e),
      t.observers &&
        t.observers.length &&
        Ot(() => {
          for (let s = 0; s < t.observers.length; s += 1) {
            const i = t.observers[s],
              a = or && or.running;
            a && or.disposed.has(i),
              (a ? !i.tState : !i.state) &&
                (i.pure ? oe.push(i) : Le.push(i), i.observers && Js(i)),
              a || (i.state = Qe);
          }
          if (oe.length > 1e6) throw ((oe = []), new Error());
        }, !1)),
    e
  );
}
function an(t) {
  if (!t.fn) return;
  Xn(t);
  const e = Qn;
  Sa(t, t.value, e);
}
function Sa(t, e, n) {
  let r;
  const s = te,
    i = Y;
  Y = te = t;
  try {
    r = t.fn(e);
  } catch (a) {
    return (
      t.pure &&
        ((t.state = Qe), t.owned && t.owned.forEach(Xn), (t.owned = null)),
      (t.updatedAt = n + 1),
      Bs(a)
    );
  } finally {
    (Y = i), (te = s);
  }
  (!t.updatedAt || t.updatedAt <= n) &&
    (t.updatedAt != null && "observers" in t ? Gs(t, r) : (t.value = r),
    (t.updatedAt = n));
}
function Vr(t, e, n, r = Qe, s) {
  const i = {
    fn: t,
    state: r,
    updatedAt: null,
    owned: null,
    sources: null,
    sourceSlots: null,
    cleanups: null,
    value: e,
    owner: te,
    context: te ? te.context : null,
    pure: n,
  };
  return (
    te === null ||
      (te !== Hs && (te.owned ? te.owned.push(i) : (te.owned = [i]))),
    i
  );
}
function Nn(t) {
  if (t.state === 0) return;
  if (t.state === Cn) return Mn(t);
  if (t.suspense && bt(t.suspense.inFallback))
    return t.suspense.effects.push(t);
  const e = [t];
  for (; (t = t.owner) && (!t.updatedAt || t.updatedAt < Qn); )
    t.state && e.push(t);
  for (let n = e.length - 1; n >= 0; n--)
    if (((t = e[n]), t.state === Qe)) an(t);
    else if (t.state === Cn) {
      const r = oe;
      (oe = null), Ot(() => Mn(t, e[0]), !1), (oe = r);
    }
}
function Ot(t, e) {
  if (oe) return t();
  let n = !1;
  e || (oe = []), Le ? (n = !0) : (Le = []), Qn++;
  try {
    const r = t();
    return Ta(n), r;
  } catch (r) {
    n || (Le = null), (oe = null), Bs(r);
  }
}
function Ta(t) {
  if ((oe && (Ys(oe), (oe = null)), t)) return;
  const e = Le;
  (Le = null), e.length && Ot(() => js(e), !1);
}
function Ys(t) {
  for (let e = 0; e < t.length; e++) Nn(t[e]);
}
function xa(t) {
  let e,
    n = 0;
  for (e = 0; e < t.length; e++) {
    const r = t[e];
    r.user ? (t[n++] = r) : Nn(r);
  }
  for (e = 0; e < n; e++) Nn(t[e]);
}
function Mn(t, e) {
  t.state = 0;
  for (let n = 0; n < t.sources.length; n += 1) {
    const r = t.sources[n];
    if (r.sources) {
      const s = r.state;
      s === Qe
        ? r !== e && (!r.updatedAt || r.updatedAt < Qn) && Nn(r)
        : s === Cn && Mn(r, e);
    }
  }
}
function Js(t) {
  for (let e = 0; e < t.observers.length; e += 1) {
    const n = t.observers[e];
    n.state ||
      ((n.state = Cn), n.pure ? oe.push(n) : Le.push(n), n.observers && Js(n));
  }
}
function Xn(t) {
  let e;
  if (t.sources)
    for (; t.sources.length; ) {
      const n = t.sources.pop(),
        r = t.sourceSlots.pop(),
        s = n.observers;
      if (s && s.length) {
        const i = s.pop(),
          a = n.observerSlots.pop();
        r < s.length &&
          ((i.sourceSlots[a] = r), (s[r] = i), (n.observerSlots[r] = a));
      }
    }
  if (t.owned) {
    for (e = t.owned.length - 1; e >= 0; e--) Xn(t.owned[e]);
    t.owned = null;
  }
  if (t.cleanups) {
    for (e = t.cleanups.length - 1; e >= 0; e--) t.cleanups[e]();
    t.cleanups = null;
  }
  t.state = 0;
}
function Oa(t) {
  return t instanceof Error
    ? t
    : new Error(typeof t == "string" ? t : "Unknown error", { cause: t });
}
function Bs(t, e = te) {
  throw Oa(t);
}
const Ea = Symbol("fallback");
function Xr(t) {
  for (let e = 0; e < t.length; e++) t[e]();
}
function Ca(t, e, n = {}) {
  let r = [],
    s = [],
    i = [],
    a = 0,
    o = e.length > 1 ? [] : null;
  return (
    ka(() => Xr(i)),
    () => {
      let l = t() || [],
        u,
        c;
      return (
        l[br],
        bt(() => {
          let w = l.length,
            h,
            $,
            ne,
            X,
            ue,
            ee,
            P,
            se,
            ce;
          if (w === 0)
            a !== 0 &&
              (Xr(i), (i = []), (r = []), (s = []), (a = 0), o && (o = [])),
              n.fallback &&
                ((r = [Ea]),
                (s[0] = kn((Te) => ((i[0] = Te), n.fallback()))),
                (a = 1));
          else if (a === 0) {
            for (s = new Array(w), c = 0; c < w; c++)
              (r[c] = l[c]), (s[c] = kn(d));
            a = w;
          } else {
            for (
              ne = new Array(w),
                X = new Array(w),
                o && (ue = new Array(w)),
                ee = 0,
                P = Math.min(a, w);
              ee < P && r[ee] === l[ee];
              ee++
            );
            for (
              P = a - 1, se = w - 1;
              P >= ee && se >= ee && r[P] === l[se];
              P--, se--
            )
              (ne[se] = s[P]), (X[se] = i[P]), o && (ue[se] = o[P]);
            for (h = new Map(), $ = new Array(se + 1), c = se; c >= ee; c--)
              (ce = l[c]),
                (u = h.get(ce)),
                ($[c] = u === void 0 ? -1 : u),
                h.set(ce, c);
            for (u = ee; u <= P; u++)
              (ce = r[u]),
                (c = h.get(ce)),
                c !== void 0 && c !== -1
                  ? ((ne[c] = s[u]),
                    (X[c] = i[u]),
                    o && (ue[c] = o[u]),
                    (c = $[c]),
                    h.set(ce, c))
                  : i[u]();
            for (c = ee; c < w; c++)
              c in ne
                ? ((s[c] = ne[c]),
                  (i[c] = X[c]),
                  o && ((o[c] = ue[c]), o[c](c)))
                : (s[c] = kn(d));
            (s = s.slice(0, (a = w))), (r = l.slice(0));
          }
          return s;
        })
      );
      function d(w) {
        if (((i[c] = w), o)) {
          const [h, $] = Zr(c);
          return (o[c] = $), e(l[c], h);
        }
        return e(l[c]);
      }
    }
  );
}
function A(t, e) {
  return bt(() => t(e || {}));
}
const Na = (t) => `Stale read from <${t}>.`;
function Pr(t) {
  const e = "fallback" in t && { fallback: () => t.fallback };
  return be(Ca(() => t.each, t.children, e || void 0));
}
function er(t) {
  const e = t.keyed,
    n = be(() => t.when, void 0, {
      equals: (r, s) => (e ? r === s : !r == !s),
    });
  return be(
    () => {
      const r = n();
      if (r) {
        const s = t.children;
        return typeof s == "function" && s.length > 0
          ? bt(() =>
              s(
                e
                  ? r
                  : () => {
                      if (!bt(n)) throw Na("Show");
                      return t.when;
                    },
              ),
            )
          : s;
      }
      return t.fallback;
    },
    void 0,
    void 0,
  );
}
function Ma(t, e, n) {
  let r = n.length,
    s = e.length,
    i = r,
    a = 0,
    o = 0,
    l = e[s - 1].nextSibling,
    u = null;
  for (; a < s || o < i; ) {
    if (e[a] === n[o]) {
      a++, o++;
      continue;
    }
    for (; e[s - 1] === n[i - 1]; ) s--, i--;
    if (s === a) {
      const c = i < r ? (o ? n[o - 1].nextSibling : n[i - o]) : l;
      for (; o < i; ) t.insertBefore(n[o++], c);
    } else if (i === o)
      for (; a < s; ) (!u || !u.has(e[a])) && e[a].remove(), a++;
    else if (e[a] === n[i - 1] && n[o] === e[s - 1]) {
      const c = e[--s].nextSibling;
      t.insertBefore(n[o++], e[a++].nextSibling),
        t.insertBefore(n[--i], c),
        (e[s] = n[i]);
    } else {
      if (!u) {
        u = new Map();
        let d = o;
        for (; d < i; ) u.set(n[d], d++);
      }
      const c = u.get(e[a]);
      if (c != null)
        if (o < c && c < i) {
          let d = a,
            w = 1,
            h;
          for (
            ;
            ++d < s && d < i && !((h = u.get(e[d])) == null || h !== c + w);

          )
            w++;
          if (w > c - o) {
            const $ = e[a];
            for (; o < c; ) t.insertBefore(n[o++], $);
          } else t.replaceChild(n[o++], e[a++]);
        } else a++;
      else e[a++].remove();
    }
  }
}
const es = "_$DX_DELEGATE";
function Da(t, e, n, r = {}) {
  let s;
  return (
    kn((i) => {
      (s = i),
        e === document ? t() : W(e, t(), e.firstChild ? null : void 0, n);
    }, r.owner),
    () => {
      s(), (e.textContent = "");
    }
  );
}
function Q(t, e, n) {
  let r;
  const s = () => {
      const a = document.createElement("template");
      return (a.innerHTML = t), a.content.firstChild;
    },
    i = () => (r || (r = s())).cloneNode(!0);
  return (i.cloneNode = i), i;
}
function Ks(t, e = window.document) {
  const n = e[es] || (e[es] = new Set());
  for (let r = 0, s = t.length; r < s; r++) {
    const i = t[r];
    n.has(i) || (n.add(i), e.addEventListener(i, Ia));
  }
}
function Qs(t, e) {
  e == null ? t.removeAttribute("class") : (t.className = e);
}
function W(t, e, n, r) {
  if ((n !== void 0 && !r && (r = []), typeof e != "function"))
    return Dn(t, e, r, n);
  Ve((s) => Dn(t, e(), s, n), r);
}
function Ia(t) {
  const e = `$$${t.type}`;
  let n = (t.composedPath && t.composedPath()[0]) || t.target;
  for (
    t.target !== n &&
      Object.defineProperty(t, "target", { configurable: !0, value: n }),
      Object.defineProperty(t, "currentTarget", {
        configurable: !0,
        get() {
          return n || document;
        },
      });
    n;

  ) {
    const r = n[e];
    if (r && !n.disabled) {
      const s = n[`${e}Data`];
      if ((s !== void 0 ? r.call(n, s, t) : r.call(n, t), t.cancelBubble))
        return;
    }
    n = n._$host || n.parentNode || n.host;
  }
}
function Dn(t, e, n, r, s) {
  for (; typeof n == "function"; ) n = n();
  if (e === n) return n;
  const i = typeof e,
    a = r !== void 0;
  if (
    ((t = (a && n[0] && n[0].parentNode) || t),
    i === "string" || i === "number")
  )
    if ((i === "number" && (e = e.toString()), a)) {
      let o = n[0];
      o && o.nodeType === 3
        ? o.data !== e && (o.data = e)
        : (o = document.createTextNode(e)),
        (n = ft(t, n, r, o));
    } else
      n !== "" && typeof n == "string"
        ? (n = t.firstChild.data = e)
        : (n = t.textContent = e);
  else if (e == null || i === "boolean") n = ft(t, n, r);
  else {
    if (i === "function")
      return (
        Ve(() => {
          let o = e();
          for (; typeof o == "function"; ) o = o();
          n = Dn(t, o, n, r);
        }),
        () => n
      );
    if (Array.isArray(e)) {
      const o = [],
        l = n && Array.isArray(n);
      if (Sr(o, e, n, s)) return Ve(() => (n = Dn(t, o, n, r, !0))), () => n;
      if (o.length === 0) {
        if (((n = ft(t, n, r)), a)) return n;
      } else
        l
          ? n.length === 0
            ? ts(t, o, r)
            : Ma(t, n, o)
          : (n && ft(t), ts(t, o));
      n = o;
    } else if (e.nodeType) {
      if (Array.isArray(n)) {
        if (a) return (n = ft(t, n, r, e));
        ft(t, n, null, e);
      } else
        n == null || n === "" || !t.firstChild
          ? t.appendChild(e)
          : t.replaceChild(e, t.firstChild);
      n = e;
    }
  }
  return n;
}
function Sr(t, e, n, r) {
  let s = !1;
  for (let i = 0, a = e.length; i < a; i++) {
    let o = e[i],
      l = n && n[i],
      u;
    if (!(o == null || o === !0 || o === !1))
      if ((u = typeof o) == "object" && o.nodeType) t.push(o);
      else if (Array.isArray(o)) s = Sr(t, o, l) || s;
      else if (u === "function")
        if (r) {
          for (; typeof o == "function"; ) o = o();
          s =
            Sr(t, Array.isArray(o) ? o : [o], Array.isArray(l) ? l : [l]) || s;
        } else t.push(o), (s = !0);
      else {
        const c = String(o);
        l && l.nodeType === 3 && l.data === c
          ? t.push(l)
          : t.push(document.createTextNode(c));
      }
  }
  return s;
}
function ts(t, e, n = null) {
  for (let r = 0, s = e.length; r < s; r++) t.insertBefore(e[r], n);
}
function ft(t, e, n, r) {
  if (n === void 0) return (t.textContent = "");
  const s = r || document.createTextNode("");
  if (e.length) {
    let i = !1;
    for (let a = e.length - 1; a >= 0; a--) {
      const o = e[a];
      if (s !== o) {
        const l = o.parentNode === t;
        !i && !a
          ? l
            ? t.replaceChild(s, o)
            : t.insertBefore(s, n)
          : l && o.remove();
      } else i = !0;
    }
  } else t.insertBefore(s, n);
  return [s];
}
const Tr = Symbol("store-raw"),
  gt = Symbol("store-node"),
  Re = Symbol("store-has"),
  Xs = Symbol("store-self");
function ei(t) {
  let e = t[at];
  if (
    !e &&
    (Object.defineProperty(t, at, { value: (e = new Proxy(t, Wa)) }),
    !Array.isArray(t))
  ) {
    const n = Object.keys(t),
      r = Object.getOwnPropertyDescriptors(t);
    for (let s = 0, i = n.length; s < i; s++) {
      const a = n[s];
      r[a].get &&
        Object.defineProperty(t, a, {
          enumerable: r[a].enumerable,
          get: r[a].get.bind(e),
        });
    }
  }
  return e;
}
function In(t) {
  let e;
  return (
    t != null &&
    typeof t == "object" &&
    (t[at] ||
      !(e = Object.getPrototypeOf(t)) ||
      e === Object.prototype ||
      Array.isArray(t))
  );
}
function jt(t, e = new Set()) {
  let n, r, s, i;
  if ((n = t != null && t[Tr])) return n;
  if (!In(t) || e.has(t)) return t;
  if (Array.isArray(t)) {
    Object.isFrozen(t) ? (t = t.slice(0)) : e.add(t);
    for (let a = 0, o = t.length; a < o; a++)
      (s = t[a]), (r = jt(s, e)) !== s && (t[a] = r);
  } else {
    Object.isFrozen(t) ? (t = Object.assign({}, t)) : e.add(t);
    const a = Object.keys(t),
      o = Object.getOwnPropertyDescriptors(t);
    for (let l = 0, u = a.length; l < u; l++)
      (i = a[l]), !o[i].get && ((s = t[i]), (r = jt(s, e)) !== s && (t[i] = r));
  }
  return t;
}
function $n(t, e) {
  let n = t[e];
  return (
    n || Object.defineProperty(t, e, { value: (n = Object.create(null)) }), n
  );
}
function Ht(t, e, n) {
  if (t[e]) return t[e];
  const [r, s] = Zr(n, { equals: !1, internal: !0 });
  return (r.$ = s), (t[e] = r);
}
function $a(t, e) {
  const n = Reflect.getOwnPropertyDescriptor(t, e);
  return (
    !n ||
      n.get ||
      !n.configurable ||
      e === at ||
      e === gt ||
      (delete n.value, delete n.writable, (n.get = () => t[at][e])),
    n
  );
}
function ti(t) {
  kr() && Ht($n(t, gt), Xs)();
}
function Aa(t) {
  return ti(t), Reflect.ownKeys(t);
}
const Wa = {
  get(t, e, n) {
    if (e === Tr) return t;
    if (e === at) return n;
    if (e === br) return ti(t), n;
    const r = $n(t, gt),
      s = r[e];
    let i = s ? s() : t[e];
    if (e === gt || e === Re || e === "__proto__") return i;
    if (!s) {
      const a = Object.getOwnPropertyDescriptor(t, e);
      kr() &&
        (typeof i != "function" || t.hasOwnProperty(e)) &&
        !(a && a.get) &&
        (i = Ht(r, e, i)());
    }
    return In(i) ? ei(i) : i;
  },
  has(t, e) {
    return e === Tr ||
      e === at ||
      e === br ||
      e === gt ||
      e === Re ||
      e === "__proto__"
      ? !0
      : (kr() && Ht($n(t, Re), e)(), e in t);
  },
  set() {
    return !0;
  },
  deleteProperty() {
    return !0;
  },
  ownKeys: Aa,
  getOwnPropertyDescriptor: $a,
};
function An(t, e, n, r = !1) {
  if (!r && t[e] === n) return;
  const s = t[e],
    i = t.length;
  n === void 0
    ? (delete t[e], t[Re] && t[Re][e] && s !== void 0 && t[Re][e].$())
    : ((t[e] = n), t[Re] && t[Re][e] && s === void 0 && t[Re][e].$());
  let a = $n(t, gt),
    o;
  if (((o = Ht(a, e, s)) && o.$(() => n), Array.isArray(t) && t.length !== i)) {
    for (let l = t.length; l < i; l++) (o = a[l]) && o.$();
    (o = Ht(a, "length", i)) && o.$(t.length);
  }
  (o = a[Xs]) && o.$();
}
function ni(t, e) {
  const n = Object.keys(e);
  for (let r = 0; r < n.length; r += 1) {
    const s = n[r];
    An(t, s, e[s]);
  }
}
function Ra(t, e) {
  if ((typeof e == "function" && (e = e(t)), (e = jt(e)), Array.isArray(e))) {
    if (t === e) return;
    let n = 0,
      r = e.length;
    for (; n < r; n++) {
      const s = e[n];
      t[n] !== s && An(t, n, s);
    }
    An(t, "length", r);
  } else ni(t, e);
}
function Zt(t, e, n = []) {
  let r,
    s = t;
  if (e.length > 1) {
    r = e.shift();
    const a = typeof r,
      o = Array.isArray(t);
    if (Array.isArray(r)) {
      for (let l = 0; l < r.length; l++) Zt(t, [r[l]].concat(e), n);
      return;
    } else if (o && a === "function") {
      for (let l = 0; l < t.length; l++) r(t[l], l) && Zt(t, [l].concat(e), n);
      return;
    } else if (o && a === "object") {
      const { from: l = 0, to: u = t.length - 1, by: c = 1 } = r;
      for (let d = l; d <= u; d += c) Zt(t, [d].concat(e), n);
      return;
    } else if (e.length > 1) {
      Zt(t[r], e, [r].concat(n));
      return;
    }
    (s = t[r]), (n = [r].concat(n));
  }
  let i = e[0];
  (typeof i == "function" && ((i = i(s, n)), i === s)) ||
    (r === void 0 && i == null) ||
    ((i = jt(i)),
    r === void 0 || (In(s) && In(i) && !Array.isArray(i))
      ? ni(s, i)
      : An(t, r, i));
}
function La(...[t, e]) {
  const n = jt(t || {}),
    r = Array.isArray(n),
    s = ei(n);
  function i(...a) {
    ba(() => {
      r && a.length === 1 ? Ra(n, a[0]) : Zt(n, a);
    });
  }
  return [s, i];
}
function Za(t, e, n, r) {
  if (n === "a" && !r)
    throw new TypeError("Private accessor was defined without a getter");
  if (typeof e == "function" ? t !== e || !r : !e.has(t))
    throw new TypeError(
      "Cannot read private member from an object whose class did not declare it",
    );
  return n === "m" ? r : n === "a" ? r.call(t) : r ? r.value : e.get(t);
}
function Va(t, e, n, r, s) {
  if (typeof e == "function" ? t !== e || !s : !e.has(t))
    throw new TypeError(
      "Cannot write private member to an object whose class did not declare it",
    );
  return e.set(t, n), n;
}
var Sn;
function Pa(t, e = !1) {
  return window.__TAURI_INTERNALS__.transformCallback(t, e);
}
async function m(t, e = {}, n) {
  return window.__TAURI_INTERNALS__.invoke(t, e, n);
}
class za {
  get rid() {
    return Za(this, Sn, "f");
  }
  constructor(e) {
    Sn.set(this, void 0), Va(this, Sn, e);
  }
  async close() {
    return m("plugin:resources|close", { rid: this.rid });
  }
}
Sn = new WeakMap();
class Fa {
  constructor(e, n) {
    (this.type = "Logical"), (this.width = e), (this.height = n);
  }
  toPhysical(e) {
    return new Wn(this.width * e, this.height * e);
  }
}
class Wn {
  constructor(e, n) {
    (this.type = "Physical"), (this.width = e), (this.height = n);
  }
  toLogical(e) {
    return new Fa(this.width / e, this.height / e);
  }
}
class Ua {
  constructor(e, n) {
    (this.type = "Logical"), (this.x = e), (this.y = n);
  }
  toPhysical(e) {
    return new Rn(this.x * e, this.x * e);
  }
}
class Rn {
  constructor(e, n) {
    (this.type = "Physical"), (this.x = e), (this.y = n);
  }
  toLogical(e) {
    return new Ua(this.x / e, this.y / e);
  }
}
var ye;
(function (t) {
  (t.WINDOW_RESIZED = "tauri://resize"),
    (t.WINDOW_MOVED = "tauri://move"),
    (t.WINDOW_CLOSE_REQUESTED = "tauri://close-requested"),
    (t.WINDOW_DESTROYED = "tauri://destroyed"),
    (t.WINDOW_FOCUS = "tauri://focus"),
    (t.WINDOW_BLUR = "tauri://blur"),
    (t.WINDOW_SCALE_FACTOR_CHANGED = "tauri://scale-change"),
    (t.WINDOW_THEME_CHANGED = "tauri://theme-changed"),
    (t.WINDOW_CREATED = "tauri://window-created"),
    (t.WEBVIEW_CREATED = "tauri://webview-created"),
    (t.DRAG_ENTER = "tauri://drag-enter"),
    (t.DRAG_OVER = "tauri://drag-over"),
    (t.DRAG_DROP = "tauri://drag-drop"),
    (t.DRAG_LEAVE = "tauri://drag-leave");
})(ye || (ye = {}));
async function ri(t, e) {
  await m("plugin:event|unlisten", { event: t, eventId: e });
}
async function zr(t, e, n) {
  var r;
  const s =
    typeof n?.target == "string"
      ? { kind: "AnyLabel", label: n.target }
      : (r = n?.target) !== null && r !== void 0
        ? r
        : { kind: "Any" };
  return m("plugin:event|listen", { event: t, target: s, handler: Pa(e) }).then(
    (i) => async () => ri(t, i),
  );
}
async function ja(t, e, n) {
  return zr(
    t,
    (r) => {
      ri(t, r.id), e(r);
    },
    n,
  );
}
async function Ha(t, e) {
  await m("plugin:event|emit", { event: t, payload: e });
}
async function qa(t, e, n) {
  await m("plugin:event|emit_to", {
    target: typeof t == "string" ? { kind: "AnyLabel", label: t } : t,
    event: e,
    payload: n,
  });
}
class zt extends za {
  constructor(e) {
    super(e);
  }
  static async new(e, n, r) {
    return m("plugin:image|new", { rgba: xr(e), width: n, height: r }).then(
      (s) => new zt(s),
    );
  }
  static async fromBytes(e) {
    return m("plugin:image|from_bytes", { bytes: xr(e) }).then(
      (n) => new zt(n),
    );
  }
  static async fromPath(e) {
    return m("plugin:image|from_path", { path: e }).then((n) => new zt(n));
  }
  async rgba() {
    return m("plugin:image|rgba", { rid: this.rid }).then(
      (e) => new Uint8Array(e),
    );
  }
  async size() {
    return m("plugin:image|size", { rid: this.rid });
  }
}
function xr(t) {
  return t == null
    ? null
    : typeof t == "string"
      ? t
      : t instanceof zt
        ? t.rid
        : t;
}
var Or;
(function (t) {
  (t[(t.Critical = 1)] = "Critical"),
    (t[(t.Informational = 2)] = "Informational");
})(Or || (Or = {}));
class Ga {
  constructor(e) {
    (this._preventDefault = !1), (this.event = e.event), (this.id = e.id);
  }
  preventDefault() {
    this._preventDefault = !0;
  }
  isPreventDefault() {
    return this._preventDefault;
  }
}
var ns;
(function (t) {
  (t.None = "none"),
    (t.Normal = "normal"),
    (t.Indeterminate = "indeterminate"),
    (t.Paused = "paused"),
    (t.Error = "error");
})(ns || (ns = {}));
function Er() {
  return new si(window.__TAURI_INTERNALS__.metadata.currentWindow.label, {
    skip: !0,
  });
}
async function lr() {
  return m("plugin:window|get_all_windows").then((t) =>
    t.map((e) => new si(e, { skip: !0 })),
  );
}
const ur = ["tauri://created", "tauri://error"];
class si {
  constructor(e, n = {}) {
    var r;
    (this.label = e),
      (this.listeners = Object.create(null)),
      n?.skip ||
        m("plugin:window|create", {
          options: {
            ...n,
            parent:
              typeof n.parent == "string"
                ? n.parent
                : (r = n.parent) === null || r === void 0
                  ? void 0
                  : r.label,
            label: e,
          },
        })
          .then(async () => this.emit("tauri://created"))
          .catch(async (s) => this.emit("tauri://error", s));
  }
  static async getByLabel(e) {
    var n;
    return (n = (await lr()).find((r) => r.label === e)) !== null &&
      n !== void 0
      ? n
      : null;
  }
  static getCurrent() {
    return Er();
  }
  static async getAll() {
    return lr();
  }
  static async getFocusedWindow() {
    for (const e of await lr()) if (await e.isFocused()) return e;
    return null;
  }
  async listen(e, n) {
    return this._handleTauriEvent(e, n)
      ? () => {
          const r = this.listeners[e];
          r.splice(r.indexOf(n), 1);
        }
      : zr(e, n, { target: { kind: "Window", label: this.label } });
  }
  async once(e, n) {
    return this._handleTauriEvent(e, n)
      ? () => {
          const r = this.listeners[e];
          r.splice(r.indexOf(n), 1);
        }
      : ja(e, n, { target: { kind: "Window", label: this.label } });
  }
  async emit(e, n) {
    if (ur.includes(e)) {
      for (const r of this.listeners[e] || [])
        r({ event: e, id: -1, payload: n });
      return;
    }
    return Ha(e, n);
  }
  async emitTo(e, n, r) {
    if (ur.includes(n)) {
      for (const s of this.listeners[n] || [])
        s({ event: n, id: -1, payload: r });
      return;
    }
    return qa(e, n, r);
  }
  _handleTauriEvent(e, n) {
    return ur.includes(e)
      ? (e in this.listeners
          ? this.listeners[e].push(n)
          : (this.listeners[e] = [n]),
        !0)
      : !1;
  }
  async scaleFactor() {
    return m("plugin:window|scale_factor", { label: this.label });
  }
  async innerPosition() {
    return m("plugin:window|inner_position", { label: this.label }).then(
      ({ x: e, y: n }) => new Rn(e, n),
    );
  }
  async outerPosition() {
    return m("plugin:window|outer_position", { label: this.label }).then(
      ({ x: e, y: n }) => new Rn(e, n),
    );
  }
  async innerSize() {
    return m("plugin:window|inner_size", { label: this.label }).then(
      ({ width: e, height: n }) => new Wn(e, n),
    );
  }
  async outerSize() {
    return m("plugin:window|outer_size", { label: this.label }).then(
      ({ width: e, height: n }) => new Wn(e, n),
    );
  }
  async isFullscreen() {
    return m("plugin:window|is_fullscreen", { label: this.label });
  }
  async isMinimized() {
    return m("plugin:window|is_minimized", { label: this.label });
  }
  async isMaximized() {
    return m("plugin:window|is_maximized", { label: this.label });
  }
  async isFocused() {
    return m("plugin:window|is_focused", { label: this.label });
  }
  async isDecorated() {
    return m("plugin:window|is_decorated", { label: this.label });
  }
  async isResizable() {
    return m("plugin:window|is_resizable", { label: this.label });
  }
  async isMaximizable() {
    return m("plugin:window|is_maximizable", { label: this.label });
  }
  async isMinimizable() {
    return m("plugin:window|is_minimizable", { label: this.label });
  }
  async isClosable() {
    return m("plugin:window|is_closable", { label: this.label });
  }
  async isVisible() {
    return m("plugin:window|is_visible", { label: this.label });
  }
  async title() {
    return m("plugin:window|title", { label: this.label });
  }
  async theme() {
    return m("plugin:window|theme", { label: this.label });
  }
  async center() {
    return m("plugin:window|center", { label: this.label });
  }
  async requestUserAttention(e) {
    let n = null;
    return (
      e &&
        (e === Or.Critical
          ? (n = { type: "Critical" })
          : (n = { type: "Informational" })),
      m("plugin:window|request_user_attention", { label: this.label, value: n })
    );
  }
  async setResizable(e) {
    return m("plugin:window|set_resizable", { label: this.label, value: e });
  }
  async setEnabled(e) {
    return m("plugin:window|set_enabled", { label: this.label, value: e });
  }
  async isEnabled() {
    return m("plugin:window|is_enabled", { label: this.label });
  }
  async setMaximizable(e) {
    return m("plugin:window|set_maximizable", { label: this.label, value: e });
  }
  async setMinimizable(e) {
    return m("plugin:window|set_minimizable", { label: this.label, value: e });
  }
  async setClosable(e) {
    return m("plugin:window|set_closable", { label: this.label, value: e });
  }
  async setTitle(e) {
    return m("plugin:window|set_title", { label: this.label, value: e });
  }
  async maximize() {
    return m("plugin:window|maximize", { label: this.label });
  }
  async unmaximize() {
    return m("plugin:window|unmaximize", { label: this.label });
  }
  async toggleMaximize() {
    return m("plugin:window|toggle_maximize", { label: this.label });
  }
  async minimize() {
    return m("plugin:window|minimize", { label: this.label });
  }
  async unminimize() {
    return m("plugin:window|unminimize", { label: this.label });
  }
  async show() {
    return m("plugin:window|show", { label: this.label });
  }
  async hide() {
    return m("plugin:window|hide", { label: this.label });
  }
  async close() {
    return m("plugin:window|close", { label: this.label });
  }
  async destroy() {
    return m("plugin:window|destroy", { label: this.label });
  }
  async setDecorations(e) {
    return m("plugin:window|set_decorations", { label: this.label, value: e });
  }
  async setShadow(e) {
    return m("plugin:window|set_shadow", { label: this.label, value: e });
  }
  async setEffects(e) {
    return m("plugin:window|set_effects", { label: this.label, value: e });
  }
  async clearEffects() {
    return m("plugin:window|set_effects", { label: this.label, value: null });
  }
  async setAlwaysOnTop(e) {
    return m("plugin:window|set_always_on_top", {
      label: this.label,
      value: e,
    });
  }
  async setAlwaysOnBottom(e) {
    return m("plugin:window|set_always_on_bottom", {
      label: this.label,
      value: e,
    });
  }
  async setContentProtected(e) {
    return m("plugin:window|set_content_protected", {
      label: this.label,
      value: e,
    });
  }
  async setSize(e) {
    if (!e || (e.type !== "Logical" && e.type !== "Physical"))
      throw new Error(
        "the `size` argument must be either a LogicalSize or a PhysicalSize instance",
      );
    const n = {};
    return (
      (n[`${e.type}`] = { width: e.width, height: e.height }),
      m("plugin:window|set_size", { label: this.label, value: n })
    );
  }
  async setMinSize(e) {
    if (e && e.type !== "Logical" && e.type !== "Physical")
      throw new Error(
        "the `size` argument must be either a LogicalSize or a PhysicalSize instance",
      );
    let n = null;
    return (
      e && ((n = {}), (n[`${e.type}`] = { width: e.width, height: e.height })),
      m("plugin:window|set_min_size", { label: this.label, value: n })
    );
  }
  async setMaxSize(e) {
    if (e && e.type !== "Logical" && e.type !== "Physical")
      throw new Error(
        "the `size` argument must be either a LogicalSize or a PhysicalSize instance",
      );
    let n = null;
    return (
      e && ((n = {}), (n[`${e.type}`] = { width: e.width, height: e.height })),
      m("plugin:window|set_max_size", { label: this.label, value: n })
    );
  }
  async setSizeConstraints(e) {
    function n(r) {
      return r ? { Logical: r } : null;
    }
    return m("plugin:window|set_size_constraints", {
      label: this.label,
      value: {
        minWidth: n(e?.minWidth),
        minHeight: n(e?.minHeight),
        maxWidth: n(e?.maxWidth),
        maxHeight: n(e?.maxHeight),
      },
    });
  }
  async setPosition(e) {
    if (!e || (e.type !== "Logical" && e.type !== "Physical"))
      throw new Error(
        "the `position` argument must be either a LogicalPosition or a PhysicalPosition instance",
      );
    const n = {};
    return (
      (n[`${e.type}`] = { x: e.x, y: e.y }),
      m("plugin:window|set_position", { label: this.label, value: n })
    );
  }
  async setFullscreen(e) {
    return m("plugin:window|set_fullscreen", { label: this.label, value: e });
  }
  async setFocus() {
    return m("plugin:window|set_focus", { label: this.label });
  }
  async setIcon(e) {
    return m("plugin:window|set_icon", { label: this.label, value: xr(e) });
  }
  async setSkipTaskbar(e) {
    return m("plugin:window|set_skip_taskbar", { label: this.label, value: e });
  }
  async setCursorGrab(e) {
    return m("plugin:window|set_cursor_grab", { label: this.label, value: e });
  }
  async setCursorVisible(e) {
    return m("plugin:window|set_cursor_visible", {
      label: this.label,
      value: e,
    });
  }
  async setCursorIcon(e) {
    return m("plugin:window|set_cursor_icon", { label: this.label, value: e });
  }
  async setCursorPosition(e) {
    if (!e || (e.type !== "Logical" && e.type !== "Physical"))
      throw new Error(
        "the `position` argument must be either a LogicalPosition or a PhysicalPosition instance",
      );
    const n = {};
    return (
      (n[`${e.type}`] = { x: e.x, y: e.y }),
      m("plugin:window|set_cursor_position", { label: this.label, value: n })
    );
  }
  async setIgnoreCursorEvents(e) {
    return m("plugin:window|set_ignore_cursor_events", {
      label: this.label,
      value: e,
    });
  }
  async startDragging() {
    return m("plugin:window|start_dragging", { label: this.label });
  }
  async startResizeDragging(e) {
    return m("plugin:window|start_resize_dragging", {
      label: this.label,
      value: e,
    });
  }
  async setProgressBar(e) {
    return m("plugin:window|set_progress_bar", { label: this.label, value: e });
  }
  async setVisibleOnAllWorkspaces(e) {
    return m("plugin:window|set_visible_on_all_workspaces", {
      label: this.label,
      value: e,
    });
  }
  async setTitleBarStyle(e) {
    return m("plugin:window|set_title_bar_style", {
      label: this.label,
      value: e,
    });
  }
  async setTheme(e) {
    return m("plugin:window|set_theme", { label: this.label, value: e });
  }
  async onResized(e) {
    return this.listen(ye.WINDOW_RESIZED, (n) => {
      (n.payload = ii(n.payload)), e(n);
    });
  }
  async onMoved(e) {
    return this.listen(ye.WINDOW_MOVED, (n) => {
      (n.payload = Vt(n.payload)), e(n);
    });
  }
  async onCloseRequested(e) {
    return this.listen(ye.WINDOW_CLOSE_REQUESTED, async (n) => {
      const r = new Ga(n);
      await e(r), r.isPreventDefault() || (await this.destroy());
    });
  }
  async onDragDropEvent(e) {
    const n = await this.listen(ye.DRAG_ENTER, (a) => {
        e({
          ...a,
          payload: {
            type: "enter",
            paths: a.payload.paths,
            position: Vt(a.payload.position),
          },
        });
      }),
      r = await this.listen(ye.DRAG_OVER, (a) => {
        e({
          ...a,
          payload: { type: "over", position: Vt(a.payload.position) },
        });
      }),
      s = await this.listen(ye.DRAG_DROP, (a) => {
        e({
          ...a,
          payload: {
            type: "drop",
            paths: a.payload.paths,
            position: Vt(a.payload.position),
          },
        });
      }),
      i = await this.listen(ye.DRAG_LEAVE, (a) => {
        e({ ...a, payload: { type: "leave" } });
      });
    return () => {
      n(), s(), r(), i();
    };
  }
  async onFocusChanged(e) {
    const n = await this.listen(ye.WINDOW_FOCUS, (s) => {
        e({ ...s, payload: !0 });
      }),
      r = await this.listen(ye.WINDOW_BLUR, (s) => {
        e({ ...s, payload: !1 });
      });
    return () => {
      n(), r();
    };
  }
  async onScaleChanged(e) {
    return this.listen(ye.WINDOW_SCALE_FACTOR_CHANGED, e);
  }
  async onThemeChanged(e) {
    return this.listen(ye.WINDOW_THEME_CHANGED, e);
  }
}
var rs;
(function (t) {
  (t.AppearanceBased = "appearanceBased"),
    (t.Light = "light"),
    (t.Dark = "dark"),
    (t.MediumLight = "mediumLight"),
    (t.UltraDark = "ultraDark"),
    (t.Titlebar = "titlebar"),
    (t.Selection = "selection"),
    (t.Menu = "menu"),
    (t.Popover = "popover"),
    (t.Sidebar = "sidebar"),
    (t.HeaderView = "headerView"),
    (t.Sheet = "sheet"),
    (t.WindowBackground = "windowBackground"),
    (t.HudWindow = "hudWindow"),
    (t.FullScreenUI = "fullScreenUI"),
    (t.Tooltip = "tooltip"),
    (t.ContentBackground = "contentBackground"),
    (t.UnderWindowBackground = "underWindowBackground"),
    (t.UnderPageBackground = "underPageBackground"),
    (t.Mica = "mica"),
    (t.Blur = "blur"),
    (t.Acrylic = "acrylic"),
    (t.Tabbed = "tabbed"),
    (t.TabbedDark = "tabbedDark"),
    (t.TabbedLight = "tabbedLight");
})(rs || (rs = {}));
var ss;
(function (t) {
  (t.FollowsWindowActiveState = "followsWindowActiveState"),
    (t.Active = "active"),
    (t.Inactive = "inactive");
})(ss || (ss = {}));
function Fr(t) {
  return t === null
    ? null
    : {
        name: t.name,
        scaleFactor: t.scaleFactor,
        position: Vt(t.position),
        size: ii(t.size),
      };
}
function Vt(t) {
  return new Rn(t.x, t.y);
}
function ii(t) {
  return new Wn(t.width, t.height);
}
async function is() {
  return m("plugin:window|current_monitor").then(Fr);
}
async function Ya() {
  return m("plugin:window|primary_monitor").then(Fr);
}
async function Ja() {
  return m("plugin:window|available_monitors").then((t) => t.map(Fr));
}
var as;
(function (t) {
  (t[(t.Audio = 1)] = "Audio"),
    (t[(t.Cache = 2)] = "Cache"),
    (t[(t.Config = 3)] = "Config"),
    (t[(t.Data = 4)] = "Data"),
    (t[(t.LocalData = 5)] = "LocalData"),
    (t[(t.Document = 6)] = "Document"),
    (t[(t.Download = 7)] = "Download"),
    (t[(t.Picture = 8)] = "Picture"),
    (t[(t.Public = 9)] = "Public"),
    (t[(t.Video = 10)] = "Video"),
    (t[(t.Resource = 11)] = "Resource"),
    (t[(t.Temp = 12)] = "Temp"),
    (t[(t.AppConfig = 13)] = "AppConfig"),
    (t[(t.AppData = 14)] = "AppData"),
    (t[(t.AppLocalData = 15)] = "AppLocalData"),
    (t[(t.AppCache = 16)] = "AppCache"),
    (t[(t.AppLog = 17)] = "AppLog"),
    (t[(t.Desktop = 18)] = "Desktop"),
    (t[(t.Executable = 19)] = "Executable"),
    (t[(t.Font = 20)] = "Font"),
    (t[(t.Home = 21)] = "Home"),
    (t[(t.Runtime = 22)] = "Runtime"),
    (t[(t.Template = 23)] = "Template");
})(as || (as = {}));
var L;
(function (t) {
  t.assertEqual = (s) => s;
  function e(s) {}
  t.assertIs = e;
  function n(s) {
    throw new Error();
  }
  (t.assertNever = n),
    (t.arrayToEnum = (s) => {
      const i = {};
      for (const a of s) i[a] = a;
      return i;
    }),
    (t.getValidEnumValues = (s) => {
      const i = t.objectKeys(s).filter((o) => typeof s[s[o]] != "number"),
        a = {};
      for (const o of i) a[o] = s[o];
      return t.objectValues(a);
    }),
    (t.objectValues = (s) =>
      t.objectKeys(s).map(function (i) {
        return s[i];
      })),
    (t.objectKeys =
      typeof Object.keys == "function"
        ? (s) => Object.keys(s)
        : (s) => {
            const i = [];
            for (const a in s)
              Object.prototype.hasOwnProperty.call(s, a) && i.push(a);
            return i;
          }),
    (t.find = (s, i) => {
      for (const a of s) if (i(a)) return a;
    }),
    (t.isInteger =
      typeof Number.isInteger == "function"
        ? (s) => Number.isInteger(s)
        : (s) => typeof s == "number" && isFinite(s) && Math.floor(s) === s);
  function r(s, i = " | ") {
    return s.map((a) => (typeof a == "string" ? `'${a}'` : a)).join(i);
  }
  (t.joinValues = r),
    (t.jsonStringifyReplacer = (s, i) =>
      typeof i == "bigint" ? i.toString() : i);
})(L || (L = {}));
var Cr;
(function (t) {
  t.mergeShapes = (e, n) => ({ ...e, ...n });
})(Cr || (Cr = {}));
const g = L.arrayToEnum([
    "string",
    "nan",
    "number",
    "integer",
    "float",
    "boolean",
    "date",
    "bigint",
    "symbol",
    "function",
    "undefined",
    "null",
    "array",
    "object",
    "unknown",
    "promise",
    "void",
    "never",
    "map",
    "set",
  ]),
  Ge = (t) => {
    switch (typeof t) {
      case "undefined":
        return g.undefined;
      case "string":
        return g.string;
      case "number":
        return isNaN(t) ? g.nan : g.number;
      case "boolean":
        return g.boolean;
      case "function":
        return g.function;
      case "bigint":
        return g.bigint;
      case "symbol":
        return g.symbol;
      case "object":
        return Array.isArray(t)
          ? g.array
          : t === null
            ? g.null
            : t.then &&
                typeof t.then == "function" &&
                t.catch &&
                typeof t.catch == "function"
              ? g.promise
              : typeof Map < "u" && t instanceof Map
                ? g.map
                : typeof Set < "u" && t instanceof Set
                  ? g.set
                  : typeof Date < "u" && t instanceof Date
                    ? g.date
                    : g.object;
      default:
        return g.unknown;
    }
  },
  f = L.arrayToEnum([
    "invalid_type",
    "invalid_literal",
    "custom",
    "invalid_union",
    "invalid_union_discriminator",
    "invalid_enum_value",
    "unrecognized_keys",
    "invalid_arguments",
    "invalid_return_type",
    "invalid_date",
    "invalid_string",
    "too_small",
    "too_big",
    "invalid_intersection_types",
    "not_multiple_of",
    "not_finite",
  ]),
  Ba = (t) => JSON.stringify(t, null, 2).replace(/"([^"]+)":/g, "$1:");
class Ne extends Error {
  constructor(e) {
    super(),
      (this.issues = []),
      (this.addIssue = (r) => {
        this.issues = [...this.issues, r];
      }),
      (this.addIssues = (r = []) => {
        this.issues = [...this.issues, ...r];
      });
    const n = new.target.prototype;
    Object.setPrototypeOf
      ? Object.setPrototypeOf(this, n)
      : (this.__proto__ = n),
      (this.name = "ZodError"),
      (this.issues = e);
  }
  get errors() {
    return this.issues;
  }
  format(e) {
    const n =
        e ||
        function (i) {
          return i.message;
        },
      r = { _errors: [] },
      s = (i) => {
        for (const a of i.issues)
          if (a.code === "invalid_union") a.unionErrors.map(s);
          else if (a.code === "invalid_return_type") s(a.returnTypeError);
          else if (a.code === "invalid_arguments") s(a.argumentsError);
          else if (a.path.length === 0) r._errors.push(n(a));
          else {
            let o = r,
              l = 0;
            for (; l < a.path.length; ) {
              const u = a.path[l];
              l === a.path.length - 1
                ? ((o[u] = o[u] || { _errors: [] }), o[u]._errors.push(n(a)))
                : (o[u] = o[u] || { _errors: [] }),
                (o = o[u]),
                l++;
            }
          }
      };
    return s(this), r;
  }
  toString() {
    return this.message;
  }
  get message() {
    return JSON.stringify(this.issues, L.jsonStringifyReplacer, 2);
  }
  get isEmpty() {
    return this.issues.length === 0;
  }
  flatten(e = (n) => n.message) {
    const n = {},
      r = [];
    for (const s of this.issues)
      s.path.length > 0
        ? ((n[s.path[0]] = n[s.path[0]] || []), n[s.path[0]].push(e(s)))
        : r.push(e(s));
    return { formErrors: r, fieldErrors: n };
  }
  get formErrors() {
    return this.flatten();
  }
}
Ne.create = (t) => new Ne(t);
const qt = (t, e) => {
  let n;
  switch (t.code) {
    case f.invalid_type:
      t.received === g.undefined
        ? (n = "Required")
        : (n = `Expected ${t.expected}, received ${t.received}`);
      break;
    case f.invalid_literal:
      n = `Invalid literal value, expected ${JSON.stringify(t.expected, L.jsonStringifyReplacer)}`;
      break;
    case f.unrecognized_keys:
      n = `Unrecognized key(s) in object: ${L.joinValues(t.keys, ", ")}`;
      break;
    case f.invalid_union:
      n = "Invalid input";
      break;
    case f.invalid_union_discriminator:
      n = `Invalid discriminator value. Expected ${L.joinValues(t.options)}`;
      break;
    case f.invalid_enum_value:
      n = `Invalid enum value. Expected ${L.joinValues(t.options)}, received '${t.received}'`;
      break;
    case f.invalid_arguments:
      n = "Invalid function arguments";
      break;
    case f.invalid_return_type:
      n = "Invalid function return type";
      break;
    case f.invalid_date:
      n = "Invalid date";
      break;
    case f.invalid_string:
      typeof t.validation == "object"
        ? "includes" in t.validation
          ? ((n = `Invalid input: must include "${t.validation.includes}"`),
            typeof t.validation.position == "number" &&
              (n = `${n} at one or more positions greater than or equal to ${t.validation.position}`))
          : "startsWith" in t.validation
            ? (n = `Invalid input: must start with "${t.validation.startsWith}"`)
            : "endsWith" in t.validation
              ? (n = `Invalid input: must end with "${t.validation.endsWith}"`)
              : L.assertNever(t.validation)
        : t.validation !== "regex"
          ? (n = `Invalid ${t.validation}`)
          : (n = "Invalid");
      break;
    case f.too_small:
      t.type === "array"
        ? (n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "more than"} ${t.minimum} element(s)`)
        : t.type === "string"
          ? (n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at least" : "over"} ${t.minimum} character(s)`)
          : t.type === "number"
            ? (n = `Number must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${t.minimum}`)
            : t.type === "date"
              ? (n = `Date must be ${t.exact ? "exactly equal to " : t.inclusive ? "greater than or equal to " : "greater than "}${new Date(Number(t.minimum))}`)
              : (n = "Invalid input");
      break;
    case f.too_big:
      t.type === "array"
        ? (n = `Array must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "less than"} ${t.maximum} element(s)`)
        : t.type === "string"
          ? (n = `String must contain ${t.exact ? "exactly" : t.inclusive ? "at most" : "under"} ${t.maximum} character(s)`)
          : t.type === "number"
            ? (n = `Number must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}`)
            : t.type === "bigint"
              ? (n = `BigInt must be ${t.exact ? "exactly" : t.inclusive ? "less than or equal to" : "less than"} ${t.maximum}`)
              : t.type === "date"
                ? (n = `Date must be ${t.exact ? "exactly" : t.inclusive ? "smaller than or equal to" : "smaller than"} ${new Date(Number(t.maximum))}`)
                : (n = "Invalid input");
      break;
    case f.custom:
      n = "Invalid input";
      break;
    case f.invalid_intersection_types:
      n = "Intersection results could not be merged";
      break;
    case f.not_multiple_of:
      n = `Number must be a multiple of ${t.multipleOf}`;
      break;
    case f.not_finite:
      n = "Number must be finite";
      break;
    default:
      (n = e.defaultError), L.assertNever(t);
  }
  return { message: n };
};
let ai = qt;
function Ka(t) {
  ai = t;
}
function Ln() {
  return ai;
}
const Zn = (t) => {
    const { data: e, path: n, errorMaps: r, issueData: s } = t,
      i = [...n, ...(s.path || [])],
      a = { ...s, path: i };
    let o = "";
    const l = r
      .filter((u) => !!u)
      .slice()
      .reverse();
    for (const u of l) o = u(a, { data: e, defaultError: o }).message;
    return { ...s, path: i, message: s.message || o };
  },
  Qa = [];
function v(t, e) {
  const n = Zn({
    issueData: e,
    data: t.data,
    path: t.path,
    errorMaps: [t.common.contextualErrorMap, t.schemaErrorMap, Ln(), qt].filter(
      (r) => !!r,
    ),
  });
  t.common.issues.push(n);
}
class le {
  constructor() {
    this.value = "valid";
  }
  dirty() {
    this.value === "valid" && (this.value = "dirty");
  }
  abort() {
    this.value !== "aborted" && (this.value = "aborted");
  }
  static mergeArray(e, n) {
    const r = [];
    for (const s of n) {
      if (s.status === "aborted") return E;
      s.status === "dirty" && e.dirty(), r.push(s.value);
    }
    return { status: e.value, value: r };
  }
  static async mergeObjectAsync(e, n) {
    const r = [];
    for (const s of n) r.push({ key: await s.key, value: await s.value });
    return le.mergeObjectSync(e, r);
  }
  static mergeObjectSync(e, n) {
    const r = {};
    for (const s of n) {
      const { key: i, value: a } = s;
      if (i.status === "aborted" || a.status === "aborted") return E;
      i.status === "dirty" && e.dirty(),
        a.status === "dirty" && e.dirty(),
        i.value !== "__proto__" &&
          (typeof a.value < "u" || s.alwaysSet) &&
          (r[i.value] = a.value);
    }
    return { status: e.value, value: r };
  }
}
const E = Object.freeze({ status: "aborted" }),
  oi = (t) => ({ status: "dirty", value: t }),
  he = (t) => ({ status: "valid", value: t }),
  Nr = (t) => t.status === "aborted",
  Mr = (t) => t.status === "dirty",
  Gt = (t) => t.status === "valid",
  Vn = (t) => typeof Promise < "u" && t instanceof Promise;
var S;
(function (t) {
  (t.errToObj = (e) => (typeof e == "string" ? { message: e } : e || {})),
    (t.toString = (e) => (typeof e == "string" ? e : e?.message));
})(S || (S = {}));
class Ae {
  constructor(e, n, r, s) {
    (this._cachedPath = []),
      (this.parent = e),
      (this.data = n),
      (this._path = r),
      (this._key = s);
  }
  get path() {
    return (
      this._cachedPath.length ||
        (this._key instanceof Array
          ? this._cachedPath.push(...this._path, ...this._key)
          : this._cachedPath.push(...this._path, this._key)),
      this._cachedPath
    );
  }
}
const os = (t, e) => {
  if (Gt(e)) return { success: !0, data: e.value };
  if (!t.common.issues.length)
    throw new Error("Validation failed but no issues detected.");
  return {
    success: !1,
    get error() {
      if (this._error) return this._error;
      const n = new Ne(t.common.issues);
      return (this._error = n), this._error;
    },
  };
};
function C(t) {
  if (!t) return {};
  const {
    errorMap: e,
    invalid_type_error: n,
    required_error: r,
    description: s,
  } = t;
  if (e && (n || r))
    throw new Error(
      `Can't use "invalid_type_error" or "required_error" in conjunction with custom error map.`,
    );
  return e
    ? { errorMap: e, description: s }
    : {
        errorMap: (a, o) =>
          a.code !== "invalid_type"
            ? { message: o.defaultError }
            : typeof o.data > "u"
              ? { message: r ?? o.defaultError }
              : { message: n ?? o.defaultError },
        description: s,
      };
}
class I {
  constructor(e) {
    (this.spa = this.safeParseAsync),
      (this._def = e),
      (this.parse = this.parse.bind(this)),
      (this.safeParse = this.safeParse.bind(this)),
      (this.parseAsync = this.parseAsync.bind(this)),
      (this.safeParseAsync = this.safeParseAsync.bind(this)),
      (this.spa = this.spa.bind(this)),
      (this.refine = this.refine.bind(this)),
      (this.refinement = this.refinement.bind(this)),
      (this.superRefine = this.superRefine.bind(this)),
      (this.optional = this.optional.bind(this)),
      (this.nullable = this.nullable.bind(this)),
      (this.nullish = this.nullish.bind(this)),
      (this.array = this.array.bind(this)),
      (this.promise = this.promise.bind(this)),
      (this.or = this.or.bind(this)),
      (this.and = this.and.bind(this)),
      (this.transform = this.transform.bind(this)),
      (this.brand = this.brand.bind(this)),
      (this.default = this.default.bind(this)),
      (this.catch = this.catch.bind(this)),
      (this.describe = this.describe.bind(this)),
      (this.pipe = this.pipe.bind(this)),
      (this.readonly = this.readonly.bind(this)),
      (this.isNullable = this.isNullable.bind(this)),
      (this.isOptional = this.isOptional.bind(this));
  }
  get description() {
    return this._def.description;
  }
  _getType(e) {
    return Ge(e.data);
  }
  _getOrReturnCtx(e, n) {
    return (
      n || {
        common: e.parent.common,
        data: e.data,
        parsedType: Ge(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      }
    );
  }
  _processInputParams(e) {
    return {
      status: new le(),
      ctx: {
        common: e.parent.common,
        data: e.data,
        parsedType: Ge(e.data),
        schemaErrorMap: this._def.errorMap,
        path: e.path,
        parent: e.parent,
      },
    };
  }
  _parseSync(e) {
    const n = this._parse(e);
    if (Vn(n)) throw new Error("Synchronous parse encountered promise.");
    return n;
  }
  _parseAsync(e) {
    const n = this._parse(e);
    return Promise.resolve(n);
  }
  parse(e, n) {
    const r = this.safeParse(e, n);
    if (r.success) return r.data;
    throw r.error;
  }
  safeParse(e, n) {
    var r;
    const s = {
        common: {
          issues: [],
          async: (r = n?.async) !== null && r !== void 0 ? r : !1,
          contextualErrorMap: n?.errorMap,
        },
        path: n?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: Ge(e),
      },
      i = this._parseSync({ data: e, path: s.path, parent: s });
    return os(s, i);
  }
  async parseAsync(e, n) {
    const r = await this.safeParseAsync(e, n);
    if (r.success) return r.data;
    throw r.error;
  }
  async safeParseAsync(e, n) {
    const r = {
        common: { issues: [], contextualErrorMap: n?.errorMap, async: !0 },
        path: n?.path || [],
        schemaErrorMap: this._def.errorMap,
        parent: null,
        data: e,
        parsedType: Ge(e),
      },
      s = this._parse({ data: e, path: r.path, parent: r }),
      i = await (Vn(s) ? s : Promise.resolve(s));
    return os(r, i);
  }
  refine(e, n) {
    const r = (s) =>
      typeof n == "string" || typeof n > "u"
        ? { message: n }
        : typeof n == "function"
          ? n(s)
          : n;
    return this._refinement((s, i) => {
      const a = e(s),
        o = () => i.addIssue({ code: f.custom, ...r(s) });
      return typeof Promise < "u" && a instanceof Promise
        ? a.then((l) => (l ? !0 : (o(), !1)))
        : a
          ? !0
          : (o(), !1);
    });
  }
  refinement(e, n) {
    return this._refinement((r, s) =>
      e(r) ? !0 : (s.addIssue(typeof n == "function" ? n(r, s) : n), !1),
    );
  }
  _refinement(e) {
    return new De({
      schema: this,
      typeName: T.ZodEffects,
      effect: { type: "refinement", refinement: e },
    });
  }
  superRefine(e) {
    return this._refinement(e);
  }
  optional() {
    return Ze.create(this, this._def);
  }
  nullable() {
    return ut.create(this, this._def);
  }
  nullish() {
    return this.nullable().optional();
  }
  array() {
    return Me.create(this, this._def);
  }
  promise() {
    return St.create(this, this._def);
  }
  or(e) {
    return Kt.create([this, e], this._def);
  }
  and(e) {
    return Qt.create(this, e, this._def);
  }
  transform(e) {
    return new De({
      ...C(this._def),
      schema: this,
      typeName: T.ZodEffects,
      effect: { type: "transform", transform: e },
    });
  }
  default(e) {
    const n = typeof e == "function" ? e : () => e;
    return new rn({
      ...C(this._def),
      innerType: this,
      defaultValue: n,
      typeName: T.ZodDefault,
    });
  }
  brand() {
    return new ui({ typeName: T.ZodBranded, type: this, ...C(this._def) });
  }
  catch(e) {
    const n = typeof e == "function" ? e : () => e;
    return new Un({
      ...C(this._def),
      innerType: this,
      catchValue: n,
      typeName: T.ZodCatch,
    });
  }
  describe(e) {
    const n = this.constructor;
    return new n({ ...this._def, description: e });
  }
  pipe(e) {
    return on.create(this, e);
  }
  readonly() {
    return Hn.create(this);
  }
  isOptional() {
    return this.safeParse(void 0).success;
  }
  isNullable() {
    return this.safeParse(null).success;
  }
}
const Xa = /^c[^\s-]{8,}$/i,
  eo = /^[a-z][a-z0-9]*$/,
  to = /^[0-9A-HJKMNP-TV-Z]{26}$/,
  no =
    /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/i,
  ro =
    /^(?!\.)(?!.*\.\.)([A-Z0-9_+-\.]*)[A-Z0-9_+-]@([A-Z0-9][A-Z0-9\-]*\.)+[A-Z]{2,}$/i,
  so = "^(\\p{Extended_Pictographic}|\\p{Emoji_Component})+$";
let cr;
const io =
    /^(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))$/,
  ao =
    /^(([a-f0-9]{1,4}:){7}|::([a-f0-9]{1,4}:){0,6}|([a-f0-9]{1,4}:){1}:([a-f0-9]{1,4}:){0,5}|([a-f0-9]{1,4}:){2}:([a-f0-9]{1,4}:){0,4}|([a-f0-9]{1,4}:){3}:([a-f0-9]{1,4}:){0,3}|([a-f0-9]{1,4}:){4}:([a-f0-9]{1,4}:){0,2}|([a-f0-9]{1,4}:){5}:([a-f0-9]{1,4}:){0,1})([a-f0-9]{1,4}|(((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2}))\.){3}((25[0-5])|(2[0-4][0-9])|(1[0-9]{2})|([0-9]{1,2})))$/,
  oo = (t) =>
    t.precision
      ? t.offset
        ? new RegExp(
            `^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}(([+-]\\d{2}(:?\\d{2})?)|Z)$`,
          )
        : new RegExp(
            `^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}\\.\\d{${t.precision}}Z$`,
          )
      : t.precision === 0
        ? t.offset
          ? new RegExp(
              "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(([+-]\\d{2}(:?\\d{2})?)|Z)$",
            )
          : new RegExp("^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}Z$")
        : t.offset
          ? new RegExp(
              "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?(([+-]\\d{2}(:?\\d{2})?)|Z)$",
            )
          : new RegExp(
              "^\\d{4}-\\d{2}-\\d{2}T\\d{2}:\\d{2}:\\d{2}(\\.\\d+)?Z$",
            );
function lo(t, e) {
  return !!(
    ((e === "v4" || !e) && io.test(t)) ||
    ((e === "v6" || !e) && ao.test(t))
  );
}
class Ee extends I {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = String(e.data)),
      this._getType(e) !== g.string)
    ) {
      const i = this._getOrReturnCtx(e);
      return (
        v(i, {
          code: f.invalid_type,
          expected: g.string,
          received: i.parsedType,
        }),
        E
      );
    }
    const r = new le();
    let s;
    for (const i of this._def.checks)
      if (i.kind === "min")
        e.data.length < i.value &&
          ((s = this._getOrReturnCtx(e, s)),
          v(s, {
            code: f.too_small,
            minimum: i.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: i.message,
          }),
          r.dirty());
      else if (i.kind === "max")
        e.data.length > i.value &&
          ((s = this._getOrReturnCtx(e, s)),
          v(s, {
            code: f.too_big,
            maximum: i.value,
            type: "string",
            inclusive: !0,
            exact: !1,
            message: i.message,
          }),
          r.dirty());
      else if (i.kind === "length") {
        const a = e.data.length > i.value,
          o = e.data.length < i.value;
        (a || o) &&
          ((s = this._getOrReturnCtx(e, s)),
          a
            ? v(s, {
                code: f.too_big,
                maximum: i.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: i.message,
              })
            : o &&
              v(s, {
                code: f.too_small,
                minimum: i.value,
                type: "string",
                inclusive: !0,
                exact: !0,
                message: i.message,
              }),
          r.dirty());
      } else if (i.kind === "email")
        ro.test(e.data) ||
          ((s = this._getOrReturnCtx(e, s)),
          v(s, {
            validation: "email",
            code: f.invalid_string,
            message: i.message,
          }),
          r.dirty());
      else if (i.kind === "emoji")
        cr || (cr = new RegExp(so, "u")),
          cr.test(e.data) ||
            ((s = this._getOrReturnCtx(e, s)),
            v(s, {
              validation: "emoji",
              code: f.invalid_string,
              message: i.message,
            }),
            r.dirty());
      else if (i.kind === "uuid")
        no.test(e.data) ||
          ((s = this._getOrReturnCtx(e, s)),
          v(s, {
            validation: "uuid",
            code: f.invalid_string,
            message: i.message,
          }),
          r.dirty());
      else if (i.kind === "cuid")
        Xa.test(e.data) ||
          ((s = this._getOrReturnCtx(e, s)),
          v(s, {
            validation: "cuid",
            code: f.invalid_string,
            message: i.message,
          }),
          r.dirty());
      else if (i.kind === "cuid2")
        eo.test(e.data) ||
          ((s = this._getOrReturnCtx(e, s)),
          v(s, {
            validation: "cuid2",
            code: f.invalid_string,
            message: i.message,
          }),
          r.dirty());
      else if (i.kind === "ulid")
        to.test(e.data) ||
          ((s = this._getOrReturnCtx(e, s)),
          v(s, {
            validation: "ulid",
            code: f.invalid_string,
            message: i.message,
          }),
          r.dirty());
      else if (i.kind === "url")
        try {
          new URL(e.data);
        } catch {
          (s = this._getOrReturnCtx(e, s)),
            v(s, {
              validation: "url",
              code: f.invalid_string,
              message: i.message,
            }),
            r.dirty();
        }
      else
        i.kind === "regex"
          ? ((i.regex.lastIndex = 0),
            i.regex.test(e.data) ||
              ((s = this._getOrReturnCtx(e, s)),
              v(s, {
                validation: "regex",
                code: f.invalid_string,
                message: i.message,
              }),
              r.dirty()))
          : i.kind === "trim"
            ? (e.data = e.data.trim())
            : i.kind === "includes"
              ? e.data.includes(i.value, i.position) ||
                ((s = this._getOrReturnCtx(e, s)),
                v(s, {
                  code: f.invalid_string,
                  validation: { includes: i.value, position: i.position },
                  message: i.message,
                }),
                r.dirty())
              : i.kind === "toLowerCase"
                ? (e.data = e.data.toLowerCase())
                : i.kind === "toUpperCase"
                  ? (e.data = e.data.toUpperCase())
                  : i.kind === "startsWith"
                    ? e.data.startsWith(i.value) ||
                      ((s = this._getOrReturnCtx(e, s)),
                      v(s, {
                        code: f.invalid_string,
                        validation: { startsWith: i.value },
                        message: i.message,
                      }),
                      r.dirty())
                    : i.kind === "endsWith"
                      ? e.data.endsWith(i.value) ||
                        ((s = this._getOrReturnCtx(e, s)),
                        v(s, {
                          code: f.invalid_string,
                          validation: { endsWith: i.value },
                          message: i.message,
                        }),
                        r.dirty())
                      : i.kind === "datetime"
                        ? oo(i).test(e.data) ||
                          ((s = this._getOrReturnCtx(e, s)),
                          v(s, {
                            code: f.invalid_string,
                            validation: "datetime",
                            message: i.message,
                          }),
                          r.dirty())
                        : i.kind === "ip"
                          ? lo(e.data, i.version) ||
                            ((s = this._getOrReturnCtx(e, s)),
                            v(s, {
                              validation: "ip",
                              code: f.invalid_string,
                              message: i.message,
                            }),
                            r.dirty())
                          : L.assertNever(i);
    return { status: r.value, value: e.data };
  }
  _regex(e, n, r) {
    return this.refinement((s) => e.test(s), {
      validation: n,
      code: f.invalid_string,
      ...S.errToObj(r),
    });
  }
  _addCheck(e) {
    return new Ee({ ...this._def, checks: [...this._def.checks, e] });
  }
  email(e) {
    return this._addCheck({ kind: "email", ...S.errToObj(e) });
  }
  url(e) {
    return this._addCheck({ kind: "url", ...S.errToObj(e) });
  }
  emoji(e) {
    return this._addCheck({ kind: "emoji", ...S.errToObj(e) });
  }
  uuid(e) {
    return this._addCheck({ kind: "uuid", ...S.errToObj(e) });
  }
  cuid(e) {
    return this._addCheck({ kind: "cuid", ...S.errToObj(e) });
  }
  cuid2(e) {
    return this._addCheck({ kind: "cuid2", ...S.errToObj(e) });
  }
  ulid(e) {
    return this._addCheck({ kind: "ulid", ...S.errToObj(e) });
  }
  ip(e) {
    return this._addCheck({ kind: "ip", ...S.errToObj(e) });
  }
  datetime(e) {
    var n;
    return typeof e == "string"
      ? this._addCheck({
          kind: "datetime",
          precision: null,
          offset: !1,
          message: e,
        })
      : this._addCheck({
          kind: "datetime",
          precision: typeof e?.precision > "u" ? null : e?.precision,
          offset: (n = e?.offset) !== null && n !== void 0 ? n : !1,
          ...S.errToObj(e?.message),
        });
  }
  regex(e, n) {
    return this._addCheck({ kind: "regex", regex: e, ...S.errToObj(n) });
  }
  includes(e, n) {
    return this._addCheck({
      kind: "includes",
      value: e,
      position: n?.position,
      ...S.errToObj(n?.message),
    });
  }
  startsWith(e, n) {
    return this._addCheck({ kind: "startsWith", value: e, ...S.errToObj(n) });
  }
  endsWith(e, n) {
    return this._addCheck({ kind: "endsWith", value: e, ...S.errToObj(n) });
  }
  min(e, n) {
    return this._addCheck({ kind: "min", value: e, ...S.errToObj(n) });
  }
  max(e, n) {
    return this._addCheck({ kind: "max", value: e, ...S.errToObj(n) });
  }
  length(e, n) {
    return this._addCheck({ kind: "length", value: e, ...S.errToObj(n) });
  }
  nonempty(e) {
    return this.min(1, S.errToObj(e));
  }
  trim() {
    return new Ee({
      ...this._def,
      checks: [...this._def.checks, { kind: "trim" }],
    });
  }
  toLowerCase() {
    return new Ee({
      ...this._def,
      checks: [...this._def.checks, { kind: "toLowerCase" }],
    });
  }
  toUpperCase() {
    return new Ee({
      ...this._def,
      checks: [...this._def.checks, { kind: "toUpperCase" }],
    });
  }
  get isDatetime() {
    return !!this._def.checks.find((e) => e.kind === "datetime");
  }
  get isEmail() {
    return !!this._def.checks.find((e) => e.kind === "email");
  }
  get isURL() {
    return !!this._def.checks.find((e) => e.kind === "url");
  }
  get isEmoji() {
    return !!this._def.checks.find((e) => e.kind === "emoji");
  }
  get isUUID() {
    return !!this._def.checks.find((e) => e.kind === "uuid");
  }
  get isCUID() {
    return !!this._def.checks.find((e) => e.kind === "cuid");
  }
  get isCUID2() {
    return !!this._def.checks.find((e) => e.kind === "cuid2");
  }
  get isULID() {
    return !!this._def.checks.find((e) => e.kind === "ulid");
  }
  get isIP() {
    return !!this._def.checks.find((e) => e.kind === "ip");
  }
  get minLength() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxLength() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
Ee.create = (t) => {
  var e;
  return new Ee({
    checks: [],
    typeName: T.ZodString,
    coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
    ...C(t),
  });
};
function uo(t, e) {
  const n = (t.toString().split(".")[1] || "").length,
    r = (e.toString().split(".")[1] || "").length,
    s = n > r ? n : r,
    i = parseInt(t.toFixed(s).replace(".", "")),
    a = parseInt(e.toFixed(s).replace(".", ""));
  return (i % a) / Math.pow(10, s);
}
class Je extends I {
  constructor() {
    super(...arguments),
      (this.min = this.gte),
      (this.max = this.lte),
      (this.step = this.multipleOf);
  }
  _parse(e) {
    if (
      (this._def.coerce && (e.data = Number(e.data)),
      this._getType(e) !== g.number)
    ) {
      const i = this._getOrReturnCtx(e);
      return (
        v(i, {
          code: f.invalid_type,
          expected: g.number,
          received: i.parsedType,
        }),
        E
      );
    }
    let r;
    const s = new le();
    for (const i of this._def.checks)
      i.kind === "int"
        ? L.isInteger(e.data) ||
          ((r = this._getOrReturnCtx(e, r)),
          v(r, {
            code: f.invalid_type,
            expected: "integer",
            received: "float",
            message: i.message,
          }),
          s.dirty())
        : i.kind === "min"
          ? (i.inclusive ? e.data < i.value : e.data <= i.value) &&
            ((r = this._getOrReturnCtx(e, r)),
            v(r, {
              code: f.too_small,
              minimum: i.value,
              type: "number",
              inclusive: i.inclusive,
              exact: !1,
              message: i.message,
            }),
            s.dirty())
          : i.kind === "max"
            ? (i.inclusive ? e.data > i.value : e.data >= i.value) &&
              ((r = this._getOrReturnCtx(e, r)),
              v(r, {
                code: f.too_big,
                maximum: i.value,
                type: "number",
                inclusive: i.inclusive,
                exact: !1,
                message: i.message,
              }),
              s.dirty())
            : i.kind === "multipleOf"
              ? uo(e.data, i.value) !== 0 &&
                ((r = this._getOrReturnCtx(e, r)),
                v(r, {
                  code: f.not_multiple_of,
                  multipleOf: i.value,
                  message: i.message,
                }),
                s.dirty())
              : i.kind === "finite"
                ? Number.isFinite(e.data) ||
                  ((r = this._getOrReturnCtx(e, r)),
                  v(r, { code: f.not_finite, message: i.message }),
                  s.dirty())
                : L.assertNever(i);
    return { status: s.value, value: e.data };
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, S.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, S.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, S.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, S.toString(n));
  }
  setLimit(e, n, r, s) {
    return new Je({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: e, value: n, inclusive: r, message: S.toString(s) },
      ],
    });
  }
  _addCheck(e) {
    return new Je({ ...this._def, checks: [...this._def.checks, e] });
  }
  int(e) {
    return this._addCheck({ kind: "int", message: S.toString(e) });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !1,
      message: S.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !1,
      message: S.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: 0,
      inclusive: !0,
      message: S.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: 0,
      inclusive: !0,
      message: S.toString(e),
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: S.toString(n),
    });
  }
  finite(e) {
    return this._addCheck({ kind: "finite", message: S.toString(e) });
  }
  safe(e) {
    return this._addCheck({
      kind: "min",
      inclusive: !0,
      value: Number.MIN_SAFE_INTEGER,
      message: S.toString(e),
    })._addCheck({
      kind: "max",
      inclusive: !0,
      value: Number.MAX_SAFE_INTEGER,
      message: S.toString(e),
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
  get isInt() {
    return !!this._def.checks.find(
      (e) =>
        e.kind === "int" || (e.kind === "multipleOf" && L.isInteger(e.value)),
    );
  }
  get isFinite() {
    let e = null,
      n = null;
    for (const r of this._def.checks) {
      if (r.kind === "finite" || r.kind === "int" || r.kind === "multipleOf")
        return !0;
      r.kind === "min"
        ? (n === null || r.value > n) && (n = r.value)
        : r.kind === "max" && (e === null || r.value < e) && (e = r.value);
    }
    return Number.isFinite(n) && Number.isFinite(e);
  }
}
Je.create = (t) =>
  new Je({
    checks: [],
    typeName: T.ZodNumber,
    coerce: t?.coerce || !1,
    ...C(t),
  });
class Be extends I {
  constructor() {
    super(...arguments), (this.min = this.gte), (this.max = this.lte);
  }
  _parse(e) {
    if (
      (this._def.coerce && (e.data = BigInt(e.data)),
      this._getType(e) !== g.bigint)
    ) {
      const i = this._getOrReturnCtx(e);
      return (
        v(i, {
          code: f.invalid_type,
          expected: g.bigint,
          received: i.parsedType,
        }),
        E
      );
    }
    let r;
    const s = new le();
    for (const i of this._def.checks)
      i.kind === "min"
        ? (i.inclusive ? e.data < i.value : e.data <= i.value) &&
          ((r = this._getOrReturnCtx(e, r)),
          v(r, {
            code: f.too_small,
            type: "bigint",
            minimum: i.value,
            inclusive: i.inclusive,
            message: i.message,
          }),
          s.dirty())
        : i.kind === "max"
          ? (i.inclusive ? e.data > i.value : e.data >= i.value) &&
            ((r = this._getOrReturnCtx(e, r)),
            v(r, {
              code: f.too_big,
              type: "bigint",
              maximum: i.value,
              inclusive: i.inclusive,
              message: i.message,
            }),
            s.dirty())
          : i.kind === "multipleOf"
            ? e.data % i.value !== BigInt(0) &&
              ((r = this._getOrReturnCtx(e, r)),
              v(r, {
                code: f.not_multiple_of,
                multipleOf: i.value,
                message: i.message,
              }),
              s.dirty())
            : L.assertNever(i);
    return { status: s.value, value: e.data };
  }
  gte(e, n) {
    return this.setLimit("min", e, !0, S.toString(n));
  }
  gt(e, n) {
    return this.setLimit("min", e, !1, S.toString(n));
  }
  lte(e, n) {
    return this.setLimit("max", e, !0, S.toString(n));
  }
  lt(e, n) {
    return this.setLimit("max", e, !1, S.toString(n));
  }
  setLimit(e, n, r, s) {
    return new Be({
      ...this._def,
      checks: [
        ...this._def.checks,
        { kind: e, value: n, inclusive: r, message: S.toString(s) },
      ],
    });
  }
  _addCheck(e) {
    return new Be({ ...this._def, checks: [...this._def.checks, e] });
  }
  positive(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !1,
      message: S.toString(e),
    });
  }
  negative(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !1,
      message: S.toString(e),
    });
  }
  nonpositive(e) {
    return this._addCheck({
      kind: "max",
      value: BigInt(0),
      inclusive: !0,
      message: S.toString(e),
    });
  }
  nonnegative(e) {
    return this._addCheck({
      kind: "min",
      value: BigInt(0),
      inclusive: !0,
      message: S.toString(e),
    });
  }
  multipleOf(e, n) {
    return this._addCheck({
      kind: "multipleOf",
      value: e,
      message: S.toString(n),
    });
  }
  get minValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e;
  }
  get maxValue() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e;
  }
}
Be.create = (t) => {
  var e;
  return new Be({
    checks: [],
    typeName: T.ZodBigInt,
    coerce: (e = t?.coerce) !== null && e !== void 0 ? e : !1,
    ...C(t),
  });
};
class Yt extends I {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = !!e.data), this._getType(e) !== g.boolean)
    ) {
      const r = this._getOrReturnCtx(e);
      return (
        v(r, {
          code: f.invalid_type,
          expected: g.boolean,
          received: r.parsedType,
        }),
        E
      );
    }
    return he(e.data);
  }
}
Yt.create = (t) =>
  new Yt({ typeName: T.ZodBoolean, coerce: t?.coerce || !1, ...C(t) });
class ot extends I {
  _parse(e) {
    if (
      (this._def.coerce && (e.data = new Date(e.data)),
      this._getType(e) !== g.date)
    ) {
      const i = this._getOrReturnCtx(e);
      return (
        v(i, {
          code: f.invalid_type,
          expected: g.date,
          received: i.parsedType,
        }),
        E
      );
    }
    if (isNaN(e.data.getTime())) {
      const i = this._getOrReturnCtx(e);
      return v(i, { code: f.invalid_date }), E;
    }
    const r = new le();
    let s;
    for (const i of this._def.checks)
      i.kind === "min"
        ? e.data.getTime() < i.value &&
          ((s = this._getOrReturnCtx(e, s)),
          v(s, {
            code: f.too_small,
            message: i.message,
            inclusive: !0,
            exact: !1,
            minimum: i.value,
            type: "date",
          }),
          r.dirty())
        : i.kind === "max"
          ? e.data.getTime() > i.value &&
            ((s = this._getOrReturnCtx(e, s)),
            v(s, {
              code: f.too_big,
              message: i.message,
              inclusive: !0,
              exact: !1,
              maximum: i.value,
              type: "date",
            }),
            r.dirty())
          : L.assertNever(i);
    return { status: r.value, value: new Date(e.data.getTime()) };
  }
  _addCheck(e) {
    return new ot({ ...this._def, checks: [...this._def.checks, e] });
  }
  min(e, n) {
    return this._addCheck({
      kind: "min",
      value: e.getTime(),
      message: S.toString(n),
    });
  }
  max(e, n) {
    return this._addCheck({
      kind: "max",
      value: e.getTime(),
      message: S.toString(n),
    });
  }
  get minDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "min" && (e === null || n.value > e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
  get maxDate() {
    let e = null;
    for (const n of this._def.checks)
      n.kind === "max" && (e === null || n.value < e) && (e = n.value);
    return e != null ? new Date(e) : null;
  }
}
ot.create = (t) =>
  new ot({ checks: [], coerce: t?.coerce || !1, typeName: T.ZodDate, ...C(t) });
class Pn extends I {
  _parse(e) {
    if (this._getType(e) !== g.symbol) {
      const r = this._getOrReturnCtx(e);
      return (
        v(r, {
          code: f.invalid_type,
          expected: g.symbol,
          received: r.parsedType,
        }),
        E
      );
    }
    return he(e.data);
  }
}
Pn.create = (t) => new Pn({ typeName: T.ZodSymbol, ...C(t) });
class Jt extends I {
  _parse(e) {
    if (this._getType(e) !== g.undefined) {
      const r = this._getOrReturnCtx(e);
      return (
        v(r, {
          code: f.invalid_type,
          expected: g.undefined,
          received: r.parsedType,
        }),
        E
      );
    }
    return he(e.data);
  }
}
Jt.create = (t) => new Jt({ typeName: T.ZodUndefined, ...C(t) });
class Bt extends I {
  _parse(e) {
    if (this._getType(e) !== g.null) {
      const r = this._getOrReturnCtx(e);
      return (
        v(r, {
          code: f.invalid_type,
          expected: g.null,
          received: r.parsedType,
        }),
        E
      );
    }
    return he(e.data);
  }
}
Bt.create = (t) => new Bt({ typeName: T.ZodNull, ...C(t) });
class kt extends I {
  constructor() {
    super(...arguments), (this._any = !0);
  }
  _parse(e) {
    return he(e.data);
  }
}
kt.create = (t) => new kt({ typeName: T.ZodAny, ...C(t) });
class st extends I {
  constructor() {
    super(...arguments), (this._unknown = !0);
  }
  _parse(e) {
    return he(e.data);
  }
}
st.create = (t) => new st({ typeName: T.ZodUnknown, ...C(t) });
class Pe extends I {
  _parse(e) {
    const n = this._getOrReturnCtx(e);
    return (
      v(n, { code: f.invalid_type, expected: g.never, received: n.parsedType }),
      E
    );
  }
}
Pe.create = (t) => new Pe({ typeName: T.ZodNever, ...C(t) });
class zn extends I {
  _parse(e) {
    if (this._getType(e) !== g.undefined) {
      const r = this._getOrReturnCtx(e);
      return (
        v(r, {
          code: f.invalid_type,
          expected: g.void,
          received: r.parsedType,
        }),
        E
      );
    }
    return he(e.data);
  }
}
zn.create = (t) => new zn({ typeName: T.ZodVoid, ...C(t) });
class Me extends I {
  _parse(e) {
    const { ctx: n, status: r } = this._processInputParams(e),
      s = this._def;
    if (n.parsedType !== g.array)
      return (
        v(n, {
          code: f.invalid_type,
          expected: g.array,
          received: n.parsedType,
        }),
        E
      );
    if (s.exactLength !== null) {
      const a = n.data.length > s.exactLength.value,
        o = n.data.length < s.exactLength.value;
      (a || o) &&
        (v(n, {
          code: a ? f.too_big : f.too_small,
          minimum: o ? s.exactLength.value : void 0,
          maximum: a ? s.exactLength.value : void 0,
          type: "array",
          inclusive: !0,
          exact: !0,
          message: s.exactLength.message,
        }),
        r.dirty());
    }
    if (
      (s.minLength !== null &&
        n.data.length < s.minLength.value &&
        (v(n, {
          code: f.too_small,
          minimum: s.minLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: s.minLength.message,
        }),
        r.dirty()),
      s.maxLength !== null &&
        n.data.length > s.maxLength.value &&
        (v(n, {
          code: f.too_big,
          maximum: s.maxLength.value,
          type: "array",
          inclusive: !0,
          exact: !1,
          message: s.maxLength.message,
        }),
        r.dirty()),
      n.common.async)
    )
      return Promise.all(
        [...n.data].map((a, o) => s.type._parseAsync(new Ae(n, a, n.path, o))),
      ).then((a) => le.mergeArray(r, a));
    const i = [...n.data].map((a, o) =>
      s.type._parseSync(new Ae(n, a, n.path, o)),
    );
    return le.mergeArray(r, i);
  }
  get element() {
    return this._def.type;
  }
  min(e, n) {
    return new Me({
      ...this._def,
      minLength: { value: e, message: S.toString(n) },
    });
  }
  max(e, n) {
    return new Me({
      ...this._def,
      maxLength: { value: e, message: S.toString(n) },
    });
  }
  length(e, n) {
    return new Me({
      ...this._def,
      exactLength: { value: e, message: S.toString(n) },
    });
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
Me.create = (t, e) =>
  new Me({
    type: t,
    minLength: null,
    maxLength: null,
    exactLength: null,
    typeName: T.ZodArray,
    ...C(e),
  });
function pt(t) {
  if (t instanceof j) {
    const e = {};
    for (const n in t.shape) {
      const r = t.shape[n];
      e[n] = Ze.create(pt(r));
    }
    return new j({ ...t._def, shape: () => e });
  } else
    return t instanceof Me
      ? new Me({ ...t._def, type: pt(t.element) })
      : t instanceof Ze
        ? Ze.create(pt(t.unwrap()))
        : t instanceof ut
          ? ut.create(pt(t.unwrap()))
          : t instanceof We
            ? We.create(t.items.map((e) => pt(e)))
            : t;
}
class j extends I {
  constructor() {
    super(...arguments),
      (this._cached = null),
      (this.nonstrict = this.passthrough),
      (this.augment = this.extend);
  }
  _getCached() {
    if (this._cached !== null) return this._cached;
    const e = this._def.shape(),
      n = L.objectKeys(e);
    return (this._cached = { shape: e, keys: n });
  }
  _parse(e) {
    if (this._getType(e) !== g.object) {
      const u = this._getOrReturnCtx(e);
      return (
        v(u, {
          code: f.invalid_type,
          expected: g.object,
          received: u.parsedType,
        }),
        E
      );
    }
    const { status: r, ctx: s } = this._processInputParams(e),
      { shape: i, keys: a } = this._getCached(),
      o = [];
    if (
      !(this._def.catchall instanceof Pe && this._def.unknownKeys === "strip")
    )
      for (const u in s.data) a.includes(u) || o.push(u);
    const l = [];
    for (const u of a) {
      const c = i[u],
        d = s.data[u];
      l.push({
        key: { status: "valid", value: u },
        value: c._parse(new Ae(s, d, s.path, u)),
        alwaysSet: u in s.data,
      });
    }
    if (this._def.catchall instanceof Pe) {
      const u = this._def.unknownKeys;
      if (u === "passthrough")
        for (const c of o)
          l.push({
            key: { status: "valid", value: c },
            value: { status: "valid", value: s.data[c] },
          });
      else if (u === "strict")
        o.length > 0 &&
          (v(s, { code: f.unrecognized_keys, keys: o }), r.dirty());
      else if (u !== "strip")
        throw new Error("Internal ZodObject error: invalid unknownKeys value.");
    } else {
      const u = this._def.catchall;
      for (const c of o) {
        const d = s.data[c];
        l.push({
          key: { status: "valid", value: c },
          value: u._parse(new Ae(s, d, s.path, c)),
          alwaysSet: c in s.data,
        });
      }
    }
    return s.common.async
      ? Promise.resolve()
          .then(async () => {
            const u = [];
            for (const c of l) {
              const d = await c.key;
              u.push({ key: d, value: await c.value, alwaysSet: c.alwaysSet });
            }
            return u;
          })
          .then((u) => le.mergeObjectSync(r, u))
      : le.mergeObjectSync(r, l);
  }
  get shape() {
    return this._def.shape();
  }
  strict(e) {
    return (
      S.errToObj,
      new j({
        ...this._def,
        unknownKeys: "strict",
        ...(e !== void 0
          ? {
              errorMap: (n, r) => {
                var s, i, a, o;
                const l =
                  (a =
                    (i = (s = this._def).errorMap) === null || i === void 0
                      ? void 0
                      : i.call(s, n, r).message) !== null && a !== void 0
                    ? a
                    : r.defaultError;
                return n.code === "unrecognized_keys"
                  ? {
                      message:
                        (o = S.errToObj(e).message) !== null && o !== void 0
                          ? o
                          : l,
                    }
                  : { message: l };
              },
            }
          : {}),
      })
    );
  }
  strip() {
    return new j({ ...this._def, unknownKeys: "strip" });
  }
  passthrough() {
    return new j({ ...this._def, unknownKeys: "passthrough" });
  }
  extend(e) {
    return new j({
      ...this._def,
      shape: () => ({ ...this._def.shape(), ...e }),
    });
  }
  merge(e) {
    return new j({
      unknownKeys: e._def.unknownKeys,
      catchall: e._def.catchall,
      shape: () => ({ ...this._def.shape(), ...e._def.shape() }),
      typeName: T.ZodObject,
    });
  }
  setKey(e, n) {
    return this.augment({ [e]: n });
  }
  catchall(e) {
    return new j({ ...this._def, catchall: e });
  }
  pick(e) {
    const n = {};
    return (
      L.objectKeys(e).forEach((r) => {
        e[r] && this.shape[r] && (n[r] = this.shape[r]);
      }),
      new j({ ...this._def, shape: () => n })
    );
  }
  omit(e) {
    const n = {};
    return (
      L.objectKeys(this.shape).forEach((r) => {
        e[r] || (n[r] = this.shape[r]);
      }),
      new j({ ...this._def, shape: () => n })
    );
  }
  deepPartial() {
    return pt(this);
  }
  partial(e) {
    const n = {};
    return (
      L.objectKeys(this.shape).forEach((r) => {
        const s = this.shape[r];
        e && !e[r] ? (n[r] = s) : (n[r] = s.optional());
      }),
      new j({ ...this._def, shape: () => n })
    );
  }
  required(e) {
    const n = {};
    return (
      L.objectKeys(this.shape).forEach((r) => {
        if (e && !e[r]) n[r] = this.shape[r];
        else {
          let i = this.shape[r];
          for (; i instanceof Ze; ) i = i._def.innerType;
          n[r] = i;
        }
      }),
      new j({ ...this._def, shape: () => n })
    );
  }
  keyof() {
    return li(L.objectKeys(this.shape));
  }
}
j.create = (t, e) =>
  new j({
    shape: () => t,
    unknownKeys: "strip",
    catchall: Pe.create(),
    typeName: T.ZodObject,
    ...C(e),
  });
j.strictCreate = (t, e) =>
  new j({
    shape: () => t,
    unknownKeys: "strict",
    catchall: Pe.create(),
    typeName: T.ZodObject,
    ...C(e),
  });
j.lazycreate = (t, e) =>
  new j({
    shape: t,
    unknownKeys: "strip",
    catchall: Pe.create(),
    typeName: T.ZodObject,
    ...C(e),
  });
class Kt extends I {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e),
      r = this._def.options;
    function s(i) {
      for (const o of i) if (o.result.status === "valid") return o.result;
      for (const o of i)
        if (o.result.status === "dirty")
          return n.common.issues.push(...o.ctx.common.issues), o.result;
      const a = i.map((o) => new Ne(o.ctx.common.issues));
      return v(n, { code: f.invalid_union, unionErrors: a }), E;
    }
    if (n.common.async)
      return Promise.all(
        r.map(async (i) => {
          const a = { ...n, common: { ...n.common, issues: [] }, parent: null };
          return {
            result: await i._parseAsync({
              data: n.data,
              path: n.path,
              parent: a,
            }),
            ctx: a,
          };
        }),
      ).then(s);
    {
      let i;
      const a = [];
      for (const l of r) {
        const u = { ...n, common: { ...n.common, issues: [] }, parent: null },
          c = l._parseSync({ data: n.data, path: n.path, parent: u });
        if (c.status === "valid") return c;
        c.status === "dirty" && !i && (i = { result: c, ctx: u }),
          u.common.issues.length && a.push(u.common.issues);
      }
      if (i) return n.common.issues.push(...i.ctx.common.issues), i.result;
      const o = a.map((l) => new Ne(l));
      return v(n, { code: f.invalid_union, unionErrors: o }), E;
    }
  }
  get options() {
    return this._def.options;
  }
}
Kt.create = (t, e) => new Kt({ options: t, typeName: T.ZodUnion, ...C(e) });
const Tn = (t) =>
  t instanceof en
    ? Tn(t.schema)
    : t instanceof De
      ? Tn(t.innerType())
      : t instanceof tn
        ? [t.value]
        : t instanceof Ke
          ? t.options
          : t instanceof nn
            ? Object.keys(t.enum)
            : t instanceof rn
              ? Tn(t._def.innerType)
              : t instanceof Jt
                ? [void 0]
                : t instanceof Bt
                  ? [null]
                  : null;
class tr extends I {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== g.object)
      return (
        v(n, {
          code: f.invalid_type,
          expected: g.object,
          received: n.parsedType,
        }),
        E
      );
    const r = this.discriminator,
      s = n.data[r],
      i = this.optionsMap.get(s);
    return i
      ? n.common.async
        ? i._parseAsync({ data: n.data, path: n.path, parent: n })
        : i._parseSync({ data: n.data, path: n.path, parent: n })
      : (v(n, {
          code: f.invalid_union_discriminator,
          options: Array.from(this.optionsMap.keys()),
          path: [r],
        }),
        E);
  }
  get discriminator() {
    return this._def.discriminator;
  }
  get options() {
    return this._def.options;
  }
  get optionsMap() {
    return this._def.optionsMap;
  }
  static create(e, n, r) {
    const s = new Map();
    for (const i of n) {
      const a = Tn(i.shape[e]);
      if (!a)
        throw new Error(
          `A discriminator value for key \`${e}\` could not be extracted from all schema options`,
        );
      for (const o of a) {
        if (s.has(o))
          throw new Error(
            `Discriminator property ${String(e)} has duplicate value ${String(o)}`,
          );
        s.set(o, i);
      }
    }
    return new tr({
      typeName: T.ZodDiscriminatedUnion,
      discriminator: e,
      options: n,
      optionsMap: s,
      ...C(r),
    });
  }
}
function Dr(t, e) {
  const n = Ge(t),
    r = Ge(e);
  if (t === e) return { valid: !0, data: t };
  if (n === g.object && r === g.object) {
    const s = L.objectKeys(e),
      i = L.objectKeys(t).filter((o) => s.indexOf(o) !== -1),
      a = { ...t, ...e };
    for (const o of i) {
      const l = Dr(t[o], e[o]);
      if (!l.valid) return { valid: !1 };
      a[o] = l.data;
    }
    return { valid: !0, data: a };
  } else if (n === g.array && r === g.array) {
    if (t.length !== e.length) return { valid: !1 };
    const s = [];
    for (let i = 0; i < t.length; i++) {
      const a = t[i],
        o = e[i],
        l = Dr(a, o);
      if (!l.valid) return { valid: !1 };
      s.push(l.data);
    }
    return { valid: !0, data: s };
  } else
    return n === g.date && r === g.date && +t == +e
      ? { valid: !0, data: t }
      : { valid: !1 };
}
class Qt extends I {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e),
      s = (i, a) => {
        if (Nr(i) || Nr(a)) return E;
        const o = Dr(i.value, a.value);
        return o.valid
          ? ((Mr(i) || Mr(a)) && n.dirty(), { status: n.value, value: o.data })
          : (v(r, { code: f.invalid_intersection_types }), E);
      };
    return r.common.async
      ? Promise.all([
          this._def.left._parseAsync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseAsync({
            data: r.data,
            path: r.path,
            parent: r,
          }),
        ]).then(([i, a]) => s(i, a))
      : s(
          this._def.left._parseSync({ data: r.data, path: r.path, parent: r }),
          this._def.right._parseSync({ data: r.data, path: r.path, parent: r }),
        );
  }
}
Qt.create = (t, e, n) =>
  new Qt({ left: t, right: e, typeName: T.ZodIntersection, ...C(n) });
class We extends I {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== g.array)
      return (
        v(r, {
          code: f.invalid_type,
          expected: g.array,
          received: r.parsedType,
        }),
        E
      );
    if (r.data.length < this._def.items.length)
      return (
        v(r, {
          code: f.too_small,
          minimum: this._def.items.length,
          inclusive: !0,
          exact: !1,
          type: "array",
        }),
        E
      );
    !this._def.rest &&
      r.data.length > this._def.items.length &&
      (v(r, {
        code: f.too_big,
        maximum: this._def.items.length,
        inclusive: !0,
        exact: !1,
        type: "array",
      }),
      n.dirty());
    const i = [...r.data]
      .map((a, o) => {
        const l = this._def.items[o] || this._def.rest;
        return l ? l._parse(new Ae(r, a, r.path, o)) : null;
      })
      .filter((a) => !!a);
    return r.common.async
      ? Promise.all(i).then((a) => le.mergeArray(n, a))
      : le.mergeArray(n, i);
  }
  get items() {
    return this._def.items;
  }
  rest(e) {
    return new We({ ...this._def, rest: e });
  }
}
We.create = (t, e) => {
  if (!Array.isArray(t))
    throw new Error("You must pass an array of schemas to z.tuple([ ... ])");
  return new We({ items: t, typeName: T.ZodTuple, rest: null, ...C(e) });
};
class Xt extends I {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== g.object)
      return (
        v(r, {
          code: f.invalid_type,
          expected: g.object,
          received: r.parsedType,
        }),
        E
      );
    const s = [],
      i = this._def.keyType,
      a = this._def.valueType;
    for (const o in r.data)
      s.push({
        key: i._parse(new Ae(r, o, r.path, o)),
        value: a._parse(new Ae(r, r.data[o], r.path, o)),
      });
    return r.common.async
      ? le.mergeObjectAsync(n, s)
      : le.mergeObjectSync(n, s);
  }
  get element() {
    return this._def.valueType;
  }
  static create(e, n, r) {
    return n instanceof I
      ? new Xt({ keyType: e, valueType: n, typeName: T.ZodRecord, ...C(r) })
      : new Xt({
          keyType: Ee.create(),
          valueType: e,
          typeName: T.ZodRecord,
          ...C(n),
        });
  }
}
class Fn extends I {
  get keySchema() {
    return this._def.keyType;
  }
  get valueSchema() {
    return this._def.valueType;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== g.map)
      return (
        v(r, { code: f.invalid_type, expected: g.map, received: r.parsedType }),
        E
      );
    const s = this._def.keyType,
      i = this._def.valueType,
      a = [...r.data.entries()].map(([o, l], u) => ({
        key: s._parse(new Ae(r, o, r.path, [u, "key"])),
        value: i._parse(new Ae(r, l, r.path, [u, "value"])),
      }));
    if (r.common.async) {
      const o = new Map();
      return Promise.resolve().then(async () => {
        for (const l of a) {
          const u = await l.key,
            c = await l.value;
          if (u.status === "aborted" || c.status === "aborted") return E;
          (u.status === "dirty" || c.status === "dirty") && n.dirty(),
            o.set(u.value, c.value);
        }
        return { status: n.value, value: o };
      });
    } else {
      const o = new Map();
      for (const l of a) {
        const u = l.key,
          c = l.value;
        if (u.status === "aborted" || c.status === "aborted") return E;
        (u.status === "dirty" || c.status === "dirty") && n.dirty(),
          o.set(u.value, c.value);
      }
      return { status: n.value, value: o };
    }
  }
}
Fn.create = (t, e, n) =>
  new Fn({ valueType: e, keyType: t, typeName: T.ZodMap, ...C(n) });
class lt extends I {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.parsedType !== g.set)
      return (
        v(r, { code: f.invalid_type, expected: g.set, received: r.parsedType }),
        E
      );
    const s = this._def;
    s.minSize !== null &&
      r.data.size < s.minSize.value &&
      (v(r, {
        code: f.too_small,
        minimum: s.minSize.value,
        type: "set",
        inclusive: !0,
        exact: !1,
        message: s.minSize.message,
      }),
      n.dirty()),
      s.maxSize !== null &&
        r.data.size > s.maxSize.value &&
        (v(r, {
          code: f.too_big,
          maximum: s.maxSize.value,
          type: "set",
          inclusive: !0,
          exact: !1,
          message: s.maxSize.message,
        }),
        n.dirty());
    const i = this._def.valueType;
    function a(l) {
      const u = new Set();
      for (const c of l) {
        if (c.status === "aborted") return E;
        c.status === "dirty" && n.dirty(), u.add(c.value);
      }
      return { status: n.value, value: u };
    }
    const o = [...r.data.values()].map((l, u) =>
      i._parse(new Ae(r, l, r.path, u)),
    );
    return r.common.async ? Promise.all(o).then((l) => a(l)) : a(o);
  }
  min(e, n) {
    return new lt({
      ...this._def,
      minSize: { value: e, message: S.toString(n) },
    });
  }
  max(e, n) {
    return new lt({
      ...this._def,
      maxSize: { value: e, message: S.toString(n) },
    });
  }
  size(e, n) {
    return this.min(e, n).max(e, n);
  }
  nonempty(e) {
    return this.min(1, e);
  }
}
lt.create = (t, e) =>
  new lt({
    valueType: t,
    minSize: null,
    maxSize: null,
    typeName: T.ZodSet,
    ...C(e),
  });
class wt extends I {
  constructor() {
    super(...arguments), (this.validate = this.implement);
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== g.function)
      return (
        v(n, {
          code: f.invalid_type,
          expected: g.function,
          received: n.parsedType,
        }),
        E
      );
    function r(o, l) {
      return Zn({
        data: o,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          Ln(),
          qt,
        ].filter((u) => !!u),
        issueData: { code: f.invalid_arguments, argumentsError: l },
      });
    }
    function s(o, l) {
      return Zn({
        data: o,
        path: n.path,
        errorMaps: [
          n.common.contextualErrorMap,
          n.schemaErrorMap,
          Ln(),
          qt,
        ].filter((u) => !!u),
        issueData: { code: f.invalid_return_type, returnTypeError: l },
      });
    }
    const i = { errorMap: n.common.contextualErrorMap },
      a = n.data;
    if (this._def.returns instanceof St) {
      const o = this;
      return he(async function (...l) {
        const u = new Ne([]),
          c = await o._def.args.parseAsync(l, i).catch((h) => {
            throw (u.addIssue(r(l, h)), u);
          }),
          d = await Reflect.apply(a, this, c);
        return await o._def.returns._def.type.parseAsync(d, i).catch((h) => {
          throw (u.addIssue(s(d, h)), u);
        });
      });
    } else {
      const o = this;
      return he(function (...l) {
        const u = o._def.args.safeParse(l, i);
        if (!u.success) throw new Ne([r(l, u.error)]);
        const c = Reflect.apply(a, this, u.data),
          d = o._def.returns.safeParse(c, i);
        if (!d.success) throw new Ne([s(c, d.error)]);
        return d.data;
      });
    }
  }
  parameters() {
    return this._def.args;
  }
  returnType() {
    return this._def.returns;
  }
  args(...e) {
    return new wt({ ...this._def, args: We.create(e).rest(st.create()) });
  }
  returns(e) {
    return new wt({ ...this._def, returns: e });
  }
  implement(e) {
    return this.parse(e);
  }
  strictImplement(e) {
    return this.parse(e);
  }
  static create(e, n, r) {
    return new wt({
      args: e || We.create([]).rest(st.create()),
      returns: n || st.create(),
      typeName: T.ZodFunction,
      ...C(r),
    });
  }
}
class en extends I {
  get schema() {
    return this._def.getter();
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    return this._def.getter()._parse({ data: n.data, path: n.path, parent: n });
  }
}
en.create = (t, e) => new en({ getter: t, typeName: T.ZodLazy, ...C(e) });
class tn extends I {
  _parse(e) {
    if (e.data !== this._def.value) {
      const n = this._getOrReturnCtx(e);
      return (
        v(n, {
          received: n.data,
          code: f.invalid_literal,
          expected: this._def.value,
        }),
        E
      );
    }
    return { status: "valid", value: e.data };
  }
  get value() {
    return this._def.value;
  }
}
tn.create = (t, e) => new tn({ value: t, typeName: T.ZodLiteral, ...C(e) });
function li(t, e) {
  return new Ke({ values: t, typeName: T.ZodEnum, ...C(e) });
}
class Ke extends I {
  _parse(e) {
    if (typeof e.data != "string") {
      const n = this._getOrReturnCtx(e),
        r = this._def.values;
      return (
        v(n, {
          expected: L.joinValues(r),
          received: n.parsedType,
          code: f.invalid_type,
        }),
        E
      );
    }
    if (this._def.values.indexOf(e.data) === -1) {
      const n = this._getOrReturnCtx(e),
        r = this._def.values;
      return (
        v(n, { received: n.data, code: f.invalid_enum_value, options: r }), E
      );
    }
    return he(e.data);
  }
  get options() {
    return this._def.values;
  }
  get enum() {
    const e = {};
    for (const n of this._def.values) e[n] = n;
    return e;
  }
  get Values() {
    const e = {};
    for (const n of this._def.values) e[n] = n;
    return e;
  }
  get Enum() {
    const e = {};
    for (const n of this._def.values) e[n] = n;
    return e;
  }
  extract(e) {
    return Ke.create(e);
  }
  exclude(e) {
    return Ke.create(this.options.filter((n) => !e.includes(n)));
  }
}
Ke.create = li;
class nn extends I {
  _parse(e) {
    const n = L.getValidEnumValues(this._def.values),
      r = this._getOrReturnCtx(e);
    if (r.parsedType !== g.string && r.parsedType !== g.number) {
      const s = L.objectValues(n);
      return (
        v(r, {
          expected: L.joinValues(s),
          received: r.parsedType,
          code: f.invalid_type,
        }),
        E
      );
    }
    if (n.indexOf(e.data) === -1) {
      const s = L.objectValues(n);
      return (
        v(r, { received: r.data, code: f.invalid_enum_value, options: s }), E
      );
    }
    return he(e.data);
  }
  get enum() {
    return this._def.values;
  }
}
nn.create = (t, e) => new nn({ values: t, typeName: T.ZodNativeEnum, ...C(e) });
class St extends I {
  unwrap() {
    return this._def.type;
  }
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    if (n.parsedType !== g.promise && n.common.async === !1)
      return (
        v(n, {
          code: f.invalid_type,
          expected: g.promise,
          received: n.parsedType,
        }),
        E
      );
    const r = n.parsedType === g.promise ? n.data : Promise.resolve(n.data);
    return he(
      r.then((s) =>
        this._def.type.parseAsync(s, {
          path: n.path,
          errorMap: n.common.contextualErrorMap,
        }),
      ),
    );
  }
}
St.create = (t, e) => new St({ type: t, typeName: T.ZodPromise, ...C(e) });
class De extends I {
  innerType() {
    return this._def.schema;
  }
  sourceType() {
    return this._def.schema._def.typeName === T.ZodEffects
      ? this._def.schema.sourceType()
      : this._def.schema;
  }
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e),
      s = this._def.effect || null,
      i = {
        addIssue: (a) => {
          v(r, a), a.fatal ? n.abort() : n.dirty();
        },
        get path() {
          return r.path;
        },
      };
    if (((i.addIssue = i.addIssue.bind(i)), s.type === "preprocess")) {
      const a = s.transform(r.data, i);
      return r.common.issues.length
        ? { status: "dirty", value: r.data }
        : r.common.async
          ? Promise.resolve(a).then((o) =>
              this._def.schema._parseAsync({
                data: o,
                path: r.path,
                parent: r,
              }),
            )
          : this._def.schema._parseSync({ data: a, path: r.path, parent: r });
    }
    if (s.type === "refinement") {
      const a = (o) => {
        const l = s.refinement(o, i);
        if (r.common.async) return Promise.resolve(l);
        if (l instanceof Promise)
          throw new Error(
            "Async refinement encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        return o;
      };
      if (r.common.async === !1) {
        const o = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r,
        });
        return o.status === "aborted"
          ? E
          : (o.status === "dirty" && n.dirty(),
            a(o.value),
            { status: n.value, value: o.value });
      } else
        return this._def.schema
          ._parseAsync({ data: r.data, path: r.path, parent: r })
          .then((o) =>
            o.status === "aborted"
              ? E
              : (o.status === "dirty" && n.dirty(),
                a(o.value).then(() => ({ status: n.value, value: o.value }))),
          );
    }
    if (s.type === "transform")
      if (r.common.async === !1) {
        const a = this._def.schema._parseSync({
          data: r.data,
          path: r.path,
          parent: r,
        });
        if (!Gt(a)) return a;
        const o = s.transform(a.value, i);
        if (o instanceof Promise)
          throw new Error(
            "Asynchronous transform encountered during synchronous parse operation. Use .parseAsync instead.",
          );
        return { status: n.value, value: o };
      } else
        return this._def.schema
          ._parseAsync({ data: r.data, path: r.path, parent: r })
          .then((a) =>
            Gt(a)
              ? Promise.resolve(s.transform(a.value, i)).then((o) => ({
                  status: n.value,
                  value: o,
                }))
              : a,
          );
    L.assertNever(s);
  }
}
De.create = (t, e, n) =>
  new De({ schema: t, typeName: T.ZodEffects, effect: e, ...C(n) });
De.createWithPreprocess = (t, e, n) =>
  new De({
    schema: e,
    effect: { type: "preprocess", transform: t },
    typeName: T.ZodEffects,
    ...C(n),
  });
class Ze extends I {
  _parse(e) {
    return this._getType(e) === g.undefined
      ? he(void 0)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
Ze.create = (t, e) =>
  new Ze({ innerType: t, typeName: T.ZodOptional, ...C(e) });
class ut extends I {
  _parse(e) {
    return this._getType(e) === g.null
      ? he(null)
      : this._def.innerType._parse(e);
  }
  unwrap() {
    return this._def.innerType;
  }
}
ut.create = (t, e) =>
  new ut({ innerType: t, typeName: T.ZodNullable, ...C(e) });
class rn extends I {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e);
    let r = n.data;
    return (
      n.parsedType === g.undefined && (r = this._def.defaultValue()),
      this._def.innerType._parse({ data: r, path: n.path, parent: n })
    );
  }
  removeDefault() {
    return this._def.innerType;
  }
}
rn.create = (t, e) =>
  new rn({
    innerType: t,
    typeName: T.ZodDefault,
    defaultValue: typeof e.default == "function" ? e.default : () => e.default,
    ...C(e),
  });
class Un extends I {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e),
      r = { ...n, common: { ...n.common, issues: [] } },
      s = this._def.innerType._parse({
        data: r.data,
        path: r.path,
        parent: { ...r },
      });
    return Vn(s)
      ? s.then((i) => ({
          status: "valid",
          value:
            i.status === "valid"
              ? i.value
              : this._def.catchValue({
                  get error() {
                    return new Ne(r.common.issues);
                  },
                  input: r.data,
                }),
        }))
      : {
          status: "valid",
          value:
            s.status === "valid"
              ? s.value
              : this._def.catchValue({
                  get error() {
                    return new Ne(r.common.issues);
                  },
                  input: r.data,
                }),
        };
  }
  removeCatch() {
    return this._def.innerType;
  }
}
Un.create = (t, e) =>
  new Un({
    innerType: t,
    typeName: T.ZodCatch,
    catchValue: typeof e.catch == "function" ? e.catch : () => e.catch,
    ...C(e),
  });
class jn extends I {
  _parse(e) {
    if (this._getType(e) !== g.nan) {
      const r = this._getOrReturnCtx(e);
      return (
        v(r, { code: f.invalid_type, expected: g.nan, received: r.parsedType }),
        E
      );
    }
    return { status: "valid", value: e.data };
  }
}
jn.create = (t) => new jn({ typeName: T.ZodNaN, ...C(t) });
const co = Symbol("zod_brand");
class ui extends I {
  _parse(e) {
    const { ctx: n } = this._processInputParams(e),
      r = n.data;
    return this._def.type._parse({ data: r, path: n.path, parent: n });
  }
  unwrap() {
    return this._def.type;
  }
}
class on extends I {
  _parse(e) {
    const { status: n, ctx: r } = this._processInputParams(e);
    if (r.common.async)
      return (async () => {
        const i = await this._def.in._parseAsync({
          data: r.data,
          path: r.path,
          parent: r,
        });
        return i.status === "aborted"
          ? E
          : i.status === "dirty"
            ? (n.dirty(), oi(i.value))
            : this._def.out._parseAsync({
                data: i.value,
                path: r.path,
                parent: r,
              });
      })();
    {
      const s = this._def.in._parseSync({
        data: r.data,
        path: r.path,
        parent: r,
      });
      return s.status === "aborted"
        ? E
        : s.status === "dirty"
          ? (n.dirty(), { status: "dirty", value: s.value })
          : this._def.out._parseSync({
              data: s.value,
              path: r.path,
              parent: r,
            });
    }
  }
  static create(e, n) {
    return new on({ in: e, out: n, typeName: T.ZodPipeline });
  }
}
class Hn extends I {
  _parse(e) {
    const n = this._def.innerType._parse(e);
    return Gt(n) && (n.value = Object.freeze(n.value)), n;
  }
}
Hn.create = (t, e) =>
  new Hn({ innerType: t, typeName: T.ZodReadonly, ...C(e) });
const ci = (t, e = {}, n) =>
    t
      ? kt.create().superRefine((r, s) => {
          var i, a;
          if (!t(r)) {
            const o =
                typeof e == "function"
                  ? e(r)
                  : typeof e == "string"
                    ? { message: e }
                    : e,
              l =
                (a = (i = o.fatal) !== null && i !== void 0 ? i : n) !== null &&
                a !== void 0
                  ? a
                  : !0,
              u = typeof o == "string" ? { message: o } : o;
            s.addIssue({ code: "custom", ...u, fatal: l });
          }
        })
      : kt.create(),
  fo = { object: j.lazycreate };
var T;
(function (t) {
  (t.ZodString = "ZodString"),
    (t.ZodNumber = "ZodNumber"),
    (t.ZodNaN = "ZodNaN"),
    (t.ZodBigInt = "ZodBigInt"),
    (t.ZodBoolean = "ZodBoolean"),
    (t.ZodDate = "ZodDate"),
    (t.ZodSymbol = "ZodSymbol"),
    (t.ZodUndefined = "ZodUndefined"),
    (t.ZodNull = "ZodNull"),
    (t.ZodAny = "ZodAny"),
    (t.ZodUnknown = "ZodUnknown"),
    (t.ZodNever = "ZodNever"),
    (t.ZodVoid = "ZodVoid"),
    (t.ZodArray = "ZodArray"),
    (t.ZodObject = "ZodObject"),
    (t.ZodUnion = "ZodUnion"),
    (t.ZodDiscriminatedUnion = "ZodDiscriminatedUnion"),
    (t.ZodIntersection = "ZodIntersection"),
    (t.ZodTuple = "ZodTuple"),
    (t.ZodRecord = "ZodRecord"),
    (t.ZodMap = "ZodMap"),
    (t.ZodSet = "ZodSet"),
    (t.ZodFunction = "ZodFunction"),
    (t.ZodLazy = "ZodLazy"),
    (t.ZodLiteral = "ZodLiteral"),
    (t.ZodEnum = "ZodEnum"),
    (t.ZodEffects = "ZodEffects"),
    (t.ZodNativeEnum = "ZodNativeEnum"),
    (t.ZodOptional = "ZodOptional"),
    (t.ZodNullable = "ZodNullable"),
    (t.ZodDefault = "ZodDefault"),
    (t.ZodCatch = "ZodCatch"),
    (t.ZodPromise = "ZodPromise"),
    (t.ZodBranded = "ZodBranded"),
    (t.ZodPipeline = "ZodPipeline"),
    (t.ZodReadonly = "ZodReadonly");
})(T || (T = {}));
const ho = (t, e = { message: `Input not instance of ${t.name}` }) =>
    ci((n) => n instanceof t, e),
  di = Ee.create,
  fi = Je.create,
  mo = jn.create,
  po = Be.create,
  hi = Yt.create,
  yo = ot.create,
  go = Pn.create,
  wo = Jt.create,
  vo = Bt.create,
  _o = kt.create,
  bo = st.create,
  ko = Pe.create,
  So = zn.create,
  To = Me.create,
  xo = j.create,
  Oo = j.strictCreate,
  Eo = Kt.create,
  Co = tr.create,
  No = Qt.create,
  Mo = We.create,
  Do = Xt.create,
  Io = Fn.create,
  $o = lt.create,
  Ao = wt.create,
  Wo = en.create,
  Ro = tn.create,
  Lo = Ke.create,
  Zo = nn.create,
  Vo = St.create,
  ls = De.create,
  Po = Ze.create,
  zo = ut.create,
  Fo = De.createWithPreprocess,
  Uo = on.create,
  jo = () => di().optional(),
  Ho = () => fi().optional(),
  qo = () => hi().optional(),
  Go = {
    string: (t) => Ee.create({ ...t, coerce: !0 }),
    number: (t) => Je.create({ ...t, coerce: !0 }),
    boolean: (t) => Yt.create({ ...t, coerce: !0 }),
    bigint: (t) => Be.create({ ...t, coerce: !0 }),
    date: (t) => ot.create({ ...t, coerce: !0 }),
  },
  Yo = E;
var D = Object.freeze({
  __proto__: null,
  defaultErrorMap: qt,
  setErrorMap: Ka,
  getErrorMap: Ln,
  makeIssue: Zn,
  EMPTY_PATH: Qa,
  addIssueToContext: v,
  ParseStatus: le,
  INVALID: E,
  DIRTY: oi,
  OK: he,
  isAborted: Nr,
  isDirty: Mr,
  isValid: Gt,
  isAsync: Vn,
  get util() {
    return L;
  },
  get objectUtil() {
    return Cr;
  },
  ZodParsedType: g,
  getParsedType: Ge,
  ZodType: I,
  ZodString: Ee,
  ZodNumber: Je,
  ZodBigInt: Be,
  ZodBoolean: Yt,
  ZodDate: ot,
  ZodSymbol: Pn,
  ZodUndefined: Jt,
  ZodNull: Bt,
  ZodAny: kt,
  ZodUnknown: st,
  ZodNever: Pe,
  ZodVoid: zn,
  ZodArray: Me,
  ZodObject: j,
  ZodUnion: Kt,
  ZodDiscriminatedUnion: tr,
  ZodIntersection: Qt,
  ZodTuple: We,
  ZodRecord: Xt,
  ZodMap: Fn,
  ZodSet: lt,
  ZodFunction: wt,
  ZodLazy: en,
  ZodLiteral: tn,
  ZodEnum: Ke,
  ZodNativeEnum: nn,
  ZodPromise: St,
  ZodEffects: De,
  ZodTransformer: De,
  ZodOptional: Ze,
  ZodNullable: ut,
  ZodDefault: rn,
  ZodCatch: Un,
  ZodNaN: jn,
  BRAND: co,
  ZodBranded: ui,
  ZodPipeline: on,
  ZodReadonly: Hn,
  custom: ci,
  Schema: I,
  ZodSchema: I,
  late: fo,
  get ZodFirstPartyTypeKind() {
    return T;
  },
  coerce: Go,
  any: _o,
  array: To,
  bigint: po,
  boolean: hi,
  date: yo,
  discriminatedUnion: Co,
  effect: ls,
  enum: Lo,
  function: Ao,
  instanceof: ho,
  intersection: No,
  lazy: Wo,
  literal: Ro,
  map: Io,
  nan: mo,
  nativeEnum: Zo,
  never: ko,
  null: vo,
  nullable: zo,
  number: fi,
  object: xo,
  oboolean: qo,
  onumber: Ho,
  optional: Po,
  ostring: jo,
  pipeline: Uo,
  preprocess: Fo,
  promise: Vo,
  record: Do,
  set: $o,
  strictObject: Oo,
  string: di,
  symbol: go,
  transformer: ls,
  tuple: Mo,
  undefined: wo,
  union: Eo,
  unknown: bo,
  void: So,
  NEVER: Yo,
  ZodIssueCode: f,
  quotelessJson: Ba,
  ZodError: Ne,
});
class ct extends Error {}
class Jo extends ct {
  constructor(e) {
    super(`Invalid DateTime: ${e.toMessage()}`);
  }
}
class Bo extends ct {
  constructor(e) {
    super(`Invalid Interval: ${e.toMessage()}`);
  }
}
class Ko extends ct {
  constructor(e) {
    super(`Invalid Duration: ${e.toMessage()}`);
  }
}
class yt extends ct {}
class mi extends ct {
  constructor(e) {
    super(`Invalid unit ${e}`);
  }
}
class pe extends ct {}
class je extends ct {
  constructor() {
    super("Zone is an abstract class");
  }
}
const p = "numeric",
  Ie = "short",
  ge = "long",
  qn = { year: p, month: p, day: p },
  pi = { year: p, month: Ie, day: p },
  Qo = { year: p, month: Ie, day: p, weekday: Ie },
  yi = { year: p, month: ge, day: p },
  gi = { year: p, month: ge, day: p, weekday: ge },
  wi = { hour: p, minute: p },
  vi = { hour: p, minute: p, second: p },
  _i = { hour: p, minute: p, second: p, timeZoneName: Ie },
  bi = { hour: p, minute: p, second: p, timeZoneName: ge },
  ki = { hour: p, minute: p, hourCycle: "h23" },
  Si = { hour: p, minute: p, second: p, hourCycle: "h23" },
  Ti = { hour: p, minute: p, second: p, hourCycle: "h23", timeZoneName: Ie },
  xi = { hour: p, minute: p, second: p, hourCycle: "h23", timeZoneName: ge },
  Oi = { year: p, month: p, day: p, hour: p, minute: p },
  Ei = { year: p, month: p, day: p, hour: p, minute: p, second: p },
  Ci = { year: p, month: Ie, day: p, hour: p, minute: p },
  Ni = { year: p, month: Ie, day: p, hour: p, minute: p, second: p },
  Xo = { year: p, month: Ie, day: p, weekday: Ie, hour: p, minute: p },
  Mi = { year: p, month: ge, day: p, hour: p, minute: p, timeZoneName: Ie },
  Di = {
    year: p,
    month: ge,
    day: p,
    hour: p,
    minute: p,
    second: p,
    timeZoneName: Ie,
  },
  Ii = {
    year: p,
    month: ge,
    day: p,
    weekday: ge,
    hour: p,
    minute: p,
    timeZoneName: ge,
  },
  $i = {
    year: p,
    month: ge,
    day: p,
    weekday: ge,
    hour: p,
    minute: p,
    second: p,
    timeZoneName: ge,
  };
class ln {
  get type() {
    throw new je();
  }
  get name() {
    throw new je();
  }
  get ianaName() {
    return this.name;
  }
  get isUniversal() {
    throw new je();
  }
  offsetName(e, n) {
    throw new je();
  }
  formatOffset(e, n) {
    throw new je();
  }
  offset(e) {
    throw new je();
  }
  equals(e) {
    throw new je();
  }
  get isValid() {
    throw new je();
  }
}
let dr = null;
class nr extends ln {
  static get instance() {
    return dr === null && (dr = new nr()), dr;
  }
  get type() {
    return "system";
  }
  get name() {
    return new Intl.DateTimeFormat().resolvedOptions().timeZone;
  }
  get isUniversal() {
    return !1;
  }
  offsetName(e, { format: n, locale: r }) {
    return Fi(e, n, r);
  }
  formatOffset(e, n) {
    return Ft(this.offset(e), n);
  }
  offset(e) {
    return -new Date(e).getTimezoneOffset();
  }
  equals(e) {
    return e.type === "system";
  }
  get isValid() {
    return !0;
  }
}
let xn = {};
function el(t) {
  return (
    xn[t] ||
      (xn[t] = new Intl.DateTimeFormat("en-US", {
        hour12: !1,
        timeZone: t,
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        era: "short",
      })),
    xn[t]
  );
}
const tl = { year: 0, month: 1, day: 2, era: 3, hour: 4, minute: 5, second: 6 };
function nl(t, e) {
  const n = t.format(e).replace(/\u200E/g, ""),
    r = /(\d+)\/(\d+)\/(\d+) (AD|BC),? (\d+):(\d+):(\d+)/.exec(n),
    [, s, i, a, o, l, u, c] = r;
  return [a, s, i, o, l, u, c];
}
function rl(t, e) {
  const n = t.formatToParts(e),
    r = [];
  for (let s = 0; s < n.length; s++) {
    const { type: i, value: a } = n[s],
      o = tl[i];
    i === "era" ? (r[o] = a) : O(o) || (r[o] = parseInt(a, 10));
  }
  return r;
}
let pn = {};
class ze extends ln {
  static create(e) {
    return pn[e] || (pn[e] = new ze(e)), pn[e];
  }
  static resetCache() {
    (pn = {}), (xn = {});
  }
  static isValidSpecifier(e) {
    return this.isValidZone(e);
  }
  static isValidZone(e) {
    if (!e) return !1;
    try {
      return new Intl.DateTimeFormat("en-US", { timeZone: e }).format(), !0;
    } catch {
      return !1;
    }
  }
  constructor(e) {
    super(), (this.zoneName = e), (this.valid = ze.isValidZone(e));
  }
  get type() {
    return "iana";
  }
  get name() {
    return this.zoneName;
  }
  get isUniversal() {
    return !1;
  }
  offsetName(e, { format: n, locale: r }) {
    return Fi(e, n, r, this.name);
  }
  formatOffset(e, n) {
    return Ft(this.offset(e), n);
  }
  offset(e) {
    const n = new Date(e);
    if (isNaN(n)) return NaN;
    const r = el(this.name);
    let [s, i, a, o, l, u, c] = r.formatToParts ? rl(r, n) : nl(r, n);
    o === "BC" && (s = -Math.abs(s) + 1);
    const w = sr({
      year: s,
      month: i,
      day: a,
      hour: l === 24 ? 0 : l,
      minute: u,
      second: c,
      millisecond: 0,
    });
    let h = +n;
    const $ = h % 1e3;
    return (h -= $ >= 0 ? $ : 1e3 + $), (w - h) / (60 * 1e3);
  }
  equals(e) {
    return e.type === "iana" && e.name === this.name;
  }
  get isValid() {
    return this.valid;
  }
}
let us = {};
function sl(t, e = {}) {
  const n = JSON.stringify([t, e]);
  let r = us[n];
  return r || ((r = new Intl.ListFormat(t, e)), (us[n] = r)), r;
}
let Ir = {};
function $r(t, e = {}) {
  const n = JSON.stringify([t, e]);
  let r = Ir[n];
  return r || ((r = new Intl.DateTimeFormat(t, e)), (Ir[n] = r)), r;
}
let Ar = {};
function il(t, e = {}) {
  const n = JSON.stringify([t, e]);
  let r = Ar[n];
  return r || ((r = new Intl.NumberFormat(t, e)), (Ar[n] = r)), r;
}
let Wr = {};
function al(t, e = {}) {
  const { base: n, ...r } = e,
    s = JSON.stringify([t, r]);
  let i = Wr[s];
  return i || ((i = new Intl.RelativeTimeFormat(t, e)), (Wr[s] = i)), i;
}
let Pt = null;
function ol() {
  return Pt || ((Pt = new Intl.DateTimeFormat().resolvedOptions().locale), Pt);
}
let cs = {};
function ll(t) {
  let e = cs[t];
  if (!e) {
    const n = new Intl.Locale(t);
    (e = "getWeekInfo" in n ? n.getWeekInfo() : n.weekInfo), (cs[t] = e);
  }
  return e;
}
function ul(t) {
  const e = t.indexOf("-x-");
  e !== -1 && (t = t.substring(0, e));
  const n = t.indexOf("-u-");
  if (n === -1) return [t];
  {
    let r, s;
    try {
      (r = $r(t).resolvedOptions()), (s = t);
    } catch {
      const l = t.substring(0, n);
      (r = $r(l).resolvedOptions()), (s = l);
    }
    const { numberingSystem: i, calendar: a } = r;
    return [s, i, a];
  }
}
function cl(t, e, n) {
  return (
    (n || e) &&
      (t.includes("-u-") || (t += "-u"),
      n && (t += `-ca-${n}`),
      e && (t += `-nu-${e}`)),
    t
  );
}
function dl(t) {
  const e = [];
  for (let n = 1; n <= 12; n++) {
    const r = K.utc(2009, n, 1);
    e.push(t(r));
  }
  return e;
}
function fl(t) {
  const e = [];
  for (let n = 1; n <= 7; n++) {
    const r = K.utc(2016, 11, 13 + n);
    e.push(t(r));
  }
  return e;
}
function yn(t, e, n, r) {
  const s = t.listingMode();
  return s === "error" ? null : s === "en" ? n(e) : r(e);
}
function hl(t) {
  return t.numberingSystem && t.numberingSystem !== "latn"
    ? !1
    : t.numberingSystem === "latn" ||
        !t.locale ||
        t.locale.startsWith("en") ||
        new Intl.DateTimeFormat(t.intl).resolvedOptions().numberingSystem ===
          "latn";
}
class ml {
  constructor(e, n, r) {
    (this.padTo = r.padTo || 0), (this.floor = r.floor || !1);
    const { padTo: s, floor: i, ...a } = r;
    if (!n || Object.keys(a).length > 0) {
      const o = { useGrouping: !1, ...r };
      r.padTo > 0 && (o.minimumIntegerDigits = r.padTo), (this.inf = il(e, o));
    }
  }
  format(e) {
    if (this.inf) {
      const n = this.floor ? Math.floor(e) : e;
      return this.inf.format(n);
    } else {
      const n = this.floor ? Math.floor(e) : qr(e, 3);
      return B(n, this.padTo);
    }
  }
}
class pl {
  constructor(e, n, r) {
    (this.opts = r), (this.originalZone = void 0);
    let s;
    if (this.opts.timeZone) this.dt = e;
    else if (e.zone.type === "fixed") {
      const a = -1 * (e.offset / 60),
        o = a >= 0 ? `Etc/GMT+${a}` : `Etc/GMT${a}`;
      e.offset !== 0 && ze.create(o).valid
        ? ((s = o), (this.dt = e))
        : ((s = "UTC"),
          (this.dt =
            e.offset === 0 ? e : e.setZone("UTC").plus({ minutes: e.offset })),
          (this.originalZone = e.zone));
    } else
      e.zone.type === "system"
        ? (this.dt = e)
        : e.zone.type === "iana"
          ? ((this.dt = e), (s = e.zone.name))
          : ((s = "UTC"),
            (this.dt = e.setZone("UTC").plus({ minutes: e.offset })),
            (this.originalZone = e.zone));
    const i = { ...this.opts };
    (i.timeZone = i.timeZone || s), (this.dtf = $r(n, i));
  }
  format() {
    return this.originalZone
      ? this.formatToParts()
          .map(({ value: e }) => e)
          .join("")
      : this.dtf.format(this.dt.toJSDate());
  }
  formatToParts() {
    const e = this.dtf.formatToParts(this.dt.toJSDate());
    return this.originalZone
      ? e.map((n) => {
          if (n.type === "timeZoneName") {
            const r = this.originalZone.offsetName(this.dt.ts, {
              locale: this.dt.locale,
              format: this.opts.timeZoneName,
            });
            return { ...n, value: r };
          } else return n;
        })
      : e;
  }
  resolvedOptions() {
    return this.dtf.resolvedOptions();
  }
}
class yl {
  constructor(e, n, r) {
    (this.opts = { style: "long", ...r }), !n && Pi() && (this.rtf = al(e, r));
  }
  format(e, n) {
    return this.rtf
      ? this.rtf.format(e, n)
      : Rl(n, e, this.opts.numeric, this.opts.style !== "long");
  }
  formatToParts(e, n) {
    return this.rtf ? this.rtf.formatToParts(e, n) : [];
  }
}
const gl = { firstDay: 1, minimalDays: 4, weekend: [6, 7] };
class z {
  static fromOpts(e) {
    return z.create(
      e.locale,
      e.numberingSystem,
      e.outputCalendar,
      e.weekSettings,
      e.defaultToEN,
    );
  }
  static create(e, n, r, s, i = !1) {
    const a = e || J.defaultLocale,
      o = a || (i ? "en-US" : ol()),
      l = n || J.defaultNumberingSystem,
      u = r || J.defaultOutputCalendar,
      c = Rr(s) || J.defaultWeekSettings;
    return new z(o, l, u, c, a);
  }
  static resetCache() {
    (Pt = null), (Ir = {}), (Ar = {}), (Wr = {});
  }
  static fromObject({
    locale: e,
    numberingSystem: n,
    outputCalendar: r,
    weekSettings: s,
  } = {}) {
    return z.create(e, n, r, s);
  }
  constructor(e, n, r, s, i) {
    const [a, o, l] = ul(e);
    (this.locale = a),
      (this.numberingSystem = n || o || null),
      (this.outputCalendar = r || l || null),
      (this.weekSettings = s),
      (this.intl = cl(this.locale, this.numberingSystem, this.outputCalendar)),
      (this.weekdaysCache = { format: {}, standalone: {} }),
      (this.monthsCache = { format: {}, standalone: {} }),
      (this.meridiemCache = null),
      (this.eraCache = {}),
      (this.specifiedLocale = i),
      (this.fastNumbersCached = null);
  }
  get fastNumbers() {
    return (
      this.fastNumbersCached == null && (this.fastNumbersCached = hl(this)),
      this.fastNumbersCached
    );
  }
  listingMode() {
    const e = this.isEnglish(),
      n =
        (this.numberingSystem === null || this.numberingSystem === "latn") &&
        (this.outputCalendar === null || this.outputCalendar === "gregory");
    return e && n ? "en" : "intl";
  }
  clone(e) {
    return !e || Object.getOwnPropertyNames(e).length === 0
      ? this
      : z.create(
          e.locale || this.specifiedLocale,
          e.numberingSystem || this.numberingSystem,
          e.outputCalendar || this.outputCalendar,
          Rr(e.weekSettings) || this.weekSettings,
          e.defaultToEN || !1,
        );
  }
  redefaultToEN(e = {}) {
    return this.clone({ ...e, defaultToEN: !0 });
  }
  redefaultToSystem(e = {}) {
    return this.clone({ ...e, defaultToEN: !1 });
  }
  months(e, n = !1) {
    return yn(this, e, Hi, () => {
      const r = n ? { month: e, day: "numeric" } : { month: e },
        s = n ? "format" : "standalone";
      return (
        this.monthsCache[s][e] ||
          (this.monthsCache[s][e] = dl((i) => this.extract(i, r, "month"))),
        this.monthsCache[s][e]
      );
    });
  }
  weekdays(e, n = !1) {
    return yn(this, e, Yi, () => {
      const r = n
          ? { weekday: e, year: "numeric", month: "long", day: "numeric" }
          : { weekday: e },
        s = n ? "format" : "standalone";
      return (
        this.weekdaysCache[s][e] ||
          (this.weekdaysCache[s][e] = fl((i) => this.extract(i, r, "weekday"))),
        this.weekdaysCache[s][e]
      );
    });
  }
  meridiems() {
    return yn(
      this,
      void 0,
      () => Ji,
      () => {
        if (!this.meridiemCache) {
          const e = { hour: "numeric", hourCycle: "h12" };
          this.meridiemCache = [
            K.utc(2016, 11, 13, 9),
            K.utc(2016, 11, 13, 19),
          ].map((n) => this.extract(n, e, "dayperiod"));
        }
        return this.meridiemCache;
      },
    );
  }
  eras(e) {
    return yn(this, e, Bi, () => {
      const n = { era: e };
      return (
        this.eraCache[e] ||
          (this.eraCache[e] = [K.utc(-40, 1, 1), K.utc(2017, 1, 1)].map((r) =>
            this.extract(r, n, "era"),
          )),
        this.eraCache[e]
      );
    });
  }
  extract(e, n, r) {
    const s = this.dtFormatter(e, n),
      i = s.formatToParts(),
      a = i.find((o) => o.type.toLowerCase() === r);
    return a ? a.value : null;
  }
  numberFormatter(e = {}) {
    return new ml(this.intl, e.forceSimple || this.fastNumbers, e);
  }
  dtFormatter(e, n = {}) {
    return new pl(e, this.intl, n);
  }
  relFormatter(e = {}) {
    return new yl(this.intl, this.isEnglish(), e);
  }
  listFormatter(e = {}) {
    return sl(this.intl, e);
  }
  isEnglish() {
    return (
      this.locale === "en" ||
      this.locale.toLowerCase() === "en-us" ||
      new Intl.DateTimeFormat(this.intl)
        .resolvedOptions()
        .locale.startsWith("en-us")
    );
  }
  getWeekSettings() {
    return this.weekSettings ? this.weekSettings : zi() ? ll(this.locale) : gl;
  }
  getStartOfWeek() {
    return this.getWeekSettings().firstDay;
  }
  getMinDaysInFirstWeek() {
    return this.getWeekSettings().minimalDays;
  }
  getWeekendDays() {
    return this.getWeekSettings().weekend;
  }
  equals(e) {
    return (
      this.locale === e.locale &&
      this.numberingSystem === e.numberingSystem &&
      this.outputCalendar === e.outputCalendar
    );
  }
}
let fr = null;
class fe extends ln {
  static get utcInstance() {
    return fr === null && (fr = new fe(0)), fr;
  }
  static instance(e) {
    return e === 0 ? fe.utcInstance : new fe(e);
  }
  static parseSpecifier(e) {
    if (e) {
      const n = e.match(/^utc(?:([+-]\d{1,2})(?::(\d{2}))?)?$/i);
      if (n) return new fe(ir(n[1], n[2]));
    }
    return null;
  }
  constructor(e) {
    super(), (this.fixed = e);
  }
  get type() {
    return "fixed";
  }
  get name() {
    return this.fixed === 0 ? "UTC" : `UTC${Ft(this.fixed, "narrow")}`;
  }
  get ianaName() {
    return this.fixed === 0 ? "Etc/UTC" : `Etc/GMT${Ft(-this.fixed, "narrow")}`;
  }
  offsetName() {
    return this.name;
  }
  formatOffset(e, n) {
    return Ft(this.fixed, n);
  }
  get isUniversal() {
    return !0;
  }
  offset() {
    return this.fixed;
  }
  equals(e) {
    return e.type === "fixed" && e.fixed === this.fixed;
  }
  get isValid() {
    return !0;
  }
}
class wl extends ln {
  constructor(e) {
    super(), (this.zoneName = e);
  }
  get type() {
    return "invalid";
  }
  get name() {
    return this.zoneName;
  }
  get isUniversal() {
    return !1;
  }
  offsetName() {
    return null;
  }
  formatOffset() {
    return "";
  }
  offset() {
    return NaN;
  }
  equals() {
    return !1;
  }
  get isValid() {
    return !1;
  }
}
function Ye(t, e) {
  if (O(t) || t === null) return e;
  if (t instanceof ln) return t;
  if (bl(t)) {
    const n = t.toLowerCase();
    return n === "default"
      ? e
      : n === "local" || n === "system"
        ? nr.instance
        : n === "utc" || n === "gmt"
          ? fe.utcInstance
          : fe.parseSpecifier(n) || ze.create(t);
  } else
    return it(t)
      ? fe.instance(t)
      : typeof t == "object" && "offset" in t && typeof t.offset == "function"
        ? t
        : new wl(t);
}
let ds = () => Date.now(),
  fs = "system",
  hs = null,
  ms = null,
  ps = null,
  ys = 60,
  gs,
  ws = null;
class J {
  static get now() {
    return ds;
  }
  static set now(e) {
    ds = e;
  }
  static set defaultZone(e) {
    fs = e;
  }
  static get defaultZone() {
    return Ye(fs, nr.instance);
  }
  static get defaultLocale() {
    return hs;
  }
  static set defaultLocale(e) {
    hs = e;
  }
  static get defaultNumberingSystem() {
    return ms;
  }
  static set defaultNumberingSystem(e) {
    ms = e;
  }
  static get defaultOutputCalendar() {
    return ps;
  }
  static set defaultOutputCalendar(e) {
    ps = e;
  }
  static get defaultWeekSettings() {
    return ws;
  }
  static set defaultWeekSettings(e) {
    ws = Rr(e);
  }
  static get twoDigitCutoffYear() {
    return ys;
  }
  static set twoDigitCutoffYear(e) {
    ys = e % 100;
  }
  static get throwOnInvalid() {
    return gs;
  }
  static set throwOnInvalid(e) {
    gs = e;
  }
  static resetCaches() {
    z.resetCache(), ze.resetCache();
  }
}
class Ce {
  constructor(e, n) {
    (this.reason = e), (this.explanation = n);
  }
  toMessage() {
    return this.explanation
      ? `${this.reason}: ${this.explanation}`
      : this.reason;
  }
}
const Ai = [0, 31, 59, 90, 120, 151, 181, 212, 243, 273, 304, 334],
  Wi = [0, 31, 60, 91, 121, 152, 182, 213, 244, 274, 305, 335];
function ke(t, e) {
  return new Ce(
    "unit out of range",
    `you specified ${e} (of type ${typeof e}) as a ${t}, which is invalid`,
  );
}
function Ur(t, e, n) {
  const r = new Date(Date.UTC(t, e - 1, n));
  t < 100 && t >= 0 && r.setUTCFullYear(r.getUTCFullYear() - 1900);
  const s = r.getUTCDay();
  return s === 0 ? 7 : s;
}
function Ri(t, e, n) {
  return n + (un(t) ? Wi : Ai)[e - 1];
}
function Li(t, e) {
  const n = un(t) ? Wi : Ai,
    r = n.findIndex((i) => i < e),
    s = e - n[r];
  return { month: r + 1, day: s };
}
function jr(t, e) {
  return ((t - e + 7) % 7) + 1;
}
function Gn(t, e = 4, n = 1) {
  const { year: r, month: s, day: i } = t,
    a = Ri(r, s, i),
    o = jr(Ur(r, s, i), n);
  let l = Math.floor((a - o + 14 - e) / 7),
    u;
  return (
    l < 1
      ? ((u = r - 1), (l = sn(u, e, n)))
      : l > sn(r, e, n)
        ? ((u = r + 1), (l = 1))
        : (u = r),
    { weekYear: u, weekNumber: l, weekday: o, ...ar(t) }
  );
}
function vs(t, e = 4, n = 1) {
  const { weekYear: r, weekNumber: s, weekday: i } = t,
    a = jr(Ur(r, 1, e), n),
    o = vt(r);
  let l = s * 7 + i - a - 7 + e,
    u;
  l < 1
    ? ((u = r - 1), (l += vt(u)))
    : l > o
      ? ((u = r + 1), (l -= vt(r)))
      : (u = r);
  const { month: c, day: d } = Li(u, l);
  return { year: u, month: c, day: d, ...ar(t) };
}
function hr(t) {
  const { year: e, month: n, day: r } = t,
    s = Ri(e, n, r);
  return { year: e, ordinal: s, ...ar(t) };
}
function _s(t) {
  const { year: e, ordinal: n } = t,
    { month: r, day: s } = Li(e, n);
  return { year: e, month: r, day: s, ...ar(t) };
}
function bs(t, e) {
  if (!O(t.localWeekday) || !O(t.localWeekNumber) || !O(t.localWeekYear)) {
    if (!O(t.weekday) || !O(t.weekNumber) || !O(t.weekYear))
      throw new yt(
        "Cannot mix locale-based week fields with ISO-based week fields",
      );
    return (
      O(t.localWeekday) || (t.weekday = t.localWeekday),
      O(t.localWeekNumber) || (t.weekNumber = t.localWeekNumber),
      O(t.localWeekYear) || (t.weekYear = t.localWeekYear),
      delete t.localWeekday,
      delete t.localWeekNumber,
      delete t.localWeekYear,
      {
        minDaysInFirstWeek: e.getMinDaysInFirstWeek(),
        startOfWeek: e.getStartOfWeek(),
      }
    );
  } else return { minDaysInFirstWeek: 4, startOfWeek: 1 };
}
function vl(t, e = 4, n = 1) {
  const r = rr(t.weekYear),
    s = Se(t.weekNumber, 1, sn(t.weekYear, e, n)),
    i = Se(t.weekday, 1, 7);
  return r
    ? s
      ? i
        ? !1
        : ke("weekday", t.weekday)
      : ke("week", t.weekNumber)
    : ke("weekYear", t.weekYear);
}
function _l(t) {
  const e = rr(t.year),
    n = Se(t.ordinal, 1, vt(t.year));
  return e ? (n ? !1 : ke("ordinal", t.ordinal)) : ke("year", t.year);
}
function Zi(t) {
  const e = rr(t.year),
    n = Se(t.month, 1, 12),
    r = Se(t.day, 1, Yn(t.year, t.month));
  return e
    ? n
      ? r
        ? !1
        : ke("day", t.day)
      : ke("month", t.month)
    : ke("year", t.year);
}
function Vi(t) {
  const { hour: e, minute: n, second: r, millisecond: s } = t,
    i = Se(e, 0, 23) || (e === 24 && n === 0 && r === 0 && s === 0),
    a = Se(n, 0, 59),
    o = Se(r, 0, 59),
    l = Se(s, 0, 999);
  return i
    ? a
      ? o
        ? l
          ? !1
          : ke("millisecond", s)
        : ke("second", r)
      : ke("minute", n)
    : ke("hour", e);
}
function O(t) {
  return typeof t > "u";
}
function it(t) {
  return typeof t == "number";
}
function rr(t) {
  return typeof t == "number" && t % 1 === 0;
}
function bl(t) {
  return typeof t == "string";
}
function kl(t) {
  return Object.prototype.toString.call(t) === "[object Date]";
}
function Pi() {
  try {
    return typeof Intl < "u" && !!Intl.RelativeTimeFormat;
  } catch {
    return !1;
  }
}
function zi() {
  try {
    return (
      typeof Intl < "u" &&
      !!Intl.Locale &&
      ("weekInfo" in Intl.Locale.prototype ||
        "getWeekInfo" in Intl.Locale.prototype)
    );
  } catch {
    return !1;
  }
}
function Sl(t) {
  return Array.isArray(t) ? t : [t];
}
function ks(t, e, n) {
  if (t.length !== 0)
    return t.reduce((r, s) => {
      const i = [e(s), s];
      return r && n(r[0], i[0]) === r[0] ? r : i;
    }, null)[1];
}
function Tl(t, e) {
  return e.reduce((n, r) => ((n[r] = t[r]), n), {});
}
function Tt(t, e) {
  return Object.prototype.hasOwnProperty.call(t, e);
}
function Rr(t) {
  if (t == null) return null;
  if (typeof t != "object") throw new pe("Week settings must be an object");
  if (
    !Se(t.firstDay, 1, 7) ||
    !Se(t.minimalDays, 1, 7) ||
    !Array.isArray(t.weekend) ||
    t.weekend.some((e) => !Se(e, 1, 7))
  )
    throw new pe("Invalid week settings");
  return {
    firstDay: t.firstDay,
    minimalDays: t.minimalDays,
    weekend: Array.from(t.weekend),
  };
}
function Se(t, e, n) {
  return rr(t) && t >= e && t <= n;
}
function xl(t, e) {
  return t - e * Math.floor(t / e);
}
function B(t, e = 2) {
  const n = t < 0;
  let r;
  return (
    n
      ? (r = "-" + ("" + -t).padStart(e, "0"))
      : (r = ("" + t).padStart(e, "0")),
    r
  );
}
function qe(t) {
  if (!(O(t) || t === null || t === "")) return parseInt(t, 10);
}
function tt(t) {
  if (!(O(t) || t === null || t === "")) return parseFloat(t);
}
function Hr(t) {
  if (!(O(t) || t === null || t === "")) {
    const e = parseFloat("0." + t) * 1e3;
    return Math.floor(e);
  }
}
function qr(t, e, n = !1) {
  const r = 10 ** e;
  return (n ? Math.trunc : Math.round)(t * r) / r;
}
function un(t) {
  return t % 4 === 0 && (t % 100 !== 0 || t % 400 === 0);
}
function vt(t) {
  return un(t) ? 366 : 365;
}
function Yn(t, e) {
  const n = xl(e - 1, 12) + 1,
    r = t + (e - n) / 12;
  return n === 2
    ? un(r)
      ? 29
      : 28
    : [31, null, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31][n - 1];
}
function sr(t) {
  let e = Date.UTC(
    t.year,
    t.month - 1,
    t.day,
    t.hour,
    t.minute,
    t.second,
    t.millisecond,
  );
  return (
    t.year < 100 &&
      t.year >= 0 &&
      ((e = new Date(e)), e.setUTCFullYear(t.year, t.month - 1, t.day)),
    +e
  );
}
function Ss(t, e, n) {
  return -jr(Ur(t, 1, e), n) + e - 1;
}
function sn(t, e = 4, n = 1) {
  const r = Ss(t, e, n),
    s = Ss(t + 1, e, n);
  return (vt(t) - r + s) / 7;
}
function Lr(t) {
  return t > 99 ? t : t > J.twoDigitCutoffYear ? 1900 + t : 2e3 + t;
}
function Fi(t, e, n, r = null) {
  const s = new Date(t),
    i = {
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
    };
  r && (i.timeZone = r);
  const a = { timeZoneName: e, ...i },
    o = new Intl.DateTimeFormat(n, a)
      .formatToParts(s)
      .find((l) => l.type.toLowerCase() === "timezonename");
  return o ? o.value : null;
}
function ir(t, e) {
  let n = parseInt(t, 10);
  Number.isNaN(n) && (n = 0);
  const r = parseInt(e, 10) || 0,
    s = n < 0 || Object.is(n, -0) ? -r : r;
  return n * 60 + s;
}
function Ui(t) {
  const e = Number(t);
  if (typeof t == "boolean" || t === "" || Number.isNaN(e))
    throw new pe(`Invalid unit value ${t}`);
  return e;
}
function Jn(t, e) {
  const n = {};
  for (const r in t)
    if (Tt(t, r)) {
      const s = t[r];
      if (s == null) continue;
      n[e(r)] = Ui(s);
    }
  return n;
}
function Ft(t, e) {
  const n = Math.trunc(Math.abs(t / 60)),
    r = Math.trunc(Math.abs(t % 60)),
    s = t >= 0 ? "+" : "-";
  switch (e) {
    case "short":
      return `${s}${B(n, 2)}:${B(r, 2)}`;
    case "narrow":
      return `${s}${n}${r > 0 ? `:${r}` : ""}`;
    case "techie":
      return `${s}${B(n, 2)}${B(r, 2)}`;
    default:
      throw new RangeError(
        `Value format ${e} is out of range for property format`,
      );
  }
}
function ar(t) {
  return Tl(t, ["hour", "minute", "second", "millisecond"]);
}
const Ol = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ],
  ji = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ],
  El = ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"];
function Hi(t) {
  switch (t) {
    case "narrow":
      return [...El];
    case "short":
      return [...ji];
    case "long":
      return [...Ol];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"];
    case "2-digit":
      return [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ];
    default:
      return null;
  }
}
const qi = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ],
  Gi = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  Cl = ["M", "T", "W", "T", "F", "S", "S"];
function Yi(t) {
  switch (t) {
    case "narrow":
      return [...Cl];
    case "short":
      return [...Gi];
    case "long":
      return [...qi];
    case "numeric":
      return ["1", "2", "3", "4", "5", "6", "7"];
    default:
      return null;
  }
}
const Ji = ["AM", "PM"],
  Nl = ["Before Christ", "Anno Domini"],
  Ml = ["BC", "AD"],
  Dl = ["B", "A"];
function Bi(t) {
  switch (t) {
    case "narrow":
      return [...Dl];
    case "short":
      return [...Ml];
    case "long":
      return [...Nl];
    default:
      return null;
  }
}
function Il(t) {
  return Ji[t.hour < 12 ? 0 : 1];
}
function $l(t, e) {
  return Yi(e)[t.weekday - 1];
}
function Al(t, e) {
  return Hi(e)[t.month - 1];
}
function Wl(t, e) {
  return Bi(e)[t.year < 0 ? 0 : 1];
}
function Rl(t, e, n = "always", r = !1) {
  const s = {
      years: ["year", "yr."],
      quarters: ["quarter", "qtr."],
      months: ["month", "mo."],
      weeks: ["week", "wk."],
      days: ["day", "day", "days"],
      hours: ["hour", "hr."],
      minutes: ["minute", "min."],
      seconds: ["second", "sec."],
    },
    i = ["hours", "minutes", "seconds"].indexOf(t) === -1;
  if (n === "auto" && i) {
    const d = t === "days";
    switch (e) {
      case 1:
        return d ? "tomorrow" : `next ${s[t][0]}`;
      case -1:
        return d ? "yesterday" : `last ${s[t][0]}`;
      case 0:
        return d ? "today" : `this ${s[t][0]}`;
    }
  }
  const a = Object.is(e, -0) || e < 0,
    o = Math.abs(e),
    l = o === 1,
    u = s[t],
    c = r ? (l ? u[1] : u[2] || u[1]) : l ? s[t][0] : t;
  return a ? `${o} ${c} ago` : `in ${o} ${c}`;
}
function Ts(t, e) {
  let n = "";
  for (const r of t) r.literal ? (n += r.val) : (n += e(r.val));
  return n;
}
const Ll = {
  D: qn,
  DD: pi,
  DDD: yi,
  DDDD: gi,
  t: wi,
  tt: vi,
  ttt: _i,
  tttt: bi,
  T: ki,
  TT: Si,
  TTT: Ti,
  TTTT: xi,
  f: Oi,
  ff: Ci,
  fff: Mi,
  ffff: Ii,
  F: Ei,
  FF: Ni,
  FFF: Di,
  FFFF: $i,
};
class ae {
  static create(e, n = {}) {
    return new ae(e, n);
  }
  static parseFormat(e) {
    let n = null,
      r = "",
      s = !1;
    const i = [];
    for (let a = 0; a < e.length; a++) {
      const o = e.charAt(a);
      o === "'"
        ? (r.length > 0 && i.push({ literal: s || /^\s+$/.test(r), val: r }),
          (n = null),
          (r = ""),
          (s = !s))
        : s || o === n
          ? (r += o)
          : (r.length > 0 && i.push({ literal: /^\s+$/.test(r), val: r }),
            (r = o),
            (n = o));
    }
    return r.length > 0 && i.push({ literal: s || /^\s+$/.test(r), val: r }), i;
  }
  static macroTokenToFormatOpts(e) {
    return Ll[e];
  }
  constructor(e, n) {
    (this.opts = n), (this.loc = e), (this.systemLoc = null);
  }
  formatWithSystemDefault(e, n) {
    return (
      this.systemLoc === null &&
        (this.systemLoc = this.loc.redefaultToSystem()),
      this.systemLoc.dtFormatter(e, { ...this.opts, ...n }).format()
    );
  }
  dtFormatter(e, n = {}) {
    return this.loc.dtFormatter(e, { ...this.opts, ...n });
  }
  formatDateTime(e, n) {
    return this.dtFormatter(e, n).format();
  }
  formatDateTimeParts(e, n) {
    return this.dtFormatter(e, n).formatToParts();
  }
  formatInterval(e, n) {
    return this.dtFormatter(e.start, n).dtf.formatRange(
      e.start.toJSDate(),
      e.end.toJSDate(),
    );
  }
  resolvedOptions(e, n) {
    return this.dtFormatter(e, n).resolvedOptions();
  }
  num(e, n = 0) {
    if (this.opts.forceSimple) return B(e, n);
    const r = { ...this.opts };
    return n > 0 && (r.padTo = n), this.loc.numberFormatter(r).format(e);
  }
  formatDateTimeFromString(e, n) {
    const r = this.loc.listingMode() === "en",
      s = this.loc.outputCalendar && this.loc.outputCalendar !== "gregory",
      i = (h, $) => this.loc.extract(e, h, $),
      a = (h) =>
        e.isOffsetFixed && e.offset === 0 && h.allowZ
          ? "Z"
          : e.isValid
            ? e.zone.formatOffset(e.ts, h.format)
            : "",
      o = () =>
        r ? Il(e) : i({ hour: "numeric", hourCycle: "h12" }, "dayperiod"),
      l = (h, $) =>
        r
          ? Al(e, h)
          : i($ ? { month: h } : { month: h, day: "numeric" }, "month"),
      u = (h, $) =>
        r
          ? $l(e, h)
          : i(
              $
                ? { weekday: h }
                : { weekday: h, month: "long", day: "numeric" },
              "weekday",
            ),
      c = (h) => {
        const $ = ae.macroTokenToFormatOpts(h);
        return $ ? this.formatWithSystemDefault(e, $) : h;
      },
      d = (h) => (r ? Wl(e, h) : i({ era: h }, "era")),
      w = (h) => {
        switch (h) {
          case "S":
            return this.num(e.millisecond);
          case "u":
          case "SSS":
            return this.num(e.millisecond, 3);
          case "s":
            return this.num(e.second);
          case "ss":
            return this.num(e.second, 2);
          case "uu":
            return this.num(Math.floor(e.millisecond / 10), 2);
          case "uuu":
            return this.num(Math.floor(e.millisecond / 100));
          case "m":
            return this.num(e.minute);
          case "mm":
            return this.num(e.minute, 2);
          case "h":
            return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12);
          case "hh":
            return this.num(e.hour % 12 === 0 ? 12 : e.hour % 12, 2);
          case "H":
            return this.num(e.hour);
          case "HH":
            return this.num(e.hour, 2);
          case "Z":
            return a({ format: "narrow", allowZ: this.opts.allowZ });
          case "ZZ":
            return a({ format: "short", allowZ: this.opts.allowZ });
          case "ZZZ":
            return a({ format: "techie", allowZ: this.opts.allowZ });
          case "ZZZZ":
            return e.zone.offsetName(e.ts, {
              format: "short",
              locale: this.loc.locale,
            });
          case "ZZZZZ":
            return e.zone.offsetName(e.ts, {
              format: "long",
              locale: this.loc.locale,
            });
          case "z":
            return e.zoneName;
          case "a":
            return o();
          case "d":
            return s ? i({ day: "numeric" }, "day") : this.num(e.day);
          case "dd":
            return s ? i({ day: "2-digit" }, "day") : this.num(e.day, 2);
          case "c":
            return this.num(e.weekday);
          case "ccc":
            return u("short", !0);
          case "cccc":
            return u("long", !0);
          case "ccccc":
            return u("narrow", !0);
          case "E":
            return this.num(e.weekday);
          case "EEE":
            return u("short", !1);
          case "EEEE":
            return u("long", !1);
          case "EEEEE":
            return u("narrow", !1);
          case "L":
            return s
              ? i({ month: "numeric", day: "numeric" }, "month")
              : this.num(e.month);
          case "LL":
            return s
              ? i({ month: "2-digit", day: "numeric" }, "month")
              : this.num(e.month, 2);
          case "LLL":
            return l("short", !0);
          case "LLLL":
            return l("long", !0);
          case "LLLLL":
            return l("narrow", !0);
          case "M":
            return s ? i({ month: "numeric" }, "month") : this.num(e.month);
          case "MM":
            return s ? i({ month: "2-digit" }, "month") : this.num(e.month, 2);
          case "MMM":
            return l("short", !1);
          case "MMMM":
            return l("long", !1);
          case "MMMMM":
            return l("narrow", !1);
          case "y":
            return s ? i({ year: "numeric" }, "year") : this.num(e.year);
          case "yy":
            return s
              ? i({ year: "2-digit" }, "year")
              : this.num(e.year.toString().slice(-2), 2);
          case "yyyy":
            return s ? i({ year: "numeric" }, "year") : this.num(e.year, 4);
          case "yyyyyy":
            return s ? i({ year: "numeric" }, "year") : this.num(e.year, 6);
          case "G":
            return d("short");
          case "GG":
            return d("long");
          case "GGGGG":
            return d("narrow");
          case "kk":
            return this.num(e.weekYear.toString().slice(-2), 2);
          case "kkkk":
            return this.num(e.weekYear, 4);
          case "W":
            return this.num(e.weekNumber);
          case "WW":
            return this.num(e.weekNumber, 2);
          case "n":
            return this.num(e.localWeekNumber);
          case "nn":
            return this.num(e.localWeekNumber, 2);
          case "ii":
            return this.num(e.localWeekYear.toString().slice(-2), 2);
          case "iiii":
            return this.num(e.localWeekYear, 4);
          case "o":
            return this.num(e.ordinal);
          case "ooo":
            return this.num(e.ordinal, 3);
          case "q":
            return this.num(e.quarter);
          case "qq":
            return this.num(e.quarter, 2);
          case "X":
            return this.num(Math.floor(e.ts / 1e3));
          case "x":
            return this.num(e.ts);
          default:
            return c(h);
        }
      };
    return Ts(ae.parseFormat(n), w);
  }
  formatDurationFromString(e, n) {
    const r = (l) => {
        switch (l[0]) {
          case "S":
            return "millisecond";
          case "s":
            return "second";
          case "m":
            return "minute";
          case "h":
            return "hour";
          case "d":
            return "day";
          case "w":
            return "week";
          case "M":
            return "month";
          case "y":
            return "year";
          default:
            return null;
        }
      },
      s = (l) => (u) => {
        const c = r(u);
        return c ? this.num(l.get(c), u.length) : u;
      },
      i = ae.parseFormat(n),
      a = i.reduce((l, { literal: u, val: c }) => (u ? l : l.concat(c)), []),
      o = e.shiftTo(...a.map(r).filter((l) => l));
    return Ts(i, s(o));
  }
}
const Ki =
  /[A-Za-z_+-]{1,256}(?::?\/[A-Za-z0-9_+-]{1,256}(?:\/[A-Za-z0-9_+-]{1,256})?)?/;
function Et(...t) {
  const e = t.reduce((n, r) => n + r.source, "");
  return RegExp(`^${e}$`);
}
function Ct(...t) {
  return (e) =>
    t
      .reduce(
        ([n, r, s], i) => {
          const [a, o, l] = i(e, s);
          return [{ ...n, ...a }, o || r, l];
        },
        [{}, null, 1],
      )
      .slice(0, 2);
}
function Nt(t, ...e) {
  if (t == null) return [null, null];
  for (const [n, r] of e) {
    const s = n.exec(t);
    if (s) return r(s);
  }
  return [null, null];
}
function Qi(...t) {
  return (e, n) => {
    const r = {};
    let s;
    for (s = 0; s < t.length; s++) r[t[s]] = qe(e[n + s]);
    return [r, null, n + s];
  };
}
const Xi = /(?:(Z)|([+-]\d\d)(?::?(\d\d))?)/,
  Zl = `(?:${Xi.source}?(?:\\[(${Ki.source})\\])?)?`,
  Gr = /(\d\d)(?::?(\d\d)(?::?(\d\d)(?:[.,](\d{1,30}))?)?)?/,
  ea = RegExp(`${Gr.source}${Zl}`),
  Yr = RegExp(`(?:T${ea.source})?`),
  Vl = /([+-]\d{6}|\d{4})(?:-?(\d\d)(?:-?(\d\d))?)?/,
  Pl = /(\d{4})-?W(\d\d)(?:-?(\d))?/,
  zl = /(\d{4})-?(\d{3})/,
  Fl = Qi("weekYear", "weekNumber", "weekDay"),
  Ul = Qi("year", "ordinal"),
  jl = /(\d{4})-(\d\d)-(\d\d)/,
  ta = RegExp(`${Gr.source} ?(?:${Xi.source}|(${Ki.source}))?`),
  Hl = RegExp(`(?: ${ta.source})?`);
function _t(t, e, n) {
  const r = t[e];
  return O(r) ? n : qe(r);
}
function ql(t, e) {
  return [
    { year: _t(t, e), month: _t(t, e + 1, 1), day: _t(t, e + 2, 1) },
    null,
    e + 3,
  ];
}
function Mt(t, e) {
  return [
    {
      hours: _t(t, e, 0),
      minutes: _t(t, e + 1, 0),
      seconds: _t(t, e + 2, 0),
      milliseconds: Hr(t[e + 3]),
    },
    null,
    e + 4,
  ];
}
function cn(t, e) {
  const n = !t[e] && !t[e + 1],
    r = ir(t[e + 1], t[e + 2]),
    s = n ? null : fe.instance(r);
  return [{}, s, e + 3];
}
function dn(t, e) {
  const n = t[e] ? ze.create(t[e]) : null;
  return [{}, n, e + 1];
}
const Gl = RegExp(`^T?${Gr.source}$`),
  Yl =
    /^-?P(?:(?:(-?\d{1,20}(?:\.\d{1,20})?)Y)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20}(?:\.\d{1,20})?)W)?(?:(-?\d{1,20}(?:\.\d{1,20})?)D)?(?:T(?:(-?\d{1,20}(?:\.\d{1,20})?)H)?(?:(-?\d{1,20}(?:\.\d{1,20})?)M)?(?:(-?\d{1,20})(?:[.,](-?\d{1,20}))?S)?)?)$/;
function Jl(t) {
  const [e, n, r, s, i, a, o, l, u] = t,
    c = e[0] === "-",
    d = l && l[0] === "-",
    w = (h, $ = !1) => (h !== void 0 && ($ || (h && c)) ? -h : h);
  return [
    {
      years: w(tt(n)),
      months: w(tt(r)),
      weeks: w(tt(s)),
      days: w(tt(i)),
      hours: w(tt(a)),
      minutes: w(tt(o)),
      seconds: w(tt(l), l === "-0"),
      milliseconds: w(Hr(u), d),
    },
  ];
}
const Bl = {
  GMT: 0,
  EDT: -4 * 60,
  EST: -5 * 60,
  CDT: -5 * 60,
  CST: -6 * 60,
  MDT: -6 * 60,
  MST: -7 * 60,
  PDT: -7 * 60,
  PST: -8 * 60,
};
function Jr(t, e, n, r, s, i, a) {
  const o = {
    year: e.length === 2 ? Lr(qe(e)) : qe(e),
    month: ji.indexOf(n) + 1,
    day: qe(r),
    hour: qe(s),
    minute: qe(i),
  };
  return (
    a && (o.second = qe(a)),
    t && (o.weekday = t.length > 3 ? qi.indexOf(t) + 1 : Gi.indexOf(t) + 1),
    o
  );
}
const Kl =
  /^(?:(Mon|Tue|Wed|Thu|Fri|Sat|Sun),\s)?(\d{1,2})\s(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\s(\d{2,4})\s(\d\d):(\d\d)(?::(\d\d))?\s(?:(UT|GMT|[ECMP][SD]T)|([Zz])|(?:([+-]\d\d)(\d\d)))$/;
function Ql(t) {
  const [, e, n, r, s, i, a, o, l, u, c, d] = t,
    w = Jr(e, s, r, n, i, a, o);
  let h;
  return l ? (h = Bl[l]) : u ? (h = 0) : (h = ir(c, d)), [w, new fe(h)];
}
function Xl(t) {
  return t
    .replace(/\([^()]*\)|[\n\t]/g, " ")
    .replace(/(\s\s+)/g, " ")
    .trim();
}
const eu =
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun), (\d\d) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) (\d{4}) (\d\d):(\d\d):(\d\d) GMT$/,
  tu =
    /^(Monday|Tuesday|Wednesday|Thursday|Friday|Saturday|Sunday), (\d\d)-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)-(\d\d) (\d\d):(\d\d):(\d\d) GMT$/,
  nu =
    /^(Mon|Tue|Wed|Thu|Fri|Sat|Sun) (Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec) ( \d|\d\d) (\d\d):(\d\d):(\d\d) (\d{4})$/;
function xs(t) {
  const [, e, n, r, s, i, a, o] = t;
  return [Jr(e, s, r, n, i, a, o), fe.utcInstance];
}
function ru(t) {
  const [, e, n, r, s, i, a, o] = t;
  return [Jr(e, o, n, r, s, i, a), fe.utcInstance];
}
const su = Et(Vl, Yr),
  iu = Et(Pl, Yr),
  au = Et(zl, Yr),
  ou = Et(ea),
  na = Ct(ql, Mt, cn, dn),
  lu = Ct(Fl, Mt, cn, dn),
  uu = Ct(Ul, Mt, cn, dn),
  cu = Ct(Mt, cn, dn);
function du(t) {
  return Nt(t, [su, na], [iu, lu], [au, uu], [ou, cu]);
}
function fu(t) {
  return Nt(Xl(t), [Kl, Ql]);
}
function hu(t) {
  return Nt(t, [eu, xs], [tu, xs], [nu, ru]);
}
function mu(t) {
  return Nt(t, [Yl, Jl]);
}
const pu = Ct(Mt);
function yu(t) {
  return Nt(t, [Gl, pu]);
}
const gu = Et(jl, Hl),
  wu = Et(ta),
  vu = Ct(Mt, cn, dn);
function _u(t) {
  return Nt(t, [gu, na], [wu, vu]);
}
const Os = "Invalid Duration",
  ra = {
    weeks: {
      days: 7,
      hours: 7 * 24,
      minutes: 7 * 24 * 60,
      seconds: 7 * 24 * 60 * 60,
      milliseconds: 7 * 24 * 60 * 60 * 1e3,
    },
    days: {
      hours: 24,
      minutes: 24 * 60,
      seconds: 24 * 60 * 60,
      milliseconds: 24 * 60 * 60 * 1e3,
    },
    hours: { minutes: 60, seconds: 60 * 60, milliseconds: 60 * 60 * 1e3 },
    minutes: { seconds: 60, milliseconds: 60 * 1e3 },
    seconds: { milliseconds: 1e3 },
  },
  bu = {
    years: {
      quarters: 4,
      months: 12,
      weeks: 52,
      days: 365,
      hours: 365 * 24,
      minutes: 365 * 24 * 60,
      seconds: 365 * 24 * 60 * 60,
      milliseconds: 365 * 24 * 60 * 60 * 1e3,
    },
    quarters: {
      months: 3,
      weeks: 13,
      days: 91,
      hours: 91 * 24,
      minutes: 91 * 24 * 60,
      seconds: 91 * 24 * 60 * 60,
      milliseconds: 91 * 24 * 60 * 60 * 1e3,
    },
    months: {
      weeks: 4,
      days: 30,
      hours: 30 * 24,
      minutes: 30 * 24 * 60,
      seconds: 30 * 24 * 60 * 60,
      milliseconds: 30 * 24 * 60 * 60 * 1e3,
    },
    ...ra,
  },
  _e = 146097 / 400,
  ht = 146097 / 4800,
  ku = {
    years: {
      quarters: 4,
      months: 12,
      weeks: _e / 7,
      days: _e,
      hours: _e * 24,
      minutes: _e * 24 * 60,
      seconds: _e * 24 * 60 * 60,
      milliseconds: _e * 24 * 60 * 60 * 1e3,
    },
    quarters: {
      months: 3,
      weeks: _e / 28,
      days: _e / 4,
      hours: (_e * 24) / 4,
      minutes: (_e * 24 * 60) / 4,
      seconds: (_e * 24 * 60 * 60) / 4,
      milliseconds: (_e * 24 * 60 * 60 * 1e3) / 4,
    },
    months: {
      weeks: ht / 7,
      days: ht,
      hours: ht * 24,
      minutes: ht * 24 * 60,
      seconds: ht * 24 * 60 * 60,
      milliseconds: ht * 24 * 60 * 60 * 1e3,
    },
    ...ra,
  },
  rt = [
    "years",
    "quarters",
    "months",
    "weeks",
    "days",
    "hours",
    "minutes",
    "seconds",
    "milliseconds",
  ],
  Su = rt.slice(0).reverse();
function He(t, e, n = !1) {
  const r = {
    values: n ? e.values : { ...t.values, ...(e.values || {}) },
    loc: t.loc.clone(e.loc),
    conversionAccuracy: e.conversionAccuracy || t.conversionAccuracy,
    matrix: e.matrix || t.matrix,
  };
  return new R(r);
}
function sa(t, e) {
  let n = e.milliseconds ?? 0;
  for (const r of Su.slice(1)) e[r] && (n += e[r] * t[r].milliseconds);
  return n;
}
function Es(t, e) {
  const n = sa(t, e) < 0 ? -1 : 1;
  rt.reduceRight((r, s) => {
    if (O(e[s])) return r;
    if (r) {
      const i = e[r] * n,
        a = t[s][r],
        o = Math.floor(i / a);
      (e[s] += o * n), (e[r] -= o * a * n);
    }
    return s;
  }, null),
    rt.reduce((r, s) => {
      if (O(e[s])) return r;
      if (r) {
        const i = e[r] % 1;
        (e[r] -= i), (e[s] += i * t[r][s]);
      }
      return s;
    }, null);
}
function Tu(t) {
  const e = {};
  for (const [n, r] of Object.entries(t)) r !== 0 && (e[n] = r);
  return e;
}
class R {
  constructor(e) {
    const n = e.conversionAccuracy === "longterm" || !1;
    let r = n ? ku : bu;
    e.matrix && (r = e.matrix),
      (this.values = e.values),
      (this.loc = e.loc || z.create()),
      (this.conversionAccuracy = n ? "longterm" : "casual"),
      (this.invalid = e.invalid || null),
      (this.matrix = r),
      (this.isLuxonDuration = !0);
  }
  static fromMillis(e, n) {
    return R.fromObject({ milliseconds: e }, n);
  }
  static fromObject(e, n = {}) {
    if (e == null || typeof e != "object")
      throw new pe(
        `Duration.fromObject: argument expected to be an object, got ${e === null ? "null" : typeof e}`,
      );
    return new R({
      values: Jn(e, R.normalizeUnit),
      loc: z.fromObject(n),
      conversionAccuracy: n.conversionAccuracy,
      matrix: n.matrix,
    });
  }
  static fromDurationLike(e) {
    if (it(e)) return R.fromMillis(e);
    if (R.isDuration(e)) return e;
    if (typeof e == "object") return R.fromObject(e);
    throw new pe(`Unknown duration argument ${e} of type ${typeof e}`);
  }
  static fromISO(e, n) {
    const [r] = mu(e);
    return r
      ? R.fromObject(r, n)
      : R.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  static fromISOTime(e, n) {
    const [r] = yu(e);
    return r
      ? R.fromObject(r, n)
      : R.invalid("unparsable", `the input "${e}" can't be parsed as ISO 8601`);
  }
  static invalid(e, n = null) {
    if (!e) throw new pe("need to specify a reason the Duration is invalid");
    const r = e instanceof Ce ? e : new Ce(e, n);
    if (J.throwOnInvalid) throw new Ko(r);
    return new R({ invalid: r });
  }
  static normalizeUnit(e) {
    const n = {
      year: "years",
      years: "years",
      quarter: "quarters",
      quarters: "quarters",
      month: "months",
      months: "months",
      week: "weeks",
      weeks: "weeks",
      day: "days",
      days: "days",
      hour: "hours",
      hours: "hours",
      minute: "minutes",
      minutes: "minutes",
      second: "seconds",
      seconds: "seconds",
      millisecond: "milliseconds",
      milliseconds: "milliseconds",
    }[e && e.toLowerCase()];
    if (!n) throw new mi(e);
    return n;
  }
  static isDuration(e) {
    return (e && e.isLuxonDuration) || !1;
  }
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  toFormat(e, n = {}) {
    const r = { ...n, floor: n.round !== !1 && n.floor !== !1 };
    return this.isValid
      ? ae.create(this.loc, r).formatDurationFromString(this, e)
      : Os;
  }
  toHuman(e = {}) {
    if (!this.isValid) return Os;
    const n = rt
      .map((r) => {
        const s = this.values[r];
        return O(s)
          ? null
          : this.loc
              .numberFormatter({
                style: "unit",
                unitDisplay: "long",
                ...e,
                unit: r.slice(0, -1),
              })
              .format(s);
      })
      .filter((r) => r);
    return this.loc
      .listFormatter({
        type: "conjunction",
        style: e.listStyle || "narrow",
        ...e,
      })
      .format(n);
  }
  toObject() {
    return this.isValid ? { ...this.values } : {};
  }
  toISO() {
    if (!this.isValid) return null;
    let e = "P";
    return (
      this.years !== 0 && (e += this.years + "Y"),
      (this.months !== 0 || this.quarters !== 0) &&
        (e += this.months + this.quarters * 3 + "M"),
      this.weeks !== 0 && (e += this.weeks + "W"),
      this.days !== 0 && (e += this.days + "D"),
      (this.hours !== 0 ||
        this.minutes !== 0 ||
        this.seconds !== 0 ||
        this.milliseconds !== 0) &&
        (e += "T"),
      this.hours !== 0 && (e += this.hours + "H"),
      this.minutes !== 0 && (e += this.minutes + "M"),
      (this.seconds !== 0 || this.milliseconds !== 0) &&
        (e += qr(this.seconds + this.milliseconds / 1e3, 3) + "S"),
      e === "P" && (e += "T0S"),
      e
    );
  }
  toISOTime(e = {}) {
    if (!this.isValid) return null;
    const n = this.toMillis();
    return n < 0 || n >= 864e5
      ? null
      : ((e = {
          suppressMilliseconds: !1,
          suppressSeconds: !1,
          includePrefix: !1,
          format: "extended",
          ...e,
          includeOffset: !1,
        }),
        K.fromMillis(n, { zone: "UTC" }).toISOTime(e));
  }
  toJSON() {
    return this.toISO();
  }
  toString() {
    return this.toISO();
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid
      ? `Duration { values: ${JSON.stringify(this.values)} }`
      : `Duration { Invalid, reason: ${this.invalidReason} }`;
  }
  toMillis() {
    return this.isValid ? sa(this.matrix, this.values) : NaN;
  }
  valueOf() {
    return this.toMillis();
  }
  plus(e) {
    if (!this.isValid) return this;
    const n = R.fromDurationLike(e),
      r = {};
    for (const s of rt)
      (Tt(n.values, s) || Tt(this.values, s)) &&
        (r[s] = n.get(s) + this.get(s));
    return He(this, { values: r }, !0);
  }
  minus(e) {
    if (!this.isValid) return this;
    const n = R.fromDurationLike(e);
    return this.plus(n.negate());
  }
  mapUnits(e) {
    if (!this.isValid) return this;
    const n = {};
    for (const r of Object.keys(this.values)) n[r] = Ui(e(this.values[r], r));
    return He(this, { values: n }, !0);
  }
  get(e) {
    return this[R.normalizeUnit(e)];
  }
  set(e) {
    if (!this.isValid) return this;
    const n = { ...this.values, ...Jn(e, R.normalizeUnit) };
    return He(this, { values: n });
  }
  reconfigure({
    locale: e,
    numberingSystem: n,
    conversionAccuracy: r,
    matrix: s,
  } = {}) {
    const a = {
      loc: this.loc.clone({ locale: e, numberingSystem: n }),
      matrix: s,
      conversionAccuracy: r,
    };
    return He(this, a);
  }
  as(e) {
    return this.isValid ? this.shiftTo(e).get(e) : NaN;
  }
  normalize() {
    if (!this.isValid) return this;
    const e = this.toObject();
    return Es(this.matrix, e), He(this, { values: e }, !0);
  }
  rescale() {
    if (!this.isValid) return this;
    const e = Tu(this.normalize().shiftToAll().toObject());
    return He(this, { values: e }, !0);
  }
  shiftTo(...e) {
    if (!this.isValid) return this;
    if (e.length === 0) return this;
    e = e.map((a) => R.normalizeUnit(a));
    const n = {},
      r = {},
      s = this.toObject();
    let i;
    for (const a of rt)
      if (e.indexOf(a) >= 0) {
        i = a;
        let o = 0;
        for (const u in r) (o += this.matrix[u][a] * r[u]), (r[u] = 0);
        it(s[a]) && (o += s[a]);
        const l = Math.trunc(o);
        (n[a] = l), (r[a] = (o * 1e3 - l * 1e3) / 1e3);
      } else it(s[a]) && (r[a] = s[a]);
    for (const a in r)
      r[a] !== 0 && (n[i] += a === i ? r[a] : r[a] / this.matrix[i][a]);
    return Es(this.matrix, n), He(this, { values: n }, !0);
  }
  shiftToAll() {
    return this.isValid
      ? this.shiftTo(
          "years",
          "months",
          "weeks",
          "days",
          "hours",
          "minutes",
          "seconds",
          "milliseconds",
        )
      : this;
  }
  negate() {
    if (!this.isValid) return this;
    const e = {};
    for (const n of Object.keys(this.values))
      e[n] = this.values[n] === 0 ? 0 : -this.values[n];
    return He(this, { values: e }, !0);
  }
  get years() {
    return this.isValid ? this.values.years || 0 : NaN;
  }
  get quarters() {
    return this.isValid ? this.values.quarters || 0 : NaN;
  }
  get months() {
    return this.isValid ? this.values.months || 0 : NaN;
  }
  get weeks() {
    return this.isValid ? this.values.weeks || 0 : NaN;
  }
  get days() {
    return this.isValid ? this.values.days || 0 : NaN;
  }
  get hours() {
    return this.isValid ? this.values.hours || 0 : NaN;
  }
  get minutes() {
    return this.isValid ? this.values.minutes || 0 : NaN;
  }
  get seconds() {
    return this.isValid ? this.values.seconds || 0 : NaN;
  }
  get milliseconds() {
    return this.isValid ? this.values.milliseconds || 0 : NaN;
  }
  get isValid() {
    return this.invalid === null;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  equals(e) {
    if (!this.isValid || !e.isValid || !this.loc.equals(e.loc)) return !1;
    function n(r, s) {
      return r === void 0 || r === 0 ? s === void 0 || s === 0 : r === s;
    }
    for (const r of rt) if (!n(this.values[r], e.values[r])) return !1;
    return !0;
  }
}
const mt = "Invalid Interval";
function xu(t, e) {
  return !t || !t.isValid
    ? q.invalid("missing or invalid start")
    : !e || !e.isValid
      ? q.invalid("missing or invalid end")
      : e < t
        ? q.invalid(
            "end before start",
            `The end of an interval must be after its start, but you had start=${t.toISO()} and end=${e.toISO()}`,
          )
        : null;
}
class q {
  constructor(e) {
    (this.s = e.start),
      (this.e = e.end),
      (this.invalid = e.invalid || null),
      (this.isLuxonInterval = !0);
  }
  static invalid(e, n = null) {
    if (!e) throw new pe("need to specify a reason the Interval is invalid");
    const r = e instanceof Ce ? e : new Ce(e, n);
    if (J.throwOnInvalid) throw new Bo(r);
    return new q({ invalid: r });
  }
  static fromDateTimes(e, n) {
    const r = Rt(e),
      s = Rt(n),
      i = xu(r, s);
    return i ?? new q({ start: r, end: s });
  }
  static after(e, n) {
    const r = R.fromDurationLike(n),
      s = Rt(e);
    return q.fromDateTimes(s, s.plus(r));
  }
  static before(e, n) {
    const r = R.fromDurationLike(n),
      s = Rt(e);
    return q.fromDateTimes(s.minus(r), s);
  }
  static fromISO(e, n) {
    const [r, s] = (e || "").split("/", 2);
    if (r && s) {
      let i, a;
      try {
        (i = K.fromISO(r, n)), (a = i.isValid);
      } catch {
        a = !1;
      }
      let o, l;
      try {
        (o = K.fromISO(s, n)), (l = o.isValid);
      } catch {
        l = !1;
      }
      if (a && l) return q.fromDateTimes(i, o);
      if (a) {
        const u = R.fromISO(s, n);
        if (u.isValid) return q.after(i, u);
      } else if (l) {
        const u = R.fromISO(r, n);
        if (u.isValid) return q.before(o, u);
      }
    }
    return q.invalid(
      "unparsable",
      `the input "${e}" can't be parsed as ISO 8601`,
    );
  }
  static isInterval(e) {
    return (e && e.isLuxonInterval) || !1;
  }
  get start() {
    return this.isValid ? this.s : null;
  }
  get end() {
    return this.isValid ? this.e : null;
  }
  get isValid() {
    return this.invalidReason === null;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  length(e = "milliseconds") {
    return this.isValid ? this.toDuration(e).get(e) : NaN;
  }
  count(e = "milliseconds", n) {
    if (!this.isValid) return NaN;
    const r = this.start.startOf(e, n);
    let s;
    return (
      n?.useLocaleWeeks
        ? (s = this.end.reconfigure({ locale: r.locale }))
        : (s = this.end),
      (s = s.startOf(e, n)),
      Math.floor(s.diff(r, e).get(e)) + (s.valueOf() !== this.end.valueOf())
    );
  }
  hasSame(e) {
    return this.isValid
      ? this.isEmpty() || this.e.minus(1).hasSame(this.s, e)
      : !1;
  }
  isEmpty() {
    return this.s.valueOf() === this.e.valueOf();
  }
  isAfter(e) {
    return this.isValid ? this.s > e : !1;
  }
  isBefore(e) {
    return this.isValid ? this.e <= e : !1;
  }
  contains(e) {
    return this.isValid ? this.s <= e && this.e > e : !1;
  }
  set({ start: e, end: n } = {}) {
    return this.isValid ? q.fromDateTimes(e || this.s, n || this.e) : this;
  }
  splitAt(...e) {
    if (!this.isValid) return [];
    const n = e
        .map(Rt)
        .filter((a) => this.contains(a))
        .sort((a, o) => a.toMillis() - o.toMillis()),
      r = [];
    let { s } = this,
      i = 0;
    for (; s < this.e; ) {
      const a = n[i] || this.e,
        o = +a > +this.e ? this.e : a;
      r.push(q.fromDateTimes(s, o)), (s = o), (i += 1);
    }
    return r;
  }
  splitBy(e) {
    const n = R.fromDurationLike(e);
    if (!this.isValid || !n.isValid || n.as("milliseconds") === 0) return [];
    let { s: r } = this,
      s = 1,
      i;
    const a = [];
    for (; r < this.e; ) {
      const o = this.start.plus(n.mapUnits((l) => l * s));
      (i = +o > +this.e ? this.e : o),
        a.push(q.fromDateTimes(r, i)),
        (r = i),
        (s += 1);
    }
    return a;
  }
  divideEqually(e) {
    return this.isValid ? this.splitBy(this.length() / e).slice(0, e) : [];
  }
  overlaps(e) {
    return this.e > e.s && this.s < e.e;
  }
  abutsStart(e) {
    return this.isValid ? +this.e == +e.s : !1;
  }
  abutsEnd(e) {
    return this.isValid ? +e.e == +this.s : !1;
  }
  engulfs(e) {
    return this.isValid ? this.s <= e.s && this.e >= e.e : !1;
  }
  equals(e) {
    return !this.isValid || !e.isValid
      ? !1
      : this.s.equals(e.s) && this.e.equals(e.e);
  }
  intersection(e) {
    if (!this.isValid) return this;
    const n = this.s > e.s ? this.s : e.s,
      r = this.e < e.e ? this.e : e.e;
    return n >= r ? null : q.fromDateTimes(n, r);
  }
  union(e) {
    if (!this.isValid) return this;
    const n = this.s < e.s ? this.s : e.s,
      r = this.e > e.e ? this.e : e.e;
    return q.fromDateTimes(n, r);
  }
  static merge(e) {
    const [n, r] = e
      .sort((s, i) => s.s - i.s)
      .reduce(
        ([s, i], a) =>
          i
            ? i.overlaps(a) || i.abutsStart(a)
              ? [s, i.union(a)]
              : [s.concat([i]), a]
            : [s, a],
        [[], null],
      );
    return r && n.push(r), n;
  }
  static xor(e) {
    let n = null,
      r = 0;
    const s = [],
      i = e.map((l) => [
        { time: l.s, type: "s" },
        { time: l.e, type: "e" },
      ]),
      a = Array.prototype.concat(...i),
      o = a.sort((l, u) => l.time - u.time);
    for (const l of o)
      (r += l.type === "s" ? 1 : -1),
        r === 1
          ? (n = l.time)
          : (n && +n != +l.time && s.push(q.fromDateTimes(n, l.time)),
            (n = null));
    return q.merge(s);
  }
  difference(...e) {
    return q
      .xor([this].concat(e))
      .map((n) => this.intersection(n))
      .filter((n) => n && !n.isEmpty());
  }
  toString() {
    return this.isValid ? `[${this.s.toISO()} – ${this.e.toISO()})` : mt;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid
      ? `Interval { start: ${this.s.toISO()}, end: ${this.e.toISO()} }`
      : `Interval { Invalid, reason: ${this.invalidReason} }`;
  }
  toLocaleString(e = qn, n = {}) {
    return this.isValid
      ? ae.create(this.s.loc.clone(n), e).formatInterval(this)
      : mt;
  }
  toISO(e) {
    return this.isValid ? `${this.s.toISO(e)}/${this.e.toISO(e)}` : mt;
  }
  toISODate() {
    return this.isValid ? `${this.s.toISODate()}/${this.e.toISODate()}` : mt;
  }
  toISOTime(e) {
    return this.isValid ? `${this.s.toISOTime(e)}/${this.e.toISOTime(e)}` : mt;
  }
  toFormat(e, { separator: n = " – " } = {}) {
    return this.isValid ? `${this.s.toFormat(e)}${n}${this.e.toFormat(e)}` : mt;
  }
  toDuration(e, n) {
    return this.isValid
      ? this.e.diff(this.s, e, n)
      : R.invalid(this.invalidReason);
  }
  mapEndpoints(e) {
    return q.fromDateTimes(e(this.s), e(this.e));
  }
}
class gn {
  static hasDST(e = J.defaultZone) {
    const n = K.now().setZone(e).set({ month: 12 });
    return !e.isUniversal && n.offset !== n.set({ month: 6 }).offset;
  }
  static isValidIANAZone(e) {
    return ze.isValidZone(e);
  }
  static normalizeZone(e) {
    return Ye(e, J.defaultZone);
  }
  static getStartOfWeek({ locale: e = null, locObj: n = null } = {}) {
    return (n || z.create(e)).getStartOfWeek();
  }
  static getMinimumDaysInFirstWeek({
    locale: e = null,
    locObj: n = null,
  } = {}) {
    return (n || z.create(e)).getMinDaysInFirstWeek();
  }
  static getWeekendWeekdays({ locale: e = null, locObj: n = null } = {}) {
    return (n || z.create(e)).getWeekendDays().slice();
  }
  static months(
    e = "long",
    {
      locale: n = null,
      numberingSystem: r = null,
      locObj: s = null,
      outputCalendar: i = "gregory",
    } = {},
  ) {
    return (s || z.create(n, r, i)).months(e);
  }
  static monthsFormat(
    e = "long",
    {
      locale: n = null,
      numberingSystem: r = null,
      locObj: s = null,
      outputCalendar: i = "gregory",
    } = {},
  ) {
    return (s || z.create(n, r, i)).months(e, !0);
  }
  static weekdays(
    e = "long",
    { locale: n = null, numberingSystem: r = null, locObj: s = null } = {},
  ) {
    return (s || z.create(n, r, null)).weekdays(e);
  }
  static weekdaysFormat(
    e = "long",
    { locale: n = null, numberingSystem: r = null, locObj: s = null } = {},
  ) {
    return (s || z.create(n, r, null)).weekdays(e, !0);
  }
  static meridiems({ locale: e = null } = {}) {
    return z.create(e).meridiems();
  }
  static eras(e = "short", { locale: n = null } = {}) {
    return z.create(n, null, "gregory").eras(e);
  }
  static features() {
    return { relative: Pi(), localeWeek: zi() };
  }
}
function Cs(t, e) {
  const n = (s) => s.toUTC(0, { keepLocalTime: !0 }).startOf("day").valueOf(),
    r = n(e) - n(t);
  return Math.floor(R.fromMillis(r).as("days"));
}
function Ou(t, e, n) {
  const r = [
      ["years", (l, u) => u.year - l.year],
      ["quarters", (l, u) => u.quarter - l.quarter + (u.year - l.year) * 4],
      ["months", (l, u) => u.month - l.month + (u.year - l.year) * 12],
      [
        "weeks",
        (l, u) => {
          const c = Cs(l, u);
          return (c - (c % 7)) / 7;
        },
      ],
      ["days", Cs],
    ],
    s = {},
    i = t;
  let a, o;
  for (const [l, u] of r)
    n.indexOf(l) >= 0 &&
      ((a = l),
      (s[l] = u(t, e)),
      (o = i.plus(s)),
      o > e
        ? (s[l]--, (t = i.plus(s)), t > e && ((o = t), s[l]--, (t = i.plus(s))))
        : (t = o));
  return [t, s, o, a];
}
function Eu(t, e, n, r) {
  let [s, i, a, o] = Ou(t, e, n);
  const l = e - s,
    u = n.filter(
      (d) => ["hours", "minutes", "seconds", "milliseconds"].indexOf(d) >= 0,
    );
  u.length === 0 &&
    (a < e && (a = s.plus({ [o]: 1 })),
    a !== s && (i[o] = (i[o] || 0) + l / (a - s)));
  const c = R.fromObject(i, r);
  return u.length > 0
    ? R.fromMillis(l, r)
        .shiftTo(...u)
        .plus(c)
    : c;
}
const Br = {
    arab: "[٠-٩]",
    arabext: "[۰-۹]",
    bali: "[᭐-᭙]",
    beng: "[০-৯]",
    deva: "[०-९]",
    fullwide: "[０-９]",
    gujr: "[૦-૯]",
    hanidec: "[〇|一|二|三|四|五|六|七|八|九]",
    khmr: "[០-៩]",
    knda: "[೦-೯]",
    laoo: "[໐-໙]",
    limb: "[᥆-᥏]",
    mlym: "[൦-൯]",
    mong: "[᠐-᠙]",
    mymr: "[၀-၉]",
    orya: "[୦-୯]",
    tamldec: "[௦-௯]",
    telu: "[౦-౯]",
    thai: "[๐-๙]",
    tibt: "[༠-༩]",
    latn: "\\d",
  },
  Ns = {
    arab: [1632, 1641],
    arabext: [1776, 1785],
    bali: [6992, 7001],
    beng: [2534, 2543],
    deva: [2406, 2415],
    fullwide: [65296, 65303],
    gujr: [2790, 2799],
    khmr: [6112, 6121],
    knda: [3302, 3311],
    laoo: [3792, 3801],
    limb: [6470, 6479],
    mlym: [3430, 3439],
    mong: [6160, 6169],
    mymr: [4160, 4169],
    orya: [2918, 2927],
    tamldec: [3046, 3055],
    telu: [3174, 3183],
    thai: [3664, 3673],
    tibt: [3872, 3881],
  },
  Cu = Br.hanidec.replace(/[\[|\]]/g, "").split("");
function Nu(t) {
  let e = parseInt(t, 10);
  if (isNaN(e)) {
    e = "";
    for (let n = 0; n < t.length; n++) {
      const r = t.charCodeAt(n);
      if (t[n].search(Br.hanidec) !== -1) e += Cu.indexOf(t[n]);
      else
        for (const s in Ns) {
          const [i, a] = Ns[s];
          r >= i && r <= a && (e += r - i);
        }
    }
    return parseInt(e, 10);
  } else return e;
}
function xe({ numberingSystem: t }, e = "") {
  return new RegExp(`${Br[t || "latn"]}${e}`);
}
const Mu = "missing Intl.DateTimeFormat.formatToParts support";
function Z(t, e = (n) => n) {
  return { regex: t, deser: ([n]) => e(Nu(n)) };
}
const Du = " ",
  ia = `[ ${Du}]`,
  aa = new RegExp(ia, "g");
function Iu(t) {
  return t.replace(/\./g, "\\.?").replace(aa, ia);
}
function Ms(t) {
  return t.replace(/\./g, "").replace(aa, " ").toLowerCase();
}
function Oe(t, e) {
  return t === null
    ? null
    : {
        regex: RegExp(t.map(Iu).join("|")),
        deser: ([n]) => t.findIndex((r) => Ms(n) === Ms(r)) + e,
      };
}
function Ds(t, e) {
  return { regex: t, deser: ([, n, r]) => ir(n, r), groups: e };
}
function wn(t) {
  return { regex: t, deser: ([e]) => e };
}
function $u(t) {
  return t.replace(/[\-\[\]{}()*+?.,\\\^$|#\s]/g, "\\$&");
}
function Au(t, e) {
  const n = xe(e),
    r = xe(e, "{2}"),
    s = xe(e, "{3}"),
    i = xe(e, "{4}"),
    a = xe(e, "{6}"),
    o = xe(e, "{1,2}"),
    l = xe(e, "{1,3}"),
    u = xe(e, "{1,6}"),
    c = xe(e, "{1,9}"),
    d = xe(e, "{2,4}"),
    w = xe(e, "{4,6}"),
    h = (X) => ({ regex: RegExp($u(X.val)), deser: ([ue]) => ue, literal: !0 }),
    ne = ((X) => {
      if (t.literal) return h(X);
      switch (X.val) {
        case "G":
          return Oe(e.eras("short"), 0);
        case "GG":
          return Oe(e.eras("long"), 0);
        case "y":
          return Z(u);
        case "yy":
          return Z(d, Lr);
        case "yyyy":
          return Z(i);
        case "yyyyy":
          return Z(w);
        case "yyyyyy":
          return Z(a);
        case "M":
          return Z(o);
        case "MM":
          return Z(r);
        case "MMM":
          return Oe(e.months("short", !0), 1);
        case "MMMM":
          return Oe(e.months("long", !0), 1);
        case "L":
          return Z(o);
        case "LL":
          return Z(r);
        case "LLL":
          return Oe(e.months("short", !1), 1);
        case "LLLL":
          return Oe(e.months("long", !1), 1);
        case "d":
          return Z(o);
        case "dd":
          return Z(r);
        case "o":
          return Z(l);
        case "ooo":
          return Z(s);
        case "HH":
          return Z(r);
        case "H":
          return Z(o);
        case "hh":
          return Z(r);
        case "h":
          return Z(o);
        case "mm":
          return Z(r);
        case "m":
          return Z(o);
        case "q":
          return Z(o);
        case "qq":
          return Z(r);
        case "s":
          return Z(o);
        case "ss":
          return Z(r);
        case "S":
          return Z(l);
        case "SSS":
          return Z(s);
        case "u":
          return wn(c);
        case "uu":
          return wn(o);
        case "uuu":
          return Z(n);
        case "a":
          return Oe(e.meridiems(), 0);
        case "kkkk":
          return Z(i);
        case "kk":
          return Z(d, Lr);
        case "W":
          return Z(o);
        case "WW":
          return Z(r);
        case "E":
        case "c":
          return Z(n);
        case "EEE":
          return Oe(e.weekdays("short", !1), 1);
        case "EEEE":
          return Oe(e.weekdays("long", !1), 1);
        case "ccc":
          return Oe(e.weekdays("short", !0), 1);
        case "cccc":
          return Oe(e.weekdays("long", !0), 1);
        case "Z":
        case "ZZ":
          return Ds(new RegExp(`([+-]${o.source})(?::(${r.source}))?`), 2);
        case "ZZZ":
          return Ds(new RegExp(`([+-]${o.source})(${r.source})?`), 2);
        case "z":
          return wn(/[a-z_+-/]{1,256}?/i);
        case " ":
          return wn(/[^\S\n\r]/);
        default:
          return h(X);
      }
    })(t) || { invalidReason: Mu };
  return (ne.token = t), ne;
}
const Wu = {
  year: { "2-digit": "yy", numeric: "yyyyy" },
  month: { numeric: "M", "2-digit": "MM", short: "MMM", long: "MMMM" },
  day: { numeric: "d", "2-digit": "dd" },
  weekday: { short: "EEE", long: "EEEE" },
  dayperiod: "a",
  dayPeriod: "a",
  hour12: { numeric: "h", "2-digit": "hh" },
  hour24: { numeric: "H", "2-digit": "HH" },
  minute: { numeric: "m", "2-digit": "mm" },
  second: { numeric: "s", "2-digit": "ss" },
  timeZoneName: { long: "ZZZZZ", short: "ZZZ" },
};
function Ru(t, e, n) {
  const { type: r, value: s } = t;
  if (r === "literal") {
    const l = /^\s+$/.test(s);
    return { literal: !l, val: l ? " " : s };
  }
  const i = e[r];
  let a = r;
  r === "hour" &&
    (e.hour12 != null
      ? (a = e.hour12 ? "hour12" : "hour24")
      : e.hourCycle != null
        ? e.hourCycle === "h11" || e.hourCycle === "h12"
          ? (a = "hour12")
          : (a = "hour24")
        : (a = n.hour12 ? "hour12" : "hour24"));
  let o = Wu[a];
  if ((typeof o == "object" && (o = o[i]), o)) return { literal: !1, val: o };
}
function Lu(t) {
  return [
    `^${t.map((n) => n.regex).reduce((n, r) => `${n}(${r.source})`, "")}$`,
    t,
  ];
}
function Zu(t, e, n) {
  const r = t.match(e);
  if (r) {
    const s = {};
    let i = 1;
    for (const a in n)
      if (Tt(n, a)) {
        const o = n[a],
          l = o.groups ? o.groups + 1 : 1;
        !o.literal &&
          o.token &&
          (s[o.token.val[0]] = o.deser(r.slice(i, i + l))),
          (i += l);
      }
    return [r, s];
  } else return [r, {}];
}
function Vu(t) {
  const e = (i) => {
    switch (i) {
      case "S":
        return "millisecond";
      case "s":
        return "second";
      case "m":
        return "minute";
      case "h":
      case "H":
        return "hour";
      case "d":
        return "day";
      case "o":
        return "ordinal";
      case "L":
      case "M":
        return "month";
      case "y":
        return "year";
      case "E":
      case "c":
        return "weekday";
      case "W":
        return "weekNumber";
      case "k":
        return "weekYear";
      case "q":
        return "quarter";
      default:
        return null;
    }
  };
  let n = null,
    r;
  return (
    O(t.z) || (n = ze.create(t.z)),
    O(t.Z) || (n || (n = new fe(t.Z)), (r = t.Z)),
    O(t.q) || (t.M = (t.q - 1) * 3 + 1),
    O(t.h) ||
      (t.h < 12 && t.a === 1
        ? (t.h += 12)
        : t.h === 12 && t.a === 0 && (t.h = 0)),
    t.G === 0 && t.y && (t.y = -t.y),
    O(t.u) || (t.S = Hr(t.u)),
    [
      Object.keys(t).reduce((i, a) => {
        const o = e(a);
        return o && (i[o] = t[a]), i;
      }, {}),
      n,
      r,
    ]
  );
}
let mr = null;
function Pu() {
  return mr || (mr = K.fromMillis(1555555555555)), mr;
}
function zu(t, e) {
  if (t.literal) return t;
  const n = ae.macroTokenToFormatOpts(t.val),
    r = ua(n, e);
  return r == null || r.includes(void 0) ? t : r;
}
function oa(t, e) {
  return Array.prototype.concat(...t.map((n) => zu(n, e)));
}
function la(t, e, n) {
  const r = oa(ae.parseFormat(n), t),
    s = r.map((a) => Au(a, t)),
    i = s.find((a) => a.invalidReason);
  if (i) return { input: e, tokens: r, invalidReason: i.invalidReason };
  {
    const [a, o] = Lu(s),
      l = RegExp(a, "i"),
      [u, c] = Zu(e, l, o),
      [d, w, h] = c ? Vu(c) : [null, null, void 0];
    if (Tt(c, "a") && Tt(c, "H"))
      throw new yt("Can't include meridiem when specifying 24-hour format");
    return {
      input: e,
      tokens: r,
      regex: l,
      rawMatches: u,
      matches: c,
      result: d,
      zone: w,
      specificOffset: h,
    };
  }
}
function Fu(t, e, n) {
  const {
    result: r,
    zone: s,
    specificOffset: i,
    invalidReason: a,
  } = la(t, e, n);
  return [r, s, i, a];
}
function ua(t, e) {
  if (!t) return null;
  const r = ae.create(e, t).dtFormatter(Pu()),
    s = r.formatToParts(),
    i = r.resolvedOptions();
  return s.map((a) => Ru(a, t, i));
}
const pr = "Invalid DateTime",
  Is = 864e13;
function vn(t) {
  return new Ce("unsupported zone", `the zone "${t.name}" is not supported`);
}
function yr(t) {
  return t.weekData === null && (t.weekData = Gn(t.c)), t.weekData;
}
function gr(t) {
  return (
    t.localWeekData === null &&
      (t.localWeekData = Gn(
        t.c,
        t.loc.getMinDaysInFirstWeek(),
        t.loc.getStartOfWeek(),
      )),
    t.localWeekData
  );
}
function nt(t, e) {
  const n = {
    ts: t.ts,
    zone: t.zone,
    c: t.c,
    o: t.o,
    loc: t.loc,
    invalid: t.invalid,
  };
  return new K({ ...n, ...e, old: n });
}
function ca(t, e, n) {
  let r = t - e * 60 * 1e3;
  const s = n.offset(r);
  if (e === s) return [r, e];
  r -= (s - e) * 60 * 1e3;
  const i = n.offset(r);
  return s === i ? [r, s] : [t - Math.min(s, i) * 60 * 1e3, Math.max(s, i)];
}
function _n(t, e) {
  t += e * 60 * 1e3;
  const n = new Date(t);
  return {
    year: n.getUTCFullYear(),
    month: n.getUTCMonth() + 1,
    day: n.getUTCDate(),
    hour: n.getUTCHours(),
    minute: n.getUTCMinutes(),
    second: n.getUTCSeconds(),
    millisecond: n.getUTCMilliseconds(),
  };
}
function On(t, e, n) {
  return ca(sr(t), e, n);
}
function $s(t, e) {
  const n = t.o,
    r = t.c.year + Math.trunc(e.years),
    s = t.c.month + Math.trunc(e.months) + Math.trunc(e.quarters) * 3,
    i = {
      ...t.c,
      year: r,
      month: s,
      day:
        Math.min(t.c.day, Yn(r, s)) +
        Math.trunc(e.days) +
        Math.trunc(e.weeks) * 7,
    },
    a = R.fromObject({
      years: e.years - Math.trunc(e.years),
      quarters: e.quarters - Math.trunc(e.quarters),
      months: e.months - Math.trunc(e.months),
      weeks: e.weeks - Math.trunc(e.weeks),
      days: e.days - Math.trunc(e.days),
      hours: e.hours,
      minutes: e.minutes,
      seconds: e.seconds,
      milliseconds: e.milliseconds,
    }).as("milliseconds"),
    o = sr(i);
  let [l, u] = ca(o, n, t.zone);
  return a !== 0 && ((l += a), (u = t.zone.offset(l))), { ts: l, o: u };
}
function Wt(t, e, n, r, s, i) {
  const { setZone: a, zone: o } = n;
  if ((t && Object.keys(t).length !== 0) || e) {
    const l = e || o,
      u = K.fromObject(t, { ...n, zone: l, specificOffset: i });
    return a ? u : u.setZone(o);
  } else
    return K.invalid(
      new Ce("unparsable", `the input "${s}" can't be parsed as ${r}`),
    );
}
function bn(t, e, n = !0) {
  return t.isValid
    ? ae
        .create(z.create("en-US"), { allowZ: n, forceSimple: !0 })
        .formatDateTimeFromString(t, e)
    : null;
}
function wr(t, e) {
  const n = t.c.year > 9999 || t.c.year < 0;
  let r = "";
  return (
    n && t.c.year >= 0 && (r += "+"),
    (r += B(t.c.year, n ? 6 : 4)),
    e
      ? ((r += "-"), (r += B(t.c.month)), (r += "-"), (r += B(t.c.day)))
      : ((r += B(t.c.month)), (r += B(t.c.day))),
    r
  );
}
function As(t, e, n, r, s, i) {
  let a = B(t.c.hour);
  return (
    e
      ? ((a += ":"),
        (a += B(t.c.minute)),
        (t.c.millisecond !== 0 || t.c.second !== 0 || !n) && (a += ":"))
      : (a += B(t.c.minute)),
    (t.c.millisecond !== 0 || t.c.second !== 0 || !n) &&
      ((a += B(t.c.second)),
      (t.c.millisecond !== 0 || !r) &&
        ((a += "."), (a += B(t.c.millisecond, 3)))),
    s &&
      (t.isOffsetFixed && t.offset === 0 && !i
        ? (a += "Z")
        : t.o < 0
          ? ((a += "-"),
            (a += B(Math.trunc(-t.o / 60))),
            (a += ":"),
            (a += B(Math.trunc(-t.o % 60))))
          : ((a += "+"),
            (a += B(Math.trunc(t.o / 60))),
            (a += ":"),
            (a += B(Math.trunc(t.o % 60))))),
    i && (a += "[" + t.zone.ianaName + "]"),
    a
  );
}
const da = { month: 1, day: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
  Uu = {
    weekNumber: 1,
    weekday: 1,
    hour: 0,
    minute: 0,
    second: 0,
    millisecond: 0,
  },
  ju = { ordinal: 1, hour: 0, minute: 0, second: 0, millisecond: 0 },
  fa = ["year", "month", "day", "hour", "minute", "second", "millisecond"],
  Hu = [
    "weekYear",
    "weekNumber",
    "weekday",
    "hour",
    "minute",
    "second",
    "millisecond",
  ],
  qu = ["year", "ordinal", "hour", "minute", "second", "millisecond"];
function Gu(t) {
  const e = {
    year: "year",
    years: "year",
    month: "month",
    months: "month",
    day: "day",
    days: "day",
    hour: "hour",
    hours: "hour",
    minute: "minute",
    minutes: "minute",
    quarter: "quarter",
    quarters: "quarter",
    second: "second",
    seconds: "second",
    millisecond: "millisecond",
    milliseconds: "millisecond",
    weekday: "weekday",
    weekdays: "weekday",
    weeknumber: "weekNumber",
    weeksnumber: "weekNumber",
    weeknumbers: "weekNumber",
    weekyear: "weekYear",
    weekyears: "weekYear",
    ordinal: "ordinal",
  }[t.toLowerCase()];
  if (!e) throw new mi(t);
  return e;
}
function Ws(t) {
  switch (t.toLowerCase()) {
    case "localweekday":
    case "localweekdays":
      return "localWeekday";
    case "localweeknumber":
    case "localweeknumbers":
      return "localWeekNumber";
    case "localweekyear":
    case "localweekyears":
      return "localWeekYear";
    default:
      return Gu(t);
  }
}
function Rs(t, e) {
  const n = Ye(e.zone, J.defaultZone),
    r = z.fromObject(e),
    s = J.now();
  let i, a;
  if (O(t.year)) i = s;
  else {
    for (const u of fa) O(t[u]) && (t[u] = da[u]);
    const o = Zi(t) || Vi(t);
    if (o) return K.invalid(o);
    const l = n.offset(s);
    [i, a] = On(t, l, n);
  }
  return new K({ ts: i, zone: n, loc: r, o: a });
}
function Ls(t, e, n) {
  const r = O(n.round) ? !0 : n.round,
    s = (a, o) => (
      (a = qr(a, r || n.calendary ? 0 : 2, !0)),
      e.loc.clone(n).relFormatter(n).format(a, o)
    ),
    i = (a) =>
      n.calendary
        ? e.hasSame(t, a)
          ? 0
          : e.startOf(a).diff(t.startOf(a), a).get(a)
        : e.diff(t, a).get(a);
  if (n.unit) return s(i(n.unit), n.unit);
  for (const a of n.units) {
    const o = i(a);
    if (Math.abs(o) >= 1) return s(o, a);
  }
  return s(t > e ? -0 : 0, n.units[n.units.length - 1]);
}
function Zs(t) {
  let e = {},
    n;
  return (
    t.length > 0 && typeof t[t.length - 1] == "object"
      ? ((e = t[t.length - 1]), (n = Array.from(t).slice(0, t.length - 1)))
      : (n = Array.from(t)),
    [e, n]
  );
}
let K = class H {
  constructor(e) {
    const n = e.zone || J.defaultZone;
    let r =
      e.invalid ||
      (Number.isNaN(e.ts) ? new Ce("invalid input") : null) ||
      (n.isValid ? null : vn(n));
    this.ts = O(e.ts) ? J.now() : e.ts;
    let s = null,
      i = null;
    if (!r)
      if (e.old && e.old.ts === this.ts && e.old.zone.equals(n))
        [s, i] = [e.old.c, e.old.o];
      else {
        const o = n.offset(this.ts);
        (s = _n(this.ts, o)),
          (r = Number.isNaN(s.year) ? new Ce("invalid input") : null),
          (s = r ? null : s),
          (i = r ? null : o);
      }
    (this._zone = n),
      (this.loc = e.loc || z.create()),
      (this.invalid = r),
      (this.weekData = null),
      (this.localWeekData = null),
      (this.c = s),
      (this.o = i),
      (this.isLuxonDateTime = !0);
  }
  static now() {
    return new H({});
  }
  static local() {
    const [e, n] = Zs(arguments),
      [r, s, i, a, o, l, u] = n;
    return Rs(
      {
        year: r,
        month: s,
        day: i,
        hour: a,
        minute: o,
        second: l,
        millisecond: u,
      },
      e,
    );
  }
  static utc() {
    const [e, n] = Zs(arguments),
      [r, s, i, a, o, l, u] = n;
    return (
      (e.zone = fe.utcInstance),
      Rs(
        {
          year: r,
          month: s,
          day: i,
          hour: a,
          minute: o,
          second: l,
          millisecond: u,
        },
        e,
      )
    );
  }
  static fromJSDate(e, n = {}) {
    const r = kl(e) ? e.valueOf() : NaN;
    if (Number.isNaN(r)) return H.invalid("invalid input");
    const s = Ye(n.zone, J.defaultZone);
    return s.isValid
      ? new H({ ts: r, zone: s, loc: z.fromObject(n) })
      : H.invalid(vn(s));
  }
  static fromMillis(e, n = {}) {
    if (it(e))
      return e < -Is || e > Is
        ? H.invalid("Timestamp out of range")
        : new H({
            ts: e,
            zone: Ye(n.zone, J.defaultZone),
            loc: z.fromObject(n),
          });
    throw new pe(
      `fromMillis requires a numerical input, but received a ${typeof e} with value ${e}`,
    );
  }
  static fromSeconds(e, n = {}) {
    if (it(e))
      return new H({
        ts: e * 1e3,
        zone: Ye(n.zone, J.defaultZone),
        loc: z.fromObject(n),
      });
    throw new pe("fromSeconds requires a numerical input");
  }
  static fromObject(e, n = {}) {
    e = e || {};
    const r = Ye(n.zone, J.defaultZone);
    if (!r.isValid) return H.invalid(vn(r));
    const s = z.fromObject(n),
      i = Jn(e, Ws),
      { minDaysInFirstWeek: a, startOfWeek: o } = bs(i, s),
      l = J.now(),
      u = O(n.specificOffset) ? r.offset(l) : n.specificOffset,
      c = !O(i.ordinal),
      d = !O(i.year),
      w = !O(i.month) || !O(i.day),
      h = d || w,
      $ = i.weekYear || i.weekNumber;
    if ((h || c) && $)
      throw new yt(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals",
      );
    if (w && c) throw new yt("Can't mix ordinal dates with month/day");
    const ne = $ || (i.weekday && !h);
    let X,
      ue,
      ee = _n(l, u);
    ne
      ? ((X = Hu), (ue = Uu), (ee = Gn(ee, a, o)))
      : c
        ? ((X = qu), (ue = ju), (ee = hr(ee)))
        : ((X = fa), (ue = da));
    let P = !1;
    for (const U of X) {
      const V = i[U];
      O(V) ? (P ? (i[U] = ue[U]) : (i[U] = ee[U])) : (P = !0);
    }
    const se = ne ? vl(i, a, o) : c ? _l(i) : Zi(i),
      ce = se || Vi(i);
    if (ce) return H.invalid(ce);
    const Te = ne ? vs(i, a, o) : c ? _s(i) : i,
      [fn, It] = On(Te, u, r),
      Fe = new H({ ts: fn, zone: r, o: It, loc: s });
    return i.weekday && h && e.weekday !== Fe.weekday
      ? H.invalid(
          "mismatched weekday",
          `you can't specify both a weekday of ${i.weekday} and a date of ${Fe.toISO()}`,
        )
      : Fe;
  }
  static fromISO(e, n = {}) {
    const [r, s] = du(e);
    return Wt(r, s, n, "ISO 8601", e);
  }
  static fromRFC2822(e, n = {}) {
    const [r, s] = fu(e);
    return Wt(r, s, n, "RFC 2822", e);
  }
  static fromHTTP(e, n = {}) {
    const [r, s] = hu(e);
    return Wt(r, s, n, "HTTP", n);
  }
  static fromFormat(e, n, r = {}) {
    if (O(e) || O(n))
      throw new pe("fromFormat requires an input string and a format");
    const { locale: s = null, numberingSystem: i = null } = r,
      a = z.fromOpts({ locale: s, numberingSystem: i, defaultToEN: !0 }),
      [o, l, u, c] = Fu(a, e, n);
    return c ? H.invalid(c) : Wt(o, l, r, `format ${n}`, e, u);
  }
  static fromString(e, n, r = {}) {
    return H.fromFormat(e, n, r);
  }
  static fromSQL(e, n = {}) {
    const [r, s] = _u(e);
    return Wt(r, s, n, "SQL", e);
  }
  static invalid(e, n = null) {
    if (!e) throw new pe("need to specify a reason the DateTime is invalid");
    const r = e instanceof Ce ? e : new Ce(e, n);
    if (J.throwOnInvalid) throw new Jo(r);
    return new H({ invalid: r });
  }
  static isDateTime(e) {
    return (e && e.isLuxonDateTime) || !1;
  }
  static parseFormatForOpts(e, n = {}) {
    const r = ua(e, z.fromObject(n));
    return r ? r.map((s) => (s ? s.val : null)).join("") : null;
  }
  static expandFormat(e, n = {}) {
    return oa(ae.parseFormat(e), z.fromObject(n))
      .map((s) => s.val)
      .join("");
  }
  get(e) {
    return this[e];
  }
  get isValid() {
    return this.invalid === null;
  }
  get invalidReason() {
    return this.invalid ? this.invalid.reason : null;
  }
  get invalidExplanation() {
    return this.invalid ? this.invalid.explanation : null;
  }
  get locale() {
    return this.isValid ? this.loc.locale : null;
  }
  get numberingSystem() {
    return this.isValid ? this.loc.numberingSystem : null;
  }
  get outputCalendar() {
    return this.isValid ? this.loc.outputCalendar : null;
  }
  get zone() {
    return this._zone;
  }
  get zoneName() {
    return this.isValid ? this.zone.name : null;
  }
  get year() {
    return this.isValid ? this.c.year : NaN;
  }
  get quarter() {
    return this.isValid ? Math.ceil(this.c.month / 3) : NaN;
  }
  get month() {
    return this.isValid ? this.c.month : NaN;
  }
  get day() {
    return this.isValid ? this.c.day : NaN;
  }
  get hour() {
    return this.isValid ? this.c.hour : NaN;
  }
  get minute() {
    return this.isValid ? this.c.minute : NaN;
  }
  get second() {
    return this.isValid ? this.c.second : NaN;
  }
  get millisecond() {
    return this.isValid ? this.c.millisecond : NaN;
  }
  get weekYear() {
    return this.isValid ? yr(this).weekYear : NaN;
  }
  get weekNumber() {
    return this.isValid ? yr(this).weekNumber : NaN;
  }
  get weekday() {
    return this.isValid ? yr(this).weekday : NaN;
  }
  get isWeekend() {
    return this.isValid && this.loc.getWeekendDays().includes(this.weekday);
  }
  get localWeekday() {
    return this.isValid ? gr(this).weekday : NaN;
  }
  get localWeekNumber() {
    return this.isValid ? gr(this).weekNumber : NaN;
  }
  get localWeekYear() {
    return this.isValid ? gr(this).weekYear : NaN;
  }
  get ordinal() {
    return this.isValid ? hr(this.c).ordinal : NaN;
  }
  get monthShort() {
    return this.isValid
      ? gn.months("short", { locObj: this.loc })[this.month - 1]
      : null;
  }
  get monthLong() {
    return this.isValid
      ? gn.months("long", { locObj: this.loc })[this.month - 1]
      : null;
  }
  get weekdayShort() {
    return this.isValid
      ? gn.weekdays("short", { locObj: this.loc })[this.weekday - 1]
      : null;
  }
  get weekdayLong() {
    return this.isValid
      ? gn.weekdays("long", { locObj: this.loc })[this.weekday - 1]
      : null;
  }
  get offset() {
    return this.isValid ? +this.o : NaN;
  }
  get offsetNameShort() {
    return this.isValid
      ? this.zone.offsetName(this.ts, { format: "short", locale: this.locale })
      : null;
  }
  get offsetNameLong() {
    return this.isValid
      ? this.zone.offsetName(this.ts, { format: "long", locale: this.locale })
      : null;
  }
  get isOffsetFixed() {
    return this.isValid ? this.zone.isUniversal : null;
  }
  get isInDST() {
    return this.isOffsetFixed
      ? !1
      : this.offset > this.set({ month: 1, day: 1 }).offset ||
          this.offset > this.set({ month: 5 }).offset;
  }
  getPossibleOffsets() {
    if (!this.isValid || this.isOffsetFixed) return [this];
    const e = 864e5,
      n = 6e4,
      r = sr(this.c),
      s = this.zone.offset(r - e),
      i = this.zone.offset(r + e),
      a = this.zone.offset(r - s * n),
      o = this.zone.offset(r - i * n);
    if (a === o) return [this];
    const l = r - a * n,
      u = r - o * n,
      c = _n(l, a),
      d = _n(u, o);
    return c.hour === d.hour &&
      c.minute === d.minute &&
      c.second === d.second &&
      c.millisecond === d.millisecond
      ? [nt(this, { ts: l }), nt(this, { ts: u })]
      : [this];
  }
  get isInLeapYear() {
    return un(this.year);
  }
  get daysInMonth() {
    return Yn(this.year, this.month);
  }
  get daysInYear() {
    return this.isValid ? vt(this.year) : NaN;
  }
  get weeksInWeekYear() {
    return this.isValid ? sn(this.weekYear) : NaN;
  }
  get weeksInLocalWeekYear() {
    return this.isValid
      ? sn(
          this.localWeekYear,
          this.loc.getMinDaysInFirstWeek(),
          this.loc.getStartOfWeek(),
        )
      : NaN;
  }
  resolvedLocaleOptions(e = {}) {
    const {
      locale: n,
      numberingSystem: r,
      calendar: s,
    } = ae.create(this.loc.clone(e), e).resolvedOptions(this);
    return { locale: n, numberingSystem: r, outputCalendar: s };
  }
  toUTC(e = 0, n = {}) {
    return this.setZone(fe.instance(e), n);
  }
  toLocal() {
    return this.setZone(J.defaultZone);
  }
  setZone(e, { keepLocalTime: n = !1, keepCalendarTime: r = !1 } = {}) {
    if (((e = Ye(e, J.defaultZone)), e.equals(this.zone))) return this;
    if (e.isValid) {
      let s = this.ts;
      if (n || r) {
        const i = e.offset(this.ts),
          a = this.toObject();
        [s] = On(a, i, e);
      }
      return nt(this, { ts: s, zone: e });
    } else return H.invalid(vn(e));
  }
  reconfigure({ locale: e, numberingSystem: n, outputCalendar: r } = {}) {
    const s = this.loc.clone({
      locale: e,
      numberingSystem: n,
      outputCalendar: r,
    });
    return nt(this, { loc: s });
  }
  setLocale(e) {
    return this.reconfigure({ locale: e });
  }
  set(e) {
    if (!this.isValid) return this;
    const n = Jn(e, Ws),
      { minDaysInFirstWeek: r, startOfWeek: s } = bs(n, this.loc),
      i = !O(n.weekYear) || !O(n.weekNumber) || !O(n.weekday),
      a = !O(n.ordinal),
      o = !O(n.year),
      l = !O(n.month) || !O(n.day),
      u = o || l,
      c = n.weekYear || n.weekNumber;
    if ((u || a) && c)
      throw new yt(
        "Can't mix weekYear/weekNumber units with year/month/day or ordinals",
      );
    if (l && a) throw new yt("Can't mix ordinal dates with month/day");
    let d;
    i
      ? (d = vs({ ...Gn(this.c, r, s), ...n }, r, s))
      : O(n.ordinal)
        ? ((d = { ...this.toObject(), ...n }),
          O(n.day) && (d.day = Math.min(Yn(d.year, d.month), d.day)))
        : (d = _s({ ...hr(this.c), ...n }));
    const [w, h] = On(d, this.o, this.zone);
    return nt(this, { ts: w, o: h });
  }
  plus(e) {
    if (!this.isValid) return this;
    const n = R.fromDurationLike(e);
    return nt(this, $s(this, n));
  }
  minus(e) {
    if (!this.isValid) return this;
    const n = R.fromDurationLike(e).negate();
    return nt(this, $s(this, n));
  }
  startOf(e, { useLocaleWeeks: n = !1 } = {}) {
    if (!this.isValid) return this;
    const r = {},
      s = R.normalizeUnit(e);
    switch (s) {
      case "years":
        r.month = 1;
      case "quarters":
      case "months":
        r.day = 1;
      case "weeks":
      case "days":
        r.hour = 0;
      case "hours":
        r.minute = 0;
      case "minutes":
        r.second = 0;
      case "seconds":
        r.millisecond = 0;
        break;
    }
    if (s === "weeks")
      if (n) {
        const i = this.loc.getStartOfWeek(),
          { weekday: a } = this;
        a < i && (r.weekNumber = this.weekNumber - 1), (r.weekday = i);
      } else r.weekday = 1;
    if (s === "quarters") {
      const i = Math.ceil(this.month / 3);
      r.month = (i - 1) * 3 + 1;
    }
    return this.set(r);
  }
  endOf(e, n) {
    return this.isValid
      ? this.plus({ [e]: 1 })
          .startOf(e, n)
          .minus(1)
      : this;
  }
  toFormat(e, n = {}) {
    return this.isValid
      ? ae.create(this.loc.redefaultToEN(n)).formatDateTimeFromString(this, e)
      : pr;
  }
  toLocaleString(e = qn, n = {}) {
    return this.isValid
      ? ae.create(this.loc.clone(n), e).formatDateTime(this)
      : pr;
  }
  toLocaleParts(e = {}) {
    return this.isValid
      ? ae.create(this.loc.clone(e), e).formatDateTimeParts(this)
      : [];
  }
  toISO({
    format: e = "extended",
    suppressSeconds: n = !1,
    suppressMilliseconds: r = !1,
    includeOffset: s = !0,
    extendedZone: i = !1,
  } = {}) {
    if (!this.isValid) return null;
    const a = e === "extended";
    let o = wr(this, a);
    return (o += "T"), (o += As(this, a, n, r, s, i)), o;
  }
  toISODate({ format: e = "extended" } = {}) {
    return this.isValid ? wr(this, e === "extended") : null;
  }
  toISOWeekDate() {
    return bn(this, "kkkk-'W'WW-c");
  }
  toISOTime({
    suppressMilliseconds: e = !1,
    suppressSeconds: n = !1,
    includeOffset: r = !0,
    includePrefix: s = !1,
    extendedZone: i = !1,
    format: a = "extended",
  } = {}) {
    return this.isValid
      ? (s ? "T" : "") + As(this, a === "extended", n, e, r, i)
      : null;
  }
  toRFC2822() {
    return bn(this, "EEE, dd LLL yyyy HH:mm:ss ZZZ", !1);
  }
  toHTTP() {
    return bn(this.toUTC(), "EEE, dd LLL yyyy HH:mm:ss 'GMT'");
  }
  toSQLDate() {
    return this.isValid ? wr(this, !0) : null;
  }
  toSQLTime({
    includeOffset: e = !0,
    includeZone: n = !1,
    includeOffsetSpace: r = !0,
  } = {}) {
    let s = "HH:mm:ss.SSS";
    return (
      (n || e) && (r && (s += " "), n ? (s += "z") : e && (s += "ZZ")),
      bn(this, s, !0)
    );
  }
  toSQL(e = {}) {
    return this.isValid ? `${this.toSQLDate()} ${this.toSQLTime(e)}` : null;
  }
  toString() {
    return this.isValid ? this.toISO() : pr;
  }
  [Symbol.for("nodejs.util.inspect.custom")]() {
    return this.isValid
      ? `DateTime { ts: ${this.toISO()}, zone: ${this.zone.name}, locale: ${this.locale} }`
      : `DateTime { Invalid, reason: ${this.invalidReason} }`;
  }
  valueOf() {
    return this.toMillis();
  }
  toMillis() {
    return this.isValid ? this.ts : NaN;
  }
  toSeconds() {
    return this.isValid ? this.ts / 1e3 : NaN;
  }
  toUnixInteger() {
    return this.isValid ? Math.floor(this.ts / 1e3) : NaN;
  }
  toJSON() {
    return this.toISO();
  }
  toBSON() {
    return this.toJSDate();
  }
  toObject(e = {}) {
    if (!this.isValid) return {};
    const n = { ...this.c };
    return (
      e.includeConfig &&
        ((n.outputCalendar = this.outputCalendar),
        (n.numberingSystem = this.loc.numberingSystem),
        (n.locale = this.loc.locale)),
      n
    );
  }
  toJSDate() {
    return new Date(this.isValid ? this.ts : NaN);
  }
  diff(e, n = "milliseconds", r = {}) {
    if (!this.isValid || !e.isValid)
      return R.invalid("created by diffing an invalid DateTime");
    const s = {
        locale: this.locale,
        numberingSystem: this.numberingSystem,
        ...r,
      },
      i = Sl(n).map(R.normalizeUnit),
      a = e.valueOf() > this.valueOf(),
      o = a ? this : e,
      l = a ? e : this,
      u = Eu(o, l, i, s);
    return a ? u.negate() : u;
  }
  diffNow(e = "milliseconds", n = {}) {
    return this.diff(H.now(), e, n);
  }
  until(e) {
    return this.isValid ? q.fromDateTimes(this, e) : this;
  }
  hasSame(e, n, r) {
    if (!this.isValid) return !1;
    const s = e.valueOf(),
      i = this.setZone(e.zone, { keepLocalTime: !0 });
    return i.startOf(n, r) <= s && s <= i.endOf(n, r);
  }
  equals(e) {
    return (
      this.isValid &&
      e.isValid &&
      this.valueOf() === e.valueOf() &&
      this.zone.equals(e.zone) &&
      this.loc.equals(e.loc)
    );
  }
  toRelative(e = {}) {
    if (!this.isValid) return null;
    const n = e.base || H.fromObject({}, { zone: this.zone }),
      r = e.padding ? (this < n ? -e.padding : e.padding) : 0;
    let s = ["years", "months", "days", "hours", "minutes", "seconds"],
      i = e.unit;
    return (
      Array.isArray(e.unit) && ((s = e.unit), (i = void 0)),
      Ls(n, this.plus(r), { ...e, numeric: "always", units: s, unit: i })
    );
  }
  toRelativeCalendar(e = {}) {
    return this.isValid
      ? Ls(e.base || H.fromObject({}, { zone: this.zone }), this, {
          ...e,
          numeric: "auto",
          units: ["years", "months", "days"],
          calendary: !0,
        })
      : null;
  }
  static min(...e) {
    if (!e.every(H.isDateTime))
      throw new pe("min requires all arguments be DateTimes");
    return ks(e, (n) => n.valueOf(), Math.min);
  }
  static max(...e) {
    if (!e.every(H.isDateTime))
      throw new pe("max requires all arguments be DateTimes");
    return ks(e, (n) => n.valueOf(), Math.max);
  }
  static fromFormatExplain(e, n, r = {}) {
    const { locale: s = null, numberingSystem: i = null } = r,
      a = z.fromOpts({ locale: s, numberingSystem: i, defaultToEN: !0 });
    return la(a, e, n);
  }
  static fromStringExplain(e, n, r = {}) {
    return H.fromFormatExplain(e, n, r);
  }
  static get DATE_SHORT() {
    return qn;
  }
  static get DATE_MED() {
    return pi;
  }
  static get DATE_MED_WITH_WEEKDAY() {
    return Qo;
  }
  static get DATE_FULL() {
    return yi;
  }
  static get DATE_HUGE() {
    return gi;
  }
  static get TIME_SIMPLE() {
    return wi;
  }
  static get TIME_WITH_SECONDS() {
    return vi;
  }
  static get TIME_WITH_SHORT_OFFSET() {
    return _i;
  }
  static get TIME_WITH_LONG_OFFSET() {
    return bi;
  }
  static get TIME_24_SIMPLE() {
    return ki;
  }
  static get TIME_24_WITH_SECONDS() {
    return Si;
  }
  static get TIME_24_WITH_SHORT_OFFSET() {
    return Ti;
  }
  static get TIME_24_WITH_LONG_OFFSET() {
    return xi;
  }
  static get DATETIME_SHORT() {
    return Oi;
  }
  static get DATETIME_SHORT_WITH_SECONDS() {
    return Ei;
  }
  static get DATETIME_MED() {
    return Ci;
  }
  static get DATETIME_MED_WITH_SECONDS() {
    return Ni;
  }
  static get DATETIME_MED_WITH_WEEKDAY() {
    return Xo;
  }
  static get DATETIME_FULL() {
    return Mi;
  }
  static get DATETIME_FULL_WITH_SECONDS() {
    return Di;
  }
  static get DATETIME_HUGE() {
    return Ii;
  }
  static get DATETIME_HUGE_WITH_SECONDS() {
    return $i;
  }
};
function Rt(t) {
  if (K.isDateTime(t)) return t;
  if (t && t.valueOf && it(t.valueOf())) return K.fromJSDate(t);
  if (t && typeof t == "object") return K.fromObject(t);
  throw new pe(`Unknown datetime argument: ${t}, of type ${typeof t}`);
}
const Yu = "modulepreload",
  Ju = function (t, e) {
    return new URL(t, e).href;
  },
  Vs = {},
  Bu = function (e, n, r) {
    let s = Promise.resolve();
    if (n && n.length > 0) {
      const i = document.getElementsByTagName("link");
      s = Promise.all(
        n.map((a) => {
          if (((a = Ju(a, r)), a in Vs)) return;
          Vs[a] = !0;
          const o = a.endsWith(".css"),
            l = o ? '[rel="stylesheet"]' : "";
          if (!!r)
            for (let d = i.length - 1; d >= 0; d--) {
              const w = i[d];
              if (w.href === a && (!o || w.rel === "stylesheet")) return;
            }
          else if (document.querySelector(`link[href="${a}"]${l}`)) return;
          const c = document.createElement("link");
          if (
            ((c.rel = o ? "stylesheet" : Yu),
            o || ((c.as = "script"), (c.crossOrigin = "")),
            (c.href = a),
            document.head.appendChild(c),
            o)
          )
            return new Promise((d, w) => {
              c.addEventListener("load", d),
                c.addEventListener("error", () =>
                  w(new Error(`Unable to preload CSS for ${a}`)),
                );
            });
        }),
      );
    }
    return s
      .then(() => e())
      .catch((i) => {
        const a = new Event("vite:preloadError", { cancelable: !0 });
        if (((a.payload = i), window.dispatchEvent(a), !a.defaultPrevented))
          throw i;
      });
  };
var Ku = class {
    constructor(t) {
      (this._options = t), this.connect().catch(() => {});
    }
    DEFAULT_PORT = 6123;
    DEFAULT_RECONNECT_INTERVAL = 5e3;
    _socketPromise = null;
    _isManuallyClosed = !1;
    _onMessageCallbacks = [];
    _onConnectCallbacks = [];
    _onDisconnectCallbacks = [];
    _onErrorCallbacks = [];
    async queryMonitors() {
      return this._sendAndWaitReply("query monitors");
    }
    async queryWorkspaces() {
      return this._sendAndWaitReply("query workspaces");
    }
    async queryWindows() {
      return this._sendAndWaitReply("query windows");
    }
    async queryFocused() {
      return this._sendAndWaitReply("query focused");
    }
    async queryBindingModes() {
      return this._sendAndWaitReply("query binding-modes");
    }
    async queryAppMetadata() {
      return this._sendAndWaitReply("query app-metadata");
    }
    async queryTilingDirection() {
      return this._sendAndWaitReply("query tiling-direction");
    }
    async runCommand(t, e) {
      return this._sendAndWaitReply(
        e ? `command --id ${e} ${t}` : `command ${t}`,
      );
    }
    async connect() {
      (this._isManuallyClosed = !1),
        (this._socketPromise ??= this._createSocket()),
        await this._waitForConnection();
    }
    async closeConnection() {
      (this._isManuallyClosed = !0), (await this._socketPromise)?.close();
    }
    async subscribe(t, e) {
      return this.subscribeMany([t], e);
    }
    async subscribeMany(t, e) {
      let n = await this._sendSubscribe(t);
      const r = this.onMessage((i) => {
          const a = JSON.parse(i.data);
          a.messageType === "event_subscription" &&
            a.subscriptionId === n &&
            e(a.data);
        }),
        s = this.onConnect(async (i) => {
          this._sendUnsubscribe(n), (n = await this._sendSubscribe(t));
        });
      return async () => {
        r(), s(), await this._sendUnsubscribe(n);
      };
    }
    onMessage(t) {
      return this._registerCallback(this._onMessageCallbacks, t);
    }
    onConnect(t) {
      return this._registerCallback(this._onConnectCallbacks, t);
    }
    onDisconnect(t) {
      return this._registerCallback(this._onDisconnectCallbacks, t);
    }
    onError(t) {
      return this._registerCallback(this._onErrorCallbacks, t);
    }
    async _sendAndWaitReply(t) {
      if (this._isManuallyClosed)
        throw new Error(
          "Websocket connection was closed via `closeConnection`.",
        );
      await this.connect();
      const e = await this._socketPromise;
      return new Promise(async (n, r) => {
        e.send(t, (i) => {
          i && r(i);
        });
        const s = this.onMessage((i) => {
          const a = JSON.parse(i.data);
          a.messageType === "client_response" &&
            a.clientMessage === t &&
            (s(), a.error ? r(a.error) : n(a.data));
        });
      });
    }
    _registerCallback(t, e) {
      return (
        t.push(e),
        () => {
          for (const [n, r] of t.entries()) r === e && t.splice(n, 1);
        }
      );
    }
    async _createSocket() {
      const t = await (globalThis.WebSocket ??
          Bu(
            () => import("./browser-0ypEK3ZA.js").then((n) => n.b),
            __vite__mapDeps([]),
            import.meta.url,
          )
            .then((n) => n.default)
            .catch(() => {
              throw new Error(
                "The dependency 'ws' is required for environments without abuilt-in WebSocket API. \nRun `npm i ws` to resolve thiserror.",
              );
            })),
        e = new t(`ws://localhost:${this._options?.port ?? this.DEFAULT_PORT}`);
      return (
        (e.onmessage = (n) => this._onMessageCallbacks.forEach((r) => r(n))),
        (e.onopen = (n) => this._onConnectCallbacks.forEach((r) => r(n))),
        (e.onerror = (n) => this._onErrorCallbacks.forEach((r) => r(n))),
        (e.onclose = (n) => {
          this._onDisconnectCallbacks.forEach((r) => r(n)),
            this._isManuallyClosed ||
              setTimeout(
                () => (this._socketPromise = this._createSocket()),
                this._options?.reconnectInterval ??
                  this.DEFAULT_RECONNECT_INTERVAL,
              );
        }),
        e
      );
    }
    async _waitForConnection() {
      const t = await this._socketPromise;
      if (!t || t.readyState === t.CLOSED || t.readyState === t.CLOSING)
        throw new Error("Websocket connection is closed.");
      return t.readyState === t.OPEN
        ? t
        : new Promise(async (e, n) => {
            function r() {
              s && s(), i && i();
            }
            const s = this.onConnect(() => {
                r(), e(t);
              }),
              i = this.onDisconnect(() => {
                r(), n(new Error("Failed to establish websocket connection."));
              });
          });
    }
    async _sendSubscribe(t) {
      const { subscriptionId: e } = await this._sendAndWaitReply(
        `sub --events ${t.join(" ")}`,
      );
      return e;
    }
    async _sendUnsubscribe(t) {
      await this._sendAndWaitReply(`unsub --id ${t}`);
    }
  },
  de = ((t) => (
    (t.ALL = "all"),
    (t.APPLICATION_EXITING = "application_exiting"),
    (t.BINDING_MODES_CHANGED = "binding_modes_changed"),
    (t.FOCUS_CHANGED = "focus_changed"),
    (t.FOCUSED_CONTAINER_MOVED = "focused_container_moved"),
    (t.MONITOR_ADDED = "monitor_added"),
    (t.MONITOR_UPDATED = "monitor_updated"),
    (t.MONITOR_REMOVED = "monitor_removed"),
    (t.TILING_DIRECTION_CHANGED = "tiling_direction_changed"),
    (t.USER_CONFIG_CHANGED = "user_config_changed"),
    (t.WINDOW_MANAGED = "window_managed"),
    (t.WINDOW_UNMANAGED = "window_unmanaged"),
    (t.WORKSPACE_ACTIVATED = "workspace_activated"),
    (t.WORKSPACE_DEACTIVATED = "workspace_deactivated"),
    (t.WORKSPACE_UPDATED = "workspace_updated"),
    t
  ))(de || {});
function ha(t) {
  function e(a, o, ...l) {
    const u = new Date(),
      c = `${u.getHours().toString().padStart(2, "0")}:${u.getMinutes().toString().padStart(2, "0")}:${u.getSeconds().toString().padStart(2, "0")}:${u.getMilliseconds().toString().padStart(3, "0")}`,
      d = l.map(Qu);
    console[a](
      `%c${c}%c [${t}] %c${o}`,
      "color: #f5f9b4",
      "color: #d0b4f9",
      "color: inherit",
      ...d,
    );
  }
  function n(a, ...o) {
    e("log", a, ...o);
  }
  function r(a, ...o) {
    e("log", a, ...o);
  }
  function s(a, ...o) {
    e("warn", a, ...o);
  }
  function i(a, ...o) {
    e("error", a, ...o);
  }
  return { debug: n, info: r, warn: s, error: i };
}
function Qu(t) {
  if (t == null || t instanceof Error) return t;
  try {
    return structuredClone(t);
  } catch {
    return console.warn("Unable to clone data"), t;
  }
}
function Bn(t, e) {
  return Math.sqrt(Math.pow(e.x - t.x, 2) + Math.pow(e.y - t.y, 2));
}
function Xu(...t) {
  return JSON.stringify(t, (e, n) => (typeof n == "object" ? n : String(n)));
}
var vr = ha("desktop-commands"),
  Ps = {
    startWidget: ec,
    startPreset: tc,
    listenProvider: nc,
    unlistenProvider: rc,
    setAlwaysOnTop: sc,
    setSkipTaskbar: ic,
  };
function ec(t, e) {
  return Dt("start_widget", { configPath: t, placement: e });
}
function tc(t, e) {
  return Dt("start_preset", { configPath: t, presetName: e });
}
function nc(t) {
  return Dt("listen_provider", t);
}
function rc(t) {
  return Dt("unlisten_provider", { configHash: t });
}
function sc() {
  return Dt("set_always_on_top");
}
function ic(t) {
  return Dt("set_skip_taskbar", { skip: t });
}
async function Dt(t, e) {
  vr.info(`Calling '${t}' with args:`, e ?? {});
  try {
    const n = await m(t, e);
    return vr.info(`Response for calling '${t}':`, n), n;
  } catch (n) {
    throw (
      (vr.error(`Command '${t}' failed: ${n}`),
      new Error(`Command '${t}' failed: ${n}`))
    );
  }
}
var zs = null;
async function ma() {
  return zs ?? (zs = ac());
}
async function ac() {
  const [t, e, n] = await Promise.all([is(), Ya(), Ja()]),
    r = n.filter((a) => !e || !oc(a, e)),
    s = {
      currentMonitor: t ? Lt(t) : null,
      primaryMonitor: e ? Lt(e) : null,
      secondaryMonitors: r.map(Lt),
      allMonitors: n.map(Lt),
    };
  Er().onResized(() => i()), Er().onMoved(() => i());
  async function i() {
    const a = await is();
    Object.assign(s, { currentMonitor: a ? Lt(a) : null });
  }
  return s;
}
function oc(t, e) {
  return (
    t.name === e.name &&
    t.position.x === e.position.x &&
    t.position.y === e.position.y &&
    t.size.width === e.size.width &&
    t.size.height === e.size.height
  );
}
function Lt(t) {
  return {
    name: t.name,
    width: t.size.width,
    height: t.size.height,
    x: t.position.x,
    y: t.position.y,
    scaleFactor: t.scaleFactor,
  };
}
var lc = ha("desktop-events"),
  _r = null,
  Ut = [];
async function $e(t, e) {
  const n = Xu(t);
  uc(n, e);
  const r = await (_r ?? (_r = cc()));
  return (
    await Ps.listenProvider({ configHash: n, config: t }),
    async () => {
      (Ut = Ut.filter((s) => s.configHash !== n)),
        await Ps.unlistenProvider(n),
        Ut.length === 0 && (r(), (_r = null));
    }
  );
}
function uc(t, e) {
  const n = (r) => {
    r.payload.configHash === t &&
      (lc.debug("Incoming provider emission:", r.payload), e(r.payload));
  };
  Ut.push({ configHash: t, fn: n });
}
async function cc() {
  return zr("provider-emit", (t) => {
    Ut.forEach((e) => {
      t.payload.configHash === e.configHash && e.fn(t);
    });
  });
}
function we(t, e) {
  const n = new Set(),
    r = new Set();
  let s = { output: null, error: null, hasError: !1 },
    i = a();
  function a() {
    return e({
      output: (o) => {
        (s = { output: o, error: null, hasError: !1 }), n.forEach((l) => l(o));
      },
      error: (o) => {
        (s = { output: null, error: o, hasError: !0 }), r.forEach((l) => l(o));
      },
    });
  }
  return {
    get output() {
      return s.output;
    },
    get error() {
      return s.error;
    },
    get hasError() {
      return s.hasError;
    },
    config: t,
    restart: async () => {
      i && (await (await i)()), (i = a());
    },
    stop: async () => {
      n.clear(), r.clear(), i && (await (await i)(), (i = null));
    },
    onOutput: (o) => {
      n.add(o);
    },
    onError: (o) => {
      r.add(o);
    },
  };
}
var dc = D.object({
  type: D.literal("battery"),
  refreshInterval: D.coerce.number().default(60 * 1e3),
});
function fc(t) {
  const e = dc.parse(t);
  return we(e, async (n) =>
    $e(e, ({ result: r }) => {
      "error" in r ? n.error(r.error) : n.output(r.output);
    }),
  );
}
var hc = D.object({
  type: D.literal("cpu"),
  refreshInterval: D.coerce.number().default(5 * 1e3),
});
function mc(t) {
  const e = hc.parse(t);
  return we(e, async (n) =>
    $e(e, ({ result: r }) => {
      "error" in r ? n.error(r.error) : n.output(r.output);
    }),
  );
}
var pc = D.object({
  type: D.literal("date"),
  refreshInterval: D.coerce.number().default(1e3),
  timezone: D.string().default("local"),
  locale: D.string().optional(),
  formatting: D.string().default("EEE	d MMM t"),
});
function yc(t) {
  const e = pc.parse(t);
  return we(e, async (n) => {
    n.output(s());
    const r = setInterval(() => n.output(s()), e.refreshInterval);
    function s() {
      const i = K.now().setZone(e.timezone);
      return {
        new: i.toJSDate(),
        now: i.toMillis(),
        iso: i.toISO(),
        formatted: i.toFormat(e.formatting, { locale: e.locale }),
      };
    }
    return () => {
      clearInterval(r);
    };
  });
}
var gc = D.object({ type: D.literal("glazewm") });
function wc(t) {
  const e = gc.parse(t);
  return we(e, async (n) => {
    const r = await ma(),
      s = new Ku();
    let i = null;
    return (
      s.onDisconnect(() => n.error("Failed to connect to GlazeWM IPC server.")),
      s.onConnect(async () => {
        let a = await u();
        n.output(a),
          (i ??= await s.subscribeMany(
            [
              de.BINDING_MODES_CHANGED,
              de.FOCUS_CHANGED,
              de.FOCUSED_CONTAINER_MOVED,
              de.TILING_DIRECTION_CHANGED,
              de.WORKSPACE_ACTIVATED,
              de.WORKSPACE_DEACTIVATED,
              de.WORKSPACE_UPDATED,
            ],
            o,
          ));
        async function o(d) {
          switch (d.eventType) {
            case de.BINDING_MODES_CHANGED: {
              a = { ...a, bindingModes: d.newBindingModes };
              break;
            }
            case de.FOCUS_CHANGED: {
              (a = { ...a, focusedContainer: d.focusedContainer }),
                (a = { ...a, ...(await c()) });
              const { tilingDirection: w } = await s.queryTilingDirection();
              a = { ...a, tilingDirection: w };
              break;
            }
            case de.FOCUSED_CONTAINER_MOVED: {
              (a = { ...a, focusedContainer: d.focusedContainer }),
                (a = { ...a, ...(await c()) });
              break;
            }
            case de.TILING_DIRECTION_CHANGED: {
              a = { ...a, tilingDirection: d.newTilingDirection };
              break;
            }
            case de.WORKSPACE_ACTIVATED:
            case de.WORKSPACE_DEACTIVATED:
            case de.WORKSPACE_UPDATED: {
              a = { ...a, ...(await c()) };
              break;
            }
          }
          n.output(a);
        }
        function l(d, w) {
          return s.runCommand(d, w);
        }
        async function u() {
          const { focused: d } = await s.queryFocused(),
            { bindingModes: w } = await s.queryBindingModes(),
            { tilingDirection: h } = await s.queryTilingDirection();
          return {
            ...(await c()),
            focusedContainer: d,
            tilingDirection: h,
            bindingModes: w,
            runCommand: l,
          };
        }
        async function c() {
          const d = { x: r.currentMonitor.x, y: r.currentMonitor.y },
            { monitors: w } = await s.queryMonitors(),
            { windows: h } = await s.queryWindows(),
            $ = w.reduce((P, se) => (Bn(d, P) < Bn(d, se) ? P : se)),
            ne = w.find((P) => P.hasFocus),
            X = w.flatMap((P) => P.children),
            ue = ne?.children.find((P) => P.hasFocus);
          return {
            displayedWorkspace: $.children.find((P) => P.isDisplayed),
            focusedWorkspace: ue,
            currentWorkspaces: $.children,
            allWorkspaces: X,
            focusedMonitor: ne,
            currentMonitor: $,
            allMonitors: w,
            allWindows: h,
          };
        }
      }),
      () => {
        i?.(), s.closeConnection();
      }
    );
  });
}
var vc = D.object({
  type: D.literal("host"),
  refreshInterval: D.coerce.number().default(60 * 1e3),
});
function _c(t) {
  const e = vc.parse(t);
  return we(e, async (n) =>
    $e(e, ({ result: r }) => {
      "error" in r ? n.error(r.error) : n.output(r.output);
    }),
  );
}
var bc = D.object({
  type: D.literal("ip"),
  refreshInterval: D.coerce.number().default(60 * 60 * 1e3),
});
function kc(t) {
  const e = bc.parse(t);
  return we(e, async (n) =>
    $e(e, ({ result: r }) => {
      "error" in r ? n.error(r.error) : n.output(r.output);
    }),
  );
}
var Sc = D.object({
  type: D.literal("keyboard"),
  refreshInterval: D.coerce.number().default(1e3),
});
function Tc(t) {
  const e = Sc.parse(t);
  return we(e, async (n) =>
    $e(e, ({ result: r }) => {
      "error" in r ? n.error(r.error) : n.output(r.output);
    }),
  );
}
var xc = D.object({ type: D.literal("komorebi") });
function Oc(t) {
  const e = xc.parse(t);
  return we(e, async (n) => {
    const r = await ma();
    async function s(i) {
      const a = { x: r.currentMonitor.x, y: r.currentMonitor.y },
        o = i.allMonitors.reduce((w, h) =>
          Bn(a, { x: w.workAreaSize.left, y: w.workAreaSize.top }) <
          Bn(a, { x: h.workAreaSize.left, y: h.workAreaSize.top })
            ? w
            : h,
        ),
        l = o.workspaces[o.focusedWorkspaceIndex],
        u = i.allMonitors.flatMap((w) => w.workspaces),
        c = i.allMonitors[i.focusedMonitorIndex],
        d = c.workspaces[c.focusedWorkspaceIndex];
      return {
        displayedWorkspace: l,
        focusedWorkspace: d,
        currentWorkspaces: o.workspaces,
        allWorkspaces: u,
        focusedMonitor: c,
        currentMonitor: o,
        allMonitors: i.allMonitors,
      };
    }
    return $e(e, async ({ result: i }) => {
      if ("error" in i) n.error(i.error);
      else {
        const a = await s(i.output);
        n.output(a);
      }
    });
  });
}
var Ec = D.object({ type: D.literal("media") });
function Cc(t) {
  const e = Ec.parse(t);
  return we(e, async (n) =>
    $e(e, ({ result: r }) => {
      "error" in r ? n.error(r.error) : n.output(r.output);
    }),
  );
}
var Nc = D.object({
  type: D.literal("memory"),
  refreshInterval: D.coerce.number().default(5 * 1e3),
});
function Mc(t) {
  const e = Nc.parse(t);
  return we(e, async (n) =>
    $e(e, ({ result: r }) => {
      "error" in r ? n.error(r.error) : n.output(r.output);
    }),
  );
}
var Dc = D.object({
  type: D.literal("network"),
  refreshInterval: D.coerce.number().default(5 * 1e3),
});
function Ic(t) {
  const e = Dc.parse(t);
  return we(e, async (n) =>
    $e(e, ({ result: r }) => {
      "error" in r ? n.error(r.error) : n.output(r.output);
    }),
  );
}
var $c = D.object({
  type: D.literal("weather"),
  latitude: D.coerce.number().optional(),
  longitude: D.coerce.number().optional(),
  refreshInterval: D.coerce.number().default(60 * 60 * 1e3),
});
function Ac(t) {
  const e = $c.parse(t);
  return we(e, async (n) =>
    $e(e, ({ result: r }) => {
      "error" in r ? n.error(r.error) : n.output(r.output);
    }),
  );
}
var Wc = D.object({
  type: D.literal("disk"),
  refreshInterval: D.coerce.number().default(60 * 1e3),
});
function Rc(t) {
  const e = Wc.parse(t);
  return we(e, async (n) =>
    $e(e, ({ result: r }) => {
      "error" in r ? n.error(r.error) : n.output(r.output);
    }),
  );
}
function Lc(t) {
  switch (t.type) {
    case "battery":
      return fc(t);
    case "cpu":
      return mc(t);
    case "date":
      return yc(t);
    case "glazewm":
      return wc(t);
    case "host":
      return _c(t);
    case "ip":
      return kc(t);
    case "komorebi":
      return Oc(t);
    case "media":
      return Cc(t);
    case "memory":
      return Mc(t);
    case "network":
      return Ic(t);
    case "weather":
      return Ac(t);
    case "keyboard":
      return Tc(t);
    case "disk":
      return Rc(t);
    default:
      throw new Error("Not a supported provider type.");
  }
}
function Zc(t) {
  const e = new Set(),
    n = new Set(),
    r = Vc(t);
  let s = Object.fromEntries(Object.keys(r).map((a) => [a, null])),
    i = Object.fromEntries(Object.keys(r).map((a) => [a, null]));
  for (const [a, o] of Object.entries(r))
    o.onOutput(() => {
      (s = { ...s, [a]: o.output }),
        (i = { ...i, [a]: null }),
        e.forEach((l) => l(s));
    }),
      o.onError(() => {
        (i = { ...i, [a]: o.error }),
          (s = { ...s, [a]: null }),
          n.forEach((l) => l(i));
      });
  return {
    get outputMap() {
      return s;
    },
    get errorMap() {
      return i;
    },
    get hasErrors() {
      return Object.keys(i).length > 0;
    },
    configMap: t,
    raw: r,
    onOutput: (a) => {
      e.add(a);
    },
    onError: (a) => {
      n.add(a);
    },
    restartAll: async () => {
      await Promise.all(Object.values(r).map((a) => a.restart()));
    },
    stopAll: async () => {
      e.clear(),
        n.clear(),
        await Promise.all(Object.values(r).map((a) => a.stop()));
    },
  };
}
function Vc(t) {
  return Object.fromEntries(Object.entries(t).map(([e, n]) => [e, Lc(n)]));
}
var Pc =
  typeof globalThis < "u"
    ? globalThis
    : typeof window < "u"
      ? window
      : typeof global < "u"
        ? global
        : typeof self < "u"
          ? self
          : {};
function zc(t) {
  return t && t.__esModule && Object.prototype.hasOwnProperty.call(t, "default")
    ? t.default
    : t;
}
var pa = { exports: {} };
(function (t, e) {
  (function (n, r) {
    t.exports = r();
  })(Pc, function () {
    var n = 1e3,
      r = 6e4,
      s = 36e5,
      i = "millisecond",
      a = "second",
      o = "minute",
      l = "hour",
      u = "day",
      c = "week",
      d = "month",
      w = "quarter",
      h = "year",
      $ = "date",
      ne = "Invalid Date",
      X =
        /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
      ue =
        /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
      ee = {
        name: "en",
        weekdays:
          "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
        months:
          "January_February_March_April_May_June_July_August_September_October_November_December".split(
            "_",
          ),
        ordinal: function (x) {
          var b = ["th", "st", "nd", "rd"],
            y = x % 100;
          return "[" + x + (b[(y - 20) % 10] || b[y] || b[0]) + "]";
        },
      },
      P = function (x, b, y) {
        var k = String(x);
        return !k || k.length >= b
          ? x
          : "" + Array(b + 1 - k.length).join(y) + x;
      },
      se = {
        s: P,
        z: function (x) {
          var b = -x.utcOffset(),
            y = Math.abs(b),
            k = Math.floor(y / 60),
            _ = y % 60;
          return (b <= 0 ? "+" : "-") + P(k, 2, "0") + ":" + P(_, 2, "0");
        },
        m: function x(b, y) {
          if (b.date() < y.date()) return -x(y, b);
          var k = 12 * (y.year() - b.year()) + (y.month() - b.month()),
            _ = b.clone().add(k, d),
            N = y - _ < 0,
            M = b.clone().add(k + (N ? -1 : 1), d);
          return +(-(k + (y - _) / (N ? _ - M : M - _)) || 0);
        },
        a: function (x) {
          return x < 0 ? Math.ceil(x) || 0 : Math.floor(x);
        },
        p: function (x) {
          return (
            { M: d, y: h, w: c, d: u, D: $, h: l, m: o, s: a, ms: i, Q: w }[
              x
            ] ||
            String(x || "")
              .toLowerCase()
              .replace(/s$/, "")
          );
        },
        u: function (x) {
          return x === void 0;
        },
      },
      ce = "en",
      Te = {};
    Te[ce] = ee;
    var fn = "$isDayjsObject",
      It = function (x) {
        return x instanceof hn || !(!x || !x[fn]);
      },
      Fe = function x(b, y, k) {
        var _;
        if (!b) return ce;
        if (typeof b == "string") {
          var N = b.toLowerCase();
          Te[N] && (_ = N), y && ((Te[N] = y), (_ = N));
          var M = b.split("-");
          if (!_ && M.length > 1) return x(M[0]);
        } else {
          var F = b.name;
          (Te[F] = b), (_ = F);
        }
        return !k && _ && (ce = _), _ || (!k && ce);
      },
      U = function (x, b) {
        if (It(x)) return x.clone();
        var y = typeof b == "object" ? b : {};
        return (y.date = x), (y.args = arguments), new hn(y);
      },
      V = se;
    (V.l = Fe),
      (V.i = It),
      (V.w = function (x, b) {
        return U(x, { locale: b.$L, utc: b.$u, x: b.$x, $offset: b.$offset });
      });
    var hn = (function () {
        function x(y) {
          (this.$L = Fe(y.locale, null, !0)),
            this.parse(y),
            (this.$x = this.$x || y.x || {}),
            (this[fn] = !0);
        }
        var b = x.prototype;
        return (
          (b.parse = function (y) {
            (this.$d = (function (k) {
              var _ = k.date,
                N = k.utc;
              if (_ === null) return new Date(NaN);
              if (V.u(_)) return new Date();
              if (_ instanceof Date) return new Date(_);
              if (typeof _ == "string" && !/Z$/i.test(_)) {
                var M = _.match(X);
                if (M) {
                  var F = M[2] - 1 || 0,
                    G = (M[7] || "0").substring(0, 3);
                  return N
                    ? new Date(
                        Date.UTC(
                          M[1],
                          F,
                          M[3] || 1,
                          M[4] || 0,
                          M[5] || 0,
                          M[6] || 0,
                          G,
                        ),
                      )
                    : new Date(
                        M[1],
                        F,
                        M[3] || 1,
                        M[4] || 0,
                        M[5] || 0,
                        M[6] || 0,
                        G,
                      );
                }
              }
              return new Date(_);
            })(y)),
              this.init();
          }),
          (b.init = function () {
            var y = this.$d;
            (this.$y = y.getFullYear()),
              (this.$M = y.getMonth()),
              (this.$D = y.getDate()),
              (this.$W = y.getDay()),
              (this.$H = y.getHours()),
              (this.$m = y.getMinutes()),
              (this.$s = y.getSeconds()),
              (this.$ms = y.getMilliseconds());
          }),
          (b.$utils = function () {
            return V;
          }),
          (b.isValid = function () {
            return this.$d.toString() !== ne;
          }),
          (b.isSame = function (y, k) {
            var _ = U(y);
            return this.startOf(k) <= _ && _ <= this.endOf(k);
          }),
          (b.isAfter = function (y, k) {
            return U(y) < this.startOf(k);
          }),
          (b.isBefore = function (y, k) {
            return this.endOf(k) < U(y);
          }),
          (b.$g = function (y, k, _) {
            return V.u(y) ? this[k] : this.set(_, y);
          }),
          (b.unix = function () {
            return Math.floor(this.valueOf() / 1e3);
          }),
          (b.valueOf = function () {
            return this.$d.getTime();
          }),
          (b.startOf = function (y, k) {
            var _ = this,
              N = !!V.u(k) || k,
              M = V.p(y),
              F = function (et, me) {
                var Ue = V.w(
                  _.$u ? Date.UTC(_.$y, me, et) : new Date(_.$y, me, et),
                  _,
                );
                return N ? Ue : Ue.endOf(u);
              },
              G = function (et, me) {
                return V.w(
                  _.toDate()[et].apply(
                    _.toDate("s"),
                    (N ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(me),
                  ),
                  _,
                );
              },
              re = this.$W,
              ie = this.$M,
              ve = this.$D,
              dt = "set" + (this.$u ? "UTC" : "");
            switch (M) {
              case h:
                return N ? F(1, 0) : F(31, 11);
              case d:
                return N ? F(1, ie) : F(0, ie + 1);
              case c:
                var Xe = this.$locale().weekStart || 0,
                  $t = (re < Xe ? re + 7 : re) - Xe;
                return F(N ? ve - $t : ve + (6 - $t), ie);
              case u:
              case $:
                return G(dt + "Hours", 0);
              case l:
                return G(dt + "Minutes", 1);
              case o:
                return G(dt + "Seconds", 2);
              case a:
                return G(dt + "Milliseconds", 3);
              default:
                return this.clone();
            }
          }),
          (b.endOf = function (y) {
            return this.startOf(y, !1);
          }),
          (b.$set = function (y, k) {
            var _,
              N = V.p(y),
              M = "set" + (this.$u ? "UTC" : ""),
              F = ((_ = {}),
              (_[u] = M + "Date"),
              (_[$] = M + "Date"),
              (_[d] = M + "Month"),
              (_[h] = M + "FullYear"),
              (_[l] = M + "Hours"),
              (_[o] = M + "Minutes"),
              (_[a] = M + "Seconds"),
              (_[i] = M + "Milliseconds"),
              _)[N],
              G = N === u ? this.$D + (k - this.$W) : k;
            if (N === d || N === h) {
              var re = this.clone().set($, 1);
              re.$d[F](G),
                re.init(),
                (this.$d = re.set($, Math.min(this.$D, re.daysInMonth())).$d);
            } else F && this.$d[F](G);
            return this.init(), this;
          }),
          (b.set = function (y, k) {
            return this.clone().$set(y, k);
          }),
          (b.get = function (y) {
            return this[V.p(y)]();
          }),
          (b.add = function (y, k) {
            var _,
              N = this;
            y = Number(y);
            var M = V.p(k),
              F = function (ie) {
                var ve = U(N);
                return V.w(ve.date(ve.date() + Math.round(ie * y)), N);
              };
            if (M === d) return this.set(d, this.$M + y);
            if (M === h) return this.set(h, this.$y + y);
            if (M === u) return F(1);
            if (M === c) return F(7);
            var G = ((_ = {}), (_[o] = r), (_[l] = s), (_[a] = n), _)[M] || 1,
              re = this.$d.getTime() + y * G;
            return V.w(re, this);
          }),
          (b.subtract = function (y, k) {
            return this.add(-1 * y, k);
          }),
          (b.format = function (y) {
            var k = this,
              _ = this.$locale();
            if (!this.isValid()) return _.invalidDate || ne;
            var N = y || "YYYY-MM-DDTHH:mm:ssZ",
              M = V.z(this),
              F = this.$H,
              G = this.$m,
              re = this.$M,
              ie = _.weekdays,
              ve = _.months,
              dt = _.meridiem,
              Xe = function (me, Ue, At, mn) {
                return (me && (me[Ue] || me(k, N))) || At[Ue].slice(0, mn);
              },
              $t = function (me) {
                return V.s(F % 12 || 12, me, "0");
              },
              et =
                dt ||
                function (me, Ue, At) {
                  var mn = me < 12 ? "AM" : "PM";
                  return At ? mn.toLowerCase() : mn;
                };
            return N.replace(ue, function (me, Ue) {
              return (
                Ue ||
                (function (At) {
                  switch (At) {
                    case "YY":
                      return String(k.$y).slice(-2);
                    case "YYYY":
                      return V.s(k.$y, 4, "0");
                    case "M":
                      return re + 1;
                    case "MM":
                      return V.s(re + 1, 2, "0");
                    case "MMM":
                      return Xe(_.monthsShort, re, ve, 3);
                    case "MMMM":
                      return Xe(ve, re);
                    case "D":
                      return k.$D;
                    case "DD":
                      return V.s(k.$D, 2, "0");
                    case "d":
                      return String(k.$W);
                    case "dd":
                      return Xe(_.weekdaysMin, k.$W, ie, 2);
                    case "ddd":
                      return Xe(_.weekdaysShort, k.$W, ie, 3);
                    case "dddd":
                      return ie[k.$W];
                    case "H":
                      return String(F);
                    case "HH":
                      return V.s(F, 2, "0");
                    case "h":
                      return $t(1);
                    case "hh":
                      return $t(2);
                    case "a":
                      return et(F, G, !0);
                    case "A":
                      return et(F, G, !1);
                    case "m":
                      return String(G);
                    case "mm":
                      return V.s(G, 2, "0");
                    case "s":
                      return String(k.$s);
                    case "ss":
                      return V.s(k.$s, 2, "0");
                    case "SSS":
                      return V.s(k.$ms, 3, "0");
                    case "Z":
                      return M;
                  }
                  return null;
                })(me) ||
                M.replace(":", "")
              );
            });
          }),
          (b.utcOffset = function () {
            return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
          }),
          (b.diff = function (y, k, _) {
            var N,
              M = this,
              F = V.p(k),
              G = U(y),
              re = (G.utcOffset() - this.utcOffset()) * r,
              ie = this - G,
              ve = function () {
                return V.m(M, G);
              };
            switch (F) {
              case h:
                N = ve() / 12;
                break;
              case d:
                N = ve();
                break;
              case w:
                N = ve() / 3;
                break;
              case c:
                N = (ie - re) / 6048e5;
                break;
              case u:
                N = (ie - re) / 864e5;
                break;
              case l:
                N = ie / s;
                break;
              case o:
                N = ie / r;
                break;
              case a:
                N = ie / n;
                break;
              default:
                N = ie;
            }
            return _ ? N : V.a(N);
          }),
          (b.daysInMonth = function () {
            return this.endOf(d).$D;
          }),
          (b.$locale = function () {
            return Te[this.$L];
          }),
          (b.locale = function (y, k) {
            if (!y) return this.$L;
            var _ = this.clone(),
              N = Fe(y, k, !0);
            return N && (_.$L = N), _;
          }),
          (b.clone = function () {
            return V.w(this.$d, this);
          }),
          (b.toDate = function () {
            return new Date(this.valueOf());
          }),
          (b.toJSON = function () {
            return this.isValid() ? this.toISOString() : null;
          }),
          (b.toISOString = function () {
            return this.$d.toISOString();
          }),
          (b.toString = function () {
            return this.$d.toUTCString();
          }),
          x
        );
      })(),
      Qr = hn.prototype;
    return (
      (U.prototype = Qr),
      [
        ["$ms", i],
        ["$s", a],
        ["$m", o],
        ["$H", l],
        ["$W", u],
        ["$M", d],
        ["$y", h],
        ["$D", $],
      ].forEach(function (x) {
        Qr[x[1]] = function (b) {
          return this.$g(b, x[0], x[1]);
        };
      }),
      (U.extend = function (x, b) {
        return x.$i || (x(b, hn, U), (x.$i = !0)), U;
      }),
      (U.locale = Fe),
      (U.isDayjs = It),
      (U.unix = function (x) {
        return U(1e3 * x);
      }),
      (U.en = Te[ce]),
      (U.Ls = Te),
      (U.p = {}),
      U
    );
  });
})(pa);
var Fc = pa.exports;
const Fs = zc(Fc);
var Uc = Q("<div id=time><span></span><span></span><div id=meridiem>"),
  jc = Q("<div id=date><div></div><div>");
function Hc(t) {
  const [e, n] = Zr(Fs());
  return (
    _a(() => {
      n(Fs(t.date.new));
    }),
    [
      (() => {
        var r = Uc(),
          s = r.firstChild,
          i = s.nextSibling,
          a = i.nextSibling;
        return (
          W(s, () => e().format("hh")),
          W(i, () => e().format("mm")),
          W(a, () => e().format("A")),
          r
        );
      })(),
      (() => {
        var r = jc(),
          s = r.firstChild,
          i = s.nextSibling;
        return (
          W(s, () => e().format("ddd")), W(i, () => e().format("D MMM")), r
        );
      })(),
    ]
  );
}
var qc = Q("<i>");
function xt(t) {
  return (() => {
    var e = qc();
    return Ve(() => Qs(e, `nf ${t.iconClass}`)), e;
  })();
}
var Gc = Q("<div class=status-item>");
function ya(t) {
  return (() => {
    var e = Gc();
    return (
      W(
        e,
        A(xt, {
          get iconClass() {
            return t.iconClass;
          },
        }),
        null,
      ),
      W(e, () => t.children, null),
      e
    );
  })();
}
var Yc = Q("<div>");
const Jc = [
    "light_rain_day",
    "light_rain_night",
    "heavy_rain_day",
    "heavy_rain_night",
    "snow_day",
    "snow_night",
    "thunder_day",
    "thunder_night",
  ],
  Bc = {
    clear_day: "nf-weather-day_sunny",
    clear_night: "nf-weather-night_clear",
    cloudy_day: "nf-weather-day_cloudy",
    cloudy_night: "nf-weather-night_alt_cloudy",
    light_rain_day: "nf-weather-day_sprinkle",
    light_rain_night: "nf-weather-night_alt_sprinkle",
    heavy_rain_day: "nf-weather-day_rain",
    heavy_rain_night: "nf-weather-night_alt_rain",
    snow_day: "nf-weather-day_snow",
    snow_night: "nf-weather-night_alt_snow",
    thunder_day: "nf-weather-day_lightning",
    thunder_night: "nf-weather-night_alt_lightning",
  };
function Kc(t) {
  const e = () => Jc.includes(t.weather.status);
  return (() => {
    var n = Yc();
    return (
      W(
        n,
        A(ya, {
          get iconClass() {
            return Bc[t.weather.status];
          },
          get children() {
            return `${t.weather.celsiusTemp.toFixed(0)}°`;
          },
        }),
      ),
      Ve(() => Qs(n, e() ? "rain" : "no-rain")),
      n
    );
  })();
}
const Qc = {
  msedge: "nf-md-microsoft_edge",
  Discord: "nf-fa-discord",
  Code: "nf-md-microsoft_visual_studio_code",
  Spotify: "nf-fa-spotify",
  steamwebhelper: "nf-md-steam",
  OneCommander: "nf-oct-file_directory",
  stremio: "nf-md-movie",
  mpvnet: "nf-linux-mpv",
  QRSL: "nf-md-gamepad_variant",
  webstorm64: "nf-fa-code",
};
function ga(t) {
  const e = () => Qc[t.processName] ?? "nf-md-application";
  return A(xt, {
    get iconClass() {
      return e();
    },
  });
}
var Xc = Q("<div id=process-icon>"),
  ed = Q("<div id=process-name>");
function td(t) {
  const e = () =>
    t.glazewm.focusedContainer.type === "window"
      ? t.glazewm.focusedContainer.processName
      : void 0;
  return [
    (() => {
      var n = Xc();
      return (
        W(
          n,
          A(er, {
            get when() {
              return e() !== void 0;
            },
            get fallback() {
              return A(xt, { iconClass: "nf-custom-windows" });
            },
            get children() {
              return A(ga, {
                get processName() {
                  return e();
                },
              });
            },
          }),
        ),
        n
      );
    })(),
    (() => {
      var n = ed();
      return W(n, e), n;
    })(),
  ];
}
var nd = Q("<div class=workspace-applications>"),
  rd = Q("<button class=workspace-btn><div class=workspace-name>"),
  sd = Q("<div class=workspace-application>");
function id(t) {
  return (() => {
    var e = rd(),
      n = e.firstChild;
    return (
      (e.$$click = () =>
        t.glazewm.runCommand(`focus --workspace ${t.workspace.name}`)),
      W(n, () => t.workspace.displayName ?? t.workspace.name),
      W(
        e,
        A(er, {
          get when() {
            return t.workspace.children.some((r) => r.type === "window");
          },
          get children() {
            var r = nd();
            return (
              W(
                r,
                A(Pr, {
                  get each() {
                    return t.workspace.children;
                  },
                  children: (s) =>
                    s.type === "window"
                      ? (() => {
                          var i = sd();
                          return (
                            W(
                              i,
                              A(ga, {
                                get processName() {
                                  return s.processName;
                                },
                              }),
                            ),
                            Ve(() =>
                              i.classList.toggle("focused", !!s.hasFocus),
                            ),
                            i
                          );
                        })()
                      : void 0,
                }),
              ),
              r
            );
          },
        }),
        null,
      ),
      Ve(
        (r) => {
          var s = !!t.workspace.hasFocus,
            i = !!t.workspace.isDisplayed;
          return (
            s !== r.e && e.classList.toggle("focused", (r.e = s)),
            i !== r.t && e.classList.toggle("displayed", (r.t = i)),
            r
          );
        },
        { e: void 0, t: void 0 },
      ),
      e
    );
  })();
}
Ks(["click"]);
const ad = {
  0: ["2-1", "2-2", "2-3", "2-4", "2-5", "2-6", "2-7", "2-8"],
  1: ["1-1", "1-2", "1-3", "1-4", "1-5", "1-6", "1-7", "1-8"],
};
var od = Q('<button class="workspace-btn add-workspace">');
function ld(t) {
  return (() => {
    var e = od();
    return (
      (e.$$click = () =>
        t.glazewm.runCommand(`focus --workspace ${t.firstFreeWorkspaceName}`)),
      W(e, A(xt, { iconClass: "nf-md-plus" })),
      e
    );
  })();
}
Ks(["click"]);
var ud = Q("<div class=workspaces>");
function cd(t) {
  const e = () => {
      const r = t.glazewm.allMonitors.findIndex(
        (i) => i.id === t.glazewm.currentMonitor.id,
      );
      return r === -1
        ? void 0
        : ad[r].find(
            (i) => !t.glazewm.currentWorkspaces.some((a) => a.name === i),
          );
    },
    n = () => t.glazewm.displayedWorkspace.children.length > 0;
  return (() => {
    var r = ud();
    return (
      W(
        r,
        A(Pr, {
          get each() {
            return t.glazewm.currentWorkspaces;
          },
          children: (s) =>
            A(id, {
              workspace: s,
              get glazewm() {
                return t.glazewm;
              },
            }),
        }),
        null,
      ),
      W(
        r,
        A(er, {
          get when() {
            return be(() => !!n())() && !!e();
          },
          get children() {
            return A(ld, {
              get glazewm() {
                return t.glazewm;
              },
              get firstFreeWorkspaceName() {
                return e();
              },
            });
          },
        }),
        null,
      ),
      r
    );
  })();
}
var dd = Q("<div>");
function fd(t) {
  return [
    A(Pr, {
      get each() {
        return t.glazewm.bindingModes;
      },
      children: (e) =>
        (() => {
          var n = dd();
          return W(n, () => e.displayName ?? e.name), n;
        })(),
    }),
    A(er, {
      get when() {
        return t.glazewm.tilingDirection === "horizontal";
      },
      get fallback() {
        return A(xt, { iconClass: "nf-md-swap_vertical" });
      },
      get children() {
        return A(xt, { iconClass: "nf-md-swap_horizontal" });
      },
    }),
  ];
}
var hd = Q(
  "<div class=bar-wrapper><div class=bar-outline><div class=bar></div></div><div class=bar-value>",
);
function Kn(t) {
  return (() => {
    var e = hd(),
      n = e.firstChild,
      r = n.firstChild,
      s = n.nextSibling;
    return (
      W(s, () => t.value, null),
      W(s, () => t.unit, null),
      Ve((i) =>
        (i = `${Math.min(Math.round(((t.barValue ?? t.value) / t.barMaxValue) * 100), 100)}%`) !=
        null
          ? r.style.setProperty("width", i)
          : r.style.removeProperty("width"),
      ),
      e
    );
  })();
}
var md = Q("<div class=bar-group>"),
  pd = Q("<div class=bar-status-item>");
function Kr(t) {
  return (() => {
    var e = pd();
    return (
      W(
        e,
        A(ya, {
          get iconClass() {
            return t.iconClass;
          },
          get children() {
            var n = md();
            return W(n, () => t.bars), n;
          },
        }),
      ),
      Ve(() => e.classList.toggle("high-usage", !!t.isHighUsage)),
      e
    );
  })();
}
var yd = Q("<div class=cpu>");
function gd(t) {
  return (() => {
    var e = yd();
    return (
      W(
        e,
        A(Kr, {
          iconClass: "nf-oct-cpu",
          get bars() {
            return A(Kn, {
              get value() {
                return Math.round(t.cpu.usage);
              },
              unit: "%",
              barMaxValue: 100,
            });
          },
          get isHighUsage() {
            return t.cpu.usage > 85;
          },
        }),
      ),
      e
    );
  })();
}
var wd = Q("<div class=memory>");
function vd(t) {
  return (() => {
    var e = wd();
    return (
      W(
        e,
        A(Kr, {
          iconClass: "nf-fae-chip",
          get bars() {
            return A(Kn, {
              get value() {
                return Math.round(t.memory.usage);
              },
              barMaxValue: 100,
              unit: "%",
            });
          },
          get isHighUsage() {
            return t.memory.usage > 85;
          },
        }),
      ),
      e
    );
  })();
}
var _d = Q("<div class=network>");
function bd(t) {
  const e = () =>
    t.network.defaultInterface?.type === "wifi"
      ? t.network.defaultGateway === null ||
        t.network.defaultGateway.signalStrength === null
        ? "nf-md-wifi_strength_off_outline"
        : t.network.defaultGateway.signalStrength >= 80
          ? "nf-md-wifi_strength_4"
          : t.network.defaultGateway.signalStrength >= 65
            ? "nf-md-wifi_strength_3"
            : t.network.defaultGateway.signalStrength >= 40
              ? "nf-md-wifi_strength_2"
              : t.network.defaultGateway.signalStrength >= 25
                ? "nf-md-wifi_strength_1"
                : "nf-md-wifi_strength_outline"
      : t.network.defaultInterface?.type === "ethernet"
        ? "nf-md-ethernet_cable"
        : "nf-md-wifi_strength_off_outline";
  return (() => {
    var n = _d();
    return (
      W(
        n,
        A(Kr, {
          get iconClass() {
            return e();
          },
          get bars() {
            return [
              A(Kn, {
                get value() {
                  return Math.round(t.network.traffic?.received.siValue ?? 0);
                },
                get unit() {
                  return t.network.traffic?.received.siUnit ?? "";
                },
                get barValue() {
                  return t.network.traffic?.received.bytes ?? 0;
                },
                barMaxValue: 4e7,
              }),
              A(Kn, {
                get value() {
                  return Math.round(
                    t.network.traffic?.transmitted.siValue ?? 0,
                  );
                },
                get unit() {
                  return t.network.traffic?.transmitted.siUnit ?? "";
                },
                get barValue() {
                  return t.network.traffic?.transmitted.bytes ?? 0;
                },
                barMaxValue: 13e6,
              }),
            ];
          },
        }),
      ),
      n
    );
  })();
}
var kd = Q(
  "<div class=app><div class=group id=group-top></div><div class=group id=group-middle></div><div class=group id=group-bottom>",
);
const Us = Zc({
  date: { type: "date" },
  weather: { type: "weather" },
  glazewm: { type: "glazewm" },
  cpu: { type: "cpu" },
  memory: { type: "memory" },
  network: { type: "network" },
});
Da(() => A(Sd, {}), document.getElementById("root"));
function Sd() {
  const [t, e] = La(Us.outputMap);
  return (
    Us.onOutput((n) => e(n)),
    (() => {
      var n = kd(),
        r = n.firstChild,
        s = r.nextSibling,
        i = s.nextSibling;
      return (
        W(
          r,
          (() => {
            var a = be(() => !!t.date);
            return () =>
              a() &&
              A(Hc, {
                get date() {
                  return t.date;
                },
              });
          })(),
          null,
        ),
        W(
          r,
          (() => {
            var a = be(() => !!t.weather);
            return () =>
              a() &&
              A(Kc, {
                get weather() {
                  return t.weather;
                },
              });
          })(),
          null,
        ),
        W(
          s,
          (() => {
            var a = be(() => !!t.glazewm);
            return () =>
              a() &&
              A(td, {
                get glazewm() {
                  return t.glazewm;
                },
              });
          })(),
          null,
        ),
        W(
          s,
          (() => {
            var a = be(() => !!t.glazewm);
            return () =>
              a() &&
              A(cd, {
                get glazewm() {
                  return t.glazewm;
                },
              });
          })(),
          null,
        ),
        W(
          i,
          (() => {
            var a = be(() => !!t.glazewm);
            return () =>
              a() &&
              A(fd, {
                get glazewm() {
                  return t.glazewm;
                },
              });
          })(),
          null,
        ),
        W(
          i,
          (() => {
            var a = be(() => !!t.cpu);
            return () =>
              a() &&
              A(gd, {
                get cpu() {
                  return t.cpu;
                },
              });
          })(),
          null,
        ),
        W(
          i,
          (() => {
            var a = be(() => !!t.memory);
            return () =>
              a() &&
              A(vd, {
                get memory() {
                  return t.memory;
                },
              });
          })(),
          null,
        ),
        W(
          i,
          (() => {
            var a = be(() => !!t.network);
            return () =>
              a() &&
              A(bd, {
                get network() {
                  return t.network;
                },
              });
          })(),
          null,
        ),
        n
      );
    })()
  );
}
export { zc as g };
function __vite__mapDeps(indexes) {
  if (!__vite__mapDeps.viteFileDeps) {
    __vite__mapDeps.viteFileDeps = [];
  }
  return indexes.map((i) => __vite__mapDeps.viteFileDeps[i]);
}
