package com.pan3d.display.particle.bone;

import android.util.Log;

import com.pan3d.base.MeshData;
import com.pan3d.base.ObjData;
import com.pan3d.core.Context3D;
import com.pan3d.display.line.LineDisplayShader;
import com.pan3d.display.particle.Display3DParticle;
import com.pan3d.program.Shader3D;
import com.pan3d.scene.Scene3D;
import com.pan3d.vo.AnimData;
import com.pan3d.vo.DualQuatFloat32Array;
import com.pan3d.vo.Matrix3D;

import java.util.List;

public class Display3DBonePartilce extends Display3DParticle {
    private static final String TAG ="Display3DBonePartilce" ;

    private  int skipnum=0;
    public Display3DBonePartilce(Scene3D val) {
        super(val);
//        scene3D.progrmaManager.registe(Display3DBoneShader.shaderNameStr,new Display3DBoneShader(scene3D));
//        this.shader3D= scene3D.progrmaManager.getProgram(Display3DBoneShader.shaderNameStr);
    }

    @Override
    public void update() {
//        super.update();
        this.shader3D=this.data.materialParam.shader3D;
        Context3D ctx= scene3D.context3D;
        ctx.setProgame(this.shader3D.program);
        this.updateMatrix();
        this.setVc();
        this.setVa();
    }


    @Override
    public void setVa() {
        super.setVa();
        Context3D ctx= scene3D.context3D;
        MeshData mesh= this.particleBoneData().meshData;
        mesh.upToGup();
        ctx.setVa(this.shader3D,"pos",3,mesh.vertexBuffer);
        ctx.setVa(this.shader3D,"v2Uv",2,mesh.uvBuffer);
        ctx.setVa(this.shader3D,"boneID",4,mesh.boneIdBuffer);
        ctx.setVa(this.shader3D,"boneWeight",4,mesh.boneWeightBuffer);
        ctx.drawCall(mesh.indexBuffer,mesh.treNum);

        Log.d(TAG, "setVa: "+mesh.treNum);


    }
    @Override
    public void setVc() {
        super.setVc();
        Context3D ctx= scene3D.context3D;
        ctx.setVcMatrix4fv(this.shader3D, "vpMatrix3D", scene3D.camera3D.modelMatrix.m);
        ctx.setVcMatrix4fv(this.shader3D, "modeMatrix",this.modeMatrix.m);
        AnimData anim= this.particleBoneData().animData;
        List<DualQuatFloat32Array>  arr=anim.boneQPAry.get(0);
        this.skipnum++;
        if(this.skipnum>=arr.size()){
            this.skipnum=0;
        }

        DualQuatFloat32Array dualQuatFrame =arr.get( this.skipnum);
        dualQuatFrame.upToGpu();
        ctx.setVc4fv(this.shader3D,"boneQ",54, dualQuatFrame.boneQarrrBuff);
        ctx.setVc3fv(this.shader3D,"boneD",54, dualQuatFrame.boneDarrBuff);

    }
    private ParticleBoneData particleBoneData()
    {
        return (ParticleBoneData)this.data;
    }

}
