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
var leveluppan;
(function (leveluppan) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var UIRenderOnlyPicComponent = Pan3d.UIRenderOnlyPicComponent;
    var LeveBestUIRenderOnlyPicComponent = /** @class */ (function (_super) {
        __extends(LeveBestUIRenderOnlyPicComponent, _super);
        function LeveBestUIRenderOnlyPicComponent($rect) {
            var _this = _super.call(this) || this;
            _this._rect = $rect;
            _this.textureRes = new Pan3d.TextureRes();
            return _this;
        }
        LeveBestUIRenderOnlyPicComponent.prototype.changeRendrDataByVc = function ($vcId, ty) {
            _super.prototype.makeRenderDataVc.call(this, $vcId);
            for (var i = 0; i < this.renderData2.length / 4; i++) {
                this.renderData2[i * 4 + 0] = this._rect.width;
                this.renderData2[i * 4 + 1] = this._rect.height;
                this.renderData2[i * 4 + 2] = this._rect.x;
                this.renderData2[i * 4 + 3] = this._rect.y;
                ;
            }
        };
        LeveBestUIRenderOnlyPicComponent.prototype.makeRenderDataVc = function ($vcId) {
            _super.prototype.makeRenderDataVc.call(this, $vcId);
            this.changeRendrDataByVc($vcId, 0);
        };
        return LeveBestUIRenderOnlyPicComponent;
    }(UIRenderOnlyPicComponent));
    leveluppan.LeveBestUIRenderOnlyPicComponent = LeveBestUIRenderOnlyPicComponent;
    var LevelUpWinPanel = /** @class */ (function (_super) {
        __extends(LevelUpWinPanel, _super);
        function LevelUpWinPanel() {
            var _this = _super.call(this) || this;
            _this.canCloseTm = 0;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this._rankUseRend = new LeveBestUIRenderOnlyPicComponent(new Pan3d.Rectangle(0, 0, 256 / 1024, 256 / 1024));
            _this.addRender(_this._rankUseRend);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/levelup/levelup.txt", "panelui/levelup/levelup.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        LevelUpWinPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.u_temp_level_rank:
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        LevelUpWinPanel.prototype.hidePanel = function () {
            var _this = this;
            GameData.needDrawWxpublicTexture = false;
            this.TweenLiteScale(UIData.Scale, 0.3, 0.2, function () {
                UIManager.getInstance().removeUIContainer(_this);
            });
        };
        LevelUpWinPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                this.canCloseTm = Pan3d.TimeUtil.getTimer() + 1000;
                Pan3d.UIManager.getInstance().addUIContainer(this);
                GameData.needDrawWxpublicTexture = true;
                this.TweenLiteScale(0.3, UIData.Scale, 0.5);
                this._rankUseRend.textureRes.texture = GameData.wx_public_cavans_texture;
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        LevelUpWinPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this._rankUseRend.uiAtlas = this._bottomRender.uiAtlas;
            this.u_temp_level_rank = this.addEvntBut("u_temp_level_rank", this._rankUseRend);
            this.uiLoadComplte = true;
            this.showPanel();
        };
        return LevelUpWinPanel;
    }(H5UIConatiner));
    leveluppan.LevelUpWinPanel = LevelUpWinPanel;
})(leveluppan || (leveluppan = {}));
//# sourceMappingURL=LevelUpWinPanel.js.map