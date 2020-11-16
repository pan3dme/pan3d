module online {

    import BaseProcessor = Pan3d.BaseProcessor
    import BaseEvent = Pan3d.BaseEvent
    import Module = Pan3d.Module
    import Processor = Pan3d.Processor
    import UIManager = Pan3d.UIManager;
    import Vector3D = Pan3d.Vector3D
    import TimeUtil = Pan3d.TimeUtil
    import Scene_data = Pan3d.Scene_data
    import InteractiveEvent = Pan3d.InteractiveEvent
    import ModuleEventManager = Pan3d.ModuleEventManager

    import Physics = canonkey.Physics;

    import SceneEvent = game.SceneEvent
    import GameDataModel = game.GameDataModel
    import PandaMeshData = rightpanda.PandaMeshData

    export class OnlineEvent extends BaseEvent {
 
        public static SHOW_ONLINE_MAIN_PANEL: string = "SHOW_ONLINE_MAIN_PANEL"
        public static SHOW_ONLINE_FINISH_PANEL: string = "SHOW_ONLINE_FINISH_PANEL"
        public static PLAY_ONLINE_SCENE_START: string = "PLAY_ONLINE_SCENE_START"
        public static CLEAR_ONLINE_SCENE_ALL: string = "CLEAR_ONLINE_SCENE_ALL"
        public static TEST_FRIST_TIP_ONLINE_PLAY: string = "TEST_FRIST_TIP_ONLINE_PLAY"
 
    }
    export class OnlineModule extends Module {
        public getModuleName(): string {
            return "OnlineModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new OnlineProcessor()
            ];
        }
    }
    export class OnlineProcessor extends BaseProcessor {
        public getName(): string {
            return "OnlineProcessor";
        }
        public constructor() {
            super()
            this.frameFun = () => { this.upFrame() }
        }
        private frameFun: Function
        private _onlineMainPanel: OnlineMainPanel;
        private _onlineFinishPanel: OnlineFinishPanel
        protected receivedModuleEvent($event: BaseEvent): void {
            if (!GameData.severinfo.onlinegame.open) {
                return;
            }
            if ($event instanceof OnlineEvent) {
                var $endLessEvent: OnlineEvent = <OnlineEvent>$event;
                switch ($endLessEvent.type) {
             
                    case OnlineEvent.SHOW_ONLINE_MAIN_PANEL:
                        if (!this._onlineMainPanel) {
                            this._onlineMainPanel = new OnlineMainPanel()
                        }
                        this._onlineMainPanel.showPanel();
                        break
                    case OnlineEvent.TEST_FRIST_TIP_ONLINE_PLAY:
                        this.textToOnlineScene()
                        break
                    case OnlineEvent.SHOW_ONLINE_FINISH_PANEL:
                        if (!this._onlineFinishPanel) {
                            this._onlineFinishPanel = new OnlineFinishPanel()
                        }
                        Physics.ready = false
                        this._onlineFinishPanel.showPanel();
                        break
                    case OnlineEvent.PLAY_ONLINE_SCENE_START:
                        OnlineManager.getInstance().startGame((res: any) => {
                            if (res.name = "canplay") {
                                game.GameDataModel.focus3d.y = game.GameDataModel.centenBall.y;
                                this.addEvets()
                            }
                        });
                   
                        break
                    case OnlineEvent.CLEAR_ONLINE_SCENE_ALL:
                        Physics.ready = false
                        this.removeEvens()
                        OnlineManager.getInstance().clearAllOnline();
                        this._onlineMainPanel.hidePanel();;
                        //将世界属性设置回去
                        GameData.gameType = 1
                        Physics.world.defaultContactMaterial.restitution = 0.01;
                        Physics.world.defaultContactMaterial.friction = 0.01;
                        GameData.dispatchToLevel(GameDataModel.levelNum)

                        break
                    default:
                        break
                }
            }
        }
        private textToOnlineScene(): void {
            var maxLevel: number = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL) 
            if (maxLevel > 14) {
                Pan3d.TimeUtil.addTimeOut(1000, () => {
                    var $tm: number = GameData.getSeverTime() - GameData.getStorageSyncNumber("onlineTm");
                    if ($tm > GameData.severinfo.onlinegame.intervaltime * 1000) {
                        this.showDuobaoPanda();
                    }
                })
            }
   

        }
        private showDuobaoPanda(): void {
            /*
            var obj: PandaMeshData = new PandaMeshData();
            obj.url = Scene_data.fileRoot + "ui/panda/13.png";
            obj.type = PandaMeshData.type1;
            obj.key = PandaMeshData.key13
            obj.data = new online.OnlineEvent(online.OnlineEvent.SHOW_ONLINE_START_PANEL)
            var $topUiViewEvent: rightpanda.RightPandaEvent = new rightpanda.RightPandaEvent(rightpanda.RightPandaEvent.SHOW_PANDA_INFO);
            $topUiViewEvent.data = obj
            Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent)
            */
            PandaMeshData.showRightPanda(PandaMeshData.key13, Scene_data.fileRoot + "ui/panda/13.png", new OnlineStartEvent(OnlineStartEvent.SHOW_ONLINE_START_PANEL))
        }
        private addEvets(): void {
 
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onMouseMove, this);
            canonkey.Physics.world.gravity = canonkey.Physics.Vec3dW2C(new Pan3d.Vector3D(0, -Physics.gravity980, 0));
            TimeUtil.addFrameTick(this.frameFun)
      
        }
        private upFrame(): void {
            if (GameData.gameType == 3) {
                OnlineManager.getInstance().upFrame();
                OnlineUserAiModel.getInstance().upFrame();
            }
        }
        private removeEvens(): void {
            Scene_data.uiBlankStage.removeEventListener(InteractiveEvent.Down, this.onMouseDown, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            Scene_data.uiBlankStage.removeEventListener(InteractiveEvent.Move, this.onMouseMove, this);
            TimeUtil.removeFrameTick(this.frameFun);
        }


        private onMouseMove($evt: InteractiveEvent): void {
            var $v2d: Pan3d.Vector2D=new Pan3d.Vector2D($evt.x, $evt.y)
            if (GameData.gameType == 3) {
                if (GameDataModel.mouseDownPosint) {
                    var $k: Pan3d.Vector2D = $v2d;
                    $k = $k.subtract(GameDataModel.mouseDownPosint)
                    GameDataModel.modelRotation.x = GameDataModel.lastRotation.x + $k.x / 15;
                    GameDataModel.modelRotation.z = GameDataModel.lastRotation.z + $k.y / 15;
                    var $maxRoation45: number = 40
                    GameDataModel.modelRotation.x = Math.min($maxRoation45, Math.max(GameDataModel.modelRotation.x, -$maxRoation45))
                    GameDataModel.modelRotation.z = Math.min($maxRoation45, Math.max(GameDataModel.modelRotation.z, -$maxRoation45))
                    GameDataModel.setWorldGravityByModelRotatioin()
                }
            }
        }
        private onMouseDown($evt: InteractiveEvent): void {
            var $v2d: Pan3d.Vector2D=new Pan3d.Vector2D($evt.x, $evt.y)
    
       
            if (!GameData.hasWinPanel) { //只有一组UI
                GameDataModel.mouseDownPosint = $v2d
                GameDataModel.lastRotation.x = GameDataModel.modelRotation.x;
                GameDataModel.lastRotation.y = GameDataModel.modelRotation.y;
                GameDataModel.lastRotation.z = GameDataModel.modelRotation.z;

            }  
        }
        private onMouseUp($evt: InteractiveEvent): void {
             GameDataModel.mouseDownPosint = null
   
        }
    
 
        protected listenModuleEvents(): Array<BaseEvent> {
            return [
 
                new OnlineEvent(OnlineEvent.SHOW_ONLINE_MAIN_PANEL),
                new OnlineEvent(OnlineEvent.SHOW_ONLINE_FINISH_PANEL),
                new OnlineEvent(OnlineEvent.PLAY_ONLINE_SCENE_START),
                new OnlineEvent(OnlineEvent.CLEAR_ONLINE_SCENE_ALL),
                new OnlineEvent(OnlineEvent.TEST_FRIST_TIP_ONLINE_PLAY),
            ];
        }
    }
}