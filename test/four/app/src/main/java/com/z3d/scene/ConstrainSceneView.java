package com.z3d.scene;
import android.content.Context;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.util.Log;
import android.view.View;
import android.view.ViewGroup;

import androidx.constraintlayout.solver.widgets.Rectangle;

import com.z3d.base.CallBackFun;
import com.z3d.base.GroupBackFun;
import com.z3d.base.GroupItem;
import com.z3d.display.BuildDisplay3DSprite;
import com.z3d.display.line.GridLineSprite;
import com.z3d.display.particle.CombineParticle;
import com.z3d.display.role.Display3dMovie;
import com.z3d.display.role.SceneChar;
import com.z3d.filemodel.ParticleManager;
import com.z3d.frame3d.Frame3dSprite;
import com.z3d.md5.Md5MoveSprite;
import com.z3d.res.BaseRes;
import com.z3d.res.GroupRes;
import com.z3d.res.SceneRes;
import com.z3d.vo.Vector2D;
import com.z3d.vo.Vector3D;
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
    public Scene3D _scene3D;
    private void initData( float skipnum){
        _scene3D =new Scene3D();
        GLSurfaceView mGLView=new GLSurfaceView(this.getContext());
        this.addView(mGLView);

        mGLView.setEGLContextClientVersion(2);
        mGLView.setRenderer(new GLSurfaceView.Renderer() {
            @Override
            public void onSurfaceCreated(GL10 gl, EGLConfig config) {
                _scene3D.initData();
                GridLineSprite dis=new GridLineSprite(_scene3D);
                _scene3D.camera3D.distance=300;
                _scene3D.addDisplay(dis);

                _initCompleteFun.StateChange(true);
            }
            @Override
            public void onSurfaceChanged(GL10 gl, int width, int height) {
                GLES20.glViewport(0, 0, width, height);
                _scene3D.camera3D.fovw = width;
                _scene3D.camera3D.fovh = height;
                _scene3D.resizeScene();
            }
            @Override
            public void onDrawFrame(GL10 gl) {
                GLES20.glClearColor(0.0f, 0.0f, 0.0f, 0.2f);
                GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);
                _scene3D.upFrame();
                _scene3D.camera3D.rotationY+=skipnum;
            }
        });
        mGLView.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);
    }

    public void loadSceneByUrl( String val){
        SceneRes _sceneRes = new SceneRes(_scene3D);
        _sceneRes.load("map/"+val+".txt", new CallBackFun() {
                    @Override
                    public void StateChange(boolean State) {
                        makeOBjData(_scene3D,_sceneRes);
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

    }
    public void  addRoleToSceneByUrl(  String val,Vector3D pos)
    {
        GridLineSprite  dic=new GridLineSprite(_scene3D);
        dic.changeColor(new Vector3D(1,1,1,1));
        _scene3D.addDisplay(dic);
        Display3dMovie sc=new Display3dMovie(_scene3D);
        sc.setRoleUrl("role/"+val);
        sc.scaleX=2;
        sc.scaleY=2;
        sc.scaleZ=2;
        sc.x=pos.x;
        sc.y=pos.y;
        sc.z=pos.z;
        _scene3D.addMovieDisplay(sc);
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
    }

    public void addLoadFrame3dRes()
    {
        Frame3dSprite frame3dSprite=new Frame3dSprite(_scene3D);

        _scene3D.addDisplay(frame3dSprite);

    }
    public void   playParticle(String url)
    {
        //"model/"+str +"_lyf.txt"
        url="model/"+"10018" +"_lyf.txt";
        _scene3D.groupDataManager.getGroupData(url, new GroupBackFun() {
            @Override
            public void Bfun(GroupRes groupRes) {
                for (int i = 0; i < groupRes.dataAry.size(); i++) {
                    GroupItem item =  groupRes.dataAry.get(i);
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {
                        ParticleManager particleManager= _scene3D.particleManager;
                        CombineParticle particle =      _scene3D.particleManager.getParticleByte(item.particleUrl);
                        particleManager.addParticle(particle);
                        Log.d("TAG", "Bfun: ");

                    } else {
                        Log.d("播放的不是单纯特效", "Bfun: ");
                    }
                }
            }
        });
    }
    public void addLocaMd5(){
        Md5MoveSprite $sc = new Md5MoveSprite(_scene3D);
        https://webpan.oss-cn-shanghai.aliyuncs.com/res/pan/expmd5/shuangdaonv.jpg
        $sc.setMd5url("pan/expmd5/2/body.md5mesh", "pan/expmd5/2/stand.md5anim", "pan/expmd5/shuangdaonv.jpg");

        _scene3D.addDisplay($sc);
    }
    public void addSceneChar(){
        SceneChar sceneChar=new SceneChar(_scene3D);
        sceneChar.setRoleUrl("role/50011.txt");
        sceneChar.play(SceneChar.CharAction_stand);
        _scene3D.addMovieDisplay(sceneChar);
        sceneChar.addPart(SceneChar.WEAPON_PART ,SceneChar.WEAPON_DEFAULT_SLOT,"model/50011.txt" );
        sceneChar.setMountById("5104");
        sceneChar.play(SceneChar.CharAction_walk);

    }

}