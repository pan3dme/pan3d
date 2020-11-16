var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var layapan;
(function (layapan) {
    var CombineParticle = Pan3d.CombineParticle;
    var CombineParticleData = Pan3d.CombineParticleData;
    var ParticleManager = Pan3d.ParticleManager;
    var LayaOverride2dParticleManager = /** @class */ (function (_super) {
        __extends(LayaOverride2dParticleManager, _super);
        function LayaOverride2dParticleManager() {
            return _super.call(this) || this;
        }
        LayaOverride2dParticleManager.prototype.getParticleByte = function ($url) {
            $url = $url.replace("_byte.txt", ".txt");
            $url = $url.replace(".txt", "_byte.txt");
            var combineParticle = new CombineParticle();
            var url = $url;
            if (ParticleManager.getInstance()._dic[url]) {
                var baseData = ParticleManager.getInstance()._dic[url];
                combineParticle = baseData.getCombineParticle();
            }
            combineParticle.url = url;
            return combineParticle;
        };
        LayaOverride2dParticleManager.prototype.registerUrl = function ($url) {
            $url = $url.replace("_byte.txt", ".txt");
            $url = $url.replace(".txt", "_byte.txt");
            if (ParticleManager.getInstance()._dic[$url]) {
                var baseData = ParticleManager.getInstance()._dic[$url];
                baseData.useNum++;
            }
        };
        LayaOverride2dParticleManager.prototype.releaseUrl = function ($url) {
            $url = $url.replace("_byte.txt", ".txt");
            $url = $url.replace(".txt", "_byte.txt");
            if (ParticleManager.getInstance()._dic[$url]) {
                var baseData = ParticleManager.getInstance()._dic[$url];
                baseData.clearUseNum();
            }
        };
        LayaOverride2dParticleManager.prototype.addResByte = function ($url, $data) {
            if (!ParticleManager.getInstance()._dic[$url]) {
                var baseData = new CombineParticleData();
                ////console.log("load particle",$url);
                baseData.setDataByte($data);
                ParticleManager.getInstance()._dic[$url] = baseData;
            }
        };
        return LayaOverride2dParticleManager;
    }(ParticleManager));
    layapan.LayaOverride2dParticleManager = LayaOverride2dParticleManager;
})(layapan || (layapan = {}));
//# sourceMappingURL=LayaOverride2dParticleManager.js.map