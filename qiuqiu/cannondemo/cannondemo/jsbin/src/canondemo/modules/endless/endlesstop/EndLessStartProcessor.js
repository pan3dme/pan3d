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
var endlesstop;
(function (endlesstop) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var EndLessTopEvent = /** @class */ (function (_super) {
        __extends(EndLessTopEvent, _super);
        function EndLessTopEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndLessTopEvent.SHOW_ENDLESS_START_PANEL = "SHOW_ENDLESS_START_PANEL";
        return EndLessTopEvent;
    }(BaseEvent));
    endlesstop.EndLessTopEvent = EndLessTopEvent;
    var EndLessTopModule = /** @class */ (function (_super) {
        __extends(EndLessTopModule, _super);
        function EndLessTopModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndLessTopModule.prototype.getModuleName = function () {
            return "EndLessTopModule";
        };
        EndLessTopModule.prototype.listProcessors = function () {
            return [
                new EndLessTopProcessor()
            ];
        };
        return EndLessTopModule;
    }(Module));
    endlesstop.EndLessTopModule = EndLessTopModule;
    var EndLessTopProcessor = /** @class */ (function (_super) {
        __extends(EndLessTopProcessor, _super);
        function EndLessTopProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        EndLessTopProcessor.prototype.getName = function () {
            return "EndLessTopProcessor";
        };
        EndLessTopProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof EndLessTopEvent) {
                var $topMenuEvent = $event;
                switch ($topMenuEvent.type) {
                    case EndLessTopEvent.SHOW_ENDLESS_START_PANEL:
                        if (!this._topMenuPanel) {
                            this._topMenuPanel = new endlesstop.EndLessTopPanel();
                        }
                        this._topMenuPanel.showPanel();
                        break;
                    default:
                        break;
                }
            }
        };
        EndLessTopProcessor.prototype.listenModuleEvents = function () {
            return [
                new EndLessTopEvent(EndLessTopEvent.SHOW_ENDLESS_START_PANEL),
            ];
        };
        return EndLessTopProcessor;
    }(BaseProcessor));
    endlesstop.EndLessTopProcessor = EndLessTopProcessor;
})(endlesstop || (endlesstop = {}));
//# sourceMappingURL=EndLessStartProcessor.js.map