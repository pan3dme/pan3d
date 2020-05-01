package com.one.five.obj;

import android.content.res.Resources;
import android.opengl.GLES20;
import android.util.Log;

import com.one.five.utils.MatrixUtils;

import java.util.Arrays;

import z3d.display.Display3D;


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
        onClear();
        this.drawOne();
        this.drawOTwo();
    }
    private void  drawOne()
    {

        onUseProgram();
        onSetExpandData();
        onDraw();
    }
    private void  drawOTwo()
    {

        onUseProgram();
        GLES20.glUniformMatrix4fv(mHMatrix,1,false,matrix,0);
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



        mProgram= uCreateGlProgram(vertex,fragment);
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
     * 清除画布
     */
    protected void onClear(){

    }

    /**
     * 设置其他扩展数据
     */
    protected void onSetExpandData(){

        Log.d("加载结算", mHMatrix+"");
        GLES20.glUniformMatrix4fv(mHMatrix,1,false,matrix,0);
    }

    //创建GL程序
    public static int uCreateGlProgram(String vertexSource, String fragmentSource){



        int vertex=uLoadShader(GLES20.GL_VERTEX_SHADER,vertexSource);
        if(vertex==0)return 0;
        int fragment=uLoadShader(GLES20.GL_FRAGMENT_SHADER,fragmentSource);
        if(fragment==0)return 0;
        int program= GLES20.glCreateProgram();
        if(program!=0){
            GLES20.glAttachShader(program,vertex);
            GLES20.glAttachShader(program,fragment);
            GLES20.glLinkProgram(program);

        }
        return program;
    }

    //加载shader
    public static int uLoadShader(int shaderType, String source){
        int shader= GLES20.glCreateShader(shaderType);
        if(0!=shader){
            GLES20.glShaderSource(shader,source);
            GLES20.glCompileShader(shader);
        }
        return shader;
    }


}
