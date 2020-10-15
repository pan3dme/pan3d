package z3d.program;

import android.content.Context;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.List;

import z3d.base.ResGC;
import z3d.display.particle.CombineParticleData;
import z3d.material.Material;

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
    public Shader3D getMaterialProgram(String key, Shader3D shaderCls, Material material, List<Boolean> paramAry,Boolean parmaByFragmet)
    {
        String keyStr =key+material.url;
        if (paramAry!=null) {
            for (int i = 0; i < paramAry.size(); i++) {
                keyStr += "_" + paramAry.get(i);
            }
            if (parmaByFragmet) {
                keyStr += "true_";
            } else {
                keyStr += "false_";
            }
        }
        if (this.dic.containsKey(keyStr)) {
            return (Shader3D)this.dic.get(keyStr);
        }
        if (parmaByFragmet) {
            paramAry= new ArrayList<Boolean>(Arrays.asList((Boolean)material.usePbr,(Boolean) material.useNormal,(Boolean) material.hasFresnel,
                    (Boolean)material.useDynamicIBL, (Boolean)material.lightProbe, (Boolean)material.directLight,
                    (Boolean)  material.noLight,  material.fogMode==1));

        }
        Shader3D  shader=shaderCls;
        shader.paramAry = paramAry;
        shader.fragment = material.shaderStr;
        shader.encode();
        this.dic.put(keyStr,shader);
        return shader;

    }
}
