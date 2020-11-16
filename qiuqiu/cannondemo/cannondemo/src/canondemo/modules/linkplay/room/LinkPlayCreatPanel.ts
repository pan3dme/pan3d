module linkplay {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import FrameCompenent = Pan3d.FrameCompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager
    import TimeUtil = Pan3d.TimeUtil
    import ColorType = Pan3d.ColorType
    import Rectangle = Pan3d.Rectangle
    import SListItemData = Pan3d.SListItemData




    export class LinkPlayCreatPanel extends basewin.BaseWinPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();
        }
        protected baseWindowLoadFinish(): void {
            super.baseWindowLoadFinish()

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/linkplay/room/room.txt", "panelui/linkplay/room/room.png", () => { this.loadConfigCom() });
        }
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, -20, 400, 500);


  
            this.addChild(this._topRender.getComponent("c_room_name"));
            this.addChild(this._topRender.getComponent("c_win_tittle"));

   
            this.mapUiItem = new Array
            for (var i: number = 0; i < GameData.severinfo.linkplaymap.length; i++) {
                var mc: FrameCompenent = this.addEvntBut("c_map_frame", this._topRender);
                mc.x = mc.baseRec.x + i % 3 * 100
                mc.y = mc.baseRec.y + Math.floor( i / 3) * 100
                mc.goToAndStop(i)
                mc.data = GameData.severinfo.linkplaymap[i]
                this.mapUiItem.push(mc)
            }


            this.c_confirm_bg=  this.addEvntBut("c_confirm_bg", this._midRender)
            this.c_cancel_bg=  this.addEvntBut("c_cancel_bg", this._midRender)
 

            this.addChild(this._topRender.getComponent("c_confirm_txt"));
            this.addChild(this._topRender.getComponent("c_cancel_txt"));
 
            this.uiLoadComplte = true
            this.showPanel();

        }
        private mapUiItem: Array<FrameCompenent>
        private drawAllPicRefrish(value: any): void {
            this.selectMap = value
            for (var i: number = 0; i < this.mapUiItem.length; i++) {
                this.drawPicToUi(this.mapUiItem[i])
            }
        }
        private selectMap: any
        private drawPicToUi($ui: FrameCompenent): void {
            var picurl: string = $ui.data.pic
            GameData.loadImgByPicUrl(Scene_data.fileRoot+ picurl,
                ($img: any) => {
                    var $toRect: Pan3d.Rectangle = $ui.getSkinCtxRect();
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                    var context = $ctx
                    context.fillStyle = "rgba(66,66,66,0)";
                    context.fillRect(0, 0, $toRect.width, $toRect.width);
                    $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);
                    if (this.selectMap == $ui.data) {
                        $ctx.fillStyle = "rgba(255,255,255,1)";
                        $ctx.fillRect(0, 0, 5, $toRect.height);
                        $ctx.fillRect(0, 0, $toRect.width, 5);
                        $ctx.fillRect(0, $toRect.height - 5, $toRect.width, 5);
                        $ctx.fillRect($toRect.width - 5, 0, 5, $toRect.height);
                    }
                    $ui.drawToCtx(this._topRender.uiAtlas, $ctx);

                });
        }


        private c_confirm_bg: UICompenent
        private c_cancel_bg: UICompenent;


        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.c_confirm_bg:
                    MsEngine.getInstance().createRoom(this.selectMap);
                    this.hidePanel();
                    break
                case this.c_cancel_bg:
                    Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL));
                    this.hidePanel();
                    break
                case this.base_win_close:
                    this.hidePanel();
                    break
                default:
                    if ((<UICompenent>evt.target).name == "c_map_frame") {
                        this.drawAllPicRefrish((<UICompenent>evt.target).data )
                    }
                    break
            }

        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.drawAllPicRefrish(GameData.severinfo.linkplaymap[2])
                MsEngine.linkplayGamestatus = 0
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        }
        public hidePanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().removeUIContainer(this)
            }


        }
    }
}