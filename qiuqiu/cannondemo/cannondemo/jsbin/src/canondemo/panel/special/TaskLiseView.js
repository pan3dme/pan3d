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
    var SList = Pan3d.SList;
    var UIManager = Pan3d.UIManager;
    var SListItem = Pan3d.SListItem;
    var InteractiveEvent = Pan3d.InteractiveEvent;
    var LabelTextFont = Pan3d.LabelTextFont;
    var TextAlign = Pan3d.TextAlign;
    var ColorType = Pan3d.ColorType;
    var Vector2D = Pan3d.Vector2D;
    var TextureManager = Pan3d.TextureManager;
    var UiDraw = Pan3d.UiDraw;
    var Rectangle = Pan3d.Rectangle;
    var SpecialMeshVo = /** @class */ (function () {
        function SpecialMeshVo() {
        }
        SpecialMeshVo.everydayonline = 1;
        SpecialMeshVo.everydayendless = 2;
        SpecialMeshVo.helpOther = 3;
        return SpecialMeshVo;
    }());
    special.SpecialMeshVo = SpecialMeshVo;
    var SpecialUiList = /** @class */ (function (_super) {
        __extends(SpecialUiList, _super);
        function SpecialUiList() {
            var _this = _super.call(this) || this;
            _this.center = 0;
            _this.middle = -0;
            _this._maskLevel = 7;
            return _this;
        }
        SpecialUiList.prototype.init = function ($uiAtlas) {
            this.baseAtlas = $uiAtlas;
            this.initData();
        };
        SpecialUiList.prototype.initData = function () {
            var $ary = new Array();
            this.setData($ary, SpecialViewRender, 400, 80 * 6, 0, 80, 6, 256, 1024, 1, 10);
        };
        SpecialUiList.prototype.show = function () {
            if (!this.hasStage) {
                UIManager.getInstance().addUIContainer(this);
            }
        };
        SpecialUiList.prototype.hide = function () {
            if (this.hasStage) {
                UIManager.getInstance().removeUIContainer(this);
            }
        };
        return SpecialUiList;
    }(SList));
    special.SpecialUiList = SpecialUiList;
    var SpecialViewRender = /** @class */ (function (_super) {
        __extends(SpecialViewRender, _super);
        function SpecialViewRender() {
            var _this = _super !== null && _super.apply(this, arguments) || this;
            _this._num = 1;
            return _this;
        }
        SpecialViewRender.prototype.create = function ($container, $bgRender, $baseRender, $customizeRenderAry) {
            if ($customizeRenderAry === void 0) { $customizeRenderAry = null; }
            _super.prototype.create.call(this, $container, $bgRender, $baseRender, $customizeRenderAry);
            //this.Special_bg = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Special_bg", 0, 0, 400, 64);
            this.Special_bg = this.creatGrid9SUI($bgRender, this.parentTarget.baseAtlas, "Special_bg", 0, 0, 400, 80, 25, 25);
            $container.addChild(this.Special_bg);
            this.Special_list_id = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Special_list_id", 10, 13, 45, 45);
            $container.addChild(this.Special_list_id);
            this.Special_ion_pic = this.creatSUI($bgRender, this.parentTarget.baseAtlas, "Special_ion_pic", 70, 18, 44, 44);
            $container.addChild(this.Special_ion_pic);
            this.Special_info = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Special_info", 100, 28, 190, 20);
            $container.addChild(this.Special_info);
            this.Special_but = this.creatSUI($baseRender, this.parentTarget.baseAtlas, "Special_but", 280, 13, 110, 49);
            $container.addChild(this.Special_but);
            this.Special_but.addEventListener(InteractiveEvent.Down, this.butDown, this);
            this.Special_but.addEventListener(InteractiveEvent.Up, this.butUp, this);
        };
        SpecialViewRender.prototype.butDown = function (evt) {
            this.lastMouseV2d = new Vector2D(evt.x, evt.y);
            this.downTarget = evt.target;
        };
        SpecialViewRender.prototype.butUp = function (evt) {
            if (this.itdata && this.downTarget == evt.target && this.lastMouseV2d && this.lastMouseV2d.x == evt.x && this.lastMouseV2d.y == evt.y) {
                var $tadayStr = GameData.getDayStr();
                var $taskMeshVo = this.itdata.data;
                if ($taskMeshVo.processdata == 1) {
                    msgalert.AlertUtil.show("领取每日上线奖励 " + $taskMeshVo.num + " 钻石", "提示", function (value) {
                        if (value == 1) {
                            GameData.hasdiamondsHavenum += $taskMeshVo.num;
                            switch ($taskMeshVo.type) {
                                case SpecialMeshVo.everydayonline:
                                    GameData.setStorageSync("everydayonline", $tadayStr);
                                    break;
                                case SpecialMeshVo.everydayendless:
                                    GameData.setStorageSync("everydayendless", $tadayStr);
                                    break;
                                case SpecialMeshVo.helpOther:
                                    var $helpdata = GameData.getStorageSync("helpdata");
                                    $helpdata.isget = true;
                                    GameData.setStorageSync("helpdata", $helpdata);
                                    break;
                                default:
                                    break;
                            }
                            Pan3d.ModuleEventManager.dispatchEvent(new special.SpecialEvent(special.SpecialEvent.SHOW_TASK_PANEL));
                        }
                    }, 2);
                }
                // console.log($taskMeshVo)
            }
        };
        SpecialViewRender.prototype.render = function ($data) {
            this.itdata = $data;
            if ($data && $data.data) {
                var $taskMeshVo = $data.data;
                this.drawPicAndTxt(this.Special_list_id, "List_id_bg", String($data.id + 1), new Vector2D(0, 15), TextAlign.CENTER);
                this.uiAtlas.upDataPicToTexture($taskMeshVo.iconUrl, this.Special_ion_pic.skinName);
                var $textColor = ColorType.Black000000;
                var $processStr = "未完成";
                var $picStr = "But_base_2";
                if ($taskMeshVo.processdata == 1) {
                    $processStr = "可领取";
                    $picStr = "But_base_1";
                    $textColor = ColorType.Redff0000;
                }
                if ($taskMeshVo.processdata == 2) {
                    $processStr = "已领取";
                    $textColor = ColorType.Black000000;
                }
                LabelTextFont.writeSingleLabel(this.uiAtlas, this.Special_info.skinName, $taskMeshVo.txt, 18, TextAlign.CENTER, $textColor);
                this.drawPicAndTxt(this.Special_but, $picStr, $processStr, new Vector2D(0, 15), TextAlign.CENTER);
                UiDraw.uiAtlasDrawImg(this.uiAtlas, this.Special_bg.skinName, UIData.textlist, "List_base_bg_1");
            }
        };
        SpecialViewRender.prototype.drawPicAndTxt = function ($ui, puslicname, txt, pos, $align) {
            if ($align === void 0) { $align = TextAlign.CENTER; }
            var $rect = this.uiAtlas.getRec($ui.skinName);
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D($rect.pixelWitdh, $rect.pixelHeight, false);
            UiDraw.cxtDrawImg(this.uiAtlas.ctx, puslicname, new Rectangle(0, 0, $rect.pixelWitdh, $rect.pixelHeight), UIData.textlist);
            LabelTextFont.writeSingleLabelToCtx(this.uiAtlas.ctx, txt, 16, pos.x, pos.y, $align);
            Pan3d.TextureManager.getInstance().updateTexture(this.uiAtlas.texture, $rect.pixelX, $rect.pixelY, this.uiAtlas.ctx);
        };
        SpecialViewRender.prototype.fileColor = function ($iconName, $color) {
            var rec = this.uiAtlas.getRec($iconName);
            rec.pixelX -= 1;
            rec.pixelY -= 1;
            rec.pixelWitdh += 2;
            rec.pixelHeight += 2;
            this.uiAtlas.ctx = UIManager.getInstance().getContext2D(rec.pixelWitdh, rec.pixelHeight, false);
            this.uiAtlas.ctx.fillStyle = $color;
            this.uiAtlas.ctx.fillRect(0, 0, rec.pixelWitdh, rec.pixelHeight);
            TextureManager.getInstance().updateTexture(this.uiAtlas.texture, rec.pixelX, rec.pixelY, this.uiAtlas.ctx);
        };
        return SpecialViewRender;
    }(SListItem));
    special.SpecialViewRender = SpecialViewRender;
})(special || (special = {}));
//# sourceMappingURL=TaskLiseView.js.map