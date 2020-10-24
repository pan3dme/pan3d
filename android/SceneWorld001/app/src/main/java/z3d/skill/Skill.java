package z3d.skill;

import java.util.ArrayList;

import scene.CallBack;
import z3d.base.Object3D;
import z3d.res.SkillActionVo;
import z3d.skill.key.SkillFixEffect;
import z3d.skill.key.SkillKey;
import z3d.skill.key.SkillMulTrajectory;
import z3d.skill.key.SkillTrajectory;
import z3d.skill.vo.SkillTrajectoryTargetKeyVo;
import z3d.skill.vo.SkillType;
import z3d.skill.vo.SkillVo;

public class Skill {
    public boolean isDeath;
    public int useNum;
    public String name;
    public boolean hasDestory;
    public String key;
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
                keySkill.setInfo(this.skillVo.keyAry.get(i));
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
                trajectory.setInfo(this.skillVo.keyAry.get(i));
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
}
