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
var endlessfinish;
(function (endlessfinish) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var EndLessLeftRankEvent = /** @class */ (function (_super) {
        __extends(EndLessLeftRankEvent, _super);
        function EndLessLeftRankEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndLessLeftRankEvent.SHOW_ENDLESS_LEFT_RANK_PANEL = "SHOW_ENDLESS_LEFT_RANK_PANEL";
        return EndLessLeftRankEvent;
    }(BaseEvent));
    endlessfinish.EndLessLeftRankEvent = EndLessLeftRankEvent;
    var EndLessLeftRankModule = /** @class */ (function (_super) {
        __extends(EndLessLeftRankModule, _super);
        function EndLessLeftRankModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndLessLeftRankModule.prototype.getModuleName = function () {
            return "EndLessLeftRankModule";
        };
        EndLessLeftRankModule.prototype.listProcessors = function () {
            return [
                new EndLessLeftRankProcessor()
            ];
        };
        return EndLessLeftRankModule;
    }(Module));
    endlessfinish.EndLessLeftRankModule = EndLessLeftRankModule;
    var EndLessLeftRankProcessor = /** @class */ (function (_super) {
        __extends(EndLessLeftRankProcessor, _super);
        function EndLessLeftRankProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndLessLeftRankProcessor.prototype.getName = function () {
            return "EndLessLeftRankProcessor";
        };
        EndLessLeftRankProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof EndLessLeftRankEvent) {
                var $topMenuEvent = $event;
                switch ($topMenuEvent.type) {
                    case EndLessLeftRankEvent.SHOW_ENDLESS_LEFT_RANK_PANEL:
                        if (!this._endLessLeftRankPanel) {
                            this._endLessLeftRankPanel = new endlessfinish.EndlessFinishPanel();
                        }
                        this._endLessLeftRankPanel.showPanel();
                        break;
                    default:
                        break;
                }
            }
        };
        EndLessLeftRankProcessor.prototype.listenModuleEvents = function () {
            return [
                new EndLessLeftRankEvent(EndLessLeftRankEvent.SHOW_ENDLESS_LEFT_RANK_PANEL),
            ];
        };
        return EndLessLeftRankProcessor;
    }(BaseProcessor));
    endlessfinish.EndLessLeftRankProcessor = EndLessLeftRankProcessor;
})(endlessfinish || (endlessfinish = {}));
//# sourceMappingURL=EndLessLeftRankProcessor.js.map