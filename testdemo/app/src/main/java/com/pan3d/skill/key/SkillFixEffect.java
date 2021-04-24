package com.pan3d.skill.key;

import com.pan3d.scene.Scene3D;
import com.pan3d.skill.vo.SkillFixEffectKeyVo;
import com.pan3d.skill.vo.SkillKeyVo;
import com.pan3d.vo.Vector3D;

public class SkillFixEffect extends SkillEffect {


    public Vector3D pos;
    public Vector3D rotation;
    public Vector3D outPos  ;
    public boolean hasSocket;
    public String socket;

    public SkillFixEffect(Scene3D val) {
        super(val);
    }

    public void setInfo(SkillKeyVo skillKeyVo) {
        super.setInfo(skillKeyVo);
        SkillFixEffectKeyVo data   =(SkillFixEffectKeyVo) skillKeyVo;
        this.pos = data.pos;
        this.rotation = data.rotation;
        this.hasSocket = data.hasSocket;
        this.socket = data.socket;
    }
}
