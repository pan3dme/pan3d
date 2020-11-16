

module game {
    import Display3D = Pan3d.Display3D;
    import Vector3D = Pan3d.Vector3D;
    import ResManager = Pan3d.ResManager;
    import CollisionItemVo = Pan3d.CollisionItemVo;
    import BaseRes = Pan3d.BaseRes;
    import TimeUtil = Pan3d.TimeUtil;
    import SceneRes = Pan3d.SceneRes
    import Matrix3D = Pan3d.Matrix3D
    import Quaternion = Pan3d.Quaternion

    import Physics = canonkey.Physics;

    import CanonPrefabSprite = canonkey.CanonPrefabSprite
    import CanonFrame3DSprite = frame3d.CanonFrame3DSprite;
    import MainCanonPrefabSprite = cannondis.MainCanonPrefabSprite;
    import LevelMainCanonPrefabSprite = cannondis.LevelMainCanonPrefabSprite;

    import BaoxiangDisplay3DSprite = baoxiang.BaoxiangDisplay3DSprite
    import ReviveModelSprite= revive.ReviveModelSprite
    import CanonSceneSprite = cannondis.CanonSceneSprite;
    import DirectShadowColorSprite = cannondis.DirectShadowColorSprite;
    import DynamicDirectShadowColorSprite = cannondis.DynamicDirectShadowColorSprite;
    import DiamondsDisplay3DSprite = cannondis.DiamondsDisplay3DSprite;
    

    export class GameLevelManeger extends Display3D {
        private static _instance: GameLevelManeger;
        public static getInstance(): GameLevelManeger {
            if (!GameLevelManeger._instance) {
                GameLevelManeger._instance = new GameLevelManeger();
            }
            return GameLevelManeger._instance;
        }
        constructor() {
            super();
            this.modelItems = new Array;
            this.jiguanSpriteItem = new Array;
            this.modelRevives = new Array
            this.modelDiamods = new Array()
            this.modelBaoxiangs = new Array()
        }
        public _cannoSceneManager: GameSceneManager;
        public initScene($cannoSceneManager: GameSceneManager): void {
            this._cannoSceneManager = $cannoSceneManager;
        }


  
        private canHitTm: number = 0;
        private lastHitPos: Vector3D
        private addEvents(): void {
            GameDataModel.centenBall.body.addEventListener("collide", (evt: any) => {
                var $hitBody: GameStateBody = evt.body
                var $mainBody: CANNON.Body = GameDataModel.centenBall.body
                var $pos: Vector3D = GameDataModel.centenBall.getPostionV3d();
                var $highHit: boolean = false
                if (this.lastHitPos && Math.abs(this.lastHitPos.y - $pos.y) > 2) {
                    $highHit = true
                }
                this.lastHitPos = $pos
                if (($hitBody && $hitBody.iswall || $highHit) && this.canHitTm < TimeUtil.getTimer()) {
                    GameData.isHitColone = true;
                    this.canHitTm = TimeUtil.getTimer() + 100
                   
                }
                
            })

        }
        private addMoveSphereMain($scale: number): LevelMainCanonPrefabSprite {
            var $sphere: CANNON.Shape = new CANNON.Sphere($scale / Physics.baseScale10)
            var $body: CANNON.Body = new CANNON.Body({ mass: 1.00 });
            $body.collisionFilterGroup = GameDataModel.GROUP1;
            $body.collisionFilterMask = GameDataModel.GROUP1 | GameDataModel.GROUP2 | GameDataModel.GROUP3;
            $body.addShape($sphere);
            var $dis: LevelMainCanonPrefabSprite = new LevelMainCanonPrefabSprite($body)
            $dis._scene = this._scene
            $dis.addToWorld();
 
            return $dis
        }
        public clear(): void {
            Physics.ready = false;
            GameDataModel.modelRotation.x = 0;
            GameDataModel.modelRotation.z = 0;
            GameDataModel.mouseDownPosint = null

            GameDataModel.lastMainHitTm = TimeUtil.getTimer();
            GameGravityManager.getInstance().clear();

            while (this.modelItems.length) {
                var dis: CanonSceneSprite = this.modelItems.pop();
                dis.destory();
            }
            GameStateBodyModl.getInstance().clear()
            while (this.jiguanSpriteItem.length) {
                var frame3Ddis: CanonFrame3DSprite = this.jiguanSpriteItem.pop();
                frame3Ddis.destory();
            }
            while (this.modelDiamods.length) {
                var diamondSprite: DiamondsDisplay3DSprite = this.modelDiamods.pop();
                game.GameDataModel.scene.removeDisplay(diamondSprite);
                diamondSprite.destory();
            }
            while (this.modelRevives.length) {
                var riviveSprite: ReviveModelSprite = this.modelRevives.pop();
                game.GameDataModel.scene.removeDisplay(riviveSprite);
                riviveSprite.destory();
            }
            while (this.modelBaoxiangs.length) {
                var baoxiangSprite: BaoxiangDisplay3DSprite = this.modelBaoxiangs.pop();
                game.GameDataModel.scene.removeDisplay(baoxiangSprite);
                baoxiangSprite.destory();
            }
            if (Physics.world && Physics.world.bodies) {
                console.log("清理完场景后剩下的body数量",Physics.world.bodies.length)

            }

            
        }


        public modelItems: Array<CanonSceneSprite>

        public makeBaseLevelObj(): void {
            Physics.world.gravity = Physics.Vec3dW2C(new Vector3D(0, -Physics.gravity980, 0));
            this.clear();
            var $mainBall: MainCanonPrefabSprite
            if (GameDataModel.centenBall) {
                $mainBall = GameDataModel.centenBall;
                GameDataModel.centenBall.body.sleep();
                GameDataModel.centenBall.body.wakeUp();
            } else {
                $mainBall = this.addMoveSphereMain(12);
                GameDataModel.centenBall = $mainBall;
                GameDataModel.changeMainEffict()
                this.addEvents();
            }
 
            GameDataModel.centenBall.x = 0
            GameDataModel.centenBall.y = 20
            GameDataModel.centenBall.z = 0
            GameDataModel.centenBall.bodyfouce.x = 0
            GameDataModel.centenBall.bodyfouce.y = 0
            GameDataModel.centenBall.bodyfouce.z = 0
            GameDataModel.centenBall.resetParticlePos()

          
         

        }
        private mainSceneComplete(): void {
            console.log("加载完成")
        }
        public canUseLoaderLoad: boolean = true //是否可以用场景加载下一张场景
 
        private nowSelectLevelUrl: string
        public initXmlModel(value: string, $bfun: Function = null): void {
     
            if (!this.canUseLoaderLoad) {
                return;
            } else {
                this.canUseLoaderLoad = false;
            }
           // value="1059"
            this.nowSelectLevelUrl = value;
            this.makeBaseLevelObj();
            this.loadSceneByName(this.nowSelectLevelUrl, $bfun);
         
        }
        private loadSceneByName($mapname: string, $bfun: Function): void {
            if (ResManager.getInstance()._dic[$mapname] ) {
                if (ResManager.getInstance()._dic[$mapname].sceneData) {
                    this.setSceneData(ResManager.getInstance()._dic[$mapname].sceneData, $bfun);
                } else {
                    ResManager.getInstance()._dic[$mapname] = null;
                    this.failWaitLoadScene($bfun);
                }
            } else {
                ResManager.getInstance().loadSceneRes($mapname, this.mainSceneComplete, this.mainSceneProgress, ($data: any) => {
                    this.setSceneData($data, $bfun)
                }, {
                    failfun: () => {
                        this.failWaitLoadScene($bfun);
                    }
                    });
            }
        }
        private setSceneData($data: any, $bfun: Function): void {
            GameDataModel.centenBall.resetParticlePos();
            this.loadSceneConfigCom($data);
      
            Pan3d.TimeUtil.addTimeOut(100, () => {  //延后100毫秒开始
                GameDataModel.lastMainHitTm = TimeUtil.getTimer();
                GameDataModel.levelStartTm = TimeUtil.getTimer();
                GameDataModel.lastMainHitVect = new Pan3d.Vector3D(GameDataModel.centenBall.x, GameDataModel.centenBall.y, GameDataModel.centenBall.z)
                Physics.ready = true;
                this.canUseLoaderLoad = true
                $bfun && $bfun()
            }, );

        }
        public loadNextSceneData(mapStr: string): void {
            if (!ResManager.getInstance()._dic[mapStr]) {
                var sceneRes: SceneRes = new SceneRes;
                sceneRes.load(mapStr, () => { }, () => { }, ($data: any) => {
                    if (!ResManager.getInstance()._dic[mapStr]) { //写两次，防止两次加载，
                        ResManager.getInstance()._dic[mapStr] = sceneRes;
                        for (var j: number = 0; j < sceneRes.sceneData.buildItem.length; j++) {
                            var itemObj: any = sceneRes.sceneData.buildItem[j];
                            if (itemObj.type == BaseRes.SCENE_PARTICLE_TYPE) {
                                var canonFrame3DSprite: CanonFrame3DSprite = new CanonFrame3DSprite();
                                canonFrame3DSprite.setInfo(itemObj)
                            }
                        }
                    }

                })
            }
        }
 
     
        private failWaitLoadScene($bfun: Function = null): void {
            Pan3d.TimeUtil.addTimeOut(2000, () => {  //延后100毫秒开始
                this.canUseLoaderLoad = true
                this.initXmlModel(this.nowSelectLevelUrl, $bfun);
            }, );

        }
    


        private makeBodyByKey(itemObj: any, $key: Array<any>): CANNON.Body {

            var $body: CANNON.Body = new CANNON.Body({ mass: 1.0 });
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

                Physics.makeBuildBodyMesh($tempDisp, $collisionItemVo, $body,0.5);

            } else {
                console.log("有错的模型")
                Physics.bodyAddShape($body, Physics.makeBoxShape(new Vector3D(0.01, 0.01, 0.01)))
            }
         
            return $body
        }
     

        private addModelConlltion(itemObj: any): void {
        
    
            var $base: DirectShadowColorSprite = new DirectShadowColorSprite()
      
            var $key: Array<any> = this.getSceneCollisionItemByUid(itemObj.id);
            var $body: CANNON.Body = this.makeBodyByKey(itemObj, $key)
     
                //显示对象上的碰撞无效
                if (String(itemObj.materialurl).indexOf("freetesture.txt") == -1) { //特殊材质名字，
                    $body.collisionFilterGroup = GameDataModel.GROUP3;
                    $body.collisionFilterMask = GameDataModel.GROUP3;
                    //需要添加场景静态碰撞
                    GameStateBodyModl.getInstance().addToStateBodyItem(itemObj, $key)
                   $body=null
                } else {
                    //自由物件就不要加静态的碰撞
                    $base = new DynamicDirectShadowColorSprite()
                    console.log($body.mass, $body.mass )
                    $body.collisionFilterGroup = GameDataModel.GROUP1;
                    $body.collisionFilterMask = GameDataModel.GROUP1 | GameDataModel.GROUP2;
                    $body.type = CANNON.Body.DYNAMIC;
                }
     
 
            $base.setModelInfoData(itemObj);
         

            var $dis: CanonSceneSprite = new CanonSceneSprite($body);
            $dis._directShadowDisplay3DSprite = $base;
            $dis.dispList.push($base);
            $dis._scene = this._scene;
            $dis.addToWorld();

            $dis.x = itemObj.x;
            $dis.y = itemObj.y;
            $dis.z = itemObj.z;
 
            $dis.rotationX =- itemObj.rotationX;
            $dis.rotationY =- itemObj.rotationY;
            $dis.rotationZ =- itemObj.rotationZ;


            $base.scaleX = itemObj.scaleX;
            $base.scaleY = itemObj.scaleY;
            $base.scaleZ = itemObj.scaleZ;

            if (!$body) {
                $base.x = itemObj.x;
                $base.y = itemObj.y;
                $base.z = itemObj.z;
                $base.rotationX = itemObj.rotationX;
                $base.rotationY = itemObj.rotationY
                $base.rotationZ = itemObj.rotationZ;
          
            }
 
            this.modelItems.push($dis)

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
        public jiguanSpriteItem: Array<CanonFrame3DSprite>
        public loadSceneConfigCom(obj: any): void {


            GameDataModel.gameAngle = Number(obj.gameAngle);//场景角度
          
             
            var buildAry: Array<any> = obj.buildItem;
            this._sceneCollisionItem = obj.sceneCollisionItem;
            for (var j: number = 0; j < buildAry.length; j++) {
                var itemObj: any = buildAry[j];
                if (itemObj.type == BaseRes.PREFAB_TYPE) {
                    if (String(itemObj.name).indexOf("revive") != -1) {
                        this.addReviveModel(itemObj)
                    } else {
                        switch (itemObj.name) {
                            case "level_start":
                                break
                            case "sign_begin":
                            case "sign_end":
                            case "level_finish":
                                GameGravityManager.getInstance().addPointByObj(itemObj)
                                break;
                            default:


                                this.addModelConlltion(itemObj); //场景导出有碰撞体模型
                                break

                        }
                    }
                   
 
                   
                }
                if (itemObj.type == BaseRes.SCENE_PARTICLE_TYPE) {
                    var $jiguan: CanonFrame3DSprite = this._cannoSceneManager.addJIguangse(itemObj)
                    this.jiguanSpriteItem.push($jiguan)
                }
            }
            this.addDiamodsConfig();
            this.addBaoxiangConfig();
        }
        private addReviveModel(itemObj: any): void {

            var $dis: ReviveModelSprite = new ReviveModelSprite
            $dis.x = itemObj.x
            $dis.y = itemObj.y
            $dis.z = itemObj.z

            $dis._scene = game.GameDataModel.scene;
            game.GameDataModel.scene.addDisplay($dis);
            $dis.setReviveTemp(itemObj);
            this.modelRevives.push($dis);

        }
        private modelRevives: Array<ReviveModelSprite>;
        private modelDiamods: Array<DiamondsDisplay3DSprite>;
        private modelBaoxiangs: Array<BaoxiangDisplay3DSprite>;

        private addDiamodsConfig(): void {

            var $str= GameData.getStorageSync("hasDiamonds")
                var hasStorageArr: Array<any>
            if ($str) {
                    hasStorageArr = JSON.parse($str);
            }
            var $isNum: number = Number(this.nowSelectLevelUrl)
            if ($isNum > 1000) { //这里特殊转换只有1000纯数字编号地图才可能有钻石
                $isNum = $isNum-1000
                var $arr: Array<any> = GameData.getDiamodsConfigByLevel($isNum)
                for (var i: number = 0; $arr && i < $arr.length; i++) {
                    var $name = $isNum + "_" + $arr[i].id;
                    var $needAdd: boolean = true
                    for (var j: number = 0; hasStorageArr && j < hasStorageArr.length; j++) {
                        if (hasStorageArr[j].name == $name) {
                            $needAdd = false
                        }
                    }
                    if ($needAdd) {
                        var disDiaMonds: DiamondsDisplay3DSprite = new DiamondsDisplay3DSprite();
                        disDiaMonds.name = $name;
                        disDiaMonds.x = $arr[i].x;
                        disDiaMonds.y = $arr[i].y;
                        disDiaMonds.z = $arr[i].z;
                        disDiaMonds.setModelById("zhuanshi");
                        disDiaMonds._scene = game.GameDataModel.scene;
                        game.GameDataModel.scene.addDisplay(disDiaMonds);
                        this.modelDiamods.push(disDiaMonds)
                    }
                }
            }
           
  
        }
        private addBaoxiangConfig(): void {
            if (GameData.severinfo.wxcloudModel == 1) {
                return;
            }

            var $str = GameData.getStorageSync("hasBaoxiang")
            var hasStorageArr: Array<any>
            if ($str) {
                hasStorageArr = JSON.parse($str);
            }
            var mapid: string = this.nowSelectLevelUrl
            var $arr: Array<any> = GameData.getBaoxiangConfigByLevelStr(mapid)
            for (var i: number = 0; $arr && i < $arr.length; i++) {
                var vo: baoxiang.BaoxiangMeshVo = new baoxiang.BaoxiangMeshVo()
                vo.meshObj($arr[i])
                vo.name = mapid + "_" + vo.id;
                var $needAdd: boolean = true
                for (var j: number = 0; hasStorageArr && j < hasStorageArr.length; j++) {
                    if (hasStorageArr[j].name == vo.name) {
                        $needAdd = false
                    }
                }
                if (vo.type == 1) { //是为宝箱
                    if (Math.random() < vo.random) {
                        $needAdd = true;
                    }
                }
                if ($needAdd) {  
                    var baoxiangDis: BaoxiangDisplay3DSprite = new BaoxiangDisplay3DSprite();
                    baoxiangDis.baoxiangMeshVo = vo;
                    baoxiangDis.x = vo.x;
                    baoxiangDis.y = vo.y;
                    baoxiangDis.z = vo.z;
                    baoxiangDis.rotationY = vo.rotation;
                    
                    baoxiangDis.setModelById("baoxiang001");
                    baoxiangDis._scene = game.GameDataModel.scene;
                    game.GameDataModel.scene.addDisplay(baoxiangDis);
                    this.modelBaoxiangs.push(baoxiangDis)
                }
              
            }

       

        }
     
        private mainSceneProgress(num: number): void {

        }


    }
}