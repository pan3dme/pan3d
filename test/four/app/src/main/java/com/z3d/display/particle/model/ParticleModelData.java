package com.z3d.display.particle.model;

import com.z3d.base.ByteArray;
import com.z3d.base.ObjData;
import com.z3d.display.particle.Display3DParticle;
import com.z3d.display.particle.ParticleData;
import com.z3d.res.BaseRes;
import com.z3d.scene.Scene3D;

import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;

public class ParticleModelData extends ParticleData {
    public float _maxAnimTime;
    public  ParticleModelData(Scene3D val  ){
        super(val);
    }
    public void setAllByteInfo(ByteArray $byte) {
        this.objData = new ObjData(scene3D);
        this._maxAnimTime = $byte.readFloat();
        int vLen = $byte.getInt();
        int dataWidth = 5;
        int len = vLen * dataWidth * 4;

        byte[] arybuff = new byte[(int)len] ;
        ByteBuffer data=ByteBuffer.wrap(arybuff);

        this.objData.verticeslist=   BaseRes.readBytes2ArrayBuffer($byte, data, 3, 0, dataWidth, 4);//vertices
        this.objData.uvlist=    BaseRes.readBytes2ArrayBuffer($byte, data, 2, 3, dataWidth, 4);//uv

        int iLen = $byte.readInt();
        this.objData.indexs=new ArrayList<>();
        for (int k = 0; k < iLen; k++) {
            this.objData.indexs.add((short)$byte.readInt());
        }
        this.objData.stride = dataWidth * 4;
        if (this.version >= 36) {
           $byte.readInt();//新加模型特效深度信息
        }
        super.setAllByteInfo($byte);
        this.uploadGpu();
    }

    private void uploadGpu() {
        this.objData.vertexBuffer= this.objData.upGpuvertexBuffer(this.objData.verticeslist);
        this.objData.uvBuffer= this.objData.upGpuvertexBuffer(this.objData.uvlist);
        this.objData.indexBuffer= this.objData.upGpuIndexBuffer(this.objData.indexs);
        this.objData.treNum=this.objData.indexs.size();

    }
    @Override
    public Display3DParticle getParticle() {
        return  new Display3DModelPartilce();
    }
    @Override
    protected void regShader() {
        super.regShader();
        if (this.materialParam==null) {
            return;
        }
        List<Boolean> shaderParameAry =this.getShaderParam();
        this.materialParam.shader3D=   this.scene3D.progrmaManager.getMaterialProgram(Display3DModelShader.shaderNameStr,new Display3DModelShader(scene3D),this.materialParam.material,shaderParameAry,false);

    }

    private List<Boolean> getShaderParam() {
        List<Boolean> shaderParameAry=new ArrayList<>();
        shaderParameAry.add(true );
        shaderParameAry.add(true );
        shaderParameAry.add(true );
        shaderParameAry.add(true );
        return shaderParameAry;

    }

}
