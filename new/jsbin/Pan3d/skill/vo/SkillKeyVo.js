var Pan3d;
(function (Pan3d) {
    var SkillKeyVo = /** @class */ (function () {
        function SkillKeyVo() {
            this.frame = 0;
        }
        SkillKeyVo.prototype.setData = function ($data) {
            this.frame = $data.frame;
            this.url = $data.url;
        };
        return SkillKeyVo;
    }());
    Pan3d.SkillKeyVo = SkillKeyVo;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillKeyVo.js.map