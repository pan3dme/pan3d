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
var canonkey;
(function (canonkey) {
    var FixedRotation_html = /** @class */ (function (_super) {
        __extends(FixedRotation_html, _super);
        function FixedRotation_html() {
            return _super.call(this) || this;
        }
        FixedRotation_html.prototype.initData = function () {
            var world = canonkey.Physics.world;
            var size = 1.0;
            world.broadphase = new CANNON.NaiveBroadphase();
            // ground plane
            // Create a box with fixed rotation
            var shape = new CANNON.Box(new CANNON.Vec3(size, size, size));
            var boxBody = new CANNON.Body({ mass: 1 });
            boxBody.addShape(shape);
            boxBody.position.set(0, 0, size);
            boxBody.fixedRotation = true;
            boxBody.updateMassProperties();
            var $disLock = new canonkey.CanonPrefabSprite(boxBody);
            $disLock.addToWorld();
            // Another one
            var shape2 = new CANNON.Box(new CANNON.Vec3(size, size, size));
            var boxBody2 = new CANNON.Body({ mass: 1, });
            boxBody2.addShape(shape2);
            boxBody2.position.set(size * 3 / 2, 0, size * 4);
            boxBody2.fixedRotation = true;
            boxBody2.updateMassProperties();
            var $disLock = new canonkey.CanonPrefabSprite(boxBody2);
            $disLock.addToWorld();
            // Change gravity so the boxes will slide along x axis
            world.gravity.set(0, 0, -10);
        };
        return FixedRotation_html;
    }(canonkey.DemoBase_html));
    canonkey.FixedRotation_html = FixedRotation_html;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=FixedRotation_html.js.map