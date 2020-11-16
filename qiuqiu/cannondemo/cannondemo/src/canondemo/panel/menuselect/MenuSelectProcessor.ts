module menuselectpan {

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

    export class MenuSelectEvent extends BaseEvent {
        public static SHOW_MENU_SELECT_PANEL: string = "SHOW_MENU_SELECT_PANEL"

    }
    export class MenuSelectModule extends Module {
        public getModuleName(): string {
            return "MenuSelectModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new GameStartProcessor()
            ];
        }
    }
    export class GameStartProcessor extends BaseProcessor {
        public getName(): string {
            return "GameStartProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof MenuSelectEvent) {
                var $endLessEvent: MenuSelectEvent = <MenuSelectEvent>$event;
                switch ($endLessEvent.type) {
                    case MenuSelectEvent.SHOW_MENU_SELECT_PANEL:
                        if (!this._menuSelectPanel) {
                            this._menuSelectPanel = new MenuSelectPanel()
                        } else {
                            this._menuSelectPanel.showPanel();
                        }
                        break
                    default:
                        break
                }
            }
        }
        private _menuSelectPanel: MenuSelectPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new MenuSelectEvent(MenuSelectEvent.SHOW_MENU_SELECT_PANEL),
            ];
        }
    }
}