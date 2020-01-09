module topstart {

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

    export class TopStartEvent extends BaseEvent {
        public static SHOW_TOP_START_PANEL: string = "SHOW_TOP_START_PANEL"
        public static HIDE_TOP_START_PANEL: string = "HIDE_TOP_START_PANEL"

    }
    export class TopStartModule extends Module {
        public getModuleName(): string {
            return "TopStartModule";
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
            if ($event instanceof TopStartEvent) {
                var $endLessEvent: TopStartEvent = <TopStartEvent>$event;
                switch ($endLessEvent.type) {
                    case TopStartEvent.SHOW_TOP_START_PANEL:
                     

                        if (!this._topStartView) {
                            this._topStartView = new TopStartView()
                        }
                        this._topStartView .showPanel()
                        break
                    default:
                        this._topStartView.hidePanel()
                        break
                }
            }
        }

        private _topStartView: TopStartView
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new TopStartEvent(TopStartEvent.SHOW_TOP_START_PANEL),
                new TopStartEvent(TopStartEvent.HIDE_TOP_START_PANEL),
            ];
        }
    }
}