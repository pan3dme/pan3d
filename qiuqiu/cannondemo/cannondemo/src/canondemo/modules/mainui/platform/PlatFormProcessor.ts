module platform {

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

    export class PlatFormEvent extends BaseEvent {
        public static SHOW_PLAT_FORM_PANEL: string = "SHOW_TIME_GIFT_PANEL"
        public static HIDE_PLAT_FORM_PANEL: string = "HIDE_PLAT_FORM_PANEL"
        public static CLIK_PLAT_OTHER_GAME: string = "CLIK_PLAT_OTHER_GAME"
    }
    export class PlatFormModule extends Module {
        public getModuleName(): string {
            return "PlatFormModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new PlatFormProcessor()
            ];
        }
    }
    export class PlatFormProcessor extends BaseProcessor {
        public getName(): string {
            return "PlatFormProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

   
        
                switch ($event.type) {
                    case PlatFormEvent.SHOW_PLAT_FORM_PANEL:
                        this.showPlatFramePnae()
                        break
                    case PlatFormEvent.HIDE_PLAT_FORM_PANEL:
                        if (this._platFormPanel) {
                            this._platFormPanel.hidePanel()
                        }
                        break
                    default:
                        break;
                }
          
      
          
            
        }
        private showPlatFramePnae(): void {
            var $url: string = "https://jsonconfig.chiji-h5.com/json/wdqq/gamelist.json"
            if (GameData.devicetypepc) {
                $url = "res/gamelist.json"
            }
            LoadManager.getInstance().load($url, LoadManager.XML_TYPE,
                ($liststr: string) => {
                 
                    var $obj: Array<any> = JSON.parse($liststr)
                    if ($obj ) {
                        if (!this._platFormPanel) {
                            this._platFormPanel = new PlatFormPanel();
                        }
                        this._platFormPanel.refrishData($obj)
                        this._platFormPanel.showPanel()
                    }
                });
        }
        private _platFormPanel: PlatFormPanel;
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new PlatFormEvent(PlatFormEvent.SHOW_PLAT_FORM_PANEL),
                new PlatFormEvent(PlatFormEvent.HIDE_PLAT_FORM_PANEL),

            ];
        }
    }
}