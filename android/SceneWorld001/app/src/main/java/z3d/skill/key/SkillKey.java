package z3d.skill.key;

import scene.CallBack;
import z3d.base.Scene_data;
import z3d.display.particle.CombineParticle;
import z3d.filemodel.ParticleManager;
import z3d.skill.vo.SkillKeyVo;

public class SkillKey {
    public float time ;
    public CombineParticle particle;
    public CallBack removeCallFun;

    public void addToRender(ParticleManager particleManager) {
        if (this.particle==null) {
            return;
        }
        this.particle.reset();
        this.particle.sceneVisible = true;
        particleManager.addParticle(this.particle);
    }

    public void setInfo(SkillKeyVo obj) {
        this.time = obj.frame * Scene_data.frameTime;
        this.particle = ParticleManager.getInstance().getParticleByte(Scene_data.fileRoot + obj.url);


    }
}
