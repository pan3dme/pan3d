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
var special;
(function (special) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var SpecialEvent = /** @class */ (function (_super) {
        __extends(SpecialEvent, _super);
        function SpecialEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SpecialEvent.SHOW_TASK_PANEL = "SHOW_TASK_PANEL";
        return SpecialEvent;
    }(BaseEvent));
    special.SpecialEvent = SpecialEvent;
    var SpecialModule = /** @class */ (function (_super) {
        __extends(SpecialModule, _super);
        function SpecialModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SpecialModule.prototype.getModuleName = function () {
            return "SpecialModule";
        };
        SpecialModule.prototype.listProcessors = function () {
            return [
                new SpecialProcessor()
            ];
        };
        return SpecialModule;
    }(Module));
    special.SpecialModule = SpecialModule;
    var SpecialProcessor = /** @class */ (function (_super) {
        __extends(SpecialProcessor, _super);
        function SpecialProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SpecialProcessor.prototype.getName = function () {
            return "SpecialProcessor";
        };
        SpecialProcessor.prototype.receivedModuleEvent = function ($event) {
            if ($event instanceof SpecialEvent) {
                var $endLessEvent = $event;
                switch ($endLessEvent.type) {
                    case SpecialEvent.SHOW_TASK_PANEL:
                        if (!this._invitationPanel) {
                            this._invitationPanel = new special.SpecialPanel();
                        }
                        this._invitationPanel.showPanel();
                        break;
                    default:
                        break;
                }
            }
        };
        SpecialProcessor.prototype.listenModuleEvents = function () {
            return [
                new SpecialEvent(SpecialEvent.SHOW_TASK_PANEL),
            ];
        };
        return SpecialProcessor;
    }(BaseProcessor));
    special.SpecialProcessor = SpecialProcessor;
})(special || (special = {}));
//# sourceMappingURL=TaskProcessor.js.map