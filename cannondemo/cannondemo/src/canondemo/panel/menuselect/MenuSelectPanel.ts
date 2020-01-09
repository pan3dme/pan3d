module menuselectpan {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import InteractiveEvent = Pan3d.InteractiveEvent;

    export class MenuSelectPanel extends H5UIConatiner {
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
            this.h5UIAtlas.setInfo("panelui/menuselect/menuselect.txt", "panelui/menuselect/menuselect.png", () => { this.loadConfigCom() });

        }

        private c_game_star_but: UICompenent
        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.m_select_skin_txt:
                    Pan3d.ModuleEventManager.dispatchEvent(new skinui.SkinListEvent(skinui.SkinListEvent.SHOW_SKIN_LIST_PANEL));
                    break;
                case this.m_select_level_txt:
                    Pan3d.ModuleEventManager.dispatchEvent(new selectlevel.SelectLevelEvent(selectlevel.SelectLevelEvent.SHOW_SELECT_LEVEL));
                    break;
                case this.m_select_sys_txt:
                    Pan3d.ModuleEventManager.dispatchEvent(new setupui.SetupWinEvent(setupui.SetupWinEvent.SHOW_SETUP_WIN_PANEL));
                    break;
                case this.m_select_rank_txt:
                    Pan3d.ModuleEventManager.dispatchEvent(new rank.RankEvent(rank.RankEvent.SHOW_RANK_PANEL));
                    break
                case this.m_tip_bg:
                    break;

       
                default:
                    break

            }
            this.hidePanel()
        }
        private hidePanel(): void {
            Pan3d.UIManager.getInstance().removeUIContainer(this)
        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
            } else {
                this.h5UIAtlas.testLoading();
            }
        }
        private c_tip_bg: UICompenent;
        private m_tip_bg: UICompenent;
        private m_select_sys_txt: UICompenent;
        private m_select_rank_txt: UICompenent;
        private m_select_skin_txt: UICompenent;
        private m_select_level_txt: UICompenent;

    
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas


            this.m_tip_bg = this.addEvntButUp("m_tip_bg", this._bottomRender)
            this.m_tip_bg.top = 0;
            this.m_tip_bg.left = 0;
            this.m_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.m_tip_bg.height = 960 * Pan3d.UIData.Scale;

            this.m_select_sys_txt = this.addEvntButUp("m_select_sys_txt", this._midRender);
            this.m_select_rank_txt = this.addEvntButUp("m_select_rank_txt", this._midRender);
            this.m_select_skin_txt = this.addEvntButUp("m_select_skin_txt", this._midRender);
            this.m_select_level_txt = this.addEvntButUp("m_select_level_txt", this._midRender);
 
            this.uiLoadComplte = true;
            this.showPanel()
        }

    }
}