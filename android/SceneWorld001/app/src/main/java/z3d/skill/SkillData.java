package z3d.skill;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.engine.ResCount;
import z3d.res.SkillActionVo;
import z3d.vo.Vector3D;

public class SkillData extends ResCount {
    public HashMap<String, SkillActionVo> data;
    public int useNum;
    private List<Skill> srcList;

    public SkillData(){
        super();
        this.srcList=new ArrayList<>();
    }
    public void addSrcSkill(Skill skill) {
        this.srcList.add(skill);
    }
}
