module endless {

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

    export class EndLessStartEvent extends BaseEvent {
        public static SHOW_ENDLESS_START_PANEL: string = "SHOW_ENDLESS_START_PANEL"
    }
    export class EndLessStartModule extends Module {
        public getModuleName(): string {
            return "EndLessStartModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new EndLessStartProcessor()
            ];
        }
    }
    export class EndLessStartProcessor extends BaseProcessor {
        public getName(): string {
            return "EndLessStartProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof EndLessStartEvent) {
                var $topMenuEvent: EndLessStartEvent = <EndLessStartEvent>$event;
                switch ($topMenuEvent.type) {
                    case EndLessStartEvent.SHOW_ENDLESS_START_PANEL:
                        if (!this._topMenuPanel) {
                            this._topMenuPanel = new EndLessStartPanel();
                        }
                        this._topMenuPanel.showPanel();
                        break
                    default:
                        break
                }
            }
       
        }
        private _topMenuPanel: EndLessStartPanel;
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new EndLessStartEvent(EndLessStartEvent.SHOW_ENDLESS_START_PANEL),
            ];
        }
    }
}