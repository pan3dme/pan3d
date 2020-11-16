module skineffict {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import SelectButton = Pan3d.SelectButton;
    import FrameCompenent = Pan3d.FrameCompenent;
    import FrameTipCompenent = Pan3d.FrameTipCompenent
    import FrameUIRender = Pan3d.FrameUIRender
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;

    import GroupRes = Pan3d.GroupRes;
    import GroupItem = Pan3d.GroupItem;
    import BaseRes = Pan3d.BaseRes;
    import CombineParticle = Pan3d.CombineParticle;

 
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import Rectangle = Pan3d.Rectangle
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager

    import MainCanonPrefabSprite = cannondis.MainCanonPrefabSprite;

    import GameDataModel = game.GameDataModel
    import SceneEvent = game.SceneEvent
    import PandaMeshData = rightpanda.PandaMeshData

    export class SkineffictPanel extends H5UIConatiner {
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
            this.h5UIAtlas.setInfo("panelui/skineffict/skineffict.txt", "panelui/skineffict/skineffict.png", () => { this.loadConfigCom() });

        }


 

        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas

            this.win_tip_bg = this.addEvntBut("a_win_tip_bg", this._bottomRender)
            this.win_tip_bg .addEventListener(InteractiveEvent.Up, this.butClik, this);
 
            

            this.a_wait_info_txt=   this._topRender.getComponent("a_wait_info_txt")
            
            this.addChild(this._topRender.getComponent("a_win_tittle"));
            this.addChild(this._midRender.getComponent("a_big_frame_bg"));
            this.a_big_frame_pic = this.addChild(this._topRender.getComponent("a_big_frame_pic"));

            this.a_select_but = this.addEvntButUp("a_select_but", this._midRender)



            this.a_but_frame_txt = <FrameCompenent> this.addChild(this._topRender.getComponent("a_but_frame_txt"));



            this.a_win_close = this.addEvntBut("a_win_close", this._topRender)

            this.a_experience_but = this.addEvntBut("a_experience_but", this._topRender)

            

 
            this.uiLoadComplte = true;

            this.showExpEff()
          
 
            this.showPanel();
    

        }
        private a_experience_but: UICompenent
        private a_but_frame_txt: FrameCompenent
        private a_big_frame_pic: UICompenent
        private expEff: FrameTipCompenent;
        private _effRender: FrameUIRender;
        public showExpEff(): void {

            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg("panelui/skineffict/frame001.jpg", 10, 9, ($ui: any) => {
                    this.expEff = $ui;
                    this.expEff.x = this.a_big_frame_pic.x
                    this.expEff.y = this.a_big_frame_pic.y
                    this.expEff.width = this.a_big_frame_pic.width
                    this.expEff.height = this.a_big_frame_pic.height

                    this.expEff.speed = 1;
                    this.expEff.playOne(this);
                    this.expEff.play()
                })
            }

        }
        private a_win_close: UICompenent;
        private a_wait_info_txt: UICompenent
        private a_select_but: UICompenent
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_select_but:
  
                    switch (this.a_but_frame_txt.current) {
                        case 0:
                            console.log("邀请")
                            this.shareBut_Clik()
                            break
                        case 1:
                            if (!GameData.getStorageSync("isUseEffictSkin")) { //第一次使用直接就关闭
                                this.hidePanel();
                            }
                            GameData.setStorageSync("isUseEffictSkin", true) //使用过了
                            GameData.setStorageSync("useEffictSkin", true)
                            game.GameDataModel.changeMainEffict();
                            Pan3d.ModuleEventManager.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.REFRISH_MAIN_TOP_UI));
                            break
                        case 2:
                            GameData.setStorageSync("useEffictSkin", false)
                            game.GameDataModel.changeMainEffict();
                            break
                        default:
                            break
                    }
                    this.resetBut()
                    break;
                case this.a_experience_but:
                    this.experienceSkin();
                case this.a_win_close:
                    this.hidePanel();
  
 
                    break
                default:
                    break;
            }
          
        }
        private experienceSkin(): void {
            var $dis: MainCanonPrefabSprite = GameDataModel.centenBall
            var $scale: number = 1.4
            var $effictName: string = "skin001";
            $dis.changeSkinById(4);
            if (Scene_data.supportBlob) {
                $dis.playLyf("model/" + $effictName + "_lyf.txt", null, $scale);
            } else {
                $dis.playLyf("model/" + $effictName + "_base.txt", null, $scale);
            }
            Pan3d.TimeUtil.addTimeOut(1000*60, () => {
                game.GameDataModel.changeMainEffict();
                if (!GameData.getStorageSync("isUseEffictSkin")) {
                    var $postStr: string = "";
                    $postStr += "openid=" + GameData.getStorageSync("openid");
                    $postStr += "&time=" + 0;
                    $postStr += "&type=" + 4;
                    GameData.WEB_SEVER_EVENT_AND_BACK("get_advertise_list", $postStr, (res: any) => {
                        if (res && res.data && res.data.list && res.data.list.length) {

                        } else {
                            if (!GameData.hasWinPanel) {
                                msgalert.AlertUtil.show("你邀请的好友还没加入游戏，体验结束，请再邀请", "提示", (value: any) => {
                                    if (value == 1) {
                                        Pan3d.ModuleEventManager.dispatchEvent(new SkineffictEvent(SkineffictEvent.SHOW_SKINEFFICT_PANEL));
                                    }
                                }, 2)
                            }
                        
                        }

                    })
                }
                





            })
        }
 
        private shareBut_Clik(): void {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo((value: number) => {
                if (value == 1) {
                    this.setUiListVisibleByItem([this.a_wait_info_txt], true)
                    this.setUiListVisibleByItem([this.a_experience_but], true)


                    LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_wait_info_txt.skinName, Pan3d.ColorType.Whiteffffff+ "好友进入游戏后便可领取",18)
                    Pan3d.ModuleEventManager.dispatchEvent(new SkineffictEvent(SkineffictEvent.TEST_SKINEFFICT_ADVERTISE));

                    rightpanda.PandaMeshData.showCentenTxtInfoType(rightpanda.PandaMeshData.key106,  "等待好友加入获取魔法 ", () => {
                           Pan3d.ModuleEventManager.dispatchEvent(new SkineffictEvent(SkineffictEvent.SHOW_SKINEFFICT_PANEL));
                    })
                            
                      
                }
            }, AllShareMeshVo.type4))
        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
   
               
                this.setUiListVisibleByItem([this.a_win_close], false)
                this.setUiListVisibleByItem([this.a_wait_info_txt], false)
                this.setUiListVisibleByItem([this.a_experience_but], false)

        
                Pan3d.TimeUtil.addTimeOut(500, () => {
                    this.setUiListVisibleByItem([this.a_win_close], true)
                })
               
                this.getAdvertiseBy4();

            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
   
        }
        private getAdvertiseBy4(): void {
            this.setUiListVisibleByItem([this.a_select_but, this.a_select_but], false)
            var $postStr: string = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            $postStr += "&time=" + 0;
            $postStr += "&type=" + 4;
            GameData.WEB_SEVER_EVENT_AND_BACK("get_advertise_list", $postStr, (res: any) => {
                this.advertiseListLen=0
                if (res && res.data && res.data.list && res.data.list.length) {
                    this.advertiseListLen = res.data.list.length
                }
                this.resetBut()

                this.setUiListVisibleByItem([this.a_select_but, this.a_select_but], true)
            })
        }
        private advertiseListLen: number
        private skineffictDataArr: Array<any>
        private resetBut(): void {
            if ( this.advertiseListLen>0) {
                if (GameData.getStorageSync("useEffictSkin")) {
                    this.a_but_frame_txt.goToAndStop(2)
                } else {
                    this.a_but_frame_txt.goToAndStop(1)
                }
            } else {
                this.a_but_frame_txt.goToAndStop(0)
            }
        }
        private hidePanel(): void {
            if (this.uiLoadComplte) {
                this.setUiListVisibleByItem([this.a_win_close], false)
            }
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, () => {
                UIManager.getInstance().removeUIContainer(this);
        
            });
            if (!GameData.getStorageSync("isUseEffictSkin")) {
                PandaMeshData.showRightPanda(PandaMeshData.key17, Scene_data.fileRoot + "ui/panda/17.png", new SkineffictEvent(SkineffictEvent.SHOW_SKINEFFICT_PANEL));
            }
           
        

 

        }

    }

}