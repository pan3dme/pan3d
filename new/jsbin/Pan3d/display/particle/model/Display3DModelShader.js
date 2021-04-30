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
    var Display3DModelShader = /** @class */ (function (_super) {
        __extends(Display3DModelShader, _super);
        function Display3DModelShader() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return Display3DModelShader;
    }(Pan3d.Shader3D));
    Pan3d.Display3DModelShader = Display3DModelShader;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=Display3DModelShader.js.map