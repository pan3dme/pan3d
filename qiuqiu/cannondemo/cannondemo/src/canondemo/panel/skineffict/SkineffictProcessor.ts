module skineffict {

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
    import GameSoundManager = game.GameSoundManager
    import SceneEvent = game.SceneEvent

    export class SkineffictEvent extends BaseEvent {
        public static SHOW_SKINEFFICT_PANEL: string = "SHOW_SKINEFFICT_PANEL"
        public static TEST_SKINEFFICT_ADVERTISE: string = "TEST_SKINEFFICT_ADVERTISE"

    }
    export class SkineffictModule extends Module {
        public getModuleName(): string {
            return "SkineffictModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new SkineffictProcessor()
            ];
        }
    }
    export class SkineffictProcessor extends BaseProcessor {
        public getName(): string {
            return "SkineffictProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            switch ($event.type) {
                case SkineffictEvent.SHOW_SKINEFFICT_PANEL:
                    if (!this.skineffictPanel) {
                        this.skineffictPanel = new SkineffictPanel()
                    }
                    this.skineffictPanel.showPanel();
                    break

                case SkineffictEvent.TEST_SKINEFFICT_ADVERTISE:
                    this.testAdvertise()
                    break

                case mainui.MainuiEvent.SHOW_MAIN_UI_PANEL:
                    if (!GameData.getStorageSync("isUseEffictSkin")) {
                        if (GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) >= 14 && !this.isFrist) {
                            TimeUtil.addTimeOut(3000, () => {
                                rightpanda.PandaMeshData.showRightPanda(rightpanda.PandaMeshData.key17, Scene_data.fileRoot + "ui/panda/17.png", new SkineffictEvent(SkineffictEvent.SHOW_SKINEFFICT_PANEL));
                            })
                            this.isFrist = true
                        }
                    }
                    break
            
                default:
                    break
            }

        }
        private isFrist: boolean;

        private canTestAdverTm: number=0
        private testAdvertise(): void {
            if (GameData.getStorageSync("isUseEffictSkin")) {
                console.log("已使用过就不再进行判断")
                return 
            }
            if (TimeUtil.getTimer() < this.canTestAdverTm) {
                //防止重复申请
                return
            }
            this.canTestAdverTm = TimeUtil.getTimer()+9*1000

            var $postStr: string = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            $postStr += "&time=" + 0;
            $postStr += "&type=" + 4;
            GameData.WEB_SEVER_EVENT_AND_BACK("get_advertise_list", $postStr, (res: any) => {
                if (res && res.data && res.data.list && res.data.list.length) {
                    GameData.setStorageSync("isUseEffictSkin", true) //使用过了
                    GameData.setStorageSync("useEffictSkin", true)
                    game.GameDataModel.changeMainEffict();
                    Pan3d.ModuleEventManager.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.REFRISH_MAIN_TOP_UI));
                    rightpanda.PandaMeshData.hideCentenTxtInfoType2(rightpanda.PandaMeshData.key106);

                } else {
                    TimeUtil.addTimeOut(10 * 1000, () => {
                        this.testAdvertise();
                        console.log("继续等待", TimeUtil.getTimer());
            
                    })
                }
            
            })

      

        }

        


        private skineffictPanel: SkineffictPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new SkineffictEvent(SkineffictEvent.SHOW_SKINEFFICT_PANEL),
                new SkineffictEvent(SkineffictEvent.TEST_SKINEFFICT_ADVERTISE),
                new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL),
     
            ];
        }
    }
}