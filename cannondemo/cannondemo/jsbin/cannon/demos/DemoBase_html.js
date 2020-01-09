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
var canonkey;
(function (canonkey) {
    var EventDispatcher = Pan3d.EventDispatcher;
    var DemoBase_html = /** @class */ (function (_super) {
        __extends(DemoBase_html, _super);
        function DemoBase_html() {
            var _this = _super.call(this) || this;
            _this.initData();
            return _this;
        }
        DemoBase_html.prototype.initData = function () {
        };
        return DemoBase_html;
    }(EventDispatcher));
    canonkey.DemoBase_html = DemoBase_html;
})(canonkey || (canonkey = {}));
//# sourceMappingURL=DemoBase_html.js.map