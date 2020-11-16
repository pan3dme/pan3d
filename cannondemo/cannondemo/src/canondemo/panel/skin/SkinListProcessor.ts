module skinui {

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
 

    export class SkinListEvent extends BaseEvent {
        public static SHOW_SKIN_LIST_PANEL: string = "SHOW_SKIN_LIST_PANEL"
        public static HIDE_SKIN_LIST_PANEL: string = "HIDE_SKIN_LIST_PANEL"
        public static LEVEL_UP_TEST_NEED_SKIN: string = "LEVEL_UP_TEST_NEED_SKIN"

  
    }
    export class SkinListModule extends Module {
        public getModuleName(): string {
            return "SkinListModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new SkinListProcessor()
            ];
        }
    }
    export class SkinListProcessor extends BaseProcessor {
        public getName(): string {
            return "SkinListProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof SkinListEvent) {
              //  var $endLessEvent: SkinListEvent = <SkinListEvent>$event;
           
            }
            switch ($event.type) {
                case SkinListEvent.SHOW_SKIN_LIST_PANEL:
                    if (!this._SkinListPanel) {
                        this._SkinListPanel = new SkinListPanel()
                    }
                    this._SkinListPanel.showPanel();
                    break
                case SkinListEvent.HIDE_SKIN_LIST_PANEL:
                    this._SkinListPanel.hidePanel();
                    break
                case SkinListEvent.LEVEL_UP_TEST_NEED_SKIN:


                    var $haveSkinList: Array<number> = GameData.getStorageSync("haveSkinList");
                    if (!$haveSkinList) {
                        $haveSkinList = new Array()
                    }
                    if (GameData.hasdiamondsHavenum >= 10 && !GameData.getStorageSync("isUseEffictSkin")) {
                        TimeUtil.addTimeOut(1000, () => {
                            if (GameDataModel.levelNum > 10 && $haveSkinList.length < 1) {
                                msgalert.AlertUtil.show("需要购买一个新皮肤才能继续进行", "提示", (value: any) => {
                                    if (value == 1) {
                                        Pan3d.ModuleEventManager.dispatchEvent(new SkinListEvent(SkinListEvent.SHOW_SKIN_LIST_PANEL))
                                    }
                                }, 2)
                            }
                        })
                    }

             
                    break
                default:
                    break
            }
        }
       
        private _SkinListPanel: SkinListPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new SkinListEvent(SkinListEvent.SHOW_SKIN_LIST_PANEL),
                new SkinListEvent(SkinListEvent.HIDE_SKIN_LIST_PANEL),
                new SkinListEvent(SkinListEvent.LEVEL_UP_TEST_NEED_SKIN),
 

            ];
        }
    }
}