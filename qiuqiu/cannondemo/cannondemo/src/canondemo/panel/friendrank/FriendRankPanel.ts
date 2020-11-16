module friendrank {
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


    export class RankUIRenderOnlyPicComponent extends UIRenderOnlyPicComponent {
        public constructor($rect: Pan3d.Rectangle) {
            super();
            if (!GameData.wx_public_cavans_texture) {
                GameData.wx_public_cavans_texture = Pan3d.Scene_data.context3D.creatTexture(1024, 1024)
            }
            this.textureRes = new Pan3d.TextureRes()
            this.textureRes.texture = GameData.wx_public_cavans_texture;

        }
        public changeRendrDataByVc($vcId: number, ty: number) {
            super.makeRenderDataVc($vcId);
            for (var i: number = 0; i < this.renderData2.length / 4; i++) {
                this.renderData2[i * 4 + 0] = 400 / 1024;
                this.renderData2[i * 4 + 1] = 500 / 1024
                this.renderData2[i * 4 + 2] = 0;
                this.renderData2[i * 4 + 3] = 0;;
            }
        }
        public makeRenderDataVc($vcId: number): void {
            super.makeRenderDataVc($vcId);
            this.changeRendrDataByVc($vcId, 0);
        }
    }

    export class FriendRankPanel extends H5UIConatiner {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        private _rankUIRender : RankUIRenderOnlyPicComponent

        public constructor() {
            super();

            this.width = 540
            this.height = 960
            this.center = 0;
            this.middle = 0;


            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);


            this._rankUIRender = new RankUIRenderOnlyPicComponent(new Pan3d.Rectangle());
            this.addRender(this._rankUIRender);

  
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/friendrank/friendrank.txt", "panelui/friendrank/friendrank.png", () => { this.loadConfigCom() });


        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_win_close:
                    this.hidePanel()
                    break
                default:
                    break
            }
       

        }
        private hidePanel(): void {
            if (this.uiLoadComplte) {
                this.TweenLiteScale(UIData.Scale, 0.1, 0.2, () => {
                    UIManager.getInstance().removeUIContainer(this)
                    GameData.needDrawWxpublicTexture = false;
                });
            }

        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                GameData.needDrawWxpublicTexture = true;
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
            } else {
                this.h5UIAtlas.testLoading();
            }

        }
        public resize(): void {
            super.resize();

        }
     
        private drawSelfInfo(value: number): void {
 
            if (GameData.userInfo) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_self_rank_id.skinName, String(value), 16, TextAlign.CENTER, ColorType.Black000000);
                this._topRender.uiAtlas.upDataWebPicToTexture(GameData.userInfo.avatarUrl, this.a_self_icon.skinName);

                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_self_name.skinName, GameData.userInfo.nickName, 16, TextAlign.CENTER, ColorType.Black000000);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_self_res_txt.skinName, String(GameData.hasdiamondsHavenum) , 16, TextAlign.CENTER, ColorType.Black000000);
    
            }
        }
        private a_win_close: UICompenent
  
  
        private a_self_rank_id: UICompenent
        private a_self_icon: UICompenent
        private a_self_name: UICompenent
        private a_self_res_txt: UICompenent
        private wx_ctx_ui: UICompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas


            this.win_tip_bg = this.addChild(this._bottomRender.getComponent("a_tip_bg"));
 


            this.addChild(this._midRender.getComponent("a_win_bg"));
 
            this.a_win_close = this.addEvntButUp("a_win_close", this._midRender)


            this.addChild(this._topRender.getComponent("a_res_label"));
            this.addChild(this._topRender.getComponent("a_name_label"));
            this.addChild(this._topRender.getComponent("a_icon_label"));
            this.addChild(this._topRender.getComponent("a_id_label"));

            this.addChild(this._midRender.getComponent("a_self_rank_bg"));


            this.a_self_rank_id = this.addChild(this._topRender.getComponent("a_self_rank_id"));
            this.a_self_icon = this.addChild(this._topRender.getComponent("a_self_icon"));
            this.a_self_name = this.addChild(this._topRender.getComponent("a_self_name"));
            this.a_self_res_txt = this.addChild(this._topRender.getComponent("a_self_res_txt"));
            


            this._rankUIRender.uiAtlas = this._bottomRender.uiAtlas;
            this.wx_ctx_ui = this.addChild(this._rankUIRender.getComponent("wx_ctx_ui"));


            this.uiLoadComplte = true;

            this.showPanel()

        }

      




    }
}