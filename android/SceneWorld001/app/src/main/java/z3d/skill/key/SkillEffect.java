package z3d.skill.key;

import z3d.base.Object3D;
import z3d.filemodel.ParticleManager;
import z3d.scene.Scene3D;

public class SkillEffect extends SkillKey{

    public Object3D active;

    public void addToRender(ParticleManager particleManager) {
        super.addToRender(particleManager);
//        this.particle.addEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
    }

//    protected onPlayCom(event: Event = null): void {
//        this.particle.removeEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
//        ParticleManager.getInstance().removeParticle(this.particle);
//        this.removeCallFun(this);
//    }
}
