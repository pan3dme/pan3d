module guidehand {
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



    export class GuideHandPanel extends H5UIConatiner {

        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();
            this.interfaceUI = true;
            this.width = 540
            this.height = 960
            this.center = 0;
            this.middle = 0;

            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);


            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/guide/guide.txt", "panelui/guide/guide.png", () => { this.loadConfigCom() });

        }


        private a_tittle_level_bg: UICompenent
        private loadConfigCom(): void {


            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas

            this.a_guide_head_pic = this.addEvntButUp("a_guide_head_pic", this._topRender)

            this.uiLoadComplte = true

            this.showPanel();
        }
        private a_guide_head_pic: UICompenent;
        public upData(): void {

            if (game.GameDataModel.levelNum == 1) {
                this.a_guide_head_pic.x = this.a_guide_head_pic.baseRec.x + Math.cos((TimeUtil.getTimer() / 10) * Math.PI / 180) * 100;
            }
            if (game.GameDataModel.levelNum ==2) {
                this.a_guide_head_pic.y = this.a_guide_head_pic.baseRec.y + Math.cos((TimeUtil.getTimer() / 10) * Math.PI / 180) * 100+50;
            }
            

        }
 
 

        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                TimeUtil.addFrameTick(() => { this.upData() });

               
            } else {
                this.h5UIAtlas.testLoading();
            }

        }
        public hidePanel(): void {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
            TimeUtil.removeFrameTick(() => { this.upData() });
            rightpanda.PandaMeshData.hideCentenTxtInfoType2(rightpanda.PandaMeshData.key104)
        }







    }
}