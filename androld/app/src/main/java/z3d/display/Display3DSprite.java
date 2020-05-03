package z3d.display;

import android.opengl.GLES20;

import com.one.five.utils.MatrixUtils;

import java.util.Arrays;

import z3d.base.ObjData;
import z3d.core.Context3D;

import z3d.program.Shader3D;
import z3d.vo.Matrix3D;
import z3d.vo.Vector3D;


public   class Display3DSprite extends Display3D {

    private static final String TAG="Filter";

    public Shader3D shader3D;
    public ObjData objData;
    public Matrix3D modeMatrix;


    private int skipNum;
    public Display3DSprite( ){

        this.skipNum=0;
        this.modeMatrix=new Matrix3D();
    }
    public void upFrame(){
        Context3D ctx=this.scene3d.context3D;

        if(this.shader3D!=null){


            this.modeMatrix.appendRotation(1, Vector3D.Z_AXIS);
            ctx.setProgame(this.shader3D.program);
            ctx.setVcMatrix4fv(this.shader3D,"vMatrix",this.modeMatrix.m);
            ctx.setVa(0,3,this.objData.vertexBuffer);
            ctx.setVaOffset(this.shader3D, "vPosition");
            ctx.drawCall(objData.treNum);


            GLES20.glDisableVertexAttribArray(0);
        }


    }



}
