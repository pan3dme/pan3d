package com.z3d.display.particle;

import android.util.Log;

import com.z3d.base.ByteArray;
import com.z3d.base.Scene_data;
import com.z3d.display.particle.ball.ParticleBallData;
import com.z3d.display.particle.facet.ParticleFacetData;
import com.z3d.display.particle.locus.ParticleLocusData;
import com.z3d.display.particle.locusball.ParticleLocusballData;
import com.z3d.display.particle.model.Display3DModelPartilce;
import com.z3d.display.particle.model.ParticleModelData;
import com.z3d.engine.ResCount;
import com.z3d.scene.Scene3D;

import java.util.ArrayList;
import java.util.List;

public class CombineParticleData extends ResCount {

    public  float maxTime;
    public  List<ParticleData> dataAry;

    public  CombineParticleData(Scene3D val  ){
  super(val);
    }
    public void setDataByte(ByteArray _byte) {
        _byte.byteBuffer.position=0;
        int version = _byte.readInt();
        int len = _byte.readInt();
        this.maxTime = 0;
        this.dataAry = new ArrayList();
        for (int i = 0; i < len; i++) {
            int particleType = _byte.readInt();
            ParticleData pdata  = this.getParticleDataType(particleType);
            pdata.version = version;
            pdata.setAllByteInfo(_byte);
            this.dataAry.add(pdata);
            if (pdata.timelineData.maxFrameNum > this.maxTime) {
                this.maxTime = pdata.timelineData.maxFrameNum;
            }
        }
        this.maxTime *= Scene_data.frameTime;
    }
    private ParticleData getParticleDataType(int type)
    {
        ParticleData pdata=null;
        switch (type){
            case 1:
                pdata=new ParticleFacetData(this.scene3d);
                break;
            case 3:
                pdata=new ParticleLocusData(this.scene3d);
                break;
            case 4:
            {
                pdata = new ParticleModelData(this.scene3d);
                break;
            }
            case 7:
            {
                pdata = new ParticleModelData(this.scene3d);
                break;
            }
            case 9:
            {
                pdata = new ParticleModelData(this.scene3d);
                break;
            }
            case 14:
            {
                pdata = new ParticleLocusballData(this.scene3d);
                break;
            }
            case 18:
            {
                pdata = new ParticleBallData(this.scene3d);
                break;
            }
            default:
                Log.d("没有对象", "getParticleDataType: ");
                break;
        }
        return pdata;
    }

    public CombineParticle getCombineParticle()
    {
        CombineParticle particle = new CombineParticle();
        particle.maxTime = this.maxTime;
        for (int i = 0; i < this.dataAry.size(); i++) {
            Display3DParticle display  = this.dataAry.get(i).creatPartilce();
            if (display instanceof Display3DModelPartilce) {

            }
            particle.addPrticleItem(display);

        }
        particle.sourceData = this;
        return particle;
    }

}
