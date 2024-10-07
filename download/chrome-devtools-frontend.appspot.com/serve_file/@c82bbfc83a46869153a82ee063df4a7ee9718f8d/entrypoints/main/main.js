import *as e from '../../core/sdk/sdk.js';
import *as t from '../../core/common/common.js';
import *as n from '../../core/host/host.js';
import *as o from '../../core/i18n/i18n.js';
import *as r from '../../core/platform/platform.js';
import *as s from '../../core/protocol_client/protocol_client.js';
import *as i from '../../core/root/root.js';
import *as a from '../../models/autofill_manager/autofill_manager.js';
import *as l from '../../models/bindings/bindings.js';
import *as c from '../../models/breakpoints/breakpoints.js';
import *as d from '../../models/crux-manager/crux-manager.js';
import *as g from '../../models/extensions/extensions.js';
import *as m from '../../models/issues_manager/issues_manager.js';
import *as p from '../../models/live-metrics/live-metrics.js';
import *as u from '../../models/logs/logs.js';
import *as h from '../../models/persistence/persistence.js';
import *as f from '../../models/workspace/workspace.js';
import *as w from '../../panels/snippets/snippets.js';
import *as S from '../../ui/components/icon_button/icon_button.js';
import *as v from '../../ui/legacy/components/utils/utils.js';
import *as x from '../../ui/legacy/legacy.js';
import *as b from '../../ui/legacy/theme_support/theme_support.js';
import *as C from '../../ui/visual_logging/visual_logging.js';

class M {
  #e;
  #t;
  #n;
  #o;

  constructor(t, n) {
    n.addFlavorChangeListener(e.RuntimeModel.ExecutionContext, this.#r, this), n.addFlavorChangeListener(e.Target.Target, this.#s, this), t.addModelListener(e.RuntimeModel.RuntimeModel, e.RuntimeModel.Events.ExecutionContextCreated, this.#i, this), t.addModelListener(e.RuntimeModel.RuntimeModel, e.RuntimeModel.Events.ExecutionContextDestroyed, this.#a, this), t.addModelListener(e.RuntimeModel.RuntimeModel, e.RuntimeModel.Events.ExecutionContextOrderChanged, this.#l, this), this.#e = t, this.#t = n, t.observeModels(e.RuntimeModel.RuntimeModel, this)
  }

  modelAdded(t) {
    queueMicrotask(function () {
      this.#t.flavor(e.Target.Target) || this.#t.setFlavor(e.Target.Target, t.target())
    }.bind(this))
  }

  modelRemoved(t) {
    const n = this.#t.flavor(e.RuntimeModel.ExecutionContext);
    n && n.runtimeModel === t && this.#c();
    const o = this.#e.models(e.RuntimeModel.RuntimeModel);
    this.#t.flavor(e.Target.Target) === t.target() && o.length && this.#t.setFlavor(e.Target.Target, o[0].target())
  }

  #r({ data: t }) {
    t && (this.#t.setFlavor(e.Target.Target, t.target()), this.#o || (this.#n = this.#d(t)))
  }

  #d(e) {
    return e.isDefault ? e.target().name() + ':' + e.frameId : ''
  }

  #s({ data: t }) {
    const n = this.#t.flavor(e.RuntimeModel.ExecutionContext);
    if (!t || n && n.target() === t) return;
    const o = t.model(e.RuntimeModel.RuntimeModel), r = o ? o.executionContexts() : [];
    if (!r.length) return;
    let s = null;
    for (let e = 0; e < r.length && !s; ++e) this.#g(r[e]) && (s = r[e]);
    for (let e = 0; e < r.length && !s; ++e) this.#m(r[e]) && (s = r[e]);
    this.#o = !0, this.#t.setFlavor(e.RuntimeModel.ExecutionContext, s || r[0]), this.#o = !1
  }

  #g(e) {
    return !e.target().targetInfo()?.subtype && (!(!this.#n || this.#n !== this.#d(e)) || !this.#n && this.#m(e))
  }

  #m(t) {
    if (!t.isDefault || !t.frameId) return !1;
    if (t.target().parentTarget()?.type() === e.Target.Type.Frame) return !1;
    const n = t.target().model(e.ResourceTreeModel.ResourceTreeModel), o = n && n.frameForId(t.frameId);
    return Boolean(o?.isOutermostFrame())
  }

  #i(e) {
    this.#p(e.data)
  }

  #a(t) {
    const n = t.data;
    this.#t.flavor(e.RuntimeModel.ExecutionContext) === n && this.#c()
  }

  #l(e) {
    const t = e.data.executionContexts();
    for (let e = 0; e < t.length && !this.#p(t[e]); e++) ;
  }

  #p(t) {
    return !(this.#t.flavor(e.RuntimeModel.ExecutionContext) && !this.#g(t)) && (this.#o = !0, this.#t.setFlavor(e.RuntimeModel.ExecutionContext, t), this.#o = !1, !0)
  }

  #c() {
    const t = this.#e.models(e.RuntimeModel.RuntimeModel);
    let n = null;
    for (let e = 0; e < t.length && !n; ++e) {
      const o = t[e].executionContexts();
      for (const e of o) if (this.#m(e)) {
        n = e;
        break
      }
    }
    if (!n) for (let e = 0; e < t.length && !n; ++e) {
      const o = t[e].executionContexts();
      if (o.length) {
        n = o[0];
        break
      }
    }
    this.#o = !0, this.#t.setFlavor(e.RuntimeModel.ExecutionContext, n), this.#o = !1
  }
}

var I = Object.freeze({ __proto__: null, ExecutionContextSelector: M });
const T = 'console-insights-toggled', k = 'console-insights-enabled';

class R {
  constructor() {
    this.#u(), this.#h()
  }

  #f() {
    this.#w(k)?.get() && t.Settings.Settings.instance().createLocalSetting('console-insights-onboarding-finished', !1).set(!1), t.Settings.Settings.instance().createLocalSetting(T, !1).set(!0)
  }

  #h() {
    this.#w(k)?.addChangeListener(this.#f, this)
  }

  dispose() {
    this.#w(k)?.removeChangeListener(this.#f, this)
  }

  #w(e) {
    try {
      return t.Settings.moduleSetting(e)
    } catch {
      return
    }
  }

  #u() {
    const e = t.Settings.Settings.instance().createLocalSetting(T, !1), n = this.#w(k);
    e.get() || n?.set(!0)
  }
}

var y = Object.freeze({ __proto__: null, SettingTracker: R });
const E = {
  customizeAndControlDevtools: 'Customize and control DevTools',
  dockSide: 'Dock side',
  placementOfDevtoolsRelativeToThe: 'Placement of DevTools relative to the page. ({PH1} to restore last position)',
  undockIntoSeparateWindow: 'Undock into separate window',
  dockToBottom: 'Dock to bottom',
  dockToRight: 'Dock to right',
  dockToLeft: 'Dock to left',
  focusDebuggee: 'Focus page',
  hideConsoleDrawer: 'Hide console drawer',
  showConsoleDrawer: 'Show console drawer',
  moreTools: 'More tools',
  help: 'Help',
  dockSideNaviation: 'Use left and right arrow keys to navigate the options'
}, D = o.i18n.registerUIStrings('entrypoints/main/MainImpl.ts', E), F = o.i18n.getLocalizedString.bind(void 0, D);

class P {
  #S;
  #v;
  #x;

  constructor() {
    P.instanceForTest = this, this.#v = new Promise((e => {
      this.#x = e
    })), this.#b()
  }

  static time(e) {
    n.InspectorFrontendHost.isUnderTest() || console.time(e)
  }

  static timeEnd(e) {
    n.InspectorFrontendHost.isUnderTest() || console.timeEnd(e)
  }

  async #b() {
    console.timeStamp('Main._loaded'), i.Runtime.Runtime.setPlatform(n.Platform.platform());
    const e = new Promise((e => {
      n.InspectorFrontendHost.InspectorFrontendHostInstance.getPreferences(e)
    })), o = new Promise((e => {
      n.InspectorFrontendHost.InspectorFrontendHostInstance.getHostConfig(e)
    })), [r, s] = await Promise.all([e, o]);
    console.timeStamp('Main._gotPreferences'), this.#C(), this.createSettings(r, s), await this.requestAndRegisterLocaleData(), n.userMetrics.syncSetting(t.Settings.Settings.instance().moduleSetting('sync-preferences').get());
    const a = t.Settings.Settings.instance().getHostConfig()?.devToolsVeLogging;
    if (a?.enabled) if (a?.testing) {
      C.setVeDebugLoggingEnabled(!0, C.DebugLoggingFormat.Test);
      const e = {
        processingThrottler: new t.Throttler.Throttler(0),
        keyboardLogThrottler: new t.Throttler.Throttler(10),
        hoverLogThrottler: new t.Throttler.Throttler(50),
        dragLogThrottler: new t.Throttler.Throttler(50),
        clickLogThrottler: new t.Throttler.Throttler(10),
        resizeLogThrottler: new t.Throttler.Throttler(10)
      };
      C.startLogging(e)
    } else C.startLogging();
    this.#M()
  }

  #C() {
    self.Extensions ||= {}, self.Host ||= {}, self.Host.userMetrics ||= n.userMetrics, self.Host.UserMetrics ||= n.UserMetrics, self.ProtocolClient ||= {}, self.ProtocolClient.test ||= s.InspectorBackend.test
  }

  async requestAndRegisterLocaleData() {
    const e = t.Settings.Settings.instance().moduleSetting('language').get(),
      r = o.DevToolsLocale.DevToolsLocale.instance({
        create: !0,
        data: {
          navigatorLanguage: navigator.language,
          settingLanguage: e,
          lookupClosestDevToolsLocale: o.i18n.lookupClosestSupportedDevToolsLocale
        }
      });
    n.userMetrics.language(r.locale), 'en-US' !== r.locale && await o.i18n.fetchAndRegisterLocaleData('en-US');
    try {
      await o.i18n.fetchAndRegisterLocaleData(r.locale)
    } catch (e) {
      console.warn(`Unable to fetch & register locale data for '${r.locale}', falling back to 'en-US'. Cause: `, e), r.forceFallbackLocale()
    }
  }

  createSettings(e, o) {
    this.#I();
    let r, s = '';
    if (n.Platform.isCustomDevtoolsFrontend() ? s = '__custom__' : i.Runtime.Runtime.queryParam('can_dock') || !Boolean(i.Runtime.Runtime.queryParam('debugFrontend')) || n.InspectorFrontendHost.isUnderTest() || (s = '__bundled__'), !n.InspectorFrontendHost.isUnderTest() && window.localStorage) {
      const e = { ...t.Settings.NOOP_STORAGE, clear: () => window.localStorage.clear() };
      r = new t.Settings.SettingsStorage(window.localStorage, e, s)
    } else r = new t.Settings.SettingsStorage({}, t.Settings.NOOP_STORAGE, s);
    const a = {
      register: e => n.InspectorFrontendHost.InspectorFrontendHostInstance.registerPreference(e, { synced: !1 }),
      set: n.InspectorFrontendHost.InspectorFrontendHostInstance.setPreference,
      get: e => new Promise((t => {
        n.InspectorFrontendHost.InspectorFrontendHostInstance.getPreference(e, t)
      })),
      remove: n.InspectorFrontendHost.InspectorFrontendHostInstance.removePreference,
      clear: n.InspectorFrontendHost.InspectorFrontendHostInstance.clearPreferences
    }, l = {
      ...a,
      register: e => n.InspectorFrontendHost.InspectorFrontendHostInstance.registerPreference(e, { synced: !0 })
    }, c = new t.Settings.SettingsStorage(e, l, s), d = new t.Settings.SettingsStorage(e, a, s);
    t.Settings.Settings.instance({
      forceNew: !0,
      syncedStorage: c,
      globalStorage: d,
      localStorage: r,
      config: o
    }), new R, n.InspectorFrontendHost.isUnderTest() || (new t.Settings.VersionController).updateVersion()
  }

  #I() {
    i.Runtime.experiments.register('apply-custom-stylesheet', 'Allow extensions to load custom stylesheets'), i.Runtime.experiments.register('capture-node-creation-stacks', 'Capture node creation stacks'), i.Runtime.experiments.register('live-heap-profile', 'Live heap profile', !0), i.Runtime.experiments.register('protocol-monitor', 'Protocol Monitor', void 0, 'https://developer.chrome.com/blog/new-in-devtools-92/#protocol-monitor'), i.Runtime.experiments.register('sampling-heap-profiler-timeline', 'Sampling heap profiler timeline', !0), i.Runtime.experiments.register('show-option-tp-expose-internals-in-heap-snapshot', 'Show option to expose internals in heap snapshots'), i.Runtime.experiments.register('timeline-invalidation-tracking', 'Performance panel: invalidation tracking', !0), i.Runtime.experiments.register('timeline-show-all-events', 'Performance panel: show all events', !0), i.Runtime.experiments.register('timeline-v8-runtime-call-stats', 'Performance panel: V8 runtime call stats', !0), i.Runtime.experiments.register('timeline-enhanced-traces', 'Performance panel: Enable collecting enhanced traces', !0), i.Runtime.experiments.register('timeline-compiled-sources', 'Performance panel: Enable collecting source text for compiled script', !0), i.Runtime.experiments.register('timeline-debug-mode', 'Performance panel: Enable debug mode (trace event details, etc)', !0), i.Runtime.experiments.register('sources-frame-indentation-markers-temporarily-disable', 'Disable indentation markers temporarily', !1, 'https://developer.chrome.com/blog/new-in-devtools-121/#indentation', 'https://crbug.com/1479986'), i.Runtime.experiments.register('instrumentation-breakpoints', 'Enable instrumentation breakpoints', !0), i.Runtime.experiments.register('use-source-map-scopes', 'Use scope information from source maps', !0), i.Runtime.experiments.register('apca', 'Enable new Advanced Perceptual Contrast Algorithm (APCA) replacing previous contrast ratio and AA/AAA guidelines', void 0, 'https://developer.chrome.com/blog/new-in-devtools-89/#apca'), i.Runtime.experiments.register('full-accessibility-tree', 'Enable full accessibility tree view in the Elements panel', void 0, 'https://developer.chrome.com/blog/new-in-devtools-90/#accesibility-tree', 'https://g.co/devtools/a11y-tree-feedback'), i.Runtime.experiments.register('font-editor', 'Enable new font editor within the Styles tab', void 0, 'https://developer.chrome.com/blog/new-in-devtools-89/#font'), i.Runtime.experiments.register('contrast-issues', 'Enable automatic contrast issue reporting via the Issues panel', void 0, 'https://developer.chrome.com/blog/new-in-devtools-90/#low-contrast'), i.Runtime.experiments.register('experimental-cookie-features', 'Enable experimental cookie features'), i.Runtime.experiments.register('css-type-component-length-deprecate', 'Deprecate CSS <length> authoring tool in the Styles tab', void 0, 'https://goo.gle/devtools-deprecate-length-tools', 'https://crbug.com/1522657'), i.Runtime.experiments.register('styles-pane-css-changes', 'Sync CSS changes in the Styles tab'), i.Runtime.experiments.register('highlight-errors-elements-panel', 'Highlights a violating node or attribute in the Elements panel DOM tree'), i.Runtime.experiments.register('authored-deployed-grouping', 'Group sources into authored and deployed trees', void 0, 'https://goo.gle/authored-deployed', 'https://goo.gle/authored-deployed-feedback'), i.Runtime.experiments.register('just-my-code', 'Hide ignore-listed code in Sources tree view'), i.Runtime.experiments.register('important-dom-properties', 'Highlight important DOM properties in the Properties tab'), i.Runtime.experiments.register('preloading-status-panel', 'Enable speculative loads panel in Application panel', !0), i.Runtime.experiments.register('outermost-target-selector', 'Enable background page selector (for prerendering)', !1), i.Runtime.experiments.register('network-panel-filter-bar-redesign', 'Redesign of the filter bar in the Network panel', !1, 'https://goo.gle/devtools-network-filter-redesign', 'https://crbug.com/1500573'), i.Runtime.experiments.register('autofill-view', 'Autofill panel', !1, 'https://goo.gle/devtools-autofill-panel', 'https://crbug.com/329106326'), i.Runtime.experiments.register('timeline-show-postmessage-events', 'Performance panel: show postMessage dispatch and handling flows'), i.Runtime.experiments.register('perf-panel-annotations', 'Performance panel: enable annotations', !0), i.Runtime.experiments.register('timeline-rpp-sidebar', 'Performance panel: enable performance insights', !0), i.Runtime.experiments.register('timeline-observations', 'Performance panel: enable live metrics landing page'), i.Runtime.experiments.register('gen-ai-settings-panel', 'Dedicated panel for generative AI settings'), i.Runtime.experiments.register('timeline-server-timings', 'Performance panel: enable server timings in the timeline'), i.Runtime.experiments.enableExperimentsByDefault(['css-type-component-length-deprecate', 'outermost-target-selector', 'preloading-status-panel', 'autofill-view', 'timeline-observations', ...i.Runtime.Runtime.queryParam('isChromeForTesting') ? ['protocol-monitor'] : []]), i.Runtime.experiments.cleanUpStaleExperiments();
    const e = i.Runtime.Runtime.queryParam('enabledExperiments');
    if (e && i.Runtime.experiments.setServerEnabledExperiments(e.split(';')), i.Runtime.experiments.enableExperimentsTransiently([]), n.InspectorFrontendHost.isUnderTest()) {
      const e = i.Runtime.Runtime.queryParam('test');
      e && e.includes('live-line-level-heap-profile.js') && i.Runtime.experiments.enableForTest('live-heap-profile')
    }
    for (const e of i.Runtime.experiments.allConfigurableExperiments()) e.isEnabled() ? n.userMetrics.experimentEnabledAtLaunch(e.name) : n.userMetrics.experimentDisabledAtLaunch(e.name)
  }

  async #M() {
    P.time('Main._createAppUI'), h.IsolatedFileSystemManager.IsolatedFileSystemManager.instance();
    const o = t.Settings.Settings.instance().createSetting('ui-theme', 'systemPreferred');
    x.UIUtils.initializeUIUtils(document), b.ThemeSupport.hasInstance() || b.ThemeSupport.instance({
      forceNew: !0,
      setting: o
    }), x.UIUtils.addPlatformClass(document.documentElement), x.UIUtils.installComponentRootStyles(document.body), this.#T(document);
    const r = Boolean(i.Runtime.Runtime.queryParam('can_dock'));
    x.ZoomManager.ZoomManager.instance({
      forceNew: !0,
      win: window,
      frontendHost: n.InspectorFrontendHost.InspectorFrontendHostInstance
    }), x.ContextMenu.ContextMenu.initialize(), x.ContextMenu.ContextMenu.installHandler(document), u.NetworkLog.NetworkLog.instance(), e.FrameManager.FrameManager.instance(), u.LogManager.LogManager.instance(), m.IssuesManager.IssuesManager.instance({
      forceNew: !0,
      ensureFirst: !0,
      showThirdPartyIssuesSetting: m.Issue.getShowThirdPartyIssuesSetting(),
      hideIssueSetting: m.IssuesManager.getHideIssueByCodeSetting()
    }), m.ContrastCheckTrigger.ContrastCheckTrigger.instance(), x.DockController.DockController.instance({
      forceNew: !0,
      canDock: r
    }), e.NetworkManager.MultitargetNetworkManager.instance({ forceNew: !0 }), e.DOMDebuggerModel.DOMDebuggerManager.instance({ forceNew: !0 }), e.TargetManager.TargetManager.instance().addEventListener('SuspendStateChanged', this.#k.bind(this)), f.FileManager.FileManager.instance({ forceNew: !0 }), f.Workspace.WorkspaceImpl.instance(), l.NetworkProject.NetworkProjectManager.instance();
    const s = new l.ResourceMapping.ResourceMapping(e.TargetManager.TargetManager.instance(), f.Workspace.WorkspaceImpl.instance());
    new l.PresentationConsoleMessageHelper.PresentationConsoleMessageManager, l.CSSWorkspaceBinding.CSSWorkspaceBinding.instance({
      forceNew: !0,
      resourceMapping: s,
      targetManager: e.TargetManager.TargetManager.instance()
    }), l.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance({
      forceNew: !0,
      resourceMapping: s,
      targetManager: e.TargetManager.TargetManager.instance()
    }), e.TargetManager.TargetManager.instance().setScopeTarget(e.TargetManager.TargetManager.instance().primaryPageTarget()), x.Context.Context.instance().addFlavorChangeListener(e.Target.Target, (({ data: t }) => {
      const n = t?.outermostTarget();
      e.TargetManager.TargetManager.instance().setScopeTarget(n)
    })), c.BreakpointManager.BreakpointManager.instance({
      forceNew: !0,
      workspace: f.Workspace.WorkspaceImpl.instance(),
      targetManager: e.TargetManager.TargetManager.instance(),
      debuggerWorkspaceBinding: l.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance()
    }), self.Extensions.extensionServer = g.ExtensionServer.ExtensionServer.instance({ forceNew: !0 }), new h.FileSystemWorkspaceBinding.FileSystemWorkspaceBinding(h.IsolatedFileSystemManager.IsolatedFileSystemManager.instance(), f.Workspace.WorkspaceImpl.instance()), h.IsolatedFileSystemManager.IsolatedFileSystemManager.instance().addPlatformFileSystem('snippet://', new w.ScriptSnippetFileSystem.SnippetFileSystem), h.Persistence.PersistenceImpl.instance({
      forceNew: !0,
      workspace: f.Workspace.WorkspaceImpl.instance(),
      breakpointManager: c.BreakpointManager.BreakpointManager.instance()
    }), h.NetworkPersistenceManager.NetworkPersistenceManager.instance({
      forceNew: !0,
      workspace: f.Workspace.WorkspaceImpl.instance()
    }), new M(e.TargetManager.TargetManager.instance(), x.Context.Context.instance()), l.IgnoreListManager.IgnoreListManager.instance({
      forceNew: !0,
      debuggerWorkspaceBinding: l.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance()
    }), a.AutofillManager.AutofillManager.instance(), i.Runtime.experiments.isEnabled('timeline-observations') && (p.LiveMetrics.instance({ forceNew: !0 }), d.CrUXManager.instance({ forceNew: !0 })), new U;
    const S = x.ActionRegistry.ActionRegistry.instance({ forceNew: !0 });
    x.ShortcutRegistry.ShortcutRegistry.instance({
      forceNew: !0,
      actionRegistry: S
    }), this.#R(), P.timeEnd('Main._createAppUI');
    const v = t.AppProvider.getRegisteredAppProviders()[0];
    if (!v) throw new Error('Unable to boot DevTools, as the appprovider is missing');
    await this.#y(await v.loadAppProvider())
  }

  async #y(e) {
    P.time('Main._showAppUI');
    const t = e.createApp();
    if (x.DockController.DockController.instance().initialize(), b.ThemeSupport.instance().fetchColorsAndApplyHostTheme(), t.presentUI(document), x.ActionRegistry.ActionRegistry.instance().hasAction('elements.toggle-element-search')) {
      const e = x.ActionRegistry.ActionRegistry.instance().getAction('elements.toggle-element-search');
      n.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(n.InspectorFrontendHostAPI.Events.EnterInspectElementMode, (() => {
        e.execute()
      }), this)
    }
    n.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(n.InspectorFrontendHostAPI.Events.RevealSourceLine, this.#E, this), await x.InspectorView.InspectorView.instance().createToolbars(), n.InspectorFrontendHost.InspectorFrontendHostInstance.loadCompleted();
    const o = i.Runtime.Runtime.queryParam('loadTimelineFromURL');
    if (null !== o) {
      (await import('../../panels/timeline/timeline.js')).TimelinePanel.LoadTimelineHandler.instance().handleQueryParam(o)
    }
    x.ARIAUtils.getOrCreateAlertElements(), x.DockController.DockController.instance().announceDockLocation(), window.setTimeout(this.#D.bind(this), 0), P.timeEnd('Main._showAppUI')
  }

  async #D() {
    P.time('Main._initializeTarget');
    for (const e of t.Runnable.earlyInitializationRunnables()) await e().run();
    n.InspectorFrontendHost.InspectorFrontendHostInstance.readyForTest(), this.#x(), window.setTimeout(this.#F.bind(this), 100), P.timeEnd('Main._initializeTarget')
  }

  async #F() {
    P.time('Main._lateInitialization'), g.ExtensionServer.ExtensionServer.instance().initializeExtensions();
    const e = t.Runnable.lateInitializationRunnables().map((async e => (await e()).run()));
    if (i.Runtime.experiments.isEnabled('live-heap-profile')) {
      const n = await import('../../ui/legacy/components/perf_ui/perf_ui.js'), o = 'memory-live-heap-profile';
      if (t.Settings.Settings.instance().moduleSetting(o).get()) e.push(n.LiveHeapProfile.LiveHeapProfile.instance().run()); else {
        const e = async r => {
          r.data && (t.Settings.Settings.instance().moduleSetting(o).removeChangeListener(e), n.LiveHeapProfile.LiveHeapProfile.instance().run())
        };
        t.Settings.Settings.instance().moduleSetting(o).addChangeListener(e)
      }
    }
    this.#S = Promise.all(e).then((() => {
    })), P.timeEnd('Main._lateInitialization')
  }

  lateInitDonePromiseForTest() {
    return this.#S
  }

  readyForTest() {
    return this.#v
  }

  #R() {
    t.Console.Console.instance().addEventListener('messageAdded', (function ({ data: e }) {
      e.show && t.Console.Console.instance().show()
    }))
  }

  #E(e) {
    const { url: n, lineNumber: o, columnNumber: r } = e.data,
      s = f.Workspace.WorkspaceImpl.instance().uiSourceCodeForURL(n);
    s ? t.Revealer.reveal(s.uiLocation(o, r)) : f.Workspace.WorkspaceImpl.instance().addEventListener(f.Workspace.Events.UISourceCodeAdded, (function e(s) {
      const i = s.data;
      i.url() === n && (t.Revealer.reveal(i.uiLocation(o, r)), f.Workspace.WorkspaceImpl.instance().removeEventListener(f.Workspace.Events.UISourceCodeAdded, e))
    }))
  }

  #P(e) {
    e.handled || x.ShortcutRegistry.ShortcutRegistry.instance().handleShortcut(e)
  }

  #L(e) {
    const t = new CustomEvent('clipboard-' + e.type, { bubbles: !0 });
    t.original = e;
    const n = e.target && e.target.ownerDocument, o = n ? r.DOMUtilities.deepActiveElement(n) : null;
    o && o.dispatchEvent(t), t.handled && e.preventDefault()
  }

  #A(e) {
    (e.handled || e.target.classList.contains('popup-glasspane')) && e.preventDefault()
  }

  #T(e) {
    e.addEventListener('keydown', this.#P.bind(this), !1), e.addEventListener('beforecopy', this.#L.bind(this), !0), e.addEventListener('copy', this.#L.bind(this), !1), e.addEventListener('cut', this.#L.bind(this), !1), e.addEventListener('paste', this.#L.bind(this), !1), e.addEventListener('contextmenu', this.#A.bind(this), !0)
  }

  #k() {
    const t = e.TargetManager.TargetManager.instance().allTargetsSuspended();
    x.InspectorView.InspectorView.instance().onSuspendStateChanged(t)
  }

  static instanceForTest = null
}

globalThis.Main = globalThis.Main || {}, globalThis.Main.Main = P;
let L, A;

class H {
  #H;

  constructor() {
    this.#H = new x.Toolbar.ToolbarMenuButton(this.#_.bind(this), !0, !0, 'main-menu', 'dots-vertical'), this.#H.element.classList.add('main-menu'), this.#H.setTitle(F(E.customizeAndControlDevtools))
  }

  static instance(e = { forceNew: null }) {
    const { forceNew: t } = e;
    return L && !t || (L = new H), L
  }

  item() {
    return this.#H
  }

  #_(o) {
    if (x.DockController.DockController.instance().canDock()) {
      const e = document.createElement('div');
      e.classList.add('flex-centered'), e.classList.add('flex-auto'), e.classList.add('location-menu'), e.tabIndex = -1, x.ARIAUtils.setLabel(e, E.dockSide + E.dockSideNaviation);
      const t = e.createChild('span', 'dockside-title');
      t.textContent = F(E.dockSide);
      const n = x.ShortcutRegistry.ShortcutRegistry.instance().shortcutsForAction('main.toggle-dock');
      x.Tooltip.Tooltip.install(t, F(E.placementOfDevtoolsRelativeToThe, { PH1: n[0].title() })), e.appendChild(t);
      const s = new x.Toolbar.Toolbar('', e);
      e.setAttribute('jslog', `${C.item('dock-side').track({ keydown: 'ArrowDown|ArrowLeft|ArrowRight' })}`);
      const a = new x.Toolbar.ToolbarToggle(F(E.undockIntoSeparateWindow), 'dock-window', void 0, 'current-dock-state-undock'),
        l = new x.Toolbar.ToolbarToggle(F(E.dockToBottom), 'dock-bottom', void 0, 'current-dock-state-bottom'),
        c = new x.Toolbar.ToolbarToggle(F(E.dockToRight), 'dock-right', void 0, 'current-dock-state-right'),
        d = new x.Toolbar.ToolbarToggle(F(E.dockToLeft), 'dock-left', void 0, 'current-dock-state-left');
      a.addEventListener('MouseDown', (e => e.data.consume())), l.addEventListener('MouseDown', (e => e.data.consume())), c.addEventListener('MouseDown', (e => e.data.consume())), d.addEventListener('MouseDown', (e => e.data.consume())), a.addEventListener('Click', i.bind(null, 'undocked')), l.addEventListener('Click', i.bind(null, 'bottom')), c.addEventListener('Click', i.bind(null, 'right')), d.addEventListener('Click', i.bind(null, 'left')), a.setToggled('undocked' === x.DockController.DockController.instance().dockSide()), l.setToggled('bottom' === x.DockController.DockController.instance().dockSide()), c.setToggled('right' === x.DockController.DockController.instance().dockSide()), d.setToggled('left' === x.DockController.DockController.instance().dockSide()), s.appendToolbarItem(a), s.appendToolbarItem(d), s.appendToolbarItem(l), s.appendToolbarItem(c), e.addEventListener('keydown', (t => {
        let n = 0;
        if ('ArrowLeft' === t.key) n = -1; else {
          if ('ArrowRight' !== t.key) {
            if ('ArrowDown' === t.key) {
              const t = e.closest('.soft-context-menu');
              return void t?.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }))
            }
            return
          }
          n = 1
        }
        const o = [a, d, l, c];
        let s = o.findIndex((e => e.element.hasFocus()));
        s = r.NumberUtilities.clamp(s + n, 0, o.length - 1), o[s].element.focus(), t.consume(!0)
      })), o.headerSection().appendCustomItem(e, 'dock-side')
    }
    const s = this.#H.element;

    function i(e) {
      x.DockController.DockController.instance().once('AfterDockSideChanged').then((() => {
        s.focus()
      })), x.DockController.DockController.instance().setDockSide(e), o.discard()
    }

    if ('undocked' === x.DockController.DockController.instance().dockSide()) {
      const t = e.TargetManager.TargetManager.instance().primaryPageTarget();
      t && t.type() === e.Target.Type.Frame && o.defaultSection().appendAction('inspector-main.focus-debuggee', F(E.focusDebuggee))
    }
    o.defaultSection().appendAction('main.toggle-drawer', x.InspectorView.InspectorView.instance().drawerVisible() ? F(E.hideConsoleDrawer) : F(E.showConsoleDrawer)), o.appendItemsAtLocation('mainMenu');
    const a = o.defaultSection().appendSubMenuItem(F(E.moreTools), !1, 'more-tools'),
      l = x.ViewManager.getRegisteredViewExtensions(t.Settings.Settings.instance().getHostConfig());
    l.sort(((e, t) => {
      const n = e.title(), o = t.title();
      return n.localeCompare(o)
    }));
    for (const e of l) {
      const t = e.location(), o = e.persistence(), r = e.title(), s = e.viewId();
      if ('issues-pane' !== s) {
        if ('closeable' === o && ('drawer-view' === t || 'panel' === t)) if (e.isPreviewFeature()) {
          const e = S.Icon.create('experiment');
          a.defaultSection().appendItem(r, (() => {
            x.ViewManager.ViewManager.instance().showView(s, !0, !1)
          }), { disabled: !1, additionalElement: e, jslogContext: s })
        } else a.defaultSection().appendItem(r, (() => {
          x.ViewManager.ViewManager.instance().showView(s, !0, !1)
        }), { jslogContext: s })
      } else a.defaultSection().appendItem(r, (() => {
        n.userMetrics.issuesPanelOpenedFrom(3), x.ViewManager.ViewManager.instance().showView('issues-pane', !0)
      }), { jslogContext: s })
    }
    o.footerSection().appendSubMenuItem(F(E.help), !1, 'help').appendItemsAtLocation('mainMenuHelp')
  }
}

class _ {
  #U;

  constructor() {
    this.#U = x.Toolbar.Toolbar.createActionButtonForId('settings.show', { showLabel: !1, userActionCode: void 0 })
  }

  static instance(e = { forceNew: null }) {
    const { forceNew: t } = e;
    return A && !t || (A = new _), A
  }

  item() {
    return this.#U
  }
}

class U {
  constructor() {
    e.TargetManager.TargetManager.instance().addModelListener(e.DebuggerModel.DebuggerModel, e.DebuggerModel.Events.DebuggerPaused, this.#N, this)
  }

  #N(n) {
    e.TargetManager.TargetManager.instance().removeModelListener(e.DebuggerModel.DebuggerModel, e.DebuggerModel.Events.DebuggerPaused, this.#N, this);
    const o = n.data, r = o.debuggerPausedDetails();
    x.Context.Context.instance().setFlavor(e.Target.Target, o.target()), t.Revealer.reveal(r)
  }
}

var N = Object.freeze({
  __proto__: null, MainImpl: P, ZoomActionDelegate: class {
    handleAction(e, t) {
      if (n.InspectorFrontendHost.InspectorFrontendHostInstance.isHostedMode()) return !1;
      switch (t) {
        case'main.zoom-in':
          return n.InspectorFrontendHost.InspectorFrontendHostInstance.zoomIn(), !0;
        case'main.zoom-out':
          return n.InspectorFrontendHost.InspectorFrontendHostInstance.zoomOut(), !0;
        case'main.zoom-reset':
          return n.InspectorFrontendHost.InspectorFrontendHostInstance.resetZoom(), !0
      }
      return !1
    }
  }, SearchActionDelegate: class {
    handleAction(e, t) {
      let n = x.SearchableView.SearchableView.fromElement(r.DOMUtilities.deepActiveElement(document));
      if (!n) {
        const e = x.InspectorView.InspectorView.instance().currentPanelDeprecated();
        if (e && e.searchableView && (n = e.searchableView()), !n) return !1
      }
      switch (t) {
        case'main.search-in-panel.find':
          return n.handleFindShortcut();
        case'main.search-in-panel.cancel':
          return n.handleCancelSearchShortcut();
        case'main.search-in-panel.find-next':
          return n.handleFindNextShortcut();
        case'main.search-in-panel.find-previous':
          return n.handleFindPreviousShortcut()
      }
      return !1
    }
  }, MainMenuItem: H, SettingsButtonProvider: _, PauseListener: U, sendOverProtocol: function (e, t) {
    return new Promise(((n, o) => {
      const r = s.InspectorBackend.test.sendRawMessage;
      if (!r) return o('Unable to send message to test client');
      r(e, t, ((e, ...t) => e ? o(e) : n(t)))
    }))
  }, ReloadActionDelegate: class {
    handleAction(e, t) {
      return 'main.debug-reload' === t && (v.Reload.reload(), !0)
    }
  }
});

class j {
  presentUI(e) {
    const t = new x.RootView.RootView;
    x.InspectorView.InspectorView.instance().show(t.element), t.attachToDocument(e), t.focus()
  }
}

let W;

class V {
  static instance(e = { forceNew: null }) {
    const { forceNew: t } = e;
    return W && !t || (W = new V), W
  }

  createApp() {
    return new j
  }
}

var z = Object.freeze({ __proto__: null, SimpleApp: j, SimpleAppProvider: V });
export { I as ExecutionContextSelector, N as MainImpl, y as SettingTracker, z as SimpleApp };
