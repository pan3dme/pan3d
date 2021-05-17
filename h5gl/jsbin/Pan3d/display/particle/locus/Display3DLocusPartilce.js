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
    var Display3DLocusPartilce = /** @class */ (function (_super) {
        __extends(Display3DLocusPartilce, _super);
        function Display3DLocusPartilce() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        Object.defineProperty(Display3DLocusPartilce.prototype, "locusdata", {
            get: function () {
                return this.data;
            },
            enumerable: false,
            configurable: true
        });
        Display3DLocusPartilce.prototype.creatData = function () {
            this.data = new Pan3d.ParticleLocusData(this.scene3D);
        };
        Display3DLocusPartilce.prototype.setVa = function () {
            var ctx = this.scene3D.context3D;
            var tf = ctx.pushVa(this.data.objData.vertexBuffer);
            if (!tf) {
                ctx.setVaOffset(0, 3, this.data.objData.stride, 0);
                ctx.setVaOffset(1, 2, this.data.objData.stride, 28);
                if (this.data._watchEye) {
                    ctx.setVaOffset(2, 4, this.data.objData.stride, 12);
                }
            }
            this.setMaterialTexture();
            ctx.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
        };
        Display3DLocusPartilce.prototype.setVc = function () {
            this.updateUV();
            var ctx = this.scene3D.context3D;
            this.setViewCamModeMatr3d();
            ctx.setVc3fv(this.shader, "vcmat30", this.locusdata._resultUvVec);
            if (this.data._watchEye) {
                var cam3D = this.scene3D.cam3D;
                ctx.setVc4fv(this.shader, "v3CamPos", [cam3D.x, cam3D.y, cam3D.z, cam3D.w]);
            }
            if (this.locusdata._changUv) {
            }
            this.setMaterialVc();
        };
        Display3DLocusPartilce.prototype.updateUV = function () {
            var $nowTime = this._time / Pan3d.Scene3D.frameTime;
            var $lifeRoundNum = (this.data._life / 100);
            var $moveUv = this.locusdata._speed * $nowTime / this.locusdata._density / 10;
            if (this.locusdata._isEnd) {
                $moveUv = Math.min(1, $moveUv);
            }
            if (this.locusdata._isLoop) {
                if (this.locusdata._life) {
                    $moveUv = $moveUv % ($lifeRoundNum + 1);
                }
                else {
                    $moveUv = $moveUv % 1;
                }
            }
            this.locusdata._resultUvVec[0] = $moveUv;
        };
        return Display3DLocusPartilce;
    }(Pan3d.Display3DParticle));
    Pan3d.Display3DLocusPartilce = Display3DLocusPartilce;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DLocusPartilce.js.map