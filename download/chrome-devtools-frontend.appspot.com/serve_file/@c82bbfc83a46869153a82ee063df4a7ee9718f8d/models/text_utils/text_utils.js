import*as t from"../../third_party/codemirror.next/codemirror.next.js";import*as e from"../../core/platform/platform.js";import*as n from"../../core/common/common.js";var s=Object.freeze({__proto__:null,createCssTokenizer:function(){return async function(e,n){const s=await t.cssStreamParser(),i=new t.StringStream(e,4,2),r=s.startState(2);let o=i.pos;for(;!i.eol();){i.start=o;let t=s.token(i,r);"error"===t&&"maybeprop"===r.state&&(t="property");n(i.current(),t),o=i.pos}}}});class i{lineNumber;lineContent;columnNumber;matchLength;constructor(t,e,n,s){this.lineNumber=t,this.lineContent=e,this.columnNumber=n,this.matchLength=s}static comparator(t,e){return t.lineNumber-e.lineNumber||t.columnNumber-e.columnNumber}}const r=function(t,e,n,s,i=!0){return null==t||i&&t.length>1048576?null:"data:"+e+(s?";charset="+s:"")+(n?";base64":"")+","+(t=n?t:encodeURIComponent(t))};var o=Object.freeze({__proto__:null,SearchMatch:i,contentAsDataURL:r,isStreamingContentProvider:function(t){return"requestStreamingContent"in t}});class a{#t;#e=0;#n=0;#s=0;constructor(t){this.#t=t}advance(t){for(this.#e=t;this.#n<this.#t.length&&this.#t[this.#n]<this.#e;)++this.#n;this.#s=this.#n?this.#e-this.#t[this.#n-1]-1:this.#e}offset(){return this.#e}resetTo(t){this.#e=t,this.#n=e.ArrayUtilities.lowerBound(this.#t,t,e.ArrayUtilities.DEFAULT_COMPARATOR),this.#s=this.#n?this.#e-this.#t[this.#n-1]-1:this.#e}lineNumber(){return this.#n}columnNumber(){return this.#s}}var l=Object.freeze({__proto__:null,TextCursor:a});const h=2**31-1;class c{startLine;startColumn;endLine;endColumn;constructor(t,e,n,s){this.startLine=t,this.startColumn=e,this.endLine=n,this.endColumn=s}static createFromLocation(t,e){return new c(t,e,t,e)}static createUnboundedFromLocation(t,e){return new c(t,e,h,h)}static fromObject(t){return new c(t.startLine,t.startColumn,t.endLine,t.endColumn)}static comparator(t,e){return t.compareTo(e)}static fromEdit(t,n){let s=t.startLine,i=t.startColumn+n.length;const r=e.StringUtilities.findLineEndingIndexes(n);if(r.length>1){s=t.startLine+r.length-1;const e=r.length;i=r[e-1]-r[e-2]-1}return new c(t.startLine,t.startColumn,s,i)}isEmpty(){return this.startLine===this.endLine&&this.startColumn===this.endColumn}immediatelyPrecedes(t){return!!t&&(this.endLine===t.startLine&&this.endColumn===t.startColumn)}immediatelyFollows(t){return!!t&&t.immediatelyPrecedes(this)}follows(t){return t.endLine===this.startLine&&t.endColumn<=this.startColumn||t.endLine<this.startLine}get linesCount(){return this.endLine-this.startLine}collapseToEnd(){return new c(this.endLine,this.endColumn,this.endLine,this.endColumn)}collapseToStart(){return new c(this.startLine,this.startColumn,this.startLine,this.startColumn)}normalize(){return this.startLine>this.endLine||this.startLine===this.endLine&&this.startColumn>this.endColumn?new c(this.endLine,this.endColumn,this.startLine,this.startColumn):this.clone()}clone(){return new c(this.startLine,this.startColumn,this.endLine,this.endColumn)}serializeToObject(){return{startLine:this.startLine,startColumn:this.startColumn,endLine:this.endLine,endColumn:this.endColumn}}compareTo(t){return this.startLine>t.startLine?1:this.startLine<t.startLine?-1:this.startColumn>t.startColumn?1:this.startColumn<t.startColumn?-1:0}compareToPosition(t,e){return t<this.startLine||t===this.startLine&&e<this.startColumn?-1:t>this.endLine||t===this.endLine&&e>this.endColumn?1:0}equal(t){return this.startLine===t.startLine&&this.endLine===t.endLine&&this.startColumn===t.startColumn&&this.endColumn===t.endColumn}relativeTo(t,e){const n=this.clone();return this.startLine===t&&(n.startColumn-=e),this.endLine===t&&(n.endColumn-=e),n.startLine-=t,n.endLine-=t,n}relativeFrom(t,e){const n=this.clone();return 0===this.startLine&&(n.startColumn+=e),0===this.endLine&&(n.endColumn+=e),n.startLine+=t,n.endLine+=t,n}rebaseAfterTextEdit(t,e){console.assert(t.startLine===e.startLine),console.assert(t.startColumn===e.startColumn);const n=this.clone();if(!this.follows(t))return n;const s=e.endLine-t.endLine,i=e.endColumn-t.endColumn;return n.startLine+=s,n.endLine+=s,n.startLine===e.endLine&&(n.startColumn+=i),n.endLine===e.endLine&&(n.endColumn+=i),n}toString(){return JSON.stringify(this)}containsLocation(t,e){return this.startLine===this.endLine?this.startLine===t&&this.startColumn<=e&&e<this.endColumn:this.startLine===t?this.startColumn<=e:this.endLine===t?e<this.endColumn:this.startLine<t&&t<this.endLine}get start(){return{lineNumber:this.startLine,columnNumber:this.startColumn}}get end(){return{lineNumber:this.endLine,columnNumber:this.endColumn}}intersection(t){let{startLine:e,startColumn:n}=this;e<t.startLine?(e=t.startLine,n=t.startColumn):e===t.startLine&&(n=Math.max(n,t.startColumn));let{endLine:s,endColumn:i}=this;return s>t.endLine?(s=t.endLine,i=t.endColumn):s===t.endLine&&(i=Math.min(i,t.endColumn)),e>s||e===s&&n>=i?new c(0,0,0,0):new c(e,n,s,i)}}class u{offset;length;constructor(t,e){this.offset=t,this.length=e}}var d=Object.freeze({__proto__:null,TextRange:c,SourceRange:u});class m{#i;#t;constructor(t){this.#i=t}lineEndings(){return this.#t||(this.#t=e.StringUtilities.findLineEndingIndexes(this.#i)),this.#t}value(){return this.#i}lineCount(){return this.lineEndings().length}offsetFromPosition(t,e){return(t?this.lineEndings()[t-1]+1:0)+e}positionFromOffset(t){const n=this.lineEndings(),s=e.ArrayUtilities.lowerBound(n,t,e.ArrayUtilities.DEFAULT_COMPARATOR);return{lineNumber:s,columnNumber:t-(s&&n[s-1]+1)}}lineAt(t){const e=this.lineEndings(),n=t>0?e[t-1]+1:0,s=e[t];let i=this.#i.substring(n,s);return i.length>0&&"\r"===i.charAt(i.length-1)&&(i=i.substring(0,i.length-1)),i}toSourceRange(t){const e=this.offsetFromPosition(t.startLine,t.startColumn),n=this.offsetFromPosition(t.endLine,t.endColumn);return new u(e,n-e)}toTextRange(t){const e=new a(this.lineEndings()),n=c.createFromLocation(0,0);return e.resetTo(t.offset),n.startLine=e.lineNumber(),n.startColumn=e.columnNumber(),e.advance(t.offset+t.length),n.endLine=e.lineNumber(),n.endColumn=e.columnNumber(),n}replaceRange(t,e){const n=this.toSourceRange(t);return this.#i.substring(0,n.offset)+e+this.#i.substring(n.offset+n.length)}extract(t){const e=this.toSourceRange(t);return this.#i.substr(e.offset,e.length)}}var f=Object.freeze({__proto__:null,Text:m});class g{mimeType;charset;#r;#o;#a;constructor(t,e,n,s){this.charset=s||"utf-8",e?this.#r=t:this.#o=t,this.mimeType=n,this.mimeType||(this.mimeType=e?"application/octet-stream":"text/plain")}get base64(){if(void 0===this.#r)throw new Error("Encoding text content as base64 is not supported");return this.#r}get text(){if(void 0!==this.#o)return this.#o;if(!this.isTextContent)throw new Error("Cannot interpret binary data as text");const t=window.atob(this.#r),e=Uint8Array.from(t,(t=>t.codePointAt(0)));return this.#o=new TextDecoder(this.charset).decode(e),this.#o}get isTextContent(){return e.MimeType.isTextType(this.mimeType)}get isEmpty(){return!Boolean(this.#r)&&!Boolean(this.#o)}get createdFromBase64(){return void 0!==this.#r}get textObj(){return void 0===this.#a&&(this.#a=new m(this.text)),this.#a}contentEqualTo(t){return void 0!==this.#r&&void 0!==t.#r?this.#r===t.#r:void 0!==this.#o&&void 0!==t.#o?this.#o===t.#o:!(!this.isTextContent||!t.isTextContent)&&this.text===t.text}asDataUrl(){if(void 0!==this.#r){const t=this.isTextContent?this.charset:null;return r(this.#r,this.mimeType??"",!0,t)}return r(this.text,this.mimeType??"",!1,"utf-8")}asDeferedContent(){if(this.isTextContent)return{content:this.text,isEncoded:!1};if(void 0!==this.#o)return{content:this.#o,isEncoded:!1};if(void 0!==this.#r)return{content:this.#r,isEncoded:!0};throw new Error("Unreachable")}static isError(t){return"error"in t}static textOr(t,e){return g.isError(t)?e:t.text}static contentDataOrEmpty(t){return g.isError(t)?x:t}static asDeferredContent(t){return g.isError(t)?{error:t.error,content:null,isEncoded:!1}:t.asDeferedContent()}}const x=new g("",!1,"text/plain");var C=Object.freeze({__proto__:null,ContentData:g,EMPTY_TEXT_CONTENT_DATA:x});const b=/(?:^|\s)(\-)?([\w\-]+):([^\s]+)/,p=/(?:^|\s)(\-)?\/([^\/\\]+(\\.[^\/]*)*)\//,L=/(?:^|\s)(\-)?([^\s]+)/,T=/\s/,y={isSpaceChar:function(t){return T.test(t)},lineIndent:function(t){let e=0;for(;e<t.length&&y.isSpaceChar(t.charAt(e));)++e;return t.substr(0,e)},splitStringByRegexes(t,e){const n=[],s=[];for(let t=0;t<e.length;t++){const n=e[t];n.global?s.push(n):s.push(new RegExp(n.source,n.flags?n.flags+"g":"g"))}return function t(e,i,r){if(i>=s.length)return void n.push({value:e,position:r,regexIndex:-1,captureGroups:[]});const o=s[i];let a,l=0;o.lastIndex=0;for(;null!==(a=o.exec(e));){const s=e.substring(l,a.index);s&&t(s,i+1,r+l);const o=a[0];n.push({value:o,position:r+a.index,regexIndex:i,captureGroups:a.slice(1)}),l=a.index+o.length}const h=e.substring(l);h&&t(h,i+1,r+l)}(t,0,0),n}};const A=function(t,e,n,s){return g.isError(t)||!t.isTextContent?[]:v(t.textObj,e,n,s)},v=function(t,n,s,r){const o=e.StringUtilities.createSearchRegex(n,s,r),a=[];for(let e=0;e<t.lineCount();++e){const n=t.lineAt(e),s=n.matchAll(o);for(const t of s)a.push(new i(e,n,t.index,t[0].length))}return a};var E=Object.freeze({__proto__:null,Utils:y,FilterParser:class{keys;constructor(t){this.keys=t}static cloneFilter(t){return{key:t.key,text:t.text,regex:t.regex,negative:t.negative}}parse(t){const e=y.splitStringByRegexes(t,[b,p,L]),n=[];for(const{regexIndex:t,captureGroups:s}of e)if(-1!==t)if(0===t){const t=s[0],e=s[1],i=s[2];-1!==this.keys.indexOf(e)?n.push({key:e,regex:void 0,text:i,negative:Boolean(t)}):n.push({key:void 0,regex:void 0,text:`${e}:${i}`,negative:Boolean(t)})}else if(1===t){const t=s[0],e=s[1];try{n.push({key:void 0,regex:new RegExp(e,"i"),text:void 0,negative:Boolean(t)})}catch(s){n.push({key:void 0,regex:void 0,text:`/${e}/`,negative:Boolean(t)})}}else if(2===t){const t=s[0],e=s[1];n.push({key:void 0,regex:void 0,text:e,negative:Boolean(t)})}return n}},BalancedJSONTokenizer:class{callback;index;balance;buffer;findMultiple;closingDoubleQuoteRegex;lastBalancedIndex;constructor(t,e){this.callback=t,this.index=0,this.balance=0,this.buffer="",this.findMultiple=e||!1,this.closingDoubleQuoteRegex=/[^\\](?:\\\\)*"/g}write(t){this.buffer+=t;const e=this.buffer.length,n=this.buffer;let s;for(s=this.index;s<e;++s){const t=n[s];if('"'===t){if(this.closingDoubleQuoteRegex.lastIndex=s,!this.closingDoubleQuoteRegex.test(n))break;s=this.closingDoubleQuoteRegex.lastIndex-1}else if("{"===t)++this.balance;else if("}"===t){if(--this.balance,this.balance<0)return this.reportBalanced(),!1;if(!this.balance&&(this.lastBalancedIndex=s+1,!this.findMultiple))break}else if("]"===t&&!this.balance)return this.reportBalanced(),!1}return this.index=s,this.reportBalanced(),!0}reportBalanced(){this.lastBalancedIndex&&(this.callback(this.buffer.slice(0,this.lastBalancedIndex)),this.buffer=this.buffer.slice(this.lastBalancedIndex),this.index-=this.lastBalancedIndex,this.lastBalancedIndex=0)}remainder(){return this.buffer}},detectIndentation:function(t){const e=[0,0,0,0,0,0,0,0,0];let n=0,s=0;for(const i of t){let t=0;if(0!==i.length){let e=i.charAt(0);if("\t"===e){n++;continue}for(;" "===e;)e=i.charAt(++t)}if(t===i.length){s=0;continue}const r=Math.abs(t-s);r<e.length&&(e[r]=e[r]+1),s=t}let i=0,r=0;for(let t=1;t<e.length;++t){const n=e[t];n>r&&(r=n,i=t)}return n>i?"\t":i?" ".repeat(i):null},isMinified:function(t){let e=0;for(let n=0;n<t.length;++e){let e=t.indexOf("\n",n);e<0&&(e=t.length),n=e+1}return(t.length-e)/e>=80},performSearchInContentData:A,performSearchInContent:v,performSearchInSearchMatches:function(t,n,s,r){const o=e.StringUtilities.createSearchRegex(n,s,r),a=[];for(const{lineNumber:e,lineContent:n}of t){const t=n.matchAll(o);for(const s of t)a.push(new i(e,n,s.index,s[0].length))}return a}});class w{#l;#h;#c;constructor(t,e,n){this.#l=t,this.#h=e,this.#c=n}static fromString(t,e,n){return new w(t,e,(()=>Promise.resolve(new g(n,!1,e.canonicalMimeType()))))}contentURL(){return this.#l}contentType(){return this.#h}requestContent(){return this.#c().then(g.asDeferredContent.bind(void 0))}requestContentData(){return this.#c()}async searchInContent(t,e,n){const s=await this.requestContentData();return A(s,t,e,n)}}var B=Object.freeze({__proto__:null,StaticContentProvider:w});class _ extends n.ObjectWrapper.ObjectWrapper{mimeType;#u;#d;#m=[];#f;constructor(t,e,n){super(),this.mimeType=t,this.#u=e,this.#d=Boolean(n&&!n.createdFromBase64),this.#f=n}static create(t,e){return new _(t,e)}static from(t){return new _(t.mimeType,t.charset,t)}get isTextContent(){return e.MimeType.isTextType(this.mimeType)}addChunk(t){if(this.#d)throw new Error("Cannot add base64 data to a text-only ContentData.");this.#m.push(t),this.dispatchEventToListeners("ChunkAdded",{content:this,chunk:t})}content(){if(this.#f&&0===this.#m.length)return this.#f;const t=this.#f?.base64??"",n=this.#m.reduce(((t,n)=>e.StringUtilities.concatBase64(t,n)),t);return this.#f=new g(n,!0,this.mimeType,this.#u),this.#m=[],this.#f}}const N=function(t){return"error"in t};var O=Object.freeze({__proto__:null,StreamingContentData:_,isError:N,asContentDataOrError:function(t){return N(t)?t:t.content()}});var S=Object.freeze({__proto__:null,WasmDisassembly:class extends g{lines;#g;#x;#C;constructor(t,e,n){if(super("",!1,"text/x-wast","utf-8"),t.length!==e.length)throw new Error("Lines and offsets don't match");this.lines=t,this.#g=e,this.#x=n}get text(){return void 0===this.#C&&(this.#C=this.lines.join("\n")),this.#C}get isEmpty(){return 0===this.lines.length||1===this.lines.length&&0===this.lines[0].length}get lineNumbers(){return this.#g.length}bytecodeOffsetToLineNumber(t){return e.ArrayUtilities.upperBound(this.#g,t,e.ArrayUtilities.DEFAULT_COMPARATOR)-1}lineNumberToBytecodeOffset(t){return this.#g[t]}*nonBreakableLineNumbers(){let t=0,e=0;for(;t<this.lineNumbers;){if(e<this.#x.length){if(this.lineNumberToBytecodeOffset(t)>=this.#x[e].start){t=this.bytecodeOffsetToLineNumber(this.#x[e++].end)+1;continue}}yield t++}}asDeferedContent(){return{content:"",isEncoded:!1,wasmDisassemblyInfo:this}}}});export{s as CodeMirrorUtils,C as ContentData,o as ContentProvider,B as StaticContentProvider,O as StreamingContentData,f as Text,l as TextCursor,d as TextRange,E as TextUtils,S as WasmDisassembly};
