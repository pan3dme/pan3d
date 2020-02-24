"use strict";
var Browser = Laya.Browser;
//初始化微信小游戏
var Launch = /** @class */ (function () {
    function Launch() {
        var _this = this;
        setTimeout(function () {
            _this.init();
        }, 200);
    }
    Launch.prototype.init = function () {
        var _this = this;
        // 初始化舞台
        this._canvas = Laya.init(Browser.clientWidth * Browser.pixelRatio, Browser.clientHeight * Browser.pixelRatio, Laya.WebGL);
        mainpan3d.canvas = this._canvas;
        //  Pan3d.Scene_data.skyCubeMap = new Array
        GameData.webseverurl = "https://wxwdqq.chiji-h5.com/api/";
        Pan3d.Scene_data.fileRoot = "res/";
        //Pan3d.Scene_data.fileRoot = "https://commcdn.chiji-h5.com/wdqq/v7/";
        game.CannonGameStart.changeFunUrlLocal(function () {
            _this.loadBaseUiArt();
        });
    };
    Launch.prototype.addLaya3dScene = function () {
        setTimeout(function () {
            var $panel = new gamelaya.GameLayaPanel;
            Laya.stage.addChild($panel);
        }, 100);
    };
    Launch.prototype.loadBaseUiArt = function () {
        var _this = this;
        var $baseUiList = new Array;
        $baseUiList.push({ xmlurl: "ui/textlist/textlist.txt", picurl: Pan3d.Scene_data.fileRoot + "ui/textlist/textlist.png", name: Pan3d.UIData.textlist });
        Pan3d.UIData.init($baseUiList, function () {
            _this.addLaya3dScene();
        }, function (num) {
        });
    };
    return Launch;
}());
console.log("layaAir--vs");
var main = new Launch();
