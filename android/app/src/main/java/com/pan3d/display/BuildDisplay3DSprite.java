package com.pan3d.display;

import com.pan3d.base.MathCore;
import com.pan3d.base.Scene_data;
import com.pan3d.base.TexTuresBackFun;
import com.pan3d.core.Context3D;
import com.pan3d.material.TextureRes;

import org.json.JSONArray;
import org.json.JSONObject;

public class BuildDisplay3DSprite extends Display3DSprite {
    public static String TAG="Display3DSprite";
    public BuildDisplay3DSprite( ){
        super(null);
    }
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

            JSONArray tempArr= value.has("materialInfoArr")?value.getJSONArray("materialInfoArr"):null;

            this.setMaterialUrl((value.getString("materialurl")), MathCore.ObjArrToList( tempArr));

            if( value.has("lighturl")){
                this.setLighturl(value.getString("lighturl"));
            }


        } catch (Exception e) {
            e.printStackTrace();
        }

    }


    protected void setLighturl(String lighturl)
    {
        scene3D.textureManager.getTexture(Scene_data.fileRoot+lighturl, new TexTuresBackFun() {
            @Override
            public void Bfun(TextureRes value) {
                lightTextureRes=value;
            }
        });
    }
    private void showBaseModelUpData(){
        if(this.lightTextureRes!=null){
             scene3D.progrmaManager.registe(BuildDisplay3DShader.shaderNameStr,new BuildDisplay3DShader(scene3D));
            this.shader3D= scene3D.progrmaManager.getProgram(BuildDisplay3DShader.shaderNameStr);
            Context3D ctx= scene3D.context3D;

            ctx.setProgame(this.shader3D.program);
            ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D", scene3D.camera3D.modelMatrix.m);
            ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);
            ctx.setVa(this.shader3D,"v3Position",3,this.objData.vertexBuffer);

            TextureRes mainTextureRes  =getMainTextureRes();
            if(mainTextureRes!=null){
                ctx.setRenderTexture(material.shader,"fs0",mainTextureRes.textTureInt,0);
                ctx.setVa(this.shader3D,"v2TexCoord",2,this.objData.uvBuffer);
            }else{
                if(lightTextureRes!=null){
                    ctx.setRenderTexture(material.shader,"fs0",this.lightTextureRes.textTureInt,0);
                    ctx.setVa(this.shader3D,"v2TexCoord",2,this.objData.lightUvBuffer);
                }
            }
            ctx.drawCall(this.objData.indexBuffer,this.objData.treNum);
        }

    }



}
