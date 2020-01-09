module linkplay {
    import Object3D = Pan3d.Object3D;
    import Display3D = Pan3d.Display3D;
    import TextJumpUiVo = Pan3d.TextJumpUiVo;
    import Vector3D = Pan3d.Vector3D;
    import TimeUtil = Pan3d.TimeUtil;
    import ModuleEventManager = Pan3d.ModuleEventManager;
    import CanonPrefabSprite = canonkey.CanonPrefabSprite


  
    export class LinkPlayGravityManager {
        private static _instance: LinkPlayGravityManager;
        public static getInstance(): LinkPlayGravityManager {
            if (!LinkPlayGravityManager._instance) {
                LinkPlayGravityManager._instance = new LinkPlayGravityManager();
            }
            return LinkPlayGravityManager._instance;
        }
        public clear(): void {
            this._gravityItem = new Array();
 
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
 
        public upFrame(ball: LinkPlayCanonPrefabSprite): void {
            if (!ball.beginGravityVo) {
                var selfPos: Vector3D = ball.getPostionV3d()
                for (var i: number = 0; this._gravityItem && i < this._gravityItem.length; i++) {
                    var $dis: number = Display3D.distance(selfPos, this._gravityItem[i])
                    if (this._gravityItem[i].type == 1) {
                        if ($dis < 12) {
                            ball.body.sleep()
                            ball.aotuFallDownTm = TimeUtil.getTimer();
                            ball.beginGravityVo = this._gravityItem[i];
                            ball.endGravityVo = this.getNextTo(selfPos);
                            MsEngine.getInstance().sendEventJason(JSON.stringify({ type: 4, pos: { x: selfPos.x, y: selfPos.y, z: selfPos.z } }));
                        }
                    }
                }
            }
        }
        public getBeing(selfPos: Vector3D): GravityVo {

            var $to: GravityVo;
            var $minDis: number;
            for (var i: number = 0; this._gravityItem && i < this._gravityItem.length; i++) {
                if (this._gravityItem[i].type == 1) {
                    var $dis: number = Display3D.distance(selfPos, this._gravityItem[i])
                    if (!$to || $minDis > $dis) {
                        $to = this._gravityItem[i]
                        $minDis = $dis
                    }
                }
            }
            return $to
        }
        public getNextTo(selfPos: Vector3D): GravityVo {

            var $to: GravityVo;
            var $minDis: number;
            for (var i: number = 0; this._gravityItem && i < this._gravityItem.length; i++) {
                if (this._gravityItem[i].type == 2) {
                    var $dis: number = Display3D.distance(selfPos, this._gravityItem[i])
                    if (!$to || $minDis > $dis) {
                        $to = this._gravityItem[i]
                        $minDis = $dis
                    }  
                }
            }
            return $to
        }

        private lastvelocityLen: number;
        private lastPos: Vector3D;
        private nextGravityVo: GravityVo;

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