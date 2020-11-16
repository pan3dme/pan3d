
module canonkey {
    import Vector3D = Pan3d.Vector3D;
    export class SceneConanManager {

        private static _instance: SceneConanManager;
        public static getInstance(): SceneConanManager {
            if (!this._instance) {
                this._instance = new SceneConanManager();
            }
            return this._instance;
        }
        constructor() {

        }
        public addMoveBox($scaleVec: Vector3D): CanonPrefabSprite {

            var $box: CANNON.Shape = new CANNON.Box(Physics.Vec3dW2C($scaleVec));
            var $body: CANNON.Body = new CANNON.Body({ mass: 1 });
            $body.addShape($box);
            //      $body.linearDamping = $body.angularDamping = 0.5;//阻尼系数
            var $dis: CanonPrefabSprite = new CanonPrefabSprite($body)
            $dis.addToWorld();
            return $dis
        }
        public addMoveSphere($scale: number = 10): CanonPrefabSprite {
            var $sphere: CANNON.Shape = new CANNON.Sphere($scale / Physics.baseScale10)
            var $body: CANNON.Body = new CANNON.Body({ mass: 1 });
            $body.addShape($sphere);
            //      $body.linearDamping = $body.angularDamping = 0.5; //阻尼系数
            var $dis: CanonPrefabSprite = new CanonPrefabSprite($body)
            $dis.addToWorld();
            return $dis
        }

        public addMoveCylinder($scaleVec: Vector3D): CanonPrefabSprite {

            var kkk: CANNON.Vec3 = Physics.Vec3dW2C($scaleVec)
            var $box: CANNON.Cylinder = new CANNON.Cylinder(kkk.x, kkk.y, kkk.z, 20)
            var $body: CANNON.Body = new CANNON.Body({ mass: 1 });
            $body.addShape($box);
            //      $body.linearDamping = $body.angularDamping = 0.5;//阻尼系数
            var $dis: CanonPrefabSprite = new CanonPrefabSprite($body)
            $dis.addToWorld();
            return $dis
        }


        public creatWorld(): void {

            Physics.world = new CANNON.World();
            Physics.world.gravity = Physics.Vec3dW2C(new Vector3D(0,- Physics.gravity980, 0))
            Physics.world.broadphase = new CANNON.NaiveBroadphase();


        }
        public makeGround($pos: Vector3D): void {

            var groundShape: CANNON.Plane = new CANNON.Plane();
            var groundBody: CANNON.Body = new CANNON.Body({ mass: 0 });
            groundBody.addShape(groundShape);
            groundBody.position = Physics.Vec3dW2C($pos)
            groundBody.gameType = 2
            Physics.world.addBody(groundBody);


        }
        public makeExpSceneCollisionItem($arr: Array<any>): void {
            if ($arr) {
                var $bodyItem: Array<CANNON.Body> = Physics.makeSceneCollision($arr)
                if (true) {
                    for (var i: number = 0; i < $bodyItem.length; i++) {
                        var $dis: CanonPrefabSprite = new CanonPrefabSprite($bodyItem[i]);
                        $dis.addToWorld();
                        Physics.world.addBody($bodyItem[i]);
                    }
                }
            }
        }



    }
}