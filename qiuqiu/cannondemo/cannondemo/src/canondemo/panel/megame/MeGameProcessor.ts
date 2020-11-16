module megame {

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

    export class MeGameEvent extends BaseEvent {
        public static SHOW_ME_GAME_PANEL: string = "SHOW_ME_GAME_PANEL"
        public static HIDE_ME_GAME_PANEL: string = "HIDE_ME_GAME_PANEL"

    }
    export class MeGameModule extends Module {
        public getModuleName(): string {
            return "MeGameModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new MeGameProcessor()
            ];
        }
    }
    export class MeGameProcessor extends BaseProcessor {
        public getName(): string {
            return "MeGameProcessor";
        }

        private isOnly: boolean
        private meGamePanel: MeGamePanel
        protected receivedModuleEvent($event: BaseEvent): void {
 
                switch ($event.type) {
                    case MeGameEvent.SHOW_ME_GAME_PANEL:
                        var $isUseMeGame = GameData.getStorageSync("scene1104")
                        if (!$isUseMeGame) {
                            if (!this.meGamePanel) {
                                this.meGamePanel = new MeGamePanel()
                                this.meGamePanel.showPanel()
                            } else {
                                if ($event.data) { //这里特指提示需要显示
                                    this.meGamePanel.showPanel()
                                }
                            }

                        }
                
                        /*
                        if (!this.isOnly && GameDataModel.levelNum > GameData.severinfo.addmingamelevel) {
                            var $isUseMeGame = GameData.getStorageSync("scene1104")
                            if (!$isUseMeGame) {
                                var $rect: Pan3d.Rectangle = GameData.severinfo.getMegameRect()
                                if ($rect) {
                                  
                                } else {
                                    console.log("还没有适配机型", GameData.SystemInfo);
                                }
                            } else {
                                console.log("已添加过我的小程序")
                            }
                            //this.isOnly = true
                        } else {
                            console.log("打开过一次添加小程序")
                        }
                        */
                        break
                    case MeGameEvent.HIDE_ME_GAME_PANEL:
                        this.meGamePanel&&this.meGamePanel.hidePanel()
                        break
                    default:
                        break
                }
          
        }

        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MeGameEvent(MeGameEvent.SHOW_ME_GAME_PANEL),
                new MeGameEvent(MeGameEvent.HIDE_ME_GAME_PANEL),
            ];
        }
    }
}