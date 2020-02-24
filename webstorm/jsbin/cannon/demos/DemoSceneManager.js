"use strict";
var canonkey;
(function (canonkey) {
    var LineDisplayShader = Pan3d.LineDisplayShader;
    var ProgrmaManager = Pan3d.ProgrmaManager;
    var Vector3D = Pan3d.Vector3D;
    var GridLineSprite = Pan3d.GridLineSprite;
    var TimeUtil = Pan3d.TimeUtil;
    var SceneManager = Pan3d.SceneManager;
    var DemoSceneManager = /** @class */ (function () {
        function DemoSceneManager() {
            var _this = this;
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            TimeUtil.addFrameTick(function () { _this.upData(); });
        }
        DemoSceneManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new DemoSceneManager();
            }
            return this._instance;
        };
        DemoSceneManager.prototype.upData = function () {
            if (canonkey.Physics.ready) {
                canonkey.Physics.update();
            }
        };
        DemoSceneManager.prototype.initScene = function () {
            canonkey.Physics.creatWorld();
            canonkey.SceneConanManager.getInstance().makeGround(new Vector3D());
            var $k = new canonkey.Bounce_html();
            canonkey.Physics.ready = true;
            this.addGridLineSprite();
        };
        DemoSceneManager.prototype.addGridLineSprite = function () {
            ProgrmaManager.getInstance().registe(LineDisplayShader.LineShader, new LineDisplayShader);
            var $GridLineSprite = new GridLineSprite();
            SceneManager.getInstance().addDisplay($GridLineSprite);
            SceneManager.getInstance().ready = true;
        };
        return DemoSceneManager;
    }());
    canonkey.DemoSceneManager = DemoSceneManager;
})(canonkey || (canonkey = {}));
