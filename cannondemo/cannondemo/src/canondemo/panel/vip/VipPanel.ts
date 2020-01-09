module vip {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;

    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import SelectButton = Pan3d.SelectButton;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import TimeUtil = Pan3d.TimeUtil;
    import Vector3D = Pan3d.Vector3D;
    import Vector2D = Pan3d.Vector2D;
    import Scene_data = Pan3d.Scene_data;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager
    import FrameCompenent = Pan3d.FrameCompenent
    import FrameTipCompenent = Pan3d.FrameTipCompenent
    import FrameUIRender = Pan3d.FrameUIRender

    import GameLevelManeger = game.GameLevelManeger;
    import GameDataModel = game.GameDataModel;
    import SceneEvent = game.SceneEvent;

 
    export class VipPanel extends H5UIConatiner {

        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();
         
            this.width = 540
            this.height = 960
            this.center = 0;
            this.middle = 0;

            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/vip/vip.txt", "panelui/vip/vip.png", () => { this.loadConfigCom() });

        }

        private a_gfit_bg_pic: UICompenent;
        private a_gift_bg_time_txt: UICompenent;
        private loadConfigCom(): void {


            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas



            this.win_tip_bg = this.addChild(this._midRender.getComponent("v_win_tip_bg"));
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            this.win_tip_bg.addEventListener(InteractiveEvent.Down, this.butClik, this);

            this.v_close_but = this.addEvntButUp("v_close_but", this._topRender)

            this.v_share_but = this.addEvntButUp("v_share_but", this._topRender)

            this.v_frame_pic = this.addChild(this._topRender.getComponent("v_frame_pic"));

            this.addChild(this._topRender.getComponent("v_tittle_txt"));
 
 
           this.addChild(this._topRender.getComponent("v_tips_info_txt"));

        
            this.addChild(this._topRender.getComponent("v_message_txt"));

 


            this.uiLoadComplte = true;
            this.showExpEff()
  
            this.showPanel();



        }
    
        private expEff: FrameTipCompenent;
        private _effRender: FrameUIRender;
        private v_frame_pic: UICompenent
        public showExpEff(): void {

            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                var knum: number=5
                this._effRender.setImg("panelui/vip/vipframe.jpg", 10, 9, ($ui: any) => {
                    this.expEff = $ui;
                    this.expEff.x = this.v_frame_pic.x + knum
                    this.expEff.y = this.v_frame_pic.y + knum
                    this.expEff.width = this.v_frame_pic.width - knum*2
                    this.expEff.height = this.v_frame_pic.height - knum*2

                    this.expEff.speed = 1;
                    this.expEff.playOne(this);
                    this.expEff.play()
                })
            }

        }

        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.v_close_but:
                    this.hidePanel()
                    break;
                case this.v_share_but:
                    this.shareBut_Clik()
                    break
            }
        }
        private shareBut_Clik(): void {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo((value: number) => {
                if (value == 1) {
                    msgalert.AlertUtil.show("从聊天群进入可获得")
                }
            }, AllShareMeshVo.type12))
        }
        private v_share_but: UICompenent
        private v_close_but: UICompenent
 
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
 
            } else {
                this.h5UIAtlas.testLoading();
            }

        }
        public hidePanel(): void {
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, () => {
                UIManager.getInstance().removeUIContainer(this);

            });
        }






    }
}