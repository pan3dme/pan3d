package com.z3d.res;

import android.util.Log;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import com.z3d.base.ByteArray;
import com.z3d.base.CallBack;
import com.z3d.base.CallBackFun;
import com.z3d.units.LoadBackFun;
import com.z3d.units.LoadManager;
import com.z3d.vo.DataObjTempVo;
import com.z3d.vo.ShockAryVo;
import com.z3d.vo.Vector3D;

public class SkillRes extends BaseRes {

    private static final String TAG = "SkillRes";
    public String skillUrl;
    private CallBack bfun;
    public int meshBatchNum;
    public HashMap<String,SkillActionVo> data;
    private void  loadComplete(ByteArray $byte )
    {
        this._byte =$byte;
        this.version = this._byte.readInt();
        this.skillUrl = this._byte.readUTF();
        this.read(new CallBackFun() {
            @Override
            public void StateChange(boolean State) {
                readNext();
            }
        });;//readimg
    }
    public void readNext()
    {
        this.read();
        this.read();
        this.data = this.readData(this._byte);
        this.bfun.StateChange(this);
    }
    private HashMap<String,SkillActionVo>  readData(ByteArray $byte) {
        int len = $byte.readInt();
        HashMap<String,SkillActionVo>  byteData = new HashMap<>();
        for (int i = 0; i < len; i++) {
            SkillActionVo $obj = new SkillActionVo();
            String $name  = $byte.readUTF();
            String $action = $byte.readUTF();

            $obj.skillname=$name;
            $obj.action=$action;
            $obj.type=(int)$byte.readFloat();
            if (this.version >= 26) {
                $obj.blood=$byte.readInt() ;
                if ( $obj.blood== 0) {
                    // $obj.blood = SkillVo.defaultBloodTime;
                }
            } else {
                //$obj.blood = SkillVo.defaultBloodTime;
            }
            if (this.version >= 32) {
                int soundTime = $byte.readInt();
                if (soundTime > 0) {
                    String soundName = $byte.readUTF();
                    // $obj.sound = { time: soundTime, name: soundName };

                    $obj.sound=new HashMap<>();
                    $obj.sound.put("time",soundTime);
                    $obj.sound.put("name",soundName);
                }
            }
            if (this.version >= 33) {
                int shockLen = $byte.readInt();
                if (shockLen>0) {
                    List<ShockAryVo>  shockAry= new ArrayList<>();
                    for (int k = 0; k < shockLen; k++) {
                        ShockAryVo shobj = new ShockAryVo();
                        shobj.time = $byte.readInt();
                        shobj.lasttime = $byte.readInt();
                        shobj.amp = $byte.readFloat();
                        shockAry.add(shobj);
                    }
                    $obj.shock=shockAry;
                }
            }

            $obj.data=new ArrayList<>();
            int dLen = $byte.readInt();
            for (int j = 0; j < dLen; j++) {
                DataObjTempVo dataObj = new DataObjTempVo();
                dataObj.url = $byte.readUTF();
                dataObj.frame = $byte.readFloat();
                switch ( $obj.type) {
                    case 1:
                        dataObj.beginType = $byte.readInt();

                        if (dataObj.beginType == 0) {
                            dataObj.beginPos = new Vector3D();
                            dataObj.beginPos.x = $byte.readFloat();
                            dataObj.beginPos.y = $byte.readFloat();
                            dataObj.beginPos.z = $byte.readFloat();
                        } else if (dataObj.beginType == 1) {
                            dataObj.beginSocket = $byte.readUTF();
                        }

                        dataObj.hitSocket = $byte.readUTF();
                        dataObj.endParticle = $byte.readUTF();

                        dataObj.multype = $byte.readInt();
                        dataObj.speed = $byte.readFloat();

                        break;
                    case 3:
                        dataObj.beginSocket = $byte.readUTF();
                        dataObj.beginType = $byte.readFloat();
                        dataObj.multype = (int) $byte.readFloat();
                        dataObj.speed = $byte.readFloat();

                        break;
                    case 4:

                        if (this.version >= 27) {
                            boolean hasSocket   = $byte.readBoolean();
                            dataObj.hasSocket = hasSocket;
                            if (hasSocket) {
                                dataObj.socket = $byte.readUTF();
                            } else {
                                dataObj.pos = this.readV3d($byte);
                                dataObj.rotation = this.readV3d($byte);
                            }
                        } else {
                            dataObj.hasSocket = false;
                            dataObj.pos = this.readV3d($byte);
                            dataObj.rotation = this.readV3d($byte);
                        }


                        break;
                    default:
                        Log.d("",  "没有类型readData");
                        break;
                }

               $obj.data.add(dataObj);
            }
            byteData.put($name,$obj);
        }
        return byteData;
    }
    public Vector3D readV3d(ByteArray $byte) {
        Vector3D v3d = new Vector3D();
        v3d.x = $byte.readFloat();
        v3d.y = $byte.readFloat();
        v3d.z = $byte.readFloat();
        v3d.w = $byte.readFloat();
        return v3d;
    }

    public void load(String $url, CallBack $fun) {
        this.bfun = $fun;
        LoadManager.getInstance().loadUrl($url, LoadManager.BYTE_TYPE, new LoadBackFun() {
            @Override
            public void bfun(HashMap dic) {
                if(dic!=null){
                    ByteArray temp=(ByteArray)dic.get("byte");
                    _byte=temp;
                    loadComplete(_byte);
                }else{
                    Log.d(TAG, "bfun: 角色地址错误");
                }
            }
        },null);
    }
}
