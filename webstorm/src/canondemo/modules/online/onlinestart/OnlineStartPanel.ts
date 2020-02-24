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




    export class OnlineStartPanel extends basewin.BaseWinPanel {
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
            this.h5UIAtlas.setInfo("panelui/online/online.txt", "panelui/online/online.png", () => { this.loadConfigCom() });
        }
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.uiLoadComplte = true

            this.winRect = new Rectangle(0, -20, 400, 400);
            this.ureCellItem = new Array

            for (var i: number = 0; i < 6; i++) {
                var $a_usre_cell: FrameCompenent = <FrameCompenent>this.addChild(this._topRender.getComponent("a_usre_cell"));
                $a_usre_cell.goToAndStop(i)
                $a_usre_cell.x = $a_usre_cell.baseRec.x + 75 * (i % 3)
                $a_usre_cell.y = $a_usre_cell.baseRec.y + 70 * Math.floor(i / 3);
                this.ureCellItem.push($a_usre_cell)

               
            }

            this.addChild(this._topRender.getComponent("a_tittle_txt"));
            this.a_base_but_bg = this.addEvntBut("a_base_but_bg", this._midRender);
            this.addChild(this._topRender.getComponent("a_online_start_txt"));;

    
            this.win_tip_bg.addEventListener(InteractiveEvent.Down, this.butClik, this);
            this.win_tip_bg.addEventListener(InteractiveEvent.Up, this.butClik, this);

            this.showPanel();

        }
        private ureCellItem: Array<FrameCompenent>
        private a_base_but_bg: UICompenent
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_base_but_bg:
                    if (this.skipNum > 4) {
                        Pan3d.ModuleEventManager.dispatchEvent(new mainui.MainuiEvent(mainui.MainuiEvent.HIDE_MAIN_UI_PANEL))
                        if (GameData.gameType == 1) {
                            this.hidePanel();
                            var $tadayStr: string = Pan3d.TimeUtil.getLocalTime0(GameData.getSeverTime() / 1000);
                            var $lastGetDate: string = GameData.getStorageSync("onlineFristEveryDay");
                            if ($lastGetDate != $tadayStr) {
                                OnlineManager.getInstance().canAotuPlay = true;
                            } else {
                                OnlineManager.getInstance().canAotuPlay = false;
                            }
                            ModuleEventManager.dispatchEvent(new OnlineEvent(OnlineEvent.PLAY_ONLINE_SCENE_START));
                            ModuleEventManager.dispatchEvent(new OnlineEvent(OnlineEvent.SHOW_ONLINE_MAIN_PANEL));
                        }
                     
                    }
                    break
                case this.win_tip_bg:
                    break
                default:
                    this.hidePanel()
                    break;
            }
        }

        private clearAll(): void {
            this.skipNum = 0
            for (var i: number = 0; i < this.ureCellItem.length; i++) {
                var $ui: FrameCompenent = this.ureCellItem[i]
                var $toRect: Pan3d.Rectangle = $ui.getSkinCtxRect();
                var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                $ctx.fillStyle = "rgba(66,66,66,1)";
                $ctx.fillRect(0, 0, $toRect.width, $toRect.width);


             

                $ui.drawToCtx(this._topRender.uiAtlas, $ctx);

            }
        }
        private skipNum: number=0
        private oneByOne(): void {
            if (this.skipNum < this.ureCellItem.length) {
                var $onlineUserVo: OnlineUserVo = OnlineManager.getInstance().onleuserlist[this.skipNum]
                this.drawTempUre(this.ureCellItem[this.skipNum], $onlineUserVo.avatar);
                this.skipNum++
                TimeUtil.addTimeOut(100, () => { this.oneByOne() });
            }
        }
        private drawTempUre($ui: FrameCompenent, $url: string): void {
 
            GameData.loadImgByPicUrl($url,
                ($img: any) => {
                    var $toRect: Pan3d.Rectangle = $ui.getSkinCtxRect();
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                    var context = $ctx
                    $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.height);

                    $ctx.fillStyle = "rgba(255,255,255,1)";
                    $ctx.fillRect(0, 0, 5, $toRect.height);
                    $ctx.fillRect(0, 0, $toRect.width, 5);
                    $ctx.fillRect(0, $toRect.height - 5, $toRect.width, 5);
                    $ctx.fillRect($toRect.width - 5, 0, 5, $toRect.height);

                    $ui.drawToCtx(this._topRender.uiAtlas, $ctx);

                    console.log("小熊猫加载成功", $img)
                });
   
        }
        private getWebUser(): void {
            var $arr: Array<OnlineUserVo> = new Array
            var $postStr: string = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            $postStr += "&linage=" + 6;
            GameData.WEB_SEVER_EVENT_AND_BACK("get_money_rank_list", $postStr, (listRes: any) => {
                var ary: Array<SListItemData> = new Array;
                $arr.push(this.getSelfVo());
                for (var i: number = 0; listRes.data && i < listRes.data.list.length; i++) {
                    var $vo: OnlineUserVo = new OnlineUserVo();
                    $vo.name = listRes.data.list[i].name;
                    $vo.avatar = listRes.data.list[i].avatar;
                    $vo.openid = listRes.data.list[i].openid;
                    $vo.skin = listRes.data.list[i].skin;
                    

                    if (!$vo.avatar || $vo.avatar.length <= 1) {
                        $vo.avatar = GameData.emptyiconUrl
                    }
                    if ($arr.length<6&&$vo.openid != GameData.getStorageSync("openid")) {
                        $arr.push($vo);
                    }
                    console.log(listRes)
                }
                OnlineManager.getInstance().onleuserlist = $arr
                this.oneByOne()
            })
        }
        private getSelfVo(): OnlineUserVo {
            var $vo: OnlineUserVo = new OnlineUserVo();
            $vo.name = "我自己";
            $vo.avatar = GameData.emptyiconUrl
            $vo.openid = GameData.getStorageSync("openid");
            $vo.skin = GameData.getStorageSyncNumber("skinType")

            if (GameData.userInfo) {
                $vo.avatar = GameData.userInfo.avatarUrl
                $vo.name = GameData.userInfo.nickName
            }
            return $vo;
        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.clearAll();
                this.getWebUser();
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        }
        public hidePanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().removeUIContainer(this)
                GameData.setStorageSync("onlineTm", GameData.getSeverTime());
            }


        }
    }
}