module endless {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import FrameCompenent = Pan3d.FrameCompenent
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager
    import TimeUtil = Pan3d.TimeUtil
    import Vector3D = Pan3d.Vector3D
    import ColorType = Pan3d.ColorType

    import Physics = canonkey.Physics;

    import SceneEvent = game.SceneEvent;
    import GameDataModel = game.GameDataModel;

    export class EndLessRevivePanel extends H5UIConatiner {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _topTxtRender: UIRenderComponent;

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
            this._topTxtRender = new UIRenderComponent();
            this.addRender(this._topTxtRender);

            this.frameFun = () => { this.upFrame() }

            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("ui/endless/endless.txt", "ui/endless/endless.png", () => { this.loadConfigCom() });
        }
        private frameFun: Function

        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.c_revive_share_but:
                    var $tm: number = this.endTime - Pan3d.TimeUtil.getTimer()
                    if ($tm > 0) {
                        if (GameData.hasdiamondsHavenum >= EndlessManager.getInstance().layerNum) {
                            GameData.hasdiamondsHavenum -= EndlessManager.getInstance().layerNum;
                            EndlessManager.getInstance().revivePlay()
                            this.hidePanel();
                        } else {
                            msgalert.AlertUtil.show("你的钻石不足")
                        }

                    } else {
                        Pan3d.ModuleEventManager.dispatchEvent(new EndLessEvent(EndLessEvent.ENDLESS_MODEL_START))
                        this.hidePanel();
             
                    }
                    break

                default:
                    break

            }

        }
 


        private c_base_win_bg: UICompenent;
        private c_revive_share_but: UICompenent;
        private c_revive_info_txt: UICompenent;
        private r_need_diamond_num: UICompenent

        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas
            this._topTxtRender.uiAtlas = this.h5UIAtlas


            var r_tip_bg: UICompenent = this.addEvntBut("r_tip_bg", this._bottomRender)
            r_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            r_tip_bg.top = 0;
            r_tip_bg.left = 0;
            r_tip_bg.width = 540 * Pan3d.UIData.Scale;
            r_tip_bg.height = 960 * Pan3d.UIData.Scale;

            this.c_base_win_bg = this.addChild(this._midRender.getComponent("c_base_win_bg"));
            this.c_revive_share_but = this.addEvntButUp("c_revive_share_but", this._midRender)


            this.r_realplay_but_txt = <FrameCompenent> this.addChild(this._topTxtRender.getComponent("r_realplay_but_txt"));
            

  


            this.r_diamond_icon = this.addChild(this._topTxtRender.getComponent("r_diamond_icon"));
            this.r_need_diamond_num = this.addChild(this._topTxtRender.getComponent("r_need_diamond_num"));

    
            
            this.c_revive_info_txt = this.addEvntButUp("c_revive_info_txt", this._topTxtRender)
            this.r_wait_time = this.addChild(this._topTxtRender.getComponent("r_wait_time"));
 

            this.uiLoadComplte = true;

            this.showPanel();
        }
    
        private r_realplay_but_txt: FrameCompenent
        private r_diamond_icon: UICompenent
        private r_wait_time: UICompenent
        private upFrame(): void {
 

            if (this.uiLoadComplte && this.hasStage) {
                var $tm: number = this.endTime - Pan3d.TimeUtil.getTimer()
                var $labeStr: string 
                if ($tm > 0) {
                    $labeStr = String(Math.ceil($tm / 1000));
                   
                } else {
                    $labeStr = "0";
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_revive_info_txt.skinName, "已过可复活时间。请重新开始", 16, TextAlign.CENTER, ColorType.Black000000);
                    this.r_realplay_but_txt.goToAndStop(1);
                    this.r_realplay_but_txt.x = this.r_realplay_but_txt.baseRec.x - 40;
                    this.setUiListVisibleByItem([this.r_diamond_icon, this.r_need_diamond_num], false);
                }
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.r_wait_time.skinName, $labeStr, "NUM43", TextAlign.CENTER);
            }
        }
    
        private endTime: number=0
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this)
                this.endTime = TimeUtil.getTimer() + EndlessManager.getInstance().endlessConfigVo.waitrevivetime
                TimeUtil.addFrameTick(this.frameFun)

                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_revive_info_txt.skinName, "复活可以从失误层继续", 16, TextAlign.CENTER, ColorType.Black000000);
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.r_need_diamond_num.skinName, "12", "NUM41", TextAlign.CENTER);

                this.r_realplay_but_txt.goToAndStop(0)
                this.r_realplay_but_txt.x = this.r_realplay_but_txt.baseRec.x
                this.setUiListVisibleByItem([this.r_diamond_icon, this.r_need_diamond_num], true)
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.r_need_diamond_num.skinName, String(EndlessManager.getInstance().layerNum), "NUM41", TextAlign.CENTER);


            } else {
                this.h5UIAtlas.testLoading();
            }
        }
        public hidePanel(): void {
            Pan3d.UIManager.getInstance().removeUIContainer(this)
            TimeUtil.removeFrameTick(this.frameFun)

        }


    }
}