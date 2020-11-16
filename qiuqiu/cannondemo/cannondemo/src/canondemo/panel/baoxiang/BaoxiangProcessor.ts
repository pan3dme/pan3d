module baoxiang {

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
    import GameSoundManager = game.GameSoundManager
    import SceneEvent = game.SceneEvent

    export class BaoxiangEvent extends BaseEvent {
        public static SHOW_BAOXIANG_PANEL: string = "SHOW_BAOXIANG_PANEL"

    }
    export class BaoxiangModule extends Module {
        public getModuleName(): string {
            return "BaoxiangModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new BaoxiangProcessor()
            ];
        }
    }
    export class BaoxiangProcessor extends BaseProcessor {
        public getName(): string {
            return "BaoxiangProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            switch ($event.type) {
                case BaoxiangEvent.SHOW_BAOXIANG_PANEL:
                        if (!this._resetPlayPanel) {
                            this._resetPlayPanel = new BaoxiangPanel()
                    }
                    this._resetPlayPanel.refrishData($event.data)
                        this._resetPlayPanel.showPanel();
                    break
            
                default:
                    break
            }

        }
        private _resetPlayPanel: BaoxiangPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new BaoxiangEvent(BaoxiangEvent.SHOW_BAOXIANG_PANEL),
     
            ];
        }
    }
}