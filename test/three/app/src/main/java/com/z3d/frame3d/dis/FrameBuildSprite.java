package com.z3d.frame3d.dis;

import android.util.Log;

import org.json.JSONException;
import org.json.JSONObject;

import java.util.ArrayList;

import com.z3d.base.ObjData;
import com.z3d.core.Context3D;
import com.z3d.display.Display3DSprite;
import com.z3d.frame3d.FrameNodeVo;
import com.z3d.program.ProgrmaManager;
import com.z3d.program.Shader3D;
import com.z3d.scene.Scene3D;

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
       if( this.sceneVisible){
           for (int i=0;i<this.groupItem.size();i++){
               this.drawTempDisplay(this.groupItem.get(i));
           }
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
        ctx.setVcMatrix4fv(this.shader3D,"posMatrix3D",this.posMatrix3d.m);

    }


}
