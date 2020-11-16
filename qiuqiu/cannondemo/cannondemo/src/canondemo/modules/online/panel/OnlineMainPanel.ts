module online {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import FrameCompenent = Pan3d.FrameCompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager
    import TimeUtil = Pan3d.TimeUtil
    import ColorType = Pan3d.ColorType
    import Rectangle = Pan3d.Rectangle
    import SListItemData = Pan3d.SListItemData




    export class OnlineMainPanel extends H5UIConatiner {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        private _aoutRender: UIRenderComponent;



        public constructor() {
            super();

            this.interfaceUI = true
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
            this._aoutRender = new UIRenderComponent();
   

            this.frameFun = () => { this.upFrame() }

            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/online/online.txt", "panelui/online/online.png", () => { this.loadConfigCom() });
        }
        private userListUiArr: Array<FrameCompenent>
        private b_aotu_but: FrameCompenent
        private b_exit_online_but_bg: UICompenent
        private b_time_txt: UICompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._aoutRender.uiAtlas = this.h5UIAtlas;


            this.addChild(this._topRender.getComponent("b_tittle_txt"));
            this.b_time_txt=  this.addChild(this._topRender.getComponent("b_time_txt"));

            this.b_exit_online_but_bg = this.addEvntBut("b_exit_online_but_bg", this._midRender);
            this.addChild(this._topRender.getComponent("b_exit_online_but"));

            this.b_aotu_but = <FrameCompenent>this.addEvntBut("b_aotu_but", this._topRender);
            this.b_aotu_but.goToAndStop(0)
            this.userListUiArr = new Array
            for (var i: number = 0; i < 6; i++) {
                var $ui: FrameCompenent = <FrameCompenent>this.addChild(this._topRender.getComponent("b_user_list"));
                $ui.goToAndStop(i)
                $ui.y = $ui.baseRec.y+32*i
                this.userListUiArr.push($ui)
            }

           

            this.aotuTxtItem = new Array;
            for (var j: number = 0; j < 5; j++) {

                var $outuui: UICompenent = this.addChild(this._aoutRender.getComponent("b_aotu_txt" + j));
                this.aotuTxtItem.push($outuui);
            }

            this.uiLoadComplte = true;
            this.showPanel();

        }
        private aotuTxtItem: Array<UICompenent>
        private frameFun: Function;
        private endTm: number
        private upFrame(): void {
            var $n = this.endTm - TimeUtil.getTimer()
            if ($n > 0) {
                this.drawTimeTime(Math.floor($n / 1000))
                this.drawUserListData();
             
                for (var i: number = 0; i < this.aotuTxtItem.length; i++) {
                    var $tm: number = TimeUtil.getTimer() /5
                    var $ui: UICompenent = this.aotuTxtItem[i];
                   // console.log($ui.baseRec);
                   // width: 30, height
                    $tm = $tm - i * 50
                    var $v: number = Math.sin($tm * Math.PI / 180) * 0.2;
                    $ui.width = $ui.baseRec.width * (1 + $v);
                    $ui.height = $ui.baseRec.height * (1 + $v);

                    $ui.x = $ui.baseRec.x - $ui.width / 2 + $ui.baseRec.width/2
                    $ui.y = $ui.baseRec.y - $ui.height / 2 + $ui.baseRec.height / 2
                }

               // this._aoutRender.applyObjData()

            } else {
                TimeUtil.removeFrameTick(this.frameFun);
                ModuleEventManager.dispatchEvent(new OnlineEvent(OnlineEvent.SHOW_ONLINE_FINISH_PANEL))
            }

        }

        private drawTimeTime(value: number): void {
       
            var s: number = Math.floor(value/60 )
            var m: number = Math.floor((value % 60 ))

            var str: string = (s < 10 ? "0" : "") + s + ":" + (m < 10 ? "0" : "") + m

            if (this.b_time_txt.data != str) { //如果同就不必要刷新。
                this.b_time_txt.data = str
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.b_time_txt.skinName, str, "NUM44", TextAlign.CENTER);
            }
        }
        private canDrawTm: number
        private drawUserListData(): void {
            if (this.canDrawTm < TimeUtil.getTimer()) {
                OnlineManager.getInstance().onleuserlist.sort((a: OnlineUserVo, b: OnlineUserVo) => { return a.num > b.num ? -1 : 1 });
                for (var i: number = 0; i < this.userListUiArr.length; i++) {
                    var $onlineUserVo: OnlineUserVo = OnlineManager.getInstance().onleuserlist[i]
                    var $ui: FrameCompenent = this.userListUiArr[i]
                    if ($ui.data != $onlineUserVo) {
                        $ui.data = $onlineUserVo;
                        this.drawPicToUi($ui, $onlineUserVo,i);
                    } 
                   
                }
                this.canDrawTm = TimeUtil.getTimer()+5000
            }
     
        }
        private drawPicToUi($temp: FrameCompenent, $onlineUserVo: OnlineUserVo, $rank: number): void {
            GameData.loadImgByPicUrl($onlineUserVo.avatar,
                ($img: any) => {
                    var $toRect: Pan3d.Rectangle = $temp.getSkinCtxRect();
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                

                    $ctx.drawImage($img, 0, 0,30, 30);
                    $ctx.fillStyle = "rgba(255,255,255,1)";
                    $ctx.fillRect(0, 0, 2, 30);
                    $ctx.fillRect(0, 0, 30, 2);
                    $ctx.fillRect(0, 30 - 2, 30, 2);
                    $ctx.fillRect(30 - 2, 0, 2, 30);

                    LabelTextFont.writeSingleLabelToCtx($ctx, $onlineUserVo.name, 18, 30, 0, Pan3d.TextAlign.LEFT, Pan3d.ColorType.Black000000);

                    $temp.drawToCtx(this._topRender.uiAtlas, $ctx);
 
                });

          
        }
  
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {

                case this.b_aotu_but:
  
                   

                    break

                case this.b_exit_online_but_bg:
                    msgalert.AlertUtil.show("是否确定退出，本局夺宝将不记为奖励", "提示", (value: any) => {
                        if (value == 1) {
                            ModuleEventManager.dispatchEvent(new OnlineEvent(OnlineEvent.CLEAR_ONLINE_SCENE_ALL))
                            Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL))
                        }
                    }, 2)
                    break

                default:
                    this.hidePanel()
                    break;
            }
        }

        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
         
                this.endTm = TimeUtil.getTimer() + GameData.severinfo.onlinegame.playtime * 1000;
                this.canDrawTm=0
                TimeUtil.addFrameTick(this.frameFun);
    
            } else {
        
                 this.h5UIAtlas.testLoading();
          
            }
        }
        public hidePanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().removeUIContainer(this)
                TimeUtil.removeFrameTick(this.frameFun);
            }


        }
    }
}