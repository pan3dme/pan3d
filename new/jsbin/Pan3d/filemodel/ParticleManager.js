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