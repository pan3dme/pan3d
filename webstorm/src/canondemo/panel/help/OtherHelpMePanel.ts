module help {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import Rectangle = Pan3d.Rectangle
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager

    import SceneEvent = game.SceneEvent;
    import GameDataModel = game.GameDataModel;

    import PandaMeshData = rightpanda.PandaMeshData

    export class OtherHelpMePanel extends basewin.BaseWinPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();
            this.interfaceUI = true
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

        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.base_win_close:
                case this.d_cancel_but:
                    this.hidePanel();
                    ModuleEventManager.dispatchEvent(new HelpEvent(HelpEvent.CHECK_SELF_HELP_INFO));
                    break
                case this.d_submit_but:
                    this.hidePanel();
                    if (this._helpOtherVo.level <= GameDataModel.levelNum) {
                        GameDataModel.levelNum = this._helpOtherVo.level + 1
                        GameData.dispatchToLevel(GameDataModel.levelNum)
                    }
                    GameData.WEB_SEVER_EVENT_AND_BACK("check_help_info", "openid=" + GameData.getStorageSync("openid"))
                    GameData.clearPandaOrInof(2,1)
                    break
                default:
                    break


            }

        }

        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas

            this.winRect = new Rectangle(0, 0, 400, 350)
            

            this.addChild(this._topRender.getComponent("d_win_tittle_txt"));

            this.d_helper_centen_pic = this.addChild(this._topRender.getComponent("d_helper_centen_pic"));

            this.d_help_use_name = this.addChild(this._topRender.getComponent("d_help_use_name"));
            this.d_submit_to_next = this.addChild(this._topRender.getComponent("d_submit_to_next"));


            this.d_cancel_but = this.addEvntButUp("d_cancel_but", this._topRender)
            this.d_submit_but = this.addEvntButUp("d_submit_but", this._topRender)

            this.uiLoadComplte = true

            this.refrishData(this._helpOtherVo)

            this.showPanel()


        }
        private d_help_use_name: UICompenent
        private d_submit_to_next: UICompenent
        private d_cancel_but: UICompenent
        private d_submit_but: UICompenent
        private d_helper_centen_pic: UICompenent
 
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this)
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
           
            }
        }
        public hidePanel(): void {
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, () => {
                Pan3d.UIManager.getInstance().removeUIContainer(this)

                PandaMeshData.hideCentenTxtInfoType2(PandaMeshData.key101);
            });
       
        }
        private _helpOtherVo: HelpOtherVo
        public refrishData(value: HelpOtherVo): void {
            this._helpOtherVo = value;
            if (this.uiLoadComplte && this._helpOtherVo) {
                var helpInof: Array<string> = String(value.helper_info).split("|")
                var picUir: string = getWxAvatar132UrlByUrl( helpInof[1]);
                

                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.d_help_use_name.skinName, helpInof[0] + "帮助了我", 20, TextAlign.CENTER, Pan3d.ColorType.Black000000, "", 2);
                GameData.loadImgByPicUrl(picUir,
                    ($img: any) => {
                        var rec: Pan3d.UIRectangle = this._topRender.uiAtlas.getRec(this.d_helper_centen_pic.skinName);
                        this._topRender.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                        this._topRender.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                        Pan3d.TextureManager.getInstance().updateTexture(this._topRender.uiAtlas.texture, rec.pixelX, rec.pixelY, this._topRender.uiAtlas.ctx);
                    });
            }
        }

    }
}