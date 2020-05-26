package z3d.display;

import android.opengl.GLES20;
import android.util.Log;


import java.util.ArrayList;
import java.util.List;


import z3d.base.ObjData;
import z3d.base.TexTuresBackFun;
import z3d.core.Context3D;

import z3d.filemodel.TextureManager;
import z3d.material.DynamicTexItem;
import z3d.material.Material;
import z3d.material.MaterialBackFun;
import z3d.material.MaterialBaseParam;
import z3d.material.MaterialManager;
import z3d.material.TexItem;
import z3d.material.TextureRes;
import z3d.program.ProgrmaManager;
import z3d.program.Shader3D;
import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;


public   class Display3DSprite extends Display3D {

    private static final String TAG="Filter";
    public Material material;
    public  MaterialBaseParam  materialParam;
    protected TextureRes textureBase;
    public Shader3D shader3D;
    public ObjData objData;
    public Matrix3D modeMatrix;

    protected void makeBaseTexture()
    {
        //https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/base/reda.png
        //https://pics7.baidu.com/feed/cefc1e178a82b901d513b1faf5a63e713812ef6b.jpeg?token=3f0024848c1eefcc4631f5433a577c6f
        TextureManager.getInstance().getTexture("https://pics7.baidu.com/feed/cefc1e178a82b901d513b1faf5a63e713812ef6b.jpeg?token=3f0024848c1eefcc4631f5433a577c6f", new TexTuresBackFun() {
            @Override
            public void Bfun(TextureRes value) {
                textureBase=value;
            }
        });

    }
    private int skipNum;
    public Display3DSprite( ){

        this.skipNum=0;
        this.modeMatrix=new Matrix3D();
        this.registetProgame();
        this.makeTempObjData();
    }
    protected void  makeTempObjData()
    {
        this.objData =new ObjData();

        ObjData od=this.objData;

        od.verticeslist=new ArrayList<Float>();//结果顶点坐标列表
        od.verticeslist.add(0f);
        od.verticeslist.add(0f);
        od.verticeslist.add(0f);

        od.verticeslist.add(100f);
        od.verticeslist.add(0f);
        od.verticeslist.add(0f);

        od.verticeslist.add(100f);
        od.verticeslist.add(100f);
        od.verticeslist.add(0f);


        od.indexs=new ArrayList<Short>();
        od.indexs.add((short)0);
        od.indexs.add((short)1);
        od.indexs.add((short)2);


        for(int i=0;i<100000;i++){

            od.verticeslist.add(100f);
            od.verticeslist.add(100f);
            od.verticeslist.add(0f);

        }

        for(int i=0;i<10000;i++){

            od.indexs.add((short)i);
            od.indexs.add((short)i);
            od.indexs.add((short)i);

        }


        od.upToGup();


    }

    protected void  registetProgame()
    {

        ProgrmaManager.getInstance().registe(Display3DShader.shaderStr,new Display3DShader());
        this.shader3D=ProgrmaManager.getInstance().getProgram(Display3DShader.shaderStr);

    }

    public void upFrame(){
        Context3D ctx=this.scene3d.context3D;
        if(this.material!=null){
            this.updateMaterial();
        }else{
            if(this.shader3D!=null){
                this.modeMatrix.appendRotation(1, Vector3D.Z_AXIS);
                ctx.setProgame(this.shader3D.program);
                ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D",this.scene3d.camera3D.modelMatrix.m);
                ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);
                ctx.setVa(this.shader3D,"vPosition",3,this.objData.vertexBuffer);
                ctx.drawCall(this.objData.indexBuffer,this.objData.treNum);
                GLES20.glDisableVertexAttribArray(0);
            }
        }

    }
    public  void  updateMaterial()
    {
        if(this.material==null||this.objData==null)
        {
            return;
        }
        Context3D ctx=this.scene3d.context3D;
        //   this.shader3D=this.material.shader;
        ctx.setProgame(this.shader3D.program);
//        this.updateBind();
        this.setVc();
//        this.setBaseMaterialVc(this.material);
          this.setMaterialTexture(this.material,this.materialParam);
//        this.setMaterialVc(this.material,this.materialParam);
        this.setMaterialVa();
        this.resetVa();
    }
    protected void updateBind()
    {

    }
    protected void setVc()
    {
        Context3D ctx=this.scene3d.context3D;
        ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D",this.scene3d.camera3D.modelMatrix.m);
        ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);

    }
    protected void setBaseMaterialVc(Material material)
    {

    }

    protected void setMaterialVa()
    {
        Context3D ctx=this.scene3d.context3D;
        ctx.setVa(this.shader3D,"vPosition",3,this.objData.vertexBuffer);
        ctx.setVa(this.shader3D,"vTextCoord",2,this.objData.uvBuffer);
        ctx.drawCall(this.objData.indexBuffer,this.objData.treNum);

    }
    protected void resetVa()
    {

    }

    public void setMaterialUrl(String url,final List paramData)
    {

        MaterialManager.getInstance().getMaterialByte(url, new MaterialBackFun() {
            @Override
            public void Bfun(Material value) {
                material=value;
                if(paramData!=null){
                    materialParam=new MaterialBaseParam();
                    materialParam.setData(material,paramData);
                }
            }
        });


    }

    protected void setMaterialTexture(Material material, MaterialBaseParam mp)
    {
        Context3D ctx=this.scene3d.context3D;
        if(this.textureBase!=null){
            ctx.setRenderTexture(this.shader3D,"colorMap",this.textureBase.textTureInt,0);
        }

        List<TexItem> texVec= mp.material.texList;
        TexItem texItem;
        for (int i   = 0; i < texVec.size(); i++) {
            texItem=texVec.get(i);
            if (texItem.isDynamic) {
                continue;
            }
            if (texItem.type == TexItem.LIGHTMAP) {
                Log.d(TAG, "LIGHTMAP: ");
            }
            else if (texItem.type == TexItem.LTUMAP   ) {
                Log.d(TAG, "LTUMAP: ");
            }
            else if (texItem.type == TexItem.CUBEMAP) {
                Log.d(TAG, "CUBEMAP: ");
            }
            else if (texItem.type == 0) {
                Log.d(TAG, "基础图: ");
               // ctx.setRenderTexture(material.shader,texItem.name,texItem.textureRes.textTureInt,texItem.id);
            }
        }

        List<DynamicTexItem> texDynamicVec  =  mp.dynamicTexList;
        for (int i   = 0; i < texDynamicVec.size(); i++) {
            texItem=texDynamicVec.get(i).target;
            if(texItem!=null ){
                Log.d(TAG, "基础图: ");
               // ctx.setRenderTexture(material.shader,texItem.name,texItem.textureRes.textTureInt,texItem.id);
            }
        }


    }



}
