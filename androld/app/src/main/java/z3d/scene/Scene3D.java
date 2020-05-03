package z3d.scene;

import z3d.base.ResGC;
import z3d.core.Context3D;

public class Scene3D extends ResGC {
    public Context3D context3D;

    public Scene3D( ){
        this.context3D=new Context3D();

    }
}
