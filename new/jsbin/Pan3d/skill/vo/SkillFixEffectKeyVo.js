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
    var SkillFixEffectKeyVo = /** @class */ (function (_super) {
        __extends(SkillFixEffectKeyVo, _super);
        function SkillFixEffectKeyVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkillFixEffectKeyVo.prototype.setData = function ($data) {
            _super.prototype.setData.call(this, $data);
            this.hasSocket = $data.hasSocket;
            if (this.hasSocket) {
                this.socket = $data.socket;
            }
            else {
                this.pos = new Pan3d.Vector3D($data.pos.x, $data.pos.y, $data.pos.z);
                this.rotation = new Pan3d.Vector3D($data.rotation.x, $data.rotation.y, $data.rotation.z);
            }
        };
        return SkillFixEffectKeyVo;
    }(Pan3d.SkillKeyVo));
    Pan3d.SkillFixEffectKeyVo = SkillFixEffectKeyVo;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillFixEffectKeyVo.js.map