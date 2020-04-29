/*
 *
 * Shape.java
 *
 * Created by Wuwang on 2016/9/30
 */
package com.one.sprte;

import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.util.Log;
import com.one.BoxSprite3D;
import java.util.Timer;
import java.util.TimerTask;
import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

/**
 * Description:
 */
public abstract class Shape implements GLSurfaceView.Renderer {

    private BoxSprite3D  boxSprite3D;
    private Timer mTimer1;
    private TimerTask mTask1;
    private GL10 ctxGl;
    private int skipNum;

    public  Shape(){
        super();
        this.skipNum=0;
    }

    public int loadShader(int type, String shaderCode){
        //根据type创建顶点着色器或者片元着色器
        int shader = GLES20.glCreateShader(type);
        //将资源加入到着色器中，并编译
        GLES20.glShaderSource(shader, shaderCode);
        GLES20.glCompileShader(shader);
        return shader;
    }
    @Override
    public void onSurfaceCreated(final GL10 gl, EGLConfig config) {

        this.ctxGl=gl;
        this.boxSprite3D=new BoxSprite3D();

        mTimer1 = new Timer();
        mTask1 = new TimerTask() {
            @Override
            public void run() {


                Log.d("ctxGl000------", "run: onDrawFrame");
                onDrawFrame(ctxGl);

            }
        };
        mTimer1.schedule(mTask1, 0, 1000/6);


    }
    @Override
    public void onSurfaceChanged(GL10 gl, int width, int height) {
        gl.glViewport(0, 0, width, height);

//        gl.glClearColor(0.0f,0.0f,0.0f,1);
//        gl.glClear(GL10.GL_COLOR_BUFFER_BIT| GL10.GL_DEPTH_BUFFER_BIT);

    }
    @Override
    public void onDrawFrame(GL10 gl) {

        this.skipNum++;

        /*
        gl.glClearColor((float) Math.random(), (float) Math.random(), (float) Math.random(), 1);

        if(this.skipNum%2==1){

            gl.glClearColor(0.0f,0.0f,1.0f,1);
            Log.d("this.1111","skipNum->"+this.skipNum);
        }else{

            gl.glClearColor(1.0f,0.0f,1.0f,1);
            Log.d("this.2222","skipNum->"+this.skipNum);
        }
        gl.glClear(GL10.GL_COLOR_BUFFER_BIT| GL10.GL_DEPTH_BUFFER_BIT);

     */


        if(this.skipNum%2==1){

            GLES20.glClearColor(1.0f, 0.0f, 1.0f, 1.0f);

            Log.d("this.1111","skipNum->"+this.skipNum);
        }else{

            GLES20.glClearColor(1.0f, 1.0f, 0.0f, 1.0f);

            Log.d("this.2222","skipNum->"+this.skipNum);
        }
        GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);

       // gl.eglSwapBuffers(this, gl);


    }

}
