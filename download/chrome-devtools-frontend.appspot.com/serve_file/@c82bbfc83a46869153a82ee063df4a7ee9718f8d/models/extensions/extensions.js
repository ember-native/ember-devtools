import *as e from '../../core/sdk/sdk.js';
import *as t from '../../ui/legacy/legacy.js';
import *as n from '../../core/common/common.js';
import *as s from '../../core/host/host.js';
import *as i from '../../core/i18n/i18n.js';
import *as r from '../../core/platform/platform.js';
import *as o from '../../core/root/root.js';
import *as a from '../logs/logs.js';
import *as c from '../../ui/legacy/components/utils/utils.js';
import *as d from '../../ui/legacy/theme_support/theme_support.js';
import *as l from '../bindings/bindings.js';
import *as u from '../har/har.js';
import *as h from '../workspace/workspace.js';

self.injectedExtensionAPI = function (e, t, n, s, i, r, o) {
  const a = new Set(s), c = window.chrome || {};
  if (Object.getOwnPropertyDescriptor(c, 'devtools')) return;
  let d = !1, l = !1;

  function u(e, t) {
    this._type = e, this._listeners = [], this._customDispatch = t
  }

  function h() {
    this.onRequestFinished = new O('network-request-finished', (function (e) {
      const t = e.arguments[1];
      t.__proto__ = new C(e.arguments[0]), this._fire(t)
    })), y(this, 'network', 'onFinished', 'onRequestFinished'), this.onNavigated = new O('inspected-url-changed')
  }

  function p(e) {
    this._id = e
  }

  function m() {
    const e = { elements: new q, sources: new M, network: new k };

    function t(t) {
      return e[t]
    }

    for (const n in e) Object.defineProperty(this, n, { get: t.bind(null, n), enumerable: !0 });
    this.applyStyleSheet = function (e) {
      z.sendRequest({ command: 'applyStyleSheet', styleSheet: e })
    }
  }

  function g(e) {
    this._id = e, e && (this.onShown = new O('view-shown-' + e, (function (e) {
      const t = e.arguments[0];
      'number' == typeof t ? this._fire(window.parent.frames[t]) : this._fire()
    })), this.onHidden = new O('view-hidden,' + e))
  }

  function f(e) {
    g.call(this, null), this._hostPanelName = e, this.onSelectionChanged = new O('panel-objectSelected-' + e)
  }

  function w() {
    this._plugins = new Map
  }

  function b() {
    this._plugins = new Map
  }

  function R() {
  }

  function E(e) {
    return function (...t) {
      const n = { __proto__: e.prototype };
      e.apply(n, t), function (e, t) {
        for (const n in t) {
          if ('_' === n.charAt(0)) continue;
          let s = null;
          for (let e = t; e && !s; e = e.__proto__) s = Object.getOwnPropertyDescriptor(e, n);
          s && ('function' == typeof s.value ? e[n] = s.value.bind(t) : 'function' == typeof s.get ? e.__defineGetter__(n, s.get.bind(t)) : Object.defineProperty(e, n, s))
        }
      }(this, n)
    }
  }

  function y(e, t, n, s) {
    let i = !1;
    e.__defineGetter__(n, (function () {
      return i || (console.warn(t + '.' + n + ' is deprecated. Use ' + t + '.' + s + ' instead'), i = !0), e[s]
    }))
  }

  function x(e) {
    const t = e[e.length - 1];
    return 'function' == typeof t ? t : void 0
  }

  u.prototype = {
    addListener: function (e) {
      if ('function' != typeof e) throw 'addListener: callback is not a function';
      0 === this._listeners.length && z.sendRequest({
        command: 'subscribe',
        type: this._type
      }), this._listeners.push(e), z.registerHandler('notify-' + this._type, this._dispatch.bind(this))
    }, removeListener: function (e) {
      const t = this._listeners;
      for (let n = 0; n < t.length; ++n) if (t[n] === e) {
        t.splice(n, 1);
        break
      }
      0 === this._listeners.length && z.sendRequest({ command: 'unsubscribe', type: this._type })
    }, _fire: function (...e) {
      const t = this._listeners.slice();
      for (let e = 0; e < t.length; ++e) t[e].apply(null, Array.from(arguments))
    }, _dispatch: function (e) {
      this._customDispatch ? this._customDispatch.call(this, e) : this._fire.apply(this, e.arguments)
    }
  }, h.prototype = {
    getHAR: function (e) {
      z.sendRequest({ command: 'getHAR' }, e && function (t) {
        const n = t, s = n && n.entries || [];
        for (let e = 0; e < s.length; ++e) s[e].__proto__ = new C(s[e]._requestId), delete s[e]._requestId;
        e && e(n)
      })
    }, addRequestHeaders: function (e) {
      z.sendRequest({ command: 'addRequestHeaders', headers: e, extensionId: window.location.hostname })
    }
  }, p.prototype = {
    getContent: function (e) {
      z.sendRequest({ command: 'getRequestContent', id: this._id }, e && function (t) {
        const { content: n, encoding: s } = t;
        e && e(n, s)
      })
    }
  }, m.prototype = {
    create: function (e, t, n, s) {
      const i = 'extension-panel-' + z.nextObjectId();
      z.sendRequest({ command: 'createPanel', id: i, title: e, page: n }, s && (() => s.call(this, new A(i))))
    }, setOpenResourceHandler: function (e) {
      const t = z.hasHandler('open-resource');
      e ? z.registerHandler('open-resource', (function (t) {
        d = !0;
        try {
          const { resource: n, lineNumber: s } = t;
          B(n) && e.call(null, new H(n), s)
        } finally {
          d = !1
        }
      })) : z.unregisterHandler('open-resource'), t === !e && z.sendRequest({
        command: 'setOpenResourceHandler',
        handlerPresent: Boolean(e)
      })
    }, setThemeChangeHandler: function (e) {
      const t = z.hasHandler('host-theme-change');
      e ? z.registerHandler('host-theme-change', (function (t) {
        const { themeName: n } = t;
        c.devtools.panels.themeName = n, e.call(null, n)
      })) : z.unregisterHandler('host-theme-change'), t === !e && z.sendRequest({
        command: 'setThemeChangeHandler',
        handlerPresent: Boolean(e)
      })
    }, openResource: function (e, t, n, s) {
      const i = x(arguments), r = 'number' == typeof n ? n : 0;
      z.sendRequest({ command: 'openResource', url: e, lineNumber: t, columnNumber: r }, i)
    }, get SearchAction() {
      return {
        CancelSearch: 'cancelSearch',
        PerformSearch: 'performSearch',
        NextSearchResult: 'nextSearchResult',
        PreviousSearchResult: 'previousSearchResult'
      }
    }
  }, f.prototype = {
    createSidebarPane: function (e, t) {
      const n = 'extension-sidebar-' + z.nextObjectId();
      z.sendRequest({ command: 'createSidebarPane', panel: this._hostPanelName, id: n, title: e }, t && function () {
        t && t(new T(n))
      })
    }, __proto__: g.prototype
  }, w.prototype = {
    registerRecorderExtensionPlugin: async function (e, t, n) {
      if (this._plugins.has(e)) throw new Error(`Tried to register plugin '${t}' twice`);
      const s = new MessageChannel, i = s.port1;
      this._plugins.set(e, i), i.onmessage = ({ data: t }) => {
        const { requestId: n } = t;
        (async function (t) {
          switch (t.method) {
            case'stringify':
              return e.stringify(t.parameters.recording);
            case'stringifyStep':
              return e.stringifyStep(t.parameters.step);
            case'replay':
              try {
                return d = !0, l = !0, e.replay(t.parameters.recording)
              } finally {
                d = !1, l = !1
              }
            default:
              throw new Error(`'${t.method}' is not recognized`)
          }
        })(t).then((e => i.postMessage({ requestId: n, result: e }))).catch((e => i.postMessage({
          requestId: n,
          error: { message: e.message }
        })))
      };
      const r = [];
      'stringify' in e && 'stringifyStep' in e && r.push('export'), 'replay' in e && r.push('replay'), await new Promise((e => {
        z.sendRequest({
          command: 'registerRecorderExtensionPlugin',
          pluginName: t,
          mediaType: n,
          capabilities: r,
          port: s.port2
        }, (() => e()), [s.port2])
      }))
    }, unregisterRecorderExtensionPlugin: async function (e) {
      const t = this._plugins.get(e);
      if (!t) throw new Error('Tried to unregister a plugin that was not previously registered');
      this._plugins.delete(e), t.postMessage({ event: 'unregisteredRecorderExtensionPlugin' }), t.close()
    }, createView: async function (e, t) {
      const n = 'recorder-extension-view-' + z.nextObjectId();
      return await new Promise((s => {
        z.sendRequest({ command: 'createRecorderView', id: n, title: e, pagePath: t }, s)
      })), new P(n)
    }
  }, b.prototype = {
    registerLanguageExtensionPlugin: async function (e, t, n) {
      if (this._plugins.has(e)) throw new Error(`Tried to register plugin '${t}' twice`);
      const s = new MessageChannel, i = s.port1;
      this._plugins.set(e, i), i.onmessage = ({ data: t }) => {
        const { requestId: n } = t;
        console.time(`${n}: ${t.method}`), function (t) {
          switch (t.method) {
            case'addRawModule':
              return e.addRawModule(t.parameters.rawModuleId, t.parameters.symbolsURL, t.parameters.rawModule);
            case'removeRawModule':
              return e.removeRawModule(t.parameters.rawModuleId);
            case'sourceLocationToRawLocation':
              return e.sourceLocationToRawLocation(t.parameters.sourceLocation);
            case'rawLocationToSourceLocation':
              return e.rawLocationToSourceLocation(t.parameters.rawLocation);
            case'getScopeInfo':
              return e.getScopeInfo(t.parameters.type);
            case'listVariablesInScope':
              return e.listVariablesInScope(t.parameters.rawLocation);
            case'getFunctionInfo':
              return e.getFunctionInfo(t.parameters.rawLocation);
            case'getInlinedFunctionRanges':
              return e.getInlinedFunctionRanges(t.parameters.rawLocation);
            case'getInlinedCalleesRanges':
              return e.getInlinedCalleesRanges(t.parameters.rawLocation);
            case'getMappedLines':
              return 'getMappedLines' in e ? e.getMappedLines(t.parameters.rawModuleId, t.parameters.sourceFileURL) : Promise.resolve(void 0);
            case'formatValue':
              return 'evaluate' in e && e.evaluate ? e.evaluate(t.parameters.expression, t.parameters.context, t.parameters.stopId) : Promise.resolve(void 0);
            case'getProperties':
              if ('getProperties' in e && e.getProperties) return e.getProperties(t.parameters.objectId);
              if (!('evaluate' in e) || !e.evaluate) return Promise.resolve(void 0);
              break;
            case'releaseObject':
              if ('releaseObject' in e && e.releaseObject) return e.releaseObject(t.parameters.objectId)
          }
          throw new Error(`Unknown language plugin method ${t.method}`)
        }(t).then((e => i.postMessage({ requestId: n, result: e }))).catch((e => i.postMessage({
          requestId: n,
          error: { message: e.message }
        }))).finally((() => console.timeEnd(`${n}: ${t.method}`)))
      }, await new Promise((e => {
        z.sendRequest({
          command: 'registerLanguageExtensionPlugin',
          pluginName: t,
          port: s.port2,
          supportedScriptTypes: n
        }, (() => e()), [s.port2])
      }))
    }, unregisterLanguageExtensionPlugin: async function (e) {
      const t = this._plugins.get(e);
      if (!t) throw new Error('Tried to unregister a plugin that was not previously registered');
      this._plugins.delete(e), t.postMessage({ event: 'unregisteredLanguageExtensionPlugin' }), t.close()
    }, getWasmLinearMemory: async function (e, t, n) {
      const s = await new Promise((s => z.sendRequest({
        command: 'getWasmLinearMemory',
        offset: e,
        length: t,
        stopId: n
      }, s)));
      return Array.isArray(s) ? new Uint8Array(s).buffer : new ArrayBuffer(0)
    }, getWasmLocal: async function (e, t) {
      return new Promise((n => z.sendRequest({ command: 'getWasmLocal', local: e, stopId: t }, n)))
    }, getWasmGlobal: async function (e, t) {
      return new Promise((n => z.sendRequest({ command: 'getWasmGlobal', global: e, stopId: t }, n)))
    }, getWasmOp: async function (e, t) {
      return new Promise((n => z.sendRequest({ command: 'getWasmOp', op: e, stopId: t }, n)))
    }, reportResourceLoad: function (e, t) {
      return new Promise((n => z.sendRequest({
        command: 'reportResourceLoad',
        extensionId: window.location.origin,
        resourceUrl: e,
        status: t
      }, n)))
    }
  }, R.prototype = {
    show: function (e) {
      return new Promise((t => z.sendRequest({ command: 'showNetworkPanel', filter: e?.filter }, (() => t()))))
    }
  };
  const v = E(b), _ = E(w), I = E((function () {
    this.onProfilingStarted = new O('profiling-started-', (function () {
      this._fire()
    })), this.onProfilingStopped = new O('profiling-stopped-', (function () {
      this._fire()
    }))
  })), S = E(U), O = E(u), A = E(N), P = E(j), T = E(D), L = E(f), C = E(p), H = E(F), k = E(R);

  class q extends L {
    constructor() {
      super('elements')
    }
  }

  class M extends L {
    constructor() {
      super('sources')
    }
  }

  function N(e) {
    g.call(this, e), this.onSearch = new O('panel-search-' + e)
  }

  function j(e) {
    g.call(this, e)
  }

  function D(e) {
    g.call(this, e)
  }

  function U(e) {
    this._id = e, this.onClicked = new O('button-clicked-' + e)
  }

  function B(t) {
    try {
      return e.allowFileAccess || 'file:' !== new URL(t.url).protocol
    } catch (e) {
      return !1
    }
  }

  function W() {
    this.onResourceAdded = new O('resource-added', (function (e) {
      const t = e.arguments[0];
      B(t) && this._fire(new H(t))
    })), this.onResourceContentCommitted = new O('resource-content-committed', (function (e) {
      const t = e.arguments[0];
      B(t) && this._fire(new H(t), e.arguments[1])
    }))
  }

  function F(e) {
    if (!B(e)) throw new Error('Resource access not allowed');
    this._url = e.url, this._type = e.type
  }

  N.prototype = {
    createStatusBarButton: function (e, t, n) {
      const s = 'button-' + z.nextObjectId();
      return z.sendRequest({
        command: 'createToolbarButton',
        panel: this._id,
        id: s,
        icon: e,
        tooltip: t,
        disabled: Boolean(n)
      }), new S(s)
    }, show: function () {
      d && z.sendRequest({ command: 'showPanel', id: this._id })
    }, __proto__: g.prototype
  }, j.prototype = {
    show: function () {
      d && l && z.sendRequest({ command: 'showRecorderView', id: this._id })
    }, __proto__: g.prototype
  }, D.prototype = {
    setHeight: function (e) {
      z.sendRequest({ command: 'setSidebarHeight', id: this._id, height: e })
    }, setExpression: function (e, t, n, s) {
      z.sendRequest({
        command: 'setSidebarContent',
        id: this._id,
        expression: e,
        rootTitle: t,
        evaluateOnPage: !0,
        evaluateOptions: 'object' == typeof n ? n : {}
      }, x(arguments))
    }, setObject: function (e, t, n) {
      z.sendRequest({ command: 'setSidebarContent', id: this._id, expression: e, rootTitle: t }, n)
    }, setPage: function (e) {
      z.sendRequest({ command: 'setSidebarPage', id: this._id, page: e })
    }, __proto__: g.prototype
  }, U.prototype = {
    update: function (e, t, n) {
      z.sendRequest({ command: 'updateButton', id: this._id, icon: e, tooltip: t, disabled: Boolean(n) })
    }
  }, W.prototype = {
    reload: function (e) {
      let t = null;
      'object' == typeof e ? t = e : 'string' == typeof e && (t = { userAgent: e }, console.warn('Passing userAgent as string parameter to inspectedWindow.reload() is deprecated. Use inspectedWindow.reload({ userAgent: value}) instead.')), z.sendRequest({
        command: 'Reload',
        options: t
      })
    }, eval: function (e, t) {
      const n = x(arguments);
      return z.sendRequest({
        command: 'evaluateOnInspectedPage',
        expression: e,
        evaluateOptions: 'object' == typeof t ? t : void 0
      }, n && function (e) {
        const { isError: t, isException: s, value: i } = e;
        t || s ? n && n(void 0, e) : n && n(i)
      }), null
    }, getResources: function (e) {
      function t(e) {
        return new H(e)
      }

      z.sendRequest({ command: 'getPageResources' }, e && function (n) {
        e && e(n.filter(B).map(t))
      })
    }
  }, F.prototype = {
    get url() {
      return this._url
    }, get type() {
      return this._type
    }, getContent: function (e) {
      z.sendRequest({ command: 'getResourceContent', url: this._url }, e && function (t) {
        const { content: n, encoding: s } = t;
        e && e(n, s)
      })
    }, setContent: function (e, t, n) {
      z.sendRequest({ command: 'setResourceContent', url: this._url, content: e, commit: t }, n)
    }
  };
  let V = [], G = null;

  function K() {
    G = null, z.sendRequest({ command: '_forwardKeyboardEvent', entries: V }), V = []
  }

  function $(e) {
    this._callbacks = {}, this._handlers = {}, this._lastRequestId = 0, this._lastObjectId = 0, this.registerHandler('callback', this._onCallback.bind(this));
    const t = new MessageChannel;
    this._port = t.port1, this._port.addEventListener('message', this._onMessage.bind(this), !1), this._port.start(), e.postMessage('registerExtension', '*', [t.port2])
  }

  document.addEventListener('keydown', (function (e) {
    const t = document.activeElement;
    if (t) {
      if (('INPUT' === t.nodeName || 'TEXTAREA' === t.nodeName || t.isContentEditable) && !(e.ctrlKey || e.altKey || e.metaKey)) return
    }
    let n = 0;
    e.shiftKey && (n |= 1), e.ctrlKey && (n |= 2), e.altKey && (n |= 4), e.metaKey && (n |= 8);
    const s = 255 & e.keyCode | n << 8;
    if (!a.has(s)) return;
    e.preventDefault();
    const i = {
      eventType: e.type,
      ctrlKey: e.ctrlKey,
      altKey: e.altKey,
      metaKey: e.metaKey,
      shiftKey: e.shiftKey,
      keyIdentifier: e.keyIdentifier,
      key: e.key,
      code: e.code,
      location: e.location,
      keyCode: e.keyCode
    };
    V.push(i), G || (G = window.setTimeout(K, 0))
  }), !1), $.prototype = {
    sendRequest: function (e, t, n) {
      'function' == typeof t && (e.requestId = this._registerCallback(t)), this._port.postMessage(e, n)
    }, hasHandler: function (e) {
      return Boolean(this._handlers[e])
    }, registerHandler: function (e, t) {
      this._handlers[e] = t
    }, unregisterHandler: function (e) {
      delete this._handlers[e]
    }, nextObjectId: function () {
      return r.toString() + '_' + ++this._lastObjectId
    }, _registerCallback: function (e) {
      const t = ++this._lastRequestId;
      return this._callbacks[t] = e, t
    }, _onCallback: function (e) {
      if (e.requestId in this._callbacks) {
        const t = this._callbacks[e.requestId];
        delete this._callbacks[e.requestId], t(e.result)
      }
    }, _onMessage: function (e) {
      const t = e.data, n = this._handlers[t.command];
      n && n.call(this, t)
    }
  };
  const z = new $(o || window.parent), X = new function () {
    this.inspectedWindow = new W, this.panels = new m, this.network = new h, this.languageServices = new v, this.recorder = new _, this.performance = new I, y(this, 'webInspector', 'resources', 'network')
  };
  if (Object.defineProperty(c, 'devtools', {
    value: {},
    enumerable: !0
  }), c.devtools.inspectedWindow = {}, Object.defineProperty(c.devtools.inspectedWindow, 'tabId', {
    get: function () {
      return t
    }
  }), c.devtools.inspectedWindow.__proto__ = X.inspectedWindow, c.devtools.network = X.network, c.devtools.panels = X.panels, c.devtools.panels.themeName = n, c.devtools.languageServices = X.languageServices, c.devtools.recorder = X.recorder, c.devtools.performance = X.performance, !1 !== e.exposeExperimentalAPIs) {
    c.experimental = c.experimental || {}, c.experimental.devtools = c.experimental.devtools || {};
    const e = Object.getOwnPropertyNames(X);
    for (let t = 0; t < e.length; ++t) {
      const n = Object.getOwnPropertyDescriptor(X, e[t]);
      n && Object.defineProperty(c.experimental.devtools, e[t], n)
    }
    c.experimental.devtools.inspectedWindow = c.devtools.inspectedWindow
  }
  e.exposeWebInspectorNamespace && (window.webInspector = X), i(z, X)
}, self.buildExtensionAPIInjectedScript = function (e, t, n, s, i) {
  const r = [e, t || null, n, s].map((e => JSON.stringify(e))).join(',');
  return i || (i = () => {
  }), '(function(injectedScriptId){ (' + self.injectedExtensionAPI.toString() + ')(' + r + ',' + i + ', injectedScriptId);})'
};
var p = Object.freeze({ __proto__: null });

class m extends t.Widget.Widget {
  server;
  id;
  iframe;
  frameIndex;

  constructor(e, t, n, s) {
    super(), this.setHideOnDetach(), this.element.className = 'vbox flex-auto', this.element.tabIndex = -1, this.server = e, this.id = t, this.iframe = document.createElement('iframe'), this.iframe.addEventListener('load', this.onLoad.bind(this), !1), this.iframe.src = n, this.iframe.className = s, this.setDefaultFocusedElement(this.element), this.element.appendChild(this.iframe)
  }

  wasShown() {
    super.wasShown(), 'number' == typeof this.frameIndex && this.server.notifyViewShown(this.id, this.frameIndex)
  }

  willHide() {
    'number' == typeof this.frameIndex && this.server.notifyViewHidden(this.id)
  }

  onLoad() {
    const e = window.frames;
    this.frameIndex = Array.prototype.indexOf.call(e, this.iframe.contentWindow), this.isShowing() && this.server.notifyViewShown(this.id, this.frameIndex)
  }
}

class g extends t.Widget.VBox {
  server;
  id;

  constructor(e, t) {
    super(), this.server = e, this.id = t
  }

  wasShown() {
    this.server.notifyViewShown(this.id)
  }

  willHide() {
    this.server.notifyViewHidden(this.id)
  }
}

var f = Object.freeze({ __proto__: null, ExtensionView: m, ExtensionNotifierView: g });

class w extends t.Panel.Panel {
  server;
  id;
  panelToolbar;
  searchableViewInternal;

  constructor(e, n, s, i) {
    super(n), this.server = e, this.id = s, this.setHideOnDetach(), this.panelToolbar = new t.Toolbar.Toolbar('hidden', this.element), this.searchableViewInternal = new t.SearchableView.SearchableView(this, null), this.searchableViewInternal.show(this.element);
    new m(e, this.id, i, 'extension').show(this.searchableViewInternal.element)
  }

  addToolbarItem(e) {
    this.panelToolbar.element.classList.remove('hidden'), this.panelToolbar.appendToolbarItem(e)
  }

  onSearchCanceled() {
    this.server.notifySearchAction(this.id, 'cancelSearch'), this.searchableViewInternal.updateSearchMatchesCount(0)
  }

  searchableView() {
    return this.searchableViewInternal
  }

  performSearch(e, t, n) {
    const s = e.query;
    this.server.notifySearchAction(this.id, 'performSearch', s)
  }

  jumpToNextSearchResult() {
    this.server.notifySearchAction(this.id, 'nextSearchResult')
  }

  jumpToPreviousSearchResult() {
    this.server.notifySearchAction(this.id, 'previousSearchResult')
  }

  supportsCaseSensitiveSearch() {
    return !1
  }

  supportsRegexSearch() {
    return !1
  }
}

class b {
  id;
  toolbarButtonInternal;

  constructor(e, n, s, i, r) {
    this.id = n, this.toolbarButtonInternal = new t.Toolbar.ToolbarButton('', ''), this.toolbarButtonInternal.addEventListener('Click', e.notifyButtonClicked.bind(e, this.id)), this.update(s, i, r)
  }

  update(e, t, n) {
    'string' == typeof e && this.toolbarButtonInternal.setBackgroundImage(e), 'string' == typeof t && this.toolbarButtonInternal.setTitle(t), 'boolean' == typeof n && this.toolbarButtonInternal.setEnabled(!n)
  }

  toolbarButton() {
    return this.toolbarButtonInternal
  }
}

class R extends t.View.SimpleView {
  panelNameInternal;
  server;
  idInternal;
  extensionView;
  objectPropertiesView;

  constructor(e, t, n, s) {
    super(n), this.element.classList.add('fill'), this.panelNameInternal = t, this.server = e, this.idInternal = s
  }

  id() {
    return this.idInternal
  }

  panelName() {
    return this.panelNameInternal
  }

  setObject(t, n, s) {
    this.createObjectPropertiesView(), this.setObjectInternal(e.RemoteObject.RemoteObject.fromLocalObject(t), n, s)
  }

  setExpression(e, t, n, s, i) {
    this.createObjectPropertiesView(), this.server.evaluate(e, !0, !1, n, s, this.onEvaluate.bind(this, t, i))
  }

  setPage(e) {
    this.objectPropertiesView && (this.objectPropertiesView.detach(), delete this.objectPropertiesView), this.extensionView && this.extensionView.detach(!0), this.extensionView = new m(this.server, this.idInternal, e, 'extension fill'), this.extensionView.show(this.element), this.element.style.height || this.setHeight('150px')
  }

  setHeight(e) {
    this.element.style.height = e
  }

  onEvaluate(e, t, n, s, i) {
    n ? t(n.toString()) : s ? this.setObjectInternal(s, e, t) : t()
  }

  createObjectPropertiesView() {
    this.objectPropertiesView || (this.extensionView && (this.extensionView.detach(!0), delete this.extensionView), this.objectPropertiesView = new g(this.server, this.idInternal), this.objectPropertiesView.show(this.element))
  }

  setObjectInternal(e, n, s) {
    const i = this.objectPropertiesView;
    i ? (i.element.removeChildren(), t.UIUtils.Renderer.render(e, { title: n, editable: !1 }).then((e => {
      if (!e) return void s();
      const t = e.tree && e.tree.firstChild();
      t && t.expand(), i.element.appendChild(e.node), s()
    }))) : s('operation cancelled')
  }
}

var E = Object.freeze({ __proto__: null, ExtensionPanel: w, ExtensionButton: b, ExtensionSidebarPane: R });

function y(e) {
  switch (e) {
    case'http':
      return '80';
    case'https':
      return '443';
    case'ftp':
      return '25'
  }
}

class x {
  pattern;

  static parse(e) {
    if ('<all_urls>' === e) return new x({ matchesAll: !0 });
    const t = function (e) {
      const t = e.indexOf('://');
      if (t < 0) return;
      const n = e.substr(0, t).toLowerCase();
      return ['*', 'http', 'https', 'ftp', 'chrome', 'chrome-extension'].includes(n) ? {
        scheme: n,
        hostPattern: e.substr(t + 3)
      } : void 0
    }(e);
    if (!t) return;
    const { scheme: n, hostPattern: s } = t, i = function (e, t) {
      const n = e.indexOf('/');
      if (n >= 0) {
        const t = e.substr(n);
        if ('/*' !== t && '/' !== t) return;
        e = e.substr(0, n)
      }
      if (e.endsWith(':*') && (e = e.substr(0, e.length - 2)), e.endsWith(':')) return;
      let s;
      try {
        s = new URL(e.startsWith('*.') ? `http://${e.substr(2)}` : `http://${e}`)
      } catch {
        return
      }
      if ('/' !== s.pathname) return;
      if (s.hostname.endsWith('.') && (s.hostname = s.hostname.substr(0, s.hostname.length - 1)), '%2A' !== s.hostname && s.hostname.includes('%2A')) return;
      const i = y('http');
      if (!i) return;
      const r = e.endsWith(`:${i}`) ? i : '' === s.port ? '*' : s.port;
      if ('*' !== r && !['http', 'https', 'ftp'].includes(t)) return;
      return { host: '%2A' !== s.hostname ? e.startsWith('*.') ? `*.${s.hostname}` : s.hostname : '*', port: r }
    }(s, n);
    if (!i) return;
    const { host: r, port: o } = i;
    return new x({ scheme: n, host: r, port: o, matchesAll: !1 })
  }

  constructor(e) {
    this.pattern = e
  }

  get scheme() {
    return this.pattern.matchesAll ? '*' : this.pattern.scheme
  }

  get host() {
    return this.pattern.matchesAll ? '*' : this.pattern.host
  }

  get port() {
    return this.pattern.matchesAll ? '*' : this.pattern.port
  }

  matchesAllUrls() {
    return this.pattern.matchesAll
  }

  matchesUrl(e) {
    let t;
    try {
      t = new URL(e)
    } catch {
      return !1
    }
    if (this.matchesAllUrls()) return !0;
    const n = t.protocol.substr(0, t.protocol.length - 1), s = t.port || y(n);
    return this.matchesScheme(n) && this.matchesHost(t.hostname) && (!s || this.matchesPort(s))
  }

  matchesScheme(e) {
    return !!this.pattern.matchesAll || ('*' === this.pattern.scheme ? 'http' === e || 'https' === e : this.pattern.scheme === e)
  }

  matchesHost(e) {
    if (this.pattern.matchesAll) return !0;
    if ('*' === this.pattern.host) return !0;
    let t = new URL(`http://${e}`).hostname;
    return t.endsWith('.') && (t = t.substr(0, t.length - 1)), this.pattern.host.startsWith('*.') ? t === this.pattern.host.substr(2) || t.endsWith(this.pattern.host.substr(1)) : this.pattern.host === t
  }

  matchesPort(e) {
    return !!this.pattern.matchesAll || ('*' === this.pattern.port || this.pattern.port === e)
  }
}

var v = Object.freeze({ __proto__: null, HostUrlPattern: x });

class _ {
  port;
  nextRequestId = 0;
  pendingRequests;

  constructor(e) {
    this.port = e, this.port.onmessage = this.onResponse.bind(this), this.pendingRequests = new Map
  }

  sendRequest(e, t) {
    return new Promise(((n, s) => {
      const i = this.nextRequestId++;
      this.pendingRequests.set(i, { resolve: n, reject: s }), this.port.postMessage({
        requestId: i,
        method: e,
        parameters: t
      })
    }))
  }

  disconnect() {
    for (const { reject: e } of this.pendingRequests.values()) e(new Error('Extension endpoint disconnected'));
    this.pendingRequests.clear(), this.port.close()
  }

  onResponse({ data: e }) {
    if ('event' in e) return void this.handleEvent(e);
    const { requestId: t, result: n, error: s } = e, i = this.pendingRequests.get(t);
    i ? (this.pendingRequests.delete(t), s ? i.reject(new Error(s.message)) : i.resolve(n)) : console.error(`No pending request ${t}`)
  }

  handleEvent(e) {
    throw new Error('handleEvent is not implemented')
  }
}

class I extends _ {
  plugin;

  constructor(e, t) {
    super(t), this.plugin = e
  }

  handleEvent({ event: e }) {
    switch (e) {
      case'unregisteredLanguageExtensionPlugin': {
        this.disconnect();
        const { pluginManager: e } = l.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance();
        e.removePlugin(this.plugin);
        break
      }
    }
  }
}

class S {
  supportedScriptTypes;
  endpoint;
  extensionOrigin;
  name;

  constructor(e, t, n, s) {
    this.name = t, this.extensionOrigin = e, this.supportedScriptTypes = n, this.endpoint = new I(this, s)
  }

  handleScript(e) {
    const t = e.scriptLanguage();
    return null !== t && null !== e.debugSymbols && t === this.supportedScriptTypes.language && this.supportedScriptTypes.symbol_types.includes(e.debugSymbols.type)
  }

  createPageResourceLoadInitiator() {
    return { target: null, frameId: null, extensionId: this.extensionOrigin, initiatorUrl: this.extensionOrigin }
  }

  addRawModule(e, t, n) {
    return this.endpoint.sendRequest('addRawModule', { rawModuleId: e, symbolsURL: t, rawModule: n })
  }

  removeRawModule(e) {
    return this.endpoint.sendRequest('removeRawModule', { rawModuleId: e })
  }

  sourceLocationToRawLocation(e) {
    return this.endpoint.sendRequest('sourceLocationToRawLocation', { sourceLocation: e })
  }

  rawLocationToSourceLocation(e) {
    return this.endpoint.sendRequest('rawLocationToSourceLocation', { rawLocation: e })
  }

  getScopeInfo(e) {
    return this.endpoint.sendRequest('getScopeInfo', { type: e })
  }

  listVariablesInScope(e) {
    return this.endpoint.sendRequest('listVariablesInScope', { rawLocation: e })
  }

  getFunctionInfo(e) {
    return this.endpoint.sendRequest('getFunctionInfo', { rawLocation: e })
  }

  getInlinedFunctionRanges(e) {
    return this.endpoint.sendRequest('getInlinedFunctionRanges', { rawLocation: e })
  }

  getInlinedCalleesRanges(e) {
    return this.endpoint.sendRequest('getInlinedCalleesRanges', { rawLocation: e })
  }

  async getMappedLines(e, t) {
    return this.endpoint.sendRequest('getMappedLines', { rawModuleId: e, sourceFileURL: t })
  }

  async evaluate(e, t, n) {
    return this.endpoint.sendRequest('formatValue', { expression: e, context: t, stopId: n })
  }

  getProperties(e) {
    return this.endpoint.sendRequest('getProperties', { objectId: e })
  }

  releaseObject(e) {
    return this.endpoint.sendRequest('releaseObject', { objectId: e })
  }
}

let O = null;

class A extends n.ObjectWrapper.ObjectWrapper {
  #e = new Set;
  #t = new Map;

  static instance() {
    return O || (O = new A), O
  }

  addPlugin(e) {
    this.#e.add(e), this.dispatchEventToListeners('pluginAdded', e)
  }

  removePlugin(e) {
    this.#e.delete(e), this.dispatchEventToListeners('pluginRemoved', e)
  }

  plugins() {
    return Array.from(this.#e.values())
  }

  registerView(e) {
    this.#t.set(e.id, e), this.dispatchEventToListeners('viewRegistered', e)
  }

  views() {
    return Array.from(this.#t.values())
  }

  getViewDescriptor(e) {
    return this.#t.get(e)
  }

  showView(e) {
    const t = this.#t.get(e);
    if (!t) throw new Error(`View with id ${e} is not found.`);
    this.dispatchEventToListeners('showViewRequested', t)
  }
}

var P = Object.freeze({ __proto__: null, RecorderPluginManager: A });

class T extends _ {
  name;
  mediaType;
  capabilities;

  constructor(e, t, n, s) {
    super(t), this.name = e, this.mediaType = s, this.capabilities = n
  }

  getName() {
    return this.name
  }

  getCapabilities() {
    return this.capabilities
  }

  getMediaType() {
    return this.mediaType
  }

  handleEvent({ event: e }) {
    if ('unregisteredRecorderExtensionPlugin' !== e) throw new Error(`Unrecognized Recorder extension endpoint event: ${e}`);
    this.disconnect(), A.instance().removePlugin(this)
  }

  stringify(e) {
    return this.sendRequest('stringify', { recording: e })
  }

  stringifyStep(e) {
    return this.sendRequest('stringifyStep', { step: e })
  }

  replay(e) {
    return this.sendRequest('replay', { recording: e })
  }
}

var L = Object.freeze({ __proto__: null, RecorderExtensionEndpoint: T });
const C = new WeakMap, H = [].map((e => new URL(e).origin));
let k;

class q {
  runtimeAllowedHosts;
  runtimeBlockedHosts;

  static create(e) {
    const t = [], n = [];
    if (e) {
      for (const n of e.runtimeAllowedHosts) {
        const e = x.parse(n);
        if (!e) return null;
        t.push(e)
      }
      for (const t of e.runtimeBlockedHosts) {
        const e = x.parse(t);
        if (!e) return null;
        n.push(e)
      }
    }
    return new q(t, n)
  }

  constructor(e, t) {
    this.runtimeAllowedHosts = e, this.runtimeBlockedHosts = t
  }

  isAllowedOnURL(e) {
    return e ? !(this.runtimeBlockedHosts.some((t => t.matchesUrl(e))) && !this.runtimeAllowedHosts.some((t => t.matchesUrl(e)))) : 0 === this.runtimeBlockedHosts.length
  }
}

class M {
  name;
  hostsPolicy;
  allowFileAccess;

  constructor(e, t, n) {
    this.name = e, this.hostsPolicy = t, this.allowFileAccess = n
  }

  isAllowedOnTarget(t) {
    if (t || (t = e.TargetManager.TargetManager.instance().primaryPageTarget()?.inspectedURL()), !t) return !1;
    if (!j.canInspectURL(t)) return !1;
    if (!this.hostsPolicy.isAllowedOnURL(t)) return !1;
    if (!this.allowFileAccess) {
      let e;
      try {
        e = new URL(t)
      } catch (e) {
        return !1
      }
      return 'file:' !== e.protocol
    }
    return !0
  }
}

class N {
  filter;

  constructor(e) {
    this.filter = e
  }
}

class j extends n.ObjectWrapper.ObjectWrapper {
  clientObjects;
  handlers;
  subscribers;
  subscriptionStartHandlers;
  subscriptionStopHandlers;
  extraHeaders;
  requests;
  requestIds;
  lastRequestId;
  registeredExtensions;
  status;
  sidebarPanesInternal;
  extensionsEnabled;
  inspectedTabId;
  extensionAPITestHook;
  themeChangeHandlers = new Map;
  #n = [];

  constructor() {
    super(), this.clientObjects = new Map, this.handlers = new Map, this.subscribers = new Map, this.subscriptionStartHandlers = new Map, this.subscriptionStopHandlers = new Map, this.extraHeaders = new Map, this.requests = new Map, this.requestIds = new Map, this.lastRequestId = 0, this.registeredExtensions = new Map, this.status = new U, this.sidebarPanesInternal = [], this.extensionsEnabled = !0, this.registerHandler('addRequestHeaders', this.onAddRequestHeaders.bind(this)), this.registerHandler('applyStyleSheet', this.onApplyStyleSheet.bind(this)), this.registerHandler('createPanel', this.onCreatePanel.bind(this)), this.registerHandler('createSidebarPane', this.onCreateSidebarPane.bind(this)), this.registerHandler('createToolbarButton', this.onCreateToolbarButton.bind(this)), this.registerHandler('evaluateOnInspectedPage', this.onEvaluateOnInspectedPage.bind(this)), this.registerHandler('_forwardKeyboardEvent', this.onForwardKeyboardEvent.bind(this)), this.registerHandler('getHAR', this.onGetHAR.bind(this)), this.registerHandler('getPageResources', this.onGetPageResources.bind(this)), this.registerHandler('getRequestContent', this.onGetRequestContent.bind(this)), this.registerHandler('getResourceContent', this.onGetResourceContent.bind(this)), this.registerHandler('Reload', this.onReload.bind(this)), this.registerHandler('setOpenResourceHandler', this.onSetOpenResourceHandler.bind(this)), this.registerHandler('setThemeChangeHandler', this.onSetThemeChangeHandler.bind(this)), this.registerHandler('setResourceContent', this.onSetResourceContent.bind(this)), this.registerHandler('setSidebarHeight', this.onSetSidebarHeight.bind(this)), this.registerHandler('setSidebarContent', this.onSetSidebarContent.bind(this)), this.registerHandler('setSidebarPage', this.onSetSidebarPage.bind(this)), this.registerHandler('showPanel', this.onShowPanel.bind(this)), this.registerHandler('subscribe', this.onSubscribe.bind(this)), this.registerHandler('openResource', this.onOpenResource.bind(this)), this.registerHandler('unsubscribe', this.onUnsubscribe.bind(this)), this.registerHandler('updateButton', this.onUpdateButton.bind(this)), this.registerHandler('registerLanguageExtensionPlugin', this.registerLanguageExtensionEndpoint.bind(this)), this.registerHandler('getWasmLinearMemory', this.onGetWasmLinearMemory.bind(this)), this.registerHandler('getWasmGlobal', this.onGetWasmGlobal.bind(this)), this.registerHandler('getWasmLocal', this.onGetWasmLocal.bind(this)), this.registerHandler('getWasmOp', this.onGetWasmOp.bind(this)), this.registerHandler('registerRecorderExtensionPlugin', this.registerRecorderExtensionEndpoint.bind(this)), this.registerHandler('reportResourceLoad', this.onReportResourceLoad.bind(this)), this.registerHandler('createRecorderView', this.onCreateRecorderView.bind(this)), this.registerHandler('showRecorderView', this.onShowRecorderView.bind(this)), this.registerHandler('showNetworkPanel', this.onShowNetworkPanel.bind(this)), window.addEventListener('message', this.onWindowMessage, !1);
    const e = window.DevToolsAPI && window.DevToolsAPI.getInspectedTabId && window.DevToolsAPI.getInspectedTabId();
    e && this.setInspectedTabId({ data: e }), s.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(s.InspectorFrontendHostAPI.Events.SetInspectedTabId, this.setInspectedTabId, this), this.initExtensions(), d.ThemeSupport.instance().addEventListener(d.ThemeChangeEvent.eventName, this.#s)
  }

  get isEnabledForTest() {
    return this.extensionsEnabled
  }

  dispose() {
    d.ThemeSupport.instance().removeEventListener(d.ThemeChangeEvent.eventName, this.#s), e.TargetManager.TargetManager.instance().removeEventListener('InspectedURLChanged', this.inspectedURLChanged, this), s.InspectorFrontendHost.InspectorFrontendHostInstance.events.removeEventListener(s.InspectorFrontendHostAPI.Events.SetInspectedTabId, this.setInspectedTabId, this), window.removeEventListener('message', this.onWindowMessage, !1)
  }

  #s = () => {
    const e = d.ThemeSupport.instance().themeName();
    for (const t of this.themeChangeHandlers.values()) t.postMessage({ command: 'host-theme-change', themeName: e })
  };

  static instance(e = { forceNew: null }) {
    const { forceNew: t } = e;
    return k && !t || (k?.dispose(), k = new j), k
  }

  initializeExtensions() {
    null !== this.inspectedTabId && s.InspectorFrontendHost.InspectorFrontendHostInstance.setAddExtensionCallback(this.addExtension.bind(this))
  }

  hasExtensions() {
    return Boolean(this.registeredExtensions.size)
  }

  notifySearchAction(e, t, n) {
    this.postNotification('panel-search-' + e, t, n)
  }

  notifyViewShown(e, t) {
    this.postNotification('view-shown-' + e, t)
  }

  notifyViewHidden(e) {
    this.postNotification('view-hidden,' + e)
  }

  notifyButtonClicked(e) {
    this.postNotification('button-clicked-' + e)
  }

  profilingStarted() {
    this.postNotification('profiling-started-')
  }

  profilingStopped() {
    this.postNotification('profiling-stopped-')
  }

  registerLanguageExtensionEndpoint(e, t) {
    if ('registerLanguageExtensionPlugin' !== e.command) return this.status.E_BADARG('command', 'expected registerLanguageExtensionPlugin');
    const { pluginManager: n } = l.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance(), {
        pluginName: s,
        port: i,
        supportedScriptTypes: { language: r, symbol_types: o }
      } = e, a = Array.isArray(o) && o.every((e => 'string' == typeof e)) ? o : [], c = this.getExtensionOrigin(t),
      d = new S(c, s, { language: r, symbol_types: a }, i);
    return n.addPlugin(d), this.status.OK()
  }

  async loadWasmValue(e, t, n, s) {
    const { pluginManager: i } = l.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance(),
      r = i.callFrameForStopId(s);
    if (!r) return this.status.E_BADARG('stopId', 'Unknown stop id');
    const o = await r.debuggerModel.agent.invoke_evaluateOnCallFrame({
      callFrameId: r.id,
      expression: n,
      silent: !0,
      returnByValue: !e,
      generatePreview: e,
      throwOnSideEffect: !0
    });
    return o.exceptionDetails || o.getError() ? this.status.E_FAILED('Failed') : t(o.result)
  }

  async onGetWasmLinearMemory(e) {
    return 'getWasmLinearMemory' !== e.command ? this.status.E_BADARG('command', 'expected getWasmLinearMemory') : await this.loadWasmValue(!1, (e => e.value), `[].slice.call(new Uint8Array(memories[0].buffer, ${Number(e.offset)}, ${Number(e.length)}))`, e.stopId)
  }

  convertWasmValue(e, t) {
    return n => {
      if ('undefined' === n.type) return;
      if ('object' !== n.type || 'wasmvalue' !== n.subtype) return this.status.E_FAILED('Bad object type');
      const s = n?.description, i = n.preview?.properties?.find((e => 'value' === e.name))?.value ?? '';
      switch (s) {
        case'i32':
        case'f32':
        case'f64':
          return { type: s, value: Number(i) };
        case'i64':
          return { type: s, value: BigInt(i) };
        case'v128':
          return { type: s, value: i };
        default:
          return { type: 'reftype', valueClass: e, index: t }
      }
    }
  }

  async onGetWasmGlobal(e) {
    if ('getWasmGlobal' !== e.command) return this.status.E_BADARG('command', 'expected getWasmGlobal');
    const t = Number(e.global);
    return await this.loadWasmValue(!0, this.convertWasmValue('global', t), `globals[${t}]`, e.stopId) ?? this.status.E_BADARG('global', `No global with index ${t}`)
  }

  async onGetWasmLocal(e) {
    if ('getWasmLocal' !== e.command) return this.status.E_BADARG('command', 'expected getWasmLocal');
    const t = Number(e.local);
    return await this.loadWasmValue(!0, this.convertWasmValue('local', t), `locals[${t}]`, e.stopId) ?? this.status.E_BADARG('local', `No local with index ${t}`)
  }

  async onGetWasmOp(e) {
    if ('getWasmOp' !== e.command) return this.status.E_BADARG('command', 'expected getWasmOp');
    const t = Number(e.op);
    return await this.loadWasmValue(!0, this.convertWasmValue('operand', t), `stack[${t}]`, e.stopId) ?? this.status.E_BADARG('op', `No operand with index ${t}`)
  }

  registerRecorderExtensionEndpoint(e, t) {
    if ('registerRecorderExtensionPlugin' !== e.command) return this.status.E_BADARG('command', 'expected registerRecorderExtensionPlugin');
    const { pluginName: n, mediaType: s, port: i, capabilities: r } = e;
    return A.instance().addPlugin(new T(n, i, r, s)), this.status.OK()
  }

  onReportResourceLoad(t) {
    if ('reportResourceLoad' !== t.command) return this.status.E_BADARG('command', 'expected reportResourceLoad');
    const { resourceUrl: n, extensionId: s, status: i } = t, r = {
      url: n,
      initiator: { target: null, frameId: null, initiatorUrl: s, extensionId: s },
      errorMessage: i.errorMessage,
      success: i.success ?? null,
      size: i.size ?? null
    };
    return e.PageResourceLoader.PageResourceLoader.instance().resourceLoadedThroughExtension(r), this.status.OK()
  }

  onShowRecorderView(e) {
    if ('showRecorderView' !== e.command) return this.status.E_BADARG('command', 'expected showRecorderView');
    A.instance().showView(e.id)
  }

  onShowNetworkPanel(e) {
    return 'showNetworkPanel' !== e.command ? this.status.E_BADARG('command', 'expected showNetworkPanel') : (n.Revealer.reveal(new N(e.filter)), this.status.OK())
  }

  onCreateRecorderView(e, t) {
    if ('createRecorderView' !== e.command) return this.status.E_BADARG('command', 'expected createRecorderView');
    const n = e.id;
    if (this.clientObjects.has(n)) return this.status.E_EXISTS(n);
    const s = j.expandResourcePath(this.getExtensionOrigin(t), e.pagePath);
    if (void 0 === s) return this.status.E_BADARG('pagePath', 'Resources paths cannot point to non-extension resources');
    return A.instance().registerView({
      id: n,
      pagePath: s,
      title: e.title,
      onShown: () => this.notifyViewShown(n),
      onHidden: () => this.notifyViewHidden(n)
    }), this.status.OK()
  }

  inspectedURLChanged(t) {
    if (!j.canInspectURL(t.data.inspectedURL())) return void this.disableExtensions();
    if (t.data !== e.TargetManager.TargetManager.instance().primaryPageTarget()) return;
    this.requests = new Map, this.enableExtensions();
    const n = t.data.inspectedURL();
    this.postNotification('inspected-url-changed', n);
    this.#n.splice(0).forEach((e => this.addExtension(e)))
  }

  hasSubscribers(e) {
    return this.subscribers.has(e)
  }

  isNotificationAllowedForExtension(e, t, ...n) {
    if ('network-request-finished' === t) {
      const t = n[1], s = C.get(e), i = s && this.registeredExtensions.get(s);
      return !!i?.isAllowedOnTarget(t.request.url)
    }
    return !0
  }

  postNotification(e, ...t) {
    if (!this.extensionsEnabled) return;
    const n = this.subscribers.get(e);
    if (!n) return;
    const s = { command: 'notify-' + e, arguments: Array.prototype.slice.call(arguments, 1) };
    for (const i of n) this.extensionEnabled(i) && this.isNotificationAllowedForExtension(i, e, ...t) && i.postMessage(s)
  }

  onSubscribe(e, t) {
    if ('subscribe' !== e.command) return this.status.E_BADARG('command', 'expected subscribe');
    const n = this.subscribers.get(e.type);
    if (n) n.add(t); else {
      this.subscribers.set(e.type, new Set([t]));
      const n = this.subscriptionStartHandlers.get(e.type);
      n && n()
    }
  }

  onUnsubscribe(e, t) {
    if ('unsubscribe' !== e.command) return this.status.E_BADARG('command', 'expected unsubscribe');
    const n = this.subscribers.get(e.type);
    if (n && (n.delete(t), !n.size)) {
      this.subscribers.delete(e.type);
      const t = this.subscriptionStopHandlers.get(e.type);
      t && t()
    }
  }

  onAddRequestHeaders(t) {
    if ('addRequestHeaders' !== t.command) return this.status.E_BADARG('command', 'expected addRequestHeaders');
    const n = t.extensionId;
    if ('string' != typeof n) return this.status.E_BADARGTYPE('extensionId', typeof n, 'string');
    let s = this.extraHeaders.get(n);
    s || (s = new Map, this.extraHeaders.set(n, s));
    for (const e in t.headers) s.set(e, t.headers[e]);
    const i = {};
    for (const e of this.extraHeaders.values()) for (const [t, n] of e) '__proto__' !== t && 'string' == typeof n && (i[t] = n);
    e.NetworkManager.MultitargetNetworkManager.instance().setExtraHTTPHeaders(i)
  }

  onApplyStyleSheet(e) {
    if ('applyStyleSheet' !== e.command) return this.status.E_BADARG('command', 'expected applyStyleSheet');
    if (!o.Runtime.experiments.isEnabled('apply-custom-stylesheet')) return;
    const t = document.createElement('style');
    t.textContent = e.styleSheet, document.head.appendChild(t), d.ThemeSupport.instance().addCustomStylesheet(e.styleSheet);
    for (let e = document.body; e; e = e.traverseNextNode(document.body)) e instanceof ShadowRoot && d.ThemeSupport.instance().injectCustomStyleSheets(e)
  }

  getExtensionOrigin(e) {
    const t = C.get(e);
    if (!t) throw new Error('Received a message from an unregistered extension');
    return t
  }

  onCreatePanel(e, n) {
    if ('createPanel' !== e.command) return this.status.E_BADARG('command', 'expected createPanel');
    const s = e.id;
    if (this.clientObjects.has(s) || t.InspectorView.InspectorView.instance().hasPanel(s)) return this.status.E_EXISTS(s);
    const r = j.expandResourcePath(this.getExtensionOrigin(n), e.page);
    if (void 0 === r) return this.status.E_BADARG('page', 'Resources paths cannot point to non-extension resources');
    let o = this.getExtensionOrigin(n) + e.title;
    o = o.replace(/\s|:\d+/g, '');
    const a = new D(o, i.i18n.lockedString(e.title), new w(this, o, s, r));
    return this.clientObjects.set(s, a), t.InspectorView.InspectorView.instance().addPanel(a), this.status.OK()
  }

  onShowPanel(e) {
    if ('showPanel' !== e.command) return this.status.E_BADARG('command', 'expected showPanel');
    let n = e.id;
    const s = this.clientObjects.get(e.id);
    s && s instanceof D && (n = s.viewId()), t.InspectorView.InspectorView.instance().showPanel(n)
  }

  onCreateToolbarButton(e, t) {
    if ('createToolbarButton' !== e.command) return this.status.E_BADARG('command', 'expected createToolbarButton');
    const n = this.clientObjects.get(e.panel);
    if (!(n && n instanceof D)) return this.status.E_NOTFOUND(e.panel);
    const s = j.expandResourcePath(this.getExtensionOrigin(t), e.icon);
    if (void 0 === s) return this.status.E_BADARG('icon', 'Resources paths cannot point to non-extension resources');
    const i = new b(this, e.id, s, e.tooltip, e.disabled);
    return this.clientObjects.set(e.id, i), n.widget().then((function (e) {
      e.addToolbarItem(i.toolbarButton())
    })), this.status.OK()
  }

  onUpdateButton(e, t) {
    if ('updateButton' !== e.command) return this.status.E_BADARG('command', 'expected updateButton');
    const n = this.clientObjects.get(e.id);
    if (!(n && n instanceof b)) return this.status.E_NOTFOUND(e.id);
    const s = e.icon && j.expandResourcePath(this.getExtensionOrigin(t), e.icon);
    return e.icon && void 0 === s ? this.status.E_BADARG('icon', 'Resources paths cannot point to non-extension resources') : (n.update(s, e.tooltip, e.disabled), this.status.OK())
  }

  onCreateSidebarPane(e) {
    if ('createSidebarPane' !== e.command) return this.status.E_BADARG('command', 'expected createSidebarPane');
    const t = e.id, n = new R(this, e.panel, i.i18n.lockedString(e.title), t);
    return this.sidebarPanesInternal.push(n), this.clientObjects.set(t, n), this.dispatchEventToListeners('SidebarPaneAdded', n), this.status.OK()
  }

  sidebarPanes() {
    return this.sidebarPanesInternal
  }

  onSetSidebarHeight(e) {
    if ('setSidebarHeight' !== e.command) return this.status.E_BADARG('command', 'expected setSidebarHeight');
    const t = this.clientObjects.get(e.id);
    return t && t instanceof R ? (t.setHeight(e.height), this.status.OK()) : this.status.E_NOTFOUND(e.id)
  }

  onSetSidebarContent(e, t) {
    if ('setSidebarContent' !== e.command) return this.status.E_BADARG('command', 'expected setSidebarContent');
    const { requestId: n, id: s, rootTitle: i, expression: r, evaluateOptions: o, evaluateOnPage: a } = e,
      c = this.clientObjects.get(s);
    if (!(c && c instanceof R)) return this.status.E_NOTFOUND(e.id);

    function d(e) {
      const s = e ? this.status.E_FAILED(e) : this.status.OK();
      this.dispatchCallback(n, t, s)
    }

    a ? c.setExpression(r, i, o, this.getExtensionOrigin(t), d.bind(this)) : c.setObject(e.expression, e.rootTitle, d.bind(this))
  }

  onSetSidebarPage(e, t) {
    if ('setSidebarPage' !== e.command) return this.status.E_BADARG('command', 'expected setSidebarPage');
    const n = this.clientObjects.get(e.id);
    if (!(n && n instanceof R)) return this.status.E_NOTFOUND(e.id);
    const s = j.expandResourcePath(this.getExtensionOrigin(t), e.page);
    if (void 0 === s) return this.status.E_BADARG('page', 'Resources paths cannot point to non-extension resources');
    n.setPage(s)
  }

  onOpenResource(e) {
    if ('openResource' !== e.command) return this.status.E_BADARG('command', 'expected openResource');
    const t = h.Workspace.WorkspaceImpl.instance().uiSourceCodeForURL(e.url);
    if (t) return n.Revealer.reveal(t.uiLocation(e.lineNumber, e.columnNumber)), this.status.OK();
    const s = l.ResourceUtils.resourceForURL(e.url);
    if (s) return n.Revealer.reveal(s), this.status.OK();
    const i = a.NetworkLog.NetworkLog.instance().requestForURL(e.url);
    return i ? (n.Revealer.reveal(i), this.status.OK()) : this.status.E_NOTFOUND(e.url)
  }

  onSetOpenResourceHandler(e, t) {
    if ('setOpenResourceHandler' !== e.command) return this.status.E_BADARG('command', 'expected setOpenResourceHandler');
    const n = this.registeredExtensions.get(this.getExtensionOrigin(t));
    if (!n) throw new Error('Received a message from an unregistered extension');
    const { name: s } = n;
    e.handlerPresent ? c.Linkifier.Linkifier.registerLinkHandler(s, this.handleOpenURL.bind(this, t)) : c.Linkifier.Linkifier.unregisterLinkHandler(s)
  }

  onSetThemeChangeHandler(e, t) {
    if ('setThemeChangeHandler' !== e.command) return this.status.E_BADARG('command', 'expected setThemeChangeHandler');
    const n = this.getExtensionOrigin(t);
    if (!this.registeredExtensions.get(n)) throw new Error('Received a message from an unregistered extension');
    e.handlerPresent ? this.themeChangeHandlers.set(n, t) : this.themeChangeHandlers.delete(n)
  }

  handleOpenURL(e, t, n) {
    e.postMessage({ command: 'open-resource', resource: this.makeResource(t), lineNumber: n + 1 })
  }

  extensionAllowedOnURL(e, t) {
    const n = C.get(t), s = n && this.registeredExtensions.get(n);
    return Boolean(s?.isAllowedOnTarget(e))
  }

  extensionAllowedOnTarget(e, t) {
    return this.extensionAllowedOnURL(e.inspectedURL(), t)
  }

  onReload(t, n) {
    if ('Reload' !== t.command) return this.status.E_BADARG('command', 'expected Reload');
    const s = t.options || {};
    let i;
    e.NetworkManager.MultitargetNetworkManager.instance().setUserAgentOverride('string' == typeof s.userAgent ? s.userAgent : '', null), s.injectedScript && (i = '(function(){' + s.injectedScript + '})()');
    const r = e.TargetManager.TargetManager.instance().primaryPageTarget();
    if (!r) return this.status.OK();
    const o = r.model(e.ResourceTreeModel.ResourceTreeModel);
    return this.extensionAllowedOnTarget(r, n) ? (o?.reloadPage(Boolean(s.ignoreCache), i), this.status.OK()) : this.status.E_FAILED('Permission denied')
  }

  onEvaluateOnInspectedPage(e, t) {
    if ('evaluateOnInspectedPage' !== e.command) return this.status.E_BADARG('command', 'expected evaluateOnInspectedPage');
    const { requestId: n, expression: s, evaluateOptions: i } = e;
    return this.evaluate(s, !0, !0, i, this.getExtensionOrigin(t), function (e, s, i) {
      let r;
      r = e || !s ? this.status.E_PROTOCOLERROR(e?.toString()) : i ? {
        isException: !0,
        value: s.description
      } : { value: s.value }, this.dispatchCallback(n, t, r)
    }.bind(this))
  }

  async onGetHAR(e, t) {
    if ('getHAR' !== e.command) return this.status.E_BADARG('command', 'expected getHAR');
    const n = a.NetworkLog.NetworkLog.instance().requests().filter((e => this.extensionAllowedOnURL(e.url(), t))),
      s = await u.Log.Log.build(n);
    for (let e = 0; e < s.entries.length; ++e) s.entries[e]._requestId = this.requestId(n[e]);
    return s
  }

  makeResource(e) {
    return { url: e.contentURL(), type: e.contentType().name() }
  }

  onGetPageResources(t, n) {
    const s = new Map;

    function i(e) {
      return s.has(e.contentURL()) || s.set(e.contentURL(), this.makeResource(e)), !1
    }

    let r = h.Workspace.WorkspaceImpl.instance().uiSourceCodesForProjectType(h.Workspace.projectTypes.Network);
    r = r.concat(h.Workspace.WorkspaceImpl.instance().uiSourceCodesForProjectType(h.Workspace.projectTypes.ContentScripts)), r.forEach(i.bind(this));
    for (const t of e.TargetManager.TargetManager.instance().models(e.ResourceTreeModel.ResourceTreeModel)) this.extensionAllowedOnTarget(t.target(), n) && t.forAllResources(i.bind(this));
    return [...s.values()]
  }

  async getResourceContent(e, t, n) {
    if (!this.extensionAllowedOnURL(e.contentURL(), n)) return void this.dispatchCallback(t.requestId, n, this.status.E_FAILED('Permission denied'));
    const { content: s, isEncoded: i } = await e.requestContent();
    this.dispatchCallback(t.requestId, n, { encoding: i ? 'base64' : '', content: s })
  }

  onGetRequestContent(e, t) {
    if ('getRequestContent' !== e.command) return this.status.E_BADARG('command', 'expected getRequestContent');
    const n = this.requestById(e.id);
    if (!n) return this.status.E_NOTFOUND(e.id);
    this.getResourceContent(n, e, t)
  }

  onGetResourceContent(e, t) {
    if ('getResourceContent' !== e.command) return this.status.E_BADARG('command', 'expected getResourceContent');
    const n = e.url,
      s = h.Workspace.WorkspaceImpl.instance().uiSourceCodeForURL(n) || l.ResourceUtils.resourceForURL(n);
    if (!s) return this.status.E_NOTFOUND(n);
    this.getResourceContent(s, e, t)
  }

  onSetResourceContent(t, n) {
    if ('setResourceContent' !== t.command) return this.status.E_BADARG('command', 'expected setResourceContent');
    const { url: s, requestId: i, content: r, commit: o } = t;
    if (!this.extensionAllowedOnURL(s, n)) return this.status.E_FAILED('Permission denied');
    const a = h.Workspace.WorkspaceImpl.instance().uiSourceCodeForURL(s);
    if (!a || !a.contentType().isDocumentOrScriptOrStyleSheet()) {
      return e.ResourceTreeModel.ResourceTreeModel.resourceForURL(s) ? this.status.E_NOTSUPPORTED('Resource is not editable') : this.status.E_NOTFOUND(s)
    }
    a.setWorkingCopy(r), o && a.commitWorkingCopy(), function (e) {
      const t = e ? this.status.E_FAILED(e) : this.status.OK();
      this.dispatchCallback(i, n, t)
    }.call(this, null)
  }

  requestId(e) {
    const t = this.requestIds.get(e);
    if (void 0 === t) {
      const t = ++this.lastRequestId;
      return this.requestIds.set(e, t), this.requests.set(t, e), t
    }
    return t
  }

  requestById(e) {
    return this.requests.get(e)
  }

  onForwardKeyboardEvent(e) {
    if ('_forwardKeyboardEvent' !== e.command) return this.status.E_BADARG('command', 'expected _forwardKeyboardEvent');
    e.entries.forEach((function (e) {
      const t = new window.KeyboardEvent(e.eventType, {
        key: e.key,
        code: e.code,
        keyCode: e.keyCode,
        location: e.location,
        ctrlKey: e.ctrlKey,
        altKey: e.altKey,
        shiftKey: e.shiftKey,
        metaKey: e.metaKey
      });
      t.__keyCode = function (e) {
        let t = e.keyCode;
        t || e.key === r.KeyboardUtilities.ESCAPE_KEY && (t = 27);
        return t || 0
      }(e), document.dispatchEvent(t)
    }))
  }

  dispatchCallback(e, t, n) {
    e && t.postMessage({ command: 'callback', requestId: e, result: n })
  }

  initExtensions() {
    this.registerAutosubscriptionHandler('resource-added', h.Workspace.WorkspaceImpl.instance(), h.Workspace.Events.UISourceCodeAdded, this.notifyResourceAdded), this.registerAutosubscriptionTargetManagerHandler('network-request-finished', e.NetworkManager.NetworkManager, e.NetworkManager.Events.RequestFinished, this.notifyRequestFinished), this.registerSubscriptionHandler('panel-objectSelected-elements', function () {
      t.Context.Context.instance().addFlavorChangeListener(e.DOMModel.DOMNode, this.notifyElementsSelectionChanged, this)
    }.bind(this), function () {
      t.Context.Context.instance().removeFlavorChangeListener(e.DOMModel.DOMNode, this.notifyElementsSelectionChanged, this)
    }.bind(this)), this.registerResourceContentCommittedHandler(this.notifyUISourceCodeContentCommitted), e.TargetManager.TargetManager.instance().addEventListener('InspectedURLChanged', this.inspectedURLChanged, this)
  }

  notifyResourceAdded(e) {
    const t = e.data;
    this.postNotification('resource-added', this.makeResource(t))
  }

  notifyUISourceCodeContentCommitted(e) {
    const { uiSourceCode: t, content: n } = e.data;
    this.postNotification('resource-content-committed', this.makeResource(t), n)
  }

  async notifyRequestFinished(e) {
    const t = e.data, n = await u.Log.Entry.build(t);
    this.postNotification('network-request-finished', this.requestId(t), n)
  }

  notifyElementsSelectionChanged() {
    this.postNotification('panel-objectSelected-elements')
  }

  sourceSelectionChanged(e, t) {
    this.postNotification('panel-objectSelected-sources', {
      startLine: t.startLine,
      startColumn: t.startColumn,
      endLine: t.endLine,
      endColumn: t.endColumn,
      url: e
    })
  }

  setInspectedTabId(e) {
    const t = this.inspectedTabId;
    this.inspectedTabId = e.data, null === t && this.initializeExtensions()
  }

  addExtensionFrame({ startPage: e, name: t }) {
    const n = document.createElement('iframe');
    n.src = e, n.dataset.devtoolsExtension = t, n.style.display = 'none', document.body.appendChild(n)
  }

  addExtension(n) {
    const i = n.startPage, r = e.TargetManager.TargetManager.instance().primaryPageTarget()?.inspectedURL() ?? '';
    if ('' === r) return void this.#n.push(n);
    if (j.canInspectURL(r) || this.disableExtensions(), !this.extensionsEnabled) return void this.#n.push(n);
    const o = q.create(n.hostsPolicy);
    if (o) {
      try {
        const e = new URL(i).origin, a = n.name || `Extension ${e}`, c = new M(a, o, Boolean(n.allowFileAccess));
        if (!c.isAllowedOnTarget(r)) return void this.#n.push(n);
        if (!this.registeredExtensions.get(e)) {
          const i = self.buildExtensionAPIInjectedScript(n, this.inspectedTabId, d.ThemeSupport.instance().themeName(), t.ShortcutRegistry.ShortcutRegistry.instance().globalShortcutKeys(), j.instance().extensionAPITestHook);
          s.InspectorFrontendHost.InspectorFrontendHostInstance.setInjectedScriptForOrigin(e, i), this.registeredExtensions.set(e, c)
        }
        this.addExtensionFrame(n)
      } catch (e) {
        return console.error('Failed to initialize extension ' + i + ':' + e), !1
      }
      return !0
    }
  }

  registerExtension(e, t) {
    this.registeredExtensions.has(e) ? (C.set(t, e), t.addEventListener('message', this.onmessage.bind(this), !1), t.start()) : e !== window.location.origin && console.error('Ignoring unauthorized client request from ' + e)
  }

  onWindowMessage = e => {
    'registerExtension' === e.data && this.registerExtension(e.origin, e.ports[0])
  };

  extensionEnabled(e) {
    if (!this.extensionsEnabled) return !1;
    const t = C.get(e);
    if (!t) return !1;
    const n = this.registeredExtensions.get(t);
    return !!n && n.isAllowedOnTarget()
  }

  async onmessage(e) {
    const t = e.data;
    let n;
    const s = e.currentTarget, i = this.handlers.get(t.command);
    n = i ? this.extensionEnabled(s) ? await i(t, e.target) : this.status.E_FAILED('Permission denied') : this.status.E_NOTSUPPORTED(t.command), n && t.requestId && this.dispatchCallback(t.requestId, e.target, n)
  }

  registerHandler(e, t) {
    console.assert(Boolean(e)), this.handlers.set(e, t)
  }

  registerSubscriptionHandler(e, t, n) {
    this.subscriptionStartHandlers.set(e, t), this.subscriptionStopHandlers.set(e, n)
  }

  registerAutosubscriptionHandler(e, t, n, s) {
    this.registerSubscriptionHandler(e, (() => t.addEventListener(n, s, this)), (() => t.removeEventListener(n, s, this)))
  }

  registerAutosubscriptionTargetManagerHandler(t, n, s, i) {
    this.registerSubscriptionHandler(t, (() => e.TargetManager.TargetManager.instance().addModelListener(n, s, i, this)), (() => e.TargetManager.TargetManager.instance().removeModelListener(n, s, i, this)))
  }

  registerResourceContentCommittedHandler(e) {
    this.registerSubscriptionHandler('resource-content-committed', function () {
      h.Workspace.WorkspaceImpl.instance().addEventListener(h.Workspace.Events.WorkingCopyCommittedByUser, e, this), h.Workspace.WorkspaceImpl.instance().setHasResourceContentTrackingExtensions(!0)
    }.bind(this), function () {
      h.Workspace.WorkspaceImpl.instance().setHasResourceContentTrackingExtensions(!1), h.Workspace.WorkspaceImpl.instance().removeEventListener(h.Workspace.Events.WorkingCopyCommittedByUser, e, this)
    }.bind(this))
  }

  static expandResourcePath(e, t) {
    const s = new URL(e).origin, i = new URL(n.ParsedURL.normalizePath(t), s);
    if (i.origin === s) return i.href
  }

  evaluate(t, n, s, i, r, o) {
    let a, c;
    if ((i = i || {}).frameURL) c = function (t) {
      let n = null;
      return e.ResourceTreeModel.ResourceTreeModel.frames().some((function (e) {
        return n = e.url === t ? e : null, n
      })), n
    }(i.frameURL); else {
      const t = e.TargetManager.TargetManager.instance().primaryPageTarget(),
        n = t && t.model(e.ResourceTreeModel.ResourceTreeModel);
      c = n && n.mainFrame
    }
    if (!c) return i.frameURL ? console.warn('evaluate: there is no frame with URL ' + i.frameURL) : console.warn('evaluate: the main frame is not yet available'), this.status.E_NOTFOUND(i.frameURL || '<top>');
    const d = this.registeredExtensions.get(r);
    if (!d?.isAllowedOnTarget(c.url)) return this.status.E_FAILED('Permission denied');
    let l;
    i.useContentScriptContext ? l = r : i.scriptExecutionContext && (l = i.scriptExecutionContext);
    const u = c.resourceTreeModel().target().model(e.RuntimeModel.RuntimeModel), h = u ? u.executionContexts() : [];
    if (l) {
      for (let e = 0; e < h.length; ++e) {
        const t = h[e];
        t.frameId !== c.id || t.origin !== l || t.isDefault || (a = t)
      }
      if (!a) return console.warn('The JavaScript context ' + l + ' was not found in the frame ' + c.url), this.status.E_NOTFOUND(l)
    } else {
      for (let e = 0; e < h.length; ++e) {
        const t = h[e];
        t.frameId === c.id && t.isDefault && (a = t)
      }
      if (!a) return this.status.E_FAILED(c.url + ' has no execution context')
    }
    if (!d?.isAllowedOnTarget(a.origin)) return this.status.E_FAILED('Permission denied');
    a.evaluate({
      expression: t,
      objectGroup: 'extension',
      includeCommandLineAPI: n,
      silent: !0,
      returnByValue: s,
      generatePreview: !1
    }, !1, !1).then((function (e) {
      if ('error' in e) return void o(e.error, null, !1);
      o(null, e.object || null, Boolean(e.exceptionDetails))
    }))
  }

  static canInspectURL(e) {
    let t;
    try {
      t = new URL(e)
    } catch (e) {
      return !1
    }
    return !!H.includes(t.origin) || 'chrome:' !== t.protocol && 'devtools:' !== t.protocol && 'chrome-untrusted:' !== t.protocol && 'chrome-error:' !== t.protocol && 'chrome-search:' !== t.protocol && (!(t.protocol.startsWith('http') && t.hostname.match(/^chrome\.google\.com\.?$/) && t.pathname.startsWith('/webstore')) && ((!t.protocol.startsWith('http') || !t.hostname.match(/^chromewebstore\.google\.com\.?$/)) && !(window.DevToolsAPI && window.DevToolsAPI.getOriginsForbiddenForExtensions && window.DevToolsAPI.getOriginsForbiddenForExtensions() || []).includes(t.origin)))
  }

  disableExtensions() {
    this.extensionsEnabled = !1
  }

  enableExtensions() {
    this.extensionsEnabled = !0
  }
}

class D extends t.View.SimpleView {
  name;
  panel;

  constructor(e, t, n) {
    super(t), this.name = e, this.panel = n
  }

  viewId() {
    return this.name
  }

  widget() {
    return Promise.resolve(this.panel)
  }
}

class U {
  OK;
  E_EXISTS;
  E_BADARG;
  E_BADARGTYPE;
  E_NOTFOUND;
  E_NOTSUPPORTED;
  E_PROTOCOLERROR;
  E_FAILED;

  constructor() {
    function e(e, t, ...n) {
      const s = { code: e, description: t, details: n };
      return 'OK' !== e && (s.isError = !0, console.error('Extension server error: ' + r.StringUtilities.sprintf(t, ...n))), s
    }

    this.OK = e.bind(null, 'OK', 'OK'), this.E_EXISTS = e.bind(null, 'E_EXISTS', 'Object already exists: %s'), this.E_BADARG = e.bind(null, 'E_BADARG', 'Invalid argument %s: %s'), this.E_BADARGTYPE = e.bind(null, 'E_BADARGTYPE', 'Invalid type for argument %s: got %s, expected %s'), this.E_NOTFOUND = e.bind(null, 'E_NOTFOUND', 'Object not found: %s'), this.E_NOTSUPPORTED = e.bind(null, 'E_NOTSUPPORTED', 'Object does not support requested operation: %s'), this.E_PROTOCOLERROR = e.bind(null, 'E_PROTOCOLERROR', 'Inspector protocol error: %s'), this.E_FAILED = e.bind(null, 'E_FAILED', 'Operation failed: %s')
  }
}

var B = Object.freeze({
  __proto__: null,
  HostsPolicy: q,
  RevealableNetworkRequestFilter: N,
  ExtensionServer: j,
  ExtensionStatus: U
});
export {
  p as ExtensionAPI,
  E as ExtensionPanel,
  B as ExtensionServer,
  f as ExtensionView,
  v as HostUrlPattern,
  L as RecorderExtensionEndpoint,
  P as RecorderPluginManager
};
