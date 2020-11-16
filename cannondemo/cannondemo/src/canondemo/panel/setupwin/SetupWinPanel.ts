module setupui {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import Rectangle = Pan3d.Rectangle

    export class SetupWinPanel extends basewin.BaseWinPanel {
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
            this.h5UIAtlas.setInfo("panelui/setupwin/setupwin.txt", "panelui/setupwin/setupwin.png", () => { this.loadConfigCom() });



        }
        private c_game_star_but: UICompenent
        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.base_win_close:
                    this.hidePanel()
                    break;
                case this.o_volume_but:
                    GameData.setStorageSync("o_volume_but", this.o_volume_but.selected)
                    break;
                case this.o_shake_but:
                    GameData.setStorageSync("o_shake_but", this.o_shake_but.selected)
                    break;
                case this.o_clear_but:
                    msgalert.AlertUtil.show("是否的要清档。\n这样将会把记录全部归0.", "b", (value: any) => {
                        if (value == 1) {
                            var openid: string = GameData.getStorageSync("openid");
                            GameData.clearStorageSync();
                            GameData.setStorageSync("openid", openid)
                            GameData.initGameGetAllSync(() => {
                                game.GameDataModel.levelNum = 1;
                                GameData.dispatchToLevel(game.GameDataModel.levelNum);
                                GameData.skinType = 4; //首次进来给足球
                                GameData.setStorageSync("skinType", GameData.skinType);
                                game.GameDataModel.centenBall.changeSkinById(GameData.skinType);
                                this.hidePanel()
                            });
                        } 
                    },2)
                    break;
                default:
                    break

            }
        
        }
        private hidePanel(): void {
          
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, () => {
                Pan3d.UIManager.getInstance().removeUIContainer(this)

            });
        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.1, UIData.Scale);
            } else {
    
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        }
  
   


        
     

        private o_clear_but: UICompenent;
        private o_volume_but: Pan3d.SelectButton;
        private o_shake_but: Pan3d.SelectButton;
        private o_back_an: UICompenent

        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas



            this.winRect = new Rectangle(0, 0, 450, 250)

            this.o_volume_but = this.addEvntBut("o_volume_but", this._topRender)
            this.o_shake_but = this.addEvntBut("o_shake_but", this._topRender)

  
            this.win_tip_bg.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);

            this.addChild(this._topRender.getComponent("o_volume_txt"));
            this.addChild(this._topRender.getComponent("o_shake_txt"));

            this.addChild(this._topRender.getComponent("o_win_tittle"));
   
            
            this.o_clear_but = this.addEvntBut("o_clear_but", this._topRender)

            this.resetButState()

            this.uiLoadComplte = true
            this.showPanel()
        }
        private resetButState(): void {
            this.o_volume_but.selected = GameData.getStorageSync("o_volume_but");
            this.o_shake_but.selected = GameData.getStorageSync("o_shake_but");
   
        }

    }
}