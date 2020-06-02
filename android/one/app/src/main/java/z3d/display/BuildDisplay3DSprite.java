package z3d.display;

import android.content.res.Resources;
import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.opengl.ETC1Util;
import android.opengl.GLES20;
import android.opengl.GLUtils;
import android.util.Log;

import androidx.appcompat.widget.VectorEnabledTintResources;

import org.json.JSONArray;
import org.json.JSONObject;
import org.json.JSONStringer;
import org.w3c.dom.Text;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import z3d.base.MathCore;
import z3d.base.ObjData;
import z3d.base.ObjDataBackFun;
import z3d.base.ObjDataManager;
import z3d.base.TexTuresBackFun;
import z3d.core.Context3D;
import z3d.filemodel.TextureManager;
import z3d.material.Material;
import z3d.material.MaterialBackFun;
import z3d.material.MaterialBaseParam;
import z3d.material.MaterialManager;
import z3d.material.TexItem;
import z3d.material.TextureRes;
import z3d.program.MaterialShader;
import z3d.program.ProgrmaManager;
import z3d.program.Shader3D;
import z3d.units.LoadBackFun;
import z3d.units.LoadManager;
import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;

public class BuildDisplay3DSprite extends Display3DSprite {

    public static String TAG="Display3DSprite";
      public TextureRes lightTextureRes;

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
            JSONArray tempArr= value.getJSONArray("materialInfoArr");
            this.setMaterialUrl((value.getString("materialurl")), MathCore.ObjArrToList( value.getJSONArray("materialInfoArr")));
            if( value.has("lighturl")){
              this.setLighturl(value.getString("lighturl"));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }

    }
    private void setLighturl(String lighturl)
    {
        TextureManager.getInstance().getTexture(lighturl, new TexTuresBackFun() {
            @Override
            public void Bfun(TextureRes value) {
                 lightTextureRes=value;
            }
        });
        this.loagTextTextureRes("https://cms-bucket.ws.126.net/2020/0526/1c932f5ej00qay0pi005vc000go00cic.jpg");
    }
    private TextureRes testTextUreRes;
    private void loagTextTextureRes(String lighturl)
    {
        TextureManager.getInstance().getTexture(lighturl, new TexTuresBackFun() {
            @Override
            public void Bfun(TextureRes value) {
                testTextUreRes=value;
            }
        });
    }

    @Override
    protected void makeTempObjData() {
    }
    protected void  registetProgame()
    {
    }
    public void  setObjUrl(String value)
    {
        Log.d(TAG, "value: "+value);
        ObjDataManager.getInstance().getObjData(value, new ObjDataBackFun() {
            @Override
            public void Bfun(ObjData value) {
                objData=value;
            }
        });

    }

    @Override
    public void updateMaterial() {
        if(this.material==null||this.objData==null)
        {
            return;
        }
        this.shader3D=this.material.shader;
        Context3D ctx=this.scene3d.context3D;
        ctx.setProgame(this.shader3D.program);
        this.setVc();
        this.setMaterialTexture(this.material,this.materialParam);
        this.setMaterialVa();

    }

    protected void setMaterialTexture(Material material, MaterialBaseParam mp)
    {
      super.setMaterialTexture(material,mp);
        Context3D ctx=this.scene3d.context3D;
        List<TexItem> texVec= mp.material.texList;
        TexItem texItem=null;
        for (int i   = 0; i < texVec.size(); i++) {
            texItem=texVec.get(i);
            if (texItem.type == TexItem.LIGHTMAP&&this.lightTextureRes!=null) {

//                 ctx.setRenderTexture(material.shader,"fs0",this.testTextUreRes.textTureInt,0);
//                ctx.setRenderTexture(material.shader,"fs1",this.lightTextureRes.textTureInt,1);

                ctx.setRenderTexture(material.shader,"fs0",this.lightTextureRes.textTureInt,0);
                ctx.setRenderTexture(material.shader,texItem.name,this.lightTextureRes.textTureInt,texItem.get_id());



            }

        }

    }
    @Override
    public void upFrame(){
        if(this.material!=null){
            this.updateMaterial();
        }

    }


}
