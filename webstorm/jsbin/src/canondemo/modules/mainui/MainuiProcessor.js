"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var mainui;
(function (mainui) {
    var BaseProcessor = Pan3d.BaseProcessor;
    var BaseEvent = Pan3d.BaseEvent;
    var Module = Pan3d.Module;
    var ModuleEventManager = Pan3d.ModuleEventManager;
    var MainuiEvent = /** @class */ (function (_super) {
        __extends(MainuiEvent, _super);
        function MainuiEvent() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainuiEvent.SHOW_MAIN_UI_PANEL = "SHOW_MAIN_UI_PANEL";
        MainuiEvent.HIDE_MAIN_UI_PANEL = "HIDE_MAIN_UI_PANEL";
        MainuiEvent.SHOW_GUIDE_HAND_PANEL = "SHOW_GUIDE_HAND_PANEL";
        return MainuiEvent;
    }(BaseEvent));
    mainui.MainuiEvent = MainuiEvent;
    var MainuiModule = /** @class */ (function (_super) {
        __extends(MainuiModule, _super);
        function MainuiModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainuiModule.prototype.getModuleName = function () {
            return "MainuiModule";
        };
        MainuiModule.prototype.listProcessors = function () {
            return [new MainuiProcessor()
            ];
        };
        return MainuiModule;
    }(Module));
    mainui.MainuiModule = MainuiModule;
    var MainuiProcessor = /** @class */ (function (_super) {
        __extends(MainuiProcessor, _super);
        function MainuiProcessor() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        MainuiProcessor.prototype.getName = function () {
            return "MainuiProcessor";
        };
        MainuiProcessor.prototype.receivedModuleEvent = function ($event) {
            switch ($event.type) {
                case MainuiEvent.SHOW_MAIN_UI_PANEL:
                    ModuleEventManager.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.SHOW_TOP_MENU_PANEL));
                    ModuleEventManager.dispatchEvent(new rightpanda.RightPandaEvent(rightpanda.RightPandaEvent.SHOW_RIGHT_PANDA_PANEL));
                    ModuleEventManager.dispatchEvent(new platform.PlatFormEvent(platform.PlatFormEvent.SHOW_PLAT_FORM_PANEL));
                    break;
                case game.SceneEvent.SELECT_SCENE_LEVEL:
                    var $canShow = game.GameDataModel.levelNum <= 2;
                    if ($canShow) {
                        if (!this.guideHandPanel) {
                            this.guideHandPanel = new guidehand.GuideHandPanel();
                        }
                        this.guideHandPanel.showPanel();
                    }
                    else {
                        if (this.guideHandPanel) {
                            this.guideHandPanel.hidePanel();
                        }
                    }
                    break;
                case MainuiEvent.HIDE_MAIN_UI_PANEL:
                    ModuleEventManager.dispatchEvent(new topmenu.TopMenuEvent(topmenu.TopMenuEvent.HIDE_TOP_MENU_PANEL));
                    ModuleEventManager.dispatchEvent(new rightpanda.RightPandaEvent(rightpanda.RightPandaEvent.HIDE_RIGHT_PANDA_PANEL));
                    ModuleEventManager.dispatchEvent(new platform.PlatFormEvent(platform.PlatFormEvent.HIDE_PLAT_FORM_PANEL));
                    break;
                default:
                    break;
            }
        };
        MainuiProcessor.prototype.listenModuleEvents = function () {
            return [
                new MainuiEvent(MainuiEvent.SHOW_MAIN_UI_PANEL),
                new MainuiEvent(MainuiEvent.HIDE_MAIN_UI_PANEL),
                new MainuiEvent(MainuiEvent.SHOW_GUIDE_HAND_PANEL),
                new game.SceneEvent(game.SceneEvent.SELECT_SCENE_LEVEL),
            ];
        };
        return MainuiProcessor;
    }(BaseProcessor));
    mainui.MainuiProcessor = MainuiProcessor;
})(mainui || (mainui = {}));
