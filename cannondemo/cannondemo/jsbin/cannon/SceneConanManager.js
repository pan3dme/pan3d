var canonkey;
(function (canonkey) {
    var Vector3D = Pan3d.Vector3D;
    var SceneConanManager = /** @class */ (function () {
        function SceneConanManager() {
        }
        SceneConanManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new SceneConanManager();
            }
            return this._instance;
        };
        SceneConanManager.prototype.addMoveBox = function ($scaleVec) {
            var $box = new CANNON.Box(canonkey.Physics.Vec3dW2C($scaleVec));
            var $body = new CANNON.Body({ mass: 1 });
            $body.addShape($box);
            //      $body.linearDamping = $body.angularDamping = 0.5;//阻尼系数
            var $dis = new canonkey.CanonPrefabSprite($body);
            $dis.addToWorld();
            return $dis;
        };
        SceneConanManager.prototype.addMoveSphere = function ($scale) {
            if ($scale === void 0) { $scale = 10; }
            var $sphere = new CANNON.Sphere($scale / canonkey.Physics.baseScale10);
            var $body = new CANNON.Body({ mass: 1 });
            $body.addShape($sphere);
            //      $body.linearDamping = $body.angularDamping = 0.5; //阻尼系数
            var $dis = new canonkey.CanonPrefabSprite($body);
            $dis.addToWorld();
            return $dis;
        };
        SceneConanManager.prototype.addMoveCylinder = function ($scaleVec) {
            var kkk = canonkey.Physics.Vec3dW2C($scaleVec);
            var $box = new CANNON.Cylinder(kkk.x, kkk.y, kkk.z, 20);
            var $body = new CANNON.Body({ mass: 1 });
            $body.addShape($box);
            //      $body.linearDamping = $body.angularDamping = 0.5;//阻尼系数
            var $dis = new canonkey.CanonPrefabSprite($body);
            $dis.addToWorld();
            return $dis;
        };
        SceneConanManager.prototype.creatWorld = function () {
            canonkey.Physics.world = new CANNON.World();
            canonkey.Physics.world.gravity = canonkey.Physics.Vec3dW2C(new Vector3D(0, -canonkey.Physics.gravity980, 0));
            canonkey.Physics.world.broadphase = new CANNON.NaiveBroadphase();
        };
        SceneConanManager.prototype.makeGround = function ($pos) {
            var groundShape = new CANNON.Plane();
            var groundBody = new CANNON.Body({ mass: 0 });
            groundBody.addShape(groundShape);
            groundBody.position = canonkey.Physics.Vec3dW2C($pos);
            groundBody.gameType = 2;
            canonkey.Physics.world.addBody(groundBody);
        };
        SceneConanManager.prototype.makeExpSceneCollisionItem = function ($arr) {
            if ($arr) {
                var $bodyItem = canonkey.Physics.makeSceneCollision($arr);
                if (true) {
                    for (var i = 0; i < $bodyItem.length; i++) {
                        var $dis = new canonkey.CanonPrefabSprite($bodyItem[i]);
                        $dis.addToWorld();
                        canonkey.Physics.world.addBody($bodyItem[i]);
                    }
                }
            }
        };
        return SceneConanManager;
    }());
    canonkey.SceneConanManager = SceneConanManager;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=SceneConanManager.js.map