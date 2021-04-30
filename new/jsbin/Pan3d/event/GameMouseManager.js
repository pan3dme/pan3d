var Pan3d;
(function (Pan3d) {
    var GameMouseManager = /** @class */ (function () {
        function GameMouseManager() {
            this.resetPos = new Pan3d.Vector2D();
            this.bindPos = new Pan3d.Vector2D();
            this.useMouseEvent = true;
            this.isPc = true;
            this.uiBlankStage = new Pan3d.UIStage();
        }
        GameMouseManager.getInstance = function () {
            if (!this._instance) {
                this._instance = new GameMouseManager();
            }
            return this._instance;
        };
        GameMouseManager.prototype.addMouseEvent = function (value) {
            var _this = this;
            if (this.isPc) {
                value.addEventListener(Pan3d.MouseType.MouseDown, function ($evt) { _this.onMouse($evt); });
                value.addEventListener(Pan3d.MouseType.MouseUp, function ($evt) { _this.onMouse($evt); });
                value.addEventListener(Pan3d.MouseType.MouseMove, function ($evt) { _this.onMouse($evt); });
                value.addEventListener(Pan3d.MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
            }
            else {
                value.addEventListener(Pan3d.MouseType.TouchMove, function ($evt) { _this.onTouchMove($evt); });
                value.addEventListener(Pan3d.MouseType.TouchEnd, function ($evt) { _this.onTouchEnd($evt); });
                value.addEventListener(Pan3d.MouseType.TouchStart, function ($evt) { _this.onTouchStart($evt); });
                value.addEventListener(Pan3d.MouseType.MouseWheel, function ($evt) { _this.onMouseWheel($evt); });
            }
            this.bindPos.x = this.resetPos.x;
            this.bindPos.y = this.resetPos.y;
        };
        GameMouseManager.prototype.onMouseWheel = function (event) {
            var evt;
            evt = new Pan3d.InteractiveEvent(Pan3d.InteractiveEvent.WheelEvent);
            evt.data = event.deltaY;
            this.uiBlankStage.interactiveEvent(evt);
        };
        GameMouseManager.prototype.isCanUseMouseEvent = function () {
            return this.useMouseEvent;
        };
        GameMouseManager.prototype.onMouse = function ($e) {
            if (!this.isCanUseMouseEvent()) {
                return;
            }
            if ($e.button == 2) {
                return;
            }
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
            if (evt) {
                evt.mouseEvent = $e;
            }
            this.makeMouseEvent(evt, point);
        };
        GameMouseManager.prototype.mouseToEvent = function ($touchEvent) {
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
            return evt;
        };
        GameMouseManager.prototype.makeMouseEvent = function (evt, point) {
            this.uiBlankStage.interactiveEvent(evt);
        };
        GameMouseManager.prototype.onTouchStart = function ($e) {
            if (!this.isCanUseMouseEvent()) {
                return;
            }
            this.mouseToEvent($e);
        };
        GameMouseManager.prototype.onTouchEnd = function ($e) {
            if (!this.isCanUseMouseEvent()) {
                return;
            }
            this.mouseToEvent($e);
        };
        GameMouseManager.prototype.onTouchMove = function ($e) {
            if (!this.isCanUseMouseEvent()) {
                return;
            }
        };
        return GameMouseManager;
    }());
    Pan3d.GameMouseManager = GameMouseManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=GameMouseManager.js.map