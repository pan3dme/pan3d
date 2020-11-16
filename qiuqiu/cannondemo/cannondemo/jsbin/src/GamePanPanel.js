var onlypan3d;
(function (onlypan3d) {
    var GameDataModel = game.GameDataModel;
    var GameInstance = Pan3d.GameInstance;
    var GameMouseManager = Pan3d.GameMouseManager;
    var Scene_data = Pan3d.Scene_data;
    var UIData = Pan3d.UIData;
    var Engine = Pan3d.Engine;
    var SceneManager = Pan3d.SceneManager;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var GamePanPanel = /** @class */ (function () {
        // 美术设计画布像素高宽
        function GamePanPanel() {
            var _this = this;
            var canvas_Laya;
            if (window['wx']) {
                canvas_Laya = canvas;
                GameMouseManager.mouseCanvasScale = 1.0; //这里特殊修改适配小程序后，的鼠标缩放位置
                canvas_Laya.width = canvas_Laya.width * GameMouseManager.mouseCanvasScale;
                canvas_Laya.height = canvas_Laya.height * GameMouseManager.mouseCanvasScale;
                MiniPan3dAdpter.init();
            }
            else {
                canvas_Laya = document.createElement("canvas");
                canvas_Laya.width = document.documentElement.clientWidth;
                canvas_Laya.height = document.documentElement.clientHeight;
                document.body.appendChild(canvas_Laya);
            }
            mainpan3d.canvas = canvas_Laya;
            // Scene_data.skyCubeMap = new Array
            Scene_data.fileRoot = "res/";
            GameData.webseverurl = "https://wxwdqq.chiji-h5.com/api/";
            game.CannonGameStart.changeFunUrlLocal(function () {
                _this.loadBaseUiArt();
            });
        }
        GamePanPanel.prototype.addScene3d = function () {
            scene3d.Scene3dInit.initData();
            this.scene = new layapan.LayaOverride2dSceneManager;
            this.scene.ready = true;
            SceneManager._instance = this.scene;
            //  this.addGridLineSprite();
            //  this.addBaseSprite();
            game.CannonGameStart.initData(this.scene);
            Scene_data.cam3D.distance = 350 * (GameData.pixelRatio / 2);
            Scene_data.focus3D.rotationY = 0;
            false ? this.timeFrame() : this.windowFrme();
            this.addMouseEvents();
        };
        GamePanPanel.prototype.addMouseEvents = function () {
            GameInstance.useYaoGan = false;
            GameMouseManager.getInstance().addMouseEvent();
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Down, this.onMouseDown, this);
            Scene_data.uiStage.addEventListener(InteractiveEvent.Up, this.onMouseUp, this);
            Scene_data.uiBlankStage.addEventListener(InteractiveEvent.Move, this.onMouseMove, this);
        };
        GamePanPanel.prototype.onMouseMove = function ($evt) {
            GameDataModel.onMouseMove(new Pan3d.Vector2D($evt.x, $evt.y));
            // traceLog("onMouseMove")
        };
        GamePanPanel.prototype.onMouseDown = function ($evt) {
            GameDataModel.onMouseDown(new Pan3d.Vector2D($evt.x, $evt.y));
            //  traceLog("onMouseDown")
        };
        GamePanPanel.prototype.onMouseUp = function ($evt) {
            GameDataModel.mouseDownPosint = null;
            // traceLog("onMouseUp")
        };
        GamePanPanel.prototype.timeFrame = function () {
            var _this = this;
            //时间心跳
            setInterval(function () { _this.upFrame(); }, 1000 / 60);
        };
        GamePanPanel.prototype.windowFrme = function () {
            var _this = this;
            //系统计心跳
            window.requestAnimationFrame = window.requestAnimationFrame || window.webkitRequestAnimationFrame;
            window.requestAnimationFrame(function (t) { _this.step(t); });
        };
        GamePanPanel.prototype.step = function (timestamp) {
            var _this = this;
            this.upFrame();
            window.requestAnimationFrame(function (t) { _this.step(t); });
        };
        GamePanPanel.prototype.loadBaseUiArt = function () {
            var _this = this;
            var $baseUiList = new Array;
            $baseUiList.push({ xmlurl: "ui/textlist/textlist.txt", picurl: Pan3d.Scene_data.fileRoot + "ui/textlist/textlist.png", name: UIData.textlist });
            UIData.init($baseUiList, function () {
                console.log("ui加载完成");
                _this.addScene3d();
            }, function (num) {
            });
        };
        GamePanPanel.prototype.upFrame = function () {
            game.CannonGameStart.upFrame();
            if (scene3d.Scene3dInit.isConfig) {
                if (GameDataModel.centenBall) {
                    Scene_data.focus3D.x = GameDataModel.centenBall.x;
                    Scene_data.focus3D.y = GameDataModel.centenBall.y;
                    Scene_data.focus3D.z = GameDataModel.centenBall.z;
                }
                if (GameDataModel.modelRotation) {
                    Scene_data.focus3D.rotationY = GameDataModel.gameAngle;
                    Scene_data.focus3D.rotationX = -35 - GameDataModel.modelRotation.z;
                    Scene_data.focus3D.rotationZ = -GameDataModel.modelRotation.x;
                }
                Scene_data.context3D._contextSetTest.clear();
                shadow.ShadowModel.getInstance().updateDepth(this.scene);
                Scene_data.context3D._contextSetTest.clear();
                Scene_data.context3D.update();
                Engine.update();
            }
        };
        return GamePanPanel;
    }());
    onlypan3d.GamePanPanel = GamePanPanel;
})(onlypan3d || (onlypan3d = {}));
console.log("Pan3dAir");
new onlypan3d.GamePanPanel();
//# sourceMappingURL=GamePanPanel.js.map