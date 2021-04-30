var Pan3d;
(function (Pan3d) {
    var SkillKey = /** @class */ (function () {
        function SkillKey(value) {
            this.time = 0;
            this.scene3D = value;
        }
        SkillKey.prototype.addToRender = function () {
            if (!this.particle) {
                return;
            }
            this.particle.reset();
            this.particle.sceneVisible = true;
            this.scene3D.particleManager.addParticle(this.particle);
        };
        SkillKey.prototype.setInfo = function (obj) {
            this.time = obj.frame * Pan3d.Scene3D.frameTime;
            this.particle = this.scene3D.particleManager.getParticleByte(this.scene3D.fileRoot + obj.url);
        };
        SkillKey.prototype.reset = function () {
            //this.time = 0;
            this.particle.reset();
            this.scene3D.particleManager.removeParticle(this.particle);
        };
        SkillKey.prototype.destory = function () {
            // this.particle.destory();
            this.particle = null;
            this.removeCallFun = null;
        };
        return SkillKey;
    }());
    Pan3d.SkillKey = SkillKey;
})(Pan3d || (Pan3d = {}));
//# sourceMappingURL=SkillKey.js.map