package z3d.display;

import z3d.base.Object3D;
import z3d.scene.Scene3D;

public class Display3D<bool> extends Object3D {
    public Scene3D scene3d;
    public  Display3D(Scene3D val  ){
        this.scene3d=val;
    }

    public boolean getCanRender() {
        return true;
    }
    public void upData()
    {
    }
    final public void  updateMatrix()
    {
    }

}
