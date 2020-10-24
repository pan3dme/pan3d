package z3d.skill.vo;

import android.util.Log;

import java.util.ArrayList;
import java.util.List;

import z3d.base.Scene_data;
import z3d.res.SkillActionVo;
import z3d.vo.ShockAryVo;

public class SkillVo {
    private static final String TAG ="SkillVo" ;
    public ArrayList<SkillKeyVo> keyAry;
    private String action;
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
            this.sound.frame =(float) $info.sound.get("time") * Scene_data.frameTime;
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

    private ArrayList<SkillKeyVo> getTrajectoryDynamicTarget(ArrayList<Object> data) {
        List<SkillTrajectoryTargetKeyVo> keyAry = new ArrayList<>();
//        for (var i: number = 0; i < $ary.length; i++) {
//            var key: SkillTrajectoryTargetKeyVo = new SkillTrajectoryTargetKeyVo();
//            key.setData($ary[i]);
//            keyAry.push(key);
//        }
        return null;
    }

    private ArrayList<SkillKeyVo> getFixEffect(ArrayList<Object> data) {
        return null;
    }

}
