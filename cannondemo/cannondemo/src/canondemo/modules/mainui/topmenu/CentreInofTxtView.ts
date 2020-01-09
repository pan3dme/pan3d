module tips {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;

    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import FrameCompenent = Pan3d.FrameCompenent
    import UIManager = Pan3d.UIManager;
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



    export class CentreInofTxtView {

        private _uiConatiner: UIConatiner;
        private _topRender: UIRenderComponent;
        private _frameItem: Array<FrameCompenent>
        public constructor($uiConatiner: UIConatiner, $topRender: UIRenderComponent) {
            this._uiConatiner = $uiConatiner
            this._topRender = $topRender;
            this._frameItem = new Array
            for (var i: number = 0; i < 4; i++) {
                var $temp: FrameCompenent = <FrameCompenent>this._topRender.getComponent("a_centen_tip")
                $temp.addEventListener(InteractiveEvent.Up, this.butClik, this);
                $temp.goToAndStop(i)
                this._frameItem.push($temp);
            }

            //var $pandaMeshData: PandaMeshData = new PandaMeshData();
            //$pandaMeshData.type =2;
            //$pandaMeshData.key = PandaMeshData.key101;
            //$pandaMeshData.txt="都是这样子的图"
            //this.pushTextInfo($pandaMeshData)

        }
        private getCanUseUi(): FrameCompenent {
            for (var i: number = 0; i < this._frameItem.length; i++) {
                if (!Boolean(this._frameItem[i].parent)) {
                    var $useNum = this.getUseUiNum();
                    this._frameItem[i].y = this._frameItem[i].baseRec.y + ($useNum + 1) * 30
                    return this._frameItem[i]
                }
            }
            return null
        }
        private getUseUiNum(): number {
            var $num: number = 0
            for (var i: number = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    $num++
                }
            }
            return $num

        }
        private butClik(evt: InteractiveEvent): void {
            var ui: FrameCompenent = <FrameCompenent>evt.target
            var $vo: PandaMeshData = ui.data;
            if ($vo.data instanceof Pan3d.BaseEvent) {
                ModuleEventManager.dispatchEvent($vo.data);
            }
            if ($vo.data instanceof Function) {
                $vo.data()
            }
            this.removeTxtInfo(ui);
            
           

        }
        private removeTxtInfo(ui: UICompenent): void {
            this._uiConatiner.removeChild(ui);
            this.resizeUi();
        }
        private resizeUi(): void {
            var $ty: number = 0
            for (var i: number = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    var $toy: number = this._frameItem[i].baseRec.y + $ty
                    $ty += 30
                    TweenLite.to(this._frameItem[i], 0.3, { y: $toy })
                }
            }
        }
        public pushTextInfo(value: PandaMeshData): void {
            if (this.isCanAddByKey(value.key)) {
                var $temp: FrameCompenent = this.getCanUseUi();
                if ($temp) {
                    $temp.data = value;
                    this._uiConatiner.addChild($temp);
                    this.drawPicToUi($temp);
                    this.resizeUi()
                } else {
                    console.log("提示信息不够")
                }
            }

        }
        public clearTextInfo(value: PandaMeshData): void {
            console.log("清理pandata")
            for (var i: number = 0; i < this._frameItem.length; i++) {
                if (Boolean(this._frameItem[i].parent)) {
                    var $vo: PandaMeshData = this._frameItem[i].data;
                    if ($vo.key == value.key) {
                        this._uiConatiner.removeChild(this._frameItem[i]);

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
        private drawPicToUi($temp: FrameCompenent): void {
            this.clearFrameCompenent($temp)
            var $vo: PandaMeshData = $temp.data;
            var $toRect: Pan3d.Rectangle = $temp.getSkinCtxRect();
            var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
            LabelTextFont.writeSingleLabelToCtx($ctx, $vo.txt, 20, 0, 0, Pan3d.TextAlign.CENTER, Pan3d.ColorType.Whiteffffff);
            $temp.drawToCtx(this._topRender.uiAtlas, $ctx);
        }


    }

}