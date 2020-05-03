package z3d.display;

import android.opengl.GLES20;

import com.one.five.utils.MatrixUtils;

import java.util.Arrays;

import z3d.base.ObjData;
import z3d.core.Context3D;

import z3d.program.Shader3D;


public   class Display3DSprite extends Display3D {

    private static final String TAG="Filter";
    public static final float[] OM= MatrixUtils.getOriginalMatrix();
    public Shader3D shader3D;
    public ObjData objData;
    private float[] matrix= Arrays.copyOf(OM,16);
    public Display3DSprite( ){


    }
    public void draw(){
        Context3D ctx=this.scene3d.context3D;

        if(this.shader3D!=null){
            GLES20.glUseProgram(this.shader3D.program);
            GLES20.glUniformMatrix4fv(GLES20.glGetUniformLocation(this.shader3D.program,"vMatrix"),1,false,matrix,0);

            ctx.setVcMatrix4fv(this.shader3D,"vMatrix",matrix);
            ctx.setVa(0,3,this.objData.vertexBuffer);
            ctx.setVaOffset(this.shader3D, "vPosition");

            GLES20.glDrawArrays(GLES20.GL_TRIANGLES,0, objData.treNum);
            GLES20.glDisableVertexAttribArray(0);
        }


    }



    public void setMatrix(float[] matrix){
        this.matrix=matrix;
    }
    public float[] getMatrix(){
        return matrix;
    }








}
