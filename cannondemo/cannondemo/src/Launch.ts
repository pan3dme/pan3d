
import Browser = Laya.Browser;

//初始化微信小游戏

class Launch {
    private _canvas: HTMLCanvasElement;
    constructor() {
        setTimeout(() => {
            this.init();
        }, 200)
    }
    private init(): void {
        // 初始化舞台
        this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
        mainpan3d.canvas = this._canvas;
      //  Pan3d.Scene_data.skyCubeMap = new Array
        GameData.webseverurl = "https://wxwdqq.chiji-h5.com/api/";
        Pan3d.Scene_data.fileRoot = "res/";
        //Pan3d.Scene_data.fileRoot = "https://commcdn.chiji-h5.com/wdqq/v7/";
        game.CannonGameStart.changeFunUrlLocal(() => {
            this.loadBaseUiArt()
        });
     
    }
    private addLaya3dScene(): void {
        setTimeout(() => {
            var $panel: gamelaya.GameLayaPanel = new gamelaya.GameLayaPanel;
            Laya.stage.addChild($panel);
        }, 100)
    }
    private loadBaseUiArt(): void {
        var $baseUiList: Array<any> = new Array;
        $baseUiList.push({ xmlurl: "ui/textlist/textlist.txt", picurl: Pan3d.Scene_data.fileRoot + "ui/textlist/textlist.png", name: Pan3d.UIData.textlist });
        Pan3d.UIData.init($baseUiList,
            () => {
                this.addLaya3dScene();
            },
            (num: number) => {
            }
        );
    }
}
console.log("layaAir--vs")
var main = new Launch();
