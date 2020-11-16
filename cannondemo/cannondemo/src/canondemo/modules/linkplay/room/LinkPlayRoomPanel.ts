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
    import Rectangle = Pan3d.Rectangle
    import SListItemData = Pan3d.SListItemData




    export class LinkPlayRoomPanel extends basewin.BaseWinPanel {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();

      

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
            this.h5UIAtlas.setInfo("panelui/linkplay/room/room.txt", "panelui/linkplay/room/room.png", () => { this.loadConfigCom() });
        }
        private a_creat_room_bg: UICompenent
        private a_join_room_bg: UICompenent
        private a_task_list_tittle: UICompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
    

            this.winRect = new Rectangle(0, -20, 450, 600)

 
            this.a_task_list_tittle= this.addEvntBut("a_task_list_tittle", this._topRender)



            this.a_creat_room_bg = this.addEvntButUp("a_creat_room_bg", this._midRender)
            this.a_join_room_bg = this.addEvntButUp("a_join_room_bg", this._midRender)

            this.addChild(this._topRender.getComponent("a_creat_room_but"));
            this.addChild(this._topRender.getComponent("a_join_room_but"));

            this._taskUiList = new LinkPlayRoomList();
            this._taskUiList.init(this._topRender.uiAtlas);

    

            MsEngine.getInstance().initMsEngine(() => {
                this.uiLoadComplte = true
                this.showPanel();

                this.loadPanelH5UiXml();
            })

        }
        private loadPanelH5UiXml(): void {

            var $arr: Array<string> = new Array;
            $arr.push("panelui/linkplay/linkplaymain/linkplaymain");
            $arr.push("panelui/linkplay/roomstart/roomstart");
 


            for (var i: number = 0; i < $arr.length; i++) {
                var $name: string = $arr[i]
                var $h5UIAtlas: H5UIAtlas = new H5UIAtlas
                $h5UIAtlas.setInfo($name + ".txt", $name + ".png", () => { });
            }

        }
        private _taskUiList: LinkPlayRoomList
  
 
     
        protected butClik(evt: InteractiveEvent): void {

            switch (evt.target) {
                case this.a_join_room_bg:
                    if (this.selectRoomVo) {

                        MsEngine.getInstance().getRoomDetail(this.selectRoomVo.data, (rsp: MsGetRoomDetailRsp) => {
                            console.log("rsp", rsp)
                            if (rsp.state == 2) {
                                msgalert.AlertUtil.show("此房已关闭", "提示", (value: any) => {
                                    if (value == 1) {
                                        this.showPanel();
                                    }
                                }, 2)

                            } else {
                                MsEngine.getInstance().joinRoom(this.selectRoomVo.data)
                                this.hidePanel()
                            }

                        })
                        
                    }
       
                    break
                case this.a_creat_room_bg:
                   // MsEngine.getInstance().createRoom();
                    Pan3d.ModuleEventManager.dispatchEvent(new LinkPlayRoomEvent(LinkPlayRoomEvent.CREAT_LINK_PLAY_PANEL));
                    this.hidePanel()
                    break
                case this.base_win_close:
                    this.hidePanel()
                    break
                case this.a_task_list_tittle:
                    this.showPanel()
                    break
                default:
                    break
            }

        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                this.selectRoomVo = null;
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this._taskUiList.show();
                MsEngine.getInstance().getRoomListEx();

                MsEngine.linkplayGamestatus=0
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }

            }
        }
        public roomListPesonse(value:  Array<MsRoomAttribute>): void {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < value.length; i++) {
                var item: SListItemData = new SListItemData;
                var roomMeshVo: RoomMeshVo = new RoomMeshVo();
                roomMeshVo.txt = ColorType.Whitefff4d6 + "每日无尽榜单奖励"
                roomMeshVo.data = value[i]
                item.data = roomMeshVo;
                item.id=i
                ary.push(item)
            }
            this._taskUiList.refreshData(ary);

        }
       public selectRoomVo:RoomMeshVo
        public hidePanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().removeUIContainer(this)
                this._taskUiList.hide()
            }


        }
    }
}