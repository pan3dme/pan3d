module concern {

    import BaseProcessor = Pan3d.BaseProcessor
    import BaseEvent = Pan3d.BaseEvent
    import Module = Pan3d.Module
    import Processor = Pan3d.Processor
    import UIManager = Pan3d.UIManager;
    import Vector3D = Pan3d.Vector3D
    import TimeUtil = Pan3d.TimeUtil
    import Scene_data = Pan3d.Scene_data
    import ModuleEventManager = Pan3d.ModuleEventManager

    import SceneEvent = game.SceneEvent

    export class ConcernEvent extends BaseEvent {
        public static SHOW_CONCERN_PANEL: string = "SHOW_CONCERN_PANEL"
 
    }
    export class ConcernModule extends Module {
        public getModuleName(): string {
            return "ConcernModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new ConcernProcessor()
            ];
        }
    }
    export class ConcernProcessor extends BaseProcessor {
        public getName(): string {
            return "ConcernProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof ConcernEvent) {
                var $endLessEvent: ConcernEvent = <ConcernEvent>$event;
                switch ($endLessEvent.type) {
                    case ConcernEvent.SHOW_CONCERN_PANEL:
                        if (!this._ConcernPanel) {
                            this._ConcernPanel = new ConcernPanel()
                        }
                        this._ConcernPanel.showPanel();
                        break
                    default:
                        break
                }
            }
        }
        private _ConcernPanel: ConcernPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new ConcernEvent(ConcernEvent.SHOW_CONCERN_PANEL),
            ];
        }
    }
}