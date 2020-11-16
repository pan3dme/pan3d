module game {

    import Vector3D = Pan3d.Vector3D;
    import CollisionItemVo = Pan3d.CollisionItemVo;
    import CollisionVo = Pan3d.CollisionVo;


    import CanonPrefabSprite = canonkey.CanonPrefabSprite;
    import Physics = canonkey.Physics;

    import CanonFrame3DSprite = frame3d.CanonFrame3DSprite;
    

    export class GameSceneManager {
        private _scene: layapan.LayaOverride2dSceneManager;
        constructor($scene: layapan.LayaOverride2dSceneManager) {
            this._scene = $scene;
            this.initData()
        }
        private initData(): void {
            Physics.world = new CANNON.World();
            Physics.world.gravity = Physics.Vec3dW2C(new Vector3D(0, -Physics.gravity980, 0))

            Physics.world.defaultContactMaterial.restitution = 0.01;
            Physics.world.defaultContactMaterial.friction = 0.01;
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

        public addMoveSphere($scale: number = 10): CanonPrefabSprite {
            var $sphere: CANNON.Shape = new CANNON.Sphere($scale / Physics.baseScale10)
            var $body: CANNON.Body = new CANNON.Body({ mass: 1 });
            $body.addShape($sphere);
         //         $body.linearDamping = $body.angularDamping = 0.1; //阻尼系数
            var $dis: CanonPrefabSprite = new CanonPrefabSprite($body)
            $dis._scene = this._scene
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
            $dis._scene = this._scene
            $dis.addToWorld();
            return $dis
        }

        public addJIguangse(value: any): CanonFrame3DSprite {
            var canonFrame3DSprite: CanonFrame3DSprite = new CanonFrame3DSprite();
            canonFrame3DSprite._scene = this._scene;
            canonFrame3DSprite.x = value.x
            canonFrame3DSprite.y = value.y
            canonFrame3DSprite.z = value.z
            canonFrame3DSprite.rotationY = 0
            canonFrame3DSprite.setInfo(value)

            return canonFrame3DSprite
        }
        

        public addMoveBox($scaleVec: Vector3D): CanonPrefabSprite {

            var $box: CANNON.Shape = new CANNON.Box(Physics.Vec3dW2C($scaleVec));
            var $body: CANNON.Body = new CANNON.Body({ mass: 1 });
            $body.addShape($box);
             //  $body.linearDamping = $body.angularDamping = 0.1;//阻尼系数
            var $dis: CanonPrefabSprite = new CanonPrefabSprite($body)
            $dis._scene = this._scene
            $dis.addToWorld();
            return $dis
        }
        private getFloadNum(value: number): number {
            return Math.floor(value * 1000) / 1000;
        }
        public makeBodyByItem($arr: Array<any>): CollisionItemVo  {
            var $collisionItemVo: CollisionItemVo = new CollisionItemVo;
            $collisionItemVo.collisionItem = new Array();
            for (var i: number = 0; i < $arr.length; i++) {
                var $collisionVo: CollisionVo = new CollisionVo();
                var $xmlcollisionVo: any = $arr[i].collisionVo
                $collisionVo.scaleX = $xmlcollisionVo.scale_x
                $collisionVo.scaleY = $xmlcollisionVo.scale_y;
                $collisionVo.scaleZ = $xmlcollisionVo.scale_z;

        
        

                $collisionVo.x = $xmlcollisionVo.x;
                $collisionVo.y = $xmlcollisionVo.y;
                $collisionVo.z = $xmlcollisionVo.z;
                $collisionVo.rotationX = $xmlcollisionVo.rotationX;
                $collisionVo.rotationY = $xmlcollisionVo.rotationY;
                $collisionVo.rotationZ = $xmlcollisionVo.rotationZ;
                $collisionVo.radius = $xmlcollisionVo.radius/10;

                $collisionVo.scaleX = this.getFloadNum($collisionVo.scaleX)
                $collisionVo.scaleY = this.getFloadNum($collisionVo.scaleY)
                $collisionVo.scaleZ = this.getFloadNum($collisionVo.scaleZ)
                $collisionVo.rotationX = this.getFloadNum($collisionVo.rotationX)
                $collisionVo.rotationY = this.getFloadNum($collisionVo.rotationY)
                $collisionVo.rotationZ = this.getFloadNum($collisionVo.rotationZ)

 
                $collisionVo.type = $xmlcollisionVo.type;
                $collisionVo.data = $xmlcollisionVo.data;
                $collisionItemVo.collisionItem.push($collisionVo);
            }
            return $collisionItemVo;

        }
    }
}