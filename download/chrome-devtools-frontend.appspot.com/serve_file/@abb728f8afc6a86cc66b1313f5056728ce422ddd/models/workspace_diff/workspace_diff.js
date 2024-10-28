import*as e from"../../core/common/common.js";import*as t from"../../core/host/host.js";import*as i from"../../third_party/diff/diff.js";import*as o from"../formatter/formatter.js";import*as r from"../persistence/persistence.js";import*as s from"../text_utils/text_utils.js";import*as n from"../workspace/workspace.js";class d extends e.ObjectWrapper.ObjectWrapper{uiSourceCodeDiffs;loadingUISourceCodes;modifiedUISourceCodesInternal;constructor(e){super(),this.uiSourceCodeDiffs=new WeakMap,this.loadingUISourceCodes=new Map,this.modifiedUISourceCodesInternal=new Set,e.addEventListener(n.Workspace.Events.WorkingCopyChanged,this.uiSourceCodeChanged,this),e.addEventListener(n.Workspace.Events.WorkingCopyCommitted,this.uiSourceCodeChanged,this),e.addEventListener(n.Workspace.Events.UISourceCodeAdded,this.uiSourceCodeAdded,this),e.addEventListener(n.Workspace.Events.UISourceCodeRemoved,this.uiSourceCodeRemoved,this),e.addEventListener(n.Workspace.Events.ProjectRemoved,this.projectRemoved,this),e.uiSourceCodes().forEach(this.updateModifiedState.bind(this))}requestDiff(e,t){return this.uiSourceCodeDiff(e).requestDiff(t)}subscribeToDiffChange(e,t,i){this.uiSourceCodeDiff(e).addEventListener("DiffChanged",t,i)}unsubscribeFromDiffChange(e,t,i){this.uiSourceCodeDiff(e).removeEventListener("DiffChanged",t,i)}modifiedUISourceCodes(){return Array.from(this.modifiedUISourceCodesInternal)}isUISourceCodeModified(e){return this.modifiedUISourceCodesInternal.has(e)||this.loadingUISourceCodes.has(e)}uiSourceCodeDiff(e){let t=this.uiSourceCodeDiffs.get(e);return t||(t=new u(e),this.uiSourceCodeDiffs.set(e,t)),t}uiSourceCodeChanged(e){const t=e.data.uiSourceCode;this.updateModifiedState(t)}uiSourceCodeAdded(e){const t=e.data;this.updateModifiedState(t)}uiSourceCodeRemoved(e){const t=e.data;this.removeUISourceCode(t)}projectRemoved(e){const t=e.data;for(const e of t.uiSourceCodes())this.removeUISourceCode(e)}removeUISourceCode(e){this.loadingUISourceCodes.delete(e);const t=this.uiSourceCodeDiffs.get(e);t&&(t.dispose=!0),this.markAsUnmodified(e)}markAsUnmodified(e){this.uiSourceCodeProcessedForTest(),this.modifiedUISourceCodesInternal.delete(e)&&this.dispatchEventToListeners("ModifiedStatusChanged",{uiSourceCode:e,isModified:!1})}markAsModified(e){this.uiSourceCodeProcessedForTest(),this.modifiedUISourceCodesInternal.has(e)||(this.modifiedUISourceCodesInternal.add(e),this.dispatchEventToListeners("ModifiedStatusChanged",{uiSourceCode:e,isModified:!0}))}uiSourceCodeProcessedForTest(){}async updateModifiedState(e){if(this.loadingUISourceCodes.delete(e),e.project().type()!==n.Workspace.projectTypes.Network)return void this.markAsUnmodified(e);if(e.isDirty())return void this.markAsModified(e);if(!e.hasCommits())return void this.markAsUnmodified(e);const t=Promise.all([this.requestOriginalContentForUISourceCode(e),e.requestContent().then((e=>e.content))]);this.loadingUISourceCodes.set(e,t);const i=await t;this.loadingUISourceCodes.get(e)===t&&(this.loadingUISourceCodes.delete(e),null!==i[0]&&null!==i[1]&&i[0]!==i[1]?this.markAsModified(e):this.markAsUnmodified(e))}requestOriginalContentForUISourceCode(e){return this.uiSourceCodeDiff(e).originalContent()}revertToOriginal(e){return t.userMetrics.actionTaken(t.UserMetrics.Action.RevisionApplied),this.requestOriginalContentForUISourceCode(e).then((function(t){"string"==typeof t&&e.addRevision(t)}))}}class u extends e.ObjectWrapper.ObjectWrapper{uiSourceCode;requestDiffPromise;pendingChanges;dispose;constructor(e){super(),this.uiSourceCode=e,e.addEventListener(n.UISourceCode.Events.WorkingCopyChanged,this.uiSourceCodeChanged,this),e.addEventListener(n.UISourceCode.Events.WorkingCopyCommitted,this.uiSourceCodeChanged,this),this.requestDiffPromise=null,this.pendingChanges=null,this.dispose=!1}uiSourceCodeChanged(){this.pendingChanges&&(clearTimeout(this.pendingChanges),this.pendingChanges=null),this.requestDiffPromise=null;const e=this.uiSourceCode.content(),t=!e||e.length<65536?0:c;this.pendingChanges=window.setTimeout(function(){if(this.dispose)return;this.dispatchEventToListeners("DiffChanged"),this.pendingChanges=null}.bind(this),t)}requestDiff(e){return this.requestDiffPromise||(this.requestDiffPromise=this.innerRequestDiff(e)),this.requestDiffPromise}async originalContent(){const e=r.NetworkPersistenceManager.NetworkPersistenceManager.instance().originalContentForUISourceCode(this.uiSourceCode);if(e)return e;const t=await this.uiSourceCode.project().requestFileContent(this.uiSourceCode);return s.ContentData.ContentData.isError(t)?t.error:t.asDeferedContent().content}async innerRequestDiff({shouldFormatDiff:e}){if(this.dispose)return null;let t=await this.originalContent();if(null===t)return null;if(t.length>1048576)return null;if(this.dispose)return null;let r,s=this.uiSourceCode.workingCopy();if(s||this.uiSourceCode.contentLoaded()||(s=(await this.uiSourceCode.requestContent()).content),s.length>1048576)return null;if(this.dispose)return null;if(null===s||null===t)return null;if(e){t=(await o.ScriptFormatter.format(this.uiSourceCode.contentType(),this.uiSourceCode.mimeType(),t)).formattedContent;const e=await o.ScriptFormatter.format(this.uiSourceCode.contentType(),this.uiSourceCode.mimeType(),s);s=e.formattedContent,r=e.formattedMapping}const n=/\r\n?|\n/;return{diff:i.Diff.DiffWrapper.lineDiff(t.split(n),s.split(n)),formattedCurrentMapping:r}}}let a=null;const c=200;var f=Object.freeze({__proto__:null,WorkspaceDiffImpl:d,UISourceCodeDiff:u,workspaceDiff:function(){return a||(a=new d(n.Workspace.WorkspaceImpl.instance())),a},UpdateTimeout:c});export{f as WorkspaceDiff};