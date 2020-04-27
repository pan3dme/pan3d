package z3d.res;

import android.print.PrinterId;
import android.util.Log;


import java.nio.ByteBuffer;
import java.util.ArrayList;
import java.util.List;
import java.util.zip.Inflater;
import java.util.zip.ZipFile;

import z3d.base.CallBackFun;

import z3d.base.ObjDataManager;
import z3d.engine.ResCount;
import z3d.base.ByteArray;
import z3d.filemodel.ParticleManager;
import z3d.material.MaterialManager;
import z3d.units.TimeUtil;

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
            // this.readObj(this._byte);
        } else if (fileType == BaseRes.MATERIAL_TYPE) {
            this.readMaterial();
        } else if (fileType == BaseRes.PARTICLE_TYPE) {
            this.readParticle();
        } else if (fileType == BaseRes.ZIP_OBJS_TYPE) {
            this.readZipObj();
        }
        if(this.imgFun!=null){
            this.imgFun.StateChange(true);
        }
    }
    private  void readMaterial()
    {
        int objNum=this._byte.readInt();
        int time = TimeUtil.getTimer();
        for (int i = 0; i < objNum; i++) {

            String url=this._byte.readUTF();
            int materialSize=this._byte.readInt();
            byte[] materialByte= this._byte.readBytes(materialSize);
            Log.d("material地址 ->",   url+" " );
            Log.d("material大小 ->",   materialSize+" " );

            MaterialManager.getInstance().addResByte(url, new ByteArray(materialByte));

         }

    }

    private  void readParticle()
    {
        int particleNum=this._byte.readInt();
        int time = TimeUtil.getTimer();
        for (int i = 0; i < particleNum; i++) {

            String url=this._byte.readUTF();
            int particSize=this._byte.readInt();
            byte[] particByte= this._byte.readBytes(particSize);
            Log.d("partic地址 ->",   url+" " );
            Log.d("partic大小 ->",   particSize+" " );

            ParticleManager.getInstance().addResByte(url, new ByteArray(particByte));

        }

    }

    /*
    public readParticle(): void {
        var objNum: number = this._byte.readInt();

        var time: number = TimeUtil.getTimer();

        for (var i: number = 0; i < objNum; i++) {
            var url: string = Scene_data.fileRoot + this._byte.readUTF();
            var size: number = this._byte.readInt();


            var dataByte: Pan3dByteArray = new Pan3dByteArray;
            dataByte.length = size;
            this._byte.readBytes(dataByte, 0, size)
            ParticleManager.getInstance().addResByte(url, dataByte);


        }


    }
    */
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


            ObjDataManager.getInstance().loadObjCom(  objByte, url);


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
                } else if (readType == 3) {
                    // $data.setFloat32((pos + j) * 4, ($byte.readByte() + 128) / 255, true);
                } else if (readType == 4) {
                    // $data.setFloat32((pos + j) * 4, $byte.readFloat(), true);
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
                this._byte.readBytes(imgSize);

            }
        }
        Log.d("url ->",     "-----" );
    }



    /*
    public read($imgFun: Function = null): void {
            this._imgFun = $imgFun;
            var fileType: number = this._byte.readInt();
            if (fileType == BaseRes.IMG_TYPE) {
                if (Scene_data.supportBlob) {
                    this.readImg();
                } else {
                    this.readImgLow();
                }
            } else if (fileType == BaseRes.OBJS_TYPE) {
                this.readObj(this._byte);
            } else if (fileType == BaseRes.MATERIAL_TYPE) {
                this.readMaterial();
            } else if (fileType == BaseRes.PARTICLE_TYPE) {
                this.readParticle();
            } else if (fileType == BaseRes.ZIP_OBJS_TYPE) {
                this.readZipObj();
            }

        }
     */
}
