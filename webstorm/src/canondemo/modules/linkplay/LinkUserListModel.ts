module linkplay {


    import Display3D = Pan3d.Display3D;
    import Vector3D = Pan3d.Vector3D;
    import ResManager = Pan3d.ResManager;
    import CollisionItemVo = Pan3d.CollisionItemVo;
    import BaseRes = Pan3d.BaseRes;
    import TimeUtil = Pan3d.TimeUtil;
    import SceneManager = Pan3d.SceneManager

    import GameDataModel = game.GameDataModel
    import GameSoundManager = game.GameSoundManager


    export class MoveInfoVo {
        public type: number = 100  //消息号
        public tm: number

        public bodyfouce: Vector3D
        public position: Vector3D
        public velocity: Vector3D
        public quaternion: Vector3D
        public angularVelocity: Vector3D

        public getSring(): string {
            var obj: any = {}
            obj.type = this.type;
            obj.tm = this.tm
            obj.position = this.position;
            obj.velocity = this.velocity;
            obj.quaternion = this.quaternion;
            obj.angularVelocity = this.angularVelocity;
            obj.bodyfouce = this.bodyfouce;
            return JSON.stringify(obj)
        }
        public meshObj(obj: any): void {
            this.type = obj.type;
            this.tm = obj.tm;
            this.position = new Vector3D(obj.position.x, obj.position.y, obj.position.z);
            this.quaternion = new Vector3D(obj.quaternion.x, obj.quaternion.y, obj.quaternion.z, obj.quaternion.w);
            this.velocity = new Vector3D(obj.velocity.x, obj.velocity.y, obj.velocity.z);
            this.angularVelocity = new Vector3D(obj.angularVelocity.x, obj.angularVelocity.y, obj.angularVelocity.z);
            this.bodyfouce = new Vector3D(obj.bodyfouce.x, obj.bodyfouce.y, obj.bodyfouce.z);
        }
    }

    export class LinkUserListModel {

        private static _instance: LinkUserListModel;
        public static getInstance(): LinkUserListModel {
            if (!LinkUserListModel._instance) {
                LinkUserListModel._instance = new LinkUserListModel();
            }
            return LinkUserListModel._instance;
        }
        private _scene: SceneManager;

        public makeUserListBall(): void {
            this._scene = GameDataModel.scene;

            GameDataModel.centenBall.destory()
            GameDataModel.centenBall = null
            for (var i: number = 0; i < MsEngine.getInstance().roomUserInfoList.length; i++) {
                var $balldis: LinkPlayCanonPrefabSprite = LinkPlayCanonPrefabSprite.addMoveOhterUser(12, this._scene)
                $balldis.roomUserVo = MsEngine.getInstance().roomUserInfoList[i];

                $balldis.x = 0;
                $balldis.z = 0;
                $balldis.y = 15;
                if ($balldis.roomUserVo.pos) {
                    $balldis.x = $balldis.roomUserVo.pos.x
                    $balldis.y = $balldis.roomUserVo.pos.y
                    $balldis.z = $balldis.roomUserVo.pos.z
                }
                $balldis.resetParticlePos()
                console.log($balldis.roomUserVo.msRoomUserInfo.userProfile)
                var skinType: number = JSON.parse($balldis.roomUserVo.msRoomUserInfo.userProfile).skinType
                $balldis.changeSkinById(skinType)
                $balldis.roomUserVo.dis = $balldis

                //var selfBall: LinkPlayCanonPrefabSprite = LinkPlayCanonPrefabSprite.addMoveOhterUser(12, this._scene)
                //GameDataModel.centenBall = selfBall
                //GameDataModel.centenBall.y = 20
                //GameDataModel.centenBall.changeSkinById(GameData.getStorageSyncNumber("skinType"))
                //GameDataModel.centenBall.body.collisionFilterMask = GameDataModel.GROUP1 | GameDataModel.GROUP2 | GameDataModel.GROUP3;
                if ($balldis.roomUserVo.msRoomUserInfo.userID == MsEngine.getInstance().msRegistRsp.userID) {
                    GameDataModel.centenBall = $balldis
                    this.addCentenBallEvent()
                }


            }
        }
        private addCentenBallEvent(): void {
            GameDataModel.centenBall.body.addEventListener("collide", (evt: any) => {
                var $body: CANNON.Body = evt.body
             
                if ($body) {
                    if ($body.type == 1) {
                        console.log("碰到其它球，发送坐标")
                       // this.sendMoveToSocket()
                        this.lastSendTm = TimeUtil.getTimer() +10//这里只是用于测试
                    }
                    var $pos: Vector3D = GameDataModel.centenBall.getPostionV3d()
                    if (this.lastMainBodyHitV3d) {
                        var $dis: number = Vector3D.distance(this.lastMainBodyHitV3d, $pos);
                        if ($dis > 10 || Math.abs(this.lastMainBodyHitV3d.y - $pos.y) > 5) {
                            var velocity: Vector3D = new Vector3D(GameDataModel.centenBall.body.velocity.x, GameDataModel.centenBall.body.velocity.y, GameDataModel.centenBall.body.velocity.z);
                            var $vspeed: number = Math.sqrt(velocity.dot(velocity));
                            if ($vspeed > 5) {
                                GameSoundManager.getInstance().collidehit();
                            }
                        }
                    }
                    this.lastMainBodyHitV3d = $pos
                }
            })

           
        }
        private lastMainBodyHitV3d: Vector3D
        private removeCentenBallEvent(): void {
            GameDataModel.centenBall.body.removeEventListener("collide", (evt: any) => { })
        }

        public lastSendTm: number = 0
        public sendMoveToSocket(): void {
            var $ball: LinkPlayCanonPrefabSprite = <LinkPlayCanonPrefabSprite>GameDataModel.centenBall;
            if ($ball.beginGravityVo) {
                //当前正在下落就不再发送请求了
                return; 
            }
            var vo: MoveInfoVo = new MoveInfoVo
            vo.type = 100 
            vo.tm = TimeUtil.getTimer() - GameDataModel.levelStartTm;
            vo.bodyfouce = $ball.bodyfouce;
            var $body: CANNON.Body = $ball.body
            vo.velocity = new Vector3D($body.velocity.x, $body.velocity.y, $body.velocity.z);
            vo.position = new Vector3D($body.position.x, $body.position.y, $body.position.z);
            vo.angularVelocity = new Vector3D($body.angularVelocity.x, $body.angularVelocity.y, $body.angularVelocity.z);
            vo.quaternion = new Vector3D($body.quaternion.x, $body.quaternion.y, $body.quaternion.z, $body.quaternion.w);
            MsEngine.getInstance().sendEventJason(JSON.stringify({ type: 100, data: vo.getSring() }));
            this.lastSendTm = TimeUtil.getTimer() + 1000
        }
        public clearUser(): void {
            while (MsEngine.getInstance().roomUserInfoList.length) {
                var $dis: RoomUserVo = MsEngine.getInstance().roomUserInfoList.pop()
                $dis.dis.destory()
            }
            GameDataModel.centenBall = null;

        }
        public setEventNotyfy(value: MsSendEventNotify): void {
            var ddd: any = JSON.parse(value.cpProto)
            switch (ddd.type) {
                case 100:
                    var vo: MoveInfoVo = new MoveInfoVo()
                    vo.meshObj(JSON.parse(ddd.data));
                    var eeee: RoomUserVo = MsEngine.getInstance().getUserByuserId(value.srcUserID)
                    eeee.dis.pushVO(vo);

                    var $selfTm: number = TimeUtil.getTimer() - GameDataModel.levelStartTm  //我的时间
                    if ($selfTm < vo.tm) {//如果我的时间小于对方发出来之后的时间，说明我需要调整整
                        console.log("时间同步并进行调整调整了", vo.tm - $selfTm - 15, "毫秒");
                        GameDataModel.levelStartTm = TimeUtil.getTimer() - vo.tm - 15//设定了一个15的网络延时
                    }
                    break
                case 2:
                    var $vo: RoomUserVo = MsEngine.getInstance().getUserByuserId(value.srcUserId)
                    $vo.ready = ddd.current == 1;
                    Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayEvent(linkplay.LinkPlayEvent.MS_LEAVE_ROOM_NOTIFY_EVENT))
                    break
                case 3:

                    console.log("更新坐标信息")

                    this.meshFristPos(ddd.data);

                    break
                case 4:
                    var eeee: RoomUserVo = MsEngine.getInstance().getUserByuserId(value.srcUserID)
                    var bpos: Vector3D = new Vector3D(ddd.pos.x, ddd.pos.y, ddd.pos.z)

                    var ball: LinkPlayCanonPrefabSprite = eeee.dis
                    ball.moveInfoVoItem.length=0
                    ball.body.sleep()
                    ball.aotuFallDownTm = TimeUtil.getTimer();
                    ball.beginGravityVo = LinkPlayGravityManager.getInstance().getBeing(bpos)
                    ball.endGravityVo = LinkPlayGravityManager.getInstance().getNextTo(bpos)

                    break
                case 5:
                    var soundUrl: string = ddd.data
                    console.log("播放声音", soundUrl)

                    game.GameSoundManager.getInstance().playSoundByName(soundUrl)
                    break
                default:
                    console.log("无信息分支", value)
                    break
            }


        }
        private meshFristPos(arr: Array<any>): void {

            for (var i: number = 0; i < arr.length; i++) {
                var $data: any = arr[i]
                var vo: RoomUserVo = MsEngine.getInstance().getUserByuserId($data.userID);
                vo.pos = new Vector3D($data.pos.x, $data.pos.y, $data.pos.z);
                if (vo.dis) {
                    vo.dis.x = vo.pos.x
                    vo.dis.y = vo.pos.y
                    vo.dis.z = vo.pos.z
                }

            }
        }
  
      

    }

}