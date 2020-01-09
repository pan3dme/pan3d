module special {

    import BaseProcessor = Pan3d.BaseProcessor
    import BaseEvent = Pan3d.BaseEvent
    import Module = Pan3d.Module
    import Processor = Pan3d.Processor
    import UIManager = Pan3d.UIManager;
    import Vector3D = Pan3d.Vector3D
    import TimeUtil = Pan3d.TimeUtil
    import Scene_data = Pan3d.Scene_data
    import ModuleEventManager = Pan3d.ModuleEventManager

    import SceneEvent = game.SceneEvent
    import GameDataModel = game.GameDataModel
    import GameLevelManeger = game.GameLevelManeger

    import PandaMeshData=rightpanda.PandaMeshData
    import TopMenuEvent = topmenu.TopMenuEvent


    export class SpecialEvent extends BaseEvent {
        public static SHOW_SPECIAL_PANEL: string = "SHOW_SPECIAL_PANEL";
        public static SHOW_SPECIAL_FAIL_PANEL: string = "SHOW_SPECIAL_FAIL_PANEL";
        public static HIDE_SPECIAL_PANEL: string = "HIDE_SPECIAL_PANEL";
        public static SELECT_SPECIAL_LEVEL: string = "SELECT_SPECIAL_LEVEL";
    }
    export class SpecialModule extends Module {
        public getModuleName(): string {
            return "SpecialModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new SpecialProcessor()
            ];
        }
    }
    export class SpecialProcessor extends BaseProcessor {
        public getName(): string {
            return "SpecialProcessor";
        }

        private selectSpecialMeshVo: SpecialMeshVo
        protected receivedModuleEvent($event: BaseEvent): void {



            switch ($event.type) {
                case SpecialEvent.SHOW_SPECIAL_PANEL:
                    if (!this._invitationPanel) {
                        this._invitationPanel = new SpecialPanel()
                    }
                    this._invitationPanel.showPanel();
                    break
                case SpecialEvent.HIDE_SPECIAL_PANEL:
                    if (this._invitationPanel) {
                        this._invitationPanel.hidePanel();
                    }
                    break
                case SpecialEvent.SHOW_SPECIAL_FAIL_PANEL:
                    GameData.sendFailToWeb(this.selectSpecialMeshVo.levelnum);
                    msgalert.AlertUtil.show("失败了，请继续进行", "提示", (value: any) => {
                        if (value == 1) {
                            GameData.dispatchEvent(new SpecialEvent(SpecialEvent.SELECT_SPECIAL_LEVEL), this.selectSpecialMeshVo)
                        } else {
                            GameData.dispatchToLevel(GameDataModel.levelNum)
                        }
                        
                    }, 2)
                    break
                case SpecialEvent.SELECT_SPECIAL_LEVEL:
                    if (GameLevelManeger.getInstance().canUseLoaderLoad) {
                        if ($event.data) {
                            this.selectSpecialMeshVo = $event.data;
                        }
                        GameData.gameType = 5;
                        if (!this._specialLevelTopPanel) {
                            this._specialLevelTopPanel = new SpecialLevelTopPanel();
                        }
                        this._specialLevelTopPanel.rankeList = this.selectSpecialMeshVo.ranklist;
                        this._specialLevelTopPanel.showPanel();

                        //GameDataModel.changeSceneColor(this.selectSpecialMeshVo.colorid);
                        GameLevelManeger.getInstance().initXmlModel(this.selectSpecialMeshVo.mapname, () => {
                            console.log("场景加载完成准备开始游戏")
                        });
                        var $tittlename: string = "";
                        if (this.selectSpecialMeshVo.name.length > 0) {
                            $tittlename = this.selectSpecialMeshVo.name;
                        } else {
                            $tittlename = String(this.selectSpecialMeshVo.levelnum);
                        }
                        GameData.dispatchEvent(new TopMenuEvent(TopMenuEvent.SET_TOP_TITTLE_TXT), Pan3d.ColorType.Whiteffffff + $tittlename);
                    } else {
                        console.log("上个场景还没加载完");
                    }
                    break
                case SceneEvent.SELECT_SCENE_LEVEL:

                    if (this._specialLevelTopPanel) {
                        this._specialLevelTopPanel.hiedPanel();
                    }

                    break
                case SceneEvent.INIT_SCENE_CONFIG:
                   
                    break
              
                case leveluppan.LevelUpEvent.SHOW_LEVEL_UP_PANEL:
                    if (GameData.gameType == 5) {
                        this.showFinishEfict()
                        TimeUtil.addTimeOut(1500, () => {
                            msgalert.AlertUtil.show("恭喜你完成了" + this.selectSpecialMeshVo.name + "\n自动返回关卡模式", "提示", (value: any) => {
                                GameData.dispatchToLevel(GameDataModel.levelNum)
                                ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL));
                                ModuleEventManager.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.SHOW_SPECIAL_PANEL));
                            }, 2)
                        })

                        this.sendFinishTmToWeb(this.selectSpecialMeshVo.levelnum)
                    }
                    break
                default:
                    break
            }

        }
    
        private _dayStr: string;
        private lookAtFinishVideoTm : number=0
 
  
        private sendFinishTmToWeb($level: number): void {
            var $specialdata: any = GameData.getStorageSync(SpecialPanel.SPECIAL_DATA_SYNC_STR);
            if (!$specialdata) {
                $specialdata = {}
            }
            if (!$specialdata[$level]) {
                $specialdata[$level] = {}
            }
            if (!$specialdata[$level].ispass) {
                console.log("记录今天有完成")
                $specialdata[$level].ispass = true;
                var specialLeveladd: any = GameData.getEveryDataSyncByName("specialLeveladd");
                specialLeveladd.num += 1
                GameData.setEveryDataSyncByName("specialLeveladd", specialLeveladd.num);

            }
            GameData.setStorageSync(SpecialPanel.SPECIAL_DATA_SYNC_STR, $specialdata);
            var useTim: number = TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
            var $postStr: string = "";
            $postStr += "level=" + $level
            $postStr += "&openid=" + GameData.getStorageSync("openid");
            $postStr += "&time=" + useTim;
            if (GameData.isOtherPlay()) {
                if (GameData.userInfo && GameData.userInfo.nickName) {
                    $postStr += "&info=" + GameData.userInfo.nickName 
                } else {
                    $postStr += "&info=" + "没名";
                }
                GameData.WEB_SEVER_EVENT_AND_BACK("add_success", $postStr, (res: any) => {

                    console.log("add_success",res)
                })
            }

            
        }
        private showFinishEfict(): void {

            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.SHOW_SPECIAL_EFFECT), { pos: GameDataModel.centenBall.getPostionV3d(), name: "levelup" })

            game.GameSoundManager.getInstance().playSoundByName(Pan3d.Scene_data.fileRoot + "sound/" + "pass" + ".mp3");
        }
        private _specialLevelTopPanel: SpecialLevelTopPanel
        private _invitationPanel: SpecialPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new SpecialEvent(SpecialEvent.SHOW_SPECIAL_PANEL),
                new SpecialEvent(SpecialEvent.HIDE_SPECIAL_PANEL),
                new SpecialEvent(SpecialEvent.SHOW_SPECIAL_FAIL_PANEL),
                new SpecialEvent(SpecialEvent.SELECT_SPECIAL_LEVEL),
                new SceneEvent(SceneEvent.SELECT_SCENE_LEVEL),
                new SceneEvent(SceneEvent.INIT_SCENE_CONFIG),
                new leveluppan.LevelUpEvent(leveluppan.LevelUpEvent.SHOW_LEVEL_UP_PANEL),
            ];
        }
    }
}