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