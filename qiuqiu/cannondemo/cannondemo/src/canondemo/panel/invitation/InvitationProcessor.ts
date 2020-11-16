module invitation {

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
    import PandaMeshData = rightpanda.PandaMeshData;

    export class InvitationEvent extends BaseEvent {
        public static SHOW_INVITATIOIN_PANEL: string ="SHOW_INVITATIOIN_PANEL"
       
    }
    export class InvitationModule extends Module {
        public getModuleName(): string {
            return "InvitationModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new InvitationProcessor()
            ];
        }
    }
    export class InvitationProcessor extends BaseProcessor {
        public getName(): string {
            return "InvitationProcessor";
        }
     
        protected receivedModuleEvent($event: BaseEvent): void {
            switch ($event.type) {
                case InvitationEvent.SHOW_INVITATIOIN_PANEL:
                    if (!this._invitationPanel) {
                        this._invitationPanel = new InvitationPanel()
                    }
                    this._invitationPanel.showPanel();
                    break
                case SceneEvent.SELECT_SCENE_LEVEL:
              
                    break
                default:
                    break
            }

        }

        private _invitationPanel: InvitationPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new InvitationEvent(InvitationEvent.SHOW_INVITATIOIN_PANEL),
                new SceneEvent(SceneEvent.SELECT_SCENE_LEVEL),
            ];
        }
    }
}