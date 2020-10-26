package z3d.skill.key;

import z3d.base.Object3D;
import z3d.event.BaseEvent;
import z3d.event.EventCallBack;
import z3d.filemodel.ParticleManager;
import z3d.scene.Scene3D;

public class SkillEffect extends SkillKey{

    public Object3D active;

    public void addToRender(ParticleManager particleManager) {
        super.addToRender(particleManager);

//        this.particle.addEventListeners(BaseEvent.COMPLETE, onPlayCom, this);
    }
    public void onPlayCom(BaseEvent event) {

    }


//    protected onPlayCom(event: Event = null): void {
//        this.particle.removeEventListener(BaseEvent.COMPLETE, this.onPlayCom, this);
//        ParticleManager.getInstance().removeParticle(this.particle);
//        this.removeCallFun(this);
//    }
}
