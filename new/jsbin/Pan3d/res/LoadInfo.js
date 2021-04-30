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