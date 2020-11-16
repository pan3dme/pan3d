module endless {


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
    import MainCanonPrefabSprite = cannondis.MainCanonPrefabSprite;
    import CanonSceneSprite = cannondis.CanonSceneSprite;
    import DirectShadowColorSprite = cannondis.DirectShadowColorSprite;
    import DiamondsDisplay3DSprite = cannondis.DiamondsDisplay3DSprite;

    import Physics = canonkey.Physics;
    import GameDataModel = game.GameDataModel;
    import GameSceneManager = game.GameSceneManager
 
    export class EndlessConfigVo {
        public levelitem: Array<number>;
        public addtimeitem: Array<any>;
        public maxtime: number;

        public waitrevivetime: number;
        public timefinishrealplaynum: number;
    }

    export class EndlessManager extends Display3D {
        private static _instance: EndlessManager;
        public static getInstance(): EndlessManager {
            if (!EndlessManager._instance) {
                EndlessManager._instance = new EndlessManager();
            }
            return EndlessManager._instance;
        }
        constructor() {
            super();
        }
        public selfBestScore: number = 0
        public saveEndlessDataToWeb(): void {

            if (this.layerNum > this.selfBestScore) {
                var openid: string = GameData.getStorageSync("openid");
                var infoUrl: string;
                if (GameData.userInfo && GameData.userInfo.avatarUrl.length) {
                    infoUrl = GameData.userInfo.avatarUrl;
                } else {
                    infoUrl = GameData.emptyiconUrl
                }
                var $postStr: string = "";
                $postStr += "level=" + 1;
                $postStr += "&openid=" + openid;
                $postStr += "&score=" + this.layerNum;
                $postStr += "&info=" + infoUrl;
                GameData.WEB_SEVER_EVENT_AND_BACK("add_endless_play", $postStr, (res: any) => {

                })
            }


        }
        public static endlessKeyLevel88: number = 88;
        private baseSceneItem: Array<EndlessMapSceneVo>
        private modelItems: Array<CanonSceneSprite>
        private _cannoSceneManager: GameSceneManager;

        private _backSartFun: Function
        public clearAllEndless(): void {
            while (this.modelItems && this.modelItems.length) {
                this.removeDisplay(this.modelItems.pop())
            }
            this.modelItems = new Array
            while (this.frame3dItem && this.frame3dItem.length) {
                var frame3Ddis: CanonFrame3DSprite = this.frame3dItem.pop();
                frame3Ddis.destory();
            }
            this.frame3dItem = new Array;
        }

        public endlessConfigVo: EndlessConfigVo
        public startGame($bfun: Function): void {
            this._backSartFun = $bfun;
            GameData.gameType = 2;
            GameData.setStorageSync("fristShowEndLell", true);
            this._scene = GameDataModel.scene;
            this._cannoSceneManager = game.GameLevelManeger.getInstance()._cannoSceneManager
            Physics.world.gravity = Physics.Vec3dW2C(new Vector3D(0, -Physics.gravity980, 0));
            game.GameLevelManeger.getInstance().makeBaseLevelObj();

            this.clearAllEndless();

            if (!Boolean(this.baseSceneItem)) {
                this.baseSceneItem = new Array();
                var $obj: any = GameData.severinfo.endless
                this.endlessConfigVo = new EndlessConfigVo;
                this.endlessConfigVo.levelitem = $obj.levelitem;
                this.endlessConfigVo.addtimeitem = $obj.addtimeitem;
                this.endlessConfigVo.maxtime = $obj.maxtime * 1000;
                this.endlessConfigVo.waitrevivetime = $obj.waitrevivetime * 1000;
                this.endlessConfigVo.timefinishrealplaynum = $obj.timefinishrealplaynum
                for (var i: number = 0; i < this.endlessConfigVo.levelitem.length; i++) {
                    var $vo: EndlessMapSceneVo = new EndlessMapSceneVo();
                    $vo.mapuid = this.endlessConfigVo.levelitem[i]
                    this.baseSceneItem.push($vo);
                }
                this.loadAllScene();
            } else {
                this.meshAddScene()
            }


        }
        private getAddLevelBySceneId(value: number): number {
            for (var i: number = 0; i < this.endlessConfigVo.addtimeitem.length; i++) {
                if (this.endlessConfigVo.addtimeitem[i].mapuid == value) {
                    return this.endlessConfigVo.addtimeitem[i].addtime
                }
            }
            return 0
        }
        private failWaitLoadScene(): void {
            Pan3d.TimeUtil.addTimeOut(2000, () => {  //延后100毫秒开始
                this.startGame(this._backSartFun)
            }, );

        }
        private testLoadFinish(): void {
            var $finish: boolean = true
            for (var i: number = 0; i < this.baseSceneItem.length; i++) {
                if (!this.baseSceneItem[i].isfinish) {
                    $finish = false
                }
            }
            if ($finish) {
                this.meshAddScene()
            }
        }
        private loadAllScene(): void {
            for (var i: number = 0; i < this.baseSceneItem.length; i++) {
                this.baseSceneItem[i].initData(() => {
                    this.testLoadFinish()
                })
            }

        }


        private meshAddScene(): void {
            GameDataModel.gameAngle = 0;
            this.layerNum = 1
            game.GameGravityManager.getInstance()._gravityItem = new Array
            this.nextScenePostion = new Vector3D(0, 0, 0);
            this.meshTempScene(this.baseSceneItem[0]);//初始添加两个场景
            this.meshTempScene(this.baseSceneItem[1]);

            Pan3d.TimeUtil.addTimeOut(100, () => {  //延后100毫秒开始
                this._backSartFun({ name: "canplay" })
            }, );

        }

        public CountdownTm: number;
        public layerNum: number=1;
        public nextRevivePostion: Vector3D;
        public nextReviveTm: number;

        private lastSelectSceneId: number=0
        private getNextLevelRanomdId(): number {
            var $id: number = this.lastSelectSceneId;
            while (this.lastSelectSceneId == $id) {
                $id = random(this.baseSceneItem.length)
            }
            this.lastSelectSceneId = $id;
            return $id
        }
        public needAddNewScene(): void {

            this.layerNum++
            if (this.selfBestScore > this.layerNum) {
                this.layerNum = Math.max(this.layerNum, Math.floor(this.selfBestScore / 2))//取最大值的一半
            }

            this.saveEndlessDataToWeb()


            var $addScene: EndlessMapSceneVo = this.baseSceneItem[this.getNextLevelRanomdId()]

          
            GameData.dispatchEvent(new EndLessEvent(EndLessEvent.MUI_SHOW_ADD_SCENE_TIME), this.nextShowAddTime);

            this.CountdownTm = Math.min(this.CountdownTm + this.nextShowAddTime * 1000, TimeUtil.getTimer() + this.endlessConfigVo.maxtime);
            this.meshTempScene($addScene);
            //     this.meshTempScene(this.baseSceneItem[0]);//初始添加两个场景
        }
        public saveEndlesreviveTimePos(): void {
            this.nextRevivePostion = new Pan3d.Vector3D(GameDataModel.centenBall.x, GameDataModel.centenBall.y, GameDataModel.centenBall.z)
            this.nextReviveTm = this.CountdownTm - TimeUtil.getTimer()
        }
        public clearLastScene(): void {
            for (var i: number = (this.modelItems.length - 1); i >= 0; i--) {
                var num: number = Number(this.modelItems[i].name)
                if (num < this.sceneId - 1) {
                    this.removeDisplay(this.modelItems[i])
                }
            }
            this.removeLastFrame3d()
    
 
        }
        private removeLastFrame3d(): void {
            for (var i: number = (this.frame3dItem.length - 1); i >= 0; i--) {
                var num: number = Number(this.frame3dItem[i].name)
                if (num < this.sceneId - 1) {
                    this.frame3dItem[i].destory();
                }
            }

        }
        public removeDisplay($display: CanonSceneSprite): void {
            var index: number = this.modelItems.indexOf($display);
            if (index != -1) {
                this.modelItems.splice(index, 1);
            }
            $display.destory();
        }
        private nextScenePostion: Vector3D;
        private sceneId: number = 0
        private nextShowAddTime: number
        private frame3dItem: Array<CanonFrame3DSprite>
        private meshTempScene($vo: EndlessMapSceneVo): void {
            this.nextShowAddTime = this.getAddLevelBySceneId($vo.mapuid)
            GameDataModel.levelStartTm = TimeUtil.getTimer();
            this.sceneId++
            var $cloneV3d: Vector3D = this.nextScenePostion.clone()
            var $obj: any = $vo.sceneRes.sceneData
            var buildAry: Array<any> = $obj.buildItem;
            var sceneCollisionItem: Array<any> = $obj.sceneCollisionItem;

            for (var j: number = 0; j < buildAry.length; j++) {
                var itemObj: any = buildAry[j];
                console.log(itemObj.type)
                if (itemObj.type == BaseRes.SCENE_PARTICLE_TYPE) {
                    var $jiguan: CanonFrame3DSprite = this._cannoSceneManager.addJIguangse(itemObj)

                    $jiguan.x = itemObj.x + this.nextScenePostion.x;
                    $jiguan.y = itemObj.y + this.nextScenePostion.y;
                    $jiguan.z = itemObj.z + this.nextScenePostion.z;

                    $jiguan.name = String(this.sceneId);
                    this.frame3dItem.push($jiguan)

                }
                if (itemObj.type == BaseRes.PREFAB_TYPE) {
                    if (itemObj.name != "level_start") {
                        if (itemObj.name == "sign_begin" || itemObj.name == "sign_end") {
                            var $gravityVo: GravityVo = new GravityVo()
                            $gravityVo.x = itemObj.x + this.nextScenePostion.x;
                            $gravityVo.y = itemObj.y + this.nextScenePostion.y;
                            $gravityVo.z = itemObj.z + this.nextScenePostion.z;

                            switch (itemObj.name) {
                                case "sign_begin":
                                    $gravityVo.type = 1
                                    $cloneV3d.x = $gravityVo.x;
                                    $cloneV3d.y = $gravityVo.y;
                                    $cloneV3d.y -= 600;
                                    $cloneV3d.z = $gravityVo.z;
                                    break
                                case "sign_end":
                                    $gravityVo.type = 2
                                    break
                                default:
                                    console.log("没有这个类型，所以请注意")
                                    break

                            }
                            game.GameGravityManager.getInstance()._gravityItem.push($gravityVo);
                        } else {
                            this.addModelConlltion(itemObj, sceneCollisionItem, this.nextScenePostion); //场景导出有碰撞体模型
                        }
                    }

                }

            }

            this.nextScenePostion = $cloneV3d.clone()
            console.log(this.nextScenePostion)
        }

        private addModelConlltion(itemObj: any, sceneCollisionItem: Array<any>, $move: Vector3D): void {

            var $base: DirectShadowColorSprite = new DirectShadowColorSprite()
            $base.setModelInfoData(itemObj);
            var $key: Array<any> = this.getSceneCollisionItemByUid(itemObj.id, sceneCollisionItem);
            var $body: CANNON.Body = new CANNON.Body({ mass: 1 });
            $body.type = CANNON.Body.KINEMATIC;
            if ($key.length) {
                var $collisionItemVo: CollisionItemVo = this._cannoSceneManager.makeBodyByItem($key);
                var $tempDisp: Display3D = new Display3D();
                $tempDisp.y = itemObj.y
                $tempDisp.x = itemObj.x
                $tempDisp.z = itemObj.z
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

            $dis.x = itemObj.x + $move.x;;
            $dis.y = itemObj.y + $move.y;;
            $dis.z = itemObj.z + $move.z;;
            $base.scaleX = itemObj.scaleX;
            $base.scaleY = itemObj.scaleY;
            $base.scaleZ = itemObj.scaleZ;

            $dis.rotationX = - itemObj.rotationX;
            $dis.rotationY = - itemObj.rotationY;
            $dis.rotationZ = - itemObj.rotationZ;

            $dis.name = String(this.sceneId);
            this.modelItems.push($dis);
        }
        private getSceneCollisionItemByUid($num: number, _sceneCollisionItem: Array<any>): Array<any> {
            var $arr: Array<any> = new Array()
            for (var i: number = 0; i < _sceneCollisionItem.length; i++) {
                if (_sceneCollisionItem[i].uid == "build" + $num) {
                    $arr.push(_sceneCollisionItem[i]);
                }
            }
            return $arr
        }


        public revivePlay(): void {
            GameDataModel.centenBall.x = this.nextRevivePostion.x;
            GameDataModel.centenBall.y = this.nextRevivePostion.y;
            GameDataModel.centenBall.z = this.nextRevivePostion.z;

            this.CountdownTm = this.nextReviveTm + TimeUtil.getTimer();

            game.GameDataModel.centenBall.body.sleep()
            game.GameDataModel.centenBall.body.wakeUp();

            GameDataModel.lastMainHitTm = TimeUtil.getTimer();
            GameDataModel.levelStartTm = TimeUtil.getTimer();
            GameDataModel.lastMainHitVect = new Vector3D(GameDataModel.centenBall.x, GameDataModel.centenBall.y, GameDataModel.centenBall.z)
            Physics.world.gravity = Physics.Vec3dW2C(new Vector3D(0, -Physics.gravity980, 0));

            Physics.ready = true;
        }



    }

}
