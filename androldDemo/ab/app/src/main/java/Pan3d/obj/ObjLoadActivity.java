package Pan3d.obj;

import android.opengl.GLSurfaceView;
import android.opengl.Matrix;
import android.os.Bundle;
import android.support.annotation.Nullable;
import android.support.v7.app.AppCompatActivity;
import android.util.Log;

import java.io.InputStream;
import java.nio.ByteBuffer;
import java.nio.ByteOrder;
import java.util.ArrayList;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import edu.wuwang.opengl.R;
import Pan3d.utils.Gl2Utils;
import z3d.base.CallBackFun;
import z3d.program.Shader3D;
import z3d.res.SceneRes;

/**
 * Created by wuwang on 2017/1/7
 */

public class ObjLoadActivity extends AppCompatActivity {

    private GLSurfaceView mGLView;
    private ObjFilter mFilter;
    private Obj3D obj;
    private SceneRes sceneRes;
    private Shader3D modelShader3D;

    @Override
    protected void onCreate(@Nullable Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_obj);
        mGLView= (GLSurfaceView) findViewById(R.id.mGLView);
        mGLView.setEGLContextClientVersion(2);
        mFilter=new ObjFilter(getResources());





        this.loadSceneRes();


        mGLView.setRenderer(new GLSurfaceView.Renderer() {
            @Override
            public void onSurfaceCreated(GL10 gl, EGLConfig config) {

                mFilter.create();
                modelShader3D=new Shader3D();
                modelShader3D.encode();


            }

            @Override
            public void onSurfaceChanged(GL10 gl, int width, int height) {
                mFilter.onSizeChanged(width, height);
                float[] matrix=Gl2Utils.getOriginalMatrix();
                Matrix.scaleM(matrix,0,0.2f,0.2f*width/height,0.2f);
                mFilter.setMatrix(matrix);
            }

            @Override
            public void onDrawFrame(GL10 gl) {
                Matrix.rotateM(mFilter.getMatrix(),0,0.3f,0,1,0);

                //
                mFilter.draw();
                // mFilter.mProgram=modelShader3D.program;

                Log.d("abc-", "onDrawFrame: "+    modelShader3D.program);
                Log.d("abc-", "onDrawFrame: "+    mFilter.mProgram);
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
        ArrayList<Float> alvResult=new ArrayList<Float>();//结果顶点坐标列表
        alvResult.add(0f);
        alvResult.add(30f);
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

        obj=new Obj3D();
        setVert(alvResult);
        mFilter.setObj3D(obj);
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
