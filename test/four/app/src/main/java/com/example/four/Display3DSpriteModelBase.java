package com.example.four;

import android.util.Log;

import com.pan3d.base.ObjData;
import com.pan3d.base.ObjDataBackFun;
import com.pan3d.core.Context3D;
import com.pan3d.display.Display3D;
import com.pan3d.display.Display3DSprite;
import com.pan3d.display.basedis.DisplayBaseShader;
import com.pan3d.program.Shader3D;
import com.pan3d.scene.Scene3D;
import com.pan3d.vo.Matrix3D;


public class Display3DSpriteModelBase extends Display3DSprite {


    public Display3DSpriteModelBase(Scene3D val){
        super(val);

    }



    @Override
    public void updateMaterial() {
        Context3D ctx= scene3D.context3D;

        if(this.objData!=null){
 
            this.shader3D=this.material.shader;
            ctx.setProgame(this.shader3D.program);

            this.modeMatrix=new Matrix3D();
            this.modeMatrix.prependScale(12,12,12);


            ctx.setVcMatrix4fv(this.shader3D,"vpMatrix3D", scene3D.camera3D.modelMatrix.m);
            ctx.setVcMatrix4fv(this.shader3D,"posMatrix", modeMatrix.m);

            ctx.setVa(this.shader3D,"vPosition",3,this.objData.vertexBuffer);

            ctx.drawCall(this.objData.indexBuffer,this.objData.treNum);


        }

    }
}
