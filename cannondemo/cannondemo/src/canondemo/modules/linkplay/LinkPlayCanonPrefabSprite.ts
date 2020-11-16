module linkplay {
    import Vector3D = Pan3d.Vector3D
    import SceneManager = Pan3d.SceneManager
    import TimeUtil = Pan3d.TimeUtil
    import MainCanonPrefabSprite = cannondis.MainCanonPrefabSprite;

    import Physics = canonkey.Physics;
    import GameDataModel = game.GameDataModel;

    export class LinkPlayCanonPrefabSprite extends MainCanonPrefabSprite {

        public constructor(value: CANNON.Body) {
            super(value);
            this.moveInfoVoItem = new Array
            this.bodyfouce = new Vector3D()

        }
        public roomUserVo: RoomUserVo
        public playHitDiamonds(): void {
   
        }
        public update(): void {

            this.getToMoveInfoVo();
  
            super.update();
        }
        private interpolationNum: number=-1000
        private getToMoveInfoVo(): void {

            if (this.moveInfoVoItem.length) {
                var tm = TimeUtil.getTimer() - GameDataModel.levelStartTm;
           
                tm += this.interpolationNum//设计一个延时
                if (this.moveInfoVoItem[0].tm <= tm) {
                    var vo: MoveInfoVo= this.moveInfoVoItem.shift()

                
                    if (!this.bodyfouce) {
                        this.bodyfouce = new Vector3D()
                    }
          

                    this.body.angularVelocity.x = vo.angularVelocity.x
                    this.body.angularVelocity.y = vo.angularVelocity.y
                    this.body.angularVelocity.z = vo.angularVelocity.z

                    this.bodyfouce.x = vo.bodyfouce.x
                    this.bodyfouce.y = vo.bodyfouce.y
                    this.bodyfouce.z = vo.bodyfouce.z

                    this.body.position.x = vo.position.x
                    this.body.position.y = vo.position.y
                    this.body.position.z = vo.position.z

                    this.body.velocity.x = vo.velocity.x
                    this.body.velocity.y = vo.velocity.y
                    this.body.velocity.z = vo.velocity.z

                
                }
            }
        
        }
        public moveInfoVoItem: Array<MoveInfoVo>
        public pushVO(vo: MoveInfoVo): void {
            this.moveInfoVoItem.push(vo)
            var tm = TimeUtil.getTimer() - GameDataModel.levelStartTm;
            this.interpolationNum = this.interpolationNum + (vo.tm - tm - this.interpolationNum) / 5
        }

  

        public static addMoveOhterUser($scale: number, $scene: SceneManager): LinkPlayCanonPrefabSprite {
            var $sphere: CANNON.Shape = new CANNON.Sphere($scale / Physics.baseScale10)
            var $body: CANNON.Body = new CANNON.Body({ mass: 1.00 });
            $body.collisionFilterGroup = GameDataModel.GROUP1;
            $body.collisionFilterMask = GameDataModel.GROUP1 | GameDataModel.GROUP2 | GameDataModel.GROUP3;
            $body.addShape($sphere);
            var $dis: LinkPlayCanonPrefabSprite = new LinkPlayCanonPrefabSprite($body)
            $dis._scene = $scene
            $dis.addToWorld();
         
            return $dis
        }


    }
     
}