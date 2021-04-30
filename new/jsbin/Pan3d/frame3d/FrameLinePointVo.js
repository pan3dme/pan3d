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
    var FrameLinePointVo = /** @class */ (function (_super) {
        __extends(FrameLinePointVo, _super);
        function FrameLinePointVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        FrameLinePointVo.prototype.writeObject = function ($obj) {
            this.time = $obj.time;
            this.id = $obj.id;
            this.iskeyFrame = $obj.iskeyFrame;
            this.isAnimation = $obj.isAnimation;
            this.x = $obj.x / 10;
            this.y = $obj.y / 10;
            this.z = $obj.z / 10;
            this.scaleX = $obj.scaleX / 10;
            this.scaleY = $obj.scaleY / 10;
            this.scaleZ = $obj.scaleZ / 10;
            this.rotationX = $obj.rotationX;
            this.rotationY = $obj.rotationY;
            this.rotationZ = $obj.rotationZ;
            this.data = $obj.data;
            FrameLinePointVo.maxTime = Math.max(this.time, FrameLinePointVo.maxTime);
        };
        FrameLinePointVo.maxTime = 0;
        return FrameLinePointVo;
    }(Pan3d.Object3D));
    Pan3d.FrameLinePointVo = FrameLinePointVo;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=FrameLinePointVo.js.map