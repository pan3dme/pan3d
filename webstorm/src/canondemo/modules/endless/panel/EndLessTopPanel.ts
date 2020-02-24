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

    import EndlessManager = endless.EndlessManager
    import EndLessEvent = endless.EndLessEvent


    export class EndLessTopPanel extends H5UIConatiner {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public constructor() {
            super();
            this.interfaceUI = true
            this.width = 540
            this.height = 960
            this.center = 0;
            this.top = 0;
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this.frameFun = () => { this.upFrame() }
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("ui/endless/endless.txt", "ui/endless/endless.png", () => { this.loadConfigCom() });
        }
 
        private frameFun: Function
        private upFrame(): void {

            if (Physics.ready && GameData.gameType==2) {
                    var $n: number = EndlessManager.getInstance().CountdownTm - TimeUtil.getTimer()
                    if ($n > 0) {
                        this.drawTimeTime($n)
                    } else {
                        Physics.ready = false
                        Pan3d.ModuleEventManager.dispatchEvent(new EndLessEvent(EndLessEvent.SHOW_ENDLESS_FINISH_PANEL))
                    }
                }
         
        
        }
        private drawTimeTime(value: number): void {
            var s: number = Math.floor(value / 1000)
            var m: number = Math.floor((value % 1000 / 1000) * 60)
            var str: string = (s < 10 ? "0" : "") + s + ":" + (m < 10 ? "0" : "") + m
            if (this.a_endless_time.data != str) { //如果同就不必要刷新。
                this.a_endless_time.data = str
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_endless_time.skinName, str, "NUM44", TextAlign.CENTER);
            }
        }

        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_back_to_base:
                    Physics.ready = false;
                    ModuleEventManager.dispatchEvent(new endless.EndLessEvent(endless.EndLessEvent.HIDE_ALL_ENDLESS_PANEL))
                    endless.EndlessManager.getInstance().clearAllEndless()
                    GameData.gameType = 1;
                    GameData.dispatchToLevel(GameDataModel.levelNum)
                    ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL));
                    break;
                default:
                    break
            }
        }
        private a_layer_num_txt: UICompenent;

        private a_endless_time: UICompenent;
        private a_diamond_num_txt: UICompenent;
        private a_back_to_base: UICompenent
 
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas


            this.a_back_to_base = this.addEvntButUp("a_back_to_base", this._topRender);
            this.a_back_to_base.left = 30

            this.addChild(this._topRender.getComponent("a_layer_bg"));
            this.a_endless_time=  this.addChild(this._topRender.getComponent("a_endless_time"));
    

            this.addChild(this._topRender.getComponent("a_layer_Left_txt"));
            this.a_layer_num_txt=  this.addChild(this._topRender.getComponent("a_layer_num_txt"));
            this.addChild(this._topRender.getComponent("a_layer_right_txt"));


            this.addChild(this._topRender.getComponent("a_diamond_icon"));
            this.a_diamond_num_txt = this.addChild(this._topRender.getComponent("a_diamond_num_txt"));

            this.a_add_scene_time_tip = this.addChild(this._topRender.getComponent("a_add_scene_time_tip"));


            

            this.uiLoadComplte = true;

            this.showPanel()

          ;
          //this.drawTimeTime(EndlessManager.getInstance().endlessConfigVo.maxtime)

        }
        public showAddSceneTime(value: number): void {
            ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, "A_add_scene_time_num", String(value), "NUM41", TextAlign.CENTER);

            this.a_add_scene_time_tip.y = this.a_add_scene_time_tip.baseRec.y
            var $ty: number = this.a_add_scene_time_tip.baseRec.y - 100;
            TweenLite.to(this.a_add_scene_time_tip, 0.3, {
                y: $ty, onComplete: () => {
                    TimeUtil.addTimeOut(1000, () => {

                        this.a_add_scene_time_tip.y = -1000
                    })

                } });
        }
        private a_add_scene_time_tip: UICompenent
        public refrishDiamondNum(): void {
            if (this.uiLoadComplte) {
                var $num: number = GameData.hasdiamondsHavenum
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_diamond_num_txt.skinName, String($num), "NUM10", TextAlign.CENTER);
            }
        }
        public refristLayerNum(): void {
            if (this.uiLoadComplte) {
                   ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_layer_num_txt.skinName, String(EndlessManager.getInstance().layerNum), "NUM41", TextAlign.CENTER);
           //     ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_layer_num_txt.skinName, String(2), "NUM41", TextAlign.CENTER);
     
            }
        }
        public muiTimeAddStart(): void {
            TimeUtil.addFrameTick(this.frameFun);
        }
 
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.refristLayerNum();
                this.refrishDiamondNum();
                this.a_add_scene_time_tip.y = -1000;
            } else {
                this.h5UIAtlas.testLoading();
            }
        }
        public hidePanel(): void {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
            TimeUtil.removeFrameTick(this.frameFun);
            PandaMeshData.hideCentenTxtInfoType2(PandaMeshData.key101);
        }
        private showData: any
        public refrishData(value): void {
         
        }

    }
}