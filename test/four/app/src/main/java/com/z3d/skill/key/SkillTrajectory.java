package com.z3d.skill.key;

import com.z3d.display.interfaces.IBind;
import com.z3d.scene.Scene3D;
import com.z3d.skill.vo.SkillKeyVo;
import com.z3d.vo.Matrix3D;

public class SkillTrajectory  extends SkillKey implements IBind {
    public SkillTrajectory(Scene3D val) {
        super(val);
    }

    public void setInfo(SkillKeyVo skillKeyVo) {
    }

    @Override
    public void getSocket(String socketName, Matrix3D resultMatrix) {

    }

    @Override
    public int getSunType() {
        return 0;
    }
}
