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
    var Vector3D = Pan3d.Vector3D;
    var Matrix3D = Pan3d.Matrix3D;
    var CarOptions = /** @class */ (function () {
        function CarOptions() {
            this.radius = 0.5,
                this.directionLocal = new CANNON.Vec3(0, 0, -1),
                this.suspensionStiffness = 100, //悬挂刚度
                this.suspensionRestLength = 0.5, //悬挂休息长度
                this.frictionSlip = 10, //摩擦滑
                this.dampingRelaxation = 10, //阻尼放松
                this.dampingCompression = 2, //阻尼压缩
                this.maxSuspensionForce = 10000, //最大悬架力
                this.rollInfluence = 0.1, //转弯倾斜
                this.axleLocal = new CANNON.Vec3(0, 1, 0),
                this.chassisConnectionPointLocal = new CANNON.Vec3(1, 1, 0),
                this.maxSuspensionTravel = 0.3,
                this.customSlidingRotationalSpeed = -30,
                this.useCustomSlidingRotationalSpeed = false;
        }
        return CarOptions;
    }());
    canonkey.CarOptions = CarOptions;
    var CarBodySprite = /** @class */ (function (_super) {
        __extends(CarBodySprite, _super);
        function CarBodySprite($x, $y, $z) {
            if ($x === void 0) { $x = 0; }
            if ($y === void 0) { $y = 0; }
            if ($z === void 0) { $z = 0; }
            return _super.call(this, $x, $y, $z) || this;
        }
        CarBodySprite.prototype.initData = function () {
            this.makeCarBody();
            this.updateMatrix();
        };
        CarBodySprite.prototype.makeCarBody = function () {
            var world = canonkey.Physics.world;
            var mass = 120;
            //world.defaultContactMaterial.friction = 0;
            var chassisShape = new CANNON.Box(new CANNON.Vec3(2, 1, 0.5));
            var chassisBody = new CANNON.Body({ mass: mass });
            chassisBody.addShape(chassisShape);
            var $disLock = new canonkey.CanonPrefabSprite(chassisBody);
            $disLock.addToWorld();
            // Create the vehicle
            var vehicle = new CANNON.RaycastVehicle({
                chassisBody: chassisBody,
            });
            var options = new CarOptions();
            options.chassisConnectionPointLocal.set(1, 1, 0);
            vehicle.addWheel(options);
            options.chassisConnectionPointLocal.set(1, -1, 0);
            vehicle.addWheel(options);
            options.chassisConnectionPointLocal.set(-1, 1, 0);
            vehicle.addWheel(options);
            options.chassisConnectionPointLocal.set(-1, -1, 0);
            vehicle.addWheel(options);
            vehicle.addToWorld(world);
            var wheelBodies = new Array;
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
            this.carvehicle = vehicle;
        };
        CarBodySprite.prototype.getBodyRotationY = function () {
            var $ma = new Matrix3D;
            canonkey.Physics.MathBody2WMatrix3D(this.carvehicle.chassisBody, $ma);
            var $shapeQua = canonkey.Physics.Quaternion2W(this.carvehicle.chassisBody.shapeOrientations[0]);
            var $m = $shapeQua.toMatrix3D();
            $ma.prepend($m);
            $shapeQua.fromMatrix($ma);
            $shapeQua.toMatrix3D($ma);
            var $p = $ma.transformVector(new Vector3D(1, 0, 0));
            return Math.atan2($p.z, $p.x);
        };
        CarBodySprite.prototype.updateMatrix = function () {
            if (this.carvehicle) {
                this.carvehicle.chassisBody.position = canonkey.Physics.Vec3dW2C(new Vector3D(this._x, this._y, this._z));
            }
        };
        CarBodySprite.prototype.upData = function () {
            var $ma = new Matrix3D;
            canonkey.Physics.MathBody2WMatrix3D(this.carvehicle.chassisBody, $ma);
            var $shapeQua = canonkey.Physics.Quaternion2W(this.carvehicle.chassisBody.shapeOrientations[0]);
            var $pos = $ma.position;
            this._x = $pos.x;
            this._y = $pos.y;
            this._z = $pos.z;
            var $angle = $shapeQua.toEulerAngles();
            this._rotationX = $angle.x;
            this._rotationY = $angle.y;
            this._rotationZ = $angle.z;
            _super.prototype.upData.call(this);
        };
        return CarBodySprite;
    }(canonkey.BaseMachine));
    canonkey.CarBodySprite = CarBodySprite;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=CarBodySprite.js.map