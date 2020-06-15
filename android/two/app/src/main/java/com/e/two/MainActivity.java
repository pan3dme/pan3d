package com.e.two;

import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.util.Log;
import android.view.View;

import androidx.appcompat.app.AppCompatActivity;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.InputStream;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import z3d.base.ByteArray;
import z3d.base.CallBackFun;
import z3d.base.GroupBackFun;
import z3d.base.GroupItem;
import z3d.base.Scene_data;
import z3d.base.SkillBackFun;
import z3d.display.BuildDisplay3DSprite;
import z3d.display.Display3DSprite;
import z3d.display.basedis.DisplayTestSprite;
import z3d.display.line.GridLineSprite;
import z3d.display.particle.CombineParticle;
import z3d.display.role.Display3dMovie;
import z3d.filemodel.GroupDataManager;
import z3d.filemodel.ParticleManager;
import z3d.res.BaseRes;
import z3d.res.GroupRes;
import z3d.res.SceneRes;
import z3d.res.SkillRes;
import z3d.scene.Scene3D;
import z3d.units.LoaderThread;

public class MainActivity extends AppCompatActivity implements View.OnClickListener {
    private GLSurfaceView mGLView;
    private SceneRes sceneRes;
    private Scene3D scene3D;
    @Override
    protected void onCreate(Bundle savedInstanceState) {

        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mGLView= (GLSurfaceView) findViewById(R.id.mGLView);
        mGLView.setEGLContextClientVersion(2);
        Scene_data.fileRoot = "http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/";
        LoaderThread.fileContext=getApplicationContext();
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
        GridLineSprite dic=new GridLineSprite();
        dic.scene3d=this.scene3D;
//        this.scene3D.addDisplay(dic);
//        DisplayTestSprite b=new DisplayTestSprite();
//        b.scene3d=this.scene3D;
//        this.scene3D.addDisplay(b);

        this.loadSeneBase();
        this.addRoleToScene();
//        this.playLyf();

    }
    private void   playLyf()
    {
        String url="model/levelup_lyf.txt";
        GroupDataManager.getInstance().getGroupData(url, new GroupBackFun() {
            @Override
            public void Bfun(GroupRes groupRes) {


                for (int i = 0; i < groupRes.dataAry.size(); i++) {
                    GroupItem item =  groupRes.dataAry.get(i);
                    if (item.types ==BaseRes.SCENE_PARTICLE_TYPE) {
//          [particleManager addParticle:particle];
                        ParticleManager particleManager=scene3D.particleManager;
                       CombineParticle  particle =      ParticleManager.getInstance().getParticleByte(item.particleUrl);
                        particleManager.addParticle(particle);
                        Log.d("TAG", "Bfun: ");

                    } else {
                        Log.d("播放的不是单纯特效", "Bfun: ");
                    }
                }
            }
        });
    }

    private void  addRoleToScene()
    {
        //        sc.setRoleUrl("role/yezhuz.txt");
//        sc.setRoleUrl("role/50004.txt");
//        sc.setRoleUrl("role/50005.txt");
//        sc.setRoleUrl("role/50005.txt");
//        sc.setRoleUrl("role/50011.txt");


        Display3dMovie sc=new Display3dMovie();
        sc.scene3d=this.scene3D;


        sc.setRoleUrl("role/yezhuz.txt");
        scene3D.addMovieDisplay(sc);



    }


    private void loadSeneBase()
    {

        try {
            InputStream in = getResources().openRawResource(R.raw.file2012);
            //获取文件的字节数
            int lenght = in.available();
            //创建byte数组byte[]  buffer = new byte[lenght];
            byte[] buffer = new byte[lenght];
            //将文件中的数据读到byte数组中
            in.read(buffer);
            this.sceneRes = new SceneRes();
            this.sceneRes.loadComplete(new ByteArray(buffer) ,new CallBackFun() {
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
            for(int i=0;i<buildItem.length();i++){
                this.parsingBuildItem((JSONObject)buildItem.get(i));
            }
        } catch (Exception e) {
            e.printStackTrace();
        }


    }

    private  void parsingBuildItem(JSONObject obj)
    {
        try {
            int type = obj.getInt("type");
            switch ( type) {
                case 1:
                    //35 58  34 32 1 19 2
                    int id=obj.getInt("id");
                    if( obj.getInt("id")==1){

                    }
                    BuildDisplay3DSprite tempDis=new BuildDisplay3DSprite();
                    tempDis.scene3d=this.scene3D;
                    tempDis.setInfo(obj);
                    this.scene3D.addDisplay(tempDis);

                    break;
                default:
                    break;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }


    }


    @Override
    public void onClick(View v) {
        Log.d("onClick", "onClick: ");
    }

}