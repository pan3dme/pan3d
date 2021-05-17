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
    var Display3DBallPartilce = /** @class */ (function (_super) {
        __extends(Display3DBallPartilce, _super);
        function Display3DBallPartilce(value) {
            return _super.call(this, value) || this;
            // this.scene3D.progrmaManager.registe(BallTestShader.BallTestShader,new BallTestShader(this.scene3D));
            // this.shader=  this.scene3D.progrmaManager.getProgram(BallTestShader.BallTestShader);
        }
        Display3DBallPartilce.prototype.setVc = function () {
            _super.prototype.setVc.call(this);
            this.updateWatchCaramMatrix();
            this.setViewCamModeMatr3d();
            var ctx = this.scene3D.context3D;
            ctx.setVcMatrix4fv(this.data.materialParam.shader, "rotMatrix", this._rotationMatrix.m);
            var tm = this._time / Pan3d.Scene3D.frameTime * this.balldata._playSpeed;
            var timeVec = this.balldata._timeVec;
            timeVec.x = tm;
            ctx.setVc4fv(this.data.materialParam.shader, "vcmat50", [timeVec.x, timeVec.y, timeVec.z, timeVec.w]);
            var scaleVec = this.balldata._scaleVec;
            ctx.setVc4fv(this.data.materialParam.shader, "vcmat51", [scaleVec.x, scaleVec.y, scaleVec.z, scaleVec.w]);
            var scaleCtrl = this.balldata._scaleCtrlVec;
            ctx.setVc4fv(this.data.materialParam.shader, "vcmat52", [scaleCtrl.x, scaleCtrl.y, scaleCtrl.z, scaleCtrl.w]);
            var addSpeedVec = this.balldata._addSpeedVec;
            ctx.setVc4fv(this.data.materialParam.shader, "vcmat53", [addSpeedVec.x, addSpeedVec.y, addSpeedVec.z, addSpeedVec.w]);
        };
        Object.defineProperty(Display3DBallPartilce.prototype, "balldata", {
            get: function () {
                return this.data;
            },
            enumerable: false,
            configurable: true
        });
        Display3DBallPartilce.prototype.updateWatchCaramMatrix = function () {
            this._rotationMatrix.identity();
            if (this.balldata.facez) {
                this._rotationMatrix.prependRotation(90, Pan3d.Vector3D.X_AXIS);
            }
            else if (this.balldata._is3Dlizi) {
                this.timeline.inverAxisRotation(this._rotationMatrix);
            }
            else if (this.balldata._watchEye) {
                this.timeline.inverAxisRotation(this._rotationMatrix);
                this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationY, Pan3d.Vector3D.Y_AXIS);
                this._rotationMatrix.prependRotation(-this.scene3D.cam3D.rotationX, Pan3d.Vector3D.X_AXIS);
            }
        };
        Display3DBallPartilce.prototype.setVa = function () {
            var ctx = this.scene3D.context3D;
            var tf = ctx.pushVa(this.data.objData.vertexBuffer);
            if (!tf) {
                ctx.setVaOffset(0, 3, this.data.objData.stride, 0);
                ctx.setVaOffset(1, 3, this.data.objData.stride, 12);
                ctx.setVaOffset(2, 4, this.data.objData.stride, 24);
                ctx.setVaOffset(3, 3, this.data.objData.stride, 40);
                if (this.balldata._needSelfRotation) {
                    ctx.setVaOffset(4, 2, this.data.objData.stride, 52);
                }
            }
            ctx.drawCall(this.data.objData.indexBuffer, this.data.objData.treNum);
        };
        return Display3DBallPartilce;
    }(Pan3d.Display3DParticle));
    Pan3d.Display3DBallPartilce = Display3DBallPartilce;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DBallPartilce.js.map