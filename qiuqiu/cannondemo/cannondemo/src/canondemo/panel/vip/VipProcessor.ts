module vip {

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

    export class VipEvent extends BaseEvent {
        public static SHOW_VIP_PANEL: string = "SHOW_VIP_PANEL"
 
    }
    export class VipModule extends Module {
        public getModuleName(): string {
            return "VipModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new VipProcessor()
            ];
        }
    }
    export class VipProcessor extends BaseProcessor {
        public getName(): string {
            return "VipProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
  
                switch ($event.type) {
                    case VipEvent.SHOW_VIP_PANEL:
                        if (!this._vipPanel) {
                            this._vipPanel = new VipPanel()
                        }
                        this._vipPanel.showPanel()
                        break
                    case SceneEvent.WX_ON_SHOW:

                        if (!GameData.getStorageSync("isvip")) {
                            TimeUtil.addTimeOut(3000, () => {
                                this.wxOnShow($event.data);
                            })
                        }
               
                        break
                    default:
                        break;
                }
        }
        private wxOnShow(value: any): void {
            console.log("接收到群连接进来的", value)
            var query: any = value.query
            if (query && query.sharetype == AllShareMeshVo.type12 ) {
                if (GameData.getStorageSync("openid") == query.openid) {
                    if (value.scene == 1044) {
                        msgalert.AlertUtil.show("已开启vip权限，点击vip可变化场景")
                        GameData.setStorageSync("isvip", true)
                        Pan3d.ModuleEventManager.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.REFRISH_MAIN_TOP_UI));

                        if (this._vipPanel) {
                            this._vipPanel.hidePanel()
                        }
                    } else {
                        msgalert.AlertUtil.show("需要从聊天群的连接进入才能获取VIP权限", "提示", (value: any) => {
                            if (value == 1) {
                                Pan3d.ModuleEventManager.dispatchEvent(new VipEvent(VipEvent.SHOW_VIP_PANEL))
                            }
                        }, 2)
                    }
              
                  
                }
            }
        }
     
        private _vipPanel: VipPanel;
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new VipEvent(VipEvent.SHOW_VIP_PANEL),
                new game.SceneEvent(game.SceneEvent.WX_ON_SHOW)
       

            ];
        }
    }
}