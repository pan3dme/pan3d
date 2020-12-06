package com.z3d.skill.vo;

import android.util.Log;

import java.util.ArrayList;
import java.util.List;

import com.z3d.base.Scene_data;
import com.z3d.res.SkillActionVo;
import com.z3d.vo.DataObjTempVo;
import com.z3d.vo.ShockAryVo;

public class SkillVo {
    private static final String TAG ="SkillVo" ;
    public List keyAry;

    public String action;
    private String skillname;
    private int bloodTime;
    public int types;
    private SkillKeyVo sound;
    private List<SkillShockVo> shockAry;

    public void setData(SkillActionVo $info) {
        this.keyAry = new ArrayList<>();
        if ($info==null) {
            Log.d(TAG, "技能有错: ");
        }
        this.action = $info.action;
        this.skillname = $info.skillname;
        this.bloodTime = $info.blood;
        this.types = $info.type;
        if (this.types == SkillType.FixEffect) {
            this.keyAry = this.getFixEffect($info.data);
        } else if (this.types == SkillType.TrajectoryDynamicTarget || this.types == SkillType.TrajectoryDynamicPoint) {
            this.keyAry = this.getTrajectoryDynamicTarget($info.data);
        }
        if ($info.sound!=null) {
            this.sound = new SkillKeyVo();
            int aaa=(int)$info.sound.get("time");
            this.sound.frame =aaa * Scene_data.frameTime;
            this.sound.url =(String) $info.sound.get("name");
        }
        if ($info.shock!=null) {
            this.shockAry = this.getShockAry($info.shock);
        }
    }

    private List<SkillShockVo> getShockAry(List<ShockAryVo> $ary) {
        List<SkillShockVo> keyAry = new ArrayList<>();
        for (int i = 0; i < $ary.size(); i++) {
            SkillShockVo key  = new SkillShockVo();
            key.setData($ary.get(i));
            keyAry.add(key);
        }
        return keyAry;
    }

    private List getTrajectoryDynamicTarget(ArrayList<DataObjTempVo> $ary) {
        List<SkillTrajectoryTargetKeyVo> keyAry = new ArrayList<>();
        for (int i    = 0; i < $ary.size() ; i++) {
            SkillTrajectoryTargetKeyVo key = new SkillTrajectoryTargetKeyVo();
            key.setData($ary.get(i));
            keyAry.add(key);
        }
        return keyAry;
    }

    private List getFixEffect(ArrayList<DataObjTempVo> $ary) {

        List<SkillFixEffectKeyVo> keyAry  = new ArrayList<>();
        for (int i    = 0; i < $ary.size() ; i++) {
            SkillFixEffectKeyVo key  = new SkillFixEffectKeyVo();
            key.setData($ary.get(i));
            keyAry.add(key);
        }

        return keyAry;
    }

}
