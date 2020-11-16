
module msgalert {
    import ListItemRender = Pan3d.ListItemRender
    import UIManager = Pan3d.UIManager
    import Rectangle = Pan3d.Rectangle
    import UIConatiner = Pan3d.UIConatiner
    import UIData = Pan3d.UIData
    import PuiData = Pan3d.PuiData
    import TextAlign = Pan3d.TextAlign
    import UIRenderComponent = Pan3d.UIRenderComponent
    import AlphaUIRenderComponent = Pan3d.AlphaUIRenderComponent
    import UiDraw = Pan3d.UiDraw
    import GridList = Pan3d.GridList
    import UIMask = Pan3d.UIMask
    import UIListRenderComponent = Pan3d.UIListRenderComponent
    import Vector2D = Pan3d.Vector2D
    import ListItemData = Pan3d.ListItemData
    import UICompenent = Pan3d.UICompenent
    import AlphaUICompenent = Pan3d.AlphaUICompenent
    import InteractiveEvent = Pan3d.InteractiveEvent
    import Scene_data = Pan3d.Scene_data
    import LabelTextFont = Pan3d.LabelTextFont
    import ColorType = Pan3d.ColorType


    export class AlertUtil extends H5UIConatiner {

        public static YES: number = 0x0001;
        public static NO: number = 0x0002;




        private _bgRender: UIRenderComponent
        private _bottomRender: UIRenderComponent
        private _midRender: UIRenderComponent
        private _topRender: UIRenderComponent;
        public handlerFun: Function
        constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

            this._bgRender = new UIRenderComponent;
            this.addRender(this._bgRender)

            this._bottomRender = new UIRenderComponent;
            this.addRender(this._bottomRender)

            this._midRender = new UIRenderComponent;
            this.addRender(this._midRender)

            this._topRender = new UIRenderComponent;
            this.addRender(this._topRender)

 
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/alert/alert.txt", "panelui/alert/alert.png", () => { this.loadConfigCom() });

        }
        private a_confirm: UICompenent;
        private a_cancel: UICompenent;

        private a_context: UICompenent
     


        private loadConfigCom(): void {
 

            this._bgRender.uiAtlas = this.h5UIAtlas
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas


            this.win_tip_bg = this.addChild(this._bgRender.getComponent("a_basebg"));//this.addEvntButUp("a_basebg", this._bottomRender);
            this.win_tip_bg.addEventListener(InteractiveEvent.Down, () => { }, this);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, () => { }, this);

            this.addChild(<UICompenent>this._midRender.getComponent("a_bg"));

            this.addChild(this._bottomRender.getComponent("a_tittle_bg"));

            this.a_context = this.addChild(<UICompenent>this._topRender.getComponent("a_context"));


            this.a_confirm = this.addEvntButUp("a_confirm", this._midRender);
            this.a_cancel = this.addEvntButUp("a_cancel", this._midRender);
            this.a_close_but = this.addEvntButUp("a_close_but", this._midRender);
            

            this.uiLoadComplte = true
            this.showPanel();
            this.refrish();
        }
        private a_close_but: UICompenent
        private hidePanel(): void {
            this.TweenLiteScale(UIData.Scale, 0.1,0.2, () => {
              UIManager.getInstance().removeUIContainer(this);
            });


        }
        private showPanel(): void {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.1, UIData.Scale);
            } else {
                this.h5UIAtlas.testLoading();
            }
         
        }
        protected butClik(evt: InteractiveEvent): void {
            this.hidePanel();
            if (this.handlerFun) {
                switch (evt.target) {
                    case this.a_confirm:
                        this.handlerFun(1);
                        break;
                    case this.a_cancel:
                        this.handlerFun(0);
                        break;
                    default:
                        this.handlerFun(0);
                        break;
                }
            }

        }
        private _contentTxt: string;
        private _tittleTxt: string;
        private _flags: number
        private _btnname: Array<string>
        private initData($text: string = "", $title: string = "", $flags: number = 0x4, closeHandler: Function = null, $btnname: Array<string>): void {
            this.handlerFun = closeHandler
            this._contentTxt = $text;
            this._tittleTxt = $title;
            this._flags = $flags
            this._btnname = $btnname

            this.refrish()
        }
        public refrish(): void {
            if (this.uiLoadComplte && this._contentTxt) {
                var $linenum: number=0
                for (var i: number = 0; i < this._contentTxt.length; i++) {
                    if (this._contentTxt.substr(i, 1) == "\n") {
                        $linenum++
                    }
                }
                this.a_context.y = this.a_context.baseRec.y - 10 * $linenum  +20
                LabelTextFont.writeTextAutoCenterByAnchor(this._topRender.uiAtlas, this.a_context.skinName, this._contentTxt, 22, ColorType.Brown6a4936, 300);

            }
            this.resize();
        }
        private static alertUtilPan: AlertUtil
        public static show(text: string = "", title: string = "", closeHandler: Function = null, flags: number = 2, $btnname: Array<string> = ["取消", "确定"]): AlertUtil {
            if (!this.alertUtilPan) {
                this.alertUtilPan = new AlertUtil();
            }
            this.alertUtilPan.initData(text, title, flags, closeHandler, $btnname);
            this.alertUtilPan.showPanel();
            return this.alertUtilPan;
        }
    }

    export class OnlyTopTxt extends H5UIConatiner {

        private _bottomRender: AlphaUIRenderComponent;
        private _topRender: AlphaUIRenderComponent;
        constructor() {
            super();
            this.width = UIData.designWidth;
            this.height = UIData.designHeight;
            this.center = 0;
            this.middle = 0;

        
            this.layer = 9999;
            this._bottomRender = new AlphaUIRenderComponent;
            this.addRender(this._bottomRender)

            this._topRender = new AlphaUIRenderComponent;
            this.addRender(this._topRender)
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/alert/alert.txt", "panelui/alert/alert.png", () => { this.loadConfigCom() });

        }
 

        private loadConfigCom(): void {


            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas

            
            this.b_top_only_bg = <AlphaUICompenent>this.addChild(this._bottomRender.getComponent("b_top_only_bg"));
            this.b_top_only_txt = <AlphaUICompenent> this.addChild(this._topRender.getComponent("b_top_only_txt"));
            this.uiLoadComplte = true
            this.showPanel();
            this.refrish();
        }
        private b_top_only_bg: AlphaUICompenent;
        private b_top_only_txt: AlphaUICompenent;
        private hidePanel(): void {
            UIManager.getInstance().removeUIContainer(this);
        }

        public onAdd(): void {
            this.timenum =3
            TweenLite.to(this, 4, {
                timenum: 0, onComplete: () => {
                    this.hidePanel();
                }
            });
       
        }
        private _timenum: number = 0;
        public set timenum(value: number) {
            this._timenum = value

            var $num: number = Math.min(this._timenum, 1)
            this.b_top_only_bg.alpha = $num;
            this.b_top_only_txt.alpha = $num;

            this.middle = $num * 100
       
 
        }
        public get timenum(): number {
            return this._timenum
        }

        public onRemove(): void {
            console.log("移出")
        }
        private showPanel(): void {
            if (this.uiLoadComplte) {
                if (!this.hasStage) {
                    UIManager.getInstance().addUIContainer(this);
                }
            
            } else {
                this.h5UIAtlas.testLoading();
            }
        }
        private topTxtTextStr: string
        private initData($text: string = ""): void {
            this.topTxtTextStr = $text;
            this.refrish()
        }
        public refrish(): void {
            if (this.uiLoadComplte && this.topTxtTextStr) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_top_only_txt.skinName, ColorType.Whiteffffff + this.topTxtTextStr, 20, TextAlign.CENTER);

                var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(10,10, false);


                var $textMetrics: TextMetrics = Pan3d.TextRegExp.getTextMetrics($ctx, this.topTxtTextStr)

                this.b_top_only_bg.width = $textMetrics.width*1.8
                this.b_top_only_bg.height = 35
                this.b_top_only_bg.x = this.b_top_only_bg.baseRec.x - this.b_top_only_bg.width / 2
                this.b_top_only_bg.y = this.b_top_only_txt.y - 5
 
            }
            this.resize();
        }
        private static onlyTopTxt: OnlyTopTxt;
        public static show(text: string ): OnlyTopTxt {
            if (!this.onlyTopTxt) {
                this.onlyTopTxt = new OnlyTopTxt();
            }
            this.onlyTopTxt.initData(text);
            this.onlyTopTxt.showPanel();

            return this.onlyTopTxt;
        }
    }


}