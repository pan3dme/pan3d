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