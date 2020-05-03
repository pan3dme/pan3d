package com.one;


import androidx.annotation.Nullable;
import androidx.appcompat.app.AppCompatActivity;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.opengl.Matrix;
import android.os.Bundle;
import android.util.Log;
import com.one.five.obj.BaseDisplaySprite;
import com.one.five.utils.Gl2Utils;
import org.json.JSONArray;
import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;
import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;
import z3d.base.CallBackFun;
import z3d.base.ObjData;
import z3d.program.Shader3D;
import z3d.res.SceneRes;


public class MainActivity extends AppCompatActivity {

    private GLSurfaceView mGLView;
    private SceneRes sceneRes;


    private List<BaseDisplaySprite> buildItem;

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
                float[] matrixA= Gl2Utils.getOriginalMatrix();

            }

            @Override
            public void onDrawFrame(GL10 gl) {

                GLES20.glClearColor(1.0f, 1.0f, 1.0f, 1.0f);
                GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);
                for(int i=0;buildItem!=null&&i< buildItem.size();i++){

                    if(i==1){

                        Matrix.rotateM(  buildItem.get(i).getMatrix(),0,0.3f,0,1,0);
                    }else{
                        Matrix.rotateM(  buildItem.get(i).getMatrix(),0,1.5f,0,1,0);
                    }
                    buildItem.get(i).draw();

                }

                Log.d("加载结算", "StateChange: ");

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


        try {
            JSONArray buildItem=    this.sceneRes.sceneData.getJSONArray("buildItem");

            Log.d("dd", "makeOBjData: ");

            this.buildItem=new ArrayList();
            BaseDisplaySprite a=new BaseDisplaySprite();
            a.objData =new ObjData();
            a.objData.makeTriModel();

            makeShaderA(a);
            this.buildItem.add(a);


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private  void makeShaderA(BaseDisplaySprite dis)
    {
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
                "gl_FragColor= vec4(1.0,0.0,1.0,1.0);\n"+
                "}";


        Shader3D vc=new Shader3D();
        vc.encode();
        vc.encodeVstr(vertex,fragment);

        dis.shader3D=vc;
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