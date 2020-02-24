module selectlevel {

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

    export class SelectLevelEvent extends BaseEvent {
        public static SHOW_SELECT_LEVEL: string = "SHOW_SELECT_LEVEL"
    
    }
    export class SelectLevelModule extends Module {
        public getModuleName(): string {
            return "SelectLevelModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new SelectLevelProcessor()
            ];
        }
    }
    export class SelectLevelProcessor extends BaseProcessor {
        public getName(): string {
            return "SelectLevelProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof SelectLevelEvent) {
                var $endLessEvent: SelectLevelEvent = <SelectLevelEvent>$event;
                switch ($endLessEvent.type) {
                    case SelectLevelEvent.SHOW_SELECT_LEVEL:
                        if (!this._selectLevelPanel) {
                            this._selectLevelPanel = new SelectLevelPanel()
                        }
                        this._selectLevelPanel.showPanel();
                        break
                    default:
                        break
                }
            }
        }
        private _selectLevelPanel: SelectLevelPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new SelectLevelEvent(SelectLevelEvent.SHOW_SELECT_LEVEL),
            ];
        }
    }
}