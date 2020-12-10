package com.z3d.skill.key;

import com.z3d.base.CallBack;
import com.z3d.base.Scene_data;
import com.z3d.display.particle.CombineParticle;
import com.z3d.filemodel.ParticleManager;
import com.z3d.scene.Scene3D;
import com.z3d.skill.vo.SkillKeyVo;

public class SkillKey {
    public float time ;
    public CombineParticle particle;
    public CallBack removeCallFun;

    public Scene3D scene3D;
    public SkillKey(Scene3D val){
        scene3D=val;
    }
    public void addToRender(ParticleManager val) {
        if (this.particle==null) {
            return;
        }

        this.particle.reset();
        this.particle.sceneVisible = true;
        scene3D.particleManager.addParticle(this.particle);
    }

    public void setInfo(SkillKeyVo obj) {
        this.time = obj.frame * Scene_data.frameTime;
        this.particle =scene3D.particleManager.getParticleByte( obj.url);


    }
}
