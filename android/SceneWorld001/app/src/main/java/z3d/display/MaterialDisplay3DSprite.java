package z3d.display;
import android.util.Log;
import org.json.JSONArray;
import org.json.JSONObject;
import java.util.List;
import z3d.base.MathCore;
import z3d.base.ObjData;
import z3d.base.ObjDataBackFun;
import z3d.base.ObjDataManager;
import z3d.base.Scene_data;
import z3d.base.TexTuresBackFun;
import z3d.core.Context3D;
import z3d.filemodel.TextureManager;
import z3d.material.DynamicBaseTexItem;
import z3d.material.Material;
import z3d.material.MaterialBaseParam;
import z3d.material.TexItem;
import z3d.material.TextureRes;
import z3d.program.ProgrmaManager;
import z3d.scene.Scene3D;

public class MaterialDisplay3DSprite  extends Display3DSprite{
    public static String TAG="Display3DSprite";
    public TextureRes lightTextureRes;
    public MaterialDisplay3DSprite( ){
        super(null);
    }
    public MaterialDisplay3DSprite(Scene3D val ){
        super(val);
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
        TextureManager.getInstance().getTexture(Scene_data.fileRoot+lighturl, new TexTuresBackFun() {
            @Override
            public void Bfun(TextureRes value) {
                lightTextureRes=value;
            }
        });
        // this.loagTextTextureRes("https://cms-bucket.ws.126.net/2020/0526/1c932f5ej00qay0pi005vc000go00cic.jpg");
    }

    @Override
    protected void makeTempObjData() {
    }
    protected void  registetProgame()
    {

    }
    private void showBaseModelUpData(){
        if(this.lightTextureRes!=null){
            ProgrmaManager.getInstance().registe(BuildDisplay3DShader.shaderNameStr,new BuildDisplay3DShader());
            this.shader3D=ProgrmaManager.getInstance().getProgram(BuildDisplay3DShader.shaderNameStr);
            Context3D ctx=this.scene3d.context3D;
            ctx.setProgame(this.shader3D.program);
            ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D",this.scene3d.camera3D.modelMatrix.m);
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
    private TextureRes getMainTextureRes(){
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
        ProgrmaManager.outShader(this.shader3D.vertex,"vertex");
        ProgrmaManager.outShader(this.shader3D.fragment,"fragment");
        Context3D ctx=this.scene3d.context3D;
        ctx.setProgame(this.shader3D.program);
        this.setVc();
        this.setMaterialTexture(this.material,this.materialParam);
        this.setMaterialVa();

    }
    protected void setVc()
    {
        Context3D ctx=this.scene3d.context3D;
        ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D",this.scene3d.camera3D.modelMatrix.m);
        ctx.setVcMatrix4fv(this.shader3D,"posMatrix",this.modeMatrix.m);

    }
    protected void setMaterialVa()
    {
        Context3D ctx=this.scene3d.context3D;
        ctx.setVa(this.shader3D,"v3Position",3,this.objData.vertexBuffer);
        ctx.setVa(this.shader3D,"v2TexCoord",2,this.objData.uvBuffer);
        ctx.drawCall(this.objData.indexBuffer,this.objData.treNum);

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
                ctx.setRenderTexture(material.shader,"fs0",this.lightTextureRes.textTureInt,0);
                ctx.setRenderTexture(material.shader,texItem.name,this.lightTextureRes.textTureInt,texItem.get_id());
            }
        }

    }
    @Override
    public void upData(){
        if(this.material!=null){
//            updateMaterial();
            showBaseModelUpData();
        }

    }


}
