package com.pan3d.skill;

import com.pan3d.base.CallBack;
import com.pan3d.base.Object3D;
import com.pan3d.display.role.Display3dMovie;
import com.pan3d.display.role.SceneChar;
import com.pan3d.res.SkillActionVo;
import com.pan3d.scene.Scene3D;
import com.pan3d.skill.key.SkillFixEffect;
import com.pan3d.skill.key.SkillKey;
import com.pan3d.skill.key.SkillMulTrajectory;
import com.pan3d.skill.key.SkillTrajectory;
import com.pan3d.skill.vo.SkillKeyVo;
import com.pan3d.skill.vo.SkillTrajectoryTargetKeyVo;
import com.pan3d.skill.vo.SkillType;
import com.pan3d.skill.vo.SkillVo;
import com.pan3d.vo.Vector3D;

import java.util.ArrayList;
import java.util.List;

public class Skill {
    private static final String TAG ="Skill" ;
    public boolean isDeath;
    public int useNum;
    public String name;
    public boolean hasDestory;
    public String key;
    public boolean src;
    private SkillVo skillVo;
    private ArrayList<Object> trajectoryAry;
    private SkillData skillData;
    private ArrayList<SkillKey> keyAry;
    private Object3D active;
    private int completeNum;
    private CallBack completeFun;
    private int idleTime;
    private float time;
    private int targetFlag;
    private Scene3D scene3D;
    private int targetShockFlag;
    private boolean soundPlay;
    private boolean needSound;

    public  Skill(Scene3D val){
        this.time=0;
        this.targetFlag=0;
        scene3D=val;
    }
    public void reset() {
        this.time = 0;
        this.completeNum = 0;
        this.active = null;
        this.completeFun = null;
        this.targetFlag = 0;
        this.targetShockFlag = 0;
        this.soundPlay = false;
        this.needSound = false;
        
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
                SkillFixEffect keySkill  = new SkillFixEffect(scene3D);
                keySkill.setInfo((SkillKeyVo)this.skillVo.keyAry.get(i));
                keySkill.removeCallFun = new CallBack() {
                    @Override
                    public void StateChange(Object val) {

                         removeKey(val) ;
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
                    trajectory = new SkillMulTrajectory(scene3D);
                } else {
                    trajectory = new SkillTrajectory(scene3D);
                }
                trajectory.setInfo((SkillKeyVo)this.skillVo.keyAry.get(i));
                this.keyAry.add(trajectory);
            }
        }
    }
    private void removeKey(Object skillKey) {
        this.completeNum++;
        if (this.completeNum == this.keyAry.size()) {
            this.skillComplete();
        }
    }
    private void skillComplete() {
       scene3D.skillManager.removeSkill(this);
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
    public void play() {
        if (this.skillVo==null) {
            this.skillComplete();
            return;
        }
        if (this.active!=null && this.active instanceof Display3dMovie) {
            Display3dMovie $movie3d = (Display3dMovie)this.active;
            $movie3d.play(this.skillVo.action, 2, false);
        }
    }
    public static float MaxTime = 1000 * 5;
    public void update(float t) {

        this.time += t;
        if (this.time > Skill.MaxTime) {
            //console.log("超时结束");
            this.skillComplete();
        }

        this.getKeyTarget();
        this.getShockTarget();
        this.updateTrajector(t);

    }
    private void getKeyTarget() {
        if (this.keyAry==null) {
            return;
        }
        for (int i = this.targetFlag; i < this.keyAry.size(); i++) {
            SkillKey temp=  this.keyAry.get(i);
            if (temp.time < this.time) {
                temp.addToRender(scene3D.particleManager);
                if (this.skillVo.types == SkillType.TrajectoryDynamicTarget || this.skillVo.types == SkillType.TrajectoryDynamicPoint) {
                    this.trajectoryAry.add(temp);
                }
                i++;
                this.targetFlag = i;
            } else {
                break;
            }
        }
        this.getSound();
    }

    private void getSound() {
    }

    private void getShockTarget() {
    }
    private void updateTrajector(float t) {
    }




}
