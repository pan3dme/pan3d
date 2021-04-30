var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var Pan3d;
(function (Pan3d) {
    var ResManager = /** @class */ (function (_super) {
        __extends(ResManager, _super);
        function ResManager() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        ResManager.prototype.loadRoleRes = function (url, $fun, $meshBatchNum) {
            var roleRes = new Pan3d.RoleRes(this.scene3D);
            roleRes.meshBatchNum = $meshBatchNum;
            roleRes.load(url, function () {
                $fun(roleRes);
            });
        };
        ResManager.prototype.loadSkillRes = function (url, $fun) {
            var skillRes = new Pan3d.SkillRes(this.scene3D);
            skillRes.load(url, function () {
                $fun(skillRes);
            });
        };
        return ResManager;
    }(Pan3d.ResGC));
    Pan3d.ResManager = ResManager;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=ResManager.js.map