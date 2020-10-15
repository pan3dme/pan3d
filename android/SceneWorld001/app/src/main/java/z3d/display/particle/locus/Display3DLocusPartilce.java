package z3d.display.particle.locus;


import android.graphics.Bitmap;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.Camera3D;
import z3d.base.ObjData;
import z3d.base.TexTuresBackFun;
import z3d.core.Context3D;

import z3d.display.particle.Display3DParticle;
import z3d.filemodel.TextureLoad;
import z3d.filemodel.TextureManager;
import z3d.material.DynamicTexItem;
import z3d.material.TexItem;
import z3d.material.TextureRes;
import z3d.program.ProgrmaManager;
import z3d.program.Shader3D;
import z3d.units.ColorTransition;
import z3d.units.LoadBackFun;
import z3d.units.LoadManager;
import z3d.units.TimeUtil;
import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;

public class Display3DLocusPartilce extends Display3DParticle {

    private  static  String TAG="Display3DLocusPartilce->";

    public ParticleLocusData locusdata(){
        return (ParticleLocusData)this.data;
    }
    private ObjData particleGpuObjData()
    {
        return this.locusdata().objData;
    }

    @Override
    public void update() {
        if( this.shader3D==null){
            ProgrmaManager.getInstance().registe(Display3DLocusShader.shaderNameStr,new Display3DLocusShader());
            this.shader3D=ProgrmaManager.getInstance().getProgram(Display3DLocusShader.shaderNameStr);
        }
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
        super.setVc();
        this.modeMatrix=new Matrix3D();
        this.modeMatrix.appendScale(0.1f,0.1f,0.1f);
        Camera3D cam3d= this.scene3d.camera3D;
        Context3D ctx=this.scene3d.context3D;
        ctx.setProgame(this.shader3D.program);
        ctx.setVcMatrix4fv(this.shader3D,Shader3D.viewMatrix,cam3d.viewMatrix.m);
        ctx.setVcMatrix4fv(this.shader3D,Shader3D.camMatrix,cam3d.camMatrix3D.m);
        ctx.setVcMatrix4fv(this.shader3D,Shader3D.modeMatrix,this.modeMatrix.m);
        Vector3D _resultUvVec= this.locusdata()._resultUvVec;
        ctx.setVcUniform4f(this.shader3D,"vcmat30",_resultUvVec.x,_resultUvVec.y,_resultUvVec.z,_resultUvVec.w);
        if(this.data._watchEye){
            ctx.setVcUniform4f(this.shader3D,"v3CamPos",cam3d.x,cam3d.y,cam3d.z,cam3d.w);

        }

    }
    TextureRes oneTextureRes;
    TextureRes twoTextureRes;
    private void  _makeTestTexture()
    {

        TextureManager.getInstance().getTexture("https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/base/xiezi.jpg", new TexTuresBackFun() {
            @Override
            public void Bfun(TextureRes value) {
                oneTextureRes =value;
            }
        });


    }

}
