"use strict";
var SkillMouseEventModel = /** @class */ (function () {
    function SkillMouseEventModel() {
        this.lastRotationY = 0;
        this.lastRotationX = 0;
        this._lastMousePos = new Pan3d.Vector2D();
    }
    SkillMouseEventModel.getInstance = function () {
        if (!this._instance) {
            this._instance = new SkillMouseEventModel();
        }
        return this._instance;
    };
    SkillMouseEventModel.prototype.initSceneFocueEvent = function () {
        var _this = this;
        Pan3d.Scene_data.uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Down, this.onMouseDown, this);
        Pan3d.Scene_data.uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Up, this.onMouseUp, this);
        Pan3d.Scene_data.uiBlankStage.addEventListener(Pan3d.InteractiveEvent.Move, this.onMouseMove, this);
        document.addEventListener(Pan3d.MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
    };
    SkillMouseEventModel.prototype.onMouseWheel = function ($evt) {
        Pan3d.Scene_data.cam3D.distance += $evt.wheelDelta / 10;
    };
    SkillMouseEventModel.prototype.onMouseMove = function ($evt) {
        if (this._isMouseDown) {
            var $addx = $evt.x - this._lastMousePos.x;
            Pan3d.Scene_data.focus3D.rotationY = this.lastRotationY - $addx;
            var $addy = $evt.y - this._lastMousePos.y;
            Pan3d.Scene_data.focus3D.rotationX = this.lastRotationX - $addy;
        }
    };
    SkillMouseEventModel.prototype.onMouseDown = function ($evt) {
        this._lastMousePos.x = $evt.x;
        this._lastMousePos.y = $evt.y;
        this.lastRotationY = Pan3d.Scene_data.focus3D.rotationY;
        this.lastRotationX = Pan3d.Scene_data.focus3D.rotationX;
        this._isMouseDown = true;
    };
    SkillMouseEventModel.prototype.onMouseUp = function ($evt) {
        this._isMouseDown = false;
    };
    return SkillMouseEventModel;
}());
//# sourceMappingURL=SkillMouseEventModel.js.map