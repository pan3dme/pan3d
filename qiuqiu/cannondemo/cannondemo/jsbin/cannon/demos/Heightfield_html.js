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
    var Heightfield_html = /** @class */ (function (_super) {
        __extends(Heightfield_html, _super);
        function Heightfield_html() {
            return _super.call(this) || this;
        }
        Heightfield_html.prototype.initData = function () {
            var world = canonkey.Physics.world;
            world.gravity.set(0, 0, -10);
            // Create a matrix of height values
            var matrix = [];
            var sizeX = 15, sizeY = 15;
            for (var i = 0; i < sizeX; i++) {
                matrix.push([]);
                for (var j = 0; j < sizeY; j++) {
                    var height = Math.cos(i / sizeX * Math.PI * 2) * Math.cos(j / sizeY * Math.PI * 2) + 2;
                    if (i === 0 || i === sizeX - 1 || j === 0 || j === sizeY - 1)
                        height = 3;
                    matrix[i].push(height);
                }
            }
            // Create the heightfield
            var hfShape = new CANNON.Heightfield(matrix, {
                elementSize: 1
            });
            var hfBody = new CANNON.Body({ mass: 0 });
            hfBody.addShape(hfShape);
            hfBody.position.set(0, 0, 0);
            var $disLock = new canonkey.CanonPrefabSprite(hfBody);
            $disLock.addToWorld();
            // Add spheres
            var mass = 1;
            for (var i = 0; i < sizeX - 1; i++) {
                for (var j = 0; j < sizeY - 1; j++) {
                    if (i === 0 || i >= sizeX - 2 || j === 0 || j >= sizeY - 2)
                        continue;
                    var sphereShape = new CANNON.Sphere(0.1);
                    var sphereBody = new CANNON.Body({ mass: mass });
                    sphereBody.addShape(sphereShape);
                    sphereBody.position.set(0.25 + i, 0.25 + j, 3);
                    sphereBody.position.vadd(hfBody.position, sphereBody.position);
                    console.log(sphereBody.position);
                    var $disLock = new canonkey.CanonPrefabSprite(sphereBody);
                    $disLock.addToWorld();
                }
            }
        };
        return Heightfield_html;
    }(canonkey.DemoBase_html));
    canonkey.Heightfield_html = Heightfield_html;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=Heightfield_html.js.map