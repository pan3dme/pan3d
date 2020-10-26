package z3d.skill.key;

import scene.CallBack;
import z3d.base.Object3D;
import z3d.skill.vo.SkillFixEffectKeyVo;
import z3d.skill.vo.SkillKeyVo;
import z3d.vo.Vector3D;

public class SkillFixEffect extends SkillEffect  {


    public Vector3D pos;
    public Vector3D rotation;
    public Vector3D outPos  ;
    public boolean hasSocket;
    public String socket;

    public void setInfo(SkillKeyVo skillKeyVo) {
        super.setInfo(skillKeyVo);
        SkillFixEffectKeyVo data   =(SkillFixEffectKeyVo) skillKeyVo;
        this.pos = data.pos;
        this.rotation = data.rotation;
        this.hasSocket = data.hasSocket;
        this.socket = data.socket;
    }
}
