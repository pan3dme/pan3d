module game {
    import CannoSceneManager = game.GameSceneManager;
    import GameLevelManeger = game.GameLevelManeger;
    import AotuGravityManager = game.GameGravityManager;
    import CannoSoundManager = game.GameSoundManager;
    import GameDataModel = game.GameDataModel;
    import ModuleEventManager = Pan3d.ModuleEventManager;
    import LoadManager = Pan3d.LoadManager;
    import Vector3D = Pan3d.Vector3D;
    import TimeUtil = Pan3d.TimeUtil;
    import Scene_data = Pan3d.Scene_data;
    import Physics = canonkey.Physics;

    export class CannonGameStart {
        public static changeFunUrlLocal($bfun: Function): void {
            let Pan3d_LoadManager_load = Pan3d.LoadManager.prototype.load;
            Pan3d.LoadManager.prototype.load = function ($url: string, $type: string, $fun: Function, $info: any = null, $progressFun: Function = null): void {
                $url = GameData.getLoadFileIsLocalUrl($url);
                Pan3d_LoadManager_load.call(this, $url, $type, $fun, $info, $progressFun);
            }
            Pan3d.BaseRes.prototype.readImgLow = function (): void {
                this.imgNum = this._byte.readInt();
                this.imgLoadNum = 0;
                var time: number = TimeUtil.getTimer();
                var bytes: number = 0;
                for (var i: number = 0; i < this.imgNum; i++) {
                    var url: string = Scene_data.fileRoot + this._byte.readUTF();
                    var imgSize: number = this._byte.readInt();
                    bytes += imgSize;
                    Pan3d.LoadManager.getInstance().load(url, Pan3d.LoadManager.IMG_TYPE,
                        ($img: any) => {
                            this.loadImg($img);
                        });

                }
                this.allImgBytes = bytes;
            }


            console.log("GameData.version", GameData.version)

            GameData.getSeverTime();//同步服务器时间

            Scene_data.fileRoot = "res/"
            console.log("那就本地配置")
            CannonGameStart.loadWebConfigInfo($bfun, Scene_data.fileRoot + "serverinfo.json")



        }
        private static loadWebConfigInfo($bfun: Function, $url: string): void {
            LoadManager.getInstance().load($url, LoadManager.XML_TYPE,
                ($str: string) => {
                    var obj: any = JSON.parse($str);
                    GameData.severinfo = new VesionInfo();
                    GameData.severinfo.meshObj(obj);
                    GameData.maxLevel = GameData.severinfo.level;
                    GameData.changeLocalUrlByArr(obj.localfile); //设置本地资源
                    $bfun();
                });


        }


        public static initData($scene: layapan.LayaOverride2dSceneManager): void {

            ModuleList.startup();//启动所有模块
            Scene_data.supportBlob = false;
            game.GameDataModel.initData($scene);
            var $gameBgSprite: cannondis.GameBgSprite = new cannondis.GameBgSprite();
            $gameBgSprite._scene = GameDataModel.scene;
            GameDataModel.scene.addDisplay($gameBgSprite);

            this.loadDiamondsConfig();



        }

        private static loadDiamondsConfig(): void {
            GameData.initGameGetAllSync(() => {
                LoadManager.getInstance().load(Scene_data.fileRoot + "diamondsconfig.txt", LoadManager.XML_TYPE,
                    ($data: string) => {
                        GameData.diamondsconfigRes = JSON.parse($data);
                        this.starInGame();
                    });
            });
        }
        private static meshWxQuery(): void {

            if (GameData.onLaunchRes) {
                var query: any = GameData.onLaunchRes.query
                if (GameData.onLaunchRes.scene == 1104) {
                    console.log("从我的小程序进来的")
                    GameData.setStorageSync("scene1104", true);
                }
                if (query && query.type) {
                    switch (query.type) {
                        case "only_share":
                            if (GameData.getStorageSync("openid") != query.openid) {
                                var $postStr: string = "";
                                $postStr += "from_openid=" + query.openid; //别人的
                                $postStr += "&openid=" + GameData.getStorageSync("openid") //自己的
                                if (query.tm && (GameData.getSeverTime() - query.tm) > 0) {
                                    var $useTim: number = GameData.getSeverTime() - query.tm
                                    $postStr += "&info=" + GameData.onLaunchRes.scene + "_" + TimeUtil.getDiffTime1(Math.floor($useTim / 1000));
                                } else {
                                    $postStr += "&info=" + GameData.onLaunchRes.scene;
                                }

                                $postStr += "&type=" + Number(query.sharetype);
                                GameData.WEB_SEVER_EVENT_AND_BACK("add_advertise", $postStr, (res: any) => { })
                            }
                            break
                        default:
                            console.log("对应类型还没处理好");
                            break
                    }
                }
            }


        }

        private static starInGame(): void {
            //GameData.wxQuery = {}
            //GameData.wxQuery.type = "call_help"
            //GameData.wxQuery.nickName = "1"
            //GameData.wxQuery.avatarUrl = "1"
            //GameData.wxQuery.openid = "1"
            //GameData.wxQuery.level = 1
            GameData.intervalLoginTm = 0; 
            GameData.getSeverTime(() => {
                var $lastTime: number = GameData.getStorageSyncNumber("lasttime");
                if ($lastTime > 0) {
                    GameData.intervalLoginTm = Math.max(Math.floor((GameData.getSeverTime() - $lastTime) / 1000),0)
                    if (GameData.getStorageSyncNumber("loginnum") >= GameData.severinfo.resetlevel.loginnum || GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) >= GameData.severinfo.resetlevel.minlevel ) { //重置关卡
                        // 大于登入次数， 大于最小等级
                        console.log("离上一次间隔时间", GameData.intervalLoginTm, "秒")
                        if (GameData.intervalLoginTm > GameData.severinfo.resetlevel.resettm) {
                            GameData.setStorageSync("gameLevel", 1);
                            this.iSresetLevel = true;
                        }
                    }
                    GameData.setStorageSync("lasttime", GameData.getSeverTime());
               
           
                }


                var $time: Date = new Date(GameData.getSeverTime());
 
                if (($time.getDay() == 6 || $time.getDay() == 0) && GameData.severinfo.aoutSharemode) {
                    GameData.severinfo.adshareModel = 2//如果是周末就限制改为分享模式
                }


                var $startLevelNum: number = GameData.getStorageSyncNumber("gameLevel")
                if (this.getWindowUrlParam() > 0) {
                    $startLevelNum = this.getWindowUrlParam();
                }
                this.meshWxQuery();
                $startLevelNum = Math.max(1, $startLevelNum);
                GameDataModel.levelNum = $startLevelNum;
                Pan3d.ProgrmaManager.getInstance().registe(Pan3d.LineDisplayShader.LineShader, new Pan3d.LineDisplayShader);
                ModuleEventManager.dispatchEvent(new SceneEvent(SceneEvent.INIT_SCENE_CONFIG));

            })




        }
 
        public static iSresetLevel: boolean
        public static getWindowUrlParam(): number {
            if (getUrlParam("id")) {
                return Number(getUrlParam("id"))
            } else {
                return 0
            }
        }
        private static addBaseSprite(): void {
            var $dis: test.TestDisplaySprite = new test.TestDisplaySprite();
            $dis.z = -50
            $dis.y = 0
            GameDataModel.scene.addDisplay($dis);
        }

        public static upFrame(): void {
            if (GameData.gameType == 1 || GameData.gameType == 2 || GameData.gameType == 5) {


                if (Physics.world && Physics.world.bodies) {
                    //   console.log(Physics.world.bodies.length)

                }




                if (GameData.hasWinPanel) {
                    GameDataModel.lastMainHitTm = TimeUtil.getTimer() //这是为了更新最后的碰到，
                    return
                }
                Physics.ready = false;
                if (Physics.ready) {

                    this.testIsLost();
                    Physics.update();
                    CannoSoundManager.getInstance().upFrame();
                  AotuGravityManager.getInstance().upFrame(GameDataModel.centenBall);
                    GameDataModel.focus3d.y = GameDataModel.centenBall.y;

                    if (GameDataModel.centenBall && GameDataModel.centenBall.body) {

                        while (this.lastPos.length > 3) {
                            this.lastPos.shift();
                        }
                        if (GameData.isHitColone) {
                            if (this.bVector3D) {
                                if (this.skipNum++ > 2) {
                                    GameData.isHitColone = false
                                    var caVector3D: Vector3D = GameDataModel.centenBall.getPostionV3d()
                                    var ang: number = this.acccc(this.aVector3D, this.bVector3D, caVector3D)
                                    var $can: boolean = Vector3D.distance(this.aVector3D, this.bVector3D) > 1
                                    var isHight: boolean = Math.abs(this.bVector3D.y - caVector3D.y) > 2
                                    this.aVector3D = null
                                    this.bVector3D = null
                                    if ((ang < 140 && $can) || isHight) {
                                        GameSoundManager.getInstance().collidehit();
                                    }
                                }
                            } else {
                                this.aVector3D = this.lastPos[0]
                                this.bVector3D = GameDataModel.centenBall.getPostionV3d()
                                this.skipNum = 0
                            }


                        } else {
                            this.lastPos.push(GameDataModel.centenBall.getPostionV3d())
                        }


                    }
                }
            }


        }
        private static lastPos: Array<Vector3D> = []
        private static skipNum: number = 0
        private static acccc($A: Vector3D, $o: Vector3D, $B: Vector3D): number {

            var a: Vector3D = $A.subtract($o);
            var b: Vector3D = $B.subtract($o);
            a.normalize();
            b.normalize();

            return (Math.acos(a.dot(b)) * 180 / Math.PI);
        }
        private static aVector3D: Vector3D
        private static bVector3D: Vector3D


        private static kkkkk: number = 0
        private static testIsLost(): void {
            if (!GameDataModel.isLevelFinish && GameDataModel.centenBall) {
                var $body: CANNON.Body = GameDataModel.centenBall.body;
                var $pos: Vector3D = GameDataModel.centenBall.getPostionV3d()
                var $isHitSound: boolean = false

                for (var i: number = 0; i < Physics.world.contacts.length; i++) {
                    var $vo: CANNON.ContactEquation = Physics.world.contacts[i];
                    if ($vo.bi == $body || $vo.bj == $body) {
                        GameDataModel.lastMainHitTm = TimeUtil.getTimer()
                        GameDataModel.lastMainHitVect = $pos
                    }
                }
                if (GameDataModel.centenBall.beginGravityVo) {
                    GameDataModel.lastMainHitTm = TimeUtil.getTimer()
                    GameDataModel.lastMainHitVect = $pos
                }
                var tm: number = TimeUtil.getTimer() - GameDataModel.lastMainHitTm
                var $lost: boolean = GameDataModel.lastMainHitVect && Vector3D.distance($pos, GameDataModel.lastMainHitVect) > 700

                $lost = GameDataModel.lastMainHitVect && Vector3D.distance($pos, GameDataModel.lastMainHitVect) > 400



                if (tm > 2000 || $lost) { //脱离物体1500毫秒算失败
                    Physics.ready = false;
                    GameDataModel.modelRotation.x = 0;
                    GameDataModel.modelRotation.z = 0;
                    game.GameSoundManager.getInstance().playSoundByName(Scene_data.fileRoot + "sound/" + "lost" + ".mp3")
                    GameSoundManager.getInstance().playHitSound(1);

                    ModuleEventManager.dispatchEvent(new resetplay.ResetPlayEvent(resetplay.ResetPlayEvent.SHOW_RESET_PLAY_PANEL));



                }
            }


        }
    }
}
