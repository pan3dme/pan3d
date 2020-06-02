package z3d.display.particle;

import z3d.base.Object3D;
import z3d.display.particle.ctrl.TimeLine;
import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;


public class Display3DParticle extends Object3D {

    public boolean visible;
    public TimeLine timeline;
    protected float _time;
    private float _beginTime;

    public ParticleData data;

    public Matrix3D bindMatrix;
    public Vector3D bindVecter3d;
    public Vector3D bindScale;


    public  Matrix3D invertBindMatrix;
    public   Matrix3D groupMatrix;

    protected  Matrix3D  _rotationMatrix;
    public  Matrix3D  modelMatrix;

    public boolean isInGroup ;
    public Vector3D groupPos;
    public Vector3D groupScale;
    public Vector3D groupRotation;

    public void setBind(Vector3D $pos,Matrix3D  $rotation,Vector3D  $scale,Matrix3D  $invertRotation, Matrix3D $groupMatrix)
    {
        this.bindVecter3d = $pos;
        this.bindMatrix = $rotation;
        this.bindScale = $scale;
        this.invertBindMatrix = $invertRotation;
        this.groupMatrix = $groupMatrix;
    }
    public void setTimeLine(TimeLine $tl) {
        this.timeline = $tl;
        this._beginTime = $tl.beginTime;
    }
    public void onCreated()
    {

    }
}
