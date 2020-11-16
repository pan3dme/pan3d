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
    var UIRenderComponent = Pan3d.UIRenderComponent;
    var UIData = Pan3d.UIData;
    var Rectangle = Pan3d.Rectangle;
    var SListItemData = Pan3d.SListItemData;
    var SpecialPanel = /** @class */ (function (_super) {
        __extends(SpecialPanel, _super);
        function SpecialPanel() {
            var _this = _super.call(this) || this;
            _this._bottomRender = new UIRenderComponent();
            _this.addRender(_this._bottomRender);
            _this._midRender = new UIRenderComponent();
            _this.addRender(_this._midRender);
            _this._topRender = new UIRenderComponent();
            _this.addRender(_this._topRender);
            return _this;
        }
        SpecialPanel.prototype.baseWindowLoadFinish = function () {
            var _this = this;
            _super.prototype.baseWindowLoadFinish.call(this);
            this.h5UIAtlas = new H5UIAtlas;
            this.h5UIAtlas.setInfo("panelui/task/task.txt", "panelui/task/task.png", function () { _this.loadConfigCom(); });
        };
        SpecialPanel.prototype.loadConfigCom = function () {
            this._bottomRender.uiAtlas = this.h5UIAtlas;
            this._midRender.uiAtlas = this.h5UIAtlas;
            this._topRender.uiAtlas = this.h5UIAtlas;
            this.uiLoadComplte = true;
            this.winRect = new Rectangle(0, -60, 450, 500);
            this.addChild(this._topRender.getComponent("a_win_tittle_txt"));
            this.addChild(this._topRender.getComponent("a_task_label_id"));
            this.addChild(this._topRender.getComponent("a_task_label_contet"));
            this.addChild(this._topRender.getComponent("a_task_label_pro"));
            this._taskUiList = new special.SpecialUiList();
            this._taskUiList.init(this._topRender.uiAtlas);
            this.showPanel();
        };
        SpecialPanel.prototype.showSpecialListData = function () {
            var ary = new Array;
            this._dayStr = GameData.getDayStr();
            this.pushTempSListItemData(ary, this.meshEverydayOnLine());
            this.pushTempSListItemData(ary, this.meshEverydayEndless());
            this.pushTempSListItemData(ary, this.meshHelpByEveryDay());
            this._taskUiList.refreshData(ary);
        };
        SpecialPanel.prototype.pushTempSListItemData = function (ary, $vo1) {
            if ($vo1) {
                ary.push($vo1);
                $vo1.id = ary.length;
            }
        };
        SpecialPanel.prototype.meshEverydayOnLine = function () {
            var item = new SListItemData;
            var $taskMeshVo = new special.SpecialMeshVo();
            $taskMeshVo.txt = "每日上线奖励";
            $taskMeshVo.iconUrl = "ui/panda/9.png";
            $taskMeshVo.type = special.SpecialMeshVo.everydayonline;
            $taskMeshVo.num = 10;
            $taskMeshVo.tipstr = "领取每日奖励";
            item.data = $taskMeshVo;
            item.id = 1;
            var $lastGetDate = GameData.getStorageSync("everydayonline");
            if ($lastGetDate) {
                if ($lastGetDate == this._dayStr) {
                    $taskMeshVo.processdata = 2;
                }
                else {
                    $taskMeshVo.processdata = 1;
                }
            }
            else {
                $taskMeshVo.processdata = 1;
            }
            return item;
        };
        SpecialPanel.prototype.meshEverydayEndless = function () {
            var item = new SListItemData;
            var $taskMeshVo = new special.SpecialMeshVo();
            $taskMeshVo.txt = "每日无尽榜单奖励";
            $taskMeshVo.iconUrl = "ui/panda/11.png";
            $taskMeshVo.type = special.SpecialMeshVo.everydayendless;
            $taskMeshVo.num = 10;
            $taskMeshVo.tipstr = "领取无尽榜单奖励";
            item.data = $taskMeshVo;
            item.id = 1;
            var $lastGetDate = GameData.getStorageSync("everydayendless");
            var $endlessMaxLevel = GameData.getStorageSyncNumber("endlessMaxLevel");
            if ($lastGetDate) {
                if ($lastGetDate == this._dayStr) {
                    $taskMeshVo.processdata = 2;
                }
                else {
                    $taskMeshVo.processdata = 1;
                }
            }
            else {
                $taskMeshVo.processdata = 1;
            }
            if (isNaN($endlessMaxLevel) || $endlessMaxLevel < 1) {
                $taskMeshVo.processdata = 0;
            }
            return item;
        };
        SpecialPanel.prototype.meshHelpByEveryDay = function () {
            var $helpdata = GameData.getStorageSync("helpdata");
            if (!$helpdata) {
                $helpdata = {};
                GameData.setStorageSync("helpdata", $helpdata);
            }
            if ($helpdata.date != this._dayStr) {
                $helpdata.date = this._dayStr;
                $helpdata.helpnum = 0;
                $helpdata.isget = false;
            }
            var item = new SListItemData;
            var $taskMeshVo = new special.SpecialMeshVo();
            $taskMeshVo.iconUrl = "ui/panda/1.png";
            $taskMeshVo.type = special.SpecialMeshVo.helpOther;
            $taskMeshVo.num = 20;
            $taskMeshVo.tipstr = "领取帮助奖励";
            item.data = $taskMeshVo;
            item.id = 1;
            $taskMeshVo.processdata = 0;
            if ($helpdata.helpnum >= 2) {
                $taskMeshVo.processdata = 1;
            }
            if ($helpdata.isget) {
                $taskMeshVo.processdata = 2;
            }
            $taskMeshVo.txt = "每天帮助(" + $helpdata.helpnum + "/2)人";
            return item;
        };
        SpecialPanel.prototype.butClik = function (evt) {
            this.hidePanel();
        };
        SpecialPanel.prototype.showPanel = function () {
            if (this.uiLoadComplte) {
                if (!this.hasStage) {
                    Pan3d.UIManager.getInstance().addUIContainer(this);
                    this._taskUiList.show();
                    this.TweenLiteScale(0.1, UIData.Scale, 0.5);
                }
                this.showSpecialListData();
            }
            else {
                if (this.h5UIAtlas) {
                    this.h5UIAtlas.testLoading();
                }
            }
        };
        SpecialPanel.prototype.resize = function () {
            _super.prototype.resize.call(this);
            this._taskUiList.resize();
        };
        SpecialPanel.prototype.hidePanel = function () {
            var _this = this;
            if (this.uiLoadComplte) {
                this.TweenLiteScale(UIData.Scale, 0.1, 0.2, function () {
                    Pan3d.UIManager.getInstance().removeUIContainer(_this);
                    _this._taskUiList.hide();
                });
            }
        };
        return SpecialPanel;
    }(basewin.BaseWinPanel));
    special.SpecialPanel = SpecialPanel;
})(special || (special = {}));
//# sourceMappingURL=TaskPanel.js.map