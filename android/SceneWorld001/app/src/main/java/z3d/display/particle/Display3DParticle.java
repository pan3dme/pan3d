package z3d.display.particle;

import android.opengl.GLES20;
import android.util.Log;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.util.List;

import z3d.base.Object3D;
import z3d.base.Scene_data;
import z3d.core.Context3D;
import z3d.display.Display3D;
import z3d.display.particle.ctrl.TimeLine;
import z3d.material.DynamicConstItem;
import z3d.material.DynamicTexItem;
import z3d.material.TexItem;
import z3d.program.Shader3D;
import z3d.vo.Float32Array;
import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;


public class Display3DParticle extends Display3D {

    public boolean visible;
    public TimeLine timeline;
    public Shader3D shader3D;
    public Matrix3D modeMatrix;
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


        this._time = t - this._beginTime;
        this._time += this.data._delayedTime; //加上延时
        this.timeline.updateTime(t);

        this.visible = this.timeline.visible;


        this.posMatrix3d.identity();
        this.posMatrix3d.prependScale(this.scaleX * 0.1f * this.bindScale.x * this.data.overAllScale,
                this.scaleY * 0.1f * this.bindScale.y * this.data.overAllScale,
                this.scaleZ * 0.1f * this.bindScale.z * this.data.overAllScale);

        this.timeline.updateMatrix(this.posMatrix3d, this);

    }
    public void update()
    {

        if (this.visible&& this.data!=null&&this.scene3d!=null){
            if( this.data.materialParam!=null&&this.shader3D!=null){
                Context3D ctx=this.scene3d.context3D;
                ctx.setProgame(this.shader3D.program);
                ctx.setBlendParticleFactors(this.data._alphaMode);
                ctx.cullFaceBack(this.data.materialParam.material.backCull);
                this.updateMatrix();
                this.setMaterialVc();
                this.setMaterialTexture();
                this.setVc();
                this.setVa();
                this.resetVa();

            }
        }
    }
    public void  setViewCamModeMatr3d()
    {

    }
    public void  setMaterialTexture()
    {
        Context3D ctx=this.scene3d.context3D;
        List<TexItem> texVec  = this.data.materialParam.material.texList;
        for (int i   = 0; i < texVec.size(); i++) {
            TexItem texItem=texVec.get(i);
            if (texItem.isDynamic) {
                continue;
            }
            ctx.setRenderTexture(this.shader3D,texItem.name,texItem.textureRes.textTureInt,texItem.get_id());
        }
        List<DynamicTexItem>  texDynamicVec  = this.data.materialParam.dynamicTexList;
        for (int i   = 0; i < texDynamicVec.size(); i++) {
            DynamicTexItem dynamicTexItem=  texDynamicVec.get(i);
          TexItem texItem=dynamicTexItem.target;
          if(dynamicTexItem.hasTextureRes()){
              ctx.setRenderTexture(this.shader3D,texItem.name,dynamicTexItem.getTexture(),texItem.get_id());
          }


        }
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

        if (this.data.materialParam==null) {
            return;
        }
        List<DynamicConstItem> dynamicConstList= this.data.materialParam.dynamicConstList;

        float t= Math.floorMod ((long) this._time , (long) (Scene_data.frameTime * this.data._life));
        for (int i = 0; i < dynamicConstList.size(); i++) {
        dynamicConstList.get(i).update(t);
        }
        if(this.data.materialParam.material.fcNum <= 0){
            return;
        }
        t = t * this.data.materialParam.material.timeSpeed;
        this.data.materialParam.material.update(t);
        Float32Array fcData= this.data.materialParam.material.fcData;
        Context3D ctx=this.scene3d.context3D;
        int fcNum=this.data.materialParam.material.fcNum;
        fcData.put(0,0.0f);
        fcData.put(1,1.0f);
        fcData.put(2,0.0f);
        fcData.put(3,0.2f);
        ctx.setVc4fv(this.shader3D,"fc",fcNum, fcData.verBuff);


    }


}
