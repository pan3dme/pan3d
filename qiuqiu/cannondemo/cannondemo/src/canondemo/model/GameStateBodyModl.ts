module game {

    import Vector3D = Pan3d.Vector3D;
    import CollisionItemVo = Pan3d.CollisionItemVo;
    import CollisionVo = Pan3d.CollisionVo;
    import Display3D = Pan3d.Display3D
    import Matrix3D = Pan3d.Matrix3D
    import Quaternion = Pan3d.Quaternion
    import Dictionary = Pan3d.Dictionary


    import CanonPrefabSprite = canonkey.CanonPrefabSprite;
    import Physics = canonkey.Physics;

    import CanonFrame3DSprite = frame3d.CanonFrame3DSprite;


    export class GameStateBody extends CANNON.Body  {
        public iswall: boolean
    }

    export class GameStateBodyModl {
        private static _instance: GameStateBodyModl;
        public static getInstance(): GameStateBodyModl {
            if (!GameStateBodyModl._instance) {
                GameStateBodyModl._instance = new GameStateBodyModl();
            }
            return GameStateBodyModl._instance;
        }
        constructor() {
            this.stateBodyItems = new Array
        }
        public clear(): void {
            while (this.stateBodyItems.length) {
                Physics.world.removeBody(this.stateBodyItems.pop())
            }
        }
        private getFloadNum(value: number): number {
            return Math.floor(value * 1000) / 1000;
        }
        public makeBodyByItem($arr: Array<any>): CollisionItemVo {
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

                $collisionVo.scaleX = this.getFloadNum($collisionVo.scaleX)
                $collisionVo.scaleY = this.getFloadNum($collisionVo.scaleY)
                $collisionVo.scaleZ = this.getFloadNum($collisionVo.scaleZ)
                $collisionVo.rotationX = this.getFloadNum($collisionVo.rotationX)
                $collisionVo.rotationY = this.getFloadNum($collisionVo.rotationY)
                $collisionVo.rotationZ = this.getFloadNum($collisionVo.rotationZ)


                

                $collisionVo.type = $xmlcollisionVo.type;
                $collisionVo.colorInt = $xmlcollisionVo.colorInt;
       
                $collisionVo.data = $xmlcollisionVo.data;
                $collisionItemVo.collisionItem.push($collisionVo);

               
            }
            return $collisionItemVo;

        }
        public stateBodyItems: Array<CANNON.Body>
        public addToStateBodyItem($buildObj: any, $key: Array<any>): void {
            //将静态的碰撞体分组织，为了
     

            var $tempDisp: Display3D = new Display3D();
            $tempDisp.y = $buildObj.y;
            $tempDisp.x = $buildObj.x;
            $tempDisp.z = $buildObj.z;
            $tempDisp.scaleX = $buildObj.scaleX;
            $tempDisp.scaleY = $buildObj.scaleY;
            $tempDisp.scaleZ = $buildObj.scaleZ;
            $tempDisp.rotationX = $buildObj.rotationX;
            $tempDisp.rotationY = $buildObj.rotationY;
            $tempDisp.rotationZ = $buildObj.rotationZ;


            var $collisionItemVo: CollisionItemVo = this.makeBodyByItem($key);


            this.makeMultipleBody($tempDisp,$collisionItemVo)


        //    this.addTempBody($tempDisp, $collisionItemVo)
             
        }
        private makeMultipleBody($tempDisp: Display3D,$collisionItemVo: CollisionItemVo): void {
            var $dis: any = {}
            for (var i: number = 0; i < $collisionItemVo.collisionItem.length; i++) {
                var $colorInt: number = $collisionItemVo.collisionItem[i].colorInt;
               
                
                var $vo: CollisionItemVo
                if (!$dis[$colorInt]) {
                    $vo = new CollisionItemVo;
                    $vo.collisionItem = new Array()
                    $vo.friction = $collisionItemVo.friction
                    $vo.restitution = $collisionItemVo.restitution
                    $dis[$colorInt] = $vo
                }
                $vo = $dis[$colorInt]
                $vo.collisionItem.push($collisionItemVo.collisionItem[i]);
            }
            for (var $key in $dis) {
                var $vo: CollisionItemVo = $dis[$key]
                var $colorVect: Vector3D = Pan3d.MathUtil.hexToArgb(Number($key));
                var $isWall: boolean = $colorVect.x > $colorVect.y && $colorVect.x > $colorVect.z;
 
                this.addTempBody($tempDisp, $vo, $isWall)
            }
      
        }

        private addTempBody($tempDisp: Display3D, $collisionItemVo: CollisionItemVo, $isWall: boolean): void {
            var $body: GameStateBody = new GameStateBody({ mass: 1 });
            $body.iswall = $isWall;
            $body.type = CANNON.Body.KINEMATIC;
            Physics.makeBuildBodyMesh($tempDisp, $collisionItemVo, $body);

            Physics.world.addBody($body);
            $body.collisionFilterGroup = GameDataModel.GROUP1;
            $body.collisionFilterMask = GameDataModel.GROUP1 | GameDataModel.GROUP2;


            this.stateBodyItems.push($body)

            $body.position = Physics.Vec3dW2C(new Vector3D($tempDisp.x, $tempDisp.y, $tempDisp.z));
            var $m: Matrix3D = new Matrix3D();
            $m.appendRotation(-$tempDisp.rotationZ, Vector3D.Z_AXIS);
            $m.appendRotation(-$tempDisp.rotationY, Vector3D.Y_AXIS);
            $m.appendRotation(-$tempDisp.rotationX, Vector3D.X_AXIS);
            var $q: Quaternion = new Quaternion();
            $q.fromMatrix($m);
            $body.quaternion = Physics.QuaternionW2C($q);

        }
    }
}