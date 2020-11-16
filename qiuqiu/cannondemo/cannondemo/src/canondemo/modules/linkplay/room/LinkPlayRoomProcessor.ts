module linkplay {

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

    export class LinkPlayRoomEvent extends BaseEvent {
        public static SHOW_LINK_PLAY_ROOM_PANEL: string = "SHOW_LINK_PLAY_ROOM_PANEL"
        public static CREAT_LINK_PLAY_PANEL: string = "CREAT_LINK_PLAY_PANEL"
        public static ROOM_LIST_PESONSE_EVENT: string = "ROOM_LIST_PESONSE_EVENT"
        public static SELECT_ROOM_LIST_EVENT: string = "SELECT_ROOM_LIST_EVENT"

 
    }
    export class LinkRoomModule extends Module {
        public getModuleName(): string {
            return "LinkRoomModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new LinkPlayRoomProcessor()
            ];
        }
    }
    export class LinkPlayRoomProcessor extends BaseProcessor {
        public getName(): string {
            return "LinkPlayRoomProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
 
            switch ($event.type) {
                case LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL:
                    if (!this._linkPlayRoomPanel) {
                        this._linkPlayRoomPanel = new LinkPlayRoomPanel()
                    }
                    this._linkPlayRoomPanel.showPanel();
                    break

                case LinkPlayRoomEvent.CREAT_LINK_PLAY_PANEL:
                    if (!this._linkPlayCreatPanel) {
                        this._linkPlayCreatPanel = new LinkPlayCreatPanel()
                    }
                    this._linkPlayCreatPanel.showPanel();
                    break
                case LinkPlayRoomEvent.ROOM_LIST_PESONSE_EVENT:
                    this._linkPlayRoomPanel.roomListPesonse($event.data)
                    break
                case LinkPlayRoomEvent.SELECT_ROOM_LIST_EVENT:
    
                    this._linkPlayRoomPanel.selectRoomVo = $event.data
                    break
                    default:
                        break
                }
         
        }

        private _linkPlayCreatPanel: LinkPlayCreatPanel
        private _linkPlayRoomPanel: LinkPlayRoomPanel
 
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new LinkPlayRoomEvent(LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL),
                new LinkPlayRoomEvent(LinkPlayRoomEvent.CREAT_LINK_PLAY_PANEL),
                new LinkPlayRoomEvent(LinkPlayRoomEvent.ROOM_LIST_PESONSE_EVENT),
                new LinkPlayRoomEvent(LinkPlayRoomEvent.SELECT_ROOM_LIST_EVENT),
             
            ];
        }
    }
}