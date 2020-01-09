module offline {

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

    export class OffLineEvent extends BaseEvent {
        public static SHOW_OFFLINE_PANEL: string = "SHOW_OFFLINE_PANEL"

    }
    export class OffLineModule extends Module {
        public getModuleName(): string {
            return "OffLineModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new OffLineProcessor()
            ];
        }
    }
    export class OffLineProcessor extends BaseProcessor {
        public getName(): string {
            return "OffLineProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            switch ($event.type) {
                case SceneEvent.WX_ON_SHOW:
                    TimeUtil.addTimeOut(1000, () => {
                        Pan3d.ModuleEventManager.dispatchEvent(new OffLineEvent(OffLineEvent.SHOW_OFFLINE_PANEL))
                    })
                    break
                case OffLineEvent.SHOW_OFFLINE_PANEL:
                    if (GameData.severinfo.wxcloudModel == 1) {
                        return
                    }
                    if (GameData.hasWinPanel) {
                        return
                    }
                    var $offLineTm: number = GameData.getStorageSyncNumber("offlinetime"); //上次离线时间
                    var $tm: number = GameData.getSeverTime() - $offLineTm;//离线时间

                    console.log("离时间", Pan3d.TimeUtil.getDiffTime1(Math.floor($tm / 1000) ))
                    if (!GameData.getStorageSync("isUseEffictSkin") && GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) >= 15 && Math.floor($tm / 1000) > 60) {
              
                        //如果还没有领取过魔法球，离线收益就变成提示需要显示魔法球
                        Pan3d.TimeUtil.addTimeOut(1000, () => {
                            Pan3d.ModuleEventManager.dispatchEvent(new skineffict.SkineffictEvent(skineffict.SkineffictEvent.SHOW_SKINEFFICT_PANEL));
                        })
                    } else {
                        OffLinePanel.offLineMessVo = new OffLineMessVo(GameData.severinfo.offline);
                        if (OffLinePanel.offLineMessVo.open && OffLinePanel.offLineMessVo.openlevel <= GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)) {
                           
                            if ($offLineTm > 0 && $tm > OffLinePanel.offLineMessVo.mintm * 1000) {
                                if (!this.offLinePanel) {
                                    this.offLinePanel = new OffLinePanel();
                                }
                                this.offLinePanel.tmsecond = Math.floor($tm / 1000);
                                this.offLinePanel.showPanel();
                            } else {
                                console.log("时间没到领取离线时间", Math.floor($tm / 1000))
                            }
                            GameData.setStorageSync("offlinetime", GameData.getSeverTime()) //更新离线时间，也包含了onhide也有写
                        }

                    }

                    break
                case mainui.MainuiEvent.SHOW_MAIN_UI_PANEL:
                    if (this.isFrist) {
                        //每次程序启动走一次
                        this.isFrist = false
                        TimeUtil.addTimeOut(1000, () => {
                            Pan3d.ModuleEventManager.dispatchEvent(new OffLineEvent(OffLineEvent.SHOW_OFFLINE_PANEL))
                        })
                    }  
                    break
                default:
                    break
            }

        }
        private isFrist: boolean = true
       
        private offLinePanel: OffLinePanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new OffLineEvent(OffLineEvent.SHOW_OFFLINE_PANEL),
                new SceneEvent(SceneEvent.WX_ON_SHOW),
                new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL),
     
            ];
        }
    }
}