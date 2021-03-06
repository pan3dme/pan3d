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
    var Container_html = /** @class */ (function (_super) {
        __extends(Container_html, _super);
        function Container_html() {
            return _super.call(this) || this;
        }
        Container_html.prototype.initData = function () {
            var world = canonkey.Physics.world;
            this.createContainer(4, 4, 4);
        };
        Container_html.prototype.createContainer = function (nx, ny, nz) {
            // Create world
            var world = canonkey.Physics.world;
            world.broadphase = new CANNON.SAPBroadphase(world); // Buggy?
            // Tweak contact properties.
            world.defaultContactMaterial.contactEquationStiffness = 1e11; // Contact stiffness - use to make softer/harder contacts
            world.defaultContactMaterial.contactEquationRelaxation = 2; // Stabilization time in number of timesteps
            // Max solver iterations: Use more for better force propagation, but keep in mind that it's not very computationally cheap!
            //   world.solver.iterations = 10;
            world.gravity.set(0, 0, -30);
            // Since we have many bodies and they don't move very much, we can use the less accurate quaternion normalization
            world.quatNormalizeFast = true;
            world.quatNormalizeSkip = 8; // ...and we do not have to normalize every step.
            // Materials
            var stone = new CANNON.Material('stone');
            var stone_stone = new CANNON.ContactMaterial(stone, stone, {
                friction: 0.3,
                restitution: 0.2
            });
            world.addContactMaterial(stone_stone);
            // ground plane
            // plane -x
            var planeShapeXmin = new CANNON.Plane();
            var planeXmin = new CANNON.Body({ mass: 0, material: stone });
            planeXmin.addShape(planeShapeXmin);
            planeXmin.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI / 2);
            planeXmin.position.set(-5, 0, 0);
            world.addBody(planeXmin);
            // Plane +x
            var planeShapeXmax = new CANNON.Plane();
            var planeXmax = new CANNON.Body({ mass: 0, material: stone });
            planeXmax.addShape(planeShapeXmax);
            planeXmax.quaternion.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), -Math.PI / 2);
            planeXmax.position.set(5, 0, 0);
            world.addBody(planeXmax);
            // Plane -y
            var planeShapeYmin = new CANNON.Plane();
            var planeYmin = new CANNON.Body({ mass: 0, material: stone });
            planeYmin.addShape(planeShapeYmin);
            planeYmin.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), -Math.PI / 2);
            planeYmin.position.set(0, -5, 0);
            world.addBody(planeYmin);
            // Plane +y
            var planeShapeYmax = new CANNON.Plane();
            var planeYmax = new CANNON.Body({ mass: 0, material: stone });
            planeYmax.addShape(planeShapeYmax);
            planeYmax.quaternion.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
            planeYmax.position.set(0, 5, 0);
            world.addBody(planeYmax);
            // Create spheres
            var rand = 0.1;
            var h = 0;
            var sphereShape = new CANNON.Sphere(1); // Sharing shape saves memory
            world.allowSleep = true;
            for (var i = 0; i < nx; i++) {
                for (var j = 0; j < ny; j++) {
                    for (var k = 0; k < nz; k++) {
                        var sphereBody = new CANNON.Body({ mass: 5, material: stone });
                        sphereBody.addShape(sphereShape);
                        sphereBody.position.set(i * 2 - nx * 0.5 + (Math.random() - 0.5) * rand, j * 2 - ny * 0.5 + (Math.random() - 0.5) * rand, 1 + k * 2.1 + h + (i + j) * 0.0);
                        sphereBody.allowSleep = true;
                        sphereBody.sleepSpeedLimit = 1;
                        sphereBody.sleepTimeLimit = 5;
                        var $disLock = new canonkey.CanonPrefabSprite(sphereBody);
                        $disLock.addToWorld();
                    }
                }
            }
        };
        return Container_html;
    }(canonkey.DemoBase_html));
    canonkey.Container_html = Container_html;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=container_html.js.map