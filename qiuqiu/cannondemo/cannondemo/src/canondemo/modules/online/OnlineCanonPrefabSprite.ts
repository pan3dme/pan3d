module online {
    import Vector3D = Pan3d.Vector3D
    import SceneManager = Pan3d.SceneManager
    import MainCanonPrefabSprite = cannondis.MainCanonPrefabSprite;

    import Physics = canonkey.Physics;
    import GameDataModel = game.GameDataModel
    export class OnlineCanonPrefabSprite extends MainCanonPrefabSprite {

  
        public nextDiamonds: OnlineDiamondsDisplay3DSprite;
        public userPic: OnlineUserHeadPicSprite;
        private _onlineUserVo: OnlineUserVo;
        public constructor(value: CANNON.Body) {
            super(value);
            this.userPic = new OnlineUserHeadPicSprite();
        }
        public set onlineUserVo(value: OnlineUserVo) {
            this._onlineUserVo = value
            this.userPic.setPicUrl(this._onlineUserVo.avatar)
            if (isNaN(this._onlineUserVo.skin) || !Boolean(this._onlineUserVo.skin)) {
                this._onlineUserVo.skin=1
            }
            console.log(" this._onlineUserVo.skin",this._onlineUserVo.skin)
            this.changeSkinById(this._onlineUserVo.skin);
        }
        public get onlineUserVo() {
            return this._onlineUserVo
        }
        public playHitDiamonds(): void {
            this._onlineUserVo.num++
            this.userPic.drawHaveNum(this._onlineUserVo.num)

        }

       
        public update(): void {
      
            super.update();

            this.userPic.x = this.x
            this.userPic.y = this.y+30
            this.userPic.z = this.z
            this.userPic.update()
        }
        

        public static addMoveOhterUser($scale: number, $scene: SceneManager): OnlineCanonPrefabSprite {
            var $sphere: CANNON.Shape = new CANNON.Sphere($scale / Physics.baseScale10)
            var $body: CANNON.Body = new CANNON.Body({ mass: 1.00 });
            $body.collisionFilterGroup = GameDataModel.GROUP1;
            $body.collisionFilterMask = GameDataModel.GROUP1 | GameDataModel.GROUP2 | GameDataModel.GROUP3;
            $body.addShape($sphere);
            var $dis: OnlineCanonPrefabSprite = new OnlineCanonPrefabSprite($body)
            $dis._scene = $scene
            $dis.addToWorld();
         
            return $dis
        }


    }
     
}