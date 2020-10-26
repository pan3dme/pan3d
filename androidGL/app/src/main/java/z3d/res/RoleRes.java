package z3d.res;

import android.util.Log;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.ByteArray;

import z3d.base.CallBackFun;
import z3d.base.RoleBackFun;
import z3d.filemodel.MeshDataManager;
import z3d.program.Shader3D;
import z3d.units.AnimManager;
import z3d.units.LoadBackFun;
import z3d.units.LoadManager;
import z3d.vo.Vector3D;

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
    private CallBackFun callBackFun;
    public void load(String url,  CallBackFun backFun)
    {
        callBackFun=backFun;
        RoleRes that=this;
        LoadManager.getInstance().loadUrl(url,LoadManager.BYTE_TYPE, new LoadBackFun() {
            @Override
            public void bfun(HashMap dic) {
                if(dic!=null){
                    ByteArray temp=(ByteArray)dic.get("byte");
                    _byte=temp;
                    RoleRes._waitArr.add(that);
                }else{
                    Log.d(TAG, "bfun: 角色地址错误");
                }
            }
        },null);
    }
    private static List<RoleRes> _waitArr=new ArrayList<>();
    public static void upDataRoleResWaitIng(){
        while (_waitArr.size()>0){
            RoleRes roleRes=   _waitArr.remove(0);
            roleRes.loadComplete(roleRes.callBackFun);
        }
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
        MeshDataManager.getInstance().readData(_byte, meshBatchNum, roleUrl, version);

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
            AnimManager.getInstance().readData($actionByte, roleUrl + actionName);
            actionAry.add(actionName);
        }


    }

}
