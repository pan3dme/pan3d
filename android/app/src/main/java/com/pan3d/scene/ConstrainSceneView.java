package com.pan3d.scene;
import android.content.Context;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import androidx.constraintlayout.solver.widgets.Rectangle;

import com.pan3d.base.CallBackFun;
import com.pan3d.base.GroupBackFun;
import com.pan3d.base.GroupItem;
import com.pan3d.display.BuildDisplay3DSprite;
import com.pan3d.display.line.GridLineSprite;
import com.pan3d.display.particle.CombineParticle;
import com.pan3d.display.role.Display3dMovie;
import com.pan3d.display.role.SceneChar;
import com.pan3d.filemodel.ParticleManager;
import com.pan3d.frame3d.Frame3dSprite;
import com.pan3d.md5.Md5MoveSprite;
import com.pan3d.res.BaseRes;
import com.pan3d.res.GroupRes;
import com.pan3d.res.SceneRes;
import com.pan3d.vo.Vector2D;
import com.pan3d.vo.Vector3D;
import org.json.JSONArray;
import org.json.JSONObject;
import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;
public class ConstrainSceneView extends ViewGroup {
    private CallBackFun _initCompleteFun;
    public ConstrainSceneView(Context context,CallBackFun backFun) {
        super(context);
        _initCompleteFun =backFun;
        initData(1);
    }
    @Override
    protected void onLayout(boolean changed, int l, int t, int r, int b) {
        int childCount = getChildCount();
        for (int i = 0; i < childCount; i++) {
            View childView = getChildAt(i);
            childView.layout(i * getWidth(), t, (i + 1) * getWidth(), b);
        }
    }
    public Scene3D mainScene3D;
    private void initData( float skipnum){
        mainScene3D =new Scene3D();
        GLSurfaceView mGLView=new GLSurfaceView(this.getContext());
        this.addView(mGLView);

        mGLView.setEGLContextClientVersion(2);
        mGLView.setRenderer(new GLSurfaceView.Renderer() {
            @Override
            public void onSurfaceCreated(GL10 gl, EGLConfig config) {
                mainScene3D.initData();
                GridLineSprite dis=new GridLineSprite(mainScene3D);
                mainScene3D.addDisplay(dis);
                mainScene3D.camera3D.distance=1000;
                _initCompleteFun.StateChange(true);
            }
            @Override
            public void onSurfaceChanged(GL10 gl, int width, int height) {
                GLES20.glViewport(0, 0, width, height);
                mainScene3D.camera3D.fovw = width;
                mainScene3D.camera3D.fovh = height;
                mainScene3D.resizeScene();
            }
            @Override
            public void onDrawFrame(GL10 gl) {
                GLES20.glClearColor(60f / 255f,60f / 255f,60f / 255f, 1.0f);
                GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);
                mainScene3D.upFrame();
//                mainScene3D.camera3D.rotationY+=skipnum;
            }
        });
        mGLView.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
    }

    public void loadSceneByUrl( String val){
        SceneRes _sceneRes = new SceneRes(mainScene3D);
        _sceneRes.load("map/"+val+".txt", new CallBackFun() {
                    @Override
                    public void StateChange(boolean State) {
                        makeOBjData(mainScene3D,_sceneRes);
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
            int id=obj.getInt("id");
            if(type== BaseRes.PREFAB_TYPE){

                BuildDisplay3DSprite tempDis=new BuildDisplay3DSprite();
                tempDis.scene3D =scene3D;
                tempDis.setInfo(obj);
                scene3D.addDisplay(tempDis);
            }
            if(type==BaseRes.SCENE_PARTICLE_TYPE){
                if( id==180){

                }
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

    }
    public void  addRoleToSceneByUrl(  String val,Vector3D pos)
    {
        GridLineSprite  dic=new GridLineSprite(mainScene3D);
        dic.changeColor(new Vector3D(1,1,1,1));
        mainScene3D.addDisplay(dic);
        Display3dMovie sc=new Display3dMovie(mainScene3D);
        sc.setRoleUrl("role/"+val);
        sc.scaleX=2;
        sc.scaleY=2;
        sc.scaleZ=2;
        sc.x=pos.x;
        sc.y=pos.y;
        sc.z=pos.z;
        mainScene3D.addMovieDisplay(sc);
    }
    public void   playLyf(Scene3D scene3D,String url)
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

    public void setRect(Rectangle rect){
        ViewGroup.LayoutParams layoutParams=this.getLayoutParams();
        layoutParams.width=rect.width;
        layoutParams.height=rect.height;

        this.setLayoutParams(layoutParams);

        mainScene3D.camera3D.fovw=rect.width;
        mainScene3D.camera3D.fovh=rect.height;

    }

    public void addLoadFrame3dRes()
    {
        Frame3dSprite frame3dSprite=new Frame3dSprite(mainScene3D);

        mainScene3D.addDisplay(frame3dSprite);

    }
    public void   playParticle(String value)
    {
        //"model/"+str +"_lyf.txt"
//       String url="model/"+value +"_lyf.txt";
        String url=value;
        mainScene3D.groupDataManager.getGroupData(url, new GroupBackFun() {
            @Override
            public void Bfun(GroupRes groupRes) {
                for (int i = 0; i < groupRes.dataAry.size(); i++) {
                    GroupItem item =  groupRes.dataAry.get(i);
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                        ParticleManager particleManager= mainScene3D.particleManager;
                        CombineParticle particle =      mainScene3D.particleManager.getParticleByte(item.particleUrl);
                        particleManager.addParticle(particle);
                        Log.d("TAG", "Bfun: ");

                    } else {
                        Log.d("播放的不是单纯特效", "Bfun: ");
                    }
                }
            }
        });
    }
    public void  preLoadSkill(String val){//jichu_1_byte
        mainScene3D.skillManager.preLoadSkill("skill/"+val+".txt");
    }
    public void addLocaMd5(){
        Md5MoveSprite $sc = new Md5MoveSprite(mainScene3D);
        $sc.setMd5url("pan/expmd5/2/body.md5mesh", "pan/expmd5/2/stand.md5anim", "pan/expmd5/shuangdaonv.jpg");
        mainScene3D.addDisplay($sc);
    }
    public SceneChar addMovieDisplay(String val){
        SceneChar sceneChar=new SceneChar(mainScene3D);

        sceneChar.setRoleUrl(val);

        mainScene3D.addMovieDisplay(sceneChar);


        return sceneChar;

    }

}