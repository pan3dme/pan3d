package z3d.base;

import java.nio.ByteBuffer;
import java.util.ArrayList;


import z3d.res.BaseRes;

public class ObjDataManager extends ResGC {
    private static ObjDataManager _instance;
    public static ObjDataManager getInstance()  {
        if (ObjDataManager._instance==null) {
            ObjDataManager._instance = new ObjDataManager();
        }
        return ObjDataManager._instance;
    }
    public ObjDataManager( ) {

    }

    public void  loadObjCom(byte[] srcByte,String url)
    {


        ObjData objData = new ObjData();
        ByteArray byteArray   = new ByteArray(srcByte);
        int version = byteArray.readInt();
        String str = byteArray.readUTF();
        this.readObj2OneBuffer(byteArray,objData);

    }
    public void readObj2OneBuffer(ByteArray byteArray , ObjData objData)
    {
        Boolean[]  typeItem = new  Boolean[6];
        int dataWidth    = 0;
        for (int i = 0; i < 6; i++) {
            boolean tf=byteArray.readBoolean();
            typeItem[i]=tf;
            if(tf){
                if(i==1){
                    dataWidth += 2;
                }else if(i==2){
                    dataWidth += 2;
                }else{
                    dataWidth += 3;
                }
            }
        }
        float len = byteArray.readFloat();
        len *= dataWidth * 4;
        byte[] arybuff = new byte[(int)len] ;
        ByteBuffer data=ByteBuffer.wrap(arybuff);
        int uvsOffsets  = 3;
        int lightuvsOffsets = uvsOffsets + 2;
        int normalsOffsets = typeItem[2] ? (lightuvsOffsets + 2) : (uvsOffsets + 2);
        int tangentsOffsets = normalsOffsets + 3;
        int bitangentsOffsets = tangentsOffsets + 3;




        objData.verticeslist= BaseRes.readBytes2ArrayBuffer(byteArray, data, 3, 0, dataWidth,0);
        objData.uvlist= BaseRes.readBytes2ArrayBuffer(byteArray, data, 2, uvsOffsets, dataWidth,0);
        objData.lightuvs= BaseRes.readBytes2ArrayBuffer(byteArray, data, 2, lightuvsOffsets, dataWidth,1);
        objData.normals= BaseRes.readBytes2ArrayBuffer(byteArray, data, 3, normalsOffsets, dataWidth,0);
        BaseRes.readBytes2ArrayBuffer(byteArray, data, 3, tangentsOffsets, dataWidth,0);
        BaseRes.readBytes2ArrayBuffer(byteArray, data, 3, bitangentsOffsets, dataWidth,0);

        objData.indexs=new ArrayList();
        BaseRes.readIntForTwoByte(byteArray, objData.indexs);


        objData.compressBuffer = true;
        objData.uvsOffsets = uvsOffsets * 4;
        objData.lightuvsOffsets = lightuvsOffsets * 4;
        objData.normalsOffsets = normalsOffsets * 4;
        objData.tangentsOffsets = tangentsOffsets * 4;
        objData.bitangentsOffsets = bitangentsOffsets * 4;
        objData.stride = dataWidth * 4;





    }


}
