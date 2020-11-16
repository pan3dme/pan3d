module platform {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;

    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import SelectButton = Pan3d.SelectButton;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import TimeUtil = Pan3d.TimeUtil;
    import Vector3D = Pan3d.Vector3D;
    import Scene_data = Pan3d.Scene_data;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager
    import FrameCompenent=Pan3d.FrameCompenent

    import GameLevelManeger = game.GameLevelManeger;
    import GameDataModel = game.GameDataModel;
    import SceneEvent = game.SceneEvent;



    export class PlatFormPanel extends H5UIConatiner {

        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;


        public constructor() {
            super();
            this.interfaceUI = true;
            this.width = 540
            this.height = 960
            this.left = -345;
            this.middle = 0;

            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/platform/platform.txt", "panelui/platform/platform.png", () => { this.loadConfigCom() });

        }
  
        private a_show_but: SelectButton
        private loadConfigCom(): void {


            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas


            this.addChild(<UICompenent>this._midRender.getComponent("a_base_bg"));
            this.a_show_but = this.addEvntBut("a_show_but", this._midRender);
            this.a_show_but.selected = true

       
            this.uiLoadComplte = true
            this.showPanel();
       
        }
        private drawTempUre($ui: FrameCompenent): void {
            var $data = $ui.data
            GameData.loadImgByPicUrl($data.skin,
                ($img: any) => {
                    var $toRect: Pan3d.Rectangle = $ui.getSkinCtxRect();
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                    $ctx.drawImage($img, 10, 0, 60, 60);
                    LabelTextFont.writeSingleLabelToCtx($ctx, $data.name, 14, 0, 65, Pan3d.TextAlign.CENTER, Pan3d.ColorType.Whiteffffff);
                    $ui.drawToCtx(this._topRender.uiAtlas, $ctx);


                });

        }

        
        protected butClik(evt: InteractiveEvent): void {
            switch (evt.target) {
                case this.a_show_but:
                    if (this.a_show_but.selected) {
                        TweenLite.to(this, 0.3, { left: -345 })
                        this.interfaceUI = true
                    } else {
                        TweenLite.to(this, 0.3, { left: 0 })
                        this.interfaceUI = false
                    }
                    break
                default:
                    GameData.dispatchEvent(new PlatFormEvent(PlatFormEvent.CLIK_PLAT_OTHER_GAME), evt.target.data)
                    break
            }
        }
        private dataItem: Array<any>;
        private isDrawFinish: boolean = false
        public refrishData(value: Array<any>): void {
            this.dataItem = value;
            if (this.uiLoadComplte && this.dataItem && !this.isDrawFinish) {
                for (var i: number = 0; i < this.dataItem.length; i++) {
                    var mc: FrameCompenent = <FrameCompenent>this.addEvntBut("a_game_icon_frame", this._topRender);
                    mc.x = mc.baseRec.x + i % 4 * 80
                    mc.y = mc.baseRec.y + Math.floor(i / 4) * 100
                    mc.goToAndStop(i);
                    mc.data = this.dataItem[i]
            
                    this.drawTempUre(mc)
                }
                this.isDrawFinish = true

            }
        }
   
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.refrishData(this.dataItem);
            } else {
                this.h5UIAtlas.testLoading();
            }

        }
        public hidePanel(): void {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
        }






    }
}