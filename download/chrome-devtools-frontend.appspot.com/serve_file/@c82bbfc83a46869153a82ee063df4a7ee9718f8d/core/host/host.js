import *as e from '../common/common.js';
import *as r from '../platform/platform.js';
import *as o from '../i18n/i18n.js';
import *as t from '../root/root.js';

var n;
!function (e) {
  e.AppendedToURL = 'appendedToURL', e.CanceledSaveURL = 'canceledSaveURL', e.ColorThemeChanged = 'colorThemeChanged', e.ContextMenuCleared = 'contextMenuCleared', e.ContextMenuItemSelected = 'contextMenuItemSelected', e.DeviceCountUpdated = 'deviceCountUpdated', e.DevicesDiscoveryConfigChanged = 'devicesDiscoveryConfigChanged', e.DevicesPortForwardingStatusChanged = 'devicesPortForwardingStatusChanged', e.DevicesUpdated = 'devicesUpdated', e.DispatchMessage = 'dispatchMessage', e.DispatchMessageChunk = 'dispatchMessageChunk', e.EnterInspectElementMode = 'enterInspectElementMode', e.EyeDropperPickedColor = 'eyeDropperPickedColor', e.FileSystemsLoaded = 'fileSystemsLoaded', e.FileSystemRemoved = 'fileSystemRemoved', e.FileSystemAdded = 'fileSystemAdded', e.FileSystemFilesChangedAddedRemoved = 'FileSystemFilesChangedAddedRemoved', e.IndexingTotalWorkCalculated = 'indexingTotalWorkCalculated', e.IndexingWorked = 'indexingWorked', e.IndexingDone = 'indexingDone', e.KeyEventUnhandled = 'keyEventUnhandled', e.ReloadInspectedPage = 'reloadInspectedPage', e.RevealSourceLine = 'revealSourceLine', e.SavedURL = 'savedURL', e.SearchCompleted = 'searchCompleted', e.SetInspectedTabId = 'setInspectedTabId', e.SetUseSoftMenu = 'setUseSoftMenu', e.ShowPanel = 'showPanel'
}(n || (n = {}));
const s = [[n.AppendedToURL, 'appendedToURL', ['url']], [n.CanceledSaveURL, 'canceledSaveURL', ['url']], [n.ColorThemeChanged, 'colorThemeChanged', []], [n.ContextMenuCleared, 'contextMenuCleared', []], [n.ContextMenuItemSelected, 'contextMenuItemSelected', ['id']], [n.DeviceCountUpdated, 'deviceCountUpdated', ['count']], [n.DevicesDiscoveryConfigChanged, 'devicesDiscoveryConfigChanged', ['config']], [n.DevicesPortForwardingStatusChanged, 'devicesPortForwardingStatusChanged', ['status']], [n.DevicesUpdated, 'devicesUpdated', ['devices']], [n.DispatchMessage, 'dispatchMessage', ['messageObject']], [n.DispatchMessageChunk, 'dispatchMessageChunk', ['messageChunk', 'messageSize']], [n.EnterInspectElementMode, 'enterInspectElementMode', []], [n.EyeDropperPickedColor, 'eyeDropperPickedColor', ['color']], [n.FileSystemsLoaded, 'fileSystemsLoaded', ['fileSystems']], [n.FileSystemRemoved, 'fileSystemRemoved', ['fileSystemPath']], [n.FileSystemAdded, 'fileSystemAdded', ['errorMessage', 'fileSystem']], [n.FileSystemFilesChangedAddedRemoved, 'fileSystemFilesChangedAddedRemoved', ['changed', 'added', 'removed']], [n.IndexingTotalWorkCalculated, 'indexingTotalWorkCalculated', ['requestId', 'fileSystemPath', 'totalWork']], [n.IndexingWorked, 'indexingWorked', ['requestId', 'fileSystemPath', 'worked']], [n.IndexingDone, 'indexingDone', ['requestId', 'fileSystemPath']], [n.KeyEventUnhandled, 'keyEventUnhandled', ['event']], [n.ReloadInspectedPage, 'reloadInspectedPage', ['hard']], [n.RevealSourceLine, 'revealSourceLine', ['url', 'lineNumber', 'columnNumber']], [n.SavedURL, 'savedURL', ['url', 'fileSystemPath']], [n.SearchCompleted, 'searchCompleted', ['requestId', 'fileSystemPath', 'files']], [n.SetInspectedTabId, 'setInspectedTabId', ['tabId']], [n.SetUseSoftMenu, 'setUseSoftMenu', ['useSoftMenu']], [n.ShowPanel, 'showPanel', ['panelName']]];
var i = Object.freeze({
  __proto__: null, get Events() {
    return n
  }, EventDescriptors: s
});
const a = {
  systemError: 'System error',
  connectionError: 'Connection error',
  certificateError: 'Certificate error',
  httpError: 'HTTP error',
  cacheError: 'Cache error',
  signedExchangeError: 'Signed Exchange error',
  ftpError: 'FTP error',
  certificateManagerError: 'Certificate manager error',
  dnsResolverError: 'DNS resolver error',
  unknownError: 'Unknown error',
  httpErrorStatusCodeSS: 'HTTP error: status code {PH1}, {PH2}',
  invalidUrl: 'Invalid URL',
  decodingDataUrlFailed: 'Decoding Data URL failed'
}, d = o.i18n.registerUIStrings('core/host/ResourceLoader.ts', a), c = o.i18n.getLocalizedString.bind(void 0, d);
let l = 0;
const u = {}, m = function (e) {
  return u[++l] = e, l
}, g = function (e) {
  u[e].close(), delete u[e]
}, p = function (e, r) {
  u[e].write(r)
};
let h = function (r, o, t, n) {
  const s = new e.StringOutputStream.StringOutputStream;
  C(r, o, s, (function (e, r, o) {
    t(e, r, s.data(), o)
  }), n)
};

function v(e, r, o) {
  if (void 0 === e || void 0 === o) return null;
  if (0 !== e) {
    if (function (e) {
      return e <= -300 && e > -400
    }(e)) return c(a.httpErrorStatusCodeSS, { PH1: String(r), PH2: o });
    const t = function (e) {
      return c(e > -100 ? a.systemError : e > -200 ? a.connectionError : e > -300 ? a.certificateError : e > -400 ? a.httpError : e > -500 ? a.cacheError : e > -600 ? a.signedExchangeError : e > -700 ? a.ftpError : e > -800 ? a.certificateManagerError : e > -900 ? a.dnsResolverError : a.unknownError)
    }(e);
    return `${t}: ${o}`
  }
  return null
}

const C = function (r, o, t, n, s) {
  const i = m(t);
  if (new e.ParsedURL.ParsedURL(r).isDataURL()) return void (e => new Promise(((r, o) => {
    const t = new XMLHttpRequest;
    t.withCredentials = !1, t.open('GET', e, !0), t.onreadystatechange = function () {
      if (t.readyState === XMLHttpRequest.DONE) {
        if (200 !== t.status) return t.onreadystatechange = null, void o(new Error(String(t.status)));
        t.onreadystatechange = null, r(t.responseText)
      }
    }, t.send(null)
  })))(r).then((function (e) {
    p(i, e), l({ statusCode: 200 })
  })).catch((function (e) {
    l({ statusCode: 404, messageOverride: c(a.decodingDataUrlFailed) })
  }));
  if (!s && function (e) {
    try {
      const r = new URL(e);
      return 'file:' === r.protocol && '' !== r.host
    } catch (e) {
      return !1
    }
  }(r)) return void (n && n(!1, {}, {
    statusCode: 400,
    netError: -20,
    netErrorName: 'net::BLOCKED_BY_CLIENT',
    message: 'Loading from a remote file path is prohibited for security reasons.'
  }));
  const d = [];
  if (o) for (const e in o) d.push(e + ': ' + o[e]);

  function l(e) {
    if (n) {
      const { success: r, description: o } = function (e) {
        const { statusCode: r, netError: o, netErrorName: t, urlValid: n, messageOverride: s } = e;
        let i = '';
        const d = r >= 200 && r < 300;
        if ('string' == typeof s) i = s; else if (!d) if (void 0 === o) i = c(!1 === n ? a.invalidUrl : a.unknownError); else {
          const e = v(o, r, t);
          e && (i = e)
        }
        return console.assert(d === (0 === i.length)), {
          success: d,
          description: { statusCode: r, netError: o, netErrorName: t, urlValid: n, message: i }
        }
      }(e);
      n(r, e.headers || {}, o)
    }
    g(i)
  }

  b.loadNetworkResource(r, d.join('\r\n'), i, l)
};
var S = Object.freeze({
  __proto__: null,
  ResourceLoader: {},
  bindOutputStream: m,
  discardOutputStream: g,
  streamWrite: p,
  get load() {
    return h
  },
  setLoadForTest: function (e) {
    h = e
  },
  netErrorToMessage: v,
  loadAsStream: C
});
const w = { devtoolsS: 'DevTools - {PH1}' }, k = o.i18n.registerUIStrings('core/host/InspectorFrontendHost.ts', w),
  f = o.i18n.getLocalizedString.bind(void 0, k), I = '/overrides';

class y {
  #e;
  events;
  #r = null;
  recordedCountHistograms = [];
  recordedEnumeratedHistograms = [];
  recordedPerformanceHistograms = [];

  constructor() {
    function e(e) {
      !('mac' === this.platform() ? e.metaKey : e.ctrlKey) || '+' !== e.key && '-' !== e.key || e.stopPropagation()
    }

    this.#e = new Map, 'undefined' != typeof document && document.addEventListener('keydown', (r => {
      e.call(this, r)
    }), !0)
  }

  platform() {
    const e = navigator.userAgent;
    return e.includes('Windows NT') ? 'windows' : e.includes('Mac OS X') ? 'mac' : 'linux'
  }

  loadCompleted() {
  }

  bringToFront() {
  }

  closeWindow() {
  }

  setIsDocked(e, r) {
    window.setTimeout(r, 0)
  }

  showSurvey(e, r) {
    window.setTimeout((() => r({ surveyShown: !1 })), 0)
  }

  canShowSurvey(e, r) {
    window.setTimeout((() => r({ canShowSurvey: !1 })), 0)
  }

  setInspectedPageBounds(e) {
  }

  inspectElementCompleted() {
  }

  setInjectedScriptForOrigin(e, r) {
  }

  inspectedURLChanged(e) {
    document.title = f(w.devtoolsS, { PH1: e.replace(/^https?:\/\//, '') })
  }

  copyText(e) {
    null != e && navigator.clipboard.writeText(e)
  }

  openInNewTab(e) {
    window.open(e, '_blank')
  }

  openSearchResultsInNewTab(r) {
    e.Console.Console.instance().error('Search is not enabled in hosted mode. Please inspect using chrome://inspect')
  }

  showItemInFolder(r) {
    e.Console.Console.instance().error('Show item in folder is not enabled in hosted mode. Please inspect using chrome://inspect')
  }

  save(e, r, o, t) {
    let s = this.#e.get(e);
    s || (s = [], this.#e.set(e, s)), s.push(r), this.events.dispatchEventToListeners(n.SavedURL, {
      url: e,
      fileSystemPath: e
    })
  }

  append(e, r) {
    const o = this.#e.get(e);
    o && (o.push(r), this.events.dispatchEventToListeners(n.AppendedToURL, e))
  }

  close(e) {
    const o = this.#e.get(e) || [];
    this.#e.delete(e);
    let t = '';
    if (e) try {
      const o = r.StringUtilities.trimURL(e);
      t = r.StringUtilities.removeURLFragment(o)
    } catch (r) {
      t = e
    }
    const n = document.createElement('a');
    n.download = t;
    const s = new Blob([o.join('')], { type: 'text/plain' }), i = URL.createObjectURL(s);
    n.href = i, n.click(), URL.revokeObjectURL(i)
  }

  sendMessageToBackend(e) {
  }

  recordCountHistogram(e, r, o, t, n) {
    this.recordedCountHistograms.length >= 100 && this.recordedCountHistograms.shift(), this.recordedCountHistograms.push({
      histogramName: e,
      sample: r,
      min: o,
      exclusiveMax: t,
      bucketSize: n
    })
  }

  recordEnumeratedHistogram(e, r, o) {
    this.recordedEnumeratedHistograms.length >= 100 && this.recordedEnumeratedHistograms.shift(), this.recordedEnumeratedHistograms.push({
      actionName: e,
      actionCode: r
    })
  }

  recordPerformanceHistogram(e, r) {
    this.recordedPerformanceHistograms.length >= 100 && this.recordedPerformanceHistograms.shift(), this.recordedPerformanceHistograms.push({
      histogramName: e,
      duration: r
    })
  }

  recordUserMetricsAction(e) {
  }

  requestFileSystems() {
    this.events.dispatchEventToListeners(n.FileSystemsLoaded, [])
  }

  addFileSystem(e) {
    window.webkitRequestFileSystem(window.TEMPORARY, 1048576, (e => {
      this.#r = e;
      const r = {
        fileSystemName: 'sandboxedRequestedFileSystem',
        fileSystemPath: I,
        rootURL: 'filesystem:devtools://devtools/isolated/',
        type: 'overrides'
      };
      this.events.dispatchEventToListeners(n.FileSystemAdded, { fileSystem: r })
    }))
  }

  removeFileSystem(e) {
    const r = e => {
      e.forEach((e => {
        e.isDirectory ? e.removeRecursively((() => {
        })) : e.isFile && e.remove((() => {
        }))
      }))
    };
    this.#r && this.#r.root.createReader().readEntries(r), this.#r = null, this.events.dispatchEventToListeners(n.FileSystemRemoved, I)
  }

  isolatedFileSystem(e, r) {
    return this.#r
  }

  loadNetworkResource(e, r, o, t) {
    fetch(e).then((async e => {
      const r = await e.arrayBuffer();
      let o = r;
      if (function (e) {
        const r = new Uint8Array(e);
        return !(!r || r.length < 3) && 31 === r[0] && 139 === r[1] && 8 === r[2]
      }(r)) {
        const e = new DecompressionStream('gzip'), t = e.writable.getWriter();
        t.write(r), t.close(), o = e.readable
      }
      return await new Response(o).text()
    })).then((function (e) {
      p(o, e), t({
        statusCode: 200,
        headers: void 0,
        messageOverride: void 0,
        netError: void 0,
        netErrorName: void 0,
        urlValid: void 0
      })
    })).catch((function () {
      t({
        statusCode: 404,
        headers: void 0,
        messageOverride: void 0,
        netError: void 0,
        netErrorName: void 0,
        urlValid: void 0
      })
    }))
  }

  registerPreference(e, r) {
  }

  getPreferences(e) {
    const r = {};
    for (const e in window.localStorage) r[e] = window.localStorage[e];
    e(r)
  }

  getPreference(e, r) {
    r(window.localStorage[e])
  }

  setPreference(e, r) {
    window.localStorage[e] = r
  }

  removePreference(e) {
    delete window.localStorage[e]
  }

  clearPreferences() {
    window.localStorage.clear()
  }

  getSyncInformation(e) {
    e({ isSyncActive: !1, arePreferencesSynced: !1 })
  }

  getHostConfig(e) {
    const r = {
      aidaAvailability: {
        enabled: !0,
        blockedByAge: !1,
        blockedByEnterprisePolicy: !1,
        blockedByGeo: !1,
        disallowLogging: !1
      },
      devToolsConsoleInsights: { modelId: '', temperature: 0, enabled: !1 },
      devToolsFreestylerDogfood: { modelId: '', temperature: 0, enabled: !1 },
      devToolsVeLogging: { enabled: !0, testing: !1 },
      isOffTheRecord: !1
    };
    if ('hostConfigForTesting' in globalThis) {
      const { hostConfigForTesting: e } = globalThis;
      for (const o of Object.keys(e)) {
        const t = o => {
          'object' == typeof r[o] && 'object' == typeof e[o] ? r[o] = { ...r[o], ...e[o] } : r[o] = e[o] ?? r[o]
        };
        t(o)
      }
    }
    e(r)
  }

  upgradeDraggedFileSystemPermissions(e) {
  }

  indexPath(e, r, o) {
  }

  stopIndexing(e) {
  }

  searchInPath(e, r, o) {
  }

  zoomFactor() {
    return 1
  }

  zoomIn() {
  }

  zoomOut() {
  }

  resetZoom() {
  }

  setWhitelistedShortcuts(e) {
  }

  setEyeDropperActive(e) {
  }

  showCertificateViewer(e) {
  }

  reattach(e) {
  }

  readyForTest() {
  }

  connectionReady() {
  }

  setOpenNewWindowForPopups(e) {
  }

  setDevicesDiscoveryConfig(e) {
  }

  setDevicesUpdatesEnabled(e) {
  }

  performActionOnRemotePage(e, r) {
  }

  openRemotePage(e, r) {
  }

  openNodeFrontend() {
  }

  showContextMenuAtPoint(e, r, o, t) {
    throw 'Soft context menu should be used'
  }

  isHostedMode() {
    return !0
  }

  setAddExtensionCallback(e) {
  }

  async initialTargetId() {
    return null
  }

  doAidaConversation(e, r, o) {
    o({ error: 'Not implemented' })
  }

  registerAidaClientEvent(e, r) {
    r({ error: 'Not implemented' })
  }

  recordImpression(e) {
  }

  recordResize(e) {
  }

  recordClick(e) {
  }

  recordHover(e) {
  }

  recordDrag(e) {
  }

  recordChange(e) {
  }

  recordKeyDown(e) {
  }
}

let b = globalThis.InspectorFrontendHost;

class x {
  constructor() {
    for (const e of s) this[e[1]] = this.dispatch.bind(this, e[0], e[2], e[3])
  }

  dispatch(e, r, o, ...t) {
    if (r.length < 2) {
      try {
        b.events.dispatchEventToListeners(e, t[0])
      } catch (e) {
        console.error(e + ' ' + e.stack)
      }
      return
    }
    const n = {};
    for (let e = 0; e < r.length; ++e) n[r[e]] = t[e];
    try {
      b.events.dispatchEventToListeners(e, n)
    } catch (e) {
      console.error(e + ' ' + e.stack)
    }
  }

  streamWrite(e, r) {
    p(e, r)
  }
}

!function () {
  let r;
  if (b) {
    r = y.prototype;
    for (const e of Object.getOwnPropertyNames(r)) {
      const o = r[e];
      'function' != typeof o || b[e] || (console.error(`Incompatible embedder: method Host.InspectorFrontendHost.${e} is missing. Using stub instead.`), b[e] = o)
    }
  } else globalThis.InspectorFrontendHost = b = new y;
  b.events = new e.ObjectWrapper.ObjectWrapper
}(), globalThis.InspectorFrontendAPI = new x;
var E, P, T, F, R = Object.freeze({
  __proto__: null, InspectorFrontendHostStub: y, get InspectorFrontendHostInstance() {
    return b
  }, isUnderTest: function (r) {
    return !!t.Runtime.Runtime.queryParam('test') || (r ? 'true' === r.isUnderTest : e.Settings.Settings.hasInstance() && e.Settings.Settings.instance().createSetting('isUnderTest', !1).get())
  }
});
!function (e) {
  e[e.UNKNOWN = 0] = 'UNKNOWN', e[e.USER = 1] = 'USER', e[e.SYSTEM = 2] = 'SYSTEM'
}(E || (E = {})), function (e) {
  e[e.FUNCTIONALITY_TYPE_UNSPECIFIED = 0] = 'FUNCTIONALITY_TYPE_UNSPECIFIED', e[e.CHAT = 1] = 'CHAT', e[e.EXPLAIN_ERROR = 2] = 'EXPLAIN_ERROR'
}(P || (P = {})), function (e) {
  e[e.CLIENT_FEATURE_UNSPECIFIED = 0] = 'CLIENT_FEATURE_UNSPECIFIED', e[e.CHROME_CONSOLE_INSIGHTS = 1] = 'CHROME_CONSOLE_INSIGHTS', e[e.CHROME_FREESTYLER = 2] = 'CHROME_FREESTYLER'
}(T || (T = {})), function (e) {
  e.ACTION_UNSPECIFIED = 'ACTION_UNSPECIFIED', e.CITE = 'CITE', e.BLOCK = 'BLOCK', e.NO_ACTION = 'NO_ACTION', e.EXEMPT_FOUND_IN_PROMPT = 'EXEMPT_FOUND_IN_PROMPT'
}(F || (F = {}));
const M = 'CHROME_DEVTOOLS';
var O = Object.freeze({
  __proto__: null, get Entity() {
    return E
  }, get FunctionalityType() {
    return P
  }, get ClientFeature() {
    return T
  }, get RecitationAction() {
    return F
  }, CLIENT_NAME: M, AidaClient: class {
    static buildConsoleInsightsRequest(r) {
      const o = { input: r, client: M, functionality_type: P.EXPLAIN_ERROR, client_feature: T.CHROME_CONSOLE_INSIGHTS },
        t = e.Settings.Settings.instance().getHostConfig();
      let n = NaN, s = '';
      t.devToolsConsoleInsights?.enabled && (n = t.devToolsConsoleInsights.temperature || 0, s = t.devToolsConsoleInsights.modelId || '');
      const i = t.aidaAvailability?.disallowLogging ?? !0;
      return isNaN(n) || (o.options ??= {}, o.options.temperature = n), s && (o.options ??= {}, o.options.model_id = s), i && (o.metadata = { disable_user_content_logging: !0 }), o
    }

    static async checkAccessPreconditions() {
      if (!navigator.onLine) return 'no-internet';
      const e = await new Promise((e => b.getSyncInformation((r => e(r)))));
      return e.accountEmail ? e.isSyncActive ? 'available' : 'no-active-sync' : 'no-account-email'
    }

    async* fetch(e) {
      if (!b.doAidaConversation) throw new Error('doAidaConversation is not available');
      const o = (() => {
        let { promise: e, resolve: o, reject: t } = r.PromiseUtilities.promiseWithResolvers();
        return {
          write: async n => {
            o(n), ({ promise: e, resolve: o, reject: t } = r.PromiseUtilities.promiseWithResolvers())
          }, close: async () => {
            o(null)
          }, read: () => e, fail: e => t(e)
        }
      })(), t = m(o);
      let n;
      b.doAidaConversation(JSON.stringify(e), t, (e => {
        403 === e.statusCode ? o.fail(new Error('Server responded: permission denied')) : e.error ? o.fail(new Error(`Cannot send request: ${e.error} ${e.detail || ''}`)) : 200 !== e.statusCode ? o.fail(new Error(`Request failed: ${JSON.stringify(e)}`)) : o.close()
      }));
      const s = [];
      let i = !1;
      const a = { rpcGlobalId: 0 };
      for (; n = await o.read();) {
        let e, r = !1;
        if (!n.length) continue;
        n.startsWith(',') && (n = n.slice(1)), n.startsWith('[') || (n = '[' + n), n.endsWith(']') || (n += ']');
        try {
          e = JSON.parse(n)
        } catch (e) {
          throw new Error('Cannot parse chunk: ' + n, { cause: e })
        }
        const o = '\n`````\n';
        for (const t of e) if ('metadata' in t && (a.rpcGlobalId = t.metadata.rpcGlobalId, 'attributionMetadata' in t.metadata && (a.attributionMetadata || (a.attributionMetadata = []), a.attributionMetadata.push(t.metadata.attributionMetadata))), 'textChunk' in t) i && (s.push(o), i = !1), s.push(t.textChunk.text), r = !0; else {
          if (!('codeChunk' in t)) throw 'error' in t ? new Error(`Server responded: ${JSON.stringify(t)}`) : new Error('Unknown chunk result');
          i || (s.push(o), i = !0), s.push(t.codeChunk.code), r = !0
        }
        r && (yield{ explanation: s.join('') + (i ? o : ''), metadata: a })
      }
    }

    registerClientEvent(e) {
      const { promise: o, resolve: t } = r.PromiseUtilities.promiseWithResolvers();
      return b.registerAidaClientEvent(JSON.stringify({ client: M, event_time: (new Date).toISOString(), ...e }), t), o
    }
  }
});
let _, D, A, N, H;

function L() {
  return _ || (_ = b.platform()), _
}

var U, W, V, B, j, G, q, z, X, K, J, Q, Y, $, Z, ee, re = Object.freeze({
  __proto__: null, platform: L, isMac: function () {
    return void 0 === D && (D = 'mac' === L()), D
  }, isWin: function () {
    return void 0 === A && (A = 'windows' === L()), A
  }, setPlatformForTests: function (e) {
    _ = e, D = void 0, A = void 0
  }, isCustomDevtoolsFrontend: function () {
    return void 0 === N && (N = window.location.toString().startsWith('devtools://devtools/custom/')), N
  }, fontFamily: function () {
    if (H) return H;
    switch (L()) {
      case'linux':
        H = 'Roboto, Ubuntu, Arial, sans-serif';
        break;
      case'mac':
        H = '\'Lucida Grande\', sans-serif';
        break;
      case'windows':
        H = '\'Segoe UI\', Tahoma, sans-serif'
    }
    return H
  }
});

class oe {
  #o;
  #t;
  #n;

  constructor() {
    this.#o = !1, this.#t = !1, this.#n = ''
  }

  panelShown(e, r) {
    const o = W[e] || 0;
    b.recordEnumeratedHistogram('DevTools.PanelShown', o, W.MaxValue), b.recordUserMetricsAction('DevTools_PanelShown_' + e), r || (this.#o = !0)
  }

  panelShownInLocation(e, r) {
    const o = V[`${e}-${r}`] || 0;
    b.recordEnumeratedHistogram('DevTools.PanelShownInLocation', o, V.MaxValue)
  }

  sourcesSidebarTabShown(e) {
    const r = j[e] || 0;
    b.recordEnumeratedHistogram('DevTools.Sources.SidebarTabShown', r, j.MaxValue)
  }

  settingsPanelShown(e) {
    this.panelShown('settings-' + e)
  }

  sourcesPanelFileDebugged(e) {
    const r = e && G[e] || G.Unknown;
    b.recordEnumeratedHistogram('DevTools.SourcesPanelFileDebugged', r, G.MaxValue)
  }

  sourcesPanelFileOpened(e) {
    const r = e && G[e] || G.Unknown;
    b.recordEnumeratedHistogram('DevTools.SourcesPanelFileOpened', r, G.MaxValue)
  }

  networkPanelResponsePreviewOpened(e) {
    const r = e && G[e] || G.Unknown;
    b.recordEnumeratedHistogram('DevTools.NetworkPanelResponsePreviewOpened', r, G.MaxValue)
  }

  actionTaken(e) {
    b.recordEnumeratedHistogram('DevTools.ActionTaken', e, U.MaxValue)
  }

  panelLoaded(e, r) {
    this.#t || e !== this.#n || (this.#t = !0, requestAnimationFrame((() => {
      window.setTimeout((() => {
        performance.mark(r), this.#o || b.recordPerformanceHistogram(r, performance.now())
      }), 0)
    })))
  }

  setLaunchPanel(e) {
    this.#n = e
  }

  performanceTraceLoad(e) {
    b.recordPerformanceHistogram('DevTools.TraceLoad', e.duration)
  }

  keybindSetSettingChanged(e) {
    const r = q[e] || 0;
    b.recordEnumeratedHistogram('DevTools.KeybindSetSettingChanged', r, q.MaxValue)
  }

  keyboardShortcutFired(e) {
    const r = z[e] || z.OtherShortcut;
    b.recordEnumeratedHistogram('DevTools.KeyboardShortcutFired', r, z.MaxValue)
  }

  issuesPanelOpenedFrom(e) {
    b.recordEnumeratedHistogram('DevTools.IssuesPanelOpenedFrom', e, 6)
  }

  issuesPanelIssueExpanded(e) {
    if (void 0 === e) return;
    const r = K[e];
    void 0 !== r && b.recordEnumeratedHistogram('DevTools.IssuesPanelIssueExpanded', r, K.MaxValue)
  }

  issuesPanelResourceOpened(e, r) {
    const o = J[e + r];
    void 0 !== o && b.recordEnumeratedHistogram('DevTools.IssuesPanelResourceOpened', o, J.MaxValue)
  }

  issueCreated(e) {
    const r = Q[e];
    void 0 !== r && b.recordEnumeratedHistogram('DevTools.IssueCreated', r, Q.MaxValue)
  }

  experimentEnabledAtLaunch(e) {
    const r = X[e];
    void 0 !== r && b.recordEnumeratedHistogram('DevTools.ExperimentEnabledAtLaunch', r, X.MaxValue)
  }

  experimentDisabledAtLaunch(e) {
    const r = X[e];
    void 0 !== r && b.recordEnumeratedHistogram('DevTools.ExperimentDisabledAtLaunch', r, X.MaxValue)
  }

  experimentChanged(e, r) {
    const o = X[e];
    if (void 0 === o) return;
    const t = r ? 'DevTools.ExperimentEnabled' : 'DevTools.ExperimentDisabled';
    b.recordEnumeratedHistogram(t, o, X.MaxValue)
  }

  developerResourceLoaded(e) {
    e >= 8 || b.recordEnumeratedHistogram('DevTools.DeveloperResourceLoaded', e, 8)
  }

  developerResourceScheme(e) {
    e >= 9 || b.recordEnumeratedHistogram('DevTools.DeveloperResourceScheme', e, 9)
  }

  language(e) {
    const r = Z[e];
    void 0 !== r && b.recordEnumeratedHistogram('DevTools.Language', r, Z.MaxValue)
  }

  syncSetting(e) {
    b.getSyncInformation((r => {
      let o = 1;
      r.isSyncActive && !r.arePreferencesSynced ? o = 2 : r.isSyncActive && r.arePreferencesSynced && (o = e ? 4 : 3), b.recordEnumeratedHistogram('DevTools.SyncSetting', o, 5)
    }))
  }

  recordingAssertion(e) {
    b.recordEnumeratedHistogram('DevTools.RecordingAssertion', e, 4)
  }

  recordingToggled(e) {
    b.recordEnumeratedHistogram('DevTools.RecordingToggled', e, 3)
  }

  recordingReplayFinished(e) {
    b.recordEnumeratedHistogram('DevTools.RecordingReplayFinished', e, 5)
  }

  recordingReplaySpeed(e) {
    b.recordEnumeratedHistogram('DevTools.RecordingReplaySpeed', e, 5)
  }

  recordingReplayStarted(e) {
    b.recordEnumeratedHistogram('DevTools.RecordingReplayStarted', e, 4)
  }

  recordingEdited(e) {
    b.recordEnumeratedHistogram('DevTools.RecordingEdited', e, 11)
  }

  recordingExported(e) {
    b.recordEnumeratedHistogram('DevTools.RecordingExported', e, 6)
  }

  recordingCodeToggled(e) {
    b.recordEnumeratedHistogram('DevTools.RecordingCodeToggled', e, 3)
  }

  recordingCopiedToClipboard(e) {
    b.recordEnumeratedHistogram('DevTools.RecordingCopiedToClipboard', e, 9)
  }

  styleTextCopied(e) {
    b.recordEnumeratedHistogram('DevTools.StyleTextCopied', e, 11)
  }

  manifestSectionSelected(e) {
    const r = ee[e] || ee.OtherSection;
    b.recordEnumeratedHistogram('DevTools.ManifestSectionSelected', r, ee.MaxValue)
  }

  cssHintShown(e) {
    b.recordEnumeratedHistogram('DevTools.CSSHintShown', e, 14)
  }

  lighthouseModeRun(e) {
    b.recordEnumeratedHistogram('DevTools.LighthouseModeRun', e, 4)
  }

  lighthouseCategoryUsed(e) {
    b.recordEnumeratedHistogram('DevTools.LighthouseCategoryUsed', e, 6)
  }

  colorPickerOpenedFrom(e) {
    b.recordEnumeratedHistogram('DevTools.ColorPickerOpenedFrom', e, 2)
  }

  cssPropertyDocumentation(e) {
    b.recordEnumeratedHistogram('DevTools.CSSPropertyDocumentation', e, 3)
  }

  swatchActivated(e) {
    b.recordEnumeratedHistogram('DevTools.SwatchActivated', e, 11)
  }

  animationPlaybackRateChanged(e) {
    b.recordEnumeratedHistogram('DevTools.AnimationPlaybackRateChanged', e, 4)
  }

  animationPointDragged(e) {
    b.recordEnumeratedHistogram('DevTools.AnimationPointDragged', e, 5)
  }

  workspacesPopulated(e) {
    b.recordPerformanceHistogram('DevTools.Workspaces.PopulateWallClocktime', e)
  }

  visualLoggingProcessingDone(e) {
    b.recordPerformanceHistogram('DevTools.VisualLogging.ProcessingTime', e)
  }

  legacyResourceTypeFilterNumberOfSelectedChanged(e) {
    const r = Math.max(Math.min(e, Y.MaxValue - 1), 1);
    b.recordEnumeratedHistogram('DevTools.LegacyResourceTypeFilterNumberOfSelectedChanged', r, Y.MaxValue)
  }

  legacyResourceTypeFilterItemSelected(e) {
    const r = Y[e];
    void 0 !== r && b.recordEnumeratedHistogram('DevTools.LegacyResourceTypeFilterItemSelected', r, Y.MaxValue)
  }

  resourceTypeFilterNumberOfSelectedChanged(e) {
    const r = Math.max(Math.min(e, Y.MaxValue - 1), 1);
    b.recordEnumeratedHistogram('DevTools.ResourceTypeFilterNumberOfSelectedChanged', r, Y.MaxValue)
  }

  resourceTypeFilterItemSelected(e) {
    const r = Y[e];
    void 0 !== r && b.recordEnumeratedHistogram('DevTools.ResourceTypeFilterItemSelected', r, Y.MaxValue)
  }

  networkPanelMoreFiltersNumberOfSelectedChanged(e) {
    const r = Math.max(Math.min(e, $.MaxValue), 0);
    b.recordEnumeratedHistogram('DevTools.NetworkPanelMoreFiltersNumberOfSelectedChanged', r, $.MaxValue)
  }

  networkPanelMoreFiltersItemSelected(e) {
    const r = $[e];
    void 0 !== r && b.recordEnumeratedHistogram('DevTools.NetworkPanelMoreFiltersItemSelected', r, $.MaxValue)
  }
}

!function (e) {
  e[e.WindowDocked = 1] = 'WindowDocked', e[e.WindowUndocked = 2] = 'WindowUndocked', e[e.ScriptsBreakpointSet = 3] = 'ScriptsBreakpointSet', e[e.TimelineStarted = 4] = 'TimelineStarted', e[e.ProfilesCPUProfileTaken = 5] = 'ProfilesCPUProfileTaken', e[e.ProfilesHeapProfileTaken = 6] = 'ProfilesHeapProfileTaken', e[e.ConsoleEvaluated = 8] = 'ConsoleEvaluated', e[e.FileSavedInWorkspace = 9] = 'FileSavedInWorkspace', e[e.DeviceModeEnabled = 10] = 'DeviceModeEnabled', e[e.AnimationsPlaybackRateChanged = 11] = 'AnimationsPlaybackRateChanged', e[e.RevisionApplied = 12] = 'RevisionApplied', e[e.FileSystemDirectoryContentReceived = 13] = 'FileSystemDirectoryContentReceived', e[e.StyleRuleEdited = 14] = 'StyleRuleEdited', e[e.CommandEvaluatedInConsolePanel = 15] = 'CommandEvaluatedInConsolePanel', e[e.DOMPropertiesExpanded = 16] = 'DOMPropertiesExpanded', e[e.ResizedViewInResponsiveMode = 17] = 'ResizedViewInResponsiveMode', e[e.TimelinePageReloadStarted = 18] = 'TimelinePageReloadStarted', e[e.ConnectToNodeJSFromFrontend = 19] = 'ConnectToNodeJSFromFrontend', e[e.ConnectToNodeJSDirectly = 20] = 'ConnectToNodeJSDirectly', e[e.CpuThrottlingEnabled = 21] = 'CpuThrottlingEnabled', e[e.CpuProfileNodeFocused = 22] = 'CpuProfileNodeFocused', e[e.CpuProfileNodeExcluded = 23] = 'CpuProfileNodeExcluded', e[e.SelectFileFromFilePicker = 24] = 'SelectFileFromFilePicker', e[e.SelectCommandFromCommandMenu = 25] = 'SelectCommandFromCommandMenu', e[e.ChangeInspectedNodeInElementsPanel = 26] = 'ChangeInspectedNodeInElementsPanel', e[e.StyleRuleCopied = 27] = 'StyleRuleCopied', e[e.CoverageStarted = 28] = 'CoverageStarted', e[e.LighthouseStarted = 29] = 'LighthouseStarted', e[e.LighthouseFinished = 30] = 'LighthouseFinished', e[e.ShowedThirdPartyBadges = 31] = 'ShowedThirdPartyBadges', e[e.LighthouseViewTrace = 32] = 'LighthouseViewTrace', e[e.FilmStripStartedRecording = 33] = 'FilmStripStartedRecording', e[e.CoverageReportFiltered = 34] = 'CoverageReportFiltered', e[e.CoverageStartedPerBlock = 35] = 'CoverageStartedPerBlock', e[e['SettingsOpenedFromGear-deprecated'] = 36] = 'SettingsOpenedFromGear-deprecated', e[e['SettingsOpenedFromMenu-deprecated'] = 37] = 'SettingsOpenedFromMenu-deprecated', e[e['SettingsOpenedFromCommandMenu-deprecated'] = 38] = 'SettingsOpenedFromCommandMenu-deprecated', e[e.TabMovedToDrawer = 39] = 'TabMovedToDrawer', e[e.TabMovedToMainPanel = 40] = 'TabMovedToMainPanel', e[e.CaptureCssOverviewClicked = 41] = 'CaptureCssOverviewClicked', e[e.VirtualAuthenticatorEnvironmentEnabled = 42] = 'VirtualAuthenticatorEnvironmentEnabled', e[e.SourceOrderViewActivated = 43] = 'SourceOrderViewActivated', e[e.UserShortcutAdded = 44] = 'UserShortcutAdded', e[e.ShortcutRemoved = 45] = 'ShortcutRemoved', e[e.ShortcutModified = 46] = 'ShortcutModified', e[e.CustomPropertyLinkClicked = 47] = 'CustomPropertyLinkClicked', e[e.CustomPropertyEdited = 48] = 'CustomPropertyEdited', e[e.ServiceWorkerNetworkRequestClicked = 49] = 'ServiceWorkerNetworkRequestClicked', e[e.ServiceWorkerNetworkRequestClosedQuickly = 50] = 'ServiceWorkerNetworkRequestClosedQuickly', e[e.NetworkPanelServiceWorkerRespondWith = 51] = 'NetworkPanelServiceWorkerRespondWith', e[e.NetworkPanelCopyValue = 52] = 'NetworkPanelCopyValue', e[e.ConsoleSidebarOpened = 53] = 'ConsoleSidebarOpened', e[e.PerfPanelTraceImported = 54] = 'PerfPanelTraceImported', e[e.PerfPanelTraceExported = 55] = 'PerfPanelTraceExported', e[e.StackFrameRestarted = 56] = 'StackFrameRestarted', e[e.CaptureTestProtocolClicked = 57] = 'CaptureTestProtocolClicked', e[e.BreakpointRemovedFromRemoveButton = 58] = 'BreakpointRemovedFromRemoveButton', e[e.BreakpointGroupExpandedStateChanged = 59] = 'BreakpointGroupExpandedStateChanged', e[e.HeaderOverrideFileCreated = 60] = 'HeaderOverrideFileCreated', e[e.HeaderOverrideEnableEditingClicked = 61] = 'HeaderOverrideEnableEditingClicked', e[e.HeaderOverrideHeaderAdded = 62] = 'HeaderOverrideHeaderAdded', e[e.HeaderOverrideHeaderEdited = 63] = 'HeaderOverrideHeaderEdited', e[e.HeaderOverrideHeaderRemoved = 64] = 'HeaderOverrideHeaderRemoved', e[e.HeaderOverrideHeadersFileEdited = 65] = 'HeaderOverrideHeadersFileEdited', e[e.PersistenceNetworkOverridesEnabled = 66] = 'PersistenceNetworkOverridesEnabled', e[e.PersistenceNetworkOverridesDisabled = 67] = 'PersistenceNetworkOverridesDisabled', e[e.BreakpointRemovedFromContextMenu = 68] = 'BreakpointRemovedFromContextMenu', e[e.BreakpointsInFileRemovedFromRemoveButton = 69] = 'BreakpointsInFileRemovedFromRemoveButton', e[e.BreakpointsInFileRemovedFromContextMenu = 70] = 'BreakpointsInFileRemovedFromContextMenu', e[e.BreakpointsInFileCheckboxToggled = 71] = 'BreakpointsInFileCheckboxToggled', e[e.BreakpointsInFileEnabledDisabledFromContextMenu = 72] = 'BreakpointsInFileEnabledDisabledFromContextMenu', e[e.BreakpointConditionEditedFromSidebar = 73] = 'BreakpointConditionEditedFromSidebar', e[e.WorkspaceTabAddFolder = 74] = 'WorkspaceTabAddFolder', e[e.WorkspaceTabRemoveFolder = 75] = 'WorkspaceTabRemoveFolder', e[e.OverrideTabAddFolder = 76] = 'OverrideTabAddFolder', e[e.OverrideTabRemoveFolder = 77] = 'OverrideTabRemoveFolder', e[e.WorkspaceSourceSelected = 78] = 'WorkspaceSourceSelected', e[e.OverridesSourceSelected = 79] = 'OverridesSourceSelected', e[e.StyleSheetInitiatorLinkClicked = 80] = 'StyleSheetInitiatorLinkClicked', e[e.BreakpointRemovedFromGutterContextMenu = 81] = 'BreakpointRemovedFromGutterContextMenu', e[e.BreakpointRemovedFromGutterToggle = 82] = 'BreakpointRemovedFromGutterToggle', e[e.StylePropertyInsideKeyframeEdited = 83] = 'StylePropertyInsideKeyframeEdited', e[e.OverrideContentFromSourcesContextMenu = 84] = 'OverrideContentFromSourcesContextMenu', e[e.OverrideContentFromNetworkContextMenu = 85] = 'OverrideContentFromNetworkContextMenu', e[e.OverrideScript = 86] = 'OverrideScript', e[e.OverrideStyleSheet = 87] = 'OverrideStyleSheet', e[e.OverrideDocument = 88] = 'OverrideDocument', e[e.OverrideFetchXHR = 89] = 'OverrideFetchXHR', e[e.OverrideImage = 90] = 'OverrideImage', e[e.OverrideFont = 91] = 'OverrideFont', e[e.OverrideContentContextMenuSetup = 92] = 'OverrideContentContextMenuSetup', e[e.OverrideContentContextMenuAbandonSetup = 93] = 'OverrideContentContextMenuAbandonSetup', e[e.OverrideContentContextMenuActivateDisabled = 94] = 'OverrideContentContextMenuActivateDisabled', e[e.OverrideContentContextMenuOpenExistingFile = 95] = 'OverrideContentContextMenuOpenExistingFile', e[e.OverrideContentContextMenuSaveNewFile = 96] = 'OverrideContentContextMenuSaveNewFile', e[e.ShowAllOverridesFromSourcesContextMenu = 97] = 'ShowAllOverridesFromSourcesContextMenu', e[e.ShowAllOverridesFromNetworkContextMenu = 98] = 'ShowAllOverridesFromNetworkContextMenu', e[e.AnimationGroupsCleared = 99] = 'AnimationGroupsCleared', e[e.AnimationsPaused = 100] = 'AnimationsPaused', e[e.AnimationsResumed = 101] = 'AnimationsResumed', e[e.AnimatedNodeDescriptionClicked = 102] = 'AnimatedNodeDescriptionClicked',e[e.AnimationGroupScrubbed = 103] = 'AnimationGroupScrubbed',e[e.AnimationGroupReplayed = 104] = 'AnimationGroupReplayed',e[e.OverrideTabDeleteFolderContextMenu = 105] = 'OverrideTabDeleteFolderContextMenu',e[e.WorkspaceDropFolder = 107] = 'WorkspaceDropFolder',e[e.WorkspaceSelectFolder = 108] = 'WorkspaceSelectFolder',e[e.OverrideContentContextMenuSourceMappedWarning = 109] = 'OverrideContentContextMenuSourceMappedWarning',e[e.OverrideContentContextMenuRedirectToDeployed = 110] = 'OverrideContentContextMenuRedirectToDeployed',e[e.NewStyleRuleAdded = 111] = 'NewStyleRuleAdded',e[e.TraceExpanded = 112] = 'TraceExpanded',e[e.InsightConsoleMessageShown = 113] = 'InsightConsoleMessageShown',e[e.InsightRequestedViaContextMenu = 114] = 'InsightRequestedViaContextMenu',e[e.InsightRequestedViaHoverButton = 115] = 'InsightRequestedViaHoverButton',e[e.InsightRatedPositive = 117] = 'InsightRatedPositive',e[e.InsightRatedNegative = 118] = 'InsightRatedNegative',e[e.InsightClosed = 119] = 'InsightClosed',e[e.InsightErrored = 120] = 'InsightErrored',e[e.InsightHoverButtonShown = 121] = 'InsightHoverButtonShown',e[e.SelfXssWarningConsoleMessageShown = 122] = 'SelfXssWarningConsoleMessageShown',e[e.SelfXssWarningDialogShown = 123] = 'SelfXssWarningDialogShown',e[e.SelfXssAllowPastingInConsole = 124] = 'SelfXssAllowPastingInConsole',e[e.SelfXssAllowPastingInDialog = 125] = 'SelfXssAllowPastingInDialog',e[e.ToggleEmulateFocusedPageFromStylesPaneOn = 126] = 'ToggleEmulateFocusedPageFromStylesPaneOn',e[e.ToggleEmulateFocusedPageFromStylesPaneOff = 127] = 'ToggleEmulateFocusedPageFromStylesPaneOff',e[e.ToggleEmulateFocusedPageFromRenderingTab = 128] = 'ToggleEmulateFocusedPageFromRenderingTab',e[e.ToggleEmulateFocusedPageFromCommandMenu = 129] = 'ToggleEmulateFocusedPageFromCommandMenu',e[e.InsightGenerated = 130] = 'InsightGenerated',e[e.InsightErroredApi = 131] = 'InsightErroredApi',e[e.InsightErroredMarkdown = 132] = 'InsightErroredMarkdown',e[e.ToggleShowWebVitals = 133] = 'ToggleShowWebVitals',e[e.InsightErroredPermissionDenied = 134] = 'InsightErroredPermissionDenied',e[e.InsightErroredCannotSend = 135] = 'InsightErroredCannotSend',e[e.InsightErroredRequestFailed = 136] = 'InsightErroredRequestFailed',e[e.InsightErroredCannotParseChunk = 137] = 'InsightErroredCannotParseChunk',e[e.InsightErroredUnknownChunk = 138] = 'InsightErroredUnknownChunk',e[e.InsightErroredOther = 139] = 'InsightErroredOther',e[e.AutofillReceived = 140] = 'AutofillReceived',e[e.AutofillReceivedAndTabAutoOpened = 141] = 'AutofillReceivedAndTabAutoOpened',e[e.AnimationGroupSelected = 142] = 'AnimationGroupSelected',e[e.ScrollDrivenAnimationGroupSelected = 143] = 'ScrollDrivenAnimationGroupSelected',e[e.ScrollDrivenAnimationGroupScrubbed = 144] = 'ScrollDrivenAnimationGroupScrubbed',e[e.FreestylerOpenedFromElementsPanel = 145] = 'FreestylerOpenedFromElementsPanel',e[e.FreestylerOpenedFromStylesTab = 146] = 'FreestylerOpenedFromStylesTab',e[e.ConsoleFilterByContext = 147] = 'ConsoleFilterByContext',e[e.ConsoleFilterBySource = 148] = 'ConsoleFilterBySource',e[e.ConsoleFilterByUrl = 149] = 'ConsoleFilterByUrl',e[e.InsightConsentReminderShown = 150] = 'InsightConsentReminderShown',e[e.InsightConsentReminderCanceled = 151] = 'InsightConsentReminderCanceled',e[e.InsightConsentReminderConfirmed = 152] = 'InsightConsentReminderConfirmed',e[e.InsightsOnboardingShown = 153] = 'InsightsOnboardingShown',e[e.InsightsOnboardingCanceledOnPage1 = 154] = 'InsightsOnboardingCanceledOnPage1',e[e.InsightsOnboardingCanceledOnPage2 = 155] = 'InsightsOnboardingCanceledOnPage2',e[e.InsightsOnboardingConfirmed = 156] = 'InsightsOnboardingConfirmed',e[e.InsightsOnboardingNextPage = 157] = 'InsightsOnboardingNextPage',e[e.InsightsOnboardingPrevPage = 158] = 'InsightsOnboardingPrevPage',e[e.InsightsOnboardingFeatureDisabled = 159] = 'InsightsOnboardingFeatureDisabled',e[e.MaxValue = 160] = 'MaxValue'
}(U || (U = {})), function (e) {
  e[e.elements = 1] = 'elements', e[e.resources = 2] = 'resources', e[e.network = 3] = 'network', e[e.sources = 4] = 'sources', e[e.timeline = 5] = 'timeline', e[e['heap-profiler'] = 6] = 'heap-profiler', e[e.console = 8] = 'console', e[e.layers = 9] = 'layers', e[e['console-view'] = 10] = 'console-view', e[e.animations = 11] = 'animations', e[e['network.config'] = 12] = 'network.config', e[e.rendering = 13] = 'rendering', e[e.sensors = 14] = 'sensors', e[e['sources.search'] = 15] = 'sources.search', e[e.security = 16] = 'security', e[e['js-profiler'] = 17] = 'js-profiler', e[e.lighthouse = 18] = 'lighthouse', e[e.coverage = 19] = 'coverage', e[e['protocol-monitor'] = 20] = 'protocol-monitor', e[e['remote-devices'] = 21] = 'remote-devices', e[e['web-audio'] = 22] = 'web-audio', e[e['changes.changes'] = 23] = 'changes.changes', e[e['performance.monitor'] = 24] = 'performance.monitor', e[e['release-note'] = 25] = 'release-note', e[e['live-heap-profile'] = 26] = 'live-heap-profile', e[e['sources.quick'] = 27] = 'sources.quick', e[e['network.blocked-urls'] = 28] = 'network.blocked-urls', e[e['settings-preferences'] = 29] = 'settings-preferences', e[e['settings-workspace'] = 30] = 'settings-workspace', e[e['settings-experiments'] = 31] = 'settings-experiments', e[e['settings-blackbox'] = 32] = 'settings-blackbox', e[e['settings-devices'] = 33] = 'settings-devices', e[e['settings-throttling-conditions'] = 34] = 'settings-throttling-conditions', e[e['settings-emulation-locations'] = 35] = 'settings-emulation-locations', e[e['settings-shortcuts'] = 36] = 'settings-shortcuts', e[e['issues-pane'] = 37] = 'issues-pane', e[e['settings-keybinds'] = 38] = 'settings-keybinds', e[e.cssoverview = 39] = 'cssoverview', e[e['chrome-recorder'] = 40] = 'chrome-recorder', e[e['trust-tokens'] = 41] = 'trust-tokens', e[e['reporting-api'] = 42] = 'reporting-api', e[e['interest-groups'] = 43] = 'interest-groups', e[e['back-forward-cache'] = 44] = 'back-forward-cache', e[e['service-worker-cache'] = 45] = 'service-worker-cache', e[e['background-service-background-fetch'] = 46] = 'background-service-background-fetch', e[e['background-service-background-sync'] = 47] = 'background-service-background-sync', e[e['background-service-push-messaging'] = 48] = 'background-service-push-messaging', e[e['background-service-notifications'] = 49] = 'background-service-notifications', e[e['background-service-payment-handler'] = 50] = 'background-service-payment-handler', e[e['background-service-periodic-background-sync'] = 51] = 'background-service-periodic-background-sync', e[e['service-workers'] = 52] = 'service-workers', e[e['app-manifest'] = 53] = 'app-manifest', e[e.storage = 54] = 'storage', e[e.cookies = 55] = 'cookies', e[e['frame-details'] = 56] = 'frame-details', e[e['frame-resource'] = 57] = 'frame-resource', e[e['frame-window'] = 58] = 'frame-window', e[e['frame-worker'] = 59] = 'frame-worker', e[e['dom-storage'] = 60] = 'dom-storage', e[e['indexed-db'] = 61] = 'indexed-db', e[e['web-sql'] = 62] = 'web-sql', e[e['performance-insights'] = 63] = 'performance-insights', e[e.preloading = 64] = 'preloading', e[e['bounce-tracking-mitigations'] = 65] = 'bounce-tracking-mitigations', e[e['developer-resources'] = 66] = 'developer-resources', e[e['autofill-view'] = 67] = 'autofill-view', e[e.MaxValue = 68] = 'MaxValue'
}(W || (W = {})), function (e) {
  e[e['elements-main'] = 1] = 'elements-main', e[e['elements-drawer'] = 2] = 'elements-drawer', e[e['resources-main'] = 3] = 'resources-main', e[e['resources-drawer'] = 4] = 'resources-drawer', e[e['network-main'] = 5] = 'network-main', e[e['network-drawer'] = 6] = 'network-drawer', e[e['sources-main'] = 7] = 'sources-main', e[e['sources-drawer'] = 8] = 'sources-drawer', e[e['timeline-main'] = 9] = 'timeline-main', e[e['timeline-drawer'] = 10] = 'timeline-drawer', e[e['heap_profiler-main'] = 11] = 'heap_profiler-main', e[e['heap_profiler-drawer'] = 12] = 'heap_profiler-drawer', e[e['console-main'] = 13] = 'console-main', e[e['console-drawer'] = 14] = 'console-drawer', e[e['layers-main'] = 15] = 'layers-main', e[e['layers-drawer'] = 16] = 'layers-drawer', e[e['console-view-main'] = 17] = 'console-view-main', e[e['console-view-drawer'] = 18] = 'console-view-drawer', e[e['animations-main'] = 19] = 'animations-main', e[e['animations-drawer'] = 20] = 'animations-drawer', e[e['network.config-main'] = 21] = 'network.config-main', e[e['network.config-drawer'] = 22] = 'network.config-drawer', e[e['rendering-main'] = 23] = 'rendering-main', e[e['rendering-drawer'] = 24] = 'rendering-drawer', e[e['sensors-main'] = 25] = 'sensors-main', e[e['sensors-drawer'] = 26] = 'sensors-drawer', e[e['sources.search-main'] = 27] = 'sources.search-main', e[e['sources.search-drawer'] = 28] = 'sources.search-drawer', e[e['security-main'] = 29] = 'security-main', e[e['security-drawer'] = 30] = 'security-drawer', e[e['lighthouse-main'] = 33] = 'lighthouse-main', e[e['lighthouse-drawer'] = 34] = 'lighthouse-drawer', e[e['coverage-main'] = 35] = 'coverage-main', e[e['coverage-drawer'] = 36] = 'coverage-drawer', e[e['protocol-monitor-main'] = 37] = 'protocol-monitor-main', e[e['protocol-monitor-drawer'] = 38] = 'protocol-monitor-drawer', e[e['remote-devices-main'] = 39] = 'remote-devices-main', e[e['remote-devices-drawer'] = 40] = 'remote-devices-drawer', e[e['web-audio-main'] = 41] = 'web-audio-main', e[e['web-audio-drawer'] = 42] = 'web-audio-drawer', e[e['changes.changes-main'] = 43] = 'changes.changes-main', e[e['changes.changes-drawer'] = 44] = 'changes.changes-drawer', e[e['performance.monitor-main'] = 45] = 'performance.monitor-main', e[e['performance.monitor-drawer'] = 46] = 'performance.monitor-drawer', e[e['release-note-main'] = 47] = 'release-note-main', e[e['release-note-drawer'] = 48] = 'release-note-drawer', e[e['live_heap_profile-main'] = 49] = 'live_heap_profile-main', e[e['live_heap_profile-drawer'] = 50] = 'live_heap_profile-drawer', e[e['sources.quick-main'] = 51] = 'sources.quick-main', e[e['sources.quick-drawer'] = 52] = 'sources.quick-drawer', e[e['network.blocked-urls-main'] = 53] = 'network.blocked-urls-main', e[e['network.blocked-urls-drawer'] = 54] = 'network.blocked-urls-drawer', e[e['settings-preferences-main'] = 55] = 'settings-preferences-main', e[e['settings-preferences-drawer'] = 56] = 'settings-preferences-drawer', e[e['settings-workspace-main'] = 57] = 'settings-workspace-main', e[e['settings-workspace-drawer'] = 58] = 'settings-workspace-drawer', e[e['settings-experiments-main'] = 59] = 'settings-experiments-main', e[e['settings-experiments-drawer'] = 60] = 'settings-experiments-drawer', e[e['settings-blackbox-main'] = 61] = 'settings-blackbox-main', e[e['settings-blackbox-drawer'] = 62] = 'settings-blackbox-drawer', e[e['settings-devices-main'] = 63] = 'settings-devices-main', e[e['settings-devices-drawer'] = 64] = 'settings-devices-drawer', e[e['settings-throttling-conditions-main'] = 65] = 'settings-throttling-conditions-main', e[e['settings-throttling-conditions-drawer'] = 66] = 'settings-throttling-conditions-drawer', e[e['settings-emulation-locations-main'] = 67] = 'settings-emulation-locations-main', e[e['settings-emulation-locations-drawer'] = 68] = 'settings-emulation-locations-drawer', e[e['settings-shortcuts-main'] = 69] = 'settings-shortcuts-main', e[e['settings-shortcuts-drawer'] = 70] = 'settings-shortcuts-drawer', e[e['issues-pane-main'] = 71] = 'issues-pane-main', e[e['issues-pane-drawer'] = 72] = 'issues-pane-drawer', e[e['settings-keybinds-main'] = 73] = 'settings-keybinds-main', e[e['settings-keybinds-drawer'] = 74] = 'settings-keybinds-drawer', e[e['cssoverview-main'] = 75] = 'cssoverview-main', e[e['cssoverview-drawer'] = 76] = 'cssoverview-drawer', e[e['chrome_recorder-main'] = 77] = 'chrome_recorder-main', e[e['chrome_recorder-drawer'] = 78] = 'chrome_recorder-drawer', e[e['trust_tokens-main'] = 79] = 'trust_tokens-main', e[e['trust_tokens-drawer'] = 80] = 'trust_tokens-drawer', e[e['reporting_api-main'] = 81] = 'reporting_api-main', e[e['reporting_api-drawer'] = 82] = 'reporting_api-drawer', e[e['interest_groups-main'] = 83] = 'interest_groups-main', e[e['interest_groups-drawer'] = 84] = 'interest_groups-drawer', e[e['back_forward_cache-main'] = 85] = 'back_forward_cache-main', e[e['back_forward_cache-drawer'] = 86] = 'back_forward_cache-drawer', e[e['service_worker_cache-main'] = 87] = 'service_worker_cache-main', e[e['service_worker_cache-drawer'] = 88] = 'service_worker_cache-drawer', e[e['background_service_backgroundFetch-main'] = 89] = 'background_service_backgroundFetch-main', e[e['background_service_backgroundFetch-drawer'] = 90] = 'background_service_backgroundFetch-drawer', e[e['background_service_backgroundSync-main'] = 91] = 'background_service_backgroundSync-main', e[e['background_service_backgroundSync-drawer'] = 92] = 'background_service_backgroundSync-drawer', e[e['background_service_pushMessaging-main'] = 93] = 'background_service_pushMessaging-main', e[e['background_service_pushMessaging-drawer'] = 94] = 'background_service_pushMessaging-drawer', e[e['background_service_notifications-main'] = 95] = 'background_service_notifications-main', e[e['background_service_notifications-drawer'] = 96] = 'background_service_notifications-drawer', e[e['background_service_paymentHandler-main'] = 97] = 'background_service_paymentHandler-main', e[e['background_service_paymentHandler-drawer'] = 98] = 'background_service_paymentHandler-drawer', e[e['background_service_periodicBackgroundSync-main'] = 99] = 'background_service_periodicBackgroundSync-main', e[e['background_service_periodicBackgroundSync-drawer'] = 100] = 'background_service_periodicBackgroundSync-drawer', e[e['service_workers-main'] = 101] = 'service_workers-main', e[e['service_workers-drawer'] = 102] = 'service_workers-drawer', e[e['app_manifest-main'] = 103] = 'app_manifest-main',e[e['app_manifest-drawer'] = 104] = 'app_manifest-drawer',e[e['storage-main'] = 105] = 'storage-main',e[e['storage-drawer'] = 106] = 'storage-drawer',e[e['cookies-main'] = 107] = 'cookies-main',e[e['cookies-drawer'] = 108] = 'cookies-drawer',e[e['frame_details-main'] = 109] = 'frame_details-main',e[e['frame_details-drawer'] = 110] = 'frame_details-drawer',e[e['frame_resource-main'] = 111] = 'frame_resource-main',e[e['frame_resource-drawer'] = 112] = 'frame_resource-drawer',e[e['frame_window-main'] = 113] = 'frame_window-main',e[e['frame_window-drawer'] = 114] = 'frame_window-drawer',e[e['frame_worker-main'] = 115] = 'frame_worker-main',e[e['frame_worker-drawer'] = 116] = 'frame_worker-drawer',e[e['dom_storage-main'] = 117] = 'dom_storage-main',e[e['dom_storage-drawer'] = 118] = 'dom_storage-drawer',e[e['indexed_db-main'] = 119] = 'indexed_db-main',e[e['indexed_db-drawer'] = 120] = 'indexed_db-drawer',e[e['web_sql-main'] = 121] = 'web_sql-main',e[e['web_sql-drawer'] = 122] = 'web_sql-drawer',e[e['performance_insights-main'] = 123] = 'performance_insights-main',e[e['performance_insights-drawer'] = 124] = 'performance_insights-drawer',e[e['preloading-main'] = 125] = 'preloading-main',e[e['preloading-drawer'] = 126] = 'preloading-drawer',e[e['bounce_tracking_mitigations-main'] = 127] = 'bounce_tracking_mitigations-main',e[e['bounce_tracking_mitigations-drawer'] = 128] = 'bounce_tracking_mitigations-drawer',e[e['developer-resources-main'] = 129] = 'developer-resources-main',e[e['developer-resources-drawer'] = 130] = 'developer-resources-drawer',e[e['autofill-view-main'] = 131] = 'autofill-view-main',e[e['autofill-view-drawer'] = 132] = 'autofill-view-drawer',e[e.MaxValue = 133] = 'MaxValue'
}(V || (V = {})), function (e) {
  e[e.OtherSidebarPane = 0] = 'OtherSidebarPane', e[e.styles = 1] = 'styles', e[e.computed = 2] = 'computed', e[e['elements.layout'] = 3] = 'elements.layout', e[e['elements.event-listeners'] = 4] = 'elements.event-listeners', e[e['elements.dom-breakpoints'] = 5] = 'elements.dom-breakpoints', e[e['elements.dom-properties'] = 6] = 'elements.dom-properties', e[e['accessibility.view'] = 7] = 'accessibility.view', e[e.MaxValue = 8] = 'MaxValue'
}(B || (B = {})), function (e) {
  e[e.OtherSidebarPane = 0] = 'OtherSidebarPane', e[e['navigator-network'] = 1] = 'navigator-network', e[e['navigator-files'] = 2] = 'navigator-files', e[e['navigator-overrides'] = 3] = 'navigator-overrides', e[e['navigator-content-scripts'] = 4] = 'navigator-content-scripts', e[e['navigator-snippets'] = 5] = 'navigator-snippets', e[e.MaxValue = 6] = 'MaxValue'
}(j || (j = {})), function (e) {
  e[e.Unknown = 0] = 'Unknown', e[e['text/css'] = 2] = 'text/css', e[e['text/html'] = 3] = 'text/html', e[e['application/xml'] = 4] = 'application/xml', e[e['application/wasm'] = 5] = 'application/wasm', e[e['application/manifest+json'] = 6] = 'application/manifest+json', e[e['application/x-aspx'] = 7] = 'application/x-aspx', e[e['application/jsp'] = 8] = 'application/jsp', e[e['text/x-c++src'] = 9] = 'text/x-c++src', e[e['text/x-coffeescript'] = 10] = 'text/x-coffeescript', e[e['application/vnd.dart'] = 11] = 'application/vnd.dart', e[e['text/typescript'] = 12] = 'text/typescript', e[e['text/typescript-jsx'] = 13] = 'text/typescript-jsx', e[e['application/json'] = 14] = 'application/json', e[e['text/x-csharp'] = 15] = 'text/x-csharp', e[e['text/x-java'] = 16] = 'text/x-java', e[e['text/x-less'] = 17] = 'text/x-less', e[e['application/x-httpd-php'] = 18] = 'application/x-httpd-php', e[e['text/x-python'] = 19] = 'text/x-python', e[e['text/x-sh'] = 20] = 'text/x-sh', e[e['text/x-gss'] = 21] = 'text/x-gss', e[e['text/x-sass'] = 22] = 'text/x-sass', e[e['text/x-scss'] = 23] = 'text/x-scss', e[e['text/markdown'] = 24] = 'text/markdown', e[e['text/x-clojure'] = 25] = 'text/x-clojure', e[e['text/jsx'] = 26] = 'text/jsx', e[e['text/x-go'] = 27] = 'text/x-go', e[e['text/x-kotlin'] = 28] = 'text/x-kotlin', e[e['text/x-scala'] = 29] = 'text/x-scala', e[e['text/x.svelte'] = 30] = 'text/x.svelte', e[e['text/javascript+plain'] = 31] = 'text/javascript+plain', e[e['text/javascript+minified'] = 32] = 'text/javascript+minified', e[e['text/javascript+sourcemapped'] = 33] = 'text/javascript+sourcemapped', e[e['text/x.angular'] = 34] = 'text/x.angular', e[e['text/x.vue'] = 35] = 'text/x.vue', e[e['text/javascript+snippet'] = 36] = 'text/javascript+snippet', e[e['text/javascript+eval'] = 37] = 'text/javascript+eval', e[e.MaxValue = 38] = 'MaxValue'
}(G || (G = {})), function (e) {
  e[e.devToolsDefault = 0] = 'devToolsDefault', e[e.vsCode = 1] = 'vsCode', e[e.MaxValue = 2] = 'MaxValue'
}(q || (q = {})), function (e) {
  e[e.OtherShortcut = 0] = 'OtherShortcut', e[e['quick-open.show-command-menu'] = 1] = 'quick-open.show-command-menu', e[e['console.clear'] = 2] = 'console.clear', e[e['console.toggle'] = 3] = 'console.toggle', e[e['debugger.step'] = 4] = 'debugger.step', e[e['debugger.step-into'] = 5] = 'debugger.step-into', e[e['debugger.step-out'] = 6] = 'debugger.step-out', e[e['debugger.step-over'] = 7] = 'debugger.step-over', e[e['debugger.toggle-breakpoint'] = 8] = 'debugger.toggle-breakpoint', e[e['debugger.toggle-breakpoint-enabled'] = 9] = 'debugger.toggle-breakpoint-enabled', e[e['debugger.toggle-pause'] = 10] = 'debugger.toggle-pause', e[e['elements.edit-as-html'] = 11] = 'elements.edit-as-html', e[e['elements.hide-element'] = 12] = 'elements.hide-element', e[e['elements.redo'] = 13] = 'elements.redo', e[e['elements.toggle-element-search'] = 14] = 'elements.toggle-element-search', e[e['elements.undo'] = 15] = 'elements.undo', e[e['main.search-in-panel.find'] = 16] = 'main.search-in-panel.find', e[e['main.toggle-drawer'] = 17] = 'main.toggle-drawer', e[e['network.hide-request-details'] = 18] = 'network.hide-request-details', e[e['network.search'] = 19] = 'network.search', e[e['network.toggle-recording'] = 20] = 'network.toggle-recording', e[e['quick-open.show'] = 21] = 'quick-open.show', e[e['settings.show'] = 22] = 'settings.show', e[e['sources.search'] = 23] = 'sources.search', e[e['background-service.toggle-recording'] = 24] = 'background-service.toggle-recording', e[e['components.collect-garbage'] = 25] = 'components.collect-garbage', e[e['console.clear.history'] = 26] = 'console.clear.history', e[e['console.create-pin'] = 27] = 'console.create-pin', e[e['coverage.start-with-reload'] = 28] = 'coverage.start-with-reload', e[e['coverage.toggle-recording'] = 29] = 'coverage.toggle-recording', e[e['debugger.breakpoint-input-window'] = 30] = 'debugger.breakpoint-input-window', e[e['debugger.evaluate-selection'] = 31] = 'debugger.evaluate-selection', e[e['debugger.next-call-frame'] = 32] = 'debugger.next-call-frame', e[e['debugger.previous-call-frame'] = 33] = 'debugger.previous-call-frame', e[e['debugger.run-snippet'] = 34] = 'debugger.run-snippet', e[e['debugger.toggle-breakpoints-active'] = 35] = 'debugger.toggle-breakpoints-active', e[e['elements.capture-area-screenshot'] = 36] = 'elements.capture-area-screenshot', e[e['emulation.capture-full-height-screenshot'] = 37] = 'emulation.capture-full-height-screenshot', e[e['emulation.capture-node-screenshot'] = 38] = 'emulation.capture-node-screenshot', e[e['emulation.capture-screenshot'] = 39] = 'emulation.capture-screenshot', e[e['emulation.show-sensors'] = 40] = 'emulation.show-sensors', e[e['emulation.toggle-device-mode'] = 41] = 'emulation.toggle-device-mode', e[e['help.release-notes'] = 42] = 'help.release-notes', e[e['help.report-issue'] = 43] = 'help.report-issue', e[e['input.start-replaying'] = 44] = 'input.start-replaying', e[e['input.toggle-pause'] = 45] = 'input.toggle-pause', e[e['input.toggle-recording'] = 46] = 'input.toggle-recording', e[e['inspector-main.focus-debuggee'] = 47] = 'inspector-main.focus-debuggee', e[e['inspector-main.hard-reload'] = 48] = 'inspector-main.hard-reload', e[e['inspector-main.reload'] = 49] = 'inspector-main.reload', e[e['live-heap-profile.start-with-reload'] = 50] = 'live-heap-profile.start-with-reload', e[e['live-heap-profile.toggle-recording'] = 51] = 'live-heap-profile.toggle-recording', e[e['main.debug-reload'] = 52] = 'main.debug-reload', e[e['main.next-tab'] = 53] = 'main.next-tab', e[e['main.previous-tab'] = 54] = 'main.previous-tab', e[e['main.search-in-panel.cancel'] = 55] = 'main.search-in-panel.cancel', e[e['main.search-in-panel.find-next'] = 56] = 'main.search-in-panel.find-next', e[e['main.search-in-panel.find-previous'] = 57] = 'main.search-in-panel.find-previous', e[e['main.toggle-dock'] = 58] = 'main.toggle-dock', e[e['main.zoom-in'] = 59] = 'main.zoom-in', e[e['main.zoom-out'] = 60] = 'main.zoom-out', e[e['main.zoom-reset'] = 61] = 'main.zoom-reset', e[e['network-conditions.network-low-end-mobile'] = 62] = 'network-conditions.network-low-end-mobile', e[e['network-conditions.network-mid-tier-mobile'] = 63] = 'network-conditions.network-mid-tier-mobile', e[e['network-conditions.network-offline'] = 64] = 'network-conditions.network-offline', e[e['network-conditions.network-online'] = 65] = 'network-conditions.network-online', e[e['profiler.heap-toggle-recording'] = 66] = 'profiler.heap-toggle-recording', e[e['profiler.js-toggle-recording'] = 67] = 'profiler.js-toggle-recording', e[e['resources.clear'] = 68] = 'resources.clear', e[e['settings.documentation'] = 69] = 'settings.documentation', e[e['settings.shortcuts'] = 70] = 'settings.shortcuts', e[e['sources.add-folder-to-workspace'] = 71] = 'sources.add-folder-to-workspace', e[e['sources.add-to-watch'] = 72] = 'sources.add-to-watch', e[e['sources.close-all'] = 73] = 'sources.close-all', e[e['sources.close-editor-tab'] = 74] = 'sources.close-editor-tab', e[e['sources.create-snippet'] = 75] = 'sources.create-snippet', e[e['sources.go-to-line'] = 76] = 'sources.go-to-line', e[e['sources.go-to-member'] = 77] = 'sources.go-to-member', e[e['sources.jump-to-next-location'] = 78] = 'sources.jump-to-next-location', e[e['sources.jump-to-previous-location'] = 79] = 'sources.jump-to-previous-location', e[e['sources.rename'] = 80] = 'sources.rename', e[e['sources.save'] = 81] = 'sources.save', e[e['sources.save-all'] = 82] = 'sources.save-all', e[e['sources.switch-file'] = 83] = 'sources.switch-file', e[e['timeline.jump-to-next-frame'] = 84] = 'timeline.jump-to-next-frame', e[e['timeline.jump-to-previous-frame'] = 85] = 'timeline.jump-to-previous-frame', e[e['timeline.load-from-file'] = 86] = 'timeline.load-from-file', e[e['timeline.next-recording'] = 87] = 'timeline.next-recording', e[e['timeline.previous-recording'] = 88] = 'timeline.previous-recording', e[e['timeline.record-reload'] = 89] = 'timeline.record-reload', e[e['timeline.save-to-file'] = 90] = 'timeline.save-to-file', e[e['timeline.show-history'] = 91] = 'timeline.show-history', e[e['timeline.toggle-recording'] = 92] = 'timeline.toggle-recording', e[e['sources.increment-css'] = 93] = 'sources.increment-css', e[e['sources.increment-css-by-ten'] = 94] = 'sources.increment-css-by-ten', e[e['sources.decrement-css'] = 95] = 'sources.decrement-css', e[e['sources.decrement-css-by-ten'] = 96] = 'sources.decrement-css-by-ten', e[e['layers.reset-view'] = 97] = 'layers.reset-view', e[e['layers.pan-mode'] = 98] = 'layers.pan-mode', e[e['layers.rotate-mode'] = 99] = 'layers.rotate-mode', e[e['layers.zoom-in'] = 100] = 'layers.zoom-in',e[e['layers.zoom-out'] = 101] = 'layers.zoom-out',e[e['layers.up'] = 102] = 'layers.up',e[e['layers.down'] = 103] = 'layers.down',e[e['layers.left'] = 104] = 'layers.left',e[e['layers.right'] = 105] = 'layers.right',e[e['help.report-translation-issue'] = 106] = 'help.report-translation-issue',e[e['rendering.toggle-prefers-color-scheme'] = 107] = 'rendering.toggle-prefers-color-scheme',e[e['chrome-recorder.start-recording'] = 108] = 'chrome-recorder.start-recording',e[e['chrome-recorder.replay-recording'] = 109] = 'chrome-recorder.replay-recording',e[e['chrome-recorder.toggle-code-view'] = 110] = 'chrome-recorder.toggle-code-view',e[e['chrome-recorder.copy-recording-or-step'] = 111] = 'chrome-recorder.copy-recording-or-step',e[e['changes.revert'] = 112] = 'changes.revert',e[e['changes.copy'] = 113] = 'changes.copy',e[e['elements.new-style-rule'] = 114] = 'elements.new-style-rule',e[e['elements.refresh-event-listeners'] = 115] = 'elements.refresh-event-listeners',e[e['coverage.clear'] = 116] = 'coverage.clear',e[e['coverage.export'] = 117] = 'coverage.export',e[e.MaxValue = 118] = 'MaxValue'
}(z || (z = {})), function (e) {
  e[e['apply-custom-stylesheet'] = 0] = 'apply-custom-stylesheet', e[e['capture-node-creation-stacks'] = 1] = 'capture-node-creation-stacks', e[e['live-heap-profile'] = 11] = 'live-heap-profile', e[e['protocol-monitor'] = 13] = 'protocol-monitor', e[e['sampling-heap-profiler-timeline'] = 17] = 'sampling-heap-profiler-timeline', e[e['show-option-tp-expose-internals-in-heap-snapshot'] = 18] = 'show-option-tp-expose-internals-in-heap-snapshot', e[e['timeline-invalidation-tracking'] = 26] = 'timeline-invalidation-tracking', e[e['timeline-show-all-events'] = 27] = 'timeline-show-all-events', e[e['timeline-v8-runtime-call-stats'] = 28] = 'timeline-v8-runtime-call-stats', e[e.apca = 39] = 'apca', e[e['font-editor'] = 41] = 'font-editor', e[e['full-accessibility-tree'] = 42] = 'full-accessibility-tree', e[e['contrast-issues'] = 44] = 'contrast-issues', e[e['experimental-cookie-features'] = 45] = 'experimental-cookie-features', e[e['styles-pane-css-changes'] = 55] = 'styles-pane-css-changes', e[e['instrumentation-breakpoints'] = 61] = 'instrumentation-breakpoints', e[e['authored-deployed-grouping'] = 63] = 'authored-deployed-grouping', e[e['important-dom-properties'] = 64] = 'important-dom-properties', e[e['just-my-code'] = 65] = 'just-my-code', e[e['preloading-status-panel'] = 68] = 'preloading-status-panel', e[e['outermost-target-selector'] = 71] = 'outermost-target-selector', e[e['highlight-errors-elements-panel'] = 73] = 'highlight-errors-elements-panel', e[e['use-source-map-scopes'] = 76] = 'use-source-map-scopes', e[e['network-panel-filter-bar-redesign'] = 79] = 'network-panel-filter-bar-redesign', e[e['autofill-view'] = 82] = 'autofill-view', e[e['sources-frame-indentation-markers-temporarily-disable'] = 83] = 'sources-frame-indentation-markers-temporarily-disable', e[e['css-type-component-length-deprecate'] = 85] = 'css-type-component-length-deprecate', e[e['timeline-show-postmessage-events'] = 86] = 'timeline-show-postmessage-events', e[e['timeline-enhanced-traces'] = 90] = 'timeline-enhanced-traces', e[e['timeline-compiled-sources'] = 91] = 'timeline-compiled-sources', e[e['timeline-debug-mode'] = 93] = 'timeline-debug-mode', e[e['perf-panel-annotations'] = 94] = 'perf-panel-annotations', e[e['timeline-rpp-sidebar'] = 95] = 'timeline-rpp-sidebar', e[e['timeline-observations'] = 96] = 'timeline-observations', e[e['gen-ai-settings-panel'] = 97] = 'gen-ai-settings-panel', e[e['timeline-server-timings'] = 98] = 'timeline-server-timings', e[e.MaxValue = 99] = 'MaxValue'
}(X || (X = {})), function (e) {
  e[e.CrossOriginEmbedderPolicy = 0] = 'CrossOriginEmbedderPolicy', e[e.MixedContent = 1] = 'MixedContent', e[e.SameSiteCookie = 2] = 'SameSiteCookie', e[e.HeavyAd = 3] = 'HeavyAd', e[e.ContentSecurityPolicy = 4] = 'ContentSecurityPolicy', e[e.Other = 5] = 'Other', e[e.Generic = 6] = 'Generic', e[e.ThirdPartyPhaseoutCookie = 7] = 'ThirdPartyPhaseoutCookie', e[e.GenericCookie = 8] = 'GenericCookie', e[e.MaxValue = 9] = 'MaxValue'
}(K || (K = {})), function (e) {
  e[e.CrossOriginEmbedderPolicyRequest = 0] = 'CrossOriginEmbedderPolicyRequest', e[e.CrossOriginEmbedderPolicyElement = 1] = 'CrossOriginEmbedderPolicyElement', e[e.MixedContentRequest = 2] = 'MixedContentRequest', e[e.SameSiteCookieCookie = 3] = 'SameSiteCookieCookie', e[e.SameSiteCookieRequest = 4] = 'SameSiteCookieRequest', e[e.HeavyAdElement = 5] = 'HeavyAdElement', e[e.ContentSecurityPolicyDirective = 6] = 'ContentSecurityPolicyDirective', e[e.ContentSecurityPolicyElement = 7] = 'ContentSecurityPolicyElement', e[e.MaxValue = 13] = 'MaxValue'
}(J || (J = {})), function (e) {
  e[e.MixedContentIssue = 0] = 'MixedContentIssue', e[e['ContentSecurityPolicyIssue::kInlineViolation'] = 1] = 'ContentSecurityPolicyIssue::kInlineViolation', e[e['ContentSecurityPolicyIssue::kEvalViolation'] = 2] = 'ContentSecurityPolicyIssue::kEvalViolation', e[e['ContentSecurityPolicyIssue::kURLViolation'] = 3] = 'ContentSecurityPolicyIssue::kURLViolation', e[e['ContentSecurityPolicyIssue::kTrustedTypesSinkViolation'] = 4] = 'ContentSecurityPolicyIssue::kTrustedTypesSinkViolation', e[e['ContentSecurityPolicyIssue::kTrustedTypesPolicyViolation'] = 5] = 'ContentSecurityPolicyIssue::kTrustedTypesPolicyViolation', e[e['HeavyAdIssue::NetworkTotalLimit'] = 6] = 'HeavyAdIssue::NetworkTotalLimit', e[e['HeavyAdIssue::CpuTotalLimit'] = 7] = 'HeavyAdIssue::CpuTotalLimit', e[e['HeavyAdIssue::CpuPeakLimit'] = 8] = 'HeavyAdIssue::CpuPeakLimit', e[e['CrossOriginEmbedderPolicyIssue::CoepFrameResourceNeedsCoepHeader'] = 9] = 'CrossOriginEmbedderPolicyIssue::CoepFrameResourceNeedsCoepHeader', e[e['CrossOriginEmbedderPolicyIssue::CoopSandboxedIFrameCannotNavigateToCoopPage'] = 10] = 'CrossOriginEmbedderPolicyIssue::CoopSandboxedIFrameCannotNavigateToCoopPage', e[e['CrossOriginEmbedderPolicyIssue::CorpNotSameOrigin'] = 11] = 'CrossOriginEmbedderPolicyIssue::CorpNotSameOrigin', e[e['CrossOriginEmbedderPolicyIssue::CorpNotSameOriginAfterDefaultedToSameOriginByCoep'] = 12] = 'CrossOriginEmbedderPolicyIssue::CorpNotSameOriginAfterDefaultedToSameOriginByCoep', e[e['CrossOriginEmbedderPolicyIssue::CorpNotSameSite'] = 13] = 'CrossOriginEmbedderPolicyIssue::CorpNotSameSite', e[e['CookieIssue::ExcludeSameSiteNoneInsecure::ReadCookie'] = 14] = 'CookieIssue::ExcludeSameSiteNoneInsecure::ReadCookie', e[e['CookieIssue::ExcludeSameSiteNoneInsecure::SetCookie'] = 15] = 'CookieIssue::ExcludeSameSiteNoneInsecure::SetCookie', e[e['CookieIssue::WarnSameSiteNoneInsecure::ReadCookie'] = 16] = 'CookieIssue::WarnSameSiteNoneInsecure::ReadCookie', e[e['CookieIssue::WarnSameSiteNoneInsecure::SetCookie'] = 17] = 'CookieIssue::WarnSameSiteNoneInsecure::SetCookie', e[e['CookieIssue::WarnSameSiteStrictLaxDowngradeStrict::Secure'] = 18] = 'CookieIssue::WarnSameSiteStrictLaxDowngradeStrict::Secure', e[e['CookieIssue::WarnSameSiteStrictLaxDowngradeStrict::Insecure'] = 19] = 'CookieIssue::WarnSameSiteStrictLaxDowngradeStrict::Insecure', e[e['CookieIssue::WarnCrossDowngrade::ReadCookie::Secure'] = 20] = 'CookieIssue::WarnCrossDowngrade::ReadCookie::Secure', e[e['CookieIssue::WarnCrossDowngrade::ReadCookie::Insecure'] = 21] = 'CookieIssue::WarnCrossDowngrade::ReadCookie::Insecure', e[e['CookieIssue::WarnCrossDowngrade::SetCookie::Secure'] = 22] = 'CookieIssue::WarnCrossDowngrade::SetCookie::Secure', e[e['CookieIssue::WarnCrossDowngrade::SetCookie::Insecure'] = 23] = 'CookieIssue::WarnCrossDowngrade::SetCookie::Insecure', e[e['CookieIssue::ExcludeNavigationContextDowngrade::Secure'] = 24] = 'CookieIssue::ExcludeNavigationContextDowngrade::Secure', e[e['CookieIssue::ExcludeNavigationContextDowngrade::Insecure'] = 25] = 'CookieIssue::ExcludeNavigationContextDowngrade::Insecure', e[e['CookieIssue::ExcludeContextDowngrade::ReadCookie::Secure'] = 26] = 'CookieIssue::ExcludeContextDowngrade::ReadCookie::Secure', e[e['CookieIssue::ExcludeContextDowngrade::ReadCookie::Insecure'] = 27] = 'CookieIssue::ExcludeContextDowngrade::ReadCookie::Insecure', e[e['CookieIssue::ExcludeContextDowngrade::SetCookie::Secure'] = 28] = 'CookieIssue::ExcludeContextDowngrade::SetCookie::Secure', e[e['CookieIssue::ExcludeContextDowngrade::SetCookie::Insecure'] = 29] = 'CookieIssue::ExcludeContextDowngrade::SetCookie::Insecure', e[e['CookieIssue::ExcludeSameSiteUnspecifiedTreatedAsLax::ReadCookie'] = 30] = 'CookieIssue::ExcludeSameSiteUnspecifiedTreatedAsLax::ReadCookie', e[e['CookieIssue::ExcludeSameSiteUnspecifiedTreatedAsLax::SetCookie'] = 31] = 'CookieIssue::ExcludeSameSiteUnspecifiedTreatedAsLax::SetCookie', e[e['CookieIssue::WarnSameSiteUnspecifiedLaxAllowUnsafe::ReadCookie'] = 32] = 'CookieIssue::WarnSameSiteUnspecifiedLaxAllowUnsafe::ReadCookie', e[e['CookieIssue::WarnSameSiteUnspecifiedLaxAllowUnsafe::SetCookie'] = 33] = 'CookieIssue::WarnSameSiteUnspecifiedLaxAllowUnsafe::SetCookie', e[e['CookieIssue::WarnSameSiteUnspecifiedCrossSiteContext::ReadCookie'] = 34] = 'CookieIssue::WarnSameSiteUnspecifiedCrossSiteContext::ReadCookie', e[e['CookieIssue::WarnSameSiteUnspecifiedCrossSiteContext::SetCookie'] = 35] = 'CookieIssue::WarnSameSiteUnspecifiedCrossSiteContext::SetCookie', e[e['SharedArrayBufferIssue::TransferIssue'] = 36] = 'SharedArrayBufferIssue::TransferIssue', e[e['SharedArrayBufferIssue::CreationIssue'] = 37] = 'SharedArrayBufferIssue::CreationIssue', e[e.LowTextContrastIssue = 41] = 'LowTextContrastIssue', e[e['CorsIssue::InsecurePrivateNetwork'] = 42] = 'CorsIssue::InsecurePrivateNetwork', e[e['CorsIssue::InvalidHeaders'] = 44] = 'CorsIssue::InvalidHeaders', e[e['CorsIssue::WildcardOriginWithCredentials'] = 45] = 'CorsIssue::WildcardOriginWithCredentials', e[e['CorsIssue::PreflightResponseInvalid'] = 46] = 'CorsIssue::PreflightResponseInvalid', e[e['CorsIssue::OriginMismatch'] = 47] = 'CorsIssue::OriginMismatch', e[e['CorsIssue::AllowCredentialsRequired'] = 48] = 'CorsIssue::AllowCredentialsRequired', e[e['CorsIssue::MethodDisallowedByPreflightResponse'] = 49] = 'CorsIssue::MethodDisallowedByPreflightResponse', e[e['CorsIssue::HeaderDisallowedByPreflightResponse'] = 50] = 'CorsIssue::HeaderDisallowedByPreflightResponse', e[e['CorsIssue::RedirectContainsCredentials'] = 51] = 'CorsIssue::RedirectContainsCredentials', e[e['CorsIssue::DisallowedByMode'] = 52] = 'CorsIssue::DisallowedByMode', e[e['CorsIssue::CorsDisabledScheme'] = 53] = 'CorsIssue::CorsDisabledScheme', e[e['CorsIssue::PreflightMissingAllowExternal'] = 54] = 'CorsIssue::PreflightMissingAllowExternal', e[e['CorsIssue::PreflightInvalidAllowExternal'] = 55] = 'CorsIssue::PreflightInvalidAllowExternal', e[e['CorsIssue::NoCorsRedirectModeNotFollow'] = 57] = 'CorsIssue::NoCorsRedirectModeNotFollow', e[e['QuirksModeIssue::QuirksMode'] = 58] = 'QuirksModeIssue::QuirksMode', e[e['QuirksModeIssue::LimitedQuirksMode'] = 59] = 'QuirksModeIssue::LimitedQuirksMode', e[e.DeprecationIssue = 60] = 'DeprecationIssue', e[e['ClientHintIssue::MetaTagAllowListInvalidOrigin'] = 61] = 'ClientHintIssue::MetaTagAllowListInvalidOrigin', e[e['ClientHintIssue::MetaTagModifiedHTML'] = 62] = 'ClientHintIssue::MetaTagModifiedHTML', e[e['CorsIssue::PreflightAllowPrivateNetworkError'] = 63] = 'CorsIssue::PreflightAllowPrivateNetworkError', e[e['GenericIssue::CrossOriginPortalPostMessageError'] = 64] = 'GenericIssue::CrossOriginPortalPostMessageError', e[e['GenericIssue::FormLabelForNameError'] = 65] = 'GenericIssue::FormLabelForNameError', e[e['GenericIssue::FormDuplicateIdForInputError'] = 66] = 'GenericIssue::FormDuplicateIdForInputError', e[e['GenericIssue::FormInputWithNoLabelError'] = 67] = 'GenericIssue::FormInputWithNoLabelError', e[e['GenericIssue::FormAutocompleteAttributeEmptyError'] = 68] = 'GenericIssue::FormAutocompleteAttributeEmptyError', e[e['GenericIssue::FormEmptyIdAndNameAttributesForInputError'] = 69] = 'GenericIssue::FormEmptyIdAndNameAttributesForInputError', e[e['GenericIssue::FormAriaLabelledByToNonExistingId'] = 70] = 'GenericIssue::FormAriaLabelledByToNonExistingId', e[e['GenericIssue::FormInputAssignedAutocompleteValueToIdOrNameAttributeError'] = 71] = 'GenericIssue::FormInputAssignedAutocompleteValueToIdOrNameAttributeError', e[e['GenericIssue::FormLabelHasNeitherForNorNestedInput'] = 72] = 'GenericIssue::FormLabelHasNeitherForNorNestedInput', e[e['GenericIssue::FormLabelForMatchesNonExistingIdError'] = 73] = 'GenericIssue::FormLabelForMatchesNonExistingIdError', e[e['GenericIssue::FormHasPasswordFieldWithoutUsernameFieldError'] = 74] = 'GenericIssue::FormHasPasswordFieldWithoutUsernameFieldError', e[e['GenericIssue::FormInputHasWrongButWellIntendedAutocompleteValueError'] = 75] = 'GenericIssue::FormInputHasWrongButWellIntendedAutocompleteValueError', e[e['StylesheetLoadingIssue::LateImportRule'] = 76] = 'StylesheetLoadingIssue::LateImportRule', e[e['StylesheetLoadingIssue::RequestFailed'] = 77] = 'StylesheetLoadingIssue::RequestFailed', e[e['CorsIssue::PreflightMissingPrivateNetworkAccessId'] = 78] = 'CorsIssue::PreflightMissingPrivateNetworkAccessId', e[e['CorsIssue::PreflightMissingPrivateNetworkAccessName'] = 79] = 'CorsIssue::PreflightMissingPrivateNetworkAccessName', e[e['CorsIssue::PrivateNetworkAccessPermissionUnavailable'] = 80] = 'CorsIssue::PrivateNetworkAccessPermissionUnavailable', e[e['CorsIssue::PrivateNetworkAccessPermissionDenied'] = 81] = 'CorsIssue::PrivateNetworkAccessPermissionDenied', e[e['CookieIssue::WarnThirdPartyPhaseout::ReadCookie'] = 82] = 'CookieIssue::WarnThirdPartyPhaseout::ReadCookie', e[e['CookieIssue::WarnThirdPartyPhaseout::SetCookie'] = 83] = 'CookieIssue::WarnThirdPartyPhaseout::SetCookie', e[e['CookieIssue::ExcludeThirdPartyPhaseout::ReadCookie'] = 84] = 'CookieIssue::ExcludeThirdPartyPhaseout::ReadCookie', e[e['CookieIssue::ExcludeThirdPartyPhaseout::SetCookie'] = 85] = 'CookieIssue::ExcludeThirdPartyPhaseout::SetCookie', e[e.MaxValue = 86] = 'MaxValue'
}(Q || (Q = {})), function (e) {
  e[e.all = 0] = 'all', e[e.Document = 1] = 'Document', e[e.JavaScript = 2] = 'JavaScript', e[e['Fetch and XHR'] = 3] = 'Fetch and XHR', e[e.CSS = 4] = 'CSS', e[e.Font = 5] = 'Font', e[e.Image = 6] = 'Image', e[e.Media = 7] = 'Media', e[e.Manifest = 8] = 'Manifest', e[e.WebSocket = 9] = 'WebSocket', e[e.WebAssembly = 10] = 'WebAssembly', e[e.Other = 11] = 'Other', e[e.MaxValue = 12] = 'MaxValue'
}(Y || (Y = {})), function (e) {
  e[e['Hide data URLs'] = 0] = 'Hide data URLs', e[e['Hide extension URLs'] = 1] = 'Hide extension URLs', e[e['Blocked response cookies'] = 2] = 'Blocked response cookies', e[e['Blocked requests'] = 3] = 'Blocked requests', e[e['3rd-party requests'] = 4] = '3rd-party requests', e[e.MaxValue = 5] = 'MaxValue'
}($ || ($ = {})), function (e) {
  e[e.af = 1] = 'af', e[e.am = 2] = 'am', e[e.ar = 3] = 'ar', e[e.as = 4] = 'as', e[e.az = 5] = 'az', e[e.be = 6] = 'be', e[e.bg = 7] = 'bg', e[e.bn = 8] = 'bn', e[e.bs = 9] = 'bs', e[e.ca = 10] = 'ca', e[e.cs = 11] = 'cs', e[e.cy = 12] = 'cy', e[e.da = 13] = 'da', e[e.de = 14] = 'de', e[e.el = 15] = 'el', e[e['en-GB'] = 16] = 'en-GB', e[e['en-US'] = 17] = 'en-US', e[e['es-419'] = 18] = 'es-419', e[e.es = 19] = 'es', e[e.et = 20] = 'et', e[e.eu = 21] = 'eu', e[e.fa = 22] = 'fa', e[e.fi = 23] = 'fi', e[e.fil = 24] = 'fil', e[e['fr-CA'] = 25] = 'fr-CA', e[e.fr = 26] = 'fr', e[e.gl = 27] = 'gl', e[e.gu = 28] = 'gu', e[e.he = 29] = 'he', e[e.hi = 30] = 'hi', e[e.hr = 31] = 'hr', e[e.hu = 32] = 'hu', e[e.hy = 33] = 'hy', e[e.id = 34] = 'id', e[e.is = 35] = 'is', e[e.it = 36] = 'it', e[e.ja = 37] = 'ja', e[e.ka = 38] = 'ka', e[e.kk = 39] = 'kk', e[e.km = 40] = 'km', e[e.kn = 41] = 'kn', e[e.ko = 42] = 'ko', e[e.ky = 43] = 'ky', e[e.lo = 44] = 'lo', e[e.lt = 45] = 'lt', e[e.lv = 46] = 'lv', e[e.mk = 47] = 'mk', e[e.ml = 48] = 'ml', e[e.mn = 49] = 'mn', e[e.mr = 50] = 'mr', e[e.ms = 51] = 'ms', e[e.my = 52] = 'my', e[e.ne = 53] = 'ne', e[e.nl = 54] = 'nl', e[e.no = 55] = 'no', e[e.or = 56] = 'or', e[e.pa = 57] = 'pa', e[e.pl = 58] = 'pl', e[e['pt-PT'] = 59] = 'pt-PT', e[e.pt = 60] = 'pt', e[e.ro = 61] = 'ro', e[e.ru = 62] = 'ru', e[e.si = 63] = 'si', e[e.sk = 64] = 'sk', e[e.sl = 65] = 'sl', e[e.sq = 66] = 'sq', e[e['sr-Latn'] = 67] = 'sr-Latn', e[e.sr = 68] = 'sr', e[e.sv = 69] = 'sv', e[e.sw = 70] = 'sw', e[e.ta = 71] = 'ta', e[e.te = 72] = 'te', e[e.th = 73] = 'th', e[e.tr = 74] = 'tr', e[e.uk = 75] = 'uk', e[e.ur = 76] = 'ur', e[e.uz = 77] = 'uz', e[e.vi = 78] = 'vi', e[e.zh = 79] = 'zh', e[e['zh-HK'] = 80] = 'zh-HK', e[e['zh-TW'] = 81] = 'zh-TW', e[e.zu = 82] = 'zu', e[e.MaxValue = 83] = 'MaxValue'
}(Z || (Z = {})), function (e) {
  e[e.OtherSection = 0] = 'OtherSection', e[e.Identity = 1] = 'Identity', e[e.Presentation = 2] = 'Presentation', e[e['Protocol Handlers'] = 3] = 'Protocol Handlers', e[e.Icons = 4] = 'Icons', e[e['Window Controls Overlay'] = 5] = 'Window Controls Overlay', e[e.MaxValue = 6] = 'MaxValue'
}(ee || (ee = {}));
var te = Object.freeze({
  __proto__: null, UserMetrics: oe, get Action() {
    return U
  }, get PanelCodes() {
    return W
  }, get PanelWithLocation() {
    return V
  }, get ElementsSidebarTabCodes() {
    return B
  }, get SourcesSidebarTabCodes() {
    return j
  }, get MediaTypes() {
    return G
  }, get KeybindSetSettings() {
    return q
  }, get KeyboardShortcutAction() {
    return z
  }, get DevtoolsExperiments() {
    return X
  }, get IssueExpanded() {
    return K
  }, get IssueResourceOpened() {
    return J
  }, get IssueCreated() {
    return Q
  }, get ResourceType() {
    return Y
  }, get NetworkPanelMoreFilters() {
    return $
  }, get Language() {
    return Z
  }, get ManifestSectionCodes() {
    return ee
  }
});
const ne = new oe;
export {
  O as AidaClient,
  R as InspectorFrontendHost,
  i as InspectorFrontendHostAPI,
  re as Platform,
  S as ResourceLoader,
  te as UserMetrics,
  ne as userMetrics
};
