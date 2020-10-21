package z3d.display.particle;
import android.util.Log;
import java.util.ArrayList;
import java.util.List;
import z3d.base.ByteArray;
import z3d.base.Scene_data;
import z3d.display.particle.ball.Display3DBallPartilce;
import z3d.display.particle.ball.ParticleBallData;
import z3d.display.particle.facet.Display3DFacetParticle;
import z3d.display.particle.facet.ParticleFacetData;
import z3d.display.particle.locus.ParticleLocusData;
import z3d.display.particle.locusball.ParticleLocusballData;
import z3d.display.particle.model.ParticleModelData;
import z3d.engine.ResCount;

public class CombineParticleData extends ResCount {

    public  float maxTime;
    public  List<ParticleData> dataAry;
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
                pdata=new ParticleFacetData();
                break;
            case 3:
                pdata=new ParticleLocusData();
                break;
            case 4:
            {
                pdata = new ParticleModelData();
                break;
            }
            case 7:
            {
                pdata = new ParticleModelData();
                break;
            }
            case 9:
            {
                pdata = new ParticleModelData();
                break;
            }
            case 14:
            {
                pdata = new ParticleLocusballData();
                break;
            }
            case 18:
            {
                pdata = new ParticleBallData();
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
            if (display instanceof Display3DFacetParticle ) {

            }
            particle.addPrticleItem(display);

        }
        particle.sourceData = this;
        return particle;
    }

}
