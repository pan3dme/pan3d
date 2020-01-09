module camand {
    import ListItemRender = Pan3d.ListItemRender
    import UIManager = Pan3d.UIManager
    import Rectangle = Pan3d.Rectangle
    import UIConatiner = Pan3d.UIConatiner
    import UIData = Pan3d.UIData
    import PuiData = Pan3d.PuiData
    import TextAlign = Pan3d.TextAlign
    import UIRenderComponent = Pan3d.UIRenderComponent
    import UiDraw = Pan3d.UiDraw
    import GridList = Pan3d.GridList
    import UIMask = Pan3d.UIMask
    import UIListRenderComponent = Pan3d.UIListRenderComponent
    import Vector2D = Pan3d.Vector2D
    import ListItemData = Pan3d.ListItemData
    import InteractiveEvent = Pan3d.InteractiveEvent

    import PandaMeshData = rightpanda.PandaMeshData


    export class CammandRender extends ListItemRender {

        public draw(): void {

            var ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D(this.uvData.ow, this.uvData.oh, false);
            // UiDraw.cxtDrawImg(ctx, PuiData.Slist_select, new Rectangle(0, 0, 98, 50), UIData.publicUi);
            ctx.fillStyle = "rgba(66,66,66,0.5)"
            ctx.fillRect(0, 0, 98, 50);
            this.drawLable(ctx, 50, 15, this._listItemData.data.txt, 16, "#ffffff", false);
            this.atlas.updateCtx(ctx, this.uvData.ox, this.uvData.oy);

        }

        private drawLable(ctx: CanvasRenderingContext2D,
            $xpos: number, $ypos: number,
            $str: string, fontsize: number, fontColor: string, bolder: boolean = false): void {

            ctx.textAlign = TextAlign.CENTER;
            ctx.font = "italic 16px 黑体";
            ctx.fillStyle = "White";
            ctx.fillText($str, $xpos, $ypos);
        }


    }


    export class CammandPanel extends UIConatiner {


        private _backRender: UIRenderComponent;
        private _butRender: UIRenderComponent;
        private _baseRender: UIRenderComponent;
        private _listRender: UIListRenderComponent;

        private static _instance: CammandPanel;
        public static getInstance(): CammandPanel {
            if (!this._instance) {
                this._instance = new CammandPanel();
            }
            return this._instance;
        }
        public constructor() {
            super();
            this.width = 400;
            this.height = 600;
            this.center = 0;
            this.middle = 0;

            this._listRender = new UIListRenderComponent;
            this.addRender(this._listRender);

            this._baseRender = new UIRenderComponent();
            this.addRender(this._baseRender);

            this.addList()
        }
        private _bgList: GridList;
        private _bgMask: UIMask;
        private addList(): void {
            var $pos: Vector2D = new Vector2D(0, 0)
            this._bgList = this._listRender.createGridList();
            this._bgList.x = $pos.x;
            this._bgList.y = $pos.y;

            this.addChild(this._bgList);

            this._bgMask = new UIMask();
            this._bgMask.x = $pos.x;
            this._bgMask.y = $pos.y;
            this._bgMask.width = 512;
            this._bgMask.height = 512;
            this.addMask(this._bgMask);

            this._listRender.mask = this._bgMask;

            this._bgMask.level = 7
            this.refreshData()

        }
        private refreshData(): void {
            var ary: Array<ListItemData> = new Array;
            var butItem: Array<string> = [
                "关闭返回",
                "开起关卡",
                "审核模式",
                "显示共享",
                "钻石1000",
                "神秘宝箱",
                "看完视屏",
                "更新openid",
                "删除微信",
                "场景颜色",
                "隐藏界面",
                "增加邀请",
                "显示阴影",
                

            ]

            for (var i: number = 0; i < butItem.length; i++) {
                var listItemData: ListItemData = new ListItemData();
                listItemData.data = { txt: butItem[i], id: i };
                listItemData.clickFun = ($listItemData: ListItemData) => { this.itemDataClick($listItemData) }
                ary.push(listItemData);
            }
            this._bgList.contentY = 0;
            this._bgList.setGridData(ary, CammandRender, 4, 100, 52, 512, 512, 512, 512);

        }

        private keyNum: number = 10
        private iconNum: number = 0
        private info: any
        private uploadFile(): void {

            var client = new OSS.Wrapper({
                accessKeyId: this.info.AccessKeyId,
                accessKeySecret: this.info.AccessKeySecret,
                stsToken: this.info.SecurityToken,
                endpoint: "https://oss-cn-shanghai.aliyuncs.com",
                bucket:"webpan"
            });
            var storeAs = "upfile/ossfile" + random(9999) + ".txt";
            var $byte: Pan3d.Pan3dByteArray = new Pan3d.Pan3dByteArray()
            $byte.writeUTF("就是这样子")
            var file: File = new File([$byte.buffer], "ossfile.txt");
            client.multipartUpload(storeAs, file).then(function (result) {
                console.log(result);
            }).catch(function (err) {
                console.log(err);
            });
        }
        private colorId: number = 0
 
        private itemDataClick($listItemData: ListItemData): void {
            var str: string = $listItemData.data.txt
            this.hide()
            switch (str) {
                case "更新openid":
                    var openid: string = "panjiazhi_" + random(9999);
                    GameData.setStorageSync("openid", openid);

                    console.log(GameData.getStorageSync("openid"))
                    break
                case "看完视屏":

                    GameData.isLookVideoErr()
                    break

                case "增加邀请":
                
                    var $postStr: string = "";
                    $postStr += "from_openid=" + GameData.getStorageSync("openid"); //别人的
                    $postStr += "&openid=" + "id_" + random(300000) //自己的
                    $postStr += "&info=" + 1254;
                    $postStr += "&type=" + 4;

                    GameData.WEB_SEVER_EVENT_AND_BACK("add_advertise", $postStr, (res: any) => { })
                    break
                case "隐藏界面":
                    Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.HIDE_MAIN_UI_PANEL))

       
                    break
                case "神秘宝箱":
                    PandaMeshData.showRightPanda(PandaMeshData.key15, Scene_data.fileRoot + "ui/panda/15.png", new offline.OffLineEvent(offline.OffLineEvent.SHOW_OFFLINE_PANEL));
                    break
                case "审核模式":

                    if (GameData.severinfo.wxcloudModel == 1) {
                        GameData.severinfo.wxcloudModel = 2
                    } else {
                        GameData.severinfo.wxcloudModel = 1
                    }
                    break
                case "显示阴影": 
                    shadow.ShadowModel.visible = !shadow.ShadowModel.visible
                    break;
                case "请求oss":
                    GameData.webseverurl = "https://api.h5key.com/api/";
                    GameData.WEB_SEVER_EVENT_AND_BACK("get_STS", "id=" + 99, (res: any) => {
                        this.info = res.data.info
                        console.log(this.info)

                        this.uploadFile()
                    })
                    GameData.webseverurl = "https://wxwdqq.chiji-h5.com/api/";
                    break;
                case "场景颜色":

                    
                    game.GameSceneColor.makeBaseColor(this.colorId++%5)
          

                    break;
                case "求助图标":

        
                    break;
                case "多人联机":

      
                    Pan3d.ModuleEventManager.dispatchEvent(new linkplay.LinkPlayRoomEvent(linkplay.LinkPlayRoomEvent.SHOW_LINK_PLAY_ROOM_PANEL));
                  
                    break;
                case "好友排行":
                    Pan3d.ModuleEventManager.dispatchEvent(new friendrank.FriendRankEvent(friendrank.FriendRankEvent.SHOW_FRIEND_RANK_PANEL));
                    break;
                case "删除微信":
                    Pan3d.ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.REMOVE_USER_STORAGE_INFO));
                    break;
                case "无尽模式":
                    this.hide()
                    //   Pan3d.ModuleEventManager.dispatchEvent(new endless.EndLessEvent(endless.EndLessEvent.ENDLESS_MODEL_START))
                    /*
                    var obj: PandaMeshData = new PandaMeshData();
                    obj.url = Scene_data.fileRoot + "ui/panda/11.png";
                    obj.type = PandaMeshData.type1;
                    obj.key = PandaMeshData.key11
                    obj.data = new endless.EndLessEvent(endless.EndLessEvent.ENDLESS_MODEL_START)
                    var $topUiViewEvent: rightpanda.RightPandaEvent = new rightpanda.RightPandaEvent(rightpanda.RightPandaEvent.SHOW_PANDA_INFO);
                    $topUiViewEvent.data = obj
                    Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent)
                    */

                    PandaMeshData.showRightPanda(PandaMeshData.key11, Scene_data.fileRoot + "ui/panda/11.png", new endless.EndLessStartEvent(endless.EndLessStartEvent.SHOW_ENDLESS_START_PANEL))

                    break;
                case "显示帮助":
                    PandaMeshData.showRightPanda(PandaMeshData.key1, Scene_data.fileRoot + "ui/panda/1.png", new help.HelpEvent(help.HelpEvent.SHOW_HELP_LIST_PANEL))

                    PandaMeshData.showRightPanda(PandaMeshData.key6, Scene_data.fileRoot + "ui/panda/6.png", new rank.RankEvent(rank.RankEvent.SHOW_RANK_PANEL))

                    this.hide()

                    break;
                case "关闭返回":
                    this.hide()

                    break;
                case "联机夺宝":
                    this.hide()
                    /*
                    var obj: PandaMeshData = new PandaMeshData();
                    obj.url = Scene_data.fileRoot + "ui/panda/13.png";
                    obj.type = PandaMeshData.type1;
                    obj.key = PandaMeshData.key13
                    obj.data = new online.OnlineEvent(online.OnlineEvent.SHOW_ONLINE_START_PANEL)
                    var $topUiViewEvent: rightpanda.RightPandaEvent = new rightpanda.RightPandaEvent(rightpanda.RightPandaEvent.SHOW_PANDA_INFO);
                    $topUiViewEvent.data = obj
                    Pan3d.ModuleEventManager.dispatchEvent($topUiViewEvent)
                    */
                    PandaMeshData.showRightPanda(PandaMeshData.key13, Scene_data.fileRoot + "ui/panda/13.png", new online.OnlineStartEvent(online.OnlineStartEvent.SHOW_ONLINE_START_PANEL))

                    break;
                case "显示任务":
                    this.hide()


                    Pan3d.ModuleEventManager.dispatchEvent(new task.TaskEvent(task.TaskEvent.SHOW_TASK_PANEL));
                    break;


                case "错误视屏":
                    this.hide()
       
                    break;
                case "显示助力":
                    this.hide()
                    Pan3d.ModuleEventManager.dispatchEvent(new invitation.InvitationEvent(invitation.InvitationEvent.SHOW_INVITATIOIN_PANEL));
                    break;
                case "更新重起":
                    this.hide()
                    Pan3d.ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_GAME_UPDATA_EVENT))
                    break;
                case "读取录像":
                    this.hide()
                  
                    break;
                case "保存自己":

                    GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.SEND_TO_APPER_DATA), { key: "保存自己", data: { level: game.GameDataModel.levelNum, time: random(999999) } })
                    break;

                case "分享游戏":
 
                    break;



                case "钻石1000":

                    GameData.hasdiamondsHavenum = 300
                    break;
                case "显示本地":



                    break;
                case "显示外部":
                    PandaMeshData.showRightPanda(this.keyNum++, Scene_data.fileRoot + "ui/userpic/" + random(10) + ".jpg", null);
                    this.hide()
                    break;
                case "提示框":
                    msgalert.AlertUtil.show("请收集更多钻石!\n请收集更多钻石请收集更多钻石 ")
                    this.hide()
                    break;
                case "打印位置":
                    var $pos: Pan3d.Vector3D = new Pan3d.Vector3D(game.GameDataModel.centenBall.x, game.GameDataModel.centenBall.y, game.GameDataModel.centenBall.z)
                    console.log($pos)

                    break;
                case "显示日志":

                    this.hide()
                    break;
                case "显示皮肤":
                    Pan3d.ModuleEventManager.dispatchEvent(new skinui.SkinListEvent(skinui.SkinListEvent.SHOW_SKIN_LIST_PANEL));
                    this.hide()
                    break;
                case "开起关卡":
                    GameData.setStorageSync(GameData.SELF_MAX_LEVEL, 55)
                    PandaMeshData.showRightPanda(PandaMeshData.key16, Scene_data.fileRoot + "ui/panda/16.png", new selectlevel.SelectLevelEvent(selectlevel.SelectLevelEvent.SHOW_SELECT_LEVEL));
                    break;
                case "开关物理":
                    canonkey.Physics.ready = !canonkey.Physics.ready;
                    break;
                case "Fram3d开关":
                    frame3d.FrameCanonPrefabSprite.isMove = !frame3d.FrameCanonPrefabSprite.isMove
                    break
                case "开关Fps":

                    break
                case "选择关卡":

                    break
     
                default:

                    break
            }
        }

        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        }
        public hide(): void {

            UIManager.getInstance().removeUIContainer(this);
        }






    }

}