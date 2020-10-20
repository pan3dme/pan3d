package scene;

import android.opengl.GLES20;
import android.opengl.GLSurfaceView;
import android.os.Bundle;
import android.util.Log;
import android.view.MotionEvent;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Button;
import android.widget.LinearLayout;

import androidx.appcompat.app.AppCompatActivity;

import com.e.sceneworld001.R;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.InputStream;
import java.util.ArrayList;
import java.util.List;

import javax.microedition.khronos.egl.EGLConfig;
import javax.microedition.khronos.opengles.GL10;

import z3d.base.ByteArray;
import z3d.base.CallBackFun;
import z3d.base.GroupBackFun;
import z3d.base.GroupItem;
import z3d.base.Object3D;
import z3d.base.Scene_data;
import z3d.display.BuildDisplay3DSprite;
import z3d.display.line.GridLineSprite;
import z3d.display.particle.CombineParticle;
import z3d.display.role.Display3dMovie;
import z3d.filemodel.GroupDataManager;
import z3d.filemodel.ParticleManager;
import z3d.res.BaseRes;
import z3d.res.GroupRes;
import z3d.res.SceneRes;
import z3d.scene.Scene3D;
import z3d.units.LoaderThread;
import z3d.vo.Vector2D;
import z3d.vo.Vector3D;

public class SceneAllMenu extends AppCompatActivity  {


    private static final String TAG ="SceneLyfBase" ;
    private GLSurfaceView mGLView;
    private Scene3D scene3d;
    private SceneRes sceneRes;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.scene001_layout);
        mGLView =   findViewById(R.id.mGLView);
        mGLView.setEGLContextClientVersion(2);
        Scene_data.fileRoot = "http://jilioss.oss-cn-hongkong.aliyuncs.com/rb_ios/a/res/";
        LoaderThread.fileContext = getApplicationContext();
        mGLView.setRenderer(new GLSurfaceView.Renderer() {
            @Override
            public void onSurfaceCreated(GL10 gl, EGLConfig config) {
                loadSceneRes();
            }
            @Override
            public void onSurfaceChanged(GL10 gl, int width, int height) {
                GLES20.glViewport(0, 0, width, height);
                scene3d.camera3D.fovw = width;
                scene3d.camera3D.fovh = height;
                scene3d.resizeScene();
                scene3d.camera3D.distance=100;
            }
            @Override
            public void onDrawFrame(GL10 gl) {
                GLES20.glClearColor(0.0f, 0.0f, 0.0f, 1.0f);
                GLES20.glClear(GLES20.GL_COLOR_BUFFER_BIT | GLES20.GL_DEPTH_BUFFER_BIT);
                scene3d.upFrame();
            }
        });
        mGLView.setRenderMode(GLSurfaceView.RENDERMODE_CONTINUOUSLY);


        _menuLayout=new LinearLayout(this);
        LinearLayout layout = (LinearLayout) findViewById(R.id.container);
        _menuLayout.setLayoutParams(new ViewGroup.LayoutParams( ViewGroup.LayoutParams.MATCH_PARENT,   ViewGroup.LayoutParams.MATCH_PARENT));
        layout.addView(_menuLayout);

        this.addBaseMenuList();

    }
    LinearLayout _menuLayout;
    private  void addBaseMenuList(){


        if(this.scene3d!=null){
            this.scene3d.clearAll();;
        }
        List<String> arr=new ArrayList<>();
        arr.add("场景");
        arr.add("角色");
        arr.add("特效");
        arr.add("技能");
        arr.add("清理");
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
                        selectTexiao();
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
        arr.add("50014");
        arr.add("50015");
        //yezhuz
        arr.add("返回");
        addButsByArr(arr, new CallBack() {
            @Override
            public void StateChange(Object val) {
                String str=(String) val;
                if(str.equals("返回")){
                    addBaseMenuList();
                }else{
                    addRoleToSceneByUrl(str+".txt");
                }
            }
        });

    }
    private void addButsByArr(List<String> arr, CallBack bfun){
        _menuLayout.removeAllViews();
        for(int i=0;i<arr.size();i++){
            this.addTempBut(arr.get(i),bfun);
        }
    }
    private void addTempBut(String val,CallBack bfun )
    {
//        LinearLayout layout = (LinearLayout) findViewById(R.id.container);
        Button bn = new Button(this);
        bn.setText(val);
//        bn.setLayoutParams(new ViewGroup.LayoutParams(    ViewGroup.LayoutParams.WRAP_CONTENT,   ViewGroup.LayoutParams.WRAP_CONTENT));
        _menuLayout.addView(bn);
        bn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View arg0) {
        bfun.StateChange(val);
            }
        });
    }
    private void _selectChangjing(){
        List<String> arr=new ArrayList<>();
        arr.add("1001");
        arr.add("1002");
        arr.add("1003");
        arr.add("返回");
        addButsByArr(arr, new CallBack() {
            @Override
            public void StateChange(Object val) {
               String str=(String) val;
               if(str.equals("返回")){
                   addBaseMenuList();
               }else{
                   loadSceneByUrl(str);
               }
            }
        });
    }
    private void  selectTexiao(){
        //            [lyfItem addObject:@"model/diamondseffect_lyf.txt"];
        //            [lyfItem addObject:@"model/levelup_lyf.txt"];
        //            [lyfItem addObject:@"model/reviveeff_lyf.txt"];
        //            [lyfItem addObject:@"model/10017_lyf.txt"];
        //            [lyfItem addObject:@"model/10018_lyf.txt"];
        //            [lyfItem addObject:@"model/13012_lyf.txt"];
        List<String> arr=new ArrayList<>();
        arr.add("levelup");
        arr.add("reviveeff");
        arr.add("10017");
        arr.add("返回");
        addButsByArr(arr, new CallBack() {
            @Override
            public void StateChange(Object val) {
                String str=(String) val;
                if(str.equals("返回")){
                    addBaseMenuList();
                }else{

                    playLyf("model/"+str +"_lyf.txt");
                }
            }
        });
    }
    private void addButs(String val,final CallBackFun backFun)
    {
        LinearLayout layout = (LinearLayout) findViewById(R.id.container);
        Button bn = new Button(this);
        bn.setText(val);
        bn.setLayoutParams(new ViewGroup.LayoutParams(
                ViewGroup.LayoutParams.WRAP_CONTENT,
                ViewGroup.LayoutParams.WRAP_CONTENT));
        layout.addView(bn);
        bn.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View arg0) {
                backFun.StateChange(true);
            }
        });
    }
    private void loadSceneByUrl(String val){
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
                    tempDis.scene3d=this.scene3d;
                    tempDis.setInfo(obj);
                    this.scene3d.addDisplay(tempDis);

                    break;
                default:
                    break;
            }

        } catch (Exception e) {
            e.printStackTrace();
        }


    }
    private void loadSceneRes()
    {
        this.scene3d =new Scene3D();
        GridLineSprite  dic=new GridLineSprite(this.scene3d);
        dic.changeColor(new Vector3D(1,1,1,1));
        this.scene3d.addDisplay(dic);

    }
    private void  addRoleToSceneByUrl(String val)
    {
        Display3dMovie sc=new Display3dMovie(this.scene3d);
        sc.setRoleUrl("role/"+val);
        sc.scaleX=2;
        sc.scaleY=2;
        sc.scaleZ=2;
        scene3d.addMovieDisplay(sc);
    }
        private void   playLyf(String url)
    {


        GroupDataManager.getInstance().getGroupData(url, new GroupBackFun() {
            @Override
            public void Bfun(GroupRes groupRes) {

                for (int i = 0; i < groupRes.dataAry.size(); i++) {
                    GroupItem item =  groupRes.dataAry.get(i);
                    if (item.types == BaseRes.SCENE_PARTICLE_TYPE) {

                        ParticleManager particleManager= scene3d.particleManager;
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
                        _oldPosV2d.x= scene3d.camera3D.x;
                        _oldPosV2d.y= scene3d.camera3D.y;
                        _oldPosV2d.z= scene3d.camera3D.z;
                        _oldPosV2d.rotationX= scene3d.camera3D.rotationX;
                        _oldPosV2d.rotationY= scene3d.camera3D.rotationY;

                        break;
                    case "ACTION_MOVE":
                        if(_downPosV2d!=null){
                         Vector2D toV2d=   new Vector2D( event.getX(), event.getY());
                         scene3d.camera3D.rotationY= _oldPosV2d.rotationY-(toV2d.x-_downPosV2d.x);
                         scene3d.camera3D.rotationX= _oldPosV2d.rotationX-(toV2d.y-_downPosV2d.y)/10.0f;

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
