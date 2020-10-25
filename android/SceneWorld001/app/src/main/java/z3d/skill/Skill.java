package z3d.skill;

import java.util.ArrayList;
import java.util.List;

import scene.CallBack;
import z3d.base.Object3D;
import z3d.display.role.SceneChar;
import z3d.res.SkillActionVo;
import z3d.skill.key.SkillFixEffect;
import z3d.skill.key.SkillKey;
import z3d.skill.key.SkillMulTrajectory;
import z3d.skill.key.SkillTrajectory;
import z3d.skill.vo.SkillKeyVo;
import z3d.skill.vo.SkillTrajectoryTargetKeyVo;
import z3d.skill.vo.SkillType;
import z3d.skill.vo.SkillVo;
import z3d.vo.Vector3D;

public class Skill {
    public boolean isDeath;
    public int useNum;
    public String name;
    public boolean hasDestory;
    public String key;
    public boolean src;
    private SkillVo skillVo;
    private ArrayList<Object> trajectoryAry;
    private SkillData skillData;
    private ArrayList<Object> keyAry;
    private Object3D active;
    private int completeNum;
    private CallBack completeFun;
    private int idleTime;
    public void reset() {
    }
    public void setData(SkillActionVo $data, SkillData $skillData) {
        if (this.hasDestory) {
            return;
        }
        this.skillVo = new SkillVo();
        this.skillVo.setData($data);
        this.setKeyAry();
        this.trajectoryAry = new ArrayList<>();
        this.skillData = $skillData;
    }

    private void setKeyAry() {
        this.keyAry = new ArrayList<>();
        if (this.skillVo.types == SkillType.FixEffect) {
            for (int i = 0; i < this.skillVo.keyAry.size(); i++) {
                SkillFixEffect keySkill  = new SkillFixEffect();
                keySkill.setInfo((SkillKeyVo)this.skillVo.keyAry.get(i));
                keySkill.removeCallFun = new CallBack() {
                    @Override
                    public void StateChange(Object val) {
                        SkillKey skillKey=(SkillKey)val;
                         removeKey(skillKey) ;
                    }
                };
                keySkill.active = this.active;
                this.keyAry.add(keySkill);
            }
        } else if (this.skillVo.types == SkillType.TrajectoryDynamicTarget || this.skillVo.types == SkillType.TrajectoryDynamicPoint) {
            for (int i = 0; i < this.skillVo.keyAry.size(); i++) {
                SkillTrajectory trajectory ;
                SkillTrajectoryTargetKeyVo tkv    = (SkillTrajectoryTargetKeyVo)this.skillVo.keyAry.get(i);
                if (tkv.multype == 1) {
                    trajectory = new SkillMulTrajectory();
                } else {
                    trajectory = new SkillTrajectory();
                }
                trajectory.setInfo((SkillKeyVo)this.skillVo.keyAry.get(i));
                this.keyAry.add(trajectory);
            }
        }
    }
    private void removeKey(SkillKey skillKey) {
        this.completeNum++;
        if (this.completeNum == this.keyAry.size()) {
            this.skillComplete();
        }
    }

    private void skillComplete() {
        SkillManager.getInstance().removeSkill(this);
        this.isDeath = true;
        if (this.completeFun!=null) {
            this.completeFun.StateChange(true);
        }
        this.idleTime = 0;
    }

    public void configFixEffect(SceneChar $active, CallBack $completeFun, List<Vector3D> $posObj) {

        this.active = $active;
        this.completeFun = $completeFun;
        if (this.keyAry==null) {
            return;
        }
        for (int i = 0; i < this.keyAry.size(); i++) {
            if (this.skillVo.types != SkillType.FixEffect) {
                continue;
            }
            SkillFixEffect skillFixEffect   = (SkillFixEffect)this.keyAry.get(i);
            skillFixEffect.active = $active;
            if ($posObj!=null && $posObj.size()>0) {
                if (i > ($posObj.size() - 1)) {
                    skillFixEffect.outPos = $posObj.get($posObj.size() - 1);
                } else {
                    skillFixEffect.outPos = $posObj.get(i);
                }
            } else {
                skillFixEffect.outPos = null;
            }
        }
    }
}
