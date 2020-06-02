package z3d.display.particle.facet;

import z3d.base.ByteArray;
import z3d.display.particle.ParticleData;

public class ParticleFacetData extends ParticleData {

    public float _maxAnimTime;
    public boolean _lockx;
    public boolean _locky;
    public boolean _isCycle;

    public void setAllByteInfo(ByteArray _byte){

        this._maxAnimTime = _byte.readFloat();
        this._isCycle = _byte.readBoolean();
        this._lockx = _byte.readBoolean();
        this._locky = _byte.readBoolean();
        super.setAllByteInfo(_byte);

    }
}
