module endless {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import FrameCompenent = Pan3d.FrameCompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager
    import TimeUtil = Pan3d.TimeUtil
    import ColorType = Pan3d.ColorType

    import Physics = canonkey.Physics;

    import SceneEvent = game.SceneEvent;
    import GameDataModel = game.GameDataModel;

    export class EndlessFinishPanel extends H5UIConatiner {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _topTxtRender: UIRenderComponent

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
                case this.b_base_but_bg0:
                    var $tm: number = this.endTime - Pan3d.TimeUtil.getTimer()
                    if ($tm > 0) {
                        var needNum: number = endless. EndlessManager.getInstance().endlessConfigVo.timefinishrealplaynum
                        if (GameData.hasdiamondsHavenum > needNum) {
                            GameData.hasdiamondsHavenum -= needNum
                            Pan3d.ModuleEventManager.dispatchEvent(new endless.EndLessEvent(endless.EndLessEvent.ENDLESS_MODEL_START))
                            this.hidePanel();
                        } else {
                            msgalert.AlertUtil.show("你的钻石不足")
                        }

                    } else {
                        Pan3d.ModuleEventManager.dispatchEvent(new endless.EndLessEvent(endless.EndLessEvent.ENDLESS_MODEL_START))
                        this.hidePanel();
                    }
                    break

                default:
                    break

            }

        }

        private base_win_bg: UICompenent
        private b_base_but_bg0: UICompenent

        private b_try_again_but: FrameCompenent
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas
            this._topTxtRender.uiAtlas = this.h5UIAtlas


            var b_tip_bg: UICompenent = this.addEvntBut("b_tip_bg", this._bottomRender)
            b_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
            b_tip_bg.top = 0;
            b_tip_bg.left = 0;
            b_tip_bg.width = 540 * Pan3d.UIData.Scale;
            b_tip_bg.height = 960 * Pan3d.UIData.Scale;


            this.base_win_bg = this.addChild(this._midRender.getComponent("b_base_win_bg"));

            this.b_base_but_bg0 = this.addEvntButUp("b_base_but_bg0", this._topRender)

            this.b_try_again_but = <FrameCompenent>this.addChild(this._topTxtRender.getComponent("b_try_again_but"));
 

            this.b_revive_info_txt = this.addChild(this._topTxtRender.getComponent("b_revive_info_txt"));
            this.b_wait_time = this.addChild(this._topTxtRender.getComponent("b_wait_time"));


            this.b_need_diamond_num=    this.addChild(this._topTxtRender.getComponent("b_need_diamond_num"));
            this.b_diamond_icon =  this.addChild(this._topTxtRender.getComponent("b_diamond_icon"));




            this.uiLoadComplte = true;

            this.showPanel();


        }
        private b_need_diamond_num: UICompenent
        private b_diamond_icon: UICompenent
        private b_revive_info_txt: UICompenent;
        private b_wait_time: UICompenent;
 
        private upFrame(): void {


            if (this.uiLoadComplte && this.hasStage) {
                var $tm: number = this.endTime - Pan3d.TimeUtil.getTimer()
                var $labeStr: string 
                if ($tm > 0) {
                    $labeStr = String(Math.ceil($tm / 1000))
                } else {
                    $labeStr ="0"
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_revive_info_txt.skinName, "倒计时结束，无需钻石开启下一局", 16, TextAlign.CENTER, ColorType.Black000000);
                    this.setUiListVisibleByItem([this.b_need_diamond_num, this.b_diamond_icon], false)
                    this.b_try_again_but.goToAndStop(2)
                    this.b_try_again_but.x = this.b_try_again_but.baseRec.x-50
                    TimeUtil.addFrameTick(this.frameFun)

                } 
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.b_wait_time.skinName, $labeStr, "NUM43", TextAlign.CENTER);
            }
        }
        private endTime: number
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this)
                this.endTime = 20 * 1000 + TimeUtil.getTimer();
                TimeUtil.addFrameTick(this.frameFun)

    

                this.setUiListVisibleByItem([this.b_need_diamond_num, this.b_diamond_icon], true)
                this.b_try_again_but.goToAndStop(1)
                this.b_try_again_but.x = this.b_try_again_but.baseRec.x

                var $numstr: string = String(endless.EndlessManager.getInstance().endlessConfigVo.timefinishrealplaynum)
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.b_need_diamond_num.skinName, $numstr, "NUM41", TextAlign.RIGHT);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_revive_info_txt.skinName, "这次的时间已用完", 16, TextAlign.CENTER, ColorType.Black000000);


                game.GameSoundManager.getInstance().setBgVolume(0)

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