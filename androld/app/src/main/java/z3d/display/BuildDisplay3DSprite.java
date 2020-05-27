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
import z3d.material.TextureRes;
import z3d.program.ProgrmaManager;
import z3d.program.Shader3D;
import z3d.units.LoadBackFun;
import z3d.units.LoadManager;
import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;

public class BuildDisplay3DSprite extends Display3DSprite {

    public static String TAG="Display3DSprite";

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


            this.setMaterialUrl((value.getString("materialurl")), MathCore.ObjArrToList( value.getJSONArray("materialInfoArr")));

            if( value.has("lighturl")){
               // this.loadLightTexture(value.getString("lighturl"));
            }
            this.makeBaseTexture();

        } catch (Exception e) {
            e.printStackTrace();
        }

    }



    @Override
    protected void makeTempObjData() {

    }

    protected void  registetProgame()
    {

        ProgrmaManager.getInstance().registe(BuildDisplay3DShader.shaderStr,new BuildDisplay3DShader());
        this.shader3D=ProgrmaManager.getInstance().getProgram(BuildDisplay3DShader.shaderStr);

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

    protected void setMaterialTexture(Material material, MaterialBaseParam mp)
    {
         super.setMaterialTexture(material,mp);
    }

    @Override
    public void upFrame(){
        if(this.material!=null){
            this.updateMaterial();
        }else{
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


}
