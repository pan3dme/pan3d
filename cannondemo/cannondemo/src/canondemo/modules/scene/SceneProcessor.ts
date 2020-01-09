module game {
    import BaseProcessor = Pan3d.BaseProcessor
    import BaseEvent = Pan3d.BaseEvent
    import ModuleEventManager = Pan3d.ModuleEventManager
    import Vector3D = Pan3d.Vector3D
    import Physics = canonkey.Physics

    import GameLevelManeger = game.GameLevelManeger;
    import GameDataModel = game.GameDataModel;
    import GameSceneManager = game.GameSceneManager;



    export class SceneProcessor extends BaseProcessor {
        public getName(): string {
            return "SceneProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof SceneEvent) {
                this.meshSceneEvent($event)
            }
        }
        private initConfig(): void {
            GameDataModel.modelRotation = new Pan3d.Vector3D();
            GameDataModel.lastRotation = new Pan3d.Vector3D();
            GameLevelManeger.getInstance()._scene = GameDataModel.scene;
            GameLevelManeger.getInstance().initScene(new GameSceneManager(GameDataModel.scene))
            GameData.dispatchToLevel(GameDataModel.levelNum)

        }

        private lastLevelNum = 0;
        private wxOnShow(value: any): void {

            GameSoundManager.getInstance().resetAudio();

            if (GameData.onshowRes.scene == 1104) {
                console.log("从我的小程序进来的")
                GameData.setStorageSync("scene1104", true);
            }
        }

        private lastAllShareMeshVo: AllShareMeshVo
        private toshareEvet(value: AllShareMeshVo): void {
            if (this.lastAllShareMeshVo) {
                if (this.lastAllShareMeshVo.shareTm > Pan3d.TimeUtil.getTimer() - 3000) {
                    console.log("5秒前刚分享过，所以这次不会再发送事件")
                    return;
                }
            }
            this.lastAllShareMeshVo = value
            this.lastAllShareMeshVo.shareTm = Pan3d.TimeUtil.getTimer();
            var queryStr: string = "";
            queryStr += "type=" + "only_share";
            queryStr += "&openid=" + GameData.getStorageSync("openid");
            queryStr += "&sharetype=" + value.sharetype;
            GameData.WX_ON_SHARE_APP_MESSAGE("分享有礼", queryStr, (res: any) => {
            }, false)
            if (GameData.devicetypepc) {
                Pan3d.TimeUtil.addTimeOut(3000, () => {
                    this.shareMeshTime();
                })
            }

        }
        private shareMeshTime(): void {
            if (this.lastAllShareMeshVo) {
                var $waitTime = GameData.severinfo.sharetime[random(GameData.severinfo.sharetime.length)];
                if (Pan3d.TimeUtil.getTimer() > (this.lastAllShareMeshVo.shareTm + $waitTime)) {
                    if (Pan3d.TimeUtil.getTimer() > this.lastAllShareMeshVo.shareTm + 15 * 1000) {
                        console.log("超过15秒为无效");
                    } else {
                        console.log("分享成功--share=>id->", this.lastAllShareMeshVo.id)
                        this.lastAllShareMeshVo.bfun(1);
                        GameData.addShareToWeb(this.lastAllShareMeshVo.sharetype, this.lastAllShareMeshVo.id);
                    }
                } else {
                    console.log("分享不成功")
                    var $tipStr: string = this.getRandomShareTipstr()

                    if (GameData.severinfo.msgToast < Math.random() || GameData.devicetypepc) {
                        msgalert.OnlyTopTxt.show($tipStr)
                    } else {
                        GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_SHOW_TOAST_MSG), $tipStr) //系统提示
                    }
 
                    this.lastAllShareMeshVo.bfun(0);
                    AllShareMeshVo.shareSkipId = Math.max(0, AllShareMeshVo.shareSkipId - 1); //失败的话分享id减回去
                }
            }
        }
        private getRandomShareTipstr(): string {
            var $arr: Array<string> = new Array();
            $arr.push("没有分享成功");
            if (this.lastAllShareMeshVo.id > 2) {
                $arr.push("没有分享成功，请分享到聊天群");
                $arr.push("没分享成功，请换个好友试试");
                $arr.push("没分享成功，换个不同的群试试");
            }
            return $arr[random($arr.length)]
        }
        private meshSceneEvent(evt: SceneEvent): void {
            switch (evt.type) {
                case SceneEvent.INIT_SCENE_CONFIG:
                    this.initConfig();
                   // ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL));
                    ModuleEventManager.dispatchEvent(new topstart.TopStartEvent(topstart.TopStartEvent.SHOW_TOP_START_PANEL));

                    break
                case SceneEvent.SHOW_SPECIAL_EFFECT:
                    this.showSpecialEffect(evt.data)
                    break
                case SceneEvent.WX_LOOK_VIDEO_VD_EVENT:
                    if (GameData.devicetypepc) {

                        Pan3d.TimeUtil.addTimeOut(1000, () => {
                            evt.data && evt.data(1)
                            console.log("视屏看完")
                        })
                 
                    }
                    break
                case SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT:
                    this.toshareEvet(evt.data)
                    break
                case SceneEvent.WX_ON_SHOW:
                    console.log("WX_ON_SHOW_scene")
                    this.wxOnShow(evt.data);
                    this.shareMeshTime();
                    break
            
                case SceneEvent.SELECT_SCENE_LEVEL:
             
                    if (GameLevelManeger.getInstance().canUseLoaderLoad) {
                        if (this.lastLevelNum != evt.levelNum) {
                     
                            this.lastLevelNum = evt.levelNum;
                        }
                        GameDataModel.levelNum = Math.min(GameData.maxLevel, evt.levelNum);
                        var $mapUrl: string = ""
                        var isEasy: boolean = true;
                        $mapUrl = String(1000 + GameDataModel.levelNum)
                        GameLevelManeger.getInstance().initXmlModel($mapUrl, () => {
                            for (var i: number = 1; i < 10; i++) {
                                if (GameDataModel.levelNum + i < GameData.maxLevel) {
                                    GameLevelManeger.getInstance().loadNextSceneData(String(1000 + GameDataModel.levelNum + i));
                                }
                            }
                        });
                        GameData.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.SET_TOP_TITTLE_TXT), Pan3d.ColorType.Whiteffffff + "第 " + GameDataModel.levelNum+" 关")
                        ModuleEventManager.dispatchEvent(new SceneEvent(SceneEvent.WX_GET_FRIEND_CLOUD_STORAGE)); //选择关卡后，将本关最佳成绩的好友显示到纹理上
                    }
                    break
                default:
                    break;
            }
        }



        private showSpecialEffect(value: any): void {
            var $v3d: Vector3D = value.pos;
            var $name: string = value.name;
            if (Scene_data.supportBlob) {
                $name = $name.replace("_lyf", "");
                this.playLyf("model/" + $name + "_lyf.txt", $v3d);
            } else {
                this.playLyf("model/" + $name + "_base.txt", $v3d);
            }
        }
        private playLyf($url: string, $pos: Pan3d.Vector3D, $r: number = 0): void {
            let $scene = GameDataModel.scene;
            $scene.groupDataManager.scene = $scene;
            $scene.groupDataManager.getGroupData(Pan3d.Scene_data.fileRoot + $url, (groupRes: Pan3d.GroupRes) => {
                for (var i: number = 0; i < groupRes.dataAry.length; i++) {
                    var item: Pan3d.GroupItem = groupRes.dataAry[i];
                    if (item.types == Pan3d.BaseRes.SCENE_PARTICLE_TYPE) {
                        var $particle: Pan3d.CombineParticle = $scene.particleManager.getParticleByte(Pan3d.Scene_data.fileRoot + item.particleUrl);
                        $particle.x = $pos.x;
                        $particle.y = $pos.y;
                        $particle.z = $pos.z;
                        $particle.scaleX = 3;
                        $particle.scaleY = 3;
                        $particle.scaleZ = 3;
                        $particle.rotationY = $r;
                        $scene.particleManager.addParticle($particle);
                        $particle.addEventListener(Pan3d.BaseEvent.COMPLETE, this.onPlayCom, this);
                    } else {
                        console.log("播放的不是单纯特效");
                    }
                }
            })
        }
        private onPlayCom(value: Pan3d.BaseEvent): void {
            let $scene = GameDataModel.scene;
            $scene.particleManager.removeParticle(<Pan3d.CombineParticle>(value.target));
        }
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new SceneEvent(SceneEvent.SELECT_SCENE_LEVEL),
                new SceneEvent(SceneEvent.INIT_SCENE_CONFIG),
                new SceneEvent(SceneEvent.SHOW_SPECIAL_EFFECT),
                new SceneEvent(SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT),
                new SceneEvent(SceneEvent.WX_ON_SHOW),
                new SceneEvent(SceneEvent.WX_LOOK_VIDEO_VD_EVENT),
                
 
   
            ];
        }


    }
}