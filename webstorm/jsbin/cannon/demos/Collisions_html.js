"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
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
    var Collisions_html = /** @class */ (function (_super) {
        __extends(Collisions_html, _super);
        function Collisions_html() {
            return _super.call(this) || this;
        }
        Collisions_html.prototype.initData = function () {
            //  this.Sphere_sphere();
            //    this.Sphere_box()
            this.Sphere_boxcorner();
        };
        Collisions_html.prototype.Sphere_boxcorner = function () {
            var world = canonkey.Physics.world;
            world.gravity.set(0, 0, -0);
            var boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
            var sphereShape = new CANNON.Sphere(1);
            // Box
            var b1 = new CANNON.Body({ mass: 5 });
            b1.addShape(boxShape);
            b1.position.set(5, 0, 2);
            b1.velocity.set(-5, 0, 0);
            b1.linearDamping = 0;
            var q1 = new CANNON.Quaternion();
            q1.setFromAxisAngle(new CANNON.Vec3(0, 0, 1), Math.PI * 0.25);
            var q2 = new CANNON.Quaternion();
            q2.setFromAxisAngle(new CANNON.Vec3(0, 1, 0), Math.PI * 0.25);
            var q = q1.mult(q2);
            b1.quaternion.set(q.x, q.y, q.z, q.w);
            var $disLock = new canonkey.CanonPrefabSprite(b1);
            $disLock.addToWorld();
            // Sphere
            var b2 = new CANNON.Body({ mass: 5 });
            b2.addShape(sphereShape);
            b2.position.set(-5, 0, 2);
            b2.velocity.set(5, 0, 0);
            b2.linearDamping = 0;
            var $disLock = new canonkey.CanonPrefabSprite(b2);
            $disLock.addToWorld();
        };
        Collisions_html.prototype.Sphere_box = function () {
            var world = canonkey.Physics.world;
            world.gravity.set(0, 0, -0);
            var boxShape = new CANNON.Box(new CANNON.Vec3(1, 1, 1));
            var sphereShape = new CANNON.Sphere(1);
            // Box
            var b1 = new CANNON.Body({ mass: 5 });
            b1.addShape(boxShape);
            b1.position.set(5, 0, 2);
            b1.velocity.set(-5, 0, 0);
            b1.linearDamping = 0;
            var $disLock = new canonkey.CanonPrefabSprite(b1);
            $disLock.addToWorld();
            // Sphere
            var b2 = new CANNON.Body({ mass: 5 });
            b2.addShape(sphereShape);
            b2.position.set(-5, 0, 2);
            b2.velocity.set(5, 0, 0);
            b2.linearDamping = 0;
            var $disLock = new canonkey.CanonPrefabSprite(b2);
            $disLock.addToWorld();
        };
        Collisions_html.prototype.Sphere_sphere = function () {
            var world = canonkey.Physics.world;
            world.gravity.set(0, 0, -0);
            var sphereShape = new CANNON.Sphere(1);
            var b1 = new CANNON.Body({ mass: 5 });
            b1.addShape(sphereShape);
            b1.position.set(5, 0, 1);
            b1.velocity.set(-5, 0, 0);
            b1.linearDamping = 0;
            var $disLock = new canonkey.CanonPrefabSprite(b1);
            $disLock.addToWorld();
            // Sphere 2
            var b2 = new CANNON.Body({ mass: 5 });
            b2.addShape(sphereShape);
            b2.linearDamping = 0;
            b2.position.set(-5, 0, 1);
            b2.velocity.set(5, 0, 0);
            var $disLock = new canonkey.CanonPrefabSprite(b2);
            $disLock.addToWorld();
        };
        return Collisions_html;
    }(canonkey.DemoBase_html));
    canonkey.Collisions_html = Collisions_html;
})(canonkey || (canonkey = {}));
