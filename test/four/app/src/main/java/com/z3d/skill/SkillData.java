package com.z3d.skill;

import com.z3d.engine.ResCount;
import com.z3d.res.SkillActionVo;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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
