package z3d.display.particle.ctrl;

import java.util.List;

import z3d.base.Scene_data;
import z3d.vo.Vector3D;

public class AxisRotaion extends BaseAnim {
    public Vector3D axis;
    public Vector3D axisPos;

    public void dataByte(List va, List arr) {

        super.dataByte(va,arr);
        this.axis =(Vector3D) arr.get(2);
        this.axisPos =(Vector3D)arr.get(3);
        this.speed = (float)arr.get(4) * 0.1f;
        this.aSpeed =(float)arr.get(5) * 0.1f;

    }
}
