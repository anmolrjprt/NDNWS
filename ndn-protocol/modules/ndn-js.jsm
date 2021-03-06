/* This file is created by running make-ndn-js.jsm.sh in this directory.
 * It concatenates ndn-js-header.txt with all the ndn-js source files to
 *   make ndn-js.jsm .
 * The file ../../build/ndn.min.js must already be built.
 *
 * Copyright (C) 2013-2014 Regents of the University of California.
 * author: Jeff Thompson <jefft0@remap.ucla.edu>
 * See COPYING for copyright and distribution information.
 */

var EXPORTED_SYMBOLS = ["Closure", "Data", "DataUtils", "Exclude", 
  "ExponentialReExpressClosure", "Interest", "MimeTypes", "Face", "Name", 
  "Sha256", "WireFormat", "BinaryXmlWireFormat", "XpcomTransport", "Buffer"];

Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
Components.utils.import("resource://gre/modules/NetUtil.jsm");

// jsbn.js needs the navigator object which isn't defined in XPCOM, so make a local hack.
var navigator = {
    appName: "Netscape"
};

// Some code calls console.log without checking LOG>0.  Until this is cleaned up, make a local hack console.
var console = {
    log: function(message) {
        dump(message);
        dump("\n");
    }
};

// The Face class uses setTimeout and clearTimeout, so define them using XPCOM.
function setTimeout(callback, delay) {
    var timer = Components.classes["@mozilla.org/timer;1"].createInstance(Components.interfaces.nsITimer);
    timer.initWithCallback({notify: callback}, delay, Components.interfaces.nsITimer.TYPE_ONE_SHOT);
    return timer;
}

function clearTimeout(timer) {
    timer.cancel();
}
/*
 <a href="http://kjur.github.io/jsrsasign/license/">MIT License</a>
 <a href="http://kjur.github.io/jsrsasign/license/">MIT License</a>
 <a href="http://kjur.github.io/jsrsasign/license/">MIT License</a>
 <a href="http://kjur.github.io/jsrsasign/license/">MIT License</a>
 <a href="http://kjur.github.io/jsrsasign/license/">MIT License</a>
*/
var ndn=ndn||{},exports=ndn,require=function(){return ndn},Buffer=function Buffer(b,c){var d;if("number"==typeof b)d=new Uint8Array(b);else if("string"==typeof b)if(null==c||"utf8"==c){var e=Buffer.str2rstr_utf8(b);d=new Uint8Array(e.length);for(var f=0;f<e.length;f++)d[f]=e.charCodeAt(f)}else if("binary"==c){d=new Uint8Array(b.length);for(f=0;f<b.length;f++)d[f]=b.charCodeAt(f)}else if("hex"==c)d=new Uint8Array(Math.floor(b.length/2)),f=0,b.replace(/(..)/g,function(b){d[f++]=parseInt(b,16)});else if("base64"==
c)e=b64tohex(b),d=new Uint8Array(Math.floor(e.length/2)),f=0,e.replace(/(..)/g,function(b){d[f++]=parseInt(b,16)});else throw Error("Buffer: unknown encoding format "+c);else if("object"==typeof b&&(b instanceof Uint8Array||b instanceof Buffer))d=!1==c?b.subarray(0):new Uint8Array(b);else if("object"==typeof b&&b instanceof ArrayBuffer)d=new Uint8Array(b);else if("object"==typeof b)d=new Uint8Array(b);else throw Error("Buffer: unknown data type.");try{d.__proto__=Buffer.prototype}catch(g){throw Error("Buffer: Set obj.__proto__ exception: "+
g);}d.__proto__.toString=function(b){if(null==b){for(var c="",d=0;d<this.length;d++)c+=String.fromCharCode(this[d]);return c}c="";for(d=0;d<this.length;d++)c+=(16>this[d]?"0":"")+this[d].toString(16);if("hex"==b)return c;if("base64"==b)return hex2b64(c);throw Error("Buffer.toString: unknown encoding format "+b);};d.__proto__.slice=function(b,c){return void 0!==c?new Buffer(this.subarray(b,c),!1):new Buffer(this.subarray(b),!1)};d.__proto__.copy=function(b,c){void 0!==c?b.set(this,c):b.set(this)};
return d};Buffer.prototype=Uint8Array.prototype;Buffer.concat=function(a){for(var b=0,c=0;c<a.length;++c)b+=a[c].length;for(var b=new Buffer(b),d=0,c=0;c<a.length;++c)b.set(a[c],d),d+=a[c].length;return b};
Buffer.str2rstr_utf8=function(a){for(var b="",c=-1,d,e;++c<a.length;)d=a.charCodeAt(c),e=c+1<a.length?a.charCodeAt(c+1):0,55296<=d&&(56319>=d&&56320<=e&&57343>=e)&&(d=65536+((d&1023)<<10)+(e&1023),c++),127>=d?b+=String.fromCharCode(d):2047>=d?b+=String.fromCharCode(192|d>>>6&31,128|d&63):65535>=d?b+=String.fromCharCode(224|d>>>12&15,128|d>>>6&63,128|d&63):2097151>=d&&(b+=String.fromCharCode(240|d>>>18&7,128|d>>>12&63,128|d>>>6&63,128|d&63));return b};
exports.createHash=function(a){if("sha256"!=a)throw Error("createHash: unsupported algorithm.");a={};a.md=new KJUR.crypto.MessageDigest({alg:"sha256",prov:"cryptojs"});a.update=function(a){this.md.updateHex(a.toString("hex"))};a.digest=function(){return new Buffer(this.md.digest(),"hex")};return a};
exports.createSign=function(a){if("RSA-SHA256"!=a)throw Error("createSign: unsupported algorithm.");return{arr:[],update:function(a){this.arr.push(a)},sign:function(a){var c=new RSAKey;c.readPrivateKeyFromPEMString(a);a=new KJUR.crypto.Signature({alg:"SHA256withRSA",prov:"cryptojs/jsrsa"});a.initSign(c);for(c=0;c<this.arr.length;++c)a.updateHex(this.arr[c].toString("hex"));return new Buffer(a.sign(),"hex")}}};
exports.createVerify=function(a){if("RSA-SHA256"!=a)throw Error("createSign: unsupported algorithm.");return{arr:[],update:function(a){this.arr.push(a)},verify:function(a,c){var d=new ndn.Key;d.fromPemString(a);var e;d=d.publicToDER().toString("hex");e=ASN1HEX.getPosArrayOfChildren_AtObj(d,0);2!=e.length?e=-1:(e=e[1],"03"!=d.substring(e,e+2)?e=-1:(e=ASN1HEX.getStartPosOfV_AtObj(d,e),e="00"!=d.substring(e,e+2)?-1:e+2));var f=ASN1HEX.getPosArrayOfChildren_AtObj(d,e);2!=f.length?e=null:(e=ASN1HEX.getHexOfV_AtObj(d,
f[0]),d=ASN1HEX.getHexOfV_AtObj(d,f[1]),f=new RSAKey,f.setPublic(e,d),e=f);d=new KJUR.crypto.Signature({alg:"SHA256withRSA",prov:"cryptojs/jsrsa"});d.initVerifyByPublicKey(e);for(e=0;e<this.arr.length;e++)d.updateHex(this.arr[e].toString("hex"));e=c.toString("hex");return d.verify(e)}}};exports.randomBytes=function(a){for(var b=new Buffer(a),c=0;c<a;++c)b[c]=Math.floor(256*Math.random());return b};
var CryptoJS=CryptoJS||function(a,b){var c={},d=c.lib={},e=function(){},f=d.Base={extend:function(a){e.prototype=this;var b=new e;a&&b.mixIn(a);b.hasOwnProperty("init")||(b.init=function(){b.$super.init.apply(this,arguments)});b.init.prototype=b;b.$super=this;return b},create:function(){var a=this.extend();a.init.apply(a,arguments);return a},init:function(){},mixIn:function(a){for(var b in a)a.hasOwnProperty(b)&&(this[b]=a[b]);a.hasOwnProperty("toString")&&(this.toString=a.toString)},clone:function(){return this.init.prototype.extend(this)}},
g=d.WordArray=f.extend({init:function(a,c){a=this.words=a||[];this.sigBytes=c!=b?c:4*a.length},toString:function(a){return(a||j).stringify(this)},concat:function(a){var b=this.words,c=a.words,d=this.sigBytes;a=a.sigBytes;this.clamp();if(d%4)for(var e=0;e<a;e++)b[d+e>>>2]|=(c[e>>>2]>>>24-8*(e%4)&255)<<24-8*((d+e)%4);else if(65535<c.length)for(e=0;e<a;e+=4)b[d+e>>>2]=c[e>>>2];else b.push.apply(b,c);this.sigBytes+=a;return this},clamp:function(){var b=this.words,c=this.sigBytes;b[c>>>2]&=4294967295<<
32-8*(c%4);b.length=a.ceil(c/4)},clone:function(){var a=f.clone.call(this);a.words=this.words.slice(0);return a},random:function(b){for(var c=[],d=0;d<b;d+=4)c.push(4294967296*a.random()|0);return new g.init(c,b)}}),h=c.enc={},j=h.Hex={stringify:function(a){var b=a.words;a=a.sigBytes;for(var c=[],d=0;d<a;d++){var e=b[d>>>2]>>>24-8*(d%4)&255;c.push((e>>>4).toString(16));c.push((e&15).toString(16))}return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d+=2)c[d>>>3]|=parseInt(a.substr(d,
2),16)<<24-4*(d%8);return new g.init(c,b/2)}},k=h.Latin1={stringify:function(a){var b=a.words;a=a.sigBytes;for(var c=[],d=0;d<a;d++)c.push(String.fromCharCode(b[d>>>2]>>>24-8*(d%4)&255));return c.join("")},parse:function(a){for(var b=a.length,c=[],d=0;d<b;d++)c[d>>>2]|=(a.charCodeAt(d)&255)<<24-8*(d%4);return new g.init(c,b)}},m=h.Utf8={stringify:function(a){try{return decodeURIComponent(escape(k.stringify(a)))}catch(b){throw Error("Malformed UTF-8 data");}},parse:function(a){return k.parse(unescape(encodeURIComponent(a)))}},
n=d.BufferedBlockAlgorithm=f.extend({reset:function(){this._data=new g.init;this._nDataBytes=0},_append:function(a){"string"==typeof a&&(a=m.parse(a));this._data.concat(a);this._nDataBytes+=a.sigBytes},_process:function(b){var c=this._data,d=c.words,e=c.sigBytes,f=this.blockSize,h=e/(4*f),h=b?a.ceil(h):a.max((h|0)-this._minBufferSize,0);b=h*f;e=a.min(4*b,e);if(b){for(var j=0;j<b;j+=f)this._doProcessBlock(d,j);j=d.splice(0,b);c.sigBytes-=e}return new g.init(j,e)},clone:function(){var a=f.clone.call(this);
a._data=this._data.clone();return a},_minBufferSize:0});d.Hasher=n.extend({cfg:f.extend(),init:function(a){this.cfg=this.cfg.extend(a);this.reset()},reset:function(){n.reset.call(this);this._doReset()},update:function(a){this._append(a);this._process();return this},finalize:function(a){a&&this._append(a);return this._doFinalize()},blockSize:16,_createHelper:function(a){return function(b,c){return(new a.init(c)).finalize(b)}},_createHmacHelper:function(a){return function(b,c){return(new p.HMAC.init(a,
c)).finalize(b)}}});var p=c.algo={};return c}(Math);
(function(a){for(var b=CryptoJS,c=b.lib,d=c.WordArray,e=c.Hasher,c=b.algo,f=[],g=[],h=function(a){return 4294967296*(a-(a|0))|0},j=2,k=0;64>k;){var m;a:{m=j;for(var n=a.sqrt(m),p=2;p<=n;p++)if(!(m%p)){m=!1;break a}m=!0}m&&(8>k&&(f[k]=h(a.pow(j,0.5))),g[k]=h(a.pow(j,1/3)),k++);j++}var l=[],c=c.SHA256=e.extend({_doReset:function(){this._hash=new d.init(f.slice(0))},_doProcessBlock:function(a,b){for(var c=this._hash.words,d=c[0],e=c[1],f=c[2],h=c[3],j=c[4],k=c[5],m=c[6],n=c[7],p=0;64>p;p++){if(16>p)l[p]=
a[b+p]|0;else{var q=l[p-15],r=l[p-2];l[p]=((q<<25|q>>>7)^(q<<14|q>>>18)^q>>>3)+l[p-7]+((r<<15|r>>>17)^(r<<13|r>>>19)^r>>>10)+l[p-16]}q=n+((j<<26|j>>>6)^(j<<21|j>>>11)^(j<<7|j>>>25))+(j&k^~j&m)+g[p]+l[p];r=((d<<30|d>>>2)^(d<<19|d>>>13)^(d<<10|d>>>22))+(d&e^d&f^e&f);n=m;m=k;k=j;j=h+q|0;h=f;f=e;e=d;d=q+r|0}c[0]=c[0]+d|0;c[1]=c[1]+e|0;c[2]=c[2]+f|0;c[3]=c[3]+h|0;c[4]=c[4]+j|0;c[5]=c[5]+k|0;c[6]=c[6]+m|0;c[7]=c[7]+n|0},_doFinalize:function(){var b=this._data,c=b.words,d=8*this._nDataBytes,e=8*b.sigBytes;
c[e>>>5]|=128<<24-e%32;c[(e+64>>>9<<4)+14]=a.floor(d/4294967296);c[(e+64>>>9<<4)+15]=d;b.sigBytes=4*c.length;this._process();return this._hash},clone:function(){var a=e.clone.call(this);a._hash=this._hash.clone();return a}});b.SHA256=e._createHelper(c);b.HmacSHA256=e._createHmacHelper(c)})(Math);var b64map="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/",b64pad="=";
function hex2b64(a){var b,c,d="";for(b=0;b+3<=a.length;b+=3)c=parseInt(a.substring(b,b+3),16),d+=b64map.charAt(c>>6)+b64map.charAt(c&63);b+1==a.length?(c=parseInt(a.substring(b,b+1),16),d+=b64map.charAt(c<<2)):b+2==a.length&&(c=parseInt(a.substring(b,b+2),16),d+=b64map.charAt(c>>2)+b64map.charAt((c&3)<<4));if(b64pad)for(;0<(d.length&3);)d+=b64pad;return d}
function b64tohex(a){var b="",c,d=0,e;for(c=0;c<a.length&&a.charAt(c)!=b64pad;++c)v=b64map.indexOf(a.charAt(c)),0>v||(0==d?(b+=int2char(v>>2),e=v&3,d=1):1==d?(b+=int2char(e<<2|v>>4),e=v&15,d=2):2==d?(b+=int2char(e),b+=int2char(v>>2),e=v&3,d=3):(b+=int2char(e<<2|v>>4),b+=int2char(v&15),d=0));1==d&&(b+=int2char(e<<2));return b}function b64toBA(a){a=b64tohex(a);var b,c=[];for(b=0;2*b<a.length;++b)c[b]=parseInt(a.substring(2*b,2*b+2),16);return c}function parseBigInt(a,b){return new BigInteger(a,b)}
function linebrk(a,b){for(var c="",d=0;d+b<a.length;)c+=a.substring(d,d+b)+"\n",d+=b;return c+a.substring(d,a.length)}function byte2Hex(a){return 16>a?"0"+a.toString(16):a.toString(16)}
function pkcs1pad2(a,b){if(b<a.length+11)return alert("Message too long for RSA"),null;for(var c=[],d=a.length-1;0<=d&&0<b;){var e=a.charCodeAt(d--);128>e?c[--b]=e:127<e&&2048>e?(c[--b]=e&63|128,c[--b]=e>>6|192):(c[--b]=e&63|128,c[--b]=e>>6&63|128,c[--b]=e>>12|224)}c[--b]=0;d=new SecureRandom;for(e=[];2<b;){for(e[0]=0;0==e[0];)d.nextBytes(e);c[--b]=e[0]}c[--b]=2;c[--b]=0;return new BigInteger(c)}
function oaep_mgf1_arr(a,b,c){for(var d="",e=0;d.length<b;)d+=c(String.fromCharCode.apply(String,a.concat([(e&4278190080)>>24,(e&16711680)>>16,(e&65280)>>8,e&255]))),e+=1;return d}var SHA1_SIZE=20;
function oaep_pad(a,b,c){if(a.length+2*SHA1_SIZE+2>b)throw"Message too long for RSA";var d="",e;for(e=0;e<b-a.length-2*SHA1_SIZE-2;e+=1)d+="\x00";b=rstr_sha1("")+d+"\u0001"+a;a=Array(SHA1_SIZE);(new SecureRandom).nextBytes(a);d=oaep_mgf1_arr(a,b.length,c||rstr_sha1);c=[];for(e=0;e<b.length;e+=1)c[e]=b.charCodeAt(e)^d.charCodeAt(e);b=oaep_mgf1_arr(c,a.length,rstr_sha1);d=[0];for(e=0;e<a.length;e+=1)d[e+1]=a[e]^b.charCodeAt(e);return new BigInteger(d.concat(c))}
function RSAKey(){this.n=null;this.e=0;this.coeff=this.dmq1=this.dmp1=this.q=this.p=this.d=null}function RSASetPublic(a,b){"string"!==typeof a?(this.n=a,this.e=b):null!=a&&null!=b&&0<a.length&&0<b.length?(this.n=parseBigInt(a,16),this.e=parseInt(b,16)):alert("Invalid RSA public key")}function RSADoPublic(a){return a.modPowInt(this.e,this.n)}
function RSAEncrypt(a){a=pkcs1pad2(a,this.n.bitLength()+7>>3);if(null==a)return null;a=this.doPublic(a);if(null==a)return null;a=a.toString(16);return 0==(a.length&1)?a:"0"+a}function RSAEncryptOAEP(a,b){var c=oaep_pad(a,this.n.bitLength()+7>>3,b);if(null==c)return null;c=this.doPublic(c);if(null==c)return null;c=c.toString(16);return 0==(c.length&1)?c:"0"+c}RSAKey.prototype.doPublic=RSADoPublic;RSAKey.prototype.setPublic=RSASetPublic;RSAKey.prototype.encrypt=RSAEncrypt;
RSAKey.prototype.encryptOAEP=RSAEncryptOAEP;function pkcs1unpad2(a,b){for(var c=a.toByteArray(),d=0;d<c.length&&0==c[d];)++d;if(c.length-d!=b-1||2!=c[d])return null;for(++d;0!=c[d];)if(++d>=c.length)return null;for(var e="";++d<c.length;){var f=c[d]&255;128>f?e+=String.fromCharCode(f):191<f&&224>f?(e+=String.fromCharCode((f&31)<<6|c[d+1]&63),++d):(e+=String.fromCharCode((f&15)<<12|(c[d+1]&63)<<6|c[d+2]&63),d+=2)}return e}
function oaep_mgf1_str(a,b,c){for(var d="",e=0;d.length<b;)d+=c(a+String.fromCharCode.apply(String,[(e&4278190080)>>24,(e&16711680)>>16,(e&65280)>>8,e&255])),e+=1;return d}SHA1_SIZE=20;
function oaep_unpad(a,b,c){a=a.toByteArray();var d;for(d=0;d<a.length;d+=1)a[d]&=255;for(;a.length<b;)a.unshift(0);a=String.fromCharCode.apply(String,a);if(a.length<2*SHA1_SIZE+2)throw"Cipher too short";var e=a.substr(1,SHA1_SIZE);b=a.substr(SHA1_SIZE+1);c=oaep_mgf1_str(b,SHA1_SIZE,c||rstr_sha1);var f=[];for(d=0;d<e.length;d+=1)f[d]=e.charCodeAt(d)^c.charCodeAt(d);e=oaep_mgf1_str(String.fromCharCode.apply(String,f),a.length-SHA1_SIZE,rstr_sha1);a=[];for(d=0;d<b.length;d+=1)a[d]=b.charCodeAt(d)^e.charCodeAt(d);
a=String.fromCharCode.apply(String,a);if(a.substr(0,SHA1_SIZE)!==rstr_sha1(""))throw"Hash mismatch";a=a.substr(SHA1_SIZE);d=a.indexOf("\u0001");if((-1!=d?a.substr(0,d).lastIndexOf("\x00"):-1)+1!=d)throw"Malformed data";return a.substr(d+1)}function RSASetPrivate(a,b,c){"string"!==typeof a?(this.n=a,this.e=b,this.d=c):null!=a&&null!=b&&0<a.length&&0<b.length?(this.n=parseBigInt(a,16),this.e=parseInt(b,16),this.d=parseBigInt(c,16)):alert("Invalid RSA private key")}
function RSASetPrivateEx(a,b,c,d,e,f,g,h){if(null==a)throw"RSASetPrivateEx N == null";if(null==b)throw"RSASetPrivateEx E == null";if(0==a.length)throw"RSASetPrivateEx N.length == 0";if(0==b.length)throw"RSASetPrivateEx E.length == 0";null!=a&&null!=b&&0<a.length&&0<b.length?(this.n=parseBigInt(a,16),this.e=parseInt(b,16),this.d=parseBigInt(c,16),this.p=parseBigInt(d,16),this.q=parseBigInt(e,16),this.dmp1=parseBigInt(f,16),this.dmq1=parseBigInt(g,16),this.coeff=parseBigInt(h,16)):alert("Invalid RSA private key in RSASetPrivateEx")}
function RSAGenerate(a,b){var c=new SecureRandom,d=a>>1;this.e=parseInt(b,16);for(var e=new BigInteger(b,16);;){for(;!(this.p=new BigInteger(a-d,1,c),0==this.p.subtract(BigInteger.ONE).gcd(e).compareTo(BigInteger.ONE)&&this.p.isProbablePrime(10)););for(;!(this.q=new BigInteger(d,1,c),0==this.q.subtract(BigInteger.ONE).gcd(e).compareTo(BigInteger.ONE)&&this.q.isProbablePrime(10)););if(0>=this.p.compareTo(this.q)){var f=this.p;this.p=this.q;this.q=f}var f=this.p.subtract(BigInteger.ONE),g=this.q.subtract(BigInteger.ONE),
h=f.multiply(g);if(0==h.gcd(e).compareTo(BigInteger.ONE)){this.n=this.p.multiply(this.q);this.d=e.modInverse(h);this.dmp1=this.d.mod(f);this.dmq1=this.d.mod(g);this.coeff=this.q.modInverse(this.p);break}}}function RSADoPrivate(a){if(null==this.p||null==this.q)return a.modPow(this.d,this.n);var b=a.mod(this.p).modPow(this.dmp1,this.p);for(a=a.mod(this.q).modPow(this.dmq1,this.q);0>b.compareTo(a);)b=b.add(this.p);return b.subtract(a).multiply(this.coeff).mod(this.p).multiply(this.q).add(a)}
function RSADecrypt(a){a=parseBigInt(a,16);a=this.doPrivate(a);return null==a?null:pkcs1unpad2(a,this.n.bitLength()+7>>3)}function RSADecryptOAEP(a,b){var c=parseBigInt(a,16),c=this.doPrivate(c);return null==c?null:oaep_unpad(c,this.n.bitLength()+7>>3,b)}RSAKey.prototype.doPrivate=RSADoPrivate;RSAKey.prototype.setPrivate=RSASetPrivate;RSAKey.prototype.setPrivateEx=RSASetPrivateEx;RSAKey.prototype.generate=RSAGenerate;RSAKey.prototype.decrypt=RSADecrypt;RSAKey.prototype.decryptOAEP=RSADecryptOAEP;
if("undefined"==typeof KJUR||!KJUR)KJUR={};if("undefined"==typeof KJUR.crypto||!KJUR.crypto)KJUR.crypto={};
KJUR.crypto.Util=new function(){this.DIGESTINFOHEAD={sha1:"3021300906052b0e03021a05000414",sha224:"302d300d06096086480165030402040500041c",sha256:"3031300d060960864801650304020105000420",sha384:"3041300d060960864801650304020205000430",sha512:"3051300d060960864801650304020305000440",md2:"3020300c06082a864886f70d020205000410",md5:"3020300c06082a864886f70d020505000410",ripemd160:"3021300906052b2403020105000414"};this.getDigestInfoHex=function(a,b){if("undefined"==typeof this.DIGESTINFOHEAD[b])throw"alg not supported in Util.DIGESTINFOHEAD: "+
b;return this.DIGESTINFOHEAD[b]+a};this.getPaddedDigestInfoHex=function(a,b,c){var d=this.getDigestInfoHex(a,b);a=c/4;if(d.length+22>a)throw"key is too short for SigAlg: keylen="+c+","+b;b="00"+d;c="";a=a-4-b.length;for(d=0;d<a;d+=2)c+="ff";return"0001"+c+b};this.sha1=function(a){return(new KJUR.crypto.MessageDigest({alg:"sha1",prov:"cryptojs"})).digestString(a)};this.sha256=function(a){return(new KJUR.crypto.MessageDigest({alg:"sha256",prov:"cryptojs"})).digestString(a)};this.sha512=function(a){return(new KJUR.crypto.MessageDigest({alg:"sha512",
prov:"cryptojs"})).digestString(a)};this.md5=function(a){return(new KJUR.crypto.MessageDigest({alg:"md5",prov:"cryptojs"})).digestString(a)};this.ripemd160=function(a){return(new KJUR.crypto.MessageDigest({alg:"ripemd160",prov:"cryptojs"})).digestString(a)}};
KJUR.crypto.MessageDigest=function(a){var b={md5:"CryptoJS.algo.MD5",sha1:"CryptoJS.algo.SHA1",sha224:"CryptoJS.algo.SHA224",sha256:"CryptoJS.algo.SHA256",sha384:"CryptoJS.algo.SHA384",sha512:"CryptoJS.algo.SHA512",ripemd160:"CryptoJS.algo.RIPEMD160"};this.setAlgAndProvider=function(a,d){if(-1!=":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(a)&&"cryptojs"==d){try{this.md=eval(b[a]).create()}catch(e){throw"setAlgAndProvider hash alg set fail alg="+a+"/"+e;}this.updateString=function(a){this.md.update(a)};
this.updateHex=function(a){a=CryptoJS.enc.Hex.parse(a);this.md.update(a)};this.digest=function(){return this.md.finalize().toString(CryptoJS.enc.Hex)};this.digestString=function(a){this.updateString(a);return this.digest()};this.digestHex=function(a){this.updateHex(a);return this.digest()}}if(-1!=":sha256:".indexOf(a)&&"sjcl"==d){try{this.md=new sjcl.hash.sha256}catch(f){throw"setAlgAndProvider hash alg set fail alg="+a+"/"+f;}this.updateString=function(a){this.md.update(a)};this.updateHex=function(a){a=
sjcl.codec.hex.toBits(a);this.md.update(a)};this.digest=function(){var a=this.md.finalize();return sjcl.codec.hex.fromBits(a)};this.digestString=function(a){this.updateString(a);return this.digest()};this.digestHex=function(a){this.updateHex(a);return this.digest()}}};this.updateString=function(){throw"updateString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName;};this.updateHex=function(){throw"updateHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName;
};this.digest=function(){throw"digest() not supported for this alg/prov: "+this.algName+"/"+this.provName;};this.digestString=function(){throw"digestString(str) not supported for this alg/prov: "+this.algName+"/"+this.provName;};this.digestHex=function(){throw"digestHex(hex) not supported for this alg/prov: "+this.algName+"/"+this.provName;};"undefined"!=typeof a&&"undefined"!=typeof a.alg&&(this.algName=a.alg,this.provName=a.prov,this.setAlgAndProvider(a.alg,a.prov))};
KJUR.crypto.Signature=function(a){var b=null;this._setAlgNames=function(){this.algName.match(/^(.+)with(.+)$/)&&(this.mdAlgName=RegExp.$1.toLowerCase(),this.pubkeyAlgName=RegExp.$2.toLowerCase())};this._zeroPaddingOfSignature=function(a,b){for(var c="",g=b/4-a.length,h=0;h<g;h++)c+="0";return c+a};this.setAlgAndProvider=function(a,b){this._setAlgNames();if("cryptojs/jsrsa"!=b)throw"provider not supported: "+b;if(-1!=":md5:sha1:sha224:sha256:sha384:sha512:ripemd160:".indexOf(this.mdAlgName)){try{this.md=
new KJUR.crypto.MessageDigest({alg:this.mdAlgName,prov:"cryptojs"})}catch(c){throw"setAlgAndProvider hash alg set fail alg="+this.mdAlgName+"/"+c;}this.initSign=function(a){this.prvKey=a;this.state="SIGN"};this.initVerifyByPublicKey=function(a){this.pubKey=a;this.state="VERIFY"};this.initVerifyByCertificatePEM=function(a){var b=new X509;b.readCertPEM(a);this.pubKey=b.subjectPublicKeyRSA;this.state="VERIFY"};this.updateString=function(a){this.md.updateString(a)};this.updateHex=function(a){this.md.updateHex(a)};
this.sign=function(){var a=KJUR.crypto.Util,b=this.prvKey.n.bitLength();this.sHashHex=this.md.digest();this.hDigestInfo=a.getDigestInfoHex(this.sHashHex,this.mdAlgName);this.hPaddedDigestInfo=a.getPaddedDigestInfoHex(this.sHashHex,this.mdAlgName,b);a=parseBigInt(this.hPaddedDigestInfo,16);this.hoge=a.toString(16);a=this.prvKey.doPrivate(a);return this.hSign=this._zeroPaddingOfSignature(a.toString(16),b)};this.signString=function(a){this.updateString(a);this.sign()};this.signHex=function(a){this.updateHex(a);
this.sign()};this.verify=function(a){this.pubKey.n.bitLength();this.sHashHex=this.md.digest();a=parseBigInt(a,16);a=this.hPaddedDigestInfo=this.pubKey.doPublic(a).toString(16);a=a.replace(/^1ff+00/,"");var b=KJUR.crypto.Util.DIGESTINFOHEAD[this.mdAlgName];return 0!=a.indexOf(b)?!1:a.substr(b.length)==this.sHashHex}}};this.initVerifyByPublicKey=function(){throw"initVerifyByPublicKey(rsaPubKeyy) not supported for this alg:prov="+this.algProvName;};this.initVerifyByCertificatePEM=function(){throw"initVerifyByCertificatePEM(certPEM) not supported for this alg:prov="+
this.algProvName;};this.initSign=function(){throw"initSign(prvKey) not supported for this alg:prov="+this.algProvName;};this.updateString=function(){throw"updateString(str) not supported for this alg:prov="+this.algProvName;};this.updateHex=function(){throw"updateHex(hex) not supported for this alg:prov="+this.algProvName;};this.sign=function(){throw"sign() not supported for this alg:prov="+this.algProvName;};this.signString=function(){throw"digestString(str) not supported for this alg:prov="+this.algProvName;
};this.signHex=function(){throw"digestHex(hex) not supported for this alg:prov="+this.algProvName;};this.verify=function(){throw"verify(hSigVal) not supported for this alg:prov="+this.algProvName;};if("undefined"!=typeof a&&("undefined"!=typeof a.alg&&(this.algName=a.alg,this.provName=a.prov,this.algProvName=a.alg+":"+a.prov,this.setAlgAndProvider(a.alg,a.prov),this._setAlgNames()),"undefined"!=typeof a.prvkeypem)){if("undefined"!=typeof a.prvkeypas)throw"both prvkeypem and prvkeypas parameters not supported";
try{b=new RSAKey,b.readPrivateKeyFromPEMString(a.prvkeypem),this.initSign(b)}catch(c){throw"fatal error to load pem private key: "+c;}}};function _rsapem_pemToBase64(a){a=a.replace("-----BEGIN RSA PRIVATE KEY-----","");a=a.replace("-----END RSA PRIVATE KEY-----","");return a=a.replace(/[ \n]+/g,"")}
function _rsapem_getPosArrayOfChildrenFromHex(a){var b=[],c=ASN1HEX.getStartPosOfV_AtObj(a,0),d=ASN1HEX.getPosOfNextSibling_AtObj(a,c),e=ASN1HEX.getPosOfNextSibling_AtObj(a,d),f=ASN1HEX.getPosOfNextSibling_AtObj(a,e),g=ASN1HEX.getPosOfNextSibling_AtObj(a,f),h=ASN1HEX.getPosOfNextSibling_AtObj(a,g),j=ASN1HEX.getPosOfNextSibling_AtObj(a,h),k=ASN1HEX.getPosOfNextSibling_AtObj(a,j);a=ASN1HEX.getPosOfNextSibling_AtObj(a,k);b.push(c,d,e,f,g,h,j,k,a);return b}
function _rsapem_getHexValueArrayOfChildrenFromHex(a){var b=_rsapem_getPosArrayOfChildrenFromHex(a),c=ASN1HEX.getHexOfV_AtObj(a,b[0]),d=ASN1HEX.getHexOfV_AtObj(a,b[1]),e=ASN1HEX.getHexOfV_AtObj(a,b[2]),f=ASN1HEX.getHexOfV_AtObj(a,b[3]),g=ASN1HEX.getHexOfV_AtObj(a,b[4]),h=ASN1HEX.getHexOfV_AtObj(a,b[5]),j=ASN1HEX.getHexOfV_AtObj(a,b[6]),k=ASN1HEX.getHexOfV_AtObj(a,b[7]);a=ASN1HEX.getHexOfV_AtObj(a,b[8]);b=[];b.push(c,d,e,f,g,h,j,k,a);return b}
function _rsapem_readPrivateKeyFromASN1HexString(a){a=_rsapem_getHexValueArrayOfChildrenFromHex(a);this.setPrivateEx(a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8])}function _rsapem_readPrivateKeyFromPEMString(a){a=_rsapem_pemToBase64(a);a=b64tohex(a);a=_rsapem_getHexValueArrayOfChildrenFromHex(a);this.setPrivateEx(a[1],a[2],a[3],a[4],a[5],a[6],a[7],a[8])}RSAKey.prototype.readPrivateKeyFromPEMString=_rsapem_readPrivateKeyFromPEMString;RSAKey.prototype.readPrivateKeyFromASN1HexString=_rsapem_readPrivateKeyFromASN1HexString;
var _RSASIGN_DIHEAD=[];_RSASIGN_DIHEAD.sha1="3021300906052b0e03021a05000414";_RSASIGN_DIHEAD.sha256="3031300d060960864801650304020105000420";_RSASIGN_DIHEAD.sha384="3041300d060960864801650304020205000430";_RSASIGN_DIHEAD.sha512="3051300d060960864801650304020305000440";_RSASIGN_DIHEAD.md2="3020300c06082a864886f70d020205000410";_RSASIGN_DIHEAD.md5="3020300c06082a864886f70d020505000410";_RSASIGN_DIHEAD.ripemd160="3021300906052b2403020105000414";var _RSASIGN_HASHHEXFUNC=[];_RSASIGN_HASHHEXFUNC.sha1=function(a){return KJUR.crypto.Util.sha1(a)};
_RSASIGN_HASHHEXFUNC.sha256=function(a){return KJUR.crypto.Util.sha256(a)};_RSASIGN_HASHHEXFUNC.sha512=function(a){return KJUR.crypto.Util.sha512(a)};_RSASIGN_HASHHEXFUNC.md5=function(a){return KJUR.crypto.Util.md5(a)};_RSASIGN_HASHHEXFUNC.ripemd160=function(a){return KJUR.crypto.Util.ripemd160(a)};var _RE_HEXDECONLY=RegExp("");_RE_HEXDECONLY.compile("[^0-9a-f]","gi");
function _rsasign_getHexPaddedDigestInfoForString(a,b,c){b/=4;a=(0,_RSASIGN_HASHHEXFUNC[c])(a);c="00"+_RSASIGN_DIHEAD[c]+a;a="";b=b-4-c.length;for(var d=0;d<b;d+=2)a+="ff";return sPaddedMessageHex="0001"+a+c}function _zeroPaddingOfSignature(a,b){for(var c="",d=b/4-a.length,e=0;e<d;e++)c+="0";return c+a}
function _rsasign_signString(a,b){var c=_rsasign_getHexPaddedDigestInfoForString(a,this.n.bitLength(),b),c=parseBigInt(c,16),c=this.doPrivate(c).toString(16);return _zeroPaddingOfSignature(c,this.n.bitLength())}function _rsasign_signStringWithSHA1(a){return _rsasign_signString.call(this,a,"sha1")}function _rsasign_signStringWithSHA256(a){return _rsasign_signString.call(this,a,"sha256")}
function pss_mgf1_str(a,b,c){for(var d="",e=0;d.length<b;)d+=c(a+String.fromCharCode.apply(String,[(e&4278190080)>>24,(e&16711680)>>16,(e&65280)>>8,e&255])),e+=1;return d}
function _rsasign_signStringPSS(a,b,c){var d=_RSASIGN_HASHRAWFUNC[b],e=d(a);a=e.length;b=this.n.bitLength()-1;var f=Math.ceil(b/8);if(-1===c)c=a;else if(-2===c||void 0===c)c=f-a-2;else if(-2>c)throw"invalid salt length";if(f<a+c+2)throw"data too long";var g="";0<c&&(g=Array(c),(new SecureRandom).nextBytes(g),g=String.fromCharCode.apply(String,g));for(var h=d("\x00\x00\x00\x00\x00\x00\x00\x00"+e+g),j=[],e=0;e<f-c-a-2;e+=1)j[e]=0;c=String.fromCharCode.apply(String,j)+"\u0001"+g;d=pss_mgf1_str(h,c.length,
d);g=[];for(e=0;e<c.length;e+=1)g[e]=c.charCodeAt(e)^d.charCodeAt(e);g[0]&=~(65280>>8*f-b&255);for(e=0;e<a;e++)g.push(h.charCodeAt(e));g.push(188);return _zeroPaddingOfSignature(this.doPrivate(new BigInteger(g)).toString(16),this.n.bitLength())}function _rsasign_getDecryptSignatureBI(a,b,c){var d=new RSAKey;d.setPublic(b,c);return d.doPublic(a)}function _rsasign_getHexDigestInfoFromSig(a,b,c){return _rsasign_getDecryptSignatureBI(a,b,c).toString(16).replace(/^1f+00/,"")}
function _rsasign_getAlgNameAndHashFromHexDisgestInfo(a){for(var b in _RSASIGN_DIHEAD){var c=_RSASIGN_DIHEAD[b],d=c.length;if(a.substring(0,d)==c)return[b,a.substring(d)]}return[]}function _rsasign_verifySignatureWithArgs(a,b,c,d){b=_rsasign_getHexDigestInfoFromSig(b,c,d);c=_rsasign_getAlgNameAndHashFromHexDisgestInfo(b);if(0==c.length)return!1;b=c[1];a=(0,_RSASIGN_HASHHEXFUNC[c[0]])(a);return b==a}
function _rsasign_verifyHexSignatureForMessage(a,b){var c=parseBigInt(a,16);return _rsasign_verifySignatureWithArgs(b,c,this.n.toString(16),this.e.toString(16))}
function _rsasign_verifyString(a,b){b=b.replace(_RE_HEXDECONLY,"");if(b.length!=this.n.bitLength()/4)return 0;b=b.replace(/[ \n]+/g,"");var c=parseBigInt(b,16),c=this.doPublic(c).toString(16).replace(/^1f+00/,""),d=_rsasign_getAlgNameAndHashFromHexDisgestInfo(c);if(0==d.length)return!1;c=d[1];d=(0,_RSASIGN_HASHHEXFUNC[d[0]])(a);return c==d}
function _rsasign_verifyStringPSS(a,b,c,d){if(b.length!==this.n.bitLength()/4)return!1;c=_RSASIGN_HASHRAWFUNC[c];a=c(a);var e=a.length,f=this.n.bitLength()-1,g=Math.ceil(f/8);if(-1===d)d=e;else if(-2===d||void 0===d)d=g-e-2;else if(-2>d)throw"invalid salt length";if(g<e+d+2)throw"data too long";var h=this.doPublic(parseBigInt(b,16)).toByteArray();for(b=0;b<h.length;b+=1)h[b]&=255;for(;h.length<g;)h.unshift(0);if(188!==h[g-1])throw"encoded message does not end in 0xbc";var h=String.fromCharCode.apply(String,
h),j=h.substr(0,g-e-1),h=h.substr(j.length,e),k=65280>>8*g-f&255;if(0!==(j.charCodeAt(0)&k))throw"bits beyond keysize not zero";var m=pss_mgf1_str(h,j.length,c),f=[];for(b=0;b<j.length;b+=1)f[b]=j.charCodeAt(b)^m.charCodeAt(b);f[0]&=~k;e=g-e-d-2;for(b=0;b<e;b+=1)if(0!==f[b])throw"leftmost octets not zero";if(1!==f[e])throw"0x01 marker not found";return h===c("\x00\x00\x00\x00\x00\x00\x00\x00"+a+String.fromCharCode.apply(String,f.slice(-d)))}RSAKey.prototype.signString=_rsasign_signString;
RSAKey.prototype.signStringWithSHA1=_rsasign_signStringWithSHA1;RSAKey.prototype.signStringWithSHA256=_rsasign_signStringWithSHA256;RSAKey.prototype.sign=_rsasign_signString;RSAKey.prototype.signWithSHA1=_rsasign_signStringWithSHA1;RSAKey.prototype.signWithSHA256=_rsasign_signStringWithSHA256;RSAKey.prototype.signStringPSS=_rsasign_signStringPSS;RSAKey.prototype.signPSS=_rsasign_signStringPSS;RSAKey.SALT_LEN_HLEN=-1;RSAKey.SALT_LEN_MAX=-2;RSAKey.prototype.verifyString=_rsasign_verifyString;
RSAKey.prototype.verifyHexSignatureForMessage=_rsasign_verifyHexSignatureForMessage;RSAKey.prototype.verify=_rsasign_verifyString;RSAKey.prototype.verifyHexSignatureForByteArrayMessage=_rsasign_verifyHexSignatureForMessage;RSAKey.prototype.verifyStringPSS=_rsasign_verifyStringPSS;RSAKey.prototype.verifyPSS=_rsasign_verifyStringPSS;RSAKey.SALT_LEN_RECOVER=-2;
function _asnhex_getByteLengthOfL_AtObj(a,b){if("8"!=a.substring(b+2,b+3))return 1;var c=parseInt(a.substring(b+3,b+4));return 0==c?-1:0<c&&10>c?c+1:-2}function _asnhex_getHexOfL_AtObj(a,b){var c=_asnhex_getByteLengthOfL_AtObj(a,b);return 1>c?"":a.substring(b+2,b+2+2*c)}function _asnhex_getIntOfL_AtObj(a,b){var c=_asnhex_getHexOfL_AtObj(a,b);return""==c?-1:(8>parseInt(c.substring(0,1))?parseBigInt(c,16):parseBigInt(c.substring(2),16)).intValue()}
function _asnhex_getStartPosOfV_AtObj(a,b){var c=_asnhex_getByteLengthOfL_AtObj(a,b);return 0>c?c:b+2*(c+1)}function _asnhex_getHexOfV_AtObj(a,b){var c=_asnhex_getStartPosOfV_AtObj(a,b),d=_asnhex_getIntOfL_AtObj(a,b);return a.substring(c,c+2*d)}function _asnhex_getHexOfTLV_AtObj(a,b){var c=a.substr(b,2),d=_asnhex_getHexOfL_AtObj(a,b),e=_asnhex_getHexOfV_AtObj(a,b);return c+d+e}
function _asnhex_getPosOfNextSibling_AtObj(a,b){var c=_asnhex_getStartPosOfV_AtObj(a,b),d=_asnhex_getIntOfL_AtObj(a,b);return c+2*d}function _asnhex_getPosArrayOfChildren_AtObj(a,b){var c=[],d=_asnhex_getStartPosOfV_AtObj(a,b);c.push(d);for(var e=_asnhex_getIntOfL_AtObj(a,b),f=d,g=0;;){f=_asnhex_getPosOfNextSibling_AtObj(a,f);if(null==f||f-d>=2*e)break;if(200<=g)break;c.push(f);g++}return c}function _asnhex_getNthChildIndex_AtObj(a,b,c){return _asnhex_getPosArrayOfChildren_AtObj(a,b)[c]}
function _asnhex_getDecendantIndexByNthList(a,b,c){if(0==c.length)return b;var d=c.shift();b=_asnhex_getPosArrayOfChildren_AtObj(a,b);return _asnhex_getDecendantIndexByNthList(a,b[d],c)}function _asnhex_getDecendantHexTLVByNthList(a,b,c){b=_asnhex_getDecendantIndexByNthList(a,b,c);return _asnhex_getHexOfTLV_AtObj(a,b)}function _asnhex_getDecendantHexVByNthList(a,b,c){b=_asnhex_getDecendantIndexByNthList(a,b,c);return _asnhex_getHexOfV_AtObj(a,b)}function ASN1HEX(){return ASN1HEX}
ASN1HEX.getByteLengthOfL_AtObj=_asnhex_getByteLengthOfL_AtObj;ASN1HEX.getHexOfL_AtObj=_asnhex_getHexOfL_AtObj;ASN1HEX.getIntOfL_AtObj=_asnhex_getIntOfL_AtObj;ASN1HEX.getStartPosOfV_AtObj=_asnhex_getStartPosOfV_AtObj;ASN1HEX.getHexOfV_AtObj=_asnhex_getHexOfV_AtObj;ASN1HEX.getHexOfTLV_AtObj=_asnhex_getHexOfTLV_AtObj;ASN1HEX.getPosOfNextSibling_AtObj=_asnhex_getPosOfNextSibling_AtObj;ASN1HEX.getPosArrayOfChildren_AtObj=_asnhex_getPosArrayOfChildren_AtObj;ASN1HEX.getNthChildIndex_AtObj=_asnhex_getNthChildIndex_AtObj;
ASN1HEX.getDecendantIndexByNthList=_asnhex_getDecendantIndexByNthList;ASN1HEX.getDecendantHexVByNthList=_asnhex_getDecendantHexVByNthList;ASN1HEX.getDecendantHexTLVByNthList=_asnhex_getDecendantHexTLVByNthList;function _x509_pemToBase64(a){a=a.replace("-----BEGIN CERTIFICATE-----","");a=a.replace("-----END CERTIFICATE-----","");return a=a.replace(/[ \n]+/g,"")}function _x509_pemToHex(a){a=_x509_pemToBase64(a);return b64tohex(a)}
function _x509_getHexTbsCertificateFromCert(a){return ASN1HEX.getStartPosOfV_AtObj(a,0)}function _x509_getSubjectPublicKeyInfoPosFromCertHex(a){var b=ASN1HEX.getStartPosOfV_AtObj(a,0),b=ASN1HEX.getPosArrayOfChildren_AtObj(a,b);return 1>b.length?-1:"a003020102"==a.substring(b[0],b[0]+10)?6>b.length?-1:b[6]:5>b.length?-1:b[5]}
function _x509_getSubjectPublicKeyPosFromCertHex(a){var b=_x509_getSubjectPublicKeyInfoPosFromCertHex(a);if(-1==b)return-1;b=ASN1HEX.getPosArrayOfChildren_AtObj(a,b);if(2!=b.length)return-1;b=b[1];if("03"!=a.substring(b,b+2))return-1;b=ASN1HEX.getStartPosOfV_AtObj(a,b);return"00"!=a.substring(b,b+2)?-1:b+2}
function _x509_getPublicKeyHexArrayFromCertHex(a){var b=_x509_getSubjectPublicKeyPosFromCertHex(a),c=ASN1HEX.getPosArrayOfChildren_AtObj(a,b);if(2!=c.length)return[];b=ASN1HEX.getHexOfV_AtObj(a,c[0]);a=ASN1HEX.getHexOfV_AtObj(a,c[1]);return null!=b&&null!=a?[b,a]:[]}function _x509_getPublicKeyHexArrayFromCertPEM(a){a=_x509_pemToHex(a);return _x509_getPublicKeyHexArrayFromCertHex(a)}function _x509_getSerialNumberHex(){return ASN1HEX.getDecendantHexVByNthList(this.hex,0,[0,1])}
function _x509_getIssuerHex(){return ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,3])}function _x509_getIssuerString(){return _x509_hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,3]))}function _x509_getSubjectHex(){return ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,5])}function _x509_getSubjectString(){return _x509_hex2dn(ASN1HEX.getDecendantHexTLVByNthList(this.hex,0,[0,5]))}
function _x509_getNotBefore(){var a=ASN1HEX.getDecendantHexVByNthList(this.hex,0,[0,4,0]),a=a.replace(/(..)/g,"%$1");return a=decodeURIComponent(a)}function _x509_getNotAfter(){var a=ASN1HEX.getDecendantHexVByNthList(this.hex,0,[0,4,1]),a=a.replace(/(..)/g,"%$1");return a=decodeURIComponent(a)}_x509_DN_ATTRHEX={"0603550406":"C","060355040a":"O","060355040b":"OU","0603550403":"CN","0603550405":"SN","0603550408":"ST","0603550407":"L"};
function _x509_hex2dn(a){for(var b="",c=ASN1HEX.getPosArrayOfChildren_AtObj(a,0),d=0;d<c.length;d++)var e=ASN1HEX.getHexOfTLV_AtObj(a,c[d]),b=b+"/"+_x509_hex2rdn(e);return b}function _x509_hex2rdn(a){var b=ASN1HEX.getDecendantHexTLVByNthList(a,0,[0,0]),c=ASN1HEX.getDecendantHexVByNthList(a,0,[0,1]);a="";try{a=_x509_DN_ATTRHEX[b]}catch(d){a=b}c=c.replace(/(..)/g,"%$1");b=decodeURIComponent(c);return a+"="+b}
function _x509_readCertPEM(a){a=_x509_pemToHex(a);var b=_x509_getPublicKeyHexArrayFromCertHex(a),c=new RSAKey;c.setPublic(b[0],b[1]);this.subjectPublicKeyRSA=c;this.subjectPublicKeyRSA_hN=b[0];this.subjectPublicKeyRSA_hE=b[1];this.hex=a}function _x509_readCertPEMWithoutRSAInit(a){a=_x509_pemToHex(a);var b=_x509_getPublicKeyHexArrayFromCertHex(a);this.subjectPublicKeyRSA.setPublic(b[0],b[1]);this.subjectPublicKeyRSA_hN=b[0];this.subjectPublicKeyRSA_hE=b[1];this.hex=a}
function X509(){this.hex=this.subjectPublicKeyRSA_hE=this.subjectPublicKeyRSA_hN=this.subjectPublicKeyRSA=null}X509.prototype.readCertPEM=_x509_readCertPEM;X509.prototype.readCertPEMWithoutRSAInit=_x509_readCertPEMWithoutRSAInit;X509.prototype.getSerialNumberHex=_x509_getSerialNumberHex;X509.prototype.getIssuerHex=_x509_getIssuerHex;X509.prototype.getSubjectHex=_x509_getSubjectHex;X509.prototype.getIssuerString=_x509_getIssuerString;X509.prototype.getSubjectString=_x509_getSubjectString;
X509.prototype.getNotBefore=_x509_getNotBefore;X509.prototype.getNotAfter=_x509_getNotAfter;var dbits,canary=0xdeadbeefcafe,j_lm=15715070==(canary&16777215);function BigInteger(a,b,c){null!=a&&("number"==typeof a?this.fromNumber(a,b,c):null==b&&"string"!=typeof a?this.fromString(a,256):this.fromString(a,b))}function nbi(){return new BigInteger(null)}function am1(a,b,c,d,e,f){for(;0<=--f;){var g=b*this[a++]+c[d]+e;e=Math.floor(g/67108864);c[d++]=g&67108863}return e}
function am2(a,b,c,d,e,f){var g=b&32767;for(b>>=15;0<=--f;){var h=this[a]&32767,j=this[a++]>>15,k=b*h+j*g,h=g*h+((k&32767)<<15)+c[d]+(e&1073741823);e=(h>>>30)+(k>>>15)+b*j+(e>>>30);c[d++]=h&1073741823}return e}function am3(a,b,c,d,e,f){var g=b&16383;for(b>>=14;0<=--f;){var h=this[a]&16383,j=this[a++]>>14,k=b*h+j*g,h=g*h+((k&16383)<<14)+c[d]+e;e=(h>>28)+(k>>14)+b*j;c[d++]=h&268435455}return e}
j_lm&&"Microsoft Internet Explorer"==navigator.appName?(BigInteger.prototype.am=am2,dbits=30):j_lm&&"Netscape"!=navigator.appName?(BigInteger.prototype.am=am1,dbits=26):(BigInteger.prototype.am=am3,dbits=28);BigInteger.prototype.DB=dbits;BigInteger.prototype.DM=(1<<dbits)-1;BigInteger.prototype.DV=1<<dbits;var BI_FP=52;BigInteger.prototype.FV=Math.pow(2,BI_FP);BigInteger.prototype.F1=BI_FP-dbits;BigInteger.prototype.F2=2*dbits-BI_FP;var BI_RM="0123456789abcdefghijklmnopqrstuvwxyz",BI_RC=[],rr,vv;
rr=48;for(vv=0;9>=vv;++vv)BI_RC[rr++]=vv;rr=97;for(vv=10;36>vv;++vv)BI_RC[rr++]=vv;rr=65;for(vv=10;36>vv;++vv)BI_RC[rr++]=vv;function int2char(a){return BI_RM.charAt(a)}function intAt(a,b){var c=BI_RC[a.charCodeAt(b)];return null==c?-1:c}function bnpCopyTo(a){for(var b=this.t-1;0<=b;--b)a[b]=this[b];a.t=this.t;a.s=this.s}function bnpFromInt(a){this.t=1;this.s=0>a?-1:0;0<a?this[0]=a:-1>a?this[0]=a+DV:this.t=0}function nbv(a){var b=nbi();b.fromInt(a);return b}
function bnpFromString(a,b){var c;if(16==b)c=4;else if(8==b)c=3;else if(256==b)c=8;else if(2==b)c=1;else if(32==b)c=5;else if(4==b)c=2;else{this.fromRadix(a,b);return}this.s=this.t=0;for(var d=a.length,e=!1,f=0;0<=--d;){var g=8==c?a[d]&255:intAt(a,d);0>g?"-"==a.charAt(d)&&(e=!0):(e=!1,0==f?this[this.t++]=g:f+c>this.DB?(this[this.t-1]|=(g&(1<<this.DB-f)-1)<<f,this[this.t++]=g>>this.DB-f):this[this.t-1]|=g<<f,f+=c,f>=this.DB&&(f-=this.DB))}8==c&&0!=(a[0]&128)&&(this.s=-1,0<f&&(this[this.t-1]|=(1<<this.DB-
f)-1<<f));this.clamp();e&&BigInteger.ZERO.subTo(this,this)}function bnpClamp(){for(var a=this.s&this.DM;0<this.t&&this[this.t-1]==a;)--this.t}
function bnToString(a){if(0>this.s)return"-"+this.negate().toString(a);if(16==a)a=4;else if(8==a)a=3;else if(2==a)a=1;else if(32==a)a=5;else if(4==a)a=2;else return this.toRadix(a);var b=(1<<a)-1,c,d=!1,e="",f=this.t,g=this.DB-f*this.DB%a;if(0<f--){if(g<this.DB&&0<(c=this[f]>>g))d=!0,e=int2char(c);for(;0<=f;)g<a?(c=(this[f]&(1<<g)-1)<<a-g,c|=this[--f]>>(g+=this.DB-a)):(c=this[f]>>(g-=a)&b,0>=g&&(g+=this.DB,--f)),0<c&&(d=!0),d&&(e+=int2char(c))}return d?e:"0"}
function bnNegate(){var a=nbi();BigInteger.ZERO.subTo(this,a);return a}function bnAbs(){return 0>this.s?this.negate():this}function bnCompareTo(a){var b=this.s-a.s;if(0!=b)return b;var c=this.t,b=c-a.t;if(0!=b)return 0>this.s?-b:b;for(;0<=--c;)if(0!=(b=this[c]-a[c]))return b;return 0}function nbits(a){var b=1,c;if(0!=(c=a>>>16))a=c,b+=16;if(0!=(c=a>>8))a=c,b+=8;if(0!=(c=a>>4))a=c,b+=4;if(0!=(c=a>>2))a=c,b+=2;0!=a>>1&&(b+=1);return b}
function bnBitLength(){return 0>=this.t?0:this.DB*(this.t-1)+nbits(this[this.t-1]^this.s&this.DM)}function bnpDLShiftTo(a,b){var c;for(c=this.t-1;0<=c;--c)b[c+a]=this[c];for(c=a-1;0<=c;--c)b[c]=0;b.t=this.t+a;b.s=this.s}function bnpDRShiftTo(a,b){for(var c=a;c<this.t;++c)b[c-a]=this[c];b.t=Math.max(this.t-a,0);b.s=this.s}
function bnpLShiftTo(a,b){var c=a%this.DB,d=this.DB-c,e=(1<<d)-1,f=Math.floor(a/this.DB),g=this.s<<c&this.DM,h;for(h=this.t-1;0<=h;--h)b[h+f+1]=this[h]>>d|g,g=(this[h]&e)<<c;for(h=f-1;0<=h;--h)b[h]=0;b[f]=g;b.t=this.t+f+1;b.s=this.s;b.clamp()}
function bnpRShiftTo(a,b){b.s=this.s;var c=Math.floor(a/this.DB);if(c>=this.t)b.t=0;else{var d=a%this.DB,e=this.DB-d,f=(1<<d)-1;b[0]=this[c]>>d;for(var g=c+1;g<this.t;++g)b[g-c-1]|=(this[g]&f)<<e,b[g-c]=this[g]>>d;0<d&&(b[this.t-c-1]|=(this.s&f)<<e);b.t=this.t-c;b.clamp()}}
function bnpSubTo(a,b){for(var c=0,d=0,e=Math.min(a.t,this.t);c<e;)d+=this[c]-a[c],b[c++]=d&this.DM,d>>=this.DB;if(a.t<this.t){for(d-=a.s;c<this.t;)d+=this[c],b[c++]=d&this.DM,d>>=this.DB;d+=this.s}else{for(d+=this.s;c<a.t;)d-=a[c],b[c++]=d&this.DM,d>>=this.DB;d-=a.s}b.s=0>d?-1:0;-1>d?b[c++]=this.DV+d:0<d&&(b[c++]=d);b.t=c;b.clamp()}
function bnpMultiplyTo(a,b){var c=this.abs(),d=a.abs(),e=c.t;for(b.t=e+d.t;0<=--e;)b[e]=0;for(e=0;e<d.t;++e)b[e+c.t]=c.am(0,d[e],b,e,0,c.t);b.s=0;b.clamp();this.s!=a.s&&BigInteger.ZERO.subTo(b,b)}function bnpSquareTo(a){for(var b=this.abs(),c=a.t=2*b.t;0<=--c;)a[c]=0;for(c=0;c<b.t-1;++c){var d=b.am(c,b[c],a,2*c,0,1);if((a[c+b.t]+=b.am(c+1,2*b[c],a,2*c+1,d,b.t-c-1))>=b.DV)a[c+b.t]-=b.DV,a[c+b.t+1]=1}0<a.t&&(a[a.t-1]+=b.am(c,b[c],a,2*c,0,1));a.s=0;a.clamp()}
function bnpDivRemTo(a,b,c){var d=a.abs();if(!(0>=d.t)){var e=this.abs();if(e.t<d.t)null!=b&&b.fromInt(0),null!=c&&this.copyTo(c);else{null==c&&(c=nbi());var f=nbi(),g=this.s;a=a.s;var h=this.DB-nbits(d[d.t-1]);0<h?(d.lShiftTo(h,f),e.lShiftTo(h,c)):(d.copyTo(f),e.copyTo(c));d=f.t;e=f[d-1];if(0!=e){var j=e*(1<<this.F1)+(1<d?f[d-2]>>this.F2:0),k=this.FV/j,j=(1<<this.F1)/j,m=1<<this.F2,n=c.t,p=n-d,l=null==b?nbi():b;f.dlShiftTo(p,l);0<=c.compareTo(l)&&(c[c.t++]=1,c.subTo(l,c));BigInteger.ONE.dlShiftTo(d,
l);for(l.subTo(f,f);f.t<d;)f[f.t++]=0;for(;0<=--p;){var s=c[--n]==e?this.DM:Math.floor(c[n]*k+(c[n-1]+m)*j);if((c[n]+=f.am(0,s,c,p,0,d))<s){f.dlShiftTo(p,l);for(c.subTo(l,c);c[n]<--s;)c.subTo(l,c)}}null!=b&&(c.drShiftTo(d,b),g!=a&&BigInteger.ZERO.subTo(b,b));c.t=d;c.clamp();0<h&&c.rShiftTo(h,c);0>g&&BigInteger.ZERO.subTo(c,c)}}}}function bnMod(a){var b=nbi();this.abs().divRemTo(a,null,b);0>this.s&&0<b.compareTo(BigInteger.ZERO)&&a.subTo(b,b);return b}function Classic(a){this.m=a}
function cConvert(a){return 0>a.s||0<=a.compareTo(this.m)?a.mod(this.m):a}function cRevert(a){return a}function cReduce(a){a.divRemTo(this.m,null,a)}function cMulTo(a,b,c){a.multiplyTo(b,c);this.reduce(c)}function cSqrTo(a,b){a.squareTo(b);this.reduce(b)}Classic.prototype.convert=cConvert;Classic.prototype.revert=cRevert;Classic.prototype.reduce=cReduce;Classic.prototype.mulTo=cMulTo;Classic.prototype.sqrTo=cSqrTo;
function bnpInvDigit(){if(1>this.t)return 0;var a=this[0];if(0==(a&1))return 0;var b=a&3,b=b*(2-(a&15)*b)&15,b=b*(2-(a&255)*b)&255,b=b*(2-((a&65535)*b&65535))&65535,b=b*(2-a*b%this.DV)%this.DV;return 0<b?this.DV-b:-b}function Montgomery(a){this.m=a;this.mp=a.invDigit();this.mpl=this.mp&32767;this.mph=this.mp>>15;this.um=(1<<a.DB-15)-1;this.mt2=2*a.t}
function montConvert(a){var b=nbi();a.abs().dlShiftTo(this.m.t,b);b.divRemTo(this.m,null,b);0>a.s&&0<b.compareTo(BigInteger.ZERO)&&this.m.subTo(b,b);return b}function montRevert(a){var b=nbi();a.copyTo(b);this.reduce(b);return b}
function montReduce(a){for(;a.t<=this.mt2;)a[a.t++]=0;for(var b=0;b<this.m.t;++b){var c=a[b]&32767,d=c*this.mpl+((c*this.mph+(a[b]>>15)*this.mpl&this.um)<<15)&a.DM,c=b+this.m.t;for(a[c]+=this.m.am(0,d,a,b,0,this.m.t);a[c]>=a.DV;)a[c]-=a.DV,a[++c]++}a.clamp();a.drShiftTo(this.m.t,a);0<=a.compareTo(this.m)&&a.subTo(this.m,a)}function montSqrTo(a,b){a.squareTo(b);this.reduce(b)}function montMulTo(a,b,c){a.multiplyTo(b,c);this.reduce(c)}Montgomery.prototype.convert=montConvert;
Montgomery.prototype.revert=montRevert;Montgomery.prototype.reduce=montReduce;Montgomery.prototype.mulTo=montMulTo;Montgomery.prototype.sqrTo=montSqrTo;function bnpIsEven(){return 0==(0<this.t?this[0]&1:this.s)}function bnpExp(a,b){if(4294967295<a||1>a)return BigInteger.ONE;var c=nbi(),d=nbi(),e=b.convert(this),f=nbits(a)-1;for(e.copyTo(c);0<=--f;)if(b.sqrTo(c,d),0<(a&1<<f))b.mulTo(d,e,c);else var g=c,c=d,d=g;return b.revert(c)}
function bnModPowInt(a,b){var c;c=256>a||b.isEven()?new Classic(b):new Montgomery(b);return this.exp(a,c)}BigInteger.prototype.copyTo=bnpCopyTo;BigInteger.prototype.fromInt=bnpFromInt;BigInteger.prototype.fromString=bnpFromString;BigInteger.prototype.clamp=bnpClamp;BigInteger.prototype.dlShiftTo=bnpDLShiftTo;BigInteger.prototype.drShiftTo=bnpDRShiftTo;BigInteger.prototype.lShiftTo=bnpLShiftTo;BigInteger.prototype.rShiftTo=bnpRShiftTo;BigInteger.prototype.subTo=bnpSubTo;
BigInteger.prototype.multiplyTo=bnpMultiplyTo;BigInteger.prototype.squareTo=bnpSquareTo;BigInteger.prototype.divRemTo=bnpDivRemTo;BigInteger.prototype.invDigit=bnpInvDigit;BigInteger.prototype.isEven=bnpIsEven;BigInteger.prototype.exp=bnpExp;BigInteger.prototype.toString=bnToString;BigInteger.prototype.negate=bnNegate;BigInteger.prototype.abs=bnAbs;BigInteger.prototype.compareTo=bnCompareTo;BigInteger.prototype.bitLength=bnBitLength;BigInteger.prototype.mod=bnMod;BigInteger.prototype.modPowInt=bnModPowInt;
BigInteger.ZERO=nbv(0);BigInteger.ONE=nbv(1);function bnClone(){var a=nbi();this.copyTo(a);return a}function bnIntValue(){if(0>this.s){if(1==this.t)return this[0]-this.DV;if(0==this.t)return-1}else{if(1==this.t)return this[0];if(0==this.t)return 0}return(this[1]&(1<<32-this.DB)-1)<<this.DB|this[0]}function bnByteValue(){return 0==this.t?this.s:this[0]<<24>>24}function bnShortValue(){return 0==this.t?this.s:this[0]<<16>>16}function bnpChunkSize(a){return Math.floor(Math.LN2*this.DB/Math.log(a))}
function bnSigNum(){return 0>this.s?-1:0>=this.t||1==this.t&&0>=this[0]?0:1}function bnpToRadix(a){null==a&&(a=10);if(0==this.signum()||2>a||36<a)return"0";var b=this.chunkSize(a),b=Math.pow(a,b),c=nbv(b),d=nbi(),e=nbi(),f="";for(this.divRemTo(c,d,e);0<d.signum();)f=(b+e.intValue()).toString(a).substr(1)+f,d.divRemTo(c,d,e);return e.intValue().toString(a)+f}
function bnpFromRadix(a,b){this.fromInt(0);null==b&&(b=10);for(var c=this.chunkSize(b),d=Math.pow(b,c),e=!1,f=0,g=0,h=0;h<a.length;++h){var j=intAt(a,h);0>j?"-"==a.charAt(h)&&0==this.signum()&&(e=!0):(g=b*g+j,++f>=c&&(this.dMultiply(d),this.dAddOffset(g,0),g=f=0))}0<f&&(this.dMultiply(Math.pow(b,f)),this.dAddOffset(g,0));e&&BigInteger.ZERO.subTo(this,this)}
function bnpFromNumber(a,b,c){if("number"==typeof b)if(2>a)this.fromInt(1);else{this.fromNumber(a,c);this.testBit(a-1)||this.bitwiseTo(BigInteger.ONE.shiftLeft(a-1),op_or,this);for(this.isEven()&&this.dAddOffset(1,0);!this.isProbablePrime(b);)this.dAddOffset(2,0),this.bitLength()>a&&this.subTo(BigInteger.ONE.shiftLeft(a-1),this)}else{c=[];var d=a&7;c.length=(a>>3)+1;b.nextBytes(c);c[0]=0<d?c[0]&(1<<d)-1:0;this.fromString(c,256)}}
function bnToByteArray(){var a=this.t,b=[];b[0]=this.s;var c=this.DB-a*this.DB%8,d,e=0;if(0<a--){if(c<this.DB&&(d=this[a]>>c)!=(this.s&this.DM)>>c)b[e++]=d|this.s<<this.DB-c;for(;0<=a;)if(8>c?(d=(this[a]&(1<<c)-1)<<8-c,d|=this[--a]>>(c+=this.DB-8)):(d=this[a]>>(c-=8)&255,0>=c&&(c+=this.DB,--a)),0!=(d&128)&&(d|=-256),0==e&&(this.s&128)!=(d&128)&&++e,0<e||d!=this.s)b[e++]=d}return b}function bnEquals(a){return 0==this.compareTo(a)}function bnMin(a){return 0>this.compareTo(a)?this:a}
function bnMax(a){return 0<this.compareTo(a)?this:a}function bnpBitwiseTo(a,b,c){var d,e,f=Math.min(a.t,this.t);for(d=0;d<f;++d)c[d]=b(this[d],a[d]);if(a.t<this.t){e=a.s&this.DM;for(d=f;d<this.t;++d)c[d]=b(this[d],e);c.t=this.t}else{e=this.s&this.DM;for(d=f;d<a.t;++d)c[d]=b(e,a[d]);c.t=a.t}c.s=b(this.s,a.s);c.clamp()}function op_and(a,b){return a&b}function bnAnd(a){var b=nbi();this.bitwiseTo(a,op_and,b);return b}function op_or(a,b){return a|b}
function bnOr(a){var b=nbi();this.bitwiseTo(a,op_or,b);return b}function op_xor(a,b){return a^b}function bnXor(a){var b=nbi();this.bitwiseTo(a,op_xor,b);return b}function op_andnot(a,b){return a&~b}function bnAndNot(a){var b=nbi();this.bitwiseTo(a,op_andnot,b);return b}function bnNot(){for(var a=nbi(),b=0;b<this.t;++b)a[b]=this.DM&~this[b];a.t=this.t;a.s=~this.s;return a}function bnShiftLeft(a){var b=nbi();0>a?this.rShiftTo(-a,b):this.lShiftTo(a,b);return b}
function bnShiftRight(a){var b=nbi();0>a?this.lShiftTo(-a,b):this.rShiftTo(a,b);return b}function lbit(a){if(0==a)return-1;var b=0;0==(a&65535)&&(a>>=16,b+=16);0==(a&255)&&(a>>=8,b+=8);0==(a&15)&&(a>>=4,b+=4);0==(a&3)&&(a>>=2,b+=2);0==(a&1)&&++b;return b}function bnGetLowestSetBit(){for(var a=0;a<this.t;++a)if(0!=this[a])return a*this.DB+lbit(this[a]);return 0>this.s?this.t*this.DB:-1}function cbit(a){for(var b=0;0!=a;)a&=a-1,++b;return b}
function bnBitCount(){for(var a=0,b=this.s&this.DM,c=0;c<this.t;++c)a+=cbit(this[c]^b);return a}function bnTestBit(a){var b=Math.floor(a/this.DB);return b>=this.t?0!=this.s:0!=(this[b]&1<<a%this.DB)}function bnpChangeBit(a,b){var c=BigInteger.ONE.shiftLeft(a);this.bitwiseTo(c,b,c);return c}function bnSetBit(a){return this.changeBit(a,op_or)}function bnClearBit(a){return this.changeBit(a,op_andnot)}function bnFlipBit(a){return this.changeBit(a,op_xor)}
function bnpAddTo(a,b){for(var c=0,d=0,e=Math.min(a.t,this.t);c<e;)d+=this[c]+a[c],b[c++]=d&this.DM,d>>=this.DB;if(a.t<this.t){for(d+=a.s;c<this.t;)d+=this[c],b[c++]=d&this.DM,d>>=this.DB;d+=this.s}else{for(d+=this.s;c<a.t;)d+=a[c],b[c++]=d&this.DM,d>>=this.DB;d+=a.s}b.s=0>d?-1:0;0<d?b[c++]=d:-1>d&&(b[c++]=this.DV+d);b.t=c;b.clamp()}function bnAdd(a){var b=nbi();this.addTo(a,b);return b}function bnSubtract(a){var b=nbi();this.subTo(a,b);return b}
function bnMultiply(a){var b=nbi();this.multiplyTo(a,b);return b}function bnSquare(){var a=nbi();this.squareTo(a);return a}function bnDivide(a){var b=nbi();this.divRemTo(a,b,null);return b}function bnRemainder(a){var b=nbi();this.divRemTo(a,null,b);return b}function bnDivideAndRemainder(a){var b=nbi(),c=nbi();this.divRemTo(a,b,c);return[b,c]}function bnpDMultiply(a){this[this.t]=this.am(0,a-1,this,0,0,this.t);++this.t;this.clamp()}
function bnpDAddOffset(a,b){if(0!=a){for(;this.t<=b;)this[this.t++]=0;for(this[b]+=a;this[b]>=this.DV;)this[b]-=this.DV,++b>=this.t&&(this[this.t++]=0),++this[b]}}function NullExp(){}function nNop(a){return a}function nMulTo(a,b,c){a.multiplyTo(b,c)}function nSqrTo(a,b){a.squareTo(b)}NullExp.prototype.convert=nNop;NullExp.prototype.revert=nNop;NullExp.prototype.mulTo=nMulTo;NullExp.prototype.sqrTo=nSqrTo;function bnPow(a){return this.exp(a,new NullExp)}
function bnpMultiplyLowerTo(a,b,c){var d=Math.min(this.t+a.t,b);c.s=0;for(c.t=d;0<d;)c[--d]=0;var e;for(e=c.t-this.t;d<e;++d)c[d+this.t]=this.am(0,a[d],c,d,0,this.t);for(e=Math.min(a.t,b);d<e;++d)this.am(0,a[d],c,d,0,b-d);c.clamp()}function bnpMultiplyUpperTo(a,b,c){--b;var d=c.t=this.t+a.t-b;for(c.s=0;0<=--d;)c[d]=0;for(d=Math.max(b-this.t,0);d<a.t;++d)c[this.t+d-b]=this.am(b-d,a[d],c,0,0,this.t+d-b);c.clamp();c.drShiftTo(1,c)}
function Barrett(a){this.r2=nbi();this.q3=nbi();BigInteger.ONE.dlShiftTo(2*a.t,this.r2);this.mu=this.r2.divide(a);this.m=a}function barrettConvert(a){if(0>a.s||a.t>2*this.m.t)return a.mod(this.m);if(0>a.compareTo(this.m))return a;var b=nbi();a.copyTo(b);this.reduce(b);return b}function barrettRevert(a){return a}
function barrettReduce(a){a.drShiftTo(this.m.t-1,this.r2);a.t>this.m.t+1&&(a.t=this.m.t+1,a.clamp());this.mu.multiplyUpperTo(this.r2,this.m.t+1,this.q3);for(this.m.multiplyLowerTo(this.q3,this.m.t+1,this.r2);0>a.compareTo(this.r2);)a.dAddOffset(1,this.m.t+1);for(a.subTo(this.r2,a);0<=a.compareTo(this.m);)a.subTo(this.m,a)}function barrettSqrTo(a,b){a.squareTo(b);this.reduce(b)}function barrettMulTo(a,b,c){a.multiplyTo(b,c);this.reduce(c)}Barrett.prototype.convert=barrettConvert;
Barrett.prototype.revert=barrettRevert;Barrett.prototype.reduce=barrettReduce;Barrett.prototype.mulTo=barrettMulTo;Barrett.prototype.sqrTo=barrettSqrTo;
function bnModPow(a,b){var c=a.bitLength(),d,e=nbv(1),f;if(0>=c)return e;d=18>c?1:48>c?3:144>c?4:768>c?5:6;f=8>c?new Classic(b):b.isEven()?new Barrett(b):new Montgomery(b);var g=[],h=3,j=d-1,k=(1<<d)-1;g[1]=f.convert(this);if(1<d){c=nbi();for(f.sqrTo(g[1],c);h<=k;)g[h]=nbi(),f.mulTo(c,g[h-2],g[h]),h+=2}for(var m=a.t-1,n,p=!0,l=nbi(),c=nbits(a[m])-1;0<=m;){c>=j?n=a[m]>>c-j&k:(n=(a[m]&(1<<c+1)-1)<<j-c,0<m&&(n|=a[m-1]>>this.DB+c-j));for(h=d;0==(n&1);)n>>=1,--h;if(0>(c-=h))c+=this.DB,--m;if(p)g[n].copyTo(e),
p=!1;else{for(;1<h;)f.sqrTo(e,l),f.sqrTo(l,e),h-=2;0<h?f.sqrTo(e,l):(h=e,e=l,l=h);f.mulTo(l,g[n],e)}for(;0<=m&&0==(a[m]&1<<c);)f.sqrTo(e,l),h=e,e=l,l=h,0>--c&&(c=this.DB-1,--m)}return f.revert(e)}
function bnGCD(a){var b=0>this.s?this.negate():this.clone();a=0>a.s?a.negate():a.clone();if(0>b.compareTo(a)){var c=b,b=a;a=c}var c=b.getLowestSetBit(),d=a.getLowestSetBit();if(0>d)return b;c<d&&(d=c);0<d&&(b.rShiftTo(d,b),a.rShiftTo(d,a));for(;0<b.signum();)0<(c=b.getLowestSetBit())&&b.rShiftTo(c,b),0<(c=a.getLowestSetBit())&&a.rShiftTo(c,a),0<=b.compareTo(a)?(b.subTo(a,b),b.rShiftTo(1,b)):(a.subTo(b,a),a.rShiftTo(1,a));0<d&&a.lShiftTo(d,a);return a}
function bnpModInt(a){if(0>=a)return 0;var b=this.DV%a,c=0>this.s?a-1:0;if(0<this.t)if(0==b)c=this[0]%a;else for(var d=this.t-1;0<=d;--d)c=(b*c+this[d])%a;return c}
function bnModInverse(a){var b=a.isEven();if(this.isEven()&&b||0==a.signum())return BigInteger.ZERO;for(var c=a.clone(),d=this.clone(),e=nbv(1),f=nbv(0),g=nbv(0),h=nbv(1);0!=c.signum();){for(;c.isEven();){c.rShiftTo(1,c);if(b){if(!e.isEven()||!f.isEven())e.addTo(this,e),f.subTo(a,f);e.rShiftTo(1,e)}else f.isEven()||f.subTo(a,f);f.rShiftTo(1,f)}for(;d.isEven();){d.rShiftTo(1,d);if(b){if(!g.isEven()||!h.isEven())g.addTo(this,g),h.subTo(a,h);g.rShiftTo(1,g)}else h.isEven()||h.subTo(a,h);h.rShiftTo(1,
h)}0<=c.compareTo(d)?(c.subTo(d,c),b&&e.subTo(g,e),f.subTo(h,f)):(d.subTo(c,d),b&&g.subTo(e,g),h.subTo(f,h))}if(0!=d.compareTo(BigInteger.ONE))return BigInteger.ZERO;if(0<=h.compareTo(a))return h.subtract(a);if(0>h.signum())h.addTo(a,h);else return h;return 0>h.signum()?h.add(a):h}
var lowprimes=[2,3,5,7,11,13,17,19,23,29,31,37,41,43,47,53,59,61,67,71,73,79,83,89,97,101,103,107,109,113,127,131,137,139,149,151,157,163,167,173,179,181,191,193,197,199,211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293,307,311,313,317,331,337,347,349,353,359,367,373,379,383,389,397,401,409,419,421,431,433,439,443,449,457,461,463,467,479,487,491,499,503,509,521,523,541,547,557,563,569,571,577,587,593,599,601,607,613,617,619,631,641,643,647,653,659,661,673,677,683,691,701,709,719,727,
733,739,743,751,757,761,769,773,787,797,809,811,821,823,827,829,839,853,857,859,863,877,881,883,887,907,911,919,929,937,941,947,953,967,971,977,983,991,997],lplim=67108864/lowprimes[lowprimes.length-1];
function bnIsProbablePrime(a){var b,c=this.abs();if(1==c.t&&c[0]<=lowprimes[lowprimes.length-1]){for(b=0;b<lowprimes.length;++b)if(c[0]==lowprimes[b])return!0;return!1}if(c.isEven())return!1;for(b=1;b<lowprimes.length;){for(var d=lowprimes[b],e=b+1;e<lowprimes.length&&d<lplim;)d*=lowprimes[e++];for(d=c.modInt(d);b<e;)if(0==d%lowprimes[b++])return!1}return c.millerRabin(a)}
function bnpMillerRabin(a){var b=this.subtract(BigInteger.ONE),c=b.getLowestSetBit();if(0>=c)return!1;var d=b.shiftRight(c);a=a+1>>1;a>lowprimes.length&&(a=lowprimes.length);for(var e=nbi(),f=0;f<a;++f){e.fromInt(lowprimes[Math.floor(Math.random()*lowprimes.length)]);var g=e.modPow(d,this);if(0!=g.compareTo(BigInteger.ONE)&&0!=g.compareTo(b)){for(var h=1;h++<c&&0!=g.compareTo(b);)if(g=g.modPowInt(2,this),0==g.compareTo(BigInteger.ONE))return!1;if(0!=g.compareTo(b))return!1}}return!0}
BigInteger.prototype.chunkSize=bnpChunkSize;BigInteger.prototype.toRadix=bnpToRadix;BigInteger.prototype.fromRadix=bnpFromRadix;BigInteger.prototype.fromNumber=bnpFromNumber;BigInteger.prototype.bitwiseTo=bnpBitwiseTo;BigInteger.prototype.changeBit=bnpChangeBit;BigInteger.prototype.addTo=bnpAddTo;BigInteger.prototype.dMultiply=bnpDMultiply;BigInteger.prototype.dAddOffset=bnpDAddOffset;BigInteger.prototype.multiplyLowerTo=bnpMultiplyLowerTo;BigInteger.prototype.multiplyUpperTo=bnpMultiplyUpperTo;
BigInteger.prototype.modInt=bnpModInt;BigInteger.prototype.millerRabin=bnpMillerRabin;BigInteger.prototype.clone=bnClone;BigInteger.prototype.intValue=bnIntValue;BigInteger.prototype.byteValue=bnByteValue;BigInteger.prototype.shortValue=bnShortValue;BigInteger.prototype.signum=bnSigNum;BigInteger.prototype.toByteArray=bnToByteArray;BigInteger.prototype.equals=bnEquals;BigInteger.prototype.min=bnMin;BigInteger.prototype.max=bnMax;BigInteger.prototype.and=bnAnd;BigInteger.prototype.or=bnOr;
BigInteger.prototype.xor=bnXor;BigInteger.prototype.andNot=bnAndNot;BigInteger.prototype.not=bnNot;BigInteger.prototype.shiftLeft=bnShiftLeft;BigInteger.prototype.shiftRight=bnShiftRight;BigInteger.prototype.getLowestSetBit=bnGetLowestSetBit;BigInteger.prototype.bitCount=bnBitCount;BigInteger.prototype.testBit=bnTestBit;BigInteger.prototype.setBit=bnSetBit;BigInteger.prototype.clearBit=bnClearBit;BigInteger.prototype.flipBit=bnFlipBit;BigInteger.prototype.add=bnAdd;BigInteger.prototype.subtract=bnSubtract;
BigInteger.prototype.multiply=bnMultiply;BigInteger.prototype.divide=bnDivide;BigInteger.prototype.remainder=bnRemainder;BigInteger.prototype.divideAndRemainder=bnDivideAndRemainder;BigInteger.prototype.modPow=bnModPow;BigInteger.prototype.modInverse=bnModInverse;BigInteger.prototype.pow=bnPow;BigInteger.prototype.gcd=bnGCD;BigInteger.prototype.isProbablePrime=bnIsProbablePrime;BigInteger.prototype.square=bnSquare;var Log=function(){};exports.Log=Log;Log.LOG=0;
var NDNProtocolDTags={Any:13,Name:14,Component:15,Certificate:16,Collection:17,CompleteName:18,Content:19,SignedInfo:20,ContentDigest:21,ContentHash:22,Count:24,Header:25,Interest:26,Key:27,KeyLocator:28,KeyName:29,Length:30,Link:31,LinkAuthenticator:32,NameComponentCount:33,RootDigest:36,Signature:37,Start:38,Timestamp:39,Type:40,Nonce:41,Scope:42,Exclude:43,Bloom:44,BloomSeed:45,AnswerOriginKind:47,InterestLifetime:48,Witness:53,SignatureBits:54,DigestAlgorithm:55,BlockSize:56,FreshnessSeconds:58,
FinalBlockID:59,PublisherPublicKeyDigest:60,PublisherCertificateDigest:61,PublisherIssuerKeyDigest:62,PublisherIssuerCertificateDigest:63,Data:64,WrappedKey:65,WrappingKeyIdentifier:66,WrapAlgorithm:67,KeyAlgorithm:68,Label:69,EncryptedKey:70,EncryptedNonceKey:71,WrappingKeyName:72,Action:73,FaceID:74,IPProto:75,Host:76,Port:77,MulticastInterface:78,ForwardingFlags:79,FaceInstance:80,ForwardingEntry:81,MulticastTTL:82,MinSuffixComponents:83,MaxSuffixComponents:84,ChildSelector:85,RepositoryInfo:86,
Version:87,RepositoryVersion:88,GlobalPrefix:89,LocalName:90,Policy:91,Namespace:92,GlobalPrefixName:93,PolicyVersion:94,KeyValueSet:95,KeyValuePair:96,IntegerValue:97,DecimalValue:98,StringValue:99,BinaryValue:100,NameValue:101,Entry:102,ACL:103,ParameterizedName:104,Prefix:105,Suffix:106,Root:107,ProfileName:108,Parameters:109,InfoString:110,StatusResponse:112,StatusCode:113,StatusText:114,SyncNode:115,SyncNodeKind:116,SyncNodeElement:117,SyncVersion:118,SyncNodeElements:119,SyncContentHash:120,
SyncLeafCount:121,SyncTreeDepth:122,SyncByteCount:123,ConfigSlice:124,ConfigSliceList:125,ConfigSliceOp:126,NDNProtocolDataUnit:17702112,NDNPROTOCOL_DATA_UNIT:"NDNProtocolDataUnit"};exports.NDNProtocolDTags=NDNProtocolDTags;
var NDNProtocolDTagsStrings=[null,null,null,null,null,null,null,null,null,null,null,null,null,"Any","Name","Component","Certificate","Collection","CompleteName","Content","SignedInfo","ContentDigest","ContentHash",null,"Count","Header","Interest","Key","KeyLocator","KeyName","Length","Link","LinkAuthenticator","NameComponentCount",null,null,"RootDigest","Signature","Start","Timestamp","Type","Nonce","Scope","Exclude","Bloom","BloomSeed",null,"AnswerOriginKind","InterestLifetime",null,null,null,null,
"Witness","SignatureBits","DigestAlgorithm","BlockSize",null,"FreshnessSeconds","FinalBlockID","PublisherPublicKeyDigest","PublisherCertificateDigest","PublisherIssuerKeyDigest","PublisherIssuerCertificateDigest","Data","WrappedKey","WrappingKeyIdentifier","WrapAlgorithm","KeyAlgorithm","Label","EncryptedKey","EncryptedNonceKey","WrappingKeyName","Action","FaceID","IPProto","Host","Port","MulticastInterface","ForwardingFlags","FaceInstance","ForwardingEntry","MulticastTTL","MinSuffixComponents","MaxSuffixComponents",
"ChildSelector","RepositoryInfo","Version","RepositoryVersion","GlobalPrefix","LocalName","Policy","Namespace","GlobalPrefixName","PolicyVersion","KeyValueSet","KeyValuePair","IntegerValue","DecimalValue","StringValue","BinaryValue","NameValue","Entry","ACL","ParameterizedName","Prefix","Suffix","Root","ProfileName","Parameters","InfoString",null,"StatusResponse","StatusCode","StatusText","SyncNode","SyncNodeKind","SyncNodeElement","SyncVersion","SyncNodeElements","SyncContentHash","SyncLeafCount",
"SyncTreeDepth","SyncByteCount","ConfigSlice","ConfigSliceList","ConfigSliceOp"];exports.NDNProtocolDTagsStrings=NDNProtocolDTagsStrings;var LOG=require("../log.js").Log.LOG,NDNTime=function(a){this.NANOS_MAX=999877929;"number"==typeof a?this.msec=a:1<LOG&&console.log("UNRECOGNIZED TYPE FOR TIME")};exports.NDNTime=NDNTime;NDNTime.prototype.getJavascriptDate=function(){var a=new Date;a.setTime(this.msec);return a};
var Closure=require("../closure.js").Closure,ExponentialReExpressClosure=function(a,b){Closure.call(this);this.callerClosure=a;b=b||{};this.maxInterestLifetime=b.maxInterestLifetime||16E3};exports.ExponentialReExpressClosure=ExponentialReExpressClosure;
ExponentialReExpressClosure.prototype.upcall=function(a,b){try{if(a==Closure.UPCALL_INTEREST_TIMED_OUT){var c=b.interest.interestLifetime;if(null==c)return this.callerClosure.upcall(Closure.UPCALL_INTEREST_TIMED_OUT,b);c*=2;if(c>this.maxInterestLifetime)return this.callerClosure.upcall(Closure.UPCALL_INTEREST_TIMED_OUT,b);var d=b.interest.clone();d.interestLifetime=c;b.face.expressInterest(d.name,this,d);return Closure.RESULT_OK}return this.callerClosure.upcall(a,b)}catch(e){return console.log("ExponentialReExpressClosure.upcall exception: "+
e),Closure.RESULT_ERR}};var Blob=function Blob(b,c){null==c&&(c=!0);this.buffer=null==b?null:"object"===typeof b&&b instanceof Blob?b.buffer:"string"===typeof b?new Buffer(b,"utf8"):c?new Buffer(b):"object"===typeof b&&b instanceof Buffer?b:new Buffer(b)};exports.Blob=Blob;Blob.prototype.size=function(){return null!=this.buffer?this.buffer.length:0};Blob.prototype.buf=function(){return this.buffer};Blob.prototype.isNull=function(){return null==this.buffer};
Blob.prototype.toHex=function(){return null==this.buffer?"":this.buffer.toString("hex")};
var Blob=require("./blob.js").Blob,SignedBlob=function SignedBlob(b,c,d){Blob.call(this,b);null==this.buffer?this.signedPortionEndOffset=this.signedPortionBeginOffset=0:"object"===typeof b&&b instanceof SignedBlob?(this.signedPortionBeginOffset=null==c?b.signedPortionBeginOffset:c,this.signedPortionEndOffset=null==d?b.signedPortionEndOffset:d):(this.signedPortionBeginOffset=c||0,this.signedPortionEndOffset=d||0);this.signedBuffer=null==this.buffer?null:this.buffer.slice(this.signedPortionBeginOffset,
this.signedPortionEndOffset)};SignedBlob.prototype=new Blob;SignedBlob.prototype.name="SignedBlob";exports.SignedBlob=SignedBlob;SignedBlob.prototype.signedSize=function(){return null!=this.signedBuffer?this.signedBuffer.length:0};SignedBlob.prototype.signedBuf=function(){return null!=this.signedBuffer?this.signedBuffer:null};SignedBlob.prototype.getSignedPortionBeginOffset=function(){return this.signedPortionBeginOffset};SignedBlob.prototype.getSignedPortionEndOffset=function(){return this.signedPortionEndOffset};
var DynamicBuffer=function(a){a||(a=16);this.array=new Buffer(a)};exports.DynamicBuffer=DynamicBuffer;DynamicBuffer.prototype.ensureLength=function(a){if(!(this.array.length>=a)){var b=2*this.array.length;a>b&&(b=a);a=new Buffer(b);this.array.copy(a);this.array=a}};DynamicBuffer.prototype.copy=function(a,b){this.ensureLength(a.length+b);"object"==typeof a&&a instanceof Buffer?a.copy(this.array,b):(new Buffer(a)).copy(this.array,b)};
DynamicBuffer.prototype.ensureLengthFromBack=function(a){if(!(this.array.length>=a)){var b=2*this.array.length;a>b&&(b=a);a=new Buffer(b);this.array.copy(a,a.length-this.array.length);this.array=a}};DynamicBuffer.prototype.copyFromBack=function(a,b){this.ensureLengthFromBack(b);"object"==typeof a&&a instanceof Buffer?a.copy(this.array,this.array.length-b):(new Buffer(a)).copy(this.array,this.array.length-b)};DynamicBuffer.prototype.slice=function(a,b){return this.array.slice(a,b)};var DataUtils=function(){};
exports.DataUtils=DataUtils;DataUtils.keyStr="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";DataUtils.stringtoBase64=function(a){var b="",c,d,e="",f,g,h="",j=0;do c=a.charCodeAt(j++),d=a.charCodeAt(j++),e=a.charCodeAt(j++),f=c>>2,c=(c&3)<<4|d>>4,g=(d&15)<<2|e>>6,h=e&63,isNaN(d)?g=h=64:isNaN(e)&&(h=64),b=b+DataUtils.keyStr.charAt(f)+DataUtils.keyStr.charAt(c)+DataUtils.keyStr.charAt(g)+DataUtils.keyStr.charAt(h);while(j<a.length);return b};
DataUtils.base64toString=function(a){var b="",c,d,e="",f,g="",h=0;/[^A-Za-z0-9\+\/\=]/g.exec(a)&&alert("There were invalid base64 characters in the input text.\nValid base64 characters are A-Z, a-z, 0-9, '+', '/',and '='\nExpect errors in decoding.");a=a.replace(/[^A-Za-z0-9\+\/\=]/g,"");do c=DataUtils.keyStr.indexOf(a.charAt(h++)),d=DataUtils.keyStr.indexOf(a.charAt(h++)),f=DataUtils.keyStr.indexOf(a.charAt(h++)),g=DataUtils.keyStr.indexOf(a.charAt(h++)),c=c<<2|d>>4,d=(d&15)<<4|f>>2,e=(f&3)<<6|g,
b+=String.fromCharCode(c),64!=f&&(b+=String.fromCharCode(d)),64!=g&&(b+=String.fromCharCode(e));while(h<a.length);return b};DataUtils.toHex=function(a){return a.toString("hex")};DataUtils.stringToHex=function(a){for(var b="",c=0;c<a.length;++c)var d=a.charCodeAt(c),b=b+((16>d?"0":"")+d.toString(16));return b};DataUtils.toString=function(a){return a.toString()};DataUtils.toNumbers=function(a){return new Buffer(a,"hex")};
DataUtils.hexToRawString=function(a){if("string"==typeof a){var b="";a.replace(/(..)/g,function(a){b+=String.fromCharCode(parseInt(a,16))});return b}};DataUtils.toNumbersFromString=function(a){return new Buffer(a,"binary")};DataUtils.stringToUtf8Array=function(a){return new Buffer(a,"utf8")};DataUtils.concatArrays=function(a){return Buffer.concat(a)};
DataUtils.decodeUtf8=function(a){for(var b="",c=0,d=0,e=0;c<a.length;)if(d=a.charCodeAt(c),128>d)b+=String.fromCharCode(d),c++;else if(191<d&&224>d)e=a.charCodeAt(c+1),b+=String.fromCharCode((d&31)<<6|e&63),c+=2;else var e=a.charCodeAt(c+1),f=a.charCodeAt(c+2),b=b+String.fromCharCode((d&15)<<12|(e&63)<<6|f&63),c=c+3;return b};
DataUtils.arraysEqual=function(a,b){if(!a.slice)throw Error("DataUtils.arraysEqual: a1 is not an array");if(!b.slice)throw Error("DataUtils.arraysEqual: a2 is not an array");if(a.length!=b.length)return!1;for(var c=0;c<a.length;++c)if(a[c]!=b[c])return!1;return!0};DataUtils.bigEndianToUnsignedInt=function(a){for(var b=0,c=0;c<a.length;++c)b<<=8,b+=a[c];return b};
DataUtils.nonNegativeIntToBigEndian=function(a){a=Math.round(a);if(0>=a)return new Buffer(0);for(var b=new Buffer(8),c=0;0!=a;)++c,b[8-c]=a&255,a>>=8;return b.slice(8-c,8)};DataUtils.shuffle=function(a){for(var b=a.length-1;1<=b;--b){var c=Math.floor(Math.random()*(b+1)),d=a[b];a[b]=a[c];a[c]=d}};
var DateFormat=function(){var a=/d{1,4}|m{1,4}|yy(?:yy)?|([HhMsTt])\1?|[LloSZ]|"[^"]*"|'[^']*'/g,b=/\b(?:[PMCEA][SDP]T|(?:Pacific|Mountain|Central|Eastern|Atlantic) (?:Standard|Daylight|Prevailing) Time|(?:GMT|UTC)(?:[-+]\d{4})?)\b/g,c=/[^-+\dA-Z]/g,d=function(a,b){a=String(a);for(b=b||2;a.length<b;)a="0"+a;return a};return function(e,f,g){var h=dateFormat;1==arguments.length&&("[object String]"==Object.prototype.toString.call(e)&&!/\d/.test(e))&&(f=e,e=void 0);e=e?new Date(e):new Date;if(isNaN(e))throw SyntaxError("invalid date");
f=String(h.masks[f]||f||h.masks["default"]);"UTC:"==f.slice(0,4)&&(f=f.slice(4),g=!0);var j=g?"getUTC":"get",k=e[j+"Date"](),m=e[j+"Day"](),n=e[j+"Month"](),p=e[j+"FullYear"](),l=e[j+"Hours"](),s=e[j+"Minutes"](),u=e[j+"Seconds"](),j=e[j+"Milliseconds"](),t=g?0:e.getTimezoneOffset(),w={d:k,dd:d(k),ddd:h.i18n.dayNames[m],dddd:h.i18n.dayNames[m+7],m:n+1,mm:d(n+1),mmm:h.i18n.monthNames[n],mmmm:h.i18n.monthNames[n+12],yy:String(p).slice(2),yyyy:p,h:l%12||12,hh:d(l%12||12),H:l,HH:d(l),M:s,MM:d(s),s:u,
ss:d(u),l:d(j,3),L:d(99<j?Math.round(j/10):j),t:12>l?"a":"p",tt:12>l?"am":"pm",T:12>l?"A":"P",TT:12>l?"AM":"PM",Z:g?"UTC":(String(e).match(b)||[""]).pop().replace(c,""),o:(0<t?"-":"+")+d(100*Math.floor(Math.abs(t)/60)+Math.abs(t)%60,4),S:["th","st","nd","rd"][3<k%10?0:(10!=k%100-k%10)*k%10]};return f.replace(a,function(a){return a in w?w[a]:a.slice(1,a.length-1)})}}();
DateFormat.masks={"default":"ddd mmm dd yyyy HH:MM:ss",shortDate:"m/d/yy",mediumDate:"mmm d, yyyy",longDate:"mmmm d, yyyy",fullDate:"dddd, mmmm d, yyyy",shortTime:"h:MM TT",mediumTime:"h:MM:ss TT",longTime:"h:MM:ss TT Z",isoDate:"yyyy-mm-dd",isoTime:"HH:MM:ss",isoDateTime:"yyyy-mm-dd'T'HH:MM:ss",isoUtcDateTime:"UTC:yyyy-mm-dd'T'HH:MM:ss'Z'"};DateFormat.i18n={dayNames:"Sun Mon Tue Wed Thu Fri Sat Sunday Monday Tuesday Wednesday Thursday Friday Saturday".split(" "),monthNames:"Jan Feb Mar Apr May Jun Jul Aug Sep Oct Nov Dec January February March April May June July August September October November December".split(" ")};
Date.prototype.format=function(a,b){return dateFormat(this,a,b)};function DecodingException(a){this.message=a.message;for(var b in a)this[b]=a[b]}DecodingException.prototype=Error();DecodingException.prototype.name="DecodingException";exports.DecodingException=DecodingException;
var LOG=require("../log.js").Log.LOG,NDNProtocolDTags=require("../util/ndn-protoco-id-tags.js").NDNProtocolDTags,DynamicBuffer=require("../util/dynamic-buffer.js").DynamicBuffer,DataUtils=require("./data-utils.js").DataUtils,LOG=require("../log.js").Log.LOG,XML_EXT=0,XML_TAG=1,XML_DTAG=2,XML_ATTR=3,XML_DATTR=4,XML_BLOB=5,XML_UDATA=6,XML_CLOSE=0,XML_SUBTYPE_PROCESSING_INSTRUCTIONS=16,XML_TT_BITS=3,XML_TT_MASK=(1<<XML_TT_BITS)-1,XML_TT_VAL_BITS=XML_TT_BITS+1,XML_TT_VAL_MASK=(1<<XML_TT_VAL_BITS)-1,XML_REG_VAL_BITS=
7,XML_REG_VAL_MASK=(1<<XML_REG_VAL_BITS)-1,XML_TT_NO_MORE=1<<XML_REG_VAL_BITS,BYTE_MASK=255,LONG_BYTES=8,LONG_BITS=64,bits_11=2047,bits_18=262143,bits_32=4294967295,BinaryXMLEncoder=function(a){a||(a=16);this.ostream=new DynamicBuffer(a);this.offset=0;this.CODEC_NAME="Binary"};exports.BinaryXMLEncoder=BinaryXMLEncoder;BinaryXMLEncoder.prototype.writeUString=function(a){this.encodeUString(a,XML_UDATA)};BinaryXMLEncoder.prototype.writeBlob=function(a){3<LOG&&console.log(a);this.encodeBlob(a,a.length)};
BinaryXMLEncoder.prototype.writeElementStartDTag=function(a){this.encodeTypeAndVal(XML_DTAG,a)};BinaryXMLEncoder.prototype.writeStartElement=function(a,b){null==a?this.encodeUString(a,XML_TAG):this.encodeTypeAndVal(XML_DTAG,a);null!=b&&this.writeAttributes(b)};BinaryXMLEncoder.prototype.writeElementClose=function(){this.ostream.ensureLength(this.offset+1);this.ostream.array[this.offset]=XML_CLOSE;this.offset+=1};BinaryXMLEncoder.prototype.writeEndElement=function(){this.writeElementClose()};
BinaryXMLEncoder.prototype.writeAttributes=function(a){if(null!=a)for(var b=0;b<a.length;b++){var c=a[b].k,d=a[b].v,e=stringToTag(c);null==e?this.encodeUString(c,XML_ATTR):this.encodeTypeAndVal(XML_DATTR,e);this.encodeUString(d)}};stringToTag=function(a){return 0<=a&&a<NDNProtocolDTagsStrings.length?NDNProtocolDTagsStrings[a]:a==NDNProtocolDTags.NDNProtocolDataUnit?NDNProtocolDTags.NDNPROTOCOL_DATA_UNIT:null};
tagToString=function(a){for(var b=0;b<NDNProtocolDTagsStrings.length;++b)if(null!=NDNProtocolDTagsStrings[b]&&NDNProtocolDTagsStrings[b]==a)return b;return NDNProtocolDTags.NDNPROTOCOL_DATA_UNIT==a?NDNProtocolDTags.NDNProtocolDataUnit:null};BinaryXMLEncoder.prototype.writeDTagElement=function(a,b){this.writeElementStartDTag(a);"number"===typeof b?this.writeUString(b.toString()):"string"===typeof b?this.writeUString(b):this.writeBlob(b);this.writeElementClose()};
BinaryXMLEncoder.prototype.writeElement=function(a,b,c){this.writeStartElement(a,c);"number"===typeof b?(4<LOG&&console.log("GOING TO WRITE THE NUMBER .charCodeAt(0) "+b.toString().charCodeAt(0)),4<LOG&&console.log("GOING TO WRITE THE NUMBER "+b.toString()),4<LOG&&console.log("type of number is "+typeof b.toString()),this.writeUString(b.toString())):"string"===typeof b?(4<LOG&&console.log("GOING TO WRITE THE STRING  "+b),4<LOG&&console.log("type of STRING is "+typeof b),this.writeUString(b)):(4<LOG&&
console.log("GOING TO WRITE A BLOB  "+b),this.writeBlob(b));this.writeElementClose()};var TypeAndVal=function(a,b){this.type=a;this.val=b};
BinaryXMLEncoder.prototype.encodeTypeAndVal=function(a,b){4<LOG&&console.log("Encoding type "+a+" and value "+b);4<LOG&&console.log("OFFSET IS "+this.offset);if(a>XML_UDATA||0>a||0>b)throw Error("Tag and value must be positive, and tag valid.");var c=this.numEncodingBytes(b);this.ostream.ensureLength(this.offset+c);this.ostream.array[this.offset+c-1]=BYTE_MASK&(XML_TT_MASK&a|(XML_TT_VAL_MASK&b)<<XML_TT_BITS)|XML_TT_NO_MORE;b>>>=XML_TT_VAL_BITS;for(var d=this.offset+c-2;0!=b&&d>=this.offset;)this.ostream.array[d]=
BYTE_MASK&b&XML_REG_VAL_MASK,b>>>=XML_REG_VAL_BITS,--d;if(0!=b)throw Error("This should not happen: miscalculated encoding");this.offset+=c;return c};
BinaryXMLEncoder.prototype.encodeUString=function(a,b){if(null!=a&&!(b==XML_TAG||b==XML_ATTR&&0==a.length)){3<LOG&&console.log("The string to write is ");3<LOG&&console.log(a);var c=DataUtils.stringToUtf8Array(a);this.encodeTypeAndVal(b,b==XML_TAG||b==XML_ATTR?c.length-1:c.length);3<LOG&&console.log("THE string to write is ");3<LOG&&console.log(c);this.writeString(c);this.offset+=c.length}};
BinaryXMLEncoder.prototype.encodeBlob=function(a,b){null!=a&&(4<LOG&&console.log("LENGTH OF XML_BLOB IS "+b),this.encodeTypeAndVal(XML_BLOB,b),this.writeBlobArray(a),this.offset+=b)};var ENCODING_LIMIT_1_BYTE=(1<<XML_TT_VAL_BITS)-1,ENCODING_LIMIT_2_BYTES=(1<<XML_TT_VAL_BITS+XML_REG_VAL_BITS)-1,ENCODING_LIMIT_3_BYTES=(1<<XML_TT_VAL_BITS+2*XML_REG_VAL_BITS)-1;
BinaryXMLEncoder.prototype.numEncodingBytes=function(a){if(a<=ENCODING_LIMIT_1_BYTE)return 1;if(a<=ENCODING_LIMIT_2_BYTES)return 2;if(a<=ENCODING_LIMIT_3_BYTES)return 3;var b=1;for(a>>>=XML_TT_VAL_BITS;0!=a;)b++,a>>>=XML_REG_VAL_BITS;return b};BinaryXMLEncoder.prototype.writeDateTimeDTagElement=function(a,b){var c=Math.round(4096*(b.msec/1E3)).toString(16);1==c.length%2&&(c="0"+c);this.writeDTagElement(a,DataUtils.toNumbers(c))};
BinaryXMLEncoder.prototype.writeDateTime=function(a,b){var c=Math.round(4096*(b.msec/1E3)).toString(16);1==c.length%2&&(c="0"+c);this.writeElement(a,DataUtils.toNumbers(c))};
BinaryXMLEncoder.prototype.writeString=function(a){if("string"===typeof a){4<LOG&&console.log("GOING TO WRITE A STRING");4<LOG&&console.log(a);this.ostream.ensureLength(this.offset+a.length);for(var b=0;b<a.length;b++)4<LOG&&console.log("input.charCodeAt(i)="+a.charCodeAt(b)),this.ostream.array[this.offset+b]=a.charCodeAt(b)}else 4<LOG&&console.log("GOING TO WRITE A STRING IN BINARY FORM"),4<LOG&&console.log(a),this.writeBlobArray(a)};
BinaryXMLEncoder.prototype.writeBlobArray=function(a){4<LOG&&console.log("GOING TO WRITE A BLOB");this.ostream.copy(a,this.offset)};BinaryXMLEncoder.prototype.getReducedOstream=function(){return this.ostream.slice(0,this.offset)};NDNProtocolDTags=require("../util/ndn-protoco-id-tags.js").NDNProtocolDTags;NDNTime=require("../util/ndn-time.js").NDNTime;DataUtils=require("./data-utils.js").DataUtils;DecodingException=require("./decoding-exception.js").DecodingException;LOG=require("../log.js").Log.LOG;
XML_EXT=0;XML_TAG=1;XML_DTAG=2;XML_ATTR=3;XML_DATTR=4;XML_BLOB=5;XML_UDATA=6;XML_CLOSE=0;XML_SUBTYPE_PROCESSING_INSTRUCTIONS=16;XML_TT_BITS=3;XML_TT_MASK=(1<<XML_TT_BITS)-1;XML_TT_VAL_BITS=XML_TT_BITS+1;XML_TT_VAL_MASK=(1<<XML_TT_VAL_BITS)-1;XML_REG_VAL_BITS=7;XML_REG_VAL_MASK=(1<<XML_REG_VAL_BITS)-1;XML_TT_NO_MORE=1<<XML_REG_VAL_BITS;BYTE_MASK=255;LONG_BYTES=8;LONG_BITS=64;bits_11=2047;bits_18=262143;bits_32=4294967295;
tagToString=function(a){return 0<=a&&a<NDNProtocolDTagsStrings.length?NDNProtocolDTagsStrings[a]:a==NDNProtocolDTags.NDNProtocolDataUnit?NDNProtocolDTags.NDNPROTOCOL_DATA_UNIT:null};stringToTag=function(a){for(var b=0;b<NDNProtocolDTagsStrings.length;++b)if(null!=NDNProtocolDTagsStrings[b]&&NDNProtocolDTagsStrings[b]==a)return b;return NDNProtocolDTags.NDNPROTOCOL_DATA_UNIT==a?NDNProtocolDTags.NDNProtocolDataUnit:null};
var BinaryXMLDecoder=function(a){this.input=a;this.offset=0;this.previouslyPeekedDTagStartOffset=-1};exports.BinaryXMLDecoder=BinaryXMLDecoder;
BinaryXMLDecoder.prototype.readElementStartDTag=function(a){if(this.offset==this.previouslyPeekedDTagStartOffset){if(this.previouslyPeekedDTag!=a)throw new DecodingException(Error("Did not get the expected DTAG "+a+", got "+this.previouslyPeekedDTag));this.offset=this.previouslyPeekedDTagEndOffset}else{var b=this.decodeTypeAndVal();if(null==b||b.type()!=XML_DTAG)throw new DecodingException(Error("Header type is not a DTAG"));if(b.val()!=a)throw new DecodingException(Error("Expected start element: "+
a+" got: "+b.val()));}};
BinaryXMLDecoder.prototype.readStartElement=function(a,b){var c=this.decodeTypeAndVal();if(null==c)throw new DecodingException(Error("Expected start element: "+a+" got something not a tag."));var d=null;c.type()==XML_TAG?(d="string"==typeof c.val()?parseInt(c.val())+1:c.val()+1,d=this.decodeUString(d)):c.type()==XML_DTAG&&(d=c.val());if(null==d||d!=a)throw console.log("expecting "+a+" but got "+d),new DecodingException(Error("Expected start element: "+a+" got: "+d+"("+c.val()+")"));null!=b&&readAttributes(b)};
BinaryXMLDecoder.prototype.readAttributes=function(a){if(null!=a)try{for(var b=this.peekTypeAndVal();null!=b&&(XML_ATTR==b.type()||XML_DATTR==b.type());){var c=this.decodeTypeAndVal(),d=null;if(XML_ATTR==c.type()){var e;e="string"==typeof c.val()?parseInt(c.val())+1:c.val()+1;d=this.decodeUString(e)}else if(XML_DATTR==c.type()&&(d=tagToString(c.val()),null==d))throw new DecodingException(Error("Unknown DATTR value"+c.val()));var f=this.decodeUString();a.push([d,f]);b=this.peekTypeAndVal()}}catch(g){throw new DecodingException(Error("readStartElement",
g));}};BinaryXMLDecoder.prototype.peekStartElementAsString=function(){var a=null,b=this.offset;try{var c=this.decodeTypeAndVal();if(null!=c)if(c.type()==XML_TAG){var d;d="string"==typeof c.val()?parseInt(c.val())+1:c.val()+1;a=this.decodeUString(d)}else c.type()==XML_DTAG&&(a=tagToString(c.val()))}catch(e){}finally{try{this.offset=b}catch(f){throw Log.logStackTrace(Log.FAC_ENCODING,Level.WARNING,f),new DecodingException(Error("Cannot reset stream! "+f.getMessage(),f));}}return a};
BinaryXMLDecoder.prototype.peekDTag=function(a){if(this.offset==this.previouslyPeekedDTagStartOffset)return this.previouslyPeekedDTag==a;if(this.input[this.offset]==XML_CLOSE)return!1;var b=this.offset,c=this.decodeTypeAndVal();this.previouslyPeekedDTagEndOffset=this.offset;this.offset=b;return null!=c&&c.type()==XML_DTAG?(this.previouslyPeekedDTagStartOffset=b,this.previouslyPeekedDTag=c.val(),c.val()==a):!1};
BinaryXMLDecoder.prototype.peekStartElement=function(a){if("string"==typeof a){var b=this.peekStartElementAsString();return null!=b&&b==a?!0:!1}if("number"==typeof a)return b=this.peekStartElementAsLong(),null!=b&&b==a?!0:!1;throw new DecodingException(Error("SHOULD BE STRING OR NUMBER"));};
BinaryXMLDecoder.prototype.peekStartElementAsLong=function(){var a=null,b=this.offset;try{var c=this.decodeTypeAndVal();if(null!=c)if(c.type()==XML_TAG){if(c.val()+1>DEBUG_MAX_LEN)throw new DecodingException(Error("Decoding error: length "+c.val()+1+" longer than expected maximum length!"));var d;d="string"==typeof c.val()?parseInt(c.val())+1:c.val()+1;var e=this.decodeUString(d),a=stringToTag(e)}else c.type()==XML_DTAG&&(a=c.val())}catch(f){}finally{try{this.offset=b}catch(g){throw Log.logStackTrace(Log.FAC_ENCODING,
Level.WARNING,g),Error("Cannot reset stream! "+g.getMessage(),g);}}return a};BinaryXMLDecoder.prototype.readBinaryDTagElement=function(a,b){this.readElementStartDTag(a);return this.readBlob(b)};BinaryXMLDecoder.prototype.readBinaryElement=function(a,b,c){this.readStartElement(a,b);return this.readBlob(c)};BinaryXMLDecoder.prototype.readElementClose=function(){var a=this.input[this.offset++];if(a!=XML_CLOSE)throw new DecodingException(Error("Expected end element, got: "+a));};
BinaryXMLDecoder.prototype.readEndElement=function(){4<LOG&&console.log("this.offset is "+this.offset);var a=this.input[this.offset];this.offset++;4<LOG&&console.log("XML_CLOSE IS "+XML_CLOSE);4<LOG&&console.log("next is "+a);if(a!=XML_CLOSE)throw console.log("Expected end element, got: "+a),new DecodingException(Error("Expected end element, got: "+a));};BinaryXMLDecoder.prototype.readUString=function(){var a=this.decodeUString();this.readElementClose();return a};
BinaryXMLDecoder.prototype.readBlob=function(a){if(this.input[this.offset]==XML_CLOSE&&a)return this.readElementClose(),null;a=this.decodeBlob();this.readElementClose();return a};BinaryXMLDecoder.prototype.readDateTimeDTagElement=function(a){a=this.readBinaryDTagElement(a);a=DataUtils.toHex(a);a=parseInt(a,16);var b=new NDNTime(1E3*(a/4096));if(null==b)throw new DecodingException(Error("Cannot parse timestamp: "+DataUtils.printHexBytes(a)));return b};
BinaryXMLDecoder.prototype.readDateTime=function(a){a=this.readBinaryElement(a);a=DataUtils.toHex(a);a=parseInt(a,16);var b=1E3*(a/4096);4<LOG&&console.log("DECODED DATE WITH VALUE");4<LOG&&console.log(b);b=new NDNTime(b);if(null==b)throw new DecodingException(Error("Cannot parse timestamp: "+DataUtils.printHexBytes(a)));return b};
BinaryXMLDecoder.prototype.decodeTypeAndVal=function(){var a=-1,b=0,c=!0;do{var d=this.input[this.offset];if(null==d||0>d||0==d&&0==b)return null;(c=0==(d&XML_TT_NO_MORE))?(b<<=XML_REG_VAL_BITS,b|=d&XML_REG_VAL_MASK):(a=d&XML_TT_MASK,b<<=XML_TT_VAL_BITS,b|=d>>>XML_TT_BITS&XML_TT_VAL_MASK);this.offset++}while(c);4<LOG&&console.log("TYPE is "+a+" VAL is "+b);return new TypeAndVal(a,b)};
BinaryXMLDecoder.prototype.peekTypeAndVal=function(){var a=null,b=this.offset;try{a=this.decodeTypeAndVal()}finally{this.offset=b}return a};BinaryXMLDecoder.prototype.decodeBlob=function(a){if(null==a)return a=this.decodeTypeAndVal(),a="string"==typeof a.val()?parseInt(a.val()):a.val(),this.decodeBlob(a);var b=new Buffer(this.input.slice(this.offset,this.offset+a));this.offset+=a;return b};
BinaryXMLDecoder.prototype.decodeUString=function(a){if(null==a){a=this.offset;var b=this.decodeTypeAndVal();4<LOG&&console.log("TV is "+b);4<LOG&&console.log(b);4<LOG&&console.log("Type of TV is "+typeof b);return null==b||XML_UDATA!=b.type()?(this.offset=a,""):this.decodeUString(b.val())}a=this.decodeBlob(a);return DataUtils.toString(a)};TypeAndVal=function(a,b){this.t=a;this.v=b};TypeAndVal.prototype.type=function(){return this.t};TypeAndVal.prototype.val=function(){return this.v};
BinaryXMLDecoder.prototype.readIntegerDTagElement=function(a){return parseInt(this.readUTF8DTagElement(a))};BinaryXMLDecoder.prototype.readIntegerElement=function(a){4<LOG&&console.log("READING INTEGER "+a);4<LOG&&console.log("TYPE OF "+typeof a);a=this.readUTF8Element(a);return parseInt(a)};BinaryXMLDecoder.prototype.readUTF8DTagElement=function(a){this.readElementStartDTag(a);return this.readUString()};BinaryXMLDecoder.prototype.readUTF8Element=function(a,b){this.readStartElement(a,b);return this.readUString()};
BinaryXMLDecoder.prototype.seek=function(a){this.offset=a};
var BinaryXMLDecoder=require("./binary-xml-decoder.js").BinaryXMLDecoder,DynamicBuffer=require("../util/dynamic-buffer.js").DynamicBuffer,XML_EXT=0,XML_TAG=1,XML_DTAG=2,XML_ATTR=3,XML_DATTR=4,XML_BLOB=5,XML_UDATA=6,XML_CLOSE=0,XML_SUBTYPE_PROCESSING_INSTRUCTIONS=16,XML_TT_BITS=3,XML_TT_MASK=(1<<XML_TT_BITS)-1,XML_TT_VAL_BITS=XML_TT_BITS+1,XML_TT_VAL_MASK=(1<<XML_TT_VAL_BITS)-1,XML_REG_VAL_BITS=7,XML_REG_VAL_MASK=(1<<XML_REG_VAL_BITS)-1,XML_TT_NO_MORE=1<<XML_REG_VAL_BITS,BinaryXMLStructureDecoder=
function(){this.gotElementEnd=!1;this.level=this.offset=0;this.state=BinaryXMLStructureDecoder.READ_HEADER_OR_CLOSE;this.headerLength=0;this.useHeaderBuffer=!1;this.headerBuffer=new DynamicBuffer(5);this.nBytesToRead=0};exports.BinaryXMLStructureDecoder=BinaryXMLStructureDecoder;BinaryXMLStructureDecoder.READ_HEADER_OR_CLOSE=0;BinaryXMLStructureDecoder.READ_BYTES=1;
BinaryXMLStructureDecoder.prototype.findElementEnd=function(a){if(this.gotElementEnd)return!0;for(var b=new BinaryXMLDecoder(a);;){if(this.offset>=a.length)return!1;switch(this.state){case BinaryXMLStructureDecoder.READ_HEADER_OR_CLOSE:if(0==this.headerLength&&a[this.offset]==XML_CLOSE){++this.offset;--this.level;if(0==this.level)return this.gotElementEnd=!0;if(0>this.level)throw Error("BinaryXMLStructureDecoder: Unexpected close tag at offset "+(this.offset-1));this.startHeader();break}for(var c=
this.headerLength;;){if(this.offset>=a.length){this.useHeaderBuffer=!0;var d=this.headerLength-c;this.headerBuffer.copy(a.slice(this.offset-d,d),c);return!1}d=a[this.offset++];++this.headerLength;if(d&XML_TT_NO_MORE)break}this.useHeaderBuffer?(d=this.headerLength-c,this.headerBuffer.copy(a.slice(this.offset-d,d),c),c=(new BinaryXMLDecoder(this.headerBuffer.array)).decodeTypeAndVal()):(b.seek(this.offset-this.headerLength),c=b.decodeTypeAndVal());if(null==c)throw Error("BinaryXMLStructureDecoder: Can't read header starting at offset "+
(this.offset-this.headerLength));d=c.t;if(d==XML_DATTR)this.startHeader();else if(d==XML_DTAG||d==XML_EXT)++this.level,this.startHeader();else if(d==XML_TAG||d==XML_ATTR)d==XML_TAG&&++this.level,this.nBytesToRead=c.v+1,this.state=BinaryXMLStructureDecoder.READ_BYTES;else if(d==XML_BLOB||d==XML_UDATA)this.nBytesToRead=c.v,this.state=BinaryXMLStructureDecoder.READ_BYTES;else throw Error("BinaryXMLStructureDecoder: Unrecognized header type "+d);break;case BinaryXMLStructureDecoder.READ_BYTES:c=a.length-
this.offset;if(c<this.nBytesToRead)return this.offset+=c,this.nBytesToRead-=c,!1;this.offset+=this.nBytesToRead;this.startHeader();break;default:throw Error("BinaryXMLStructureDecoder: Unrecognized state "+this.state);}}};BinaryXMLStructureDecoder.prototype.startHeader=function(){this.headerLength=0;this.useHeaderBuffer=!1;this.state=BinaryXMLStructureDecoder.READ_HEADER_OR_CLOSE};BinaryXMLStructureDecoder.prototype.seek=function(a){this.offset=a};var Tlv=function(){};exports.Tlv=Tlv;
Tlv.Interest=5;Tlv.Data=6;Tlv.Name=7;Tlv.NameComponent=8;Tlv.Selectors=9;Tlv.Nonce=10;Tlv.Scope=11;Tlv.InterestLifetime=12;Tlv.MinSuffixComponents=13;Tlv.MaxSuffixComponents=14;Tlv.PublisherPublicKeyLocator=15;Tlv.Exclude=16;Tlv.ChildSelector=17;Tlv.MustBeFresh=18;Tlv.Any=19;Tlv.MetaInfo=20;Tlv.Content=21;Tlv.SignatureInfo=22;Tlv.SignatureValue=23;Tlv.ContentType=24;Tlv.FreshnessPeriod=25;Tlv.FinalBlockId=26;Tlv.SignatureType=27;Tlv.KeyLocator=28;Tlv.KeyLocatorDigest=29;Tlv.FaceInstance=128;
Tlv.ForwardingEntry=129;Tlv.StatusResponse=130;Tlv.Action=131;Tlv.FaceID=132;Tlv.IPProto=133;Tlv.Host=134;Tlv.Port=135;Tlv.MulticastInterface=136;Tlv.MulticastTTL=137;Tlv.ForwardingFlags=138;Tlv.StatusCode=139;Tlv.StatusText=140;Tlv.SignatureType_DigestSha256=0;Tlv.SignatureType_SignatureSha256WithRsa=1;var DynamicBuffer=require("../../util/dynamic-buffer.js").DynamicBuffer,TlvEncoder=function(a){this.output=new DynamicBuffer(a||16);this.length=0};exports.TlvEncoder=TlvEncoder;
TlvEncoder.prototype.getLength=function(){return this.length};
TlvEncoder.prototype.writeVarNumber=function(a){if(253>a)this.length+=1,this.output.ensureLengthFromBack(this.length),this.output.array[this.output.array.length-this.length]=a&255;else if(65535>=a){this.length+=3;this.output.ensureLengthFromBack(this.length);var b=this.output.array.length-this.length;this.output.array[b]=253;this.output.array[b+1]=a>>8&255;this.output.array[b+2]=a&255}else 4294967295>=a?(this.length+=5,this.output.ensureLengthFromBack(this.length),b=this.output.array.length-this.length,
this.output.array[b]=254,this.output.array[b+1]=a>>24&255,this.output.array[b+2]=a>>16&255,this.output.array[b+3]=a>>8&255,this.output.array[b+4]=a&255):(this.length+=9,this.output.ensureLengthFromBack(this.length),b=this.output.array.length-this.length,this.output.array[b]=255,this.output.array[b+1]=a>>56&255,this.output.array[b+2]=a>>48&255,this.output.array[b+3]=a>>40&255,this.output.array[b+4]=a>>32&255,this.output.array[b+5]=a>>24&255,this.output.array[b+6]=a>>16&255,this.output.array[b+7]=a>>
8&255,this.output.array[b+8]=a&255)};TlvEncoder.prototype.writeTypeAndLength=function(a,b){this.writeVarNumber(b);this.writeVarNumber(a)};
TlvEncoder.prototype.writeNonNegativeIntegerTlv=function(a,b){if(0>b)throw Error("TLV integer value may not be negative");b=Math.round(b);var c=this.length;if(253>b)this.length+=1,this.output.ensureLengthFromBack(this.length),this.output.array[this.output.array.length-this.length]=b&255;else if(65535>=b){this.length+=2;this.output.ensureLengthFromBack(this.length);var d=this.output.array.length-this.length;this.output.array[d]=b>>8&255;this.output.array[d+1]=b&255}else 4294967295>=b?(this.length+=
4,this.output.ensureLengthFromBack(this.length),d=this.output.array.length-this.length,this.output.array[d]=b>>24&255,this.output.array[d+1]=b>>16&255,this.output.array[d+2]=b>>8&255,this.output.array[d+3]=b&255):(this.length+=8,this.output.ensureLengthFromBack(this.length),d=this.output.array.length-this.length,this.output.array[d]=b>>56&255,this.output.array[d+1]=b>>48&255,this.output.array[d+2]=b>>40&255,this.output.array[d+3]=b>>32&255,this.output.array[d+4]=b>>24&255,this.output.array[d+5]=b>>
16&255,this.output.array[d+6]=b>>8&255,this.output.array[d+7]=b&255);this.writeTypeAndLength(a,this.length-c)};TlvEncoder.prototype.writeOptionalNonNegativeIntegerTlv=function(a,b){null!=b&&0<=b&&this.writeNonNegativeIntegerTlv(a,b)};TlvEncoder.prototype.writeBlobTlv=function(a,b){null==b?this.writeTypeAndLength(a,0):(this.length+=b.length,this.output.copyFromBack(b,this.length),this.writeTypeAndLength(a,b.length))};
TlvEncoder.prototype.writeOptionalBlobTlv=function(a,b){null!=b&&0<b.length&&this.writeBlobTlv(a,b)};TlvEncoder.prototype.getOutput=function(){return this.output.array.slice(this.output.array.length-this.length)};var DecodingException=require("../decoding-exception.js").DecodingException,TlvDecoder=function(a){this.input=a;this.offset=0};exports.TlvDecoder=TlvDecoder;TlvDecoder.prototype.readVarNumber=function(){firstOctet=this.input[this.offset];this.offset+=1;return 253>firstOctet?firstOctet:this.readExtendedVarNumber(firstOctet)};
TlvDecoder.prototype.readExtendedVarNumber=function(a){253==a?(result=(this.input[this.offset]<<8)+this.input[this.offset+1],this.offset+=2):254==a?(result=(this.input[this.offset]<<24)+(this.input[this.offset+1]<<16)+(this.input[this.offset+2]<<8)+this.input[this.offset+3],this.offset+=4):(result=(this.input[this.offset]<<56)+(this.input[this.offset+1]<<48)+(this.input[this.offset+2]<<40)+(this.input[this.offset+3]<<32)+(this.input[this.offset+4]<<24)+(this.input[this.offset+5]<<16)+(this.input[this.offset+
6]<<8)+this.input[this.offset+7],this.offset+=8);return result};TlvDecoder.prototype.readTypeAndLength=function(a){if(this.readVarNumber()!=a)throw new DecodingException("Did not get the expected TLV type");a=this.readVarNumber();if(this.offset+a>this.input.length)throw new DecodingException("TLV length exceeds the buffer length");return a};TlvDecoder.prototype.readNestedTlvsStart=function(a){return this.readTypeAndLength(a)+this.offset};
TlvDecoder.prototype.finishNestedTlvs=function(a){if(this.offset!=a){for(;this.offset<a;){this.readVarNumber();var b=this.readVarNumber();this.offset+=b;if(this.offset>this.input.length)throw new DecodingException("TLV length exceeds the buffer length");}if(this.offset!=a)throw new DecodingException("TLV length does not equal the total length of the nested TLVs");}};
TlvDecoder.prototype.peekType=function(a,b){if(this.offset>=b)return!1;var c=this.offset,d=this.readVarNumber();this.offset=c;return d==a};
TlvDecoder.prototype.readNonNegativeInteger=function(a){var b;if(1==a)b=this.input[this.offset];else if(2==a)b=(this.input[this.offset]<<8)+this.input[this.offset+1];else if(4==a)b=(this.input[this.offset]<<24)+(this.input[this.offset+1]<<16)+(this.input[this.offset+2]<<8)+this.input[this.offset+3];else if(8==a)b=(this.input[this.offset]<<56)+(this.input[this.offset+1]<<48)+(this.input[this.offset+2]<<40)+(this.input[this.offset+3]<<32)+(this.input[this.offset+4]<<24)+(this.input[this.offset+5]<<
16)+(this.input[this.offset+6]<<8)+this.input[this.offset+7];else throw new DecodingException("Invalid length for a TLV nonNegativeInteger");this.offset+=a;return b};TlvDecoder.prototype.readNonNegativeIntegerTlv=function(a){a=this.readTypeAndLength(a);return this.readNonNegativeInteger(a)};TlvDecoder.prototype.readOptionalNonNegativeIntegerTlv=function(a,b){return this.peekType(a,b)?this.readNonNegativeIntegerTlv(a):null};
TlvDecoder.prototype.readBlobTlv=function(a){a=this.readTypeAndLength(a);var b=this.input.slice(this.offset,this.offset+a);this.offset+=a;return b};TlvDecoder.prototype.readOptionalBlobTlv=function(a,b){return this.peekType(a,b)?this.readBlobTlv(a):null};TlvDecoder.prototype.readBooleanTlv=function(a,b){if(this.peekType(a,b)){var c=this.readTypeAndLength(a);this.offset+=c;return!0}return!1};TlvDecoder.prototype.getOffset=function(){return this.offset};
TlvDecoder.prototype.seek=function(a){this.offset=a};var TlvDecoder=require("./tlv-decoder.js").TlvDecoder,TlvStructureDecoder=function TlvStructureDecoder(){this.gotElementEnd=!1;this.offset=0;this.state=TlvStructureDecoder.READ_TYPE;this.headerLength=0;this.useHeaderBuffer=!1;this.headerBuffer=new Buffer(8);this.nBytesToRead=0};exports.TlvStructureDecoder=TlvStructureDecoder;TlvStructureDecoder.READ_TYPE=0;TlvStructureDecoder.READ_TYPE_BYTES=1;TlvStructureDecoder.READ_LENGTH=2;
TlvStructureDecoder.READ_LENGTH_BYTES=3;TlvStructureDecoder.READ_VALUE_BYTES=4;
TlvStructureDecoder.prototype.findElementEnd=function(a){if(this.gotElementEnd)return!0;for(var b=new TlvDecoder(a);;){if(this.offset>=a.length)return!1;if(this.state==TlvStructureDecoder.READ_TYPE){var c=a[this.offset];this.offset+=1;253>c?this.state=TlvStructureDecoder.READ_LENGTH:(this.nBytesToRead=253==c?2:254==c?4:8,this.state=TlvStructureDecoder.READ_TYPE_BYTES)}else if(this.state==TlvStructureDecoder.READ_TYPE_BYTES){c=a.length-this.offset;if(c<this.nBytesToRead)return this.offset+=c,this.nBytesToRead-=
c,!1;this.offset+=this.nBytesToRead;this.state=TlvStructureDecoder.READ_LENGTH}else if(this.state==TlvStructureDecoder.READ_LENGTH)if(c=a[this.offset],this.offset+=1,253>c){this.nBytesToRead=c;if(0==this.nBytesToRead)return this.gotElementEnd=!0;this.state=TlvStructureDecoder.READ_VALUE_BYTES}else this.nBytesToRead=253==c?2:254==c?4:8,this.firstOctet=c,this.state=TlvStructureDecoder.READ_LENGTH_BYTES;else if(this.state==TlvStructureDecoder.READ_LENGTH_BYTES){c=a.length-this.offset;if(!this.useHeaderBuffer&&
c>=this.nBytesToRead)b.seek(this.offset),this.nBytesToRead=b.readExtendedVarNumber(this.firstOctet),this.offset=b.getOffset();else{this.useHeaderBuffer=!0;var d=this.nBytesToRead-this.headerLength;if(d>c){if(this.headerLength+c>this.headerBuffer.length)throw Error("Cannot store more header bytes than the size of headerBuffer");a.slice(this.offset,this.offset+c).copy(this.headerBuffer,this.headerLength);this.offset+=c;this.headerLength+=c;return!1}if(this.headerLength+d>this.headerBuffer.length)throw Error("Cannot store more header bytes than the size of headerBuffer");
a.slice(this.offset,this.offset+d).copy(this.headerBuffer,this.headerLength);this.offset+=d;this.nBytesToRead=(new TlvDecoder(this.headerBuffer)).readExtendedVarNumber(this.firstOctet)}if(0==this.nBytesToRead)return this.gotElementEnd=!0;this.state=TlvStructureDecoder.READ_VALUE_BYTES}else{if(this.state==TlvStructureDecoder.READ_VALUE_BYTES){c=a.length-this.offset;if(c<this.nBytesToRead)return this.offset+=c,this.nBytesToRead-=c,!1;this.offset+=this.nBytesToRead;return this.gotElementEnd=!0}throw Error("findElementEnd: unrecognized state");
}}};TlvStructureDecoder.prototype.getOffset=function(){return this.offset};TlvStructureDecoder.prototype.seek=function(a){this.offset=a};var WireFormat=function(){};exports.WireFormat=WireFormat;WireFormat.prototype.encodeInterest=function(){throw Error("encodeInterest is unimplemented in the base WireFormat class.  You should use a derived class.");};
WireFormat.prototype.decodeInterest=function(){throw Error("decodeInterest is unimplemented in the base WireFormat class.  You should use a derived class.");};WireFormat.prototype.encodeData=function(){throw Error("encodeData is unimplemented in the base WireFormat class.  You should use a derived class.");};WireFormat.prototype.decodeData=function(){throw Error("decodeData is unimplemented in the base WireFormat class.  You should use a derived class.");};
WireFormat.setDefaultWireFormat=function(a){WireFormat.defaultWireFormat=a};WireFormat.getDefaultWireFormat=function(){return WireFormat.defaultWireFormat};
var TlvWireFormat=require("./tlv-wire-format.js").TlvWireFormat,DataUtils=require("./data-utils.js").DataUtils,BinaryXMLStructureDecoder=require("./binary-xml-structure-decoder.js").BinaryXMLStructureDecoder,Tlv=require("./tlv/tlv.js").Tlv,TlvStructureDecoder=require("./tlv/tlv-structure-decoder.js").TlvStructureDecoder,LOG=require("../log.js").Log.LOG,ElementReader=function(a){this.elementListener=a;this.dataParts=[];this.binaryXmlStructureDecoder=new BinaryXMLStructureDecoder;this.tlvStructureDecoder=
new TlvStructureDecoder;this.useTlv=null};exports.ElementReader=ElementReader;
ElementReader.prototype.onReceivedData=function(a){for(;;){if(0==this.dataParts.length){if(0>=a.length)break;this.useTlv=a[0]==Tlv.Interest||a[0]==Tlv.Data||128==a[0]?!0:!1}var b,c;this.useTlv?(this.tlvStructureDecoder.seek(0),b=this.tlvStructureDecoder.findElementEnd(a),c=this.tlvStructureDecoder.getOffset()):(this.binaryXmlStructureDecoder.seek(0),b=this.binaryXmlStructureDecoder.findElementEnd(a),c=this.binaryXmlStructureDecoder.offset);if(b){this.dataParts.push(a.slice(0,c));b=DataUtils.concatArrays(this.dataParts);
this.dataParts=[];try{this.elementListener.onReceivedElement(b)}catch(d){console.log("ElementReader: ignoring exception from onReceivedElement: "+d)}a=a.slice(c,a.length);this.binaryXmlStructureDecoder=new BinaryXMLStructureDecoder;this.tlvStructureDecoder=new TlvStructureDecoder;if(0==a.length)break}else{this.dataParts.push(a);3<LOG&&console.log("Incomplete packet received. Length "+a.length+". Wait for more input.");break}}};
var DataUtils=require("../encoding/data-utils.js").DataUtils,BinaryXMLDecoder=require("../encoding/binary-xml-decoder.js").BinaryXMLDecoder,NDNProtocolDTags=require("./ndn-protoco-id-tags.js").NDNProtocolDTags,Name=require("../name.js").Name,NameEnumeration=function(a,b){this.face=a;this.onComponents=b;this.contentParts=[];var c=this;this.onData=function(a,b){c.processData(b)};this.onTimeout=function(){c.processTimeout()}};exports.NameEnumeration=NameEnumeration;
NameEnumeration.getComponents=function(a,b,c){b=new Name(b);b.add([193,46,69,46,98,101]);c=new NameEnumeration(a,c);a.expressInterest(b,c.onData,c.onTimeout)};
NameEnumeration.prototype.processData=function(a){try{if(NameEnumeration.endsWithSegmentNumber(a.name)){var b=DataUtils.bigEndianToUnsignedInt(a.name.get(a.name.size()-1).getValue()),c=this.contentParts.length;if(b!=c)this.face.expressInterest(a.name.getPrefix(-1).addSegment(c),this.onData,this.onTimeout);else{this.contentParts.push(a.content);if(null!=a.signedInfo&&null!=a.signedInfo.finalBlockID){var d=DataUtils.bigEndianToUnsignedInt(a.signedInfo.finalBlockID);if(b==d){this.onComponents(NameEnumeration.parseComponents(Buffer.concat(this.contentParts)));
return}}this.face.expressInterest(a.name.getPrefix(-1).addSegment(c+1),this.onData,this.onTimeout)}}else this.onComponents(null)}catch(e){console.log("NameEnumeration: ignoring exception: "+e)}};NameEnumeration.prototype.processTimeout=function(){try{this.onComponents(null)}catch(a){console.log("NameEnumeration: ignoring exception: "+a)}};
NameEnumeration.parseComponents=function(a){var b=[];a=new BinaryXMLDecoder(a);for(a.readElementStartDTag(NDNProtocolDTags.Collection);a.peekDTag(NDNProtocolDTags.Link);)a.readElementStartDTag(NDNProtocolDTags.Link),a.readElementStartDTag(NDNProtocolDTags.Name),b.push(new Buffer(a.readBinaryDTagElement(NDNProtocolDTags.Component))),a.readElementClose(),a.readElementClose();a.readElementClose();return b};
NameEnumeration.endsWithSegmentNumber=function(a){return null!=a.components&&1<=a.size()&&1<=a.get(a.size()-1).getValue().length&&0==a.get(a.size()-1).getValue()[0]};
var ElementReader=require("../encoding/element-reader.js").ElementReader,LOG=require("../log.js").Log.LOG,WebSocketTransport=function(){if(!WebSocket)throw Error("WebSocket support is not available on this platform.");this.elementReader=this.connectedPort=this.connectedHost=this.ws=null;this.defaultGetHostAndPort=Face.makeShuffledGetHostAndPort("A.ws.ndn.ucla.edu B.ws.ndn.ucla.edu C.ws.ndn.ucla.edu D.ws.ndn.ucla.edu E.ws.ndn.ucla.edu F.ws.ndn.ucla.edu G.ws.ndn.ucla.edu H.ws.ndn.ucla.edu I.ws.ndn.ucla.edu J.ws.ndn.ucla.edu K.ws.ndn.ucla.edu L.ws.ndn.ucla.edu M.ws.ndn.ucla.edu N.ws.ndn.ucla.edu".split(" "),9696)};
exports.WebSocketTransport=WebSocketTransport;
WebSocketTransport.prototype.connect=function(a,b){null!=this.ws&&delete this.ws;this.ws=new WebSocket("ws://"+a.host+":"+a.port);0<LOG&&console.log("ws connection created.");this.connectedHost=a.host;this.connectedPort=a.port;this.ws.binaryType="arraybuffer";this.elementReader=new ElementReader(a);var c=this;this.ws.onmessage=function(a){a=a.data;if(null==a||void 0==a||""==a)console.log("INVALID ANSWER");else if(a instanceof ArrayBuffer){a=new Buffer(a);3<LOG&&console.log("BINARY RESPONSE IS "+a.toString("hex"));
try{c.elementReader.onReceivedData(a)}catch(b){console.log("NDN.ws.onmessage exception: "+b)}}};this.ws.onopen=function(a){3<LOG&&console.log(a);3<LOG&&console.log("ws.onopen: WebSocket connection opened.");3<LOG&&console.log("ws.onopen: ReadyState: "+this.readyState);b()};this.ws.onerror=function(a){console.log("ws.onerror: ReadyState: "+this.readyState);console.log(a);console.log("ws.onerror: WebSocket error: "+a.data)};this.ws.onclose=function(){console.log("ws.onclose: WebSocket connection closed.");
c.ws=null;a.readyStatus=Face.CLOSED;a.onclose()}};WebSocketTransport.prototype.send=function(a){if(null!=this.ws){var b=new Uint8Array(a.length);b.set(a);this.ws.send(b.buffer);3<LOG&&console.log("ws.send() returned.")}else console.log("WebSocket connection is not established.")};exports.TcpTransport=ndn.WebSocketTransport;Closure=function(){this.ndn_data=null;this.ndn_data_dirty=!1};exports.Closure=Closure;Closure.RESULT_ERR=-1;Closure.RESULT_OK=0;Closure.RESULT_REEXPRESS=1;
Closure.RESULT_INTEREST_CONSUMED=2;Closure.RESULT_VERIFY=3;Closure.RESULT_FETCHKEY=4;Closure.UPCALL_FINAL=0;Closure.UPCALL_INTEREST=1;Closure.UPCALL_CONSUMED_INTEREST=2;Closure.UPCALL_CONTENT=3;Closure.UPCALL_INTEREST_TIMED_OUT=4;Closure.UPCALL_CONTENT_UNVERIFIED=5;Closure.UPCALL_CONTENT_BAD=6;Closure.prototype.upcall=function(){return Closure.RESULT_OK};var UpcallInfo=function(a,b,c,d){this.ndn=this.face=a;this.interest=b;this.matchedComps=c;this.contentObject=this.data=d};
UpcallInfo.prototype.toString=function(){var a="face = "+this.face,a=a+("\nInterest = "+this.interest),a=a+("\nmatchedComps = "+this.matchedComps);return a+="\nData: "+this.data};exports.UpcallInfo=UpcallInfo;var NDNProtocolDTags=require("./util/ndn-protoco-id-tags.js").NDNProtocolDTags,LOG=require("./log.js").Log.LOG,PublisherPublicKeyDigest=function(a){this.PUBLISHER_ID_LEN=64;this.publisherPublicKeyDigest=a};exports.PublisherPublicKeyDigest=PublisherPublicKeyDigest;
PublisherPublicKeyDigest.prototype.from_ndnb=function(a){this.publisherPublicKeyDigest=a.readBinaryDTagElement(this.getElementLabel());4<LOG&&console.log("Publisher public key digest is "+this.publisherPublicKeyDigest);if(null==this.publisherPublicKeyDigest)throw Error("Cannot parse publisher key digest.");this.publisherPublicKeyDigest.length!=this.PUBLISHER_ID_LEN&&0<LOG&&console.log("LENGTH OF PUBLISHER ID IS WRONG! Expected "+this.PUBLISHER_ID_LEN+", got "+this.publisherPublicKeyDigest.length)};
PublisherPublicKeyDigest.prototype.to_ndnb=function(a){if(!this.validate())throw Error("Cannot encode : field values missing.");3<LOG&&console.log("PUBLISHER KEY DIGEST IS"+this.publisherPublicKeyDigest);a.writeDTagElement(this.getElementLabel(),this.publisherPublicKeyDigest)};PublisherPublicKeyDigest.prototype.getElementLabel=function(){return NDNProtocolDTags.PublisherPublicKeyDigest};PublisherPublicKeyDigest.prototype.validate=function(){return null!=this.publisherPublicKeyDigest};
var NDNProtocolDTags=require("./util/ndn-protoco-id-tags.js").NDNProtocolDTags,NDNProtocolDTagsStrings=require("./util/ndn-protoco-id-tags.js").NDNProtocolDTagsStrings,DecodingException=require("./encoding/decoding-exception.js").DecodingException,PublisherType=function(a){this.KEY=NDNProtocolDTags.PublisherPublicKeyDigest;this.CERTIFICATE=NDNProtocolDTags.PublisherCertificateDigest;this.ISSUER_KEY=NDNProtocolDTags.PublisherIssuerKeyDigest;this.ISSUER_CERTIFICATE=NDNProtocolDTags.PublisherIssuerCertificateDigest;
this.Tag=a},PublisherID=function(){this.PUBLISHER_ID_DIGEST_ALGORITHM="SHA-256";this.PUBLISHER_ID_LEN=32;this.publisherType=this.publisherID=null};exports.PublisherID=PublisherID;
PublisherID.prototype.from_ndnb=function(a){var b=PublisherID.peekAndGetNextDTag(a);this.publisherType=new PublisherType(b);if(0>b)throw Error("Invalid publisher ID, got unexpected type");this.publisherID=a.readBinaryDTagElement(b);if(null==this.publisherID)throw new DecodingException(Error("Cannot parse publisher ID of type : "+b+"."));};
PublisherID.prototype.to_ndnb=function(a){if(!this.validate())throw Error("Cannot encode "+this.getClass().getName()+": field values missing.");a.writeDTagElement(this.getElementLabel(),this.publisherID)};
PublisherID.peekAndGetNextDTag=function(a){return a.peekDTag(NDNProtocolDTags.PublisherPublicKeyDigest)?NDNProtocolDTags.PublisherPublicKeyDigest:a.peekDTag(NDNProtocolDTags.PublisherCertificateDigest)?NDNProtocolDTags.PublisherCertificateDigest:a.peekDTag(NDNProtocolDTags.PublisherIssuerKeyDigest)?NDNProtocolDTags.PublisherIssuerKeyDigest:a.peekDTag(NDNProtocolDTags.PublisherIssuerCertificateDigest)?NDNProtocolDTags.PublisherIssuerCertificateDigest:-1};PublisherID.peek=function(a){return 0<=PublisherID.peekAndGetNextDTag(a)};
PublisherID.prototype.getElementLabel=function(){return this.publisherType.Tag};PublisherID.prototype.validate=function(){return null!=id()&&null!=type()};Blob=require("./util/blob.js").Blob;DataUtils=require("./encoding/data-utils.js").DataUtils;BinaryXMLEncoder=require("./encoding/binary-xml-encoder.js").BinaryXMLEncoder;BinaryXMLDecoder=require("./encoding/binary-xml-decoder.js").BinaryXMLDecoder;NDNProtocolDTags=require("./util/ndn-protoco-id-tags.js").NDNProtocolDTags;LOG=require("./log.js").Log.LOG;
Name=function Name(b){if("string"==typeof b)3<LOG&&console.log("Content Name String "+b),this.components=Name.createNameArray(b);else if("object"===typeof b)if(this.components=[],b instanceof Name)this.append(b);else for(var c=0;c<b.length;++c)this.append(b[c]);else null==b?this.components=[]:1<LOG&&console.log("NO CONTENT NAME GIVEN")};exports.Name=Name;
Name.Component=function(a){if("string"===typeof a)this.value=DataUtils.stringToUtf8Array(a);else if("object"===typeof a&&a instanceof Name.Component)this.value=new Buffer(a.value);else if("object"===typeof a&&a instanceof Blob)this.value=new Buffer(a.buf());else if("object"===typeof a&&a instanceof Buffer)this.value=new Buffer(a);else if("object"===typeof a&&"undefined"!==typeof ArrayBuffer&&a instanceof ArrayBuffer)this.value=new Buffer(new ArrayBuffer(a.byteLength)),this.value.set(new Buffer(a));
else if("object"===typeof a)this.value=new Buffer(a);else throw Error("Name.Component constructor: Invalid type");};Name.Component.prototype.getValue=function(){return this.value};Name.Component.prototype.toEscapedString=function(){return Name.toEscapedString(this.value)};Name.Component.prototype.equals=function(a){return DataUtils.arraysEqual(this.value,a.value)};Name.prototype.getName=function(){return this.toUri()};
Name.createNameArray=function(a){a=a.trim();if(0>=a.length)return[];var b=a.indexOf(":");if(0<=b){var c=a.indexOf("/");if(0>c||b<c)a=a.substr(b+1,a.length-b-1).trim()}if("/"==a[0])if(2<=a.length&&"/"==a[1]){b=a.indexOf("/",2);if(0>b)return[];a=a.substr(b+1,a.length-b-1).trim()}else a=a.substr(1,a.length-1).trim();a=a.split("/");for(b=0;b<a.length;++b)c=Name.fromEscapedString(a[b]),null==c?(a.splice(b,1),--b):a[b]=new Name.Component(c);return a};
Name.prototype.from_ndnb=function(a){a.readElementStartDTag(this.getElementLabel());for(this.components=[];a.peekDTag(NDNProtocolDTags.Component);)this.append(a.readBinaryDTagElement(NDNProtocolDTags.Component));a.readElementClose()};
Name.prototype.to_ndnb=function(a){if(null==this.components)throw Error("CANNOT ENCODE EMPTY CONTENT NAME");a.writeElementStartDTag(this.getElementLabel());for(var b=this.size(),c=0;c<b;c++)a.writeDTagElement(NDNProtocolDTags.Component,this.components[c].getValue());a.writeElementClose()};Name.prototype.getElementLabel=function(){return NDNProtocolDTags.Name};
Name.prototype.append=function(a){if("object"==typeof a&&a instanceof Name){a=a==this?this.components.slice(0,this.components.length):a.components;for(var b=0;b<a.length;++b)this.components.push(new Name.Component(a[b]))}else this.components.push(new Name.Component(a));return this};Name.prototype.add=function(a){return this.append(a)};Name.prototype.clear=function(){this.components=[]};
Name.prototype.toUri=function(){if(0==this.size())return"/";for(var a="",b=0;b<this.size();++b)a+="/"+Name.toEscapedString(this.components[b].getValue());return a};Name.prototype.to_uri=function(){return this.toUri()};Name.prototype.appendSegment=function(a){a=DataUtils.nonNegativeIntToBigEndian(a);var b=new Buffer(a.length+1);b[0]=0;a.copy(b,1);this.components.push(new Name.Component(b));return this};Name.prototype.addSegment=function(a){return this.appendSegment(a)};
Name.prototype.getSubName=function(a,b){void 0==b&&(b=this.components.length-a);for(var c=new Name,d=a+b,e=a;e<d&&e<this.components.length;++e)c.components.push(this.components[e]);return c};Name.prototype.getPrefix=function(a){return 0>a?this.getSubName(0,this.components.length+a):this.getSubName(0,a)};Name.prototype.cut=function(a){return new Name(this.components.slice(0,this.components.length-a))};Name.prototype.size=function(){return this.components.length};
Name.prototype.get=function(a){if(0<=a){if(a>=this.components.length)throw Error("Name.get: Index is out of bounds");return new Name.Component(this.components[a])}if(a<-this.components.length)throw Error("Name.get: Index is out of bounds");return new Name.Component(this.components[this.components.length- -a])};Name.prototype.getComponentCount=function(){return this.components.length};Name.prototype.getComponent=function(a){return new Buffer(this.components[a].getValue())};
Name.prototype.indexOfFileName=function(){for(var a=this.size()-1;0<=a;--a){var b=this.components[a].getValue();if(!(0>=b.length)&&!(0==b[0]||192==b[0]||193==b[0]||245<=b[0]&&255>=b[0]))return a}return-1};Name.prototype.equals=function(a){if(this.components.length!=a.components.length)return!1;for(var b=this.components.length-1;0<=b;--b)if(!this.components[b].equals(a.components[b]))return!1;return!0};Name.prototype.equalsName=function(a){return this.equals(a)};
Name.prototype.getContentDigestValue=function(){for(var a=this.size()-1;0<=a;--a){var b=Name.getComponentContentDigestValue(this.components[a]);if(null!=b)return b}return null};
Name.getComponentContentDigestValue=function(a){"object"==typeof a&&a instanceof Name.Component&&(a=a.getValue());return a.length==Name.ContentDigestPrefix.length+32+Name.ContentDigestSuffix.length&&DataUtils.arraysEqual(a.slice(0,Name.ContentDigestPrefix.length),Name.ContentDigestPrefix)&&DataUtils.arraysEqual(a.slice(a.length-Name.ContentDigestSuffix.length,a.length),Name.ContentDigestSuffix)?a.slice(Name.ContentDigestPrefix.length,Name.ContentDigestPrefix.length+32):null};
Name.ContentDigestPrefix=new Buffer([193,46,77,46,71,193,1,170,2,133]);Name.ContentDigestSuffix=new Buffer([0]);Name.toEscapedString=function(a){"object"==typeof a&&a instanceof Name.Component&&(a=a.getValue());for(var b="",c=!1,d=0;d<a.length;++d)if(46!=a[d]){c=!0;break}if(c)for(d=0;d<a.length;++d)c=a[d],b=48<=c&&57>=c||65<=c&&90>=c||97<=c&&122>=c||43==c||45==c||46==c||95==c?b+String.fromCharCode(c):b+("%"+(16>c?"0":"")+c.toString(16).toUpperCase());else{b="...";for(d=0;d<a.length;++d)b+="."}return b};
Name.fromEscapedString=function(a){a=unescape(a.trim());return null==a.match(/[^.]/)?2>=a.length?null:DataUtils.toNumbersFromString(a.substr(3,a.length-3)):DataUtils.toNumbersFromString(a)};Name.prototype.match=function(a){var b=this.components;a=a.components;if(b.length>a.length)return!1;for(var c=0;c<b.length;++c)if(!b[c].equals(a[c]))return!1;return!0};var LOG=require("./log.js").Log.LOG,Key=function(){this.privateKeyPem=this.publicKeyPem=this.publicKeyDigest=this.publicKeyDer=null};
exports.Key=Key;Key.prototype.publicToDER=function(){return this.publicKeyDer};Key.prototype.privateToDER=function(){var a=this.privateKeyPem.split("\n");priKey="";for(var b=1;b<a.length-1;b++)priKey+=a[b];return new Buffer(priKey,"base64")};Key.prototype.publicToPEM=function(){return this.publicKeyPem};Key.prototype.privateToPEM=function(){return this.privateKeyPem};Key.prototype.getKeyID=function(){return this.publicKeyDigest};exports.Key=Key;
Key.prototype.readDerPublicKey=function(a){4<LOG&&console.log("Encode DER public key:\n"+a.toString("hex"));this.publicKeyDer=a;var b=require("crypto").createHash("sha256");b.update(this.publicKeyDer);this.publicKeyDigest=new Buffer(b.digest());a=a.toString("base64");for(var b="-----BEGIN PUBLIC KEY-----\n",c=0;c<a.length;c+=64)b+=a.substr(c,64)+"\n";this.publicKeyPem=b+"-----END PUBLIC KEY-----";4<LOG&&console.log("Convert public key to PEM format:\n"+this.publicKeyPem)};
Key.prototype.fromPemString=function(a,b){if(null==a&&null==b)throw Error("Cannot create Key object if both public and private PEM string is empty.");if(null!=a){this.publicKeyPem=a;4<LOG&&console.log("Key.publicKeyPem: \n"+this.publicKeyPem);var c=a.split("\n");a="";for(var d=1;d<c.length-1;d++)a+=c[d];this.publicKeyDer=new Buffer(a,"base64");4<LOG&&console.log("Key.publicKeyDer: \n"+this.publicKeyDer.toString("hex"));c=require("crypto").createHash("sha256");c.update(this.publicKeyDer);this.publicKeyDigest=
new Buffer(c.digest());4<LOG&&console.log("Key.publicKeyDigest: \n"+this.publicKeyDigest.toString("hex"))}null!=b&&(this.privateKeyPem=b,4<LOG&&console.log("Key.privateKeyPem: \n"+this.privateKeyPem))};Key.prototype.fromPem=Key.prototype.fromPemString;Key.createFromPEM=function(a){var b=new Key;b.fromPemString(a.pub,a.pri);return b};
var Name=require("./name.js").Name,NDNProtocolDTags=require("./util/ndn-protoco-id-tags.js").NDNProtocolDTags,PublisherID=require("./publisher-id.js").PublisherID,LOG=require("./log.js").Log.LOG,KeyLocatorType={KEYNAME:1,KEY_LOCATOR_DIGEST:2,KEY:3,CERTIFICATE:4};exports.KeyLocatorType=KeyLocatorType;
var KeyLocator=function KeyLocator(b,c){"object"===typeof b&&b instanceof KeyLocator?(this.type=b.type,this.keyName=new KeyName,null!=b.keyName&&(this.keyName.contentName=null==b.keyName.contentName?null:new Name(b.keyName.contentName),this.keyName.publisherID=b.keyName.publisherID),this.keyData=null==b.keyData?null:new Buffer(b.keyData),this.publicKey=null==b.publicKey?null:new Buffer(b.publicKey),this.certificate=null==b.certificate?null:new Buffer(b.certificate)):(this.type=c,this.keyName=new KeyName,
c==KeyLocatorType.KEYNAME?this.keyName=b:c==KeyLocatorType.KEY_LOCATOR_DIGEST?this.keyData=new Buffer(b):c==KeyLocatorType.KEY?this.publicKey=this.keyData=new Buffer(b):c==KeyLocatorType.CERTIFICATE&&(this.certificate=this.keyData=new Buffer(b)))};exports.KeyLocator=KeyLocator;KeyLocator.prototype.getType=function(){return this.type};KeyLocator.prototype.getKeyName=function(){null==this.keyName&&(this.keyName=new KeyName);null==this.keyName.contentName&&(this.keyName.contentName=new Name);return this.keyName.contentName};
KeyLocator.prototype.getKeyData=function(){return this.type==KeyLocatorType.KEY?this.publicKey:this.type==KeyLocatorType.CERTIFICATE?this.certificate:this.keyData};KeyLocator.prototype.setType=function(a){this.type=a};KeyLocator.prototype.setKeyName=function(a){null==this.keyName&&(this.keyName=new KeyName);this.keyName.contentName="object"===typeof a&&a instanceof Name?new Name(a):new Name};
KeyLocator.prototype.setKeyData=function(a){null!=a&&(a=new Buffer(a));this.certificate=this.publicKey=this.keyData=a};KeyLocator.prototype.clear=function(){this.certificate=this.publicKey=this.keyData=this.keyName=this.type=null};
KeyLocator.prototype.from_ndnb=function(a){a.readElementStartDTag(this.getElementLabel());if(a.peekDTag(NDNProtocolDTags.Key)){try{this.publicKey=a.readBinaryDTagElement(NDNProtocolDTags.Key),this.type=KeyLocatorType.KEY,4<LOG&&console.log("PUBLIC KEY FOUND: "+this.publicKey)}catch(b){throw Error("Cannot parse key: ",b);}if(null==this.publicKey)throw Error("Cannot parse key: ");}else if(a.peekDTag(NDNProtocolDTags.Certificate)){try{this.certificate=a.readBinaryDTagElement(NDNProtocolDTags.Certificate),
this.type=KeyLocatorType.CERTIFICATE,4<LOG&&console.log("CERTIFICATE FOUND: "+this.certificate)}catch(c){throw Error("Cannot decode certificate: "+c);}if(null==this.certificate)throw Error("Cannot parse certificate! ");}else this.type=KeyLocatorType.KEYNAME,this.keyName=new KeyName,this.keyName.from_ndnb(a);a.readElementClose()};
KeyLocator.prototype.to_ndnb=function(a){4<LOG&&console.log("type is is "+this.type);if(this.type!=KeyLocatorType.KEY_LOCATOR_DIGEST){a.writeElementStartDTag(this.getElementLabel());if(this.type==KeyLocatorType.KEY)5<LOG&&console.log("About to encode a public key"+this.publicKey),a.writeDTagElement(NDNProtocolDTags.Key,this.publicKey);else if(this.type==KeyLocatorType.CERTIFICATE)try{a.writeDTagElement(NDNProtocolDTags.Certificate,this.certificate)}catch(b){throw Error("CertificateEncodingException attempting to write key locator: "+
b);}else this.type==KeyLocatorType.KEYNAME&&this.keyName.to_ndnb(a);a.writeElementClose()}};KeyLocator.prototype.getElementLabel=function(){return NDNProtocolDTags.KeyLocator};var KeyName=function(){this.contentName=new Name;this.publisherID=this.publisherID};exports.KeyName=KeyName;
KeyName.prototype.from_ndnb=function(a){a.readElementStartDTag(this.getElementLabel());this.contentName=new Name;this.contentName.from_ndnb(a);4<LOG&&console.log("KEY NAME FOUND: ");PublisherID.peek(a)&&(this.publisherID=new PublisherID,this.publisherID.from_ndnb(a));a.readElementClose()};KeyName.prototype.to_ndnb=function(a){a.writeElementStartDTag(this.getElementLabel());this.contentName.to_ndnb(a);null!=this.publisherID&&this.publisherID.to_ndnb(a);a.writeElementClose()};
KeyName.prototype.getElementLabel=function(){return NDNProtocolDTags.KeyName};
var Key=require("../key.js").Key,KeyManager=function(){this.certificate="MIIBmzCCAQQCCQC32FyQa61S7jANBgkqhkiG9w0BAQUFADASMRAwDgYDVQQDEwdheGVsY2R2MB4XDTEyMDQyODIzNDQzN1oXDTEyMDUyODIzNDQzN1owEjEQMA4GA1UEAxMHYXhlbGNkdjCBnzANBgkqhkiG9w0BAQEFAAOBjQAwgYkCgYEA4X0wp9goqxuECxdULcr2IHr9Ih4Iaypg0Wy39URIup8/CLzQmdsh3RYqd55hqonu5VTTpH3iMLx6xZDVJAZ8OJi7pvXcQ2C4Re2kjL2c8SanI0RfDhlS1zJadfr1VhRPmpivcYawJ4aFuOLAi+qHFxtN7lhcGCgpW1OV60oXd58CAwEAATANBgkqhkiG9w0BAQUFAAOBgQDLOrA1fXzSrpftUB5Ro6DigX1Bjkf7F5Bkd69hSVp+jYeJFBBlsILQAfSxUZPQtD+2Yc3iCmSYNyxqu9PcufDRJlnvB7PG29+L3y9lR37tetzUV9eTscJ7rdp8Wt6AzpW32IJ/54yKNfP7S6ZIoIG+LP6EIxq6s8K1MXRt8uBJKw==";this.publicKey=
"-----BEGIN PUBLIC KEY-----\nMIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDhfTCn2CirG4QLF1QtyvYgev0i\nHghrKmDRbLf1REi6nz8IvNCZ2yHdFip3nmGqie7lVNOkfeIwvHrFkNUkBnw4mLum\n9dxDYLhF7aSMvZzxJqcjRF8OGVLXMlp1+vVWFE+amK9xhrAnhoW44sCL6ocXG03u\nWFwYKClbU5XrShd3nwIDAQAB\n-----END PUBLIC KEY-----";this.privateKey="-----BEGIN RSA PRIVATE KEY-----\nMIICXQIBAAKBgQDhfTCn2CirG4QLF1QtyvYgev0iHghrKmDRbLf1REi6nz8IvNCZ\n2yHdFip3nmGqie7lVNOkfeIwvHrFkNUkBnw4mLum9dxDYLhF7aSMvZzxJqcjRF8O\nGVLXMlp1+vVWFE+amK9xhrAnhoW44sCL6ocXG03uWFwYKClbU5XrShd3nwIDAQAB\nAoGAGkv6T6jC3WmhFZYL6CdCWvlc6gysmKrhjarrLTxgavtFY6R5g2ft5BXAsCCV\nbUkWxkIFSKqxpVNl0gKZCNGEzPDN6mHJOQI/h0rlxNIHAuGfoAbCzALnqmyZivhJ\nAPGijAyKuU9tczsst5+Kpn+bn7ehzHQuj7iwJonS5WbojqECQQD851K8TpW2GrRi\nzNgG4dx6orZxAaon/Jnl8lS7soXhllQty7qG+oDfzznmdMsiznCqEABzHUUKOVGE\n9RWPN3aRAkEA5D/w9N55d0ibnChFJlc8cUAoaqH+w+U3oQP2Lb6AZHJpLptN4y4b\n/uf5d4wYU5/i/gC7SSBH3wFhh9bjRLUDLwJAVOx8vN0Kqt7myfKNbCo19jxjVSlA\n8TKCn1Oznl/BU1I+rC4oUaEW25DjmX6IpAR8kq7S59ThVSCQPjxqY/A08QJBAIRa\nF2zGPITQk3r/VumemCvLWiRK/yG0noc9dtibqHOWbCtcXtOm/xDWjq+lis2i3ssO\nvYrvrv0/HcDY+Dv1An0CQQCLJtMsfSg4kvG/FRY5UMhtMuwo8ovYcMXt4Xv/LWaM\nhndD67b2UGawQCRqr5ghRTABWdDD/HuuMBjrkPsX0861\n-----END RSA PRIVATE KEY-----";
this.key=null};KeyManager.prototype.getKey=function(){null===this.key&&(this.key=new Key,this.key.fromPemString(this.publicKey,this.privateKey));return this.key};var globalKeyManager=globalKeyManager||new KeyManager;exports.globalKeyManager=globalKeyManager;
var BinaryXMLEncoder=require("./encoding/binary-xml-encoder.js").BinaryXMLEncoder,BinaryXMLDecoder=require("./encoding/binary-xml-decoder.js").BinaryXMLDecoder,Blob=require("./util/blob.js").Blob,NDNProtocolDTags=require("./util/ndn-protoco-id-tags.js").NDNProtocolDTags,KeyLocator=require("./key-locator.js").KeyLocator,KeyLocatorType=require("./key-locator.js").KeyLocatorType,Name=require("./name.js").Name,PublisherPublicKeyDigest=require("./publisher-public-key-digest.js").PublisherPublicKeyDigest,
NDNTime=require("./util/ndn-time.js").NDNTime,globalKeyManager=require("./security/key-manager.js").globalKeyManager,LOG=require("./log.js").Log.LOG,ContentType={BLOB:0,DATA:0,LINK:1,KEY:2,ENCR:3,GONE:4,NACK:5};exports.ContentType=ContentType;
var MetaInfo=function MetaInfo(b,c,d,e,f,g,h){"object"===typeof b&&b instanceof MetaInfo?(this.publisher=b.publisher,this.timestamp=b.timestamp,this.type=b.type,this.locator=null==b.locator?new KeyLocator:new KeyLocator(b.locator),this.freshnessSeconds=b.freshnessSeconds,this.finalBlockID=b.finalBlockID):(this.publisher=b,this.timestamp=c,this.type=d,this.locator=null==e?new KeyLocator:new KeyLocator(e),this.freshnessSeconds=f,this.finalBlockID=g,h||this.setFields())};exports.MetaInfo=MetaInfo;
MetaInfo.prototype.getType=function(){return this.type};MetaInfo.prototype.getFreshnessPeriod=function(){return null==this.freshnessSeconds||0>this.freshnessSeconds?null:1E3*this.freshnessSeconds};MetaInfo.prototype.getFinalBlockID=function(){return this.finalBlockID};MetaInfo.prototype.setType=function(a){this.type=null==a||0>a?ContentType.BLOB:a};MetaInfo.prototype.setFreshnessPeriod=function(a){this.freshnessSeconds=null==a||0>a?null:a/1E3};
MetaInfo.prototype.setFinalBlockID=function(a){this.finalBlockID=null==a?null:"object"===typeof a&&a instanceof Blob?a.buf():"object"===typeof a&&a instanceof Name.Component?a.getValue():new Buffer(a)};
MetaInfo.prototype.setFields=function(){var a=globalKeyManager.getKey();this.publisher=new PublisherPublicKeyDigest(a.getKeyID());var b=(new Date).getTime();this.timestamp=new NDNTime(b);4<LOG&&console.log("TIME msec is");4<LOG&&console.log(this.timestamp.msec);this.type=ContentType.BLOB;4<LOG&&console.log("PUBLIC KEY TO WRITE TO DATA PACKET IS ");4<LOG&&console.log(a.publicToDER().toString("hex"));this.locator=new KeyLocator(a.getKeyID(),KeyLocatorType.KEY_LOCATOR_DIGEST)};
MetaInfo.prototype.from_ndnb=function(a){a.readElementStartDTag(this.getElementLabel());a.peekDTag(NDNProtocolDTags.PublisherPublicKeyDigest)&&(4<LOG&&console.log("DECODING PUBLISHER KEY"),this.publisher=new PublisherPublicKeyDigest,this.publisher.from_ndnb(a));a.peekDTag(NDNProtocolDTags.Timestamp)&&(4<LOG&&console.log("DECODING TIMESTAMP"),this.timestamp=a.readDateTimeDTagElement(NDNProtocolDTags.Timestamp));if(a.peekDTag(NDNProtocolDTags.Type)){var b=a.readBinaryDTagElement(NDNProtocolDTags.Type);
4<LOG&&console.log("Binary Type of of Signed Info is "+b);this.type=b;if(null==this.type)throw Error("Cannot parse signedInfo type: bytes.");}else this.type=ContentType.DATA;a.peekDTag(NDNProtocolDTags.FreshnessSeconds)&&(this.freshnessSeconds=a.readIntegerDTagElement(NDNProtocolDTags.FreshnessSeconds),4<LOG&&console.log("FRESHNESS IN SECONDS IS "+this.freshnessSeconds));a.peekDTag(NDNProtocolDTags.FinalBlockID)&&(4<LOG&&console.log("DECODING FINAL BLOCKID"),this.finalBlockID=a.readBinaryDTagElement(NDNProtocolDTags.FinalBlockID));
a.peekDTag(NDNProtocolDTags.KeyLocator)&&(4<LOG&&console.log("DECODING KEY LOCATOR"),this.locator=new KeyLocator,this.locator.from_ndnb(a));a.readElementClose()};
MetaInfo.prototype.to_ndnb=function(a,b){if(!this.validate())throw Error("Cannot encode : field values missing.");a.writeElementStartDTag(this.getElementLabel());null!=this.publisher?(3<LOG&&console.log("ENCODING PUBLISHER KEY"+this.publisher.publisherPublicKeyDigest),this.publisher.to_ndnb(a)):null!=b&&(b.getType()==KeyLocatorType.KEY_LOCATOR_DIGEST&&null!=b.getKeyData()&&0<b.getKeyData().length)&&a.writeDTagElement(NDNProtocolDTags.PublisherPublicKeyDigest,b.getKeyData());null!=this.timestamp&&
a.writeDateTimeDTagElement(NDNProtocolDTags.Timestamp,this.timestamp);null!=this.type&&0!=this.type&&a.writeDTagElement(NDNProtocolDTags.type,this.type);null!=this.freshnessSeconds&&a.writeDTagElement(NDNProtocolDTags.FreshnessSeconds,this.freshnessSeconds);null!=this.finalBlockID&&a.writeDTagElement(NDNProtocolDTags.FinalBlockID,this.finalBlockID);null!=b&&b.to_ndnb(a);a.writeElementClose()};MetaInfo.prototype.valueToType=function(){return null};MetaInfo.prototype.getElementLabel=function(){return NDNProtocolDTags.SignedInfo};
MetaInfo.prototype.validate=function(){return null==this.timestamp?!1:!0};var SignedInfo=function(a,b,c,d,e,f){MetaInfo.call(this,a,b,c,d,e,f)};SignedInfo.prototype=new MetaInfo(null,null,null,null,null,null,!0);exports.SignedInfo=SignedInfo;
var Blob=require("./util/blob.js").Blob,BinaryXMLEncoder=require("./encoding/binary-xml-encoder.js").BinaryXMLEncoder,BinaryXMLDecoder=require("./encoding/binary-xml-decoder.js").BinaryXMLDecoder,NDNProtocolDTags=require("./util/ndn-protoco-id-tags.js").NDNProtocolDTags,KeyLocator=require("./key-locator.js").KeyLocator,LOG=require("./log.js").Log.LOG,Signature=function Signature(b,c,d){"object"===typeof b&&b instanceof Signature?(this.keyLocator=new KeyLocator(b.keyLocator),this.signature=b.signature,
this.witness=b.witness,this.digestAlgorithm=b.digestAlgorithm):(this.keyLocator=new KeyLocator,this.signature=c,this.witness=b,this.digestAlgorithm=d)};exports.Signature=Signature;Signature.prototype.clone=function(){return new Signature(this)};Signature.prototype.getKeyLocator=function(){return this.keyLocator};Signature.prototype.getSignature=function(){return this.signature};
Signature.prototype.setKeyLocator=function(a){this.keyLocator="object"===typeof a&&a instanceof KeyLocator?new KeyLocator(a):new KeyLocator};Signature.prototype.setSignature=function(a){this.signature=null==a?null:"object"===typeof a&&a instanceof Blob?new Buffer(a.buf()):new Buffer(a)};
Signature.prototype.from_ndnb=function(a){a.readElementStartDTag(this.getElementLabel());4<LOG&&console.log("STARTED DECODING SIGNATURE");a.peekDTag(NDNProtocolDTags.DigestAlgorithm)&&(4<LOG&&console.log("DIGIEST ALGORITHM FOUND"),this.digestAlgorithm=a.readUTF8DTagElement(NDNProtocolDTags.DigestAlgorithm));a.peekDTag(NDNProtocolDTags.Witness)&&(4<LOG&&console.log("WITNESS FOUND"),this.witness=a.readBinaryDTagElement(NDNProtocolDTags.Witness));4<LOG&&console.log("SIGNATURE FOUND");this.signature=
a.readBinaryDTagElement(NDNProtocolDTags.SignatureBits);a.readElementClose()};
Signature.prototype.to_ndnb=function(a){if(!this.validate())throw Error("Cannot encode: field values missing.");a.writeElementStartDTag(this.getElementLabel());null!=this.digestAlgorithm&&!this.digestAlgorithm.equals(NDNDigestHelper.DEFAULT_DIGEST_ALGORITHM)&&a.writeDTagElement(NDNProtocolDTags.DigestAlgorithm,OIDLookup.getDigestOID(this.DigestAlgorithm));null!=this.witness&&a.writeDTagElement(NDNProtocolDTags.Witness,this.witness);a.writeDTagElement(NDNProtocolDTags.SignatureBits,this.signature);
a.writeElementClose()};Signature.prototype.getElementLabel=function(){return NDNProtocolDTags.Signature};Signature.prototype.validate=function(){return null!=this.signature};
var Blob=require("./util/blob.js").Blob,SignedBlob=require("./util/signed-blob.js").SignedBlob,BinaryXMLEncoder=require("./encoding/binary-xml-encoder.js").BinaryXMLEncoder,NDNProtocolDTags=require("./util/ndn-protoco-id-tags.js").NDNProtocolDTags,DataUtils=require("./encoding/data-utils.js").DataUtils,Name=require("./name.js").Name,Signature=require("./signature.js").Signature,MetaInfo=require("./meta-info.js").MetaInfo,KeyLocator=require("./key-locator.js").KeyLocator,globalKeyManager=require("./security/key-manager.js").globalKeyManager,
WireFormat=require("./encoding/wire-format.js").WireFormat,Data=function(a,b,c){this.name="string"===typeof a?new Name(a):"object"===typeof a&&a instanceof Name?new Name(a):new Name;this.signedInfo="object"===typeof b&&b instanceof MetaInfo?new MetaInfo(b):new MetaInfo;this.content="string"===typeof c?DataUtils.toNumbersFromString(c):"object"===typeof c&&c instanceof Blob?c.buf():c;this.signature=new Signature;this.wireEncoding=SignedBlob()};exports.Data=Data;Data.prototype.getName=function(){return this.name};
Data.prototype.getMetaInfo=function(){return this.signedInfo};Data.prototype.getSignature=function(){return this.signature};Data.prototype.getContent=function(){return this.content};Data.prototype.setName=function(a){this.name="object"===typeof a&&a instanceof Name?new Name(a):new Name;this.wireEncoding=SignedBlob();return this};Data.prototype.setMetaInfo=function(a){this.signedInfo="object"===typeof a&&a instanceof MetaInfo?new MetaInfo(a):new MetaInfo;this.wireEncoding=SignedBlob();return this};
Data.prototype.setSignature=function(a){this.signature="object"===typeof a&&a instanceof Signature?a.clone():new Signature;this.wireEncoding=SignedBlob();return this};Data.prototype.setContent=function(a){this.content="string"===typeof a?DataUtils.toNumbersFromString(a):"object"===typeof a&&a instanceof Blob?a.buf():new Buffer(a);this.wireEncoding=SignedBlob();return this};
Data.prototype.sign=function(a){a=a||WireFormat.getDefaultWireFormat();(null==this.getSignatureOrMetaInfoKeyLocator()||null==this.getSignatureOrMetaInfoKeyLocator().getType())&&this.getMetaInfo().setFields();if(null==this.wireEncoding||this.wireEncoding.isNull())this.getSignature().setSignature(new Buffer(128)),this.wireEncode(a);a=require("crypto").createSign("RSA-SHA256");a.update(this.wireEncoding.signedBuf());a=new Buffer(a.sign(globalKeyManager.privateKey));this.signature.signature=a};
Data.prototype.verify=function(a){if(null==a||null==a.publicKeyPem)throw Error("Cannot verify Data without a public key.");(null==this.wireEncoding||this.wireEncoding.isNull())&&this.wireEncode();var b=require("crypto").createVerify("RSA-SHA256");b.update(this.wireEncoding.signedBuf());return b.verify(a.publicKeyPem,this.signature.signature)};Data.prototype.getElementLabel=function(){return NDNProtocolDTags.Data};
Data.prototype.wireEncode=function(a){a=a||WireFormat.getDefaultWireFormat();a=a.encodeData(this);return this.wireEncoding=new SignedBlob(a.encoding,a.signedPortionBeginOffset,a.signedPortionEndOffset)};Data.prototype.wireDecode=function(a,b){b=b||WireFormat.getDefaultWireFormat();var c="object"===typeof a&&a instanceof Blob?a.buf():a,c=b.decodeData(this,c);this.wireEncoding=new SignedBlob(new Blob(a,!0),c.signedPortionBeginOffset,c.signedPortionEndOffset)};
Data.prototype.getSignatureOrMetaInfoKeyLocator=function(){return null!=this.signature&&null!=this.signature.getKeyLocator()&&null!=this.signature.getKeyLocator().getType()&&0<=this.signature.getKeyLocator().getType()?this.signature.getKeyLocator():null!=this.signedInfo&&null!=this.signedInfo.locator&&null!=this.signedInfo.locator.type&&0<=this.signedInfo.locator.type?this.signedInfo.locator:null!=this.signature&&null!=this.signature.getKeyLocator()?this.signature.getKeyLocator():new KeyLocator};
var BinaryXmlWireFormat=require("./encoding/binary-xml-wire-format.js").BinaryXmlWireFormat;Data.prototype.from_ndnb=function(a){BinaryXmlWireFormat.decodeData(this,a)};Data.prototype.to_ndnb=function(a){BinaryXmlWireFormat.encodeData(this,a)};Data.prototype.encode=function(a){a=a||BinaryXmlWireFormat.get();return a.encodeData(this).buf()};Data.prototype.decode=function(a,b){b=b||BinaryXmlWireFormat.get();b.decodeData(this,a)};var ContentObject=function(a,b,c){Data.call(this,a,b,c)};
ContentObject.prototype=new Data;exports.ContentObject=ContentObject;
var Name=require("./name.js").Name,NDNProtocolDTags=require("./util/ndn-protoco-id-tags.js").NDNProtocolDTags,BinaryXMLEncoder=require("./encoding/binary-xml-encoder.js").BinaryXMLEncoder,BinaryXMLDecoder=require("./encoding/binary-xml-decoder.js").BinaryXMLDecoder,DataUtils=require("./encoding/data-utils.js").DataUtils,Exclude=function Exclude(b){this.values=[];if("object"===typeof b&&b instanceof Exclude)this.values=b.values.slice(0);else if(b)for(var c=0;c<b.length;++c)b[c]==Exclude.ANY?this.appendAny():
this.appendComponent(b[c])};exports.Exclude=Exclude;Exclude.ANY="*";Exclude.prototype.size=function(){return this.values.length};Exclude.prototype.get=function(a){return this.values[a]};Exclude.prototype.appendAny=function(){this.values.push(Exclude.ANY);return this};Exclude.prototype.appendComponent=function(a){this.values.push(new Name.Component(a));return this};Exclude.prototype.clear=function(){this.values=[]};
Exclude.prototype.from_ndnb=function(a){for(a.readElementStartDTag(NDNProtocolDTags.Exclude);;)if(a.peekDTag(NDNProtocolDTags.Component))this.appendComponent(a.readBinaryDTagElement(NDNProtocolDTags.Component));else if(a.peekDTag(NDNProtocolDTags.Any))a.readElementStartDTag(NDNProtocolDTags.Any),a.readElementClose(),this.appendAny();else if(a.peekDTag(NDNProtocolDTags.Bloom))a.readBinaryDTagElement(NDNProtocolDTags.Bloom),this.appendAny();else break;a.readElementClose()};
Exclude.prototype.to_ndnb=function(a){if(!(null==this.values||0==this.values.length)){a.writeElementStartDTag(NDNProtocolDTags.Exclude);for(var b=0;b<this.values.length;++b)this.values[b]==Exclude.ANY?(a.writeElementStartDTag(NDNProtocolDTags.Any),a.writeElementClose()):a.writeDTagElement(NDNProtocolDTags.Component,this.values[b].getValue());a.writeElementClose()}};
Exclude.prototype.toUri=function(){if(null==this.values||0==this.values.length)return"";for(var a="",b=0;b<this.values.length;++b)0<b&&(a+=","),a=this.values[b]==Exclude.ANY?a+"*":a+Name.toEscapedString(this.values[b].getValue());return a};
Exclude.prototype.matches=function(a){"object"==typeof a&&a instanceof Name.Component&&(a=a.getValue());for(var b=0;b<this.values.length;++b)if(this.values[b]==Exclude.ANY){var c=null;0<b&&(c=this.values[b-1]);var d,e=null;for(d=b+1;d<this.values.length;++d)if(this.values[d]!=Exclude.ANY){e=this.values[d];break}if(null!=e){if(null!=c){if(0<Exclude.compareComponents(a,c)&&0>Exclude.compareComponents(a,e))return!0}else if(0>Exclude.compareComponents(a,e))return!0;b=d-1}else if(null!=c){if(0<Exclude.compareComponents(a,
c))return!0}else return!0}else if(DataUtils.arraysEqual(a,this.values[b].getValue()))return!0;return!1};Exclude.compareComponents=function(a,b){"object"==typeof a&&a instanceof Name.Component&&(a=a.getValue());"object"==typeof b&&b instanceof Name.Component&&(b=b.getValue());if(a.length<b.length)return-1;if(a.length>b.length)return 1;for(var c=0;c<a.length;++c){if(a[c]<b[c])return-1;if(a[c]>b[c])return 1}return 0};
var Blob=require("./util/blob.js").Blob,Name=require("./name.js").Name,Exclude=require("./exclude.js").Exclude,PublisherPublicKeyDigest=require("./publisher-public-key-digest.js").PublisherPublicKeyDigest,KeyLocator=require("./key-locator.js").KeyLocator,WireFormat=require("./encoding/wire-format.js").WireFormat,Interest=function Interest(b,c,d,e,f,g,h,j,k,m){"object"===typeof b&&b instanceof Interest?(b.name&&(this.name=new Name(b.name)),this.maxSuffixComponents=b.maxSuffixComponents,this.minSuffixComponents=
b.minSuffixComponents,this.publisherPublicKeyDigest=b.publisherPublicKeyDigest,this.keyLocator=new KeyLocator(b.keyLocator),this.exclude=new Exclude(b.exclude),this.childSelector=b.childSelector,this.answerOriginKind=b.answerOriginKind,this.scope=b.scope,this.interestLifetime=b.interestLifetime,b.nonce&&(this.nonce=new Buffer(b.nonce))):(this.name="object"===typeof b&&b instanceof Name?new Name(b):new Name,this.maxSuffixComponents=d,this.minSuffixComponents=c,this.publisherPublicKeyDigest=e,this.keyLocator=
new KeyLocator,this.exclude="object"===typeof f&&f instanceof Exclude?new Exclude(f):new Exclude,this.childSelector=g,this.answerOriginKind=h,this.scope=j,this.interestLifetime=k,m&&(this.nonce=new Buffer(m)))};exports.Interest=Interest;Interest.RECURSIVE_POSTFIX="*";Interest.CHILD_SELECTOR_LEFT=0;Interest.CHILD_SELECTOR_RIGHT=1;Interest.ANSWER_NO_CONTENT_STORE=0;Interest.ANSWER_CONTENT_STORE=1;Interest.ANSWER_GENERATED=2;Interest.ANSWER_STALE=4;Interest.MARK_STALE=16;
Interest.DEFAULT_ANSWER_ORIGIN_KIND=Interest.ANSWER_CONTENT_STORE|Interest.ANSWER_GENERATED;Interest.prototype.matchesName=function(a){return!this.name.match(a)||null!=this.minSuffixComponents&&!(a.size()+1-this.name.size()>=this.minSuffixComponents)||null!=this.maxSuffixComponents&&!(a.size()+1-this.name.size()<=this.maxSuffixComponents)||null!=this.exclude&&a.size()>this.name.size()&&this.exclude.matches(a.components[this.name.size()])?!1:!0};Interest.prototype.matches_name=function(a){return this.matchesName(a)};
Interest.prototype.clone=function(){return new Interest(this.name,this.minSuffixComponents,this.maxSuffixComponents,this.publisherPublicKeyDigest,this.exclude,this.childSelector,this.answerOriginKind,this.scope,this.interestLifetime,this.nonce)};Interest.prototype.getName=function(){return this.name};Interest.prototype.getMinSuffixComponents=function(){return this.minSuffixComponents};Interest.prototype.getMaxSuffixComponents=function(){return this.maxSuffixComponents};
Interest.prototype.getKeyLocator=function(){return this.keyLocator};Interest.prototype.getExclude=function(){return this.exclude};Interest.prototype.getChildSelector=function(){return this.childSelector};Interest.prototype.getAnswerOriginKind=function(){return this.answerOriginKind};Interest.prototype.getMustBeFresh=function(){return null==this.answerOriginKind||0>this.answerOriginKind?!0:0==(this.answerOriginKind&Interest.ANSWER_STALE)};Interest.prototype.getNonce=function(){return this.nonce};
Interest.prototype.getScope=function(){return this.scope};Interest.prototype.getInterestLifetimeMilliseconds=function(){return this.interestLifetime};Interest.prototype.setName=function(a){this.nonce=null;this.name="object"===typeof a&&a instanceof Interest?new Name(a):new Name};Interest.prototype.setMinSuffixComponents=function(a){this.nonce=null;this.minSuffixComponents=a};Interest.prototype.setMaxSuffixComponents=function(a){this.nonce=null;this.maxSuffixComponents=a};
Interest.prototype.setExclude=function(a){this.nonce=null;this.exclude="object"===typeof a&&a instanceof Exclude?new Exclude(a):new Exclude};Interest.prototype.setChildSelector=function(a){this.nonce=null;this.childSelector=a};Interest.prototype.setAnswerOriginKind=function(a){this.nonce=null;this.answerOriginKind=a};
Interest.prototype.setMustBeFresh=function(a){this.nonce=null;null==this.answerOriginKind||0>this.answerOriginKind?a||(this.answerOriginKind=Interest.ANSWER_STALE):this.answerOriginKind=a?this.answerOriginKind&~Interest.ANSWER_STALE:this.answerOriginKind|Interest.ANSWER_STALE};Interest.prototype.setScope=function(a){this.nonce=null;this.scope=a};Interest.prototype.setInterestLifetimeMilliseconds=function(a){this.nonce=null;this.interestLifetime=a};
Interest.prototype.setNonce=function(a){this.nonce=a?new Buffer(a):null};
Interest.prototype.toUri=function(){var a="";null!=this.minSuffixComponents&&(a+="&ndn.MinSuffixComponents="+this.minSuffixComponents);null!=this.maxSuffixComponents&&(a+="&ndn.MaxSuffixComponents="+this.maxSuffixComponents);null!=this.childSelector&&(a+="&ndn.ChildSelector="+this.childSelector);null!=this.answerOriginKind&&(a+="&ndn.AnswerOriginKind="+this.answerOriginKind);null!=this.scope&&(a+="&ndn.Scope="+this.scope);null!=this.interestLifetime&&(a+="&ndn.InterestLifetime="+this.interestLifetime);
null!=this.publisherPublicKeyDigest&&(a+="&ndn.PublisherPublicKeyDigest="+Name.toEscapedString(this.publisherPublicKeyDigest.publisherPublicKeyDigest));null!=this.nonce&&(a+="&ndn.Nonce="+Name.toEscapedString(this.nonce));null!=this.exclude&&0<this.exclude.size()&&(a+="&ndn.Exclude="+this.exclude.toUri());var b=this.name.toUri();""!=a&&(b+="?"+a.substr(1));return b};Interest.prototype.wireEncode=function(a){a=a||WireFormat.getDefaultWireFormat();return a.encodeInterest(this)};
Interest.prototype.wireDecode=function(a,b){b=b||WireFormat.getDefaultWireFormat();var c="object"===typeof a&&a instanceof Blob?a.buf():a;b.decodeInterest(this,c)};BinaryXmlWireFormat=require("./encoding/binary-xml-wire-format.js").BinaryXmlWireFormat;Interest.prototype.from_ndnb=function(a){BinaryXmlWireFormat.decodeInterest(this,a)};Interest.prototype.to_ndnb=function(a){BinaryXmlWireFormat.encodeInterest(this,a)};Interest.prototype.encode=function(){return this.wireEncode(BinaryXmlWireFormat.get()).buf()};
Interest.prototype.decode=function(a){this.wireDecode(a,BinaryXmlWireFormat.get())};var NDNProtocolDTags=require("./util/ndn-protoco-id-tags.js").NDNProtocolDTags,PublisherPublicKeyDigest=require("./publisher-public-key-digest.js").PublisherPublicKeyDigest,FaceInstance=function(a,b,c,d,e,f,g,h,j){this.action=a;this.publisherPublicKeyDigest=b;this.faceID=c;this.ipProto=d;this.host=e;this.Port=f;this.multicastInterface=g;this.multicastTTL=h;this.freshnessSeconds=j};exports.FaceInstance=FaceInstance;
FaceInstance.NetworkProtocol={TCP:6,UDP:17};
FaceInstance.prototype.from_ndnb=function(a){a.readElementStartDTag(this.getElementLabel());a.peekDTag(NDNProtocolDTags.Action)&&(this.action=a.readUTF8DTagElement(NDNProtocolDTags.Action));a.peekDTag(NDNProtocolDTags.PublisherPublicKeyDigest)&&(this.publisherPublicKeyDigest=new PublisherPublicKeyDigest,this.publisherPublicKeyDigest.from_ndnb(a));a.peekDTag(NDNProtocolDTags.FaceID)&&(this.faceID=a.readIntegerDTagElement(NDNProtocolDTags.FaceID));if(a.peekDTag(NDNProtocolDTags.IPProto)){var b=a.readIntegerDTagElement(NDNProtocolDTags.IPProto);
this.ipProto=null;if(FaceInstance.NetworkProtocol.TCP==b)this.ipProto=FaceInstance.NetworkProtocol.TCP;else if(FaceInstance.NetworkProtocol.UDP==b)this.ipProto=FaceInstance.NetworkProtocol.UDP;else throw Error("FaceInstance.decoder.  Invalid NDNProtocolDTags.IPProto field: "+b);}a.peekDTag(NDNProtocolDTags.Host)&&(this.host=a.readUTF8DTagElement(NDNProtocolDTags.Host));a.peekDTag(NDNProtocolDTags.Port)&&(this.Port=a.readIntegerDTagElement(NDNProtocolDTags.Port));a.peekDTag(NDNProtocolDTags.MulticastInterface)&&
(this.multicastInterface=a.readUTF8DTagElement(NDNProtocolDTags.MulticastInterface));a.peekDTag(NDNProtocolDTags.MulticastTTL)&&(this.multicastTTL=a.readIntegerDTagElement(NDNProtocolDTags.MulticastTTL));a.peekDTag(NDNProtocolDTags.FreshnessSeconds)&&(this.freshnessSeconds=a.readIntegerDTagElement(NDNProtocolDTags.FreshnessSeconds));a.readElementClose()};
FaceInstance.prototype.to_ndnb=function(a){a.writeElementStartDTag(this.getElementLabel());null!=this.action&&0!=this.action.length&&a.writeDTagElement(NDNProtocolDTags.Action,this.action);null!=this.publisherPublicKeyDigest&&this.publisherPublicKeyDigest.to_ndnb(a);null!=this.faceID&&a.writeDTagElement(NDNProtocolDTags.FaceID,this.faceID);null!=this.ipProto&&a.writeDTagElement(NDNProtocolDTags.IPProto,this.ipProto);null!=this.host&&0!=this.host.length&&a.writeDTagElement(NDNProtocolDTags.Host,this.host);
null!=this.Port&&a.writeDTagElement(NDNProtocolDTags.Port,this.Port);null!=this.multicastInterface&&0!=this.multicastInterface.length&&a.writeDTagElement(NDNProtocolDTags.MulticastInterface,this.multicastInterface);null!=this.multicastTTL&&a.writeDTagElement(NDNProtocolDTags.MulticastTTL,this.multicastTTL);null!=this.freshnessSeconds&&a.writeDTagElement(NDNProtocolDTags.FreshnessSeconds,this.freshnessSeconds);a.writeElementClose()};FaceInstance.prototype.getElementLabel=function(){return NDNProtocolDTags.FaceInstance};
var NDNProtocolDTags=require("./util/ndn-protoco-id-tags.js").NDNProtocolDTags,PublisherPublicKeyDigest=require("./publisher-public-key-digest.js").PublisherPublicKeyDigest,Name=require("./name.js").Name,ForwardingEntry=function(a,b,c,d,e,f){this.action=a;this.prefixName=b;this.ndndID=c;this.faceID=d;this.flags=e;this.lifetime=f};exports.ForwardingEntry=ForwardingEntry;ForwardingEntry.ACTIVE=1;ForwardingEntry.CHILD_INHERIT=2;ForwardingEntry.ADVERTISE=4;ForwardingEntry.LAST=8;
ForwardingEntry.CAPTURE=16;ForwardingEntry.LOCAL=32;ForwardingEntry.TAP=64;ForwardingEntry.CAPTURE_OK=128;
ForwardingEntry.prototype.from_ndnb=function(a){a.readElementStartDTag(this.getElementLabel());a.peekDTag(NDNProtocolDTags.Action)&&(this.action=a.readUTF8DTagElement(NDNProtocolDTags.Action));a.peekDTag(NDNProtocolDTags.Name)&&(this.prefixName=new Name,this.prefixName.from_ndnb(a));a.peekDTag(NDNProtocolDTags.PublisherPublicKeyDigest)&&(this.NdndId=new PublisherPublicKeyDigest,this.NdndId.from_ndnb(a));a.peekDTag(NDNProtocolDTags.FaceID)&&(this.faceID=a.readIntegerDTagElement(NDNProtocolDTags.FaceID));
a.peekDTag(NDNProtocolDTags.ForwardingFlags)&&(this.flags=a.readIntegerDTagElement(NDNProtocolDTags.ForwardingFlags));a.peekDTag(NDNProtocolDTags.FreshnessSeconds)&&(this.lifetime=a.readIntegerDTagElement(NDNProtocolDTags.FreshnessSeconds));a.readElementClose()};
ForwardingEntry.prototype.to_ndnb=function(a){a.writeElementStartDTag(this.getElementLabel());null!=this.action&&0!=this.action.length&&a.writeDTagElement(NDNProtocolDTags.Action,this.action);null!=this.prefixName&&this.prefixName.to_ndnb(a);null!=this.NdndId&&this.NdndId.to_ndnb(a);null!=this.faceID&&a.writeDTagElement(NDNProtocolDTags.FaceID,this.faceID);null!=this.flags&&a.writeDTagElement(NDNProtocolDTags.ForwardingFlags,this.flags);null!=this.lifetime&&a.writeDTagElement(NDNProtocolDTags.FreshnessSeconds,
this.lifetime);a.writeElementClose()};ForwardingEntry.prototype.getElementLabel=function(){return NDNProtocolDTags.ForwardingEntry};var ForwardingEntry=require("./forwarding-entry.js").ForwardingEntry,ForwardingFlags=function(){this.childInherit=this.active=!0;this.captureOk=this.tap=this.local=this.capture=this.last=this.advertise=!1};exports.ForwardingFlags=ForwardingFlags;
ForwardingFlags.prototype.getForwardingEntryFlags=function(){var a=0;this.active&&(a|=ForwardingEntry.ACTIVE);this.childInherit&&(a|=ForwardingEntry.CHILD_INHERIT);this.advertise&&(a|=ForwardingEntry.ADVERTISE);this.last&&(a|=ForwardingEntry.LAST);this.capture&&(a|=ForwardingEntry.CAPTURE);this.local&&(a|=ForwardingEntry.LOCAL);this.tap&&(a|=ForwardingEntry.TAP);this.captureOk&&(a|=ForwardingEntry.CAPTURE_OK);return a};
ForwardingFlags.prototype.setForwardingEntryFlags=function(a){this.active=0!=(a&ForwardingEntry.ACTIVE);this.childInherit=0!=(a&ForwardingEntry.CHILD_INHERIT);this.advertise=0!=(a&ForwardingEntry.ADVERTISE);this.last=0!=(a&ForwardingEntry.LAST);this.capture=0!=(a&ForwardingEntry.CAPTURE);this.local=0!=(a&ForwardingEntry.LOCAL);this.tap=0!=(a&ForwardingEntry.TAP);this.captureOk=0!=(a&ForwardingEntry.CAPTURE_OK)};ForwardingFlags.prototype.getActive=function(){return this.active};
ForwardingFlags.prototype.getChildInherit=function(){return this.childInherit};ForwardingFlags.prototype.getAdvertise=function(){return this.advertise};ForwardingFlags.prototype.getLast=function(){return this.last};ForwardingFlags.prototype.getCapture=function(){return this.capture};ForwardingFlags.prototype.getLocal=function(){return this.local};ForwardingFlags.prototype.getTap=function(){return this.tap};ForwardingFlags.prototype.getCaptureOk=function(){return this.captureOk};
ForwardingFlags.prototype.setActive=function(a){this.active=a};ForwardingFlags.prototype.setChildInherit=function(a){this.childInherit=a};ForwardingFlags.prototype.setAdvertise=function(a){this.advertise=a};ForwardingFlags.prototype.setLast=function(a){this.last=a};ForwardingFlags.prototype.setCapture=function(a){this.capture=a};ForwardingFlags.prototype.setLocal=function(a){this.local=a};ForwardingFlags.prototype.setTap=function(a){this.tap=a};
ForwardingFlags.prototype.setCaptureOk=function(a){this.captureOk=a};Blob=require("../util/blob.js").Blob;NDNProtocolDTags=require("../util/ndn-protoco-id-tags.js").NDNProtocolDTags;BinaryXMLEncoder=require("./binary-xml-encoder.js").BinaryXMLEncoder;BinaryXMLDecoder=require("./binary-xml-decoder.js").BinaryXMLDecoder;WireFormat=require("./wire-format.js").WireFormat;Name=require("../name.js").Name;Exclude=require("../exclude.js").Exclude;Signature=require("../signature.js").Signature;MetaInfo=require("../meta-info.js").MetaInfo;
PublisherPublicKeyDigest=require("../publisher-public-key-digest.js").PublisherPublicKeyDigest;DataUtils=require("./data-utils.js").DataUtils;KeyLocatorType=require("../key-locator.js").KeyLocatorType;BinaryXmlWireFormat=function(){WireFormat.call(this)};exports.BinaryXmlWireFormat=BinaryXmlWireFormat;BinaryXmlWireFormat.instance=null;BinaryXmlWireFormat.prototype.encodeInterest=function(a){var b=new BinaryXMLEncoder;BinaryXmlWireFormat.encodeInterest(a,b);return new Blob(b.getReducedOstream(),!1)};
BinaryXmlWireFormat.prototype.decodeInterest=function(a,b){var c=new BinaryXMLDecoder(b);BinaryXmlWireFormat.decodeInterest(a,c)};BinaryXmlWireFormat.prototype.encodeData=function(a){var b=new BinaryXMLEncoder(1500);a=BinaryXmlWireFormat.encodeData(a,b);a.encoding=new Blob(b.getReducedOstream(),!1);return a};BinaryXmlWireFormat.prototype.encodeContentObject=function(a){return this.encodeData(a)};
BinaryXmlWireFormat.prototype.decodeData=function(a,b){var c=new BinaryXMLDecoder(b);return BinaryXmlWireFormat.decodeData(a,c)};BinaryXmlWireFormat.prototype.decodeContentObject=function(a,b){this.decodeData(a,b)};BinaryXmlWireFormat.get=function(){null===BinaryXmlWireFormat.instance&&(BinaryXmlWireFormat.instance=new BinaryXmlWireFormat);return BinaryXmlWireFormat.instance};
BinaryXmlWireFormat.encodeInterest=function(a,b){b.writeElementStartDTag(NDNProtocolDTags.Interest);a.name.to_ndnb(b);null!=a.minSuffixComponents&&b.writeDTagElement(NDNProtocolDTags.MinSuffixComponents,a.minSuffixComponents);null!=a.maxSuffixComponents&&b.writeDTagElement(NDNProtocolDTags.MaxSuffixComponents,a.maxSuffixComponents);a.getKeyLocator().getType()==KeyLocatorType.KEY_LOCATOR_DIGEST&&null!=a.getKeyLocator().getKeyData()&&0<a.getKeyLocator().getKeyData().length?b.writeDTagElement(NDNProtocolDTags.PublisherPublicKeyDigest,
a.getKeyLocator().getKeyData()):null!=a.publisherPublicKeyDigest&&a.publisherPublicKeyDigest.to_ndnb(b);null!=a.exclude&&a.exclude.to_ndnb(b);null!=a.childSelector&&b.writeDTagElement(NDNProtocolDTags.ChildSelector,a.childSelector);a.DEFAULT_ANSWER_ORIGIN_KIND!=a.answerOriginKind&&null!=a.answerOriginKind&&b.writeDTagElement(NDNProtocolDTags.AnswerOriginKind,a.answerOriginKind);null!=a.scope&&b.writeDTagElement(NDNProtocolDTags.Scope,a.scope);null!=a.interestLifetime&&b.writeDTagElement(NDNProtocolDTags.InterestLifetime,
DataUtils.nonNegativeIntToBigEndian(4096*(a.interestLifetime/1E3)));null!=a.nonce&&b.writeDTagElement(NDNProtocolDTags.Nonce,a.nonce);b.writeElementClose()};
BinaryXmlWireFormat.decodeInterest=function(a,b){b.readElementStartDTag(NDNProtocolDTags.Interest);a.name=new Name;a.name.from_ndnb(b);a.minSuffixComponents=b.peekDTag(NDNProtocolDTags.MinSuffixComponents)?b.readIntegerDTagElement(NDNProtocolDTags.MinSuffixComponents):null;a.maxSuffixComponents=b.peekDTag(NDNProtocolDTags.MaxSuffixComponents)?b.readIntegerDTagElement(NDNProtocolDTags.MaxSuffixComponents):null;a.getKeyLocator().clear();b.peekDTag(NDNProtocolDTags.PublisherPublicKeyDigest)?(a.publisherPublicKeyDigest=
new PublisherPublicKeyDigest,a.publisherPublicKeyDigest.from_ndnb(b)):a.publisherPublicKeyDigest=null;null!=a.publisherPublicKeyDigest&&(null!=a.publisherPublicKeyDigest.publisherPublicKeyDigest&&0<a.publisherPublicKeyDigest.publisherPublicKeyDigest.length)&&(a.getKeyLocator().setType(KeyLocatorType.KEY_LOCATOR_DIGEST),a.getKeyLocator().setKeyData(a.publisherPublicKeyDigest.publisherPublicKeyDigest));b.peekDTag(NDNProtocolDTags.Exclude)?(a.exclude=new Exclude,a.exclude.from_ndnb(b)):a.exclude=null;
a.childSelector=b.peekDTag(NDNProtocolDTags.ChildSelector)?b.readIntegerDTagElement(NDNProtocolDTags.ChildSelector):null;a.answerOriginKind=b.peekDTag(NDNProtocolDTags.AnswerOriginKind)?b.readIntegerDTagElement(NDNProtocolDTags.AnswerOriginKind):null;a.scope=b.peekDTag(NDNProtocolDTags.Scope)?b.readIntegerDTagElement(NDNProtocolDTags.Scope):null;a.interestLifetime=b.peekDTag(NDNProtocolDTags.InterestLifetime)?1E3*DataUtils.bigEndianToUnsignedInt(b.readBinaryDTagElement(NDNProtocolDTags.InterestLifetime))/
4096:null;a.nonce=b.peekDTag(NDNProtocolDTags.Nonce)?b.readBinaryDTagElement(NDNProtocolDTags.Nonce):null;b.readElementClose()};
BinaryXmlWireFormat.encodeData=function(a,b){b.writeElementStartDTag(a.getElementLabel());null!=a.signature&&a.signature.to_ndnb(b);var c=b.offset;null!=a.name&&a.name.to_ndnb(b);null!=a.signedInfo&&a.signedInfo.to_ndnb(b,a.getSignatureOrMetaInfoKeyLocator());b.writeDTagElement(NDNProtocolDTags.Content,a.content);var d=b.offset;b.writeElementClose();return{signedPortionBeginOffset:c,signedPortionEndOffset:d}};
BinaryXmlWireFormat.decodeData=function(a,b){b.readElementStartDTag(a.getElementLabel());b.peekDTag(NDNProtocolDTags.Signature)?(a.signature=new Signature,a.signature.from_ndnb(b)):a.signature=null;var c=b.offset;a.name=new Name;a.name.from_ndnb(b);b.peekDTag(NDNProtocolDTags.SignedInfo)?(a.signedInfo=new MetaInfo,a.signedInfo.from_ndnb(b),null!=a.signedInfo.locator&&null!=a.getSignature()&&(a.getSignature().keyLocator=a.signedInfo.locator)):a.signedInfo=null;a.content=b.readBinaryDTagElement(NDNProtocolDTags.Content,
!0);var d=b.offset;b.readElementClose();return{signedPortionBeginOffset:c,signedPortionEndOffset:d}};
var crypto=require("crypto"),Blob=require("../util/blob.js").Blob,Tlv=require("./tlv/tlv.js").Tlv,TlvEncoder=require("./tlv/tlv-encoder.js").TlvEncoder,TlvDecoder=require("./tlv/tlv-decoder.js").TlvDecoder,WireFormat=require("./wire-format.js").WireFormat,Exclude=require("../exclude.js").Exclude,ContentType=require("../meta-info.js").ContentType,KeyLocatorType=require("../key-locator.js").KeyLocatorType,Signature=require("../signature.js").Signature,DecodingException=require("./decoding-exception.js").DecodingException,
Tlv0_1a2WireFormat=function(){WireFormat.call(this)};Tlv0_1a2WireFormat.prototype=new WireFormat;Tlv0_1a2WireFormat.prototype.name="Tlv0_1a2WireFormat";exports.Tlv0_1a2WireFormat=Tlv0_1a2WireFormat;Tlv0_1a2WireFormat.instance=null;
Tlv0_1a2WireFormat.prototype.encodeInterest=function(a){var b=new TlvEncoder,c=b.getLength();b.writeOptionalNonNegativeIntegerTlv(Tlv.InterestLifetime,a.getInterestLifetimeMilliseconds());b.writeOptionalNonNegativeIntegerTlv(Tlv.Scope,a.getScope());if(null==a.getNonce()||0==a.getNonce().length)b.writeBlobTlv(Tlv.Nonce,crypto.randomBytes(4));else if(4>a.getNonce().length){var d=Buffer(4);a.getNonce().copy(d);for(var e=a.getNonce().length;4>e;++e)d[e]=crypto.randomBytes(1)[0];b.writeBlobTlv(Tlv.Nonce,
d)}else 4==a.getNonce().length?b.writeBlobTlv(Tlv.Nonce,a.getNonce()):b.writeBlobTlv(Tlv.Nonce,a.getNonce().slice(0,4));Tlv0_1a2WireFormat.encodeSelectors(a,b);Tlv0_1a2WireFormat.encodeName(a.getName(),b);b.writeTypeAndLength(Tlv.Interest,b.getLength()-c);return new Blob(b.getOutput(),!1)};
Tlv0_1a2WireFormat.prototype.decodeInterest=function(a,b){var c=new TlvDecoder(b),d=c.readNestedTlvsStart(Tlv.Interest);Tlv0_1a2WireFormat.decodeName(a.getName(),c);c.peekType(Tlv.Selectors,d)&&Tlv0_1a2WireFormat.decodeSelectors(a,c);var e=c.readBlobTlv(Tlv.Nonce);a.setScope(c.readOptionalNonNegativeIntegerTlv(Tlv.Scope,d));a.setInterestLifetimeMilliseconds(c.readOptionalNonNegativeIntegerTlv(Tlv.InterestLifetime,d));a.setNonce(e);c.finishNestedTlvs(d)};
Tlv0_1a2WireFormat.prototype.encodeData=function(a){var b=new TlvEncoder(1500),c=b.getLength();b.writeBlobTlv(Tlv.SignatureValue,a.getSignature().getSignature());var d=b.getLength();Tlv0_1a2WireFormat.encodeSignatureSha256WithRsaValue(a.getSignature(),b,a.getSignatureOrMetaInfoKeyLocator());b.writeBlobTlv(Tlv.Content,a.getContent());Tlv0_1a2WireFormat.encodeMetaInfo(a.getMetaInfo(),b);Tlv0_1a2WireFormat.encodeName(a.getName(),b);a=b.getLength();b.writeTypeAndLength(Tlv.Data,b.getLength()-c);c=b.getLength()-
a;d=b.getLength()-d;return{encoding:new Blob(b.getOutput(),!1),signedPortionBeginOffset:c,signedPortionEndOffset:d}};
Tlv0_1a2WireFormat.prototype.decodeData=function(a,b){var c=new TlvDecoder(b),d=c.readNestedTlvsStart(Tlv.Data),e=c.getOffset();Tlv0_1a2WireFormat.decodeName(a.getName(),c);Tlv0_1a2WireFormat.decodeMetaInfo(a.getMetaInfo(),c);a.setContent(c.readBlobTlv(Tlv.Content));Tlv0_1a2WireFormat.decodeSignatureInfo(a,c);null!=a.getSignature()&&(null!=a.getSignature().getKeyLocator()&&null!=a.getMetaInfo())&&(a.getMetaInfo().locator=a.getSignature().getKeyLocator());var f=c.getOffset();a.getSignature().setSignature(c.readBlobTlv(Tlv.SignatureValue));
c.finishNestedTlvs(d);return{signedPortionBeginOffset:e,signedPortionEndOffset:f}};Tlv0_1a2WireFormat.get=function(){null===Tlv0_1a2WireFormat.instance&&(Tlv0_1a2WireFormat.instance=new Tlv0_1a2WireFormat);return Tlv0_1a2WireFormat.instance};Tlv0_1a2WireFormat.encodeName=function(a,b){for(var c=b.getLength(),d=a.size()-1;0<=d;--d)b.writeBlobTlv(Tlv.NameComponent,a.get(d).getValue());b.writeTypeAndLength(Tlv.Name,b.getLength()-c)};
Tlv0_1a2WireFormat.decodeName=function(a,b){a.clear();for(var c=b.readNestedTlvsStart(Tlv.Name);b.getOffset()<c;)a.append(b.readBlobTlv(Tlv.NameComponent));b.finishNestedTlvs(c)};
Tlv0_1a2WireFormat.encodeSelectors=function(a,b){var c=b.getLength();a.getMustBeFresh()&&b.writeTypeAndLength(Tlv.MustBeFresh,0);b.writeOptionalNonNegativeIntegerTlv(Tlv.ChildSelector,a.getChildSelector());0<a.getExclude().size()&&Tlv0_1a2WireFormat.encodeExclude(a.getExclude(),b);if(null!=a.getKeyLocator().getType())Tlv0_1a2WireFormat.encodeKeyLocator(a.getKeyLocator(),b);else if(null!=a.publisherPublicKeyDigest){var d=b.getLength();b.writeBlobTlv(Tlv.KeyLocatorDigest,a.publisherPublicKeyDigest.publisherPublicKeyDigest);
b.writeTypeAndLength(Tlv.KeyLocator,b.getLength()-d)}b.writeOptionalNonNegativeIntegerTlv(Tlv.MaxSuffixComponents,a.getMaxSuffixComponents());b.writeOptionalNonNegativeIntegerTlv(Tlv.MinSuffixComponents,a.getMinSuffixComponents());b.getLength()!=c&&b.writeTypeAndLength(Tlv.Selectors,b.getLength()-c)};
Tlv0_1a2WireFormat.decodeSelectors=function(a,b){var c=b.readNestedTlvsStart(Tlv.Selectors);a.setMinSuffixComponents(b.readOptionalNonNegativeIntegerTlv(Tlv.MinSuffixComponents,c));a.setMaxSuffixComponents(b.readOptionalNonNegativeIntegerTlv(Tlv.MaxSuffixComponents,c));a.publisherPublicKeyDigest=null;b.peekType(Tlv.KeyLocator,c)?(Tlv0_1a2WireFormat.decodeKeyLocator(a.getKeyLocator(),b),a.getKeyLocator().getType()==KeyLocatorType.KEY_LOCATOR_DIGEST&&(a.publisherPublicKeyDigest=new PublisherPublicKeyDigest,
a.publisherPublicKeyDigest.publisherPublicKeyDigest=a.getKeyLocator().getKeyData())):a.getKeyLocator().clear();b.peekType(Tlv.Exclude,c)?Tlv0_1a2WireFormat.decodeExclude(a.getExclude(),b):a.getExclude().clear();a.setChildSelector(b.readOptionalNonNegativeIntegerTlv(Tlv.ChildSelector,c));a.setMustBeFresh(b.readBooleanTlv(Tlv.MustBeFresh,c));b.finishNestedTlvs(c)};
Tlv0_1a2WireFormat.encodeExclude=function(a,b){for(var c=b.getLength(),d=a.size()-1;0<=d;--d){var e=a.get(d);e==Exclude.ANY?b.writeTypeAndLength(Tlv.Any,0):b.writeBlobTlv(Tlv.NameComponent,e.getValue())}b.writeTypeAndLength(Tlv.Exclude,b.getLength()-c)};
Tlv0_1a2WireFormat.decodeExclude=function(a,b){var c=b.readNestedTlvsStart(Tlv.Exclude);for(a.clear();;)if(b.peekType(Tlv.NameComponent,c))a.appendComponent(b.readBlobTlv(Tlv.NameComponent));else if(b.readBooleanTlv(Tlv.Any,c))a.appendAny();else break;b.finishNestedTlvs(c)};
Tlv0_1a2WireFormat.encodeKeyLocator=function(a,b){var c=b.getLength();if(null!=a.getType())if(a.getType()==KeyLocatorType.KEYNAME)Tlv0_1a2WireFormat.encodeName(a.getKeyName(),b);else if(a.getType()==KeyLocatorType.KEY_LOCATOR_DIGEST&&0<a.getKeyData().length)b.writeBlobTlv(Tlv.KeyLocatorDigest,a.getKeyData());else throw Error("Unrecognized KeyLocatorType "+a.getType());b.writeTypeAndLength(Tlv.KeyLocator,b.getLength()-c)};
Tlv0_1a2WireFormat.decodeKeyLocator=function(a,b){var c=b.readNestedTlvsStart(Tlv.KeyLocator);a.clear();if(b.getOffset()!=c){if(b.peekType(Tlv.Name,c))a.setType(KeyLocatorType.KEYNAME),Tlv0_1a2WireFormat.decodeName(a.getKeyName(),b);else if(b.peekType(Tlv.KeyLocatorDigest,c))a.setType(KeyLocatorType.KEY_LOCATOR_DIGEST),a.setKeyData(b.readBlobTlv(Tlv.KeyLocatorDigest));else throw new DecodingException("decodeKeyLocator: Unrecognized key locator type");b.finishNestedTlvs(c)}};
Tlv0_1a2WireFormat.encodeSignatureSha256WithRsaValue=function(a,b,c){a=b.getLength();Tlv0_1a2WireFormat.encodeKeyLocator(c,b);b.writeNonNegativeIntegerTlv(Tlv.SignatureType,Tlv.SignatureType_SignatureSha256WithRsa);b.writeTypeAndLength(Tlv.SignatureInfo,b.getLength()-a)};
Tlv0_1a2WireFormat.decodeSignatureInfo=function(a,b){var c=b.readNestedTlvsStart(Tlv.SignatureInfo),d=b.readNonNegativeIntegerTlv(Tlv.SignatureType);if(d==Tlv.SignatureType_SignatureSha256WithRsa)a.setSignature(Signature()),d=a.getSignature(),Tlv0_1a2WireFormat.decodeKeyLocator(d.getKeyLocator(),b);else throw new DecodingException("decodeSignatureInfo: unrecognized SignatureInfo type"+d);b.finishNestedTlvs(c)};
Tlv0_1a2WireFormat.encodeMetaInfo=function(a,b){var c=b.getLength(),d=a.getFinalBlockID();if(null!=d&&0<d.length){var e=b.getLength();b.writeBlobTlv(Tlv.NameComponent,d);b.writeTypeAndLength(Tlv.FinalBlockId,b.getLength()-e)}b.writeOptionalNonNegativeIntegerTlv(Tlv.FreshnessPeriod,a.getFreshnessPeriod());if(a.getType()!=ContentType.BLOB)if(a.getType()==ContentType.LINK||a.getType()==ContentType.KEY)b.writeNonNegativeIntegerTlv(Tlv.ContentType,a.getType());else throw Error("unrecognized TLV ContentType");
b.writeTypeAndLength(Tlv.MetaInfo,b.getLength()-c)};Tlv0_1a2WireFormat.decodeMetaInfo=function(a,b){var c=b.readNestedTlvsStart(Tlv.MetaInfo);a.setType(b.readOptionalNonNegativeIntegerTlv(Tlv.ContentType,c));a.setFreshnessPeriod(b.readOptionalNonNegativeIntegerTlv(Tlv.FreshnessPeriod,c));if(b.peekType(Tlv.FinalBlockId,c)){var d=b.readNestedTlvsStart(Tlv.FinalBlockId);a.setFinalBlockID(b.readBlobTlv(Tlv.NameComponent));b.finishNestedTlvs(d)}else a.setFinalBlockID(null);b.finishNestedTlvs(c)};
WireFormat=require("./wire-format.js").WireFormat;Tlv0_1a2WireFormat=require("./tlv-0_1a2-wire-format.js").Tlv0_1a2WireFormat;TlvWireFormat=function(){Tlv0_1a2WireFormat.call(this)};TlvWireFormat.prototype=new Tlv0_1a2WireFormat;TlvWireFormat.prototype.name="TlvWireFormat";exports.TlvWireFormat=TlvWireFormat;TlvWireFormat.instance=null;TlvWireFormat.get=function(){null===TlvWireFormat.instance&&(TlvWireFormat.instance=new TlvWireFormat);return TlvWireFormat.instance};WireFormat.setDefaultWireFormat(TlvWireFormat.get());
var DataUtils=require("./data-utils.js").DataUtils,BinaryXMLEncoder=require("./binary-xml-encoder.js").BinaryXMLEncoder,BinaryXMLDecoder=require("./binary-xml-decoder.js").BinaryXMLDecoder,Key=require("../key.js").Key,KeyLocatorType=require("../key-locator.js").KeyLocatorType,Interest=require("../interest.js").Interest,Data=require("../data.js").Data,FaceInstance=require("../face-instance.js").FaceInstance,ForwardingEntry=require("../forwarding-entry.js").ForwardingEntry,WireFormat=require("./wire-format.js").WireFormat,
LOG=require("../log.js").Log.LOG,EncodingUtils=function(){};exports.EncodingUtils=EncodingUtils;EncodingUtils.encodeToHexInterest=function(a,b){b=b||WireFormat.getDefaultWireFormat();return DataUtils.toHex(a.wireEncode(b).buf())};EncodingUtils.encodeToHexData=function(a,b){b=b||WireFormat.getDefaultWireFormat();return DataUtils.toHex(a.wireEncode(b).buf())};EncodingUtils.encodeToHexContentObject=function(a,b){return EncodingUtils.encodeToHexData(a,b)};
EncodingUtils.encodeForwardingEntry=function(a){var b=new BinaryXMLEncoder;a.to_ndnb(b);return b.getReducedOstream()};EncodingUtils.decodeHexFaceInstance=function(a){var b=DataUtils.toNumbers(a);a=new BinaryXMLDecoder(b);3<LOG&&console.log("DECODING HEX FACE INSTANCE  \n"+b);b=new FaceInstance;b.from_ndnb(a);return b};EncodingUtils.decodeHexInterest=function(a,b){b=b||WireFormat.getDefaultWireFormat();var c=new Interest;c.wireDecode(DataUtils.toNumbers(a),b);return c};
EncodingUtils.decodeHexData=function(a,b){b=b||WireFormat.getDefaultWireFormat();var c=new Data;c.wireDecode(DataUtils.toNumbers(a),b);return c};EncodingUtils.decodeHexContentObject=function(a,b){return EncodingUtils.decodeHexData(a,b)};EncodingUtils.decodeHexForwardingEntry=function(a){var b=DataUtils.toNumbers(a);a=new BinaryXMLDecoder(b);3<LOG&&console.log("DECODED HEX FORWARDING ENTRY \n"+b);b=new ForwardingEntry;b.from_ndnb(a);return b};
EncodingUtils.decodeSubjectPublicKeyInfo=function(a){a=DataUtils.toHex(a).toLowerCase();a=_x509_getPublicKeyHexArrayFromCertHex(a,_x509_getSubjectPublicKeyPosFromCertHex(a,0));var b=new RSAKey;b.setPublic(a[0],a[1]);return b};
EncodingUtils.dataToHtml=function(a){var b="";if(-1==a)b+="NO CONTENT FOUND";else if(-2==a)b+="CONTENT NAME IS EMPTY";else{null!=a.name&&null!=a.name.components&&(b+="NAME: "+a.name.toUri(),b+="<br /><br />");null!=a.content&&(b+="CONTENT(ASCII): "+DataUtils.toString(a.content),b+="<br />",b+="<br />");null!=a.content&&(b+="CONTENT(hex): "+DataUtils.toHex(a.content),b+="<br />",b+="<br />");null!=a.signature&&null!=a.signature.digestAlgorithm&&(b+="DigestAlgorithm (hex): "+DataUtils.toHex(a.signature.digestAlgorithm),
b+="<br />",b+="<br />");null!=a.signature&&null!=a.signature.witness&&(b+="Witness (hex): "+DataUtils.toHex(a.signature.witness),b+="<br />",b+="<br />");null!=a.signature&&null!=a.signature.signature&&(b+="Signature(hex): "+DataUtils.toHex(a.signature.signature),b+="<br />",b+="<br />");null!=a.signedInfo&&(null!=a.signedInfo.publisher&&null!=a.signedInfo.publisher.publisherPublicKeyDigest)&&(b+="Publisher Public Key Digest(hex): "+DataUtils.toHex(a.signedInfo.publisher.publisherPublicKeyDigest),
b+="<br />",b+="<br />");if(null!=a.signedInfo&&null!=a.signedInfo.timestamp){var c=new Date;c.setTime(a.signedInfo.timestamp.msec);b+="TimeStamp: "+c;b+="<br />";b+="TimeStamp(number): "+a.signedInfo.timestamp.msec;b+="<br />"}null!=a.signedInfo&&null!=a.signedInfo.finalBlockID&&(b+="FinalBlockID: "+DataUtils.toHex(a.signedInfo.finalBlockID),b+="<br />");null!=a.signedInfo&&(null!=a.signedInfo.locator&&a.signedInfo.locator.type)&&(b+="keyLocator: ",b=a.signedInfo.locator.type==KeyLocatorType.KEY?
b+("Key: "+DataUtils.toHex(a.signedInfo.locator.publicKey).toLowerCase()+"<br />"):a.signedInfo.locator.type==KeyLocatorType.KEY_LOCATOR_DIGEST?b+("KeyLocatorDigest: "+DataUtils.toHex(a.signedInfo.locator.getKeyData()).toLowerCase()+"<br />"):a.signedInfo.locator.type==KeyLocatorType.CERTIFICATE?b+("Certificate: "+DataUtils.toHex(a.signedInfo.locator.certificate).toLowerCase()+"<br />"):a.signedInfo.locator.type==KeyLocatorType.KEYNAME?b+("KeyName: "+a.signedInfo.locator.keyName.contentName.to_uri()+
"<br />"):b+("[unrecognized ndn_KeyLocatorType "+a.signedInfo.locator.type+"]<br />"))}return b};EncodingUtils.contentObjectToHtml=function(a){return EncodingUtils.dataToHtml(a)};
var encodeToHexInterest=function(a){return EncodingUtils.encodeToHexInterest(a)},encodeToHexContentObject=function(a){return EncodingUtils.encodeToHexData(a)},encodeForwardingEntry=function(a){return EncodingUtils.encodeForwardingEntry(a)},decodeHexFaceInstance=function(a){return EncodingUtils.decodeHexFaceInstance(a)},decodeHexInterest=function(a){return EncodingUtils.decodeHexInterest(a)},decodeHexContentObject=function(a){return EncodingUtils.decodeHexData(a)},decodeHexForwardingEntry=function(a){return EncodingUtils.decodeHexForwardingEntry(a)},
decodeSubjectPublicKeyInfo=function(a){return EncodingUtils.decodeSubjectPublicKeyInfo(a)},contentObjectToHtml=function(a){return EncodingUtils.dataToHtml(a)};function encodeToBinaryInterest(a){return a.wireEncode().buf()}function encodeToBinaryContentObject(a){return a.wireEncode().buf()}
var crypto=require("crypto"),DataUtils=require("./encoding/data-utils.js").DataUtils,Name=require("./name.js").Name,Interest=require("./interest.js").Interest,Data=require("./data.js").Data,MetaInfo=require("./meta-info.js").MetaInfo,ForwardingEntry=require("./forwarding-entry.js").ForwardingEntry,TlvWireFormat=require("./encoding/tlv-wire-format.js").TlvWireFormat,BinaryXmlWireFormat=require("./encoding/binary-xml-wire-format.js").BinaryXmlWireFormat,Tlv=require("./encoding/tlv/tlv.js").Tlv,TlvDecoder=
require("./encoding/tlv/tlv-decoder.js").TlvDecoder,BinaryXMLDecoder=require("./encoding/binary-xml-decoder.js").BinaryXMLDecoder,BinaryXMLEncoder=require("./encoding/binary-xml-encoder.js").BinaryXMLEncoder,NDNProtocolDTags=require("./util/ndn-protoco-id-tags.js").NDNProtocolDTags,Key=require("./key.js").Key,KeyLocatorType=require("./key-locator.js").KeyLocatorType,ForwardingFlags=require("./forwarding-flags.js").ForwardingFlags,Closure=require("./closure.js").Closure,UpcallInfo=require("./closure.js").UpcallInfo,
TcpTransport=require("./transport/tcp-transport.js").TcpTransport,LOG=require("./log.js").Log.LOG,Face=function Face(b){if(!Face.supported)throw Error("The necessary JavaScript support is not available on this platform.");b=b||{};this.transport=(b.getTransport||function(){return new TcpTransport})();this.getHostAndPort=b.getHostAndPort||this.transport.defaultGetHostAndPort;this.host=void 0!==b.host?b.host:null;this.port=b.port||("undefined"!=typeof WebSocketTransport?9696:6363);this.readyStatus=Face.UNOPEN;
this.verify=void 0!==b.verify?b.verify:!1;this.onopen=b.onopen||function(){3<LOG&&console.log("Face connection established.")};this.onclose=b.onclose||function(){3<LOG&&console.log("Face connection closed.")};this.ndndid=null};exports.Face=Face;Face.UNOPEN=0;Face.OPENED=1;Face.CLOSED=2;Face.getSupported=function(){try{(new Buffer(1)).slice(0,1)}catch(a){return console.log("NDN not available: Buffer not supported. "+a),!1}return!0};Face.supported=Face.getSupported();Face.ndndIdFetcher=new Name("/%C1.M.S.localhost/%C1.M.SRV/ndnd/KEY");
Face.prototype.createRoute=function(a,b){this.host=a;this.port=b};Face.KeyStore=[];var KeyStoreEntry=function(a,b,c){this.keyName=a;this.rsaKey=b;this.timeStamp=c};Face.addKeyEntry=function(a){null==Face.getKeyByName(a.keyName)&&Face.KeyStore.push(a)};
Face.getKeyByName=function(a){for(var b=null,c=0;c<Face.KeyStore.length;c++)if(Face.KeyStore[c].keyName.contentName.match(a.contentName)&&(null==b||Face.KeyStore[c].keyName.contentName.components.length>b.keyName.contentName.components.length))b=Face.KeyStore[c];return b};Face.prototype.close=function(){if(this.readyStatus!=Face.OPENED)throw Error("Cannot close because Face connection is not opened.");this.readyStatus=Face.CLOSED;this.transport.close()};Face.PITTable=[];
var PITEntry=function(a,b){this.interest=a;this.closure=b;this.timerID=-1};Face.extractEntriesForExpressedInterest=function(a){for(var b=[],c=Face.PITTable.length-1;0<=c;--c){var d=Face.PITTable[c];d.interest.matchesName(a)&&(clearTimeout(d.timerID),b.push(d),Face.PITTable.splice(c,1))}return b};Face.registeredPrefixTable=[];var RegisteredPrefix=function(a,b){this.prefix=a;this.closure=b};
function getEntryForRegisteredPrefix(a){for(var b=-1,c=0;c<Face.registeredPrefixTable.length;c++)if(3<LOG&&console.log("Registered prefix "+c+": checking if "+Face.registeredPrefixTable[c].prefix+" matches "+a),Face.registeredPrefixTable[c].prefix.match(a)&&(0>b||Face.registeredPrefixTable[c].prefix.size()>Face.registeredPrefixTable[b].prefix.size()))b=c;return 0<=b?Face.registeredPrefixTable[b]:null}
Face.makeShuffledGetHostAndPort=function(a,b){a=a.slice(0,a.length);DataUtils.shuffle(a);return function(){return 0==a.length?null:{host:a.splice(0,1)[0],port:b}}};
Face.prototype.expressInterest=function(a,b,c,d){b&&b.upcall&&"function"==typeof b.upcall?c?this.expressInterestWithClosure(a,b,c):this.expressInterestWithClosure(a,b):("object"==typeof a&&a instanceof Interest?(a=new Interest(a),c=c?c:function(){}):(a=new Interest(a),b&&"object"==typeof b&&b instanceof Interest?(a.minSuffixComponents=b.minSuffixComponents,a.maxSuffixComponents=b.maxSuffixComponents,a.publisherPublicKeyDigest=b.publisherPublicKeyDigest,a.exclude=b.exclude,a.childSelector=b.childSelector,
a.answerOriginKind=b.answerOriginKind,a.scope=b.scope,a.interestLifetime=b.interestLifetime,b=c,c=d?d:function(){}):(a.interestLifetime=4E3,c=c?c:function(){})),this.expressInterestWithClosure(a,new Face.CallbackClosure(b,c)))};Face.CallbackClosure=function(a,b,c,d,e){Closure.call(this);this.onData=a;this.onTimeout=b;this.onInterest=c;this.prefix=d;this.transport=e};
Face.CallbackClosure.prototype.upcall=function(a,b){if(a==Closure.UPCALL_CONTENT||a==Closure.UPCALL_CONTENT_UNVERIFIED)this.onData(b.interest,b.data);else if(a==Closure.UPCALL_INTEREST_TIMED_OUT)this.onTimeout(b.interest);else if(a==Closure.UPCALL_INTEREST)this.onInterest(this.prefix,b.interest,this.transport);return Closure.RESULT_OK};
Face.prototype.expressInterestWithClosure=function(a,b,c){var d=new Interest(a);null!=c?(d.minSuffixComponents=c.minSuffixComponents,d.maxSuffixComponents=c.maxSuffixComponents,d.publisherPublicKeyDigest=c.publisherPublicKeyDigest,d.exclude=c.exclude,d.childSelector=c.childSelector,d.answerOriginKind=c.answerOriginKind,d.scope=c.scope,d.interestLifetime=c.interestLifetime):d.interestLifetime=4E3;if(null==this.host||null==this.port)if(null==this.getHostAndPort)console.log("ERROR: host OR port NOT SET");
else{var e=this;this.connectAndExecute(function(){e.reconnectAndExpressInterest(d,b)})}else this.reconnectAndExpressInterest(d,b)};Face.prototype.reconnectAndExpressInterest=function(a,b){if(this.transport.connectedHost!=this.host||this.transport.connectedPort!=this.port){var c=this;this.transport.connect(c,function(){c.expressInterestHelper(a,b)});this.readyStatus=Face.OPENED}else this.expressInterestHelper(a,b)};
Face.prototype.expressInterestHelper=function(a,b){var c=a.wireEncode(),d=this;if(null!=b){var e=new PITEntry(a,b);Face.PITTable.push(e);b.pitEntry=e;var f=a.interestLifetime||4E3,g=function(){1<LOG&&console.log("Interest time out: "+a.name.toUri());var h=Face.PITTable.indexOf(e);0<=h&&Face.PITTable.splice(h,1);b.upcall(Closure.UPCALL_INTEREST_TIMED_OUT,new UpcallInfo(d,a,0,null))==Closure.RESULT_REEXPRESS&&(1<LOG&&console.log("Re-express interest: "+a.name.toUri()),e.timerID=setTimeout(g,f),Face.PITTable.push(e),
d.transport.send(c.buf()))};e.timerID=setTimeout(g,f)}this.transport.send(c.buf())};Face.prototype.registerPrefix=function(a,b,c,d){b&&b.upcall&&"function"==typeof b.upcall?c?this.registerPrefixWithClosure(a,b,c):this.registerPrefixWithClosure(a,b):(c=c?c:function(){},d=d?d.getForwardingEntryFlags():(new ForwardingFlags).getForwardingEntryFlags(),this.registerPrefixWithClosure(a,new Face.CallbackClosure(null,null,b,a,this.transport),d,c))};
Face.prototype.registerPrefixWithClosure=function(a,b,c,d){c|=3;var e=this,f=function(){if(null==e.ndndid){var f=new Interest(Face.ndndIdFetcher);f.interestLifetime=4E3;3<LOG&&console.log("Expressing interest for ndndid from ndnd.");e.reconnectAndExpressInterest(f,new Face.FetchNdndidClosure(e,a,b,c,d))}else e.registerPrefixHelper(a,b,flags,d)};null==this.host||null==this.port?null==this.getHostAndPort?console.log("ERROR: host OR port NOT SET"):this.connectAndExecute(f):f()};
Face.FetchNdndidClosure=function(a,b,c,d,e){Closure.call(this);this.face=a;this.prefix=b;this.callerClosure=c;this.flags=d;this.onRegisterFailed=e};
Face.FetchNdndidClosure.prototype.upcall=function(a,b){if(a==Closure.UPCALL_INTEREST_TIMED_OUT){console.log("Timeout while requesting the ndndid.  Cannot registerPrefix for "+this.prefix.toUri()+" .");if(this.onRegisterFailed)this.onRegisterFailed(this.prefix);return Closure.RESULT_OK}if(!(a==Closure.UPCALL_CONTENT||a==Closure.UPCALL_CONTENT_UNVERIFIED))return Closure.RESULT_ERR;3<LOG&&console.log("Got ndndid from ndnd.");var c=require("crypto").createHash("sha256");c.update(b.data.getContent());
this.face.ndndid=new Buffer(c.digest());3<LOG&&console.log(this.face.ndndid);this.face.registerPrefixHelper(this.prefix,this.callerClosure,this.flags,this.onRegisterFailed);return Closure.RESULT_OK};Face.RegisterResponseClosure=function(a,b){Closure.call(this);this.prefix=a;this.onRegisterFailed=b};
Face.RegisterResponseClosure.prototype.upcall=function(a,b){if(a==Closure.UPCALL_INTEREST_TIMED_OUT){if(this.onRegisterFailed)this.onRegisterFailed(this.prefix);return Closure.RESULT_OK}if(!(a==Closure.UPCALL_CONTENT||a==Closure.UPCALL_CONTENT_UNVERIFIED))return Closure.RESULT_ERR;var c=new Name("/ndnx/.../selfreg");if(4>b.data.getName().size()||!b.data.getName().get(0).equals(c.get(0))||!b.data.getName().get(2).equals(c.get(2)))this.onRegisterFailed(this.prefix);else return Closure.RESULT_OK};
Face.prototype.registerPrefixHelper=function(a,b,c,d){c=new ForwardingEntry("selfreg",a,null,null,c,null);var e=new BinaryXMLEncoder;c.to_ndnb(e);c=e.getReducedOstream();e=new MetaInfo;e.setFields();c=new Data((new Name).append(crypto.randomBytes(4)),e,c);c.sign(BinaryXmlWireFormat.get());c=c.wireEncode(BinaryXmlWireFormat.get());c=new Name(["ndnx",this.ndndid,"selfreg",c]);c=new Interest(c);c.setInterestLifetimeMilliseconds(4E3);c.setScope(1);3<LOG&&console.log("Send Interest registration packet.");
Face.registeredPrefixTable.push(new RegisteredPrefix(a,b));this.reconnectAndExpressInterest(c,new Face.RegisterResponseClosure(a,d))};
Face.prototype.onReceivedElement=function(a){3<LOG&&console.log("Complete element received. Length "+a.length+". Start decoding.");var b=null,c=null;if(a[0]==Tlv.Interest||a[0]==Tlv.Data){var d=new TlvDecoder(a);d.peekType(Tlv.Interest,a.length)?(b=new Interest,b.wireDecode(a,TlvWireFormat.get())):d.peekType(Tlv.Data,a.length)&&(c=new Data,c.wireDecode(a,TlvWireFormat.get()))}else d=new BinaryXMLDecoder(a),d.peekDTag(NDNProtocolDTags.Interest)?(b=new Interest,b.wireDecode(a,BinaryXmlWireFormat.get())):
d.peekDTag(NDNProtocolDTags.Data)&&(c=new Data,c.wireDecode(a,BinaryXmlWireFormat.get()));if(null!==b)3<LOG&&console.log("Interest packet received."),a=getEntryForRegisteredPrefix(b.name),null!=a&&(3<LOG&&console.log("Found registered prefix for "+b.name.toUri()),b=new UpcallInfo(this,b,0,null),a.closure.upcall(Closure.UPCALL_INTEREST,b)==Closure.RESULT_INTEREST_CONSUMED&&null!=b.data&&this.transport.send(b.data.wireEncode().buf()));else if(null!==c){3<LOG&&console.log("Data packet received.");b=
Face.extractEntriesForExpressedInterest(c.name);for(a=0;a<b.length;++a){var d=b[a],e=d.closure;if(!1==this.verify)e.upcall(Closure.UPCALL_CONTENT_UNVERIFIED,new UpcallInfo(this,d.interest,0,c));else{var f=function(a,b,c){this.data=a;this.closure=b;this.keyName=c;Closure.call(this)},g=this;f.prototype.upcall=function(a,b){if(a==Closure.UPCALL_INTEREST_TIMED_OUT)console.log("In KeyFetchClosure.upcall: interest time out."),console.log(this.keyName.contentName.toUri());else if(a==Closure.UPCALL_CONTENT){var d=
new Key;d.readDerPublicKey(b.data.content);var e=!0==c.verify(d)?Closure.UPCALL_CONTENT:Closure.UPCALL_CONTENT_BAD;this.closure.upcall(e,new UpcallInfo(g,null,0,this.data));d=new KeyStoreEntry(j.keyName,d,(new Date).getTime());Face.addKeyEntry(d)}else a==Closure.UPCALL_CONTENT_BAD&&console.log("In KeyFetchClosure.upcall: signature verification failed")};if(c.signedInfo&&c.signedInfo.locator&&c.signature){3<LOG&&console.log("Key verification...");var h=DataUtils.toHex(c.signature.signature).toLowerCase();
null!=c.signature.witness&&e.upcall(Closure.UPCALL_CONTENT_BAD,new UpcallInfo(this,d.interest,0,c));var j=c.signedInfo.locator;if(j.type==KeyLocatorType.KEYNAME)if(3<LOG&&console.log("KeyLocator contains KEYNAME"),j.keyName.contentName.match(c.name))3<LOG&&console.log("Content is key itself"),f=new Key,f.readDerPublicKey(c.content),f=c.verify(f),f=!0==f?Closure.UPCALL_CONTENT:Closure.UPCALL_CONTENT_BAD,e.upcall(f,new UpcallInfo(this,d.interest,0,c));else{var k=Face.getKeyByName(j.keyName);k?(3<LOG&&
console.log("Local key cache hit"),f=k.rsaKey,f=c.verify(f),f=!0==f?Closure.UPCALL_CONTENT:Closure.UPCALL_CONTENT_BAD,e.upcall(f,new UpcallInfo(this,d.interest,0,c))):(3<LOG&&console.log("Fetch key according to keylocator"),d=new f(c,e,j.keyName,h,null),this.expressInterest(j.keyName.contentName.getPrefix(4),d))}else j.type==KeyLocatorType.KEY?(3<LOG&&console.log("Keylocator contains KEY"),f=new Key,f.readDerPublicKey(j.publicKey),f=c.verify(f),f=!0==f?Closure.UPCALL_CONTENT:Closure.UPCALL_CONTENT_BAD,
e.upcall(Closure.UPCALL_CONTENT,new UpcallInfo(this,d.interest,0,c))):(d=j.certificate,console.log("KeyLocator contains CERT"),console.log(d))}}}}};
Face.prototype.connectAndExecute=function(a){var b=this.getHostAndPort();if(null==b)console.log("ERROR: No more hosts from getHostAndPort"),this.host=null;else if(b.host==this.host&&b.port==this.port)console.log("ERROR: The host returned by getHostAndPort is not alive: "+this.host+":"+this.port);else{this.host=b.host;this.port=b.port;0<LOG&&console.log("connectAndExecute: trying host from getHostAndPort: "+this.host);b=new Interest(new Name("/"));b.interestLifetime=4E3;var c=this,d=setTimeout(function(){0<
LOG&&console.log("connectAndExecute: timeout waiting for host "+c.host);c.connectAndExecute(a)},3E3);this.reconnectAndExpressInterest(b,new Face.ConnectClosure(this,a,d))}};Face.prototype.closeByTransport=function(){this.readyStatus=Face.CLOSED;this.onclose()};Face.ConnectClosure=function(a,b,c){Closure.call(this);this.face=a;this.onConnected=b;this.timerID=c};
Face.ConnectClosure.prototype.upcall=function(a){if(!(a==Closure.UPCALL_CONTENT||a==Closure.UPCALL_CONTENT_UNVERIFIED))return Closure.RESULT_ERR;clearTimeout(this.timerID);this.face.readyStatus=Face.OPENED;this.face.onopen();0<LOG&&console.log("connectAndExecute: connected to host "+this.face.host);this.onConnected();return Closure.RESULT_OK};var NDN=function(a){Face.call(this,a)};NDN.prototype=new Face({getTransport:function(){},getHostAndPort:function(){}});exports.NDN=NDN;NDN.supported=Face.supported;
NDN.UNOPEN=Face.UNOPEN;NDN.OPENED=Face.OPENED;NDN.CLOSED=Face.CLOSED;
/** 
 * Copyright (C) 2013-2014 Regents of the University of California.
 * @author: Jeff Thompson <jefft0@remap.ucla.edu>
 * See COPYING for copyright and distribution information.
 * Implement getAsync and putAsync used by Face using nsISocketTransportService.
 * This is used inside Firefox XPCOM modules.
 */

// Assume already imported the following:
// Components.utils.import("resource://gre/modules/XPCOMUtils.jsm");
// Components.utils.import("resource://gre/modules/NetUtil.jsm");

/**
 * @constructor
 */
var XpcomTransport = function XpcomTransport() 
{
  this.elementListener = null;
  this.socket = null; // nsISocketTransport
  this.outStream = null;
  this.connectedHost = null; // Read by Face.
  this.connectedPort = null; // Read by Face.
  this.httpListener = null;

  this.defaultGetHostAndPort = Face.makeShuffledGetHostAndPort
    (["A.hub.ndn.ucla.edu", "B.hub.ndn.ucla.edu", "C.hub.ndn.ucla.edu", "D.hub.ndn.ucla.edu", 
      "E.hub.ndn.ucla.edu", "F.hub.ndn.ucla.edu", "G.hub.ndn.ucla.edu", "H.hub.ndn.ucla.edu", 
      "I.hub.ndn.ucla.edu", "J.hub.ndn.ucla.edu", "K.hub.ndn.ucla.edu"],
     6363);
};

/**
 * Connect to the host and port in face.  This replaces a previous connection and sets connectedHost
 *   and connectedPort.  Once connected, call onopenCallback().
 * Listen on the port to read an entire binary XML encoded element and call
 *    face.onReceivedElement(element).
 */
XpcomTransport.prototype.connect = function(face, onopenCallback) 
{
  this.elementListener = face;
  this.connectHelper(face.host, face.port, face);

  onopenCallback();
};

/**
 * Do the work to connect to the socket.  This replaces a previous connection and sets connectedHost
 *   and connectedPort.
 * @param {string|object} host The host to connect to. However, if host is not a string, assume it is an
 * nsISocketTransport which is already configured for a host and port, in which case ignore port and set 
 * connectedHost and connectedPort to host.host and host.port .
 * @param {number} port The port number to connect to.  If host is an nsISocketTransport then this is ignored.
 * @param {object} elementListener Listen on the port to read an entire binary XML encoded element and call
 *    elementListener.onReceivedElement(element).
 */
XpcomTransport.prototype.connectHelper = function(host, port, elementListener) 
{
  if (this.socket != null) {
    try {
        this.socket.close(0);
    } catch (ex) {
      console.log("XpcomTransport socket.close exception: " + ex);
    }
    this.socket = null;
  }

  var pump = Components.classes["@mozilla.org/network/input-stream-pump;1"].createInstance
        (Components.interfaces.nsIInputStreamPump);
  if (typeof host == 'string') {
    var transportService = Components.classes["@mozilla.org/network/socket-transport-service;1"].getService
          (Components.interfaces.nsISocketTransportService);
    this.socket = transportService.createTransport(null, 0, host, port, null);
    if (LOG > 0) console.log('XpcomTransport: Connected to ' + host + ":" + port);
    this.connectedHost = host;
    this.connectedPort = port;
  }
  else if (typeof host == 'object') {
    // Assume host is an nsISocketTransport which is already configured for a host and port.
    this.socket = host;
    this.connectedHost = this.socket.host;
    this.connectedPort = this.socket.port;
  }
  this.outStream = this.socket.openOutputStream(1, 0, 0);

  var thisXpcomTransport = this;
  var inStream = this.socket.openInputStream(0, 0, 0);
  var dataListener = {
    elementReader: new ElementReader(elementListener),
    gotFirstData: false,
    
    onStartRequest: function(request, context) {
    },
    onStopRequest: function(request, context, status) {
    },
    onDataAvailable: function(request, context, _inputStream, offset, count) {
      try {
        // Use readInputStreamToString to handle binary data.
        // TODO: Can we go directly from the stream to Buffer?
        var inputString = NetUtil.readInputStreamToString(inStream, count);
        if (!this.gotFirstData) {
          // Check if the connection is from a non-NDN source.
          this.gotFirstData = true;
          if (inputString.substring(0, 4) == "GET ") {
            // Assume this is the start of an HTTP header.
            // Set elementReader null so we ignore further input.
            if (LOG > 0) console.log("XpcomTransport: Got HTTP header. Ignoring the NDN element reader.");
            this.elementReader = null;
            
            if (thisXpcomTransport.httpListener != null)
              thisXpcomTransport.httpListener.onHttpRequest(thisXpcomTransport, inputString);
          }
        }
        
        if (this.elementReader != null)
          this.elementReader.onReceivedData(DataUtils.toNumbersFromString(inputString));
      } catch (ex) {
        console.log("XpcomTransport.onDataAvailable exception: " + ex + "\n" + ex.stack);
      }
    }
  };
  
  pump.init(inStream, -1, -1, 0, 0, true);
  pump.asyncRead(dataListener, null);
};

/**
 * Send the data over the connection created by connect.
 */
XpcomTransport.prototype.send = function(/* Buffer */ data) 
{
  if (this.socket == null || this.connectedHost == null || this.connectedPort == null) {
    console.log("XpcomTransport connection is not established.");
    return;
  }

  var rawDataString = DataUtils.toString(data);
  try {
    this.outStream.write(rawDataString, rawDataString.length);
    this.outStream.flush();
  } catch (ex) {
    if (this.socket.isAlive())
      // The socket is still alive. Assume there could still be incoming data. Just throw the exception.
      throw ex;

    if (LOG > 0) 
      console.log("XpcomTransport.send: Trying to reconnect to " + this.connectedHost + ":" + 
                  this.connectedPort + " and resend after exception: " + ex);

    this.connectHelper(this.connectedHost, this.connectedPort, this.elementListener);
    this.outStream.write(rawDataString, rawDataString.length);
    this.outStream.flush();
  }
};

/**
 * If the first data received on the connection is an HTTP request, call listener.onHttpRequest(transport, request)
 * where transport is this transport object and request is a string with the request.
 * @param {object} listener An object with onHttpRequest, or null to not respond to HTTP messages.
 */
XpcomTransport.prototype.setHttpListener = function(listener)
{
  this.httpListener = listener;
};
/*
 * This class defines MOME types based on the filename extension.
 * Copyright (C) 2013-2014 Regents of the University of California.
 * author: Jeff Thompson <jefft0@remap.ucla.edu>
 * See COPYING for copyright and distribution information.
 */
 
/**
 * MimeTypes contains a mapping of filename extension to MIME type, and a function getContentTypeAndCharset to select it.
 */
var MimeTypes = {
  /**
   * Based on filename, return an object with properties contentType and charset.
   */
  getContentTypeAndCharset: function(filename) {      
      var iDot = filename.lastIndexOf('.');
      if (iDot >= 0) {
          var extension = filename.substr(iDot + 1, filename.length - iDot - 1);
          var contentType = MimeTypes[extension];
          if (contentType != null) {
              var charset = "ISO-8859-1";
              if (contentType.split('/')[0] == "text")
                  charset = "utf-8";
              return { contentType: contentType, charset: charset };
          }
      }
      
      // Use a default.
      return { contentType: "text/html", charset: "utf-8" };
  },
  
  /* For each file extension, define the MIME type.
   */
  "323": "text/h323",
  "%": "application/x-trash",
  "~": "application/x-trash",
  "3gp": "video/3gpp",
  "7z": "application/x-7z-compressed",
  "abw": "application/x-abiword",
  "ai": "application/postscript",
  "aif": "audio/x-aiff",
  "aifc": "audio/x-aiff",
  "aiff": "audio/x-aiff",
  "alc": "chemical/x-alchemy",
  "amr": "audio/amr",
  "anx": "application/annodex",
  "apk": "application/vnd.android.package-archive",
  "art": "image/x-jg",
  "asc": "text/plain",
  "asf": "video/x-ms-asf",
  "asx": "video/x-ms-asf",
  "asn": "chemical/x-ncbi-asn1",
  "atom": "application/atom+xml",
  "atomcat": "application/atomcat+xml",
  "atomsrv": "application/atomserv+xml",
  "au": "audio/basic",
  "snd": "audio/basic",
  "avi": "video/x-msvideo",
  "awb": "audio/amr-wb",
  "axa": "audio/annodex",
  "axv": "video/annodex",
  "b": "chemical/x-molconn-Z",
  "bak": "application/x-trash",
  "bat": "application/x-msdos-program",
  "bcpio": "application/x-bcpio",
  "bib": "text/x-bibtex",
  "bin": "application/octet-stream",
  "bmp": "image/x-ms-bmp",
  "boo": "text/x-boo",
  "book": "application/x-maker",
  "brf": "text/plain",
  "bsd": "chemical/x-crossfire",
  "c": "text/x-csrc",
  "c++": "text/x-c++src",
  "c3d": "chemical/x-chem3d",
  "cab": "application/x-cab",
  "cac": "chemical/x-cache",
  "cache": "chemical/x-cache",
  "cap": "application/cap",
  "cascii": "chemical/x-cactvs-binary",
  "cat": "application/vnd.ms-pki.seccat",
  "cbin": "chemical/x-cactvs-binary",
  "cbr": "application/x-cbr",
  "cbz": "application/x-cbz",
  "cc": "text/x-c++src",
  "cda": "application/x-cdf",
  "cdf": "application/x-cdf",
  "cdr": "image/x-coreldraw",
  "cdt": "image/x-coreldrawtemplate",
  "cdx": "chemical/x-cdx",
  "cdy": "application/vnd.cinderella",
  "cer": "chemical/x-cerius",
  "chm": "chemical/x-chemdraw",
  "chrt": "application/x-kchart",
  "cif": "chemical/x-cif",
  "class": "application/java-vm",
  "cls": "text/x-tex",
  "cmdf": "chemical/x-cmdf",
  "cml": "chemical/x-cml",
  "cod": "application/vnd.rim.cod",
  "com": "application/x-msdos-program",
  "cpa": "chemical/x-compass",
  "cpio": "application/x-cpio",
  "cpp": "text/x-c++src",
  "cpt": "image/x-corelphotopaint",
  "cr2": "image/x-canon-cr2",
  "crl": "application/x-pkcs7-crl",
  "crt": "application/x-x509-ca-cert",
  "crw": "image/x-canon-crw",
  "csd": "audio/csound",
  "csf": "chemical/x-cache-csf",
  "csh": "application/x-csh",
  "csml": "chemical/x-csml",
  "csm": "chemical/x-csml",
  "css": "text/css",
  "csv": "text/csv",
  "ctab": "chemical/x-cactvs-binary",
  "ctx": "chemical/x-ctx",
  "cu": "application/cu-seeme",
  "cub": "chemical/x-gaussian-cube",
  "cxf": "chemical/x-cxf",
  "cef": "chemical/x-cxf",
  "cxx": "text/x-c++src",
  "d": "text/x-dsrc",
  "dat": "application/x-ns-proxy-autoconfig",
  "davmount": "application/davmount+xml",
  "dcr": "application/x-director",
  "deb": "application/x-debian-package",
  "dif": "video/dv",
  "dv": "video/dv",
  "diff": "text/x-diff",
  "patch": "text/x-diff",
  "dir": "application/x-director",
  "djvu": "image/vnd.djvu",
  "djv": "image/vnd.djvu",
  "dl": "video/dl",
  "dll": "application/x-msdos-program",
  "dmg": "application/x-apple-diskimage",
  "dms": "application/x-dms",
  "doc": "application/msword",
  "docm": "application/vnd.ms-word.document.macroEnabled.12",
  "docx": "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
  "dot": "application/msword",
  "dotm": "application/vnd.ms-word.template.macroEnabled.12",
  "dotx": "application/vnd.openxmlformats-officedocument.wordprocessingml.template",
  "dvi": "application/x-dvi",
  "dxr": "application/x-director",
  "emb": "chemical/x-embl-dl-nucleotide",
  "embl": "chemical/x-embl-dl-nucleotide",
  "eml": "message/rfc822",
  "eps": "application/postscript",
  "eps2": "application/postscript",
  "eps3": "application/postscript",
  "epsf": "application/postscript",
  "epsi": "application/postscript",
  "erf": "image/x-epson-erf",
  "es": "application/ecmascript",
  "etx": "text/x-setext",
  "exe": "application/x-msdos-program",
  "ez": "application/andrew-inset",
  "fb": "application/x-maker",
  "fbdoc": "application/x-maker",
  "fch": "chemical/x-gaussian-checkpoint",
  "fchk": "chemical/x-gaussian-checkpoint",
  "fig": "application/x-xfig",
  "flac": "audio/flac",
  "fli": "video/fli",
  "flv": "video/x-flv",
  "fm": "application/x-maker",
  "frame": "application/x-maker",
  "frm": "application/x-maker",
  "gal": "chemical/x-gaussian-log",
  "gam": "chemical/x-gamess-input",
  "gamin": "chemical/x-gamess-input",
  "gan": "application/x-ganttproject",
  "gau": "chemical/x-gaussian-input",
  "gcd": "text/x-pcs-gcd",
  "gcf": "application/x-graphing-calculator",
  "gcg": "chemical/x-gcg8-sequence",
  "gen": "chemical/x-genbank",
  "gf": "application/x-tex-gf",
  "gif": "image/gif",
  "gjc": "chemical/x-gaussian-input",
  "gjf": "chemical/x-gaussian-input",
  "gl": "video/gl",
  "gnumeric": "application/x-gnumeric",
  "gpt": "chemical/x-mopac-graph",
  "gsf": "application/x-font",
  "gsm": "audio/x-gsm",
  "gtar": "application/x-gtar",
  "h": "text/x-chdr",
  "h++": "text/x-c++hdr",
  "hdf": "application/x-hdf",
  "hh": "text/x-c++hdr",
  "hin": "chemical/x-hin",
  "hpp": "text/x-c++hdr",
  "hqx": "application/mac-binhex40",
  "hs": "text/x-haskell",
  "hta": "application/hta",
  "htc": "text/x-component",
  "htm": "text/html",
  "html": "text/html",
  "hxx": "text/x-c++hdr",
  "ica": "application/x-ica",
  "ice": "x-conference/x-cooltalk",
  "ico": "image/x-icon",
  "ics": "text/calendar",
  "icz": "text/calendar",
  "ief": "image/ief",
  "igs": "model/iges",
  "iges": "model/iges",
  "iii": "application/x-iphone",
  "info": "application/x-info",
  "inp": "chemical/x-gamess-input",
  "ins": "application/x-internet-signup",
  "iso": "application/x-iso9660-image",
  "isp": "application/x-internet-signup",
  "istr": "chemical/x-isostar",
  "ist": "chemical/x-isostar",
  "jad": "text/vnd.sun.j2me.app-descriptor",
  "jam": "application/x-jam",
  "jar": "application/java-archive",
  "java": "text/x-java",
  "jdx": "chemical/x-jcamp-dx",
  "dx": "chemical/x-jcamp-dx",
  "jmz": "application/x-jmol",
  "jng": "image/x-jng",
  "jnlp": "application/x-java-jnlp-file",
  "jpe": "image/jpeg",
  "jpeg": "image/jpeg",
  "jpg": "image/jpeg",
  "js": "application/javascript",
  "json": "application/json",
  "kar": "audio/midi",
  "key": "application/pgp-keys",
  "kil": "application/x-killustrator",
  "kin": "chemical/x-kinemage",
  "kml": "application/vnd.google-earth.kml+xml",
  "kmz": "application/vnd.google-earth.kmz",
  "kpr": "application/x-kpresenter",
  "kpt": "application/x-kpresenter",
  "ksp": "application/x-kspread",
  "kwd": "application/x-kword",
  "kwt": "application/x-kword",
  "latex": "application/x-latex",
  "lha": "application/x-lha",
  "lhs": "text/x-literate-haskell",
  "lin": "application/bbolin",
  "lsf": "video/x-la-asf",
  "lsx": "video/x-la-asf",
  "ltx": "text/x-tex",
  "lyx": "application/x-lyx",
  "lzh": "application/x-lzh",
  "lzx": "application/x-lzx",
  "m3g": "application/m3g",
  "m3u": "audio/mpegurl",
  "m3u8": "application/x-mpegURL",
  "m4a": "audio/mpeg",
  "maker": "application/x-maker",
  "man": "application/x-troff-man",
  "manifest": "text/cache-manifest",
  "mcif": "chemical/x-mmcif",
  "mcm": "chemical/x-macmolecule",
  "mdb": "application/msaccess",
  "me": "application/x-troff-me",
  "mesh": "model/mesh",
  "mid": "audio/midi",
  "midi": "audio/midi",
  "mif": "application/x-mif",
  "mm": "application/x-freemind",
  "mmd": "chemical/x-macromodel-input",
  "mmod": "chemical/x-macromodel-input",
  "mmf": "application/vnd.smaf",
  "mml": "text/mathml",
  "mng": "video/x-mng",
  "moc": "text/x-moc",
  "mol": "chemical/x-mdl-molfile",
  "mol2": "chemical/x-mol2",
  "moo": "chemical/x-mopac-out",
  "mop": "chemical/x-mopac-input",
  "mopcrt": "chemical/x-mopac-input",
  "movie": "video/x-sgi-movie",
  "mp2": "audio/mpeg",
  "mp3": "audio/mpeg",
  "mp4": "video/mp4",
  "mpc": "chemical/x-mopac-input",
  "mpe": "video/mpeg",
  "mpeg": "video/mpeg",
  "mpega": "audio/mpeg",
  "mpg": "video/mpeg",
  "mpga": "audio/mpeg",
  "mph": "application/x-comsol",
  "mpv": "video/x-matroska",
  "mkv": "video/x-matroska",
  "ms": "application/x-troff-ms",
  "msh": "model/mesh",
  "msi": "application/x-msi",
  "mvb": "chemical/x-mopac-vib",
  "mxf": "application/mxf",
  "mxu": "video/vnd.mpegurl",
  "nb": "application/mathematica",
  "nbp": "application/mathematica",
  "nc": "application/x-netcdf",
  "nef": "image/x-nikon-nef",
  "nwc": "application/x-nwc",
  "o": "application/x-object",
  "oda": "application/oda",
  "odb": "application/vnd.oasis.opendocument.database",
  "odc": "application/vnd.oasis.opendocument.chart",
  "odf": "application/vnd.oasis.opendocument.formula",
  "odg": "application/vnd.oasis.opendocument.graphics",
  "odi": "application/vnd.oasis.opendocument.image",
  "odm": "application/vnd.oasis.opendocument.text-master",
  "odp": "application/vnd.oasis.opendocument.presentation",
  "ods": "application/vnd.oasis.opendocument.spreadsheet",
  "odt": "application/vnd.oasis.opendocument.text",
  "oga": "audio/ogg",
  "ogg": "audio/ogg",
  "ogv": "video/ogg",
  "ogx": "application/ogg",
  "old": "application/x-trash",
  "one": "application/onenote",
  "onepkg": "application/onenote",
  "onetmp": "application/onenote",
  "onetoc2": "application/onenote",
  "orc": "audio/csound",
  "orf": "image/x-olympus-orf",
  "otg": "application/vnd.oasis.opendocument.graphics-template",
  "oth": "application/vnd.oasis.opendocument.text-web",
  "otp": "application/vnd.oasis.opendocument.presentation-template",
  "ots": "application/vnd.oasis.opendocument.spreadsheet-template",
  "ott": "application/vnd.oasis.opendocument.text-template",
  "oza": "application/x-oz-application",
  "p": "text/x-pascal",
  "pas": "text/x-pascal",
  "p7r": "application/x-pkcs7-certreqresp",
  "pac": "application/x-ns-proxy-autoconfig",
  "pat": "image/x-coreldrawpattern",
  "pbm": "image/x-portable-bitmap",
  "pcap": "application/cap",
  "pcf": "application/x-font",
  "pcx": "image/pcx",
  "pdb": "chemical/x-pdb",
  "ent": "chemical/x-pdb",
  "pdf": "application/pdf",
  "pfa": "application/x-font",
  "pfb": "application/x-font",
  "pgm": "image/x-portable-graymap",
  "pgn": "application/x-chess-pgn",
  "pgp": "application/pgp-signature",
  "php": "application/x-httpd-php",
  "php3": "application/x-httpd-php3",
  "php3p": "application/x-httpd-php3-preprocessed",
  "php4": "application/x-httpd-php4",
  "php5": "application/x-httpd-php5",
  "phps": "application/x-httpd-php-source",
  "pht": "application/x-httpd-php",
  "phtml": "application/x-httpd-php",
  "pk": "application/x-tex-pk",
  "pl": "text/x-perl",
  "pm": "text/x-perl",
  "pls": "audio/x-scpls",
  "png": "image/png",
  "pnm": "image/x-portable-anymap",
  "pot": "text/plain",
  "potm": "application/vnd.ms-powerpoint.template.macroEnabled.12",
  "potx": "application/vnd.openxmlformats-officedocument.presentationml.template",
  "ppam": "application/vnd.ms-powerpoint.addin.macroEnabled.12",
  "ppm": "image/x-portable-pixmap",
  "pps": "application/vnd.ms-powerpoint",
  "ppsm": "application/vnd.ms-powerpoint.slideshow.macroEnabled.12",
  "ppsx": "application/vnd.openxmlformats-officedocument.presentationml.slideshow",
  "ppt": "application/vnd.ms-powerpoint",
  "pptm": "application/vnd.ms-powerpoint.presentation.macroEnabled.12",
  "pptx": "application/vnd.openxmlformats-officedocument.presentationml.presentation",
  "prf": "application/pics-rules",
  "prt": "chemical/x-ncbi-asn1-ascii",
  "ps": "application/postscript",
  "psd": "image/x-photoshop",
  "py": "text/x-python",
  "pyc": "application/x-python-code",
  "pyo": "application/x-python-code",
  "qgs": "application/x-qgis",
  "qt": "video/quicktime",
  "mov": "video/quicktime",
  "qtl": "application/x-quicktimeplayer",
  "ra": "audio/x-realaudio",
  "ram": "audio/x-pn-realaudio",
  "rar": "application/rar",
  "ras": "image/x-cmu-raster",
  "rb": "application/x-ruby",
  "rd": "chemical/x-mdl-rdfile",
  "rdf": "application/rdf+xml",
  "rdp": "application/x-rdp",
  "rgb": "image/x-rgb",
  "rhtml": "application/x-httpd-eruby",
  "rm": "audio/x-pn-realaudio",
  "roff": "application/x-troff",
  "ros": "chemical/x-rosdal",
  "rpm": "application/x-redhat-package-manager",
  "rss": "application/rss+xml",
  "rtf": "application/rtf",
  "rtx": "text/richtext",
  "rxn": "chemical/x-mdl-rxnfile",
  "scala": "text/x-scala",
  "sci": "application/x-scilab",
  "sce": "application/x-scilab",
  "sco": "audio/csound",
  "scr": "application/x-silverlight",
  "sct": "text/scriptlet",
  "wsc": "text/scriptlet",
  "sd": "chemical/x-mdl-sdfile",
  "sdf": "chemical/x-mdl-sdfile",
  "sd2": "audio/x-sd2",
  "sda": "application/vnd.stardivision.draw",
  "sdc": "application/vnd.stardivision.calc",
  "sdd": "application/vnd.stardivision.impress",
  "sds": "application/vnd.stardivision.chart",
  "sdw": "application/vnd.stardivision.writer",
  "ser": "application/java-serialized-object",
  "sfv": "text/x-sfv",
  "sgf": "application/x-go-sgf",
  "sgl": "application/vnd.stardivision.writer-global",
  "sh": "application/x-sh",
  "shar": "application/x-shar",
  "shp": "application/x-qgis",
  "shtml": "text/html",
  "shx": "application/x-qgis",
  "sid": "audio/prs.sid",
  "sik": "application/x-trash",
  "silo": "model/mesh",
  "sis": "application/vnd.symbian.install",
  "sisx": "x-epoc/x-sisx-app",
  "sit": "application/x-stuffit",
  "sitx": "application/x-stuffit",
  "skd": "application/x-koan",
  "skm": "application/x-koan",
  "skp": "application/x-koan",
  "skt": "application/x-koan",
  "sldm": "application/vnd.ms-powerpoint.slide.macroEnabled.12",
  "sldx": "application/vnd.openxmlformats-officedocument.presentationml.slide",
  "smi": "application/smil",
  "smil": "application/smil",
  "spc": "chemical/x-galactic-spc",
  "spl": "application/futuresplash",
  "spx": "audio/ogg",
  "sql": "application/x-sql",
  "src": "application/x-wais-source",
  "stc": "application/vnd.sun.xml.calc.template",
  "std": "application/vnd.sun.xml.draw.template",
  "sti": "application/vnd.sun.xml.impress.template",
  "stl": "application/sla",
  "stw": "application/vnd.sun.xml.writer.template",
  "sty": "text/x-tex",
  "sv4cpio": "application/x-sv4cpio",
  "sv4crc": "application/x-sv4crc",
  "svg": "image/svg+xml",
  "svgz": "image/svg+xml",
  "sw": "chemical/x-swissprot",
  "swf": "application/x-shockwave-flash",
  "swfl": "application/x-shockwave-flash",
  "sxc": "application/vnd.sun.xml.calc",
  "sxd": "application/vnd.sun.xml.draw",
  "sxg": "application/vnd.sun.xml.writer.global",
  "sxi": "application/vnd.sun.xml.impress",
  "sxm": "application/vnd.sun.xml.math",
  "sxw": "application/vnd.sun.xml.writer",
  "t": "application/x-troff",
  "tar": "application/x-tar",
  "taz": "application/x-gtar-compressed",
  "tcl": "application/x-tcl",
  "tk": "text/x-tcl",
  "tex": "text/x-tex",
  "texinfo": "application/x-texinfo",
  "texi": "application/x-texinfo",
  "text": "text/plain",
  "tgf": "chemical/x-mdl-tgf",
  "tgz": "application/x-gtar-compressed",
  "thmx": "application/vnd.ms-officetheme",
  "tiff": "image/tiff",
  "tif": "image/tiff",
  "tm": "text/texmacs",
  "torrent": "application/x-bittorrent",
  "tr": "application/x-troff",
  "ts": "video/MP2T",
  "tsp": "application/dsptype",
  "tsv": "text/tab-separated-values",
  "txt": "text/plain",
  "udeb": "application/x-debian-package",
  "uls": "text/iuls",
  "ustar": "application/x-ustar",
  "val": "chemical/x-ncbi-asn1-binary",
  "aso": "chemical/x-ncbi-asn1-binary",
  "vcd": "application/x-cdlink",
  "vcf": "text/x-vcard",
  "vcs": "text/x-vcalendar",
  "vmd": "chemical/x-vmd",
  "vms": "chemical/x-vamas-iso14976",
  "vrm": "x-world/x-vrml",
  "vsd": "application/vnd.visio",
  "wad": "application/x-doom",
  "wav": "audio/x-wav",
  "wax": "audio/x-ms-wax",
  "wbmp": "image/vnd.wap.wbmp",
  "wbxml": "application/vnd.wap.wbxml",
  "webm": "video/webm",
  "wk": "application/x-123",
  "wm": "video/x-ms-wm",
  "wma": "audio/x-ms-wma",
  "wmd": "application/x-ms-wmd",
  "wml": "text/vnd.wap.wml",
  "wmlc": "application/vnd.wap.wmlc",
  "wmls": "text/vnd.wap.wmlscript",
  "wmlsc": "application/vnd.wap.wmlscriptc",
  "wmv": "video/x-ms-wmv",
  "wmx": "video/x-ms-wmx",
  "wmz": "application/x-ms-wmz",
  "wp5": "application/vnd.wordperfect5.1",
  "wpd": "application/vnd.wordperfect",
  "wrl": "model/vrml",
  "vrml": "model/vrml",
  "wvx": "video/x-ms-wvx",
  "wz": "application/x-wingz",
  "x3d": "model/x3d+xml",
  "x3db": "model/x3d+binary",
  "x3dv": "model/x3d+vrml",
  "xbm": "image/x-xbitmap",
  "xcf": "application/x-xcf",
  "xht": "application/xhtml+xml",
  "xhtml": "application/xhtml+xml",
  "xlam": "application/vnd.ms-excel.addin.macroEnabled.12",
  "xlb": "application/vnd.ms-excel",
  "xls": "application/vnd.ms-excel",
  "xlsb": "application/vnd.ms-excel.sheet.binary.macroEnabled.12",
  "xlsm": "application/vnd.ms-excel.sheet.macroEnabled.12",
  "xlsx": "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  "xlt": "application/vnd.ms-excel",
  "xltm": "application/vnd.ms-excel.template.macroEnabled.12",
  "xltx": "application/vnd.openxmlformats-officedocument.spreadsheetml.template",
  "xml": "application/xml",
  "xpi": "application/x-xpinstall",
  "xpm": "image/x-xpixmap",
  "xsd": "application/xml",
  "xsl": "application/xml",
  "xspf": "application/xspf+xml",
  "xtel": "chemical/x-xtel",
  "xul": "application/vnd.mozilla.xul+xml",
  "xwd": "image/x-xwindowdump",
  "xyz": "chemical/x-xyz",
  "zip": "application/zip",
  "zmt": "chemical/x-mopac-input"
};

exports.MimeTypes = MimeTypes;
