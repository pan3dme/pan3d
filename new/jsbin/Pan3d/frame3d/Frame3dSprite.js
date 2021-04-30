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
    var Frame3dSprite = /** @class */ (function (_super) {
        __extends(Frame3dSprite, _super);
        function Frame3dSprite(value) {
            var _this = _super.call(this, value) || this;
            _this.lastTime = 0;
            _this.frameImodelItem = new Array;
            _this.frame3dRes = new Pan3d.Frame3dRes(_this.scene3D);
            _this.frame3dRes.load(_this.scene3D.fileRoot + "pan/frame3dres/huowumatou_frame.txt", function () { return _this.loadFrame3DFinish(); });
            return _this;
        }
        Frame3dSprite.prototype.loadFrame3DFinish = function () {
            for (var i = 0; i < this.frame3dRes.frameItem.length; i++) {
                var $base = new Pan3d.FrameFileNode(this.scene3D);
                $base.setFrameNodeVo(this.frame3dRes.frameItem[i]);
                this.frameImodelItem.push($base);
            }
        };
        Frame3dSprite.prototype.upFrame = function () {
            this.mathTimeFrame();
            for (var i = 0; i < this.frameImodelItem.length; i++) {
                this.frameImodelItem[i].update();
            }
        };
        Frame3dSprite.prototype.mathTimeFrame = function () {
            if (isNaN(Pan3d.Frame3dRes.frameNum)) {
                Pan3d.Frame3dRes.frameNum = 0;
            }
            var dt = Pan3d.TimeUtil.getTimer() - this.lastTime;
            Pan3d.Frame3dRes.frameNum += dt / (1000 / Pan3d.Frame3dRes.frameSpeedNum);
            Pan3d.Frame3dRes.frameNum = Pan3d.Frame3dRes.frameNum % (Pan3d.FrameLinePointVo.maxTime - 1);
            this.lastTime = Pan3d.TimeUtil.getTimer();
        };
        return Frame3dSprite;
    }(Pan3d.Display3D));
    Pan3d.Frame3dSprite = Frame3dSprite;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Frame3dSprite.js.map