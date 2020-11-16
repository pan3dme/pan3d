module leveluppan {
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
    import Scene_data = Pan3d.Scene_data
    
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent

    import SceneEvent = game.SceneEvent;
    import GameDataModel = game.GameDataModel;

    import PandaMeshData = rightpanda.PandaMeshData
 
    

    export class LeveBestUIRenderOnlyPicComponent extends UIRenderOnlyPicComponent {
        private _rect: Pan3d.Rectangle
        public constructor($rect: Pan3d.Rectangle) {
            super();
            this._rect = $rect
            
            this.textureRes = new Pan3d.TextureRes()
          
          
        }
        public changeRendrDataByVc($vcId: number, ty: number) {
            super.makeRenderDataVc($vcId);
            for (var i: number = 0; i < this.renderData2.length / 4; i++) {
                this.renderData2[i * 4 + 0] = this._rect.width;
                this.renderData2[i * 4 + 1] = this._rect.height;
                this.renderData2[i * 4 + 2] = this._rect.x;
                this.renderData2[i * 4 + 3] = this._rect.y;;
            }
        }
       
        public makeRenderDataVc($vcId: number): void {
            super.makeRenderDataVc($vcId);
            this.changeRendrDataByVc($vcId, 0);
        }
    }
    export class BestFriendPanel extends H5UIConatiner {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        private _rankUseRend: LeveBestUIRenderOnlyPicComponent

        public constructor() {
            super();

            this.width = 540
            this.height = 960
            this.center = 0;
            this.middle = 0;

            this.interfaceUI = true

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this._rankUseRend = new LeveBestUIRenderOnlyPicComponent(new Pan3d.Rectangle(0, 0, 256 / 512, 256 / 512));
            this.addRender(this._rankUseRend);

            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/levelup/levelup.txt", "panelui/levelup/levelup.png", () => { this.loadConfigCom() });

        }
        private c_game_star_bg: UICompenent;
   
        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.u_temp_level_rank:
                    this.hidePanel();
                    break
                default:
                    break
            }
        }
      
    
        private hidePanel(): void {
            GameData.needDrawWxpublicTexture = false;
            if (this.uiLoadComplte && this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }

        }
        private canCloseTm: number = 0;
 
        public showPanel(): void {
            if (this.uiLoadComplte && !this.hasStage) {
  
                Pan3d.UIManager.getInstance().addUIContainer(this);
                GameData.needDrawWxpublicTexture = true;
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
                this._rankUseRend.textureRes.texture = GameData.wx_public_cavans_texture;

                this.canCloseTm = Pan3d.TimeUtil.getTimer() + 1000*8
                Pan3d.TimeUtil.addTimeOut(1000*8, () => {
                    if (Pan3d.TimeUtil.getTimer() >= this.canCloseTm) { //说明是同一个打开对象
                        this.hidePanel();
                    }
                 
                })
            } else {
                this.h5UIAtlas.testLoading();
            }
        }
   
        private u_temp_level_rank: UICompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas

       
            this._rankUseRend.uiAtlas = this._bottomRender.uiAtlas;
            this.u_temp_level_rank = this.addEvntBut("u_temp_level_rank",this._rankUseRend)
            this.uiLoadComplte = true;
            this.showPanel();



        }

    }
}