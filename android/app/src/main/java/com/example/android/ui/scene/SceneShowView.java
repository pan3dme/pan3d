package com.example.android.ui.scene;
import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import androidx.appcompat.app.AppCompatActivity;
import androidx.constraintlayout.solver.widgets.Rectangle;
import androidx.constraintlayout.widget.ConstraintLayout;
import androidx.fragment.app.Fragment;
import android.util.DisplayMetrics;
import android.util.Log;
import android.view.Display;
import android.view.GestureDetector;
import android.view.MenuItem;
import android.view.MotionEvent;

import com.example.android.R;
import com.pan3d.base.CallBackFun;
import com.pan3d.display.role.SceneChar;
import com.pan3d.scene.ConstrainSceneView;
import org.json.JSONArray;
import org.json.JSONObject;

/**
 * A simple {@link Fragment} subclass.
 * create an instance of this fragment.
 */
public class SceneShowView extends AppCompatActivity implements GestureDetector.OnGestureListener {
    private static final String TAG ="SceneShowView" ;
    ConstrainSceneView constrainSceneViewOne;
    GestureDetector detector;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.fragment_scene_show_view);
        getSupportActionBar().setDisplayHomeAsUpEnabled(true);
        getSupportActionBar().setTitle(getString(R.string.app_name));
        String sceneinfo = getIntent().getStringExtra("sceneinfo");

        detector = new GestureDetector(this, this);
        //实例化这个手势检测器对象

        Context context=  getApplicationContext();


        final ConstraintLayout constraintlayout =  findViewById(R.id.base_scene_gl_view);


        constrainSceneViewOne =new ConstrainSceneView(context, new CallBackFun() {
            @Override
            public void StateChange(boolean State) {
                initSceneDataByBunld(sceneinfo);



            }
        });
        constraintlayout.addView(constrainSceneViewOne);

        DisplayMetrics displayMetrics = new DisplayMetrics();
        getWindowManager().getDefaultDisplay().getMetrics(displayMetrics);
        Rectangle rectangle=new Rectangle();
        rectangle.setBounds(0,0,displayMetrics.widthPixels,displayMetrics.heightPixels);
        constrainSceneViewOne.setRect(rectangle);


    }
    //下面实现的这些接口负责处理所有在该Activity上发生的触碰屏幕相关的事件
    @Override
    public boolean onTouchEvent(MotionEvent e)
    {
        return detector.onTouchEvent(e);
    }
    public Display getDisplay(Activity activity){
        return activity.getWindowManager().getDefaultDisplay();
    }
    private void initSceneDataByBunld(String val)
    {

        try {
            JSONArray jsonArray=new JSONArray(val);
            for(int i=0;i< jsonArray.length();i++){
                meshDataInfo(jsonArray.getJSONObject(i));
            }

        } catch (Exception e) {
            e.printStackTrace();
        }
    }
    private void  meshDataInfo(JSONObject val)
    {


        try {
            int type=val.getInt("type");

            if( type==1){ //场景
                String textStr=val.getString("text").replace("<<<","/");
                constrainSceneViewOne.loadSceneByUrl(  val.getString("text"));
            }
            if( type==2){//特效
                String textStr=val.getString("text").replace("<<<","/");
                constrainSceneViewOne.playParticle(textStr);
            }
            if( type==3){//角色
                String textStr=val.getString("text").replace("<<<","/");
                SceneChar sc= constrainSceneViewOne.addMovieDisplay(textStr);

                JSONObject info=  val.getJSONObject("info");
                if( info!=null )
                {
                    if(  info.has("addPart")){
                        String  addPart=  info.getString("addPart");
                        String  bindSocket=  info.getString("bindSocket");
                        String  model=  "model/"+info.getString("model")+".txt";
                        sc.addPart(addPart,bindSocket,model);
                    }
                    if(  info.has("mount")){
                        String  mount=  info.getString("mount");
                        if(mount!=null){
                            sc.setMountById(mount);
                        }
                    }
                    if(  info.has("action")){
                        String  action=  info.getString("action");
                        Log.d(action, "meshDataInfo: ");
                        sc.play(action);
                    }
                }

            }
            if(type==4){//动画
                constrainSceneViewOne.addLoadFrame3dRes();
            }

            if( type==5){//md5
                constrainSceneViewOne.addLocaMd5();
            }

        }catch (Exception e){
            e.printStackTrace();
        }


    }



    @Override
    public boolean onOptionsItemSelected(MenuItem item) {
        if (item.getItemId() == android.R.id.home) {
            onBackPressed();
        }
        return super.onOptionsItemSelected(item);
    }

    @Override
    public boolean onDown(MotionEvent e) {
        return false;
    }

    @Override
    public void onShowPress(MotionEvent e) {

    }

    @Override
    public boolean onSingleTapUp(MotionEvent e) {
        return false;
    }

    @Override
    public boolean onScroll(MotionEvent e1, MotionEvent e2, float distanceX, float distanceY) {
        Log.d(TAG,   "The method has been called - onScroll");
        //当该方法被调用时，通过一个Toast来提示用户哪个方法被调用了，下同


        this.constrainSceneViewOne.mainScene3D.camera3D.rotationX+=distanceY*0.1;
        this.constrainSceneViewOne.mainScene3D.camera3D.rotationY+=distanceX*0.1;

        if(distanceY >= 0){

        }
        else{

        }
        return false;
    }

    @Override
    public void onLongPress(MotionEvent e) {

    }

    @Override
    public boolean onFling(MotionEvent e1, MotionEvent e2, float velocityX, float velocityY) {
        return false;
    }
}