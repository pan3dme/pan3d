package z3d.display.particle;

import android.util.Log;

import z3d.base.Object3D;
import z3d.core.Context3D;
import z3d.display.Display3D;
import z3d.display.particle.ctrl.TimeLine;
import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;


public class Display3DParticle extends Display3D {

    public boolean visible;
    public TimeLine timeline;
    protected float _time;
    private float _beginTime;
    public ParticleData data;
    public Matrix3D bindMatrix;
    public Vector3D bindVecter3d;
    public Vector3D bindScale;
    public Matrix3D invertBindMatrix;
    public Matrix3D groupMatrix;
    protected Matrix3D  _rotationMatrix;
    public Matrix3D  modelMatrix;
    public boolean isInGroup ;
    public Vector3D groupPos;
    public Vector3D groupScale;
    public Vector3D groupRotation;

    private String  TAG="Display3DParticle";
    public Display3DParticle()
    {
        super(null);

        this._time=0;
    }
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
    public void updateTime(float t)
    {

    }
    public void update()
    {

        if (this.visible&& this.data!=null&&this.scene3d!=null){
            if( this.data.materialParam!=null){
                Context3D ctx=this.scene3d.context3D;

                this.updateMatrix();
                this.setMaterialVc();
                this.setMaterialTexture();
                this.setVc();
                this.setVa();
                this.resetVa();

            }
        }else
        {
            Log.d(TAG, "upframe: ");
        }

    }
    public void  setViewCamModeMatr3d()
    {

    }
    public void  setMaterialTexture()
    {

    }
    public void  reset()
    {

    }
    public void  setVa()
    {

    }
    public void  setVc()
    {

    }
    public void  resetVa()
    {

    }
    public void  setMaterialVc()
    {

    }


}
