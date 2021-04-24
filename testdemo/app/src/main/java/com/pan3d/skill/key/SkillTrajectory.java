package com.pan3d.skill.key;

import com.pan3d.display.interfaces.IBind;
import com.pan3d.scene.Scene3D;
import com.pan3d.skill.vo.SkillKeyVo;
import com.pan3d.vo.Matrix3D;

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
