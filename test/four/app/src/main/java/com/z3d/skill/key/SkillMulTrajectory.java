package com.z3d.skill.key;

import com.z3d.display.interfaces.IMulBind;
import com.z3d.scene.Scene3D;
import com.z3d.vo.Vector3D;

import java.util.List;

public class SkillMulTrajectory extends SkillTrajectory implements IMulBind {
    public SkillMulTrajectory(Scene3D val) {
        super(val);
    }

    @Override
    public void getMulSocket(List<Vector3D> ary) {

    }
}
