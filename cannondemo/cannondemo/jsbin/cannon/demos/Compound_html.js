var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    }
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var canonkey;
(function (canonkey) {
    var Compound_html = /** @class */ (function (_super) {
        __extends(Compound_html, _super);
        function Compound_html() {
            return _super.call(this) || this;
        }
        Compound_html.prototype.initData = function () {
            var world = canonkey.Physics.world;
            var s = 1.5;
            // Now create a Body for our Compound
            var mass = 10;
            var body = new CANNON.Body({ mass: mass });
            body.position.set(0, 0, 6);
            body.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 10);
            // Use a box shape as child shape
            var shape = new CANNON.Box(new CANNON.Vec3(0.5 * s, 0.5 * s, 0.5 * s));
            // We can add the same shape several times to position child shapes within the Compound.
            body.addShape(shape, new CANNON.Vec3(s, 0, -s));
            //body.addShape(shape, new CANNON.Vec3(s, 0, s));
            //body.addShape(shape, new CANNON.Vec3(-s, 0, -s));
            //body.addShape(shape, new CANNON.Vec3(-s, 0, s));
            // Note: we only use translational offsets. The third argument could be a CANNON.Quaternion to rotate the child shape.
            body.addShape(shape, new CANNON.Vec3(-s, 0, 0));
            body.addShape(shape, new CANNON.Vec3(0, 0, -s));
            body.addShape(shape, new CANNON.Vec3(0, 0, s));
            var $disLock = new canonkey.CanonPrefabSprite(body);
            $disLock.addToWorld();
        };
        return Compound_html;
    }(canonkey.DemoBase_html));
    canonkey.Compound_html = Compound_html;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=Compound_html.js.map