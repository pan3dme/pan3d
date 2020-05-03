package com.one.five.obj;

import android.opengl.GLES20;

import com.one.five.utils.MatrixUtils;

import java.util.Arrays;

import z3d.base.ObjData;
import z3d.display.Display3D;
import z3d.program.Shader3D;


public   class BaseDisplaySprite  extends Display3D {

    private static final String TAG="Filter";
    public static final float[] OM= MatrixUtils.getOriginalMatrix();
    public Shader3D shader3D;
    public ObjData objData;
    private float[] matrix= Arrays.copyOf(OM,16);
    public BaseDisplaySprite( ){


    }
    public void draw(){

        if(this.shader3D!=null){
            GLES20.glUseProgram(this.shader3D.program);
            GLES20.glUniformMatrix4fv(GLES20.glGetUniformLocation(this.shader3D.program,"vMatrix"),1,false,matrix,0);
            GLES20.glEnableVertexAttribArray(GLES20.glGetAttribLocation(this.shader3D.program, "vPosition"));
            GLES20.glVertexAttribPointer(0,3, GLES20.GL_FLOAT, false, 3*4, objData.vertexBuffer);
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
