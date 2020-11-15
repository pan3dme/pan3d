package z3d.frame3d.dis;

import android.util.Log;

import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;
import java.util.List;

import z3d.base.ObjData;
import z3d.core.Context3D;
import z3d.display.Display3DSprite;
import z3d.frame3d.FrameNodeVo;
import z3d.md5.Md5MoveShader;
import z3d.program.ProgrmaManager;
import z3d.program.Shader3D;
import z3d.scene.Scene3D;
import z3d.vo.DualQuatFloat32Array;

public class FrameBuildSprite  extends FrameBaseDisplay {
    private static final String TAG ="FrameBuildSprite" ;
    public FrameBuildSprite(Scene3D val) {
        super(val);
        ProgrmaManager.getInstance().registe(FrameBuildShader.FrameBuildShader,new FrameBuildShader());
        this.shader3D=ProgrmaManager.getInstance().getProgram(FrameBuildShader.FrameBuildShader);
    }
    @Override
    public void setFrameNodeUrl(FrameNodeVo $vo) {
        super.setFrameNodeUrl($vo);
        this.groupItem = new ArrayList<>();
        Display3DSprite $dis = new Display3DSprite(this.scene3d);
        $dis.setObjUrl($vo.resurl);
        try {
            JSONObject objInfo=(JSONObject)$vo.materialInfoArr.get(0);
            $dis.setPicUrl(objInfo.getString("url"));
        } catch (JSONException e) {

        }

        this.groupItem.add($dis);
    }
    @Override
    public void upData() {
        super.upData();
        for (int i=0;i<this.groupItem.size();i++){
            this.drawTempDisplay(this.groupItem.get(i));
        }
    }
    private void drawTempDisplay(Display3DSprite display) {
        if(display.objData==null){
            return;
        }
        ObjData objData= display.objData;

        Log.d(TAG, "drawTempDisplay: ");
        Context3D ctx=this.scene3d.context3D;
        ctx.setProgame(this.shader3D.program);
        this.setVc();
        ctx.setVa(this.shader3D,"pos",3,objData.vertexBuffer);
        ctx.setVa(this.shader3D,"v2Uv",2,objData.uvBuffer);
        ctx.setRenderTexture(this.shader3D,"fs0",display.baseTextureRes.textTureInt,0);
        ctx.drawCall(display.objData.indexBuffer,objData.treNum);

    }

    protected void setVc()
    {
        Context3D ctx=this.scene3d.context3D;
        ctx.setVcMatrix4fv(this.shader3D, Shader3D.vpMatrix3D,this.scene3d.camera3D.modelMatrix.m);
        this.posMatrix3d.identity();
        ctx.setVcMatrix4fv(this.shader3D,"posMatrix3D",this.posMatrix3d.m);

    }


}
