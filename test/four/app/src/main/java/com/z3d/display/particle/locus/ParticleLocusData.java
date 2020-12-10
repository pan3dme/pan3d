package com.z3d.display.particle.locus;

import com.z3d.base.ByteArray;
import com.z3d.base.ObjData;
import com.z3d.display.particle.Display3DParticle;
import com.z3d.display.particle.ParticleData;
import com.z3d.res.BaseRes;
import com.z3d.scene.Scene3D;
import com.z3d.vo.Float32Array;
import com.z3d.vo.Vector3D;

import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;

public class ParticleLocusData extends ParticleData {

    public float _speed;
    public boolean _isLoop;
    public float _density;
    public boolean _isEnd;
    public Vector3D _resultUvVec;
    public Vector3D _caramPosVec;
    public boolean _changUv;
    public Vector3D _uvVec;
    public Float32Array vcmatData;
    public  ParticleLocusData(Scene3D val  ){
        super(val);
    }
    public void setAllByteInfo(ByteArray $byte) {

        this._isLoop = $byte.readBoolean() ; //b
        this._speed = $byte.readFloat(); //f
        this._density = $byte.readFloat(); //f
        this._isEnd = $byte.readBoolean(); //b

        this.objData = new ObjData(scene3D);

        int vLen = $byte.getInt();
        int dataWidth = 9;
        int len = vLen * dataWidth * 4;

        byte[] arybuff = new byte[(int)len] ;
        ByteBuffer data=ByteBuffer.wrap(arybuff);




        this.objData.verticeslist=   BaseRes.readBytes2ArrayBuffer($byte, data, 3, 0, dataWidth, 4);//vertices
        this.objData.normals=   BaseRes.readBytes2ArrayBuffer($byte, data, 4, 0, dataWidth, 4);//vertices
        this.objData.uvlist=   BaseRes.readBytes2ArrayBuffer($byte, data, 2, 0, dataWidth, 4);//vertices

        int iLen = $byte.readInt();
        this.objData.indexs=new ArrayList<>();
        for (int k = 0; k < iLen; k++) {
            this.objData.indexs.add((short)$byte.readInt());
        }

        this.objData.stride = dataWidth * 4;


        super.setAllByteInfo($byte);

        this.initUV();

        if (this._watchEye) {
            this._caramPosVec = new Vector3D(0, 0, 0);
        }

        this._uvVec = new Vector3D(this._isU ? -1 : 1, this._isV ? -1 : 1, this._isUV ? 1 : -1);

        this.initVcData();

        this.uploadGpu();

    }
    private void uploadGpu() {

        this.objData.vertexBuffer= this.objData.upGpuvertexBuffer(this.objData.verticeslist);
        this.objData.normalsBuffer= this.objData.upGpuvertexBuffer(this.objData.normals);
        this.objData.uvBuffer= this.objData.upGpuvertexBuffer(this.objData.uvlist);
        this.objData.indexBuffer= this.objData.upGpuIndexBuffer(this.objData.indexs);

        this.objData.treNum=this.objData.indexs.size();

    }

    @Override
    protected void regShader() {

        if (this.materialParam==null) {
            return;
        }
        this.getShaderParam();
        List<Boolean>  shaderParameAry =this.getShaderParam();
        this.materialParam.shader3D=   this.scene3D.progrmaManager.getMaterialProgram(Display3DLocusShader.shaderNameStr,new Display3DLocusShader(scene3D),this.materialParam.material,shaderParameAry,false);
    }

    private List<Boolean>  getShaderParam() {
        boolean isWatchEye = this._watchEye ?true : false;
        boolean changeUv = false;
        boolean hasParticleColor = this.materialParam.material.hasParticleColor ?true :false;
        if (this._isU || this._isV || this._isUV) {
            changeUv = true;
            this._changUv = true;
        } else {
            this._changUv = false;
        }
        List<Boolean> shaderParameAry=new ArrayList<>();
        shaderParameAry.add(isWatchEye );
        shaderParameAry.add( changeUv);
        shaderParameAry.add(hasParticleColor);
        return shaderParameAry;
    }

    public void initVcData() {
        this.vcmatData = new Float32Array(Display3DLocusShader.getVcSize());

    }

    @Override
    public Display3DParticle getParticle() {
        return new Display3DLocusPartilce();
    }

    public void initUV() {
        this._resultUvVec = new Vector3D(0,0,0);

        float $nowTime = 0;
        float $lifeRoundNum = (this._life / 100);
        float $moveUv = this._speed * $nowTime / this._density / 10;
        if (this._isEnd) {
            $moveUv = Math.min(1, $moveUv);
        }
        Vector3D $fcVector;
        if (this._isLoop) {
            if (this._life>0) {
                $moveUv = $moveUv % ($lifeRoundNum + 1);
                $fcVector = new Vector3D($moveUv, $lifeRoundNum, -$lifeRoundNum);
            } else {
                $moveUv = $moveUv % 1;
                $fcVector = new Vector3D($moveUv + 1, 99, -2);
            }
        } else {
            if (this._life>0) {
                $fcVector = new Vector3D($moveUv, $lifeRoundNum, -1);
            } else {
                $fcVector = new Vector3D($moveUv, 99, -1);
            }
        }

        this._resultUvVec.x = $fcVector.x;
        this._resultUvVec.y = $fcVector.y;
        this._resultUvVec.z = $fcVector.z;
    }
}
