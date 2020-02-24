module rightpanda {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import FrameTipCompenent = Pan3d.FrameTipCompenent
    import FrameUIRender = Pan3d.FrameUIRender
    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import UIManager = Pan3d.UIManager;
    import FrameCompenent = Pan3d.FrameCompenent
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import TimeUtil = Pan3d.TimeUtil;
    import Vector3D = Pan3d.Vector3D;
    import Scene_data = Pan3d.Scene_data;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager

    import GameLevelManeger = game.GameLevelManeger;
    import GameDataModel = game.GameDataModel;
    import SceneEvent = game.SceneEvent;

    import PandaMeshData = rightpanda.PandaMeshData


    export class RightPandaPanel extends H5UIConatiner {
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        public constructor() {
            super();
            this.interfaceUI = true;
            this.width = 540
            this.height = 960
            this.right = 0;
            this.top = 0;

            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/rightpanda/rightpanda.txt", "panelui/rightpanda/rightpanda.png", () => { this.loadConfigCom() });

        }


        private a_tittle_level_bg: UICompenent
        private loadConfigCom(): void {


            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._frameItem = new Array
            this.waitTipsItem = new Array;
 

            for (var i: number = 0; i < 5; i++) {
                var $temp: FrameCompenent = <FrameCompenent>this._topRender.getComponent("a_panda_icon_frame")
                $temp.addEventListener(InteractiveEvent.Down, this.butDown, this);
                $temp.addEventListener(InteractiveEvent.Up, this.butClik, this);
                $temp.goToAndStop(i)
                this._frameItem.push($temp);
            }
            
 
            this.uiLoadComplte = true

          //  this.showExpEff()

            this.showPanel();
        }
        private lastDownTm: number
        private butDown(evt: InteractiveEvent): void {
            this.lastDownTm = Pan3d.TimeUtil.getTimer()
        }
     
        private removeFrameUi(ui: UICompenent): void {
            this.removeChild(ui);
            this.resizeUi();
        }
      
        protected butClik(evt: InteractiveEvent): void {
            if (GameDataModel.isLevelFinish) {
                return
            }
            if (GameData.gameType ==2) {
                msgalert.AlertUtil.show("点左上角返回关卡", "提示", (value: any) => {

                }, 2)
                return;
            }

            if (Math.abs(Pan3d.TimeUtil.getTimer() - this.lastDownTm) < 1000) {
                var ui: FrameCompenent = <FrameCompenent>evt.target
                var $vo: PandaMeshData = ui.data;
                GameData.saveUseClikInfo(String($vo.key));
                if ($vo.data instanceof Pan3d.BaseEvent) {
                    ModuleEventManager.dispatchEvent($vo.data);
                }
                if ($vo.data instanceof Function) {
                    $vo.data && $vo.data();
                }
                switch ($vo.key) {
                    case PandaMeshData.key4:
                    case PandaMeshData.key14:
                    case PandaMeshData.key7:
                        break
                    default:
                        this.removeFrameUi(ui)
                        break

                }

            }

        }
     
        public pushPandaInfo($vo: PandaMeshData): void {
            if (!this.uiLoadComplte) {
                return
            }
            if (this.isCanAddByKey($vo.key)) {
                var $temp: FrameCompenent = this.getCanUseUi();
                if ($temp) {
                    $temp.data = $vo;
                    $temp.name = String(this._sortId++)
                    this.addChild($temp);
                    this.drawPicToUi($temp);
                 
                } else {
                    console.log("提示信息不够")
                }
            }
            this.waitTipsItem.push($vo);
            this.resizeUi()
        }
        private getCanUseUi(): FrameCompenent {
            for (var i: number = 0; i < this._frameItem.length; i++) {
                if (!Boolean(this._frameItem[i].parent)) {
                    return this._frameItem[i]
                }
            }
            return null
        }
        private resizeUi(): void {
            var $ty: number = 0
            this._frameItem.sort(
                function (a: UICompenent, b: UICompenent): number {
                    return Number(a.name) - Number(b.name);
                }
            )
            for (var i: number = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    $ty += 85
                    var $toy: number = this._frameItem[i].baseRec.y + $ty
                    TweenLite.to(this._frameItem[i], 0.3, { y: $toy })
                   
                }
            }
        }
        private _sortId: number = 0
        private _frameItem: Array<FrameCompenent>
        private selectShowText: string;
        private waitTipsItem: Array<PandaMeshData>;
       
        public clearPandaInfo(value: PandaMeshData): void {
            console.log("清理pandata")
            for (var i: number = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    var $vo: PandaMeshData = this._frameItem[i].data;
                    if ($vo.key == value.key) {
                        this.removeChild(this._frameItem[i]);
                        this.resizeUi();
                    }
                }
            }

        }
        private isCanAddByKey($key: number): boolean {
            for (var i: number = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    var $vo: PandaMeshData = this._frameItem[i].data;
                    if ($vo.key == $key) {
                        return false
                    }
                }
            }
            return true

        }
        private clearFrameCompenent($temp: FrameCompenent): void {
            var $toRect: Pan3d.Rectangle = $temp.getSkinCtxRect();
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            var context = $ctx
            context.fillStyle = "rgba(66,66,66,0)";
            context.fillRect(0, 0, $toRect.width, $toRect.width);
            $temp.drawToCtx(this._topRender.uiAtlas, $ctx);
        }
        private drawEmpetBlack($temp: FrameCompenent): void {
            var $toRect: Pan3d.Rectangle = $temp.getSkinCtxRect();
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            var context = $ctx

            context.fillStyle = "rgba(66,66,66,1)";
            console.log($toRect.width, $toRect.width)
            context.fillRect(0, 0, $toRect.width, $toRect.width);


            $temp.drawToCtx(this._topRender.uiAtlas, $ctx);
        }
        private drawPicToUi($temp: FrameCompenent): void {
            this.clearFrameCompenent($temp)
            var $vo: PandaMeshData = $temp.data;
 
            if ($vo.url.indexOf("https://wx") != -1) {
                this.drawEmpetBlack($temp)
            }
            GameData.loadImgByPicUrl($vo.url,
                ($img: any) => {
                    var $toRect: Pan3d.Rectangle = $temp.getSkinCtxRect();
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                    var context = $ctx
                    context.fillStyle = "rgba(66,66,66,0)";
                    context.fillRect(0, 0, $toRect.width, $toRect.width);
                 
    
                    if ($vo.url.indexOf("panda") == -1) {
                        ($img.width / $toRect.width) 
                        $ctx.drawImage($img, 0, 0, $toRect.width, $toRect.width);
                        console.log($img.width, $img.height)
                        $ctx.fillStyle = "rgba(255,255,255,1)";
                        $ctx.fillRect(0, 0, 5, $toRect.width);
                        $ctx.fillRect(0, 0, $toRect.width, 5);
                        $ctx.fillRect(0, $toRect.width - 5, $toRect.width, 5);
                        $ctx.fillRect($toRect.width - 5, 0, 5, $toRect.width);

                    } else {
                       
                        $ctx.drawImage($img, 0, 0, $toRect.width, $img.height / ($img.width / $toRect.width));
                    }
                    $temp.drawToCtx(this._topRender.uiAtlas, $ctx);
                    
                });
        }

        private expEff: FrameTipCompenent;
        private _effRender: FrameUIRender;
        public showExpEff(): void {

            if (!this._effRender) {
                this._effRender = new FrameUIRender();
                this.addRender(this._effRender);
                this._effRender.setImg(getEffectUIUrl("ui_qh"), 4, 4, ($ui: any) => {
                    this.expEff = $ui;
                    this.expEff.speed = 1;
                    this.expEff.playOne(this);
                    this.expEff.play()
                })
            }
          
        }

        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                TweenLite.to(this, 0.3, {
                    right: 0, ease: Back.easeInOut, onComplete: () => {

                    }
                });
            } else {
                this.h5UIAtlas.testLoading();
            }

        }
        public hidePanel(): void {
                TweenLite.to(this, 0.3, { right: -100, ease: Back.easeInOut, onComplete: () => {
                        Pan3d.UIManager.getInstance().removeUIContainer(this);
                    }
                });
        }







    }
}