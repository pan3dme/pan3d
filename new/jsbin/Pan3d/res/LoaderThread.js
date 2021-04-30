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