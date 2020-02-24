module timegift {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;

    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import SelectButton = Pan3d.SelectButton;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import TimeUtil = Pan3d.TimeUtil;
    import Vector3D = Pan3d.Vector3D;
    import Vector2D = Pan3d.Vector2D;
    import Scene_data = Pan3d.Scene_data;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager
    import FrameCompenent=Pan3d.FrameCompenent

    import GameLevelManeger = game.GameLevelManeger;
    import GameDataModel = game.GameDataModel;
    import SceneEvent = game.SceneEvent;


    export class TimeGiftVo  {
        public id: number
        public time: number
        public num: number
        public type: number
        public endTm: number
      
        public constructor(value: any) {
      
            this.id = value.id
            this.time = value.time
            this.num = value.num
            this.type = value.type
            this.endTm = TimeUtil.getTimer() + this.time *1000
        }
 
    }

    export class TimeGiftPanel extends H5UIConatiner {

        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();
            this.interfaceUI = true;
            this.width = 540
            this.height = 960
            this.center = 0;
            this.middle = 0;

            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/timegift/timegift.txt", "panelui/timegift/timegift.png", () => { this.loadConfigCom() });

        }

        private a_gfit_bg_pic: UICompenent;
        private a_gift_bg_time_txt: UICompenent;
        private loadConfigCom(): void {


            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas


            this.a_gfit_bg_pic = this.addEvntBut("a_gfit_bg_pic", this._midRender)
            this.a_gift_bg_time_txt =  <UICompenent>this._midRender.getComponent("a_gift_bg_time_txt");
            
 
            this.uiLoadComplte = true
            this.showPanel();
            this.toV2d = new Vector2D(1, 0)
            if (this.getNextTimeGift(0)) {
                this.timegiftVo = new TimeGiftVo(this.getNextTimeGift(0))
            }

      
            TimeUtil.addFrameTick(() => {
                this.upFrame()
            })

      
       
        }
    
        private getNextTimeGift(value: number): any {
            for (var key in GameData.diamondsconfigRes.timegift) {
                if (GameData.diamondsconfigRes.timegift[key].id == String(value)) {
                    return GameData.diamondsconfigRes.timegift[key];
                }
            }
        }
        private timegiftVo: TimeGiftVo;
 

        private toV2d: Vector2D
        private upFrame(): void {
            var $selfMaxLevel: number = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL);
            if (this.timegiftVo && GameData.gameType == 1 && $selfMaxLevel>5 ) {
                var $str: string = Pan3d.ColorType.Redff0000 + "00:00"
                if (this.timegiftVo.endTm > TimeUtil.getTimer()) {
                    var timeNumkey: number = Math.floor((this.timegiftVo.endTm - TimeUtil.getTimer()) / 1000)
                    $str = TimeUtil.getDiffTime2(timeNumkey)
                    $str = $str.substring(3, $str.length)

                    this.a_gfit_bg_pic.x = this.a_gfit_bg_pic.baseRec.x
                    this.a_gfit_bg_pic.y = this.a_gfit_bg_pic.baseRec.y

                } else {
                    if (this.toV2d) {
                        this.a_gfit_bg_pic.x += this.toV2d.x
        
                        if (this.a_gfit_bg_pic.x > 540) {
                            this.toV2d.x = -1
 
                        }
                        if (this.a_gfit_bg_pic.x < 0) {
                            this.toV2d.x = 1
    
                        }
                        this.a_gfit_bg_pic.y+=0.01
                        if (this.a_gfit_bg_pic.y > 700) {
                            this.a_gfit_bg_pic.y = this.a_gfit_bg_pic.baseRec.y
                        }
                    } 
                }



                if (this.lastTimeTxt != $str) {
                    LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_gift_bg_time_txt.skinName, $str, 16, TextAlign.CENTER);
                    this.lastTimeTxt = $str
      
                }
              

            } else {
                this.a_gfit_bg_pic.x = 0
                this.a_gfit_bg_pic.y=10000
            }
  
        }
   
        private lastTimeTxt: string
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_gfit_bg_pic:
                    for (var i: number = 0; i < Pan3d.UIManager.getInstance()._containerList.length; i++) {
                        if (Pan3d.UIManager.getInstance()._containerList[i].interfaceUI == false) {
                            return;
                        }
                    }

                    
               
                    break
                default:
                    break
            }
          
        }
        private showTimeGiftVo(vo: TimeGiftVo): void {
         
            switch (vo.type) {
                case 1:
                    msgalert.AlertUtil.show("观看视屏可以获取" + vo.num + "钻石奖励", "提示", (value: any) => {
                        if (value == 1) {
                            if (GameData.devicetypepc) {

                                TimeUtil.addTimeOut(2000, () => {
                                    msgalert.AlertUtil.show("获取得了" + this.timegiftVo.num + "钻石", "提示", (bet: any) => {
                                        this.clikFinish();
                                    }, 2)
                                })
                            } else {
                                this.lookVideoEvet();
                            }
                        }
                    }, 2)

                    break
                case 2:
                    msgalert.AlertUtil.show("分享可获取" + vo.num + "钻石奖励", "提示", (value: any) => {
                        if (value == 1) {
                            TimeUtil.addTimeOut(1000, () => {
                                GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo(($bres: number) => {
                                    if ($bres == 1) {
                                        msgalert.AlertUtil.show("获取得了" + vo.num + "钻石", "提示", (bet: any) => {
                                            this.clikFinish();
                                        }, 2)
                                    }
                                }))
                            })
                   
                        }
                    }, AllShareMeshVo.type8)

                    break
                default:
                    break
            }

        }
 
   
 
        private clikFinish(): void {
            GameData.hasdiamondsHavenum += this.timegiftVo.num;
            var $temp: any = this.getNextTimeGift(this.timegiftVo.id + 1)

            var tempData: EveryDataSync = GameData.getEveryDataSyncByName("timeGiftInfo");
    
            if (tempData.num >= (GameData.diamondsconfigRes.timegift.length - 2)) {
                this.timegiftVo = null
                //当前取得的奖励超过了总的，将不再显示
            } else {
                if ($temp) {
                    this.timegiftVo = new TimeGiftVo($temp)
                } else {
                    this.timegiftVo = null
                }
                GameData.setEveryDataSyncByName("timeGiftInfo", tempData.num + 1)
            }

        }

        private lookVideoEvet(): void {
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), (value: number) => {
                if (value == 0) {
                    msgalert.AlertUtil.show("网络已断开,无法看到广告", "提示")
                } else if (value == 1) {
                    msgalert.AlertUtil.show("获取得了" + this.timegiftVo.num+"钻石", "提示", (bet: any) => {
                        this.clikFinish();
                    }, 2)
             
                } else if (value == 2) {
                    msgalert.AlertUtil.show("需要看完视屏才能得到" + this.timegiftVo.num +"奖励", "提示", (bee: any) => {
                        if (bee == 1) {
                            this.lookVideoEvet();
                        }
                    }, 2)
                }
            })
        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
 
            } else {
                this.h5UIAtlas.testLoading();
            }

        }
        public hidePanel(): void {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
        }






    }
}