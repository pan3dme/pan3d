package com.z3d.skill;

import com.z3d.engine.ResCount;
import com.z3d.res.SkillActionVo;
import com.z3d.scene.Scene3D;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class SkillData extends ResCount {
    public HashMap<String, SkillActionVo> data;
    public int useNum;
    private List<Skill> srcList;

    public SkillData(Scene3D val) {
        super(val);
        this.srcList=new ArrayList<>();
    }

    public void addSrcSkill(Skill skill) {
        this.srcList.add(skill);
    }
}
