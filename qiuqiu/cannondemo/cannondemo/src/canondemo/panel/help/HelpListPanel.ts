module help {
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

    import PandaMeshData = rightpanda.PandaMeshData


    export class HelpCallList extends SList {
        public static skilcellNum64: number = 86
        public static rollNum500=450
        public constructor() {
            super();
            this.center = 0;
            this.middle = -50;
            this._maskLevel = 4
        }
        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }
        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, HelpCallListRender, HelpCallList.rollNum500, HelpCallList.skilcellNum64 * 6, 0, HelpCallList.skilcellNum64, 6, 256, 1024, 1, 10);
        }
 
        public getData($ary: Array<any>): Array<SListItemData> {
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var item: SListItemData = new SListItemData;
                item.data = $ary[i];
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

    export class HelpCallListRender extends SListItem {
        public static baseAtlas: UIAtlas;

        private B_id: UICompenent;
        private B_head_pic: UICompenent;
        private B_select_bt: UICompenent;
        private B_name: UICompenent;
        private B_bg: UICompenent

        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);


            this.B_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "B_bg", 0, 0, HelpCallList.rollNum500, 85, 25, 25)
            $container.addChild(this.B_bg);

            this.B_id = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_id", 20, 20, 45, 45);
            $container.addChild(this.B_id);

            this.B_head_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "B_head_pic", 100, 10, 64, 64);
            $container.addChild(this.B_head_pic);

            this.B_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_name", 180, 25, 100, 24);
            $container.addChild(this.B_name);

            this.B_select_bt = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "B_select_bt", 320, 18, 115, 52);
            $container.addChild(this.B_select_bt);
            this.B_select_bt.addEventListener(InteractiveEvent.Up, this.butClik, this);

        }
        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                var $vo: HelpOtherVo = $data.data
                var infoArr: Array<string> = String($vo.user_info).split("|")
                var picUir: string = infoArr[1];

                var $needNum: number = this.itdata.data.need;
                var $num: number = GameData.hasdiamondsHavenum
                 //LabelTextFont.writeSingleLabel(this.uiAtlas, this.B_id.skinName, String($data.id + 1), 16, TextAlign.CENTER, ColorType.Black000000);

                this.drawPicAndTxt(this.B_id, "List_id_bg", String($data.id + 1), new Vector2D(0, 15), TextAlign.CENTER)

                LabelTextFont.writeSingleLabel(this.uiAtlas, this.B_name.skinName, "关卡" + $vo.level, 20, TextAlign.CENTER, ColorType.Black000000, "", 2);
                this.drawPicAndTxt(this.B_select_bt, "But_base_1", "帮助他", new Vector2D(0, 15), TextAlign.CENTER)
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.B_bg.skinName, UIData.textlist, "List_base_bg_1")

                if (picUir) {
                    GameData.loadImgByPicUrl(picUir,
                        ($img: any) => {
                            var rec: Pan3d.UIRectangle = this.uiAtlas.getRec(this.B_head_pic.skinName);
                            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
                            this.uiAtlas.ctx.drawImage($img, 0, 0, rec.pixelWitdh, rec.pixelHeight);
                            Pan3d.TextureManager.getInstance().updateTexture(this.uiAtlas.texture, rec.pixelX, rec.pixelY, this.uiAtlas.ctx);
                        });
                }

            } else {
                this.drawNull()
            }

        }
        private drawPicAndTxt($ui: UICompenent, puslicname: string, txt: string, pos: Vector2D, $align: string = TextAlign.CENTER): void {
            var $rect: Pan3d.UIRectangle = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, puslicname, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.textlist);
            LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, txt, 18, pos.x, pos.y, $align)
            Pan3d.TextureManager.getInstance().updateTexture(this.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this.uiAtlas.ctx);
        }
        private drawNull(): void {
            UiDraw.clearUI(this.B_id);
            UiDraw.clearUI(this.B_head_pic);
            UiDraw.clearUI(this.B_name);
            UiDraw.clearUI(this.B_select_bt);
    
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
        private _num: number = 1;
        public butClik(evt: InteractiveEvent): void {
            if (this.itdata) {
                var $vo: HelpOtherVo = this.itdata.data;
                var infoArr: Array<string> = String($vo.user_info).split("|");

                GameData.helpBeforSelfLevel = game.GameDataModel.levelNum;
                GameData.helpinfo = $vo
                GameData.dispatchToLevel($vo.level)


                rightpanda.PandaMeshData.showCentenTxtInfoType(rightpanda.PandaMeshData.key105, Pan3d.ColorType.Black000000 + "帮助 " + $vo.userNickName + " 第 " + $vo.level + " 关", () => {
                 
                })

  
                Pan3d.ModuleEventManager.dispatchEvent(new HelpEvent(HelpEvent.HIDE_HELP_LIST_PANEL))
 

            }
        }
    }

    export class HelpListPanelView extends basewin.BaseWinPanel {
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
            this.h5UIAtlas.setInfo("panelui/help/help.txt", "panelui/help/help.png", () => { this.loadConfigCom() });
        }
        protected butClik(evt: InteractiveEvent): void {
            this.hidePanel();
        }
        private _helpCallList: HelpCallList;
        private loadConfigCom(): void {
            this._bottomRender.uiAtlas = this.h5UIAtlas 
            this._topRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas 


            this.winRect = new Rectangle(0, -10, 500, 580)

            this.addChild(<UICompenent>this._topRender.getComponent("a_help_tittle_txt"));


            this.uiLoadComplte = true;

            this._helpCallList = new HelpCallList();
            this._helpCallList.init(this._topRender.uiAtlas);
            this._helpCallList.center = 0;
            this._helpCallList.middle = 0;

            this.refrishData(this.showData);
            this.showPanel();
        }
 
        private s_has_diamonds_txt: UICompenent
        private s_back_an: UICompenent
        public showPanel(): void {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this._helpCallList.show();
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
      
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
             
            }
        }
        public hidePanel(): void {
            this.TweenLiteScale(UIData.Scale, 0.1, 0.2, () => {
                UIManager.getInstance().removeUIContainer(this);
                this._helpCallList.hide();
            });
        
        }

        public resize(): void {
            super.resize();
            this._helpCallList.resize()
        }
        private showData: any;
        public refrishData(value: any): void {
            if (value) {
                this.showData = value;
                if (this._helpCallList) {
                    this.makeItemListData(this.showData)
                }
            }
        }
        private makeItemListData($ary: Array<any>): void {
            //openid: "id1536150054950_1732", state: 1, level: 24, helper_info: "", time: 1536156879, …}
            var ary: Array<SListItemData> = new Array;
            for (var i: number = 0; i < $ary.length; i++) {
                var item: SListItemData = new SListItemData;
                var $melpOtherVo: HelpOtherVo = new HelpOtherVo()
                $melpOtherVo.meshObj($ary[i])

                item.data = $melpOtherVo;
                item.id = i;
                ary.push(item);
            }
            this._helpCallList.refreshData(ary);
        }
    

    }
}