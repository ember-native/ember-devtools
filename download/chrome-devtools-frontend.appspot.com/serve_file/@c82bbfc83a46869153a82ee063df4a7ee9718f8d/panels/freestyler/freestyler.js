import*as e from"../../core/host/host.js";import*as t from"../../core/i18n/i18n.js";import*as n from"../../ui/components/buttons/buttons.js";import*as i from"../../ui/components/input/input.js";import*as s from"../../ui/lit-html/lit-html.js";import*as o from"../../ui/visual_logging/visual_logging.js";import*as a from"../../core/common/common.js";import*as r from"../../third_party/marked/marked.js";import*as l from"../../ui/components/icon_button/icon_button.js";import*as c from"../../ui/components/markdown_view/markdown_view.js";import*as d from"../../core/platform/platform.js";import*as h from"../../core/sdk/sdk.js";import*as u from"../../ui/legacy/legacy.js";class p extends Error{}class g extends Error{}function m(){const e=new WeakMap;return JSON.stringify(this,(function(t,n){if("object"==typeof n&&null!==n){if(e.has(n))return"(cycle)";e.set(n,!0)}if(n instanceof HTMLElement){const e=n.id?` id="${n.id}"`:"",t=n.classList.value?` class="${n.classList.value}"`:"";return`<${n.nodeName.toLowerCase()}${e}${t}>${n.hasChildNodes()?"...":""}</${n.nodeName.toLowerCase()}>`}if(!(this instanceof CSSStyleDeclaration)||isNaN(Number(t)))return n}))}class f{static async execute(e,t,{throwOnSideEffect:n}){const i=await t.evaluate({expression:e,replMode:!0,includeCommandLineAPI:!0,returnByValue:!1,silent:!1,generatePreview:!0,allowUnsafeEvalBlockedByCSP:!1,throwOnSideEffect:n},!1,!0);try{if(!i)throw new Error("Response is not found");if("error"in i)throw new p(i.error);if(i.exceptionDetails){const e=i.exceptionDetails.exception?.description;if(e?.startsWith("EvalError: Possible side-effect in debug-evaluate"))throw new g(e);throw new p(e||"JS exception")}return async function(e){switch(e.type){case"string":return`'${e.value}'`;case"bigint":return`${e.value}n`;case"boolean":case"number":return`${e.value}`;case"undefined":return"undefined";case"symbol":case"function":return`${e.description}`;case"object":{const t=await e.callFunction(m);if(!t.object||"string"!==t.object.type)throw new Error("Could not stringify the object"+e);return t.object.value}default:throw new Error("Unknown type to stringify "+e.type)}}(i.object)}finally{t.runtimeModel.releaseEvaluationResult(i)}}}const y=new CSSStyleSheet;y.replaceSync("*{box-sizing:border-box}.feedback{display:flex;flex-direction:column;gap:var(--sys-size-4);margin-top:var(--sys-size-4)}.feedback-header{display:flex;justify-content:space-between;align-items:center}.feedback-title{margin:0}.feedback-disclaimer{padding:0 var(--sys-size-4)}.vertical-separator{height:20px;width:1px;vertical-align:top;margin:0 var(--sys-size-2);background:var(--color-background-inverted);opacity:10%;display:inline-block}\n/*# sourceURL=./components/provideFeedback.css */\n");const b="Thumbs up",w="Thumbs down",v="Provide additional feedback",x="Feedback submitted will also include your conversation",S="Submit",k="Why did you choose this rating? (optional)",C="Close",E="Report legal issue",T=t.i18n.lockedString;class $ extends HTMLElement{static litTagName=s.literal`devtools-provide-feedback`;#e=this.attachShadow({mode:"open"});#t;#n=!1;#i;constructor(e){super(),this.#t=e}set props(e){this.#t=e,this.#s()}connectedCallback(){this.#e.adoptedStyleSheets=[y,i.textInputStyles],this.#s()}#o(e){this.#i!==e&&(this.#i=e,this.#n=this.#t.canShowFeedbackForm,this.#t.onFeedbackSubmit(this.#i),this.#s())}#a=()=>{this.#n=!1,this.#s()};#r=e=>{e.preventDefault();const t=this.#e.querySelector(".feedback-input");this.#i&&t&&t.value&&(this.#t.onFeedbackSubmit(this.#i,t.value),this.#n=!1,this.#s())};#l=()=>{e.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab("https://support.google.com/legal/troubleshooter/1114905?hl=en#ts=1115658%2C13380504")};#c(){return s.html`
      <${n.Button.Button.litTagName}
        .data=${{variant:"icon",size:"SMALL",iconName:"thumb-up",active:"POSITIVE"===this.#i,title:T(b),jslogContext:"thumbs-up"}}
        @click=${()=>this.#o("POSITIVE")}
      ></${n.Button.Button.litTagName}>
      <${n.Button.Button.litTagName}
        .data=${{variant:"icon",size:"SMALL",iconName:"thumb-down",active:"NEGATIVE"===this.#i,title:T(w),jslogContext:"thumbs-down"}}
        @click=${()=>this.#o("NEGATIVE")}
      ></${n.Button.Button.litTagName}>
      <div class="vertical-separator"></div>
      <${n.Button.Button.litTagName}
        .data=${{variant:"icon",size:"SMALL",title:T(E),iconName:"report",jslogContext:"report"}}
        @click=${this.#l}
      ></${n.Button.Button.litTagName}>
    `}#d(){return s.html`
      <form class="feedback" @submit=${this.#r}>
        <div class="feedback-header">
          <h4 class="feedback-title">${T(k)}</h4>
          <${n.Button.Button.litTagName}
            aria-label=${T(C)}
            @click=${this.#a}
            .data=${{variant:"icon",iconName:"cross",size:"SMALL",title:T(C),jslogContext:"close"}}
          ></${n.Button.Button.litTagName}>
        </div>
        <input
          type="text"
          class="devtools-text-input feedback-input"
          placeholder=${T(v)}
          jslog=${o.textField("feedback").track({keydown:"Enter"})}
        >
        <span class="feedback-disclaimer">${T(x)}</span>
        <${n.Button.Button.litTagName}
        aria-label=${T(S)}
        .data=${{type:"submit",variant:"outlined",size:"SMALL",title:T(S),jslogContext:"send"}}
        >${T(S)}</${n.Button.Button.litTagName}>
      </div>
    `}#s(){s.render(s.html`
        <div class="rate-buttons">
          ${this.#c()}
          ${this.#n?this.#d():s.nothing}
        </div>`,this.#e,{host:this})}}customElements.define("devtools-provide-feedback",$);const N="Fix this issue using JavaScript code execution";var A;async function I(e,{throwOnSideEffect:t}){const n=u.Context.Context.instance().flavor(h.Target.Target);if(!n)throw new Error("Target is not found for executing code");const i=n.model(h.ResourceTreeModel.ResourceTreeModel),s=n.model(h.RuntimeModel.RuntimeModel),o=n.pageAgent();if(!i?.mainFrame)throw new Error("Main frame is not found for executing code");const{executionContextId:a}=await o.invoke_createIsolatedWorld({frameId:i.mainFrame.id,worldName:"devtools_freestyler"}),r=s?.executionContext(a);if(!r)throw new Error("Execution context is not found for executing code");try{return await f.execute(e,r,{throwOnSideEffect:t})}catch(e){if(e instanceof p)return`Error: ${e.message}`;throw e}}!function(e){e.THOUGHT="thought",e.ACTION="action",e.ANSWER="answer",e.ERROR="error",e.QUERYING="querying"}(A||(A={}));class R{static buildRequest(t){const n=a.Settings.Settings.instance().getHostConfig();return{input:t.input,preamble:t.preamble,chat_history:t.chatHistory,client:e.AidaClient.CLIENT_NAME,options:{temperature:n.devToolsFreestylerDogfood?.temperature??0,model_id:n.devToolsFreestylerDogfood?.modelId??void 0},metadata:{disable_user_content_logging:!t.serverSideLoggingEnabled,string_session_id:t.sessionId},functionality_type:e.AidaClient.FunctionalityType.CHAT,client_feature:e.AidaClient.ClientFeature.CHROME_FREESTYLER}}static parseResponse(e){const t=e.split("\n");let n,i,s,o=0;for(;o<t.length;){const e=t[o].trim();if(e.startsWith("THOUGHT:")&&!n)n=e.substring(8).trim(),o++;else if(e.startsWith("ACTION")&&!i){const e=[];let n=o+1;for(;n<t.length&&"STOP"!==t[n].trim();)"js"!==t[n].trim()&&e.push(t[n]),n++;i=e.join("\n").replaceAll("```","").replaceAll("``","").trim(),o=n+1}else if(e.startsWith("ANSWER:")&&!s){const n=[e.substring(7).trim()];let i=o+1;for(;i<t.length;){const e=t[i].trim();if(e.startsWith("ACTION")||e.startsWith("OBSERVATION:")||e.startsWith("THOUGHT:"))break;n.push(t[i]),i++}s=n.join("\n").trim(),o=i}else o++}return s||n||i||(s=e),{thought:n,action:i,answer:s}}#h;#u=new Map;#p;#g;#m;#f;#y=crypto.randomUUID();constructor(e){this.#h=e.aidaClient,this.#m=e.execJs??I,this.#f=e.internalExecJs??I,this.#g=e.confirmSideEffect,this.#p=e.serverSideLoggingEnabled??!1}async#b(){await(this.#f?.("async function setInlineStyles(el, styles) {\n  for (const key of Object.keys(styles)) {\n    el.style[key] = styles[key];\n  }\n}",{throwOnSideEffect:!1}))}get#w(){return[...this.#u.values()].flat()}get chatHistoryForTesting(){return this.#w}async#v(t){let n,i="";for await(const s of this.#h.fetch(t))if(i=s.explanation,n=s.metadata.rpcGlobalId??n,s.metadata.attributionMetadata?.some((t=>t.attributionAction===e.AidaClient.RecitationAction.BLOCK)))throw new Error("Attribution action does not allow providing the response");return{response:i,rpcId:n}}async#x(e,{throwOnSideEffect:t,confirmExecJs:n,execJsDeniedMesssage:i}){const s=`{${e};((typeof data !== "undefined") ? data : undefined)}`;try{if(!await(n?.call(this,e)??Promise.resolve(!0)))throw new Error(i??"Code execution is not allowed");const o=await this.#m(s,{throwOnSideEffect:t});if(d.StringUtilities.countWtf8Bytes(o)>25e3)throw new Error("Output exceeded the maximum allowed length.");return o}catch(t){return t instanceof g?await this.#x(e,{throwOnSideEffect:!1,confirmExecJs:this.#g,execJsDeniedMesssage:t.message}):`Error: ${t.message}`}}#S=0;async*run(t,n={isFixQuery:!1}){await this.#b();const i="Sorry, I could not help you with this query.",s=[];t=`QUERY: ${t}`;const o=++this.#S;n.signal?.addEventListener("abort",(()=>{this.#u.delete(o)}));for(let a=0;a<10;a++){yield{step:A.QUERYING};const r=R.buildRequest({input:t,preamble:"You are a CSS debugging assistant integrated into Chrome DevTools.\nThe user selected a DOM element in the browser's DevTools and sends a CSS-related\nquery about the selected DOM element. You are going to answer to the query in these steps:\n* THOUGHT\n* ACTION\n* ANSWER\nUse THOUGHT to explain why you take the ACTION.\nUse ACTION to evaluate JavaScript code on the page to gather all the data needed to answer the query and put it inside the data variable - then return STOP.\nYou have access to a special $0 variable referencing the current element in the scope of the JavaScript code.\nOBSERVATION will be the result of running the JS code on the page.\nAfter that, you can answer the question with ANSWER or run another ACTION query.\nPlease run ACTION again if the information you received is not enough to answer the query.\nPlease answer only if you are sure about the answer. Otherwise, explain why you're not able to answer.\nWhen answering, remember to consider CSS concepts such as the CSS cascade, explicit and implicit stacking contexts and various CSS layout types.\nWhen answering, always consider MULTIPLE possible solutions.\n\nIf you need to set inline styles on an HTML element, always call the `async setInlineStyles(el: Element, styles: object)` function.\n\nExample:\nACTION\nconst data = {\n  color: window.getComputedStyle($0)['color'],\n  backgroundColor: window.getComputedStyle($0)['backgroundColor'],\n}\nSTOP\n\nExample session:\n\nQUERY: Why is this element centered in its container?\nTHOUGHT: Let's check the layout properties of the container.\nACTION\n/* COLLECT_INFORMATION_HERE */\nconst data = {\n  /* THE RESULT YOU ARE GOING TO USE AS INFORMATION */\n}\nSTOP\n\nYou will be called again with this:\nOBSERVATION\n/* OBJECT_CONTAINING_YOUR_DATA */\n\nYou then output:\nANSWER: The element is centered on the page because the parent is a flex container with justify-content set to center.\n\nThe example session ends here.",chatHistory:this.#u.size?this.#w:void 0,serverSideLoggingEnabled:this.#p,sessionId:this.#y});let l,c;try{const e=await this.#v(r);l=e.response,c=e.rpcId}catch(e){if(L("Error calling the AIDA API",e),n.signal?.aborted)break;yield{step:A.ERROR,text:i,rpcId:c};break}if(n.signal?.aborted)break;L(`Iteration: ${a}`,"Request",r,"Response",l),s.push({request:structuredClone(r),response:l});const d=this.#u.get(o)??[];this.#u.set(o,[...d,{text:t,entity:e.AidaClient.Entity.USER},{text:l,entity:e.AidaClient.Entity.SYSTEM}]);const{thought:h,action:u,answer:p}=R.parseResponse(l);if(!u){if(p){yield{step:A.ANSWER,text:p,rpcId:c};break}yield{step:A.ERROR,text:i,rpcId:c};break}{h&&(yield{step:A.THOUGHT,text:h,rpcId:c}),L(`Action to execute: ${u}`);const e=await this.#x(u,{throwOnSideEffect:!n.isFixQuery});L(`Action result: ${e}`),yield{step:A.ACTION,code:u,output:e,rpcId:c},t=`OBSERVATION: ${e}`}9===a&&(yield{step:A.ERROR,text:"Max steps reached, please try again."})}O()&&(localStorage.setItem("freestylerStructuredLog",JSON.stringify(s)),window.dispatchEvent(new CustomEvent("freestylerdone")))}}function O(){return Boolean(localStorage.getItem("debugFreestylerEnabled"))}function L(...e){O()&&console.log(...e)}globalThis.setDebugFreestylerEnabled=function(e){e?localStorage.setItem("debugFreestylerEnabled","true"):localStorage.removeItem("debugFreestylerEnabled")};const B=new CSSStyleSheet;B.replaceSync("*{box-sizing:border-box;margin:0;padding:0}:host{width:100%;height:100%;user-select:text;display:flex;flex-direction:column;background-color:var(--sys-color-cdt-base-container)}.chat-ui{width:100%;height:100%;max-height:100%;display:flex;flex-direction:column}.input-form{display:flex;flex-direction:column;padding:var(--sys-size-8) var(--sys-size-4) 0 var(--sys-size-4);max-width:720px;width:100%;margin:0 auto}.chat-input-container{margin:var(--sys-size-3) 0;padding:0 2px;border-radius:4px;border:1px solid var(--sys-color-neutral-outline);width:100%;display:flex;background-color:var(--sys-color-cdt-base-container)}.chat-input{border:0;height:var(--sys-size-11);padding:0 6px;flex-grow:1;color:var(--sys-color-on-surface);background-color:var(--sys-color-cdt-base-container)}.chat-input:focus-visible{outline:none}.chat-input-container:has(.chat-input:focus-visible){outline:1px solid var(--sys-color-primary)}.chat-input::placeholder{color:var(--sys-color-state-disabled)}.chat-input-disclaimer{text-align:center;color:var(--sys-color-on-surface-subtle);margin-bottom:var(--sys-size-4)}.messages-container{margin:var(--sys-size-6) auto 0 auto;max-width:720px;padding:0 var(--sys-size-4)}.messages-scroll-container{overflow:overlay;flex-grow:1}.chat-message{user-select:text;cursor:initial;width:fit-content;padding:8px var(--sys-size-8);font-size:12px;border-radius:var(--sys-size-6);word-break:break-word;&:not(:first-of-type){margin-top:var(--sys-size-6)}&.query{max-width:320px;color:var(--sys-color-on-surface);background:var(--sys-color-surface2);margin-left:auto}&.answer{max-width:440px;color:var(--sys-color-on-surface);background:var(--sys-color-surface2)}& .chat-loading{margin:4px 0;padding:4px 0}& .actions{display:flex;gap:var(--sys-size-8);justify-content:space-between;align-items:flex-end}}.input-header{display:inline-flex;align-items:center;justify-content:space-between;margin-bottom:2px;line-height:20px;& .feedback-icon{width:var(--sys-size-8);height:var(--sys-size-8)}& .header-link-container{display:inline-flex;align-items:center;gap:var(--sys-size-2)}}.link{color:var(--text-link);text-decoration:underline}.select-an-element-text{margin-left:2px}.empty-state-container{display:flex;flex-direction:column;width:100%;height:100%;align-items:center;justify-content:center;gap:4px;font-size:16px;opacity:70%}.action-result{margin:8px 0}.js-code-output{margin-top:-8px;white-space:pre;max-width:100%;overflow:auto;scrollbar-width:none;padding:4px 6px;background-color:var(--sys-color-surface3);color:var(--sys-color-on-surface);font-size:10px;font-family:var(--source-code-font-family)}.error-step{color:var(--sys-color-error)}.side-effect-confirmation{background:var(--color-background);padding:24px;border-radius:var(--sys-size-6);margin-bottom:8px;p{margin:0;margin-bottom:12px;padding:0}}.side-effect-buttons-container{margin-top:8px;devtools-button{margin-top:4px}}.consent-view{padding:24px;text-wrap:pretty;.accept-button{margin-top:8px}ul{padding:0 13px}h2{font-weight:500}}\n/*# sourceURL=./components/freestylerChatUi.css */\n");const F="https://goo.gle/freestyler-dogfood",M="Ask a question about the selected element",j="Chat messages and data from this page will be sent to Google, reviewed by humans, and used to improve the feature. Do not use on pages with personal or sensitive information. AI assistant may display inaccurate information.",U="Send",_="Cancel",H="Select an element",P="How can I help you?",D="This feature is only available when you sign into Chrome with your Google account",z="This feature requires you to turn on Chrome sync",V="Check your internet connection and try again",W="Things to consider",q="Accept",J="This feature uses AI and might produce inaccurate information.",G="Your inputs and the information from the page you are using this feature for are sent to Google.",Y="Do not use on pages with personal or sensitive information.",Q="Data may be seen by human reviewers and can be used to improve this feature.",K="The code contains side effects. Do you wish to continue?",X="Execute",Z="Cancel",ee="Dogfood",te="Send feedback",ne="Fix this issue",ie=t.i18n.lockedString;class se extends c.MarkdownView.MarkdownInsightRenderer{templateForToken(e){if("code"===e.type){const t=e.text.split("\n");"css"===t[0]?.trim()&&(e.lang="css",e.text=t.slice(1).join("\n"))}return super.templateForToken(e)}}class oe extends HTMLElement{static litTagName=s.literal`devtools-freestyler-chat-ui`;#e=this.attachShadow({mode:"open"});#k=new se;#t;constructor(e){super(),this.#t=e}set props(e){this.#t=e,this.#s()}connectedCallback(){this.#e.adoptedStyleSheets=[B],this.#s()}focusTextInput(){const e=this.#e.querySelector(".chat-input");e&&e.focus()}scrollToLastMessage(){const e=this.#e.querySelector(".chat-message:last-child");e&&e.scrollIntoViewIfNeeded()}#r=e=>{e.preventDefault();const t=this.#e.querySelector(".chat-input");t&&t.value&&(this.#t.onTextSubmit(t.value),t.value="")};#C=e=>{e.preventDefault(),this.#t.isLoading&&this.#t.onCancelClick()};#E(e){return s.html`<${$.litTagName}
      .props=${{onFeedbackSubmit:(t,n)=>{this.#t.onFeedbackSubmit(e,t,n)},canShowFeedbackForm:this.#t.canShowFeedbackForm}}
      ></${$.litTagName}>`}#T(e){let t=[];try{t=r.Marked.lexer(e);for(const e of t)this.#k.renderToken(e)}catch(t){return s.html`${e}`}return s.html`<${c.MarkdownView.MarkdownView.litTagName}
      .data=${{tokens:t,renderer:this.#k}}>
    </${c.MarkdownView.MarkdownView.litTagName}>`}#$(e){return e.step===A.ACTION?s.html`
        <div class="action-result">
          <${c.CodeBlock.CodeBlock.litTagName}
            .code=${e.code.trim()}
            .codeLang=${"js"}
            .displayToolbar=${!1}
            .displayNotice=${!0}
          ></${c.CodeBlock.CodeBlock.litTagName}>
          <div class="js-code-output">${e.output}</div>
        </div>
      `:e.step===A.ERROR?s.html`<p class="error-step">${this.#T(e.text)}</p>`:s.html`<p>${this.#T(e.text)}</p>`}#N(e){return s.html`<div
      class="side-effect-confirmation"
      jslog=${o.section("side-effect-confirmation")}
    >
      <p>${ie(K)}</p>
      <${c.CodeBlock.CodeBlock.litTagName}
        .code=${e.code}
        .codeLang=${"js"}
        .displayToolbar=${!1}
      ></${c.CodeBlock.CodeBlock.litTagName}>
      <div class="side-effect-buttons-container">
        <${n.Button.Button.litTagName}
          .data=${{variant:"primary",jslogContext:"accept-execute-code"}}
          @click=${()=>e.onAnswer(!0)}
          >${ie(X)}</${n.Button.Button.litTagName}>
        <${n.Button.Button.litTagName}
          .data=${{variant:"outlined",jslogContext:"decline-execute-code"}}
          @click=${()=>e.onAnswer(!1)}
        >${ie(Z)}</${n.Button.Button.litTagName}>
      </div>
    </div>`}#A=(e,{isLast:t})=>{if("user"===e.entity)return s.html`<div class="chat-message query" jslog=${o.section("question")}>${e.text}</div>`;const i=!this.#t.isLoading&&t&&e.suggestingFix,a=!t||!this.#t.confirmSideEffectDialog&&t,r=this.#t.isLoading&&t&&!this.#t.confirmSideEffectDialog;return s.html`
      <div class="chat-message answer" jslog=${o.section("answer")}>
        ${e.steps.map((e=>this.#$(e)))}
        ${this.#t.confirmSideEffectDialog&&t?this.#N(this.#t.confirmSideEffectDialog):s.nothing}
        <div class="actions">
          ${a&&void 0!==e.rpcId?this.#E(e.rpcId):s.nothing}
          ${i?s.html`<${n.Button.Button.litTagName}
                  .data=${{variant:"outlined",jslogContext:"fix-this-issue"}}
                  @click=${this.#t.onFixThisIssueClick}
                >${ie(ne)}</${n.Button.Button.litTagName}>`:s.nothing}
        </div>
        ${r?s.html`<div class="chat-loading">Loading...</div>`:s.nothing}
      </div>
    `};#I=()=>{const e={size:"SMALL",iconName:"select-element",toggledIconName:"select-element",toggleType:"primary-toggle",toggled:this.#t.inspectElementToggled,title:ie(H),jslogContext:"select-element"};return this.#t.selectedNode?s.html`
        <${n.Button.Button.litTagName}
          .data=${{variant:"icon_toggle",...e}}
          @click=${this.#t.onInspectElementClick}
        ></${n.Button.Button.litTagName}>
        ${s.Directives.until(a.Linkifier.Linkifier.linkify(this.#t.selectedNode))}`:s.html`
        <${n.Button.Button.litTagName}
          .data=${{variant:"text",...e}}
          @click=${this.#t.onInspectElementClick}
        ><span class="select-an-element-text">${ie(H)}</span></${n.Button.Button.litTagName}>`};#R=()=>s.html`
        <${l.Icon.Icon.litTagName}
          name="dog-paw"
          class="feedback-icon"
        ></${l.Icon.Icon.litTagName}>
        <span>${ie(ee)}</span>
        <span>-</span>
        <x-link href=${"https://goo.gle/freestyler-feedback"}
          class="link"
          jslog=${o.link("freestyler.feedback").track({click:!0})}>${ie(te)}</x-link>`;#O=()=>s.html`
      <div class="messages-scroll-container">
        <div class="messages-container">
          ${this.#t.messages.map(((e,t,n)=>this.#A(e,{isLast:n.at(-1)===e})))}
        </div>
      </div>
    `;#L=()=>s.html`<div class="empty-state-container">
      <${l.Icon.Icon.litTagName} name="spark" style="width: 36px; height: 36px;"></${l.Icon.Icon.litTagName}>
      ${ie(P)}
    </div>`;#B=()=>{const e="available"===this.#t.aidaAvailability,t=!Boolean(this.#t.selectedNode)||!e||Boolean(this.#t.confirmSideEffectDialog);return s.html`
      <div class="chat-ui">
        ${this.#t.messages.length>0?this.#O():this.#L()}
        <form class="input-form" @submit=${this.#r}>
          <div class="input-header">
            <div class="header-link-container">
              ${this.#I()}
            </div>
            <div class="header-link-container">
              ${this.#R()}
            </div>
          </div>
          <div class="chat-input-container">
            <input type="text" class="chat-input" .disabled=${t}
              placeholder=${function(e){switch(e){case"available":return ie(M);case"no-account-email":return ie(D);case"no-active-sync":return ie(z);case"no-internet":return ie(V)}}(this.#t.aidaAvailability)}
              jslog=${o.textField("query").track({keydown:"Enter"})}
            >${this.#t.isLoading?s.html`
                    <${n.Button.Button.litTagName}
                      class="step-actions"
                      aria-label=${ie(_)}
                      @click=${this.#C}
                      .data=${{variant:"primary",size:"SMALL",disabled:t,iconName:"stop",title:ie(_),jslogContext:"stop"}}
                    ></${n.Button.Button.litTagName}>`:s.html`
                    <${n.Button.Button.litTagName}
                      class="step-actions"
                      aria-label=${ie(U)}
                      .data=${{type:"submit",variant:"icon",size:"SMALL",disabled:t,iconName:"send",title:ie(U),jslogContext:"send"}}
                    ></${n.Button.Button.litTagName}>`}
          </div>
          <span class="chat-input-disclaimer">${ie(j)} See <x-link
              class="link"
              href=${F}
              jslog=${o.link("freestyler.dogfood-info").track({click:!0})}
            >dogfood terms</x-link>.</span>
        </form>
      </div>
    `};#F=()=>s.html`
      <div class="consent-view">
        <h2 tabindex="-1">
          ${ie(W)}
        </h2>
        <main>
          ${ie(J)}
          <ul>
            <li>${ie(G)}</li>
            <li>${ie(Q)}</li>
            <li>${ie(Y)}</li>
            <li>See <x-link
              class="link"
              href=${F}
              jslog=${o.link("freestyler.dogfood-info").track({click:!0})}
            >dogfood terms</x-link>.</li>
          </ul>
          <${n.Button.Button.litTagName}
            class="accept-button"
            @click=${this.#t.onAcceptConsentClick}
            .data=${{variant:"primary",jslogContext:"accept"}}
          >${ie(q)}</${n.Button.Button.litTagName}>
        </main>
      </div>
    `;#s(){switch(this.#t.state){case"chat-view":s.render(this.#B(),this.#e,{host:this});break;case"consent-view":s.render(this.#F(),this.#e,{host:this})}}}const ae={MarkdownRendererWithCodeBlock:se};customElements.define("devtools-freestyler-chat-ui",oe);const re=new CSSStyleSheet;re.replaceSync(".freestyler-toolbar-container{display:flex;background-color:var(--sys-color-cdt-base-container);border-bottom:1px solid var(--sys-color-divider);flex:0 0 auto;justify-content:space-between}.freestyler-chat-ui-container{display:flex;flex-direction:column;width:100%;height:100%;align-items:center;overflow:hidden}\n/*# sourceURL=./freestylerPanel.css */\n");const le="Clear messages",ce="Send feedback",de="You stopped this response",he=t.i18n.lockedString;function ue(e,t,n){s.render(s.html`
    <${oe.litTagName} .props=${e} ${s.Directives.ref((e=>{e&&e instanceof oe&&(t.freestylerChatUi=e)}))}></${oe.litTagName}>
  `,n,{host:e})}let pe;class ge extends u.Panel.Panel{view;static panelName="freestyler";#M;#j;#U;#h;#_;#H;#P={};#p=function(){return"true"===localStorage.getItem("freestyler_enableServerSideLogging")}();#D=a.Settings.Settings.instance().createLocalSetting("freestyler-dogfood-consent-onboarding-finished",!1);constructor(t=ue,{aidaClient:n,aidaAvailability:i}){super(ge.panelName),this.view=t,function(t,{onClearClick:n}){const i=t.createChild("div","freestyler-toolbar-container"),s=new u.Toolbar.Toolbar("",i),o=new u.Toolbar.Toolbar("freestyler-right-toolbar",i),a=new u.Toolbar.ToolbarButton(he(le),"clear",void 0,"freestyler.clear");a.addEventListener("Click",n),s.appendToolbarItem(a),o.appendSeparator();const r=new u.Toolbar.ToolbarButton(he(ce),"help",void 0,"freestyler.feedback");r.addEventListener("Click",(()=>{e.InspectorFrontendHost.InspectorFrontendHostInstance.openInNewTab(F)})),o.appendToolbarItem(r)}(this.contentElement,{onClearClick:this.#z.bind(this)}),this.#M=u.ActionRegistry.ActionRegistry.instance().getAction("elements.toggle-element-search"),this.#h=n,this.#U=this.contentElement.createChild("div","freestyler-chat-ui-container"),this.#j=u.Context.Context.instance().flavor(h.DOMModel.DOMNode),this.#H={state:this.#D.get()?"chat-view":"consent-view",aidaAvailability:i,messages:[],inspectElementToggled:this.#M.toggled(),selectedNode:this.#j,isLoading:!1,onTextSubmit:this.#V.bind(this),onInspectElementClick:this.#W.bind(this),onFeedbackSubmit:this.#q.bind(this),onAcceptConsentClick:this.#J.bind(this),onCancelClick:this.#G.bind(this),onFixThisIssueClick:()=>{this.#V(N,!0)},canShowFeedbackForm:this.#p},this.#M.addEventListener("Toggled",(e=>{this.#H.inspectElementToggled=e.data,this.doUpdate()})),this.#_=this.#Y(),u.Context.Context.instance().addFlavorChangeListener(h.DOMModel.DOMNode,(e=>{this.#H.selectedNode!==e.data&&(this.#H.selectedNode=e.data,this.doUpdate())})),this.doUpdate()}#Y(){return new R({aidaClient:this.#h,serverSideLoggingEnabled:this.#p,confirmSideEffect:this.showConfirmSideEffectUi.bind(this)})}static async instance(t={forceNew:null}){const{forceNew:n}=t;if(!pe||n){const t=await e.AidaClient.AidaClient.checkAccessPreconditions(),n=new e.AidaClient.AidaClient;pe=new ge(ue,{aidaClient:n,aidaAvailability:t})}return pe}wasShown(){this.registerCSSFiles([re]),this.#P.freestylerChatUi?.focusTextInput()}doUpdate(){this.view(this.#H,this.#P,this.#U)}async showConfirmSideEffectUi(e){const t=d.PromiseUtilities.promiseWithResolvers();this.#H.confirmSideEffectDialog={code:e,onAnswer:e=>t.resolve(e)},this.doUpdate();const n=await t.promise;return this.#H.confirmSideEffectDialog=void 0,this.doUpdate(),n}#W(){this.#M.execute()}#q(e,t,n){this.#h.registerClientEvent({corresponding_aida_rpc_global_id:e,disable_user_content_logging:!this.#p,do_conversation_client_event:{user_feedback:{sentiment:t,user_input:{comment:n}}}})}#J(){this.#D.set(!0),this.#H.state="chat-view",this.doUpdate()}handleAction(t){switch(t){case"freestyler.element-panel-context":e.userMetrics.actionTaken(e.UserMetrics.Action.FreestylerOpenedFromElementsPanel),this.doUpdate();break;case"freestyler.style-tab-context":e.userMetrics.actionTaken(e.UserMetrics.Action.FreestylerOpenedFromStylesTab),this.doUpdate()}}#z(){this.#H.messages=[],this.#H.isLoading=!1,this.#H.confirmSideEffectDialog=void 0,this.#_=this.#Y(),this.#G(),this.doUpdate()}#Q=new AbortController;#G(){this.#Q.abort(),this.#Q=new AbortController,this.#H.isLoading=!1,this.doUpdate()}async#V(e,t=!1){this.#H.messages.push({entity:"user",text:e}),this.#H.isLoading=!0;const n=!t;let i={entity:"model",suggestingFix:n,steps:[]};this.doUpdate(),this.#Q=new AbortController;const s=this.#Q.signal;s.addEventListener("abort",(()=>{i.rpcId=void 0,i.suggestingFix=!1,i.steps.push({step:A.ERROR,text:he(de)})}));for await(const o of this.#_.run(e,{signal:s,isFixQuery:t}))o.step!==A.QUERYING?(o.step!==A.ANSWER&&o.step!==A.ERROR||(this.#H.isLoading=!1),o.step===A.ERROR&&(i.suggestingFix=!1),i.rpcId=o.rpcId,i.steps.push(o),this.doUpdate(),this.#P.freestylerChatUi?.scrollToLastMessage()):(i={entity:"model",suggestingFix:n,steps:[]},this.#H.messages.push(i),this.doUpdate(),this.#P.freestylerChatUi?.scrollToLastMessage())}}class me{handleAction(e,t){switch(t){case"freestyler.element-panel-context":case"freestyler.style-tab-context":return(async()=>{const e=u.ViewManager.ViewManager.instance().view(ge.panelName);if(e){await u.ViewManager.ViewManager.instance().showView(ge.panelName);(await e.widget()).handleAction(t)}})(),!0}return!1}}globalThis.setFreestylerServerSideLoggingEnabled=function(e){e?localStorage.setItem("freestyler_enableServerSideLogging","true"):localStorage.removeItem("freestyler_enableServerSideLogging")};export{me as ActionDelegate,F as DOGFOOD_INFO,p as ExecutionError,N as FIX_THIS_ISSUE_PROMPT,ae as FOR_TEST,R as FreestylerAgent,oe as FreestylerChatUi,f as FreestylerEvaluateAction,ge as FreestylerPanel,$ as ProvideFeedback,g as SideEffectError,A as Step};
