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
    var MouseType = Pan3d.MouseType;
    var RaycastVehicle_html = /** @class */ (function (_super) {
        __extends(RaycastVehicle_html, _super);
        function RaycastVehicle_html() {
            return _super.call(this) || this;
        }
        RaycastVehicle_html.prototype.initData = function () {
            this.car();
            this.addEvent();
        };
        RaycastVehicle_html.prototype.addEvent = function () {
            var _this = this;
            document.addEventListener(MouseType.KeyDown, function ($evt) { _this.onKeyDown($evt); });
            document.addEventListener(MouseType.KeyUp, function ($evt) { _this.onKeyDown($evt); });
        };
        RaycastVehicle_html.prototype.onKeyDown = function ($evt) {
            if (this.carvehicle) {
                this.keyCodeTo($evt);
            }
        };
        RaycastVehicle_html.prototype.car = function () {
            var world = canonkey.Physics.world;
            var mass = 150;
            var vehicle;
            world.broadphase = new CANNON.SAPBroadphase(world);
            world.gravity.set(0, 0, -10);
            //world.defaultContactMaterial.friction = 0;
            var groundMaterial = new CANNON.Material("groundMaterial");
            var wheelMaterial = new CANNON.Material("wheelMaterial");
            var wheelGroundContactMaterial = new CANNON.ContactMaterial(wheelMaterial, groundMaterial, {
                friction: 0.3,
                restitution: 0,
                contactEquationStiffness: 1000
            });
            // We must add the contact materials to the world
            world.addContactMaterial(wheelGroundContactMaterial);
            var chassisShape;
            chassisShape = new CANNON.Box(new CANNON.Vec3(2, 1, 0.5));
            var chassisBody = new CANNON.Body({ mass: mass });
            chassisBody.addShape(chassisShape);
            chassisBody.position.set(0, 0, 10);
            chassisBody.angularVelocity.set(0, 0, 0.5);
            // demo.addVisual(chassisBody);
            var $disLock = new canonkey.CanonPrefabSprite(chassisBody);
            $disLock.addToWorld();
            var options = {
                radius: 0.5,
                directionLocal: new CANNON.Vec3(0, 0, -1),
                suspensionStiffness: 30,
                suspensionRestLength: 0.3,
                frictionSlip: 5,
                dampingRelaxation: 2.3,
                dampingCompression: 4.4,
                maxSuspensionForce: 100000,
                rollInfluence: 0.01,
                axleLocal: new CANNON.Vec3(0, 1, 0),
                chassisConnectionPointLocal: new CANNON.Vec3(1, 1, 0),
                maxSuspensionTravel: 0.3,
                customSlidingRotationalSpeed: -30,
                useCustomSlidingRotationalSpeed: true
            };
            // Create the vehicle
            vehicle = new CANNON.RaycastVehicle({
                chassisBody: chassisBody,
            });
            options.chassisConnectionPointLocal.set(1, 1, 0);
            vehicle.addWheel(options);
            options.chassisConnectionPointLocal.set(1, -1, 0);
            vehicle.addWheel(options);
            options.chassisConnectionPointLocal.set(-1, 1, 0);
            vehicle.addWheel(options);
            options.chassisConnectionPointLocal.set(-1, -1, 0);
            vehicle.addWheel(options);
            vehicle.addToWorld(world);
            var wheelBodies = [];
            for (var i = 0; i < vehicle.wheelInfos.length; i++) {
                var wheel = vehicle.wheelInfos[i];
                var cylinderShape = new CANNON.Cylinder(wheel.radius, wheel.radius, wheel.radius / 2, 20);
                var wheelBody = new CANNON.Body({
                    mass: 0
                });
                wheelBody.type = CANNON.Body.KINEMATIC;
                wheelBody.collisionFilterGroup = 0; // turn off collisions
                var q = new CANNON.Quaternion();
                q.setFromAxisAngle(new CANNON.Vec3(1, 0, 0), Math.PI / 2);
                wheelBody.addShape(cylinderShape, new CANNON.Vec3(), q);
                wheelBodies.push(wheelBody);
                var $disLock = new canonkey.CanonPrefabSprite(wheelBody);
                $disLock.addToWorld();
            }
            // Update wheels
            world.addEventListener('postStep', function () {
                for (var i = 0; i < vehicle.wheelInfos.length; i++) {
                    vehicle.updateWheelTransform(i);
                    var t = vehicle.wheelInfos[i].worldTransform;
                    var wheelBody = wheelBodies[i];
                    wheelBody.position.copy(t.position);
                    wheelBody.quaternion.copy(t.quaternion);
                }
            });
            var matrix = [];
            var sizeX = 64, sizeY = 64;
            for (var i = 0; i < sizeX; i++) {
                matrix.push([]);
                for (var j = 0; j < sizeY; j++) {
                    var height = Math.cos(i / sizeX * Math.PI * 5) * Math.cos(j / sizeY * Math.PI * 5) * 2 + 0;
                    if (i === 0 || i === sizeX - 1 || j === 0 || j === sizeY - 1) {
                        height = 3;
                    }
                    //height = 3
                    matrix[i].push(height);
                }
            }
            var hfShape = new CANNON.Heightfield(matrix, {
                elementSize: 100 / sizeX
            });
            var hfBody = new CANNON.Body({ mass: 0 });
            hfBody.addShape(hfShape);
            hfBody.position.set(-sizeX * hfShape.elementSize / 2, -sizeY * hfShape.elementSize / 2, -1);
            var $disLock = new canonkey.CanonPrefabSprite(hfBody);
            $disLock.addToWorld();
            this.carvehicle = vehicle;
        };
        RaycastVehicle_html.prototype.keyCodeTo = function (event) {
            var maxSteerVal = 0.5;
            var maxForce = 3 * 100;
            var brakeForce = 1000000;
            var vehicle = this.carvehicle;
            var up = (event.type == 'keyup');
            if (!up && event.type !== 'keydown') {
                return;
            }
            vehicle.setBrake(0, 0);
            vehicle.setBrake(0, 1);
            vehicle.setBrake(0, 2);
            vehicle.setBrake(0, 3);
            switch (event.keyCode) {
                case 38: // forward
                    vehicle.applyEngineForce(up ? 0 : -maxForce, 2);
                    vehicle.applyEngineForce(up ? 0 : -maxForce, 3);
                    break;
                case 40: // backward
                    vehicle.applyEngineForce(up ? 0 : maxForce, 2);
                    vehicle.applyEngineForce(up ? 0 : maxForce, 3);
                    break;
                case 66: // b
                    vehicle.setBrake(brakeForce, 0);
                    vehicle.setBrake(brakeForce, 1);
                    vehicle.setBrake(brakeForce, 2);
                    vehicle.setBrake(brakeForce, 3);
                    break;
                case 39: // right
                    vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 0);
                    vehicle.setSteeringValue(up ? 0 : -maxSteerVal, 1);
                    break;
                case 37: // left
                    vehicle.setSteeringValue(up ? 0 : maxSteerVal, 0);
                    vehicle.setSteeringValue(up ? 0 : maxSteerVal, 1);
                    break;
            }
        };
        return RaycastVehicle_html;
    }(canonkey.DemoBase_html));
    canonkey.RaycastVehicle_html = RaycastVehicle_html;
})(canonkey || (canonkey = {}));
