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
var friendrank;
(function (friendrank) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ColorType = Pan3d.ColorType;
    var FriendRankPanel = /** @class */ (function (_super) {
        __extends(FriendRankPanel, _super);
        function FriendRankPanel() {
            var _this = _super.call(this) || this;
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
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/rank/rank.txt", "panelui/rank/rank.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        FriendRankPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_win_close:
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        FriendRankPanel.prototype.hidePanel = function () {
            var _this = this;
            if (this.uiLoadComplte) {
                this.TweenLiteScale(UIData.Scale, 0.1, 0.2, function () {
                    UIManager.getInstance().removeUIContainer(_this);
                });
            }
        };
        FriendRankPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                UIManager.getInstance().addUIContainer(this);
                this.TweenLiteScale(0.1, UIData.Scale, 0.5);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        FriendRankPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
        };
        FriendRankPanel.prototype.drawSelfInfo = function (value) {
            if (GameData.userInfo) {
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_self_rank_id.skinName, String(value), 16, TextAlign.CENTER, ColorType.Black000000);
                this._topRender.uiAtlas.upDataWebPicToTexture(GameData.userInfo.avatarUrl, this.a_self_icon.skinName);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_self_name.skinName, GameData.userInfo.nickName, 16, TextAlign.CENTER, ColorType.Black000000);
                LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.a_self_res_txt.skinName, String(GameData.hasdiamondsHavenum), 16, TextAlign.CENTER, ColorType.Black000000);
            }
        };
        FriendRankPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.win_tip_bg = this.addChild(this._bottomRender.getComponent("a_tip_bg"));
            this.addChild(this._midRender.getComponent("a_win_bg"));
            this.a_win_close = this.addEvntBut("a_win_close", this._midRender);
            this.addChild(this._topRender.getComponent("a_res_label"));
            this.addChild(this._topRender.getComponent("a_name_label"));
            this.addChild(this._topRender.getComponent("a_icon_label"));
            this.addChild(this._topRender.getComponent("a_id_label"));
            this.addChild(this._midRender.getComponent("a_self_rank_bg"));
            this.a_self_rank_id = this.addChild(this._topRender.getComponent("a_self_rank_id"));
            this.a_self_icon = this.addChild(this._topRender.getComponent("a_self_icon"));
            this.a_self_name = this.addChild(this._topRender.getComponent("a_self_name"));
            this.a_self_res_txt = this.addChild(this._topRender.getComponent("a_self_res_txt"));
            this.uiLoadComplte = true;
            this.showPanel();
        };
        return FriendRankPanel;
    }(H5UIConatiner));
    friendrank.FriendRankPanel = FriendRankPanel;
})(friendrank || (friendrank = {}));
//# sourceMappingURL=RankPanel.js.map