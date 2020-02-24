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
    import InteractiveEvent = Pan3d.InteractiveEvent
    import Physics = canonkey.Physics;


    import SceneEvent = game.SceneEvent
    import GameDataModel = game.GameDataModel

    export class LinkPlayEvent extends BaseEvent {

        public static SHOW_LINK_PLAY_MAIN_PANEL: string = "SHOW_LINK_PLAY_MAIN_PANEL"

        public static CLEAR_LINKPLAY_SCENE_ALL: string = "CLEAR_LINKPLAY_SCENE_ALL"

        public static HIDE_LINK_PLAY_START_PANEL: string = "HIDE_LINK_PLAY_START_PANEL"


        public static MS_JOIN_ROOM_RESPONSE_EVENT: string = "MS_JOIN_ROOM_RESPONSE_EVENT"

        public static MS_LEAVE_ROOM_NOTIFY_EVENT: string = "MS_LEAVE_ROOM_NOTIFY_EVENT"

        
        public static MS_START_ENTER_SCENE_EVET: string = "MS_START_ENTER_SCENE_EVET"
        public static MS_CATCH_EVENT_NOTIFY: string = "MS_CATCH_EVENT_NOTIFY"

        public static SHOW_RECONNECT_TXT: string = "SHOW_RECONNECT_TXT"

        
    }
    export class LinkPlayModule extends Module {
        public getModuleName(): string {
            return "LinkPlayModule";
        }
        protected listProcessors(): Array<Processor> {
            return [
                new LinkPlayProcessor()
            ];
        }
    }
    export class LinkPlayProcessor extends BaseProcessor {
        public getName(): string {
            return "LinkPlayProcessor";
        }
        public constructor() {
            super()
            this.frameFun = () => { this.upFrame() }
        }
        private frameFun: Function
        protected receivedModuleEvent($event: BaseEvent): void {
            switch ($event.type) {
                case LinkPlayEvent.SHOW_LINK_PLAY_MAIN_PANEL:
                    if (!this._linkPlayMainUiPanel) {
                        this._linkPlayMainUiPanel = new LinkPlayMainUiPanel()
                    }
                    this._linkPlayMainUiPanel.showPanel();
                    break

                case LinkPlayEvent.CLEAR_LINKPLAY_SCENE_ALL:

                    console.log("清理")

                    Physics.ready = false
                    this.removeEvens()
                    LinkPlayManager.getInstance().clearAllOnline();
                    LinkUserListModel.getInstance().clearUser()
                    this._linkPlayMainUiPanel.hidePanel();;
                    //将世界属性设置回去
                    GameData.gameType = 1
                    Physics.world.defaultContactMaterial.restitution = 0.01;
                    Physics.world.defaultContactMaterial.friction = 0.01;
                    GameData.dispatchToLevel(GameDataModel.levelNum)
       
                    break
                case LinkPlayEvent.HIDE_LINK_PLAY_START_PANEL:
                    if (this._linkPlayStartPanel) {
                        this._linkPlayStartPanel.hidePanel();
                    }
         
                    break
                case LinkPlayEvent.MS_JOIN_ROOM_RESPONSE_EVENT:
                    if (!this._linkPlayStartPanel) {
                        this._linkPlayStartPanel = new LinkPlayStartPanel()
                    }
                    this._linkPlayStartPanel.showPanel();
                    break
                case LinkPlayEvent.SHOW_RECONNECT_TXT:
                    if (this._linkPlayMainUiPanel) {
                        this._linkPlayMainUiPanel.showReconnectTxt();
                    }
         
                    break
                    
                case LinkPlayEvent.MS_LEAVE_ROOM_NOTIFY_EVENT:
                    this._linkPlayStartPanel.refrishUserData();
                    break
                    
                case LinkPlayEvent.MS_CATCH_EVENT_NOTIFY:
                    LinkUserListModel.getInstance().setEventNotyfy($event.data)
                    break
                case LinkPlayEvent.MS_START_ENTER_SCENE_EVET:

                    MsEngine.linkplayGamestatus=2
                    this._linkPlayStartPanel.hidePanel();
                    Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.HIDE_MAIN_UI_PANEL))
                    LinkPlayManager.getInstance().startGame((res: any) => {
                        if (res.name = "canplay") {
                            LinkUserListModel.getInstance().makeUserListBall()
                            game.GameDataModel.focus3d.y = game.GameDataModel.centenBall.y;
                            ModuleEventManager.dispatchEvent(new LinkPlayEvent(LinkPlayEvent.SHOW_LINK_PLAY_MAIN_PANEL))
                            GameDataModel.levelStartTm = TimeUtil.getTimer();
                            MsEngine.getInstance().sendEventJason(JSON.stringify({ type: 1, tm: 0}));
                            TimeUtil.addTimeOut(2000, () => {
                                LinkPlayManager.getInstance().playOnlineGame();
                            })
                            this.addEvets();
                        }
                    });
                    break
                default:
                    break
            }

        }
        private _linkPlayMainUiPanel: LinkPlayMainUiPanel
        private addEvets(): void {

            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onMouseMove, this);
            canonkey.Physics.world.gravity = canonkey.Physics.Vec3dW2C(new Pan3d.Vector3D(0, -Physics.gravity980, 0));
            console.log(canonkey.Physics.world.gravity)
            TimeUtil.addFrameTick(this.frameFun)

        }
        private removeEvens(): void {
            Scene_data.uiBlankStage.removeEventListener(InteractiveEvent.Down, this.onMouseDown, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            Scene_data.uiBlankStage.removeEventListener(InteractiveEvent.Move, this.onMouseMove, this);
            TimeUtil.removeFrameTick(this.frameFun);
        }
        private onMouseMove($evt: InteractiveEvent): void {
            var $v2d: Pan3d.Vector2D = new Pan3d.Vector2D($evt.x, $evt.y)
            if (GameData.gameType == 4) {
                if (GameDataModel.mouseDownPosint) {
                    var $k: Pan3d.Vector2D = $v2d;
                    $k = $k.subtract(GameDataModel.mouseDownPosint)
                    GameDataModel.modelRotation.x = GameDataModel.lastRotation.x + $k.x / 15;
                    GameDataModel.modelRotation.z = GameDataModel.lastRotation.z + $k.y / 15;
                    var $maxRoation45: number = 40
                    GameDataModel.modelRotation.x = Math.min($maxRoation45, Math.max(GameDataModel.modelRotation.x, -$maxRoation45))
                    GameDataModel.modelRotation.z = Math.min($maxRoation45, Math.max(GameDataModel.modelRotation.z, -$maxRoation45))
                    GameDataModel.setWorldGravityByModelRotatioin();
                }
            }
        }
        private onMouseDown($evt: InteractiveEvent): void {
            var $v2d: Pan3d.Vector2D = new Pan3d.Vector2D($evt.x, $evt.y)
            var $play: boolean = true
            for (var i: number = 0; i < Pan3d.UIManager.getInstance()._containerList.length; i++) {
                if (Pan3d.UIManager.getInstance()._containerList[i].interfaceUI == false) {
                    $play = false
                }
            }
            if ($play) { //只有一组UI
                GameDataModel.mouseDownPosint = $v2d
                GameDataModel.lastRotation.x = GameDataModel.modelRotation.x;
                GameDataModel.lastRotation.y = GameDataModel.modelRotation.y;
                GameDataModel.lastRotation.z = GameDataModel.modelRotation.z;

            } else {

            }
        }
        private onMouseUp($evt: InteractiveEvent): void {
            GameDataModel.mouseDownPosint = null
        }

 

        private upFrame(): void {
            if (GameData.gameType == 4) {
                if (LinkUserListModel.getInstance().lastSendTm < TimeUtil.getTimer() && Physics.ready) {
                    LinkUserListModel.getInstance().sendMoveToSocket()
                }
                LinkPlayManager.getInstance().upFrame();

            }
        }
        private _linkPlayStartPanel: LinkPlayStartPanel
        protected listenModuleEvents(): Array<BaseEvent> {
            return [

                new LinkPlayEvent(LinkPlayEvent.SHOW_LINK_PLAY_MAIN_PANEL),

                new LinkPlayEvent(LinkPlayEvent.CLEAR_LINKPLAY_SCENE_ALL),
                new LinkPlayEvent(LinkPlayEvent.SHOW_RECONNECT_TXT),

                
                new LinkPlayEvent(LinkPlayEvent.MS_JOIN_ROOM_RESPONSE_EVENT),
                new LinkPlayEvent(LinkPlayEvent.MS_START_ENTER_SCENE_EVET),
                new LinkPlayEvent(LinkPlayEvent.MS_CATCH_EVENT_NOTIFY),
                new LinkPlayEvent(LinkPlayEvent.MS_LEAVE_ROOM_NOTIFY_EVENT),
            ];
        }
    }
}