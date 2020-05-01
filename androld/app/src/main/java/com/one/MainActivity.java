package com.one;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;

import android.content.Intent;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.opengl.Matrix;
import android.os.Bundle;
import android.util.Log;

import com.one.five.obj.Obj3D;
import com.one.five.obj.ObjFilter;
import com.one.five.utils.Gl2Utils;

import org.json.JSONArray;

import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;
import java.util.ListIterator;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import z3d.base.CallBackFun;
import z3d.program.Shader3D;
import z3d.res.SceneRes;


public class MainActivity extends AppCompatActivity {

    private GLSurfaceView mGLView;
    private ObjFilter mFilterA;
    private ObjFilter mFilterB;
    private Obj3D obj;
    private SceneRes sceneRes;
    private Shader3D modelShader3D;

    private List<ObjFilter> buildItem;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_obj);
        mGLView= (GLSurfaceView) findViewById(R.id.mGLView);
        mGLView.setEGLContextClientVersion(2);
        mFilterA=new ObjFilter(getResources());
        mFilterB=new ObjFilter(getResources());







        this.loadSceneRes();


        mGLView.setRenderer(new GLSurfaceView.Renderer() {
            @Override
            public void onSurfaceCreated(GL10 gl, EGLConfig config) {

                mFilterA.create();
                mFilterB.create();
                modelShader3D=new Shader3D();
                modelShader3D.encode();


            }

            @Override
            public void onSurfaceChanged(GL10 gl, int width, int height) {
                mFilterA.onSizeChanged(width, height);
                mFilterB.onSizeChanged(width, height);
                float[] matrixA= Gl2Utils.getOriginalMatrix();
                Matrix.scaleM(matrixA,0,0.2f,0.2f*width/height,0.2f);

                float[] matrixB= Gl2Utils.getOriginalMatrix();
                Matrix.scaleM(matrixB,0,0.2f,0.2f*width/height,0.2f);
                mFilterA.setMatrix(matrixA);
                mFilterB.setMatrix(matrixB);
            }

            @Override
            public void onDrawFrame(GL10 gl) {

                GLES20.glClearColor(1.0f, 1.0f, 1.0f, 1.0f);
                GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);
                for(int i=0;buildItem!=null&&i< buildItem.size();i++){
                    float[] matrixA= Gl2Utils.getOriginalMatrix();
                    Matrix.scaleM(matrixA,0,0.2f,0.2f*1,0.2f);
                    if(i==1){

                        Matrix.rotateM(  matrixA,0,0.3f,0,1,0);
                    }else{
                        Matrix.rotateM(  buildItem.get(i).getMatrix(),0,3.5f,0,1,0);
                    }
                    buildItem.get(i).draw();

                }

            }
        });
        mGLView.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
    }
    private void loadSceneRes()
    {

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


        mFilterA.setObj3D(null);
        mFilterB.setObj3D(null);


        try {
        JSONArray buildItem=    this.sceneRes.sceneData.getJSONArray("buildItem");

            Log.d("dd", "makeOBjData: ");

            this.buildItem=new ArrayList();
            this.buildItem.add(this.mFilterA);
            this.buildItem.add(this.mFilterB);

        } catch (Exception e) {
            e.printStackTrace();
        }
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