package com.z3d.skill.key;

import com.z3d.base.Object3D;
import com.z3d.event.BaseEvent;
import com.z3d.event.EventCallBack;
import com.z3d.filemodel.ParticleManager;

public class SkillEffect extends SkillKey{

    private static final String TAG = "SkillEffect";
    public Object3D active;


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
                _particleManager.removeParticle(particle);
                removeCallFun.StateChange(this);
            }
        };
        return onPlayCom;
    }


}