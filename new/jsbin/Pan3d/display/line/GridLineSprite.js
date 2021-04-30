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
    var GridLineSprite = /** @class */ (function (_super) {
        __extends(GridLineSprite, _super);
        function GridLineSprite(value) {
            return _super.call(this, value) || this;
        }
        GridLineSprite.prototype.initData = function () {
            var w = 100;
            var n = 10;
            var skeep = w / n;
            this.clear();
            var a;
            var b;
            a = new Pan3d.Vector3D(0, 0, +w);
            b = new Pan3d.Vector3D(0, 0, -w);
            this.makeLineMode(a, b, new Pan3d.Vector3D(0, 0, 1, 1));
            a = new Pan3d.Vector3D(+w, 0, 0);
            b = new Pan3d.Vector3D(-w, 0, 0);
            this.makeLineMode(a, b, new Pan3d.Vector3D(1, 0, 0, 1));
            this.baseColor = new Pan3d.Vector3D(128 / 255, 128 / 255, 128 / 255, 1);
            for (var i = 1; i <= n; i++) {
                a = new Pan3d.Vector3D(+i * skeep, 0, +w);
                b = new Pan3d.Vector3D(+i * skeep, 0, -w);
                this.makeLineMode(a, b);
                a = new Pan3d.Vector3D(-i * skeep, 0, +w);
                b = new Pan3d.Vector3D(-i * skeep, 0, -w);
                this.makeLineMode(a, b);
                a = new Pan3d.Vector3D(+w, 0, +i * skeep);
                b = new Pan3d.Vector3D(-w, 0, +i * skeep);
                this.makeLineMode(a, b);
                a = new Pan3d.Vector3D(+w, 0, -i * skeep);
                b = new Pan3d.Vector3D(-w, 0, -i * skeep);
                this.makeLineMode(a, b);
            }
            this.upToGpu();
        };
        return GridLineSprite;
    }(Pan3d.LineDisplaySprite));
    Pan3d.GridLineSprite = GridLineSprite;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=GridLineSprite.js.map