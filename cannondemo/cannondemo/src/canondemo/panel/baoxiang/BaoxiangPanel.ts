module baoxiang {
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

    export class BaoxiangPanel extends H5UIConatiner {
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
            this.h5UIAtlas.setInfo("panelui/baoxiang/baoxiang.txt", "panelui/baoxiang/baoxiang.png", () => { this.loadConfigCom() });

        }


 

        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas

            this.win_tip_bg = this.addEvntBut("a_win_tip_bg", this._bottomRender)
            this.win_tip_bg .addEventListener(InteractiveEvent.Up, this.butClik, this);
 

    
   
            this.addChild(this._topRender.getComponent("a_big_pic"));

            this.addChild(this._topRender.getComponent("a_win_tittle"));
 
            this.addChild(this._topRender.getComponent("a_info_txt"));

            this.a_get_num_label = this._topRender.getComponent("a_get_num_label")
 

  
            //this.a_share_but = this.addEvntBut("a_share_but", this._topRender);
            //this.a_look_video = this.addEvntBut("a_look_video", this._topRender);


            this.a_big_but = this.addEvntBut("a_big_but", this._topRender);
            this.a_small = this.addEvntBut("a_small", this._topRender);


 


            this.a_close = this.addEvntBut("a_close", this._topRender);

            this.a_win_close_but = this.addEvntBut("a_win_close_but", this._topRender);

            

            this.uiLoadComplte = true;
          
 
            this.showPanel();
    

        }
        private a_big_but: SelectButton;
        private a_small: SelectButton;

        private a_win_close_but: UICompenent
        private a_get_num_label: UICompenent
        private resetBaoxiang(): void {
            var $str: string = GameData.getStorageSync("hasBaoxiang")
            var $arr: Array<any>
            if ($str) {
                $arr = JSON.parse($str);
                for (var i: number = 0; i < $arr.length; i++) {
                    if ($arr[i].name == this.selectVo.name) {
                        $arr.splice(i, 1);
                    }
                }
                GameData.setStorageSync("hasBaoxiang", JSON.stringify($arr));
            }
        }
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_close:
                case this.a_win_close_but:
                    this.hidePanel();
                    this.resetBaoxiang()
                    break
                case this.a_big_but:
                    if (this.tobeLookVideo) {
                        this.toLookAdAndPlay()
                    } else {
                        this.shareBut_Clik()
                    }
                    break
                case this.a_small:
                    if (this.tobeLookVideo) {
                        this.shareBut_Clik()
                    } else {
                        this.toLookAdAndPlay()
                    }
                    break
                default:
                    break

            }

            this.changeButSelect()
          
        }
        private shareBut_Clik(): void {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo((value: number) => {
                if (value == 1) {
                    this.openBaoxianLog(1)
                    GameData.hasdiamondsHavenum += this.selectVo.num
                    msgalert.OnlyTopTxt.show(Pan3d.ColorType.Whiteffffff + "获得钻石+" + this.selectVo.num)
 
                    this.hidePanel();
                }
            }, AllShareMeshVo.type11))
        }
        private  openBaoxianLog(value: number): void {  //0和1
            var $postAddShare: string = "";
            $postAddShare += "openid=" + GameData.getStorageSync("openid");
            $postAddShare += "&chest_id=" + this.selectVo.name;
            $postAddShare += "&chest_type=" + value;
 
            GameData.WEB_SEVER_EVENT_AND_BACK("add_chest_log", $postAddShare);
        }

        private toLookAdAndPlay(): void {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), (value: number) => {
                if (value == 2) {
                    var $tipStr: string = "需要看完视屏才能领取宝箱";
                    if (GameData.severinfo.adshareModel == 0) { //兼容模式视屏有双倍宝箱
                        $tipStr = "需要看完视屏才能领取双倍宝箱";
                    }
                    msgalert.AlertUtil.show($tipStr, "提示", (value: any) => {
                    }, 2)
                }
                if (value == 1) {
                    this.openBaoxianLog(2)
                    var $addNum: number = this.selectVo.num
                    if (GameData.severinfo.adshareModel == 0) {//兼容模式视屏有双倍宝箱
                        $addNum += this.selectVo.num
                    }
                    msgalert.OnlyTopTxt.show(Pan3d.ColorType.Whiteffffff + "获得钻石+"+ $addNum)
                    GameData.hasdiamondsHavenum += $addNum;
                    this.hidePanel();
                } 
                if (value == 0) {
                    //视频看完了，就只能分享；
                    this.shareBut_Clik();
                }

            })



        }

 
        private a_close: UICompenent
  
        private selectVo: BaoxiangMeshVo
        public refrishData(value: BaoxiangMeshVo): void {
            this.selectVo = value

            if (this.selectVo && this.uiLoadComplte) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_get_num_label.skinName, Pan3d.ColorType.Redff0000 + this.selectVo.num, 26, Pan3d.TextAlign.CENTER);
            }

        }
        private tobeLookVideo: boolean = false
        private changeButSelect(): void {

        
            if (GameData.severinfo.adshareModel == 1) {
                this.tobeLookVideo = true;
            } else {
                this.tobeLookVideo = false;
            }
            if (GameData.severinfo.adshareModel != 0) {
                this.setUiListVisibleByItem([this.a_small], false);
                this.a_close.y = this.a_close.baseRec.y - 40
            } else {
                if (!this.tobeLookVideo && !GameData.isCanUseLookVideoBut) {
                    this.setUiListVisibleByItem([this.a_small], false);
                    this.a_close.y = this.a_close.baseRec.y - 40
                }
            }
            if (GameData.SystemInfo) {
                var th: number = GameData.SystemInfo.windowHeight;
       
                this.a_close.bottom = th * UIData.Scale * 0.23

            }
 

            this.a_big_but.selected = this.tobeLookVideo;
            this.a_small.selected = this.tobeLookVideo;
        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
                this.refrishData(this.selectVo)

                this.changeButSelect()

                this.setUiListVisibleByItem([this.a_win_close_but, this.a_close], false);

      

                Pan3d.TimeUtil.addTimeOut(1000, () => {
                    this.setUiListVisibleByItem([this.a_close], true);
                })
                Pan3d.TimeUtil.addTimeOut(3000, () => {
                    this.setUiListVisibleByItem([this.a_win_close_but], true);
                })

            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            
            }
        }

        private hidePanel(): void {
            this.setUiListVisibleByItem([this.a_win_close_but, this.a_close], false);
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, () => {
                UIManager.getInstance().removeUIContainer(this);
      
            });
        }
      

    }

}