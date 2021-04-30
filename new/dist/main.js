/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	__webpack_require__(1);
	__webpack_require__(2);
	__webpack_require__(3);
	__webpack_require__(4);
	__webpack_require__(5);
	__webpack_require__(6);
	__webpack_require__(7);
	__webpack_require__(8);
	__webpack_require__(9);
	__webpack_require__(10);
	__webpack_require__(11);
	__webpack_require__(12);
	__webpack_require__(13);
	__webpack_require__(14);
	__webpack_require__(15);
	__webpack_require__(16);
	__webpack_require__(17);
	__webpack_require__(18);
	__webpack_require__(19);
	__webpack_require__(20);
	__webpack_require__(21);
	__webpack_require__(22);
	__webpack_require__(23);
	__webpack_require__(24);
	__webpack_require__(25);
	__webpack_require__(26);
	__webpack_require__(27);
	__webpack_require__(28);
	__webpack_require__(29);
	__webpack_require__(30);
	__webpack_require__(31);
	__webpack_require__(32);
	__webpack_require__(33);
	__webpack_require__(34);
	__webpack_require__(35);
	__webpack_require__(36);
	__webpack_require__(37);
	__webpack_require__(38);
	__webpack_require__(39);
	__webpack_require__(40);
	__webpack_require__(41);
	__webpack_require__(42);
	__webpack_require__(43);
	__webpack_require__(44);
	__webpack_require__(45);
	__webpack_require__(46);
	__webpack_require__(47);
	__webpack_require__(48);
	__webpack_require__(49);
	__webpack_require__(50);
	__webpack_require__(51);
	__webpack_require__(52);
	__webpack_require__(53);
	__webpack_require__(54);
	__webpack_require__(55);
	__webpack_require__(56);
	__webpack_require__(57);
	__webpack_require__(58);
	__webpack_require__(59);
	__webpack_require__(60);
	__webpack_require__(61);
	__webpack_require__(62);
	__webpack_require__(63);
	__webpack_require__(64);
	__webpack_require__(65);
	__webpack_require__(66);
	__webpack_require__(67);
	__webpack_require__(68);
	__webpack_require__(69);
	__webpack_require__(70);
	__webpack_require__(71);
	__webpack_require__(72);
	__webpack_require__(73);
	__webpack_require__(74);
	__webpack_require__(75);
	__webpack_require__(76);
	__webpack_require__(77);
	__webpack_require__(78);
	__webpack_require__(79);
	__webpack_require__(80);
	__webpack_require__(81);
	__webpack_require__(82);
	__webpack_require__(83);
	__webpack_require__(84);
	__webpack_require__(85);
	__webpack_require__(86);
	__webpack_require__(87);
	__webpack_require__(88);
	__webpack_require__(89);
	__webpack_require__(90);
	__webpack_require__(91);
	__webpack_require__(92);
	__webpack_require__(93);
	__webpack_require__(94);
	__webpack_require__(95);
	__webpack_require__(96);
	__webpack_require__(97);
	__webpack_require__(98);
	__webpack_require__(99);
	__webpack_require__(100);
	__webpack_require__(101);
	__webpack_require__(102);
	__webpack_require__(103);
	__webpack_require__(104);
	__webpack_require__(105);
	__webpack_require__(106);
	__webpack_require__(107);
	__webpack_require__(108);
	__webpack_require__(109);
	__webpack_require__(110);
	__webpack_require__(111);
	__webpack_require__(112);
	__webpack_require__(113);
	__webpack_require__(114);
	__webpack_require__(115);
	__webpack_require__(116);
	__webpack_require__(117);
	__webpack_require__(118);
	__webpack_require__(119);
	__webpack_require__(120);
	__webpack_require__(121);
	__webpack_require__(122);
	__webpack_require__(123);
	__webpack_require__(124);
	__webpack_require__(125);
	__webpack_require__(126);
	__webpack_require__(127);
	__webpack_require__(128);
	__webpack_require__(129);
	__webpack_require__(130);
	__webpack_require__(131);
	__webpack_require__(132);
	__webpack_require__(133);
	__webpack_require__(134);
	__webpack_require__(135);
	__webpack_require__(136);
	__webpack_require__(137);
	__webpack_require__(138);
	__webpack_require__(139);
	__webpack_require__(140);
	__webpack_require__(141);
	__webpack_require__(142);
	__webpack_require__(143);
	module.exports = __webpack_require__(144);


/***/ }),
/* 1 */
/***/ (function(module, exports) {

	/** @license zlib.js 2012 - imaya [ https://github.com/imaya/zlib.js ] The MIT License */(function() {'use strict';var m=this;function q(c,d){var a=c.split("."),b=m;!(a[0]in b)&&b.execScript&&b.execScript("var "+a[0]);for(var e;a.length&&(e=a.shift());)!a.length&&void 0!==d?b[e]=d:b=b[e]?b[e]:b[e]={}};var s="undefined"!==typeof Uint8Array&&"undefined"!==typeof Uint16Array&&"undefined"!==typeof Uint32Array&&"undefined"!==typeof DataView;function t(c){var d=c.length,a=0,b=Number.POSITIVE_INFINITY,e,f,g,h,k,l,p,n,r,K;for(n=0;n<d;++n)c[n]>a&&(a=c[n]),c[n]<b&&(b=c[n]);e=1<<a;f=new (s?Uint32Array:Array)(e);g=1;h=0;for(k=2;g<=a;){for(n=0;n<d;++n)if(c[n]===g){l=0;p=h;for(r=0;r<g;++r)l=l<<1|p&1,p>>=1;K=g<<16|n;for(r=l;r<e;r+=k)f[r]=K;++h}++g;h<<=1;k<<=1}return[f,a,b]};function u(c,d){this.g=[];this.h=32768;this.d=this.f=this.a=this.l=0;this.input=s?new Uint8Array(c):c;this.m=!1;this.i=v;this.s=!1;if(d||!(d={}))d.index&&(this.a=d.index),d.bufferSize&&(this.h=d.bufferSize),d.bufferType&&(this.i=d.bufferType),d.resize&&(this.s=d.resize);switch(this.i){case w:this.b=32768;this.c=new (s?Uint8Array:Array)(32768+this.h+258);break;case v:this.b=0;this.c=new (s?Uint8Array:Array)(this.h);this.e=this.A;this.n=this.w;this.j=this.z;break;default:throw Error("invalid inflate mode");
	}}var w=0,v=1,x={u:w,t:v};
	u.prototype.k=function(){for(;!this.m;){var c=y(this,3);c&1&&(this.m=!0);c>>>=1;switch(c){case 0:var d=this.input,a=this.a,b=this.c,e=this.b,f=d.length,g=void 0,h=void 0,k=b.length,l=void 0;this.d=this.f=0;if(a+1>=f)throw Error("invalid uncompressed block header: LEN");g=d[a++]|d[a++]<<8;if(a+1>=f)throw Error("invalid uncompressed block header: NLEN");h=d[a++]|d[a++]<<8;if(g===~h)throw Error("invalid uncompressed block header: length verify");if(a+g>d.length)throw Error("input buffer is broken");switch(this.i){case w:for(;e+
	g>b.length;){l=k-e;g-=l;if(s)b.set(d.subarray(a,a+l),e),e+=l,a+=l;else for(;l--;)b[e++]=d[a++];this.b=e;b=this.e();e=this.b}break;case v:for(;e+g>b.length;)b=this.e({p:2});break;default:throw Error("invalid inflate mode");}if(s)b.set(d.subarray(a,a+g),e),e+=g,a+=g;else for(;g--;)b[e++]=d[a++];this.a=a;this.b=e;this.c=b;break;case 1:this.j(z,A);break;case 2:B(this);break;default:throw Error("unknown BTYPE: "+c);}}return this.n()};
	var C=[16,17,18,0,8,7,9,6,10,5,11,4,12,3,13,2,14,1,15],D=s?new Uint16Array(C):C,E=[3,4,5,6,7,8,9,10,11,13,15,17,19,23,27,31,35,43,51,59,67,83,99,115,131,163,195,227,258,258,258],F=s?new Uint16Array(E):E,G=[0,0,0,0,0,0,0,0,1,1,1,1,2,2,2,2,3,3,3,3,4,4,4,4,5,5,5,5,0,0,0],H=s?new Uint8Array(G):G,I=[1,2,3,4,5,7,9,13,17,25,33,49,65,97,129,193,257,385,513,769,1025,1537,2049,3073,4097,6145,8193,12289,16385,24577],J=s?new Uint16Array(I):I,L=[0,0,0,0,1,1,2,2,3,3,4,4,5,5,6,6,7,7,8,8,9,9,10,10,11,11,12,12,13,
	13],M=s?new Uint8Array(L):L,N=new (s?Uint8Array:Array)(288),O,P;O=0;for(P=N.length;O<P;++O)N[O]=143>=O?8:255>=O?9:279>=O?7:8;var z=t(N),Q=new (s?Uint8Array:Array)(30),R,S;R=0;for(S=Q.length;R<S;++R)Q[R]=5;var A=t(Q);function y(c,d){for(var a=c.f,b=c.d,e=c.input,f=c.a,g=e.length,h;b<d;){if(f>=g)throw Error("input buffer is broken");a|=e[f++]<<b;b+=8}h=a&(1<<d)-1;c.f=a>>>d;c.d=b-d;c.a=f;return h}
	function T(c,d){for(var a=c.f,b=c.d,e=c.input,f=c.a,g=e.length,h=d[0],k=d[1],l,p;b<k&&!(f>=g);)a|=e[f++]<<b,b+=8;l=h[a&(1<<k)-1];p=l>>>16;c.f=a>>p;c.d=b-p;c.a=f;return l&65535}
	function B(c){function d(a,c,b){var d,e=this.q,f,g;for(g=0;g<a;)switch(d=T(this,c),d){case 16:for(f=3+y(this,2);f--;)b[g++]=e;break;case 17:for(f=3+y(this,3);f--;)b[g++]=0;e=0;break;case 18:for(f=11+y(this,7);f--;)b[g++]=0;e=0;break;default:e=b[g++]=d}this.q=e;return b}var a=y(c,5)+257,b=y(c,5)+1,e=y(c,4)+4,f=new (s?Uint8Array:Array)(D.length),g,h,k,l;for(l=0;l<e;++l)f[D[l]]=y(c,3);if(!s){l=e;for(e=f.length;l<e;++l)f[D[l]]=0}g=t(f);h=new (s?Uint8Array:Array)(a);k=new (s?Uint8Array:Array)(b);c.q=0;
	c.j(t(d.call(c,a,g,h)),t(d.call(c,b,g,k)))}u.prototype.j=function(c,d){var a=this.c,b=this.b;this.o=c;for(var e=a.length-258,f,g,h,k;256!==(f=T(this,c));)if(256>f)b>=e&&(this.b=b,a=this.e(),b=this.b),a[b++]=f;else{g=f-257;k=F[g];0<H[g]&&(k+=y(this,H[g]));f=T(this,d);h=J[f];0<M[f]&&(h+=y(this,M[f]));b>=e&&(this.b=b,a=this.e(),b=this.b);for(;k--;)a[b]=a[b++-h]}for(;8<=this.d;)this.d-=8,this.a--;this.b=b};
	u.prototype.z=function(c,d){var a=this.c,b=this.b;this.o=c;for(var e=a.length,f,g,h,k;256!==(f=T(this,c));)if(256>f)b>=e&&(a=this.e(),e=a.length),a[b++]=f;else{g=f-257;k=F[g];0<H[g]&&(k+=y(this,H[g]));f=T(this,d);h=J[f];0<M[f]&&(h+=y(this,M[f]));b+k>e&&(a=this.e(),e=a.length);for(;k--;)a[b]=a[b++-h]}for(;8<=this.d;)this.d-=8,this.a--;this.b=b};
	u.prototype.e=function(){var c=new (s?Uint8Array:Array)(this.b-32768),d=this.b-32768,a,b,e=this.c;if(s)c.set(e.subarray(32768,c.length));else{a=0;for(b=c.length;a<b;++a)c[a]=e[a+32768]}this.g.push(c);this.l+=c.length;if(s)e.set(e.subarray(d,d+32768));else for(a=0;32768>a;++a)e[a]=e[d+a];this.b=32768;return e};
	u.prototype.A=function(c){var d,a=this.input.length/this.a+1|0,b,e,f,g=this.input,h=this.c;c&&("number"===typeof c.p&&(a=c.p),"number"===typeof c.v&&(a+=c.v));2>a?(b=(g.length-this.a)/this.o[2],f=258*(b/2)|0,e=f<h.length?h.length+f:h.length<<1):e=h.length*a;s?(d=new Uint8Array(e),d.set(h)):d=h;return this.c=d};
	u.prototype.n=function(){var c=0,d=this.c,a=this.g,b,e=new (s?Uint8Array:Array)(this.l+(this.b-32768)),f,g,h,k;if(0===a.length)return s?this.c.subarray(32768,this.b):this.c.slice(32768,this.b);f=0;for(g=a.length;f<g;++f){b=a[f];h=0;for(k=b.length;h<k;++h)e[c++]=b[h]}f=32768;for(g=this.b;f<g;++f)e[c++]=d[f];this.g=[];return this.buffer=e};
	u.prototype.w=function(){var c,d=this.b;s?this.s?(c=new Uint8Array(d),c.set(this.c.subarray(0,d))):c=this.c.subarray(0,d):(this.c.length>d&&(this.c.length=d),c=this.c);return this.buffer=c};function U(c,d){var a,b;this.input=c;this.a=0;if(d||!(d={}))d.index&&(this.a=d.index),d.verify&&(this.B=d.verify);a=c[this.a++];b=c[this.a++];switch(a&15){case V:this.method=V;break;default:throw Error("unsupported compression method");}if(0!==((a<<8)+b)%31)throw Error("invalid fcheck flag:"+((a<<8)+b)%31);if(b&32)throw Error("fdict flag is not supported");this.r=new u(c,{index:this.a,bufferSize:d.bufferSize,bufferType:d.bufferType,resize:d.resize})}
	U.prototype.k=function(){var c=this.input,d,a;d=this.r.k();this.a=this.r.a;if(this.B){a=(c[this.a++]<<24|c[this.a++]<<16|c[this.a++]<<8|c[this.a++])>>>0;var b=d;if("string"===typeof b){var e=b.split(""),f,g;f=0;for(g=e.length;f<g;f++)e[f]=(e[f].charCodeAt(0)&255)>>>0;b=e}for(var h=1,k=0,l=b.length,p,n=0;0<l;){p=1024<l?1024:l;l-=p;do h+=b[n++],k+=h;while(--p);h%=65521;k%=65521}if(a!==(k<<16|h)>>>0)throw Error("invalid adler-32 checksum");}return d};var V=8;q("Zlib.Inflate",U);q("Zlib.Inflate.prototype.decompress",U.prototype.k);var W={ADAPTIVE:x.t,BLOCK:x.u},X,Y,Z,$;if(Object.keys)X=Object.keys(W);else for(Y in X=[],Z=0,W)X[Z++]=Y;Z=0;for($=X.length;Z<$;++Z)Y=X[Z],q("Zlib.Inflate.BufferType."+Y,W[Y]);}).call(this); //# sourceMappingURL=inflate.min.js.map


/***/ }),
/* 2 */
/***/ (function(module, exports) {

	/**
	 * Endian 类中包含一些值，它们表示用于表示多字节数字的字节顺序。
	 * 字节顺序为 bigEndian（最高有效字节位于最前）或 littleEndian（最低有效字节位于最前）。
	 * @class egret.Endian
	 * @classdesc
	 */
	var Pan3d;
	(function (Pan3d) {
	    var Endian = /** @class */ (function () {
	        function Endian() {
	        }
	        /**
	         * 表示多字节数字的最低有效字节位于字节序列的最前面。
	         * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
	         * @constant {string} egret.Endian.LITTLE_ENDIAN
	         */
	        Endian.LITTLE_ENDIAN = "littleEndian";
	        /**
	         * 表示多字节数字的最高有效字节位于字节序列的最前面。
	         * 十六进制数字 0x12345678 包含 4 个字节（每个字节包含 2 个十六进制数字）。最高有效字节为 0x12。最低有效字节为 0x78。（对于等效的十进制数字 305419896，最高有效数字是 3，最低有效数字是 6）。
	         * @constant {string} egret.Endian.BIG_ENDIAN
	         */
	        Endian.BIG_ENDIAN = "bigEndian";
	        return Endian;
	    }());
	    Pan3d.Endian = Endian;
	    /**
	     * @class ByteArray
	     * @classdesc
	     * ByteArray 类提供用于优化读取、写入以及处理二进制数据的方法和属性。
	     * 注意：ByteArray 类适用于需要在字节层访问数据的高级 开发人员。
	     */
	    var Pan3dByteArray = /** @class */ (function () {
	        /**
	         * 创建一个 ByteArray 对象以引用指定的 ArrayBuffer 对象
	         * @param buffer {ArrayBuffer} 数据源
	         */
	        function Pan3dByteArray(buffer) {
	            this.BUFFER_EXT_SIZE = 0; //Buffer expansion size
	            this.optcode = 0;
	            this.EOF_byte = -1;
	            this.EOF_code_point = -1;
	            this._setArrayBuffer(buffer || new ArrayBuffer(this.BUFFER_EXT_SIZE));
	            this.endian = Endian.BIG_ENDIAN;
	        }
	        Pan3dByteArray.prototype._setArrayBuffer = function (buffer) {
	            this.write_position = buffer.byteLength;
	            this.data = new DataView(buffer);
	            this._position = 0;
	        };
	        Pan3dByteArray.prototype.setdata = function (srcByte) {
	            this._setArrayBuffer(srcByte.buffer);
	        };
	        Object.defineProperty(Pan3dByteArray.prototype, "buffer", {
	            get: function () {
	                return this.data.buffer;
	            },
	            /**
	             * @private
	             */
	            set: function (value) {
	                this.data = new DataView(value);
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(Pan3dByteArray.prototype, "dataView", {
	            get: function () {
	                return this.data;
	            },
	            /**
	             * @private
	             */
	            set: function (value) {
	                this.data = value;
	                this.write_position = value.byteLength;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(Pan3dByteArray.prototype, "bufferOffset", {
	            /**
	             * @private
	             */
	            get: function () {
	                return this.data.byteOffset;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Pan3dByteArray.prototype.getByte = function (i) {
	            return this.data.getUint8(i);
	        };
	        Pan3dByteArray.prototype.setByte = function (i, num) {
	            this.data.setUint8(i, num);
	        };
	        Object.defineProperty(Pan3dByteArray.prototype, "position", {
	            /**
	             * 将文件指针的当前位置（以字节为单位）移动或返回到 ByteArray 对象中。下一次调用读取方法时将在此位置开始读取，或者下一次调用写入方法时将在此位置开始写入。
	             * @member {number} ByteArray#position
	             */
	            get: function () {
	                return this._position;
	            },
	            set: function (value) {
	                //if (this._position < value) {
	                //    if (!this.validate(value - this._position)) {
	                //        return;
	                //    }
	                //}
	                this._position = value;
	                this.write_position = value > this.write_position ? value : this.write_position;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Pan3dByteArray.prototype.reset = function () {
	            this.clear();
	        };
	        Object.defineProperty(Pan3dByteArray.prototype, "length", {
	            /**
	             * ByteArray 对象的长度（以字节为单位）。
	             * 如果将长度设置为大于当前长度的值，则用零填充字节数组的右侧。
	             * 如果将长度设置为小于当前长度的值，将会截断该字节数组。
	             * @member {number} ByteArray#length
	             */
	            get: function () {
	                return this.write_position;
	            },
	            set: function (value) {
	                this.validateBuffer(value, true);
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(Pan3dByteArray.prototype, "bytesAvailable", {
	            /**
	             * 可从字节数组的当前位置到数组末尾读取的数据的字节数。
	             * 每次访问 ByteArray 对象时，将 bytesAvailable 属性与读取方法结合使用，以确保读取有效的数据。
	             * @member {number} ByteArray#bytesAvailable
	             */
	            get: function () {
	                return this.data.byteLength - this._position;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        /**
	         * 清除字节数组的内容，并将 length 和 position 属性重置为 0。
	         * @method ByteArray#clear
	         */
	        Pan3dByteArray.prototype.clear = function () {
	            this._setArrayBuffer(new ArrayBuffer(this.BUFFER_EXT_SIZE));
	        };
	        //public getArray():Uint8Array {
	        //    if (this.array == null) {
	        //        this.array = new Uint8Array(this.data.buffer, this.data.byteOffset, this.data.byteLength);
	        //    }
	        //    return this.array;
	        //}
	        /**
	         * 从字节流中读取布尔值。读取单个字节，如果字节非零，则返回 true，否则返回 false
	         * @return 如果字节不为零，则返回 true，否则返回 false
	         * @method ByteArray#readBoolean
	         */
	        Pan3dByteArray.prototype.readBoolean = function () {
	            //if (!this.validate(ByteArray.SIZE_OF_BOOLEAN)) return null;
	            return this.data.getUint8(this.position++) != 0;
	        };
	        /**
	         * 从字节流中读取带符号的字节
	         * @return 介于 -128 和 127 之间的整数
	         * @method ByteArray#readByte
	         */
	        Pan3dByteArray.prototype.readByte = function () {
	            //if (!this.validate(ByteArray.SIZE_OF_INT8)) return null;
	            return this.data.getInt8(this.position++);
	        };
	        /**
	         * 从字节流中读取 length 参数指定的数据字节数。从 offset 指定的位置开始，将字节读入 bytes 参数指定的 ByteArray 对象中，并将字节写入目标 ByteArray 中
	         * @param bytes 要将数据读入的 ByteArray 对象
	         * @param offset bytes 中的偏移（位置），应从该位置写入读取的数据
	         * @param length 要读取的字节数。默认值 0 导致读取所有可用的数据
	         * @method ByteArray#readBytes
	         */
	        Pan3dByteArray.prototype.readBytes = function (bytes, offset, length) {
	            if (offset === void 0) { offset = 0; }
	            if (length === void 0) { length = 0; }
	            //if (length == 0) {
	            //    length = this.bytesAvailable;
	            //}
	            //else if (!this.validate(length)) {
	            //    return null;
	            //}
	            //if (bytes) {
	            //    bytes.validateBuffer(length);
	            //}
	            //else {
	            //    bytes = new ByteArray(new ArrayBuffer(length));
	            //}
	            //This method is expensive
	            for (var i = 0; i < length; i++) {
	                bytes.data.setUint8(i + offset, this.data.getUint8(this.position++));
	            }
	        };
	        //public get leftBytes():ArrayBuffer {
	        //    var begin = this.data.byteOffset + this.position;
	        //    var end = this.data.byteLength;
	        //    var result = new ArrayBuffer(end - begin);
	        //    var resultBytes = new Uint8Array(result);
	        //    var sourceBytes = new Uint8Array(this.data.buffer, begin, end - begin);
	        //    resultBytes.set(sourceBytes);
	        //    return resultBytes.buffer;
	        //}
	        /**
	         * 从字节流中读取一个 IEEE 754 双精度（64 位）浮点数
	         * @return 双精度（64 位）浮点数
	         * @method ByteArray#readDouble
	         */
	        Pan3dByteArray.prototype.readDouble = function () {
	            //if (!this.validate(ByteArray.SIZE_OF_FLOAT64)) return null;
	            var value = this.data.getFloat64(this.position, this.endian == Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_FLOAT64;
	            return value;
	        };
	        /**
	         * 从字节流中读取一个 IEEE 754 单精度（32 位）浮点数
	         * @return 单精度（32 位）浮点数
	         * @method ByteArray#readFloat
	         */
	        Pan3dByteArray.prototype.readFloat = function () {
	            //if (!this.validate(ByteArray.SIZE_OF_FLOAT32)) return null;
	            var value = this.data.getFloat32(this.position, this.endian == Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_FLOAT32;
	            return value;
	        };
	        /**
	         * 从字节流中读取一个带符号的 32 位整数
	         * @return 介于 -2147483648 和 2147483647 之间的 32 位带符号整数
	         * @method ByteArray#readFloat
	         */
	        Pan3dByteArray.prototype.readInt = function () {
	            //if (!this.validate(ByteArray.SIZE_OF_INT32)) return null;
	            var value = this.data.getInt32(this.position, this.endian == Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_INT32;
	            return value;
	        };
	        Pan3dByteArray.prototype.getInt = function () {
	            var value = this.data.getInt32(this.position, this.endian == Endian.LITTLE_ENDIAN);
	            return value;
	        };
	        Pan3dByteArray.prototype.readInt32 = function () {
	            return this.readInt();
	        };
	        //        public readInt64():Int64{
	        //            if (!this.validate(ByteArray.SIZE_OF_UINT32)) return null;
	        //
	        //            var low = this.data.getInt32(this.position, this.endian == Endian.LITTLE_ENDIAN);
	        //            this.position += ByteArray.SIZE_OF_INT32;
	        //            var high = this.data.getInt32(this.position, this.endian == Endian.LITTLE_ENDIAN);
	        //            this.position += ByteArray.SIZE_OF_INT32;
	        //            return new Int64(low,high);
	        //        }
	        /**
	         * 使用指定的字符集从字节流中读取指定长度的多字节字符串
	         * @param length 要从字节流中读取的字节数
	         * @param charSet 表示用于解释字节的字符集的字符串。可能的字符集字符串包括 "shift-jis"、"cn-gb"、"iso-8859-1"”等
	         * @return UTF-8 编码的字符串
	         * @method ByteArray#readMultiByte
	         */
	        //public readMultiByte(length:number, charSet?:string):string {
	        //    if (!this.validate(length)) return null;
	        //
	        //    return "";
	        //}
	        /**
	         * 从字节流中读取一个带符号的 16 位整数
	         * @return 介于 -32768 和 32767 之间的 16 位带符号整数
	         * @method ByteArray#readShort
	         */
	        Pan3dByteArray.prototype.readShort = function () {
	            //if (!this.validate(ByteArray.SIZE_OF_INT16)) return null;
	            if (this.position >= this.data.byteLength) {
	                //console.log("readShort")
	            }
	            var value = this.data.getInt16(this.position, this.endian == Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_INT16;
	            return value;
	        };
	        //自己添加的读无符号短整行2个字节 Pan
	        Pan3dByteArray.prototype.readFloatTwoByte = function ($scaleNum) {
	            return this.readShort() / $scaleNum;
	            // return (this.readByte() * 127 + this.readByte()) / $scaleNum
	        };
	        //自己添加的读无符号短整行1个字节 lyf
	        Pan3dByteArray.prototype.readFloatOneByte = function () {
	            return (this.readByte() + 128) / 256;
	        };
	        /**
	         * 从字节流中读取无符号的字节
	         * @return 介于 0 和 255 之间的 32 位无符号整数
	         * @method ByteArray#readUnsignedByte
	         */
	        Pan3dByteArray.prototype.readUnsignedByte = function () {
	            //if (!this.validate(ByteArray.SIZE_OF_UINT8)) return null;
	            return this.data.getUint8(this.position++);
	        };
	        Pan3dByteArray.prototype.readUint8 = function () {
	            return this.readUnsignedByte();
	        };
	        Pan3dByteArray.prototype.readInt8 = function () {
	            return this.readByte();
	        };
	        /**
	         * 从字节流中读取一个无符号的 32 位整数
	         * @return 介于 0 和 4294967295 之间的 32 位无符号整数
	         * @method ByteArray#readUnsignedInt
	         */
	        Pan3dByteArray.prototype.readUnsignedInt = function () {
	            //if (!this.validate(ByteArray.SIZE_OF_UINT32)) return null;
	            var value = this.data.getUint32(this.position, this.endian == Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_UINT32;
	            return value;
	        };
	        Pan3dByteArray.prototype.readUint32 = function () {
	            return this.readUnsignedInt();
	        };
	        Pan3dByteArray.prototype.readUint64 = function () {
	            return this.readDouble();
	        };
	        //public readVariableSizedUnsignedInt():number {
	        //    var i:number;
	        //    var c:number = this.data.getUint8(this.position++);
	        //    if (c != 0xFF) {
	        //        i = c << 8;
	        //        c = this.data.getUint8(this.position++);
	        //        i |= c;
	        //    }
	        //    else {
	        //        c = this.data.getUint8(this.position++);
	        //        i = c << 16;
	        //        c = this.data.getUint8(this.position++);
	        //        i |= c << 8;
	        //        c = this.data.getUint8(this.position++);
	        //        i |= c;
	        //    }
	        //    return i;
	        //}
	        //		public readUnsignedInt64():UInt64{
	        //            if (!this.validate(ByteArray.SIZE_OF_UINT32)) return null;
	        //
	        //            var low = this.data.getUint32(this.position, this.endian == Endian.LITTLE_ENDIAN);
	        //            this.position += ByteArray.SIZE_OF_UINT32;
	        //            var high = this.data.getUint32(this.position, this.endian == Endian.LITTLE_ENDIAN);
	        //            this.position += ByteArray.SIZE_OF_UINT32;
	        //			return new UInt64(low,high);
	        //        }
	        /**
	         * 从字节流中读取一个无符号的 16 位整数
	         * @return 介于 0 和 65535 之间的 16 位无符号整数
	         * @method ByteArray#readUnsignedShort
	         */
	        Pan3dByteArray.prototype.readUnsignedShort = function () {
	            //if (!this.validate(ByteArray.SIZE_OF_UINT16)) return null;
	            var value = this.data.getUint16(this.position, this.endian == Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_UINT16;
	            return value;
	        };
	        Pan3dByteArray.prototype.readUint16 = function () {
	            return this.readUnsignedShort();
	        };
	        /**
	         * 从字节流中读取一个 UTF-8 字符串。假定字符串的前缀是无符号的短整型（以字节表示长度）
	         * @return UTF-8 编码的字符串
	         * @method ByteArray#readUTF
	         */
	        Pan3dByteArray.prototype.readUTF = function () {
	            //if (!this.validate(ByteArray.SIZE_OF_UINT16)) return null;
	            var length = this.data.getUint16(this.position, this.endian == Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_UINT16;
	            if (length > 0) {
	                return this.readUTFBytes(length);
	            }
	            else {
	                return "";
	            }
	        };
	        Pan3dByteArray.prototype.readString = function () {
	            return this.readUTF();
	        };
	        /**
	         * 从字节流中读取一个由 length 参数指定的 UTF-8 字节序列，并返回一个字符串
	         * @param length 指明 UTF-8 字节长度的无符号短整型数
	         * @return 由指定长度的 UTF-8 字节组成的字符串
	         * @method ByteArray#readUTFBytes
	         */
	        Pan3dByteArray.prototype.readUTFBytes = function (length) {
	            //if (!this.validate(length)) return null;
	            var bytes = new Uint8Array(this.buffer, this.bufferOffset + this.position, length);
	            this.position += length;
	            /*var bytes: Uint8Array = new Uint8Array(new ArrayBuffer(length));
	             for (var i = 0; i < length; i++) {
	             bytes[i] = this.data.getUint8(this.position++);
	             }*/
	            return this.decodeUTF8(bytes);
	        };
	        Pan3dByteArray.prototype.readStringByLen = function (len) {
	            return this.readUTFBytes(len);
	        };
	        //public readStandardString(length:number):string {
	        //    if (!this.validate(length)) return null;
	        //
	        //    var str:string = "";
	        //
	        //    for (var i = 0; i < length; i++) {
	        //        str += String.fromCharCode(this.data.getUint8(this.position++));
	        //    }
	        //    return str;
	        //}
	        //public readStringTillNull(keepEvenByte:boolean = true):string {
	        //
	        //    var str:string = "";
	        //    var num:number = 0;
	        //    while (this.bytesAvailable > 0) {
	        //        var b:number = this.data.getUint8(this.position++);
	        //        num++;
	        //        if (b != 0) {
	        //            str += String.fromCharCode(b);
	        //        } else {
	        //            if (keepEvenByte && num % 2 != 0) {
	        //                this.position++;
	        //            }
	        //            break;
	        //        }
	        //    }
	        //    return str;
	        //}
	        /**
	         * 写入布尔值。根据 value 参数写入单个字节。如果为 true，则写入 1，如果为 false，则写入 0
	         * @param value 确定写入哪个字节的布尔值。如果该参数为 true，则该方法写入 1；如果该参数为 false，则该方法写入 0
	         * @method ByteArray#writeBoolean
	         */
	        Pan3dByteArray.prototype.writeBoolean = function (value) {
	            this.validateBuffer(Pan3dByteArray.SIZE_OF_BOOLEAN);
	            this.data.setUint8(this.position++, value ? 1 : 0);
	        };
	        /**
	         * 在字节流中写入一个字节
	         * 使用参数的低 8 位。忽略高 24 位
	         * @param value 一个 32 位整数。低 8 位将被写入字节流
	         * @method ByteArray#writeByte
	         */
	        Pan3dByteArray.prototype.writeByte = function (value) {
	            this.validateBuffer(Pan3dByteArray.SIZE_OF_INT8);
	            this.data.setInt8(this.position++, value);
	        };
	        Pan3dByteArray.prototype.writeUint8 = function (value) {
	            this.writeByte(value);
	        };
	        Pan3dByteArray.prototype.writeInt8 = function (value) {
	            this.writeByte(value);
	        };
	        //public writeUnsignedByte(value:number):void {
	        //    this.validateBuffer(ByteArray.SIZE_OF_UINT8);
	        //
	        //    this.data.setUint8(this.position++, value);
	        //}
	        /**
	         * 将指定字节数组 bytes（起始偏移量为 offset，从零开始的索引）中包含 length 个字节的字节序列写入字节流
	         * 如果省略 length 参数，则使用默认长度 0；该方法将从 offset 开始写入整个缓冲区。如果还省略了 offset 参数，则写入整个缓冲区
	         * 如果 offset 或 length 超出范围，它们将被锁定到 bytes 数组的开头和结尾
	         * @param bytes ByteArray 对象
	         * @param offset 从 0 开始的索引，表示在数组中开始写入的位置
	         * @param length 一个无符号整数，表示在缓冲区中的写入范围
	         * @method ByteArray#writeBytes
	         */
	        Pan3dByteArray.prototype.writeBytes = function (bytes, offset, length) {
	            if (offset === void 0) { offset = 0; }
	            if (length === void 0) { length = 0; }
	            var writeLength;
	            if (offset < 0) {
	                return;
	            }
	            if (length < 0) {
	                return;
	            }
	            else if (length == 0) {
	                writeLength = bytes.length - offset;
	            }
	            else {
	                writeLength = Math.min(bytes.length - offset, length);
	            }
	            if (writeLength > 0) {
	                this.validateBuffer(writeLength);
	                var tmp_data = new DataView(bytes.buffer);
	                for (var i = offset; i < writeLength + offset; i++) {
	                    this.data.setUint8(this.position++, tmp_data.getUint8(i));
	                }
	            }
	        };
	        /**
	         * 在字节流中写入一个 IEEE 754 双精度（64 位）浮点数
	         * @param value 双精度（64 位）浮点数
	         * @method ByteArray#writeDouble
	         */
	        Pan3dByteArray.prototype.writeDouble = function (value) {
	            this.validateBuffer(Pan3dByteArray.SIZE_OF_FLOAT64);
	            this.data.setFloat64(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_FLOAT64;
	        };
	        /**
	         * 在字节流中写入一个 IEEE 754 单精度（32 位）浮点数
	         * @param value 单精度（32 位）浮点数
	         * @method ByteArray#writeFloat
	         */
	        Pan3dByteArray.prototype.writeFloat = function (value) {
	            this.validateBuffer(Pan3dByteArray.SIZE_OF_FLOAT32);
	            this.data.setFloat32(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_FLOAT32;
	        };
	        /**
	         * 在字节流中写入一个带符号的 32 位整数
	         * @param value 要写入字节流的整数
	         * @method ByteArray#writeInt
	         */
	        Pan3dByteArray.prototype.writeInt = function (value) {
	            this.validateBuffer(Pan3dByteArray.SIZE_OF_INT32);
	            this.data.setInt32(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_INT32;
	        };
	        Pan3dByteArray.prototype.writeInt32 = function (value) {
	            this.writeInt(value);
	        };
	        /**
	         * 使用指定的字符集将多字节字符串写入字节流
	         * @param value 要写入的字符串值
	         * @param charSet 表示要使用的字符集的字符串。可能的字符集字符串包括 "shift-jis"、"cn-gb"、"iso-8859-1"”等
	         * @method ByteArray#writeMultiByte
	         */
	        //public writeMultiByte(value:string, charSet:string):void {
	        //
	        //}
	        /**
	         * 在字节流中写入一个 16 位整数。使用参数的低 16 位。忽略高 16 位
	         * @param value 32 位整数，该整数的低 16 位将被写入字节流
	         * @method ByteArray#writeShort
	         */
	        Pan3dByteArray.prototype.writeUnsignedShort = function (value) {
	            this.validateBuffer(Pan3dByteArray.SIZE_OF_INT16);
	            this.data.setInt16(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_INT16;
	        };
	        Pan3dByteArray.prototype.writeUint16 = function (value) {
	            this.writeUnsignedShort(value);
	        };
	        Pan3dByteArray.prototype.writeUint64 = function (value) {
	            this.validateBuffer(Pan3dByteArray.SIZE_OF_FLOAT64);
	            this.data.setFloat64(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_FLOAT64;
	        };
	        Pan3dByteArray.prototype.writeShort = function (value) {
	            this.validateBuffer(Pan3dByteArray.SIZE_OF_INT16);
	            this.data.setUint16(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_INT16;
	        };
	        //public writeUnsignedShort(value:number):void {
	        //    this.validateBuffer(ByteArray.SIZE_OF_UINT16);
	        //
	        //    this.data.setUint16(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
	        //    this.position += ByteArray.SIZE_OF_UINT16;
	        //}
	        /**
	         * 在字节流中写入一个无符号的 32 位整数
	         * @param value 要写入字节流的无符号整数
	         * @method ByteArray#writeUnsignedInt
	         */
	        Pan3dByteArray.prototype.writeUnsignedInt = function (value) {
	            this.validateBuffer(Pan3dByteArray.SIZE_OF_UINT32);
	            this.data.setUint32(this.position, value, this.endian == Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_UINT32;
	        };
	        Pan3dByteArray.prototype.writeUint32 = function (value) {
	            this.writeUnsignedInt(value);
	        };
	        /**
	         * 将 UTF-8 字符串写入字节流。先写入以字节表示的 UTF-8 字符串长度（作为 16 位整数），然后写入表示字符串字符的字节
	         * @param value 要写入的字符串值
	         * @method ByteArray#writeUTF
	         */
	        Pan3dByteArray.prototype.writeUTF = function (value) {
	            var utf8bytes = this.encodeUTF8(value);
	            var length = utf8bytes.length;
	            this.validateBuffer(Pan3dByteArray.SIZE_OF_UINT16 + length);
	            this.data.setUint16(this.position, length, this.endian === Endian.LITTLE_ENDIAN);
	            this.position += Pan3dByteArray.SIZE_OF_UINT16;
	            this._writeUint8Array(utf8bytes, false);
	        };
	        Pan3dByteArray.prototype.writeString = function (value) {
	            var strByteArray = new Pan3dByteArray();
	            strByteArray.writeUTFBytes(value);
	            this.writeUint16(strByteArray.length + 1); //标识字符数量
	            this.writeBytes(strByteArray, 0, strByteArray.length);
	            this.writeByte(0);
	        };
	        Pan3dByteArray.prototype.writeStringByLen = function (value, len) {
	            var curPos = this.position;
	            this.writeUTFBytes(value);
	            this.position = curPos + len;
	            this.length = this.position + 1;
	        };
	        Pan3dByteArray.prototype.readVector3D = function ($w) {
	            if ($w === void 0) { $w = false; }
	            var $p = new Pan3d.Vector3D;
	            $p.x = this.readFloat();
	            $p.y = this.readFloat();
	            $p.z = this.readFloat();
	            if ($w) {
	                $p.w = this.readFloat();
	            }
	            return $p;
	        };
	        /**
	         * 将 UTF-8 字符串写入字节流。类似于 writeUTF() 方法，但 writeUTFBytes() 不使用 16 位长度的词为字符串添加前缀
	         * @param value 要写入的字符串值
	         * @method ByteArray#writeUTFBytes
	         */
	        Pan3dByteArray.prototype.writeUTFBytes = function (value) {
	            this._writeUint8Array(this.encodeUTF8(value));
	        };
	        Pan3dByteArray.prototype.toString = function () {
	            return "[ByteArray] length:" + this.length + ", bytesAvailable:" + this.bytesAvailable;
	        };
	        /**
	         * 将 Uint8Array 写入字节流
	         * @param bytes 要写入的Uint8Array
	         * @param validateBuffer
	         */
	        Pan3dByteArray.prototype._writeUint8Array = function (bytes, validateBuffer) {
	            if (validateBuffer === void 0) { validateBuffer = true; }
	            if (validateBuffer) {
	                this.validateBuffer(this.position + bytes.length);
	            }
	            for (var i = 0; i < bytes.length; i++) {
	                this.data.setUint8(this.position++, bytes[i]);
	            }
	        };
	        /**
	         * @private
	         */
	        Pan3dByteArray.prototype.validate = function (len) {
	            //len += this.data.byteOffset;
	            if (this.data.byteLength > 0 && this._position + len <= this.data.byteLength) {
	                return true;
	            }
	            else {
	                //$error(1025);
	            }
	        };
	        /**********************/
	        /*  PRIVATE METHODS   */
	        /**********************/
	        Pan3dByteArray.prototype.validateBuffer = function (len, needReplace) {
	            if (needReplace === void 0) { needReplace = false; }
	            this.write_position = len > this.write_position ? len : this.write_position;
	            len += this._position;
	            if (this.data.byteLength < len || needReplace) {
	                var tmp = new Uint8Array(new ArrayBuffer(len + this.BUFFER_EXT_SIZE));
	                var length = Math.min(this.data.buffer.byteLength, len + this.BUFFER_EXT_SIZE);
	                tmp.set(new Uint8Array(this.data.buffer, 0, length));
	                this.buffer = tmp.buffer;
	            }
	        };
	        /**
	         * UTF-8 Encoding/Decoding
	         */
	        Pan3dByteArray.prototype.encodeUTF8 = function (str) {
	            var pos = 0;
	            var codePoints = this.stringToCodePoints(str);
	            var outputBytes = [];
	            while (codePoints.length > pos) {
	                var code_point = codePoints[pos++];
	                if (this.inRange(code_point, 0xD800, 0xDFFF)) {
	                    this.encoderError(code_point);
	                }
	                else if (this.inRange(code_point, 0x0000, 0x007f)) {
	                    outputBytes.push(code_point);
	                }
	                else {
	                    var count, offset;
	                    if (this.inRange(code_point, 0x0080, 0x07FF)) {
	                        count = 1;
	                        offset = 0xC0;
	                    }
	                    else if (this.inRange(code_point, 0x0800, 0xFFFF)) {
	                        count = 2;
	                        offset = 0xE0;
	                    }
	                    else if (this.inRange(code_point, 0x10000, 0x10FFFF)) {
	                        count = 3;
	                        offset = 0xF0;
	                    }
	                    outputBytes.push(this.div(code_point, Math.pow(64, count)) + offset);
	                    while (count > 0) {
	                        var temp = this.div(code_point, Math.pow(64, count - 1));
	                        outputBytes.push(0x80 + (temp % 64));
	                        count -= 1;
	                    }
	                }
	            }
	            return new Uint8Array(outputBytes);
	        };
	        Pan3dByteArray.prototype.decodeUTF8 = function (data) {
	            var fatal = false;
	            var pos = 0;
	            var result = "";
	            var code_point;
	            var utf8_code_point = 0;
	            var utf8_bytes_needed = 0;
	            var utf8_bytes_seen = 0;
	            var utf8_lower_boundary = 0;
	            while (data.length > pos) {
	                var _byte = data[pos++];
	                if (_byte === this.EOF_byte) {
	                    if (utf8_bytes_needed !== 0) {
	                        code_point = this.decoderError(fatal);
	                    }
	                    else {
	                        code_point = this.EOF_code_point;
	                    }
	                }
	                else {
	                    if (utf8_bytes_needed === 0) {
	                        if (this.inRange(_byte, 0x00, 0x7F)) {
	                            code_point = _byte;
	                        }
	                        else {
	                            if (this.inRange(_byte, 0xC2, 0xDF)) {
	                                utf8_bytes_needed = 1;
	                                utf8_lower_boundary = 0x80;
	                                utf8_code_point = _byte - 0xC0;
	                            }
	                            else if (this.inRange(_byte, 0xE0, 0xEF)) {
	                                utf8_bytes_needed = 2;
	                                utf8_lower_boundary = 0x800;
	                                utf8_code_point = _byte - 0xE0;
	                            }
	                            else if (this.inRange(_byte, 0xF0, 0xF4)) {
	                                utf8_bytes_needed = 3;
	                                utf8_lower_boundary = 0x10000;
	                                utf8_code_point = _byte - 0xF0;
	                            }
	                            else {
	                                this.decoderError(fatal);
	                            }
	                            utf8_code_point = utf8_code_point * Math.pow(64, utf8_bytes_needed);
	                            code_point = null;
	                        }
	                    }
	                    else if (!this.inRange(_byte, 0x80, 0xBF)) {
	                        utf8_code_point = 0;
	                        utf8_bytes_needed = 0;
	                        utf8_bytes_seen = 0;
	                        utf8_lower_boundary = 0;
	                        pos--;
	                        code_point = this.decoderError(fatal, _byte);
	                    }
	                    else {
	                        utf8_bytes_seen += 1;
	                        utf8_code_point = utf8_code_point + (_byte - 0x80) * Math.pow(64, utf8_bytes_needed - utf8_bytes_seen);
	                        if (utf8_bytes_seen !== utf8_bytes_needed) {
	                            code_point = null;
	                        }
	                        else {
	                            var cp = utf8_code_point;
	                            var lower_boundary = utf8_lower_boundary;
	                            utf8_code_point = 0;
	                            utf8_bytes_needed = 0;
	                            utf8_bytes_seen = 0;
	                            utf8_lower_boundary = 0;
	                            if (this.inRange(cp, lower_boundary, 0x10FFFF) && !this.inRange(cp, 0xD800, 0xDFFF)) {
	                                code_point = cp;
	                            }
	                            else {
	                                code_point = this.decoderError(fatal, _byte);
	                            }
	                        }
	                    }
	                }
	                //Decode string
	                if (code_point !== null && code_point !== this.EOF_code_point) {
	                    if (code_point <= 0xFFFF) {
	                        if (code_point > 0)
	                            result += String.fromCharCode(code_point);
	                    }
	                    else {
	                        code_point -= 0x10000;
	                        result += String.fromCharCode(0xD800 + ((code_point >> 10) & 0x3ff));
	                        result += String.fromCharCode(0xDC00 + (code_point & 0x3ff));
	                    }
	                }
	            }
	            return result;
	        };
	        Pan3dByteArray.prototype.encoderError = function (code_point) {
	            //$error(1026, code_point);
	        };
	        Pan3dByteArray.prototype.decoderError = function (fatal, opt_code_point) {
	            if (fatal) {
	                //$error(1027);
	            }
	            return opt_code_point || 0xFFFD;
	        };
	        Pan3dByteArray.prototype.inRange = function (a, min, max) {
	            return min <= a && a <= max;
	        };
	        Pan3dByteArray.prototype.div = function (n, d) {
	            return Math.floor(n / d);
	        };
	        Pan3dByteArray.prototype.stringToCodePoints = function (string) {
	            /** @type {Array.<number>} */
	            var cps = [];
	            // Based on http://www.w3.org/TR/WebIDL/#idl-DOMString
	            var i = 0, n = string.length;
	            while (i < string.length) {
	                var c = string.charCodeAt(i);
	                if (!this.inRange(c, 0xD800, 0xDFFF)) {
	                    cps.push(c);
	                }
	                else if (this.inRange(c, 0xDC00, 0xDFFF)) {
	                    cps.push(0xFFFD);
	                }
	                else { // (inRange(c, 0xD800, 0xDBFF))
	                    if (i === n - 1) {
	                        cps.push(0xFFFD);
	                    }
	                    else {
	                        var d = string.charCodeAt(i + 1);
	                        if (this.inRange(d, 0xDC00, 0xDFFF)) {
	                            var a = c & 0x3FF;
	                            var b = d & 0x3FF;
	                            i += 1;
	                            cps.push(0x10000 + (a << 10) + b);
	                        }
	                        else {
	                            cps.push(0xFFFD);
	                        }
	                    }
	                }
	                i += 1;
	            }
	            return cps;
	        };
	        Pan3dByteArray.SIZE_OF_BOOLEAN = 1;
	        Pan3dByteArray.SIZE_OF_INT8 = 1;
	        Pan3dByteArray.SIZE_OF_INT16 = 2;
	        Pan3dByteArray.SIZE_OF_INT32 = 4;
	        Pan3dByteArray.SIZE_OF_UINT8 = 1;
	        Pan3dByteArray.SIZE_OF_UINT16 = 2;
	        Pan3dByteArray.SIZE_OF_UINT32 = 4;
	        Pan3dByteArray.SIZE_OF_FLOAT32 = 4;
	        Pan3dByteArray.SIZE_OF_FLOAT64 = 8;
	        return Pan3dByteArray;
	    }());
	    Pan3d.Pan3dByteArray = Pan3dByteArray;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Pan3dByteArray.js.map

/***/ }),
/* 3 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var Vector2D = /** @class */ (function () {
	        function Vector2D($x, $y) {
	            if ($x === void 0) { $x = 0; }
	            if ($y === void 0) { $y = 0; }
	            this.x = 0;
	            this.y = 0;
	            this.x = $x;
	            this.y = $y;
	        }
	        Vector2D.prototype.normalize = function () {
	            var le = this.length;
	            if (le == 0) {
	                return;
	            }
	            this.scaleBy(1 / le);
	        };
	        Object.defineProperty(Vector2D.prototype, "length", {
	            get: function () {
	                return Math.sqrt(this.x * this.x + this.y * this.y);
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Vector2D.prototype.scaleBy = function (value) {
	            this.x *= value;
	            this.y *= value;
	        };
	        Vector2D.prototype.sub = function (val) {
	            return new Vector2D(val.x - this.x, val.y - this.y);
	        };
	        Vector2D.prototype.add = function (val) {
	            return new Vector2D(val.x + this.x, val.y + this.y);
	        };
	        Vector2D.prototype.toString = function () {
	            return "Vector2D(" + String(this.x) + "," + String(this.y) + ")";
	        };
	        Vector2D.distance = function (p1, p2) {
	            var xx = p1.x - p2.x;
	            var yy = p1.y - p2.y;
	            return Math.sqrt(xx * xx + yy * yy);
	        };
	        Vector2D.prototype.subtract = function (value) {
	            return new Vector2D(this.x - value.x, this.y - value.y);
	        };
	        return Vector2D;
	    }());
	    Pan3d.Vector2D = Vector2D;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Vector2D.js.map

/***/ }),
/* 4 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var Vector3D = /** @class */ (function () {
	        function Vector3D($x, $y, $z, $w) {
	            if ($x === void 0) { $x = 0; }
	            if ($y === void 0) { $y = 0; }
	            if ($z === void 0) { $z = 0; }
	            if ($w === void 0) { $w = 1; }
	            this.x = 0;
	            this.y = 0;
	            this.z = 0;
	            this.w = 1;
	            this.x = $x;
	            this.y = $y;
	            this.z = $z;
	            this.w = $w;
	        }
	        Vector3D.prototype.normalize = function () {
	            var le = this.length;
	            if (le == 0) {
	                return;
	            }
	            this.scaleBy(1 / le);
	        };
	        Object.defineProperty(Vector3D.prototype, "length", {
	            get: function () {
	                return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Vector3D.prototype.scaleBy = function (value) {
	            this.x *= value;
	            this.y *= value;
	            this.z *= value;
	            this.w *= value;
	        };
	        Vector3D.prototype.divideScalar = function (value) {
	            if (value != 0) {
	                this.x = this.x / value;
	                this.y = this.y / value;
	                this.z = this.z / value;
	            }
	            else {
	                this.x = 0;
	                this.y = 0;
	                this.z = 0;
	            }
	        };
	        Vector3D.prototype.distanceToSquared = function (v) {
	            return Vector3D.distance(this, v);
	        };
	        Vector3D.prototype.scaleByW = function () {
	            this.x *= this.w;
	            this.y *= this.w;
	            this.z *= this.w;
	        };
	        Vector3D.prototype.add = function (value) {
	            return new Vector3D(this.x + value.x, this.y + value.y, this.z + value.z);
	        };
	        Vector3D.prototype.subtract = function (value) {
	            return new Vector3D(this.x - value.x, this.y - value.y, this.z - value.z);
	        };
	        Vector3D.prototype.addByNum = function ($x, $y, $z, $w) {
	            if ($w === void 0) { $w = 0; }
	            this.x += $x;
	            this.y += $y;
	            this.z += $z;
	            this.w += $w;
	        };
	        Vector3D.prototype.setTo = function ($x, $y, $z) {
	            this.x = $x;
	            this.y = $y;
	            this.z = $z;
	        };
	        Vector3D.prototype.setByte = function (byte) {
	            this.x = byte.readFloat();
	            this.y = byte.readFloat();
	            this.z = byte.readFloat();
	        };
	        Vector3D.prototype.cross = function (value) {
	            return new Vector3D(this.y * value.z - this.z * value.y, this.z * value.x - this.x * value.z, this.x * value.y - this.y * value.x);
	        };
	        Vector3D.prototype.dot = function (value) {
	            return this.x * value.x + this.y * value.y + this.z * value.z;
	        };
	        Vector3D.prototype.clone = function () {
	            return new Vector3D(this.x, this.y, this.z);
	        };
	        Vector3D.distance = function (v1, v2) {
	            var x1 = v1.x - v2.x;
	            var y1 = v1.y - v2.y;
	            var z1 = v1.z - v2.z;
	            return Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1);
	        };
	        Vector3D.prototype.toString = function () {
	            return "Vector3D(" + String(this.x) + "," + String(this.y) + "," + String(this.z) + "," + String(this.w) + ")";
	        };
	        Vector3D.dotMulVector = function (a, b) {
	            return a.x * b.x + a.y * b.y + a.z * b.z;
	        };
	        Vector3D.getNrmByTwoVect = function (v0, v1) {
	            var nrm3d = v1.subtract(v0);
	            nrm3d.normalize();
	            return nrm3d;
	        };
	        Vector3D.calTriNormal = function (v0, v1, v2, isNormallize) {
	            if (isNormallize === void 0) { isNormallize = false; }
	            var p1 = v1.subtract(v0);
	            var p2 = v2.subtract(v1);
	            var nrmVec = p1.cross(p2);
	            if (isNormallize) {
	                nrmVec.normalize();
	            }
	            return nrmVec;
	        };
	        /**
	         *  根据三个点确定的平面球 另外一点在面的垂足
	         * @param targetPoint
	         * @param a
	         * @param b
	         * @param c
	         * @return
	         *
	         */
	        Vector3D.getPointPedalInPlane = function (targetPoint, a, b, c) {
	            var planeNomal = this.calTriNormal(a, b, c, true);
	            var plane = [];
	            plane.push(a, b, c);
	            return this.getProjPosition(planeNomal, targetPoint, plane);
	        };
	        /**
	         * p点在三角形b确定的平面内的投影坐标点
	         * @param bNomal
	         * @param p
	         * @param b
	         * @return
	         *
	         */
	        Vector3D.getProjPosition = function (bNomal, targetPoint, bTriPlane) {
	            var checkPoint = targetPoint;
	            var pedal = (bNomal.x * (bTriPlane[0].x - checkPoint.x) + bNomal.y * (bTriPlane[0].y - checkPoint.y) + bNomal.z * (bTriPlane[0].z - checkPoint.z)) / (bNomal.x * bNomal.x + bNomal.y * bNomal.y + bNomal.z * bNomal.z);
	            var pedalVector3d = new Vector3D(checkPoint.x + pedal * bNomal.x, checkPoint.y + pedal * bNomal.y, checkPoint.z + pedal * bNomal.z);
	            return pedalVector3d;
	        };
	        Vector3D.X_AXIS = new Vector3D(1, 0, 0);
	        Vector3D.Y_AXIS = new Vector3D(0, 1, 0);
	        Vector3D.Z_AXIS = new Vector3D(0, 0, 1);
	        return Vector3D;
	    }());
	    Pan3d.Vector3D = Vector3D;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Vector3D.js.map

/***/ }),
/* 5 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Object3D = /** @class */ (function (_super) {
	        __extends(Object3D, _super);
	        function Object3D() {
	            var _this = _super.call(this) || this;
	            _this.rotationX = 0;
	            _this.rotationY = 0;
	            _this.rotationZ = 0;
	            _this.scaleX = 1;
	            _this.scaleY = 1;
	            _this.scaleZ = 1;
	            return _this;
	        }
	        return Object3D;
	    }(Pan3d.Vector3D));
	    Pan3d.Object3D = Object3D;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Object3D.js.map

/***/ }),
/* 6 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var Quaternion = /** @class */ (function () {
	        function Quaternion($x, $y, $z, $w) {
	            if ($x === void 0) { $x = 0; }
	            if ($y === void 0) { $y = 0; }
	            if ($z === void 0) { $z = 0; }
	            if ($w === void 0) { $w = 1; }
	            this.x = 0;
	            this.y = 0;
	            this.z = 0;
	            this.w = 1;
	            this.x = $x;
	            this.y = $y;
	            this.z = $z;
	            this.w = $w;
	        }
	        Quaternion.prototype.print = function () {
	            alert(String(this.x) + " " + String(this.y) + " " + String(this.z) + " " + String(this.w));
	        };
	        Quaternion.prototype.toEulerAngles = function (target) {
	            if (target === void 0) { target = null; }
	            if (!target) {
	                target = new Pan3d.Vector3D;
	            }
	            var x = this.x, y = this.y, z = this.z, w = this.w;
	            target.x = Math.atan2(2 * (w * x + y * z), 1 - 2 * (x * x + y * y));
	            target.y = Math.asin(2 * (w * y - z * x));
	            target.z = Math.atan2(2 * (w * z + x * y), 1 - 2 * (y * y + z * z));
	            return target;
	        };
	        Quaternion.prototype.toMatrix3D = function ($matrix3d) {
	            if ($matrix3d === void 0) { $matrix3d = null; }
	            if (!$matrix3d) {
	                $matrix3d = new Pan3d.Matrix3D;
	            }
	            var out = $matrix3d.m;
	            var x = this.x, y = this.y, z = this.z, w = this.w, x2 = x + x, y2 = y + y, z2 = z + z, xx = x * x2, yx = y * x2, yy = y * y2, zx = z * x2, zy = z * y2, zz = z * z2, wx = w * x2, wy = w * y2, wz = w * z2;
	            out[0] = 1 - yy - zz;
	            out[1] = yx + wz;
	            out[2] = zx - wy;
	            out[3] = 0;
	            out[4] = yx - wz;
	            out[5] = 1 - xx - zz;
	            out[6] = zy + wx;
	            out[7] = 0;
	            out[8] = zx + wy;
	            out[9] = zy - wx;
	            out[10] = 1 - xx - yy;
	            out[11] = 0;
	            out[12] = 0;
	            out[13] = 0;
	            out[14] = 0;
	            out[15] = 1;
	            return $matrix3d;
	        };
	        Quaternion.prototype.fromAxisAngle = function (axis, angle) {
	            var sin_a = Math.sin(angle / 2);
	            var cos_a = Math.cos(angle / 2);
	            this.x = axis.x * sin_a;
	            this.y = axis.y * sin_a;
	            this.z = axis.z * sin_a;
	            this.w = cos_a;
	            this.normalize();
	        };
	        Quaternion.prototype.normalize = function (val) {
	            if (val === void 0) { val = 1; }
	            var mag = val / Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
	            this.x *= mag;
	            this.y *= mag;
	            this.z *= mag;
	            this.w *= mag;
	        };
	        Quaternion.prototype.fromMatrix = function ($matrix) {
	            var m = [0, 0, 0, 0, 0, 0, 0, 0, 0];
	            m[0] = $matrix.m[0];
	            m[1] = $matrix.m[1];
	            m[2] = $matrix.m[2];
	            m[3] = $matrix.m[4];
	            m[4] = $matrix.m[5];
	            m[5] = $matrix.m[6];
	            m[6] = $matrix.m[8];
	            m[7] = $matrix.m[9];
	            m[8] = $matrix.m[10];
	            var fTrace = m[0] + m[4] + m[8];
	            var fRoot;
	            var out = [0, 0, 0, 0];
	            if (fTrace > 0.0) {
	                // |w| > 1/2, may as well choose w > 1/2
	                fRoot = Math.sqrt(fTrace + 1.0); // 2w
	                out[3] = 0.5 * fRoot;
	                fRoot = 0.5 / fRoot; // 1/(4w)
	                out[0] = (m[5] - m[7]) * fRoot;
	                out[1] = (m[6] - m[2]) * fRoot;
	                out[2] = (m[1] - m[3]) * fRoot;
	            }
	            else {
	                // |w| <= 1/2
	                var i = 0;
	                if (m[4] > m[0])
	                    i = 1;
	                if (m[8] > m[i * 3 + i])
	                    i = 2;
	                var j = (i + 1) % 3;
	                var k = (i + 2) % 3;
	                fRoot = Math.sqrt(m[i * 3 + i] - m[j * 3 + j] - m[k * 3 + k] + 1.0);
	                out[i] = 0.5 * fRoot;
	                fRoot = 0.5 / fRoot;
	                out[3] = (m[j * 3 + k] - m[k * 3 + j]) * fRoot;
	                out[j] = (m[j * 3 + i] + m[i * 3 + j]) * fRoot;
	                out[k] = (m[k * 3 + i] + m[i * 3 + k]) * fRoot;
	            }
	            this.x = out[0];
	            this.y = out[1];
	            this.z = out[2];
	            this.w = out[3];
	        };
	        Quaternion.prototype.setMd5W = function () {
	            this.w = 1 - (this.x * this.x + this.y * this.y + this.z * this.z);
	            if (this.w < 0) {
	                this.w = 0;
	            }
	            else {
	                this.w = -Math.sqrt(this.w);
	            }
	        };
	        Quaternion.prototype.slerp = function (qa, qb, t) {
	            var w1 = qa.w, x1 = qa.x, y1 = qa.y, z1 = qa.z;
	            var w2 = qb.w, x2 = qb.x, y2 = qb.y, z2 = qb.z;
	            var dot = w1 * w2 + x1 * x2 + y1 * y2 + z1 * z2;
	            // shortest direction
	            if (dot < 0) {
	                dot = -dot;
	                w2 = -w2;
	                x2 = -x2;
	                y2 = -y2;
	                z2 = -z2;
	            }
	            if (dot < 0.95) {
	                // interpolate angle linearly
	                var angle = Math.acos(dot);
	                var s = 1 / Math.sin(angle);
	                var s1 = Math.sin(angle * (1 - t)) * s;
	                var s2 = Math.sin(angle * t) * s;
	                this.w = w1 * s1 + w2 * s2;
	                this.x = x1 * s1 + x2 * s2;
	                this.y = y1 * s1 + y2 * s2;
	                this.z = z1 * s1 + z2 * s2;
	            }
	            else {
	                // nearly identical angle, interpolate linearly
	                this.w = w1 + t * (w2 - w1);
	                this.x = x1 + t * (x2 - x1);
	                this.y = y1 + t * (y2 - y1);
	                this.z = z1 + t * (z2 - z1);
	                var len = 1.0 / Math.sqrt(this.w * this.w + this.x * this.x + this.y * this.y + this.z * this.z);
	                this.w *= len;
	                this.x *= len;
	                this.y *= len;
	                this.z *= len;
	            }
	        };
	        return Quaternion;
	    }());
	    Pan3d.Quaternion = Quaternion;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Quaternion.js.map

/***/ }),
/* 7 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var Matrix3D = /** @class */ (function () {
	        function Matrix3D() {
	            this.isIdentity = true;
	            var mk = [
	                1, 0, 0, 0,
	                0, 1, 0, 0,
	                0, 0, 1, 0,
	                0, 0, 0, 1
	            ];
	            this.m = new Float32Array(mk);
	        }
	        Matrix3D.prototype.getRotaion = function (_rotationData) {
	            throw new Error("Method not implemented.");
	        };
	        Matrix3D.prototype.clone = function ($target) {
	            if ($target === void 0) { $target = null; }
	            //var $target: Matrix3D = new Matrix3D;
	            if (!$target) {
	                $target = new Matrix3D;
	            }
	            $target.m[0] = this.m[0];
	            $target.m[1] = this.m[1];
	            $target.m[2] = this.m[2];
	            $target.m[3] = this.m[3];
	            $target.m[4] = this.m[4];
	            $target.m[5] = this.m[5];
	            $target.m[6] = this.m[6];
	            $target.m[7] = this.m[7];
	            $target.m[8] = this.m[8];
	            $target.m[9] = this.m[9];
	            $target.m[10] = this.m[10];
	            $target.m[11] = this.m[11];
	            $target.m[12] = this.m[12];
	            $target.m[13] = this.m[13];
	            $target.m[14] = this.m[14];
	            $target.m[15] = this.m[15];
	            return $target;
	        };
	        Object.defineProperty(Matrix3D.prototype, "position", {
	            get: function () {
	                return new Pan3d.Vector3D(this.m[12], this.m[13], this.m[14], this.m[15]);
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Matrix3D.prototype.copyTo = function ($target) {
	            $target.m[0] = this.m[0];
	            $target.m[1] = this.m[1];
	            $target.m[2] = this.m[2];
	            $target.m[3] = this.m[3];
	            $target.m[4] = this.m[4];
	            $target.m[5] = this.m[5];
	            $target.m[6] = this.m[6];
	            $target.m[7] = this.m[7];
	            $target.m[8] = this.m[8];
	            $target.m[9] = this.m[9];
	            $target.m[10] = this.m[10];
	            $target.m[11] = this.m[11];
	            $target.m[12] = this.m[12];
	            $target.m[13] = this.m[13];
	            $target.m[14] = this.m[14];
	            $target.m[15] = this.m[15];
	        };
	        Matrix3D.prototype.identity = function () {
	            this.m[0] = 1;
	            this.m[1] = 0;
	            this.m[2] = 0;
	            this.m[3] = 0;
	            this.m[4] = 0;
	            this.m[5] = 1;
	            this.m[6] = 0;
	            this.m[7] = 0;
	            this.m[8] = 0;
	            this.m[9] = 0;
	            this.m[10] = 1;
	            this.m[11] = 0;
	            this.m[12] = 0;
	            this.m[13] = 0;
	            this.m[14] = 0;
	            this.m[15] = 1;
	        };
	        Matrix3D.prototype.invert = function () {
	            var a = this.m;
	            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, 
	            // Calculate the determinant
	            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	            if (!det) {
	                return null;
	            }
	            det = 1.0 / det;
	            this.m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	            this.m[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	            this.m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	            this.m[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	            this.m[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	            this.m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	            this.m[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	            this.m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	            this.m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	            this.m[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	            this.m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	            this.m[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	            this.m[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	            this.m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	            this.m[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	            this.m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
	        };
	        Matrix3D.prototype.invertToMatrix = function ($target) {
	            var a = this.m;
	            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15], b00 = a00 * a11 - a01 * a10, b01 = a00 * a12 - a02 * a10, b02 = a00 * a13 - a03 * a10, b03 = a01 * a12 - a02 * a11, b04 = a01 * a13 - a03 * a11, b05 = a02 * a13 - a03 * a12, b06 = a20 * a31 - a21 * a30, b07 = a20 * a32 - a22 * a30, b08 = a20 * a33 - a23 * a30, b09 = a21 * a32 - a22 * a31, b10 = a21 * a33 - a23 * a31, b11 = a22 * a33 - a23 * a32, 
	            // Calculate the determinant
	            det = b00 * b11 - b01 * b10 + b02 * b09 + b03 * b08 - b04 * b07 + b05 * b06;
	            if (!det) {
	                return null;
	            }
	            det = 1.0 / det;
	            $target.m[0] = (a11 * b11 - a12 * b10 + a13 * b09) * det;
	            $target.m[1] = (a02 * b10 - a01 * b11 - a03 * b09) * det;
	            $target.m[2] = (a31 * b05 - a32 * b04 + a33 * b03) * det;
	            $target.m[3] = (a22 * b04 - a21 * b05 - a23 * b03) * det;
	            $target.m[4] = (a12 * b08 - a10 * b11 - a13 * b07) * det;
	            $target.m[5] = (a00 * b11 - a02 * b08 + a03 * b07) * det;
	            $target.m[6] = (a32 * b02 - a30 * b05 - a33 * b01) * det;
	            $target.m[7] = (a20 * b05 - a22 * b02 + a23 * b01) * det;
	            $target.m[8] = (a10 * b10 - a11 * b08 + a13 * b06) * det;
	            $target.m[9] = (a01 * b08 - a00 * b10 - a03 * b06) * det;
	            $target.m[10] = (a30 * b04 - a31 * b02 + a33 * b00) * det;
	            $target.m[11] = (a21 * b02 - a20 * b04 - a23 * b00) * det;
	            $target.m[12] = (a11 * b07 - a10 * b09 - a12 * b06) * det;
	            $target.m[13] = (a00 * b09 - a01 * b07 + a02 * b06) * det;
	            $target.m[14] = (a31 * b01 - a30 * b03 - a32 * b00) * det;
	            $target.m[15] = (a20 * b03 - a21 * b01 + a22 * b00) * det;
	        };
	        Matrix3D.prototype.appendTranslation = function (x, y, z) {
	            Matrix3D.tempM.identity();
	            Matrix3D.tempM.prependTranslation(x, y, z);
	            this.append(Matrix3D.tempM);
	        };
	        Matrix3D.prototype.prependTranslation = function (x, y, z) {
	            var out = this.m;
	            out[12] = out[0] * x + out[4] * y + out[8] * z + out[12];
	            out[13] = out[1] * x + out[5] * y + out[9] * z + out[13];
	            out[14] = out[2] * x + out[6] * y + out[10] * z + out[14];
	            out[15] = out[3] * x + out[7] * y + out[11] * z + out[15];
	        };
	        Matrix3D.prototype.transformVector = function ($p) {
	            var out = new Pan3d.Vector3D;
	            out.x = this.m[0] * $p.x + this.m[4] * $p.y + this.m[8] * $p.z + this.m[12] * $p.w;
	            out.y = this.m[1] * $p.x + this.m[5] * $p.y + this.m[9] * $p.z + this.m[13] * $p.w;
	            out.z = this.m[2] * $p.x + this.m[6] * $p.y + this.m[10] * $p.z + this.m[14] * $p.w;
	            out.w = this.m[3] * $p.x + this.m[7] * $p.y + this.m[11] * $p.z + this.m[15] * $p.w;
	            return out;
	        };
	        Matrix3D.prototype.append = function ($matrx3d) {
	            Matrix3D.tempM.m[0] = $matrx3d.m[0];
	            Matrix3D.tempM.m[1] = $matrx3d.m[1];
	            Matrix3D.tempM.m[2] = $matrx3d.m[2];
	            Matrix3D.tempM.m[3] = $matrx3d.m[3];
	            Matrix3D.tempM.m[4] = $matrx3d.m[4];
	            Matrix3D.tempM.m[5] = $matrx3d.m[5];
	            Matrix3D.tempM.m[6] = $matrx3d.m[6];
	            Matrix3D.tempM.m[7] = $matrx3d.m[7];
	            Matrix3D.tempM.m[8] = $matrx3d.m[8];
	            Matrix3D.tempM.m[9] = $matrx3d.m[9];
	            Matrix3D.tempM.m[10] = $matrx3d.m[10];
	            Matrix3D.tempM.m[11] = $matrx3d.m[11];
	            Matrix3D.tempM.m[12] = $matrx3d.m[12];
	            Matrix3D.tempM.m[13] = $matrx3d.m[13];
	            Matrix3D.tempM.m[14] = $matrx3d.m[14];
	            Matrix3D.tempM.m[15] = $matrx3d.m[15];
	            Matrix3D.tempM.prepend(this);
	            this.m[0] = Matrix3D.tempM.m[0];
	            this.m[1] = Matrix3D.tempM.m[1];
	            this.m[2] = Matrix3D.tempM.m[2];
	            this.m[3] = Matrix3D.tempM.m[3];
	            this.m[4] = Matrix3D.tempM.m[4];
	            this.m[5] = Matrix3D.tempM.m[5];
	            this.m[6] = Matrix3D.tempM.m[6];
	            this.m[7] = Matrix3D.tempM.m[7];
	            this.m[8] = Matrix3D.tempM.m[8];
	            this.m[9] = Matrix3D.tempM.m[9];
	            this.m[10] = Matrix3D.tempM.m[10];
	            this.m[11] = Matrix3D.tempM.m[11];
	            this.m[12] = Matrix3D.tempM.m[12];
	            this.m[13] = Matrix3D.tempM.m[13];
	            this.m[14] = Matrix3D.tempM.m[14];
	            this.m[15] = Matrix3D.tempM.m[15];
	            /*
	            var $mat: Matrix3D = $matrx3d.clone();
	            $mat.prepend(this);
	    
	            this.m[0] = $mat.m[0];
	            this.m[1] = $mat.m[1];
	            this.m[2] = $mat.m[2];
	            this.m[3] = $mat.m[3];
	            this.m[4] = $mat.m[4];
	            this.m[5] = $mat.m[5];
	            this.m[6] = $mat.m[6];
	            this.m[7] = $mat.m[7];
	            this.m[8] = $mat.m[8];
	            this.m[9] = $mat.m[9];
	            this.m[10] = $mat.m[10];
	            this.m[11] = $mat.m[11];
	            this.m[12] = $mat.m[12];
	            this.m[13] = $mat.m[13];
	            this.m[14] = $mat.m[14];
	            this.m[15] = $mat.m[15];
	            */
	        };
	        Matrix3D.prototype.prepend = function ($matrx3d) {
	            var b = $matrx3d.m;
	            var out = this.m;
	            var a = this.m;
	            var a00 = a[0], a01 = a[1], a02 = a[2], a03 = a[3], a10 = a[4], a11 = a[5], a12 = a[6], a13 = a[7], a20 = a[8], a21 = a[9], a22 = a[10], a23 = a[11], a30 = a[12], a31 = a[13], a32 = a[14], a33 = a[15];
	            // Cache only the current line of the second matrix
	            var b0 = b[0], b1 = b[1], b2 = b[2], b3 = b[3];
	            out[0] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	            out[1] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	            out[2] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	            out[3] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	            b0 = b[4];
	            b1 = b[5];
	            b2 = b[6];
	            b3 = b[7];
	            out[4] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	            out[5] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	            out[6] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	            out[7] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	            b0 = b[8];
	            b1 = b[9];
	            b2 = b[10];
	            b3 = b[11];
	            out[8] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	            out[9] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	            out[10] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	            out[11] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	            b0 = b[12];
	            b1 = b[13];
	            b2 = b[14];
	            b3 = b[15];
	            out[12] = b0 * a00 + b1 * a10 + b2 * a20 + b3 * a30;
	            out[13] = b0 * a01 + b1 * a11 + b2 * a21 + b3 * a31;
	            out[14] = b0 * a02 + b1 * a12 + b2 * a22 + b3 * a32;
	            out[15] = b0 * a03 + b1 * a13 + b2 * a23 + b3 * a33;
	        };
	        Matrix3D.prototype.appendRotation = function (rad, axis) {
	            Matrix3D.tempM.identity();
	            Matrix3D.tempM.prependRotation(rad, axis);
	            this.append(Matrix3D.tempM);
	        };
	        Matrix3D.prototype.tomat3 = function () {
	            var mk = Array.prototype.concat.apply([], arguments);
	            mk = [
	                1, 0, 0,
	                0, 1, 0,
	                0, 0, 1
	            ];
	            var b = new Float32Array(mk);
	            b[0] = this.m[0];
	            b[1] = this.m[1];
	            b[2] = this.m[2];
	            b[3] = this.m[4];
	            b[4] = this.m[5];
	            b[5] = this.m[6];
	            b[6] = this.m[8];
	            b[7] = this.m[9];
	            b[8] = this.m[10];
	            return b;
	        };
	        Matrix3D.prototype.getRotaionM33 = function (b) {
	            b[0] = this.m[0];
	            b[1] = this.m[1];
	            b[2] = this.m[2];
	            b[3] = this.m[4];
	            b[4] = this.m[5];
	            b[5] = this.m[6];
	            b[6] = this.m[8];
	            b[7] = this.m[9];
	            b[8] = this.m[10];
	        };
	        Matrix3D.prototype.identityScale = function () {
	            /*
	                  var M: Matrix3D = new Matrix3D
	                  var ro: Vector3D = this.toEulerAngles();
	                  M.appendRotation(ro.x , Vector3D.X_AXIS);
	                  M.appendRotation(ro.y , Vector3D.Y_AXIS);
	                  M.appendRotation(ro.z , Vector3D.Z_AXIS);
	                  M.appendTranslation(this.position.x,this.position.y, this.position.z)
	                  this.m = M.m;
	               */
	        };
	        Matrix3D.prototype.identityPostion = function () {
	            this.m[12] = 0;
	            this.m[13] = 0;
	            this.m[14] = 0;
	        };
	        Object.defineProperty(Matrix3D.prototype, "x", {
	            get: function () {
	                return this.m[12];
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(Matrix3D.prototype, "y", {
	            get: function () {
	                return this.m[13];
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(Matrix3D.prototype, "z", {
	            get: function () {
	                return this.m[14];
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Matrix3D.prototype.prependRotation = function (rad, axis) {
	            var out = this.m;
	            var a = this.m;
	            var x = axis.x, y = axis.y, z = axis.z, len = Math.sqrt(x * x + y * y + z * z), s, c, t, a00, a01, a02, a03, a10, a11, a12, a13, a20, a21, a22, a23, b00, b01, b02, b10, b11, b12, b20, b21, b22;
	            if (Math.abs(len) < 0.000001) {
	                return null;
	            }
	            len = 1 / len;
	            x *= len;
	            y *= len;
	            z *= len;
	            s = Math.sin(rad * Math.PI / 180);
	            c = Math.cos(rad * Math.PI / 180);
	            t = 1 - c;
	            a00 = a[0];
	            a01 = a[1];
	            a02 = a[2];
	            a03 = a[3];
	            a10 = a[4];
	            a11 = a[5];
	            a12 = a[6];
	            a13 = a[7];
	            a20 = a[8];
	            a21 = a[9];
	            a22 = a[10];
	            a23 = a[11];
	            // Construct the elements of the rotation matrix
	            b00 = x * x * t + c;
	            b01 = y * x * t + z * s;
	            b02 = z * x * t - y * s;
	            b10 = x * y * t - z * s;
	            b11 = y * y * t + c;
	            b12 = z * y * t + x * s;
	            b20 = x * z * t + y * s;
	            b21 = y * z * t - x * s;
	            b22 = z * z * t + c;
	            // Perform rotation-specific matrix multiplication
	            out[0] = a00 * b00 + a10 * b01 + a20 * b02;
	            out[1] = a01 * b00 + a11 * b01 + a21 * b02;
	            out[2] = a02 * b00 + a12 * b01 + a22 * b02;
	            out[3] = a03 * b00 + a13 * b01 + a23 * b02;
	            out[4] = a00 * b10 + a10 * b11 + a20 * b12;
	            out[5] = a01 * b10 + a11 * b11 + a21 * b12;
	            out[6] = a02 * b10 + a12 * b11 + a22 * b12;
	            out[7] = a03 * b10 + a13 * b11 + a23 * b12;
	            out[8] = a00 * b20 + a10 * b21 + a20 * b22;
	            out[9] = a01 * b20 + a11 * b21 + a21 * b22;
	            out[10] = a02 * b20 + a12 * b21 + a22 * b22;
	            out[11] = a03 * b20 + a13 * b21 + a23 * b22;
	            if (a !== out) { // If the source and destination differ, copy the unchanged last row
	                out[12] = a[12];
	                out[13] = a[13];
	                out[14] = a[14];
	                out[15] = a[15];
	            }
	            return out;
	        };
	        Matrix3D.prototype.prependScale = function (x, y, z) {
	            var a = this.m;
	            var out = this.m;
	            out[0] = a[0] * x;
	            out[1] = a[1] * x;
	            out[2] = a[2] * x;
	            out[3] = a[3] * x;
	            out[4] = a[4] * y;
	            out[5] = a[5] * y;
	            out[6] = a[6] * y;
	            out[7] = a[7] * y;
	            out[8] = a[8] * z;
	            out[9] = a[9] * z;
	            out[10] = a[10] * z;
	            out[11] = a[11] * z;
	            out[12] = a[12];
	            out[13] = a[13];
	            out[14] = a[14];
	            out[15] = a[15];
	            return out;
	        };
	        ;
	        Matrix3D.prototype.appendScale = function (x, y, z) {
	            Matrix3D.tempM.identity();
	            Matrix3D.tempM.prependScale(x, y, z);
	            this.append(Matrix3D.tempM);
	        };
	        Matrix3D.prototype.perspectiveFieldOfViewLH = function (fieldOfViewY, aspectRatio, zNear, zFar) {
	            var yScale = 1.0 / Math.tan(fieldOfViewY / 2.0);
	            var xScale = yScale / aspectRatio;
	            var out = this.m;
	            out[0] = xScale;
	            out[1] = 0;
	            out[2] = 0;
	            out[3] = 0;
	            out[4] = 0;
	            out[5] = yScale;
	            out[6] = 0;
	            out[7] = 0;
	            out[8] = 0;
	            out[9] = 0;
	            out[10] = zFar / (zFar - zNear);
	            out[11] = 1;
	            out[12] = 0;
	            out[13] = 0;
	            out[14] = (zNear * zFar) / (zNear - zFar);
	            out[15] = 0;
	            /*
	              public function perspectiveFieldOfViewLH(fieldOfViewY:Number,
	                                                     aspectRatio:Number,
	                                                     zNear:Number,
	                                                     zFar:Number):void {
	                var yScale:Number = 1.0/Math.tan(fieldOfViewY/2.0);
	                var xScale:Number = yScale / aspectRatio;
	                this.copyRawDataFrom(Vector.<Number>([
	                    xScale, 0.0, 0.0, 0.0,
	                    0.0, yScale, 0.0, 0.0,
	                    0.0, 0.0, zFar/(zFar-zNear), 1.0,
	                    0.0, 0.0, (zNear*zFar)/(zNear-zFar), 0.0
	                ]));
	            }
	    
	            */
	        };
	        Matrix3D.prototype.fromVtoV = function ($basePos, $newPos) {
	            var axis = $basePos.cross($newPos);
	            axis.normalize();
	            var angle = Math.acos($basePos.dot($newPos));
	            var q = new Pan3d.Quaternion();
	            q.fromAxisAngle(axis, angle);
	            q.toMatrix3D(this);
	        };
	        Matrix3D.prototype.buildLookAtLH = function (eyePos, lookAt, up) {
	            var out = this.m;
	            var zaxis = new Pan3d.Vector3D;
	            zaxis.x = lookAt.x - eyePos.x;
	            zaxis.y = lookAt.y - eyePos.y;
	            zaxis.z = lookAt.z - eyePos.z;
	            zaxis.normalize();
	            var xaxis = up.cross(zaxis);
	            xaxis.normalize();
	            var yaxis = zaxis.cross(xaxis);
	            out[0] = xaxis.x;
	            out[1] = yaxis.x;
	            out[2] = zaxis.x;
	            out[3] = 0.0;
	            out[4] = xaxis.y;
	            out[5] = yaxis.y;
	            out[6] = zaxis.y;
	            out[7] = 0.0;
	            out[8] = xaxis.z;
	            out[9] = yaxis.z;
	            out[10] = zaxis.z;
	            out[11] = 0.0;
	            out[12] = -xaxis.dot(eyePos);
	            out[13] = -yaxis.dot(eyePos);
	            out[14] = -zaxis.dot(eyePos);
	            out[15] = 1.0;
	        };
	        Matrix3D.mul = function (a, b, c) {
	            var d = b[0], e = b[1], f = b[2], g = b[3], h = b[4], k = b[5], l = b[6], m = b[7], n = b[8], r = b[9], p = b[10], q = b[11], u = b[12], s = b[13], z = b[14];
	            b = b[15];
	            var t = c[0], v = c[1], w = c[2], x = c[3];
	            a[0] = t * d + v * h + w * n + x * u;
	            a[1] = t * e + v * k + w * r + x * s;
	            a[2] = t * f + v * l + w * p + x * z;
	            a[3] = t * g + v * m + w * q + x * b;
	            t = c[4];
	            v = c[5];
	            w = c[6];
	            x = c[7];
	            a[4] = t * d + v * h + w * n + x * u;
	            a[5] = t * e + v * k + w * r + x * s;
	            a[6] = t * f + v * l + w * p + x * z;
	            a[7] = t * g + v * m + w * q + x * b;
	            t = c[8];
	            v = c[9];
	            w = c[10];
	            x = c[11];
	            a[8] = t * d + v * h + w * n + x * u;
	            a[9] = t * e + v * k + w * r + x * s;
	            a[10] = t * f + v * l + w * p + x * z;
	            a[11] =
	                t * g + v * m + w * q + x * b;
	            t = c[12];
	            v = c[13];
	            w = c[14];
	            x = c[15];
	            a[12] = t * d + v * h + w * n + x * u;
	            a[13] = t * e + v * k + w * r + x * s;
	            a[14] = t * f + v * l + w * p + x * z;
	            a[15] = t * g + v * m + w * q + x * b;
	            return a;
	        };
	        Matrix3D.prototype.toEulerAngles = function () {
	            var $q = new Pan3d.Quaternion();
	            $q.fromMatrix(this);
	            var v3d = $q.toEulerAngles();
	            v3d.scaleBy(180 / Math.PI);
	            return v3d;
	        };
	        Matrix3D.prototype.getRotationing = function () {
	            var out = [0, 0, 0, 0];
	            var scaling = this.getScaling();
	            var is1 = 1 / scaling.x;
	            var is2 = 1 / scaling.y;
	            var is3 = 1 / scaling.z;
	            var sm11 = this.m[0] * is1;
	            var sm12 = this.m[1] * is2;
	            var sm13 = this.m[2] * is3;
	            var sm21 = this.m[4] * is1;
	            var sm22 = this.m[5] * is2;
	            var sm23 = this.m[6] * is3;
	            var sm31 = this.m[8] * is1;
	            var sm32 = this.m[9] * is2;
	            var sm33 = this.m[10] * is3;
	            var ccav = sm11 + sm22 + sm33;
	            var S = 0;
	            if (ccav > 0) {
	                S = Math.sqrt(ccav + 1.0) * 2;
	                out[3] = 0.25 * S;
	                out[0] = (sm23 - sm32) / S;
	                out[1] = (sm31 - sm13) / S;
	                out[2] = (sm12 - sm21) / S;
	            }
	            else if ((sm11 > sm22) && (sm11 > sm33)) {
	                S = Math.sqrt(1.0 + sm11 - sm22 - sm33) * 2;
	                out[3] = (sm23 - sm32) / S;
	                out[0] = 0.25 * S;
	                out[1] = (sm12 + sm21) / S;
	                out[2] = (sm31 + sm13) / S;
	            }
	            else if (sm22 > sm33) {
	                S = Math.sqrt(1.0 + sm22 - sm11 - sm33) * 2;
	                out[3] = (sm31 - sm13) / S;
	                out[0] = (sm12 + sm21) / S;
	                out[1] = 0.25 * S;
	                out[2] = (sm23 + sm32) / S;
	            }
	            else {
	                S = Math.sqrt(1.0 + sm33 - sm11 - sm22) * 2;
	                out[3] = (sm12 - sm21) / S;
	                out[0] = (sm31 + sm13) / S;
	                out[1] = (sm23 + sm32) / S;
	                out[2] = 0.25 * S;
	            }
	            return new Pan3d.Vector3D(out[0], out[1], out[2], out[3]);
	        };
	        Matrix3D.prototype.getScaling = function () {
	            //   http://glmatrix.net/
	            var m11 = this.m[0];
	            var m12 = this.m[1];
	            var m13 = this.m[2];
	            var m21 = this.m[4];
	            var m22 = this.m[5];
	            var m23 = this.m[6];
	            var m31 = this.m[8];
	            var m32 = this.m[9];
	            var m33 = this.m[10];
	            var a = Math.sqrt(m11 * m11 + m12 * m12 + m13 * m13);
	            var b = Math.sqrt(m21 * m21 + m22 * m22 + m23 * m23);
	            var c = Math.sqrt(m31 * m31 + m32 * m32 + m33 * m33);
	            return new Pan3d.Vector3D(a, b, c);
	        };
	        Matrix3D.tempM = new Matrix3D();
	        return Matrix3D;
	    }());
	    Pan3d.Matrix3D = Matrix3D;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Matrix3D.js.map

/***/ }),
/* 8 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var Rectangle = /** @class */ (function () {
	        function Rectangle($x, $y, $width, $height) {
	            if ($x === void 0) { $x = 0; }
	            if ($y === void 0) { $y = 0; }
	            if ($width === void 0) { $width = 1; }
	            if ($height === void 0) { $height = 1; }
	            this.x = 0;
	            this.y = 0;
	            this.width = 0;
	            this.height = 1;
	            this.x = $x;
	            this.y = $y;
	            this.width = $width;
	            this.height = $height;
	        }
	        Rectangle.prototype.clone = function () {
	            return new Rectangle(this.x, this.y, this.width, this.height);
	        };
	        Rectangle.prototype.sets = function ($x, $y, $width, $height) {
	            this.x = $x;
	            this.y = $y;
	            this.width = $width;
	            this.height = $height;
	        };
	        Rectangle.prototype.setRec = function ($rec) {
	            this.x = $rec.x;
	            this.y = $rec.y;
	            this.width = $rec.width;
	            this.height = $rec.height;
	        };
	        Rectangle.prototype.isHitByPoint = function (tx, ty) {
	            return (tx >= this.x && ty >= this.y && tx <= this.x + this.width && ty <= this.y + this.height);
	        };
	        return Rectangle;
	    }());
	    Pan3d.Rectangle = Rectangle;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Rectangle.js.map

/***/ }),
/* 9 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var TimeUtil = /** @class */ (function () {
	        function TimeUtil() {
	        }
	        TimeUtil.getTimer = function () {
	            if (isNaN(TimeUtil.START_TIME)) {
	                TimeUtil.START_TIME = Date.now();
	            }
	            return (Date.now() - TimeUtil.START_TIME);
	        };
	        TimeUtil.getTimerSecond = function () {
	            return TimeUtil.getTimer() / 1000;
	        };
	        //标记现在时间
	        TimeUtil.saveNowTime = function () {
	            this.lastTime = this.getTimer();
	        };
	        //得到使用的时间
	        TimeUtil.getUseTime = function () {
	            return this.getTimer() - this.lastTime;
	        };
	        TimeUtil.getZeroTime = function (nS) {
	            var timestamp4 = new Date(nS * 1000);
	            timestamp4.setHours(0);
	            timestamp4.setMinutes(0);
	            timestamp4.setSeconds(0);
	            return timestamp4.getTime() / 1000;
	        };
	        /**
	        * YYYY-mm-DD HH:MM
	        **/
	        TimeUtil.getLocalTime = function (nS) {
	            var timestamp4 = new Date(nS * 1000); //直接用 new Date(时间戳) 格式转化获得当前时间1-00
	            return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 5);
	        };
	        /**
	        * YYYY-mm-DD
	        **/
	        TimeUtil.getLocalTime0 = function (nS) {
	            var timestamp4 = new Date(nS * 1000); //直接用 new Date(时间戳) 格式转化获得当前时间1-00
	            return timestamp4.toLocaleDateString().replace(/\//g, "-");
	        };
	        /**
	        * YYYY-mm-DD HH:MM:SS
	        **/
	        TimeUtil.getLocalTime1 = function (nS) {
	            var timestamp4 = new Date(nS * 1000); //直接用 new Date(时间戳) 格式转化获得当前时间1-00
	            return timestamp4.toLocaleDateString().replace(/\//g, "-") + " " + timestamp4.toTimeString().substr(0, 8);
	        };
	        /**
	         * HH:MM:SS
	        **/
	        TimeUtil.getLocalTime2 = function (nS) {
	            // var timestamp4 = new Date(nS * 1000 - 8 * 60 * 60 * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间1-00
	            var timestamp4 = new Date(nS * 1000); //直接用 new Date(时间戳) 格式转化获得当前时间1-00
	            ////console.log("--time=",timestamp4.toTimeString());
	            return timestamp4.toTimeString().substr(0, 8);
	        };
	        /**
	         * HH:MM
	        **/
	        TimeUtil.getLocalTime6 = function (nS) {
	            // var timestamp4 = new Date(nS * 1000 - 8 * 60 * 60 * 1000);//直接用 new Date(时间戳) 格式转化获得当前时间1-00
	            var timestamp4 = new Date(nS * 1000); //直接用 new Date(时间戳) 格式转化获得当前时间1-00
	            //console.log("--time=",timestamp4.toTimeString());
	            return timestamp4.toTimeString().substr(0, 5);
	        };
	        /**
	         * MM:SS
	        **/
	        TimeUtil.getLocalTime3 = function (nS) {
	            var timestamp4 = new Date(nS * 1000); //直接用 new Date(时间戳) 格式转化获得当前时间1-00
	            return timestamp4.toTimeString().substr(3, 5);
	        };
	        /**
	         * MM分SS秒
	         */
	        TimeUtil.getLocalTime4 = function (nS) {
	            return float2int(nS / 60) + "分" + (nS % 60) + "秒";
	        };
	        /**
	         * HH时MM分SS秒
	         */
	        TimeUtil.getLocalTime5 = function (nS) {
	            var timestamp4 = new Date(nS * 1000);
	            var str = timestamp4.toTimeString().substr(0, 8);
	            var strAry = str.split(":");
	            return strAry[0] + "时" + strAry[1] + "分" + strAry[2] + "秒";
	        };
	        /**
	         * 时间差转换
	         * DD天HH时MM分SS秒
	         */
	        TimeUtil.getDiffTime1 = function (nS) {
	            var day = float2int(nS / this.dayTime);
	            nS -= day * this.dayTime;
	            var hour = float2int(nS / this.HourTime);
	            nS -= hour * this.HourTime;
	            var minus = float2int(nS / this.MinuteTime);
	            nS -= minus * this.MinuteTime;
	            return day + "天" + hour + "时" + minus + "分" + nS + "秒";
	        };
	        /**
	         * HH:MM:SS
	        **/
	        TimeUtil.getDiffTime2 = function (nS) {
	            var hour = float2int(nS / this.HourTime);
	            nS -= hour * this.HourTime;
	            var minus = float2int(nS / this.MinuteTime);
	            nS -= minus * this.MinuteTime;
	            return this.zeroStr(hour) + ":" + this.zeroStr(minus) + ":" + this.zeroStr(nS);
	        };
	        TimeUtil.zeroStr = function (num) {
	            if (num > 9) {
	                return String(num);
	            }
	            else {
	                return "0" + num;
	            }
	        };
	        TimeUtil.getDelayTimeStr = function ($hourtime) {
	            var hourtime = Math.floor($hourtime / 3600);
	            var timeStr = "";
	            if (hourtime > 24) {
	                timeStr = Math.floor(hourtime / 24) + "天前";
	            }
	            else {
	                if (hourtime >= 1) {
	                    timeStr = hourtime + "小时前";
	                }
	                else {
	                    timeStr = "刚刚";
	                }
	            }
	            return timeStr;
	        };
	        TimeUtil.compareTime = function ($hour, $min) {
	            //服务器当前标准时间
	            return false;
	        };
	        TimeUtil.addTimeTick = function ($time, $fun, $beginTime) {
	            if ($beginTime === void 0) { $beginTime = 0; }
	            var timeFunTick = new TimeFunTick();
	            timeFunTick.alltime = $time;
	            timeFunTick.fun = $fun;
	            timeFunTick.time = $time - $beginTime;
	            TimeUtil.timefunAry.push(timeFunTick);
	        };
	        TimeUtil.removeTimeTick = function ($fun) {
	            for (var i = 0; i < TimeUtil.timefunAry.length; i++) {
	                if (TimeUtil.timefunAry[i]) {
	                    if (TimeUtil.timefunAry[i].fun == $fun) {
	                        //TimeUtil.timefunAry.splice(i, 1);
	                        TimeUtil.timefunAry[i] = null;
	                        break;
	                    }
	                }
	                else {
	                    // throw Error("有重复移除嫌疑");	
	                }
	            }
	        };
	        TimeUtil.addTimeOut = function ($time, $fun) {
	            if (this.hasTimeOut($fun)) {
	                return;
	            }
	            var timeFunTick = new TimeFunOut();
	            timeFunTick.alltime = $time;
	            timeFunTick.fun = $fun;
	            timeFunTick.time = 0;
	            TimeUtil.outTimeFunAry.push(timeFunTick);
	        };
	        TimeUtil.removeTimeOut = function ($fun) {
	            for (var i = 0; i < TimeUtil.outTimeFunAry.length; i++) {
	                if (TimeUtil.outTimeFunAry[i] && TimeUtil.outTimeFunAry[i].fun == $fun) {
	                    //TimeUtil.outTimeFunAry.splice(i, 1);
	                    TimeUtil.outTimeFunAry[i] = null;
	                    break;
	                }
	            }
	        };
	        TimeUtil.hasTimeOut = function ($fun) {
	            for (var i = 0; i < TimeUtil.outTimeFunAry.length; i++) {
	                if (TimeUtil.outTimeFunAry[i] && TimeUtil.outTimeFunAry[i].fun == $fun) {
	                    return true;
	                }
	            }
	            return false;
	        };
	        TimeUtil.addFrameTick = function ($fun) {
	            if (TimeUtil.funAry.indexOf($fun) == -1) {
	                TimeUtil.funAry.push($fun);
	            }
	        };
	        TimeUtil.hasFrameTick = function ($fun) {
	            var index = TimeUtil.funAry.indexOf($fun);
	            if (index != -1) {
	                return true;
	            }
	            return false;
	        };
	        TimeUtil.removeFrameTick = function ($fun) {
	            var index = TimeUtil.funAry.indexOf($fun);
	            if (index != -1) {
	                TimeUtil.funAry[index] = null;
	                //TimeUtil.funAry.splice(index, 1);
	            }
	        };
	        TimeUtil.update = function () {
	            var dtime = TimeUtil.getTimer() - TimeUtil.time;
	            for (var i = 0; i < TimeUtil.funAry.length; i++) {
	                if (TimeUtil.funAry[i]) {
	                    TimeUtil.funAry[i](dtime);
	                }
	            }
	            for (var i = 0; i < TimeUtil.timefunAry.length; i++) {
	                if (TimeUtil.timefunAry[i]) {
	                    TimeUtil.timefunAry[i].update(dtime);
	                }
	            }
	            for (var i = TimeUtil.outTimeFunAry.length - 1; i >= 0; i--) {
	                if (TimeUtil.outTimeFunAry[i] && TimeUtil.outTimeFunAry[i].update(dtime)) {
	                    TimeUtil.outTimeFunAry[i] = null;
	                }
	            }
	            for (var i = TimeUtil.funAry.length - 1; i >= 0; i--) {
	                if (!TimeUtil.funAry[i]) {
	                    TimeUtil.funAry.splice(i, 1);
	                }
	            }
	            for (var i = TimeUtil.timefunAry.length - 1; i >= 0; i--) {
	                if (!TimeUtil.timefunAry[i]) {
	                    TimeUtil.timefunAry.splice(i, 1);
	                }
	            }
	            for (var i = TimeUtil.outTimeFunAry.length - 1; i >= 0; i--) {
	                if (!TimeUtil.outTimeFunAry[i]) {
	                    TimeUtil.outTimeFunAry.splice(i, 1);
	                }
	            }
	            TimeUtil.time = TimeUtil.getTimer();
	        };
	        TimeUtil.funAry = new Array;
	        TimeUtil.timefunAry = new Array;
	        TimeUtil.outTimeFunAry = new Array;
	        TimeUtil.time = 0;
	        TimeUtil.lastTime = 0;
	        TimeUtil.dayTime = 24 * 60 * 60;
	        TimeUtil.HourTime = 60 * 60;
	        TimeUtil.MinuteTime = 60;
	        return TimeUtil;
	    }());
	    Pan3d.TimeUtil = TimeUtil;
	    var TimeFunTick = /** @class */ (function () {
	        function TimeFunTick() {
	            this.alltime = 0;
	            this.time = 0;
	        }
	        TimeFunTick.prototype.update = function (t) {
	            this.time += t;
	            if (this.time >= this.alltime) {
	                this.fun();
	                this.time = 0;
	            }
	        };
	        return TimeFunTick;
	    }());
	    var TimeFunOut = /** @class */ (function () {
	        function TimeFunOut() {
	            this.alltime = 0;
	            this.time = 0;
	        }
	        TimeFunOut.prototype.update = function (t) {
	            this.time += t;
	            if (this.time >= this.alltime) {
	                this.fun();
	                return true;
	            }
	            return false;
	        };
	        return TimeFunOut;
	    }());
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=TimeUtil.js.map

/***/ }),
/* 10 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var ColorTransition = /** @class */ (function () {
	        function ColorTransition() {
	            // this._canvas = document.createElement("canvas");
	            // this._cxt = this._canvas.getContext("2d");
	            // this._gnt = this._cxt.createLinearGradient(0, 0, 128, 0);
	            // this._canvas.style.zIndex = "1";
	            //document.body.appendChild(this._canvas);
	        }
	        ColorTransition.getInstance = function () {
	            if (!this._instance) {
	                this._instance = new ColorTransition();
	            }
	            return this._instance;
	        };
	        ColorTransition.prototype.getImageData = function ($data) {
	            // console.log($data);
	            // var length: number = $data.pos.length;
	            // var color: Vector3D = new Vector3D();
	            // for (var i: number = 0; i < length; i++) {
	            //     hexToArgb($data.color[i], false, color);
	            //     this._gnt.addColorStop($data.pos[i] / 255, 'rgba(' + color.x + ',' + color.y + ',' + color.z + ',' + $data.alpha[i] + ')');
	            // }
	            // this._cxt.fillStyle = this._gnt;
	            // this._cxt.fillRect(0, 0, 128, 2);
	            // return this._cxt.getImageData(0, 0, 128, 2);
	            var imgData = new ImageData(128, 1);
	            var index;
	            for (var i = 0; i < imgData.width; i++) {
	                index = i * 4;
	                imgData.data[index] = 1;
	                imgData.data[index + 1] = 0;
	                imgData.data[index + 2] = 0;
	                imgData.data[index + 3] = 1;
	            }
	            return imgData;
	        };
	        ColorTransition.prototype.getImageDataByVec = function ($data, $lenght) {
	            var imgData = new ImageData(64, 1);
	            var index;
	            var baseindex;
	            for (var i = 0; i < imgData.width; i++) {
	                index = i * 4;
	                baseindex = float2int(i / imgData.width * $lenght) * 4;
	                imgData.data[index] = $data[baseindex];
	                imgData.data[index + 1] = $data[baseindex + 1];
	                imgData.data[index + 2] = $data[baseindex + 2];
	                imgData.data[index + 3] = $data[baseindex + 3];
	            }
	            return imgData;
	        };
	        ColorTransition.prototype.setData = function () {
	        };
	        return ColorTransition;
	    }());
	    Pan3d.ColorTransition = ColorTransition;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ColorTransition.js.map

/***/ }),
/* 11 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var GC = /** @class */ (function () {
	        function GC() {
	        }
	        return GC;
	    }());
	    Pan3d.GC = GC;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=GC.js.map

/***/ }),
/* 12 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var Dictionary = /** @class */ (function () {
	        function Dictionary(init) {
	            this._keys = new Array;
	            this._values = new Array;
	            for (var x = 0; init && x < init.length; x++) {
	                this[init[x].key] = init[x].value;
	                this._keys.push(init[x].key);
	                this._values.push(init[x].value);
	            }
	        }
	        Dictionary.prototype.add = function (key, value) {
	            this[key] = value;
	            this._keys.push(key);
	            this._values.push(value);
	        };
	        Dictionary.prototype.has = function (key) {
	            if (this[key]) {
	                return true;
	            }
	            else {
	                return false;
	            }
	        };
	        Dictionary.prototype.remove = function (key) {
	            var index = this._keys.indexOf(key, 0);
	            this._keys.splice(index, 1);
	            this._values.splice(index, 1);
	            delete this[key];
	        };
	        Dictionary.prototype.keys = function () {
	            return this._keys;
	        };
	        Dictionary.prototype.values = function () {
	            return this._values;
	        };
	        Dictionary.prototype.containsKey = function (key) {
	            if (typeof this[key] === "undefined") {
	                return false;
	            }
	            return true;
	        };
	        Dictionary.prototype.toLookup = function () {
	            return this;
	        };
	        return Dictionary;
	    }());
	    Pan3d.Dictionary = Dictionary;
	    var WeakSet = /** @class */ (function () {
	        function WeakSet() {
	            this._item = new Array;
	        }
	        WeakSet.prototype.add = function ($data) {
	            this._item.push($data);
	        };
	        WeakSet.prototype.has = function ($data) {
	            for (var i = 0; i < this._item.length; i++) {
	                if (this._item[i] == $data) {
	                    return true;
	                }
	            }
	            return false;
	        };
	        return WeakSet;
	    }());
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Dictionary.js.map

/***/ }),
/* 13 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ResCount = /** @class */ (function (_super) {
	        __extends(ResCount, _super);
	        function ResCount(value) {
	            var _this = _super.call(this) || this;
	            _this._useNum = 0;
	            _this.idleTime = 0;
	            _this.scene3D = value;
	            return _this;
	        }
	        Object.defineProperty(ResCount.prototype, "useNum", {
	            get: function () {
	                return this._useNum;
	            },
	            set: function (n) {
	                this._useNum = n;
	                if (this._useNum == 0) {
	                    this.idleTime = 0;
	                }
	            },
	            enumerable: false,
	            configurable: true
	        });
	        ResCount.prototype.clearUseNum = function () {
	            this._useNum--;
	            if (this._useNum <= 0) {
	                this.idleTime = ResCount.GCTime;
	            }
	        };
	        ResCount.GCTime = 4;
	        return ResCount;
	    }(Pan3d.GC));
	    Pan3d.ResCount = ResCount;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ResCount.js.map

/***/ }),
/* 14 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var GroupItem = /** @class */ (function (_super) {
	        __extends(GroupItem, _super);
	        function GroupItem() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        return GroupItem;
	    }(Pan3d.Object3D));
	    Pan3d.GroupItem = GroupItem;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=GroupItem.js.map

/***/ }),
/* 15 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Camera3D = /** @class */ (function (_super) {
	        __extends(Camera3D, _super);
	        function Camera3D() {
	            var _this = _super.call(this) || this;
	            _this.camMatrix3D = new Pan3d.Matrix3D();
	            _this.viewMatrix = new Pan3d.Matrix3D();
	            _this.modelMatrix = new Pan3d.Matrix3D();
	            _this.distance = 500;
	            _this.sceneViewHW = 100;
	            _this.fovw = 300;
	            _this.fovh = 500;
	            _this.rotationX = -30;
	            _this.rotationY = 45;
	            return _this;
	        }
	        Object.defineProperty(Camera3D.prototype, "cameraMatrix", {
	            get: function () {
	                return this.modelMatrix;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Camera3D.prototype.upFrame = function () {
	            this.viewMatrix.identity();
	            this.viewMatrix.perspectiveFieldOfViewLH(1, 1, 10, 5000);
	            this.camMatrix3D.identity();
	            this.camMatrix3D.appendRotation(this.rotationY, Pan3d.Vector3D.Y_AXIS);
	            this.camMatrix3D.appendRotation(this.rotationX, Pan3d.Vector3D.X_AXIS);
	            this.camMatrix3D.appendTranslation(0, 0, this.distance);
	            this.modelMatrix = this.viewMatrix.clone();
	            this.modelMatrix.prepend(this.camMatrix3D);
	            var m = this.camMatrix3D.clone();
	            m.invert();
	            var p = m.transformVector(new Pan3d.Vector3D(0, 0, -this.distance));
	            this.x = p.x;
	            this.y = p.y;
	            this.z = p.z;
	        };
	        return Camera3D;
	    }(Pan3d.Object3D));
	    Pan3d.Camera3D = Camera3D;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Camera3D.js.map

/***/ }),
/* 16 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ObjData = /** @class */ (function (_super) {
	        __extends(ObjData, _super);
	        function ObjData(value) {
	            var _this = _super.call(this, value) || this;
	            _this.vertices = new Array;
	            _this.uvs = new Array;
	            _this.indexs = new Array;
	            _this.lightuvs = new Array;
	            _this.normals = new Array;
	            _this.tangents = new Array;
	            _this.bitangents = new Array;
	            _this.compressBuffer = false;
	            _this.hasdispose = false;
	            return _this;
	        }
	        ObjData.prototype.upToGpu = function () {
	            if (this.indexs.length) {
	                this.treNum = this.indexs.length;
	                var context3D = this.scene3D.context3D;
	                this.vertices ? this.vertexBuffer = context3D.uploadBuff3D(this.vertices) : null;
	                this.uvs ? this.uvBuffer = context3D.uploadBuff3D(this.uvs) : null;
	                this.normals ? this.normalsBuffer = context3D.uploadBuff3D(this.normals) : null;
	                this.indexs ? this.indexBuffer = context3D.uploadIndexBuff3D(this.indexs) : null;
	            }
	        };
	        return ObjData;
	    }(Pan3d.ResCount));
	    Pan3d.ObjData = ObjData;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ObjData.js.map

/***/ }),
/* 17 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var Context3D = /** @class */ (function () {
	        function Context3D(value) {
	            this.webGlRender = value;
	            this._canvas = document.createElement("canvas");
	            this._canvas.style.zIndex = "3";
	            this._canvas.width = 200;
	            this._canvas.height = 200;
	            this._canvas.style.left = 200;
	            this._canvas.style.top = 300;
	            this._ctx = this._canvas.getContext("2d");
	            this._ctx.textBaseline = Pan3d.TextAlign.TOP;
	        }
	        Context3D.prototype.getContext2D = function ($width, $height, alianDefault) {
	            if (alianDefault === void 0) { alianDefault = true; }
	            this._canvas.width = $width;
	            this._canvas.height = $height;
	            this._ctx.clearRect(0, 0, $width, $height);
	            alianDefault = true;
	            if (alianDefault) {
	                this._ctx.textBaseline = Pan3d.TextAlign.TOP;
	                this._ctx.textAlign = Pan3d.TextAlign.LEFT;
	            }
	            return this._ctx;
	        };
	        Context3D.prototype.getTexture = function ($img, $wrap, $filter, $mipmap) {
	            if ($wrap === void 0) { $wrap = 0; }
	            if ($filter === void 0) { $filter = 0; }
	            if ($mipmap === void 0) { $mipmap = 0; }
	            var gl = this.webGlRender;
	            var $textureRect = new Pan3d.Rectangle(0, 0, Math.pow(2, Math.ceil(Math.log($img.width) / Math.log(2))), Math.pow(2, Math.ceil(Math.log($img.height) / Math.log(2))));
	            if ($textureRect.width != $img.width || $textureRect.height != $img.height) {
	                //console.log("图片尺寸不为2幂")
	                //alert("图片尺寸不为2幂")
	                var $ctx = this.getContext2D($textureRect.width, $textureRect.height, false);
	                $ctx.drawImage($img, 0, 0, $img.width, $img.height, 0, 0, $textureRect.width, $textureRect.height);
	                return this.getTexture($ctx.canvas, 0, 0);
	            }
	            var textureObject = gl.createTexture();
	            gl.bindTexture(gl.TEXTURE_2D, textureObject);
	            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, $img);
	            var filterNum;
	            if ($filter == 0) {
	                filterNum = gl.LINEAR;
	            }
	            else {
	                filterNum = gl.NEAREST;
	            }
	            var mipNum;
	            if ($filter == 0) {
	                if ($mipmap == 0) {
	                    mipNum = gl.LINEAR;
	                }
	                else if ($mipmap == 1) {
	                    mipNum = gl.LINEAR_MIPMAP_LINEAR;
	                }
	                else if ($mipmap == 2) {
	                    mipNum = gl.LINEAR_MIPMAP_NEAREST;
	                }
	            }
	            else {
	                if ($mipmap == 0) {
	                    mipNum = gl.NEAREST;
	                }
	                else if ($mipmap == 1) {
	                    mipNum = gl.NEAREST_MIPMAP_LINEAR;
	                }
	                else if ($mipmap == 2) {
	                    mipNum = gl.NEAREST_MIPMAP_NEAREST;
	                }
	            }
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filterNum);
	            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, mipNum);
	            if ($wrap == 0) {
	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.REPEAT);
	            }
	            else {
	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
	                gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
	            }
	            if ($mipmap != 0) {
	                gl.generateMipmap(gl.TEXTURE_2D);
	            }
	            return textureObject;
	        };
	        Context3D.prototype.pushVa = function (dataBuffer) {
	            var gl = this.webGlRender;
	            if (gl.getParameter(gl.ARRAY_BUFFER_BINDING) == dataBuffer) {
	                return true;
	            }
	            else {
	                gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
	                return false;
	            }
	        };
	        Context3D.prototype.setVaOffset = function (dataId, dataWidth, stride, offset) {
	            var gl = this.webGlRender;
	            gl.enableVertexAttribArray(dataId);
	            gl.vertexAttribPointer(dataId, dataWidth, gl.FLOAT, false, stride, offset);
	        };
	        Context3D.prototype.setBaseRender = function () {
	            var gl = this.webGlRender;
	            gl.bindFramebuffer(gl.FRAMEBUFFER, null);
	            gl.clearColor(60 / 255, 60 / 255, 60 / 255, 1.0);
	            gl.clearDepth(1.0);
	            gl.clearStencil(0.0);
	            gl.enable(gl.DEPTH_TEST);
	            gl.depthMask(true);
	            gl.enable(gl.BLEND);
	            gl.frontFace(gl.CW);
	            gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT | gl.STENCIL_BUFFER_BIT);
	            gl.disable(gl.CULL_FACE);
	        };
	        Context3D.prototype.drawCall = function ($iBuffer, $numTri) {
	            var gl = this.webGlRender;
	            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
	            gl.drawElements(gl.TRIANGLES, $numTri, gl.UNSIGNED_SHORT, 0);
	        };
	        Context3D.prototype.drawLine = function ($iBuffer, $numTri) {
	            var gl = this.webGlRender;
	            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
	            gl.drawElements(gl.LINES, $numTri, gl.UNSIGNED_SHORT, 0);
	        };
	        Context3D.prototype.setVa = function (dataId, dataWidth, dataBuffer) {
	            var gl = this.webGlRender;
	            gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
	            gl.enableVertexAttribArray(dataId);
	            gl.vertexAttribPointer(dataId, dataWidth, gl.FLOAT, false, 0, 0);
	        };
	        Context3D.prototype.setProgram = function ($program) {
	            var gl = this.webGlRender;
	            gl.useProgram($program);
	        };
	        Context3D.prototype.uploadIndexBuff3D = function ($iStrData) {
	            var gl = this.webGlRender;
	            var elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
	            var $iBuffer = gl.createBuffer();
	            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
	            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array($iStrData), gl.STATIC_DRAW);
	            if (elementArrayBuffer) {
	                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
	            }
	            return $iBuffer;
	        };
	        Context3D.prototype.uploadBuff3D = function ($jsData) {
	            var gl = this.webGlRender;
	            var arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
	            var $buffData = gl.createBuffer();
	            gl.bindBuffer(gl.ARRAY_BUFFER, $buffData);
	            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array($jsData), gl.STATIC_DRAW);
	            if (arrayBuffer) {
	                gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
	            }
	            return $buffData;
	        };
	        Context3D.prototype.getLocation = function ($program, $name) {
	            return this.webGlRender.getUniformLocation($program, $name);
	        };
	        Context3D.prototype.setVcMatrix3fv = function ($program, $name, $m) {
	            var gl = this.webGlRender;
	            gl.uniformMatrix3fv($program.getWebGLUniformLocation($name), false, $m);
	        };
	        Context3D.prototype.setVcMatrix4fv = function ($program, $name, $m) {
	            this.webGlRender.uniformMatrix4fv($program.getWebGLUniformLocation($name), false, $m);
	        };
	        Context3D.prototype.setVc4fv = function ($program, $name, $m) {
	            var gl = this.webGlRender;
	            gl.uniform4fv($program.getWebGLUniformLocation($name), $m);
	        };
	        Context3D.prototype.setVc3fv = function ($program, $name, $m) {
	            var gl = this.webGlRender;
	            gl.uniform3fv($program.getWebGLUniformLocation($name), $m);
	        };
	        Context3D.prototype.setVc2fv = function ($program, $name, $m) {
	            var gl = this.webGlRender;
	            gl.uniform2fv($program.getWebGLUniformLocation($name), $m);
	        };
	        Context3D.prototype.setRenderTextureCube = function ($program, $name, $textureObject, $level) {
	            var gl = this.webGlRender;
	            if ($level == 0) {
	                gl.activeTexture(gl.TEXTURE0);
	            }
	            else if ($level == 1) {
	                gl.activeTexture(gl.TEXTURE1);
	            }
	            else if ($level == 2) {
	                gl.activeTexture(gl.TEXTURE2);
	            }
	            else if ($level == 3) {
	                gl.activeTexture(gl.TEXTURE3);
	            }
	            else if ($level == 4) {
	                gl.activeTexture(gl.TEXTURE4);
	            }
	            else if ($level == 5) {
	                gl.activeTexture(gl.TEXTURE5);
	            }
	            else if ($level == 6) {
	                gl.activeTexture(gl.TEXTURE6);
	            }
	            gl.bindTexture(gl.TEXTURE_CUBE_MAP, $textureObject);
	            gl.uniform1i(gl.getUniformLocation($program, $name), $level);
	        };
	        Context3D.prototype.setRenderTexture = function ($program, $name, $textureObject, $level, test) {
	            if (test === void 0) { test = true; }
	            var gl = this.webGlRender;
	            if ($level == 0) {
	                gl.activeTexture(gl.TEXTURE0);
	            }
	            else if ($level == 1) {
	                gl.activeTexture(gl.TEXTURE1);
	            }
	            else if ($level == 2) {
	                gl.activeTexture(gl.TEXTURE2);
	            }
	            else if ($level == 3) {
	                gl.activeTexture(gl.TEXTURE3);
	            }
	            else if ($level == 4) {
	                gl.activeTexture(gl.TEXTURE4);
	            }
	            else if ($level == 5) {
	                gl.activeTexture(gl.TEXTURE5);
	            }
	            else if ($level == 6) {
	                gl.activeTexture(gl.TEXTURE6);
	            }
	            gl.bindTexture(gl.TEXTURE_2D, $textureObject);
	            gl.uniform1i($program.getWebGLUniformLocation($name), $level);
	        };
	        Context3D.prototype.cullFaceBack = function (tf) {
	            var gl = this.webGlRender;
	            if (tf) { //反面渲染
	                gl.enable(gl.CULL_FACE);
	                if (gl.getParameter(gl.CULL_FACE_MODE) != gl.FRONT) {
	                    gl.cullFace(gl.FRONT);
	                }
	            }
	            else { //正面渲染
	                gl.enable(gl.CULL_FACE);
	                if (gl.getParameter(gl.CULL_FACE_MODE) != gl.BACK) {
	                    gl.cullFace(gl.BACK);
	                }
	            }
	        };
	        Context3D.prototype.disableCullFace = function () {
	            var gl = this.webGlRender;
	            gl.disable(gl.CULL_FACE);
	        };
	        Context3D.prototype.uploadBuff3DArrayBuffer = function ($jsData) {
	            var gl = this.webGlRender;
	            var arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
	            var $buffData = gl.createBuffer();
	            gl.bindBuffer(gl.ARRAY_BUFFER, $buffData);
	            gl.bufferData(gl.ARRAY_BUFFER, $jsData, gl.STATIC_DRAW);
	            if (arrayBuffer) {
	                gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
	            }
	            return $buffData;
	        };
	        Context3D.prototype.clearVa = function (dataId) {
	            var gl = this.webGlRender;
	            gl.disableVertexAttribArray(dataId);
	        };
	        Context3D.prototype.setWriteDepth = function (tf) {
	            var gl = this.webGlRender;
	            gl.depthMask(tf);
	        };
	        Context3D.prototype.setDepthTest = function (tf) {
	            var gl = this.webGlRender;
	            if (tf) {
	                gl.enable(gl.DEPTH_TEST);
	            }
	            else {
	                gl.disable(gl.DEPTH_TEST);
	            }
	        };
	        Context3D.prototype.setBlendParticleFactors = function (type) {
	            var gl = this.webGlRender;
	            switch (type) {
	                case 0:
	                    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
	                    break;
	                case 1:
	                    gl.blendFunc(gl.ONE, gl.ONE);
	                    break;
	                case 2:
	                    gl.blendFunc(gl.DST_COLOR, gl.ZERO);
	                    break;
	                case 3:
	                    gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_COLOR);
	                    break;
	                case 4:
	                    gl.blendFunc(gl.SRC_ALPHA, gl.ONE);
	                    break;
	                case -1:
	                    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
	                    break;
	            }
	        };
	        return Context3D;
	    }());
	    Pan3d.Context3D = Context3D;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Context3D.js.map

/***/ }),
/* 18 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var ResGC = /** @class */ (function () {
	        function ResGC(value) {
	            this.scene3D = value;
	            this.dic = new Object();
	        }
	        return ResGC;
	    }());
	    Pan3d.ResGC = ResGC;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ResGC.js.map

/***/ }),
/* 19 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var TextAlign = /** @class */ (function () {
	        function TextAlign() {
	        }
	        TextAlign.LEFT = "left";
	        TextAlign.CENTER = "center";
	        TextAlign.RIGHT = "right";
	        TextAlign.TOP = "top";
	        TextAlign.MIDDLE = "middle";
	        TextAlign.BOTTOM = "bottom";
	        return TextAlign;
	    }());
	    Pan3d.TextAlign = TextAlign;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=TextAlign.js.map

/***/ }),
/* 20 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var MeshData = /** @class */ (function (_super) {
	        __extends(MeshData, _super);
	        function MeshData() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this.boneIDAry = new Array;
	            _this.boneWeightAry = new Array;
	            _this.boneNewIDAry = new Array;
	            _this.particleAry = new Array;
	            return _this;
	        }
	        MeshData.prototype.getBindPosMatrix = function () {
	            var ary = new Array;
	            var invertAry = new Array;
	            for (var i = 0; i < this.bindPosAry.length; i++) {
	                var objbone = this.bindPosAry[i];
	                var OldQ = new Pan3d.Quaternion(objbone[0], objbone[1], objbone[2]);
	                OldQ.setMd5W();
	                var newM = OldQ.toMatrix3D();
	                newM.appendTranslation(objbone[3], objbone[4], objbone[5]);
	                invertAry.push(newM.clone());
	                newM.invert();
	                ary.push(newM);
	            }
	            this.bindPosMatrixAry = ary;
	            this.bindPosInvertMatrixAry = invertAry;
	        };
	        MeshData.prototype.clone = function () {
	            var temp = new MeshData(this.scene3D);
	            for (var key in this) {
	                temp[key] = this[key];
	            }
	            return temp;
	        };
	        return MeshData;
	    }(Pan3d.ObjData));
	    Pan3d.MeshData = MeshData;
	    var BindParticle = /** @class */ (function () {
	        //public particle: CombineParticle;
	        function BindParticle($url, $socketName) {
	            this.url = $url;
	            this.socketName = $socketName;
	        }
	        return BindParticle;
	    }());
	    Pan3d.BindParticle = BindParticle;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=MeshData.js.map

/***/ }),
/* 21 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ObjDataManager = /** @class */ (function (_super) {
	        __extends(ObjDataManager, _super);
	        function ObjDataManager(value) {
	            var _this = _super.call(this, value) || this;
	            _this._loadList = new Object();
	            return _this;
	        }
	        ObjDataManager.prototype.getObjData = function ($url, $fun) {
	            var _this = this;
	            if (this.dic[$url]) {
	                $fun(this.dic[$url]);
	                this.dic[$url].useNum++;
	                return;
	            }
	            var ary;
	            if (!this._loadList[$url]) {
	                this._loadList[$url] = new Array;
	                Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
	                    _this.loadObjCom($byte, $url);
	                });
	            }
	            ary = this._loadList[$url];
	            ary.push($fun);
	        };
	        ObjDataManager.prototype.loadObjCom = function ($byte, $url) {
	            if (this.dic[$url]) {
	                return;
	            }
	            var $objData = new Pan3d.ObjData(this.scene3D);
	            var byte = new Pan3d.Pan3dByteArray($byte);
	            var version = byte.readInt();
	            var str = byte.readUTF();
	            this.readObj2OneBuffer(byte, $objData);
	            $objData.treNum = $objData.indexs.length;
	            $objData.indexBuffer = this.scene3D.context3D.uploadIndexBuff3D($objData.indexs);
	            this.dic[$url] = $objData;
	            var ary = this._loadList[$url];
	            if (ary) {
	                for (var i = 0; i < ary.length; i++) {
	                    ary[i]($objData);
	                }
	                delete this._loadList[$url];
	            }
	            return $objData;
	        };
	        ObjDataManager.prototype.readObj2OneBuffer = function (byte, $objData) {
	            var typeItem = new Array;
	            var len;
	            var typeItem = new Array;
	            var dataWidth = 0;
	            for (var i = 0; i < 6; i++) {
	                var tf = byte.readBoolean();
	                typeItem.push(tf);
	                if (tf) {
	                    switch (i) {
	                        case 1: //uv
	                            dataWidth += 2;
	                            break;
	                        case 2: //lightuv
	                            dataWidth += 2;
	                            break;
	                        default:
	                            dataWidth += 3;
	                            break;
	                    }
	                }
	            }
	            len = byte.readFloat();
	            var baseLenght = len;
	            len *= dataWidth * 4;
	            var arybuff = new ArrayBuffer(len);
	            var data = new DataView(arybuff);
	            var uvsOffsets = 3;
	            var lightuvsOffsets = uvsOffsets + 2;
	            var normalsOffsets = typeItem[2] ? (lightuvsOffsets + 2) : (uvsOffsets + 2);
	            var tangentsOffsets = normalsOffsets + 3;
	            var bitangentsOffsets = tangentsOffsets + 3;
	            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, 0, dataWidth); //vertices
	            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 2, uvsOffsets, dataWidth); //uvs
	            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 2, lightuvsOffsets, dataWidth, 1); //lightuvs
	            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, normalsOffsets, dataWidth); //normals
	            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, tangentsOffsets, dataWidth); //tangents
	            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, bitangentsOffsets, dataWidth); //bitangents
	            Pan3d.BaseRes.readIntForTwoByte(byte, $objData.indexs);
	            $objData.vertexBuffer = this.scene3D.context3D.uploadBuff3DArrayBuffer(arybuff);
	            $objData.compressBuffer = true;
	            $objData.uvsOffsets = uvsOffsets * 4;
	            $objData.lightuvsOffsets = lightuvsOffsets * 4;
	            $objData.normalsOffsets = normalsOffsets * 4;
	            $objData.tangentsOffsets = tangentsOffsets * 4;
	            $objData.bitangentsOffsets = bitangentsOffsets * 4;
	            $objData.stride = dataWidth * 4;
	        };
	        ObjDataManager.prototype.registerUrl = function ($url) {
	            if (this.dic[$url]) {
	                this.dic[$url].useNum++;
	            }
	        };
	        return ObjDataManager;
	    }(Pan3d.ResGC));
	    Pan3d.ObjDataManager = ObjDataManager;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ObjDataManager.js.map

/***/ }),
/* 22 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SkinMesh = /** @class */ (function (_super) {
	        __extends(SkinMesh, _super);
	        function SkinMesh() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this.animDic = new Object;
	            _this.meshAry = new Array;
	            return _this;
	        }
	        SkinMesh.prototype.addMesh = function ($mesh) {
	            $mesh.uid = this.meshAry.length;
	            this.meshAry.push($mesh);
	        };
	        SkinMesh.prototype.makeHitBoxItem = function () {
	        };
	        SkinMesh.prototype.loadMaterial = function ($fun) {
	            if ($fun === void 0) { $fun = null; }
	            for (var i = 0; i < this.meshAry.length; i++) {
	                this.loadByteMeshDataMaterial(this.meshAry[i], $fun);
	            }
	        };
	        SkinMesh.prototype.loadByteMeshDataMaterial = function ($meshData, $fun) {
	            var _this = this;
	            if ($fun === void 0) { $fun = null; }
	            var url = this.scene3D.fileRoot + $meshData.materialUrl;
	            url = url.replace("_byte.txt", ".txt");
	            url = url.replace(".txt", "_byte.txt");
	            this.scene3D.materialManager.getMaterialByte(url, function ($material) {
	                $meshData.material = $material;
	                if ($material.usePbr) {
	                    _this.scene3D.meshDataManager.uploadPbrMesh($meshData, $material.useNormal);
	                }
	                else if ($material.lightProbe || $material.directLight) {
	                    _this.scene3D.meshDataManager.uploadPbrMesh($meshData, false);
	                }
	                if ($meshData.materialParamData) {
	                    $meshData.materialParam = new Pan3d.MaterialBaseParam(_this.scene3D);
	                    $meshData.materialParam.setData($meshData.material, $meshData.materialParamData);
	                }
	                if ($fun) {
	                    $fun($material);
	                }
	            }, null, true, Pan3d.MaterialAnimShader.MATERIAL_ANIM_SHADER, Pan3d.MaterialAnimShader);
	        };
	        SkinMesh.prototype.setAction = function (actionAry, roleUrl) {
	            this.animUrlAry = new Array;
	            for (var i = 0; i < actionAry.length; i++) {
	                var name = actionAry[i];
	                var url = roleUrl + actionAry[i];
	                var anim = this.scene3D.animManager.getAnimDataImmediate(url);
	                anim.processMesh(this);
	                this.animDic[name] = anim;
	                this.animUrlAry.push(url);
	            }
	        };
	        return SkinMesh;
	    }(Pan3d.ResCount));
	    Pan3d.SkinMesh = SkinMesh;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkinMesh.js.map

/***/ }),
/* 23 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var BoneSocketData = /** @class */ (function () {
	        function BoneSocketData() {
	        }
	        return BoneSocketData;
	    }());
	    Pan3d.BoneSocketData = BoneSocketData;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=BoneSocketData.js.map

/***/ }),
/* 24 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var ObjectBaseBone = /** @class */ (function () {
	        function ObjectBaseBone() {
	        }
	        return ObjectBaseBone;
	    }());
	    Pan3d.ObjectBaseBone = ObjectBaseBone;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ObjectBaseBone.js.map

/***/ }),
/* 25 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ObjectBone = /** @class */ (function (_super) {
	        __extends(ObjectBone, _super);
	        function ObjectBone() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        ObjectBone.prototype.clone = function () {
	            var newBone = new ObjectBone;
	            newBone.tx = this.tx;
	            newBone.ty = this.ty;
	            newBone.tz = this.tz;
	            newBone.tw = this.tw;
	            newBone.qx = this.qx;
	            newBone.qy = this.qy;
	            newBone.qz = this.qz;
	            newBone.qw = this.qw;
	            newBone.changtype = this.changtype;
	            newBone.name = this.name;
	            newBone.father = this.father;
	            newBone.startIndex = this.startIndex;
	            newBone.matrix = this.matrix;
	            return newBone;
	        };
	        return ObjectBone;
	    }(Pan3d.ObjectBaseBone));
	    Pan3d.ObjectBone = ObjectBone;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ObjectBone.js.map

/***/ }),
/* 26 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var AnimData = /** @class */ (function () {
	        function AnimData() {
	            this.inLoop = 0;
	            this.inter = new Array;
	            this.bounds = new Array;
	            this.nameHeight = 0;
	            this.posAry = new Array;
	            this.hasProcess = false;
	        }
	        AnimData.prototype.processMesh = function ($skinMesh) {
	            if (this.hasProcess) {
	                //console.log("has process logic error");
	                return;
	            }
	            this.makeArrBoneQPAry($skinMesh);
	            this.hasProcess = true;
	        };
	        AnimData.prototype.makeArrBoneQPAry = function ($skinMesh) {
	            this.meshBoneQPAryDic = new Pan3d.Dictionary([]);
	            for (var k = 0; k < $skinMesh.meshAry.length; k++) {
	                var $conleM = this.conleMatrixArr();
	                for (var i = 0; i < $conleM.length; i++) {
	                    var frameAry = $conleM[i];
	                    for (var j = 0; j < frameAry.length; j++) {
	                        if ($skinMesh.meshAry[k].bindPosMatrixAry[j]) {
	                            frameAry[j].prepend($skinMesh.meshAry[k].bindPosMatrixAry[j]);
	                        }
	                    }
	                }
	                var temp = this.makeFrameDualQuatFloatArray($skinMesh, $conleM);
	                this.meshBoneQPAryDic[$skinMesh.meshAry[k].uid] = temp;
	                this.boneQPAry = temp; //存一下到原来数据中
	            }
	            this.matrixAry = $conleM; //将最后一个回传给插孔
	        };
	        AnimData.prototype.getBoneQPAryByMesh = function ($mesh) {
	            return this.meshBoneQPAryDic[$mesh.uid];
	        };
	        AnimData.prototype.conleMatrixArr = function () {
	            var $arr = new Array();
	            for (var i = 0; i < this.matrixAry.length; i++) {
	                var frameAry = this.matrixAry[i];
	                var temp = new Array();
	                for (var j = 0; j < frameAry.length; j++) {
	                    temp.push(frameAry[j].clone());
	                }
	                $arr.push(temp);
	            }
	            return $arr;
	        };
	        AnimData.prototype.makeFrameDualQuatFloatArray = function ($skinMesh, $matrixAry) {
	            var $backArr = new Array();
	            var tempMatrix = new Pan3d.Matrix3D();
	            for (var i = 0; i < $skinMesh.meshAry.length; i++) {
	                var $frameDualQuat = new Array;
	                var newIDBoneArr = $skinMesh.meshAry[i].boneNewIDAry;
	                for (var j = 0; j < $matrixAry.length; j++) {
	                    var baseBone = $matrixAry[j];
	                    var $DualQuatFloat32Array = new Pan3d.DualQuatFloat32Array;
	                    $DualQuatFloat32Array.quat = new Float32Array(newIDBoneArr.length * 4);
	                    $DualQuatFloat32Array.pos = new Float32Array(newIDBoneArr.length * 3);
	                    for (var k = 0; k < newIDBoneArr.length; k++) {
	                        var $m = baseBone[newIDBoneArr[k]].clone(tempMatrix);
	                        $m.appendScale(-1, 1, 1); //特别标记，因为四元数和矩阵运算结果不一
	                        var $q = new Pan3d.Quaternion();
	                        $q.fromMatrix($m);
	                        var $p = $m.position;
	                        $DualQuatFloat32Array.quat[k * 4 + 0] = $q.x;
	                        $DualQuatFloat32Array.quat[k * 4 + 1] = $q.y;
	                        $DualQuatFloat32Array.quat[k * 4 + 2] = $q.z;
	                        $DualQuatFloat32Array.quat[k * 4 + 3] = $q.w;
	                        $DualQuatFloat32Array.pos[k * 3 + 0] = $p.x;
	                        $DualQuatFloat32Array.pos[k * 3 + 1] = $p.y;
	                        $DualQuatFloat32Array.pos[k * 3 + 2] = $p.z;
	                    }
	                    $frameDualQuat.push($DualQuatFloat32Array);
	                }
	                $backArr.push($frameDualQuat);
	            }
	            return $backArr;
	        };
	        return AnimData;
	    }());
	    Pan3d.AnimData = AnimData;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=AnimData.js.map

/***/ }),
/* 27 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var DualQuatFloat32Array = /** @class */ (function () {
	        function DualQuatFloat32Array() {
	        }
	        return DualQuatFloat32Array;
	    }());
	    Pan3d.DualQuatFloat32Array = DualQuatFloat32Array;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=DualQuatFloat32Array.js.map

/***/ }),
/* 28 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var LoadInfo = /** @class */ (function () {
	        function LoadInfo($url, $type, $fun, $info, $progressFun) {
	            if ($info === void 0) { $info = null; }
	            if ($progressFun === void 0) { $progressFun = null; }
	            this.url = $url;
	            this.type = $type;
	            this.fun = $fun;
	            this.info = $info;
	            this.progressFun = $progressFun;
	        }
	        Object.defineProperty(LoadInfo.prototype, "vurl", {
	            get: function () {
	                return this.url;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        return LoadInfo;
	    }());
	    Pan3d.LoadInfo = LoadInfo;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=LoadInfo.js.map

/***/ }),
/* 29 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var LoaderThread = /** @class */ (function () {
	        function LoaderThread() {
	            var _this = this;
	            this._xhr = new XMLHttpRequest();
	            this._xhr.onreadystatechange = function () {
	                if (!_this._xhr || _this._xhr.readyState !== 4) {
	                    return;
	                }
	                if (_this._xhr.status !== 0 && _this._xhr.status !== 200) {
	                    _this.loadError();
	                    return;
	                }
	                _this.loadByteXML();
	            };
	            this._xhr.onprogress = function (e) {
	                if (_this._loadInfo.progressFun) {
	                    _this._loadInfo.progressFun(e.loaded / e.total);
	                }
	            };
	            this._xhr.onerror = function () {
	                _this.loadError();
	            };
	            this._img = makeImage();
	            this._img.onload = function () {
	                _this.loadImg();
	            };
	            this._img.onerror = function () {
	                _this.loadError();
	            };
	            this.idle = true;
	        }
	        LoaderThread.prototype.load = function (loadInfo) {
	            this._loadInfo = loadInfo;
	            this.idle = false;
	            this._url = loadInfo.url;
	            if (this._loadInfo.type == Pan3d.LoadManager.BYTE_TYPE) {
	                this._xhr.open("GET", loadInfo.vurl, true);
	                this._xhr.responseType = "arraybuffer";
	                this._xhr.send();
	            }
	            else if (this._loadInfo.type == Pan3d.LoadManager.XML_TYPE) {
	                this._xhr.open("GET", loadInfo.vurl, true);
	                this._xhr.responseType = "text";
	                this._xhr.send();
	            }
	            else if (this._loadInfo.type == Pan3d.LoadManager.IMG_TYPE) {
	                if (this._img.url == loadInfo.vurl) { //路径相同
	                    this.loadImg();
	                }
	                else { //执行加载
	                    this._img.url = loadInfo.vurl;
	                    this._img.src = loadInfo.vurl;
	                }
	            }
	        };
	        LoaderThread.prototype.loadError = function () {
	            if (this._loadInfo.info && this._loadInfo.info.errorFun) {
	                this._loadInfo.info.errorFun();
	            }
	            this.idle = true;
	            this._loadInfo = null;
	            Pan3d.LoadManager.getInstance().loadWaitList();
	        };
	        LoaderThread.prototype.loadByteXML = function () {
	            // if(this.idle){
	            //     //console.log("加载完成*****************************"+this._url );
	            // }
	            if (this._loadInfo.info) {
	                this._loadInfo.fun(this._xhr.response, this._loadInfo.info);
	            }
	            else {
	                this._loadInfo.fun(this._xhr.response);
	            }
	            this.idle = true;
	            this._loadInfo = null;
	            Pan3d.LoadManager.getInstance().loadWaitList();
	        };
	        LoaderThread.prototype.loadByteImg = function () {
	            this._img.src = 'data:image/png;base64,' + Pan3d.Base64.encode(this._xhr.response);
	        };
	        LoaderThread.prototype.loadImg = function () {
	            if (this._loadInfo.info) {
	                this._loadInfo.fun(this._img, this._loadInfo.info);
	            }
	            else {
	                this._loadInfo.fun(this._img);
	            }
	            this.idle = true;
	            this._loadInfo = null;
	            Pan3d.LoadManager.getInstance().loadWaitList();
	        };
	        return LoaderThread;
	    }());
	    Pan3d.LoaderThread = LoaderThread;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=LoaderThread.js.map

/***/ }),
/* 30 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var LoadManager = /** @class */ (function () {
	        function LoadManager() {
	            this._loadThreadList = new Array;
	            this._waitLoadList = new Array;
	            for (var i = 0; i < 10; i++) {
	                this._loadThreadList.push(new Pan3d.LoaderThread());
	            }
	        }
	        LoadManager.getInstance = function () {
	            if (!this._instance) {
	                this._instance = new LoadManager();
	            }
	            return this._instance;
	        };
	        LoadManager.getVersion = function (vkey) {
	            return "";
	        };
	        LoadManager.prototype.load = function ($url, $type, $fun, $info, $progressFun) {
	            if ($info === void 0) { $info = null; }
	            if ($progressFun === void 0) { $progressFun = null; }
	            if (!$url || $url.length < 1 || $url.search("undefined") != -1) {
	                //console.log("加载地址不能为空")
	                return;
	            }
	            var version = "0";
	            //GameInstance.mapName
	            var loadInfo = new Pan3d.LoadInfo($url, $type, $fun, $info, $progressFun);
	            loadInfo.version = version;
	            for (var i = 0; i < this._loadThreadList.length; i++) {
	                if (this._loadThreadList[i].idle) {
	                    this._loadThreadList[i].load(loadInfo);
	                    return;
	                }
	            }
	            this._waitLoadList.push(loadInfo);
	        };
	        LoadManager.prototype.loadWaitList = function () {
	            if (this._waitLoadList.length <= 0) {
	                return;
	            }
	            for (var i = 0; i < this._loadThreadList.length; i++) {
	                if (this._loadThreadList[i].idle) {
	                    this._loadThreadList[i].load(this._waitLoadList.shift());
	                    return;
	                }
	            }
	        };
	        LoadManager.BYTE_TYPE = "BYTE_TYPE";
	        LoadManager.IMG_TYPE = "IMG_TYPE";
	        LoadManager.XML_TYPE = "XML_TYPE";
	        return LoadManager;
	    }());
	    Pan3d.LoadManager = LoadManager;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=LoadManager.js.map

/***/ }),
/* 31 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var BaseRes = /** @class */ (function (_super) {
	        __extends(BaseRes, _super);
	        function BaseRes(value) {
	            var _this = _super.call(this, value) || this;
	            _this.allImgBytes = 10000000;
	            return _this;
	        }
	        BaseRes.prototype.read = function ($imgFun) {
	            if ($imgFun === void 0) { $imgFun = null; }
	            this._imgFun = $imgFun;
	            var fileType = this._byte.readInt();
	            if (fileType == BaseRes.IMG_TYPE) {
	                if (this.scene3D.supportBlob) {
	                    this.readImg();
	                }
	                else {
	                    // this.readImgLow();
	                }
	            }
	            else if (fileType == BaseRes.OBJS_TYPE) {
	                this.readObj(this._byte);
	            }
	            else if (fileType == BaseRes.MATERIAL_TYPE) {
	                this.readMaterial();
	            }
	            else if (fileType == BaseRes.PARTICLE_TYPE) {
	                this.readParticle();
	            }
	            else if (fileType == BaseRes.ZIP_OBJS_TYPE) {
	                this.readZipObj();
	            }
	        };
	        BaseRes.prototype.readZipObj = function () {
	            var zipLen = this._byte.readInt();
	            var aryBuf = this._byte.buffer.slice(this._byte.position, this._byte.position + zipLen);
	            this._byte.position += zipLen;
	            var zipedBuf = unZip(aryBuf);
	            var newByte = new Pan3d.Pan3dByteArray(zipedBuf);
	            this.readObj(newByte);
	        };
	        BaseRes.prototype.readImg = function () {
	            var _this = this;
	            this.imgNum = this._byte.readInt();
	            this.imgLoadNum = 0;
	            //this.imgAry = new Array;
	            // var time: number = TimeUtil.getTimer();
	            var ary = new Array;
	            var urlAry = new Array;
	            for (var i = 0; i < this.imgNum; i++) {
	                var url = this.scene3D.fileRoot + this._byte.readUTF();
	                var imgSize = this._byte.readInt();
	                var imgAryBuffer = this._byte.buffer.slice(this._byte.position, this._byte.position + imgSize);
	                this._byte.position += imgSize;
	                var blob = new Blob([imgAryBuffer], { type: "application/octet-binary" });
	                ary.push(blob);
	                urlAry.push(url);
	            }
	            for (var i = 0; i < ary.length; i++) {
	                var img = new Image();
	                img.url = urlAry[i];
	                img.onload = function (evt) {
	                    _this.loadImg(evt.target);
	                    var etimg = evt.target;
	                    URL.revokeObjectURL(etimg.src);
	                };
	                img.src = URL.createObjectURL(ary[i]);
	            }
	        };
	        BaseRes.prototype.loadImg = function (img) {
	            this.scene3D.textureManager.addRes(img.url, img);
	            this.countImg();
	        };
	        BaseRes.prototype.addImg = function ($url, img) {
	            this.scene3D.textureManager.addRes($url, img);
	            this.countImg();
	        };
	        BaseRes.prototype.countImg = function () {
	            this.imgLoadNum++;
	            if (this.imgLoadNum == this.imgNum) {
	                this._imgComplete = true;
	                this.allResCom();
	            }
	        };
	        BaseRes.prototype.readObj = function ($srcByte) {
	            var objNum = $srcByte.readInt();
	            for (var i = 0; i < objNum; i++) {
	                var url = this.scene3D.fileRoot + $srcByte.readUTF();
	                var size = $srcByte.readInt();
	                var newByte = new Pan3d.Pan3dByteArray();
	                newByte.length = size;
	                $srcByte.readBytes(newByte, 0, size);
	                var objData = this.scene3D.objDataManager.loadObjCom(newByte.buffer, url);
	            }
	            if (this._imgFun) {
	                this._imgFun();
	            }
	        };
	        BaseRes.prototype.readMaterial = function () {
	            var objNum = this._byte.readInt();
	            //this.materialAry = new Array;
	            // var time: number = TimeUtil.getTimer();
	            for (var i = 0; i < objNum; i++) {
	                var url = this.scene3D.fileRoot + this._byte.readUTF();
	                var size = this._byte.readInt();
	                var dataByte = new Pan3d.Pan3dByteArray;
	                dataByte.length = size;
	                this._byte.readBytes(dataByte, 0, size);
	                this.scene3D.materialManager.addResByte(url, dataByte);
	            }
	        };
	        BaseRes.prototype.readParticle = function () {
	            var objNum = this._byte.readInt();
	            for (var i = 0; i < objNum; i++) {
	                var url = this.scene3D.fileRoot + this._byte.readUTF();
	                var size = this._byte.readInt();
	                var dataByte = new Pan3d.Pan3dByteArray;
	                dataByte.length = size;
	                this._byte.readBytes(dataByte, 0, size);
	                this.scene3D.particleManager.addResByte(url, dataByte);
	            }
	        };
	        //读材质参数
	        BaseRes.prototype.readMaterialInfo = function () {
	            var len = this._byte.readInt();
	            if (len > 0) {
	                var $arr = new Array;
	                for (var i = 0; i < len; i++) {
	                    var $temp = new Object();
	                    $temp.type = this._byte.readInt();
	                    $temp.name = this._byte.readUTF();
	                    if ($temp.type == 0) {
	                        $temp.url = this._byte.readUTF();
	                    }
	                    if ($temp.type == 1) {
	                        $temp.x = this._byte.readFloat();
	                    }
	                    if ($temp.type == 2) {
	                        $temp.x = this._byte.readFloat();
	                        $temp.y = this._byte.readFloat();
	                    }
	                    if ($temp.type == 3) {
	                        $temp.x = this._byte.readFloat();
	                        $temp.y = this._byte.readFloat();
	                        $temp.z = this._byte.readFloat();
	                    }
	                    $arr.push($temp);
	                }
	                return $arr;
	            }
	            else {
	                return null;
	            }
	        };
	        //读取浮点数据，两个字节
	        BaseRes.readFloatTwoByte = function (byte, vertices) {
	            var verLength = byte.readInt();
	            if (verLength > 0) {
	                var $scaleNum = byte.readFloat();
	                vertices.length = 0;
	                for (var i = 0; i < verLength; i++) {
	                    vertices.push(byte.readFloatTwoByte($scaleNum));
	                }
	            }
	        };
	        //读取一个字节的LightMap
	        BaseRes.readFloatOneByte = function (byte, vertices) {
	            var verLength = byte.readInt();
	            if (verLength > 0) {
	                for (var i = 0; i < verLength; i++) {
	                    vertices.push((byte.readByte() + 128) / 256);
	                }
	            }
	        };
	        BaseRes.readIntForTwoByte = function (byte, indexs) {
	            var iLen = byte.readInt();
	            for (var i = 0; i < iLen; i++) {
	                indexs.push(byte.readShort());
	            }
	        };
	        BaseRes.readIntForOneByte = function (byte, indexs) {
	            var iLen = byte.readInt();
	            for (var i = 0; i < iLen; i++) {
	                indexs.push(byte.readByte());
	            }
	        };
	        /**
	         * $readType
	         * 0 readFloatTwoByte
	         * 1 readFloatOneByte
	         * 2 readIntForOneByte
	         *  */
	        BaseRes.readBytes2ArrayBuffer = function ($byte, $data, $dataWidth, $offset, $stride, $readType) {
	            if ($readType === void 0) { $readType = 0; }
	            var verLength = $byte.readInt();
	            if (verLength <= 0) {
	                return;
	            }
	            var scaleNum;
	            if ($readType == 0) {
	                scaleNum = $byte.readFloat();
	            }
	            var readNum = verLength / $dataWidth;
	            for (var i = 0; i < readNum; i++) {
	                var pos = $stride * i + $offset;
	                for (var j = 0; j < $dataWidth; j++) {
	                    if ($readType == 0) {
	                        $data.setFloat32((pos + j) * 4, $byte.readFloatTwoByte(scaleNum), true);
	                    }
	                    else if ($readType == 1) {
	                        $data.setFloat32((pos + j) * 4, $byte.readFloatOneByte(), true);
	                    }
	                    else if ($readType == 2) {
	                        $data.setFloat32((pos + j) * 4, $byte.readByte(), true);
	                    }
	                    else if ($readType == 3) {
	                        $data.setFloat32((pos + j) * 4, ($byte.readByte() + 128) / 255, true);
	                    }
	                    else if ($readType == 4) {
	                        $data.setFloat32((pos + j) * 4, $byte.readFloat(), true);
	                    }
	                }
	            }
	        };
	        //读取材质参数
	        BaseRes.readMaterialParamData = function (byte) {
	            var mpNum = byte.readInt();
	            if (mpNum > 0) {
	                var mpAry = new Array;
	                for (var j = 0; j < mpNum; j++) {
	                    var obj = new Object;
	                    obj.name = byte.readUTF();
	                    obj.type = byte.readByte();
	                    if (obj.type == 0) {
	                        obj.url = byte.readUTF();
	                    }
	                    else if (obj.type == 1) {
	                        obj.x = byte.readFloat();
	                    }
	                    else if (obj.type == 2) {
	                        obj.x = byte.readFloat();
	                        obj.y = byte.readFloat();
	                    }
	                    else if (obj.type == 3) {
	                        obj.x = byte.readFloat();
	                        obj.y = byte.readFloat();
	                        obj.z = byte.readFloat();
	                    }
	                    mpAry.push(obj);
	                }
	                return mpAry;
	            }
	            return null;
	        };
	        BaseRes.prototype.allResCom = function () {
	            if (this._imgFun) {
	                this._imgFun();
	            }
	        };
	        BaseRes.IMG_TYPE = 1;
	        BaseRes.OBJS_TYPE = 2;
	        BaseRes.MATERIAL_TYPE = 3;
	        BaseRes.PARTICLE_TYPE = 4;
	        BaseRes.SCENE_TYPE = 5;
	        BaseRes.ZIP_OBJS_TYPE = 6;
	        BaseRes.PREFAB_TYPE = 1;
	        BaseRes.SCENE_PARTICLE_TYPE = 11;
	        return BaseRes;
	    }(Pan3d.ResCount));
	    Pan3d.BaseRes = BaseRes;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=BaseRes.js.map

/***/ }),
/* 32 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SceneRes = /** @class */ (function (_super) {
	        __extends(SceneRes, _super);
	        function SceneRes(value) {
	            return _super.call(this, value) || this;
	        }
	        SceneRes.prototype.load = function ($url, $completeFun, $progressFun, $readDataFun) {
	            var _this = this;
	            this._completeFun = $completeFun;
	            this._readDataFun = $readDataFun;
	            this._progressFun = $progressFun;
	            $url = this.scene3D.fileRoot + getMapUrl($url);
	            Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
	                _this.loadComplete($byte);
	            }, null, $progressFun);
	        };
	        SceneRes.prototype.loadComplete = function ($byte) {
	            var _this = this;
	            this._byte = new Pan3d.Pan3dByteArray($byte);
	            this._byte.position = 0;
	            this.version = this._byte.readInt();
	            this.read(function () { _this.readNext(); }); //img
	        };
	        SceneRes.prototype.readNext = function () {
	            this.read(); //obj
	            this.read(); //material
	            this.read(); //particle;
	            this.readScene();
	            this._completeFun();
	        };
	        SceneRes.prototype.readScene = function () {
	            var types = this._byte.readInt();
	            this.readAstat();
	            if (this.version >= 28) {
	                this.readTerrainIdInfoBitmapData(this._byte);
	            }
	            var size = this._byte.readInt();
	            this.sceneData = JSON.parse(this._byte.readUTFBytes(size));
	        };
	        SceneRes.prototype.readAstat = function () {
	            var hasAstat = this._byte.readBoolean();
	            if (hasAstat) {
	                this._byte.readFloat();
	                this._byte.readFloat();
	                this._byte.readFloat();
	                this._byte.readFloat();
	                var i;
	                var j;
	                var tw = this._byte.readInt();
	                var th = this._byte.readInt();
	                // this._astarDataMesh.width = tw;
	                // this._astarDataMesh.height = th;
	                if (this.version < 25) {
	                    for (i = 0; i < th; i++) {
	                        var tempAstar = new Array;
	                        for (j = 0; j < tw; j++) {
	                            tempAstar.push(this._byte.readFloat());
	                        }
	                        // this._astarDataMesh.astarItem.push(tempAstar);
	                    }
	                    for (i = 0; i < th; i++) {
	                        var tempHeightArr = new Array;
	                        for (j = 0; j < tw; j++) {
	                            tempHeightArr.push(this._byte.readFloat());
	                        }
	                        // this._astarDataMesh.heightItem.push(tempHeightArr);
	                    }
	                }
	                else {
	                    var $heightScaleNum = this._byte.readFloat();
	                    var $astrBase = this.readAstarFromByte(this._byte);
	                    var $jumpBase = this.readAstarFromByte(this._byte);
	                    var $astrBaseId = 0;
	                    var $jumpBaseId = 0;
	                    for (i = 0; i < th; i++) {
	                        var tempAstar = new Array;
	                        var tempJump = new Array;
	                        for (j = 0; j < tw; j++) {
	                            var astarNum = $astrBase[$astrBaseId++];
	                            tempAstar.push(astarNum);
	                            if (astarNum == 1) {
	                                var ssss = $jumpBase[$jumpBaseId++];
	                                tempJump.push(ssss);
	                            }
	                            else {
	                                tempJump.push(0);
	                            }
	                        }
	                    }
	                    for (i = 0; i < th; i++) {
	                        var tempHeightArr = new Array;
	                        for (j = 0; j < tw; j++) {
	                            tempHeightArr.push(this._byte.readShort() / $heightScaleNum);
	                        }
	                    }
	                }
	            }
	        };
	        SceneRes.prototype.readTerrainIdInfoBitmapData = function ($byte) {
	            var $len = $byte.readInt();
	            if ($len) {
	                //var newByte: ByteArray = new ByteArray();
	                //newByte.length = $len;
	                //$byte.readBytes(newByte, 0, $len);
	                var zipLen = $len;
	                var aryBuf = $byte.buffer.slice($byte.position, $byte.position + zipLen);
	                $byte.position += zipLen;
	                var zipedBuf = unZip(aryBuf);
	                var newByte = new Pan3d.Pan3dByteArray(zipedBuf);
	            }
	        };
	        SceneRes.prototype.readAstarFromByte = function ($byte) {
	            var $len = $byte.readUnsignedInt();
	            var $intLen = Math.ceil($len / 32);
	            var $astrBase = new Array;
	            for (var i = 0; i < $intLen; i++) {
	                var $num = $byte.readUnsignedInt();
	                for (var j = 0; j < 32; j++) {
	                    var $ast = $num & 1;
	                    if ($astrBase.length < $len) {
	                        $astrBase.push($ast);
	                    }
	                    $num >>= 1;
	                }
	            }
	            return $astrBase;
	        };
	        return SceneRes;
	    }(Pan3d.BaseRes));
	    Pan3d.SceneRes = SceneRes;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SceneRes.js.map

/***/ }),
/* 33 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var RoleRes = /** @class */ (function (_super) {
	        __extends(RoleRes, _super);
	        function RoleRes(value) {
	            return _super.call(this, value) || this;
	        }
	        RoleRes.prototype.load = function (url, $fun) {
	            var _this = this;
	            this._fun = $fun;
	            Pan3d.LoadManager.getInstance().load(url, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
	                _this.loadComplete($byte);
	            });
	        };
	        RoleRes.prototype.loadComplete = function ($byte) {
	            this._byte = new Pan3d.Pan3dByteArray($byte);
	            this._byte.position = 0;
	            this.version = this._byte.readInt();
	            this.readMesh();
	        };
	        RoleRes.prototype.readMesh = function () {
	            this.roleUrl = this._byte.readUTF();
	            if (this.version >= 16) { //环境参数
	                this.ambientLightColor = new Pan3d.Vector3D;
	                this.sunLigthColor = new Pan3d.Vector3D;
	                this.nrmDircet = new Pan3d.Vector3D;
	                this.ambientLightColor.x = this._byte.readFloat();
	                this.ambientLightColor.y = this._byte.readFloat();
	                this.ambientLightColor.z = this._byte.readFloat();
	                this.ambientLightIntensity = this._byte.readFloat();
	                this.ambientLightColor.scaleBy(this.ambientLightIntensity);
	                this.sunLigthColor.x = this._byte.readFloat();
	                this.sunLigthColor.y = this._byte.readFloat();
	                this.sunLigthColor.z = this._byte.readFloat();
	                this.sunLigthIntensity = this._byte.readFloat();
	                this.sunLigthColor.scaleBy(this.sunLigthIntensity);
	                this.nrmDircet.x = this._byte.readFloat();
	                this.nrmDircet.y = this._byte.readFloat();
	                this.nrmDircet.z = this._byte.readFloat();
	            }
	            this.scene3D.meshDataManager.readData(this._byte, this.meshBatchNum, this.roleUrl, this.version);
	            this.readAction();
	        };
	        RoleRes.prototype.readAction = function () {
	            var _this = this;
	            var $actionByte;
	            if (this.version >= 30) {
	                $actionByte = getZipByte(this._byte);
	            }
	            else {
	                $actionByte = this._byte;
	            }
	            this.actionAry = new Array;
	            var actionNum = $actionByte.readInt();
	            for (var i = 0; i < actionNum; i++) {
	                var actionName = $actionByte.readUTF();
	                this.scene3D.animManager.readData($actionByte, this.roleUrl + actionName);
	                this.actionAry.push(actionName);
	            }
	            this.read(function () { _this.readNext(); }); //readimg 
	        };
	        RoleRes.prototype.readNext = function () {
	            this.read(); //readmaterial
	            this.read(); //readparticle;
	            this._fun();
	        };
	        return RoleRes;
	    }(Pan3d.BaseRes));
	    Pan3d.RoleRes = RoleRes;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=RoleRes.js.map

/***/ }),
/* 34 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var GroupRes = /** @class */ (function (_super) {
	        __extends(GroupRes, _super);
	        function GroupRes() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        GroupRes.prototype.load = function (url, $fun) {
	            var _this = this;
	            this._fun = $fun;
	            Pan3d.LoadManager.getInstance().load(url, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
	                _this.loadComplete($byte);
	            });
	        };
	        GroupRes.prototype.loadComplete = function ($byte) {
	            var _this = this;
	            this.dataAry = new Array;
	            this._byte = new Pan3d.Pan3dByteArray($byte);
	            this._byte.position = 0;
	            this.version = this._byte.readInt();
	            this.read(function () { _this.readNext(); }); //img
	        };
	        GroupRes.prototype.readNext = function () {
	            this.read(); //obj
	            this.read(); //material
	            this.read(); //particle;
	            var isGroup = this._byte.readBoolean();
	            if (isGroup) {
	                var length = this._byte.readInt();
	                for (var i = 0; i < length; i++) {
	                    this.readItem(true);
	                }
	            }
	            else {
	                this.readItem(false);
	            }
	            this._fun();
	            this._fun = null;
	            this._byte = null;
	        };
	        GroupRes.prototype.readItem = function (isG) {
	            var types = this._byte.readInt();
	            var item = new Pan3d.GroupItem();
	            item.isGroup = isG;
	            if (isG) {
	                item.x = this._byte.readFloat();
	                item.y = this._byte.readFloat();
	                item.z = this._byte.readFloat();
	                item.scaleX = this._byte.readFloat();
	                item.scaleY = this._byte.readFloat();
	                item.scaleZ = this._byte.readFloat();
	                item.rotationX = this._byte.readFloat();
	                item.rotationY = this._byte.readFloat();
	                item.rotationZ = this._byte.readFloat();
	            }
	            if (types == Pan3d.BaseRes.PREFAB_TYPE) {
	                item.objUrl = this._byte.readUTF();
	                item.materialUrl = this._byte.readUTF();
	                if (this.version >= 4) {
	                    item.materialInfoArr = this.readMaterialInfo();
	                }
	                item.types = Pan3d.BaseRes.PREFAB_TYPE;
	            }
	            else if (types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
	                item.particleUrl = this._byte.readUTF();
	                item.types = Pan3d.BaseRes.SCENE_PARTICLE_TYPE;
	            }
	            this.dataAry.push(item);
	        };
	        GroupRes.prototype.initReg = function () {
	            this._objDic = new Object;
	            this._materialDic = new Object;
	            this._particleDic = new Object;
	            for (var i = 0; i < this.dataAry.length; i++) {
	                var item = this.dataAry[i];
	                if (item.objUrl) {
	                    this._objDic[this.scene3D.fileRoot + item.objUrl] = true;
	                }
	                if (item.materialUrl) {
	                    this._materialDic[this.scene3D.fileRoot + item.materialUrl] = true;
	                }
	                if (item.particleUrl) {
	                    this._particleDic[this.scene3D.fileRoot + item.particleUrl] = true;
	                }
	            }
	            for (var key in this._objDic) {
	                this.scene3D.objDataManager.registerUrl(key);
	            }
	            for (var key in this._materialDic) {
	                this.scene3D.materialManager.registerUrl(key);
	            }
	            for (var key in this._particleDic) {
	                this.scene3D.particleManager.registerUrl(key);
	            }
	        };
	        return GroupRes;
	    }(Pan3d.BaseRes));
	    Pan3d.GroupRes = GroupRes;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=GroupRes.js.map

/***/ }),
/* 35 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SkillRes = /** @class */ (function (_super) {
	        __extends(SkillRes, _super);
	        function SkillRes(value) {
	            var _this = _super.call(this, value) || this;
	            _this.meshBatchNum = 1;
	            return _this;
	        }
	        SkillRes.prototype.load = function (url, $fun) {
	            var _this = this;
	            this._fun = $fun;
	            Pan3d.LoadManager.getInstance().load(url, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
	                _this.loadComplete($byte);
	            });
	        };
	        SkillRes.prototype.loadComplete = function ($byte) {
	            var _this = this;
	            this._byte = new Pan3d.Pan3dByteArray($byte);
	            this._byte.position = 0;
	            this.version = this._byte.readInt();
	            this.skillUrl = this._byte.readUTF();
	            ////console.log("aaaaaaaaaaaaaa " + $byte.byteLength + "," + this._byte.length);
	            this.read(function () { _this.readNext(); }); //readimg 
	        };
	        SkillRes.prototype.readNext = function () {
	            this.read(); //readmaterial
	            this.read(); //readparticle;
	            if (this.version < 27) {
	                var str = this._byte.readUTF();
	            }
	            this.data = this.readData(this._byte);
	            this._fun();
	        };
	        SkillRes.prototype.readData = function ($byte) {
	            var len = $byte.readInt();
	            var byteData = new Object;
	            for (var i = 0; i < len; i++) {
	                var $obj = new Object;
	                var $name = $byte.readUTF();
	                var $action = $byte.readUTF();
	                $obj.skillname = $name;
	                $obj.action = $action;
	                $obj.type = $byte.readFloat();
	                if (this.version >= 26) {
	                    $obj.blood = $byte.readInt();
	                    if ($obj.blood == 0) {
	                        $obj.blood = Pan3d.SkillVo.defaultBloodTime;
	                    }
	                }
	                else {
	                    $obj.blood = Pan3d.SkillVo.defaultBloodTime;
	                }
	                if (this.version >= 32) {
	                    var soundTime = $byte.readInt();
	                    if (soundTime > 0) {
	                        var soundName = $byte.readUTF();
	                        $obj.sound = { time: soundTime, name: soundName };
	                    }
	                }
	                if (this.version >= 33) {
	                    var shockLen = $byte.readInt();
	                    if (shockLen) {
	                        var shockAry = new Array;
	                        for (var k = 0; k < shockLen; k++) {
	                            var shobj = new Object;
	                            shobj.time = $byte.readInt();
	                            shobj.lasttime = $byte.readInt();
	                            shobj.amp = $byte.readFloat();
	                            shockAry.push(shobj);
	                        }
	                        $obj.shock = shockAry;
	                    }
	                }
	                // $obj.data=JSON.parse($byte.readUTF())
	                $obj.data = new Array;
	                var dLen = $byte.readInt();
	                for (var j = 0; j < dLen; j++) {
	                    var dataObj = new Object;
	                    dataObj.url = $byte.readUTF();
	                    dataObj.frame = $byte.readFloat();
	                    switch ($obj.type) {
	                        case 1:
	                            dataObj.beginType = $byte.readInt();
	                            if (dataObj.beginType == 0) {
	                                dataObj.beginPos = new Pan3d.Vector3D();
	                                dataObj.beginPos.x = $byte.readFloat();
	                                dataObj.beginPos.y = $byte.readFloat();
	                                dataObj.beginPos.z = $byte.readFloat();
	                            }
	                            else if (dataObj.beginType == 1) {
	                                dataObj.beginSocket = $byte.readUTF();
	                            }
	                            dataObj.hitSocket = $byte.readUTF();
	                            dataObj.endParticle = $byte.readUTF();
	                            dataObj.multype = $byte.readInt();
	                            dataObj.speed = $byte.readFloat();
	                            break;
	                        case 3:
	                            dataObj.beginSocket = $byte.readUTF();
	                            dataObj.beginType = $byte.readFloat();
	                            dataObj.multype = $byte.readFloat();
	                            dataObj.speed = $byte.readFloat();
	                            break;
	                        case 4:
	                            if (this.version >= 27) {
	                                var hasSocket = $byte.readBoolean();
	                                dataObj.hasSocket = hasSocket;
	                                if (hasSocket) {
	                                    dataObj.socket = $byte.readUTF();
	                                }
	                                else {
	                                    dataObj.pos = this.readV3d($byte);
	                                    dataObj.rotation = this.readV3d($byte);
	                                }
	                            }
	                            else {
	                                dataObj.hasSocket = false;
	                                dataObj.pos = this.readV3d($byte);
	                                dataObj.rotation = this.readV3d($byte);
	                            }
	                            break;
	                        default:
	                            alert("没有类型readData");
	                            break;
	                    }
	                    $obj.data.push(dataObj);
	                }
	                byteData[$name] = $obj;
	            }
	            return byteData;
	        };
	        SkillRes.prototype.readV3d = function ($byte) {
	            var v3d = new Pan3d.Vector3D;
	            v3d.x = $byte.readFloat();
	            v3d.y = $byte.readFloat();
	            v3d.z = $byte.readFloat();
	            v3d.w = $byte.readFloat();
	            return v3d;
	        };
	        return SkillRes;
	    }(Pan3d.BaseRes));
	    Pan3d.SkillRes = SkillRes;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillRes.js.map

/***/ }),
/* 36 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Shader3D = /** @class */ (function (_super) {
	        __extends(Shader3D, _super);
	        function Shader3D(value) {
	            var _this = _super.call(this, value) || this;
	            _this.fragment = _this.getFragmentShaderString();
	            return _this;
	        }
	        Object.defineProperty(Shader3D.prototype, "paramAry", {
	            get: function () {
	                return this._paramAry;
	            },
	            set: function (value) {
	                this._paramAry = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Shader3D.prototype.encode = function (v, f) {
	            if (v) {
	                this.vertex = v;
	            }
	            else {
	                this.vertex = this.getVertexShaderString();
	            }
	            ////console.log(this.vertex);
	            var $context = this.scene3D.context3D.webGlRender;
	            this.program = $context.createProgram();
	            this.vShader = $context.createShader($context.VERTEX_SHADER);
	            this.fShader = $context.createShader($context.FRAGMENT_SHADER);
	            $context.shaderSource(this.vShader, this.vertex);
	            $context.shaderSource(this.fShader, this.fragment);
	            $context.compileShader(this.vShader);
	            $context.compileShader(this.fShader);
	            $context.attachShader(this.program, this.vShader);
	            $context.attachShader(this.program, this.fShader);
	            this.binLocation($context);
	            $context.linkProgram(this.program);
	            //Scene_data.context3D.addProgram(this.program);
	            this.localDic = new Object();
	            var info = $context.getProgramInfoLog(this.program);
	            var vInfo = $context.getShaderInfoLog(this.vShader);
	            var fInfo = $context.getShaderInfoLog(this.fShader);
	            if (info != "" || vInfo != "" || fInfo != "") {
	                if (info != "") {
	                    console.log("shader error: " + info);
	                    return false;
	                }
	                if (vInfo != "") {
	                    console.log("shader error: " + vInfo);
	                    return true;
	                }
	                if (fInfo != "") {
	                    console.log("shader error: " + fInfo);
	                    return true;
	                }
	            }
	            else {
	                return true;
	            }
	        };
	        Shader3D.prototype.getWebGLUniformLocation = function ($name) {
	            var context3D = this.scene3D.context3D;
	            var local = this.localDic[$name];
	            if (local) {
	                return local;
	            }
	            else {
	                this.localDic[$name] = context3D.getLocation(this.program, $name);
	                return this.localDic[$name];
	            }
	        };
	        Shader3D.prototype.binLocation = function ($context) {
	        };
	        Shader3D.prototype.getVertexShaderString = function () {
	            return "";
	        };
	        Shader3D.prototype.getFragmentShaderString = function () {
	            return "";
	        };
	        return Shader3D;
	    }(Pan3d.ResCount));
	    Pan3d.Shader3D = Shader3D;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Shader3D.js.map

/***/ }),
/* 37 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ProgrmaManager = /** @class */ (function (_super) {
	        __extends(ProgrmaManager, _super);
	        function ProgrmaManager(value) {
	            return _super.call(this, value) || this;
	        }
	        ProgrmaManager.prototype.getMaterialProgram = function (key, shaderCls, $material, paramAry, parmaByFragmet) {
	            if (paramAry === void 0) { paramAry = null; }
	            if (parmaByFragmet === void 0) { parmaByFragmet = false; }
	            var keyStr = key + "_" + $material.url;
	            if (paramAry) {
	                for (var i = 0; i < paramAry.length; i++) {
	                    keyStr += "_" + paramAry[i];
	                }
	                if (parmaByFragmet) {
	                    keyStr += "true_";
	                }
	                else {
	                    keyStr += "false_";
	                }
	            }
	            if (this.dic[keyStr]) {
	                this.dic[keyStr].useNum++;
	                return this.dic[keyStr];
	            }
	            console.log(keyStr);
	            if (parmaByFragmet) {
	                paramAry = [$material.usePbr, $material.useNormal, $material.hasFresnel,
	                    $material.useDynamicIBL, $material.lightProbe, $material.directLight,
	                    $material.noLight, $material.fogMode];
	            }
	            var shader = new shaderCls(this.scene3D);
	            shader.paramAry = paramAry;
	            shader.fragment = $material.shaderStr;
	            console.log(keyStr);
	            if (keyStr.search("r33333") != -1 && true) { //FIXME
	                this.outShader(shader.getVertexShaderString());
	                this.outShader(shader.fragment);
	                console.log(">>>>>>>>>>>>>>>>>>>");
	                console.log("----修改后-------");
	                console.log("以上为修改后的");
	                shader.fragment =
	                    " ";
	            }
	            var encodetf = shader.encode();
	            if (!encodetf) {
	                console.log("**********错误" + keyStr);
	                console.log(shader.vertex);
	                console.log(shader.fragment);
	            }
	            this.dic[keyStr] = shader;
	            return shader;
	        };
	        ProgrmaManager.prototype.outShader = function ($str) {
	            var $item = $str.split("\n");
	            console.log("----");
	            for (var i = 0; i < $item.length; i++) {
	                var str = "\"";
	                str += $item[i];
	                if (i < ($item.length - 1)) {
	                    str += "\\n";
	                    str += "\"";
	                    str += "\+";
	                }
	                else {
	                    str += "\"";
	                }
	                console.log(str);
	            }
	            console.log("----");
	        };
	        ProgrmaManager.prototype.getProgram = function ($str) {
	            if (this.dic[$str]) {
	                return this.dic[$str];
	            }
	            else {
	                alert("please registe Program=>" + $str);
	                return null;
	            }
	        };
	        ProgrmaManager.prototype.registe = function ($str, $shader3D) {
	            if (!this.dic[$str]) {
	                $shader3D.encode();
	                $shader3D.name = $str;
	                this.dic[$str] = $shader3D;
	            }
	        };
	        return ProgrmaManager;
	    }(Pan3d.ResGC));
	    Pan3d.ProgrmaManager = ProgrmaManager;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ProgrmaManager.js.map

/***/ }),
/* 38 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var MaterialShader = /** @class */ (function (_super) {
	        __extends(MaterialShader, _super);
	        function MaterialShader(value) {
	            var _this = _super.call(this, value) || this;
	            _this.name = "Material_shader";
	            return _this;
	        }
	        MaterialShader.prototype.binLocation = function ($context) {
	            $context.bindAttribLocation(this.program, 0, "v3Position");
	            $context.bindAttribLocation(this.program, 1, "v2CubeTexST");
	            var usePbr = this.paramAry[0];
	            var useNormal = this.paramAry[1];
	            var lightProbe = this.paramAry[4];
	            var directLight = this.paramAry[5];
	            var noLight = this.paramAry[6];
	            if (!(directLight || noLight)) {
	                $context.bindAttribLocation(this.program, 2, "v2lightuv");
	            }
	            if (usePbr) {
	                $context.bindAttribLocation(this.program, 3, "v3Normal");
	                if (useNormal) {
	                    $context.bindAttribLocation(this.program, 4, "v3Tangent");
	                    $context.bindAttribLocation(this.program, 5, "v3Bitangent");
	                }
	            }
	            else if (directLight) {
	                $context.bindAttribLocation(this.program, 3, "v3Normal");
	            }
	        };
	        MaterialShader.prototype.getVertexShaderString = function () {
	            var usePbr = this.paramAry[0];
	            var useNormal = this.paramAry[1];
	            var hasFresnel = this.paramAry[2];
	            var useDynamicIBL = this.paramAry[3];
	            var lightProbe = this.paramAry[4];
	            var directLight = this.paramAry[5];
	            var noLight = this.paramAry[6];
	            var fogMode = this.paramAry[7];
	            var $str = "attribute vec3 v3Position;\n" +
	                "attribute vec2 v2CubeTexST;\n" +
	                "varying vec2 v0;\n";
	            if (directLight) {
	                $str += "varying vec3 v2;\n";
	            }
	            else if (noLight) {
	            }
	            else {
	                $str +=
	                    "attribute vec2 v2lightuv;\n" +
	                        "varying vec2 v2;\n";
	            }
	            if (usePbr) {
	                $str +=
	                    "attribute vec3 v3Normal;\n" +
	                        "varying vec3 v1;\n";
	                if (!useNormal) {
	                    $str += "varying vec3 v4;\n";
	                }
	                else {
	                    $str += "varying mat3 v4;\n";
	                }
	            }
	            else if (fogMode != 0) {
	                $str +=
	                    "varying vec3 v1;\n";
	            }
	            if (useNormal) {
	                $str +=
	                    "attribute vec3 v3Tangent;\n" +
	                        "attribute vec3 v3Bitangent;\n";
	            }
	            if (directLight) {
	                if (!usePbr) {
	                    $str +=
	                        "attribute vec3 v3Normal;\n";
	                }
	                $str +=
	                    "uniform vec3 sunDirect;\n" +
	                        "uniform vec3 sunColor;\n" +
	                        "uniform vec3 ambientColor;\n";
	            }
	            $str +=
	                // "uniform mat4 viewMatrix3D;\n" +
	                // "uniform mat4 camMatrix3D;\n" +
	                "uniform mat4 vpMatrix3D;\n" +
	                    "uniform mat4 posMatrix3D;\n";
	            if (usePbr) {
	                $str +=
	                    "uniform mat3 rotationMatrix3D;\n";
	            }
	            $str +=
	                "void main(void){\n" +
	                    "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);\n" +
	                    "vec4 vt0= vec4(v3Position, 1.0);\n" +
	                    "vt0 = posMatrix3D * vt0;\n";
	            if (!(directLight || noLight)) {
	                $str += "v2 = vec2(v2lightuv.x, v2lightuv.y);\n";
	            }
	            if (usePbr || fogMode != 0) {
	                $str +=
	                    "v1 = vec3(vt0.x,vt0.y,vt0.z);\n";
	            }
	            $str +=
	                //"vt0 = camMatrix3D * vt0;\n" +
	                "vt0 = vpMatrix3D * vt0;\n";
	            if (usePbr) {
	                if (!useNormal) {
	                    $str += "v4 = rotationMatrix3D * v3Normal;\n";
	                }
	                else {
	                    $str +=
	                        "v4 = mat3(rotationMatrix3D * v3Tangent,rotationMatrix3D * v3Bitangent, rotationMatrix3D * v3Normal);\n";
	                }
	            }
	            if (directLight) {
	                if (!usePbr) {
	                    $str +=
	                        //    "vec4 n = rotationMatrix3D * vec4(v3Normal, 1.0);\n" +
	                        "vec3 n = rotationMatrix3D * v3Normal;\n" +
	                            "float suncos = dot(n.xyz,sunDirect.xyz);\n";
	                }
	                else {
	                    $str +=
	                        "float suncos = dot(v4.xyz,sunDirect.xyz);\n";
	                }
	                $str +=
	                    "suncos = clamp(suncos,0.0,1.0);\n" +
	                        "v2 = sunColor * suncos + ambientColor;";
	                //"v2 = vec3(1.0,0.0,0.0);\n";
	            }
	            $str += "gl_Position = vt0;" + "}";
	            // this.outstr($str);
	            /*
	                       $str =
	                       "attribute vec3 v3Position;"+
	                       "attribute vec2 v2CubeTexST;"+
	                       "varying vec2 v0;"+
	                       "attribute vec2 v2lightuv;"+
	                       "varying vec2 v2;"+
	                       "varying vec3 v1;"+
	                       "uniform mat4 vpMatrix3D;"+
	                       "uniform mat4 posMatrix3D;"+
	           
	                           "void main(void)\n" +
	                           "{\n" +
	                           "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y);"+
	                           "vec4 vt0= vec4(v3Position, 1.0);"+
	                           "vt0 = posMatrix3D * vt0;"+
	                           "v2 = vec2(v2lightuv.x, v2lightuv.y);"+
	                           "v1 = vec3(vt0.x,vt0.y,vt0.z);"+
	                           "vt0 = vpMatrix3D * vt0;"+
	                           "gl_Position = vt0;"+
	                           "}"
	                           */
	            return $str;
	        };
	        MaterialShader.prototype.outstr = function (str) {
	            var arr = str.split(";");
	            for (var i = 0; i < arr.length; i++) {
	                var $ddd = String(trim(arr[i]));
	                console.log("\"" + $ddd + "\;" + "\"" + "\+");
	            }
	            console.log(arr);
	        };
	        MaterialShader.prototype.getFragmentShaderString = function () {
	            var $str = 
	            //"#ifdef GL_FRAGMENT_PRECISION_HIGH\n" +
	            //"precision highp float;\n" +
	            //" #else\n" +
	            //" precision mediump float;\n" +
	            //" #endif\n" +
	            "uniform sampler2D s_texture1;\n" +
	                //"uniform sampler2D light_texture;\n" +
	                "uniform vec4 testconst;" +
	                "varying vec2 v_texCoord;\n" +
	                //"varying vec2 v_texLight;\n" +
	                "void main(void)\n" +
	                "{\n" +
	                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
	                //"if (infoUv.a <= 0.9) {\n" +
	                //"     discard;\n" +
	                //"}\n" +
	                //"vec4 infoLight = texture2D(light_texture, v_texLight);\n" +
	                //"vec4 test = vec4(0.5,0,0,1);\n" +
	                "infoUv.xyz = testconst.xyz * infoUv.xyz;\n" +
	                //"info.rgb = info.rgb / 0.15;\n" +
	                "gl_FragColor = infoUv;\n" +
	                "}";
	            return $str;
	        };
	        MaterialShader.MATERIAL_SHADER = "Material_shader";
	        return MaterialShader;
	    }(Pan3d.Shader3D));
	    Pan3d.MaterialShader = MaterialShader;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=MaterialShader.js.map

/***/ }),
/* 39 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Display3D = /** @class */ (function (_super) {
	        __extends(Display3D, _super);
	        function Display3D(value) {
	            var _this = _super.call(this) || this;
	            _this.sceneVisible = true;
	            _this.scene3D = value;
	            _this.posMatrix = new Pan3d.Matrix3D();
	            return _this;
	        }
	        Display3D.prototype.upFrame = function () {
	        };
	        Display3D.prototype.updateMatrix = function () {
	            this.posMatrix.identity();
	            this.posMatrix.appendScale(this.scaleX, this.scaleY, this.scaleZ);
	            this.posMatrix.appendRotation(this.rotationX, Pan3d.Vector3D.X_AXIS);
	            this.posMatrix.appendRotation(this.rotationY, Pan3d.Vector3D.Y_AXIS);
	            this.posMatrix.appendRotation(this.rotationZ, Pan3d.Vector3D.Z_AXIS);
	            this.posMatrix.appendTranslation(this.x, this.y, this.z);
	        };
	        return Display3D;
	    }(Pan3d.Object3D));
	    Pan3d.Display3D = Display3D;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Display3D.js.map

/***/ }),
/* 40 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Display3DShader = /** @class */ (function (_super) {
	        __extends(Display3DShader, _super);
	        function Display3DShader(value) {
	            return _super.call(this, value) || this;
	        }
	        Display3DShader.prototype.binLocation = function (gl) {
	            gl.bindAttribLocation(this.program, 0, "v3Position");
	            gl.bindAttribLocation(this.program, 1, "u2Texture");
	        };
	        Display3DShader.prototype.getVertexShaderString = function () {
	            var $str = "attribute vec3 v3Position;" +
	                "attribute vec2 u2Texture;" +
	                "varying vec2 v_texCoord;" +
	                "uniform mat4 vpMatrix3D;\n" +
	                "uniform mat4 posMatrix;\n" +
	                "void main(void)" +
	                "{" +
	                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
	                "   vec4 vt0= vec4(v3Position, 1.0);" +
	                "   gl_Position =vpMatrix3D*posMatrix* vt0;" +
	                "}";
	            return $str;
	        };
	        Display3DShader.prototype.getFragmentShaderString = function () {
	            var $str = "precision mediump float;\n" +
	                "varying vec2 v_texCoord;\n" +
	                "uniform sampler2D baseTexture;\n" +
	                "void main(void)\n" +
	                "{\n" +
	                "vec4 infoUv = texture2D(baseTexture, v_texCoord.xy);\n" +
	                "gl_FragColor =infoUv;\n" +
	                "}";
	            return $str;
	        };
	        Display3DShader.Display3DShader = "Display3DShader";
	        return Display3DShader;
	    }(Pan3d.Shader3D));
	    Pan3d.Display3DShader = Display3DShader;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Display3DShader.js.map

/***/ }),
/* 41 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Display3DSprite = /** @class */ (function (_super) {
	        __extends(Display3DSprite, _super);
	        function Display3DSprite(value) {
	            var _this = _super.call(this, value) || this;
	            _this.dynamic = false;
	            _this.time = 0;
	            _this.initData();
	            _this.rotationMatrix = new Pan3d.Matrix3D();
	            return _this;
	        }
	        Display3DSprite.prototype.setPicUrl = function (url) {
	            // throw new Error("Method not implemented.");
	        };
	        Display3DSprite.prototype.initData = function () {
	        };
	        Display3DSprite.prototype.setObjUrl = function (value) {
	            var _this = this;
	            this.scene3D.objDataManager.getObjData(this.scene3D.fileRoot + value, function ($obj) {
	                _this.objData = $obj;
	            });
	        };
	        Display3DSprite.prototype.setLighturl = function (value) {
	            var _this = this;
	            this.scene3D.textureManager.getTexture(this.scene3D.fileRoot + value, function (textureRes) {
	                _this.lightTextureRes = textureRes;
	            });
	        };
	        Display3DSprite.prototype.setMaterialUrl = function (value, $paramData) {
	            var _this = this;
	            if ($paramData === void 0) { $paramData = null; }
	            value = value.replace("_byte.txt", ".txt");
	            value = value.replace(".txt", "_byte.txt");
	            this.scene3D.materialManager.getMaterialByte(this.scene3D.fileRoot + value, function ($material) {
	                _this.material = $material;
	                if ($paramData) {
	                    _this.materialParam = new Pan3d.MaterialBaseParam(_this.scene3D);
	                    _this.materialParam.setData(_this.material, $paramData);
	                }
	                if (_this.material.usePbr || _this.material.directLight) {
	                    _this._rotationData = new Float32Array(9);
	                }
	            }, null, true, Pan3d.MaterialShader.MATERIAL_SHADER, Pan3d.MaterialShader);
	        };
	        Display3DSprite.prototype.upFrame = function () {
	            this.updateMatrix();
	            if (this.objData && this.objData.indexBuffer && this.material) {
	                var ctx = this.scene3D.context3D;
	                this.shader3D = this.material.shader;
	                ctx.setProgram(this.shader3D.program);
	                this.updateBind();
	                this.setMaterialVa();
	                this.setMaterialTexture(this.material, this.materialParam);
	                this.setMaterialVc(this.material, this.materialParam);
	                this.setVc();
	                ctx.drawCall(this.objData.indexBuffer, this.objData.treNum);
	            }
	        };
	        Display3DSprite.prototype.updateBind = function () {
	            if (this.bindTarget) {
	                this.posMatrix.identity();
	                this.posMatrix.appendScale(this.scaleX, this.scaleY, this.scaleZ);
	                this.bindTarget.getSocket(this.bindSocket, this.bindMatrix);
	                this.posMatrix.append(this.bindMatrix);
	            }
	        };
	        Display3DSprite.prototype.setVc = function () {
	            var ctx = this.scene3D.context3D;
	            ctx.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
	            ctx.setVcMatrix4fv(this.shader3D, "posMatrix3D", this.posMatrix.m);
	            if (this.material.usePbr || this.material.directLight) {
	                ctx.setVcMatrix3fv(this.material.shader, "rotationMatrix3D", this._rotationData);
	            }
	        };
	        Display3DSprite.prototype.setMaterialVc = function ($material, $mp) {
	            if ($mp === void 0) { $mp = null; }
	            if ($material.fcNum <= 0) {
	                return;
	            }
	            var t = 0;
	            if ($material.hasTime) {
	                t = (Pan3d.TimeUtil.getTimer() - this.time) % 100000 * 0.001;
	            }
	            $material.update(t);
	            if ($mp) {
	                $mp.update();
	            }
	            var ctx = this.scene3D.context3D;
	            ctx.setVc4fv($material.shader, "fc", $material.fcData);
	        };
	        Display3DSprite.prototype.setBind = function ($bindTarget, $bindSocket) {
	            this.bindTarget = $bindTarget;
	            this.bindSocket = $bindSocket;
	            this.bindMatrix = new Pan3d.Matrix3D();
	        };
	        Display3DSprite.prototype.setMaterialTexture = function ($material, $mp) {
	            var ctx = this.scene3D.context3D;
	            var texVec = $material.texList;
	            for (var i = 0; i < texVec.length; i++) {
	                if (texVec[i].type == Pan3d.TexItem.LIGHTMAP) {
	                    if (this.lightTextureRes) {
	                        ctx.setRenderTexture($material.shader, texVec[i].name, this.lightTextureRes.texture, texVec[i].id);
	                    }
	                }
	                else if (texVec[i].type == Pan3d.TexItem.CUBEMAP) {
	                    if ($material.useDynamicIBL) { // && _reflectionTextureVo) {
	                        //_context.setTextureAt(texVec[i].id, _reflectionTextureVo.texture);
	                    }
	                    else {
	                        var index = Math.floor($material.roughness * 5);
	                        if (this.scene3D.skyCubeMap) {
	                            var cubeTexture = this.scene3D.skyCubeMap[index];
	                            ctx.setRenderTextureCube($material.shader.program, texVec[i].name, cubeTexture, texVec[i].id);
	                        }
	                    }
	                }
	                else {
	                    if (texVec[i].texture) {
	                        ctx.setRenderTexture($material.shader, texVec[i].name, texVec[i].texture, texVec[i].id);
	                    }
	                }
	            }
	            if ($mp) {
	                for (i = 0; i < $mp.dynamicTexList.length; i++) {
	                    if ($mp.dynamicTexList[i].target) {
	                        ctx.setRenderTexture($material.shader, $mp.dynamicTexList[i].target.name, $mp.dynamicTexList[i].texture, $mp.dynamicTexList[i].target.id);
	                    }
	                }
	            }
	        };
	        Display3DSprite.prototype.setMaterialVa = function () {
	            var ctx = this.scene3D.context3D;
	            if (ctx.pushVa(this.objData.vertexBuffer)) {
	                return;
	            }
	            ctx.setVaOffset(0, 3, this.objData.stride, 0);
	            ctx.setVaOffset(1, 2, this.objData.stride, this.objData.uvsOffsets);
	            if (!(this.material.directLight || this.material.noLight)) {
	                ctx.setVaOffset(2, 2, this.objData.stride, this.objData.lightuvsOffsets);
	            }
	        };
	        return Display3DSprite;
	    }(Pan3d.Display3D));
	    Pan3d.Display3DSprite = Display3DSprite;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Display3DSprite.js.map

/***/ }),
/* 42 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var BaseEvent = /** @class */ (function () {
	        function BaseEvent($type) {
	            this.type = $type;
	        }
	        BaseEvent.COMPLETE = "complete";
	        return BaseEvent;
	    }());
	    Pan3d.BaseEvent = BaseEvent;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Event.js.map

/***/ }),
/* 43 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var EventDispatcher = /** @class */ (function () {
	        function EventDispatcher() {
	            this._eventsMap = null;
	        }
	        EventDispatcher.prototype.addEventListener = function (types, listener, thisObject) {
	            if (!this._eventsMap) {
	                this._eventsMap = new Object;
	            }
	            var list = this._eventsMap[types];
	            if (!list) {
	                list = this._eventsMap[types] = [];
	            }
	            var eventBin = { listener: listener, thisObject: thisObject };
	            for (var i = 0; i < list.length; i++) {
	                var bin = list[i];
	                if (bin.listener == listener && bin.thisObject == thisObject) {
	                    return;
	                }
	            }
	            list.push(eventBin);
	        };
	        EventDispatcher.prototype.removeEventListener = function (type, listener, thisObject) {
	            if (this._eventsMap == null) {
	                return;
	            }
	            var list = this._eventsMap[type];
	            for (var i = 0; list && i < list.length; i++) {
	                var bin = list[i];
	                if (bin.listener == listener && bin.thisObject == thisObject) {
	                    list.splice(i, 1);
	                    return;
	                }
	            }
	        };
	        EventDispatcher.prototype.dispatchEvent = function (event) {
	            var eventMap = this._eventsMap;
	            if (!eventMap) {
	                return true;
	            }
	            var list = eventMap[event.type];
	            if (!list) {
	                return true;
	            }
	            var length = list.length;
	            if (length == 0) {
	                return true;
	            }
	            event.target = this;
	            for (var i = 0; i < length; i++) {
	                var eventBin = list[i];
	                eventBin.listener.call(eventBin.thisObject, event);
	            }
	        };
	        return EventDispatcher;
	    }());
	    Pan3d.EventDispatcher = EventDispatcher;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=EventDispatcher.js.map

/***/ }),
/* 44 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var MouseType = /** @class */ (function () {
	        function MouseType() {
	        }
	        MouseType.MouseDown = "mousedown";
	        MouseType.MouseUp = "mouseup";
	        MouseType.MouseMove = "mousemove";
	        MouseType.MouseClick = "mouseclick";
	        MouseType.KeyDown = "keydown";
	        MouseType.KeyUp = "keyup";
	        MouseType.MouseWheel = "mousewheel";
	        //public static TouchMown = "panstart";   
	        //public static TouchMove = "panmove";
	        //public static TouchUp = "panend";
	        //public static TouchClick = "tap";
	        MouseType.TouchStart = "touchstart";
	        MouseType.TouchMove = "touchmove";
	        MouseType.TouchEnd = "touchend";
	        MouseType.TouchClick = "touchstart";
	        return MouseType;
	    }());
	    Pan3d.MouseType = MouseType;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=MouseType.js.map

/***/ }),
/* 45 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var InteractiveEvent = /** @class */ (function (_super) {
	        __extends(InteractiveEvent, _super);
	        function InteractiveEvent() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        InteractiveEvent.Down = "down";
	        InteractiveEvent.Up = "Up";
	        InteractiveEvent.Move = "Move";
	        InteractiveEvent.PinchStart = "PinchStart";
	        InteractiveEvent.Pinch = "Pinch";
	        InteractiveEvent.WheelEvent = "WheelEvent";
	        return InteractiveEvent;
	    }(Pan3d.BaseEvent));
	    Pan3d.InteractiveEvent = InteractiveEvent;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=InteractiveEvent.js.map

/***/ }),
/* 46 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var UIStage = /** @class */ (function (_super) {
	        __extends(UIStage, _super);
	        function UIStage() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        UIStage.prototype.interactiveEvent = function (e) {
	            var evtType = e.type;
	            var eventMap = this._eventsMap;
	            if (!eventMap) {
	                return false;
	            }
	            var list = eventMap[evtType];
	            if (!list) {
	                return false;
	            }
	            var length = list.length;
	            if (length == 0) {
	                return false;
	            }
	            for (var i = length - 1; i >= 0; i--) {
	                var eventBin = list[i];
	                eventBin.listener.call(eventBin.thisObject, e);
	            }
	            return true;
	        };
	        return UIStage;
	    }(Pan3d.EventDispatcher));
	    Pan3d.UIStage = UIStage;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=UIStage.js.map

/***/ }),
/* 47 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var GameMouseManager = /** @class */ (function () {
	        function GameMouseManager() {
	            this.resetPos = new Pan3d.Vector2D();
	            this.bindPos = new Pan3d.Vector2D();
	            this.useMouseEvent = true;
	            this.isPc = true;
	            this.uiBlankStage = new Pan3d.UIStage();
	        }
	        GameMouseManager.getInstance = function () {
	            if (!this._instance) {
	                this._instance = new GameMouseManager();
	            }
	            return this._instance;
	        };
	        GameMouseManager.prototype.addMouseEvent = function (value) {
	            var _this = this;
	            if (this.isPc) {
	                value.addEventListener(Pan3d.MouseType.MouseDown, function ($evt) { _this.onMouse($evt); });
	                value.addEventListener(Pan3d.MouseType.MouseUp, function ($evt) { _this.onMouse($evt); });
	                value.addEventListener(Pan3d.MouseType.MouseMove, function ($evt) { _this.onMouse($evt); });
	                value.addEventListener(Pan3d.MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
	            }
	            else {
	                value.addEventListener(Pan3d.MouseType.TouchMove, function ($evt) { _this.onTouchMove($evt); });
	                value.addEventListener(Pan3d.MouseType.TouchEnd, function ($evt) { _this.onTouchEnd($evt); });
	                value.addEventListener(Pan3d.MouseType.TouchStart, function ($evt) { _this.onTouchStart($evt); });
	                value.addEventListener(Pan3d.MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
	            }
	            this.bindPos.x = this.resetPos.x;
	            this.bindPos.y = this.resetPos.y;
	        };
	        GameMouseManager.prototype.onMouseWheel = function (event) {
	            var evt;
	            evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.WheelEvent);
	            evt.data = event.deltaY;
	            this.uiBlankStage.interactiveEvent(evt);
	        };
	        GameMouseManager.prototype.isCanUseMouseEvent = function () {
	            return this.useMouseEvent;
	        };
	        GameMouseManager.prototype.onMouse = function ($e) {
	            if (!this.isCanUseMouseEvent()) {
	                return;
	            }
	            if ($e.button == 2) {
	                return;
	            }
	            var evt;
	            var point = new Pan3d.Vector2D();
	            if ($e instanceof MouseEvent) {
	                if ($e.type == Pan3d.MouseType.MouseDown) {
	                    evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Down);
	                }
	                else if ($e.type == Pan3d.MouseType.MouseUp) {
	                    evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Up);
	                }
	                else if ($e.type == Pan3d.MouseType.MouseMove) {
	                    evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Move);
	                }
	                else if ($e.type == Pan3d.MouseType.MouseClick) {
	                }
	                point.x = $e.pageX;
	                point.y = $e.pageY;
	            }
	            if (evt) {
	                evt.mouseEvent = $e;
	            }
	            this.makeMouseEvent(evt, point);
	        };
	        GameMouseManager.prototype.mouseToEvent = function ($touchEvent) {
	            var evt;
	            var point = new Pan3d.Vector2D();
	            if ($touchEvent.type == Pan3d.MouseType.TouchStart) {
	                evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Down);
	            }
	            else if ($touchEvent.type == Pan3d.MouseType.TouchEnd) {
	                evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Up);
	                point.x = $touchEvent.changedTouches[0].pageX;
	                point.y = $touchEvent.changedTouches[0].pageY;
	            }
	            else if ($touchEvent.type == Pan3d.MouseType.TouchMove) {
	                evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Move);
	            }
	            if ($touchEvent.touches.length) {
	                point.x = $touchEvent.touches[$touchEvent.touches.length - 1].clientX;
	                point.y = $touchEvent.touches[$touchEvent.touches.length - 1].clientY;
	            }
	            this.makeMouseEvent(evt, point);
	            return evt;
	        };
	        GameMouseManager.prototype.makeMouseEvent = function (evt, point) {
	            this.uiBlankStage.interactiveEvent(evt);
	        };
	        GameMouseManager.prototype.onTouchStart = function ($e) {
	            if (!this.isCanUseMouseEvent()) {
	                return;
	            }
	            this.mouseToEvent($e);
	        };
	        GameMouseManager.prototype.onTouchEnd = function ($e) {
	            if (!this.isCanUseMouseEvent()) {
	                return;
	            }
	            this.mouseToEvent($e);
	        };
	        GameMouseManager.prototype.onTouchMove = function ($e) {
	            if (!this.isCanUseMouseEvent()) {
	                return;
	            }
	        };
	        return GameMouseManager;
	    }());
	    Pan3d.GameMouseManager = GameMouseManager;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=GameMouseManager.js.map

/***/ }),
/* 48 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var TextureLoad = /** @class */ (function () {
	        function TextureLoad($fun, $info, $url, $wrap, $filter, $mipmap) {
	            this.fun = $fun;
	            this.info = $info;
	            this.url = $url;
	            this.wrap = $wrap;
	            this.filter = $filter;
	            this.mipmap = $mipmap;
	        }
	        return TextureLoad;
	    }());
	    Pan3d.TextureLoad = TextureLoad;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=TextureLoad.js.map

/***/ }),
/* 49 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var TextureRes = /** @class */ (function (_super) {
	        __extends(TextureRes, _super);
	        function TextureRes() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        return TextureRes;
	    }(Pan3d.ResCount));
	    Pan3d.TextureRes = TextureRes;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=TextureRes.js.map

/***/ }),
/* 50 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var TextureManager = /** @class */ (function (_super) {
	        __extends(TextureManager, _super);
	        function TextureManager(value) {
	            var _this = _super.call(this, value) || this;
	            _this._loadDic = new Object();
	            _this._resDic = new Object();
	            return _this;
	        }
	        TextureManager.prototype.getTexture = function ($url, $fun, $wrapType, $info, $filteType, $mipmapType) {
	            var _this = this;
	            if ($wrapType === void 0) { $wrapType = 0; }
	            if ($info === void 0) { $info = null; }
	            if ($filteType === void 0) { $filteType = 0; }
	            if ($mipmapType === void 0) { $mipmapType = 0; }
	            if (this.dic[$url]) {
	                if ($info) {
	                    $fun(this.dic[$url], $info);
	                }
	                else {
	                    $fun(this.dic[$url]);
	                }
	                this.dic[$url].useNum++;
	                return;
	            }
	            var textureLoad = new Pan3d.TextureLoad($fun, $info, $url, $wrapType, $filteType, $mipmapType);
	            if (this._loadDic[$url]) {
	                var ary = this._loadDic[$url];
	                ary.push(textureLoad);
	                return;
	            }
	            this._loadDic[$url] = new Array;
	            this._loadDic[$url].push(textureLoad);
	            if (this._resDic[$url]) {
	                this.loadTextureCom(this._resDic[$url], textureLoad);
	                delete this._resDic[$url];
	            }
	            else {
	                Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.IMG_TYPE, function ($img, _info) {
	                    _this.loadTextureCom($img, _info);
	                }, textureLoad);
	            }
	        };
	        TextureManager.prototype.addRes = function ($url, $img) {
	            if (!this.dic[$url] && !this._resDic[$url]) {
	                this._resDic[$url] = $img;
	            }
	        };
	        TextureManager.prototype.loadTextureCom = function ($img, _info) {
	            var context3D = this.scene3D.context3D;
	            var texture = context3D.getTexture($img, _info.wrap, _info.filter, _info.mipmap);
	            var textres = new Pan3d.TextureRes(this.scene3D);
	            textres.texture = texture;
	            textres.width = $img.width;
	            textres.height = $img.height;
	            var ary = this._loadDic[_info.url];
	            for (var i = 0; i < ary.length; i++) {
	                if (ary[i].info) {
	                    ary[i].fun(textres, ary[i].info);
	                }
	                else {
	                    ary[i].fun(textres);
	                }
	            }
	            delete this._loadDic[_info.url];
	            this.dic[_info.url] = textres;
	        };
	        TextureManager.prototype.loadCubeTexture = function ($url, $fun) {
	            var cubeMapLoad = new Pan3d.CubemapLoad();
	            cubeMapLoad.loadCube($url, function ($cubeList) { $fun($cubeList); }, this.scene3D);
	        };
	        return TextureManager;
	    }(Pan3d.ResGC));
	    Pan3d.TextureManager = TextureManager;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=TextureManager.js.map

/***/ }),
/* 51 */
/***/ (function(module, exports) {

	/**
	*
	*
	* pramaType 0 表示无类型 1表示 float 2表示 vec2 3表示vec3
	*/
	var Pan3d;
	(function (Pan3d) {
	    var ConstItem = /** @class */ (function () {
	        function ConstItem() {
	            this.value = new Pan3d.Vector3D;
	            this.offset = 0;
	        }
	        Object.defineProperty(ConstItem.prototype, "id", {
	            get: function () {
	                return this._id;
	            },
	            set: function (value) {
	                this._id = value;
	                this.name = "fc" + value;
	                this.offset = value * 4;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        ConstItem.prototype.creat = function ($vc) {
	            this.vecNum = $vc;
	            this.vecNum[0 + this.offset] = this.value.x;
	            this.vecNum[1 + this.offset] = this.value.y;
	            this.vecNum[2 + this.offset] = this.value.z;
	            this.vecNum[3 + this.offset] = this.value.w;
	        };
	        ConstItem.prototype.setData = function (obj) {
	            this.id = obj.id;
	            this.value = new Pan3d.Vector3D(obj.value.x, obj.value.y, obj.value.z, obj.value.w);
	            this.paramName0 = obj.paramName0;
	            this.param0Type = obj.param0Type;
	            this.param0Index = obj.param0Index;
	            this.paramName1 = obj.paramName1;
	            this.param1Type = obj.param1Type;
	            this.param1Index = obj.param1Index;
	            this.paramName2 = obj.paramName2;
	            this.param2Type = obj.param2Type;
	            this.param2Index = obj.param2Index;
	            this.paramName3 = obj.paramName3;
	            this.param3Type = obj.param3Type;
	            this.param3Index = obj.param3Index;
	        };
	        ConstItem.prototype.setDynamicOffset = function ($dynamic) {
	            if (this.paramName0 == $dynamic.paramName) {
	                $dynamic.targetOffset = this.param0Index + this.offset;
	            }
	            else if (this.paramName1 == $dynamic.paramName) {
	                $dynamic.targetOffset = this.param1Index + this.offset;
	            }
	            else if (this.paramName2 == $dynamic.paramName) {
	                $dynamic.targetOffset = this.param2Index + this.offset;
	            }
	            else if (this.paramName3 == $dynamic.paramName) {
	                $dynamic.targetOffset = this.param3Index + this.offset;
	            }
	        };
	        ConstItem.prototype.setDynamicDirect = function ($ary, $offset) {
	            this.vecNum.set($ary, $offset);
	        };
	        ConstItem.prototype.setDynamic = function ($dynamic) {
	            try {
	                this.vecNum.set($dynamic.currentValue, $dynamic.targetOffset);
	            }
	            catch (err) {
	                //console.log("在此处理错误2");
	            }
	            /**
	            if (this.paramName0 == $dynamic.paramName) {
	                if (this.param0Type == 1) {
	                    this.vecNum[this.param0Index + this.offset] = $dynamic.currentValue.x;
	                } else if (this.param0Type == 2) {
	                    this.vecNum[this.param0Index + this.offset] = $dynamic.currentValue.x;
	                    this.vecNum[this.param0Index + 1 + this.offset] = $dynamic.currentValue.y;
	                } else if (this.param0Type == 3) {
	                    this.vecNum[this.param0Index + this.offset] = $dynamic.currentValue.x;
	                    this.vecNum[this.param0Index + 1 + this.offset] = $dynamic.currentValue.y;
	                    this.vecNum[this.param0Index + 2 + this.offset] = $dynamic.currentValue.z;
	                } else if (this.param0Type == 4) {
	                    this.vecNum[this.param0Index + this.offset] = $dynamic.currentValue.x;
	                    this.vecNum[this.param0Index + 1 + this.offset] = $dynamic.currentValue.y;
	                    this.vecNum[this.param0Index + 2 + this.offset] = $dynamic.currentValue.z;
	                    this.vecNum[this.param0Index + 3 + this.offset] = $dynamic.currentValue.w;
	                }
	            } else if (this.paramName1 == $dynamic.paramName) {
	                if (this.param1Type == 1) {
	                    this.vecNum[this.param1Index + this.offset] = $dynamic.currentValue.x;
	                } else if (this.param1Type == 2) {
	                    this.vecNum[this.param1Index + this.offset] = $dynamic.currentValue.x;
	                    this.vecNum[this.param1Index + 1 + this.offset] = $dynamic.currentValue.y;
	                } else if (this.param1Type == 3) {
	                    this.vecNum[this.param1Index + this.offset] = $dynamic.currentValue.x;
	                    this.vecNum[this.param1Index + 1 + this.offset] = $dynamic.currentValue.y;
	                    this.vecNum[this.param1Index + 2 + this.offset] = $dynamic.currentValue.z;
	                } else if (this.param1Type == 4) {
	                    this.vecNum[this.param1Index + this.offset] = $dynamic.currentValue.x;
	                    this.vecNum[this.param1Index + 1 + this.offset] = $dynamic.currentValue.y;
	                    this.vecNum[this.param1Index + 2 + this.offset] = $dynamic.currentValue.z;
	                    this.vecNum[this.param1Index + 3 + this.offset] = $dynamic.currentValue.w;
	                }
	            } else if (this.paramName2 == $dynamic.paramName) {
	                if (this.param2Type == 1) {
	                    this.vecNum[this.param2Index + this.offset] = $dynamic.currentValue.x;
	                } else if (this.param2Type == 2) {
	                    this.vecNum[this.param2Index + this.offset] = $dynamic.currentValue.x;
	                    this.vecNum[this.param2Index + 1 + this.offset] = $dynamic.currentValue.y;
	                } else if (this.param2Type == 3) {
	                    this.vecNum[this.param2Index + this.offset] = $dynamic.currentValue.x;
	                    this.vecNum[this.param2Index + 1 + this.offset] = $dynamic.currentValue.y;
	                    this.vecNum[this.param2Index + 2 + this.offset] = $dynamic.currentValue.z;
	                } else if (this.param2Type == 4) {
	                    this.vecNum[this.param2Index + this.offset] = $dynamic.currentValue.x;
	                    this.vecNum[this.param2Index + 1 + this.offset] = $dynamic.currentValue.y;
	                    this.vecNum[this.param2Index + 2 + this.offset] = $dynamic.currentValue.z;
	                    this.vecNum[this.param2Index + 3 + this.offset] = $dynamic.currentValue.w;
	                }
	            } else if (this.paramName3 == $dynamic.paramName) {
	                if (this.param3Type == 1) {
	                    this.vecNum[this.param3Index + this.offset] = $dynamic.currentValue.x;
	                } else if (this.param3Type == 2) {
	                    this.vecNum[this.param3Index + this.offset] = $dynamic.currentValue.x;
	                    this.vecNum[this.param3Index + 1 + this.offset] = $dynamic.currentValue.y;
	                } else if (this.param3Type == 3) {
	                    this.vecNum[this.param3Index + this.offset] = $dynamic.currentValue.x;
	                    this.vecNum[this.param3Index + 1 + this.offset] = $dynamic.currentValue.y;
	                    this.vecNum[this.param3Index + 2 + this.offset] = $dynamic.currentValue.z;
	                } else if (this.param3Type == 4) {
	                    this.vecNum[this.param3Index + this.offset] = $dynamic.currentValue.x;
	                    this.vecNum[this.param3Index + 1 + this.offset] = $dynamic.currentValue.y;
	                    this.vecNum[this.param3Index + 2 + this.offset] = $dynamic.currentValue.z;
	                    this.vecNum[this.param3Index + 3 + this.offset] = $dynamic.currentValue.w;
	                }
	    
	            }
	             */
	        };
	        return ConstItem;
	    }());
	    Pan3d.ConstItem = ConstItem;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ConstItem.js.map

/***/ }),
/* 52 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var CubemapLoad = /** @class */ (function () {
	        function CubemapLoad() {
	            this.ary = new Array(6);
	            this.flagNum = 0;
	        }
	        CubemapLoad.prototype.loadCube = function ($url, $fun, scene3d) {
	            var _this = this;
	            this.fun = $fun;
	            for (var i = 0; i < 6; i++) {
	                var itemUrl = $url + "0" + (i + 1) + ".jpg";
	                console.log(itemUrl);
	                Pan3d.LoadManager.getInstance().load(itemUrl, Pan3d.LoadManager.IMG_TYPE, function ($img, $info) { _this.loadCom($img, $info, scene3d); }, { "id": i });
	            }
	        };
	        CubemapLoad.makeTempCubeTextture = function ($img, gl) {
	            var wh = $img.width / 4;
	            var canvas = document.createElement("canvas");
	            var ctx = canvas.getContext("2d");
	            canvas.width = wh;
	            canvas.height = wh;
	            var renderContext = gl;
	            var texture = renderContext.createTexture();
	            renderContext.bindTexture(renderContext.TEXTURE_CUBE_MAP, texture);
	            ctx.drawImage($img, wh * 2, wh, wh, wh, 0, 0, wh, wh); //right
	            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_X, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
	            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
	            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
	            ctx.drawImage($img, 0, wh, wh, wh, 0, 0, wh, wh); //left
	            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_X, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
	            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
	            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
	            ctx.drawImage($img, wh, 0, wh, wh, 0, 0, wh, wh); //top
	            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_Y, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
	            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
	            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
	            ctx.drawImage($img, wh, wh * 2, wh, wh, 0, 0, wh, wh); //bottom
	            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_Y, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
	            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
	            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
	            ctx.drawImage($img, wh, wh, wh, wh, 0, 0, wh, wh); //front
	            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_POSITIVE_Z, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
	            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
	            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
	            ctx.drawImage($img, wh * 3, wh, wh, wh, 0, 0, wh, wh); //back
	            renderContext.texImage2D(renderContext.TEXTURE_CUBE_MAP_NEGATIVE_Z, 0, renderContext.RGBA, renderContext.RGBA, renderContext.UNSIGNED_BYTE, canvas);
	            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MAG_FILTER, renderContext.LINEAR);
	            renderContext.texParameteri(renderContext.TEXTURE_CUBE_MAP, renderContext.TEXTURE_MIN_FILTER, renderContext.LINEAR);
	            return texture;
	        };
	        CubemapLoad.prototype.loadCom = function ($img, $info, scene3D) {
	            this.ary[$info.id] = CubemapLoad.makeTempCubeTextture($img, scene3D.context3D.webGlRender);
	            this.flagNum++;
	            if (this.flagNum == 6) {
	                this.fun(this.ary);
	            }
	        };
	        return CubemapLoad;
	    }());
	    Pan3d.CubemapLoad = CubemapLoad;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=CubemapLoad.js.map

/***/ }),
/* 53 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var DynamicBaseConstItem = /** @class */ (function () {
	        function DynamicBaseConstItem(value) {
	            this.scene3D = value;
	        }
	        DynamicBaseConstItem.prototype.update = function (t) {
	            if (t === void 0) { t = 0; }
	            if (this.target) {
	                this.target.setDynamic(this);
	            }
	        };
	        Object.defineProperty(DynamicBaseConstItem.prototype, "type", {
	            get: function () {
	                return this._type;
	            },
	            set: function (value) {
	                this._type = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        DynamicBaseConstItem.prototype.setTargetInfo = function ($target, $paramName, $type) {
	            this.target = $target;
	            this.paramName = $paramName;
	            this.type = $type;
	            if (this.target) {
	                this.target.setDynamicOffset(this);
	            }
	            this.currentValue = new Array($type);
	        };
	        DynamicBaseConstItem.prototype.setCurrentVal = function () {
	            var args = [];
	            for (var _i = 0; _i < arguments.length; _i++) {
	                args[_i] = arguments[_i];
	            }
	            for (var i = 0; i < args.length; i++) {
	                this.currentValue[i] = args[i];
	                // if (i == 0) {
	                //     this.currentValue.x = args[i];
	                // } else if (i == 1) {
	                //     this.currentValue.y = args[i];
	                // } else if (i == 2) {
	                //     this.currentValue.z = args[i];
	                // }
	            }
	        };
	        return DynamicBaseConstItem;
	    }());
	    Pan3d.DynamicBaseConstItem = DynamicBaseConstItem;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=DynamicBaseConstItem.js.map

/***/ }),
/* 54 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var DynamicBaseTexItem = /** @class */ (function () {
	        function DynamicBaseTexItem(value) {
	            this.scene3D = value;
	        }
	        Object.defineProperty(DynamicBaseTexItem.prototype, "texture", {
	            get: function () {
	                if (this.textureRes) {
	                    return this.textureRes.texture;
	                }
	                return null;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        return DynamicBaseTexItem;
	    }());
	    Pan3d.DynamicBaseTexItem = DynamicBaseTexItem;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=DynamicBaseTexItem.js.map

/***/ }),
/* 55 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var DynamicTexItem = /** @class */ (function (_super) {
	        __extends(DynamicTexItem, _super);
	        function DynamicTexItem() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        DynamicTexItem.prototype.initCurve = function ($type) {
	            this.curve = new Pan3d.Curve(this.scene3D);
	            this.curve.type = $type;
	        };
	        Object.defineProperty(DynamicTexItem.prototype, "texture", {
	            get: function () {
	                if (this._textureDynamic) {
	                    return this._textureDynamic;
	                }
	                else {
	                    if (this.textureRes) {
	                        return this.textureRes.texture;
	                    }
	                    else {
	                        return null;
	                    }
	                }
	            },
	            enumerable: false,
	            configurable: true
	        });
	        DynamicTexItem.prototype.creatTextureByCurve = function () {
	            var i = 0;
	            var endVecIndex = this.curve.valueVec.length - 1;
	            var imgNumVec = new Array;
	            for (var i = 0; i < this.life; i++) {
	                if (i < this.curve.begintFrame) {
	                    imgNumVec.push(this.curve.valueVec[0][0] * 0xff, this.curve.valueVec[0][1] * 0xff, this.curve.valueVec[0][2] * 0xff, this.curve.valueVec[0][3] * 0xff);
	                }
	                else if (i > this.curve.maxFrame) {
	                    if (this.curve.maxFrame == 0 && this.curve.begintFrame < 0) {
	                        imgNumVec.push(0xff, 0xff, 0xff, 0xff);
	                    }
	                    else {
	                        imgNumVec.push(this.curve.valueVec[endVecIndex][0] * 0xff, this.curve.valueVec[endVecIndex][1] * 0xff, this.curve.valueVec[endVecIndex][2] * 0xff, this.curve.valueVec[endVecIndex][3] * 0xff);
	                    }
	                }
	                else {
	                    if (this.curve.begintFrame < 0) {
	                        imgNumVec.push(0xff, 0xff, 0xff, 0xff);
	                    }
	                    else {
	                        var index = i - this.curve.begintFrame;
	                        imgNumVec.push(this.curve.valueVec[index][0] * 0xff, this.curve.valueVec[index][1] * 0xff, this.curve.valueVec[index][2] * 0xff, this.curve.valueVec[index][3] * 0xff);
	                    }
	                }
	            }
	            var img = Pan3d.ColorTransition.getInstance().getImageDataByVec(imgNumVec, this.life);
	            this._textureDynamic = this.scene3D.context3D.getTexture(img);
	        };
	        return DynamicTexItem;
	    }(Pan3d.DynamicBaseTexItem));
	    Pan3d.DynamicTexItem = DynamicTexItem;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=DynamicTexItem.js.map

/***/ }),
/* 56 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Material = /** @class */ (function (_super) {
	        __extends(Material, _super);
	        function Material() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this.texList = new Array;
	            _this.constList = new Array;
	            _this.killNum = 0;
	            _this.writeZbuffer = true;
	            _this.fogMode = 0;
	            _this.fcNum = 0;
	            return _this;
	        }
	        Material.prototype.update = function (t) {
	            this.updateTime(t);
	            //this.updateCam();
	            this.updateScene();
	        };
	        Material.prototype.updateTime = function (t) {
	            if (this.hasTime) {
	                this.fcData[1] = t;
	            }
	        };
	        Material.prototype.updateCam = function (x, y, z) {
	            if (this.usePbr || this.fogMode == 1) {
	                var idx = this.fcIDAry[0] * 4;
	                this.fcData[0 + idx] = x;
	                this.fcData[1 + idx] = y;
	                this.fcData[2 + idx] = z;
	            }
	        };
	        Material.prototype.updateScene = function () {
	            /*
	            if (this.sceneNumId == Scene_data.sceneNumId) {
	                return;
	            }

	            this.sceneNumId = Scene_data.sceneNumId;

	            if (this.fogMode != 0) {
	                var idx: number = this.fcIDAry[1] * 4;
	                this.fcData[0 + idx] = Scene_data.fogColor[0];
	                this.fcData[1 + idx] = Scene_data.fogColor[1];
	                this.fcData[2 + idx] = Scene_data.fogColor[2];
	            }

	            if (this.scaleLightMap) {
	                var idx: number = this.fcIDAry[2] * 4;
	                this.fcData[0 + idx] = Scene_data.scaleLight[0];
	            }
	            */
	        };
	        Material.prototype.initFcData = function () {
	            this.fcData = new Float32Array(this.fcNum * 4);
	            if (this.fcNum <= 0) {
	                return;
	            }
	            // this.sceneNumId = Scene_data.sceneNumId;
	            if (this.hasTime || this.useKill || this.fogMode != 0) { //fc0
	                if (this.useKill) {
	                    this.fcData[0] = this.killNum;
	                }
	                if (this.fogMode != 0) {
	                    this.fcData[2] = this.scene3D.fogData[0];
	                    this.fcData[3] = this.scene3D.fogData[1];
	                }
	            }
	            if (this.usePbr || this.fogMode == 1) {
	                var idx = this.fcIDAry[0] * 4;
	                this.fcData[0 + idx] = this.scene3D.camera3D.x / 100;
	                this.fcData[1 + idx] = this.scene3D.camera3D.y / 100;
	                this.fcData[2 + idx] = this.scene3D.camera3D.z / 100;
	            }
	            if (this.fogMode != 0) {
	                var idx = this.fcIDAry[1] * 4;
	                this.fcData[0 + idx] = this.scene3D.fogColor[0];
	                this.fcData[1 + idx] = this.scene3D.fogColor[1];
	                this.fcData[2 + idx] = this.scene3D.fogColor[2];
	            }
	            if (this.scaleLightMap) {
	                var idx = this.fcIDAry[2] * 4;
	                this.fcData[0 + idx] = this.scene3D.scaleLight[0];
	            }
	        };
	        Material.prototype.setCompileData = function (_compileData) {
	            if (!_compileData) {
	                return;
	            }
	            this.shaderStr = _compileData.shaderStr;
	            this.hasTime = _compileData.hasTime;
	            this.timeSpeed = _compileData.timeSpeed;
	            this.blendMode = _compileData.blendMode;
	            this.backCull = _compileData.backCull;
	            this.killNum = _compileData.killNum;
	            this.hasVertexColor = _compileData.hasVertexColor;
	            this.usePbr = _compileData.usePbr;
	            this.useNormal = _compileData.useNormal;
	            this.roughness = _compileData.roughness;
	            this.writeZbuffer = _compileData.writeZbuffer;
	            this.hasFresnel = _compileData.hasFresnel;
	            this.useDynamicIBL = _compileData.useDynamicIBL;
	            this.normalScale = _compileData.normalScale;
	            this.lightProbe = _compileData.lightProbe;
	            this.useKill = _compileData.useKill;
	            this.directLight = _compileData.directLight;
	            this.noLight = _compileData.noLight;
	            this.scaleLightMap = _compileData.scaleLightMap;
	            this.fogMode = _compileData.fogMode;
	            this.hasParticleColor = false;
	            this.initFcData();
	            if (_compileData.texList) {
	                var ary = _compileData.texList;
	                this.texList = new Array;
	                for (var i = 0; i < ary.length; i++) {
	                    var texItem = new Pan3d.TexItem;
	                    texItem.id = ary[i].id;
	                    texItem.url = ary[i].url;
	                    texItem.isDynamic = ary[i].isDynamic;
	                    texItem.paramName = ary[i].paramName;
	                    texItem.isMain = ary[i].isMain;
	                    texItem.isParticleColor = ary[i].isParticleColor;
	                    texItem.type = ary[i].type;
	                    texItem.wrap = ary[i].wrap;
	                    texItem.filter = ary[i].filter;
	                    texItem.mipmap = ary[i].mipmap;
	                    this.texList.push(texItem);
	                    if (texItem.isParticleColor) {
	                        this.hasParticleColor = true;
	                    }
	                }
	            }
	            if (_compileData.constList) {
	                ary = _compileData.constList;
	                this.constList = new Array;
	                for (i = 0; i < ary.length; i++) {
	                    var constItem = new Pan3d.ConstItem;
	                    constItem.setData(ary[i]);
	                    constItem.creat(this.fcData);
	                    this.constList.push(constItem);
	                }
	            }
	        };
	        Material.prototype.setByteData = function (byte) {
	            var fs = byte;
	            var vesion = fs.readInt();
	            this.shaderStr = fs.readUTF(); //fs.writeUTF(_compileData.shaderStr)
	            this.hasTime = fs.readBoolean(); //fs.writeBoolean(_compileData.hasTime);
	            this.timeSpeed = fs.readFloat(); //fs.writeFloat(_compileData.timeSpeed);
	            this.blendMode = fs.readFloat(); //fs.writeFloat(_compileData.blendMode);
	            this.backCull = fs.readBoolean(); //fs.writeBoolean(_compileData.backCull);
	            this.killNum = fs.readFloat(); //fs.writeFloat(_compileData.killNum);
	            this.hasVertexColor = fs.readBoolean(); //fs.writeBoolean(_compileData.hasVertexColor);
	            this.usePbr = fs.readBoolean(); //fs.writeBoolean(_compileData.usePbr);
	            this.useNormal = fs.readBoolean(); //fs.writeBoolean(_compileData.useNormal);
	            this.roughness = fs.readFloat(); //fs.writeFloat(_compileData.roughness);
	            this.writeZbuffer = fs.readBoolean(); //fs.writeBoolean(_compileData.writeZbuffer);
	            this.hasFresnel = fs.readBoolean(); //fs.writeBoolean(_compileData.hasFresnel);
	            this.useDynamicIBL = fs.readBoolean(); //fs.writeBoolean(_compileData.useDynamicIBL);
	            this.normalScale = fs.readFloat(); //fs.writeFloat(_compileData.normalScale);
	            this.lightProbe = fs.readBoolean(); //fs.writeBoolean(_compileData.lightProbe);
	            this.useKill = fs.readBoolean(); //fs.writeBoolean(_compileData.useKill);
	            this.directLight = fs.readBoolean(); //fs.writeBoolean(_compileData.directLight);
	            this.noLight = fs.readBoolean(); //fs.writeBoolean(_compileData.noLight);
	            this.scaleLightMap = fs.readBoolean(); //fs.writeBoolean(_compileData.scaleLightMap)
	            if (vesion > 2) {
	                this.fogMode = fs.readInt();
	            }
	            if (vesion >= 22) {
	                this.fcNum = fs.readByte();
	                var leg = fs.readByte();
	                this.fcIDAry = new Array;
	                for (var i = 0; i < leg; i++) {
	                    this.fcIDAry.push(fs.readByte());
	                }
	            }
	            else {
	                // //console.log("ddddd");
	            }
	            this.hasParticleColor = false;
	            this.initFcData();
	            this.readTexList(fs);
	            this.readConstLis(fs);
	        };
	        Material.prototype.readConstLis = function (fs) {
	            var constLisLen = fs.readInt();
	            this.constList = new Array;
	            for (var i = 0; i < constLisLen; i++) {
	                var constItem = new Pan3d.ConstItem;
	                constItem.id = fs.readFloat();
	                constItem.value = new Pan3d.Vector3D(fs.readFloat(), fs.readFloat(), fs.readFloat(), fs.readFloat());
	                constItem.paramName0 = fs.readUTF();
	                constItem.param0Type = fs.readFloat();
	                constItem.param0Index = fs.readFloat();
	                constItem.paramName1 = fs.readUTF();
	                constItem.param1Type = fs.readFloat();
	                constItem.param1Index = fs.readFloat();
	                constItem.paramName2 = fs.readUTF();
	                constItem.param2Type = fs.readFloat();
	                constItem.param2Index = fs.readFloat();
	                constItem.paramName3 = fs.readUTF();
	                constItem.param3Type = fs.readFloat();
	                constItem.param3Index = fs.readFloat();
	                constItem.creat(this.fcData);
	                this.constList.push(constItem);
	            }
	        };
	        Material.prototype.readTexList = function (fs) {
	            var texListLen = fs.readInt();
	            this.texList = new Array;
	            for (var i = 0; i < texListLen; i++) {
	                var texItem = new Pan3d.TexItem;
	                texItem.id = fs.readFloat();
	                texItem.url = fs.readUTF();
	                texItem.isDynamic = fs.readBoolean();
	                texItem.paramName = fs.readUTF();
	                texItem.isMain = fs.readBoolean();
	                texItem.isParticleColor = fs.readBoolean();
	                texItem.type = fs.readFloat();
	                texItem.wrap = fs.readFloat();
	                texItem.filter = fs.readFloat();
	                texItem.mipmap = fs.readFloat();
	                if (texItem.isParticleColor) {
	                    this.hasParticleColor = true;
	                }
	                this.texList.push(texItem);
	            }
	        };
	        return Material;
	    }(Pan3d.ResCount));
	    Pan3d.Material = Material;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Material.js.map

/***/ }),
/* 57 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var MaterialBaseParam = /** @class */ (function (_super) {
	        __extends(MaterialBaseParam, _super);
	        function MaterialBaseParam() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        MaterialBaseParam.prototype.destory = function () {
	            for (var i = 0; i < this.dynamicTexList.length; i++) {
	                // this.dynamicTexList[i].destory();
	            }
	            this.dynamicTexList = null;
	            this.dynamicConstList = null;
	        };
	        MaterialBaseParam.prototype.update = function () {
	            if (this.material && this.dynamicConstList) {
	                for (var i = 0; i < this.dynamicConstList.length; i++) {
	                    this.dynamicConstList[i].update();
	                }
	            }
	        };
	        MaterialBaseParam.prototype.setData = function ($material, $ary) {
	            this.material = $material;
	            this.dynamicConstList = new Array;
	            this.dynamicTexList = new Array;
	            var constList = $material.constList;
	            var texList = $material.texList;
	            for (var i = 0; i < $ary.length; i++) {
	                var obj = $ary[i];
	                if (obj.type == 0) {
	                    var texItem = new Pan3d.DynamicBaseTexItem(this.scene3D);
	                    texItem.paramName = obj.name;
	                    for (var j = 0; j < texList.length; j++) {
	                        if (texItem.paramName == texList[j].paramName) {
	                            texItem.target = texList[j];
	                            break;
	                        }
	                    }
	                    var mipmap = 0;
	                    if (texItem.target) {
	                        mipmap = texItem.target.mipmap;
	                    }
	                    mipmap = 0;
	                    this.scene3D.textureManager.getTexture(this.scene3D.fileRoot + obj.url, function ($textres) {
	                        texItem.textureRes = $textres;
	                    }, 0, null, 0, mipmap);
	                    this.dynamicTexList.push(texItem);
	                }
	                else {
	                    var targetName = obj.name;
	                    var target = null;
	                    for (var j = 0; j < constList.length; j++) {
	                        if (targetName == constList[j].paramName0
	                            || targetName == constList[j].paramName1
	                            || targetName == constList[j].paramName2
	                            || targetName == constList[j].paramName3) {
	                            target = constList[j];
	                            break;
	                        }
	                    }
	                    var constItem = new Pan3d.DynamicBaseConstItem(this.scene3D);
	                    constItem.setTargetInfo(target, targetName, obj.type);
	                    if (obj.type == 1) {
	                        constItem.setCurrentVal(obj.x);
	                    }
	                    else if (obj.type == 2) {
	                        constItem.setCurrentVal(obj.x, obj.y);
	                    }
	                    else {
	                        constItem.setCurrentVal(obj.x, obj.y, obj.z);
	                    }
	                    this.dynamicConstList.push(constItem);
	                }
	            }
	        };
	        return MaterialBaseParam;
	    }(Pan3d.ResCount));
	    Pan3d.MaterialBaseParam = MaterialBaseParam;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=MaterialBaseParam.js.map

/***/ }),
/* 58 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var MaterialManager = /** @class */ (function (_super) {
	        __extends(MaterialManager, _super);
	        function MaterialManager(value) {
	            var _this = 
	            //this.dic = new Object();
	            _super.call(this, value) || this;
	            _this._loadDic = new Object();
	            _this._resDic = new Object();
	            _this._regDic = new Object();
	            return _this;
	        }
	        MaterialManager.prototype.getMaterialByte = function ($url, $fun, $info, $autoReg, $regName, $shader3DCls) {
	            var _this = this;
	            if ($info === void 0) { $info = null; }
	            if ($autoReg === void 0) { $autoReg = false; }
	            if ($regName === void 0) { $regName = null; }
	            if ($shader3DCls === void 0) { $shader3DCls = null; }
	            if (this.dic[$url]) {
	                if ($info) {
	                    $fun(this.dic[$url], $info);
	                }
	                else {
	                    $fun(this.dic[$url]);
	                }
	                this.dic[$url].useNum++;
	                return;
	            }
	            var materialLoad = new MaterialLoad($fun, $info, $url, $autoReg, $regName, $shader3DCls);
	            if (this._loadDic[$url]) {
	                var ary = this._loadDic[$url];
	                ary.push(materialLoad);
	                return;
	            }
	            this._loadDic[$url] = new Array;
	            this._loadDic[$url].push(materialLoad);
	            if (this._resDic[$url]) {
	                this.meshByteMaterialByt(this._resDic[$url], materialLoad);
	                if (this._regDic[$url]) {
	                    this.dic[$url].useNum += this._regDic[$url];
	                    delete this._regDic[$url];
	                }
	                delete this._resDic[$url];
	            }
	            else {
	                Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.BYTE_TYPE, function ($data, _info) {
	                    _this.loadMaterialByteCom($data, _info);
	                }, materialLoad);
	            }
	        };
	        MaterialManager.prototype.meshByteMaterialByt = function (byte, _info) {
	            var material = new Pan3d.Material(this.scene3D);
	            material.setByteData(byte);
	            material.url = _info.url;
	            this.loadMaterial(material);
	            if (_info.autoReg) {
	                material.shader = this.scene3D.progrmaManager.getMaterialProgram(_info.regName, _info.shader3D, material, null, true);
	            }
	            var ary = this._loadDic[_info.url];
	            for (var i = 0; i < ary.length; i++) {
	                if (ary[i].info) {
	                    ary[i].fun(material, ary[i].info);
	                }
	                else {
	                    ary[i].fun(material);
	                }
	            }
	            delete this._loadDic[_info.url];
	            this.dic[_info.url] = material;
	        };
	        MaterialManager.prototype.loadMaterialByteCom = function ($data, _info) {
	            var byte = new Pan3d.Pan3dByteArray($data);
	            this.meshByteMaterialByt(byte, _info);
	        };
	        MaterialManager.prototype.addResByte = function ($url, $data) {
	            if (!this.dic[$url] && !this._resDic[$url]) {
	                this._resDic[$url] = $data;
	            }
	        };
	        MaterialManager.prototype.registerUrl = function ($url) {
	            $url = $url.replace("_byte.txt", ".txt");
	            $url = $url.replace(".txt", "_byte.txt");
	            if (this.dic[$url]) {
	                this.dic[$url].useNum++;
	            }
	            else {
	                if (this._regDic[$url]) {
	                    this._regDic[$url]++;
	                }
	                else {
	                    this._regDic[$url] == 1;
	                }
	            }
	        };
	        MaterialManager.prototype.releaseUrl = function ($url) {
	            $url = $url.replace("_byte.txt", ".txt");
	            $url = $url.replace(".txt", "_byte.txt");
	            if (this.dic[$url]) {
	                this.dic[$url].clearUseNum();
	            }
	        };
	        /**
	        public loadMaterialCom($data: string, _info: MaterialLoad): void {
	            var obj = JSON.parse($data);
	            
	            var material: Material = new Material();
	            material.setCompileData(obj);
	            material.url = _info.url;
	    
	            this.loadMaterial(material);
	    
	            if (_info.autoReg){
	                material.program = ProgrmaManager.getInstance().getMaterialProgram(_info.regName, _info.shader3D, material, null, true);
	            }
	    
	            var ary: Array<TextureLoad> = this._loadDic[_info.url];
	            for (var i: number = 0; i < ary.length; i++) {
	                if (ary[i].info) {
	                    ary[i].fun(material, ary[i].info);
	                } else {
	                    ary[i].fun(material);
	                }
	            }
	            
	            delete this._loadDic[_info.url];
	    
	            this.dic[_info.url] = material;
	    
	        }
	        */
	        MaterialManager.prototype.loadMaterial = function ($material) {
	            var texVec = $material.texList;
	            for (var i = 0; i < texVec.length; i++) {
	                if (texVec[i].isParticleColor || texVec[i].isDynamic || texVec[i].type != 0) {
	                    continue;
	                }
	                this.scene3D.textureManager.getTexture(this.scene3D.fileRoot + texVec[i].url, function ($textureVo, $texItem) {
	                    $texItem.textureRes = $textureVo;
	                }, texVec[i].wrap, texVec[i], texVec[i].filter, texVec[i].mipmap);
	            }
	        };
	        MaterialManager.prototype.loadDynamicTexUtil = function (material) {
	            var dynamicTexList = material.dynamicTexList;
	            for (var i = 0; i < dynamicTexList.length; i++) {
	                if (dynamicTexList[i].isParticleColor) {
	                    dynamicTexList[i].creatTextureByCurve();
	                }
	                else {
	                    this.scene3D.textureManager.getTexture(this.scene3D.fileRoot + dynamicTexList[i].url, function ($textureVo, $texItem) {
	                        $texItem.textureRes = $textureVo;
	                    }, 0, dynamicTexList[i], 0, 1);
	                }
	            }
	        };
	        return MaterialManager;
	    }(Pan3d.ResGC));
	    Pan3d.MaterialManager = MaterialManager;
	    var MaterialLoad = /** @class */ (function () {
	        function MaterialLoad($fun, $info, $url, $autoReg, $regName, $shader3D) {
	            this.fun = $fun;
	            this.info = $info;
	            this.url = $url;
	            this.autoReg = $autoReg;
	            this.regName = $regName;
	            this.shader3D = $shader3D;
	        }
	        return MaterialLoad;
	    }());
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=MaterialManager.js.map

/***/ }),
/* 59 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var MaterialParam = /** @class */ (function (_super) {
	        __extends(MaterialParam, _super);
	        function MaterialParam() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        MaterialParam.prototype.setMaterial = function ($materialTree) {
	            this.material = $materialTree;
	            this.materialUrl = $materialTree.url;
	            this.dynamicTexList = new Array;
	            this.dynamicConstList = new Array;
	            this.setTexList();
	            this.setConstList();
	        };
	        MaterialParam.prototype.setLife = function ($life) {
	            for (var i = 0; i < this.dynamicTexList.length; i++) {
	                if (this.dynamicTexList[i].isParticleColor) {
	                    this.dynamicTexList[i].life = $life;
	                }
	            }
	        };
	        MaterialParam.prototype.setTexList = function () {
	            var texList = this.material.texList;
	            for (var i = 0; i < texList.length; i++) {
	                var dyTex;
	                if (texList[i].isParticleColor) {
	                    dyTex = new Pan3d.DynamicTexItem(this.scene3D);
	                    dyTex.target = texList[i];
	                    dyTex.paramName = texList[i].paramName;
	                    dyTex.initCurve(4);
	                    this.dynamicTexList.push(dyTex);
	                    dyTex.isParticleColor = true;
	                }
	                else if (texList[i].isDynamic) {
	                    dyTex = new Pan3d.DynamicTexItem(this.scene3D);
	                    dyTex.target = texList[i];
	                    dyTex.paramName = texList[i].paramName;
	                    this.dynamicTexList.push(dyTex);
	                }
	            }
	        };
	        MaterialParam.prototype.setConstList = function () {
	            var constList = this.material.constList;
	            for (var i = 0; i < constList.length; i++) {
	                var constItem = constList[i];
	                var dyCon;
	                if (constItem.param0Type != 0) {
	                    dyCon = new Pan3d.DynamicConstItem(this.scene3D);
	                    dyCon.setTargetInfo(constItem, constItem.paramName0, constItem.param0Type);
	                    this.dynamicConstList.push(dyCon);
	                }
	                if (constItem.param1Type != 0) {
	                    dyCon = new Pan3d.DynamicConstItem(this.scene3D);
	                    dyCon.setTargetInfo(constItem, constItem.paramName1, constItem.param1Type);
	                    this.dynamicConstList.push(dyCon);
	                }
	                if (constItem.param2Type != 0) {
	                    dyCon = new Pan3d.DynamicConstItem(this.scene3D);
	                    dyCon.setTargetInfo(constItem, constItem.paramName2, constItem.param2Type);
	                    this.dynamicConstList.push(dyCon);
	                }
	                if (constItem.param3Type != 0) {
	                    dyCon = new Pan3d.DynamicConstItem(this.scene3D);
	                    dyCon.setTargetInfo(constItem, constItem.paramName3, constItem.param3Type);
	                    this.dynamicConstList.push(dyCon);
	                }
	            }
	        };
	        MaterialParam.prototype.setTextObj = function (ary) {
	            for (var i = 0; i < ary.length; i++) {
	                var obj = ary[i];
	                for (var j = 0; j < this.dynamicTexList.length; j++) {
	                    var dynamicTexItem = this.dynamicTexList[j];
	                    if (dynamicTexItem.paramName == obj.paramName) {
	                        if (dynamicTexItem.isParticleColor) {
	                            dynamicTexItem.curve.setData(obj.curve);
	                        }
	                        else {
	                            dynamicTexItem.url = obj.url;
	                        }
	                        break;
	                    }
	                }
	            }
	        };
	        MaterialParam.prototype.setConstObj = function (ary) {
	            for (var i = 0; i < ary.length; i++) {
	                var obj = ary[i];
	                for (var j = 0; j < this.dynamicConstList.length; j++) {
	                    if (this.dynamicConstList[j].paramName == obj.paramName) {
	                        this.dynamicConstList[j].curve.setData(obj.curve);
	                        break;
	                    }
	                }
	            }
	        };
	        return MaterialParam;
	    }(Pan3d.ResCount));
	    Pan3d.MaterialParam = MaterialParam;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=MaterialParam.js.map

/***/ }),
/* 60 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var TexItem = /** @class */ (function () {
	        function TexItem() {
	        }
	        Object.defineProperty(TexItem.prototype, "id", {
	            get: function () {
	                return this._id;
	            },
	            set: function (value) {
	                this._id = value;
	                this.name = "fs" + value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(TexItem.prototype, "texture", {
	            get: function () {
	                if (this.textureRes) {
	                    return this.textureRes.texture;
	                }
	                else {
	                    return null;
	                }
	            },
	            enumerable: false,
	            configurable: true
	        });
	        TexItem.LIGHTMAP = 1;
	        TexItem.LTUMAP = 2;
	        TexItem.CUBEMAP = 3;
	        TexItem.HEIGHTMAP = 4;
	        TexItem.REFRACTIONMAP = 5;
	        return TexItem;
	    }());
	    Pan3d.TexItem = TexItem;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=TexItem.js.map

/***/ }),
/* 61 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var DynamicConstItem = /** @class */ (function (_super) {
	        __extends(DynamicConstItem, _super);
	        function DynamicConstItem() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        DynamicConstItem.prototype.update = function (t) {
	            if (t === void 0) { t = 0; }
	            this.currentValue = this.curve.getValue(t);
	            this.target.setDynamic(this);
	            //this.target.setDynamicDirect(this.curve.getValue(t),this.targetOffset);
	        };
	        Object.defineProperty(DynamicConstItem.prototype, "type", {
	            set: function (value) {
	                this._type = value;
	                this.curve = new Pan3d.Curve(this.scene3D);
	                this.curve.type = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        return DynamicConstItem;
	    }(Pan3d.DynamicBaseConstItem));
	    Pan3d.DynamicConstItem = DynamicConstItem;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=DynamicConstItem.js.map

/***/ }),
/* 62 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var Curve = /** @class */ (function () {
	        function Curve(value) {
	            this.valueV3d = [1, 1, 1, 1];
	            this.scene3D = value;
	        }
	        Curve.prototype.getValue = function ($t) {
	            if (!this.valueVec || this.begintFrame == -1) {
	                return this.valueV3d;
	            }
	            var flag = float2int($t / Pan3d.Scene3D.frameTime - this.begintFrame);
	            if (flag < 0) {
	                flag = 0;
	            }
	            else if (flag > this.maxFrame - this.begintFrame) {
	                flag = this.maxFrame - this.begintFrame;
	            }
	            return this.valueVec[flag];
	            /**
	    
	            if (this.type == 1) {
	                this.valueV3d.x = this.valueVec[0][flag];
	            } else if (this.type == 2) {
	                this.valueV3d.x = this.valueVec[0][flag];
	                this.valueV3d.y = this.valueVec[1][flag];
	            } else if (this.type == 3) {
	                this.valueV3d.x = this.valueVec[0][flag];
	                this.valueV3d.y = this.valueVec[1][flag];
	                this.valueV3d.z = this.valueVec[2][flag];
	            } else if (this.type == 4) {
	                this.valueV3d.x = this.valueVec[0][flag];
	                this.valueV3d.y = this.valueVec[1][flag];
	                this.valueV3d.z = this.valueVec[2][flag];
	                this.valueV3d.w = this.valueVec[3][flag];
	    
	                this.valueV3d.scaleBy(this.valueV3d.w);
	    
	            }
	            return this.valueV3d;
	    
	             */
	        };
	        Curve.prototype.setData = function (obj) {
	            this.type = obj.type;
	            this.maxFrame = obj.maxFrame;
	            if (obj.items.length) {
	                this.begintFrame = obj.items[0].frame;
	            }
	            else {
	                this.begintFrame = -1;
	            }
	            var len = obj.values[0].length;
	            var ary = new Array;
	            for (var i = 0; i < len; i++) {
	                var itemAry = new Array;
	                if (this.type == 1) {
	                    itemAry.push(obj.values[0][i]);
	                }
	                else if (this.type == 2) {
	                    itemAry.push(obj.values[0][i], obj.values[1][i]);
	                }
	                else if (this.type == 3) {
	                    itemAry.push(obj.values[0][i], obj.values[1][i], obj.values[2][i]);
	                }
	                else if (this.type == 4) {
	                    var w = obj.values[3][i];
	                    itemAry.push(obj.values[0][i] * w, obj.values[1][i] * w, obj.values[2][i] * w, w);
	                }
	                ary.push(itemAry);
	            }
	            this.valueVec = ary;
	        };
	        return Curve;
	    }());
	    Pan3d.Curve = Curve;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Curve.js.map

/***/ }),
/* 63 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var BaseObjData = /** @class */ (function () {
	        function BaseObjData(value) {
	            this.vertices = new Array;
	            this.uvs = new Array;
	            this.indexs = new Array;
	            this.treNum = 0;
	            this.renderContext = value;
	        }
	        BaseObjData.prototype.upToGpu = function () {
	            if (this.indexs.length) {
	                this.treNum = this.indexs.length;
	                this.vertexBuffer = this.uploadBuff3D(this.vertices);
	                this.uvBuffer = this.uploadBuff3D(this.uvs);
	                this.indexBuffer = this.uploadIndexBuff3D(this.indexs);
	            }
	        };
	        BaseObjData.prototype.uploadIndexBuff3D = function ($iStrData) {
	            var gl = this.renderContext;
	            var elementArrayBuffer = gl.getParameter(gl.ELEMENT_ARRAY_BUFFER_BINDING);
	            var $iBuffer = gl.createBuffer();
	            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
	            gl.bufferData(gl.ELEMENT_ARRAY_BUFFER, new Uint16Array($iStrData), gl.STATIC_DRAW);
	            if (elementArrayBuffer) {
	                gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, elementArrayBuffer);
	            }
	            return $iBuffer;
	        };
	        BaseObjData.prototype.uploadBuff3D = function ($jsData) {
	            var gl = this.renderContext;
	            var arrayBuffer = gl.getParameter(gl.ARRAY_BUFFER_BINDING);
	            var $buffData = gl.createBuffer();
	            gl.bindBuffer(gl.ARRAY_BUFFER, $buffData);
	            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array($jsData), gl.STATIC_DRAW);
	            if (arrayBuffer) {
	                gl.bindBuffer(gl.ARRAY_BUFFER, arrayBuffer);
	            }
	            return $buffData;
	        };
	        return BaseObjData;
	    }());
	    Pan3d.BaseObjData = BaseObjData;
	    var DisplayBaseShader3d = /** @class */ (function () {
	        function DisplayBaseShader3d() {
	        }
	        DisplayBaseShader3d.prototype.binLocation = function (gl) {
	            gl.bindAttribLocation(this.program, 0, "v3Position");
	            gl.bindAttribLocation(this.program, 1, "u2Texture");
	        };
	        DisplayBaseShader3d.prototype.getVertexShaderString = function () {
	            var $str = "attribute vec3 v3Position;" +
	                "attribute vec2 u2Texture;" +
	                "varying vec2 v_texCoord;" +
	                "void main(void)" +
	                "{" +
	                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
	                "   vec4 vt0= vec4(v3Position, 1.0);" +
	                "   gl_Position = vt0;" +
	                "}";
	            return $str;
	        };
	        DisplayBaseShader3d.prototype.getFragmentShaderString = function () {
	            var $str = "precision mediump float;\n" +
	                "varying vec2 v_texCoord;\n" +
	                "void main(void)\n" +
	                "{\n" +
	                "gl_FragColor =vec4(1.0,0.0,1.0,1.0);\n" +
	                "}";
	            return $str;
	        };
	        return DisplayBaseShader3d;
	    }());
	    Pan3d.DisplayBaseShader3d = DisplayBaseShader3d;
	    var DisplayBaseSprite = /** @class */ (function () {
	        function DisplayBaseSprite(value) {
	            this.renderContext = value;
	            this.initData();
	        }
	        DisplayBaseSprite.prototype.initData = function () {
	            var baseDiplay3dShader = new DisplayBaseShader3d();
	            var gl = this.renderContext;
	            baseDiplay3dShader.program = gl.createProgram();
	            baseDiplay3dShader.vShader = gl.createShader(gl.VERTEX_SHADER);
	            baseDiplay3dShader.fShader = gl.createShader(gl.FRAGMENT_SHADER);
	            gl.shaderSource(baseDiplay3dShader.vShader, baseDiplay3dShader.getVertexShaderString());
	            gl.shaderSource(baseDiplay3dShader.fShader, baseDiplay3dShader.getFragmentShaderString());
	            gl.compileShader(baseDiplay3dShader.vShader);
	            gl.compileShader(baseDiplay3dShader.fShader);
	            gl.attachShader(baseDiplay3dShader.program, baseDiplay3dShader.vShader);
	            gl.attachShader(baseDiplay3dShader.program, baseDiplay3dShader.fShader);
	            // baseDiplay3dShader.binLocation($context);
	            gl.linkProgram(baseDiplay3dShader.program);
	            this.program = baseDiplay3dShader.program;
	            var info = gl.getProgramInfoLog(baseDiplay3dShader.program);
	            var vInfo = gl.getShaderInfoLog(baseDiplay3dShader.vShader);
	            var fInfo = gl.getShaderInfoLog(baseDiplay3dShader.fShader);
	            this.objData = new BaseObjData(this.renderContext);
	            this.objData.vertices = new Array();
	            this.objData.vertices.push(0, 0, 0.5);
	            this.objData.vertices.push(1, 0, 0.5);
	            this.objData.vertices.push(1, 1, 0.5);
	            this.objData.uvs = new Array();
	            this.objData.uvs.push(0, 0);
	            this.objData.uvs.push(1, 0);
	            this.objData.uvs.push(0, 1);
	            this.objData.indexs = new Array();
	            this.objData.indexs.push(0, 1, 2);
	            this.objData.upToGpu();
	        };
	        DisplayBaseSprite.prototype.upFrame = function () {
	            if (this.objData && this.objData.indexBuffer) {
	                this.setProgram(this.program);
	                this.setVa(0, 3, this.objData.vertexBuffer);
	                this.setVa(1, 2, this.objData.uvBuffer);
	                this.drawCall(this.objData.indexBuffer, this.objData.treNum);
	                console.log("upFrame");
	            }
	        };
	        DisplayBaseSprite.prototype.drawCall = function ($iBuffer, $numTri) {
	            var gl = this.renderContext;
	            gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, $iBuffer);
	            gl.drawElements(gl.TRIANGLES, $numTri, gl.UNSIGNED_SHORT, 0);
	        };
	        DisplayBaseSprite.prototype.setVa = function (dataId, dataWidth, dataBuffer) {
	            var gl = this.renderContext;
	            gl.bindBuffer(gl.ARRAY_BUFFER, dataBuffer);
	            gl.enableVertexAttribArray(dataId);
	            gl.vertexAttribPointer(dataId, dataWidth, gl.FLOAT, false, 0, 0);
	        };
	        DisplayBaseSprite.prototype.setProgram = function ($program) {
	            var gl = this.renderContext;
	            gl.useProgram($program);
	        };
	        return DisplayBaseSprite;
	    }());
	    Pan3d.DisplayBaseSprite = DisplayBaseSprite;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=DisplayBaseSprite.js.map

/***/ }),
/* 64 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var DisplayRect3dShader = /** @class */ (function (_super) {
	        __extends(DisplayRect3dShader, _super);
	        function DisplayRect3dShader(value) {
	            return _super.call(this, value) || this;
	        }
	        DisplayRect3dShader.prototype.binLocation = function (gl) {
	            gl.bindAttribLocation(this.program, 0, "v3Position");
	            gl.bindAttribLocation(this.program, 1, "u2Texture");
	        };
	        DisplayRect3dShader.prototype.getVertexShaderString = function () {
	            var $str = "attribute vec3 v3Position;" +
	                "attribute vec2 u2Texture;" +
	                "varying vec2 v_texCoord;" +
	                "uniform mat4 vpMatrix3D;\n" +
	                "uniform mat4 posMatrix;\n" +
	                "void main(void)" +
	                "{" +
	                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
	                "   vec4 vt0= vec4(v3Position, 1.0);" +
	                "   gl_Position =vpMatrix3D*posMatrix* vt0;" +
	                "}";
	            return $str;
	        };
	        DisplayRect3dShader.prototype.getFragmentShaderString = function () {
	            var $str = "precision mediump float;\n" +
	                "varying vec2 v_texCoord;\n" +
	                "void main(void)\n" +
	                "{\n" +
	                "gl_FragColor =vec4(1.0,0.0,0.0,1.0);\n" +
	                "}";
	            return $str;
	        };
	        DisplayRect3dShader.DisplayRect3dShader = "DisplayRect3dShader";
	        return DisplayRect3dShader;
	    }(Pan3d.Shader3D));
	    Pan3d.DisplayRect3dShader = DisplayRect3dShader;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=DisplayRect3dShader.js.map

/***/ }),
/* 65 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var DisplayRect3dSprite = /** @class */ (function (_super) {
	        __extends(DisplayRect3dSprite, _super);
	        function DisplayRect3dSprite(value) {
	            var _this = _super.call(this, value) || this;
	            _this.initData();
	            _this.scene3D.progrmaManager.registe(Pan3d.DisplayRect3dShader.DisplayRect3dShader, new Pan3d.DisplayRect3dShader(_this.scene3D));
	            _this.shader3D = _this.scene3D.progrmaManager.getProgram(Pan3d.DisplayRect3dShader.DisplayRect3dShader);
	            return _this;
	        }
	        DisplayRect3dSprite.prototype.initData = function () {
	            this.objData = new Pan3d.ObjData(this.scene3D);
	            this.objData.vertices = new Array();
	            this.objData.vertices.push(0, 0, 0.5);
	            this.objData.vertices.push(100, 0, 0.5);
	            this.objData.vertices.push(100, 100, 100);
	            this.objData.uvs = new Array();
	            this.objData.uvs.push(0, 0);
	            this.objData.uvs.push(1, 0);
	            this.objData.uvs.push(0, 1);
	            this.objData.indexs = new Array();
	            this.objData.indexs.push(0, 1, 2);
	            this.objData.upToGpu();
	            this.posMatrix.identity();
	            this.posMatrix.appendScale(0.2, 0.2, 1);
	        };
	        DisplayRect3dSprite.prototype.upFrame = function () {
	            if (this.objData && this.objData.indexBuffer) {
	                var context3D = this.scene3D.context3D;
	                context3D.setProgram(this.shader3D.program);
	                context3D.setVa(0, 3, this.objData.vertexBuffer);
	                context3D.setVa(1, 2, this.objData.uvBuffer);
	                context3D.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
	                context3D.setVcMatrix4fv(this.shader3D, "posMatrix", this.posMatrix.m);
	                context3D.drawCall(this.objData.indexBuffer, this.objData.treNum);
	            }
	        };
	        return DisplayRect3dSprite;
	    }(Pan3d.Display3D));
	    Pan3d.DisplayRect3dSprite = DisplayRect3dSprite;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=DisplayRect3dSprite.js.map

/***/ }),
/* 66 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var LineDisplayShader = /** @class */ (function (_super) {
	        __extends(LineDisplayShader, _super);
	        function LineDisplayShader(value) {
	            return _super.call(this, value) || this;
	        }
	        LineDisplayShader.prototype.binLocation = function (gl) {
	            gl.bindAttribLocation(this.program, 0, "v3Position");
	            gl.bindAttribLocation(this.program, 1, "v3Colors");
	        };
	        LineDisplayShader.prototype.getVertexShaderString = function () {
	            var $str = "attribute vec3 v3Position;\n" +
	                "attribute vec3 v3Colors;\n" +
	                "varying vec3 v_colors;\n" +
	                "uniform mat4 vpMatrix3D;\n" +
	                "uniform mat4 posMatrix;\n" +
	                "void main(void)" +
	                "{" +
	                "   v_colors = v3Colors;" +
	                "   vec4 vt0= vec4(v3Position, 1.0);" +
	                "   gl_Position =vpMatrix3D*posMatrix* vt0;" +
	                "}";
	            return $str;
	        };
	        LineDisplayShader.prototype.getFragmentShaderString = function () {
	            var $str = "precision mediump float;\n" +
	                "varying vec3 v_colors;\n" +
	                "void main(void)\n" +
	                "{\n" +
	                "gl_FragColor =vec4(v_colors,1.0);\n" +
	                "}";
	            return $str;
	        };
	        LineDisplayShader.LineDisplayShader = "LineDisplayShader";
	        return LineDisplayShader;
	    }(Pan3d.Shader3D));
	    Pan3d.LineDisplayShader = LineDisplayShader;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=LineDisplayShader.js.map

/***/ }),
/* 67 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var LineDisplaySprite = /** @class */ (function (_super) {
	        __extends(LineDisplaySprite, _super);
	        function LineDisplaySprite(value) {
	            var _this = _super.call(this, value) || this;
	            _this.baseColor = new Pan3d.Vector3D(1, 0, 0);
	            _this.scene3D.progrmaManager.registe(Pan3d.LineDisplayShader.LineDisplayShader, new Pan3d.LineDisplayShader(_this.scene3D));
	            _this.shader3D = _this.scene3D.progrmaManager.getProgram(Pan3d.LineDisplayShader.LineDisplayShader);
	            _this.initData();
	            return _this;
	        }
	        LineDisplaySprite.prototype.initData = function () {
	            this.makeLineMode(new Pan3d.Vector3D(0, 0, 0), new Pan3d.Vector3D(100, 0, 0), new Pan3d.Vector3D(1, 0, 0));
	            this.upToGpu();
	        };
	        LineDisplaySprite.prototype.upToGpu = function () {
	            this.objData.upToGpu();
	        };
	        LineDisplaySprite.prototype.makeLineMode = function (a, b, $color) {
	            if ($color === void 0) { $color = null; }
	            if (!this.lineVecPos || !this.lineIndex) {
	                this.clear();
	            }
	            if ($color) {
	                this.baseColor = $color;
	            }
	            this.lineVecPos.push(a.x, a.y, a.z);
	            this.lineVecPos.push(b.x, b.y, b.z);
	            this.lineColor.push(this.baseColor.x, this.baseColor.y, this.baseColor.z);
	            this.lineColor.push(this.baseColor.x, this.baseColor.y, this.baseColor.z);
	            this.lineIndex.push(this.lineIndex.length + 0, this.lineIndex.length + 1);
	            if (this.objData == null) {
	                this.objData = new Pan3d.ObjData(this.scene3D);
	            }
	            this.objData.treNum = this.lineIndex.length;
	            this.objData.vertices = this.lineVecPos;
	            this.objData.normals = this.lineColor;
	            this.objData.indexs = this.lineIndex;
	        };
	        LineDisplaySprite.prototype.clear = function () {
	            this.lineVecPos = new Array;
	            this.lineIndex = new Array;
	            this.lineColor = new Array;
	        };
	        LineDisplaySprite.prototype.upFrame = function () {
	            if (this.objData && this.objData.indexBuffer) {
	                var context3D = this.scene3D.context3D;
	                context3D.setProgram(this.shader3D.program);
	                context3D.setVa(0, 3, this.objData.vertexBuffer);
	                context3D.setVa(1, 3, this.objData.normalsBuffer);
	                context3D.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
	                context3D.setVcMatrix4fv(this.shader3D, "posMatrix", this.posMatrix.m);
	                context3D.drawLine(this.objData.indexBuffer, this.objData.treNum);
	            }
	        };
	        return LineDisplaySprite;
	    }(Pan3d.Display3D));
	    Pan3d.LineDisplaySprite = LineDisplaySprite;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=LineDisplaySprite.js.map

/***/ }),
/* 68 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var GridLineSprite = /** @class */ (function (_super) {
	        __extends(GridLineSprite, _super);
	        function GridLineSprite(value) {
	            return _super.call(this, value) || this;
	        }
	        GridLineSprite.prototype.initData = function () {
	            var w = 100;
	            var n = 10;
	            var skeep = w / n;
	            this.clear();
	            var a;
	            var b;
	            a = new Pan3d.Vector3D(0, 0, +w);
	            b = new Pan3d.Vector3D(0, 0, -w);
	            this.makeLineMode(a, b, new Pan3d.Vector3D(0, 0, 1, 1));
	            a = new Pan3d.Vector3D(+w, 0, 0);
	            b = new Pan3d.Vector3D(-w, 0, 0);
	            this.makeLineMode(a, b, new Pan3d.Vector3D(1, 0, 0, 1));
	            this.baseColor = new Pan3d.Vector3D(128 / 255, 128 / 255, 128 / 255, 1);
	            for (var i = 1; i <= n; i++) {
	                a = new Pan3d.Vector3D(+i * skeep, 0, +w);
	                b = new Pan3d.Vector3D(+i * skeep, 0, -w);
	                this.makeLineMode(a, b);
	                a = new Pan3d.Vector3D(-i * skeep, 0, +w);
	                b = new Pan3d.Vector3D(-i * skeep, 0, -w);
	                this.makeLineMode(a, b);
	                a = new Pan3d.Vector3D(+w, 0, +i * skeep);
	                b = new Pan3d.Vector3D(-w, 0, +i * skeep);
	                this.makeLineMode(a, b);
	                a = new Pan3d.Vector3D(+w, 0, -i * skeep);
	                b = new Pan3d.Vector3D(-w, 0, -i * skeep);
	                this.makeLineMode(a, b);
	            }
	            this.upToGpu();
	        };
	        return GridLineSprite;
	    }(Pan3d.LineDisplaySprite));
	    Pan3d.GridLineSprite = GridLineSprite;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=GridLineSprite.js.map

/***/ }),
/* 69 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var TimeLineData = /** @class */ (function () {
	        function TimeLineData() {
	            this.dataAry = new Array;
	        }
	        TimeLineData.prototype.destory = function () {
	            this.dataAry = null;
	        };
	        TimeLineData.prototype.setByteData = function ($byte) {
	            var len = $byte.readFloat();
	            for (var i = 0; i < len; i++) {
	                var frameNum = $byte.readFloat();
	                var key = this.addKeyFrame(frameNum);
	                key.frameNum = frameNum;
	                key.baseValue = new Array();
	                for (var j = 0; j < 10; j++) {
	                    key.baseValue.push($byte.readFloat());
	                }
	                var animLen = $byte.readFloat();
	                key.animData = new Array;
	                if (animLen > 0) {
	                    for (var k = 0; k < animLen; k++) {
	                        key.animData.push(this.getByteDataTemp($byte));
	                    }
	                }
	            }
	            this.maxFrameNum = this.dataAry[this.dataAry.length - 1].frameNum;
	            this.beginTime = this.dataAry[0].frameNum * Pan3d.Scene3D.frameTime;
	        };
	        TimeLineData.prototype.addKeyFrame = function (num) {
	            var keyframe = new Object();
	            keyframe.frameNum = num;
	            this.dataAry.push(keyframe);
	            return keyframe;
	        };
	        TimeLineData.prototype.getByteDataTemp = function ($byte) {
	            var obj = new Object;
	            var animType = $byte.readInt();
	            var dataLen = $byte.readInt();
	            obj.data = new Array;
	            obj.dataByte = new Array;
	            for (var i = 0; i < dataLen; i++) {
	                var ko = new Object;
	                ko.type = $byte.readInt();
	                //  ko.value = $byte.readUTF();
	                // obj.data.push(ko);
	                if (ko.type == 1) {
	                    var num = $byte.readFloat();
	                    obj.dataByte.push(num);
	                }
	                if (ko.type == 2) {
	                    var v = new Pan3d.Vector3D();
	                    v.x = $byte.readFloat();
	                    v.y = $byte.readFloat();
	                    v.z = $byte.readFloat();
	                    obj.dataByte.push(v);
	                }
	            }
	            obj.type = animType;
	            return obj;
	        };
	        return TimeLineData;
	    }());
	    Pan3d.TimeLineData = TimeLineData;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=TimeLineData.js.map

/***/ }),
/* 70 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var TimeLine = /** @class */ (function (_super) {
	        __extends(TimeLine, _super);
	        function TimeLine() {
	            var _this = _super.call(this) || this;
	            _this._time = 0; //播放时间
	            _this.targetFlag = -1;
	            _this.beginTime = 0;
	            _this.isByteData = false;
	            _this.targetFlag = -1;
	            _this.visible = false;
	            _this.maxFrameNum = 0;
	            _this._time = 0;
	            _this._keyFrameAry = new Array;
	            return _this;
	        }
	        TimeLine.prototype.updateMatrix = function (posMatrix, $particle) {
	            if (this._axisMove) {
	                posMatrix.prependTranslation(this._axisMove.axis.x * this._axisMove.num, this._axisMove.axis.y * this._axisMove.num, this._axisMove.axis.z * this._axisMove.num);
	            }
	            if (this._axisRotaion) {
	                posMatrix.prependRotation(this._axisRotaion.num, this._axisRotaion.axis);
	            }
	            posMatrix.prependTranslation($particle.data.center.x, $particle.data.center.y, $particle.data.center.z);
	            if (this._scaleChange) {
	                //processScale();
	                posMatrix.prependScale($particle.data._widthFixed ? 1 : this._scaleChange.num, $particle.data._heightFixed ? 1 : this._scaleChange.num, $particle.data._widthFixed ? 1 : this._scaleChange.num);
	            }
	            else if (this._scaleNosie) {
	                //processNosie();
	                posMatrix.prependScale($particle.data._widthFixed ? 1 : (1 + this._scaleNosie.num), $particle.data._heightFixed ? 1 : (1 + this._scaleNosie.num), $particle.data._widthFixed ? 1 : (1 + this._scaleNosie.num));
	            }
	            else if (this._scaleAnim) {
	                //processScaleAnim();
	                posMatrix.prependScale($particle.data._widthFixed ? 1 : this._scaleAnim.num, $particle.data._heightFixed ? 1 : this._scaleAnim.num, $particle.data._widthFixed ? 1 : this._scaleAnim.num);
	                ////console.log(this._scaleAnim.num);
	            }
	            posMatrix.prependRotation($particle.data.rotationV3d.z, Pan3d.Vector3D.Z_AXIS);
	            posMatrix.prependRotation($particle.data.rotationV3d.y, Pan3d.Vector3D.Y_AXIS);
	            posMatrix.prependRotation($particle.data.rotationV3d.x, Pan3d.Vector3D.X_AXIS);
	        };
	        TimeLine.prototype.inverAxisRotation = function ($targetMatrix) {
	            if (this._axisRotaion) {
	                $targetMatrix.prependRotation(-this._axisRotaion.num, this._axisRotaion.axis);
	            }
	        };
	        TimeLine.prototype.applySelfRotation = function ($targetMatrix, $axis) {
	            if (this._selfRotaion) {
	                $targetMatrix.prependRotation(this._selfRotaion.num, $axis);
	            }
	        };
	        TimeLine.prototype.addKeyFrame = function (num) {
	            var keyframe = new Pan3d.KeyFrame();
	            keyframe.frameNum = num;
	            this._keyFrameAry.push(keyframe);
	            return keyframe;
	        };
	        TimeLine.prototype.updateTime = function (t) {
	            if (!this._currentKeyFrame) {
	                return;
	            }
	            this._time = t;
	            this.getTarget();
	            if (this._axisRotaion) {
	                this._axisRotaion.update(this._time);
	            }
	            if (this._selfRotaion) {
	                this._selfRotaion.update(this._time);
	            }
	            if (this._axisMove) {
	                this._axisMove.update(this._time);
	            }
	            if (this._scaleChange) {
	                this._scaleChange.update(this._time);
	            }
	            else if (this._scaleNosie) {
	                this._scaleNosie.update(this._time);
	            }
	            else if (this._scaleAnim) {
	                this._scaleAnim.update(this._time);
	            }
	        };
	        TimeLine.prototype.getTarget = function () {
	            var flag = -1;
	            for (var i = 0; i < this._keyFrameAry.length; i++) {
	                if (this._keyFrameAry[i].frameNum * Pan3d.Scene3D.frameTime < this._time) {
	                    flag = i;
	                }
	                else {
	                    break;
	                }
	            }
	            if (flag != this.targetFlag) {
	                this._currentKeyFrame = this._keyFrameAry[flag];
	                this.targetFlag = flag;
	                if (flag >= (this._keyFrameAry.length - 1) || !this._currentKeyFrame) {
	                    this.visible = false;
	                    this._currentKeyFrame = null;
	                }
	                else {
	                    this.visible = true;
	                    this.enterKeyFrame(this._currentKeyFrame.animData, this._currentKeyFrame.frameNum * Pan3d.Scene3D.frameTime, this._currentKeyFrame.baseValue);
	                }
	            }
	        };
	        TimeLine.prototype.enterKeyFrame = function (ary, baseTime, baseValueAry) {
	            if (baseTime === void 0) { baseTime = 0; }
	            if (baseValueAry === void 0) { baseValueAry = null; }
	            if (baseValueAry == null) {
	                return;
	            }
	            for (var i = 0; i < 10; i++) {
	                if (!baseValueAry[i]) {
	                    continue;
	                }
	                switch (i) {
	                    case 1:
	                        if (!this._selfRotaion)
	                            this._selfRotaion = new Pan3d.SelfRotation;
	                        this._selfRotaion.num = this._selfRotaion.baseNum = baseValueAry[i];
	                        break;
	                    case 2:
	                        if (!this._axisRotaion)
	                            this._axisRotaion = new Pan3d.AxisRotaion;
	                        this._axisRotaion.num = this._axisRotaion.baseNum = baseValueAry[i];
	                        break;
	                    case 6:
	                        if (!this._scaleChange)
	                            this._scaleChange = new Pan3d.ScaleChange;
	                        this._scaleChange.num = this._scaleChange.baseNum = baseValueAry[i];
	                        break;
	                    case 7:
	                        if (!this._scaleAnim)
	                            this._scaleAnim = new Pan3d.ScaleAnim;
	                        this._scaleAnim.num = this._scaleAnim.baseNum = baseValueAry[i];
	                        break;
	                    case 8:
	                        if (!this._scaleNosie)
	                            this._scaleNosie = new Pan3d.ScaleNoise;
	                        this._scaleNosie.num = this._scaleNosie.baseNum = baseValueAry[i];
	                        break;
	                    case 9:
	                        if (!this._axisMove)
	                            this._axisMove = new Pan3d.AxisMove;
	                        this._axisMove.num = this._axisMove.baseNum = baseValueAry[i];
	                        break;
	                }
	            }
	            if (this._selfRotaion)
	                this._selfRotaion.isDeath = true;
	            if (this._axisRotaion)
	                this._axisRotaion.isDeath = true;
	            if (this._scaleChange)
	                this._scaleChange.isDeath = true;
	            if (this._scaleAnim)
	                this._scaleAnim.isDeath = true;
	            if (this._scaleNosie)
	                this._scaleNosie.isDeath = true;
	            if (this._axisMove)
	                this._axisMove.isDeath = true;
	            if (!ary) {
	                return;
	            }
	            this.setBaseTimeByte(ary, baseTime, baseValueAry);
	        };
	        TimeLine.prototype.reset = function () {
	            this._time = 0;
	            this._currentKeyFrame = this._keyFrameAry[0];
	            this.visible = false;
	            this.targetFlag = -1;
	        };
	        TimeLine.prototype.setAllByteInfo = function ($byte, $allObj) {
	            this.isByteData = true;
	            var len = $byte.readFloat();
	            for (var i = 0; i < len; i++) {
	                var frameNum = $byte.readFloat();
	                var key = this.addKeyFrame(frameNum);
	                key.frameNum = frameNum;
	                key.baseValue = new Array();
	                for (var j = 0; j < 10; j++) {
	                    key.baseValue.push($byte.readFloat());
	                }
	                var animLen = $byte.readFloat();
	                key.animData = new Array;
	                if (animLen > 0) {
	                    for (var k = 0; k < animLen; k++) {
	                        key.animData.push(this.getByteDataTemp($byte));
	                    }
	                }
	            }
	            this.maxFrameNum = this._keyFrameAry[this._keyFrameAry.length - 1].frameNum;
	            this.beginTime = this._keyFrameAry[0].frameNum * Pan3d.Scene3D.frameTime;
	            this._currentKeyFrame = this._keyFrameAry[0];
	        };
	        TimeLine.prototype.setAllDataInfo = function ($data) {
	            this.isByteData = true;
	            var len = $data.dataAry.length;
	            for (var i = 0; i < len; i++) {
	                var key = this.addKeyFrame($data.dataAry[i].frameNum);
	                key.baseValue = $data.dataAry[i].baseValue;
	                key.animData = $data.dataAry[i].animData;
	            }
	            this.maxFrameNum = $data.maxFrameNum;
	            this.beginTime = $data.beginTime;
	            this._currentKeyFrame = this._keyFrameAry[0];
	        };
	        TimeLine.prototype.setBaseTimeByte = function (ary, baseTime, baseValueAry) {
	            if (baseTime === void 0) { baseTime = 0; }
	            if (baseValueAry === void 0) { baseValueAry = null; }
	            for (var i = 0; i < ary.length; i++) {
	                if (ary[i].type == 1) {
	                    if (!this._selfRotaion) {
	                        this._selfRotaion = new Pan3d.SelfRotation;
	                    }
	                    else {
	                        this._selfRotaion.reset();
	                    }
	                    // this._selfRotaion.data = (ary[i].data);
	                    this._selfRotaion.dataByte(ary[i].data, ary[i].dataByte);
	                    this._selfRotaion.baseTime = baseTime;
	                }
	                else if (ary[i].type == 2) {
	                    if (!this._axisRotaion) {
	                        this._axisRotaion = new Pan3d.AxisRotaion;
	                    }
	                    else {
	                        this._axisRotaion.reset();
	                    }
	                    this._axisRotaion.dataByte(ary[i].data, ary[i].dataByte);
	                    this._axisRotaion.baseTime = baseTime;
	                }
	                else if (ary[i].type == 6) {
	                    if (!this._scaleChange) {
	                        this._scaleChange = new Pan3d.ScaleChange;
	                    }
	                    else {
	                        this._scaleChange.reset();
	                    }
	                    //this._scaleChange.data = (ary[i].data);
	                    this._scaleChange.dataByte(ary[i].data, ary[i].dataByte);
	                    this._scaleChange.baseTime = baseTime;
	                }
	                else if (ary[i].type == 7) {
	                    if (!this._scaleAnim) {
	                        this._scaleAnim = new Pan3d.ScaleAnim;
	                    }
	                    else {
	                        this._scaleAnim.reset();
	                    }
	                    // this._scaleAnim.data = (ary[i].data);
	                    this._scaleAnim.dataByte(ary[i].data, ary[i].dataByte);
	                    this._scaleAnim.baseTime = baseTime;
	                }
	                else if (ary[i].type == 8) {
	                    if (!this._scaleNosie) {
	                        this._scaleNosie = new Pan3d.ScaleNoise;
	                    }
	                    else {
	                        this._scaleNosie.reset();
	                    }
	                    //this._scaleNosie.data = (ary[i].data);
	                    this._scaleNosie.dataByte(ary[i].data, ary[i].dataByte);
	                    this._scaleNosie.baseTime = baseTime;
	                }
	                else if (ary[i].type == 9) {
	                    if (!this._axisMove) {
	                        this._axisMove = new Pan3d.AxisMove;
	                    }
	                    else {
	                        this._axisMove.reset();
	                    }
	                    // this._axisMove.data = (ary[i].data);
	                    this._axisMove.dataByte(ary[i].data, ary[i].dataByte);
	                    this._axisMove.baseTime = baseTime;
	                }
	            }
	        };
	        TimeLine.prototype.getByteDataTemp = function ($byte) {
	            var obj = new Object;
	            var animType = $byte.readInt();
	            var dataLen = $byte.readInt();
	            obj.data = new Array;
	            obj.dataByte = new Array;
	            for (var i = 0; i < dataLen; i++) {
	                var ko = new Object;
	                ko.type = $byte.readInt();
	                //  ko.value = $byte.readUTF();
	                // obj.data.push(ko);
	                if (ko.type == 1) {
	                    var num = $byte.readFloat();
	                    obj.dataByte.push(num);
	                }
	                if (ko.type == 2) {
	                    var v = new Pan3d.Vector3D();
	                    v.x = $byte.readFloat();
	                    v.y = $byte.readFloat();
	                    v.z = $byte.readFloat();
	                    obj.dataByte.push(v);
	                }
	            }
	            obj.type = animType;
	            return obj;
	        };
	        /**
	         * 获取最大的帧数
	         * @return 最大帧数
	         *
	         */
	        TimeLine.prototype.getMaxFrame = function () {
	            return this._keyFrameAry[this._keyFrameAry.length - 1].frameNum;
	        };
	        TimeLine.prototype.dispose = function () {
	            //this._keyFrameAry = null;
	            //this._display3D.clear();
	            //this._display3D = null;
	            //this._currentKeyFrame = null;
	        };
	        return TimeLine;
	    }(Pan3d.EventDispatcher));
	    Pan3d.TimeLine = TimeLine;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=TimeLine.js.map

/***/ }),
/* 71 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var KeyFrame = /** @class */ (function () {
	        function KeyFrame() {
	        }
	        return KeyFrame;
	    }());
	    Pan3d.KeyFrame = KeyFrame;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=KeyFrame.js.map

/***/ }),
/* 72 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var BaseAnim = /** @class */ (function () {
	        function BaseAnim() {
	            this.baseNum = 0;
	            this.num = 0;
	            this.time = 0;
	            this.speed = 0;
	            this.aSpeed = 0;
	            this.beginTime = 0;
	            this.lastTime = 0;
	            this.baseTime = 0;
	        }
	        BaseAnim.prototype.BaseAnim = function () {
	        };
	        BaseAnim.prototype.update = function (t) {
	            if (this._isDeath) {
	                return;
	            }
	            this.time = t - this.baseTime;
	            if (this._isActiva) {
	                this.time = this.time - this.beginTime;
	                if (this.time > this.lastTime) {
	                    this.time = this.lastTime - this.beginTime;
	                    this._isDeath = true;
	                }
	                this.coreCalculate();
	            }
	            else {
	                if (this.time >= this.beginTime) {
	                    if (this.time >= this.lastTime) {
	                        this.time = this.lastTime - this.beginTime;
	                        this.coreCalculate();
	                        this._isDeath = true;
	                    }
	                    else {
	                        this.time = this.time - this.beginTime;
	                        this.coreCalculate();
	                    }
	                    this._isActiva = true;
	                }
	            }
	        };
	        BaseAnim.prototype.coreCalculate = function () {
	            this.num = this.speed * this.time + this.aSpeed * this.time * this.time + this.baseNum;
	        };
	        BaseAnim.prototype.reset = function () {
	            this._isActiva = false;
	            this._isDeath = false;
	            //time = 0;
	            //baseNum = num;
	            this.time = 0;
	            this.num = 0;
	        };
	        BaseAnim.prototype.depthReset = function () {
	            this._isActiva = false;
	            this._isDeath = false;
	            this.time = 0;
	            this.baseNum = 0;
	            this.num = 0;
	        };
	        Object.defineProperty(BaseAnim.prototype, "data", {
	            set: function (value) {
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(BaseAnim.prototype, "isDeath", {
	            get: function () {
	                return this._isDeath;
	            },
	            set: function (value) {
	                this._isDeath = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        BaseAnim.prototype.getAllNum = function (allTime) {
	            allTime = Math.min(allTime, this.lastTime);
	            allTime = allTime - this.beginTime;
	            var num = this.speed * allTime + this.aSpeed * allTime * allTime;
	            this.baseNum += num;
	        };
	        return BaseAnim;
	    }());
	    Pan3d.BaseAnim = BaseAnim;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=BaseAnim.js.map

/***/ }),
/* 73 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var AxisMove = /** @class */ (function (_super) {
	        __extends(AxisMove, _super);
	        function AxisMove() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        Object.defineProperty(AxisMove.prototype, "data", {
	            set: function (value) {
	                this.beginTime = Number(value[0].value);
	                if (Number(value[1].value) == -1) {
	                    this.lastTime = Pan3d.Scene3D.MAX_NUMBER;
	                }
	                else {
	                    this.lastTime = Number(value[1].value);
	                }
	                var vc = (value[2].value).split("|");
	                this.axis = new Pan3d.Vector3D(Number(vc[0]), Number(vc[1]), Number(vc[2]));
	                this.axis.normalize();
	                this.speed = Number(value[3].value) * 0.1;
	                this.aSpeed = Number(value[4].value) * 0.001;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        AxisMove.prototype.dataByte = function (va, arr) {
	            this.beginTime = arr[0];
	            if (arr[1] == -1) {
	                this.lastTime = Pan3d.Scene3D.MAX_NUMBER;
	            }
	            else {
	                this.lastTime = arr[1];
	            }
	            this.axis = arr[2];
	            this.axis.normalize();
	            this.speed = arr[3] * 0.1;
	            this.aSpeed = arr[4] * 0.001;
	        };
	        return AxisMove;
	    }(Pan3d.BaseAnim));
	    Pan3d.AxisMove = AxisMove;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=AxisMove.js.map

/***/ }),
/* 74 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var AxisRotaion = /** @class */ (function (_super) {
	        __extends(AxisRotaion, _super);
	        function AxisRotaion() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        Object.defineProperty(AxisRotaion.prototype, "data", {
	            set: function (value) {
	                this.beginTime = Number(value[0].value);
	                if (Number(value[1].value) == -1) {
	                    this.lastTime = Pan3d.Scene3D.MAX_NUMBER;
	                }
	                else {
	                    this.lastTime = Number(value[1].value);
	                }
	                var vc = String(value[2].value).split("|");
	                this.axis = new Pan3d.Vector3D(Number(vc[0]), Number(vc[1]), Number(vc[2]));
	                vc = String(value[3].value).split("|");
	                this.axisPos = new Pan3d.Vector3D(Number(vc[0]) * 100, Number(vc[1]) * 100, Number(vc[2]) * 100);
	                this.speed = Number(value[4].value) * 0.1;
	                this.aSpeed = Number(value[5].value) * 0.1;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        AxisRotaion.prototype.dataByte = function (va, arr) {
	            this.beginTime = Number(arr[0]);
	            if (Number(arr[1]) == -1) {
	                this.lastTime = Pan3d.Scene3D.MAX_NUMBER;
	            }
	            else {
	                this.lastTime = Number(arr[1]);
	            }
	            this.axis = arr[2];
	            this.axisPos = arr[3];
	            this.speed = arr[4] * 0.1;
	            this.aSpeed = arr[5] * 0.1;
	        };
	        return AxisRotaion;
	    }(Pan3d.BaseAnim));
	    Pan3d.AxisRotaion = AxisRotaion;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=AxisRotaion.js.map

/***/ }),
/* 75 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ScaleAnim = /** @class */ (function (_super) {
	        __extends(ScaleAnim, _super);
	        function ScaleAnim() {
	            var _this = _super.call(this) || this;
	            _this.num = 1;
	            return _this;
	        }
	        ScaleAnim.prototype.update = function (t) {
	            if (this._isDeath) {
	                return;
	            }
	            this.time = t - this.baseTime;
	            if (this._isActiva) {
	                this.coreCalculate();
	                if (this.time > this.lastTime) {
	                    this._isDeath = true;
	                }
	            }
	            else {
	                if (this.time >= this.beginTime) {
	                    //this.time = this.time-this.beginTime;
	                    this._isActiva = true;
	                }
	            }
	        };
	        ScaleAnim.prototype.coreCalculate = function () {
	            var frameNum = float2int(this.time / Pan3d.Scene3D.frameTime);
	            if (frameNum >= this.numAry.length) {
	                this.num = this.numAry[this.numAry.length - 1];
	            }
	            else {
	                this.num = this.numAry[frameNum];
	            }
	        };
	        ScaleAnim.prototype.reset = function () {
	            _super.prototype.reset.call(this);
	            this.num = 1;
	        };
	        ScaleAnim.prototype.depthReset = function () {
	            _super.prototype.depthReset.call(this);
	            this.num = 1;
	        };
	        Object.defineProperty(ScaleAnim.prototype, "data", {
	            set: function (value) {
	                this.numAry = new Array;
	                this.beginTime = Number(value[0].value);
	                if (Number(value[1].value) == -1) {
	                    this.lastTime = Pan3d.Scene3D.MAX_NUMBER;
	                }
	                else {
	                    this.lastTime = Number(value[1].value);
	                }
	                this.beginScale = Number(value[2].value);
	                this.scaleNum = Number(value[3].value);
	                this.scaleAry = new Array;
	                var addTime = 0;
	                for (var i = 4; i < 4 + this.scaleNum * 2; i += 2) {
	                    var obj = new Object;
	                    obj.value = Number(value[i].value);
	                    obj.time = Number(value[i + 1].value);
	                    addTime += obj.time;
	                    obj.beginTime = this.beginTime + addTime;
	                    this.scaleAry.push(obj);
	                }
	                var frameNum;
	                var btime = 0;
	                var aTime = 1;
	                if (this.scaleAry.length) {
	                    frameNum = (this.scaleAry[this.scaleAry.length - 1].beginTime + this.scaleAry[this.scaleAry.length - 1].time) / Pan3d.Scene3D.frameTime;
	                    aTime = this.scaleAry[0].beginTime;
	                    this._currentTarget = this.scaleAry[0];
	                }
	                else {
	                    frameNum = 0;
	                }
	                var flag = 0;
	                for (i = 0; i < frameNum; i++) {
	                    var ctime = Pan3d.Scene3D.frameTime * i;
	                    if (ctime >= this._currentTarget.beginTime) {
	                        this.beginScale = this._currentTarget.value;
	                        btime = this._currentTarget.beginTime;
	                        if (flag == this.scaleAry.length - 1) {
	                            this._currentTarget = this.scaleAry[this.scaleAry.length - 1];
	                        }
	                        else {
	                            flag++;
	                            this._currentTarget = this.scaleAry[flag];
	                        }
	                        aTime = this._currentTarget.time;
	                    }
	                    var cNum = (ctime - btime) / aTime * (this._currentTarget.value - this.beginScale) + this.beginScale;
	                    this.numAry.push(cNum);
	                }
	                this._currentTarget = this.scaleAry[0];
	            },
	            enumerable: false,
	            configurable: true
	        });
	        ScaleAnim.prototype.dataByte = function (va, arr) {
	            this.numAry = new Array;
	            this.beginTime = arr[0];
	            if (arr[1] == -1) {
	                this.lastTime = Pan3d.Scene3D.MAX_NUMBER;
	            }
	            else {
	                this.lastTime = arr[1];
	            }
	            this.beginScale = arr[2];
	            this.scaleNum = arr[3];
	            this.scaleAry = new Array;
	            var addTime = 0;
	            for (var i = 4; i < 4 + this.scaleNum * 2; i += 2) {
	                var obj = new Object;
	                obj.value = arr[i];
	                obj.time = arr[i + 1];
	                addTime += obj.time;
	                obj.beginTime = this.beginTime + addTime;
	                this.scaleAry.push(obj);
	            }
	            var frameNum;
	            var btime = 0;
	            var aTime = 1;
	            if (this.scaleAry.length) {
	                frameNum = (this.scaleAry[this.scaleAry.length - 1].beginTime + this.scaleAry[this.scaleAry.length - 1].time) / Pan3d.Scene3D.frameTime;
	                aTime = this.scaleAry[0].beginTime;
	                this._currentTarget = this.scaleAry[0];
	            }
	            else {
	                frameNum = 0;
	            }
	            var flag = 0;
	            for (i = 0; i < frameNum; i++) {
	                var ctime = Pan3d.Scene3D.frameTime * i;
	                if (ctime >= this._currentTarget.beginTime) {
	                    this.beginScale = this._currentTarget.value;
	                    btime = this._currentTarget.beginTime;
	                    if (flag == this.scaleAry.length - 1) {
	                        this._currentTarget = this.scaleAry[this.scaleAry.length - 1];
	                    }
	                    else {
	                        flag++;
	                        this._currentTarget = this.scaleAry[flag];
	                    }
	                    aTime = this._currentTarget.time;
	                }
	                var cNum = (ctime - btime) / aTime * (this._currentTarget.value - this.beginScale) + this.beginScale;
	                this.numAry.push(cNum);
	            }
	            this._currentTarget = this.scaleAry[0];
	        };
	        ScaleAnim.prototype.getAllNum = function (allTime) {
	            allTime = Math.min(allTime, this.lastTime + this.beginTime);
	            var target = this.scaleAry[this.scaleAry.length - 1];
	            if (allTime >= (target.beginTime + target.time)) {
	                this.baseNum = target.value;
	                return;
	            }
	            var flag;
	            for (var i = 0; i < this.scaleAry.length; i++) {
	                if (allTime > this.scaleAry[i].this.beginTime) {
	                    this._currentTarget = this.scaleAry[i];
	                    this.beginTime = this._currentTarget.this.beginTime;
	                    this.beginScale = this._currentTarget.value;
	                    flag = i;
	                }
	            }
	            flag++;
	            this._currentTarget = this.scaleAry[flag];
	            this.baseNum = (this._currentTarget.value - this.beginScale) / this._currentTarget.this.time * (allTime - this.beginTime) + this.beginScale;
	        };
	        return ScaleAnim;
	    }(Pan3d.BaseAnim));
	    Pan3d.ScaleAnim = ScaleAnim;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ScaleAnim.js.map

/***/ }),
/* 76 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ScaleChange = /** @class */ (function (_super) {
	        __extends(ScaleChange, _super);
	        function ScaleChange() {
	            var _this = _super.call(this) || this;
	            _this.num = 1;
	            return _this;
	        }
	        ScaleChange.prototype.coreCalculate = function () {
	            this.num = 1 + this.speed * this.time + this.baseNum;
	            if (this.num < this.minNum) {
	                this.num = this.minNum;
	            }
	            else if (this.num > this.maxNum) {
	                this.num = this.maxNum;
	            }
	        };
	        Object.defineProperty(ScaleChange.prototype, "data", {
	            /**
	             *
	             * @param value
	             *
	             */
	            set: function (value) {
	                this.beginTime = Number(value[0].value);
	                if (Number(value[1].value) == -1) {
	                    this.lastTime = Pan3d.Scene3D.MAX_NUMBER;
	                }
	                else {
	                    this.lastTime = Number(value[1].value);
	                }
	                this.speed = Number(value[2].value) * 0.001;
	                this.minNum = Number(value[3].value) * 0.01;
	                this.maxNum = Number(value[4].value) * 0.01;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        ScaleChange.prototype.dataByte = function (va, arr) {
	            this.beginTime = arr[0];
	            if (arr[1] == -1) {
	                this.lastTime = Pan3d.Scene3D.MAX_NUMBER;
	            }
	            else {
	                this.lastTime = arr[1];
	            }
	            this.speed = arr[2] * 0.001;
	            this.minNum = arr[3] * 0.01;
	            this.maxNum = arr[4] * 0.01;
	        };
	        ScaleChange.prototype.getAllNum = function (allTime) {
	            allTime = Math.min(allTime, this.lastTime);
	            allTime = allTime - this.beginTime;
	            var num = this.speed * allTime;
	            this.baseNum += num;
	            if (this.baseNum < this.minNum) {
	                this.baseNum = this.minNum;
	            }
	            else if (num > this.maxNum) {
	                this.baseNum = this.maxNum;
	            }
	        };
	        ScaleChange.prototype.reset = function () {
	            this._isActiva = false;
	            this._isDeath = false;
	            this.time = 0;
	            this.num = 1;
	        };
	        ScaleChange.prototype.depthReset = function () {
	            this._isActiva = false;
	            this._isDeath = false;
	            this.time = 0;
	            this.baseNum = 0;
	            this.num = 1;
	        };
	        return ScaleChange;
	    }(Pan3d.BaseAnim));
	    Pan3d.ScaleChange = ScaleChange;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ScaleChange.js.map

/***/ }),
/* 77 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ScaleNoise = /** @class */ (function (_super) {
	        __extends(ScaleNoise, _super);
	        function ScaleNoise() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        ScaleNoise.prototype.coreCalculate = function () {
	            this.num = this.amplitude + this.amplitude * Math.sin(this.speed * this.time);
	        };
	        Object.defineProperty(ScaleNoise.prototype, "data", {
	            set: function (value) {
	                this.beginTime = Number(value[0].value);
	                if (Number(value[1].value) == -1) {
	                    this.lastTime = Pan3d.Scene3D.MAX_NUMBER;
	                }
	                else {
	                    this.lastTime = Number(value[1].value);
	                }
	                this.amplitude = Number(value[2].value);
	                this.speed = Number(value[3].value) * 0.01;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        ScaleNoise.prototype.dataByte = function (va, arr) {
	            this.beginTime = arr[0];
	            if (arr[1] == -1) {
	                this.lastTime = Pan3d.Scene3D.MAX_NUMBER;
	            }
	            else {
	                this.lastTime = arr[1];
	            }
	            this.amplitude = arr[2];
	            this.speed = arr[3] * 0.01;
	        };
	        ScaleNoise.prototype.getAllNum = function (allTime) {
	            this.baseNum = this.amplitude + this.amplitude * Math.sin(this.speed * allTime);
	        };
	        return ScaleNoise;
	    }(Pan3d.BaseAnim));
	    Pan3d.ScaleNoise = ScaleNoise;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ScaleNoise.js.map

/***/ }),
/* 78 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SelfRotation = /** @class */ (function (_super) {
	        __extends(SelfRotation, _super);
	        function SelfRotation() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        Object.defineProperty(SelfRotation.prototype, "data", {
	            set: function (value) {
	                this.beginTime = Number(value[0].value);
	                if (Number(value[1].value) == -1) {
	                    this.lastTime = Pan3d.Scene3D.MAX_NUMBER;
	                }
	                else {
	                    this.lastTime = Number(value[1].value);
	                }
	                this.speed = Number(value[2].value) * 0.1;
	                this.aSpeed = Number(value[3].value) * 0.1;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        SelfRotation.prototype.dataByte = function (va, arr) {
	            this.beginTime = arr[0];
	            if (arr[1] == -1) {
	                this.lastTime = Pan3d.Scene3D.MAX_NUMBER;
	            }
	            else {
	                this.lastTime = arr[1];
	            }
	            this.speed = arr[2] * 0.1;
	            this.aSpeed = arr[3] * 0.1;
	        };
	        return SelfRotation;
	    }(Pan3d.BaseAnim));
	    Pan3d.SelfRotation = SelfRotation;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SelfRotation.js.map

/***/ }),
/* 79 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var CombineParticle = /** @class */ (function (_super) {
	        __extends(CombineParticle, _super);
	        function CombineParticle() {
	            var _this = _super.call(this) || this;
	            _this._maxTime = 1000000;
	            _this._rotationX = 0;
	            _this._rotationY = 0;
	            _this._rotationZ = 0;
	            _this.hasMulItem = false;
	            _this.sceneVisible = true;
	            _this.dynamic = false;
	            _this.hasDestory = false;
	            _this._displayAry = new Array;
	            _this._time = 0;
	            _this.bindMatrix = new Pan3d.Matrix3D;
	            _this.invertBindMatrix = new Pan3d.Matrix3D;
	            _this.bindVecter3d = new Pan3d.Vector3D();
	            _this.bindScale = new Pan3d.Vector3D(1, 1, 1);
	            _this.groupMatrix = new Pan3d.Matrix3D();
	            _this.groupRotationMatrix = new Pan3d.Matrix3D();
	            return _this;
	            //this.groupBindMatrix = new Matrix3D();
	        }
	        Object.defineProperty(CombineParticle.prototype, "displayAry", {
	            get: function () {
	                return this._displayAry;
	            },
	            set: function (value) {
	                this._displayAry = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(CombineParticle.prototype, "maxTime", {
	            set: function (value) {
	                this._maxTime = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(CombineParticle.prototype, "bindTarget", {
	            set: function (value) {
	                this._bindTarget = value;
	                this.invertBindMatrix.isIdentity = false;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(CombineParticle.prototype, "bindSocket", {
	            set: function (value) {
	                this._bindSocket = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(CombineParticle.prototype, "x", {
	            get: function () {
	                return this.bindVecter3d.x;
	            },
	            set: function (value) {
	                this.bindVecter3d.x = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(CombineParticle.prototype, "y", {
	            get: function () {
	                return this.bindVecter3d.y;
	            },
	            set: function (value) {
	                this.bindVecter3d.y = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(CombineParticle.prototype, "z", {
	            get: function () {
	                return this.bindVecter3d.z;
	            },
	            set: function (value) {
	                this.bindVecter3d.z = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        CombineParticle.prototype.setPos = function ($xpos, $ypos, $zpos) {
	        };
	        CombineParticle.prototype.setMulPos = function (ary) {
	        };
	        Object.defineProperty(CombineParticle.prototype, "scaleX", {
	            set: function (value) {
	                this.bindScale.x = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(CombineParticle.prototype, "scaleY", {
	            set: function (value) {
	                this.bindScale.y = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(CombineParticle.prototype, "scaleZ", {
	            set: function (value) {
	                this.bindScale.z = value;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(CombineParticle.prototype, "rotationX", {
	            set: function (value) {
	                this._rotationX = value;
	                this.applyRotation();
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(CombineParticle.prototype, "rotationY", {
	            set: function (value) {
	                this._rotationY = value;
	                this.applyRotation();
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(CombineParticle.prototype, "rotationZ", {
	            set: function (value) {
	                this._rotationZ = value;
	                this.applyRotation();
	            },
	            enumerable: false,
	            configurable: true
	        });
	        CombineParticle.prototype.applyRotation = function () {
	            this.bindMatrix.identity();
	            this.bindMatrix.appendRotation(this._rotationX, Pan3d.Vector3D.X_AXIS);
	            this.bindMatrix.appendRotation(this._rotationY, Pan3d.Vector3D.Y_AXIS);
	            this.bindMatrix.appendRotation(this._rotationZ, Pan3d.Vector3D.Z_AXIS);
	            this.bindMatrix.copyTo(this.invertBindMatrix);
	            this.invertBindMatrix.invert();
	            this.invertBindMatrix.isIdentity = false;
	        };
	        CombineParticle.prototype.setGroup = function ($pos, $rotaion, $scale) {
	            this._isInGroup = true;
	            this._groupPos = $pos;
	            this._groupRotation = $rotaion;
	            this._groupScale = $scale;
	            this.groupMatrix.isIdentity = false;
	            this.groupMatrix.identity();
	            this.groupMatrix.appendScale($scale.x, $scale.y, $scale.z);
	            this.groupMatrix.appendRotation($rotaion.x, Pan3d.Vector3D.X_AXIS);
	            this.groupMatrix.appendRotation($rotaion.y, Pan3d.Vector3D.Y_AXIS);
	            this.groupMatrix.appendRotation($rotaion.z, Pan3d.Vector3D.Z_AXIS);
	            this.groupMatrix.appendTranslation($pos.x, $pos.y, $pos.z);
	            this.groupRotationMatrix.isIdentity = false;
	            this.groupRotationMatrix.identity();
	            this.groupRotationMatrix.prependRotation($rotaion.z, Pan3d.Vector3D.Z_AXIS);
	            this.groupRotationMatrix.prependRotation($rotaion.y, Pan3d.Vector3D.Y_AXIS);
	            this.groupRotationMatrix.prependRotation($rotaion.x, Pan3d.Vector3D.X_AXIS);
	        };
	        CombineParticle.prototype.addPrticleItem = function ($dis) {
	            $dis.visible = false;
	            $dis.setBind(this.bindVecter3d, this.bindMatrix, this.bindScale, this.invertBindMatrix, this.groupMatrix);
	            this._displayAry.push($dis);
	        };
	        CombineParticle.prototype.updateTime = function (t) {
	            this._time += t;
	            if (!this._displayAry) {
	                return;
	            }
	            for (var i = 0; i < this._displayAry.length; i++) {
	                this._displayAry[i].updateTime(this._time);
	            }
	            this.updateBind();
	            if (this._time >= this._maxTime) {
	                this.dispatchEvent(new Pan3d.BaseEvent(Pan3d.BaseEvent.COMPLETE));
	            }
	        };
	        CombineParticle.prototype.updateBind = function () {
	            if (this._bindTarget) {
	                this._bindTarget.getSocket(this._bindSocket, this.bindMatrix);
	                this.bindVecter3d.setTo(this.bindMatrix.x, this.bindMatrix.y, this.bindMatrix.z);
	                this.bindMatrix.identityPostion();
	                if (!this.groupRotationMatrix.isIdentity) {
	                    this.bindMatrix.copyTo(this.invertBindMatrix);
	                    this.invertBindMatrix.prepend(this.groupRotationMatrix);
	                    this.invertBindMatrix.invert();
	                }
	                else {
	                    this.bindMatrix.invertToMatrix(this.invertBindMatrix);
	                }
	            }
	        };
	        CombineParticle.prototype.reset = function () {
	            this._time = 0;
	            for (var i = 0; i < this._displayAry.length; i++) {
	                this._displayAry[i].reset();
	            }
	        };
	        CombineParticle.prototype.update = function () {
	            if (!this.sceneVisible) {
	                return;
	            }
	            if (!this._displayAry) {
	                return;
	            }
	            var num = 0;
	            for (var i = 0; i < this._displayAry.length; i++) {
	                if (this._displayAry[i] instanceof Pan3d.Display3DBallPartilce) {
	                    if (num++ == 0) {
	                    }
	                }
	                this._displayAry[i].update();
	            }
	        };
	        CombineParticle.prototype.updateItem = function (idx) {
	            if (!this.sceneVisible) {
	                return;
	            }
	            if (this.hasDestory) {
	                return;
	            }
	            this._displayAry[idx].update();
	        };
	        Object.defineProperty(CombineParticle.prototype, "size", {
	            get: function () {
	                if (!this._displayAry) {
	                    return 0;
	                }
	                return this._displayAry.length;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        return CombineParticle;
	    }(Pan3d.EventDispatcher));
	    Pan3d.CombineParticle = CombineParticle;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=CombineParticle.js.map

/***/ }),
/* 80 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var CombineParticleData = /** @class */ (function (_super) {
	        __extends(CombineParticleData, _super);
	        function CombineParticleData() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        CombineParticleData.prototype.getCombineParticle = function () {
	            var particle = new Pan3d.CombineParticle();
	            particle.maxTime = this.maxTime;
	            for (var i = 0; i < this.dataAry.length; i++) {
	                var display = this.dataAry[i].creatPartilce();
	                particle.addPrticleItem(display);
	            }
	            particle.sourceData = this;
	            return particle;
	        };
	        CombineParticleData.prototype.setDataByte = function (byte) {
	            byte.position = 0;
	            var version = byte.readInt();
	            var len = byte.readInt();
	            this.maxTime = 0;
	            this.dataAry = new Array;
	            for (var i = 0; i < len; i++) {
	                var $particleType = byte.readInt();
	                var pdata = this.getParticleDataType($particleType);
	                if (pdata) {
	                    pdata.version = version;
	                    pdata.setAllByteInfo(byte);
	                    if (pdata.timelineData.maxFrameNum > this.maxTime) {
	                        this.maxTime = pdata.timelineData.maxFrameNum;
	                    }
	                    if (i == 2 && $particleType == 9) {
	                    }
	                    this.dataAry.push(pdata);
	                }
	                else {
	                    throw new Error("没有粒子对象，需要补充" + $particleType);
	                }
	            }
	            this.maxTime *= Pan3d.Scene3D.frameTime;
	        };
	        CombineParticleData.prototype.getParticleDataType = function ($type) {
	            var pdata;
	            switch ($type) {
	                case 1:
	                    {
	                        pdata = new Pan3d.ParticleFacetData(this.scene3D);
	                        break;
	                    }
	                case 18:
	                    {
	                        pdata = new Pan3d.ParticleBallData(this.scene3D);
	                        break;
	                    }
	                case 3:
	                    {
	                        pdata = new Pan3d.ParticleLocusData(this.scene3D);
	                        break;
	                    }
	                case 14:
	                    {
	                        pdata = new Pan3d.ParticleLocusballData(this.scene3D);
	                        break;
	                    }
	                case 9:
	                case 4:
	                case 7:
	                    {
	                        pdata = new Pan3d.ParticleModelData(this.scene3D);
	                        break;
	                    }
	                case 8:
	                    {
	                        // pdata = new ParticleFollowData();
	                        break;
	                    }
	                case 12:
	                    {
	                        // pdata = new ParticleFollowLocusData();
	                        break;
	                    }
	                case 13:
	                    {
	                        // pdata = new ParticleBoneData()
	                        break;
	                    }
	            }
	            return pdata;
	        };
	        return CombineParticleData;
	    }(Pan3d.ResCount));
	    Pan3d.CombineParticleData = CombineParticleData;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=CombineParticleData.js.map

/***/ }),
/* 81 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ParticleGpuData = /** @class */ (function (_super) {
	        __extends(ParticleGpuData, _super);
	        function ParticleGpuData() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        return ParticleGpuData;
	    }(Pan3d.ObjData));
	    Pan3d.ParticleGpuData = ParticleGpuData;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ParticleGpuData.js.map

/***/ }),
/* 82 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var ParticleData = /** @class */ (function () {
	        function ParticleData(value) {
	            this._delayedTime = 0;
	            this._width = 100; //宽度
	            this._height = 100; //高度
	            this._originWidthScale = 0.5; //原点宽度比例
	            this._originHeightScale = 0.5; //原点高度比例
	            this._eyeDistance = 0; //距离视点距离
	            this._watchEye = false; //是否面向视点
	            this._isZiZhuan = false;
	            this.overAllScale = 1;
	            this.scene3D = value;
	        }
	        ParticleData.prototype.uploadGpu = function () {
	        };
	        ParticleData.prototype.regShader = function () {
	        };
	        ParticleData.prototype.initVcData = function () {
	        };
	        ParticleData.prototype.creatPartilce = function () {
	            var particle = this.getParticle();
	            particle.data = this;
	            var tl = new Pan3d.TimeLine();
	            tl.setAllDataInfo(this.timelineData);
	            particle.setTimeLine(tl);
	            particle.onCreated();
	            return particle;
	        };
	        ParticleData.prototype.getParticle = function () {
	            return null;
	        };
	        ParticleData.prototype.setAllByteInfo = function ($byte) {
	            this.timelineData = new Pan3d.TimeLineData();
	            this.timelineData.setByteData($byte);
	            this._beginTime = this.timelineData.beginTime;
	            if (this.version >= 15) {
	                this._delayedTime = $byte.readFloat();
	            }
	            this._width = $byte.readFloat();
	            this._height = $byte.readFloat();
	            this._widthFixed = $byte.readBoolean();
	            this._heightFixed = $byte.readBoolean();
	            this._originWidthScale = $byte.readFloat();
	            this._originHeightScale = $byte.readFloat();
	            this._eyeDistance = $byte.readFloat();
	            this._alphaMode = $byte.readFloat();
	            this._uSpeed = $byte.readFloat();
	            this._vSpeed = $byte.readFloat();
	            this._animLine = $byte.readFloat();
	            this._animRow = $byte.readFloat();
	            this._animInterval = $byte.readFloat();
	            this._renderPriority = $byte.readFloat();
	            this._distortion = $byte.readBoolean();
	            this._isUV = $byte.readBoolean();
	            this._isU = $byte.readBoolean();
	            this._isV = $byte.readBoolean();
	            this._life = $byte.readFloat();
	            this._life = this._life > 10000 ? Pan3d.Scene3D.MAX_NUMBER : this._life;
	            this._watchEye = $byte.readBoolean();
	            this._ziZhuanAngly = new Pan3d.Vector3D();
	            this._ziZhuanAngly.x = $byte.readFloat();
	            this._ziZhuanAngly.y = $byte.readFloat();
	            this._ziZhuanAngly.z = $byte.readFloat();
	            this._ziZhuanAngly.w = $byte.readFloat();
	            this.rotationV3d = new Pan3d.Vector3D;
	            this.rotationV3d.x = $byte.readFloat();
	            this.rotationV3d.y = $byte.readFloat();
	            this.rotationV3d.z = $byte.readFloat();
	            this.center = new Pan3d.Vector3D();
	            this.center.x = $byte.readFloat();
	            this.center.y = $byte.readFloat();
	            this.center.z = $byte.readFloat();
	            this.center.w = $byte.readFloat();
	            this.overAllScale = $byte.readFloat();
	            //var materialParamStr: string = $byte.readUTF();
	            //this.materialParamData = JSON.parse(materialParamStr);
	            if (this._ziZhuanAngly && (this._ziZhuanAngly.x != 0 || this._ziZhuanAngly.y != 0 || this._ziZhuanAngly.z != 0)) {
	                this._isZiZhuan = true;
	            }
	            this.readMaterialPara($byte);
	            var strMaterialUrl = $byte.readUTF();
	            strMaterialUrl = strMaterialUrl.replace("_byte.txt", ".txt");
	            strMaterialUrl = strMaterialUrl.replace(".txt", "_byte.txt");
	            this.materialByteUrl = strMaterialUrl;
	        };
	        Object.defineProperty(ParticleData.prototype, "materialByteUrl", {
	            set: function (value) {
	                var _this = this;
	                if (this._materialUrl == value) {
	                    return;
	                }
	                this._materialUrl = value;
	                this.scene3D.materialManager.getMaterialByte(this.scene3D.fileRoot + value, function ($matrial) { _this.onMaterialLoad($matrial); });
	            },
	            enumerable: false,
	            configurable: true
	        });
	        ParticleData.prototype.onMaterialLoad = function ($matrial) {
	            this.materialParam = new Pan3d.MaterialParam(this.scene3D);
	            this.materialParam.setMaterial($matrial);
	            this.materialParam.setLife(this._life);
	            if (this.materialParamData) {
	                this.materialParam.setTextObj(this.materialParamData.texAry);
	                this.materialParam.setConstObj(this.materialParamData.conAry);
	            }
	            this.scene3D.materialManager.loadDynamicTexUtil(this.materialParam);
	            this.regShader();
	        };
	        ParticleData.prototype.readMaterialPara = function ($byte) {
	            this.materialParamData = new Object();
	            var $materlUrl = $byte.readUTF();
	            //  this.materialParamData.materialUrl = materialUrl;
	            var texAryLen = $byte.readInt();
	            this.materialParamData.texAry = new Array;
	            for (var i = 0; i < texAryLen; i++) {
	                var temp = new Object;
	                temp.isParticleColor = $byte.readBoolean();
	                temp.paramName = $byte.readUTF();
	                temp.url = $byte.readUTF();
	                if (temp.isParticleColor) {
	                    temp.curve = new Object;
	                    this.readTempCurve($byte, temp.curve);
	                }
	                this.materialParamData.texAry.push(temp);
	            }
	            this.readMaterialParaConAry($byte);
	        };
	        ParticleData.prototype.readTempCurve = function ($byte, curve) {
	            curve.values = new Array();
	            var has = false;
	            if (this.version >= 12) {
	                var valuesLen = $byte.readInt();
	                if (valuesLen > 0) {
	                    var scaleNum = $byte.readFloat();
	                }
	                for (var j = 0; j < valuesLen; j++) {
	                    var rgbLen = $byte.readInt();
	                    var valuesArr = new Array;
	                    for (var k = 0; k < rgbLen; k++) {
	                        valuesArr.push($byte.readByte() / 127 * scaleNum);
	                    }
	                    curve.values.push(valuesArr);
	                }
	                has = true;
	            }
	            curve.type = $byte.readFloat();
	            curve.maxFrame = $byte.readFloat();
	            curve.sideType = $byte.readBoolean();
	            curve.speedType = $byte.readBoolean();
	            curve.useColorType = $byte.readBoolean();
	            curve.items = this.readItems($byte);
	            if (!has) {
	                this.makeCurveData(curve);
	            }
	        };
	        ParticleData.prototype.readItems = function ($byte) {
	            var items = new Array();
	            var itemsLen = $byte.readInt();
	            for (var u = 0; u < itemsLen; u++) {
	                var $obj = new Object;
	                $obj.frame = $byte.readInt();
	                $obj.vec3 = $byte.readVector3D(true);
	                $obj.rotation = $byte.readVector3D(true);
	                $obj.rotationLeft = $byte.readVector3D(true);
	                items.push($obj);
	            }
	            return items;
	        };
	        ParticleData.prototype.makeCurveData = function ($curve) {
	            var arr = $curve.items;
	            var r = new Array;
	            var g = new Array;
	            var b = new Array;
	            var a = new Array;
	            for (var i = 0; i < arr.length; i++) {
	                if (i == (arr.length - 1)) { //最后一个
	                    r.push(arr[i].vec3.x);
	                    g.push(arr[i].vec3.y);
	                    b.push(arr[i].vec3.z);
	                    a.push(arr[i].vec3.w);
	                }
	                else {
	                    var $speedNum = arr[i + 1].frame - arr[i].frame;
	                    var $A = arr[i].vec3;
	                    var $B = arr[i + 1].vec3;
	                    var $a = $curve.items[i].rotation;
	                    var $b = $curve.items[i + 1].rotationLeft;
	                    r = r.concat(this.getBzData($A.x, $B.x, $a.x, $b.x, $speedNum));
	                    g = g.concat(this.getBzData($A.y, $B.y, $a.y, $b.y, $speedNum));
	                    b = b.concat(this.getBzData($A.z, $B.z, $a.z, $b.z, $speedNum));
	                    a = a.concat(this.getBzData($A.w, $B.w, $a.w, $b.w, $speedNum));
	                }
	            }
	            $curve.values = new Array();
	            $curve.values[0] = r;
	            $curve.values[1] = g;
	            $curve.values[2] = b;
	            $curve.values[3] = a;
	        };
	        ParticleData.prototype.getBzData = function ($ax, $bx, ar, br, $speedNum) {
	            var num80 = 10;
	            var a = new Pan3d.Vector2D(0, $ax * num80);
	            var d = new Pan3d.Vector2D($speedNum, $bx * num80);
	            var m = new Pan3d.Matrix3D;
	            var p = new Pan3d.Vector3D;
	            m.identity();
	            m.appendRotation(-ar, Pan3d.Vector3D.Z_AXIS);
	            p = m.transformVector(new Pan3d.Vector3D($speedNum / 2, 0, 0));
	            var b = new Pan3d.Vector2D($speedNum / 2, a.y + p.y);
	            m.identity();
	            m.appendRotation(-br, Pan3d.Vector3D.Z_AXIS);
	            p = m.transformVector(new Pan3d.Vector3D(-$speedNum / 2, 0, 0));
	            var c = new Pan3d.Vector2D($speedNum / 2, d.y + p.y);
	            var ary = [a, b, c, d];
	            var posAry = new Array;
	            var baseW = 3;
	            for (var i = 1; i < $speedNum * 3; i++) {
	                posAry.push(this.drawbezier(ary, i / ($speedNum * 3)));
	            }
	            var _valueVec = new Array;
	            for (i = 0; i < $speedNum; i++) {
	                for (var j = 0; j < posAry.length; j++) {
	                    if (posAry[j].x >= i) {
	                        _valueVec.push(posAry[j].y / num80);
	                        break;
	                    }
	                }
	            }
	            return _valueVec;
	        };
	        ParticleData.prototype.drawbezier = function (_array, _time) {
	            var _newarray = new Array();
	            if (_array.length == 0) {
	                return new Pan3d.Vector2D();
	            }
	            for (var i in _array) {
	                _newarray.push(new Pan3d.Vector2D(_array[i].x, _array[i].y));
	            }
	            while (_newarray.length > 1) {
	                for (var j = 0; j < _newarray.length - 1; j++) {
	                    this.mathmidpoint(_newarray[j], _newarray[j + 1], _time);
	                }
	                _newarray.pop();
	            }
	            return _newarray[0];
	        };
	        ParticleData.prototype.mathmidpoint = function (a, b, t) {
	            var _nx, _ny;
	            _nx = a.x + (b.x - a.x) * t;
	            _ny = a.y + (b.y - a.y) * t;
	            a.x = _nx;
	            a.y = _ny;
	        };
	        ParticleData.prototype.readMaterialParaConAry = function ($byte) {
	            var arr = new Array;
	            var conAryLen = $byte.readInt();
	            for (var i = 0; i < conAryLen; i++) {
	                var obj = new Object;
	                obj.type = $byte.readFloat();
	                obj.indexID = $byte.readFloat();
	                obj.paramName = $byte.readUTF();
	                obj.curve = new Object();
	                this.readTempCurve($byte, obj.curve);
	                arr.push(obj);
	            }
	            this.materialParamData.conAry = arr;
	        };
	        ParticleData.prototype.setFloat32Vec = function (key, ary) {
	        };
	        ParticleData.prototype.setFloat32Mat = function (key, ary) {
	        };
	        return ParticleData;
	    }());
	    Pan3d.ParticleData = ParticleData;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ParticleData.js.map

/***/ }),
/* 83 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Display3DParticle = /** @class */ (function (_super) {
	        __extends(Display3DParticle, _super);
	        function Display3DParticle(value) {
	            var _this = _super.call(this, value) || this;
	            _this.isInGroup = false;
	            _this.visible = true;
	            _this._rotationMatrix = new Pan3d.Matrix3D();
	            _this.modelMatrix = new Pan3d.Matrix3D();
	            return _this;
	        }
	        Display3DParticle.prototype.onCreated = function () {
	        };
	        Display3DParticle.prototype.setBind = function ($pos, $rotation, $scale, $invertRotation, $groupMatrix) {
	            this.bindVecter3d = $pos;
	            this.bindMatrix = $rotation;
	            this.bindScale = $scale;
	            this.invertBindMatrix = $invertRotation;
	            this.groupMatrix = $groupMatrix;
	        };
	        Display3DParticle.prototype.setViewCamModeMatr3d = function () {
	            var ctx = this.scene3D.context3D;
	            ctx.setVcMatrix4fv(this.data.materialParam.shader, "viewMatrix", this.scene3D.camera3D.viewMatrix.m);
	            ctx.setVcMatrix4fv(this.data.materialParam.shader, "camMatrix", this.scene3D.camera3D.camMatrix3D.m);
	            ctx.setVcMatrix4fv(this.data.materialParam.shader, "modeMatrix", this.modelMatrix.m);
	        };
	        Display3DParticle.prototype.getMulBindList = function () {
	            return null;
	        };
	        Display3DParticle.prototype.updateMatrix = function () {
	            if (!this.bindMatrix) {
	                return;
	            }
	            this.modelMatrix.identity();
	            if (!this.groupMatrix.isIdentity) {
	                this.posMatrix.append(this.groupMatrix);
	            }
	            this.modelMatrix.append(this.posMatrix);
	            this.modelMatrix.append(this.bindMatrix);
	            this.modelMatrix.appendTranslation(this.bindVecter3d.x, this.bindVecter3d.y, this.bindVecter3d.z);
	        };
	        Object.defineProperty(Display3DParticle.prototype, "cantUseEffectsLev", {
	            //特效配置等级显示  是否能显示
	            get: function () {
	                return false;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Display3DParticle.prototype.updateTime = function (t) {
	            if (this.cantUseEffectsLev) {
	                return;
	            }
	            this._time = t - this._beginTime;
	            this._time += this.data._delayedTime; //加上延时 
	            this.timeline.updateTime(t);
	            this.visible = this.timeline.visible;
	            this.posMatrix.identity();
	            this.posMatrix.prependScale(this.scaleX * 0.1 * this.bindScale.x * this.data.overAllScale, this.scaleY * 0.1 * this.bindScale.y * this.data.overAllScale, this.scaleZ * 0.1 * this.bindScale.z * this.data.overAllScale);
	            this.timeline.updateMatrix(this.posMatrix, this);
	        };
	        Display3DParticle.prototype.reset = function () {
	            this.timeline.reset();
	            this.updateTime(0);
	        };
	        Display3DParticle.prototype.update = function () {
	            {
	                if (this.visible && this.data != null && this.scene3D != null) {
	                    if (this.data.materialParam != null && this.data.materialParam.shader != null) {
	                        this.shader = this.data.materialParam.shader;
	                        var ctx = this.scene3D.context3D;
	                        ctx.setProgram(this.shader.program);
	                        ctx.setBlendParticleFactors(this.data._alphaMode);
	                        // ctx.cullFaceBack(this.data.materialParam.material.backCull);
	                        this.updateMatrix();
	                        this.setMaterialVc();
	                        this.setMaterialTexture();
	                        this.setVc();
	                        this.setVa();
	                        this.resetVa();
	                    }
	                }
	            }
	        };
	        Display3DParticle.prototype.setVc = function () {
	        };
	        Display3DParticle.prototype.setVa = function () {
	        };
	        Display3DParticle.prototype.resetVa = function () {
	        };
	        Display3DParticle.prototype.setMaterialVc = function () {
	            if (!this.data.materialParam) {
	                return;
	            }
	            var dynamicConstList = this.data.materialParam.dynamicConstList;
	            var t = this._time % (Pan3d.Scene3D.frameTime * this.data._life);
	            for (var i = 0; i < dynamicConstList.length; i++) {
	                dynamicConstList[i].update(t);
	            }
	            if (this.data.materialParam.material.fcNum <= 0) {
	                return;
	            }
	            t = t * this.data.materialParam.material.timeSpeed;
	            this.data.materialParam.material.update(t);
	            var ctx = this.scene3D.context3D;
	            ctx.setVc4fv(this.data.materialParam.shader, "fc", this.data.materialParam.material.fcData);
	        };
	        Display3DParticle.prototype.setMaterialTexture = function () {
	            if (!this.data.materialParam) {
	                return;
	            }
	            var ctx = this.scene3D.context3D;
	            var texVec = this.data.materialParam.material.texList;
	            for (var i = 0; i < texVec.length; i++) {
	                if (texVec[i].isDynamic) {
	                    continue;
	                }
	                ctx.setRenderTexture(this.data.materialParam.shader, texVec[i].name, texVec[i].texture, texVec[i].id, true);
	            }
	            var texDynamicVec = this.data.materialParam.dynamicTexList;
	            for (var i = 0; i < texDynamicVec.length; i++) {
	                ctx.setRenderTexture(this.data.materialParam.shader, texDynamicVec[i].target.name, texDynamicVec[i].texture, texDynamicVec[i].target.id, true);
	            }
	        };
	        Display3DParticle.prototype.setAllByteInfo = function ($byte, version) {
	            if (version === void 0) { version = 0; }
	            this.creatData();
	            this.data.version = version;
	            this.data.setAllByteInfo($byte);
	            this.timeline = new Pan3d.TimeLine();
	            this.timeline.setAllDataInfo(this.data.timelineData);
	            this._beginTime = this.timeline.beginTime;
	        };
	        Display3DParticle.prototype.creatData = function () {
	            this.data = new Pan3d.ParticleData(this.scene3D);
	        };
	        Display3DParticle.prototype.setTimeLine = function ($tl) {
	            this.timeline = $tl;
	            this._beginTime = $tl.beginTime;
	        };
	        return Display3DParticle;
	    }(Pan3d.Display3D));
	    Pan3d.Display3DParticle = Display3DParticle;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Display3DParticle.js.map

/***/ }),
/* 84 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ParticleFacetData = /** @class */ (function (_super) {
	        __extends(ParticleFacetData, _super);
	        function ParticleFacetData() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this._isCycle = false; //是否循环
	            return _this;
	        }
	        ParticleFacetData.prototype.setAllByteInfo = function ($byte) {
	            this._maxAnimTime = $byte.readFloat();
	            this._isCycle = $byte.readBoolean();
	            this._lockx = $byte.readBoolean();
	            this._locky = $byte.readBoolean();
	            _super.prototype.setAllByteInfo.call(this, $byte);
	            this.initVcData();
	            this.uploadGpu();
	        };
	        ParticleFacetData.prototype.getParticle = function () {
	            return new Pan3d.Display3DFacetParticle(this.scene3D);
	        };
	        ParticleFacetData.prototype.uploadGpu = function () {
	            this.objData = new Pan3d.ObjData(this.scene3D);
	            this.makeRectangleData(this._width, this._height, this._originWidthScale, this._originHeightScale, this._isUV, this._isU, this._isV, this._animLine, this._animRow);
	        };
	        ParticleFacetData.prototype.makeRectangleData = function (width, height, offsetX, offsetY, isUV, isU, isV, animLine, animRow) {
	            if (offsetX === void 0) { offsetX = 0.5; }
	            if (offsetY === void 0) { offsetY = 0.5; }
	            if (isUV === void 0) { isUV = false; }
	            if (isU === void 0) { isU = false; }
	            if (isV === void 0) { isV = false; }
	            if (animLine === void 0) { animLine = 1; }
	            if (animRow === void 0) { animRow = 1; }
	            var uvAry = new Array;
	            var verterList = new Array;
	            var ary = new Array;
	            ary.push(new Pan3d.Vector2D(0, 0));
	            ary.push(new Pan3d.Vector2D(0, 1 / animRow));
	            ary.push(new Pan3d.Vector2D(1 / animLine, 1 / animRow));
	            ary.push(new Pan3d.Vector2D(1 / animLine, 0));
	            if (isU) {
	                for (var i = 0; i < ary.length; i++) {
	                    ary[i].x = -ary[i].x;
	                }
	            }
	            if (isV) {
	                for (var i = 0; i < ary.length; i++) {
	                    ary[i].y = -ary[i].y;
	                }
	            }
	            if (isUV) {
	                ary.push(ary.shift());
	            }
	            for (var i = 0; i < ary.length; i++) {
	                uvAry.push(ary[i].x, ary[i].y);
	            }
	            verterList.push(-offsetX * width, height - offsetY * height, 0);
	            verterList.push(ary[0].x, ary[0].y);
	            verterList.push(width - offsetX * width, height - offsetY * height, 0);
	            verterList.push(ary[1].x, ary[1].y);
	            verterList.push(width - offsetX * width, -offsetY * height, 0);
	            verterList.push(ary[2].x, ary[2].y);
	            verterList.push(-offsetX * width, -offsetY * height, 0);
	            verterList.push(ary[3].x, ary[3].y);
	            var indexs = new Array;
	            indexs.push(0, 1, 2, 0, 2, 3);
	            this.objData.stride = 5 * 4;
	            var ctx = this.scene3D.context3D;
	            this.objData.vertexBuffer = ctx.uploadBuff3D(verterList);
	            this.objData.indexBuffer = ctx.uploadIndexBuff3D(indexs);
	            this.objData.treNum = indexs.length;
	        };
	        ParticleFacetData.prototype.regShader = function () {
	            this.materialParam.shader = this.scene3D.progrmaManager.getMaterialProgram(Pan3d.Display3DFacetShader.Display3D_Facet_Shader, Pan3d.Display3DFacetShader, this.materialParam.material);
	        };
	        return ParticleFacetData;
	    }(Pan3d.ParticleData));
	    Pan3d.ParticleFacetData = ParticleFacetData;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ParticleFacetData.js.map

/***/ }),
/* 85 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Display3DFacetShader = /** @class */ (function (_super) {
	        __extends(Display3DFacetShader, _super);
	        function Display3DFacetShader() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        Display3DFacetShader.prototype.binLocation = function ($context) {
	            $context.bindAttribLocation(this.program, 0, "v3Position");
	            $context.bindAttribLocation(this.program, 1, "v2TexCoord");
	        };
	        Display3DFacetShader.prototype.getVertexShaderString = function () {
	            var $str = "attribute vec3 v3Position;\n" +
	                "attribute vec2 v2TexCoord;\n" +
	                "uniform mat4 viewMatrix;\n" +
	                "uniform mat4 camMatrix;\n" +
	                "uniform mat4 modeMatrix;\n" +
	                "uniform mat4 rotMatrix;\n" +
	                "uniform vec2 uvMove;\n" +
	                "varying vec2 v0;\n" +
	                "void main(void){\n" +
	                "   v0 = v2TexCoord+uvMove  ;\n" +
	                "   vec4 vt0= vec4(v3Position.xyz, 1.0);" +
	                "   gl_Position =viewMatrix*camMatrix*modeMatrix*rotMatrix* vt0;" +
	                "}";
	            return $str;
	        };
	        Display3DFacetShader.prototype.getFragmentShaderString = function () {
	            var $str = "precision mediump float;\n" +
	                "uniform sampler2D tex;\n" +
	                "varying vec2 v0;\n" +
	                "void main(void)\n" +
	                "{\n" +
	                "vec4 infoUv = texture2D(tex, v0.xy);\n" +
	                "gl_FragColor = infoUv;\n" +
	                "}";
	            return $str;
	        };
	        Display3DFacetShader.Display3D_Facet_Shader = "Display3DFacetShader";
	        return Display3DFacetShader;
	    }(Pan3d.Shader3D));
	    Pan3d.Display3DFacetShader = Display3DFacetShader;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Display3DFacetShader.js.map

/***/ }),
/* 86 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Display3DFacetParticle = /** @class */ (function (_super) {
	        __extends(Display3DFacetParticle, _super);
	        function Display3DFacetParticle(value) {
	            var _this = _super.call(this, value) || this;
	            _this.uvMove = new Float32Array(2);
	            return _this;
	        }
	        Object.defineProperty(Display3DFacetParticle.prototype, "facetdata", {
	            get: function () {
	                return this.data;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Display3DFacetParticle.prototype.creatData = function () {
	            this.data = new Pan3d.ParticleFacetData(this.scene3D);
	        };
	        Display3DFacetParticle.prototype.setVc = function () {
	            _super.prototype.setVa.call(this);
	            this.setViewCamModeMatr3d();
	            this.updateRotaionMatrix();
	            this.updateUV();
	            var ctx = this.scene3D.context3D;
	            ctx.setVcMatrix4fv(this.shader, "rotMatrix", this._rotationMatrix.m);
	            ctx.setVc2fv(this.shader, "uvMove", this.uvMove);
	        };
	        Display3DFacetParticle.prototype.updateRotaionMatrix = function () {
	            this._rotationMatrix.identity();
	            if (this.data._watchEye) {
	                this.timeline.inverAxisRotation(this._rotationMatrix);
	                if (!this.facetdata._locky && !this.facetdata._lockx) {
	                    this.inverBind();
	                }
	                if (!this.facetdata._locky) {
	                    this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationY, Pan3d.Vector3D.Y_AXIS);
	                }
	                if (!this.facetdata._lockx) {
	                    this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationX, Pan3d.Vector3D.X_AXIS);
	                }
	            }
	            if (this.data._isZiZhuan) {
	                this.timeline.applySelfRotation(this._rotationMatrix, this.data._ziZhuanAngly);
	            }
	        };
	        Display3DFacetParticle.prototype.updateUV = function () {
	            var currentFrame = float2int(this._time / Pan3d.Scene3D.frameTime);
	            currentFrame = currentFrame > this.facetdata._maxAnimTime ? this.facetdata._maxAnimTime : currentFrame;
	            currentFrame = (currentFrame / this.data._animInterval) % (this.data._animLine * this.data._animRow);
	            this.uvMove[0] = float2int(currentFrame % this.data._animLine) / this.data._animLine + this._time / Pan3d.Scene3D.frameTime * this.data._uSpeed;
	            this.uvMove[1] = float2int(currentFrame / this.data._animLine) / this.data._animRow + this._time / Pan3d.Scene3D.frameTime * this.data._vSpeed;
	        };
	        Display3DFacetParticle.prototype.inverBind = function () {
	        };
	        Display3DFacetParticle.prototype.setVa = function () {
	            var ctx = this.scene3D.context3D;
	            var tf = ctx.pushVa(this.data.objData.vertexBuffer);
	            if (!tf) {
	                ctx.setVaOffset(0, 3, this.data.objData.stride, 0);
	                ctx.setVaOffset(1, 2, this.data.objData.stride, 12);
	            }
	            ctx.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
	        };
	        return Display3DFacetParticle;
	    }(Pan3d.Display3DParticle));
	    Pan3d.Display3DFacetParticle = Display3DFacetParticle;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Display3DFacetParticle.js.map

/***/ }),
/* 87 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ParticleModelData = /** @class */ (function (_super) {
	        __extends(ParticleModelData, _super);
	        function ParticleModelData() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        ParticleModelData.prototype.getParticle = function () {
	            return new Pan3d.Display3DModelPartilce(this.scene3D);
	        };
	        ParticleModelData.prototype.setAllByteInfo = function ($byte) {
	            this.objData = new Pan3d.ObjData(this.scene3D);
	            this._maxAnimTime = $byte.readFloat();
	            var vLen = $byte.getInt();
	            var dataWidth = 5;
	            var len = vLen * dataWidth * 4;
	            var arybuff = new ArrayBuffer(len);
	            var data = new DataView(arybuff);
	            Pan3d.BaseRes.readBytes2ArrayBuffer($byte, data, 3, 0, dataWidth, 4); //vertices
	            Pan3d.BaseRes.readBytes2ArrayBuffer($byte, data, 2, 3, dataWidth, 4); //uv
	            var iLen = $byte.readInt();
	            for (var k = 0; k < iLen; k++) {
	                this.objData.indexs.push($byte.readInt());
	            }
	            this.objData.stride = dataWidth * 4;
	            if (this.version >= 36) {
	                this._depthMode = $byte.readInt(); //新加模型特效深度信息
	            }
	            _super.prototype.setAllByteInfo.call(this, $byte);
	            var ctx = this.scene3D.context3D;
	            this.objData.vertexBuffer = ctx.uploadBuff3DArrayBuffer(arybuff);
	            this.objData.indexBuffer = ctx.uploadIndexBuff3D(this.objData.indexs);
	            this.objData.treNum = this.objData.indexs.length;
	        };
	        ParticleModelData.prototype.uploadGpu = function () {
	            var ctx = this.scene3D.context3D;
	            this.objData.vertexBuffer = ctx.uploadBuff3D(this.objData.vertices);
	            this.objData.uvBuffer = ctx.uploadBuff3D(this.objData.uvs);
	            this.objData.indexBuffer = ctx.uploadIndexBuff3D(this.objData.indexs);
	            this.objData.treNum = this.objData.indexs.length;
	        };
	        ParticleModelData.prototype.regShader = function () {
	            this.materialParam.shader = this.scene3D.progrmaManager.getMaterialProgram(Pan3d.Display3DFacetShader.Display3D_Facet_Shader, Pan3d.Display3DFacetShader, this.materialParam.material);
	        };
	        return ParticleModelData;
	    }(Pan3d.ParticleData));
	    Pan3d.ParticleModelData = ParticleModelData;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ParticleModelData.js.map

/***/ }),
/* 88 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Display3DModelShader = /** @class */ (function (_super) {
	        __extends(Display3DModelShader, _super);
	        function Display3DModelShader() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        return Display3DModelShader;
	    }(Pan3d.Shader3D));
	    Pan3d.Display3DModelShader = Display3DModelShader;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Display3DModelShader.js.map

/***/ }),
/* 89 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Display3DModelPartilce = /** @class */ (function (_super) {
	        __extends(Display3DModelPartilce, _super);
	        function Display3DModelPartilce(value) {
	            var _this = _super.call(this, value) || this;
	            _this._resultUvVec = new Array(2);
	            return _this;
	        }
	        Object.defineProperty(Display3DModelPartilce.prototype, "modeldata", {
	            get: function () {
	                return this.data;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Display3DModelPartilce.prototype.creatData = function () {
	            this.data = new Pan3d.ParticleModelData(this.scene3D);
	        };
	        Display3DModelPartilce.prototype.setVc = function () {
	            _super.prototype.setVc.call(this);
	            var ctx = this.scene3D.context3D;
	            this.setViewCamModeMatr3d();
	            this.updateRotaionMatrix();
	            ctx.setVcMatrix4fv(this.shader, "rotMatrix", this._rotationMatrix.m);
	        };
	        Display3DModelPartilce.prototype.updateRotaionMatrix = function () {
	            this._rotationMatrix.identity();
	            if (this.data._watchEye) {
	                this.timeline.inverAxisRotation(this._rotationMatrix);
	                this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationY, Pan3d.Vector3D.Y_AXIS);
	                this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationX, Pan3d.Vector3D.X_AXIS);
	            }
	            if (this.data._isZiZhuan) {
	                this.timeline.applySelfRotation(this._rotationMatrix, this.data._ziZhuanAngly);
	            }
	        };
	        Display3DModelPartilce.prototype.setVa = function () {
	            _super.prototype.setVa.call(this);
	            var ctx = this.scene3D.context3D;
	            ctx.setWriteDepth(this.data._depthMode == 1);
	            var tf = ctx.pushVa(this.data.objData.vertexBuffer);
	            if (!tf) {
	                ctx.setVaOffset(0, 3, this.data.objData.stride, 0);
	                ctx.setVaOffset(1, 2, this.data.objData.stride, 12);
	            }
	            this.setMaterialTexture();
	            ctx.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
	            ctx.setWriteDepth(false);
	        };
	        return Display3DModelPartilce;
	    }(Pan3d.Display3DParticle));
	    Pan3d.Display3DModelPartilce = Display3DModelPartilce;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Display3DModelPartilce.js.map

/***/ }),
/* 90 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ParticleLocusData = /** @class */ (function (_super) {
	        __extends(ParticleLocusData, _super);
	        function ParticleLocusData() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this._speed = 1; //粒子运动数字
	            _this._isLoop = false; //是否循环
	            return _this;
	        }
	        ParticleLocusData.prototype.getParticle = function () {
	            return new Pan3d.Display3DLocusPartilce(this.scene3D);
	        };
	        ParticleLocusData.prototype.setAllByteInfo = function ($byte) {
	            this._isLoop = $byte.readBoolean(); //b
	            this._speed = $byte.readFloat(); //f
	            this._density = $byte.readFloat(); //f
	            this._isEnd = $byte.readBoolean(); //b
	            this.objData = new Pan3d.ObjData(this.scene3D);
	            var vLen = $byte.getInt();
	            var dataWidth = 9;
	            var len = vLen * dataWidth * 4;
	            var arybuff = new ArrayBuffer(len);
	            var data = new DataView(arybuff);
	            Pan3d.BaseRes.readBytes2ArrayBuffer($byte, data, 3, 0, dataWidth, 4); //vertices
	            Pan3d.BaseRes.readBytes2ArrayBuffer($byte, data, 4, 3, dataWidth, 4); //normal
	            Pan3d.BaseRes.readBytes2ArrayBuffer($byte, data, 2, 7, dataWidth, 4); //uv
	            var iLen = $byte.readInt();
	            for (var k = 0; k < iLen; k++) {
	                this.objData.indexs.push($byte.readInt());
	            }
	            this.objData.stride = dataWidth * 4;
	            _super.prototype.setAllByteInfo.call(this, $byte);
	            this.initUV();
	            if (this._watchEye) {
	                this._caramPosVec = [0, 0, 0];
	            }
	            this._uvVec = [this._isU ? -1 : 1, this._isV ? -1 : 1, this._isUV ? 1 : -1];
	            this.initVcData();
	            var ctx = this.scene3D.context3D;
	            this.objData.vertexBuffer = ctx.uploadBuff3DArrayBuffer(arybuff);
	            this.objData.indexBuffer = ctx.uploadIndexBuff3D(this.objData.indexs);
	            this.objData.treNum = this.objData.indexs.length;
	        };
	        ParticleLocusData.prototype.initUV = function () {
	            this._resultUvVec = new Array(3);
	            var $nowTime = 0;
	            var $lifeRoundNum = (this._life / 100);
	            var $moveUv = this._speed * $nowTime / this._density / 10;
	            if (this._isEnd) {
	                $moveUv = Math.min(1, $moveUv);
	            }
	            var $fcVector;
	            if (this._isLoop) {
	                if (this._life) {
	                    $moveUv = $moveUv % ($lifeRoundNum + 1);
	                    $fcVector = new Pan3d.Vector3D($moveUv, $lifeRoundNum, -$lifeRoundNum);
	                }
	                else {
	                    $moveUv = $moveUv % 1;
	                    $fcVector = new Pan3d.Vector3D($moveUv + 1, 99, -2);
	                }
	            }
	            else {
	                if (this._life) {
	                    $fcVector = new Pan3d.Vector3D($moveUv, $lifeRoundNum, -1);
	                }
	                else {
	                    $fcVector = new Pan3d.Vector3D($moveUv, 99, -1);
	                }
	            }
	            this._resultUvVec[0] = $fcVector.x;
	            this._resultUvVec[1] = $fcVector.y;
	            this._resultUvVec[2] = $fcVector.z;
	        };
	        ParticleLocusData.prototype.uploadGpu = function () {
	            var ctx = this.scene3D.context3D;
	            this.objData.vertexBuffer = ctx.uploadBuff3D(this.objData.vertices);
	            this.objData.uvBuffer = ctx.uploadBuff3D(this.objData.uvs);
	            if (this._watchEye) {
	                this.objData.normalsBuffer = ctx.uploadBuff3D(this.objData.normals);
	            }
	            this.objData.indexBuffer = ctx.uploadIndexBuff3D(this.objData.indexs);
	            this.objData.treNum = this.objData.indexs.length;
	        };
	        ParticleLocusData.prototype.regShader = function () {
	            if (!this.materialParam) {
	                return;
	            }
	            var isWatchEye = this._watchEye ? 1 : 0;
	            var changeUv = 0;
	            var hasParticleColor = this.materialParam.material.hasParticleColor;
	            if (this._isU || this._isV || this._isUV) {
	                changeUv = 1;
	                this._changUv = true;
	            }
	            else {
	                this._changUv = false;
	            }
	            var shaderParameAry;
	            shaderParameAry = [isWatchEye, changeUv, hasParticleColor ? 1 : 0];
	            //var shader: Display3DLocusShader = new Display3DLocusShader();
	            this.materialParam.shader = this.scene3D.progrmaManager.getMaterialProgram(Pan3d.Display3DLocusShader.Display3D_Locus_Shader, Pan3d.Display3DLocusShader, this.materialParam.material, shaderParameAry);
	        };
	        ParticleLocusData.prototype.initVcData = function () {
	            this.vcmatData = new Float32Array(Pan3d.Display3DLocusShader.getVcSize() * 16);
	        };
	        ParticleLocusData.prototype.setFloat32Vec = function (key, ary) {
	            var idxary = Pan3d.Display3DLocusShader.shader_vec4[key];
	            var idx = idxary[0] * 16 + idxary[1] * 4;
	            this.vcmatData.set(ary, idx);
	        };
	        ParticleLocusData.prototype.setFloat32Mat = function (key, ary) {
	            var idx = Pan3d.Display3DLocusShader.shader_mat4[key] * 16;
	            this.vcmatData.set(ary, idx);
	        };
	        return ParticleLocusData;
	    }(Pan3d.ParticleData));
	    Pan3d.ParticleLocusData = ParticleLocusData;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ParticleLocusData.js.map

/***/ }),
/* 91 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Display3DLocusShader = /** @class */ (function (_super) {
	        __extends(Display3DLocusShader, _super);
	        function Display3DLocusShader() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        Display3DLocusShader.prototype.binLocation = function ($context) {
	            $context.bindAttribLocation(this.program, 0, "v3Position");
	            $context.bindAttribLocation(this.program, 1, "v2TexCoord");
	            if (this.paramAry[0]) {
	                $context.bindAttribLocation(this.program, 2, "v3Normal");
	            }
	        };
	        Display3DLocusShader.prototype.getMat4Str = function (key) {
	            //return key;
	            return "vcmat[" + Display3DLocusShader.shader_mat4[key] + "]";
	        };
	        Display3DLocusShader.prototype.getVec4Str = function (key) {
	            //return key;
	            return "vcmat[" + Display3DLocusShader.shader_vec4[key][0] + "][" + Display3DLocusShader.shader_vec4[key][1] + "]";
	        };
	        Display3DLocusShader.getVcSize = function () {
	            return 4;
	        };
	        Display3DLocusShader.prototype.getVertexShaderString = function () {
	            var isWatchEye = this.paramAry[0];
	            var isUV = this.paramAry[1];
	            var hasParticleColor = this.paramAry[2];
	            var defineBaseStr = "attribute vec4 v3Position;\n" +
	                "attribute vec2 v2TexCoord;\n" +
	                "attribute vec4 v3Normal;\n" +
	                "uniform mat4 viewMatrix;\n" +
	                "uniform mat4 camMatrix;\n" +
	                "uniform mat4 modeMatrix;\n" +
	                "uniform vec3 vcmat30;\n" +
	                "varying vec2 v0;\n" +
	                "varying vec4 v2;\n" +
	                "varying vec2 v1;\n";
	            if (isWatchEye) { //面向视角需要有镜头
	                defineBaseStr += "uniform vec4 v3CamPos;\n";
	            }
	            var mainBaseStr = "   vec2 tempv0 = v2TexCoord;\n" +
	                "   tempv0.x -= vcmat30.x;\n" +
	                "   float alpha = tempv0.x/vcmat30.y;\n" +
	                "   alpha = 1.0 - clamp(abs(alpha),0.0,1.0);\n" +
	                "   float kill = -tempv0.x;\n" +
	                "   kill *= tempv0.x - vcmat30.z;\n" +
	                "   v2 = vec4(kill,0.0,0.0,alpha);\n" +
	                "   v1 = v2TexCoord;\n" +
	                "   v0 = tempv0;\n" +
	                "   vec4 tempPos = modeMatrix* v3Position;\n" +
	                "   vec3 mulPos = vec3(tempPos.x,tempPos.y,tempPos.z);\n" +
	                "   tempPos.xyz = mulPos.xyz + v3Position.xyz;\n" +
	                "   gl_Position = viewMatrix  * camMatrix * modeMatrix* tempPos;\n";
	            var resultStr = defineBaseStr +
	                "void main(void){\n" +
	                mainBaseStr +
	                "}";
	            return resultStr;
	        };
	        Display3DLocusShader.prototype.getFragmentShaderString = function () {
	            var $str = "precision mediump float;\n" +
	                "uniform sampler2D fs0;\n" +
	                "uniform sampler2D fs1;\n" +
	                "uniform vec4 fc[1];\n" +
	                "varying vec2 v0;\n" +
	                "varying vec4 v2;\n" +
	                "varying vec2 v1;\n" +
	                "void main(void){\n" +
	                "\n" +
	                "vec4 ft0 = texture2D(fs0,v0);\n" +
	                "vec4 ft1 = texture2D(fs1,v1);\n" +
	                "gl_FragColor = vec4(1,0,0,1);\n" +
	                "\n" +
	                "}";
	            return $str;
	        };
	        Display3DLocusShader.Display3D_Locus_Shader = "Display3DLocusShader";
	        Display3DLocusShader.shader_mat4 = { viewMatrix3D: 0, camMatrix3D: 1, posMatrix3D: 2 };
	        Display3DLocusShader.shader_vec4 = { uvMove: [3, 0], camPos: [3, 1], isUv: [3, 2] };
	        return Display3DLocusShader;
	    }(Pan3d.Shader3D));
	    Pan3d.Display3DLocusShader = Display3DLocusShader;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Display3DLocusShader.js.map

/***/ }),
/* 92 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Display3DLocusPartilce = /** @class */ (function (_super) {
	        __extends(Display3DLocusPartilce, _super);
	        function Display3DLocusPartilce() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        Object.defineProperty(Display3DLocusPartilce.prototype, "locusdata", {
	            get: function () {
	                return this.data;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Display3DLocusPartilce.prototype.creatData = function () {
	            this.data = new Pan3d.ParticleLocusData(this.scene3D);
	        };
	        Display3DLocusPartilce.prototype.setVa = function () {
	            var ctx = this.scene3D.context3D;
	            var tf = ctx.pushVa(this.data.objData.vertexBuffer);
	            if (!tf) {
	                ctx.setVaOffset(0, 3, this.data.objData.stride, 0);
	                ctx.setVaOffset(1, 2, this.data.objData.stride, 28);
	                if (this.data._watchEye) {
	                    ctx.setVaOffset(2, 4, this.data.objData.stride, 12);
	                }
	            }
	            this.setMaterialTexture();
	            ctx.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
	        };
	        Display3DLocusPartilce.prototype.setVc = function () {
	            this.updateUV();
	            var ctx = this.scene3D.context3D;
	            this.setViewCamModeMatr3d();
	            ctx.setVc3fv(this.shader, "vcmat30", this.locusdata._resultUvVec);
	            if (this.data._watchEye) {
	                var cam3D = this.scene3D.cam3D;
	                ctx.setVc4fv(this.shader, "v3CamPos", [cam3D.x, cam3D.y, cam3D.z, cam3D.w]);
	            }
	            if (this.locusdata._changUv) {
	            }
	            this.setMaterialVc();
	        };
	        Display3DLocusPartilce.prototype.updateUV = function () {
	            var $nowTime = this._time / Pan3d.Scene3D.frameTime;
	            var $lifeRoundNum = (this.data._life / 100);
	            var $moveUv = this.locusdata._speed * $nowTime / this.locusdata._density / 10;
	            if (this.locusdata._isEnd) {
	                $moveUv = Math.min(1, $moveUv);
	            }
	            if (this.locusdata._isLoop) {
	                if (this.locusdata._life) {
	                    $moveUv = $moveUv % ($lifeRoundNum + 1);
	                }
	                else {
	                    $moveUv = $moveUv % 1;
	                }
	            }
	            this.locusdata._resultUvVec[0] = $moveUv;
	        };
	        return Display3DLocusPartilce;
	    }(Pan3d.Display3DParticle));
	    Pan3d.Display3DLocusPartilce = Display3DLocusPartilce;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Display3DLocusPartilce.js.map

/***/ }),
/* 93 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ParticleBallData = /** @class */ (function (_super) {
	        __extends(ParticleBallData, _super);
	        function ParticleBallData() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this._totalNum = 1;
	            _this._acceleration = 0.2;
	            _this._toscale = 0.00;
	            _this._shootAngly = new Pan3d.Vector3D(1, 0, 0);
	            _this._shootSpeed = 0;
	            _this._isRandom = false;
	            _this._isSendRandom = false;
	            _this._isSendAngleRandom = false;
	            _this._paticleMaxScale = 1;
	            _this._paticleMinScale = 1;
	            _this._addforce = new Pan3d.Vector3D(0, 0, 0);
	            _this._lixinForce = new Pan3d.Vector3D(0, 0, 0);
	            _this._waveform = new Pan3d.Vector3D(0, 0, 0, 0);
	            _this._round = new Pan3d.Vector3D();
	            _this._is3Dlizi = false;
	            _this._speed = 1;
	            _this._isLoop = false;
	            _this._basePositon = new Pan3d.Vector3D(0, 0, 0);
	            _this._baseRandomAngle = 0;
	            _this._shapeType = 0;
	            _this._playSpeed = 1;
	            _this._beginScale = 0;
	            return _this;
	        }
	        ParticleBallData.prototype.getParticle = function () {
	            return new Pan3d.Display3DBallPartilce(this.scene3D);
	        };
	        ParticleBallData.prototype.setAllByteInfo = function ($byte) {
	            this._totalNum = $byte.readFloat();
	            this._acceleration = $byte.readFloat();
	            this._toscale = $byte.readFloat();
	            this._shootSpeed = $byte.readFloat();
	            this._isRandom = $byte.readBoolean();
	            this._isSendRandom = $byte.readBoolean();
	            this._round.x = $byte.readFloat();
	            this._round.y = $byte.readFloat();
	            this._round.z = $byte.readFloat();
	            this._round.w = $byte.readFloat();
	            this._is3Dlizi = $byte.readBoolean();
	            this._halfCircle = $byte.readBoolean();
	            this._shootAngly.x = $byte.readFloat();
	            this._shootAngly.y = $byte.readFloat();
	            this._shootAngly.z = $byte.readFloat();
	            this._shootAngly.w = $byte.readFloat();
	            this._shootAngly.normalize(); //发射锥角，设置为摸范围内 原来没有做处理，新加
	            this._speed = $byte.readFloat();
	            this._isLoop = $byte.readBoolean();
	            this._isSendAngleRandom = $byte.readBoolean();
	            this._waveform.x = $byte.readFloat();
	            this._waveform.y = $byte.readFloat();
	            this._waveform.z = $byte.readFloat();
	            this._waveform.w = $byte.readFloat();
	            this._closeSurface = $byte.readBoolean();
	            this._isEven = $byte.readBoolean();
	            this._paticleMaxScale = $byte.readFloat();
	            this._paticleMinScale = $byte.readFloat();
	            this._basePositon.x = $byte.readFloat();
	            this._basePositon.y = $byte.readFloat();
	            this._basePositon.z = $byte.readFloat();
	            this._basePositon.w = $byte.readFloat();
	            this._baseRandomAngle = $byte.readFloat();
	            this._shapeType = $byte.readFloat();
	            this._lockX = $byte.readBoolean();
	            this._lockY = $byte.readBoolean();
	            this._addforce.x = $byte.readFloat();
	            this._addforce.y = $byte.readFloat();
	            this._addforce.z = $byte.readFloat();
	            this._addforce.w = $byte.readFloat();
	            this._addforce.scaleByW();
	            this._lixinForce.x = $byte.readFloat();
	            this._lixinForce.y = $byte.readFloat();
	            this._lixinForce.z = $byte.readFloat();
	            this._lixinForce.w = $byte.readFloat();
	            this._islixinAngly = $byte.readBoolean();
	            this._particleRandomScale = new Pan3d.Vector3D();
	            this._particleRandomScale.x = $byte.readFloat();
	            this._particleRandomScale.y = $byte.readFloat();
	            this._particleRandomScale.z = $byte.readFloat();
	            this._particleRandomScale.w = $byte.readFloat();
	            this._playSpeed = $byte.readFloat();
	            this.facez = $byte.readBoolean();
	            this._beginScale = $byte.readFloat();
	            this._widthFixed = $byte.readBoolean();
	            this._heightFixed = $byte.readBoolean();
	            this.readRandomColor($byte);
	            if (this._acceleration != 0 || this._addforce.x != 0 || this._addforce.y != 0 || this._addforce.z != 0) {
	                this._needAddSpeed = true;
	                this._addSpeedVec = new Pan3d.Vector3D(this._addforce.x, this._addforce.y, this._addforce.z);
	            }
	            else {
	                this._needAddSpeed = false;
	                this._addSpeedVec = new Pan3d.Vector3D(); ////需核对
	            }
	            if (this._toscale != 0 || this._waveform.x != 0 || this._waveform.y != 0) {
	                this._needScale = true;
	                this._scaleVec = new Pan3d.Vector3D(this._toscale, this._waveform.x, this._waveform.y, this._beginScale);
	                this._scaleCtrlVec = new Pan3d.Vector3D(this._widthFixed ? 0 : 1, this._heightFixed ? 0 : 1, this._paticleMaxScale - 1, this._paticleMinScale - 1);
	            }
	            else {
	                this._scaleVec = new Pan3d.Vector3D(1, 1, 1, 1); ////需核对
	                this._scaleCtrlVec = new Pan3d.Vector3D(1, 1, 1, 1); ////需核对
	                this._needScale = false;
	            }
	            _super.prototype.setAllByteInfo.call(this, $byte);
	            this._timeVec = new Pan3d.Vector3D(0, this._acceleration, this._life, this._isLoop ? 1 : -1);
	            if (this._is3Dlizi) {
	                this._wordPosVec = [0, 0, 0];
	                this._caramPosVec = [0, 0, 0];
	                this._allRotationMatrix = new Pan3d.Matrix3D();
	            }
	            this.initVcData();
	        };
	        ParticleBallData.prototype.readRandomColor = function ($byte) {
	            var randomColorLen = $byte.readInt();
	            var obj = new Object;
	            obj.alpha = new Array;
	            obj.color = new Array;
	            obj.pos = new Array;
	            //fs.writeFloat(randomColor.alpha[i])
	            //fs.writeFloat(randomColor.color[i])
	            //fs.writeFloat(randomColor.pos[i])
	            for (var i = 0; i < randomColorLen; i++) {
	                obj.alpha.push($byte.readFloat());
	                obj.color.push($byte.readFloat());
	                obj.pos.push($byte.readFloat());
	            }
	            this._textureRandomColorInfo = obj;
	        };
	        Object.defineProperty(ParticleBallData.prototype, "objBallData", {
	            get: function () {
	                return (this.objData);
	            },
	            enumerable: false,
	            configurable: true
	        });
	        ParticleBallData.prototype.uploadGpu = function () {
	            this.objData = new Pan3d.ParticleBallGpuData(this.scene3D);
	            this.initBaseData();
	            this.initBasePos();
	            this.initSpeed();
	            this.initSelfRotaion();
	            if (this._needRandomColor) {
	                this.initBaseColor();
	            }
	            this.pushToGpu();
	        };
	        ParticleBallData.prototype.initBaseData = function () {
	            var verterList = new Array;
	            var uvAry = new Array;
	            var indexs = new Array;
	            for (var i = 0; i < this._totalNum; i++) {
	                this.makeRectangleData(verterList, uvAry, this._width, this._height, this._originWidthScale, this._originHeightScale, this._isUV, this._isU, this._isV, this._animLine, this._animRow, i);
	                indexs.push(0 + i * 4, 1 + i * 4, 2 + i * 4, 0 + i * 4, 2 + i * 4, 3 + i * 4);
	            }
	            this.objBallData.vertices = verterList;
	            this.objBallData.uvs = uvAry;
	            this.objBallData.indexs = indexs;
	        };
	        ParticleBallData.prototype.makeRectangleData = function (verterList, uvAry, width, height, offsetX, offsetY, isUV, isU, isV, animLine, animRow, indexID) {
	            if (offsetX === void 0) { offsetX = 0.5; }
	            if (offsetY === void 0) { offsetY = 0.5; }
	            if (isUV === void 0) { isUV = false; }
	            if (isU === void 0) { isU = false; }
	            if (isV === void 0) { isV = false; }
	            if (animLine === void 0) { animLine = 1; }
	            if (animRow === void 0) { animRow = 1; }
	            if (indexID === void 0) { indexID = 0; }
	            var ranScale = Math.random() * (this._particleRandomScale.x - this._particleRandomScale.y) + this._particleRandomScale.y;
	            verterList.push((-offsetX * width) * ranScale, (height - offsetY * height) * ranScale, 0);
	            verterList.push((width - offsetX * width) * ranScale, (height - offsetY * height) * ranScale, 0);
	            verterList.push((width - offsetX * width) * ranScale, (-offsetY * height) * ranScale, 0);
	            verterList.push((-offsetX * width) * ranScale, (-offsetY * height) * ranScale, 0);
	            var ary = new Array;
	            ary.push(new Pan3d.Vector2D(0, 0));
	            ary.push(new Pan3d.Vector2D(0, 1 / animRow));
	            ary.push(new Pan3d.Vector2D(1 / animLine, 1 / animRow));
	            ary.push(new Pan3d.Vector2D(1 / animLine, 0));
	            if (isU) {
	                for (var i = 0; i < ary.length; i++) {
	                    ary[i].x = -ary[i].x;
	                }
	            }
	            if (isV) {
	                for (var i = 0; i < ary.length; i++) {
	                    ary[i].y = -ary[i].y;
	                }
	            }
	            if (isUV) {
	                ary.push(ary.shift());
	            }
	            for (var i = 0; i < ary.length; i++) {
	                uvAry.push(ary[i].x, ary[i].y, indexID);
	            }
	        };
	        ParticleBallData.prototype.initBasePos = function () {
	            var basePos = new Array;
	            for (var i = 0; i < this._totalNum; i++) {
	                var v3d;
	                var ma;
	                if (this._isRandom) {
	                    var roundv3d = new Pan3d.Vector3D(this._round.x * this._round.w, this._round.y * this._round.w, this._round.z * this._round.w);
	                    if (this._isEven) { //圆柱
	                        if (this._closeSurface) { //紧贴表面
	                            v3d = new Pan3d.Vector3D(0, 0, roundv3d.z);
	                            ma = new Pan3d.Matrix3D;
	                            ma.appendRotation(Math.random() * 360, Pan3d.Vector3D.Y_AXIS);
	                            v3d = ma.transformVector(v3d);
	                            v3d.y = roundv3d.y * Math.random() * 2 - roundv3d.y;
	                        }
	                        else {
	                            v3d = new Pan3d.Vector3D(0, 0, roundv3d.z * Math.random() * 2 - roundv3d.z);
	                            ma = new Pan3d.Matrix3D;
	                            ma.appendRotation(Math.random() * 360, Pan3d.Vector3D.Y_AXIS);
	                            v3d = ma.transformVector(v3d);
	                            v3d.y = roundv3d.y * Math.random() * 2 - roundv3d.y;
	                        }
	                    }
	                    else { //圆球
	                        if (this._closeSurface) { //只有xyz相等时候才能紧贴表面
	                            v3d = new Pan3d.Vector3D(0, 0, roundv3d.z);
	                            ma = new Pan3d.Matrix3D;
	                            if (this._halfCircle) {
	                                ma.appendRotation(-Math.random() * 180, Pan3d.Vector3D.X_AXIS);
	                            }
	                            else {
	                                ma.appendRotation(Math.random() * 360, Pan3d.Vector3D.X_AXIS);
	                            }
	                            ma.appendRotation(Math.random() * 360, Pan3d.Vector3D.Y_AXIS);
	                            v3d = ma.transformVector(v3d);
	                        }
	                        else {
	                            if (this._halfCircle) {
	                                v3d = new Pan3d.Vector3D(roundv3d.x * Math.random() * 2 - roundv3d.x, roundv3d.y * Math.random(), roundv3d.z * Math.random() * 2 - roundv3d.z);
	                            }
	                            else {
	                                v3d = new Pan3d.Vector3D(roundv3d.x * Math.random() * 2 - roundv3d.x, roundv3d.y * Math.random() * 2 - roundv3d.y, roundv3d.z * Math.random() * 2 - roundv3d.z);
	                            }
	                        }
	                    }
	                }
	                else {
	                    v3d = new Pan3d.Vector3D();
	                }
	                v3d = v3d.add(this._basePositon);
	                for (var j = 0; j < 4; j++) {
	                    basePos.push(v3d.x, v3d.y, v3d.z, i * this._shootSpeed);
	                }
	            }
	            this.objBallData.basePos = basePos;
	        };
	        ParticleBallData.prototype.initSpeed = function () {
	            var beMove = new Array;
	            for (var i = 0; i < this._totalNum; i++) {
	                var resultv3d = new Pan3d.Vector3D;
	                var v3d = new Pan3d.Vector3D;
	                // if(this._shootAngly.z == -1){
	                //     //console.log(this._shootAngly.z);
	                // }
	                if (this._shootAngly.x != 0 || this._shootAngly.y != 0 || this._shootAngly.z != 0) { //锥形速度
	                    var r = Math.tan(this._shootAngly.w * Math.PI / 180 * Math.random());
	                    var a = 360 * Math.PI / 180 * Math.random();
	                    v3d = new Pan3d.Vector3D(Math.sin(a) * r, Math.cos(a) * r, 1);
	                    var ma = new Pan3d.Matrix3D(); //moveMatrix3D();
	                    ma.fromVtoV(new Pan3d.Vector3D(0, 0.0101, 0.99994), new Pan3d.Vector3D(this._shootAngly.x, this._shootAngly.y, this._shootAngly.z));
	                    v3d = ma.transformVector(v3d);
	                    if (isNaN(v3d.x)) {
	                        throw new Error("发射锥角，可能有问题，确定是否有取膜");
	                    }
	                    v3d.normalize();
	                    resultv3d = resultv3d.add(v3d);
	                }
	                if (this._lixinForce.x != 0 || this._lixinForce.y != 0 || this._lixinForce.z != 0) {
	                    v3d = new Pan3d.Vector3D(Math.random() > 0.5 ? -this._lixinForce.x : this._lixinForce.x, Math.random() > 0.5 ? -this._lixinForce.y : this._lixinForce.y, Math.random() > 0.5 ? -this._lixinForce.z : this._lixinForce.z);
	                    v3d.normalize();
	                    resultv3d = resultv3d.add(v3d);
	                }
	                if (this._islixinAngly) {
	                    if (this._isEven) {
	                        v3d = new Pan3d.Vector3D(this.objBallData.basePos[i * 16], 0, this.objBallData.basePos[i * 16 + 2]);
	                    }
	                    else {
	                        v3d = new Pan3d.Vector3D(this.objBallData.basePos[i * 16], this.objBallData.basePos[i * 16 + 1], this.objBallData.basePos[i * 16 + 2]);
	                    }
	                    v3d.normalize();
	                    resultv3d = resultv3d.add(v3d);
	                }
	                resultv3d.normalize();
	                if (this._isSendRandom) {
	                    resultv3d.scaleBy(this._speed * Math.random());
	                }
	                else {
	                    resultv3d.scaleBy(this._speed);
	                }
	                var ranAngle = this._baseRandomAngle * Math.random() * Math.PI / 180;
	                for (var j = 0; j < 4; j++) {
	                    beMove.push(resultv3d.x, resultv3d.y, resultv3d.z);
	                }
	            }
	            this.objBallData.beMove = beMove;
	        };
	        ParticleBallData.prototype.initSelfRotaion = function () {
	            var _baseRotationAngle = 0;
	            var _baseRotationSpeed = 0;
	            if (this._ziZhuanAngly.x == 0 && this._ziZhuanAngly.y == 0 && this._ziZhuanAngly.z == 0 && this._ziZhuanAngly.w == 0) {
	                this._needSelfRotation = false;
	                return;
	            }
	            if (this._is3Dlizi) {
	                this._needSelfRotation = false;
	                return;
	            }
	            this._needSelfRotation = true;
	            var vecs = new Array;
	            var flag = 0;
	            while (flag < this._totalNum) {
	                _baseRotationAngle = this._ziZhuanAngly.x;
	                if (this._ziZhuanAngly.y == 1) {
	                    _baseRotationAngle = _baseRotationAngle * Math.random();
	                }
	                _baseRotationSpeed = this._ziZhuanAngly.z;
	                if (this._ziZhuanAngly.w == 1) {
	                    _baseRotationSpeed = _baseRotationSpeed * Math.random();
	                }
	                else if (this._ziZhuanAngly.w == -1) {
	                    _baseRotationSpeed = _baseRotationSpeed * (Math.random() * 2 - 1);
	                }
	                vecs.push(_baseRotationAngle, _baseRotationSpeed);
	                vecs.push(_baseRotationAngle, _baseRotationSpeed);
	                vecs.push(_baseRotationAngle, _baseRotationSpeed);
	                vecs.push(_baseRotationAngle, _baseRotationSpeed);
	                flag++;
	            }
	            this.objBallData.baseRotation = vecs;
	        };
	        ParticleBallData.prototype.initBaseColor = function () {
	            var imgData = Pan3d.ColorTransition.getInstance().getImageData(this._textureRandomColorInfo);
	            var colorNum = imgData.data;
	            var colors = new Array;
	            for (var i = 0; i < this._totalNum; i++) {
	                var index = float2int(128 * Math.random()) * 4;
	                var ranColor = new Pan3d.Vector3D(colorNum[index], colorNum[index + 1], colorNum[index + 2], colorNum[index + 3]);
	                ranColor.scaleBy(1 / 0xff);
	                colors.push(ranColor.x, ranColor.y, ranColor.z, ranColor.w);
	                colors.push(ranColor.x, ranColor.y, ranColor.z, ranColor.w);
	                colors.push(ranColor.x, ranColor.y, ranColor.z, ranColor.w);
	                colors.push(ranColor.x, ranColor.y, ranColor.z, ranColor.w);
	            }
	            this.objBallData.randomColor = colors;
	        };
	        ParticleBallData.prototype.pushToGpu = function () {
	            this.compressVertex();
	        };
	        ParticleBallData.prototype.compressVertex = function () {
	            var size = this.objBallData.vertices.length / 3;
	            var itemSize = 13;
	            if (this._needSelfRotation) {
	                itemSize += 2;
	            }
	            if (this._needRandomColor) {
	                this.objBallData.randomOffset = itemSize * 4;
	                itemSize += 4;
	            }
	            this.objBallData.stride = itemSize * 4;
	            var ary = new Array;
	            for (var i = 0; i < size; i++) {
	                for (var j = 0; j < 3; j++) {
	                    ary.push(this.objBallData.vertices[i * 3 + j]);
	                }
	                for (var j = 0; j < 3; j++) {
	                    ary.push(this.objBallData.uvs[i * 3 + j]);
	                }
	                for (var j = 0; j < 4; j++) {
	                    ary.push(this.objBallData.basePos[i * 4 + j]);
	                }
	                for (var j = 0; j < 3; j++) {
	                    ary.push(this.objBallData.beMove[i * 3 + j]);
	                }
	                if (this._needSelfRotation) {
	                    for (var j = 0; j < 2; j++) {
	                        ary.push(this.objBallData.baseRotation[i * 2 + j]);
	                    }
	                }
	                if (this._needRandomColor) {
	                    for (var j = 0; j < 4; j++) {
	                        ary.push(this.objBallData.randomColor[i * 4 + j]);
	                    }
	                }
	            }
	            var ctx = this.scene3D.context3D;
	            this.objBallData.vertexBuffer = ctx.uploadBuff3D(ary);
	            this.objBallData.indexBuffer = ctx.uploadIndexBuff3D(this.objBallData.indexs);
	            this.objBallData.treNum = this.objBallData.indexs.length;
	            ////console.log(ary.length);
	        };
	        ParticleBallData.prototype.initVcData = function () {
	        };
	        ParticleBallData.prototype.regShader = function () {
	            if (!this.materialParam) {
	                return;
	            }
	            var shaderParameAry = this.getShaderParam();
	            this.materialParam.shader = this.scene3D.progrmaManager.getMaterialProgram(Pan3d.Display3DBallShader.Display3D_Ball_Shader, Pan3d.Display3DBallShader, this.materialParam.material, shaderParameAry);
	        };
	        ParticleBallData.prototype.getShaderParam = function () {
	            if (this._animRow != 1 || this._animLine != 1) {
	                this._uvType = 1;
	                this._animCtrlVec = [this._animLine, this._animRow, this._animInterval];
	            }
	            else if (this._uSpeed != 0 || this._vSpeed != 0) {
	                this._uvType = 2;
	                this._uvCtrlVec = [this._uSpeed, this._vSpeed];
	            }
	            else {
	                this._uvType = 0;
	            }
	            var hasParticleColor = this.materialParam.material.hasParticleColor;
	            this._needRandomColor = this.materialParam.material.hasVertexColor;
	            this.uploadGpu(); //椭球粒子需要判断是否包含随机色来确定va结构
	            var shaderParameAry;
	            var hasParticle;
	            if (hasParticleColor) {
	                hasParticle = 1;
	            }
	            else {
	                hasParticle = 0;
	            }
	            var hasRandomClolr = this._needRandomColor ? 1 : 0;
	            var isMul = this._is3Dlizi ? 1 : 0;
	            var needRotation = this._needSelfRotation ? 1 : 0;
	            var needScale = this._needScale ? 1 : 0;
	            var needAddSpeed = this._needAddSpeed ? 1 : 0;
	            shaderParameAry = [hasParticle, hasRandomClolr, isMul, needRotation, needScale, needAddSpeed, this._uvType];
	            return shaderParameAry;
	        };
	        return ParticleBallData;
	    }(Pan3d.ParticleData));
	    Pan3d.ParticleBallData = ParticleBallData;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ParticleBallData.js.map

/***/ }),
/* 94 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ParticleBallGpuData = /** @class */ (function (_super) {
	        __extends(ParticleBallGpuData, _super);
	        function ParticleBallGpuData() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        return ParticleBallGpuData;
	    }(Pan3d.ParticleGpuData));
	    Pan3d.ParticleBallGpuData = ParticleBallGpuData;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ParticleBallGpuData.js.map

/***/ }),
/* 95 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Display3DBallShader = /** @class */ (function (_super) {
	        __extends(Display3DBallShader, _super);
	        function Display3DBallShader() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        Display3DBallShader.prototype.binLocation = function (gl) {
	            gl.bindAttribLocation(this.program, 0, "vPosition");
	            gl.bindAttribLocation(this.program, 1, "texcoord");
	            gl.bindAttribLocation(this.program, 2, "basePos");
	            gl.bindAttribLocation(this.program, 3, "speed");
	            var needRotation = this.paramAry[3];
	            if (needRotation) {
	                gl.bindAttribLocation(this.program, 4, "rotation");
	            }
	            var hasRandomClolr = this.paramAry[1];
	            if (hasRandomClolr) {
	                gl.bindAttribLocation(this.program, 5, "color");
	            }
	        };
	        Display3DBallShader.prototype.getVertexShaderString = function () {
	            var hasParticle = this.paramAry[0];
	            var hasRandomClolr = this.paramAry[1];
	            var isMul = this.paramAry[2];
	            var needRotation = this.paramAry[3];
	            var needScale = this.paramAry[4];
	            var needAddSpeed = this.paramAry[5];
	            var uvType = this.paramAry[6];
	            var defineBaseStr = "";
	            var funBaseStr = "";
	            var mainBaseStr = "";
	            var rotationStr = "";
	            defineBaseStr = "attribute vec4 vPosition;\n" +
	                "attribute vec3 texcoord;\n" +
	                "attribute vec4 basePos;\n" +
	                "attribute vec3 speed;\n" +
	                "uniform mat4 viewMatrix;\n" +
	                "uniform mat4 camMatrix;\n" +
	                "uniform mat4 modeMatrix;\n" +
	                "uniform mat4 rotMatrix;\n" +
	                "uniform vec4 vcmat50;\n" +
	                "uniform vec4 vcmat51;\n" +
	                "uniform vec4 vcmat52;\n" +
	                "uniform vec4 vcmat53;\n" +
	                "varying vec2 v0;\n" +
	                "varying vec2 v1;\n" +
	                "varying vec3 outvec3;\n";
	            funBaseStr = "vec4 IW(vec4 v) {\n" +
	                "return viewMatrix*camMatrix*modeMatrix* v;\n" +
	                "}\n" +
	                "float CTM() {\n" +
	                "float t = vcmat50.x- basePos.w;\n" +
	                "if (vcmat50.w > 0.0 && t >= 0.0) {\n" +
	                "t = fract(t /vcmat50.z) * vcmat50.z;\n" +
	                "}\n" +
	                "return t;\n" +
	                "}\n" +
	                "float STM(float ctime) {\n" +
	                "float t = ctime - vcmat51.w;\n" +
	                "t = max(t,0.0);\n" +
	                "return t;\n" +
	                "}\n" +
	                "vec4 S_POS(vec4 pos ,float stime) {\n" +
	                "float sf = vcmat51.x * stime;\n" +
	                "if (vcmat51.y != 0.0 && vcmat51.z != 0.0) {\n" +
	                "sf += sin(vcmat51.y * stime) * vcmat51.z;\n" +
	                "}\n" +
	                "sf=min(sf,vcmat52.z);\n" +
	                "sf=max(sf,vcmat52.w);\n" +
	                "vec2 sv2 = vec2(vcmat52.x * sf, vcmat52.y * sf);\n" +
	                "sv2 = sv2 + 1.0;\n" +
	                "pos.x *= sv2.x;\n" +
	                "pos.y *= sv2.y;\n" +
	                "return pos;\n" +
	                "}" +
	                "vec3 ADD_POS(vec3 speed ,float ctime) {\n" +
	                "vec3 addPos = speed * ctime;\n" +
	                "vec3 uspeed = vec3(0,0,0);\n" +
	                "if(vcmat50.y != 0.0 && length(speed) != 0.0) {\n" +
	                "uspeed = vec3(speed.x, speed.y, speed.z);\n" +
	                "uspeed = normalize(uspeed);\n" +
	                "uspeed = uspeed * vcmat50.y;\n" +
	                "uspeed.xyz = uspeed.xyz + vcmat53.xyz;\n" +
	                "} else {\n" +
	                "uspeed = vec3(vcmat53.x, vcmat53.y, vcmat53.z);\n" +
	                "}\n" +
	                "addPos.xyz = addPos.xyz + uspeed.xyz * ctime * ctime;\n" +
	                "return addPos;\n" +
	                "}\n";
	            if (needRotation > 0) {
	                defineBaseStr += "attribute vec2 rotation;\n";
	                rotationStr = "float angle = rotation.x + rotation.y * ctime;\n" +
	                    "vec4 np = vec4(sin(angle), cos(angle), 0, 0);\n" +
	                    "np.z = np.x * pos.y + np.y * pos.x;\n" +
	                    "np.w = np.y * pos.y - np.x * pos.x;\n" +
	                    "pos.xy = np.zw;\n";
	            }
	            var sceleStr = " "; //缩放比例
	            if (needScale) {
	                sceleStr = "pos = S_POS(pos,stime);\n"; //缩放比例
	            }
	            mainBaseStr = "vec4 pos = vec4(vPosition.xyz,1.0);\n" +
	                "float ctime = CTM();\n" +
	                "float stime = STM(ctime);\n" +
	                rotationStr +
	                "if (ctime < 0.0 || ctime > vcmat50.z) {\n" + //时间周期内-1；
	                "pos.x =0.0;\n" + //设置不可见
	                "pos.y =0.0;\n" + //设置不可见
	                "}else{\n" +
	                sceleStr + //缩放比例
	                "pos = rotMatrix*pos;\n" + //面向视角
	                "vec3 addPos =ADD_POS(speed,ctime);\n" + //加速度
	                "pos.xyz = pos.xyz + basePos.xyz + addPos.xyz;\n" +
	                "}\n" +
	                "gl_Position =IW(pos);\n" +
	                "v0=vec2(texcoord.xy);\n" +
	                "v1=vec2(ctime/vcmat50.z,0.0);\n";
	            var outStr = defineBaseStr + funBaseStr + "void main()\n" +
	                "{\n" +
	                mainBaseStr +
	                "}";
	            return outStr;
	        };
	        Display3DBallShader.prototype.getFragmentShaderString = function () {
	            var $str = "precision mediump float;\n" +
	                "uniform sampler2D fs0;\n" +
	                "uniform sampler2D fs1;\n" +
	                "uniform vec4 fc[1];\n" +
	                "varying vec2 v0;\n" +
	                "varying vec2 v1;\n" +
	                "void main(void){\n" +
	                "\n" +
	                "vec4 ft0 = texture2D(fs0,v0);\n" +
	                "ft0.xyz *= ft0.w;\n" +
	                "vec4 ft1 = texture2D(fs1,v1);\n" +
	                "ft1.xyz = ft1.xyz * ft1.w;\n" +
	                "vec4 ft2 = ft0 * fc[0];\n" +
	                "ft0 = ft2 * ft1;\n" +
	                "ft1.xyz = ft0.xyz;\n" +
	                "ft1.w = ft0.w;\n" +
	                "gl_FragColor = vec4(1,0,0,1);\n" +
	                "\n" +
	                "}";
	            return $str;
	        };
	        Display3DBallShader.Display3D_Ball_Shader = "Display3DBallShader";
	        return Display3DBallShader;
	    }(Pan3d.Shader3D));
	    Pan3d.Display3DBallShader = Display3DBallShader;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Display3DBallShader.js.map

/***/ }),
/* 96 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Display3DBallPartilce = /** @class */ (function (_super) {
	        __extends(Display3DBallPartilce, _super);
	        function Display3DBallPartilce(value) {
	            return _super.call(this, value) || this;
	            // this.scene3D.progrmaManager.registe(BallTestShader.BallTestShader,new BallTestShader(this.scene3D));
	            // this.shader=  this.scene3D.progrmaManager.getProgram(BallTestShader.BallTestShader);
	        }
	        Display3DBallPartilce.prototype.setVc = function () {
	            _super.prototype.setVc.call(this);
	            this.updateWatchCaramMatrix();
	            this.setViewCamModeMatr3d();
	            var ctx = this.scene3D.context3D;
	            ctx.setVcMatrix4fv(this.data.materialParam.shader, "rotMatrix", this._rotationMatrix.m);
	            var tm = this._time / Pan3d.Scene3D.frameTime * this.balldata._playSpeed;
	            var timeVec = this.balldata._timeVec;
	            timeVec.x = tm;
	            ctx.setVc4fv(this.data.materialParam.shader, "vcmat50", [timeVec.x, timeVec.y, timeVec.z, timeVec.w]);
	            var scaleVec = this.balldata._scaleVec;
	            ctx.setVc4fv(this.data.materialParam.shader, "vcmat51", [scaleVec.x, scaleVec.y, scaleVec.z, scaleVec.w]);
	            var scaleCtrl = this.balldata._scaleCtrlVec;
	            ctx.setVc4fv(this.data.materialParam.shader, "vcmat52", [scaleCtrl.x, scaleCtrl.y, scaleCtrl.z, scaleCtrl.w]);
	            var addSpeedVec = this.balldata._addSpeedVec;
	            ctx.setVc4fv(this.data.materialParam.shader, "vcmat53", [addSpeedVec.x, addSpeedVec.y, addSpeedVec.z, addSpeedVec.w]);
	        };
	        Object.defineProperty(Display3DBallPartilce.prototype, "balldata", {
	            get: function () {
	                return this.data;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Display3DBallPartilce.prototype.updateWatchCaramMatrix = function () {
	            this._rotationMatrix.identity();
	            if (this.balldata.facez) {
	                this._rotationMatrix.prependRotation(90, Pan3d.Vector3D.X_AXIS);
	            }
	            else if (this.balldata._is3Dlizi) {
	                this.timeline.inverAxisRotation(this._rotationMatrix);
	            }
	            else if (this.balldata._watchEye) {
	                this.timeline.inverAxisRotation(this._rotationMatrix);
	                this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationY, Pan3d.Vector3D.Y_AXIS);
	                this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationX, Pan3d.Vector3D.X_AXIS);
	            }
	        };
	        Display3DBallPartilce.prototype.setVa = function () {
	            var ctx = this.scene3D.context3D;
	            var tf = ctx.pushVa(this.data.objData.vertexBuffer);
	            if (!tf) {
	                ctx.setVaOffset(0, 3, this.data.objData.stride, 0);
	                ctx.setVaOffset(1, 3, this.data.objData.stride, 12);
	                ctx.setVaOffset(2, 4, this.data.objData.stride, 24);
	                ctx.setVaOffset(3, 3, this.data.objData.stride, 40);
	                if (this.balldata._needSelfRotation) {
	                    ctx.setVaOffset(4, 2, this.data.objData.stride, 52);
	                }
	            }
	            ctx.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
	        };
	        return Display3DBallPartilce;
	    }(Pan3d.Display3DParticle));
	    Pan3d.Display3DBallPartilce = Display3DBallPartilce;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Display3DBallPartilce.js.map

/***/ }),
/* 97 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ParticleLocusballData = /** @class */ (function (_super) {
	        __extends(ParticleLocusballData, _super);
	        function ParticleLocusballData() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        ParticleLocusballData.prototype.getParticle = function () {
	            return new Pan3d.Display3DLocusBallPartilce(this.scene3D);
	        };
	        ParticleLocusballData.prototype.initBasePos = function () {
	            var basePos = new Array;
	            for (var i = 0; i < this._totalNum; i++) {
	                var v3d;
	                var index = i * 3;
	                if (this._isRandom) {
	                    var roundv3d = new Pan3d.Vector3D(this._round.x * this._round.w, this._round.y * this._round.w, this._round.z * this._round.w);
	                    v3d = new Pan3d.Vector3D(this._posAry[index] + Math.random() * roundv3d.x, this._posAry[index + 1] + Math.random() * roundv3d.y, this._posAry[index + 2] + Math.random() * roundv3d.z);
	                }
	                else {
	                    v3d = new Pan3d.Vector3D(this._posAry[index], this._posAry[index + 1], this._posAry[index + 2]);
	                }
	                v3d = v3d.add(this._basePositon);
	                for (var j = 0; j < 4; j++) {
	                    basePos.push(v3d.x, v3d.y, v3d.z, i * this._shootSpeed);
	                }
	            }
	            this.objBallData.basePos = basePos;
	        };
	        ParticleLocusballData.prototype.initSpeed = function () {
	            var beMove = new Array;
	            for (var i = 0; i < this._totalNum; i++) {
	                var resultv3d = new Pan3d.Vector3D;
	                if (this._tangentSpeed == 0) {
	                    resultv3d.addByNum(this._angleAry[i * 3], this._angleAry[i * 3 + 1], this._angleAry[i * 3 + 2]);
	                }
	                else if (this._tangentSpeed == 2) {
	                    resultv3d.setTo(Math.random() * 2 - 1, Math.random() * 2 - 1, Math.random() * 2 - 1);
	                }
	                else {
	                    var v3d = new Pan3d.Vector3D(this._tangentAry[i * 3], this._tangentAry[i * 3 + 1], this._tangentAry[i * 3 + 2]);
	                    v3d.scaleBy(this._tangentSpeed);
	                    resultv3d = resultv3d.add(v3d);
	                }
	                resultv3d.normalize();
	                if (this._isSendRandom) {
	                    resultv3d.scaleBy(this._speed * Math.random());
	                }
	                else {
	                    resultv3d.scaleBy(this._speed);
	                }
	                //var ranAngle: Number = this._baseRandomAngle * Math.random() * Math.PI / 180;
	                for (var j = 0; j < 4; j++) {
	                    beMove.push(resultv3d.x, resultv3d.y, resultv3d.z);
	                }
	            }
	            this.objBallData.beMove = beMove;
	        };
	        ParticleLocusballData.prototype.setAllByteInfo = function ($byte) {
	            this._tangentSpeed = $byte.readFloat();
	            this._posAry = JSON.parse($byte.readUTF());
	            this._angleAry = JSON.parse($byte.readUTF());
	            this._tangentAry = JSON.parse($byte.readUTF());
	            _super.prototype.setAllByteInfo.call(this, $byte);
	            this.uploadGpu();
	        };
	        return ParticleLocusballData;
	    }(Pan3d.ParticleBallData));
	    Pan3d.ParticleLocusballData = ParticleLocusballData;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ParticleLocusballData.js.map

/***/ }),
/* 98 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Display3DLocusBallPartilce = /** @class */ (function (_super) {
	        __extends(Display3DLocusBallPartilce, _super);
	        function Display3DLocusBallPartilce() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        Display3DLocusBallPartilce.prototype.creatData = function () {
	            this.data = new Pan3d.ParticleLocusballData(this.scene3D);
	        };
	        return Display3DLocusBallPartilce;
	    }(Pan3d.Display3DBallPartilce));
	    Pan3d.Display3DLocusBallPartilce = Display3DLocusBallPartilce;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Display3DLocusBallPartilce.js.map

/***/ }),
/* 99 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SkillManager = /** @class */ (function (_super) {
	        __extends(SkillManager, _super);
	        function SkillManager(value) {
	            var _this = 
	            //this.dic = new Object();
	            _super.call(this, value) || this;
	            _this._time = 0;
	            _this._skillDic = new Object;
	            _this._loadDic = new Object;
	            _this._skillAry = new Array;
	            _this._preLoadDic = new Object;
	            return _this;
	        }
	        SkillManager.prototype.update = function () {
	            var _tempTime = Pan3d.TimeUtil.getTimer();
	            var t = _tempTime - this._time;
	            for (var i = 0; i < this._skillAry.length; i++) {
	                this._skillAry[i].update(t);
	            }
	            this._time = _tempTime;
	        };
	        SkillManager.prototype.preLoadSkill = function ($url) {
	            var _this = this;
	            if (this.dic[$url] || this._preLoadDic[$url]) {
	                return;
	            }
	            this.scene3D.resManager.loadSkillRes(this.scene3D.fileRoot + $url, function ($skillRes) {
	                var skillData = new Pan3d.SkillData(_this.scene3D);
	                skillData.data = $skillRes.data;
	                skillData.useNum++;
	                _this.dic[$url] = skillData;
	                _this.addSrc($url, skillData);
	            });
	            this._preLoadDic[$url] = true;
	        };
	        //public fengbaonum:number = 0;
	        SkillManager.prototype.getSkill = function ($url, $name, $callback) {
	            var _this = this;
	            if ($callback === void 0) { $callback = null; }
	            var skill;
	            var key = $url + $name;
	            // if(key == "skill/jichu_1_byte.txtm_skill_04"){
	            //     console.log("添加技能风暴");
	            //     this.fengbaonum++;
	            // }
	            var ary = this._skillDic[key];
	            if (ary) {
	                for (var i = 0; i < ary.length; i++) {
	                    skill = ary[i];
	                    if (skill.isDeath && skill.useNum == 0) {
	                        skill.reset();
	                        skill.isDeath = false;
	                        return skill;
	                    }
	                }
	            }
	            skill = new Pan3d.Skill(this.scene3D);
	            skill.name = $name;
	            skill.isDeath = false;
	            if (!this._skillDic[key]) {
	                this._skillDic[key] = new Array;
	            }
	            this._skillDic[key].push(skill);
	            if (this.dic[$url]) {
	                skill.setData(this.dic[$url].data[skill.name], this.dic[$url]);
	                skill.key = key;
	                this.dic[$url].useNum++;
	                return skill;
	            }
	            if (this._loadDic[$url]) {
	                var obj = new Object;
	                obj.name = $name;
	                obj.skill = skill;
	                obj.callback = $callback;
	                this._loadDic[$url].push(obj);
	                return skill;
	            }
	            this._loadDic[$url] = new Array;
	            var obj = new Object;
	            obj.name = $name;
	            obj.skill = skill;
	            obj.callback = $callback;
	            this._loadDic[$url].push(obj);
	            this.scene3D.resManager.loadSkillRes(this.scene3D.fileRoot + $url, function ($skillRes) {
	                _this.loadSkillCom($url, $skillRes);
	            });
	            return skill;
	        };
	        SkillManager.prototype.loadSkillCom = function ($url, $skillRes) {
	            var skillData = new Pan3d.SkillData(this.scene3D);
	            skillData.data = $skillRes.data;
	            for (var i = 0; i < this._loadDic[$url].length; i++) {
	                var obj = this._loadDic[$url][i];
	                if (!obj.skill.hasDestory) {
	                    obj.skill.setData(skillData.data[obj.name], skillData);
	                    obj.skill.key = $url + obj.name;
	                    skillData.useNum++;
	                }
	            }
	            this.dic[$url] = skillData;
	            this.addSrc($url, skillData);
	            for (var i = 0; i < this._loadDic[$url].length; i++) {
	                var obj = this._loadDic[$url][i];
	                if (obj.callback) {
	                    obj.callback();
	                }
	            }
	            this._loadDic[$url].length = 0;
	            this._loadDic[$url] = null;
	        };
	        SkillManager.prototype.addSrc = function ($url, skillData) {
	            for (var key in skillData.data) {
	                var skill = new Pan3d.Skill(this.scene3D);
	                skill.name = key;
	                skill.isDeath = true;
	                skill.src = true;
	                skill.setData(skillData.data[key], skillData);
	                skillData.addSrcSkill(skill);
	                //skillData.useNum++;
	                var dkey = $url + key;
	                if (!this._skillDic[dkey]) {
	                    this._skillDic[dkey] = new Array;
	                }
	                this._skillDic[dkey].push(skill);
	            }
	        };
	        SkillManager.prototype.playSkill = function ($skill) {
	            this._skillAry.push($skill);
	            $skill.play();
	        };
	        SkillManager.prototype.removeSkill = function ($skill) {
	            var index = this._skillAry.indexOf($skill);
	            if (index != -1) {
	                this._skillAry.splice(index, 1);
	            }
	        };
	        SkillManager.prototype.gcSkill = function (skill) {
	            for (var key in this._skillDic) {
	                var ary = this._skillDic[key];
	                var idx = ary.indexOf(skill);
	                if (idx != -1) {
	                    ary.splice(idx, 1);
	                }
	            }
	        };
	        SkillManager.prototype.gc = function () {
	            //super.gc();
	            for (var key in this.dic) {
	                var rc = this.dic[key];
	                if (rc.useNum <= 0) {
	                    rc.idleTime++;
	                    if (rc.idleTime >= Pan3d.ResCount.GCTime && rc.testDestory()) {
	                        //console.log("清理 -" + key);
	                        rc.destory();
	                        delete this.dic[key];
	                    }
	                }
	            }
	            for (var key in this._skillDic) {
	                var ary = this._skillDic[key];
	                for (var i = ary.length - 1; i >= 0; i--) {
	                    if (ary[i].isDeath && ary[i].useNum <= 0) {
	                        ary[i].idleTime++;
	                        if (ary[i].idleTime >= Pan3d.ResCount.GCTime) {
	                            if (!ary[i].src) {
	                                ary[i].destory();
	                                ary.splice(i, 1);
	                            }
	                        }
	                    }
	                }
	                if (ary.length == 0) {
	                    //console.log("清理 -" + key);
	                    delete this._skillDic[key];
	                }
	            }
	        };
	        return SkillManager;
	    }(Pan3d.ResGC));
	    Pan3d.SkillManager = SkillManager;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillManager.js.map

/***/ }),
/* 100 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Skill = /** @class */ (function (_super) {
	        __extends(Skill, _super);
	        function Skill(value) {
	            var _this = _super.call(this, value) || this;
	            _this.isDeath = true;
	            _this.src = false;
	            _this.time = 0;
	            _this.targetFlag = 0;
	            _this.targetShockFlag = 0;
	            _this.needSound = false;
	            _this.hasDestory = false;
	            _this.actionEnd = false;
	            return _this;
	        }
	        Skill.prototype.setData = function ($data, $skillData) {
	            if (this.hasDestory) {
	                return;
	            }
	            this.skillVo = new Pan3d.SkillVo();
	            this.skillVo.setData($data);
	            this.setKeyAry();
	            this.trajectoryAry = new Array;
	            this._skillData = $skillData;
	        };
	        Skill.prototype.getBloodTime = function () {
	            if (this.skillVo) {
	                return this.skillVo.bloodTime;
	            }
	            else {
	                return Pan3d.SkillVo.defaultBloodTime;
	            }
	        };
	        Skill.prototype.play = function () {
	            if (!this.skillVo) {
	                this.skillComplete();
	                return;
	            }
	            if (this.active && this.active instanceof Pan3d.Display3dMovie) {
	                var $movie3d = this.active;
	                $movie3d.play(this.skillVo.action, this.actionEnd ? 1 : 2, false);
	            }
	        };
	        Skill.prototype.setKeyAry = function () {
	            var _this = this;
	            this.keyAry = new Array;
	            if (this.skillVo.types == Pan3d.SkillType.FixEffect) {
	                for (var i = 0; i < this.skillVo.keyAry.length; i++) {
	                    var keySkill = new Pan3d.SkillFixEffect(this.scene3D);
	                    keySkill.setInfo(this.skillVo.keyAry[i]);
	                    keySkill.removeCallFun = function ($key) { _this.removeKey($key); };
	                    keySkill.active = this.active;
	                    this.keyAry.push(keySkill);
	                }
	            }
	            else if (this.skillVo.types == Pan3d.SkillType.TrajectoryDynamicTarget || this.skillVo.types == Pan3d.SkillType.TrajectoryDynamicPoint) {
	                for (var i = 0; i < this.skillVo.keyAry.length; i++) {
	                    var trajectory;
	                    var tkv = (this.skillVo.keyAry[i]);
	                    if (tkv.multype == 1) {
	                        trajectory = new Pan3d.SkillMulTrajectory(this.scene3D);
	                    }
	                    else {
	                        trajectory = new Pan3d.SkillTrajectory(this.scene3D);
	                    }
	                    trajectory.setInfo(this.skillVo.keyAry[i]);
	                    this.keyAry.push(trajectory);
	                }
	            }
	        };
	        Skill.prototype.setendParticleRoation = function ($vect3d) {
	            for (var i = 0; this.keyAry && i < this.keyAry.length; i++) {
	                if (this.keyAry[i] instanceof Pan3d.SkillTrajectory) {
	                    if (this.keyAry[i].endParticle) {
	                        this.keyAry[i].endParticle.rotationX = $vect3d.x;
	                        this.keyAry[i].endParticle.rotationY = $vect3d.y;
	                        this.keyAry[i].endParticle.rotationZ = $vect3d.z;
	                    }
	                }
	            }
	        };
	        Skill.prototype.removeKey = function ($key) {
	            this.completeNum++;
	            if (this.completeNum == this.keyAry.length) {
	                //    //console.log("播放结束");
	                this.skillComplete();
	            }
	        };
	        /**强制移除技能 */
	        Skill.prototype.removeSkillForce = function () {
	            // if(this.key == "skill/jichu_1_byte.txtm_skill_04"){
	            //     SkillManager.getInstance().fengbaonum--;
	            //     console.log("移除技能风暴 " + SkillManager.getInstance().fengbaonum);
	            // }        
	            if (this.keyAry) {
	                for (var i = 0; i < this.keyAry.length; i++) {
	                    this.keyAry[i].reset();
	                }
	            }
	            this.skillComplete();
	            this.reset();
	        };
	        Skill.prototype.skillComplete = function () {
	            this.scene3D.skillManager.removeSkill(this);
	            this.isDeath = true;
	            if (this.completeFun) {
	                this.completeFun();
	            }
	            this.idleTime = 0;
	        };
	        Skill.prototype.reset = function () {
	            this.time = 0;
	            this.completeNum = 0;
	            this.active = null;
	            this.completeFun = null;
	            this.targetFlag = 0;
	            this.targetShockFlag = 0;
	            this.soundPlay = false;
	            this.needSound = false;
	        };
	        Skill.prototype.update = function (t) {
	            this.time += t;
	            if (this.time > Skill.MaxTime) {
	                //console.log("超时结束");
	                this.skillComplete();
	            }
	            this.getKeyTarget();
	            this.getShockTarget();
	            this.updateTrajector(t);
	        };
	        Skill.prototype.updateTrajector = function (t) {
	            for (var i = 0; i < this.trajectoryAry.length; i++) {
	                this.trajectoryAry[i].update(t);
	            }
	        };
	        Skill.prototype.getKeyTarget = function () {
	            if (!this.keyAry) {
	                return;
	            }
	            for (var i = this.targetFlag; i < this.keyAry.length; i++) {
	                if (this.keyAry[i].time < this.time) {
	                    this.keyAry[i].addToRender();
	                    if (this.skillVo.types == Pan3d.SkillType.TrajectoryDynamicTarget || this.skillVo.types == Pan3d.SkillType.TrajectoryDynamicPoint) {
	                        var ss = this.keyAry[i];
	                        this.trajectoryAry.push(ss);
	                    }
	                    i++;
	                    this.targetFlag = i;
	                }
	                else {
	                    break;
	                }
	            }
	            this.getSound();
	        };
	        Skill.prototype.getShockTarget = function () {
	            if (!this.skillVo.shockAry || !this.needSound) {
	                return;
	            }
	            for (var i = this.targetShockFlag; i < this.skillVo.shockAry.length; i++) {
	                if (this.skillVo.shockAry[i].time < this.time) {
	                    //震动
	                    // ShockUtil.getInstance().shock(this.skillVo.shockAry[i].lasttime, this.skillVo.shockAry[i].amp);
	                    i++;
	                    this.targetShockFlag = i;
	                }
	                else {
	                    break;
	                }
	            }
	            //this.getSound();
	        };
	        Skill.prototype.getSound = function () {
	            if (!this.skillVo.sound || this.soundPlay || !this.needSound) {
	                return;
	            }
	            if (this.skillVo.sound.frame < this.time) {
	                // SoundManager.getInstance().playSkillSound(this.skillVo.sound.url);
	                this.soundPlay = true;
	            }
	        };
	        Skill.prototype.configFixEffect = function ($active, $completeFun, $posObj) {
	            if ($completeFun === void 0) { $completeFun = null; }
	            if ($posObj === void 0) { $posObj = null; }
	            this.active = $active;
	            this.completeFun = $completeFun;
	            if (!this.keyAry) {
	                return;
	            }
	            for (var i = 0; i < this.keyAry.length; i++) {
	                if (this.skillVo.types != Pan3d.SkillType.FixEffect) {
	                    continue;
	                }
	                var skillFixEffect = this.keyAry[i];
	                skillFixEffect.active = $active;
	                if ($posObj && $posObj.length) {
	                    if (i > ($posObj.length - 1)) {
	                        skillFixEffect.outPos = $posObj[$posObj.length - 1];
	                    }
	                    else {
	                        skillFixEffect.outPos = $posObj[i];
	                    }
	                }
	                else {
	                    skillFixEffect.outPos = null;
	                }
	            }
	        };
	        Skill.prototype.configTrajectory = function ($active, $target, $completeFun, types, $bloodFun) {
	            var _this = this;
	            if ($completeFun === void 0) { $completeFun = null; }
	            if (types === void 0) { types = 0; }
	            if ($bloodFun === void 0) { $bloodFun = null; }
	            this.active = $active;
	            this.completeFun = $completeFun;
	            this.completeNum = 0;
	            if (!this.keyAry) {
	                return;
	            }
	            for (var i = 0; i < this.keyAry.length; i++) {
	                if (!(this.skillVo.types == Pan3d.SkillType.TrajectoryDynamicTarget || this.skillVo.types == Pan3d.SkillType.TrajectoryDynamicPoint)) {
	                    continue;
	                }
	                var skillTrajector = this.keyAry[i];
	                skillTrajector.setPlayData($active, $target, function ($skilltra) { _this.removeTrajectory($skilltra); }, types, (i == 0 ? $bloodFun : null));
	            }
	        };
	        Skill.prototype.configMulTrajectory = function ($activeList, $active, $target, $completeFun) {
	            var _this = this;
	            if ($completeFun === void 0) { $completeFun = null; }
	            this.active = $active;
	            this.completeFun = $completeFun;
	            this.completeNum = 0;
	            if (!this.keyAry) {
	                return;
	            }
	            for (var i = 0; i < this.keyAry.length; i++) {
	                if (this.skillVo.types != Pan3d.SkillType.TrajectoryDynamicTarget) {
	                    continue;
	                }
	                var skillTrajector = this.keyAry[i];
	                skillTrajector.setMulPlayData($activeList, $target, function ($skilltra) { _this.removeTrajectory($skilltra); }, 2);
	            }
	        };
	        Skill.prototype.removeTrajectory = function ($skilltra) {
	            var index = this.trajectoryAry.indexOf($skilltra);
	            if (index != -1) {
	                this.trajectoryAry.splice(index, 1);
	            }
	            this.completeNum++;
	            if (this.completeNum == this.keyAry.length) {
	                // //console.log("播放结束");
	                this.skillComplete();
	            }
	        };
	        Skill.prototype.destory = function () {
	            this.skillVo = null;
	            this.name = null;
	            if (this.keyAry) {
	                for (var i = 0; i < this.keyAry.length; i++) {
	                    this.keyAry[i].destory();
	                }
	                this.keyAry.length = 0;
	                this.keyAry = null;
	            }
	            this.active = null;
	            this.completeFun = null;
	            if (this.trajectoryAry) {
	                for (var i = 0; i < this.trajectoryAry.length; i++) {
	                    this.trajectoryAry[i].destory();
	                }
	                this.trajectoryAry.length = 0;
	                this.trajectoryAry = null;
	            }
	            if (this._skillData) {
	                // this._skillData.useNum--;
	            }
	            this._skillData = null;
	            this.hasDestory = true;
	        };
	        Skill.MaxTime = 1000 * 5;
	        return Skill;
	    }(Pan3d.ResCount));
	    Pan3d.Skill = Skill;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Skill.js.map

/***/ }),
/* 101 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SkillData = /** @class */ (function (_super) {
	        __extends(SkillData, _super);
	        function SkillData() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this.srcList = new Array();
	            return _this;
	        }
	        SkillData.prototype.addSrcSkill = function ($skill) {
	            this.srcList.push($skill);
	        };
	        SkillData.prototype.destory = function () {
	            for (var i = 0; i < this.srcList.length; i++) {
	                this.srcList[i].destory();
	                this.scene3D.skillManager.gcSkill(this.srcList[i]);
	            }
	        };
	        SkillData.prototype.testDestory = function () {
	            for (var i = 0; i < this.srcList.length; i++) {
	                if (!(this.srcList[i].isDeath && this.srcList[i].idleTime >= Pan3d.ResCount.GCTime)) {
	                    return false;
	                }
	            }
	            return true;
	        };
	        return SkillData;
	    }(Pan3d.ResCount));
	    Pan3d.SkillData = SkillData;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillData.js.map

/***/ }),
/* 102 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var SkillType = /** @class */ (function () {
	        function SkillType() {
	        }
	        SkillType.TrajectoryDynamicTarget = 1;
	        SkillType.FixEffect = 4;
	        SkillType.TrajectoryDynamicPoint = 3;
	        return SkillType;
	    }());
	    Pan3d.SkillType = SkillType;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillType.js.map

/***/ }),
/* 103 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var SkillVo = /** @class */ (function () {
	        function SkillVo() {
	        }
	        SkillVo.prototype.setData = function ($info) {
	            this.keyAry = new Array;
	            if (!$info) {
	                //console.log("技能有错")
	            }
	            this.action = $info.action;
	            this.skillname = $info.skillname;
	            this.bloodTime = $info.blood;
	            this.types = $info.type;
	            if (this.types == Pan3d.SkillType.FixEffect) {
	                this.keyAry = this.getFixEffect($info.data);
	            }
	            else if (this.types == Pan3d.SkillType.TrajectoryDynamicTarget || this.types == Pan3d.SkillType.TrajectoryDynamicPoint) {
	                this.keyAry = this.getTrajectoryDynamicTarget($info.data);
	            }
	            if ($info.sound) {
	                this.sound = new Pan3d.SkillKeyVo;
	                this.sound.frame = $info.sound.time * Pan3d.Scene3D.frameTime;
	                this.sound.url = $info.sound.name;
	            }
	            if ($info.shock) {
	                this.shockAry = this.getShockAry($info.shock);
	            }
	        };
	        SkillVo.prototype.getShockAry = function ($ary) {
	            var keyAry = new Array;
	            for (var i = 0; i < $ary.length; i++) {
	                var key = new Pan3d.SkillShockVo();
	                key.setData($ary[i]);
	                keyAry.push(key);
	            }
	            return keyAry;
	        };
	        SkillVo.prototype.getFixEffect = function ($ary) {
	            var keyAry = new Array;
	            for (var i = 0; i < $ary.length; i++) {
	                var key = new Pan3d.SkillFixEffectKeyVo();
	                key.setData($ary[i]);
	                keyAry.push(key);
	            }
	            return keyAry;
	        };
	        SkillVo.prototype.getTrajectoryDynamicTarget = function ($ary) {
	            var keyAry = new Array;
	            for (var i = 0; i < $ary.length; i++) {
	                var key = new Pan3d.SkillTrajectoryTargetKeyVo();
	                key.setData($ary[i]);
	                keyAry.push(key);
	            }
	            return keyAry;
	        };
	        SkillVo.defaultBloodTime = 250;
	        return SkillVo;
	    }());
	    Pan3d.SkillVo = SkillVo;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillVo.js.map

/***/ }),
/* 104 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var SkillKeyVo = /** @class */ (function () {
	        function SkillKeyVo() {
	            this.frame = 0;
	        }
	        SkillKeyVo.prototype.setData = function ($data) {
	            this.frame = $data.frame;
	            this.url = $data.url;
	        };
	        return SkillKeyVo;
	    }());
	    Pan3d.SkillKeyVo = SkillKeyVo;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillKeyVo.js.map

/***/ }),
/* 105 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SkillFixEffectKeyVo = /** @class */ (function (_super) {
	        __extends(SkillFixEffectKeyVo, _super);
	        function SkillFixEffectKeyVo() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        SkillFixEffectKeyVo.prototype.setData = function ($data) {
	            _super.prototype.setData.call(this, $data);
	            this.hasSocket = $data.hasSocket;
	            if (this.hasSocket) {
	                this.socket = $data.socket;
	            }
	            else {
	                this.pos = new Pan3d.Vector3D($data.pos.x, $data.pos.y, $data.pos.z);
	                this.rotation = new Pan3d.Vector3D($data.rotation.x, $data.rotation.y, $data.rotation.z);
	            }
	        };
	        return SkillFixEffectKeyVo;
	    }(Pan3d.SkillKeyVo));
	    Pan3d.SkillFixEffectKeyVo = SkillFixEffectKeyVo;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillFixEffectKeyVo.js.map

/***/ }),
/* 106 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SkillTrajectoryTargetKeyVo = /** @class */ (function (_super) {
	        __extends(SkillTrajectoryTargetKeyVo, _super);
	        function SkillTrajectoryTargetKeyVo() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        SkillTrajectoryTargetKeyVo.prototype.setData = function ($data) {
	            _super.prototype.setData.call(this, $data);
	            this.beginType = $data.beginType;
	            if (this.beginType == 0) {
	                this.beginPos = new Pan3d.Vector3D($data.beginPos.x, $data.beginPos.y, $data.beginPos.z);
	            }
	            else if (this.beginType == 1) {
	                this.beginSocket = $data.beginSocket;
	            }
	            this.speed = $data.speed;
	            if ($data.hitSocket) {
	                this.hitSocket = $data.hitSocket;
	            }
	            if ($data.endParticle) {
	                this.endParticleUrl = $data.endParticle;
	            }
	            this.multype = $data.multype;
	        };
	        return SkillTrajectoryTargetKeyVo;
	    }(Pan3d.SkillKeyVo));
	    Pan3d.SkillTrajectoryTargetKeyVo = SkillTrajectoryTargetKeyVo;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillTrajectoryTargetKeyVo.js.map

/***/ }),
/* 107 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var SkillKey = /** @class */ (function () {
	        function SkillKey(value) {
	            this.time = 0;
	            this.scene3D = value;
	        }
	        SkillKey.prototype.addToRender = function () {
	            if (!this.particle) {
	                return;
	            }
	            this.particle.reset();
	            this.particle.sceneVisible = true;
	            this.scene3D.particleManager.addParticle(this.particle);
	        };
	        SkillKey.prototype.setInfo = function (obj) {
	            this.time = obj.frame * Pan3d.Scene3D.frameTime;
	            this.particle = this.scene3D.particleManager.getParticleByte(this.scene3D.fileRoot + obj.url);
	        };
	        SkillKey.prototype.reset = function () {
	            //this.time = 0;
	            this.particle.reset();
	            this.scene3D.particleManager.removeParticle(this.particle);
	        };
	        SkillKey.prototype.destory = function () {
	            // this.particle.destory();
	            this.particle = null;
	            this.removeCallFun = null;
	        };
	        return SkillKey;
	    }());
	    Pan3d.SkillKey = SkillKey;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillKey.js.map

/***/ }),
/* 108 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SkillEffect = /** @class */ (function (_super) {
	        __extends(SkillEffect, _super);
	        function SkillEffect() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        SkillEffect.prototype.addToRender = function () {
	            _super.prototype.addToRender.call(this);
	            this.particle.addEventListener(Pan3d.BaseEvent.COMPLETE, this.onPlayCom, this);
	        };
	        SkillEffect.prototype.onPlayCom = function (event) {
	            if (event === void 0) { event = null; }
	            this.particle.removeEventListener(Pan3d.BaseEvent.COMPLETE, this.onPlayCom, this);
	            this.scene3D.particleManager.removeParticle(this.particle);
	            this.removeCallFun(this);
	        };
	        return SkillEffect;
	    }(Pan3d.SkillKey));
	    Pan3d.SkillEffect = SkillEffect;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillEffect.js.map

/***/ }),
/* 109 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SkillBugBind = /** @class */ (function () {
	        function SkillBugBind() {
	        }
	        SkillBugBind.prototype.getSocket = function (socketName, resultMatrix) {
	            this.bindMatrix.clone(resultMatrix);
	        };
	        SkillBugBind.prototype.getSunType = function () {
	            return 1;
	        };
	        return SkillBugBind;
	    }());
	    Pan3d.SkillBugBind = SkillBugBind;
	    var SkillFixEffect = /** @class */ (function (_super) {
	        __extends(SkillFixEffect, _super);
	        function SkillFixEffect() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        SkillFixEffect.prototype.setInfo = function (obj) {
	            _super.prototype.setInfo.call(this, obj);
	            var data = obj;
	            this.pos = data.pos;
	            this.rotation = data.rotation;
	            this.hasSocket = data.hasSocket;
	            this.socket = data.socket;
	        };
	        SkillFixEffect.prototype.addToRender = function () {
	            _super.prototype.addToRender.call(this);
	            if (this.outPos) {
	                this.particle.x = this.outPos.x;
	                this.particle.y = this.outPos.y;
	                this.particle.z = this.outPos.z;
	                this.particle.rotationX = this.rotation.x;
	                this.particle.rotationY = this.rotation.y + this.active.rotationY;
	                this.particle.rotationZ = this.rotation.z;
	                this.particle.bindTarget = null;
	            }
	            else if (this.hasSocket) {
	                var targetActive = this.active;
	                this.particle.bindTarget = (targetActive);
	                this.particle.bindSocket = this.socket;
	            }
	            else {
	                var ma = new Pan3d.Matrix3D;
	                ma.appendRotation(this.active.rotationY, Pan3d.Vector3D.Y_AXIS);
	                var v3d = ma.transformVector(this.pos);
	                v3d.x += this.active.x;
	                v3d.y += this.active.y;
	                v3d.z += this.active.z;
	                /* //原来小刘写的方法，在有编辑器中因为角色角度为0,当游戏场景时就会有错。
	                this.particle.x = v3d.x;
	                this.particle.y = v3d.y;
	                this.particle.z = v3d.z;

	                this.particle.rotationX = this.rotation.x;
	                this.particle.rotationY = this.rotation.y +this.active.rotationY
	                this.particle.rotationZ = this.rotation.z;

	                */
	                // 当绑定对象有三个轴变化时有异常，需
	                var $SkillBugBind = new SkillBugBind();
	                $SkillBugBind.bindMatrix = new Pan3d.Matrix3D;
	                $SkillBugBind.bindMatrix.appendRotation(this.rotation.x, Pan3d.Vector3D.X_AXIS);
	                $SkillBugBind.bindMatrix.appendRotation(this.rotation.y, Pan3d.Vector3D.Y_AXIS);
	                $SkillBugBind.bindMatrix.appendRotation(this.rotation.z, Pan3d.Vector3D.Z_AXIS);
	                $SkillBugBind.bindMatrix.appendRotation(this.active.rotationY, Pan3d.Vector3D.Y_AXIS);
	                $SkillBugBind.bindMatrix.appendTranslation(v3d.x, v3d.y, v3d.z);
	                this.particle.bindTarget = $SkillBugBind;
	            }
	        };
	        return SkillFixEffect;
	    }(Pan3d.SkillEffect));
	    Pan3d.SkillFixEffect = SkillFixEffect;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillFixEffect.js.map

/***/ }),
/* 110 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SkillTrajectory = /** @class */ (function (_super) {
	        __extends(SkillTrajectory, _super);
	        function SkillTrajectory() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this._currentPos = new Pan3d.Vector3D;
	            _this.rotationMatrix = new Pan3d.Matrix3D;
	            _this._socketMaxrix = new Pan3d.Matrix3D;
	            _this._currentTargetPos = new Pan3d.Vector3D;
	            return _this;
	        }
	        SkillTrajectory.prototype.update = function (t) {
	            this.path.update(t);
	        };
	        SkillTrajectory.prototype.reset = function () {
	            _super.prototype.reset.call(this);
	            //if(false){ 
	            if (this.endParticle) {
	                this.scene3D.particleManager.addParticle(this.endParticle);
	                this.endParticle.reset();
	                this.endParticle.setPos(this._currentTargetPos.x, this._currentTargetPos.y, this._currentTargetPos.z);
	            }
	            if (this.removeCallFun) {
	                this.removeCallFun(this);
	            }
	        };
	        SkillTrajectory.prototype.endPlayFun = function (e) {
	            if (e === void 0) { e = null; }
	            this.scene3D.particleManager.removeParticle(this.endParticle);
	            this.endParticle.removeEventListener(Pan3d.BaseEvent.COMPLETE, this.endPlayFun, this);
	        };
	        SkillTrajectory.prototype.setCurrentPos = function () {
	            if (this.data.hitSocket) {
	                var targetMovie = (this.target);
	                if (targetMovie) {
	                    targetMovie.getSocket(this.data.hitSocket, this._socketMaxrix);
	                    this._currentTargetPos.setTo(this._socketMaxrix.position.x, this._socketMaxrix.position.y, this._socketMaxrix.position.z);
	                }
	                else {
	                    //console.log("需要处理,特殊没有指定对象")
	                }
	                return true;
	            }
	            else {
	                if (this._currentTargetPos.x == this.target.x && this._currentTargetPos.y == this.target.y && this._currentTargetPos.z == this.target.z) {
	                    return false;
	                }
	                else {
	                    this._currentTargetPos.setTo(this.target.x, this.target.y, this.target.z);
	                    return true;
	                }
	            }
	        };
	        SkillTrajectory.prototype.addToRender = function () {
	            _super.prototype.addToRender.call(this);
	            var beginPos;
	            if (this.data.beginType == 0) {
	                var ma = new Pan3d.Matrix3D;
	                ma.appendRotation(this.active.rotationY, Pan3d.Vector3D.Y_AXIS);
	                beginPos = ma.transformVector(this.data.beginPos);
	                this._currentPos.setTo(this.active.x + beginPos.x, this.active.y + beginPos.y, this.active.z + beginPos.z);
	            }
	            else if (this.data.beginType == 1) {
	                var tempMa = new Pan3d.Matrix3D;
	                var bindActive = (this.active);
	                bindActive.getSocket(this.data.beginSocket, tempMa);
	                beginPos = tempMa.position;
	                this._currentPos.setTo(beginPos.x, beginPos.y, beginPos.z);
	            }
	            this.particle.setPos(this._currentPos.x, this._currentPos.y, this._currentPos.z);
	            this.path.add();
	        };
	        SkillTrajectory.prototype.getSocket = function (socketName, resultMatrix) {
	            resultMatrix.identity();
	            resultMatrix.append(this.rotationMatrix);
	            resultMatrix.appendTranslation(this._currentPos.x, this._currentPos.y, this._currentPos.z);
	        };
	        SkillTrajectory.prototype.getSunType = function () {
	            return 0;
	        };
	        SkillTrajectory.prototype.setInfo = function (obj) {
	            _super.prototype.setInfo.call(this, obj);
	            this.particle.bindTarget = this;
	            this.data = obj;
	            //this.path.speed = this.data.speed;
	            if (this.data.endParticleUrl) {
	                this.endParticle = this.scene3D.particleManager.getParticleByte(this.scene3D.fileRoot + this.data.endParticleUrl);
	                this.endParticle.addEventListener(Pan3d.BaseEvent.COMPLETE, this.endPlayFun, this);
	            }
	        };
	        SkillTrajectory.prototype.setPlayData = function ($active, $target, $removeCallFun, types, $bloodFun) {
	            var _this = this;
	            if (types === void 0) { types = 0; }
	            if ($bloodFun === void 0) { $bloodFun = null; }
	            this.active = $active;
	            this.target = $target;
	            this.removeCallFun = $removeCallFun;
	            this._currentPos.setTo(0, 0, 0);
	            this.rotationMatrix.identity();
	            this._socketMaxrix.identity();
	            this._currentTargetPos.setTo(0, 0, 0);
	            if (!this.path) {
	                this.path = Pan3d.PathManager.getNewPath(2);
	                this.path.setData(this, function () { _this.reset(); }, this._currentPos, this.rotationMatrix, this._currentTargetPos, $bloodFun);
	                this.path.speed = this.data.speed;
	            }
	            this.path.reset();
	        };
	        SkillTrajectory.prototype.destory = function () {
	            _super.prototype.destory.call(this);
	            this.active = null;
	            this.target = null;
	            this.data = null;
	            this._currentPos = null;
	            this.rotationMatrix = null;
	            this._socketMaxrix = null;
	            this._currentTargetPos = null;
	            this.path = null;
	        };
	        return SkillTrajectory;
	    }(Pan3d.SkillKey));
	    Pan3d.SkillTrajectory = SkillTrajectory;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillTrajectory.js.map

/***/ }),
/* 111 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SkillMulTrajectory = /** @class */ (function (_super) {
	        __extends(SkillMulTrajectory, _super);
	        function SkillMulTrajectory() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        SkillMulTrajectory.prototype.update = function (t) {
	            this.pathMul.update(t);
	        };
	        SkillMulTrajectory.prototype.getSunType = function () {
	            return 1;
	        };
	        SkillMulTrajectory.prototype.addToRender = function () {
	            if (!this.particle) {
	                return;
	            }
	            this.particle.reset();
	            this.scene3D.particleManager.addParticle(this.particle);
	            if (!this.currentPosList) {
	                this.currentPosList = new Array;
	                for (var i = 0; i < this.activeList.length; i++) {
	                    this.currentPosList.push(new Pan3d.Vector3D(this.activeList[i].x, this.activeList[i].y + 10, this.activeList[i].z + 5));
	                }
	                this.pathMul.setInitCurrentPos(this.currentPosList);
	            }
	            else {
	                for (var i = 0; i < this.activeList.length; i++) {
	                    this.currentPosList[i].setTo(this.activeList[i].x, this.activeList[i].y + 10, this.activeList[i].z + 5);
	                    this.currentPosList[i].w = 0;
	                }
	            }
	            //this.particle.setMulPos(this.currentPosList);
	            this.pathMul.add();
	            this.particle.setMulPos(this.pathMul.resultAry);
	        };
	        SkillMulTrajectory.prototype.setMulPlayData = function ($activeList, $target, $removeCallFun, types) {
	            var _this = this;
	            if (types === void 0) { types = 0; }
	            this.activeList = $activeList;
	            this.active = this.activeList[0];
	            this.target = $target;
	            this.removeCallFun = $removeCallFun;
	            this._currentPos.setTo(0, 0, 0);
	            this.rotationMatrix.identity();
	            this._socketMaxrix.identity();
	            this._currentTargetPos.setTo(0, 0, 0);
	            if (!this.pathMul) {
	                this.pathMul = Pan3d.PathManager.getNewPath(types);
	                this.pathMul.setData(this, function () { _this.reset(); }, this._currentPos, this.rotationMatrix, this._currentTargetPos);
	                this.pathMul.speed = this.data.speed;
	            }
	            this.pathMul.reset();
	        };
	        SkillMulTrajectory.prototype.getMulSocket = function (ary) {
	            if (ary) {
	                this.pathMul.applyData(ary);
	            }
	        };
	        return SkillMulTrajectory;
	    }(Pan3d.SkillTrajectory));
	    Pan3d.SkillMulTrajectory = SkillMulTrajectory;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillMulTrajectory.js.map

/***/ }),
/* 112 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var SkillPath = /** @class */ (function () {
	        function SkillPath() {
	            /**
	            * 当前方向
	            */
	            this._currentDirect = new Pan3d.Vector3D;
	        }
	        SkillPath.prototype.update = function (t) {
	            this.time = t;
	            if (this.hasReached) {
	                this.endTime += t;
	                if (this.endTime > 200) {
	                    this.applyArrive();
	                }
	                return;
	            }
	            if (this.skillTrajectory.setCurrentPos()) {
	                this._currentDirect.x = this.currentTargetPos.x - this.currentPos.x;
	                this._currentDirect.y = this.currentTargetPos.y - this.currentPos.y;
	                this._currentDirect.z = this.currentTargetPos.z - this.currentPos.z;
	                this._currentDirect.normalize();
	                this._currentDirect.scaleBy(this.speed);
	                this.setRotationMatrix(this.currentTargetPos.subtract(this.currentPos));
	                if (this._currentDirect.length == 0) {
	                    this.arrive();
	                    return;
	                }
	            }
	            var currentDistance = this._currentDirect.length * this.time;
	            if (!this.hasReached) {
	                var targetDistance = Pan3d.Vector3D.distance(this.currentPos, this.currentTargetPos);
	                this.currentPos.x += this._currentDirect.x * this.time;
	                this.currentPos.y += this._currentDirect.y * this.time;
	                this.currentPos.z += this._currentDirect.z * this.time;
	            }
	            if (currentDistance > targetDistance) {
	                this.arrive();
	            }
	            //this.distance += currentDistance;
	        };
	        SkillPath.prototype.setRotationMatrix = function ($newPos) {
	            $newPos.normalize();
	            var base = new Pan3d.Vector3D(0, 0, 1);
	            var axis = base.cross($newPos);
	            axis.normalize();
	            var angle = Math.acos($newPos.dot(base));
	            var qu = new Pan3d.Quaternion();
	            qu.fromAxisAngle(axis, angle);
	            qu.toMatrix3D(this.rotationMatrix);
	        };
	        SkillPath.prototype.arrive = function () {
	            this.hasReached = true;
	        };
	        SkillPath.prototype.applyArrive = function () {
	            this.endFun();
	            if (this.bloodFun) {
	                this.bloodFun();
	            }
	        };
	        SkillPath.prototype.reset = function () {
	            this.hasReached = false;
	            this._currentDirect.setTo(0, 0, 0);
	            this.endTime = 0;
	        };
	        SkillPath.prototype.add = function () {
	        };
	        SkillPath.prototype.setData = function ($skillTrajectory, $endFun, $currentPos, $rotationMatrix, $currentTargetPos, $bloodFun) {
	            this.skillTrajectory = $skillTrajectory;
	            this.currentPos = $currentPos;
	            this.rotationMatrix = $rotationMatrix;
	            this.currentTargetPos = $currentTargetPos;
	            this.endFun = $endFun;
	            this.bloodFun = $bloodFun;
	        };
	        return SkillPath;
	    }());
	    Pan3d.SkillPath = SkillPath;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillPath.js.map

/***/ }),
/* 113 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SkillSinPath = /** @class */ (function (_super) {
	        __extends(SkillSinPath, _super);
	        function SkillSinPath() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this.basePos = new Pan3d.Vector3D;
	            return _this;
	        }
	        SkillSinPath.prototype.add = function () {
	            this.skillTrajectory.setCurrentPos();
	            var v3d = new Pan3d.Vector3D();
	            v3d.x = this.currentTargetPos.x - this.currentPos.x;
	            v3d.y = this.currentTargetPos.y - this.currentPos.y;
	            v3d.z = this.currentTargetPos.z - this.currentPos.z;
	            this.basePos.setTo(this.currentPos.x, this.currentPos.y, this.currentPos.z);
	            this.alltime = v3d.length / this.speed;
	        };
	        SkillSinPath.prototype.update = function (t) {
	            this.time = t;
	            this.lastTime += t;
	            if (this.hasReached) {
	                this.endTime += t;
	                if (this.endTime > 200) {
	                    this.applyArrive();
	                }
	                return;
	            }
	            this.skillTrajectory.setCurrentPos();
	            var ypos = (this.lastTime / this.alltime);
	            if (ypos > 1) {
	                ypos = 1;
	            }
	            //ypos = ypos - ypos * ypos;   
	            //ypos *= 150; 
	            var offsetv3d = this.getOffset(ypos);
	            this._currentDirect.x = this.currentTargetPos.x - this.basePos.x;
	            this._currentDirect.y = this.currentTargetPos.y - this.basePos.y;
	            this._currentDirect.z = this.currentTargetPos.z - this.basePos.z;
	            this._currentDirect.normalize();
	            this._currentDirect.scaleBy(this.speed);
	            this.setRotationMatrix(this.currentTargetPos.subtract(this.basePos));
	            if (this._currentDirect.length == 0) {
	                this.arrive();
	                return;
	            }
	            var currentDistance = this._currentDirect.length * this.time;
	            if (!this.hasReached) {
	                var targetDistance = Pan3d.Vector3D.distance(this.basePos, this.currentTargetPos);
	                this.basePos.x += this._currentDirect.x * this.time;
	                this.basePos.y += this._currentDirect.y * this.time;
	                this.basePos.z += this._currentDirect.z * this.time;
	                // this.currentPos.x = this.basePos.x + ypos;
	                // this.currentPos.y = this.basePos.y;
	                // this.currentPos.z = this.basePos.z;
	                this.setApplyPos(offsetv3d);
	            }
	            if (currentDistance > targetDistance) {
	                this.arrive();
	            }
	            //this.distance += currentDistance;
	        };
	        SkillSinPath.prototype.setApplyPos = function ($offset) {
	            this.currentPos.x = this.basePos.x + $offset.x;
	            this.currentPos.y = this.basePos.y + $offset.y;
	            this.currentPos.z = this.basePos.z + $offset.z;
	        };
	        SkillSinPath.prototype.getOffset = function (ypos) {
	            ypos = Math.sin(ypos * Math.PI) * 100;
	            var offsetv3d = this._currentDirect.cross(new Pan3d.Vector3D(0, 1, 0));
	            offsetv3d.scaleBy(ypos);
	            return new Pan3d.Vector3D;
	        };
	        SkillSinPath.prototype.reset = function () {
	            _super.prototype.reset.call(this);
	            this.lastTime = 0;
	        };
	        return SkillSinPath;
	    }(Pan3d.SkillPath));
	    Pan3d.SkillSinPath = SkillSinPath;
	    var SkillCosPath = /** @class */ (function (_super) {
	        __extends(SkillCosPath, _super);
	        function SkillCosPath() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        SkillCosPath.prototype.getOffset = function (ypos) {
	            ypos = (ypos - ypos * ypos) * 300; //Math.sin(ypos * Math.PI) * 100;
	            var offsetv3d = this._currentDirect.cross(new Pan3d.Vector3D(0, -1, 0));
	            offsetv3d.scaleBy(ypos);
	            return new Pan3d.Vector3D;
	        };
	        return SkillCosPath;
	    }(SkillSinPath));
	    Pan3d.SkillCosPath = SkillCosPath;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillSinPath.js.map

/***/ }),
/* 114 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SkillMulPath = /** @class */ (function (_super) {
	        __extends(SkillMulPath, _super);
	        function SkillMulPath() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this.lastTime = 0;
	            return _this;
	        }
	        SkillMulPath.prototype.setInitCurrentPos = function (ary) {
	            this.currentPosAry = ary;
	            this.allTimeList = new Array;
	            for (var i = 0; i < ary.length; i++) {
	                this.allTimeList.push(0);
	            }
	        };
	        SkillMulPath.prototype.add = function () {
	            this.skillTrajectory.setCurrentPos();
	            this.directAry = new Array;
	            var maxLenght = 0;
	            for (var i = 0; i < this.currentPosAry.length; i++) {
	                var v3d = new Pan3d.Vector3D();
	                v3d.x = this.currentTargetPos.x - this.currentPosAry[i].x;
	                v3d.y = this.currentTargetPos.y - this.currentPosAry[i].y;
	                v3d.z = this.currentTargetPos.z - this.currentPosAry[i].z;
	                var le = v3d.length;
	                if (le > maxLenght) {
	                    maxLenght = le;
	                    this.maxV3d = this.currentPosAry[i];
	                }
	                this.allTimeList[i] = le / this.speed;
	                v3d.normalize();
	                v3d.scaleBy(this.speed);
	                this.directAry.push(v3d);
	            }
	            this.alltime = maxLenght / this.speed;
	            this.setAllData();
	        };
	        SkillMulPath.prototype.setAllData = function () {
	            var frame = float2int(this.alltime / 33) + 8;
	            this.resultAry = new Array;
	            for (var i = 0; i < this.currentPosAry.length; i++) {
	                var itemAry = new Array;
	                this.resultAry.push(itemAry);
	                var directV3d = this.directAry[i];
	                for (var k = 0; k < 6; k++) {
	                    itemAry.push([this.currentPosAry[i].x, this.currentPosAry[i].y, this.currentPosAry[i].z]);
	                }
	                for (var j = 0; j < frame; j++) {
	                    this.lastTime = 33 * j;
	                    var per = (this.lastTime / this.allTimeList[i]);
	                    var ypos = per;
	                    var pos;
	                    if (per >= 1) {
	                        ypos = 0;
	                        pos = [this.currentTargetPos.x, this.currentTargetPos.y, this.currentTargetPos.z];
	                    }
	                    else {
	                        ypos = ypos - ypos * ypos;
	                        ypos *= 250;
	                        pos = [directV3d.x * this.lastTime + this.currentPosAry[i].x, directV3d.y * this.lastTime + ypos + this.currentPosAry[i].y, directV3d.z * this.lastTime + this.currentPosAry[i].z];
	                    }
	                    var normal;
	                    if (j == 0) {
	                        normal = [0, 1, 0];
	                    }
	                    else {
	                        var lastpos = itemAry[j * 2 - 2];
	                        normal = [pos[0] - lastpos[0], pos[1] - lastpos[1], pos[2] - lastpos[2]];
	                        var len = Math.sqrt(normal[0] * normal[0] + normal[1] * normal[1] + normal[2] * normal[2]);
	                        normal[0] /= len;
	                        normal[1] /= len;
	                        normal[2] /= len;
	                    }
	                    itemAry.push(pos, normal);
	                }
	            }
	        };
	        SkillMulPath.prototype.update = function (t) {
	            this.time = t;
	            this.lastTime += t;
	            if (this.hasReached) {
	                this.endTime += t;
	                if (this.endTime > 200) {
	                    this.applyArrive();
	                }
	                return;
	            }
	            this.skillTrajectory.setCurrentPos();
	            for (var i = 0; i < this.currentPosAry.length; i++) {
	                var ypos = (this.lastTime / this.allTimeList[i]);
	                ypos = ypos - ypos * ypos;
	                ypos *= 250;
	                var basePos = this.currentPosAry[i];
	                this._currentDirect.x = this.currentTargetPos.x - basePos.x;
	                this._currentDirect.y = this.currentTargetPos.y - basePos.y;
	                this._currentDirect.z = this.currentTargetPos.z - basePos.z;
	                this._currentDirect.normalize();
	                this._currentDirect.scaleBy(this.speed);
	                if (this.maxV3d == basePos) {
	                    this.setRotationMatrix(this.currentTargetPos.subtract(basePos));
	                    if (this._currentDirect.length == 0) {
	                        this.arrive();
	                        return;
	                    }
	                }
	                var currentDistance = this._currentDirect.length * this.time;
	                if (!this.hasReached) {
	                    var targetDistance = Pan3d.Vector3D.distance(basePos, this.currentTargetPos);
	                    basePos.x += this._currentDirect.x * this.time;
	                    basePos.y += this._currentDirect.y * this.time;
	                    basePos.z += this._currentDirect.z * this.time;
	                    basePos.w = ypos;
	                }
	                if (this.maxV3d == basePos) {
	                    if (currentDistance > targetDistance) {
	                        this.arrive();
	                    }
	                }
	            }
	            this.currentPos.setTo(this.currentPosAry[0].x, this.currentPosAry[0].y + this.currentPosAry[0].w, this.currentPosAry[0].z);
	        };
	        SkillMulPath.prototype.setData = function ($skillTrajectory, $endFun, $currentPos, $rotationMatrix, $currentTargetPos) {
	            _super.prototype.setData.call(this, $skillTrajectory, $endFun, $currentPos, $rotationMatrix, $currentTargetPos, null);
	            this.skillMul = $skillTrajectory;
	        };
	        SkillMulPath.prototype.applyData = function (ary) {
	            for (var i = 0; i < ary.length; i++) {
	                ary[i].setTo(this.currentPosAry[i].x, this.currentPosAry[i].y + this.currentPosAry[i].w, this.currentPosAry[i].z);
	            }
	        };
	        SkillMulPath.prototype.reset = function () {
	            _super.prototype.reset.call(this);
	            this.lastTime = 0;
	        };
	        return SkillMulPath;
	    }(Pan3d.SkillPath));
	    Pan3d.SkillMulPath = SkillMulPath;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SkillMulPath.js.map

/***/ }),
/* 115 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var PathManager = /** @class */ (function () {
	        function PathManager() {
	        }
	        PathManager.reg = function (types, cls) {
	            this.dic[types] = cls;
	        };
	        PathManager.getNewPath = function (types) {
	            var cls = this.dic[types];
	            return new cls();
	        };
	        PathManager.init = function () {
	            this.dic[0] = Pan3d.SkillPath;
	            this.dic[1] = Pan3d.SkillSinPath;
	            this.dic[2] = Pan3d.SkillCosPath;
	        };
	        PathManager.dic = new Object;
	        return PathManager;
	    }());
	    Pan3d.PathManager = PathManager;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=PathManager.js.map

/***/ }),
/* 116 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var MaterialAnimShader = /** @class */ (function (_super) {
	        __extends(MaterialAnimShader, _super);
	        function MaterialAnimShader(val) {
	            var _this = _super.call(this, val) || this;
	            _this.name = "Material_Anim_shader";
	            return _this;
	        }
	        MaterialAnimShader.prototype.binLocation = function ($context) {
	            $context.bindAttribLocation(this.program, 0, "pos");
	            $context.bindAttribLocation(this.program, 1, "v2Uv");
	            $context.bindAttribLocation(this.program, 2, "boneID");
	            $context.bindAttribLocation(this.program, 3, "boneWeight");
	            var usePbr = this.paramAry[0];
	            var useNormal = this.paramAry[1];
	            var lightProbe = this.paramAry[4];
	            var directLight = this.paramAry[5];
	            if (usePbr) {
	                $context.bindAttribLocation(this.program, 4, "normal");
	                if (useNormal) {
	                    $context.bindAttribLocation(this.program, 5, "tangent");
	                    $context.bindAttribLocation(this.program, 6, "bitangent");
	                }
	            }
	            else if (lightProbe || directLight) {
	                $context.bindAttribLocation(this.program, 4, "normal");
	            }
	        };
	        MaterialAnimShader.getMd5M44Str = function () {
	            var str = "vec4 qdv(vec4 q,vec3 d, vec3 v ){\n" +
	                "vec3 t = 2.0 * cross(q.xyz, v);\n" +
	                "vec3 f = v + q.w * t + cross(q.xyz, t);\n" +
	                "return  vec4(f.x+d.x,f.y+d.y,f.z+d.z,1.0);\n" +
	                " }\n" +
	                "vec4 getQDdata(vec3 vdata){\n" +
	                "vec4 tempnum = qdv(boneQ[int(boneID.x)],boneD[int(boneID.x)],vdata) * boneWeight.x;\n" +
	                "tempnum += qdv(boneQ[int(boneID.y)],boneD[int(boneID.y)],vdata) * boneWeight.y;\n" +
	                "tempnum += qdv(boneQ[int(boneID.z)],boneD[int(boneID.z)],vdata)* boneWeight.z;\n" +
	                "tempnum += qdv(boneQ[int(boneID.w)],boneD[int(boneID.w)],vdata) * boneWeight.w;\n" +
	                "tempnum.x = tempnum.x*-1.0;\n" +
	                "return  tempnum;\n" +
	                " }\n";
	            return str;
	        };
	        MaterialAnimShader.getMd5M44NrmStr = function () {
	            var str = "vec4 qdvNrm(vec4 q, vec3 v ){\n" +
	                "vec3 t = 2.0 * cross(q.xyz, v);\n" +
	                "vec3 f = v + q.w * t + cross(q.xyz, t);\n" +
	                "return  vec4(f.x,f.y,f.z,1.0);\n" +
	                " }\n" +
	                "vec4 getQDdataNrm(vec3 vdata){\n" +
	                "vec4 tempnum = qdvNrm(boneQ[int(boneID.x)],vdata) * boneWeight.x;\n" +
	                "tempnum += qdvNrm(boneQ[int(boneID.y)],vdata) * boneWeight.y;\n" +
	                "tempnum += qdvNrm(boneQ[int(boneID.z)],vdata)* boneWeight.z;\n" +
	                "tempnum += qdvNrm(boneQ[int(boneID.w)],vdata) * boneWeight.w;\n" +
	                "tempnum.x = tempnum.x*-1.0;\n" +
	                "tempnum.xyz = normalize(tempnum.xyz);\n" +
	                "return  tempnum;\n" +
	                " }\n";
	            return str;
	        };
	        MaterialAnimShader.prototype.getVertexShaderString = function () {
	            var usePbr = this.paramAry[0];
	            var useNormal = this.paramAry[1];
	            var hasFresnel = this.paramAry[2];
	            var useDynamicIBL = this.paramAry[3];
	            var lightProbe = this.paramAry[4];
	            var directLight = this.paramAry[5];
	            var noLight = this.paramAry[6];
	            var $str = "attribute vec4 pos;\n" +
	                "attribute vec2 v2Uv;\n" +
	                "attribute vec4 boneID;\n" +
	                "attribute vec4 boneWeight;\n" +
	                "varying vec2 v0;\n" +
	                "uniform vec4 boneQ[54];\n" +
	                "uniform vec3 boneD[54];\n" +
	                //"uniform mat4 viewMatrix3D;\n" +
	                // "uniform mat4 camMatrix3D;\n" +
	                "uniform mat4 vpMatrix3D;\n" +
	                "uniform mat4 posMatrix3D;\n";
	            if (lightProbe) {
	                $str +=
	                    "uniform vec3 sh[9];\n" +
	                        "varying vec3 v2;\n";
	            }
	            else if (directLight) {
	                $str +=
	                    "uniform vec3 sunDirect;\n" +
	                        "uniform vec3 sunColor;\n" +
	                        "uniform vec3 ambientColor;\n" +
	                        "varying vec3 v2;\n";
	            }
	            else if (noLight) {
	            }
	            else {
	                $str +=
	                    "varying vec2 v2;\n";
	            }
	            if (usePbr) {
	                $str +=
	                    "attribute vec4 normal;\n" +
	                        "uniform mat4 rotationMatrix3D;\n" +
	                        "varying vec3 v1;\n";
	                if (!useNormal) {
	                    $str += "varying vec3 v4;\n";
	                }
	                else {
	                    $str += "varying mat3 v4;\n";
	                }
	                if (useNormal) {
	                    $str +=
	                        "attribute vec4 tangent;\n" +
	                            "attribute vec4 bitangent;\n";
	                }
	            }
	            else if (lightProbe || directLight) {
	                $str +=
	                    "attribute vec4 normal;\n" +
	                        "uniform mat4 rotationMatrix3D;\n";
	            }
	            $str +=
	                MaterialAnimShader.getMd5M44Str() +
	                    MaterialAnimShader.getMd5M44NrmStr() +
	                    "void main(void){\n" +
	                    "v0 = v2Uv;\n" +
	                    "vec4 vt0 = getQDdata(vec3(pos.x,pos.y,pos.z));\n" +
	                    "vt0.xyz = vt0.xyz*1.0;\n" +
	                    "vt0 = posMatrix3D * vt0;\n";
	            if (usePbr) {
	                $str +=
	                    "v1 = vec3(vt0.x,vt0.y,vt0.z);\n";
	            }
	            $str +=
	                //"vt0 = camMatrix3D * vt0;\n" +
	                //"vt0 = viewMatrix3D * vt0;\n" +
	                "vt0 = vpMatrix3D * vt0;\n" +
	                    "gl_Position = vt0;\n";
	            if (usePbr) {
	                if (!useNormal) {
	                    $str +=
	                        //"vt0 = bone[int(boneID.x)] * normal * boneWeight.x;\n" +
	                        //"vt0 += bone[int(boneID.y)] * normal * boneWeight.y;\n" +
	                        //"vt0 += bone[int(boneID.z)] * normal * boneWeight.z;\n" +
	                        //"vt0 += bone[int(boneID.w)] * normal * boneWeight.w;\n" +
	                        "vt0 = getQDdataNrm(vec3(normal.x,normal.y,normal.z));\n" +
	                            "vt0 = rotationMatrix3D * vt0;\n" +
	                            "vt0.xyz = normalize(vt0.xyz);\n" +
	                            "v4 = vec3(vt0.x,vt0.y,vt0.z);\n";
	                }
	                else {
	                    $str +=
	                        //"vec4 vt2 = bone[int(boneID.x)] * tangent * boneWeight.x;\n" +
	                        //"vt2 += bone[int(boneID.y)] * tangent * boneWeight.y;\n" +
	                        //"vt2 += bone[int(boneID.z)] * tangent * boneWeight.z;\n" +
	                        //"vt2 += bone[int(boneID.w)] * tangent * boneWeight.w;\n" +
	                        "vec4 vt2 = getQDdataNrm(vec3(tangent.x,tangent.y,tangent.z));\n" +
	                            "vt2 = rotationMatrix3D * vt2;\n" +
	                            "vt2.xyz = normalize(vt2.xyz);\n" +
	                            //"vec4 vt1 = bone[int(boneID.x)] * bitangent * boneWeight.x;\n" +
	                            //"vt1 += bone[int(boneID.y)] * bitangent * boneWeight.y;\n" +
	                            //"vt1 += bone[int(boneID.z)] * bitangent * boneWeight.z;\n" +
	                            //"vt1 += bone[int(boneID.w)] * bitangent * boneWeight.w;\n" +
	                            "vec4 vt1 = getQDdataNrm(vec3(bitangent.x,bitangent.y,bitangent.z));\n" +
	                            "vt1 = rotationMatrix3D * vt1;\n" +
	                            "vt1.xyz = normalize(vt1.xyz);\n" +
	                            //"vt0 = bone[int(boneID.x)] * normal * boneWeight.x;\n" +
	                            //"vt0 += bone[int(boneID.y)] * normal * boneWeight.y;\n" +
	                            //"vt0 += bone[int(boneID.z)] * normal * boneWeight.z;\n" +
	                            //"vt0 += bone[int(boneID.w)] * normal * boneWeight.w;\n" +
	                            "vt0 = getQDdataNrm(vec3(normal.x,normal.y,normal.z));\n" +
	                            "vt0 = rotationMatrix3D * vt0;\n" +
	                            "vt0.xyz = normalize(vt0.xyz);\n" +
	                            "v4 = mat3(vec3(vt2.x,vt2.y,vt2.z),vec3(vt1.x,vt1.y,vt1.z),vec3(vt0.x,vt0.y,vt0.z));\n";
	                }
	            }
	            else if (lightProbe || directLight) {
	                $str +=
	                    //"vt0 = bone[int(boneID.x)] * normal * boneWeight.x;\n" +
	                    //"vt0 += bone[int(boneID.y)] * normal * boneWeight.y;\n" +
	                    //"vt0 += bone[int(boneID.z)] * normal * boneWeight.z;\n" +
	                    //"vt0 += bone[int(boneID.w)] * normal * boneWeight.w;\n" +
	                    "vt0 = getQDdataNrm(vec3(normal.x,normal.y,normal.z));\n" +
	                        "vt0 = rotationMatrix3D * vt0;\n" +
	                        "vt0.xyz = normalize(vt0.xyz);\n";
	                //"vt0 = vec4(0,1,0,1);\n";
	            }
	            if (lightProbe) {
	                $str +=
	                    "vec3 lpb = sh[0] * 0.28209479177387814;\n" +
	                        "lpb += sh[1] * (vt0.y * -0.4886025119029199);\n" +
	                        "lpb += sh[2] * (vt0.z * 0.4886025119029199);\n" +
	                        "lpb += sh[3] * (vt0.x * -0.4886025119029199);\n" +
	                        "lpb += sh[4] * (vt0.x * vt0.y * 1.0925484305920792);\n" +
	                        "lpb += sh[5] * (vt0.z * vt0.y * -1.0925484305920792);\n" +
	                        "lpb += sh[6] * ((3.0 * vt0.z * vt0.z - 1.0) * 0.31539156525252005);\n" +
	                        "lpb += sh[7] * (vt0.z * vt0.x * -1.0925484305920792);\n" +
	                        "lpb += sh[8] * ((vt0.x * vt0.x - vt0.y * vt0.y) * 0.5462742152960396);\n" +
	                        "v2 = lpb;\n";
	            }
	            else if (directLight) {
	                $str +=
	                    "float suncos = dot(vt0.xyz,sunDirect.xyz);\n" +
	                        "suncos = clamp(suncos,0.0,1.0);\n" +
	                        "v2 = sunColor * suncos + ambientColor;";
	                // "v2 += vec3(1.0,1.0,1.0);" 
	            }
	            else if (noLight) {
	            }
	            else {
	                $str +=
	                    "v2 = v2Uv;\n";
	            }
	            $str += "}";
	            //if (usePbr) {
	            //    if (!useNormal) {
	            //        $str += "v4 = vec3(v3Normal.x,v3Normal.y,v3Normal.z);\n";
	            //    } else {
	            //        $str += 
	            //        "v4 = mat3(v3Tangent,v3Bitangent,v3Normal);\n"
	            //    }
	            //}
	            return $str;
	        };
	        MaterialAnimShader.prototype.getFragmentShaderString = function () {
	            var $str = 
	            //"#ifdef GL_FRAGMENT_PRECISION_HIGH\n" +
	            //"precision highp float;\n" +
	            //" #else\n" +
	            //" precision mediump float;\n" +
	            //" #endif\n" +
	            "uniform sampler2D s_texture1;\n" +
	                //"uniform sampler2D light_texture;\n" +
	                "uniform vec4 testconst;" +
	                "varying vec2 v_texCoord;\n" +
	                //"varying vec2 v_texLight;\n" +
	                "void main(void)\n" +
	                "{\n" +
	                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
	                //"if (infoUv.a <= 0.9) {\n" +
	                //"     discard;\n" +
	                //"}\n" +
	                //"vec4 infoLight = texture2D(light_texture, v_texLight);\n" +
	                //"vec4 test = vec4(0.5,0,0,1);\n" +
	                "infoUv.xyz = testconst.xyz * infoUv.xyz;\n" +
	                //"info.rgb = info.rgb / 0.15;\n" +
	                "gl_FragColor = infoUv;\n" +
	                "}";
	            return $str;
	        };
	        MaterialAnimShader.MATERIAL_ANIM_SHADER = "Material_Anim_shader";
	        return MaterialAnimShader;
	    }(Pan3d.Shader3D));
	    Pan3d.MaterialAnimShader = MaterialAnimShader;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=MaterialAnimShader.js.map

/***/ }),
/* 117 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Display3dMovie = /** @class */ (function (_super) {
	        __extends(Display3dMovie, _super);
	        function Display3dMovie(val) {
	            var _this = _super.call(this, val) || this;
	            _this.meshVisible = true;
	            _this._defaultAction = "stand";
	            // protected _defaultAction: string = "m_attack_01";
	            // protected _defaultAction: string = "walk";
	            _this._curentFrame = 0;
	            _this._actionTime = 0;
	            _this.fileScale = 1;
	            _this.time = 0;
	            _this.dynamic = false;
	            _this.completeState = 0;
	            _this._animDic = new Object;
	            _this._partDic = new Object;
	            _this._partUrl = new Object;
	            _this._preLoadActionDic = new Object;
	            _this._waitLoadActionDic = new Object;
	            return _this;
	        }
	        Display3dMovie.prototype.getSocket = function (socketName, resultMatrix) {
	            resultMatrix.identity();
	            if (!this._skinMesh) {
	                resultMatrix.append(this.posMatrix);
	                return;
	            }
	            else if (!this._skinMesh.boneSocketDic[socketName]) {
	                if (socketName = "none") {
	                    resultMatrix.appendTranslation(this.x, this.y, this.z);
	                }
	                else {
	                    resultMatrix.append(this.posMatrix);
	                }
	                return;
	            }
	            var boneSocketData = this._skinMesh.boneSocketDic[socketName];
	            var testmatix;
	            var index = boneSocketData.index;
	            testmatix = this.getFrameMatrix(index);
	            resultMatrix.appendScale(1 / this.scaleX, 1 / this.scaleY, 1 / this.scaleZ);
	            resultMatrix.appendRotation(boneSocketData.rotationX, Pan3d.Vector3D.X_AXIS);
	            resultMatrix.appendRotation(boneSocketData.rotationY, Pan3d.Vector3D.Y_AXIS);
	            resultMatrix.appendRotation(boneSocketData.rotationZ, Pan3d.Vector3D.Z_AXIS);
	            resultMatrix.appendTranslation(boneSocketData.x, boneSocketData.y, boneSocketData.z);
	            if (testmatix) {
	                resultMatrix.append(this._skinMesh.meshAry[this._skinMesh.meshAry.length - 1].bindPosInvertMatrixAry[index]);
	                resultMatrix.append(testmatix);
	            }
	            resultMatrix.append(this.posMatrix);
	        };
	        Display3dMovie.prototype.getFrameMatrix = function (index) {
	            if (this._animDic[this.curentAction]) {
	                var animData = this._animDic[this.curentAction];
	                if (this._curentFrame >= animData.matrixAry.length) {
	                    return animData.matrixAry[0][index];
	                }
	                return animData.matrixAry[this._curentFrame][index];
	            }
	            else if (this._animDic[this._defaultAction]) {
	                var animData = this._animDic[this._defaultAction];
	                return animData.matrixAry[this._curentFrame][index];
	            }
	            return null;
	        };
	        Display3dMovie.prototype.setRoleUrl = function (url) {
	            var _this = this;
	            this.scene3D.meshDataManager.getMeshData(url, function (value) {
	                _this._skinMesh = value;
	                _this.fileScale = value.fileScale;
	                _this.updateMatrix();
	                _this.addSkinMeshParticle();
	                _this._animDic = value.animDic;
	                _this.onMeshLoaded();
	            });
	        };
	        Display3dMovie.prototype.updateMatrix = function () {
	            _super.prototype.updateMatrix.call(this);
	            this.posMatrix.appendScale(this.fileScale, this.fileScale, this.fileScale);
	        };
	        Display3dMovie.prototype.onMeshLoaded = function () {
	        };
	        Display3dMovie.prototype.addSkinMeshParticle = function () {
	            if (!this._skinMesh) {
	                return;
	            }
	            var dicAry = new Array;
	            this._partDic["mesh"] = dicAry;
	            var meshAry = this._skinMesh.meshAry;
	            if (!meshAry) {
	                return;
	            }
	            for (var i = 0; i < meshAry.length; i++) {
	                var particleAry = meshAry[i].particleAry;
	                for (var j = 0; j < particleAry.length; j++) {
	                    var bindPartcle = particleAry[j];
	                    var particle;
	                    particle = this.scene3D.particleManager.getParticleByte(this.scene3D.fileRoot + bindPartcle.url);
	                    if (!particle.sourceData) {
	                        console.log("particle.sourceData error");
	                    }
	                    particle.dynamic = true;
	                    particle.bindSocket = bindPartcle.socketName;
	                    dicAry.push(particle);
	                    particle.bindTarget = this;
	                    this.scene3D.particleManager.addParticle(particle);
	                }
	            }
	        };
	        Display3dMovie.prototype.upFrame = function () {
	            if (!this._skinMesh) {
	                return;
	            }
	            this.updateBind();
	            if (this.meshVisible) {
	                for (var i = 0; i < this._skinMesh.meshAry.length; i++) {
	                    this.updateMaterialMesh(this._skinMesh.meshAry[i]);
	                }
	            }
	        };
	        Display3dMovie.prototype.play = function ($action, $completeState, needFollow) {
	            if ($completeState === void 0) { $completeState = 0; }
	            if (needFollow === void 0) { needFollow = true; }
	            //FpsMc.tipStr = "1" + $action + "," + this._curentAction;
	            if (this.curentAction == $action) {
	                return;
	            }
	            //FpsMc.tipStr = "2";
	            this.curentAction = $action;
	            this.completeState = $completeState;
	            this._actionTime = 0;
	            this.updateFrame(0);
	            //FpsMc.tipStr = "3";
	            if (this._animDic.hasOwnProperty($action)) {
	                //FpsMc.tipStr = "4";
	                return true;
	            }
	            else {
	                //FpsMc.tipStr = "5";
	                if (!this._waitLoadActionDic[$action] && this._preLoadActionDic[$action]) {
	                    //FpsMc.tipStr = "6";
	                    // this.setAnimUrl($action, this._preLoadActionDic[$action]);
	                }
	                return false;
	            }
	        };
	        Display3dMovie.prototype.updateFrame = function (t) {
	            this._actionTime += t;
	            if (this._skinMesh == null) {
	                return;
	            }
	            var animData = this._getCurentAnimData();
	            if (animData == null) {
	                return;
	            }
	            this._curentFrame = Math.floor(this._actionTime / (Pan3d.Scene3D.frameTime * 1.5));
	            if (this._curentFrame >= animData.matrixAry.length) {
	                if (this.completeState == 0) {
	                    this._actionTime = 0;
	                    this._curentFrame = 0;
	                }
	                else if (this.completeState == 1) {
	                    this._curentFrame = animData.matrixAry.length - 1;
	                }
	                else if (this.completeState == 2) {
	                    this._curentFrame = 0;
	                    this.completeState = 0;
	                    this.changeAction(this.curentAction);
	                }
	                else if (this.completeState == 3) {
	                }
	            }
	        };
	        Display3dMovie.prototype.changeAction = function (curentAction) {
	            this.curentAction = this._defaultAction;
	        };
	        Display3dMovie.prototype._getCurentAnimData = function () {
	            var animData = null;
	            if (this._animDic[this.curentAction]) {
	                animData = this._animDic[this.curentAction];
	            }
	            else if (this._animDic[this._defaultAction]) {
	                animData = this._animDic[this._defaultAction];
	            }
	            return animData;
	        };
	        Display3dMovie.prototype.updateMaterialMesh = function (mesh) {
	            if (!mesh.material) {
	                return;
	            }
	            if (mesh.material.shader == null) {
	                console.log("没有:");
	                return;
	            }
	            this.shader3D = mesh.material.shader;
	            var ctx = this.scene3D.context3D;
	            ctx.setDepthTest(true);
	            ctx.setWriteDepth(true);
	            ctx.setProgram(this.shader3D.program);
	            this.setVc();
	            this.setMaterialTexture(mesh.material, mesh.materialParam);
	            this.setMeshVc(mesh);
	            this.setVaCompress(mesh);
	            ctx.drawCall(mesh.indexBuffer, mesh.treNum);
	        };
	        Display3dMovie.prototype.setVc = function () {
	            var ctx = this.scene3D.context3D;
	            ctx.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
	            ctx.setVcMatrix4fv(this.shader3D, "posMatrix3D", this.posMatrix.m);
	        };
	        Display3dMovie.prototype.setVaCompress = function ($mesh) {
	            var ctx = this.scene3D.context3D;
	            var tf = ctx.pushVa($mesh.vertexBuffer);
	            if (tf) {
	                return;
	            }
	            ctx.setVaOffset(0, 3, $mesh.stride, 0);
	            ctx.setVaOffset(1, 2, $mesh.stride, $mesh.uvsOffsets);
	            ctx.setVaOffset(2, 4, $mesh.stride, $mesh.boneIDOffsets);
	            ctx.setVaOffset(3, 4, $mesh.stride, $mesh.boneWeightOffsets);
	        };
	        Display3dMovie.prototype.setMeshVc = function ($mesh) {
	            var ctx = this.scene3D.context3D;
	            var animData;
	            if (this._animDic[this.curentAction]) {
	                animData = this._animDic[this.curentAction];
	            }
	            else if (this._animDic[this._defaultAction]) {
	                animData = this._animDic[this._defaultAction];
	            }
	            else {
	                return;
	            }
	            var $dualQuatFrame = animData.getBoneQPAryByMesh($mesh)[$mesh.uid][this._curentFrame];
	            if (!$dualQuatFrame) {
	                return;
	            }
	            ctx.setVc4fv($mesh.material.shader, "boneQ", $dualQuatFrame.quat); //旋转
	            ctx.setVc3fv($mesh.material.shader, "boneD", $dualQuatFrame.pos); //所有的位移
	        };
	        Display3dMovie.prototype.setMaterialTexture = function ($material, $mp) {
	            if ($mp === void 0) { $mp = null; }
	            //有重复需要优化
	            var ctx = this.scene3D.context3D;
	            var texVec = $material.texList;
	            for (var i = 0; i < texVec.length; i++) {
	                if (texVec[i].texture) {
	                    ctx.setRenderTexture($material.shader, texVec[i].name, texVec[i].texture, texVec[i].id);
	                }
	            }
	            if ($mp) {
	                for (i = 0; i < $mp.dynamicTexList.length; i++) {
	                    if ($mp.dynamicTexList[i].target) {
	                        ctx.setRenderTexture($material.shader, $mp.dynamicTexList[i].target.name, $mp.dynamicTexList[i].texture, $mp.dynamicTexList[i].target.id);
	                    }
	                }
	            }
	        };
	        Display3dMovie.prototype.updateBind = function () {
	            if (this.bindTarget) {
	                this.posMatrix.identity();
	                this.posMatrix.appendScale(this.scaleX, this.scaleY, this.scaleZ);
	                if (this._isInGroup) {
	                    this.posMatrix.append(this.groupMatrix);
	                    //posMatrix.prependTranslation(groupPos.x, groupPos.y, groupPos.z);
	                    //posMatrix.prependRotation(groupRotation.z, Vector3D.Z_AXIS);
	                    //posMatrix.prependRotation(groupRotation.y, Vector3D.Y_AXIS);
	                    //posMatrix.prependRotation(groupRotation.x, Vector3D.X_AXIS);
	                    //posMatrix.prependScale(groupScale.x, groupScale.y, groupScale.z);
	                }
	                this.bindTarget.getSocket(this.bindSocket, this.bindMatrix);
	                this.posMatrix.append(this.bindMatrix);
	                this.bindMatrix.copyTo(this.rotationMatrix);
	                this.rotationMatrix.identityPostion();
	                if (this._isInGroup) {
	                    this.rotationMatrix.prepend(this.groupRotationMatrix);
	                    //_rotationMatrix.prependRotation(groupRotation.z, Vector3D.Z_AXIS);
	                    //_rotationMatrix.prependRotation(groupRotation.y, Vector3D.Y_AXIS);
	                    //_rotationMatrix.prependRotation(groupRotation.x, Vector3D.X_AXIS);
	                }
	                this.sceneVisible = this.bindTarget.visible;
	            }
	        };
	        return Display3dMovie;
	    }(Pan3d.Display3DSprite));
	    Pan3d.Display3dMovie = Display3dMovie;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Display3dMovie.js.map

/***/ }),
/* 118 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var SceneChar = /** @class */ (function (_super) {
	        __extends(SceneChar, _super);
	        function SceneChar() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        SceneChar.prototype.playSkill = function ($skill) {
	            this.scene3D.skillManager.playSkill($skill);
	            this.skillVo = $skill;
	        };
	        SceneChar.prototype.addPart = function ($key, $bindSocket, $url) {
	            var _this = this;
	            if (this._partUrl[$key] == $url) { //如果相同则返回
	                return;
	            }
	            else if (this._partUrl[$key]) { //如果不同则先移除
	                this.removePart($key);
	            }
	            if (!this._partDic[$key]) {
	                this._partDic[$key] = new Array;
	            }
	            this._partUrl[$key] = $url;
	            var ary = this._partDic[$key];
	            this.scene3D.groupDataManager.getGroupData(this.scene3D.fileRoot + $url, function (groupRes) {
	                _this.loadPartRes($bindSocket, groupRes, ary);
	            });
	        };
	        SceneChar.prototype.play = function ($action, $completeState, needFollow) {
	            if ($completeState === void 0) { $completeState = 0; }
	            if (needFollow === void 0) { needFollow = true; }
	            var tf = _super.prototype.play.call(this, $action, $completeState, needFollow);
	            if (this.mountChar != null) {
	                this.changeMountAction();
	            }
	            return tf;
	        };
	        SceneChar.prototype.changeMountAction = function () {
	            var action = this.curentAction;
	            if (this.mountChar != null) {
	                if (action == SceneChar.CharAction_stand || action == SceneChar.CharAction_stand_mount) {
	                    this.curentAction = SceneChar.CharAction_stand_mount;
	                    this.mountChar.curentAction = SceneChar.CharAction_stand;
	                }
	                else if (action == SceneChar.CharAction_walk || action == SceneChar.CharAction_walk_mount) {
	                    this.curentAction = SceneChar.CharAction_walk_mount;
	                    this.mountChar.curentAction = SceneChar.CharAction_walk;
	                }
	                else {
	                    this.mountChar.curentAction = SceneChar.CharAction_stand;
	                }
	            }
	        };
	        SceneChar.prototype.setMountCharByName = function (val) {
	            var sc = new Pan3d.Display3dMovie(this.scene3D);
	            sc.setRoleUrl("role/" + val + ".txt");
	            sc.x = this.x;
	            sc.y = this.y;
	            sc.z = this.z;
	            this.mountChar = sc;
	            this.scene3D.addMovieDisplay(sc);
	            this.setBind(this.mountChar, SceneChar.MOUNT_SLOT);
	        };
	        SceneChar.prototype.loadPartRes = function ($bindSocket, groupRes, ary) {
	            for (var i = 0; i < groupRes.dataAry.length; i++) {
	                var item = groupRes.dataAry[i];
	                var posV3d;
	                var rotationV3d;
	                var scaleV3d;
	                if (item.isGroup) {
	                }
	                if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
	                }
	                else if (item.types == Pan3d.BaseRes.PREFAB_TYPE) {
	                    var display = new Pan3d.Display3DSprite(this.scene3D);
	                    display.setObjUrl(item.objUrl);
	                    display.setMaterialUrl(item.materialUrl, item.materialInfoArr);
	                    display.dynamic = true;
	                    ary.push(display);
	                    display.setBind(this, $bindSocket);
	                    this.scene3D.addDisplay(display);
	                    if (item.isGroup) {
	                        // display.setGroup(posV3d, rotationV3d, scaleV3d);
	                    }
	                }
	            }
	            this.applyVisible();
	        };
	        SceneChar.prototype.applyVisible = function () {
	            // throw new Error("Method not implemented.");
	        };
	        SceneChar.prototype.removePart = function ($key) {
	            throw new Error("Method not implemented.");
	        };
	        SceneChar.WEAPON_PART = "weapon";
	        SceneChar.WEAPON_DEFAULT_SLOT = "w_01";
	        SceneChar.MOUNT_SLOT = "mount_01";
	        SceneChar.WING_SLOT = "wing_01";
	        SceneChar.SEL_PART = "select";
	        SceneChar.QUEST_ICON = "questicon";
	        SceneChar.NONE_SLOT = "none";
	        SceneChar.CharAction_stand = "stand";
	        SceneChar.CharAction_walk = "walk";
	        SceneChar.CharAction_jump = "jump";
	        SceneChar.CharAction_death = "death";
	        SceneChar.CharAction_injured = "injured";
	        SceneChar.CharAction_stand_mount = "stand_mount";
	        SceneChar.CharAction_walk_mount = "walk_mount";
	        return SceneChar;
	    }(Pan3d.Display3dMovie));
	    Pan3d.SceneChar = SceneChar;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=SceneChar.js.map

/***/ }),
/* 119 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ResManager = /** @class */ (function (_super) {
	        __extends(ResManager, _super);
	        function ResManager() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        ResManager.prototype.loadRoleRes = function (url, $fun, $meshBatchNum) {
	            var roleRes = new Pan3d.RoleRes(this.scene3D);
	            roleRes.meshBatchNum = $meshBatchNum;
	            roleRes.load(url, function () {
	                $fun(roleRes);
	            });
	        };
	        ResManager.prototype.loadSkillRes = function (url, $fun) {
	            var skillRes = new Pan3d.SkillRes(this.scene3D);
	            skillRes.load(url, function () {
	                $fun(skillRes);
	            });
	        };
	        return ResManager;
	    }(Pan3d.ResGC));
	    Pan3d.ResManager = ResManager;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ResManager.js.map

/***/ }),
/* 120 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var GroupDataManager = /** @class */ (function (_super) {
	        __extends(GroupDataManager, _super);
	        function GroupDataManager() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this._loadDic = new Object;
	            return _this;
	        }
	        GroupDataManager.prototype.getGroupData = function ($url, $fun) {
	            var _this = this;
	            if (this.dic[$url]) {
	                var gr = this.dic[$url];
	                $fun(gr);
	                return;
	            }
	            if (this._loadDic[$url]) {
	                this._loadDic[$url].push($fun);
	                return;
	            }
	            this._loadDic[$url] = new Array;
	            this._loadDic[$url].push($fun);
	            var group = new Pan3d.GroupRes(this.scene3D);
	            group.load($url, function () {
	                var ary = _this._loadDic[$url];
	                for (var i = 0; i < ary.length; i++) {
	                    var fun = ary[i];
	                    fun(group);
	                }
	                _this.dic[$url] = group;
	                delete _this._loadDic[$url];
	                group.initReg();
	            });
	        };
	        return GroupDataManager;
	    }(Pan3d.ResGC));
	    Pan3d.GroupDataManager = GroupDataManager;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=GroupDataManager.js.map

/***/ }),
/* 121 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ParticleManager = /** @class */ (function (_super) {
	        __extends(ParticleManager, _super);
	        function ParticleManager(value) {
	            var _this = _super.call(this, value) || this;
	            _this._renderDic = new Object;
	            _this.clearAll();
	            _this.time = Pan3d.TimeUtil.getTimer();
	            return _this;
	        }
	        ParticleManager.prototype.getParticleByte = function ($url) {
	            $url = $url.replace("_byte.txt", ".txt");
	            $url = $url.replace(".txt", "_byte.txt");
	            var combineParticle = new Pan3d.CombineParticle();
	            var url = $url;
	            if (this.dic[url]) {
	                var baseData = this.dic[url];
	                combineParticle = baseData.getCombineParticle();
	            }
	            combineParticle.url = url;
	            return combineParticle;
	        };
	        ParticleManager.prototype.addParticle = function ($particle) {
	            this._particleList.push($particle);
	            this.addRenderDic($particle);
	        };
	        ParticleManager.prototype.clearAll = function () {
	            this._particleList = new Array();
	            this._renderDic = new Object();
	        };
	        ParticleManager.prototype.addRenderDic = function ($particle) {
	            var url = $particle.url;
	            if (!this._renderDic[url]) {
	                this._renderDic[url] = new Array;
	            }
	            this._renderDic[url].push($particle);
	        };
	        ParticleManager.prototype.registerUrl = function ($url) {
	            $url = $url.replace("_byte.txt", ".txt");
	            $url = $url.replace(".txt", "_byte.txt");
	            if (this.dic[$url]) {
	                var baseData = this.dic[$url];
	            }
	        };
	        ParticleManager.prototype.addResByte = function ($url, $data) {
	            if (!this.dic[$url]) {
	                var baseData = new Pan3d.CombineParticleData(this.scene3D);
	                baseData.setDataByte($data);
	                this.dic[$url] = baseData;
	            }
	        };
	        ParticleManager.prototype.removeParticle = function ($particle) {
	            var indexs = this._particleList.indexOf($particle);
	            if (indexs == -1) {
	                return;
	            }
	            this._particleList.splice(indexs, 1);
	            this.removeRenderDic($particle);
	        };
	        ParticleManager.prototype.removeRenderDic = function ($particle) {
	            var url = $particle.url;
	            var indexs = this._renderDic[url].indexOf($particle);
	            if (indexs == -1) {
	                return;
	            }
	            this._renderDic[url].splice(indexs, 1);
	            if (this._renderDic[url].length == 0) {
	                delete this._renderDic[url];
	            }
	        };
	        ParticleManager.prototype.upFrame = function () {
	            this.updateTime();
	            this.updateRenderDic();
	        };
	        ParticleManager.prototype.updateTime = function () {
	            var _tempTime = Pan3d.TimeUtil.getTimer();
	            var t = _tempTime - this.time;
	            for (var i = 0; i < this._particleList.length; i++) {
	                if (!this._particleList[i].sceneVisible) {
	                    continue;
	                }
	                this._particleList[i].updateTime(t);
	            }
	            this.time = _tempTime;
	        };
	        ParticleManager.prototype.updateRenderDic = function () {
	            this.scene3D.context3D.setWriteDepth(false);
	            this.scene3D.context3D.disableCullFace();
	            for (var key in this._renderDic) {
	                var list = this._renderDic[key];
	                if (list.length == 1) {
	                    list[0].update();
	                }
	                else {
	                    var size = list[0].size;
	                    for (var j = 0; j < size; j++) {
	                        for (var i = 0; i < list.length; i++) {
	                            list[i].updateItem(j);
	                        }
	                    }
	                }
	            }
	        };
	        return ParticleManager;
	    }(Pan3d.ResGC));
	    Pan3d.ParticleManager = ParticleManager;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ParticleManager.js.map

/***/ }),
/* 122 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var MeshDataManager = /** @class */ (function (_super) {
	        __extends(MeshDataManager, _super);
	        function MeshDataManager(val) {
	            var _this = _super.call(this, val) || this;
	            _this._loadDic = new Object();
	            return _this;
	        }
	        MeshDataManager.prototype.uploadPbrMesh = function ($meshData, useNormal) {
	            throw new Error("Method not implemented.");
	        };
	        MeshDataManager.prototype.getMeshData = function ($url, bfun) {
	            var _this = this;
	            var $batchNum = 1;
	            if (this.dic[$url] && this.dic[$url].ready) {
	                bfun(this.dic[$url]);
	                this.dic[$url].useNum++;
	                return;
	            }
	            if (this._loadDic[$url]) {
	                this._loadDic[$url].push(bfun);
	                return;
	            }
	            this._loadDic[$url] = new Array;
	            this._loadDic[$url].push(bfun);
	            this.scene3D.resManager.loadRoleRes(this.scene3D.fileRoot + $url, function ($roleRes) {
	                _this.roleResCom($roleRes, bfun);
	            }, $batchNum);
	        };
	        MeshDataManager.prototype.roleResCom = function ($roleRes, $fun) {
	            var url = $roleRes.roleUrl;
	            var skinMesh = this.dic[url];
	            skinMesh.loadMaterial();
	            //skinMesh.loadParticle();
	            skinMesh.setAction($roleRes.actionAry, url);
	            skinMesh.url = url;
	            if ($roleRes.ambientLightColor) {
	                skinMesh.lightData = [[$roleRes.ambientLightColor.x, $roleRes.ambientLightColor.y, $roleRes.ambientLightColor.z],
	                    [$roleRes.nrmDircet.x, $roleRes.nrmDircet.y, $roleRes.nrmDircet.z],
	                    [$roleRes.sunLigthColor.x, $roleRes.sunLigthColor.y, $roleRes.sunLigthColor.z]];
	            }
	            for (var i = 0; i < this._loadDic[url].length; i++) {
	                this._loadDic[url][i](skinMesh);
	            }
	            delete this._loadDic[url];
	            skinMesh.ready = true;
	        };
	        MeshDataManager.prototype.readData = function (byte, $batchNum, $url, $version) {
	            var $skinMesh = new Pan3d.SkinMesh(this.scene3D);
	            $skinMesh.fileScale = byte.readFloat();
	            if ($version >= 19) {
	                $skinMesh.tittleHeight = byte.readFloat();
	            }
	            else {
	                $skinMesh.tittleHeight = 50;
	            }
	            $skinMesh.hitBox = new Pan3d.Vector2D(20, 20);
	            if ($version >= 23) {
	                $skinMesh.hitBox.x = byte.readFloat();
	                $skinMesh.hitBox.y = byte.readFloat();
	            }
	            $skinMesh.makeHitBoxItem();
	            var meshNum = byte.readInt();
	            var allParticleDic = new Object;
	            for (var i = 0; i < meshNum; i++) {
	                var meshData = new Pan3d.MeshData(this.scene3D);
	                if ($version >= 35) {
	                    meshData.bindPosAry = this.readBindPosByte(byte);
	                    meshData.getBindPosMatrix();
	                }
	                if ($version >= 21) {
	                    this.readMesh2OneBuffer(byte, meshData);
	                }
	                meshData.treNum = meshData.indexs.length;
	                // if ($batchNum != 1) {
	                //     this.cloneMeshData(meshData, $batchNum);
	                // }
	                meshData.materialUrl = byte.readUTF();
	                meshData.materialParamData = Pan3d.BaseRes.readMaterialParamData(byte);
	                var particleNum = byte.readInt();
	                for (var j = 0; j < particleNum; j++) {
	                    var bindParticle = new Pan3d.BindParticle(byte.readUTF(), byte.readUTF());
	                    meshData.particleAry.push(bindParticle);
	                    allParticleDic[bindParticle.url] = true;
	                }
	                $skinMesh.addMesh(meshData);
	            }
	            for (var key in allParticleDic) {
	                this.scene3D.particleManager.registerUrl(key);
	            }
	            $skinMesh.allParticleDic = allParticleDic;
	            if ($version < 35) { //多个MESH出错后情况
	                var bindPosAry = this.readBindPosByte(byte);
	                for (var w = 0; w < $skinMesh.meshAry.length; w++) {
	                    $skinMesh.meshAry[w].bindPosAry = bindPosAry;
	                    $skinMesh.meshAry[w].getBindPosMatrix();
	                }
	            }
	            var sokcetLenght = byte.readInt();
	            $skinMesh.boneSocketDic = new Object();
	            for (var j = 0; j < sokcetLenght; j++) {
	                var boneData = new Pan3d.BoneSocketData();
	                boneData.name = byte.readUTF();
	                boneData.boneName = byte.readUTF();
	                boneData.index = byte.readInt();
	                boneData.x = byte.readFloat();
	                boneData.y = byte.readFloat();
	                boneData.z = byte.readFloat();
	                boneData.rotationX = byte.readFloat();
	                boneData.rotationY = byte.readFloat();
	                boneData.rotationZ = byte.readFloat();
	                $skinMesh.boneSocketDic[boneData.name] = boneData;
	            }
	            this.dic[$url] = $skinMesh;
	            return $skinMesh;
	        };
	        MeshDataManager.prototype.readMesh2OneBuffer = function (byte, meshData) {
	            var len = byte.readInt();
	            var typeItem = new Array;
	            var dataWidth = 0;
	            for (var i = 0; i < 5; i++) {
	                var tf = byte.readBoolean();
	                typeItem.push(tf);
	                if (tf) {
	                    if (i == 1) {
	                        dataWidth += 2;
	                    }
	                    else {
	                        dataWidth += 3;
	                    }
	                }
	            }
	            dataWidth += 8;
	            len *= dataWidth * 4;
	            var uvsOffsets = 3; // 1
	            var normalsOffsets = uvsOffsets + 2; // 2
	            var tangentsOffsets = normalsOffsets + 3; //3
	            var bitangentsOffsets = tangentsOffsets + 3; //4
	            var boneIDOffsets;
	            if (typeItem[2]) { //normal
	                if (typeItem[4]) {
	                    boneIDOffsets = bitangentsOffsets + 3;
	                }
	                else {
	                    boneIDOffsets = normalsOffsets + 3;
	                }
	            }
	            else {
	                boneIDOffsets = uvsOffsets + 2;
	            }
	            var boneWeightOffsets = boneIDOffsets + 4;
	            var arybuff = new ArrayBuffer(len);
	            var data = new DataView(arybuff);
	            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, 0, dataWidth); //vertices
	            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 2, uvsOffsets, dataWidth); //uvs
	            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, normalsOffsets, dataWidth); //normals
	            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, tangentsOffsets, dataWidth); //tangents
	            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 3, bitangentsOffsets, dataWidth); //bitangents
	            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 4, boneIDOffsets, dataWidth, 2); //boneIDAry
	            Pan3d.BaseRes.readBytes2ArrayBuffer(byte, data, 4, boneWeightOffsets, dataWidth, 1); //boneWeightAry
	            // BaseRes.readFloatTwoByte(byte, meshData.vertices);
	            // BaseRes.readFloatTwoByte(byte, meshData.uvs);
	            // BaseRes.readFloatTwoByte(byte, meshData.normals);
	            // BaseRes.readFloatTwoByte(byte, meshData.tangents);
	            // BaseRes.readFloatTwoByte(byte, meshData.bitangents);
	            // BaseRes.readIntForOneByte(byte, meshData.boneIDAry);
	            // BaseRes.readFloatOneByte(byte, meshData.boneWeightAry);
	            Pan3d.BaseRes.readIntForTwoByte(byte, meshData.indexs);
	            Pan3d.BaseRes.readIntForTwoByte(byte, meshData.boneNewIDAry);
	            meshData.compressBuffer = true;
	            meshData.uvsOffsets = uvsOffsets * 4;
	            meshData.normalsOffsets = normalsOffsets * 4;
	            meshData.tangentsOffsets = tangentsOffsets * 4;
	            meshData.bitangentsOffsets = bitangentsOffsets * 4;
	            meshData.boneIDOffsets = boneIDOffsets * 4;
	            meshData.boneWeightOffsets = boneWeightOffsets * 4;
	            meshData.stride = dataWidth * 4;
	            var ctx = this.scene3D.context3D;
	            meshData.vertexBuffer = ctx.uploadBuff3DArrayBuffer(arybuff);
	            meshData.indexBuffer = ctx.uploadIndexBuff3D(meshData.indexs);
	        };
	        MeshDataManager.prototype.readBindPosByte = function (byte) {
	            var bindPosLength = byte.readInt();
	            var bindPosAry = new Array;
	            for (var j = 0; j < bindPosLength; j++) {
	                var ary = new Array(byte.readFloat(), byte.readFloat(), byte.readFloat(), byte.readFloat(), byte.readFloat(), byte.readFloat());
	                bindPosAry.push(ary);
	            }
	            return bindPosAry;
	        };
	        return MeshDataManager;
	    }(Pan3d.ResGC));
	    Pan3d.MeshDataManager = MeshDataManager;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=MeshDataManager.js.map

/***/ }),
/* 123 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var AnimManager = /** @class */ (function (_super) {
	        __extends(AnimManager, _super);
	        function AnimManager() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        AnimManager.prototype.getAnimDataImmediate = function ($url) {
	            return this.dic[$url];
	        };
	        AnimManager.prototype.readData = function (byte, $url) {
	            var hierarchyList = new Array;
	            var frameAry = new Array;
	            var animData = new Pan3d.AnimData();
	            animData.inLoop = byte.readInt();
	            var numLength = byte.readInt();
	            for (var i = 0; i < numLength; i++) {
	                animData.inter.push(byte.readInt());
	            }
	            numLength = byte.readInt();
	            for (var i = 0; i < numLength; i++) {
	                animData.bounds.push(byte.readVector3D());
	            }
	            animData.nameHeight = byte.readInt();
	            numLength = byte.readInt();
	            for (var i = 0; i < numLength; i++) {
	                var objBone = new Pan3d.ObjectBone();
	                objBone.father = byte.readInt();
	                objBone.changtype = byte.readInt();
	                objBone.startIndex = byte.readInt();
	                objBone.tx = byte.readFloat();
	                objBone.ty = byte.readFloat();
	                objBone.tz = byte.readFloat();
	                objBone.qx = byte.readFloat();
	                objBone.qy = byte.readFloat();
	                objBone.qz = byte.readFloat();
	                hierarchyList.push(objBone);
	            }
	            this.readFrameData(byte, frameAry);
	            numLength = byte.readInt();
	            for (var i = 0; i < numLength; i++) {
	                animData.posAry.push(byte.readVector3D());
	            }
	            animData.matrixAry = this.processFrame(frameAry, hierarchyList);
	            this.dic[$url] = animData;
	            return animData;
	        };
	        AnimManager.prototype.readFrameData = function (byte, frameAry) {
	            var $frameTyeArr = this.readFrameTypeData(byte);
	            var $isStand = byte.readBoolean(); //是否为站立，这里特殊给站立的旋转设置其权重值不压缩
	            var $scaleNum = byte.readFloat();
	            var numLength = byte.readInt();
	            for (var i = 0; i < numLength; i++) {
	                var frameItemAryLength = byte.readInt();
	                var frameItemAry = new Array;
	                frameAry.push(frameItemAry);
	                for (var j = 0; j < frameItemAryLength; j++) {
	                    if ($frameTyeArr[j]) {
	                        frameItemAry.push(byte.readFloatTwoByte($scaleNum));
	                    }
	                    else {
	                        if ($isStand) { //注意这里的特殊，针对站立时的旋转精度用浮点
	                            frameItemAry.push(byte.readFloat());
	                        }
	                        else {
	                            frameItemAry.push(byte.readShort() / 32767);
	                        }
	                    }
	                }
	            }
	        };
	        AnimManager.prototype.readFrameTypeData = function (byte) {
	            var $arr = new Array;
	            var numLength = byte.readInt();
	            for (var i = 0; i < numLength; i++) {
	                $arr.push(byte.readBoolean());
	            }
	            return $arr;
	        };
	        AnimManager.prototype.processFrame = function (frameAry, hierarchyList) {
	            var newFrameAry = new Array;
	            for (var i = 0; i < frameAry.length; i++) {
	                newFrameAry.push(this.frameToBone(frameAry[i], hierarchyList));
	            }
	            return this.setFrameToMatrix(newFrameAry);
	        };
	        AnimManager.prototype.frameToBone = function (frameData, hierarchyList) {
	            var _arr = new Array;
	            for (var i = 0; i < hierarchyList.length; i++) {
	                var _temp = new Pan3d.ObjectBaseBone();
	                _temp.father = hierarchyList[i].father;
	                var k = 0;
	                if (hierarchyList[i].changtype & 1) {
	                    _temp.tx = frameData[hierarchyList[i].startIndex + k];
	                    ++k;
	                }
	                else {
	                    _temp.tx = hierarchyList[i].tx;
	                }
	                if (hierarchyList[i].changtype & 2) {
	                    _temp.ty = frameData[hierarchyList[i].startIndex + k];
	                    ++k;
	                }
	                else {
	                    _temp.ty = hierarchyList[i].ty;
	                }
	                if (hierarchyList[i].changtype & 4) {
	                    _temp.tz = frameData[hierarchyList[i].startIndex + k];
	                    ++k;
	                }
	                else {
	                    _temp.tz = hierarchyList[i].tz;
	                }
	                if (hierarchyList[i].changtype & 8) {
	                    _temp.qx = frameData[hierarchyList[i].startIndex + k];
	                    ++k;
	                }
	                else {
	                    _temp.qx = hierarchyList[i].qx;
	                }
	                if (hierarchyList[i].changtype & 16) {
	                    _temp.qy = frameData[hierarchyList[i].startIndex + k];
	                    ++k;
	                }
	                else {
	                    _temp.qy = hierarchyList[i].qy;
	                }
	                if (hierarchyList[i].changtype & 32) {
	                    _temp.qz = frameData[hierarchyList[i].startIndex + k];
	                    ++k;
	                }
	                else {
	                    _temp.qz = hierarchyList[i].qz;
	                }
	                _arr.push(_temp);
	            }
	            return _arr;
	        };
	        AnimManager.prototype.setFrameToMatrix = function (frameAry) {
	            var matrixAry = new Array;
	            for (var j = 0; j < frameAry.length; j++) {
	                var boneAry = frameAry[j];
	                var Q0 = new Pan3d.Quaternion();
	                var newM = new Pan3d.Matrix3D();
	                var frameMatrixAry = new Array;
	                matrixAry.push(frameMatrixAry);
	                for (var i = 0; i < boneAry.length; i++) {
	                    var xyzfarme0 = boneAry[i];
	                    Q0 = new Pan3d.Quaternion(xyzfarme0.qx, xyzfarme0.qy, xyzfarme0.qz);
	                    Q0.w = this.getW(Q0.x, Q0.y, Q0.z);
	                    if (xyzfarme0.father == -1) {
	                        newM = Q0.toMatrix3D();
	                        newM.appendTranslation(xyzfarme0.tx, xyzfarme0.ty, xyzfarme0.tz);
	                        newM.appendRotation(-90, Pan3d.Vector3D.X_AXIS);
	                        //xyzfarme0.matrix = newM;
	                        frameMatrixAry.push(newM);
	                    }
	                    else {
	                        var fatherBone = boneAry[xyzfarme0.father];
	                        newM = Q0.toMatrix3D();
	                        newM.appendTranslation(xyzfarme0.tx, xyzfarme0.ty, xyzfarme0.tz);
	                        //newM.append(fatherBone.matrix);
	                        newM.append(frameMatrixAry[xyzfarme0.father]);
	                        frameMatrixAry.push(newM);
	                        //xyzfarme0.matrix = newM;
	                    }
	                }
	                for (i = 0; i < frameMatrixAry.length; i++) {
	                    frameMatrixAry[i].appendScale(-1, 1, 1); //特别标记，因为四元数和矩阵运算结果不一  先存正确的矩阵
	                    //xyzfarme0.matrix.appendScale(-1, 1, 1);
	                }
	            }
	            return matrixAry;
	        };
	        AnimManager.prototype.getW = function (x, y, z) {
	            var t = 1 - (x * x + y * y + z * z);
	            if (t < 0) {
	                t = 0;
	            }
	            else {
	                t = -Math.sqrt(t);
	            }
	            return t;
	        };
	        return AnimManager;
	    }(Pan3d.ResGC));
	    Pan3d.AnimManager = AnimManager;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=AnimManager.js.map

/***/ }),
/* 124 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var DirectShadowDisplay3DShader = /** @class */ (function (_super) {
	        __extends(DirectShadowDisplay3DShader, _super);
	        function DirectShadowDisplay3DShader() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        DirectShadowDisplay3DShader.prototype.binLocation = function ($context) {
	            $context.bindAttribLocation(this.program, 0, "v3Position");
	            $context.bindAttribLocation(this.program, 1, "v2CubeTexST");
	            $context.bindAttribLocation(this.program, 2, "v3Normal");
	        };
	        DirectShadowDisplay3DShader.prototype.getVertexShaderString = function () {
	            var $str = "attribute vec3 v3Position;" +
	                "attribute vec2 v2CubeTexST;" +
	                "varying vec2 v0;" +
	                "varying vec3 v_PositionFromLight;" +
	                "varying vec3 v2;" +
	                "varying float cosTheta;" +
	                "varying float onsunFace;" +
	                "varying vec3 ambientColorF;" +
	                "attribute vec3 v3Normal;" +
	                "uniform vec3 sunDirect;" +
	                "uniform vec3 sunColor;" +
	                "uniform vec3 ambientColor;" +
	                "uniform mat4 vpMatrix3D;" +
	                "uniform mat4 posMatrix3D;" +
	                "uniform mat4 shadowViewMatx3D;" +
	                "uniform mat3 rotationMatrix3D;" +
	                "void main(void){;" +
	                "ambientColorF =ambientColor;" +
	                "v0 = vec2(v2CubeTexST.x, v2CubeTexST.y); " +
	                "vec4 vt0= vec4(v3Position, 1.0);" +
	                "vt0 = posMatrix3D * vt0;" +
	                "vt0 = vpMatrix3D * vt0;" +
	                "   vec4 vt1= vec4(v3Position, 1.0);" +
	                "   vt1 = posMatrix3D * vt1;" +
	                "   vt1 = shadowViewMatx3D * vt1;" +
	                "   v_PositionFromLight = vec3(vt1.x, vt1.y,vt1.z);" +
	                "vec3 n = rotationMatrix3D * v3Normal;" +
	                "float suncos = dot(n.xyz,sunDirect.xyz);" +
	                "onsunFace = suncos;" +
	                "cosTheta =1.0-abs(suncos);" +
	                "suncos = clamp(suncos,0.0,1.0);" +
	                "v2 = sunColor * suncos ;" +
	                "gl_Position = vt0;" +
	                "}";
	            return $str;
	        };
	        /*
	              private toNum(vect: Vector3D): number
	          {
	              var $a: number = vect.x * 256;
	              var $b: number = vect.y * 256;
	              var $bnum:number=($a * 256 + $b) / 65536
	              console.log("$bnum",$bnum)
	              return ($a * 256 + $b) / 65536
	          }
	          */
	        DirectShadowDisplay3DShader.prototype.getFragmentShaderString = function () {
	            var $str = "precision mediump float;\n" +
	                "uniform sampler2D fs0;\n" +
	                "uniform sampler2D fs1;\n" +
	                "varying vec2 v0;\n" +
	                "varying vec3 v_PositionFromLight;\n" +
	                "varying vec3 v2;" +
	                "varying float cosTheta;" +
	                "varying float onsunFace;" +
	                "varying vec3 ambientColorF;" +
	                "float toNum(vec4 vect){\n" +
	                "float a= vect.x * 255.0;\n" +
	                "float b= vect.y * 255.0;\n" +
	                "return  (a * 255.0 + b) / (255.0*255.0);\n" +
	                " }\n" +
	                "float getuvvisible(vec2 uvpos,float uvbias){\n" +
	                "vec4 uvft5 = texture2D(fs1, uvpos.xy); " + //深度图采样
	                "float uvdephz  =toNum(uvft5); " +
	                "float uvvisibility = (v_PositionFromLight.z > uvdephz + uvbias) ? 0.9 : 1.0;\n" + //深度判断
	                "return  uvvisibility;\n" +
	                " }\n" +
	                "float getDistens(vec2 dppos){\n" +
	                "float tempz=sqrt(dppos.x*dppos.x+dppos.y*dppos.y) ;\n" +
	                "return clamp(tempz*1.0, 0.0, 1.0);\n" +
	                " }\n" +
	                "void main(void)\n" +
	                "{\n" +
	                "float  bias  = 0.001*cosTheta; " +
	                "bias = clamp(bias, 0.001, 0.01); " +
	                "float thxy  = 1.0/1024.0; " +
	                "vec2 dphuvpos  = vec2(v_PositionFromLight.x, v_PositionFromLight.y); " +
	                "float totalnum =getuvvisible(vec2(dphuvpos.x, dphuvpos.y),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(dphuvpos.x+thxy, dphuvpos.y),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(dphuvpos.x-thxy, dphuvpos.y),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(dphuvpos.x, dphuvpos.y+thxy),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(dphuvpos.x, dphuvpos.y-thxy),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(dphuvpos.x+thxy, dphuvpos.y+thxy),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(dphuvpos.x+thxy, dphuvpos.y-thxy),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(dphuvpos.x-thxy, dphuvpos.y+thxy),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(dphuvpos.x-thxy, dphuvpos.y-thxy),bias) ; " +
	                "float disnum =getDistens(vec2(dphuvpos.x-0.5, dphuvpos.y-0.5)*2.0); " +
	                "float visibility =onsunFace<0.0?1.0:totalnum ; " +
	                "if (disnum > 0.0) {\n" +
	                "     float bbc=clamp((disnum-0.8),0.0,0.2)*5.0;\n" +
	                "      bbc=(1.0-visibility)*(1.0-bbc);\n" +
	                "     visibility=1.0-bbc;\n" +
	                "}\n" +
	                "vec4 ft0 = texture2D(fs0, v0); " + //正常纹理采样
	                "vec4 ft1 = vec4(v2.xyz, 1.0); " + //法线值
	                "gl_FragColor = vec4((ft1.xyz*visibility+ambientColorF.xyz)*ft0.xyz , 1.0); " +
	                "if (disnum >= 1.0) {\n" +
	                //    "gl_FragColor = vec4(1.0,0.0,0.0 , 1.0); " +
	                "}\n" +
	                "}";
	            return $str;
	        };
	        DirectShadowDisplay3DShader.DirectShadowDisplay3DShader = "DirectShadowDisplay3DShader";
	        return DirectShadowDisplay3DShader;
	    }(Pan3d.Shader3D));
	    Pan3d.DirectShadowDisplay3DShader = DirectShadowDisplay3DShader;
	    var DirectShadowDisplay3DSprite = /** @class */ (function (_super) {
	        __extends(DirectShadowDisplay3DSprite, _super);
	        function DirectShadowDisplay3DSprite(value) {
	            var _this = _super.call(this, value) || this;
	            _this.nrmFlag = 0;
	            _this.initData();
	            _this.makeDefaulWith();
	            return _this;
	        }
	        DirectShadowDisplay3DSprite.prototype.initData = function () {
	            this.scene3D.progrmaManager.registe(DirectShadowDisplay3DShader.DirectShadowDisplay3DShader, new DirectShadowDisplay3DShader(this.scene3D));
	            this.modelShder = this.scene3D.progrmaManager.getProgram(DirectShadowDisplay3DShader.DirectShadowDisplay3DShader);
	        };
	        DirectShadowDisplay3DSprite.prototype.setObjUrl = function (value) {
	            var _this = this;
	            this.scene3D.objDataManager.getObjData(this.scene3D.fileRoot + value, function ($obj) {
	                _this.objData = $obj;
	            });
	        };
	        DirectShadowDisplay3DSprite.prototype.update = function () {
	            for (var i = 0; this.groupItem && i < this.groupItem.length; i++) {
	                if (this.groupItem[i]) {
	                    this.drawTemp(this.groupItem[i]);
	                }
	            }
	        };
	        DirectShadowDisplay3DSprite.prototype.drawTemp = function ($dis) {
	            /*
	                    if (!Scene_data.fbo || !ShadowModel.shadowViewMatx3D) {
	                        return;
	                    }
	                    var $objdata: ObjData = $dis.objData;
	                    var $shader: Shader3D = this.modelShder;
	                    if ($objdata && $objdata.indexBuffer && $dis.baseTexture) {
	                        Scene_data.context3D.setProgram($shader.program);
	            
	            
	                        Scene_data.context3D.setVc3fv($shader, "sunDirect", Scene_data.light.sunDirect);
	                        Scene_data.context3D.setVc3fv($shader, "sunColor", Scene_data.light.sunColor);
	                        Scene_data.context3D.setVc3fv($shader, "ambientColor", Scene_data.light.ambientColor);
	            
	                        Scene_data.context3D.setVcMatrix4fv($shader, "shadowViewMatx3D", ShadowModel.shadowViewMatx3D.m);
	                        Scene_data.context3D.setVcMatrix3fv($shader, "rotationMatrix3D", $dis._rotationData);
	                        Scene_data.context3D.setVcMatrix4fv($shader, "vpMatrix3D", Scene_data.vpMatrix.m);
	                        Scene_data.context3D.setVcMatrix4fv($shader, "posMatrix3D", this.posMatrix.m);
	            
	                        Scene_data.context3D.renderContext.bindBuffer(Scene_data.context3D.renderContext.ARRAY_BUFFER, $objdata.vertexBuffer);
	            
	            
	                        Scene_data.context3D.setVaOffset(0, 3, $objdata.stride, 0);
	                        Scene_data.context3D.setVaOffset(1, 2, $objdata.stride, $objdata.uvsOffsets);
	                        Scene_data.context3D.setVaOffset(2, 3, $objdata.stride, $objdata.normalsOffsets);
	            
	            
	                        if (DirectShadowDisplay3DSprite.showWhiteTexture) {
	                            Scene_data.context3D.setRenderTexture($shader, "fs0", this.defaulWhiteTexture.texture, 0);
	                        } else {
	                            Scene_data.context3D.setRenderTexture($shader, "fs0", $dis.baseTexture.texture, 0);
	                        }
	            
	                        Scene_data.context3D.setRenderTexture($shader, "fs1", Scene_data.fbo.texture, 1);
	                        Scene_data.context3D.drawCall($objdata.indexBuffer, $objdata.treNum);
	            
	            
	                    }
	                    */
	        };
	        DirectShadowDisplay3DSprite.prototype.makeDefaulWith = function () {
	            // var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(128, 128, false);
	            // $ctx.fillStyle = "rgb(255,255,255)";
	            // $ctx.fillRect(0, 0, 128, 128);
	            // this.defaulWhiteTexture = TextureManager.getInstance().getCanvasTexture($ctx)
	        };
	        DirectShadowDisplay3DSprite.prototype.updateRotationMatrix = function () {
	            this._rotationMatrix.identity();
	            this._rotationMatrix.appendRotation(this.rotationX, Pan3d.Vector3D.X_AXIS);
	            this._rotationMatrix.appendRotation(this.rotationY, Pan3d.Vector3D.Y_AXIS);
	            this._rotationMatrix.appendRotation(this.rotationZ, Pan3d.Vector3D.Z_AXIS);
	            if (this.offsetDis) {
	                var $m = new Pan3d.Matrix3D;
	                $m.appendRotation(this.offsetDis.rotationX, Pan3d.Vector3D.X_AXIS);
	                $m.appendRotation(this.offsetDis.rotationY, Pan3d.Vector3D.Y_AXIS);
	                $m.appendRotation(this.offsetDis.rotationZ, Pan3d.Vector3D.Z_AXIS);
	                this._rotationMatrix.prepend($m);
	            }
	            if (this._rotationData) {
	                this._rotationMatrix.getRotaion(this._rotationData);
	            }
	            for (var i = 0; this.groupItem && i < this.groupItem.length; i++) {
	                var $dis = this.groupItem[i];
	                if ($dis && $dis._rotationData) {
	                    if ($dis._rotationData) {
	                        this._rotationMatrix.getRotaion($dis._rotationData);
	                    }
	                }
	            }
	        };
	        DirectShadowDisplay3DSprite.prototype.setModelById = function ($str) {
	            var _this = this;
	            this.groupItem = new Array();
	            this.scene3D.groupDataManager.getGroupData(this.scene3D.fileRoot + getModelUrl($str), function (groupRes) {
	                for (var i = 0; i < groupRes.dataAry.length; i++) {
	                    var item = groupRes.dataAry[i];
	                    if (item.types == Pan3d.BaseRes.PREFAB_TYPE) {
	                        var $dis = new Pan3d.Display3DSprite(_this.scene3D);
	                        $dis.setObjUrl(item.objUrl);
	                        $dis._rotationData = new Float32Array(9);
	                        _this.groupItem.push($dis);
	                        if (item.materialInfoArr && item.materialInfoArr.length) {
	                            $dis.setPicUrl(item.materialInfoArr[0].url);
	                        }
	                        else {
	                            console.log("没有指定贴图");
	                        }
	                    }
	                }
	                _this.updateRotationMatrix();
	            });
	        };
	        DirectShadowDisplay3DSprite.showWhiteTexture = true;
	        return DirectShadowDisplay3DSprite;
	    }(Pan3d.Display3DSprite));
	    Pan3d.DirectShadowDisplay3DSprite = DirectShadowDisplay3DSprite;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=DirectShadowDisplay3DSprite.js.map

/***/ }),
/* 125 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var FrameBuildShader = /** @class */ (function (_super) {
	        __extends(FrameBuildShader, _super);
	        function FrameBuildShader(value) {
	            return _super.call(this, value) || this;
	        }
	        FrameBuildShader.prototype.binLocation = function (gl) {
	            gl.bindAttribLocation(this.program, 0, "v3Position");
	            gl.bindAttribLocation(this.program, 1, "u2Texture");
	        };
	        FrameBuildShader.prototype.getVertexShaderString = function () {
	            var $str = "attribute vec3 v3Position;" +
	                "attribute vec2 u2Texture;" +
	                "varying vec2 v_texCoord;" +
	                "uniform mat4 vpMatrix3D;\n" +
	                "uniform mat4 posMatrix;\n" +
	                "void main(void)" +
	                "{" +
	                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
	                "   vec4 vt0= vec4(v3Position, 1.0);" +
	                "   gl_Position =vpMatrix3D*posMatrix* vt0;" +
	                "}";
	            return $str;
	        };
	        FrameBuildShader.prototype.getFragmentShaderString = function () {
	            var $str = "precision mediump float;\n" +
	                "varying vec2 v_texCoord;\n" +
	                "uniform sampler2D fs0;" +
	                "void main(void)\n" +
	                "{\n" +
	                "vec4 infoUv = texture2D(fs0, v_texCoord.xy);\n" +
	                "gl_FragColor =infoUv;\n" +
	                "}";
	            return $str;
	        };
	        FrameBuildShader.FrameBuildShader = "FrameBuildShader";
	        return FrameBuildShader;
	    }(Pan3d.Shader3D));
	    Pan3d.FrameBuildShader = FrameBuildShader;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=FrameBuildShader.js.map

/***/ }),
/* 126 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var FrameBuildSprite = /** @class */ (function (_super) {
	        __extends(FrameBuildSprite, _super);
	        function FrameBuildSprite(value) {
	            var _this = _super.call(this, value) || this;
	            _this.scene3D.progrmaManager.registe(Pan3d.FrameBuildShader.FrameBuildShader, new Pan3d.FrameBuildShader(_this.scene3D));
	            _this.shader3D = _this.scene3D.progrmaManager.getProgram(Pan3d.FrameBuildShader.FrameBuildShader);
	            return _this;
	        }
	        FrameBuildSprite.prototype.setFrameNodeUrl = function ($vo) {
	            this.groupItem = new Array();
	            var $dis = new Pan3d.Display3DSprite(this.scene3D);
	            $dis._rotationData = new Float32Array(9);
	            $dis.setObjUrl($vo.resurl);
	            $dis.setLighturl($vo.materialInfoArr[0].url);
	            $dis.sceneVisible = false;
	            this.groupItem.push($dis);
	        };
	        FrameBuildSprite.prototype.upFrame = function () {
	            for (var i = 0; this.groupItem && i < this.groupItem.length; i++) {
	                if (this.groupItem[i]) {
	                    this.drawTemp(this.groupItem[i]);
	                }
	            }
	        };
	        FrameBuildSprite.prototype.drawTemp = function (dis) {
	            if (!dis.lightTextureRes || !dis.objData) {
	                return;
	            }
	            this.updateMatrix();
	            var tempObjData = dis.objData;
	            var ctx = this.scene3D.context3D;
	            var gl = ctx.webGlRender;
	            ctx.setProgram(this.shader3D.program);
	            gl.bindBuffer(gl.ARRAY_BUFFER, tempObjData.vertexBuffer);
	            ctx.setVaOffset(0, 3, tempObjData.stride, 0);
	            ctx.setVaOffset(1, 2, tempObjData.stride, tempObjData.uvsOffsets);
	            ctx.setRenderTexture(this.shader3D, "fs0", dis.lightTextureRes.texture, 0);
	            ctx.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
	            ctx.setVcMatrix4fv(this.shader3D, "posMatrix", this.posMatrix.m);
	            ctx.drawCall(tempObjData.indexBuffer, tempObjData.treNum);
	            console.log(dis.lightTextureRes.texture);
	        };
	        return FrameBuildSprite;
	    }(Pan3d.Display3D));
	    Pan3d.FrameBuildSprite = FrameBuildSprite;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=FrameBuildSprite.js.map

/***/ }),
/* 127 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var LightBmpModel = /** @class */ (function () {
	        function LightBmpModel() {
	        }
	        LightBmpModel.getInstance = function () {
	            if (!this._instance) {
	                this._instance = new LightBmpModel();
	            }
	            return this._instance;
	        };
	        LightBmpModel.prototype.upLightTexture = function ($frameVoItem) {
	            /*
	            var $frame: number = Math.floor(Frame3dRes.frameNum)
	            for (var i: number = 0; $frameVoItem && i < $frameVoItem.length; i++) {
	                var $node: FrameFileNode = $frameVoItem[i]
	                var $isVisible: boolean = $node.isVisible($frame);
	                if ($isVisible && !$node.frameNodeVo.noLight) {
	                    var $dis: LightDisplay3DSprite = <LightDisplay3DSprite>$node.sprite;
	                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(1024, 1024, false);
	                    $ctx.drawImage(this.videoElem, 0, 0, this.videoElem.videoWidth, this.videoElem.videoHeight, 0, 0, 1024, 1024);
	                    if (!this.videoTextureRes) {
	                        this.videoTextureRes = TextureManager.getInstance().getCanvasTexture($ctx);
	                    }
	                    TextureManager.getInstance().updateTexture(this.videoTextureRes.texture, 0, 0, $ctx);
	                    $dis.lightMapTextureRes = this.videoTextureRes;
	                    this.setVdeoLightUvData($node, $frame);
	                }
	            }
	            */
	        };
	        LightBmpModel.prototype.setVdeoLightUvData = function ($node, $frame) {
	            if (this.videoLightUvData) {
	                for (var i = 0; i < this.videoLightUvData[$frame].length; i++) {
	                    var $obj = this.videoLightUvData[$frame][i];
	                    if ($obj.id == $node.frameNodeVo.id) {
	                        if ($node.frameNodeVo.receiveShadow) {
	                            var $disA = $node.sprite;
	                            $disA.uxtxData[0] = $obj.width / 1024;
	                            $disA.uxtxData[1] = $obj.height / 1024;
	                            $disA.uxtxData[2] = $obj.x / 1024;
	                            $disA.uxtxData[3] = $obj.y / 1024;
	                        }
	                        else {
	                            var $dis = $node.sprite;
	                            $dis.uxtxData[0] = $obj.width / 1024;
	                            $dis.uxtxData[1] = $obj.height / 1024;
	                            $dis.uxtxData[2] = $obj.x / 1024;
	                            $dis.uxtxData[3] = $obj.y / 1024;
	                        }
	                    }
	                }
	            }
	        };
	        LightBmpModel.prototype.getLightKeyFrmeArr = function ($arr) {
	            var $dis = new Pan3d.Dictionary([]);
	            for (var i = 0; i < $arr.length; i++) {
	                for (var j = 0; j < $arr[i].frameNodeVo.pointitem.length; j++) {
	                    if ($arr[i].frameNodeVo.pointitem[j].iskeyFrame && j == 0) {
	                        var $frmeNum = $arr[i].frameNodeVo.pointitem[j].time;
	                        $dis[$frmeNum] = true;
	                    }
	                }
	            }
	            var $listNum = new Array;
	            for (var $key in $dis) {
	                if (!isNaN(Number($key))) {
	                    $listNum.push(Number($key));
	                }
	            }
	            return $listNum;
	        };
	        return LightBmpModel;
	    }());
	    Pan3d.LightBmpModel = LightBmpModel;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=LightBmpModel.js.map

/***/ }),
/* 128 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var LightDisplay3DShader = /** @class */ (function (_super) {
	        __extends(LightDisplay3DShader, _super);
	        function LightDisplay3DShader() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        LightDisplay3DShader.prototype.binLocation = function ($context) {
	            $context.bindAttribLocation(this.program, 0, "v3Position");
	            $context.bindAttribLocation(this.program, 1, "u2Texture");
	        };
	        LightDisplay3DShader.prototype.getVertexShaderString = function () {
	            var $str = "attribute vec3 v3Position;" +
	                "attribute vec2 u2Texture;" +
	                "attribute vec2 lightPosition;" +
	                "uniform mat4 vpMatrix3D;" +
	                "uniform mat4 posMatrix3D;" +
	                "uniform vec4 uvtx;\n" +
	                "varying vec2 v_texCoord;" +
	                "varying vec2 v_lightCoord;" +
	                "varying vec4 v_uvtx;" +
	                "void main(void)" +
	                "{" +
	                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
	                "   v_lightCoord = vec2(lightPosition.x, lightPosition.y);" +
	                "   v_uvtx = uvtx;" +
	                "   vec4 vt0= vec4(v3Position, 1.0);" +
	                "   vt0 = posMatrix3D * vt0;" +
	                "   vt0 = vpMatrix3D * vt0;" +
	                "   gl_Position = vt0;" +
	                "}";
	            return $str;
	        };
	        LightDisplay3DShader.prototype.getFragmentShaderString = function () {
	            var $str = "precision mediump float;\n" +
	                "uniform sampler2D s_texture;\n" +
	                "uniform sampler2D l_texture;\n" +
	                "varying vec2 v_texCoord;" +
	                "varying vec2 v_lightCoord;" +
	                "varying vec4 v_uvtx;" +
	                "void main(void)\n" +
	                "{\n" +
	                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
	                "vec4 lightUv = texture2D(l_texture, v_lightCoord.xy*v_uvtx.xy+v_uvtx.zw);\n" +
	                "gl_FragColor =infoUv*lightUv*2.0 ;\n" +
	                "}";
	            return $str;
	        };
	        LightDisplay3DShader.LightDisplay3DShader = "LightDisplay3DShader";
	        return LightDisplay3DShader;
	    }(Pan3d.Shader3D));
	    Pan3d.LightDisplay3DShader = LightDisplay3DShader;
	    var LightDisplay3DSprite = /** @class */ (function (_super) {
	        __extends(LightDisplay3DSprite, _super);
	        function LightDisplay3DSprite(value) {
	            var _this = _super.call(this, value) || this;
	            _this.uxtxData = new Float32Array([1, 1, 0, 0]);
	            _this.scene3D.progrmaManager.registe(LightDisplay3DShader.LightDisplay3DShader, new LightDisplay3DShader(_this.scene3D));
	            return _this;
	        }
	        LightDisplay3DSprite.prototype.setFrameNodeUrl = function ($vo) {
	            var $dis = new Pan3d.Display3DSprite(this.scene3D);
	            this.setObjUrl($vo.resurl);
	            this.setPicUrl($vo.materialInfoArr[0].url);
	            this.setLightMapUrl($vo.lighturl);
	            this.shader3D = this.scene3D.progrmaManager.getProgram(LightDisplay3DShader.LightDisplay3DShader);
	        };
	        LightDisplay3DSprite.prototype.setLightMapUrl = function (lighturl) {
	            throw new Error("Method not implemented.");
	        };
	        LightDisplay3DSprite.prototype.update = function () {
	            if (this.objData && this.objData.indexBuffer && this.sceneVisible) {
	                var ctx = this.scene3D.context3D;
	                ctx.setProgram(this.shader3D.program);
	                ctx.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.cam3D.viewMatrix.m);
	                ctx.setVcMatrix4fv(this.shader3D, "posMatrix3D", this.posMatrix.m);
	                ctx.setVc4fv(this.shader3D, "uvtx", this.uxtxData);
	                ctx.webGlRender.bindBuffer(ctx.webGlRender.ARRAY_BUFFER, this.objData.vertexBuffer);
	                ctx.setVaOffset(0, 3, this.objData.stride, 0);
	                ctx.setVaOffset(1, 2, this.objData.stride, this.objData.uvsOffsets);
	                ctx.setVaOffset(2, 2, this.objData.stride, this.objData.lightuvsOffsets);
	                // ctx.setRenderTexture(this.shader3D, "s_texture", this.baseTexture.texture, 0);
	                // ctx.setRenderTexture(this.shader3D, "l_texture", this.lightMapTextureRes.texture, 2);
	                ctx.drawCall(this.objData.indexBuffer, this.objData.treNum);
	            }
	        };
	        return LightDisplay3DSprite;
	    }(Pan3d.Display3DSprite));
	    Pan3d.LightDisplay3DSprite = LightDisplay3DSprite;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=LightDisplay3DSprite.js.map

/***/ }),
/* 129 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var ShadowDisplay3DShader = /** @class */ (function (_super) {
	        __extends(ShadowDisplay3DShader, _super);
	        function ShadowDisplay3DShader() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        ShadowDisplay3DShader.prototype.binLocation = function ($context) {
	            $context.bindAttribLocation(this.program, 0, "v3Position");
	            $context.bindAttribLocation(this.program, 1, "u2Texture");
	            $context.bindAttribLocation(this.program, 2, "lightPosition");
	        };
	        ShadowDisplay3DShader.prototype.getVertexShaderString = function () {
	            var $str = "attribute vec3 v3Position;" +
	                "attribute vec2 u2Texture;" +
	                "attribute vec2 lightPosition;" +
	                "uniform mat4 vpMatrix3D;" +
	                "uniform mat4 posMatrix3D;" +
	                "uniform mat4 shadowViewMatx3D;" +
	                "uniform vec4 uvtx;\n" +
	                "varying vec2 v_texCoord;" +
	                "varying vec2 v_lightCoord;" +
	                "varying vec3 v_PositionFromLight;" +
	                "varying vec4 v_uvtx;" +
	                "void main(void)" +
	                "{" +
	                "   v_texCoord = vec2(u2Texture.x, u2Texture.y);" +
	                "   v_lightCoord = vec2(lightPosition.x, lightPosition.y);" +
	                "   v_uvtx = uvtx;" +
	                "   vec4 vt0= vec4(v3Position, 1.0);" +
	                "   vt0 = posMatrix3D * vt0;" +
	                "   vt0 = vpMatrix3D * vt0;" +
	                "   vec4 vt1= vec4(v3Position, 1.0);" +
	                "   vt1 = posMatrix3D * vt1;" +
	                "   vt1 = shadowViewMatx3D * vt1;" +
	                "   v_PositionFromLight = vec3(vt1.x, vt1.y,vt1.z);" +
	                "   gl_Position = vt0;" +
	                "}";
	            return $str;
	        };
	        ShadowDisplay3DShader.prototype.getFragmentShaderString = function () {
	            var $str = "precision mediump float;\n" +
	                "uniform sampler2D s_texture;\n" +
	                "uniform sampler2D depht_texture;\n" +
	                "uniform sampler2D l_texture;\n" +
	                "varying vec2 v_texCoord;" +
	                "varying vec2 v_lightCoord;" +
	                "varying vec3 v_PositionFromLight;" +
	                "varying vec4 v_uvtx;" +
	                "float toNum(vec4 vect){\n" +
	                "float a= vect.x * 255.0;\n" +
	                "float b= vect.y * 255.0;\n" +
	                "return  (a * 255.0 + b) / (255.0*255.0);\n" +
	                " }\n" +
	                "float getuvvisible(vec2 uvpos,float uvbias){\n" +
	                "vec4 uvft5 = texture2D(depht_texture, uvpos.xy); " + //深度图采样
	                "float uvdephz  =toNum(uvft5); " +
	                "float uvvisibility = (v_PositionFromLight.z > uvdephz + uvbias) ? 0.9 : 1.0;\n" + //深度判断
	                "return  uvvisibility;\n" +
	                " }\n" +
	                "void main(void)\n" +
	                "{\n" +
	                "vec4 infoUv = texture2D(s_texture, v_texCoord.xy);\n" +
	                "vec4 lightUv = texture2D(l_texture, v_lightCoord.xy*v_uvtx.xy+v_uvtx.zw);\n" +
	                "float bias  =0.01; " +
	                "float thxy  = 0.0005; " +
	                "float totalnum =getuvvisible(vec2(v_PositionFromLight.x, v_PositionFromLight.y),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(v_PositionFromLight.x+thxy, v_PositionFromLight.y),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(v_PositionFromLight.x-thxy, v_PositionFromLight.y),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(v_PositionFromLight.x, v_PositionFromLight.y+thxy),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(v_PositionFromLight.x, v_PositionFromLight.y-thxy),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(v_PositionFromLight.x+thxy, v_PositionFromLight.y+thxy),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(v_PositionFromLight.x+thxy, v_PositionFromLight.y-thxy),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(v_PositionFromLight.x-thxy, v_PositionFromLight.y+thxy),bias) ; " +
	                "totalnum =totalnum*getuvvisible(vec2(v_PositionFromLight.x-thxy, v_PositionFromLight.y-thxy),bias) ; " +
	                "float visibility = totalnum;\n" + //深度判断
	                "gl_FragColor =infoUv*lightUv*visibility ;\n" +
	                "}";
	            return $str;
	        };
	        ShadowDisplay3DShader.ShadowDisplay3DShader = "ShadowDisplay3DShader";
	        return ShadowDisplay3DShader;
	    }(Pan3d.Shader3D));
	    Pan3d.ShadowDisplay3DShader = ShadowDisplay3DShader;
	    var ShadowDisplay3DSprite = /** @class */ (function (_super) {
	        __extends(ShadowDisplay3DSprite, _super);
	        function ShadowDisplay3DSprite(value) {
	            var _this = _super.call(this, value) || this;
	            _this.uxtxData = new Float32Array([0.5, 0.5, 0, 0]);
	            _this.scene3D.progrmaManager.registe(ShadowDisplay3DShader.ShadowDisplay3DShader, new ShadowDisplay3DShader(_this.scene3D));
	            return _this;
	        }
	        ShadowDisplay3DSprite.prototype.setFrameNodeUrl = function ($vo) {
	            var $dis = new Pan3d.Display3DSprite(this.scene3D);
	            this.setObjUrl($vo.resurl);
	            this.setPicUrl($vo.materialInfoArr[0].url);
	            this.setLightMapUrl($vo.lighturl);
	            this.shader3D = this.scene3D.progrmaManager.getProgram(ShadowDisplay3DShader.ShadowDisplay3DShader);
	        };
	        ShadowDisplay3DSprite.prototype.setLightMapUrl = function (lighturl) {
	            throw new Error("Method not implemented.");
	        };
	        ShadowDisplay3DSprite.prototype.update = function () {
	            if (this.objData && this.objData.indexBuffer) {
	                var ctx = this.scene3D.context3D;
	                ctx.setProgram(this.shader3D.program);
	                ctx.setVcMatrix4fv(this.shader3D, "vpMatrix3D", this.scene3D.cam3D.viewMatrix.m);
	                ctx.setVcMatrix4fv(this.shader3D, "posMatrix3D", this.posMatrix.m);
	                // ctx.setVcMatrix4fv(this.shader3D, "shadowViewMatx3D", ShadowModel.shadowViewMatx3D.m);
	                ctx.setVc4fv(this.shader3D, "uvtx", this.uxtxData);
	                ctx.webGlRender.bindBuffer(ctx.webGlRender.ARRAY_BUFFER, this.objData.vertexBuffer);
	                ctx.setVaOffset(0, 3, this.objData.stride, 0);
	                ctx.setVaOffset(1, 2, this.objData.stride, this.objData.uvsOffsets);
	                ctx.setVaOffset(2, 2, this.objData.stride, this.objData.lightuvsOffsets);
	                // ctx.setRenderTexture(this.shader3D, "s_texture", this.baseTexture.texture, 0);
	                // ctx.setRenderTexture(this.shader3D, "depht_texture", Scene_data.fbo.texture, 1);
	                // ctx.setRenderTexture(this.shader3D, "l_texture", this.lightMapTextureRes.texture, 2);
	                ctx.drawCall(this.objData.indexBuffer, this.objData.treNum);
	            }
	        };
	        return ShadowDisplay3DSprite;
	    }(Pan3d.Display3DSprite));
	    Pan3d.ShadowDisplay3DSprite = ShadowDisplay3DSprite;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ShadowDisplay3DSprite.js.map

/***/ }),
/* 130 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var FrameFileNode = /** @class */ (function (_super) {
	        __extends(FrameFileNode, _super);
	        function FrameFileNode(value) {
	            var _this = _super.call(this) || this;
	            _this.scene3D = value;
	            return _this;
	        }
	        FrameFileNode.prototype.setFrameNodeVo = function ($vo) {
	            this.frameNodeVo = $vo;
	            if (this.frameNodeVo.type == 1) {
	                if (this.frameNodeVo.directLight) { //有法线的对象
	                    this._frameBuildSprite = new Pan3d.FrameBuildSprite(this.scene3D);
	                    this._frameBuildSprite.setFrameNodeUrl(this.frameNodeVo);
	                    this.scene3D.addDisplay(this._frameBuildSprite);
	                    this.sprite = this._frameBuildSprite;
	                }
	                else {
	                    if (this.frameNodeVo.receiveShadow) {
	                        this._shadowDisplay3DSprite = new Pan3d.ShadowDisplay3DSprite(this.scene3D);
	                        this._shadowDisplay3DSprite.setFrameNodeUrl(this.frameNodeVo);
	                        this.scene3D.addDisplay(this._shadowDisplay3DSprite);
	                        this.sprite = this._shadowDisplay3DSprite;
	                    }
	                    else {
	                        this._lightSprite = new Pan3d.LightDisplay3DSprite(this.scene3D);
	                        this._lightSprite.setFrameNodeUrl(this.frameNodeVo);
	                        this.scene3D.addDisplay(this._lightSprite);
	                        this.sprite = this._lightSprite;
	                        //this._lightSprite.setObjUrl($vo.resurl);
	                        //this._lightSprite.setMaterialUrl($vo.materialurl, $vo.materialInfoArr);
	                        //this._lightSprite.materialInfoArr = $vo.materialInfoArr
	                        //this._lightSprite.setLightMapUrl($vo.lighturl);
	                    }
	                }
	            }
	            if (this.frameNodeVo.type == 2) {
	                this._particle = this.scene3D.particleManager.getParticleByte(this.scene3D.fileRoot + $vo.resurl);
	                this._particle.dynamic = true;
	                this._particle.sceneVisible = false;
	                this.scene3D.particleManager.addParticle(this._particle);
	                this.sprite = this._particle;
	            }
	            if (this.frameNodeVo.type == 3) {
	                this._sceneChar = new Pan3d.FrameSceneChar(this.scene3D);
	                this._sceneChar.shadow = false;
	                this._sceneChar.setRoleUrl(this.frameNodeVo.resurl);
	                this.scene3D.addMovieDisplay(this._sceneChar);
	                this.sprite = this._sceneChar;
	            }
	        };
	        FrameFileNode.prototype.update = function () {
	            this.sceneVisible = this.isVisible(Pan3d.Frame3dRes.frameNum);
	            if (this.sceneVisible) {
	                this.setModelSprite(this.playFrameVoByTime(Pan3d.Frame3dRes.frameNum));
	            }
	            if (this._particle) {
	                this._particle.sceneVisible = this.sceneVisible;
	            }
	            if (this._frameBuildSprite) {
	                this._frameBuildSprite.sceneVisible = this.sceneVisible;
	            }
	            if (this._lightSprite) {
	                this._lightSprite.sceneVisible = this.sceneVisible;
	            }
	        };
	        FrameFileNode.prototype.playFrameVoByTime = function ($time) {
	            var $keyC;
	            var $a = this.getPreFrameLinePointVoByTime($time);
	            var $b = this.getNextFrameLinePointVoByTime($time);
	            for (var i = 0; i < this.frameNodeVo.pointitem.length; i++) {
	                if (this.frameNodeVo.pointitem[i].time == $time) {
	                    $keyC = this.frameNodeVo.pointitem[i];
	                }
	            }
	            if ($keyC) {
	                if ($keyC.iskeyFrame) {
	                    return $keyC;
	                }
	            }
	            else {
	                if ($a && !$a.isAnimation) {
	                    return $a;
	                }
	                else if ($a && $b) {
	                    return this.setModelData($a, $b, $time);
	                }
	            }
	            return null;
	        };
	        FrameFileNode.prototype.getNextFrameLinePointVoByTime = function ($time) {
	            var $next;
	            for (var i = 0; i < this.frameNodeVo.pointitem.length; i++) {
	                if (this.frameNodeVo.pointitem[i].time >= $time) {
	                    if (!$next || $next.time > this.frameNodeVo.pointitem[i].time) {
	                        $next = this.frameNodeVo.pointitem[i];
	                    }
	                }
	            }
	            return $next;
	        };
	        FrameFileNode.prototype.isVisible = function ($num) {
	            var $min = this.frameNodeVo.pointitem[0].time;
	            var $max = this.frameNodeVo.pointitem[this.frameNodeVo.pointitem.length - 1].time;
	            var dd = this.getPreFrameLinePointVoByTime($num);
	            if ($num >= $min && $num <= $max && dd) {
	                return dd.iskeyFrame;
	            }
	            else {
	                return false;
	            }
	        };
	        FrameFileNode.prototype.getPreFrameLinePointVoByTime = function ($time) {
	            var $pre;
	            for (var i = 0; i < this.frameNodeVo.pointitem.length; i++) {
	                if (this.frameNodeVo.pointitem[i].time <= $time) {
	                    if (!$pre || $pre.time < this.frameNodeVo.pointitem[i].time) {
	                        $pre = this.frameNodeVo.pointitem[i];
	                    }
	                }
	            }
	            return $pre;
	        };
	        FrameFileNode.prototype.setModelData = function ($a, $b, $time) {
	            var $num = ($time - $a.time) / ($b.time - $a.time);
	            var $obj = new Pan3d.FrameLinePointVo;
	            $obj.x = $a.x + ($b.x - $a.x) * $num;
	            $obj.y = $a.y + ($b.y - $a.y) * $num;
	            $obj.z = $a.z + ($b.z - $a.z) * $num;
	            $obj.scaleX = $a.scaleX + ($b.scaleX - $a.scaleX) * $num;
	            $obj.scaleY = $a.scaleY + ($b.scaleY - $a.scaleY) * $num;
	            $obj.scaleZ = $a.scaleZ + ($b.scaleZ - $a.scaleZ) * $num;
	            var $eulerAngle = this.qtoq($a, $b, $num);
	            $obj.rotationX = $eulerAngle.x;
	            $obj.rotationY = $eulerAngle.y;
	            $obj.rotationZ = $eulerAngle.z;
	            $obj.data = $a.data; //存前面一个的数所有 
	            if (!$b.iskeyFrame) {
	                return $a;
	            }
	            else {
	                return $obj;
	            }
	        };
	        FrameFileNode.prototype.setModelSprite = function ($obj) {
	            if (this.sprite) {
	                this.sprite.x = $obj.x;
	                this.sprite.y = $obj.y;
	                this.sprite.z = $obj.z;
	                this.sprite.scaleX = $obj.scaleX;
	                this.sprite.scaleY = $obj.scaleY;
	                this.sprite.scaleZ = $obj.scaleZ;
	                this.sprite.rotationX = $obj.rotationX;
	                this.sprite.rotationY = $obj.rotationY;
	                this.sprite.rotationZ = $obj.rotationZ;
	            }
	            if (this._sceneChar) {
	                if ($obj.data && $obj.data.action) {
	                    if (this._sceneChar.curentAction != $obj.data.action) {
	                        this._sceneChar.play($obj.data.action);
	                    }
	                }
	            }
	        };
	        FrameFileNode.prototype.qtoq = function ($a, $b, $time) {
	            var $m0 = new Pan3d.Matrix3D();
	            $m0.appendRotation($a.rotationX, Pan3d.Vector3D.X_AXIS);
	            $m0.appendRotation($a.rotationY, Pan3d.Vector3D.Y_AXIS);
	            $m0.appendRotation($a.rotationZ, Pan3d.Vector3D.Z_AXIS);
	            var q0 = new Pan3d.Quaternion();
	            q0.fromMatrix($m0);
	            var $m1 = new Pan3d.Matrix3D();
	            $m1.appendRotation($b.rotationX, Pan3d.Vector3D.X_AXIS);
	            $m1.appendRotation($b.rotationY, Pan3d.Vector3D.Y_AXIS);
	            $m1.appendRotation($b.rotationZ, Pan3d.Vector3D.Z_AXIS);
	            var q1 = new Pan3d.Quaternion();
	            q1.fromMatrix($m1);
	            var resultQ = new Pan3d.Quaternion;
	            resultQ.slerp(q0, q1, $time);
	            var $ve = resultQ.toEulerAngles();
	            $ve.scaleBy(180 / Math.PI);
	            if (isNaN($ve.x) || isNaN($ve.y) || isNaN($ve.z)) {
	                $ve.x = $a.rotationX;
	                $ve.y = $a.rotationY;
	                $ve.z = $a.rotationZ;
	            }
	            return $ve;
	        };
	        return FrameFileNode;
	    }(Pan3d.Vector3D));
	    Pan3d.FrameFileNode = FrameFileNode;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=FrameFileNode.js.map

/***/ }),
/* 131 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var FrameLinePointVo = /** @class */ (function (_super) {
	        __extends(FrameLinePointVo, _super);
	        function FrameLinePointVo() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        FrameLinePointVo.prototype.writeObject = function ($obj) {
	            this.time = $obj.time;
	            this.id = $obj.id;
	            this.iskeyFrame = $obj.iskeyFrame;
	            this.isAnimation = $obj.isAnimation;
	            this.x = $obj.x / 10;
	            this.y = $obj.y / 10;
	            this.z = $obj.z / 10;
	            this.scaleX = $obj.scaleX / 10;
	            this.scaleY = $obj.scaleY / 10;
	            this.scaleZ = $obj.scaleZ / 10;
	            this.rotationX = $obj.rotationX;
	            this.rotationY = $obj.rotationY;
	            this.rotationZ = $obj.rotationZ;
	            this.data = $obj.data;
	            FrameLinePointVo.maxTime = Math.max(this.time, FrameLinePointVo.maxTime);
	        };
	        FrameLinePointVo.maxTime = 0;
	        return FrameLinePointVo;
	    }(Pan3d.Object3D));
	    Pan3d.FrameLinePointVo = FrameLinePointVo;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=FrameLinePointVo.js.map

/***/ }),
/* 132 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var FrameNodeVo = /** @class */ (function () {
	        function FrameNodeVo() {
	        }
	        FrameNodeVo.prototype.writeObject = function ($obj) {
	            this.id = $obj.id;
	            this.name = $obj.name;
	            this.url = $obj.url;
	            this.pointitem = new Array;
	            for (var j = 0; j < $obj.pointitem.length; j++) {
	                var $FrameLinePointVo = new Pan3d.FrameLinePointVo();
	                $FrameLinePointVo.writeObject($obj.pointitem[j]);
	                this.pointitem.push($FrameLinePointVo);
	            }
	            this.resurl = $obj.resurl;
	            if (this.url.search(".prefab") != -1) {
	                this.materialInfoArr = new Array;
	                for (var i = 0; $obj.materialInfoArr && i < $obj.materialInfoArr.length; i++) {
	                    this.materialInfoArr.push($obj.materialInfoArr[i]);
	                }
	                this.noLight = $obj.noLight;
	                this.directLight = $obj.directLight;
	                this.receiveShadow = $obj.receiveShadow;
	                if (this.noLight == false) {
	                    this.lighturl = $obj.lighturl;
	                }
	                this.materialurl = $obj.materialurl;
	                this.type = 1;
	            }
	            if (this.url.search(".lyf") != -1) {
	                this.type = 2;
	            }
	            if (this.url.search(".zzw") != -1) {
	                this.type = 3;
	            }
	        };
	        return FrameNodeVo;
	    }());
	    Pan3d.FrameNodeVo = FrameNodeVo;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=FrameNodeVo.js.map

/***/ }),
/* 133 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Frame3dRes = /** @class */ (function (_super) {
	        __extends(Frame3dRes, _super);
	        function Frame3dRes() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        Frame3dRes.prototype.load = function ($url, $completeFun) {
	            var _this = this;
	            this._completeFun = $completeFun;
	            Pan3d.LoadManager.getInstance().load($url, Pan3d.LoadManager.BYTE_TYPE, function ($byte) {
	                _this.loadComplete($byte);
	            }, null);
	        };
	        Frame3dRes.prototype.loadComplete = function ($byte) {
	            var _this = this;
	            this._byte = new Pan3d.Pan3dByteArray($byte);
	            this._byte.position = 0;
	            this.version = this._byte.readInt();
	            if (this.version >= 31) {
	            }
	            var $str = this._byte.readUTF();
	            var $itemstr = $str.split("/");
	            Frame3dRes.sceneFileroot = $str.replace($itemstr[$itemstr.length - 1], "");
	            Frame3dRes.fileName = $itemstr[$itemstr.length - 1];
	            Frame3dRes.frameSpeedNum = this._byte.readInt();
	            console.log("版本", this.version, "frameSpeedNum", Frame3dRes.frameSpeedNum);
	            this.readSceneInfo();
	            this.read(function () { _this.readNext(); }); //img
	        };
	        Frame3dRes.prototype.toVect4 = function ($num) {
	            var temp = Math.floor(65536 * $num);
	            var a = Math.floor(temp / 256);
	            var b = Math.floor(temp - a * 256);
	            return new Pan3d.Vector3D(a / 256, b / 256, 0, 1);
	        };
	        Frame3dRes.prototype.toNum = function (vect) {
	            var $a = vect.x * 256;
	            var $b = vect.y * 256;
	            var $bnum = ($a * 256 + $b) / 65536;
	            console.log("$bnum", $bnum);
	            return ($a * 256 + $b) / 65536;
	        };
	        //收获环境参数
	        Frame3dRes.prototype.readSceneInfo = function () {
	            var size = this._byte.readInt();
	            var $obj = JSON.parse(this._byte.readUTFBytes(size));
	            this.haveVideo = $obj.haveVideo;
	            // Scene_data.light.setData($obj.SunNrm, $obj.SunLigth, $obj.AmbientLight);
	            // LightBmpModel.getInstance().videoLightUvData = $obj.videoLightUvData;
	        };
	        Frame3dRes.prototype.readNext = function () {
	            this.read(); //obj
	            this.read(); //material
	            this.read(); //particle;
	            this.readFrame3dScene();
	        };
	        Frame3dRes.prototype.readFrame3dScene = function () {
	            this.frameItem = new Array;
	            var size = this._byte.readInt();
	            var $scene = JSON.parse(this._byte.readUTFBytes(size));
	            for (var i = 0; i < $scene.length; i++) {
	                var $frameNodeVo = new Pan3d.FrameNodeVo();
	                $frameNodeVo.writeObject($scene[i]);
	                this.frameItem.push($frameNodeVo);
	            }
	            this._completeFun();
	        };
	        Frame3dRes.frameNum = 1;
	        return Frame3dRes;
	    }(Pan3d.BaseRes));
	    Pan3d.Frame3dRes = Frame3dRes;
	    var FrameSceneChar = /** @class */ (function (_super) {
	        __extends(FrameSceneChar, _super);
	        function FrameSceneChar(value) {
	            return _super.call(this, value) || this;
	        }
	        return FrameSceneChar;
	    }(Pan3d.SceneChar));
	    Pan3d.FrameSceneChar = FrameSceneChar;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Frame3dRes.js.map

/***/ }),
/* 134 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var Pan3d;
	(function (Pan3d) {
	    var Frame3dSprite = /** @class */ (function (_super) {
	        __extends(Frame3dSprite, _super);
	        function Frame3dSprite(value) {
	            var _this = _super.call(this, value) || this;
	            _this.lastTime = 0;
	            _this.frameImodelItem = new Array;
	            _this.frame3dRes = new Pan3d.Frame3dRes(_this.scene3D);
	            _this.frame3dRes.load(_this.scene3D.fileRoot + "pan/frame3dres/huowumatou_frame.txt", function () { return _this.loadFrame3DFinish(); });
	            return _this;
	        }
	        Frame3dSprite.prototype.loadFrame3DFinish = function () {
	            for (var i = 0; i < this.frame3dRes.frameItem.length; i++) {
	                var $base = new Pan3d.FrameFileNode(this.scene3D);
	                $base.setFrameNodeVo(this.frame3dRes.frameItem[i]);
	                this.frameImodelItem.push($base);
	            }
	        };
	        Frame3dSprite.prototype.upFrame = function () {
	            this.mathTimeFrame();
	            for (var i = 0; i < this.frameImodelItem.length; i++) {
	                this.frameImodelItem[i].update();
	            }
	        };
	        Frame3dSprite.prototype.mathTimeFrame = function () {
	            if (isNaN(Pan3d.Frame3dRes.frameNum)) {
	                Pan3d.Frame3dRes.frameNum = 0;
	            }
	            var dt = Pan3d.TimeUtil.getTimer() - this.lastTime;
	            Pan3d.Frame3dRes.frameNum += dt / (1000 / Pan3d.Frame3dRes.frameSpeedNum);
	            Pan3d.Frame3dRes.frameNum = Pan3d.Frame3dRes.frameNum % (Pan3d.FrameLinePointVo.maxTime - 1);
	            this.lastTime = Pan3d.TimeUtil.getTimer();
	        };
	        return Frame3dSprite;
	    }(Pan3d.Display3D));
	    Pan3d.Frame3dSprite = Frame3dSprite;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Frame3dSprite.js.map

/***/ }),
/* 135 */
/***/ (function(module, exports) {

	var Pan3d;
	(function (Pan3d) {
	    var Scene3D = /** @class */ (function () {
	        function Scene3D(value) {
	            this.fileRoot = "https://webpan.oss-cn-shanghai.aliyuncs.com/res/";
	            this.fogColor = [0, 0, 0];
	            this.fogData = [1000, 0.003];
	            this.scaleLight = [2.0];
	            this.time = 0;
	            this.supportBlob = true;
	            this.context3D = new Pan3d.Context3D(value);
	            this.camera3D = new Pan3d.Camera3D();
	            this.progrmaManager = new Pan3d.ProgrmaManager(this);
	            this.objDataManager = new Pan3d.ObjDataManager(this);
	            this.textureManager = new Pan3d.TextureManager(this);
	            this.materialManager = new Pan3d.MaterialManager(this);
	            this.groupDataManager = new Pan3d.GroupDataManager(this);
	            this.resManager = new Pan3d.ResManager(this);
	            this.animManager = new Pan3d.AnimManager(this);
	            this.meshDataManager = new Pan3d.MeshDataManager(this);
	            this.particleManager = new Pan3d.ParticleManager(this);
	            this.skillManager = new Pan3d.SkillManager(this);
	            this._displayList = new Array();
	            this._displayRoleList = new Array();
	            this.initPbr();
	            this.addDisplay(new Pan3d.GridLineSprite(this));
	            // this.displayBaseSprite=new DisplayBaseSprite( this.context3D.webGlRender);
	        }
	        Scene3D.getArrByStr = function (str) {
	            var boneNameAry = str.split(/\s+/g);
	            for (var i = boneNameAry.length - 1; i >= 0; i--) {
	                if (String(boneNameAry[i]).length < 1) {
	                    boneNameAry.splice(i, 1);
	                }
	            }
	            return boneNameAry;
	        };
	        Object.defineProperty(Scene3D.prototype, "cam3D", {
	            get: function () {
	                return this.camera3D;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Object.defineProperty(Scene3D.prototype, "viewMatrx3D", {
	            get: function () {
	                return this.cam3D.cameraMatrix;
	            },
	            enumerable: false,
	            configurable: true
	        });
	        Scene3D.prototype.initPbr = function () {
	            var _this = this;
	            if (!this.pubLut) {
	                this.textureManager.getTexture(this.fileRoot + "base/brdf_ltu.jpg", function ($texture) {
	                    _this.pubLut = $texture.texture;
	                }, 1);
	            }
	            if (!this.skyCubeMap) {
	                this.textureManager.loadCubeTexture(this.fileRoot + "base/cube/e", function ($ary) {
	                    _this.skyCubeMap = $ary;
	                });
	            }
	        };
	        Scene3D.prototype.clearAll = function () {
	            this._displayList = new Array();
	            this._displayRoleList = new Array();
	            this.particleManager.clearAll();
	        };
	        Scene3D.prototype.addDisplay = function (itemDisplay) {
	            this._displayList.push(itemDisplay);
	        };
	        Scene3D.prototype.addMovieDisplay = function (role) {
	            this._displayRoleList.push(role);
	        };
	        Scene3D.prototype.upFrame = function () {
	            this.camera3D.upFrame();
	            this.updateFrameRole();
	            // this.camera3D.rotationY++;
	            this.context3D.setBaseRender();
	            this.context3D.setWriteDepth(true);
	            this.context3D.setBlendParticleFactors(0);
	            for (var i = 0; i < this._displayList.length; i++) {
	                this._displayList[i].upFrame();
	            }
	            for (var i = 0; i < this._displayRoleList.length; i++) {
	                this._displayRoleList[i].upFrame();
	            }
	            this.skillManager.update();
	            this.particleManager.upFrame();
	            this.displayBaseSprite ? this.displayBaseSprite.upFrame() : null;
	        };
	        Scene3D.prototype.updateFrameRole = function () {
	            var _tempTime = Pan3d.TimeUtil.getTimer();
	            var delay = _tempTime - this.time;
	            this.time = _tempTime;
	            for (var i = 0; i < this._displayRoleList.length; i++) {
	                this._displayRoleList[i].updateFrame(delay);
	            }
	        };
	        Scene3D.frameTime = 1000 / 60;
	        Scene3D.MAX_NUMBER = 10000000;
	        return Scene3D;
	    }());
	    Pan3d.Scene3D = Scene3D;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=Scene3D.js.map

/***/ }),
/* 136 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var md5list;
	(function (md5list) {
	    var Vector3D = Pan3d.Vector3D;
	    var MeshData = Pan3d.MeshData;
	    var ResGC = Pan3d.ResGC;
	    var ObjectTri = /** @class */ (function () {
	        function ObjectTri() {
	            this.id = 0;
	            this.t0 = 0;
	            this.t1 = 0;
	            this.t2 = 0;
	        }
	        return ObjectTri;
	    }());
	    md5list.ObjectTri = ObjectTri;
	    var ObjectWeight = /** @class */ (function () {
	        function ObjectWeight() {
	            this.x = 0;
	            this.y = 0;
	            this.z = 0;
	            this.w = 0;
	            this.weight = 0;
	            this.boneId = 0;
	            this.id = 0;
	        }
	        ObjectWeight.prototype.clone = function () {
	            var obj = new ObjectWeight;
	            obj.x = this.x;
	            obj.y = this.y;
	            obj.z = this.z;
	            obj.w = this.w;
	            obj.weight = this.weight;
	            obj.boneId = this.boneId;
	            obj.id = this.id;
	            return obj;
	        };
	        return ObjectWeight;
	    }());
	    md5list.ObjectWeight = ObjectWeight;
	    var ObjectUv = /** @class */ (function () {
	        function ObjectUv() {
	            this.x = 0;
	            this.y = 0;
	            this.z = 0;
	            this.a = 0;
	            this.b = 0;
	            this.w = 0;
	            this.id = 0;
	        }
	        return ObjectUv;
	    }());
	    md5list.ObjectUv = ObjectUv;
	    var MeshItem = /** @class */ (function () {
	        function MeshItem() {
	            this.normal = new Vector3D;
	        }
	        return MeshItem;
	    }());
	    md5list.MeshItem = MeshItem;
	    var Md5MeshData = /** @class */ (function (_super) {
	        __extends(Md5MeshData, _super);
	        function Md5MeshData() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        return Md5MeshData;
	    }(MeshData));
	    md5list.Md5MeshData = Md5MeshData;
	    var MeshImportSort = /** @class */ (function (_super) {
	        __extends(MeshImportSort, _super);
	        function MeshImportSort() {
	            var _this = _super !== null && _super.apply(this, arguments) || this;
	            _this.beginKey = 20;
	            _this.bindWidth = 4;
	            return _this;
	        }
	        MeshImportSort.prototype.processMesh = function (meshData) {
	            var weightAry = new Array;
	            var i = 0;
	            for (i = 0; i < meshData.weightItem.length; i++) {
	                weightAry.push(meshData.weightItem[i].clone());
	            }
	            var mapkeyAry = this.getMapValue(meshData.boneItem);
	            for (i = 0; i < weightAry.length; i++) {
	                //trace(weightAry[i].boneId,mapkeyAry[weightAry[i].boneId])
	                weightAry[i].boneId = mapkeyAry[weightAry[i].boneId];
	            }
	            //			meshData.souceBoneItem
	            meshData.weightItem = weightAry;
	            this.processForAgal(meshData);
	        };
	        MeshImportSort.prototype.processForAgal = function (meshData) {
	            var beginKey = 1;
	            var uvItem = meshData.uvItem;
	            var weightItem = meshData.weightItem;
	            var triItem = meshData.triItem;
	            var uvArray = new Array();
	            var ary = [[], [], [], []];
	            var boneWeightAry = new Array;
	            var bonetIDAry = new Array;
	            var indexAry = new Array;
	            var skipNum;
	            var beginIndex;
	            var allNum;
	            var boneUseAry = new Array;
	            for (var i = 0; i < uvItem.length; i++) {
	                beginIndex = uvItem[i].a;
	                allNum = uvItem[i].b;
	                for (skipNum = 0; skipNum < 4; skipNum++) {
	                    if (skipNum < allNum) {
	                        boneUseAry.push((weightItem[beginIndex + skipNum].boneId));
	                    }
	                    else {
	                        boneUseAry.push(boneUseAry[0]);
	                    }
	                }
	            }
	            boneUseAry = this.getboneNum(boneUseAry);
	            for (i = 0; i < uvItem.length; i++) {
	                beginIndex = uvItem[i].a;
	                allNum = uvItem[i].b;
	                for (skipNum = 0; skipNum < 4; skipNum++) {
	                    if (skipNum < allNum) {
	                        ary[skipNum].push(weightItem[beginIndex + skipNum].x, weightItem[beginIndex + skipNum].y, weightItem[beginIndex + skipNum].z);
	                        bonetIDAry.push(boneUseAry.indexOf((weightItem[beginIndex + skipNum].boneId)));
	                        boneWeightAry.push(weightItem[beginIndex + skipNum].w);
	                    }
	                    else {
	                        ary[skipNum].push(0, 0, 0);
	                        bonetIDAry.push(boneUseAry.indexOf(0));
	                        boneWeightAry.push(0);
	                    }
	                }
	                uvArray.push(uvItem[i].x);
	                uvArray.push(uvItem[i].y);
	            }
	            meshData.boneNewIDAry = boneUseAry;
	            for (i = 0; i < triItem.length; i++) {
	                indexAry.push(triItem[i].t0, triItem[i].t1, triItem[i].t2);
	            }
	            meshData.faceNum = indexAry.length / 3;
	            meshData.treNum = indexAry.length;
	            // console.log(meshData, uvArray, ary, boneWeightAry, bonetIDAry, indexAry)
	            this.uplodToGpu(meshData, uvArray, ary, boneWeightAry, bonetIDAry, indexAry);
	        };
	        MeshImportSort.prototype.uplodToGpu = function (meshData, uvArray, ary3, boneWeightAry, bonetIDAry, indexAry) {
	            var context3D = this.scene3D.context3D;
	            meshData.uvBuffer = context3D.uploadBuff3D(uvArray);
	            meshData.boneWeightAry = boneWeightAry;
	            meshData.boneWeightBuffer = context3D.uploadBuff3D(boneWeightAry);
	            var arrA = new Array;
	            for (var i = 0; i < bonetIDAry.length; i++) {
	                arrA.push(Math.max(bonetIDAry[i], 0));
	            }
	            meshData.boneIDAry = arrA;
	            meshData.boneIdBuffer = context3D.uploadBuff3D(arrA);
	            meshData.indexBuffer = context3D.uploadIndexBuff3D(indexAry);
	        };
	        MeshImportSort.prototype.getboneNum = function (ary) {
	            var numAry = new Array;
	            for (var i = 0; i < ary.length; i++) {
	                if (numAry.indexOf(ary[i]) == -1) {
	                    numAry.push(ary[i]);
	                }
	            }
	            return numAry;
	        };
	        /**
	     * 返回映射关系列表
	     * @param targetAry
	     * @return
	     *
	     */
	        MeshImportSort.prototype.getMapValue = function (targetAry) {
	            var newTargetAry = md5list.MeshToObjUtils.getStorNewTargerArr(targetAry);
	            var mapkeyAry = new Array; //新旧ID映射关系
	            for (var i = 0; i < targetAry.length; i++) {
	                var index = newTargetAry.indexOf(targetAry[i]);
	                mapkeyAry.push(index);
	            }
	            return mapkeyAry;
	        };
	        return MeshImportSort;
	    }(ResGC));
	    md5list.MeshImportSort = MeshImportSort;
	})(md5list || (md5list = {}));
	//# sourceMappingURL=MeshImportSort.js.map

/***/ }),
/* 137 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var md5list;
	(function (md5list) {
	    var Quaternion = Pan3d.Quaternion;
	    var Vector3D = Pan3d.Vector3D;
	    var ResGC = Pan3d.ResGC;
	    var MeshToObjUtils = /** @class */ (function (_super) {
	        __extends(MeshToObjUtils, _super);
	        function MeshToObjUtils() {
	            return _super !== null && _super.apply(this, arguments) || this;
	        }
	        MeshToObjUtils.prototype.getObj = function (mesh) {
	            var objData = mesh;
	            objData.vertices = new Array;
	            objData.uvs = new Array;
	            objData.normals = new Array;
	            objData.indexs = new Array;
	            var bindPosAry = new Array;
	            var invertAry = new Array;
	            var meshItemAry = new Array;
	            var boneItemAry = this.processBoneNew(mesh.boneItem);
	            for (var i = 0; i < boneItemAry.length; i++) {
	                var objbone = boneItemAry[i];
	                var OldQ = new Quaternion(objbone.qx, objbone.qy, objbone.qz);
	                OldQ.w = this.getW(OldQ.x, OldQ.y, OldQ.z);
	                var newM = OldQ.toMatrix3D();
	                newM.appendTranslation(objbone.tx, objbone.ty, objbone.tz);
	                objbone.matrix = newM;
	                bindPosAry.push(newM);
	                var inverMatrix = newM.clone();
	                inverMatrix.invert();
	                invertAry.push(inverMatrix);
	            }
	            for (i = 0; i < mesh.uvItem.length; i++) {
	                var objuv = mesh.uvItem[i];
	                var v3d = new Vector3D;
	                var wAry = new Array;
	                for (var j = 0; j < objuv.b; j++) {
	                    var weightID = objuv.a + j;
	                    var objWeight = mesh.weightItem[weightID];
	                    var ma = boneItemAry[objWeight.boneId].matrix;
	                    var tempV3d = new Vector3D(objWeight.x, objWeight.y, objWeight.z);
	                    tempV3d = ma.transformVector(tempV3d);
	                    tempV3d.scaleBy(objWeight.w);
	                    v3d = v3d.add(tempV3d);
	                    wAry.push(objWeight.w);
	                }
	                objData.vertices.push(v3d.x, v3d.y, v3d.z);
	                objData.uvs.push(objuv.x, objuv.y);
	                var meshitem = new md5list.MeshItem;
	                meshitem.verts = new Vector3D(v3d.x, v3d.y, v3d.z);
	                meshitem.uvInfo = objuv;
	                meshItemAry.push(meshitem);
	            }
	            for (i = 0; i < mesh.triItem.length; i++) {
	                objData.indexs.push(mesh.triItem[i].t0, mesh.triItem[i].t1, mesh.triItem[i].t2);
	            }
	            var context3D = this.scene3D.context3D;
	            objData.vertexBuffer = context3D.uploadBuff3D(objData.vertices);
	            objData.uvBuffer = context3D.uploadBuff3D(objData.uvs);
	            objData.indexBuffer = context3D.uploadIndexBuff3D(objData.indexs);
	            objData.bindPosAry = bindPosAry;
	            objData.invertAry = invertAry;
	            return objData;
	        };
	        MeshToObjUtils.prototype.getW = function (x, y, z) {
	            var t = 1 - (x * x + y * y + z * z);
	            if (t < 0) {
	                t = 0;
	            }
	            else {
	                t = -Math.sqrt(t);
	            }
	            return t;
	        };
	        MeshToObjUtils.prototype.processBoneNew = function (targetAry) {
	            var newTargetAry = MeshToObjUtils.getStorNewTargerArr(targetAry);
	            //添加bip骨骼到新数组
	            var mapkeyAry = new Array; //新旧ID映射关系
	            for (var i = 0; i < targetAry.length; i++) {
	                var index = newTargetAry.indexOf(targetAry[i]);
	                mapkeyAry.push(index);
	            }
	            var resultAry = new Array; //最终更新的数据
	            for (i = 0; i < newTargetAry.length; i++) { //数据复制
	                var $kkkk = newTargetAry[i];
	                resultAry.push($kkkk.clone());
	            }
	            for (i = 0; i < resultAry.length; i++) { //从映射关系更新父级id
	                index = resultAry[i].father;
	                if (index != -1) {
	                    resultAry[i].father = mapkeyAry[index];
	                }
	            }
	            return resultAry;
	        };
	        MeshToObjUtils.getStorNewTargerArr = function (targetAry) {
	            var newTargetAry = new Array;
	            var i;
	            /*
	               for (i = 0; i < targetAry.length; i++) {
	                   if (targetAry[i].name.indexOf("origin") != -1) {
	                       newTargetAry.push(targetAry[i]);
	                   }
	               }
	       
	               for (i = 0; i < targetAry.length; i++) {
	                   if (targetAry[i].name.indexOf("Bip") != -1) {
	                       newTargetAry.push(targetAry[i]);
	                   }
	               }
	               //添加weapon骨骼到新数组
	               for (i = 0; i < targetAry.length; i++) {
	                   if (targetAry[i].name.indexOf("weapon") != -1) {
	                       newTargetAry.push(targetAry[i]);
	                   }
	               }
	       
	               */
	            //添加剩余的骨骼到新数组
	            for (i = 0; i < targetAry.length; i++) {
	                if (newTargetAry.indexOf(targetAry[i]) == -1) {
	                    newTargetAry.push(targetAry[i]);
	                }
	            }
	            return newTargetAry;
	        };
	        return MeshToObjUtils;
	    }(ResGC));
	    md5list.MeshToObjUtils = MeshToObjUtils;
	})(md5list || (md5list = {}));
	//# sourceMappingURL=MeshToObjUtils.js.map

/***/ }),
/* 138 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var md5list;
	(function (md5list) {
	    var Dictionary = Pan3d.Dictionary;
	    var ObjectBone = Pan3d.ObjectBone;
	    var ResGC = Pan3d.ResGC;
	    var Scene3D = Pan3d.Scene3D;
	    var Md5Analysis = /** @class */ (function (_super) {
	        __extends(Md5Analysis, _super);
	        function Md5Analysis(value) {
	            return _super.call(this, value) || this;
	        }
	        Md5Analysis.prototype.addMesh = function (str) {
	            var arr;
	            if (str.indexOf("mesh") != -1) {
	                //存入没一个元件MESH;
	                var meshData = new md5list.Md5MeshData(this.scene3D);
	                var meshSmaple = new Dictionary([]);
	                str = str.replace("\t", "");
	                arr = str.split("\n");
	                var numverts = false;
	                var numvertsIndex = 0;
	                var currentnumvertsIndex = 0;
	                var numvertsArray = new Array();
	                var numtris = false;
	                var numtrisIndex = 0;
	                var currentnumtrisIndex = 0;
	                var numtrisArray = new Array();
	                var numweights = false;
	                var numweightsIndex = 0;
	                var currentnumweightsIndex = 0;
	                var numweightsArray = new Array();
	                var joints;
	                var jointAry = new Array;
	                var reg = /\d+/;
	                for (var m = 0; m < arr.length; m++) {
	                    if (numverts) {
	                        if (currentnumvertsIndex < numvertsIndex) {
	                            numvertsArray.push(arr[m]);
	                            currentnumvertsIndex++;
	                        }
	                        else {
	                            //mesh["numverts"] = numvertsArray;
	                            meshSmaple["numverts"] = numvertsArray;
	                            numverts = false;
	                        }
	                    }
	                    if (numtris) {
	                        if (currentnumtrisIndex < numtrisIndex) {
	                            numtrisArray.push(arr[m]);
	                            currentnumtrisIndex++;
	                        }
	                        else {
	                            //mesh["numtris"] = numtrisArray;
	                            meshSmaple["numtris"] = numtrisArray;
	                            numtris = false;
	                        }
	                    }
	                    if (numweights) {
	                        if (currentnumweightsIndex < numweightsIndex) {
	                            numweightsArray.push(arr[m]);
	                            currentnumweightsIndex++;
	                        }
	                        else {
	                            //mesh["numweights"] = numweightsArray;
	                            meshSmaple["numweights"] = numweightsArray;
	                            numweights = false;
	                        }
	                    }
	                    if (joints) {
	                        jointAry.push(arr[m]);
	                    }
	                    if (String(arr[m]).indexOf("numverts") != -1) {
	                        numverts = true;
	                        numvertsIndex = Number(arr[m].match(reg)[0]);
	                    }
	                    if (String(arr[m]).indexOf("numtris") != -1) {
	                        numtris = true;
	                        numtrisIndex = Number(arr[m].match(reg)[0]);
	                    }
	                    if (String(arr[m]).indexOf("numweights") != -1) {
	                        numweights = true;
	                        numweightsIndex = Number(arr[m].match(reg)[0]);
	                    }
	                    if (String(arr[m]).indexOf("joints") != -1) {
	                        joints = true;
	                    }
	                    if (String(arr[m]).indexOf("mesh") != -1) {
	                        joints = false;
	                        meshSmaple["joints"] = jointAry;
	                    }
	                    if (String(arr[m]).indexOf("commandline") != -1) {
	                    }
	                }
	                meshData.mesh = meshSmaple;
	                this.joinTri(meshData);
	                this.joinPoint(meshData);
	                this.joinUV(meshData);
	                this.joinJoints(meshData);
	                // console.log(meshData)
	                return meshData;
	            }
	            return null;
	        };
	        Md5Analysis.prototype.joinJoints = function (meshData) {
	            var jointAry = meshData.mesh["joints"];
	            meshData.boneItem = new Array;
	            for (var i = 0; i < jointAry.length; i++) {
	                var line = jointAry[i];
	                if (line.length < 9) {
	                    break;
	                }
	                var boneName = line.match(/\".+\"/)[0];
	                line = line.replace(boneName, "");
	                var boneNameAry = Scene3D.getArrByStr(line);
	                if (boneNameAry.length == 1) {
	                    break;
	                }
	                var bone = new ObjectBone();
	                bone.name = boneName;
	                bone.father = Number(boneNameAry[0]);
	                bone.tx = Number(boneNameAry[2]);
	                bone.ty = Number(boneNameAry[3]);
	                bone.tz = Number(boneNameAry[4]);
	                bone.qx = Number(boneNameAry[7]);
	                bone.qy = Number(boneNameAry[8]);
	                bone.qz = Number(boneNameAry[9]);
	                meshData.boneItem.push(bone);
	            }
	        };
	        Md5Analysis.prototype.joinUV = function (meshData) {
	            var _meshNumverts = meshData.mesh["numverts"];
	            meshData.uvItem = new Array();
	            var _str = "";
	            var _arr = new Array();
	            var i = 0;
	            for (i = 0; i < _meshNumverts.length; i++) {
	                _str = this.genewStr(_meshNumverts[i]);
	                _arr = _str.split(" ");
	                var _temp = new md5list.ObjectUv();
	                _temp.id = Number(_arr[1]);
	                _temp.x = Number(_arr[2]);
	                _temp.y = Number(_arr[3]);
	                _temp.a = Number(_arr[4]);
	                _temp.b = Number(_arr[5]);
	                meshData.uvItem.push(_temp);
	            }
	        };
	        Md5Analysis.prototype.joinPoint = function (meshData) {
	            var _meshNumweights = meshData.mesh["numweights"];
	            meshData.weightItem = new Array;
	            var _str = "";
	            var _arr = new Array();
	            var i = 0;
	            for (i = 0; i < _meshNumweights.length; i++) {
	                _str = this.genewStr(_meshNumweights[i]);
	                _arr = _str.split(" ");
	                var _temp = new md5list.ObjectWeight();
	                _temp.id = Number(_arr[1]);
	                _temp.boneId = Number(_arr[2]);
	                _temp.w = Number(_arr[3]);
	                _temp.x = Number(_arr[4]);
	                _temp.y = Number(_arr[5]);
	                _temp.z = Number(_arr[6]);
	                meshData.weightItem.push(_temp);
	            }
	        };
	        Md5Analysis.prototype.joinTri = function (meshData) {
	            var _meshNumtris = meshData.mesh["numtris"];
	            meshData.triItem = new Array;
	            var _str = "";
	            var _arr = new Array();
	            var i = 0;
	            for (i = 0; i < _meshNumtris.length; i++) {
	                _str = this.genewStr(_meshNumtris[i]);
	                _arr = _str.split(" ");
	                var _temp = new md5list.ObjectTri();
	                _temp.id = Number(_arr[1]);
	                _temp.t0 = Number(_arr[2]);
	                _temp.t1 = Number(_arr[3]);
	                _temp.t2 = Number(_arr[4]);
	                meshData.triItem.push(_temp);
	            }
	        };
	        Md5Analysis.prototype.genewStr = function (_str) {
	            var _s = "";
	            var _t = "";
	            var _e = " ";
	            var i = 0;
	            while (i < _str.length) {
	                _t = _str.charAt(i);
	                switch (_t) {
	                    case "(":
	                        break;
	                    case ")":
	                        break;
	                    case "\"":
	                        break;
	                    case "	":
	                        if (_e != " ") {
	                            _s = _s + " ";
	                        }
	                        _e = " ";
	                        break;
	                    case " ":
	                        if (_e != " ") {
	                            _s = _s + " ";
	                        }
	                        _e = " ";
	                        break;
	                    default:
	                        _s = _s + _t;
	                        _e = _t;
	                        break;
	                }
	                i++;
	            }
	            return _s;
	        };
	        return Md5Analysis;
	    }(ResGC));
	    md5list.Md5Analysis = Md5Analysis;
	})(md5list || (md5list = {}));
	//# sourceMappingURL=Md5Analysis.js.map

/***/ }),
/* 139 */
/***/ (function(module, exports) {

	var md5list;
	(function (md5list) {
	    var Matrix3D = Pan3d.Matrix3D;
	    var Quaternion = Pan3d.Quaternion;
	    var Vector3D = Pan3d.Vector3D;
	    var Dictionary = Pan3d.Dictionary;
	    var ObjectBone = Pan3d.ObjectBone;
	    var Scene3D = Pan3d.Scene3D;
	    var Md5animAnalysis = /** @class */ (function () {
	        function Md5animAnalysis() {
	            this.loopKey = "inLoop";
	            this.boundsKey = "mybounds";
	            this.nameHeightKey = "nameheight";
	            this.interKey = "inter";
	            this.pos = "pos";
	        }
	        Md5animAnalysis.prototype.addAnim = function (ini) {
	            this._dir = new Dictionary([]);
	            this.allFrames = new Array();
	            this.framesok = false;
	            this._hierarchyitem = new Array();
	            this._hierarchy = new Array();
	            this._baseframe = new Array();
	            this._bounds = new Array();
	            this._frame = new Array();
	            this.bigArr = new Array();
	            //var ini:String = urlloader.data;
	            ini = ini.replace("\t", "");
	            var arr = ini.split("\n");
	            var len = arr.length;
	            var tempStr = "";
	            var isbig = false;
	            //var t:int = getTimer();
	            for (var i = 0; i < len; i++) {
	                var dindex = String(arr[i]).indexOf("//");
	                if (dindex == 0) {
	                    //注释行
	                    continue;
	                }
	                if (dindex != -1) {
	                    //包含注释
	                    arr[i] = String(arr[i]).substring(0, dindex);
	                    //删除注释
	                }
	                if (String(arr[i]).indexOf("{") != -1) {
	                    isbig = true;
	                }
	                if (isbig) {
	                    tempStr += arr[i] + "\n\r";
	                    if (String(arr[i]).indexOf("}") != -1) {
	                        isbig = false;
	                        this.bigArr.push(tempStr);
	                        tempStr = "";
	                    }
	                }
	                else {
	                    if (arr[i] != "") {
	                        var arr2 = String(arr[i]).split(" ");
	                        this._dir[arr2[0]] = arr2[1];
	                        //正常行
	                    }
	                    else {
	                        //空行
	                    }
	                }
	            }
	            //trace("anim字符串解析耗时：" + (getTimer() - t))
	            //t = getTimer();
	            //			trace(3)
	            for (var p = 0; p < this.bigArr.length; p++) {
	                this.handleBigWord(this.bigArr[p]);
	            }
	            this._pushhierarchyitem();
	            //this.processBounds();
	            //processInter();
	            //processPos();
	            // this.setRestult();
	            return this.setFrameToMatrix(this.allFrames);
	        };
	        Md5animAnalysis.prototype.setFrameToMatrix = function (frameAry) {
	            var matrixAry = new Array;
	            for (var j = 0; j < frameAry.length; j++) {
	                var boneAry = frameAry[j];
	                var Q0 = new Quaternion();
	                var newM = new Matrix3D();
	                var frameMatrixAry = new Array;
	                matrixAry.push(frameMatrixAry);
	                for (var i = 0; i < boneAry.length; i++) {
	                    var xyzfarme0 = boneAry[i];
	                    Q0 = new Quaternion(xyzfarme0.qx, xyzfarme0.qy, xyzfarme0.qz);
	                    Q0.w = this.getW(Q0.x, Q0.y, Q0.z);
	                    if (xyzfarme0.father == -1) {
	                        newM = Q0.toMatrix3D();
	                        newM.appendTranslation(xyzfarme0.tx, xyzfarme0.ty, xyzfarme0.tz);
	                        newM.appendRotation(-90, Vector3D.X_AXIS);
	                        //xyzfarme0.matrix = newM;
	                        frameMatrixAry.push(newM);
	                    }
	                    else {
	                        var fatherBone = boneAry[xyzfarme0.father];
	                        newM = Q0.toMatrix3D();
	                        newM.appendTranslation(xyzfarme0.tx, xyzfarme0.ty, xyzfarme0.tz);
	                        //newM.append(fatherBone.matrix);
	                        newM.append(frameMatrixAry[xyzfarme0.father]);
	                        frameMatrixAry.push(newM);
	                        //xyzfarme0.matrix = newM;
	                    }
	                }
	                for (i = 0; i < frameMatrixAry.length; i++) {
	                    frameMatrixAry[i].appendScale(-1, 1, 1); //特别标记，因为四元数和矩阵运算结果不一  先存正确的矩阵
	                    //xyzfarme0.matrix.appendScale(-1, 1, 1);
	                }
	            }
	            return matrixAry;
	        };
	        Md5animAnalysis.prototype.getW = function (x, y, z) {
	            var t = 1 - (x * x + y * y + z * z);
	            if (t < 0) {
	                t = 0;
	            }
	            else {
	                t = -Math.sqrt(t);
	            }
	            return t;
	        };
	        Md5animAnalysis.prototype.setRestult = function () {
	            this.resultInfo = new Object;
	            this.resultInfo.frames = this.allFrames;
	            this.resultInfo.matrixAry = this.setFrameToMatrix(this.allFrames);
	        };
	        Md5animAnalysis.prototype._pushhierarchyitem = function () {
	            var _str = "";
	            var _arr = new Array();
	            var i = 0;
	            for (i = 0; i < this._hierarchy.length; i++) {
	                //_str=_genewStr(_hierarchy[i]);
	                var tempary = this.getBoneFilterStr(this._hierarchy[i]);
	                _arr = tempary[1].split(" ");
	                //_arr=_str.split(" ");
	                var _temp = new ObjectBone();
	                _temp.father = Number(_arr[0]);
	                _temp.changtype = Number(_arr[1]);
	                _temp.startIndex = Number(_arr[2]);
	                _temp.name = tempary[0];
	                this._hierarchyitem.push(_temp);
	            }
	            this._pushbasefamer();
	        };
	        Md5animAnalysis.prototype._pushbasefamer = function () {
	            var _str = "";
	            var i = 0;
	            for (i = 0; i < this._baseframe.length; i++) {
	                var _arr = Scene3D.getArrByStr(this._baseframe[i]);
	                this._hierarchyitem[i].tx = Number(_arr[1]);
	                this._hierarchyitem[i].ty = Number(_arr[2]);
	                this._hierarchyitem[i].tz = Number(_arr[3]);
	                this._hierarchyitem[i].qx = Number(_arr[6]);
	                this._hierarchyitem[i].qy = Number(_arr[7]);
	                this._hierarchyitem[i].qz = Number(_arr[8]);
	            }
	            this._pushfamers();
	        };
	        Md5animAnalysis.prototype._pushfamers = function () {
	            var i = 0;
	            for (i = 0; i < this._frame.length; i++) {
	                if (this._frame[i]) {
	                    this.allFrames.push(this._getsamplefamer(this._frame[i]));
	                }
	            }
	            this.framesok = true;
	        };
	        Md5animAnalysis.prototype._getsamplefamer = function (_framesample) {
	            var i = 0;
	            var _arr = new Array;
	            var _arrframesample = new Array;
	            for (var js = 0; js < _framesample.length; js++) {
	                var aar = Scene3D.getArrByStr(_framesample[js]);
	                if (aar.length && aar[aar.length - 1] == "") {
	                    aar.pop();
	                }
	                _arrframesample = _arrframesample.concat(aar);
	            }
	            for (i = 0; i < this._hierarchyitem.length; i++) {
	                var _temp = new ObjectBone();
	                _temp.father = this._hierarchyitem[i].father;
	                _temp.name = this._hierarchyitem[i].name;
	                _temp.tx = this._hierarchyitem[i].tx;
	                _temp.ty = this._hierarchyitem[i].ty;
	                _temp.tz = this._hierarchyitem[i].tz;
	                _temp.qx = this._hierarchyitem[i].qx;
	                _temp.qy = this._hierarchyitem[i].qy;
	                _temp.qz = this._hierarchyitem[i].qz;
	                var k = 0;
	                if (this._hierarchyitem[i].changtype & 1) {
	                    _temp.tx = Number(_arrframesample[this._hierarchyitem[i].startIndex + k]);
	                    k++;
	                }
	                if (this._hierarchyitem[i].changtype & 2) {
	                    _temp.ty = Number(_arrframesample[this._hierarchyitem[i].startIndex + k]);
	                    k++;
	                }
	                if (this._hierarchyitem[i].changtype & 4) {
	                    _temp.tz = Number(_arrframesample[this._hierarchyitem[i].startIndex + k]);
	                    k++;
	                }
	                if (this._hierarchyitem[i].changtype & 8) {
	                    _temp.qx = Number(_arrframesample[this._hierarchyitem[i].startIndex + k]);
	                    k++;
	                }
	                if (this._hierarchyitem[i].changtype & 16) {
	                    _temp.qy = Number(_arrframesample[this._hierarchyitem[i].startIndex + k]);
	                    k++;
	                }
	                if (this._hierarchyitem[i].changtype & 32) {
	                    _temp.qz = Number(_arrframesample[this._hierarchyitem[i].startIndex + k]);
	                    k++;
	                }
	                _arr.push(_temp);
	            }
	            return _arr;
	        };
	        Md5animAnalysis.prototype.getBoneFilterStr = function (_str) {
	            var _s = "";
	            var _t = "";
	            var _e = " ";
	            var i = 0;
	            while (i < _str.length) {
	                _t = _str.charAt(i);
	                switch (_t) {
	                    case "(":
	                        break;
	                    case ")":
	                        break;
	                    case "	":
	                        if (_e != " ") {
	                            _s = _s + " ";
	                        }
	                        _e = " ";
	                        break;
	                    case " ":
	                        if (_e != " ") {
	                            _s = _s + " ";
	                        }
	                        _e = " ";
	                        break;
	                    default:
	                        _s = _s + _t;
	                        _e = _t;
	                        break;
	                }
	                i++;
	            }
	            var index = _s.indexOf("\"", 1);
	            var name = _s.slice(1, index);
	            //	var num:String = _s.slice(index+2,-1);
	            var num = _s.substring(index + 2, _s.length);
	            return [name, num];
	        };
	        Md5animAnalysis.prototype.handleBigWord = function (str) {
	            var reg = /\d+/;
	            var arr;
	            //			if (str.indexOf("inLoop") != -1) {
	            //				
	            //				arr = str.split("\n\r");
	            //				
	            //				for (var i:int = 0 ; i < arr.length ; i++) {
	            //					
	            //					if (String(arr[i]).indexOf("{") == -1 && String(arr[i]).indexOf("}") == -1 && arr[i] != "") {
	            //						
	            //						_hierarchy.push(arr[i]);
	            //					}
	            //				}
	            //			}
	            if (str.indexOf("hierarchy") != -1) {
	                arr = str.split("\n\r");
	                for (var i = 0; i < arr.length; i++) {
	                    if (String(arr[i]).indexOf("{") == -1 && String(arr[i]).indexOf("}") == -1 && arr[i] != "") {
	                        this._hierarchy.push(arr[i]);
	                    }
	                }
	            }
	            if (str.indexOf("bounds") != -1) {
	                arr = str.split("\n\r");
	                for (var m = 0; m < arr.length; m++) {
	                    if (String(arr[m]).indexOf("{") == -1 && String(arr[m]).indexOf("}") == -1 && String(arr[m]) != "") {
	                        this._bounds.push(arr[m]);
	                    }
	                }
	            }
	            if (str.indexOf("baseframe") != -1) {
	                arr = str.split("\n\r");
	                for (var k = 0; k < arr.length; k++) {
	                    if (String(arr[k]).indexOf("{") == -1 && String(arr[k]).indexOf("}") == -1 && arr[k] != "") {
	                        this._baseframe.push(arr[k]);
	                    }
	                }
	            }
	            if (str.indexOf("frame") != -1 && str.indexOf("baseframe") == -1 && str.indexOf("BoneScale") == -1) {
	                arr = str.split("\n\r");
	                var arrsign;
	                var tempArray = new Array();
	                for (var w = 0; w < arr.length; w++) {
	                    if (String(arr[w]).indexOf("frame") != -1) {
	                        arrsign = Number((arr[w]).match(reg)[0]);
	                    }
	                    if (String(arr[w]).indexOf("{") == -1 && String(arr[w]).indexOf("}") == -1 && arr[w] != "") {
	                        tempArray.push(arr[w]);
	                    }
	                    this._frame[arrsign] = tempArray;
	                }
	            }
	        };
	        return Md5animAnalysis;
	    }());
	    md5list.Md5animAnalysis = Md5animAnalysis;
	})(md5list || (md5list = {}));
	//# sourceMappingURL=Md5animAnalysis.js.map

/***/ }),
/* 140 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var md5list;
	(function (md5list) {
	    var Shader3D = Pan3d.Shader3D;
	    var Display3DSprite = Pan3d.Display3DSprite;
	    var DualQuatFloat32Array = Pan3d.DualQuatFloat32Array;
	    var LoadManager = Pan3d.LoadManager;
	    var Quaternion = Pan3d.Quaternion;
	    var Md5MeshShader = /** @class */ (function (_super) {
	        __extends(Md5MeshShader, _super);
	        function Md5MeshShader(value) {
	            return _super.call(this, value) || this;
	        }
	        Md5MeshShader.prototype.binLocation = function ($context) {
	            $context.bindAttribLocation(this.program, 0, "pos");
	            $context.bindAttribLocation(this.program, 1, "v2Uv");
	            $context.bindAttribLocation(this.program, 2, "boneID");
	            $context.bindAttribLocation(this.program, 3, "boneWeight");
	        };
	        Md5MeshShader.prototype.getVertexShaderString = function () {
	            var $str = "attribute vec3 pos;" +
	                "attribute vec2 v2Uv;" +
	                "attribute vec4 boneID;" +
	                "attribute vec4 boneWeight;" +
	                "varying vec2 v0;" +
	                "uniform vec4 boneQ[70];" +
	                "uniform vec3 boneD[70];" +
	                "uniform mat4 vpMatrix3D;" +
	                "uniform mat4 posMatrix3D;" +
	                "vec4 qdv(vec4 q, vec3 d, vec3 v ){" +
	                "   vec3 t = 2.0 * cross(q.xyz, v);" +
	                "   vec3 f = v + q.w * t + cross(q.xyz, t);" +
	                "   return vec4(f.x + d.x, f.y + d.y, f.z + d.z, 1.0);" +
	                " }" +
	                "vec4 getQDdata(vec3 vdata){" +
	                "   vec4 tempnum = qdv(boneQ[int(boneID.x)], boneD[int(boneID.x)], vdata) * boneWeight.x;" +
	                "   tempnum += qdv(boneQ[int(boneID.y)], boneD[int(boneID.y)], vdata) * boneWeight.y;" +
	                "   tempnum += qdv(boneQ[int(boneID.z)], boneD[int(boneID.z)], vdata) * boneWeight.z;" +
	                "   tempnum += qdv(boneQ[int(boneID.w)], boneD[int(boneID.w)], vdata) * boneWeight.w;" +
	                "   tempnum.x = tempnum.x * -1.0;" +
	                "   return tempnum;" +
	                " }" +
	                "vec4 qdvNrm(vec4 q, vec3 v ){" +
	                "      vec3 t = 2.0 * cross(q.xyz, v);" +
	                "      vec3 f = v + q.w * t + cross(q.xyz, t);" +
	                "      return vec4(f.x, f.y, f.z, 1.0);\n" +
	                "}" +
	                " vec4 getQDdataNrm(vec3 vdata){" +
	                "    vec4 tempnum = qdvNrm(boneQ[int(boneID.x)], vdata) * boneWeight.x;" +
	                "    tempnum += qdvNrm(boneQ[int(boneID.y)], vdata) * boneWeight.y;" +
	                "    tempnum += qdvNrm(boneQ[int(boneID.z)], vdata) * boneWeight.z;" +
	                "    tempnum += qdvNrm(boneQ[int(boneID.w)], vdata) * boneWeight.w;" +
	                "    tempnum.x = tempnum.x * -1.0;" +
	                "    tempnum.xyz = normalize(tempnum.xyz);" +
	                "    return tempnum;" +
	                "}" +
	                " void main(void){" +
	                "    v0 = v2Uv;" +
	                "    vec4 vt0 = getQDdata(vec3(pos.x, pos.y, pos.z));" +
	                "    vt0.xyz = vt0.xyz * 1.0;" +
	                "    vt0 = posMatrix3D * vt0;" +
	                "    vt0 = vpMatrix3D * vt0;" +
	                "    gl_Position = vt0;\n" +
	                "  }";
	            return $str;
	        };
	        Md5MeshShader.prototype.getFragmentShaderString = function () {
	            var $str = "precision mediump float;\n" +
	                "uniform sampler2D fs0;\n" +
	                "varying vec2 v0;\n" +
	                "void main(void)\n" +
	                "{\n" +
	                "vec4 infoUv = texture2D(fs0, v0.xy);\n" +
	                "gl_FragColor =infoUv;\n" +
	                "}";
	            return $str;
	        };
	        Md5MeshShader.Md5MeshShader = "Md5MeshShader";
	        return Md5MeshShader;
	    }(Shader3D));
	    md5list.Md5MeshShader = Md5MeshShader;
	    var Md5MeshSprite = /** @class */ (function (_super) {
	        __extends(Md5MeshSprite, _super);
	        function Md5MeshSprite(value) {
	            var _this = _super.call(this, value) || this;
	            _this.scene3D.progrmaManager.registe(Md5MeshShader.Md5MeshShader, new Md5MeshShader(_this.scene3D));
	            _this.md5shader = _this.scene3D.progrmaManager.getProgram(Md5MeshShader.Md5MeshShader);
	            _this.loadTexture();
	            return _this;
	        }
	        Md5MeshSprite.prototype.setMd5BodyUrl = function ($url) {
	            this.loadBodyMesh($url);
	        };
	        Md5MeshSprite.prototype.loadBodyMesh = function ($url) {
	            var _this = this;
	            LoadManager.getInstance().load(this.scene3D.fileRoot + $url, LoadManager.XML_TYPE, function ($str) {
	                var $md5Analysis = new md5list.Md5Analysis(_this.scene3D);
	                _this._md5MeshData = $md5Analysis.addMesh($str);
	                new md5list.MeshImportSort(_this.scene3D).processMesh(_this._md5MeshData);
	                _this.md5objData = new md5list.MeshToObjUtils(_this.scene3D).getObj(_this._md5MeshData);
	            });
	        };
	        Md5MeshSprite.prototype.loadTexture = function () {
	            var _this = this;
	            this.scene3D.textureManager.getTexture(this.scene3D.fileRoot + "x_f_武当_01.jpg", function ($texture) {
	                _this._uvTextureRes = $texture;
	            });
	            //   shuangdaonv.jpg
	        };
	        Md5MeshSprite.prototype.updateMaterialMesh = function ($mesh) {
	        };
	        Md5MeshSprite.prototype.update = function () {
	            if (this.md5objData) {
	                this.updateMaterialMeshCopy();
	            }
	        };
	        Md5MeshSprite.prototype.updateMaterialMeshCopy = function () {
	            this.baseShder = this.md5shader;
	            var context3D = this.scene3D.context3D;
	            context3D.setProgram(this.baseShder.program);
	            context3D.setVcMatrix4fv(this.baseShder, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
	            context3D.setVcMatrix4fv(this.baseShder, "posMatrix3D", this.posMatrix.m);
	            context3D.setRenderTexture(this.baseShder, "fc0", this._uvTextureRes.texture, 0);
	            context3D.setVa(0, 3, this.md5objData.vertexBuffer);
	            context3D.setVa(1, 2, this._md5MeshData.uvBuffer);
	            context3D.setVa(2, 4, this._md5MeshData.boneIdBuffer);
	            context3D.setVa(3, 4, this._md5MeshData.boneWeightBuffer);
	            var newIDBoneArr = this._md5MeshData.boneNewIDAry;
	            var baseBone = this.md5objData.bindPosAry;
	            var $dualQuatFloat32Array = new DualQuatFloat32Array;
	            $dualQuatFloat32Array.quat = new Float32Array(newIDBoneArr.length * 4);
	            $dualQuatFloat32Array.pos = new Float32Array(newIDBoneArr.length * 3);
	            for (var k = 0; k < newIDBoneArr.length; k++) {
	                var $m = baseBone[newIDBoneArr[k]].clone();
	                var $minverM = this.md5objData.invertAry[newIDBoneArr[k]].clone();
	                $m.prepend($minverM);
	                $m.appendScale(-1, 1, 1); //特别标记，因为四元数和矩阵运算结果不一
	                var $q = new Quaternion();
	                $q.fromMatrix($m);
	                var $p = $m.position;
	                $dualQuatFloat32Array.quat[k * 4 + 0] = $q.x;
	                $dualQuatFloat32Array.quat[k * 4 + 1] = $q.y;
	                $dualQuatFloat32Array.quat[k * 4 + 2] = $q.z;
	                $dualQuatFloat32Array.quat[k * 4 + 3] = $q.w;
	                $dualQuatFloat32Array.pos[k * 3 + 0] = $p.x;
	                $dualQuatFloat32Array.pos[k * 3 + 1] = $p.y;
	                $dualQuatFloat32Array.pos[k * 3 + 2] = $p.z;
	            }
	            context3D.setVc4fv(this.baseShder, "boneQ", $dualQuatFloat32Array.quat); //旋转
	            context3D.setVc3fv(this.baseShder, "boneD", $dualQuatFloat32Array.pos); //所有的位移
	            context3D.drawCall(this._md5MeshData.indexBuffer, this._md5MeshData.treNum);
	            console.log(this._md5MeshData.treNum / 3, "boid=>", newIDBoneArr.length);
	        };
	        return Md5MeshSprite;
	    }(Display3DSprite));
	    md5list.Md5MeshSprite = Md5MeshSprite;
	})(md5list || (md5list = {}));
	//# sourceMappingURL=Md5MeshSprite.js.map

/***/ }),
/* 141 */
/***/ (function(module, exports) {

	var __extends = (this && this.__extends) || (function () {
	    var extendStatics = function (d, b) {
	        extendStatics = Object.setPrototypeOf ||
	            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
	            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
	        return extendStatics(d, b);
	    };
	    return function (d, b) {
	        extendStatics(d, b);
	        function __() { this.constructor = d; }
	        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
	    };
	})();
	var md5list;
	(function (md5list) {
	    var Display3DSprite = Pan3d.Display3DSprite;
	    var LoadManager = Pan3d.LoadManager;
	    var Quaternion = Pan3d.Quaternion;
	    var DualQuatFloat32Array = Pan3d.DualQuatFloat32Array;
	    var Scene3D = Pan3d.Scene3D;
	    var Md5MoveSprite = /** @class */ (function (_super) {
	        __extends(Md5MoveSprite, _super);
	        function Md5MoveSprite(value) {
	            var _this = _super.call(this, value) || this;
	            _this.lastTm = 0;
	            _this._actionTime = 0;
	            _this.skipNum = 0;
	            _this.scene3D.progrmaManager.registe(md5list.Md5MeshShader.Md5MeshShader, new md5list.Md5MeshShader(_this.scene3D));
	            _this.md5shader = _this.scene3D.progrmaManager.getProgram(md5list.Md5MeshShader.Md5MeshShader);
	            _this.loadTexture();
	            return _this;
	        }
	        Md5MoveSprite.prototype.loadBodyMesh = function () {
	            var _this = this;
	            LoadManager.getInstance().load(this.scene3D.fileRoot + this.bodyUrl, LoadManager.XML_TYPE, function ($str) {
	                _this.md5MeshData = new md5list.Md5Analysis(_this.scene3D).addMesh($str);
	                new md5list.MeshImportSort(_this.scene3D).processMesh(_this.md5MeshData);
	                new md5list.MeshToObjUtils(_this.scene3D).getObj(_this.md5MeshData);
	                _this.loadAnimFrame();
	            });
	        };
	        Md5MoveSprite.prototype.setMd5url = function ($bodyurl, $animurl, $picurl) {
	            var _this = this;
	            if ($picurl === void 0) { $picurl = null; }
	            this.bodyUrl = $bodyurl;
	            this.animUrl = $animurl;
	            if ($picurl) {
	                this.scene3D.textureManager.getTexture(this.scene3D.fileRoot + $picurl, function ($texture) {
	                    _this.uvTextureRes = $texture;
	                });
	            }
	            this.loadBodyMesh();
	        };
	        Md5MoveSprite.prototype.loadAnimFrame = function () {
	            var _this = this;
	            LoadManager.getInstance().load(this.scene3D.fileRoot + this.animUrl, LoadManager.XML_TYPE, function ($str) {
	                var $matrixAry = new md5list.Md5animAnalysis().addAnim($str);
	                _this.frameQuestArr = new Array;
	                for (var i = 0; i < $matrixAry.length; i++) {
	                    var $frameAry = $matrixAry[i];
	                    for (var j = 0; j < $frameAry.length; j++) {
	                        $frameAry[j].prepend(_this.md5MeshData.invertAry[j]);
	                    }
	                    _this.frameQuestArr.push(_this.makeDualQuatFloat32Array($matrixAry[i]));
	                }
	            });
	        };
	        Md5MoveSprite.prototype.makeDualQuatFloat32Array = function ($frameAry) {
	            var newIDBoneArr = this.md5MeshData.boneNewIDAry;
	            var baseBone = $frameAry;
	            var $tempDq = new DualQuatFloat32Array;
	            $tempDq.quat = new Float32Array(newIDBoneArr.length * 4);
	            $tempDq.pos = new Float32Array(newIDBoneArr.length * 3);
	            for (var k = 0; k < newIDBoneArr.length; k++) {
	                var $m = baseBone[newIDBoneArr[k]].clone();
	                $m.appendScale(-1, 1, 1); //特别标记，因为四元数和矩阵运算结果不一
	                var $q = new Quaternion();
	                $q.fromMatrix($m);
	                var $p = $m.position;
	                $tempDq.quat[k * 4 + 0] = $q.x;
	                $tempDq.quat[k * 4 + 1] = $q.y;
	                $tempDq.quat[k * 4 + 2] = $q.z;
	                $tempDq.quat[k * 4 + 3] = $q.w;
	                $tempDq.pos[k * 3 + 0] = $p.x;
	                $tempDq.pos[k * 3 + 1] = $p.y;
	                $tempDq.pos[k * 3 + 2] = $p.z;
	            }
	            return $tempDq;
	        };
	        Md5MoveSprite.prototype.loadTexture = function () {
	        };
	        Md5MoveSprite.prototype.upFrame = function () {
	            if (this.md5MeshData && this.frameQuestArr && this.uvTextureRes) {
	                this.updateMaterialMeshCopy();
	            }
	        };
	        Md5MoveSprite.prototype.updateMaterialMeshCopy = function () {
	            this.baseShder = this.md5shader;
	            var context3D = this.scene3D.context3D;
	            context3D.setProgram(this.baseShder.program);
	            context3D.setVcMatrix4fv(this.baseShder, "vpMatrix3D", this.scene3D.camera3D.modelMatrix.m);
	            context3D.setVcMatrix4fv(this.baseShder, "posMatrix3D", this.posMatrix.m);
	            context3D.setRenderTexture(this.baseShder, "fc0", this.uvTextureRes.texture, 0);
	            context3D.setVa(0, 3, this.md5MeshData.vertexBuffer);
	            context3D.setVa(1, 2, this.md5MeshData.uvBuffer);
	            context3D.setVa(2, 4, this.md5MeshData.boneIdBuffer);
	            context3D.setVa(3, 4, this.md5MeshData.boneWeightBuffer);
	            var t = Pan3d.TimeUtil.getTimer() - this.lastTm;
	            this.lastTm = Pan3d.TimeUtil.getTimer();
	            this._actionTime += t;
	            var _curentFrame = float2int(this._actionTime / (Scene3D.frameTime * 2));
	            var $len = this.frameQuestArr.length;
	            var $dualQuatFloat32Array = this.frameQuestArr[_curentFrame % $len];
	            context3D.setVc4fv(this.baseShder, "boneQ", $dualQuatFloat32Array.quat); //旋转
	            context3D.setVc3fv(this.baseShder, "boneD", $dualQuatFloat32Array.pos); //所有的位移
	            context3D.drawCall(this.md5MeshData.indexBuffer, this.md5MeshData.treNum);
	        };
	        return Md5MoveSprite;
	    }(Display3DSprite));
	    md5list.Md5MoveSprite = Md5MoveSprite;
	})(md5list || (md5list = {}));
	//# sourceMappingURL=Md5MoveSprite.js.map

/***/ }),
/* 142 */
/***/ (function(module, exports) {

	function getBaseUrl() {
	    return "";
	}
	function getUItittleUrl(name) {
	    return "ui/load/tittle/" + name + ".png";
	}
	function getSkillUrl(name) {
	    var str = "skill/" + name + getBaseUrl() + ".txt";
	    return str.replace(".txt", "_byte.txt");
	}
	function getModelUrl(name) {
	    return "model/" + name + getBaseUrl() + ".txt";
	}
	function getModelUIUrl(name) {
	    return "model/" + name + getBaseUrl() + ".txt";
	}
	function getMapUrl(name) {
	    return "map/" + name + ".txt";
	}
	function getRoleUrl(name) {
	    return "role/" + name + getBaseUrl() + ".txt";
	}
	function makeImage() {
	    var _img = new Image();
	    _img.setAttribute("crossOrigin", "anonymous");
	    return _img;
	}
	function unZip($aryBuf) {
	    var compressed = new Uint8Array($aryBuf);
	    //var t = Date.now();
	    var inflate = new Zlib.Inflate(compressed);
	    var plain = inflate.decompress();
	    ////console.log("解压obj",Date.now()-t);
	    return plain.buffer;
	}
	function trim(s) {
	    return trimRight(trimLeft(s));
	} //去掉左边的空白  
	function trimLeft(s) {
	    if (s == null) {
	        return "";
	    }
	    var whitespace = new String(" \t\n\r");
	    var str = new String(s);
	    if (whitespace.indexOf(str.charAt(0)) != -1) {
	        var j = 0, i = str.length;
	        while (j < i && whitespace.indexOf(str.charAt(j)) != -1) {
	            j++;
	        }
	        str = str.substring(j, i);
	    }
	    return str;
	}
	//去掉右边的空白 www.2cto.com   
	function trimRight(s) {
	    if (s == null)
	        return "";
	    var whitespace = new String(" \t\n\r");
	    var str = new String(s);
	    if (whitespace.indexOf(str.charAt(str.length - 1)) != -1) {
	        var i = str.length - 1;
	        while (i >= 0 && whitespace.indexOf(str.charAt(i)) != -1) {
	            i--;
	        }
	        str = str.substring(0, i + 1);
	    }
	    return str;
	}
	function float2int(value) {
	    return value | 0;
	}
	function hexToArgb(expColor, is32, color) {
	    if (is32 === void 0) { is32 = true; }
	    if (color === void 0) { color = null; }
	    if (!color) {
	        color = new Pan3d.Vector3D();
	    }
	    color.w = is32 ? (expColor >> 24) & 0xFF : 0;
	    color.x = (expColor >> 16) & 0xFF;
	    color.y = (expColor >> 8) & 0xFF;
	    color.z = (expColor) & 0xFF;
	    return color;
	}
	function getZipByte($byte) {
	    var zipLen = $byte.readInt();
	    var aryBuf = $byte.buffer.slice($byte.position, $byte.position + zipLen);
	    $byte.position += zipLen;
	    var zipedBuf = unZip(aryBuf);
	    return new Pan3d.Pan3dByteArray(zipedBuf);
	}
	//# sourceMappingURL=UnitFunction.js.map

/***/ }),
/* 143 */
/***/ (function(module, exports) {

	var DisplayBaseSprite = Pan3d.DisplayBaseSprite;
	var Context3D = Pan3d.Context3D;
	var Display3dMovie = Pan3d.Display3dMovie;
	var Pan3d;
	(function (Pan3d) {
	    var ConstrainSceneView = /** @class */ (function () {
	        function ConstrainSceneView(value) {
	            this.canvas3D = value;
	            var gl = this.canvas3D.getContext('webgl', { stencil: true, alpha: true, depth: true, antialias: false })
	                || this.canvas3D.getContext('experimental-webgl', { stencil: true, alpha: true, depth: true, antialias: false });
	            this.renderContext = gl;
	            this.scene3D = new Pan3d.Scene3D(this.renderContext);
	            this.scene3D.camera3D.distance = 200;
	            this.scene3D.camera3D.rotationX = -30;
	            this.scene3D.camera3D.rotationY = 45;
	            this.addEvents();
	            // this.loadSceneByUrl("10002");
	            // this.addFrame3dSprite();
	        }
	        ConstrainSceneView.prototype.playFrame3dSprite = function () {
	            var frame3dSprite = new Pan3d.Frame3dSprite(this.scene3D);
	            this.scene3D.addDisplay(frame3dSprite);
	            return frame3dSprite;
	        };
	        ConstrainSceneView.prototype.addEvents = function () {
	            Pan3d.GameMouseManager.getInstance().addMouseEvent(this.canvas3D);
	            Pan3d.GameMouseManager.getInstance().uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Down, this.onDown, this);
	            Pan3d.GameMouseManager.getInstance().uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Move, this.onMove, this);
	            Pan3d.GameMouseManager.getInstance().uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Up, this.onUp, this);
	            Pan3d.GameMouseManager.getInstance().uiBlankStage.addEventListener(Pan3d.InteractiveEvent.WheelEvent, this.onWheelEvent, this);
	        };
	        ConstrainSceneView.prototype.onWheelEvent = function (event) {
	            this.scene3D.camera3D.distance -= event.data;
	        };
	        ConstrainSceneView.prototype.onDown = function (event) {
	            this.downPos = new Pan3d.Vector2D(event.mouseEvent.x, event.mouseEvent.y);
	            this.lastCame = new Pan3d.Camera3D();
	            this.lastCame.rotationX = this.scene3D.camera3D.rotationX;
	            this.lastCame.rotationY = this.scene3D.camera3D.rotationY;
	            this.lastCame.distance = this.scene3D.camera3D.distance;
	        };
	        ConstrainSceneView.prototype.onMove = function (event) {
	            if (this.downPos) {
	                this.scene3D.camera3D.rotationY = this.lastCame.rotationY + (this.downPos.x - event.mouseEvent.x);
	                this.scene3D.camera3D.rotationX = this.lastCame.rotationX + (this.downPos.y - event.mouseEvent.y);
	            }
	        };
	        ConstrainSceneView.prototype.onUp = function (event) {
	            this.downPos = null;
	        };
	        ConstrainSceneView.prototype.loadSceneByUrl = function (value) {
	            var _this = this;
	            this.scene3D.camera3D.distance = 1500;
	            var sceneRes = new Pan3d.SceneRes(this.scene3D);
	            //10002
	            //2014
	            sceneRes.load(value, function () {
	                var buildAry = sceneRes.sceneData.buildItem;
	                //  //console.log(obj.fogDistance)
	                var d = sceneRes.sceneData.fogDistance * 1; //1000
	                var s = sceneRes.sceneData.fogAttenuation; //0.5.
	                _this.scene3D.fogData = [d * s, 1 / ((1 - s) * d)];
	                for (var i = 0; i < buildAry.length; i++) {
	                    var itemObj = buildAry[i];
	                    if (itemObj.type == Pan3d.BaseRes.PREFAB_TYPE) {
	                        if (itemObj.id == 24) {
	                        }
	                        _this.scene3D.addDisplay(_this.getBuildSprite(itemObj));
	                    }
	                    else if (itemObj.type == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
	                        var particle = _this.getParticleSprite(itemObj);
	                        _this.scene3D.particleManager.addParticle(particle);
	                    }
	                }
	            }, function () {
	            }, function () {
	            });
	        };
	        ConstrainSceneView.prototype.getParticleSprite = function (itemObj) {
	            var particle;
	            particle = this.scene3D.particleManager.getParticleByte(this.scene3D.fileRoot + itemObj.url);
	            particle.scaleX = itemObj.scaleX;
	            particle.scaleY = itemObj.scaleY;
	            particle.scaleZ = itemObj.scaleZ;
	            particle.x = itemObj.x;
	            particle.y = itemObj.y;
	            particle.z = itemObj.z;
	            particle.rotationX = itemObj.rotationX;
	            particle.rotationY = itemObj.rotationY;
	            particle.rotationZ = itemObj.rotationZ;
	            particle.type = 0;
	            return particle;
	        };
	        ConstrainSceneView.prototype.getBuildSprite = function (value) {
	            var itemDisplay = new Pan3d.Display3DSprite(this.scene3D);
	            itemDisplay.setObjUrl(value.objsurl);
	            itemDisplay.setMaterialUrl(value.materialurl, value.materialInfoArr);
	            if (value.lighturl) {
	                itemDisplay.setLighturl(value.lighturl);
	            }
	            itemDisplay.scaleX = value.scaleX;
	            itemDisplay.scaleY = value.scaleY;
	            itemDisplay.scaleZ = value.scaleZ;
	            itemDisplay.x = value.x;
	            itemDisplay.y = value.y;
	            itemDisplay.z = value.z;
	            itemDisplay.rotationX = value.rotationX;
	            itemDisplay.rotationY = value.rotationY;
	            itemDisplay.rotationZ = value.rotationZ;
	            return itemDisplay;
	        };
	        ConstrainSceneView.prototype.resetSize = function () {
	            var mixNum = Math.min(document.body.clientWidth, document.body.clientHeight);
	            var stageWidth = mixNum;
	            var stageHeight = mixNum;
	            this.canvas3D.width = stageWidth;
	            this.canvas3D.height = stageHeight;
	            this.renderContext.viewport(0, 0, stageWidth, stageHeight);
	            // this.canvas3D.style.position = "absolute";
	            // this.canvas3D.style.left = "0px";
	            // this.canvas3D.style.top = "0px";
	            /*
	            var mixNum:number=400;
	            var stageWidth: number = mixNum;
	            var stageHeight: number =mixNum;
	            this.canvas3D.width = stageWidth;
	            this.canvas3D.height = stageHeight;
	            this.renderContext.viewport(0, 0, stageWidth, stageHeight);
	            */
	        };
	        ConstrainSceneView.prototype.clearAll = function () {
	            console.log("清理");
	            this.scene3D.clearAll();
	        };
	        ConstrainSceneView.prototype.upFrame = function () {
	            this.scene3D.upFrame();
	        };
	        ConstrainSceneView.prototype.addRoleToSceneByUrl = function (val, pos) {
	            var sc = new Pan3d.SceneChar(this.scene3D);
	            sc.setRoleUrl("role/" + val + ".txt");
	            sc.x = pos.x;
	            sc.y = pos.y;
	            sc.z = pos.z;
	            this.scene3D.addMovieDisplay(sc);
	            // sc.addPart(SceneChar.WEAPON_PART, SceneChar.WEAPON_DEFAULT_SLOT, "model/50011.txt");
	            return sc;
	        };
	        ConstrainSceneView.prototype.playParticle = function (name) {
	            var _this = this;
	            // var url: string = "model/" + name + "_lyf.txt";
	            this.scene3D.groupDataManager.getGroupData(this.scene3D.fileRoot + name, function (groupRes) {
	                for (var i = 0; i < groupRes.dataAry.length; i++) {
	                    var item = groupRes.dataAry[i];
	                    var posV3d;
	                    var rotationV3d;
	                    var scaleV3d;
	                    if (item.isGroup) {
	                        posV3d = new Pan3d.Vector3D(item.x, item.y, item.z);
	                        rotationV3d = new Pan3d.Vector3D(item.rotationX, item.rotationY, item.rotationZ);
	                        scaleV3d = new Pan3d.Vector3D(item.scaleX, item.scaleY, item.scaleZ);
	                    }
	                    if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
	                        var particle = _this.scene3D.particleManager.getParticleByte(_this.scene3D.fileRoot + item.particleUrl);
	                        _this.scene3D.particleManager.addParticle(particle);
	                    }
	                }
	            });
	        };
	        return ConstrainSceneView;
	    }());
	    Pan3d.ConstrainSceneView = ConstrainSceneView;
	})(Pan3d || (Pan3d = {}));
	//# sourceMappingURL=ConstrainSceneView.js.map

/***/ }),
/* 144 */
/***/ (function(module, exports) {

	var Vector3D = Pan3d.Vector3D;
	var ConstrainSceneView = Pan3d.ConstrainSceneView;
	var SceneChar = Pan3d.SceneChar;
	var GridLineSprite = Pan3d.GridLineSprite;
	var Skill = Pan3d.Skill;
	var Md5MeshSprite = md5list.Md5MeshSprite;
	var Md5MoveSprite = md5list.Md5MoveSprite;
	var MenuEventModel = /** @class */ (function () {
	    function MenuEventModel() {
	    }
	    MenuEventModel.getInstance = function () {
	        if (!this._instance) {
	            this._instance = new MenuEventModel();
	        }
	        return this._instance;
	    };
	    MenuEventModel.prototype.selectSceneByJson = function (value, sceneView) {
	        var sceneinfo = value;
	        for (var key in sceneinfo) {
	            var tempInfo = sceneinfo[key];
	            var type = tempInfo["type"];
	            var textStr = tempInfo["text"];
	            //添加测试函数
	            if (type == 1) { //场景
	                sceneView.loadSceneByUrl(textStr);
	            }
	            if (type == 2) { //特效
	                sceneView.playParticle(textStr);
	            }
	            if (type == 3) { //角色
	                var sc = new SceneChar(sceneView.scene3D);
	                sc.setRoleUrl(textStr);
	                sceneView.scene3D.addMovieDisplay(sc);
	                var info = tempInfo["info"];
	                if (info) {
	                    if (info["addPart"]) {
	                        var addPart = info["addPart"];
	                        var bindSocket = info["bindSocket"];
	                        var model = info["model"];
	                        sc.addPart(addPart, bindSocket, getModelUrl(model));
	                    }
	                    if (info["mount"]) {
	                        sc.setMountCharByName("5104");
	                    }
	                    if (info["action"]) {
	                        sc.play(info["action"]);
	                        console.log(info["action"]);
	                    }
	                }
	            }
	            if (type == 4) { //动画
	                sceneView.playFrame3dSprite();
	            }
	            if (type == 5) { //md5
	                // $sc.setMd5url("pan/expmd5/2/body.md5mesh", "pan/expmd5/2/stand.md5anim", "pan/expmd5/shuangdaonv.jpg");
	                // var md5mesh:  Md5MeshSprite = new  Md5MeshSprite(sceneView.scene3D);
	                // md5mesh.setMd5BodyUrl("pan/expmd5/2/body.md5mesh");
	                // sceneView.scene3D.addDisplay(md5mesh)
	                var md5MoveSprite = new Md5MoveSprite(sceneView.scene3D);
	                md5MoveSprite.setMd5url("pan/expmd5/2/body.md5mesh", "pan/expmd5/2/stand.md5anim", "pan/expmd5/shuangdaonv.jpg");
	                sceneView.scene3D.addDisplay(md5MoveSprite);
	            }
	        }
	    };
	    MenuEventModel.prototype.selectButByValue = function (value, sceneView) {
	        var arr = value.split("|");
	        var keyStr = arr[0];
	        var infoStr = arr.length > 1 ? arr[1] : null;
	        switch (keyStr) {
	            case "清理":
	                if (infoStr == "网格") {
	                    sceneView.scene3D.addDisplay(new GridLineSprite(sceneView.scene3D));
	                }
	                if (infoStr == "所以") {
	                    sceneView.clearAll();
	                }
	                break;
	            case "场景":
	                if (infoStr == null) {
	                }
	                else {
	                    sceneView.loadSceneByUrl(infoStr);
	                }
	                break;
	            case "frame3d":
	                sceneView.playFrame3dSprite();
	                break;
	            case "角色":
	                if (infoStr == null) {
	                }
	                else {
	                    sceneView.addRoleToSceneByUrl(infoStr, new Vector3D(0, 0, 0));
	                }
	                break;
	            case "特效":
	                if (infoStr == null) {
	                }
	                else {
	                    sceneView.playParticle("model/" + infoStr + "_lyf.txt");
	                }
	                break;
	            case "坐骑":
	                if (infoStr == null) {
	                    if (this.mainChar == null) {
	                        console.log("加载角色");
	                        this.mainChar = sceneView.addRoleToSceneByUrl("50011", new Vector3D(0, 0, 0));
	                    }
	                }
	                else {
	                    if (this.mainChar != null) {
	                        this.mainChar.setMountCharByName("5104");
	                        this.mainChar.play("stand_mount");
	                        // public static STAND_MOUNT: string = "stand_mount_01";
	                        // public static WALK_MOUNT: string = "walk_mount_01";
	                        // SceneChar.MOUNT_SLOT
	                    }
	                }
	                break;
	            case "武器":
	                if (infoStr == null) {
	                    if (this.mainChar == null) {
	                        console.log("加载角色");
	                        this.mainChar = sceneView.addRoleToSceneByUrl("50011", new Vector3D(0, 0, 0));
	                    }
	                }
	                else {
	                    if (this.mainChar != null) {
	                        this.mainChar.addPart(SceneChar.WEAPON_PART, "w_01", getModelUrl("weapon1"));
	                    }
	                }
	                break;
	            case "技能":
	                if (infoStr == null) {
	                    if (this.mainChar == null) {
	                        console.log("加载角色");
	                        this.mainChar = sceneView.addRoleToSceneByUrl("50011", new Vector3D(0, 0, 0));
	                    }
	                }
	                else {
	                    var filename = arr[1];
	                    var skillname = arr[2];
	                    // var skill: Skill = sceneView.scene3D.skillManager.getSkill("skill/jichu_1_byte.txt", "m_skill_01", null);
	                    var skill = sceneView.scene3D.skillManager.getSkill("skill/" + filename + "_byte.txt", skillname, null);
	                    if (this.mainChar != null) {
	                        skill.reset();
	                        skill.configFixEffect(this.mainChar, null, null);
	                        this.mainChar.playSkill(skill);
	                    }
	                }
	                break;
	            default:
	                break;
	        }
	    };
	    return MenuEventModel;
	}());
	//# sourceMappingURL=MenuEventModel.js.map

/***/ })
/******/ ]);