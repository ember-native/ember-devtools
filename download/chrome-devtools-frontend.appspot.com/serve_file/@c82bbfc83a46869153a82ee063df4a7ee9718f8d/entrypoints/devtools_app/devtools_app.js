import '../shell/shell.js';
import *as e from '../../core/i18n/i18n.js';
import *as t from '../../ui/legacy/legacy.js';
import *as o from '../../core/common/common.js';
import *as i from '../../core/root/root.js';
import *as n from '../../core/sdk/sdk.js';
import *as a from '../../models/extensions/extensions.js';
import *as r from '../../models/workspace/workspace.js';
import *as s from '../../panels/timeline/utils/utils.js';
import *as l from '../../panels/network/forward/forward.js';
import *as c from '../../ui/components/legacy_wrapper/legacy_wrapper.js';
import *as d from '../../panels/application/preloading/helper/helper.js';
import *as g from '../../models/issues_manager/issues_manager.js';
import *as w from '../main/main.js';

const m = { cssOverview: 'CSS overview', showCssOverview: 'Show CSS overview' },
  p = e.i18n.registerUIStrings('panels/css_overview/css_overview-meta.ts', m),
  u = e.i18n.getLazilyComputedLocalizedString.bind(void 0, p);
let y;
t.ViewManager.registerViewExtension({
  location: 'panel',
  id: 'cssoverview',
  commandPrompt: u(m.showCssOverview),
  title: u(m.cssOverview),
  order: 95,
  persistence: 'closeable',
  async loadView() {
    const e = await async function () {
      return y || (y = await import('../../panels/css_overview/css_overview.js')), y
    }();
    return new e.CSSOverviewPanel.CSSOverviewPanel(new e.CSSOverviewController.OverviewController)
  },
  isPreviewFeature: !0
});
const h = {
    showElements: 'Show Elements',
    elements: 'Elements',
    showEventListeners: 'Show Event Listeners',
    eventListeners: 'Event Listeners',
    showProperties: 'Show Properties',
    properties: 'Properties',
    showStackTrace: 'Show Stack Trace',
    stackTrace: 'Stack Trace',
    showLayout: 'Show Layout',
    layout: 'Layout',
    hideElement: 'Hide element',
    editAsHtml: 'Edit as HTML',
    duplicateElement: 'Duplicate element',
    undo: 'Undo',
    redo: 'Redo',
    captureAreaScreenshot: 'Capture area screenshot',
    selectAnElementInThePageTo: 'Select an element in the page to inspect it',
    newStyleRule: 'New Style Rule',
    refreshEventListeners: 'Refresh event listeners',
    wordWrap: 'Word wrap',
    enableDomWordWrap: 'Enable `DOM` word wrap',
    disableDomWordWrap: 'Disable `DOM` word wrap',
    showHtmlComments: 'Show `HTML` comments',
    hideHtmlComments: 'Hide `HTML` comments',
    revealDomNodeOnHover: 'Reveal `DOM` node on hover',
    showDetailedInspectTooltip: 'Show detailed inspect tooltip',
    showCSSDocumentationTooltip: 'Show CSS documentation tooltip',
    copyStyles: 'Copy styles',
    showUserAgentShadowDOM: 'Show user agent shadow `DOM`',
    showComputedStyles: 'Show Computed Styles',
    showStyles: 'Show Styles',
    toggleEyeDropper: 'Toggle eye dropper'
  }, S = e.i18n.registerUIStrings('panels/elements/elements-meta.ts', h),
  v = e.i18n.getLazilyComputedLocalizedString.bind(void 0, S);
let R, E;

async function A() {
  return R || (R = await import('../../panels/elements/elements.js')), R
}

function b(e) {
  return void 0 === R ? [] : e(R)
}

t.ViewManager.registerViewExtension({
  location: 'panel',
  id: 'elements',
  commandPrompt: v(h.showElements),
  title: v(h.elements),
  order: 10,
  persistence: 'permanent',
  hasToolbar: !1,
  loadView: async () => (await A()).ElementsPanel.ElementsPanel.instance()
}), t.ActionRegistration.registerActionExtension({
  actionId: 'elements.show-styles',
  category: 'ELEMENTS',
  title: v(h.showStyles),
  loadActionDelegate: async () => new ((await A()).ElementsPanel.ElementsActionDelegate)
}), t.ActionRegistration.registerActionExtension({
  actionId: 'elements.show-computed',
  category: 'ELEMENTS',
  title: v(h.showComputedStyles),
  loadActionDelegate: async () => new ((await A()).ElementsPanel.ElementsActionDelegate)
}), t.ViewManager.registerViewExtension({
  location: 'elements-sidebar',
  id: 'elements.event-listeners',
  commandPrompt: v(h.showEventListeners),
  title: v(h.eventListeners),
  order: 5,
  hasToolbar: !0,
  persistence: 'permanent',
  loadView: async () => (await A()).EventListenersWidget.EventListenersWidget.instance()
}), t.ViewManager.registerViewExtension({
  location: 'elements-sidebar',
  id: 'elements.dom-properties',
  commandPrompt: v(h.showProperties),
  title: v(h.properties),
  order: 7,
  persistence: 'permanent',
  loadView: async () => new ((await A()).PropertiesWidget.PropertiesWidget)
}), t.ViewManager.registerViewExtension({
  experiment: 'capture-node-creation-stacks',
  location: 'elements-sidebar',
  id: 'elements.dom-creation',
  commandPrompt: v(h.showStackTrace),
  title: v(h.stackTrace),
  order: 10,
  persistence: 'permanent',
  loadView: async () => new ((await A()).NodeStackTraceWidget.NodeStackTraceWidget)
}), t.ViewManager.registerViewExtension({
  location: 'elements-sidebar',
  id: 'elements.layout',
  commandPrompt: v(h.showLayout),
  title: v(h.layout),
  order: 4,
  persistence: 'permanent',
  loadView: async () => (await async function () {
    return E || (E = await import('../../panels/elements/components/components.js')), E
  }()).LayoutPane.LayoutPane.instance().wrapper
}), t.ActionRegistration.registerActionExtension({
  actionId: 'elements.hide-element',
  category: 'ELEMENTS',
  title: v(h.hideElement),
  loadActionDelegate: async () => new ((await A()).ElementsPanel.ElementsActionDelegate),
  contextTypes: () => b((e => [e.ElementsPanel.ElementsPanel])),
  bindings: [{ shortcut: 'H' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'elements.toggle-eye-dropper',
  category: 'ELEMENTS',
  title: v(h.toggleEyeDropper),
  loadActionDelegate: async () => new ((await A()).ElementsPanel.ElementsActionDelegate),
  contextTypes: () => b((e => [e.ColorSwatchPopoverIcon.ColorSwatchPopoverIcon])),
  bindings: [{ shortcut: 'c' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'elements.edit-as-html',
  category: 'ELEMENTS',
  title: v(h.editAsHtml),
  loadActionDelegate: async () => new ((await A()).ElementsPanel.ElementsActionDelegate),
  contextTypes: () => b((e => [e.ElementsPanel.ElementsPanel])),
  bindings: [{ shortcut: 'F2' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'elements.duplicate-element',
  category: 'ELEMENTS',
  title: v(h.duplicateElement),
  loadActionDelegate: async () => new ((await A()).ElementsPanel.ElementsActionDelegate),
  contextTypes: () => b((e => [e.ElementsPanel.ElementsPanel])),
  bindings: [{ shortcut: 'Shift+Alt+Down' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'elements.copy-styles',
  category: 'ELEMENTS',
  title: v(h.copyStyles),
  loadActionDelegate: async () => new ((await A()).ElementsPanel.ElementsActionDelegate),
  contextTypes: () => b((e => [e.ElementsPanel.ElementsPanel])),
  bindings: [{ shortcut: 'Ctrl+Alt+C', platform: 'windows,linux' }, { shortcut: 'Meta+Alt+C', platform: 'mac' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'elements.undo',
  category: 'ELEMENTS',
  title: v(h.undo),
  loadActionDelegate: async () => new ((await A()).ElementsPanel.ElementsActionDelegate),
  contextTypes: () => b((e => [e.ElementsPanel.ElementsPanel])),
  bindings: [{ shortcut: 'Ctrl+Z', platform: 'windows,linux' }, { shortcut: 'Meta+Z', platform: 'mac' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'elements.redo',
  category: 'ELEMENTS',
  title: v(h.redo),
  loadActionDelegate: async () => new ((await A()).ElementsPanel.ElementsActionDelegate),
  contextTypes: () => b((e => [e.ElementsPanel.ElementsPanel])),
  bindings: [{ shortcut: 'Ctrl+Y', platform: 'windows,linux' }, { shortcut: 'Meta+Shift+Z', platform: 'mac' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'elements.capture-area-screenshot',
  loadActionDelegate: async () => new ((await A()).InspectElementModeController.ToggleSearchActionDelegate),
  condition: i.Runtime.conditions.canDock,
  title: v(h.captureAreaScreenshot),
  category: 'SCREENSHOT'
}), t.ActionRegistration.registerActionExtension({
  category: 'ELEMENTS',
  actionId: 'elements.toggle-element-search',
  toggleable: !0,
  loadActionDelegate: async () => new ((await A()).InspectElementModeController.ToggleSearchActionDelegate),
  title: v(h.selectAnElementInThePageTo),
  iconClass: 'select-element',
  bindings: [{ shortcut: 'Ctrl+Shift+C', platform: 'windows,linux' }, { shortcut: 'Meta+Shift+C', platform: 'mac' }]
}), t.ActionRegistration.registerActionExtension({
  category: 'ELEMENTS',
  actionId: 'elements.new-style-rule',
  title: v(h.newStyleRule),
  iconClass: 'plus',
  loadActionDelegate: async () => new ((await A()).StylesSidebarPane.ActionDelegate),
  contextTypes: () => b((e => [e.StylesSidebarPane.StylesSidebarPane]))
}), t.ActionRegistration.registerActionExtension({
  category: 'ELEMENTS',
  actionId: 'elements.refresh-event-listeners',
  title: v(h.refreshEventListeners),
  iconClass: 'refresh',
  loadActionDelegate: async () => new ((await A()).EventListenersWidget.ActionDelegate),
  contextTypes: () => b((e => [e.EventListenersWidget.EventListenersWidget]))
}), o.Settings.registerSettingExtension({
  category: 'ELEMENTS',
  storageType: 'Synced',
  order: 1,
  title: v(h.showUserAgentShadowDOM),
  settingName: 'show-ua-shadow-dom',
  settingType: 'boolean',
  defaultValue: !1
}), o.Settings.registerSettingExtension({
  category: 'ELEMENTS',
  storageType: 'Synced',
  order: 2,
  title: v(h.wordWrap),
  settingName: 'dom-word-wrap',
  settingType: 'boolean',
  options: [{ value: !0, title: v(h.enableDomWordWrap) }, { value: !1, title: v(h.disableDomWordWrap) }],
  defaultValue: !0
}), o.Settings.registerSettingExtension({
  category: 'ELEMENTS',
  storageType: 'Synced',
  order: 3,
  title: v(h.showHtmlComments),
  settingName: 'show-html-comments',
  settingType: 'boolean',
  defaultValue: !0,
  options: [{ value: !0, title: v(h.showHtmlComments) }, { value: !1, title: v(h.hideHtmlComments) }]
}), o.Settings.registerSettingExtension({
  category: 'ELEMENTS',
  storageType: 'Synced',
  order: 4,
  title: v(h.revealDomNodeOnHover),
  settingName: 'highlight-node-on-hover-in-overlay',
  settingType: 'boolean',
  defaultValue: !0
}), o.Settings.registerSettingExtension({
  category: 'ELEMENTS',
  storageType: 'Synced',
  order: 5,
  title: v(h.showDetailedInspectTooltip),
  settingName: 'show-detailed-inspect-tooltip',
  settingType: 'boolean',
  defaultValue: !0
}), o.Settings.registerSettingExtension({
  settingName: 'show-event-listeners-for-ancestors',
  settingType: 'boolean',
  defaultValue: !0
}), o.Settings.registerSettingExtension({
  category: 'ADORNER',
  storageType: 'Synced',
  settingName: 'adorner-settings',
  settingType: 'array',
  defaultValue: []
}), o.Settings.registerSettingExtension({
  category: 'ELEMENTS',
  storageType: 'Synced',
  title: v(h.showCSSDocumentationTooltip),
  settingName: 'show-css-property-documentation-on-hover',
  settingType: 'boolean',
  defaultValue: !0
}), t.ContextMenu.registerProvider({
  contextTypes: () => [n.RemoteObject.RemoteObject, n.DOMModel.DOMNode, n.DOMModel.DeferredDOMNode],
  loadProvider: async () => new ((await A()).ElementsPanel.ContextMenuProvider),
  experiment: void 0
}), t.ViewManager.registerLocationResolver({
  name: 'elements-sidebar',
  category: 'ELEMENTS',
  loadResolver: async () => (await A()).ElementsPanel.ElementsPanel.instance()
}), o.Revealer.registerRevealer({
  contextTypes: () => [n.DOMModel.DOMNode, n.DOMModel.DeferredDOMNode, n.RemoteObject.RemoteObject],
  destination: o.Revealer.RevealerDestination.ELEMENTS_PANEL,
  loadRevealer: async () => new ((await A()).ElementsPanel.DOMNodeRevealer)
}), o.Revealer.registerRevealer({
  contextTypes: () => [n.CSSProperty.CSSProperty],
  destination: o.Revealer.RevealerDestination.STYLES_SIDEBAR,
  loadRevealer: async () => new ((await A()).ElementsPanel.CSSPropertyRevealer)
}), t.Toolbar.registerToolbarItem({
  loadItem: async () => (await A()).LayersWidget.ButtonProvider.instance(),
  order: 1,
  location: 'styles-sidebarpane-toolbar'
}), t.Toolbar.registerToolbarItem({
  loadItem: async () => (await A()).ElementStatePaneWidget.ButtonProvider.instance(),
  order: 2,
  location: 'styles-sidebarpane-toolbar'
}), t.Toolbar.registerToolbarItem({
  loadItem: async () => (await A()).ClassesPaneWidget.ButtonProvider.instance(),
  order: 3,
  location: 'styles-sidebarpane-toolbar'
}), t.Toolbar.registerToolbarItem({
  loadItem: async () => (await A()).StylesSidebarPane.ButtonProvider.instance(),
  order: 100,
  location: 'styles-sidebarpane-toolbar'
}), t.Toolbar.registerToolbarItem({
  actionId: 'elements.toggle-element-search',
  location: 'main-toolbar-left',
  order: 0
}), t.UIUtils.registerRenderer({
  contextTypes: () => [n.DOMModel.DOMNode, n.DOMModel.DeferredDOMNode],
  loadRenderer: async () => (await A()).ElementsTreeOutline.Renderer.instance()
}), o.Linkifier.registerLinkifier({
  contextTypes: () => [n.DOMModel.DOMNode, n.DOMModel.DeferredDOMNode],
  loadLinkifier: async () => (await A()).DOMLinkifier.Linkifier.instance()
});
const P = {
    showEventListenerBreakpoints: 'Show Event Listener Breakpoints',
    eventListenerBreakpoints: 'Event Listener Breakpoints',
    showCspViolationBreakpoints: 'Show CSP Violation Breakpoints',
    cspViolationBreakpoints: 'CSP Violation Breakpoints',
    showXhrfetchBreakpoints: 'Show XHR/fetch Breakpoints',
    xhrfetchBreakpoints: 'XHR/fetch Breakpoints',
    showDomBreakpoints: 'Show DOM Breakpoints',
    domBreakpoints: 'DOM Breakpoints',
    showGlobalListeners: 'Show Global Listeners',
    globalListeners: 'Global Listeners',
    page: 'Page',
    showPage: 'Show Page',
    overrides: 'Overrides',
    showOverrides: 'Show Overrides',
    contentScripts: 'Content scripts',
    showContentScripts: 'Show Content scripts',
    refreshGlobalListeners: 'Refresh global listeners'
  }, f = e.i18n.registerUIStrings('panels/browser_debugger/browser_debugger-meta.ts', P),
  T = e.i18n.getLazilyComputedLocalizedString.bind(void 0, f);
let k, D;

async function L() {
  return k || (k = await import('../../panels/browser_debugger/browser_debugger.js')), k
}

async function x() {
  return D || (D = await import('../../panels/sources/sources.js')), D
}

t.ViewManager.registerViewExtension({
  loadView: async () => (await L()).EventListenerBreakpointsSidebarPane.EventListenerBreakpointsSidebarPane.instance(),
  id: 'sources.event-listener-breakpoints',
  location: 'sources.sidebar-bottom',
  commandPrompt: T(P.showEventListenerBreakpoints),
  title: T(P.eventListenerBreakpoints),
  order: 9,
  persistence: 'permanent'
}), t.ViewManager.registerViewExtension({
  loadView: async () => new ((await L()).CSPViolationBreakpointsSidebarPane.CSPViolationBreakpointsSidebarPane),
  id: 'sources.csp-violation-breakpoints',
  location: 'sources.sidebar-bottom',
  commandPrompt: T(P.showCspViolationBreakpoints),
  title: T(P.cspViolationBreakpoints),
  order: 10,
  persistence: 'permanent'
}), t.ViewManager.registerViewExtension({
  loadView: async () => (await L()).XHRBreakpointsSidebarPane.XHRBreakpointsSidebarPane.instance(),
  id: 'sources.xhr-breakpoints',
  location: 'sources.sidebar-bottom',
  commandPrompt: T(P.showXhrfetchBreakpoints),
  title: T(P.xhrfetchBreakpoints),
  order: 5,
  persistence: 'permanent',
  hasToolbar: !0
}), t.ViewManager.registerViewExtension({
  loadView: async () => (await L()).DOMBreakpointsSidebarPane.DOMBreakpointsSidebarPane.instance(),
  id: 'sources.dom-breakpoints',
  location: 'sources.sidebar-bottom',
  commandPrompt: T(P.showDomBreakpoints),
  title: T(P.domBreakpoints),
  order: 7,
  persistence: 'permanent'
}), t.ViewManager.registerViewExtension({
  loadView: async () => new ((await L()).ObjectEventListenersSidebarPane.ObjectEventListenersSidebarPane),
  id: 'sources.global-listeners',
  location: 'sources.sidebar-bottom',
  commandPrompt: T(P.showGlobalListeners),
  title: T(P.globalListeners),
  order: 8,
  persistence: 'permanent',
  hasToolbar: !0
}), t.ViewManager.registerViewExtension({
  loadView: async () => (await L()).DOMBreakpointsSidebarPane.DOMBreakpointsSidebarPane.instance(),
  id: 'elements.dom-breakpoints',
  location: 'elements-sidebar',
  commandPrompt: T(P.showDomBreakpoints),
  title: T(P.domBreakpoints),
  order: 6,
  persistence: 'permanent'
}), t.ViewManager.registerViewExtension({
  location: 'navigator-view',
  id: 'navigator-network',
  title: T(P.page),
  commandPrompt: T(P.showPage),
  order: 2,
  persistence: 'permanent',
  loadView: async () => (await x()).SourcesNavigator.NetworkNavigatorView.instance()
}), t.ViewManager.registerViewExtension({
  location: 'navigator-view',
  id: 'navigator-overrides',
  title: T(P.overrides),
  commandPrompt: T(P.showOverrides),
  order: 4,
  persistence: 'permanent',
  loadView: async () => (await x()).SourcesNavigator.OverridesNavigatorView.instance()
}), t.ViewManager.registerViewExtension({
  location: 'navigator-view',
  id: 'navigator-content-scripts',
  title: T(P.contentScripts),
  commandPrompt: T(P.showContentScripts),
  order: 5,
  persistence: 'permanent',
  condition: () => '/bundled/worker_app.html' !== i.Runtime.getPathName(),
  loadView: async () => new ((await x()).SourcesNavigator.ContentScriptsNavigatorView)
}), t.ActionRegistration.registerActionExtension({
  category: 'DEBUGGER',
  actionId: 'browser-debugger.refresh-global-event-listeners',
  loadActionDelegate: async () => new ((await L()).ObjectEventListenersSidebarPane.ActionDelegate),
  title: T(P.refreshGlobalListeners),
  iconClass: 'refresh',
  contextTypes: () => void 0 === k ? [] : (e => [e.ObjectEventListenersSidebarPane.ObjectEventListenersSidebarPane])(k)
}), t.ContextMenu.registerProvider({
  contextTypes: () => [n.DOMModel.DOMNode],
  loadProvider: async () => new ((await L()).DOMBreakpointsSidebarPane.ContextMenuProvider),
  experiment: void 0
}), t.Context.registerListener({
  contextTypes: () => [n.DebuggerModel.DebuggerPausedDetails],
  loadListener: async () => (await L()).XHRBreakpointsSidebarPane.XHRBreakpointsSidebarPane.instance()
}), t.Context.registerListener({
  contextTypes: () => [n.DebuggerModel.DebuggerPausedDetails],
  loadListener: async () => (await L()).DOMBreakpointsSidebarPane.DOMBreakpointsSidebarPane.instance()
});
const M = {
    showNetwork: 'Show Network',
    network: 'Network',
    showNetworkRequestBlocking: 'Show Network request blocking',
    networkRequestBlocking: 'Network request blocking',
    showNetworkConditions: 'Show Network conditions',
    networkConditions: 'Network conditions',
    diskCache: 'disk cache',
    networkThrottling: 'network throttling',
    showSearch: 'Show Search',
    search: 'Search',
    recordNetworkLog: 'Record network log',
    stopRecordingNetworkLog: 'Stop recording network log',
    hideRequestDetails: 'Hide request details',
    colorcodeResourceTypes: 'Color-code resource types',
    colorCode: 'color code',
    resourceType: 'resource type',
    colorCodeByResourceType: 'Color code by resource type',
    useDefaultColors: 'Use default colors',
    groupNetworkLogByFrame: 'Group network log by frame',
    netWork: 'network',
    frame: 'frame',
    group: 'group',
    groupNetworkLogItemsByFrame: 'Group network log items by frame',
    dontGroupNetworkLogItemsByFrame: 'Don\'t group network log items by frame',
    clear: 'Clear network log',
    addNetworkRequestBlockingPattern: 'Add network request blocking pattern',
    removeAllNetworkRequestBlockingPatterns: 'Remove all network request blocking patterns'
  }, I = e.i18n.registerUIStrings('panels/network/network-meta.ts', M),
  N = e.i18n.getLazilyComputedLocalizedString.bind(void 0, I);
let C;

async function V() {
  return C || (C = await import('../../panels/network/network.js')), C
}

function O(e) {
  return void 0 === C ? [] : e(C)
}

t.ViewManager.registerViewExtension({
  location: 'panel',
  id: 'network',
  commandPrompt: N(M.showNetwork),
  title: N(M.network),
  order: 40,
  loadView: async () => (await V()).NetworkPanel.NetworkPanel.instance()
}), t.ViewManager.registerViewExtension({
  location: 'drawer-view',
  id: 'network.blocked-urls',
  commandPrompt: N(M.showNetworkRequestBlocking),
  title: N(M.networkRequestBlocking),
  persistence: 'closeable',
  order: 60,
  loadView: async () => new ((await V()).BlockedURLsPane.BlockedURLsPane)
}), t.ViewManager.registerViewExtension({
  location: 'drawer-view',
  id: 'network.config',
  commandPrompt: N(M.showNetworkConditions),
  title: N(M.networkConditions),
  persistence: 'closeable',
  order: 40,
  tags: [N(M.diskCache), N(M.networkThrottling), e.i18n.lockedLazyString('useragent'), e.i18n.lockedLazyString('user agent'), e.i18n.lockedLazyString('user-agent')],
  loadView: async () => (await V()).NetworkConfigView.NetworkConfigView.instance()
}), t.ViewManager.registerViewExtension({
  location: 'network-sidebar',
  id: 'network.search-network-tab',
  commandPrompt: N(M.showSearch),
  title: N(M.search),
  persistence: 'permanent',
  loadView: async () => (await V()).NetworkPanel.SearchNetworkView.instance()
}), t.ActionRegistration.registerActionExtension({
  actionId: 'network.toggle-recording',
  category: 'NETWORK',
  iconClass: 'record-start',
  toggleable: !0,
  toggledIconClass: 'record-stop',
  toggleWithRedColor: !0,
  contextTypes: () => O((e => [e.NetworkPanel.NetworkPanel])),
  loadActionDelegate: async () => new ((await V()).NetworkPanel.ActionDelegate),
  options: [{ value: !0, title: N(M.recordNetworkLog) }, { value: !1, title: N(M.stopRecordingNetworkLog) }],
  bindings: [{ shortcut: 'Ctrl+E', platform: 'windows,linux' }, { shortcut: 'Meta+E', platform: 'mac' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'network.clear',
  category: 'NETWORK',
  title: N(M.clear),
  iconClass: 'clear',
  loadActionDelegate: async () => new ((await V()).NetworkPanel.ActionDelegate),
  contextTypes: () => O((e => [e.NetworkPanel.NetworkPanel])),
  bindings: [{ shortcut: 'Ctrl+L' }, { shortcut: 'Meta+K', platform: 'mac' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'network.hide-request-details',
  category: 'NETWORK',
  title: N(M.hideRequestDetails),
  contextTypes: () => O((e => [e.NetworkPanel.NetworkPanel])),
  loadActionDelegate: async () => new ((await V()).NetworkPanel.ActionDelegate),
  bindings: [{ shortcut: 'Esc' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'network.search',
  category: 'NETWORK',
  title: N(M.search),
  contextTypes: () => O((e => [e.NetworkPanel.NetworkPanel])),
  loadActionDelegate: async () => new ((await V()).NetworkPanel.ActionDelegate),
  bindings: [{
    platform: 'mac',
    shortcut: 'Meta+F',
    keybindSets: ['devToolsDefault', 'vsCode']
  }, { platform: 'windows,linux', shortcut: 'Ctrl+F', keybindSets: ['devToolsDefault', 'vsCode'] }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'network.add-network-request-blocking-pattern',
  category: 'NETWORK',
  title: N(M.addNetworkRequestBlockingPattern),
  iconClass: 'plus',
  contextTypes: () => O((e => [e.BlockedURLsPane.BlockedURLsPane])),
  loadActionDelegate: async () => new ((await V()).BlockedURLsPane.ActionDelegate)
}), t.ActionRegistration.registerActionExtension({
  actionId: 'network.remove-all-network-request-blocking-patterns',
  category: 'NETWORK',
  title: N(M.removeAllNetworkRequestBlockingPatterns),
  iconClass: 'clear',
  contextTypes: () => O((e => [e.BlockedURLsPane.BlockedURLsPane])),
  loadActionDelegate: async () => new ((await V()).BlockedURLsPane.ActionDelegate)
}), o.Settings.registerSettingExtension({
  category: 'NETWORK',
  storageType: 'Synced',
  title: N(M.colorcodeResourceTypes),
  settingName: 'network-color-code-resource-types',
  settingType: 'boolean',
  defaultValue: !1,
  tags: [N(M.colorCode), N(M.resourceType)],
  options: [{ value: !0, title: N(M.colorCodeByResourceType) }, { value: !1, title: N(M.useDefaultColors) }]
}), o.Settings.registerSettingExtension({
  category: 'NETWORK',
  storageType: 'Synced',
  title: N(M.groupNetworkLogByFrame),
  settingName: 'network.group-by-frame',
  settingType: 'boolean',
  defaultValue: !1,
  tags: [N(M.netWork), N(M.frame), N(M.group)],
  options: [{ value: !0, title: N(M.groupNetworkLogItemsByFrame) }, {
    value: !1,
    title: N(M.dontGroupNetworkLogItemsByFrame)
  }]
}), t.ViewManager.registerLocationResolver({
  name: 'network-sidebar',
  category: 'NETWORK',
  loadResolver: async () => (await V()).NetworkPanel.NetworkPanel.instance()
}), t.ContextMenu.registerProvider({
  contextTypes: () => [n.NetworkRequest.NetworkRequest, n.Resource.Resource, r.UISourceCode.UISourceCode, s.NetworkRequest.TimelineNetworkRequest],
  loadProvider: async () => (await V()).NetworkPanel.NetworkPanel.instance(),
  experiment: void 0
}), o.Revealer.registerRevealer({
  contextTypes: () => [n.NetworkRequest.NetworkRequest],
  destination: o.Revealer.RevealerDestination.NETWORK_PANEL,
  loadRevealer: async () => new ((await V()).NetworkPanel.RequestRevealer)
}), o.Revealer.registerRevealer({
  contextTypes: () => [l.UIRequestLocation.UIRequestLocation],
  destination: void 0,
  loadRevealer: async () => new ((await V()).NetworkPanel.RequestLocationRevealer)
}), o.Revealer.registerRevealer({
  contextTypes: () => [l.NetworkRequestId.NetworkRequestId],
  destination: o.Revealer.RevealerDestination.NETWORK_PANEL,
  loadRevealer: async () => new ((await V()).NetworkPanel.RequestIdRevealer)
}), o.Revealer.registerRevealer({
  contextTypes: () => [l.UIFilter.UIRequestFilter, a.ExtensionServer.RevealableNetworkRequestFilter],
  destination: o.Revealer.RevealerDestination.NETWORK_PANEL,
  loadRevealer: async () => new ((await V()).NetworkPanel.NetworkLogWithFilterRevealer)
});
const B = { security: 'Security', showSecurity: 'Show Security' },
  z = e.i18n.registerUIStrings('panels/security/security-meta.ts', B),
  U = e.i18n.getLazilyComputedLocalizedString.bind(void 0, z);
let W;
t.ViewManager.registerViewExtension({
  location: 'panel',
  id: 'security',
  title: U(B.security),
  commandPrompt: U(B.showSecurity),
  order: 80,
  persistence: 'closeable',
  loadView: async () => (await async function () {
    return W || (W = await import('../../panels/security/security.js')), W
  }()).SecurityPanel.SecurityPanel.instance()
});
const F = {
    toggleDeviceToolbar: 'Toggle device toolbar',
    captureScreenshot: 'Capture screenshot',
    captureFullSizeScreenshot: 'Capture full size screenshot',
    captureNodeScreenshot: 'Capture node screenshot',
    showMediaQueries: 'Show media queries',
    device: 'device',
    hideMediaQueries: 'Hide media queries',
    showRulers: 'Show rulers in the Device Mode toolbar',
    hideRulers: 'Hide rulers in the Device Mode toolbar',
    showDeviceFrame: 'Show device frame',
    hideDeviceFrame: 'Hide device frame'
  }, j = e.i18n.registerUIStrings('panels/emulation/emulation-meta.ts', F),
  _ = e.i18n.getLazilyComputedLocalizedString.bind(void 0, j);
let q;

async function H() {
  return q || (q = await import('../../panels/emulation/emulation.js')), q
}

t.ActionRegistration.registerActionExtension({
  category: 'MOBILE',
  actionId: 'emulation.toggle-device-mode',
  toggleable: !0,
  loadActionDelegate: async () => new ((await H()).DeviceModeWrapper.ActionDelegate),
  condition: i.Runtime.conditions.canDock,
  title: _(F.toggleDeviceToolbar),
  iconClass: 'devices',
  bindings: [{ platform: 'windows,linux', shortcut: 'Shift+Ctrl+M' }, { platform: 'mac', shortcut: 'Shift+Meta+M' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'emulation.capture-screenshot',
  category: 'SCREENSHOT',
  loadActionDelegate: async () => new ((await H()).DeviceModeWrapper.ActionDelegate),
  condition: i.Runtime.conditions.canDock,
  title: _(F.captureScreenshot)
}), t.ActionRegistration.registerActionExtension({
  actionId: 'emulation.capture-full-height-screenshot',
  category: 'SCREENSHOT',
  loadActionDelegate: async () => new ((await H()).DeviceModeWrapper.ActionDelegate),
  condition: i.Runtime.conditions.canDock,
  title: _(F.captureFullSizeScreenshot)
}), t.ActionRegistration.registerActionExtension({
  actionId: 'emulation.capture-node-screenshot',
  category: 'SCREENSHOT',
  loadActionDelegate: async () => new ((await H()).DeviceModeWrapper.ActionDelegate),
  condition: i.Runtime.conditions.canDock,
  title: _(F.captureNodeScreenshot)
}), o.Settings.registerSettingExtension({
  category: 'MOBILE',
  settingName: 'show-media-query-inspector',
  settingType: 'boolean',
  defaultValue: !1,
  options: [{ value: !0, title: _(F.showMediaQueries) }, { value: !1, title: _(F.hideMediaQueries) }],
  tags: [_(F.device)]
}), o.Settings.registerSettingExtension({
  category: 'MOBILE',
  settingName: 'emulation.show-rulers',
  settingType: 'boolean',
  defaultValue: !1,
  options: [{ value: !0, title: _(F.showRulers) }, { value: !1, title: _(F.hideRulers) }],
  tags: [_(F.device)]
}), o.Settings.registerSettingExtension({
  category: 'MOBILE',
  settingName: 'emulation.show-device-outline',
  settingType: 'boolean',
  defaultValue: !1,
  options: [{ value: !0, title: _(F.showDeviceFrame) }, { value: !1, title: _(F.hideDeviceFrame) }],
  tags: [_(F.device)]
}), t.Toolbar.registerToolbarItem({
  actionId: 'emulation.toggle-device-mode',
  condition: i.Runtime.conditions.canDock,
  location: 'main-toolbar-left',
  order: 1,
  showLabel: void 0,
  loadItem: void 0,
  separator: void 0
}), o.AppProvider.registerAppProvider({
  loadAppProvider: async () => (await H()).AdvancedApp.AdvancedAppProvider.instance(),
  condition: i.Runtime.conditions.canDock,
  order: 0
}), t.ContextMenu.registerItem({
  location: 'deviceModeMenu/save',
  order: 12,
  actionId: 'emulation.capture-screenshot'
}), t.ContextMenu.registerItem({
  location: 'deviceModeMenu/save',
  order: 13,
  actionId: 'emulation.capture-full-height-screenshot'
});
const G = {
    sensors: 'Sensors',
    geolocation: 'geolocation',
    timezones: 'timezones',
    locale: 'locale',
    locales: 'locales',
    accelerometer: 'accelerometer',
    deviceOrientation: 'device orientation',
    locations: 'Locations',
    touch: 'Touch',
    devicebased: 'Device-based',
    forceEnabled: 'Force enabled',
    emulateIdleDetectorState: 'Emulate Idle Detector state',
    noIdleEmulation: 'No idle emulation',
    userActiveScreenUnlocked: 'User active, screen unlocked',
    userActiveScreenLocked: 'User active, screen locked',
    userIdleScreenUnlocked: 'User idle, screen unlocked',
    userIdleScreenLocked: 'User idle, screen locked',
    showSensors: 'Show Sensors',
    showLocations: 'Show Locations'
  }, K = e.i18n.registerUIStrings('panels/sensors/sensors-meta.ts', G),
  Y = e.i18n.getLazilyComputedLocalizedString.bind(void 0, K);
let X, Z;

async function Q() {
  return X || (X = await import('../../panels/sensors/sensors.js')), X
}

t.ViewManager.registerViewExtension({
  location: 'drawer-view',
  commandPrompt: Y(G.showSensors),
  title: Y(G.sensors),
  id: 'sensors',
  persistence: 'closeable',
  order: 100,
  loadView: async () => new ((await Q()).SensorsView.SensorsView),
  tags: [Y(G.geolocation), Y(G.timezones), Y(G.locale), Y(G.locales), Y(G.accelerometer), Y(G.deviceOrientation)]
}), t.ViewManager.registerViewExtension({
  location: 'settings-view',
  id: 'emulation-locations',
  commandPrompt: Y(G.showLocations),
  title: Y(G.locations),
  order: 40,
  loadView: async () => new ((await Q()).LocationsSettingsTab.LocationsSettingsTab),
  settings: ['emulation.locations'],
  iconName: 'location-on'
}), o.Settings.registerSettingExtension({
  storageType: 'Synced',
  settingName: 'emulation.locations',
  settingType: 'array',
  defaultValue: [{
    title: 'Berlin',
    lat: 52.520007,
    long: 13.404954,
    timezoneId: 'Europe/Berlin',
    locale: 'de-DE'
  }, {
    title: 'London',
    lat: 51.507351,
    long: -.127758,
    timezoneId: 'Europe/London',
    locale: 'en-GB'
  }, {
    title: 'Moscow',
    lat: 55.755826,
    long: 37.6173,
    timezoneId: 'Europe/Moscow',
    locale: 'ru-RU'
  }, {
    title: 'Mountain View',
    lat: 37.386052,
    long: -122.083851,
    timezoneId: 'America/Los_Angeles',
    locale: 'en-US'
  }, {
    title: 'Mumbai',
    lat: 19.075984,
    long: 72.877656,
    timezoneId: 'Asia/Kolkata',
    locale: 'mr-IN'
  }, {
    title: 'San Francisco',
    lat: 37.774929,
    long: -122.419416,
    timezoneId: 'America/Los_Angeles',
    locale: 'en-US'
  }, {
    title: 'Shanghai',
    lat: 31.230416,
    long: 121.473701,
    timezoneId: 'Asia/Shanghai',
    locale: 'zh-Hans-CN'
  }, {
    title: 'São Paulo',
    lat: -23.55052,
    long: -46.633309,
    timezoneId: 'America/Sao_Paulo',
    locale: 'pt-BR'
  }, { title: 'Tokyo', lat: 35.689487, long: 139.691706, timezoneId: 'Asia/Tokyo', locale: 'ja-JP' }]
}), o.Settings.registerSettingExtension({
  title: Y(G.touch),
  reloadRequired: !0,
  settingName: 'emulation.touch',
  settingType: 'enum',
  defaultValue: 'none',
  options: [{ value: 'none', title: Y(G.devicebased), text: Y(G.devicebased) }, {
    value: 'force',
    title: Y(G.forceEnabled),
    text: Y(G.forceEnabled)
  }]
}), o.Settings.registerSettingExtension({
  title: Y(G.emulateIdleDetectorState),
  settingName: 'emulation.idle-detection',
  settingType: 'enum',
  defaultValue: 'none',
  options: [{
    value: 'none',
    title: Y(G.noIdleEmulation),
    text: Y(G.noIdleEmulation)
  }, {
    value: '{"isUserActive":true,"isScreenUnlocked":true}',
    title: Y(G.userActiveScreenUnlocked),
    text: Y(G.userActiveScreenUnlocked)
  }, {
    value: '{"isUserActive":true,"isScreenUnlocked":false}',
    title: Y(G.userActiveScreenLocked),
    text: Y(G.userActiveScreenLocked)
  }, {
    value: '{"isUserActive":false,"isScreenUnlocked":true}',
    title: Y(G.userIdleScreenUnlocked),
    text: Y(G.userIdleScreenUnlocked)
  }, {
    value: '{"isUserActive":false,"isScreenUnlocked":false}',
    title: Y(G.userIdleScreenLocked),
    text: Y(G.userIdleScreenLocked)
  }]
});
const J = { accessibility: 'Accessibility', shoAccessibility: 'Show Accessibility' },
  $ = e.i18n.registerUIStrings('panels/accessibility/accessibility-meta.ts', J),
  ee = e.i18n.getLazilyComputedLocalizedString.bind(void 0, $);
let te;
t.ViewManager.registerViewExtension({
  location: 'elements-sidebar',
  id: 'accessibility.view',
  title: ee(J.accessibility),
  commandPrompt: ee(J.shoAccessibility),
  order: 10,
  persistence: 'permanent',
  loadView: async () => (await async function () {
    return Z || (Z = await import('../../panels/accessibility/accessibility.js')), Z
  }()).AccessibilitySidebarView.AccessibilitySidebarView.instance()
});
const oe = { animations: 'Animations', showAnimations: 'Show Animations' },
  ie = e.i18n.registerUIStrings('panels/animation/animation-meta.ts', oe),
  ne = e.i18n.getLazilyComputedLocalizedString.bind(void 0, ie);
t.ViewManager.registerViewExtension({
  location: 'drawer-view',
  id: 'animations',
  title: ne(oe.animations),
  commandPrompt: ne(oe.showAnimations),
  persistence: 'closeable',
  order: 0,
  loadView: async () => (await async function () {
    return te || (te = await import('../../panels/animation/animation.js')), te
  }()).AnimationTimeline.AnimationTimeline.instance()
});
const ae = { developerResources: 'Developer resources', showDeveloperResources: 'Show Developer resources' },
  re = e.i18n.registerUIStrings('panels/developer_resources/developer_resources-meta.ts', ae),
  se = e.i18n.getLazilyComputedLocalizedString.bind(void 0, re);
let le;

async function ce() {
  return le || (le = await import('../../panels/developer_resources/developer_resources.js')), le
}

t.ViewManager.registerViewExtension({
  location: 'drawer-view',
  id: 'developer-resources',
  title: se(ae.developerResources),
  commandPrompt: se(ae.showDeveloperResources),
  order: 100,
  persistence: 'closeable',
  loadView: async () => new ((await ce()).DeveloperResourcesView.DeveloperResourcesView)
}), o.Revealer.registerRevealer({
  contextTypes: () => [n.PageResourceLoader.ResourceKey],
  destination: o.Revealer.RevealerDestination.DEVELOPER_RESOURCES_PANEL,
  loadRevealer: async () => new ((await ce()).DeveloperResourcesView.DeveloperResourcesRevealer)
});
const de = { autofill: 'Autofill', showAutofill: 'Show Autofill' },
  ge = e.i18n.registerUIStrings('panels/autofill/autofill-meta.ts', de),
  we = e.i18n.getLazilyComputedLocalizedString.bind(void 0, ge);
let me;
t.ViewManager.registerViewExtension({
  experiment: 'autofill-view',
  location: 'drawer-view',
  id: 'autofill-view',
  title: we(de.autofill),
  commandPrompt: we(de.showAutofill),
  order: 100,
  persistence: 'closeable',
  async loadView() {
    const e = await async function () {
      return me || (me = await import('../../panels/autofill/autofill.js')), me
    }();
    return c.LegacyWrapper.legacyWrapper(t.Widget.Widget, new e.AutofillView.AutofillView)
  }
});
const pe = {
    rendering: 'Rendering',
    showRendering: 'Show Rendering',
    paint: 'paint',
    layout: 'layout',
    fps: 'fps',
    cssMediaType: 'CSS media type',
    cssMediaFeature: 'CSS media feature',
    visionDeficiency: 'vision deficiency',
    colorVisionDeficiency: 'color vision deficiency',
    reloadPage: 'Reload page',
    hardReloadPage: 'Hard reload page',
    forceAdBlocking: 'Force ad blocking on this site',
    blockAds: 'Block ads on this site',
    showAds: 'Show ads on this site, if allowed',
    autoOpenDevTools: 'Auto-open DevTools for popups',
    doNotAutoOpen: 'Do not auto-open DevTools for popups',
    disablePaused: 'Disable paused state overlay',
    toggleCssPrefersColorSchemeMedia: 'Toggle CSS media feature prefers-color-scheme'
  }, ue = e.i18n.registerUIStrings('entrypoints/inspector_main/inspector_main-meta.ts', pe),
  ye = e.i18n.getLazilyComputedLocalizedString.bind(void 0, ue);
let he;

async function Se() {
  return he || (he = await import('../inspector_main/inspector_main.js')), he
}

t.ViewManager.registerViewExtension({
  location: 'drawer-view',
  id: 'rendering',
  title: ye(pe.rendering),
  commandPrompt: ye(pe.showRendering),
  persistence: 'closeable',
  order: 50,
  loadView: async () => new ((await Se()).RenderingOptions.RenderingOptionsView),
  tags: [ye(pe.paint), ye(pe.layout), ye(pe.fps), ye(pe.cssMediaType), ye(pe.cssMediaFeature), ye(pe.visionDeficiency), ye(pe.colorVisionDeficiency)]
}), t.ActionRegistration.registerActionExtension({
  category: 'NAVIGATION',
  actionId: 'inspector-main.reload',
  loadActionDelegate: async () => new ((await Se()).InspectorMain.ReloadActionDelegate),
  iconClass: 'refresh',
  title: ye(pe.reloadPage),
  bindings: [{ platform: 'windows,linux', shortcut: 'Ctrl+R' }, {
    platform: 'windows,linux',
    shortcut: 'F5'
  }, { platform: 'mac', shortcut: 'Meta+R' }]
}), t.ActionRegistration.registerActionExtension({
  category: 'NAVIGATION',
  actionId: 'inspector-main.hard-reload',
  loadActionDelegate: async () => new ((await Se()).InspectorMain.ReloadActionDelegate),
  title: ye(pe.hardReloadPage),
  bindings: [{ platform: 'windows,linux', shortcut: 'Shift+Ctrl+R' }, {
    platform: 'windows,linux',
    shortcut: 'Shift+F5'
  }, { platform: 'windows,linux', shortcut: 'Ctrl+F5' }, {
    platform: 'windows,linux',
    shortcut: 'Ctrl+Shift+F5'
  }, { platform: 'mac', shortcut: 'Shift+Meta+R' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'rendering.toggle-prefers-color-scheme',
  category: 'RENDERING',
  title: ye(pe.toggleCssPrefersColorSchemeMedia),
  loadActionDelegate: async () => new ((await Se()).RenderingOptions.ReloadActionDelegate)
}), o.Settings.registerSettingExtension({
  category: 'NETWORK',
  title: ye(pe.forceAdBlocking),
  settingName: 'network.ad-blocking-enabled',
  settingType: 'boolean',
  storageType: 'Session',
  defaultValue: !1,
  options: [{ value: !0, title: ye(pe.blockAds) }, { value: !1, title: ye(pe.showAds) }]
}), o.Settings.registerSettingExtension({
  category: 'GLOBAL',
  storageType: 'Synced',
  title: ye(pe.autoOpenDevTools),
  settingName: 'auto-attach-to-created-pages',
  settingType: 'boolean',
  order: 2,
  defaultValue: !1,
  options: [{ value: !0, title: ye(pe.autoOpenDevTools) }, { value: !1, title: ye(pe.doNotAutoOpen) }]
}), o.Settings.registerSettingExtension({
  category: 'APPEARANCE',
  storageType: 'Synced',
  title: ye(pe.disablePaused),
  settingName: 'disable-paused-state-overlay',
  settingType: 'boolean',
  defaultValue: !1
}), t.Toolbar.registerToolbarItem({
  loadItem: async () => (await Se()).InspectorMain.NodeIndicator.instance(),
  order: 2,
  location: 'main-toolbar-left'
}), t.Toolbar.registerToolbarItem({
  loadItem: async () => (await Se()).OutermostTargetSelector.OutermostTargetSelector.instance(),
  order: 98,
  location: 'main-toolbar-right',
  experiment: 'outermost-target-selector'
});
const ve = {
    application: 'Application',
    showApplication: 'Show Application',
    pwa: 'pwa',
    clearSiteData: 'Clear site data',
    clearSiteDataIncludingThirdparty: 'Clear site data (including third-party cookies)',
    startRecordingEvents: 'Start recording events',
    stopRecordingEvents: 'Stop recording events'
  }, Re = e.i18n.registerUIStrings('panels/application/application-meta.ts', ve),
  Ee = e.i18n.getLazilyComputedLocalizedString.bind(void 0, Re);
let Ae;

async function be() {
  return Ae || (Ae = await import('../../panels/application/application.js')), Ae
}

t.ViewManager.registerViewExtension({
  location: 'panel',
  id: 'resources',
  title: Ee(ve.application),
  commandPrompt: Ee(ve.showApplication),
  order: 70,
  loadView: async () => (await be()).ResourcesPanel.ResourcesPanel.instance(),
  tags: [Ee(ve.pwa)]
}), t.ActionRegistration.registerActionExtension({
  category: 'RESOURCES',
  actionId: 'resources.clear',
  title: Ee(ve.clearSiteData),
  loadActionDelegate: async () => new ((await be()).StorageView.ActionDelegate)
}), t.ActionRegistration.registerActionExtension({
  category: 'RESOURCES',
  actionId: 'resources.clear-incl-third-party-cookies',
  title: Ee(ve.clearSiteDataIncludingThirdparty),
  loadActionDelegate: async () => new ((await be()).StorageView.ActionDelegate)
}), t.ActionRegistration.registerActionExtension({
  actionId: 'background-service.toggle-recording',
  iconClass: 'record-start',
  toggleable: !0,
  toggledIconClass: 'record-stop',
  toggleWithRedColor: !0,
  contextTypes: () => void 0 === Ae ? [] : (e => [e.BackgroundServiceView.BackgroundServiceView])(Ae),
  loadActionDelegate: async () => new ((await be()).BackgroundServiceView.ActionDelegate),
  category: 'BACKGROUND_SERVICES',
  options: [{ value: !0, title: Ee(ve.startRecordingEvents) }, { value: !1, title: Ee(ve.stopRecordingEvents) }],
  bindings: [{ platform: 'windows,linux', shortcut: 'Ctrl+E' }, { platform: 'mac', shortcut: 'Meta+E' }]
}), o.Revealer.registerRevealer({
  contextTypes: () => [n.Resource.Resource],
  destination: o.Revealer.RevealerDestination.APPLICATION_PANEL,
  loadRevealer: async () => new ((await be()).ResourcesPanel.ResourceRevealer)
}), o.Revealer.registerRevealer({
  contextTypes: () => [n.ResourceTreeModel.ResourceTreeFrame],
  destination: o.Revealer.RevealerDestination.APPLICATION_PANEL,
  loadRevealer: async () => new ((await be()).ResourcesPanel.FrameDetailsRevealer)
}), o.Revealer.registerRevealer({
  contextTypes: () => [d.PreloadingForward.RuleSetView],
  destination: o.Revealer.RevealerDestination.APPLICATION_PANEL,
  loadRevealer: async () => new ((await be()).ResourcesPanel.RuleSetViewRevealer)
}), o.Revealer.registerRevealer({
  contextTypes: () => [d.PreloadingForward.AttemptViewWithFilter],
  destination: o.Revealer.RevealerDestination.APPLICATION_PANEL,
  loadRevealer: async () => new ((await be()).ResourcesPanel.AttemptViewWithFilterRevealer)
});
const Pe = { issues: 'Issues', showIssues: 'Show Issues' },
  fe = e.i18n.registerUIStrings('panels/issues/issues-meta.ts', Pe),
  Te = e.i18n.getLazilyComputedLocalizedString.bind(void 0, fe);
let ke;

async function De() {
  return ke || (ke = await import('../../panels/issues/issues.js')), ke
}

t.ViewManager.registerViewExtension({
  location: 'drawer-view',
  id: 'issues-pane',
  title: Te(Pe.issues),
  commandPrompt: Te(Pe.showIssues),
  order: 100,
  persistence: 'closeable',
  loadView: async () => new ((await De()).IssuesPane.IssuesPane)
}), o.Revealer.registerRevealer({
  contextTypes: () => [g.Issue.Issue],
  destination: o.Revealer.RevealerDestination.ISSUES_VIEW,
  loadRevealer: async () => new ((await De()).IssueRevealer.IssueRevealer)
});
const Le = { layers: 'Layers', showLayers: 'Show Layers' },
  xe = e.i18n.registerUIStrings('panels/layers/layers-meta.ts', Le),
  Me = e.i18n.getLazilyComputedLocalizedString.bind(void 0, xe);
let Ie;
t.ViewManager.registerViewExtension({
  location: 'panel',
  id: 'layers',
  title: Me(Le.layers),
  commandPrompt: Me(Le.showLayers),
  order: 100,
  persistence: 'closeable',
  loadView: async () => (await async function () {
    return Ie || (Ie = await import('../../panels/layers/layers.js')), Ie
  }()).LayersPanel.LayersPanel.instance()
});
const Ne = { showLighthouse: 'Show `Lighthouse`' },
  Ce = e.i18n.registerUIStrings('panels/lighthouse/lighthouse-meta.ts', Ne),
  Ve = e.i18n.getLazilyComputedLocalizedString.bind(void 0, Ce);
let Oe;
t.ViewManager.registerViewExtension({
  location: 'panel',
  id: 'lighthouse',
  title: e.i18n.lockedLazyString('Lighthouse'),
  commandPrompt: Ve(Ne.showLighthouse),
  order: 90,
  loadView: async () => (await async function () {
    return Oe || (Oe = await import('../../panels/lighthouse/lighthouse.js')), Oe
  }()).LighthousePanel.LighthousePanel.instance(),
  tags: [e.i18n.lockedLazyString('lighthouse'), e.i18n.lockedLazyString('pwa')]
});
const Be = { media: 'Media', video: 'video', showMedia: 'Show Media' },
  ze = e.i18n.registerUIStrings('panels/media/media-meta.ts', Be),
  Ue = e.i18n.getLazilyComputedLocalizedString.bind(void 0, ze);
let We;
t.ViewManager.registerViewExtension({
  location: 'panel',
  id: 'medias',
  title: Ue(Be.media),
  commandPrompt: Ue(Be.showMedia),
  persistence: 'closeable',
  order: 100,
  loadView: async () => new ((await async function () {
    return We || (We = await import('../../panels/media/media.js')), We
  }()).MainView.MainView),
  tags: [Ue(Be.media), Ue(Be.video)]
});
const Fe = {
    throttling: 'Throttling',
    showThrottling: 'Show Throttling',
    goOffline: 'Go offline',
    device: 'device',
    throttlingTag: 'throttling',
    enableSlowGThrottling: 'Enable slow `3G` throttling',
    enableFastGThrottling: 'Enable fast `3G` throttling',
    goOnline: 'Go online'
  }, je = e.i18n.registerUIStrings('panels/mobile_throttling/mobile_throttling-meta.ts', Fe),
  _e = e.i18n.getLazilyComputedLocalizedString.bind(void 0, je);
let qe;

async function He() {
  return qe || (qe = await import('../../panels/mobile_throttling/mobile_throttling.js')), qe
}

t.ViewManager.registerViewExtension({
  location: 'settings-view',
  id: 'throttling-conditions',
  title: _e(Fe.throttling),
  commandPrompt: _e(Fe.showThrottling),
  order: 35,
  loadView: async () => new ((await He()).ThrottlingSettingsTab.ThrottlingSettingsTab),
  settings: ['custom-network-conditions'],
  iconName: 'performance'
}), t.ActionRegistration.registerActionExtension({
  actionId: 'network-conditions.network-offline',
  category: 'NETWORK',
  title: _e(Fe.goOffline),
  loadActionDelegate: async () => new ((await He()).ThrottlingManager.ActionDelegate),
  tags: [_e(Fe.device), _e(Fe.throttlingTag)]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'network-conditions.network-low-end-mobile',
  category: 'NETWORK',
  title: _e(Fe.enableSlowGThrottling),
  loadActionDelegate: async () => new ((await He()).ThrottlingManager.ActionDelegate),
  tags: [_e(Fe.device), _e(Fe.throttlingTag)]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'network-conditions.network-mid-tier-mobile',
  category: 'NETWORK',
  title: _e(Fe.enableFastGThrottling),
  loadActionDelegate: async () => new ((await He()).ThrottlingManager.ActionDelegate),
  tags: [_e(Fe.device), _e(Fe.throttlingTag)]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'network-conditions.network-online',
  category: 'NETWORK',
  title: _e(Fe.goOnline),
  loadActionDelegate: async () => new ((await He()).ThrottlingManager.ActionDelegate),
  tags: [_e(Fe.device), _e(Fe.throttlingTag)]
}), o.Settings.registerSettingExtension({
  storageType: 'Synced',
  settingName: 'custom-network-conditions',
  settingType: 'array',
  defaultValue: []
});
const Ge = {
    performanceMonitor: 'Performance monitor',
    performance: 'performance',
    systemMonitor: 'system monitor',
    monitor: 'monitor',
    activity: 'activity',
    metrics: 'metrics',
    showPerformanceMonitor: 'Show Performance monitor'
  }, Ke = e.i18n.registerUIStrings('panels/performance_monitor/performance_monitor-meta.ts', Ge),
  Ye = e.i18n.getLazilyComputedLocalizedString.bind(void 0, Ke);
let Xe;
t.ViewManager.registerViewExtension({
  location: 'drawer-view',
  id: 'performance.monitor',
  title: Ye(Ge.performanceMonitor),
  commandPrompt: Ye(Ge.showPerformanceMonitor),
  persistence: 'closeable',
  order: 100,
  loadView: async () => new ((await async function () {
    return Xe || (Xe = await import('../../panels/performance_monitor/performance_monitor.js')), Xe
  }()).PerformanceMonitor.PerformanceMonitorImpl),
  tags: [Ye(Ge.performance), Ye(Ge.systemMonitor), Ye(Ge.monitor), Ye(Ge.activity), Ye(Ge.metrics)]
});
const Ze = {
    performance: 'Performance',
    showPerformance: 'Show Performance',
    record: 'Record',
    stop: 'Stop',
    recordAndReload: 'Record and reload',
    saveProfile: 'Save profile…',
    loadProfile: 'Load profile…',
    previousFrame: 'Previous frame',
    nextFrame: 'Next frame',
    showRecentTimelineSessions: 'Show recent timeline sessions',
    previousRecording: 'Previous recording',
    nextRecording: 'Next recording',
    hideChromeFrameInLayersView: 'Hide `chrome` frame in Layers view'
  }, Qe = e.i18n.registerUIStrings('panels/timeline/timeline-meta.ts', Ze),
  Je = e.i18n.getLazilyComputedLocalizedString.bind(void 0, Qe);
let $e;

async function et() {
  return $e || ($e = await import('../../panels/timeline/timeline.js')), $e
}

function tt(e) {
  return void 0 === $e ? [] : e($e)
}

t.ViewManager.registerViewExtension({
  location: 'panel',
  id: 'timeline',
  title: Je(Ze.performance),
  commandPrompt: Je(Ze.showPerformance),
  order: 50,
  loadView: async () => (await et()).TimelinePanel.TimelinePanel.instance()
}), t.ActionRegistration.registerActionExtension({
  actionId: 'timeline.toggle-recording',
  category: 'PERFORMANCE',
  iconClass: 'record-start',
  toggleable: !0,
  toggledIconClass: 'record-stop',
  toggleWithRedColor: !0,
  contextTypes: () => tt((e => [e.TimelinePanel.TimelinePanel])),
  loadActionDelegate: async () => new ((await et()).TimelinePanel.ActionDelegate),
  options: [{ value: !0, title: Je(Ze.record) }, { value: !1, title: Je(Ze.stop) }],
  bindings: [{ platform: 'windows,linux', shortcut: 'Ctrl+E' }, { platform: 'mac', shortcut: 'Meta+E' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'timeline.record-reload',
  iconClass: 'refresh',
  contextTypes: () => tt((e => [e.TimelinePanel.TimelinePanel])),
  category: 'PERFORMANCE',
  title: Je(Ze.recordAndReload),
  loadActionDelegate: async () => new ((await et()).TimelinePanel.ActionDelegate),
  bindings: [{ platform: 'windows,linux', shortcut: 'Ctrl+Shift+E' }, { platform: 'mac', shortcut: 'Meta+Shift+E' }]
}), t.ActionRegistration.registerActionExtension({
  category: 'PERFORMANCE',
  actionId: 'timeline.save-to-file',
  contextTypes: () => tt((e => [e.TimelinePanel.TimelinePanel])),
  loadActionDelegate: async () => new ((await et()).TimelinePanel.ActionDelegate),
  title: Je(Ze.saveProfile),
  bindings: [{ platform: 'windows,linux', shortcut: 'Ctrl+S' }, { platform: 'mac', shortcut: 'Meta+S' }]
}), t.ActionRegistration.registerActionExtension({
  category: 'PERFORMANCE',
  actionId: 'timeline.load-from-file',
  contextTypes: () => tt((e => [e.TimelinePanel.TimelinePanel])),
  loadActionDelegate: async () => new ((await et()).TimelinePanel.ActionDelegate),
  title: Je(Ze.loadProfile),
  bindings: [{ platform: 'windows,linux', shortcut: 'Ctrl+O' }, { platform: 'mac', shortcut: 'Meta+O' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'timeline.jump-to-previous-frame',
  category: 'PERFORMANCE',
  title: Je(Ze.previousFrame),
  contextTypes: () => tt((e => [e.TimelinePanel.TimelinePanel])),
  loadActionDelegate: async () => new ((await et()).TimelinePanel.ActionDelegate),
  bindings: [{ shortcut: '[' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'timeline.jump-to-next-frame',
  category: 'PERFORMANCE',
  title: Je(Ze.nextFrame),
  contextTypes: () => tt((e => [e.TimelinePanel.TimelinePanel])),
  loadActionDelegate: async () => new ((await et()).TimelinePanel.ActionDelegate),
  bindings: [{ shortcut: ']' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'timeline.show-history',
  loadActionDelegate: async () => new ((await et()).TimelinePanel.ActionDelegate),
  category: 'PERFORMANCE',
  title: Je(Ze.showRecentTimelineSessions),
  contextTypes: () => tt((e => [e.TimelinePanel.TimelinePanel])),
  bindings: [{ platform: 'windows,linux', shortcut: 'Ctrl+H' }, { platform: 'mac', shortcut: 'Meta+Y' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'timeline.previous-recording',
  category: 'PERFORMANCE',
  loadActionDelegate: async () => new ((await et()).TimelinePanel.ActionDelegate),
  title: Je(Ze.previousRecording),
  contextTypes: () => tt((e => [e.TimelinePanel.TimelinePanel])),
  bindings: [{ platform: 'windows,linux', shortcut: 'Alt+Left' }, { platform: 'mac', shortcut: 'Meta+Left' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'timeline.next-recording',
  category: 'PERFORMANCE',
  loadActionDelegate: async () => new ((await et()).TimelinePanel.ActionDelegate),
  title: Je(Ze.nextRecording),
  contextTypes: () => tt((e => [e.TimelinePanel.TimelinePanel])),
  bindings: [{ platform: 'windows,linux', shortcut: 'Alt+Right' }, { platform: 'mac', shortcut: 'Meta+Right' }]
}), o.Settings.registerSettingExtension({
  category: 'PERFORMANCE',
  storageType: 'Synced',
  title: Je(Ze.hideChromeFrameInLayersView),
  settingName: 'frame-viewer-hide-chrome-window',
  settingType: 'boolean',
  defaultValue: !1
}), o.Linkifier.registerLinkifier({
  contextTypes: () => tt((e => [e.CLSLinkifier.CLSRect])),
  loadLinkifier: async () => (await et()).CLSLinkifier.Linkifier.instance()
}), t.ContextMenu.registerItem({
  location: 'timelineMenu/open',
  actionId: 'timeline.load-from-file',
  order: 10
}), t.ContextMenu.registerItem({
  location: 'timelineMenu/open',
  actionId: 'timeline.save-to-file',
  order: 15
}), o.Revealer.registerRevealer({
  contextTypes: () => [n.TraceObject.TraceObject],
  destination: o.Revealer.RevealerDestination.TIMELINE_PANEL,
  loadRevealer: async () => new ((await et()).TimelinePanel.TraceRevealer)
});
const ot = { webaudio: 'WebAudio', audio: 'audio', showWebaudio: 'Show WebAudio' },
  it = e.i18n.registerUIStrings('panels/web_audio/web_audio-meta.ts', ot),
  nt = e.i18n.getLazilyComputedLocalizedString.bind(void 0, it);
let at;
t.ViewManager.registerViewExtension({
  location: 'drawer-view',
  id: 'web-audio',
  title: nt(ot.webaudio),
  commandPrompt: nt(ot.showWebaudio),
  persistence: 'closeable',
  order: 100,
  loadView: async () => new ((await async function () {
    return at || (at = await import('../../panels/web_audio/web_audio.js')), at
  }()).WebAudioView.WebAudioView),
  tags: [nt(ot.audio)]
});
const rt = { webauthn: 'WebAuthn', showWebauthn: 'Show WebAuthn' },
  st = e.i18n.registerUIStrings('panels/webauthn/webauthn-meta.ts', rt),
  lt = e.i18n.getLazilyComputedLocalizedString.bind(void 0, st);
let ct;
t.ViewManager.registerViewExtension({
  location: 'drawer-view',
  id: 'webauthn-pane',
  title: lt(rt.webauthn),
  commandPrompt: lt(rt.showWebauthn),
  order: 100,
  persistence: 'closeable',
  loadView: async () => new ((await async function () {
    return ct || (ct = await import('../../panels/webauthn/webauthn.js')), ct
  }()).WebauthnPane.WebauthnPaneImpl)
});
const dt = {
    resetView: 'Reset view',
    switchToPanMode: 'Switch to pan mode',
    switchToRotateMode: 'Switch to rotate mode',
    zoomIn: 'Zoom in',
    zoomOut: 'Zoom out',
    panOrRotateUp: 'Pan or rotate up',
    panOrRotateDown: 'Pan or rotate down',
    panOrRotateLeft: 'Pan or rotate left',
    panOrRotateRight: 'Pan or rotate right'
  }, gt = e.i18n.registerUIStrings('panels/layer_viewer/layer_viewer-meta.ts', dt),
  wt = e.i18n.getLazilyComputedLocalizedString.bind(void 0, gt);
t.ActionRegistration.registerActionExtension({
  actionId: 'layers.reset-view',
  category: 'LAYERS',
  title: wt(dt.resetView),
  bindings: [{ shortcut: '0' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'layers.pan-mode',
  category: 'LAYERS',
  title: wt(dt.switchToPanMode),
  bindings: [{ shortcut: 'x' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'layers.rotate-mode',
  category: 'LAYERS',
  title: wt(dt.switchToRotateMode),
  bindings: [{ shortcut: 'v' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'layers.zoom-in',
  category: 'LAYERS',
  title: wt(dt.zoomIn),
  bindings: [{ shortcut: 'Shift+Plus' }, { shortcut: 'NumpadPlus' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'layers.zoom-out',
  category: 'LAYERS',
  title: wt(dt.zoomOut),
  bindings: [{ shortcut: 'Shift+Minus' }, { shortcut: 'NumpadMinus' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'layers.up',
  category: 'LAYERS',
  title: wt(dt.panOrRotateUp),
  bindings: [{ shortcut: 'Up' }, { shortcut: 'w' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'layers.down',
  category: 'LAYERS',
  title: wt(dt.panOrRotateDown),
  bindings: [{ shortcut: 'Down' }, { shortcut: 's' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'layers.left',
  category: 'LAYERS',
  title: wt(dt.panOrRotateLeft),
  bindings: [{ shortcut: 'Left' }, { shortcut: 'a' }]
}), t.ActionRegistration.registerActionExtension({
  actionId: 'layers.right',
  category: 'LAYERS',
  title: wt(dt.panOrRotateRight),
  bindings: [{ shortcut: 'Right' }, { shortcut: 'd' }]
});
const mt = {
    recorder: 'Recorder',
    showRecorder: 'Show Recorder',
    startStopRecording: 'Start/Stop recording',
    createRecording: 'Create a new recording',
    replayRecording: 'Replay recording',
    toggleCode: 'Toggle code view'
  }, pt = e.i18n.registerUIStrings('panels/recorder/recorder-meta.ts', mt),
  ut = e.i18n.getLazilyComputedLocalizedString.bind(void 0, pt);
let yt;

async function ht() {
  return yt || (yt = await import('../../panels/recorder/recorder.js')), yt
}

function St(e, t) {
  return void 0 === yt ? [] : t && yt.RecorderPanel.RecorderPanel.instance().isActionPossible(t) ? e(yt) : []
}

const vt = 'chrome-recorder';
t.ViewManager.defaultOptionsForTabs[vt] = !0, t.ViewManager.registerViewExtension({
  location: 'panel',
  id: vt,
  commandPrompt: ut(mt.showRecorder),
  title: ut(mt.recorder),
  order: 90,
  persistence: 'closeable',
  loadView: async () => (await ht()).RecorderPanel.RecorderPanel.instance()
}), t.ActionRegistration.registerActionExtension({
  category: 'RECORDER',
  actionId: 'chrome-recorder.create-recording',
  title: ut(mt.createRecording),
  loadActionDelegate: async () => new ((await ht()).RecorderPanel.ActionDelegate)
}), t.ActionRegistration.registerActionExtension({
  category: 'RECORDER',
  actionId: 'chrome-recorder.start-recording',
  title: ut(mt.startStopRecording),
  contextTypes: () => St((e => [e.RecorderPanel.RecorderPanel]), 'chrome-recorder.start-recording'),
  loadActionDelegate: async () => new ((await ht()).RecorderPanel.ActionDelegate),
  bindings: [{ shortcut: 'Ctrl+E', platform: 'windows,linux' }, { shortcut: 'Meta+E', platform: 'mac' }]
}), t.ActionRegistration.registerActionExtension({
  category: 'RECORDER',
  actionId: 'chrome-recorder.replay-recording',
  title: ut(mt.replayRecording),
  contextTypes: () => St((e => [e.RecorderPanel.RecorderPanel]), 'chrome-recorder.replay-recording'),
  loadActionDelegate: async () => new ((await ht()).RecorderPanel.ActionDelegate),
  bindings: [{ shortcut: 'Ctrl+Enter', platform: 'windows,linux' }, { shortcut: 'Meta+Enter', platform: 'mac' }]
}), t.ActionRegistration.registerActionExtension({
  category: 'RECORDER',
  actionId: 'chrome-recorder.toggle-code-view',
  title: ut(mt.toggleCode),
  contextTypes: () => St((e => [e.RecorderPanel.RecorderPanel]), 'chrome-recorder.toggle-code-view'),
  loadActionDelegate: async () => new ((await ht()).RecorderPanel.ActionDelegate),
  bindings: [{ shortcut: 'Ctrl+B', platform: 'windows,linux' }, { shortcut: 'Meta+B', platform: 'mac' }]
}), self.runtime = i.Runtime.Runtime.instance({ forceNew: !0 }), new w.MainImpl.MainImpl;