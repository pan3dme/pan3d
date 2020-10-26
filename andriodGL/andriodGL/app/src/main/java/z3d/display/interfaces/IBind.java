package z3d.display.interfaces;

import java.util.List;

import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;

public interface IBind {
    public  void getSocket(String socketName, Matrix3D resultMatrix);
    public int getSunType();
}
