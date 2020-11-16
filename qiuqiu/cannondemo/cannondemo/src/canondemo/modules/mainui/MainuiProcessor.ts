module mainui {

    import BaseProcessor = Pan3d.BaseProcessor
    import BaseEvent = Pan3d.BaseEvent

    import Module = Pan3d.Module
    import Processor = Pan3d.Processor
    import UIManager = Pan3d.UIManager;
    import Vector3D = Pan3d.Vector3D;
    import TimeUtil = Pan3d.TimeUtil;
    import Scene_data = Pan3d.Scene_data;
    import ModuleEventManager = Pan3d.ModuleEventManager;

    import SceneEvent = game.SceneEvent;
    import GameDataModel = game.GameDataModel;
    import PandaMeshData = rightpanda.PandaMeshData;

    export class MainuiEvent extends BaseEvent {
        public static SHOW_MAIN_UI_PANEL: string = "SHOW_MAIN_UI_PANEL"
        public static HIDE_MAIN_UI_PANEL: string = "HIDE_MAIN_UI_PANEL"

        public static SHOW_GUIDE_HAND_PANEL: string = "SHOW_GUIDE_HAND_PANEL"
 
    }
    export class MainuiModule extends Module {
        public getModuleName(): string {
            return "MainuiModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new MainuiProcessor()
            ];
        }
    }
    export class MainuiProcessor extends BaseProcessor {

        public getName(): string {
            return "MainuiProcessor";
        }
        private meshLoginRes(): void {
            var $loginRes: any;
            if (GameData.onLaunchRes) {
                $loginRes = GameData.onLaunchRes
            }
            if (GameData.onshowRes) {
                $loginRes = GameData.onshowRes
            }
            if ($loginRes && $loginRes.scene == 1035) {
                GameData.setStorageSync("useConcernd", true);
                var $dveryDataSync: EveryDataSync = GameData.getEveryDataSyncByName("concerndStr");
                if (!$dveryDataSync.isget) {
                    msgalert.AlertUtil.show("从公从号进入今天可领取100钻", "提示", (value: any) => {
                        GameData.hasdiamondsHavenum += 100
                        msgalert.OnlyTopTxt.show(Pan3d.ColorType.Whiteffffff + "获得钻石+" +100)
                        $dveryDataSync.isget = true;
                        GameData.setStorageSync("concerndStr", $dveryDataSync);
                    }, 2)
                } else {
                    console.log("从公从号进入今天已领取")
                }
            }
        }
        private guideHandPanel: guidehand.GuideHandPanel
        protected receivedModuleEvent($event: BaseEvent): void {
            switch ($event.type) {
                case MainuiEvent.SHOW_MAIN_UI_PANEL:
                    ModuleEventManager.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.SHOW_TOP_MENU_PANEL));
                    ModuleEventManager.dispatchEvent(new rightpanda.RightPandaEvent(rightpanda.RightPandaEvent.SHOW_RIGHT_PANDA_PANEL));
                    ModuleEventManager.dispatchEvent(new platform.PlatFormEvent(platform.PlatFormEvent.SHOW_PLAT_FORM_PANEL));

                    this.meshLoginRes();
                    break
                case game.SceneEvent.SELECT_SCENE_LEVEL:
                    var $canShow: boolean = game.GameDataModel.levelNum <= 2 && GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) <2
                    if ($canShow) {
                        if (!this.guideHandPanel) {
                            this.guideHandPanel = new guidehand.GuideHandPanel();
                        }
                        this.guideHandPanel.showPanel();
                    } else {
                        if (this.guideHandPanel) {
                            this.guideHandPanel.hidePanel();
                        }
                    }
                    break
                case MainuiEvent.HIDE_MAIN_UI_PANEL:
                    ModuleEventManager.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.HIDE_TOP_MENU_PANEL));
                    ModuleEventManager.dispatchEvent(new rightpanda.RightPandaEvent(rightpanda.RightPandaEvent.HIDE_RIGHT_PANDA_PANEL));
                    ModuleEventManager.dispatchEvent(new platform.PlatFormEvent(platform.PlatFormEvent.HIDE_PLAT_FORM_PANEL));
              
                    break
                default:
                    break;
            }
          
        }


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MainuiEvent(MainuiEvent.SHOW_MAIN_UI_PANEL),
                new MainuiEvent(MainuiEvent.HIDE_MAIN_UI_PANEL),
                new MainuiEvent(MainuiEvent.SHOW_GUIDE_HAND_PANEL),
                new game.SceneEvent(game.SceneEvent.SELECT_SCENE_LEVEL),
    
            ];
        }
    

    }
}