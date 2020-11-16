module linkplay {


    import Display3D = Pan3d.Display3D;
    import Vector3D = Pan3d.Vector3D;
    import ResManager = Pan3d.ResManager;
    import CollisionItemVo = Pan3d.CollisionItemVo;
    import BaseRes = Pan3d.BaseRes;
    import TimeUtil = Pan3d.TimeUtil;

    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager

    import CanonPrefabSprite = canonkey.CanonPrefabSprite
    import CanonFrame3DSprite = frame3d.CanonFrame3DSprite;

    import CanonSceneSprite = cannondis.CanonSceneSprite;
    import DirectShadowColorSprite = cannondis.DirectShadowColorSprite;
    import DiamondsDisplay3DSprite = cannondis.DiamondsDisplay3DSprite;

    import Physics = canonkey.Physics;
    import GameDataModel = game.GameDataModel;
    import GameSceneManager = game.GameSceneManager
    import GameSoundManager = game.GameSoundManager
 

    export class LinkPlayUserVo {
        public name: string;
        public gameUserVo: GameUserVo
        public avatar: string;
        public num: number = 0
        public openid: number;
        public skin: number
    }

    export class LinkPlayManager extends Display3D {

        public isAotuPaly: boolean
        public canAotuPlay: boolean
        private static _instance: LinkPlayManager;

        public static getInstance(): LinkPlayManager {
            if (!LinkPlayManager._instance) {
                LinkPlayManager._instance = new LinkPlayManager();
            }
            return LinkPlayManager._instance;
        }
        public onleuserlist: Array<LinkPlayUserVo>;

        constructor() {
            super();
            //this.makeBaseUser()
        }
        public clearAllOnline(): void {
            Physics.ready = false
            while (this.modelItems && this.modelItems.length) {
                this.removeDisplay(this.modelItems.pop())
            }
            this.modelItems = new Array;

            while (this.frame3dItem && this.frame3dItem.length) {
                var frame3Ddis: CanonFrame3DSprite = this.frame3dItem.pop();
                frame3Ddis.destory();
            }
            this.frame3dItem = new Array
     

        }
        public removeDisplay($display: CanonSceneSprite): void {
            var index: number = this.modelItems.indexOf($display);
            if (index != -1) {
                this.modelItems.splice(index, 1);
            }
            $display.destory();
        }

        private _cannoSceneManager: GameSceneManager;
        private _backSartFun: Function;
        private getSelfOnlineUserVo(): LinkPlayUserVo {
            for (var i: number = 0; i < this.onleuserlist.length; i++) {
                if (this.onleuserlist[i].openid == GameData.getStorageSync("openid")) {
                    return this.onleuserlist[i]
                }
            }
            return null

        }
        public loadFinish: boolean
        public startGame($bfun: Function): void {
            this.loadFinish=false

            Physics.world.defaultContactMaterial.restitution = 0.5;
            Physics.world.defaultContactMaterial.friction = 1;


            this._backSartFun = $bfun;
            GameData.gameType = 4;
 
            this._scene = GameDataModel.scene;

            this._cannoSceneManager = game.GameLevelManeger.getInstance()._cannoSceneManager
            Physics.world.gravity = Physics.Vec3dW2C(new Vector3D(0, -Physics.gravity980, 0));
            game.GameLevelManeger.getInstance().clear();
            LinkPlayGravityManager.getInstance().clear();
            this.clearAllOnline();

            var $url = JSON.parse(MsEngine.getInstance().roomInfo.roomProperty).mapname;
            ResManager.getInstance().loadSceneRes($url, this.mainSceneComplete, this.mainSceneProgress, ($str: any) => {
                this.loadSceneConfigCom($str);
                this.loadFinish = true
                this._backSartFun({ name: "canplay" });
            });
        }
        public playOnlineGame(): void {
    
            GameDataModel.lastMainHitTm = TimeUtil.getTimer();
         
            GameDataModel.lastMainHitVect = new Pan3d.Vector3D(GameDataModel.centenBall.x, GameDataModel.centenBall.y, GameDataModel.centenBall.z)
            Physics.ready = true;

        }
        private mainSceneComplete(): void {
        }
        private mainSceneProgress(num: number): void {

        }
        private modelItems: Array<CanonSceneSprite>
        private addModelConlltion(itemObj: any): void {

            var $base: DirectShadowColorSprite = new DirectShadowColorSprite()
            $base.setModelInfoData(itemObj);
            var $key: Array<any> = this.getSceneCollisionItemByUid(itemObj.id);
            var $body: CANNON.Body = new CANNON.Body({ mass: 1 });
            $body.type = CANNON.Body.KINEMATIC;
            if ($key.length) {
                var $collisionItemVo: CollisionItemVo = this._cannoSceneManager.makeBodyByItem($key);
                var $tempDisp: Display3D = new Display3D();
                $tempDisp.y = itemObj.y;
                $tempDisp.x = itemObj.x;
                $tempDisp.z = itemObj.z;
                $tempDisp.scaleX = itemObj.scaleX;
                $tempDisp.scaleY = itemObj.scaleY;
                $tempDisp.scaleZ = itemObj.scaleZ;
                $tempDisp.rotationX = itemObj.rotationX;
                $tempDisp.rotationY = itemObj.rotationY;
                $tempDisp.rotationZ = itemObj.rotationZ;

                $body = Physics.makeBuildBodyMesh($tempDisp, $collisionItemVo);
            } else {
                Physics.bodyAddShape($body, Physics.makeBoxShape(new Vector3D(0.01, 0.01, 0.01)))
            }
            $body.collisionFilterGroup = GameDataModel.GROUP2;
            $body.collisionFilterMask = GameDataModel.GROUP1;

            var $dis: CanonSceneSprite = new CanonSceneSprite($body);
            $dis._directShadowDisplay3DSprite = $base;
            $dis.dispList.push($base);
            $dis._scene = this._scene;
            $dis.addToWorld();

            $dis.x = itemObj.x;
            $dis.y = itemObj.y;
            $dis.z = itemObj.z;
            $base.scaleX = itemObj.scaleX;
            $base.scaleY = itemObj.scaleY;
            $base.scaleZ = itemObj.scaleZ;

            $dis.rotationX = - itemObj.rotationX;
            $dis.rotationY = - itemObj.rotationY;
            $dis.rotationZ = - itemObj.rotationZ;

            this.modelItems.push($dis)

        }
        //public cenetForce: Vector3D
        public upFrame(): void {
            if (canonkey.Physics.ready) {
                GameDataModel.focus3d.y = GameDataModel.centenBall.y;
                canonkey.Physics.update();
                LinkPlayGravityManager.getInstance().upFrame(<LinkPlayCanonPrefabSprite>GameDataModel.centenBall)
                GameSoundManager.getInstance().upFrame();
            }
        }




        private getSceneCollisionItemByUid($num: number): Array<any> {
            var $arr: Array<any> = new Array()
            for (var i: number = 0; i < this._sceneCollisionItem.length; i++) {
                if (this._sceneCollisionItem[i].uid == "build" + $num) {
                    $arr.push(this._sceneCollisionItem[i]);
                }
            }
            return $arr
        }
        private _sceneCollisionItem: Array<any>;
        private _jiguanSpriteItem: Array<CanonFrame3DSprite>
        private frame3dItem: Array<CanonFrame3DSprite>
        public loadSceneConfigCom(obj: any): void {
            GameDataModel.gameAngle = Number(obj.gameAngle);//场景角度
            var buildAry: Array<any> = obj.buildItem;
            this._sceneCollisionItem = obj.sceneCollisionItem;
            for (var j: number = 0; j < buildAry.length; j++) {
                var itemObj: any = buildAry[j];

                if (itemObj.type == BaseRes.SCENE_PARTICLE_TYPE) {
                    var $jiguan: CanonFrame3DSprite = this._cannoSceneManager.addJIguangse(itemObj)
                    $jiguan.x = itemObj.x
                    $jiguan.y = itemObj.y 
                    $jiguan.z = itemObj.z
                    $jiguan.name = itemObj.name
                    this.frame3dItem.push($jiguan)

                }
                if (itemObj.type == BaseRes.PREFAB_TYPE) {
                    if (itemObj.name != "level_start") {
                        if (itemObj.name == "sign_begin" || itemObj.name == "sign_end" || itemObj.name == "level_finish") {
                            LinkPlayGravityManager.getInstance().addPointByObj(itemObj)

                        } else {
                            this.addModelConlltion(itemObj); //场景导出有碰撞体模型
                        }
                    }

                }

            }

        }
    }
}