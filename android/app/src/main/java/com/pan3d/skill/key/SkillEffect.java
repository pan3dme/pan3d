package com.pan3d.skill.key;

import com.pan3d.base.Object3D;
import com.pan3d.event.BaseEvent;
import com.pan3d.event.EventCallBack;
import com.pan3d.filemodel.ParticleManager;
import com.pan3d.scene.Scene3D;

public class SkillEffect extends SkillKey{

    private static final String TAG = "SkillEffect";
    public Object3D active;

    public SkillEffect(Scene3D val) {
        super(val);
    }


    public void addToRender(ParticleManager val) {
        super.addToRender(val);
         this.particle.addEventListener(BaseEvent.COMPLETE,this.getOnPlayCom() , this);
    }
    EventCallBack onPlayCom;
    private EventCallBack getOnPlayCom(){
        if(onPlayCom!=null){
            return onPlayCom;
        }
        onPlayCom=new EventCallBack() {
            @Override
            public void call(Object val, BaseEvent event) {
               particle.removeEventListener(BaseEvent.COMPLETE,getOnPlayCom(),this);
                scene3D.particleManager.removeParticle(particle);
                removeCallFun.StateChange(this);
            }
        };
        return onPlayCom;
    }


}
