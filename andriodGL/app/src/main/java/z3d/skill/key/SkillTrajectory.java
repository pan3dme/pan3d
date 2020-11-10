package z3d.skill.key;

import z3d.display.interfaces.IBind;
import z3d.skill.vo.SkillKeyVo;
import z3d.vo.Matrix3D;

public class SkillTrajectory  extends SkillKey implements IBind {
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
