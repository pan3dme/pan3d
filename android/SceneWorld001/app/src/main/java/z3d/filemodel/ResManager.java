package z3d.filemodel;

import android.util.Log;

import z3d.base.CallBackFun;
import z3d.base.ResGC;
import z3d.base.RoleBackFun;
import z3d.res.RoleRes;

public class ResManager extends ResGC {
    private static ResManager _instance;

    private  static String TAG="ResManager";
    public static ResManager getInstance()  {
        if (ResManager._instance==null) {
            ResManager._instance = new ResManager();
        }
        return ResManager._instance;
    }
    public void  loadRoleRes(String url, final RoleBackFun backFun , int batchNum)
    {

        Log.d(TAG, "loadRoleRes: ");

        final RoleRes roleRes = new RoleRes();
        roleRes.meshBatchNum = batchNum;

        roleRes.load(url, new CallBackFun() {
            @Override
            public void StateChange(boolean State) {
                backFun.Bfun(roleRes);
            }
        });


    }
}
