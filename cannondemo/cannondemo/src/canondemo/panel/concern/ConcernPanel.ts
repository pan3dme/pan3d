module concern {
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

    export class ConcernPanel extends H5UIConatiner {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
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

            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/concern/concern.txt", "panelui/concern/concern.png", () => { this.loadConfigCom() });

        }
        private c_game_star_but: UICompenent
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
  
 
    
        private a_win_close: UICompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas

            this.win_tip_bg = this.addEvntBut("a_win_tip_bg", this._bottomRender);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);

            this.a_win_close = this.addEvntButUp("a_win_close", this._topRender);

 
            

            this.addChild(this._midRender.getComponent("a_win_bg"));
            this.addChild(this._topRender.getComponent("a_content_txt"));
            this.addChild(this._topRender.getComponent("a_win_tittle"));



            this.uiLoadComplte = true
            this.showPanel()
        }
     

    }
}