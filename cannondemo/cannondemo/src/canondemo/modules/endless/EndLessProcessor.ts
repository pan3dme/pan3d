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

    import Physics = canonkey.Physics;

    import SceneEvent = game.SceneEvent
    import GameDataModel = game.GameDataModel



    export class EndLessEvent extends BaseEvent {
        public static ENDLESS_MODEL_START: string = "ENDLESS_MODEL_START";

        public static ENDLESS_NEED_ADD_SCENE: string = "ENDLESS_NEED_ADD_SCENE";
        public static ENDLESS_CLEAR_LAST_SCENE: string = "ENDLESS_CLEAR_LAST_SCENE";
        public static HIDE_ALL_ENDLESS_PANEL: string = "RETEN_BASE_LEVEL_SCENE";
        public static SAVE_ENDLESS_REVIVE_TIME_POS: string = "SAVE_ENDLESS_REVIVE_TIME_POS";
        public static MUI_TIME_ADD_START: string = "MUI_TIME_ADD_START";
        public static MUI_SHOW_ADD_SCENE_TIME: string = "MUI_SHOW_ADD_SCENE_TIME";


        public static SHOW_ENDLESS_TOP_PANEL: string = "SHOW_ENDLESS_TOP_PANEL"
        public static SHOW_ENDLESS_LEFT_RANK_PANEL: string = "SHOW_ENDLESS_LEFT_RANK_PANEL"
        public static SHOW_ENDLESS_FINISH_PANEL: string = "SHOW_ENDLESS_FINISH_PANEL"
        public static SHOW_ENDLESS_REVIVE_PANEL: string = "SHOW_ENDLESS_REVIVE_PANEL"

    }
    export class EndLessModule extends Module {
        public getModuleName(): string {
            return "EndLessModule";
        }
        protected listProcessors(): Array<Processor> {
            return [new EndLessProcessor()
            ];
        }
    }
    export class EndLessProcessor extends BaseProcessor {
        public getName(): string {
            return "EndLessProcessor";
        }
        private playEndLessGame(): void {
            GameDataModel.lastMainHitTm = TimeUtil.getTimer();
            GameDataModel.levelStartTm = TimeUtil.getTimer();
            GameDataModel.lastMainHitVect = new Pan3d.Vector3D(GameDataModel.centenBall.x, GameDataModel.centenBall.y, GameDataModel.centenBall.z)
            Physics.ready = true;
            EndlessManager.getInstance().CountdownTm = TimeUtil.getTimer() + EndlessManager.getInstance().endlessConfigVo.maxtime; //存开始游戏时间
            ModuleEventManager.dispatchEvent(new EndLessEvent(EndLessEvent.SAVE_ENDLESS_REVIVE_TIME_POS));
            ModuleEventManager.dispatchEvent(new EndLessEvent(EndLessEvent.MUI_TIME_ADD_START));
            //  EndlessManager.getInstance().saveEndlessDataToWeb()
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            switch ($event.type) {
                case EndLessEvent.ENDLESS_MODEL_START:
                    EndlessManager.getInstance().startGame((res: any) => {
                        if (res.name = "canplay") {
                            game.GameDataModel.focus3d.y = game.GameDataModel.centenBall.y;
                            this.playEndLessGame()
                        }
                    });
                    break;
                case EndLessEvent.MUI_TIME_ADD_START:
                    if (this._endLessTopPanel) {
                        this._endLessTopPanel.muiTimeAddStart();
                    }
                    break;
                case EndLessEvent.MUI_SHOW_ADD_SCENE_TIME:
                    if (this._endLessTopPanel) {
                        this._endLessTopPanel.showAddSceneTime($event.data)
                    }
                    break;
                case EndLessEvent.ENDLESS_NEED_ADD_SCENE:
                    EndlessManager.getInstance().needAddNewScene();
                    if (this._endLessLeftRankPanel) {
                        this._endLessLeftRankPanel.rifrishData()
                    }
                    if (this._endLessTopPanel) {
                        this._endLessTopPanel.refristLayerNum()
                    }

                    break;
                case EndLessEvent.ENDLESS_CLEAR_LAST_SCENE:
                    EndlessManager.getInstance().clearLastScene()
                    break;
                case EndLessEvent.SAVE_ENDLESS_REVIVE_TIME_POS:
                    EndlessManager.getInstance().saveEndlesreviveTimePos()
                    break;

                case EndLessEvent.HIDE_ALL_ENDLESS_PANEL:
                    if (this._endlessFinishPanel) {
                        this._endlessFinishPanel.hidePanel()
                    }
                    if (this._endLessLeftRankPanel) {
                        this._endLessLeftRankPanel.hidePanel()
                    }
                    if (this._endLessTopPanel) {
                        this._endLessTopPanel.hidePanel()
                    }
                    if (this._endLessRevivePanel) {
                        this._endLessRevivePanel.hidePanel()
                    }
                    break;
                case EndLessEvent.SHOW_ENDLESS_TOP_PANEL:
                    if (!this._endLessTopPanel) {
                        this._endLessTopPanel = new EndLessTopPanel();
                    }
                    this._endLessTopPanel.showPanel();
                    break;

                case EndLessEvent.SHOW_ENDLESS_LEFT_RANK_PANEL:
                    if (!this._endLessLeftRankPanel) {
                        this._endLessLeftRankPanel = new EndLessLeftRankPanel();
                    }
                    this._endLessLeftRankPanel.showPanel();
                    break;
                case EndLessEvent.SHOW_ENDLESS_FINISH_PANEL:
                    if (!this._endlessFinishPanel) {
                        this._endlessFinishPanel = new EndlessFinishPanel();
                    }
                    this._endlessFinishPanel.showPanel();
                    break;
                case resetplay.ResetPlayEvent.SHOW_RESET_PLAY_PANEL:
                    if (GameData.gameType == 2) {
                        if (!this._endLessRevivePanel) {
                            this._endLessRevivePanel = new EndLessRevivePanel();
                        }
                        this._endLessRevivePanel.showPanel();
                    }
                    break;
                default:
                    break;
            }


        }

        private _endlessFinishPanel: EndlessFinishPanel
        private _endLessLeftRankPanel: EndLessLeftRankPanel
        private _endLessTopPanel: EndLessTopPanel
        private _endLessRevivePanel: EndLessRevivePanel;


        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new EndLessEvent(EndLessEvent.ENDLESS_MODEL_START),
                new EndLessEvent(EndLessEvent.ENDLESS_NEED_ADD_SCENE),
                new EndLessEvent(EndLessEvent.ENDLESS_CLEAR_LAST_SCENE),
                new EndLessEvent(EndLessEvent.HIDE_ALL_ENDLESS_PANEL),
                new EndLessEvent(EndLessEvent.SAVE_ENDLESS_REVIVE_TIME_POS),
                new EndLessEvent(EndLessEvent.MUI_TIME_ADD_START),
                new EndLessEvent(EndLessEvent.MUI_SHOW_ADD_SCENE_TIME),

                new EndLessEvent(EndLessEvent.SHOW_ENDLESS_TOP_PANEL),
                new EndLessEvent(EndLessEvent.SHOW_ENDLESS_LEFT_RANK_PANEL),
                new EndLessEvent(EndLessEvent.SHOW_ENDLESS_FINISH_PANEL),
                new EndLessEvent(EndLessEvent.SHOW_ENDLESS_REVIVE_PANEL),

                new resetplay.ResetPlayEvent(resetplay.ResetPlayEvent.SHOW_RESET_PLAY_PANEL),
                new SceneEvent(SceneEvent.DIAMONDS_SPRITE_HIT_EVENT),

            ];
        }


    }
}