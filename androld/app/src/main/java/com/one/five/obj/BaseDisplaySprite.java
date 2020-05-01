package com.one.five.obj;

import android.content.res.Resources;
import android.opengl.GLES20;
import android.util.Log;

import com.one.five.utils.MatrixUtils;

import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.Arrays;

import z3d.display.Display3D;
import z3d.program.Shader3D;


public   class BaseDisplaySprite  extends Display3D {

    private static final String TAG="Filter";
    public static final float[] OM= MatrixUtils.getOriginalMatrix();
    public Shader3D shader3D;
    public Obj3D obj;
    private float[] matrix= Arrays.copyOf(OM,16);
    public BaseDisplaySprite( ){


    }
    public void setObj3D(Obj3D obj){


        ArrayList<Float> alvResult=new ArrayList<Float>();//结果顶点坐标列表
        alvResult.add(0f);
        alvResult.add(50f);
        alvResult.add(0f);

        alvResult.add(30f);
        alvResult.add(0f);
        alvResult.add(0f);

        alvResult.add(0f);
        alvResult.add(0f);
        alvResult.add(10f);


        alvResult.add(0f);
        alvResult.add(0f);
        alvResult.add(0f);

        alvResult.add(10f);
        alvResult.add(10f);
        alvResult.add(0f);

        alvResult.add(0f);
        alvResult.add(10f);
        alvResult.add(10f);

        this.obj=new Obj3D();
        setVert(alvResult);



    }
    private void setVert(ArrayList<Float> data){
        int size=data.size();
        ByteBuffer buffer=ByteBuffer.allocateDirect(size*4);
        buffer.order(ByteOrder.nativeOrder());
        obj.vert=buffer.asFloatBuffer();
        for (int i=0;i<size;i++){
            obj.vert.put(data.get(i));
        }
        obj.vert.position(0);
        obj.vertCount=size/3;
    }


    public void draw(){

        if(this.shader3D!=null){
            GLES20.glUseProgram(this.shader3D.program);

            GLES20.glUniformMatrix4fv(GLES20.glGetUniformLocation(this.shader3D.program,"vMatrix"),1,false,matrix,0);
            GLES20.glEnableVertexAttribArray(GLES20.glGetAttribLocation(this.shader3D.program, "vPosition"));
            GLES20.glVertexAttribPointer(0,3, GLES20.GL_FLOAT, false, 3*4,obj.vert);
            GLES20.glDrawArrays(GLES20.GL_TRIANGLES,0,obj.vertCount);
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
