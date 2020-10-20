package z3d.material;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.ByteArray;
import z3d.base.Scene_data;
import z3d.engine.ResCount;
import z3d.program.Shader3D;
import z3d.vo.Float32Array;
import z3d.vo.Vector3D;

public class Material extends ResCount {
    public String url;
    public String  shaderStr;
    public List<TexItem> texList ;
    public List<ConstItem> constList ;
    public boolean hasTime ;
    public float timeSpeed;
    public int blendMode;
    public boolean  backCull;
    public float killNum;
    public  boolean hasVertexColor;
    public boolean  usePbr;
    public  boolean useNormal;
    public float roughness;

    public Shader3D shader;
    public boolean  writeZbuffer ;
    public  boolean hasFresnel ;
    public boolean  useDynamicIBL ;
    public float normalScale;
    public boolean  lightProbe;
    public  boolean useKill;
    public  boolean directLight;
    public boolean  noLight;
    public  boolean scaleLightMap;
    public int fogMode ;
    public int fcNum;
    public List<Short> fcIDAry ;
    public  boolean hasParticleColor;
    public HashMap locationDic;
    public Float32Array fcData;
    public int sceneNumId;




    public void setByteData(ByteArray _byte) {
        ByteArray fs = _byte;
        int vesion = fs.readInt();
        this.shaderStr = fs.readUTFCopy() ;
        this.hasTime = fs.readBoolean();
        this.timeSpeed = fs.readFloat();
        this.blendMode = (int) fs.readFloat();
        this.backCull = fs.readBoolean() ;
        this.killNum = fs.readFloat() ;
        this.hasVertexColor = fs.readBoolean();
        this.usePbr = fs.readBoolean()  ;
        this.useNormal = fs.readBoolean() ;
        this.roughness = fs.readFloat();
        this.writeZbuffer = fs.readBoolean();
        this.hasFresnel = fs.readBoolean();
        this.useDynamicIBL = fs.readBoolean();
        this.normalScale = fs.readFloat() ;
        this.lightProbe = fs.readBoolean() ;
        this.useKill = fs.readBoolean();
        this.directLight = fs.readBoolean();
        this.noLight = fs.readBoolean();
        this.scaleLightMap = fs.readBoolean();
        this.fogMode = fs.readInt();

        this.fcNum = fs.readByte();
        int len = fs.readByte();
        this.fcIDAry = new ArrayList<>();
        for (int i = 0; i < len; i++) {
            this.fcIDAry.add((short)fs.readByte());
        }

        this.hasParticleColor = false;
        this.initFcData();
        this.readTexList(fs);
        this.readConstLis(fs);

    }

    public void initFcData() {
        this.fcData = new Float32Array(this.fcNum * 4);
        if (this.fcNum <= 0) {
            return;
        }
        this.sceneNumId = 0;
        if (this.hasTime || this.useKill || this.fogMode != 0) {//fc0
            if (this.useKill) {
                this.fcData.put(0,this.killNum);
            }
            if (this.fogMode != 0) {
                this.fcData.put(2,Scene_data.fogData.x);
                this.fcData.put(3,Scene_data.fogData.y);
            }
        }
        if (this.usePbr || this.fogMode == 1) {
            int idx = this.fcIDAry.get(0) * 4;
//            this.fcData[0 + idx] = Scene_data.cam3D.x / 100;
//            this.fcData[1 + idx] = Scene_data.cam3D.y / 100;
//            this.fcData[2 + idx] = Scene_data.cam3D.z / 100;
        }
        if (this.fogMode != 0) {
//            int idx = this.fcIDAry[1] * 4;
//            this.fcData[0 + idx] = Scene_data.fogColor[0];
//            this.fcData[1 + idx] = Scene_data.fogColor[1];
//            this.fcData[2 + idx] = Scene_data.fogColor[2];
        }

        if (this.scaleLightMap) {
//            int idx = this.fcIDAry[2] * 4;
//            this.fcData[0 + idx] = Scene_data.scaleLight[0];
        }



    }
    private void readTexList(ByteArray fs) {
        int texListLen = fs.readInt();
        this.texList = new ArrayList<>();
        for (int i = 0; i < texListLen; i++) {


            TexItem texItem = new TexItem();
            texItem.set_id( (int)fs.readFloat());
            texItem.url = fs.readUTF();
            texItem.isDynamic = fs.readBoolean();
            texItem.paramName = fs.readUTF();
            texItem.isMain = fs.readBoolean();
            texItem.isParticleColor = fs.readBoolean();
            texItem.type =(int) fs.readFloat();
            texItem.wrap =(int) fs.readFloat();
            texItem.filter =(int) fs.readFloat();
            texItem.mipmap =(int) fs.readFloat();

            if (texItem.isParticleColor) {
                this.hasParticleColor = true;
            }

            this.texList.add(texItem);

        }

    }

    private  void readConstLis(ByteArray fs) {
        int constLisLen = fs.readInt();
        this.constList = new ArrayList<>();
        for (int i = 0; i < constLisLen; i++) {
            ConstItem constItem  = new ConstItem();

            constItem.set_id((int) fs.readFloat());
            constItem.value = new Vector3D(fs.readFloat(), fs.readFloat(), fs.readFloat(), fs.readFloat());

            constItem.paramName0 = fs.readUTF();
            constItem.param0Type = (int)fs.readFloat();
            constItem.param0Index = (int)fs.readFloat();

            constItem.paramName1 = fs.readUTF();
            constItem.param1Type = (int)fs.readFloat();
            constItem.param1Index = (int)fs.readFloat();

            constItem.paramName2 = fs.readUTF();
            constItem.param2Type =(int) fs.readFloat();
            constItem.param2Index = (int)fs.readFloat();

            constItem.paramName3 = fs.readUTF();
            constItem.param3Type = (int)fs.readFloat();
            constItem.param3Index =(int) fs.readFloat();
            constItem.creat(this.fcData);

            this.constList.add(constItem);
        }

    }


    public void update(float t) {


    this.updateTime(t);
    this.updateScene();
    }

    private void updateScene() {
    }

    private void updateTime(float t) {
    }
}
