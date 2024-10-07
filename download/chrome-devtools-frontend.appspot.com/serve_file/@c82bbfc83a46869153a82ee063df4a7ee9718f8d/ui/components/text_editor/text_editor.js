import*as t from"../../../core/common/common.js";import*as e from"../../../core/i18n/i18n.js";import*as o from"../../../models/text_utils/text_utils.js";import*as n from"../../../services/window_bounds/window_bounds.js";import*as i from"../../../third_party/codemirror.next/codemirror.next.js";import*as r from"../../legacy/legacy.js";import*as s from"../../visual_logging/visual_logging.js";import*as a from"../code_highlighter/code_highlighter.js";import*as c from"../icon_button/icon_button.js";import*as l from"../../../core/sdk/sdk.js";import*as d from"../../../models/bindings/bindings.js";import*as u from"../../../models/javascript_metadata/javascript_metadata.js";import*as p from"../../../models/source_map_scopes/source_map_scopes.js";import*as m from"../../legacy/theme_support/theme_support.js";import*as h from"../../lit-html/lit-html.js";class f{static#t=300;#e;#o=[];#n=1;#i=!1;constructor(t){this.#e=t,this.#o=this.#e.get()}clear(){this.#o=[],this.#e.set([]),this.#n=1}length(){return this.#o.length}pushHistoryItem(t){this.#i&&(this.#o.pop(),this.#i=!1),this.#n=1,t!==this.#r()&&this.#o.push(t),this.#s()}#a(t){this.#i&&this.#o.pop(),this.#i=!0,this.#o.push(t)}previous(t){if(!(this.#n>this.#o.length))return 1===this.#n&&this.#a(t),++this.#n,this.#r()}next(){if(1!==this.#n)return--this.#n,this.#r()}matchingEntries(t,e=50){const o=new Set;for(let n=this.#o.length-1;n>=0&&o.size<e;--n){const e=this.#o[n];e.startsWith(t)&&o.add(e)}return o}#r(){return this.#o[this.#o.length-this.#n]}#s(){this.#e.set(this.#o.slice(-f.#t))}}var g=Object.freeze({__proto__:null,AutocompleteHistory:f});const y=i.EditorView.theme({"&.cm-editor":{color:"color: var(--sys-color-on-subtle)",cursor:"auto","&.cm-focused":{outline:"none"}},".cm-scroller":{lineHeight:"1.4em",fontFamily:"var(--source-code-font-family)",fontSize:"var(--source-code-font-size)"},".cm-content":{lineHeight:"1.4em"},".cm-panels":{backgroundColor:"var(--sys-color-cdt-base-container)"},".cm-panels-bottom":{borderTop:"1px solid var(--sys-color-divider)"},".cm-selectionMatch":{backgroundColor:"var(--sys-color-yellow-container)"},".cm-cursor":{borderLeft:"1px solid var(--sys-color-inverse-surface)"},"&.cm-readonly .cm-cursor":{display:"none"},".cm-cursor-secondary":{borderLeft:"1px solid var(--sys-color-neutral-outline)"},"&.cm-focused > .cm-scroller > .cm-selectionLayer .cm-selectionBackground":{background:"var(--sys-color-tonal-container)"},".cm-selectionBackground":{background:"var(--sys-color-neutral-container)"},".cm-gutters":{borderRight:"none",whiteSpace:"nowrap",backgroundColor:"var(--sys-color-cdt-base-container)"},".cm-gutters .cm-foldGutterElement":{cursor:"pointer",opacity:"0%",transition:"opacity 0.2s"},".cm-gutters .cm-foldGutterElement-folded, .cm-gutters:hover .cm-foldGutterElement":{opacity:"100%"},".cm-lineNumbers":{overflow:"visible",minWidth:"40px"},".cm-lineNumbers .cm-gutterElement":{color:"var(--sys-color-outline)",padding:"0 3px 0 9px"},".cm-foldPlaceholder":{background:"transparent",border:"none",color:"var(--sys-color-token-subtle)"},".cm-matchingBracket, .cm-nonmatchingBracket":{background:"transparent",borderBottom:"none"},"&:focus-within .cm-matchingBracket":{color:"inherit",backgroundColor:"var(--sys-color-surface-variant)",borderBottom:"1px solid var(--sys-color-outline)"},"&:focus-within .cm-nonmatchingBracket":{backgroundColor:"var(--sys-color-error-container)",borderBottom:"1px solid var(--sys-color-error)"},".cm-trailingWhitespace":{backgroundColor:"var(--sys-color-error-container)"},".cm-highlightedTab":{display:"inline-block",position:"relative","&:before":{content:'""',borderBottom:"1px solid var(--sys-color-token-subtle)",position:"absolute",left:"5%",bottom:"50%",width:"90%",pointerEvents:"none"}},".cm-highlightedSpaces:before":{color:"var(--sys-color-token-subtle)",content:"attr(data-display)",position:"absolute",pointerEvents:"none"},".cm-placeholder":{color:"var(--sys-color-token-subtle)"},".cm-completionHint":{color:"var(--sys-color-token-subtle)"},".cm-tooltip":{boxShadow:"var(--drop-shadow)",backgroundColor:"var(--sys-color-neutral-container)"},".cm-argumentHints":{pointerEvents:"none",padding:"0 4px",whiteSpace:"nowrap",lineHeight:"20px",marginBottom:"4px",width:"fit-content"},".cm-tooltip.cm-tooltip-autocomplete > ul":{backgroundColor:"var(--sys-color-cdt-base-container)",maxHeight:"25em",minWidth:"16em","& > li":{display:"flex",justifyContent:"space-between",border:"1px solid var(--sys-color-cdt-base-container)"},"& > li.cm-secondaryCompletion":{display:"flex",backgroundColor:"var(--sys-color-neutral-container)",borderColor:"var(--sys-color-neutral-container)",justifyContent:"space-between","&::before":{content:'">"',fontWeight:"bold",color:"var(--sys-color-primary-bright)",marginRight:"5px"}},"& > li:hover":{backgroundColor:"var(--sys-color-state-hover-on-subtle)"},"& > li[aria-selected]":{backgroundColor:"var(--sys-color-tonal-container)",borderColor:"var(--sys-color-tonal-container)","&, &.cm-secondaryCompletion::before":{color:"var(--sys-color-on-tonal-container)"},"&::after":{content:'"tab"',color:"var(--sys-color-primary-bright)",border:"1px solid var(--sys-color-primary-bright)",borderRadius:"2px",marginLeft:"5px",padding:"1px 3px",fontSize:"10px",lineHeight:"10px"}}},".cm-tooltip.cm-tooltip-autocomplete.cm-conservativeCompletion > ul > li[aria-selected]":{backgroundColor:"var(--sys-color-cdt-base-container)",border:"1px dotted var(--sys-color-on-surface)","&, &.cm-secondaryCompletion::before":{color:"var(--sys-color-on-surface)"},"&::after":{border:"1px solid var(--sys-color-neutral-outline)",color:"var(--sys-color-token-subtle)"}},".cm-completionMatchedText":{textDecoration:"none",fontWeight:"bold"},".cm-highlightedLine":{animation:"cm-fading-highlight 2s 0s"},"@keyframes cm-fading-highlight":{from:{backgroundColor:"var(--sys-color-yellow-container)"},to:{backgroundColor:"transparent"}}}),b={codeEditor:"Code editor",sSuggestionSOfS:"{PH1}, suggestion {PH2} of {PH3}"},v=e.i18n.registerUIStrings("ui/components/text_editor/config.ts",b),w=e.i18n.getLocalizedString.bind(void 0,v),x=[],S=i.Facet.define();class C{settingName;getExtension;compartment=new i.Compartment;constructor(t,e){this.settingName=t,this.getExtension=e}settingValue(){return t.Settings.Settings.instance().moduleSetting(this.settingName).get()}instance(){return[this.compartment.of(this.getExtension(this.settingValue())),S.of(this)]}sync(t,e){const o=this.compartment.get(t),n=this.getExtension(e);return o===n?null:this.compartment.reconfigure(n)}static bool(t,e,o=x){return new C(t,(t=>t?e:o))}static none=[]}const E=C.bool("text-editor-tab-moves-focus",[],i.keymap.of([{key:"Tab",run:t=>!!t.state.doc.length&&i.indentMore(t),shift:t=>!!t.state.doc.length&&i.indentLess(t)}])),k=i.StateEffect.define(),M=i.StateField.define({create:()=>!0,update:(t,e)=>"active"!==i.completionStatus(e.state)||(i.selectedCompletionIndex(e.startState)??0)===(i.selectedCompletionIndex(e.state)??0)&&!e.effects.some((t=>t.is(k)))&&t});function T(t){return!t.state.field(M,!1)&&i.acceptCompletion(t)}function D(t){const e=t.state.selection.main.head,o=t.state.doc.lineAt(e);return!!(e-o.from>=o.length)&&i.acceptCompletion(t)}function j(t,e="option"){return o=>{if("active"!==i.completionStatus(o.state))return!1;if(o.state.field(M,!1))return o.dispatch({effects:k.of(null)}),O(o),!0;const n=i.moveCompletionSelection(t,e)(o);return O(o),n}}function L(){return t=>"active"===i.completionStatus(t.state)&&(i.moveCompletionSelection(!1)(t),O(t),!0)}function O(t){const e=w(b.sSuggestionSOfS,{PH1:i.selectedCompletion(t.state)?.label||"",PH2:(i.selectedCompletionIndex(t.state)||0)+1,PH3:i.currentCompletions(t.state).length});r.ARIAUtils.alert(e)}const P=new C("text-editor-autocompletion",(t=>[i.autocompletion({activateOnTyping:t,icons:!1,optionClass:t=>"secondary"===t.type?"cm-secondaryCompletion":"",tooltipClass:t=>t.field(M,!1)?"cm-conservativeCompletion":"",defaultKeymap:!1,updateSyncTime:100}),i.Prec.highest(i.keymap.of([{key:"End",run:D},{key:"ArrowRight",run:D},{key:"Ctrl-Space",run:i.startCompletion},{key:"Escape",run:i.closeCompletion},{key:"ArrowDown",run:j(!0)},{key:"ArrowUp",run:L()},{mac:"Ctrl-n",run:j(!0)},{mac:"Ctrl-p",run:L()},{key:"PageDown",run:i.moveCompletionSelection(!0,"page")},{key:"PageUp",run:i.moveCompletionSelection(!1,"page")},{key:"Enter",run:T}]))])),_=C.bool("text-editor-bracket-matching",i.bracketMatching()),I=C.bool("text-editor-code-folding",[i.foldGutter({markerDOM(t){const e=t?"triangle-down":"triangle-right",o=new c.Icon.Icon;return o.setAttribute("class",t?"cm-foldGutterElement":"cm-foldGutterElement cm-foldGutterElement-folded"),o.setAttribute("jslog",`${s.expand().track({click:!0})}`),o.data={iconName:e,color:"var(--icon-fold-marker)",width:"14px",height:"14px"},o}}),i.keymap.of(i.foldKeymap)]),H=i.Prec.highest(i.indentUnit.compute([],(e=>{const n=e.doc.iterLines(1,Math.min(e.doc.lines+1,1e3));return o.TextUtils.detectIndentation(n)??t.Settings.Settings.instance().moduleSetting("text-editor-indent").get()}))),N=C.bool("text-editor-auto-detect-indent",H);function A(t){return i.ViewPlugin.define((e=>({decorations:t.createDeco(e),update(e){this.decorations=t.updateDeco(e,this.decorations)}})),{decorations:t=>t.decorations})}const B=new Map;const R=A(new i.MatchDecorator({regexp:/\t| +/g,decoration:t=>function(t){const e=B.get(t);if(e)return e;const o=i.Decoration.mark({attributes:"\t"===t?{class:"cm-highlightedTab"}:{class:"cm-highlightedSpaces","data-display":"·".repeat(t.length)}});return B.set(t,o),o}(t[0]),boundary:/\S/})),z=A(new i.MatchDecorator({regexp:/\s+$/g,decoration:i.Decoration.mark({class:"cm-trailingWhitespace"}),boundary:/\S/})),F=new C("show-whitespaces-in-editor",(t=>"all"===t?R:"trailing"===t?z:x)),W=C.bool("allow-scroll-past-eof",i.scrollPastEnd()),V=Object.create(null);const $=new C("text-editor-indent",(function(t){let e=V[t];return e||(e=V[t]=i.indentUnit.of(t)),e})),U=C.bool("dom-word-wrap",i.EditorView.lineWrapping);function G(t){return/\r\n/.test(t)&&!/(^|[^\r])\n/.test(t)?i.EditorState.lineSeparator.of("\r\n"):[]}const K=i.keymap.of([{key:"Tab",run:i.acceptCompletion},{key:"Ctrl-m",run:i.cursorMatchingBracket,shift:i.selectMatchingBracket},{key:"Mod-/",run:i.toggleComment},{key:"Mod-d",run:i.selectNextOccurrence},{key:"Alt-ArrowLeft",mac:"Ctrl-ArrowLeft",run:i.cursorSyntaxLeft,shift:i.selectSyntaxLeft},{key:"Alt-ArrowRight",mac:"Ctrl-ArrowRight",run:i.cursorSyntaxRight,shift:i.selectSyntaxRight},{key:"Ctrl-ArrowLeft",mac:"Alt-ArrowLeft",run:i.cursorGroupLeft,shift:i.selectGroupLeft},{key:"Ctrl-ArrowRight",mac:"Alt-ArrowRight",run:i.cursorGroupRight,shift:i.selectGroupRight},...i.standardKeymap,...i.historyKeymap]);function J(){const e=t.Settings.Settings.instance().moduleSetting("ui-theme").get();return"systemPreferred"===e?window.matchMedia("(prefers-color-scheme: dark)").matches:"dark"===e}const q=i.EditorView.theme({},{dark:!0}),Q=new i.Compartment;function X(){return[y,J()?Q.of(q):Q.of([])]}let Y=null;function Z(){return Y||(Y=n.WindowBoundsService.WindowBoundsServiceImpl.instance().getDevToolsBoundingElement()),Y.getBoundingClientRect()}function tt(t){return[X(),i.highlightSpecialChars(),i.highlightSelectionMatches(),i.history(),i.drawSelection(),i.EditorState.allowMultipleSelections.of(!0),i.indentOnInput(),i.syntaxHighlighting(a.CodeHighlighter.highlightStyle),K,i.EditorView.clickAddsSelectionRange.of((t=>t.altKey||t.ctrlKey)),E.instance(),_.instance(),$.instance(),i.Prec.lowest(i.EditorView.contentAttributes.of({"aria-label":w(b.codeEditor)})),t instanceof i.Text?[]:G(t),i.tooltips({parent:nt(),tooltipSpace:Z}),i.bidiIsolates()]}const et=C.bool("text-editor-bracket-closing",[i.html.autoCloseTags,i.closeBrackets(),i.keymap.of(i.closeBracketsKeymap)]);let ot=null;function nt(){if(!ot){const t=i.EditorState.create({extensions:[y,J()?q:[],i.syntaxHighlighting(a.CodeHighlighter.highlightStyle),i.showTooltip.of({pos:0,create:()=>({dom:document.createElement("div")})})]}).facet(i.EditorView.styleModule),e=document.body.appendChild(document.createElement("div"));e.className="editor-tooltip-host",ot=e.attachShadow({mode:"open"}),i.StyleModule.mount(ot,t)}return ot}class it extends i.WidgetType{text;constructor(t){super(),this.text=t}eq(t){return this.text===t.text}toDOM(){const t=document.createElement("span");return t.className="cm-completionHint",t.textContent=this.text,t}}const rt=i.ViewPlugin.fromClass(class{decorations=i.Decoration.none;currentHint=null;update(t){const e=this.currentHint=this.topCompletion(t.state);!e||t.state.field(M,!1)?this.decorations=i.Decoration.none:this.decorations=i.Decoration.set([i.Decoration.widget({widget:new it(e),side:1}).range(t.state.selection.main.head)])}topCompletion(t){const e=i.selectedCompletion(t);if(!e)return null;let{label:o,apply:n}=e;if("string"==typeof n&&(o=n,n=void 0),n||o.length>100||o.indexOf("\n")>-1||"secondary"===e.type)return null;const r=t.selection.main.head,s=t.doc.lineAt(r);if(r!==s.to)return null;const a=("'"===o[0]?/'(\\.|[^'\\])*$/:'"'===o[0]?/"(\\.|[^"\\])*$/:/#?[\w$]+$/).exec(s.text);return a&&!o.startsWith(a[0])?null:o.slice(a?a[0].length:0)}},{decorations:t=>t.decorations});var st=Object.freeze({__proto__:null,dynamicSetting:S,DynamicSetting:C,tabMovesFocus:E,conservativeCompletion:M,autocompletion:P,bracketMatching:_,codeFolding:I,autoDetectIndent:N,showWhitespace:F,allowScrollPastEof:W,indentUnit:$,domWordWrap:U,dummyDarkTheme:q,themeSelection:Q,theme:X,baseConfiguration:tt,closeBrackets:et,showCompletionHint:rt,contentIncludingHint:function(t){const e=t.plugin(rt);let o=t.state.doc.toString();if(e&&e.currentHint){const{head:n}=t.state.selection.main;o=o.slice(0,n)+e.currentHint+o.slice(n)}return o}});const at=i.StateEffect.define(),ct=i.StateEffect.define();var lt=Object.freeze({__proto__:null,setHighlightedPosition:at,clearHighlightedPosition:ct,positionHighlighter:function(t,e){const o=i.Decoration.line({attributes:{class:t}}),n=i.Decoration.mark({attributes:{class:e}}),r=i.StateField.define({create:()=>null,update(t,e){t&&(t=e.changes.mapPos(t,-1,i.MapMode.TrackDel));for(const o of e.effects)o.is(ct)?t=null:o.is(at)&&(t=Math.max(0,Math.min(o.value,e.newDoc.length-1)));return t}});function s(t){return t.field(r)}return[r,i.ViewPlugin.fromClass(class{tree;decorations;constructor({state:t}){this.tree=i.syntaxTree(t),this.decorations=this.#c(t,s(t))}update(t){const e=i.syntaxTree(t.state),o=s(t.state),n=o!==s(t.startState);e.length!==this.tree.length||n?(this.tree=e,this.decorations=this.#c(t.state,o)):this.decorations=this.decorations.map(t.changes)}#c(t,e){const r=new i.RangeSetBuilder;if(null!==e){const{doc:s}=t,a=s.lineAt(e);r.add(a.from,a.from,o);const c=i.syntaxTree(t).resolveInner(e,1),l=Math.min(a.to,c.to);l>e&&r.add(e,l,n)}return r.finish()}},{decorations:({decorations:t})=>t})]}});const dt=i.StateEffect.define();class ut{completions;seen;constructor(t=[],e=new Set){this.completions=t,this.seen=e}add(t){this.seen.has(t.label)||(this.seen.add(t.label),this.completions.push(t))}copy(){return new ut(this.completions.slice(),new Set(this.seen))}}const pt=["async","await","break","case","catch","class","const","continue","debugger","default","delete","do","else","export","extends","false","finally","for","function","if","import","in","instanceof","let","new","null","of","return","static","super","switch","this","throw","true","try","typeof","var","void","while","with","yield"],mt=["clear","copy","debug","dir","dirxml","getEventListeners","inspect","keys","monitor","monitorEvents","profile","profileEnd","queryObjects","table","undebug","unmonitor","unmonitorEvents","values"],ht=["$","$$","$x","$0","$_"],ft=new ut;for(const t of pt)ft.add({label:t,type:"keyword"});for(const t of mt)ft.add({label:t,type:"function"});for(const t of ht)ft.add({label:t,type:"variable"});const gt=new Set(["TemplateString","LineComment","BlockComment","TypeDefinition","VariableDefinition","PropertyDefinition","TypeName"]);function yt(t,e,o){let n=t.resolveInner(e,-1);const i=n.parent;if(gt.has(n.name))return null;if("PropertyName"===n.name||"PrivatePropertyName"===n.name)return"MemberExpression"!==i?.name?null:{type:1,from:n.from,relatedNode:i};if("VariableName"===n.name||!n.firstChild&&n.to-n.from<20&&!/[^a-z]/.test(o.sliceString(n.from,n.to)))return{type:0,from:n.from};if("String"===n.name){const t=n.parent;return"MemberExpression"===t?.name&&"["===t.childBefore(n.from)?.name?{type:2,from:n.from,relatedNode:t}:null}if(n=n.enterUnfinishedNodesBefore(e),n.to===e&&"MemberExpression"===n.parent?.name&&(n=n.parent),"MemberExpression"===n.name){const t=n.childBefore(Math.min(e,n.to));if("["===t?.name)return{type:2,relatedNode:n};if("."===t?.name||"?."===t?.name)return{type:1,relatedNode:n}}if("("===n.name&&"ArgList"===i?.name&&"CallExpression"===i?.parent?.name){const t=i?.parent?.firstChild;if("MemberExpression"===t?.name){const e=t?.lastChild;if(e&&"get"===o.sliceString(e.from,e.to)){const e=t?.firstChild;return{type:3,relatedNode:e||void 0}}}}return{type:0}}async function bt(t){const e=yt(i.syntaxTree(t.state),t.pos,t.state.doc);if(!e||void 0===e.from&&!t.explicit&&0===e.type)return null;const o=St()?.debuggerModel.selectedCallFrame()?.script;if(o&&d.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance().pluginManager.hasPluginForScript(o))return null;let n,r;if(0===e.type){const[t,e]=await Promise.all([Dt(),jt()]);if(t.completions.length){n=t;for(const t of e.completions)n.add(t)}else n=e}else if(1===e.type||2===e.type){const o=e.relatedNode.getChild("Expression");if(2===e.type&&(r=void 0===e.from?"'":t.state.sliceDoc(e.from,e.from+1)),!o)return null;n=await async function(t,e,o=!1){const n=Mt.instance();if(!e){const e=n.get(t);if(e)return e}const i=St();if(!i)return new ut;const r=Tt(t,i,e,o);e||n.set(t,r);return r}(t.state.sliceDoc(o.from,o.to),r,"]"===t.state.sliceDoc(t.pos,t.pos+1))}else{if(3!==e.type)return null;{const o=e.relatedNode;if(!o)return null;n=await async function(t){const e=new ut,o=St();if(!o)return e;const n=await Ct(o,`[...Map.prototype.keys.call(${t})]`,"completion");if(!n)return e;const i=l.RemoteObject.RemoteArray.objectAsArray(n),r=i.length();for(let t=0;t<r;t++)e.add({label:`"${(await i.at(t)).value}")`,type:"constant",boost:-1*t});return e}(t.state.sliceDoc(o.from,o.to))}}return{from:e.from??t.pos,options:n.completions,validFor:r?"'"===r?wt:xt:vt}}const vt=/^#?(?:[$_\p{ID_Start}])(?:[$_\u200C\u200D\p{ID_Continue}])*$/u,wt=/^\'(\\.|[^\\'\n])*'?$/,xt=/^"(\\.|[^\\"\n])*"?$/;function St(){return r.Context.Context.instance().flavor(l.RuntimeModel.ExecutionContext)}async function Ct(t,e,o){const n=await t.evaluate({expression:e,objectGroup:o,includeCommandLineAPI:!0,silent:!0,returnByValue:!1,generatePreview:!1,throwOnSideEffect:!0,timeout:500,replMode:!0},!1,!1);return"error"in n||n.exceptionDetails||!n.object?null:n.object}const Et=new Map([["string","String"],["symbol","Symbol"],["number","Number"],["boolean","Boolean"],["bigint","BigInt"]]);let kt=null;class Mt{#l=new Map;constructor(){const t=()=>this.#l.clear();l.TargetManager.TargetManager.instance().addModelListener(l.ConsoleModel.ConsoleModel,l.ConsoleModel.Events.CommandEvaluated,t),r.Context.Context.instance().addFlavorChangeListener(l.RuntimeModel.ExecutionContext,t),l.TargetManager.TargetManager.instance().addModelListener(l.DebuggerModel.DebuggerModel,l.DebuggerModel.Events.DebuggerResumed,t),l.TargetManager.TargetManager.instance().addModelListener(l.DebuggerModel.DebuggerModel,l.DebuggerModel.Events.DebuggerPaused,t)}get(t){return this.#l.get(t)}set(t,e){this.#l.set(t,e),window.setTimeout((()=>{this.#l.get(t)===e&&this.#l.delete(t)}),3e4)}static instance(){return kt||(kt=new Mt),kt}}async function Tt(t,e,o,n=!1){const i=new ut;if(!e)return i;let r=await Ct(e,t,"completion");if(!r)return i;for(;"object"===r.type&&"proxy"===r.subtype;){const t=await r.getOwnProperties(!1),e=t.internalProperties?.find((t=>"[[Target]]"===t.name))?.value;if(!e)break;r=e}const s=Et.get(r.type);s&&(r=await Ct(e,s+".prototype","completion"));const a="globalThis"===t?"function":"method",c="globalThis"===t?"variable":"property";if(r&&("object"===r.type||"function"===r.type)){const t=await r.getAllProperties(!1,!1,!0),e="function"===r.type;for(const r of t.properties||[])if(!r.symbol&&(!e||"arguments"!==r.name&&"caller"!==r.name)&&(o||vt.test(r.name))){const t=o?o+r.name.replaceAll("\\","\\\\").replaceAll(o,"\\"+o)+o:r.name,e=o&&!n?`${t}]`:void 0,s=2*Number(r.isOwn)+1*Number(r.enumerable),l="function"===r.value?.type?a:c;i.add({apply:e,label:t,type:l,boost:s})}}return e.runtimeModel.releaseObjectGroup("completion"),i}async function Dt(){const t=new ut,e=St()?.debuggerModel.selectedCallFrame();if(!e)return t;const o=await Promise.all(e.scopeChain().map((t=>p.NamesResolver.resolveScopeInObject(t).getAllProperties(!1,!1))));for(const e of o)for(const o of e.properties||[])t.add({label:o.name,type:"function"===o.value?.type?"function":"variable"});return t}async function jt(){const t=Mt.instance(),e=t.get("");if(e)return e;const o=St();if(!o)return ft;const n=ft.copy(),i=Tt("globalThis",o).then((t=>o.globalLexicalScopeNames().then((e=>{for(const e of t.completions)n.add(e);for(const t of e||[])n.add({label:t,type:"variable"});return n}))));return t.set("",i),i}async function Lt(t,e){const o=i.syntaxTree(t).resolveInner(e).enterUnfinishedNodesBefore(e);if("ArgList"!==o.name)return null;const n=o.parent?.getChild("Expression");if(!n)return null;const r=await async function(t,e){const o=St();if(!o)return null;const n=e.sliceString(t.from,t.to),i=await Ct(o,n,"argumentsHint");if(!i||"function"!==i.type)return null;const r=async()=>{const n=t.firstChild;return n&&"MemberExpression"===t.name?Ct(o,e.sliceString(n.from,n.to),"argumentsHint"):null};return Pt(i,r,n).finally((()=>o.runtimeModel.releaseObjectGroup("argumentsHint")))}(n,t.doc);if(!r)return null;let s=0;for(let t=e;;){const e=o.childBefore(t);if(!e)break;e.type.is("Expression")&&s++,t=e.from}return()=>function(t,e){const o=document.createElement("div");o.className="cm-argumentHints";for(const n of t){const t=document.createElement("span");for(let o=0;o<n.length;o++){if(o===e||o<e&&n[o].startsWith("...")){t.appendChild(document.createElement("b")).appendChild(document.createTextNode(n[o]))}else t.appendChild(document.createTextNode(n[o]));o<n.length-1&&t.appendChild(document.createTextNode(", "))}const i=o.appendChild(document.createElement("div"));i.className="source-code",i.appendChild(document.createTextNode("ƒ(")),i.appendChild(t),i.appendChild(document.createTextNode(")"))}return{dom:o}}(r,s)}function Ot(t){function e(e){for(;"ParamList"!==e.name&&e.nextSibling(););const o=[];if("ParamList"===e.name&&e.firstChild()){let n="";do{switch(e.name){case"ArrayPattern":o.push(n+"arr"),n="";break;case"ObjectPattern":o.push(n+"obj"),n="";break;case"VariableDefinition":o.push(n+t.slice(e.from,e.to)),n="";break;case"Spread":n="..."}}while(e.nextSibling())}return o}try{try{const{parser:o}=i.javascript.javascriptLanguage.configure({strict:!0,top:"SingleClassItem"}),n=o.parse(t).cursor();if(n.firstChild()&&"MethodDeclaration"===n.name&&n.firstChild())return e(n);throw new Error("SingleClassItem rule is expected to have exactly one MethodDeclaration child")}catch{const{parser:o}=i.javascript.javascriptLanguage.configure({strict:!0,top:"SingleExpression"}),n=o.parse(t).cursor();if(!n.firstChild())throw new Error("SingleExpression rule is expected to have children");switch(n.name){case"ArrowFunction":case"FunctionExpression":if(!n.firstChild())throw new Error(`${n.name} rule is expected to have children`);return e(n);case"ClassExpression":if(!n.firstChild())throw new Error(`${n.name} rule is expected to have children`);for(;n.nextSibling()&&"ClassBody"!==n.name;);if("ClassBody"===n.name&&n.firstChild())do{if("MethodDeclaration"===n.name&&n.firstChild()){if("PropertyDefinition"===n.name&&"constructor"===t.slice(n.from,n.to))return e(n);n.parent()}}while(n.nextSibling());return[]}throw new Error("Unexpected expression")}}catch(e){throw new Error(`Failed to parse for arguments list: ${t}`,{cause:e})}}async function Pt(t,e,o){const n=t.description;if(!n)return null;if(!n.endsWith("{ [native code] }"))return[Ot(n)];if("function () { [native code] }"===n){const e=await async function(t){const{internalProperties:e}=await t.getOwnProperties(!1);if(!e)return null;const o=e.find((t=>"[[TargetFunction]]"===t.name))?.value,n=e.find((t=>"[[BoundArgs]]"===t.name))?.value,i=e.find((t=>"[[BoundThis]]"===t.name))?.value;if(!i||!o||!n)return null;const r=await Pt(o,(()=>Promise.resolve(i))),s=l.RemoteObject.RemoteObject.arrayLength(n);if(!r)return null;return r.map((t=>{const e=t.findIndex((t=>t.startsWith("...")));return e>-1&&e<s?t.slice(e):t.slice(s)}))}(t);if(e)return e}const i=u.JavaScriptMetadata.JavaScriptMetadataImpl.instance(),r=/^function ([^(]*)\(/.exec(n),s=r&&r[1]||o;if(!s)return null;const a=i.signaturesForNativeFunction(s);if(a)return a;const c=await e();if(!c)return null;const d=c.className;if(d){const t=i.signaturesForInstanceMethod(s,d);if(t)return t}if(c.description&&"function"===c.type&&c.description.endsWith("{ [native code] }")){const t=/^function ([^(]*)\(/.exec(c.description);if(t){const e=t[1],o=i.signaturesForStaticMethod(s,e);if(o)return o}}for(const t of await async function(t){if("number"===t.type)return["Number","Object"];if("string"===t.type)return["String","Object"];if("symbol"===t.type)return["Symbol","Object"];if("bigint"===t.type)return["BigInt","Object"];if("boolean"===t.type)return["Boolean","Object"];if("undefined"===t.type||"null"===t.subtype)return[];return await t.callFunctionJSON((function(){const t=[];for(let e=this;e;e=Object.getPrototypeOf(e))"object"==typeof e&&e.constructor&&e.constructor.name&&(t[t.length]=e.constructor.name);return t}),[])}(c)){const e=i.signaturesForInstanceMethod(s,t);if(e)return e}return null}var _t=Object.freeze({__proto__:null,completion:function(){return i.javascript.javascriptLanguage.data.of({autocomplete:bt})},completeInContext:async function(t,e,o=!1){const n=i.EditorState.create({doc:t+e,selection:{anchor:t.length},extensions:i.javascript.javascriptLanguage}),r=await bt(new i.CompletionContext(n,n.doc.length,o));return r?r.options.filter((t=>t.label.startsWith(e))).map((t=>({text:t.label,priority:100+(t.boost||0),isSecondary:"secondary"===t.type}))):[]},getQueryType:yt,javascriptCompletionSource:bt,isExpressionComplete:async function(t){const e=r.Context.Context.instance().flavor(l.RuntimeModel.ExecutionContext);if(!e)return!0;const o=await e.runtimeModel.compileScript(t,"",!1,e.id);if(!o||!o.exceptionDetails||!o.exceptionDetails.exception)return!0;const n=o.exceptionDetails.exception.description;return!!n&&(!n.startsWith("SyntaxError: Unexpected end of input")&&!n.startsWith("SyntaxError: Unterminated template literal"))},argumentHints:function(){return function(t){const e=i.StateEffect.define();return[i.StateField.define({create:()=>null,update(t,o){if(o.selection&&(t=null),t&&!o.changes.empty){const e=o.changes.mapPos(t.pos,-1,i.MapMode.TrackDel);t=null===e?null:{pos:e,create:t.create,above:!0}}for(const n of o.effects)n.is(e)?t={pos:o.state.selection.main.from,create:n.value,above:!0}:n.is(dt)&&(t=null);return t},provide:t=>i.showTooltip.from(t)}),i.ViewPlugin.fromClass(class{pending=-1;updateID=0;update(t){this.updateID++,t.transactions.some((t=>t.selection))&&t.state.selection.main.empty&&this.#d(t.view)}#d(t){this.pending>-1&&clearTimeout(this.pending),this.pending=window.setTimeout((()=>this.#u(t)),50)}#u(o){this.pending=-1;const{main:n}=o.state.selection;if(n.empty){const{updateID:i}=this;t(o.state,n.from).then((t=>{this.updateID!==i?this.pending<0&&this.#d(o):t?o.dispatch({effects:e.of(t)}):o.dispatch({effects:dt.of(null)})}))}}})]}(Lt)},closeArgumentsHintsTooltip:function(t,e){return null!==t.state.field(e)&&(t.dispatch({effects:dt.of(null)}),!0)},argumentsList:Ot});function It(t,{lineNumber:e,columnNumber:o}){const n=t.line(Math.max(1,Math.min(t.lines,e+1)));return Math.max(n.from,Math.min(n.to,n.from+o))}function Ht(t,e){e=Math.max(0,Math.min(e,t.length));const o=t.lineAt(e);return{lineNumber:o.number-1,columnNumber:e-o.from}}var Nt=Object.freeze({__proto__:null,toOffset:It,toLineColumn:Ht});class At extends HTMLElement{static litTagName=h.literal`devtools-text-editor`;#p=this.attachShadow({mode:"open"});#m=void 0;#h=C.none;#f=[];#g;#y;#b=-1;#v=()=>{this.#b<0&&(this.#b=window.setTimeout((()=>{this.#b=-1,this.#m&&i.repositionTooltips(this.#m)}),50))};#w=new ResizeObserver(this.#v);constructor(t){super(),this.#g=t,this.#p.adoptedStyleSheets=[a.Style.default]}#x(){return this.#m=new i.EditorView({state:this.state,parent:this.#p,root:this.#p,dispatch:(t,e)=>{e.update([t]),this.#S(t),t.reconfigured&&this.#C()},scrollTo:this.#y}),this.#m.scrollDOM.addEventListener("scroll",(()=>{this.#m&&(this.#y=this.#m.scrollSnapshot(),this.scrollEventHandledToSaveScrollPositionForTest())})),this.#C(),this.#E(),m.ThemeSupport.instance().addEventListener(m.ThemeChangeEvent.eventName,(()=>{const t="dark"===m.ThemeSupport.instance().themeName()?q:[];this.editor.dispatch({effects:Q.reconfigure(t)})})),this.#m}get editor(){return this.#m||this.#x()}dispatch(t){return this.editor.dispatch(t)}get state(){return this.#m?this.#m.state:(this.#g||(this.#g=i.EditorState.create({extensions:tt("")})),this.#g)}set state(t){this.#g!==t&&(this.#g=t,this.#m&&(this.#m.setState(t),this.#C()))}scrollEventHandledToSaveScrollPositionForTest(){}connectedCallback(){this.#m?this.#m.dispatch({effects:this.#y}):this.#x()}disconnectedCallback(){this.#m&&(this.#m.dispatch({effects:Bt.of(null)}),this.#g=this.#m.state,this.#w.disconnect(),window.removeEventListener("resize",this.#v),this.#m.destroy(),this.#m=void 0,this.#C())}focus(){this.#m&&this.#m.focus()}#C(){const e=this.#m?this.#m.state.facet(S):C.none;if(e===this.#h)return;this.#h=e;for(const[t,e]of this.#f)t.removeChangeListener(e);this.#f=[];const o=t.Settings.Settings.instance();for(const t of e){const e=({data:e})=>{const o=t.sync(this.state,e);o&&this.#m&&this.#m.dispatch({effects:o})},n=o.moduleSetting(t.settingName);n.addChangeListener(e),this.#f.push([n,e])}}#E(){const t=n.WindowBoundsService.WindowBoundsServiceImpl.instance().getDevToolsBoundingElement();t&&this.#w.observe(t),window.addEventListener("resize",this.#v)}#S(t){const e=t.annotation(i.Transaction.userEvent),o=e?Ft.get(e):null;o&&this.dispatchEvent(new InputEvent("input",{inputType:o}))}revealPosition(t,e=!0){const o=this.#m;if(!o)return;const n=o.state.doc.lineAt(t.main.head),r=[];e&&(o.state.field(zt,!1)?o.dispatch({effects:Bt.of(null)}):o.dispatch({effects:i.StateEffect.appendConfig.of(zt)}),r.push(Rt.of(n.from)));const s=o.scrollDOM.getBoundingClientRect(),a=o.coordsAtPos(t.main.head);t.main.empty?!a||a.top<s.top||a.bottom>s.bottom?r.push(i.EditorView.scrollIntoView(t.main,{y:"center"})):(a.left<s.left||a.right>s.right)&&r.push(i.EditorView.scrollIntoView(t.main,{x:"center"})):r.push(i.EditorView.scrollIntoView(t.main)),o.dispatch({selection:t,effects:r,userEvent:"select.reveal"})}createSelection(t,e){const{doc:o}=this.state,n=It(o,t);return i.EditorSelection.single(e?It(o,e):n,n)}toLineColumn(t){return Ht(this.state.doc,t)}toOffset(t){return It(this.state.doc,t)}}customElements.define("devtools-text-editor",At);const Bt=i.StateEffect.define(),Rt=i.StateEffect.define(),zt=i.StateField.define({create:()=>i.Decoration.none,update(t,e){!e.changes.empty&&t.size&&(t=t.map(e.changes));for(const o of e.effects)o.is(Bt)?t=i.Decoration.none:o.is(Rt)&&(t=i.Decoration.set([i.Decoration.line({attributes:{class:"cm-highlightedLine"}}).range(o.value)]));return t},provide:t=>i.EditorView.decorations.from(t,(t=>t))}),Ft=new Map([["input.type","insertText"],["input.type.compose","insertCompositionText"],["input.paste","insertFromPaste"],["input.drop","insertFromDrop"],["input.complete","insertReplacementText"],["delete.selection","deleteContent"],["delete.forward","deleteContentForward"],["delete.backward","deleteContentBackward"],["delete.cut","deleteByCut"],["move.drop","deleteByDrag"],["undo","historyUndo"],["redo","historyRedo"]]);var Wt=Object.freeze({__proto__:null,TextEditor:At});var Vt=Object.freeze({__proto__:null,TextEditorHistory:class{#k;#M;constructor(t,e){this.#k=t,this.#M=e}moveHistory(t,e=!1){const{editor:o}=this.#k,{main:n}=o.state.selection,r=-1===t;if(!e){if(!n.empty)return!1;const t=o.coordsAtPos(n.head),e=o.coordsAtPos(r?0:o.state.doc.length);if(t&&e&&(r?t.top>e.top+5:t.bottom<e.bottom-5))return!1}const s=o.state.doc.toString(),a=this.#M,c=r?a.previous(s):a.next();if(void 0===c)return!1;const l=c.length;if(o.dispatch({changes:{from:0,to:o.state.doc.length,insert:c},selection:i.EditorSelection.cursor(l),scrollIntoView:!0}),r){const t=c.search(/\n|$/);o.dispatch({selection:i.EditorSelection.cursor(t)})}return!0}historyCompletions(t){const{explicit:e,pos:o,state:n}=t,i=n.doc.toString();if(!(o===i.length)||!i.length&&!e)return null;const r=this.#M.matchingEntries(i);if(!r.size)return null;const s=[...r].map((t=>({label:t,type:"secondary",boost:-1e5})));return{from:0,to:i.length,options:s}}}});export{g as AutocompleteHistory,st as Config,lt as ExecutionPositionHighlighter,_t as JavaScript,Nt as Position,Wt as TextEditor,Vt as TextEditorHistory};
