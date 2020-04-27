package z3d.display.particle;

import java.util.ArrayList;
import java.util.List;

import z3d.base.ByteArray;
import z3d.display.particle.facet.ParticleFacetData;
import z3d.engine.ResCount;
import z3d.units.Scene_data;

public class CombineParticleData extends ResCount {


    public  int maxTime;
    public  List<ParticleData> dataAry;
    public void setDataByte(ByteArray _byte) {
        //_byte.position = 0;

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

//            if (pdata.timelineData.maxFrameNum > this.maxTime) {
//                this.maxTime = pdata.timelineData.maxFrameNum;
//            }

        }

        this.maxTime *= Scene_data.frameTime;
    }
    private ParticleData getParticleDataType(int type)
    {
        ParticleData pdata;
        switch (type){
            case 1:
                pdata=new ParticleFacetData();
                break;
            default:
                pdata=new ParticleData();
                break;
        }

        return pdata;
    }

}
