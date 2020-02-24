module basewin {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import UIManager = Pan3d.UIManager;
    import UIAtlas = Pan3d.UIAtlas;
    import SListItemData = Pan3d.SListItemData
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ColorType = Pan3d.ColorType;
    import Rectangle = Pan3d.Rectangle;

    export class BaseWinPanel extends H5UIConatiner {
        private _baseTipBgUiRender: UIRenderComponent;
        private _baseBotUiRender: UIRenderComponent;
        private _baseMidUiRender: UIRenderComponent;
        private _baseTopUiRender: UIRenderComponent;
        protected _winRect: Rectangle
        public constructor() {
            super();

            this.width = 540
            this.height = 960
            this.center = 0;
            this.middle = 0;

            this._winRect = new Rectangle(0,0,300,300)

            this._baseTipBgUiRender = new UIRenderComponent();
            this.addRender(this._baseTipBgUiRender);
            this._baseBotUiRender = new UIRenderComponent();
            this.addRender(this._baseBotUiRender);
            this._baseMidUiRender = new UIRenderComponent();
            this.addRender(this._baseMidUiRender);
            this._baseTopUiRender = new UIRenderComponent();
            this.addRender(this._baseTopUiRender);
    
            this._baseTipBgUiRender.uiAtlas = new H5UIAtlas;
            this._baseTipBgUiRender.uiAtlas.setInfo("panelui/basewin/basewin.txt", "panelui/basewin/basewin.png", () => { this.baseWindowLoadFinish() });

        }
        protected base_win_bg: UICompenent;
        protected base_win_close: UICompenent;
        protected base_title_bg: UICompenent
        protected baseWindowLoadFinish(): void {
            this._baseBotUiRender.uiAtlas = this._baseTipBgUiRender.uiAtlas;
            this._baseMidUiRender.uiAtlas = this._baseTipBgUiRender.uiAtlas;
            this._baseTopUiRender.uiAtlas = this._baseTipBgUiRender.uiAtlas;

            this.win_tip_bg = this.addChild(this._baseTipBgUiRender.getComponent("base_tip_bg"));
            this.win_tip_bg.top = 0;
            this.win_tip_bg.left = 0;
            this.win_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.win_tip_bg.height = 960 * Pan3d.UIData.Scale;


            
            this.base_title_bg = this.addChild(this._baseBotUiRender.getComponent("base_title_bg"));
            this.base_win_bg = this.addChild(this._baseMidUiRender.getComponent("base_win_bg"));
            this.base_win_close = this.addEvntButUp("base_win_close", this._baseTopUiRender)

            this.winRect = this._winRect;
        }
        public set winRect(value: Rectangle) {
            this._winRect = value
            if (this.base_win_close && this.base_win_bg) {
                this.base_win_bg.width = this._winRect.width
                this.base_win_bg.height = this._winRect.height
                this.base_win_bg.x = (540 - this._winRect.width) / 2 + this._winRect.x
                this.base_win_bg.y = (960 - this._winRect.height) / 2 + this._winRect.y

                this.base_win_close.x = this.base_win_bg.x + this._winRect.width - this.base_win_close.width + 20
                this.base_win_close.y = this.base_win_bg.y - 30 

                this.base_title_bg.y = this.base_win_bg.y - this.base_title_bg.height+15

                this._baseTopUiRender.applyObjData()

            }
            
        }
   






    }
}