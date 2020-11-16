module topmenu {

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

    export class TopMenuEvent extends BaseEvent {
        public static SHOW_TOP_MENU_PANEL: string = "SHOW_TOP_MENU_PANEL"
        public static REFRISH_MAIN_TOP_UI: string = "REFRISH_MAIN_TOP_UI"
        public static SET_TOP_TITTLE_TXT: string = "SET_TOP_TITTLE_TXT"
        public static HIDE_TOP_MENU_PANEL: string = "HIDE_TOP_MENU_PANEL"
        public static SHOW_CENTEN_INFO_TXT: string = "SHOW_CENTEN_INFO_TXT"
        public static HIDE_CENTEN_INFO_TXT: string = "HIDE_CENTEN_INFO_TXT"
    }
    export class TopMenuModule extends Module {
        public getModuleName(): string {
            return "TopMenuModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new TopMenuProcessor()
            ];
        }
    }
    export class TopMenuProcessor extends BaseProcessor {
        public getName(): string {
            return "TopMenuProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {

            switch ($event.type) {
                case TopMenuEvent.SHOW_TOP_MENU_PANEL:
                    if (!this._topMenuPanel) {
                        this._topMenuPanel = new TopMenuPanel();
                    }
                    this._topMenuPanel.showPanel();
                    break
                case TopMenuEvent.HIDE_TOP_MENU_PANEL:
                    if (this._topMenuPanel) {
                        this._topMenuPanel.hidePanel();
                    }
                    break
                case TopMenuEvent.SET_TOP_TITTLE_TXT:
                    if (this._topMenuPanel) {
                        this._topMenuPanel.setTittleTxt($event.data);
                    }
                    break
                case game.SceneEvent.DIAMONDS_CHANGE_EVENT:  
                case game.SceneEvent.SELECT_SCENE_LEVEL:
                case TopMenuEvent.REFRISH_MAIN_TOP_UI:
                    if (this._topMenuPanel) {
                        this._topMenuPanel.refrishUi();

                    }
                    break
             
                case TopMenuEvent.SHOW_CENTEN_INFO_TXT:
                    if (this._topMenuPanel && this._topMenuPanel.centreInofTxtView) {
                        this._topMenuPanel.centreInofTxtView.pushTextInfo($event.data);
                    }
                    break
                case TopMenuEvent.HIDE_CENTEN_INFO_TXT:
                    if (this._topMenuPanel && this._topMenuPanel.centreInofTxtView) {
                        this._topMenuPanel.centreInofTxtView.clearTextInfo($event.data);
                    }
                    break
                default:
                    break;
            }
          
            
        }
        private _topMenuPanel: TopMenuPanel;
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new TopMenuEvent(TopMenuEvent.SHOW_TOP_MENU_PANEL),
                new TopMenuEvent(TopMenuEvent.HIDE_TOP_MENU_PANEL),
                new TopMenuEvent(TopMenuEvent.SHOW_CENTEN_INFO_TXT),
                new TopMenuEvent(TopMenuEvent.HIDE_CENTEN_INFO_TXT),
                new TopMenuEvent(TopMenuEvent.SET_TOP_TITTLE_TXT),
                new TopMenuEvent(TopMenuEvent.REFRISH_MAIN_TOP_UI),
                new game.SceneEvent(game.SceneEvent.DIAMONDS_CHANGE_EVENT),
                new game.SceneEvent(game.SceneEvent.SELECT_SCENE_LEVEL),
            ];
        }
    }
}