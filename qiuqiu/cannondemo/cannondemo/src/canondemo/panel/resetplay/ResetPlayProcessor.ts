module resetplay {

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

    export class ResetPlayEvent extends BaseEvent {
        public static SHOW_RESET_PLAY_PANEL: string = "SHOW_RESET_PLAY_PANEL"

    }
    export class ResetPlayModule extends Module {
        public getModuleName(): string {
            return "ResetPlayModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new ResetPlayProcessor()
            ];
        }
    }
    export class ResetPlayProcessor extends BaseProcessor {
        public getName(): string {
            return "ResetPlayProcessor";
        }

        private showEndGame(): void {
             
        }
        private _revivePanel: revive.RevivePanel
        protected receivedModuleEvent($event: BaseEvent): void {

            switch ($event.type) {
                case ResetPlayEvent.SHOW_RESET_PLAY_PANEL:
                    if (GameDataModel.lastRevivePos) {
                        if (!this._revivePanel) {
                            this._revivePanel = new revive.RevivePanel()
                        }
                        this._revivePanel.showPanel();
                    } else {
                        if (GameData.gameType == 1) {  //普通模式下
                            if (!this._resetPlayPanel) {
                                this._resetPlayPanel = new ResetPlayPanel()
                            }
                            this._resetPlayPanel.showPanel();
                            GameData.sendFailToWeb(GameDataModel.levelNum);
                        }
                        if (GameData.gameType == 5) { //神秘关卡
                            ModuleEventManager.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.SHOW_SPECIAL_FAIL_PANEL));
                        }
                    }
                    break
            
                default:
                    break
            }

        }
 
        private _resetPlayPanel: ResetPlayPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new ResetPlayEvent(ResetPlayEvent.SHOW_RESET_PLAY_PANEL),
     
            ];
        }
    }
}