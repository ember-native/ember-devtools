import*as e from"../../../core/common/common.js";import*as r from"../../../models/bindings/bindings.js";function t(t){const s=t.args.data.url,o=e.ParsedURL.ParsedURL.urlWithoutHash(s),u=r.ResourceUtils.resourceForURL(s)||r.ResourceUtils.resourceForURL(o);return u?.request}class s{#e;constructor(e){this.#e=e}get request(){return this.#e}}var o=Object.freeze({__proto__:null,getNetworkRequest:t,createTimelineNetworkRequest:function(e){const r=t(e);return r?new s(r):null},TimelineNetworkRequest:s});export{o as NetworkRequest};