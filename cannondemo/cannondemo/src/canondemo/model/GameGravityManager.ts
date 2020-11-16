module game {
    import Object3D = Pan3d.Object3D;
    import TextJumpUiVo = Pan3d.TextJumpUiVo;
    import Vector3D = Pan3d.Vector3D;
    import TimeUtil = Pan3d.TimeUtil;
    import Display3D = Pan3d.Display3D
    import ModuleEventManager = Pan3d.ModuleEventManager;
    import CanonPrefabSprite = canonkey.CanonPrefabSprite
    import MainCanonPrefabSprite = cannondis.MainCanonPrefabSprite
    
  

    export class GameGravityManager {
        private static _instance: GameGravityManager;
        public static getInstance(): GameGravityManager {
            if (!GameGravityManager._instance) {
                GameGravityManager._instance = new GameGravityManager();
            }
            return GameGravityManager._instance;
        }
 
        public clear(): void {
            this._gravityItem = new Array();

            GameDataModel.lastRevivePos=null
            GameDataModel.isLevelFinish = false
            this.needCallEndlessClear = false
        }
 
     
  

        public _gravityItem: Array<GravityVo>
        public addPointByObj(value: any): void {
            var $gravityVo: GravityVo = new GravityVo()
            $gravityVo.x = value.x;
            $gravityVo.y = value.y;
            $gravityVo.z = value.z;

            $gravityVo.type = 1;
            switch (value.name) {
                case "sign_begin":
                    $gravityVo.type = 1
                    break
                case "sign_end":
                    $gravityVo.type = 2
                    break
                case "level_finish":
                    $gravityVo.type = 3
                    break
                default:
                    console.log("注意还没有这个类型")
                    break;
            }

            this._gravityItem.push($gravityVo);
        }
        public showJumpText($scene: layapan.LayaOverride2dSceneManager, $pos: Vector3D): void {

            var $jumpVo: TextJumpUiVo = new TextJumpUiVo()
            $jumpVo.str = String("1");
            $jumpVo.pos = new Vector3D();
            $jumpVo.pos.x = $pos.x
            $jumpVo.pos.z = $pos.z
            $jumpVo.pos.y = $pos.y
            $jumpVo.type = 1
            $jumpVo.starttime = TimeUtil.getTimer();
            $jumpVo.endtime = TimeUtil.getTimer() + 1200;
            $scene.bloodManager.setJumpNum($jumpVo);
        }
        private getNextToVelocity($body: CANNON.Body, $GravityVo: GravityVo): void {
            var aa: Vector3D = new Vector3D($GravityVo.x, $GravityVo.y, $GravityVo.z)
            var bb: Vector3D = new Vector3D(this.nextGravityVo.x, this.nextGravityVo.y, this.nextGravityVo.z)
            var cc: Vector3D = bb.subtract(aa);
            cc.normalize();
            cc.scaleBy(canonkey.Physics.gravity980 * 2);
            canonkey.Physics.world.gravity = canonkey.Physics.Vec3dW2C(cc);
            $body.sleep()
            $body.wakeUp();

        }
        //处理掉落起始点
        private moveToPosByDis(value: CanonPrefabSprite, $GravityVo: GravityVo, $dis: number): void {
            var bb: Vector3D = new Vector3D($GravityVo.x, $GravityVo.y, $GravityVo.z)
            var aa: Vector3D = new Vector3D(value.x, value.y, value.z)
            var cc: Vector3D = bb.subtract(aa);
            cc.normalize();
            cc.scaleBy(1);
            value.x += cc.x
            value.y += cc.y
            value.z += cc.z
            value.body.velocity.x = 0
            value.body.velocity.y = 0
            value.body.velocity.z = 0
           
        }
        private removeGravity($vo: GravityVo): void {
            var index: number = this._gravityItem.indexOf($vo);
            if (index != -1) {
                this._gravityItem.splice(index, 1);
            }
        }
        private needCallEndlessClear: boolean
        public upFrame(value: CanonPrefabSprite): void {
            var ball: MainCanonPrefabSprite = <MainCanonPrefabSprite> value
            if (GameDataModel.isLevelFinish) {
                return;
            }
          
 
            if (!ball.beginGravityVo) {
                //检测是否在连接结束点
                var selfPos: Vector3D = ball.getPostionV3d()
                for (var i: number = 0; this._gravityItem && i < this._gravityItem.length; i++) {
                    var $dis: number = Display3D.distance(selfPos, this._gravityItem[i])
                    if (this._gravityItem[i].type == 1) {
                        if ($dis < 12) {
                            if ($dis < 1) { //一定是在范围内
                                ball.body.sleep()
                                ball.aotuFallDownTm = TimeUtil.getTimer();
                                ball.beginGravityVo = this._gravityItem[i];
                                ball.endGravityVo = this.getNextTo(selfPos);

                                if (GameData.gameType == 2) {
                                    ModuleEventManager.dispatchEvent(new endless.EndLessEvent(endless.EndLessEvent.ENDLESS_NEED_ADD_SCENE))
                                }
                            } else {
                                this.moveToPosByDis(value, this._gravityItem[i], $dis)
                            }
                
                        }
                      
                    }
                    if (this._gravityItem[i].type == 3) {
                        if ($dis < 10) { //一定是在范围内
                            if ($dis < 1) { //一定是在范围内
                                value.body.sleep();
                                console.log("等级完成", GameDataModel.levelNum);
                                GameDataModel.isLevelFinish = true
                               
                         
                                GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.GAME_LEVE_UP), { usetime: TimeUtil.getTimer() - game.GameDataModel.levelStartTm })
                                ModuleEventManager.dispatchEvent(new leveluppan.LevelUpEvent(leveluppan.LevelUpEvent.SHOW_LEVEL_UP_PANEL));
                            } else {
                                this.moveToPosByDis(value, this._gravityItem[i], $dis)
                            }
           
                        }
                    }
                }
            } 
        }
        public getNextTo(selfPos: Vector3D): GravityVo {

            var $to: GravityVo;
            var $minDis: number;
            for (var i: number = 0; this._gravityItem && i < this._gravityItem.length; i++) {
                if (this._gravityItem[i].type == 2 && this._gravityItem[i].y <selfPos.y-100) {
                    var $dis: number = Display3D.distance(selfPos, this._gravityItem[i])
                    if (!$to || $minDis > $dis) {
                        $to = this._gravityItem[i]
                        $minDis = $dis
                    }
                }
            }
            return $to
        }
        private lastvelocityLen: number
        private lastPos: Vector3D
        private nextGravityVo: GravityVo

        private getNextToVo($v3d: Vector3D): GravityVo {
            var $vo: GravityVo;
            var minh: number
            for (var i: number = 0; this._gravityItem && i < this._gravityItem.length; i++) {
                var disk: number = $v3d.y - this._gravityItem[i].y
                if (this._gravityItem[i].type == 2 && disk > 0) {
                    if (isNaN(minh)) {
                        $vo = this._gravityItem[i]
                        minh = disk
                    } else {
                        if (minh > disk) {
                            $vo = this._gravityItem[i]
                            minh = disk
                        }
                    }
                }
            }
            return $vo
        }
    }

}