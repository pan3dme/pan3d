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
    var Display3DFacetParticle = /** @class */ (function (_super) {
        __extends(Display3DFacetParticle, _super);
        function Display3DFacetParticle(value) {
            var _this = _super.call(this, value) || this;
            _this.uvMove = new Float32Array(2);
            return _this;
        }
        Object.defineProperty(Display3DFacetParticle.prototype, "facetdata", {
            get: function () {
                return this.data;
            },
            enumerable: false,
            configurable: true
        });
        Display3DFacetParticle.prototype.creatData = function () {
            this.data = new Pan3d.ParticleFacetData(this.scene3D);
        };
        Display3DFacetParticle.prototype.setVc = function () {
            _super.prototype.setVa.call(this);
            this.setViewCamModeMatr3d();
            this.updateRotaionMatrix();
            this.updateUV();
            var ctx = this.scene3D.context3D;
            ctx.setVcMatrix4fv(this.shader, "rotMatrix", this._rotationMatrix.m);
            ctx.setVc2fv(this.shader, "uvMove", this.uvMove);
        };
        Display3DFacetParticle.prototype.updateRotaionMatrix = function () {
            this._rotationMatrix.identity();
            if (this.data._watchEye) {
                this.timeline.inverAxisRotation(this._rotationMatrix);
                if (!this.facetdata._locky && !this.facetdata._lockx) {
                    this.inverBind();
                }
                if (!this.facetdata._locky) {
                    this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationY, Pan3d.Vector3D.Y_AXIS);
                }
                if (!this.facetdata._lockx) {
                    this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationX, Pan3d.Vector3D.X_AXIS);
                }
            }
            if (this.data._isZiZhuan) {
                this.timeline.applySelfRotation(this._rotationMatrix, this.data._ziZhuanAngly);
            }
        };
        Display3DFacetParticle.prototype.updateUV = function () {
            var currentFrame = float2int(this._time / Pan3d.Scene3D.frameTime);
            currentFrame = currentFrame > this.facetdata._maxAnimTime ? this.facetdata._maxAnimTime : currentFrame;
            currentFrame = (currentFrame / this.data._animInterval) % (this.data._animLine * this.data._animRow);
            this.uvMove[0] = float2int(currentFrame % this.data._animLine) / this.data._animLine + this._time / Pan3d.Scene3D.frameTime * this.data._uSpeed;
            this.uvMove[1] = float2int(currentFrame / this.data._animLine) / this.data._animRow + this._time / Pan3d.Scene3D.frameTime * this.data._vSpeed;
        };
        Display3DFacetParticle.prototype.inverBind = function () {
        };
        Display3DFacetParticle.prototype.setVa = function () {
            var ctx = this.scene3D.context3D;
            var tf = ctx.pushVa(this.data.objData.vertexBuffer);
            if (!tf) {
                ctx.setVaOffset(0, 3, this.data.objData.stride, 0);
                ctx.setVaOffset(1, 2, this.data.objData.stride, 12);
            }
            ctx.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
        };
        return Display3DFacetParticle;
    }(Pan3d.Display3DParticle));
    Pan3d.Display3DFacetParticle = Display3DFacetParticle;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DFacetParticle.js.map