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
    var Camera3D = /** @class */ (function (_super) {
        __extends(Camera3D, _super);
        function Camera3D() {
            var _this = _super.call(this) || this;
            _this.camMatrix3D = new Pan3d.Matrix3D();
            _this.viewMatrix = new Pan3d.Matrix3D();
            _this.modelMatrix = new Pan3d.Matrix3D();
            _this.distance = 500;
            _this.sceneViewHW = 100;
            _this.fovw = 300;
            _this.fovh = 500;
            _this.rotationX = -30;
            _this.rotationY = 45;
            return _this;
        }
        Object.defineProperty(Camera3D.prototype, "cameraMatrix", {
            get: function () {
                return this.modelMatrix;
            },
            enumerable: false,
            configurable: true
        });
        Camera3D.prototype.upFrame = function () {
            this.viewMatrix.identity();
            this.viewMatrix.perspectiveFieldOfViewLH(1, 1, 10, 5000);
            this.camMatrix3D.identity();
            this.camMatrix3D.appendRotation(this.rotationY, Pan3d.Vector3D.Y_AXIS);
            this.camMatrix3D.appendRotation(this.rotationX, Pan3d.Vector3D.X_AXIS);
            this.camMatrix3D.appendTranslation(0, 0, this.distance);
            this.modelMatrix = this.viewMatrix.clone();
            this.modelMatrix.prepend(this.camMatrix3D);
            var m = this.camMatrix3D.clone();
            m.invert();
            var p = m.transformVector(new Pan3d.Vector3D(0, 0, -this.distance));
            this.x = p.x;
            this.y = p.y;
            this.z = p.z;
        };
        return Camera3D;
    }(Pan3d.Object3D));
    Pan3d.Camera3D = Camera3D;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Camera3D.js.map