package com.pan3d.display;

import com.pan3d.base.Object3D;
import com.pan3d.scene.Scene3D;
import com.pan3d.vo.Matrix3D;
import com.pan3d.vo.Vector3D;

public class Display3D<bool> extends Object3D {
    public Scene3D scene3D;
    public Matrix3D posMatrix3d;
    public  Display3D(Scene3D val  ){
         scene3D =val;
        this.posMatrix3d=new Matrix3D();
    }

    public boolean getCanRender() {
        return true;
    }
    public void upData()
    {
        this.updateMatrix();
    }
    public void  updateMatrix()
    {
        this.posMatrix3d.identity();
        this.posMatrix3d.appendScale(this.scaleX, this.scaleY, this.scaleZ);
        this.posMatrix3d.appendRotation(this.rotationX, Vector3D.X_AXIS);
        this.posMatrix3d.appendRotation(this.rotationY, Vector3D.Y_AXIS);
        this.posMatrix3d.appendRotation(this.rotationZ, Vector3D.Z_AXIS);
        this.posMatrix3d.appendTranslation(this.x, this.y, this.z);


    }

}
