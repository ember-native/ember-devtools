import*as e from"../../../services/trace_bounds/trace_bounds.js";import*as t from"../../../core/i18n/i18n.js";import*as i from"../../../models/trace/trace.js";import*as r from"../../../ui/components/helpers/helpers.js";import*as n from"../../../ui/components/icon_button/icon_button.js";import*as o from"../../../ui/lit-html/lit-html.js";import*as a from"../../../ui/visual_logging/visual_logging.js";import*as s from"../../../core/sdk/sdk.js";import*as l from"../../../ui/components/menus/menus.js";import*as d from"../../mobile_throttling/mobile_throttling.js";import*as c from"../../../core/platform/platform.js";import*as h from"../../../ui/legacy/legacy.js";import*as g from"../../../models/crux-manager/crux-manager.js";import*as u from"../../../ui/components/buttons/buttons.js";import*as m from"../../../ui/components/data_grid/data_grid.js";import*as p from"../../../ui/components/dialogs/dialogs.js";import*as v from"../../../ui/components/input/input.js";import*as f from"../../../core/common/common.js";import*as b from"../../../models/emulation/emulation.js";import*as w from"../../../models/live-metrics/live-metrics.js";import*as y from"../../../ui/components/legacy_wrapper/legacy_wrapper.js";import*as k from"../../../ui/components/request_link_icon/request_link_icon.js";import*as S from"../../../ui/legacy/components/perf_ui/perf_ui.js";import*as x from"../../../ui/legacy/components/utils/utils.js";import*as $ from"../utils/utils.js";import*as P from"../../../ui/legacy/theme_support/theme_support.js";import*as C from"../../../core/root/root.js";import*as T from"./insights/insights.js";function R(e){const t=[e];let i=e;for(;null!==i.child;){const e=i.child;null!==e&&(t.push(e),i=e)}return t}var L=Object.freeze({__proto__:null,flattenBreadcrumbs:R,Breadcrumbs:class{initialBreadcrumb;lastBreadcrumb;constructor(e){this.initialBreadcrumb={window:e,child:null},this.lastBreadcrumb=this.initialBreadcrumb}add(e){if(!this.isTraceWindowWithinTraceWindow(e,this.lastBreadcrumb.window))throw new Error("Can not add a breadcrumb that is equal to or is outside of the parent breadcrumb TimeWindow");{const t={window:e,child:null};this.lastBreadcrumb.child=t,this.setLastBreadcrumb(t)}}isTraceWindowWithinTraceWindow(e,t){return e.min>=t.min&&e.max<=t.max&&!(e.min===t.min&&e.max===t.max)}setInitialBreadcrumbFromLoadedModifications(e){this.initialBreadcrumb=e;let t=e;for(;null!==t.child;)t=t.child;this.setLastBreadcrumb(t)}setLastBreadcrumb(t){this.lastBreadcrumb=t,this.lastBreadcrumb.child=null,e.TraceBounds.BoundsManager.instance().setMiniMapBounds(t.window),e.TraceBounds.BoundsManager.instance().setTimelineVisibleWindow(t.window)}}});const M=new CSSStyleSheet;M.replaceSync(".breadcrumbs{display:none;align-items:center;height:29px;padding:3px;overflow-y:hidden;overflow-x:scroll}.breadcrumbs::-webkit-scrollbar{display:none}.breadcrumb{padding:2px 6px;border-radius:4px}.breadcrumb:hover{background-color:var(--sys-color-state-hover-on-subtle)}.range{font-size:12px;white-space:nowrap}.last-breadcrumb{font-weight:bold;color:var(--app-color-active-breadcrumb)}\n/*# sourceURL=breadcrumbsUI.css */\n");const{render:D,html:N}=o;class I extends Event{breadcrumb;static eventName="breadcrumbremoved";constructor(e){super(I.eventName),this.breadcrumb=e}}class H extends HTMLElement{static litTagName=o.literal`devtools-breadcrumbs-ui`;#e=this.attachShadow({mode:"open"});#t=this.#i.bind(this);#r=null;connectedCallback(){this.#e.adoptedStyleSheets=[M]}set data(e){this.#r=e.breadcrumb,r.ScheduledRender.scheduleRender(this,this.#t)}#n(e){this.dispatchEvent(new I(e))}#o(){const e=this.#e.querySelector(".breadcrumbs");e&&(e.style.display="flex",requestAnimationFrame((()=>{e.scrollWidth-e.clientWidth>0&&requestAnimationFrame((()=>{e.scrollLeft=e.scrollWidth-e.clientWidth}))})))}#a(e,r){const o=i.Helpers.Timing.microSecondsToMilliseconds(e.window.range);return N`
          <div class="breadcrumb" @click=${()=>this.#n(e)}
          jslog=${a.item("timeline.breadcrumb-select").track({click:!0})}>
           <span class="${0!==r&&null===e.child?"last-breadcrumb":""} range">
            ${0===r?`Full range (${t.TimeUtilities.preciseMillisToString(o,2)})`:`${t.TimeUtilities.preciseMillisToString(o,2)}`}
            </span>
          </div>
          ${null!==e.child?N`
            <${n.Icon.Icon.litTagName} .data=${{iconName:"chevron-right",color:"var(--icon-default)",width:"16px",height:"16px"}}>`:""}
      `}#i(){const e=N`
      ${null===this.#r?N``:N`<div class="breadcrumbs" jslog=${a.section("breadcrumbs")}>
        ${R(this.#r).map(((e,t)=>this.#a(e,t)))}
      </div>`}
    `;D(e,this.#e,{host:this}),this.#r?.child&&this.#o()}}customElements.define("devtools-breadcrumbs-ui",H);var F=Object.freeze({__proto__:null,BreadcrumbRemovedEvent:I,BreadcrumbsUI:H});const{html:O}=o,E={cpu:"CPU: {PH1}",cpuThrottling:"CPU throttling: {PH1}",noThrottling:"No throttling",dSlowdown:"{PH1}× slowdown"},q=t.i18n.registerUIStrings("panels/timeline/components/CPUThrottlingSelector.ts",E),B=t.i18n.getLocalizedString.bind(void 0,q);class A extends HTMLElement{static litTagName=o.literal`devtools-cpu-throttling-selector`;#e=this.attachShadow({mode:"open"});#s;constructor(){super(),this.#s=s.CPUThrottlingManager.CPUThrottlingManager.instance().cpuThrottlingRate(),this.#i()}connectedCallback(){s.CPUThrottlingManager.CPUThrottlingManager.instance().addEventListener("RateChanged",this.#l,this)}disconnectedCallback(){s.CPUThrottlingManager.CPUThrottlingManager.instance().removeEventListener("RateChanged",this.#l,this)}#l(e){this.#s=e.data,r.ScheduledRender.scheduleRender(this,this.#i)}#d(e){d.ThrottlingManager.throttlingManager().setCPUThrottlingRate(Number(e.itemValue))}#i=()=>{const e=1===this.#s?B(E.noThrottling):B(E.dSlowdown,{PH1:this.#s}),t=O`
      <${l.SelectMenu.SelectMenu.litTagName}
            @selectmenuselected=${this.#d}
            .showDivider=${!0}
            .showArrow=${!0}
            .sideButton=${!1}
            .showSelectedItem=${!0}
            .showConnector=${!1}
            .jslogContext=${"cpu-throttling"}
            .buttonTitle=${B(E.cpu,{PH1:e})}
            title=${B(E.cpuThrottling,{PH1:e})}
          >
          ${d.ThrottlingPresets.ThrottlingPresets.cpuThrottlingPresets.map((e=>{const t=1===e?B(E.noThrottling):B(E.dSlowdown,{PH1:e}),i=1===e?"cpu-no-throttling":`cpu-throttled-${e}`;return o.html`
              <${l.Menu.MenuItem.litTagName}
                .value=${e}
                .selected=${this.#s===e}
                jslog=${a.item(i).track({click:!0})}
              >
                ${t}
              </${l.Menu.MenuItem.litTagName}>
            `}))}
      </${l.SelectMenu.SelectMenu.litTagName}>
    `;o.render(t,this.#e,{host:this})}}customElements.define("devtools-cpu-throttling-selector",A);var U=Object.freeze({__proto__:null,CPUThrottlingSelector:A});const z={forcedReflow:"Forced reflow",sIsALikelyPerformanceBottleneck:"{PH1} is a likely performance bottleneck.",idleCallbackExecutionExtended:"Idle callback execution extended beyond deadline by {PH1}",sTookS:"{PH1} took {PH2}.",longTask:"Long task",longInteractionINP:"Long interaction",sIsLikelyPoorPageResponsiveness:"{PH1} is indicating poor page responsiveness.",websocketProtocol:"WebSocket Protocol",webSocketBytes:"{PH1} byte(s)",webSocketDataLength:"Data Length"},_=t.i18n.registerUIStrings("panels/timeline/components/DetailsView.ts",z),W=t.i18n.getLocalizedString.bind(void 0,_);var V=Object.freeze({__proto__:null,buildWarningElementsForEvent:function(e,r){const n=r.Warnings.perEvent.get(e),o=[];if(!n)return o;for(const r of n){const n=i.Helpers.Timing.microSecondsToMilliseconds(i.Types.Timing.MicroSeconds(e.dur||0)),a=document.createElement("span");switch(r){case"FORCED_REFLOW":{const e=h.XLink.XLink.create("https://developers.google.com/web/fundamentals/performance/rendering/avoid-large-complex-layouts-and-layout-thrashing#avoid-forced-synchronous-layouts",W(z.forcedReflow),void 0,void 0,"forced-reflow");a.appendChild(t.i18n.getFormatLocalizedString(_,z.sIsALikelyPerformanceBottleneck,{PH1:e}));break}case"IDLE_CALLBACK_OVER_TIME":{if(!i.Types.TraceEvents.isTraceEventFireIdleCallback(e))break;const r=t.TimeUtilities.millisToString((n||0)-e.args.data.allottedMilliseconds,!0);a.textContent=W(z.idleCallbackExecutionExtended,{PH1:r});break}case"LONG_TASK":{const e=h.XLink.XLink.create("https://web.dev/optimize-long-tasks/",W(z.longTask),void 0,void 0,"long-tasks");a.appendChild(t.i18n.getFormatLocalizedString(_,z.sTookS,{PH1:e,PH2:t.TimeUtilities.millisToString(n||0,!0)}));break}case"LONG_INTERACTION":{const e=h.XLink.XLink.create("https://web.dev/inp",W(z.longInteractionINP),void 0,void 0,"long-interaction");a.appendChild(t.i18n.getFormatLocalizedString(_,z.sIsLikelyPoorPageResponsiveness,{PH1:e}));break}default:c.assertNever(r,`Unhandled warning type ${r}`)}o.push(a)}return o},buildRowsForWebSocketEvent:function(e,r){const n=[],o=r.Initiators.eventToInitiator.get(e);return o&&i.Types.TraceEvents.isTraceEventWebSocketCreate(o)?(n.push({key:t.i18n.lockedString("URL"),value:o.args.data.url}),o.args.data.websocketProtocol&&n.push({key:W(z.websocketProtocol),value:o.args.data.websocketProtocol})):i.Types.TraceEvents.isTraceEventWebSocketCreate(e)&&(n.push({key:t.i18n.lockedString("URL"),value:e.args.data.url}),e.args.data.websocketProtocol&&n.push({key:W(z.websocketProtocol),value:e.args.data.websocketProtocol})),i.Types.TraceEvents.isTraceEventWebSocketTransfer(e)&&e.args.data.dataLength&&n.push({key:W(z.webSocketDataLength),value:`${W(z.webSocketBytes,{PH1:e.args.data.dataLength})}`}),n},generateInvalidationsList:function(e){const t={},r=new Set;for(const n of e){r.add(n.args.data.nodeId);let e=n.args.data.reason||"unknown";if("unknown"===e&&i.Types.TraceEvents.isTraceEventScheduleStyleInvalidationTracking(n)&&n.args.data.invalidatedSelectorId)switch(n.args.data.invalidatedSelectorId){case"attribute":e="Attribute",n.args.data.changedAttribute&&(e+=` (${n.args.data.changedAttribute})`);break;case"class":e="Class",n.args.data.changedClass&&(e+=` (${n.args.data.changedClass})`);break;case"id":e="Id",n.args.data.changedId&&(e+=` (${n.args.data.changedId})`)}if("PseudoClass"===e&&i.Types.TraceEvents.isTraceEventStyleRecalcInvalidationTracking(n)&&n.args.data.extraData&&(e+=n.args.data.extraData),"Attribute"===e&&i.Types.TraceEvents.isTraceEventStyleRecalcInvalidationTracking(n)&&n.args.data.extraData&&(e+=` (${n.args.data.extraData})`),"StyleInvalidator"===e)continue;const o=t[e]||[];o.push(n),t[e]=o}return{groupedByReason:t,backendNodeIds:r}}});const j=new CSSStyleSheet;j.replaceSync(':host{display:block}:host *{box-sizing:border-box}devtools-dialog{--override-transparent:color-mix(in sRGB,var(--color-background) 80%,transparent)}.title{font-size:var(--sys-typescale-headline4-size);line-height:var(--sys-typescale-headline4-line-height);font-weight:var(--ref-typeface-weight-medium);margin:0}.section-title{font-size:var(--sys-typescale-headline5-size);line-height:var(--sys-typescale-headline5-line-height);font-weight:var(--ref-typeface-weight-medium);margin:0}.privacy-disclosure{margin:8px 0}.url-override{margin:8px 0;display:flex;align-items:center;overflow:hidden;text-overflow:ellipsis;max-width:max-content}details > summary{font-size:var(--sys-typescale-body4-size);line-height:var(--sys-typescale-body4-line-height);font-weight:var(--ref-typeface-weight-medium)}.content{max-width:360px;padding:16px 20px 18px;box-sizing:border-box}.open-button-section{display:flex;flex-direction:row}.origin-mapping-grid{border:1px solid var(--sys-color-divider);margin-top:8px}.origin-mapping-button-section{display:flex;flex-direction:column;align-items:center;margin-top:6px}.config-button{margin-left:auto}.advanced-section-contents{margin:4px 0 14px}.buttons-section{display:flex;justify-content:flex-end;margin-top:6px;gap:8px}input[type="checkbox"]{height:12px;width:12px;min-height:12px;min-width:12px;margin:6px}input[type="text"][disabled]{color:var(--sys-color-state-disabled)}.warning{margin:2px 8px;color:var(--color-error-text)}x-link{color:var(--sys-color-primary);text-decoration-line:underline}.divider{margin:10px 0;border:none;border-top:1px solid var(--sys-color-divider)}\n/*# sourceURL=fieldSettingsDialog.css */\n');const G={setUp:"Set up",configure:"Configure",ok:"Ok",optOut:"Opt out",cancel:"Cancel",onlyFetchFieldData:"Always show field data for the below URL",url:"URL",doesNotHaveSufficientData:"The Chrome UX Report does not have sufficient real-world speed data for this page.",configureFieldData:"Configure field data fetching",fetchAggregated:"Fetch aggregated field data from the {PH1} to help you contextualize local measurements with what real users experience on the site.",privacyDisclosure:"Privacy disclosure",whenPerformanceIsShown:"When DevTools is open, the URLs you visit will be sent to Google to query field data. These requests are not tied to your Google account.",advanced:"Advanced",mapDevelopmentOrigins:"Set a development origin to automatically get relevant field data for its production origin.",developmentOrigin:"Development origin",productionOrigin:"Production origin",developmentOriginValue:"Development origin: {PH1}",productionOriginValue:"Production origin: {PH1}",new:"New",add:"Add",delete:"Delete",invalidOrigin:'"{PH1}" is not a valid origin or URL.',alreadyMapped:'"{PH1}" is already mapped to a production origin.'},X=t.i18n.registerUIStrings("panels/timeline/components/FieldSettingsDialog.ts",G),Y=t.i18n.getLocalizedString.bind(void 0,X),{html:K,nothing:J}=o;class Q extends Event{static eventName="showdialog";constructor(){super(Q.eventName)}}class Z extends HTMLElement{static litTagName=o.literal`devtools-field-settings-dialog`;#e=this.attachShadow({mode:"open"});#c;#h=g.CrUXManager.instance().getConfigSetting();#g="";#u=!1;#m="";#p="";#v=[];#f=!1;#b="";#w="";constructor(){super();const e=g.CrUXManager.instance();this.#h=e.getConfigSetting(),this.#y(),this.#i()}#y(){const e=this.#h.get();this.#g=e.override,this.#u=Boolean(this.#g),this.#v=e.originMappings||[],this.#m="",this.#p="",this.#f=!1,this.#b="",this.#w=""}#k(e){this.#h.set({enabled:e,override:this.#u?this.#g:"",originMappings:this.#v})}#S(){r.ScheduledRender.scheduleRender(this,this.#i)}async#x(e){const t=g.CrUXManager.instance(),i=await t.getFieldDataForPage(e);return Object.values(i).some((e=>e))}async#$(e){if(e&&this.#u){if(!this.#P(this.#g))return this.#m=Y(G.invalidOrigin,{PH1:this.#g}),void r.ScheduledRender.scheduleRender(this,this.#i);if(!await this.#x(this.#g))return this.#m=Y(G.doesNotHaveSufficientData),void r.ScheduledRender.scheduleRender(this,this.#i)}this.#k(e),this.#C()}#T(){if(!this.#c)throw new Error("Dialog not found");this.#y(),this.#c.setDialogVisible(!0),r.ScheduledRender.scheduleRender(this,this.#i),this.dispatchEvent(new Q)}#C(e){if(!this.#c)throw new Error("Dialog not found");this.#c.setDialogVisible(!1),e&&e.stopImmediatePropagation(),r.ScheduledRender.scheduleRender(this,this.#i)}connectedCallback(){this.#e.adoptedStyleSheets=[j,v.textInputStyles,v.checkboxStyles],this.#h.addChangeListener(this.#S,this),r.ScheduledRender.scheduleRender(this,this.#i)}disconnectedCallback(){this.#h.removeChangeListener(this.#S,this)}#R(){return this.#h.get().enabled?K`
        <${u.Button.Button.litTagName}
          class="config-button"
          @click=${this.#T}
          .data=${{variant:"outlined",title:Y(G.configure)}}
        jslog=${a.action("timeline.field-data.configure").track({click:!0})}
        >${Y(G.configure)}</${u.Button.Button.litTagName}>
      `:K`
      <${u.Button.Button.litTagName}
        class="setup-button"
        @click=${this.#T}
        .data=${{variant:"primary",title:Y(G.setUp)}}
        jslog=${a.action("timeline.field-data.setup").track({click:!0})}
        data-field-data-setup
      >${Y(G.setUp)}</${u.Button.Button.litTagName}>
    `}#L(){return K`
      <${u.Button.Button.litTagName}
        @click=${()=>{this.#$(!0)}}
        .data=${{variant:"primary",title:Y(G.ok)}}
        jslog=${a.action("timeline.field-data.enable").track({click:!0})}
        data-field-data-enable
      >${Y(G.ok)}</${u.Button.Button.litTagName}>
    `}#M(){const e=this.#h.get().enabled?Y(G.optOut):Y(G.cancel);return K`
      <${u.Button.Button.litTagName}
        @click=${()=>{this.#$(!1)}}
        .data=${{variant:"outlined",title:e}}
        jslog=${a.action("timeline.field-data.disable").track({click:!0})}
        data-field-data-disable
      >${e}</${u.Button.Button.litTagName}>
    `}#D(e){e.stopPropagation();const t=e.target;this.#g=t.value,this.#m="",r.ScheduledRender.scheduleRender(this,this.#i)}#N(e){e.stopPropagation();const t=e.target;this.#u=t.checked,this.#m="",r.ScheduledRender.scheduleRender(this,this.#i)}#I=e=>{e.stopPropagation();const t=e.target;this.#b=t.value,r.ScheduledRender.scheduleRender(this,this.#i)};#H=e=>{e.stopPropagation();const t=e.target;this.#w=t.value,r.ScheduledRender.scheduleRender(this,this.#i)};#P(e){try{return new URL(e).origin}catch{return null}}#F(){this.#b="",this.#w="",this.#f=!0,this.#p="",r.ScheduledRender.scheduleRender(this,this.#i)}async#O(){const e=this.#P(this.#b),t=this.#P(this.#w);if(!e)return this.#p=Y(G.invalidOrigin,{PH1:this.#b}),void r.ScheduledRender.scheduleRender(this,this.#i);if(this.#v.find((t=>t.developmentOrigin===e)))return this.#p=Y(G.alreadyMapped,{PH1:e}),void r.ScheduledRender.scheduleRender(this,this.#i);if(!t)return this.#p=Y(G.invalidOrigin,{PH1:this.#w}),void r.ScheduledRender.scheduleRender(this,this.#i);if(!await this.#x(t))return this.#p=Y(G.doesNotHaveSufficientData,{PH1:this.#w}),void r.ScheduledRender.scheduleRender(this,this.#i);this.#v.push({developmentOrigin:e,productionOrigin:t}),this.#b="",this.#w="",this.#f=!1,this.#p="",r.ScheduledRender.scheduleRender(this,this.#i)}#E(e){this.#v.splice(e,1),r.ScheduledRender.scheduleRender(this,this.#i)}#q(){const e=this.#v.map(((e,t)=>({cells:[{columnId:"development-origin",value:e.developmentOrigin,title:e.developmentOrigin},{columnId:"production-origin",value:e.productionOrigin,title:e.productionOrigin},{columnId:"action-button",value:Y(G.delete),renderer:e=>K`
              <div style="display: flex; align-items: center; justify-content: center;">
                <${u.Button.Button.litTagName}
                  class="delete-mapping"
                  .data=${{variant:"icon",size:"SMALL",title:e,iconName:"bin",jslogContext:"delete-origin-mapping"}}
                  @click=${()=>this.#E(t)}
                ></${u.Button.Button.litTagName}>
              </div>
            `}]})));if(this.#f){const t="width: 100%; box-sizing: border-box; border: none; background: none;";e.push({cells:[{columnId:"development-origin",value:this.#b,renderer:e=>K`
              <input
                type="text"
                placeholder="http://localhost:8080"
                aria-label=${Y(G.developmentOriginValue,{PH1:e})}
                style=${t}
                title=${e}
                @keyup=${this.#I}
                @change=${this.#I} />
            `},{columnId:"production-origin",value:this.#w,renderer:e=>K`
              <input
                type="text"
                placeholder="https://example.com"
                aria-label=${Y(G.productionOriginValue,{PH1:e})}
                style=${t}
                title=${e}
                @keyup=${this.#H}
                @change=${this.#H} />
            `},{columnId:"action-button",value:Y(G.add),renderer:e=>K`
              <div style="display: flex; align-items: center; justify-content: center;">
                <${u.Button.Button.litTagName}
                  id="add-mapping-button"
                  .data=${{variant:"icon",size:"SMALL",title:e,iconName:"plus",disabled:!this.#b||!this.#w,jslogContext:"add-origin-mapping"}}
                  @click=${()=>this.#O()}
                ></${u.Button.Button.litTagName}>
              </div>
            `}]})}const t={columns:[{id:"development-origin",title:Y(G.developmentOrigin),widthWeighting:13,hideable:!1,visible:!0,sortable:!1},{id:"production-origin",title:Y(G.productionOrigin),widthWeighting:13,hideable:!1,visible:!0,sortable:!1},{id:"action-button",title:"",widthWeighting:3,hideable:!1,visible:!0,sortable:!1}],rows:e};return K`
      <div>${Y(G.mapDevelopmentOrigins)}</div>
      <${m.DataGridController.DataGridController.litTagName}
        class="origin-mapping-grid"
        .data=${t}
      ></${m.DataGridController.DataGridController.litTagName}>
      ${this.#p?K`
        <div class="warning" role="alert" aria-label=${this.#p}>${this.#p}</div>
      `:J}
      <div class="origin-mapping-button-section">
        <${u.Button.Button.litTagName}
          @click=${this.#F}
          .data=${{variant:"text",title:Y(G.new),iconName:"plus",disabled:this.#f}}
          jslogContext=${"new-origin-mapping"}
        >${Y(G.new)}</${u.Button.Button.litTagName}>
      <div>
    `}#i=()=>{const e=h.XLink.XLink.create("https://developer.chrome.com/docs/crux","Chrome UX Report"),i=t.i18n.getFormatLocalizedString(X,G.fetchAggregated,{PH1:e}),n=K`
      <div class="open-button-section">${this.#R()}</div>
      <${p.Dialog.Dialog.litTagName}
        @clickoutsidedialog=${this.#C}
        .showConnector=${!0}
        .position=${"auto"}
        .horizontalAlignment=${"center"}
        .jslogContext=${a.dialog("timeline.field-data.settings")}
        on-render=${r.Directives.nodeRenderedCallback((e=>{this.#c=e}))}
      >
        <div class="content">
          <h2 class="title">${Y(G.configureFieldData)}</h2>
          <div>${i}</div>
          <div class="privacy-disclosure">
            <h3 class="section-title">${Y(G.privacyDisclosure)}</h3>
            <div>${Y(G.whenPerformanceIsShown)}</div>
          </div>
          <details aria-label=${Y(G.advanced)}>
            <summary>${Y(G.advanced)}</summary>
            <div class="advanced-section-contents">
              ${this.#q()}
              <hr class="divider">
              <label class="url-override">
                <input
                  type="checkbox"
                  .checked=${this.#u}
                  @change=${this.#N}
                  aria-label=${Y(G.onlyFetchFieldData)}
                  jslog=${a.toggle().track({click:!0}).context("field-url-override-enabled")}
                />
                ${Y(G.onlyFetchFieldData)}
              </label>
              <input
                type="text"
                @keyup=${this.#D}
                @change=${this.#D}
                class="devtools-text-input"
                .disabled=${!this.#u}
                placeholder=${this.#u?Y(G.url):void 0}
              />
              ${this.#m?K`<div class="warning" role="alert" aria-label=${this.#m}>${this.#m}</div>`:J}
            <div>
          </details>
          <div class="buttons-section">
            ${this.#M()}
            ${this.#L()}
          </div>
        </div>
      </${p.Dialog.Dialog.litTagName}
    `;o.render(n,this.#e,{host:this})}}customElements.define("devtools-field-settings-dialog",Z);var ee=Object.freeze({__proto__:null,ShowDialog:Q,FieldSettingsDialog:Z});const te=new CSSStyleSheet;te.replaceSync(":host{display:block}.breakdown{margin:0;padding:0;list-style:none;color:var(--sys-color-token-subtle)}.value{display:inline-block;padding:0 5px;color:var(--sys-color-on-surface)}\n/*# sourceURL=interactionBreakdown.css */\n");const ie={inputDelay:"Input delay",processingDuration:"Processing duration",presentationDelay:"Presentation delay"},re=t.i18n.registerUIStrings("panels/timeline/components/InteractionBreakdown.ts",ie),ne=t.i18n.getLocalizedString.bind(void 0,re);class oe extends HTMLElement{static litTagName=o.literal`devtools-interaction-breakdown`;#e=this.attachShadow({mode:"open"});#t=this.#i.bind(this);#B=null;connectedCallback(){this.#e.adoptedStyleSheets=[te]}set entry(e){e!==this.#B&&(this.#B=e,r.ScheduledRender.scheduleRender(this,this.#t))}#i(){if(!this.#B)return;const e=t.TimeUtilities.formatMicroSecondsTime(this.#B.inputDelay),i=t.TimeUtilities.formatMicroSecondsTime(this.#B.mainThreadHandling),r=t.TimeUtilities.formatMicroSecondsTime(this.#B.presentationDelay);o.render(o.html`<ul class="breakdown">
                     <li data-entry="input-delay">${ne(ie.inputDelay)}<span class="value">${e}</span></li>
                     <li data-entry="processing-duration">${ne(ie.processingDuration)}<span class="value">${i}</span></li>
                     <li data-entry="presentation-delay">${ne(ie.presentationDelay)}<span class="value">${r}</span></li>
                   </ul>
                   `,this.#e,{host:this})}}customElements.define("devtools-interaction-breakdown",oe);var ae=Object.freeze({__proto__:null,InteractionBreakdown:oe});const se=new CSSStyleSheet;se.replaceSync(".container{container-type:inline-size;height:100%;font-size:var(--sys-typescale-body4-size);line-height:var(--sys-typescale-body4-line-height);font-weight:var(--ref-typeface-weight-regular)}.live-metrics-view{--min-main-area-size:60%;background-color:var(--sys-color-cdt-base-container);display:flex;flex-direction:row;width:100%;height:100%}.live-metrics,\n.next-steps{padding:16px;height:100%;overflow-y:auto;box-sizing:border-box}.live-metrics{flex:1;display:flex;flex-direction:column}.next-steps{flex:0 0 336px;box-sizing:border-box;border:none;border-left:1px solid var(--sys-color-divider)}@container (max-width: 650px){.live-metrics-view{flex-direction:column}.next-steps{flex-basis:40%;border:none;border-top:1px solid var(--sys-color-divider)}}.metric-cards{display:grid;gap:16px;grid-template-columns:repeat(auto-fit,minmax(250px,1fr));width:100%}.section-title{font-size:var(--sys-typescale-headline4-size);line-height:var(--sys-typescale-headline4-line-height);font-weight:var(--ref-typeface-weight-medium);margin:0;margin-bottom:10px}.metric-card{border-radius:var(--sys-shape-corner-small);padding:14px 16px;background-color:var(--sys-color-surface3);height:100%;box-sizing:border-box}.settings-card{border-radius:var(--sys-shape-corner-small);padding:14px 16px 16px;background-color:var(--sys-color-surface3);margin-bottom:16px}.record-action-card{border-radius:var(--sys-shape-corner-small);padding:12px 16px 12px 12px;background-color:var(--sys-color-surface3);margin-bottom:16px}.card-title{font-size:var(--sys-typescale-headline5-size);line-height:var(--sys-typescale-headline5-line-height);font-weight:var(--ref-typeface-weight-medium);margin:0}.metric-card .card-title{margin-bottom:6px}.settings-card .card-title{margin-bottom:4px}.compare-text{margin-top:8px}.setting-recommendation{margin-bottom:12px}.throttling-recommendation-value{font-weight:var(--ref-typeface-weight-medium)}.related-element-info{overflow:hidden;text-wrap:nowrap;margin-top:8px}.related-element-label{font-weight:var(--ref-typeface-weight-medium)}.related-element-link{background-color:var(--sys-color-cdt-base-container);border-radius:2px;padding:0 2px}.card-values{position:relative;display:flex;column-gap:8px;margin-bottom:8px}.card-value-block{flex:1}.card-value{font-size:32px;line-height:36px;font-weight:var(--ref-typeface-weight-regular)}.card-value-label{font-weight:var(--ref-typeface-weight-medium)}.metric-value{text-wrap:nowrap}.metric-value.dim{font-weight:var(--ref-typeface-weight-medium)}.waiting{color:var(--sys-color-token-subtle)}.good{color:var(--app-color-performance-good)}.needs-improvement{color:var(--app-color-performance-ok)}.poor{color:var(--app-color-performance-bad)}.good.dim{color:var(--app-color-performance-good-dim)}.needs-improvement.dim{color:var(--app-color-performance-ok-dim)}.poor.dim{color:var(--app-color-performance-bad-dim)}.good-bg{background-color:var(--app-color-performance-good)}.needs-improvement-bg{background-color:var(--app-color-performance-ok)}.poor-bg{background-color:var(--app-color-performance-bad)}.interactions-section{margin-top:24px;display:flex;flex-direction:column;flex:1;overflow:hidden;min-height:min-content}.interactions-list{padding:0;margin:0;overflow:auto;flex:1 1 300px;max-height:max-content}.interaction{display:flex;align-items:center;padding:7px 0;border:none;border-bottom:1px solid var(--sys-color-divider);gap:32px}.interaction:first-child{border-top:1px solid var(--sys-color-divider)}.interaction-type{font-weight:var(--ref-typeface-weight-medium);width:60px;flex-shrink:0}.interaction-node{overflow:hidden;flex-grow:1}.interaction-duration{text-align:end;width:max-content;flex-shrink:0;font-weight:var(--ref-typeface-weight-medium)}.divider{width:100%;border:0;border-bottom:1px solid var(--sys-color-divider);margin:2px 0;box-sizing:border-box}.bucket-summaries{margin-top:8px;overflow-x:auto}.bucket-summaries.histogram{display:grid;grid-template-columns:minmax(min-content,auto) minmax(20px,50px) max-content;grid-auto-rows:1fr;column-gap:8px;justify-items:flex-end;align-items:center}.bucket-label{justify-self:start;font-weight:var(--ref-typeface-weight-medium)}.bucket-range{color:var(--sys-color-token-subtle)}.histogram-bar{height:6px}.histogram-percent{color:var(--sys-color-token-subtle);font-weight:var(--ref-typeface-weight-medium)}.record-action{display:flex;flex-direction:row;align-items:center;justify-content:space-between;gap:8px}.shortcut-label{width:max-content;flex-shrink:0}.live-metrics-option{display:block;margin-top:8px;min-width:0;max-width:100%}.field-setup-buttons{margin-top:14px}.no-data{color:var(--sys-color-token-subtle)}.tooltip{display:none;width:min(var(--tooltip-container-width,350px),350px);max-width:max-content;position:absolute;top:100%;left:50%;transform:translateX(-50%);z-index:1;box-sizing:border-box;padding:var(--sys-size-5) var(--sys-size-6);border-radius:var(--sys-shape-corner-small);background-color:var(--sys-color-cdt-base-container);box-shadow:var(--drop-shadow-depth-3)}.detailed-compare-text{margin-bottom:8px}.field-data-message{margin-bottom:12px}.collection-period-range{font-weight:var(--ref-typeface-weight-medium)}x-link{color:var(--sys-color-primary);text-decoration-line:underline}.data-descriptions{margin-top:10px;padding-left:12px;border-left:1px solid var(--sys-color-divider)}\n/*# sourceURL=liveMetricsView.css */\n");const le={goodBetterCompare:"Your local {PH1} {PH2} is good, and is significantly better than your users’ experience.",goodWorseCompare:"Your local {PH1} {PH2} is good, and is significantly worse than your users’ experience.",goodSimilarCompare:"Your local {PH1} {PH2} is good, and is similar to your users’ experience.",goodSummarized:"Your local {PH1} {PH2} is good.",needsImprovementBetterCompare:"Your local {PH1} {PH2} needs improvement, and is significantly better than your users’ experience.",needsImprovementWorseCompare:"Your local {PH1} {PH2} needs improvement, and is significantly worse than your users’ experience.",needsImprovementSimilarCompare:"Your local {PH1} {PH2} needs improvement, and is similar to your users’ experience.",needsImprovementSummarized:"Your local {PH1} {PH2} needs improvement.",poorBetterCompare:"Your local {PH1} {PH2} is poor, and is significantly better than your users’ experience.",poorWorseCompare:"Your local {PH1} {PH2} is poor, and is significantly worse than your users’ experience.",poorSimilarCompare:"Your local {PH1} {PH2} is poor, and is similar to your users’ experience.",poorSummarized:"Your local {PH1} {PH2} is poor.",goodGoodDetailedCompare:"Your local {PH1} {PH2} is good and is rated the same as {PH4} of real-user {PH1} experiences. Additionally, the field data 75th percentile {PH1} {PH3} is good.",goodNeedsImprovementDetailedCompare:"Your local {PH1} {PH2} is good and is rated the same as {PH4} of real-user {PH1} experiences. However, the field data 75th percentile {PH1} {PH3} needs improvement.",goodPoorDetailedCompare:"Your local {PH1} {PH2} is good and is rated the same as {PH4} of real-user {PH1} experiences. However, the field data 75th percentile {PH1} {PH3} is poor.",needsImprovementGoodDetailedCompare:"Your local {PH1} {PH2} needs improvement and is rated the same as {PH4} of real-user {PH1} experiences. However, the field data 75th percentile {PH1} {PH3} is good.",needsImprovementNeedsImprovementDetailedCompare:"Your local {PH1} {PH2} needs improvement and is rated the same as {PH4} of real-user {PH1} experiences. Additionally, the field data 75th percentile {PH1} {PH3} needs improvement.",needsImprovementPoorDetailedCompare:"Your local {PH1} {PH2} needs improvement and is rated the same as {PH4} of real-user {PH1} experiences. However, the field data 75th percentile {PH1} {PH3} is poor.",poorGoodDetailedCompare:"Your local {PH1} {PH2} is poor and is rated the same as {PH4} of real-user {PH1} experiences. However, the field data 75th percentile {PH1} {PH3} is good.",poorNeedsImprovementDetailedCompare:"Your local {PH1} {PH2} is poor and is rated the same as {PH4} of real-user {PH1} experiences. However, the field data 75th percentile {PH1} {PH3} needs improvement.",poorPoorDetailedCompare:"Your local {PH1} {PH2} is poor and is rated the same as {PH4} of real-user {PH1} experiences. Additionally, the field data 75th percentile {PH1} {PH3} is poor."},de=t.i18n.registerUIStrings("panels/timeline/components/MetricCompareStrings.ts",le);const{html:ce,nothing:he}=o,ge={network:"Network: {PH1}",networkThrottling:"Network throttling: {PH1}",disabled:"Disabled",presets:"Presets",custom:"Custom",add:"Add…"},ue=t.i18n.registerUIStrings("panels/timeline/components/NetworkThrottlingSelector.ts",ge),me=t.i18n.getLocalizedString.bind(void 0,ue);class pe extends HTMLElement{static litTagName=o.literal`devtools-network-throttling-selector`;#e=this.attachShadow({mode:"open"});#A;#U=[];#z;constructor(){super(),this.#A=f.Settings.Settings.instance().moduleSetting("custom-network-conditions"),this.#_(),this.#z=s.NetworkManager.MultitargetNetworkManager.instance().networkConditions(),this.#i()}connectedCallback(){s.NetworkManager.MultitargetNetworkManager.instance().addEventListener("ConditionsChanged",this.#W,this),this.#A.addChangeListener(this.#V,this)}disconnectedCallback(){s.NetworkManager.MultitargetNetworkManager.instance().removeEventListener("ConditionsChanged",this.#W,this),this.#A.removeChangeListener(this.#V,this)}#_(){this.#U=[{name:me(ge.disabled),items:[s.NetworkManager.NoThrottlingConditions]},{name:me(ge.presets),items:d.ThrottlingPresets.ThrottlingPresets.networkPresets},{name:me(ge.custom),items:this.#A.get(),showCustomAddOption:!0,jslogContext:"custom-network-throttling-item"}]}#W(){this.#z=s.NetworkManager.MultitargetNetworkManager.instance().networkConditions(),r.ScheduledRender.scheduleRender(this,this.#i)}#d(e){const t=this.#U.flatMap((e=>e.items)).find((t=>t.i18nTitleKey===e.itemValue));t&&s.NetworkManager.MultitargetNetworkManager.instance().setNetworkConditions(t)}#V(){this.#_(),r.ScheduledRender.scheduleRender(this,this.#i)}#j(e){return e.title instanceof Function?e.title():e.title}#G(){f.Revealer.reveal(this.#A)}#i=()=>{const e=this.#j(this.#z),t=ce`
      <${l.SelectMenu.SelectMenu.litTagName}
        @selectmenuselected=${this.#d}
        .showDivider=${!0}
        .showArrow=${!0}
        .sideButton=${!1}
        .showSelectedItem=${!0}
        .showConnector=${!1}
        .jslogContext=${"network-conditions"}
        .buttonTitle=${me(ge.network,{PH1:e})}
        title=${me(ge.networkThrottling,{PH1:e})}
      >
        ${this.#U.map((e=>ce`
            <${l.Menu.MenuGroup.litTagName} .name=${e.name}>
              ${e.items.map((t=>{const i=this.#j(t),r=e.jslogContext||c.StringUtilities.toKebabCase(t.i18nTitleKey||i);return ce`
                  <${l.Menu.MenuItem.litTagName}
                    .value=${t.i18nTitleKey}
                    .selected=${this.#z.i18nTitleKey===t.i18nTitleKey}
                    jslog=${a.item(r).track({click:!0})}
                  >
                    ${i}
                  </${l.Menu.MenuItem.litTagName}>
                `}))}
              ${e.showCustomAddOption?ce`
                <${l.Menu.MenuItem.litTagName}
                  .value=${1}
                  jslog=${a.action("add").track({click:!0})}
                  @click=${this.#G}
                >
                  ${me(ge.add)}
                </${l.Menu.MenuItem.litTagName}>
              `:he}
            </${l.Menu.MenuGroup.litTagName}>
          `))}
      </${l.SelectMenu.SelectMenu.litTagName}>
    `;o.render(t,this.#e,{host:this})}}customElements.define("devtools-network-throttling-selector",pe);var ve=Object.freeze({__proto__:null,NetworkThrottlingSelector:pe});const{html:fe,nothing:be,Directives:we}=o,{until:ye}=we,ke=[2500,4e3],Se=[.1,.25],xe=[200,500],$e=["AUTO",...g.DEVICE_SCOPE_LIST],Pe={localAndFieldMetrics:"Local and field metrics",localMetrics:"Local metrics",interactions:"Interactions",nextSteps:"Next steps",fieldData:"Field data",recordingSettings:"Recording settings",lcpTitle:"Largest Contentful Paint (LCP)",clsTitle:"Cumulative Layout Shift (CLS)",inpTitle:"Interaction to Next Paint (INP)",localValue:"Local",field75thPercentile:"Field 75th Percentile",showFieldDataForDevice:"Show field data for device type: {PH1}",device:"Device: {PH1}",allDevices:"All devices",desktop:"Desktop",mobile:"Mobile",tablet:"Tablet",auto:"Auto ({PH1})",loadingOption:"{PH1} - Loading…",needsDataOption:"{PH1} - No data",urlOption:"URL",originOption:"Origin",urlOptionWithKey:"URL: {PH1}",originOptionWithKey:"Origin: {PH1}",showFieldDataForPage:"Show field data for {PH1}",tryDisablingThrottling:"Try disabling network throttling to approximate the network latency measured by real users.",tryUsingThrottling:"Try using {PH1} network throttling to approximate the network latency measured by real users.",mostUsersMobile:"A majority of users are on mobile. Try emulating a mobile device that matches real users.",mostUsersDesktop:"A majority of users are on desktop. Try emulating a desktop window size that matches real users.",lcpElement:"LCP Element",good:"Good",needsImprovement:"Needs improvement",poor:"Poor",leqRange:"(≤{PH1})",betweenRange:"({PH1}-{PH2})",gtRange:"(>{PH1})",percentage:"{PH1}%",interactToMeasure:"Interact with the page to measure INP.",viewCardDetails:"View card details",collectionPeriod:"Collection period:",dateRange:"{PH1} - {PH2}",seeHowYourLocalMetricsCompare:"See how your local metrics compare to real user data in the {PH1}.",theLocalMetricsAre:"The {PH1} are captured from the current page using your network connection and device.",localMetricsLink:"local metrics",theFieldMetricsAre:"The {PH1} is measured by real users using many different network connections and devices.",fieldDataLink:"field data"},Ce=t.i18n.registerUIStrings("panels/timeline/components/LiveMetricsView.ts",Pe),Te=t.i18n.getLocalizedString.bind(void 0,Ce);function Re(e,t){return e<=t[0]?"good":e<=t[1]?"needs-improvement":"poor"}function Le(e,t,i,r,n){const o=document.createElement("span");if(o.classList.add("metric-value"),void 0===t)return o.classList.add("waiting"),o.textContent="-",o;o.textContent=r(t);const s=Re(t,i);return o.classList.add(s),o.setAttribute("jslog",`${a.section(e)}`),n?.dim&&o.classList.add("dim"),o}class Me extends HTMLElement{static litTagName=o.literal`devtools-metric-card`;#e=this.attachShadow({mode:"open"});constructor(){super(),this.#i()}#X;#Y={metric:"LCP"};set data(e){this.#Y=e,r.ScheduledRender.scheduleRender(this,this.#i)}connectedCallback(){this.#e.adoptedStyleSheets=[se],r.ScheduledRender.scheduleRender(this,this.#i)}#K=e=>{c.KeyboardUtilities.isEscKey(e)&&(e.stopPropagation(),this.#J())};#Q(e){const t=e.target;t?.hasFocus()||this.#J()}#Z(e){const t=e.target;if(t?.hasFocus())return;const i=e.relatedTarget;i instanceof Node&&t.contains(i)||this.#J()}#J(){const e=this.#X;e&&(document.body.removeEventListener("keydown",this.#K),e.style.left="",e.style.maxWidth="",e.style.display="none")}#ee(){const e=this.#X;if(!e||"block"===e.style.display)return;document.body.addEventListener("keydown",this.#K),e.style.display="block";const t=this.#Y.tooltipContainer;if(!t)return;const i=t.getBoundingClientRect();e.style.setProperty("--tooltip-container-width",`${Math.round(i.width)}px`),requestAnimationFrame((()=>{let t=0;const r=e.getBoundingClientRect(),n=r.right-i.right,o=r.left-i.left;o<0?t=Math.round(o):n>0&&(t=Math.round(n)),e.style.left=`calc(50% - ${t}px)`}))}#te(){switch(this.#Y.metric){case"LCP":return Te(Pe.lcpTitle);case"CLS":return Te(Pe.clsTitle);case"INP":return Te(Pe.inpTitle)}}#ie(){switch(this.#Y.metric){case"LCP":return ke;case"CLS":return Se;case"INP":return xe}}#re(){switch(this.#Y.metric){case"LCP":case"INP":return e=>t.TimeUtilities.millisToString(e);case"CLS":return e=>0===e?"0":e.toFixed(2)}}#ne(){const{localValue:e}=this.#Y;if(void 0!==e)return e}#oe(){let{fieldValue:e}=this.#Y;if(void 0!==e&&("string"==typeof e&&(e=Number(e)),Number.isFinite(e)))return e}#ae(){const e=this.#ne(),t=this.#oe();if(void 0===e||void 0===t)return;const i=this.#ie()[0];return e-t>i?"worse":t-e>i?"better":"similar"}#se(){const e=this.#ne();if(void 0===e)return"INP"===this.#Y.metric?fe`
          <div class="compare-text">${Te(Pe.interactToMeasure)}</div>
        `:o.nothing;const i=this.#ae(),r=Re(e,this.#ie()),n=Le(this.#le(!0),e,this.#ie(),this.#re(),{dim:!0});return fe`
      <div class="compare-text">
        ${function(e,i,r){if(r||(r={}),"good"===e&&"better"===i)return t.i18n.getFormatLocalizedString(de,le.goodBetterCompare,r);if("good"===e&&"worse"===i)return t.i18n.getFormatLocalizedString(de,le.goodWorseCompare,r);if("good"===e&&"similar"===i)return t.i18n.getFormatLocalizedString(de,le.goodSimilarCompare,r);if("good"===e&&!i)return t.i18n.getFormatLocalizedString(de,le.goodSummarized,r);if("needs-improvement"===e&&"better"===i)return t.i18n.getFormatLocalizedString(de,le.needsImprovementBetterCompare,r);if("needs-improvement"===e&&"worse"===i)return t.i18n.getFormatLocalizedString(de,le.needsImprovementWorseCompare,r);if("needs-improvement"===e&&"similar"===i)return t.i18n.getFormatLocalizedString(de,le.needsImprovementSimilarCompare,r);if("needs-improvement"===e&&!i)return t.i18n.getFormatLocalizedString(de,le.needsImprovementSummarized,r);if("poor"===e&&"better"===i)return t.i18n.getFormatLocalizedString(de,le.poorBetterCompare,r);if("poor"===e&&"worse"===i)return t.i18n.getFormatLocalizedString(de,le.poorWorseCompare,r);if("poor"===e&&"similar"===i)return t.i18n.getFormatLocalizedString(de,le.poorSimilarCompare,r);if("poor"===e&&!i)return t.i18n.getFormatLocalizedString(de,le.poorSummarized,r);throw new Error("Compare string not found")}(r,i,{PH1:this.#Y.metric,PH2:n})}
      </div>
    `}#le(e){return`timeline.landing.${e?"local":"field"}-${this.#Y.metric.toLowerCase()}`}#de(){const e=this.#ne();if(void 0===e)return"INP"===this.#Y.metric?fe`
          <div class="detailed-compare-text">${Te(Pe.interactToMeasure)}</div>
        `:o.nothing;const i=Re(e,this.#ie()),r=this.#oe(),n=void 0!==r?Re(r,this.#ie()):void 0,a=Le(this.#le(!0),e,this.#ie(),this.#re(),{dim:!0}),s=Le(this.#le(!1),r,this.#ie(),this.#re(),{dim:!0});return fe`
      <div class="detailed-compare-text">${function(e,i,r){if(r||(r={}),"good"===e&&"good"===i)return t.i18n.getFormatLocalizedString(de,le.goodGoodDetailedCompare,r);if("good"===e&&"needs-improvement"===i)return t.i18n.getFormatLocalizedString(de,le.goodNeedsImprovementDetailedCompare,r);if("good"===e&&"poor"===i)return t.i18n.getFormatLocalizedString(de,le.goodPoorDetailedCompare,r);if("good"===e&&!i)return t.i18n.getFormatLocalizedString(de,le.goodSummarized,r);if("needs-improvement"===e&&"good"===i)return t.i18n.getFormatLocalizedString(de,le.needsImprovementGoodDetailedCompare,r);if("needs-improvement"===e&&"needs-improvement"===i)return t.i18n.getFormatLocalizedString(de,le.needsImprovementNeedsImprovementDetailedCompare,r);if("needs-improvement"===e&&"poor"===i)return t.i18n.getFormatLocalizedString(de,le.needsImprovementPoorDetailedCompare,r);if("needs-improvement"===e&&!i)return t.i18n.getFormatLocalizedString(de,le.needsImprovementSummarized,r);if("poor"===e&&"good"===i)return t.i18n.getFormatLocalizedString(de,le.poorGoodDetailedCompare,r);if("poor"===e&&"needs-improvement"===i)return t.i18n.getFormatLocalizedString(de,le.poorNeedsImprovementDetailedCompare,r);if("poor"===e&&"poor"===i)return t.i18n.getFormatLocalizedString(de,le.poorPoorDetailedCompare,r);if("poor"===e&&!i)return t.i18n.getFormatLocalizedString(de,le.poorSummarized,r);throw new Error("Detailed compare string not found")}(i,n,{PH1:this.#Y.metric,PH2:a,PH3:s,PH4:this.#ce(i)})}</div>
    `}#he(e){switch(e){case"good":return 0;case"needs-improvement":return 1;case"poor":return 2}}#ge(e){const t=this.#Y.histogram,i=t?.[this.#he(e)].density||0;return`${Math.round(100*i)}%`}#ce(e){const t=this.#Y.histogram;if(void 0===t)return"-";const i=t[this.#he(e)].density||0,r=Math.round(100*i);return Te(Pe.percentage,{PH1:r})}#ue(){const e=g.CrUXManager.instance().getConfigSetting().get().enabled,t=this.#re(),i=this.#ie(),r=fe`
      <div class="bucket-label">
        <span>${Te(Pe.good)}</span>
        <span class="bucket-range">${Te(Pe.leqRange,{PH1:t(i[0])})}</span>
      </div>
    `,n=fe`
      <div class="bucket-label">
        <span>${Te(Pe.needsImprovement)}</span>
        <span class="bucket-range">${Te(Pe.betweenRange,{PH1:t(i[0]),PH2:t(i[1])})}</span>
      </div>
    `,o=fe`
      <div class="bucket-label">
        <span>${Te(Pe.poor)}</span>
        <span class="bucket-range">${Te(Pe.gtRange,{PH1:t(i[1])})}</span>
      </div>
    `;return e?fe`
      <div class="bucket-summaries histogram">
        ${r}
        <div class="histogram-bar good-bg" style="width: ${this.#ge("good")}"></div>
        <div class="histogram-percent">${this.#ce("good")}</div>
        ${n}
        <div class="histogram-bar needs-improvement-bg" style="width: ${this.#ge("needs-improvement")}"></div>
        <div class="histogram-percent">${this.#ce("needs-improvement")}</div>
        ${o}
        <div class="histogram-bar poor-bg" style="width: ${this.#ge("poor")}"></div>
        <div class="histogram-percent">${this.#ce("poor")}</div>
      </div>
    `:fe`
        <div class="bucket-summaries">
          ${r}
          ${n}
          ${o}
        </div>
      `}#i=()=>{const e=g.CrUXManager.instance().getConfigSetting().get().enabled,t=fe`
      <div class="metric-card">
        <h3 class="card-title">
          ${this.#te()}
        </h3>
        <div tabindex="0" class="card-values"
          @mouseenter=${this.#ee}
          @mouseleave=${this.#Q}
          @focusin=${this.#ee}
          @focusout=${this.#Z}
          aria-describedby="tooltip"
        >
          <div class="card-value-block">
            <div class="card-value" id="local-value">${Le(this.#le(!0),this.#ne(),this.#ie(),this.#re())}</div>
            ${e?fe`<div class="card-metric-label">${Te(Pe.localValue)}</div>`:be}
          </div>
          ${e?fe`
            <div class="card-value-block">
              <div class="card-value" id="field-value">${Le(this.#le(!1),this.#oe(),this.#ie(),this.#re())}</div>
              <div class="card-value-label">${Te(Pe.field75thPercentile)}</div>
            </div>
          `:be}
          <div
            id="tooltip"
            class="tooltip"
            role="tooltip"
            aria-label=${Te(Pe.viewCardDetails)}
            on-render=${r.Directives.nodeRenderedCallback((e=>{this.#X=e}))}
          >
            ${this.#de()}
            <hr class="divider">
            ${this.#ue()}
          </div>
        </div>
        ${e?fe`<hr class="divider">`:be}
        ${this.#se()}
        <slot name="extra-info"><slot>
      </div>
    `;o.render(t,this.#e,{host:this})}}class De extends y.LegacyWrapper.WrappableComponent{static litTagName=o.literal`devtools-live-metrics-view`;#e=this.attachShadow({mode:"open"});#me;#pe;#ve;#fe=[];#be;#we="AUTO";#ye="url";#ke;#Se;#xe;#$e;#Pe=!1;constructor(){super(),this.#ke=h.ActionRegistry.ActionRegistry.instance().getAction("timeline.toggle-recording"),this.#Se=h.ActionRegistry.ActionRegistry.instance().getAction("timeline.record-reload"),this.#i()}#Ce(e){this.#me=e.data.lcp,this.#pe=e.data.cls,this.#ve=e.data.inp;const t=this.#fe.length<e.data.interactions.length;this.#fe=[...e.data.interactions];const i=r.ScheduledRender.scheduleRender(this,this.#i),n=this.#$e;if(!t||!n)return;(Math.abs(n.scrollHeight-n.clientHeight-n.scrollTop)<=1||this.#Pe)&&i.then((()=>{requestAnimationFrame((()=>{this.#Pe=!0,n.addEventListener("scrollend",(()=>{this.#Pe=!1}),{once:!0}),n.scrollTo({top:n.scrollHeight,behavior:"smooth"})}))}))}#Te(e){this.#be=e.data,r.ScheduledRender.scheduleRender(this,this.#i)}#Re(){r.ScheduledRender.scheduleRender(this,this.#i)}async#Le(){this.#be=await g.CrUXManager.instance().getFieldDataForCurrentPage(),r.ScheduledRender.scheduleRender(this,this.#i)}#Me(){const e="AUTO"===this.#we?this.#De():this.#we;return this.#be?.[`${this.#ye}-${e}`]}#Ne(e){return this.#Me()?.record.metrics[e]}connectedCallback(){this.#e.adoptedStyleSheets=[se];const e=w.LiveMetrics.instance();e.addEventListener("status",this.#Ce,this);const t=g.CrUXManager.instance();t.addEventListener("field-data-changed",this.#Te,this);b.DeviceModeModel.DeviceModeModel.instance().addEventListener("Updated",this.#Re,this),t.getConfigSetting().get().enabled&&this.#Le(),this.#me=e.lcpValue,this.#pe=e.clsValue,this.#ve=e.inpValue,this.#fe=e.interactions,r.ScheduledRender.scheduleRender(this,this.#i)}disconnectedCallback(){w.LiveMetrics.instance().removeEventListener("status",this.#Ce,this);g.CrUXManager.instance().removeEventListener("field-data-changed",this.#Te,this);b.DeviceModeModel.DeviceModeModel.instance().removeEventListener("Updated",this.#Re,this)}#Ie(){const e=this.#Ne("largest_contentful_paint"),t=this.#me?.node;return fe`
      <${Me.litTagName} .data=${{metric:"LCP",localValue:this.#me?.value,fieldValue:e?.percentiles?.p75,histogram:e?.histogram,tooltipContainer:this.#xe}}>
        ${t?fe`
            <div class="related-element-info" slot="extra-info">
              <span class="related-element-label">${Te(Pe.lcpElement)}</span>
              <span class="related-element-link">${ye(f.Linkifier.Linkifier.linkify(t))}</span>
            </div>
          `:be}
      </${Me.litTagName}>
    `}#He(){const e=this.#Ne("cumulative_layout_shift");return fe`
      <${Me.litTagName} .data=${{metric:"CLS",localValue:this.#pe?.value,fieldValue:e?.percentiles?.p75,histogram:e?.histogram,tooltipContainer:this.#xe}}>
      </${Me.litTagName}>
    `}#Fe(){const e=this.#Ne("interaction_to_next_paint");return fe`
      <${Me.litTagName} .data=${{metric:"INP",localValue:this.#ve?.value,fieldValue:e?.percentiles?.p75,histogram:e?.histogram,tooltipContainer:this.#xe}}>
      </${Me.litTagName}>
    `}#Oe(e){return fe`
      <div class="record-action">
        <${u.Button.Button.litTagName} @click=${function(){e.execute()}} .data=${{variant:"text",size:"REGULAR",iconName:e.icon(),title:e.title(),jslogContext:e.id()}}>
          ${e.title()}
        </${u.Button.Button.litTagName}>
        <span class="shortcut-label">${h.ShortcutRegistry.ShortcutRegistry.instance().shortcutTitleForAction(e.id())}</span>
      </div>
    `}#Ee(){const e=this.#Ne("round_trip_time");if(!e?.percentiles)return null;const t=Number(e.percentiles.p75);if(!Number.isFinite(t))return null;if(t<60)return s.NetworkManager.NoThrottlingConditions;let i=null,r=1/0;for(const e of d.ThrottlingPresets.ThrottlingPresets.networkPresets){const{targetLatency:n}=e;if(!n)continue;const o=Math.abs(n-t);o>200||(r<o||(i=e,r=o))}return i}#qe(){const e=this.#be?.[`${this.#ye}-ALL`]?.record.metrics.form_factors?.fractions;return e?e.desktop>.5?Te(Pe.mostUsersDesktop):e.phone>.5?Te(Pe.mostUsersMobile):null:null}#Be(){const e=this.#Ee(),i=this.#qe();let r;if(e)if(e===s.NetworkManager.NoThrottlingConditions)r=Te(Pe.tryDisablingThrottling);else{const i="function"==typeof e.title?e.title():e.title,n=document.createElement("span");n.classList.add("throttling-recommendation-value"),n.textContent=i,r=t.i18n.getFormatLocalizedString(Ce,Pe.tryUsingThrottling,{PH1:n})}return fe`
      <h3 class="card-title">${Te(Pe.recordingSettings)}</h3>
      ${i?fe`<div id="device-recommendation" class="setting-recommendation">${i}</div>`:be}
      ${r?fe`<div id="network-recommendation" class="setting-recommendation">${r}</div>`:be}
      <${A.litTagName} class="live-metrics-option"></${A.litTagName}>
      <${pe.litTagName} class="live-metrics-option"></${pe.litTagName}>
    `}#Ae(e){const t=this.#be?.[`${e}-ALL`]?.record.key[e];if(t)return Te("url"===e?Pe.urlOptionWithKey:Pe.originOptionWithKey,{PH1:t});const i=Te("url"===e?Pe.urlOption:Pe.originOption);return Te(Pe.needsDataOption,{PH1:i})}#Ue(e){"url"===e.itemValue?this.#ye="url":this.#ye="origin",r.ScheduledRender.scheduleRender(this,this.#i)}#ze(){if(!g.CrUXManager.instance().getConfigSetting().get().enabled)return o.nothing;const e=this.#Ae("url"),t=this.#Ae("origin"),i="url"===this.#ye?e:t,r=Te(Pe.showFieldDataForPage,{PH1:i}),n=!this.#be?.["url-ALL"]&&!this.#be?.["origin-ALL"];return fe`
      <${l.SelectMenu.SelectMenu.litTagName}
        id="page-scope-select"
        class="live-metrics-option"
        @selectmenuselected=${this.#Ue}
        .showDivider=${!0}
        .showArrow=${!0}
        .sideButton=${!1}
        .showSelectedItem=${!0}
        .showConnector=${!1}
        .buttonTitle=${i}
        .disabled=${n}
        title=${r}
      >
        <${l.Menu.MenuItem.litTagName}
          .value=${"url"}
          .selected=${"url"===this.#ye}
        >
          ${e}
        </${l.Menu.MenuItem.litTagName}>
        <${l.Menu.MenuItem.litTagName}
          .value=${"origin"}
          .selected=${"origin"===this.#ye}
        >
          ${t}
        </${l.Menu.MenuItem.litTagName}>
      </${l.SelectMenu.SelectMenu.litTagName}>
    `}#_e(e){switch(e){case"ALL":return Te(Pe.allDevices);case"DESKTOP":return Te(Pe.desktop);case"PHONE":return Te(Pe.mobile);case"TABLET":return Te(Pe.tablet)}}#De(){return b.DeviceModeModel.DeviceModeModel.instance().isMobile()?this.#be?.[`${this.#ye}-PHONE`]?"PHONE":"ALL":this.#be?.[`${this.#ye}-DESKTOP`]?"DESKTOP":"ALL"}#We(e){const t="AUTO"===e?this.#De():e,i=this.#_e(t),r="AUTO"===e?Te(Pe.auto,{PH1:i}):i;if(!this.#be)return Te(Pe.loadingOption,{PH1:r});return this.#be[`${this.#ye}-${t}`]?r:Te(Pe.needsDataOption,{PH1:r})}#Ve(e){this.#we=e.itemValue,r.ScheduledRender.scheduleRender(this,this.#i)}#je(){if(!g.CrUXManager.instance().getConfigSetting().get().enabled)return o.nothing;const e=!this.#be?.[`${this.#ye}-ALL`],t=this.#We(this.#we);return fe`
      <${l.SelectMenu.SelectMenu.litTagName}
        id="device-scope-select"
        class="live-metrics-option"
        @selectmenuselected=${this.#Ve}
        .showDivider=${!0}
        .showArrow=${!0}
        .sideButton=${!1}
        .showSelectedItem=${!0}
        .showConnector=${!1}
        .buttonTitle=${Te(Pe.device,{PH1:t})}
        .disabled=${e}
        title=${Te(Pe.showFieldDataForDevice,{PH1:t})}
      >
        ${$e.map((e=>fe`
            <${l.Menu.MenuItem.litTagName}
              .value=${e}
              .selected=${this.#we===e}
            >
              ${this.#We(e)}
            </${l.Menu.MenuItem.litTagName}>
          `))}
      </${l.SelectMenu.SelectMenu.litTagName}>
    `}#Ge(){const e=this.#Me();if(!e)return o.nothing;const{firstDate:t,lastDate:i}=e.record.collectionPeriod,r=new Date(t.year,t.month-1,t.day),n=new Date(i.year,i.month-1,i.day),a={year:"numeric",month:"short",day:"numeric"},s=document.createElement("span");return s.classList.add("collection-period-range"),s.textContent=Te(Pe.dateRange,{PH1:r.toLocaleDateString(void 0,a),PH2:n.toLocaleDateString(void 0,a)}),fe`
      <div class="field-data-message">
        ${Te(Pe.collectionPeriod)}
        ${s}
      </div>
    `}#Xe(){if(g.CrUXManager.instance().getConfigSetting().get().enabled)return this.#Ge();const e=h.XLink.XLink.create("https://developer.chrome.com/docs/crux","Chrome UX Report"),i=t.i18n.getFormatLocalizedString(Ce,Pe.seeHowYourLocalMetricsCompare,{PH1:e});return fe`
      <div class="field-data-message">${i}</div>
    `}#Ye(){const e=g.CrUXManager.instance().getConfigSetting().get().enabled,i=h.XLink.XLink.create("https://web.dev/articles/lab-and-field-data-differences#lab_data",Te(Pe.localMetricsLink)),r=t.i18n.getFormatLocalizedString(Ce,Pe.theLocalMetricsAre,{PH1:i}),n=h.XLink.XLink.create("https://web.dev/articles/lab-and-field-data-differences#field_data",Te(Pe.fieldDataLink)),o=t.i18n.getFormatLocalizedString(Ce,Pe.theFieldMetricsAre,{PH1:n});return fe`
      <div class="data-descriptions">
        <div>${r}</div>
        ${e?fe`<div>${o}</div>`:be}
      </div>
    `}#i=()=>{const e=g.CrUXManager.instance().getConfigSetting().get().enabled,i=Te(e?Pe.localAndFieldMetrics:Pe.localMetrics),n=fe`
      <div class="container">
        <div class="live-metrics-view">
          <main class="live-metrics"
          >
            <h2 class="section-title">${i}</h2>
            <div class="metric-cards"
              on-render=${r.Directives.nodeRenderedCallback((e=>{this.#xe=e}))}
            >
              <div id="lcp">
                ${this.#Ie()}
              </div>
              <div id="cls">
                ${this.#He()}
              </div>
              <div id="inp">
                ${this.#Fe()}
              </div>
            </div>
            ${this.#Ye()}
            ${this.#fe.length>0?fe`
              <section class="interactions-section" aria-labelledby="interactions-section-title">
                <h2 id="interactions-section-title" class="section-title">${Te(Pe.interactions)}</h2>
                <ol class="interactions-list"
                  on-render=${r.Directives.nodeRenderedCallback((e=>{this.#$e=e}))}
                >
                  ${this.#fe.map((e=>fe`
                    <li class="interaction">
                      <span class="interaction-type">${e.interactionType}</span>
                      <span class="interaction-node">${e.node&&ye(f.Linkifier.Linkifier.linkify(e.node))}</span>
                      <span class="interaction-duration">
                        ${Le("timeline.landing.interaction-event-timing",e.duration,xe,(e=>t.TimeUtilities.millisToString(e)),{dim:!0})}
                      </span>
                    </li>
                  `))}
                </ol>
              </section>
            `:be}
          </main>
          <aside class="next-steps" aria-labelledby="next-steps-section-title">
            <h2 id="next-steps-section-title" class="section-title">${Te(Pe.nextSteps)}</h2>
            <div id="field-setup" class="settings-card">
              <h3 class="card-title">${Te(Pe.fieldData)}</h3>
              ${this.#Xe()}
              ${this.#ze()}
              ${this.#je()}
              <div class="field-setup-buttons">
                <${Z.litTagName}></${Z.litTagName}>
              </div>
            </div>
            <div id="recording-settings" class="settings-card">
              ${this.#Be()}
            </div>
            <div id="record" class="record-action-card">
              ${this.#Oe(this.#ke)}
            </div>
            <div id="record-page-load" class="record-action-card">
              ${this.#Oe(this.#Se)}
            </div>
          </aside>
        </div>
      </div>
    `;o.render(n,this.#e,{host:this})}}customElements.define("devtools-metric-card",Me),customElements.define("devtools-live-metrics-view",De);var Ne=Object.freeze({__proto__:null,MetricCard:Me,LiveMetricsView:De});const Ie=new CSSStyleSheet;var He;function Fe(e){let t="--app-color-system";switch(e){case He.Doc:t="--app-color-doc";break;case He.JS:t="--app-color-scripting";break;case He.CSS:t="--app-color-css";break;case He.Img:t="--app-color-image";break;case He.Media:t="--app-color-media";break;case He.Font:t="--app-color-font";break;case He.Wasm:t="--app-color-wasm";break;case He.Other:default:t="--app-color-system"}return P.ThemeSupport.instance().getComputedValue(t)}function Oe(e){const t=function(e){switch(e.args.data.mimeType){case"text/html":return He.Doc;case"application/javascript":case"application/x-javascript":case"text/javascript":return He.JS;case"text/css":return He.CSS;case"image/gif":case"image/jpeg":case"image/png":case"image/svg+xml":case"image/webp":case"image/x-icon":return He.Img;case"audio/aac":case"audio/midi":case"audio/x-midi":case"audio/mpeg":case"audio/ogg":case"audio/wav":case"audio/webm":return He.Media;case"font/opentype":case"font/woff2":case"font/ttf":case"application/font-woff":return He.Font;case"application/wasm":return He.Wasm;default:return He.Other}}(e);return Fe(t)}Ie.replaceSync('.network-request-details-title{font-size:13px;padding:8px;display:flex;align-items:center}.network-request-details-title > div{box-sizing:border-box;width:12px;height:12px;border:1px solid var(--sys-color-divider);display:inline-block;margin-right:4px;content:" "}.network-request-details-body{display:flex;padding-bottom:5px;border-bottom:1px solid var(--sys-color-divider)}.network-request-details-col{flex:1}.network-request-details-row{display:flex;padding:0 10px;min-height:20px}.title{color:var(--sys-color-token-subtle);overflow:hidden;padding-right:10px;display:inline-block;vertical-align:top}.value{display:inline-block;user-select:text;text-overflow:ellipsis;overflow:hidden;padding:0 3px}.devtools-link{color:var(--text-link);text-decoration:underline;outline-offset:2px;padding:0;.elements-disclosure &{color:var(--text-link)}devtools-icon{vertical-align:baseline;color:var(--sys-color-primary)}:focus .selected & devtools-icon{color:var(--sys-color-tonal-container)}&:focus-visible{outline-width:unset}&.invalid-link{color:var(--text-disabled);text-decoration:none}&:not(.devtools-link-prevent-click, .invalid-link){cursor:pointer}@media (forced-colors: active){&:not(.devtools-link-prevent-click){forced-color-adjust:none;color:linktext}&:focus-visible{background:Highlight;color:HighlightText}}}.text-button.link-style,\n.text-button.link-style:hover,\n.text-button.link-style:active{background:none;border:none;font:inherit}.timings-row{align-self:start;display:flex;align-items:center;width:100%}.indicator{display:inline-block;width:10px;height:4px;margin-right:5px;border:1px solid var(--sys-color-on-surface-subtle)}.whisker-left{align-self:center;display:inline-flex;width:10px;height:6px;margin-right:5px;border-left:1px solid var(--sys-color-on-surface-subtle)}.whisker-right{align-self:center;display:inline-flex;width:10px;height:6px;margin-right:5px;border-right:1px solid var(--sys-color-on-surface-subtle)}.horizontal{background-color:var(--sys-color-on-surface-subtle);height:1px;width:10px;align-self:center}.time{display:inline-block;padding-left:10px;margin-left:auto}\n/*# sourceURL=networkRequestDetails.css */\n'),function(e){e.Doc="Doc",e.CSS="CSS",e.JS="JS",e.Font="Font",e.Img="Img",e.Media="Media",e.Wasm="Wasm",e.Other="Other"}(He||(He={}));var Ee=Object.freeze({__proto__:null,get NetworkCategory(){return He},colorForNetworkCategory:Fe,colorForNetworkRequest:Oe});const qe={initialPriority:"Initial Priority",requestMethod:"Request Method",priority:"Priority",encodedData:"Encoded Data",decodedBody:"Decoded Body",yes:"Yes",no:"No",preview:"Preview",networkRequest:"Network request",duration:"Duration",fromCache:"From cache",mimeType:"Mime Type",FromMemoryCache:" (from memory cache)",FromCache:" (from cache)",FromPush:" (from push)",FromServiceWorker:" (from `service worker`)",initiatedBy:"Initiated by",queuingAndConnecting:"Queuing and connecting",requestSentAndWaiting:"Request sent and waiting",contentDownloading:"Content downloading",waitingOnMainThread:"Waiting on main thread"},Be=t.i18n.registerUIStrings("panels/timeline/components/NetworkRequestDetails.ts",qe),Ae=t.i18n.getLocalizedString.bind(void 0,Be);class Ue extends HTMLElement{static litTagName=o.literal`devtools-performance-network-request-details`;#e=this.attachShadow({mode:"open"});#Ke=null;#Je=null;#Qe=new WeakMap;#Ze;constructor(e){super(),this.#Ze=e}connectedCallback(){this.#e.adoptedStyleSheets=[Ie]}async setData(e,t){this.#Ke!==e&&(this.#Ke=e,this.#Je=t,await this.#i())}#et(){if(!this.#Ke)return null;const e={backgroundColor:`${Oe(this.#Ke)}`};return o.html`
      <div class="network-request-details-title">
        <div style=${o.Directives.styleMap(e)}"></div>
        ${Ae(qe.networkRequest)}
      </div>
    `}#tt(e,t){return t?o.html`
      <div class="network-request-details-row"><div class="title">${e}</div><div class="value">${t}</div></div>
    `:null}#it(){if(!this.#Ke)return null;const e={tabStop:!0,showColumnNumber:!1,inlineFrameIndex:0,maxLength:80},i=x.Linkifier.Linkifier.linkifyURL(this.#Ke.args.data.url,e),r=$.NetworkRequest.getNetworkRequest(this.#Ke);if(r){i.addEventListener("contextmenu",(e=>{if(!this.#Ke)return;const t=new h.ContextMenu.ContextMenu(e,{useSoftMenu:!0});t.appendApplicableItems(new $.NetworkRequest.TimelineNetworkRequest(r)),t.show()}));const e=o.html`
        ${i}
        <${k.RequestLinkIcon.RequestLinkIcon.litTagName}
          .data=${{request:r}} >
        </${k.RequestLinkIcon.RequestLinkIcon.litTagName}>
      `;return this.#tt(t.i18n.lockedString("URL"),e)}return this.#tt(t.i18n.lockedString("URL"),i)}#rt(){if(!this.#Ke)return null;const e=this.#Ke.args.data.syntheticData.isMemoryCached||this.#Ke.args.data.syntheticData.isDiskCached;return this.#tt(Ae(qe.fromCache),Ae(e?qe.yes:qe.no))}#nt(){if(!this.#Ke)return null;const e=this.#Ke.dur;if(!isFinite(e))return null;const i=t.TimeUtilities.formatMicroSecondsTime(e),r=o.html`
      <div>
        ${i}
        ${this.#ot()}
      </div>
    `;return this.#tt(Ae(qe.duration),r)}#at(){if(!this.#Ke)return null;let e="";return this.#Ke.args.data.syntheticData.isMemoryCached?e+=Ae(qe.FromMemoryCache):this.#Ke.args.data.syntheticData.isDiskCached?e+=Ae(qe.FromCache):this.#Ke.args.data.timing?.pushStart&&(e+=Ae(qe.FromPush)),this.#Ke.args.data.fromServiceWorker&&(e+=Ae(qe.FromServiceWorker)),!this.#Ke.args.data.encodedDataLength&&e||(e=`${c.NumberUtilities.bytesToString(this.#Ke.args.data.encodedDataLength)}${e}`),this.#tt(Ae(qe.encodedData),e)}#st(){if(!this.#Ke)return null;const e=i.Helpers.Trace.getZeroIndexedStackTraceForEvent(this.#Ke)?.at(0)??null;if(e){const t=this.#Ze.maybeLinkifyConsoleCallFrame(this.#Je,e,{tabStop:!0,inlineFrameIndex:0,showColumnNumber:!0});if(t)return this.#tt(Ae(qe.initiatedBy),t)}return null}async#lt(){if(!this.#Ke)return null;if(!this.#Qe.get(this.#Ke)&&this.#Ke.args.data.url&&this.#Je){const e=await x.ImagePreview.ImagePreview.build(this.#Je,this.#Ke.args.data.url,!1,{imageAltText:x.ImagePreview.ImagePreview.defaultAltTextForImageURL(this.#Ke.args.data.url),precomputedFeatures:void 0,align:"start"});this.#Qe.set(this.#Ke,e)}const e=this.#Qe.get(this.#Ke);return e?this.#tt(Ae(qe.preview),e):null}#dt(){return o.html`<span class="whisker-left"> <span class="horizontal"></span> </span>`}#ct(){return o.html`<span class="whisker-right"> <span class="horizontal"></span> </span>`}#ot(){if(!this.#Ke)return null;const e=this.#Ke.args.data.syntheticData,i=e.sendStartTime-this.#Ke.ts,r=e.downloadStart-e.sendStartTime,n=e.finishTime-e.downloadStart,a=this.#Ke.ts+this.#Ke.dur-e.finishTime,s=Oe(this.#Ke),l={backgroundColor:`color-mix(in srgb, ${s}, hsla(0, 100%, 100%, 0.8))`},d={backgroundColor:s};return o.html`
      <div class="timings-row">
        ${this.#dt()}
        ${Ae(qe.queuingAndConnecting)}
        <span class="time">${t.TimeUtilities.formatMicroSecondsTime(i)}</span>
      </div>
      <div class="timings-row">
        <span class="indicator" style=${o.Directives.styleMap(l)}></span>
        ${Ae(qe.requestSentAndWaiting)}
        <span class="time">${t.TimeUtilities.formatMicroSecondsTime(r)}</span>
      </div>
      <div class="timings-row">
        <span class="indicator" style=${o.Directives.styleMap(d)}></span>
        ${Ae(qe.contentDownloading)}
        <span class="time">${t.TimeUtilities.formatMicroSecondsTime(n)}</span>
      </div>
      <div class="timings-row">
        ${this.#ct()}
        ${Ae(qe.waitingOnMainThread)}
        <span class="time">${t.TimeUtilities.formatMicroSecondsTime(a)}</span>
      </div>
    `}async#i(){if(!this.#Ke)return;const e=this.#Ke.args.data,t=o.html`
      ${this.#et()}
      <div class="network-request-details-body">
        <div class="network-request-details-col">
          ${this.#it()}
          ${this.#tt(Ae(qe.requestMethod),e.requestMethod)}
          ${this.#tt(Ae(qe.initialPriority),S.NetworkPriorities.uiLabelForNetworkPriority(e.initialPriority))}
          ${this.#tt(Ae(qe.priority),S.NetworkPriorities.uiLabelForNetworkPriority(e.priority))}
          ${this.#tt(Ae(qe.mimeType),e.mimeType)}
          ${this.#at()}
          ${this.#tt(Ae(qe.decodedBody),c.NumberUtilities.bytesToString(this.#Ke.args.data.decodedBodyLength))}
          ${this.#st()}
          ${await this.#lt()}
        </div>
        <div class="network-request-details-col">
          ${this.#rt()}
          ${this.#nt()}
        </div>
      </div>
    `;o.render(t,this.#e,{host:this})}}customElements.define("devtools-performance-network-request-details",Ue);var ze=Object.freeze({__proto__:null,NetworkRequestDetails:Ue});const _e=new CSSStyleSheet;_e.replaceSync(".bold{font-weight:bold}.url{margin-left:15px;margin-right:5px}.priority{margin-left:15px}.priority > devtools-icon{height:13px;width:13px;color:var(--sys-color-on-surface-subtle)}.render-blocking{margin-left:15px;color:var(--sys-color-error)}.divider{border-top:1px solid var(--sys-color-divider);margin:5px 0}ul{list-style:none;padding:0;margin:0}li{display:flex;align-items:center}.indicator{display:inline-block;width:10px;height:4px;margin-right:5px;border:1px solid var(--sys-color-on-surface-subtle)}.whisker-left{display:flex;width:10px;height:6px;margin-right:5px;border-left:1px solid var(--sys-color-on-surface-subtle)}.whisker-right{display:flex;width:10px;height:6px;margin-right:5px;border-right:1px solid var(--sys-color-on-surface-subtle)}.horizontal{background-color:var(--sys-color-on-surface-subtle);height:1px;width:10px;align-self:center}.time{margin-left:auto}\n/*# sourceURL=networkRequestTooltip.css */\n");const We="Priority",Ve="Queuing and connecting",je="Request sent and waiting",Ge="Content downloading",Xe="Waiting on main thread",Ye="Render blocking";class Ke extends HTMLElement{static litTagName=o.literal`devtools-performance-network-request-tooltip`;#e=this.attachShadow({mode:"open"});#Ke;connectedCallback(){this.#e.adoptedStyleSheets=[_e],this.#i()}set networkRequest(e){this.#Ke!==e&&(this.#Ke=e,this.#i())}#ht(){return this.#Ke?this.#Ke.args.data.priority===this.#Ke.args.data.initialPriority?o.html`
        <div class="priority">${We}: ${S.NetworkPriorities.uiLabelForNetworkPriority(this.#Ke.args.data.priority)}</div>
      `:o.html`
      <div class="priority">
        ${We}:
        ${S.NetworkPriorities.uiLabelForNetworkPriority(this.#Ke.args.data.initialPriority)}
        <${n.Icon.Icon.litTagName} name=${"arrow-forward"}></${n.Icon.Icon.litTagName}>
        ${S.NetworkPriorities.uiLabelForNetworkPriority(this.#Ke.args.data.priority)}
      </div>
    `:null}#dt(){return o.html`<span class="whisker-left"> <span class="horizontal"></span> </span>`}#ct(){return o.html`<span class="whisker-right"> <span class="horizontal"></span> </span>`}#ot(){if(!this.#Ke)return null;const e=this.#Ke.args.data.syntheticData,i=e.sendStartTime-this.#Ke.ts,r=e.downloadStart-e.sendStartTime,n=e.finishTime-e.downloadStart,a=this.#Ke.ts+this.#Ke.dur-e.finishTime,s=Oe(this.#Ke),l={backgroundColor:`color-mix(in srgb, ${s}, hsla(0, 100%, 100%, 0.8))`},d={backgroundColor:s};return o.html`
      <ul>
        <li>
          ${this.#dt()}
          ${Ve}
          <span class="time">${t.TimeUtilities.formatMicroSecondsTime(i)}</span>
        </li>
        <li>
          <span class="indicator" style=${o.Directives.styleMap(l)}></span>
          ${je}
          <span class="time">${t.TimeUtilities.formatMicroSecondsTime(r)}</span>
        </li>
        <li>
          <span class="indicator" style=${o.Directives.styleMap(d)}></span>
          ${Ge}
          <span class="time">${t.TimeUtilities.formatMicroSecondsTime(n)}</span>
        </li>
        <li>
          ${this.#ct()}
          ${Xe}
          <span class="time">${t.TimeUtilities.formatMicroSecondsTime(a)}</span>
        </li>
      </ul>
    `}#i(){if(!this.#Ke)return;const e=this.#Ke.args.data,r=o.html`
      <div class="performance-card">
        <span class="url">${c.StringUtilities.trimMiddle(e.url,30)}</span>
        <span class="time bold">${t.TimeUtilities.formatMicroSecondsTime(this.#Ke.dur)}</span>

        <div class="divider"></div>
        ${this.#ht()}
        ${i.Helpers.Network.isSyntheticNetworkRequestEventRenderBlocking(this.#Ke)?o.html`<div class="render-blocking"> ${Ye} </div>`:o.nothing}
        <div class="divider"></div>

        ${this.#ot()}
      </div>
    `;o.render(r,this.#e,{host:this})}}customElements.define("devtools-performance-network-request-tooltip",Ke);var Je=Object.freeze({__proto__:null,NetworkRequestTooltip:Ke});const Qe=new CSSStyleSheet;Qe.replaceSync(":host{display:block}.annotations{display:block;padding:0}.bin-icon{visibility:hidden}.annotation-container{display:flex;justify-content:space-between;align-items:center;padding:0 10px;&:hover{background-color:var(--sys-color-neutral-container);.bin-icon{visibility:visible}}}.annotation{display:flex;flex-direction:column;align-items:flex-start;word-break:break-all;padding-top:15px;gap:6px}.entry-name{padding:4px 8px;border-radius:10px;font-weight:bold;&.entry-label{background-color:var(--app-color-performance-sidebar-entry-label)}&.time-range{background-color:var(--app-color-performance-sidebar-time-range);color:var(--app-color-performance-sidebar-time-range-text)}}.label{font-size:larger}\n/*# sourceURL=sidebarAnnotationsTab.css */\n");class Ze extends HTMLElement{static litTagName=o.literal`devtools-performance-sidebar-annotations`;#e=this.attachShadow({mode:"open"});#t=this.#i.bind(this);#gt=[];set annotations(e){this.#gt=e,r.ScheduledRender.scheduleRender(this,this.#t)}connectedCallback(){this.#e.adoptedStyleSheets=[Qe],r.ScheduledRender.scheduleRender(this,this.#t)}#ut(t){if(i.Types.File.isEntryLabelAnnotation(t)){const e=i.Types.TraceEvents.isProfileCall(t.entry)?t.entry.callFrame.functionName:t.entry.name;return o.html`
            <span class="entry-name entry-label">
              ${e}
            </span>
      `}if(i.Types.File.isTimeRangeAnnotation(t)){const r=e.TraceBounds.BoundsManager.instance().state()?.milli.entireTraceBounds.min??0,n=Math.round(i.Helpers.Timing.microSecondsToMilliseconds(t.bounds.min)-r),a=Math.round(i.Helpers.Timing.microSecondsToMilliseconds(t.bounds.max)-r);return o.html`
            <span class="entry-name time-range">
              ${n} - ${a} ms
            </span>
      `}return o.html``}#i(){o.render(o.html`
          <span class="annotations">
            ${this.#gt.map((e=>o.html`
                <div class="annotation-container">
                  <div class="annotation">
                    ${this.#ut(e)}
                    <span class="label">
                      ${"ENTRY_LABEL"===e.type||"TIME_RANGE"===e.type?e.label:""}
                    </span>
                  </div>
                  <${n.Icon.Icon.litTagName} class="bin-icon" .data=${{iconName:"bin",color:"var(--icon-default)",width:"20px",height:"20px"}} @click=${()=>{this.dispatchEvent(new at(e))}}>
                </div>`))}
          </span>`,this.#e,{host:this})}}customElements.define("devtools-performance-sidebar-annotations",Ze);var et=Object.freeze({__proto__:null,SidebarAnnotationsTab:Ze});const tt=new CSSStyleSheet;tt.replaceSync(":host{display:flex;flex-flow:column nowrap;flex-grow:1}.navigations-wrapper{display:flex;flex-flow:column nowrap;align-items:stretch;height:100%;details{flex-grow:0}details[open]{flex-grow:1;border-bottom:1px solid var(--sys-color-divider)}summary{background-color:var(--sys-color-surface2);border-bottom:1px solid var(--sys-color-divider);overflow:hidden;padding:2px 5px;text-overflow:ellipsis;white-space:nowrap;font:var(--sys-typescale-body4-medium);&:focus{background-color:var(--sys-color-tonal-container)}&::marker{color:var(--sys-color-on-surface-subtle);font-size:11px;line-height:1}details:first-child &{border-top:1px solid var(--sys-color-divider)}}}.insights-category-select{width:max-content;margin-top:10px;margin-left:10px}\n/*# sourceURL=sidebarInsightsTab.css */\n");const it=new CSSStyleSheet;it.replaceSync(":host{display:block;padding:5px 10px}.metrics-row{display:flex;flex-direction:row}.metric{margin-top:10px;flex:1;&:hover{transform:scale(1.05)}}.metric-value{font-size:20px}.metric-value-bad{color:var(--app-color-performance-bad)}.metric-value-ok{color:var(--app-color-performance-ok)}.metric-value-good{color:var(--app-color-performance-good)}.metric-score-unclassified{color:var(--sys-color-token-subtle)}.metric-label{font-size:12px;font-weight:bold}\n/*# sourceURL=sidebarSingleNavigation.css */\n");class rt extends HTMLElement{static litTagName=o.literal`devtools-performance-sidebar-single-navigation`;#e=this.attachShadow({mode:"open"});#mt=this.#i.bind(this);#Y={traceParsedData:null,insights:null,navigationId:null,activeCategory:nt.ALL,activeInsight:null};set data(e){this.#Y=e,r.ScheduledRender.scheduleRender(this,this.#mt)}connectedCallback(){this.#e.adoptedStyleSheets=[it],this.#i()}#pt(e){return this.#Y.activeCategory===nt.ALL||e===this.#Y.activeCategory}#vt(e){return()=>{this.dispatchEvent(new st(e))}}#ft(e,t,i,r){return this.#pt(e)?o.html`
      <div class="metric" @click=${r?this.#vt(r):null}>
        <div class="metric-value metric-value-${i}">${t}</div>
        <div class="metric-label">${e}</div>
      </div>
    `:o.nothing}#bt(e,t){const r=e.UserInteractions.interactionEventsWithNoNesting.filter((e=>e.args.data.navigationId===t));if(0===r.length)return null;let n=i.Types.Timing.MicroSeconds(0);for(const e of r)e.dur>n&&(n=e.dur);return n}#wt(e,t){const i=e.LayoutShifts.clusters.filter((e=>e.navigationId===t));let r,n=0;for(const e of i)e.clusterCumulativeScore>n&&(n=e.clusterCumulativeScore,r=e);return{maxScore:n,worstShfitEvent:r?.worstShiftEvent??null}}#yt(e,r){const n=e.PageLoadMetrics.metricScoresByFrameId.get(e.Meta.mainFrameId)?.get(r),a=n?.get("LCP"),{maxScore:s,worstShfitEvent:l}=this.#wt(e,r),d=this.#bt(e,r);return o.html`
    <div class="metrics-row">
    ${a?this.#ft("LCP",t.TimeUtilities.formatMicroSecondsAsSeconds(a.timing),a.classification,a.event??null):o.nothing}
    ${this.#ft("CLS",s.toFixed(2),i.Handlers.ModelHandlers.LayoutShifts.scoreClassificationForLayoutShift(s),l)}
    ${d?this.#ft("INP",t.TimeUtilities.formatMicroSecondsTime(d),i.Handlers.ModelHandlers.UserInteractions.scoreClassificationForInteractionToNextPaint(d),null):o.nothing}
    </div>
    `}#kt(e,t){return o.html`
    <div>
      <${T.LCPPhases.LCPPhases.litTagName}
        .insights=${e}
        .navigationId=${t}
        .activeInsight=${this.#Y.activeInsight}
        .activeCategory=${this.#Y.activeCategory}
      </${T.LCPPhases.LCPPhases}>
    </div>
    <div>
      <${T.LCPDiscovery.LCPDiscovery.litTagName}
        .insights=${e}
        .navigationId=${t}
        .activeInsight=${this.#Y.activeInsight}
        .activeCategory=${this.#Y.activeCategory}
      </${T.LCPDiscovery.LCPDiscovery}>
    </div>
    <div>
      <${T.CLSCulprits.CLSCulprits.litTagName}
        .insights=${e}
        .navigationId=${t}
        .activeInsight=${this.#Y.activeInsight}
        .activeCategory=${this.#Y.activeCategory}
      </${T.CLSCulprits.CLSCulprits}>
    </div>`}#i(){const{traceParsedData:e,insights:t,navigationId:i}=this.#Y;if(!e||!t||!i)return void o.render(o.html``,this.#e,{host:this});e.Meta.navigationsByNavigationId.get(i)?o.render(o.html`
      <div class="navigation">
        ${this.#yt(e,i)}
        ${this.#kt(t,i)}
        </div>
      `,this.#e,{host:this}):o.render(o.html``,this.#e,{host:this})}}var nt;customElements.define("devtools-performance-sidebar-single-navigation",rt),function(e){e.ALL="All",e.INP="INP",e.LCP="LCP",e.CLS="CLS",e.OTHER="Other"}(nt||(nt={}));class ot extends HTMLElement{static litTagName=o.literal`devtools-performance-sidebar-insights`;#t=this.#i.bind(this);#e=this.attachShadow({mode:"open"});#St=null;#xt=null;#$t=null;#Pt=nt.ALL;#Ct=null;connectedCallback(){this.#e.adoptedStyleSheets=[tt]}set traceParsedData(e){e!==this.#St&&(this.#St=e,e&&(this.#Ct=e.Meta.mainFrameNavigations.at(0)?.args.data?.navigationId??null),r.ScheduledRender.scheduleRender(this,this.#t))}set insights(e){e!==this.#xt&&(this.#xt=e,r.ScheduledRender.scheduleRender(this,this.#t))}set activeInsight(e){e!==this.#$t&&(this.#$t=e,r.ScheduledRender.scheduleRender(this,this.#t))}#Tt(e){const t=e.target.value;this.#Pt=t,r.ScheduledRender.scheduleRender(this,this.#t)}#Rt(e){e!==this.#$t?.navigationId&&this.dispatchEvent(new T.SidebarInsight.InsightDeactivated),this.#Ct=e,r.ScheduledRender.scheduleRender(this,this.#t)}#i(){if(!this.#St||!this.#xt)return void o.render(o.nothing,this.#e,{host:this});const e=this.#St.Meta.mainFrameNavigations??[],t=e.length>1,i=o.html`
      <select class="chrome-select insights-category-select"
        @change=${this.#Tt}
        jslog=${a.dropDown("timeline.sidebar-insights-category-select").track({click:!0})}
      >
        ${Object.values(nt).map((e=>o.html`
            <option value=${e}>
              ${e}
            </option>
          `))}
      </select>

      <div class="navigations-wrapper">
        ${e.map((e=>{const i=e.args.data?.navigationId,r=e.args.data?.documentLoaderURL;if(!i||!r)return o.nothing;const n={traceParsedData:this.#St??null,insights:this.#xt,navigationId:i,activeCategory:this.#Pt,activeInsight:this.#$t},a=o.html`
            <${rt.litTagName}
              .data=${n}>
            </${rt.litTagName}>
          `;return t?o.html`<details
              ?open=${i===this.#Ct}
              class="navigation-wrapper"
            >
              <summary @click=${()=>this.#Rt(i)}>${r}</summary>
              ${a}
            </details>`:a}))}
      </div>
    `;o.render(o.html`${i}`,this.#e,{host:this})}}customElements.define("devtools-performance-sidebar-insights",ot);class at extends Event{removedAnnotation;static eventName="removeannotation";constructor(e){super(at.eventName,{bubbles:!0,composed:!0}),this.removedAnnotation=e}}class st extends Event{metricEvent;static eventName="sidebarmetricclick";constructor(e){super(st.eventName,{bubbles:!0,composed:!0}),this.metricEvent=e}}class lt extends h.Widget.VBox{#Lt=new h.TabbedPane.TabbedPane;#Mt=new dt;#Dt=new ct;wasShown(){this.#Lt.show(this.element),!this.#Lt.hasTab("insights")&&C.Runtime.experiments.isEnabled("timeline-rpp-sidebar")&&this.#Lt.appendTab("insights","Insights",this.#Mt,void 0,void 0,!1,!1,0,"timeline.insights-tab"),!this.#Lt.hasTab("annotations")&&C.Runtime.experiments.isEnabled("perf-panel-annotations")&&this.#Lt.appendTab("annotations","Annotations",this.#Dt,void 0,void 0,!1,!1,1,"timeline.annotations-tab")}setAnnotations(e){this.#Dt.setAnnotations(e)}setTraceParsedData(e){this.#Mt.setTraceParsedData(e)}setInsights(e){this.#Mt.setInsights(e)}setActiveInsight(e){this.#Mt.setActiveInsight(e)}}class dt extends h.Widget.VBox{#Nt=new ot;constructor(){super(),this.element.classList.add("sidebar-insights"),this.element.appendChild(this.#Nt)}setTraceParsedData(e){this.#Nt.traceParsedData=e}setInsights(e){this.#Nt.insights=e}setActiveInsight(e){this.#Nt.activeInsight=e}}class ct extends h.Widget.VBox{#Nt=new Ze;constructor(){super(),this.element.classList.add("sidebar-annotations"),this.element.appendChild(this.#Nt)}setAnnotations(e){this.#Nt.annotations=e}}var ht=Object.freeze({__proto__:null,RemoveAnnotation:at,EventReferenceClick:st,DEFAULT_SIDEBAR_TAB:"insights",SidebarWidget:lt});export{L as Breadcrumbs,F as BreadcrumbsUI,U as CPUThrottlingSelector,V as DetailsView,ee as FieldSettingsDialog,ae as InteractionBreakdown,Ne as LiveMetricsView,ze as NetworkRequestDetails,Je as NetworkRequestTooltip,ve as NetworkThrottlingSelector,ht as Sidebar,et as SidebarAnnotationsTab,Ee as Utils};
