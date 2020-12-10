package com.example.four.ui.dashboard;

import android.graphics.Color;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.util.Log;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.TextView;

import androidx.annotation.NonNull;
import androidx.annotation.Nullable;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.example.four.R;
import com.z3d.base.CallBackFun;
import com.z3d.base.GroupBackFun;
import com.z3d.base.GroupItem;
import com.z3d.base.Object3D;
import com.z3d.display.BuildDisplay3DSprite;
import com.z3d.display.line.GridLineSprite;
import com.z3d.display.particle.CombineParticle;
import com.z3d.display.role.Display3dMovie;
import com.z3d.filemodel.ParticleManager;
import com.z3d.res.BaseRes;
import com.z3d.res.GroupRes;
import com.z3d.res.SceneRes;
import com.z3d.scene.Scene3D;
import com.z3d.vo.Vector2D;
import com.z3d.vo.Vector3D;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

public class DashboardFragment extends Fragment {

    private DashboardViewModel dashboardViewModel;

    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {
        dashboardViewModel =
                new ViewModelProvider(this).get(DashboardViewModel.class);
        View root = inflater.inflate(R.layout.fragment_dashboard, container, false);
        final TextView textView = root.findViewById(R.id.text_dashboard);
        dashboardViewModel.getText().observe(getViewLifecycleOwner(), new Observer<String>() {
            @Override
            public void onChanged(@Nullable String s) {
                textView.setText(s);
            }
        });
        rootView=root;
        return root;
    }

    @Override
    public void onViewCreated(@NonNull View view, @Nullable Bundle savedInstanceState) {
        super.onViewCreated(view, savedInstanceState);
        addGlviewInfo(R.id.glContentDashBoard,1);
        addGlviewInfoTwo(R.id.glContentDashBoardTwo,2);
    }

    private View rootView;


    private void addGlviewInfo(int id,float skipnum){
        Scene3D scene3d=new Scene3D();
        GLSurfaceView mGLView=new GLSurfaceView(this.getContext());
        final ConstraintLayout constraintlayout = rootView.findViewById(id);
        TextView textView=new TextView(this.getActivity());
        textView.setText("1123");
        textView.setTextColor(Color.rgb(255,0,255));
        constraintlayout.addView(mGLView);
        ViewGroup.LayoutParams layoutParams=mGLView.getLayoutParams();
        layoutParams.width=600;
        layoutParams.height=600;
        mGLView.setLayoutParams(layoutParams);
        constraintlayout.addView(textView);
        mGLView.setEGLContextClientVersion(2);

        mGLView.setRenderer(new GLSurfaceView.Renderer() {
            @Override
            public void onSurfaceCreated(GL10 gl, EGLConfig config) {

                scene3d.initData();
                GridLineSprite dis=new GridLineSprite( scene3d);
                scene3d.camera3D.distance=300;


                scene3d.addDisplay(dis);
                addRoleToSceneByUrl(scene3d,"yezhuz.txt",new Vector3D(0,0,0));
//                loadSceneByUrl( scene3d,"10002");


            }
            @Override
            public void onSurfaceChanged(GL10 gl, int width, int height) {
                GLES20.glViewport(0, 0, width, height);
                scene3d.camera3D.fovw = width;
                scene3d.camera3D.fovh = height;
                scene3d.resizeScene();
            }
            @Override
            public void onDrawFrame(GL10 gl) {
                GLES20.glClearColor(0.0f, 0.0f, 0.0f, 0.2f);
                GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);
                scene3d.upFrame();
                scene3d.camera3D.rotationY+=skipnum;
            }
        });
        mGLView.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
    }
    private void addGlviewInfoTwo(int id,float skipnum){
        Scene3D scene3d=new Scene3D();
        GLSurfaceView mGLView=new GLSurfaceView(this.getContext());
        final ConstraintLayout constraintlayout = rootView.findViewById(id);
        TextView textView=new TextView(this.getActivity());
        textView.setText("1123");
        textView.setTextColor(Color.rgb(255,0,255));
        constraintlayout.addView(mGLView);
        ViewGroup.LayoutParams layoutParams=mGLView.getLayoutParams();
        layoutParams.width=600;
        layoutParams.height=600;
        mGLView.setLayoutParams(layoutParams);
        constraintlayout.addView(textView);
        mGLView.setEGLContextClientVersion(2);

        mGLView.setRenderer(new GLSurfaceView.Renderer() {
            @Override
            public void onSurfaceCreated(GL10 gl, EGLConfig config) {

                scene3d.initData();

                scene3d.camera3D.distance=550;
                loadSceneByUrl( scene3d,"10002");

            }
            @Override
            public void onSurfaceChanged(GL10 gl, int width, int height) {
                GLES20.glViewport(0, 0, width, height);
                scene3d.camera3D.fovw = width;
                scene3d.camera3D.fovh = height;
                scene3d.resizeScene();
            }
            @Override
            public void onDrawFrame(GL10 gl) {
                GLES20.glClearColor(1.0f, 0.0f, 0.0f, 0.2f);
                GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);
                scene3d.upFrame();
                scene3d.camera3D.rotationY+=skipnum;
            }
        });
        mGLView.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
    }
 
    private void loadSceneByUrl(Scene3D scene3D, String val){
        SceneRes _sceneRes = new SceneRes( scene3D);
       _sceneRes.load("map/"+val+".txt", new CallBackFun() {
                    @Override
                    public void StateChange(boolean State) {
                        makeOBjData(scene3D ,_sceneRes);
                    }
                }
        );
    }
    private void makeOBjData(Scene3D scene3D,  SceneRes _sceneRes)
    {
        try {
            JSONArray buildItem=     _sceneRes.sceneData.getJSONArray("buildItem");
            for(int i=0;i<buildItem.length();i++){
                this.parsingBuildItem(scene3D,(JSONObject)buildItem.get(i));
            }

            JSONObject fogColor=   _sceneRes.sceneData.getJSONObject("fogColor");
            float d= (float)  _sceneRes.sceneData.getDouble("fogDistance");
            float s=  (float)   _sceneRes.sceneData.getDouble("fogAttenuation");
            scene3D.fogColor=new Vector3D();
            scene3D.fogColor.x=fogColor.getLong("x")/255.0f;
            scene3D.fogColor.y=fogColor.getLong("y")/255.0f;
            scene3D.fogColor.z=fogColor.getLong("z")/255.0f;
            scene3D.fogData=new Vector2D(d * s,1 / ((1 - s) * d));


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private  void parsingBuildItem(Scene3D scene3D, JSONObject obj)
    {

        try {
            int type = obj.getInt("type");
            if(type== BaseRes.PREFAB_TYPE){
                int id=obj.getInt("id");
                if( id==2){

                }
                BuildDisplay3DSprite tempDis=new BuildDisplay3DSprite();
                tempDis.scene3D =scene3D;
                tempDis.setInfo(obj);
                scene3D.addDisplay(tempDis);
            }
            if(type==BaseRes.SCENE_PARTICLE_TYPE){
                CombineParticle particle = this.getParticleSprite(scene3D,obj);
                scene3D.particleManager.addParticle(particle);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }


    }
    protected  CombineParticle getParticleSprite(Scene3D scene3D, JSONObject itemObj) {

        try {

            CombineParticle particle =     scene3D.particleManager.getParticleByte(   itemObj.getString( "url"));
            particle.type=0;

            particle.setX((float)itemObj.getDouble("x"));
            particle.setY((float) itemObj.getDouble("y"));
            particle.setZ((float)itemObj.getDouble("z"));

            particle.setScaleX((float)itemObj.getInt("scaleX"));
            particle.setScaleY( (float)itemObj.getInt("scaleY"));
            particle.setScaleZ((float)itemObj.getInt("scaleZ"));

            particle.setRotationX((float)itemObj.getDouble("rotationX"));
            particle.setRotationY((float) itemObj.getDouble("rotationY"));
            particle.setRotationZ((float)itemObj.getDouble("rotationZ"));




            return  particle;
        } catch (Exception e) {
            e.printStackTrace();
            return null;
        }

    }//        particle.y = itemObj.y;

    private void  addRoleToSceneByUrl(Scene3D scene3D,String val,Vector3D pos)
    {
        GridLineSprite  dic=new GridLineSprite( scene3D);
        dic.changeColor(new Vector3D(1,1,1,1));
        scene3D.addDisplay(dic);

        Display3dMovie sc=new Display3dMovie(scene3D);
        sc.setRoleUrl("role/"+val);
        sc.scaleX=2;
        sc.scaleY=2;
        sc.scaleZ=2;
        sc.x=pos.x;
        sc.y=pos.y;
        sc.z=pos.z;
        scene3D.addMovieDisplay(sc);
    }
    private void   playLyf(Scene3D scene3D,String url)
    {


        scene3D.groupDataManager.getGroupData(url, new GroupBackFun() {
            @Override
            public void Bfun(GroupRes groupRes) {

                for (int i = 0; i < groupRes.dataAry.size(); i++) {
                    GroupItem item =  groupRes.dataAry.get(i);
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {

                        ParticleManager particleManager= scene3D.particleManager;
                        CombineParticle particle =    scene3D.particleManager.getParticleByte(item.particleUrl);
                        particleManager.addParticle(particle);
                        Log.d("TAG", "Bfun: ");

                    } else {
                        Log.d("播放的不是单纯特效", "Bfun: ");
                    }
                }
            }
        });
    }

    Vector2D _downPosV2d;
    Object3D _oldPosV2d;



}