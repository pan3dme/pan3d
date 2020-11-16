module online {

    import BaseProcessor = Pan3d.BaseProcessor
    import BaseEvent = Pan3d.BaseEvent
    import Module = Pan3d.Module
    import Processor = Pan3d.Processor
    import UIManager = Pan3d.UIManager;
    import Vector3D = Pan3d.Vector3D
    import TimeUtil = Pan3d.TimeUtil
    import Scene_data = Pan3d.Scene_data
    import InteractiveEvent = Pan3d.InteractiveEvent
    import ModuleEventManager = Pan3d.ModuleEventManager

    import Physics = canonkey.Physics;

    import SceneEvent = game.SceneEvent
    import GameDataModel = game.GameDataModel
    import PandaMeshData = rightpanda.PandaMeshData

    export class OnlineStartEvent extends BaseEvent {
        public static SHOW_ONLINE_START_PANEL: string = "SHOW_ONLINE_START_PANEL"

 
    }
    export class OnlineStartModule extends Module {
        public getModuleName(): string {
            return "OnlineStartModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new OnlineStartProcessor()
            ];
        }
    }
    export class OnlineStartProcessor extends BaseProcessor {
        public getName(): string {
            return "OnlineStartProcessor";
        }
        public constructor() {
            super()

        }
        private _onlineStartPanel: OnlineStartPanel
        protected receivedModuleEvent($event: BaseEvent): void {
            if (!GameData.severinfo.onlinegame.open) {
                return;
            }
            if ($event instanceof OnlineStartEvent) {
                var $endLessEvent: OnlineStartEvent = <OnlineStartEvent>$event;
                switch ($endLessEvent.type) {
                    case OnlineStartEvent.SHOW_ONLINE_START_PANEL:
                        if (!this._onlineStartPanel) {
                            this._onlineStartPanel = new OnlineStartPanel()
                        }
                        this._onlineStartPanel.showPanel();
                        break
                    default:
                        break
                }
            }
        }

      
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new OnlineStartEvent(OnlineStartEvent.SHOW_ONLINE_START_PANEL),

            ];
        }
    }
}