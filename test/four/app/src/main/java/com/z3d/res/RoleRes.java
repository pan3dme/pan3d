package com.z3d.res;

import android.util.Log;

import com.z3d.base.ByteArray;
import com.z3d.base.CallBackFun;
import com.z3d.scene.Scene3D;
import com.z3d.units.LoadBackFun;
import com.z3d.units.LoadManager;
import com.z3d.vo.Vector3D;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

public class RoleRes extends BaseRes {
    public String roleUrl;
    public List<String> actionAry ;
    public int meshBatchNum;
    public Vector3D ambientLightColor;
    public float ambientLightIntensity;
    public Vector3D sunLigthColor;
    public float sunLigthIntensity;
    public Vector3D nrmDircet;
    private  static String TAG="ResManager";
    public CallBackFun callBackFun;

    public  RoleRes(Scene3D val  ){
        super(val);

    }
    public void load(String url,  CallBackFun backFun)
    {
        callBackFun=backFun;
        RoleRes that=this;
        scene3D.loadManager.loadUrl(url, LoadManager.BYTE_TYPE, new LoadBackFun() {
            @Override
            public void bfun(HashMap dic) {
                if(dic!=null){
                    ByteArray temp=(ByteArray)dic.get("byte");
                    _byte=temp;

                    scene3D.resManager.addWaitRoleResBy(that);
                }else{
                    Log.d(TAG, "bfun: 角色地址错误");
                }
            }
        },null);
    }

    public void  loadComplete(  CallBackFun bfun)
    {
        _byte.buffer.position(0);
        version =  _byte.readInt();
        readMesh();
        readAction();
        read(new CallBackFun() {
            @Override
            public void StateChange(boolean State) {
                readNext(bfun);
            }
        });;//readimg
    }
    private void   readNext(CallBackFun bfun) {
        read();
        read();
        Log.d("readNext ->",   version+"===> " );
        bfun.StateChange(true);
    }
    public void readMesh() {
        roleUrl = _byte.readUTF();
        if (version >= 16) { //环境参数
            ambientLightColor = new Vector3D();
            sunLigthColor = new Vector3D();
            nrmDircet = new Vector3D();

            ambientLightColor.x = _byte.readFloat();
            ambientLightColor.y = _byte.readFloat();
            ambientLightColor.z = _byte.readFloat();
            ambientLightIntensity = _byte.readFloat();
            ambientLightColor.scaleBy(ambientLightIntensity);

            sunLigthColor.x = _byte.readFloat();
            sunLigthColor.y = _byte.readFloat();
            sunLigthColor.z = _byte.readFloat();
            sunLigthIntensity = _byte.readFloat();
            sunLigthColor.scaleBy(sunLigthIntensity);

            nrmDircet.x = _byte.readFloat();
            nrmDircet.y = _byte.readFloat();
            nrmDircet.z = _byte.readFloat();
        }
         scene3D.meshDataManager.readData(_byte, meshBatchNum, roleUrl, version);

    }
    private void readAction() {
        ByteArray $actionByte;
        if (version >= 30) {
            $actionByte = getZipByte(_byte);
        } else {
            $actionByte = _byte;
        }
        actionAry = new ArrayList<>();
        int actionNum = $actionByte.readInt();
        for (int i = 0; i < actionNum; i++) {
            String actionName = $actionByte.readUTF();
            Log.d(actionName, "actionName: ");
            scene3D.animManager.readData($actionByte, roleUrl + actionName);
            actionAry.add(actionName);
        }


    }

}
