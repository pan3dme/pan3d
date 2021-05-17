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
    var Display3D = /** @class */ (function (_super) {
        __extends(Display3D, _super);
        function Display3D(value) {
            var _this = _super.call(this) || this;
            _this.sceneVisible = true;
            _this.scene3D = value;
            _this.posMatrix = new Pan3d.Matrix3D();
            return _this;
        }
        Display3D.prototype.upFrame = function () {
        };
        Display3D.prototype.updateMatrix = function () {
            this.posMatrix.identity();
            this.posMatrix.appendScale(this.scaleX, this.scaleY, this.scaleZ);
            this.posMatrix.appendRotation(this.rotationX, Pan3d.Vector3D.X_AXIS);
            this.posMatrix.appendRotation(this.rotationY, Pan3d.Vector3D.Y_AXIS);
            this.posMatrix.appendRotation(this.rotationZ, Pan3d.Vector3D.Z_AXIS);
            this.posMatrix.appendTranslation(this.x, this.y, this.z);
        };
        return Display3D;
    }(Pan3d.Object3D));
    Pan3d.Display3D = Display3D;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3D.js.map