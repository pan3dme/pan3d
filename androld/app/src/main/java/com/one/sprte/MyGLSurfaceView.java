package com.one.sprte;

import android.content.Context;
import android.opengl.GLSurfaceView;
import android.util.AttributeSet;
import android.util.Log;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import z3d.program.Shader3D;

public class MyGLSurfaceView extends GLSurfaceView {

    private   Shape mRenderer;

    public MyGLSurfaceView(Context context) {
        super(context);

        // 创建OpenGL ES 2.0的上下文
        // 创建OpenGL ES 2.0的上下文
        setEGLContextClientVersion(2);

        mRenderer = new Shape() {
            @Override
            public void onSurfaceCreated(GL10 gl, EGLConfig config) {

                new  Shader3D().encode();

                Log.d("","aaa");
            }

            @Override
            public void onSurfaceChanged(GL10 gl, int width, int height) {

            }

            @Override
            public void onDrawFrame(GL10 gl) {

            }
        };

        //设置Renderer用于绘图
        setRenderer(mRenderer);

        //只有在绘制数据改变时才绘制view，可以防止GLSurfaceView帧重绘
        setRenderMode(GLSurfaceView.RENDERMODE_WHEN_DIRTY);

 
    }

}
