var e=Object.freeze({__proto__:null,defaults:()=>({includeRuntimeCallStats:!1,showAllEvents:!1,debugMode:!1,maxInvalidationEventsPerEvent:20}),configToCacheKey:function(e){return JSON.stringify(e)}});const n=["primary","primary-light","primary-dark","secondary","secondary-light","secondary-dark","tertiary","tertiary-light","tertiary-dark","error"];function t(e){return"marker"===e.dataType}function r(e){const n="track"in e&&Boolean(e.track);return("track-entry"===e.dataType||void 0===e.dataType)&&n}var a=Object.freeze({__proto__:null,colorIsValid:function(e){return n.includes(e)},isExtensionPayloadMarker:t,isExtensionPayloadTrackEntry:r,isValidExtensionPayload:function(e){return t(e)||r(e)},isSyntheticExtensionEntry:function(e){return"devtools.extension"===e.cat}});var i=Object.freeze({__proto__:null,isTimeRangeAnnotation:function(e){return"TIME_RANGE"===e.type},isEntryLabelAnnotation:function(e){return"ENTRY_LABEL"===e.type},isEntriesLinkAnnotation:function(e){return"ENTRIES_LINK"===e.type},traceEventKeyToValues:function(e){const n=e.split("-");switch(n[0]){case"p":if(5!==n.length||!n.every(((e,n)=>0===n||"number"==typeof e||!isNaN(parseInt(e,10)))))throw new Error(`Invalid ProfileCallKey: ${e}`);return{type:n[0],processID:parseInt(n[1],10),threadID:parseInt(n[2],10),sampleIndex:parseInt(n[3],10),protocol:parseInt(n[4],10)};case"r":if(2!==n.length||"number"!=typeof n[1]&&isNaN(parseInt(n[1],10)))throw new Error(`Invalid RawEvent Key: ${e}`);return{type:n[0],rawIndex:parseInt(n[1],10)};case"s":if(2!==n.length||"number"!=typeof n[1]&&isNaN(parseInt(n[1],10)))throw new Error(`Invalid SyntheticEvent Key: ${e}`);return{type:n[0],rawIndex:parseInt(n[1],10)};default:throw new Error(`Unknown trace event key: ${e}`)}}});var o=Object.freeze({__proto__:null,MicroSeconds:function(e){return e},MilliSeconds:function(e){return e},Seconds:function(e){return e}});function c(e){return"b"===e||"e"===e||"n"===e}const u=[I,S,h,g,y,T];const s=[...u,k];function m(e){return"ScheduleStyleInvalidationTracking"===e.name}function f(e){return"StyleRecalcInvalidationTracking"===e.name}function l(e){return"StyleInvalidatorInvalidationTracking"===e.name}function v(e){return"X"===e.ph}function d(e){return"I"===e.ph}function T(e){return"navigationStart"===e.name}function E(e){return"LayoutShift"===e.name}function p(e){return"LayoutInvalidationTracking"===e.name}function g(e){return"firstContentfulPaint"===e.name}function y(e){return"largestContentfulPaint::Candidate"===e.name}function S(e){return"MarkLoad"===e.name}function h(e){return"firstPaint"===e.name}function I(e){return"MarkDOMContent"===e.name}function k(e){return"InteractiveTime"===e.name}function R(e){return"EventTiming"===e.name}function C(e){return"SyntheticNetworkRequest"===e.name}function P(e){return"SyntheticWebSocketConnectionEvent"===e.name}function b(e){return"blink.user_timing"===e.cat}const L=new Set(["b","n","e","T","S","F","p"]);function F(e){return L.has(e.ph)}function w(e){return"WebSocketCreate"===e.name}function W(e){return"WebSocketSendHandshakeRequest"===e.name||"WebSocketReceiveHandshakeResponse"===e.name||"WebSocketDestroy"===e.name}function M(e){return"WebSocketSend"===e.name||"WebSocketReceive"===e.name}function D(e){return w(e)||W(e)||M(e)}var N=Object.freeze({__proto__:null,isNestableAsyncPhase:c,isAsyncPhase:function(e){return c(e)||"S"===e||"T"===e||"F"===e||"p"===e},isFlowPhase:function(e){return"s"===e||"t"===e||"f"===e},objectIsTraceEventCallFrame:function(e){return"functionName"in e&&"string"==typeof e.functionName&&"scriptId"in e&&("string"==typeof e.scriptId||"number"==typeof e.scriptId)&&"columnNumber"in e&&"number"==typeof e.columnNumber&&"lineNumber"in e&&"number"==typeof e.lineNumber&&"url"in e&&"string"==typeof e.url},isTraceEventRunTask:function(e){return"RunTask"===e.name},isTraceEventAuctionWorkletRunningInProcess:function(e){return"AuctionWorkletRunningInProcess"===e.name},isTraceEventAuctionWorkletDoneWithProcess:function(e){return"AuctionWorkletDoneWithProcess"===e.name},isTraceEventScreenshot:function(e){return"Screenshot"===e.name},MarkerName:["MarkDOMContent","MarkLoad","firstPaint","firstContentfulPaint","largestContentfulPaint::Candidate"],isTraceEventMarkerEvent:function(e){return u.some((n=>n(e)))},eventIsPageLoadEvent:function(e){return s.some((n=>n(e)))},isTraceEventTracingSessionIdForWorker:function(e){return"TracingSessionIdForWorker"===e.name},isTraceEventScheduleStyleInvalidationTracking:m,isTraceEventStyleRecalcInvalidationTracking:f,isTraceEventStyleInvalidatorInvalidationTracking:l,isTraceEventBeginCommitCompositorFrame:function(e){return"BeginCommitCompositorFrame"===e.name},isTraceEventParseMetaViewport:function(e){return"ParseMetaViewport"===e.name},isTraceEventScheduleStyleRecalculation:function(e){return"ScheduleStyleRecalculation"===e.name},isTraceEventRenderFrameImplCreateChildFrame:function(e){return"RenderFrameImpl::createChildFrame"===e.name},isTraceEventTargetRundown:function(e){if("disabled-by-default-devtools.target-rundown"!==e.cat)return!1;const n=e.args?.data;return!!n&&("frame"in n&&"frameType"in n&&"url"in n&&"isolate"in n&&"v8context"in n&&"scriptId"in n)},isTraceEventScriptRundown:function(e){if("disabled-by-default-devtools.v8-source-rundown"!==e.cat)return!1;const n=e.args?.data;return!!n&&("isolate"in n&&"executionContextId"in n&&"scriptId"in n&&"startLine"in n&&"startColumn"in n&&"endLine"in n&&"endColumn"in n&&"hash"in n&&"isModule"in n&&"hasSourceUrl"in n)},isTraceEventScriptRundownSource:function(e){if("disabled-by-default-devtools.v8-source-rundown-sources"!==e.cat)return!1;const n=e.args?.data;return!!n&&("isolate"in n&&"scriptId"in n&&"sourceText"in n)},isTraceEventPipelineReporter:function(e){return"PipelineReporter"===e.name},isSyntheticBasedEvent:function(e){return"rawSourceEvent"in e},isSyntheticInteractionEvent:function(e){return Boolean("interactionId"in e&&e.args?.data&&"beginEvent"in e.args.data&&"endEvent"in e.args.data)},isTraceEventDrawFrame:function(e){return"DrawFrame"===e.name&&"I"===e.ph},isLegacyTraceEventDrawFrameBegin:function(e){return"DrawFrame"===e.name&&"b"===e.ph},isTraceEventBeginFrame:function(e){return Boolean("BeginFrame"===e.name&&e.args&&"frameSeqId"in e.args)},isTraceEventDroppedFrame:function(e){return Boolean("DroppedFrame"===e.name&&e.args&&"frameSeqId"in e.args)},isTraceEventRequestMainThreadFrame:function(e){return"RequestMainThreadFrame"===e.name},isTraceEventBeginMainThreadFrame:function(e){return"BeginMainThreadFrame"===e.name},isTraceEventNeedsBeginFrameChanged:function(e){return"NeedsBeginFrameChanged"===e.name},isTraceEventCommit:function(e){return Boolean("Commit"===e.name&&e.args&&"frameSeqId"in e.args)},isTraceEventRasterTask:function(e){return"RasterTask"===e.name},isTraceEventCompositeLayers:function(e){return"CompositeLayers"===e.name},isTraceEventActivateLayerTree:function(e){return"ActivateLayerTree"===e.name},isTraceEventInvalidationTracking:function(e){return m(e)||f(e)||l(e)||p(e)},isTraceEventDrawLazyPixelRef:function(e){return"Draw LazyPixelRef"===e.name},isTraceEventDecodeLazyPixelRef:function(e){return"Decode LazyPixelRef"===e.name},isTraceEventDecodeImage:function(e){return"Decode Image"===e.name},isTraceEventSelectorStats:function(e){return"SelectorStats"===e.name},isTraceEventUpdateLayoutTree:function(e){return"UpdateLayoutTree"===e.name},isTraceEventLayout:function(e){return"Layout"===e.name},isTraceEventInvalidateLayout:function(e){return"InvalidateLayout"===e.name},ProfileID:function(e){return e},CallFrameID:function(e){return e},SampleIndex:function(e){return e},ProcessID:function(e){return e},ThreadID:function(e){return e},WorkerId:function(e){return e},isTraceEventComplete:v,isTraceEventBegin:function(e){return"B"===e.ph},isTraceEventEnd:function(e){return"E"===e.ph},isTraceEventDispatch:function(e){return"EventDispatch"===e.name},isTraceEventInstant:d,isTraceEventRendererEvent:function(e){return d(e)||v(e)},isTraceEventFireIdleCallback:function(e){return"FireIdleCallback"===e.name},isTraceEventSchedulePostMessage:function(e){return"SchedulePostMessage"===e.name},isTraceEventHandlePostMessage:function(e){return"HandlePostMessage"===e.name},isTraceEventUpdateCounters:function(e){return"UpdateCounters"===e.name},isThreadName:function(e){return"thread_name"===e.name},isProcessName:function(e){return"process_name"===e.name},isTraceEventTracingStartedInBrowser:function(e){return"TracingStartedInBrowser"===e.name},isTraceEventFrameCommittedInBrowser:function(e){return"FrameCommittedInBrowser"===e.name},isTraceEventCommitLoad:function(e){return"CommitLoad"===e.name},isTraceEventNavigationStart:T,isTraceEventAnimation:function(e){return"Animation"===e.name&&e.cat.includes("devtools.timeline")},isTraceEventLayoutShift:E,isTraceEventLayoutInvalidationTracking:p,isTraceEventFirstContentfulPaint:g,isTraceEventLargestContentfulPaintCandidate:y,isTraceEventLargestImagePaintCandidate:function(e){return"LargestImagePaint::Candidate"===e.name},isTraceEventLargestTextPaintCandidate:function(e){return"LargestTextPaint::Candidate"===e.name},isTraceEventMarkLoad:S,isTraceEventFirstPaint:h,isTraceEventMarkDOMContent:I,isTraceEventInteractiveTime:k,isTraceEventEventTiming:R,isTraceEventEventTimingEnd:function(e){return R(e)&&"e"===e.ph},isTraceEventEventTimingStart:function(e){return R(e)&&"b"===e.ph},isTraceEventGPUTask:function(e){return"GPUTask"===e.name},isTraceEventProfile:function(e){return"Profile"===e.name},isSyntheticCpuProfile:function(e){return"CpuProfile"===e.name},isTraceEventProfileChunk:function(e){return"ProfileChunk"===e.name},isTraceEventResourceChangePriority:function(e){return"ResourceChangePriority"===e.name},isTraceEventResourceSendRequest:function(e){return"ResourceSendRequest"===e.name},isTraceEventResourceReceiveResponse:function(e){return"ResourceReceiveResponse"===e.name},isTraceEventResourceMarkAsCached:function(e){return"ResourceMarkAsCached"===e.name},isTraceEventResourceFinish:function(e){return"ResourceFinish"===e.name},isTraceEventResourceWillSendRequest:function(e){return"ResourceWillSendRequest"===e.name},isTraceEventResourceReceivedData:function(e){return"ResourceReceivedData"===e.name},isSyntheticNetworkRequestEvent:C,isSyntheticWebSocketConnectionEvent:P,isNetworkTrackEntry:function(e){return C(e)||P(e)||D(e)},isTraceEventPrePaint:function(e){return"PrePaint"===e.name},isTraceEventNavigationStartWithURL:function(e){return Boolean(T(e)&&e.args.data&&""!==e.args.data.documentLoaderURL)},isTraceEventMainFrameViewport:function(e){return"PaintTimingVisualizer::Viewport"===e.name},isSyntheticUserTiming:function(e){if("blink.user_timing"!==e.cat)return!1;const n=e.args?.data;return!!n&&("beginEvent"in n&&"endEvent"in n)},isSyntheticConsoleTiming:function(e){if("blink.console"!==e.cat)return!1;const n=e.args?.data;return!!n&&("beginEvent"in n&&"endEvent"in n)},isTraceEventUserTiming:b,isTraceEventPerformanceMeasure:function(e){return b(e)&&F(e)},isTraceEventPerformanceMark:function(e){return b(e)&&("R"===e.ph||"I"===e.ph)},isTraceEventConsoleTime:function(e){return"blink.console"===e.cat&&F(e)},isTraceEventTimeStamp:function(e){return"I"===e.ph&&"TimeStamp"===e.name},isTraceEventParseHTML:function(e){return"ParseHTML"===e.name},isTraceEventAsyncPhase:F,isSyntheticLayoutShift:function(e){return!(!E(e)||!e.args.data)&&"rawEvent"in e.args.data},isProfileCall:function(e){return"callFrame"in e},isTraceEventPaint:function(e){return"Paint"===e.name},isTraceEventPaintImage:function(e){return"PaintImage"===e.name},isTraceEventScrollLayer:function(e){return"ScrollLayer"===e.name},isTraceEventSetLayerId:function(e){return"SetLayerTreeId"===e.name},isTraceEventUpdateLayer:function(e){return"UpdateLayer"===e.name},isTraceEventDisplayListItemListSnapshot:function(e){return"cc::DisplayItemList"===e.name},isTraceEventLayerTreeHostImplSnapshot:function(e){return"cc::LayerTreeHostImpl"===e.name},isTraceEventFireAnimationFrame:function(e){return"FireAnimationFrame"===e.name},isTraceEventRequestAnimationFrame:function(e){return"RequestAnimationFrame"===e.name},isTraceEventTimerInstall:function(e){return"TimerInstall"===e.name},isTraceEventTimerFire:function(e){return"TimerFire"===e.name},isTraceEventRequestIdleCallback:function(e){return"RequestIdleCallback"===e.name},isTraceEventWebSocketCreate:w,isTraceEventWebSocketInfo:W,isTraceEventWebSocketTransfer:M,isTraceEventWebSocketSend:function(e){return"WebSocketSend"===e.name},isTraceEventWebSocketReceive:function(e){return"WebSocketReceive"===e.name},isTraceEventWebSocketSendHandshakeRequest:function(e){return"WebSocketSendHandshakeRequest"===e.name},isTraceEventWebSocketReceiveHandshakeResponse:function(e){return"WebSocketReceiveHandshakeResponse"===e.name},isTraceEventWebSocketDestroy:function(e){return"WebSocketDestroy"===e.name},isWebSocketTraceEvent:D,isWebSocketEvent:function(e){return D(e)||P(e)},isTraceEventV8Compile:function(e){return"v8.compile"===e.name},isTraceEventFunctionCall:function(e){return"FunctionCall"===e.name},isSyntheticServerTiming:function(e){return"devtools.server-timing"===e.cat},isJSInvocationEvent:function(e){switch(e.name){case"RunMicrotasks":case"FunctionCall":case"EvaluateScript":case"v8.evaluateModule":case"EventDispatch":case"V8.Execute":return!0}return!(!e.name.startsWith("v8")&&!e.name.startsWith("V8"))},Categories:{Console:"blink.console",UserTiming:"blink.user_timing",Loading:"loading"}});export{e as Configuration,a as Extensions,i as File,o as Timing,N as TraceEvents};