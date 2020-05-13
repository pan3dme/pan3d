package z3d.material;

import java.util.Dictionary;
import java.util.HashMap;

import z3d.base.ByteArray;
import z3d.base.ResGC;

public class MaterialManager extends ResGC {



    public HashMap loadDic;
    public HashMap resDic;
    public HashMap regDic;

    private static MaterialManager _instance;
    public static MaterialManager getInstance()  {
        if (MaterialManager._instance==null) {
            MaterialManager._instance = new MaterialManager();
        }
        return MaterialManager._instance;
    }
    public MaterialManager( ) {

        super();
        this.loadDic=new HashMap();
        this.resDic=new HashMap();
        this.regDic=new HashMap();


    }

    public void addResByte(String url, ByteArray data) {

        if (! this.dic.containsKey(url) && ! this.resDic.containsKey(url)) {
            this.resDic.put(url,data);
        }


    }

}
