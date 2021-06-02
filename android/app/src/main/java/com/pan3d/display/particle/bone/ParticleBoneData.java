package com.pan3d.display.particle.bone;

import com.pan3d.base.ByteArray;
import com.pan3d.base.MeshData;
import com.pan3d.display.particle.Display3DParticle;
import com.pan3d.display.particle.ParticleData;

import com.pan3d.res.BaseRes;
import com.pan3d.scene.Scene3D;
import com.pan3d.vo.AnimData;
import com.pan3d.vo.DualQuatFloat32Array;


import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;

public class ParticleBoneData extends ParticleData {
    public MeshData meshData;
    public AnimData animData;
    public float objScale;
    public  ParticleBoneData(Scene3D val  ){
        super(val);
    }

    @Override
    public Display3DParticle getParticle() {
        return  new Display3DBonePartilce(this.scene3D);
    }

    public void setAllByteInfo(ByteArray $byte) {
        this.meshData = new MeshData(this.scene3D);
        this.meshData.indexs=new ArrayList<>();

        this.animData = new AnimData();
        this.objScale = $byte.readFloat();



        int dataWidth = 13;
        int len = $byte.getInt();
        len *= dataWidth * 4;

        byte[] arybuff = new byte[(int)len] ;
        ByteBuffer data=ByteBuffer.wrap(arybuff);

        this.meshData.verticeslist=   BaseRes.readBytes2ArrayBuffer($byte, data, 3, 0, dataWidth, 0);
        this.meshData.uvlist=    BaseRes.readBytes2ArrayBuffer($byte, data, 2, 3, dataWidth, 0);
        BaseRes.readIntForTwoByte($byte,  this.meshData.indexs);
        this.meshData.boneIDAry=   BaseRes.readBytes2ArrayBuffer($byte, data, 4, 5, dataWidth, 2);
        this.meshData.boneWeightAry=    BaseRes.readBytes2ArrayBuffer($byte, data, 4, 6, dataWidth, 3);
        this.meshData.stride = dataWidth * 4;

        this.readFrameQua($byte);
        super.setAllByteInfo($byte);

        this.initVcData();
        this.uploadGpu(this.meshData);
    }
    private void uploadGpu(MeshData val) {
        val.vertexBuffer= val.upGpuvertexBuffer(val.verticeslist);
        val.uvBuffer=val.upGpuvertexBuffer(val.uvlist);
        val.boneIdBuffer=val.upGpuvertexBuffer(val.boneIDAry);
        val.boneWeightBuffer=val.upGpuvertexBuffer(val.boneWeightAry);
        val.indexBuffer= val.upGpuIndexBuffer(val.indexs);
        val.treNum=val.indexs.size();
    }
    public void initVcData() {
//        this.vcmatData = new Float32Array(Display3DBoneShader.getVcSize() * 16);
    }
    private void readFrameQua(ByteArray $byte)    {
        float tempNum  = $byte.readFloat();
        float RGB32767 = 32767;
        int frameNum = $byte.readInt();
        List<DualQuatFloat32Array> $frameDualQuat = new ArrayList<>();
        for (int i = 0; i < frameNum; i++) {
            int $len = $byte.readInt();
            float quat[]=new float[$len * 4];
            float pos[]=new float[$len* 3];
            for (int j = 0; j < $len; j++) {
                quat[j * 4 + 0] = $byte.readShort() / RGB32767;
                quat[j * 4 + 1] = $byte.readShort() / RGB32767;
                quat[j * 4 + 2] = $byte.readShort() / RGB32767;
                quat[j * 4 + 3] = $byte.readShort() / RGB32767;

                pos[j * 3 + 0] = $byte.readShort() / RGB32767 * tempNum;
                pos[j * 3 + 1] = $byte.readShort() / RGB32767 * tempNum;
                pos[j * 3 + 2] = $byte.readShort() / RGB32767 * tempNum;
            }
            DualQuatFloat32Array $tempDq = new DualQuatFloat32Array();
            $tempDq.quatArr=new ArrayList<>();
            $tempDq.posArr=new ArrayList<>();
            for(int m=0;m<quat.length;m++){
                $tempDq.quatArr.add(quat[m]);
            }
            for(int n=0;n<pos.length;n++){
                $tempDq.posArr.add(pos[n]);
            }
            $frameDualQuat.add($tempDq);
        }
        this.animData.boneQPAry = new ArrayList<>();
        this.animData.boneQPAry.add($frameDualQuat);
    }
    @Override
    protected void regShader() {

        if (this.materialParam==null) {
            return;
        }
        List<Boolean>  shaderParameAry =this.getShaderParam();
        this.materialParam.shader3D=    scene3D.progrmaManager.getMaterialProgram(Display3DBoneShader.shaderNameStr,new Display3DBoneShader(scene3D),this.materialParam.material,shaderParameAry,false);
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
