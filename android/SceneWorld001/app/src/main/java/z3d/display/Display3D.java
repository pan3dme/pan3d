package z3d.display;

import z3d.base.Object3D;
import z3d.scene.Scene3D;
import z3d.vo.Matrix3D;
import z3d.vo.Vector2D;
import z3d.vo.Vector3D;

public class Display3D<bool> extends Object3D {
    public Scene3D scene3d;
    public Matrix3D posMatrix3d;
    public  Display3D(Scene3D val  ){
        this.scene3d=val;
        this.posMatrix3d=new Matrix3D();
    }

    public boolean getCanRender() {
        return true;
    }
    public void upData()
    {
    }
    public void  updateMatrix()
    {
        this.posMatrix3d.identity();
        this.posMatrix3d.appendScale(this.scaleX, this.scaleY, this.scaleZ);
//        this.posMatrix3d.appendRotation(this.rotationX, Vector3D.X_AXIS);
//        this.posMatrix3d.appendRotation(this.rotationY, Vector3D.Y_AXIS);
//        this.posMatrix3d.appendRotation(this.rotationZ, Vector3D.Z_AXIS);
//        this.posMatrix3d.appendTranslation(this.x, this.y, this.z);
        this.posMatrix3d.appendTranslation(0, 0,0);

    }

}
