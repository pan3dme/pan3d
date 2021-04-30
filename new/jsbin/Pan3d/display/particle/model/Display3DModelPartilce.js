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