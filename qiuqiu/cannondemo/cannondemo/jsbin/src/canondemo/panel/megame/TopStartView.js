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
var megame;
(function (megame) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIManager = Pan3d.UIManager;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var TimeUtil = Pan3d.TimeUtil;
    var TopStartView = /** @class */ (function (_super) {
        __extends(TopStartView, _super);
        function TopStartView() {
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
            _this.lastUserInfo = GameData.getStorageSync("userInfo");
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/topstart/topstart.txt", "panelui/topstart/topstart.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        TopStartView.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.c_tip_bg:
                    break;
                case this.c_game_star_bg:
                    this.hidePanel();
                    break;
                default:
                    break;
            }
        };
        TopStartView.prototype.hidePanel = function () {
            var _this = this;
            UIManager.getInstance().removeUIContainer(this);
            if (this.lastUserInfo && Boolean(GameData.getStorageSync("user_create"))) {
                var $postStr = "";
                $postStr += "openid=" + GameData.getStorageSync("openid");
                GameData.WEB_SEVER_EVENT_AND_BACK("user_login", $postStr, function (res) {
                    console.log("user_login", res);
                });
                this.getSelfInfo();
            }
            else {
                this.user_create();
            }
            TimeUtil.addTimeOut(1000, function () {
                //开始游戏后1秒再加载其它页面
                _this.loadPanelH5UiXml();
            });
        };
        TopStartView.prototype.loadPanelH5UiXml = function () {
            var $arr = new Array;
            $arr.push("panelui/alert/alert");
            $arr.push("panelui/bottommenu/bottommenu");
            $arr.push("panelui/help/help");
            $arr.push("panelui/invitation/invitation");
            $arr.push("panelui/levelup/levelup");
            $arr.push("panelui/menuselect/menuselect");
            $arr.push("panelui/rank/rank");
            $arr.push("panelui/resetplay/resetplay");
            $arr.push("panelui/rightpanda/rightpanda");
            $arr.push("panelui/selectlevel/selectlevel");
            $arr.push("panelui/setupwin/setupwin");
            $arr.push("panelui/skin/skin");
            $arr.push("panelui/topmenu/topmenu");
            $arr.push("panelui/topstart/topstart");
            for (var i = 0; i < $arr.length; i++) {
                var $name = $arr[i];
                var $h5UIAtlas = new H5UIAtlas;
                $h5UIAtlas.setInfo($name + ".txt", $name + ".png", function () { });
            }
        };
        TopStartView.prototype.getSelfInfo = function () {
            var _this = this;
            GameData.GET_USER_INFO_LIST([GameData.getStorageSync("openid")], function ($listArr) {
                if ($listArr && $listArr.length) {
                    if (String($listArr[0].name).length < 1) {
                        var $postStr = "";
                        $postStr += "openid=" + GameData.getStorageSync("openid");
                        $postStr += "&user_key=" + "name";
                        $postStr += "&user_value=" + "无名";
                        GameData.WEB_SEVER_EVENT_AND_BACK("user_update_info", $postStr);
                    }
                    else {
                        if (GameData.userInfo) {
                            if (GameData.userInfo.nickName != $listArr[0].name) {
                                console.log("服务器信息和自己名字不一样");
                                GameData.changeWebUserInfo("name", GameData.userInfo.nickName);
                            }
                        }
                    }
                    GameData.webuserInfo = $listArr;
                }
                else {
                    console.log("没有我的用户信息");
                    _this.user_create();
                }
            });
        };
        //user_create (openid,avatar,name,area,gender,enter_type)
        TopStartView.prototype.user_create = function () {
            var _this = this;
            //GameData.userInfo.avatarUrl = "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83eq3WqyPdicRC94cdib7xaor446tP803NprpvsP80mwqKT4OwovKicicaEf0Y1vWxYTxs3KOErGamXE37g/132"
            //GameData.userInfo.city = "Xiamen";
            //GameData.userInfo.country = "China";
            //GameData.userInfo.gender = 1;
            //GameData.userInfo.language = "zh_CN";
            //GameData.userInfo.nickName = "美丽人生";
            //GameData.userInfo.province = "Fujian";
            var $postStr = "";
            $postStr += "openid=" + GameData.getStorageSync("openid");
            if (GameData.userInfo) {
                $postStr += "&avatar=" + GameData.userInfo.avatarUrl;
                $postStr += "&area=" + GameData.userInfo.province;
                $postStr += "&gender=" + (GameData.userInfo.gender == 1 ? "男" : "女");
                $postStr += "&name=" + GameData.userInfo.nickName;
                var $enter_type = "";
                if (GameData.onshowRes && GameData.onshowRes.referrerInfo) {
                    if (GameData.onshowRes.referrerInfo.appId) {
                        $enter_type = "&enter_type=" + GameData.onshowRes.referrerInfo.appId;
                    }
                    else {
                        $enter_type = "&enter_type=" + "无";
                    }
                }
                else {
                    if (GameData.wxQuery && GameData.wxQuery.type) {
                        $enter_type = "&enter_type=" + GameData.wxQuery.type;
                    }
                    else {
                        $enter_type = "&enter_type=" + "无";
                    }
                }
                if (GameData.wxQuery && GameData.wxQuery.type) {
                    if (GameData.wxQuery.type == "only_share" || GameData.wxQuery.type == "call_help") {
                        if (GameData.wxQuery.openid) {
                            $enter_type = "&enter_type=" + GameData.wxQuery.openid;
                        }
                    }
                }
                $postStr += $enter_type;
            }
            else {
                $postStr += "&name=" + "没有授权";
            }
            GameData.WEB_SEVER_EVENT_AND_BACK("user_create", $postStr, function (res) {
                GameData.setStorageSync("user_create", true);
                console.log("第一次登入，注册用户信息");
                if (res && res.data && res.data.success) {
                    _this.getSelfInfo();
                }
            });
        };
        TopStartView.prototype.loadConfigCom = function () {
            var _this = this;
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.c_tip_bg = this.addEvntButUp("c_tip_bg", this._bottomRender);
            this.c_tip_bg.top = 0;
            this.c_tip_bg.left = 0;
            this.c_tip_bg.width = 540 * Pan3d.UIData.Scale;
            this.c_tip_bg.height = 960 * Pan3d.UIData.Scale;
            this.addChild(this._midRender.getComponent("c_game_name"));
            this.c_engine_info_txt = this.addChild(this._topRender.getComponent("c_engine_info_txt"));
            LabelTextFont.writeSingleLabel(this._topRender.uiAtlas, this.c_engine_info_txt.skinName, "Powered by LayaAir Engine", 14, TextAlign.CENTER, Pan3d.ColorType.Whiteffffff);
            //var $sceneEvent: game.SceneEvent = new game.SceneEvent(game.SceneEvent.WX_CREATE_USER_INFO_BUTTON)
            //$sceneEvent.data = (res: boolean) => {
            //    if (res) {
            //        this.hidePanel();
            //    }
            //}
            //Pan3d.ModuleEventManager.dispatchEvent($sceneEvent)
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_CREATE_USER_INFO_BUTTON), function (res) {
                if (res) {
                    _this.hidePanel();
                }
            });
            this.showStartBut();
        };
        TopStartView.prototype.showStartBut = function () {
            this.addChild(this._topRender.getComponent("c_star_icon"));
            this.c_game_star_bg = this.addEvntBut("c_game_star_bg", this._midRender);
            this.addChild(this._midRender.getComponent("c_game_star_but"));
        };
        return TopStartView;
    }(H5UIConatiner));
    megame.TopStartView = TopStartView;
})(megame || (megame = {}));
//# sourceMappingURL=TopStartView.js.map