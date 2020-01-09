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
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var TextAlign = Pan3d.TextAlign;
    var ArtFont = Pan3d.ArtFont;
    var GameDataModel = game.GameDataModel;
    var TopMenuPanel = /** @class */ (function (_super) {
        __extends(TopMenuPanel, _super);
        function TopMenuPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = true;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.top = 0;
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/topmenu/topmenu.txt", "panelui/topmenu/topmenu.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        TopMenuPanel.prototype.loadConfigCom = function () {
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.a_tittle_level_bg = this.addEvntBut("a_tittle_level_bg", this._midRender);
            this.a_top_level_num_txt = this.addChild(this._topRender.getComponent("a_top_level_num_txt"));
            this.addChild(this._topRender.getComponent("a_level_left_txt"));
            this.addChild(this._topRender.getComponent("a_level_right_txt"));
            this.a_reset_level_but = this.addEvntButUp("a_reset_level_but", this._topRender);
            this.addChild(this._topRender.getComponent("a_diamonds_icon"));
            this.a_diamonds_num_txt = this.addChild(this._topRender.getComponent("a_diamonds_num_txt"));
            this.a_sound_but = this.addEvntBut("a_sound_but", this._topRender);
            this.setVolumeBut();
            this.uiLoadComplte = true;
            this.showPanel();
        };
        TopMenuPanel.prototype.setVolumeBut = function () {
            this.a_sound_but.goToAndStop(Boolean(GameData.getStorageSync("o_volume_but")) ? 0 : 1);
        };
        TopMenuPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_tittle_level_bg:
                    this.showCammandPanel();
                    break;
                case this.a_sound_but:
                    GameData.setStorageSync("o_volume_but", !Boolean(GameData.getStorageSync("o_volume_but")));
                    this.setVolumeBut();
                    break;
                case this.a_reset_level_but:
                    GameData.dispatchToLevel(GameDataModel.levelNum);
                default:
                    break;
            }
        };
        TopMenuPanel.prototype.refrishUi = function () {
            if (this.uiLoadComplte) {
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_top_level_num_txt.skinName, String(GameDataModel.levelNum), "NUM41", TextAlign.CENTER);
                ArtFont.getInstance().writeFontToSkinName(this._topRender.uiAtlas, this.a_diamonds_num_txt.skinName, String(GameData.hasdiamondsHavenum), "NUM10", TextAlign.CENTER);
            }
        };
        TopMenuPanel.prototype.showCammandPanel = function () {
            if (camand.CammandPanel.getInstance().hasStage) {
                camand.CammandPanel.getInstance().hide();
            }
            else {
                camand.CammandPanel.getInstance().show();
            }
        };
        TopMenuPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
                this.refrishUi();
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        TopMenuPanel.prototype.hidePanel = function () {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
        };
        return TopMenuPanel;
    }(H5UIConatiner));
    platform.TopMenuPanel = TopMenuPanel;
})(platform || (platform = {}));
//# sourceMappingURL=TopMenuPanel.js.map