package z3d.base;

import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;

public class Camera3D extends Object3D {

    public Matrix3D camMatrix3D;
    public Matrix3D viewMatrix;
    public Matrix3D modelMatrix;
    public float distance;
    public float sceneViewHW;
    public int fovw;
    public int fovh;


    public Camera3D()
    {
        this.camMatrix3D=new Matrix3D();
        this.viewMatrix =new Matrix3D();
        this.modelMatrix =new Matrix3D();
        this.distance=100;
        this.sceneViewHW=100;
        this.fovw=300;
        this.fovh=500;
        this.upFrame();

    }
    public  void  upFrame()
    {

        this.viewMatrix.identity();
        this.viewMatrix.perspectiveFieldOfViewLH(1,1,10,1000);
        this.camMatrix3D.identity();
        this.camMatrix3D.appendRotation(this.rotationY, Vector3D.Y_AXIS);
        this.camMatrix3D.appendRotation(this.rotationX, Vector3D.X_AXIS);
        this.camMatrix3D.appendTranslation(0,0,this.distance);
        this.modelMatrix= this.viewMatrix.clone();
        this.modelMatrix.prepend(this.camMatrix3D);
        Matrix3D  m=this.camMatrix3D.clone();
        m.invert();
        Vector3D p=   m.transformVector(new Vector3D(0,0,-this.distance));
        this.x=p.x;
        this.y=p.y;
        this.z=p.z;
    }
}
