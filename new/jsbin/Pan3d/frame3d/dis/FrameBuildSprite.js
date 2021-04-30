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