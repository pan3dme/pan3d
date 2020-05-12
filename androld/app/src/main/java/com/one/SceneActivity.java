

package com.one;


import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.util.Log;
import android.view.InputDevice;
import android.view.MotionEvent;


import org.json.JSONArray;
import java.io.InputStream;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;
import z3d.base.CallBackFun;

import z3d.display.line.GridLineSprite;

import z3d.res.SceneRes;
import z3d.scene.Scene3D;


public class SceneActivity extends AppCompatActivity {

    private GLSurfaceView mGLView;
    private SceneRes sceneRes;

    private Scene3D scene3D;


    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_obj);
        mGLView= (GLSurfaceView) findViewById(R.id.mGLView);
        mGLView.setEGLContextClientVersion(2);



        mGLView.setRenderer(new GLSurfaceView.Renderer() {
            @Override
            public void onSurfaceCreated(GL10 gl, EGLConfig config) {


                loadSceneRes();
            }

            @Override
            public void onSurfaceChanged(GL10 gl, int width, int height) {
                GLES20.glViewport(0,0,width,height);

                scene3D.camera3D.fovw=width;
                scene3D.camera3D.fovh=height;
                scene3D.resizeScene();

            }

            @Override
            public void onDrawFrame(GL10 gl) {

                GLES20.glClearColor(1.0f, 1.0f, 1.0f, 1.0f);
                GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);
                scene3D.upFrame();


            }
        });
        mGLView.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
    }
    private void loadSceneRes()
    {

        this.scene3D=new Scene3D();
        this.sceneRes = new SceneRes();

        try {
            InputStream in = getResources().openRawResource(R.raw.file2012);
            //获取文件的字节数
            int lenght = in.available();
            //创建byte数组byte[]  buffer = new byte[lenght];
            byte[] buffer = new byte[lenght];
            //将文件中的数据读到byte数组中
            in.read(buffer);
            this.sceneRes.loadComplete(buffer ,new CallBackFun() {
                @Override
                public void StateChange(boolean State) {
                    Log.d("加载结算", "StateChange: ");
                    makeOBjData();
                }
            });


        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private void makeOBjData()
    {


        try {
            JSONArray buildItem=    this.sceneRes.sceneData.getJSONArray("buildItem");

            Log.d("dd", "makeOBjData: ");


            GridLineSprite dic=new GridLineSprite();
            dic.scene3d=this.scene3D;
            this.scene3D.addDisplay(dic);


        } catch (Exception e) {
            e.printStackTrace();
        }
    }


    @Override
    public boolean onGenericMotionEvent(MotionEvent event) {

        if (0 != (event.getSource() & InputDevice.SOURCE_CLASS_POINTER)) {
            switch (event.getAction()) {
                // process the scroll wheel movement...处理滚轮事件
                case MotionEvent.ACTION_SCROLL:
                    //获得垂直坐标上的滚动方向,也就是滚轮向下滚
                    if( event.getAxisValue(MotionEvent.AXIS_VSCROLL) < 0.0f){
                        Log.i("fortest::onGenericMotionEvent", "down" );
                    }
                    //获得垂直坐标上的滚动方向,也就是滚轮向上滚
                    else{
                        Log.i("fortest::onGenericMotionEvent", "up" );
                    }
                    return true;
            }
        }
        return super.onGenericMotionEvent(event);
    }


    @Override
    protected void onResume() {
        super.onResume();
        mGLView.onResume();
    }

    @Override
    protected void onPause() {
        super.onPause();
        mGLView.onPause();
    }
}