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
var platform;
(function (platform) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TopMenuEvent = /** @class */ (function (_super) {
        __extends(TopMenuEvent, _super);
        function TopMenuEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopMenuEvent.SHOW_TOP_MENU_PANEL = "SHOW_TOP_MENU_PANEL";
        TopMenuEvent.HIDE_TOP_MENU_PANEL = "HIDE_TOP_MENU_PANEL";
        return TopMenuEvent;
    }(BaseEvent));
    platform.TopMenuEvent = TopMenuEvent;
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
    platform.TopMenuModule = TopMenuModule;
    var TopMenuProcessor = /** @class */ (function (_super) {
        __extends(TopMenuProcessor, _super);
        function TopMenuProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopMenuProcessor.prototype.getName = function () {
            return "TopMenuProcessor";
        };
        TopMenuProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case TopMenuEvent.SHOW_TOP_MENU_PANEL:
                    if (!this._topMenuPanel) {
                        this._topMenuPanel = new platform.TopMenuPanel();
                    }
                    this._topMenuPanel.showPanel();
                    break;
                case TopMenuEvent.HIDE_TOP_MENU_PANEL:
                    if (this._topMenuPanel) {
                        this._topMenuPanel.hidePanel();
                    }
                    break;
                case game.SceneEvent.DIAMONDS_CHANGE_EVENT: //钱变了
                case game.SceneEvent.SELECT_SCENE_LEVEL://钱变了
                    if (this._topMenuPanel) {
                        this._topMenuPanel.refrishUi();
                    }
                    break;
                default:
                    break;
            }
        };
        TopMenuProcessor.prototype.listenModuleEvents = function () {
            return [
                new TopMenuEvent(TopMenuEvent.SHOW_TOP_MENU_PANEL),
                new TopMenuEvent(TopMenuEvent.HIDE_TOP_MENU_PANEL),
                new game.SceneEvent(game.SceneEvent.DIAMONDS_CHANGE_EVENT),
                new game.SceneEvent(game.SceneEvent.SELECT_SCENE_LEVEL),
            ];
        };
        return TopMenuProcessor;
    }(BaseProcessor));
    platform.TopMenuProcessor = TopMenuProcessor;
})(platform || (platform = {}));
//# sourceMappingURL=TopMenuProcessor.js.map