package z3d.display.particle;

import android.opengl.GLES20;
import android.util.Log;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.nio.FloatBuffer;
import java.util.List;

import z3d.base.Camera3D;
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

    public Matrix3D  modelMatrix;
    public boolean isInGroup ;
    public Vector3D groupPos;
    public Vector3D groupScale;
    public Vector3D groupRotation;
    public Matrix3D rotationMatrix3D;

    private String  TAG="Display3DParticle";


    public Display3DParticle()
    {
        super(null);

        this.modeMatrix=new Matrix3D();
        this.rotationMatrix3D=new Matrix3D();
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
        float tempScale=0.1f;
        this.posMatrix3d.prependScale(
                this.scaleX * tempScale * this.bindScale.x * this.data.overAllScale,
                this.scaleY * tempScale * this.bindScale.y * this.data.overAllScale,
                this.scaleZ * tempScale * this.bindScale.z * this.data.overAllScale
        );

        this.timeline.updateMatrix(this.posMatrix3d, this);
    }
    public void update()
    {
        if (this.visible&& this.data!=null&&this.scene3d!=null){
            if( this.data.materialParam!=null &&this.data.materialParam.shader3D!=null){
                this.shader3D=this.data.materialParam.shader3D;
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
    /*
 设置基础透视，镜头，模型矩阵
 */
    public void  setViewCamModeMatr3d()
    {
        Camera3D cam3d= this.scene3d.camera3D;
        Context3D ctx=this.scene3d.context3D;
        ctx.setVcMatrix4fv(this.shader3D,Shader3D.viewMatrix,cam3d.viewMatrix.m);
        ctx.setVcMatrix4fv(this.shader3D,Shader3D.camMatrix,cam3d.camMatrix3D.m);
        ctx.setVcMatrix4fv(this.shader3D,Shader3D.modeMatrix,this.modeMatrix.m);
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
        this.timeline.reset();
        this.updateTime(0);


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
    public void  updateMatrix()
    {
        if (this.bindMatrix==null){
            return;
        }
        this.modeMatrix.identity();
        this.modeMatrix.append(this.posMatrix3d);
        this.modeMatrix.append(this.bindMatrix);
        this.rotationMatrix3D.identity();
        this.rotationMatrix3D.appendRotation(rotationX,Vector3D.X_AXIS);
        this.rotationMatrix3D.appendRotation(rotationY,Vector3D.Y_AXIS);
        this.rotationMatrix3D.appendRotation(rotationZ,Vector3D.Z_AXIS);
        this.modeMatrix.appendTranslation(this.bindVecter3d.x,this.bindVecter3d.y,this.bindVecter3d.z);
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
//        Log.d(TAG, fcData.get(0)+" "+fcData.get(1)+" "+fcData.get(2)+" "+fcData.get(3));
        ctx.setVc4fv(this.shader3D,"fc",fcNum, fcData.verBuff);

    }


}
