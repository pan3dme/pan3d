package z3d.res;

import android.util.Log;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.ByteArray;
import z3d.base.CallBackFun;
import z3d.base.ResGC;
import z3d.base.SkillBackFun;
import z3d.vo.DataObjTempVo;
import z3d.vo.ShockAryVo;
import z3d.vo.Vector3D;

public class SkillRes extends BaseRes {

    public String skillUrl;

    private SkillBackFun backFun;
    public int meshBatchNum;
    public HashMap data;

    public void  loadComplete(byte[] buff, SkillBackFun bfun)
    {
this.backFun=bfun;
        this._byte =new ByteArray(buff);
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

        Log.d("TAG", "readNext: ");
        this.data = this.readData(this._byte);

        this.backFun.Bfun(this);
    }
    private HashMap readData(ByteArray $byte) {
        int len = $byte.readInt();
        HashMap byteData = new HashMap<>();

        for (int i = 0; i < len; i++) {
            HashMap $obj = new HashMap<>();
            String $name  = $byte.readUTF();
            String $action = $byte.readUTF();
            $obj.put("skillname",$name) ;
            $obj.put("action",$action) ;
            $obj.put("type",(int)$byte.readFloat()) ;

            if (this.version >= 26) {

                $obj.put("blood",$byte.readInt()) ;
                if ((int)$obj.get("blood") == 0) {
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
                    $obj.put("sound","timesoundName");
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
                    $obj.put("shock",shockAry);
                }
            }
            // $obj.data=JSON.parse($byte.readUTF())

            $obj.put("data" , new ArrayList<>());
            int dLen = $byte.readInt();
            for (int j = 0; j < dLen; j++) {
                DataObjTempVo dataObj = new DataObjTempVo();
                dataObj.url = $byte.readUTF();
                dataObj.frame = $byte.readFloat();




                switch ( (int)($obj.get("type"))) {
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
                        dataObj.multype = $byte.readFloat();
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



                ((List) $obj.get("data") ).add(dataObj);
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

}
