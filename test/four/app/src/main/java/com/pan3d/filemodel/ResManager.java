package com.pan3d.filemodel;

import android.util.Log;

import com.pan3d.base.CallBack;
import com.pan3d.base.CallBackFun;
import com.pan3d.base.ResGC;
import com.pan3d.base.RoleBackFun;
import com.pan3d.res.RoleRes;
import com.pan3d.res.SkillRes;
import com.pan3d.scene.Scene3D;

import java.util.ArrayList;
import java.util.List;

public class ResManager extends ResGC {

    private  static String TAG="ResManager";
    public ResManager(Scene3D val) {
        super(val);
    }
    public void  loadRoleRes(String url, final RoleBackFun backFun , int batchNum)
    {
        Log.d(TAG, "loadRoleRes: ");
        final RoleRes roleRes = new RoleRes( scene3D);
        roleRes.meshBatchNum = batchNum;
        roleRes.load(url, new CallBackFun() {
            @Override
            public void StateChange(boolean State) {
                backFun.Bfun(roleRes);
            }
        });
    }
    private   List<RoleRes> _waitRoleResArr =new ArrayList<>();
    public  void addWaitRoleResBy(RoleRes val){
        _waitRoleResArr.add(val);
    }
    public   void upDataRoleResWaitIng(){
        while (_waitRoleResArr.size()>0){
            RoleRes roleRes=   _waitRoleResArr.remove(0);
            roleRes.loadComplete(roleRes.callBackFun);
        }
    }
    public void loadSkillRes(String $url, CallBack callBack) {
        Log.d(TAG, "loadSkillRes: ");
        SkillRes skillRes   = new SkillRes( scene3D);
        skillRes.load($url,new CallBack() {
            @Override
            public void StateChange(Object val) {
                callBack.StateChange(skillRes);
            }
        });
    }
}
