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
    var SkillTrajectoryTargetKeyVo = /** @class */ (function (_super) {
        __extends(SkillTrajectoryTargetKeyVo, _super);
        function SkillTrajectoryTargetKeyVo() {
            return _super !== null && _super.apply(this, arguments) || this;
        }
        SkillTrajectoryTargetKeyVo.prototype.setData = function ($data) {
            _super.prototype.setData.call(this, $data);
            this.beginType = $data.beginType;
            if (this.beginType == 0) {
                this.beginPos = new Pan3d.Vector3D($data.beginPos.x, $data.beginPos.y, $data.beginPos.z);
            }
            else if (this.beginType == 1) {
                this.beginSocket = $data.beginSocket;
            }
            this.speed = $data.speed;
            if ($data.hitSocket) {
                this.hitSocket = $data.hitSocket;
            }
            if ($data.endParticle) {
                this.endParticleUrl = $data.endParticle;
            }
            this.multype = $data.multype;
        };
        return SkillTrajectoryTargetKeyVo;
    }(Pan3d.SkillKeyVo));
    Pan3d.SkillTrajectoryTargetKeyVo = SkillTrajectoryTargetKeyVo;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillTrajectoryTargetKeyVo.js.map