module resetplay {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
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

    export class ResetPlayPanel extends basewin.BaseWinPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _topTxtRender: UIRenderComponent

        public constructor() {
            super();
            this.width = 540
            this.height = 960
            this.center = 0;
            this.middle = 0;

        }
        protected baseWindowLoadFinish(): void {
            super.baseWindowLoadFinish()

            this.timeFun = () => { this.upTimeFrame() }
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this._topTxtRender = new UIRenderComponent();
            this.addRender(this._topTxtRender);

            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/resetplay/resetplay.txt", "panelui/resetplay/resetplay.png", () => { this.loadConfigCom() });



        }

        private timeFun: any

        private c_game_star_bg: UICompenent;

        private shareTm: number;
        private toshareEvet(): void {
     
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo((value: number) => {
                if (value == 1) {
                    this.selectLevelTo(game.GameDataModel.levelNum);
                }
            }, AllShareMeshVo.type6))
        }
   
        private useDiamondsRealPlay(): void {
            if (this.needRestNum > GameData.hasdiamondsHavenum) {
                msgalert.AlertUtil.show("钻石不足", "提示", (value: any) => {
                    if (value == 1) {
                        ModuleEventManager.dispatchEvent(new invitation.InvitationEvent(invitation.InvitationEvent.SHOW_INVITATIOIN_PANEL));
                    }
                }, 2)
            } else {
                this.selectLevelTo(game.GameDataModel.levelNum)
                GameData.hasdiamondsHavenum = GameData.hasdiamondsHavenum - this.needRestNum
                ModuleEventManager.dispatchEvent(new SceneEvent(SceneEvent.DIAMONDS_SPRITE_HIT_EVENT));
                var $postStr: string = "";
                $postStr += "level=" + game.GameDataModel.levelNum;
                $postStr += "&openid=" + GameData.getStorageSync("openid");

                GameData.WEB_SEVER_EVENT_AND_BACK("add_revive", $postStr)
            }
           
        }
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.base_win_close:
                    var $num: number = GameData.hasdiamondsHavenum
                    if (this.needRestNum <= $num) {
                        msgalert.AlertUtil.show("关闭使用" + this.needRestNum + "钻石复活", "提示", (value: any) => {
                            if (value == 1) {
                                this.useDiamondsRealPlay();
                            }
                        }, 2)
                    } else {
                        this.useDiamondsRealPlay()
                    }
                    break
                case this.r_reset_but_txt:
                    this.useDiamondsRealPlay()
                    break
                case this.r_reset_but_bg:
                    if (this.isResetBut()) {
                        this.useDiamondsRealPlay()
                    } else {
                        this.toshareEvet()
                    }
                    break
                default:
                    break

            }
        }
        private lastLostLevel: number
 
  

        private r_reset_time_txt: UICompenent;
        private r_reset_need_diamonds: UICompenent;


        private r_but_frame_txt: FrameCompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas
            this._topTxtRender.uiAtlas = this.h5UIAtlas

            this.winRect = new Rectangle(0, 0, 450, 350)
 
            this.r_reset_but_bg = this.addEvntButUp("r_reset_but_bg", this._bottomRender)
            
            this.r_but_frame_txt = <FrameCompenent>this.addChild(this._topRender.getComponent("r_but_frame_txt"));
     
       

            this.addChild(this._topRender.getComponent("r_reset_tittle_txt"));

            
            this.addChild(this._midRender.getComponent("r_reset_time_bg"));

            this.r_reset_time_txt = this.addChild(this._topRender.getComponent("r_reset_time_txt"));
          
       

            this.r_reset_but_txt = this.addEvntButUp("r_reset_but_txt", this._topTxtRender)
         
            this.r_reset_need_diamonds = this._topTxtRender.getComponent("r_reset_need_diamonds");
      

            this.uiLoadComplte = true;
            this.drawNeedDiamond();
 
            this.showPanel();

        }
  

        private r_diamonds_icon: UICompenent
 
        private r_reset_but_bg: UICompenent;
        private r_reset_but_txt: UICompenent
        private endTime: number

        private isResetBut(): boolean {
           

            if (GameData.severinfo.wxcloudModel == 1 || game.GameDataModel.levelNum < 10) {
                return true
            } else {
                if (GameData.severinfo.canUseShareBut) { //可以使用分享复活
                    return false
                } else {
                    return true
                }

               
            }
        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                this.drawNeedDiamond();
                if (this.isResetBut()) {
                    this.r_but_frame_txt.goToAndStop(1);
                } else {
                    this.r_but_frame_txt.goToAndStop(0);
                }
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            
            }
        }
      
        private selectLevelTo(value: number): void {
      
            GameData.dispatchToLevel(value)
            this.hidePanel()
        }
        private hidePanel(): void {
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, () => {
                UIManager.getInstance().removeUIContainer(this);
   
            });
        }
        public onRemove(): void {
            Pan3d.TimeUtil.removeTimeTick(this.timeFun);
            super.onRemove();
        }
  
        public onAdd(): void {

            var $needTm: number = GameData.getNeedTimeResetPlayByLevel(game.GameDataModel.levelNum)
    
            this.endTime = Pan3d.TimeUtil.getTimer() + $needTm * 1000;
            this.upTimeFrame()
            Pan3d.TimeUtil.addTimeTick(1000, this.timeFun);
   
            super.onAdd();
        }
        private needRestNum: number
        public drawNeedDiamond(): void {
            if (this.uiLoadComplte) {
                this.needRestNum = GameData.getNeedDiamodsResetPlayByLevel(game.GameDataModel.levelNum);
                if (this.needRestNum > 0) {
                    // ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.r_reset_need_diamonds.skinName, String(this.needRestNum), "NUM41", TextAlign.CENTER, 2);
                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.r_reset_need_diamonds.skinName, Pan3d.ColorType.Black000000 +"x"+ String(this.needRestNum), 24)
                    this.r_reset_but_txt.x = this.r_reset_but_txt.baseRec.x;
                    var $num: number = GameData.hasdiamondsHavenum
                 
                } else {
                    this.r_reset_but_txt.x = this.r_reset_but_txt.baseRec.x - 20;
                    this._topRender.uiAtlas.clearCtxTextureBySkilname(this.r_reset_need_diamonds.skinName);
                }
                this.setUiListVisibleByItem([this.r_diamonds_icon], this.needRestNum > 0);
            }
        }
        private upTimeFrame(): void {
            if (this.uiLoadComplte && this.hasStage) {
                var $tm: number = this.endTime - Pan3d.TimeUtil.getTimer()
                if ($tm > 0) {
                    ArtFont.getInstance().writeFontToSkinName(this._bottomRender.uiAtlas, this.r_reset_time_txt.skinName, String(Math.ceil($tm / 1000)), "NUM43", TextAlign.CENTER);
                } else {
                    this.selectLevelTo(game.GameDataModel.levelNum)
                }
            }
        }

    }

}