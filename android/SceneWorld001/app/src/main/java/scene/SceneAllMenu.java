package scene;

import android.graphics.Bitmap;
import android.graphics.BitmapFactory;
import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.AdapterView;
import android.widget.GridView;
import android.widget.LinearLayout;
import android.widget.SimpleAdapter;

import androidx.appcompat.app.AppCompatActivity;

import com.e.sceneworld001.R;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.File;
import java.io.InputStream;
import java.net.HttpURLConnection;
import java.net.URL;
import java.net.URLConnection;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import scene.dis.TwoTextureSprite;
import urlhttp.CallBackUtil;
import urlhttp.UrlHttpUtil;
import z3d.base.ByteArray;
import z3d.base.CallBackFun;
import z3d.base.GroupBackFun;
import z3d.base.GroupItem;
import z3d.base.Object3D;
import z3d.base.Scene_data;
import z3d.base.TexTuresBackFun;
import z3d.display.BuildDisplay3DSprite;
import z3d.display.MaterialDisplay3DSprite;
import z3d.display.line.GridLineSprite;
import z3d.display.particle.CombineParticle;
import z3d.display.role.Display3dMovie;
import z3d.filemodel.GroupDataManager;
import z3d.filemodel.ParticleManager;
import z3d.filemodel.TextureManager;
import z3d.material.TextureRes;
import z3d.res.BaseRes;
import z3d.res.GroupRes;
import z3d.res.SceneRes;
import z3d.scene.Scene3D;
import z3d.units.LoaderThread;
import z3d.vo.Vector2D;
import z3d.vo.Vector3D;


public class SceneAllMenu extends AppCompatActivity   {


    private static final String TAG ="SceneLyfBase" ;
    private GLSurfaceView _mGLView;
    private Scene3D _scene3d;
    private SceneRes _sceneRes;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.scene001_layout);
        _mGLView =   findViewById(R.id.mGLView);
        _mGLView.setEGLContextClientVersion(2);

        Scene_data.fileRoot = "https://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/";
        LoaderThread.fileContext = getApplicationContext();
        _mGLView.setRenderer(new GLSurfaceView.Renderer() {
            @Override
            public void onSurfaceCreated(GL10 gl, EGLConfig config) {
                _scene3d =new Scene3D();
                GridLineSprite  dis=new GridLineSprite( _scene3d);
                dis.changeColor(new Vector3D(1,1,1,1));
                _scene3d.addDisplay(dis);

            }
            @Override
            public void onSurfaceChanged(GL10 gl, int width, int height) {
                GLES20.glViewport(0, 0, width, height);
                _scene3d.camera3D.fovw = width;
                _scene3d.camera3D.fovh = height;
                _scene3d.resizeScene();
                _scene3d.camera3D.distance=100;


            }
            @Override
            public void onDrawFrame(GL10 gl) {
                GLES20.glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
                GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);
                _scene3d.upFrame();
            }
        });
        _mGLView.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);

        initData();

    }
    private  void  initData(){
        _menuLayout=new LinearLayout(this);
        LinearLayout layout = (LinearLayout) findViewById(R.id.container);
        _menuLayout.setLayoutParams(new ViewGroup.LayoutParams( ViewGroup.LayoutParams.MATCH_PARENT,   ViewGroup.LayoutParams.MATCH_PARENT));
        layout.addView(_menuLayout);
        _selectRole();
    }
    LinearLayout _menuLayout;
    private  void addRootMenu(){

        List<String> arr=new ArrayList<>();
        arr.add("场景");
        arr.add("角色");
        arr.add("特效");
        arr.add("技能");
        arr.add("清理");
        arr.add("网格");
        arr.add("拉+");
        arr.add("推-");
        addButsByArr(arr, new CallBack() {
            @Override
            public void StateChange(Object val) {
                switch ((String) val){
                    case "场景":
                        _selectChangjing();
                        break;
                    case "角色":
                        _selectRole();
                        break;
                    case "特效":
                        _selectTexiao();
                        break;
                    case "技能":
                        break;
                    default:
                        break;
                }
            }


        });
    }
    private void _selectRole() {
        List<String> arr=new ArrayList<>();
        arr.add("50011");
        arr.add("50013");
        arr.add("50015");
        arr.add("yezhuz");
        arr.add("全部");
        arr.add("网格");
        arr.add("拉+");
        arr.add("推-");

        arr.add("清理");
        arr.add("返回");
        addButsByArr(arr, new CallBack() {
            @Override
            public void StateChange(Object val) {
                String str=(String) val;
                if(str.equals("全部")){
                    addRoleToSceneByUrl("50011.txt",new Vector3D(500,0,0));
                    addRoleToSceneByUrl("50013.txt",new Vector3D(0,0,0));
                    addRoleToSceneByUrl("50015.txt",new Vector3D(-500,0,0));
                    addRoleToSceneByUrl("yezhuz.txt",new Vector3D(0,0,500));

                }else if(str.equals("返回")){
                    addRootMenu();
                }else{

                    addRoleToSceneByUrl(str+".txt",new Vector3D());
                }
            }
        });
    }
    private void addButsByArr(List<String> arr, CallBack bfun){
        _menuLayout.removeAllViews();

        if(this._scene3d !=null){
            this._scene3d.clearAll();;
            GridLineSprite  dis=new GridLineSprite( _scene3d);
            dis.changeColor(new Vector3D(1,1,1,1));
            this._scene3d.addDisplay(dis);
        }
        addGridView(arr,bfun);
    }
    private void  addGridView(List<String> arr,CallBack bfun){
        List<Map<String, Object>> data_list=new ArrayList<>();
        for(int i=0;i<arr.size();i++){
            Map<String, Object> map = new HashMap<String, Object>();
            map.put("image", R.drawable.my_cell_sz001);
            map.put("text", arr.get(i));
            data_list.add(map);
        }
        GridView  gview =new GridView(this);
        gview.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT,
                ViewGroup.LayoutParams.WRAP_CONTENT));
        gview.setNumColumns(4);
        _menuLayout.addView(gview);
        String [] from ={"image","text"};
        int [] to = {R.id.image,R.id.text};
        SimpleAdapter sim_adapter = new SimpleAdapter(this,  data_list, R.layout.item, from, to);
        gview.setAdapter(sim_adapter);
        gview.setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                Log.d("检查：","OnItemClick功能实现！"+id);
                String str=arr.get(position);
                if(str=="拉+"){
                    _scene3d.camera3D.distance*=0.8;
                }else  if(str=="推-"){
                    _scene3d.camera3D.distance*=1.2;
                }else  if(str=="网格"){
                    GridLineSprite  dic=new GridLineSprite( _scene3d);
                    dic.changeColor(new Vector3D(1,1,1,1));
                    _scene3d.addDisplay(dic);

                }else  if(str=="清理"){
                    _scene3d.clearAll();
                }else
                {
                    bfun.StateChange(str);
                }

            }
        });

    }

    private void _selectChangjing(){
        List<String> arr=new ArrayList<>();
        arr.add("2012");
        arr.add("2013");
        arr.add("2014");
        arr.add("2015");
        arr.add("网格");
        arr.add("清理");
        arr.add("拉+");
        arr.add("推-");
        arr.add("返回");
        addButsByArr(arr, new CallBack() {
            @Override
            public void StateChange(Object val) {
                String str=(String) val;
                if(str.equals("返回")){
                    addRootMenu();
                }else{
                    loadSceneByUrl(str);
                }
            }
        });

    }
    private void _selectTexiao(){

        List<String> arr=new ArrayList<>();
        arr.add("levelup");
        arr.add("reviveeff");
        arr.add("10018");
        arr.add("10017");
        arr.add("13012");
        arr.add("diamondseffect");
        arr.add("拉+");
        arr.add("推-");
        arr.add("网格");
        arr.add("清理");
        arr.add("返回");
        addButsByArr(arr, new CallBack() {
            @Override
            public void StateChange(Object val) {
                String str=(String) val;
                if(str.equals("返回")){
                    addRootMenu();
                }else{
                     playLyf("model/"+str +"_lyf.txt");
                }

            }
        });
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
                    int id=obj.getInt("id");
                    if( obj.getInt("id")==2){

                    }
                    MaterialDisplay3DSprite tempDis=new MaterialDisplay3DSprite();
                    tempDis.scene3d=this._scene3d;
                    tempDis.setInfo(obj);
                    this._scene3d.addDisplay(tempDis);

                    break;
                default:
                    break;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }


    }

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

    public boolean onTouchEvent(MotionEvent event)
    {
        int events[] = {MotionEvent.ACTION_DOWN, MotionEvent.ACTION_MOVE,
                MotionEvent.ACTION_UP, MotionEvent.ACTION_MOVE, MotionEvent.ACTION_CANCEL, MotionEvent.ACTION_OUTSIDE,
                MotionEvent.ACTION_POINTER_DOWN,MotionEvent.ACTION_POINTER_UP,
                MotionEvent.EDGE_TOP,MotionEvent.EDGE_BOTTOM,MotionEvent.EDGE_LEFT,MotionEvent.EDGE_RIGHT};

        String szEvents[]={"ACTION_DOWN", "ACTION_MOVE",
                "ACTION_UP", "ACTION_MOVE", "ACTION_CANCEL", "ACTION_OUTSIDE",
                "ACTION_POINTER_DOWN","ACTION_POINTER_UP",
                "EDGE_TOP","EDGE_BOTTOM","EDGE_LEFT","EDGE_RIGHT"};
        for(int i=0; i < events.length; i++)
        {
            if(events[i] == event.getAction())
            {
                switch (szEvents[i]){
                    case "ACTION_DOWN":
                        _downPosV2d=new Vector2D( event.getX(), event.getY());
                        _oldPosV2d=new Object3D();
                        _oldPosV2d.x= _scene3d.camera3D.x;
                        _oldPosV2d.y= _scene3d.camera3D.y;
                        _oldPosV2d.z= _scene3d.camera3D.z;
                        _oldPosV2d.rotationX= _scene3d.camera3D.rotationX;
                        _oldPosV2d.rotationY= _scene3d.camera3D.rotationY;

                        break;
                    case "ACTION_MOVE":
                        if(_downPosV2d!=null){
                            Vector2D toV2d=   new Vector2D( event.getX(), event.getY());
                            _scene3d.camera3D.rotationY= _oldPosV2d.rotationY-(toV2d.x-_downPosV2d.x);
                            _scene3d.camera3D.rotationX= _oldPosV2d.rotationX-(toV2d.y-_downPosV2d.y)/10.0f;

                            //  Log.d(TAG+ TimeUtil.getTimer(), "滑动吧");
                        }
                        break;
                    case "ACTION_UP":
                        _downPosV2d=null;
                        break;
                    default:
                        break;
                }
                break;
            }
        }
        return super.onTouchEvent(event);
    }
    Vector2D _downPosV2d;
    Object3D _oldPosV2d;


}
