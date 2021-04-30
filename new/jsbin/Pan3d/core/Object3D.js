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
    var Object3D = /** @class */ (function (_super) {
        __extends(Object3D, _super);
        function Object3D() {
            var _this = _super.call(this) || this;
            _this.rotationX = 0;
            _this.rotationY = 0;
            _this.rotationZ = 0;
            _this.scaleX = 1;
            _this.scaleY = 1;
            _this.scaleZ = 1;
            return _this;
        }
        return Object3D;
    }(Pan3d.Vector3D));
    Pan3d.Object3D = Object3D;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Object3D.js.map