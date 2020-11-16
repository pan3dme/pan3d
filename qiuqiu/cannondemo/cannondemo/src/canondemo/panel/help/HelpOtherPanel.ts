module help {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager
    import Rectangle = Pan3d.Rectangle

    import SceneEvent = game.SceneEvent;
    import GameDataModel = game.GameDataModel;

    export class HelpOtherPanel extends basewin.BaseWinPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();
    
            this.width = 540
            this.height = 960
            this.center = 0;
            this.middle = 0;
 
          

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
            this.h5UIAtlas.setInfo("panelui/help/help.txt", "panelui/help/help.png", () => { this.loadConfigCom() });
        }
        private canCloseTime: number=0
        protected butClik(evt: InteractiveEvent): void {
            if (Pan3d.TimeUtil.getTimer() > this.canCloseTime) {
                this.hidePanel();
        
                GameData.hasdiamondsHavenum = GameData.hasdiamondsHavenum + GameData.getDiamodsByShareInput(game.GameDataModel.levelNum);
                ModuleEventManager.dispatchEvent(new SceneEvent(SceneEvent.DIAMONDS_SPRITE_HIT_EVENT));
      
                GameData.dispatchToLevel(GameData.helpBeforSelfLevel)

                console.log("关闭")
            }
        }
        private e_help_get_num_txt: UICompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas

       
            this.winRect = new Rectangle(0, 0, 400, 350)


            this.e_helper_pic = this.addChild(this._topRender.getComponent("e_helper_pic"));
            this.e_help_text_info = this.addChild(this._topRender.getComponent("e_help_text_info"));
             this.addChild(this._topRender.getComponent("e_help_get_daimand"));
            this.e_help_get_num_txt = this._topRender.getComponent("e_help_get_num_txt");

            

            this.addChild(this._topRender.getComponent("e_win_tittle_txt"));
 

            this.addEvntButUp("e_submit_but", this._topRender)


            this.uiLoadComplte = true;

            this.showPanel();
            this.refrish2Data(this.infoData)
        }
        private hidePanel(): void {
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, () => {
                Pan3d.UIManager.getInstance().removeUIContainer(this)
            });


        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this)
                this.canCloseTime = Pan3d.TimeUtil.getTimer() + 1000
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.e_help_get_num_txt.skinName, Pan3d.ColorType.Black000000 + "x" + GameData.getDiamodsByShareInput(game.GameDataModel.levelNum), 20)
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
              
            }
 
        }
        private e_help_get_daimand: UICompenent
        private e_help_text_info: UICompenent
        private e_helper_pic: UICompenent
 
        private infoData: HelpOtherVo
        public refrish2Data(value: HelpOtherVo): void {
            this.infoData = value
            if (this.uiLoadComplte && this.infoData) {
                console.log(this.infoData)
                var $url: string = getWxAvatar132UrlByUrl(this.infoData.userAvatarUrl);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.e_help_text_info.skinName,"我成功的帮助了"+ this.infoData.userNickName, 20, TextAlign.CENTER, Pan3d.ColorType.Black000000);
                GameData.loadImgByPicUrl($url,
                    ($img: any) => {
                        var rec: Pan3d.UIRectangle = this._topRender.uiAtlas.getRec(this.e_helper_pic.skinName);
                        this._topRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                        this._topRender.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                        Pan3d.TextureManager.getInstance().updateTexture(this._topRender.uiAtlas.texture, rec.pixelX, rec.pixelY, this._topRender.uiAtlas.ctx);
                    });
                var $helpdata: any = GameData.getStorageSync("helpdata");
                if (!$helpdata) {
                    $helpdata = {};
                }
                var $tadayStr: string = Pan3d.TimeUtil.getLocalTime0(GameData.getSeverTime() / 1000);
                if ($helpdata.date != $tadayStr) {
                    $helpdata.date = $tadayStr
                    $helpdata.helpnum = 0
                    $helpdata.isget = false
                }
                $helpdata.helpnum++
                GameData.setStorageSync("helpdata", $helpdata);
            }
        }

    }
}