module leveluppan {
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
    import Scene_data = Pan3d.Scene_data

    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent

    import SceneEvent = game.SceneEvent;
    import GameDataModel = game.GameDataModel;
    import Rectangle = Pan3d.Rectangle

    import PandaMeshData = rightpanda.PandaMeshData


    export class FristLevelUpPanel extends basewin.BaseWinPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;



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



            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/levelup/levelup.txt", "panelui/levelup/levelup.png", () => { this.loadConfigCom() });


        }

    
        private willToNextLevel(): void {
            if (this.needUseNumToNextLevel) {
                GameData.hasdiamondsHavenum = Math.max(0, GameData.hasdiamondsHavenum-10)
            } else {
                GameData.hasdiamondsHavenum += GameData.getFristLevelUpByLevel(GameDataModel.levelNum)
            }
         
            GameData.dispatchToLevel(GameDataModel.levelNum + 1);
            this.hidePanel();
            Pan3d.ModuleEventManager.dispatchEvent(new skinui.SkinListEvent(skinui.SkinListEvent.LEVEL_UP_TEST_NEED_SKIN))
            Pan3d.ModuleEventManager.dispatchEvent(new LevelUpEvent(LevelUpEvent.SHOW_BEST_FRIEND_PANEL))

            if (GameData.severinfo.wxcloudModel != 1) {
                if (GameDataModel.levelNum == GameData.severinfo.showSkinefficLevel) {//显示魔法皮肤等级
                    Pan3d.ModuleEventManager.dispatchEvent(new skineffict.SkineffictEvent(skineffict.SkineffictEvent.SHOW_SKINEFFICT_PANEL));
                }
                if (GameDataModel.levelNum == GameData.severinfo.vippanel.level && GameData.severinfo.vippanel.open) {//提示vip
                    Pan3d.ModuleEventManager.dispatchEvent(new vip.VipEvent(vip.VipEvent.SHOW_VIP_PANEL))

                
                }
                if (GameDataModel.levelNum == GameData.severinfo.special.openlevel) {
                    msgalert.AlertUtil.show("你已具备挑战神秘关卡的能力，点确定前往", "提示", (value: any) => {
                        if (value == 1) {
                            Pan3d.ModuleEventManager.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.SHOW_SPECIAL_PANEL));
                        }
                    }, 2)
                }
            }
            if (this.nextShowBestFriend < Pan3d.TimeUtil.getTimer()) {
                ModuleEventManager.dispatchEvent(new SceneEvent(SceneEvent.WX_GET_FRIEND_CLOUD_STORAGE)); //选择关卡后，将本关最佳成绩的好友显示到纹理上
                if (GameData.severinfo.wxcloudModel == 1) {
                    this.nextShowBestFriend = Pan3d.TimeUtil.getTimer() + 1000 * 1
                } else {
                    this.nextShowBestFriend = Pan3d.TimeUtil.getTimer() + 1000 * 60
                }
      
            }
    
            
        }
        private nextShowBestFriend: number=0
        private clearFristLevelUp($level: number): void {
            if ($level >=10) { //大于或小于10关的才必须处理
                var $str: string = GameData.getStorageSync("fristlevelupdata");
                if ($str) {
                    var $arr: Array<any> = JSON.parse($str);
                    for (var i: number = 0; i < $arr.length; i++) {
                        if ($arr[i] == $level) {
                            $arr.splice(i, 1);
                        }
                    }
                    GameData.setStorageSync("fristlevelupdata", JSON.stringify($arr));
                }
            }
       
        }
 
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.win_tip_bg:
                    break;
                case this.base_win_close:
                    if (this.isNeeShareLevelUp) {
                        GameData.clearFristLevelUp(GameDataModel.levelNum);
                        GameDataModel.levelNum-- //需要分享。将将关卡退一组
                    }
                    this.willToNextLevel();
                    break
                case this.b_next_but:
                    if (this.b_but_txt_frame.current == 0) {
                        this.willToNextLevel();
                    } else {
                        GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo((value: number) => {
                            if (value == 1) {
                                this.willToNextLevel();
                            }
                        }, AllShareMeshVo.type3))
 
                    }
                    break;
                default:
                    break

            }
        }
 
         
        private hidePanel(): void {
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, () => {
                    UIManager.getInstance().removeUIContainer(this);
                });
          
 
        }
        private needUseMunToNext(value: number): boolean {  //如果玩家在指定关卡有超过10的钻石，就将它消耗掉
            if (GameData.hasdiamondsHavenum > 10) {
                for (var i: number = 0; i < GameData.severinfo.levelupneedmunArr.length; i++) {
                    if (value == GameData.severinfo.levelupneedmunArr[i]) {
                        return true
                    }
                }
            }
            return false

        }

        private needUseNumToNextLevel: boolean
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
                var $addNum: number = GameData.getFristLevelUpByLevel(GameDataModel.levelNum);
                this.needUseNumToNextLevel = this.needUseMunToNext(GameDataModel.levelNum)
                var $str: string=""
                if (this.needUseNumToNextLevel) {
                    $str = Pan3d.ColorType.Brown40120a +"开启下一关卡消耗x10钻石"
                } else {
                    $str = Pan3d.ColorType.Brown40120a + "x " + $addNum
                }
                this.setUiListVisibleByItem([this.b_info_top_txt], !this.needUseNumToNextLevel)
 
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_context_txt.skinName, $str, 20, TextAlign.CENTER);
              


                this.isShowLevelUpInfo()
       
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
           
            }

        }
        private isShowLevelUpInfo(): void {
            var $tipstr: string = "";
            if (this.isNeeShareLevelUp) {
                $tipstr = Pan3d.ColorType.Redff0000 + "只需要分享成功就可以进行下一关";
                this.b_but_txt_frame.goToAndStop(1)
            } else {
                this.b_but_txt_frame.goToAndStop(0)
            }
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_friend_tips.skinName, $tipstr, 18, Pan3d.TextAlign.CENTER);

        }
        private get isNeeShareLevelUp(): boolean {
            var $arr: Array<number> = GameData.severinfo.needshareToNextLevelArr;
            if (GameData.severinfo.wxcloudModel == 2 && AllShareMeshVo.shareSkipId < $arr[$arr.length-1]) { //正试版本才需要  数据最后一位用于标记少于多少次分享将才会提示分享
                for (var i: number = 0; i < $arr.length-1; i++) {
                    if ($arr[i] == GameDataModel.levelNum) {
                        return true;
                    }
                }
            }
            return false;
         
        }
      
   

        private b_friend_tips: UICompenent
        private b_info_top_txt: UICompenent
        private b_context_txt: UICompenent
        private b_next_but: UICompenent
        private b_but_txt_frame: Pan3d.FrameCompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas


            this.winRect = new Rectangle(0, -30, 400, 260)

            this.b_next_but = this.addEvntButUp("b_next_but", this._topRender)
  
            this.addChild(this._topRender.getComponent("b_big_icon"));
            this.addChild(this._topRender.getComponent("b_tittle_txt"));
            this.b_info_top_txt=  this.addChild(this._topRender.getComponent("b_info_top_txt"));


            this.b_context_txt = this.addChild(this._topRender.getComponent("b_context_txt"));

            this.b_but_txt_frame = <Pan3d.FrameCompenent>this.addChild(this._topRender.getComponent("b_but_txt_frame"));

            this.b_friend_tips = this.addChild(this._topRender.getComponent("b_friend_tips"));
 

            
      

            this.uiLoadComplte = true;
            this.showPanel();



        }

    }
}