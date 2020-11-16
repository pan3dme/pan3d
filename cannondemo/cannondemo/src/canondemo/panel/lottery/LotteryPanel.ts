module lottery {
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
    import FrameCompenent = Pan3d.FrameCompenent
    import RoationUICompenent = Pan3d.RoationUICompenent

    import RoationUIRenderComponent = Pan3d.RoationUIRenderComponent

    import GameLevelManeger = game.GameLevelManeger;
    import GameDataModel = game.GameDataModel;
    import SceneEvent = game.SceneEvent;


    export class LotteryMeshVo  {
        public id: number;
        public type: number;
        public num: number;

        public constructor($id: number, $type: number, $num: number) {
            this.id = $id
            this.type = $type
            this.num = $num

        }
    }
    export class LotteryPanel extends H5UIConatiner {

        private _bottomRender: UIRenderComponent;
        private _rotationRender: RoationUIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();
            this.interfaceUI = false;
            this.width = 540
            this.height = 960
            this.center = 0;
            this.middle = 0;

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._rotationRender = new RoationUIRenderComponent();
            this.addRender(this._rotationRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this.makeXml()
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/lottery/lottery.txt", "panelui/lottery/lottery.png", () => { this.loadConfigCom() });

        }
        private item: Array<LotteryMeshVo>
        private makeXml(): void {
            this.item = new Array()

            this.item.push(new LotteryMeshVo(0, 1, 40));
            this.item.push(new LotteryMeshVo(1, 1, 1));
            this.item.push(new LotteryMeshVo(2, 2, 0));
            this.item.push(new LotteryMeshVo(3, 1, 80));
            this.item.push(new LotteryMeshVo(4, 1, 40));
            this.item.push(new LotteryMeshVo(5, 1, 5));
            this.item.push(new LotteryMeshVo(6, 1, 10));
            this.item.push(new LotteryMeshVo(7, 1, 20));

        }

        private a_lottery_rotation: RoationUICompenent;
        private a_start_but: UICompenent;
        private a_win_close_but: UICompenent;
 
        private loadConfigCom(): void {


            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._rotationRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas


            
            this.win_tip_bg = this.addChild(this._bottomRender.getComponent("a_win_bg"));
            this.win_tip_bg.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);
         

            this.addChild(this._bottomRender.getComponent("a_lottery_tittle"));

            this.a_lottery_rotation = this.addEvntBut("a_lottery_rotation", this._rotationRender)
            this.a_lottery_rotation.x = this.a_lottery_rotation.baseRec.x + this.a_lottery_rotation.width / 2;
            this.a_lottery_rotation.y = this.a_lottery_rotation.baseRec.y + this.a_lottery_rotation.height / 2;


 
            this.a_start_but= this.addEvntBut("a_start_but", this._topRender)

            this.addChild(this._topRender.getComponent("a_top_front_pic"));

            this.addChild(this._bottomRender.getComponent("a_have_num_bg"));



            this.a_have_num = this.addChild(this._topRender.getComponent("a_have_num"));

           this.addChild(this._topRender.getComponent("a_left_has_num_pic"));
 
            this.a_right_add_but = this.addEvntBut("a_right_add_but", this._topRender)
        


            this.a_win_close_but=  this.addEvntButUp("a_win_close_but", this._topRender)
            
            
            
 
            this.uiLoadComplte = true
            this.showPanel();

       
        }
        private a_right_add_but: UICompenent
        private a_have_num: UICompenent;
        private shareNum: number = 0;
 
    
        private drawHasNum(value: number): void {

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_have_num.skinName, Pan3d.ColorType.Whiteffffff + String(value), 16, TextAlign.CENTER);
        }
 
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {

                case this.a_start_but:
                  
       
                    break
                case this.a_win_close_but:

                    this.hidePanel()
                    break;

                case this.a_right_add_but:
                    this.mouseDonwAddBut()
                    break

                default:
                    break
            }
          
        }
        private isPLayNow: boolean = false;
        
        private playToNextNum(): LotteryMeshVo {

       
            if (Math.random() > 0.8) {
                return this.item[5]
            } else {
                return this.item[1]
            }
   

 
        }


        private playTo(): void {
            var tempData: EveryDataSync = GameData.getEveryDataSyncByName("lotterydata");
            if (tempData.num > 0) {
                this.isPLayNow = true
                var $vo: LotteryMeshVo = this.playToNextNum()
                this.a_lottery_rotation.rotation = this.a_lottery_rotation.rotation % 360;

                TweenLite.to(this.a_lottery_rotation, 3, {
                    rotation: (360 * 3 + $vo.id * (360 / 8)) , onComplete: () => {
                        console.log("结束")
                        this.isPLayNow = false
                        switch ($vo.type) {
                            case 1:
                               
                                break
                            case 2:
                                break
                            default:
                                break
                        }

                    }
                });
                GameData.setEveryDataSyncByName("lotterydata", tempData.num - 1);
                this.refrishData();
            } else {
                msgalert.OnlyTopTxt.show( "你已没有卷了点击+号邀请好友可获取机会")
            }
         
        }
        private mouseDonwAddBut(): void {
            var maxData: EveryDataSync = GameData.getEveryDataSyncByName("oneDayMaxLotteryNum");
            if (maxData.num > 10) {
             
            } else {
          
                GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.ALL_SHARE_SCENE_ONLY_EVENT), new AllShareMeshVo((value: number) => {
                    if (value == 1) {
                        console.log("分享成功", maxData.num)
                        GameData.setEveryDataSyncByName("oneDayMaxLotteryNum", maxData.num + 1)
                        GameData.setEveryDataSyncByName("lotterydata", GameData.getEveryDataSyncByName("lotterydata").num + 2)
                        this.refrishData();
                    }
                }, AllShareMeshVo.type1))
            }
        }
 
        
        private refrishData(): void {
            var $a: EveryDataSync = GameData.getEveryDataSyncByName("lotteryisGetByData");
            if ($a.num == 0) {
                GameData.setEveryDataSyncByName("lotteryisGetByData", $a.num + 1); //相当于设置了今天已领取
                GameData.setEveryDataSyncByName("lotterydata", 2)  //首次进入为设置为2
            }
            var tempData: EveryDataSync = GameData.getEveryDataSyncByName("lotterydata");

            this.drawHasNum(tempData.num);
        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
        

                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
                this.refrishData()
 
            } else {
                this.h5UIAtlas.testLoading();
            }

        }
        public hidePanel(): void {
 
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, () => {
                UIManager.getInstance().removeUIContainer(this);
            });
        }






    }
}