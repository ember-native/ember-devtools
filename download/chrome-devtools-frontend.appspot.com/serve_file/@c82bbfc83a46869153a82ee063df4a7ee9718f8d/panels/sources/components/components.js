import*as e from"../../../core/common/common.js";import*as t from"../../../core/host/host.js";import*as n from"../../../core/i18n/i18n.js";import*as o from"../../../core/platform/platform.js";import{assertNotNullOrUndefined as i}from"../../../core/platform/platform.js";import*as a from"../../../core/sdk/sdk.js";import*as r from"../../../models/bindings/bindings.js";import*as s from"../../../models/breakpoints/breakpoints.js";import*as l from"../../../models/text_utils/text_utils.js";import*as c from"../../../models/workspace/workspace.js";import*as d from"../../../ui/components/icon_button/icon_button.js";import*as p from"../../../ui/components/input/input.js";import*as h from"../../../ui/components/legacy_wrapper/legacy_wrapper.js";import*as u from"../../../ui/components/render_coordinator/render_coordinator.js";import*as g from"../../../ui/legacy/legacy.js";import*as m from"../../../ui/lit-html/lit-html.js";import*as b from"../../../ui/visual_logging/visual_logging.js";import*as k from"../../../models/persistence/persistence.js";import*as v from"../../../ui/components/buttons/buttons.js";import*as f from"../../../ui/components/helpers/helpers.js";const x=new CSSStyleSheet;x.replaceSync(':host{flex:auto;display:flex;flex-direction:column}.code-snippet{width:100%;font-family:var(--source-code-font-family);font-size:var(--source-code-font-size);color:var(--sys-color-token-subtle);text-overflow:ellipsis;overflow:hidden;white-space:nowrap;flex-shrink:100;cursor:pointer}.code-snippet:hover{color:var(--sys-color-on-surface);text-decoration:underline}input{height:12px;width:12px;flex-shrink:0;margin:3px 0}details{border-top:1px solid var(--sys-color-divider);padding:2px 0}details:not(.active){background-color:var(--sys-color-state-disabled-container);opacity:30%}details > summary{min-height:20px;list-style:none;display:flex;padding:0 8px 0 6px;align-items:center}details > summary:hover{background-color:var(--sys-color-state-hover-on-subtle)}details > summary::before{display:block;user-select:none;mask-image:var(--image-file-triangle-right);background-color:var(--icon-default);content:"";height:14px;min-width:14px;max-width:14px;margin-left:-4px;overflow:hidden;transition:transform 200ms}details[open] > summary::before{transform:rotate(90deg)}.group-header{display:inline-flex;align-items:center;width:100%;padding-right:8px;overflow:hidden}.group-icon-or-disable{justify-content:center;display:flex;width:16px;margin-left:2px}.group-header-title{margin-left:4px;text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.group-header-differentiator{font-weight:normal;color:var(--sys-color-state-disabled);margin-left:8px}.group-hover-actions{display:flex;align-items:center;justify-content:right;font-size:10px;font-weight:500}.breakpoint-item-location-or-actions{min-width:20px;flex:0 0 auto;display:flex;padding-left:8px;justify-content:right}button{cursor:pointer;width:13px;height:13px;border:none;background-color:transparent;display:none;align-items:center;justify-content:center}button + span{padding-left:6px}button + button{padding-left:11px}summary:hover button{display:flex}devtools-icon{width:16px;height:16px;button:hover &{color:var(--icon-default-hover)}}.type-indicator{--override-color-conditional-breakpoint:var(--ref-palette-orange70);--override-color-logpoint:var(--ref-palette-pink60);border-right:4px solid;border-radius:0 2px 2px 0;border-color:transparent;height:16px}.breakpoint-item{display:flex;align-items:center;line-height:13px;height:20px;padding-right:8px}.breakpoint-item.hit{background-color:var(--sys-color-yellow-container);color:var(--sys-color-on-yellow-container)}.breakpoint-item.hit:focus{background-color:var(--sys-color-tonal-container)}.theme-with-dark-background .type-indicator,\n:host-context(.theme-with-dark-background) .type-indicator{--override-color-conditional-breakpoint:var(--ref-palette-yellow60);--override-color-logpoint:var(--ref-palette-pink70)}.breakpoint-item.logpoint > label > .type-indicator{border-color:var(--override-color-logpoint)}.breakpoint-item.conditional-breakpoint > label > .type-indicator{border-color:var(--override-color-conditional-breakpoint)}.checkbox-label{display:flex;align-items:center}.checkbox-label > input{margin-left:16px;margin-right:6px}devtools-icon[name="file-script"]{color:var(--icon-file-script);width:18px;height:18px;summary:hover &{display:none}}input.group-checkbox{margin:0;display:none}summary:hover .group-checkbox{display:flex}.location{line-height:14px;text-overflow:ellipsis;overflow:hidden}.breakpoint-item:hover button{display:flex}.pause-on-uncaught-exceptions{margin-top:3px}.pause-on-caught-exceptions{margin-bottom:3px}input:disabled + span{color:var(--sys-color-state-disabled)}.pause-on-caught-exceptions > .checkbox-label > input,\n.pause-on-uncaught-exceptions > .checkbox-label > input{margin-left:6px}.pause-on-caught-exceptions > .checkbox-label > span,\n.pause-on-uncaught-exceptions > .checkbox-label > span{text-overflow:ellipsis;overflow:hidden;white-space:nowrap}.pause-on-uncaught-exceptions,\n.pause-on-caught-exceptions{line-height:13px;height:18px;padding-right:8px;& > label{width:fit-content}}details > summary:focus,\n.breakpoint-item:focus,\n.pause-on-uncaught-exceptions:focus,\n.pause-on-caught-exceptions:focus{background-color:var(--sys-color-tonal-container);outline-width:0}\n/*# sourceURL=breakpointsView.css */\n');const y=e=>"tree"===e.getAttribute("role"),w=e=>null!==e.getAttribute("data-first-pause")||null!==e.getAttribute("data-last-pause"),S=e=>!(e=>"treeitem"===e.getAttribute("role"))(e),C=e=>null!==e.getAttribute("open"),E=e=>e.querySelector("[data-first-breakpoint]"),B=e=>{const t=T(e);return t&&t instanceof HTMLDetailsElement?t?.querySelector("summary"):null},I=e=>e.querySelector("summary"),T=e=>{const t=e.nextElementSibling;return t&&t instanceof HTMLDetailsElement?t:null};async function $(e,t,n){if(w(e))return function(e,t){console.assert(w(e));let n=null;switch(t){case"ArrowUp":{const t=e.previousElementSibling;t instanceof HTMLElement&&(n=t,console.assert(w(n)));break}case"ArrowDown":{const t=e.nextElementSibling;if(t instanceof HTMLElement)if(y(t)){const e=t.querySelector("[data-first-group]");e&&(n=I(e))}else n=t,console.assert(w(n));break}}return n}(e,t);const o=e.parentElement;if(!(o&&o instanceof HTMLDetailsElement))throw new Error("The selected nodes should be direct children of an HTMLDetails element.");let i=null;switch(t){case"ArrowLeft":if(!S(e))return I(o);C(o)&&await n(o,!1);break;case"ArrowRight":if(S(e)){if(C(o))return E(o);await n(o,!0)}break;case"ArrowDown":if(S(e))i=C(o)?E(o):B(o);else{const t=e.nextElementSibling;i=t&&t instanceof HTMLDivElement?t:B(o)}break;case"ArrowUp":if(S(e)){const e=(e=>{const t=e.previousElementSibling;return t&&t instanceof HTMLDetailsElement?t:null})(o);if(e)i=C(e)?(e=>e.querySelector("[data-last-breakpoint]"))(e):I(e);else{const e=o.parentElement?.previousElementSibling;e instanceof HTMLElement&&(i=e)}}else{const t=e.previousElementSibling;t instanceof HTMLElement&&(i=t)}}return i}function L(e,t,n){const o=[];let i=t.filter((t=>t!==e));for(let t=n;t<e.length;++t){const n=e[t];if(o.push(n),i=i.filter((e=>e.length>t&&e[t]===n)),0===i.length)break}return o}function A(t,n){const o=t.map((t=>{const n=e.ParsedURL.ParsedURL.fromString(t)?.folderPathComponents.slice(1);return i(n),n.split("/").reverse()})),a=function(e){const t=e[0];let n=-1;for(let o=0;o<t.length&&-1===n;++o){const i=t[o];for(let t=1;t<e.length;++t){const a=e[t];if(a.length<=o||a[o]!==i){n=o;break}}}return-1===n?t.length:n}(o);for(let e=0;e<o.length;++e){const i=L(o[e],o,a).reverse().join("/");0===a?n.set(t[e],i+"/"):n.set(t[e],i+"/…/")}console.assert(new Set(n.values()).size===t.length,"Differentiators should be unique.")}function O(e){const t=new Map,n=new Map;for(const{name:n,url:o}of e)t.has(n)||t.set(n,[]),t.get(n)?.push(o);for(const e of t.values())e.length>1&&A(e,n);return n}var M=Object.freeze({__proto__:null,findNextNodeForKeyboardNavigation:$,getDifferentiatingPathMap:O});const D={pauseOnUncaughtExceptions:"Pause on uncaught exceptions",pauseOnCaughtExceptions:"Pause on caught exceptions",checked:"checked",unchecked:"unchecked",indeterminate:"mixed",breakpointHit:"{PH1} breakpoint hit",removeAllBreakpointsInFile:"Remove all breakpoints in file",disableAllBreakpointsInFile:"Disable all breakpoints in file",enableAllBreakpointsInFile:"Enable all breakpoints in file",editCondition:"Edit condition",editLogpoint:"Edit logpoint",disableAllBreakpoints:"Disable all breakpoints",enableAllBreakpoints:"Enable all breakpoints",removeBreakpoint:"Remove breakpoint",removeAllBreakpoints:"Remove all breakpoints",removeOtherBreakpoints:"Remove other breakpoints",revealLocation:"Reveal location",conditionCode:"Condition: {PH1}",logpointCode:"Logpoint: {PH1}"},N=n.i18n.registerUIStrings("panels/sources/components/BreakpointsView.ts",D),R=n.i18n.getLocalizedString.bind(void 0,N),H=u.RenderCoordinator.RenderCoordinator.instance();let j,U;class P{#e;#t=new WeakMap;#n;#o;#i;#a;#r;#s;#l=!1;#c=!1;constructor(t,n){this.#a=e.Settings.Settings.instance().createSetting("collapsed-files",[]),this.#r=new Set(this.#a.get()),this.#e=t,this.#e.addEventListener(s.BreakpointManager.Events.BreakpointAdded,this.#d,this),this.#e.addEventListener(s.BreakpointManager.Events.BreakpointRemoved,this.#p,this),this.#n=n.moduleSetting("breakpoints-active"),this.#n.addChangeListener(this.update,this),this.#o=n.moduleSetting("pause-on-uncaught-exception"),this.#o.addChangeListener(this.update,this),this.#i=n.moduleSetting("pause-on-caught-exception"),this.#i.addChangeListener(this.update,this)}static instance({forceNew:t,breakpointManager:n,settings:o}={forceNew:null,breakpointManager:s.BreakpointManager.BreakpointManager.instance(),settings:e.Settings.Settings.instance()}){return U&&!t||(U=new P(n,o)),U}static removeInstance(){U=null}static targetSupportsIndependentPauseOnExceptionToggles(){return!a.TargetManager.TargetManager.instance().targets().some((e=>e.type()===a.Target.Type.Node))}flavorChanged(e){this.update()}breakpointEditFinished(e,n){this.#s&&this.#s===e&&(n&&t.userMetrics.actionTaken(t.UserMetrics.Action.BreakpointConditionEditedFromSidebar),this.#s=void 0)}breakpointStateChanged(e,t){this.#h(e).forEach((e=>{e.breakpoint.setEnabled(t)}))}async breakpointEdited(t,n){const o=this.#h(t);let i;for(const e of o)(!i||e.uiLocation.compareTo(i.uiLocation)<0)&&(i=e);i&&(n&&(this.#s=i.breakpoint),await e.Revealer.reveal(i))}breakpointsRemoved(e){e.flatMap((e=>this.#h(e))).forEach((e=>e?.breakpoint.remove(!1)))}expandedStateChanged(e,t){t?this.#r.delete(e):this.#r.add(e),this.#u()}async jumpToSource(t){const n=this.#h(t).map((e=>e.uiLocation));let o;for(const e of n)(!o||e.compareTo(o)<0)&&(o=e);o&&await e.Revealer.reveal(o)}setPauseOnUncaughtExceptions(e){this.#o.set(e)}setPauseOnCaughtExceptions(e){this.#i.set(e)}async update(){if(this.#l=!0,!this.#c){for(this.#c=!0;this.#l;){this.#l=!1;const e=await this.getUpdatedBreakpointViewData();F.instance().data=e}this.#c=!1}}async getUpdatedBreakpointViewData(){const e=this.#n.get(),t=P.targetSupportsIndependentPauseOnExceptionToggles(),n=this.#o.get(),o=this.#i.get(),i=this.#g();if(!i.length)return{breakpointsActive:e,pauseOnCaughtExceptions:o,pauseOnUncaughtExceptions:n,independentPauseToggles:t,groups:[]};const a=this.#m(i),r=this.#b(i),[s,c]=await Promise.all([this.#k(a),this.#v()]),d=new Map;for(let e=0;e<a.length;e++){const t=a[e],n=t[0],o=n.uiLocation.uiSourceCode.url(),i=n.uiLocation.uiSourceCode.canononicalScriptId(),p=n.uiLocation,h=null!==c&&t.some((e=>e.uiLocation.id()===c.id())),u=r.get(p.lineId()).size>1,g=p.lineAndColumnText(u),m=s[e],b=m instanceof l.WasmDisassembly.WasmDisassembly?m.lines[m.bytecodeOffsetToLineNumber(p.columnNumber??0)]??"":m.textObj.lineAt(p.lineNumber);h&&this.#r.has(o)&&(this.#r.delete(o),this.#u());const k=!this.#r.has(o),v=this.#f(t),{type:f,hoverText:x}=this.#x(t),y={id:n.breakpoint.breakpointStorageId(),location:g,codeSnippet:b,isHit:h,status:v,type:f,hoverText:x};this.#t.set(y,t);let w=d.get(i);if(w)w.breakpointItems.push(y),w.expanded||=k;else{const e=this.#e.supportsConditionalBreakpoints(p.uiSourceCode);w={url:o,name:p.uiSourceCode.displayName(),editable:e,expanded:k,breakpointItems:[y]},d.set(i,w)}}return{breakpointsActive:e,pauseOnCaughtExceptions:o,pauseOnUncaughtExceptions:n,independentPauseToggles:t,groups:Array.from(d.values())}}#d(e){const t=e.data.breakpoint;return"USER_ACTION"===t.origin&&this.#r.has(t.url())&&(this.#r.delete(t.url()),this.#u()),this.update()}#p(e){const t=e.data.breakpoint;if(this.#r.has(t.url())){s.BreakpointManager.BreakpointManager.instance().allBreakpointLocations().some((e=>e.breakpoint.url()===t.url()))||(this.#r.delete(t.url()),this.#u())}return this.update()}#u(){this.#a.set(Array.from(this.#r.values()))}#x(e){const t=e.find((e=>Boolean(e.breakpoint.condition()))),n=t?.breakpoint;if(!n||!n.condition())return{type:"REGULAR_BREAKPOINT"};const o=n.condition();return n.isLogpoint()?{type:"LOGPOINT",hoverText:o}:{type:"CONDITIONAL_BREAKPOINT",hoverText:o}}#h(e){const t=this.#t.get(e);return i(t),t}async#v(){const e=g.Context.Context.instance().flavor(a.DebuggerModel.DebuggerPausedDetails);return e&&e.callFrames.length?await r.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance().rawLocationToUILocation(e.callFrames[0].location()):null}#g(){const e=this.#e.allBreakpointLocations().filter((e=>e.uiLocation.uiSourceCode.project().type()!==c.Workspace.projectTypes.Debugger));e.sort(((e,t)=>e.uiLocation.compareTo(t.uiLocation)));const t=[];let n=null,o=null;for(const i of e)(i.breakpoint!==n||o&&i.uiLocation.compareTo(o))&&(t.push(i),n=i.breakpoint,o=i.uiLocation);return t}#m(e){const t=new o.MapUtilities.Multimap;for(const n of e){const e=n.uiLocation;t.set(e.id(),n)}const n=[];for(const e of t.keysArray()){const o=Array.from(t.get(e));o.length&&n.push(o)}return n}#b(e){const t=new o.MapUtilities.Multimap;for(const n of e){const e=n.uiLocation;t.set(e.lineId(),e.id())}return t}#f(e){const t=e.some((e=>e.breakpoint.enabled())),n=e.some((e=>!e.breakpoint.enabled()));let o;return o=t?n?"INDETERMINATE":"ENABLED":"DISABLED",o}#k(e){return Promise.all(e.map((async([{uiLocation:{uiSourceCode:e}}])=>{const t=await e.requestContentData({cachedWasmOnly:!0});return l.ContentData.ContentData.contentDataOrEmpty(t)})))}}class F extends h.LegacyWrapper.WrappableComponent{#y;static instance({forceNew:e}={forceNew:!1}){return j&&!e||(j=h.LegacyWrapper.legacyWrapper(g.Widget.Widget,new F)),j.getComponent()}constructor(){super(),this.#y=P.instance(),this.setAttribute("jslog",`${b.section("sources.js-breakpoints")}`),this.#y.update()}static litTagName=m.literal`devtools-breakpoint-view`;#w=this.attachShadow({mode:"open"});#S=!1;#C=!1;#E=!1;#B=!0;#I=[];#T=new Map;set data(e){this.#S=e.pauseOnUncaughtExceptions,this.#C=e.pauseOnCaughtExceptions,this.#E=e.independentPauseToggles,this.#B=e.breakpointsActive,this.#I=e.groups;const t=[];for(const n of e.groups)t.push({name:n.name,url:n.url});this.#T=O(t),this.render()}connectedCallback(){this.#w.adoptedStyleSheets=[p.checkboxStyles,x]}async render(){await H.write("BreakpointsView render",(()=>{const e=async e=>{const t=e.currentTarget;await this.#$(t),e.consume()},t=(this.#E||this.#S)&&this.#C,n=!this.#E&&!this.#S,o=m.html`
        <div class='pause-on-uncaught-exceptions'
            tabindex='0'
            @click=${e}
            @keydown=${this.#L}
            role='checkbox'
            aria-checked=${this.#S}
            data-first-pause>
          <label class='checkbox-label'>
            <input type='checkbox' tabindex=-1 class="small" ?checked=${this.#S} @change=${this.#A.bind(this)} jslog=${b.toggle("pause-uncaught").track({change:!0})}>
            <span>${R(D.pauseOnUncaughtExceptions)}</span>
          </label>
        </div>
        <div class='pause-on-caught-exceptions'
              tabindex='-1'
              @click=${e}
              @keydown=${this.#L}
              role='checkbox'
              aria-checked=${t}
              data-last-pause>
            <label class='checkbox-label'>
              <input data-pause-on-caught-checkbox type='checkbox' class="small" tabindex=-1 ?checked=${t} ?disabled=${n} @change=${this.#O.bind(this)} jslog=${b.toggle("pause-on-caught-exception").track({change:!0})}>
              <span>${R(D.pauseOnCaughtExceptions)}</span>
            </label>
        </div>
        <div role=tree>
          ${m.Directives.repeat(this.#I,(e=>e.url),((e,t)=>m.html`${this.#M(e,t)}`))}
        </div>`;m.render(o,this.#w,{host:this})})),await H.write("BreakpointsView make pause-on-exceptions focusable",(()=>{if(null===this.#w.querySelector('[tabindex="0"]')){const e=this.#w.querySelector("[data-first-pause]");e?.setAttribute("tabindex","0")}}))}async#L(e){if(e.target&&e.target instanceof HTMLElement){if("Home"===e.key||"End"===e.key)return e.consume(!0),this.#D(e.key);if(o.KeyboardUtilities.keyIsArrowKey(e.key))return e.consume(!0),this.#N(e.key,e.target);if(o.KeyboardUtilities.isEnterOrSpaceKey(e)){const t=e.currentTarget;await this.#$(t);const n=t.querySelector("input");n&&n.click(),e.consume()}}}async#$(e){e&&H.write("BreakpointsView focus on selected element",(()=>{const t=this.#w.querySelector('[tabindex="0"]');t?.setAttribute("tabindex","-1"),e.setAttribute("tabindex","0"),e.focus()}))}async#N(e,t){const n=await $(t,e,((e,t)=>t?H.write("BreakpointsView expand",(()=>{e.setAttribute("open","")})):H.write("BreakpointsView expand",(()=>{e.removeAttribute("open")}))));return this.#$(n)}async#D(e){if("Home"===e){const e=this.#w.querySelector("[data-first-pause]");return this.#$(e)}if("End"===e){const e=this.#I.length;if(0===e){const e=this.#w.querySelector("[data-last-pause]");return this.#$(e)}const t=e-1;if(this.#I[t].expanded){const e=this.#w.querySelector("[data-last-group] > [data-last-breakpoint]");return this.#$(e)}const n=this.#w.querySelector("[data-last-group] > summary");return this.#$(n)}}#R(e){const t="LOGPOINT"===e.type?R(D.editLogpoint):R(D.editCondition);return m.html`
    <button data-edit-breakpoint @click=${t=>{this.#y.breakpointEdited(e,!0),t.consume()}} title=${t} jslog=${b.action("edit-breakpoint").track({click:!0})}>
      <${d.Icon.Icon.litTagName} name="edit"></${d.Icon.Icon.litTagName}>
    </button>
      `}#H(e,n,o){return m.html`
    <button data-remove-breakpoint @click=${n=>{t.userMetrics.actionTaken(o),this.#y.breakpointsRemoved(e),n.consume()}} title=${n} aria-label=${n} jslog=${b.action("remove-breakpoint").track({click:!0})}>
      <${d.Icon.Icon.litTagName} name="bin"></${d.Icon.Icon.litTagName}>
    </button>
      `}#j(e,n){const{breakpointItems:o}=n,i=new g.ContextMenu.ContextMenu(e);i.defaultSection().appendItem(R(D.removeAllBreakpointsInFile),(()=>{t.userMetrics.actionTaken(t.UserMetrics.Action.BreakpointsInFileRemovedFromContextMenu),this.#y.breakpointsRemoved(o)}),{jslogContext:"remove-file-breakpoints"});const a=this.#I.filter((e=>e!==n));i.defaultSection().appendItem(R(D.removeOtherBreakpoints),(()=>{const e=a.map((({breakpointItems:e})=>e)).flat();this.#y.breakpointsRemoved(e)}),{disabled:0===a.length,jslogContext:"remove-other-breakpoints"}),i.defaultSection().appendItem(R(D.removeAllBreakpoints),(()=>{const e=this.#I.map((({breakpointItems:e})=>e)).flat();this.#y.breakpointsRemoved(e)}),{jslogContext:"remove-all-breakpoints"});const r=o.filter((e=>"ENABLED"!==e.status));i.debugSection().appendItem(R(D.enableAllBreakpointsInFile),(()=>{t.userMetrics.actionTaken(t.UserMetrics.Action.BreakpointsInFileEnabledDisabledFromContextMenu);for(const e of r)this.#y.breakpointStateChanged(e,!0)}),{disabled:0===r.length,jslogContext:"enable-file-breakpoints"});const s=o.filter((e=>"DISABLED"!==e.status));i.debugSection().appendItem(R(D.disableAllBreakpointsInFile),(()=>{t.userMetrics.actionTaken(t.UserMetrics.Action.BreakpointsInFileEnabledDisabledFromContextMenu);for(const e of s)this.#y.breakpointStateChanged(e,!1)}),{disabled:0===s.length,jslogContext:"disable-file-breakpoints"}),i.show()}#M(e,n){const o={active:this.#B};return m.html`
      <details class=${m.Directives.classMap(o)}
               ?data-first-group=${0===n}
               ?data-last-group=${n===this.#I.length-1}
               role=group
               aria-label='${e.name}'
               aria-description='${e.url}'
               ?open=${m.Directives.live(e.expanded)}
               @toggle=${t=>{const n=t.target;e.expanded=n.open,this.#y.expandedStateChanged(e.url,e.expanded)}}>
          <summary @contextmenu=${t=>{this.#j(t,e),t.consume()}}
                   tabindex='-1'
                   @keydown=${this.#L}
                   @click=${async e=>{const n=e.currentTarget;await this.#$(n),t.userMetrics.actionTaken(t.UserMetrics.Action.BreakpointGroupExpandedStateChanged),e.consume()}}>
            <span class='group-header' aria-hidden=true><span class='group-icon-or-disable'>${this.#U()}${this.#P(e)}</span><span class='group-header-title' title='${e.url}'>${e.name}<span class='group-header-differentiator'>${this.#T.get(e.url)}</span></span></span>
            <span class='group-hover-actions'>
              ${this.#H(e.breakpointItems,R(D.removeAllBreakpointsInFile),t.UserMetrics.Action.BreakpointsInFileRemovedFromRemoveButton)}
            </span>
          </summary>
        ${m.Directives.repeat(e.breakpointItems,(e=>e.id),((t,o)=>this.#F(t,e.editable,n,o)))}
      </details>
      `}#P(e){const n=e.breakpointItems.some((e=>"ENABLED"===e.status));return m.html`
      <input class='group-checkbox small' type='checkbox'
            aria-label=''
            .checked=${n}
            @change=${n=>{t.userMetrics.actionTaken(t.UserMetrics.Action.BreakpointsInFileCheckboxToggled);const o=n.target,i=o.checked?"ENABLED":"DISABLED";e.breakpointItems.filter((e=>e.status!==i)).forEach((e=>{this.#y.breakpointStateChanged(e,o.checked)})),n.consume()}}
            tabindex=-1
            jslog=${b.toggle("breakpoint-group").track({change:!0})}>
    `}#U(){return m.html`<${d.Icon.Icon.litTagName} name="file-script"></${d.Icon.Icon.litTagName}>`}#W(e,n,o){const i=this.#I.map((({breakpointItems:e})=>e)).flat(),a=i.filter((e=>e!==n)),r=new g.ContextMenu.ContextMenu(e),s="LOGPOINT"===n.type?R(D.editLogpoint):R(D.editCondition);r.revealSection().appendItem(R(D.revealLocation),(()=>{this.#y.jumpToSource(n)}),{jslogContext:"jump-to-breakpoint"}),r.editSection().appendItem(s,(()=>{this.#y.breakpointEdited(n,!1)}),{disabled:!o,jslogContext:"edit-breakpoint"}),r.defaultSection().appendItem(R(D.enableAllBreakpoints),i.forEach.bind(i,(e=>this.#y.breakpointStateChanged(e,!0))),{disabled:i.every((e=>"ENABLED"===e.status)),jslogContext:"enable-all-breakpoints"}),r.defaultSection().appendItem(R(D.disableAllBreakpoints),i.forEach.bind(i,(e=>this.#y.breakpointStateChanged(e,!1))),{disabled:i.every((e=>"DISABLED"===e.status)),jslogContext:"disable-all-breakpoints"}),r.footerSection().appendItem(R(D.removeBreakpoint),(()=>{t.userMetrics.actionTaken(t.UserMetrics.Action.BreakpointRemovedFromContextMenu),this.#y.breakpointsRemoved([n])}),{jslogContext:"remove-breakpoint"}),r.footerSection().appendItem(R(D.removeOtherBreakpoints),(()=>{this.#y.breakpointsRemoved(a)}),{disabled:0===a.length,jslogContext:"remove-other-breakpoints"}),r.footerSection().appendItem(R(D.removeAllBreakpoints),(()=>{const e=this.#I.map((({breakpointItems:e})=>e)).flat();this.#y.breakpointsRemoved(e)}),{jslogContext:"remove-all-breakpoints"}),r.show()}#F(e,n,i,a){const r={"breakpoint-item":!0,hit:e.isHit,"conditional-breakpoint":"CONDITIONAL_BREAKPOINT"===e.type,logpoint:"LOGPOINT"===e.type},s=this.#_(e),l=o.StringUtilities.trimEndWithMaxLength(e.codeSnippet,200),c=this.#G(e.type,e.hoverText),d=this.#I[i].breakpointItems;return m.html`
    <div class=${m.Directives.classMap(r)}
         ?data-first-breakpoint=${0===a}
         ?data-last-breakpoint=${a===d.length-1}
         aria-label=${s}
         role=treeitem
         tabindex='-1'
         @contextmenu=${t=>{this.#W(t,e,n),t.consume()}}
         @click=${async e=>{const t=e.currentTarget;await this.#$(t),e.consume()}}
         @keydown=${this.#L}>
      <label class='checkbox-label'>
        <span class='type-indicator'></span>
        <input type='checkbox'
              aria-label=${e.location}
              class='small'
              ?indeterminate=${"INDETERMINATE"===e.status}
              .checked=${"ENABLED"===e.status}
              @change=${t=>this.#V(t,e)}
              tabindex=-1
              jslog=${b.toggle("breakpoint").track({change:!0})}>
      </label>
      <span class='code-snippet' @click=${t=>{this.#y.jumpToSource(e),t.consume()}} title=${c} jslog=${b.action("sources.jump-to-breakpoint").track({click:!0})}>${l}</span>
      <span class='breakpoint-item-location-or-actions'>
        ${n?this.#R(e):m.nothing}
        ${this.#H([e],R(D.removeBreakpoint),t.UserMetrics.Action.BreakpointRemovedFromRemoveButton)}
        <span class='location'>${e.location}</span>
      </span>
    </div>
    `}#G(e,t){switch(e){case"REGULAR_BREAKPOINT":return;case"CONDITIONAL_BREAKPOINT":return i(t),R(D.conditionCode,{PH1:t});case"LOGPOINT":return i(t),R(D.logpointCode,{PH1:t})}}#_(e){let t;switch(e.status){case"ENABLED":t=R(D.checked);break;case"DISABLED":t=R(D.unchecked);break;case"INDETERMINATE":t=R(D.indeterminate)}return e.isHit?R(D.breakpointHit,{PH1:t}):t}#V(e,t){const n=e.target;this.#y.breakpointStateChanged(t,n.checked)}#O(e){const{checked:t}=e.target;this.#y.setPauseOnCaughtExceptions(t)}#A(e){const{checked:t}=e.target;if(!this.#E){const e=this.#w.querySelector("[data-pause-on-caught-checkbox]");i(e),!t&&e.checked&&e.click(),H.write("BreakpointsView update pause-on-uncaught-exception",(()=>{e.disabled=!t}))}this.#y.setPauseOnUncaughtExceptions(t)}}customElements.define("devtools-breakpoint-view",F);var W=Object.freeze({__proto__:null,BreakpointsSidebarController:P,BreakpointsView:F});const _=new CSSStyleSheet;_.replaceSync(":host{flex-grow:1;padding:6px}.row{display:flex;flex-direction:row;color:var(--sys-color-token-property-special);font-family:var(--monospace-font-family);font-size:var(--monospace-font-size);align-items:center;line-height:24px}.row devtools-button{line-height:1;margin-left:0.1em}.row devtools-button:nth-of-type(1){margin-left:0.8em}.padded{margin-left:2em}.separator{margin-right:0.5em;color:var(--sys-color-on-surface)}.editable{cursor:text;color:var(--sys-color-on-surface);overflow-wrap:break-word;min-height:18px;line-height:18px;min-width:0.5em;background:transparent;border:none;outline:none;display:inline-block}.editable.red{color:var(--sys-color-token-property-special)}.editable:hover,\n.editable:focus{border:1px solid var(--sys-color-neutral-outline);border-radius:2px}.row .inline-button{opacity:0%;visibility:hidden;transition:opacity 200ms}.row:focus-within .inline-button:not([hidden]),\n.row:hover .inline-button:not([hidden]){opacity:100%;visibility:visible}.center-wrapper{height:100%;display:flex;justify-content:center;align-items:center}.centered{margin:1em;max-width:300px;text-align:center}.error-header{font-weight:bold;margin-bottom:1em}.error-body{line-height:1.5em;color:var(--sys-color-token-subtle)}.add-block{margin-top:3px}.header-name,\n.header-value{min-width:min-content}.link{color:var(--sys-color-primary);text-decoration:underline;cursor:pointer;outline-offset:2px;padding:0}.learn-more-row{line-height:24px}\n/*# sourceURL=HeadersView.css */\n");const G={addHeader:"Add a header",removeHeader:"Remove this header",removeBlock:"Remove this '`ApplyTo`'-section",errorWhenParsing:"Error when parsing ''{PH1}''.",parsingErrorExplainer:"This is most likely due to a syntax error in ''{PH1}''. Try opening this file in an external editor to fix the error or delete the file and re-create the override.",addOverrideRule:"Add override rule",learnMore:"Learn more"},V=n.i18n.registerUIStrings("panels/sources/components/HeadersView.ts",G),q=n.i18n.getLocalizedString.bind(void 0,V),K=new URL("../../../Images/plus.svg",import.meta.url).toString(),z=new URL("../../../Images/bin.svg",import.meta.url).toString(),J="header value",Q=e=>`header-name-${e}`;class X extends g.View.SimpleView{#q=new Y;#K;constructor(e){super(n.i18n.lockedString("HeadersView")),this.element.setAttribute("jslog",`${b.pane("headers-view")}`),this.#K=e,this.#K.addEventListener(c.UISourceCode.Events.WorkingCopyChanged,this.#z,this),this.#K.addEventListener(c.UISourceCode.Events.WorkingCopyCommitted,this.#J,this),this.element.appendChild(this.#q),this.#Q()}async#Q(){const e=await this.#K.requestContent();this.#X(e.content||"")}#X(e){let t=!1,n=[];e=e||"[]";try{if(n=JSON.parse(e),!n.every(k.NetworkPersistenceManager.isHeaderOverride))throw"Type mismatch after parsing"}catch(e){console.error("Failed to parse",this.#K.url(),"for locally overriding headers."),t=!0}this.#q.data={headerOverrides:n,uiSourceCode:this.#K,parsingError:t}}#z(){this.#X(this.#K.workingCopy())}#J(){this.#X(this.#K.workingCopy())}getComponent(){return this.#q}dispose(){this.#K.removeEventListener(c.UISourceCode.Events.WorkingCopyChanged,this.#z,this),this.#K.removeEventListener(c.UISourceCode.Events.WorkingCopyCommitted,this.#J,this)}}class Y extends HTMLElement{static litTagName=m.literal`devtools-sources-headers-view`;#w=this.attachShadow({mode:"open"});#Y=this.#Z.bind(this);#ee=[];#K=null;#te=!1;#ne=null;#oe="";constructor(){super(),this.#w.addEventListener("focusin",this.#ie.bind(this)),this.#w.addEventListener("focusout",this.#ae.bind(this)),this.#w.addEventListener("click",this.#re.bind(this)),this.#w.addEventListener("input",this.#se.bind(this)),this.#w.addEventListener("keydown",this.#le.bind(this)),this.#w.addEventListener("paste",this.#ce.bind(this)),this.addEventListener("contextmenu",this.#de.bind(this))}connectedCallback(){this.#w.adoptedStyleSheets=[_]}set data(e){this.#ee=e.headerOverrides,this.#K=e.uiSourceCode,this.#te=e.parsingError,f.ScheduledRender.scheduleRender(this,this.#Y)}#le(e){const t=e.target;if(!t.matches(".editable"))return;const n=e;!t.matches(".header-name")||""!==t.innerText||"Enter"!==n.key&&"Tab"!==n.key?"Enter"===n.key?(e.preventDefault(),t.blur(),this.#pe(t)):"Escape"===n.key&&(e.consume(),t.innerText=this.#oe,t.blur(),this.#he(t)):(e.preventDefault(),t.blur())}#pe(e){const t=Array.from(this.#w.querySelectorAll(".editable")),n=t.indexOf(e);-1!==n&&n+1<t.length&&t[n+1].focus()}#ue(e){const t=window.getSelection(),n=document.createRange();n.selectNodeContents(e),t?.removeAllRanges(),t?.addRange(n)}#ie(e){const t=e.target;t.matches(".editable")&&(this.#ue(t),this.#oe=t.innerText)}#ae(e){const t=e.target;if(""===t.innerText){const e=t.closest(".row"),n=Number(e.dataset.blockIndex),o=Number(e.dataset.headerIndex);t.matches(".apply-to")?(t.innerText="*",this.#ee[n].applyTo="*",this.#ge()):t.matches(".header-name")&&this.#me(n,o)}const n=window.getSelection();n?.removeAllRanges(),this.#K?.commitWorkingCopy()}#de(e){if(!this.#K)return;const t=new g.ContextMenu.ContextMenu(e);t.appendApplicableItems(this.#K),t.show()}#be(e){const t=new Set(e.map((e=>e.name)));let n=1;for(;t.has(Q(n));)n++;return Q(n)}#re(e){const t=e.target,n=t.closest(".row"),o=Number(n?.dataset.blockIndex||0),i=Number(n?.dataset.headerIndex||0);t.matches(".add-header")?(this.#ee[o].headers.splice(i+1,0,{name:this.#be(this.#ee[o].headers),value:J}),this.#ne={blockIndex:o,headerIndex:i+1},this.#ge()):t.matches(".remove-header")?this.#me(o,i):t.matches(".add-block")?(this.#ee.push({applyTo:"*",headers:[{name:Q(1),value:J}]}),this.#ne={blockIndex:this.#ee.length-1},this.#ge()):t.matches(".remove-block")&&(this.#ee.splice(o,1),this.#ge())}#ke(e,t){return!(0===t&&1===this.#ee[e].headers.length&&this.#ee[e].headers[t].name===Q(1)&&this.#ee[e].headers[t].value===J)}#me(e,t){this.#ee[e].headers.splice(t,1),0===this.#ee[e].headers.length&&this.#ee[e].headers.push({name:this.#be(this.#ee[e].headers),value:J}),this.#ge()}#se(e){this.#he(e.target)}#he(e){const t=e.closest(".row"),n=Number(t.dataset.blockIndex),o=Number(t.dataset.headerIndex);e.matches(".header-name")&&(this.#ee[n].headers[o].name=e.innerText,this.#ge()),e.matches(".header-value")&&(this.#ee[n].headers[o].value=e.innerText,this.#ge()),e.matches(".apply-to")&&(this.#ee[n].applyTo=e.innerText,this.#ge())}#ge(){this.#K?.setWorkingCopy(JSON.stringify(this.#ee,null,2)),t.userMetrics.actionTaken(t.UserMetrics.Action.HeaderOverrideHeadersFileEdited)}#ce(e){const t=e;if(e.preventDefault(),t.clipboardData){const n=t.clipboardData.getData("text/plain"),o=this.#w.getSelection()?.getRangeAt(0);if(!o)return;o.deleteContents();const i=document.createTextNode(n);o.insertNode(i),o.selectNodeContents(i),o.collapse(!1);const a=window.getSelection();a?.removeAllRanges(),a?.addRange(o),this.#he(e.target)}}#Z(){if(!f.ScheduledRender.isScheduledRender(this))throw new Error("HeadersView render was not scheduled");if(this.#te){const e=this.#K?.name()||".headers";m.render(m.html`
        <div class="center-wrapper">
          <div class="centered">
            <div class="error-header">${q(G.errorWhenParsing,{PH1:e})}</div>
            <div class="error-body">${q(G.parsingErrorExplainer,{PH1:e})}</div>
          </div>
        </div>
      `,this.#w,{host:this})}else if(m.render(m.html`
      ${this.#ee.map(((e,t)=>m.html`
          ${this.#ve(e.applyTo,t)}
          ${e.headers.map(((e,n)=>m.html`
              ${this.#fe(e,t,n)}
            `))}
        `))}
      <${v.Button.Button.litTagName}
          .variant=${"outlined"}
          .jslogContext=${"headers-view.add-override-rule"}
          class="add-block">
        ${q(G.addOverrideRule)}
      </${v.Button.Button.litTagName}>
      <div class="learn-more-row">
        <x-link
            href="https://goo.gle/devtools-override"
            class="link"
            jslog=${b.link("learn-more").track({click:!0})}>${q(G.learnMore)}</x-link>
      </div>
    `,this.#w,{host:this}),this.#ne){let e=null;e=this.#ne.headerIndex?this.#w.querySelector(`[data-block-index="${this.#ne.blockIndex}"][data-header-index="${this.#ne.headerIndex}"] .header-name`):this.#w.querySelector(`[data-block-index="${this.#ne.blockIndex}"] .apply-to`),e&&e.focus(),this.#ne=null}}#ve(e,t){return m.html`
      <div class="row" data-block-index=${t}
           jslog=${b.treeItem("*"===e?e:void 0)}>
        <div>${n.i18n.lockedString("Apply to")}</div>
        <div class="separator">:</div>
        ${this.#xe(e,"apply-to")}
        <${v.Button.Button.litTagName}
        title=${q(G.removeBlock)}
        .size=${"SMALL"}
        .iconUrl=${z}
        .iconWidth=${"14px"}
        .iconHeight=${"14px"}
        .variant=${"icon"}
        .jslogContext=${"headers-view.remove-apply-to-section"}
        class="remove-block inline-button"
      ></${v.Button.Button.litTagName}>
      </div>
    `}#fe(e,t,n){return m.html`
      <div class="row padded" data-block-index=${t} data-header-index=${n}
           jslog=${b.treeItem(e.name).parent("headers-editor-row-parent")}>
        ${this.#xe(e.name,"header-name red",!0)}
        <div class="separator">:</div>
        ${this.#xe(e.value,"header-value")}
        <${v.Button.Button.litTagName}
          title=${q(G.addHeader)}
          .size=${"SMALL"}
          .iconUrl=${K}
          .variant=${"icon"}
          .jslogContext=${"headers-view.add-header"}
          class="add-header inline-button"
        ></${v.Button.Button.litTagName}>
        <${v.Button.Button.litTagName}
          title=${q(G.removeHeader)}
          .size=${"SMALL"}
          .iconUrl=${z}
          .variant=${"icon"}
          ?hidden=${!this.#ke(t,n)}
          .jslogContext=${"headers-view.remove-header"}
          class="remove-header inline-button"
        ></${v.Button.Button.litTagName}>
      </div>
    `}#xe(e,t,n){const o=n?b.key():b.value();return m.html`<span jslog=${o.track({change:!0,keydown:"Enter|Escape|Tab",click:!0})}
                              contenteditable="true"
                              class="editable ${t}"
                              tabindex="0"
                              .innerText=${m.Directives.live(e)}></span>`}}b.registerParentProvider("headers-editor-row-parent",(e=>{for(;e.previousElementSibling?.classList?.contains("padded");)e=e.previousElementSibling;return e.previousElementSibling||void 0})),customElements.define("devtools-sources-headers-view",Y);var Z=Object.freeze({__proto__:null,HeadersView:X,HeadersViewComponent:Y});export{W as BreakpointsView,M as BreakpointsViewUtils,Z as HeadersView};
