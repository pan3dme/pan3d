module special {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import Vector2D = Pan3d.Vector2D
    import Rectangle = Pan3d.Rectangle
    import TimeUtil = Pan3d.TimeUtil
    import UiDraw = Pan3d.UiDraw
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager

    import Physics = canonkey.Physics
    import GameDataModel = game.GameDataModel
 

    export class SpecialLevelTopPanel extends H5UIConatiner {
        private _bottomRender: UIRenderComponent;
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();

            this.width = 540
            this.height = 960
            this.center = 0;
            this.middle = 0;

            this.interfaceUI = true

            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);
 

            this.timeUint = () => this.upFrame()

            this.h5UIAtlas = new H5UIAtlas;
 
            this.h5UIAtlas.setInfo("panelui/special/special.txt", "panelui/special/special.png", () => { this.loadConfigCom() });

         
        }
        private upFrame(): void {

            var $str: string ="00:00"
            if (Physics.ready) {
                $str = TimeUtil.getDiffTime2(Math.floor((TimeUtil.getTimer() - GameDataModel.levelStartTm) / 1000))
                $str=  $str.substring(3, $str.length)
            }

            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.b_use_tm_txt.skinName, $str, 26, TextAlign.CENTER);
        }
        private timeUint: Function
        public onAdd(): void {
            super.onAdd()
           
            TimeUtil.addTimeTick(1000, this.timeUint)


        }

        public onRemove(): void {
            super.onRemove()
            TimeUtil.removeTimeTick(this.timeUint)
        }

        private b_use_tm_txt: UICompenent
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas
 
            this.b_use_tm_txt = this.addChild(<UICompenent>this._bottomRender.getComponent("b_use_tm_txt"))

            this.b_use_tm_txt.top=150

            this.b_rank_info = this.addChild(<UICompenent>this._bottomRender.getComponent("b_rank_info"))
            this.b_rank_info.top = this.b_rank_info.baseRec.y;
            this.b_rank_info.left = 0;
            this.uiLoadComplte = true
        
            this.showPanel()

        }
        private b_rank_info: UICompenent
        public rankeList: Array<GameUserVo>;
     
        private drawRankCell( ): void {
            var $ui: UICompenent = this.b_rank_info
            var $rect: Pan3d.UIRectangle = this._topRender.uiAtlas.getRec($ui.skinName);
            this._topRender.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            for (var i: number = 0; this.rankeList && i < this.rankeList.length; i++) {
                var $userVo: GameUserVo = this.rankeList[i]
                var $pos: Vector2D = new Vector2D(0, i * 26)
                UiDraw.cxtDrawImg(this._topRender.uiAtlas.ctx, "List_id_rank" + (1 + i), new Rectangle(0, $pos.y, 28, 28), UIData.textlist);

                var $str: string = TimeUtil.getDiffTime2(Math.floor($userVo.data / 1000))
                $str = $str.substring(3, $str.length)
                $str = $userVo.name.substr(0, 10) + Pan3d.ColorType.Whiteffffff + "(" + $str + ")"

                LabelTextFont.writeSingleLabelToCtx(this._topRender.uiAtlas.ctx, Pan3d.ColorType.Black000000 + $str, 16, 28, $pos.y + 5, TextAlign.LEFT)
            }

            Pan3d.TextureManager.getInstance().updateTexture(this._topRender.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this._topRender.uiAtlas.ctx);
        }
    
        public showPanel(): void {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this)
                this.drawRankCell()
            } else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        }
        public hiedPanel(): void {
            if (this.uiLoadComplte && this.hasStage) {
                UIManager.getInstance().removeUIContainer(this)
            }
        }

  
    }

}