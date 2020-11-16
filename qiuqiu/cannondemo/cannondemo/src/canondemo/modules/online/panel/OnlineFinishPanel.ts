module online {
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




    export class OnlineFinishPanel extends basewin.BaseWinPanel {
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
            this.h5UIAtlas.setInfo("panelui/online/online.txt", "panelui/online/online.png", () => { this.loadConfigCom() });
        }
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.winRect = new Rectangle(0, -20, 400, 400);


            this.addEvntBut("c_finish_but", this._midRender)
            this.addChild(this._topRender.getComponent("c_finish_but_txt"));


            this.addChild(this._topRender.getComponent("c_rank_id_txt"));
            this.addChild(this._topRender.getComponent("c_rank_pic"));
            this.addChild(this._topRender.getComponent("c_rank_name_txt"));
            this.addChild(this._topRender.getComponent("c_rank_res_txt"));

            

            this.userListUiArr = new Array
            for (var i: number = 0; i < 6; i++) {
                var $ui: FrameCompenent = <FrameCompenent>this.addChild(this._topRender.getComponent("c_user_list_rank"));
                $ui.goToAndStop(i)
                $ui.y = $ui.baseRec.y + 35 * i
                this.userListUiArr.push($ui)
            }

            this.uiLoadComplte = true
            this.showPanel();

        }
        private userListUiArr: Array<FrameCompenent>
        private drawList(): void {
            OnlineManager.getInstance().onleuserlist.sort((a: OnlineUserVo, b: OnlineUserVo) => { return a.num > b.num ? -1 : 1 });
            for (var i: number = 0; i < this.userListUiArr.length; i++) {
                var $onlineUserVo: OnlineUserVo = OnlineManager.getInstance().onleuserlist[i]
             
                var $ui: FrameCompenent = this.userListUiArr[i]
                this.drawPicToUi($ui, $onlineUserVo,i)
            }

        }
        private drawPicToUi($temp: FrameCompenent, $onlineUserVo: OnlineUserVo, $rank: number): void {
            GameData.loadImgByPicUrl($onlineUserVo.avatar,
                ($img: any) => {
                    var $toRect: Pan3d.Rectangle = $temp.getSkinCtxRect();
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);

    
                    LabelTextFont.writeSingleLabelToCtx($ctx, String($rank+1), 18, 0, 0, Pan3d.TextAlign.LEFT, Pan3d.ColorType.Black000000);
                    var pictx: number=30
                    $ctx.drawImage($img, 0 + pictx, 0, 30, 30);

                    $ctx.fillStyle = "rgba(255,255,255,1)";
                    $ctx.fillRect(0 + pictx, 0, 2, 30);
                    $ctx.fillRect(0 + pictx, 0, 30, 2);
                    $ctx.fillRect(0 + pictx, 30 - 2, 30, 2);
                    $ctx.fillRect(30 + pictx - 2, 0, 2, 30);

                    LabelTextFont.writeSingleLabelToCtx($ctx, $onlineUserVo.name, 18, 10, 0, Pan3d.TextAlign.CENTER, Pan3d.ColorType.Black000000);

                    LabelTextFont.writeSingleLabelToCtx($ctx, String($onlineUserVo.num), 18, 100, 0, Pan3d.TextAlign.CENTER, Pan3d.ColorType.Black000000);

                    $temp.drawToCtx(this._topRender.uiAtlas, $ctx);

                });


        }

 
        protected butClik(evt: InteractiveEvent): void {

            for (var i: number = 0; i < OnlineManager.getInstance().onleuserlist.length; i++) {
                if (OnlineManager.getInstance().onleuserlist[i].openid == GameData.getStorageSync("openid")) {
                    GameData.hasdiamondsHavenum += OnlineManager.getInstance().onleuserlist[i].num
                }
            }

            var $tadayStr: string = Pan3d.TimeUtil.getLocalTime0(GameData.getSeverTime() / 1000);
            GameData.setStorageSync("onlineFristEveryDay", $tadayStr);
            this.hidePanel()
            ModuleEventManager.dispatchEvent(new OnlineEvent(OnlineEvent.CLEAR_ONLINE_SCENE_ALL))
        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.drawList()
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