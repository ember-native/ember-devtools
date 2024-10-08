import*as e from"../../../../ui/lit-html/lit-html.js";import*as t from"../../../../ui/components/helpers/helpers.js";import*as i from"../../../../ui/components/buttons/buttons.js";import*as s from"../../../../ui/visual_logging/visual_logging.js";import*as n from"../../../../core/common/common.js";import*as o from"../../../../core/i18n/i18n.js";import*as a from"../../../../core/platform/platform.js";import*as r from"../../../../models/trace/trace.js";import*as d from"../../../../ui/components/icon_button/icon_button.js";const l=new CSSStyleSheet;l.replaceSync(".insight{display:block;position:relative;width:auto;height:auto;margin:10px 0;border-radius:var(--sys-shape-corner-extra-small);overflow:hidden;border:1px solid var(--sys-color-divider);background-color:var(--sys-color-base);&.closed{background-color:var(--sys-color-surface3);border:none}header{padding:10px;h3{font:var(--sys-typescale-body4-medium)}}}.insight-hover-icon{position:absolute;top:10px;right:10px;border:none;width:var(--sys-size-9);height:var(--sys-size-9);box-shadow:var(--sys-elevation-level1);border-radius:var(--sys-shape-corner-full);background:var(--sys-color-cdt-base-container);opacity:0%;transition:opacity 0.2s ease;.insight:hover &{opacity:100%}devtools-button{transition:transform 0.2s ease}&.active devtools-button{transform:rotate(180deg)}}.insight-body{padding:0 10px}.insight-title{color:var(--sys-color-on-base);margin-block:3px}.table-container dl{display:grid;grid-template-columns:2fr 1fr}.table-container dt{padding:3px}.table-container dd{display:grid;justify-items:end;margin-inline-start:auto}.insight-description{border-bottom:1px solid var(--sys-color-divider);padding-bottom:10px}.link{color:var(--sys-color-primary)}.dl-title{font-weight:bold}.dl-value{font-weight:bold}.metric-value-bad{color:var(--app-color-performance-bad)}.metric-value-good{color:var(--app-color-performance-good)}.insight-entry{font:var(--sys-typescale-body4-medium);padding-block:2px;display:flex;align-items:center}.insight-content{display:grid;grid-template-columns:1fr 1fr;align-items:center;padding-block:10px}.element-img{max-width:90%}.element-img-details{font:var(--sys-typescale-body4-regular);.element-img-details-size{color:var(--color-text-secondary)}}::slotted(*){font:var(--sys-typescale-body4-regular)}\n/*# sourceURL=sidebarInsight.css */\n");class c extends Event{name;navigationId;createOverlayFn;static eventName="insightactivated";constructor(e,t,i){super(c.eventName,{bubbles:!0,composed:!0}),this.name=e,this.navigationId=t,this.createOverlayFn=i}}class h extends Event{static eventName="insightdeactivated";constructor(){super(h.eventName,{bubbles:!0,composed:!0})}}class g extends HTMLElement{static litTagName=e.literal`devtools-performance-sidebar-insight`;#e=this.attachShadow({mode:"open"});#t=this.#i.bind(this);#s="";#n=!1;set data(e){this.#s=e.title,this.#n=e.expanded,t.ScheduledRender.scheduleRender(this,this.#t)}connectedCallback(){this.#e.adoptedStyleSheets=[l],t.ScheduledRender.scheduleRender(this,this.#t)}#o(){this.dispatchEvent(new CustomEvent("insighttoggleclick"))}#a(t){const s=e.Directives.classMap({"insight-hover-icon":!0,active:t});return e.html`
      <div class=${s} aria-hidden="true">
        <${i.Button.Button.litTagName} .data=${{variant:"icon",iconName:"chevron-down",size:"SMALL"}}
      ></${i.Button.Button.litTagName}>
      </div>

    `}#i(){const t=e.Directives.classMap({insight:!0,closed:!this.#n}),i=e.html`
      <div class=${t}>
        <header @click=${this.#o} jslog=${s.action("timeline.toggle-insight").track({click:!0})}>
          ${this.#a(this.#n)}
          <h3 class="insight-title">${this.#s}</h3>
        </header>
        ${this.#n?e.html`
          <div class="insight-body">
            <slot name="insight-description"></slot>
            <slot name="insight-content"></slot>
          </div>`:e.nothing}
      </div>
    `;e.render(i,this.#e,{host:this})}}customElements.define("devtools-performance-sidebar-insight",g);var p,m=Object.freeze({__proto__:null,InsightActivated:c,InsightDeactivated:h,SidebarInsight:g});!function(e){e.ALL="All",e.INP="INP",e.LCP="LCP",e.CLS="CLS",e.OTHER="Other"}(p||(p={}));var u=Object.freeze({__proto__:null,get InsightsCategories(){return p}});function v(e){return e.activeCategory===p.ALL||e.activeCategory===e.insightCategory}function y(e){const t=e.activeInsight&&e.activeInsight.name===e.insightName&&e.activeInsight.navigationId===e.insightNavigationId;return Boolean(t)}class b extends HTMLElement{shadow=this.attachShadow({mode:"open"});data={insights:null,navigationId:null,activeInsight:null,activeCategory:p.ALL};#t=this.render.bind(this);scheduleRender(){t.ScheduledRender.scheduleRender(this,this.#t)}connectedCallback(){this.shadow.adoptedStyleSheets.push(l)}set insights(e){this.data.insights=e,t.ScheduledRender.scheduleRender(this,this.#t)}set navigationId(e){this.data.navigationId=e,t.ScheduledRender.scheduleRender(this,this.#t)}set activeInsight(e){this.data.activeInsight=e,t.ScheduledRender.scheduleRender(this,this.#t)}set activeCategory(e){this.data.activeCategory=e,t.ScheduledRender.scheduleRender(this,this.#t)}onSidebarClick(){this.isActive()?this.dispatchEvent(new h):this.data.navigationId&&this.dispatchEvent(new c(this.internalName,this.data.navigationId,this.createOverlays.bind(this)))}isActive(){return y({activeInsight:this.data.activeInsight,insightName:this.internalName,insightNavigationId:this.data.navigationId})}}var f=Object.freeze({__proto__:null,shouldRenderForCategory:v,insightIsActive:y,BaseInsight:b});function T(e,t){if(!e||!t)return null;const i=e.get(t);if(!i)return null;const s=i.CumulativeLayoutShift;return s instanceof Error?null:s}class S extends b{static litTagName=e.literal`devtools-performance-cls-culprits`;insightCategory=p.CLS;internalName="cls-culprits";userVisibleTitle="Layout Shift Culprits";createOverlays(){return[]}#i(){return e.html`
        <div class="insights">
            <${g.litTagName} .data=${{title:this.userVisibleTitle,expanded:this.isActive()}}
            @insighttoggleclick=${this.onSidebarClick}>
                <div slot="insight-description" class="insight-description">
                    <p>Layout shifts happen when existing elements unexpectedly move.
                         Shifts are caused by nodes changing size or newly added. Investigate
                         and fix these culprits.</p>
                </div>
            </${g}>
        </div>`}render(){const t=T(this.data.insights,this.data.navigationId),i=t?.shifts&&t.shifts.size>0,s=v({activeCategory:this.data.activeCategory,insightCategory:this.insightCategory}),n=i&&s?this.#i():e.nothing;e.render(n,this.shadow,{host:this})}}customElements.define("devtools-performance-cls-culprits",S);var L=Object.freeze({__proto__:null,getCLSInsight:T,CLSCulprits:S});const C=new CSSStyleSheet;C.replaceSync(".discovery-delay{margin-top:0}.discovery-time-ms{color:var(--sys-color-error-bright)}ul.discovery-icon-results{list-style:none;margin:0;padding:0;li{display:flex;align-items:flex-start;justify-content:flex-start;gap:4px;span{padding-top:2px}}}\n/*# sourceURL=lcpDiscovery.css */\n");const I={lcpLoadDelay:"LCP image loaded {PH1} after earliest start point.",fetchPriorityApplied:"fetchpriority=high applied",requestDiscoverable:"Request is discoverable in initial document",lazyLoadNotApplied:"lazy load not applied"},R=o.i18n.registerUIStrings("panels/timeline/components/insights/LCPDiscovery.ts",I),D=o.i18n.getLocalizedString.bind(void 0,R);function x(e,t){if(!e||!t)return null;const i=e.get(t);if(!i)return null;const s=i.LargestContentfulPaint;return s instanceof Error?null:s}function $(e,t){const i=x(e,t);if(!i)return null;if(void 0===i.lcpResource)return null;const s=i.shouldIncreasePriorityHint,n=i.shouldPreloadImage,o=i.shouldRemoveLazyLoading;if(!(void 0!==s&&void 0!==n&&void 0!==o))return null;const a={shouldIncreasePriorityHint:s,shouldPreloadImage:n,shouldRemoveLazyLoading:o,resource:i.lcpResource,discoveryDelay:null};if(i.earliestDiscoveryTimeTs&&i.lcpResource){const e=i.lcpResource.ts-i.earliestDiscoveryTimeTs;a.discoveryDelay=r.Types.Timing.MicroSeconds(e)}return a}class P extends b{static litTagName=e.literal`devtools-performance-lcp-discovery`;insightCategory=p.LCP;internalName="lcp-discovery";userVisibleTitle="LCP request discovery";connectedCallback(){super.connectedCallback(),this.shadow.adoptedStyleSheets.push(C)}#r(t){const i=t?"clear":"check-circle";return e.html`
      <${d.Icon.Icon.litTagName}
      name=${i}
      class=${t?"metric-value-bad":"metric-value-good"}
      ></${d.Icon.Icon.litTagName}>
    `}#d(e){const t=document.createElement("span");return t.classList.add("discovery-time-ms"),t.innerText=o.TimeUtilities.formatMicroSecondsTime(e),o.i18n.getFormatLocalizedString(R,I.lcpLoadDelay,{PH1:t})}createOverlays(){const e=$(this.data.insights,this.data.navigationId);if(!e||!e.discoveryDelay)return[];const t=r.Helpers.Timing.traceWindowFromMicroSeconds(r.Types.Timing.MicroSeconds(e.resource.ts-e.discoveryDelay),e.resource.ts),i=r.Helpers.Timing.microSecondsToMilliseconds(t.range);return[{type:"ENTRY_OUTLINE",entry:e.resource,outlineReason:"ERROR"},{type:"CANDY_STRIPED_TIME_RANGE",bounds:t,entry:e.resource},{type:"TIMESPAN_BREAKDOWN",sections:[{bounds:t,label:D(I.lcpLoadDelay,{PH1:o.TimeUtilities.preciseMillisToString(i,2)})}],entry:e.resource}]}#l(t){return e.html`
        <div class="insights">
          <${g.litTagName} .data=${{title:this.userVisibleTitle,expanded:this.isActive()}}
          @insighttoggleclick=${this.onSidebarClick}
        >
          <div slot="insight-description" class="insight-description">
          ${t.discoveryDelay?e.html`<p class="discovery-delay">${this.#d(t.discoveryDelay)}</p>`:e.nothing}
            <ul class="insight-results discovery-icon-results">
              <li class="insight-entry">
                ${this.#r(t.shouldIncreasePriorityHint)}
                <span>${D(I.fetchPriorityApplied)}</span>
              </li>
              <li class="insight-entry">
                ${this.#r(t.shouldPreloadImage)}
                <span>${D(I.requestDiscoverable)}</span>
              </li>
              <li class="insight-entry">
                ${this.#r(t.shouldRemoveLazyLoading)}
                <span>${D(I.lazyLoadNotApplied)}</span>
              </li>
            </ul>
          </div>
          <div slot="insight-content" class="insight-content">
            <img class="element-img" data-src=${t.resource.args.data.url} src=${t.resource.args.data.url}>
            <div class="element-img-details">
              ${n.ParsedURL.ParsedURL.extractName(t.resource.args.data.url??"")}
              <div class="element-img-details-size">${a.NumberUtilities.bytesToString(t.resource.args.data.decodedBodyLength??0)}</div>
            </div>
          </div>
        </${g}>
      </div>`}render(){const t=$(this.data.insights,this.data.navigationId),i=v({activeCategory:this.data.activeCategory,insightCategory:this.insightCategory}),s=t&&i?this.#l(t):e.nothing;e.render(s,this.shadow,{host:this})}}customElements.define("devtools-performance-lcp-discovery",P);var N=Object.freeze({__proto__:null,getLCPInsightData:x,LCPDiscovery:P});const w={timeToFirstByte:"Time to first byte",resourceLoadDelay:"Resource load delay",resourceLoadDuration:"Resource load duration",elementRenderDelay:"Element render delay"},M=o.i18n.registerUIStrings("panels/timeline/components/insights/LCPPhases.ts",w),_=o.i18n.getLocalizedString.bind(void 0,M);class E extends b{static litTagName=e.literal`devtools-performance-lcp-by-phases`;insightCategory=p.LCP;internalName="lcp-by-phase";userVisibleTitle="LCP by phase";#c(e,t){if(!e||!t)return[];const i=e.get(t);if(!i)return[];const s=i.LargestContentfulPaint;if(s instanceof Error)return[];const n=s.lcpMs,o=s.phases;if(!n||!o)return[];const{ttfb:a,loadDelay:r,loadTime:d,renderDelay:l}=o;if(r&&d){return[{phase:_(w.timeToFirstByte),timing:a,percent:`${(100*a/n).toFixed(0)}%`},{phase:_(w.resourceLoadDelay),timing:r,percent:`${(100*r/n).toFixed(0)}%`},{phase:_(w.resourceLoadDuration),timing:d,percent:`${(100*d/n).toFixed(0)}%`},{phase:_(w.elementRenderDelay),timing:l,percent:`${(100*l/n).toFixed(0)}%`}]}return[{phase:_(w.timeToFirstByte),timing:a,percent:`${(100*a/n).toFixed(0)}%`},{phase:_(w.elementRenderDelay),timing:l,percent:`${(100*l/n).toFixed(0)}%`}]}createOverlays(){if(!this.data.insights||!this.data.navigationId)return[];const{navigationId:e,insights:t}=this.data,i=t.get(e);if(!i)return[];const s=i.LargestContentfulPaint;if(s instanceof Error)return[];const n=s.phases,o=s.lcpTs;if(!n||!o)return[];const a=r.Types.Timing.MicroSeconds(r.Helpers.Timing.millisecondsToMicroseconds(o)),d=[];if(n?.loadDelay||n?.loadTime){if(n?.loadDelay&&n?.loadTime){const e=r.Types.Timing.MicroSeconds(a-r.Helpers.Timing.millisecondsToMicroseconds(n.renderDelay)),t=r.Helpers.Timing.traceWindowFromMicroSeconds(e,a),i=r.Types.Timing.MicroSeconds(e-r.Helpers.Timing.millisecondsToMicroseconds(n.loadTime)),s=r.Helpers.Timing.traceWindowFromMicroSeconds(i,e),o=r.Types.Timing.MicroSeconds(i-r.Helpers.Timing.millisecondsToMicroseconds(n.loadDelay)),l=r.Helpers.Timing.traceWindowFromMicroSeconds(o,i),c=r.Types.Timing.MicroSeconds(o-r.Helpers.Timing.millisecondsToMicroseconds(n.ttfb)),h=r.Helpers.Timing.traceWindowFromMicroSeconds(c,o);d.push({bounds:h,label:_(w.timeToFirstByte)},{bounds:l,label:_(w.resourceLoadDelay)},{bounds:s,label:_(w.resourceLoadDuration)},{bounds:t,label:_(w.elementRenderDelay)})}}else{const e=r.Types.Timing.MicroSeconds(a-r.Helpers.Timing.millisecondsToMicroseconds(n.renderDelay)),t=r.Helpers.Timing.traceWindowFromMicroSeconds(e,a),i=r.Types.Timing.MicroSeconds(e-r.Helpers.Timing.millisecondsToMicroseconds(n.ttfb)),s=r.Helpers.Timing.traceWindowFromMicroSeconds(i,e);d.push({bounds:s,label:_(w.timeToFirstByte)},{bounds:t,label:_(w.elementRenderDelay)})}return[{type:"TIMESPAN_BREAKDOWN",sections:d}]}#h(t){return e.html`
    <div class="insights">
      <${g.litTagName} .data=${{title:this.userVisibleTitle,expanded:this.isActive()}}
        @insighttoggleclick=${this.onSidebarClick}
      >
        <div slot="insight-description" class="insight-description">
          Each
          <x-link class="link" href="https://web.dev/articles/optimize-lcp#lcp-breakdown">phase has specific recommendations to improve.</x-link>
          In an ideal load, the two delay phases should be quite short.
        </div>
        <div slot="insight-content" class="table-container">
          <dl>
            <dt class="dl-title">Phase</dt>
            <dd class="dl-title">% of LCP</dd>
            ${t?.map((t=>e.html`
              <dt>${t.phase}</dt>
              <dd class="dl-value">${t.percent}</dd>
            `))}
          </dl>
        </div>
      </${m}>
    </div>`}#g(e){return!!e&&e.length>0}render(){const t=this.#c(this.data.insights,this.data.navigationId),i=v({activeCategory:this.data.activeCategory,insightCategory:this.insightCategory})&&this.#g(t)?this.#h(t):e.nothing;e.render(i,this.shadow,{host:this})}}customElements.define("devtools-performance-lcp-by-phases",E);var k=Object.freeze({__proto__:null,LCPPhases:E});export{L as CLSCulprits,f as Helpers,N as LCPDiscovery,k as LCPPhases,m as SidebarInsight,u as Types};
