module megame {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import TimeUtil = Pan3d.TimeUtil
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager


    import SceneEvent = game.SceneEvent;
    import GameDataModel = game.GameDataModel;

    export class MeGamePanel extends H5UIConatiner {
        private _bottomRender: UIRenderComponent;
 


        public constructor() {
            super();
     
            this.width = 540
            this.height = 960
            this.center = 0;
            this.top = 0;

            this.interfaceUI = true

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
  
            this.timeFun = () => { this.upFrame(); }
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/megame/megame.txt", "panelui/megame/megame.png", () => { this.loadConfigCom() });


        }
   
    
        public onAdd(): void {
            TimeUtil.addFrameTick(this.timeFun)
        }

        public onRemove(): void {
            TimeUtil.removeFrameTick(this.timeFun)
        }
        public hidePanel(): void {
            UIManager.getInstance().removeUIContainer(this);
        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
 
        }
        private timeFun: any
        private a_tip_bg: UICompenent
        private loadConfigCom(): void {
   
            this._bottomRender.uiAtlas = this.h5UIAtlas;
 
            this.a_top_move_pic = this.addEvntBut("a_top_move_pic", this._bottomRender)
            this.uiLoadComplte = true;
            this.showPanel();
        
        }
        private upFrame(): void {

            if (this.a_top_move_pic) {
                var $tm: number = TimeUtil.getTimer();
                $tm = $tm % 5000;
                if ($tm < 1500) {
                    $tm = $tm;
                    this.a_top_move_pic.x = this.a_top_move_pic.baseRec.x + Math.sin(($tm / 1500) * 3 * Math.PI * 2) * 30
                } else {
                    this.a_top_move_pic.x = this.a_top_move_pic.baseRec.x
                }
                var $ps = this.getMenuButtonBoundingClientRect()
                if ($ps) {
                    this.a_top_move_pic.top = $ps.top+10;
                }

            }

          

        }
        public getMenuButtonBoundingClientRect(): any {
            return null
        }
        private a_top_move_pic: UICompenent

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {

                case this.a_top_move_pic:
                    this.hidePanel()
                    break
                default:
                    break
            }

        }
 



    }
    
}