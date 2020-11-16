module game {
    import Vector3D = Pan3d.Vector3D;
    import Vector2D = Pan3d.Vector2D;
    import LightVo = Pan3d.LightVo;
    import Display3DFollowLocusPartilce = Pan3d.Display3DFollowLocusPartilce;
    import LayaOverride2dSceneManager = layapan.LayaOverride2dSceneManager;
    import MainCanonPrefabSprite = cannondis.MainCanonPrefabSprite;
    import LevelMainCanonPrefabSprite = cannondis.LevelMainCanonPrefabSprite;


    import Physics = canonkey.Physics;


    export  class GameDataModel {

        public static scene:  LayaOverride2dSceneManager;
        public static lightVo: LightVo;
        public static useColor: GameSceneColorVo;

        public static centenBall: MainCanonPrefabSprite;
 
        public static  mouseDownPosint: Vector2D;
        public static  lastRotation: Vector3D;
        public static modelRotation: Vector3D
        public static lastMainHitTm: number
        public static lastMainHitVect: Vector3D
        public static levelNum: number;
        public static isLevelFinish: boolean; //等级完成
        public static lastRevivePos: Vector3D
 
        public static gameAngle: number

        public static GROUP1 = 1;
        public static GROUP2 = 2;
        public static GROUP3 = 4;

        public static levelStartTm: number
        public static showGameFpsTm: boolean
        public static focus3d: Vector3D;

        public static initData($scene: LayaOverride2dSceneManager): void {
            GameDataModel.scene = $scene
            GameDataModel.focus3d = new Vector3D()
            GameDataModel.lightVo = new LightVo()
            GameDataModel.scene.light = GameDataModel.lightVo
 
            Display3DFollowLocusPartilce.waitCdTime = 10;
            GameDataModel.lastMainHitTm = 0;


            var $vo: GameSceneColorVo = new GameSceneColorVo()
            $vo.bgTop = new Vector3D(115 / 255, 178 / 255, 168 / 255);
            $vo.bgBottom = new Vector3D(96 / 255, 170 / 255, 220 / 255);
            $vo.modelcolor = new Vector3D(111 / 255, 176 / 255, 179 / 255);
            GameDataModel.useColor = $vo

            var $sunNrm = new Vector3D(0, 1, 0);
            var $sunColor = new Vector3D(40 / 255, 56 / 255, 65 / 255);
            var $ambientColor = new Vector3D(64 / 255, 100 / 255, 110 / 255);
            GameDataModel.lightVo.setData($sunNrm, $sunColor, $ambientColor);

        }
       



        public static onMouseDown($v2d: Vector2D): void {
      
             
            if (!GameData.hasWinPanel && GameDataModel.modelRotation) { //只有一组UI
                GameDataModel.mouseDownPosint = $v2d
                GameDataModel.lastRotation.x = GameDataModel.modelRotation.x;
                GameDataModel.lastRotation.y = GameDataModel.modelRotation.y;
                GameDataModel.lastRotation.z = GameDataModel.modelRotation.z;

                var isHit: boolean = MouseClikModel.getInstance().mouseClik($v2d);
             

            } else {
      
            }
        }
        public static setWorldGravityByModelRotatioin(): void {

            if (GameDataModel.centenBall) {
                var bindMatrix3D: Pan3d.Matrix3D = new Pan3d.Matrix3D;
                bindMatrix3D.appendRotation(GameDataModel.modelRotation.z, Pan3d.Vector3D.X_AXIS);
                bindMatrix3D.appendRotation(GameDataModel.modelRotation.x, Pan3d.Vector3D.Z_AXIS);
                bindMatrix3D.appendRotation(-GameDataModel.gameAngle, Pan3d.Vector3D.Y_AXIS);
                var $bodyfouce: Pan3d.Vector3D = bindMatrix3D.transformVector(new Pan3d.Vector3D(0, -Physics.gravity980 * 1.5, 0));
                 GameDataModel.centenBall.bodyfouce = $bodyfouce;
            }
           
           
        }
        public static onMouseMove($v2d: Vector2D): void {
            if (GameData.gameType == 1 || GameData.gameType == 2 || GameData.gameType == 5) {
                if (GameDataModel.mouseDownPosint) {
                    var $k: Pan3d.Vector2D = $v2d;
                    $k = $k.subtract(GameDataModel.mouseDownPosint)
              
               
                    GameDataModel.modelRotation.x = GameDataModel.lastRotation.x + $k.x / 15;
                    GameDataModel.modelRotation.z = GameDataModel.lastRotation.z + $k.y / 15;
                    var $maxRoation45: number = 40
                    GameDataModel.modelRotation.x = Math.min($maxRoation45, Math.max(GameDataModel.modelRotation.x, -$maxRoation45))
                    GameDataModel.modelRotation.z = Math.min($maxRoation45, Math.max(GameDataModel.modelRotation.z, -$maxRoation45))
                    GameDataModel.setWorldGravityByModelRotatioin()
                }
            }
        }

        public static changeMainEffict(): void {
            var $dis: MainCanonPrefabSprite = GameDataModel.centenBall
            var value = GameData.getStorageSyncNumber("skinType")
            if (value) {
                GameData.skinType = Math.max(Number(value), 1);
            } else {
                GameData.skinType = 4; //首次进来给足球
                GameData.setStorageSync("skinType", GameData.skinType);
            }
            var $scale: number = 1
            var $effictName: string;
            var $trunPos: Vector3D;
            if (GameData.getStorageSync("useEffictSkin")) {
                $effictName = "skin001";
                $scale = 1.4
                $dis.changeSkinById(4);
                

                //$effictName = "skin002";
                //$scale = 2.5
                //$dis.changeSkinById(11);

                $trunPos = null
 
            } else {
                $effictName = "genshui";
                $scale = 1
                $trunPos = new Vector3D(0, -5, 0)
                $dis.changeSkinById(GameData.skinType);
            }
            if (Scene_data.supportBlob) {
                $dis.playLyf("model/" + $effictName + "_lyf.txt", $trunPos, $scale);
            } else {
                $dis.playLyf("model/" + $effictName + "_base.txt", $trunPos, $scale);
            }
        }


    }
}