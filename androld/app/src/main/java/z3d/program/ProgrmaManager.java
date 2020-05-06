package z3d.program;

import android.content.Context;

import java.util.HashMap;

import z3d.base.ResGC;
import z3d.display.particle.CombineParticleData;

public class ProgrmaManager extends  ResGC {



    private static ProgrmaManager _instance;

    public static ProgrmaManager getInstance() {
        if (ProgrmaManager._instance==null) {
            ProgrmaManager._instance = new ProgrmaManager();
        }
        return ProgrmaManager._instance;
    }
    public ProgrmaManager( ){
       super();
    }

    public   void  registe(String name,Shader3D shader3d)
    {

        if (!this.dic.containsKey(name)) {
            shader3d.encode();
             this.dic.put(name,shader3d);
        }


    }
    public   Shader3D getProgram(String name)
    {
        if (this.dic.containsKey(name)) {
           return (Shader3D)this.dic.get(name);
        }

        return null;
    }
}
