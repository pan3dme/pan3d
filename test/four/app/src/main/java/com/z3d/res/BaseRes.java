package com.z3d.res;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.util.Log;

import com.z3d.base.ByteArray;
import com.z3d.base.CallBackFun;
import com.z3d.base.Scene_data;
import com.z3d.engine.ResCount;
import com.z3d.scene.Scene3D;
import com.z3d.units.TimeUtil;

import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.Inflater;

public class BaseRes extends ResCount {
    public static int IMG_TYPE = 1;
    public static int OBJS_TYPE = 2;
    public static int MATERIAL_TYPE = 3;
    public static int PARTICLE_TYPE = 4;
    public static int SCENE_TYPE = 5;
    public static int ZIP_OBJS_TYPE = 6;
    public static int PREFAB_TYPE = 1;
    public static int SCENE_PARTICLE_TYPE = 11;
    protected ByteArray _byte;
    protected int imgNum;
    protected int imgLoadNum;
    private CallBackFun imgFun;

    public int version;

    public  BaseRes(Scene3D val  ){
        super(val);

    }
    public void read( ){

        this.read(null);
    }
    public void read(CallBackFun bfun){

        this.imgFun=bfun;
        int fileType   = this._byte.readInt();
        Log.d("fileType",   fileType+"" );
        if (fileType == BaseRes.IMG_TYPE) {
            this.readImg();
        } else if (fileType == BaseRes.OBJS_TYPE) {
            this.readObj(this._byte);
        } else if (fileType == BaseRes.MATERIAL_TYPE) {
            this.readMaterial();
        } else if (fileType == BaseRes.PARTICLE_TYPE) {
            this.readParticle();
        } else if (fileType == BaseRes.ZIP_OBJS_TYPE) {
            this.readZipObj();
        }else
        {
            Log.d("fileType",   "需要补充" );
        }
        if(this.imgFun!=null){
            this.imgFun.StateChange(true);
        }
    }
    private  void readMaterial()
    {
        int objNum=this._byte.readInt();
        float time = TimeUtil.getTimer();
        for (int i = 0; i < objNum; i++) {

            String url=this._byte.readUTF();
            int materialSize=this._byte.readInt();
            byte[] materialByte= this._byte.readBytes(materialSize);

            Log.d("material地址 ->",   url+" " );
            Log.d("material大小 ->",   materialSize+" " );

            scene3D.materialManager.addResByte(url, new ByteArray(materialByte));

        }

    }

    private  void readParticle()
    {
        int particleNum=this._byte.readInt();
        float time = TimeUtil.getTimer();
        for (int i = 0; i < particleNum; i++) {

            String url=this._byte.readUTF();
            int particSize=this._byte.readInt();
            byte[] particByte= this._byte.readBytes(particSize);
            Log.d("partic地址 ->",   url+" " );
            Log.d("partic大小 ->",   particSize+" " );

            scene3D.particleManager.addResByte(url, new ByteArray(particByte));

        }

    }

    //读取材质参数
    public  static  List<MaterialInfoVo> readMaterialParamData(ByteArray _byte)
    {
        int mpNum = _byte.readInt();
        if (mpNum > 0) {


            List<MaterialInfoVo> mpAry  = new ArrayList<>();
            for (int j = 0; j < mpNum; j++) {
                MaterialInfoVo obj = new MaterialInfoVo();
//                obj.put("name",_byte.readUTF());
                obj.name=_byte.readUTF();
                int  objType=_byte.readByte();
                if (objType == 0) {
//                    obj.put("type",0);
//                    obj.put("url", _byte.readUTF());
                    obj.type=0;
                    obj.url=_byte.readUTF();
                } else if (objType== 1) {
//                    obj.put("type",1);
//                    obj.put("x",_byte.readFloat());
                    obj.type=1;
                    obj.x=_byte.readFloat();
                } else if (objType== 2) {
//                    obj.put("type",2);
//                    obj.put("x", _byte.readFloat());
//                    obj.put("y",_byte.readFloat());
                    obj.type=2;
                    obj.x=_byte.readFloat();
                    obj.y=_byte.readFloat();
                } else if (objType == 3) {
//                    obj.put("type",3);
//                    obj.put("x", _byte.readFloat());
//                    obj.put("y", _byte.readFloat());
//                    obj.put("z",_byte.readFloat());
                    obj.type=3;
                    obj.x=_byte.readFloat();
                    obj.y=_byte.readFloat();
                    obj.z=_byte.readFloat();
                }
                mpAry.add(obj);
            }
            return mpAry;
        }
        return  null;
    }

    public List<MaterialInfoVo> readMaterialInfo()
    {

        int len = this._byte.readInt();
        if (len > 0) {
            List<MaterialInfoVo> $arr  = new ArrayList();
            for (int i = 0; i < len; i++) {
                MaterialInfoVo $temp  = new MaterialInfoVo();
                $temp.type = this._byte.readInt();
                $temp.name = this._byte.readUTF();
                if ($temp.type == 0) {
                    $temp.url = this._byte.readUTF();
                }
                if ($temp.type == 1) {
                    $temp.x = this._byte.readFloat();
                }
                if ($temp.type == 2) {
                    $temp.x = this._byte.readFloat();
                    $temp.y = this._byte.readFloat();
                }
                if ($temp.type == 3) {
                    $temp.x = this._byte.readFloat();
                    $temp.y = this._byte.readFloat();
                    $temp.z = this._byte.readFloat();
                }

                $arr.add($temp);
            }
            return $arr;
        } else {
            return null;
        }
    }
    public ByteArray getZipByte(ByteArray _byte)
    {
        int zipLen = this._byte.readInt();
        byte[] zipByte= this._byte.readBytes(zipLen);
        byte[] outByte=this.getZipData(zipByte);
        return  new ByteArray(outByte);
    }
    private  void   readZipObj(){
        int zipLen = this._byte.readInt();
        byte[] zipByte= this._byte.readBytes(zipLen);
        byte[] outByte=this.getZipData(zipByte);
        this.readObj(new ByteArray(outByte));
    }
    public byte[] getZipData(byte[] sourcesByte) {
        int dataLength = 1024*1024;
        byte[] result=new byte[dataLength];
        try {
            Inflater decompresser=new Inflater();
            decompresser.setInput(sourcesByte,0,sourcesByte.length);
            int resultLength = decompresser.inflate(result);
            decompresser.end();
        } catch(Exception ex) {}
        return result;

    }

    private  void  readObj(ByteArray srcByte){
        int objNum  = srcByte.readInt();
        for (int i   = 0; i < objNum; i++) {
            int pos=srcByte.byteBuffer.position;
            String url = srcByte.readUTF();
            int objLen = srcByte.readInt();
            byte[] objByte= srcByte.readBytes(objLen);
            Log.d("obj地址 ->",   url+" " );
            Log.d("obj大小 ->",   objLen+" " );

            scene3D.objDataManager.loadObjCom(  objByte, url);

        }



    }

    public static void readIntForTwoByte(ByteArray  $byte, List indexs)
    {
        int iLen   = $byte.readInt();
        for (int i = 0; i < iLen; i++) {
            indexs.add($byte.readShort());
        }
    }

    public static List<Float>  readBytes2ArrayBuffer(ByteArray $byte, ByteBuffer $data,int dataWidth, int offset, int stride, int readType)
    {
        int verLength = $byte.readInt();

        List<Float>  list=new ArrayList();

        if (verLength <= 0) {
            return list;
        }

        float scaleNum=0;
        if (readType == 0) {
            scaleNum = $byte.readFloat();
        }
        float tempNum=0;
        int readNum   = verLength / dataWidth;

        for (int i = 0; i < readNum; i++) {
            int pos = stride * i + offset;
            for (int j = 0; j < dataWidth; j++) {
                if (readType == 0) {
                    tempNum=  $byte.readFloatTwoByte(scaleNum);
                    // $data.setFloat32((pos + j) * 4, $byte.readFloatTwoByte(scaleNum), true);
                } else if (readType == 1) {
                    // $data.setFloat32((pos + j) * 4, $byte.readFloatOneByte(), true);
                    tempNum=  $byte.readFloatOneByte();
                } else if (readType == 2) {
                    // $data.setFloat32((pos + j) * 4, $byte.readByte(), true);
                    tempNum=  $byte.readByte();
                } else if (readType == 3) {
                    // $data.setFloat32((pos + j) * 4, ($byte.readByte() + 128) / 255, true);

                    tempNum=  $byte.readByte()+128.0f/255.0f;
                } else if (readType == 4) {
                    // $data.setFloat32((pos + j) * 4, $byte.readFloat(), true);

                    tempNum=  $byte.readFloat();
                }

                list.add(tempNum);

            }


        }
        return list;


    }
    public  void readImg()
    {
        this.imgNum = this._byte.readInt();
        this._byte.tracePostion("图片数量"+imgNum);
        this.imgLoadNum = 0;
        for (int i = 0; i < this.imgNum; i++) {
            String url   =  this._byte.readUTF();
            this._byte.tracePostion("b");
            int imgSize = this._byte.readInt();
            Log.d("图片地址 ->",   url+" " );
            Log.d("图片大小 ->",   imgSize+" " );
            if(imgSize>0){
                byte[] imgByte=  this._byte.readBytes(imgSize);
                Bitmap bitmap = BitmapFactory.decodeByteArray(imgByte, 0, imgByte.length);
                scene3D.textureManager.addRes(Scene_data.fileRoot+ url,bitmap);
            }
        }
        Log.d("url ->",     "-----" );
    }




}
