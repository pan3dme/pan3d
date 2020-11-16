module linkplay {
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
    import Vector2D = Pan3d.Vector2D
    import Rectangle = Pan3d.Rectangle
    import SListItemData = Pan3d.SListItemData
    import SelectButton = Pan3d.SelectButton


    import GameDataModel = game.GameDataModel



    export class LinkPlayMainUiPanel extends H5UIConatiner {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;



        public constructor() {
            super();

            this.interfaceUI = true
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);




            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/linkplay/linkplaymain/linkplaymain.txt", "panelui/linkplay/linkplaymain/linkplaymain.png", () => { this.loadConfigCom() });
        }

        private a_add_tm: UICompenent;
        private a_sub_tm: UICompenent;
        private a_count_down_txt: UICompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;



            this.a_exit_but = this.addEvntBut("a_exit_but", this._topRender)
            this.a_play_time_txt = this.addEvntBut("a_play_time_txt", this._topRender)

            this.a_add_tm = this.addEvntBut("a_add_tm", this._topRender)
            this.a_sub_tm = this.addEvntBut("a_sub_tm", this._topRender)

            this.a_count_down_txt = this.addChild(<UICompenent>this._topRender.getComponent("a_count_down_txt"));
            this.a_reconnect_txt = <UICompenent>this._topRender.getComponent("a_reconnect_txt");


            this.a_talk_but = this.addChild(<UICompenent>this._topRender.getComponent("a_talk_but"));
            this.a_talk_but.addEventListener(InteractiveEvent.Down, this.TALK_DOWN_CLIK, this);
        


            this.a_talk_tip_txt = <UICompenent>this._topRender.getComponent("a_talk_tip_txt");

 



            this.uiLoadComplte = true;
            this.showPanel();


            TimeUtil.addFrameTick(() => { this.upFrame() });
        }
        private startRecorderTm: number;
        private mouseDownPos: Vector2D;
        private lastButPos: Vector2D
        protected TALK_DOWN_CLIK(evt: InteractiveEvent): void {
            this.mouseDownPos = new Vector2D(evt.x, evt.y)
            this.lastButPos = new Vector2D(this.a_talk_but.x, this.a_talk_but.y)
            GameData.WX_RECORDER_START_EVENT((value: any) => {
                console.log("录音开始")
                this.startRecorderTm = TimeUtil.getTimer()
                this.setUiListVisibleByItem([this.a_talk_tip_txt], true)
                Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.TALK_UP_CLIK, this);
                Scene_data.uiStage.addEventListener(InteractiveEvent.Move, this.TALK_MOVE_CLIK, this);
            })
        }
        protected TALK_MOVE_CLIK(evt: InteractiveEvent): void {
            this.a_talk_but.x = this.lastButPos.x + (evt.x - this.mouseDownPos.x) / UIData.Scale;
            this.a_talk_but.y = this.lastButPos.y + (evt.y - this.mouseDownPos.y) / UIData.Scale;

            this.a_talk_tip_txt.y = this.a_talk_but.y -50
            this.a_talk_tip_txt.x = this.a_talk_but.x - 20

        }
        protected TALK_UP_CLIK(evt: InteractiveEvent): void {

            if ((TimeUtil.getTimer() - this.startRecorderTm) > 1000) {
                GameData.WX_RECORDER_END_EVENT((data: any) => {
                    console.log("录音结束", data)
                    if (data.success) {
                        console.log("发送到其它用户", data.filename)
                        var $soundUrl: string = "https://api.h5key.com/static/voice/" + data.filename
                        if (GameData.devicetypepc) {
                            $soundUrl =  "https://commcdn.chiji-h5.com/wdqq/v6/sound/pass.mp3"
                        }
 
                        MsEngine.getInstance().sendEventJason(JSON.stringify({ type: 5, data: $soundUrl}));
                    }
                })
            } else {
                console.log("小于1秒不发送")
                GameData.WX_RECORDER_END_EVENT(null)
            }
            this.setUiListVisibleByItem([this.a_talk_tip_txt], false);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Up, this.TALK_UP_CLIK, this);
            Scene_data.uiStage.removeEventListener(InteractiveEvent.Move, this.TALK_MOVE_CLIK, this);
        }

        private a_talk_but: UICompenent
        private a_talk_tip_txt: UICompenent
        private a_reconnect_txt: UICompenent;
        public showReconnectTxt(): void {
            if (this.uiLoadComplte) {
                this.setUiListVisibleByItem([this.a_reconnect_txt], true)
                TimeUtil.addTimeOut(1000, () => {
                    this.setUiListVisibleByItem([this.a_reconnect_txt], false)
                })
            }
        }
        private showPlayTime: boolean = true
        private upFrame(): void {
            var tm: number = TimeUtil.getTimer() - GameDataModel.levelStartTm;
            if (this.showPlayTime) {

                var keyStr: string = " ";
                keyStr += "tm" + tm;
                keyStr += "\n" + Math.floor(tm / 10);
                keyStr += "\n" + Math.floor(tm / 100);
                keyStr += "\n" + Math.floor(tm / 1000);
             //   LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_play_time_txt.skinName, keyStr, 16, TextAlign.LEFT);
            }
            if (tm < 2 * 1000) {
                var stm: number = 2 - Math.floor(tm / 1000)
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_count_down_txt.skinName, String(stm), "NUM41", TextAlign.CENTER);
                this.a_count_down_txt.x = this.a_count_down_txt.baseRec.x
            } else {
                this.a_count_down_txt.x = this.a_count_down_txt.baseRec.x + 10000
            }



        }
        private a_play_time_txt: UICompenent
        private a_exit_but: UICompenent


        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_exit_but:
                    msgalert.AlertUtil.show("是否确定退出", "提示", (value: any) => {
                        MsEngine.linkplayGamestatus = -1//退出后将不再重连接

                        if (value == 1) {
                            if (MsEngine.getInstance().BrokenLine) { //掉线直接退出
                                ModuleEventManager.dispatchEvent(new LinkPlayEvent(LinkPlayEvent.CLEAR_LINKPLAY_SCENE_ALL))
                                Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL))
                            } else {
                                MsEngine.getInstance().leaveRoom(() => { //没掉线选退出
                                    ModuleEventManager.dispatchEvent(new LinkPlayEvent(LinkPlayEvent.CLEAR_LINKPLAY_SCENE_ALL))
                                    Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.SHOW_MAIN_UI_PANEL))
                                })
                            }
                        }
                    }, 2)

                    break
                case this.a_talk_but:
      
            


                    break
                case this.a_add_tm:
      
                    this.showPlayTime = !this.showPlayTime;



                    break
                case this.a_sub_tm:
                    GameDataModel.levelStartTm -= 1000;

                    break


                default:

                    break;
            }
        }

        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
            } else {
                this.h5UIAtlas.testLoading();
            }
        }
        public hidePanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().removeUIContainer(this)
            }
        }
    }
}