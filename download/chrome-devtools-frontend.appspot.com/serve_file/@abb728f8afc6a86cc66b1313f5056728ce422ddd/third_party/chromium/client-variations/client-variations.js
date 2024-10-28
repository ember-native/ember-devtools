const t={};function o(o){return t.parseClientVariations(o)}function e(o){return t.formatClientVariations(o)}(function(){var t,o=this||self;function e(t){var o=typeof t;return"object"!=o?o:t?Array.isArray(t)?"array":o:"null"}function r(t){var o=typeof t;return"object"==o&&null!=t||"function"==o}function i(t,e){t=t.split(".");var r,i=o;t[0]in i||void 0===i.execScript||i.execScript("var "+t[0]);for(;t.length&&(r=t.shift());)t.length||void 0===e?i=i[r]&&i[r]!==Object.prototype[r]?i[r]:i[r]={}:i[r]=e}function n(t,o){return Array.prototype.map.call(t,o,void 0)}var p={},h=null;function s(t){var o=t.length,e=3*o/4;e%3?e=Math.floor(e):-1!="=.".indexOf(t[o-1])&&(e=-1!="=.".indexOf(t[o-2])?e-2:e-1);var r=new Uint8Array(e),i=0;return function(t,o){function e(o){for(;r<t.length;){var e=t.charAt(r++),i=h[e];if(null!=i)return i;if(!/^[\s\xa0]*$/.test(e))throw Error("Unknown base64 encoding at char: "+e)}return o}a();for(var r=0;;){var i=e(-1),n=e(0),p=e(64),s=e(64);if(64===s&&-1===i)break;o(i<<2|n>>4),64!=p&&(o(n<<4&240|p>>2),64!=s&&o(p<<6&192|s))}}(t,(function(t){r[i++]=t})),r.subarray(0,i)}function a(){if(!h){h={};for(var t="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789".split(""),o=["+/=","+/","-_=","-_.","-_"],e=0;5>e;e++){var r=t.concat(o[e].split(""));p[e]=r;for(var i=0;i<r.length;i++){var n=r[i];void 0===h[n]&&(h[n]=i)}}}}function u(t,o,e,r){let i,n="Assertion failed";throw e?(n+=": "+e,i=r):t&&(n+=": "+t,i=o),Error(n,i||[])}function l(t,o){return t||u("",null,o,[]),t}function f(t,...o){throw Error("Failure"+(t?": "+t:""),o)}function g(t){t instanceof ot||u("Expected instanceof %s but got %s.",[c(ot),c(t)],void 0,[])}function c(t){return t instanceof Function?t.displayName||t.name||"unknown type name":t instanceof Object?t.constructor.displayName||t.constructor.name||Object.prototype.toString.call(t):null===t?"null":typeof t}function y(t,o){this.g=t,this.h=o}function d(t){return new y((t.g>>>1|(1&t.h)<<31)>>>0,t.h>>>1>>>0)}function v(t){return new y(t.g<<1>>>0,(t.h<<1|t.g>>>31)>>>0)}function b(t){var o=65535&t,e=t>>>16;for(t=10*o+65536*(0*o&65535)+65536*(10*e&65535),o=0*e+(0*o>>>16)+(10*e>>>16);4294967296<=t;)t-=4294967296,o+=1;return new y(t>>>0,o>>>0)}y.prototype.add=function(t){return new y((this.g+t.g&4294967295)>>>0>>>0,((this.h+t.h&4294967295)>>>0)+(4294967296<=this.g+t.g?1:0)>>>0)},y.prototype.sub=function(t){return new y((this.g-t.g&4294967295)>>>0>>>0,((this.h-t.h&4294967295)>>>0)-(0>this.g-t.g?1:0)>>>0)},y.prototype.toString=function(){for(var t="",o=this;0!=o.g||0!=o.h;){var e=new y(0,0);o=new y(o.g,o.h);for(var r=new y(10,0),i=new y(1,0);!(2147483648&r.h);)r=v(r),i=v(i);for(;0!=i.g||0!=i.h;)0>=(r.h<o.h||r.h==o.h&&r.g<o.g?-1:r.h==o.h&&r.g==o.g?0:1)&&(e=e.add(i),o=o.sub(r)),r=d(r),i=d(i);o=(e=[e,o])[0],t=e[1].g+t}return""==t&&(t="0"),t},y.prototype.clone=function(){return new y(this.g,this.h)};var w=0,j=0;function F(t){var o=t>>>0;t=Math.floor((t-o)/4294967296)>>>0,w=o,j=t}function m(t){var o=0>t,e=(t=Math.abs(t))>>>0;t=Math.floor((t-e)/4294967296),t>>>=0,o&&(t=~t>>>0,4294967295<(e=1+(~e>>>0))&&(e=0,4294967295<++t&&(t=0))),w=e,j=t}function x(t,o){return 4294967296*o+(t>>>0)}function A(t,o){var e=2147483648&o;return e&&(o=~o>>>0,0==(t=1+~t>>>0)&&(o=o+1>>>0)),t=x(t,o),e?-t:t}function k(t,o){var e=-(1&t);return A((t>>>1|o<<31)^e,o>>>1^e)}function M(t){return t.constructor===Uint8Array?t:t.constructor===ArrayBuffer||t.constructor===Array?new Uint8Array(t):t.constructor===String?s(t):t instanceof Uint8Array?new Uint8Array(t.buffer,t.byteOffset,t.byteLength):(f("Type not convertible to Uint8Array."),new Uint8Array(0))}function S(t,o,e){this.h=null,this.g=this.j=this.o=0,this.D=!1,t&&I(this,t,o,e)}var P=[];function E(t,o,e){if(P.length){var r=P.pop();return t&&I(r,t,o,e),r}return new S(t,o,e)}function I(t,o,e,r){t.h=M(o),t.o=void 0!==e?e:0,t.j=void 0!==r?t.o+r:t.h.length,t.g=t.o}function U(t,o){t.g+=o,l(t.g<=t.j)}function C(t,o){for(var e=128,r=0,i=0,n=0;4>n&&128<=e;n++)r|=(127&(e=t.h[t.g++]))<<7*n;if(128<=e&&(r|=(127&(e=t.h[t.g++]))<<28,i|=(127&e)>>4),128<=e)for(n=0;5>n&&128<=e;n++)i|=(127&(e=t.h[t.g++]))<<7*n+3;if(128>e)return o(r>>>0,i>>>0);f("Failed to read varint, encoding is invalid."),t.D=!0}function O(){this.g=[]}function B(t){var o=w,e=j;for(l(o==Math.floor(o)),l(e==Math.floor(e)),l(0<=o&&4294967296>o),l(0<=e&&4294967296>e);0<e||127<o;)t.g.push(127&o|128),o=(o>>>7|e<<25)>>>0,e>>>=7;t.g.push(o)}function R(t,o,e){l(o==Math.floor(o)),l(e==Math.floor(e)),l(0<=o&&4294967296>o),l(0<=e&&4294967296>e),t.A(o),t.A(e)}function N(t,o){for(l(o==Math.floor(o)),l(0<=o&&4294967296>o);127<o;)t.g.push(127&o|128),o>>>=7;t.g.push(o)}function D(t,o){if(l(o==Math.floor(o)),l(-2147483648<=o&&2147483648>o),0<=o)N(t,o);else{for(var e=0;9>e;e++)t.g.push(127&o|128),o>>=7;t.g.push(1)}}function G(t,o){l(o==Math.floor(o)),l(0<=o&&0x10000000000000000>o),m(o),B(t)}function T(t,o){l(o==Math.floor(o)),l(-0x8000000000000000<=o&&0x8000000000000000>o),m(o),B(t)}function L(t,o){l(o==Math.floor(o)),l(-2147483648<=o&&2147483648>o),N(t,(o<<1^o>>31)>>>0)}function V(t,o){l(o==Math.floor(o)),l(-0x8000000000000000<=o&&0x8000000000000000>o);var e=o;o=0>e,F(e=2*Math.abs(e)),e=w;var r=j;o&&(0==e?0==r?r=e=4294967295:(r--,e=4294967295):e--),w=e,j=r,B(t)}function W(t){this.g=E(t,void 0,void 0),this.D=this.g.g,this.h=this.j=-1,this.o=!1}function J(t){switch(t.h){case 0:if(0!=t.h)f("Invalid wire type for skipVarintField"),J(t);else{for(t=t.g;128&t.h[t.g];)t.g++;t.g++}break;case 1:1!=t.h?(f("Invalid wire type for skipFixed64Field"),J(t)):U(t.g,8);break;case 2:if(2!=t.h)f("Invalid wire type for skipDelimitedField"),J(t);else{var o=t.g.v();U(t.g,o)}break;case 5:5!=t.h?(f("Invalid wire type for skipFixed32Field"),J(t)):U(t.g,4);break;case 3:for(o=t.j;;){if(!t.M()){f("Unmatched start-group tag: stream EOF"),t.o=!0;break}if(4==t.h){t.j!=o&&(f("Unmatched end-group tag"),t.o=!0);break}J(t)}break;default:f("Invalid wire encoding for field.")}}function z(t,o){l(2==t.h);var e=t.g.v();e=t.g.g+e;for(var r=[];t.g.g<e;)r.push(o.call(t.g));return r}function _(){this.j=[],this.h=0,this.g=new O,this.o=[]}function H(t,o){return X(t,o,2),o=t.g.end(),t.j.push(o),t.h+=o.length,o.push(t.h),o}function K(t,o){var e=o.pop();for(l(0<=(e=t.h+t.g.length()-e));127<e;)o.push(127&e|128),e>>>=7,t.h++;o.push(e),t.h++}function X(t,o,e){l(1<=o&&o==Math.floor(o)),N(t.g,8*o+e)}function q(t,o){if(this.j=t,this.h=o,this.g={},this.arrClean=!0,0<this.j.length){for(t=0;t<this.j.length;t++){var e=(o=this.j[t])[0];this.g[e.toString()]=new Q(e,o[1])}this.arrClean=!0}}function Y(t){this.h=0,this.g=t}function Z(t,o){return t.h?(o.g||(o.g=new t.h(o.value)),o.g):o.value}function $(t){t=t.g;var o,e=[];for(o in t)Object.prototype.hasOwnProperty.call(t,o)&&e.push(o);return e}function Q(t,o){this.key=t,this.value=o,this.g=void 0}function tt(t,o,e,r,i){this.K=t,this.na=o,this.ctor=e,this.ia=r,this.L=i}function ot(){}(t=S.prototype).clone=function(){return E(this.h,this.o,this.j-this.o)},t.clear=function(){this.h=null,this.g=this.j=this.o=0,this.D=!1},t.reset=function(){this.g=this.o},t.v=function(){var t=this.h,o=t[this.g],e=127&o;return 128>o?(this.g+=1,l(this.g<=this.j),e):(e|=(127&(o=t[this.g+1]))<<7,128>o?(this.g+=2,l(this.g<=this.j),e):(e|=(127&(o=t[this.g+2]))<<14,128>o?(this.g+=3,l(this.g<=this.j),e):(e|=(127&(o=t[this.g+3]))<<21,128>o?(this.g+=4,l(this.g<=this.j),e):(e|=(15&(o=t[this.g+4]))<<28,128>o?(this.g+=5,l(this.g<=this.j),e>>>0):(this.g+=5,128<=t[this.g++]&&128<=t[this.g++]&&128<=t[this.g++]&&128<=t[this.g++]&&128<=t[this.g++]&&l(!1),l(this.g<=this.j),e)))))},t.fa=function(){return~~this.v()},t.qa=function(){var t=this.v();return t>>>1^-(1&t)},t.pa=function(){return C(this,x)},t.ga=function(){return C(this,A)},t.ra=function(){return C(this,k)},t.u=function(){var t=this.h[this.g],o=this.h[this.g+1],e=this.h[this.g+2],r=this.h[this.g+3];return this.g+=4,l(this.g<=this.j),(t<<0|o<<8|e<<16|r<<24)>>>0},t.R=function(){return x(this.u(),this.u())},t.G=function(){var t=this.h[this.g],o=this.h[this.g+1],e=this.h[this.g+2],r=this.h[this.g+3];return this.g+=4,l(this.g<=this.j),t<<0|o<<8|e<<16|r<<24},t.P=function(){return A(this.u(),this.u())},t.O=function(){var t=this.u(),o=2*(t>>31)+1,e=t>>>23&255;return t&=8388607,255==e?t?NaN:1/0*o:0==e?o*Math.pow(2,-149)*t:o*Math.pow(2,e-150)*(t+Math.pow(2,23))},t.N=function(){var t=this.u(),o=this.u(),e=2*(o>>31)+1,r=o>>>20&2047;return t=4294967296*(1048575&o)+t,2047==r?t?NaN:1/0*e:0==r?e*Math.pow(2,-1074)*t:e*Math.pow(2,r-1075)*(t+4503599627370496)},t.ba=function(){return!!this.h[this.g++]},t.da=function(){return this.fa()},t.ha=function(t){var o=this.h,e=this.g,r=e+t,i=[];for(t="";e<r;){var n=o[e++];if(128>n)i.push(n);else{if(192>n)continue;if(224>n){var p=o[e++];i.push((31&n)<<6|63&p)}else if(240>n){p=o[e++];var h=o[e++];i.push((15&n)<<12|(63&p)<<6|63&h)}else if(248>n){n=(7&n)<<18|(63&(p=o[e++]))<<12|(63&(h=o[e++]))<<6|63&o[e++],n-=65536,i.push(55296+(n>>10&1023),56320+(1023&n))}}8192<=i.length&&(t+=String.fromCharCode.apply(null,i),i.length=0)}if(8192>=i.length)i=String.fromCharCode.apply(null,i);else{for(o="",r=0;r<i.length;r+=8192)o+=String.fromCharCode.apply(null,Array.prototype.slice.call(i,r,r+8192));i=o}return this.g=e,t+i},t.ca=function(t){if(0>t||this.g+t>this.h.length)return this.D=!0,f("Invalid byte length!"),new Uint8Array(0);var o=this.h.subarray(this.g,this.g+t);return this.g+=t,l(this.g<=this.j),o},(t=O.prototype).length=function(){return this.g.length},t.end=function(){var t=this.g;return this.g=[],t},t.A=function(t){l(t==Math.floor(t)),l(0<=t&&4294967296>t),this.g.push(t>>>0&255),this.g.push(t>>>8&255),this.g.push(t>>>16&255),this.g.push(t>>>24&255)},t.W=function(t){l(t==Math.floor(t)),l(0<=t&&0x10000000000000000>t),F(t),this.A(w),this.A(j)},t.T=function(t){l(t==Math.floor(t)),l(-2147483648<=t&&2147483648>t),this.g.push(t>>>0&255),this.g.push(t>>>8&255),this.g.push(t>>>16&255),this.g.push(t>>>24&255)},t.U=function(t){l(t==Math.floor(t)),l(-0x8000000000000000<=t&&0x8000000000000000>t),m(t),R(this,w,j)},t.J=function(t){l(1/0===t||-1/0===t||isNaN(t)||-34028234663852886e22<=t&&34028234663852886e22>=t);var o=t;if(0===(o=(t=0>o?1:0)?-o:o))0<1/o?w=j=0:(j=0,w=2147483648);else if(isNaN(o))j=0,w=2147483647;else if(34028234663852886e22<o)j=0,w=(t<<31|2139095040)>>>0;else if(11754943508222875e-54>o)o=Math.round(o/Math.pow(2,-149)),j=0,w=(t<<31|o)>>>0;else{var e=Math.floor(Math.log(o)/Math.LN2);o*=Math.pow(2,-e),16777216<=(o=Math.round(8388608*o))&&++e,j=0,w=(t<<31|e+127<<23|8388607&o)>>>0}this.A(w)},t.I=function(t){l(1/0===t||-1/0===t||isNaN(t)||-17976931348623157e292<=t&&17976931348623157e292>=t);var o=t;if(0===(o=(t=0>o?1:0)?-o:o))j=0<1/o?0:2147483648,w=0;else if(isNaN(o))j=2147483647,w=4294967295;else if(17976931348623157e292<o)j=(t<<31|2146435072)>>>0,w=0;else if(22250738585072014e-324>o)o/=Math.pow(2,-1074),j=(t<<31|o/4294967296)>>>0,w=o>>>0;else{var e=o,r=0;if(2<=e)for(;2<=e&&1023>r;)r++,e/=2;else for(;1>e&&-1022<r;)e*=2,r--;o*=Math.pow(2,-r),j=(t<<31|r+1023<<20|1048576*o&1048575)>>>0,w=4503599627370496*o>>>0}this.A(w),this.A(j)},t.H=function(t){l("boolean"==typeof t||"number"==typeof t),this.g.push(t?1:0)},t.S=function(t){l(t==Math.floor(t)),l(-2147483648<=t&&2147483648>t),D(this,t)},t.ja=function(t){this.g.push.apply(this.g,t)},t.V=function(t){var o=this.g.length,r=[];for("string"!=typeof t&&u("Expected string but got %s: %s.",[e(t),t],void 0,r),r=0;r<t.length;r++){var i=t.charCodeAt(r);if(128>i)this.g.push(i);else if(2048>i)this.g.push(i>>6|192),this.g.push(63&i|128);else if(65536>i)if(55296<=i&&56319>=i&&r+1<t.length){var n=t.charCodeAt(r+1);56320<=n&&57343>=n&&(i=1024*(i-55296)+n-56320+65536,this.g.push(i>>18|240),this.g.push(i>>12&63|128),this.g.push(i>>6&63|128),this.g.push(63&i|128),r++)}else this.g.push(i>>12|224),this.g.push(i>>6&63|128),this.g.push(63&i|128)}return this.g.length-o},W.prototype.Ca=function(){return this.j},W.prototype.getFieldNumber=W.prototype.Ca,W.prototype.Z=function(){return 2==this.h},W.prototype.isDelimited=W.prototype.Z,W.prototype.aa=function(){return 4==this.h},W.prototype.isEndGroup=W.prototype.aa,W.prototype.reset=function(){this.g.reset(),this.h=this.j=-1},W.prototype.M=function(){var t=this.g;if(t.g==t.j)return!1;if((t=this.o)||(t=(t=this.g).D||0>t.g||t.g>t.j),t)return f("Decoder hit an error"),!1;this.D=this.g.g;var o=this.g.v();return t=o>>>3,0!=(o&=7)&&5!=o&&1!=o&&2!=o&&3!=o&&4!=o?(f("Invalid wire type: %s (at position %s)",o,this.D),this.o=!0,!1):(this.j=t,this.h=o,!0)},W.prototype.nextField=W.prototype.M,W.prototype.Ja=function(t,o){l(2==this.h);var e=this.g.j,r=this.g.v();r=this.g.g+r,this.g.j=r,o(t,this),this.g.g=r,this.g.j=e},W.prototype.readMessage=W.prototype.Ja,W.prototype.Ia=function(t,o,e){l(3==this.h),l(this.j==t),e(o,this),this.o||4==this.h||(f("Group submessage did not end with an END_GROUP tag"),this.o=!0)},W.prototype.readGroup=W.prototype.Ia,W.prototype.G=function(){return l(0==this.h),this.g.fa()},W.prototype.readInt32=W.prototype.G,W.prototype.P=function(){return l(0==this.h),this.g.ga()},W.prototype.readInt64=W.prototype.P,W.prototype.u=function(){return l(0==this.h),this.g.v()},W.prototype.readUint32=W.prototype.u,W.prototype.R=function(){return l(0==this.h),this.g.pa()},W.prototype.readUint64=W.prototype.R,W.prototype.Za=function(){return l(0==this.h),this.g.qa()},W.prototype.readSint32=W.prototype.Za,W.prototype.$a=function(){return l(0==this.h),this.g.ra()},W.prototype.readSint64=W.prototype.$a,W.prototype.Ga=function(){return l(5==this.h),this.g.u()},W.prototype.readFixed32=W.prototype.Ga,W.prototype.Ha=function(){return l(1==this.h),this.g.R()},W.prototype.readFixed64=W.prototype.Ha,W.prototype.Xa=function(){return l(5==this.h),this.g.G()},W.prototype.readSfixed32=W.prototype.Xa,W.prototype.Ya=function(){return l(1==this.h),this.g.P()},W.prototype.readSfixed64=W.prototype.Ya,W.prototype.O=function(){return l(5==this.h),this.g.O()},W.prototype.readFloat=W.prototype.O,W.prototype.N=function(){return l(1==this.h),this.g.N()},W.prototype.readDouble=W.prototype.N,W.prototype.ba=function(){return l(0==this.h),!!this.g.v()},W.prototype.readBool=W.prototype.ba,W.prototype.da=function(){return l(0==this.h),this.g.ga()},W.prototype.readEnum=W.prototype.da,W.prototype.ha=function(){l(2==this.h);var t=this.g.v();return this.g.ha(t)},W.prototype.readString=W.prototype.ha,W.prototype.ca=function(){l(2==this.h);var t=this.g.v();return this.g.ca(t)},W.prototype.readBytes=W.prototype.ca,W.prototype.ea=function(){return z(this,this.g.fa)},W.prototype.readPackedInt32=W.prototype.ea,W.prototype.Qa=function(){return z(this,this.g.ga)},W.prototype.readPackedInt64=W.prototype.Qa,W.prototype.Va=function(){return z(this,this.g.v)},W.prototype.readPackedUint32=W.prototype.Va,W.prototype.Wa=function(){return z(this,this.g.pa)},W.prototype.readPackedUint64=W.prototype.Wa,W.prototype.Ta=function(){return z(this,this.g.qa)},W.prototype.readPackedSint32=W.prototype.Ta,W.prototype.Ua=function(){return z(this,this.g.ra)},W.prototype.readPackedSint64=W.prototype.Ua,W.prototype.Na=function(){return z(this,this.g.u)},W.prototype.readPackedFixed32=W.prototype.Na,W.prototype.Oa=function(){return z(this,this.g.R)},W.prototype.readPackedFixed64=W.prototype.Oa,W.prototype.Ra=function(){return z(this,this.g.G)},W.prototype.readPackedSfixed32=W.prototype.Ra,W.prototype.Sa=function(){return z(this,this.g.P)},W.prototype.readPackedSfixed64=W.prototype.Sa,W.prototype.Pa=function(){return z(this,this.g.O)},W.prototype.readPackedFloat=W.prototype.Pa,W.prototype.La=function(){return z(this,this.g.N)},W.prototype.readPackedDouble=W.prototype.La,W.prototype.Ka=function(){return z(this,this.g.ba)},W.prototype.readPackedBool=W.prototype.Ka,W.prototype.Ma=function(){return z(this,this.g.da)},W.prototype.readPackedEnum=W.prototype.Ma,_.prototype.reset=function(){this.j=[],this.g.end(),this.h=0,this.o=[]},_.prototype.oa=function(){l(0==this.o.length);for(var t=new Uint8Array(this.h+this.g.length()),o=this.j,e=o.length,r=0,i=0;i<e;i++){var n=o[i];t.set(n,r),r+=n.length}return o=this.g.end(),t.set(o,r),l((r+=o.length)==t.length),this.j=[t],t},_.prototype.getResultBuffer=_.prototype.oa,_.prototype.T=function(t,o){null!=o&&(l(-2147483648<=o&&2147483648>o),null!=o&&(X(this,t,0),D(this.g,o)))},_.prototype.writeInt32=_.prototype.T,_.prototype.U=function(t,o){null!=o&&(l(-0x8000000000000000<=o&&0x8000000000000000>o),null!=o&&(X(this,t,0),T(this.g,o)))},_.prototype.writeInt64=_.prototype.U,_.prototype.A=function(t,o){null!=o&&(l(0<=o&&4294967296>o),null!=o&&(X(this,t,0),N(this.g,o)))},_.prototype.writeUint32=_.prototype.A,_.prototype.W=function(t,o){null!=o&&(l(0<=o&&0x10000000000000000>o),null!=o&&(X(this,t,0),G(this.g,o)))},_.prototype.writeUint64=_.prototype.W,_.prototype.Kb=function(t,o){null!=o&&(l(-2147483648<=o&&2147483648>o),null!=o&&(X(this,t,0),L(this.g,o)))},_.prototype.writeSint32=_.prototype.Kb,_.prototype.Lb=function(t,o){null!=o&&(l(-0x8000000000000000<=o&&0x8000000000000000>o),null!=o&&(X(this,t,0),V(this.g,o)))},_.prototype.writeSint64=_.prototype.Lb,_.prototype.ua=function(t,o){null!=o&&(l(0<=o&&4294967296>o),X(this,t,5),this.g.A(o))},_.prototype.writeFixed32=_.prototype.ua,_.prototype.va=function(t,o){null!=o&&(l(0<=o&&0x10000000000000000>o),X(this,t,1),this.g.W(o))},_.prototype.writeFixed64=_.prototype.va,_.prototype.wa=function(t,o){null!=o&&(l(-2147483648<=o&&2147483648>o),X(this,t,5),this.g.T(o))},_.prototype.writeSfixed32=_.prototype.wa,_.prototype.xa=function(t,o){null!=o&&(l(-0x8000000000000000<=o&&0x8000000000000000>o),X(this,t,1),this.g.U(o))},_.prototype.writeSfixed64=_.prototype.xa,_.prototype.J=function(t,o){null!=o&&(X(this,t,5),this.g.J(o))},_.prototype.writeFloat=_.prototype.J,_.prototype.I=function(t,o){null!=o&&(X(this,t,1),this.g.I(o))},_.prototype.writeDouble=_.prototype.I,_.prototype.H=function(t,o){null!=o&&(l("boolean"==typeof o||"number"==typeof o),X(this,t,0),this.g.H(o))},_.prototype.writeBool=_.prototype.H,_.prototype.S=function(t,o){null!=o&&(l(-2147483648<=o&&2147483648>o),X(this,t,0),D(this.g,o))},_.prototype.writeEnum=_.prototype.S,_.prototype.V=function(t,o){null!=o&&(t=H(this,t),this.g.V(o),K(this,t))},_.prototype.writeString=_.prototype.V,_.prototype.ja=function(t,o){null!=o&&(o=M(o),X(this,t,2),N(this.g,o.length),t=this.g.end(),this.j.push(t),this.j.push(o),this.h+=t.length+o.length)},_.prototype.writeBytes=_.prototype.ja,_.prototype.cb=function(t,o,e){null!=o&&(t=H(this,t),e(o,this),K(this,t))},_.prototype.writeMessage=_.prototype.cb,_.prototype.bb=function(t,o,e){null!=o&&(X(this,t,3),e(o,this),X(this,t,4))},_.prototype.writeGroup=_.prototype.bb,_.prototype.ka=function(t,o){if(null!=o)for(var e=0;e<o.length;e++){var r=o[e];null!=r&&(X(this,t,0),D(this.g,r))}},_.prototype.writeRepeatedInt32=_.prototype.ka,_.prototype.Bb=function(t,o){if(null!=o)for(var e=0;e<o.length;e++){var r=o[e];null!=r&&(X(this,t,0),T(this.g,r))}},_.prototype.writeRepeatedInt64=_.prototype.Bb,_.prototype.Ib=function(t,o){if(null!=o)for(var e=0;e<o.length;e++){var r=o[e];null!=r&&(X(this,t,0),N(this.g,r))}},_.prototype.writeRepeatedUint32=_.prototype.Ib,_.prototype.Jb=function(t,o){if(null!=o)for(var e=0;e<o.length;e++){var r=o[e];null!=r&&(X(this,t,0),G(this.g,r))}},_.prototype.writeRepeatedUint64=_.prototype.Jb,_.prototype.Fb=function(t,o){if(null!=o)for(var e=0;e<o.length;e++){var r=o[e];null!=r&&(X(this,t,0),L(this.g,r))}},_.prototype.writeRepeatedSint32=_.prototype.Fb,_.prototype.Gb=function(t,o){if(null!=o)for(var e=0;e<o.length;e++){var r=o[e];null!=r&&(X(this,t,0),V(this.g,r))}},_.prototype.writeRepeatedSint64=_.prototype.Gb,_.prototype.wb=function(t,o){if(null!=o)for(var e=0;e<o.length;e++)this.ua(t,o[e])},_.prototype.writeRepeatedFixed32=_.prototype.wb,_.prototype.xb=function(t,o){if(null!=o)for(var e=0;e<o.length;e++)this.va(t,o[e])},_.prototype.writeRepeatedFixed64=_.prototype.xb,_.prototype.yb=function(t,o){if(null!=o)for(var e=0;e<o.length;e++){var r=t,i=o[e];if(null!=i){t:{for(var n=new y(0,0),p=new y(0,0),h=0;h<i.length;h++){if("0">i[h]||"9"<i[h]){i=null;break t}p.g=parseInt(i[h],10);var s=b(n.g);(n=b(n.h)).h=n.g,n.g=0,n=s.add(n).add(p)}i=n}X(this,r,1),R(this.g,i.g,i.h)}}},_.prototype.writeRepeatedFixed64String=_.prototype.yb,_.prototype.Db=function(t,o){if(null!=o)for(var e=0;e<o.length;e++)this.wa(t,o[e])},_.prototype.writeRepeatedSfixed32=_.prototype.Db,_.prototype.Eb=function(t,o){if(null!=o)for(var e=0;e<o.length;e++)this.xa(t,o[e])},_.prototype.writeRepeatedSfixed64=_.prototype.Eb,_.prototype.zb=function(t,o){if(null!=o)for(var e=0;e<o.length;e++)this.J(t,o[e])},_.prototype.writeRepeatedFloat=_.prototype.zb,_.prototype.ub=function(t,o){if(null!=o)for(var e=0;e<o.length;e++)this.I(t,o[e])},_.prototype.writeRepeatedDouble=_.prototype.ub,_.prototype.sb=function(t,o){if(null!=o)for(var e=0;e<o.length;e++)this.H(t,o[e])},_.prototype.writeRepeatedBool=_.prototype.sb,_.prototype.vb=function(t,o){if(null!=o)for(var e=0;e<o.length;e++)this.S(t,o[e])},_.prototype.writeRepeatedEnum=_.prototype.vb,_.prototype.Hb=function(t,o){if(null!=o)for(var e=0;e<o.length;e++)this.V(t,o[e])},_.prototype.writeRepeatedString=_.prototype.Hb,_.prototype.tb=function(t,o){if(null!=o)for(var e=0;e<o.length;e++)this.ja(t,o[e])},_.prototype.writeRepeatedBytes=_.prototype.tb,_.prototype.Cb=function(t,o,e){if(null!=o)for(var r=0;r<o.length;r++){var i=H(this,t);e(o[r],this),K(this,i)}},_.prototype.writeRepeatedMessage=_.prototype.Cb,_.prototype.Ab=function(t,o,e){if(null!=o)for(var r=0;r<o.length;r++)X(this,t,3),e(o[r],this),X(this,t,4)},_.prototype.writeRepeatedGroup=_.prototype.Ab,_.prototype.kb=function(t,o){if(null!=o&&o.length){t=H(this,t);for(var e=0;e<o.length;e++)D(this.g,o[e]);K(this,t)}},_.prototype.writePackedInt32=_.prototype.kb,_.prototype.lb=function(t,o){if(null!=o&&o.length){t=H(this,t);for(var e=0;e<o.length;e++)T(this.g,o[e]);K(this,t)}},_.prototype.writePackedInt64=_.prototype.lb,_.prototype.qb=function(t,o){if(null!=o&&o.length){t=H(this,t);for(var e=0;e<o.length;e++)N(this.g,o[e]);K(this,t)}},_.prototype.writePackedUint32=_.prototype.qb,_.prototype.rb=function(t,o){if(null!=o&&o.length){t=H(this,t);for(var e=0;e<o.length;e++)G(this.g,o[e]);K(this,t)}},_.prototype.writePackedUint64=_.prototype.rb,_.prototype.ob=function(t,o){if(null!=o&&o.length){t=H(this,t);for(var e=0;e<o.length;e++)L(this.g,o[e]);K(this,t)}},_.prototype.writePackedSint32=_.prototype.ob,_.prototype.pb=function(t,o){if(null!=o&&o.length){t=H(this,t);for(var e=0;e<o.length;e++)V(this.g,o[e]);K(this,t)}},_.prototype.writePackedSint64=_.prototype.pb,_.prototype.hb=function(t,o){if(null!=o&&o.length)for(X(this,t,2),N(this.g,4*o.length),t=0;t<o.length;t++)this.g.A(o[t])},_.prototype.writePackedFixed32=_.prototype.hb,_.prototype.ib=function(t,o){if(null!=o&&o.length)for(X(this,t,2),N(this.g,8*o.length),t=0;t<o.length;t++)this.g.W(o[t])},_.prototype.writePackedFixed64=_.prototype.ib,_.prototype.mb=function(t,o){if(null!=o&&o.length)for(X(this,t,2),N(this.g,4*o.length),t=0;t<o.length;t++)this.g.T(o[t])},_.prototype.writePackedSfixed32=_.prototype.mb,_.prototype.nb=function(t,o){if(null!=o&&o.length)for(X(this,t,2),N(this.g,8*o.length),t=0;t<o.length;t++)this.g.U(o[t])},_.prototype.writePackedSfixed64=_.prototype.nb,_.prototype.jb=function(t,o){if(null!=o&&o.length)for(X(this,t,2),N(this.g,4*o.length),t=0;t<o.length;t++)this.g.J(o[t])},_.prototype.writePackedFloat=_.prototype.jb,_.prototype.fb=function(t,o){if(null!=o&&o.length)for(X(this,t,2),N(this.g,8*o.length),t=0;t<o.length;t++)this.g.I(o[t])},_.prototype.writePackedDouble=_.prototype.fb,_.prototype.eb=function(t,o){if(null!=o&&o.length)for(X(this,t,2),N(this.g,o.length),t=0;t<o.length;t++)this.g.H(o[t])},_.prototype.writePackedBool=_.prototype.eb,_.prototype.gb=function(t,o){if(null!=o&&o.length){t=H(this,t);for(var e=0;e<o.length;e++)this.g.S(o[e]);K(this,t)}},_.prototype.writePackedEnum=_.prototype.gb,i("jspb.Map",q),q.prototype.l=function(){if(this.arrClean){if(this.h){var t,o=this.g;for(t in o)if(Object.prototype.hasOwnProperty.call(o,t)){var e=o[t].g;e&&e.l()}}}else{for(this.j.length=0,(o=$(this)).sort(),t=0;t<o.length;t++){var r=this.g[o[t]];(e=r.g)&&e.l(),this.j.push([r.key,r.value])}this.arrClean=!0}return this.j},q.prototype.toArray=q.prototype.l,q.prototype.ta=function(t,o){for(var e=this.l(),r=[],i=0;i<e.length;i++){var n=this.g[e[i][0].toString()];Z(this,n);var p=n.g;p?(l(o),r.push([n.key,o(t,p)])):r.push([n.key,n.value])}return r},q.prototype.toObject=q.prototype.ta,q.fromObject=function(t,o,e){o=new q([],o);for(var r=0;r<t.length;r++){var i=t[r][0],n=e(t[r][1]);o.set(i,n)}return o},Y.prototype.next=function(){return this.h<this.g.length?{done:!1,value:this.g[this.h++]}:{done:!0,value:void 0}},"undefined"!=typeof Symbol&&(Y.prototype[Symbol.iterator]=function(){return this}),q.prototype.Ea=function(){return $(this).length},q.prototype.getLength=q.prototype.Ea,q.prototype.clear=function(){this.g={},this.arrClean=!1},q.prototype.clear=q.prototype.clear,q.prototype.Aa=function(t){t=t.toString();var o=this.g.hasOwnProperty(t);return delete this.g[t],this.arrClean=!1,o},q.prototype.del=q.prototype.Aa,q.prototype.Ba=function(){var t=[],o=$(this);o.sort();for(var e=0;e<o.length;e++){var r=this.g[o[e]];t.push([r.key,r.value])}return t},q.prototype.getEntryList=q.prototype.Ba,q.prototype.entries=function(){var t=[],o=$(this);o.sort();for(var e=0;e<o.length;e++){var r=this.g[o[e]];t.push([r.key,Z(this,r)])}return new Y(t)},q.prototype.entries=q.prototype.entries,q.prototype.keys=function(){var t=[],o=$(this);o.sort();for(var e=0;e<o.length;e++)t.push(this.g[o[e]].key);return new Y(t)},q.prototype.keys=q.prototype.keys,q.prototype.values=function(){var t=[],o=$(this);o.sort();for(var e=0;e<o.length;e++)t.push(Z(this,this.g[o[e]]));return new Y(t)},q.prototype.values=q.prototype.values,q.prototype.forEach=function(t,o){var e=$(this);e.sort();for(var r=0;r<e.length;r++){var i=this.g[e[r]];t.call(o,Z(this,i),i.key,this)}},q.prototype.forEach=q.prototype.forEach,q.prototype.set=function(t,o){var e=new Q(t);return this.h?(e.g=o,e.value=o.l()):e.value=o,this.g[t.toString()]=e,this.arrClean=!1,this},q.prototype.set=q.prototype.set,q.prototype.get=function(t){if(t=this.g[t.toString()])return Z(this,t)},q.prototype.get=q.prototype.get,q.prototype.has=function(t){return t.toString()in this.g},q.prototype.has=q.prototype.has,q.prototype.sa=function(t,o,e,r,i){var n=$(this);n.sort();for(var p=0;p<n.length;p++){var h=this.g[n[p]];o.o.push(H(o,t)),e.call(o,1,h.key),this.h?r.call(o,2,Z(this,h),i):r.call(o,2,h.value),l(0<=(h=o).o.length),K(h,h.o.pop())}},q.prototype.serializeBinary=q.prototype.sa,q.deserializeBinary=function(t,o,e,r,i,n,p){for(;o.M()&&!o.aa();){var h=o.j;1==h?n=e.call(o):2==h&&(t.h?(l(i),p||(p=new t.h),r.call(o,p,i)):p=r.call(o))}l(null!=n),l(null!=p),t.set(n,p)},i("jspb.ExtensionFieldInfo",tt),i("jspb.ExtensionFieldBinaryInfo",(function(t,o,e,r,i,n){this.ma=t,this.X=o,this.Y=e,this.la=r,this.ya=i,this.Fa=n})),tt.prototype.C=function(){return!!this.ctor},tt.prototype.isMessageType=tt.prototype.C,i("jspb.Message",ot),ot.GENERATE_TO_OBJECT=!0,ot.GENERATE_FROM_OBJECT=!0;var et="function"==typeof Uint8Array;function rt(t,o,e,r,i,n){if(t.i=null,o||(o=e?[e]:[]),t.h=e?String(e):void 0,t.B=0===e?-1:0,t.s=o,o=-1,!(e=t.s.length)||(o=e-1,null===(e=t.s[o])||"object"!=typeof e||Array.isArray(e)||et&&e instanceof Uint8Array)?-1<r?(t.F=Math.max(r,o+1-t.B),t.m=null):t.F=Number.MAX_VALUE:(t.F=o-t.B,t.m=e),t.g={},i)for(r=0;r<i.length;r++)(o=i[r])<t.F?(o+=t.B,t.s[o]=t.s[o]||it):(nt(t),t.m[o]=t.m[o]||it);if(n&&n.length)for(r=0;r<n.length;r++)bt(t,n[r])}ot.prototype.Da=function(){return this.h},ot.prototype.getJsPbMessageId=ot.prototype.Da,ot.initialize=rt;var it=Object.freeze?Object.freeze([]):[];function nt(t){var o=t.F+t.B;t.s[o]||(t.m=t.s[o]={})}function pt(t,o,e){for(var r=[],i=0;i<t.length;i++)r[i]=o.call(t[i],e,t[i]);return r}function ht(t,o){if(o<t.F){o+=t.B;var e=t.s[o];return e===it?t.s[o]=[]:e}if(t.m)return(e=t.m[o])===it?t.m[o]=[]:e}function st(t,o){return null==(t=ht(t,o))?t:+t}function at(t,o){return null==(t=ht(t,o))?t:!!t}function ut(t){if(null==t||"string"==typeof t)return t;if(et&&t instanceof Uint8Array){var o;void 0===o&&(o=0),a(),o=p[o];const e=Array(Math.floor(t.length/3)),s=o[64]||"";let u=0,l=0;for(;u<t.length-2;u+=3){var r=t[u],i=t[u+1],n=t[u+2],h=o[r>>2];r=o[(3&r)<<4|i>>4],i=o[(15&i)<<2|n>>6],n=o[63&n],e[l++]=h+r+i+n}switch(h=0,n=s,t.length-u){case 2:n=o[(15&(h=t[u+1]))<<2]||s;case 1:t=t[u],e[l]=o[t>>2]+o[(3&t)<<4|h>>4]+n+s}return e.join("")}return f("Cannot coerce to b64 string: "+e(t)),null}function lt(t){return null==t||t instanceof Uint8Array?t:"string"==typeof t?s(t):(f("Cannot coerce to Uint8Array: "+e(t)),null)}function ft(t){if(t&&1<t.length){var o=e(t[0]);!function(t,o){Array.prototype.forEach.call(t,o,void 0)}(t,(function(t){e(t)!=o&&f("Inconsistent type in JSPB repeated field array. Got "+e(t)+" expected "+o)}))}}function gt(t,o,e){return null==(t=ht(t,o))?e:t}function ct(t,o,e){return g(t),o<t.F?t.s[o+t.B]=e:(nt(t),t.m[o]=e),t}function yt(t,o,e,r){return g(t),e!==r?ct(t,o,e):o<t.F?t.s[o+t.B]=null:(nt(t),delete t.m[o]),t}function dt(t,o,e,r){return g(t),o=ht(t,o),null!=r?o.splice(r,0,e):o.push(e),t}function vt(t,o,e,r){return g(t),(e=bt(t,e))&&e!==o&&void 0!==r&&(t.i&&e in t.i&&(t.i[e]=void 0),ct(t,e,void 0)),ct(t,o,r)}function bt(t,o){for(var e,r,i=0;i<o.length;i++){var n=o[i],p=ht(t,n);null!=p&&(e=n,r=p,ct(t,n,void 0))}return e?(ct(t,e,r),e):0}function wt(t,o,e){if(t.i||(t.i={}),!t.i[e]){for(var r=ht(t,e),i=[],n=0;n<r.length;n++)i[n]=new o(r[n]);t.i[e]=i}}function jt(t){if(t.i)for(var o in t.i){var e=t.i[o];if(Array.isArray(e))for(var r=0;r<e.length;r++)e[r]&&e[r].l();else e&&e.l()}}function Ft(t,o){t=t||{},o=o||{};var e,r={};for(e in t)r[e]=0;for(e in o)r[e]=0;for(e in r)if(!mt(t[e],o[e]))return!1;return!0}function mt(t,o){if(t==o)return!0;if(!r(t)||!r(o))return!!("number"==typeof t&&isNaN(t)||"number"==typeof o&&isNaN(o))&&String(t)==String(o);if(t.constructor!=o.constructor)return!1;if(et&&t.constructor===Uint8Array){if(t.length!=o.length)return!1;for(var e=0;e<t.length;e++)if(t[e]!=o[e])return!1;return!0}if(t.constructor===Array){var i=void 0,n=void 0,p=Math.max(t.length,o.length);for(e=0;e<p;e++){var h=t[e],s=o[e];if(h&&h.constructor==Object&&(l(void 0===i),l(e===t.length-1),i=h,h=void 0),s&&s.constructor==Object&&(l(void 0===n),l(e===o.length-1),n=s,s=void 0),!mt(h,s))return!1}return!i&&!n||Ft(i=i||{},n=n||{})}if(t.constructor===Object)return Ft(t,o);throw Error("Invalid type in JSPB array")}function xt(t){return new t.constructor(At(t.l()))}function At(t){if(Array.isArray(t)){for(var o=Array(t.length),e=0;e<t.length;e++){var r=t[e];null!=r&&(o[e]="object"==typeof r?At(l(r)):r)}return o}if(et&&t instanceof Uint8Array)return new Uint8Array(t);for(e in o={},t)null!=(r=t[e])&&(o[e]="object"==typeof r?At(l(r)):r);return o}function kt(t){rt(this,t,0,-1,Mt,null)}ot.toObjectList=pt,ot.toObjectExtension=function(t,o,e,r,i){for(var n in e){var p=e[n],h=r.call(t,p);if(null!=h){for(var s in p.na)if(p.na.hasOwnProperty(s))break;o[s]=p.ia?p.L?pt(h,p.ia,i):p.ia(i,h):h}}},ot.serializeBinaryExtensions=function(t,o,e,r){for(var i in e){var n=e[i],p=n.ma;if(!n.Y)throw Error("Message extension present that was generated without binary serialization support");var h=r.call(t,p);if(null!=h)if(p.C()){if(!n.la)throw Error("Message extension present holding submessage without binary support enabled, and message is being serialized to binary format");n.Y.call(o,p.K,h,n.la)}else n.Y.call(o,p.K,h)}},ot.readBinaryExtension=function(t,o,e,r,i){var n=e[o.j];if(n){if(e=n.ma,!n.X)throw Error("Deserializing extension whose generated code does not support binary format");if(e.C()){var p=new e.ctor;n.X.call(o,p,n.ya)}else p=n.X.call(o);e.L&&!n.Fa?(o=r.call(t,e))?o.push(p):i.call(t,e,[p]):i.call(t,e,p)}else J(o)},ot.getField=ht,ot.getRepeatedField=function(t,o){return ht(t,o)},ot.getOptionalFloatingPointField=st,ot.getBooleanField=at,ot.getRepeatedFloatingPointField=function(t,o){var e=ht(t,o);if(t.g||(t.g={}),!t.g[o]){for(var r=0;r<e.length;r++)e[r]=+e[r];t.g[o]=!0}return e},ot.getRepeatedBooleanField=function(t,o){var e=ht(t,o);if(t.g||(t.g={}),!t.g[o]){for(var r=0;r<e.length;r++)e[r]=!!e[r];t.g[o]=!0}return e},ot.bytesAsB64=ut,ot.bytesAsU8=lt,ot.bytesListAsB64=function(t){return ft(t),t.length&&"string"!=typeof t[0]?n(t,ut):t},ot.bytesListAsU8=function(t){return ft(t),!t.length||t[0]instanceof Uint8Array?t:n(t,lt)},ot.getFieldWithDefault=gt,ot.getBooleanFieldWithDefault=function(t,o,e){return null==(t=at(t,o))?e:t},ot.getFloatingPointFieldWithDefault=function(t,o,e){return null==(t=st(t,o))?e:t},ot.getFieldProto3=gt,ot.getMapField=function(t,o,e,r){if(t.i||(t.i={}),o in t.i)return t.i[o];var i=ht(t,o);if(!i){if(e)return;ct(t,o,i=[])}return t.i[o]=new q(i,r)},ot.setField=ct,ot.setProto3IntField=function(t,o,e){return yt(t,o,e,0)},ot.setProto3FloatField=function(t,o,e){return yt(t,o,e,0)},ot.setProto3BooleanField=function(t,o,e){return yt(t,o,e,!1)},ot.setProto3StringField=function(t,o,e){return yt(t,o,e,"")},ot.setProto3BytesField=function(t,o,e){return yt(t,o,e,"")},ot.setProto3EnumField=function(t,o,e){return yt(t,o,e,0)},ot.setProto3StringIntField=function(t,o,e){return yt(t,o,e,"0")},ot.addToRepeatedField=dt,ot.setOneofField=vt,ot.computeOneofCase=bt,ot.getWrapperField=function(t,o,e,r){if(t.i||(t.i={}),!t.i[e]){var i=ht(t,e);(r||i)&&(t.i[e]=new o(i))}return t.i[e]},ot.getRepeatedWrapperField=function(t,o,e){return wt(t,o,e),(o=t.i[e])==it&&(o=t.i[e]=[]),o},ot.setWrapperField=function(t,o,e){g(t),t.i||(t.i={});var r=e?e.l():e;return t.i[o]=e,ct(t,o,r)},ot.setOneofWrapperField=function(t,o,e,r){g(t),t.i||(t.i={});var i=r?r.l():r;return t.i[o]=r,vt(t,o,e,i)},ot.setRepeatedWrapperField=function(t,o,e){g(t),t.i||(t.i={}),e=e||[];for(var r=[],i=0;i<e.length;i++)r[i]=e[i].l();return t.i[o]=e,ct(t,o,r)},ot.addToRepeatedWrapperField=function(t,o,e,r,i){wt(t,r,o);var n=t.i[o];return n||(n=t.i[o]=[]),e=e||new r,t=ht(t,o),null!=i?(n.splice(i,0,e),t.splice(i,0,e.l())):(n.push(e),t.push(e.l())),e},ot.toMap=function(t,o,e,r){for(var i={},n=0;n<t.length;n++)i[o.call(t[n])]=e?e.call(t[n],r,t[n]):t[n];return i},ot.prototype.l=function(){return jt(this),this.s},ot.prototype.toArray=ot.prototype.l,ot.prototype.toString=function(){return jt(this),this.s.toString()},ot.prototype.getExtension=function(t){if(this.m){this.i||(this.i={});var o=t.K;if(t.L){if(t.C())return this.i[o]||(this.i[o]=n(this.m[o]||[],(function(o){return new t.ctor(o)}))),this.i[o]}else if(t.C())return!this.i[o]&&this.m[o]&&(this.i[o]=new t.ctor(this.m[o])),this.i[o];return this.m[o]}},ot.prototype.getExtension=ot.prototype.getExtension,ot.prototype.ab=function(t,o){this.i||(this.i={}),nt(this);var e=t.K;return t.L?(o=o||[],t.C()?(this.i[e]=o,this.m[e]=n(o,(function(t){return t.l()}))):this.m[e]=o):t.C()?(this.i[e]=o,this.m[e]=o?o.l():o):this.m[e]=o,this},ot.prototype.setExtension=ot.prototype.ab,ot.difference=function(t,o){if(!(t instanceof o.constructor))throw Error("Messages have different types.");var e=t.l();o=o.l();var r=[],i=0,n=e.length>o.length?e.length:o.length;for(t.h&&(r[0]=t.h,i=1);i<n;i++)mt(e[i],o[i])||(r[i]=o[i]);return new t.constructor(r)},ot.equals=function(t,o){return t==o||!(!t||!o)&&t instanceof o.constructor&&mt(t.l(),o.l())},ot.compareExtensions=Ft,ot.compareFields=mt,ot.prototype.za=function(){return xt(this)},ot.prototype.cloneMessage=ot.prototype.za,ot.prototype.clone=function(){return xt(this)},ot.prototype.clone=ot.prototype.clone,ot.clone=function(t){return xt(t)},ot.copyInto=function(t,o){g(t),g(o),l(t.constructor==o.constructor,"Copy source and target message should have the same type."),t=xt(t);for(var e=o.l(),r=t.l(),i=e.length=0;i<r.length;i++)e[i]=r[i];o.i=t.i,o.m=t.m},ot.registerMessageType=function(t,o){o.Nb=t},function(t,o){function e(){}e.prototype=o.prototype,t.Ob=o.prototype,t.prototype=new e,t.prototype.constructor=t,t.base=function(t,e,r){for(var i=Array(arguments.length-2),n=2;n<arguments.length;n++)i[n-2]=arguments[n];return o.prototype[e].apply(t,i)}}(kt,ot);var Mt=[1,3];function St(t){t=new W(t);for(var o=new kt;t.M()&&!t.aa();)switch(t.j){case 1:for(var e=t.Z()?t.ea():[t.G()],r=0;r<e.length;r++)dt(o,1,e[r],void 0);break;case 3:for(e=t.Z()?t.ea():[t.G()],r=0;r<e.length;r++)dt(o,3,e[r],void 0);break;default:J(t)}return o}kt.prototype.ta=function(t){var o,e={Qb:null==(o=ht(this,1))?void 0:o,Pb:null==(o=ht(this,3))?void 0:o};return t&&(e.Mb=this),e},kt.prototype.sa=function(){var t=new _,o=ht(this,1);return 0<o.length&&t.ka(1,o),0<(o=ht(this,3)).length&&t.ka(3,o),t.oa()},i("parseClientVariations",(function(t){var o="";try{o=atob(t)}catch(t){}t=[];for(let e=0;e<o.length;e++)t.push(o.charCodeAt(e));o=null;try{o=St(t)}catch(t){o=St([])}return{variationIds:ht(o,1),triggerVariationIds:ht(o,3)}})),i("formatClientVariations",(function(t,o="Active Google-visible variation IDs on this client. These are reported for analysis, but do not directly affect any server-side behavior.",e="Active Google-visible variation IDs on this client that trigger server-side behavior. These are reported for analysis *and* directly affect server-side behavior."){const r=t.variationIds;t=t.triggerVariationIds;const i=["message ClientVariations {"];return r.length&&i.push(`  // ${o}`,`  repeated int32 variation_id = [${r.join(", ")}];`),t.length&&i.push(`  // ${e}`,`  repeated int32 trigger_variation_id = [${t.join(", ")}];`),i.push("}"),i.join("\n")}))}).call(t);export{e as formatClientVariations,o as parseClientVariations};