module skinui {
    import ListItemRender = Pan3d.ListItemRender
    import UIManager = Pan3d.UIManager
    import Rectangle = Pan3d.Rectangle
    import UIConatiner = Pan3d.UIConatiner
    import UIData = Pan3d.UIData
    import PuiData = Pan3d.PuiData
    import TextAlign = Pan3d.TextAlign
    import UIRenderComponent = Pan3d.UIRenderComponent
    import AlphaUIRenderComponent = Pan3d.AlphaUIRenderComponent
    import UiDraw = Pan3d.UiDraw
    import GridList = Pan3d.GridList
    import UIMask = Pan3d.UIMask
    import UIListRenderComponent = Pan3d.UIListRenderComponent
    import Vector2D = Pan3d.Vector2D
    import ListItemData = Pan3d.ListItemData
    import InteractiveEvent = Pan3d.InteractiveEvent
    import LoadManager = Pan3d.LoadManager
    import Scene_data = Pan3d.Scene_data


    import SList = Pan3d.SList
    import UIAtlas = Pan3d.UIAtlas

    import SListItem = Pan3d.SListItem
    import UICompenent = Pan3d.UICompenent

    import SListItemData = Pan3d.SListItemData
    import LabelTextFont = Pan3d.LabelTextFont;

    import ColorType = Pan3d.ColorType;
    import UIRectangle = Pan3d.UIRectangle;
    import TextureManager = Pan3d.TextureManager;
    import IconManager = Pan3d.IconManager

    export class SkinMeshVo {
        public id: number
        public name: string
        public ishave: boolean
        public need: number
    }

    export class SkinListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private S_ranking_id: UICompenent;
        private S_ion_pic: UICompenent;
        private S_select_bt: UICompenent;
        private S_name: UICompenent;
        private S_bg: UICompenent
        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);


            //    this.S_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "S_bg", 0, 0, 500, SkinList.skilcellNum64);

            this.S_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "S_bg", 0, 0, SkinList.num500, 85, 25, 25)

            $container.addChild(this.S_bg);

            this.S_ranking_id = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_ranking_id", 20, 20, 45, 45);
            $container.addChild(this.S_ranking_id);

            this.S_ion_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "S_ion_pic", 100, 10, 64, 64);
            $container.addChild(this.S_ion_pic);

            this.S_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_name", 180, 23, 140, 38);
            $container.addChild(this.S_name);

            this.S_select_bt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "S_select_bt", 330, 20, 110, 49);
            $container.addChild(this.S_select_bt);

            this.S_select_bt.addEventListener(InteractiveEvent.Down, this.butDown, this);
            this.S_select_bt.addEventListener(InteractiveEvent.Up, this.butClik, this);

        }
        private drawNeedDiamondsTxt($ui: UICompenent, value: number): void {
            var idBgRect: Pan3d.UIRectangle = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(idBgRect.pixelWitdh, idBgRect.pixelHeight, false);
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, "Diamonds_icon", new Rectangle(0, 0, 38, 38), UIData.textlist);
            Pan3d.ArtFont.getInstance().writeFontToCtxCenten(this.uiAtlas.ctx, String(value), "NUM41", 80, 8, 6);
            Pan3d.TextureManager.getInstance().updateTexture(this.uiAtlas.texture, idBgRect.pixelX, idBgRect.pixelY, this.uiAtlas.ctx);
        }
        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                var $vo: SkinMeshVo = $data.data
                var $num: number = GameData.hasdiamondsHavenum
                this.uiAtlas.upDataPicToTexture("panelui/skin/pic/" + ($data.id + 1) + ".jpg", this.S_ion_pic.skinName);
                this.drawNeedDiamondsTxt(this.S_name, $vo.need)
                this.drawPicAndTxt(this.S_ranking_id, "List_id_bg", String($data.id + 1), new Vector2D(0, 15), TextAlign.CENTER)

                var $txtStr: string = "购买";
                var $picStr: string = "But_base_1"
                if ($vo.ishave) {
                    $txtStr = ColorType.Black000000+ "使用"
                    $picStr = "But_base_3"
                } else {
                    if ($vo.need > $num) {
                        $picStr = "But_base_2"
                    }
                }

                if (GameData.skinType == $vo.id) {
                    $txtStr = ColorType.Black000000 + "使用中"
                }


                this.drawPicAndTxt(this.S_select_bt, $picStr, $txtStr, new Vector2D(0, 15), TextAlign.CENTER)

                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.S_bg.skinName, UIData.textlist, "List_base_bg_1")
                this.downTarget = null

            }
        }
        private drawPicAndTxt($ui: UICompenent, puslicname: string, txt: string, pos: Vector2D, $align: string = TextAlign.CENTER): void {
            var $rect: Pan3d.UIRectangle = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, puslicname, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.textlist);
            LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, txt, 18, pos.x, pos.y, $align)
            Pan3d.TextureManager.getInstance().updateTexture(this.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this.uiAtlas.ctx);
        }
        private fileColor($iconName: string, $color: string): void {
            var rec: UIRectangle = this.uiAtlas.getRec($iconName);
            rec.pixelX -= 1;
            rec.pixelY -= 1;
            rec.pixelWitdh += 2;
            rec.pixelHeight += 2;
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            this.uiAtlas.ctx.fillStyle = $color
            this.uiAtlas.ctx.fillRect(0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture(this.uiAtlas.texture, rec.pixelX, rec.pixelY, this.uiAtlas.ctx);
        }
        private downTarget: any
        private lastMouseV2d: Vector2D
        public butDown(evt: InteractiveEvent): void {

            this.lastMouseV2d = new Vector2D(evt.x, evt.y)
            this.downTarget = evt.target
        }
        private _num: number = 1;
        private selctSkinById(value: number): void {



            GameData.skinType = value
            GameData.setStorageSync("skinType", String(GameData.skinType))
            GameData.changeWebUserInfo("skin", String(GameData.skinType));

            if (GameData.getStorageSync("useEffictSkin")) {
                //如果正在使用特效皮肤，将先取消
                GameData.setStorageSync("useEffictSkin", false)
                game.GameDataModel.changeMainEffict();
            }
      


            game.GameDataModel.centenBall.changeSkinById(GameData.skinType);
            Pan3d.ModuleEventManager.dispatchEvent(new skinui.SkinListEvent(skinui.SkinListEvent.HIDE_SKIN_LIST_PANEL));
            Pan3d.ModuleEventManager.dispatchEvent(new game.SceneEvent(game.SceneEvent.DIAMONDS_SPRITE_HIT_EVENT));
        }
        public butClik(evt: InteractiveEvent): void {
            if (this.itdata && this.downTarget == evt.target && this.lastMouseV2d && this.lastMouseV2d.x == evt.x && this.lastMouseV2d.y == evt.y) {
                var $vo: SkinMeshVo = this.itdata.data
     
                if ($vo.ishave) {
                    this.selctSkinById($vo.id)
                } else {
                    if ($vo.need <= GameData.hasdiamondsHavenum) {
                        msgalert.AlertUtil.show(ColorType.Black000000 + "确认购买 " + ColorType.Redd92200 + $vo.name + ColorType.Black000000 + " 外形" + " \n需要" + $vo.need + "个钻石", "提示", (value: any) => {
                            if (value == 1) {
                                GameData.hasdiamondsHavenum = GameData.hasdiamondsHavenum - $vo.need
                                var $haveSkinList: Array<number> = GameData.getStorageSync("haveSkinList");
                                if (!$haveSkinList) {
                                    $haveSkinList = new Array()
                                }
                                $haveSkinList.push($vo.id)
                                GameData.setStorageSync("haveSkinList", $haveSkinList)
                                this.selctSkinById($vo.id)
                            }
                        }, 2)
                    } else {
                        msgalert.AlertUtil.show(ColorType.Black000000 + "你身上的钻石不足", "提示", (value: any) => {
                            if (value == 1) {
                                Pan3d. ModuleEventManager.dispatchEvent(new invitation.InvitationEvent(invitation.InvitationEvent.SHOW_INVITATIOIN_PANEL));
                            }
                        }, 2)

                    }
          

                }
            }
        }
    }

 
    export class SkinList extends SList {
        public static skilcellNum64: number = 86
        public static num500: number=456
        public constructor() {
            super();
            this.center = 0;
            this.middle = -50;
            this._maskLevel = 5
        }
        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }
        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, SkinListRender, SkinList.num500, SkinList.skilcellNum64 * 6, 0, SkinList.skilcellNum64, 6, 256, 1024, 1, 10);
        }

        public refreshDataByNewData(value: string): void {
            var $xmlArr: Array<any> = JSON.parse(value);
            var $sListItemData: Array<SListItemData> = this.getData($xmlArr);
            this.refreshData($sListItemData);
        }
        private isHaveById(value: number): boolean {
            var haveSkinList: Array<number> = GameData.getStorageSync("haveSkinList");
            if (haveSkinList) {
                for (var i: number = 0; i < haveSkinList.length; i++) {
                    if (haveSkinList[i] == value) {
                        return true
                    }
                }
            } else {
                return false
            }
        }
        public getData($ary: Array<any>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var item: SListItemData = new SListItemData;
                var $vo: SkinMeshVo = new SkinMeshVo
                $vo.id = $ary[i].id;
                $vo.name = $ary[i].name;
                $vo.need = $ary[i].need;
                $vo.ishave = this.isHaveById($vo.id )
                item.data = $vo
                item.id = i;
                ary.push(item);
            }
            return ary;
        }
        public show(): void {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
 
            }
        }
        public hide(): void {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        }
    }

    export class SkinListPanel extends basewin.BaseWinPanel {
        private _bottomRender: AlphaUIRenderComponent;
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

            this._bottomRender = new AlphaUIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/skin/skin.txt", "panelui/skin/skin.png", () => { this.loadConfigCom() });
        }

        protected butClik(evt: InteractiveEvent): void {
            if (this.win_tip_bg == evt.target) {
                return
            }
            this.isNeedRefrishData = false;
            this.hidePanel();

        }
        private isNeedRefrishData: boolean = true

        private _skinList: SkinList;
 
        private s_tittle_txt: UICompenent
 
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas

            this.winRect = new Rectangle(0, -10, 500, 580)
            this.s_tittle_txt = this.addChild(this._topRender.getComponent("s_tittle_txt"));

            this._skinList = new SkinList();
            this._skinList.init(this._topRender.uiAtlas);

            LoadManager.getInstance().load(Scene_data.fileRoot + "skilxml.txt", LoadManager.XML_TYPE,
                ($data: string) => {
            
                    this.skinXmlData = $data
                    this.uiLoadComplte = true
                    this.showPanel();
                });
  
        }
        private skinXmlData: string
        private lastHasDiamonds: number=0
        public showPanel(): void {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this._skinList.show()
                this._skinList.center = 0;
                this._skinList.middle = 0;
                this.TweenLiteScale(0.1, UIData.Scale, 0.5, () => {
                    if (this.isNeedRefrishData || this.lastHasDiamonds!= GameData.hasdiamondsHavenum) {
                        this._skinList.refreshDataByNewData(this.skinXmlData ) //防止卡，获取数据延后一点
                    }
                    this.isNeedRefrishData = true
                    this.lastHasDiamonds = GameData.hasdiamondsHavenum; //钱不一样的时也刷新数据
                
                });
 
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
           
            }
        }
        public resize(): void {
            super.resize();
            this._skinList.resize()
        

        }
        public hidePanel(): void {
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, () => {
                UIManager.getInstance().removeUIContainer(this);

                this._skinList.hide()
            });
        }

   

    }
}