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