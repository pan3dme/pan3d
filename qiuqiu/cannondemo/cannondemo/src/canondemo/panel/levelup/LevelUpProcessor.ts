module leveluppan {

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

    import GameDataModel = game.GameDataModel;

    export class LevelUpEvent extends BaseEvent {
        public static SHOW_LEVEL_UP_PANEL: string = "SHOW_LEVEL_UP_PANEL"
        public static SHOW_BEST_FRIEND_PANEL: string = "SHOW_BEST_FRIEND_PANEL"
 
    }
    export class LevelUpModule extends Module {
        public getModuleName(): string {
            return "LevelUpModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new LevelUpProcessor()
            ];
        }
    }
    export class LevelUpProcessor extends BaseProcessor {
        public getName(): string {
            return "LevelUpProcessor";
        }
        private testTipHelp(): boolean {

            if (GameData.helpinfo) {
                if (GameData.helpinfo.level == GameDataModel.levelNum) {
                    GameData.clearPandaOrInof(1, 5) //清理求助
                    GameData.dispatchEvent(new help.HelpEvent(help.HelpEvent.SHOW_HELP_OTHER_PANEL), GameData.helpinfo)
               
                    return true
             
                }
            }
       
            return false
        }
        protected receivedModuleEvent($event: BaseEvent): void {
                if (GameData.gameType != 1) {
                    return;
                }
                switch ($event.type) {
                    case LevelUpEvent.SHOW_LEVEL_UP_PANEL:
                        this.showFinishEfict();;
                        var isquestHelp: boolean = this.testTipHelp();
                        if (!isquestHelp) { //不是帮助时才能存自己的最大等级
                            this.showLevelUpPanel();
                            this.sendBestSrouce();
                            GameData.sendSuccessToWeb(GameDataModel.levelNum)
                        }
                        GameData.clearPandaOrInof(1, 8) //清理录像

                        if (Math.random() <0.3) {
                            Pan3d.ModuleEventManager.dispatchEvent(new SceneEvent(SceneEvent.CHANGE_BOTTOM_PANEL_AD))
                        }
                        break
                    case LevelUpEvent.SHOW_BEST_FRIEND_PANEL:
                        if (GameDataModel.levelNum % 3 == 1 || GameDataModel.levelNum>15) {
                            Pan3d.TimeUtil.addTimeOut(1000, () => {
                                if (!this._bestFriendPanel) {
                                    this._bestFriendPanel = new BestFriendPanel();
                                }
                                this._bestFriendPanel.showPanel();
                            })
                    
                        }
                        break;
                    default:
                        break
                }
       
        }
 
        private _bestFriendPanel: BestFriendPanel
 
        private _fristLevelUpPanel: FristLevelUpPanel
        private showLevelUpPanel(): void {
            TimeUtil.addTimeOut(1000, () => {
  
                var $isFrist: boolean = GameData.saveFristLevelUp(GameDataModel.levelNum);
                if ($isFrist) {
                    if (!this._fristLevelUpPanel) {
                        this._fristLevelUpPanel = new FristLevelUpPanel()
                    }
                    this._fristLevelUpPanel.showPanel();
                } else {
                    TimeUtil.addTimeOut(600, () => {
                        game.GameLevelManeger.getInstance().clear();
                        GameDataModel.centenBall.x = 0
                        GameDataModel.centenBall.y = 20
                        GameDataModel.centenBall.z = 0
                        GameDataModel.centenBall.resetParticlePos()
                        TimeUtil.addTimeOut(10, () => {
                            GameData.dispatchToLevel(GameDataModel.levelNum + 1);
                        })
                    })


                }


               

            })

        }
    
        private sendBestSrouce(): void {
           
            GameData.dispatchEvent(new SceneEvent(SceneEvent.SEND_TO_APPER_DATA), { key: "显示最佳", data: { level: game.GameDataModel.levelNum } })
 
            if (GameDataModel.levelNum > GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)) { //存放自己最大的等级
                GameData.setStorageSync(GameData.SELF_MAX_LEVEL, GameDataModel.levelNum)
            }
       
           
        }
        private showFinishEfict(): void {
         
            GameData.dispatchEvent(new SceneEvent(SceneEvent.SHOW_SPECIAL_EFFECT), { pos: GameDataModel.centenBall.getPostionV3d(), name: "levelup" })

            game.GameSoundManager.getInstance().playSoundByName(Pan3d.Scene_data.fileRoot + "sound/" + "pass" + ".mp3");
        }
        private _levelUpWinPanel: BestFriendPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new LevelUpEvent(LevelUpEvent.SHOW_BEST_FRIEND_PANEL),
                new LevelUpEvent(LevelUpEvent.SHOW_LEVEL_UP_PANEL),
 
            ];
        }
    }
}