package z3d.display.particle.locus;

import android.util.Log;

import scene.dis.TwoTextureShader;
import scene.dis.TwoTextureSprite;
import z3d.base.ObjData;
import z3d.core.Context3D;
import z3d.display.basedis.DisplayTestShader;
import z3d.display.basedis.DisplayTestSprite;
import z3d.display.particle.Display3DParticle;
import z3d.program.ProgrmaManager;
import z3d.units.TimeUtil;
import z3d.vo.Matrix3D;

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




       super.update();
    }

    public void creatData() {
        this.data = new ParticleLocusData();


    }
    DisplayTestSprite _twoTextureSprite;
    @Override
    public void setVa() {
        Context3D ctx=this.scene3d.context3D;
        ObjData temp=  this.particleGpuObjData();
        if(this._twoTextureSprite==null){
            _twoTextureSprite=new DisplayTestSprite(null);
        }
        if( this.shader3D==null){
            ProgrmaManager.getInstance().registe(Display3DLocusShader.Display3DLocusShader,new Display3DLocusShader());
            this.shader3D=ProgrmaManager.getInstance().getProgram(Display3DLocusShader.Display3DLocusShader);
        }
        ctx.setProgame(this.shader3D.program);
        ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D",this.scene3d.camera3D.modelMatrix.m);
        this.modeMatrix=new Matrix3D();
        ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);
        ctx.setVa(this.shader3D,"vPosition",3,_twoTextureSprite.objData.vertexBuffer);
        ctx.setVa(this.shader3D,"vTextCoord",2,_twoTextureSprite.objData.uvBuffer);
        ctx.drawCall(_twoTextureSprite.objData.indexBuffer,_twoTextureSprite.objData.treNum);

//        Log.d(TAG, TimeUtil.getTimer()+"setVa: "+temp.verticeslist);
//        Log.d(TAG, TimeUtil.getTimer()+"setVa: "+temp.vertexBuffer);

//        ctx.setVa(this.shader3D,"v3Position",3,_twoTextureSprite.objData.vertexBuffer);
//        ctx.setVa(this.shader3D,"v2TexCoord",2,_twoTextureSprite.objData.uvBuffer);
//        ctx.setVa(this.shader3D,"v2TexCoord",2,temp.uvBuffer);
//        ctx.setVa(this.shader3D,"v3Normal",4,temp.normalsBuffer);
//        ctx.drawCall(temp.indexBuffer,temp.treNum);

//        Log.d(TAG, TimeUtil.getTimer()+"setVa: "+temp.treNum);

        /*


    }

    @Override
    public void setVc() {
        super.setVc();
        /*
        Context3D ctx=this.scene3d.context3D;
        ctx.setProgame(this.shader3D.program);

        ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D",this.scene3d.camera3D.modelMatrix.m);
        this.modeMatrix=new Matrix3D();
        ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);

        */

    }


}
