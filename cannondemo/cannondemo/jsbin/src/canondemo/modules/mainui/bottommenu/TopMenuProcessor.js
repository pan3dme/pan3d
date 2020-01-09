var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var bottommenu;
(function (bottommenu) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TopMenuEvent = /** @class */ (function (_super) {
        __extends(TopMenuEvent, _super);
        function TopMenuEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopMenuEvent.SHOW_TOP_MENU_PANEL = "SHOW_TOP_MENU_PANEL";
        return TopMenuEvent;
    }(BaseEvent));
    bottommenu.TopMenuEvent = TopMenuEvent;
    var TopMenuModule = /** @class */ (function (_super) {
        __extends(TopMenuModule, _super);
        function TopMenuModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopMenuModule.prototype.getModuleName = function () {
            return "TopMenuModule";
        };
        TopMenuModule.prototype.listProcessors = function () {
            return [
                new TopMenuProcessor()
            ];
        };
        return TopMenuModule;
    }(Module));
    bottommenu.TopMenuModule = TopMenuModule;
    var TopMenuProcessor = /** @class */ (function (_super) {
        __extends(TopMenuProcessor, _super);
        function TopMenuProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopMenuProcessor.prototype.getName = function () {
            return "TopMenuProcessor";
        };
        TopMenuProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof TopMenuEvent) {
                var $topMenuEvent = $event;
                switch ($topMenuEvent.type) {
                    case TopMenuEvent.SHOW_TOP_MENU_PANEL:
                        if (!this._topMenuPanel) {
                            this._topMenuPanel = new bottommenu.TopMenuPanel();
                        }
                        this._topMenuPanel.showPanel();
                        break;
                    default:
                        break;
                }
            }
        };
        TopMenuProcessor.prototype.listenModuleEvents = function () {
            return [
                new TopMenuEvent(TopMenuEvent.SHOW_TOP_MENU_PANEL),
            ];
        };
        return TopMenuProcessor;
    }(BaseProcessor));
    bottommenu.TopMenuProcessor = TopMenuProcessor;
})(bottommenu || (bottommenu = {}));
//# sourceMappingURL=TopMenuProcessor.js.map