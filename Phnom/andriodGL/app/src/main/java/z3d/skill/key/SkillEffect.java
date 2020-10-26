package z3d.skill.key;

import android.util.Log;

import z3d.base.Object3D;
import z3d.event.BaseEvent;
import z3d.event.EventCallBack;
import z3d.filemodel.ParticleManager;
import z3d.scene.Scene3D;

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
