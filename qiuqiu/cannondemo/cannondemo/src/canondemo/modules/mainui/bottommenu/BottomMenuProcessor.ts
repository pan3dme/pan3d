module bottommenuA {

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

    export class BottomMenuEvent extends BaseEvent {
        public static SHOW_BOTTOM_MENU_PANEL: string = "SHOW_BOTTOM_MENU_PANEL"
        public static HIDE_BOTTOM_MENU_PANEL: string = "HIDE_BOTTOM_MENU_PANEL"
    }
    export class BottomMenuModule extends Module {
        public getModuleName(): string {
            return "BottomMenuModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new BottomMenuProcessor(),
            ];
        }
    }
    export class BottomMenuProcessor extends BaseProcessor {
        public getName(): string {
            return "BottomMenuProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            switch ($event.type) {
                case BottomMenuEvent.SHOW_BOTTOM_MENU_PANEL:
                    if (!this._bottomMenuPanel) {
                        this._bottomMenuPanel = new BottomMenuPanel();
                    }
                    this._bottomMenuPanel.showPanel();
                    break
                case BottomMenuEvent.HIDE_BOTTOM_MENU_PANEL:
                    if (this._bottomMenuPanel) {
                        this._bottomMenuPanel.hidePanel();
                    }
             
                    break
                default:
                    break
            }
        
        }
        private _bottomMenuPanel: BottomMenuPanel;
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new BottomMenuEvent(BottomMenuEvent.SHOW_BOTTOM_MENU_PANEL),
                new BottomMenuEvent(BottomMenuEvent.HIDE_BOTTOM_MENU_PANEL),
            ];
        }
    }
}