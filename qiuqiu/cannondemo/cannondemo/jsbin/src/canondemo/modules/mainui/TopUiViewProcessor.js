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
var uiview;
(function (uiview) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var SceneEvent = game.SceneEvent;
    var TopUiViewEvent = /** @class */ (function (_super) {
        __extends(TopUiViewEvent, _super);
        function TopUiViewEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        return TopUiViewEvent;
    }(BaseEvent));
    uiview.TopUiViewEvent = TopUiViewEvent;
    var TopUiViewModule = /** @class */ (function (_super) {
        __extends(TopUiViewModule, _super);
        function TopUiViewModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopUiViewModule.prototype.getModuleName = function () {
            return "TopUiViewModule";
        };
        TopUiViewModule.prototype.listProcessors = function () {
            return [new TopUiViewProcessor()
            ];
        };
        return TopUiViewModule;
    }(Module));
    uiview.TopUiViewModule = TopUiViewModule;
    var TopUiViewProcessor = /** @class */ (function (_super) {
        __extends(TopUiViewProcessor, _super);
        function TopUiViewProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TopUiViewProcessor.prototype.getName = function () {
            return "TopUiViewProcessor";
        };
        TopUiViewProcessor.prototype.receivedModuleEvent = function ($event) {
        };
        TopUiViewProcessor.prototype.listenModuleEvents = function () {
            return [
                new SceneEvent(SceneEvent.DIAMONDS_SPRITE_HIT_EVENT),
            ];
        };
        return TopUiViewProcessor;
    }(BaseProcessor));
    uiview.TopUiViewProcessor = TopUiViewProcessor;
})(uiview || (uiview = {}));
//# sourceMappingURL=TopUiViewProcessor.js.map