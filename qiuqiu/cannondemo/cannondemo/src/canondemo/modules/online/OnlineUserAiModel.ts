module online {


    import SceneManager = Pan3d.SceneManager
    import Vector3D = Pan3d.Vector3D
    import Display3D = Pan3d.Display3D
    import Display3DSprite = Pan3d.Display3DSprite
    import GameDataModel = game.GameDataModel
    import DiamondsDisplay3DSprite =cannondis.DiamondsDisplay3DSprite
    export class OnlineUserAiModel  {
        private static _instance: OnlineUserAiModel;
        public static getInstance(): OnlineUserAiModel {
            if (!OnlineUserAiModel._instance) {
                OnlineUserAiModel._instance = new OnlineUserAiModel();
            }
            return OnlineUserAiModel._instance;
        }
        private _scene: SceneManager;
        private _userItem: Array<OnlineCanonPrefabSprite>;
        public addUsers(): void {
            this._scene = GameDataModel.scene;
        
            for (var i: number = 0; i < OnlineManager.getInstance().onleuserlist.length; i++) {
                var $onlineUserVo: OnlineUserVo = OnlineManager.getInstance().onleuserlist[i];
                if ($onlineUserVo.openid != GameData.getStorageSync("openid")) {
                    var dis: OnlineCanonPrefabSprite = OnlineCanonPrefabSprite.addMoveOhterUser(12, this._scene)
                    dis.onlineUserVo = $onlineUserVo
                 
                    var $v3d: Vector3D = this.getBasePos();
                    dis.x = $v3d.x;
                    dis.z = $v3d.z;
                    dis.y = 10;
                    dis.resetParticlePos()
                    dis.bodyfouce = new Vector3D(0, -1000, 0);
                    this._userItem.push(dis)
                }
            }
            for (var j: number = 0; j < 10; j++) {
                 this.addTempDiamonds()
            }
       
        }
        private getBasePos(): Vector3D {
            var $arr: Array<Vector3D> = new Array;
            $arr.push(new Vector3D (70, 12, -23))
            $arr.push(new Vector3D (168, 12, 5))
            $arr.push(new Vector3D (185, 12, 104))
            $arr.push(new Vector3D (119, 12, 177))
            $arr.push(new Vector3D (35, 12, 143))
            $arr.push(new Vector3D (-55, 12, 102))
            $arr.push(new Vector3D (-161, 12, 82))
            $arr.push(new Vector3D (-161, 12, 117))
            $arr.push(new Vector3D (-25, 12, 104))
            $arr.push(new Vector3D (25, 12, 49))
            $arr.push(new Vector3D (70, 12, -18))
            $arr.push(new Vector3D (132, 12, -74))
            $arr.push(new Vector3D (147, 12, -64))
            $arr.push(new Vector3D (160, 12, -106))
            $arr.push(new Vector3D (138, 12, -179))
            $arr.push(new Vector3D (83, 12, -182))
            $arr.push(new Vector3D (4, 12, -129))

            return $arr[random($arr.length)]

        }
        public clearDiamodsAll(): void {
            while (this.modelDiamods && this.modelDiamods.length) {
                var $dis: OnlineDiamondsDisplay3DSprite = this.modelDiamods.pop()
                game.GameDataModel.scene.removeDisplay($dis);
                $dis.destory();
            }
            this.modelDiamods = new Array;
        }

        public clearOnlineUser(): void {
            while (this._userItem && this._userItem.length) {
                var $dis: OnlineCanonPrefabSprite = this._userItem.pop()
                $dis.destory()
            }
            this._userItem = new Array;
        }
   

        private modelDiamods: Array<OnlineDiamondsDisplay3DSprite>
        private addTempDiamonds(): OnlineDiamondsDisplay3DSprite {
            var $dis: OnlineDiamondsDisplay3DSprite = new OnlineDiamondsDisplay3DSprite();
            $dis.name = "dde";
            var $v3d: Vector3D = this.getBasePos();
            $dis.x = $v3d.x;
            $dis.y = 5;
            $dis.z = $v3d.z;
            $dis.setModelById("zhuanshi");
            $dis._scene = game.GameDataModel.scene;
            game.GameDataModel.scene.addDisplay($dis);
            this.modelDiamods.push($dis)
            return $dis
        }
        public upFrame(): void {
            if (canonkey.Physics.ready) {

                if (this.testHitDiamd(GameDataModel.centenBall)) {
           
                    game.GameSoundManager.getInstance().playSoundByName(Pan3d.Scene_data.fileRoot + "sound/" + "getdiamond" + ".mp3")
                  
                }
                if (OnlineManager.getInstance().isAotuPaly) {
                    this.playSelfAiBySprite(<OnlineCanonPrefabSprite>GameDataModel.centenBall);
                }
                for (var i: number = 0; i < this._userItem.length; i++) {
                    this.testHitDiamd(this._userItem[i])
                    this.playAiBySprite(this._userItem[i]);
                }

                
            }
        }
        private playSelfAiBySprite($dis: OnlineCanonPrefabSprite): void {

            if ($dis.nextDiamonds && $dis.nextDiamonds.sceneVisible) {
                var $v3dA: Vector3D = new Vector3D($dis.x, 0, $dis.z);
                var $v3dB: Vector3D = new Vector3D($dis.nextDiamonds.x, 0, $dis.nextDiamonds.z);
                var $dic: number = Vector3D.distance($v3dB, $v3dA)
                var $nmrv3d: Vector3D = $v3dB.subtract($v3dA);

                $nmrv3d.normalize();
                $nmrv3d.scaleBy($dic);
                $dis.bodyfouce = $nmrv3d;

            } else {
                $dis.nextDiamonds = this.findNextPos(new Vector3D($dis.x, $dis.y, $dis.z));
            }

        }
        private testHitDiamd($dis: Display3DSprite): boolean {
            var isHit: boolean
            for (var i: number = 0; i < this.modelDiamods.length; i++) {

                if (this.modelDiamods[i].sceneVisible) {
                    var $distens: number = Display3D.distance($dis, this.modelDiamods[i]);
                    if ($distens < 15) {
                        this.removeDiamods(this.modelDiamods[i])
                        this.addTempDiamonds();
                        (<OnlineCanonPrefabSprite>$dis).playHitDiamonds()
                        isHit = true

                        return isHit
                    }
                }
             

            }
            return isHit
        }
        private removeDiamods($dis: OnlineDiamondsDisplay3DSprite): void {
            $dis.sceneVisible = false;
            $dis.showFinishEfict();
            var index: number = this.modelDiamods.indexOf($dis);
            if (index != -1) {
                this.modelDiamods.splice(index, 1);
            }
            game.GameDataModel.scene.removeDisplay($dis);

            $dis.destory();
        }
        private playAiBySprite($dis: OnlineCanonPrefabSprite): void {

            if ($dis.nextDiamonds && $dis.nextDiamonds.sceneVisible) {
                var $v3dA: Vector3D = new Vector3D($dis.x, 0, $dis.z);
                var $v3dB: Vector3D = new Vector3D($dis.nextDiamonds.x, 0, $dis.nextDiamonds.z);
                var $dic: number = Vector3D.distance($v3dB, $v3dA)
                var $nmrv3d: Vector3D = $v3dB.subtract($v3dA);

                $nmrv3d.normalize();
                $nmrv3d.scaleBy($dic);
                $dis.bodyfouce = $nmrv3d;

            } else {
                $dis.nextDiamonds = this.findNextPos(new Vector3D($dis.x, $dis.y, $dis.z));
            }

        }
        private findNextPos($v3d: Vector3D): OnlineDiamondsDisplay3DSprite {
            var $num: number;
            var $select: OnlineDiamondsDisplay3DSprite
            for (var i: number = 0; i < this.modelDiamods.length; i++) {
                if (this.modelDiamods[i].sceneVisible) {
                    var $v3dB: Vector3D = new Vector3D(this.modelDiamods[i].x, this.modelDiamods[i].y, this.modelDiamods[i].z);
                    var $distens: number = Vector3D.distance($v3dB, $v3d)
                    if (isNaN($num) || $num > $distens) {
                        $select = this.modelDiamods[i]
                    }
                }
             
            }
            return this.modelDiamods[random(this.modelDiamods.length)];
        }
    }
}