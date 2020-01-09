module revive {
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

    import TimeUtil = Pan3d.TimeUtil

    import GameDataModel = game.GameDataModel
    import Physics = canonkey.Physics;


    export class RevivePanel extends basewin.BaseWinPanel {
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

       
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas
            this._topTxtRender.uiAtlas = this.h5UIAtlas
            this.winRect = new Rectangle(0, 0, 450, 350)
            this.uiLoadComplte = true;


            this.addChild(this._bottomRender.getComponent("b_tittle"));
            this.b_content_txt = this.addChild(this._midRender.getComponent("b_content_txt"));
            this.b_revive_but = this.addEvntBut("b_revive_but", this._bottomRender)

            
            this.b_need_label = this._midRender.getComponent("b_need_label");
      
            this.b_revive_but_label = this.addChild(this._midRender.getComponent("b_revive_but_label"));
            this.b_share_frame = <FrameCompenent>this.addEvntBut("b_share_frame", this._midRender)


 

            this.showPanel();

        }
        private needRestNum: number
        private setButStatic(): void {
            if (GameData.isCanUseLookVideoBut) {
                this.b_share_frame.goToAndStop(0);
            } 
            this.b_share_frame.goToAndStop(1); //现在只支持分享
            this.needRestNum= GameData.getNeedDiamondsReviveByLevel(GameDataModel.levelNum);
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_need_label.skinName, Pan3d.ColorType.Redff0000 + this.needRestNum, 20);

        }
        private b_need_label: UICompenent
        private b_share_frame: FrameCompenent
        private b_revive_but_label: UICompenent
        private b_content_txt: UICompenent
        private b_revive_but: UICompenent
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.b_revive_but:
                    if (this.needRestNum > GameData.hasdiamondsHavenum) {
                        msgalert.AlertUtil.show("钻石不足", "提示", (value: any) => {
                            if (value == 1) {
                                ModuleEventManager.dispatchEvent(new invitation.InvitationEvent(invitation.InvitationEvent.SHOW_INVITATIOIN_PANEL));
                            }
                        }, 2)
                    } else {
                        GameData.hasdiamondsHavenum = GameData.hasdiamondsHavenum - this.needRestNum;
                        ModuleEventManager.dispatchEvent(new SceneEvent(SceneEvent.DIAMONDS_SPRITE_HIT_EVENT));
                        this.toPlay();
       
                    }
                    break
                case this.b_share_frame:
                    this.clikFrameBut()
                    break
                case this.base_win_close:
                    if (GameData.gameType == 5) {
                        ModuleEventManager.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.SELECT_SPECIAL_LEVEL))
                    } else {
                        GameData.dispatchToLevel(GameDataModel.levelNum)
                    }
                    this.hidePanel()
                    break
                default:
                    break
            }
        }
        private clikFrameBut(): void {
            if (this.b_share_frame.current == 0) {
                this.toLookAdAndPlay()
            } else {
                this.toshareEvet()
            }

        }
        private toLookAdAndPlay(): void {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), (value: number) => {
                if (value == 2) {
                    var $tipStr: string = "需要看完视屏才能复活";
                    msgalert.AlertUtil.show($tipStr, "提示", (value: any) => {

                    }, 2)
                }
                if (value == 1) {
                    this.toPlay()
                }
                if (value == 0) {
                    //视频看完了，就只能分享；
                    this.toshareEvet();
                }

            })

      


        }
        private toshareEvet(): void {

            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo((value: number) => {
                if (value == 1) {
                    this.toPlay()
                }
            }, AllShareMeshVo.type10))
        }
        private hidePanel(): void {

            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, () => {
                UIManager.getInstance().removeUIContainer(this);
            });
        }
        private toPlay(): void {
            GameDataModel.centenBall.x = GameDataModel.lastRevivePos.x;
            GameDataModel.centenBall.y = GameDataModel.lastRevivePos.y;
            GameDataModel.centenBall.z = GameDataModel.lastRevivePos.z;
            GameDataModel.centenBall.bodyfouce.x = 0;
            GameDataModel.centenBall.bodyfouce.y = 0;
            GameDataModel.centenBall.bodyfouce.z = 0;
            GameDataModel.centenBall.resetParticlePos();
            GameDataModel.centenBall.body.sleep();
            GameDataModel.centenBall.body.wakeUp();
            GameDataModel.lastMainHitVect.x = GameDataModel.lastRevivePos.x
            GameDataModel.lastMainHitVect.y = GameDataModel.lastRevivePos.y
            GameDataModel.lastMainHitVect.z = GameDataModel.lastRevivePos.z
            GameDataModel.lastMainHitTm = TimeUtil.getTimer();
            Physics.ready = true;
            this.hidePanel();
        }
 
        public showPanel(): void {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
                this.setButStatic()
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }

            }
        }
  
        
 
      

    }

}