module task {

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

    export class TaskEvent extends BaseEvent {
        public static SHOW_TASK_PANEL: string = "SHOW_TASK_PANEL"
        public static HIDE_TASK_PANEL: string = "HIDE_TASK_PANEL"
        public static SHOW_GET_TASK_PANEL: string = "SHOW_GET_TASK_PANEL"

    }
    export class TaskModule extends Module {
        public getModuleName(): string {
            return "TaskModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new TaskProcessor()
            ];
        }
    }
    export class TaskProcessor extends BaseProcessor {
        public getName(): string {
            return "TaskProcessor";
        }
 
        protected receivedModuleEvent($event: BaseEvent): void {

           
            if ($event instanceof TaskEvent) {
                var $endLessEvent: TaskEvent = <TaskEvent>$event;
                switch ($endLessEvent.type) {
                    case TaskEvent.SHOW_TASK_PANEL:
                        if (!this._invitationPanel) {
                            this._invitationPanel = new TaskPanel()
                        }
                        this._invitationPanel.showPanel();
                        break
                    case TaskEvent.HIDE_TASK_PANEL:
                        if (this._invitationPanel) {
                            this._invitationPanel.hidePanel();
                        }
            
                        break
                    case TaskEvent.SHOW_GET_TASK_PANEL:
                        if (!this._taskGetPanel) {
                            this._taskGetPanel = new TaskGetPanel()
                        }
                        this._taskGetPanel.taskMeshVo=$event.data
            
                        this._taskGetPanel.showPanel();
                        break
                    default:
                        break
                }
            }
        }
        private _taskGetPanel: TaskGetPanel
        private _invitationPanel: TaskPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
                new TaskEvent(TaskEvent.SHOW_TASK_PANEL),
                new TaskEvent(TaskEvent.HIDE_TASK_PANEL),
                new TaskEvent(TaskEvent.SHOW_GET_TASK_PANEL),
            ];
        }
    }
}