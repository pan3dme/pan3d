module lottery {

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
    import PandaMeshData = rightpanda.PandaMeshData

    export class LotteryEvent extends BaseEvent {
        public static SHOW_LOTTERY_PANEL: string = "SHOW_LOTTERY_PANEL"
 
    }
    export class LotteryModule extends Module {
        public getModuleName(): string {
            return "LotteryModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new LotteryProcessor()
            ];
        }
    }
    export class LotteryProcessor extends BaseProcessor {
        public getName(): string {
            return "LotteryProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
  
                switch ($event.type) {
                    case LotteryEvent.SHOW_LOTTERY_PANEL:
                        if (!this._lotteryPanel) {
                            this._lotteryPanel = new LotteryPanel()
                        }
                        var maxData: EveryDataSync = GameData.getEveryDataSyncByName("oneDayMaxLotteryNum");
                        if (maxData.num < 10) {
                            this._lotteryPanel.showPanel()
                        }
                        break
                    case SceneEvent.INIT_SCENE_CONFIG:

                        TimeUtil.addTimeOut(1000 * 7, () => { this.timeOut() })
                        break
                    default:
                        break;
                }
          
      
          
            
        }
        private timeOut(): void {
 
            

        }
        private _lotteryPanel: LotteryPanel;
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new LotteryEvent(LotteryEvent.SHOW_LOTTERY_PANEL),
                new SceneEvent(SceneEvent.INIT_SCENE_CONFIG),


            ];
        }
    }
}