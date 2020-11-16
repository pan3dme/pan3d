module bottommenuA {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;

    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import TimeUtil = Pan3d.TimeUtil;
    import Vector3D = Pan3d.Vector3D;
    import Scene_data = Pan3d.Scene_data;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager

    import GameLevelManeger = game.GameLevelManeger;
    import GameDataModel = game.GameDataModel;
    import SceneEvent = game.SceneEvent;



    export class BottomMenuPanel extends H5UIConatiner {

        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();
            this.interfaceUI = true;
            this.width = 540
            this.height = 960
            this.center = 0;
            this.top = 0;

            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);


            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/bottommenu/bottommenu.txt", "panelui/bottommenu/bottommenu.png", () => { this.loadConfigCom() });

        }


        private a_tittle_level_bg: UICompenent
        private loadConfigCom(): void {


            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas

          //  this.a_bottom_rigth_but=   this.addEvntButUp("a_bottom_rigth_but", this._topRender)
 
            this.uiLoadComplte = true

            this.showPanel();
        }
        private a_bottom_rigth_but: UICompenent
 
        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.a_bottom_rigth_but:
                    ModuleEventManager.dispatchEvent(new menuselectpan.MenuSelectEvent(menuselectpan.MenuSelectEvent.SHOW_MENU_SELECT_PANEL));

                    break
          
                default:
                    break

            }
        }
        public refrishUi(): void {
      
        }

 
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.refrishUi()
            } else {
                this.h5UIAtlas.testLoading();
            }

        }
        public hidePanel(): void {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
        }
        






    }
}