module friendrank {

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
    import PandaMeshData = rightpanda.PandaMeshData

    export class FriendRankEvent extends BaseEvent {
        public static SHOW_FRIEND_RANK_PANEL: string = "SHOW_FRIEND_RANK_PANEL"

    }
    export class FriendRankModule extends Module {
        public getModuleName(): string {
            return "FriendRankModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new FriendRankProcessor()
            ];
        }
    }
    export class FriendRankProcessor extends BaseProcessor {
        public constructor() {
            super()
      
        }

        public getName(): string {
            return "FriendRankProcessor";
        }
        protected receivedModuleEvent($event: BaseEvent): void {
            if ($event instanceof FriendRankEvent) {
                var $rankEvent: FriendRankEvent = <FriendRankEvent>$event;
                switch ($rankEvent.type) {
                    case FriendRankEvent.SHOW_FRIEND_RANK_PANEL:
                       
                        break
                    default:
                        break
                }
            }
        }
        private _rankPanel: FriendRankPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new FriendRankEvent(FriendRankEvent.SHOW_FRIEND_RANK_PANEL),
            ];
        }
    }
}