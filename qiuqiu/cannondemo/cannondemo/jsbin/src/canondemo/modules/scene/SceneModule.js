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
var game;
(function (game) {
    var Module = Pan3d.Module;
    var SceneModule = /** @class */ (function (_super) {
        __extends(SceneModule, _super);
        function SceneModule() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SceneModule.prototype.getModuleName = function () {
            return "SceneModule";
        };
        SceneModule.prototype.listProcessors = function () {
            return [new game.SceneProcessor()
            ];
        };
        return SceneModule;
    }(Module));
    game.SceneModule = SceneModule;
})(game || (game = {}));
//# sourceMappingURL=SceneModule.js.map