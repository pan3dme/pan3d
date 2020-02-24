﻿module topmenu {
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
    import FrameCompenent=Pan3d.FrameCompenent
    import FrameUIRender = Pan3d.FrameUIRender
    import FrameTipCompenent = Pan3d.FrameTipCompenent
    
    import GameLevelManeger = game.GameLevelManeger;
    import GameDataModel = game.GameDataModel;
    import SceneEvent = game.SceneEvent;



    export class TopMenuPanel extends H5UIConatiner {

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
            this.h5UIAtlas.setInfo("panelui/topmenu/topmenu.txt", "panelui/topmenu/topmenu.png", () => { this.loadConfigCom() });

        }


        private a_tittle_level_bg: UICompenent
        private a_back_home: UICompenent
        public centreInofTxtView: tips.CentreInofTxtView
        private loadConfigCom(): void {


            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas


            this.centreInofTxtView = new tips.CentreInofTxtView(this, this._topRender)


          

    
            this.a_tittle_level_bg = this.addEvntButUp("a_tittle_level_bg", this._midRender)
            this.a_back_home = this.addEvntButUp("a_back_home", this._midRender)

            

            this.a_top_level_num_txt= this.addChild(this._topRender.getComponent("a_top_level_num_txt"));
     

            this.a_reset_level_but = this.addEvntButUp("a_reset_level_but", this._topRender)

            this.a_effict_skin_icon = this.addEvntButUp("a_effict_skin_icon", this._topRender)

            

            this.addChild(this._topRender.getComponent("a_diamonds_icon"));
            this.a_diamonds_num_txt = this.addChild(this._topRender.getComponent("a_diamonds_num_txt"));


            this.a_sound_but = <FrameCompenent>this.addEvntButUp("a_sound_but", this._topRender);

            if (Scene_data.stageHeight / Scene_data.stageWidth > 2) {
                this.a_sound_but.y = this.a_sound_but.baseRec.y+40
            }
            this.a_effict_skin_icon.y = this.a_sound_but.y
     
            this.setVolumeBut()
            

            this.uiLoadComplte = true

            this.showPanel();

            this.setTittleTxt("第 " + GameDataModel.levelNum + " 关")

        }
        private a_effict_skin_icon: UICompenent
        private setVolumeBut(): void {
            this.a_sound_but.goToAndStop(Boolean(GameData.getStorageSync("o_volume_but")) ? 0 : 1)



        }
        private a_sound_but: FrameCompenent
        private a_diamonds_num_txt: UICompenent
        private a_top_level_num_txt: UICompenent
        private a_reset_level_but: UICompenent
        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.a_tittle_level_bg:
                    this.showCammandPanel()
                    break
                case this.a_sound_but:
                    GameData.setStorageSync("o_volume_but", !Boolean(GameData.getStorageSync("o_volume_but")));
 
                    this.setVolumeBut()

                    game.GameSoundManager.getInstance().changeBgUrl();
                    break
                case this.a_effict_skin_icon:

                    GameData.setStorageSync("useEffictSkin", !GameData.getStorageSync("useEffictSkin"))
                    game.GameDataModel.changeMainEffict();
                    break
                case this.a_reset_level_but:
                    if (GameData.gameType == 5) {
                        ModuleEventManager.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.SELECT_SPECIAL_LEVEL))
                    } else {
                        GameData.dispatchToLevel(GameDataModel.levelNum)
                    }
                    break
                case this.a_back_home:
                  
                    ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.HIDE_MAIN_UI_PANEL))
                    ModuleEventManager.dispatchEvent(new topstart.TopStartEvent(topstart.TopStartEvent.SHOW_TOP_START_PANEL));
                    break
                default:
                    break

            }
        }
        
        public refrishUi(): void {
            if (this.uiLoadComplte) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_diamonds_num_txt.skinName, Pan3d.ColorType.Whiteffffff+ String(GameData.hasdiamondsHavenum), 26, TextAlign.CENTER)
                this.setUiListVisibleByItem([this.a_effict_skin_icon], GameData.getStorageSync("isUseEffictSkin"))

  
            }
        }
        /*
        private _fristEffictRender: FrameUIRender;
        private expEff: FrameTipCompenent
        public showExpEff(): void {

            if (!this._fristEffictRender) {
                this._fristEffictRender = new FrameUIRender();
                this.addRender(this._fristEffictRender);
                this._fristEffictRender.setImg("panelui/topmenu/effict001.png", 4, 4, ($ui: any) => {
                    this.expEff = $ui;
                    this.expEff.x = this.a_effict_skin_icon.x
                    this.expEff.y = this.a_effict_skin_icon.y
                    this.expEff.width = this.a_effict_skin_icon.width
                    this.expEff.height = this.a_effict_skin_icon.height

                    this.expEff.speed =2;
                    this.expEff.playOne(this);
                    this.expEff.play()
                })
            }

        }
        */
        public setTittleTxt(value: string): void {
            if (this.uiLoadComplte) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_top_level_num_txt.skinName, value, 26, TextAlign.CENTER);
            }
        }

        private showCammandPanel(): void {
            if (camand.CammandPanel.getInstance().hasStage) {
                camand.CammandPanel.getInstance().hide()
            } else {
                camand.CammandPanel.getInstance().show()
            }
        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.refrishUi()
                TweenLite.to(this, 0.3, {
                    top: 0, ease: Back.easeInOut, onComplete: () => {
                    }
                });
            } else {
                this.h5UIAtlas.testLoading();
            }

        }
        public hidePanel(): void {
        
            TweenLite.to(this, 0.3, {
                top: -100, ease: Back.easeInOut, onComplete: () => {
                    Pan3d.UIManager.getInstance().removeUIContainer(this);
                }
            });
        }






    }
}