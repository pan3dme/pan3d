package com.one.five.obj;

import android.content.res.Resources;
import android.opengl.GLES20;
import android.util.Log;

import com.one.five.utils.MatrixUtils;

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
    private float[] matrix= Arrays.copyOf(OM,16);
    public BaseDisplaySprite(Resources mRes){


    }
    public final void create(){
        onCreate();
    }

    public final void setSize(int width,int height){
        onSizeChanged(width,height);
    }

    public void draw(){

        onUseProgram();
        onSetExpandData();
        onDraw();

    }


    public void setMatrix(float[] matrix){
        this.matrix=matrix;
    }
    public float[] getMatrix(){
        return matrix;
    }
    protected abstract void onCreate(

    );
    protected abstract void onSizeChanged(int width,int height);

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
