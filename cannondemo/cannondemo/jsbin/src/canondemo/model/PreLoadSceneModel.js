var game;
(function (game) {
    var PreLoadSceneModel = /** @class */ (function () {
        function PreLoadSceneModel() {
        }
        PreLoadSceneModel.getInstance = function () {
            if (!PreLoadSceneModel._instance) {
                PreLoadSceneModel._instance = new PreLoadSceneModel();
            }
            return PreLoadSceneModel._instance;
        };
        return PreLoadSceneModel;
    }());
    game.PreLoadSceneModel = PreLoadSceneModel;
})(game || (game = {}));
//# sourceMappingURL=PreLoadSceneModel.js.map