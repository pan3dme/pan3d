package com.z3d.material;

import com.z3d.base.ByteArray;
import com.z3d.base.Scene_data;
import com.z3d.engine.ResCount;
import com.z3d.program.Shader3D;
import com.z3d.scene.Scene3D;
import com.z3d.vo.Float32Array;
import com.z3d.vo.Vector2D;
import com.z3d.vo.Vector3D;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

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


    public Material(Scene3D val){
        super(val);
    }


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
                this.fcData.put(2, Scene_data.fogData.x);
                this.fcData.put(3, Scene_data.fogData.y);
            }
        }
        if (this.usePbr || this.fogMode == 1) {
            int idx = this.fcIDAry.get(0) * 4;
            this.fcData.put(0 + idx,0);
            this.fcData.put(1 + idx,0);
            this.fcData.put(2 + idx,0);
        }
        if (this.fogMode != 0) {
            int idx = this.fcIDAry.get(1) * 4;
            this.fcData.put(0 + idx,0);
            this.fcData.put(1 + idx,0);
            this.fcData.put(2 + idx,0);
        }

        if (this.scaleLightMap) {
            int idx = this.fcIDAry.get(2) * 4;
            this.fcData.put(0 + idx,0);
        }



    }
    public void updateFogDagtga(Vector3D fogcolor, Vector2D fogData){
        if (this.hasTime || this.useKill || this.fogMode != 0) {//fc0
            if (this.fogMode != 0) {
                this.fcData.put(2,fogData.x);
                this.fcData.put(3,fogData.y);
            }
        }
        if(this.fogMode!=0){
            int idx = this.fcIDAry.get(1) * 4;
            this.fcData.put(0 + idx,fogcolor.x);
            this.fcData.put(1 + idx,fogcolor.y);
            this.fcData.put(2 + idx,fogcolor.z);
        }

    }

    public TexItem getMainTexItem(){
        for(int i=0;i< this.texList.size();i++){
            if( this.texList.get(i).isMain==true){
                return this.texList.get(i);
            }
        }
        return null;
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
    public void updateCam(float x, float y, float z) {
        if (this.usePbr || this.fogMode == 1) {
            int idx = this.fcIDAry.get(0) * 4;
            this.fcData.put(0 + idx,x);
            this.fcData.put(1 + idx,y);
            this.fcData.put(2 + idx,z);
        }
    }
}
