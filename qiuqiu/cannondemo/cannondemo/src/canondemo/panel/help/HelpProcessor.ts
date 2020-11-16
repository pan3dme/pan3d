module help {

    import BaseProcessor = Pan3d.BaseProcessor
    import BaseEvent = Pan3d.BaseEvent
    import Module = Pan3d.Module
    import Processor = Pan3d.Processor
    import UIManager = Pan3d.UIManager;
    import Vector3D = Pan3d.Vector3D
    import TimeUtil = Pan3d.TimeUtil
    import Scene_data = Pan3d.Scene_data
    import ModuleEventManager = Pan3d.ModuleEventManager

    import GameDataModel = game.GameDataModel
    import SceneEvent = game.SceneEvent
    import PandaMeshData = rightpanda.PandaMeshData


    export class HelpEvent extends BaseEvent {
        public static SHOW_HELP_LIST_PANEL: string = "SHOW_HELP_LIST_PANEL";
        public static HIDE_HELP_LIST_PANEL: string = "HIDE_HELP_LIST_PANEL";
        public static SHOW_HELP_ME_PANEL: string = "SHOW_HELP_SPEED_PANEL";
        public static SHOW_HELP_OTHER_PANEL: string = "SHOW_HELP_OTHER_PANEL";
        public static CHECK_SELF_HELP_INFO: string = "CHECK_SELF_HELP_INFO";



    }
    export class HelpModule extends Module {
        public getModuleName(): string {
            return "HelpModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new HelpProcessor()
            ];
        }
    }
    export class HelpProcessor extends BaseProcessor {
        public getName(): string {
            return "HelpProcessor";
        }
        public constructor() {
            super()

             
        }
        private check_self_help_info(): void {
            GameData.WEB_SEVER_EVENT_AND_BACK("get_help_info", "openid=" + GameData.getStorageSync("openid") , (res: any) => {
                if (res && res.data && res.data.success) {
                    if (res.data.info) {
                        var $vo: HelpOtherVo = new HelpOtherVo();
                        $vo.meshObj(res.data.info)
                        if ($vo.state == 1) {
                            console.log("有人帮助了我,每10秒检测试一下有没有帮助成功", $vo);
                            TimeUtil.addTimeOut(1000 * 10, () => { this.check_self_help_info() })
                            rightpanda.PandaMeshData.showCentenTxtInfoType(rightpanda.PandaMeshData.key101, Pan3d.ColorType.Black000000 + "正在求助通过第 " + Pan3d.ColorType.Redff0000 + $vo.level + Pan3d.ColorType.Black000000 + " 关", () => {
                                msgalert.AlertUtil.show("是否取消求助", "提示", (value: any) => {
                                    if (value == 1) {
                                        GameData.WEB_SEVER_EVENT_AND_BACK("check_help_info", "openid=" + GameData.getStorageSync("openid"))
                                    } else {
                                        this.check_self_help_info();
                                    }
                                }, 2)
                            })
                        }
                        if ($vo.state == 2) {
                            PandaMeshData.showRightPanda(PandaMeshData.key2, $vo.helpAvatarUrl, () => {
                                GameData.dispatchEvent(new HelpEvent(HelpEvent.SHOW_HELP_ME_PANEL), $vo);
                            })
                            rightpanda.PandaMeshData.hideCentenTxtInfoType2(rightpanda.PandaMeshData.key101)
                        } 
                    } 
                } else {
                    TimeUtil.addTimeOut(1000 * 10, () => { this.check_self_help_info() })
                }
            })
        }
     
        private _helpCallPanel: HelpListPanelView
        private _helpSpeedPanel: OtherHelpMePanel
        protected receivedModuleEvent($event: BaseEvent): void {
            switch ($event.type) {
                case HelpEvent.SHOW_HELP_LIST_PANEL:
                    var $postStr: string = "";
                    $postStr += "level=" + GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL);
                    $postStr += "&openid=" + GameData.getStorageSync("openid")
                    GameData.WEB_SEVER_EVENT_AND_BACK("find_random_help_list", $postStr, (res: any) => {
                        if (res && res.data && res.data.list && res.data.list.length) {
                            if (!this._helpCallPanel) {
                                this._helpCallPanel = new HelpListPanelView();
                            }
                            this._helpCallPanel.showPanel();
                            this._helpCallPanel.refrishData(res.data.list);
                        } else {
                            msgalert.AlertUtil.show("没有需要帮助的人")
                        }
                    })
                    break
                case HelpEvent.HIDE_HELP_LIST_PANEL:
                    if (this._helpCallPanel) {
                        this._helpCallPanel.hidePanel();
                    }
                    break
                case HelpEvent.CHECK_SELF_HELP_INFO:
                    TimeUtil.addTimeOut(1000 * 1, () => { this.check_self_help_info() })
                
                    break
                case HelpEvent.SHOW_HELP_ME_PANEL:
                    if (!this._helpSpeedPanel) {
                        this._helpSpeedPanel = new OtherHelpMePanel();
                    } 
                    this._helpSpeedPanel.showPanel();
                    this._helpSpeedPanel.refrishData($event.data)
                    break
                case HelpEvent.SHOW_HELP_OTHER_PANEL:
                    this.showHelpOtherPanel($event.data)
                    break
                default:
                    break;
            }
        }
      
     
        private help2InfoPanel: HelpOtherPanel;
        private showHelpOtherPanel(value: HelpOtherVo): void {
            if (!this.help2InfoPanel) {
                this.help2InfoPanel = new HelpOtherPanel()
            }
            this.help2InfoPanel.refrish2Data(value)
            this.help2InfoPanel.showPanel()
            let helperinfoStr: string = GameData.userInfo.nickName + "|" + GameData.userInfo.avatarUrl;
            var $postStr: string = "";
            $postStr += "level=" + GameDataModel.levelNum
            $postStr += "&openid=" + value.openid;
            $postStr += "&helper_info=" + helperinfoStr;
            GameData.WEB_SEVER_EVENT_AND_BACK("finish_help", $postStr);
            PandaMeshData.hideCentenTxtInfoType2(PandaMeshData.key105);

            GameData.helpinfo = null
           

        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [

                new HelpEvent(HelpEvent.SHOW_HELP_LIST_PANEL),
                new HelpEvent(HelpEvent.HIDE_HELP_LIST_PANEL),
                new HelpEvent(HelpEvent.SHOW_HELP_ME_PANEL),
                new HelpEvent(HelpEvent.SHOW_HELP_OTHER_PANEL),
                new HelpEvent(HelpEvent.CHECK_SELF_HELP_INFO),
                new HelpEvent(SceneEvent.INIT_SCENE_CONFIG),


            ];
        }


    }
}