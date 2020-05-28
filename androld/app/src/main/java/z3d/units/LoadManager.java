package z3d.units;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class LoadManager {

    public static String  BYTE_TYPE="BYTE_TYPE";
    public static String  IMG_TYPE="IMG_TYPE";
    public static String  XML_TYPE="XML_TYPE";


    private static LoadManager _instance;

    public static LoadManager getInstance()  {
        if (LoadManager._instance==null) {
            LoadManager._instance = new LoadManager();
        }
        return LoadManager._instance;
    }
    public List<LoaderThread> loadThreadList;
    public List<LoadInfo> waitLoadList;
    public LoadManager()
    {
        this.loadThreadList=new ArrayList<>();
        this.waitLoadList=new ArrayList<>();
        for (int i = 0; i < 10; i++) {
            this.loadThreadList.add(new LoaderThread());
        }
    }

    public void loadUrl(String url,String typestr,  LoadBackFun backFun, Object info)
    {
        LoadInfo loadInfo = new LoadInfo();
        loadInfo.url=url;
        loadInfo.type=typestr;
        loadInfo.fun=backFun;
        loadInfo.info=info;
        for (int i = 0; i < this.loadThreadList.size(); i++) {
            if (this.loadThreadList.get(i).idle) {
                this.loadThreadList.get(i).load(loadInfo);
                return;
            }
        }

        this.waitLoadList.add(loadInfo);


    }
    public void loadWaitList()
    {
        if (this.waitLoadList.size() <= 0) {
            return;
        }
        for (int i = 0; i < this.loadThreadList.size(); i++) {
            if (this.loadThreadList.get(i).idle) {
                this.loadThreadList.get(i).load(  this.waitLoadList.remove(this.waitLoadList.size()-1));
                return;
            }
        }

    }
}
