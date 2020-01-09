var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var canonkey;
(function (canonkey) {
    var Display3D = Pan3d.Display3D;
    var Matrix3D = Pan3d.Matrix3D;
    var Object3D = Pan3d.Object3D;
    var Vector3D = Pan3d.Vector3D;
    var Quaternion = Pan3d.Quaternion;
    var WheelInfoMesh = /** @class */ (function () {
        function WheelInfoMesh() {
        }
        return WheelInfoMesh;
    }());
    canonkey.WheelInfoMesh = WheelInfoMesh;
    var MachineBoneSocket = /** @class */ (function (_super) {
        __extends(MachineBoneSocket, _super);
        function MachineBoneSocket($x, $y, $z) {
            if ($x === void 0) { $x = 0; }
            if ($y === void 0) { $y = 0; }
            if ($z === void 0) { $z = 0; }
            var _this = _super.call(this) || this;
            _this.matrix3D = new Matrix3D;
            return _this;
        }
        return MachineBoneSocket;
    }(Display3D));
    canonkey.MachineBoneSocket = MachineBoneSocket;
    var BaseMachine = /** @class */ (function (_super) {
        __extends(BaseMachine, _super);
        function BaseMachine($x, $y, $z) {
            if ($x === void 0) { $x = 0; }
            if ($y === void 0) { $y = 0; }
            if ($z === void 0) { $z = 0; }
            var _this = _super.call(this, $x, $y, $z) || this;
            _this.displayList = new Array();
            _this.boneSocketDic = new Array();
            _this.initData();
            return _this;
        }
        BaseMachine.prototype.upData = function () {
            this.upDataBoneSocket();
        };
        BaseMachine.prototype.setMachineMatrix3d = function (value) {
        };
        BaseMachine.prototype.getSocket = function (socketName) {
            for (var i = 0; i < this.boneSocketDic.length; i++) {
                if (this.boneSocketDic[i].name == socketName) {
                    return this.boneSocketDic[i];
                }
            }
            return null;
        };
        BaseMachine.prototype.getBody = function () {
            return null;
        };
        BaseMachine.prototype.upDataBoneSocket = function () {
            this.posMatrix.identity();
            this.posMatrix.appendScale(this._scaleX, this._scaleY, this._scaleZ);
            this.posMatrix.appendRotation(this._rotationX, Vector3D.X_AXIS);
            this.posMatrix.appendRotation(this._rotationY, Vector3D.Y_AXIS);
            this.posMatrix.appendRotation(this._rotationZ, Vector3D.Z_AXIS);
            this.posMatrix.appendTranslation(this._x, this._y, this._z);
            for (var i = 0; i < this.boneSocketDic.length; i++) {
                var $k = this.boneSocketDic[i];
                $k.updateMatrix();
                $k.matrix3D = this.posMatrix.clone();
                $k.matrix3D.prepend($k.posMatrix);
            }
        };
        BaseMachine.prototype.initData = function () {
        };
        BaseMachine.prototype.resetPostion = function () {
            for (var i = 0; i < this.displayList.length; i++) {
                var $mc = this.displayList[i];
                var $m = $mc.posMatrix.clone();
                $m.append(this.posMatrix.clone());
                var $q = new Quaternion();
                $q.fromMatrix($m);
                var $angle = $q.toEulerAngles();
                $mc.rotationX = $angle.x * 180 / Math.PI;
                $mc.rotationY = -$angle.y * 180 / Math.PI;
                $mc.rotationZ = $angle.z * 180 / Math.PI;
                $mc.x = $m.position.x;
                $mc.y = $m.position.y;
                $mc.z = $m.position.z;
            }
        };
        BaseMachine.prototype.addSpriteToStage = function ($body) {
            var $mc = new canonkey.CanonPrefabSprite($body);
            $mc.addToWorld();
            $mc.update();
            this.displayList.push($mc);
        };
        return BaseMachine;
    }(Object3D));
    canonkey.BaseMachine = BaseMachine;
    var RigidVehicleSprite = /** @class */ (function (_super) {
        __extends(RigidVehicleSprite, _super);
        function RigidVehicleSprite($x, $y, $z) {
            if ($x === void 0) { $x = 0; }
            if ($y === void 0) { $y = 0; }
            if ($z === void 0) { $z = 0; }
            return _super.call(this, $x, $y, $z) || this;
        }
        return RigidVehicleSprite;
    }(BaseMachine));
})(canonkey || (canonkey = {}));
//# sourceMappingURL=BaseMachine.js.map