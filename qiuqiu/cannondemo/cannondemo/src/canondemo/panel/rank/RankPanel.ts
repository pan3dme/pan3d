module rank {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import FrameCompenent = Pan3d.FrameCompenent;
    import UIManager = Pan3d.UIManager;
    import UIAtlas = Pan3d.UIAtlas;
    import SListItemData = Pan3d.SListItemData
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ColorType = Pan3d.ColorType;
    import Rectangle = Pan3d.Rectangle;
    import SelectButton = Pan3d.SelectButton
    import Vector2D = Pan3d.Vector2D;
    import UiDraw = Pan3d.UiDraw

    export class RankPanel extends basewin.BaseWinPanel {
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
            this.h5UIAtlas.setInfo("panelui/rank/rank.txt", "panelui/rank/rank.png", () => { this.loadConfigCom() });


        }
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.base_win_close:
                    this.hidePanel()
                    break
                case this.a_tab_1:
                    this.selectTab(1)
                    break
                case this.a_tab_2:
                    this.selectTab(2)
                    break
                default:
                    break
            }
        }
        private selectTab(value: number): void {
            if (value == 1) {
                this.a_tab_1.selected = false;
                this.a_tab_2.selected = true;
                this.a_tab_txt1.goToAndStop(1);
                this.a_tab_txt2.goToAndStop(2);

                this.getWebLevelList(1)
            }  

            if (value == 2) {
                this.a_tab_1.selected = true;
                this.a_tab_2.selected = false;
                this.a_tab_txt1.goToAndStop(0);
                this.a_tab_txt2.goToAndStop(1);

                this.getWebLevelList(2);
            }  

       

        }
        private hidePanel(): void {
            if (this.uiLoadComplte) {
       

                this.TweenLiteScale(UIData.Scale, 0.1, 0.2, () => {
                    UIManager.getInstance().removeUIContainer(this)
                    this._rankUiList.hide();
                });
            }

        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this._rankUiList.show();
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
                
            }

        }
        
        private getWebLevelList(tabType: number): void {

            var $webStr: string 
            if (tabType == 1) {
                GameData.changeWebUserInfo("level", String(GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL)));
                $webStr = "get_user_level_rank_list"
            } else {
                $webStr = "get_money_rank_list"
                GameData.changeWebUserInfo("money", String(GameData.hasdiamondsHavenum));
            }
            var $postStr: string = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            $postStr += "&linage=" + 99;

            if (GameData.userInfo&&GameData.userInfo.province) {
                if (GameData.severinfo.rankarea.indexOf(GameData.userInfo.province) != -1) {
                    $postStr += "&area=" + GameData.userInfo.province;
                }
            }
       
     
        
            GameData.WEB_SEVER_EVENT_AND_BACK($webStr, $postStr, (listRes: any) => {
                var ary: Array<SListItemData> = new Array;
                console.log(listRes.data)
                for (var i: number = 0; listRes.data && i < listRes.data.list.length; i++) {
                    var $vo: GameUserVo = new GameUserVo();
                    $vo.resnum = listRes.data.list[i].money;
                    $vo.name = listRes.data.list[i].name;
                    $vo.avatar = listRes.data.list[i].avatar;
                    $vo.selfRank = listRes.data.rank;
                    if (!$vo.avatar || $vo.avatar.length <= 1) {
                        $vo.avatar = GameData.emptyiconUrl
                    }
                    var item: SListItemData = new SListItemData;
                    item.data = $vo
                    item.id = listRes.data.list[i].rank
                    ary.push(item);

                }
                this._rankUiList.refreshData(ary);
                this.drawSelfInfo(listRes.data.rank, tabType)
            })
        }
   

        public resize(): void {
            super.resize();
            this._rankUiList.resize()
        }

        private drawSelfInfo(value: number, tabType: number): void {
 
            if (GameData.userInfo) {
                var $selfTxt: string = ""
                if (value >= 1000 || value<=0) {
                    $selfTxt = "999"
                } else {
                    $selfTxt = String(value)
                }
                this.drawPicAndTxt(this.a_self_rank_id, "List_id_bg", $selfTxt, new Vector2D(0, 15), TextAlign.CENTER)
                this._topRender.uiAtlas.upDataWebPicToTexture(GameData.userInfo.avatarUrl, this.a_self_icon.skinName);

                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_self_name.skinName, GameData.userInfo.nickName, 16, TextAlign.CENTER, ColorType.Black000000);
                var $str: string = ""

                if (tabType == 1) {
                    $str = String(GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL))
                } else {

                    $str = String(GameData.hasdiamondsHavenum)
                }

                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_self_res_txt.skinName, $str , 16, TextAlign.CENTER, ColorType.Black000000);
    
            }
        }
        private drawPicAndTxt($ui: UICompenent, puslicname: string, txt: string, pos: Vector2D, $align: string = TextAlign.CENTER): void {
            var $rect: Pan3d.UIRectangle = this._topRender.uiAtlas.getRec($ui.skinName);
            this._topRender.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            UiDraw.cxtDrawImg(this._topRender.uiAtlas.ctx, puslicname, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.textlist);
            LabelTextFont.writeSingleLabelToCtx(this._topRender.uiAtlas.ctx, txt, 16, pos.x, pos.y, $align)
            Pan3d.TextureManager.getInstance().updateTexture(this._topRender.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this._topRender.uiAtlas.ctx);
        }
 
        private _rankUiList: RankUiList;
  
        private a_self_rank_id: UICompenent
        private a_self_icon: UICompenent
        private a_self_name: UICompenent
        private a_self_res_txt: UICompenent

        private a_tab_1: SelectButton
        private a_tab_2: SelectButton
        private a_tab_txt1: FrameCompenent
        private a_tab_txt2: FrameCompenent
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas

            this.winRect = new Rectangle(0, 10, 470, 700)
            this.addChild(this._topRender.getComponent("a_win_tittle_txt"));
            this.a_tab_1 = <SelectButton>this.addEvntButUp("a_tab_1", this._midRender)
            this.a_tab_2 = <SelectButton>this.addEvntButUp("a_tab_2", this._midRender)
            this.a_tab_txt1 = <FrameCompenent>this.addChild(this._midRender.getComponent("a_tab_txt1"));
            this.a_tab_txt2 = <FrameCompenent>this.addChild(this._midRender.getComponent("a_tab_txt2"));

          
            this.addEvntButUp("a_self_rank_bg", this._midRender)
            this.a_self_rank_id = this.addChild(this._topRender.getComponent("a_self_rank_id"));
            this.a_self_icon = this.addChild(this._topRender.getComponent("a_self_icon"));
            this.a_self_name = this.addChild(this._topRender.getComponent("a_self_name"));
            this.a_self_res_txt = this.addChild(this._topRender.getComponent("a_self_res_txt"));
            
            this._rankUiList = new RankUiList();
            this._rankUiList.init(this._topRender.uiAtlas);

            this.uiLoadComplte = true;
            this.showPanel()

            this.selectTab(1)

        }

      




    }
}