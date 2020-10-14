"use strict";
var SkillMouseManager = /** @class */ (function () {
    function SkillMouseManager() {
    }
    SkillMouseManager.getInstance = function () {
        if (!this._instance) {
            this._instance = new SkillMouseManager();
        }
        return this._instance;
    };
    SkillMouseManager.prototype.addMouseEvent = function () {
        var _this = this;
        if (Pan3d.Scene_data.isPc) {
            document.addEventListener(Pan3d.MouseType.MouseDown, function ($evt) { _this.onMouse($evt); });
            document.addEventListener(Pan3d.MouseType.MouseUp, function ($evt) { _this.onMouse($evt); });
            document.addEventListener(Pan3d.MouseType.MouseMove, function ($evt) { _this.onMouse($evt); });
            document.addEventListener(Pan3d.MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
        }
        else {
            document.addEventListener(Pan3d.MouseType.TouchMove, function ($evt) { _this.mouseToEvent($evt); });
            document.addEventListener(Pan3d.MouseType.TouchEnd, function ($evt) { _this.mouseToEvent($evt); });
            document.addEventListener(Pan3d.MouseType.TouchStart, function ($evt) { _this.mouseToEvent($evt); });
        }
    };
    SkillMouseManager.prototype.onMouseWheel = function ($evt) {
    };
    SkillMouseManager.prototype.onMouse = function ($e) {
        var evt;
        var point = new Pan3d.Vector2D();
        if ($e instanceof MouseEvent) {
            if ($e.type == Pan3d.MouseType.MouseDown) {
                evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Down);
            }
            else if ($e.type == Pan3d.MouseType.MouseUp) {
                evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Up);
            }
            else if ($e.type == Pan3d.MouseType.MouseMove) {
                evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Move);
            }
            else if ($e.type == Pan3d.MouseType.MouseClick) {
            }
            point.x = $e.pageX;
            point.y = $e.pageY;
        }
        this.makeMouseEvent(evt, point);
    };
    SkillMouseManager.prototype.mouseToEvent = function ($touchEvent) {
        var evt;
        var point = new Pan3d.Vector2D();
        if ($touchEvent.type == Pan3d.MouseType.TouchStart) {
            evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Down);
        }
        else if ($touchEvent.type == Pan3d.MouseType.TouchEnd) {
            evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Up);
            point.x = $touchEvent.changedTouches[0].pageX;
            point.y = $touchEvent.changedTouches[0].pageY;
        }
        else if ($touchEvent.type == Pan3d.MouseType.TouchMove) {
            evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.Move);
        }
        if ($touchEvent.touches.length) {
            point.x = $touchEvent.touches[$touchEvent.touches.length - 1].clientX;
            point.y = $touchEvent.touches[$touchEvent.touches.length - 1].clientY;
        }
        this.makeMouseEvent(evt, point);
    };
    SkillMouseManager.prototype.makeMouseEvent = function (evt, point) {
        var temp = Pan3d.UIManager.getInstance().mouseEvetData(evt, point);
        if (!temp) {
            if (evt.type == Pan3d.InteractiveEvent.Up) {
                this.clikSceneGround(point);
            }
        }
    };
    SkillMouseManager.prototype.clikSceneGround = function ($pos) {
    };
    SkillMouseManager.prototype.walkPathComplete = function () {
    };
    return SkillMouseManager;
}());
//# sourceMappingURL=SkillMouseManager.js.map