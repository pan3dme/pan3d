module rightpanda {

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

    export class RightPandaEvent extends BaseEvent {
        public static SHOW_RIGHT_PANDA_PANEL: string = "SHOW_RIGHT_PANDA_PANEL"
        public static HIDE_RIGHT_PANDA_PANEL: string = "HIDE_RIGHT_PANDA_PANEL"
        public static SHOW_PANDA_INFO: string = "SHOW_PANDA_INFO";
        public static CLEAR_PANDA_INFO: string = "CLEAR_PANDA_INFO";
    }
    export class RightPandaModule extends Module {
        public getModuleName(): string {
            return "RightPandaModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new RightPandaProcessor()
            ];
        }
    }
    export class RightPandaProcessor extends BaseProcessor {

        private initData(): void {
      
        }

        public getName(): string {
            return "RightPandaProcessor";
        }
        private _rightPandaPanel: RightPandaPanel;
        protected receivedModuleEvent($event: BaseEvent): void {
            switch ($event.type) {
                case SceneEvent.INIT_SCENE_CONFIG:
                    this.initData();
                    break;
                case RightPandaEvent.SHOW_RIGHT_PANDA_PANEL:
                    if (!this._rightPandaPanel) {
                        this._rightPandaPanel = new RightPandaPanel();
                    }
                    this._rightPandaPanel.showPanel();
                    break;
                case RightPandaEvent.HIDE_RIGHT_PANDA_PANEL:
                    if (this._rightPandaPanel) {
                        this._rightPandaPanel.hidePanel();
                    }
                  
                    break;
                case RightPandaEvent.SHOW_PANDA_INFO:
                    if (this._rightPandaPanel) {
                        var $pandaMeshData: PandaMeshData = <PandaMeshData>$event.data
                        if ($pandaMeshData.type == PandaMeshData.type1) {
                            this._rightPandaPanel.pushPandaInfo($pandaMeshData);
                        }
                    }
                    break;
            }

        }
 

        /*
        private textcheck_advertise_reward(): void {
            GameData.WEB_SEVER_EVENT_AND_BACK("check_advertise_reward", "openid=" + GameData.getStorageSync("openid"), (res: any) => {
                if (res && res.data && res.data.reward > 0) {
                    console.log("有奖励", res.data.reward);
                    PandaMeshData.showRightPanda(PandaMeshData.key9, Scene_data.fileRoot + "ui/panda/9.png", null)
                }
            })
        }
        */
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new SceneEvent(SceneEvent.INIT_SCENE_CONFIG),
                new RightPandaEvent(RightPandaEvent.SHOW_RIGHT_PANDA_PANEL),
                new RightPandaEvent(RightPandaEvent.HIDE_RIGHT_PANDA_PANEL),
                new RightPandaEvent(RightPandaEvent.SHOW_PANDA_INFO),
            ];
        }
    }
}