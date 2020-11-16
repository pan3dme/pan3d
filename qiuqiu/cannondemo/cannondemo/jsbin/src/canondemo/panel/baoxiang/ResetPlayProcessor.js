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
var baoxiang;
(function (baoxiang) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var TimeUtil = Pan3d.TimeUtil;
    var GameDataModel = game.GameDataModel;
    var GameSoundManager = game.GameSoundManager;
    var ResetPlayEvent = /** @class */ (function (_super) {
        __extends(ResetPlayEvent, _super);
        function ResetPlayEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResetPlayEvent.SHOW_RESET_PLAY_PANEL = "SHOW_RESET_PLAY_PANEL";
        return ResetPlayEvent;
    }(BaseEvent));
    baoxiang.ResetPlayEvent = ResetPlayEvent;
    var ResetPlayModule = /** @class */ (function (_super) {
        __extends(ResetPlayModule, _super);
        function ResetPlayModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResetPlayModule.prototype.getModuleName = function () {
            return "ResetPlayModule";
        };
        ResetPlayModule.prototype.listProcessors = function () {
            return [
                new ResetPlayProcessor()
            ];
        };
        return ResetPlayModule;
    }(Module));
    baoxiang.ResetPlayModule = ResetPlayModule;
    var ResetPlayProcessor = /** @class */ (function (_super) {
        __extends(ResetPlayProcessor, _super);
        function ResetPlayProcessor() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this.lostNum = 0;
            return _this;
        }
        ResetPlayProcessor.prototype.getName = function () {
            return "ResetPlayProcessor";
        };
        ResetPlayProcessor.prototype.showEndGame = function () {
        };
        ResetPlayProcessor.prototype.receivedModuleEvent = function ($event) {
            //$event instanceof ResetPlayEvent
            if (GameData.gameType != 1) {
                return;
            }
            switch ($event.type) {
                case ResetPlayEvent.SHOW_RESET_PLAY_PANEL:
                    if (GameDataModel.levelNum >= 50) {
                        this.lostNum++;
                    }
                    if (GameData.gameType == 1) {
                        if (!this._resetPlayPanel) {
                            this._resetPlayPanel = new baoxiang.ResetPlayPanel();
                        }
                        this._resetPlayPanel.showPanel();
                    }
                    var useTim = TimeUtil.getTimer() - game.GameDataModel.levelStartTm;
                    var $postStr = "";
                    $postStr += "level=" + GameDataModel.levelNum;
                    $postStr += "&openid=" + GameData.getStorageSync("openid"); //自己的
                    if (GameData.userInfo && GameData.userInfo.nickName) {
                        $postStr += "&info=" + GameData.userInfo.nickName + "_" + String(GameData.hasdiamondsHavenum) + "-v-" + GameData.version + "-u-" + GameData.getAdvertiseList().length;
                    }
                    else {
                        $postStr += "&info=" + "没名-" + "_" + String(GameData.hasdiamondsHavenum);
                    }
                    console.log($postStr);
                    if (GameData.isOtherPlay()) {
                        GameData.WEB_SEVER_EVENT_AND_BACK("add_fail", $postStr);
                    }
                    GameSoundManager.getInstance().playHitSound(1);
                    break;
                default:
                    break;
            }
        };
        ResetPlayProcessor.prototype.listenModuleEvents = function () {
            return [
                new ResetPlayEvent(ResetPlayEvent.SHOW_RESET_PLAY_PANEL),
            ];
        };
        return ResetPlayProcessor;
    }(BaseProcessor));
    baoxiang.ResetPlayProcessor = ResetPlayProcessor;
})(baoxiang || (baoxiang = {}));
//# sourceMappingURL=ResetPlayProcessor.js.map