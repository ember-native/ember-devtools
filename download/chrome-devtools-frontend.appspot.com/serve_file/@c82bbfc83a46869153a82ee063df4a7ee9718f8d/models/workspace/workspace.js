import*as e from"../../core/common/common.js";import*as t from"../../core/host/host.js";import*as n from"../../core/platform/platform.js";import*as r from"../../core/i18n/i18n.js";import*as o from"../text_utils/text_utils.js";let s;class i extends e.ObjectWrapper.ObjectWrapper{saveCallbacks;constructor(){super(),this.saveCallbacks=new Map,t.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(t.InspectorFrontendHostAPI.Events.SavedURL,this.savedURL,this),t.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(t.InspectorFrontendHostAPI.Events.CanceledSaveURL,this.canceledSavedURL,this),t.InspectorFrontendHost.InspectorFrontendHostInstance.events.addEventListener(t.InspectorFrontendHostAPI.Events.AppendedToURL,this.appendedToURL,this)}static instance(e={forceNew:null}){const{forceNew:t}=e;return s&&!t||(s=new i),s}save(e,n,r,o){const s=new Promise((t=>this.saveCallbacks.set(e,t)));return t.InspectorFrontendHost.InspectorFrontendHostInstance.save(e,n,r,o),s}savedURL(e){const{url:t,fileSystemPath:n}=e.data,r=this.saveCallbacks.get(t);this.saveCallbacks.delete(t),r&&r({fileSystemPath:n})}canceledSavedURL({data:e}){const t=this.saveCallbacks.get(e);this.saveCallbacks.delete(e),t&&t(null)}append(e,n){t.InspectorFrontendHost.InspectorFrontendHostInstance.append(e,n)}close(e){t.InspectorFrontendHost.InspectorFrontendHostInstance.close(e)}appendedToURL({data:e}){this.dispatchEventToListeners("AppendedToURL",e)}}var a=Object.freeze({__proto__:null,FileManager:i});class c{#e;#t;#n;#r;#o;constructor(e,t,n){this.#e=e,this.#t=t,this.#n=n;const{queries:r,fileRegexQueries:o}=c.#s(e,t,n);this.#r=r,this.#o=o}static fromPlainObject(e){return new c(e.query,e.ignoreCase,e.isRegex)}filePathMatchesFileQuery(e){return this.#o.every((({regex:t,shouldMatch:n})=>Boolean(e.match(t))===n))}queries(){return this.#r}query(){return this.#e}ignoreCase(){return this.#t}isRegex(){return this.#n}toPlainObject(){return{query:this.query(),ignoreCase:this.ignoreCase(),isRegex:this.isRegex()}}static#s(e,t,n){const r=/(\s*(?!-?f(ile)?:)[^\\ ]|\\.)+/,o=r.source+"(\\s+"+r.source+")*",s=["(\\s*"+l.source+"\\s*)","("+/"([^\\"]|\\.)+"/.source+")","("+o+")"].join("|"),i=new RegExp(s,"g"),a=e.match(i)||[],h=[],u=[];for(const e of a){if(!e)continue;const r=c.#i(e);if(r){const e=new RegExp(r.text,t?"i":"");u.push({regex:e,shouldMatch:r.shouldMatch})}else n?h.push(e):e.startsWith('"')&&e.endsWith('"')?h.push(c.#a(e)):h.push(c.#c(e))}return{queries:h,fileRegexQueries:u}}static#c(e){return e.replace(/\\(.)/g,"$1")}static#a(e){return e.substring(1,e.length-1).replace(/\\(.)/g,"$1")}static#i(e){const t=e.match(l);if(!t)return null;e=t[3];let r="";for(let t=0;t<e.length;++t){const o=e[t];if("*"===o)r+=".*";else if("\\"===o){++t;" "===e[t]&&(r+=" ")}else-1!==n.StringUtilities.regexSpecialCharacters().indexOf(e.charAt(t))&&(r+="\\"),r+=e.charAt(t)}return{text:r,shouldMatch:!Boolean(t[1])}}}const l=/(-)?f(ile)?:((?:[^\\ ]|\\.)+)/;var h,u=Object.freeze({__proto__:null,SearchConfig:c});!function(e){e.Debugger="debugger",e.Formatter="formatter",e.Network="network",e.FileSystem="filesystem",e.ContentScripts="contentscripts",e.Service="service"}(h||(h={}));let d;class p extends e.ObjectWrapper.ObjectWrapper{projectsInternal;hasResourceContentTrackingExtensionsInternal;constructor(){super(),this.projectsInternal=new Map,this.hasResourceContentTrackingExtensionsInternal=!1}static instance(e={forceNew:null}){const{forceNew:t}=e;return d&&!t||(d=new p),d}static removeInstance(){d=void 0}uiSourceCode(e,t){const n=this.projectsInternal.get(e);return n?n.uiSourceCodeForURL(t):null}uiSourceCodeForURL(e){for(const t of this.projectsInternal.values()){const n=t.uiSourceCodeForURL(e);if(n)return n}return null}findCompatibleUISourceCodes(e){const t=e.url(),n=e.contentType(),r=[];for(const o of this.projectsInternal.values()){if(e.project().type()!==o.type())continue;const s=o.uiSourceCodeForURL(t);s&&s.url()===t&&s.contentType()===n&&r.push(s)}return r}uiSourceCodesForProjectType(e){const t=[];for(const n of this.projectsInternal.values())if(n.type()===e)for(const e of n.uiSourceCodes())t.push(e);return t}addProject(e){console.assert(!this.projectsInternal.has(e.id()),`A project with id ${e.id()} already exists!`),this.projectsInternal.set(e.id(),e),this.dispatchEventToListeners(C.ProjectAdded,e)}removeProject(e){this.projectsInternal.delete(e.id()),this.dispatchEventToListeners(C.ProjectRemoved,e)}project(e){return this.projectsInternal.get(e)||null}projects(){return[...this.projectsInternal.values()]}projectsForType(e){return this.projects().filter((function(t){return t.type()===e}))}uiSourceCodes(){const e=[];for(const t of this.projectsInternal.values())for(const n of t.uiSourceCodes())e.push(n);return e}setHasResourceContentTrackingExtensions(e){this.hasResourceContentTrackingExtensionsInternal=e}hasResourceContentTrackingExtensions(){return this.hasResourceContentTrackingExtensionsInternal}}var C;!function(e){e.UISourceCodeAdded="UISourceCodeAdded",e.UISourceCodeRemoved="UISourceCodeRemoved",e.UISourceCodeRenamed="UISourceCodeRenamed",e.WorkingCopyChanged="WorkingCopyChanged",e.WorkingCopyCommitted="WorkingCopyCommitted",e.WorkingCopyCommittedByUser="WorkingCopyCommittedByUser",e.ProjectAdded="ProjectAdded",e.ProjectRemoved="ProjectRemoved"}(C||(C={}));var m=Object.freeze({__proto__:null,get projectTypes(){return h},ProjectStore:class{workspaceInternal;idInternal;typeInternal;displayNameInternal;#l;constructor(e,t,n,r){this.workspaceInternal=e,this.idInternal=t,this.typeInternal=n,this.displayNameInternal=r,this.#l=new Map}id(){return this.idInternal}type(){return this.typeInternal}displayName(){return this.displayNameInternal}workspace(){return this.workspaceInternal}createUISourceCode(e,t){return new k(this,e,t)}addUISourceCode(e){const t=e.url();return!this.uiSourceCodeForURL(t)&&(this.#l.set(t,e),this.workspaceInternal.dispatchEventToListeners(C.UISourceCodeAdded,e),!0)}removeUISourceCode(e){const t=this.#l.get(e);void 0!==t&&(this.#l.delete(e),this.workspaceInternal.dispatchEventToListeners(C.UISourceCodeRemoved,t))}removeProject(){this.workspaceInternal.removeProject(this),this.#l.clear()}uiSourceCodeForURL(e){return this.#l.get(e)??null}uiSourceCodes(){return this.#l.values()}renameUISourceCode(t,n){const r=t.url(),o=t.parentURL()?e.ParsedURL.ParsedURL.urlFromParentUrlAndName(t.parentURL(),n):e.ParsedURL.ParsedURL.preEncodeSpecialCharactersInPath(n);this.#l.set(o,t),this.#l.delete(r)}rename(e,t,n){}excludeFolder(e){}deleteFile(e){}deleteDirectoryRecursively(e){return Promise.resolve(!1)}remove(){}indexContent(e){}},WorkspaceImpl:p,get Events(){return C}});const I={index:"(index)",thisFileWasChangedExternally:"This file was changed externally. Would you like to reload it?"},g=r.i18n.registerUIStrings("models/workspace/UISourceCode.ts",I),y=r.i18n.getLocalizedString.bind(void 0,g);class k extends e.ObjectWrapper.ObjectWrapper{projectInternal;urlInternal;originInternal;parentURLInternal;nameInternal;contentTypeInternal;requestContentPromise;decorations=new Map;hasCommitsInternal;messagesInternal;contentInternal;forceLoadOnCheckContentInternal;checkingContent;lastAcceptedContent;workingCopyInternal;workingCopyGetter;disableEditInternal;contentEncodedInternal;isKnownThirdPartyInternal;isUnconditionallyIgnoreListedInternal;constructor(t,r,o){super(),this.projectInternal=t,this.urlInternal=r;const s=e.ParsedURL.ParsedURL.fromString(r);s?(this.originInternal=s.securityOrigin(),this.parentURLInternal=e.ParsedURL.ParsedURL.concatenate(this.originInternal,s.folderPathComponents),!s.queryParams||s.lastPathComponent&&o.isFromSourceMap()?this.nameInternal=decodeURIComponent(s.lastPathComponent):this.nameInternal=s.lastPathComponent+"?"+s.queryParams):(this.originInternal=n.DevToolsPath.EmptyUrlString,this.parentURLInternal=n.DevToolsPath.EmptyUrlString,this.nameInternal=r),this.contentTypeInternal=o,this.requestContentPromise=null,this.hasCommitsInternal=!1,this.messagesInternal=null,this.contentInternal=null,this.forceLoadOnCheckContentInternal=!1,this.checkingContent=!1,this.lastAcceptedContent=null,this.workingCopyInternal=null,this.workingCopyGetter=null,this.disableEditInternal=!1,this.isKnownThirdPartyInternal=!1,this.isUnconditionallyIgnoreListedInternal=!1}requestMetadata(){return this.projectInternal.requestMetadata(this)}name(){return this.nameInternal}mimeType(){return this.projectInternal.mimeType(this)}url(){return this.urlInternal}canononicalScriptId(){return`${this.contentTypeInternal.name()},${this.urlInternal}`}parentURL(){return this.parentURLInternal}origin(){return this.originInternal}fullDisplayName(){return this.projectInternal.fullDisplayName(this)}displayName(e){if(!this.nameInternal)return y(I.index);const t=this.nameInternal;return e?t:n.StringUtilities.trimEndWithMaxLength(t,100)}canRename(){return this.projectInternal.canRename()}rename(e){let t;const n=new Promise((e=>{t=e}));return this.projectInternal.rename(this,e,function(e,n,r,o){e&&this.updateName(n,r,o);t(e)}.bind(this)),n}remove(){this.projectInternal.deleteFile(this)}updateName(t,n,r){const o=this.urlInternal;this.nameInternal=t,this.urlInternal=n||e.ParsedURL.ParsedURL.relativePathToUrlString(t,o),r&&(this.contentTypeInternal=r),this.dispatchEventToListeners(v.TitleChanged,this),this.project().workspace().dispatchEventToListeners(C.UISourceCodeRenamed,{oldURL:o,uiSourceCode:this})}contentURL(){return this.url()}contentType(){return this.contentTypeInternal}project(){return this.projectInternal}requestContentData({cachedWasmOnly:e}={}){return this.requestContentPromise?this.requestContentPromise:this.contentInternal?Promise.resolve(this.contentInternal):e&&"application/wasm"===this.mimeType()?Promise.resolve(new o.WasmDisassembly.WasmDisassembly([],[],[])):(this.requestContentPromise=this.requestContentImpl(),this.requestContentPromise)}async requestContent(e={}){return o.ContentData.ContentData.asDeferredContent(await this.requestContentData(e))}async requestContentImpl(){if(this.contentInternal)throw new Error("Called UISourceCode#requestContentImpl even though content is available for "+this.urlInternal);try{this.contentInternal=await this.projectInternal.requestFileContent(this)}catch(e){this.contentInternal={error:e?String(e):""}}return this.contentInternal}#h(e){return e?e.isEncoded&&e.content?window.atob(e.content):e.content:null}#u(e){return!e||o.ContentData.ContentData.isError(e)?null:e.createdFromBase64?window.atob(e.base64):e.text}async checkContentUpdated(){if(!this.contentInternal&&!this.forceLoadOnCheckContentInternal)return;if(!this.projectInternal.canSetFileContent()||this.checkingContent)return;this.checkingContent=!0;const t=o.ContentData.ContentData.asDeferredContent(await this.projectInternal.requestFileContent(this));if("error"in t)return;if(this.checkingContent=!1,null===t.content){const e=this.workingCopy();return this.contentCommitted("",!1),void this.setWorkingCopy(e)}if(this.lastAcceptedContent===t.content)return;if(this.#u(this.contentInternal)===this.#h(t))return void(this.lastAcceptedContent=null);if(!this.isDirty()||this.workingCopyInternal===t.content)return void this.contentCommitted(t.content,!1);await e.Revealer.reveal(this),await new Promise((e=>window.setTimeout(e,0)));window.confirm(y(I.thisFileWasChangedExternally))?this.contentCommitted(t.content,!1):this.lastAcceptedContent=t.content}forceLoadOnCheckContent(){this.forceLoadOnCheckContentInternal=!0}commitContent(e){this.projectInternal.canSetFileContent()&&this.projectInternal.setFileContent(this,e,!1),this.contentCommitted(e,!0)}contentCommitted(e,t){this.lastAcceptedContent=null,this.contentInternal=new o.ContentData.ContentData(e,Boolean(this.contentEncodedInternal),this.mimeType()),this.requestContentPromise=null,this.hasCommitsInternal=!0,this.innerResetWorkingCopy();const n={uiSourceCode:this,content:e,encoded:this.contentEncodedInternal};this.dispatchEventToListeners(v.WorkingCopyCommitted,n),this.projectInternal.workspace().dispatchEventToListeners(C.WorkingCopyCommitted,n),t&&this.projectInternal.workspace().dispatchEventToListeners(C.WorkingCopyCommittedByUser,n)}addRevision(e){this.commitContent(e)}hasCommits(){return this.hasCommitsInternal}workingCopy(){return this.workingCopyContent().content||""}workingCopyContent(){return this.workingCopyContentData().asDeferedContent()}workingCopyContentData(){this.workingCopyGetter&&(this.workingCopyInternal=this.workingCopyGetter(),this.workingCopyGetter=null);const e=this.contentInternal?o.ContentData.ContentData.contentDataOrEmpty(this.contentInternal):o.ContentData.EMPTY_TEXT_CONTENT_DATA;return null!==this.workingCopyInternal?new o.ContentData.ContentData(this.workingCopyInternal,!1,e.mimeType):e}resetWorkingCopy(){this.innerResetWorkingCopy(),this.workingCopyChanged()}innerResetWorkingCopy(){this.workingCopyInternal=null,this.workingCopyGetter=null}setWorkingCopy(e){this.workingCopyInternal=e,this.workingCopyGetter=null,this.workingCopyChanged()}setContent(e,t){this.contentEncodedInternal=t,this.projectInternal.canSetFileContent()&&this.projectInternal.setFileContent(this,e,t),this.contentCommitted(e,!0)}setWorkingCopyGetter(e){this.workingCopyGetter=e,this.workingCopyChanged()}workingCopyChanged(){this.removeAllMessages(),this.dispatchEventToListeners(v.WorkingCopyChanged,this),this.projectInternal.workspace().dispatchEventToListeners(C.WorkingCopyChanged,{uiSourceCode:this})}removeWorkingCopyGetter(){this.workingCopyGetter&&(this.workingCopyInternal=this.workingCopyGetter(),this.workingCopyGetter=null)}commitWorkingCopy(){this.isDirty()&&this.commitContent(this.workingCopy())}isDirty(){return null!==this.workingCopyInternal||null!==this.workingCopyGetter}isKnownThirdParty(){return this.isKnownThirdPartyInternal}markKnownThirdParty(){this.isKnownThirdPartyInternal=!0}isUnconditionallyIgnoreListed(){return this.isUnconditionallyIgnoreListedInternal}isFetchXHR(){return[e.ResourceType.resourceTypes.XHR,e.ResourceType.resourceTypes.Fetch].includes(this.contentType())}markAsUnconditionallyIgnoreListed(){this.isUnconditionallyIgnoreListedInternal=!0}extension(){return e.ParsedURL.ParsedURL.extractExtension(this.nameInternal)}content(){return!this.contentInternal||"error"in this.contentInternal?"":this.contentInternal.text}loadError(){return this.contentInternal&&"error"in this.contentInternal&&this.contentInternal.error||null}searchInContent(e,t,n){return!this.contentInternal||"error"in this.contentInternal?this.projectInternal.searchInFileContent(this,e,t,n):Promise.resolve(o.TextUtils.performSearchInContentData(this.contentInternal,e,t,n))}contentLoaded(){return Boolean(this.contentInternal)}uiLocation(e,t){return new f(this,e,t)}messages(){return this.messagesInternal?new Set(this.messagesInternal):new Set}addLineMessage(e,t,n,r,s){const i=o.TextRange.TextRange.createFromLocation(n,r||0),a=new w(e,t,s,i);return this.addMessage(a),a}addMessage(e){this.messagesInternal||(this.messagesInternal=new Set),this.messagesInternal.add(e),this.dispatchEventToListeners(v.MessageAdded,e)}removeMessage(e){this.messagesInternal?.delete(e)&&this.dispatchEventToListeners(v.MessageRemoved,e)}removeAllMessages(){if(this.messagesInternal){for(const e of this.messagesInternal)this.dispatchEventToListeners(v.MessageRemoved,e);this.messagesInternal=null}}setDecorationData(e,t){t!==this.decorations.get(e)&&(this.decorations.set(e,t),this.dispatchEventToListeners(v.DecorationChanged,e))}getDecorationData(e){return this.decorations.get(e)}disableEdit(){this.disableEditInternal=!0}editDisabled(){return this.disableEditInternal}}var v;!function(e){e.WorkingCopyChanged="WorkingCopyChanged",e.WorkingCopyCommitted="WorkingCopyCommitted",e.TitleChanged="TitleChanged",e.MessageAdded="MessageAdded",e.MessageRemoved="MessageRemoved",e.DecorationChanged="DecorationChanged"}(v||(v={}));class f{uiSourceCode;lineNumber;columnNumber;constructor(e,t,n){this.uiSourceCode=e,this.lineNumber=t,this.columnNumber=n}linkText(e=!1,t=!1){const n=this.uiSourceCode.displayName(e),r=this.lineAndColumnText(t);return r?n+":"+r:n}lineAndColumnText(e=!1){let t;return"application/wasm"===this.uiSourceCode.mimeType()?"number"==typeof this.columnNumber&&(t=`0x${this.columnNumber.toString(16)}`):(t=`${this.lineNumber+1}`,e&&"number"==typeof this.columnNumber&&(t+=":"+(this.columnNumber+1))),t}id(){return"number"==typeof this.columnNumber?this.uiSourceCode.project().id()+":"+this.uiSourceCode.url()+":"+this.lineNumber+":"+this.columnNumber:this.lineId()}lineId(){return this.uiSourceCode.project().id()+":"+this.uiSourceCode.url()+":"+this.lineNumber}toUIString(){return this.uiSourceCode.url()+":"+(this.lineNumber+1)}static comparator(e,t){return e.compareTo(t)}compareTo(e){return this.uiSourceCode.url()!==e.uiSourceCode.url()?this.uiSourceCode.url()>e.uiSourceCode.url()?1:-1:this.lineNumber!==e.lineNumber?this.lineNumber-e.lineNumber:this.columnNumber===e.columnNumber?0:"number"!=typeof this.columnNumber?-1:"number"!=typeof e.columnNumber?1:this.columnNumber-e.columnNumber}}class w{levelInternal;textInternal;range;clickHandlerInternal;constructor(e,t,n,r){this.levelInternal=e,this.textInternal=t,this.range=r??new o.TextRange.TextRange(0,0,0,0),this.clickHandlerInternal=n}level(){return this.levelInternal}text(){return this.textInternal}clickHandler(){return this.clickHandlerInternal}lineNumber(){return this.range.startLine}columnNumber(){return this.range.startColumn}isEqual(e){return this.text()===e.text()&&this.level()===e.level()&&this.range.equal(e.range)}}var S=Object.freeze({__proto__:null,UISourceCode:k,get Events(){return v},UILocation:f,UILocationRange:class{uiSourceCode;range;constructor(e,t){this.uiSourceCode=e,this.range=t}},Message:w,LineMarker:class{rangeInternal;typeInternal;dataInternal;constructor(e,t,n){this.rangeInternal=e,this.typeInternal=t,this.dataInternal=n}range(){return this.rangeInternal}type(){return this.typeInternal}data(){return this.dataInternal}},UISourceCodeMetadata:class{modificationTime;contentSize;constructor(e,t){this.modificationTime=e,this.contentSize=t}}});export{a as FileManager,u as SearchConfig,S as UISourceCode,m as Workspace};
