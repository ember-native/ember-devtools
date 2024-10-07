import*as e from"../../core/common/common.js";import*as t from"../../core/platform/platform.js";import*as n from"../../core/sdk/sdk.js";import*as r from"../bindings/bindings.js";import*as o from"../formatter/formatter.js";import*as s from"../text_utils/text_utils.js";const i=new WeakMap;function a(e){let t=i.get(e);return void 0===t&&(t=e.requestContentData().then((t=>{if(s.ContentData.ContentData.isError(t))return null;const n=e.isModule?"module":"script";return o.FormatterWorkerPool.formatterWorkerPool().javaScriptScopeTree(t.text,n)})),i.set(e,t)),t}var c=Object.freeze({__proto__:null,scopeTreeForScript:a});const u=new WeakMap,l=new WeakMap;async function p(e){const t=await e.requestContentData();return s.ContentData.ContentData.isError(t)||!t.isTextContent?null:t.textObj}class g{name;positions;constructor(e,t=[]){this.name=e,this.positions=t}addPosition(e,t){this.positions.push({lineNumber:e,columnNumber:t})}}const d=async function(e){if(!e.sourceMapURL)return null;const t=await p(e);if(!t)return null;const n=await a(e);return n?{scopeTree:n,text:t}:null},f=function(e,t){if(!i(e,t))return[];let n=e;const r=[e];for(;;){let e=!1;for(const a of n.children){if(i(a,t)){r.push(a),n=a,e=!0;break}if(!(o=t,s=a,o.end<=s.start||s.end<=o.start||i(t,a)))return console.error("Wrong nesting of scopes"),[]}if(!e)break}var o,s;return r;function i(e,t){return e.start<=t.start&&e.end>=t.end}};async function b(e){const t=e.range()?.start,n=e.range()?.end;if(!t||!n)return[];const r=t.script();if(!r)return[];const o=await d(r);if(!o)return[];const{scopeTree:s,text:i}=o,a={start:i.offsetFromPosition(t.lineNumber,t.columnNumber),end:i.offsetFromPosition(n.lineNumber,n.columnNumber)};return f(s,a)}const m=async function(e,t,n){const r=await p(e);if(!r)return null;const o=[],i=new s.TextCursor.TextCursor(r.lineEndings());for(const e of t.variables){if(3===e.kind&&e.offsets.length<=1)continue;const t=new g(e.name);for(const n of e.offsets)i.resetTo(n),t.addPosition(i.lineNumber(),i.columnNumber());o.push(t)}const a=[];for(const e of n)for(const n of e.variables){let e=null;for(const r of n.offsets)r>=t.start&&r<t.end&&(e||(e=new g(n.name)),i.resetTo(r),e.addPosition(i.lineNumber(),i.columnNumber()));e&&a.push(e)}return{boundVariables:o,freeVariables:a}},h=/^\s*([A-Za-z_$][A-Za-z_$0-9]*)\s*([.;,=]?)\s*$/,M=async t=>{if(!e.Settings.Settings.instance().moduleSetting("js-source-maps-enabled").get())return{variableMapping:new Map,thisMapping:null};const n=t.callFrame().script,r=await b(t);return w(n,r)},w=async(e,t)=>{const n=t[t.length-1];if(!n)return{variableMapping:new Map,thisMapping:null};let o=u.get(n);const s=e.sourceMap();if(!o||o.sourceMap!==s){const r=(async()=>{const r=new Map;let o=null;if(!s)return{variableMapping:r,thisMapping:o};const a=[],c=(t,n)=>{for(const e of t.positions){const t=s.findEntry(e.lineNumber,e.columnNumber);if(t&&t.name)return void n(t.name)}a.push(async function(){if(s)for(const r of t.positions){const o=await i(e,s,t.name,r);if(o)return void n(o)}}())},u=await m(e,n,t.slice(0,-1));if(!u)return{variableMapping:r,thisMapping:o};for(const e of u.boundVariables)c(e,(t=>{"this"!==t&&r.set(e.name,t)}));for(const e of u.freeVariables)c(e,(t=>{"this"===t&&(o=e.name)}));return await Promise.all(a).then(N()),{variableMapping:r,thisMapping:o}})();o={sourceMap:s,mappingPromise:r},u.set(n,{sourceMap:s,mappingPromise:r})}return await o.mappingPromise;async function i(e,t,n,o){const s=t.findEntryRanges(o.lineNumber,o.columnNumber);if(!s)return null;const i=r.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance().uiSourceCodeForSourceMapSourceURL(e.debuggerModel,s.sourceURL,e.isContentScript());if(!i)return null;const a=await p(e);if(!a)return null;const c=m(a.extract(s.range));if(!c)return null;const{name:u,punctuation:l}=c;if(u!==n)return null;const g=await p(i);if(!g)return null;const d=m(g.extract(s.sourceRange));if(!d)return null;const{name:f,punctuation:b}=d;return l===b||"comma"===l&&"semicolon"===b?f:null;function m(e){const t=e.match(h);if(!t)return null;const n=t[1];let r=null;switch(t[2]){case".":r="dot";break;case",":r="comma";break;case";":r="semicolon";break;case"=":r="equals";break;case"":r="none";break;default:return console.error(`Name token parsing error: unexpected token "${t[2]}"`),null}return{name:n,punctuation:r}}}},v=async function(e){const{pluginManager:t}=r.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance(),n=await t.resolveScopeChain(e);if(n)return n;if(e.script.isWasm())return e.scopeChain();const o=await S(e);return e.scopeChain().map((e=>new F(e,o)))},j=async t=>{if(!e.Settings.Settings.instance().moduleSetting("js-source-maps-enabled").get())return new Map;const n=l.get(t);if(n)return n;const r=t.scopeChain(),o=await Promise.all(r.map(M)),s=new Map,i=new Set;for(const{variableMapping:e}of o)for(const[t,n]of e)if(n){if(!s.has(n)){const e=i.has(t)?null:t;s.set(n,e)}i.add(t)}return l.set(t,s),s},S=async e=>{const t=e.scopeChain();if(0===t.length)return e.thisObject();const{thisMapping:n}=await M(t[0]);if(!n)return e.thisObject();const r=await e.evaluate({expression:n,objectGroup:"backtrace",includeCommandLineAPI:!1,silent:!0,returnByValue:!1,generatePreview:!0});return"exceptionDetails"in r?!r.exceptionDetails&&r.object?r.object:e.thisObject():null},y=function(e){const t=e.range()?.end,n=e.range()?.start.script()??null;return"global"!==e.type()&&n&&t&&n.sourceMapURL?new x(e):e.object()};class F{#e;#t;constructor(e,t){this.#e=e,this.#t=t}callFrame(){return this.#e.callFrame()}type(){return this.#e.type()}typeName(){return this.#e.typeName()}name(){return this.#e.name()}range(){return this.#e.range()}object(){return y(this.#e)}description(){return this.#e.description()}icon(){return this.#e.icon()}extraProperties(){const e=this.#e.extraProperties();return this.#t&&"local"===this.type()&&e.unshift(new n.RemoteObject.RemoteObjectProperty("this",this.#t,void 0,void 0,void 0,void 0,void 0,!0)),e}}class x extends n.RemoteObject.RemoteObject{scope;object;constructor(e){super(),this.scope=e,this.object=e.object()}customPreview(){return this.object.customPreview()}get objectId(){return this.object.objectId}get type(){return this.object.type}get subtype(){return this.object.subtype}get value(){return this.object.value}get description(){return this.object.description}get hasChildren(){return this.object.hasChildren}get preview(){return this.object.preview}arrayLength(){return this.object.arrayLength()}getOwnProperties(e){return this.object.getOwnProperties(e)}async getAllProperties(e,t){const n=await this.object.getAllProperties(e,t),{variableMapping:r}=await M(this.scope),o=n.properties,s=n.internalProperties,i=o?.map((e=>{const t=r.get(e.name);return void 0!==t?e.cloneWithNewName(t):e}));return{properties:i??[],internalProperties:s}}async setPropertyValue(e,t){const{variableMapping:n}=await M(this.scope);let r;r="string"==typeof e?e:e.value;let o=r;for(const e of n.keys())if(n.get(e)===r){o=e;break}return this.object.setPropertyValue(o,t)}async deleteProperty(e){return this.object.deleteProperty(e)}callFunction(e,t){return this.object.callFunction(e,t)}callFunctionJSON(e,t){return this.object.callFunctionJSON(e,t)}release(){this.object.release()}debuggerModel(){return this.object.debuggerModel()}runtimeModel(){return this.object.runtimeModel()}isNode(){return this.object.isNode()}}async function C(e,t,n){const r=e.sourceMap();if(!r)return null;const o=r.findEntry(t,n);if(!o||!o.sourceURL)return null;const i=r.findScopeEntry(o.sourceURL,o.sourceLineNumber,o.sourceColumnNumber)?.scopeName();if(i)return i;const a=o.name;if(!a)return null;const c=await p(e);if(!c)return null;const u=new s.TextRange.TextRange(t,n,t,n+1);return"("!==c.extract(u)?null:a}let P=function(){};const N=()=>P;var R=Object.freeze({__proto__:null,getTextFor:p,IdentifierPositions:g,findScopeChainForDebuggerScope:b,scopeIdentifiers:m,resolveScopeChain:v,allVariablesInCallFrame:j,allVariablesAtPosition:async t=>{const n=new Map;if(!e.Settings.Settings.instance().moduleSetting("js-source-maps-enabled").get())return n;const r=t.script();if(!r)return n;const o=await d(r);if(!o)return n;const{scopeTree:s,text:i}=o,a=i.offsetFromPosition(t.lineNumber,t.columnNumber),c=f(s,{start:a,end:a}),u=new Set;for(;c.length>0;){const{variableMapping:e}=await w(r,c);for(const[t,r]of e)if(r){if(!n.has(r)){const e=u.has(t)?null:t;n.set(r,e)}u.add(t)}c.pop()}return n},resolveExpression:async(e,n,i,a,c,u)=>{if("application/wasm"===i.mimeType())return`memories["${n}"] ?? locals["${n}"] ?? tables["${n}"] ?? functions["${n}"] ?? globals["${n}"]`;if(!i.contentType().isFromSourceMap())return"";const l=await j(e);if(l.has(n))return l.get(n);const g=(await r.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance().uiLocationToRawLocations(i,a,c)).find((t=>t.debuggerModel===e.debuggerModel));if(!g)return"";const d=g.script();if(!d)return"";const f=d.sourceMap();if(!f)return"";const b=await p(d);if(!b)return"";const m=f.reverseMapTextRanges(i.url(),new s.TextRange.TextRange(a,c,a,u));if(1!==m.length)return"";const[h]=m,M=b.extract(h);if(!M)return"";const w=await p(i);if(!w)return"";const v=f.findEntryRanges(h.startLine,h.startColumn),S=0===h.endColumn?h.endLine-1:h.endLine,y=0===h.endColumn?b.lineEndings()[S]:h.endColumn-1,F=f.findEntryRanges(S,y);if(!v||!F)return"";const x=w.extract(new s.TextRange.TextRange(v.sourceRange.startLine,v.sourceRange.startColumn,F.sourceRange.endLine,F.sourceRange.endColumn));return new RegExp(`^[\\s,;]*${t.StringUtilities.escapeForRegExp(n)}`,"g").test(x)?await o.FormatterWorkerPool.formatterWorkerPool().evaluatableJavaScriptSubstring(M):""},resolveThisObject:S,resolveScopeInObject:y,RemoteObject:x,resolveDebuggerFrameFunctionName:async function(e){const t=e.localScope()?.range()?.start;return t?await C(e.script,t.lineNumber,t.columnNumber):null},resolveProfileFrameFunctionName:async function({scriptId:e,lineNumber:t,columnNumber:o},s){if(!s||void 0===t||void 0===o||void 0===e)return null;const i=s.model(n.DebuggerModel.DebuggerModel),a=i?.scriptForId(String(e));if(!i||!a)return null;const c=r.DebuggerWorkspaceBinding.DebuggerWorkspaceBinding.instance(),u=new n.DebuggerModel.Location(i,e,t,o),l=await c.pluginManager.getFunctionInfo(a,u);if(l&&"frames"in l){const e=l.frames.at(-1);if(e?.name)return e.name}return await C(a,t,o)},getScopeResolvedForTest:N,setScopeResolvedForTest:e=>{P=e}});class k extends e.ObjectWrapper.ObjectWrapper{#n;#r=new e.Throttler.Throttler(5);#o=this.#s.bind(this);constructor(e){super(),this.#n=e,this.#n.debuggerModel.addEventListener(n.DebuggerModel.Events.DebugInfoAttached,this.#i,this),this.#n.debuggerModel.sourceMapManager().addEventListener(n.SourceMapManager.Events.SourceMapAttached,this.#a,this),this.#r.schedule(this.#o)}dispose(){this.#n.debuggerModel.removeEventListener(n.DebuggerModel.Events.DebugInfoAttached,this.#i,this),this.#n.debuggerModel.sourceMapManager().removeEventListener(n.SourceMapManager.Events.SourceMapAttached,this.#a,this),this.listeners?.clear()}async#s(){const e=await v(this.#n);this.dispatchEventToListeners("ScopeChainUpdated",new T(e))}#i(e){e.data===this.#n.script&&this.#r.schedule(this.#o)}#a(e){e.data.client===this.#n.script&&this.#r.schedule(this.#o)}}class T{scopeChain;constructor(e){this.scopeChain=e}}var D=Object.freeze({__proto__:null,ScopeChainModel:k,ScopeChain:T});export{R as NamesResolver,D as ScopeChainModel,c as ScopeTreeCache};
