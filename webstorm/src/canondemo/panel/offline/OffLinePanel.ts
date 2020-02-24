module offline {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import SelectButton = Pan3d.SelectButton;
    import FrameCompenent = Pan3d.FrameCompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import Rectangle = Pan3d.Rectangle
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager


    import SceneEvent = game.SceneEvent
    import PandaMeshData = rightpanda.PandaMeshData

    export class OffLineMessVo {
        public open: boolean;
        public openlevel: number;
        public mintm: number;
        public maxtm: number;
        public minget: number;
        public maxget: number;

        public constructor(value: any) {
            for (var key in value) {
                this[key] = value[key]
            }
        }
    }
    export class OffLinePanel extends H5UIConatiner {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;

        public static offLineMessVo: OffLineMessVo
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
            this.h5UIAtlas.setInfo("panelui/offline/offline.txt", "panelui/offline/offline.png", () => { this.loadConfigCom() });

        }


 

        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas

            this.win_tip_bg = this.addEvntBut("a_win_tip_bg", this._bottomRender)
            this.win_tip_bg .addEventListener(InteractiveEvent.Up, this.butClik, this);
 

            this.addChild(this._midRender.getComponent("a_pic_bg"));
 
            this.a_num_label = this.addChild( this._topRender.getComponent("a_num_label"));


            this.a_share_but_get= this.addEvntBut("a_share_but_get", this._topRender)
            this.a_get_but = this.addEvntBut("a_get_but", this._topRender)

            this.a_win_close = this.addEvntBut("a_win_close", this._topRender)
            

            

            this.uiLoadComplte = true;
          
 
            this.showPanel();
    

        }
        private a_win_close: UICompenent
        private a_share_but_get: UICompenent
        private a_get_but: UICompenent
        private a_num_label: UICompenent;
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_share_but_get:
                    this.shareBut_Clik()
                    break
                case this.a_get_but:
                    GameData.hasdiamondsHavenum += this.chanGetNum;
                    this.hidePanel();
                    break
                case this.a_win_close:
                    this.hidePanel();
                    break
                default:
                    break
            }
          
        }
        private shareBut_Clik(): void {
            if (GameData.isCanUseLookVideoBut) {
                GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), (value: number) => {
                    if (value == 2) {
                        var $tipStr: string = "需要看完视屏\n才能领取双倍奖励";
                        msgalert.AlertUtil.show($tipStr, "提示", (value: any) => {
                        }, 2)
                    }
                    if (value == 1) {
                        GameData.hasdiamondsHavenum += this.chanGetNum * 2;
                        this.hidePanel();
                    }
                    if (value == 0) {
                        this.toshareEvet();
                    }

                })


            } else {
                this.toshareEvet()
            }
        }
        private toshareEvet(): void {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo((value: number) => {
                if (value == 1) {
                    GameData.hasdiamondsHavenum += this.chanGetNum * 2;
                    this.hidePanel();
                }
            }, AllShareMeshVo.type5));
        }
        public tmsecond: number //秒
        public showPanel(): void {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
                this.refrishUi()
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            
            }
        }
        private chanGetNum: number
        private refrishUi(): void {
            if (this.tmsecond) {
                var a: number = (this.tmsecond - OffLinePanel.offLineMessVo.mintm) / (OffLinePanel.offLineMessVo.maxtm - OffLinePanel.offLineMessVo.mintm)
                a = Math.max(a, 0);
                a = Math.min(a, 1);
                a = OffLinePanel.offLineMessVo.minget + a * (OffLinePanel.offLineMessVo.maxget - OffLinePanel.offLineMessVo.minget)
                a = Math.floor(a);

                this.chanGetNum = a;
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_num_label.skinName, Pan3d.ColorType.Redff0000 +"+"+ a + Pan3d.ColorType.Black000000 + " 钻石", 24, Pan3d.TextAlign.CENTER);
            }
        }

        private hidePanel(): void {
            this.chanGetNum=0
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, () => {
                UIManager.getInstance().removeUIContainer(this);
      
            });
        }
      

    }

}