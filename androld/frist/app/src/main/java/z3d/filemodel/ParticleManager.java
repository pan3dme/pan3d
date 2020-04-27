package z3d.filemodel;

import z3d.base.ByteArray;
import z3d.base.ResGC;
import z3d.display.particle.CombineParticleData;


public class ParticleManager extends ResGC {

    private static ParticleManager _instance;
    public static ParticleManager getInstance()  {
        if (ParticleManager._instance==null) {
            ParticleManager._instance = new ParticleManager();
        }
        return ParticleManager._instance;
    }

    public void addResByte(String url, ByteArray data) {
        if (!this.dic.containsKey(url)) {
            CombineParticleData baseData   = new CombineParticleData();
            baseData.setDataByte(data);
            this.dic.put(url,baseData);
        }
    }
}
