module rank {

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
    import GameDataModel = game.GameDataModel
    import PandaMeshData = rightpanda.PandaMeshData

    export class RankEvent extends BaseEvent {
        public static SHOW_RANK_PANEL: string = "SHOW_RANK_PANEL"
 
    }
    export class RankModule extends Module {
        public getModuleName(): string {
            return "RankModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new RankProcessor()
            ];
        }
    }
    export class RankProcessor extends BaseProcessor {
        public constructor() {
            super()
        }
     
        public getName(): string {
            return "RankProcessor";
        }
        private nextCanShowTm: number = 0;
        private lastShowLevel: number=0
        protected receivedModuleEvent($event: BaseEvent): void {
      

            switch ($event.type) {
                case RankEvent.SHOW_RANK_PANEL:
                    if (!this._rankPanel) {
                        this._rankPanel = new RankPanel()
                    }
                    this._rankPanel.showPanel();
                    break
                case SceneEvent.SELECT_SCENE_LEVEL:
                  
                    break
                default:
                    break
            }

          //  

        }
        private _rankPanel: RankPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new RankEvent(RankEvent.SHOW_RANK_PANEL),
                new SceneEvent(SceneEvent.SELECT_SCENE_LEVEL),
            ];
        }
    }
}