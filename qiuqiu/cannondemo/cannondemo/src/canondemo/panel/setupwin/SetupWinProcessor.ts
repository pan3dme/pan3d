module setupui {

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

    export class SetupWinEvent extends BaseEvent {
        public static SHOW_SETUP_WIN_PANEL: string = "SHOW_SETUP_WIN_PANEL"
 
    }
    export class SetupWinModule extends Module {
        public getModuleName(): string {
            return "SetupWinModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new SetupWinProcessor()
            ];
        }
    }
    export class SetupWinProcessor extends BaseProcessor {
        public getName(): string {
            return "SetupWinProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof SetupWinEvent) {
                var $endLessEvent: SetupWinEvent = <SetupWinEvent>$event;
                switch ($endLessEvent.type) {
                    case SetupWinEvent.SHOW_SETUP_WIN_PANEL:
                        if (!this._SetupWinPanel) {
                            this._SetupWinPanel = new SetupWinPanel()
                        }
                        this._SetupWinPanel.showPanel();
                        break
                    default:
                        break
                }
            }
        }
        private _SetupWinPanel: SetupWinPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new SetupWinEvent(SetupWinEvent.SHOW_SETUP_WIN_PANEL),
            ];
        }
    }
}