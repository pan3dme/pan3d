package com.z3d.display.particle.locus;


import com.z3d.base.Camera3D;
import com.z3d.base.ObjData;
import com.z3d.base.Scene_data;
import com.z3d.core.Context3D;
import com.z3d.display.particle.Display3DParticle;
import com.z3d.program.Shader3D;
import com.z3d.vo.Matrix3D;
import com.z3d.vo.Vector3D;

public class Display3DLocusPartilce extends Display3DParticle {

    private  static  String TAG="Display3DLocusPartilce->";

    public ParticleLocusData locusdata(){
        return (ParticleLocusData)this.data;
    }
    private ObjData particleGpuObjData()
    {
        return this.locusdata().objData;
    }
    public Display3DLocusPartilce()
    {
        super();
    }
    @Override
    public void update() {

        super.update();
    }

    @Override
    public void setVa() {
        Context3D ctx=this.scene3d.context3D;
        ObjData objData=  this.particleGpuObjData();
        ctx.setVa(this.shader3D, Shader3D.v3Position,3,objData.vertexBuffer);
        ctx.setVa(this.shader3D,Shader3D.v2TexCoord,2,objData.uvBuffer);
        ctx.setVa(this.shader3D,Shader3D.v3Normal,4,objData.normalsBuffer);
        ctx.drawCall(objData.indexBuffer,objData.treNum);

    }

    @Override
    public void setVc() {

        this.setViewCamModeMatr3d();
        this.updateUV();
        this.modeMatrix=new Matrix3D();
        Camera3D cam3d= this.scene3d.camera3D;
        Context3D ctx=this.scene3d.context3D;

        Vector3D scaleVec= this.locusdata()._resultUvVec;
        ctx.setVcUniform4f(this.shader3D,"vcmat30",scaleVec.x,scaleVec.y,scaleVec.z,scaleVec.w);
        if(this.data._watchEye){
            ctx.setVcUniform4f(this.shader3D,"v3CamPos",cam3d.x,cam3d.y,cam3d.z,cam3d.w);
        }
    }
    private void updateUV() {
        float nowTime=this._time/ Scene_data.frameTime;
        float lifeRoundNum=this.data._life / 100.0f;
        float moveUv = this.locusdata()._speed * nowTime / this.locusdata()._density / 10.0f;
        if (this.locusdata()._isEnd) {
            moveUv = Math.min(1.0f, moveUv);
        }
        if (this.locusdata()._isLoop) {
            if (this.locusdata()._life>0.0) {
                moveUv = moveUv- (float) Math.ceil(moveUv/(lifeRoundNum+1))*(lifeRoundNum+1) ;
            } else {
                moveUv = moveUv-(float) Math.ceil(moveUv/1)  ;
            }
        }
//        Log.d(TAG, "updateUV: "+moveUv);
        this.locusdata()._resultUvVec.x = moveUv;
    }
    @Override
    public void setMaterialVc() {
        super.setMaterialVc();
    }



}
