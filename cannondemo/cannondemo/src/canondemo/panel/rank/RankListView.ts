module rank {
    import SList = Pan3d.SList
    import UIAtlas = Pan3d.UIAtlas
    import Vector2D = Pan3d.Vector2D
    import Rectangle = Pan3d.Rectangle
    import UIManager = Pan3d.UIManager
    import SListItem = Pan3d.SListItem
    import UICompenent = Pan3d.UICompenent
    import UIRenderComponent = Pan3d.UIRenderComponent
    import UIConatiner = Pan3d.UIConatiner
    import InteractiveEvent = Pan3d.InteractiveEvent
    import SListItemData = Pan3d.SListItemData
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ColorType = Pan3d.ColorType;
    import UIRectangle = Pan3d.UIRectangle;
    import TextureManager = Pan3d.TextureManager;
    import UiDraw = Pan3d.UiDraw

    export class RankUiList extends SList {
        public constructor() {
            super();
            this.center = 0;
            this.middle = -0;
            this._maskLevel=6
        }
        public init($uiAtlas: UIAtlas): void {
            this.baseAtlas = $uiAtlas;
            this.initData();
        }
        private initData(): void {
            var $ary = new Array<SListItemData>();
            this.setData($ary, RankViewRender, 420, 80*6, 0, 80, 6, 256, 1024, 1,10);
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

    export class RankViewRender extends SListItem {
        public static baseAtlas: UIAtlas;
 
        private F_ranking_id: UICompenent;
        private F_ion_pic: UICompenent;
        private F_level_num: UICompenent;
        private F_name: UICompenent;
        private F_bg: UICompenent
        public create($container: UIConatiner, $bgRender: UIRenderComponent, $baseRender: UIRenderComponent, $customizeRenderAry: Array<UIRenderComponent> = null): void {
            super.create($container, $bgRender, $baseRender, $customizeRenderAry);

            
          //  this.F_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Rank_bg", 0, 0, 450, 80);
            this.F_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Rank_bg", 0, 0, 420, 80, 25, 25)
            $container.addChild(this.F_bg);

            this.F_ranking_id = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Rank_ranking_id", 20, 10, 45, 45);
            $container.addChild(this.F_ranking_id);

            this.F_ion_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Rank_ion_pic", 90,5, 60, 60);
            $container.addChild(this.F_ion_pic);

            this.F_name = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Rank_name", 180, 28, 100, 20);
            $container.addChild(this.F_name);

            this.F_level_num = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Rank_res", 300, 28, 60, 20);
            $container.addChild(this.F_level_num);
      
        }
        public render($data: SListItemData): void {
            this.itdata = $data;
            if ($data && $data.data) {
                var $vo: GameUserVo = $data.data
                var $isSelf: boolean = ($vo.selfRank == $data.id)
                var $txtColor: string = $isSelf ? ColorType.Green20a200 : ColorType.Black000000
               // LabelTextFont.writeSingleLabel(this.uiAtlas, this.F_ranking_id.skinName, String($data.id), 16, TextAlign.CENTER, $txtColor);
                this.uiAtlas.upDataWebPicToTexture($vo.avatar, this.F_ion_pic.skinName);
             
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.F_name.skinName, $vo.name, 16, TextAlign.CENTER, $txtColor);
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.F_level_num.skinName, String($vo.resnum), 16, TextAlign.CENTER, $txtColor);
               // this.fileColor(this.F_bg.skinName, $data.id % 2 == 0 ? "rgba(239,221,196,1)" : "rgba(229,209,183,1)")

                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.F_bg.skinName, UIData.textlist, "List_base_bg_1")
                var $rankNum: number = $data.id  
                if ($rankNum == 1) {
                    this.drawPicAndTxt(this.F_ranking_id, "List_id_rank1","", new Vector2D(0, 15), TextAlign.CENTER)
                } else if ($rankNum == 2) {
                    this.drawPicAndTxt(this.F_ranking_id, "List_id_rank2", "", new Vector2D(0, 15), TextAlign.CENTER)
                } else if ($rankNum == 3) {
                    this.drawPicAndTxt(this.F_ranking_id, "List_id_rank3","", new Vector2D(0, 15), TextAlign.CENTER)
                } else {
                    this.drawPicAndTxt(this.F_ranking_id, "List_id_bg", String($rankNum), new Vector2D(0, 15), TextAlign.CENTER)
                }
              
            }
           
        }
        private drawPicAndTxt($ui: UICompenent, puslicname: string, txt: string, pos: Vector2D, $align: string = TextAlign.CENTER): void {
            var $rect: Pan3d.UIRectangle = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, puslicname, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.textlist);
            LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, txt, 16, pos.x, pos.y, $align)
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
        private _num: number = 1;
        public butClik(evt: InteractiveEvent): void {
          
        }
    }

}