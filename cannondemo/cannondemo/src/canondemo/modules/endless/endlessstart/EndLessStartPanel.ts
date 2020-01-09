module endless {
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
    import TimeUtil = Pan3d.TimeUtil

    import Physics = canonkey.Physics;

    import SceneEvent = game.SceneEvent;
    import GameDataModel = game.GameDataModel;
    import PandaMeshData = rightpanda.PandaMeshData

    import EndlessManager = endless.EndlessManager;
    import EndLessEvent = endless.EndLessEvent;


    export class EndLessStartPanel extends H5UIConatiner {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public constructor() {
            super();
            this.interfaceUI = false
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
            this.h5UIAtlas.setInfo("ui/endless/endless.txt", "ui/endless/endless.png", () => { this.loadConfigCom() });
        }
        protected butClik(evt: InteractiveEvent): void {
            this.hidePanel();
            Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.HIDE_MAIN_UI_PANEL))
            Pan3d.ModuleEventManager.dispatchEvent(new EndLessEvent(EndLessEvent.ENDLESS_MODEL_START))
            Pan3d.ModuleEventManager.dispatchEvent(new EndLessEvent(EndLessEvent.SHOW_ENDLESS_TOP_PANEL))
            Pan3d.ModuleEventManager.dispatchEvent(new EndLessEvent(EndLessEvent.SHOW_ENDLESS_LEFT_RANK_PANEL))
            
          //  Pan3d.ModuleEventManager.dispatchEvent(new endless.EndLessLeftRankEvent(endless.EndLessLeftRankEvent.SHOW_ENDLESS_LEFT_RANK_PANEL))
        }
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas


            var a_tip_bg: UICompenent = this.addChild(this._bottomRender.getComponent("a_tip_bg"));
            a_tip_bg.top = 0;
            a_tip_bg.left = 0;
            a_tip_bg.width = 540 * Pan3d.UIData.Scale;
            a_tip_bg.height = 960 * Pan3d.UIData.Scale;


            this.addEvntButUp("a_base_but_bg0", this._midRender)
            this.addChild(this._topRender.getComponent("a_start_endless"));

            this.uiLoadComplte = true;

            this.showPanel()


        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this)
            } else {
                this.h5UIAtlas.testLoading();
            }
        }
        public hidePanel(): void {
            Pan3d.UIManager.getInstance().removeUIContainer(this)

            PandaMeshData.hideCentenTxtInfoType2(PandaMeshData.key101);
        }


    }
}