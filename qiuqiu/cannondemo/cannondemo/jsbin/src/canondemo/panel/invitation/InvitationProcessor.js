var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var invitation;
(function (invitation) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var SceneEvent = game.SceneEvent;
    var InvitationEvent = /** @class */ (function (_super) {
        __extends(InvitationEvent, _super);
        function InvitationEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InvitationEvent.SHOW_INVITATIOIN_PANEL = "SHOW_INVITATIOIN_PANEL";
        return InvitationEvent;
    }(BaseEvent));
    invitation.InvitationEvent = InvitationEvent;
    var InvitationModule = /** @class */ (function (_super) {
        __extends(InvitationModule, _super);
        function InvitationModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InvitationModule.prototype.getModuleName = function () {
            return "InvitationModule";
        };
        InvitationModule.prototype.listProcessors = function () {
            return [
                new InvitationProcessor()
            ];
        };
        return InvitationModule;
    }(Module));
    invitation.InvitationModule = InvitationModule;
    var InvitationProcessor = /** @class */ (function (_super) {
        __extends(InvitationProcessor, _super);
        function InvitationProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        InvitationProcessor.prototype.getName = function () {
            return "InvitationProcessor";
        };
        InvitationProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case InvitationEvent.SHOW_INVITATIOIN_PANEL:
                    if (!this._invitationPanel) {
                        this._invitationPanel = new invitation.InvitationPanel();
                    }
                    this._invitationPanel.showPanel();
                    break;
                case SceneEvent.SELECT_SCENE_LEVEL:
                    break;
                default:
                    break;
            }
        };
        InvitationProcessor.prototype.listenModuleEvents = function () {
            return [
                new InvitationEvent(InvitationEvent.SHOW_INVITATIOIN_PANEL),
                new SceneEvent(SceneEvent.SELECT_SCENE_LEVEL),
            ];
        };
        return InvitationProcessor;
    }(BaseProcessor));
    invitation.InvitationProcessor = InvitationProcessor;
})(invitation || (invitation = {}));
//# sourceMappingURL=InvitationProcessor.js.map