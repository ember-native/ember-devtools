import*as e from"../../core/sdk/sdk.js";import*as t from"../../core/common/common.js";import*as i from"../../core/i18n/i18n.js";import*as s from"../../ui/legacy/legacy.js";import*as n from"../../core/host/host.js";import*as o from"../../ui/components/icon_button/icon_button.js";const a=["left","middle","right","back","forward"],r={mousedown:"mousePressed",mouseup:"mouseReleased",mousemove:"mouseMoved"};class l extends e.SDKModel.SDKModel{inputAgent;activeMouseOffsetTop;constructor(e){super(e),this.inputAgent=e.inputAgent(),this.activeMouseOffsetTop=null}emitKeyEvent(e){let t;switch(e.type){case"keydown":t="keyDown";break;case"keyup":t="keyUp";break;case"keypress":t="char";break;default:return}const i="keypress"===e.type?String.fromCharCode(e.charCode):void 0;this.inputAgent.invoke_dispatchKeyEvent({type:t,modifiers:this.modifiersForEvent(e),text:i,unmodifiedText:i?i.toLowerCase():void 0,keyIdentifier:e.keyIdentifier,code:e.code,key:e.key,windowsVirtualKeyCode:e.keyCode,nativeVirtualKeyCode:e.keyCode,autoRepeat:e.repeat,isKeypad:3===e.location,isSystemKey:!1,location:3!==e.location?e.location:void 0})}emitMouseEvent(e,t,i){e.type in r&&("mousedown"!==e.type&&null!==this.activeMouseOffsetTop||(this.activeMouseOffsetTop=t),this.inputAgent.invoke_dispatchMouseEvent({type:r[e.type],x:Math.round(e.offsetX/i),y:Math.round(e.offsetY/i-this.activeMouseOffsetTop),modifiers:this.modifiersForEvent(e),button:a[e.button],clickCount:e.detail}),"mouseup"===e.type&&(this.activeMouseOffsetTop=null))}emitWheelEvent(e,t,i){null===this.activeMouseOffsetTop&&(this.activeMouseOffsetTop=t),this.inputAgent.invoke_dispatchMouseEvent({type:"mouseWheel",x:Math.round(e.offsetX/i),y:Math.round(e.offsetY/i-this.activeMouseOffsetTop),modifiers:this.modifiersForEvent(e),button:a[e.button],clickCount:e.detail,deltaX:e.deltaX/i,deltaY:e.deltaY/i})}modifiersForEvent(e){return Number(e.getModifierState("Alt"))|Number(e.getModifierState("Control"))<<1|Number(e.getModifierState("Meta"))<<2|Number(e.getModifierState("Shift"))<<3}}e.SDKModel.SDKModel.register(l,{capabilities:1024,autostart:!1});var h=Object.freeze({__proto__:null,InputModel:l});const d=new CSSStyleSheet;d.replaceSync(".screencast{overflow:hidden}.screencast-navigation{flex-direction:row;display:flex;align-items:center;position:relative;padding-left:1px;border-bottom:1px solid var(--sys-color-divider);background-origin:padding-box;background-clip:padding-box}.screencast-navigation button{border-width:0;padding:5px;width:28px;height:26px;background:none}.screencast-navigation button devtools-icon{width:100%;height:100%}.screencast-navigation button[disabled].navigation{opacity:50%}.screencast-navigation input{flex:1;margin:2px;max-height:19px}.screencast-navigation .progress{background-color:var(--sys-color-primary-bright);height:3px;left:0;position:absolute;top:100%;width:0;z-index:2}.screencast-viewport{display:flex;border:1px solid var(--sys-color-divider);border-radius:20px;flex:none;padding:20px;margin:auto;background-color:var(--sys-color-surface-variant)}.screencast-canvas-container{flex:auto;display:flex;border:1px solid var(--sys-color-divider);position:relative}.screencast-canvas-container.touchable{cursor:image-set(var(--image-file-touchCursor) 1x,var(--image-file-touchCursor_2x) 2x),default}.screencast canvas{flex:auto;position:relative}.screencast-element-title{position:absolute;z-index:10}.screencast-tag-name{color:var(--sys-color-token-tag)}.screencast-attribute{color:var(--sys-color-token-attribute)}.screencast-dimension{color:var(--sys-color-outline)}.screencast-glasspane{background-color:var(--color-background-opacity-80);font-size:30px;z-index:100;display:flex;justify-content:center;align-items:center}\n/*# sourceURL=screencastView.css */\n");const c={screencastViewOfDebugTarget:"Screencast view of debug target",theTabIsInactive:"The tab is inactive",profilingInProgress:"Profiling in progress",back:"back",forward:"forward",reload:"reload",addressBar:"Address bar",touchInput:"Use touch",mouseInput:"Use mouse"},g=i.i18n.registerUIStrings("panels/screencast/ScreencastView.ts",c),u=i.i18n.getLocalizedString.bind(void 0,g);class m extends s.Widget.VBox{screenCaptureModel;domModel;overlayModel;resourceTreeModel;networkManager;inputModel;shortcuts;scrollOffsetX;scrollOffsetY;screenZoom;screenOffsetTop;pageScaleFactor;imageElement;viewportElement;glassPaneElement;canvasElement;titleElement;context;imageZoom;tagNameElement;attributeElement;nodeWidthElement;nodeHeightElement;model;highlightConfig;navigationUrl;navigationBack;navigationForward;canvasContainerElement;isCasting;checkerboardPattern;targetInactive;deferredCasting;highlightNode;config;node;inspectModeConfig;navigationBar;navigationReload;navigationProgressBar;touchInputToggle;mouseInputToggle;touchInputToggleIcon;mouseInputToggleIcon;historyIndex;historyEntries;constructor(t){super(),this.screenCaptureModel=t,this.domModel=t.target().model(e.DOMModel.DOMModel),this.overlayModel=t.target().model(e.OverlayModel.OverlayModel),this.resourceTreeModel=t.target().model(e.ResourceTreeModel.ResourceTreeModel),this.networkManager=t.target().model(e.NetworkManager.NetworkManager),this.inputModel=t.target().model(l),this.setMinimumSize(150,150),this.shortcuts={},this.scrollOffsetX=0,this.scrollOffsetY=0,this.screenZoom=1,this.screenOffsetTop=0,this.pageScaleFactor=1,this.imageZoom=1}initialize(){this.element.classList.add("screencast"),this.createNavigationBar(),this.viewportElement=this.element.createChild("div","screencast-viewport hidden"),this.canvasContainerElement=this.viewportElement.createChild("div","screencast-canvas-container"),this.glassPaneElement=this.canvasContainerElement.createChild("div","screencast-glasspane fill hidden"),this.canvasElement=this.canvasContainerElement.createChild("canvas"),s.ARIAUtils.setLabel(this.canvasElement,u(c.screencastViewOfDebugTarget)),this.canvasElement.tabIndex=0,this.canvasElement.addEventListener("mousedown",this.handleMouseEvent.bind(this),!1),this.canvasElement.addEventListener("mouseup",this.handleMouseEvent.bind(this),!1),this.canvasElement.addEventListener("mousemove",this.handleMouseEvent.bind(this),!1),this.canvasElement.addEventListener("wheel",this.handleWheelEvent.bind(this),!1),this.canvasElement.addEventListener("click",this.handleMouseEvent.bind(this),!1),this.canvasElement.addEventListener("contextmenu",this.handleContextMenuEvent.bind(this),!1),this.canvasElement.addEventListener("keydown",this.handleKeyEvent.bind(this),!1),this.canvasElement.addEventListener("keyup",this.handleKeyEvent.bind(this),!1),this.canvasElement.addEventListener("keypress",this.handleKeyEvent.bind(this),!1),this.canvasElement.addEventListener("blur",this.handleBlurEvent.bind(this),!1),this.titleElement=this.canvasContainerElement.createChild("div","screencast-element-title monospace hidden"),this.tagNameElement=this.titleElement.createChild("span","screencast-tag-name"),this.attributeElement=this.titleElement.createChild("span","screencast-attribute"),s.UIUtils.createTextChild(this.titleElement," ");const t=this.titleElement.createChild("span","screencast-dimension");this.nodeWidthElement=t.createChild("span"),s.UIUtils.createTextChild(t," × "),this.nodeHeightElement=t.createChild("span"),this.titleElement.style.top="0",this.titleElement.style.left="0",this.imageElement=new Image,this.isCasting=!1,this.context=this.canvasElement.getContext("2d"),this.checkerboardPattern=this.createCheckerboardPattern(this.context),this.shortcuts[s.KeyboardShortcut.KeyboardShortcut.makeKey("l",s.KeyboardShortcut.Modifiers.Ctrl)]=this.focusNavigationBar.bind(this),e.TargetManager.TargetManager.instance().addEventListener("SuspendStateChanged",this.onSuspendStateChange,this),this.updateGlasspane()}wasShown(){this.startCasting(),this.registerCSSFiles([d])}willHide(){this.stopCasting()}startCasting(){if(e.TargetManager.TargetManager.instance().allTargetsSuspended())return;if(this.isCasting)return;this.isCasting=!0;const t=this.viewportDimensions();t.width<0||t.height<0?this.isCasting=!1:(t.width*=window.devicePixelRatio,t.height*=window.devicePixelRatio,this.screenCaptureModel.startScreencast("jpeg",80,Math.floor(Math.min(2048,t.width)),Math.floor(Math.min(2048,t.height)),void 0,this.screencastFrame.bind(this),this.screencastVisibilityChanged.bind(this)),this.overlayModel&&this.overlayModel.setHighlighter(this))}stopCasting(){if(this.isCasting){this.isCasting=!1,this.screenCaptureModel.stopScreencast();for(const t of e.TargetManager.TargetManager.instance().models(e.EmulationModel.EmulationModel))t.overrideEmulateTouch(!1);this.overlayModel&&this.overlayModel.setHighlighter(null)}}screencastFrame(e,t){this.imageElement.onload=()=>{this.pageScaleFactor=t.pageScaleFactor,this.screenOffsetTop=t.offsetTop,this.scrollOffsetX=t.scrollOffsetX,this.scrollOffsetY=t.scrollOffsetY;const e=t.deviceHeight/t.deviceWidth,i=this.viewportDimensions();this.imageZoom=Math.min(i.width/this.imageElement.naturalWidth,i.height/(this.imageElement.naturalWidth*e)),this.viewportElement.classList.remove("hidden");const s=p;this.imageZoom<1.01/window.devicePixelRatio&&(this.imageZoom=1/window.devicePixelRatio),this.screenZoom=this.imageElement.naturalWidth*this.imageZoom/t.deviceWidth,this.viewportElement.style.width=t.deviceWidth*this.screenZoom+s+"px",this.viewportElement.style.height=t.deviceHeight*this.screenZoom+s+"px";const n=this.highlightNode?{node:this.highlightNode,selectorList:void 0}:{clear:!0};this.updateHighlightInOverlayAndRepaint(n,this.highlightConfig)},this.imageElement.src="data:image/jpg;base64,"+e}isGlassPaneActive(){return!this.glassPaneElement.classList.contains("hidden")}screencastVisibilityChanged(e){this.targetInactive=!e,this.updateGlasspane()}onSuspendStateChange(){e.TargetManager.TargetManager.instance().allTargetsSuspended()?this.stopCasting():this.startCasting(),this.updateGlasspane()}updateGlasspane(){this.targetInactive?(this.glassPaneElement.textContent=u(c.theTabIsInactive),this.glassPaneElement.classList.remove("hidden")):e.TargetManager.TargetManager.instance().allTargetsSuspended()?(this.glassPaneElement.textContent=u(c.profilingInProgress),this.glassPaneElement.classList.remove("hidden")):this.glassPaneElement.classList.add("hidden")}async handleMouseEvent(e){if(this.isGlassPaneActive())return void e.consume();if(!this.pageScaleFactor||!this.domModel)return;if(!this.inspectModeConfig)return this.inputModel&&this.inputModel.emitMouseEvent(e,this.screenOffsetTop,this.screenZoom),e.preventDefault(),void("mousedown"===e.type&&this.canvasElement.focus());const i=this.convertIntoScreenSpace(e),s=await this.domModel.nodeForLocation(Math.floor(i.x/this.pageScaleFactor+this.scrollOffsetX),Math.floor(i.y/this.pageScaleFactor+this.scrollOffsetY),t.Settings.Settings.instance().moduleSetting("show-ua-shadow-dom").get());s&&("mousemove"===e.type?(this.updateHighlightInOverlayAndRepaint({node:s,selectorList:void 0},this.inspectModeConfig),this.domModel.overlayModel().nodeHighlightRequested({nodeId:s.id})):"click"===e.type&&this.domModel.overlayModel().inspectNodeRequested({backendNodeId:s.backendNodeId()}))}async handleWheelEvent(e){this.isGlassPaneActive()?e.consume():this.pageScaleFactor&&this.domModel&&(this.inputModel&&this.inputModel.emitWheelEvent(e,this.screenOffsetTop,this.screenZoom),e.preventDefault())}handleKeyEvent(e){if(this.isGlassPaneActive())return void e.consume();const t=s.KeyboardShortcut.KeyboardShortcut.makeKeyFromEvent(e),i=this.shortcuts[t];i&&i(e)?e.consume():(this.inputModel&&this.inputModel.emitKeyEvent(e),e.consume(),this.canvasElement.focus())}handleBlurEvent(){if(this.inputModel&&this.mouseInputToggle?.disabled){const e=new MouseEvent("mouseup");this.inputModel.emitMouseEvent(e,this.screenOffsetTop,this.screenZoom)}}handleContextMenuEvent(e){e.consume(!0)}convertIntoScreenSpace(e){return{x:Math.round(e.offsetX/this.screenZoom),y:Math.round(e.offsetY/this.screenZoom-this.screenOffsetTop)}}onResize(){this.deferredCasting&&(clearTimeout(this.deferredCasting),delete this.deferredCasting),this.stopCasting(),this.deferredCasting=window.setTimeout(this.startCasting.bind(this),100)}highlightInOverlay(e,t){this.updateHighlightInOverlayAndRepaint(e,t)}async updateHighlightInOverlayAndRepaint(t,i){let s=null;if("node"in t&&(s=t.node),!s&&"deferredNode"in t&&(s=await t.deferredNode.resolvePromise()),!s&&"object"in t){const i=t.object.runtimeModel().target().model(e.DOMModel.DOMModel);i&&(s=await i.pushObjectAsNodeToFrontend(t.object))}if(this.highlightNode=s,this.highlightConfig=i,!s)return this.model=null,this.config=null,this.node=null,this.titleElement.classList.add("hidden"),void this.repaint();this.node=s,s.boxModel().then((e=>{e&&this.pageScaleFactor?(this.model=this.scaleModel(e),this.config=i,this.repaint()):this.repaint()}))}scaleModel(e){function t(e){for(let t=0;t<e.length;t+=2)e[t]=e[t]*this.pageScaleFactor*this.screenZoom,e[t+1]=(e[t+1]*this.pageScaleFactor+this.screenOffsetTop)*this.screenZoom}return t.call(this,e.content),t.call(this,e.padding),t.call(this,e.border),t.call(this,e.margin),e}repaint(){const e=this.model,t=this.config,i=this.canvasElement.getBoundingClientRect().width,s=this.canvasElement.getBoundingClientRect().height;if(this.canvasElement.width=window.devicePixelRatio*i,this.canvasElement.height=window.devicePixelRatio*s,this.context.save(),this.context.scale(window.devicePixelRatio,window.devicePixelRatio),this.context.save(),this.checkerboardPattern&&(this.context.fillStyle=this.checkerboardPattern),this.context.fillRect(0,0,i,this.screenOffsetTop*this.screenZoom),this.context.fillRect(0,this.screenOffsetTop*this.screenZoom+this.imageElement.naturalHeight*this.imageZoom,i,s),this.context.restore(),e&&t){this.context.save();const i=[],s=e=>Boolean(e.a&&0===e.a);e.content&&t.contentColor&&!s(t.contentColor)&&i.push({quad:e.content,color:t.contentColor}),e.padding&&t.paddingColor&&!s(t.paddingColor)&&i.push({quad:e.padding,color:t.paddingColor}),e.border&&t.borderColor&&!s(t.borderColor)&&i.push({quad:e.border,color:t.borderColor}),e.margin&&t.marginColor&&!s(t.marginColor)&&i.push({quad:e.margin,color:t.marginColor});for(let e=i.length-1;e>0;--e)this.drawOutlinedQuadWithClip(i[e].quad,i[e-1].quad,i[e].color);i.length>0&&this.drawOutlinedQuad(i[0].quad,i[0].color),this.context.restore(),this.drawElementTitle(),this.context.globalCompositeOperation="destination-over"}this.context.drawImage(this.imageElement,0,this.screenOffsetTop*this.screenZoom,this.imageElement.naturalWidth*this.imageZoom,this.imageElement.naturalHeight*this.imageZoom),this.context.restore()}cssColor(e){return e?t.Color.Legacy.fromRGBA([e.r,e.g,e.b,void 0!==e.a?e.a:1]).asString("rgba")||"":"transparent"}quadToPath(e){return this.context.beginPath(),this.context.moveTo(e[0],e[1]),this.context.lineTo(e[2],e[3]),this.context.lineTo(e[4],e[5]),this.context.lineTo(e[6],e[7]),this.context.closePath(),this.context}drawOutlinedQuad(e,t){this.context.save(),this.context.lineWidth=2,this.quadToPath(e).clip(),this.context.fillStyle=this.cssColor(t),this.context.fill(),this.context.restore()}drawOutlinedQuadWithClip(e,t,i){this.context.fillStyle=this.cssColor(i),this.context.save(),this.context.lineWidth=0,this.quadToPath(e).fill(),this.context.globalCompositeOperation="destination-out",this.context.fillStyle="red",this.quadToPath(t).fill(),this.context.restore()}drawElementTitle(){if(!this.node)return;const e=this.canvasElement.getBoundingClientRect().width,t=this.canvasElement.getBoundingClientRect().height,i=this.node.localName()||this.node.nodeName().toLowerCase();this.tagNameElement.textContent=i,this.attributeElement.textContent=function(e){const t=e.getAttribute("id"),i=e.getAttribute("class");let s=t?"#"+t:"";i&&(s+="."+i.trim().replace(/\s+/g,"."));s.length>50&&(s=s.substring(0,50)+"…");return s}(this.node),this.nodeWidthElement.textContent=String(this.model?this.model.width:0),this.nodeHeightElement.textContent=String(this.model?this.model.height:0),this.titleElement.classList.remove("hidden");const s=this.titleElement.offsetWidth+6,n=this.titleElement.offsetHeight+4,o=this.model?this.model.margin[1]:0,a=this.model?this.model.margin[7]:0;let r,l=!1,h=!1,d=Math.max(2,this.model?this.model.margin[0]:0);d+s>e&&(d=e-s-2),o>t?(r=t-n-7,h=!0):a<0?(r=7,l=!0):a+n+7<t?(r=a+7-4,l=!0):o-n-7>0?(r=o-n-7+3,h=!0):r=7,this.context.save(),this.context.translate(.5,.5),this.context.beginPath(),this.context.moveTo(d,r),l&&(this.context.lineTo(d+14,r),this.context.lineTo(d+21,r-7),this.context.lineTo(d+28,r)),this.context.lineTo(d+s,r),this.context.lineTo(d+s,r+n),h&&(this.context.lineTo(d+28,r+n),this.context.lineTo(d+21,r+n+7),this.context.lineTo(d+14,r+n)),this.context.lineTo(d,r+n),this.context.closePath(),this.context.fillStyle="var(--sys-color-yellow-container)",this.context.fill(),this.context.strokeStyle="var(--sys-color-outline)",this.context.stroke(),this.context.restore(),this.titleElement.style.top=r+3+"px",this.titleElement.style.left=d+3+"px"}viewportDimensions(){const e=p;return{width:this.element.offsetWidth-e-30,height:this.element.offsetHeight-e-30-v}}setInspectMode(e,t){return this.inspectModeConfig="none"!==e?t:null,Promise.resolve()}highlightFrame(e){}createCheckerboardPattern(e){const t=document.createElement("canvas"),i=32;t.width=64,t.height=64;const s=t.getContext("2d");return s.fillStyle="var(--sys-color-neutral-outline)",s.fillRect(0,0,64,64),s.fillStyle="var(--sys-color-surface-variant)",s.fillRect(0,0,i,i),s.fillRect(i,i,i,i),e.createPattern(t,"repeat")}createNavigationBar(){this.navigationBar=this.element.createChild("div","screencast-navigation"),this.navigationBack=this.navigationBar.createChild("button","navigation");this.navigationBack.appendChild(new o.Icon.Icon).data={color:"var(--icon-default)",iconName:"arrow-back"};this.navigationBack.disabled=!0,s.ARIAUtils.setLabel(this.navigationBack,u(c.back)),this.navigationForward=this.navigationBar.createChild("button","navigation");this.navigationForward.appendChild(new o.Icon.Icon).data={color:"var(--icon-default)",iconName:"arrow-forward"};this.navigationForward.disabled=!0,s.ARIAUtils.setLabel(this.navigationForward,u(c.forward)),this.navigationReload=this.navigationBar.createChild("button","navigation");this.navigationReload.appendChild(new o.Icon.Icon).data={color:"var(--icon-default)",iconName:"refresh"};s.ARIAUtils.setLabel(this.navigationReload,u(c.reload)),this.navigationUrl=this.navigationBar.appendChild(s.UIUtils.createInput()),this.navigationUrl.type="text",s.ARIAUtils.setLabel(this.navigationUrl,u(c.addressBar)),this.mouseInputToggle=this.navigationBar.createChild("button"),this.mouseInputToggle.disabled=!0,this.mouseInputToggleIcon=this.mouseInputToggle.appendChild(new o.Icon.Icon),this.mouseInputToggleIcon.data={color:"var(--icon-toggled)",iconName:"mouse"},s.ARIAUtils.setLabel(this.mouseInputToggle,u(c.mouseInput)),this.touchInputToggle=this.navigationBar.createChild("button"),this.touchInputToggleIcon=this.touchInputToggle.appendChild(new o.Icon.Icon),this.touchInputToggleIcon.data={color:"var(--icon-default)",iconName:"touch-app"},s.ARIAUtils.setLabel(this.touchInputToggle,u(c.touchInput)),this.navigationProgressBar=new b(this.resourceTreeModel,this.networkManager,this.navigationBar.createChild("div","progress")),this.resourceTreeModel&&(this.navigationBack.addEventListener("click",this.navigateToHistoryEntry.bind(this,-1),!1),this.navigationForward.addEventListener("click",this.navigateToHistoryEntry.bind(this,1),!1),this.navigationReload.addEventListener("click",this.navigateReload.bind(this),!1),this.navigationUrl.addEventListener("keyup",this.navigationUrlKeyUp.bind(this),!0),this.touchInputToggle.addEventListener("click",this.#e.bind(this,!0),!1),this.mouseInputToggle.addEventListener("click",this.#e.bind(this,!1),!1),this.requestNavigationHistory(),this.resourceTreeModel.addEventListener(e.ResourceTreeModel.Events.PrimaryPageChanged,this.requestNavigationHistoryEvent,this),this.resourceTreeModel.addEventListener(e.ResourceTreeModel.Events.CachedResourcesLoaded,this.requestNavigationHistoryEvent,this))}navigateToHistoryEntry(e){if(!this.resourceTreeModel)return;const t=(this.historyIndex||0)+e;!this.historyEntries||t<0||t>=this.historyEntries.length||(this.resourceTreeModel.navigateToHistoryEntry(this.historyEntries[t]),this.requestNavigationHistory())}navigateReload(){this.resourceTreeModel&&this.resourceTreeModel.reloadPage()}navigationUrlKeyUp(e){if("Enter"!==e.key)return;let t=this.navigationUrl.value;t&&(t.match(E)||(t="http://"+t),this.resourceTreeModel&&this.resourceTreeModel.navigate(t),this.canvasElement.focus())}#e(t){if(!(this.canvasContainerElement&&this.isCasting&&this.mouseInputToggle&&this.touchInputToggle&&this.mouseInputToggleIcon&&this.touchInputToggleIcon))return;const i=e.TargetManager.TargetManager.instance().models(e.EmulationModel.EmulationModel);for(const e of i)e.overrideEmulateTouch(t);this.mouseInputToggle.disabled=!t,this.touchInputToggle.disabled=t,this.mouseInputToggleIcon.data={...this.mouseInputToggleIcon.data,color:this.mouseInputToggle.disabled?"var(--icon-toggled)":"var(--icon-default)"},this.touchInputToggleIcon.data={...this.touchInputToggleIcon.data,color:this.touchInputToggle.disabled?"var(--icon-toggled)":"var(--icon-default)"},this.canvasContainerElement.classList.toggle("touchable",t)}requestNavigationHistoryEvent(){this.requestNavigationHistory()}async requestNavigationHistory(){const e=this.resourceTreeModel?await this.resourceTreeModel.navigationHistory():null;if(!e)return;this.historyIndex=e.currentIndex,this.historyEntries=e.entries,this.navigationBack.disabled=0===this.historyIndex,this.navigationForward.disabled=this.historyIndex===this.historyEntries.length-1;let t=this.historyEntries[this.historyIndex].url;const i=t.match(f);i&&(t=i[1]),n.InspectorFrontendHost.InspectorFrontendHostInstance.inspectedURLChanged(t),this.navigationUrl.value=decodeURI(t)}focusNavigationBar(){return this.navigationUrl.focus(),this.navigationUrl.select(),!0}}const p=44,v=29,f=/^http:\/\/(.+)/,E=/^(https?|about|chrome):/;class b{element;requestIds;startedRequests;finishedRequests;maxDisplayedProgress;constructor(t,i,s){this.element=s,t&&(t.addEventListener(e.ResourceTreeModel.Events.PrimaryPageChanged,this.onPrimaryPageChanged,this),t.addEventListener(e.ResourceTreeModel.Events.Load,this.onLoad,this)),i&&(i.addEventListener(e.NetworkManager.Events.RequestStarted,this.onRequestStarted,this),i.addEventListener(e.NetworkManager.Events.RequestFinished,this.onRequestFinished,this)),this.requestIds=null,this.startedRequests=0,this.finishedRequests=0,this.maxDisplayedProgress=0}onPrimaryPageChanged(){this.requestIds=new Map,this.startedRequests=0,this.finishedRequests=0,this.maxDisplayedProgress=0,this.updateProgress(.1)}onLoad(){this.requestIds=null,this.updateProgress(1),window.setTimeout((()=>{this.navigationProgressVisible()||this.displayProgress(0)}),500)}navigationProgressVisible(){return null!==this.requestIds}onRequestStarted(e){if(!this.navigationProgressVisible())return;const i=e.data.request;i.resourceType()!==t.ResourceType.resourceTypes.WebSocket&&(this.requestIds&&this.requestIds.set(i.requestId(),i),++this.startedRequests)}onRequestFinished(e){if(!this.navigationProgressVisible())return;const t=e.data;this.requestIds&&!this.requestIds.has(t.requestId())||(++this.finishedRequests,window.setTimeout((()=>{this.updateProgress(this.finishedRequests/this.startedRequests*.9)}),500))}updateProgress(e){this.navigationProgressVisible()&&(this.maxDisplayedProgress>=e||(this.maxDisplayedProgress=e,this.displayProgress(e)))}displayProgress(e){this.element.style.width=100*e+"%"}}var y=Object.freeze({__proto__:null,ScreencastView:m,BORDERS_SIZE:p,NAVBAR_HEIGHT:v,HTTP_REGEX:f,SCHEME_REGEX:E,ProgressTracker:b});const M={toggleScreencast:"Toggle screencast"},w=i.i18n.registerUIStrings("panels/screencast/ScreencastApp.ts",M),T=i.i18n.getLocalizedString.bind(void 0,w);let C,x,I;class S{enabledSetting;toggleButton;rootSplitWidget;screenCaptureModel;screencastView;rootView;constructor(){this.enabledSetting=t.Settings.Settings.instance().createSetting("screencast-enabled",!0),this.toggleButton=new s.Toolbar.ToolbarToggle(T(M.toggleScreencast),"devices"),this.toggleButton.setToggled(this.enabledSetting.get()),this.toggleButton.setEnabled(!1),this.toggleButton.addEventListener("Click",this.toggleButtonClicked,this),e.TargetManager.TargetManager.instance().observeModels(e.ScreenCaptureModel.ScreenCaptureModel,this)}static instance(){return C||(C=new S),C}presentUI(e){this.rootView=new s.RootView.RootView,this.rootSplitWidget=new s.SplitWidget.SplitWidget(!1,!0,"inspector-view.screencast-split-view-state",300,300),this.rootSplitWidget.setVertical(!0),this.rootSplitWidget.setSecondIsSidebar(!0),this.rootSplitWidget.show(this.rootView.element),this.rootSplitWidget.hideMain(),this.rootSplitWidget.setSidebarWidget(s.InspectorView.InspectorView.instance()),s.InspectorView.InspectorView.instance().setOwnerSplit(this.rootSplitWidget),this.rootView.attachToDocument(e),this.rootView.focus()}modelAdded(t){t.target()===e.TargetManager.TargetManager.instance().primaryPageTarget()&&(this.screenCaptureModel=t,this.toggleButton.setEnabled(!0),this.screencastView=new m(t),this.rootSplitWidget&&this.rootSplitWidget.setMainWidget(this.screencastView),this.screencastView.initialize(),this.onScreencastEnabledChanged())}modelRemoved(e){this.screenCaptureModel===e&&(delete this.screenCaptureModel,this.toggleButton.setEnabled(!1),this.screencastView&&(this.screencastView.detach(),delete this.screencastView),this.onScreencastEnabledChanged())}toggleButtonClicked(){const e=!this.toggleButton.isToggled();this.enabledSetting.set(e),this.onScreencastEnabledChanged()}onScreencastEnabledChanged(){if(!this.rootSplitWidget)return;const e=Boolean(this.enabledSetting.get()&&this.screencastView);this.toggleButton.setToggled(e),e?this.rootSplitWidget.showBoth():this.rootSplitWidget.hideMain()}}class k{static instance(e={forceNew:!1}){const{forceNew:t}=e;return x&&!t||(x=new k),x}item(){return S.instance().toggleButton}}class R{static instance(e={forceNew:!1}){const{forceNew:t}=e;return I&&!t||(I=new R),I}createApp(){return S.instance()}}var P=Object.freeze({__proto__:null,ScreencastApp:S,ToolbarButtonProvider:k,ScreencastAppProvider:R});export{h as InputModel,P as ScreencastApp,y as ScreencastView};
