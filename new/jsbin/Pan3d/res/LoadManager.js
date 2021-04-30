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