import*as e from"../../core/common/common.js";import*as t from"../../core/i18n/i18n.js";import*as s from"../../core/sdk/sdk.js";import*as i from"../../models/autofill_manager/autofill_manager.js";import*as l from"../../ui/components/adorners/adorners.js";import*as o from"../../ui/components/data_grid/data_grid.js";import*as n from"../../ui/components/helpers/helpers.js";import*as a from"../../ui/components/input/input.js";import*as d from"../../ui/components/legacy_wrapper/legacy_wrapper.js";import*as r from"../../ui/lit-html/lit-html.js";import*as h from"../../ui/visual_logging/visual_logging.js";const c=new CSSStyleSheet;c.replaceSync("main{height:100%}.header{display:flex;border-bottom:1px solid var(--sys-color-divider);width:100%}.placeholder-container{height:calc(100% - 29px);display:flex;justify-content:center;align-items:center}.placeholder{font-size:15px;text-align:center}.address{padding:10px;margin-right:auto}.filled-fields-grid{border-top:1px solid var(--sys-color-divider);box-sizing:border-box}.content-container{display:flex;flex-flow:column;height:100%}.grid-wrapper{flex-grow:1}.checkbox-label{display:flex;align-items:center}.right-to-left{border-bottom:1px solid var(--sys-color-divider);display:flex;flex-flow:row-reverse wrap;justify-content:flex-end}.label-container{padding:5px;display:flex;align-items:flex-start}.top-left-corner{border-bottom:1px solid var(--sys-color-divider);display:flex;padding:5px;gap:10px}.matches-filled-field{background-color:var(--sys-color-tonal-container)}.highlighted{background-color:var(--sys-color-state-focus-select)}.link{color:var(--sys-color-primary);text-decoration-line:underline}.feedback{margin:auto 5px auto auto}\n/*# sourceURL=autofillView.css */\n");const u={toStartDebugging:"To start debugging autofill, use Chrome's autofill menu to fill an address form.",value:"Value",predictedAutofillValue:"Predicted autofill value",formField:"Form field",autocompleteAttribute:"Autocomplete attribute",attr:"attr",inferredByHeuristics:"Inferred by heuristics",heur:"heur",autoShow:"Automatically open this panel",showTestAddressesInAutofillMenu:"Show test addresses in autofill menu",autoShowTooltip:"Open the autofill panel automatically when an autofill activity is detected.",addressPreview:"Address preview",formInspector:"Form inspector",learnMore:"Learn more",sendFeedback:"Send feedback"},g="https://crbug.com/329106326",f=t.i18n.registerUIStrings("panels/autofill/AutofillView.ts",u),p=t.i18n.getLocalizedString.bind(void 0,f);class m extends d.LegacyWrapper.WrappableComponent{static litTagName=r.literal`devtools-autofill-view`;#e=this.attachShadow({mode:"open"});#t=this.#s.bind(this);#i;#l;#o="";#n=[];#a=[];#d=[];constructor(){super(),this.#i=e.Settings.Settings.instance().createSetting("auto-open-autofill-view-on-event",!0),this.#l=e.Settings.Settings.instance().createSetting("show-test-addresses-in-autofill-menu-on-event",!1)}connectedCallback(){this.#e.adoptedStyleSheets=[a.checkboxStyles,c];const e=i.AutofillManager.AutofillManager.instance(),t=e.getLastFilledAddressForm();t&&({address:this.#o,filledFields:this.#n,matches:this.#a}=t),e.addEventListener("AddressFormFilled",this.#r,this),s.TargetManager.TargetManager.instance().addModelListener(s.ResourceTreeModel.ResourceTreeModel,s.ResourceTreeModel.Events.PrimaryPageChanged,this.#h,this),n.ScheduledRender.scheduleRender(this,this.#t)}#h(){this.#o="",this.#n=[],this.#a=[],this.#d=[],n.ScheduledRender.scheduleRender(this,this.#t)}#r({data:e}){({address:this.#o,filledFields:this.#n,matches:this.#a}=e),this.#d=[],n.ScheduledRender.scheduleRender(this,this.#t)}async#s(){if(!n.ScheduledRender.isScheduledRender(this))throw new Error("AutofillView render was not scheduled");this.#o||this.#n.length?r.render(r.html`
      <main>
        <div class="content-container" jslog=${h.pane("autofill")}>
          <div class="right-to-left" role="region" aria-label=${p(u.addressPreview)}>
            <div class="header">
              <div class="label-container">
                <label class="checkbox-label" title=${p(u.showTestAddressesInAutofillMenu)}>
                  <input
                    type="checkbox"
                    ?checked=${this.#l.get()}
                    @change=${this.#c.bind(this)}
                    jslog=${h.toggle(this.#l.name).track({change:!0})}
                  >
                  <span>${p(u.showTestAddressesInAutofillMenu)}</span>
                </label>
              </div>
              <div class="label-container">
                <label class="checkbox-label" title=${p(u.autoShowTooltip)}>
                  <input
                    type="checkbox"
                    ?checked=${this.#i.get()}
                    @change=${this.#u.bind(this)}
                    jslog=${h.toggle(this.#i.name).track({change:!0})}
                  >
                  <span>${p(u.autoShow)}</span>
                </label>
              </div>
              <x-link href=${g} class="feedback link" jslog=${h.link("feedback").track({click:!0})}>${p(u.sendFeedback)}</x-link>
            </div>
            ${this.#g()}
          </div>
          ${this.#f()}
        </div>
      </main>
    `,this.#e,{host:this}):r.render(r.html`
        <main>
          <div class="top-left-corner">
            <label class="checkbox-label" title=${p(u.showTestAddressesInAutofillMenu)}>
              <input
                type="checkbox"
                ?checked=${this.#l.get()}
                @change=${this.#c.bind(this)}
                jslog=${h.toggle(this.#l.name).track({change:!0})}>
              <span>${p(u.showTestAddressesInAutofillMenu)}</span>
            </label>
            <label class="checkbox-label" title=${p(u.autoShowTooltip)}>
            <input
              type="checkbox"
              ?checked=${this.#i.get()}
              @change=${this.#u.bind(this)}
              jslog=${h.toggle(this.#i.name).track({change:!0})}>
            <span>${p(u.autoShow)}</span>
            </label>
            <x-link href=${g} class="feedback link" jslog=${h.link("feedback").track({click:!0})}>${p(u.sendFeedback)}</x-link>
          </div>
          <div class="placeholder-container" jslog=${h.pane("autofill-empty")}>
            <div class="placeholder">
              <div>${p(u.toStartDebugging)}</div>
              <x-link href=${"https://goo.gle/devtools-autofill-panel"} class="link" jslog=${h.link("learn-more").track({click:!0})}>${p(u.learnMore)}</x-link>
            </div>
          </div>
        </main>
      `,this.#e,{host:this})}#u(e){const{checked:t}=e.target;this.#i.set(t)}#c(e){const{checked:t}=e.target;this.#l.set(t),i.AutofillManager.AutofillManager.instance().onShowAutofillTestAddressesSettingsChanged()}#g(){if(!this.#o)return r.nothing;const e=(e,t)=>{const s=this.#o.substring(e,t).split("\n"),i=s.map(((e,t)=>t===s.length-1?e:r.html`${e}<br>`)),l=this.#a.some((t=>t.startIndex<=e&&t.endIndex>e));if(!l)return r.html`<span>${i}</span>`;const o=r.Directives.classMap({"matches-filled-field":l,highlighted:this.#d.some((t=>t.startIndex<=e&&t.endIndex>e))});return r.html`
        <span
          class=${o}
          @mouseenter=${()=>this.#p(e)}
          @mouseleave=${this.#m}
          jslog=${h.item("matched-address-item").track({hover:!0})}
        >${i}</span>`},t=[],s=new Set([0,this.#o.length]);for(const e of this.#a)s.add(e.startIndex),s.add(e.endIndex);const i=Array.from(s).sort(((e,t)=>e-t));for(let s=0;s<i.length-1;s++)t.push(e(i[s],i[s+1]));return r.html`
      <div class="address">
        ${t}
      </div>
    `}#p(e){this.#d=this.#a.filter((t=>t.startIndex<=e&&t.endIndex>e)),n.ScheduledRender.scheduleRender(this,this.#t)}#m(){this.#d=[],n.ScheduledRender.scheduleRender(this,this.#t)}#f(){if(!this.#n.length)return r.nothing;const e={columns:[{id:"name",title:p(u.formField),widthWeighting:50,hideable:!1,visible:!0,sortable:!0},{id:"autofill-type",title:p(u.predictedAutofillValue),widthWeighting:50,hideable:!1,visible:!0,sortable:!0},{id:"value",title:p(u.value),widthWeighting:50,hideable:!1,visible:!0,sortable:!0},{id:"filled-field-index",title:"filledFieldIndex",widthWeighting:50,hideable:!0,visible:!1}],rows:this.#b(),striped:!0};return r.html`
      <div class="grid-wrapper" role="region" aria-label=${p(u.formInspector)}>
        <${o.DataGridController.DataGridController.litTagName}
          @rowmouseenter=${this.#v}
          @rowmouseleave=${this.#w}
          class="filled-fields-grid"
          .data=${e}
        >
        </${o.DataGridController.DataGridController.litTagName}>
      </div>
    `}#v(e){const t=e.data.row.cells[3].value;if("number"!=typeof t)return;this.#d=this.#a.filter((e=>e.filledFieldIndex===t)),n.ScheduledRender.scheduleRender(this,this.#t);const i=this.#n[t].fieldId,l=s.FrameManager.FrameManager.instance().getFrame(this.#n[t].frameId)?.resourceTreeModel().target();if(l){const e=new s.DOMModel.DeferredDOMNode(l,i),t=l.model(s.DOMModel.DOMModel);e&&t&&t.overlayModel().highlightInOverlay({deferredNode:e},"all")}}#w(){this.#d=[],n.ScheduledRender.scheduleRender(this,this.#t),s.OverlayModel.OverlayModel.hideDOMNodeHighlight()}#b(){const e=new Set(this.#d.map((e=>e.filledFieldIndex)));return this.#n.map(((t,s)=>({cells:[{columnId:"name",value:`${t.name||`#${t.id}`} (${t.htmlType})`},{columnId:"autofill-type",value:t.autofillType,renderer:()=>this.#x(t.autofillType,t.fillingStrategy)},{columnId:"value",value:`"${t.value}"`},{columnId:"filled-field-index",value:s}],styles:{"font-family":"var(--monospace-font-family)","font-size":"var(--monospace-font-size)",...e.has(s)&&{"background-color":"var(--sys-color-state-hover-on-subtle)"}}})))}#x(e,t){const s=document.createElement("span");let i="";switch(t){case"autocompleteAttribute":s.textContent=p(u.attr),i=p(u.autocompleteAttribute);break;case"autofillInferred":s.textContent=p(u.heur),i=p(u.inferredByHeuristics)}return r.html`
      ${e}
      ${s.textContent?r.html`
          <${l.Adorner.Adorner.litTagName} title=${i} .data=${{name:t,content:s}}>
        `:r.nothing}
    `}}customElements.define("devtools-autofill-view",m);var b=Object.freeze({__proto__:null,i18nString:p,AutofillView:m});export{b as AutofillView};
