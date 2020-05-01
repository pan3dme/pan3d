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


public abstract class BaseDisplaySprite  extends Display3D {

    private static final String TAG="Filter";
    public static final float[] OM= MatrixUtils.getOriginalMatrix();
    public int mProgram;
    protected int mHPosition;
    protected int mHCoord;
    protected int mHMatrix;
    protected int mHTexture;
    public Obj3D obj;
    private float[] matrix= Arrays.copyOf(OM,16);
    public BaseDisplaySprite(Resources mRes){


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
    public void setVert(ArrayList<Float> data){
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
    public final void create(){
        onCreate();
    }

    public   void setSize(int width,int height){
        GLES20.glViewport(0,0,width,height);
    }

    public void draw(){

        onUseProgram();
        onSetExpandData();


        GLES20.glEnableVertexAttribArray(mHPosition);
        GLES20.glVertexAttribPointer(mHPosition,3, GLES20.GL_FLOAT, false, 3*4,obj.vert);
        GLES20.glDrawArrays(GLES20.GL_TRIANGLES,0,obj.vertCount);
        GLES20.glDisableVertexAttribArray(mHPosition);

    }


    public void setMatrix(float[] matrix){
        this.matrix=matrix;
    }
    public float[] getMatrix(){
        return matrix;
    }
    protected abstract void onCreate(

    );


    public final void createProgram(String vertex, String fragment){


        Shader3D vc=new Shader3D();
        vc.encode();

        mProgram= vc.program;
        mHPosition= GLES20.glGetAttribLocation(mProgram, "vPosition");
        mHCoord= GLES20.glGetAttribLocation(mProgram,"vCoord");
        mHMatrix= GLES20.glGetUniformLocation(mProgram,"vMatrix");
        mHTexture= GLES20.glGetUniformLocation(mProgram,"vTexture");
    }


    protected void onUseProgram(){
        GLES20.glUseProgram(mProgram);
    }

    /**
     * 启用顶点坐标和纹理坐标进行绘制
     */
    protected void onDraw(){

    }


    /**
     * 设置其他扩展数据
     */
    protected void onSetExpandData(){

        Log.d("加载结算", mHMatrix+"");
        GLES20.glUniformMatrix4fv(mHMatrix,1,false,matrix,0);
    }




}
