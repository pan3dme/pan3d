package z3d.display;

import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.opengl.ETC1Util;
import android.opengl.GLES20;
import android.opengl.GLUtils;
import android.util.Log;

import androidx.appcompat.widget.VectorEnabledTintResources;

import org.json.JSONObject;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.ObjData;
import z3d.base.ObjDataBackFun;
import z3d.base.ObjDataManager;
import z3d.base.TexTuresBackFun;
import z3d.core.Context3D;
import z3d.filemodel.TextureManager;
import z3d.material.Material;
import z3d.material.MaterialBackFun;
import z3d.material.MaterialManager;
import z3d.material.TextureRes;
import z3d.program.ProgrmaManager;
import z3d.program.Shader3D;
import z3d.units.LoadBackFun;
import z3d.units.LoadManager;
import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;

public class BuildDisplay3DSprite extends Display3DSprite {

    public static String TAG="Display3DSprite";
    private TextureRes textureBase;
    public String lighturl;
    public void  setInfo(JSONObject value)
    {

        try {
            this.x=(float) value.getDouble("x");
            this.y=(float) value.getDouble("y");
            this.z=(float) value.getDouble("z");

            this.scaleX=(float) value.getDouble("scaleX");
            this.scaleY=(float) value.getDouble("scaleY");
            this.scaleZ=(float) value.getDouble("scaleZ");

            this.rotationX=(float) value.getDouble("rotationX");
            this.rotationY=(float) value.getDouble("rotationY");
            this.rotationZ=(float) value.getDouble("rotationZ");

            this.setObjUrl(value.getString("objsurl"));
         //   this.setMaterialUrl((value.getString("materialurl")),new ArrayList());

            if( value.has("lighturl")){
                this.loadLightTexture(value.getString("lighturl"));
            }else{
               this.makeBaseTexture();
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    private void  loadLightTexture(String url)
    {

        TextureManager.getInstance().getTexture(url, new TexTuresBackFun() {
            @Override
            public void Bfun(TextureRes value) {
                textureBase=value;
            }
        });

    }

    public void setMaterialUrl(String url,List paramData)
    {
        MaterialManager.getInstance().getMaterialByte(url, new MaterialBackFun() {
            @Override
            public void Bfun(Material value) {

                Log.d(TAG, "Bfun: ");
            }
        });

        /*
    [[MaterialManager default]getMaterialByte:[[Scene_data default]getWorkUrlByFilePath:value ] fun:^(NSObject *obj) {
        this.material=(Material*)obj;
        if (this.material.useNormal) {
        }
        if (paramData) {
            this.materialParam = [[MaterialBaseParam alloc]init];
            [this.materialParam setData:this.material ary:paramData];
        }
    } info:nil autoReg:YES regName:MaterialShader.shaderStr shader3DCls:[[MaterialShader alloc]init]];
    */
    }


    private void makeBaseTexture()
    {
        TextureManager.getInstance().getTexture("content/finalscens/mapscene/copy/ba卦tai/ba卦tai_hide/lightuv/build2.jpg", new TexTuresBackFun() {
            @Override
            public void Bfun(TextureRes value) {

                textureBase=value;
            }
        });


        TextureManager.getInstance().getTexture("https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/base/reda.png", new TexTuresBackFun() {
            @Override
            public void Bfun(TextureRes value) {

                textureBase=value;
            }
        });

    }

    @Override
    protected void makeTempObjData() {

    }

    protected void  registetProgame()
    {

        ProgrmaManager.getInstance().registe(BuildDisplay3DShader.shaderStr,new BuildDisplay3DShader());
        this.shader3D=ProgrmaManager.getInstance().getProgram(BuildDisplay3DShader.shaderStr);

        int a1=GLES20.glGetAttribLocation(this.shader3D.program, "vPosition");
        int a2=GLES20.glGetAttribLocation(this.shader3D.program, "vColorv3d");
        Log.d("", "registetProgame: ");

    }

    public void  setObjUrl(String value)
    {
//        "content/finalscens/mapscene/copy/ba卦tai/moxing/ljtai_fb_youtai_0.xml" -> {ObjData@12838}
//        "content/finalscens/mapscene/copy/ba卦tai/moxing/bgtai_fb_zuotai_0.xml" -> {ObjData@12840}
//        "content/finalscens/mapscene/copy/ba卦tai/moxing/ljtai_fb_zhongtai_0.xml" -> {ObjData@12842}
//        "content/finalscens/mapscene/copy/ba卦tai/moxing/bgtai_fb_texiao_0.xml" -> {ObjData@12844}
//        "content/finalscens/mapscene/copy/ba卦tai/moxing/bgtai_fb_tiankong_0.xml" -> {ObjData@12846}
        //  value="content/finalscens/mapscene/copy/ba卦tai/moxing/bgtai_fb_texiao_0.xml";
        Log.d(TAG, "value: "+value);
        ObjDataManager.getInstance().getObjData(value, new ObjDataBackFun() {
            @Override
            public void Bfun(ObjData value) {
                objData=value;
            }
        });

    }


    @Override
    public void upFrame(){
        Context3D ctx=this.scene3d.context3D;
        if(this.objData!=null&&this.shader3D!=null &&this.textureBase!=null ){

            this.modeMatrix.appendRotation(1, Vector3D.Z_AXIS);
            ctx.setProgame(this.shader3D.program);

            Matrix3D m=new Matrix3D();
            m.appendScale(1,1,1);

            ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D",this.scene3d.camera3D.modelMatrix.m);
            ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);

            ctx.setVa(this.shader3D,"vPosition",3,this.objData.vertexBuffer);
            ctx.setVa(this.shader3D,"vTextCoord",2,this.objData.uvBuffer);




            ctx.setRenderTexture(this.shader3D,"colorMap",this.textureBase.textTureInt,0);

            ctx.drawCall(this.objData.indexBuffer,this.objData.treNum);

            GLES20.glDisableVertexAttribArray(0);
            GLES20.glDisableVertexAttribArray(1);


        }


    }

}
