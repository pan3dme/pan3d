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
var offline;
(function (offline) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var OffLineEvent = /** @class */ (function (_super) {
        __extends(OffLineEvent, _super);
        function OffLineEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OffLineEvent.SHOW_BAOXIANG_PANEL = "SHOW_BAOXIANG_PANEL";
        return OffLineEvent;
    }(BaseEvent));
    offline.OffLineEvent = OffLineEvent;
    var OffLineModule = /** @class */ (function (_super) {
        __extends(OffLineModule, _super);
        function OffLineModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OffLineModule.prototype.getModuleName = function () {
            return "OffLineModule";
        };
        OffLineModule.prototype.listProcessors = function () {
            return [
                new OffLineProcessor()
            ];
        };
        return OffLineModule;
    }(Module));
    offline.OffLineModule = OffLineModule;
    var OffLineProcessor = /** @class */ (function (_super) {
        __extends(OffLineProcessor, _super);
        function OffLineProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        OffLineProcessor.prototype.getName = function () {
            return "OffLineProcessor";
        };
        OffLineProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case OffLineEvent.SHOW_BAOXIANG_PANEL:
                    if (!this._resetPlayPanel) {
                        this._resetPlayPanel = new offline.OffLinePanel();
                    }
                    this._resetPlayPanel.refrishData($event.data);
                    this._resetPlayPanel.showPanel();
                    break;
                default:
                    break;
            }
        };
        OffLineProcessor.prototype.listenModuleEvents = function () {
            return [
                new OffLineEvent(OffLineEvent.SHOW_BAOXIANG_PANEL),
            ];
        };
        return OffLineProcessor;
    }(BaseProcessor));
    offline.OffLineProcessor = OffLineProcessor;
})(offline || (offline = {}));
//# sourceMappingURL=BaoxiangProcessor.js.map