package com.pan3d.display;

import android.opengl.GLES20;
import android.util.Log;

import com.pan3d.base.ObjData;
import com.pan3d.base.ObjDataBackFun;
import com.pan3d.base.Scene_data;
import com.pan3d.base.TexTuresBackFun;
import com.pan3d.core.Context3D;
import com.pan3d.display.interfaces.IBind;
import com.pan3d.material.DynamicBaseTexItem;
import com.pan3d.material.Material;
import com.pan3d.material.MaterialBackFun;
import com.pan3d.material.MaterialBaseParam;
import com.pan3d.material.TexItem;
import com.pan3d.material.TextureRes;
import com.pan3d.program.MaterialShader;
import com.pan3d.program.Shader3D;
import com.pan3d.res.MaterialInfoVo;
import com.pan3d.scene.Scene3D;
import com.pan3d.units.TimeUtil;
import com.pan3d.vo.Matrix3D;
import com.pan3d.vo.Vector3D;

import java.util.List;

public   class Display3DSprite extends Display3D {
    private static final String TAG="Display3DSprite";
    public Material material;
    public MaterialBaseParam materialParam;
    public Shader3D shader3D;
    public ObjData objData;
    public Matrix3D modeMatrix;
    public Matrix3D rotationMatrix;
    public boolean dynamic;
    public float time;
    private Vector3D _groupPos;
    private Vector3D _groupRotation;
    private Vector3D _groupScale;

    public Display3DSprite(Scene3D val){
        super(val);
        this.time=0;
        this.modeMatrix=new Matrix3D();
        this.rotationMatrix=new Matrix3D();
    }

    protected TextureRes getMainTextureRes(){
        TexItem texItem  =this.material.getMainTexItem();
        if(texItem==null){
            return  null;
        }
        List<DynamicBaseTexItem> texDynamicVec  =  this.materialParam.dynamicTexList;
        for (int i   = 0; i < texDynamicVec.size(); i++) {
            DynamicBaseTexItem dynamicBaseTexItem=texDynamicVec.get(i);
            if(texItem.paramName.equals(dynamicBaseTexItem.paramName)){
                return dynamicBaseTexItem.textureRes;
            }
        }
        return texItem.textureRes;
    }
    public void upData() {
        super.upData();
        Context3D ctx =  scene3D.context3D;
        if (this.material != null) {
            this.updateMaterial();
        }
    }
    public void setMaterialUrl(String url, final List<MaterialInfoVo> paramData)
    {
       scene3D.materialManager.getMaterialByte(url, new MaterialBackFun() {
            @Override
            public void Bfun(Material value) {
                material=value;
                if(paramData!=null){
                    materialParam=new MaterialBaseParam(scene3D);
                    materialParam.setData(material,paramData);
                }
            }
        },true, MaterialShader.shaderNameStr,new MaterialShader(scene3D));
    }
    public void  setObjUrl(String value)
    {
        Log.d(TAG, "value: "+value);
      scene3D.objDataManager.getObjData(value, new ObjDataBackFun() {
            @Override
            public void Bfun(ObjData value) {
                objData=value;
            }
        });
    }
    public TextureRes baseTextureRes;
    public void  setPicUrl(String value)
    {

        scene3D.textureManager.getTexture( Scene_data.fileRoot+ value, new TexTuresBackFun() {
            @Override
            public void Bfun(TextureRes value) {
                baseTextureRes =value;
            }
        });
    }
    public  void  updateMaterial()
    {
        if(this.material==null||this.objData==null)
        {
            return;
        }

        this.shader3D=this.material.shader;

        if (this.material.url.indexOf("changjinghongpei/standard_byte")==-1) {
           // return;
        }
        Context3D ctx= scene3D.context3D;

        ctx.setProgame(this.shader3D.program);
        this.updateBind();
        this.setVc();
        this.setMaterialTexture(this.material,this.materialParam);
        this.setMaterialVc(this.material,this.materialParam);
        this.setMaterialVa();


    }
    public IBind bindTarget;
    public Matrix3D groupMatrix;
    public Matrix3D bindMatrix;
    public Matrix3D groupRotationMatrix;
    private boolean _isInGroup;
    private String bindSocket;
    protected void updateBind()
    {

        if (this.bindTarget!=null) {
            this.posMatrix3d.identity();
            this.posMatrix3d.appendScale(this.scaleX, this.scaleY, this.scaleX);
            if (this._isInGroup) {
                this.posMatrix3d.append(this.groupMatrix);

            }
            this.bindTarget.getSocket(this.bindSocket, this.bindMatrix);
            this.posMatrix3d.append(this.bindMatrix);
            this.bindMatrix.copyTo(this.rotationMatrix);
            this.rotationMatrix.identityPostion();
            if (this._isInGroup) {
                this.rotationMatrix.prepend(this.groupRotationMatrix);
            }

//            this.sceneVisible = (<any>this.bindTarget).visible;
        }

    }
    protected void setVc()
    {
        Context3D ctx= scene3D.context3D;
        ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D", scene3D.camera3D.modelMatrix.m);
        ctx.setVcMatrix4fv(this.shader3D,"posMatrix3D",this.posMatrix3d.m);
        if (this.material.usePbr || this.material.directLight) {
            float[] m = new float[9];
            this.rotationMatrix.getRotaion(m);
            ctx.setVcMatrix3fv(this.shader3D,"rotationMatrix3D",m);

        }
    }

    protected void setMaterialVa()
    {
        Context3D ctx= scene3D.context3D;
        ctx.setVa(this.shader3D,"v3Position",3,this.objData.vertexBuffer);
        ctx.setVa(this.shader3D,"v2CubeTexST",2,this.objData.uvBuffer);
        if (!(this.material.directLight || this.material.noLight)) {
            ctx.setVa(this.shader3D,"v2lightuv",2,this.objData.lightUvBuffer);
        }
        ctx.drawCall(this.objData.indexBuffer,this.objData.treNum);
    }


    protected void setMaterialVc(Material material, MaterialBaseParam mp)
    {
        if (material.fcNum <= 0) {
            return;
        }
        float t = 0;
        if (material.hasTime) {
            t =  (TimeUtil.getTimer() - this.time)% 100000 * 0.001f;
        }
        material.update(t);
        this.setSceneFcData(material);
        if (mp!=null) {
            mp.update();
        }
        Context3D ctx= scene3D.context3D;
//        material.fcData.printOut();
        ctx.setVc4fv(material.shader, "fc",material.fcNum, material.fcData.verBuff);
    }

    private void setSceneFcData(Material material) {

        if (scene3D.fogColor!=null&& scene3D.fogData!=null){
            material.updateFogDagtga(scene3D.fogColor, scene3D.fogData);
            this.setCamPos(material);
        }
    }

    private void setCamPos(Material material) {

        material.updateCam(scene3D.camera3D.x / 100, scene3D.camera3D.y / 100, scene3D.camera3D.z / 100);
    }

    public TextureRes lightTextureRes;
    protected void setMaterialTexture(Material material, MaterialBaseParam mp)
    {

        Context3D ctx= scene3D.context3D;
        List<TexItem> texVec= mp.material.texList;
        TexItem texItem=null;
        for (int i   = 0; i < texVec.size(); i++) {
            texItem=texVec.get(i);
            if (texItem.isDynamic) {
                continue;
            }
            if (texItem.type == TexItem.LIGHTMAP) {
                if(lightTextureRes!=null){
                    ctx.setRenderTexture(material.shader,texItem.name,lightTextureRes.textTureInt,texItem.get_id());
                }
            }
            else if (texItem.type == TexItem.LTUMAP   ) {

                ctx.setRenderTexture(material.shader,texItem.name, scene3D.pubLut.textTureInt,texItem.get_id());
            }
            else if (texItem.type == TexItem.CUBEMAP) {
                // Log.d(TAG, "CUBEMAP: ");

                if (material.useDynamicIBL) {// && _reflectionTextureVo) {
                    //_context.setTextureAt(texVec[i].id, _reflectionTextureVo.texture);
                } else {
                    float index   = (float)Math.floor(material.roughness * 5);
                    if (scene3D.skyCubeMap!=null) {
                        ctx.setRenderTexture(material.shader,texItem.name, scene3D.skyCubeMap.textTureInt,texVec.get(i).get_id());
                    }

                }
            }
            else if (texItem.type == 0) {
                ctx.setRenderTexture(material.shader,texItem.name,texItem.textureRes.textTureInt,texItem.get_id());
            }
        }
        List<DynamicBaseTexItem> texDynamicVec  =  mp.dynamicTexList;
        for (int i   = 0; i < texDynamicVec.size(); i++) {
            DynamicBaseTexItem dynamicBaseTexItem=texDynamicVec.get(i);
            texItem=(TexItem)dynamicBaseTexItem.target;
            if(texItem !=null&&dynamicBaseTexItem.textureRes!=null){
                ctx.setRenderTexture(material.shader,texItem.name,dynamicBaseTexItem.textureRes.textTureInt,texItem.get_id());
            }
        }

    }

    public void setBind(IBind $bindTarget, String $bindSocket) {
        this.bindTarget = $bindTarget;
        this.bindSocket = $bindSocket;
        this.bindMatrix = new Matrix3D();
    }

    public void setGroup(Vector3D $pos, Vector3D $rotaion, Vector3D $scale) {

        this._isInGroup = true;
        this._groupPos = $pos;
        this._groupRotation = $rotaion;
        this._groupScale = $scale;

        this.groupMatrix = new Matrix3D();
        this.groupRotationMatrix = new Matrix3D();

        this.groupMatrix.isIdentity = false;
        this.groupMatrix.identity();

        this.groupMatrix.appendScale($scale.x, $scale.y, $scale.z);
        this.groupMatrix.appendRotation($rotaion.x, Vector3D.X_AXIS);
        this.groupMatrix.appendRotation($rotaion.y, Vector3D.Y_AXIS);
        this.groupMatrix.appendRotation($rotaion.z, Vector3D.Z_AXIS);
        this.groupMatrix.appendTranslation($pos.x, $pos.y, $pos.z);

        this.groupRotationMatrix.isIdentity = false;
        this.groupRotationMatrix.identity();

        this.groupRotationMatrix.prependRotation($rotaion.z, Vector3D.Z_AXIS);
        this.groupRotationMatrix.prependRotation($rotaion.y, Vector3D.Y_AXIS);
        this.groupRotationMatrix.prependRotation($rotaion.x, Vector3D.X_AXIS);
    }
}
