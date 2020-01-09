module endless {
    import UIConatiner = Pan3d.UIConatiner;
    import UIRenderComponent = Pan3d.UIRenderComponent;
    import FrameCompenent = Pan3d.FrameCompenent;

    import UIData = Pan3d.UIData;
    import UICompenent = Pan3d.UICompenent;
    import UIManager = Pan3d.UIManager;
    import LabelTextFont = Pan3d.LabelTextFont;
    import TextAlign = Pan3d.TextAlign;
    import ArtFont = Pan3d.ArtFont;
    import TimeUtil = Pan3d.TimeUtil;
    import Vector3D = Pan3d.Vector3D;
    import Rectangle= Pan3d.Rectangle
    import UIVirtualContainer = Pan3d.UIVirtualContainer;
    import Scene_data = Pan3d.Scene_data;
    import InteractiveEvent = Pan3d.InteractiveEvent;
    import ModuleEventManager = Pan3d.ModuleEventManager
    import ColorType = Pan3d.ColorType

    import GameLevelManeger = game.GameLevelManeger;
    import GameDataModel = game.GameDataModel;
    import SceneEvent = game.SceneEvent;

    import EndlessManager = endless.EndlessManager

    export class EndLessLeftRankPanel extends  H5UIConatiner {

        private _bottomRender: UIRenderComponent
        private _midRender: UIRenderComponent;
        private _topRender: UIRenderComponent;
        public constructor() {
            super();
            this.interfaceUI = true
            this.width = 540
            this.height = 960
            this.center = 0;
            this.middle = 0;
            this._bottomRender = new UIRenderComponent();
            this.addRender(this._bottomRender);
            this._midRender = new UIRenderComponent();
            this.addRender(this._midRender);
            this._topRender = new UIRenderComponent();
            this.addRender(this._topRender);

            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("ui/endless/endless.txt", "ui/endless/endless.png", () => { this.loadConfigCom() });
        }
        private getlevelRankList(): void {

            var arr: Array<string> = ["2222", "3333", "444"]


            var $postStr: string = "";
            $postStr += "level=" + 1;
            $postStr += "&openid=" + GameData.getStorageSync("openid");

            GameData.WEB_SEVER_EVENT_AND_BACK("get_endless_rank_list ", $postStr, (res: any) => {
                console.log("回来的list", res.data)
                if (res && res.data ) {
                    var selfRank: number = res.data.rank;
                    EndlessManager.getInstance().selfBestScore = res.data.score

                    GameData.setStorageSync("endlessMaxLevel", EndlessManager.getInstance().selfBestScore);

                    var $sortid: number=0
                    for (var j: number = 0; j < res.data.list.length ; j++) {
                        if (res.data.list[j].rank == selfRank) {
                            $sortid = j;
                        }
                    }

                    var frameId: number=0
                    for (var i: number = 0; i < res.data.list.length; i++) {
                        if (i >= $sortid - 2 && i <= $sortid + 2) {
          
                            var $ui: FrameCompenent = this.uiItem[frameId++]

                            if (res.data.list[i]) {
                                this.drawRankInofToUi($ui, res.data.list[i], selfRank)
                            }
                        }
                    }

                }
            })
        }

        private uiItem: Array<FrameCompenent>
        private loadConfigCom(): void {

            this._bottomRender.uiAtlas = this.h5UIAtlas
            this._midRender.uiAtlas = this.h5UIAtlas
            this._topRender.uiAtlas = this.h5UIAtlas

            this.uiItem = new Array()
            for (var i: number = 0; i < 5; i++) {
                var $ui: FrameCompenent = <FrameCompenent>this.addChild(this._topRender.getComponent("r_rank_frame_txt"));
                $ui.goToAndStop(i);
                $ui.y = $ui.baseRec.y + i * 30
                this.uiItem.push($ui)
              
            }
            this.uiLoadComplte = true
            this.showPanel()

        }
        public showPanel(): void {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this)
                this.rifrishData()
            } else {
                this.h5UIAtlas.testLoading();
            }
        }
        public hidePanel(): void {
            Pan3d.UIManager.getInstance().removeUIContainer(this)
        }
        private drawRankInofToUi($temp: FrameCompenent, $data: any, selfRank: number): void {
            var $url: string = $data.info
            GameData.loadImgByPicUrl($url,
                ($img: any) => {
                    var $toRect: Pan3d.Rectangle = $temp.getSkinCtxRect();
                    var $ctx: CanvasRenderingContext2D = UIManager.getInstance().getContext2D($toRect.width, $toRect.height, false);
                    var $imgWh: Rectangle = new Rectangle(5, 0, 30, 30);
                    var $num5: number=5
                    $ctx.drawImage($img, $imgWh.x, $imgWh.y, $imgWh.width, $imgWh.height);

                    $ctx.fillStyle = "rgba(255,255,255,1)";
                    $ctx.fillRect($imgWh.x, $imgWh.y, $num5, $imgWh.width);
                    $ctx.fillRect($imgWh.x, $imgWh.y, $imgWh.width, $num5);
                    $ctx.fillRect($imgWh.x, $imgWh.y + $imgWh.height - $num5, $imgWh.width, $num5);
                    $ctx.fillRect($imgWh.x + $imgWh.width - $num5, $imgWh.y, $num5, $imgWh.height);


                    var $outTxt: string = "";
                    if (selfRank == $data.rank) {
                        $outTxt = Pan3d.ColorType.Redd92200 + "第" + $data.best_score + "层";
                        $outTxt += Pan3d.ColorType.Redd92200 + "->排名" + selfRank
                    } else {
                        $outTxt = Pan3d.ColorType.Whiteffffff + "第" + $data.best_score + "层";
                    }
                    LabelTextFont.writeSingleLabelToCtx($ctx, $outTxt, 20, 40, 5, Pan3d.TextAlign.LEFT);
                    $temp.drawToCtx(this._topRender.uiAtlas, $ctx);
                });
        }
        public rifrishData(): void {
            if (this.uiLoadComplte) {
                this.getlevelRankList()
            }

        }
     
    }
}