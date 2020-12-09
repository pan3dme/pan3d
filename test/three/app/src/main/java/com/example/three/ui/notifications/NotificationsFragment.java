package com.example.three.ui.notifications;

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
import androidx.fragment.app.Fragment;
import androidx.lifecycle.Observer;
import androidx.lifecycle.ViewModelProvider;

import com.example.three.R;
import com.z3d.base.CallBackFun;
import com.z3d.base.GroupBackFun;
import com.z3d.base.GroupItem;
import com.z3d.base.Object3D;
import com.z3d.display.BuildDisplay3DSprite;
import com.z3d.display.line.GridLineSprite;
import com.z3d.display.particle.CombineParticle;
import com.z3d.display.role.Display3dMovie;
import com.z3d.filemodel.GroupDataManager;
import com.z3d.filemodel.ParticleManager;
import com.z3d.res.BaseRes;
import com.z3d.res.GroupRes;
import com.z3d.res.SceneRes;
import com.z3d.scene.Scene3D;
import com.z3d.skill.SkillManager;
import com.z3d.vo.Vector2D;
import com.z3d.vo.Vector3D;

import org.json.JSONArray;
import org.json.JSONObject;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

public class NotificationsFragment extends Fragment {


    private GLSurfaceView _mGLView;
    private Scene3D _scene3d;
    private SceneRes _sceneRes;
    public View onCreateView(@NonNull LayoutInflater inflater,
                             ViewGroup container, Bundle savedInstanceState) {

        View root = inflater.inflate(R.layout.fragment_notifications, container, false);

        _mGLView =  root. findViewById(R.id.mNotionGLview);
        _mGLView.setEGLContextClientVersion(2);
        this.initScene();
        return root;
    }

    private  void initScene()
    {

        _mGLView.setRenderer(new GLSurfaceView.Renderer() {
            @Override
            public void onSurfaceCreated(GL10 gl, EGLConfig config) {
                _scene3d =new Scene3D();
                _scene3d.initData();
                SkillManager.getInstance().scene3D=_scene3d;

                _scene3d.camera3D.distance=550;
                GridLineSprite dis=new GridLineSprite( _scene3d);
                dis.changeColor(new Vector3D(1,1,1,1));
                _scene3d.addDisplay(dis);
                loadSceneByUrl("10002");
//                addRoleToSceneByUrl("yezhuz.txt",new Vector3D(0,0,500));
//                MeshDataManager.getInstance().reloadRoleRes("role/50011.txt");
//                SkillManager.getInstance().preLoadSkill("skill/jichu_1_byte.txt");
//                MeshDataManager.getInstance().reloadRoleRes("role/yezhuz.txt");
            }
            @Override
            public void onSurfaceChanged(GL10 gl, int width, int height) {
                GLES20.glViewport(0, 0, width, height);
                _scene3d.camera3D.fovw = width;
                _scene3d.camera3D.fovh = height;
                _scene3d.resizeScene();
            }
            @Override
            public void onDrawFrame(GL10 gl) {
                GLES20.glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
                GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);
                _scene3d.upFrame();
                _scene3d.camera3D.rotationY++;
            }
        });
        _mGLView.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
    }
    private void loadSceneByUrl(String val){
        this._sceneRes = new SceneRes();
        this._sceneRes.load("map/"+val+".txt", new CallBackFun() {
                    @Override
                    public void StateChange(boolean State) {
                        makeOBjData();
                    }
                }
        );
    }
    private void makeOBjData()
    {
        try {
            JSONArray buildItem=    this._sceneRes.sceneData.getJSONArray("buildItem");
            for(int i=0;i<buildItem.length();i++){
                this.parsingBuildItem((JSONObject)buildItem.get(i));
            }

            JSONObject fogColor=  this._sceneRes.sceneData.getJSONObject("fogColor");
            float d= (float) this._sceneRes.sceneData.getDouble("fogDistance");
            float s=  (float)  this._sceneRes.sceneData.getDouble("fogAttenuation");
            this._scene3d.fogColor=new Vector3D();
            this._scene3d.fogColor.x=fogColor.getLong("x")/255.0f;
            this._scene3d.fogColor.y=fogColor.getLong("y")/255.0f;
            this._scene3d.fogColor.z=fogColor.getLong("z")/255.0f;
            this._scene3d.fogData=new Vector2D(d * s,1 / ((1 - s) * d));


        } catch (Exception e) {
            e.printStackTrace();
        }
    }

    private  void parsingBuildItem(JSONObject obj)
    {

        try {
            int type = obj.getInt("type");
            if(type== BaseRes.PREFAB_TYPE){
                int id=obj.getInt("id");
                if( id==2){

                }
                BuildDisplay3DSprite tempDis=new BuildDisplay3DSprite();
                tempDis.scene3d=this._scene3d;
                tempDis.setInfo(obj);
                this._scene3d.addDisplay(tempDis);
            }
            if(type==BaseRes.SCENE_PARTICLE_TYPE){
                CombineParticle particle = this.getParticleSprite(obj);
                this._scene3d.particleManager.addParticle(particle);
            }

        } catch (Exception e) {
            e.printStackTrace();
        }


    }
    protected  CombineParticle getParticleSprite(JSONObject itemObj) {

        try {

            CombineParticle particle =      ParticleManager.getInstance().getParticleByte(   itemObj.getString( "url"));
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


//        particleManager.addParticle(particle);
//
//        particle.scaleX = itemObj.scaleX;
//        particle.scaleY = itemObj.scaleY;
//        particle.scaleZ = itemObj.scaleZ;
//
//        particle.x = itemObj.x;

    }//        particle.y = itemObj.y;
//        particle.z = itemObj.z;
//
//        particle.rotationX = itemObj.rotationX;
//        particle.rotationY = itemObj.rotationY;
//        particle.rotationZ = itemObj.rotationZ;
//        particle.type = 0;
//        this._sceneDic["particle" + itemObj.id] = particle;
//
//        return particle;



    private void  addRoleToSceneByUrl(String val,Vector3D pos)
    {
        GridLineSprite  dic=new GridLineSprite( _scene3d);
        dic.changeColor(new Vector3D(1,1,1,1));
        _scene3d.addDisplay(dic);

        Display3dMovie sc=new Display3dMovie(this._scene3d);
        sc.setRoleUrl("role/"+val);
        sc.scaleX=2;
        sc.scaleY=2;
        sc.scaleZ=2;
        sc.x=pos.x;
        sc.y=pos.y;
        sc.z=pos.z;
        _scene3d.addMovieDisplay(sc);
    }
    private void   playLyf(String url)
    {


        GroupDataManager.getInstance().getGroupData(url, new GroupBackFun() {
            @Override
            public void Bfun(GroupRes groupRes) {

                for (int i = 0; i < groupRes.dataAry.size(); i++) {
                    GroupItem item =  groupRes.dataAry.get(i);
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {

                        ParticleManager particleManager= _scene3d.particleManager;
                        CombineParticle particle =      ParticleManager.getInstance().getParticleByte(item.particleUrl);
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