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
var lottery;
(function (lottery) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var SceneEvent = game.SceneEvent;
    var TimeGiftEvent = /** @class */ (function (_super) {
        __extends(TimeGiftEvent, _super);
        function TimeGiftEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimeGiftEvent.SHOW_TIME_GIFT_PANEL = "SHOW_TIME_GIFT_PANEL";
        return TimeGiftEvent;
    }(BaseEvent));
    lottery.TimeGiftEvent = TimeGiftEvent;
    var TimeGiftModule = /** @class */ (function (_super) {
        __extends(TimeGiftModule, _super);
        function TimeGiftModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimeGiftModule.prototype.getModuleName = function () {
            return "TimeGiftModule";
        };
        TimeGiftModule.prototype.listProcessors = function () {
            return [
                new TimeGiftProcessor()
            ];
        };
        return TimeGiftModule;
    }(Module));
    lottery.TimeGiftModule = TimeGiftModule;
    var TimeGiftProcessor = /** @class */ (function (_super) {
        __extends(TimeGiftProcessor, _super);
        function TimeGiftProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        TimeGiftProcessor.prototype.getName = function () {
            return "TimeGiftProcessor";
        };
        TimeGiftProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case TimeGiftEvent.SHOW_TIME_GIFT_PANEL:
                    if (!this._timeGiftPanel) {
                        this._timeGiftPanel = new lottery.TimeGiftPanel();
                    }
                    this._timeGiftPanel.showPanel();
                    break;
                case SceneEvent.WX_ON_SHOW:
                    console.log("WX_ON_SHOW_timegift");
                    if (this._timeGiftPanel && this._timeGiftPanel.hasStage) {
                        this._timeGiftPanel.onShow();
                    }
                    break;
                default:
                    break;
            }
        };
        TimeGiftProcessor.prototype.listenModuleEvents = function () {
            return [
                new TimeGiftEvent(TimeGiftEvent.SHOW_TIME_GIFT_PANEL),
                new SceneEvent(SceneEvent.WX_ON_SHOW),
            ];
        };
        return TimeGiftProcessor;
    }(BaseProcessor));
    lottery.TimeGiftProcessor = TimeGiftProcessor;
})(lottery || (lottery = {}));
//# sourceMappingURL=TimeGiftProcessor.js.map