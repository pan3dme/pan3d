module timegift {

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

    export class TimeGiftEvent extends BaseEvent {
        public static SHOW_TIME_GIFT_PANEL: string = "SHOW_TIME_GIFT_PANEL"
 
    }
    export class TimeGiftModule extends Module {
        public getModuleName(): string {
            return "TimeGiftModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new TimeGiftProcessor()
            ];
        }
    }
    export class TimeGiftProcessor extends BaseProcessor {
        public getName(): string {
            return "TimeGiftProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
  
                switch ($event.type) {
                    case TimeGiftEvent.SHOW_TIME_GIFT_PANEL:
                        if (!this._timeGiftPanel) {
                            this._timeGiftPanel = new TimeGiftPanel()
                        }
                        this._timeGiftPanel.showPanel()
                        break
                    default:
                        break;
                }
 
            
        }
     
        private _timeGiftPanel: TimeGiftPanel;
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new TimeGiftEvent(TimeGiftEvent.SHOW_TIME_GIFT_PANEL),
       

            ];
        }
    }
}