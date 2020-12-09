package com.z3d.filemodel;

import android.util.Log;

import com.z3d.base.CallBack;
import com.z3d.base.CallBackFun;
import com.z3d.base.ResGC;
import com.z3d.base.RoleBackFun;
import com.z3d.res.RoleRes;
import com.z3d.res.SkillRes;

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
    public void loadSkillRes(String $url, CallBack callBack) {
        Log.d(TAG, "loadSkillRes: ");
        SkillRes skillRes   = new SkillRes();
        skillRes.load($url,new CallBack() {
            @Override
            public void StateChange(Object val) {
                callBack.StateChange(skillRes);
            }
        });
    }
}
