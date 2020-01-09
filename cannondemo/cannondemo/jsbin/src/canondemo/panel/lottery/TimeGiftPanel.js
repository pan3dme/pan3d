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
var lottery;
(function (lottery) {
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var TimeUtil = Pan3d.TimeUtil;
    var Vector2D = Pan3d.Vector2D;
    var LotteryVo = /** @class */ (function () {
        function LotteryVo(value) {
            this.id = value.id;
            this.time = value.time;
            this.num = value.num;
            this.type = value.type;
            this.endTm = TimeUtil.getTimer() + this.time * 1000;
        }
        return LotteryVo;
    }());
    lottery.LotteryVo = LotteryVo;
    var LotteryPanel = /** @class */ (function (_super) {
        __extends(LotteryPanel, _super);
        function LotteryPanel() {
            var _this = _super.call(this) || this;
            _this.interfaceUI = true;
            _this.width = 540;
            _this.height = 960;
            _this.center = 0;
            _this.middle = 0;
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            _this.h5UIAtlas = new H5UIAtlas;
            _this.h5UIAtlas.setInfo("panelui/timegift/timegift.txt", "panelui/timegift/timegift.png", function () { _this.loadConfigCom(); });
            return _this;
        }
        LotteryPanel.prototype.loadConfigCom = function () {
            var _this = this;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.a_gfit_bg_pic = this.addEvntBut("a_gfit_bg_pic", this._midRender);
            this.a_gift_bg_time_txt = this._midRender.getComponent("a_gift_bg_time_txt");
            this.uiLoadComplte = true;
            this.showPanel();
            this.toV2d = new Vector2D(1, 0);
            if (this.getNextLottery(0)) {
                this.timegiftVo = new LotteryVo(this.getNextLottery(0));
            }
            TimeUtil.addFrameTick(function () {
                _this.upFrame();
            });
        };
        LotteryPanel.prototype.getNextLottery = function (value) {
            for (var key in GameData.diamondsconfigRes.timegift) {
                if (GameData.diamondsconfigRes.timegift[key].id == String(value)) {
                    return GameData.diamondsconfigRes.timegift[key];
                }
            }
        };
        LotteryPanel.prototype.upFrame = function () {
            var $selfMaxLevel = GameData.getStorageSyncNumber(GameData.SELF_MAX_LEVEL);
            if (this.timegiftVo && GameData.gameType == 1 && $selfMaxLevel > 5) {
                var $str = Pan3d.ColorType.Redff0000 + "00:00";
                if (this.timegiftVo.endTm > TimeUtil.getTimer()) {
                    var timeNumkey = Math.floor((this.timegiftVo.endTm - TimeUtil.getTimer()) / 1000);
                    $str = TimeUtil.getDiffTime2(timeNumkey);
                    $str = $str.substring(3, $str.length);
                    this.a_gfit_bg_pic.x = this.a_gfit_bg_pic.baseRec.x;
                    this.a_gfit_bg_pic.y = this.a_gfit_bg_pic.baseRec.y;
                }
                else {
                    if (this.toV2d) {
                        this.a_gfit_bg_pic.x += this.toV2d.x;
                        if (this.a_gfit_bg_pic.x > 540) {
                            this.toV2d.x = -1;
                        }
                        if (this.a_gfit_bg_pic.x < 0) {
                            this.toV2d.x = 1;
                        }
                        this.a_gfit_bg_pic.y += 0.01;
                        if (this.a_gfit_bg_pic.y > 700) {
                            this.a_gfit_bg_pic.y = this.a_gfit_bg_pic.baseRec.y;
                        }
                    }
                }
                if (this.lastTimeTxt != $str) {
                    LabelTextFont.writeSingleLabel(this._midRender.uiAtlas, this.a_gift_bg_time_txt.skinName, $str, 16, TextAlign.CENTER);
                    this.lastTimeTxt = $str;
                }
            }
            else {
                this.a_gfit_bg_pic.x = 0;
                this.a_gfit_bg_pic.y = 10000;
            }
        };
        LotteryPanel.prototype.butClik = function (evt) {
            switch (evt.target) {
                case this.a_gfit_bg_pic:
                    if (this.timegiftVo.endTm < TimeUtil.getTimer()) {
                        this.showLotteryVo(this.timegiftVo);
                    }
                    else {
                        console.log("时间还没到");
                    }
                    break;
                default:
                    break;
            }
        };
        LotteryPanel.prototype.showLotteryVo = function (vo) {
            var _this = this;
            switch (vo.type) {
                case 1:
                    msgalert.AlertUtil.show("观看视屏可以获取" + vo.num + "钻石奖励", "提示", function (value) {
                        if (value == 1) {
                            if (GameData.devicetypepc) {
                                TimeUtil.addTimeOut(2000, function () {
                                    msgalert.AlertUtil.show("获取得了" + _this.timegiftVo.num + "钻石", "提示", function (bet) {
                                        _this.clikFinish();
                                    }, 2);
                                });
                            }
                            else {
                                _this.lookVideoEvet();
                            }
                        }
                    }, 2);
                    break;
                case 2:
                    msgalert.AlertUtil.show("分享可获取" + vo.num + "钻石奖励", "提示", function (value) {
                        if (value == 1) {
                            if (GameData.devicetypepc) {
                                TimeUtil.addTimeOut(2000, function () {
                                    msgalert.AlertUtil.show("获取得了" + _this.timegiftVo.num + "钻石", "提示", function (bet) {
                                        _this.clikFinish();
                                    }, 2);
                                });
                            }
                            else {
                                _this.toshareEvet();
                            }
                        }
                    }, 2);
                    break;
                default:
                    break;
            }
        };
        LotteryPanel.prototype.toshareEvet = function () {
            var queryStr = "";
            queryStr += 'type=' + "only_share";
            queryStr += '&openid=' + GameData.getStorageSync("openid");
            this.shareTm = Pan3d.TimeUtil.getTimer();
            GameData.WX_ON_SHARE_APP_MESSAGE("分享有礼", queryStr, function (res) {
            }, false);
        };
        LotteryPanel.prototype.onShow = function () {
            if (this.uiLoadComplte && this.hasStage && this.shareTm) {
                if (Pan3d.TimeUtil.getTimer() > (this.shareTm + 2500)) {
                    GameData.addShareToWeb(20);
                    this.clikFinish();
                }
                else {
                    msgalert.AlertUtil.show("分享失败，请分享到其它群");
                }
            }
        };
        LotteryPanel.prototype.clikFinish = function () {
            GameData.hasdiamondsHavenum += this.timegiftVo.num;
            var $temp = this.getNextLottery(this.timegiftVo.id + 1);
            var tempData = GameData.getEveryDataSyncByName("timeGiftInfo");
            console.log(tempData);
            if (tempData.num >= (GameData.diamondsconfigRes.timegift.length - 2)) {
                this.timegiftVo = null;
                //当前取得的奖励超过了总的，将不再显示
            }
            else {
                if ($temp) {
                    this.timegiftVo = new LotteryVo($temp);
                }
                else {
                    this.timegiftVo = null;
                }
                GameData.setEveryDataSyncByName("timeGiftInfo", tempData.num + 1);
            }
        };
        LotteryPanel.prototype.lookVideoEvet = function () {
            var _this = this;
            GameData.dispatchEvent(new game.SceneEvent(game.SceneEvent.WX_LOOK_VIDEO_VD_EVENT), function (value) {
                if (value == 0) {
                    msgalert.AlertUtil.show("网络已断开,无法看到广告", "提示");
                }
                else if (value == 1) {
                    msgalert.AlertUtil.show("获取得了" + _this.timegiftVo.num + "钻石", "提示", function (bet) {
                        _this.clikFinish();
                    }, 2);
                }
                else if (value == 2) {
                    msgalert.AlertUtil.show("需要看完视屏才能得到" + _this.timegiftVo.num + "奖励", "提示", function (bee) {
                        if (bee == 1) {
                            _this.lookVideoEvet();
                        }
                    }, 2);
                }
            });
        };
        LotteryPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                Pan3d.UIManager.getInstance().addUIContainer(this);
            }
            else {
                this.h5UIAtlas.testLoading();
            }
        };
        LotteryPanel.prototype.hidePanel = function () {
            Pan3d.UIManager.getInstance().removeUIContainer(this);
        };
        return LotteryPanel;
    }(H5UIConatiner));
    lottery.LotteryPanel = LotteryPanel;
})(lottery || (lottery = {}));
//# sourceMappingURL=TimeGiftPanel.js.map