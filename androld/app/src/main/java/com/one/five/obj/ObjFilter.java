package com.one.five.obj;

import android.content.res.Resources;
import android.opengl.GLES20;

import com.one.five.filter.AFilter;


/**
 * Created by wuwang on 2017/1/8
 */

public class ObjFilter extends AFilter {

    private int vertCount;

    private int mHNormal;
    private Obj3D obj;

    private int textureId;

    public ObjFilter(Resources mRes) {
        super(mRes);
    }

    public void setObj3D(Obj3D obj){
        this.obj=obj;


    }

    @Override
    protected void initBuffer() {
        super.initBuffer();
    }

    @Override
    protected void onCreate() {


     String vertex= "attribute vec3 vPosition;\n"+

                "uniform mat4 vMatrix;\n"+
                "varying vec2 textureCoordinate;\n"+
                "void main(){\n"+
                "gl_Position = vMatrix*vec4(vPosition*0.1,1);\n"+

                "}";


        String fragment ="precision mediump float;\n"+
                "varying vec2 textureCoordinate;\n"+
                "varying vec4 vDiffuse;\n"+
                "void main() {\n"+
                "gl_FragColor= vec4(1.0,0.0,0.0,1.0);\n"+
                "}";

        createProgram (vertex,fragment);



        //打开深度检测
        GLES20.glEnable(GLES20.GL_DEPTH_TEST);



    }

    @Override
    protected void onClear() {
        super.onClear();
    }

    @Override
    protected void onDraw() {
        GLES20.glEnableVertexAttribArray(mHPosition);
        GLES20.glVertexAttribPointer(mHPosition,3, GLES20.GL_FLOAT, false, 3*4,obj.vert);
        GLES20.glDrawArrays(GLES20.GL_TRIANGLES,0,obj.vertCount);
        GLES20.glDisableVertexAttribArray(mHPosition);

    }

    @Override
    protected void onSizeChanged(int width, int height) {
        GLES20.glViewport(0,0,width,height);
    }


}
