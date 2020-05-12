package z3d.filemodel;

import android.util.Log;

import com.one.R;

import java.io.InputStream;

import z3d.base.CallBackFun;
import z3d.base.GroupBackFun;
import z3d.base.ResGC;
import z3d.res.GroupRes;

public class GroupDataManager extends ResGC {
    private static GroupDataManager _instance;
    public static GroupDataManager getInstance()  {
        if (GroupDataManager._instance==null) {
            GroupDataManager._instance = new GroupDataManager();
        }
        return GroupDataManager._instance;
    }

    public void getGroupData(String url, GroupBackFun bfun)
    {

    }

}
